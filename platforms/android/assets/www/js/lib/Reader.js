/** vim: et:ts=4:sw=4:sts=4
 * @fileoverview 超轻量的播报一个节点内部文本的工具链
 * @author       Kezhen Wang <latelx64@gmail.com>
 * @version      0.1.0
 */

(function() {

    var BORDER_CHOPPER = /^\n*|\n*$/g, // 边界修正
        DELIMITER = /，|。|、|？|！|；|：|\.|,|\?|;|:|【|】/g, // 语句分隔符;;;;;;;;;;;;;
        LINE_BREAK = /\n+/g, // 段落分隔符
        SPACE = /\s*/g, // 空格符
        TRIM = /^\s*|\s*$/, // 首位空白字符
        MANY_SPACE = /\s{2,}/g, // 多余两个空格
        TRANSFORMER = /<p[^>]*>|<\/p[^>]*>|<br[^>]*>/g, // 用于分割段落
        DISCORDANT = /^字号|来源|发布日期|来源|分享到|新浪|微博|人人$/g, // 过滤包含下列字段的句子
        HTMLTAG = /<\/?[^>]*>/g;

    var
        readings = [],
        readingAt = 0;

    if (undefined === typeof YX) {
        YX = {};
    }

    if (undefined === typeof YX.Tools) {
        YX.Tools = {};
    }



    // 提取章节
    function getChapters(content) {
        var len = 0, offset = 0,
            chapters = [""],
            fragments = content.replace(TRANSFORMER, "\n").replace(HTMLTAG, '').replace(BORDER_CHOPPER, "").split(LINE_BREAK);

        $.each(fragments, function(index) {
            len += this.length;
            if (len > 400) {
                chapters[offset] += fragments[index];
                len = 0;
                chapters[offset] = chapters[offset].replace(TRIM, '').replace(MANY_SPACE, '');
                chapters[++offset] = "";
            }
            else {
                chapters[offset] += fragments[index];
            }
        });

        // 最后一行的首位空白符需要在循环结束时额外消除
        chapters[offset] = chapters[offset].replace(TRIM, '').replace(MANY_SPACE, '');

        return chapters;
    }

    // 提取短句和标点符号
    // @todo 不要将带有小数的数字断句，如 1.2亿
    function getSentences(chapters) {
        // 提取文本节点
        function getTextNodes(content) {
            var text, node, delimiters, verses;

            node = document.createElement("DIV");
            node.innerHTML = content instanceof $? content.html() : content;
            text = $(node).text().replace(SPACE, "");
            delimiters = text.match(DELIMITER);
            verses = text.split(DELIMITER);
            node = null;
            return {
                verses: verses,
                delimiters: delimiters
            };
        }

        var i, len, textNodes, j, len2, verses = [], delimiters = [];
        for (i = 0, len = chapters.length; i < len; i++) {
            verses[i] = [];
            delimiters[i] = [];
            textNodes = getTextNodes(chapters[i]);
            for (j = 0, len2 = textNodes.verses.length; j < len2; j++) {
                if (textNodes.verses[j] && !DISCORDANT.test(textNodes.verses[j])) {
                    verses[i].push(textNodes.verses[j]);
                    delimiters[i].push(textNodes.delimiters[j]);
                }
            }
        }

        return {
            verses: verses,
            delimiters: delimiters
        };
    }

    // 阅读函数
    function reader(isFirst) {
        var self = this;

        isFirst = (undefined === isFirst) ? true : !!isFirst;

        App.speaker.continueRead(
            readings[readingAt],
            readings[readingAt + 1],
            function () {
            },
            function () {
                // 判断本章节是否已经读完
                readingAt = readingAt + 1;
                if (readingAt < readings.length) {
                    reader(false);
                }
            },
            isFirst,
            function(text) {
                if (undefined !== typeof J) {
                    // J.Toast.show('toast', text);
                    var re = "/"+text+"/ig";
                    $('#article-inner').html().match(re);
                }
            }
        );
    }



    YX.Tools.Reader = function($container) {
        var text,
            chapters,
            sentences,
            i,
            len;

        if ('string' === typeof $container) {
            text = $container;
        }
        else {
            text = $($container).text();
        }

        // 获取章节段落
        chapters = getChapters(text);
        sentences = getSentences(chapters);

        // 扁平化所有语句
        readings = [];
        readingAt = 0;
        for (i = 0, len = sentences.verses.length; i < len; i++) {
            readings = readings.concat(sentences.verses[i]);
        }

        reader();
    };

})();
