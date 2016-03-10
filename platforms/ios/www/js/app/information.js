App.page('information', function() {

    var $informationView,
        $informationStatus,
        $loadingSystem,
        $loadingList,
        $nocontentSystem,
        $nocontentList,
        $categories,

        cachedSystemData,

        hash,
        activeCID, // 当前处于激活状态的分类ID
        defaultCID, // 默认的分类ID

        systemDataRenderedAlready = false, // 体系数据是否已经经过了第一次渲染
        systemDataReady = false, // 最新的体系数据是否已经就绪
        listDataRenderedAlready = false;


    // 加载并渲染文章列表中的图片
    function renderListImages($listContainer) {
        $listContainer.find('li').not('.ready, .nothumbnail').each(function() {
            var $this = $(this), imageSrc;

            imageSrc = this.getAttribute('data-image');

            loadImg(imageSrc, function(src) {
                $this.find('.list-thumbnail').css('background-image', 'url(' + src + ')');
                $this.addClass('ready');
            });
        });
    }

    // 优化体系数据供模板使用
    // 同时还做了1件事情
    // 1:  寻找默认分类ID
    function refineSystemData(data) {
        var refinedData = {},
            cateID, cate, systemID, system, siteID, site, sites, counter = 0;

        for (cateID in data) {
            if (data.hasOwnProperty(cateID)) {
                cate = data[cateID];

                for (systemID in cate.metro) {
                    if (cate.metro.hasOwnProperty(systemID)) {
                        system = cate.metro[systemID];

                        refinedData[system.id] = system;
                    }
                }
            }
        }

        defaultCID = Object.keys(refinedData)[0];
        return refinedData;
    }

    // 计算一个正确的资讯分类横向宽度
    function getSuitableCategoriesWidth() {
        var suitableWidth = 0;

        $categories.find('li').each(function() {
            suitableWidth += $(this).width() + 5;
        });

        return suitableWidth;
    }

    // 优化列表数据供模板使用
    function refineListData(data) {
        var refinedData = [],
            i, item;

        for (i in data) {
            if (!data.hasOwnProperty(i)) {
                continue;
            }

            item = data[i];

            if (item.imgs) {
                item.thumbnail = item.imgs.split(/\|\|/g);
                item.thumbnail.forEach(function(src, index, thumbnail) {
                    thumbnail[index] = src.replace(/\/\^[^\/]*\/\^[^\/]*$/, '');
                });

                if (item.thumbnail.length > 1) {
                    item.type = 'multithumbnails';
                    // 目前不考虑多个图片的列表项，当做只有一个图片的条目来显示
                    item.type = 'thumbnail';
                }
                else {
                    item.type = 'thumbnail';
                }
            }
            else {
                item.thumbnail = '';
                item.type = 'nothumbnail';
            }

            item.submap = item.areaname;

            refinedData.push(item);
        }

        return refinedData;
    }


    /*
     * 初始化方法
     *
     * @method init
     * @access public
     * @return {Void}
     */
    this.init = function() {
        var self = this;

        $informationView = $('#information_section');
        $informationStatus = $('#information-status');
        $loadingSystem = $('#information-loading-system');
        $loadingList = $('#information-loading-list');
        $nocontentSystem = $('#information-nocontent-system');
        $nocontentList = $('#information-nocontent-list');
        $categories = $('#information-category');

        this.__listScroller = J.Scroll('#information-viewer', {bounce: true});

        this.__categoryScroller = J.Scroll('#information-category', {hScroll: true, hScrollbar: false});

        $categories.on('change', function(ev, $target) {
            // 切换资讯分类时列表需要返回至顶部
            self.__listScroller.scroller.scrollTo(0, 0, 300);

            activeCID = $target[0].getAttribute('data-cid');

            self.__renderList();
        });

        $nocontentSystem.on('tap', function() {
            $informationStatus.removeClass('nocontent-system');
            Promise.resolve()
                .then(self.__renderSystem.bind(self))
                .then(self.__renderList.bind(self));
        });

        $nocontentList.on('tap', function() {
            $informationStatus.removeClass('nocontent-list');
            Promise.resolve()
                .then(self.__renderList.bind(self));
        });

        $('article').css('font-size', window.font);
        $('footer').css('font-size', window.font);
        $('.header-secondary').css('font-size', window.font);

    };


    /*
     * 渲染页面
     *
     * @method show
     * @access public
     * @return {Void}
     */
    this.show = function() {

        hash = J.Util.parseHash(location.hash);

        // $informationStatus.removeClass('nocontent-system nocontent-list');

        Promise.resolve()
            .then(this.__renderSystem.bind(this))
            .then(this.__renderList.bind(this));

    };


    /*
     * 渲染体系
     *
     * @method renderSystem
     * @access private
     * @return {Void}
     */
    this.__renderSystem = function() {
        var self = this,
            hasCachedSystem = false;

        return new Promise(function(resolve, reject) {

            if (!systemDataRenderedAlready) {

                // 如果缓存过体系数据，则先展示缓存数据，以提升用户体验，否则先模拟一个空数据让分类导航条什么都不显示
                if (cache = J.Cache.get('information://system')) {
                    systemDataRenderedAlready = true;

                    cachedSystemData = cache.data;
                    $informationStatus.addClass('loading-list');
                    hasCachedSystem = true;
                    defaultCID = Object.keys(cachedSystemData)[0];
                    $informationStatus.removeClass('loading-system nocontent-system');

                    // 尝试展示缓存的列表
                    self.__renderList(defaultCID, true);
                }
                else {
                    cachedSystemData = {};
                    $informationStatus.addClass('loading-system');
                }

                self.__categoryScroller.scroller.scroller.innerHTML = template('views/information/category', {
                    systems: cachedSystemData
                });

                // 更新分类栏目 control-group的宽度
                $categories.children().eq(0).css('width', getSuitableCategoriesWidth() + 'px');
                self.__categoryScroller.scroller.refresh();
                self.__categoryScroller.scroller.scrollTo(0, 0, 300);
            }

            if (!systemDataReady) {
                // 继续从服务器加载最新的体系数据
                App.load.system('ncate')
                    .then(function (data) {
                    
                        var refinedData;

                        J.Cache.save('information://system', refinedData = refineSystemData(data.data));

                        self.__categoryScroller.scroller.scroller.innerHTML = template('views/information/category', {
                            systems: refinedData
                        });

                        // 更新分类栏目 control-group的宽度
                        $categories.children().eq(0).css('width', getSuitableCategoriesWidth() + 'px');
                        self.__categoryScroller.scroller.refresh();
                        self.__categoryScroller.scroller.scrollTo(0, 0, 300);

                        $informationStatus.removeClass('loading-system');

                        cachedSystemData = refinedData;
                        systemDataReady = true;

                        hash.param.cid = hash.param.cid || defaultCID;

                        // 只在切换分类时重新渲染，避免后退到此页面时进行不必要的渲染工作
                        if (hash.param.cid !== activeCID) {

                            // 更新处于激活状态的分类ID
                            activeCID = hash.param.cid;

                            resolve();
                        }
                    })
                    .catch(function (err) {
                        switch (err) {
                            case 'ESERVERFAIL':
                                J.Toast.show('error', '您的网络似乎不给力');
                                self.__categoryScroller.scroller.refresh();
                                break;
                            case 'ENOTREADY':
                                self.__categoryScroller.scroller.refresh();
                                break;
                            default:
                                break;
                        }

                        // 如果有缓存的体系数据，我们姑且信任这个数据依然是有效的
                        if (hasCachedSystem) {
                            $informationStatus.removeClass('loading-list loading-system');
                            if (!listDataRenderedAlready) {
                                $informationStatus.addClass('nocontent-list');
                            }
                        }
                        else {
                            $informationStatus.removeClass('loading-list loading-system');
                            $informationStatus.addClass('nocontent-system');
                        }

                        throw new URIError('Unable to retrive information system data: ' + err);
                    });
            }
            else {
                // 只在切换分类时重新渲染，避免后退到此页面时进行不必要的渲染工作
                if (hash.param.cid && hash.param.cid !== activeCID) {

                    // 更新处于激活状态的分类ID
                    activeCID = hash.param.cid;

                    resolve();
                }
            }

        });
    };


    /*
     * 渲染列表
     *
     * @method renderList
     * @access private
     * @param {String} useCID - 指定使用一个CID作为当前激活的CID
     * @param {Bool} noUpdate - 不要向服务器请求最新的信息，只尝试使用缓存
     * @return {Void}
     */
    this.__renderList = function(useCID, noUpdate) {
        var self = this,
            hasCachedList = false, // 是否展示了缓存的列表数据
            internalCID = useCID || activeCID;

        listDataRenderedAlready = false;

        return new Promise(function(resolve, reject) {

            // 如果这个页面有缓存的列表数据，先展示缓存数据，以提升用户体验, 否则显示正在加载
            if (cache = J.Cache.get('information://' + (useCID || activeCID))) {
                cachedListData = cache.data;
                hasCachedList = true;
                listDataRenderedAlready = true;
                $informationStatus.removeClass('loading-list nocontent-list');
            }
            else {
                cachedListData = {};
                $informationStatus.addClass('loading-list');
            }

            self.__listScroller.scroller.scroller.innerHTML = template('views/list/list', {
                list: cachedListData
            });

            self.__listScroller.scroller.refresh();
            renderListImages($('#information-viewer'));

            if (!!noUpdate) {
                resolve();
                return;
            }

            // 继续从服务器加载最新的列表数据
            App.load.more(useCID || activeCID)
                .then(function (data) {
                    return new Promise(function(resolve, reject) {
                        var refinedData;

                        if (Object.keys(data.data).length === 0) {
                            reject('ENOCONTENT');
                            return;
                        }

                        J.Cache.save('information://' + activeCID, refinedData = refineListData(data.data));

                        self.__listScroller.scroller.scroller.innerHTML = template('views/list/list', {
                            list: refinedData
                        });
                        self.__listScroller.scroller.refresh();

                        $informationStatus.removeClass('loading-list nocontent-list');
                        listDataRenderedAlready = true;

                        renderListImages($('#information-viewer'));
                    });
                })
                .catch((function(internalCID) {
                    return function (err) {
                        // 只在cid没有更新时起作用
                        if (internalCID !== activeCID) {
                            return;
                        }

                        switch (err) {
                            case 'ESERVERFAIL':
                                J.Toast.show('error', '您的网络似乎不给力');
                                break;
                            case 'ENOTREADY':case 'ENOCONTENT':
                                J.Toast.show('error', '无法更新列表数据');
                                break;
                            default:
                                break;
                        }

                        // 只在没有展示缓存的列表时显示，否则就显示原来的列表就好了
                        if (!hasCachedList) {
                            $informationStatus.removeClass('loading-list').addClass('nocontent-list');
                        }

                        throw new URIError('Unable to retrive information list data: ' + err);
                    }
                })(internalCID));

        });
    };

});
