App.page('search', function() {
    'use strict';

    var PAGE_NUM = 1,
        WEB_NUM = '';

    var tid = '',
        key = '',
        json = '',
        searchResult = '';

    var listScroller = '';
    /*
     * 初始化方法
     *
     * @method init
     * @access public
     * @return {Void}
     */
    this.init = function(){
        this.__mapStairScroller = J.Scroll('#search-map-stair', {hScroll:true, hScrollbar: false});

        listScroller = J.Refresh({
            selector: '#search-viewer',
            checkDOMChanges: true, // Jingle 忽略了这个值
            type: 'pullUp',
            pullText : '<span style="color:#B2B2B2">加载更多</span>',
            releaseText : '<span style="color:#B2B2B2">正在加载,请稍后...</span>',
            callback: (function(verifyWID, verifyMapId) {
                return function () {
                    var num = Math.ceil (searchResult.total) / 10;
                    if (PAGE_NUM < num) {
                        PAGE_NUM++;
                        App.load.searchList(PAGE_NUM, tid, key, renderList);
                    }
                };
            }())
        });

        $('#search-viewer').find('.refresh-container').hide();
    };

    /*
     * 渲染页面
     *
     * @method show
     * @access public
     * @return {Void}
     */
    this.show = function() { 
        App.speaker.unPointerRead();
        
        var self = this;
     
        renderKey();
        renderText();
    };

    function renderKey () { 
        $('#control-group li').on('tap', function() {
            tid = $(this).attr('tid');
        });
    };

    function renderText () {
         $('#search-key').on('tap', function(e) {
            key = $('#search-input').val();
            if (!key) {
                J.Toast.show('toast', '请输入关键字');
                return;
            }

            $('#search-viewer').find('.refresh-container').hide();
            listScroller.scroller.scrollTo(0, 0);
            $('#search-nocontent-system').find('div').removeClass('nocontent-system');
            $('#search-loading-system').find('div').addClass('loading-system');

            App.load.searchList(PAGE_NUM, tid, key, renderList);
            $('#search-viewer').find('ul').html(''); 
        });
    };

    function renderList(result) {

        if (!result && result.total == 0) {
            $('#search-viewer').find('.refresh-container').hide();
            $('#search-nocontent-system').find('div').addClass('nocontent-system');
            return;
        }
       
        searchResult = result;
        var data = result.data[0];
       
        for (var i in data) {
            var html =  '<li class="list-item nothumbnail"  mask="#article_section?sid='+data[i].id+'" >'
                     +      '<div class="list-content">'
                     +          '<div class="list-title">'
                     +              data[i].name
                     +          '</div>'
                     +          '<p class="list-brief">'
                     +              data[i].cart
                     +          '</p>'
                     +          '<div class="list-footprint">'
                     +              '<span class="list-date">'
                     +                  data[i].time
                     +              '</span>'
                     +          '</div>'
                     +      '</div>'
                     +  '</li>'
            $('#search-viewer').find('ul').append(html);
        }

        $('#search-loading-system').find('div').removeClass('loading-system');
        $('#search-viewer').find('.refresh-container').show();
        $('#search-viewer').find('ul').animate({opacity:1});
        listScroller.scroller.refresh();
        searchListClcik();
    };

    function searchListClcik() {
        $('#search-viewer').find('li').on('tap', function() {
            var 
                mask = $(this).attr('mask');
            if (mask) {
                J.Router.goTo(mask);
            }   
        })
    };
});
