/*TMODJS:{"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    template.helper("dateFormat", function(date, format) {
        date = new Date(+date);
        var map = {
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            q: Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        };
        return format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            return void 0 !== v ? (all.length > 1 && (v = "0" + v, v = v.substr(v.length - 2)), 
            v) : "y" === t ? (date.getFullYear() + "").substr(4 - all.length) : all;
        });
    }), template.helper("parseInt", function(a, b) {
        return parseInt(a, b || 10);
    }), template.helper("min", function(a, b) {
        return Math.min(a, b);
    }), template.helper("max", function(a, b) {
        return Math.max(a, b);
    }), template.helper("stripImages", function(c) {
        return c.replace(/<img[^>]*\/?>/g, "");
    }), template.helper("escape", function(c) {
        return escape(c);
    }), template.helper("col", function(a) {
        return 1 + parseInt(a, 10);
    }), template.helper("firstImg", function(s) {
        return s ? s.split("||")[0].split("/^/^")[0] : "";
    }), /*v:21*/
    template("views/affairs/cate", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, cates = $data.cates, $escape = ($data.category, 
        $data.ci, $utils.$escape), $out = "";
        return counter = 0, $out += " ", $each(cates, function(category) {
            $out += ' <li class="square_item"> <div data-cid="', $out += $escape(category.id), 
            $out += '" data-end="', $out += $escape(category.end), $out += '" >', $out += $escape(category.name), 
            $out += " </div> <i></i> </li> ";
        }), $out += " ", new String($out);
    }), /*v:2*/
    template("views/affairs/category", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, systems = $data.systems, $escape = ($data.category, 
        $data.ci, $utils.$escape), $out = "";
        return counter = 0, $out += " ", $each(systems, function(category) {
            $out += " <li", 0 === counter++ && ($out += ' class="active"'), $out += ' data-cid="', 
            $out += $escape(category.id), $out += '" data-end="', $out += $escape(category.end), 
            $out += '">', $out += $escape(category.name), $out += "</li> ";
        }), $out += " ", new String($out);
    }), /*v:2*/
    template("views/artcle/read", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), name = $data.name, ptime = $data.ptime, $out = "";
        return $out += '<h2 class="article-title">', $out += $escape(name), $out += '</h2> <div class="article-meta"> <span class="article-time">', 
        $out += $escape(ptime), $out += '</span> </div> <div class="article-content"></div> ', 
        new String($out);
    }), /*v:1*/
    template("views/artcle/recommend", ""), /*v:1*/
    template("views/card/item-with-thumbnail", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), thumbnail = $data.thumbnail, id = $data.id, name = $data.name, info = $data.info, submap = $data.submap, ptime = $data.ptime, $out = "";
        return $out += '<li class="list-item" data-image="', $out += $escape(thumbnail[0]), 
        $out += '" data-id="', $out += $escape(id), $out += '" mask="#article_section?aid=', 
        $out += $escape(id), $out += '"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <div class="list-title">', 
        $out += $escape(name), $out += '</div> <p class="list-brief">', $out += $escape(info), 
        $out += '</p> </div> <div class="list-footprint"> <span class="list-source">', $out += $escape(submap), 
        $out += '</span> <span class="list-date">', $out += $escape(ptime), $out += "</span> </div> </li> ", 
        new String($out);
    }), /*v:4*/
    template("views/card/item-without-thumbnail", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), id = $data.id, name = $data.name, brief = $data.brief, from = $data.from, time = $data.time, $out = "";
        return $out += '<li class="list-item nothumbnail" data-id="', $out += $escape(id), 
        $out += '" mask="#article_section?aid=', $out += $escape(id), $out += '"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <div class="list-title">', 
        $out += $escape(name), $out += '</div> <p class="list-brief">', $out += $escape(brief), 
        $out += '</p> </div> <div class="list-footprint"> <span class="list-source">', $out += $escape(from), 
        $out += '</span> <span class="list-date">', $out += $escape(time), $out += "</span> </div> </li> ", 
        new String($out);
    }), /*v:1*/
    template("views/card/list", function($data, $filename) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), list = $data.list, include = ($data.item, 
        $data.ii, function(filename, data) {
            data = data || $data;
            var text = $utils.$include(filename, data, $filename);
            return $out += text;
        }), $out = "";
        return $each(list, function(item) {
            $out += " ", "thumbnail" === item.type && ($out += " ", include("./item-with-thumbnail", item), 
            $out += " "), $out += " ", "nothumbnail" === item.type && ($out += " ", include("./item-without-thumbnail", item), 
            $out += " "), $out += " ";
        }), $out += " ", new String($out);
    }), /*v:1*/
    template("views/card/read", function($data, $filename) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), name = $data.name, ptime = $data.ptime, content = $data.content, include = function(filename, data) {
            data = data || $data;
            var text = $utils.$include(filename, data, $filename);
            return $out += text;
        }, $out = "";
        return $out += '<h2 class="article-title">', $out += $escape(name), $out += '</h2> <div class="article-meta"> <span class="article-time">', 
        $out += $escape(ptime), $out += '</span> </div> <div class="article-content">', 
        $out += $escape(content), $out += "</div> ", include("./recommend"), $out += " ", 
        new String($out);
    }), /*v:53*/
    template("views/config/config", '<div> 主题颜色 </div> <ul id="config_color_list" class="clearfix"> <li class="config_color_item" id="config_color_red" mask="red"></li> <li class="config_color_item" id="config_color_gray" mask="gray"></li> </ul> <div> 字体大小 </div> <ul id="config_font_list" class="clearfix"> <li class="config_font_item" id="config_font_big">Aa</li> <li class="config_font_item active" id="config_font_small">Aa</li> </ul> <div> 语音控制 </div> <ul id="config_reader_list" class="clearfix"> <li class="config_reader_item active" id="config_reader_start">开启</li> <li class="config_reader_item" id="config_reader_stop">关闭</li> </ul> '), 
    /*v:5*/
    template("views/files/cate", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, cates = $data.cates, $escape = ($data.category, 
        $data.ci, $utils.$escape), $out = "";
        return counter = 0, $out += " ", $each(cates, function(category) {
            $out += ' <li class="square_item"> <div data-cid="', $out += $escape(category.id), 
            $out += '" data-end="', $out += $escape(category.end), $out += '" >', $out += $escape(category.name), 
            $out += " </div> <i></i> </li> ";
        }), $out += " ", new String($out);
    }), /*v:2*/
    template("views/files/category", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, systems = $data.systems, $escape = ($data.category, 
        $data.ci, $utils.$escape), $out = "";
        return counter = 0, $out += " ", $each(systems, function(category) {
            $out += " <li", 0 === counter++ && ($out += ' class="active"'), $out += ' data-cid="', 
            $out += $escape(category.id), $out += '" data-end="', $out += $escape(category.end), 
            $out += '">', $out += $escape(category.name), $out += "</li> ";
        }), $out += " ", new String($out);
    }), /*v:1*/
    template("views/information/category", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, systems = $data.systems, $escape = ($data.category, 
        $data.ci, $utils.$escape), $out = "";
        return counter = 0, $out += " ", $each(systems, function(category) {
            $out += " <li", 0 === counter++ && ($out += ' class="active"'), $out += ' data-cid="', 
            $out += $escape(category.id), $out += '" data-code="', $out += $escape(category.code), 
            $out += '">', $out += $escape(category.name), $out += "</li> ";
        }), $out += " ", new String($out);
    }), /*v:1*/
    template("views/information/mapstair", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, mapstair = $data.mapstair, $escape = ($data.map, 
        $data.mi, $utils.$escape), $out = "";
        return counter = 0, $out += " ", $each(mapstair, function(map) {
            $out += " <li ", 0 === counter++ && ($out += 'class="active"'), $out += ' data-mid="', 
            $out += $escape(map.id), $out += '" data-sid="', $out += $escape(map.sid), $out += '" data-code="', 
            $out += $escape(map.code), $out += '">', $out += $escape(map.name), $out += "</li> ";
        }), $out += " ", new String($out);
    }), /*v:10*/
    template("views/information_section", '<section class="active" id="information_section" data-transition="flip"> <header> <nav class="right"> </nav> <h1 class="title">资讯联播</h1> <nav class="right"> <a data-target="menu" data-icon="cog" href="#app_config" id=""></a> </nav> </header> <div id="information-status" class=""> <div id="information-nocontent-system" class="information-statu"> <div> <h3>暂时没有系统内容</h3> <p>点击重试</p> </div> </div> <div id="information-nocontent-list" class="information-statu"> <div> <h3>暂时没有列表内容</h3> <p>点击重试</p> </div> </div> <div id="information-loading-system" class="information-statu"> <div> <div class="la-ball-fussion"> <div></div> <div></div> <div></div> <div></div> </div> </div> </div> <div id="information-loading-list" class="information-statu"> <div> <div class="la-ball-fussion"> <div></div> <div></div> <div></div> <div></div> </div> </div> </div> </div> <nav class="header-secondary"> <div id="information-category"> <ul class="control-group" style="width: 500px;"></ul> </div> </nav> <article class="active" id="information-viewer"> <ul class="applist card"></ul> </article> <footer>  <a href="#information_section" data-target="section" data-icon="newspaper" class="active">首页</a> <a href="#web_section" data-target="section" data-icon="ie">网站</a> <a href="#office_section" data-target="section" data-icon="drawer-2">办事</a> </footer> </section> '), 
    /*v:17*/
    template("views/launch_section", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), name = $data.name, $out = "";
        return $out += '<section id="launch_section" class="active"> <div id="launch-status"> <div id="launch-status-vol">语音版</div> <div id="launch-status-web">网页版</div> </div> <div id="text1"> ', 
        $out += $escape(name), $out += '政务信息公共服务平台 </div> <div id="text2"> 为您提供整体、全面、及时的 </div> <div id="text3"> 政务信息和办事服务 </div> </section> ', 
        new String($out);
    }), /*v:16*/
    template("views/list/item-with-thumbnail", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), thumbnail = $data.thumbnail, id = $data.id, name = $data.name, info = $data.info, submap = $data.submap, ptime = $data.ptime, $out = "";
        return $out += '<li class="list-item" data-image="', $out += $escape(thumbnail[0]), 
        $out += '" data-id="', $out += $escape(id), $out += '" mask="#article_section?aid=', 
        $out += $escape(id), $out += '"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <div class="list-title">', 
        $out += $escape(name), $out += '</div> <p class="list-brief">', $out += $escape(info), 
        $out += '</p> </div> <div class="list-footprint"> <span class="list-source">', $out += $escape(submap), 
        $out += '</span> <span class="list-date">', $out += $escape(ptime), $out += "</span> </div> </li> ", 
        new String($out);
    }), /*v:18*/
    template("views/list/item-without-thumbnail", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), id = $data.id, name = $data.name, info = $data.info, submap = $data.submap, ptime = $data.ptime, $out = "";
        return $out += '<li class="list-item nothumbnail" data-id="', $out += $escape(id), 
        $out += '" mask="#article_section?aid=', $out += $escape(id), $out += '"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <div class="list-title">', 
        $out += $escape(name), $out += '</div> <p class="list-brief">', $out += $escape(info), 
        $out += '</p> </div> <div class="list-footprint"> <span class="list-source">', $out += $escape(submap), 
        $out += '</span> <span class="list-date">', $out += $escape(ptime), $out += "</span> </div> </li> ", 
        new String($out);
    }), /*v:1*/
    template("views/list/list", function($data, $filename) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), list = $data.list, include = ($data.item, 
        $data.ii, function(filename, data) {
            data = data || $data;
            var text = $utils.$include(filename, data, $filename);
            return $out += text;
        }), $out = "";
        return $each(list, function(item) {
            $out += " ", "thumbnail" === item.type && ($out += " ", include("./item-with-thumbnail", item), 
            $out += " "), $out += " ", "nothumbnail" === item.type && ($out += " ", include("./item-without-thumbnail", item), 
            $out += " "), $out += " ", "multithumbnails" === item.type && ($out += " ", include("./item-with-multi-thumbnails", item), 
            $out += " "), $out += " ";
        }), $out += " ", new String($out);
    }), /*v:1*/
    template("views/list/read", function($data, $filename) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), name = $data.name, ptime = $data.ptime, content = $data.content, include = function(filename, data) {
            data = data || $data;
            var text = $utils.$include(filename, data, $filename);
            return $out += text;
        }, $out = "";
        return $out += '<h2 class="article-title">', $out += $escape(name), $out += '</h2> <div class="article-meta"> <span class="article-time">', 
        $out += $escape(ptime), $out += '</span> </div> <div class="article-content">', 
        $out += $escape(content), $out += "</div> ", include("./recommend"), $out += " ", 
        new String($out);
    }), /*v:1*/
    template("views/text/text1", ' <div class="page_block" style="background-color: #ce352b;"> <a href=" /cn/gov "> 国务院 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" http://wza.fmprc.gov.cn/cniil "> 中华人民共和国外交部 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" /cn/ndrc "> 中华人民共和国国家发展和改革委员会 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/most "> 中华人民共和国科学技术部 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/seac "> 中华人民共和国国家民族事务委员会 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/mca "> 中华人民共和国民政部 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" /cn/mof "> 中华人民共和国财政部 </a></div> <div class="page_block"style="background-color: #16499a;"> <a href=" /cn/mlr "> 中华人民共和国国土资源部 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/mohurd "> 中华人民共和国住房和城乡建设部 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" /cn/mwr "> 中华人民共和国水利部 </a></div> <div class="page_block"style="background-color: #16499a;"> <a href=" /cn/mofcom "> 中华人民共和国商务部 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/nhfpc "> 中华人民共和国国家卫生和计划生育委员会 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/audit "> 中华人民共和国审计署 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/moe "> 中华人民共和国教育部 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" http://wza.miit.gov.cn/cniil "> 中华人民共和国工业和信息化部 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" /cn/mps "> 中华人民共和国公安部 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" /cn/ccdi "> 中华人民共和国监察部 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" /cn/moj "> 中华人民共和国司法部 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/mohrss "> 中华人民共和国人力资源和社会保障部 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/mep "> 中华人民共和国环境保护部 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" /cn/moc "> 中华人民共和国交通运输部 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/moa "> 中华人民共和国农业部 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/mcprc "> 中华人民共和国文化部 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" /cn/sasac "> 国务院国有资产监督管理委员会 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" /cn/customs "> 海关总署 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/saic "> 国家工商行政管理总局 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/gapp-sarft "> 国家新闻出版广电总局-国家新闻出版广电总局 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/chinasafety "> 国家安全生产监督管理总局 </a></div> <div class="page_block"style="background-color: #16499a;"> <a href=" /cn/stats "> 国家统计局 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/sipo "> 国家知识产权局 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/sara "> 国家宗教事务局 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/ggj "> 国家机关事务管理局 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" /cn/chinatax "> 国家税务总局 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" /cn/aqsiq "> 国家质量监督检验检疫总局 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" /cn/sport "> 国家体育总局 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/sda "> 国家食品药品监督管理总局 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/forestry "> 国家林业局 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/cnta "> 国家旅游局 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" /cn/counsellor "> 国务院参事室 </a></div>'), 
    /*v:1*/
    template("views/text/text2", ' <div class="page_block"style="background-color: #484848;"> <a href=" http://wza.qh.gov.cn/cniil"> 青海省人民政府 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" http://wza.gd.gov.cn/cniil "> 广东省人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" http://wza.xinjiang.gov.cn:8086/cniil "> 新疆省人民政府 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" http://wza.hainan.gov.cn/cniil "> 海南省人民政府 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/beijing "> 北京市人民政府 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/tj "> 天津市人民政府 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" /cn/shanghai "> 上海市人民政府 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" /cn/cq "> 重庆市人民政府 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/zhejian "> 浙江省人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/yn "> 云南省人民政府 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" /cn/xizang "> 西藏自治区人民政府 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" /cn/sc "> 四川省人民政府 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" /cn/shaanxi "> 陕西省人民政府 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/shanxi "> 山西省人民政府 </a></div> <div class="page_block"style="background-color: #647687;"> <a href=" /cn/shandong "> 山东省人民政府 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/nx "> 宁夏回族自治区 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/nmg "> 内蒙古人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/ln "> 辽宁省人民政府 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" /cn/jiangxi "> 江西省人民政府 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" /cn/jl "> 吉林省人民政府 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" /cn/hunan "> 湖南省人民政府 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/hubei "> 湖北省人民政府 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/henan "> 河南省人民政府 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" /cn/jiangsu "> 江苏省人民政府 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/hlj "> 黑龙江省人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/hebei "> 河北省人民政府 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" /cn/gzgov "> 贵州省人民政府 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" /cn/gxzf "> 广西省人民政府 </a></div> <div class="page_block"style="background-color: #647687;"> <a href=" /cn/gansu "> 甘肃省人民政府 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/fujian "> 福建省人民政府 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/ah "> 安徽省人民政府 </a></div>'), 
    /*v:1*/
    template("views/text/text3", ' <div class="page_block"style="background-color: #484848;"> <a href=" http://wza.fmprc.gov.cn/cniil "> 中华人民共和国外交部 </a></div> <div class="page_block"style="background-color: #647687;"> <a href=" /cn/moc "> 中国人民共和国交通运输部 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" http://wza.miit.gov.cn/cniil "> 中华人民共和国工业和信息化部 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" /cn/hmo "> 中华人民共和国国务院港澳事务办公室 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" /cn/customs "> 中华人民共和国海关总署 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/sbsm "> 中华人民共和国国家测绘地理信息局 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/mohrss "> 中华人民共和国人力资源和社会保障部 </a></div> <div class="page_block"style="background-color: #16499a;"> <a href=" /cn/saic "> 中华人民共和国工商行政管理总局 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/forestry "> 中华人民共和国国家林业局 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/scs "> 中华人民共和国国家公务员局 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" http://wza.gd.gov.cn/cniil "> 广东省人民政府 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" http://wza.hainan.gov.cn/cniil "> 海南省人民政府 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" http://wza.xinjiang.gov.cn:8086/cniil "> 新疆人民政府 </a></div> <div class="page_block"style="background-color: #647687;"> <a href=" /cn/wuhan "> 武汉市人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/beijing "> 北京市人民政府 </a></div> <div class="page_block"style="background-color: #16499a;"> <a href=" /cn/bjyq "> 延庆县人民政府 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/bjhd "> 海淀区人民政府 </a></div>  <div class="page_block"style="background-color: #484848;"> <a href=" /cn/suzhou "> 苏州市人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" http://wza.qh.gov.cn/cniil "> 青海省人民政府 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" /cn/bjpg "> 平谷县人民政府 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" /cn/wenzhou "> 温州市人民政府 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" http://wza.jiaxing.gov.cn/cniil "> 嘉兴市人民政府 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/jconline "> 晋城市人民政府 </a></div> <div class="page_block"style="background-color: #16499a;"> <a href=" /cn/cngy "> 广元市人民政府 </a></div> <div class="page_block"style="background-color: #ce352b;"> <a href=" http://wza.jining.gov.cn/cniil "> 济宁市人民政府 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/neijiang "> 内江市人民政府 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/cnsn "> 睢宁县人民政府 </a></div> <div class="page_block"style="background-color: #647687;"> <a href=" /cn/changshu "> 常熟市人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/ks "> 昆山市人民政府 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" /cn/zh "> 镇海区人民政府 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" /cn/xtyh "> 雨湖区人民政府 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" http://wza.scnj.gov.cn/cniil "> 南江县人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/scyc "> 岳池县人民政府 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" /cn/scnjdx "> 东兴区人民政府 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" http://wza.my.gov.cn/cniil "> 绵阳市人民政府 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/xiaogan "> 孝感市人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/yibin "> 宜宾市人民政府 </a></div>   <div class="page_block"style="background-color: #1ba1e2;"> <a href=" http://wza.yanliang.gov.cn/cniil "> 阎良区人民政府 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" http://wza.lianhu.gov.cn/cniil "> 莲湖区人民政府 </a></div> <div class="page_block"style="background-color: #647687;"> <a href=" http://wza.ziyang.gov.cn/cniil "> 资阳市人民政府 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" http://wza.cncx.gov.cn/cniil "> 苍溪县人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" http://wza.yaan.gov.cn/cniil "> 雅安市人民政府 </a></div> <div class="page_block"style="background-color: #16499a;"> <a href=" /cn/fujin "> 富锦市人民政府 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" http://wza.cj.gov.cn/cdep/cniil "> 昌吉州人民政府 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" http://wza.ahtxq.gov.cn/cniil "> 屯溪区人民政府 </a></div> <div class="page_block"style="background-color: #60a917;"> <a href=" /cn/sxxmhw "> 柯桥区人民政府 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" /cn/fk "> 阜康市人民政府 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" /cn/weinan "> 渭南市人民政府 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" http://218.22.178.94/cniil "> 马鞍山市人民政府 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" http://wza.urumqi.gov.cn/cniil "> 乌鲁木齐人民政府 </a></div>'), 
    /*v:1*/
    template("views/text/text4", ' <div class="page_block"style="background-color: #647687;"> <a href=" http://www.people.com.cn/ "> 人民网 </a></div> <div class="page_block"style="background-color: #16499a;"> <a href=" http://www.xinhuanet.com/ "> 新华网 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" http://www.china.com.cn/ "> 中国网 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" http://www.cctv.com/ "> 央视网 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" http://www.chinadaily.com.cn/ "> 中国日报网 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" http://gb.cri.cn/ "> 国际在线 </a></div> <div class="page_block"style="background-color: #647687;"> <a href=" http://www.youth.cn/ "> 中国青年网 </a></div> <div class="page_block"style="background-color: #484848;"> <a href=" http://www.ce.cn/ "> 中国经济网 </a></div> <div class="page_block"style="background-color: #fa6800;"> <a href=" http://www.taiwan.cn/ "> 中国台湾网 </a></div> <div class="page_block"style="background-color: #16499a;"> <a href=" http://www.tibet.cn/ "> 中国西藏网 </a></div> <div class="page_block"style="background-color: #f0a30a;"> <a href=" http://www.cnr.cn/ "> 央广网 </a></div> <div class="page_block"style="background-color: #d873b6;"> <a href=" http://www.chinanews.com/ "> 中国新闻网 </a></div> <div class="page_block"style="background-color: #1ba1e2;"> <a href=" http://www.gmw.cn/ "> 光明网 </a></div>'), 
    /*v:1*/
    template("views/web/aside-system-list", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, systems = $data.systems, $escape = ($data.system, 
        $data.si, $utils.$escape), counter2 = $data.counter2, $out = ($data.site, $data.ssi, 
        "");
        return counter = 0, $out += " ", $each(systems, function(system) {
            $out += " ", counter++, $out += ' <div class="header">', $out += $escape(system.name), 
            $out += '</div> <ul class="menu"> ', counter2 = 0, $out += " ", $each(system.sites, function(site) {
                $out += " ", counter2++, $out += ' <li data-wid="', $out += $escape(site.id), $out += '"> <a href="#web_section?wid=', 
                $out += $escape(site.id), $out += '" target="section">', $out += $escape(site.name), 
                $out += "</a> </li> ";
            }), $out += " ", 0 === counter2 && ($out += " <li>此分类下暂时没有数据</li> "), $out += " </ul> ";
        }), $out += " ", 0 === counter && ($out += ' <div id="web-aside-nodata"> <p>暂时没有数据</p> </div> '), 
        $out += " ", new String($out);
    }), /*v:1*/
    template("views/web/loading", "<h1>正在努力的加载中...</h1> "), /*v:8*/
    template("views/web/mapstair", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, mapstair = $data.mapstair, $escape = ($data.map, 
        $data.mi, $utils.$escape), $out = "";
        return counter = 0, $out += " ", $each(mapstair, function(map) {
            $out += " <li ", 0 === counter++ && ($out += 'class="active"'), $out += ' data-mid="', 
            $out += $escape(map.id), $out += '" data-sid="', $out += $escape(map.sid), $out += '" data-code="', 
            $out += $escape(map.code), $out += '">', $out += $escape(map.name), $out += "</li> ";
        }), $out += " ", new String($out);
    }), /*v:4*/
    template("views/web/mapstair2", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), mapstair = $data.mapstair, $escape = ($data.map, 
        $data.$index, $utils.$escape), $out = "";
        return $each(mapstair, function(map) {
            $out += ' <li data-mid="', $out += $escape(map.id), $out += '" data-sid="', $out += $escape(map.sid), 
            $out += '" data-code="', $out += $escape(map.code), $out += '">', $out += $escape(map.name), 
            $out += "</li> ";
        }), new String($out);
    }), /*v:1*/
    template("views/web/network-error", "<h1>服务不可用...</h1> ");
}();