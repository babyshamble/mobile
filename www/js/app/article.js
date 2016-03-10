App.page('article', function() {
    'use strict';

    var $articleView, // 正文视图
        $articleViewer, // 正文阅读容器
        $articleStatus,
        $nocontent,
        $loading,
        $artScroll,

        hash,
        activeAID,
        activeSID,
        sys,
        kind,
        Proxy,
        manual;

    var
        chapters = []
        ,TRANSFORMER = /<p[^>]*>|<\/p[^>]*>|<font[^>]*>|<\/font[^>]*>|<div[^>]*>|<\/div[^>]*>|<br[^>]*>|<span[^>]*>|<\/span[^>]*>|<table[^>]*>|<\/table[^>]*>|<tbody[^>]*>|<\/tbody[^>]*>|<td[^>]*>|<\/td[^>]*>|<tr[^>]*>|<\/tr[^>]*>|\n/g // 用于分割段落
        ,SECTENCE = /。|，|？|！|；|,|:|!/g // 用于分句
        ,LONGER = /。|？|！|!/g ;

    var 
        chapterId = 0,
        sentenceId = 0,
        chaptersLength = 0;

    // 渲染文章正文中的图片
    function renderArticleImages($listContainer) {
        $listContainer.find('img').not('.ready').each(function() {
            var $this = $(this), imageSrc;

            imageSrc = this.getAttribute('data-image');

            loadImg(imageSrc, function(src) {
                $this.attr('src', src);
                $this.addClass('ready');
                $artScroll.scroller.refresh();
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

        $artScroll = J.Scroll($articleViewer, {bounce: true});

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
        sys = hash.hash.split('?')[2];
        kind = hash.hash.split('?')[3];
        activeAID = hash.param.aid;
        activeSID = hash.param.sid;
    };


    /*
     * 加载数据
     *
     * @method load
     * @access public
     * @return {Void}
     */

    this.load = function() {
        var text;
        $articleStatus.addClass('loading');

        if (activeAID) {
            if (sys== 'cms') {
                FW.Dataline.LoadArticle(kind, activeAID).then(function(data){
                    if (!data.success || !data.data) {
                        $articleViewer.removeClass('loading').addClass('nocontent');
                        return;
                    }
                    Proxy = data.imageProxy;
                    manual = data.data.manual;
                    artProcess(data);
                });
            } else if(sys== 'dataCenter') {
                App.load.article(activeAID, 'sart')
                .then(function(data) {
                    Proxy = data.imgProxy;
                    artProcess(data);
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
                });
            }
        }

        if (activeSID) {
            App.load.searchArt(activeSID, function(result) {
                refinedData = result[0];
                $artScroll.scroller.scroller.innerHTML = template('views/artcle/read', refinedData);
                
                refineArticleData(refinedData);
                $articleStatus.removeClass('loading nocontent');
                foucsChapterTap();
            });
        }
    };

    function artProcess (data) {
        var refinedData = data.data;
        
        $artScroll.scroller.scroller.innerHTML = template('views/artcle/read', refinedData);
        refineArticleData(refinedData);
        $articleStatus.removeClass('loading nocontent');
        foucsChapterTap();
    };

    function refineArticleData(data) {
       var  cache = data.art, at = [];
            
        cache = cache.replace(/<img[^>]*?(src="[^"]*?")[^>]*?>/g, '<img $1 />').replace(/(&quot;)/ig,"\"").replace(/(&gt;)/ig,">").replace(/(&lt;)/ig,"<").replace(/(&nbsp;)/ig,"").split(TRANSFORMER);
        
        for (var i in cache) {
            if (cache[i] != '') {
                at.push(cache[i]);
            }
        }

        getChapters(at);
    };  

    function getChapters(e) {
        var
            reader = [], div, node, nodes, inner, chapter = [], longer = [],
            LONGER = /。|？|！|!/g, re = /\S+/ig;

        for (var i=0; i<e.length; i++) {
            div = document.createElement('div');
            div.innerHTML = e[i];
            nodes = $('img', div);

            if (nodes.length > 0) {  //说明包含img标签
                for (var n=0; n<div.childNodes.length; n++){
                    node = div.childNodes[n];
                    if (node.nodeName == 'IMG' || node.nodeName == 'img') {
                        if (sys == 'dataCenter') {
                            node.src = Proxy + node.src;
                        } else if (sys = 'cms') {
                            if (manual == 1) {
                                node.src =  node.src.replace(/http:\/\/localhost/ig, Proxy);
                            }
                        }
                        
                        reader.push({type: 'img', value: node.src});
                    }
                    else if (node.nodeName == '#text') { 
                        //这是文本直接把p里的内容丢进
                        node.nodeValue = node.nodeValue.replace(/\s+/ig, '');
                        if (node.nodeValue != '') {
                            reader.push({type: 'text', value: node.nodeValue});
                        }
                    }
                }
            }
            else { //说明不包含img标签
                e[i] = e[i].replace(/\s+/ig, '');
                if (e[i] != '') {
                    reader.push({type: 'text', value: e[i]});
                }
            }
        }

        renderMain(reader);
        $artScroll.scroller.refresh();
        renderArticleImages($articleViewer);
    }; 

    function renderMain (data) {
        $('.article-content').html('');
        chapters = [];
        var mask = 0;

        for (var i = 0; i < data.length; i++) {
            if (data[i] != undefined && data[i].type == 'text') {
                var text = '<p class="art-main-p" mask='+mask+'>'
                var sentence = data[i].value.split(SECTENCE);
                var symbols = data[i].value.match(SECTENCE);
                symbols = !symbols ? [] : symbols;

                var st = [], inner = '', j = 0;
                
                for (j = 0; j < symbols.length && j< sentence.length; j++) {
                    sentence[j] = sentence[j].replace(/\s+/ig, '');

                    if (sentence[j] != '') {
                        inner += '<span class="art-main-span">' + sentence[j] + '</span>';
                        st.push(sentence[j]);
                        inner += symbols[j];
                    }
                }

                for (;j < sentence.length; j++) {
                    sentence[j] = sentence[j].replace(/\s+/ig, '');
                    if (sentence[j] != '') {
                        inner += '<span class="art-main-span">' + sentence[j] + '</span>';
                        st.push(sentence[j]);
                    }
                }

                text += inner;
                text += '</p>';

                if (st && st.length > 0) {
                    $('.article-content').append(text);
                    chapters.push(st);
                    mask++;
                }
                
            } else if (data[i] != undefined && data[i].type == 'img') {
                var img = '<img  data-image = "'+data[i].value+'" src="" class="art-main-img" />';
                $('.article-content').append(img);    
            }
        }
    };

    function foucsChapterTap() {
        $('.art-main-p').off('tap').on('tap', function(e) {
            App.speaker.stop();
            $('.art-main-span').removeClass('art-sentence-foucs');
            $(this).find('span').eq(0).addClass('art-sentence-foucs');

            chapterId = parseInt($(this).attr('mask'));
            sentenceId = 0;
            reader(); 
        });
    };

    function reader(isFirst) {
        var currentChapter, nextChapter;
        chaptersLength = chapters.length - 1;

        currentChapter = chapters[chapterId][sentenceId];

        if (chapterId > chaptersLength) {
            nextChapter = null;
        }
        else {
            if (sentenceId >= chapters[chapterId].length -1) {
                if (chapterId >= chaptersLength) {
                    nextChapter = null;
                }
                else {
                    nextChapter = chapters[chapterId+1][0];
                }
            } else {
                nextChapter = chapters[chapterId][sentenceId+1];
            }
        }

        currentSentenceFoucs();
        
        var self = this;

        isFirst = (undefined === isFirst) ? true : !!isFirst;

        App.speaker.continueRead(
            currentChapter,
            nextChapter,
            function () {
            },
            SetCurrentReadingIndex,
            isFirst,
            function () {
            }
        );
    };

    function currentSentenceFoucs () {
        var 
            span = $($('.art-main-p')[chapterId]).find('span').eq(sentenceId);
        
        $('.art-main-span').removeClass('art-sentence-foucs');  
        span.addClass('art-sentence-foucs');
    };


    function SetCurrentReadingIndex() {
        if (chapterId <= chaptersLength) {
            if (sentenceId >= chapters[chapterId].length - 1) {
                 chapterId++;
                 sentenceId = 0;
                 if (chapterId > chaptersLength) {
                    SetCurrentReadingIndex();
                    return;
                 }

            } else {
                sentenceId++;
            }   
        }
        else {
            chapterId = 0;
            App.speaker.stop();
            return;
        }

        reader(false);
    };
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
