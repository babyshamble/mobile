App.page('web', function() {
    'use strict';

    var NEWS_PER_REQUEST = 20;

    var $webView, // 网站视图
        $webMapStair, // 一级栏目
        $webAside, // 侧边栏
        $webSitesList, // 左侧体系列表
        $title, // 网站名称
        $webStatus, // 网站视图各种状态的容器
        $loadingSystem,
        $loadingMap,
        $loadingList,
        $nocontentSystem, // 没有内容时的指示器
        $nocontentMap,
        $nocontentList,

        defaultCID,
        activeWID = undefined, // 处于激活状态的 webID
        defaultWID = 0, // 默认的 webID
        defaultMapStairID, // 默认的一级栏目编号
        defaultMapStairSID, // 默认的二级栏目编号
        defaultMapStair2ID, // 默认的一级栏目编号
        activeMapStairID = undefined,
        activeMapStair2ID = undefined, // 处于激活状态的 mapstair2ID
        activeMapStairSID = undefined, // 处于激活状态的 mapstairID
        cachedSystemData, // 缓存体系数据
        cachedMapStairData, // 缓存一级目录数据
        cachedListData, // 缓存站点新闻列表数据
        pageNumber = 1, // 记录分布加载时当前的页数

        hash,
        systemDataReady = false, // 体系数据是否就绪
        systemDataRenderedAlready = false, // 体系数据是否已经经过了第一次渲染
        mapStairDataReady = false, // 一级栏目数据是否就绪
        mapDataRenderedAlready = false,
        listDataReady = false, // 列表数据是否就绪
        listDataRenderedAlready = false,
        siteMetaData = {}, // 缓存站点的META信息
        mapMetaData = undefined;

    var renderedAlready = false;

    // 更新网站标题
    function updateTitle() {
        $title.html((siteMetaData[activeWID] && siteMetaData[activeWID].name) || '网站服务');
    };

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
    };

    function listFoucs() {
         $('#web_shelter').find('li').on('tap', function() {
            var 
                mask = $(this).attr('mask') + '?dataCenter',
                text = $(this).find('.list-title').text();
      
            if (App.page('launch').mask == 'close') {
                J.Router.goTo(mask);
            } else if(!App.page('launch').mask || App.page('launch').mask == 'open') {
                $('#web_shelter').find('li').not($(this)).removeClass('list-item-foucs');
                
                if ($(this).hasClass('list-item-foucs')) {
                    J.Router.goTo(mask);
                } else {
                    $(this).addClass('list-item-foucs');
                    App.speaker.pointerRead(text);
                }  
            }
        });
    };

    // 优化体系数据供模板使用
    // 同时，还做了两件事情
    // 1. 将每个站点的定义按站点序号为索引存入 siteMetaData
    // 2. 找到默认的网站ID
    function refineSystemData(data) {
        var refinedData = {},
            cateID, cate, systemID, system={}, systems={},siteID, counter = 0;
     
        for (cateID in data) {
            systems={};
            
            if (data.hasOwnProperty(cateID)) {
                cate = data[cateID];

                for (systemID in cate.child) {
                    if (cate.child.hasOwnProperty(systemID)) {
                        system = cate.child[systemID];

                        if (counter++ === 0) {
                            defaultWID = systemID;
                        }

                        systems[system.id] = system;
                        siteMetaData[system.id] = system;
                    }
                }

                refinedData[cateID] = cate;
                refinedData[cateID].sites = systems;
            }
        }

        return refinedData;
    };

    // 优化一级目录数据供模板使用
    function refineMapStairData(data) {
        var refinedMapStair = [],
            i, len, mapId, map;

        defaultMapStairID = Object.keys(data.data)[0];
        defaultMapStairSID = data.data[defaultMapStairID].sid;

        for (i in data.data) {
            if (data.data.hasOwnProperty(i)) {
                refinedMapStair.push(data.data[i]);
            }
        }

        mapMetaData = refinedMapStair;
        return refinedMapStair;
    };

    // 计算一个正确的一级目录列表横向宽度
    function getSuitableMapStairWidth() {
        var suitableWidth = 0;

        $webMapStair.find('li').each(function() {
            suitableWidth += $(this).width();
        });

        return suitableWidth;
    };

    // 计算一个正确的二级目录列表横向宽度
    function getSuitableMapStair2Width() {
        var suitableWidth = 0;

        $('#header-secondary2').find('li').each(function() {
            suitableWidth += $(this).width() + 20;
        });

        return suitableWidth;
    };

    // 优化列表数据供模板使用
    function refineListData(data) {
        var refinedData = [],
            i, len, item;

        for (i in data.area) {
            refinedData = refinedData.concat(data.area[i].links);
        }
     
        // 处理每个文章格式
        for (i = 0, len = refinedData.length; i < len; i++) {
            item = refinedData[i];

            if (item.imgs) {
                item.thumbnail = item.imgs.split(/\|\|/g);
                item.thumbnail.forEach(function(src, index, thumbnail) {
                    thumbnail[index] = src.replace(/\/\^[^\/]*\/\^[^\/]*$/, '');
                    thumbnail[index] = imgProxy + thumbnail[index];
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
        }

        return refinedData;
    };


    /*
     * 初始化方法
     *
     * @method init
     * @access public
     * @return {Void}
     */
    this.init = function(){
        var self = this;

        $webView = $('#web_section');
        $title = $('#web_section header .title');
        $webSitesList = $('#web-sites-list');
        $webMapStair = $('#web-map-stair');
        $webAside = $('#aside_web_system');
        $webStatus = $('#web-status');
        $loadingSystem = $('#web-loading-system');
        $loadingMap = $('#web-loading-map');
        $loadingList = $('#web-loading-list');
        $nocontentSystem = $('#web-nocontent-system');
        $nocontentMap = $('#web-nocontent-map');
        $nocontentList = $('#web-nocontent-list');

        this.__listScroller = J.Refresh({
            selector: '#web_shelter',
            checkDOMChanges: true, // Jingle 忽略了这个值
            type: 'pullUp',
            pullText : '<span style="color:#B2B2B2">加载更多</span>',
            releaseText : '<span style="color:#B2B2B2">正在加载,请稍后...</span>',
            callback: (function(verifyWID, verifyMapId) {
                return function () {
                    App.load.list(activeMapStairID, 'slist', ++pageNumber, NEWS_PER_REQUEST, activeMapStairSID)
                        .then(function(data) {
                            $(self.__listScroller.scroller.scroller.children[0]).append(template('views/list/list', {
                                list: refineListData(data.data)
                            }));
                            listFoucs();
                            self.__listScroller.scroller.refresh();
                            renderListImages($('#web_shelter'));
                        })
                        .catch(function(err) {
                            if (verifyWID !== activeWID || verifyMapId !== activeMapStairID) {
                                J.Toast.show('toast', '没有更多内容了');
                                self.__listScroller.scroller.refresh();
                                return;
                            }

                            switch (err) {
                                case 'ESERVERFAIL':
                                    J.Toast.show('error', '您的网络似乎不给力');
                                    self.__listScroller.scroller.refresh();
                                    break;
                                case 'ENOTREADY':
                                    J.Toast.show('toast', '没有更多内容了');
                                    self.__listScroller.scroller.refresh();
                                    break;
                                default:
                                    break;
                            }
                        });
                };
            }())

        });
        
        $('#web_shelter').find('.refresh-container').hide();

        this.__mapStairScroller = J.Scroll('#web-map-stair', {hScroll:true, hScrollbar: false});

        this.__mapStair2Scroller = J.Scroll('#web-map-stair2', {hScroll:true, hScrollbar: false});

        $webSitesList.on('tap', 'li a',function() {
            var $this = $(this);

            $this.closest('aside').find('li').removeClass('active');
            $this.parent().addClass('active');

            J.Menu.hide();
            location.hash = this.getAttribute('href');
            hash = J.Util.parseHash(location.hash);

            Promise.resolve()
                .then(self.__renderSystem.bind(self))
                .then(self.__renderSite.bind(self))
                .then(self.__renderHeader2.bind(self))
                .then(self.__renderList.bind(self));
        });

        $webMapStair.on('change', function(ev, $target) {
            // 切换一级栏目时列表需要返回至顶部
            self.__listScroller.scroller.scrollTo(0, 0, 300);

            activeMapStairID = activeMapStair2ID = $target[0].getAttribute('data-mid');
            activeMapStairSID = $target[0].getAttribute('data-sid');

            pageNumber = 1;
            J.Selected;
 
            Promise.resolve()
                .then(self.__renderHeader2.bind(self))
                .then(self.__renderList.bind(self));
        });

        $('#web-map-stair2').on('change', function(ev, $target) {
            // 切换二级栏目时列表需要返回至顶部
            self.__listScroller.scroller.scrollTo(0, 0, 300);

            activeMapStairID = activeMapStair2ID = $target[0].getAttribute('data-mid');
            activeMapStairSID = $target[0].getAttribute('data-sid');
            pageNumber = 1;

            Promise.resolve()
                .then(self.__renderList.bind(self));
        });
    };

    /*
     * 渲染页面
     *
     * @method show
     * @access public
     * @return {Void}
     */

    function SetCookie(name,value){  
        var Days = 1;   //cookie 将被保存一年  
        var exp  = new Date();  //获得当前时间  
        exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒  
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();  
    };

    function getCookie(name){  
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
        if(arr != null){  
         return unescape(arr[2]);   
        }else{  
         return null;  
        }  
    };   

    this.show = function() {
        if (renderedAlready) return;

        var self = this;

        $webStatus.addClass('loading-list');
        hash = J.Util.parseHash(location.hash);
        App.speaker.unPointerRead();
        YX.Mobile.TestVolStu();

        Promise.resolve()
            .then(this.__renderSystem.bind(this))
            .then(this.__renderSite.bind(this))
            .then(this.__renderHeader2.bind(this))
            .then(this.__renderList.bind(this))
            .catch(function(err) {
            });

        // alert(1);
        // SetCookie('app2', 'app2');
        // var test = getCookie('app2');
        // alert(test);
        // alert(1);
    };


    /*
     * 渲染网站侧边栏数据
     *
     * @method renderSystem
     * @access private
     * @return {Void}
     */

    this.__renderSystem = function() {
        var self = this,
            cache,
            hasCachedSystem = false;

        return new Promise(function(resolve, reject) {
            App.load.system('scate')
                .then(function (data) {
                    var refinedData = refineSystemData(data.data);
                    $webSitesList.html(template('views/web/aside-system-list', {
                        systems: refinedData
                    }));

                    $webStatus.removeClass('loading-system nocontent-system');

                    hash.param.wid = hash.param.wid || defaultWID;
                    activeWID = hash.param.wid;
                    resolve();
                })
                .catch(function (err) {
                    switch (err) {
                        case 'ESERVERFAIL':
                            J.Toast.show('error', '您的网络似乎不给力');
                            break;
                        case 'ENOTREADY':
                            self.__listScroller.scroller.refresh();
                            break;
                        default:
                            break;
                    }
                    
                    $webStatus.removeClass('loading-system loading-list');
                    $webStatus.addClass('nocontent-system');
                });
        });
    };


    /*
     * 渲染一级栏目数据
     *
     * @method renderSite
     * @access private
     * @param {String} useWID - 指定使用一个WID作为当前activeWID
     * @param {Bool} noUpdate - 不要向服务器请求最新的信息，只尝试使用缓存
     * @return {Void}
     */
    this.__renderSite = function(useWID, noUpdate) {
        var self = this,
            cache,
            hasCachedMap = false;

        mapStairDataReady = false;
        mapDataRenderedAlready = false;
        pageNumber = 1;

        return new Promise(function(resolve, reject) {
            // 更新网站标题
            updateTitle();

            // 更新体系侧边栏中激活的项目
            $webSitesList
                .find('li')
                .removeClass('active')
                .filter(function() {
                    return this.getAttribute('data-wid') === activeWID;
                })
                .addClass('active');

            $webStatus.addClass('loading-map');

            // 继续从服务器加载最新的一级目录数据
            App.load.map(activeWID, 'smap')
                .then(function(data) {
                    var refinedData = refineMapStairData(data);
                    self.__mapStairScroller.scroller.scroller.innerHTML = template('views/web/mapstair', {
                        mapstair: refinedData
                    });            

                    // 更新一级栏目 control-group的宽度
                    $webMapStair.children().eq(0).css('width', getSuitableMapStairWidth() + 'px');
                    self.__mapStairScroller.scroller.refresh();
                    self.__mapStairScroller.scroller.scrollTo(0, 0, 300);
                    $webStatus.removeClass('loading-map');

                    mapDataRenderedAlready = true;
                    mapStairDataReady = true;
                    activeMapStairID = defaultMapStairID;
                    activeMapStairSID = defaultMapStairSID;
                    activeMapStair2ID = undefined;
                    $webStatus.removeClass('nocontent-map');

                    resolve();
                })
                .catch((function(verifyWID) {
                    return function(err) {
                        if (verifyWID !== activeWID) {
                            return;
                        }

                        $webStatus.removeClass('loading-map');

                        if (hasCachedMap) {
                        }
                        else {
                            $webStatus.addClass('nocontent-map');
                        }
                    }
                })(activeWID));
        });

    };

    // 二级栏目

    this.__renderHeader2 = function() {
        var self = this, Header2Data;

        return new Promise(function(resolve, reject) {
            if (!activeMapStair2ID) {
                activeMapStair2ID =  mapMetaData[0].id;
            }
            
            if (activeMapStair2ID) {
                for (var i in mapMetaData) {
                    if (mapMetaData[i].id == activeMapStair2ID) {
                        Header2Data = mapMetaData[i].child;
                    }
                }
            }
            
            if (!Header2Data || Header2Data.length == 0) {
                $('#header-secondary2').css({'display':'none'});
                $('#web_shelter').css({'top':'80px'});
                $('#web-status').css({'top': '74px'});
            }
            else {
                $('#header-secondary2').css({'display':'block'});
                $('#web_shelter').css({'top':'120px'});
                $('#web-status').css({'top': '124px'});

                self.__mapStair2Scroller.scroller.scroller.innerHTML = template('views/web/mapstair', {
                    mapstair: Header2Data
                });

                activeMapStairID = Object.keys(Header2Data)[0];
                activeMapStairSID = Header2Data[activeMapStairID].sid;
                //调整宽度
                $('#web-map-stair2').children().eq(0).css('width', getSuitableMapStair2Width() + 'px');
                    self.__mapStair2Scroller.scroller.refresh();
                    self.__mapStair2Scroller.scroller.scrollTo(0, 0, 300);

            }

            resolve();    
        });
    };

    var imgProxy;

    /*
     * 渲染列表数据
     *
     * @method renderList
     * @access private
     * @param {String} useWID - 指定使用一个WID作为当前activeWID
     * @param {String} useSID - 指定使用一个SID作为当前activeMapStairId
     * @param {Bool} noUpdate - 不要向服务器请求最新的信息，只尝试使用缓存
     * @return {Void}
     */
    this.__renderList = function(useWID, useSID, noUpdate) {
        var self = this,
            cache,
            hasCachedList = false;

        listDataRenderedAlready = false;

        return new Promise(function(resolve, reject) {
            $webStatus.addClass('loading-list');       

            // 继续从服务器加载最新的列表数据
            App.load.list(activeMapStairID, 'slist', pageNumber, NEWS_PER_REQUEST, activeMapStairSID)
                .then(function (data) {
                    if (!imgProxy) imgProxy = data.imgProxy;
                    var refinedData = refineListData(data.data);

                    self.__listScroller.scroller.scroller.children[0].innerHTML = template('views/list/list', {
                        list: refinedData
                    });

                    listFoucs();
                    
                    self.__listScroller.scroller.refresh();

                    $webStatus.removeClass('loading-list');
                    $webStatus.removeClass('nocontent-list');

                    listDataRenderedAlready = true;

                    renderListImages($('#web_shelter'));

                    renderedAlready = true;
                })
                .catch((function(verifyWID, verifyMapId) {
                    return function (err) {
                        if (verifyWID !== activeWID || verifyMapId !== activeMapStairID) {
                            return;
                        }

                        switch (err) {
                            case 'ESERVERFAIL':
                                J.Toast.show('error', '您的网络似乎不给力');
                                break;
                            case 'ENOTREADY':
                                J.Toast.show('error', '无法更新列表数据');
                                break;
                            default:
                                break;
                        }

                        $webStatus.removeClass('loading-list');
                        if (hasCachedList) {

                        }
                        else {
                            $webStatus.addClass('nocontent-list');
                        }
                    }
                })(activeWID, activeMapStairID));

            // 列表返回顶部
            self.__listScroller.scroller.scrollTo(0, 0 , 300);
        });
    };

});
