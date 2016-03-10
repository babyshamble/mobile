App.page('information', function() {

    var 
        $informationView,
        $informationStatus,
        $loadingSystem,
        $loadingList,
        $nocontentSystem,
        $nocontentList,
        $categories,

        cachedSystemData,

        hash,
        defaultCID, // 默认的一级ID
        activeCID, // 当前处于激活一级ID
        defaultListID, // 默认列表ID
        activeListID,

        newsGetReady;

    var $listScroller,
        $listRefresh;
    /*
     * 初始化方法
     *
     * @method init
     * @access public
     * @return {Void}
     */
    this.init = function() {
        var self = this;

        $informationView = $('#information-viewer');
        $informationStatus = $('#information-status');
        $loadingSystem = $('#information-loading-system');
        $loadingList = $('#information-loading-list');
        $nocontentSystem = $('#information-nocontent-system');
        $nocontentList = $('#information-nocontent-list');
        $categories = $('#information-category');

        this.__categoryScroller = J.Scroll('#information-category', {hScroll: true, hScrollbar: false});
        this.__list2Scroller = J.Scroll('#information-mapstair2', {hScroll:true, hScrollbar: false});
        $listScroller = J.Scroll('#information-viewer', {bounce: true});
        listRefresh();

        $categories.on('change', function(ev, $target) {
            $listScroller.scroller.scrollTo(0, 0, 0);
            activeCID = $target[0].getAttribute('data-cid');
            Promise.resolve()
                .then(self.__renderCate.bind(self))
                .then(self.__renderList.bind(self));
        });

        $('#information-mapstair2').on('change', function(ev, $target) {
            $listScroller.scroller.scrollTo(0, 0, 0);
            activeListID = $target[0].getAttribute('data-mid');
            Promise.resolve()
                .then(self.__renderList.bind(self));
        });
    };

    function listRefresh() {
        $listRefresh = J.Refresh({
            selector: '#information-viewer',
            checkDOMChanges: true, // Jingle 忽略了这个值
            type: 'pullUp',
            callback: (function() {
                return function () {
                    FW.Dataline.LoadList('news', activeListID, ++PAGENUM, LISTCOUNT).then(function(data){
                        if (!data.success || !data.data) {
                            $listRefresh.scroller.refresh();
                            J.showToast('没有更多内容了...','toast',1000);
                            $informationView.find('.refresh-container').hide();
                        } else {    
                            $informationView.find('.refresh-container').show();
                            
                            var html = template('views/list/list', {
                                list: refineListData(data.data)
                            });
                            $informationView.find('.refresh-container').before(html);
                    
                            renderListImages($informationView);
                            $listRefresh.scroller.refresh();
                            foucsList();
                        }
                    });
                };
            }())
        });
        
        $informationView.find('.refresh-container').hide();
    };

    /*
     * 渲染页面
     *
     * @method show
     * @access public
     * @return {Void}
     */
    this.show = function() {
        if (newsGetReady) return;
        hash = J.Util.parseHash(location.hash);
        App.speaker.unPointerRead();
        YX.Mobile.TestVolStu();  

        Promise.resolve()
            .then(this.__renderSystem.bind(this))
            .then(this.__renderCate.bind(this))
            .then(this.__renderList.bind(this));   
    };


    /*
     * 渲染一级栏目
     *
     * @method renderSystem
     * @access private
     * @return {Void}
     */
    this.__renderSystem = function() {
        var self = this,
            hasCachedSystem = false;

        return new Promise(function(resolve, reject) {
           FW.Dataline.LoadDepend('news').then(function(data){
                if (!data.success || !data.data) {
                    $informationStatus.removeClass('loading-list').addClass('nocontent-system');
                    return;
                }

                var refinedData = refineSystemData(data.data);
       
                self.__categoryScroller.scroller.scroller.innerHTML = template('views/information/category', {
                    systems: refinedData
                });

                // 更新分类栏目 control-group的宽度
                $categories.children().eq(0).css('width', getSuitableWidth($categories.children().eq(0)) + 'px');
                self.__categoryScroller.scroller.refresh();
                self.__categoryScroller.scroller.scrollTo(0, 0, 300);

            
                cachedSystemData = refinedData;
                hash.param.cid = hash.param.cid || defaultCID;

                resolve();  
            })
        });
    };

    /*
     * 渲染二级栏目
     *
     * @method renderSystem
     * @access private
     * @return {Void}
     */
    this.__renderCate = function() {
        var self = this, Header2Data;

        return new Promise(function(resolve, reject) {
            Header2Data = cachedSystemData[activeCID].data;
           
            if (!Header2Data || Header2Data.length == 0) {
                $('#information-header2').css({'display':'none'});
                $informationView.css({'top':'80px'});
                $('#information-status').css({'top':'80px'});
                activeListID = activeCID;
            }
            else {
                $('#information-header2').css({'display':'block'});
                $informationView.css({'top':'120px'});
                $('#information-status').css({'top':'124px'});
                self.__list2Scroller.scroller.scroller.innerHTML = template('views/information/mapstair', {
                    mapstair: Header2Data
                });

                activeListID = Object.keys(Header2Data)[0];
                
                //调整宽度
                $('#information-mapstair2').children().eq(0).css('width', getSuitableWidth($('#information-mapstair2').children().eq(0)) + 'px');
                    self.__list2Scroller.scroller.refresh();
                    self.__list2Scroller.scroller.scrollTo(0, 0, 300);
            }

            resolve();    
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

    var 
        PAGENUM = 0,
        LISTCOUNT = 10;

    this.__renderList = function() {
        var self = this;

        return new Promise(function(resolve, reject) {
            PAGENUM = 0; LISTCOUNT = 10;
            $informationStatus.addClass('loading-list');
            FW.Dataline.LoadList('news', activeListID, PAGENUM, LISTCOUNT).then(function(data){
                if (!data.success || !data.data) {
                    $informationStatus.removeClass('loading-list').addClass('nocontent-list');
                    return;
                }
       
                $informationView.find('ul').children().not('.refresh-container').remove();

                var html = template('views/card/list', {
                    list: refineListData(data.data)
                });

                $informationView.find('.refresh-container').before(html);
                renderListImages($informationView);
                $informationView.find('.refresh-container').show();    
                $listScroller.scroller.refresh();
                foucsList();
                
                $informationStatus.removeClass('loading-list nocontent-list');
                newsGetReady = true;   
            });
        });
    };


    /*
    **
    ****************************辅助方法*****************************
    **
    */
   
    // 优化体系数据供模板使用
    // 寻找默认分类ID
    function refineSystemData(data) {
        var refinedData = {},
            cateID, cate, systemID, system, siteID, site, sites, counter = 0;

        refinedData = data;
        defaultCID = Object.keys(refinedData)[0];

        if (refinedData[defaultCID].end == 1) {
            defaultListID = Object.keys(refinedData[defaultCID].data)[0];
        } else {
            defaultListID = defaultCID;
        }

        activeCID = defaultCID;
        activeListID = defaultListID;

        return refinedData;
    };

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

    // 计算一个正确的资讯分类横向宽度
    function getSuitableWidth(cont) {
        var suitableWidth = 0;

        cont.find('li').each(function() {
            suitableWidth += $(this).width() + 5;
        });

        return suitableWidth;
    };

    function foucsList() {
         $informationView.find('li').on('tap', function() {
            var 
                mask = $(this).attr('mask') + '?cms' + '?news',
                text = $(this).find('.list-title').text();
  
            if (App.page('launch').mask == 'close') {
                J.Router.goTo(mask);
            } else if (!App.page('launch').mask || App.page('launch').mask == 'open') {
                $informationView.find('li').not($(this)).removeClass('list-item-foucs');
            
                if ($(this).hasClass('list-item-foucs')) {
                    J.Router.goTo(mask);
                } else {
                    $(this).addClass('list-item-foucs');
                    App.speaker.pointerRead(text);
                }  
            } 
        });
    };
});
