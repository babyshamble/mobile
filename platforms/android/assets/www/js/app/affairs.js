App.page('affairs', function() {

    var 
        $affairsView,
        $affairsStatus,
        $loading,
        $nocontentSystem,
        $nocontentList,
        $categories,
        $back,

        cachedSystemData,
        cachedMainData,

        hash,
        end,
        defaultCID, // 默认的一级ID
        activeCID, // 当前处于激活一级ID

        affairsGetReady;

    var
        $categoriesScroll,
        $listScroller,
        $listRefresh;
    /*
     * 初始化方法
     *
     * @method init
     * @access public
     * @return {Void}
     */
    var 
        PAGENUM = 0,
        LISTCOUNT = 10;

    this.init = function() { 
        var self = this;

        $affairsStatus = $('#affairs-status');
        $loading = $('#affairs-loading');
        $nocontentSystem = $('#affairs-nocontent-system');
        $nocontentList = $('#affairs-nocontent-list');
        $categories = $('#affairs-category');
        $affairsView = $('#affairs-viewer');
        $back = $('#affairs-back');

        $categoriesScroll = J.Scroll('#affairs-category', {hScroll: true, hScrollbar: false});
        $listScroller = J.Scroll('#affairs-viewer', {bounce: true});

        $categories.on('change', function(ev, $target) {
            $listScroller.scroller.scrollTo(0, 0, 0);
            activeCID = $target[0].getAttribute('data-cid');
            end = $target[0].getAttribute('data-end');
            cachedMainData = cachedSystemData[activeCID].data;
            App.page('affairs').mask = true;
            renderJudge();
        });
    };

    function listRefresh() { 
        $listRefresh = J.Refresh({
            selector: '#affairs-viewer',
            type: 'pullUp',
            callback: (function() {
                return function () {
                    if (end == 1) return;

                    FW.Dataline.LoadList('affairs', activeCID, ++PAGENUM, LISTCOUNT).then(function(data){
                        if (!data.success || !data.data) {
                            $listScroller.scroller.refresh();
                            J.showToast('没有更多内容了...','toast',1000);
                            $affairsView.find('.refresh-container').hide();
                        } else {
                            $affairsView.find('.refresh-container').show();
                            var html = template('views/list/list', {
                                list: refineListData(data.data)
                            });
                            $affairsView.find('.refresh-container').before(html);

                            renderListImages($affairsView);
                            $listScroller.scroller.refresh();
                            listOnTap();
                        }
                    });
                };
            }())
        });
    }
    /*
     * 渲染页面
     *
     * @method show
     * @access public
     * @return {Void}
     */

    this.show = function() {
        if (affairsGetReady) return;
        hash = J.Util.parseHash(location.hash);
        App.speaker.unPointerRead();
        YX.Mobile.TestVolStu();  

        renderSystem();
        backOnTap(); 
    };

    /*
     * 渲染一级栏目
     *
     * @method renderSystem
     * @access private
     * @return {Void}
     */
     function renderSystem() {
       FW.Dataline.LoadDepend('affairs').then(function(data){
            if (!data.success || !data.data) {
                $affairsStatus.removeClass('affairs-loading').addClass('nocontent-system');
                return;
            }
       
            var refinedData = refineSystemData(data.data);
            $categoriesScroll.scroller.scroller.innerHTML = template('views/affairs/category', {
                systems: refinedData
            });

            $categories.children().eq(0).css('width', getSuitableWidth($categories.children().eq(0)) + 'px');
            $categoriesScroll.scroller.refresh();

            App.page('affairs').mask = true;
            renderJudge(); 
        });
    };

    function renderJudge() {
        return new Promise(function(resolve, reject) {
            if (end == 1) {
                renderCate(this);
            } else if (end == 0) {
                renderList(this);
            }
        });
    };
    
    function renderCate() {
        if (App.page('affairs').mask) {
                square();
                affairsGetReady = true;
        } else {
            FW.Dataline.LoadUnknown('affairs', activeCID).then(function(data){
                if (!data.success || !data.data) {
                    $affairsStatus.removeClass('affairs-loading').addClass('nocontent-system');
                    return;
                }

                cachedMainData = data.data;
                end = data.end;

                if (end == 0) {
                    bigThumbnail(); 
                } else if (end == 1) {
                    square();
                }
            });
        }
    };

    function renderList() {
        bigThumbnail();
        affairsGetReady = true; 
    };

    function square() {
        $affairsView.children().eq(0).removeClass('big-thumbnail').addClass('square');
        $affairsView.find('ul').children().not('.refresh-container').remove();
        $affairsView.find('.refresh-container').hide();

        $($listScroller.scroller.scroller).prepend(template('views/affairs/cate', {
                cates: cachedMainData
        }));

        cateItemColor($affairsView.children().eq(0));
        $listScroller.scroller.refresh();
        cateOnTap();
    };

    function bigThumbnail() {
        PAGENUM = 0,
        LISTCOUNT = 10;
        $affairsView.children().eq(0).removeClass('square').addClass('big-thumbnail');
        $affairsView.find('ul').children().not('.refresh-container').remove();
        $affairsView.find('.refresh-container').show();


        $($listScroller.scroller.scroller).prepend(template('views/list/list', {
            list: refineListData(cachedMainData)
        }));

        renderListImages($affairsView);
        if (!$listRefresh) listRefresh();
        $listScroller.scroller.refresh();
        listOnTap();  
    };

    /*
    **
    ****************************辅助方法*****************************
    **
    */
    function cateOnTap() {
        $('.square_item').on('tap', 'li', function(ev) {
            activeCID = $(this).attr('data-cid');
            $back.show();
            App.page('affairs').mask = false;
            renderCate();
        });
    };

    function listOnTap() {
         $('#affairs-viewer').find('li').on('tap', function() {
            var 
                mask = $(this).attr('mask') + '?cms' + '?affairs',
                text = $(this).find('.list-title').text();
 
            if (App.page('launch').mask == 'close') {
                J.Router.goTo(mask);
            } else if(!App.page('launch').mask || App.page('launch').mask == 'open') {
                $('#affairs-viewer').find('li').not($(this)).removeClass('list-item-foucs');
            
                if ($(this).hasClass('list-item-foucs')) {
                    J.Router.goTo(mask);
                } else {
                    $(this).addClass('list-item-foucs');
                    App.speaker.pointerRead(text);
                }  
            }
        });
    };

    function backOnTap() {
        $back.on('tap', function() {
            FW.Dataline.LoadParent('affairs', activeCID).then(function(data){
                if (!data.success || !data.data) {
                    $informationStatus.removeClass('loading-list').addClass('nocontent-list');
                    return;
                }

                cachedMainData = data.data;
                if (data.end == 0) {
                    $back.hide();
                } else if (data.end == 1) {
                    activeCID = data.pid;
                }

                square();
            });
        });
    };

    // 优化体系数据供模板使用
    // 寻找默认分类ID
    function refineSystemData(data) {
        var refinedData = {};

        refinedData = data;
        defaultCID = Object.keys(refinedData)[0];
        activeCID = defaultCID;
        cachedSystemData = refinedData;
        cachedMainData = cachedSystemData[activeCID].data;
        end = cachedSystemData[activeCID].end;

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
    
    function cateItemColor($cont) {
        var color = ['#00C1CE', '#00DF90', '#F4106A', '#C52FEE', '#FEA900','#FF224D'];

        $cont.find('li').not('.refresh-container').each(function() {
            var num = ($(this).index()) % (color.length);
            $(this).css('background-color', color[num]);
        });
    };
});
