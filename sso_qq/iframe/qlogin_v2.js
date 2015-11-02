; !
function() {
    window.ptlogin_callback = function(msg) {
        var data = JSON.parse(msg);
        switch (data.action) {
        case 'close':
            window.ptlogin2_onClose && ptlogin2_onClose();
            break;
        case 'resize':
            window.ptlogin2_onResize && ptlogin2_onResize(data.width, data.height);
            break;
        default:
            break;
        }
    }
    if (typeof window.postMessage == 'undefined') {
        var vbs = ["Function vbs_ptlogin_callback(data)", "ptlogin_callback data", "End Function", 'navigator.ptlogin_callback = GetRef("vbs_ptlogin_callback")'].join("\r\n");
        navigator.ptlogin_callback = null;
        window.execScript && window.execScript(vbs, "VBScript");
    } else {
        function listener(event) {
            ptlogin_callback((event || window.event).data);
        }
        if (window.addEventListener) {
            window.addEventListener('message', listener, false);
        } else {
            window.attachEvent('onmessage', listener);
        }
    }
} ();
/*  |xGv00|43ce028cf58a7798bfb559a101d9677b */
_speedTiming.push( + new Date); (function() {
    var root = this;
    var _ = root['_'] || {};
    var ArrayProto = Array.prototype,
    concat = ArrayProto.concat,
    slice = ArrayProto.slice;
    _.indexOf = function(array, searchElement, fromIndex) {
        if (array.indexOf) {
            return array.indexOf(searchElement, fromIndex);
        }
        var len = array.length;
        if (len === 0) {
            return - 1;
        }
        if (fromIndex === undefined) {
            fromIndex = 0;
        } else {
            if (fromIndex < 0) fromIndex = len + fromIndex;
            if (fromIndex < 0) fromIndex = 0;
        }
        if (searchElement !== undefined) {
            for (var i = fromIndex; i < len; i++) {
                if (array[i] === searchElement) return i;
            }
            return - 1;
        }
        for (var j = fromIndex; j < len; j++) {
            if (array[j] === undefined && j in array) {
                return j;
            }
        }
        return - 1;
    };
    _.forEach = function(array, callbackfn, thisArg) {
        if (array.forEach) {
            return array.forEach(callbackfn, thisArg);
        }
        var len = array.length;
        for (var i = 0; i < len; ++i) {
            var current = array[i];
            if (current !== undefined || i in array) {
                callbackfn.call(thisArg, current, i, array);
            }
        }
    };
    _.filter = function(array, callbackfn, thisArg) {
        if (array.filter) {
            return array.filter(callbackfn, thisArg);
        }
        var len = array.length,
        result = [];
        for (var i = 0; i < len; ++i) {
            var current = array[i];
            if (current !== undefined || i in array) {
                callbackfn.call(thisArg, current, i, array) && result.push(array[i]);
            }
        }
        return result;
    };
    _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array,
        function(value) {
            return ! (_.indexOf(rest, value) > -1);
        });
    };
    root['_'] = _;
})(); ! (function(global, undefined) {
    var FormSender = global['FormSender'] = function(url, name, para) {
        this.url = url;
        this.name = name;
        this.para = this.parasPara(para);
        this.status = 0;
        arguments.callee._pool[name] = this;
    };
    FormSender.prototype.send = function() {
        if (this.status != 1) {
            var fmr = document.createElement("form");
            fmr.style.display = "none";
            for (var i in this.para) {
                var ipt = document.createElement('input');
                ipt.name = i;
                ipt.value = this.para[i];
                fmr.appendChild(ipt);
            }
            fmr.action = this.url;
            fmr.method = "POST";
            fmr.style.display = "none";
            document.body.appendChild(fmr);
            fmr.submit();
        }
    };
    FormSender.prototype.parasPara = function(o) {
        var tmp = [];
        if (typeof(o) != 'object') {
            o = {};
        }
        return o;
    };
    FormSender.prototype.getFrame = function() {
        return FormSender._frame ||
        function() {
            FormSender._frame = document.createElement('iframe');
            FormSender._frame.name = "__FS_Helper_";
            FormSender._frame.height = "300";
            document.body.appendChild(FormSender._frame);
            return FormSender._frame;
        } ()
    };
    FormSender.prototype.onSuccess = function() {};
    FormSender.prototype.onError = function() {};
    FormSender._pool = {};
    FormSender._frame = null;
})(this); (function() {
    var root = this;
    var previousNS = root['Q'];
    var Q = previousNS ? previousNS: root['Q'] = {};
    Q.mix = function(destination, source, overwrite, whitelist) {
        if (!source || !destination) {
            return destination;
        }
        if (undefined === overwrite) {
            overwrite = true;
        }
        var whitelistLen, map = {};
        if (whitelist && (whitelistLen = whitelist.length)) {
            for (var i = 0; i < whitelistLen; i++) {
                map[whitelist[i]] = true;
            }
        }
        for (var prop in source) {
            if (overwrite && !(prop in map) || !(prop in destination)) {
                destination[prop] = source[prop];
            }
        }
        return destination;
    };
    Q.getTimestamp = function() {
        return + new Date;
    };
    Q.template = function(temp, val) {
        return temp.replace(/\$\{(\w+)\}/g,
        function(m, i) {
            if (val[i]) {
                return val[i];
            } else {
                return "";
            }
        });
    };
    Q.on = function(who, when, how) {
        if (who.attachEvent) {
            who.attachEvent('on' + when, how);
        } else {
            who.addEventListener(when, how, false);
        }
    };
    var tasks = [];
    var isUnloadEventAdded = false;
    Q.report = function(callback, timeout) {
        var counter = 0,
        len = tasks.length;
        timeout = timeout || 2000;
        if (tasks[0]) {
            for (var i = 0; i < len; i++) {
                var task = tasks.shift();
                if (task) {
                    task.isTicking = false;
                    task(function() {
                        if (++counter === len && callback && !callback.isCalled) {
                            callback.isCalled = true;
                            callback();
                        }
                    })
                }
            }
            callback && setTimeout(function() {
                if (!callback.isCalled) {
                    callback.isCalled = true;
                    callback();
                }
            },
            timeout);
        } else {
            callback && callback();
        }
        Q.tick.isTicking = false;
    };
    Q.report.delay = 500;
    Q.tick = function(task) {
        if (!task.isTicking) {
            task.isTicking = true;
            tasks.push(task);
        }
        if (!Q.tick.isTicking) {
            setTimeout(Q.report, Q.report.delay);
            Q.tick.isTicking = true;
        }
        if (!isUnloadEventAdded) {
            Q.on(window, "beforeunload",
            function(evt) {
                Q.report();
            });
            isUnloadEventAdded = true;
        }
    };
    var GLOBAL_IMAGE_NAME = "__tc_global_image_";
    var GLOBAL_IMAGE_ID = Q.getTimestamp();
    Q.send = function(url, callback) {
        GLOBAL_IMAGE_ID += 1;
        url += ("&t=" + GLOBAL_IMAGE_ID);
        var globalImageVar = GLOBAL_IMAGE_NAME + GLOBAL_IMAGE_ID;
        root[globalImageVar] = new Image();
        if (callback) {
            root[globalImageVar].onload = root[globalImageVar].onerror = function() {
                callback();
                root[globalImageVar] = null;
            };
        }
        root[globalImageVar].src = url;
    };
    Q.ninja = function() {
        root.Q = previousNS;
        return this;
    };
})(); (function() {
    var BID = 130;
    var REPORT_URL = 'http://badjs.qq.com/cgi-bin/js_report?';
    function error(monitorId) {
        window.onerror = function(errorMsg, url, lineNumber) {
            if (monitorId) {
                Q.monitor(monitorId);
            }
            var bid = 'bid=' + BID;
            var mid = '';
            var msg = 'msg=' + encodeURIComponent([errorMsg, url, lineNumber, navigator.userAgent].join("|_|"));
            var src = REPORT_URL + [bid, mid, msg].join("&");
            Q.send(src);
        };
    }
    Q.mix(Q, {
        error: error
    });
})(); (function() {
    var REPORT_URL = 'http://isdspeed.qq.com/cgi-bin/r.cgi?';
    function isd(f1, f2, f3, timing) {
        var reportData = [],
        point,
        startPoint = timing[0];
        for (var i = 1,
        l = timing.length; i < l; i++) {
            point = timing[i];
            point = (point ? (point - startPoint) : 0);
            if (point > 0) {
                reportData.push(i + '=' + point);
            }
        }
        var url = REPORT_URL + 'flag1=' + f1 + '&flag2=' + f2 + '&flag3=' + f3 + '&' + reportData.join('&');
        Q.send(url);
    }
    function Speed(f1, f2, f3) {
        if (! (this instanceof Speed)) {
            return new Speed(f1, f2, f3);
        }
        this.f1 = f1;
        this.f2 = f2;
        this.f3 = f3;
        this.timing = [];
    }
    Speed.prototype.mark = function(ts) {
        return this.timing.push(ts || Q.getTimestamp());
    };
    Speed.prototype.report = function() {
        isd(this.f1, this.f2, this.f3, this.timing);
    };
    function performance(f1, f2, f3_ie, f3_c) {
        var timing, perf = (window.webkitPerformance ? window.webkitPerformance: window.msPerformance),
        reportPoints = ['navigationStart', "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
        f3 = f3_ie;
        perf = (perf ? perf: window.performance);
        if (perf && (timing = perf.timing)) {
            if (timing.domContentLoadedEventStart && f3_c) {
                f3 = f3_c;
            } else if (timing.domContentLoadedStart) {
                reportPoints.splice(15, 2, 'domContentLoadedStart', 'domContentLoadedEnd');
                if (f3_c) {
                    f3 = f3_c;
                }
            } else {
                reportPoints.splice(15, 2, 'domContentLoaded', 'domContentLoaded');
            }
            var timingArray = [];
            for (var i = 0,
            l = reportPoints.length; i < l; i++) {
                timingArray[i] = timing[reportPoints[i]];
            }
            isd(f1, f2, f3, timingArray);
        }
    }
    Q.mix(Q, {
        isd: isd,
        performance: performance,
        speed: Speed
    });
})(); (function() {
    var REPORT_URL = 'http://cgi.connect.qq.com/report/report_vm?';
    var REPORT_MAX_NUM = 6;
    var bernoulliQueue = [],
    globalSetup = {};
    function reportBernoulliQueue(callback) {
        if (bernoulliQueue[0]) {
            var item, logArr = [];
            for (var i = 0,
            l = bernoulliQueue.length; i < REPORT_MAX_NUM && i < l; i++) {
                item = bernoulliQueue.shift();
                if (item.nvalue) {
                    logArr.push([item.obj || globalSetup.obj || 0, item.nvalue, item.elt].join("_"));
                } else if (item.obj) {
                    var obj = {
                        'opername': item.opername || globalSetup.opername,
                        'name': item.name || globalSetup.name,
                        'action': item.action || globalSetup.action,
                        'obj': item.obj
                    };
                    var strValue = Q.template('{"opername":"${opername}","name":"${name}","action":"${action}","obj":"${obj}"}', obj);
                    logArr.push([strValue, 0, item.elt].join("_"));
                }
            }
            var url = REPORT_URL + 'tag=0&log=' + encodeURIComponent(logArr.join('|'));
            if (bernoulliQueue[0]) {
                var counter = 0;
                var cb = function() {
                    if (++counter === 2) {
                        callback();
                    }
                };
                Q.send(url, cb);
                reportBernoulliQueue(cb);
            } else {
                Q.send(url, callback);
            }
        } else {
            callback && callback();
        }
    }
    function bernoulli(value, obj, elt) {
        var item = {},
        valueType = typeof value;
        if (valueType === 'number') {
            item.nvalue = value;
            obj && (item.obj = obj);
        } else if (valueType === 'object') {
            item = value;
        } else if (valueType === 'string') {
            item = {
                obj: value
            };
        }
        item.elt = elt || 0;
        bernoulliQueue.push(item);
        Q.tick(reportBernoulliQueue);
    }
    function bernoulliSetup(settings) {
        return globalSetup = Q.mix(globalSetup, settings);
    }
    Q.mix(Q, {
        bernoulli: bernoulli,
        bernoulliSetup: bernoulliSetup
    });
})(); (function() {
    var REPORT_URL = "http://cgi.connect.qq.com/report/report_vm?";
    var monitorQueue = [];
    function genReportUrl(monitors) {
        return REPORT_URL + "monitors=" + "[" + monitors + "]"
    }
    function reportMonitorQueue(callback) {
        if (monitorQueue[0]) {
            var url = genReportUrl(monitorQueue);
            monitorQueue = [];
            Q.send(url, callback);
        } else {
            callback && callback();
        }
    }
    function monitor(id, isImmediately, callback) {
        if (isImmediately) {
            var url = genReportUrl(id);
            Q.send(url, callback);
        } else {
            monitorQueue.push(id);
            Q.tick(reportMonitorQueue);
        }
    }
    Q.mix(Q, {
        monitor: monitor
    });
})();
var getUuid = (function() {
    var uid = "";
    var guid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function(c) {
            var r = Math.random() * 16 | 0,
            v = c == 'x' ? r: (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    };
    var getCookie = function(name) {
        var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
        m = document.cookie.match(r);
        return (!m ? "": m[1]);
    };
    var cookieUid = getCookie("ui");
    if (cookieUid) {
        uid = cookieUid;
    } else {
        uid = guid();
    }
    var cookie = "ui=" + uid + ";domain=" + location.host + ";path=/;max-age=" + (60 * 60 * 24 * 356);
    document.cookie = cookie;
    return function() {
        return uid;
    };
})();
Q.getUuid = getUuid;
Q.reportImages = [new Image(), new Image(), new Image(), new Image(), new Image()];
var getPlatform = (function() {
    var platform = "PC";
    var ua = window.navigator.userAgent;
    if (/iPhone/.test(ua)) {
        platform = "iPhone";
    } else if (/Android/.test(ua)) {
        platform = "Android";
    } else if (/Windows Phone/.test(ua)) {
        platform = "WindowPhone";
    }
    return function() {
        return platform;
    };
})();
var MTA = (function() {
    function mtaReport(eventId, data) {
        var getParamsFromUrl = function(name) {
            var hash = window.location.hash;
            var reg = new RegExp("(?:^|&)" + name + "=([^=&]+)(?:&|$)");
            var result;
            hash = hash.replace(/^#/, "");
            result = reg.exec(hash);
            if (result) {
                return result[1];
            }
        };
        var kyMap = {
            "Android": "AJQL249T5CUA",
            "PC": "AH46I8G5IHWE",
            "iPhone": "I2KN7UR1DG5U"
        };
        var platform = getPlatform();
        var KY = kyMap[platform] || kyMap['PC'];
        var SDK = getParamsFromUrl("SDK") || getParamsFromUrl("sdk") || "";
        var ui = getParamsFromUrl("ui") || getParamsFromUrl("UI") || "";
        var stringify = function(data) {
            if (window["JSON"]) {
                return JSON.stringify(data);
            } else {
                var s = [];
                for (var i in data) {
                    if (typeof data[i] == "object") {
                        s.push("\"" + i + "\":" + stringify(data[i]));
                    } else {
                        s.push("\"" + i + "\":" + (data[i]));
                    }
                }
                return "{" + s.join(",") + "}";
            }
        };
        var getCookie = function(name) {
            var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
            m = document.cookie.match(r);
            return (!m ? "": m[1]);
        };
        var uin = getCookie("uin") || 0;
        if (uin && (/^o([0-9]+)$/).test(uin)) {
            var g_iUin = parseFloat(RegExp.$1);
        } else {
            var g_iUin = 0;
        }
        var reportData = {
            ky: KY,
            ui: ui || getUuid(),
            et: 1000,
            ts: ~~ ( + new Date / 1000),
            ei: eventId,
            du: 1,
            kv: data
        };
        var kvData = {
            Platform: platform || "PC",
            Appid: data.appid || data.Appid || "",
            UIN: data.UIN || g_iUin,
            Entrance: platform == "PC" ? "PC": "H5",
            Time: "",
            SDK: SDK || "",
            Ext1: ""
        };
        if (data.Time) {
            kvData.Time = data.Time;
        } else {
            delete kvData.Time;
        }
        if (data.Ext1) {
            kvData.Ext1 = data.Ext1;
        } else {
            delete kvData.Ext1;
        }
        reportData.kv = kvData;
        var cgi = "http://cgi.connect.qq.com/report/mstat/report";
        var url = cgi + "?data=[" + stringify(reportData) + "]";
        var img = Q.reportImages.shift(); ! img && (img = new Image());
        img.src = url;
        img.onload = img.error = function() {
            Q.reportImages.push(this);
        };
    }
    return mtaReport;
})();
window.MM = (function() {
    var image = new Image(),
    paramObj = {};
    var report = function(cgi, retcode, tmcost, extra) {
        var url, paramArr = [];
        paramObj.commandid = cgi;
        paramObj.resultcode = retcode;
        paramObj.tmcost = tmcost;
        if (extra) {
            for (var i in extra) {
                if (extra.hasOwnProperty(i)) {
                    paramObj[i] = extra[i];
                }
            }
        }
        if (retcode == 0) {
            paramObj.frequency = 20;
            var ranNum = Math.floor(Math.random() * 100 + 1);
            if (ranNum > 5) {
                return;
            }
        } else {
            paramObj.frequency = 1;
        }
        for (var j in paramObj) {
            if (paramObj.hasOwnProperty(j)) {
                paramArr.push(j + "=" + encodeURIComponent(paramObj[j]));
            }
        }
        url = "http://wspeed.qq.com/w.cgi?" + paramArr.join("&");
        image.src = url;
    };
    var init = function(appid, uin, version) {
        paramObj = {
            appid: appid,
            touin: uin,
            releaseversion: version,
            frequency: 1
        };
    };
    return {
        init: init,
        report: report
    };
})();
Q.mm = MM;
Q.mta = MTA; ! (function(global, undefined) {
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function(className, element) {
            var children = (element || document).getElementsByTagName('*');
            var elements = new Array();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var classNames = child.className.split(' ');
                for (var j = 0; j < classNames.length; j++) {
                    if (classNames[j] == className) {
                        elements.push(child);
                        break;
                    }
                }
            }
            return elements;
        };
    }
})(this); ! (function(global, undefined) {
    Q.noop = function() {};
    Q.ie = (function() {
        if (window.ActiveXObject) {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) return parseInt(RegExp.$1);
        }
    })();
    Q.cookiedomainPrefix = "qq.com";
    Q.getCookie = function(name) {
        var r = new RegExp('(?:^|;+|\\s+)' + name + '=([^;]*)'),
        m = document.cookie.match(r);
        return (!m ? '': m[1]);
    };
    Q.getToken = function() {
        var str = Q.getCookie('skey') || '',
        hash = 5381;
        for (var i = 0,
        len = str.length; i < len; ++i) {
            hash += (hash << 5) + str.charCodeAt(i);
        }
        return hash & 0x7fffffff;
    };
    Q.setCookie = function setCookie(name, value, domain, path, hour) {
        if (hour) {
            var expire = new Date();
            expire.setTime(expire.getTime() + 3600000 * hour);
        }
        document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + Q.cookiedomainPrefix + ";"));
        return true;
    };
    Q.removeCookie = function removeCookie(name, domain, path) {
        document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + Q.cookiedomainPrefix + ";"));
    };
    Q.logout = function logout() {
        if (confirm("鎮ㄧ‘瀹氳浣跨敤鍏跺畠鍙风爜鐧诲綍鍚楋紵")) {
            for (var i = 0,
            ar = ["uin", "luin", "lskey", "skey", "zzpaneluin", "zzpanelkey", "prvk", "tab"], l = ar.length; i < l; i++) {
                Q.removeCookie(ar[i]);
            }
            location.reload(true);
        }
    };
    Q.getParameter = function getParameter(name) {
        var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)"),
        m = location.href.match(r);
        return decodeURIComponent(!m ? "": m[2]);
    };
    Q.disagree = function disagree() {
        window.close();
    };
    Q.addEventHandler = function(oTarget, sEventType, fnHandler, aArgs) {
        if (!oTarget) return;
        var handler = function() {
            fnHandler.apply(oTarget, aArgs || []);
        };
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, handler, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent('on' + sEventType, handler);
        } else {
            oTarget['on' + sEventType] = handler;
        }
    };
    Q.addClass = function(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className = el.className + ' ' + className;
        }
    };
    Q.hasClass = function(el, className) {
        if (el.classList) {
            if (!el || !className) {
                return false;
            }
            return el.classList.contains(className);
        } else {
            if (!el || !className) {
                return false;
            }
            return - 1 < (' ' + el.className + ' ').indexOf(' ' + className + ' ');
        }
    };
    Q.removeClass = function(el, className) {
        if (el.classList) {
            if (!el || !className || !Q.hasClass(el, className)) {
                return;
            }
            el.classList.remove(className);
        } else {
            if (!el || !className || !Q.hasClass(el, className)) {
                return;
            }
            el.className = el.className.replace(new RegExp('(?:^|\\s)' + className + '(?:\\s|$)'), ' ');
        }
    };
    Q.getClientWidth = function getClientWidth(doc) {
        var _doc = doc || document;
        return _doc.compatMode == 'CSS1Compat' ? _doc.documentElement.clientWidth: _doc.body.clientWidth;
    };
    Q.throttle = function(opt) {
        var timer = null;
        var t_start;
        var fn = opt.fn,
        context = opt.context,
        delay = opt.delay || 100,
        mustRunDelay = opt.mustRunDelay;
        return function() {
            var args = arguments,
            t_curr = +new Date();
            context = context || this;
            clearTimeout(timer);
            if (!t_start) {
                t_start = t_curr;
            }
            if (mustRunDelay && t_curr - t_start >= mustRunDelay) {
                fn.apply(context, args);
                t_start = t_curr;
            } else {
                timer = setTimeout(function() {
                    fn.apply(context, args);
                },
                delay);
            }
        };
    };
    Q.getCgi = function() {
        return [document.location.origin, document.location.pathname].join('');
    };
    Q.cgi = [document.location.origin, document.location.pathname].join('');
    Q.appid = Q.getParameter('client_id');
    Q.toQueryString = function(o) {
        o = o || {};
        var r = [];
        for (var p in o) {
            r.push(encodeURIComponent(p) + "=" + encodeURIComponent(o[p]));
        }
        return r.join("&");
    };
})(this); ! (function(global, undefined) {
    function qc_op() {
        if (Q.ie === 6) {
            Q.setCookie("__qc_open", "1", ".qq.com", "/jsdkproxy", 5 / 60);
        }
    }
    qc_op();
})(this); ! (function(global, undefined) {
    function getStats() {
        var ids = [],
        items = [];
        var acs = document.getElementsByName('api_choose');
        for (var i = 0,
        len = acs.length; i < len; i++) {
            var ac = acs[i];
            if (ac.checked || ac.disabled) {
                ids.push(ac.value);
                items.push(ac.id.split("_")[1]);
            }
        }
        return {
            ids: ids,
            items: items
        };
    }
    var faceEl = document.getElementsByClassName('face')[0];
    var disableAgree = function() {
        global.disabled = true;
        if (!faceEl) return;
        return setTimeout(function() {
            global.disabled = false;
        },
        5000);
    };
    var originItems = getStats().items;
    Q.agree = global.agree = function agree(_ids) {
        if (global.disabled) return;
        if (faceEl) {
            clearTimeout(global.agreeTimeout);
            global.agreeTimeout = disableAgree();
        }
        var ids = [],
        stats = getStats();
        if (_ids) {
            ids = _ids;
        } else {
            ids = stats.ids;
        }
        var diffItems = _.difference(originItems, stats.items);
        if (ids[0] !== '#') {
            Q.bernoulli(10613);
        } else {
            Q.bernoulli(10614);
        }
        if (ids[0] !== '#' && diffItems[0]) {
            Q.bernoulliSetup({
                opername: "qqconnect",
                name: "authorize$pc",
                action: "cancel"
            });
            _.forEach(diffItems,
            function(item) {
                Q.bernoulli(item);
            });
            Q.report(formSend);
        } else {
            formSend();
        }
        function formSend() {
            var data = Q.toQueryString({
                "report_type": 4,
                "platform": 8,
                "app_id": Q.getParameter("client_id") || Q.getParameter('oauth_consumer_key') || 0,
                "result": 0,
                "act_type": 2,
                "uin": /(^|;\s*)uin\=o0*(\d+)/.exec(document.cookie) ? /(^|;\s*)uin\=o0*(\d+)/.exec(document.cookie)[2] : 0,
                "login_status": 2 - (Q.isNeedLogin ? 0 : 1),
                "via": 1
            });
            Q.send("http://appsupport.qq.com/cgi-bin/appstage/mstats_report?" + data);
            if (ids[0] === undefined) {
                ids.push('#');
            }
            var CGI_URL = "https://graph.qq.com/oauth2.0/authorize",
            t = new FormSender(CGI_URL, "post", {
                response_type: Q.getParameter('response_type'),
                client_id: Q.getParameter('client_id'),
                redirect_uri: Q.getParameter('redirect_uri'),
                scope: Q.getParameter('scope'),
                state: Q.getParameter('state'),
                src: 1,
                update_auth: (Q.isNeedLogin ? 1 : 0),
                openapi: ids.join('_'),
                g_tk: Q.getToken(),
                auth_time: +new Date,
                ui: Q.getUuid()
            },
            "utf-8");
            t.onSuccess = function(re) {
                try {
                    if (re.ret == 0) {
                        setTimeout(function() {
                            window.location = (re.callback);
                        },
                        2000);
                    } else {}
                } catch(e) {}
            };
            t.onError = function() {};
            t.send();
        }
    };
    function doResize() {
        if (!document.getElementById('combine_page')) return;
        document.getElementById('combine_page').style.width = 'auto';
        var pageLoginEl = document.getElementsByClassName('page_login')[0];
        var pageAccreditEl = document.getElementsByClassName('page_accredit')[0];
        Q.removeClass(pageLoginEl, 'border_right');
        Q.removeClass(pageLoginEl, 'float_left');
        Q.removeClass(pageAccreditEl, 'float_left');
        Q.addClass(pageLoginEl, 'align');
        Q.addClass(pageAccreditEl, 'align');
        document.getElementsByClassName('lay_top_inner')[0].style.width = 'auto';
    }
    function initClientWidth() {
        var MAX = 688;
        var maxWidth = Q.getClientWidth(document);
        if (maxWidth < MAX) {
            doResize();
        }
        Q.addEventHandler(window, 'resize',
        function() {
            Q.throttle({
                fn: function() {
                    maxWidth = Q.getClientWidth(document);
                    if (maxWidth < MAX) {
                        doResize();
                        if (maxWidth < 433) {
                            document.getElementById('lay_main').style.marginLeft = '130px';
                        } else {
                            document.getElementById('lay_main').style.marginLeft = '27px';
                        }
                    } else {
                        var pageLoginEl = document.getElementsByClassName('page_login')[0];
                        var pageAccreditEl = document.getElementsByClassName('page_accredit')[0];
                        Q.addClass(pageLoginEl, 'border_right');
                        Q.removeClass(pageLoginEl, 'align');
                        Q.removeClass(pageAccreditEl, 'align');
                        Q.addClass(pageLoginEl, 'float_left');
                        Q.addClass(pageAccreditEl, 'float_left');
                        document.getElementsByClassName('lay_top_inner')[0].style.width = MAX + 'px';
                        document.getElementById('combine_page').style.width = MAX + 'px';
                    }
                }
            })();
        });
    }
    initClientWidth();
    var selectAllEl = document.getElementById('select_all');
    var oauthCheckboxsEls = document.getElementsByClassName('oauth_checkbox');
    if (selectAllEl && oauthCheckboxsEls) {
        Q.addEventHandler(selectAllEl, 'click',
        function() {
            if (this.checked) {
                selectAllOauth();
            } else {
                clearAllOauth();
            }
        });
        var selectAllOauth = function() {
            for (var i = 0; i < oauthCheckboxsEls.length; i++) {
                oauthCheckboxsEls[i].checked = 'checked';
            }
        };
        var clearAllOauth = function() {
            for (var i = 0; i < oauthCheckboxsEls.length; i++) {
                var oauthCheckbox = oauthCheckboxsEls[i];
                if (!oauthCheckbox.disabled) {
                    oauthCheckbox.checked = false;
                }
            }
        };
        var checkHasAllSelected = function() {
            var len = 0,
            checkedCnt = 0;
            for (var i = 0; i < oauthCheckboxsEls.length; i++) {
                var oauthCheckbox = oauthCheckboxsEls[i];
                if (!oauthCheckbox.disabled) {
                    len += 1;
                    if (oauthCheckbox.checked) {
                        checkedCnt += 1;
                    }
                }
            }
            if (checkedCnt === len) {
                selectAllEl.checked = 'checked';
            } else {
                selectAllEl.checked = false;
            }
        };
        function initCheckboxStat() {
            for (var i = 0; i < oauthCheckboxsEls.length; i++) {
                var oauthCheckbox = oauthCheckboxsEls[i];
                if (!oauthCheckbox.disabled) {
                    Q.addEventHandler(oauthCheckbox, 'click', checkHasAllSelected);
                }
            }
            checkHasAllSelected();
        }
        initCheckboxStat();
    }
    function initUI() {
        var redirect_uri = Q.getParameter('redirect_uri');
        var isSogou = false;
        if ((redirect_uri.indexOf("http://account.sogou.com") == 0 || redirect_uri.indexOf("https://account.sogou.com") == 0) && Q.getParameter('show_auth_items') == 0) {
            isSogou = true;
            var items = document.getElementsByClassName('page_accredit')[0];
            items.style.display = "none";
            if (Q.authsCount <= 0) {
                document.getElementsByClassName('lay_login_form')[0].style.marginLeft = "10px";
            }
        }
        if (Q.authsCount <= 0) {
            Q.removeClass(document.getElementsByClassName('wording_timeout')[0], 'hide');
            Q.removeClass(document.getElementsByClassName('page_login')[0], 'border_right'); ! isSogou && Q.addClass(document.getElementsByClassName('page_accredit')[0], 'hide');
            document.getElementsByClassName('page_login')[0].style.width = '100%';
            var timeoutEl = document.getElementsByClassName('timeout')[0];
            agreeInterval = setInterval(function() {
                timeoutEl.innerHTML = parseInt(timeoutEl.innerHTML, 10) - 1;
                if (timeoutEl.innerHTML == '0') {
                    clearInterval(agreeInterval);
                    Q.agree();
                }
            },
            1000);
        }
        var faceEl = document.getElementsByClassName('face')[0];
        if (faceEl) {
            var uinEl = document.getElementsByClassName('uin')[0];
            var imgOutFocusEl = document.getElementsByClassName('img_out_focus')[0];
            Q.addEventHandler(faceEl, 'mouseover',
            function() {
                Q.removeClass(uinEl, 'hide');
                Q.addClass(imgOutFocusEl, 'img_out_focus_focus');
            });
            Q.addEventHandler(faceEl, 'mouseout',
            function() {
                Q.addClass(uinEl, 'hide');
                Q.removeClass(imgOutFocusEl, 'img_out_focus_focus');
            });
        }
    }
    initUI();
    if (global.isAgreed) {
        Q.agree();
    }
    if (global.isLogouted) {
        Q.logout();
    }
})(this); ! (function(global, undefined) {
    if (Q.getParameter("which") === 'error') return;
    var client_id = Q.getParameter("client_id");
    Q.bernoulliSetup({
        obj: client_id
    });
    Q.bernoulli(10955);
    Q.mta('LoginPageViews', {
        Appid: Q.appid,
        Time: +new Date() - window.__start
    });
    Q.addEventHandler(document.getElementById('select_all'), 'click',
    function() {
        if (!this.checked) {
            Q.bernoulli(10960);
        }
    });
    Q.addEventHandler(document.getElementById('accredit_site_link'), 'click',
    function() {
        Q.bernoulli(10958);
    });
    Q.addEventHandler(document.getElementById('auth_manager_link'), 'click',
    function() {
        Q.bernoulli(10957);
    });
    var oauth_checkboxs = document.getElementsByClassName('oauth_checkbox');
    for (var i = 0; i < oauth_checkboxs.length; i++) {
        Q.addEventHandler(oauth_checkboxs[i], 'click',
        function() {
            if (!this.checked) {
                Q.bernoulli(10959);
            }
        });
    }
    _speedTiming.push( + new Date);
    Q.addEventHandler(window, "load",
    function() {
        _speedTiming.push( + new Date);
        setTimeout(function() {
            Q.performance(7721, 166, 6);
            Q.isd(7721, 166, 9, _speedTiming);
        },
        2000);
    });
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        Q.monitor(302298);
    }
    if (Q.authsCount <= 0) {
        Q.monitor(302297)
    }
    if (Q.isNeedLogin) {
        Q.monitor(302295)
    } else {
        Q.monitor(302296);
    }
})(this); (function() {
    Q.addEventHandler(window, 'load',
    function() {
        var data = Q.toQueryString({
            "report_type": 4,
            "platform": 8,
            "app_id": Q.getParameter("client_id") || Q.getParameter('oauth_consumer_key') || 0,
            "result": 0,
            "act_type": 1,
            "uin": /(^|;\s*)uin\=o0*(\d+)/.exec(document.cookie) ? /(^|;\s*)uin\=o0*(\d+)/.exec(document.cookie)[2] : 0,
            "login_status": 2 - (Q.isNeedLogin ? 0 : 1),
            "via": 1
        });
        Q.send("http://appsupport.qq.com/cgi-bin/appstage/mstats_report?" + data);
    },
    false);
})();
/*  |xGv00|fa5b41aa2dd2a48ee7594a212090c530 */

