App.page('office',function(){
    var
        $officeView,
        $categories,
        $informationStatus,
        $loadingSystem,
        $loadingList,
        $nocontentSystem,
        $nocontentList,

        defaultCID,
        activeCID,
        activeMapStairID,

        renderedAlready = false,
        cacheSiteData;


    this.init = function() {
        var 
            self = this;
            $officeView = $('#office_section');
            $categories = $('#office-category');  
            $officeStatus = $('#office-status');
            
        this.__listScroller = J.Scroll('#office-viewer', {bounce: true});

        this.__categoryScroller = J.Scroll('#office-category', {hScroll: true, hScrollbar: false});

        $categories.on('change', function(ev, $target) {
            self.__listScroller.scroller.scrollTo(0, 0, 300);

            activeMapStairID = $target[0].getAttribute('data-cid');

            Promise.resolve()
                .then(self.__renderSite.bind(self));
        });

        $('article').css('font-size', window.font);
        $('footer').css('font-size', window.font);
        $('.header-secondary').css('font-size', window.font);

        App.page('text').rec = 1;

    };

    this.show = function() { 
        if (renderedAlready)
            return;

        hash = J.Util.parseHash(location.hash);
        
        Promise.resolve()
            .then(this.__renderSystem.bind(this))
            .then(this.__renderSite.bind(this));
    };

    this.__renderSystem = function() {
        var self = this;

        return new Promise(function(resolve, reject) {
            $officeStatus.addClass('loading-system');
            // 继续从服务器加载最新的体系数据
            App.load.system('ocate')
                .then(function (data) {
                
                var refinedData = refineSystemData(data.data);
                $officeStatus.removeClass('loading-system');
                
                self.__categoryScroller.scroller.scroller.innerHTML = template('views/office/category', {
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
                        $officeStatus.addClass('nocontent-system');
                        break;
                    default:
                        break;
                }
            });
       
        });
    }

    this.__renderSite = function() {
        var self = this, i, activeSiteData;

        return new Promise(function(resolve, reject) {
            for (i in cacheSiteData) {
                if (cacheSiteData[i].id == activeMapStairID) {
                    activeSiteData = cacheSiteData[i].child;
                }
            }

            if (!activeSiteData || activeSiteData.length == 0) {
                $officeStatus.addClass('nocontent-system');
            }
            else {
                $officeStatus.removeClass('nocontent-system');
                self.__listScroller.scroller.scroller.innerHTML = template('views/office/site-list', {
                    sites: activeSiteData
                });

                self.__listScroller.scroller.refresh();
            }
            
            $('td').css('font-size', window.font);
            
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
    function refineSystemData(data) {
        var refinedMapStair = [],
            i, d, len, mapId, map;
     
        for (i in data) {
            activeMapStairID = Object.keys(data[i].child)[0];

            for ( d in data[i].child) {
                refinedMapStair.push(data[i].child[d]);
            }
        }

        cacheSiteData = refinedMapStair;
        return refinedMapStair;
    }

});
