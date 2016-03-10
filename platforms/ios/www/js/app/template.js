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
    }), template.helper("firstImg", function(s) {
        return s ? s.split("||")[0].split("/^s*/^s*")[0] : "";
    }), template.helper("serialize", function(o) {
        return JSON.stringify(o);
    }), template.helper("unserialize", function(o) {
        return JSON.parse(o);
    }), /*v:8*/
    template("app-index", '<section class="active" id="home_section" data-scroll="true"> <header> <nav class="left"> <h4>中国北京 智慧公共服务平台</h4> </nav> </header> <article class="active" data-scroll="true" id="home_sec"> <div> <div> <div id="contant-banner"> <div> <div style="text-align: center"><img src="image/1.jpg" width="100%"></div> <div style="text-align: center"><img src="image/2.jpg" width="100%" height="230px"></div> <div style="text-align: center"><img src="image/3.jpg" width="100%" height="230px"></div> <div style="text-align: center;"><img src="image/4.jpg" width="100%" height="230px"></div> </div> </div> <div id="contant-grid"> <ul id="grid-ul1"> <a data-target="section" href="#information_section"> <li class="grid-ul1-item"> <div id="container"> <div class=\'dummy\'></div> <div id="grid-zixun" class="grid-1"> <div id="grid-cont"></div> </div> </div> </li> </a> <a data-target="section" href="#web_section"> <li class="grid-ul1-item"> <div id="container"> <div class=\'dummy\'></div> <div id="grid-website" class="grid-1"> <div id="grid-cont"></div> </div> </div> </li> </a> <a data-target="section" href="#bslist_section"> <li class="grid-ul1-item"> <div id="container"> <div class=\'dummy\'></div> <div id="grid-work" class="grid-1"> <div id="grid-cont"></div> </div> </div> </li> </a> <a data-target="section" href="#file_section"> <li class="grid-ul1-item"> <div id="container"> <div class=\'dummy\'></div> <div id="grid-file" class="grid-1"> <div id="grid-cont"></div> </div> </div> </li> </a> <a data-target="section" href="#reader_section"> <li class="grid-ul1-item"> <div id="container"> <div class=\'dummy\'></div> <div id="grid-hudong" class="grid-1"> <div id="grid-cont"></div> </div> </div> </li> </a> <li class="grid-ul1-item"> <div id="container"> <div class=\'dummy\'></div> <div id="grid-search" class="grid-1"> <div id="grid-cont"></div> </div> </div> </li> </ul> </div> </div> </div> </article> </section> '), 
    /*v:4*/
    template("article/read", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), name = $data.name, ptime = $data.ptime, $string = $utils.$string, art = $data.art, $out = "";
        return $out += '<h2 class="article-title">', $out += $escape(name), $out += '</h2> <div class="article-meta"> <span class="article-time">', 
        $out += $escape(ptime), $out += '</span> </div> <div class="article-content">', 
        $out += $string(art), $out += "</div> ", new String($out);
    }), /*v:1*/
    template("article/recommend", ""), /*v:7*/
    template("information/category", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, systems = $data.systems, $escape = ($data.category, 
        $data.ci, $utils.$escape), $out = "";
        return counter = 0, $out += " ", $each(systems, function(category) {
            $out += " <li", 0 === counter++ && ($out += ' class="active"'), $out += ' data-cid="', 
            $out += $escape(category.id), $out += '" data-code="', $out += $escape(category.code), 
            $out += '">', $out += $escape(category.name), $out += "</li> ";
        }), $out += " ", new String($out);
    }), /*v:1*/
    template("information_section", '<section id="information_section" data-transition="flip"> <header> <nav class="right"> </nav> <h1 class="title">资讯联读</h1> </header> <div id="information-status" class=""> <div id="information-nocontent-system" class="information-statu"> <div> <h3>暂时没有系统内容</h3> <p>点击重试</p> </div> </div> <div id="information-nocontent-list" class="information-statu"> <div> <h3>暂时没有列表内容</h3> <p>点击重试</p> </div> </div> <div id="information-loading-system" class="information-statu"> <div> <div class="la-ball-fussion"> <div></div> <div></div> <div></div> <div></div> </div> </div> </div> <div id="information-loading-list" class="information-statu"> <div> <div class="la-ball-fussion"> <div></div> <div></div> <div></div> <div></div> </div> </div> </div> </div> <nav class="header-secondary"> <div id="information-category"> <ul class="control-group" style="width: 500px;"></ul> </div> </nav> <article class="active" id="information-viewer"> <ul class="applist card"></ul> </article> <footer> <a href="#home_section" data-target="section" data-icon="home">首页</a> <a href="#information_section" data-target="section" data-icon="newspaper">资讯</a> <a href="#web_section" data-target="section" data-icon="ie">网站</a> </footer> </section> '), 
    /*v:6*/
    template("list/item-with-multi-thumbnails", function($data) {
        "use strict";
        var $utils = this, thumbnail = ($utils.$helpers, $data.thumbnail), $escape = $utils.$escape, aid = $data.aid, $out = "";
        return $out += '<li class="list-item', thumbnail && ($out += " no-thumbnail"), $out += '" data-image="', 
        $out += $escape(thumbnail), $out += '" data-id="', $out += $escape(aid), $out += '"> <a href="#article_section?aid=', 
        $out += $escape(aid), $out += '" data-target="section"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <h3 class="list-title">中信银行：发挥集团性综合优势助力“一带一路”走向深化</h3> <p class="list-brief">测试文章简介</p> </div> <div class="list-footprint"> <span class="list-source">经济工作</span> <span class="list-date">07/10 10:40</span> </div> </a> </li> ', 
        new String($out);
    }), /*v:19*/
    template("list/item-with-thumbnail", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), thumbnail = $data.thumbnail, aid = $data.aid, name = $data.name, info = $data.info, submap = $data.submap, ptime = $data.ptime, $out = "";
        return $out += '<li class="list-item" data-image="', $out += $escape(thumbnail[0]), 
        $out += '" data-id="', $out += $escape(aid), $out += '"> <a href="#article_section?aid=', 
        $out += $escape(aid), $out += '" data-target="section"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <h3 class="list-title">', 
        $out += $escape(name), $out += '</h3> <p class="list-brief">', $out += $escape(info), 
        $out += '</p> </div> <div class="list-footprint"> <span class="list-source">', $out += $escape(submap), 
        $out += '</span> <span class="list-date">', $out += $escape(ptime), $out += "</span> </div> </a> </li> ", 
        new String($out);
    }), /*v:8*/
    template("list/item-without-thumbnail", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), aid = $data.aid, name = $data.name, info = $data.info, submap = $data.submap, ptime = $data.ptime, $out = "";
        return $out += '<li class="list-item nothumbnail" data-id="', $out += $escape(aid), 
        $out += '"> <a href="#article_section?aid=', $out += $escape(aid), $out += '" data-target="section"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <h3 class="list-title">', 
        $out += $escape(name), $out += '</h3> <p class="list-brief">', $out += $escape(info), 
        $out += '</p> </div> <div class="list-footprint"> <span class="list-source">', $out += $escape(submap), 
        $out += '</span> <span class="list-date">', $out += $escape(ptime), $out += "</span> </div> </a> </li> ", 
        new String($out);
    }), /*v:11*/
    template("list/list", function($data, $filename) {
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
    template("list/read", function($data, $filename) {
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
    }), /*v:19*/
    template("web/aside-system-list", function($data) {
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
    }), /*v:2*/
    template("web/loading", "<h1>正在努力的加载中...</h1> "), /*v:8*/
    template("web/mapstair", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, mapstair = $data.mapstair, $escape = ($data.map, 
        $data.mi, $utils.$escape), $out = "";
        return counter = 0, $out += " ", $each(mapstair, function(map) {
            $out += " <li ", 0 === counter++ && ($out += 'class="active"'), $out += ' data-mid="', 
            $out += $escape(map.id), $out += '" data-code="', $out += $escape(map.code), $out += '">', 
            $out += $escape(map.name), $out += "</li> ";
        }), $out += " ", new String($out);
    }), /*v:3*/
    template("web/network-error", "<h1>服务不可用...</h1> ");
}();