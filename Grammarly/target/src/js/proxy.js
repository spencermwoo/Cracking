!function e(t, n, o) {
    function r(s, c) {
        if (!n[s]) {
            if (!t[s]) {
                var a = "function" == typeof require && require;
                if (!c && a) return a(s, !0);
                if (i) return i(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND", u;
            }
            var l = n[s] = {
                exports: {}
            };
            t[s][0].call(l.exports, function(e) {
                var n = t[s][1][e];
                return r(n ? n : e);
            }, l, l.exports, e, t, n, o);
        }
        return n[s].exports;
    }
    for (var i = "function" == typeof require && require, s = 0; s < o.length; s++) r(o[s]);
    return r;
}({
    1: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/array/from"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/array/from": 22
    } ],
    2: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/get-iterator"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/get-iterator": 23
    } ],
    3: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/is-iterable"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/is-iterable": 24
    } ],
    4: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/json/stringify"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/json/stringify": 25
    } ],
    5: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/assign"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/assign": 26
    } ],
    6: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/create"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/create": 27
    } ],
    7: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/define-property"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/define-property": 28
    } ],
    8: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/get-prototype-of"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/get-prototype-of": 29
    } ],
    9: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/keys"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/keys": 30
    } ],
    10: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/set-prototype-of"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/set-prototype-of": 31
    } ],
    11: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/promise"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/promise": 32
    } ],
    12: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/symbol"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/symbol": 33
    } ],
    13: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/symbol/iterator"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/symbol/iterator": 34
    } ],
    14: [ function(e, t, n) {
        "use strict";
        n.__esModule = !0, n["default"] = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        };
    }, {} ],
    15: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var r = e("../core-js/object/define-property"), i = o(r);
        n["default"] = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                    (0, i["default"])(e, o.key, o);
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t;
            };
        }();
    }, {
        "../core-js/object/define-property": 7
    } ],
    16: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var r = e("../core-js/object/define-property"), i = o(r);
        n["default"] = function(e, t, n) {
            return t in e ? (0, i["default"])(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        };
    }, {
        "../core-js/object/define-property": 7
    } ],
    17: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var r = e("../core-js/object/set-prototype-of"), i = o(r), s = e("../core-js/object/create"), c = o(s), a = e("../helpers/typeof"), u = o(a);
        n["default"] = function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + ("undefined" == typeof t ? "undefined" : (0, 
            u["default"])(t)));
            e.prototype = (0, c["default"])(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (i["default"] ? (0, i["default"])(e, t) : e.__proto__ = t);
        };
    }, {
        "../core-js/object/create": 6,
        "../core-js/object/set-prototype-of": 10,
        "../helpers/typeof": 21
    } ],
    18: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var r = e("../helpers/typeof"), i = o(r);
        n["default"] = function(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" !== ("undefined" == typeof t ? "undefined" : (0, i["default"])(t)) && "function" != typeof t ? e : t;
        };
    }, {
        "../helpers/typeof": 21
    } ],
    19: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var r = e("../core-js/is-iterable"), i = o(r), s = e("../core-js/get-iterator"), c = o(s);
        n["default"] = function() {
            function e(e, t) {
                var n = [], o = !0, r = !1, i = void 0;
                try {
                    for (var s, a = (0, c["default"])(e); !(o = (s = a.next()).done) && (n.push(s.value), 
                    !t || n.length !== t); o = !0) ;
                } catch (u) {
                    r = !0, i = u;
                } finally {
                    try {
                        !o && a["return"] && a["return"]();
                    } finally {
                        if (r) throw i;
                    }
                }
                return n;
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if ((0, i["default"])(Object(t))) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
    }, {
        "../core-js/get-iterator": 2,
        "../core-js/is-iterable": 3
    } ],
    20: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var r = e("../core-js/array/from"), i = o(r);
        n["default"] = function(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n;
            }
            return (0, i["default"])(e);
        };
    }, {
        "../core-js/array/from": 1
    } ],
    21: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var r = e("../core-js/symbol/iterator"), i = o(r), s = e("../core-js/symbol"), c = o(s), a = "function" == typeof c["default"] && "symbol" == typeof i["default"] ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof c["default"] && e.constructor === c["default"] && e !== c["default"].prototype ? "symbol" : typeof e;
        };
        n["default"] = "function" == typeof c["default"] && "symbol" === a(i["default"]) ? function(e) {
            return "undefined" == typeof e ? "undefined" : a(e);
        } : function(e) {
            return e && "function" == typeof c["default"] && e.constructor === c["default"] && e !== c["default"].prototype ? "symbol" : "undefined" == typeof e ? "undefined" : a(e);
        };
    }, {
        "../core-js/symbol": 12,
        "../core-js/symbol/iterator": 13
    } ],
    22: [ function(e, t, n) {
        e("../../modules/es6.string.iterator"), e("../../modules/es6.array.from"), t.exports = e("../../modules/_core").Array.from;
    }, {
        "../../modules/_core": 42,
        "../../modules/es6.array.from": 110,
        "../../modules/es6.string.iterator": 120
    } ],
    23: [ function(e, t, n) {
        e("../modules/web.dom.iterable"), e("../modules/es6.string.iterator"), t.exports = e("../modules/core.get-iterator");
    }, {
        "../modules/core.get-iterator": 108,
        "../modules/es6.string.iterator": 120,
        "../modules/web.dom.iterable": 124
    } ],
    24: [ function(e, t, n) {
        e("../modules/web.dom.iterable"), e("../modules/es6.string.iterator"), t.exports = e("../modules/core.is-iterable");
    }, {
        "../modules/core.is-iterable": 109,
        "../modules/es6.string.iterator": 120,
        "../modules/web.dom.iterable": 124
    } ],
    25: [ function(e, t, n) {
        var o = e("../../modules/_core"), r = o.JSON || (o.JSON = {
            stringify: JSON.stringify
        });
        t.exports = function(e) {
            return r.stringify.apply(r, arguments);
        };
    }, {
        "../../modules/_core": 42
    } ],
    26: [ function(e, t, n) {
        e("../../modules/es6.object.assign"), t.exports = e("../../modules/_core").Object.assign;
    }, {
        "../../modules/_core": 42,
        "../../modules/es6.object.assign": 112
    } ],
    27: [ function(e, t, n) {
        e("../../modules/es6.object.create");
        var o = e("../../modules/_core").Object;
        t.exports = function(e, t) {
            return o.create(e, t);
        };
    }, {
        "../../modules/_core": 42,
        "../../modules/es6.object.create": 113
    } ],
    28: [ function(e, t, n) {
        e("../../modules/es6.object.define-property");
        var o = e("../../modules/_core").Object;
        t.exports = function(e, t, n) {
            return o.defineProperty(e, t, n);
        };
    }, {
        "../../modules/_core": 42,
        "../../modules/es6.object.define-property": 114
    } ],
    29: [ function(e, t, n) {
        e("../../modules/es6.object.get-prototype-of"), t.exports = e("../../modules/_core").Object.getPrototypeOf;
    }, {
        "../../modules/_core": 42,
        "../../modules/es6.object.get-prototype-of": 115
    } ],
    30: [ function(e, t, n) {
        e("../../modules/es6.object.keys"), t.exports = e("../../modules/_core").Object.keys;
    }, {
        "../../modules/_core": 42,
        "../../modules/es6.object.keys": 116
    } ],
    31: [ function(e, t, n) {
        e("../../modules/es6.object.set-prototype-of"), t.exports = e("../../modules/_core").Object.setPrototypeOf;
    }, {
        "../../modules/_core": 42,
        "../../modules/es6.object.set-prototype-of": 117
    } ],
    32: [ function(e, t, n) {
        e("../modules/es6.object.to-string"), e("../modules/es6.string.iterator"), e("../modules/web.dom.iterable"), 
        e("../modules/es6.promise"), t.exports = e("../modules/_core").Promise;
    }, {
        "../modules/_core": 42,
        "../modules/es6.object.to-string": 118,
        "../modules/es6.promise": 119,
        "../modules/es6.string.iterator": 120,
        "../modules/web.dom.iterable": 124
    } ],
    33: [ function(e, t, n) {
        e("../../modules/es6.symbol"), e("../../modules/es6.object.to-string"), e("../../modules/es7.symbol.async-iterator"), 
        e("../../modules/es7.symbol.observable"), t.exports = e("../../modules/_core").Symbol;
    }, {
        "../../modules/_core": 42,
        "../../modules/es6.object.to-string": 118,
        "../../modules/es6.symbol": 121,
        "../../modules/es7.symbol.async-iterator": 122,
        "../../modules/es7.symbol.observable": 123
    } ],
    34: [ function(e, t, n) {
        e("../../modules/es6.string.iterator"), e("../../modules/web.dom.iterable"), t.exports = e("../../modules/_wks-ext").f("iterator");
    }, {
        "../../modules/_wks-ext": 105,
        "../../modules/es6.string.iterator": 120,
        "../../modules/web.dom.iterable": 124
    } ],
    35: [ function(e, t, n) {
        t.exports = function(e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e;
        };
    }, {} ],
    36: [ function(e, t, n) {
        t.exports = function() {};
    }, {} ],
    37: [ function(e, t, n) {
        t.exports = function(e, t, n, o) {
            if (!(e instanceof t) || void 0 !== o && o in e) throw TypeError(n + ": incorrect invocation!");
            return e;
        };
    }, {} ],
    38: [ function(e, t, n) {
        var o = e("./_is-object");
        t.exports = function(e) {
            if (!o(e)) throw TypeError(e + " is not an object!");
            return e;
        };
    }, {
        "./_is-object": 62
    } ],
    39: [ function(e, t, n) {
        var o = e("./_to-iobject"), r = e("./_to-length"), i = e("./_to-index");
        t.exports = function(e) {
            return function(t, n, s) {
                var c, a = o(t), u = r(a.length), l = i(s, u);
                if (e && n != n) {
                    for (;u > l; ) if (c = a[l++], c != c) return !0;
                } else for (;u > l; l++) if ((e || l in a) && a[l] === n) return e || l || 0;
                return !e && -1;
            };
        };
    }, {
        "./_to-index": 97,
        "./_to-iobject": 99,
        "./_to-length": 100
    } ],
    40: [ function(e, t, n) {
        var o = e("./_cof"), r = e("./_wks")("toStringTag"), i = "Arguments" == o(function() {
            return arguments;
        }()), s = function(e, t) {
            try {
                return e[t];
            } catch (n) {}
        };
        t.exports = function(e) {
            var t, n, c;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = s(t = Object(e), r)) ? n : i ? o(t) : "Object" == (c = o(t)) && "function" == typeof t.callee ? "Arguments" : c;
        };
    }, {
        "./_cof": 41,
        "./_wks": 106
    } ],
    41: [ function(e, t, n) {
        var o = {}.toString;
        t.exports = function(e) {
            return o.call(e).slice(8, -1);
        };
    }, {} ],
    42: [ function(e, t, n) {
        var o = t.exports = {
            version: "2.4.0"
        };
        "number" == typeof __e && (__e = o);
    }, {} ],
    43: [ function(e, t, n) {
        "use strict";
        var o = e("./_object-dp"), r = e("./_property-desc");
        t.exports = function(e, t, n) {
            t in e ? o.f(e, t, r(0, n)) : e[t] = n;
        };
    }, {
        "./_object-dp": 75,
        "./_property-desc": 86
    } ],
    44: [ function(e, t, n) {
        var o = e("./_a-function");
        t.exports = function(e, t, n) {
            if (o(e), void 0 === t) return e;
            switch (n) {
              case 1:
                return function(n) {
                    return e.call(t, n);
                };

              case 2:
                return function(n, o) {
                    return e.call(t, n, o);
                };

              case 3:
                return function(n, o, r) {
                    return e.call(t, n, o, r);
                };
            }
            return function() {
                return e.apply(t, arguments);
            };
        };
    }, {
        "./_a-function": 35
    } ],
    45: [ function(e, t, n) {
        t.exports = function(e) {
            if (void 0 == e) throw TypeError("Can't call method on  " + e);
            return e;
        };
    }, {} ],
    46: [ function(e, t, n) {
        t.exports = !e("./_fails")(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, {
        "./_fails": 51
    } ],
    47: [ function(e, t, n) {
        var o = e("./_is-object"), r = e("./_global").document, i = o(r) && o(r.createElement);
        t.exports = function(e) {
            return i ? r.createElement(e) : {};
        };
    }, {
        "./_global": 53,
        "./_is-object": 62
    } ],
    48: [ function(e, t, n) {
        t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, {} ],
    49: [ function(e, t, n) {
        var o = e("./_object-keys"), r = e("./_object-gops"), i = e("./_object-pie");
        t.exports = function(e) {
            var t = o(e), n = r.f;
            if (n) for (var s, c = n(e), a = i.f, u = 0; c.length > u; ) a.call(e, s = c[u++]) && t.push(s);
            return t;
        };
    }, {
        "./_object-gops": 80,
        "./_object-keys": 83,
        "./_object-pie": 84
    } ],
    50: [ function(e, t, n) {
        var o = e("./_global"), r = e("./_core"), i = e("./_ctx"), s = e("./_hide"), c = "prototype", a = function(e, t, n) {
            var u, l, f, d = e & a.F, p = e & a.G, g = e & a.S, _ = e & a.P, b = e & a.B, h = e & a.W, v = p ? r : r[t] || (r[t] = {}), m = v[c], y = p ? o : g ? o[t] : (o[t] || {})[c];
            p && (n = t);
            for (u in n) l = !d && y && void 0 !== y[u], l && u in v || (f = l ? y[u] : n[u], 
            v[u] = p && "function" != typeof y[u] ? n[u] : b && l ? i(f, o) : h && y[u] == f ? function(e) {
                var t = function(t, n, o) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                          case 0:
                            return new e();

                          case 1:
                            return new e(t);

                          case 2:
                            return new e(t, n);
                        }
                        return new e(t, n, o);
                    }
                    return e.apply(this, arguments);
                };
                return t[c] = e[c], t;
            }(f) : _ && "function" == typeof f ? i(Function.call, f) : f, _ && ((v.virtual || (v.virtual = {}))[u] = f, 
            e & a.R && m && !m[u] && s(m, u, f)));
        };
        a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, t.exports = a;
    }, {
        "./_core": 42,
        "./_ctx": 44,
        "./_global": 53,
        "./_hide": 55
    } ],
    51: [ function(e, t, n) {
        t.exports = function(e) {
            try {
                return !!e();
            } catch (t) {
                return !0;
            }
        };
    }, {} ],
    52: [ function(e, t, n) {
        var o = e("./_ctx"), r = e("./_iter-call"), i = e("./_is-array-iter"), s = e("./_an-object"), c = e("./_to-length"), a = e("./core.get-iterator-method"), u = {}, l = {}, n = t.exports = function(e, t, n, f, d) {
            var p, g, _, b, h = d ? function() {
                return e;
            } : a(e), v = o(n, f, t ? 2 : 1), m = 0;
            if ("function" != typeof h) throw TypeError(e + " is not iterable!");
            if (i(h)) {
                for (p = c(e.length); p > m; m++) if (b = t ? v(s(g = e[m])[0], g[1]) : v(e[m]), 
                b === u || b === l) return b;
            } else for (_ = h.call(e); !(g = _.next()).done; ) if (b = r(_, v, g.value, t), 
            b === u || b === l) return b;
        };
        n.BREAK = u, n.RETURN = l;
    }, {
        "./_an-object": 38,
        "./_ctx": 44,
        "./_is-array-iter": 60,
        "./_iter-call": 63,
        "./_to-length": 100,
        "./core.get-iterator-method": 107
    } ],
    53: [ function(e, t, n) {
        var o = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = o);
    }, {} ],
    54: [ function(e, t, n) {
        var o = {}.hasOwnProperty;
        t.exports = function(e, t) {
            return o.call(e, t);
        };
    }, {} ],
    55: [ function(e, t, n) {
        var o = e("./_object-dp"), r = e("./_property-desc");
        t.exports = e("./_descriptors") ? function(e, t, n) {
            return o.f(e, t, r(1, n));
        } : function(e, t, n) {
            return e[t] = n, e;
        };
    }, {
        "./_descriptors": 46,
        "./_object-dp": 75,
        "./_property-desc": 86
    } ],
    56: [ function(e, t, n) {
        t.exports = e("./_global").document && document.documentElement;
    }, {
        "./_global": 53
    } ],
    57: [ function(e, t, n) {
        t.exports = !e("./_descriptors") && !e("./_fails")(function() {
            return 7 != Object.defineProperty(e("./_dom-create")("div"), "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, {
        "./_descriptors": 46,
        "./_dom-create": 47,
        "./_fails": 51
    } ],
    58: [ function(e, t, n) {
        t.exports = function(e, t, n) {
            var o = void 0 === n;
            switch (t.length) {
              case 0:
                return o ? e() : e.call(n);

              case 1:
                return o ? e(t[0]) : e.call(n, t[0]);

              case 2:
                return o ? e(t[0], t[1]) : e.call(n, t[0], t[1]);

              case 3:
                return o ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);

              case 4:
                return o ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);
            }
            return e.apply(n, t);
        };
    }, {} ],
    59: [ function(e, t, n) {
        var o = e("./_cof");
        t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
            return "String" == o(e) ? e.split("") : Object(e);
        };
    }, {
        "./_cof": 41
    } ],
    60: [ function(e, t, n) {
        var o = e("./_iterators"), r = e("./_wks")("iterator"), i = Array.prototype;
        t.exports = function(e) {
            return void 0 !== e && (o.Array === e || i[r] === e);
        };
    }, {
        "./_iterators": 68,
        "./_wks": 106
    } ],
    61: [ function(e, t, n) {
        var o = e("./_cof");
        t.exports = Array.isArray || function(e) {
            return "Array" == o(e);
        };
    }, {
        "./_cof": 41
    } ],
    62: [ function(e, t, n) {
        t.exports = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e;
        };
    }, {} ],
    63: [ function(e, t, n) {
        var o = e("./_an-object");
        t.exports = function(e, t, n, r) {
            try {
                return r ? t(o(n)[0], n[1]) : t(n);
            } catch (i) {
                var s = e["return"];
                throw void 0 !== s && o(s.call(e)), i;
            }
        };
    }, {
        "./_an-object": 38
    } ],
    64: [ function(e, t, n) {
        "use strict";
        var o = e("./_object-create"), r = e("./_property-desc"), i = e("./_set-to-string-tag"), s = {};
        e("./_hide")(s, e("./_wks")("iterator"), function() {
            return this;
        }), t.exports = function(e, t, n) {
            e.prototype = o(s, {
                next: r(1, n)
            }), i(e, t + " Iterator");
        };
    }, {
        "./_hide": 55,
        "./_object-create": 74,
        "./_property-desc": 86,
        "./_set-to-string-tag": 91,
        "./_wks": 106
    } ],
    65: [ function(e, t, n) {
        "use strict";
        var o = e("./_library"), r = e("./_export"), i = e("./_redefine"), s = e("./_hide"), c = e("./_has"), a = e("./_iterators"), u = e("./_iter-create"), l = e("./_set-to-string-tag"), f = e("./_object-gpo"), d = e("./_wks")("iterator"), p = !([].keys && "next" in [].keys()), g = "@@iterator", _ = "keys", b = "values", h = function() {
            return this;
        };
        t.exports = function(e, t, n, v, m, y, j) {
            u(n, t, v);
            var w, x, L, k = function(e) {
                if (!p && e in C) return C[e];
                switch (e) {
                  case _:
                    return function() {
                        return new n(this, e);
                    };

                  case b:
                    return function() {
                        return new n(this, e);
                    };
                }
                return function() {
                    return new n(this, e);
                };
            }, O = t + " Iterator", N = m == b, I = !1, C = e.prototype, F = C[d] || C[g] || m && C[m], P = F || k(m), E = m ? N ? k("entries") : P : void 0, S = "Array" == t ? C.entries || F : F;
            if (S && (L = f(S.call(new e())), L !== Object.prototype && (l(L, O, !0), o || c(L, d) || s(L, d, h))), 
            N && F && F.name !== b && (I = !0, P = function() {
                return F.call(this);
            }), o && !j || !p && !I && C[d] || s(C, d, P), a[t] = P, a[O] = h, m) if (w = {
                values: N ? P : k(b),
                keys: y ? P : k(_),
                entries: E
            }, j) for (x in w) x in C || i(C, x, w[x]); else r(r.P + r.F * (p || I), t, w);
            return w;
        };
    }, {
        "./_export": 50,
        "./_has": 54,
        "./_hide": 55,
        "./_iter-create": 64,
        "./_iterators": 68,
        "./_library": 70,
        "./_object-gpo": 81,
        "./_redefine": 88,
        "./_set-to-string-tag": 91,
        "./_wks": 106
    } ],
    66: [ function(e, t, n) {
        var o = e("./_wks")("iterator"), r = !1;
        try {
            var i = [ 7 ][o]();
            i["return"] = function() {
                r = !0;
            }, Array.from(i, function() {
                throw 2;
            });
        } catch (s) {}
        t.exports = function(e, t) {
            if (!t && !r) return !1;
            var n = !1;
            try {
                var i = [ 7 ], s = i[o]();
                s.next = function() {
                    return {
                        done: n = !0
                    };
                }, i[o] = function() {
                    return s;
                }, e(i);
            } catch (c) {}
            return n;
        };
    }, {
        "./_wks": 106
    } ],
    67: [ function(e, t, n) {
        t.exports = function(e, t) {
            return {
                value: t,
                done: !!e
            };
        };
    }, {} ],
    68: [ function(e, t, n) {
        t.exports = {};
    }, {} ],
    69: [ function(e, t, n) {
        var o = e("./_object-keys"), r = e("./_to-iobject");
        t.exports = function(e, t) {
            for (var n, i = r(e), s = o(i), c = s.length, a = 0; c > a; ) if (i[n = s[a++]] === t) return n;
        };
    }, {
        "./_object-keys": 83,
        "./_to-iobject": 99
    } ],
    70: [ function(e, t, n) {
        t.exports = !0;
    }, {} ],
    71: [ function(e, t, n) {
        var o = e("./_uid")("meta"), r = e("./_is-object"), i = e("./_has"), s = e("./_object-dp").f, c = 0, a = Object.isExtensible || function() {
            return !0;
        }, u = !e("./_fails")(function() {
            return a(Object.preventExtensions({}));
        }), l = function(e) {
            s(e, o, {
                value: {
                    i: "O" + ++c,
                    w: {}
                }
            });
        }, f = function(e, t) {
            if (!r(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!i(e, o)) {
                if (!a(e)) return "F";
                if (!t) return "E";
                l(e);
            }
            return e[o].i;
        }, d = function(e, t) {
            if (!i(e, o)) {
                if (!a(e)) return !0;
                if (!t) return !1;
                l(e);
            }
            return e[o].w;
        }, p = function(e) {
            return u && g.NEED && a(e) && !i(e, o) && l(e), e;
        }, g = t.exports = {
            KEY: o,
            NEED: !1,
            fastKey: f,
            getWeak: d,
            onFreeze: p
        };
    }, {
        "./_fails": 51,
        "./_has": 54,
        "./_is-object": 62,
        "./_object-dp": 75,
        "./_uid": 103
    } ],
    72: [ function(e, t, n) {
        var o = e("./_global"), r = e("./_task").set, i = o.MutationObserver || o.WebKitMutationObserver, s = o.process, c = o.Promise, a = "process" == e("./_cof")(s);
        t.exports = function() {
            var e, t, n, u = function() {
                var o, r;
                for (a && (o = s.domain) && o.exit(); e; ) {
                    r = e.fn, e = e.next;
                    try {
                        r();
                    } catch (i) {
                        throw e ? n() : t = void 0, i;
                    }
                }
                t = void 0, o && o.enter();
            };
            if (a) n = function() {
                s.nextTick(u);
            }; else if (i) {
                var l = !0, f = document.createTextNode("");
                new i(u).observe(f, {
                    characterData: !0
                }), n = function() {
                    f.data = l = !l;
                };
            } else if (c && c.resolve) {
                var d = c.resolve();
                n = function() {
                    d.then(u);
                };
            } else n = function() {
                r.call(o, u);
            };
            return function(o) {
                var r = {
                    fn: o,
                    next: void 0
                };
                t && (t.next = r), e || (e = r, n()), t = r;
            };
        };
    }, {
        "./_cof": 41,
        "./_global": 53,
        "./_task": 96
    } ],
    73: [ function(e, t, n) {
        "use strict";
        var o = e("./_object-keys"), r = e("./_object-gops"), i = e("./_object-pie"), s = e("./_to-object"), c = e("./_iobject"), a = Object.assign;
        t.exports = !a || e("./_fails")(function() {
            var e = {}, t = {}, n = Symbol(), o = "abcdefghijklmnopqrst";
            return e[n] = 7, o.split("").forEach(function(e) {
                t[e] = e;
            }), 7 != a({}, e)[n] || Object.keys(a({}, t)).join("") != o;
        }) ? function(e, t) {
            for (var n = s(e), a = arguments.length, u = 1, l = r.f, f = i.f; a > u; ) for (var d, p = c(arguments[u++]), g = l ? o(p).concat(l(p)) : o(p), _ = g.length, b = 0; _ > b; ) f.call(p, d = g[b++]) && (n[d] = p[d]);
            return n;
        } : a;
    }, {
        "./_fails": 51,
        "./_iobject": 59,
        "./_object-gops": 80,
        "./_object-keys": 83,
        "./_object-pie": 84,
        "./_to-object": 101
    } ],
    74: [ function(e, t, n) {
        var o = e("./_an-object"), r = e("./_object-dps"), i = e("./_enum-bug-keys"), s = e("./_shared-key")("IE_PROTO"), c = function() {}, a = "prototype", u = function() {
            var t, n = e("./_dom-create")("iframe"), o = i.length, r = "<", s = ">";
            for (n.style.display = "none", e("./_html").appendChild(n), n.src = "javascript:", 
            t = n.contentWindow.document, t.open(), t.write(r + "script" + s + "document.F=Object" + r + "/script" + s), 
            t.close(), u = t.F; o--; ) delete u[a][i[o]];
            return u();
        };
        t.exports = Object.create || function(e, t) {
            var n;
            return null !== e ? (c[a] = o(e), n = new c(), c[a] = null, n[s] = e) : n = u(), 
            void 0 === t ? n : r(n, t);
        };
    }, {
        "./_an-object": 38,
        "./_dom-create": 47,
        "./_enum-bug-keys": 48,
        "./_html": 56,
        "./_object-dps": 76,
        "./_shared-key": 92
    } ],
    75: [ function(e, t, n) {
        var o = e("./_an-object"), r = e("./_ie8-dom-define"), i = e("./_to-primitive"), s = Object.defineProperty;
        n.f = e("./_descriptors") ? Object.defineProperty : function(e, t, n) {
            if (o(e), t = i(t, !0), o(n), r) try {
                return s(e, t, n);
            } catch (c) {}
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (e[t] = n.value), e;
        };
    }, {
        "./_an-object": 38,
        "./_descriptors": 46,
        "./_ie8-dom-define": 57,
        "./_to-primitive": 102
    } ],
    76: [ function(e, t, n) {
        var o = e("./_object-dp"), r = e("./_an-object"), i = e("./_object-keys");
        t.exports = e("./_descriptors") ? Object.defineProperties : function(e, t) {
            r(e);
            for (var n, s = i(t), c = s.length, a = 0; c > a; ) o.f(e, n = s[a++], t[n]);
            return e;
        };
    }, {
        "./_an-object": 38,
        "./_descriptors": 46,
        "./_object-dp": 75,
        "./_object-keys": 83
    } ],
    77: [ function(e, t, n) {
        var o = e("./_object-pie"), r = e("./_property-desc"), i = e("./_to-iobject"), s = e("./_to-primitive"), c = e("./_has"), a = e("./_ie8-dom-define"), u = Object.getOwnPropertyDescriptor;
        n.f = e("./_descriptors") ? u : function(e, t) {
            if (e = i(e), t = s(t, !0), a) try {
                return u(e, t);
            } catch (n) {}
            if (c(e, t)) return r(!o.f.call(e, t), e[t]);
        };
    }, {
        "./_descriptors": 46,
        "./_has": 54,
        "./_ie8-dom-define": 57,
        "./_object-pie": 84,
        "./_property-desc": 86,
        "./_to-iobject": 99,
        "./_to-primitive": 102
    } ],
    78: [ function(e, t, n) {
        var o = e("./_to-iobject"), r = e("./_object-gopn").f, i = {}.toString, s = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], c = function(e) {
            try {
                return r(e);
            } catch (t) {
                return s.slice();
            }
        };
        t.exports.f = function(e) {
            return s && "[object Window]" == i.call(e) ? c(e) : r(o(e));
        };
    }, {
        "./_object-gopn": 79,
        "./_to-iobject": 99
    } ],
    79: [ function(e, t, n) {
        var o = e("./_object-keys-internal"), r = e("./_enum-bug-keys").concat("length", "prototype");
        n.f = Object.getOwnPropertyNames || function(e) {
            return o(e, r);
        };
    }, {
        "./_enum-bug-keys": 48,
        "./_object-keys-internal": 82
    } ],
    80: [ function(e, t, n) {
        n.f = Object.getOwnPropertySymbols;
    }, {} ],
    81: [ function(e, t, n) {
        var o = e("./_has"), r = e("./_to-object"), i = e("./_shared-key")("IE_PROTO"), s = Object.prototype;
        t.exports = Object.getPrototypeOf || function(e) {
            return e = r(e), o(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null;
        };
    }, {
        "./_has": 54,
        "./_shared-key": 92,
        "./_to-object": 101
    } ],
    82: [ function(e, t, n) {
        var o = e("./_has"), r = e("./_to-iobject"), i = e("./_array-includes")(!1), s = e("./_shared-key")("IE_PROTO");
        t.exports = function(e, t) {
            var n, c = r(e), a = 0, u = [];
            for (n in c) n != s && o(c, n) && u.push(n);
            for (;t.length > a; ) o(c, n = t[a++]) && (~i(u, n) || u.push(n));
            return u;
        };
    }, {
        "./_array-includes": 39,
        "./_has": 54,
        "./_shared-key": 92,
        "./_to-iobject": 99
    } ],
    83: [ function(e, t, n) {
        var o = e("./_object-keys-internal"), r = e("./_enum-bug-keys");
        t.exports = Object.keys || function(e) {
            return o(e, r);
        };
    }, {
        "./_enum-bug-keys": 48,
        "./_object-keys-internal": 82
    } ],
    84: [ function(e, t, n) {
        n.f = {}.propertyIsEnumerable;
    }, {} ],
    85: [ function(e, t, n) {
        var o = e("./_export"), r = e("./_core"), i = e("./_fails");
        t.exports = function(e, t) {
            var n = (r.Object || {})[e] || Object[e], s = {};
            s[e] = t(n), o(o.S + o.F * i(function() {
                n(1);
            }), "Object", s);
        };
    }, {
        "./_core": 42,
        "./_export": 50,
        "./_fails": 51
    } ],
    86: [ function(e, t, n) {
        t.exports = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            };
        };
    }, {} ],
    87: [ function(e, t, n) {
        var o = e("./_hide");
        t.exports = function(e, t, n) {
            for (var r in t) n && e[r] ? e[r] = t[r] : o(e, r, t[r]);
            return e;
        };
    }, {
        "./_hide": 55
    } ],
    88: [ function(e, t, n) {
        t.exports = e("./_hide");
    }, {
        "./_hide": 55
    } ],
    89: [ function(e, t, n) {
        var o = e("./_is-object"), r = e("./_an-object"), i = function(e, t) {
            if (r(e), !o(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
        };
        t.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? function(t, n, o) {
                try {
                    o = e("./_ctx")(Function.call, e("./_object-gopd").f(Object.prototype, "__proto__").set, 2), 
                    o(t, []), n = !(t instanceof Array);
                } catch (r) {
                    n = !0;
                }
                return function(e, t) {
                    return i(e, t), n ? e.__proto__ = t : o(e, t), e;
                };
            }({}, !1) : void 0),
            check: i
        };
    }, {
        "./_an-object": 38,
        "./_ctx": 44,
        "./_is-object": 62,
        "./_object-gopd": 77
    } ],
    90: [ function(e, t, n) {
        "use strict";
        var o = e("./_global"), r = e("./_core"), i = e("./_object-dp"), s = e("./_descriptors"), c = e("./_wks")("species");
        t.exports = function(e) {
            var t = "function" == typeof r[e] ? r[e] : o[e];
            s && t && !t[c] && i.f(t, c, {
                configurable: !0,
                get: function() {
                    return this;
                }
            });
        };
    }, {
        "./_core": 42,
        "./_descriptors": 46,
        "./_global": 53,
        "./_object-dp": 75,
        "./_wks": 106
    } ],
    91: [ function(e, t, n) {
        var o = e("./_object-dp").f, r = e("./_has"), i = e("./_wks")("toStringTag");
        t.exports = function(e, t, n) {
            e && !r(e = n ? e : e.prototype, i) && o(e, i, {
                configurable: !0,
                value: t
            });
        };
    }, {
        "./_has": 54,
        "./_object-dp": 75,
        "./_wks": 106
    } ],
    92: [ function(e, t, n) {
        var o = e("./_shared")("keys"), r = e("./_uid");
        t.exports = function(e) {
            return o[e] || (o[e] = r(e));
        };
    }, {
        "./_shared": 93,
        "./_uid": 103
    } ],
    93: [ function(e, t, n) {
        var o = e("./_global"), r = "__core-js_shared__", i = o[r] || (o[r] = {});
        t.exports = function(e) {
            return i[e] || (i[e] = {});
        };
    }, {
        "./_global": 53
    } ],
    94: [ function(e, t, n) {
        var o = e("./_an-object"), r = e("./_a-function"), i = e("./_wks")("species");
        t.exports = function(e, t) {
            var n, s = o(e).constructor;
            return void 0 === s || void 0 == (n = o(s)[i]) ? t : r(n);
        };
    }, {
        "./_a-function": 35,
        "./_an-object": 38,
        "./_wks": 106
    } ],
    95: [ function(e, t, n) {
        var o = e("./_to-integer"), r = e("./_defined");
        t.exports = function(e) {
            return function(t, n) {
                var i, s, c = String(r(t)), a = o(n), u = c.length;
                return a < 0 || a >= u ? e ? "" : void 0 : (i = c.charCodeAt(a), i < 55296 || i > 56319 || a + 1 === u || (s = c.charCodeAt(a + 1)) < 56320 || s > 57343 ? e ? c.charAt(a) : i : e ? c.slice(a, a + 2) : (i - 55296 << 10) + (s - 56320) + 65536);
            };
        };
    }, {
        "./_defined": 45,
        "./_to-integer": 98
    } ],
    96: [ function(e, t, n) {
        var o, r, i, s = e("./_ctx"), c = e("./_invoke"), a = e("./_html"), u = e("./_dom-create"), l = e("./_global"), f = l.process, d = l.setImmediate, p = l.clearImmediate, g = l.MessageChannel, _ = 0, b = {}, h = "onreadystatechange", v = function() {
            var e = +this;
            if (b.hasOwnProperty(e)) {
                var t = b[e];
                delete b[e], t();
            }
        }, m = function(e) {
            v.call(e.data);
        };
        d && p || (d = function(e) {
            for (var t = [], n = 1; arguments.length > n; ) t.push(arguments[n++]);
            return b[++_] = function() {
                c("function" == typeof e ? e : Function(e), t);
            }, o(_), _;
        }, p = function(e) {
            delete b[e];
        }, "process" == e("./_cof")(f) ? o = function(e) {
            f.nextTick(s(v, e, 1));
        } : g ? (r = new g(), i = r.port2, r.port1.onmessage = m, o = s(i.postMessage, i, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (o = function(e) {
            l.postMessage(e + "", "*");
        }, l.addEventListener("message", m, !1)) : o = h in u("script") ? function(e) {
            a.appendChild(u("script"))[h] = function() {
                a.removeChild(this), v.call(e);
            };
        } : function(e) {
            setTimeout(s(v, e, 1), 0);
        }), t.exports = {
            set: d,
            clear: p
        };
    }, {
        "./_cof": 41,
        "./_ctx": 44,
        "./_dom-create": 47,
        "./_global": 53,
        "./_html": 56,
        "./_invoke": 58
    } ],
    97: [ function(e, t, n) {
        var o = e("./_to-integer"), r = Math.max, i = Math.min;
        t.exports = function(e, t) {
            return e = o(e), e < 0 ? r(e + t, 0) : i(e, t);
        };
    }, {
        "./_to-integer": 98
    } ],
    98: [ function(e, t, n) {
        var o = Math.ceil, r = Math.floor;
        t.exports = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? r : o)(e);
        };
    }, {} ],
    99: [ function(e, t, n) {
        var o = e("./_iobject"), r = e("./_defined");
        t.exports = function(e) {
            return o(r(e));
        };
    }, {
        "./_defined": 45,
        "./_iobject": 59
    } ],
    100: [ function(e, t, n) {
        var o = e("./_to-integer"), r = Math.min;
        t.exports = function(e) {
            return e > 0 ? r(o(e), 9007199254740991) : 0;
        };
    }, {
        "./_to-integer": 98
    } ],
    101: [ function(e, t, n) {
        var o = e("./_defined");
        t.exports = function(e) {
            return Object(o(e));
        };
    }, {
        "./_defined": 45
    } ],
    102: [ function(e, t, n) {
        var o = e("./_is-object");
        t.exports = function(e, t) {
            if (!o(e)) return e;
            var n, r;
            if (t && "function" == typeof (n = e.toString) && !o(r = n.call(e))) return r;
            if ("function" == typeof (n = e.valueOf) && !o(r = n.call(e))) return r;
            if (!t && "function" == typeof (n = e.toString) && !o(r = n.call(e))) return r;
            throw TypeError("Can't convert object to primitive value");
        };
    }, {
        "./_is-object": 62
    } ],
    103: [ function(e, t, n) {
        var o = 0, r = Math.random();
        t.exports = function(e) {
            return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++o + r).toString(36));
        };
    }, {} ],
    104: [ function(e, t, n) {
        var o = e("./_global"), r = e("./_core"), i = e("./_library"), s = e("./_wks-ext"), c = e("./_object-dp").f;
        t.exports = function(e) {
            var t = r.Symbol || (r.Symbol = i ? {} : o.Symbol || {});
            "_" == e.charAt(0) || e in t || c(t, e, {
                value: s.f(e)
            });
        };
    }, {
        "./_core": 42,
        "./_global": 53,
        "./_library": 70,
        "./_object-dp": 75,
        "./_wks-ext": 105
    } ],
    105: [ function(e, t, n) {
        n.f = e("./_wks");
    }, {
        "./_wks": 106
    } ],
    106: [ function(e, t, n) {
        var o = e("./_shared")("wks"), r = e("./_uid"), i = e("./_global").Symbol, s = "function" == typeof i, c = t.exports = function(e) {
            return o[e] || (o[e] = s && i[e] || (s ? i : r)("Symbol." + e));
        };
        c.store = o;
    }, {
        "./_global": 53,
        "./_shared": 93,
        "./_uid": 103
    } ],
    107: [ function(e, t, n) {
        var o = e("./_classof"), r = e("./_wks")("iterator"), i = e("./_iterators");
        t.exports = e("./_core").getIteratorMethod = function(e) {
            if (void 0 != e) return e[r] || e["@@iterator"] || i[o(e)];
        };
    }, {
        "./_classof": 40,
        "./_core": 42,
        "./_iterators": 68,
        "./_wks": 106
    } ],
    108: [ function(e, t, n) {
        var o = e("./_an-object"), r = e("./core.get-iterator-method");
        t.exports = e("./_core").getIterator = function(e) {
            var t = r(e);
            if ("function" != typeof t) throw TypeError(e + " is not iterable!");
            return o(t.call(e));
        };
    }, {
        "./_an-object": 38,
        "./_core": 42,
        "./core.get-iterator-method": 107
    } ],
    109: [ function(e, t, n) {
        var o = e("./_classof"), r = e("./_wks")("iterator"), i = e("./_iterators");
        t.exports = e("./_core").isIterable = function(e) {
            var t = Object(e);
            return void 0 !== t[r] || "@@iterator" in t || i.hasOwnProperty(o(t));
        };
    }, {
        "./_classof": 40,
        "./_core": 42,
        "./_iterators": 68,
        "./_wks": 106
    } ],
    110: [ function(e, t, n) {
        "use strict";
        var o = e("./_ctx"), r = e("./_export"), i = e("./_to-object"), s = e("./_iter-call"), c = e("./_is-array-iter"), a = e("./_to-length"), u = e("./_create-property"), l = e("./core.get-iterator-method");
        r(r.S + r.F * !e("./_iter-detect")(function(e) {
            Array.from(e);
        }), "Array", {
            from: function(e) {
                var t, n, r, f, d = i(e), p = "function" == typeof this ? this : Array, g = arguments.length, _ = g > 1 ? arguments[1] : void 0, b = void 0 !== _, h = 0, v = l(d);
                if (b && (_ = o(_, g > 2 ? arguments[2] : void 0, 2)), void 0 == v || p == Array && c(v)) for (t = a(d.length), 
                n = new p(t); t > h; h++) u(n, h, b ? _(d[h], h) : d[h]); else for (f = v.call(d), 
                n = new p(); !(r = f.next()).done; h++) u(n, h, b ? s(f, _, [ r.value, h ], !0) : r.value);
                return n.length = h, n;
            }
        });
    }, {
        "./_create-property": 43,
        "./_ctx": 44,
        "./_export": 50,
        "./_is-array-iter": 60,
        "./_iter-call": 63,
        "./_iter-detect": 66,
        "./_to-length": 100,
        "./_to-object": 101,
        "./core.get-iterator-method": 107
    } ],
    111: [ function(e, t, n) {
        "use strict";
        var o = e("./_add-to-unscopables"), r = e("./_iter-step"), i = e("./_iterators"), s = e("./_to-iobject");
        t.exports = e("./_iter-define")(Array, "Array", function(e, t) {
            this._t = s(e), this._i = 0, this._k = t;
        }, function() {
            var e = this._t, t = this._k, n = this._i++;
            return !e || n >= e.length ? (this._t = void 0, r(1)) : "keys" == t ? r(0, n) : "values" == t ? r(0, e[n]) : r(0, [ n, e[n] ]);
        }, "values"), i.Arguments = i.Array, o("keys"), o("values"), o("entries");
    }, {
        "./_add-to-unscopables": 36,
        "./_iter-define": 65,
        "./_iter-step": 67,
        "./_iterators": 68,
        "./_to-iobject": 99
    } ],
    112: [ function(e, t, n) {
        var o = e("./_export");
        o(o.S + o.F, "Object", {
            assign: e("./_object-assign")
        });
    }, {
        "./_export": 50,
        "./_object-assign": 73
    } ],
    113: [ function(e, t, n) {
        var o = e("./_export");
        o(o.S, "Object", {
            create: e("./_object-create")
        });
    }, {
        "./_export": 50,
        "./_object-create": 74
    } ],
    114: [ function(e, t, n) {
        var o = e("./_export");
        o(o.S + o.F * !e("./_descriptors"), "Object", {
            defineProperty: e("./_object-dp").f
        });
    }, {
        "./_descriptors": 46,
        "./_export": 50,
        "./_object-dp": 75
    } ],
    115: [ function(e, t, n) {
        var o = e("./_to-object"), r = e("./_object-gpo");
        e("./_object-sap")("getPrototypeOf", function() {
            return function(e) {
                return r(o(e));
            };
        });
    }, {
        "./_object-gpo": 81,
        "./_object-sap": 85,
        "./_to-object": 101
    } ],
    116: [ function(e, t, n) {
        var o = e("./_to-object"), r = e("./_object-keys");
        e("./_object-sap")("keys", function() {
            return function(e) {
                return r(o(e));
            };
        });
    }, {
        "./_object-keys": 83,
        "./_object-sap": 85,
        "./_to-object": 101
    } ],
    117: [ function(e, t, n) {
        var o = e("./_export");
        o(o.S, "Object", {
            setPrototypeOf: e("./_set-proto").set
        });
    }, {
        "./_export": 50,
        "./_set-proto": 89
    } ],
    118: [ function(e, t, n) {}, {} ],
    119: [ function(e, t, n) {
        "use strict";
        var o, r, i, s = e("./_library"), c = e("./_global"), a = e("./_ctx"), u = e("./_classof"), l = e("./_export"), f = e("./_is-object"), d = e("./_a-function"), p = e("./_an-instance"), g = e("./_for-of"), _ = e("./_species-constructor"), b = e("./_task").set, h = e("./_microtask")(), v = "Promise", m = c.TypeError, y = c.process, j = c[v], y = c.process, w = "process" == u(y), x = function() {}, L = !!function() {
            try {
                var t = j.resolve(1), n = (t.constructor = {})[e("./_wks")("species")] = function(e) {
                    e(x, x);
                };
                return (w || "function" == typeof PromiseRejectionEvent) && t.then(x) instanceof n;
            } catch (o) {}
        }(), k = function(e, t) {
            return e === t || e === j && t === i;
        }, O = function(e) {
            var t;
            return !(!f(e) || "function" != typeof (t = e.then)) && t;
        }, N = function(e) {
            return k(j, e) ? new I(e) : new r(e);
        }, I = r = function(e) {
            var t, n;
            this.promise = new e(function(e, o) {
                if (void 0 !== t || void 0 !== n) throw m("Bad Promise constructor");
                t = e, n = o;
            }), this.resolve = d(t), this.reject = d(n);
        }, C = function(e) {
            try {
                e();
            } catch (t) {
                return {
                    error: t
                };
            }
        }, F = function(e, t) {
            if (!e._n) {
                e._n = !0;
                var n = e._c;
                h(function() {
                    for (var o = e._v, r = 1 == e._s, i = 0, s = function(t) {
                        var n, i, s = r ? t.ok : t.fail, c = t.resolve, a = t.reject, u = t.domain;
                        try {
                            s ? (r || (2 == e._h && S(e), e._h = 1), s === !0 ? n = o : (u && u.enter(), n = s(o), 
                            u && u.exit()), n === t.promise ? a(m("Promise-chain cycle")) : (i = O(n)) ? i.call(n, c, a) : c(n)) : a(o);
                        } catch (l) {
                            a(l);
                        }
                    }; n.length > i; ) s(n[i++]);
                    e._c = [], e._n = !1, t && !e._h && P(e);
                });
            }
        }, P = function(e) {
            b.call(c, function() {
                var t, n, o, r = e._v;
                if (E(e) && (t = C(function() {
                    w ? y.emit("unhandledRejection", r, e) : (n = c.onunhandledrejection) ? n({
                        promise: e,
                        reason: r
                    }) : (o = c.console) && o.error && o.error("Unhandled promise rejection", r);
                }), e._h = w || E(e) ? 2 : 1), e._a = void 0, t) throw t.error;
            });
        }, E = function(e) {
            if (1 == e._h) return !1;
            for (var t, n = e._a || e._c, o = 0; n.length > o; ) if (t = n[o++], t.fail || !E(t.promise)) return !1;
            return !0;
        }, S = function(e) {
            b.call(c, function() {
                var t;
                w ? y.emit("rejectionHandled", e) : (t = c.onrejectionhandled) && t({
                    promise: e,
                    reason: e._v
                });
            });
        }, M = function(e) {
            var t = this;
            t._d || (t._d = !0, t = t._w || t, t._v = e, t._s = 2, t._a || (t._a = t._c.slice()), 
            F(t, !0));
        }, R = function(e) {
            var t, n = this;
            if (!n._d) {
                n._d = !0, n = n._w || n;
                try {
                    if (n === e) throw m("Promise can't be resolved itself");
                    (t = O(e)) ? h(function() {
                        var o = {
                            _w: n,
                            _d: !1
                        };
                        try {
                            t.call(e, a(R, o, 1), a(M, o, 1));
                        } catch (r) {
                            M.call(o, r);
                        }
                    }) : (n._v = e, n._s = 1, F(n, !1));
                } catch (o) {
                    M.call({
                        _w: n,
                        _d: !1
                    }, o);
                }
            }
        };
        L || (j = function(e) {
            p(this, j, v, "_h"), d(e), o.call(this);
            try {
                e(a(R, this, 1), a(M, this, 1));
            } catch (t) {
                M.call(this, t);
            }
        }, o = function(e) {
            this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, 
            this._n = !1;
        }, o.prototype = e("./_redefine-all")(j.prototype, {
            then: function(e, t) {
                var n = N(_(this, j));
                return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, 
                n.domain = w ? y.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && F(this, !1), 
                n.promise;
            },
            "catch": function(e) {
                return this.then(void 0, e);
            }
        }), I = function() {
            var e = new o();
            this.promise = e, this.resolve = a(R, e, 1), this.reject = a(M, e, 1);
        }), l(l.G + l.W + l.F * !L, {
            Promise: j
        }), e("./_set-to-string-tag")(j, v), e("./_set-species")(v), i = e("./_core")[v], 
        l(l.S + l.F * !L, v, {
            reject: function(e) {
                var t = N(this), n = t.reject;
                return n(e), t.promise;
            }
        }), l(l.S + l.F * (s || !L), v, {
            resolve: function(e) {
                if (e instanceof j && k(e.constructor, this)) return e;
                var t = N(this), n = t.resolve;
                return n(e), t.promise;
            }
        }), l(l.S + l.F * !(L && e("./_iter-detect")(function(e) {
            j.all(e)["catch"](x);
        })), v, {
            all: function(e) {
                var t = this, n = N(t), o = n.resolve, r = n.reject, i = C(function() {
                    var n = [], i = 0, s = 1;
                    g(e, !1, function(e) {
                        var c = i++, a = !1;
                        n.push(void 0), s++, t.resolve(e).then(function(e) {
                            a || (a = !0, n[c] = e, --s || o(n));
                        }, r);
                    }), --s || o(n);
                });
                return i && r(i.error), n.promise;
            },
            race: function(e) {
                var t = this, n = N(t), o = n.reject, r = C(function() {
                    g(e, !1, function(e) {
                        t.resolve(e).then(n.resolve, o);
                    });
                });
                return r && o(r.error), n.promise;
            }
        });
    }, {
        "./_a-function": 35,
        "./_an-instance": 37,
        "./_classof": 40,
        "./_core": 42,
        "./_ctx": 44,
        "./_export": 50,
        "./_for-of": 52,
        "./_global": 53,
        "./_is-object": 62,
        "./_iter-detect": 66,
        "./_library": 70,
        "./_microtask": 72,
        "./_redefine-all": 87,
        "./_set-species": 90,
        "./_set-to-string-tag": 91,
        "./_species-constructor": 94,
        "./_task": 96,
        "./_wks": 106
    } ],
    120: [ function(e, t, n) {
        "use strict";
        var o = e("./_string-at")(!0);
        e("./_iter-define")(String, "String", function(e) {
            this._t = String(e), this._i = 0;
        }, function() {
            var e, t = this._t, n = this._i;
            return n >= t.length ? {
                value: void 0,
                done: !0
            } : (e = o(t, n), this._i += e.length, {
                value: e,
                done: !1
            });
        });
    }, {
        "./_iter-define": 65,
        "./_string-at": 95
    } ],
    121: [ function(e, t, n) {
        "use strict";
        var o = e("./_global"), r = e("./_has"), i = e("./_descriptors"), s = e("./_export"), c = e("./_redefine"), a = e("./_meta").KEY, u = e("./_fails"), l = e("./_shared"), f = e("./_set-to-string-tag"), d = e("./_uid"), p = e("./_wks"), g = e("./_wks-ext"), _ = e("./_wks-define"), b = e("./_keyof"), h = e("./_enum-keys"), v = e("./_is-array"), m = e("./_an-object"), y = e("./_to-iobject"), j = e("./_to-primitive"), w = e("./_property-desc"), x = e("./_object-create"), L = e("./_object-gopn-ext"), k = e("./_object-gopd"), O = e("./_object-dp"), N = e("./_object-keys"), I = k.f, C = O.f, F = L.f, P = o.Symbol, E = o.JSON, S = E && E.stringify, M = "prototype", R = p("_hidden"), A = p("toPrimitive"), T = {}.propertyIsEnumerable, W = l("symbol-registry"), U = l("symbols"), B = l("op-symbols"), D = Object[M], V = "function" == typeof P, G = o.QObject, z = !G || !G[M] || !G[M].findChild, q = i && u(function() {
            return 7 != x(C({}, "a", {
                get: function() {
                    return C(this, "a", {
                        value: 7
                    }).a;
                }
            })).a;
        }) ? function(e, t, n) {
            var o = I(D, t);
            o && delete D[t], C(e, t, n), o && e !== D && C(D, t, o);
        } : C, H = function(e) {
            var t = U[e] = x(P[M]);
            return t._k = e, t;
        }, J = V && "symbol" == typeof P.iterator ? function(e) {
            return "symbol" == typeof e;
        } : function(e) {
            return e instanceof P;
        }, K = function(e, t, n) {
            return e === D && K(B, t, n), m(e), t = j(t, !0), m(n), r(U, t) ? (n.enumerable ? (r(e, R) && e[R][t] && (e[R][t] = !1), 
            n = x(n, {
                enumerable: w(0, !1)
            })) : (r(e, R) || C(e, R, w(1, {})), e[R][t] = !0), q(e, t, n)) : C(e, t, n);
        }, Y = function(e, t) {
            m(e);
            for (var n, o = h(t = y(t)), r = 0, i = o.length; i > r; ) K(e, n = o[r++], t[n]);
            return e;
        }, Q = function(e, t) {
            return void 0 === t ? x(e) : Y(x(e), t);
        }, X = function(e) {
            var t = T.call(this, e = j(e, !0));
            return !(this === D && r(U, e) && !r(B, e)) && (!(t || !r(this, e) || !r(U, e) || r(this, R) && this[R][e]) || t);
        }, Z = function(e, t) {
            if (e = y(e), t = j(t, !0), e !== D || !r(U, t) || r(B, t)) {
                var n = I(e, t);
                return !n || !r(U, t) || r(e, R) && e[R][t] || (n.enumerable = !0), n;
            }
        }, $ = function(e) {
            for (var t, n = F(y(e)), o = [], i = 0; n.length > i; ) r(U, t = n[i++]) || t == R || t == a || o.push(t);
            return o;
        }, ee = function(e) {
            for (var t, n = e === D, o = F(n ? B : y(e)), i = [], s = 0; o.length > s; ) !r(U, t = o[s++]) || n && !r(D, t) || i.push(U[t]);
            return i;
        };
        V || (P = function() {
            if (this instanceof P) throw TypeError("Symbol is not a constructor!");
            var e = d(arguments.length > 0 ? arguments[0] : void 0), t = function(n) {
                this === D && t.call(B, n), r(this, R) && r(this[R], e) && (this[R][e] = !1), q(this, e, w(1, n));
            };
            return i && z && q(D, e, {
                configurable: !0,
                set: t
            }), H(e);
        }, c(P[M], "toString", function() {
            return this._k;
        }), k.f = Z, O.f = K, e("./_object-gopn").f = L.f = $, e("./_object-pie").f = X, 
        e("./_object-gops").f = ee, i && !e("./_library") && c(D, "propertyIsEnumerable", X, !0), 
        g.f = function(e) {
            return H(p(e));
        }), s(s.G + s.W + s.F * !V, {
            Symbol: P
        });
        for (var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ne = 0; te.length > ne; ) p(te[ne++]);
        for (var te = N(p.store), ne = 0; te.length > ne; ) _(te[ne++]);
        s(s.S + s.F * !V, "Symbol", {
            "for": function(e) {
                return r(W, e += "") ? W[e] : W[e] = P(e);
            },
            keyFor: function(e) {
                if (J(e)) return b(W, e);
                throw TypeError(e + " is not a symbol!");
            },
            useSetter: function() {
                z = !0;
            },
            useSimple: function() {
                z = !1;
            }
        }), s(s.S + s.F * !V, "Object", {
            create: Q,
            defineProperty: K,
            defineProperties: Y,
            getOwnPropertyDescriptor: Z,
            getOwnPropertyNames: $,
            getOwnPropertySymbols: ee
        }), E && s(s.S + s.F * (!V || u(function() {
            var e = P();
            return "[null]" != S([ e ]) || "{}" != S({
                a: e
            }) || "{}" != S(Object(e));
        })), "JSON", {
            stringify: function(e) {
                if (void 0 !== e && !J(e)) {
                    for (var t, n, o = [ e ], r = 1; arguments.length > r; ) o.push(arguments[r++]);
                    return t = o[1], "function" == typeof t && (n = t), !n && v(t) || (t = function(e, t) {
                        if (n && (t = n.call(this, e, t)), !J(t)) return t;
                    }), o[1] = t, S.apply(E, o);
                }
            }
        }), P[M][A] || e("./_hide")(P[M], A, P[M].valueOf), f(P, "Symbol"), f(Math, "Math", !0), 
        f(o.JSON, "JSON", !0);
    }, {
        "./_an-object": 38,
        "./_descriptors": 46,
        "./_enum-keys": 49,
        "./_export": 50,
        "./_fails": 51,
        "./_global": 53,
        "./_has": 54,
        "./_hide": 55,
        "./_is-array": 61,
        "./_keyof": 69,
        "./_library": 70,
        "./_meta": 71,
        "./_object-create": 74,
        "./_object-dp": 75,
        "./_object-gopd": 77,
        "./_object-gopn": 79,
        "./_object-gopn-ext": 78,
        "./_object-gops": 80,
        "./_object-keys": 83,
        "./_object-pie": 84,
        "./_property-desc": 86,
        "./_redefine": 88,
        "./_set-to-string-tag": 91,
        "./_shared": 93,
        "./_to-iobject": 99,
        "./_to-primitive": 102,
        "./_uid": 103,
        "./_wks": 106,
        "./_wks-define": 104,
        "./_wks-ext": 105
    } ],
    122: [ function(e, t, n) {
        e("./_wks-define")("asyncIterator");
    }, {
        "./_wks-define": 104
    } ],
    123: [ function(e, t, n) {
        e("./_wks-define")("observable");
    }, {
        "./_wks-define": 104
    } ],
    124: [ function(e, t, n) {
        e("./es6.array.iterator");
        for (var o = e("./_global"), r = e("./_hide"), i = e("./_iterators"), s = e("./_wks")("toStringTag"), c = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], a = 0; a < 5; a++) {
            var u = c[a], l = o[u], f = l && l.prototype;
            f && !f[s] && r(f, s, u), i[u] = i.Array;
        }
    }, {
        "./_global": 53,
        "./_hide": 55,
        "./_iterators": 68,
        "./_wks": 106,
        "./es6.array.iterator": 111
    } ],
    125: [ function(e, t, n) {
        function o() {
            throw new Error("setTimeout has not been defined");
        }
        function r() {
            throw new Error("clearTimeout has not been defined");
        }
        function i(e) {
            if (f === setTimeout) return setTimeout(e, 0);
            if ((f === o || !f) && setTimeout) return f = setTimeout, setTimeout(e, 0);
            try {
                return f(e, 0);
            } catch (t) {
                try {
                    return f.call(null, e, 0);
                } catch (t) {
                    return f.call(this, e, 0);
                }
            }
        }
        function s(e) {
            if (d === clearTimeout) return clearTimeout(e);
            if ((d === r || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
            try {
                return d(e);
            } catch (t) {
                try {
                    return d.call(null, e);
                } catch (t) {
                    return d.call(this, e);
                }
            }
        }
        function c() {
            b && g && (b = !1, g.length ? _ = g.concat(_) : h = -1, _.length && a());
        }
        function a() {
            if (!b) {
                var e = i(c);
                b = !0;
                for (var t = _.length; t; ) {
                    for (g = _, _ = []; ++h < t; ) g && g[h].run();
                    h = -1, t = _.length;
                }
                g = null, b = !1, s(e);
            }
        }
        function u(e, t) {
            this.fun = e, this.array = t;
        }
        function l() {}
        var f, d, p = t.exports = {};
        !function() {
            try {
                f = "function" == typeof setTimeout ? setTimeout : o;
            } catch (e) {
                f = o;
            }
            try {
                d = "function" == typeof clearTimeout ? clearTimeout : r;
            } catch (e) {
                d = r;
            }
        }();
        var g, _ = [], b = !1, h = -1;
        p.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            _.push(new u(e, t)), 1 !== _.length || b || i(a);
        }, u.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", 
        p.versions = {}, p.on = l, p.addListener = l, p.once = l, p.off = l, p.removeListener = l, 
        p.removeAllListeners = l, p.emit = l, p.binding = function(e) {
            throw new Error("process.binding is not supported");
        }, p.cwd = function() {
            return "/";
        }, p.chdir = function(e) {
            throw new Error("process.chdir is not supported");
        }, p.umask = function() {
            return 0;
        };
    }, {} ],
    126: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function r() {
            function e(e) {
                var t = e.detail, n = t.name, o = t.data;
                i && i[n].postMessage(o);
            }
            function t() {
                document.dispatchEvent(new CustomEvent("grammarly:pong")), document.dispatchEvent(new CustomEvent("grammarly:reset"));
            }
            function n(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return document.dispatchEvent(new CustomEvent("grammarly:message", {
                    detail: (0, a["default"])({
                        event: e
                    }, t)
                }));
            }
            function o() {
                document.removeEventListener("grammarly:action", e), document.removeEventListener("grammarly:ping", t), 
                document.removeEventListener("grammarly:reset", o), i = null;
            }
            function r(e) {
                var t = p.runtime.connect({
                    name: e
                });
                return t.onMessage.addListener(function(t) {
                    return n("message", {
                        msg: t,
                        name: e
                    });
                }), t.onDisconnect.addListener(function() {
                    console.warn("port malfunction " + e);
                    var t = p.runtime.lastError;
                    g.proxyPortDisconnected(e, t && t.message || "port malfunction: " + e), o(), document.dispatchEvent(new CustomEvent("grammarly:error", {
                        detail: {
                            event: "disconnect",
                            name: e
                        }
                    }));
                }), t;
            }
            var i = [ d.ports.bridge, d.ports.background, d.ports.broadcast ].reduce(function(e, t) {
                return (0, a["default"])({}, e, (0, s["default"])({}, t, r(t)));
            }, {});
            document.addEventListener("grammarly:action", e), document.addEventListener("grammarly:ping", t), 
            document.dispatchEvent(new CustomEvent("grammarly:proxyports")), document.addEventListener("grammarly:proxyports", o), 
            g.proxyInit();
        }
        var i = e("babel-runtime/helpers/defineProperty"), s = o(i), c = e("babel-runtime/core-js/object/assign"), a = o(c);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = e("config");
        u.initGlobal("chrome", "cs");
        var l = e("lib/tracking/felogPixel"), f = e("lib/tracking/telemetry"), d = e("extension-api/interface"), p = window.chrome || window.firefox, g = new f.Telemetry(l.sendEventPixel, function() {}, function() {}, function() {});
        "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", r, !1) : r();
    }, {
        "babel-runtime/core-js/object/assign": 5,
        "babel-runtime/helpers/defineProperty": 16,
        config: 130,
        "extension-api/interface": 135,
        "lib/tracking/felogPixel": 138,
        "lib/tracking/telemetry": 139
    } ],
    127: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o, r = e("stdlib"), i = e("./url"), s = e("./services");
        !function(e) {
            function t(e, t, c) {
                var a = "prod" === t ? "https://f-log-extension.grammarly.io" : "qa" === t || "dev" === t ? "https://127.0.0.1:8000" : r.assertNever(t), u = "prod" === t ? o : "qa" === t || "dev" === t ? "qagr.io" : r.assertNever(t);
                return {
                    url: i.UrlConfig.create(o, a, c),
                    gnar: s.GnarConfig.create(e, u),
                    felog: s.FelogConfig.create(e),
                    extensionId: n
                };
            }
            var n = "87677a2c52b84ad3a151a4a72f5bd3c4", o = "grammarly.com";
            e.create = t;
        }(o = n.AppConfig || (n.AppConfig = {}));
    }, {
        "./services": 132,
        "./url": 134,
        stdlib: 142
    } ],
    128: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o, r = e("stdlib");
        !function(e) {
            function t(e, t, n, o, r, i, s) {
                var c = void 0 !== i && void 0 !== s ? i : "UNVERSIONED", a = e + "." + t + "." + n, u = [ "prod" !== r ? r : null, c !== o ? c : null ].filter(function(e) {
                    return !!e;
                }).join(".");
                return {
                    version: a,
                    fullVersion: a + "-" + [ o, u ].filter(function(e) {
                        return "" !== e;
                    }).join("/"),
                    commitHash: s,
                    gitBranch: i
                };
            }
            function n(e, t, n) {
                try {
                    switch (e) {
                      case "safari":
                        switch (t) {
                          case "bg":
                          case "popup":
                            return n.safari.extension.displayVersion;

                          default:
                            return;
                        }

                      case "chrome":
                        return n.chrome.runtime.getManifest().version;

                      case "firefox":
                        return n.firefox.runtime.getManifest().version;

                      case "edge":
                        return n.edge.runtime.getManifest().version;

                      default:
                        return r.assertNever(e);
                    }
                } catch (o) {
                    return void console.error("Could not get extension version from manifest", o);
                }
            }
            e.create = t, e.getManifestVersion = n;
        }(o = n.BuildInfo || (n.BuildInfo = {}));
    }, {
        stdlib: 142
    } ],
    129: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o, r = e("stdlib");
        !function(e) {
            function t(e) {
                return r.optionalStringUnion([ "chrome", "safari", "firefox", "edge" ], e);
            }
            function n(e) {
                return e.chrome && /google/i.test(e.navigator.vendor) ? "chrome" : e.navigator.userAgent.indexOf("Firefox") !== -1 ? "firefox" : /^((?!chrome).)*safari/i.test(e.navigator.userAgent) ? "safari" : "Netscape" === e.navigator.appName && e.navigator.appVersion.indexOf("Edge") > -1 ? "edge" : void 0;
            }
            e.create = t, e.detect = n;
        }(o = n.TargetBrowser || (n.TargetBrowser = {}));
        var i;
        !function(e) {
            function t(e) {
                return r.optionalStringUnion([ "dev", "prod", "qa" ], e);
            }
            e.create = t;
        }(i = n.TargetEnv || (n.TargetEnv = {}));
        var s;
        !function(e) {
            function t(e) {
                return r.optionalStringUnion([ "bg", "cs", "popup" ], e);
            }
            function n(e, t) {
                function n() {
                    try {
                        return e.safari.extension.globalPage.contentWindow !== e;
                    } catch (t) {
                        return !1;
                    }
                }
                var o = !!e.IS_BG, r = "safari" === t ? n() : !!e.IS_POPUP;
                return o ? "bg" : r ? "popup" : "cs";
            }
            e.create = t, e.detect = n;
        }(s = n.TargetContext || (n.TargetContext = {}));
        var c;
        !function(e) {
            function t(e, t, n) {
                return {
                    browser: e,
                    env: t,
                    context: n
                };
            }
            e.create = t;
        }(c = n.BundleInfo || (n.BundleInfo = {}));
    }, {
        stdlib: 142
    } ],
    130: [ function(e, t, n) {
        "use strict";
        function o(e) {
            for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t]);
        }
        function r() {
            return u.get();
        }
        function i(e, t, n) {
            u.init(s.MainConfig.create(e, t, n || s.ProcessEnv.fromBrowserify())), window.GR_CFG = u.get();
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), o(e("./app")), o(e("./build")), o(e("./bundle")), o(e("./services")), o(e("./system")), 
        o(e("./url")), o(e("./mainConfig"));
        var s = e("./mainConfig"), c = e("./bundle"), a = e("stdlib"), u = new a.Global(function() {
            console.warn("Global config not initialized -- using fall back value.");
            var e = a.assertNonNull(c.TargetBrowser.detect(window), "runtime-detected browser type"), t = s.MainConfig.create(e, c.TargetContext.detect(window, e), s.ProcessEnv.fromBrowserify());
            return window.GR_CFG = t, t;
        });
        n.getGlobal = r, n.initGlobal = i;
    }, {
        "./app": 127,
        "./build": 128,
        "./bundle": 129,
        "./mainConfig": 131,
        "./services": 132,
        "./system": 133,
        "./url": 134,
        stdlib: 142
    } ],
    131: [ function(e, t, n) {
        (function(t) {
            "use strict";
            function o(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            var r = e("babel-runtime/helpers/slicedToArray"), i = o(r);
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var s, c = e("./app"), a = e("./build"), u = e("./system"), l = e("./bundle"), f = e("stdlib");
            !function(e) {
                function n(e, t, n, o, r, i, s) {
                    return {
                        env: e,
                        major_number: t,
                        build_number: n,
                        release_number: o,
                        git_branch: r,
                        git_commit: i,
                        popup_url: s
                    };
                }
                function o() {
                    return n("prod", "14", "794", "1083", t.env.GIT_BRANCH, "9a2e211e63c063be2ea48c13d2448ef885669f14", "https://s3.amazonaws.com/grammarly_neweditor/index/1.0.87-browserplugin_2.0/popup.html");
                }
                e.create = n, e.fromBrowserify = o;
            }(s = n.ProcessEnv || (n.ProcessEnv = {}));
            var d;
            !function(e) {
                function t(e, t, n) {
                    var o = void 0;
                    if (n.env) {
                        var r = l.TargetEnv.create(n.env);
                        void 0 !== r ? o = r : (console.warn("*** process.env.ENV is invalid ('" + n.env + "'), assuming 'prod' env"), 
                        o = "prod");
                    } else console.warn("*** process.env.ENV is not defined, assuming 'prod' env"), 
                    o = "prod";
                    var s = f.assertNonNull(o, "ENV env var OR a fallback value"), d = [ n.major_number, n.build_number, n.release_number ].map(f.optionalIntString), p = void 0;
                    if (3 === d.length && d.every(function(e) {
                        return void 0 !== e;
                    })) p = d; else {
                        var g = (a.BuildInfo.getManifestVersion(e, t, window) || "").split(".").map(f.optionalIntString);
                        p = 3 === g.length && g.every(function(e) {
                            return void 0 !== e;
                        }) ? g : [ 4, 0, 2 ];
                    }
                    var _ = p, b = (0, i["default"])(_, 3), h = b[0], v = b[1], m = b[2];
                    return {
                        buildInfo: a.BuildInfo.create(h, v, m, e, s, n.git_branch, n.git_commit),
                        bundleInfo: l.BundleInfo.create(e, s, t),
                        appConfig: c.AppConfig.create(e, s, n.popup_url),
                        systemInfo: u.SystemInfo.create(e, window)
                    };
                }
                e.create = t;
            }(d = n.MainConfig || (n.MainConfig = {}));
        }).call(this, e("_process"));
    }, {
        "./app": 127,
        "./build": 128,
        "./bundle": 129,
        "./system": 133,
        _process: 125,
        "babel-runtime/helpers/slicedToArray": 19,
        stdlib: 142
    } ],
    132: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o, r = e("stdlib");
        !function(e) {
            function t(e, t) {
                return {
                    appName: r.assertNonNull(n[e], "gnar app name"),
                    url: "https://gnar." + t,
                    domain: "." + t
                };
            }
            var n = {
                chrome: "chromeExt",
                firefox: "firefoxExt",
                safari: "safariExt",
                edge: "edgeExt"
            };
            e.create = t;
        }(o = n.GnarConfig || (n.GnarConfig = {}));
        var i;
        !function(e) {
            function t(e) {
                return {
                    appName: r.assertNonNull(n[e], "felog app name")
                };
            }
            var n = {
                chrome: "extensionChrome",
                firefox: "extensionFirefox",
                safari: "extensionSafari",
                edge: "extensionEdge"
            };
            e.create = t;
        }(i = n.FelogConfig || (n.FelogConfig = {}));
    }, {
        stdlib: 142
    } ],
    133: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o, r = e("./bundle"), i = e("stdlib");
        !function(e) {
            function t(e, t) {
                var n = r.TargetBrowser.detect(t) || "other";
                return {
                    type: n,
                    isWE: "firefox" === e ? i.try_(function() {
                        return !!firefox.runtime;
                    }, function(e) {
                        return !1;
                    }) : "chrome" === e || "edge" === e
                };
            }
            e.create = t;
        }(o = n.BrowserInfo || (n.BrowserInfo = {}));
        var s;
        !function(e) {
            function t(e) {
                return {
                    isWindows: e.navigator.appVersion.indexOf("Win") !== -1
                };
            }
            e.create = t;
        }(s = n.OsInfo || (n.OsInfo = {}));
        var c;
        !function(e) {
            function t(e, t) {
                return {
                    browser: o.create(e, t),
                    os: s.create(t)
                };
            }
            e.create = t;
        }(c = n.SystemInfo || (n.SystemInfo = {}));
    }, {
        "./bundle": 129,
        stdlib: 142
    } ],
    134: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o;
        !function(e) {
            function t(e, t, n) {
                var o = "https://www." + e, r = "https://data." + e, i = "https://app." + e, s = "https://auth." + e + "/v3", c = "https://emailfeedback." + e;
                return {
                    app: i,
                    appPersonalDictionary: i + "/profile/dictionary",
                    capi: "wss://capi." + e + "/freews",
                    dapiMimic: r + "/api/mimic",
                    dapiProps: r + "/api/props",
                    editorDictionary: i + "/profile/dictionary",
                    dictionary: "https://capi." + e + "/api/defs",
                    docs: i + "/docs",
                    docsApi: "https://dox." + e + "/documents",
                    authCreatePage: s + "/redirect-anonymous?location=" + o + "/after_install_page",
                    userOrAnonymous: s + "/user/oranonymous",
                    authSignin: s + "/login",
                    authSignup: s + "/signup",
                    signin: o + "/signin",
                    signup: o + "/signup",
                    resetPassword: o + "/resetpassword",
                    saveEmailFeedback: c + "/api/feedback/",
                    newFelog: t,
                    referral: o + "/referral?page=extension",
                    welcomeC: o + "/extension-success",
                    upgrade: o + "/upgrade",
                    uninstall: o + "/extension-uninstall",
                    terms: o + "/terms",
                    policy: o + "/privacy-policy",
                    pageConfigUrl: "https://d3cv4a9a9wh0bt.cloudfront.net/browserplugin/config.json",
                    popupUrl: n,
                    grammarlyDomain: e
                };
            }
            e.create = t;
        }(o = n.UrlConfig || (n.UrlConfig = {}));
    }, {} ],
    135: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.ports = {
            bridge: "bridge",
            background: "message:to-priv",
            broadcast: "message:to-non-priv"
        };
    }, {} ],
    136: [ function(e, t, n) {
        "use strict";
        function o() {
            return !!window.__extensionTestsMode;
        }
        function r() {
            return b.appConfig.extensionId;
        }
        function i() {
            return "firefox" === b.bundleInfo.browser;
        }
        function s() {
            return "chrome" === b.bundleInfo.browser;
        }
        function c() {
            return "safari" === b.bundleInfo.browser;
        }
        function a() {
            return "edge" === b.bundleInfo.browser;
        }
        function u() {
            return b.systemInfo.os.isWindows;
        }
        function l() {
            return "bg" === b.bundleInfo.context;
        }
        function f() {
            return "popup" === b.bundleInfo.context;
        }
        function d() {
            return l() || f();
        }
        function p() {
            return b.bundleInfo.browser;
        }
        function g() {
            return b.buildInfo.version;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var _ = e("config"), b = _.getGlobal();
        n.isTestsMode = o, n.getUuid = r, n.isFF = i, n.isChrome = s, n.isSafari = c, n.isEdge = a, 
        n.isWindows = u, n.isBg = l, n.isPopup = f, n.isBgOrPopup = d, n.getBrowser = p, 
        n.getVersion = g, n.ENV = b.bundleInfo.env, n.URLS = b.appConfig.url, n.appName = b.appConfig.felog.appName, 
        n.gnarAppName = b.appConfig.gnar.appName, n.GRAMMARLY_DOMAIN = b.appConfig.url.grammarlyDomain;
    }, {
        config: 130
    } ],
    137: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function r(e, t, n, o, r, i, s, u, l) {
            var f = {
                message: i,
                logger: r,
                level: a.toFelogString(s),
                application: e,
                version: t,
                userId: l && l.userId,
                containerId: l && l.containerId,
                env: n
            };
            return u && (f.extra = u), o + "/log?json=" + encodeURIComponent((0, c["default"])(f));
        }
        function i(e, t, n, o, r, i, s, u) {
            var l = {
                message: i,
                logger: r,
                level: a.toFelogString(s),
                application: e,
                version: t,
                env: n,
                extra_usage: u
            };
            return o + "/log?json=" + encodeURIComponent((0, c["default"])(l));
        }
        var s = e("babel-runtime/core-js/json/stringify"), c = o(s);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a;
        !function(e) {
            e[e.INFO = 0] = "INFO", e[e.WARN = 1] = "WARN", e[e.ERROR = 2] = "ERROR";
        }(a = n.LogLevel || (n.LogLevel = {})), function(e) {
            function t(t) {
                switch (t) {
                  case e.INFO:
                    return "INFO";

                  case e.WARN:
                    return "WARN";

                  case e.ERROR:
                    return "ERROR";

                  default:
                    ;
                    throw new TypeError("Unrecognized log level " + t);
                }
            }
            e.toFelogString = t;
        }(a = n.LogLevel || (n.LogLevel = {})), n.felogRequestUrl = r, n.felogUsageRequestUrl = i;
    }, {
        "babel-runtime/core-js/json/stringify": 4
    } ],
    138: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function r(e, t, n, o, r) {
            var i = document.createElement("img");
            return i.src = a.felogRequestUrl(c.appName, c.getVersion(), c.ENV, c.URLS.newFelog, e, t, n, o, r), 
            s["default"].resolve();
        }
        var i = e("babel-runtime/core-js/promise"), s = o(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("../newConfig"), a = e("./felog");
        n.sendEventPixel = r;
    }, {
        "../newConfig": 136,
        "./felog": 137,
        "babel-runtime/core-js/promise": 11
    } ],
    139: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var r = e("babel-runtime/core-js/json/stringify"), i = o(r), s = e("babel-runtime/helpers/classCallCheck"), c = o(s), a = e("babel-runtime/helpers/createClass"), u = o(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = e("./felog"), f = .1, d = .05, p = function() {
            function e(t, n, o, r) {
                var i = this;
                (0, c["default"])(this, e), this._sendFelog = t, this._sendFelogUsage = n, this._setUserId = o, 
                this._setContainerId = r, this.pageLoadTimeout = function() {
                    i._send("cs.connection.failover.pageLoad.timeout", "content script init failed", l.LogLevel.ERROR);
                }, this.appLoadTimeout = function() {
                    i._send("cs.connection.failover.appLoad.timeout", "extension init timed out", l.LogLevel.ERROR);
                }, this.differentStateDomain = function(e) {
                    i._send("cs.state.differentDomain", "received state for different domain", l.LogLevel.INFO, {
                        stateDomain: e
                    });
                }, this.restoredBgConnection = function(e) {
                    i._send("cs.connection.bg.restored", "bg page connection restored", l.LogLevel.INFO, {
                        timeWithoutConnection: e
                    });
                }, this.initWithoutBgConnection = function() {
                    i._send("cs.connection.bg.disconnected", "no connection to bg page", l.LogLevel.INFO);
                }, this.fetchDefinitionsFail = function() {
                    i._send("cs.connection.api.definition.failed", "definitions fetch failed", l.LogLevel.WARN);
                }, this.infinityCheckResetFail = function(e) {
                    i._send("cs.connection.infiniteCheck.failed", "infinite check reset failed", l.LogLevel.ERROR, {
                        delay: e
                    });
                }, this.tooLongPageConfigInit = function(e) {
                    i._send("cs.pageConfig.init.exceeded", "page config init timeout", l.LogLevel.WARN, {
                        initTime: e
                    });
                }, this.tooLongUserUpdateTime = function(e) {
                    i._send("bg.state.user.update.exceeded", "user state update took too long", l.LogLevel.WARN, {
                        updateTime: e
                    });
                }, this.lostBgPageConnection = function() {
                    i._send("cs.gbutton.bgСonnection.lost", "gbutton connection to bg page lost", l.LogLevel.INFO);
                }, this.restoreBgPageConnection = function(e) {
                    i._send("cs.gbutton.bgСonnection.restored", "gbutton connection to bg page restored", l.LogLevel.INFO, {
                        time: e
                    });
                }, this.badCursorPosition = function() {
                    i._send("cs.editor.badCursorPosition", "incorrect cursor position in grammarly-editor", l.LogLevel.INFO);
                }, this.cursorJump = function() {
                    i._send("cs.editor.cursorJump", "cursor jump detected", l.LogLevel.WARN);
                }, this.signinOpen = function() {
                    i._send("cs.signin.open", "sign in dialog opened", l.LogLevel.INFO);
                }, this.signinClose = function(e) {
                    i._send("cs.signin.close", "sign in dialog closed", l.LogLevel.INFO, {
                        openTime: e
                    });
                }, this.tabReloadClick = function() {
                    i._send("cs.gbutton.reload.click", "gbutton reload clicked", l.LogLevel.WARN);
                }, this.popupLoadError = function(e, t) {
                    i._send("cs.popup.load.error", "could not open pop-up editor", l.LogLevel.ERROR, {
                        message: e,
                        name: t
                    });
                }, this.loginNoBgPageConnection = function(e) {
                    i._send("debug.cs.connection.signin.bg.timeout", "can not connect to bg page on login", l.LogLevel.INFO, {
                        message: e
                    });
                }, this.pageConfigCDNError = function(e) {
                    i._send("cs.pageConfig.cdn.error", "could not read page config", l.LogLevel.ERROR, {
                        message: e
                    });
                }, this.pageConfigLocalStorageError = function(e, t) {
                    i._send("cs.pageConfig.localStorage.error", "could not read page config from localStorage", l.LogLevel.INFO, {
                        message: e,
                        name: t
                    });
                }, this.pageConfigUpdated = function(e, t) {
                    i._send("cs.pageConfig.updated", "page config updated", l.LogLevel.INFO, {
                        oldVersion: e,
                        newVersion: t
                    });
                }, this.settingsPopupTimeout = function() {
                    i._send("settings.popup.init.timeout", "settings popup open timeout", l.LogLevel.WARN);
                }, this.settingsUsupportedShow = function(e) {
                    i._send("settings.popup.state.unsupported.show", "page unsupported message shown", l.LogLevel.INFO, {
                        popupType: e
                    });
                }, this.settingsPopupToggled = function(e) {
                    i._send("settings.popup.experiment.toggle", "settings popup disabled/enabled for experiment on /personalize page", l.LogLevel.INFO, {
                        isPopupDisabled: e
                    });
                }, this.socketBgError = function() {
                    i._send("bg.socket.error", "bg page socket error", l.LogLevel.WARN);
                }, this.capiNotAuthorizedLoop = function(e, t) {
                    i._send("debug.socket.notAuthorizedLoop", "could not authenticate on capi and auth", l.LogLevel.INFO, {
                        authDegradation: e,
                        cookiesDisabled: t
                    });
                }, this.socketDisabledCookie = function() {
                    i._send("debug.socket.disabledCookies", "disabled cookies after failed authentication", l.LogLevel.INFO);
                }, this.socketBgRestored = function(e) {
                    i._send("debug.bg.socket.restored", "capi session restored", l.LogLevel.INFO, {
                        tryCount: e
                    });
                }, this.socketBgReconnectFail = function(e, t) {
                    i._send("bg.socket.reconnect.fail", "could not restore ws connection", l.LogLevel.WARN, {
                        token: e,
                        tryCount: t
                    });
                }, this.socketCsError = function() {
                    i._send("cs.socket.error", "content script socket error", l.LogLevel.WARN);
                }, this.soketCsErrorMsg = function(e) {
                    i._send("cs.socket.errorMsg", "capi error", l.LogLevel.WARN, {
                        message: e
                    });
                }, this.gnarClientInitFail = function(e) {
                    i._send("gnar.bg.tracking.gnar.init.fail", "gnar init failed", l.LogLevel.WARN, {
                        message: e
                    });
                }, this.bgTrackingInitFail = function() {
                    i._send("debug.tracking.init.fail", "bg page tracking library init failed", l.LogLevel.INFO);
                }, this.dailyPing = function() {
                    i._send("debug.dailyPing", "daily ping", l.LogLevel.INFO);
                }, this.userUpgradeClick = function(e) {
                    i._send("cs.ui.action.upgradeClick", "upgrade hook clicked", l.LogLevel.INFO, {
                        placement: e
                    });
                }, this.gButtonClick = function() {
                    i._send("cs.ui.gbutton.click", "gbutton clicked", l.LogLevel.INFO);
                }, this.checkingToggledInField = function(e) {
                    i._send("cs.ui.gbutton.toggleInField", "checking toggled in field", l.LogLevel.INFO, {
                        enabled: e
                    });
                }, this.sessionInvalidated = function(e, t) {
                    i._send("bg.session.invalidated", "user session invalidated", l.LogLevel.INFO, {
                        reason: e,
                        userChanged: t
                    });
                }, this.unexpectedAnonymous = function(e) {
                    i._send("debug.bg.session.unexpectedAnonymous", "user changed to anonymous", l.LogLevel.INFO, e);
                }, this.dapiPropInitialized = function(e, t) {
                    i._send("bg.settings.dapi.prop.init", "save property to the DAPI", l.LogLevel.INFO, {
                        name: e,
                        value: t
                    });
                }, this.getDapiPropError = function(e, t) {
                    i._send("bg.connection.dapi.getProp.error", "could not get dapi property", l.LogLevel.WARN, {
                        property: e,
                        body: t
                    });
                }, this.setDapiPropError = function(e, t) {
                    i._send("bg.connection.dapi.setProp.error", "could not set dapi property", l.LogLevel.WARN, {
                        property: e,
                        body: t
                    });
                }, this.toggleExtensionDefs = function(e) {
                    i._send("bg.settings.definitions.toggle", "definitions toggled for domain", l.LogLevel.INFO, {
                        enabled: e
                    });
                }, this.toggleExtension = function(e, t) {
                    i._send("bg.settings.extension.toggle", "extension toggled for domain", l.LogLevel.INFO, {
                        enabled: e,
                        placement: t
                    });
                }, this.disableUntilNextVisit = function() {
                    i._send("cs.gbutton.disableUntilNextVisit", "extension temporary disabled on the current tab", l.LogLevel.INFO);
                }, this.disableButtonClick = function() {
                    i._send("cs.gbutton.disableButtonClick", "clicked on disable button in gButton", l.LogLevel.INFO);
                }, this.cookieOverflow = function(e, t) {
                    i._send("debug.bg.state.cookie.overflow", "cookie is too big", l.LogLevel.INFO, {
                        size: e,
                        biggestCookie: t
                    });
                }, this.externalChangePlan = function() {
                    i._send("bg.api.external.changePlan", "plan changed from editor", l.LogLevel.INFO);
                }, this.externalChangeDialect = function() {
                    i._send("bg.api.external.changeDialect", "dialect changed from editor", l.LogLevel.INFO);
                }, this.externalChangeUser = function() {
                    i._send("bg.api.external.changeUsed", "user changed from editor", l.LogLevel.INFO);
                }, this.externalLogout = function() {
                    i._send("bg.api.external.logout", "user logged out form editor", l.LogLevel.INFO);
                }, this.externalEnableEmailPerception = function() {
                    i._send("bg.api.external.enableEmailPerception", "user enabled email perception feature on the funnel", l.LogLevel.INFO);
                }, this.bgPageStartFail = function(e, t) {
                    i._send("bg.start.fail", "bg page start failed", l.LogLevel.ERROR, {
                        message: e,
                        stack: t
                    });
                }, this.bgPageInitTimeout = function(e) {
                    i._send("bg.state.start.timeout", "bg page init timeout", l.LogLevel.WARN, {
                        initTime: e
                    });
                }, this.bgPageInitFail = function(e) {
                    i._send("bg.state.init.fail", "bg page init failed", l.LogLevel.ERROR, {
                        initAttempts: e
                    });
                }, this.extensionUpdated = function(e, t) {
                    i._send("bg.state.updated", "extension updated", l.LogLevel.INFO, {
                        currentVersion: e,
                        previousVersion: t
                    });
                }, this.extensionUpdateFail = function(e) {
                    i._send("bg.state.update.fail", "extension update failed", l.LogLevel.INFO, {
                        previousVersion: e
                    });
                }, this.cannotGetInstallSource = function() {
                    i._send("bg.getSource.fail", "failed to get extension install source", l.LogLevel.WARN);
                }, this.extensionInstall = function(e) {
                    i._send("bg.state.install", "extension installed", l.LogLevel.INFO, {
                        source: e
                    });
                }, this.chromeForcedToUpdate = function(e) {
                    i._send("bg.chrome.forcedToUpdate", "chrome forced update", l.LogLevel.INFO, {
                        newVersion: e
                    });
                }, this.chromeContentScriptLoadError = function(e, t) {
                    i._send("bg.chrome.cs.load.error", "content script execution error", l.LogLevel.WARN, {
                        message: e,
                        type: t
                    });
                }, this.reloadNotificationShow = function() {
                    i._send("bg.ui.notification.tabsReload.show", "extension reload notification shown", l.LogLevel.WARN);
                }, this.reloadNotificationClick = function() {
                    i._send("bg.ui.notification.tabsReload.click", "reload notification clicked", l.LogLevel.INFO);
                }, this.fetchUserFail = function(e, t, n) {
                    i._send("bg.user.fetch.fail", "failed to update user", l.LogLevel.WARN, {
                        body: t,
                        statusCode: n,
                        reason: e
                    });
                }, this.fetchMimicFail = function(e, t) {
                    i._send("bg.user.mimic.fail", "mimic request failed", l.LogLevel.WARN, {
                        body: e,
                        statusCode: t
                    });
                }, this.fetchCookieFail = function() {
                    i._send("bg.cookie.fail", "could not get grauth from cookie", l.LogLevel.WARN);
                }, this.fetchSettingsFail = function(e, t) {
                    i._send("bg.user.settings.fail", "could not get settings from auth", l.LogLevel.WARN, {
                        body: e,
                        statusCode: t
                    });
                }, this.frequentCookieChanges = function(e) {
                    i._send("debug.cookie.onChange.error", "cookie change too frequent", l.LogLevel.INFO, {
                        canceled: e
                    });
                }, this.initializePropFromDapi = function(e) {
                    i._send("bg.state.dapi.prop.initialize", "set property from dapi", l.LogLevel.INFO, {
                        name: e
                    });
                }, this.emailPerceptionPopupShow = function() {
                    i._send("cs.emailPerception.popup.show", "show email perception popup on gmail/inbox domain", l.LogLevel.INFO);
                }, this.emailPerceptionPopupCancel = function() {
                    i._send("cs.emailPerception.popup.cancel", "user canceled email perception popup on gmail/inbox", l.LogLevel.INFO);
                }, this.emailPerceptiongButtonHover = function() {
                    i._send("cs.emailPerception.gbutton.hover", "user hovered gButton and ask for feedback btn is shown on gmail/inbox", l.LogLevel.INFO);
                }, this.onboardingPopupShow = function() {
                    i._send("cs.onboarding.popup.show", "show onboarding popup to user after first time extension install", l.LogLevel.INFO);
                }, this.onboardingPopupCancel = function() {
                    i._send("cs.onboarding.popup.cancel", "user canceled onboarding popup", l.LogLevel.INFO);
                }, this.onboardingTutorialShow = function() {
                    i._send("cs.onboarding.tutorial.show", "opened onboarding dialog after popup", l.LogLevel.INFO);
                }, this.onboardingVideoLoaded = function() {
                    i._send("cs.onboarding.tutorial.video.loaded", "load video data for onboarding tutorial", l.LogLevel.INFO);
                }, this.saveEmailFeedbackError = function(e) {
                    i._send("bg.emailfeedback.save.error", "failed to save email feedback", l.LogLevel.INFO, {
                        body: e
                    });
                }, this.incognitoInit = function() {
                    i._send("bg.incognito.init", "extension initialized in incognito mode", l.LogLevel.INFO);
                }, this.disabledCookiesInit = function() {
                    i._send("bg.cookie.disabled", "extension initialized with disabled cookies", l.LogLevel.INFO);
                }, this.proxyInit = function() {
                    i._sendWithProbability(d, "proxy.init", "proxy script initialized", l.LogLevel.INFO);
                }, this.proxyPortDisconnected = function(e, t) {
                    i._sendWithProbability(d, "proxy.disconnect", "proxy port disconnected", l.LogLevel.INFO, {
                        port: e,
                        error: t
                    });
                }, this.unhandledBgPageException = function(e) {
                    i._send("bg.unhandledException", "unhandled exception on background page", l.LogLevel.ERROR, {
                        message: e.error ? e.error.message : e.message
                    });
                }, this.unhandledBgPageRejection = function(e) {
                    i._send("bg.unhandledRejection", "unhandled promise rejection on background page", l.LogLevel.ERROR, {
                        message: null != e.reason ? "string" == typeof e.reason ? e.reason : e.reason.message : void 0
                    });
                }, this.storageMigrationSucceeded = function() {
                    i._send("bg.storageMigration.success", "storage migration succeeded", l.LogLevel.INFO, {});
                }, this.storageMigrationFailed = function(e) {
                    i._send("bg.storageMigration.failure", "storage migration failed", l.LogLevel.ERROR, {
                        message: e && e.message
                    });
                }, this.cardShowAction = function() {
                    i._sendWithProbability(f, "cs.editor.card.show", "show card action", l.LogLevel.INFO);
                }, this.cardHideAction = function() {
                    i._sendWithProbability(f, "cs.editor.card.hide", "hide card action", l.LogLevel.INFO);
                }, this.cardReplacementAction = function() {
                    i._sendWithProbability(f, "cs.editor.card.replacement", "click on the replacement in the card", l.LogLevel.INFO);
                }, this.cardAddToDictAction = function() {
                    i._sendWithProbability(f, "cs.editor.card.addToDict", "click add to dictionary button in the card", l.LogLevel.INFO);
                }, this.cardIgnoreAction = function() {
                    i._sendWithProbability(f, "cs.editor.card.ignore", "click ignore button in the card", l.LogLevel.INFO);
                }, this.synonymCardShowAction = function(e) {
                    i._sendWithProbability(f, "cs.editor.synonym.show", "show synonymous card action", l.LogLevel.INFO, {
                        notFoundCard: e
                    });
                }, this.synonymCardHideAction = function(e) {
                    i._sendWithProbability(f, "cs.editor.synonym.hide", "hide synonymous card action", l.LogLevel.INFO, {
                        notFoundCard: e
                    });
                }, this.synonymReplacementAction = function() {
                    i._sendWithProbability(f, "cs.editor.synonym.replacement", "click on the replacement in the synonym", l.LogLevel.INFO);
                }, this.dictCardShowAction = function() {
                    i._sendWithProbability(f, "cs.editor.dict.show", "show dictionary card action", l.LogLevel.INFO);
                }, this.dictCardHideAction = function() {
                    i._sendWithProbability(f, "cs.editor.dict.hide", "hide dictionary card action", l.LogLevel.INFO);
                }, this.couldNotParseTransform = function(e, t) {
                    i._send("cs.cards.transforms.parse.error", "Could not parse transform in inline cards", l.LogLevel.WARN, {
                        transformHTML: e,
                        fallbackParseSuccessful: t
                    });
                }, this.disabledTabLoad = function(e, t) {
                    i._sendUsage("usage.loadOnDisabledTab", "tab load event with disabled extension", l.LogLevel.INFO, {
                        domain: e,
                        accountType: t
                    });
                }, this.initSession = function(e, t, n, o) {
                    i._sendUsage("usage.session.init", "init in the field", l.LogLevel.INFO, {
                        domain: e,
                        accountType: t,
                        fieldType: n,
                        fieldSupported: o
                    });
                }, this.cardFirstInteraction = function(e, t, n) {
                    i._sendUsage("usage.card.interaction", "interaction with card in the field", l.LogLevel.INFO, {
                        domain: e,
                        accountType: t,
                        fieldType: n
                    });
                };
            }
            return (0, u["default"])(e, [ {
                key: "_send",
                value: function(e, t, n, o) {
                    var r = void 0;
                    try {
                        r = (0, i["default"])(o);
                    } catch (s) {
                        r = "Failed to stringify event properties: '" + s + "', '" + (s && s.message) + "'", 
                        console.warn(r, "for " + t + "@" + e);
                    }
                    try {
                        this._sendFelog(e, t, n, null != o ? {
                            json: r
                        } : void 0);
                    } catch (s) {
                        console.warn("Failed to send felog for " + t + "@" + e + ": '" + s + "', '" + (s && s.message) + "'");
                    }
                }
            }, {
                key: "_sendUsage",
                value: function(e, t, n, o) {
                    this._sendFelogUsage(e, t, n, o);
                }
            }, {
                key: "_sendWithProbability",
                value: function(e, t, n, o, r) {
                    e > Math.random() && this._send(t, n, o, r);
                }
            }, {
                key: "setUserId",
                value: function(e) {
                    this._setUserId(e);
                }
            }, {
                key: "setContainerId",
                value: function(e) {
                    this._setContainerId(e);
                }
            }, {
                key: "notificationShown",
                value: function(e) {
                    this._send("cs.notification.show", "show notification on the page", l.LogLevel.INFO, {
                        type: e
                    });
                }
            }, {
                key: "notificationHide",
                value: function(e) {
                    this._send("cs.notification.hide", "hide notification on the page", l.LogLevel.INFO, {
                        type: e
                    });
                }
            } ]), e;
        }();
        n.Telemetry = p;
    }, {
        "./felog": 137,
        "babel-runtime/core-js/json/stringify": 4,
        "babel-runtime/helpers/classCallCheck": 14,
        "babel-runtime/helpers/createClass": 15
    } ],
    140: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function r(e, t) {
            var n;
            return (n = []).concat.apply(n, (0, b["default"])(t.map(e)));
        }
        function i(e, t, n) {
            for (var o = [ t ], r = t, i = 0; i < n.length; i++) r = e(r, n[i]), o.push(r);
            return o;
        }
        function s(e) {
            return e.reduce(function(e, t) {
                return t > e ? t : e;
            }, e[0]);
        }
        function c(e, t) {
            return 0 === e.length ? void 0 : e.reduce(function(e, n) {
                var o = t(n);
                return o > e[1] ? [ n, o ] : e;
            }, [ e[0], t(e[0]) ])[0];
        }
        function a(e) {
            return e.slice().reverse();
        }
        function u(e, t) {
            for (var n = [], o = [], r = 0, i = 0, s = 0; s < t.length; s++) e(t[s]) ? n[r++] = t[s] : o[i++] = t[s];
            return [ n, o ];
        }
        function l(e, t) {
            if (e < 1) throw new Error("Invalid chunk size, expected > 0");
            if (0 === t.length) return [ [] ];
            for (var n = [], o = 0; o < Math.ceil(t.length / e); o++) n.push(t.slice(o * e, (o + 1) * e));
            return n;
        }
        function f(e, t) {
            for (var n = [], o = e(t); void 0 !== o; ) n.push(o[0]), o = e(o[1]);
            return n;
        }
        function d(e, t) {
            return void 0 !== t ? (0, g["default"])(Array(t - e), function(t, n) {
                return n + e;
            }) : (0, g["default"])(Array(e), function(e, t) {
                return t;
            });
        }
        var p = e("babel-runtime/core-js/array/from"), g = o(p), _ = e("babel-runtime/helpers/toConsumableArray"), b = o(_);
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.flatMap = r, n.scan = i, n.maximum = s, n.maximumBy = c, n.reverse = a, n.partition = u, 
        n.chunkBySize = l, n.unfold = f, n.range = d;
    }, {
        "babel-runtime/core-js/array/from": 1,
        "babel-runtime/helpers/toConsumableArray": 20
    } ],
    141: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function r(e, t) {
            if (!e) throw new g(t);
        }
        function i(e, t) {
            if (null == e) throw new g(function() {
                return t ? "Expected " + t + " to be non-null" : "Expected non-null";
            });
            return e;
        }
        var s = e("babel-runtime/core-js/object/get-prototype-of"), c = o(s), a = e("babel-runtime/helpers/classCallCheck"), u = o(a), l = e("babel-runtime/helpers/possibleConstructorReturn"), f = o(l), d = e("babel-runtime/helpers/inherits"), p = o(d);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = function(e) {
            function t(e) {
                return (0, u["default"])(this, t), (0, f["default"])(this, (t.__proto__ || (0, c["default"])(t)).call(this, "Assertion failed: " + (e ? "string" == typeof e ? e : e() : "(unnamed)")));
            }
            return (0, p["default"])(t, e), t;
        }(Error);
        n.AssertionError = g, n.assert = r, n.assertNonNull = i;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 8,
        "babel-runtime/helpers/classCallCheck": 14,
        "babel-runtime/helpers/inherits": 17,
        "babel-runtime/helpers/possibleConstructorReturn": 18
    } ],
    142: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function r(e, t) {
            return e.some(function(e) {
                return e === t;
            }) ? t : void 0;
        }
        function i(e, t, n) {
            var o = r(e, t);
            if (void 0 !== o) return o;
            throw new TypeError('Unrecognized string union value "' + t + '"' + (n ? " for " + n : ""));
        }
        function s(e) {
            throw new k(e);
        }
        function c(e) {
            var t = parseInt(e, 10);
            return isNaN(t) ? void 0 : t;
        }
        function a(e, t) {
            var n = c(e);
            if (void 0 !== n) return n;
            throw new Error("Expected a number string, got '" + e + "'" + (void 0 !== t ? " for " + t : ""));
        }
        function u(e, t) {
            try {
                return e();
            } catch (n) {
                return t(n);
            }
        }
        var l = e("babel-runtime/core-js/object/get-prototype-of"), f = o(l), d = e("babel-runtime/helpers/possibleConstructorReturn"), p = o(d), g = e("babel-runtime/helpers/inherits"), _ = o(g), b = e("babel-runtime/helpers/classCallCheck"), h = o(b), v = e("babel-runtime/helpers/createClass"), m = o(v);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var y = e("./assert");
        n.assert = y.assert, n.assertNonNull = y.assertNonNull, n.AssertionError = y.AssertionError;
        var j = e("./promise");
        n.SafePromise = j.SafePromise;
        var w = e("./array");
        n.Arr = w;
        var x = e("./object");
        n.Obj = x;
        var L = function() {
            function e(t) {
                (0, h["default"])(this, e), this._getFallbackValue = t;
            }
            return (0, m["default"])(e, [ {
                key: "init",
                value: function(e) {
                    if (void 0 !== this._value) throw new Error("Global value already initialized.");
                    this._value = e;
                }
            }, {
                key: "get",
                value: function() {
                    if (void 0 === this._value) {
                        if (void 0 === this._getFallbackValue) throw new Error("Global value not initialized and no fallback value provided.");
                        this._value = this._getFallbackValue();
                    }
                    return this._value;
                }
            } ]), e;
        }();
        n.Global = L, n.optionalStringUnion = r, n.assertStringUnion = i;
        var k = function(e) {
            function t(e) {
                return (0, h["default"])(this, t), (0, p["default"])(this, (t.__proto__ || (0, f["default"])(t)).call(this, "Matching not exhaustive" + (e ? ": unexpected value " + e : "")));
            }
            return (0, _["default"])(t, e), t;
        }(Error);
        n.MatchingNotExhaustiveError = k, n.assertNever = s, n.optionalIntString = c, n.assertIntString = a, 
        n.try_ = u;
    }, {
        "./array": 140,
        "./assert": 141,
        "./object": 143,
        "./promise": 144,
        "babel-runtime/core-js/object/get-prototype-of": 8,
        "babel-runtime/helpers/classCallCheck": 14,
        "babel-runtime/helpers/createClass": 15,
        "babel-runtime/helpers/inherits": 17,
        "babel-runtime/helpers/possibleConstructorReturn": 18
    } ],
    143: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function r(e, t) {
            var n = {};
            return (0, u["default"])(t).forEach(function(o) {
                return n[o] = e(o, t[o]);
            }), n;
        }
        function i(e, t) {
            var n = {};
            return (0, u["default"])(t).forEach(function(o) {
                e(o, t[o]) && (n[o] = t[o]);
            }), n;
        }
        function s(e) {
            return (0, u["default"])(e).map(function(t) {
                return e[t];
            });
        }
        function c(e) {
            return (0, u["default"])(e).map(function(t) {
                return [ t, e[t] ];
            });
        }
        var a = e("babel-runtime/core-js/object/keys"), u = o(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.map = r, n.filter = i, n.values = s, n.pairs = c;
    }, {
        "babel-runtime/core-js/object/keys": 9
    } ],
    144: [ function(e, t, n) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var r = e("babel-runtime/core-js/promise"), i = o(r);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s;
        !function(e) {
            function t(e) {
                return new i["default"](e);
            }
            function n() {
                var e = void 0, t = void 0, n = new i["default"](function(n, o) {
                    e = n, t = o;
                });
                return {
                    promise: n,
                    resolve: function(t) {
                        e(t);
                    },
                    reject: function(e) {
                        t(e);
                    }
                };
            }
            function o(e) {
                return t(function(t, n) {
                    return t(e());
                });
            }
            e.create = t, e.createCompletionSource = n, e.sync = o;
        }(s = n.SafePromise || (n.SafePromise = {}));
    }, {
        "babel-runtime/core-js/promise": 11
    } ]
}, {}, [ 126 ]);