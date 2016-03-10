App.page('article', function() {
    'use strict';

    var $articleView, // 正文视图
        $articleViewer, // 正文阅读容器
        $articleStatus,
        $nocontent,
        $loading,

        hash,
        activeAID;

    // 渲染文章正文中的图片
    function renderArticleImages($listContainer) {
        $listContainer.find('.picture').not('.ready').each(function() {
            var $this = $(this), imageSrc;

            imageSrc = this.getAttribute('data-image');

            loadImg(imageSrc, function(src) {
                $this.css('background-image', 'url(' + src + ')');
                $this.addClass('ready');
            });
        });
    }


    /*
     * 初始化
     *
     * @method init
     * @access public
     * @return {Void}
     */
    this.init = function(){
        var self = this;

        $articleView = $('#article_section');
        $articleViewer = $('#article-viewer');
        $articleStatus = $('#article-status');
        $nocontent = $('#article-nocontent');
        $loading = $('#article-loading');

        this.__articleViewer = J.Scroll($articleViewer, {bounce: true});

        $nocontent.on('tap', function() {
            $articleStatus.removeClass('nocontent');

            self.load();
        });
    };


    /*
     * 准备工作
     *
     * @method prepare
     * @access public
     * @return {Void}
     */
    this.prepare = function() {
    };


    /*
     * 渲染页面
     *
     * @method show
     * @access public
     * @return {Void}
     */
    this.show = function() {
        var self = this;

        hash = J.Util.parseHash(location.hash);
        activeAID = hash.param.aid;

    };


    /*
     * 加载数据
     *
     * @method load
     * @access public
     * @return {Void}
     */
    this.load = function() {
        var self = this,
        refinedData;

        $articleStatus.addClass('loading');

        App.load.article(activeAID, 'sart')
            .then(function(data) {
                refinedData = refineArticleData(data);
                self.__articleViewer.scroller.scroller.innerHTML = template('views/artcle/read', refinedData);
                self.__articleViewer.scroller.refresh();

                $('article').css('font-size', window.font);
                $('footer').css('font-size', window.font); 

                $articleStatus.removeClass('loading nocontent');

                YX.Tools.Reader(data.data.art);

            })
            .catch(function(err) {
                switch (err) {
                    case 'ESERVERFAIL':
                        $articleStatus.addClass('nocontent');
                        break;
                    case 'ENOTREADY':
                        $articleStatus.addClass('nocontent');
                        break;
                    default:
                        break;
                }

                // throw new URIError('Unable to retrive article data: ' + err);
            });
    };

    function refineArticleData(data) {
       var refinedData = data.data;

       // console.log(refinedData.art);
        refinedData.art = refinedData.art.replace(/DrawImage\(this\)/ig,'').replace(/height=\"\d+\"/ig,'').replace(/width=\"\d+\"/ig,'');  
        console.log(refinedData.art);
        return refinedData ;
    }

    /*
     * 隐藏前
     *
     * @method hide
     * @access public
     * @return {Void}
     */
    this.hide = function() {
        var self = this;

        App.speaker.stop();
    };

});
