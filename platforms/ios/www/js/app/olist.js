App.page('olist',function(){
    var
        $olistView,
        $categories,
        $title,
        $informationStatus,
        $loadingSystem,
        $loadingList,
        $nocontentSystem,
        $nocontentList,

        defaultLID,
        activeLID,
        activeMapStairID,
        activeTitle,
        pageNumber = 1,
        NEWS_PER_REQUEST = 40,

        renderedAlready = false,
        cacheListData;

    this.init = function(){
        var self = this;
            $olistView = $('#olist_section');
            $categories = $('#olist-category');
            $title = $('#olist-title');  
            $olistStatus = $('#olist-status');
        
        this.__listScroller = J.Scroll('#olist-viewer', {bounce: true});

        this.__categoryScroller = J.Scroll('#olist-category', {hScroll: true, hScrollbar: false});

        $categories.on('change', function(ev, $target) {
            self.__listScroller.scroller.scrollTo(0, 0, 300);

            activeMapStairID = $target[0].getAttribute('data-cid');

            Promise.resolve()
                .then(self.__renderList.bind(self));
        });

        $('article').css('font-size', window.font);
        $('footer').css('font-size', window.font);
        $('.header-secondary').css('font-size', window.font);

    }

    this.show = function() {
        var lid;
    
        hash = J.Util.parseHash(location.hash);
        lid = hash.param.lid;

        if (lid == activeLID)
            return;
        activeLID = lid;

        Promise.resolve()
            .then(this.__renderMap.bind(this))
            .then(this.__renderList.bind(this));
    }
    
    // 更新网站标题
    function updateTitle() {
        $title.html(activeTitle || '办事列表');
    }

    this.__renderMap = function() {
        var self = this;

        return new Promise(function(resolve, reject) {
            $olistStatus.addClass('loading-system'); 
            // 继续从服务器加载最新的列表数据
            App.load.list(activeLID, 'olist', pageNumber, NEWS_PER_REQUEST, 0)
                .then(function (data) {

                var refinedData = refineMapData(data.data);
                $olistStatus.removeClass('loading-system'); 

                updateTitle();
                self.__categoryScroller.scroller.scroller.innerHTML = template('views/olist/category', {
                    systems: refinedData
                });

                // 更新分类栏目 control-group的宽度
                $categories.children().eq(0).css('width', getSuitableCategoriesWidth() + 'px');
                self.__categoryScroller.scroller.refresh();
                self.__categoryScroller.scroller.scrollTo(0, 0, 300);

                resolve();

            })
            .catch(function (err) {
                switch (err) {
                    case 'ESERVERFAIL':
                        J.Toast.show('error', '您的网络似乎不给力');
                        self.__categoryScroller.scroller.refresh();
                        break;
                    case 'ENOTREADY':
                        $olistStatus.addClass('nocontent-system');
                        break;
                    default:
                        break;
                }
            });
       
        });
    }

    this.__renderList = function() {
        var self = this, i, activeListData;

        return new Promise(function(resolve, reject) {
            for (i in cacheListData) {
                if (cacheListData[i].id == activeMapStairID) {
                    activeListData = cacheListData[i].data;
                }
            }

            if (!activeListData || activeListData.length == 0) {
                $olistStatus.addClass('nocontent-system');
            }
            else {
                $olistStatus.removeClass('nocontent-system');
                self.__listScroller.scroller.scroller.innerHTML = template('views/olist/list', {
                    lists: activeListData
                });

                self.__listScroller.scroller.refresh();
            }

            renderedAlready = true;
            resolve();   
        });
    }
    
    // 计算一个正确的资讯分类横向宽度
    function getSuitableCategoriesWidth() {
        var suitableWidth = 0;

        $categories.find('li').each(function() {
            suitableWidth += $(this).width() + 5;
        });

        return suitableWidth;
    }

    // 优化一级目录
    function refineMapData(data) {
        var refinedMapStair = [],
            cacheData,
            i, d, len, mapId, map;
        
        for (i in data) {
            cacheData = data[i];
            activeTitle = data[i].name;
        }

        // 分离主题 部门数据 同时给定选择list数据
        if (cacheData.smalltypes == 1503) {
            for (i in cacheData.child) {
                // 部门选中公文类
                if (cacheData.child[i].smalltypes == 1503.001) {
                    activeMapStairID = Object.keys(cacheData.child[i].child)[0];
                    for (d in cacheData.child[i].child) {
                        refinedMapStair.push(cacheData.child[i].child[d]); 
                    }
                    console.log(cacheData.child[i]);
                }
               
            }
        }
        else {
            activeMapStairID = Object.keys(cacheData.child)[0];
            for (i in cacheData.child) {
                // 主题办事
                refinedMapStair.push(cacheData.child[i]); 
            }
        }
        
        cacheListData = refinedMapStair;
        return refinedMapStair;
    }

});