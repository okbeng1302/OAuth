function pluginBegin() {
    if (!$.sso_loadComplete) try {
        $.checkNPPlugin()
    } catch(t) {}
    $.sso_loadComplete = !0,
    $.report.setSpeedPoint($.plugin_isd_flag, 1, (new Date).getTime()),
    window.setTimeout(function() {
        $.report.isdSpeed($.plugin_isd_flag, .05)
    },
    2e3)
}
function ptui_qlogin_CB(t, i, e) {
    switch (window.clearTimeout(pt.qlogin.__getstClock), ptui_qlogin_CB.called = !0, t) {
    case "0":
        pt.plogin.redirect(pt.ptui.target, i);
        break;
    case "10006":
        pt.plogin.force_qrlogin(),
        pt.plogin.show_err(e, !0);
        break;
    default:
        pt.plogin.switchpage(1),
        pt.plogin.show_err(e, !0)
    }
}
function ptui_getuins_CB(t) {
    if (clearTimeout(pt.qlogin.__getuinsClock), t && !ptui_getuins_CB.called) {
        ptui_getuins_CB.called = !0,
        pt.plogin.hide_err();
        for (var i = [], e = 0; e < t.length; e++) {
            var n = t[e];
            i.push({
                uin: n.uin,
                name: n.account,
                uinString: n.uin,
                type: 0,
                face: n.face_index,
                nick: n.nickname,
                flag: n.uin_flag,
                loginType: pt.qlogin.PCSvrQlogin
            })
        }
        pt.plogin.initQlogin("", i),
        pt.qlogin.initFace(),
        $.report.monitor(508158, 1),
        window.localStorage && localStorage.setItem("newQQ", !0)
    }
}
function ptui_getst_CB(t) {
    t && (ptui_getst_CB.called = !0, pt.plogin.hideLoading(), ptui_getst_CB.submitUrl && $.http.loadScript(ptui_getst_CB.submitUrl.replace("{{hash_clientkey}}", 2147483647 & $.str.time33($.cookie.get("clientkey")))), $.report.monitor(508159, 1))
}
function ptuiCB(t, i, e, n, o) {
    function r() {
        pt.plogin.is_mibao(e) && (e += "&style=" + pt.ptui.style + "&proxy_url=" + encodeURIComponent(pt.ptui.proxy_url), e += "#login_href=" + encodeURIComponent(pt.ptui.href)),
        pt.plogin.redirect(n, e)
    }
    var p = $("p"),
    a = pt.plogin.at_account && (p.value || pt.plogin.armSafeEdit.safepwd);
    clearTimeout(pt.plogin.loginClock),
    a && (pt.plogin.lastCheckAccount = ""),
    pt.plogin.hasSubmit = !0;
    var s = !1;
    switch (t) {
    case "0":
        a || pt.plogin.is_mibao(e) ? r() : (window.clearInterval(pt.plogin.qrlogin_clock), r());
        break;
    case "3":
        $("p").value = "",
        pt.plogin.domFocus($("p")),
        pt.plogin.passwordErrorNum++,
        ("101" == i || "102" == i || "103" == i) && pt.plogin.showVC(),
        pt.plogin.check();
        break;
    case "4":
        pt.plogin.check();
        break;
    case "12":
    case "51":
        s = !0;
        break;
    case "65":
        return void(0 != pt.plogin.onekeyVerifyClock ? pt.plogin.onekeyVerify("invalid") : pt.plogin.set_qrlogin_invalid());
    case "66":
        return;
    case "67":
        return void pt.plogin.go_qrlogin_step(2);
    case "22005":
    case "68":
        pt.plogin.onekeyVerify("hide");
        break;
    case "10005":
    case "10006":
        pt.plogin.force_qrlogin();
        break;
    case "10008":
        return void pt.plogin.onekeyVerify("normal", i, o);
    default:
        pt.plogin.needVc && !pt.plogin.needShowNewVc ? pt.plogin.changeVC() : pt.plogin.check()
    }
    if (0 != t && a && pt.plogin.show_err(o, s), !pt.plogin.hasCheck && a && (pt.plogin.needShowNewVc || pt.plogin.showVC(), $("verifycode").focus(), $("verifycode").select()), Math.random() < .2) {
        pt.plogin.isdTime["7808-7-2-1"] = (new Date).getTime();
        var l = 1;
        pt.ptui.isHttps && (l = 2);
        var c = "flag1=7808&flag2=7&flag3=2&" + l + "=" + (pt.plogin.isdTime["7808-7-2-1"] - pt.plogin.isdTime["7808-7-2-0"]);
        $.report.simpleIsdSpeed(c)
    }
}
function ptui_checkVC(t, i, e, n, o) {
    switch (clearTimeout(pt.plogin.checkClock), pt.plogin.isRandSalt = o, pt.plogin.salt = e, pt.plogin.checkRet = t, "2" == t ? pt.plogin.loginState == pt.LoginState.PLogin && pt.plogin.show_err(pt.str.inv_uin) : "3" == t || !pt.plogin.hasSubmit, t + "") {
    case "0":
    case "2":
    case "3":
        pt.plogin.hideVC(),
        "1" == pt.ptui.pt_vcode_v1 && (pt.plogin.needShowNewVc = !1),
        $("verifycode").value = i || "abcd",
        pt.plogin.needVc = !1,
        $.report.monitor("330321", .05),
        i || $.report.nlog("check no code return,ret=" + t + ",code=" + i + ",uin=" + $.str.bin2String(e));
        break;
    case "1":
        pt.plogin.cap_cd = i,
        "1" == pt.ptui.pt_vcode_v1 ? pt.plogin.needShowNewVc = !0 : (pt.plogin.showVC(), $.css.show($("vc_tips"))),
        pt.plogin.needVc = !0,
        $.report.monitor("330320", .05)
    }
    pt.plogin.pt_verifysession = n,
    pt.plogin.domFocus($("p")),
    pt.plogin.hasCheck = !0,
    pt.plogin.checkTime = (new Date).getTime(),
    pt.plogin.check.cb && pt.plogin.check.cb()
}
function ptui_auth_CB(t, i) {
    switch (parseInt(t)) {
    case 0:
        pt.plogin.authUin = $.cookie.get("superuin").replace(/^o0*/, ""),
        pt.plogin.authSubmitUrl = i,
        pt.plogin.init(i);
        break;
    case 1:
        pt.plogin.init();
        break;
    case 2:
        var e = i + "&regmaster=" + pt.ptui.regmaster + "&aid=" + pt.ptui.appid + "&s_url=" + encodeURIComponent(pt.ptui.s_url);
        "1" == pt.ptui.pt_light && (e += "&pt_light=1"),
        pt.plogin.redirect(pt.ptui.target, e);
        break;
    default:
        pt.preload.init()
    }
} ! window.console && (window.console = {
    log: function() {},
    warn: function() {},
    error: function() {}
});
var $ = window.Simple = function(t) {
    return "string" == typeof t ? document.getElementById(t) : t
};
$.cookie = {
    get: function(t) {
        var i = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return i ? decodeURIComponent(i[2]) : ""
    },
    getOrigin: function(t) {
        var i = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return i ? i[2] : ""
    },
    set: function(t, i, e, n, o) {
        var r = new Date;
        o ? (r.setTime(r.getTime() + 36e5 * o), document.cookie = t + "=" + i + "; expires=" + r.toGMTString() + "; path=" + (n ? n: "/") + "; " + (e ? "domain=" + e + ";": "")) : document.cookie = t + "=" + i + "; path=" + (n ? n: "/") + "; " + (e ? "domain=" + e + ";": "")
    },
    del: function(t, i, e) {
        document.cookie = t + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (e ? e: "/") + "; " + (i ? "domain=" + i + ";": "")
    },
    uin: function() {
        var t = $.cookie.get("uin");
        return t ? parseInt(t.substring(1, t.length), 10) : null
    }
},
$.http = {
    getXHR: function() {
        return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest
    },
    ajax: function(url, para, cb, method, type) {
        var xhr = $.http.getXHR();
        return xhr.open(method, url),
        xhr.onreadystatechange = function() {
            4 == xhr.readyState && (xhr.status >= 200 && xhr.status < 300 || 304 === xhr.status || 1223 === xhr.status || 0 === xhr.status ? "undefined" == typeof type && xhr.responseText ? cb(eval("(" + xhr.responseText + ")")) : (cb(xhr.responseText), !xhr.responseText && $.badjs._smid && $.badjs("HTTP Empty[xhr.status]:" + xhr.status, url, 0, $.badjs._smid)) : $.badjs._smid && $.badjs("HTTP Error[xhr.status]:" + xhr.status, url, 0, $.badjs._smid), xhr = null)
        },
        xhr.send(para),
        xhr
    },
    post: function(t, i, e, n) {
        var o = "";
        for (var r in i) o += "&" + r + "=" + i[r];
        return $.http.ajax(t, o, e, "POST", n)
    },
    get: function(t, i, e, n) {
        var o = [];
        for (var r in i) o.push(r + "=" + i[r]);
        return - 1 == t.indexOf("?") && (t += "?"),
        t += o.join("&"),
        $.http.ajax(t, null, e, "GET", n)
    },
    jsonp: function(t) {
        var i = document.createElement("script");
        i.src = t,
        document.getElementsByTagName("head")[0].appendChild(i)
    },
    loadScript: function(t, i) {
        var e = document.createElement("script");
        e.onload = e.onreadystatechange = function() {
            this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || ("function" == typeof i && i(), e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e))
        },
        e.src = t,
        document.getElementsByTagName("head")[0].appendChild(e)
    },
    preload: function(t) {
        var i = document.createElement("img");
        i.src = t,
        i = null
    }
},
$.get = $.http.get,
$.post = $.http.post,
$.jsonp = $.http.jsonp,
$.browser = function(t) {
    if ("undefined" == typeof $.browser.info) {
        var i = {
            type: ""
        },
        e = navigator.userAgent.toLowerCase();
        /webkit/.test(e) ? i = {
            type: "webkit",
            version: /webkit[\/ ]([\w.]+)/
        }: /opera/.test(e) ? i = {
            type: "opera",
            version: /version/.test(e) ? /version[\/ ]([\w.]+)/: /opera[\/ ]([\w.]+)/
        }: /msie/.test(e) ? i = {
            type: "msie",
            version: /msie ([\w.]+)/
        }: /mozilla/.test(e) && !/compatible/.test(e) && (i = {
            type: "ff",
            version: /rv:([\w.]+)/
        }),
        i.version = (i.version && i.version.exec(e) || [0, "0"])[1],
        $.browser.info = i
    }
    return $.browser.info[t]
},
$.e = {
    _counter: 0,
    _uid: function() {
        return "h" + $.e._counter++
    },
    add: function(t, i, e) {
        if ("object" != typeof t && (t = $(t)), document.addEventListener) t.addEventListener(i, e, !1);
        else if (document.attachEvent) {
            if ( - 1 != $.e._find(t, i, e)) return;
            var n = function(i) {
                i || (i = window.event);
                var n = {
                    _event: i,
                    type: i.type,
                    target: i.srcElement,
                    currentTarget: t,
                    relatedTarget: i.fromElement ? i.fromElement: i.toElement,
                    eventPhase: i.srcElement == t ? 2 : 3,
                    clientX: i.clientX,
                    clientY: i.clientY,
                    screenX: i.screenX,
                    screenY: i.screenY,
                    altKey: i.altKey,
                    ctrlKey: i.ctrlKey,
                    shiftKey: i.shiftKey,
                    keyCode: i.keyCode,
                    data: i.data,
                    origin: i.origin,
                    stopPropagation: function() {
                        this._event.cancelBubble = !0
                    },
                    preventDefault: function() {
                        this._event.returnValue = !1
                    }
                };
                Function.prototype.call ? e.call(t, n) : (t._currentHandler = e, t._currentHandler(n), t._currentHandler = null)
            };
            t.attachEvent("on" + i, n);
            var o = {
                element: t,
                eventType: i,
                handler: e,
                wrappedHandler: n
            },
            r = t.document || t,
            p = r.parentWindow,
            a = $.e._uid();
            p._allHandlers || (p._allHandlers = {}),
            p._allHandlers[a] = o,
            t._handlers || (t._handlers = []),
            t._handlers.push(a),
            p._onunloadHandlerRegistered || (p._onunloadHandlerRegistered = !0, p.attachEvent("onunload", $.e._removeAllHandlers))
        }
    },
    remove: function(t, i, e) {
        if (document.addEventListener) t.removeEventListener(i, e, !1);
        else if (document.attachEvent) {
            var n = $.e._find(t, i, e);
            if ( - 1 == n) return;
            var o = t.document || t,
            r = o.parentWindow,
            p = t._handlers[n],
            a = r._allHandlers[p];
            t.detachEvent("on" + i, a.wrappedHandler),
            t._handlers.splice(n, 1),
            delete r._allHandlers[p]
        }
    },
    _find: function(t, i, e) {
        var n = t._handlers;
        if (!n) return - 1;
        for (var o = t.document || t,
        r = o.parentWindow,
        p = n.length - 1; p >= 0; p--) {
            var a = n[p],
            s = r._allHandlers[a];
            if (s.eventType == i && s.handler == e) return p
        }
        return - 1
    },
    _removeAllHandlers: function() {
        var t = this;
        for (id in t._allHandlers) {
            var i = t._allHandlers[id];
            i.element.detachEvent("on" + i.eventType, i.wrappedHandler),
            delete t._allHandlers[id]
        }
    },
    src: function(t) {
        return t ? t.target: event.srcElement
    },
    stopPropagation: function(t) {
        t ? t.stopPropagation() : event.cancelBubble = !0
    },
    trigger: function(t, i) {
        var e = {
            HTMLEvents: "abort,blur,change,error,focus,load,reset,resize,scroll,select,submit,unload",
            UIEevents: "keydown,keypress,keyup",
            MouseEvents: "click,mousedown,mousemove,mouseout,mouseover,mouseup"
        };
        if (document.createEvent) {
            var n = "";
            "mouseleave" == i && (i = "mouseout"),
            "mouseenter" == i && (i = "mouseover");
            for (var o in e) if (e[o].indexOf(i)) {
                n = o;
                break
            }
            var r = document.createEvent(n);
            r.initEvent(i, !0, !1),
            t.dispatchEvent(r)
        } else document.createEventObject && t.fireEvent("on" + i)
    }
},
$.bom = {
    query: function(t) {
        var i = window.location.search.match(new RegExp("(\\?|&)" + t + "=([^&]*)(&|$)"));
        return i ? decodeURIComponent(i[2]) : ""
    },
    getHash: function(t) {
        var i = window.location.hash.match(new RegExp("(#|&)" + t + "=([^&]*)(&|$)"));
        return i ? decodeURIComponent(i[2]) : ""
    }
},
$.winName = {
    set: function(t, i) {
        var e = window.name || "";
        window.name = e.match(new RegExp(";" + t + "=([^;]*)(;|$)")) ? e.replace(new RegExp(";" + t + "=([^;]*)"), ";" + t + "=" + i) : e + ";" + t + "=" + i
    },
    get: function(t) {
        var i = window.name || "",
        e = i.match(new RegExp(";" + t + "=([^;]*)(;|$)"));
        return e ? e[1] : ""
    },
    clear: function(t) {
        var i = window.name || "";
        window.name = i.replace(new RegExp(";" + t + "=([^;]*)"), "")
    }
},
$.localData = function() {
    function t() {
        var t = document.createElement("link");
        return t.style.display = "none",
        t.id = o,
        document.getElementsByTagName("head")[0].appendChild(t),
        t.addBehavior("#default#userdata"),
        t
    }
    function i() {
        if ("undefined" == typeof n) if (window.localStorage) n = localStorage;
        else try {
            n = t(),
            n.load(o)
        } catch(i) {
            return n = !1,
            !1
        }
        return ! 0
    }
    function e(t) {
        return "string" != typeof t ? !1 : r.test(t)
    }
    var n, o = "ptlogin2.qq.com",
    r = /^[0-9A-Za-z_-]*$/;
    return {
        set: function(t, r) {
            var p = !1;
            if (e(t) && i()) try {
                r += "",
                window.localStorage ? (n.setItem(t, r), p = !0) : (n.setAttribute(t, r), n.save(o), p = n.getAttribute(t) === r)
            } catch(a) {}
            return p
        },
        get: function(t) {
            if (e(t) && i()) try {
                return window.localStorage ? n.getItem(t) : n.getAttribute(t)
            } catch(o) {}
            return null
        },
        remove: function(t) {
            if (e(t) && i()) try {
                return window.localStorage ? n.removeItem(t) : n.removeAttribute(t),
                !0
            } catch(o) {}
            return ! 1
        }
    }
} (),
$.str = function() {
    var htmlDecodeDict = {
        quot: '"',
        lt: "<",
        gt: ">",
        amp: "&",
        nbsp: " ",
        "#34": '"',
        "#60": "<",
        "#62": ">",
        "#38": "&",
        "#160": " "
    },
    htmlEncodeDict = {
        '"': "#34",
        "<": "#60",
        ">": "#62",
        "&": "#38",
        " ": "#160"
    };
    return {
        decodeHtml: function(t) {
            return t += "",
            t.replace(/&(quot|lt|gt|amp|nbsp);/gi,
            function(t, i) {
                return htmlDecodeDict[i]
            }).replace(/&#u([a-f\d]{4});/gi,
            function(t, i) {
                return String.fromCharCode(parseInt("0x" + i))
            }).replace(/&#(\d+);/gi,
            function(t, i) {
                return String.fromCharCode( + i)
            })
        },
        encodeHtml: function(t) {
            return t += "",
            t.replace(/["<>& ]/g,
            function(t) {
                return "&" + htmlEncodeDict[t] + ";"
            })
        },
        trim: function(t) {
            t += "";
            for (var t = t.replace(/^\s+/, ""), i = /\s/, e = t.length; i.test(t.charAt(--e)););
            return t.slice(0, e + 1)
        },
        uin2hex: function(str) {
            var maxLength = 16;
            str = parseInt(str);
            for (var hex = str.toString(16), len = hex.length, i = len; maxLength > i; i++) hex = "0" + hex;
            for (var arr = [], j = 0; maxLength > j; j += 2) arr.push("\\x" + hex.substr(j, 2));
            var result = arr.join("");
            return eval('result="' + result + '"'),
            result
        },
        bin2String: function(t) {
            for (var i = [], e = 0, n = t.length; n > e; e++) {
                var o = t.charCodeAt(e).toString(16);
                1 == o.length && (o = "0" + o),
                i.push(o)
            }
            return i = "0x" + i.join(""),
            i = parseInt(i, 16)
        },
        str2bin: function(str) {
            for (var arr = [], i = 0; i < str.length; i += 2) arr.push(eval("'\\x" + str.charAt(i) + str.charAt(i + 1) + "'"));
            return arr.join("")
        },
        utf8ToUincode: function(t) {
            var e = "";
            try {
                var n = t.length,
                o = [];
                for (i = 0; i < n; i += 2) o.push("%" + t.substr(i, 2));
                e = decodeURIComponent(o.join("")),
                e = $.str.decodeHtml(e)
            } catch(r) {
                e = ""
            }
            return e
        },
        json2str: function(t) {
            var i = "";
            if ("undefined" != typeof JSON) i = JSON.stringify(t);
            else {
                var e = [];
                for (var n in t) e.push('"' + n + '":"' + t[n] + '"');
                i = "{" + e.join(",") + "}"
            }
            return i
        },
        time33: function(t) {
            for (var i = 0,
            e = 0,
            n = t.length; n > e; e++) i = (33 * i + t.charCodeAt(e)) % 4294967296;
            return i
        }
    }
} (),
$.css = function() {
    var t = document.documentElement;
    return {
        getPageScrollTop: function() {
            return window.pageYOffset || t.scrollTop || document.body.scrollTop || 0
        },
        getPageScrollLeft: function() {
            return window.pageXOffset || t.scrollLeft || document.body.scrollLeft || 0
        },
        getOffsetPosition: function(i) {
            i = $(i);
            var e = 0,
            n = 0;
            if (t.getBoundingClientRect && i.getBoundingClientRect) {
                var o = i.getBoundingClientRect(),
                r = t.clientTop || document.body.clientTop || 0,
                p = t.clientLeft || document.body.clientLeft || 0;
                e = o.top + this.getPageScrollTop() - r,
                n = o.left + this.getPageScrollLeft() - p
            } else do e += i.offsetTop || 0,
            n += i.offsetLeft || 0,
            i = i.offsetParent;
            while (i);
            return {
                left: n,
                top: e
            }
        },
        getWidth: function(t) {
            return $(t).offsetWidth
        },
        getHeight: function(t) {
            return $(t).offsetHeight
        },
        show: function(t) {
            t.style.display = "block"
        },
        hide: function(t) {
            t.style.display = "none"
        },
        hasClass: function(t, i) {
            if (!t.className) return ! 1;
            for (var e = t.className.split(" "), n = 0, o = e.length; o > n; n++) if (i == e[n]) return ! 0;
            return ! 1
        },
        addClass: function(t, i) {
            $.css.updateClass(t, i, !1)
        },
        removeClass: function(t, i) {
            $.css.updateClass(t, !1, i)
        },
        updateClass: function(t, i, e) {
            for (var n = t.className.split(" "), o = {},
            r = 0, p = n.length; p > r; r++) n[r] && (o[n[r]] = !0);
            if (i) {
                var a = i.split(" ");
                for (r = 0, p = a.length; p > r; r++) a[r] && (o[a[r]] = !0)
            }
            if (e) {
                var s = e.split(" ");
                for (r = 0, p = s.length; p > r; r++) s[r] && delete o[s[r]]
            }
            var l = [];
            for (var c in o) l.push(c);
            t.className = l.join(" ")
        },
        setClass: function(t, i) {
            t.className = i
        }
    }
} (),
$.animate = {
    fade: function(t, i, e, n, o) {
        if (t = $(t)) {
            t.effect || (t.effect = {});
            var r = Object.prototype.toString.call(i),
            p = 100;
            isNaN(i) ? "[object Object]" == r && i && i.to && (isNaN(i.to) || (p = i.to), isNaN(i.from) || (t.style.opacity = i.from / 100, t.style.filter = "alpha(opacity=" + i.from + ")")) : p = i,
            "undefined" == typeof t.effect.fade && (t.effect.fade = 0),
            window.clearInterval(t.effect.fade);
            var e = e || 1,
            n = n || 20,
            a = window.navigator.userAgent.toLowerCase(),
            s = function(t) {
                var i;
                if ( - 1 != a.indexOf("msie")) {
                    var e = (t.currentStyle || {}).filter || "";
                    i = e.indexOf("opacity") >= 0 ? parseFloat(e.match(/opacity=([^)]*)/)[1]) + "": "100"
                } else {
                    var n = t.ownerDocument.defaultView;
                    n = n && n.getComputedStyle,
                    i = 100 * (n && n(t, null).opacity || 1)
                }
                return parseFloat(i)
            },
            l = s(t),
            c = p > l ? 1 : -1; - 1 != a.indexOf("msie") && 15 > n && (e = Math.floor(15 * e / n), n = 15);
            var u = function() {
                l += e * c,
                (Math.round(l) - p) * c >= 0 ? (t.style.opacity = p / 100, t.style.filter = "alpha(opacity=" + p + ")", window.clearInterval(t.effect.fade), "function" == typeof o && o(t)) : (t.style.opacity = l / 100, t.style.filter = "alpha(opacity=" + l + ")")
            };
            t.effect.fade = window.setInterval(u, n)
        }
    },
    animate: function(t, i, e, n, o) {
        if (t = $(t)) {
            t.effect || (t.effect = {}),
            "undefined" == typeof t.effect.animate && (t.effect.animate = 0);
            for (var r in i) i[r] = parseInt(i[r]) || 0;
            window.clearInterval(t.effect.animate);
            var e = e || 10,
            n = n || 20,
            p = function(t) {
                var i = {
                    left: t.offsetLeft,
                    top: t.offsetTop
                };
                return i
            },
            a = p(t),
            s = {
                width: t.clientWidth,
                height: t.clientHeight,
                left: a.left,
                top: a.top
            },
            l = [],
            c = window.navigator.userAgent.toLowerCase();
            if ( - 1 == c.indexOf("msie") || "BackCompat" != document.compatMode) {
                var u = document.defaultView ? document.defaultView.getComputedStyle(t, null) : t.currentStyle,
                g = i.width || 0 == i.width ? parseInt(i.width) : null,
                d = i.height || 0 == i.height ? parseInt(i.height) : null;
                "number" == typeof g && (l.push("width"), i.width = g - u.paddingLeft.replace(/\D/g, "") - u.paddingRight.replace(/\D/g, "")),
                "number" == typeof d && (l.push("height"), i.height = d - u.paddingTop.replace(/\D/g, "") - u.paddingBottom.replace(/\D/g, "")),
                15 > n && (e = Math.floor(15 * e / n), n = 15)
            }
            var h = i.left || 0 == i.left ? parseInt(i.left) : null,
            m = i.top || 0 == i.top ? parseInt(i.top) : null;
            "number" == typeof h && (l.push("left"), t.style.position = "absolute"),
            "number" == typeof m && (l.push("top"), t.style.position = "absolute");
            for (var f = [], _ = l.length, r = 0; _ > r; r++) f[l[r]] = s[l[r]] < i[l[r]] ? 1 : -1;
            var v = t.style,
            w = function() {
                for (var n = !0,
                r = 0; _ > r; r++) s[l[r]] = s[l[r]] + f[l[r]] * Math.abs(i[l[r]] - s[l[r]]) * e / 100,
                (Math.round(s[l[r]]) - i[l[r]]) * f[l[r]] >= 0 ? (n = n && !0, v[l[r]] = i[l[r]] + "px") : (n = n && !1, v[l[r]] = s[l[r]] + "px");
                n && (window.clearInterval(t.effect.animate), "function" == typeof o && o(t))
            };
            t.effect.animate = window.setInterval(w, n)
        }
    }
},
$.check = {
    isHttps: function() {
        return "https:" == document.location.protocol
    },
    isSsl: function() {
        var t = document.location.host;
        return /^ssl./i.test(t)
    },
    isIpad: function() {
        var t = navigator.userAgent.toLowerCase();
        return /ipad/i.test(t)
    },
    isQQ: function(t) {
        return /^[1-9]{1}\d{4,9}$/.test(t)
    },
    isQQMail: function(t) {
        return /^[1-9]{1}\d{4,9}@qq\.com$/.test(t)
    },
    isNullQQ: function(t) {
        return /^\d{1,4}$/.test(t)
    },
    isNick: function(t) {
        return /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(t)
    },
    isName: function(t) {
        return /[\u4E00-\u9FA5]{1,8}/.test(t)
    },
    isPhone: function(t) {
        return /^(?:86|886|)1\d{10}\s*$/.test(t)
    },
    isDXPhone: function(t) {
        return /^(?:86|886|)1(?:33|53|80|81|89)\d{8}$/.test(t)
    },
    isSeaPhone: function(t) {
        return /^(00)?(?:852|853|886(0)?\d{1})\d{8}$/.test(t)
    },
    isMail: function(t) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t)
    },
    isQiyeQQ800: function(t) {
        return /^(800)\d{7}$/.test(t)
    },
    isPassword: function(t) {
        return t && t.length >= 16
    },
    isForeignPhone: function(t) {
        return /^00\d{7,}/.test(t)
    },
    needVip: function(t) {
        for (var i = ["21001601", "21000110", "21000121", "46000101", "716027609", "716027610", "549000912", "637009801"], e = !0, n = 0, o = i.length; o > n; n++) if (i[n] == t) {
            e = !1;
            break
        }
        return e
    },
    isPaipai: function() {
        return /paipai.com$/.test(window.location.hostname)
    },
    is_weibo_appid: function(t) {
        return 46000101 == t || 607000101 == t || 558032501 == t ? !0 : !1
    }
},
$.report = {
    monitor: function(t, i) {
        if (! (Math.random() > (i || 1))) try {
            var e = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t;
            $.http.preload(e)
        } catch(n) {}
    },
    nlog: function(t, i, e, n) {
        if (! (Math.random() >= (e || 1))) try {
            var o = "https:" == location.protocol ? "https://ssl.qq.com/ptlogin/cgi-bin/ptlogin_report?": "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report?",
            r = encodeURIComponent(t + "|_|" + location.href + "|_|" + window.navigator.userAgent);
            i = i ? i: 0,
            n && (o += "u=" + n + "&"),
            o += "id=" + i + "&msg=" + r + "&v=" + Math.random(),
            $.http.preload(o)
        } catch(p) {}
    },
    simpleIsdSpeed: function(t, i) {
        if (Math.random() < (i || 1)) {
            var e = "http://isdspeed.qq.com/cgi-bin/r.cgi?";
            $.check.isHttps() && (e = "https://login.qq.com/cgi-bin/r.cgi?"),
            e += t,
            $.http.preload(e)
        }
    },
    isdSpeed: function(t, i) {
        var e = !1,
        n = "http://isdspeed.qq.com/cgi-bin/r.cgi?";
        if ($.check.isHttps() && (n = "https://login.qq.com/cgi-bin/r.cgi?"), n += t, Math.random() < (i || 1)) {
            var o = $.report.getSpeedPoints(t);
            for (var r in o) o[r] && o[r] < 3e4 && (n += "&" + r + "=" + o[r], e = !0);
            n += "&v=" + Math.random(),
            e && $.http.preload(n)
        }
        $.report.setSpeedPoint(t)
    },
    speedPoints: {},
    basePoint: {},
    setBasePoint: function(t, i) {
        $.report.basePoint[t] = i
    },
    setSpeedPoint: function(t, i, e) {
        i ? ($.report.speedPoints[t] || ($.report.speedPoints[t] = {}), $.report.speedPoints[t][i] = e - $.report.basePoint[t]) : $.report.speedPoints[t] = {}
    },
    setSpeedPoints: function(t, i) {
        $.report.speedPoints[t] = i
    },
    getSpeedPoints: function(t) {
        return $.report.speedPoints[t]
    }
},
$.sso_ver = 0,
$.sso_state = 0,
$.plugin_isd_flag = "",
$.nptxsso = null,
$.activetxsso = null,
$.sso_loadComplete = !0,
$.np_clock = 0,
$.loginQQnum = 0,
$.suportActive = function() {
    var t = !0;
    try {
        window.ActiveXObject || window.ActiveXObject.prototype ? (t = !0, window.ActiveXObject.prototype && !window.ActiveXObject && $.report.nlog("activeobject 判断有问题")) : t = !1
    } catch(i) {
        t = !1
    }
    return t
},
$.getLoginQQNum = function() {
    try {
        var t = 0;
        if ($.suportActive()) {
            $.plugin_isd_flag = "flag1=7808&flag2=1&flag3=20",
            $.report.setBasePoint($.plugin_isd_flag, new Date);
            var i = new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2");
            $.activetxsso = i;
            var e = i.CreateTXSSOData();
            i.InitSSOFPTCtrl(0, e);
            var n = i.DoOperation(2, e),
            o = n.GetArray("PTALIST");
            t = o.GetSize();
            try {
                var r = i.QuerySSOInfo(1);
                $.sso_ver = r.GetInt("nSSOVersion")
            } catch(p) {
                $.sso_ver = 0
            }
        } else if (navigator.mimeTypes["application/nptxsso"]) if ($.plugin_isd_flag = "flag1=7808&flag2=1&flag3=21", $.report.setBasePoint($.plugin_isd_flag, (new Date).getTime()), $.nptxsso || ($.nptxsso = document.createElement("embed"), $.nptxsso.type = "application/nptxsso", $.nptxsso.style.width = "0px", $.nptxsso.style.height = "0px", document.body.appendChild($.nptxsso)), "function" != typeof $.nptxsso.InitPVANoST) $.sso_loadComplete = !1,
        $.report.nlog("没有找到插件的InitPVANoST方法", 269929);
        else {
            var a = $.nptxsso.InitPVANoST();
            a && (t = $.nptxsso.GetPVACount(), $.sso_loadComplete = !0);
            try {
                $.sso_ver = $.nptxsso.GetSSOVersion()
            } catch(p) {
                $.sso_ver = 0
            }
        } else $.report.nlog("插件没有注册成功", 263744),
        $.sso_state = 2
    } catch(p) {
        var s = null;
        try {
            s = $.http.getXHR()
        } catch(p) {
            return 0
        }
        var l = p.message || p;
        return /^pt_windows_sso/.test(l) ? (/^pt_windows_sso_\d+_3/.test(l) ? $.report.nlog("QQ插件不支持该url" + p.message, 326044) : $.report.nlog("QQ插件抛出内部错误" + p.message, 325361), $.sso_state = 1) : s ? ($.report.nlog("可能没有安装QQ" + p.message, 322340), $.sso_state = 2) : ($.report.nlog("获取登录QQ号码出错" + p.message, 263745), window.ActiveXObject && ($.sso_state = 1)),
        0
    }
    return $.loginQQnum = t,
    t
},
$.checkNPPlugin = function() {
    var t = 10;
    window.clearInterval($.np_clock),
    $.np_clock = window.setInterval(function() {
        "function" == typeof $.nptxsso.InitPVANoST || 0 == t ? (window.clearInterval($.np_clock), "function" == typeof $.nptxsso.InitPVANoST && (pt.plogin.auth(), window.console && console.log("延迟切换快速登录:" + t))) : t--
    },
    200)
},
$.guanjiaPlugin = null,
$.initGuanjiaPlugin = function() {
    try {
        window.ActiveXObject ? $.guanjiaPlugin = new ActiveXObject("npQMExtensionsIE.Basic") : navigator.mimeTypes["application/qqpcmgr-extensions-mozilla"] && ($.guanjiaPlugin = document.createElement("embed"), $.guanjiaPlugin.type = "application/qqpcmgr-extensions-mozilla", $.guanjiaPlugin.style.width = "0px", $.guanjiaPlugin.style.height = "0px", document.body.appendChild($.guanjiaPlugin));
        var t = $.guanjiaPlugin.QMGetVersion().split(".");
        4 == t.length && t[2] >= 9319 || ($.guanjiaPlugin = null)
    } catch(i) {
        $.guanjiaPlugin = null
    }
},
function() {
    var t = "nohost_guid",
    i = "/nohost_htdocs/js/SwitchHost.js";
    "" != $.cookie.get(t) && $.http.loadScript(i,
    function() {
        var t = window.SwitchHost && window.SwitchHost.init;
        t && t()
    })
} (),
setTimeout(function() {
    var t = "flag1=7808&flag2=1&flag3=9";
    $.report.setBasePoint(t, 0),
    "undefined" != typeof window.postMessage ? $.report.setSpeedPoint(t, 1, 2e3) : $.report.setSpeedPoint(t, 1, 1e3),
    $.report.isdSpeed(t, .01)
},
500),
$ = window.$ || {},
$pt = window.$pt || {},
$.RSA = $pt.RSA = function() {
    function t(t, i) {
        return new p(t, i)
    }
    function i(t, i) {
        if (i < t.length + 11) return uv_alert("Message too long for RSA"),
        null;
        for (var e = new Array,
        n = t.length - 1; n >= 0 && i > 0;) {
            var o = t.charCodeAt(n--);
            e[--i] = o
        }
        e[--i] = 0;
        for (var r = new Y,
        a = new Array; i > 2;) {
            for (a[0] = 0; 0 == a[0];) r.nextBytes(a);
            e[--i] = a[0]
        }
        return e[--i] = 2,
        e[--i] = 0,
        new p(e)
    }
    function e() {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
    }
    function n(i, e) {
        null != i && null != e && i.length > 0 && e.length > 0 ? (this.n = t(i, 16), this.e = parseInt(e, 16)) : uv_alert("Invalid RSA public key")
    }
    function o(t) {
        return t.modPowInt(this.e, this.n)
    }
    function r(t) {
        var e = i(t, this.n.bitLength() + 7 >> 3);
        if (null == e) return null;
        var n = this.doPublic(e);
        if (null == n) return null;
        var o = n.toString(16);
        return 0 == (1 & o.length) ? o: "0" + o
    }
    function p(t, i, e) {
        null != t && ("number" == typeof t ? this.fromNumber(t, i, e) : null == i && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, i))
    }
    function a() {
        return new p(null)
    }
    function s(t, i, e, n, o, r) {
        for (; --r >= 0;) {
            var p = i * this[t++] + e[n] + o;
            o = Math.floor(p / 67108864),
            e[n++] = 67108863 & p
        }
        return o
    }
    function l(t, i, e, n, o, r) {
        for (var p = 32767 & i,
        a = i >> 15; --r >= 0;) {
            var s = 32767 & this[t],
            l = this[t++] >> 15,
            c = a * s + l * p;
            s = p * s + ((32767 & c) << 15) + e[n] + (1073741823 & o),
            o = (s >>> 30) + (c >>> 15) + a * l + (o >>> 30),
            e[n++] = 1073741823 & s
        }
        return o
    }
    function c(t, i, e, n, o, r) {
        for (var p = 16383 & i,
        a = i >> 14; --r >= 0;) {
            var s = 16383 & this[t],
            l = this[t++] >> 14,
            c = a * s + l * p;
            s = p * s + ((16383 & c) << 14) + e[n] + o,
            o = (s >> 28) + (c >> 14) + a * l,
            e[n++] = 268435455 & s
        }
        return o
    }
    function u(t) {
        return ut.charAt(t)
    }
    function g(t, i) {
        var e = gt[t.charCodeAt(i)];
        return null == e ? -1 : e
    }
    function d(t) {
        for (var i = this.t - 1; i >= 0; --i) t[i] = this[i];
        t.t = this.t,
        t.s = this.s
    }
    function h(t) {
        this.t = 1,
        this.s = 0 > t ? -1 : 0,
        t > 0 ? this[0] = t: -1 > t ? this[0] = t + DV: this.t = 0
    }
    function m(t) {
        var i = a();
        return i.fromInt(t),
        i
    }
    function f(t, i) {
        var e;
        if (16 == i) e = 4;
        else if (8 == i) e = 3;
        else if (256 == i) e = 8;
        else if (2 == i) e = 1;
        else if (32 == i) e = 5;
        else {
            if (4 != i) return void this.fromRadix(t, i);
            e = 2
        }
        this.t = 0,
        this.s = 0;
        for (var n = t.length,
        o = !1,
        r = 0; --n >= 0;) {
            var a = 8 == e ? 255 & t[n] : g(t, n);
            0 > a ? "-" == t.charAt(n) && (o = !0) : (o = !1, 0 == r ? this[this.t++] = a: r + e > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - r) - 1) << r, this[this.t++] = a >> this.DB - r) : this[this.t - 1] |= a << r, r += e, r >= this.DB && (r -= this.DB))
        }
        8 == e && 0 != (128 & t[0]) && (this.s = -1, r > 0 && (this[this.t - 1] |= (1 << this.DB - r) - 1 << r)),
        this.clamp(),
        o && p.ZERO.subTo(this, this)
    }
    function _() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)--this.t
    }
    function v(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var i;
        if (16 == t) i = 4;
        else if (8 == t) i = 3;
        else if (2 == t) i = 1;
        else if (32 == t) i = 5;
        else {
            if (4 != t) return this.toRadix(t);
            i = 2
        }
        var e, n = (1 << i) - 1,
        o = !1,
        r = "",
        p = this.t,
        a = this.DB - p * this.DB % i;
        if (p-->0) for (a < this.DB && (e = this[p] >> a) > 0 && (o = !0, r = u(e)); p >= 0;) i > a ? (e = (this[p] & (1 << a) - 1) << i - a, e |= this[--p] >> (a += this.DB - i)) : (e = this[p] >> (a -= i) & n, 0 >= a && (a += this.DB, --p)),
        e > 0 && (o = !0),
        o && (r += u(e));
        return o ? r: "0"
    }
    function $() {
        var t = a();
        return p.ZERO.subTo(this, t),
        t
    }
    function w() {
        return this.s < 0 ? this.negate() : this
    }
    function y(t) {
        var i = this.s - t.s;
        if (0 != i) return i;
        var e = this.t;
        if (i = e - t.t, 0 != i) return i;
        for (; --e >= 0;) if (0 != (i = this[e] - t[e])) return i;
        return 0
    }
    function k(t) {
        var i, e = 1;
        return 0 != (i = t >>> 16) && (t = i, e += 16),
        0 != (i = t >> 8) && (t = i, e += 8),
        0 != (i = t >> 4) && (t = i, e += 4),
        0 != (i = t >> 2) && (t = i, e += 2),
        0 != (i = t >> 1) && (t = i, e += 1),
        e
    }
    function b() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + k(this[this.t - 1] ^ this.s & this.DM)
    }
    function q(t, i) {
        var e;
        for (e = this.t - 1; e >= 0; --e) i[e + t] = this[e];
        for (e = t - 1; e >= 0; --e) i[e] = 0;
        i.t = this.t + t,
        i.s = this.s
    }
    function S(t, i) {
        for (var e = t; e < this.t; ++e) i[e - t] = this[e];
        i.t = Math.max(this.t - t, 0),
        i.s = this.s
    }
    function C(t, i) {
        var e, n = t % this.DB,
        o = this.DB - n,
        r = (1 << o) - 1,
        p = Math.floor(t / this.DB),
        a = this.s << n & this.DM;
        for (e = this.t - 1; e >= 0; --e) i[e + p + 1] = this[e] >> o | a,
        a = (this[e] & r) << n;
        for (e = p - 1; e >= 0; --e) i[e] = 0;
        i[p] = a,
        i.t = this.t + p + 1,
        i.s = this.s,
        i.clamp()
    }
    function T(t, i) {
        i.s = this.s;
        var e = Math.floor(t / this.DB);
        if (e >= this.t) return void(i.t = 0);
        var n = t % this.DB,
        o = this.DB - n,
        r = (1 << n) - 1;
        i[0] = this[e] >> n;
        for (var p = e + 1; p < this.t; ++p) i[p - e - 1] |= (this[p] & r) << o,
        i[p - e] = this[p] >> n;
        n > 0 && (i[this.t - e - 1] |= (this.s & r) << o),
        i.t = this.t - e,
        i.clamp()
    }
    function x(t, i) {
        for (var e = 0,
        n = 0,
        o = Math.min(t.t, this.t); o > e;) n += this[e] - t[e],
        i[e++] = n & this.DM,
        n >>= this.DB;
        if (t.t < this.t) {
            for (n -= t.s; e < this.t;) n += this[e],
            i[e++] = n & this.DM,
            n >>= this.DB;
            n += this.s
        } else {
            for (n += this.s; e < t.t;) n -= t[e],
            i[e++] = n & this.DM,
            n >>= this.DB;
            n -= t.s
        }
        i.s = 0 > n ? -1 : 0,
        -1 > n ? i[e++] = this.DV + n: n > 0 && (i[e++] = n),
        i.t = e,
        i.clamp()
    }
    function A(t, i) {
        var e = this.abs(),
        n = t.abs(),
        o = e.t;
        for (i.t = o + n.t; --o >= 0;) i[o] = 0;
        for (o = 0; o < n.t; ++o) i[o + e.t] = e.am(0, n[o], i, o, 0, e.t);
        i.s = 0,
        i.clamp(),
        this.s != t.s && p.ZERO.subTo(i, i)
    }
    function E(t) {
        for (var i = this.abs(), e = t.t = 2 * i.t; --e >= 0;) t[e] = 0;
        for (e = 0; e < i.t - 1; ++e) {
            var n = i.am(e, i[e], t, 2 * e, 0, 1); (t[e + i.t] += i.am(e + 1, 2 * i[e], t, 2 * e + 1, n, i.t - e - 1)) >= i.DV && (t[e + i.t] -= i.DV, t[e + i.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += i.am(e, i[e], t, 2 * e, 0, 1)),
        t.s = 0,
        t.clamp()
    }
    function N(t, i, e) {
        var n = t.abs();
        if (! (n.t <= 0)) {
            var o = this.abs();
            if (o.t < n.t) return null != i && i.fromInt(0),
            void(null != e && this.copyTo(e));
            null == e && (e = a());
            var r = a(),
            s = this.s,
            l = t.s,
            c = this.DB - k(n[n.t - 1]);
            c > 0 ? (n.lShiftTo(c, r), o.lShiftTo(c, e)) : (n.copyTo(r), o.copyTo(e));
            var u = r.t,
            g = r[u - 1];
            if (0 != g) {
                var d = g * (1 << this.F1) + (u > 1 ? r[u - 2] >> this.F2: 0),
                h = this.FV / d,
                m = (1 << this.F1) / d,
                f = 1 << this.F2,
                _ = e.t,
                v = _ - u,
                $ = null == i ? a() : i;
                for (r.dlShiftTo(v, $), e.compareTo($) >= 0 && (e[e.t++] = 1, e.subTo($, e)), p.ONE.dlShiftTo(u, $), $.subTo(r, r); r.t < u;) r[r.t++] = 0;
                for (; --v >= 0;) {
                    var w = e[--_] == g ? this.DM: Math.floor(e[_] * h + (e[_ - 1] + f) * m);
                    if ((e[_] += r.am(0, w, e, v, 0, u)) < w) for (r.dlShiftTo(v, $), e.subTo($, e); e[_] < --w;) e.subTo($, e)
                }
                null != i && (e.drShiftTo(u, i), s != l && p.ZERO.subTo(i, i)),
                e.t = u,
                e.clamp(),
                c > 0 && e.rShiftTo(c, e),
                0 > s && p.ZERO.subTo(e, e)
            }
        }
    }
    function L(t) {
        var i = a();
        return this.abs().divRemTo(t, null, i),
        this.s < 0 && i.compareTo(p.ZERO) > 0 && t.subTo(i, i),
        i
    }
    function P(t) {
        this.m = t
    }
    function B(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }
    function Q(t) {
        return t
    }
    function D(t) {
        t.divRemTo(this.m, null, t)
    }
    function I(t, i, e) {
        t.multiplyTo(i, e),
        this.reduce(e)
    }
    function H(t, i) {
        t.squareTo(i),
        this.reduce(i)
    }
    function M() {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var i = 3 & t;
        return i = i * (2 - (15 & t) * i) & 15,
        i = i * (2 - (255 & t) * i) & 255,
        i = i * (2 - ((65535 & t) * i & 65535)) & 65535,
        i = i * (2 - t * i % this.DV) % this.DV,
        i > 0 ? this.DV - i: -i
    }
    function V(t) {
        this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << t.DB - 15) - 1,
        this.mt2 = 2 * t.t
    }
    function U(t) {
        var i = a();
        return t.abs().dlShiftTo(this.m.t, i),
        i.divRemTo(this.m, null, i),
        t.s < 0 && i.compareTo(p.ZERO) > 0 && this.m.subTo(i, i),
        i
    }
    function O(t) {
        var i = a();
        return t.copyTo(i),
        this.reduce(i),
        i
    }
    function j(t) {
        for (; t.t <= this.mt2;) t[t.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
            var e = 32767 & t[i],
            n = e * this.mpl + ((e * this.mph + (t[i] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (e = i + this.m.t, t[e] += this.m.am(0, n, t, i, 0, this.m.t); t[e] >= t.DV;) t[e] -= t.DV,
            t[++e]++
        }
        t.clamp(),
        t.drShiftTo(this.m.t, t),
        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }
    function R(t, i) {
        t.squareTo(i),
        this.reduce(i)
    }
    function F(t, i, e) {
        t.multiplyTo(i, e),
        this.reduce(e)
    }
    function z() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }
    function G(t, i) {
        if (t > 4294967295 || 1 > t) return p.ONE;
        var e = a(),
        n = a(),
        o = i.convert(this),
        r = k(t) - 1;
        for (o.copyTo(e); --r >= 0;) if (i.sqrTo(e, n), (t & 1 << r) > 0) i.mulTo(n, o, e);
        else {
            var s = e;
            e = n,
            n = s
        }
        return i.revert(e)
    }
    function X(t, i) {
        var e;
        return e = 256 > t || i.isEven() ? new P(i) : new V(i),
        this.exp(t, e)
    }
    function W(t) {
        ht[mt++] ^= 255 & t,
        ht[mt++] ^= t >> 8 & 255,
        ht[mt++] ^= t >> 16 & 255,
        ht[mt++] ^= t >> 24 & 255,
        mt >= vt && (mt -= vt)
    }
    function Z() {
        W((new Date).getTime())
    }
    function K() {
        if (null == dt) {
            for (Z(), dt = nt(), dt.init(ht), mt = 0; mt < ht.length; ++mt) ht[mt] = 0;
            mt = 0
        }
        return dt.next()
    }
    function J(t) {
        var i;
        for (i = 0; i < t.length; ++i) t[i] = K()
    }
    function Y() {}
    function tt() {
        this.i = 0,
        this.j = 0,
        this.S = new Array
    }
    function it(t) {
        var i, e, n;
        for (i = 0; 256 > i; ++i) this.S[i] = i;
        for (e = 0, i = 0; 256 > i; ++i) e = e + this.S[i] + t[i % t.length] & 255,
        n = this.S[i],
        this.S[i] = this.S[e],
        this.S[e] = n;
        this.i = 0,
        this.j = 0
    }
    function et() {
        var t;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
    }
    function nt() {
        return new tt
    }
    function ot(t, i, n) {
        i = "F20CE00BAE5361F8FA3AE9CEFA495362FF7DA1BA628F64A347F0A8C012BF0B254A30CD92ABFFE7A6EE0DC424CB6166F8819EFA5BCCB20EDFB4AD02E412CCF579B1CA711D55B8B0B3AEB60153D5E0693A2A86F3167D7847A0CB8B00004716A9095D9BADC977CBB804DBDCBA6029A9710869A453F27DFDDF83C016D928B3CBF4C7",
        n = "3";
        var o = new e;
        return o.setPublic(i, n),
        o.encrypt(t)
    }
    e.prototype.doPublic = o,
    e.prototype.setPublic = n,
    e.prototype.encrypt = r;
    var rt, pt = 0xdeadbeefcafe,
    at = 15715070 == (16777215 & pt);
    at && "Microsoft Internet Explorer" == navigator.appName ? (p.prototype.am = l, rt = 30) : at && "Netscape" != navigator.appName ? (p.prototype.am = s, rt = 26) : (p.prototype.am = c, rt = 28),
    p.prototype.DB = rt,
    p.prototype.DM = (1 << rt) - 1,
    p.prototype.DV = 1 << rt;
    var st = 52;
    p.prototype.FV = Math.pow(2, st),
    p.prototype.F1 = st - rt,
    p.prototype.F2 = 2 * rt - st;
    var lt, ct, ut = "0123456789abcdefghijklmnopqrstuvwxyz",
    gt = new Array;
    for (lt = "0".charCodeAt(0), ct = 0; 9 >= ct; ++ct) gt[lt++] = ct;
    for (lt = "a".charCodeAt(0), ct = 10; 36 > ct; ++ct) gt[lt++] = ct;
    for (lt = "A".charCodeAt(0), ct = 10; 36 > ct; ++ct) gt[lt++] = ct;
    P.prototype.convert = B,
    P.prototype.revert = Q,
    P.prototype.reduce = D,
    P.prototype.mulTo = I,
    P.prototype.sqrTo = H,
    V.prototype.convert = U,
    V.prototype.revert = O,
    V.prototype.reduce = j,
    V.prototype.mulTo = F,
    V.prototype.sqrTo = R,
    p.prototype.copyTo = d,
    p.prototype.fromInt = h,
    p.prototype.fromString = f,
    p.prototype.clamp = _,
    p.prototype.dlShiftTo = q,
    p.prototype.drShiftTo = S,
    p.prototype.lShiftTo = C,
    p.prototype.rShiftTo = T,
    p.prototype.subTo = x,
    p.prototype.multiplyTo = A,
    p.prototype.squareTo = E,
    p.prototype.divRemTo = N,
    p.prototype.invDigit = M,
    p.prototype.isEven = z,
    p.prototype.exp = G,
    p.prototype.toString = v,
    p.prototype.negate = $,
    p.prototype.abs = w,
    p.prototype.compareTo = y,
    p.prototype.bitLength = b,
    p.prototype.mod = L,
    p.prototype.modPowInt = X,
    p.ZERO = m(0),
    p.ONE = m(1);
    var dt, ht, mt;
    if (null == ht) {
        ht = new Array,
        mt = 0;
        var ft;
        if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
            var _t = window.crypto.random(32);
            for (ft = 0; ft < _t.length; ++ft) ht[mt++] = 255 & _t.charCodeAt(ft)
        }
        for (; vt > mt;) ft = Math.floor(65536 * Math.random()),
        ht[mt++] = ft >>> 8,
        ht[mt++] = 255 & ft;
        mt = 0,
        Z()
    }
    Y.prototype.nextBytes = J,
    tt.prototype.init = it,
    tt.prototype.next = et;
    var vt = 256;
    return {
        rsa_encrypt: ot
    }
} (),
function(t) {
    function i() {
        return Math.round(4294967295 * Math.random())
    }
    function e(t, i, e) { (!e || e > 4) && (e = 4);
        for (var n = 0,
        o = i; i + e > o; o++) n <<= 8,
        n |= t[o];
        return (4294967295 & n) >>> 0
    }
    function n(t, i, e) {
        t[i + 3] = e >> 0 & 255,
        t[i + 2] = e >> 8 & 255,
        t[i + 1] = e >> 16 & 255,
        t[i + 0] = e >> 24 & 255
    }
    function o(t) {
        if (!t) return "";
        for (var i = "",
        e = 0; e < t.length; e++) {
            var n = Number(t[e]).toString(16);
            1 == n.length && (n = "0" + n),
            i += n
        }
        return i
    }
    function r(t) {
        for (var i = "",
        e = 0; e < t.length; e += 2) i += String.fromCharCode(parseInt(t.substr(e, 2), 16));
        return i
    }
    function p(t, i) {
        if (!t) return "";
        i && (t = a(t));
        for (var e = [], n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
        return o(e)
    }
    function a(t) {
        var i, e, n = [],
        o = t.length;
        for (i = 0; o > i; i++) e = t.charCodeAt(i),
        e > 0 && 127 >= e ? n.push(t.charAt(i)) : e >= 128 && 2047 >= e ? n.push(String.fromCharCode(192 | e >> 6 & 31), String.fromCharCode(128 | 63 & e)) : e >= 2048 && 65535 >= e && n.push(String.fromCharCode(224 | e >> 12 & 15), String.fromCharCode(128 | e >> 6 & 63), String.fromCharCode(128 | 63 & e));
        return n.join("")
    }
    function s(t) {
        _ = new Array(8),
        v = new Array(8),
        $ = w = 0,
        b = !0,
        f = 0;
        var e = t.length,
        n = 0;
        f = (e + 10) % 8,
        0 != f && (f = 8 - f),
        y = new Array(e + f + 10),
        _[0] = 255 & (248 & i() | f);
        for (var o = 1; f >= o; o++) _[o] = 255 & i();
        f++;
        for (var o = 0; 8 > o; o++) v[o] = 0;
        for (n = 1; 2 >= n;) 8 > f && (_[f++] = 255 & i(), n++),
        8 == f && c();
        for (var o = 0; e > 0;) 8 > f && (_[f++] = t[o++], e--),
        8 == f && c();
        for (n = 1; 7 >= n;) 8 > f && (_[f++] = 0, n++),
        8 == f && c();
        return y
    }
    function l(t) {
        var i = 0,
        e = new Array(8),
        n = t.length;
        if (k = t, n % 8 != 0 || 16 > n) return null;
        if (v = g(t), f = 7 & v[0], i = n - f - 10, 0 > i) return null;
        for (var o = 0; o < e.length; o++) e[o] = 0;
        y = new Array(i),
        w = 0,
        $ = 8,
        f++;
        for (var r = 1; 2 >= r;) if (8 > f && (f++, r++), 8 == f && (e = t, !d())) return null;
        for (var o = 0; 0 != i;) if (8 > f && (y[o] = 255 & (e[w + f] ^ v[f]), o++, i--, f++), 8 == f && (e = t, w = $ - 8, !d())) return null;
        for (r = 1; 8 > r; r++) {
            if (8 > f) {
                if (0 != (e[w + f] ^ v[f])) return null;
                f++
            }
            if (8 == f && (e = t, w = $, !d())) return null
        }
        return y
    }
    function c() {
        for (var t = 0; 8 > t; t++) _[t] ^= b ? v[t] : y[w + t];
        for (var i = u(_), t = 0; 8 > t; t++) y[$ + t] = i[t] ^ v[t],
        v[t] = _[t];
        w = $,
        $ += 8,
        f = 0,
        b = !1
    }
    function u(t) {
        for (var i = 16,
        o = e(t, 0, 4), r = e(t, 4, 4), p = e(m, 0, 4), a = e(m, 4, 4), s = e(m, 8, 4), l = e(m, 12, 4), c = 0, u = 2654435769; i-->0;) c += u,
        c = (4294967295 & c) >>> 0,
        o += (r << 4) + p ^ r + c ^ (r >>> 5) + a,
        o = (4294967295 & o) >>> 0,
        r += (o << 4) + s ^ o + c ^ (o >>> 5) + l,
        r = (4294967295 & r) >>> 0;
        var g = new Array(8);
        return n(g, 0, o),
        n(g, 4, r),
        g
    }
    function g(t) {
        for (var i = 16,
        o = e(t, 0, 4), r = e(t, 4, 4), p = e(m, 0, 4), a = e(m, 4, 4), s = e(m, 8, 4), l = e(m, 12, 4), c = 3816266640, u = 2654435769; i-->0;) r -= (o << 4) + s ^ o + c ^ (o >>> 5) + l,
        r = (4294967295 & r) >>> 0,
        o -= (r << 4) + p ^ r + c ^ (r >>> 5) + a,
        o = (4294967295 & o) >>> 0,
        c -= u,
        c = (4294967295 & c) >>> 0;
        var g = new Array(8);
        return n(g, 0, o),
        n(g, 4, r),
        g
    }
    function d() {
        for (var t = (k.length, 0); 8 > t; t++) v[t] ^= k[$ + t];
        return v = g(v),
        $ += 8,
        f = 0,
        !0
    }
    function h(t, i) {
        var e = [];
        if (i) for (var n = 0; n < t.length; n++) e[n] = 255 & t.charCodeAt(n);
        else for (var o = 0,
        n = 0; n < t.length; n += 2) e[o++] = parseInt(t.substr(n, 2), 16);
        return e
    }
    var m = "",
    f = 0,
    _ = [],
    v = [],
    $ = 0,
    w = 0,
    y = [],
    k = [],
    b = !0;
    t.TEA = {
        encrypt: function(t, i) {
            var e = h(t, i),
            n = s(e);
            return o(n)
        },
        enAsBase64: function(t, i) {
            for (var e = h(t, i), n = s(e), o = "", r = 0; r < n.length; r++) o += String.fromCharCode(n[r]);
            return btoa(o)
        },
        decrypt: function(t) {
            var i = h(t, !1),
            e = l(i);
            return o(e)
        },
        initkey: function(t, i) {
            m = h(t, i)
        },
        bytesToStr: r,
        strToBytes: p,
        bytesInStr: o,
        dataFromStr: h
    };
    var q = {};
    q.PADCHAR = "=",
    q.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    q.getbyte = function(t, i) {
        var e = t.charCodeAt(i);
        if (e > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return e
    },
    q.encode = function(t) {
        if (1 != arguments.length) throw "SyntaxError: Not enough arguments";
        var i, e, n = q.PADCHAR,
        o = q.ALPHA,
        r = q.getbyte,
        p = [];
        t = "" + t;
        var a = t.length - t.length % 3;
        if (0 == t.length) return t;
        for (i = 0; a > i; i += 3) e = r(t, i) << 16 | r(t, i + 1) << 8 | r(t, i + 2),
        p.push(o.charAt(e >> 18)),
        p.push(o.charAt(e >> 12 & 63)),
        p.push(o.charAt(e >> 6 & 63)),
        p.push(o.charAt(63 & e));
        switch (t.length - a) {
        case 1:
            e = r(t, i) << 16,
            p.push(o.charAt(e >> 18) + o.charAt(e >> 12 & 63) + n + n);
            break;
        case 2:
            e = r(t, i) << 16 | r(t, i + 1) << 8,
            p.push(o.charAt(e >> 18) + o.charAt(e >> 12 & 63) + o.charAt(e >> 6 & 63) + n)
        }
        return p.join("")
    },
    window.btoa || (window.btoa = q.encode)
} (window),
$ = window.$ || {},
$pt = window.$pt || {},
$.Encryption = $pt.Encryption = function() {
    function md5(t) {
        return hex_md5(t)
    }
    function hex_md5(t) {
        return binl2hex(core_md5(str2binl(t), t.length * chrsz))
    }
    function str_md5(t) {
        return binl2str(core_md5(str2binl(t), t.length * chrsz))
    }
    function hex_hmac_md5(t, i) {
        return binl2hex(core_hmac_md5(t, i))
    }
    function b64_hmac_md5(t, i) {
        return binl2b64(core_hmac_md5(t, i))
    }
    function str_hmac_md5(t, i) {
        return binl2str(core_hmac_md5(t, i))
    }
    function core_md5(t, i) {
        t[i >> 5] |= 128 << i % 32,
        t[(i + 64 >>> 9 << 4) + 14] = i;
        for (var e = 1732584193,
        n = -271733879,
        o = -1732584194,
        r = 271733878,
        p = 0; p < t.length; p += 16) {
            var a = e,
            s = n,
            l = o,
            c = r;
            e = md5_ff(e, n, o, r, t[p + 0], 7, -680876936),
            r = md5_ff(r, e, n, o, t[p + 1], 12, -389564586),
            o = md5_ff(o, r, e, n, t[p + 2], 17, 606105819),
            n = md5_ff(n, o, r, e, t[p + 3], 22, -1044525330),
            e = md5_ff(e, n, o, r, t[p + 4], 7, -176418897),
            r = md5_ff(r, e, n, o, t[p + 5], 12, 1200080426),
            o = md5_ff(o, r, e, n, t[p + 6], 17, -1473231341),
            n = md5_ff(n, o, r, e, t[p + 7], 22, -45705983),
            e = md5_ff(e, n, o, r, t[p + 8], 7, 1770035416),
            r = md5_ff(r, e, n, o, t[p + 9], 12, -1958414417),
            o = md5_ff(o, r, e, n, t[p + 10], 17, -42063),
            n = md5_ff(n, o, r, e, t[p + 11], 22, -1990404162),
            e = md5_ff(e, n, o, r, t[p + 12], 7, 1804603682),
            r = md5_ff(r, e, n, o, t[p + 13], 12, -40341101),
            o = md5_ff(o, r, e, n, t[p + 14], 17, -1502002290),
            n = md5_ff(n, o, r, e, t[p + 15], 22, 1236535329),
            e = md5_gg(e, n, o, r, t[p + 1], 5, -165796510),
            r = md5_gg(r, e, n, o, t[p + 6], 9, -1069501632),
            o = md5_gg(o, r, e, n, t[p + 11], 14, 643717713),
            n = md5_gg(n, o, r, e, t[p + 0], 20, -373897302),
            e = md5_gg(e, n, o, r, t[p + 5], 5, -701558691),
            r = md5_gg(r, e, n, o, t[p + 10], 9, 38016083),
            o = md5_gg(o, r, e, n, t[p + 15], 14, -660478335),
            n = md5_gg(n, o, r, e, t[p + 4], 20, -405537848),
            e = md5_gg(e, n, o, r, t[p + 9], 5, 568446438),
            r = md5_gg(r, e, n, o, t[p + 14], 9, -1019803690),
            o = md5_gg(o, r, e, n, t[p + 3], 14, -187363961),
            n = md5_gg(n, o, r, e, t[p + 8], 20, 1163531501),
            e = md5_gg(e, n, o, r, t[p + 13], 5, -1444681467),
            r = md5_gg(r, e, n, o, t[p + 2], 9, -51403784),
            o = md5_gg(o, r, e, n, t[p + 7], 14, 1735328473),
            n = md5_gg(n, o, r, e, t[p + 12], 20, -1926607734),
            e = md5_hh(e, n, o, r, t[p + 5], 4, -378558),
            r = md5_hh(r, e, n, o, t[p + 8], 11, -2022574463),
            o = md5_hh(o, r, e, n, t[p + 11], 16, 1839030562),
            n = md5_hh(n, o, r, e, t[p + 14], 23, -35309556),
            e = md5_hh(e, n, o, r, t[p + 1], 4, -1530992060),
            r = md5_hh(r, e, n, o, t[p + 4], 11, 1272893353),
            o = md5_hh(o, r, e, n, t[p + 7], 16, -155497632),
            n = md5_hh(n, o, r, e, t[p + 10], 23, -1094730640),
            e = md5_hh(e, n, o, r, t[p + 13], 4, 681279174),
            r = md5_hh(r, e, n, o, t[p + 0], 11, -358537222),
            o = md5_hh(o, r, e, n, t[p + 3], 16, -722521979),
            n = md5_hh(n, o, r, e, t[p + 6], 23, 76029189),
            e = md5_hh(e, n, o, r, t[p + 9], 4, -640364487),
            r = md5_hh(r, e, n, o, t[p + 12], 11, -421815835),
            o = md5_hh(o, r, e, n, t[p + 15], 16, 530742520),
            n = md5_hh(n, o, r, e, t[p + 2], 23, -995338651),
            e = md5_ii(e, n, o, r, t[p + 0], 6, -198630844),
            r = md5_ii(r, e, n, o, t[p + 7], 10, 1126891415),
            o = md5_ii(o, r, e, n, t[p + 14], 15, -1416354905),
            n = md5_ii(n, o, r, e, t[p + 5], 21, -57434055),
            e = md5_ii(e, n, o, r, t[p + 12], 6, 1700485571),
            r = md5_ii(r, e, n, o, t[p + 3], 10, -1894986606),
            o = md5_ii(o, r, e, n, t[p + 10], 15, -1051523),
            n = md5_ii(n, o, r, e, t[p + 1], 21, -2054922799),
            e = md5_ii(e, n, o, r, t[p + 8], 6, 1873313359),
            r = md5_ii(r, e, n, o, t[p + 15], 10, -30611744),
            o = md5_ii(o, r, e, n, t[p + 6], 15, -1560198380),
            n = md5_ii(n, o, r, e, t[p + 13], 21, 1309151649),
            e = md5_ii(e, n, o, r, t[p + 4], 6, -145523070),
            r = md5_ii(r, e, n, o, t[p + 11], 10, -1120210379),
            o = md5_ii(o, r, e, n, t[p + 2], 15, 718787259),
            n = md5_ii(n, o, r, e, t[p + 9], 21, -343485551),
            e = safe_add(e, a),
            n = safe_add(n, s),
            o = safe_add(o, l),
            r = safe_add(r, c)
        }
        return 16 == mode ? Array(n, o) : Array(e, n, o, r)
    }
    function md5_cmn(t, i, e, n, o, r) {
        return safe_add(bit_rol(safe_add(safe_add(i, t), safe_add(n, r)), o), e)
    }
    function md5_ff(t, i, e, n, o, r, p) {
        return md5_cmn(i & e | ~i & n, t, i, o, r, p)
    }
    function md5_gg(t, i, e, n, o, r, p) {
        return md5_cmn(i & n | e & ~n, t, i, o, r, p)
    }
    function md5_hh(t, i, e, n, o, r, p) {
        return md5_cmn(i ^ e ^ n, t, i, o, r, p)
    }
    function md5_ii(t, i, e, n, o, r, p) {
        return md5_cmn(e ^ (i | ~n), t, i, o, r, p)
    }
    function core_hmac_md5(t, i) {
        var e = str2binl(t);
        e.length > 16 && (e = core_md5(e, t.length * chrsz));
        for (var n = Array(16), o = Array(16), r = 0; 16 > r; r++) n[r] = 909522486 ^ e[r],
        o[r] = 1549556828 ^ e[r];
        var p = core_md5(n.concat(str2binl(i)), 512 + i.length * chrsz);
        return core_md5(o.concat(p), 640)
    }
    function safe_add(t, i) {
        var e = (65535 & t) + (65535 & i),
        n = (t >> 16) + (i >> 16) + (e >> 16);
        return n << 16 | 65535 & e
    }
    function bit_rol(t, i) {
        return t << i | t >>> 32 - i
    }
    function str2binl(t) {
        for (var i = Array(), e = (1 << chrsz) - 1, n = 0; n < t.length * chrsz; n += chrsz) i[n >> 5] |= (t.charCodeAt(n / chrsz) & e) << n % 32;
        return i
    }
    function binl2str(t) {
        for (var i = "",
        e = (1 << chrsz) - 1, n = 0; n < 32 * t.length; n += chrsz) i += String.fromCharCode(t[n >> 5] >>> n % 32 & e);
        return i
    }
    function binl2hex(t) {
        for (var i = hexcase ? "0123456789ABCDEF": "0123456789abcdef", e = "", n = 0; n < 4 * t.length; n++) e += i.charAt(t[n >> 2] >> n % 4 * 8 + 4 & 15) + i.charAt(t[n >> 2] >> n % 4 * 8 & 15);
        return e
    }
    function binl2b64(t) {
        for (var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        e = "",
        n = 0; n < 4 * t.length; n += 3) for (var o = (t[n >> 2] >> 8 * (n % 4) & 255) << 16 | (t[n + 1 >> 2] >> 8 * ((n + 1) % 4) & 255) << 8 | t[n + 2 >> 2] >> 8 * ((n + 2) % 4) & 255, r = 0; 4 > r; r++) e += 8 * n + 6 * r > 32 * t.length ? b64pad: i.charAt(o >> 6 * (3 - r) & 63);
        return e
    }
    function hexchar2bin(str) {
        for (var arr = [], i = 0; i < str.length; i += 2) arr.push("\\x" + str.substr(i, 2));
        return arr = arr.join(""),
        eval("var temp = '" + arr + "'"),
        temp
    }
    function __monitor(t, i) {
        if (! (Math.random() > (i || 1))) try {
            var e = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t,
            n = document.createElement("img");
            n.src = e
        } catch(o) {}
    }
    function getEncryption(t, i, e, n) {
        e = e || "",
        t = t || "";
        for (var o = n ? t: md5(t), r = hexchar2bin(o), p = md5(r + i), a = $pt.RSA.rsa_encrypt(r), s = (a.length / 2).toString(16), l = TEA.strToBytes(e.toUpperCase(), !0), c = Number(l.length / 2).toString(16); c.length < 4;) c = "0" + c;
        for (; s.length < 4;) s = "0" + s;
        TEA.initkey(p);
        var u = TEA.enAsBase64(s + a + TEA.strToBytes(i) + c + l);
        return TEA.initkey(""),
        setTimeout(function() {
            __monitor(488358, 1)
        },
        0),
        u.replace(/[\/\+=]/g,
        function(t) {
            return {
                "/": "-",
                "+": "*",
                "=": "_"
            } [t]
        })
    }
    function getRSAEncryption(t, i, e) {
        var n = e ? t: md5(t),
        o = n + i.toUpperCase(),
        r = $.RSA.rsa_encrypt(o);
        return r
    }
    var hexcase = 1,
    b64pad = "",
    chrsz = 8,
    mode = 32;
    return {
        getEncryption: getEncryption,
        getRSAEncryption: getRSAEncryption,
        md5: md5
    }
} (),
pt.setHeader = function(t) {
    for (var i in t) if ("" != i) {
        var e = $("img_" + i);
        e ? e.src = t[i] && t[i].indexOf("sys.getface.qq.com") > -1 ? pt.plogin.dftImg: t[i] || pt.plogin.dftImg: $("auth_face").src = t[i] && t[i].indexOf("sys.getface.qq.com") > -1 ? pt.plogin.dftImg: t[i] || pt.plogin.dftImg
    }
},
pt.qlogin = function() {
    var t = {
        17 : 2,
        19 : 3,
        20 : 2,
        21 : 3,
        22 : 3,
        23 : 3,
        25 : 3,
        32 : 3,
        33 : 3,
        34 : 3
    },
    i = {
        17 : 240,
        19 : 300,
        20 : 240,
        21 : 360,
        22 : 360,
        23 : 300,
        25 : 300,
        32 : 360,
        33 : 300,
        34 : 300
    },
    e = 1,
    n = 2,
    o = 3,
    r = 4,
    p = [],
    a = [],
    s = 9,
    l = '<a hidefocus=true draggable=false href="javascript:void(0);" tabindex="#tabindex#" uin="#uin#" type="#type#" onclick="pt.qlogin.imgClick(this);return false;" onfocus="pt.qlogin.imgFocus(this);" onblur="pt.qlogin.imgBlur(this);" onmouseover="pt.qlogin.imgMouseover(this);" onmousedown="pt.qlogin.imgMouseDowm(this)" onmouseup="pt.qlogin.imgMouseUp(this)" onmouseout="pt.qlogin.imgMouseUp(this)" class="face"  >\r\n          <img  id="img_#uin#" uin="#uin#" type="#type#" src="#src#"    onerror="pt.qlogin.imgErr(this);" /> \r\n          <span id="mengban_#uin#"></span>\r\n          <span class="uin_menban"></span>\r\n          <span class="uin">#uin#</span>\r\n          <span id="img_out_#uin#" uin="#uin#" type="#type#"  class="img_out"  ></span>\r\n          <span id="nick_#uin#" class="#nick_class#">#nick#</span>\r\n          <span  class="#vip_logo#"></span>\r\n      </a>',
    c = !1,
    u = 1,
    g = t[pt.ptui.style],
    d = i[pt.ptui.style],
    h = 1,
    m = 5,
    f = null,
    _ = !0,
    v = 0,
    w = 0,
    y = [4300, 4302, 4304, 4306, 4308],
    k = [4301, 4303, 4305, 4307, 4309],
    b = 0,
    q = function(t) {
        function i() {
            $("qlogin_list").style.left = 1 == t ? a * r - h * o + "px": (2 - h) * o - a * r + "px",
            a++,
            a > p && window.clearInterval(e)
        }
        if (! (1 == t && 1 >= h || 2 == t && h >= u)) {
            var e = 0,
            n = 1,
            o = $("qlogin_show").offsetWidth || d,
            r = 10,
            p = Math.ceil(o / r),
            a = 0;
            1 == t ? (h--, 1 >= h ? ($.css.hide($("prePage")), $.css.show($("nextPage"))) : ($.css.show($("nextPage")), $.css.show($("prePage")))) : (h++, h >= u ? ($.css.hide($("nextPage")), $.css.show($("prePage"))) : ($.css.show($("nextPage")), $.css.show($("prePage")))),
            e = window.setInterval(i, n)
        }
    },
    S = function() {
        if (a.length = 0, $.suportActive()) try {
            var t = $.activetxsso,
            i = t.CreateTXSSOData();
            t.InitSSOFPTCtrl(0, i);
            var e = t.DoOperation(1, i);
            if (null == e) return;
            for (var o = e.GetArray("PTALIST"), r = o.GetSize(), p = 0; r > p; p++) {
                var l = o.GetData(p),
                c = l.GetDWord("dwSSO_Account_dwAccountUin"),
                u = l.GetDWord("dwSSO_Account_dwAccountUin"),
                g = "",
                d = l.GetByte("cSSO_Account_cAccountType"),
                h = c;
                if (1 == d) try {
                    g = l.GetArray("SSO_Account_AccountValueList"),
                    h = g.GetStr(0)
                } catch(m) {}
                var f = 0;
                try {
                    f = l.GetWord("wSSO_Account_wFaceIndex")
                } catch(m) {
                    f = 0
                }
                var _ = "";
                try {
                    _ = l.GetStr("strSSO_Account_strNickName")
                } catch(m) {
                    _ = ""
                }
                for (var v = l.GetBuf("bufST_PTLOGIN"), w = "", y = v.GetSize(), k = 0; y > k; k++) {
                    var b = v.GetAt(k).toString("16");
                    1 == b.length && (b = "0" + b),
                    w += b
                }
                var q = l.GetDWord("dwSSO_Account_dwUinFlag"),
                S = {
                    uin: c,
                    name: h,
                    uinString: u,
                    type: d,
                    face: f,
                    nick: _,
                    flag: q,
                    key: w,
                    loginType: n
                };
                a.push(S)
            }
        } catch(m) {
            T(),
            $.report.nlog("IE获取快速登录信息失败：" + m.message, "391626", .05)
        } else try {
            var C = $.nptxsso,
            x = C.InitPVA();
            if (0 != x) {
                for (var A = C.GetPVACount(), k = 0; A > k; k++) {
                    var S = {
                        uin: C.GetUin(k),
                        name: C.GetAccountName(k),
                        uinString: C.GetUinString(k),
                        type: 0,
                        face: C.GetFaceIndex(k),
                        nick: C.GetNickname(k) || C.GetUinString(k),
                        flag: C.GetUinFlag(k),
                        key: C.GetST(k),
                        loginType: n
                    };
                    a.push(S)
                }
                "function" == typeof C.GetKeyIndex && (s = C.GetKeyIndex())
            }
        } catch(m) {
            navigator.userAgent.match(/mac.*?safari/i) ? !window.chrome && pt.plogin.showAssistant(4) : T(),
            $.report.nlog("非IE获取快速登录信息失败：" + (m.message || m), "391627", .05)
        }
    },
    C = function(t) {
        for (var i = 0,
        e = a.length; e > i; i++) {
            var n = a[i];
            if (n.uinString == t) return n
        }
        return null
    },
    T = function() {
        if (0 != pt.ptui.enable_qlogin && ($.cookie.get("pt_local_token") || ($.cookie.set("pt_local_token", Math.random(), "ptlogin2." + pt.ptui.domain), $.cookie.get("pt_local_token")))) {
            var t = pt.ptui.isHttps ? k: y,
            i = pt.ptui.isHttps ? 80 : 50,
            e = "http" + (pt.ptui.isHttps ? "s": "") + "://localhost.ptlogin2." + pt.ptui.domain + ":[port]/pt_get_uins?callback=ptui_getuins_CB&r=" + Math.random() + "&pt_local_tk=" + $.cookie.get("pt_local_token"),
            n = 0;
            pt.qlogin.__getuinsClock = setTimeout(function() {
                return
            },
            20 * i),
            $.http.loadScript(e.replace("[port]", t[n++])),
            b = setInterval(function() {
                window.ptui_getuins_CB && ptui_getuins_CB.called && clearTimeout(pt.qlogin.__getuinsClock),
                n >= t.length || window.ptui_getuins_CB && ptui_getuins_CB.called ? clearInterval(b) : $.http.loadScript(e.replace("[port]", t[n++]))
            },
            i)
        }
    },
    x = function(t) {
        if (t) {
            pt.plogin.showLoading();
            var i = $.cookie.get("pt_local_token"),
            e = "http" + (pt.ptui.isHttps ? "s": "") + "://localhost.ptlogin2." + pt.ptui.domain + ":[port]/pt_get_st?clientuin=" + t + "&callback=ptui_getst_CB&r=" + Math.random() + "&pt_local_tk=" + i,
            n = pt.ptui.isHttps ? k: y,
            o = pt.ptui.isHttps ? 80 : 50,
            r = 0;
            ptui_getst_CB.submitUrl = B({
                uin: t,
                pt_local_tk: "{{hash_clientkey}}"
            }),
            $.http.loadScript(e.replace("[port]", n[r++])),
            b = setInterval(function() {
                r >= n.length || window.ptui_getst_CB && ptui_getst_CB.called ? clearInterval(b) : $.http.loadScript(e.replace("[port]", n[r++])),
                r >= n.length && (pt.qlogin.__getstClock = setTimeout(function() {
                    pt.plogin.hideLoading(),
                    ptui_qlogin_CB("-1234", "", "快速登录失败，请检查QQ客户端是否打开")
                },
                3e3))
            },
            o)
        }
    },
    A = function(t) {
        t ? a = [].concat(t) : S();
        var i = [],
        n = a.length;
        if (pt.plogin.isNewQr) {
            var r = {};
            r.loginType = o,
            i.push(r)
        }
        if (pt.plogin.authUin && "0" == pt.ptui.auth_mode) {
            var r = {};
            r.name = pt.plogin.authUin,
            r.uinString = pt.plogin.authUin,
            r.nick = $.str.utf8ToUincode($.cookie.get("ptnick_" + pt.plogin.authUin)) || pt.plogin.authUin,
            r.loginType = e,
            i.push(r)
        }
        for (var s = 0; n > s; s++) {
            var l = a[s];
            if ((!pt.plogin.authUin || pt.plogin.authUin != l.name && pt.plogin.authUin != l.uinString) && (i.push(l), 5 == i.length)) break
        }
        return p = i,
        i
    },
    E = function(t) {
        var i = "",
        p = A(t),
        a = $("qlogin_list");
        if (null != a) {
            if (t) {
                var s = $("qr_area");
                s && a.removeChild(s),
                a.innerHTML = "",
                s && a.appendChild(s)
            }
            var c = p.length > m ? m: p.length;
            if (0 == c) return void pt.plogin.switchpage(1, !0);
            for (var h = 0; h < p.length; h++)(p[h].loginType == r || p[h].loginType == n) && (pt.qlogin.hasBuildQlogin = !0);
            pt.plogin.isNewQr && (1 == c && pt.plogin.isNewQr ? ($("qlogin_tips") && $.css.hide($("qlogin_tips")), $("qlogin_show").style.top = "25px") : ($("qlogin_tips") && $.css.show($("qlogin_tips")), $("qlogin_show").style.top = "")),
            u = Math.ceil(c / g),
            u >= 2 && $.css.show($("nextPage"));
            for (var f = 0; c > f; f++) {
                var _ = p[f],
                v = $.str.encodeHtml(_.uinString + ""),
                w = $.str.encodeHtml(_.nick);
                "" == $.str.trim(_.nick) && (w = v);
                var y = _.flag,
                k = 4 == (4 & y),
                b = pt.plogin.dftImg;
                if (_.loginType == o) {
                    var s = $("qr_area");
                    1 == c ? (s && ($("qr_area").className = "qr_0"), "1033" == pt.ptui.lang && ($("qlogin_show").style.height = $("qlogin_show").offsetHeight + 10 + "px")) : s && ($("qr_area").className = "qr_1")
                } else i += l.replace(/#uin#/g, v).replace(/#nick#/g,
                function() {
                    return w
                }).replace(/#nick_class#/, k ? "nick red": "nick").replace(/#vip_logo#/, k ? "vip_logo": "").replace(/#type#/g, _.loginType).replace(/#src#/g, b).replace(/#tabindex#/, f + 1).replace(/#class#/g, _.loginType == e ? "auth": "hide")
            }
            i = a.innerHTML + i,
            a.innerHTML = i;
            var q = $("qlogin_show").offsetWidth || d,
            S = 1 == u ? q: q / g * c;
            a.style.width = S + "px",
            pt.plogin.isNewQr && (a.style.width = S + 4 + "px"),
            R(),
            F()
        }
    },
    N = function(t) {
        if (t) {
            S();
            var i = C(t);
            if (null == i) pt.plogin.show_err(pt.str.qlogin_expire),
            $.report.monitor(231544, 1);
            else {
                var e = B(i);
                _ ? $.http.loadScript(e) : pt.plogin.redirect(pt.ptui.target, e),
                pt.plogin.showLoading(),
                window.clearTimeout(pt.qlogin.__getstClock),
                pt.qlogin.__getstClock = window.setTimeout("pt.plogin.hideLoading();pt.plogin.showAssistant(0);", 1e4)
            }
        }
    },
    L = function(t, i, e) {
        var n = t.split("#"),
        o = n[0].indexOf("?") > 0 ? "&": "?";
        return "?" == n[0].substr(n[0].length - 1, 1) && (o = ""),
        n[1] = n[1] ? "#" + n[1] : "",
        n[0] + o + i + "=" + e + n[1]
    },
    P = function(t) {
        var i = pt.ptui.s_url;
        return 1 == pt.ptui.low_login && pt.plogin.low_login_enable && pt.plogin.isMailLogin && (i = L(i, "ss", 1)),
        pt.plogin.isMailLogin && t && (i = L(i, "account", encodeURIComponent(t))),
        i
    },
    B = function(t) {
        var i = pt.ptui.isHttps ? "https://ssl.ptlogin2.": "http://ptlogin2.",
        e = i + pt.ptui.domain + "/" + (pt.ptui.jumpname || "jump") + "?";
        return 2 == pt.ptui.regmaster ? e = "http://ptlogin2.function.qq.com/jump?regmaster=2&": 3 == pt.ptui.regmaster ? e = "http://ptlogin2.crm2.qq.com/jump?regmaster=3&": 4 == pt.ptui.regmaster ? e = "https://ssl.ptlogin2.mail.qq.com/jump?regmaster=4&": 5 == pt.ptui.regmaster && (e = i + "mp.qq.com/jump?regmaster=5&"),
        e += "clientuin=" + t.uin + "&keyindex=" + s + "&pt_aid=" + pt.ptui.appid + (pt.ptui.daid ? "&daid=" + pt.ptui.daid: "") + "&u1=" + encodeURIComponent(P()),
        e += "undefined" != typeof t.key ? "&clientkey=" + t.key: "&pt_local_tk=" + t.pt_local_tk,
        1 == pt.ptui.low_login && pt.plogin.low_login_enable && !pt.plogin.isMailLogin && (e += "&low_login_enable=1&low_login_hour=" + pt.plogin.low_login_hour),
        "0" != pt.ptui.csimc && pt.ptui.csimc && (e += "&csimc=" + pt.ptui.csimc + "&csnum=" + pt.ptui.csnum + "&authid=" + pt.ptui.authid),
        "1" == pt.ptui.pt_qzone_sig && (e += "&pt_qzone_sig=1"),
        "1" == pt.ptui.pt_light && (e += "&pt_light=1"),
        pt.ptui.pt_3rd_aid && (e += "&pt_3rd_aid=" + pt.ptui.pt_3rd_aid),
        _ && (e += "&ptopt=1"),
        e += "&style=" + pt.ptui.style
    },
    Q = function() {
        var t = D();
        pt.plogin.redirect(pt.ptui.target, t),
        pt.plogin.showLoading()
    },
    D = function() {
        var t = pt.plogin.authSubmitUrl;
        return t += "&regmaster=" + pt.ptui.regmaster + "&aid=" + pt.ptui.appid + "&s_url=" + encodeURIComponent(P()),
        1 == pt.ptui.low_login && pt.plogin.low_login_enable && (t += "&low_login_enable=1&low_login_hour=" + pt.plogin.low_login_hour),
        "1" == pt.ptui.pt_light && (t += "&pt_light=1"),
        t
    },
    I = function(t) {
        return t.onerror = null,
        t.src != pt.plogin.dftImg && (t.src = pt.plogin.dftImg),
        !1
    },
    H = function(t) {
        var i = parseInt(t.getAttribute("type")),
        o = t.getAttribute("uin");
        switch (i) {
        case e:
            Q();
            break;
        case n:
            N(o);
            break;
        case r:
            x(o)
        }
    },
    M = function(t) {
        if (t) {
            var i = t.getAttribute("uin");
            i && ($("img_out_" + i).className = "img_out_focus")
        }
    },
    V = function(t) {
        if (t) {
            var i = t.getAttribute("uin");
            i && ($("img_out_" + i).className = "img_out")
        }
    },
    U = function(t) {
        t && (f != t && (V(f), f = t), M(t))
    },
    O = function(t) {
        if (t) {
            var i = t.getAttribute("uin"),
            e = $("mengban_" + i);
            e && (e.className = "face_mengban")
        }
    },
    j = function(t) {
        if (t) {
            var i = t.getAttribute("uin"),
            e = $("mengban_" + i);
            e && (e.className = "")
        }
    },
    R = function() {
        var t = $("qlogin_list"),
        i = t.getElementsByTagName("a");
        i.length > 0 && (f = i[0])
    },
    F = function() {
        try {
            f.focus()
        } catch(t) {}
    },
    z = function() {
        var t = $("prePage"),
        i = $("nextPage");
        t && $.e.add(t, "click",
        function() {
            q(1)
        }),
        i && $.e.add(i, "click",
        function() {
            q(2)
        })
    },
    G = function() {
        for (var t = p.length,
        i = 0; t > i; i++) p[i].uinString && $.http.loadScript((pt.ptui.isHttps ? "https://ssl.ptlogin2.": "http://ptlogin2.") + pt.ptui.domain + "/getface?appid=" + pt.ptui.appid + "&imgtype=3&encrytype=0&devtype=0&keytpye=0&uin=" + p[i].uinString + "&r=" + Math.random())
    },
    X = function() {
        z(),
        setTimeout(function() {
            $.report.monitor(492804, .05)
        },
        0)
    };
    return X(),
    {
        qloginInit: X,
        hasBuildQlogin: c,
        buildQloginList: E,
        imgClick: H,
        imgFocus: M,
        imgBlur: V,
        imgMouseover: U,
        imgMouseDowm: O,
        imgMouseUp: j,
        imgErr: I,
        focusHeader: F,
        initFace: G,
        authLoginSubmit: Q,
        __getstClock: v,
        __getuinsClock: w,
        getSurl: P,
        PCSvrQlogin: r
    }
} (),
pt.LoginState = {
    PLogin: 1,
    QLogin: 2
},
pt.plogin = {
    account: "",
    at_account: "",
    uin: "",
    salt: "",
    hasCheck: !1,
    lastCheckAccount: "",
    needVc: !1,
    vcFlag: !1,
    ckNum: {},
    action: [0, 0],
    passwordErrorNum: 1,
    isIpad: !1,
    t_appid: 46000101,
    seller_id: 703010802,
    checkUrl: "",
    loginUrl: "",
    verifycodeUrl: "",
    newVerifycodeUrl: "",
    needShowNewVc: !1,
    pt_verifysession: "",
    checkClock: 0,
    isCheckTimeout: !1,
    cntCheckTimeout: 0,
    checkTime: 0,
    submitTime: 0,
    errclock: 0,
    loginClock: 0,
    login_param: pt.ptui.href.substring(pt.ptui.href.indexOf("?") + 1),
    err_m: $("err_m"),
    low_login_enable: !0,
    low_login_hour: 720,
    low_login_isshow: !1,
    list_index: [ - 1, 2],
    keyCode: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ENTER: 13,
        TAB: 9,
        BACK: 8,
        DEL: 46,
        F5: 116
    },
    knownEmail: 25 == pt.ptui.style ? ["qq.com", "vip.qq.com", "foxmail.com"] : ["qq.com", "foxmail.com", "gmail.com", "hotmail.com", "yahoo.com", "sina.com", "163.com", "126.com", "vip.qq.com", "vip.sina.com", "sina.cn", "sohu.com", "yahoo.cn", "yahoo.com.cn", "139.com", "wo.com.cn", "189.cn", "live.com", "msn.com", "live.hk", "live.cn", "hotmail.com.cn", "hinet.net", "msa.hinet.net", "cm1.hinet.net", "umail.hinet.net", "xuite.net", "yam.com", "pchome.com.tw", "netvigator.com", "seed.net.tw", "anet.net.tw"],
    qrlogin_clock: 0,
    qrlogin_timeout: 0,
    qrlogin_timeout_time: 1e5,
    qrlogin_invalid: !1,
    isQrLogin: !1,
    qr_uin: "",
    qr_nick: "",
    onekey_verify_timeout: 36e5,
    onekeyVerifyClock: 0,
    dftImg: "",
    need_hide_operate_tips: !0,
    js_type: 1,
    xuiState: 1,
    delayTime: 5e3,
    delayMonitorId: "294059",
    hasSubmit: !1,
    isdTime: {},
    authUin: "",
    authSubmitUrl: "",
    loginState: pt.LoginState.PLogin,
    aqScanLink: "<a href='javascript:void(0)'; onclick='pt.plogin.switch_qrlogin()'>" + ("2052" == pt.ptui.lang ? "立即扫描": "1028" == pt.ptui.lang ? "立即掃描": "Scan now") + "</a>",
    isNewQr: !1,
    hasNoQlogin: !1,
    checkRet: -1,
    cap_cd: 0,
    authTimes: 0,
    checkErr: {
        2052 : "网络繁忙，请稍后重试。",
        1028 : "網絡繁忙，請稍後重試。",
        1033 : "The network is busy, please try again later."
    },
    isTenpay: 34 == pt.ptui.style,
    isMailLogin: 25 == pt.ptui.style || 30 == pt.ptui.style,
    switchpageCount: 0,
    domFocus: function(t) {
        try {
            window.setTimeout(function() {
                t.focus()
            },
            0)
        } catch(i) {}
    },
    formFocus: function() {
        var t = document.loginform;
        try {
            var i = t.u,
            e = t.p,
            n = t.verifycode;
            if ("" == i.value) return void i.focus();
            if ("" == e.value) return void e.focus();
            "" == n.value && n.focus()
        } catch(o) {}
    },
    getAuthUrl: function() {
        var t = (pt.ptui.isHttps ? "https://ssl.": "http://") + "ptlogin2." + pt.ptui.domain + "/pt4_auth?daid=" + pt.ptui.daid + "&appid=" + pt.ptui.appid + "&auth_token=" + $.str.time33($.cookie.get("supertoken")),
        i = pt.ptui.s_url;
        return /^https/.test(i) && (t += "&pt4_shttps=1"),
        "1" == pt.ptui.pt_qzone_sig && (t += "&pt_qzone_sig=1"),
        t
    },
    auth: function() {
        pt.plogin.authTimes++,
        pt.ptui.isHttps = $.check.isHttps();
        var t = pt.plogin.getAuthUrl(),
        i = $.cookie.get("superuin");
        pt.ptui.daid && "1" != pt.ptui.noAuth && "" != i && 4 != pt.ptui.regmaster && 5 != pt.ptui.regmaster ? $.http.loadScript(t) : pt.plogin.init()
    },
    initAuthInfo: function(t) {
        var i = $.cookie.get("uin").replace(/^o0*/, ""),
        e = $.str.utf8ToUincode($.cookie.get("ptnick_" + i)) || i;
        $("auth_uin").innerHTML = $.str.encodeHtml(i),
        $("auth_nick").innerHTML = $.str.encodeHtml(e),
        $("auth_area").setAttribute("authUrl", $.str.encodeHtml(t)),
        $.http.loadScript((pt.ptui.isHttps ? "https://ssl.ptlogin2.": "http://ptlogin2.") + pt.ptui.domain + "/getface?appid=" + pt.ptui.appid + "&imgtype=3&encrytype=0&devtype=0&keytpye=0&uin=" + i + "&r=" + Math.random())
    },
    showAuth: function(t, i) {
        2 == t && $.css.hide($("cancleAuthOuter")),
        pt.plogin.initAuthInfo(i);
        var e = pt.ptui.style; (22 == e || 23 == e) && ($.css.hide($("header")), $.css.hide($("authHeader"))),
        $("authLogin").style.height = $("login").offsetHeight - (11 == e ? 2 : 4) + "px",
        $.css.show($("authLogin")),
        pt.plogin.ptui_notifySize("login")
    },
    cancleAuth: function() {
        var t = pt.ptui.style; (22 == t || 23 == t) && ($.css.show($("header")), $.css.show($("authHeader"))),
        $.css.hide($("authLogin")),
        pt.plogin.ptui_notifySize("login")
    },
    authLogin: function() {
        pt.qlogin.authLoginSubmit()
    },
    authMouseDowm: function() {
        var t = $("auth_mengban");
        t && (t.className = "face_mengban")
    },
    authMouseUp: function() {
        var t = $("auth_mengban");
        t && (t.className = "")
    },
    onQloginSwitch: function(t) {
        t.preventDefault(),
        pt.plogin.switchpage(pt.LoginState.QLogin),
        $.report.monitor("331284", .05)
    },
    initQlogin: function(t, i) {
        t = t || pt.plogin.initQlogin.url,
        pt.plogin.initQlogin.url = t;
        var e = 0,
        n = !1;
        if (t && 0 == pt.ptui.auth_mode && (n = !0), i || 0 == pt.ptui.enable_qlogin || 5 == $.cookie.get("pt_qlogincode") || (e = $.getLoginQQNum()), e += n ? 1 : 0, e += i ? i.length: 0, pt.plogin.hasNoQlogin = 0 == e ? !0 : !1, $("switcher_plogin").innerHTML = pt.plogin.isTenpay ? pt.str.otherqq_login: pt.str.h_pt_login, e > 0 || pt.plogin.isNewQr ? ($("login").className = "login", pt.plogin.switchpage(0 == e && (pt.plogin.isMailLogin || pt.plogin.isTenpay) ? pt.LoginState.PLogin: pt.LoginState.QLogin)) : (pt.plogin.switchpage(pt.LoginState.PLogin), $("login").className = "login_no_qlogin", $("u").value && 0 == pt.ptui.auth_mode && pt.plogin.check()), pt.qlogin.hasBuildQlogin || pt.qlogin.buildQloginList(i), 0 != pt.ptui.auth_mode && t && pt.plogin.showAuth(pt.ptui.auth_mode, t), 0 == pt.ptui.enable_qlogin && 0 == $.sso_ver) try {
            if ($.suportActive()) {
                var o = new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2").QuerySSOInfo(1);
                $.sso_ver = o.GetInt("nSSOVersion")
            } else $.nptxsso || ($.nptxsso = document.createElement("embed"), $.nptxsso.type = "application/nptxsso", $.nptxsso.style.width = "0px", $.nptxsso.style.height = "0px", document.body.appendChild($.nptxsso)),
            $.sso_ver = $.nptxsso.GetSSOVersion(),
            document.body.removeChild($.nptxsso),
            $.nptxsso = null
        } catch(r) {
            $.sso_ver = 0
        }
    },
    switchpage: function(t, i) {
        pt.plogin.switchpageCount++;
        var e, n;
        switch (pt.plogin.loginState = t, i || pt.plogin.hide_err(), t) {
        case 1:
            $.css.hide($("bottom_qlogin")),
            $.css.hide($("qlogin")),
            $.css.show($("web_qr_login")),
            $("qrswitch") && $.css.show($("qrswitch")),
            $("switcher_plogin").className = "switch_btn_focus",
            $("switcher_qlogin").className = "switch_btn",
            n = $("switcher_plogin").offsetWidth,
            e = $("switcher_plogin").parentNode.offsetWidth - n,
            "ff" != $.browser("type") && window.setTimeout(function() {
                pt.plogin.formFocus()
            },
            0),
            pt.plogin.isNewQr && pt.plogin.cancle_qrlogin(),
            pt.plogin.armSafeEdit && pt.plogin.armSafeEdit.everSafe && (pt.plogin.armSafeEdit.lockToggle(), pt.plogin.armSafeEdit.everSafe = !1),
            0 != pt.plogin.onekeyVerifyClock && pt.plogin.onekeyVerify("normal");
            break;
        case 2:
            $.css.hide($("web_qr_login")),
            $.css.show($("qlogin")),
            $("switcher_plogin").className = "switch_btn",
            $("switcher_qlogin").className = "switch_btn_focus",
            $("qrswitch") && $.css.hide($("qrswitch")),
            $.css.show($("bottom_qlogin")),
            pt.qlogin.focusHeader(),
            e = 0,
            n = $("switcher_qlogin").offsetWidth,
            pt.plogin.isNewQr && pt.plogin.begin_qrlogin(),
            pt.plogin.armSafeEdit.isSafe && (pt.plogin.armSafeEdit.lockToggle(), pt.plogin.armSafeEdit.everSafe = !0)
        }
        window.setTimeout(function() {
            try {
                1 == pt.plogin.switchpageCount ? ($("switch_bottom").style.left = e + "px", $("switch_bottom").style.width = n + "px") : $.animate.animate("switch_bottom", {
                    left: e,
                    width: n
                },
                80, 20)
            } catch(t) {
                $("switch_bottom").style.left = e + "px",
                $("switch_bottom").style.width = n + "px"
            }
        },
        100),
        pt.plogin.ptui_notifySize("login")
    },
    detectCapsLock: function(t) {
        var i = t.keyCode || t.which,
        e = t.shiftKey || 16 == i || !1;
        return i >= 65 && 90 >= i && !e || i >= 97 && 122 >= i && e ? !0 : !1
    },
    generateEmailTips: function(t) {
        var i = t.indexOf("@"),
        e = "";
        e = -1 == i ? t: t.substring(0, i);
        for (var n = [], o = 0, r = pt.plogin.knownEmail.length; r > o; o++) n.push(e + "@" + pt.plogin.knownEmail[o]);
        for (var p = [], a = 0, r = n.length; r > a; a++) n[a].indexOf(t) > -1 && p.push($.str.encodeHtml(n[a]));
        return 19 == pt.ptui.style && (p = []),
        p
    },
    createEmailTips: function(t) {
        var i = pt.plogin.generateEmailTips(t),
        e = i.length,
        n = [],
        o = "",
        r = 4;
        if (e = Math.min(e, r), 0 == e) return pt.plogin.list_index[0] = -1,
        void pt.plogin.hideEmailTips();
        for (var p = 0; e > p; p++) {
            if (t == i[p]) return void pt.plogin.hideEmailTips();
            o = "emailTips_" + p,
            n.push(0 == p ? "<li id=" + o + " class='hover' >" + i[p] + "</li>": "<li id=" + o + ">" + i[p] + "</li>")
        }
        $("email_list").innerHTML = n.join(" "),
        pt.plogin.list_index[0] = 0
    },
    showEmailTips: function() {
        $.css.show($("email_list")),
        pt.plogin.__isShowEmailTips = !0
    },
    hideEmailTips: function() {
        $.css.hide($("email_list")),
        pt.plogin.__isShowEmailTips = !1
    },
    setUrl: function() {
        var t = pt.ptui.domain,
        i = $.check.isHttps() && $.check.isSsl();
        pt.plogin.checkUrl = (pt.ptui.isHttps ? "https://ssl.": "http://check.") + "ptlogin2." + t + "/check",
        pt.plogin.loginUrl = (pt.ptui.isHttps ? "https://ssl.": "http://") + "ptlogin2." + t + "/",
        pt.plogin.verifycodeUrl = (pt.ptui.isHttps ? "https://ssl.": "http://") + "captcha." + t + "/getimage",
        pt.plogin.newVerifycodeUrl = (pt.ptui.isHttps ? "https://ssl.": "http://") + "captcha.qq.com/cap_union_show?clientype=2",
        i && "qq.com" != t && "tenpay.com" != t && (pt.plogin.verifycodeUrl = "https://ssl.ptlogin2." + t + "/ptgetimage");
        var e = pt.ptui.isHttps ? "https://ssl.": "http://",
        n = pt.ptui.isHttps ? "https://ssl.": "http://check.";
        2 == pt.ptui.regmaster ? (pt.plogin.checkUrl = "http://check.ptlogin2.function.qq.com/check", pt.plogin.loginUrl = "http://ptlogin2.function.qq.com/") : 3 == pt.ptui.regmaster ? (pt.plogin.checkUrl = n + "ptlogin2.crm2.qq.com/check", pt.plogin.loginUrl = e + "ptlogin2.crm2.qq.com/") : 4 == pt.ptui.regmaster ? (pt.plogin.checkUrl = "https://ssl.ptlogin2.mail.qq.com/check", pt.plogin.loginUrl = "https://ssl.ptlogin2.mail.qq.com/") : 5 == pt.ptui.regmaster && (pt.plogin.checkUrl = n + "ptlogin2.mp.qq.com/check", pt.plogin.loginUrl = e + "ptlogin2.mp.qq.com/"),
        pt.plogin.dftImg = pt.ptui.isHttps ? "https://ui.ptlogin2.qq.com/style/0/images/1.gif": "http://imgcache.qq.com/ptlogin/v4/style/0/images/1.gif"
    },
    init: function(t) {
        pt.ptui.login_sig = pt.ptui.login_sig || $.cookie.get("pt_login_sig"),
        pt.plogin.setLowloginCheckbox(),
        pt.plogin.isNewQr = 25 == pt.ptui.style || 32 == pt.ptui.style || 33 == pt.ptui.style || pt.plogin.isTenpay ? !0 : !1,
        pt.ptui.isHttps = $.check.isHttps(),
        pt.plogin.setUrl(),
        pt.plogin.bindEvent(),
        $("login_button") && ($("login_button").disabled = !1),
        pt.plogin.set_default_uin(pt.ptui.defaultUin),
        pt.plogin.isTenpay && pt.ptui.defaultUin && (pt.ptui.lockuin = 1),
        $.check.is_weibo_appid(pt.ptui.appid) && $("u") && ($("u").style.imeMode = "auto"),
        pt.ptui.isHttps && (pt.plogin.delayTime = 7e3, pt.plogin.delayMonitorId = "294060"),
        pt.plogin.hideVipLink(),
        pt.ptui.lockuin ? pt.plogin.doLockuin() : pt.plogin.initQlogin(t),
        !(pt.plogin.isTenpay && $.sso_ver >= 1093) || pt.plogin.isWin8() && $.suportActive() || pt.plogin.armSafeEdit(),
        window.setTimeout(function() {
            pt.plogin.domLoad()
        },
        100)
    },
    isWin8: function() {
        var t = navigator.userAgent.toLowerCase();
        return t.indexOf("windows nt 6.2") > -1 || t.indexOf("windows nt 6.3") > -1 ? !0 : !1
    },
    aq_patch: function() {
        Math.random() < .05 && !pt.ptui.isHttps && $.http.loadScript("http://mat1.gtimg.com/www/js/common_v2.js",
        function() {
            if ("function" == typeof checkNonTxDomain) try {
                checkNonTxDomain(1, 5)
            } catch(t) {}
        })
    },
    hideVipLink: function() {
        var t = $("vip_link2"),
        i = $("vip_dot"); ! t || !i || $.check.needVip(pt.ptui.appid) && "2052" == pt.ptui.lang || ($.css.addClass(t, "hide"), $.css.addClass(i, "hide"))
    },
    set_default_uin: function(t) {
        "0" != t && (t || (t = unescape($.cookie.getOrigin("ptui_loginuin")), pt.ptui.appid != pt.plogin.t_appid && ($.check.isNick(t) || $.check.isName(t)) && (t = $.cookie.get("pt2gguin").replace(/^o/, "") - 0, t = 0 == t ? "": t)), $("u").value = t, t && ($.css.hide($("uin_tips")), $("uin_del") && $.css.show($("uin_del")), pt.plogin.set_account()))
    },
    doLockuin: function() {
        pt.plogin.switchpage(pt.LoginState.PLogin, !0),
        $("u").readOnly = !0;
        var t = $("uinArea");
        $.css.hasClass(t, "default") || $.css.addClass(t, "default");
        var i = $("uin_del");
        i && i.parentNode.removeChild(i),
        $.e.remove($("switcher_qlogin"), "click", pt.plogin.onQloginSwitch),
        $("switcher_qlogin").className = "switch_btn_disabled",
        $("p").focus()
    },
    set_account: function() {
        var t = $.str.trim($("u").value),
        i = pt.ptui.appid;
        if (pt.plogin.account = t, pt.plogin.at_account = t, $.check.isQiyeQQ800(t)) return pt.plogin.at_account = "@" + t,
        !0;
        if ($.check.is_weibo_appid(i)) {
            if ($.check.isQQ(t) || $.check.isMail(t)) return ! 0;
            if ($.check.isNick(t) || $.check.isName(t)) return pt.plogin.at_account = "@" + t,
            !0;
            if ($.check.isPhone(t)) return pt.plogin.at_account = "@" + t.replace(/^(86|886)/, ""),
            !0;
            if ($.check.isSeaPhone(t)) return pt.plogin.at_account = "@00" + t.replace(/^(00)/, ""),
            /^(@0088609)/.test(pt.plogin.at_account) && (pt.plogin.at_account = pt.plogin.at_account.replace(/^(@0088609)/, "@008869")),
            !0
        } else {
            if ($.check.isQQ(t) || $.check.isMail(t)) return ! 0;
            if ($.check.isPhone(t)) return pt.plogin.at_account = "@" + t.replace(/^(86|886)/, ""),
            !0;
            if ($.check.isNick(t)) return $("u").value = t + "@qq.com",
            pt.plogin.account = t + "@qq.com",
            pt.plogin.at_account = t + "@qq.com",
            !0
        }
        return $.check.isForeignPhone(t) && (pt.plogin.at_account = "@" + t),
        !0
    },
    show_err: function(t, i) {
        pt.plogin.hideLoading(),
        $.css.show($("error_tips")),
        pt.plogin.err_m.innerHTML = t,
        clearTimeout(pt.plogin.errclock),
        i || (pt.plogin.errclock = setTimeout("pt.plogin.hide_err()", 5e3))
    },
    hide_err: function() {
        $.css.hide($("error_tips")),
        pt.plogin.err_m.innerHTML = ""
    },
    showAssistant: function(t) {
        if ("2052" == pt.ptui.lang) {
            pt.plogin.hideLoading(),
            $.css.show($("error_tips"));
            var i = "";
            switch (t) {
            case 0:
                i = "快速登录异常，试试 {/assistant/troubleshooter.html,登录助手,} 修复",
                $.report.monitor("315785");
                break;
            case 1:
                i = "快速登录异常，试试 {/assistant/troubleshooter.html,登录助手,} 修复",
                $.report.monitor("315786");
                break;
            case 2:
                i = "登录异常，试试 {/assistant/troubleshooter.html,登录助手,} 修复",
                $.report.monitor("315787");
                break;
            case 3:
                i = "快速登录异常，试试 {http://im.qq.com/qq/2013/,升级QQ,onclick='$.report.monitor(326049);'} 修复",
                $.report.monitor("326046");
                break;
            case 4:
                i = "快速登录异常，试试 {http://im.qq.com/macqq/index.shtml#im.qqformac.plusdown,安装插件,}"
            }
            pt.plogin.err_m.innerHTML = i.replace(/{([^,]+?),([^,]+?),(.*?)}/, "<a class='tips_link' style='color: #29B1F1' href='$1' target='_blank' $3>$2</a>")
        }
    },
    showGuanjiaTips: function() {
        $.initGuanjiaPlugin(),
        $.guanjiaPlugin ? ($.guanjiaPlugin.QMStartUp(16, '/traytip=3 /tipProblemid=1401 /tipSource=18 /tipType=0 /tipIdParam=0 /tipIconUrl="http://dldir2.qq.com/invc/xfspeed/qqpcmgr/clinic/image/tipsicon_qq.png" /tipTitle="QQ快速登录异常?" /tipDesc="不能用已登录的QQ号快速登录，只能手动输入账号密码，建议用电脑诊所一键修复。"'), $.report.monitor("316548")) : $.report.monitor("316549")
    },
    showLoading: function(t) {
        t = pt.plogin.loginState == pt.LoginState.QLogin ? 10 : 20,
        pt.plogin.hide_err(),
        $("loading_tips").style.top = t + "px",
        $.css.show($("loading_tips"))
    },
    hideLoading: function() {
        $.css.hide($("loading_tips"))
    },
    showLowList: function() {
        var t = $("combox_list");
        t && ($.css.show(t), pt.plogin.low_login_isshow = !0)
    },
    hideLowList: function() {
        var t = $("combox_list");
        t && ($.css.hide(t), pt.plogin.low_login_isshow = !1)
    },
    u_focus: function() {
        "" == $("u").value && ($.css.show($("uin_tips")), $("uin_tips").className = "input_tips_focus"),
        $("u").parentNode.className = "inputOuter_focus"
    },
    u_blur: function() {
        if (!pt.plogin.__isShowEmailTips) { / ^\ + /.test(this.value)&&(this.value=this.value.replace(/ ^ \ + /,""),/ ^ 00 / .test(this.value) || (this.value = "00" + this.value));
            var t = $("u");
            if ("" == t.value) {
                var i = $("uin_tips");
                $.css.show(i),
                i.className = "input_tips"
            } else pt.plogin.set_account(),
            pt.plogin.check();
            t.parentNode.className = "inputOuter"
        }
    },
    u_mouseover: function() {
        var t = $("u").parentNode;
        "inputOuter_focus" == t.className || ($("u").parentNode.className = "inputOuter_hover")
    },
    u_mouseout: function() {
        var t = $("u").parentNode;
        "inputOuter_focus" == t.className || ($("u").parentNode.className = "inputOuter")
    },
    window_blur: function() {
        pt.plogin.lastCheckAccount = ""
    },
    u_change: function() {
        pt.plogin.set_account(),
        pt.plogin.passwordErrorNum = 1,
        pt.plogin.hasCheck = !1,
        pt.plogin.hasSubmit = !1
    },
    list_keydown: function(t, i) {
        var e = $("email_list"),
        n = $("u");
        1 == i && (e = $("combox_list"));
        var o = e.getElementsByTagName("li"),
        r = o.length,
        p = t.keyCode;
        switch (p) {
        case pt.plogin.keyCode.UP:
            o[pt.plogin.list_index[i]].className = "",
            pt.plogin.list_index[i] = (pt.plogin.list_index[i] - 1 + r) % r,
            o[pt.plogin.list_index[i]].className = "hover";
            break;
        case pt.plogin.keyCode.DOWN:
            o[pt.plogin.list_index[i]].className = "",
            pt.plogin.list_index[i] = (pt.plogin.list_index[i] + 1) % r,
            o[pt.plogin.list_index[i]].className = "hover";
            break;
        case pt.plogin.keyCode.ENTER:
            var a = o[pt.plogin.list_index[i]].innerHTML;
            0 == i && (n.value = $.str.decodeHtml(a)),
            pt.plogin.hideEmailTips(),
            pt.plogin.hideLowList(),
            t.preventDefault();
            break;
        case pt.plogin.keyCode.TAB:
            pt.plogin.hideEmailTips(),
            pt.plogin.hideLowList()
        }
        1 == i && ($("combox_box").innerHTML = o[pt.plogin.list_index[i]].innerHTML, $("low_login_hour").value = o[pt.plogin.list_index[i]].getAttribute("value"))
    },
    u_keydown: function(t) {
        $.css.hide($("uin_tips")),
        -1 != pt.plogin.list_index[0] && pt.plogin.list_keydown(t, 0)
    },
    u_keyup: function(t) {
        var i = this.value;
        "" == i ? ($.css.show($("uin_tips")), $("uin_tips").className = "input_tips_focus", $("uin_del") && $.css.hide($("uin_del"))) : $("uin_del") && $.css.show($("uin_del"));
        var e = t.keyCode;
        e != pt.plogin.keyCode.UP && e != pt.plogin.keyCode.DOWN && e != pt.plogin.keyCode.ENTER && e != pt.plogin.keyCode.TAB && e != pt.plogin.keyCode.F5 && ($("u").value.indexOf("@") > -1 ? (pt.plogin.showEmailTips(), pt.plogin.createEmailTips($("u").value)) : pt.plogin.hideEmailTips())
    },
    email_mousemove: function(t) {
        var i = t.target;
        if ("li" == i.tagName.toLowerCase()) {
            var e = $("emailTips_" + pt.plogin.list_index[0]);
            e && (e.className = ""),
            i.className = "hover",
            pt.plogin.list_index[0] = parseInt(i.getAttribute("id").substring(10)),
            t.stopPropagation()
        }
    },
    email_click: function(t) {
        var i = t.target;
        if ("li" == i.tagName.toLowerCase()) {
            var e = $("emailTips_" + pt.plogin.list_index[0]);
            e && ($("u").value = $.str.decodeHtml(e.innerHTML), pt.plogin.set_account(), pt.plogin.check()),
            pt.plogin.hideEmailTips(),
            t.stopPropagation()
        }
    },
    p_focus: function() {
        "" == this.value && ($.css.show($("pwd_tips")), $("pwd_tips").className = "input_tips_focus"),
        this.parentNode.className = "inputOuter_focus",
        pt.plogin.check()
    },
    p_blur: function() {
        "" == this.value && ($.css.show($("pwd_tips")), $("pwd_tips").className = "input_tips"),
        $.css.hide($("caps_lock_tips")),
        this.parentNode.className = "inputOuter"
    },
    p_mouseover: function() {
        var t = $("p").parentNode;
        "inputOuter_focus" == t.className || ($("p").parentNode.className = "inputOuter_hover")
    },
    p_mouseout: function() {
        var t = $("p").parentNode;
        "inputOuter_focus" == t.className || ($("p").parentNode.className = "inputOuter")
    },
    p_keydown: function() {
        $.css.hide($("pwd_tips"))
    },
    p_keyup: function() {
        "" == this.value && $.css.show($("pwd_tips"))
    },
    p_keypress: function(t) {
        pt.plogin.detectCapsLock(t) ? $.css.show($("caps_lock_tips")) : $.css.hide($("caps_lock_tips"))
    },
    vc_focus: function() {
        "" == this.value && ($.css.show($("vc_tips")), $("vc_tips").className = "input_tips_focus"),
        this.parentNode.className = "inputOuter_focus"
    },
    vc_blur: function() {
        "" == this.value && ($.css.show($("vc_tips")), $("vc_tips").className = "input_tips"),
        this.parentNode.className = "inputOuter"
    },
    vc_keydown: function() {
        $.css.hide($("vc_tips"))
    },
    vc_keyup: function() {
        "" == this.value && $.css.show($("vc_tips"))
    },
    document_click: function() {
        pt.plogin.action[0]++,
        pt.plogin.hideEmailTips(),
        pt.plogin.hideLowList()
    },
    document_keydown: function() {
        pt.plogin.action[1]++
    },
    setLowloginCheckbox: function() {
        pt.plogin.isMailLogin && (pt.plogin.low_login_enable = !1),
        1 == pt.ptui.low_login && (pt.plogin.low_login_enable ? ($("q_low_login_enable").className = "checked", $("p_low_login_enable").className = "checked", $("auth_low_login_enable").className = "checked") : ($("q_low_login_enable").className = "uncheck", $("p_low_login_enable").className = "uncheck", $("auth_low_login_enable").className = "uncheck"))
    },
    checkbox_click: function() {
        pt.plogin.low_login_enable ? ($("q_low_login_enable").className = "uncheck", $("p_low_login_enable").className = "uncheck", $("auth_low_login_enable").className = "uncheck") : ($("q_low_login_enable").className = "checked", $("p_low_login_enable").className = "checked", $("auth_low_login_enable").className = "checked"),
        pt.plogin.low_login_enable = !pt.plogin.low_login_enable
    },
    feedback: function(t) {
        var i = t ? t.target: null,
        e = i ? i.id + "-": "",
        n = "http://support.qq.com/write.shtml?guest=1&fid=713&SSTAG=hailunna-" + e + $.str.encodeHtml(pt.plogin.account);
        window.open(n)
    },
    bind_account: function() {
        $.css.hide($("operate_tips")),
        pt.plogin.need_hide_operate_tips = !0,
        window.open("http://id.qq.com/index.html#account"),
        $.report.monitor("234964")
    },
    combox_click: function(t) {
        pt.plogin.low_login_isshow ? pt.plogin.hideLowList() : pt.plogin.showLowList(),
        t.stopPropagation()
    },
    delUin: function(t) {
        t && $.css.hide(t.target),
        $("u").value = "",
        pt.plogin.domFocus($("u")),
        pt.plogin.hasCheck = !1
    },
    check_cdn_img: function() {
        if (window.g_cdn_js_fail && !pt.ptui.isHttps) {
            var t = new Image;
            t.onload = function() {
                t.onload = t.onerror = null
            },
            t.onerror = function() {
                t.onload = t.onerror = null;
                var i = $("main_css").innerHTML,
                e = "http://imgcache.qq.com/ptlogin/v4/style/",
                n = "http://ui.ptlogin2.qq.com/style/";
                i = i.replace(new RegExp(e, "g"), n),
                pt.plogin.insertInlineCss(i),
                $.report.monitor(312520)
            },
            t.src = "http://imgcache.qq.com/ptlogin/v4/style/20/images/c_icon_1.png"
        }
    },
    insertInlineCss: function(t) {
        if (document.createStyleSheet) {
            var i = document.createStyleSheet("");
            i.cssText = t
        } else {
            var e = document.createElement("style");
            e.type = "text/css",
            e.textContent = t,
            document.getElementsByTagName("head")[0].appendChild(e)
        }
    },
    createLink: function(t) {
        var i = document.createElement("link");
        i.setAttribute("type", "text/css"),
        i.setAttribute("rel", "stylesheet"),
        i.setAttribute("href", t),
        document.getElementsByTagName("head")[0].appendChild(i)
    },
    checkInputLable: function() {
        try {
            $("u").value && $.css.hide($("uin_tips")),
            window.setTimeout(function() {
                $("p").value && $.css.hide($("pwd_tips"))
            },
            1e3)
        } catch(t) {}
    },
    domLoad: function(t) {
        if (!pt.plogin.hasDomLoad) {
            pt.plogin.hasDomLoad = !0,
            pt.plogin.isNewQr && pt.plogin.loginState == pt.LoginState.QLogin && (t ? pt.plogin.begin_qrlogin() : window.setTimeout(function() {
                pt.plogin.begin_qrlogin()
            },
            0)),
            pt.plogin.checkInputLable(),
            pt.plogin.checkNPLoad(),
            pt.qlogin.initFace(),
            pt.plogin.loadQrTipsPic();
            var i = $("loading_img");
            i && i.setAttribute("src", i.getAttribute("place_src")),
            pt.plogin.check_cdn_img(),
            pt.plogin.ptui_notifySize("login"),
            $.report.monitor("373507&union=256042", .05),
            navigator.cookieEnabled || ($.report.monitor(408084), $.cookie.get("ptcz") && $.report.monitor(408085)),
            pt.plogin.isTenpay && $.report.monitor($.sso_ver >= 1093 ? "451205": "451206"),
            pt.plogin.dottedShow(),
            pt.plogin.webLoginReport(),
            pt.plogin.monitorQQNum(),
            pt.plogin.aq_patch(),
            pt.plogin.gzipReport()
        }
    },
    dottedShow: function() {
        try {
            var t = $("bottom_qlogin");
            if (!t) return;
            var i = t.getElementsByTagName("span");
            if (!i || 0 == i.length) return;
            for (var e = i[i.length - 1], n = e, o = !1; n;) {
                var r = n.tagName && n.tagName.toLowerCase();
                if ("a" == r) {
                    o = !0;
                    break
                }
                n = n.nextSibling
            }
            o || (e.style.display = "none")
        } catch(p) {
            $.report.nlog("dotted show " + p.message)
        }
    },
    checkNPLoad: function() {
        navigator.mimeTypes["application/nptxsso"] && !$.sso_loadComplete && $.checkNPPlugin()
    },
    gzipReport: function() {
        if ("1" == pt.ptui.gzipEnable || pt.ptui.isHttps);
        else {
            $.report.monitor("455847");
            var t = $.http.getXHR();
            if (t) {
                var i = "get",
                e = "/cgi-bin/xver?t=" + Math.random();
                t.open(i, e),
                t.onreadystatechange = function() {
                    if (4 == t.readyState) if (t.status >= 200 && t.status < 300 || 304 === t.status || 1223 === t.status || 0 === t.status) {
                        var i = document.createElement("script");
                        i.innerHTML = t.responseText,
                        document.getElementsByTagName("head")[0].appendChild(i),
                        window._gz || $.report.nlog("gzip探测异常，返回内容：" + t.responseText + "返回码：" + t.status + "uin=" + $.cookie.get("pt2gguin"), "462348")
                    } else $.report.nlog("gzip探测异常，返回内容：" + t.responseText + "返回码：" + t.status + "uin=" + $.cookie.get("pt2gguin"), "462348")
                },
                t.send()
            }
        }
    },
    monitorQQNum: function() {
        var t = $.loginQQnum;
        switch (t) {
        case 0:
            $.report.monitor("330314", .05);
            break;
        case 1:
            $.report.monitor("330315", .05);
            break;
        case 2:
            $.report.monitor("330316", .05);
            break;
        case 3:
            $.report.monitor("330317", .05);
            break;
        case 4:
            $.report.monitor("330318", .05);
            break;
        default:
            $.report.monitor("330319", .05)
        }
    },
    noscript_err: function() {
        $.report.nlog("noscript_err", 316648),
        $("noscript_area").style.display = "none"
    },
    bindEvent: function() {
        function msgCB(t) {
            var i = t.type;
            switch (i + "") {
            case "1":
                pt.plogin.vcodeMessage(t);
                break;
            case "2":
                pt.plogin.hideVC()
            }
        }
        var domU = $("u"),
        domP = $("p"),
        domVerifycode = $("verifycode"),
        domVC = $("verifyimgArea"),
        domBtn = $("login_button"),
        domCheckBox_p = $("p_low_login_box"),
        domCheckBox_q = $("q_low_login_box"),
        domCheckBox_auth = $("auth_low_login_box"),
        domEmailList = $("email_list"),
        domFeedback_web = $("feedback_web"),
        domFeedback_qr = $("feedback_qr"),
        domFeedback_qlogin = $("feedback_qlogin"),
        domClose = $("close"),
        domQloginSwitch = $("switcher_qlogin"),
        domLoginSwitch = $("switcher_plogin"),
        domDelUin = $("uin_del"),
        domBindAccount = $("bind_account"),
        domCancleAuth = $("cancleAuth"),
        domAuthClose = $("authClose"),
        domAuthArea = $("auth_area"),
        domAuthCheckBox = $("auth_low_login_enable"),
        domQr_invalid = $("qr_invalid"),
        domGoback = $("goBack"),
        domQr_img_box = $("qr_img_box"),
        domQr_img = $("qrlogin_img"),
        domQr_info_link = $("qr_info_link"),
        domQrswitch = $("qrswitch_logo");
        domQrswitch && $.e.add(domQrswitch, "click", pt.plogin.switch_qrlogin),
        domQr_info_link && $.e.add(domQr_img, "click",
        function() {
            $.report.monitor("331287", .05)
        }),
        domQr_img_box && ($.e.add(domQr_img_box, "mouseover", pt.plogin.showQrTips), $.e.add(domQr_img_box, "mouseout", pt.plogin.hideQrTips)),
        domGoback && $.e.add(domGoback, "click",
        function(t) {
            t.preventDefault(),
            pt.plogin.go_qrlogin_step(1),
            $.report.monitor("331288", .05)
        }),
        domAuthArea && ($.e.add(domAuthArea, "click", pt.plogin.authLogin), $.e.add(domAuthArea, "mousedown", pt.plogin.authMouseDowm), $.e.add(domAuthArea, "mouseup", pt.plogin.authMouseUp)),
        domCancleAuth && $.e.add(domCancleAuth, "click", pt.plogin.cancleAuth),
        domAuthClose && $.e.add(domAuthClose, "click", pt.plogin.ptui_notifyClose),
        domQloginSwitch && $.e.add(domQloginSwitch, "click", pt.plogin.onQloginSwitch),
        domLoginSwitch && $.e.add(domLoginSwitch, "click",
        function(t) {
            t.preventDefault(),
            pt.plogin.switchpage(pt.LoginState.PLogin),
            $.report.monitor("331285", .05)
        }),
        domBindAccount && ($.e.add(domBindAccount, "click", pt.plogin.bind_account), $.e.add(domBindAccount, "mouseover",
        function() {
            pt.plogin.need_hide_operate_tips = !1
        }), $.e.add(domBindAccount, "mouseout",
        function() {
            pt.plogin.need_hide_operate_tips = !0
        })),
        domClose && $.e.add(domClose, "click", pt.plogin.ptui_notifyClose),
        1 == pt.ptui.low_login && domCheckBox_p && domCheckBox_q && ($.e.add(domCheckBox_p, "click", pt.plogin.checkbox_click), $.e.add(domCheckBox_q, "click", pt.plogin.checkbox_click)),
        1 == pt.ptui.low_login && domCheckBox_auth && $.e.add(domCheckBox_auth, "click", pt.plogin.checkbox_click),
        $.e.add(domU, "focus", pt.plogin.u_focus),
        $.e.add(domU, "blur", pt.plogin.u_blur),
        $.e.add(domU, "change", pt.plogin.u_change),
        $.e.add(domU, "keydown", pt.plogin.u_keydown),
        $.e.add(domU, "keyup", pt.plogin.u_keyup),
        $.e.add(domDelUin, "click", pt.plogin.delUin),
        $.e.add(domP, "focus", pt.plogin.p_focus),
        $.e.add(domP, "blur", pt.plogin.p_blur),
        $.e.add(domP, "keydown", pt.plogin.p_keydown),
        $.e.add(domP, "keyup", pt.plogin.p_keyup),
        $.e.add(domP, "keypress", pt.plogin.p_keypress),
        $.e.add(domBtn, "click",
        function(t) {
            t && t.preventDefault(),
            1 == pt.plogin.needShowNewVc ? pt.plogin.showVC() : pt.plogin.submit(t)
        }),
        $.e.add(domVC, "click", pt.plogin.changeVC),
        $.e.add(domEmailList, "mousemove", pt.plogin.email_mousemove),
        $.e.add(domEmailList, "click", pt.plogin.email_click),
        $.e.add(document, "click", pt.plogin.document_click),
        $.e.add(document, "keydown", pt.plogin.document_keydown),
        $.e.add(domVerifycode, "focus", pt.plogin.vc_focus),
        $.e.add(domVerifycode, "blur", pt.plogin.vc_blur),
        $.e.add(domVerifycode, "keydown", pt.plogin.vc_keydown),
        $.e.add(domVerifycode, "keyup", pt.plogin.vc_keyup),
        $.e.add(window, "load", pt.plogin.domLoad),
        $.e.add(window, "message",
        function(e) {
            var origin = e.origin;
            if (origin == (pt.ptui.isHttps ? "https://ssl.": "http://") + "captcha.qq.com") {
                var data = e.data;
                data = window.JSON ? JSON.parse(data) : eval("(" + data + ")"),
                msgCB(data)
            }
        }),
        navigator.captcha_callback = msgCB;
        var noscript_img = $("noscript_img");
        noscript_img && ($.e.add(noscript_img, "load", pt.plogin.noscript_err), $.e.add(noscript_img, "error", pt.plogin.noscript_err));
        var domVip2 = $("vip_link2");
        domVip2 && $.e.add(domVip2, "click",
        function(t) {
            window.open("http://pay.qq.com/qqvip/index.shtml?aid=vip.gongneng.other.red.dengluweb_wording2_open"),
            t.preventDefault(),
            $.report.monitor("263482")
        }),
        pt.plogin.isNewQr && $.e.add(document, "visibilitychange",
        function() {
            var t = document.visibilityState;
            switch (t) {
            case "hidden":
                pt.plogin.cancle_qrlogin();
                break;
            case "visible":
                pt.plogin.loginState == pt.LoginState.QLogin && pt.plogin.qrlogin_invalid && pt.plogin.begin_qrlogin()
            }
        })
    },
    vcodeMessage: function(t) {
        t.randstr && t.sig || $.report.nlog("vcode postMessage error：" + e.data),
        $("verifycode").value = t.randstr,
        pt.plogin.pt_verifysession = t.sig,
        pt.plogin.hideVC(),
        pt.plogin.submit()
    },
    showNewVC: function() {
        var t = pt.plogin.getNewVCUrl(),
        i = $("newVcodeArea");
        i.style.cssText = "background: none #FFFFFF; position: absolute; top: 0; width: 100%; z-index:9999;",
        25 == pt.ptui.style && (i.style.width = "370px"),
        i.style.height = $("login").offsetHeight - (21 == pt.ptui.style ? 2 : 4) + "px",
        i.innerHTML = '<iframe name="vcode" allowtransparency="true" scrolling="no" frameborder="0" width="100%" height="100%" src="' + t + '">',
        $.css.show(i)
    },
    hideNewVC: function() {
        $("newVcodeArea") && $.css.hide($("newVcodeArea"))
    },
    changeNewVC: function() {
        pt.plogin.showNewVC()
    },
    showVC: function() {
        pt.plogin.vcFlag = !0,
        "1" == pt.ptui.pt_vcode_v1 ? pt.plogin.showNewVC() : ($.css.show($("verifyArea")), $("verifycode").value = "", $("verifyimg").src = pt.plogin.getVCUrl()),
        pt.plogin.ptui_notifySize("login")
    },
    hideVC: function() {
        pt.plogin.vcFlag = !1,
        "1" == pt.ptui.pt_vcode_v1 ? pt.plogin.hideNewVC() : $.css.hide($("verifyArea")),
        pt.plogin.ptui_notifySize("login")
    },
    changeVC: function(t) {
        t && t.preventDefault(),
        "1" == pt.ptui.pt_vcode_v1 ? pt.plogin.changeNewVC() : $("verifyimg").src = pt.plogin.getVCUrl(),
        t && $.report.monitor("330322", .05)
    },
    getVCUrl: function() {
        var t = pt.plogin.at_account,
        i = (pt.ptui.domain, pt.ptui.appid),
        e = pt.plogin.verifycodeUrl + "?uin=" + t + "&aid=" + i + "&cap_cd=" + pt.plogin.cap_cd + "&" + Math.random();
        return e
    },
    getNewVCUrl: function() {
        var t = pt.plogin.at_account,
        i = (pt.ptui.domain, pt.ptui.appid),
        e = pt.plogin.newVerifycodeUrl + "&uin=" + t + "&aid=" + i + "&cap_cd=" + pt.plogin.cap_cd + "&" + Math.random();
        return e
    },
    checkValidate: function(t) {
        try {
            var i = t.u,
            e = t.p,
            n = t.verifycode,
            o = $("safe_edit");
            if ("" == $.str.trim(i.value)) return pt.plogin.show_err(pt.str.no_uin),
            pt.plogin.domFocus(i),
            !1;
            if ($.check.isNullQQ(i.value)) return pt.plogin.show_err(pt.str.inv_uin),
            pt.plogin.domFocus(i),
            !1;
            var r = e.value;
            if (pt.plogin.armSafeEdit.isSafe && o && (r = o.GetPwdHash(), "D41D8CD98F00B204E9800998ECF8427E" == r && (r = ""), pt.plogin.armSafeEdit.safepwd = r), !r) return pt.plogin.show_err(pt.str.no_pwd),
            pt.plogin.domFocus(e),
            !1;
            if ("" == n.value) return pt.plogin.needVc || pt.plogin.vcFlag ? (pt.plogin.show_err(pt.str.no_vcode), pt.plogin.domFocus(n)) : (pt.plogin.checkResultReport(14), clearTimeout(pt.plogin.checkClock), pt.plogin.showVC()),
            !1;
            if (n.value.length < 4) return pt.plogin.show_err(pt.str.inv_vcode),
            pt.plogin.domFocus(n),
            n.select(),
            !1
        } catch(p) {}
        return ! 0
    },
    checkTimeout: function() {
        var t = $.str.trim($("u").value); ($.check.isQQ(t) || $.check.isQQMail(t)) && (pt.plogin.cap_cd = 0, pt.plogin.salt = $.str.uin2hex(t.replace("@qq.com", "")), pt.plogin.needVc = !0, "1" == pt.ptui.pt_vcode_v1 ? pt.plogin.needShowNewVc = !0 : pt.plogin.showVC(), pt.plogin.isCheckTimeout = !0, pt.plogin.checkRet = 1, pt.plogin.cntCheckTimeout++),
        $.report.monitor(216082)
    },
    loginTimeout: function() {
        pt.plogin.showAssistant(2);
        var t = "flag1=7808&flag2=7&flag3=1&1=1000";
        $.report.simpleIsdSpeed(t)
    },
    check: function(t) {
        if (pt.plogin.account || pt.plogin.set_account(), $.check.isNullQQ(pt.plogin.account)) return pt.plogin.show_err(pt.str.inv_uin),
        !1;
        if (pt.plogin.account != pt.plogin.lastCheckAccount && "" != pt.plogin.account) {
            pt.plogin.lastCheckAccount = pt.plogin.account;
            var i = pt.ptui.appid,
            e = pt.plogin.getCheckUrl(pt.plogin.at_account, i);
            pt.plogin.isCheckTimeout = !1,
            clearTimeout(pt.plogin.checkClock),
            pt.plogin.checkClock = setTimeout("pt.plogin.checkTimeout();", 5e3),
            $.http.loadScript(e),
            pt.plogin.check.cb = t
        }
    },
    getCheckUrl: function(t, i) {
        var e = pt.plogin.checkUrl + "?regmaster=" + pt.ptui.regmaster + "&pt_tea=1&pt_vcode=" + pt.ptui.pt_vcode_v1 + "&";
        return e += "uin=" + t + "&appid=" + i + "&js_ver=" + pt.ptui.ptui_version + "&js_type=" + pt.plogin.js_type + "&login_sig=" + pt.ptui.login_sig + "&u1=" + encodeURIComponent(pt.ptui.s_url) + "&r=" + Math.random()
    },
    getSubmitUrl: function(t) {
        var i = pt.plogin.loginUrl + t + "?",
        e = {};
        if ("pt_susp_repush" == t) return i += "appid=" + pt.ptui.appid + "&daid=" + pt.ptui.daid;
        if ("login" == t) {
            e.u = encodeURIComponent(pt.plogin.at_account),
            e.verifycode = $("verifycode").value,
            e.pt_vcode_v1 = pt.plogin.needShowNewVc ? 1 : 0,
            e.pt_verifysession_v1 = pt.plogin.pt_verifysession || $.cookie.get("verifysession");
            var n = $("p").value;
            pt.plogin.armSafeEdit.isSafe && (n = pt.plogin.armSafeEdit.safepwd),
            e.p = $.Encryption.getEncryption(n, pt.plogin.salt, e.verifycode, pt.plogin.armSafeEdit.isSafe),
            e.pt_randsalt = pt.plogin.isRandSalt || 0
        }
        e.u1 = encodeURIComponent("login" == t ? pt.qlogin.getSurl($("u").value) : pt.qlogin.getSurl()),
        e.ptredirect = pt.ptui.target,
        e.h = 1,
        e.t = 1,
        e.g = 1,
        e.from_ui = 1,
        e.ptlang = pt.ptui.lang,
        e.action = pt.plogin.action.join("-") + "-" + (new Date - 0),
        e.js_ver = pt.ptui.ptui_version,
        e.js_type = pt.plogin.js_type,
        e.login_sig = pt.ptui.login_sig,
        e.pt_uistyle = pt.ptui.style,
        1 == pt.ptui.low_login && pt.plogin.low_login_enable && !pt.plogin.isMailLogin && (e.low_login_enable = 1, e.low_login_hour = pt.plogin.low_login_hour),
        "0" != pt.ptui.csimc && (e.csimc = pt.ptui.csimc, e.csnum = pt.ptui.csnum, e.authid = pt.ptui.authid),
        e.aid = pt.ptui.appid,
        pt.ptui.daid && (e.daid = pt.ptui.daid),
        "0" != pt.ptui.pt_3rd_aid && (e.pt_3rd_aid = pt.ptui.pt_3rd_aid),
        pt.ptui.regmaster && (e.regmaster = pt.ptui.regmaster),
        pt.ptui.mibao_css && (e.mibao_css = pt.ptui.mibao_css),
        "1" == pt.ptui.pt_qzone_sig && (e.pt_qzone_sig = 1),
        "1" == pt.ptui.pt_light && (e.pt_light = 1);
        for (var o in e) i += o + "=" + e[o] + "&";
        return i
    },
    submit: function(t) {
        if (pt.plogin.cntCheckTimeout >= 2) return pt.plogin.show_err(pt.plogin.checkErr[pt.ptui.lang]),
        pt.plogin.needVc = !1,
        void(pt.plogin.needShowNewVc = !1);
        if (pt.plogin.submitTime = (new Date).getTime(), t && t.preventDefault(), pt.plogin.lastCheckAccount != pt.plogin.account && !pt.plogin.hasCheck) return void pt.plogin.check(arguments.callee);
        if (!pt.plogin.ptui_onLogin(document.loginform)) return ! 1;
        if ($.cookie.set("ptui_loginuin", escape(document.loginform.u.value), pt.ptui.domain, "/", 720), -1 == pt.plogin.checkRet || 3 == pt.plogin.checkRet) return pt.plogin.show_err(pt.plogin.checkErr[pt.ptui.lang]),
        pt.plogin.lastCheckAccount = "",
        pt.plogin.domFocus($("p")),
        void pt.plogin.check();
        clearTimeout(pt.plogin.loginClock),
        pt.plogin.loginClock = setTimeout("pt.plogin.loginTimeout();", 5e3);
        var i = pt.plogin.getSubmitUrl("login");
        return $.winName.set("login_href", encodeURIComponent(pt.ptui.href)),
        pt.plogin.showLoading(),
        pt.plogin.isVCSessionTimeOut() && !pt.plogin.needVc ? (pt.plogin.lastCheckAccount = "", pt.plogin.check(), window.setTimeout(function() {
            pt.plogin.submit()
        },
        1e3)) : ($.http.loadScript(i), pt.plogin.isdTime["7808-7-2-0"] = (new Date).getTime()),
        !1
    },
    isVCSessionTimeOut: function() {
        return pt.plogin.checkTime = pt.plogin.checkTime || (new Date).getTime(),
        pt.plogin.submitTime - pt.plogin.checkTime > 12e5 ? ($.report.monitor(330323, .05), !0) : !1
    },
    webLoginReport: function() {
        window.setTimeout(function() {
            try {
                var t = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
                i = {},
                e = window.performance ? window.performance.timing: null;
                if (e) {
                    for (var n = e[t[0]], o = 1, r = t.length; r > o; o++) e[t[o]] && (i[o] = e[t[o]] - n);
                    loadJs && loadJs.onloadTime && (i[o++] = loadJs.onloadTime - n),
                    e.domContentLoadedEventEnd - e.navigationStart > pt.plogin.delayTime && e.navigationStart > 0 && $.report.nlog("访问ui延时超过" + pt.plogin.delayTime / 1e3 + "s:delay=" + (e.domContentLoadedEventEnd - e.navigationStart) + ";domContentLoadedEventEnd=" + e.domContentLoadedEventEnd + ";navigationStart=" + e.navigationStart + ";clientip=" + pt.ptui.clientip + ";serverip=" + pt.ptui.serverip, pt.plogin.delayMonitorId, 1),
                    e.connectStart <= e.connectEnd && e.responseStart <= e.responseEnd && pt.plogin.ptui_speedReport(i)
                }
            } catch(p) {}
        },
        1e3)
    },
    ptui_speedReport: function(t) {
        if ("msie" == $.browser("type") || "webkit" == $.browser("type")) {
            var i = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=1";
            if (pt.ptui.isHttps) {
                if (Math.random() > 1) return;
                i = "msie" == $.browser("type") ? $.check.isSsl() ? "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=3": "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=2": $.check.isSsl() ? "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=6": "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=5"
            } else {
                if (Math.random() > .2) return;
                i = "msie" == $.browser("type") ? "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=1": "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=4"
            }
            for (var e in t) t[e] > 15e3 || t[e] < 0 || (i += "&" + e + "=" + t[e] || 1);
            var n = new Image;
            n.src = i
        }
    },
    resultReport: function(t, i, e) {
        var n = "http://isdspeed.qq.com/cgi-bin/v.cgi?flag1=" + t + "&flag2=" + i + "&flag3=" + e,
        o = new Image;
        o.src = n
    },
    crossMessage: function(t) {
        if ("undefined" != typeof window.postMessage) window.parent.postMessage($.str.json2str(t), "*");
        else if (pt.ptui.proxy_url) {
            var i = pt.ptui.proxy_url + "#";
            for (var e in t) i += e + "=" + t[e] + "&";
            $("proxy") && ($("proxy").innerHTML = '<iframe src="' + encodeURI(i) + '"></iframe>')
        } else try {
            navigator.ptlogin_callback && navigator.ptlogin_callback($.str.json2str(t))
        } catch(n) {
            $.report.nlog("ptlogin_callback " + n.message)
        }
    },
    ptui_notifyClose: function(t) {
        t && t.preventDefault();
        var i = {};
        i.action = "close",
        pt.plogin.crossMessage(i),
        pt.plogin.cancle_qrlogin()
    },
    ptui_notifySize: function(t) {
        pt.plogin.loginState == pt.LoginState.PLogin && ($("bottom_web") && $.css.hide($("bottom_web")), pt.plogin.adjustLoginsize(), $("bottom_web") && $.css.show($("bottom_web")));
        var i = $(t),
        e = {};
        e.action = "resize",
        e.width = i.offsetWidth || 1,
        e.height = i.offsetHeight || 1,
        pt.plogin.crossMessage(e)
    },
    ptui_onLogin: function(t) {
        var i = !0;
        return i = pt.plogin.checkValidate(t)
    },
    ptui_uin: function() {},
    is_mibao: function(t) {
        return /^http(s)?:\/\/(ssl\.)?ui.ptlogin2.(\S)+\/cgi-bin\/mibao_vry/.test(t)
    },
    __get_polling_url: function(t) {
        var i = pt.ptui.isHttps ? "https://ssl.": "http://",
        e = i + "ptlogin2." + pt.ptui.domain + "/" + t + "?";
        return 2 == pt.ptui.regmaster ? e = "http://ptlogin2.function.qq.com/" + t + "?regmaster=2&": 3 == pt.ptui.regmaster ? e = "http://ptlogin2.crm2.qq.com/" + t + "?regmaster=3&": 4 == pt.ptui.regmaster ? e = "https://ssl.ptlogin2.mail.qq.com/" + t + "?regmaster=4&": 5 == pt.ptui.regmaster && (e = i + "ptlogin2.mp.qq.com/" + t + "?regmaster=5&"),
        e += "appid=" + pt.ptui.appid + "&e=2&l=M&s=3&d=72&v=4&t=" + Math.random(),
        pt.ptui.daid && (e += "&daid=" + pt.ptui.daid),
        e
    },
    get_qrlogin_pic: function() {
        return pt.plogin.__get_polling_url("ptqrshow")
    },
    go_qrlogin_step: function(t) {
        switch (t) {
        case 1:
            pt.plogin.begin_qrlogin(),
            pt.plogin.isNewQr ? (pt.plogin.begin_qrlogin(), $.css.hide($("qrlogin_step2"))) : ($.css.show($("qrlogin_step1")), $.css.hide($("qrlogin_step2")));
            break;
        case 2:
            pt.plogin.isNewQr ? ($("qrlogin_step2").style.height = $("login").offsetHeight - 8 + "px", $.css.show($("qrlogin_step2"))) : ($.css.show($("qrlogin_step2")), $.css.hide($("qrlogin_step1")))
        }
    },
    begin_qrlogin: function() {
        pt.ptui.lockuin || (pt.plogin.cancle_qrlogin(), $("qr_invalid") && $.css.hide($("qr_invalid")), $("qrlogin_img") && ($("qrlogin_img").src = pt.plogin.get_qrlogin_pic(), $("qrlogin_img").onload = function() {
            $("qrlogin_img").onload = $("qrlogin_img").onerror = null,
            pt.plogin.qrlogin_clock = window.setInterval("pt.plogin.qrlogin_submit();", 3e3),
            pt.plogin.qrlogin_timeout = window.setTimeout(function() {
                pt.plogin.set_qrlogin_invalid()
            },
            pt.plogin.qrlogin_timeout_time)
        },
        $("qrlogin_img").onerror = function() {
            $("qrlogin_img").onload = $("qrlogin_img").onerror = null,
            pt.plogin.set_qrlogin_invalid()
        },
        pt.plogin.qrlogin_invalid = !1))
    },
    cancle_qrlogin: function() {
        window.clearInterval(pt.plogin.qrlogin_clock),
        window.clearTimeout(pt.plogin.qrlogin_timeout),
        pt.plogin.qrlogin_invalid = !0
    },
    set_qrlogin_invalid: function() {
        pt.plogin.cancle_qrlogin(),
        pt.plogin.switch_qrlogin(),
        $("qr_invalid") && $.css.show($("qr_invalid")),
        pt.plogin.hideQrTips()
    },
    createLink: function(t) {
        var i = document.createElement("link");
        i.setAttribute("type", "text/css"),
        i.setAttribute("rel", "stylesheet"),
        i.setAttribute("href", t),
        document.getElementsByTagName("head")[0].appendChild(i)
    },
    loadQrTipsPic: function() {
        if (pt.plogin.isNewQr) {
            var t = $("qr_tips_pic"),
            i = "chs";
            switch (pt.ptui.lang + "") {
            case "2052":
                i = "chs";
                break;
            case "1033":
                i = "en";
                break;
            case "1028":
                i = "cht"
            }
            $.css.addClass(t, "qr_tips_pic_" + i)
        } else {
            var e = pt.ptui.cssPath + "/c_qr_login.css";
            $("qrswitch_logo") && pt.plogin.createLink(e)
        }
    },
    showQrTips: function() {
        var t, i, e = {};
        if (i = $.css.getOffsetPosition("qrlogin_img"), t = $.css.getOffsetPosition("login"), e.left = i.left - t.left, e.right = $("login").offsetWidth - $("qrlogin_img").offsetWidth - e.left, pt.plogin.hasNoQlogin || (e.left = e.left + $.css.getWidth("qrlogin_img") + 10, $("qr_tips").style.left = e.left + "px"), $.css.show($("qr_tips")), $("qr_tips_pic").style.opacity = 0, $("qr_tips_pic").style.filter = "alpha(opacity=0)", $("qr_tips_menban").className = "qr_tips_menban", pt.plogin.hasNoQlogin) if ($.animate.fade("qr_tips_pic", 100, 2, 20,
        function() {}), pt.plogin.isMailLogin) {
            var n = e.right - 160 + 12;
            $.animate.animate("qrlogin_img", {
                left: n
            },
            10, 10)
        } else $.animate.animate("qrlogin_img", {
            left: -30
        },
        10, 10);
        else $.animate.fade("qr_tips_pic", 100, 2, 20);
        pt.plogin.hideQrTipsClock = window.setTimeout("pt.plogin.hideQrTips()", 5e3),
        $.report.monitor("331286", .05)
    },
    hideQrTips: function() {
        pt.plogin.isNewQr && (window.clearTimeout(pt.plogin.hideQrTipsClock), $("qr_tips_menban").className = "", $.animate.fade("qr_tips_pic", 0, 5, 20,
        function() {
            pt.plogin.hasNoQlogin && $.animate.animate("qrlogin_img", {
                left: 12
            },
            10, 10),
            $.css.hide($("qr_tips"))
        }))
    },
    qr_load: function() {},
    qr_error: function() {},
    switch_qrlogin_animate: function() {
        var t = pt.plogin.isQrLogin,
        i = $("web_qr_login_show"),
        e = 0;
        t ? (e = -$("web_login").offsetHeight, $("web_qr_login").style.height = ($("qrlogin").offsetHeight || 265) + "px", $("qrlogin").style.visibility = "visible", $("web_login").style.visibility = "hidden") : (e = 0, $("web_qr_login").style.height = $("web_login").offsetHeight + "px", $("web_login").style.visibility = "visible", $("qrlogin").style.visibility = "hidden"),
        $.animate.animate(i, {
            top: e
        },
        30, 20)
    },
    switch_qrlogin: function(t) {
        pt.plogin.isNewQr || (t && t.preventDefault(), pt.plogin.hide_err(), pt.plogin.isQrLogin ? ($("qrlogin").style.visibility = "hidden", pt.plogin.cancle_qrlogin(), $("qrswitch_logo").title = "二维码登录", $("qrswitch_logo").className = "qrswitch_logo", $.report.monitor("273368", .05)) : ($("qrlogin").style.visibility = "visible", pt.plogin.go_qrlogin_step(1), $("qrswitch_logo").title = "返回", $("qrswitch_logo").className = "qrswitch_logo_qr", pt.plogin.begin_qrlogin(), $.report.monitor("273367", .05)), pt.plogin.isQrLogin = !pt.plogin.isQrLogin, pt.plogin.switch_qrlogin_animate(), pt.plogin.ptui_notifySize("login"))
    },
    adjustLoginsize: function() {
        var t = pt.plogin.isQrLogin;
        $("web_qr_login").style.height = t ? ($("qrlogin").offsetHeight || 265) + "px": $("web_login").offsetHeight + "px"
    },
    qrlogin_submit: function() {
        var t = pt.plogin.getSubmitUrl("ptqrlogin");
        $.winName.set("login_href", encodeURIComponent(pt.ptui.href)),
        $.http.loadScript(t)
    },
    force_qrlogin: function() {
        pt.plogin.switchpage(pt.LoginState.QLogin)
    },
    redirect: function(t, i) {
        switch (t + "") {
        case "0":
            location.href = i;
            break;
        case "1":
            top.location.href = i;
            break;
        case "2":
            parent.location.href = i;
            break;
        default:
            top.location.href = i
        }
    },
    armSafeEdit: function() {
        function t() {
            if (pt.plogin.armSafeEdit.isSafe) e.style.display = "block",
            e.value = "",
            setTimeout(function() {
                try {
                    e.focus()
                } catch(t) {}
            },
            0),
            i.removeChild(l),
            p.style.backgroundPosition = "-130px -130px",
            pt.plogin.armSafeEdit.isSafe = !1;
            else {
                var t = $("safe_edit");
                t ? l.style.display = "block": (l.innerHTML = ($.suportActive() ? c: u) + g, i.appendChild(l), t = $("safe_edit"), $.e.add(t, "focus", pt.plogin.check));
                try {
                    t.CreateSafeEdit(),
                    t.ClearAllInput(),
                    setTimeout(function() {
                        t.focus()
                    },
                    200),
                    e.style.display = "none",
                    p.style.backgroundPosition = "-117px -130px",
                    pt.plogin.armSafeEdit.isSafe = !0
                } catch(o) {
                    pt.plogin.show_err("安全控件加载失败"),
                    e.focus(),
                    pt.plogin.armSafeEdit.isSafe = !1,
                    l.style.display = "none",
                    i.removeChild(l),
                    $.report.monitor("456099")
                }
                $.report.monitor("456098")
            }
            return i.style.height = pt.plogin.armSafeEdit.isSafe ? "74px": n,
            pt.plogin.ptui_notifySize("login"),
            !1
        }
        var i = $("pwdArea"),
        e = $("p"),
        n = i.style.height,
        o = 208,
        r = 38;
        e.style.width = o + "px";
        var p = document.createElement("a");
        p.tabIndex = 1,
        p.id = "safe_lock",
        p.title = "安全控件登录开关";
        var a = {
            background: "url(https://ui.ptlogin2.qq.com/style/34/images/icon_5.png) no-repeat -130px -130px",
            width: "13px",
            height: "20px",
            display: "block",
            margin: "-29px 20px 0 0",
            cursor: "pointer",
            webkitUserSelect: "none",
            outline: "none",
            marginLeft: o + 12 + "px"
        };
        "6.0" == $.browser("version") && (a.background = a.background.replace("icon_5.png", "icon_5_8.png"));
        for (var s in a) p.style[s] = a[s];
        p.style.style = "right",
        pt.plogin.armSafeEdit.isSafe = !1,
        i.appendChild(p);
        var l = document.createElement("div");
        a = {
            position: "absolute",
            top: "2px",
            left: "1px"
        };
        for (var s in a) l.style[s] = a[s];
        var c = '<object id="safe_edit" classid="CLSID:EAAED308-7322-4b9b-965E-171933ADD473" width="' + o + '" height="' + r + '">\r\n                    <param name="bkColor" value="16777215"/>\r\n                    <param name="fontColor" value="0"/>\r\n                    <param name="fontHeight" value="0.25" />\r\n                    <param name="caretHeight" value="0.2" />\r\n                    <param name="borderType" value="2" />\r\n                    <param name="borderColor" value="16777215" />\r\n                </object>',
        u = '<embed id="safe_edit" type="application/nptxsso" \r\n    width="' + o + '" height="' + r + '" bkcolor="16777215" fontcolor="0" \r\n    fontheight="0.25" caretheight="0.8" bordertype="2" bordercolor="16777215" />',
        g = '<div class="safe-edit-tips" \r\n    style="color: #2C9E62; height: 28px; line-height: 34px; width: ' + o + 'px;">\r\n    当前为安全登录模式，使用密码控件</div>';
        $.e.add(p, "click", t),
        pt.plogin.armSafeEdit.lockToggle = t
    },
    onekeyVerify: function(t, i, e) {
        function n() {
            pt.plogin.onekeyVerifyClock = 0,
            pt.plogin.hide_err(),
            $.css.hide(p),
            $.css.show(u),
            setTimeout(function() {
                c.value = "",
                pt.plogin.domFocus(c)
            },
            0)
        }
        function o() {
            pt.plogin.onekeyVerifyClock = 0,
            $.css.addClass(p, "invalid"),
            pt.plogin.hide_err(),
            $.e.add(l, "click",
            function() {
                pt.plogin.onekeyVerify("hide")
            })
        }
        function r() {
            $.css.setClass(p, "ov-" + i),
            d[i] && d[i].appendChild(a),
            e = e || pt.plogin.onekeyVerify.__tips || "您的帐号千金难求。为确保安全，请务必对手机收到的登录请求进行确认。",
            pt.plogin.onekeyVerify.__tips = e,
            pt.plogin.show_err(e, !0),
            pt.plogin.onekeyVerifyClock = setInterval(function() {
                $.http.loadScript(pt.plogin.getSubmitUrl("pt_susp_poll"))
            },
            3e3),
            setTimeout(function() {
                clearInterval(pt.plogin.onekeyVerifyClock),
                pt.plogin.onekeyVerify("invalid")
            },
            pt.plogin.onekey_verify_timeout)
        }
        var p = $("onekey_verify"),
        a = $("ov_retry_wrap"),
        s = $("ov_retry"),
        l = $("ov_back"),
        c = $("p"),
        u = document.loginform;
        if (p) {
            clearInterval(pt.plogin.onekeyVerifyClock),
            i = parseInt(i) || pt.plogin.onekeyVerify.__style || 1,
            pt.plogin.onekeyVerify.__style = i;
            for (var g = p.getElementsByTagName("span"), d = ["占位"], h = 0; h < g.length; h++) g[h].className.indexOf("ov-tips") > -1 && d.push(g[h]);
            s.onclick = function() {
                $.http.loadScript(pt.plogin.getSubmitUrl("pt_susp_repush"))
            },
            "hide" == t ? n() : ("invalid" == t ? o() : r(), $.css.show(p), $.css.hide(u))
        }
    }
},
pt.plogin.auth();