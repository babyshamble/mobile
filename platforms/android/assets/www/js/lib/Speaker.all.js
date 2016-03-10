/*=============================================================================
#     FileName: localEvent.js
#         Desc: An attempt for event-driven javascript in browsers, 
#               with namespacing support and newListener and removeListener events built in.
#       Author: latel
#        Email: latelx64@gmail.com
#     HomePage: http://kezhen.info/
#          See: http://kezhen.info/project/localevent
#      Version: 0.0.1
#   LastChange: 2014-07-28 15:50:41
#          API: listenTo..
#               listenToOnce..
#               addListener..
#               addOnceListener..
#               on..
#               once..
#               addListeners
#               removeListener..
#               off..
#               un..
#               die..
#               removeListeners
#               defineEvent..
#               defineEvents..
#               removeEvent..
#               removeEvents..
#               removeAllEvents..
#               setMaxListeners..
#               setOnceSignal..
#               getOnceSignal..
#               trigger..
#               getListeners
#        Usage: ------------------------------------
#               # By Instance #
#               var events = new LocalEvent(false);
#               events.setMaxListeners(20);
#               events.listenTo("readyStateChange", function(readyState) {
#                   // your working code
#               });
#               events.trigger("readyStateChange", "interactive");
#               events.removeEvent("readyStateChange");
#               # By Extend #
#               ------------------------------------
#               var Matrix = function() {
#                   LocalEvent.call(this);
#               };
#               // you should use your own method to inherbit the protos
#               // to your class, for here, we just make it the same
#               // special notice that properties and methods with __ prefix(private) shall not be herbited.
#               Matrix.prototype = new LocalEvent();
#               Matrix.prototype.constructor = Matrix;
#               ------------------------------------
#               now class Matrix also have the same API inherbitd from LocalEvent.
#      History: 2014-07-15
#               localEvent is now in development.
#               2014-07-28
#               Initial Release
=============================================================================*/
 
(function(global) {
    "use strict";

    // define some CONST
    var VERSION = "0.0.1",
        UNDEFINED = typeof undefined,
        LOCALEVENT = window.LocalEvent;

    // define some shortchut
    var hasOwn = Object.prototype.hasOwnProperty,
        toString = Object.prototype.toString,
        slice = Array.prototype.slice,
        rslash = /\/$/,
        proto;

    /**
     * LocalEvent class
     *
     * @class LocalEvent
     * @constructor
     * @param  {String} mode    Indicate whether to create a new event type when it is not existed
     * @param  {Object} events  Init with a pre-defined events Object
     * @return {Object} LocalEvent instance
     */
    var LocalEvent = function (mode, events) {
        this._maxListeners = 0;
        this._events = {
            "newListener": [],
            "removeListener": []
        };
        this._mode = typeof mode === "boolean"? mode : (mode === "negative"? false : true);
        this._onceSignal = true;

        if (LocalEvent.type(events) === "Object") {
            this.listensTo(events);
        }
    };

    proto = LocalEvent.prototype;

    /**
     * Get events hash
     *
     * @method _getEvents
     * @access protected
     * @return {Object} Current events hash
     */
    proto._getEvents = function() {
        return this._events;
    };

    /**
     * Get listeners as Object
     *
     * @method _getListenersAsObject
     * @access protected
     * @param  {String|RegExp} evt Name of events to draw listeners from
     * @param  {Boolean}       sn  Wether to draw sub-namespace as well
     * @return {Object} Current events hash meets given filter
     */
    proto._getListenersAsObject = function(evt, sn) {
        var events = this._getEvents(),
            type = LocalEvent.type(evt), 
            response = {},
            i;

        if (type === "String") {
            evt = evt.replace(rslash, "");
            if (!(response[evt] = events[evt]) && (this._mode === false || !(response[evt] = events[evt] = []))) {
                // create new event only if this._mode is set to positive(true)
                delete response[evt];
            }

            if (sn !== false) {
                evt = new RegExp("^" + evt + "\/", i);
                type = "RegExp";
            }
        }

        if (type === "RegExp") {
            for (i in events) {
                if (hasOwn.call(events, i) && !response[i] && evt.test(i)) {
                    response[i] = this._events[i];
                }
            }
        }

        return response;
    };

    /**
     * Wrapper of _getListenersAsObject, make it easy to loop over the
     * original listener functions
     *
     * @method _getListenersAsFlat
     * @access protected
     * @param  {String|RegExp} evt Name of events to draw listeners from
     * @param  {Boolean}       sn  Wether to draw sub-namespace as well
     * @return {Object} Flattened current events hash meets given filter
     */
    proto._getListenersAsFlat = function(evt, sn) {
        var listeners = this._getListenersAsObject(evt, sn),
            response = {},
            i, len, key;

        for (key in listeners) {
            if (hasOwn.call(listeners, key)) {
                response[key] = [];
                for (i = 0, len = listeners[key].length; i < len; i++) {
                    response[key].push(listeners[key][i].listener);
                }
            }
        }

        return response;
    };

    /**
     * Set the max listeners each event type could have at most,
     * for performance consideration.
     *
     * @method setMaxListeners
     * @access public
     * @param  {Number} max  The max listener number that can be registered per event, 0 for inifinite
     * @return {Object} Current LocalEvent instance for chaining
     */
    proto.setMaxListeners = function(max) {
        if (LocalEvent.type(max) === "Number" && max > 1) {
            this._maxListeners = max;
        }

        return this;
    };

    /**
     * Set onceSignal, if a listener returns a value that strict equal to this value,
     * then it will be removed after fired
     * be aware that using variable other than null, undefined, string and number is always confusing
     *
     * @method setOnceSignal
     * @access public
     * @param  {Mixed}  sig  Define the signal
     * @return {Object} Current LocalEvent instance for chaning
     */
    proto.setOnceSignal = function(sig) {
        this._onceSignal = sig;
        
        return this;
    };

    /**
     * Get onceSignal
     *
     * @method getOnceSignal
     * @access public
     * @return {Mixed} Current onceSignal
     */
    proto.getOnceSignal = function() {
        return this._onceSignal;
    };

    /**
     * Add unique event into the events hash
     * if specialfied event already existsed, this operation will be ignored
     * This is useful when you are using addListeners with regexp
     *
     * @method defineEvent
     * @access public
     * @param  {String|Array} Names of event(s) to be added
     * @return {Object} Current LocalEvent instance for chaining
     */
    proto.defineEvent = function() {
        var events = this._getEvents(),
            i, j, len, len2, evt;

        for (i = 0, len = arguments.length; i < len; i++) {
            evt = arguments[i];

            switch (LocalEvent.type(evt)) {
            case "String":
                !events[evt] && (events[evt] = []);
                break;

            case "Array":
                for (j = 0, len2 = evt.length; j < len2; j++) {
                    this.defineEvent(evt[j]);
                }
                break;
            }
        }

        return this;
    };

    /**
     * Just a wrapper of defineEvents
     *
     * @method defineEvents
     * @access public
     */
    proto.defineEvents = proto.defineEvent;

    /**
     * remove a event or events in a bulk
     * all listeners selected will be dropped as well
     *
     * @method removeAllEvent
     * @access public
     * @param  {String|Array|RegExp}  Name(s) of event(s) to be removed
     * @return {Object}  Current LocalEvent instance for chaining
     */
    proto.removeEvent = function() {
        var events = this._getEvents(), 
            evt, type, i, j, len, len2;

        for (i = 0, len = arguments.length; i < len; i++) {
            evt = arguments[i];
            type = LocalEvent.type(evt);

            switch (type) {
            case "String":
                evt = evt.replace(rslash, "");
                delete events[evt];
                evt = new RegExp("^" + evt + "\/", "i");

            case "RegExp":
                for (j in events) {
                    if (hasOwn.call(events, j)) {
                        evt.test(j) && (delete events[j]);
                    }
                }
                break;

            case "Array":
                for (j = 0, len2 = evt.length; j < len2; j++) {
                    this.removeEvent(evt[j]);
                }
                break;
            }
        }

        return this;
    };

    /**
     * Just a wrapper of removeEvent
     *
     * @method removeAllEvents
     * @access public
     */
    proto.removeEvents = proto.removeEvent;

    /**
     * remove all events
     *
     * @method removeAllEvent
     * @access public
     * @return {Object} Current LocalEvent instance for chaining
     */
    proto.removeAllEvent = function() {
        this._events = {};

        return this;
    };

    /**
     * Add a listener to the events hash index, according to the givern filter
     *
     * @method listenTo
     * @access public
     * @param  {String|RegExp} evt      Names of event(s) to listen to
     * @param  {Function}      listener Actual listener or that wrappered with once property
     * @return {Object} Current LocalEvent instance for chaining
     */
    proto.listenTo = function(evt, listener) {
        var events,
            listeners,
            islistenerWrappered,
            key;

        islistenerWrappered = LocalEvent.type(listener) === "Object";

        if (!islistenerWrappered && LocalEvent.type(listener) !== "Function") {
            return this;
        }

        events = this._getEvents();
        listeners = this._getListenersAsFlat(evt, false);

        for (key in listeners) {
            if (hasOwn.call(listeners, key) && (this._maxListeners === 0? 1 : events[key].length < this._maxListeners) && LocalEvent.indexOf(listeners[key], islistenerWrappered ? listener.listener : listener) === -1) {
                events[key].push(islistenerWrappered? listener: {
                    "listener" : listener,
                    "once"     : false
                });

                // we are sure, slice can get a proper listener fn as it has been added above
                this.trigger("newListener", key, events[key].slice(-1)[0].listener);
            }
        }

        return this;
    };

    /**
     * Wrapper of listenTo
     *
     * @method addListener
     * @access public
     */
    proto.addListener = proto.listenTo;

    /**
     * Wrapper of listenTo
     *
     * @method on
     * @access public
     */
    proto.on = proto.listenTo;

    /**
     * Add a listener to the events hash index which will be removed
     * the first time it is fired
     *
     * @method listensTo
     * @access public
     * @param  {String|RegExp} evt      Names of events to add a once listener to
     * @param  {Function}      listener Actual listener or that wrappered with once property
     * @return {Object} Current LocalEvent instance for chaining
     */
    proto.listenToOnce = function(evt, listener) {
        if (LocalEvent.type(listener) !== "Function") {
            return this;
        } 
        else {
            return this.listenTo(evt, {
                "listener" : listener,
                "once"     : true
            });
        }
    };

    /**
     * Wrapper of listenTo
     *
     * @method once
     * @access public
     */
    proto.once = proto.listenToOnce;

    /**
     * Adds listeners in bulk
     *
     * @method listensTo
     * @access public
     */
    proto.listensTo = function(evt, listeners) {
    };

    /**
     * Wrapper of listensTo
     *
     * @method addListeners
     * @access public
     */
    proto.addListeners = proto.listensTo;

    /**
     * Remove a listener from events hash index according to the given filter
     *
     * @method removeListener
     * @access public
     * @param  {String|RegExp}   evt      Names of event(s) to remove listener from
     * @param  {Function|Object} listener Real listener or object wrappered with once property
     * @return {Object} Current LocalEvent instance for chaining
     */
    proto.removeListener = function(evt, listener) {
        var events,
            listeners,
            listener,
            key,
            i;

        if (LocalEvent.type(listener) !==  "Function") {
            return this;
        }

        events = this._getEvents();
        listeners = this._getListenersAsFlat(evt);

        for (key in listeners) {
            if (hasOwn.call(listeners, key) && (i = LocalEvent.indexOf(listeners[key], listener)) !== -1) {
                listener = events[key][i];
                this.trigger("removeListener", key, listener);
                events[key].splice(i, 1);
            }
        }

        return this;
    };

    /**
     * Wrapper of removeListener
     *
     * @method off
     * @access public
     */
    proto.off = proto.removeListener;

    /**
     * Wrapper of removeListener
     *
     * @method un
     * @access public
     */
    proto.un = proto.removeListener;

    /**
     * Wrapper of removeListener
     *
     * @method die
     * @access public
     */
    proto.die = proto.removeListener;

    /**
     * remove listeners in bulk
     *
     * @method removeListeners
     * @access public
     */
    proto.removeListeners = function() {
    };


    /**
     * Trigger a list of listeners that matchs given filter,  
     * if you pass evt as a regular expression, all events that matchs will be fired.  
     * otherwise it shall only be a string, in this case, only the event itself or events
     * that belongs to this namespace will be fired.  
     * listeners that have once=true or returns pre-defined _onceReturnValue property 
     * will be removed after fired for the first time.
     *
     * @method trigger
     * @access public
     * @param  {String|RegExp} evt Indicate which listeners shall be fired
     * @return {Object} Current LocalEvent instance for chaining
     */
    proto.trigger = function(evt, args) {
        
        var args = LocalEvent.type(args) === "Array"? args : slice.call(arguments).slice(1), // pass through the exact arguments
            listeners = this._getListenersAsObject(evt, "rw"),
            listener,
            key, 
            signal,
            i; 

        for (key in listeners) {
            if (hasOwn.call(listeners, key) && LocalEvent.type(listeners[key] === "Array")) {
                i = listeners[key].length;
                while (i--) {
                    listener = listeners[key][i];

                    signal = listener.listener.apply(this, args || []);

                    if (listener.once === true || signal === this._onceSignal) {
                        this.removeListener(key, listener.listener);
                    }
                }
            }
        }

    };

    /**
     * Get listeners
     *
     * @method getListeners
     * @access public
     * @param  {String|RegExp} evt Names of events to draw listeners from
     * @return {Object} Current events hash meets given filter
     */
    proto.getListeners = function(evt) {
        var listeners = this._getListenersAsObject();
    };




    // Get a variable's real type
    LocalEvent.type = function(t) {
        return undefined === t? "Undefined" : (toString.call(t).slice(8, -1) || null);
    };

    // Find the index of needle in hay, using Array.prototype.indexOf in flavor
    LocalEvent.indexOf = (function() {
        return Array.prototype.indexOf?
            function(hay, needle) {
                return hay.indexOf(needle);
            } :
            function(hay, needle) {
                var i = 0, 
                    len = hay.length;

                if (LocalEvent.type(hay) !== "Array") {
                    return -1;
                }

                for (; i < len; i++) {
                    if (hay[i] === needle) {
                        return i;
                    }
                }

                return -1;
            };
    })();

    // Restore the original LocalEvent in case of overwrite
    LocalEvent.noConflict = function() {
        if (global.LocalEvent === LocalEvent) {
            global.LocalEvent = LOCALEVENT;
        }
    };


    // Expose the version
    LocalEvent.version = VERSION;

    // Expose self respect to the environment
    if ("function" === typeof define) {
        // AMD loader as a anonymous module
        define(function() {
            return LocalEvent;
        });
    }
    else if ("object" === typeof exports) {
        // CommonJS
        exports.localEvent = LocalEvent;
    }

    // Always expose to global
    global.LocalEvent = LocalEvent;

})(this);

/** vim: et:ts=4:sw=4:sts=4
 * @fileoverview 基于 H5 的语音播报
 * @author       Kezhen Wang <latelx64@gmail.com>
 * @version      0.1.0
 * @link         http://192.168.1.124/YX.Tools/Audio
 * @license      GPL
 * @todo         提供基于flash的降级
 */

;(function(global, polyfill) {
    'use strict';

    // 运行polyfills
    polyfill();

    // @const UNDEFINED
    // @const TOSTRING
    var
        UNDEFINED = typeof undefined,
        TOSTRING = Object.prototype.toString,
        SPACE = /\s*/g,
        YRAPI;

    // 检测特性支持情况
    var support = {
        audio: 'Audio' in global
    };

    // 定义依赖列表
    var deps = {
        LocalEvent: null
    };

    // 辅助函数: 继承其他模块的接口
    function inherit(child, parent) {
        var api;

        if ('object' !== typeof child && 'function' !== typeof child) {
            return false;
        }

        if ('[object Object]' !== TOSTRING.call(parent)) {
            return false;
        }

        for (api in parent) {
            child.prototype[api] = parent[api];
        }

    }




    /*
     * 声音组件类
     *
     * @class Audio
     * @extend LocalEvent
     * @constructor
     * @param {Object} options 初始化选项
     * @return {Object} Audio 的实例
     */
    function Audio(options) {
        var i;

        if (!(this instanceof Audio)) {
            throw new TypeError('Audio is a Class, which cannot be called as an function.');
        }

        if (!deps.LocalEvent && !(deps.LocalEvent = global.LocalEvent)) {
            throw new TypeError('Tools/Audio(YX.Tools.Audio) depends on LocalEvent, which is not loaded.');
        }

        options = options || {};

        // 在默认配置的基础上校验并合并生成实际的配置
        this.__options = Object.create(Audio.options);
        if ('[object Object]' === TOSTRING.call(options)) {
            for (i in options) {
                // @todo 添加配置的类型的检查
                if ('undefined' !== typeof this.__options[i]) {
                    this.__options[i] = options[i];
                }
            }
        }


        this.__audio = null;
    }

    /*
     * Audio的默认配置
     * 暴露在外部这样可供外部直接修改
     *
     * @property options
     * @access public
     * @static
     * @typeof {Object}
     */
    Audio.options = {
        autoplay: true
    };

    // 静态方法

    /**
     * 判断变量的类型是否是 String
     *
     * @method isString
     * @static
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 string 时返回 true
     */
    Audio.isString = function(o) {
        return (o === '' || o) && (o.constructor === String);
    };

    /*
     * 初始化实例
     *
     * @method init
     * @access public
     * @return {Object} 返回 Audio 实例
     */
    Audio.prototype.init = function() {
        var self = this;

        // 如果不支持 Audio， 则 fallback 至 flash 模式
        if (support.audio) {
            this.__audio = document.createElement('AUDIO');
            this.__mode = 'standard';

            this.__audio.addEventListener('loadstart', function() {
                self.trigger('loadstart');
            });

            this.__audio.addEventListener('loadedmetadata', function() {
                self.trigger('loadedmetadata');
            });

            this.__audio.addEventListener('loadeddata', function() {
                self.trigger('loadeddata');
                self.__audio.play();
            });

            this.__audio.addEventListener('canplay', function() {
                self.trigger('canplay');
            });

            this.__audio.addEventListener('canplaythrough', function() {
                self.trigger('canplaythrough');
            });

            this.__audio.addEventListener('suspend', function() {
                self.trigger('suspend');
            });

            this.__audio.addEventListener('stalled', function() {
                self.trigger('stalled');
            });

            this.__audio.addEventListener('play', function() {
                self.trigger('play');
            });

            this.__audio.addEventListener('waiting', function() {
                self.trigger('waiting');
            });

            this.__audio.addEventListener('playing', function() {
                self.trigger('playing');
            });

            this.__audio.addEventListener('timeupdate', function() {
                self.trigger('timeupdate');
            });

            this.__audio.addEventListener('pause', function() {
                self.trigger('pause');
            });

            this.__audio.addEventListener('seeking', function() {
                self.trigger('seeking');
            });

            this.__audio.addEventListener('seeked', function() {
                self.trigger('seeked');
            });

            this.__audio.addEventListener('ended', function() {
                self.trigger('ended');
            });

            this.__audio.addEventListener('durationchange', function() {
                self.trigger('durationchange');
            });

            this.__audio.addEventListener('volumechange', function() {
                self.trigger('volumechange');
            });

            this.__audio.addEventListener('ratechange', function() {
                self.trigger('ratechange');
            });

            this.__audio.addEventListener('abort', function() {
                self.trigger('abort');
            });

            this.__audio.addEventListener('errror', function() {
                self.trigger('error');
            });

            this.__audio.addEventListener('emptied', function() {
                self.trigger('emptied');
            });

            //this.__audio.preload = 'auto';
        }

        //this.autoplay(this.__options.autoplay);


    };

    /*
     * 播放一个声音源
     *
     * @method play
     * @access public
     * @param {String} url - 声音源的地址
     * @param {Boolean} forcePlay - 是否强制播放
     * @return {Void}
     */
    Audio.prototype.play = function(url, forcePlay) {
        url = (Audio.isString(url)? url : '').replace(SPACE, '');
        this.removeEvents('play', 'ended', 'pause', 'canplaythrough', 'abort');

        if (support.audio) {
            this.__audio.src = url;
        }

        // 适用于 autoplay 为 false，或移动设备需要 play() 方法的底层访问
        if (forcePlay) {
            this.__audio.play();
        }
    };

    /*
     * 暂停播放一个声音源
     *
     * @method pause
     * @access public
     * @return {Void}
     */
    Audio.prototype.pause = function() {
        if (support.audio) {
            this.__audio.pause();
        }
    };

    /*
     * 停止一个声音源的播放
     *
     * @method stop
     * @access public
     * @return {Void}
     */
    Audio.prototype.stop = function() {
        if (support.audio) {
            this.__audio.src = '';
        }
    };

    /*
     * 暂停播放一个声音源
     *
     * @method pause
     * @access public
     * @return {Void}
     */
    Audio.prototype.resume = function(url) {
        if (support.audio) {
            this.__audio.pause();
        }
    };

    /*
     * 是否自动播放
     *
     * @method autoplay
     * @param {Boolean} isAuto - 指明是否自动播放的布尔值
     * @return {Boolean} 更改之前的值
     */
    Audio.prototype.autoplay = function(isAuto) {
        var old = this.__audio.autoplay;

        this.__audio.autoplay = !!isAuto;

        return old;
    };

    /*
     * 设置音量
     *
     * @method setVolume
     * @param {Number} volume - 想要调整到的音量, 0 ~ 100
     * @return {Void}
     */
    Audio.prototype.setVolume = function(volume) {
        volume = +volume;

        if (!global.isNaN(volume)) {
            volume = Math.max(0, volume);
            volume = Math.min(volume, 1);

            if (support.audio) {
                this.__audio.volume = volume;

            }
        }
    };

    /*
     * 设置播报速度
     *
     * @method setSpeed
     * @access public
     * @param {Number} speed - 想要调整到的播放速率, -1, 0, 1
     * @return {Void}
     */
    Audio.prototype.setSpeed = function(speed) {
        speed = +speed;

        if (!global.isNaN(speed)) {
            speed = Math.max(0, speed);
            speed = Math.min(speed, 3);

            if (support.audio) {
                this.__audio.playbackrate = speed;

            }
        }
    };








    // 定义为一个UMD模块
    if (UNDEFINED !== typeof define && define.amd) {
        var requiredModules = [],
            namespace2Module = {
                'LocalEvent': 'LocalEvent'
            };

        if (!(deps.LocalEvent = global.LocalEvent)) {
            requiredModules.push('LocalEvent');
        }
        else {
            inherit(Metro, new deps.LocalEvent());
        }

        define('Tools/Audio', requiredModules, function() {
            var i;

            for (i = 0; i < requiredModules.length; i++) {
                deps[namespace2Module[requiredModules[i]] || requiredModules[i]] = arguments[i];
                if ('LocalEvent' === requiredModules[i]) {
                    inherit(Metro, new arguments[i]());
                }
            }

            return Audio;
        });
    }
    else if (UNDEFINED !== typeof exports) {
        module.exports = Audio;
    }
    else {
        deps.LocalEvent = global.LocalEvent;

        if (deps.LocalEvent) {
            inherit(Audio, new deps.LocalEvent());
        }

        if (UNDEFINED === typeof global.YX) {
            global.YX = {};
        }
        if (UNDEFINED === typeof global.YX.Tools) {
            global.YX.Tools = {};
        }

        global.YX.Tools.Audio = Audio;
    }

})(this, function polyfill() {
    'use strict';
    if (typeof Object.create !== 'function') {
        // Production steps of ECMA-262, Edition 5, 15.2.3.5
        // Reference: http://es5.github.io/#x15.2.3.5
        Object.create = (function() {
            // To save on memory, use a shared constructor
            function Temp() {}

            // make a safe reference to Object.prototype.hasOwnProperty
            var hasOwn = Object.prototype.hasOwnProperty;

            return function (O) {
                // 1. If Type(O) is not Object or Null throw a TypeError exception.
                if (typeof O !== 'object') {
                    throw new TypeError('Object prototype may only be an Object or null');
                }

                // 2. Let obj be the result of creating a new object as if by the
                //    expression new Object() where Object is the standard built-in
                //    constructor with that name
                // 3. Set the [[Prototype]] internal property of obj to O.
                Temp.prototype = O;
                var obj = new Temp();
                Temp.prototype = null; // Let's not keep a stray reference to O...

                // 4. If the argument Properties is present and not undefined, add
                //    own properties to obj as if by calling the standard built-in
                //    function Object.defineProperties with arguments obj and
                //    Properties.
                if (arguments.length > 1) {
                    // Object.defineProperties does ToObject on its first argument.
                    var Properties = Object(arguments[1]);
                    for (var prop in Properties) {
                        if (hasOwn.call(Properties, prop)) {
                            obj[prop] = Properties[prop];
                        }
                    }
                }

                // 5. Return obj
                return obj;
            };
        })();
    }
});


/** vim: et:ts=4:sw=4:sts=4
 * @fileoverview 基于 H5 的语音播报组件
 * @author       Kezhen Wang <latelx64@gmail.com>
 * @version      0.1.0
 * @link         http://192.168.1.124/YX.Tools/Speaker
 * @license      GPL
 * @todo         兼容于PC端的基于flash封装的语音播报组件
 *               剥离文字转语音功能为单独的TTS模块(YX.Tools.TTS)
 *               兼容模式需要额外支持YX.Read命名空间
 */

;(function(global, polyfill) {
    'use strict';

    // 运行polyfills
    polyfill();

    // @const UNDEFINED
    // @const TOSTRING
    var
        UNDEFINED = typeof undefined,
        TOSTRING = Object.prototype.toString,
        HASOWN = Object.prototype.hasOwnProperty,
        SPACE = /\s*/g;

    // 定义依赖列表
    var deps = {
        Audio: null,
        TTS: null //
    };

    /*
     * 阅读组件类
     *
     * @class Speaker
     * @constructor
     * @param {Object} options 初始化选项
     * @return {Object} Speaker 的实例
     */

    function Speaker(options) {
        var option, audioConfigs, config;

        if (!(this instanceof Speaker)) {
            throw new TypeError('Speaker is a Class, which cannot be called as an function.');
        }

        // 检查依赖
        if (!deps.Audio && !(deps.Audio = global.YX && global.YX.Tools && YX.Tools.Audio)) {
            throw new TypeError('Speaker dependence not met: Tools/Audio(YX.Tools.Audio)');
        }




        /*
         * Speaker 实例是否已经初始化
         *
         * @property inited
         * @type {Boolean}
         */
        this.__inited = false;

        /*
         * 是否允许播放的开关
         *
         * @property canplay
         * @type {Boolean}
         */
        this.__canplay = false;

        /*
         * 是否在移动端启动了第一次播放
         *
         * @property initedOnMobile
         * @type {Boolean}
         */
        this.__initedOnMobile = false;

        /*
         * 是否处理了 HTML 行内语音配置
         *
         * @property initedOnMobile
         * @type {Boolean}
         */
        this.__initedInlineConfig = false;



        options = options || {};

        if (audioConfigs = parseAudioConfigs()) {
            for (config in audioConfigs) {
                if (HASOWN.call(audioConfigs, config)) {
                    if (!options[config]) {
                        options[config] = audioConfigs[config];
                    }
                }
            }

            this.__initedInlineConfig = true;
        }

        // 在默认配置的基础上校验并合并生成实际的配置
        this.__options = Object.create(Speaker.options);
        if (Speaker.isObject(options)) {
            for (option in options) {
                // @todo 添加配置的类型的检查
                if (UNDEFINED !== typeof this.__options[option]) {
                    this.__options[option] = options[option];
                }
            }
        }

        // 生成一个自动开始播放的语音组件实例
        this.__audio = new deps.Audio({
            autoplay: true
        });

    }

    /*
     * Speaker的默认配置
     * 暴露在外部这样可供外部直接修改
     *
     * @property options
     * @access public
     * @static
     * @typeof {Object}
     */
    Speaker.options = {
        compatible: false, // 是否兼容旧的基于soundmanager封装的首字母大写的API接口定义
        limitTextLength: 0, // 限制字符长度，0则不限制，推荐设置为150
        socketpath: null, // 生成语音的服务器 API 地址
        voicespath: null, // 下载语音的服务器地址
        tts: 'Cniil'// 使用的文字转语音引擎 [Cniil, Flash, Speech]
    };

    // 静态方法

    /**
     * 判断变量的类型是否是 String
     *
     * @method isString
     * @static
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 string 时返回 true
     */
    Speaker.isString = function(o) {
        return (o === '' || o) && (o.constructor === String);
    };

    /**
     * 判断变量的类型是否是 Function
     *
     * @method isFunction
     * @static
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 function 时返回 true
     */
    Speaker.isFunction = function(o) {
        return o && (o.constructor === Function);
    };

    /**
     * 判断变量的类型是否是 Object
     *
     * @method isObject
     * @param {Mixed} o 传入被检测变量的名称
     * @static
     * @return {Boolean} 当 o 的类型是 object 时返回 true
     */
    Speaker.isObject = function(o) {
        return o && (o.constructor === Object || TOSTRING.call(o) === '[object Object]');
    };


    /*
     * 发起一个 jsonp 请求
     *
     * @method jsonp
     * @static
     * @param {String | Object} url - 请求的地址或包含接下来所需参数的一个对象描述符
     * @param {Object} data - 附加的数据
     * @param {Function} success - jsonp 成功后的回调函数
     * @param {Function} fail - jsonp 请求失败时的回调函数
     * @return {Void}
     */
    Speaker.jsonp = function(url, data, success, fail) {
        var args, option, callback, dataItem,
            $script, timeout;

        // 生成参数树
        args = {
            url: url,
            data: data || {},
            success: success,
            fail: fail,
            timeout: 5000
        };

        // 如果使用对象描述符作为参数，则扁平化对象描述符取得参数
        if (Speaker.isObject(url)) {
            for (option in url) {
                if (HASOWN.call(url, option)) {
                    args[option] = url[option];
                }
            }
        }

        // 允许省略 data 参数
        if (Speaker.isFunction(args.data)) {
            if (Speaker.isFunction(args.success)) {
                args.fail = args.success;
            }

            args.success = args.data;
            args.data = {};
        }

        // 验证传参
        if (!Speaker.isString(args.url)) {
            throw new TypeError('Speaker.jsonp expects request url to be a string.');
        }
        if (!Speaker.isObject(args.data)) {
            throw new TypeError('Speaker.jsonp expects additional data to be an object.');
        }

        // 将 data 作为参数拼接到 url 上
        for (dataItem in args.data) {
            if (HASOWN.call(args.data, dataItem)) {
                args.url = args.url + '&' + dataItem + '=' + args.data[dataItem];
            }
        }

        // 寻找一个可用的全局函数名
        do {
            callback = 'jsonp' + (new Date()).getTime();
        } while (global[callback]);

        // 注册供服务器调用的全局函数名
        global[callback] = function(data) {
            if (Speaker.isFunction(args.success)) { 
                args.success(data);
                clearTimeout(timeout);
                // 永远记得清除全局函数
                global[callback] = null;
            }
        };

        // 将全局函数名拼接到 url 供服务器识别
        args.url = args.url.replace('=?', '=' + callback);
        $script = document.createElement('SCRIPT');

        // 捕获错误
        $script.onerror = function(e) {
            clearTimeout(timeout);
            // 永远记得清除全局函数
            global[callback] = null;
            if (Speaker.isFunction(args.fail)) {
                args.fail();
            }
        };

        timeout = setTimeout(function() {
            $script.onerror();
        }, args.timeout);

        // 发起请求
        $script.src = args.url; 
        document.getElementsByTagName('HEAD')[0].appendChild($script);
       
    };

    // 公开方法

    /*
     * 开始语音播报
     *
     * @method open
     * @return {Void}
     */
    Speaker.prototype.init = function() {
        var self = this;

        if (this.__options.compatible) {
            this.setCompatible();
        }

        // 初始化实际语音组件(YX.Tool.Audio)
        this.__audio.init();

        // 移动设备需要用户事件触发才允许开始播放
        document.body.addEventListener('touchstart', function(ev) {
            if (!self.__initedOnMobile) {
                self.__audio.play('');
                self.__audio.__audio.play();
                self.__initedOnMobile = true;
            }
        }, true);

        this.__canplay = true;
        this.__inited = true;
    };

    /*
     * 开始语音播报
     *
     * @method open
     * @return {Void}
     */
    Speaker.prototype.open = function() {
        this.__canplay = true;
    };

    /*
     * 关闭语音播报
     *
     * @method close
     * @return {Void}
     */
    Speaker.prototype.close = function() {
        this.stop();
        this.__canplay = false;
    };

    /*
     * 停止语音播报
     *
     * @method open
     * @return {Void}
     */
    Speaker.prototype.stop = function() {
        this.play('');
    };

    /*
     * 播放一个url指向的声音源
     *
     * @method play
     * @access public
     * @param {String} url - 要播放的音频地址
     * @param {Boolean} useold - 是否使用旧的音频实例（同时播放）
     * @param {Function} finishFn - 播放完毕时触发的函数
     * @return {Void}
     */
    Speaker.prototype.play = function(url, useold,finishFn) {
        var audioConfigs, config;

        if (!checkInit.call(this)) {
            throwUninitError.call(this, 'play');
        }

        // 检查是否在移动端进行了第一次播放
        if (!this.__initedOnMobile) {
            this.__audio.play('');
            this.__audio.__audio.play();
            this.__initedOnMobile = true;
        }

        // 检查是否处理了 HTML 行内语音配置
        if (!this.__initedInlineConfig) {
            this.__initedInlineConfig = true;
            audioConfigs = parseAudioConfigs();

            for (config in audioConfigs) {
                if (HASOWN.call(audioConfigs, config)) {
                    if (!this.__options[config]) {
                        this.__options[config] = audioConfigs[config];
                    }
                }
            }
        }

        if (this.__canplay) {
            if (!Speaker.isString(url)) {
                throw new TypeError('YX.Tools.Speaker.play expects param 0 to be String.');
            }

            this.__audio.play(url);

            if (Speaker.isFunction(finishFn)) {
                this.__audio.once('ended', finishFn);
            }
        }
    };

    /*
     * 使用指读模式播报一小段文本
     *
     * @method open
     * @param {String} text - 需要被阅读的文本
     * @param {Function} showFn - 当文本被阅读时，同步执行的函数
     * @param {Function} finishFn - 当文本被阅读完毕时，执行的函数
     * @return {Void}
     */
    Speaker.prototype.pointerRead = function(text, showFn, finishFn) {
        var self = this;

        if (!checkInit.call(this)) {
            throwUninitError.call(this, 'pointerRead');
        }

        if (this.__canplay) {

            if (text = (Speaker.isString(text) ? text : '').replace(SPACE, '')) {

                text2Audio.call(this, text, function (url) {
                    self.play(url);

                    if (Speaker.isFunction(showFn)) {
                        self.__audio.once('playing', function () {
                            showFn(text);
                        });
                    }
                    if (Speaker.isFunction(finishFn)) {
                        self.__audio.once('ended', function () {
                            finishFn();
                        });
                    }
                });
            }
            else {
                throw new TypeError('YX.Tools.Speaker.pointerRead expect param 0 to a none empty string.');
            }
        }
    };

    /*
     * 卸载指读模式
     *
     * @method open
     * @return {Void}
     */
    Speaker.prototype.unPointerRead = function() {
        this.stop();
    };

    /*
     * 以连读的模式播报一段文本
     * 通常用于连续阅读一篇文章
     *
     * @method open
     * @access public
     * @param {String | Object} text - 要被阅读的文本(String), 或者一个封装了接下来所需参数的对象描述符(Object)
     * @param {String} preText - 将要被阅读的文本
     * @param {Function} loadFn - 当语音文件加载完毕时触发的函数
     * @param {Function} finishFn - 当语音文件阅读完毕时触发的函数
     * @param {Boolean} isFirst - 是否是第一次阅读
     * @param {Function} showFn - 同步执行的用于处理正在阅读文本的函数
     * @return {Void}
     */
    Speaker.prototype.continueRead = function(text, preText, loadFn, finishFn, isFirst, showFn) {
        var self = this,
            args, option;

        if (!checkInit.call(this)) {
            throwUninitError.call(this, 'continueRead');
        }

        if (this.__canplay) {

            args = {
                text: text,
                preText: preText,
                loadFn: loadFn,
                finishFn: finishFn,
                isFirst: isFirst,
                showFn: showFn
            };

            // 如果使用对象描述符作为参数，则扁平化对象描述符取得参数
            if (Speaker.isObject(text)) {
                for (option in text) {
                    if (HASOWN.call(text, option)) {
                        args[option] = text[option];
                    }
                }
            }

            // 验证传参
            args.isFirst = !!args.isFirst;
            args.text = (Speaker.isString(args.text)? args.text : '').replace(SPACE, '');
            args.preText = (Speaker.isString(args.preText)? args.preText : '').replace(SPACE, '');

            // 预先通知TTS处理某个文本
            if (args.preText) {
                text2Audio.call(this, args.preText);
            }

            if (args.text) {
                text2Audio.call(this, args.text, function(url) {
                    self.play(url);

                    self.__audio.once('play', function () {
                        if (Speaker.isFunction(args.showFn)) {
                            args.showFn(args.text);
                        }
                    });
                    self.__audio.once('canplay', function () {
                        if (Speaker.isFunction(args.showFn)) {
                            args.loadFn();
                        }
                    });
                    self.__audio.once('ended', function () {
                        if (Speaker.isFunction(args.showFn)) {
                            args.finishFn();
                        }
                    });
                    self.__audio.once('abort', function () {
                    });
                });
            }
            else {
                if (Speaker.isFunction(args.showFn)) {
                    args.showFn(text);
                }
            }
        }

    };

    /*
     * 卸载连读模式
     *
     * @method open
     * @return {Void}
     */
    Speaker.prototype.unContinueRead = function() {
        this.stop();
    };

    /*
     * 设置音量
     *
     * @method setVolume
     * @param {Number} volume - 想要调整到的音量, 0 ~ 100
     * @return {Void}
     */
    Speaker.prototype.setVolume = function(volume) {
        volume = +volume;

        if (!global.isNaN(volume)) {
            volume = Math.max(0, volume);
            volume = Math.min(volume, 100);
            volume = parseInt(volume, 10);
            this.__audio.setVolume(volume/100);
        }
    };

    /*
     * 设置播报速度
     *
     * @method setSpeed
     * @access public
     * @param {Number} speed - 想要调整到的播放速率, -1, 0, 1
     * @return {Void}
     */
    Speaker.prototype.setSpeed = function(speed) {
        speed = +speed;

        if (!global.isNaN(speed)) {
            speed = Math.max(-1, speed);
            speed = Math.min(speed, 1);
            speed = parseInt(speed, 10);
            this.__audio.setSpeed(speed + 1.5);
        }
    };

    /*
     * 重新恢复播放
     *
     * @method replay
     * @access public
     * @return {Void}
     */
    Speaker.prototype.replay = function() {
    };

    /*
     * 兼容旧的基于soundmanager封装的首字母大写的API接口定义
     *
     * @method setCompatible
     * @access public
     * @return {Void}
     */
    Speaker.prototype.setCompatible = function() {
        var self = this;

        this.Open = this.open;
        this.Close = this.close;
        this.Stop = this.stop;

        this.Play = function(path, onfinish, isself) {
            if (!isself) {
                text2Audio.call(self, path, function(url) {
                    self.play(url, onfinish);
                });
            }
            else {
                self.play(path, onfinish);
            }
        };

        this.PointerRead = this.pointerRead;
        this.UnPointerRead = this.unPointerRead;
        this.ContinueRead = this.continueRead;
        this.UnContinueRead = this.unContinueRead;
        this.SetVolume = this.setVolume;
        this.SetSpeed = this.setSpeed;
        this.Replay = this.replay;

        if (UNDEFINED !== typeof YX) {
            YX.Read = this;
        }
    };

    // 私有方法

    /*
     * 检查是否已经初始化
     *
     * @method checkInit
     * @access private
     * @return {Boolean}
     */
    function checkInit() {
        return !!this.__inited;
    }

    /*
     * 抛出未初始化的错误
     *
     * @method throwUninitError
     * @access private
     * @param {String} api - 在未初始化的情况下访问的api
     * @return {Void}
     */
    function throwUninitError(api) {
        throw new TypeError('YX.Tools.Speaker.' + api + ' cannot be accessed before initiation.');
    }

    /*
     * 解析HTML中相关语音的配置
     *
     * @method parseAudioConfigs
     * @access private
     * @return {Boolean | Object} 以对象描述符返回解析得到的语音配置, 如果失败则返回false
     */
    function parseAudioConfigs() {
        var audioConfigs, $configsWrapper, $configs, $config,
            i, len, config, id, val;

        $configsWrapper = document.getElementById('yx_config');
        $configsWrapper = $configsWrapper || document.getElementById('yx-config');

        if (!$configsWrapper) {
            return false;
        }

        $configs = $configsWrapper.children;

        audioConfigs = {};

        for (i = 0, len = $configs.length; i < len; i++) {
            $config = $configs[i];
            id = $config.getAttribute('id');

            if (id) {
                audioConfigs[id.replace('yx_', '')] = $config.getAttribute('href');
            }
        }

        return audioConfigs;

    }

    /*
     * 通过TTS将一段文本转换为语音资源
     *
     * @method text2Audio
     * @access private
     * @param {String} text - 被转换的文本
     * @param {Function} readyFn - [optional]当对应被转换文本的语音资源准备就绪时触发此回调，将对应的语音资源的地址作为唯一形参
     * @return {Void}
     */
    var mp3;

    window.d8x = function (obj) {
        mp3 = obj.mp3;
    }

    function text2Audio (text, readyFn) {
        var self = this,url;
        
        Speaker.jsonp(this.__options.socketpath + '&&yxjsoncallback=?&text=' + encodeURIComponent(text + '$0$100$0#0'), function(data) {
            if (Speaker.isFunction(readyFn)) {
                //alert(self.__options.voicespath + (data && data.msg));
                readyFn(self.__options.voicespath + (data && data.msg));
            }
        }, function() {
            throw new URIError('Selected TTS(YX.Tools.TTS.Cniil) is not available, network error.');
        });
    }

    /*
     * 生成并返回一个音频实例
     *
     * @method createAudio
     * @access private
     * @param {Boolean} autoPlay - 是否自动播放
     * @return {Object} 一个新的 deps.Audio 实例
     */
    function createAudio(autoPlay) {
        autoPlay = !!autoPlay;

        return new deps.Audio({
            autoplay: autoPlay
        })
    }







    // 定义为一个UMD模块
    if (UNDEFINED !== typeof define && define.amd) {
        var requiredModules = [],
            namespace2Module = {
                'Tools/Audio': 'Audio'
            };

        if (!global.YX || !global.YX.Tools || !(deps.Audio = global.YX.Tools.Audio)) {
            requiredModules.push('Tools/Audio');
        }

        define(requiredModules, function() {
            var i;

            for (i = 0; i < requiredModules.length; i++) {
                deps[namespace2Module[requiredModules[i]] || requiredModules[i]] = arguments[i];
            }

            return Speaker;
        });
    }
    else if (UNDEFINED !== typeof exports) {
        module.exports = Speaker;
    }
    else {
        if (UNDEFINED === typeof global.YX) {
            global.YX = {};
        }
        if (UNDEFINED === typeof global.YX.Tools) {
            global.YX.Tools = {};
        }

        deps.Audio = global.YX.Tools.Audio;

        global.YX.Tools.Speaker = Speaker;
    }

})(this, function polyfill() {
    'use strict';
    if (typeof Object.create !== 'function') {
        // Production steps of ECMA-262, Edition 5, 15.2.3.5
        // Reference: http://es5.github.io/#x15.2.3.5
        Object.create = (function() {
            // To save on memory, use a shared constructor
            function Temp() {}

            // make a safe reference to Object.prototype.hasOwnProperty
            var hasOwn = Object.prototype.hasOwnProperty;

            return function (O) {
                // 1. If Type(O) is not Object or Null throw a TypeError exception.
                if (typeof O !== 'object') {
                    throw new TypeError('Object prototype may only be an Object or null');
                }

                // 2. Let obj be the result of creating a new object as if by the
                //    expression new Object() where Object is the standard built-in
                //    constructor with that name
                // 3. Set the [[Prototype]] internal property of obj to O.
                Temp.prototype = O;
                var obj = new Temp();
                Temp.prototype = null; // Let's not keep a stray reference to O...

                // 4. If the argument Properties is present and not undefined, add
                //    own properties to obj as if by calling the standard built-in
                //    function Object.defineProperties with arguments obj and
                //    Properties.
                if (arguments.length > 1) {
                    // Object.defineProperties does ToObject on its first argument.
                    var Properties = Object(arguments[1]);
                    for (var prop in Properties) {
                        if (hasOwn.call(Properties, prop)) {
                            obj[prop] = Properties[prop];
                        }
                    }
                }

                // 5. Return obj
                return obj;
            };
        })();
    }
});

