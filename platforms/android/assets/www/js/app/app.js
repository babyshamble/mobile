// 注册设备就绪事件
document.addEventListener('deviceready', function onDeviceReady(){

    //处理后退事件
    document.addEventListener('backbutton', function(e) {
        if (J.hasMenuOpen) {
            J.Menu.hide();
        }
        else if (J.hasPopupOpen) {
            J.closePopup();
        }
        else {
            var sectionId = $('section.active').attr('id');

            if(sectionId === 'index_section') {
                J.confirm('提示','是否退出程序？', function(){
                    navigator.app.exitApp();
                });
            }
            else {
                window.history.go(-1);
            }
        }

    }, false);

}, false);

// 初始化通用App
var App = (function() {

    var pages = {};

    var run = function(){
        var html = '<div id="loading-div">'
                 +     '<div class="la-ball-fussion">'
                 +          '<div></div>'
                 +          '<div></div>'
                 +          '<div></div>'
                 +          '<div></div>'
                 +     '</div>'
                 + '</div>';

        $('#section_container').html(html);

        $.each(pages, function(k, v){
            var sectionId = '#' + k + '_section',
                $body = $(document.body);

            $body.delegate(sectionId, 'pageinit', function(){
                v.init && v.init.call(v);
            });

            $body.delegate(sectionId, 'pageshow', function(e, isBack) {

                //页面加载的时候都会执行
                v.show && v.show.call(v);

                //后退时不执行
                if(!isBack) {
                    v.load && v.load.call(v);
                }

            });

            $body.delegate(sectionId, 'beforepageshow', function(e, isBack) {
                if (!isBack) {
                    v.prepare && v.prepare.call(this);
                }
            });

            $body.delegate(sectionId, 'beforepagehide', function(e, isBack) {
                v.hide && v.hide.call(v);
            });

        });

        // Jingle 要求在行内内置一个默认的 section
        // 以后可以在这里扩展，通过传递配置，配置显示哪些子系统
        // J.$('#section_container').append(template('views/app-index', {}));
        var name = $('#launch-name').html();
        J.$('#section_container').append(template('views/launch_section', {name : name}));

        //transitionType 转场动画
        J.Transition.add('flip', 'slideLeftOut', 'flipOut', 'slideRightOut', 'flipIn');

        //jingle初始化
        Jingle.launch({
            showWelcome : false,
            showPageLoading : false
        });
    };

    var page = function(id, factory) {
        return ((id && factory)?_addPage : _getPage).call(this, id, factory);
    };

    var _addPage = function(id, factory) {
        pages[id] = new factory();
    };

    var _getPage = function(id) {
        return pages[id];
    };

    return {
        run : run,
        page : page
    };

}());


$(function(){

    // J.Cache.clear(); // 开发时清除缓存
    // localStorage && localStorage.clear();

    /* 语音接口测试
    $(document.body).on('tap', function() {
        App.speaker.pointerRead('李方，快过来给我端茶！');
    });
    */

    App.load = new YX.Mobile.Sitemap(); // 数据接口
    FW.Dataline.Datapool();
    App.load.isCache(false); // 数据接口不使用缓存

    App.speaker = new YX.Tools.Speaker(); // H5语音接口
    App.speaker.init();

    App.config = new YX.Mobile.Config();
    App.theme = new YX.Mobile.Theme();

    App.run();

});
