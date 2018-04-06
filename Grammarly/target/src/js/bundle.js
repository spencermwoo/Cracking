!function e(t, n, r) {
    function o(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var c = "function" == typeof require && require;
                if (!s && c) return c(a, !0);
                if (i) return i(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l;
            }
            var u = n[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function(e) {
                var n = t[a][1][e];
                return o(n ? n : e);
            }, u, u.exports, e, t, n, r);
        }
        return n[a].exports;
    }
    for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) o(r[a]);
    return o;
}({
    1: [ function(e, t, n) {
        (function(r) {
            !function(e) {
                if ("object" == typeof n && "undefined" != typeof t) t.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
                    var o;
                    o = "undefined" != typeof window ? window : "undefined" != typeof r ? r : "undefined" != typeof self ? self : this, 
                    o.Changesets = e();
                }
            }(function() {
                return function t(n, r, o) {
                    function i(s, c) {
                        if (!r[s]) {
                            if (!n[s]) {
                                var l = "function" == typeof e && e;
                                if (!c && l) return l(s, !0);
                                if (a) return a(s, !0);
                                var u = new Error("Cannot find module '" + s + "'");
                                throw u.code = "MODULE_NOT_FOUND", u;
                            }
                            var d = r[s] = {
                                exports: {}
                            };
                            n[s][0].call(d.exports, function(e) {
                                var t = n[s][1][e];
                                return i(t ? t : e);
                            }, d, d.exports, t, n, r, o);
                        }
                        return r[s].exports;
                    }
                    for (var a = "function" == typeof e && e, s = 0; s < o.length; s++) i(o[s]);
                    return i;
                }({
                    1: [ function(e, t, n) {
                        try {
                            t.exports = e("./lib/changesets");
                        } catch (r) {}
                    }, {
                        "./lib/changesets": 2
                    } ],
                    2: [ function(e, t, n) {
                        var r = e("textdiff").textdiff, o = e("lodash"), i = {
                            op: function(e) {
                                return e = o.clone(e), e.len = e.text ? e.text.length : 0, e.toString = function() {
                                    return this.type + this.pos + ":" + this.text;
                                }, e.extend = function(t) {
                                    return e = o.extend(o.clone(this), t), e.len = e.text.length, e;
                                }, e.revision = function(e) {
                                    return o.extend(o.clone(this), {
                                        accessory: e
                                    });
                                }, e.apply = function(t, n) {
                                    if ("+" == this.type) {
                                        if (t.length != this.tlen) throw new Error("Text length doesn't match expected length. It's most likely you have missed a transformation: expected:" + this.tlen + ", actual:" + t.length);
                                        return n && (this.pos < n.b && (n.b += this.text.length), this.pos < n.e && (n.e += this.text.length)), 
                                        t.slice(0, this.pos) + this.text + t.slice(this.pos);
                                    }
                                    if ("-" == this.type) {
                                        if (t.length != this.tlen) throw new Error("Text length doesn't match expected length. It's most likely you have missed a transformation: expected:" + this.tlen + ", actual:" + t.length);
                                        if (t.substr(this.pos, this.len) != this.text) throw new Error("Applying delete operation: Passed context doesn't match assumed context: " + JSON.stringify(e) + ', actual context: "' + t.substr(this.pos, this.len) + '"');
                                        return n && (this.pos < n.b && (n.b -= Math.min(this.text.length, n.b - this.pos)), 
                                        this.pos < n.e && (n.e -= Math.min(this.text.length, n.e - this.pos))), t.slice(0, this.pos) + t.slice(this.pos + this.len);
                                    }
                                    if ("=" == this.type) return t;
                                }, e.transformAgainst = function(e) {
                                    if ("+" == this.type && "+" == e.type) {
                                        var t = this.tlen + e.len;
                                        if (this.pos < e.pos) return this.extend({
                                            tlen: t
                                        });
                                        if (this.pos == e.pos && this.accessory < e.accessory) return this.extend({
                                            tlen: t
                                        });
                                        if (e.pos <= this.pos) return this.extend({
                                            tlen: t,
                                            pos: this.pos + e.len
                                        });
                                    } else if ("+" == this.type && "-" == e.type) {
                                        var t = this.tlen - e.len;
                                        if (this.pos < e.pos) return this.extend({
                                            tlen: t
                                        });
                                        if (this.pos == e.pos) return this.extend({
                                            tlen: t
                                        });
                                        if (e.pos < this.pos) return this.extend({
                                            tlen: t,
                                            pos: Math.max(this.pos - e.len, e.pos)
                                        });
                                    } else if ("-" == this.type && "-" == e.type) {
                                        var t = this.tlen - e.len;
                                        if (this.pos < e.pos) {
                                            var n = Math.min(e.pos - this.pos, this.len);
                                            return this.extend({
                                                tlen: t,
                                                text: this.text.substr(0, n) + this.text.substr(n + e.len)
                                            });
                                        }
                                        if (this.pos == e.pos) return this.len <= e.len ? i.op({
                                            type: "="
                                        }) : this.extend({
                                            tlen: t,
                                            text: this.text.substr(e.len)
                                        });
                                        if (e.pos < this.pos) {
                                            var r = e.pos + e.len - this.pos;
                                            return r >= this.len ? i.op({
                                                type: "="
                                            }) : r > 0 ? this.extend({
                                                tlen: t,
                                                pos: e.pos,
                                                text: this.text.substr(r)
                                            }) : this.extend({
                                                tlen: t,
                                                pos: this.pos - e.len
                                            });
                                        }
                                    } else if ("-" == this.type && "+" == e.type) {
                                        var t = this.tlen + e.len;
                                        if (this.pos < e.pos) {
                                            if (this.pos + this.len > e.pos) {
                                                var o = e.pos - this.pos;
                                                return [ this.extend({
                                                    tlen: t,
                                                    text: this.text.substr(0, o)
                                                }), this.extend({
                                                    tlen: t,
                                                    pos: e.pos + e.len,
                                                    text: this.text.substr(o)
                                                }) ];
                                            }
                                            return this.extend({
                                                tlen: t
                                            });
                                        }
                                        if (this.pos == e.pos) return this.extend({
                                            tlen: t,
                                            pos: this.pos + e.len
                                        });
                                        if (e.pos < this.pos) return this.extend({
                                            tlen: t,
                                            pos: this.pos + e.len
                                        });
                                    }
                                    return this;
                                }, e;
                            },
                            cs: function(e) {
                                return e = o.clone(e.map(function(e) {
                                    return o.clone(e);
                                })), e.toString = function() {
                                    return this.map(function(e) {
                                        return e.toString();
                                    }).join(" ");
                                }, e.push = function(t) {
                                    t instanceof Array ? t.forEach(function(t) {
                                        [].push.call(e, t);
                                    }) : [].push.call(e, t);
                                }, e.revision = function(t) {
                                    return i.cs(e.map(function(e) {
                                        return e.revision(t);
                                    }));
                                }, e.maxRevision = function() {
                                    return Math.max(0, Math.max.apply(null, e.map(function(e) {
                                        return e.accessory;
                                    })));
                                }, e.apply = function(e, t) {
                                    return this.sequencify().forEach(function(n) {
                                        e = n.apply(e, t);
                                    }), e;
                                }, e.transformAgainst = function(e) {
                                    var t = i.cs([]), e = e.sequencify();
                                    return this.forEach(function(n) {
                                        e.forEach(function(e) {
                                            n = n.transformAgainst(e);
                                        }), t.push(n);
                                    }), t;
                                }, e.sequencify = function(e) {
                                    var t = i.cs([]);
                                    return this.forEach(function(e) {
                                        "=" != e.type && (t.forEach(function(t) {
                                            e = e.transformAgainst(t);
                                        }), t.push(e));
                                    }), t;
                                }, e.pack = function() {
                                    return this.filter(function(e) {
                                        return "=" != e.type;
                                    }).map(function(e) {
                                        var t = e.text.replace(/%/g, "%25").replace(/:/g, "%3A"), n = e.pos.toString(36), r = e.tlen.toString(36), o = e.accessory.toString(36);
                                        return e.type + n + ":" + r + ":" + t + ":" + o;
                                    }).join("");
                                }, e;
                            },
                            diff: function(e, t, n) {
                                n = n || 0;
                                var o = r(e, t), a = i.cs([]), s = e.length;
                                return o.oldFragment && a.push(i.op({
                                    type: "-",
                                    tlen: s,
                                    pos: o.from,
                                    text: o.oldFragment,
                                    accessory: n
                                })), o.newFragment && a.push(i.op({
                                    type: "+",
                                    tlen: s,
                                    pos: o.from,
                                    text: o.newFragment,
                                    accessory: n
                                })), a;
                            },
                            unpack: function(e) {
                                if ("" == e) return i.cs([]);
                                var t = e.match(/(\+|-)\w+?:\w+?:[^:]+?:\w+/g);
                                if (!t) throw new Error("Cannot unpack invalid serialized changeset string");
                                return i.cs(t.map(function(e) {
                                    var t = e.substr(1).split(":");
                                    return i.op({
                                        type: e.substr(0, 1),
                                        pos: parseInt(t[0], 36),
                                        tlen: parseInt(t[1], 36),
                                        text: t[2].replace(/%3A/gi, ":").replace(/%25/g, "%"),
                                        accessory: parseInt(t[3], 36)
                                    });
                                }));
                            }
                        };
                        try {
                            t.exports = i;
                        } catch (a) {}
                    }, {
                        lodash: "lodash",
                        textdiff: "textdiff"
                    } ]
                }, {}, [ 1 ])(1);
            });
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "./lib/changesets": 2,
        lodash: "lodash",
        textdiff: "textdiff"
    } ],
    2: [ function(e, t, n) {
        var r = e("textdiff").textdiff, o = e("lodash"), i = {
            op: function(e) {
                return e = o.clone(e), e.len = e.text ? e.text.length : 0, e.toString = function() {
                    return this.type + this.pos + ":" + this.text;
                }, e.extend = function(t) {
                    return e = o.extend(o.clone(this), t), e.len = e.text.length, e;
                }, e.revision = function(e) {
                    return o.extend(o.clone(this), {
                        accessory: e
                    });
                }, e.apply = function(t, n) {
                    if ("+" == this.type) {
                        if (t.length != this.tlen) throw new Error("Text length doesn't match expected length. It's most likely you have missed a transformation: expected:" + this.tlen + ", actual:" + t.length);
                        return n && (this.pos < n.b && (n.b += this.text.length), this.pos < n.e && (n.e += this.text.length)), 
                        t.slice(0, this.pos) + this.text + t.slice(this.pos);
                    }
                    if ("-" == this.type) {
                        if (t.length != this.tlen) throw new Error("Text length doesn't match expected length. It's most likely you have missed a transformation: expected:" + this.tlen + ", actual:" + t.length);
                        if (t.substr(this.pos, this.len) != this.text) throw new Error("Applying delete operation: Passed context doesn't match assumed context: " + JSON.stringify(e) + ', actual context: "' + t.substr(this.pos, this.len) + '"');
                        return n && (this.pos < n.b && (n.b -= Math.min(this.text.length, n.b - this.pos)), 
                        this.pos < n.e && (n.e -= Math.min(this.text.length, n.e - this.pos))), t.slice(0, this.pos) + t.slice(this.pos + this.len);
                    }
                    if ("=" == this.type) return t;
                }, e.transformAgainst = function(e) {
                    if ("+" == this.type && "+" == e.type) {
                        var t = this.tlen + e.len;
                        if (this.pos < e.pos) return this.extend({
                            tlen: t
                        });
                        if (this.pos == e.pos && this.accessory < e.accessory) return this.extend({
                            tlen: t
                        });
                        if (e.pos <= this.pos) return this.extend({
                            tlen: t,
                            pos: this.pos + e.len
                        });
                    } else if ("+" == this.type && "-" == e.type) {
                        var t = this.tlen - e.len;
                        if (this.pos < e.pos) return this.extend({
                            tlen: t
                        });
                        if (this.pos == e.pos) return this.extend({
                            tlen: t
                        });
                        if (e.pos < this.pos) return this.extend({
                            tlen: t,
                            pos: Math.max(this.pos - e.len, e.pos)
                        });
                    } else if ("-" == this.type && "-" == e.type) {
                        var t = this.tlen - e.len;
                        if (this.pos < e.pos) {
                            var n = Math.min(e.pos - this.pos, this.len);
                            return this.extend({
                                tlen: t,
                                text: this.text.substr(0, n) + this.text.substr(n + e.len)
                            });
                        }
                        if (this.pos == e.pos) return this.len <= e.len ? i.op({
                            type: "="
                        }) : this.extend({
                            tlen: t,
                            text: this.text.substr(e.len)
                        });
                        if (e.pos < this.pos) {
                            var r = e.pos + e.len - this.pos;
                            return r >= this.len ? i.op({
                                type: "="
                            }) : r > 0 ? this.extend({
                                tlen: t,
                                pos: e.pos,
                                text: this.text.substr(r)
                            }) : this.extend({
                                tlen: t,
                                pos: this.pos - e.len
                            });
                        }
                    } else if ("-" == this.type && "+" == e.type) {
                        var t = this.tlen + e.len;
                        if (this.pos < e.pos) {
                            if (this.pos + this.len > e.pos) {
                                var o = e.pos - this.pos;
                                return [ this.extend({
                                    tlen: t,
                                    text: this.text.substr(0, o)
                                }), this.extend({
                                    tlen: t,
                                    pos: e.pos + e.len,
                                    text: this.text.substr(o)
                                }) ];
                            }
                            return this.extend({
                                tlen: t
                            });
                        }
                        if (this.pos == e.pos) return this.extend({
                            tlen: t,
                            pos: this.pos + e.len
                        });
                        if (e.pos < this.pos) return this.extend({
                            tlen: t,
                            pos: this.pos + e.len
                        });
                    }
                    return this;
                }, e;
            },
            cs: function(e) {
                return e = o.clone(e.map(function(e) {
                    return o.clone(e);
                })), e.toString = function() {
                    return this.map(function(e) {
                        return e.toString();
                    }).join(" ");
                }, e.push = function(t) {
                    t instanceof Array ? t.forEach(function(t) {
                        [].push.call(e, t);
                    }) : [].push.call(e, t);
                }, e.revision = function(t) {
                    return i.cs(e.map(function(e) {
                        return e.revision(t);
                    }));
                }, e.maxRevision = function() {
                    return Math.max(0, Math.max.apply(null, e.map(function(e) {
                        return e.accessory;
                    })));
                }, e.apply = function(e, t) {
                    return this.sequencify().forEach(function(n) {
                        e = n.apply(e, t);
                    }), e;
                }, e.transformAgainst = function(e) {
                    var t = i.cs([]), e = e.sequencify();
                    return this.forEach(function(n) {
                        e.forEach(function(e) {
                            n = n.transformAgainst(e);
                        }), t.push(n);
                    }), t;
                }, e.sequencify = function(e) {
                    var t = i.cs([]);
                    return this.forEach(function(e) {
                        "=" != e.type && (t.forEach(function(t) {
                            e = e.transformAgainst(t);
                        }), t.push(e));
                    }), t;
                }, e.pack = function() {
                    return this.filter(function(e) {
                        return "=" != e.type;
                    }).map(function(e) {
                        var t = e.text.replace(/%/g, "%25").replace(/:/g, "%3A"), n = e.pos.toString(36), r = e.tlen.toString(36), o = e.accessory.toString(36);
                        return e.type + n + ":" + r + ":" + t + ":" + o;
                    }).join("");
                }, e;
            },
            diff: function(e, t, n) {
                n = n || 0;
                var o = r(e, t), a = i.cs([]), s = e.length;
                return o.oldFragment && a.push(i.op({
                    type: "-",
                    tlen: s,
                    pos: o.from,
                    text: o.oldFragment,
                    accessory: n
                })), o.newFragment && a.push(i.op({
                    type: "+",
                    tlen: s,
                    pos: o.from,
                    text: o.newFragment,
                    accessory: n
                })), a;
            },
            unpack: function(e) {
                if ("" == e) return i.cs([]);
                var t = e.match(/(\+|-)\w+?:\w+?:[^:]+?:\w+/g);
                if (!t) throw new Error("Cannot unpack invalid serialized changeset string");
                return i.cs(t.map(function(e) {
                    var t = e.substr(1).split(":");
                    return i.op({
                        type: e.substr(0, 1),
                        pos: parseInt(t[0], 36),
                        tlen: parseInt(t[1], 36),
                        text: t[2].replace(/%3A/gi, ":").replace(/%25/g, "%"),
                        accessory: parseInt(t[3], 36)
                    });
                }));
            }
        };
        try {
            t.exports = i;
        } catch (a) {}
    }, {
        lodash: "lodash",
        textdiff: "textdiff"
    } ],
    3: [ function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            return arguments.length < 2 ? i(e) : void o(e, t, n);
        }
        function o(e, t) {
            var n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], r = s(e) + "=" + s(t);
            null == t && (n.maxage = -1), n.maxage && (n.expires = new Date(+new Date() + n.maxage)), 
            n.path && (r += "; path=" + n.path), n.domain && (r += "; domain=" + n.domain), 
            n.expires && (r += "; expires=" + n.expires.toUTCString()), n.secure && (r += "; secure"), 
            document.cookie = r;
        }
        function i(e) {
            var t = a(document.cookie);
            return e ? t[e] : t;
        }
        function a(e) {
            var t = {}, n = e.split(/ *; */);
            if (!n[0]) return t;
            for (var r = n, o = Array.isArray(r), i = 0, r = o ? r : r[Symbol.iterator](); ;) {
                var a;
                if (o) {
                    if (i >= r.length) break;
                    a = r[i++];
                } else {
                    if (i = r.next(), i.done) break;
                    a = i.value;
                }
                var s = a;
                s = s.split("="), t[c(s[0])] = c(s[1]);
            }
            return t;
        }
        function s(e) {
            try {
                return encodeURIComponent(e);
            } catch (t) {
                return null;
            }
        }
        function c(e) {
            try {
                return decodeURIComponent(e);
            } catch (t) {
                return null;
            }
        }
        n.__esModule = !0, n["default"] = r;
    }, {} ],
    4: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return {
                type: "success",
                value: e
            };
        }
        function o(e) {
            return {
                type: "failure",
                error: e
            };
        }
        function i(e) {
            return e.then(r, o);
        }
        function a(e, t, n) {
            var r = n();
            return e > 0 ? r["catch"](function(r) {
                return new Promise(function(e, n) {
                    return setTimeout(e, t);
                }).then(function(r) {
                    return a(e - 1, t, n);
                });
            }) : r;
        }
        var s = this && this.__extends || function() {
            var e = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(e, t) {
                e.__proto__ = t;
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            };
            return function(t, n) {
                function r() {
                    this.constructor = t;
                }
                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
                new r());
            };
        }();
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("@grammarly-npm/cookie"), l = e("./util"), u = "gnar_containerId", d = "gnar_containerId_test", f = 12, p = function() {
            return new Date().setFullYear(new Date().getFullYear() + 10);
        }, m = function() {
            return new Date().setMinutes(new Date().getMinutes() + 10);
        }, h = /^\.\w+\.\w+/, g = function() {
            function e(e, t, n, r, o, i, a) {
                void 0 === t && (t = []), void 0 === o && (o = 3e5), void 0 === i && (i = 0), void 0 === a && (a = function() {
                    return Date.now();
                }), this.primaryStorage = e, this.secondaryStorages = t, this._logger = n, this._metric = r, 
                this._cacheSuccessTimeoutMillis = o, this._cacheFailureTimeoutMillis = i, this._getTime = a, 
                this._allStorages = [ e ].concat(t);
            }
            return e.prototype._expireCache = function(e) {
                0 === e ? this._cacheExpireTimestamp = 0 : e > 0 && (this._cacheExpireTimestamp = this._getTime() + e);
            }, e.prototype.getContainerId = function() {
                var e = this;
                if (void 0 !== this._cache && (void 0 === this._cacheExpireTimestamp || this._getTime() < this._cacheExpireTimestamp)) return this._cache;
                var t = this._metric.getTimer("doGetContainerId.timer").start(), n = this._doGetContainerId();
                return this._cache = n, this._cacheExpireTimestamp = void 0, n.then(function(t) {
                    return e._expireCache(e._cacheSuccessTimeoutMillis);
                }, function(t) {
                    return e._expireCache(e._cacheFailureTimeoutMillis);
                }), n.then(function(n) {
                    t.stop(), e._metric.getCounter("doGetContainerId.success").increment();
                }, function(n) {
                    t.stop(), e._metric.getCounter("doGetContainerId.failure").increment(), e._logger.warn("doGetContainerId.failed", n);
                }), n;
            }, e._generateContainerId = function() {
                return l.alphanumeric(f);
            }, e.prototype._doGetContainerId = function() {
                var t = this, n = Promise.all(this._allStorages.map(function(e) {
                    return i(e.safeGetContainerId());
                }));
                return n.then(function(n) {
                    var o = n[0];
                    if ("failure" === o.type) return Promise.reject("getting containerId from primary storage " + ("'" + t.primaryStorage.name + "' has failed: " + o.error));
                    var a, s = n.find(function(e) {
                        return "success" === e.type && void 0 !== e.value;
                    }), c = "success" === o.type && void 0 === o.value && void 0 !== s, l = !1;
                    void 0 === s ? (a = e._generateContainerId(), l = !0) : a = s.value;
                    var u = n.map(function(e, n) {
                        return "success" === e.type && e.value !== a ? i(t._allStorages[n].safeSetContainerId(a)) : Promise.resolve(r(void 0));
                    }), d = Promise.all(u).then(function(e) {
                        if (c || l) {
                            var t = e[0];
                            if ("success" !== t.type) return Promise.reject("setting containerId to primary storage has failed: " + t.error);
                        }
                        return Promise.resolve(a);
                    });
                    return d.then(function(e) {
                        c ? t._metric.getCounter("recovered").increment() : l && t._metric.getCounter("generated").increment();
                    }), d;
                });
            }, e;
        }();
        n.ContainerIdManager = g;
        var b = function() {
            function e(e) {
                this.name = e;
            }
            return e.prototype.safeSetContainerId = function(e) {
                var t = this;
                return this.ensureAvailable().then(function() {
                    return t.setContainerId(e);
                });
            }, e.prototype.safeGetContainerId = function() {
                var e = this;
                return this.ensureAvailable().then(function() {
                    return e.getContainerId();
                }).then(function(e) {
                    return "" === e ? void 0 : e;
                });
            }, e;
        }();
        n.BaseStorage = b;
        var v = function(e) {
            function t(t, n) {
                var r = e.call(this, "chromeCookie") || this;
                if (r._url = t, r._domain = n, !h.test(n)) throw new Error('Incorrect cookie domain provided.\n        Use top-level domain, starting from "."');
                return r;
            }
            return s(t, e), t.prototype._hasRuntimeError = function() {
                return window.chrome && window.chrome.runtime && window.chrome.runtime.lastError;
            }, t.prototype.ensureAvailable = function() {
                var e = this;
                return a(2, 1e3, function() {
                    return new Promise(function(t, n) {
                        var r = l.alphanumeric(10);
                        try {
                            window.chrome.cookies.set({
                                name: r,
                                value: r,
                                url: e._url,
                                domain: e._domain,
                                expirationDate: m() / 1e3
                            }, function(o) {
                                var i = e._hasRuntimeError();
                                !o && i && n("chrome.cookie.set failed with an error: " + i.message), o && o.value === r ? t() : n(new Error("ChromeCookieStorage is unavailable.\n              Availability test failed.\n              Tried to set " + r + ", the result is " + (o ? o.value : o) + "."));
                            });
                        } catch (o) {
                            n(o);
                        }
                    });
                });
            }, t.prototype.getContainerId = function() {
                var e = this;
                return new Promise(function(t, n) {
                    try {
                        window.chrome.cookies.get({
                            url: e._url,
                            name: u
                        }, function(r) {
                            var o = e._hasRuntimeError();
                            !r && o && n("chrome.cookie.get failed with an error: " + o.message), t(r ? r.value : void 0);
                        });
                    } catch (r) {
                        n(r);
                    }
                });
            }, t.prototype.setContainerId = function(e) {
                var t = this;
                return new Promise(function(n, r) {
                    try {
                        window.chrome.cookies.set({
                            name: u,
                            value: e,
                            url: t._url,
                            domain: t._domain,
                            expirationDate: p() / 1e3
                        }, function(o) {
                            var i = t._hasRuntimeError();
                            !o && i && r("chrome.cookie.set failed with an error: " + i.message), o && o.value === e || r(new Error("setContainerId failed.\n            Tried to set " + e + ", the result is " + (o ? o.value : o) + ".")), 
                            n();
                        });
                    } catch (o) {
                        r(o);
                    }
                });
            }, t;
        }(b);
        n.ChromeCookieStorage = v;
        var _ = function(e) {
            function t(t, n) {
                var r = e.call(this, "webExtensionsCookie") || this;
                if (r._url = t, r._domain = n, !h.test(n)) throw new Error('Incorrect cookie domain provided.\n        Use top-level domain, starting from "."');
                return r;
            }
            return s(t, e), t.prototype.ensureAvailable = function() {
                var e = this;
                return a(2, 1e3, function() {
                    return new Promise(function(t, n) {
                        var r = l.alphanumeric(10);
                        window.browser.cookies.set({
                            name: r,
                            value: r,
                            url: e._url,
                            domain: e._domain,
                            expirationDate: m() / 1e3
                        }).then(function() {
                            window.browser.cookies.get({
                                url: e._url,
                                name: r
                            }).then(function(e) {
                                e && e.value === r ? t() : n(new Error("WebExtensionsCookieStorage is unavailable.\n              Availability test failed.\n              Tried to set " + r + ", the result is " + (e ? e.value : e) + "."));
                            })["catch"](function(e) {
                                n("browser.cookies.get failed with an error: " + e.message);
                            });
                        })["catch"](function(e) {
                            n("browser.cookies.set failed with an error: " + e.message);
                        });
                    });
                });
            }, t.prototype.getContainerId = function() {
                var e = this;
                return new Promise(function(t, n) {
                    window.browser.cookies.get({
                        url: e._url,
                        name: u
                    }).then(function(e) {
                        t(e ? e.value : void 0);
                    })["catch"](function(e) {
                        n("browser.cookies.get failed with an error: " + e.message);
                    });
                });
            }, t.prototype.setContainerId = function(e) {
                var t = this;
                return new Promise(function(n, r) {
                    window.browser.cookies.set({
                        name: u,
                        value: e,
                        url: t._url,
                        domain: t._domain,
                        expirationDate: p() / 1e3
                    }).then(function(t) {
                        t && t.value === e || r(new Error("setContainerId failed.\n          Tried to set " + e + ", the result is " + (t ? t.value : t) + ".")), 
                        n();
                    })["catch"](function(e) {
                        r("browser.cookies.set failed with an error: " + e.message);
                    });
                });
            }, t;
        }(b);
        n.WebExtensionsCookieStorage = _;
        var y = function(e) {
            function t() {
                return e.call(this, "localStorage") || this;
            }
            return s(t, e), t.prototype.ensureAvailable = function() {
                var e = l.alphanumeric(10);
                return new Promise(function(t, n) {
                    localStorage.setItem(d, e), localStorage.getItem(d) !== e ? n(new Error("LocalStorage is unavailable.\n          Availability test failed.\n          Tried to set " + e + ", the result is " + localStorage.getItem(d) + ".")) : t(), 
                    localStorage.removeItem(d);
                });
            }, t.prototype.getContainerId = function() {
                var e = localStorage.getItem(u);
                return new Promise(function(t, n) {
                    return t(null === e ? void 0 : e);
                });
            }, t.prototype.setContainerId = function(e) {
                return new Promise(function(t, n) {
                    localStorage.setItem(u, e), t();
                });
            }, t;
        }(b);
        n.LocalStorage = y;
        var w = function(e) {
            function t(t) {
                var n = e.call(this, "cookie") || this;
                if (n._domain = t, !h.test(t)) throw new Error('Incorrect cookie domain provided.\n        Use top-level domain, starting from "."');
                return n;
            }
            return s(t, e), t.prototype._getCookieOptions = function() {
                return {
                    path: "/",
                    domain: this._domain,
                    expires: new Date(p())
                };
            }, t.prototype.ensureAvailable = function() {
                var e = l.alphanumeric(10);
                return new Promise(function(t, n) {
                    c["default"](e, e), c["default"](e) !== e ? n(new Error("CookieStorage is unavailable.\n          Availability test failed.\n          Tried to set " + e + ", the result is " + c["default"](e) + ".")) : t(), 
                    c["default"](e, null);
                });
            }, t.prototype.getContainerId = function() {
                return new Promise(function(e, t) {
                    return e(c["default"](u));
                });
            }, t.prototype.setContainerId = function(e) {
                var t = this;
                return new Promise(function(n, r) {
                    c["default"](u, e, t._getCookieOptions()), n();
                });
            }, t;
        }(b);
        n.CookieStorage = w;
        var k = function(e) {
            function t(t, n) {
                var r = e.call(this, "backend") || this;
                return r._fetch = t, r._url = n, r._keyName = u, r._testKeyName = d, r._baseUrl = n + "/cookies", 
                r;
            }
            return s(t, e), t.prototype.ensureAvailable = function() {
                var e = this, t = l.alphanumeric(10), n = (m() - Date.now()) / 1e3, r = this._baseUrl + "?name=" + this._testKeyName, o = r + "&value=" + t + "&maxAge=" + n;
                return this._doSend(o, "post").then(function(e) {
                    if (!e.ok) throw new Error("BackendStorage is unavailable.\n          Availability test failed.\n          Tried to set " + t + ". Request failed.\n        ");
                }).then(function() {
                    return e._doSend(r, "get").then(function(n) {
                        if (n.ok) return n.json().then(function(n) {
                            if (n.value !== t) throw new Error("BackendStorage is unavailable.\n                Availability test failed.\n                Tried to get " + e._testKeyName + " from server.\n                Got " + n.value + " instead of " + t + ".");
                        });
                        throw new Error("BackendStorage is unavailable.\n            Availability test failed.\n            Tried to get " + e._testKeyName + " from server. Request failed.");
                    });
                });
            }, t.prototype._doSend = function(e, t) {
                return this._fetch(e, {
                    credentials: "include",
                    method: t
                });
            }, t.prototype.getContainerId = function() {
                var e = this._baseUrl + "?name=" + this._keyName;
                return this._doSend(e, "get").then(function(e) {
                    return e.json();
                }).then(function(e) {
                    return e.value;
                });
            }, t.prototype.setContainerId = function(e) {
                var t = (p() - Date.now()) / 1e3, n = this._baseUrl + "?name=" + this._keyName + "&value=" + e + "&maxAge=" + t;
                return this._doSend(n, "post").then(function() {});
            }, t;
        }(b);
        n.BackendStorage = k;
        var E = function(e) {
            function t(t) {
                void 0 === t && (t = void 0);
                var n = e.call(this, "memory") || this;
                return n._value = t, n;
            }
            return s(t, e), t.prototype.ensureAvailable = function() {
                return Promise.resolve();
            }, t.prototype.getContainerId = function() {
                return Promise.resolve(this._value);
            }, t.prototype.setContainerId = function(e) {
                return this._value = e, Promise.resolve();
            }, t;
        }(b);
        n.MemoryStorage = E;
    }, {
        "./util": 6,
        "@grammarly-npm/cookie": 3
    } ],
    5: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("./util"), o = e("./container_id_manager");
        n.ContainerIdManager = o.ContainerIdManager, n.BaseStorage = o.BaseStorage, n.MemoryStorage = o.MemoryStorage, 
        n.LocalStorage = o.LocalStorage, n.CookieStorage = o.CookieStorage, n.ChromeCookieStorage = o.ChromeCookieStorage, 
        n.WebExtensionsCookieStorage = o.WebExtensionsCookieStorage, n.BackendStorage = o.BackendStorage;
        var i = [ "eventName", "client", "clientVersion", "userId", "isTest", "containerId", "instanceId", "batchId" ], a = "gnar_nextPingTimestamp", s = function() {
            function e(e, t, n, o, i, a, s, c) {
                void 0 === c && (c = !1), this._client = t, this._clientVersion = n, this._fetch = o, 
                this._containerIdManager = i, this._logger = a, this._metric = s, this._storePingTimestamp = c, 
                this._batchId = 0, this._instanceId = r.alphanumeric(8), this._isReady = !1, this._queue = [], 
                this._eventsUrl = e + "/events", this._pingMaybe();
            }
            return e.prototype.track = function(e, t) {
                if (void 0 === t && (t = {}), 0 === e.indexOf(this._client + "/")) throw new Error("Event name " + e + " should not start with '" + this._client + "/'");
                Object.keys(t).forEach(function(e) {
                    if (i.indexOf(e) !== -1) throw new Error("Event data should not contain '" + e + "' prop.");
                }), this._isReady ? ("ping" !== e && this._pingMaybe(), this._send(e, t)) : this._enqueue(e, t);
            }, e.prototype.setUser = function(e, t) {
                if (null === e || "" === e) throw new Error("Invalid userId: " + e);
                var n = this._userId && this._userId !== e && !(/^-/.test(e) && /^-/.test(this._userId));
                this._isTest = t, this._userId = e, n && this._pingMaybe(!0), this._isReady || (this._execQueue(), 
                this._isReady = !0);
            }, e.prototype.getContainerId = function() {
                return this._containerIdManager.getContainerId();
            }, e.prototype._setNextPingTimestamp = function() {
                var e = r.getNextPingDate();
                if (this._nextPingTimestamp = e, this._storePingTimestamp) try {
                    localStorage.setItem(a, e.toString());
                } catch (t) {
                    this._metric.getCounter("nextPingDate.write.failure").increment(), this._logger.warn("nextPingDate.write.failed", t);
                }
            }, e.prototype._getNextPingTimestamp = function() {
                var e = this._nextPingTimestamp;
                if (void 0 !== e || !this._storePingTimestamp) return e;
                try {
                    var t = localStorage.getItem(a);
                    e = null === t ? void 0 : parseInt(t, 10);
                } catch (n) {
                    e = void 0, this._metric.getCounter("nextPingDate.read.failure").increment(), this._logger.warn("nextPingDate.read.failed", n);
                }
                return e;
            }, e.prototype._shouldPing = function(e) {
                if (e) return !0;
                var t = this._getNextPingTimestamp();
                return void 0 === t || t < Date.now();
            }, e.prototype._pingMaybe = function(e) {
                if (void 0 === e && (e = !1), this._shouldPing(e)) {
                    this._setNextPingTimestamp();
                    var t = {
                        referrer: document.referrer,
                        url: document.location.href,
                        userAgent: navigator.userAgent,
                        navigatorAppName: navigator.appName,
                        navigatorAppCodeName: navigator.appCodeName,
                        navigatorAppVersion: navigator.appVersion,
                        navigatorVendor: navigator.vendor,
                        screenWidth: screen.width,
                        screenHeight: screen.height
                    };
                    this.track("ping", t);
                }
            }, e.prototype.pingMaybe = function() {
                this._pingMaybe();
            }, e.prototype._enqueue = function(e, t) {
                this._queue.push([ e, t ]);
            }, e.prototype._execQueue = function() {
                var e = this;
                this._queue.forEach(function(t) {
                    var n = t[0], r = t[1];
                    return e._send(n, r);
                }), this._queue = [];
            }, e.prototype._send = function(e, t) {
                var n = this, r = this._batchId++;
                this.getContainerId().then(function(o) {
                    var i = {
                        eventName: n._client + "/" + e,
                        client: n._client,
                        clientVersion: n._clientVersion,
                        userId: n._userId,
                        isTest: n._isTest,
                        containerId: o,
                        instanceId: n._instanceId,
                        batchId: r
                    };
                    return n._doSend(i, t);
                })["catch"](function(e) {
                    n._metric.getCounter("send.failure").increment(), n._logger.warn("send.failed", e);
                });
            }, e.prototype._doSend = function(e, t) {
                return this._fetch(this._eventsUrl, {
                    mode: "cors",
                    credentials: "include",
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        events: [ Object.assign(e, t) ]
                    })
                });
            }, e;
        }();
        n.GnarClientImpl = s;
        var c = function() {
            function e() {
                this.history = [];
            }
            return e.prototype.track = function(e, t) {
                void 0 === t && (t = {}), this.history.push({
                    eventName: e,
                    props: t
                });
            }, e.prototype.pingMaybe = function() {}, e.prototype.setUser = function(e, t) {}, 
            e.prototype.getContainerId = function() {
                return Promise.resolve("dummy_container_id");
            }, e;
        }();
        n.MemoryGnarClient = c;
        var l = function() {
            function e() {}
            return e.prototype.track = function(e, t) {
                void 0 === t && (t = {});
                var n = "trackingGnar";
                try {
                    var r = JSON.parse(localStorage.getItem(n)) || [];
                    r.push({
                        eventName: e,
                        props: t
                    }), localStorage.setItem(n, JSON.stringify(r));
                } catch (o) {}
            }, e.prototype.pingMaybe = function() {}, e.prototype.setUser = function(e, t) {}, 
            e.prototype.getContainerId = function() {
                return Promise.resolve("dummy_container_id");
            }, e;
        }();
        n.LocalStorageGnarClient = l;
    }, {
        "./container_id_manager": 4,
        "./util": 6
    } ],
    6: [ function(e, t, n) {
        "use strict";
        function r(e, t) {
            if (void 0 === t && (t = ""), e <= 0) return t;
            var n = Math.floor(Math.random() * (i.length - 1));
            return r(e - 1, t + i.charAt(n));
        }
        function o() {
            var e = new Date();
            return e.getHours() > 2 && e.setDate(e.getDate() + 1), e.setHours(3), e.setMinutes(Math.floor(60 * Math.random())), 
            e.getTime();
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        n.alphanumeric = r, n.getNextPingDate = o;
    }, {} ],
    7: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("./ring_buffer"), o = function() {
            function e(e, t, n, o) {
                var i = this;
                this._eventsSink = n, this._crashLogger = o, this._crashLogged = !1, this.sink = function(e) {
                    i._buffer.push(e), i._eventsSink(e), i._trigger(e) && i._sendCrashLog(e);
                }, this._buffer = new r.RingBuffer(e, (!0)), this._trigger = "function" == typeof t ? t : function(e) {
                    return e.level >= t;
                };
            }
            return e.prototype._sendCrashLog = function(e) {
                if (!this._crashLogged || this._buffer.size > this._buffer.capacity / 2) {
                    var t = void 0;
                    try {
                        t = JSON.stringify(this._buffer, void 0, "");
                    } catch (n) {
                        t = n;
                    }
                    this._crashLogger.log(e.level, "CrashLog", {
                        events: t,
                        first: !this._crashLogged
                    }), this._crashLogged = !0, this._buffer.clear();
                }
            }, e;
        }();
        n.CrashLogWrapper = o;
    }, {
        "./ring_buffer": 11
    } ],
    8: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("./log4ts");
        n.Logging = r;
        var o = e("./log4ts_impl");
        n.LoggingImpl = o;
        var i = e("./timeseries");
        n.TimeSeries = i;
        var a = e("./timeseries_impl");
        n.TimeSeriesImpl = a;
        var s = e("./utils");
        n.EventProps = s.EventProps;
        var c;
        !function(e) {
            var t = function() {
                function e() {}
                return Object.defineProperty(e, "root", {
                    get: function() {
                        return o.LoggingConfig.getRootLogger();
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.getLogger = function(t, n) {
                    return e.root.getLogger(t, n);
                }, e;
            }();
            e.Logging = t;
            var n = function() {
                function e() {}
                return Object.defineProperty(e, "root", {
                    get: function() {
                        return a.MetricsConfig.getRootMetric();
                    },
                    enumerable: !0,
                    configurable: !0
                }), e;
            }();
            e.TimeSeries = n;
        }(c = n.Monitoring || (n.Monitoring = {}));
    }, {
        "./log4ts": 9,
        "./log4ts_impl": 10,
        "./timeseries": 12,
        "./timeseries_impl": 13,
        "./utils": 14
    } ],
    9: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r;
        !function(e) {
            e[e.TRACE = 0] = "TRACE", e[e.DEBUG = 1] = "DEBUG", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", 
            e[e.ERROR = 4] = "ERROR", e[e.FATAL = 5] = "FATAL", e[e.OFF = 6] = "OFF";
        }(r = n.LogLevel || (n.LogLevel = {})), function(e) {
            function t(t) {
                switch (t) {
                  case "TRACE":
                    return e.TRACE;

                  case "DEBUG":
                    return e.DEBUG;

                  case "INFO":
                    return e.INFO;

                  case "WARN":
                    return e.WARN;

                  case "ERROR":
                    return e.ERROR;

                  case "FATAL":
                    return e.FATAL;

                  case "OFF":
                    return e.OFF;

                  default:
                    ;
                    throw new TypeError("Unrecognized log level string '" + t + "'");
                }
            }
            e.fromString = t;
        }(r = n.LogLevel || (n.LogLevel = {}));
    }, {} ],
    10: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("tslib"), o = e("./utils"), i = e("./log4ts"), a = e("./utils"), s = e("./crash_logger"), c = e("./ring_buffer"), l = function() {
            function e(e) {
                this.parent = e, this.context = void 0;
            }
            return e.prototype.get = function() {
                var e = this.parent && this.parent.get(), t = this.context;
                return e || t ? Object.assign({}, e, t) : void 0;
            }, e.prototype.add = function(e) {
                this.context = Object.assign({}, this.context, e);
            }, e.prototype.remove = function(e) {
                var t = this;
                this.context && e.forEach(function(e) {
                    e in t.context && delete t.context[e];
                });
            }, e.prototype.clear = function() {
                this.context = void 0;
            }, e;
        }();
        n.TreeContext = l;
        var u = function() {
            function e(e, t, n) {
                this.name = e, this.level = t, this.context = n, o.validateName(e);
            }
            return e.prototype.isEnabled = function(e) {
                return e >= this.level;
            }, e.prototype.handler = function(e, t) {
                var n = this;
                return {
                    trace: function(r) {
                        throw n.trace(e, r, t), r;
                    },
                    debug: function(r) {
                        throw n.debug(e, r, t), r;
                    },
                    info: function(r) {
                        throw n.info(e, r, t), r;
                    },
                    warn: function(r) {
                        throw n.warn(e, r, t), r;
                    },
                    error: function(r) {
                        throw n.error(e, r, t), r;
                    },
                    fatal: function(r) {
                        throw n.fatal(e, r, t), r;
                    }
                };
            }, e.prototype.trace = function(e, t, n) {
                this.log(i.LogLevel.TRACE, e, t, n);
            }, e.prototype.debug = function(e, t, n) {
                this.log(i.LogLevel.DEBUG, e, t, n);
            }, e.prototype.info = function(e, t, n) {
                this.log(i.LogLevel.INFO, e, t, n);
            }, e.prototype.warn = function(e, t, n) {
                this.log(i.LogLevel.WARN, e, t, n);
            }, e.prototype.error = function(e, t, n) {
                this.log(i.LogLevel.ERROR, e, t, n);
            }, e.prototype.fatal = function(e, t, n) {
                this.log(i.LogLevel.FATAL, e, t, n);
            }, e.prototype.log = function(e, t, n, r) {
                this.isEnabled(e) && (n && r || a.ErrorLike.isErrorLike(n) ? this.logImpl(e, t, n, r) : this.logImpl(e, t, void 0, r || n));
            }, e;
        }();
        n.AbstractLogger = u;
        var d = function() {
            function e(e, t, n, r, o, i, a) {
                this.level = e, this.message = t, this.logger = n, this.timestamp = r, this.exception = o, 
                this.extra = i, this.context = a;
            }
            return e;
        }();
        n.LogEvent = d;
        var f = function(e) {
            function t(t, n, r, o) {
                var i = e.call(this, t, n, o || new l()) || this;
                return i.appender = r, i;
            }
            return r.__extends(t, e), t.prototype.getLogger = function(e, n) {
                return new t(this.name + "." + e, n || this.level, this.appender, new l(this.context));
            }, t.prototype.logImpl = function(e, t, n, r) {
                var o = new d(e, t, this.name, Date.now(), n, r, this.context.get());
                try {
                    this.appender(o);
                } catch (n) {
                    console.error("Failed processing log event", n);
                    try {
                        p.printToConsole(o);
                    } catch (i) {
                        console.error("No luck. Can't print the event", i);
                    }
                }
            }, t;
        }(u);
        n.SimpleLogger = f;
        var p = function(e) {
            function t(n, r, o) {
                return e.call(this, n, r, t.printToConsole, o) || this;
            }
            return r.__extends(t, e), t.printToConsole = function(e) {
                var t = console.log;
                t = e.level <= i.LogLevel.TRACE ? console.trace || console.log : e.level <= i.LogLevel.DEBUG ? console.debug || console.log : e.level <= i.LogLevel.INFO ? console.log : e.level <= i.LogLevel.WARN ? console.warn : console.error, 
                t.apply(console, [ "[" + e.logger + "]: " + i.LogLevel[e.level] + " : " + e.message, e.exception, e.extra ].filter(function(e) {
                    return !!e;
                }));
            }, t;
        }(f);
        n.ConsoleLogger = p;
        var m = function() {
            function e() {}
            return e.createRootLogger = function(t, n, r, o, a) {
                void 0 === a && (a = !1);
                var c = function(t) {
                    t.level >= n && (a && p.printToConsole(t), r.append(t)["catch"](e._onError));
                }, u = new l(), d = c;
                if (o) {
                    var m = new f(t + ".crashLogs", i.LogLevel.TRACE, function(t) {
                        o.append(t)["catch"](e._onError);
                    }, new l(u)), h = new s.CrashLogWrapper(500, i.LogLevel.ERROR, c, m);
                    d = h.sink;
                }
                return new f(t, n, d, u);
            }, e;
        }();
        m._onError = function(e) {
            return p.printToConsole(new d(i.LogLevel.WARN, "Error while logging message to the server.", "Fallback", 0, (void 0), e));
        }, n.DefaultLogAppender = m;
        var h = function() {
            function e(e) {
                var t = this;
                this.event = e, this.promise = new Promise(function(e, n) {
                    t.resolve = e;
                }).then(function() {});
            }
            return e;
        }(), g = 300, b = 1e4, v = function() {
            function e(e, t, n) {
                void 0 === t && (t = g), void 0 === n && (n = b), this._sink = e, this._retryInterval = n, 
                this._currentItem = null, this._skippedCounter = null, this._buffer = new c.RingBuffer(t, (!1));
            }
            return e.prototype.append = function(e) {
                if (this._buffer.isFull) return this._incSkippedCounter(), Promise.reject(new Error("Outgoing message buffer is full"));
                var t = new h(e);
                return this._buffer.push(t), this._doAppend(), t.promise;
            }, e.prototype._incSkippedCounter = function() {
                this._skippedCounter || (this._skippedCounter = new d(i.LogLevel.WARN, "Messages was skipped due to buffer overflow", "log4ts_impl.LogQueue", Date.now(), (void 0), {
                    count: 0
                })), this._skippedCounter.extra.count++;
            }, e.prototype._doAppend = function() {
                var e = this;
                if (!this._buffer.isEmpty && !this._currentItem) {
                    var t = this._buffer.first, n = this._sink.append(t.event);
                    this._currentItem = t, n.then(function() {
                        t.resolve();
                        var n = e._buffer.pop();
                        if (n !== t && n === e._currentItem) throw new Error("Illegal state");
                        e._currentItem = null, e._skippedCounter && (e.append(e._skippedCounter), e._skippedCounter = null), 
                        e._doAppend();
                    })["catch"](function(n) {
                        e._retryAppend(t);
                    });
                }
            }, e.prototype._retryAppend = function(e) {
                var t = this;
                setTimeout(function() {
                    var n = e.event.extra || {};
                    n.appendRetries || (n = e.event.extra = Object.assign({
                        appendRetries: 1
                    }, n)), ++n.appendRetries, t._currentItem = null, t._doAppend();
                }, this._retryInterval);
            }, e;
        }();
        n.LogQueue = v;
        var _ = function() {
            function e() {}
            return e.prototype.append = function(e) {
                return Promise.resolve();
            }, e;
        }();
        n.DummyFelogClient = _;
        var y = function() {
            function e(e, t, n, r) {
                this._appName = e, this._appVersion = t, this._env = n, this._fetch = r;
            }
            return e.prototype.append = function(e) {
                return this._fetch(this._prepareData(e));
            }, e.prototype._toObject = function(e) {
                return void 0 === e || null === e || e instanceof Object && !Array.isArray(e) ? e : {
                    extra: e
                };
            }, e.prototype._parseException = function(e) {
                if (e) {
                    var t = this._toObject(e), n = t.name, o = void 0 === n ? "UnknownError" : n, i = t.message, a = void 0 === i ? "Unknown error message" : i, s = t.stack, c = r.__rest(t, [ "name", "message", "stack" ]);
                    return {
                        exceptionPart: {
                            exception: {
                                name: o,
                                message: a,
                                stack: s
                            }
                        },
                        exceptionDetailsPart: Object.keys(c).length > 0 ? {
                            exceptionDetails: c
                        } : {}
                    };
                }
                return {
                    exceptionPart: {},
                    exceptionDetailsPart: {}
                };
            }, e.prototype._prepareData = function(e) {
                var t = e.context ? {
                    context: e.context
                } : {}, n = this._parseException(e.exception), r = n.exceptionPart, o = n.exceptionDetailsPart, a = JSON.stringify(Object.assign({}, o, this._toObject(e.extra))), s = Object.assign({
                    message: e.message,
                    logger: e.logger,
                    level: i.LogLevel[e.level],
                    application: this._appName,
                    version: this._appVersion,
                    env: this._env
                }, t, r, "{}" !== a && {
                    details: a
                });
                return JSON.stringify(s, null, "");
            }, e;
        }();
        n.FelogClientBase = y;
        var w = function(e) {
            function t(t, n, r, o, i) {
                return e.call(this, n, r, o, function(e) {
                    return i(t, {
                        method: "POST",
                        cache: "no-cache",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: e
                    }).then(function() {});
                }) || this;
            }
            return r.__extends(t, e), t;
        }(y);
        n.PostFelogClient = w;
        var k = function(e) {
            function t(t, n, r, o, i) {
                var a = this, s = t + "/log?json=";
                return a = e.call(this, n, r, o, function(e) {
                    return i(s + encodeURIComponent(e), {
                        mode: "no-cors",
                        method: "get",
                        cache: "no-cache"
                    }).then(function() {});
                }) || this;
            }
            return r.__extends(t, e), t;
        }(y);
        n.GetFelogClient = k;
        var E = function() {
            function e() {}
            return e.getRootLogger = function() {
                return e._rootLogger || (e._rootLogger = e._createDefaultRootLogger(), e._rootLogger.warn("Using DEFAULT root logger")), 
                e._rootLogger;
            }, e.configure = function(t) {
                e._rootLogger = t, e._rootLogger.debug("ROOT logger changed", t);
            }, e._createDefaultRootLogger = function() {
                return new p("DEFAULT", i.LogLevel.DEBUG);
            }, e;
        }();
        n.LoggingConfig = E;
    }, {
        "./crash_logger": 7,
        "./log4ts": 9,
        "./ring_buffer": 11,
        "./utils": 14,
        tslib: "tslib"
    } ],
    11: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                if (void 0 === t && (t = !1), this.capacity = e, this.allowOverflow = t, this._start = 0, 
                this._end = 0, this._isFull = !1, this.toJSON = this.toArray, e <= 0) throw new Error("Invalid capacity " + e);
                this._buffer = new Array(e);
            }
            return Object.defineProperty(e.prototype, "size", {
                get: function() {
                    return this._isFull ? this._buffer.length : (this._end - this._start + this._buffer.length) % this._buffer.length;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isEmpty", {
                get: function() {
                    return 0 === this.size;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isFull", {
                get: function() {
                    return this._isFull;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.push = function(e) {
                if (this.isFull) {
                    if (!this.allowOverflow) throw new Error("Buffer is full");
                    ++this._start, this._start === this.capacity && (this._start = 0);
                }
                this._buffer[this._end++] = e, this._end === this.capacity && (this._end = 0), this._start === this._end && (this._isFull = !0);
            }, e.prototype.pop = function() {
                if (!this.isEmpty) {
                    var e = this._buffer[this._start];
                    return this._buffer[this._start] = void 0, this._start++, this._start === this.capacity && (this._start = 0), 
                    this._isFull = !1, e;
                }
            }, Object.defineProperty(e.prototype, "first", {
                get: function() {
                    return this.isEmpty ? void 0 : this._buffer[this._start];
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "last", {
                get: function() {
                    return this.isEmpty ? void 0 : this._buffer[0 === this._end ? this.capacity - 1 : this._end - 1];
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.clear = function() {
                this._buffer = new Array(this.capacity), this._start = this._end = 0, this._isFull = !1;
            }, e.prototype.toArray = function() {
                var e;
                if (this.isEmpty) e = new Array(0); else if (this._start < this._end) e = this._buffer.slice(this._start, this._end); else {
                    e = new Array(this.size);
                    for (var t = 0, n = this._start; n < this.capacity; ++n, ++t) e[t] = this._buffer[n];
                    for (var n = 0; n < this._end; ++n, ++t) e[t] = this._buffer[n];
                }
                return e;
            }, e;
        }();
        n.RingBuffer = r;
    }, {} ],
    12: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
    }, {} ],
    13: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("tslib"), o = e("./utils"), i = function() {
            function e(e, t, n) {
                this.name = e, this.timersSink = t, this.countersSink = n, o.validateName(e);
            }
            return e.prototype.getMetric = function(e) {
                return this._createChild(e);
            }, e.prototype.getTimer = function(e) {
                return this._createChild(e);
            }, e.prototype.getCounter = function(e) {
                return this._createChild(e);
            }, Object.defineProperty(e.prototype, "parent", {
                get: function() {
                    var t = this.name.lastIndexOf("."), n = this.name.substring(0, t === -1 ? 0 : t);
                    return "" === n ? void 0 : new e(n, this.timersSink, this.countersSink);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "root", {
                get: function() {
                    var t = this.name.indexOf("."), n = this.name.substring(0, t === -1 ? 0 : t);
                    return "" === n ? this : new e(n, this.timersSink, this.countersSink);
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype._createName = function(e) {
                return this.name + "." + e;
            }, e.prototype.start = function() {
                var e = Date.now(), t = this;
                return {
                    stop: function() {
                        t.recordTime(Date.now() - e);
                    }
                };
            }, e.prototype.recordTime = function(e) {
                this.timersSink(this.name, e);
            }, e.prototype.timing = function(e) {
                var t = this.start();
                try {
                    return e();
                } finally {
                    try {
                        t.stop();
                    } catch (n) {}
                }
            }, e.prototype.increment = function(e) {
                void 0 === e && (e = 1), this.countersSink(this.name, e);
            }, e.prototype.decrement = function(e) {
                void 0 === e && (e = 1), this.increment(-e);
            }, e.prototype._createChild = function(t) {
                return new e(this._createName(t), this.timersSink, this.countersSink);
            }, e;
        }();
        n.AbstractMetricsStorage = i;
        var a = function(e) {
            function t(t) {
                return e.call(this, "MP", function(e, n) {
                    return t("TIMER: " + e + " = " + n);
                }, function(e, n) {
                    return t("COUNTER: " + e + " = " + n);
                }) || this;
            }
            return r.__extends(t, e), t;
        }(i);
        n.MetricsPrinter = a;
        var s = 7500, c = 3, l = function(e) {
            function t(t, n, r, o) {
                void 0 === o && (o = s);
                var i = e.call(this, t, function(e, t) {
                    return i._reportTimer(e, t);
                }, function(e, t) {
                    return i._reportCounter(e, t);
                }) || this;
                return i._fetch = r, i._sendTimeout = o, i._countersBuffer = {}, i._timersBuffer = new Array(), 
                i._sendTimer = void 0, i._sendData = function() {
                    var e = [ i._timersBuffer.join("&"), Object.keys(i._countersBuffer).map(function(e) {
                        return e + "=" + i._countersBuffer[e];
                    }).join("&") ].filter(function(e) {
                        return e.length;
                    }).join("&"), t = i._baseUrl + e;
                    i._timersBuffer.length = 0, i._countersBuffer = {}, i._sendTimer = void 0;
                    var n = 0, r = function() {
                        i._fetch(t, {
                            mode: "no-cors",
                            cache: "no-cache"
                        })["catch"](function(e) {
                            n++ < c ? setTimeout(r, 5e3 * n) : console.error("Cannot send timesereies data", e, t);
                        });
                    };
                    r();
                }, i._baseUrl = n + "/ts?", i;
            }
            return r.__extends(t, e), t.createRoot = function(e, n, r) {
                return new t(e, n, r);
            }, t.prototype._reportTimer = function(e, t) {
                this._timersBuffer.push("t." + e + "=" + t), this._startSending();
            }, t.prototype._reportCounter = function(e, t) {
                var n = "c." + e;
                this._countersBuffer[n] = (this._countersBuffer[n] || 0) + t, this._startSending();
            }, t.prototype._startSending = function() {
                this._sendTimer || (this._sendTimer = setTimeout(this._sendData, this._sendTimeout));
            }, t;
        }(i);
        n.MetricsStorage = l;
        var u = function() {
            function e() {}
            return e.getRootMetric = function() {
                return e._metricsRoot || (console.warn("[WARNING] Using default timeseries implementation."), 
                e._metricsRoot = new a(console.log)), e._metricsRoot;
            }, e.configure = function(t) {
                e._metricsRoot = t;
            }, e;
        }();
        n.MetricsConfig = u;
    }, {
        "./utils": 14,
        tslib: "tslib"
    } ],
    14: [ function(e, t, n) {
        "use strict";
        function r(e) {
            if ("" === e) throw new Error("Empty name");
            if (!a.test(e)) throw new Error("Invalid name: " + e + ". Should be hierarchical dot separated string and may contain only word characters)");
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o;
        !function(e) {
            function t(e) {
                var t = e;
                return t && (void 0 !== t.message && void 0 !== t.name || void 0 !== t.stack);
            }
            e.isErrorLike = t;
        }(o = n.ErrorLike || (n.ErrorLike = {}));
        var i;
        !function(e) {
            function t(e) {
                return n(e, [ e ], o.isErrorLike(e));
            }
            function n(e, t, r) {
                if (!e) return {};
                var i = {}, a = r ? Object.getOwnPropertyNames : Object.keys;
                return a(e).forEach(function(r) {
                    var a = e[r];
                    if (null === a || void 0 === a || "number" == typeof a || "string" == typeof a || "boolean" == typeof a) i[r] = a; else if ("object" == typeof a) if (a instanceof Boolean || a instanceof Number || a instanceof String || a instanceof Date || a instanceof RegExp) i[r] = a.toString(); else if (t.indexOf(a) === -1) {
                        t.push(a);
                        var s = n(a, t, o.isErrorLike(a));
                        Object.keys(s).length > 0 && (i[r] = s);
                    }
                }), i;
            }
            e.fromAny = t;
        }(i = n.EventProps || (n.EventProps = {}));
        var a = /^(?!\.[\w])[\w.]*\w$/;
        n.validateName = r;
    }, {} ],
    15: [ function(e, t, n) {
        !function() {
            function e(e, t) {
                var r = n(e, t);
                return void 0 == r.from ? {
                    s: -1,
                    delta: 0
                } : {
                    s: r.from,
                    delta: r.newFragment.length - r.oldFragment.length
                };
            }
            function n(e, t) {
                if (e === t) return {};
                var n = e.length, a = t.length;
                if (i("oldLength: " + n + ". newLength: " + a), a > n) {
                    if (t.substr(0, n) === e) return i("some characters was added to the end"), {
                        from: n,
                        to: n,
                        oldFragment: "",
                        newFragment: t.substr(n)
                    };
                    if (t.substr(a - n) === e) return i("some characters was added to the start"), {
                        from: 0,
                        to: 0,
                        oldFragment: "",
                        newFragment: t.substr(0, a - n)
                    };
                }
                if (a < n) {
                    if (e.substr(n - a) === t) return i("some characters was removed from the end"), 
                    {
                        from: 0,
                        to: n - a,
                        oldFragment: e.substr(0, n - a),
                        newFragment: ""
                    };
                    if (e.substr(0, a) === t) return i("some characters was removed from the start"), 
                    {
                        from: a,
                        to: n,
                        oldFragment: e.substr(a),
                        newFragment: ""
                    };
                }
                var s = a < n ? a : n, c = r(e, t, s), l = o(e, t, n, a, s);
                return i("front: " + c), i("back: " + l), c + l > n && (l -= c + l - n), c + l > a && (l -= c + l - a), 
                {
                    from: c,
                    to: n - l,
                    oldFragment: e.substr(c, n - l - c),
                    newFragment: t.substr(c, a - l - c)
                };
            }
            function r(e, t, n) {
                for (var r = 0; e[r] === t[r] && r < n; ) r += 1;
                return r;
            }
            function o(e, t, n, r, o) {
                for (var i = 0; e[n - i - 1] === t[r - i - 1] && o - i >= 0; ) i += 1;
                return i;
            }
            function i() {}
            "undefined" == typeof t && (window.diffPos = e, window.textdiff = n);
            try {
                t.exports = {
                    diffPos: e,
                    textdiff: n
                };
            } catch (a) {}
        }();
    }, {} ],
    16: [ function(e, t, n) {
        try {
            t.exports = e("./lib/textdiff");
        } catch (r) {}
    }, {
        "./lib/textdiff": 15
    } ],
    17: [ function(e, t, n) {
        function r(e) {
            function t(t) {
                M.isConnected() || (f("connect to url: " + e.url), h = new k(e.url), S = !1, x = !1, 
                h.onopen = function() {
                    N = P, x = !0, T && (T = !1, M.close()), t && e.resetQueueOnReconnect ? I = [] : s(), 
                    M.emit("connect"), t && (M.emit("reconnect"), y = !1);
                }, h.onmessage = function(e) {
                    w && console.log("%c Received: %s", "color: #46af91;", e.data), r(e.data), u(e.data);
                }, h.onclose = function(e) {
                    x = !1, M.emit("disconnect", e), S || d("disconnected");
                }, h.onerror = d, window.app && app.one("offline", function() {
                    x && (M.close(), app.one("online", function() {
                        M.connect();
                    }));
                }));
            }
            function n() {
                y || (y = !0, M.isConnected() ? (M.one("disconnect", function() {
                    setTimeout(M.connect.bind(null, !0), 0);
                }), S = !0, M.close()) : M.connect(!0));
            }
            function r(t) {
                e.useStandBy && t && !i(t) && (clearTimeout(C), C = setTimeout(function() {
                    M.close(), E = !0, C = !1;
                }, e.useStandBy));
            }
            function i(e) {
                if (e && "ping" == e) return !0;
                var t, n = !1;
                try {
                    t = JSON.parse(e);
                } catch (r) {}
                return t && ("ping" == t || t.action && "pong" == t.action) && (n = !0), n;
            }
            function a(e) {
                return !i(e) && void (E && (E = !1, t(!0)));
            }
            function s() {
                if (h) for (;h.readyState == k.OPEN && I.length; ) c(I.shift());
            }
            function c(t) {
                w && console.log("%c Sending %s", "color:rgba(10, 10, 10, 0.6); font-size: 10px", t), 
                r(t), h.send(t), b && clearTimeout(b), b = setTimeout(l, e.idleTimeout);
            }
            function l() {
                b = null, M.send("ping");
            }
            function u(t) {
                try {
                    t = JSON.parse(t);
                } catch (n) {
                    p(n.stack || n, t);
                }
                e.useQueue ? (A.push(t), m()) : M.emit("message", t);
            }
            function d(e) {
                p("websocket error", e), M.emit("error", e), e && e.target && [ k.CLOSING, k.CLOSED ].indexOf(e.target.readyState) > -1 || g || (x && M.close(), 
                f("try to reconnect in " + N / 1e3 + "s"), g = setTimeout(function() {
                    N = Math.min(j, 1.5 * N), g = null, t(!0);
                }, N));
            }
            function f() {
                w && console.log.apply(console, arguments);
            }
            function p() {
                console.error.apply(console, arguments);
            }
            function m() {
                if (!v && !L) return 0 === A.length ? void (v = null) : void (v = setTimeout(function() {
                    L || M.emit("message", A.shift()), v = null, m();
                }, e.useQueue));
            }
            var h, g, b, v, _, y, w = !e.silentLogs, k = window.WebSocket || window.MozWebSocket, E = !1, C = null, x = !1, S = !1, T = !1, N = 1e3, P = 1e3, j = 6e4, I = [], A = [], L = !1;
            e = Object.assign({}, {
                url: null,
                connectionTimeout: 1e3,
                idleTimeout: 3e5,
                useQueue: !1,
                useStandBy: !1,
                playDelay: 50,
                resetQueueOnReconnect: !1
            }, e);
            var M = o({
                connect: t,
                reconnect: n,
                send: function(e) {
                    if (E) a(e); else {
                        var t = JSON.stringify(e);
                        I.push(t), s();
                    }
                },
                close: function() {
                    if (S = !0, f("explicit close requested"), !x) return T = !0;
                    try {
                        h && h.close(), g && (clearTimeout(g), g = null);
                    } catch (e) {
                        p("socket closing bug", e.stack || e);
                    }
                    x = !1, C && clearTimeout(C);
                },
                isConnected: function() {
                    return x;
                },
                release: function() {
                    clearTimeout(g);
                },
                toString: function() {
                    return "[object WebSocket]";
                },
                wsPlay: function() {
                    clearTimeout(_), _ = setTimeout(function() {
                        L = !1, m();
                    }, e.playDelay);
                },
                wsPause: function() {
                    clearTimeout(_), L = !0;
                }
            });
            return M;
        }
        var o = e("emitter");
        "function" != typeof Object.assign && !function() {
            Object.assign = function(e) {
                "use strict";
                if (void 0 === e || null === e) throw new TypeError("Cannot convert undefined or null to object");
                for (var t = Object(e), n = 1; n < arguments.length; n++) {
                    var r = arguments[n];
                    if (void 0 !== r && null !== r) for (var o in r) r.hasOwnProperty(o) && (t[o] = r[o]);
                }
                return t;
            };
        }();
        try {
            t.exports = r;
        } catch (i) {}
    }, {
        emitter: "emitter"
    } ],
    18: [ function(e, t, n) {
        try {
            t.exports = e("./lib/websocket");
        } catch (r) {}
    }, {
        "./lib/websocket": 17
    } ],
    19: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/array/from"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/array/from": 44
    } ],
    20: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/get-iterator"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/get-iterator": 45
    } ],
    21: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/is-iterable"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/is-iterable": 46
    } ],
    22: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/json/stringify"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/json/stringify": 47
    } ],
    23: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/map"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/map": 48
    } ],
    24: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/assign"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/assign": 49
    } ],
    25: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/create"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/create": 50
    } ],
    26: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/define-property"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/define-property": 51
    } ],
    27: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/get-own-property-symbols"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/get-own-property-symbols": 52
    } ],
    28: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/get-prototype-of"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/get-prototype-of": 53
    } ],
    29: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/keys"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/keys": 54
    } ],
    30: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/object/set-prototype-of"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/set-prototype-of": 55
    } ],
    31: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/promise"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/promise": 56
    } ],
    32: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/symbol"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/symbol": 57
    } ],
    33: [ function(e, t, n) {
        t.exports = {
            "default": e("core-js/library/fn/symbol/iterator"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/symbol/iterator": 58
    } ],
    34: [ function(e, t, n) {
        "use strict";
        n.__esModule = !0, n["default"] = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        };
    }, {} ],
    35: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var o = e("../core-js/object/define-property"), i = r(o);
        n["default"] = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    (0, i["default"])(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }();
    }, {
        "../core-js/object/define-property": 26
    } ],
    36: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var o = e("../core-js/object/define-property"), i = r(o);
        n["default"] = function(e, t, n) {
            return t in e ? (0, i["default"])(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        };
    }, {
        "../core-js/object/define-property": 26
    } ],
    37: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var o = e("../core-js/object/assign"), i = r(o);
        n["default"] = i["default"] || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
        };
    }, {
        "../core-js/object/assign": 24
    } ],
    38: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var o = e("../core-js/object/set-prototype-of"), i = r(o), a = e("../core-js/object/create"), s = r(a), c = e("../helpers/typeof"), l = r(c);
        n["default"] = function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + ("undefined" == typeof t ? "undefined" : (0, 
            l["default"])(t)));
            e.prototype = (0, s["default"])(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (i["default"] ? (0, i["default"])(e, t) : e.__proto__ = t);
        };
    }, {
        "../core-js/object/create": 25,
        "../core-js/object/set-prototype-of": 30,
        "../helpers/typeof": 42
    } ],
    39: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var o = e("../helpers/typeof"), i = r(o);
        n["default"] = function(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" !== ("undefined" == typeof t ? "undefined" : (0, i["default"])(t)) && "function" != typeof t ? e : t;
        };
    }, {
        "../helpers/typeof": 42
    } ],
    40: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var o = e("../core-js/is-iterable"), i = r(o), a = e("../core-js/get-iterator"), s = r(a);
        n["default"] = function() {
            function e(e, t) {
                var n = [], r = !0, o = !1, i = void 0;
                try {
                    for (var a, c = (0, s["default"])(e); !(r = (a = c.next()).done) && (n.push(a.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (l) {
                    o = !0, i = l;
                } finally {
                    try {
                        !r && c["return"] && c["return"]();
                    } finally {
                        if (o) throw i;
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
        "../core-js/get-iterator": 20,
        "../core-js/is-iterable": 21
    } ],
    41: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var o = e("../core-js/array/from"), i = r(o);
        n["default"] = function(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n;
            }
            return (0, i["default"])(e);
        };
    }, {
        "../core-js/array/from": 19
    } ],
    42: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        n.__esModule = !0;
        var o = e("../core-js/symbol/iterator"), i = r(o), a = e("../core-js/symbol"), s = r(a), c = "function" == typeof s["default"] && "symbol" == typeof i["default"] ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof s["default"] && e.constructor === s["default"] && e !== s["default"].prototype ? "symbol" : typeof e;
        };
        n["default"] = "function" == typeof s["default"] && "symbol" === c(i["default"]) ? function(e) {
            return "undefined" == typeof e ? "undefined" : c(e);
        } : function(e) {
            return e && "function" == typeof s["default"] && e.constructor === s["default"] && e !== s["default"].prototype ? "symbol" : "undefined" == typeof e ? "undefined" : c(e);
        };
    }, {
        "../core-js/symbol": 32,
        "../core-js/symbol/iterator": 33
    } ],
    43: [ function(e, t, n) {
        t.exports = e("regenerator-runtime");
    }, {
        "regenerator-runtime": 163
    } ],
    44: [ function(e, t, n) {
        e("../../modules/es6.string.iterator"), e("../../modules/es6.array.from"), t.exports = e("../../modules/_core").Array.from;
    }, {
        "../../modules/_core": 73,
        "../../modules/es6.array.from": 141,
        "../../modules/es6.string.iterator": 152
    } ],
    45: [ function(e, t, n) {
        e("../modules/web.dom.iterable"), e("../modules/es6.string.iterator"), t.exports = e("../modules/core.get-iterator");
    }, {
        "../modules/core.get-iterator": 139,
        "../modules/es6.string.iterator": 152,
        "../modules/web.dom.iterable": 157
    } ],
    46: [ function(e, t, n) {
        e("../modules/web.dom.iterable"), e("../modules/es6.string.iterator"), t.exports = e("../modules/core.is-iterable");
    }, {
        "../modules/core.is-iterable": 140,
        "../modules/es6.string.iterator": 152,
        "../modules/web.dom.iterable": 157
    } ],
    47: [ function(e, t, n) {
        var r = e("../../modules/_core"), o = r.JSON || (r.JSON = {
            stringify: JSON.stringify
        });
        t.exports = function(e) {
            return o.stringify.apply(o, arguments);
        };
    }, {
        "../../modules/_core": 73
    } ],
    48: [ function(e, t, n) {
        e("../modules/es6.object.to-string"), e("../modules/es6.string.iterator"), e("../modules/web.dom.iterable"), 
        e("../modules/es6.map"), e("../modules/es7.map.to-json"), t.exports = e("../modules/_core").Map;
    }, {
        "../modules/_core": 73,
        "../modules/es6.map": 143,
        "../modules/es6.object.to-string": 150,
        "../modules/es6.string.iterator": 152,
        "../modules/es7.map.to-json": 154,
        "../modules/web.dom.iterable": 157
    } ],
    49: [ function(e, t, n) {
        e("../../modules/es6.object.assign"), t.exports = e("../../modules/_core").Object.assign;
    }, {
        "../../modules/_core": 73,
        "../../modules/es6.object.assign": 144
    } ],
    50: [ function(e, t, n) {
        e("../../modules/es6.object.create");
        var r = e("../../modules/_core").Object;
        t.exports = function(e, t) {
            return r.create(e, t);
        };
    }, {
        "../../modules/_core": 73,
        "../../modules/es6.object.create": 145
    } ],
    51: [ function(e, t, n) {
        e("../../modules/es6.object.define-property");
        var r = e("../../modules/_core").Object;
        t.exports = function(e, t, n) {
            return r.defineProperty(e, t, n);
        };
    }, {
        "../../modules/_core": 73,
        "../../modules/es6.object.define-property": 146
    } ],
    52: [ function(e, t, n) {
        e("../../modules/es6.symbol"), t.exports = e("../../modules/_core").Object.getOwnPropertySymbols;
    }, {
        "../../modules/_core": 73,
        "../../modules/es6.symbol": 153
    } ],
    53: [ function(e, t, n) {
        e("../../modules/es6.object.get-prototype-of"), t.exports = e("../../modules/_core").Object.getPrototypeOf;
    }, {
        "../../modules/_core": 73,
        "../../modules/es6.object.get-prototype-of": 147
    } ],
    54: [ function(e, t, n) {
        e("../../modules/es6.object.keys"), t.exports = e("../../modules/_core").Object.keys;
    }, {
        "../../modules/_core": 73,
        "../../modules/es6.object.keys": 148
    } ],
    55: [ function(e, t, n) {
        e("../../modules/es6.object.set-prototype-of"), t.exports = e("../../modules/_core").Object.setPrototypeOf;
    }, {
        "../../modules/_core": 73,
        "../../modules/es6.object.set-prototype-of": 149
    } ],
    56: [ function(e, t, n) {
        e("../modules/es6.object.to-string"), e("../modules/es6.string.iterator"), e("../modules/web.dom.iterable"), 
        e("../modules/es6.promise"), t.exports = e("../modules/_core").Promise;
    }, {
        "../modules/_core": 73,
        "../modules/es6.object.to-string": 150,
        "../modules/es6.promise": 151,
        "../modules/es6.string.iterator": 152,
        "../modules/web.dom.iterable": 157
    } ],
    57: [ function(e, t, n) {
        e("../../modules/es6.symbol"), e("../../modules/es6.object.to-string"), e("../../modules/es7.symbol.async-iterator"), 
        e("../../modules/es7.symbol.observable"), t.exports = e("../../modules/_core").Symbol;
    }, {
        "../../modules/_core": 73,
        "../../modules/es6.object.to-string": 150,
        "../../modules/es6.symbol": 153,
        "../../modules/es7.symbol.async-iterator": 155,
        "../../modules/es7.symbol.observable": 156
    } ],
    58: [ function(e, t, n) {
        e("../../modules/es6.string.iterator"), e("../../modules/web.dom.iterable"), t.exports = e("../../modules/_wks-ext").f("iterator");
    }, {
        "../../modules/_wks-ext": 136,
        "../../modules/es6.string.iterator": 152,
        "../../modules/web.dom.iterable": 157
    } ],
    59: [ function(e, t, n) {
        t.exports = function(e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e;
        };
    }, {} ],
    60: [ function(e, t, n) {
        t.exports = function() {};
    }, {} ],
    61: [ function(e, t, n) {
        t.exports = function(e, t, n, r) {
            if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
            return e;
        };
    }, {} ],
    62: [ function(e, t, n) {
        var r = e("./_is-object");
        t.exports = function(e) {
            if (!r(e)) throw TypeError(e + " is not an object!");
            return e;
        };
    }, {
        "./_is-object": 93
    } ],
    63: [ function(e, t, n) {
        var r = e("./_for-of");
        t.exports = function(e, t) {
            var n = [];
            return r(e, !1, n.push, n, t), n;
        };
    }, {
        "./_for-of": 83
    } ],
    64: [ function(e, t, n) {
        var r = e("./_to-iobject"), o = e("./_to-length"), i = e("./_to-index");
        t.exports = function(e) {
            return function(t, n, a) {
                var s, c = r(t), l = o(c.length), u = i(a, l);
                if (e && n != n) {
                    for (;l > u; ) if (s = c[u++], s != s) return !0;
                } else for (;l > u; u++) if ((e || u in c) && c[u] === n) return e || u || 0;
                return !e && -1;
            };
        };
    }, {
        "./_to-index": 128,
        "./_to-iobject": 130,
        "./_to-length": 131
    } ],
    65: [ function(e, t, n) {
        var r = e("./_ctx"), o = e("./_iobject"), i = e("./_to-object"), a = e("./_to-length"), s = e("./_array-species-create");
        t.exports = function(e, t) {
            var n = 1 == e, c = 2 == e, l = 3 == e, u = 4 == e, d = 6 == e, f = 5 == e || d, p = t || s;
            return function(t, s, m) {
                for (var h, g, b = i(t), v = o(b), _ = r(s, m, 3), y = a(v.length), w = 0, k = n ? p(t, y) : c ? p(t, 0) : void 0; y > w; w++) if ((f || w in v) && (h = v[w], 
                g = _(h, w, b), e)) if (n) k[w] = g; else if (g) switch (e) {
                  case 3:
                    return !0;

                  case 5:
                    return h;

                  case 6:
                    return w;

                  case 2:
                    k.push(h);
                } else if (u) return !1;
                return d ? -1 : l || u ? u : k;
            };
        };
    }, {
        "./_array-species-create": 67,
        "./_ctx": 75,
        "./_iobject": 90,
        "./_to-length": 131,
        "./_to-object": 132
    } ],
    66: [ function(e, t, n) {
        var r = e("./_is-object"), o = e("./_is-array"), i = e("./_wks")("species");
        t.exports = function(e) {
            var t;
            return o(e) && (t = e.constructor, "function" != typeof t || t !== Array && !o(t.prototype) || (t = void 0), 
            r(t) && (t = t[i], null === t && (t = void 0))), void 0 === t ? Array : t;
        };
    }, {
        "./_is-array": 92,
        "./_is-object": 93,
        "./_wks": 137
    } ],
    67: [ function(e, t, n) {
        var r = e("./_array-species-constructor");
        t.exports = function(e, t) {
            return new (r(e))(t);
        };
    }, {
        "./_array-species-constructor": 66
    } ],
    68: [ function(e, t, n) {
        var r = e("./_cof"), o = e("./_wks")("toStringTag"), i = "Arguments" == r(function() {
            return arguments;
        }()), a = function(e, t) {
            try {
                return e[t];
            } catch (n) {}
        };
        t.exports = function(e) {
            var t, n, s;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = a(t = Object(e), o)) ? n : i ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s;
        };
    }, {
        "./_cof": 69,
        "./_wks": 137
    } ],
    69: [ function(e, t, n) {
        var r = {}.toString;
        t.exports = function(e) {
            return r.call(e).slice(8, -1);
        };
    }, {} ],
    70: [ function(e, t, n) {
        "use strict";
        var r = e("./_object-dp").f, o = e("./_object-create"), i = e("./_redefine-all"), a = e("./_ctx"), s = e("./_an-instance"), c = e("./_defined"), l = e("./_for-of"), u = e("./_iter-define"), d = e("./_iter-step"), f = e("./_set-species"), p = e("./_descriptors"), m = e("./_meta").fastKey, h = p ? "_s" : "size", g = function(e, t) {
            var n, r = m(t);
            if ("F" !== r) return e._i[r];
            for (n = e._f; n; n = n.n) if (n.k == t) return n;
        };
        t.exports = {
            getConstructor: function(e, t, n, u) {
                var d = e(function(e, r) {
                    s(e, d, t, "_i"), e._i = o(null), e._f = void 0, e._l = void 0, e[h] = 0, void 0 != r && l(r, n, e[u], e);
                });
                return i(d.prototype, {
                    clear: function() {
                        for (var e = this, t = e._i, n = e._f; n; n = n.n) n.r = !0, n.p && (n.p = n.p.n = void 0), 
                        delete t[n.i];
                        e._f = e._l = void 0, e[h] = 0;
                    },
                    "delete": function(e) {
                        var t = this, n = g(t, e);
                        if (n) {
                            var r = n.n, o = n.p;
                            delete t._i[n.i], n.r = !0, o && (o.n = r), r && (r.p = o), t._f == n && (t._f = r), 
                            t._l == n && (t._l = o), t[h]--;
                        }
                        return !!n;
                    },
                    forEach: function(e) {
                        s(this, d, "forEach");
                        for (var t, n = a(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f; ) for (n(t.v, t.k, this); t && t.r; ) t = t.p;
                    },
                    has: function(e) {
                        return !!g(this, e);
                    }
                }), p && r(d.prototype, "size", {
                    get: function() {
                        return c(this[h]);
                    }
                }), d;
            },
            def: function(e, t, n) {
                var r, o, i = g(e, t);
                return i ? i.v = n : (e._l = i = {
                    i: o = m(t, !0),
                    k: t,
                    v: n,
                    p: r = e._l,
                    n: void 0,
                    r: !1
                }, e._f || (e._f = i), r && (r.n = i), e[h]++, "F" !== o && (e._i[o] = i)), e;
            },
            getEntry: g,
            setStrong: function(e, t, n) {
                u(e, t, function(e, t) {
                    this._t = e, this._k = t, this._l = void 0;
                }, function() {
                    for (var e = this, t = e._k, n = e._l; n && n.r; ) n = n.p;
                    return e._t && (e._l = n = n ? n.n : e._t._f) ? "keys" == t ? d(0, n.k) : "values" == t ? d(0, n.v) : d(0, [ n.k, n.v ]) : (e._t = void 0, 
                    d(1));
                }, n ? "entries" : "values", !n, !0), f(t);
            }
        };
    }, {
        "./_an-instance": 61,
        "./_ctx": 75,
        "./_defined": 76,
        "./_descriptors": 77,
        "./_for-of": 83,
        "./_iter-define": 96,
        "./_iter-step": 98,
        "./_meta": 102,
        "./_object-create": 105,
        "./_object-dp": 106,
        "./_redefine-all": 118,
        "./_set-species": 121
    } ],
    71: [ function(e, t, n) {
        var r = e("./_classof"), o = e("./_array-from-iterable");
        t.exports = function(e) {
            return function() {
                if (r(this) != e) throw TypeError(e + "#toJSON isn't generic");
                return o(this);
            };
        };
    }, {
        "./_array-from-iterable": 63,
        "./_classof": 68
    } ],
    72: [ function(e, t, n) {
        "use strict";
        var r = e("./_global"), o = e("./_export"), i = e("./_meta"), a = e("./_fails"), s = e("./_hide"), c = e("./_redefine-all"), l = e("./_for-of"), u = e("./_an-instance"), d = e("./_is-object"), f = e("./_set-to-string-tag"), p = e("./_object-dp").f, m = e("./_array-methods")(0), h = e("./_descriptors");
        t.exports = function(e, t, n, g, b, v) {
            var _ = r[e], y = _, w = b ? "set" : "add", k = y && y.prototype, E = {};
            return h && "function" == typeof y && (v || k.forEach && !a(function() {
                new y().entries().next();
            })) ? (y = t(function(t, n) {
                u(t, y, e, "_c"), t._c = new _(), void 0 != n && l(n, b, t[w], t);
            }), m("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","), function(e) {
                var t = "add" == e || "set" == e;
                e in k && (!v || "clear" != e) && s(y.prototype, e, function(n, r) {
                    if (u(this, y, e), !t && v && !d(n)) return "get" == e && void 0;
                    var o = this._c[e](0 === n ? 0 : n, r);
                    return t ? this : o;
                });
            }), "size" in k && p(y.prototype, "size", {
                get: function() {
                    return this._c.size;
                }
            })) : (y = g.getConstructor(t, e, b, w), c(y.prototype, n), i.NEED = !0), f(y, e), 
            E[e] = y, o(o.G + o.W + o.F, E), v || g.setStrong(y, e, b), y;
        };
    }, {
        "./_an-instance": 61,
        "./_array-methods": 65,
        "./_descriptors": 77,
        "./_export": 81,
        "./_fails": 82,
        "./_for-of": 83,
        "./_global": 84,
        "./_hide": 86,
        "./_is-object": 93,
        "./_meta": 102,
        "./_object-dp": 106,
        "./_redefine-all": 118,
        "./_set-to-string-tag": 122
    } ],
    73: [ function(e, t, n) {
        var r = t.exports = {
            version: "2.4.0"
        };
        "number" == typeof __e && (__e = r);
    }, {} ],
    74: [ function(e, t, n) {
        "use strict";
        var r = e("./_object-dp"), o = e("./_property-desc");
        t.exports = function(e, t, n) {
            t in e ? r.f(e, t, o(0, n)) : e[t] = n;
        };
    }, {
        "./_object-dp": 106,
        "./_property-desc": 117
    } ],
    75: [ function(e, t, n) {
        var r = e("./_a-function");
        t.exports = function(e, t, n) {
            if (r(e), void 0 === t) return e;
            switch (n) {
              case 1:
                return function(n) {
                    return e.call(t, n);
                };

              case 2:
                return function(n, r) {
                    return e.call(t, n, r);
                };

              case 3:
                return function(n, r, o) {
                    return e.call(t, n, r, o);
                };
            }
            return function() {
                return e.apply(t, arguments);
            };
        };
    }, {
        "./_a-function": 59
    } ],
    76: [ function(e, t, n) {
        t.exports = function(e) {
            if (void 0 == e) throw TypeError("Can't call method on  " + e);
            return e;
        };
    }, {} ],
    77: [ function(e, t, n) {
        t.exports = !e("./_fails")(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, {
        "./_fails": 82
    } ],
    78: [ function(e, t, n) {
        var r = e("./_is-object"), o = e("./_global").document, i = r(o) && r(o.createElement);
        t.exports = function(e) {
            return i ? o.createElement(e) : {};
        };
    }, {
        "./_global": 84,
        "./_is-object": 93
    } ],
    79: [ function(e, t, n) {
        t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, {} ],
    80: [ function(e, t, n) {
        var r = e("./_object-keys"), o = e("./_object-gops"), i = e("./_object-pie");
        t.exports = function(e) {
            var t = r(e), n = o.f;
            if (n) for (var a, s = n(e), c = i.f, l = 0; s.length > l; ) c.call(e, a = s[l++]) && t.push(a);
            return t;
        };
    }, {
        "./_object-gops": 111,
        "./_object-keys": 114,
        "./_object-pie": 115
    } ],
    81: [ function(e, t, n) {
        var r = e("./_global"), o = e("./_core"), i = e("./_ctx"), a = e("./_hide"), s = "prototype", c = function(e, t, n) {
            var l, u, d, f = e & c.F, p = e & c.G, m = e & c.S, h = e & c.P, g = e & c.B, b = e & c.W, v = p ? o : o[t] || (o[t] = {}), _ = v[s], y = p ? r : m ? r[t] : (r[t] || {})[s];
            p && (n = t);
            for (l in n) u = !f && y && void 0 !== y[l], u && l in v || (d = u ? y[l] : n[l], 
            v[l] = p && "function" != typeof y[l] ? n[l] : g && u ? i(d, r) : b && y[l] == d ? function(e) {
                var t = function(t, n, r) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                          case 0:
                            return new e();

                          case 1:
                            return new e(t);

                          case 2:
                            return new e(t, n);
                        }
                        return new e(t, n, r);
                    }
                    return e.apply(this, arguments);
                };
                return t[s] = e[s], t;
            }(d) : h && "function" == typeof d ? i(Function.call, d) : d, h && ((v.virtual || (v.virtual = {}))[l] = d, 
            e & c.R && _ && !_[l] && a(_, l, d)));
        };
        c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
    }, {
        "./_core": 73,
        "./_ctx": 75,
        "./_global": 84,
        "./_hide": 86
    } ],
    82: [ function(e, t, n) {
        t.exports = function(e) {
            try {
                return !!e();
            } catch (t) {
                return !0;
            }
        };
    }, {} ],
    83: [ function(e, t, n) {
        var r = e("./_ctx"), o = e("./_iter-call"), i = e("./_is-array-iter"), a = e("./_an-object"), s = e("./_to-length"), c = e("./core.get-iterator-method"), l = {}, u = {}, n = t.exports = function(e, t, n, d, f) {
            var p, m, h, g, b = f ? function() {
                return e;
            } : c(e), v = r(n, d, t ? 2 : 1), _ = 0;
            if ("function" != typeof b) throw TypeError(e + " is not iterable!");
            if (i(b)) {
                for (p = s(e.length); p > _; _++) if (g = t ? v(a(m = e[_])[0], m[1]) : v(e[_]), 
                g === l || g === u) return g;
            } else for (h = b.call(e); !(m = h.next()).done; ) if (g = o(h, v, m.value, t), 
            g === l || g === u) return g;
        };
        n.BREAK = l, n.RETURN = u;
    }, {
        "./_an-object": 62,
        "./_ctx": 75,
        "./_is-array-iter": 91,
        "./_iter-call": 94,
        "./_to-length": 131,
        "./core.get-iterator-method": 138
    } ],
    84: [ function(e, t, n) {
        var r = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = r);
    }, {} ],
    85: [ function(e, t, n) {
        var r = {}.hasOwnProperty;
        t.exports = function(e, t) {
            return r.call(e, t);
        };
    }, {} ],
    86: [ function(e, t, n) {
        var r = e("./_object-dp"), o = e("./_property-desc");
        t.exports = e("./_descriptors") ? function(e, t, n) {
            return r.f(e, t, o(1, n));
        } : function(e, t, n) {
            return e[t] = n, e;
        };
    }, {
        "./_descriptors": 77,
        "./_object-dp": 106,
        "./_property-desc": 117
    } ],
    87: [ function(e, t, n) {
        t.exports = e("./_global").document && document.documentElement;
    }, {
        "./_global": 84
    } ],
    88: [ function(e, t, n) {
        t.exports = !e("./_descriptors") && !e("./_fails")(function() {
            return 7 != Object.defineProperty(e("./_dom-create")("div"), "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, {
        "./_descriptors": 77,
        "./_dom-create": 78,
        "./_fails": 82
    } ],
    89: [ function(e, t, n) {
        t.exports = function(e, t, n) {
            var r = void 0 === n;
            switch (t.length) {
              case 0:
                return r ? e() : e.call(n);

              case 1:
                return r ? e(t[0]) : e.call(n, t[0]);

              case 2:
                return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);

              case 3:
                return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);

              case 4:
                return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);
            }
            return e.apply(n, t);
        };
    }, {} ],
    90: [ function(e, t, n) {
        var r = e("./_cof");
        t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
            return "String" == r(e) ? e.split("") : Object(e);
        };
    }, {
        "./_cof": 69
    } ],
    91: [ function(e, t, n) {
        var r = e("./_iterators"), o = e("./_wks")("iterator"), i = Array.prototype;
        t.exports = function(e) {
            return void 0 !== e && (r.Array === e || i[o] === e);
        };
    }, {
        "./_iterators": 99,
        "./_wks": 137
    } ],
    92: [ function(e, t, n) {
        var r = e("./_cof");
        t.exports = Array.isArray || function(e) {
            return "Array" == r(e);
        };
    }, {
        "./_cof": 69
    } ],
    93: [ function(e, t, n) {
        t.exports = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e;
        };
    }, {} ],
    94: [ function(e, t, n) {
        var r = e("./_an-object");
        t.exports = function(e, t, n, o) {
            try {
                return o ? t(r(n)[0], n[1]) : t(n);
            } catch (i) {
                var a = e["return"];
                throw void 0 !== a && r(a.call(e)), i;
            }
        };
    }, {
        "./_an-object": 62
    } ],
    95: [ function(e, t, n) {
        "use strict";
        var r = e("./_object-create"), o = e("./_property-desc"), i = e("./_set-to-string-tag"), a = {};
        e("./_hide")(a, e("./_wks")("iterator"), function() {
            return this;
        }), t.exports = function(e, t, n) {
            e.prototype = r(a, {
                next: o(1, n)
            }), i(e, t + " Iterator");
        };
    }, {
        "./_hide": 86,
        "./_object-create": 105,
        "./_property-desc": 117,
        "./_set-to-string-tag": 122,
        "./_wks": 137
    } ],
    96: [ function(e, t, n) {
        "use strict";
        var r = e("./_library"), o = e("./_export"), i = e("./_redefine"), a = e("./_hide"), s = e("./_has"), c = e("./_iterators"), l = e("./_iter-create"), u = e("./_set-to-string-tag"), d = e("./_object-gpo"), f = e("./_wks")("iterator"), p = !([].keys && "next" in [].keys()), m = "@@iterator", h = "keys", g = "values", b = function() {
            return this;
        };
        t.exports = function(e, t, n, v, _, y, w) {
            l(n, t, v);
            var k, E, C, x = function(e) {
                if (!p && e in P) return P[e];
                switch (e) {
                  case h:
                    return function() {
                        return new n(this, e);
                    };

                  case g:
                    return function() {
                        return new n(this, e);
                    };
                }
                return function() {
                    return new n(this, e);
                };
            }, S = t + " Iterator", T = _ == g, N = !1, P = e.prototype, j = P[f] || P[m] || _ && P[_], I = j || x(_), A = _ ? T ? x("entries") : I : void 0, L = "Array" == t ? P.entries || j : j;
            if (L && (C = d(L.call(new e())), C !== Object.prototype && (u(C, S, !0), r || s(C, f) || a(C, f, b))), 
            T && j && j.name !== g && (N = !0, I = function() {
                return j.call(this);
            }), r && !w || !p && !N && P[f] || a(P, f, I), c[t] = I, c[S] = b, _) if (k = {
                values: T ? I : x(g),
                keys: y ? I : x(h),
                entries: A
            }, w) for (E in k) E in P || i(P, E, k[E]); else o(o.P + o.F * (p || N), t, k);
            return k;
        };
    }, {
        "./_export": 81,
        "./_has": 85,
        "./_hide": 86,
        "./_iter-create": 95,
        "./_iterators": 99,
        "./_library": 101,
        "./_object-gpo": 112,
        "./_redefine": 119,
        "./_set-to-string-tag": 122,
        "./_wks": 137
    } ],
    97: [ function(e, t, n) {
        var r = e("./_wks")("iterator"), o = !1;
        try {
            var i = [ 7 ][r]();
            i["return"] = function() {
                o = !0;
            }, Array.from(i, function() {
                throw 2;
            });
        } catch (a) {}
        t.exports = function(e, t) {
            if (!t && !o) return !1;
            var n = !1;
            try {
                var i = [ 7 ], a = i[r]();
                a.next = function() {
                    return {
                        done: n = !0
                    };
                }, i[r] = function() {
                    return a;
                }, e(i);
            } catch (s) {}
            return n;
        };
    }, {
        "./_wks": 137
    } ],
    98: [ function(e, t, n) {
        t.exports = function(e, t) {
            return {
                value: t,
                done: !!e
            };
        };
    }, {} ],
    99: [ function(e, t, n) {
        t.exports = {};
    }, {} ],
    100: [ function(e, t, n) {
        var r = e("./_object-keys"), o = e("./_to-iobject");
        t.exports = function(e, t) {
            for (var n, i = o(e), a = r(i), s = a.length, c = 0; s > c; ) if (i[n = a[c++]] === t) return n;
        };
    }, {
        "./_object-keys": 114,
        "./_to-iobject": 130
    } ],
    101: [ function(e, t, n) {
        t.exports = !0;
    }, {} ],
    102: [ function(e, t, n) {
        var r = e("./_uid")("meta"), o = e("./_is-object"), i = e("./_has"), a = e("./_object-dp").f, s = 0, c = Object.isExtensible || function() {
            return !0;
        }, l = !e("./_fails")(function() {
            return c(Object.preventExtensions({}));
        }), u = function(e) {
            a(e, r, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            });
        }, d = function(e, t) {
            if (!o(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!i(e, r)) {
                if (!c(e)) return "F";
                if (!t) return "E";
                u(e);
            }
            return e[r].i;
        }, f = function(e, t) {
            if (!i(e, r)) {
                if (!c(e)) return !0;
                if (!t) return !1;
                u(e);
            }
            return e[r].w;
        }, p = function(e) {
            return l && m.NEED && c(e) && !i(e, r) && u(e), e;
        }, m = t.exports = {
            KEY: r,
            NEED: !1,
            fastKey: d,
            getWeak: f,
            onFreeze: p
        };
    }, {
        "./_fails": 82,
        "./_has": 85,
        "./_is-object": 93,
        "./_object-dp": 106,
        "./_uid": 134
    } ],
    103: [ function(e, t, n) {
        var r = e("./_global"), o = e("./_task").set, i = r.MutationObserver || r.WebKitMutationObserver, a = r.process, s = r.Promise, c = "process" == e("./_cof")(a);
        t.exports = function() {
            var e, t, n, l = function() {
                var r, o;
                for (c && (r = a.domain) && r.exit(); e; ) {
                    o = e.fn, e = e.next;
                    try {
                        o();
                    } catch (i) {
                        throw e ? n() : t = void 0, i;
                    }
                }
                t = void 0, r && r.enter();
            };
            if (c) n = function() {
                a.nextTick(l);
            }; else if (i) {
                var u = !0, d = document.createTextNode("");
                new i(l).observe(d, {
                    characterData: !0
                }), n = function() {
                    d.data = u = !u;
                };
            } else if (s && s.resolve) {
                var f = s.resolve();
                n = function() {
                    f.then(l);
                };
            } else n = function() {
                o.call(r, l);
            };
            return function(r) {
                var o = {
                    fn: r,
                    next: void 0
                };
                t && (t.next = o), e || (e = o, n()), t = o;
            };
        };
    }, {
        "./_cof": 69,
        "./_global": 84,
        "./_task": 127
    } ],
    104: [ function(e, t, n) {
        "use strict";
        var r = e("./_object-keys"), o = e("./_object-gops"), i = e("./_object-pie"), a = e("./_to-object"), s = e("./_iobject"), c = Object.assign;
        t.exports = !c || e("./_fails")(function() {
            var e = {}, t = {}, n = Symbol(), r = "abcdefghijklmnopqrst";
            return e[n] = 7, r.split("").forEach(function(e) {
                t[e] = e;
            }), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != r;
        }) ? function(e, t) {
            for (var n = a(e), c = arguments.length, l = 1, u = o.f, d = i.f; c > l; ) for (var f, p = s(arguments[l++]), m = u ? r(p).concat(u(p)) : r(p), h = m.length, g = 0; h > g; ) d.call(p, f = m[g++]) && (n[f] = p[f]);
            return n;
        } : c;
    }, {
        "./_fails": 82,
        "./_iobject": 90,
        "./_object-gops": 111,
        "./_object-keys": 114,
        "./_object-pie": 115,
        "./_to-object": 132
    } ],
    105: [ function(e, t, n) {
        var r = e("./_an-object"), o = e("./_object-dps"), i = e("./_enum-bug-keys"), a = e("./_shared-key")("IE_PROTO"), s = function() {}, c = "prototype", l = function() {
            var t, n = e("./_dom-create")("iframe"), r = i.length, o = "<", a = ">";
            for (n.style.display = "none", e("./_html").appendChild(n), n.src = "javascript:", 
            t = n.contentWindow.document, t.open(), t.write(o + "script" + a + "document.F=Object" + o + "/script" + a), 
            t.close(), l = t.F; r--; ) delete l[c][i[r]];
            return l();
        };
        t.exports = Object.create || function(e, t) {
            var n;
            return null !== e ? (s[c] = r(e), n = new s(), s[c] = null, n[a] = e) : n = l(), 
            void 0 === t ? n : o(n, t);
        };
    }, {
        "./_an-object": 62,
        "./_dom-create": 78,
        "./_enum-bug-keys": 79,
        "./_html": 87,
        "./_object-dps": 107,
        "./_shared-key": 123
    } ],
    106: [ function(e, t, n) {
        var r = e("./_an-object"), o = e("./_ie8-dom-define"), i = e("./_to-primitive"), a = Object.defineProperty;
        n.f = e("./_descriptors") ? Object.defineProperty : function(e, t, n) {
            if (r(e), t = i(t, !0), r(n), o) try {
                return a(e, t, n);
            } catch (s) {}
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (e[t] = n.value), e;
        };
    }, {
        "./_an-object": 62,
        "./_descriptors": 77,
        "./_ie8-dom-define": 88,
        "./_to-primitive": 133
    } ],
    107: [ function(e, t, n) {
        var r = e("./_object-dp"), o = e("./_an-object"), i = e("./_object-keys");
        t.exports = e("./_descriptors") ? Object.defineProperties : function(e, t) {
            o(e);
            for (var n, a = i(t), s = a.length, c = 0; s > c; ) r.f(e, n = a[c++], t[n]);
            return e;
        };
    }, {
        "./_an-object": 62,
        "./_descriptors": 77,
        "./_object-dp": 106,
        "./_object-keys": 114
    } ],
    108: [ function(e, t, n) {
        var r = e("./_object-pie"), o = e("./_property-desc"), i = e("./_to-iobject"), a = e("./_to-primitive"), s = e("./_has"), c = e("./_ie8-dom-define"), l = Object.getOwnPropertyDescriptor;
        n.f = e("./_descriptors") ? l : function(e, t) {
            if (e = i(e), t = a(t, !0), c) try {
                return l(e, t);
            } catch (n) {}
            if (s(e, t)) return o(!r.f.call(e, t), e[t]);
        };
    }, {
        "./_descriptors": 77,
        "./_has": 85,
        "./_ie8-dom-define": 88,
        "./_object-pie": 115,
        "./_property-desc": 117,
        "./_to-iobject": 130,
        "./_to-primitive": 133
    } ],
    109: [ function(e, t, n) {
        var r = e("./_to-iobject"), o = e("./_object-gopn").f, i = {}.toString, a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], s = function(e) {
            try {
                return o(e);
            } catch (t) {
                return a.slice();
            }
        };
        t.exports.f = function(e) {
            return a && "[object Window]" == i.call(e) ? s(e) : o(r(e));
        };
    }, {
        "./_object-gopn": 110,
        "./_to-iobject": 130
    } ],
    110: [ function(e, t, n) {
        var r = e("./_object-keys-internal"), o = e("./_enum-bug-keys").concat("length", "prototype");
        n.f = Object.getOwnPropertyNames || function(e) {
            return r(e, o);
        };
    }, {
        "./_enum-bug-keys": 79,
        "./_object-keys-internal": 113
    } ],
    111: [ function(e, t, n) {
        n.f = Object.getOwnPropertySymbols;
    }, {} ],
    112: [ function(e, t, n) {
        var r = e("./_has"), o = e("./_to-object"), i = e("./_shared-key")("IE_PROTO"), a = Object.prototype;
        t.exports = Object.getPrototypeOf || function(e) {
            return e = o(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null;
        };
    }, {
        "./_has": 85,
        "./_shared-key": 123,
        "./_to-object": 132
    } ],
    113: [ function(e, t, n) {
        var r = e("./_has"), o = e("./_to-iobject"), i = e("./_array-includes")(!1), a = e("./_shared-key")("IE_PROTO");
        t.exports = function(e, t) {
            var n, s = o(e), c = 0, l = [];
            for (n in s) n != a && r(s, n) && l.push(n);
            for (;t.length > c; ) r(s, n = t[c++]) && (~i(l, n) || l.push(n));
            return l;
        };
    }, {
        "./_array-includes": 64,
        "./_has": 85,
        "./_shared-key": 123,
        "./_to-iobject": 130
    } ],
    114: [ function(e, t, n) {
        var r = e("./_object-keys-internal"), o = e("./_enum-bug-keys");
        t.exports = Object.keys || function(e) {
            return r(e, o);
        };
    }, {
        "./_enum-bug-keys": 79,
        "./_object-keys-internal": 113
    } ],
    115: [ function(e, t, n) {
        n.f = {}.propertyIsEnumerable;
    }, {} ],
    116: [ function(e, t, n) {
        var r = e("./_export"), o = e("./_core"), i = e("./_fails");
        t.exports = function(e, t) {
            var n = (o.Object || {})[e] || Object[e], a = {};
            a[e] = t(n), r(r.S + r.F * i(function() {
                n(1);
            }), "Object", a);
        };
    }, {
        "./_core": 73,
        "./_export": 81,
        "./_fails": 82
    } ],
    117: [ function(e, t, n) {
        t.exports = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            };
        };
    }, {} ],
    118: [ function(e, t, n) {
        var r = e("./_hide");
        t.exports = function(e, t, n) {
            for (var o in t) n && e[o] ? e[o] = t[o] : r(e, o, t[o]);
            return e;
        };
    }, {
        "./_hide": 86
    } ],
    119: [ function(e, t, n) {
        t.exports = e("./_hide");
    }, {
        "./_hide": 86
    } ],
    120: [ function(e, t, n) {
        var r = e("./_is-object"), o = e("./_an-object"), i = function(e, t) {
            if (o(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
        };
        t.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? function(t, n, r) {
                try {
                    r = e("./_ctx")(Function.call, e("./_object-gopd").f(Object.prototype, "__proto__").set, 2), 
                    r(t, []), n = !(t instanceof Array);
                } catch (o) {
                    n = !0;
                }
                return function(e, t) {
                    return i(e, t), n ? e.__proto__ = t : r(e, t), e;
                };
            }({}, !1) : void 0),
            check: i
        };
    }, {
        "./_an-object": 62,
        "./_ctx": 75,
        "./_is-object": 93,
        "./_object-gopd": 108
    } ],
    121: [ function(e, t, n) {
        "use strict";
        var r = e("./_global"), o = e("./_core"), i = e("./_object-dp"), a = e("./_descriptors"), s = e("./_wks")("species");
        t.exports = function(e) {
            var t = "function" == typeof o[e] ? o[e] : r[e];
            a && t && !t[s] && i.f(t, s, {
                configurable: !0,
                get: function() {
                    return this;
                }
            });
        };
    }, {
        "./_core": 73,
        "./_descriptors": 77,
        "./_global": 84,
        "./_object-dp": 106,
        "./_wks": 137
    } ],
    122: [ function(e, t, n) {
        var r = e("./_object-dp").f, o = e("./_has"), i = e("./_wks")("toStringTag");
        t.exports = function(e, t, n) {
            e && !o(e = n ? e : e.prototype, i) && r(e, i, {
                configurable: !0,
                value: t
            });
        };
    }, {
        "./_has": 85,
        "./_object-dp": 106,
        "./_wks": 137
    } ],
    123: [ function(e, t, n) {
        var r = e("./_shared")("keys"), o = e("./_uid");
        t.exports = function(e) {
            return r[e] || (r[e] = o(e));
        };
    }, {
        "./_shared": 124,
        "./_uid": 134
    } ],
    124: [ function(e, t, n) {
        var r = e("./_global"), o = "__core-js_shared__", i = r[o] || (r[o] = {});
        t.exports = function(e) {
            return i[e] || (i[e] = {});
        };
    }, {
        "./_global": 84
    } ],
    125: [ function(e, t, n) {
        var r = e("./_an-object"), o = e("./_a-function"), i = e("./_wks")("species");
        t.exports = function(e, t) {
            var n, a = r(e).constructor;
            return void 0 === a || void 0 == (n = r(a)[i]) ? t : o(n);
        };
    }, {
        "./_a-function": 59,
        "./_an-object": 62,
        "./_wks": 137
    } ],
    126: [ function(e, t, n) {
        var r = e("./_to-integer"), o = e("./_defined");
        t.exports = function(e) {
            return function(t, n) {
                var i, a, s = String(o(t)), c = r(n), l = s.length;
                return c < 0 || c >= l ? e ? "" : void 0 : (i = s.charCodeAt(c), i < 55296 || i > 56319 || c + 1 === l || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e ? s.charAt(c) : i : e ? s.slice(c, c + 2) : (i - 55296 << 10) + (a - 56320) + 65536);
            };
        };
    }, {
        "./_defined": 76,
        "./_to-integer": 129
    } ],
    127: [ function(e, t, n) {
        var r, o, i, a = e("./_ctx"), s = e("./_invoke"), c = e("./_html"), l = e("./_dom-create"), u = e("./_global"), d = u.process, f = u.setImmediate, p = u.clearImmediate, m = u.MessageChannel, h = 0, g = {}, b = "onreadystatechange", v = function() {
            var e = +this;
            if (g.hasOwnProperty(e)) {
                var t = g[e];
                delete g[e], t();
            }
        }, _ = function(e) {
            v.call(e.data);
        };
        f && p || (f = function(e) {
            for (var t = [], n = 1; arguments.length > n; ) t.push(arguments[n++]);
            return g[++h] = function() {
                s("function" == typeof e ? e : Function(e), t);
            }, r(h), h;
        }, p = function(e) {
            delete g[e];
        }, "process" == e("./_cof")(d) ? r = function(e) {
            d.nextTick(a(v, e, 1));
        } : m ? (o = new m(), i = o.port2, o.port1.onmessage = _, r = a(i.postMessage, i, 1)) : u.addEventListener && "function" == typeof postMessage && !u.importScripts ? (r = function(e) {
            u.postMessage(e + "", "*");
        }, u.addEventListener("message", _, !1)) : r = b in l("script") ? function(e) {
            c.appendChild(l("script"))[b] = function() {
                c.removeChild(this), v.call(e);
            };
        } : function(e) {
            setTimeout(a(v, e, 1), 0);
        }), t.exports = {
            set: f,
            clear: p
        };
    }, {
        "./_cof": 69,
        "./_ctx": 75,
        "./_dom-create": 78,
        "./_global": 84,
        "./_html": 87,
        "./_invoke": 89
    } ],
    128: [ function(e, t, n) {
        var r = e("./_to-integer"), o = Math.max, i = Math.min;
        t.exports = function(e, t) {
            return e = r(e), e < 0 ? o(e + t, 0) : i(e, t);
        };
    }, {
        "./_to-integer": 129
    } ],
    129: [ function(e, t, n) {
        var r = Math.ceil, o = Math.floor;
        t.exports = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? o : r)(e);
        };
    }, {} ],
    130: [ function(e, t, n) {
        var r = e("./_iobject"), o = e("./_defined");
        t.exports = function(e) {
            return r(o(e));
        };
    }, {
        "./_defined": 76,
        "./_iobject": 90
    } ],
    131: [ function(e, t, n) {
        var r = e("./_to-integer"), o = Math.min;
        t.exports = function(e) {
            return e > 0 ? o(r(e), 9007199254740991) : 0;
        };
    }, {
        "./_to-integer": 129
    } ],
    132: [ function(e, t, n) {
        var r = e("./_defined");
        t.exports = function(e) {
            return Object(r(e));
        };
    }, {
        "./_defined": 76
    } ],
    133: [ function(e, t, n) {
        var r = e("./_is-object");
        t.exports = function(e, t) {
            if (!r(e)) return e;
            var n, o;
            if (t && "function" == typeof (n = e.toString) && !r(o = n.call(e))) return o;
            if ("function" == typeof (n = e.valueOf) && !r(o = n.call(e))) return o;
            if (!t && "function" == typeof (n = e.toString) && !r(o = n.call(e))) return o;
            throw TypeError("Can't convert object to primitive value");
        };
    }, {
        "./_is-object": 93
    } ],
    134: [ function(e, t, n) {
        var r = 0, o = Math.random();
        t.exports = function(e) {
            return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++r + o).toString(36));
        };
    }, {} ],
    135: [ function(e, t, n) {
        var r = e("./_global"), o = e("./_core"), i = e("./_library"), a = e("./_wks-ext"), s = e("./_object-dp").f;
        t.exports = function(e) {
            var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
            "_" == e.charAt(0) || e in t || s(t, e, {
                value: a.f(e)
            });
        };
    }, {
        "./_core": 73,
        "./_global": 84,
        "./_library": 101,
        "./_object-dp": 106,
        "./_wks-ext": 136
    } ],
    136: [ function(e, t, n) {
        n.f = e("./_wks");
    }, {
        "./_wks": 137
    } ],
    137: [ function(e, t, n) {
        var r = e("./_shared")("wks"), o = e("./_uid"), i = e("./_global").Symbol, a = "function" == typeof i, s = t.exports = function(e) {
            return r[e] || (r[e] = a && i[e] || (a ? i : o)("Symbol." + e));
        };
        s.store = r;
    }, {
        "./_global": 84,
        "./_shared": 124,
        "./_uid": 134
    } ],
    138: [ function(e, t, n) {
        var r = e("./_classof"), o = e("./_wks")("iterator"), i = e("./_iterators");
        t.exports = e("./_core").getIteratorMethod = function(e) {
            if (void 0 != e) return e[o] || e["@@iterator"] || i[r(e)];
        };
    }, {
        "./_classof": 68,
        "./_core": 73,
        "./_iterators": 99,
        "./_wks": 137
    } ],
    139: [ function(e, t, n) {
        var r = e("./_an-object"), o = e("./core.get-iterator-method");
        t.exports = e("./_core").getIterator = function(e) {
            var t = o(e);
            if ("function" != typeof t) throw TypeError(e + " is not iterable!");
            return r(t.call(e));
        };
    }, {
        "./_an-object": 62,
        "./_core": 73,
        "./core.get-iterator-method": 138
    } ],
    140: [ function(e, t, n) {
        var r = e("./_classof"), o = e("./_wks")("iterator"), i = e("./_iterators");
        t.exports = e("./_core").isIterable = function(e) {
            var t = Object(e);
            return void 0 !== t[o] || "@@iterator" in t || i.hasOwnProperty(r(t));
        };
    }, {
        "./_classof": 68,
        "./_core": 73,
        "./_iterators": 99,
        "./_wks": 137
    } ],
    141: [ function(e, t, n) {
        "use strict";
        var r = e("./_ctx"), o = e("./_export"), i = e("./_to-object"), a = e("./_iter-call"), s = e("./_is-array-iter"), c = e("./_to-length"), l = e("./_create-property"), u = e("./core.get-iterator-method");
        o(o.S + o.F * !e("./_iter-detect")(function(e) {
            Array.from(e);
        }), "Array", {
            from: function(e) {
                var t, n, o, d, f = i(e), p = "function" == typeof this ? this : Array, m = arguments.length, h = m > 1 ? arguments[1] : void 0, g = void 0 !== h, b = 0, v = u(f);
                if (g && (h = r(h, m > 2 ? arguments[2] : void 0, 2)), void 0 == v || p == Array && s(v)) for (t = c(f.length), 
                n = new p(t); t > b; b++) l(n, b, g ? h(f[b], b) : f[b]); else for (d = v.call(f), 
                n = new p(); !(o = d.next()).done; b++) l(n, b, g ? a(d, h, [ o.value, b ], !0) : o.value);
                return n.length = b, n;
            }
        });
    }, {
        "./_create-property": 74,
        "./_ctx": 75,
        "./_export": 81,
        "./_is-array-iter": 91,
        "./_iter-call": 94,
        "./_iter-detect": 97,
        "./_to-length": 131,
        "./_to-object": 132,
        "./core.get-iterator-method": 138
    } ],
    142: [ function(e, t, n) {
        "use strict";
        var r = e("./_add-to-unscopables"), o = e("./_iter-step"), i = e("./_iterators"), a = e("./_to-iobject");
        t.exports = e("./_iter-define")(Array, "Array", function(e, t) {
            this._t = a(e), this._i = 0, this._k = t;
        }, function() {
            var e = this._t, t = this._k, n = this._i++;
            return !e || n >= e.length ? (this._t = void 0, o(1)) : "keys" == t ? o(0, n) : "values" == t ? o(0, e[n]) : o(0, [ n, e[n] ]);
        }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries");
    }, {
        "./_add-to-unscopables": 60,
        "./_iter-define": 96,
        "./_iter-step": 98,
        "./_iterators": 99,
        "./_to-iobject": 130
    } ],
    143: [ function(e, t, n) {
        "use strict";
        var r = e("./_collection-strong");
        t.exports = e("./_collection")("Map", function(e) {
            return function() {
                return e(this, arguments.length > 0 ? arguments[0] : void 0);
            };
        }, {
            get: function(e) {
                var t = r.getEntry(this, e);
                return t && t.v;
            },
            set: function(e, t) {
                return r.def(this, 0 === e ? 0 : e, t);
            }
        }, r, !0);
    }, {
        "./_collection": 72,
        "./_collection-strong": 70
    } ],
    144: [ function(e, t, n) {
        var r = e("./_export");
        r(r.S + r.F, "Object", {
            assign: e("./_object-assign")
        });
    }, {
        "./_export": 81,
        "./_object-assign": 104
    } ],
    145: [ function(e, t, n) {
        var r = e("./_export");
        r(r.S, "Object", {
            create: e("./_object-create")
        });
    }, {
        "./_export": 81,
        "./_object-create": 105
    } ],
    146: [ function(e, t, n) {
        var r = e("./_export");
        r(r.S + r.F * !e("./_descriptors"), "Object", {
            defineProperty: e("./_object-dp").f
        });
    }, {
        "./_descriptors": 77,
        "./_export": 81,
        "./_object-dp": 106
    } ],
    147: [ function(e, t, n) {
        var r = e("./_to-object"), o = e("./_object-gpo");
        e("./_object-sap")("getPrototypeOf", function() {
            return function(e) {
                return o(r(e));
            };
        });
    }, {
        "./_object-gpo": 112,
        "./_object-sap": 116,
        "./_to-object": 132
    } ],
    148: [ function(e, t, n) {
        var r = e("./_to-object"), o = e("./_object-keys");
        e("./_object-sap")("keys", function() {
            return function(e) {
                return o(r(e));
            };
        });
    }, {
        "./_object-keys": 114,
        "./_object-sap": 116,
        "./_to-object": 132
    } ],
    149: [ function(e, t, n) {
        var r = e("./_export");
        r(r.S, "Object", {
            setPrototypeOf: e("./_set-proto").set
        });
    }, {
        "./_export": 81,
        "./_set-proto": 120
    } ],
    150: [ function(e, t, n) {}, {} ],
    151: [ function(e, t, n) {
        "use strict";
        var r, o, i, a = e("./_library"), s = e("./_global"), c = e("./_ctx"), l = e("./_classof"), u = e("./_export"), d = e("./_is-object"), f = e("./_a-function"), p = e("./_an-instance"), m = e("./_for-of"), h = e("./_species-constructor"), g = e("./_task").set, b = e("./_microtask")(), v = "Promise", _ = s.TypeError, y = s.process, w = s[v], y = s.process, k = "process" == l(y), E = function() {}, C = !!function() {
            try {
                var t = w.resolve(1), n = (t.constructor = {})[e("./_wks")("species")] = function(e) {
                    e(E, E);
                };
                return (k || "function" == typeof PromiseRejectionEvent) && t.then(E) instanceof n;
            } catch (r) {}
        }(), x = function(e, t) {
            return e === t || e === w && t === i;
        }, S = function(e) {
            var t;
            return !(!d(e) || "function" != typeof (t = e.then)) && t;
        }, T = function(e) {
            return x(w, e) ? new N(e) : new o(e);
        }, N = o = function(e) {
            var t, n;
            this.promise = new e(function(e, r) {
                if (void 0 !== t || void 0 !== n) throw _("Bad Promise constructor");
                t = e, n = r;
            }), this.resolve = f(t), this.reject = f(n);
        }, P = function(e) {
            try {
                e();
            } catch (t) {
                return {
                    error: t
                };
            }
        }, j = function(e, t) {
            if (!e._n) {
                e._n = !0;
                var n = e._c;
                b(function() {
                    for (var r = e._v, o = 1 == e._s, i = 0, a = function(t) {
                        var n, i, a = o ? t.ok : t.fail, s = t.resolve, c = t.reject, l = t.domain;
                        try {
                            a ? (o || (2 == e._h && L(e), e._h = 1), a === !0 ? n = r : (l && l.enter(), n = a(r), 
                            l && l.exit()), n === t.promise ? c(_("Promise-chain cycle")) : (i = S(n)) ? i.call(n, s, c) : s(n)) : c(r);
                        } catch (u) {
                            c(u);
                        }
                    }; n.length > i; ) a(n[i++]);
                    e._c = [], e._n = !1, t && !e._h && I(e);
                });
            }
        }, I = function(e) {
            g.call(s, function() {
                var t, n, r, o = e._v;
                if (A(e) && (t = P(function() {
                    k ? y.emit("unhandledRejection", o, e) : (n = s.onunhandledrejection) ? n({
                        promise: e,
                        reason: o
                    }) : (r = s.console) && r.error && r.error("Unhandled promise rejection", o);
                }), e._h = k || A(e) ? 2 : 1), e._a = void 0, t) throw t.error;
            });
        }, A = function(e) {
            if (1 == e._h) return !1;
            for (var t, n = e._a || e._c, r = 0; n.length > r; ) if (t = n[r++], t.fail || !A(t.promise)) return !1;
            return !0;
        }, L = function(e) {
            g.call(s, function() {
                var t;
                k ? y.emit("rejectionHandled", e) : (t = s.onrejectionhandled) && t({
                    promise: e,
                    reason: e._v
                });
            });
        }, M = function(e) {
            var t = this;
            t._d || (t._d = !0, t = t._w || t, t._v = e, t._s = 2, t._a || (t._a = t._c.slice()), 
            j(t, !0));
        }, O = function(e) {
            var t, n = this;
            if (!n._d) {
                n._d = !0, n = n._w || n;
                try {
                    if (n === e) throw _("Promise can't be resolved itself");
                    (t = S(e)) ? b(function() {
                        var r = {
                            _w: n,
                            _d: !1
                        };
                        try {
                            t.call(e, c(O, r, 1), c(M, r, 1));
                        } catch (o) {
                            M.call(r, o);
                        }
                    }) : (n._v = e, n._s = 1, j(n, !1));
                } catch (r) {
                    M.call({
                        _w: n,
                        _d: !1
                    }, r);
                }
            }
        };
        C || (w = function(e) {
            p(this, w, v, "_h"), f(e), r.call(this);
            try {
                e(c(O, this, 1), c(M, this, 1));
            } catch (t) {
                M.call(this, t);
            }
        }, r = function(e) {
            this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, 
            this._n = !1;
        }, r.prototype = e("./_redefine-all")(w.prototype, {
            then: function(e, t) {
                var n = T(h(this, w));
                return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, 
                n.domain = k ? y.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && j(this, !1), 
                n.promise;
            },
            "catch": function(e) {
                return this.then(void 0, e);
            }
        }), N = function() {
            var e = new r();
            this.promise = e, this.resolve = c(O, e, 1), this.reject = c(M, e, 1);
        }), u(u.G + u.W + u.F * !C, {
            Promise: w
        }), e("./_set-to-string-tag")(w, v), e("./_set-species")(v), i = e("./_core")[v], 
        u(u.S + u.F * !C, v, {
            reject: function(e) {
                var t = T(this), n = t.reject;
                return n(e), t.promise;
            }
        }), u(u.S + u.F * (a || !C), v, {
            resolve: function(e) {
                if (e instanceof w && x(e.constructor, this)) return e;
                var t = T(this), n = t.resolve;
                return n(e), t.promise;
            }
        }), u(u.S + u.F * !(C && e("./_iter-detect")(function(e) {
            w.all(e)["catch"](E);
        })), v, {
            all: function(e) {
                var t = this, n = T(t), r = n.resolve, o = n.reject, i = P(function() {
                    var n = [], i = 0, a = 1;
                    m(e, !1, function(e) {
                        var s = i++, c = !1;
                        n.push(void 0), a++, t.resolve(e).then(function(e) {
                            c || (c = !0, n[s] = e, --a || r(n));
                        }, o);
                    }), --a || r(n);
                });
                return i && o(i.error), n.promise;
            },
            race: function(e) {
                var t = this, n = T(t), r = n.reject, o = P(function() {
                    m(e, !1, function(e) {
                        t.resolve(e).then(n.resolve, r);
                    });
                });
                return o && r(o.error), n.promise;
            }
        });
    }, {
        "./_a-function": 59,
        "./_an-instance": 61,
        "./_classof": 68,
        "./_core": 73,
        "./_ctx": 75,
        "./_export": 81,
        "./_for-of": 83,
        "./_global": 84,
        "./_is-object": 93,
        "./_iter-detect": 97,
        "./_library": 101,
        "./_microtask": 103,
        "./_redefine-all": 118,
        "./_set-species": 121,
        "./_set-to-string-tag": 122,
        "./_species-constructor": 125,
        "./_task": 127,
        "./_wks": 137
    } ],
    152: [ function(e, t, n) {
        "use strict";
        var r = e("./_string-at")(!0);
        e("./_iter-define")(String, "String", function(e) {
            this._t = String(e), this._i = 0;
        }, function() {
            var e, t = this._t, n = this._i;
            return n >= t.length ? {
                value: void 0,
                done: !0
            } : (e = r(t, n), this._i += e.length, {
                value: e,
                done: !1
            });
        });
    }, {
        "./_iter-define": 96,
        "./_string-at": 126
    } ],
    153: [ function(e, t, n) {
        "use strict";
        var r = e("./_global"), o = e("./_has"), i = e("./_descriptors"), a = e("./_export"), s = e("./_redefine"), c = e("./_meta").KEY, l = e("./_fails"), u = e("./_shared"), d = e("./_set-to-string-tag"), f = e("./_uid"), p = e("./_wks"), m = e("./_wks-ext"), h = e("./_wks-define"), g = e("./_keyof"), b = e("./_enum-keys"), v = e("./_is-array"), _ = e("./_an-object"), y = e("./_to-iobject"), w = e("./_to-primitive"), k = e("./_property-desc"), E = e("./_object-create"), C = e("./_object-gopn-ext"), x = e("./_object-gopd"), S = e("./_object-dp"), T = e("./_object-keys"), N = x.f, P = S.f, j = C.f, I = r.Symbol, A = r.JSON, L = A && A.stringify, M = "prototype", O = p("_hidden"), R = p("toPrimitive"), F = {}.propertyIsEnumerable, D = u("symbol-registry"), B = u("symbols"), U = u("op-symbols"), W = Object[M], G = "function" == typeof I, V = r.QObject, z = !V || !V[M] || !V[M].findChild, H = i && l(function() {
            return 7 != E(P({}, "a", {
                get: function() {
                    return P(this, "a", {
                        value: 7
                    }).a;
                }
            })).a;
        }) ? function(e, t, n) {
            var r = N(W, t);
            r && delete W[t], P(e, t, n), r && e !== W && P(W, t, r);
        } : P, q = function(e) {
            var t = B[e] = E(I[M]);
            return t._k = e, t;
        }, K = G && "symbol" == typeof I.iterator ? function(e) {
            return "symbol" == typeof e;
        } : function(e) {
            return e instanceof I;
        }, Y = function(e, t, n) {
            return e === W && Y(U, t, n), _(e), t = w(t, !0), _(n), o(B, t) ? (n.enumerable ? (o(e, O) && e[O][t] && (e[O][t] = !1), 
            n = E(n, {
                enumerable: k(0, !1)
            })) : (o(e, O) || P(e, O, k(1, {})), e[O][t] = !0), H(e, t, n)) : P(e, t, n);
        }, J = function(e, t) {
            _(e);
            for (var n, r = b(t = y(t)), o = 0, i = r.length; i > o; ) Y(e, n = r[o++], t[n]);
            return e;
        }, Q = function(e, t) {
            return void 0 === t ? E(e) : J(E(e), t);
        }, X = function(e) {
            var t = F.call(this, e = w(e, !0));
            return !(this === W && o(B, e) && !o(U, e)) && (!(t || !o(this, e) || !o(B, e) || o(this, O) && this[O][e]) || t);
        }, $ = function(e, t) {
            if (e = y(e), t = w(t, !0), e !== W || !o(B, t) || o(U, t)) {
                var n = N(e, t);
                return !n || !o(B, t) || o(e, O) && e[O][t] || (n.enumerable = !0), n;
            }
        }, Z = function(e) {
            for (var t, n = j(y(e)), r = [], i = 0; n.length > i; ) o(B, t = n[i++]) || t == O || t == c || r.push(t);
            return r;
        }, ee = function(e) {
            for (var t, n = e === W, r = j(n ? U : y(e)), i = [], a = 0; r.length > a; ) !o(B, t = r[a++]) || n && !o(W, t) || i.push(B[t]);
            return i;
        };
        G || (I = function() {
            if (this instanceof I) throw TypeError("Symbol is not a constructor!");
            var e = f(arguments.length > 0 ? arguments[0] : void 0), t = function(n) {
                this === W && t.call(U, n), o(this, O) && o(this[O], e) && (this[O][e] = !1), H(this, e, k(1, n));
            };
            return i && z && H(W, e, {
                configurable: !0,
                set: t
            }), q(e);
        }, s(I[M], "toString", function() {
            return this._k;
        }), x.f = $, S.f = Y, e("./_object-gopn").f = C.f = Z, e("./_object-pie").f = X, 
        e("./_object-gops").f = ee, i && !e("./_library") && s(W, "propertyIsEnumerable", X, !0), 
        m.f = function(e) {
            return q(p(e));
        }), a(a.G + a.W + a.F * !G, {
            Symbol: I
        });
        for (var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ne = 0; te.length > ne; ) p(te[ne++]);
        for (var te = T(p.store), ne = 0; te.length > ne; ) h(te[ne++]);
        a(a.S + a.F * !G, "Symbol", {
            "for": function(e) {
                return o(D, e += "") ? D[e] : D[e] = I(e);
            },
            keyFor: function(e) {
                if (K(e)) return g(D, e);
                throw TypeError(e + " is not a symbol!");
            },
            useSetter: function() {
                z = !0;
            },
            useSimple: function() {
                z = !1;
            }
        }), a(a.S + a.F * !G, "Object", {
            create: Q,
            defineProperty: Y,
            defineProperties: J,
            getOwnPropertyDescriptor: $,
            getOwnPropertyNames: Z,
            getOwnPropertySymbols: ee
        }), A && a(a.S + a.F * (!G || l(function() {
            var e = I();
            return "[null]" != L([ e ]) || "{}" != L({
                a: e
            }) || "{}" != L(Object(e));
        })), "JSON", {
            stringify: function(e) {
                if (void 0 !== e && !K(e)) {
                    for (var t, n, r = [ e ], o = 1; arguments.length > o; ) r.push(arguments[o++]);
                    return t = r[1], "function" == typeof t && (n = t), !n && v(t) || (t = function(e, t) {
                        if (n && (t = n.call(this, e, t)), !K(t)) return t;
                    }), r[1] = t, L.apply(A, r);
                }
            }
        }), I[M][R] || e("./_hide")(I[M], R, I[M].valueOf), d(I, "Symbol"), d(Math, "Math", !0), 
        d(r.JSON, "JSON", !0);
    }, {
        "./_an-object": 62,
        "./_descriptors": 77,
        "./_enum-keys": 80,
        "./_export": 81,
        "./_fails": 82,
        "./_global": 84,
        "./_has": 85,
        "./_hide": 86,
        "./_is-array": 92,
        "./_keyof": 100,
        "./_library": 101,
        "./_meta": 102,
        "./_object-create": 105,
        "./_object-dp": 106,
        "./_object-gopd": 108,
        "./_object-gopn": 110,
        "./_object-gopn-ext": 109,
        "./_object-gops": 111,
        "./_object-keys": 114,
        "./_object-pie": 115,
        "./_property-desc": 117,
        "./_redefine": 119,
        "./_set-to-string-tag": 122,
        "./_shared": 124,
        "./_to-iobject": 130,
        "./_to-primitive": 133,
        "./_uid": 134,
        "./_wks": 137,
        "./_wks-define": 135,
        "./_wks-ext": 136
    } ],
    154: [ function(e, t, n) {
        var r = e("./_export");
        r(r.P + r.R, "Map", {
            toJSON: e("./_collection-to-json")("Map")
        });
    }, {
        "./_collection-to-json": 71,
        "./_export": 81
    } ],
    155: [ function(e, t, n) {
        e("./_wks-define")("asyncIterator");
    }, {
        "./_wks-define": 135
    } ],
    156: [ function(e, t, n) {
        e("./_wks-define")("observable");
    }, {
        "./_wks-define": 135
    } ],
    157: [ function(e, t, n) {
        e("./es6.array.iterator");
        for (var r = e("./_global"), o = e("./_hide"), i = e("./_iterators"), a = e("./_wks")("toStringTag"), s = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], c = 0; c < 5; c++) {
            var l = s[c], u = r[l], d = u && u.prototype;
            d && !d[a] && o(d, a, l), i[l] = i.Array;
        }
    }, {
        "./_global": 84,
        "./_hide": 86,
        "./_iterators": 99,
        "./_wks": 137,
        "./es6.array.iterator": 142
    } ],
    158: [ function(e, t, n) {
        function r() {
            throw new Error("setTimeout has not been defined");
        }
        function o() {
            throw new Error("clearTimeout has not been defined");
        }
        function i(e) {
            if (d === setTimeout) return setTimeout(e, 0);
            if ((d === r || !d) && setTimeout) return d = setTimeout, setTimeout(e, 0);
            try {
                return d(e, 0);
            } catch (t) {
                try {
                    return d.call(null, e, 0);
                } catch (t) {
                    return d.call(this, e, 0);
                }
            }
        }
        function a(e) {
            if (f === clearTimeout) return clearTimeout(e);
            if ((f === o || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e);
            try {
                return f(e);
            } catch (t) {
                try {
                    return f.call(null, e);
                } catch (t) {
                    return f.call(this, e);
                }
            }
        }
        function s() {
            g && m && (g = !1, m.length ? h = m.concat(h) : b = -1, h.length && c());
        }
        function c() {
            if (!g) {
                var e = i(s);
                g = !0;
                for (var t = h.length; t; ) {
                    for (m = h, h = []; ++b < t; ) m && m[b].run();
                    b = -1, t = h.length;
                }
                m = null, g = !1, a(e);
            }
        }
        function l(e, t) {
            this.fun = e, this.array = t;
        }
        function u() {}
        var d, f, p = t.exports = {};
        !function() {
            try {
                d = "function" == typeof setTimeout ? setTimeout : r;
            } catch (e) {
                d = r;
            }
            try {
                f = "function" == typeof clearTimeout ? clearTimeout : o;
            } catch (e) {
                f = o;
            }
        }();
        var m, h = [], g = !1, b = -1;
        p.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            h.push(new l(e, t)), 1 !== h.length || g || i(c);
        }, l.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", 
        p.versions = {}, p.on = u, p.addListener = u, p.once = u, p.off = u, p.removeListener = u, 
        p.removeAllListeners = u, p.emit = u, p.binding = function(e) {
            throw new Error("process.binding is not supported");
        }, p.cwd = function() {
            return "/";
        }, p.chdir = function(e) {
            throw new Error("process.chdir is not supported");
        }, p.umask = function() {
            return 0;
        };
    }, {} ],
    159: [ function(e, t, n) {
        t.exports = e("./lib/effects");
    }, {
        "./lib/effects": 160
    } ],
    160: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.select = n.cancel = n.join = n.fork = n.cps = n.apply = n.call = n.race = n.put = n.take = void 0;
        var r = e("./internal/io");
        n.take = r.take, n.put = r.put, n.race = r.race, n.call = r.call, n.apply = r.apply, 
        n.cps = r.cps, n.fork = r.fork, n.join = r.join, n.cancel = r.cancel, n.select = r.select;
    }, {
        "./internal/io": 161
    } ],
    161: [ function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        }
        function o(e) {
            return ("*" === e ? M.wildcard : b.is.array(e) ? M.array : b.is.func(e) ? M.predicate : M["default"])(e);
        }
        function i(e) {
            if (arguments.length > 0 && b.is.undef(e)) throw new Error(w);
            return L(C, b.is.undef(e) ? "*" : e);
        }
        function a(e) {
            return L(x, e);
        }
        function s(e) {
            return L(S, e);
        }
        function c(e, t) {
            (0, b.check)(e, b.is.notUndef, v);
            var n = null;
            if (b.is.array(e)) {
                var r = e, o = g(r, 2);
                n = o[0], e = o[1];
            } else if (e.fn) {
                var i = e;
                n = i.context, e = i.fn;
            }
            return (0, b.check)(e, b.is.func, v), {
                context: n,
                fn: e,
                args: t
            };
        }
        function l(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            return L(T, c(e, n));
        }
        function u(e, t) {
            var n = arguments.length <= 2 || void 0 === arguments[2] ? [] : arguments[2];
            return L(T, c({
                context: e,
                fn: t
            }, n));
        }
        function d(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            return L(N, c(e, n));
        }
        function f(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            return L(P, c(e, n));
        }
        function p(e) {
            if (!O(e)) throw new Error(_);
            return L(j, e);
        }
        function m(e) {
            if (!O(e)) throw new Error(y);
            return L(I, e);
        }
        function h(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            return 0 === arguments.length ? e = b.ident : (0, b.check)(e, b.is.func, k), L(A, {
                selector: e,
                args: n
            });
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.asEffect = n.SELECT_ARG_ERROR = n.INVALID_PATTERN = n.CANCEL_ARG_ERROR = n.JOIN_ARG_ERROR = n.FORK_ARG_ERROR = n.CALL_FUNCTION_ARG_ERROR = void 0;
        var g = function() {
            function e(e, t) {
                var n = [], r = !0, o = !1, i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (c) {
                    o = !0, i = c;
                } finally {
                    try {
                        !r && s["return"] && s["return"]();
                    } finally {
                        if (o) throw i;
                    }
                }
                return n;
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
        n.matcher = o, n.take = i, n.put = a, n.race = s, n.call = l, n.apply = u, n.cps = d, 
        n.fork = f, n.join = p, n.cancel = m, n.select = h;
        var b = e("./utils"), v = n.CALL_FUNCTION_ARG_ERROR = "call/cps/fork first argument must be a function, an array [context, function] or an object {context, fn}", _ = (n.FORK_ARG_ERROR = "fork first argument must be a generator function or an iterator", 
        n.JOIN_ARG_ERROR = "join argument must be a valid task (a result of a fork)"), y = n.CANCEL_ARG_ERROR = "cancel argument must be a valid task (a result of a fork)", w = n.INVALID_PATTERN = "Invalid pattern passed to `take` (HINT: check if you didn't mispell a constant)", k = n.SELECT_ARG_ERROR = "select first argument must be a function", E = (0, 
        b.sym)("IO"), C = "TAKE", x = "PUT", S = "RACE", T = "CALL", N = "CPS", P = "FORK", j = "JOIN", I = "CANCEL", A = "SELECT", L = function(e, t) {
            var n;
            return n = {}, r(n, E, !0), r(n, e, t), n;
        }, M = {
            wildcard: function() {
                return b.kTrue;
            },
            "default": function(e) {
                return function(t) {
                    return t.type === e;
                };
            },
            array: function(e) {
                return function(t) {
                    return e.some(function(e) {
                        return e === t.type;
                    });
                };
            },
            predicate: function(e) {
                return function(t) {
                    return e(t);
                };
            }
        }, O = function(e) {
            return e[b.TASK];
        };
        n.asEffect = {
            take: function(e) {
                return e && e[E] && e[C];
            },
            put: function(e) {
                return e && e[E] && e[x];
            },
            race: function(e) {
                return e && e[E] && e[S];
            },
            call: function(e) {
                return e && e[E] && e[T];
            },
            cps: function(e) {
                return e && e[E] && e[N];
            },
            fork: function(e) {
                return e && e[E] && e[P];
            },
            join: function(e) {
                return e && e[E] && e[j];
            },
            cancel: function(e) {
                return e && e[E] && e[I];
            },
            select: function(e) {
                return e && e[E] && e[A];
            }
        };
    }, {
        "./utils": 162
    } ],
    162: [ function(e, t, n) {
        (function(e) {
            "use strict";
            function t(e) {
                return e;
            }
            function r(e, t, n) {
                if (!t(e)) throw new Error(n);
            }
            function o(e, t) {
                var n = e.indexOf(t);
                n >= 0 && e.splice(n, 1);
            }
            function i() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], t = u({}, e), n = new Promise(function(e, n) {
                    t.resolve = e, t.reject = n;
                });
                return t.promise = n, t;
            }
            function a(e) {
                for (var t = [], n = 0; n < e; n++) t.push(i());
                return t;
            }
            function s() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return function() {
                    return ++e;
                };
            }
            function c(e) {
                return Promise.resolve(1).then(function() {
                    return e();
                });
            }
            function l(e) {
                p && console.warn("DEPRECATION WARNING", e);
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var u = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
            };
            n.ident = t, n.check = r, n.remove = o, n.deferred = i, n.arrayOfDeffered = a, n.autoInc = s, 
            n.asap = c, n.warnDeprecated = l;
            var d = n.sym = function(e) {
                return "@@redux-saga/" + e;
            }, f = n.TASK = d("TASK"), p = (n.kTrue = function() {
                return !0;
            }, n.noop = function() {}, n.isDev = "undefined" != typeof e && e.env && "development" === e.env.NODE_ENV), m = n.is = {
                undef: function(e) {
                    return null === e || void 0 === e;
                },
                notUndef: function(e) {
                    return null !== e && void 0 !== e;
                },
                func: function(e) {
                    return "function" == typeof e;
                },
                array: Array.isArray,
                promise: function(e) {
                    return e && m.func(e.then);
                },
                iterator: function(e) {
                    return e && m.func(e.next) && m.func(e["throw"]);
                },
                task: function(e) {
                    return e && e[f];
                }
            };
        }).call(this, e("_process"));
    }, {
        _process: 158
    } ],
    163: [ function(e, t, n) {
        (function(n) {
            var r = "object" == typeof n ? n : "object" == typeof window ? window : "object" == typeof self ? self : this, o = r.regeneratorRuntime && Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime") >= 0, i = o && r.regeneratorRuntime;
            if (r.regeneratorRuntime = void 0, t.exports = e("./runtime"), o) r.regeneratorRuntime = i; else try {
                delete r.regeneratorRuntime;
            } catch (a) {
                r.regeneratorRuntime = void 0;
            }
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "./runtime": 164
    } ],
    164: [ function(e, t, n) {
        (function(e, n) {
            !function(n) {
                "use strict";
                function r(e, t, n, r) {
                    var o = t && t.prototype instanceof i ? t : i, a = Object.create(o.prototype), s = new m(r || []);
                    return a._invoke = u(e, n, s), a;
                }
                function o(e, t, n) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, n)
                        };
                    } catch (r) {
                        return {
                            type: "throw",
                            arg: r
                        };
                    }
                }
                function i() {}
                function a() {}
                function s() {}
                function c(e) {
                    [ "next", "throw", "return" ].forEach(function(t) {
                        e[t] = function(e) {
                            return this._invoke(t, e);
                        };
                    });
                }
                function l(t) {
                    function n(e, r, i, a) {
                        var s = o(t[e], t, r);
                        if ("throw" !== s.type) {
                            var c = s.arg, l = c.value;
                            return l && "object" == typeof l && _.call(l, "__await") ? Promise.resolve(l.__await).then(function(e) {
                                n("next", e, i, a);
                            }, function(e) {
                                n("throw", e, i, a);
                            }) : Promise.resolve(l).then(function(e) {
                                c.value = e, i(c);
                            }, a);
                        }
                        a(s.arg);
                    }
                    function r(e, t) {
                        function r() {
                            return new Promise(function(r, o) {
                                n(e, t, r, o);
                            });
                        }
                        return i = i ? i.then(r, r) : r();
                    }
                    "object" == typeof e && e.domain && (n = e.domain.bind(n));
                    var i;
                    this._invoke = r;
                }
                function u(e, t, n) {
                    var r = x;
                    return function(i, a) {
                        if (r === T) throw new Error("Generator is already running");
                        if (r === N) {
                            if ("throw" === i) throw a;
                            return g();
                        }
                        for (n.method = i, n.arg = a; ;) {
                            var s = n.delegate;
                            if (s) {
                                var c = d(s, n);
                                if (c) {
                                    if (c === P) continue;
                                    return c;
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                                if (r === x) throw r = N, n.arg;
                                n.dispatchException(n.arg);
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            r = T;
                            var l = o(e, t, n);
                            if ("normal" === l.type) {
                                if (r = n.done ? N : S, l.arg === P) continue;
                                return {
                                    value: l.arg,
                                    done: n.done
                                };
                            }
                            "throw" === l.type && (r = N, n.method = "throw", n.arg = l.arg);
                        }
                    };
                }
                function d(e, t) {
                    var n = e.iterator[t.method];
                    if (n === b) {
                        if (t.delegate = null, "throw" === t.method) {
                            if (e.iterator["return"] && (t.method = "return", t.arg = b, d(e, t), "throw" === t.method)) return P;
                            t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method");
                        }
                        return P;
                    }
                    var r = o(n, e.iterator, t.arg);
                    if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, 
                    P;
                    var i = r.arg;
                    return i ? i.done ? (t[e.resultName] = i.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", 
                    t.arg = b), t.delegate = null, P) : i : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), 
                    t.delegate = null, P);
                }
                function f(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), 
                    this.tryEntries.push(t);
                }
                function p(e) {
                    var t = e.completion || {};
                    t.type = "normal", delete t.arg, e.completion = t;
                }
                function m(e) {
                    this.tryEntries = [ {
                        tryLoc: "root"
                    } ], e.forEach(f, this), this.reset(!0);
                }
                function h(e) {
                    if (e) {
                        var t = e[w];
                        if (t) return t.call(e);
                        if ("function" == typeof e.next) return e;
                        if (!isNaN(e.length)) {
                            var n = -1, r = function o() {
                                for (;++n < e.length; ) if (_.call(e, n)) return o.value = e[n], o.done = !1, o;
                                return o.value = b, o.done = !0, o;
                            };
                            return r.next = r;
                        }
                    }
                    return {
                        next: g
                    };
                }
                function g() {
                    return {
                        value: b,
                        done: !0
                    };
                }
                var b, v = Object.prototype, _ = v.hasOwnProperty, y = "function" == typeof Symbol ? Symbol : {}, w = y.iterator || "@@iterator", k = y.toStringTag || "@@toStringTag", E = "object" == typeof t, C = n.regeneratorRuntime;
                if (C) return void (E && (t.exports = C));
                C = n.regeneratorRuntime = E ? t.exports : {}, C.wrap = r;
                var x = "suspendedStart", S = "suspendedYield", T = "executing", N = "completed", P = {}, j = {};
                j[w] = function() {
                    return this;
                };
                var I = Object.getPrototypeOf, A = I && I(I(h([])));
                A && A !== v && _.call(A, w) && (j = A);
                var L = s.prototype = i.prototype = Object.create(j);
                a.prototype = L.constructor = s, s.constructor = a, s[k] = a.displayName = "GeneratorFunction", 
                C.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === a || "GeneratorFunction" === (t.displayName || t.name));
                }, C.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, s) : (e.__proto__ = s, k in e || (e[k] = "GeneratorFunction")), 
                    e.prototype = Object.create(L), e;
                }, C.awrap = function(e) {
                    return {
                        __await: e
                    };
                }, c(l.prototype), C.AsyncIterator = l, C.async = function(e, t, n, o) {
                    var i = new l(r(e, t, n, o));
                    return C.isGeneratorFunction(t) ? i : i.next().then(function(e) {
                        return e.done ? e.value : i.next();
                    });
                }, c(L), L[k] = "Generator", L.toString = function() {
                    return "[object Generator]";
                }, C.keys = function(e) {
                    var t = [];
                    for (var n in e) t.push(n);
                    return t.reverse(), function r() {
                        for (;t.length; ) {
                            var n = t.pop();
                            if (n in e) return r.value = n, r.done = !1, r;
                        }
                        return r.done = !0, r;
                    };
                }, C.values = h, m.prototype = {
                    constructor: m,
                    reset: function(e) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = b, this.done = !1, this.delegate = null, 
                        this.method = "next", this.arg = b, this.tryEntries.forEach(p), !e) for (var t in this) "t" === t.charAt(0) && _.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = b);
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0], t = e.completion;
                        if ("throw" === t.type) throw t.arg;
                        return this.rval;
                    },
                    dispatchException: function(e) {
                        function t(t, r) {
                            return i.type = "throw", i.arg = e, n.next = t, r && (n.method = "next", n.arg = b), 
                            !!r;
                        }
                        if (this.done) throw e;
                        for (var n = this, r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r], i = o.completion;
                            if ("root" === o.tryLoc) return t("end");
                            if (o.tryLoc <= this.prev) {
                                var a = _.call(o, "catchLoc"), s = _.call(o, "finallyLoc");
                                if (a && s) {
                                    if (this.prev < o.catchLoc) return t(o.catchLoc, !0);
                                    if (this.prev < o.finallyLoc) return t(o.finallyLoc);
                                } else if (a) {
                                    if (this.prev < o.catchLoc) return t(o.catchLoc, !0);
                                } else {
                                    if (!s) throw new Error("try statement without catch or finally");
                                    if (this.prev < o.finallyLoc) return t(o.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var r = this.tryEntries[n];
                            if (r.tryLoc <= this.prev && _.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                var o = r;
                                break;
                            }
                        }
                        o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                        var i = o ? o.completion : {};
                        return i.type = e, i.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, 
                        P) : this.complete(i);
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, 
                        this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), 
                        P;
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var n = this.tryEntries[t];
                            if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), p(n), P;
                        }
                    },
                    "catch": function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var n = this.tryEntries[t];
                            if (n.tryLoc === e) {
                                var r = n.completion;
                                if ("throw" === r.type) {
                                    var o = r.arg;
                                    p(n);
                                }
                                return o;
                            }
                        }
                        throw new Error("illegal catch attempt");
                    },
                    delegateYield: function(e, t, n) {
                        return this.delegate = {
                            iterator: h(e),
                            resultName: t,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = b), P;
                    }
                };
            }("object" == typeof n ? n : "object" == typeof window ? window : "object" == typeof self ? self : this);
        }).call(this, e("_process"), "undefined" != typeof window ? window : {});
    }, {
        _process: 158
    } ],
    165: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), e("extension-api/globals");
        var r = e("config");
        r.initGlobal("chrome", "cs");
        var o = e("extension-api/chrome"), i = e("extension-api"), a = e("extension-api/web-extensions");
        a.hacksForCompatibility(), i.initGlobalExtensionApi(o.createApi()), e("universal/cs");
    }, {
        config: 169,
        "extension-api": 177,
        "extension-api/chrome": 175,
        "extension-api/globals": 176,
        "extension-api/web-extensions": 184,
        "universal/cs": 342
    } ],
    166: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r, o = e("stdlib"), i = e("./url"), a = e("./services");
        !function(e) {
            function t(e, t, s) {
                var c = "prod" === t ? "https://f-log-extension.grammarly.io" : "qa" === t || "dev" === t ? "https://127.0.0.1:8000" : o.assertNever(t), l = "prod" === t ? r : "qa" === t || "dev" === t ? "qagr.io" : o.assertNever(t);
                return {
                    url: i.UrlConfig.create(r, c, s),
                    gnar: a.GnarConfig.create(e, l),
                    felog: a.FelogConfig.create(e),
                    extensionId: n
                };
            }
            var n = "87677a2c52b84ad3a151a4a72f5bd3c4", r = "grammarly.com";
            e.create = t;
        }(r = n.AppConfig || (n.AppConfig = {}));
    }, {
        "./services": 171,
        "./url": 173,
        stdlib: 328
    } ],
    167: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r, o = e("stdlib");
        !function(e) {
            function t(e, t, n, r, o, i, a) {
                var s = void 0 !== i && void 0 !== a ? i : "UNVERSIONED", c = e + "." + t + "." + n, l = [ "prod" !== o ? o : null, s !== r ? s : null ].filter(function(e) {
                    return !!e;
                }).join(".");
                return {
                    version: c,
                    fullVersion: c + "-" + [ r, l ].filter(function(e) {
                        return "" !== e;
                    }).join("/"),
                    commitHash: a,
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
                        return o.assertNever(e);
                    }
                } catch (r) {
                    return void console.error("Could not get extension version from manifest", r);
                }
            }
            e.create = t, e.getManifestVersion = n;
        }(r = n.BuildInfo || (n.BuildInfo = {}));
    }, {
        stdlib: 328
    } ],
    168: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r, o = e("stdlib");
        !function(e) {
            function t(e) {
                return o.optionalStringUnion([ "chrome", "safari", "firefox", "edge" ], e);
            }
            function n(e) {
                return e.chrome && /google/i.test(e.navigator.vendor) ? "chrome" : e.navigator.userAgent.indexOf("Firefox") !== -1 ? "firefox" : /^((?!chrome).)*safari/i.test(e.navigator.userAgent) ? "safari" : "Netscape" === e.navigator.appName && e.navigator.appVersion.indexOf("Edge") > -1 ? "edge" : void 0;
            }
            e.create = t, e.detect = n;
        }(r = n.TargetBrowser || (n.TargetBrowser = {}));
        var i;
        !function(e) {
            function t(e) {
                return o.optionalStringUnion([ "dev", "prod", "qa" ], e);
            }
            e.create = t;
        }(i = n.TargetEnv || (n.TargetEnv = {}));
        var a;
        !function(e) {
            function t(e) {
                return o.optionalStringUnion([ "bg", "cs", "popup" ], e);
            }
            function n(e, t) {
                function n() {
                    try {
                        return e.safari.extension.globalPage.contentWindow !== e;
                    } catch (t) {
                        return !1;
                    }
                }
                var r = !!e.IS_BG, o = "safari" === t ? n() : !!e.IS_POPUP;
                return r ? "bg" : o ? "popup" : "cs";
            }
            e.create = t, e.detect = n;
        }(a = n.TargetContext || (n.TargetContext = {}));
        var s;
        !function(e) {
            function t(e, t, n) {
                return {
                    browser: e,
                    env: t,
                    context: n
                };
            }
            e.create = t;
        }(s = n.BundleInfo || (n.BundleInfo = {}));
    }, {
        stdlib: 328
    } ],
    169: [ function(e, t, n) {
        "use strict";
        function r(e) {
            for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t]);
        }
        function o() {
            return l.get();
        }
        function i(e, t, n) {
            l.init(a.MainConfig.create(e, t, n || a.ProcessEnv.fromBrowserify())), window.GR_CFG = l.get();
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), r(e("./app")), r(e("./build")), r(e("./bundle")), r(e("./services")), r(e("./system")), 
        r(e("./url")), r(e("./mainConfig"));
        var a = e("./mainConfig"), s = e("./bundle"), c = e("stdlib"), l = new c.Global(function() {
            console.warn("Global config not initialized -- using fall back value.");
            var e = c.assertNonNull(s.TargetBrowser.detect(window), "runtime-detected browser type"), t = a.MainConfig.create(e, s.TargetContext.detect(window, e), a.ProcessEnv.fromBrowserify());
            return window.GR_CFG = t, t;
        });
        n.getGlobal = o, n.initGlobal = i;
    }, {
        "./app": 166,
        "./build": 167,
        "./bundle": 168,
        "./mainConfig": 170,
        "./services": 171,
        "./system": 172,
        "./url": 173,
        stdlib: 328
    } ],
    170: [ function(e, t, n) {
        (function(t) {
            "use strict";
            function r(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            var o = e("babel-runtime/helpers/slicedToArray"), i = r(o);
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var a, s = e("./app"), c = e("./build"), l = e("./system"), u = e("./bundle"), d = e("stdlib");
            !function(e) {
                function n(e, t, n, r, o, i, a) {
                    return {
                        env: e,
                        major_number: t,
                        build_number: n,
                        release_number: r,
                        git_branch: o,
                        git_commit: i,
                        popup_url: a
                    };
                }
                function r() {
                    return n("prod", "14", "794", "1083", t.env.GIT_BRANCH, "9a2e211e63c063be2ea48c13d2448ef885669f14", "https://s3.amazonaws.com/grammarly_neweditor/index/1.0.87-browserplugin_2.0/popup.html");
                }
                e.create = n, e.fromBrowserify = r;
            }(a = n.ProcessEnv || (n.ProcessEnv = {}));
            var f;
            !function(e) {
                function t(e, t, n) {
                    var r = void 0;
                    if (n.env) {
                        var o = u.TargetEnv.create(n.env);
                        void 0 !== o ? r = o : (console.warn("*** process.env.ENV is invalid ('" + n.env + "'), assuming 'prod' env"), 
                        r = "prod");
                    } else console.warn("*** process.env.ENV is not defined, assuming 'prod' env"), 
                    r = "prod";
                    var a = d.assertNonNull(r, "ENV env var OR a fallback value"), f = [ n.major_number, n.build_number, n.release_number ].map(d.optionalIntString), p = void 0;
                    if (3 === f.length && f.every(function(e) {
                        return void 0 !== e;
                    })) p = f; else {
                        var m = (c.BuildInfo.getManifestVersion(e, t, window) || "").split(".").map(d.optionalIntString);
                        p = 3 === m.length && m.every(function(e) {
                            return void 0 !== e;
                        }) ? m : [ 4, 0, 2 ];
                    }
                    var h = p, g = (0, i["default"])(h, 3), b = g[0], v = g[1], _ = g[2];
                    return {
                        buildInfo: c.BuildInfo.create(b, v, _, e, a, n.git_branch, n.git_commit),
                        bundleInfo: u.BundleInfo.create(e, a, t),
                        appConfig: s.AppConfig.create(e, a, n.popup_url),
                        systemInfo: l.SystemInfo.create(e, window)
                    };
                }
                e.create = t;
            }(f = n.MainConfig || (n.MainConfig = {}));
        }).call(this, e("_process"));
    }, {
        "./app": 166,
        "./build": 167,
        "./bundle": 168,
        "./system": 172,
        _process: 158,
        "babel-runtime/helpers/slicedToArray": 40,
        stdlib: 328
    } ],
    171: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r, o = e("stdlib");
        !function(e) {
            function t(e, t) {
                return {
                    appName: o.assertNonNull(n[e], "gnar app name"),
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
        }(r = n.GnarConfig || (n.GnarConfig = {}));
        var i;
        !function(e) {
            function t(e) {
                return {
                    appName: o.assertNonNull(n[e], "felog app name")
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
        stdlib: 328
    } ],
    172: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r, o = e("./bundle"), i = e("stdlib");
        !function(e) {
            function t(e, t) {
                var n = o.TargetBrowser.detect(t) || "other";
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
        }(r = n.BrowserInfo || (n.BrowserInfo = {}));
        var a;
        !function(e) {
            function t(e) {
                return {
                    isWindows: e.navigator.appVersion.indexOf("Win") !== -1
                };
            }
            e.create = t;
        }(a = n.OsInfo || (n.OsInfo = {}));
        var s;
        !function(e) {
            function t(e, t) {
                return {
                    browser: r.create(e, t),
                    os: a.create(t)
                };
            }
            e.create = t;
        }(s = n.SystemInfo || (n.SystemInfo = {}));
    }, {
        "./bundle": 168,
        stdlib: 328
    } ],
    173: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r;
        !function(e) {
            function t(e, t, n) {
                var r = "https://www." + e, o = "https://data." + e, i = "https://app." + e, a = "https://auth." + e + "/v3", s = "https://emailfeedback." + e;
                return {
                    app: i,
                    appPersonalDictionary: i + "/profile/dictionary",
                    capi: "wss://capi." + e + "/freews",
                    dapiMimic: o + "/api/mimic",
                    dapiProps: o + "/api/props",
                    editorDictionary: i + "/profile/dictionary",
                    dictionary: "https://capi." + e + "/api/defs",
                    docs: i + "/docs",
                    docsApi: "https://dox." + e + "/documents",
                    authCreatePage: a + "/redirect-anonymous?location=" + r + "/after_install_page",
                    userOrAnonymous: a + "/user/oranonymous",
                    authSignin: a + "/login",
                    authSignup: a + "/signup",
                    signin: r + "/signin",
                    signup: r + "/signup",
                    resetPassword: r + "/resetpassword",
                    saveEmailFeedback: s + "/api/feedback/",
                    newFelog: t,
                    referral: r + "/referral?page=extension",
                    welcomeC: r + "/extension-success",
                    upgrade: r + "/upgrade",
                    uninstall: r + "/extension-uninstall",
                    terms: r + "/terms",
                    policy: r + "/privacy-policy",
                    pageConfigUrl: "https://d3cv4a9a9wh0bt.cloudfront.net/browserplugin/config.json",
                    popupUrl: n,
                    grammarlyDomain: e
                };
            }
            e.create = t;
        }(r = n.UrlConfig || (n.UrlConfig = {}));
    }, {} ],
    174: [ function(e, t, n) {
        "use strict";
        function r(e, t) {
            chrome.runtime.lastError ? t(chrome.runtime.lastError) : e();
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.handleChromeError = r;
    }, {} ],
    175: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            return new S();
        }
        var i = e("babel-runtime/core-js/promise"), a = r(i), s = e("babel-runtime/core-js/object/assign"), c = r(s), l = e("babel-runtime/helpers/classCallCheck"), u = r(l), d = e("babel-runtime/helpers/createClass"), f = r(d), p = e("babel-runtime/helpers/defineProperty"), m = (r(p), 
        e("babel-runtime/core-js/object/get-own-property-symbols")), h = r(m), g = function(e, t) {
            var n = {};
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && "function" == typeof h["default"]) for (var o = 0, r = (0, h["default"])(e); o < r.length; o++) t.indexOf(r[o]) < 0 && (n[r[o]] = e[r[o]]);
            return n;
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var b = e("./message/bg"), v = e("./message/content"), _ = e("./tabs/chrome"), y = e("./chrome-util"), w = e("./web-extensions"), k = e("lib/util"), E = e("stdlib"), C = function() {
            function e(t) {
                (0, u["default"])(this, e), this.port = chrome.runtime.connect({
                    name: t
                });
            }
            return (0, f["default"])(e, [ {
                key: "onMessage",
                value: function(e) {
                    this.port.onMessage.addListener(e);
                }
            }, {
                key: "onDisconnect",
                value: function(e) {
                    this.port.onDisconnect.addListener(e);
                }
            }, {
                key: "postMessage",
                value: function(e) {
                    this.port.postMessage(e);
                }
            } ]), e;
        }(), x = function() {
            function e(t) {
                (0, u["default"])(this, e), this._port = t, this.sender = {};
                var n = t.sender, r = t.name;
                this.name = r, n && (this.sender.url = n.url, n.tab && n.tab.url && n.tab.id && (this.sender.tab = {
                    url: n.tab.url,
                    id: n.tab.id,
                    active: n.tab.active
                }));
            }
            return (0, f["default"])(e, [ {
                key: "onMessage",
                value: function(e) {
                    this._port.onMessage.addListener(e);
                }
            }, {
                key: "onDisconnect",
                value: function(e) {
                    this._port.onDisconnect.addListener(e);
                }
            }, {
                key: "postMessage",
                value: function(e) {
                    this._port.postMessage(e);
                }
            } ]), e;
        }(), S = function T() {
            (0, u["default"])(this, T), this.tabs = new _.ChromeTabsApiImpl(), this.notification = {
                kind: "web-extension",
                create: function(e) {
                    return E.SafePromise.create(function(t, n) {
                        var r = e.onClicked, o = e.onButtonClicked, i = g(e, [ "onClicked", "onButtonClicked" ]), a = chrome.notifications, s = k.guid();
                        a.create(s, (0, c["default"])({
                            type: "basic"
                        }, i), function() {
                            y.handleChromeError(function() {
                                void 0 !== r && a.onClicked.addListener(r), void 0 !== o && a.onButtonClicked.addListener(o), 
                                t(s);
                            }, n);
                        });
                    });
                },
                clear: function(e) {
                    return E.SafePromise.create(function(t, n) {
                        chrome.notifications.clear(e, function(e) {
                            y.handleChromeError(function() {
                                return t(e);
                            }, n);
                        });
                    });
                }
            }, this.cookies = {
                kind: "web-extension",
                get: function(e) {
                    return E.SafePromise.create(function(t, n) {
                        return chrome.cookies.get(e, function(e) {
                            return y.handleChromeError(function() {
                                return t(e);
                            }, n);
                        });
                    });
                },
                remove: function(e) {
                    return new a["default"](function(t, n) {
                        return chrome.cookies.remove(e, function() {
                            return y.handleChromeError(function() {
                                return t(null);
                            }, n);
                        });
                    });
                },
                getAll: function(e) {
                    return E.SafePromise.create(function(t, n) {
                        return chrome.cookies.getAll(e, function(e) {
                            return y.handleChromeError(function() {
                                return t(e);
                            }, n);
                        });
                    });
                },
                set: function(e) {
                    return E.SafePromise.create(function(t, n) {
                        return chrome.cookies.set(e, function(e) {
                            return y.handleChromeError(function() {
                                return t(e);
                            }, n);
                        });
                    });
                },
                watch: function(e, t) {
                    chrome.cookies.onChanged.addListener(function(n) {
                        var r = n.cookie, o = n.cause;
                        !r || !r.name || e.path && e.path !== r.path || e.name !== r.name || e.domain && r.domain.indexOf(e.domain) === -1 || ("explicit" === o && t(r), 
                        "expired_overwrite" === o && t());
                    });
                }
            }, this.preferences = w.preferencesApi.windowLocalStorage, this.button = {
                kind: "web-extension",
                setBadge: function(e) {
                    chrome.browserAction.setBadgeText({
                        text: e
                    });
                },
                setIconByName: function(e) {
                    var t = "./src/icon/icon", n = e ? "-" + e : "";
                    chrome.browserAction.setIcon({
                        path: {
                            "16": t + "16" + n + ".png",
                            "32": t + "32" + n + ".png"
                        }
                    });
                },
                setBadgeBackgroundColor: function(e) {
                    chrome.browserAction.setBadgeBackgroundColor({
                        color: e
                    });
                }
            }, this.management = {
                uninstallSelf: function() {
                    chrome.management.uninstallSelf();
                }
            }, this.message = k.isBg() ? new b.GenericBackgroundMessageApiImpl(function(e) {
                return chrome.runtime.onConnect.addListener(function(t) {
                    return e(new x(t));
                });
            }, this.tabs.getActiveTab.bind(this.tabs), this.tabs.getAllTabs.bind(this.tabs)) : new v.GenericContentScriptMessageApiImpl(function(e) {
                return new C(e);
            });
        };
        n.createApi = o;
    }, {
        "./chrome-util": 174,
        "./message/bg": 179,
        "./message/content": 180,
        "./tabs/chrome": 183,
        "./web-extensions": 184,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/get-own-property-symbols": 27,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "lib/util": 322,
        stdlib: 328
    } ],
    176: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), window.firefox = window.browser;
        try {
            window.firefox = browser;
        } catch (r) {}
        window.edge = window.browser, window.chrome = window.chrome, n["default"] = void 0;
    }, {} ],
    177: [ function(e, t, n) {
        "use strict";
        function r(e) {
            for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t]);
        }
        function o(e) {
            window.extensionApi && console.warn("Extension Api init called more than once"), 
            window.extensionApi = window.extensionApi || e;
        }
        function i() {
            return a.assertNonNull(window.extensionApi, "extension api was not initialized");
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("stdlib");
        r(e("./interface")), n.initGlobalExtensionApi = o, n.getGlobalExtensionApi = i;
    }, {
        "./interface": 178,
        stdlib: 328
    } ],
    178: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.ports = {
            bridge: "bridge",
            background: "message:to-priv",
            broadcast: "message:to-non-priv"
        };
    }, {} ],
    179: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var e = 4, t = (d.isChrome() || d.isFF()) && (!chrome.extension || !chrome.tabs || !chrome.runtime || !chrome.runtime.onConnect), n = d.isEdge() && (!edge.extension || !edge.tabs || !edge.runtime || !edge.runtime.onConnect);
            if (t || n) {
                var r = window.localStorage.getItem("bgInitFail") || "0", o = parseInt(r, 10);
                o > e ? console.error("too many bgInitFail", o) : (window.localStorage.setItem("bgInitFail", (o + 1).toString()), 
                document.location.reload());
            }
        }
        function i(e) {
            if (!e) return !1;
            var t = f.getGlobal().bundleInfo.browser, n = "firefox" === t ? /^moz-extension:\/\/.*\/src\/popup.html$/ : "edge" === t ? /^ms-browser-extension:\/\/.*\/src\/popup.html$/ : "chrome" === t ? chrome && chrome.runtime && chrome.runtime.id ? new RegExp(chrome.runtime.id + "/src/popup.html") : void 0 : p.assertNever(t);
            return void 0 !== n && n.test(e);
        }
        var a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = e("./helpers"), d = e("lib/util"), f = e("config"), p = e("stdlib"), m = e("../interface");
        n.SETTINGS_TAB_ID = "popup", n.bgPreload = o;
        var h = function() {
            function e(t, r, o) {
                var a = this;
                (0, s["default"])(this, e), this._getActiveTab = r, this._getAllTabs = o, this.kind = "background-message-api", 
                this._callbacks = {}, this._tabPorts = {
                    popup: []
                }, this._messageHelper = new u.MessageHelperImpl(), this._sendMessageToPorts = function(e, t) {
                    var n = a._tabPorts[e];
                    n && n.forEach(function(e) {
                        return e.postMessage(t);
                    });
                }, this.toFocused = function(e, t) {
                    return a._getActiveTab().then(function(n) {
                        var r = n.id, o = n.url;
                        if (r) return i(o) ? console.warn("toFocussed not allowed for popup when it open like regular tab", e, t) : void a._sendMessageToPorts(r.toString(), {
                            type: e,
                            content: t,
                            callid: d.guid()
                        });
                    });
                }, this.broadcast = function(e, t) {
                    if (t) {
                        var r = function(n) {
                            var r = n.id, o = n.url;
                            r && o && o.indexOf("chrome-extension:") === -1 && a._sendMessageToPorts(r.toString(), {
                                type: e,
                                callid: d.guid(),
                                content: t
                            });
                        };
                        a._getAllTabs().then(function(e) {
                            return e.forEach(r);
                        }), a._tabPorts.popup && a._tabPorts.popup.length && a._getActiveTab().then(function(e) {
                            var t = e.url, o = e.active;
                            r({
                                id: n.SETTINGS_TAB_ID,
                                url: t,
                                active: o
                            });
                        });
                    }
                }, this._initPortListener = function(e) {
                    if (e.name === m.ports.bridge) e.onMessage(function(e) {
                        "message.toFocussed" === e.method && a.toFocused(e.params && e.params.type, e.params && e.params.content);
                    }); else if (e.name === m.ports.broadcast) e.onMessage(function(e) {
                        return a.broadcast(e.type, e.content);
                    }); else if (e.name === m.ports.background) {
                        var t = e.sender;
                        if (t) {
                            if (t.tab) {
                                var r = t.tab, o = r.id, s = r.url;
                                if (o) {
                                    var c = a._tabPorts[o];
                                    void 0 === c && (c = a._tabPorts[o] = []), c.push(e);
                                }
                                s && 0 === s.indexOf("http") && a._messageHelper.fire("tab-connected", {
                                    tab: o,
                                    url: s
                                }), e.onDisconnect(function() {
                                    if (o) {
                                        var t = a._tabPorts[o];
                                        t && t.splice(t.indexOf(e), 1);
                                    }
                                });
                            }
                            var l = t.url ? t.url : t.tab ? t.tab.url : "";
                            if (l && i(l)) {
                                var u = n.SETTINGS_TAB_ID;
                                a._tabPorts[u] = a._tabPorts[u] || [], a._tabPorts[u].push(e), e.onDisconnect(function() {
                                    var t = a._tabPorts[u];
                                    t.splice(t.indexOf(e), 1);
                                });
                            }
                        }
                        e.onMessage(function(r) {
                            var o = function(n) {
                                var r = n.callid, o = n.content, i = n.type;
                                a._callbacks[r] && (a._callbacks[r](o), delete a._callbacks[r]);
                                var s = function(t) {
                                    return e.postMessage({
                                        content: t,
                                        callid: r
                                    });
                                };
                                a._messageHelper.fire(i, o, s, t && t.tab ? t.tab.id : -1);
                            };
                            "tab-connected" === r.type ? a._getActiveTab().then(function(e) {
                                var t = e.url;
                                r.content = {
                                    tab: n.SETTINGS_TAB_ID,
                                    url: t
                                }, o(r);
                            }) : o(r);
                        });
                    }
                }, t(this._initPortListener);
            }
            return (0, l["default"])(e, [ {
                key: "sendTo",
                value: function(e, t, n, r, o) {
                    var i = this._tabPorts[e];
                    if (!i || !i.length) return void (o && o({
                        message: "no ports on specified tabId"
                    }));
                    var a = {
                        type: t,
                        content: n
                    };
                    r && "function" == typeof r && (a.callid = d.guid(), this._callbacks[a.callid] = r), 
                    i.forEach(function(e) {
                        return e.postMessage(a);
                    });
                }
            }, {
                key: "listen",
                value: function(e, t) {
                    this._messageHelper.listen(e, t);
                }
            } ]), e;
        }();
        n.GenericBackgroundMessageApiImpl = h;
    }, {
        "../interface": 178,
        "./helpers": 181,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        config: 169,
        "lib/util": 322,
        stdlib: 328
    } ],
    180: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            window.addEventListener("update-window-size-gr", function(e) {
                function t() {
                    document.body.appendChild(n), setTimeout(function() {
                        n.parentNode && n.parentNode.removeChild(n);
                    }, 10);
                }
                var n = document.createElement("div");
                if (n.style.height = "1px", e.detail && e.detail.force) {
                    var r = setInterval(t, 100);
                    setTimeout(function() {
                        return clearInterval(r);
                    }, 405);
                }
            }, !1), window.addEventListener("close-popup-gr", function() {
                window.navigator.userAgent.indexOf("Firefox") !== -1 && window.close();
            }, !1);
        }
        var i = e("babel-runtime/helpers/classCallCheck"), a = r(i), s = e("babel-runtime/helpers/createClass"), c = r(s);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = e("stdlib"), u = e("./helpers"), d = e("lib/util"), f = e("../interface"), p = function() {
            function e(t) {
                var n = this;
                (0, a["default"])(this, e), this.kind = "content-script-message-api", this._callbacks = {}, 
                this._messageHelper = new u.MessageHelperImpl(), this._proxyPortsStorage = {}, this.broadcastBackground = function() {
                    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    return n._emit(n.backgroundPort, "bg").apply(null, t);
                }, this.broadcast = function() {
                    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    return n._emit(n.broadcastPort, "tabs").apply(null, t);
                }, this._onPortMessage = function(e) {
                    console.log("[Messaging] extension api", "portMessage", e);
                }, this._checkHealth = function() {
                    function e() {
                        document.removeEventListener("grammarly:pong", s), i && (clearTimeout(i), i = null), 
                        o && (clearInterval(o), o = null);
                    }
                    var t = 500, r = 5e3, o = null, i = null, a = function() {
                        return document.dispatchEvent(new CustomEvent("grammarly:ping"));
                    }, s = function() {
                        e();
                    }, c = function() {
                        [ n.port, n.backgroundPort, n.broadcastPort ].forEach(function(e) {
                            e && e.removeMessageListeners && e.removeMessageListeners();
                        }), n.port = n.backgroundPort = n.broadcastPort = null, e(), document.addEventListener("grammarly:proxyports", n._onGrammarlyResetAfterTimeout), 
                        document.dispatchEvent(new CustomEvent("grammarly:offline"));
                    };
                    return function() {
                        e(), document.addEventListener("grammarly:pong", s), o = window.setInterval(a, t), 
                        i = window.setTimeout(c, r);
                    };
                }(), this._onGrammarlyResetAfterTimeout = function() {
                    document.removeEventListener("grammarly:proxyports", n._onGrammarlyResetAfterTimeout), 
                    n.port = n._initProxyPort(f.ports.bridge, n._onPortMessage, n._checkHealth, !0), 
                    n.backgroundPort = n._initProxyPort(f.ports.background, n._onBgPortMessage, n._checkHealth), 
                    n.broadcastPort = n._initProxyPort(f.ports.broadcast, null, n._checkHealth);
                }, this._onBgPortMessage = function(e) {
                    var t = e.callid, r = e.content, o = e.type;
                    n._callbacks[t] ? (n._callbacks[t](r), delete n._callbacks[t]) : n._messageHelper.fire(o, r, function(e) {
                        if (!n.backgroundPort) throw new Error("fail reply to bg page - connection lost");
                        n.backgroundPort.postMessage({
                            content: e,
                            callid: t
                        });
                    });
                }, this._initProxyPort = function(e, t, r) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], i = n._proxyPort(e);
                    return o && n._checkHealth(), t && i.onMessage(t), r && i.onDisconnect(r), i;
                }, this._emit = function(e, t) {
                    return function(r, o, i, a) {
                        var s = d.guid();
                        i && "function" == typeof i && (n._callbacks[s] = i);
                        try {
                            if (!e) throw new Error("lost connection to " + t + " port");
                            e.postMessage({
                                type: r,
                                callid: s,
                                content: o
                            });
                        } catch (c) {
                            if (!a) throw c;
                            a(c);
                        }
                    };
                }, this._proxyPort = function(e) {
                    n._proxyPortsStorage[e] = {};
                    var t = function(t, r) {
                        var o = r.detail;
                        if (o.name === e) {
                            var i = n._proxyPortsStorage[e][t];
                            i && i(o.msg);
                        }
                    }, r = function(e) {
                        return t("success", e);
                    }, o = function(e) {
                        return t("error", e);
                    };
                    return document.addEventListener("grammarly:message", r), document.addEventListener("grammarly:error", o), 
                    {
                        postMessage: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = {
                                data: t,
                                name: e
                            };
                            return document.dispatchEvent(new CustomEvent("grammarly:action", {
                                detail: n
                            }));
                        },
                        onMessage: function(t) {
                            n._proxyPortsStorage[e].success = t;
                        },
                        onDisconnect: function(t) {
                            n._proxyPortsStorage[e].error = t;
                        },
                        removeMessageListeners: function() {
                            document.removeEventListener("grammarly:message", r), document.removeEventListener("grammarly:error", o);
                        }
                    };
                }, this.port = t(f.ports.bridge), this.port.onMessage(this._onPortMessage), this.port.onDisconnect(function() {
                    n.port = null, n.port = n._initProxyPort(f.ports.bridge, n._onPortMessage, n._checkHealth, !0);
                }), this.backgroundPort = t(f.ports.background), this.backgroundPort.onMessage(this._onBgPortMessage), 
                this.backgroundPort.onDisconnect(function() {
                    n.backgroundPort = null, n.backgroundPort = n._initProxyPort(f.ports.background, n._onBgPortMessage, n._checkHealth);
                }), this.broadcastPort = t(f.ports.broadcast), this.broadcastPort.onDisconnect(function() {
                    n.broadcastPort = null, n.broadcastPort = n._initProxyPort(f.ports.broadcast, null, n._checkHealth);
                });
            }
            return (0, c["default"])(e, [ {
                key: "listen",
                value: function(e, t) {
                    this._messageHelper.listen(e, t);
                }
            }, {
                key: "toFocused",
                value: function(e, t) {
                    var n = this;
                    return l.SafePromise.create(function(r) {
                        if (!n.port) throw new Error("lost connection to bg page");
                        n.port.postMessage({
                            method: "message.toFocussed",
                            params: {
                                type: e,
                                content: t
                            }
                        }), r();
                    });
                }
            } ]), e;
        }();
        n.GenericContentScriptMessageApiImpl = p, n.hacksForCompatibility = o;
    }, {
        "../interface": 178,
        "./helpers": 181,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "lib/util": 322,
        stdlib: 328
    } ],
    181: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            return safari.application.activeBrowserWindow && safari.application.activeBrowserWindow.activeTab;
        }
        function i() {
            var e = o();
            return e && e.url || "http://newtab";
        }
        function a() {
            function e(e, t, o) {
                var i = n[e];
                i ? i.forEach(function(e) {
                    return e(t, o);
                }) : (r[e] || (r[e] = []), r[e].push({
                    data: t,
                    callback: o
                }));
            }
            function t(e, t) {
                n[e] || (n[e] = []), n[e].push(t), r[e] && r[e].forEach(function(e) {
                    return t(e.data, e.callback);
                });
            }
            var n = {}, r = {};
            return {
                emit: e,
                on: t
            };
        }
        var s = e("babel-runtime/core-js/get-iterator"), c = r(s), l = e("babel-runtime/helpers/classCallCheck"), u = r(l);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var d = e("lib/config"), f = function() {}, p = function m() {
            var e = this;
            (0, u["default"])(this, m), this._listeners = {}, this._queue = {}, this.fire = function(t, n) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : f, o = arguments[3], i = e._listeners[t] || [];
                i.length ? i.forEach(function(e) {
                    return e(n, r, o);
                }) : (e._queue[t] = e._queue[t] || [], e._queue[t].push({
                    content: n,
                    callback: r,
                    sender: o
                }));
            }, this.unlisten = function(t, n) {
                var r = e._listeners[t] || [], o = r.indexOf(n);
                o !== -1 && (1 === r.length ? delete e._listeners[t] : r.splice(o, 1));
            }, this.listenOnce = function(t, n) {
                var r = function o(r, i, a) {
                    e.unlisten(t, o), n && n(r, i, a);
                };
                e.listen(t, r);
            }, this.listen = function(t, n) {
                e._listeners[t] = e._listeners[t] || [], e._listeners[t].indexOf(n) === -1 && e._listeners[t].push(n);
                var r = e._queue[t] || [];
                if (r.length) {
                    var o = !0, i = !1, a = void 0;
                    try {
                        for (var s, l = (0, c["default"])(r); !(o = (s = l.next()).done); o = !0) {
                            var u = s.value;
                            try {
                                n(u.content, u.callback, u.sender);
                            } catch (d) {
                                console.error("exception during proccesing buffered messages", d);
                            }
                        }
                    } catch (f) {
                        i = !0, a = f;
                    } finally {
                        try {
                            !o && l["return"] && l["return"]();
                        } finally {
                            if (i) throw a;
                        }
                    }
                    delete e._queue[t];
                }
            };
        };
        n.MessageHelperImpl = p, n.safariBridgeId = "forge-bridge" + d.getUuid(), n.getSafariActiveTab = o, 
        n.getSafariActiveTabUrl = i, n.emitter = a;
    }, {
        "babel-runtime/core-js/get-iterator": 20,
        "babel-runtime/helpers/classCallCheck": 34,
        "lib/config": 211
    } ],
    182: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            return {
                get: e.get.bind(e),
                set: e.set.bind(e),
                getAll: e.getAll.bind(e),
                remove: e.remove.bind(e),
                removeAll: function() {
                    return h(this, void 0, void 0, u["default"].mark(function n() {
                        var r;
                        return u["default"].wrap(function(n) {
                            for (;;) switch (n.prev = n.next) {
                              case 0:
                                return n.next = 2, e.getAll();

                              case 2:
                                return r = n.sent, n.next = 5, e.removeAll();

                              case 5:
                                return n.next = 7, m["default"].all((0, f["default"])(r).filter(t).map(function(t) {
                                    return e.set(t, r[t]);
                                }));

                              case 7:
                              case "end":
                                return n.stop();
                            }
                        }, n, this);
                    }));
                }
            };
        }
        var i = e("babel-runtime/helpers/classCallCheck"), a = r(i), s = e("babel-runtime/helpers/createClass"), c = r(s), l = e("babel-runtime/regenerator"), u = r(l), d = e("babel-runtime/core-js/object/keys"), f = r(d), p = e("babel-runtime/core-js/promise"), m = r(p), h = function(e, t, n, r) {
            return new (n || (n = m["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g, b = e("stdlib"), v = e("lodash");
        !function(e) {
            e[e.success = 0] = "success", e[e.successWithEmpty = 1] = "successWithEmpty", e[e.alreadyMigrated = 2] = "alreadyMigrated";
        }(g = n.StorageMigrationResult || (n.StorageMigrationResult = {}));
        var _;
        !function(e) {
            e[e.nonEmptyMigration = 0] = "nonEmptyMigration", e[e.emptyMigration = 1] = "emptyMigration";
        }(_ || (_ = {})), n.createMigrationAwareApi = o;
        var y = function() {
            function e(t, n, r) {
                var i = this, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
                (0, a["default"])(this, e), this._name = t, this._source = n, this._destination = r, 
                this._destValuesToKeep = s, this._migrationFlagSuccessfulValue = "ok", this._migrationFlagUniqueKey = "104ccd8c-9919-9ae4-931f-782fb197486c", 
                this._migrationFlagKey = "__migration-" + this._migrationFlagUniqueKey + ":(" + this._name + ")", 
                this._migrationInProgress = !1, this.migrationAwareDestination = o(this._destination, function(e) {
                    return e === i._migrationFlagKey;
                });
            }
            return (0, c["default"])(e, [ {
                key: "_getMigrated",
                value: function() {
                    var e = this;
                    return this._destination.get(this._migrationFlagKey).then(function(t) {
                        return t === e._migrationFlagSuccessfulValue;
                    });
                }
            }, {
                key: "_setMigrated",
                value: function() {
                    return h(this, void 0, void 0, u["default"].mark(function e() {
                        var t;
                        return u["default"].wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, this._destination.set(this._migrationFlagKey, this._migrationFlagSuccessfulValue);

                              case 2:
                                return e.next = 4, this._destination.get(this._migrationFlagKey);

                              case 4:
                                if (t = e.sent, t === this._migrationFlagSuccessfulValue) {
                                    e.next = 7;
                                    break;
                                }
                                throw new Error("Could not verify status write, actual value: " + t);

                              case 7:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                }
            }, {
                key: "_runMigration",
                value: function() {
                    return h(this, void 0, void 0, u["default"].mark(function e() {
                        var t, n, r = this;
                        return u["default"].wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return b.assert(!this._migrationInProgress, "migration already in progress"), this._migrationInProgress = !0, 
                                e.prev = 2, e.next = 5, this._source.getAll();

                              case 5:
                                return t = e.sent, n = 0 === (0, f["default"])(t).length, e.next = 9, m["default"].all(this._destValuesToKeep.map(function(e) {
                                    return r._destination.get(e).then(function(n) {
                                        null != n && (t[e] = n);
                                    });
                                }));

                              case 9:
                                return e.next = 11, this._destination.removeAll();

                              case 11:
                                return e.next = 13, m["default"].all((0, f["default"])(t).filter(function(e) {
                                    return null != t[e];
                                }).map(function(e) {
                                    return r._destination.set(e, t[e]);
                                }));

                              case 13:
                                return e.t0 = v, e.t1 = t, e.next = 17, this._destination.getAll();

                              case 17:
                                if (e.t2 = e.sent, e.t0.isEqual.call(e.t0, e.t1, e.t2)) {
                                    e.next = 20;
                                    break;
                                }
                                throw new Error("Could not verify write");

                              case 20:
                                return this._migrationInProgress = !1, e.abrupt("return", n ? _.emptyMigration : _.nonEmptyMigration);

                              case 24:
                                throw e.prev = 24, e.t3 = e["catch"](2), this._migrationInProgress = !1, e.t3;

                              case 28:
                              case "end":
                                return e.stop();
                            }
                        }, e, this, [ [ 2, 24 ] ]);
                    }));
                }
            }, {
                key: "ensureMigrationCompleted",
                value: function() {
                    return h(this, void 0, void 0, u["default"].mark(function e() {
                        var t, n;
                        return u["default"].wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, this._getMigrated();

                              case 2:
                                if (!e.sent) {
                                    e.next = 6;
                                    break;
                                }
                                return e.abrupt("return", g.alreadyMigrated);

                              case 6:
                                return e.next = 8, this._runMigration();

                              case 8:
                                return t = e.sent, e.next = 11, this._setMigrated();

                              case 11:
                                e.t0 = t, e.next = e.t0 === _.nonEmptyMigration ? 14 : e.t0 === _.emptyMigration ? 15 : 16;
                                break;

                              case 14:
                                return e.abrupt("return", g.success);

                              case 15:
                                return e.abrupt("return", g.successWithEmpty);

                              case 16:
                                throw n = t, new Error("Match not exhaustive: " + t);

                              case 18:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                }
            } ]), e;
        }();
        n.StorageMigration = y;
    }, {
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/regenerator": 43,
        lodash: "lodash",
        stdlib: 328
    } ],
    183: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/classCallCheck"), i = r(o), a = e("babel-runtime/helpers/createClass"), s = r(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("../chrome-util"), l = e("stdlib"), u = function() {
            function e() {
                (0, i["default"])(this, e), this.kind = "web-extension";
            }
            return (0, s["default"])(e, [ {
                key: "open",
                value: function(e, t) {
                    return l.SafePromise.create(function(n, r) {
                        chrome.tabs.create({
                            url: e,
                            active: t
                        }, function(e) {
                            c.handleChromeError(function() {
                                return n(e);
                            }, r);
                        });
                    });
                }
            }, {
                key: "updateCurrent",
                value: function(e) {
                    return l.SafePromise.create(function(t, n) {
                        chrome.tabs.update({
                            url: e
                        }, function(e) {
                            c.handleChromeError(function() {
                                return t(e);
                            }, n);
                        });
                    });
                }
            }, {
                key: "getActiveTab",
                value: function() {
                    return l.SafePromise.create(function(e, t) {
                        var n = chrome.tabs;
                        n.query({
                            active: !0,
                            lastFocusedWindow: !0
                        }, function(r) {
                            c.handleChromeError(function() {
                                r && r.length ? e(r[0]) : n.query({
                                    active: !0
                                }, function(n) {
                                    c.handleChromeError(function() {
                                        e(n[0]);
                                    }, t);
                                });
                            }, t);
                        });
                    });
                }
            }, {
                key: "getAllTabs",
                value: function() {
                    return l.SafePromise.create(function(e, t) {
                        return chrome.tabs.query({}, function(n) {
                            return c.handleChromeError(function() {
                                return e(n);
                            }, t);
                        });
                    });
                }
            }, {
                key: "getActiveTabUrl",
                value: function() {
                    var e = this;
                    return l.SafePromise.create(function(t, n) {
                        return e.getActiveTab().then(function(e) {
                            return c.handleChromeError(function() {
                                return t(e && e.url);
                            }, n);
                        });
                    });
                }
            }, {
                key: "onActiveTabChange",
                value: function(e, t) {
                    var n = this, r = function(n) {
                        c.handleChromeError(function() {
                            n && e(n);
                        }, t);
                    };
                    chrome.tabs.onActivated.addListener(function(e) {
                        return chrome.tabs.get(e.tabId, function(e) {
                            return r(e);
                        });
                    }), chrome.tabs.onUpdated.addListener(function(e, t) {
                        n.getActiveTab().then(function(n) {
                            n && n.id === e && (t.url || t.favIconUrl || "complete" === t.status) && chrome.tabs.get(e, function(e) {
                                return r(e);
                            });
                        });
                    }), chrome.windows.onFocusChanged.addListener(function(e) {
                        return chrome.tabs.query({
                            active: !0,
                            windowId: e,
                            lastFocusedWindow: !0
                        }, function(e) {
                            return r(e[0]);
                        });
                    }), this.getActiveTab().then(function(e) {
                        return r(e);
                    });
                }
            }, {
                key: "reload",
                value: function(e) {
                    return l.SafePromise.create(function(t, n) {
                        var r = function() {
                            return c.handleChromeError(function() {
                                return t();
                            }, n);
                        };
                        e ? chrome.tabs.reload(e, {}, r) : chrome.tabs.reload(r);
                    });
                }
            } ]), e;
        }();
        n.ChromeTabsApiImpl = u;
    }, {
        "../chrome-util": 174,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        stdlib: 328
    } ],
    184: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/defineProperty"), i = r(o), a = e("babel-runtime/regenerator"), s = r(a), c = e("babel-runtime/core-js/object/keys"), l = r(c), u = e("babel-runtime/core-js/promise"), d = r(u), f = function(e, t, n, r) {
            return new (n || (n = d["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var p = e("stdlib"), m = e("./storage-migration"), h = e("./message/content");
        n.hacksForCompatibility = h.hacksForCompatibility;
        var g = e("./message/bg");
        n.bgPreload = g.bgPreload;
        var b;
        !function(e) {
            function t() {
                a = !0;
                var e = p.SafePromise.createCompletionSource();
                return o = e.promise, r.ensureMigrationCompleted().then(function(t) {
                    return e.resolve(!0), d["default"].resolve(t);
                }, function(t) {
                    return e.resolve(!1), d["default"].reject(t);
                });
            }
            function n(t) {
                return function() {
                    for (var n = arguments.length, i = Array(n), s = 0; s < n; s++) i[s] = arguments[s];
                    return p.assert(a === !0, "supposed to run data migration before accessing prefs with web-extensions API"), 
                    o.then(function(n) {
                        var o = n ? r.migrationAwareDestination : e.windowLocalStorage;
                        return o[t].apply(o, i);
                    });
                };
            }
            e.windowLocalStorage = {
                get: function(e) {
                    return p.SafePromise.sync(function() {
                        return window.localStorage.getItem(e);
                    });
                },
                set: function(e, t) {
                    return p.SafePromise.sync(function() {
                        return window.localStorage.setItem(e, t);
                    });
                },
                getAll: function() {
                    return p.SafePromise.sync(function() {
                        var e = {};
                        return (0, l["default"])(window.localStorage).forEach(function(t) {
                            e[t] = window.localStorage.getItem(t);
                        }), e;
                    });
                },
                remove: function(e) {
                    return p.SafePromise.sync(function() {
                        return window.localStorage.removeItem(e);
                    });
                },
                removeAll: function() {
                    return p.SafePromise.sync(function() {
                        return window.localStorage.clear();
                    });
                }
            }, e.browserStorageLocal = {
                get: function(e) {
                    return f(this, void 0, void 0, s["default"].mark(function t() {
                        var n;
                        return s["default"].wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return t.next = 2, firefox.storage.local.get(e);

                              case 2:
                                return n = t.sent, t.abrupt("return", n.hasOwnProperty(e) ? n[e] : null);

                              case 4:
                              case "end":
                                return t.stop();
                            }
                        }, t, this);
                    }));
                },
                set: function(e, t) {
                    return firefox.storage.local.set((0, i["default"])({}, e, t));
                },
                getAll: function() {
                    return firefox.storage.local.get(null);
                },
                remove: function(e) {
                    return firefox.storage.local.remove(e);
                },
                removeAll: function() {
                    return f(this, void 0, void 0, s["default"].mark(function e() {
                        return s["default"].wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, firefox.storage.local.clear();

                              case 2:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                }
            };
            var r = new m.StorageMigration("firefoxLocalStorageToExtApi", e.windowLocalStorage, e.browserStorageLocal, [ "version" ]), o = d["default"].resolve(!1), a = !1;
            e.ensureMigrationCompleted = t, e.migrationAware = {
                get: n("get"),
                set: n("set"),
                getAll: n("getAll"),
                remove: n("remove"),
                removeAll: n("removeAll")
            };
        }(b = n.preferencesApi || (n.preferencesApi = {}));
    }, {
        "./message/bg": 179,
        "./message/content": 180,
        "./storage-migration": 182,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/regenerator": 43,
        stdlib: 328
    } ],
    185: [ function(e, t, n) {
        "use strict";
        function r() {
            return "about:" === document.location.protocol ? a.failover.success("index_load") : (document.body.dataset.grCSLoaded = !0, 
            a.failover.startAppLoadTimer(), void e("./lib/app"));
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./lib/console"), i = o.setSeleniumCompatibility;
        i();
        var a = e("./lib/failover"), s = e("./lib/client-script");
        s.injectClientScriptIfNeeded(), a.failover.startPageLoadTimer(), "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", r, !1) : r();
    }, {
        "./lib/app": 186,
        "./lib/client-script": 205,
        "./lib/console": 212,
        "./lib/failover": 249
    } ],
    186: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var e = {
                connection: {
                    networkOffline: !window.navigator.onLine,
                    online: !1,
                    bgNotConnected: !0,
                    cookiesDisabled: navigator.cookieEnabled === !1
                },
                user: {
                    anonymous: !0,
                    premium: !1,
                    settings: {}
                },
                page: {
                    enabled: !0,
                    enabledDefs: !1,
                    domain: M
                }
            };
            i(e);
        }
        function i(e) {
            if (e.page.domain !== M) return void E.logger.differentStateDomain(e.page.domain);
            var t = navigator.cookieEnabled === !1;
            e.connection.cookiesDisabled !== t && V.updateConnection({
                cookiesDisabled: t
            });
            var n = T.timers.stop(L);
            n && !e.connection.bgNotConnected && E.logger.restoredBgConnection(n), U && (clearTimeout(U), 
            U = null), B || s(e.page.domain, e.connection), e.page.enabled ? a(e) : p(), B || k.failover.success("app_load"), 
            B || e.page.enabled !== !1 || l(e), B = !0;
        }
        function a(e) {
            return d(e.page, e.user), F ? F.updateState(e) : void (F = _.Buttons((0, h["default"])({}, e, {
                app: O,
                document: document,
                actions: V
            }), W.createSocket));
        }
        function s(e, t) {
            var n = t.bgNotConnected;
            c(e), v.isSafari() && f();
            var r = y.pageStyles(document);
            r.customizeElements(), r.addDomainClass(), k.failover.success("index_load"), S.one("disable-on-tab", function() {
                p(), D && D.clear(), D = null;
            }), n && (T.timers.start(L), E.logger.initWithoutBgConnection());
        }
        function c(e) {
            e.includes(P.GRAMMARLY_DOMAIN) && w.addExternalEventListeners();
        }
        function l(e) {
            if (null != e.page.disabledDate) {
                var t = Date.now() - e.page.disabledDate;
                t > I && (R = new N.Notifications({
                    actions: V,
                    doc: document
                }), R.showReminder(), V.showDisableReminder(M));
            }
        }
        function u() {
            g.disableConsoleLog();
        }
        function d(e) {
            var t = e.enabledDefs, n = e.cardInspection;
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            t && !D ? D = x.dictionary({
                doc: document,
                cardInspection: n
            }) : (D && D.clear(), D = null);
        }
        function f() {
            function e() {
                var n = window.getComputedStyle(t), r = n.getPropertyValue("opacity");
                "0.5" !== r ? p() : setTimeout(e, 200);
            }
            var t = document.createElement("div");
            document.body.appendChild(t), t.classList.add("grammarly-disable-indicator"), setTimeout(e, 1e3);
        }
        function p() {
            F && (F.clear(), F = null);
        }
        var m = e("babel-runtime/core-js/object/assign"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("./console"), b = e("./state"), v = e("./util"), _ = e("./buttons"), y = e("./sites"), w = e("./external"), k = e("./failover"), E = e("./tracking"), C = e("./location"), x = e("./dictionary"), S = e("./message"), T = e("./timers"), N = e("./elements/notifications"), P = e("lib/config"), j = e("universal/cs/socket"), I = 6048e5, A = 3e4, L = "init_without_bg_connection", M = C.getDomain(), O = {}, R = void 0, F = void 0, D = void 0, B = void 0, U = setTimeout(o, A), W = new j.ContentScriptSocketManager(E.logger, S), G = b.createAndObserve(i), V = G.actions;
        u(), n.update = i;
    }, {
        "./buttons": 189,
        "./console": 212,
        "./dictionary": 214,
        "./elements/notifications": 228,
        "./external": 248,
        "./failover": 249,
        "./location": 277,
        "./message": 278,
        "./sites": 294,
        "./state": 296,
        "./test-api": 300,
        "./timers": 301,
        "./tracking": 307,
        "./util": 322,
        "babel-runtime/core-js/object/assign": 24,
        "lib/config": 211,
        "universal/cs/socket": 343
    } ],
    187: [ function(e, t, n) {
        "use strict";
        function r() {}
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.benchmark = r;
    }, {} ],
    188: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t, n) {
            return f.isFocused(n) || e === n || f.isParent(e, n) || e === t || f.isParent(e, t);
        }
        function i(e) {
            return 0 === e.className.indexOf("gr-") || f.resolveEl(e, T.textarea_btn) || f.resolveEl(e, "gr__tooltip");
        }
        function a(e) {
            var t = _.guid(), n = e;
            f.setGRAttributes(n, t), n.setAttribute("gramm-ifr", "true");
            var r = n.contentDocument;
            return f.addIframeCss(r), f.setGRAttributes(r.body, t), n.style.height = n.style.height || getComputedStyle(n).height, 
            r.body;
        }
        function s(e, t) {
            function n() {
                f.isFocused(Pe) ? tt() : f.listen(Pe, "focus", tt, !1);
            }
            function r() {
                ge = Te.createElement("grammarly-btn"), be = d.findDOMNode(H()), s(), rt.initialized = !0, 
                Ee = new y.Pos({
                    btnEl: be,
                    fieldEl: fe,
                    custom: Ie,
                    sourceEl: He,
                    isTextarea: "textarea" === pe,
                    initCondition: Ye
                }, U, W), Qe = w.getWithinButtonPath({
                    editorEl: fe,
                    btnEl: be,
                    padding: 15
                }), Ce = k.createMenu({
                    el: be,
                    editor: xe,
                    enabled: Ye,
                    user: Be,
                    btn: rt,
                    gButtonPopup: ye
                }, function(e) {
                    Ae = e, V();
                }), ve = v.createErrorTooltip({
                    el: be,
                    win: window
                }), Ce.bind(), f.listen(be, "click", F, !1), t.on("hover", q), f.listen(Pe, "blur", B, !1), 
                q({
                    target: Pe
                }), c(), Ve.fieldParentCustomStyle && ($e = f.setCustomCss(fe.parentNode, Ve.fieldParentCustomStyle(fe))), 
                Ve.stopImmediatePropagationForClick && Ve.stopImmediatePropagationForClick(fe) && f.listen(fe, "click", D), 
                de.online || rt.offline();
            }
            function s() {
                var e = {
                    "z-index": (parseInt(f.css(fe, "z-index"), 10) || 1) + 1
                }, t = Ve.btnCustomContainer && Ve.btnCustomContainer(fe);
                if (t) {
                    Ie = !0, He = t;
                    var n = Ve.btnCustomStyles && Ve.btnCustomStyles(!0, fe);
                    n && (0, l["default"])(e, n);
                }
                f.insertAfter(ge, He), U(e);
            }
            function c() {
                if (De = !0, ke = !0, Me = !0, !Ye) return void ie();
                if (!Fe) {
                    Fe = !0;
                    try {
                        xe = m.createGrammarlyEditor({
                            app: ce,
                            doc: Te,
                            connection: de,
                            page: ue,
                            user: le,
                            type: pe,
                            field: fe,
                            actions: me,
                            createSocket: he
                        }), _e = b.infinityChecker(z, rt.offline), O("on"), xe.run(), Ce.updateEditor(xe), 
                        Ee.set("minimize", !Ke), Ee.set("editor", xe);
                    } catch (e) {
                        console.error(e), rt.offline();
                    }
                    ie(), ye = new x.Popup({
                        doc: Te,
                        el: be,
                        editor: xe,
                        user: le,
                        actions: me,
                        notifications: ce.notifications
                    }), Ce.setGbuttonPopup(ye), I(), xe && xe.emailFeedbackEnabled && Ue.emailPerceptionPopupEnabled !== !1 && A();
                    try {
                        var t = S.getFieldType(fe);
                        h.logger.initSession(g.getDomain(), le.type, t, !0);
                    } catch (n) {}
                }
            }
            function I() {
                var e = !rt.getState().offline && Ue.showOnboarding && Ee.max;
                e && (ye.showOnboarding(), me.seenOnboarding());
            }
            function A() {
                var e = Be.groups.includes(j), t = void 0 === Ue.seenEmailPerceptionPopupDate, n = t || +new Date() - Ue.seenEmailPerceptionPopupDate > P;
                (e === !0 && n || Ue.emailPerceptionPopupEnabled && n || e === !1 && t) && xe.on("input", M);
            }
            function L() {
                xe.off("input", M), clearTimeout(we);
                var e = void 0 === Ue.seenEmailPerceptionPopupDate;
                ye.showEmailPerception(xe.insertGmailFeedback, e), me.seenEmailPerceptionPopup(+new Date());
            }
            function M() {
                if (clearTimeout(we), void 0 !== xe) {
                    if (xe.emailFeedbackEnabled !== !0) return void xe.off("input", M);
                    var e = xe.getText().length;
                    e > N && (we = setTimeout(L, 5e3));
                }
            }
            function O() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "on";
                xe[e]("finish", R), xe[e]("rendered", ie), xe[e]("sending", Q), xe[e]("show-dialog", $);
            }
            function R() {
                $(), ie();
            }
            function F() {
                xe && xe.isOffline() && ve.fastShow();
            }
            function D(e) {
                e.stopImmediatePropagation();
            }
            function B(e) {
                Le && f.isFocused(Pe) && q(e);
            }
            function U(e) {
                (0, l["default"])(Se, e), V();
            }
            function W() {
                Oe = !ae(), Re = !0, h.fire("button-change-state", Oe), Ce && Ce.hide();
            }
            function G(e) {
                Ke || (Pe.focus(), f.hasClass(e.target, T.status) && Ce.show(!0));
            }
            function V() {
                ge || r(), H();
            }
            function z() {
                xe.reset(), xe.hardReset();
            }
            function H() {
                return d.render(u.createElement(C.ButtonComponent, {
                    state: se(),
                    inlineStyle: Se,
                    onViewClick: function(e) {
                        return G(e);
                    }
                }), ge);
            }
            function q(e) {
                if (!f.isFocused(Pe) && ke) {
                    if (Qe(e)) return void Y();
                    ke = !1;
                }
                if (e.target !== Pe) return J();
                if (o(e.target, be, Pe)) ke = !0, Y(); else {
                    if (i(e.target)) return;
                    J();
                }
            }
            function K() {
                Le = !0, Me = !0, be && "0" === be.style.opacity && (be.style.opacity = "1"), ie();
            }
            function Y() {
                Le || (Ye ? K() : Xe = setTimeout(K, 150));
            }
            function J() {
                if (Le) {
                    if (clearTimeout(Xe), Ce && Ce.isOpened()) return void (be.style.opacity = "0");
                    Le = !1, Me = !1, ie();
                }
            }
            function Q() {
                Ke || (clearTimeout(Je), X());
            }
            function X() {
                clearTimeout(Je), xe && !xe.getText().trim() || qe || (qe = !0, _e && _e.start(), 
                Le || q({
                    target: Pe
                }), ie());
            }
            function $() {
                clearTimeout(Je), _e && _e.finish(), Je = setTimeout(Z, 200);
            }
            function Z() {
                qe = !1, ie();
            }
            function ee() {
                xe && (_e && _e.finish(), Fe = !1, xe.remove(), O("off"));
            }
            function te() {
                ee(), ne(), re(), f.unlisten(be, "click", F), t.off("hover", q), f.unlisten(Pe, "focus", tt), 
                f.unlisten(Pe, "blur", B), Ve.stopImmediatePropagationForClick && f.unlisten(fe, "click", D), 
                ve && ve.remove(), $e && $e(), ge && ge.parentNode && ge.parentNode.removeChild(ge);
            }
            function ne() {
                Ee && Ee.remove(), Ce && Ce.remove(), Ce && Ce.unbind();
            }
            function re() {
                ye && ye.remove(), xe && xe.off("input", M), clearTimeout(we);
            }
            function oe(e) {
                var t = e.user, n = e.connection, r = e.page;
                We = t.anonymous, Ge = t.premium, Be = t, Ue = r, Ze(n.online), xe && xe.updateState({
                    user: t,
                    connection: n,
                    page: r
                }), ie();
            }
            function ie() {
                var e = xe && xe.errorData() || {};
                e.enabled = Ye, e.checking = qe, e.anonymous = We, e.premium = Ge, e.user = Be, 
                e.fieldWasFocused = De, e.emailFeedbackEnabled = xe && xe.emailFeedbackEnabled, 
                Ce && Ce.update(e), Ee && Ee.set("show", Me), rt.initialized === !0 && V();
            }
            function ae() {
                return Ee.max;
            }
            function se() {
                var e = xe && xe.errorData() || {}, t = Be && Be.experiments || {};
                return {
                    offline: Ke,
                    checking: qe,
                    enabled: Ye,
                    anonymous: We,
                    premium: Ge,
                    experiments: t,
                    show: Me,
                    visible: Le,
                    wasMinimized: Re,
                    minimized: Oe,
                    hovered: Ae,
                    isFieldEmpty: je,
                    isFieldHovered: ke,
                    fieldWasFocused: De,
                    isEditorInited: Fe,
                    errors: e
                };
            }
            var ce = e.app, le = e.user, ue = e.page, de = e.connection, fe = e.field, pe = e.type, me = e.actions, he = e.createSocket, ge = void 0, be = void 0, ve = void 0, _e = void 0, ye = void 0, we = void 0, ke = void 0, Ee = void 0, Ce = void 0, xe = void 0, Se = {
                visibility: "hidden"
            }, Te = fe.ownerDocument, Ne = "iframe" === pe, Pe = Ne ? a(fe) : fe, je = 0 === (fe.value || fe.textContent || "").trim().length, Ie = !1, Ae = !1, Le = !1, Me = !1, Oe = !1, Re = !1, Fe = !1, De = !1, Be = le, Ue = ue, We = le.anonymous, Ge = le.premium, Ve = p.pageStyles(Te).getFixesForCurrentDomain(), ze = E.State(ue.disabledFields, me.toggleField), He = fe, qe = !1, Ke = !de.online, Ye = !0, Je = void 0, Qe = void 0, Xe = void 0, $e = void 0, Ze = function(e) {
                Ke !== !e && (Ke = !e, Ee && Ee.set("minimize", e), ie(), xe && xe[Ke ? "offline" : "online"](), 
                Ye && ve && ve[Ke ? "enable" : "disable"]());
            }, et = function(e) {
                if (Ye !== e) {
                    var t = e && !Ye, n = _.isSafari() && t;
                    Ye = e, ze.changeFieldState(fe, He, !e), Ee && Ee.set("maximize", e), e ? (Ce.hide(), 
                    c()) : ee(), ie(), n && (be.style.display = "none", _.asyncCall(function() {
                        return be.style.display = "";
                    }));
                }
            }, tt = function ot() {
                f.unlisten(Pe, "focus", ot), V();
            }, nt = function() {
                return be;
            }, rt = {
                online: function() {
                    return Ze(!0);
                },
                offline: function() {
                    return Ze(!1);
                },
                enable: function() {
                    return et(!0);
                },
                disable: function() {
                    return et(!1);
                },
                remove: te,
                getEl: nt,
                getState: se,
                updateState: oe,
                getPosState: ae,
                onViewClick: G,
                onChangeState: W,
                show: Y,
                hide: J,
                update: ie,
                checking: Q,
                cancelChecking: $,
                initialized: !1
            };
            return n(), rt;
        }
        var c = e("babel-runtime/core-js/object/assign"), l = r(c);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = e("react"), d = e("react-dom"), f = e("../dom"), p = e("../sites"), m = e("../editor"), h = e("../tracking"), g = e("../location"), b = e("../infinity-checker"), v = e("../elements/error-tooltip"), _ = e("../util"), y = e("./pos"), w = e("./path"), k = e("./menu"), E = e("./state"), C = e("./view"), x = e("./popup"), S = e("../editor/field-type-detect"), T = {
            textarea_btn: "_e725ae-textarea_btn",
            status: "_e725ae-status",
            field_hovered: "_e725ae-field_hovered",
            btn_text: "_e725ae-btn_text",
            not_focused: "_e725ae-not_focused",
            errors_100: "_e725ae-errors_100",
            anonymous: "_e725ae-anonymous",
            show: "_e725ae-show",
            errors: "_e725ae-errors",
            checking: "_e725ae-checking",
            has_errors: "_e725ae-has_errors",
            disabled: "_e725ae-disabled",
            transform_wrap: "_e725ae-transform_wrap",
            offline: "_e725ae-offline",
            plus_only: "_e725ae-plus_only",
            minimized: "_e725ae-minimized",
            hovered: "_e725ae-hovered",
            minimize_transition: "_e725ae-minimize_transition"
        }, N = 300, P = 864e5, j = "email_perception";
        n.Button = s;
    }, {
        "../dom": 215,
        "../editor": 219,
        "../editor/field-type-detect": 218,
        "../elements/error-tooltip": 223,
        "../infinity-checker": 265,
        "../location": 277,
        "../sites": 294,
        "../tracking": 307,
        "../util": 322,
        "./menu": 191,
        "./path": 194,
        "./popup": 197,
        "./pos": 200,
        "./state": 203,
        "./view": 204,
        "babel-runtime/core-js/object/assign": 24,
        react: "react",
        "react-dom": "react-dom"
    } ],
    189: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            function n(e) {
                function n(e, n) {
                    S.set(e, u.Button({
                        field: e,
                        app: _,
                        createSocket: t,
                        user: N,
                        page: P,
                        connection: j,
                        type: n,
                        actions: C
                    }, x));
                }
                v(e), e.textareas.forEach(function(e) {
                    return n(e, "textarea");
                }), e.contenteditables.forEach(function(e) {
                    return n(e, "contenteditable");
                }), e.iframes.forEach(function(e) {
                    return n(e, "iframe");
                }), e.htmlghosts.forEach(function(e) {
                    return n(e, "htmlghost");
                }), e.usageTracking.forEach(function(e) {
                    return g(e);
                });
            }
            function r(e) {
                if (console.log("remove", e), S) {
                    var t = S.get(e);
                    t && t.remove(), S["delete"](e);
                }
            }
            function o() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "on";
                x && ("on" === e ? (x.on("add", n), x.on("remove", r)) : (x.off("add", n), x.off("remove", r)));
            }
            function i(e) {
                N = e.user, j = e.connection, P = e.page, m(e.connection.bgNotConnected), _.elements && _.elements.updateState(e), 
                S && S.forEach(function(t) {
                    return t.updateState(e);
                });
            }
            function m(e) {
                if (e && T) c.timers.start(p), s.logger.lostBgPageConnection(); else if (!e && !T) {
                    var t = c.timers.stop(p);
                    s.logger.restoreBgPageConnection(t);
                }
                T = !e;
            }
            function h(e) {
                var t = e.target;
                t.removeEventListener("focus", h, !1);
                try {
                    s.logger.initSession(f.getDomain(), k.type, d.getFieldType(t), !1);
                } catch (n) {}
            }
            function g(e) {
                var t = e;
                "true" !== t.gr__field_checked && (t.addEventListener("focus", h, !1), t.gr__field_checked = "true");
            }
            function b() {
                o("off"), S && (S.forEach(function(e) {
                    return e.remove();
                }), S.clear()), S = null, _.elements && _.elements.clear(), _.elements = null, x && (x.reset(), 
                x.stop()), x = null;
            }
            function v(e) {
                try {
                    console.log("add", e);
                } catch (t) {
                    console.log("fields added");
                }
            }
            var _ = e.app, y = e.doc, w = e.connection, k = e.user, E = e.page, C = e.actions, x = l.PageFields({
                doc: y,
                page: E
            }), S = new a["default"](), T = !0, N = k, P = E, j = w;
            return m(w.bgNotConnected), o("on"), n(x.get()), {
                add: n,
                updateState: i,
                remove: r,
                clear: b
            };
        }
        var i = e("babel-runtime/core-js/map"), a = r(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("../tracking"), c = e("../timers"), l = e("../page-fields"), u = e("./button"), d = e("../editor/field-type-detect"), f = e("../location"), p = "life_without_bg_connection";
        n.Buttons = o;
    }, {
        "../editor/field-type-detect": 218,
        "../location": 277,
        "../page-fields": 288,
        "../timers": 301,
        "../tracking": 307,
        "./button": 188,
        "babel-runtime/core-js/map": 23
    } ],
    190: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/defineProperty"), i = r(o), a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u), f = e("babel-runtime/helpers/possibleConstructorReturn"), p = r(f), m = e("babel-runtime/helpers/inherits"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("react"), b = e("react-dom"), v = e("../../dom"), _ = {
            hoverMenu: "_970ef1-hoverMenu",
            opened: "_970ef1-opened",
            btn: "_970ef1-btn",
            line: "_970ef1-line",
            panel: "_970ef1-panel",
            premium: "_970ef1-premium",
            btn_premium: "_970ef1-btn_premium",
            btn_grammarly: "_970ef1-btn_grammarly",
            anonymous: "_970ef1-anonymous",
            panelText: "_970ef1-panelText",
            critical: "_970ef1-critical",
            disabled: "_970ef1-disabled",
            referralArea: "_970ef1-referralArea",
            btn_disable: "_970ef1-btn_disable",
            initial: "_970ef1-initial",
            checking: "_970ef1-checking",
            counter: "_970ef1-counter",
            counter100: "_970ef1-counter100",
            buttonArea: "_970ef1-buttonArea",
            referralText: "_970ef1-referralText",
            feedback: "_970ef1-feedback",
            tooltip: "_970ef1-tooltip",
            tooltip_grammarly: "_970ef1-tooltip_grammarly",
            tooltip_premium: "_970ef1-tooltip_premium",
            tooltip_disable: "_970ef1-tooltip_disable",
            plus: "_970ef1-plus",
            tooltip_referral: "_970ef1-tooltip_referral",
            referral: "_970ef1-referral",
            tooltip_visible: "_970ef1-tooltip_visible",
            tooltip_hidden: "_970ef1-tooltip_hidden"
        }, y = function(e) {
            function t() {
                (0, l["default"])(this, t);
                var e = (0, p["default"])(this, (t.__proto__ || (0, s["default"])(t)).call(this));
                return e.onMouseEnterHandler = e.onMouseEnterHandler.bind(e), e.onMouseLeaveHandler = e.onMouseLeaveHandler.bind(e), 
                e.onMouseClick = e.onMouseClick.bind(e), e;
            }
            return (0, h["default"])(t, e), (0, d["default"])(t, [ {
                key: "onMouseEnterHandler",
                value: function() {
                    var e = this, t = 1350;
                    this.tooltipTimeout = setTimeout(function() {
                        e.props.data.onTooltip({
                            active: !0,
                            el: b.findDOMNode(e),
                            text: e.props.data.text,
                            cls: e.props.data.type
                        });
                    }, t);
                }
            }, {
                key: "onMouseLeaveHandler",
                value: function() {
                    clearTimeout(this.tooltipTimeout), this.props.data.onTooltip({
                        active: !1,
                        text: this.props.data.text,
                        cls: this.props.data.type
                    });
                }
            }, {
                key: "onMouseClick",
                value: function(e) {
                    this.props.data.click && this.props.data.click(e), "disable" === this.props.data.type && this.onMouseLeaveHandler();
                }
            }, {
                key: "render",
                value: function() {
                    var e, t = this.props.data, n = v.cs((e = {}, (0, i["default"])(e, _.btn, !0), (0, 
                    i["default"])(e, _["btn_" + t.type], !0), (0, i["default"])(e, _.counter, null != t.count && t.count > 0), 
                    (0, i["default"])(e, _.counter100, null != t.count && t.count > 99), e));
                    return g.createElement("div", {
                        className: _.buttonArea
                    }, g.createElement("div", {
                        className: n,
                        onClick: this.onMouseClick,
                        onMouseEnter: this.onMouseEnterHandler,
                        onMouseLeave: this.onMouseLeaveHandler,
                        "data-action": t.actionType,
                        tabIndex: -1
                    }, t.count && t.count > 0 ? t.count : null));
                }
            } ]), t;
        }(g.Component);
        n.MenuBtn = y;
    }, {
        "../../dom": 215,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        react: "react",
        "react-dom": "react-dom"
    } ],
    191: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            function n(e) {
                function t() {
                    U.showDialog({
                        caller: "button_hover"
                    }), b.fire("correct-btn-clicked"), h.timers.start("open_editor");
                }
                function n() {
                    b.fire("hook-clicked", "button_hover"), r();
                }
                function r() {
                    var e = l.getUpgradeUrlFromMatches({
                        baseUrl: f.URLS.upgrade,
                        returnUrl: "",
                        appType: "popup",
                        matches: U.getMatches()
                    });
                    e = p.addParamsToUpgradeURL(e, B.anonymous === !0 ? "signupHook" : "upHook", B.anonymous === !0 ? "extensionPremiumCta" : "buttonHover"), 
                    m.emitBackground("open-url", e);
                }
                if (!U.isOffline()) {
                    var o = e.target;
                    u.hasClass(o, _.btn_premium) ? z.premium ? t() : n() : u.hasClass(o, _.btn_grammarly) && t(), 
                    setTimeout(N, 200);
                }
            }
            function r() {
                W.showDisable(), N(), k(), b.fire("disable-button-click");
            }
            function o(e) {
                z = e, B = e.user, k();
            }
            function i(e) {
                U = e;
            }
            function w(e) {
                var t = d.getAbsRect(j), n = t.top, r = t.left, o = !I.getPosState() && z.enabled;
                return e && (r -= e.clientWidth, n -= e.clientHeight / 2), n += o ? J : K, r -= o ? Y : q, 
                !o && M.menuPosLeft && (r = M.menuPosLeft(U, r, z)), (0, a["default"])({}, D, "translate(" + r + "px, " + n + "px)");
            }
            function k() {
                var e = E(z, w(), R), t = c.findDOMNode(e);
                return E(z, w(t), O);
            }
            function E(e, t, o) {
                return c.render(s.createElement(g.HoverMenuView, {
                    style: t,
                    click: n,
                    disableClick: r,
                    state: e,
                    opened: V,
                    el: F,
                    insertGmailFeedback: function(e) {
                        void 0 !== U && (U.insertGmailFeedback(e), I.update());
                    },
                    hide: N
                }), o);
            }
            function C() {
                u.listen(L.documentElement, "mousemove", S), U && U.on("iframe-mousemove", S);
            }
            function x() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                V && !e || (u.unlisten(L.documentElement, "mousemove", S), U && U.off("iframe-mousemove", S));
            }
            function S(e) {
                var t = u.resolveEl(e.target, y.textarea_btn);
                if (t && t !== j) return N();
                if (u.hasClass(j, y.offline)) return N();
                var n = u.resolveEl(e.target, _.hoverMenu);
                return t || n === H ? e.target.classList.contains(y.btn_text) ? N() : void T() : N();
            }
            function T() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                W && W.isActive && "onboarding" === W.type || (G && !z.offline && z.fieldWasFocused || e) && (V || (V = !0, 
                t(!0), z.emailFeedbackEnabled === !0 && b.fire("email-perception-button-hover"), 
                k()));
            }
            function N() {
                V && (V = !1, t(!1), k());
            }
            function P() {
                x(), O.parentNode && O.parentNode.removeChild(O), R.parentNode && R.parentNode.removeChild(R), 
                F.parentNode && F.parentNode.removeChild(F);
            }
            var j = e.el, I = e.btn, A = e.gButtonPopup, L = j.ownerDocument, M = v.pageStyles(L).getFixesForCurrentDomain(), O = L.createElement("div"), R = L.createElement("div"), F = L.createElement("div"), D = u.transformProp(L), B = e.user, U = e.editor, W = A, G = !0, V = !1, z = {
                critical: 0,
                plus: 0,
                offline: !1,
                enabled: e.enabled,
                initial: !1,
                checking: !1,
                fieldWasFocused: !!e.fieldWasFocused
            }, H = c.findDOMNode(k()), q = -26, K = 11, Y = -13, J = 2;
            return u.addClass(O, "gr-top-z-index"), u.addClass(O, "gr-top-zero"), O.setAttribute("tabindex", "-1"), 
            R.style.cssText = "visibility: hidden;top: -9999px;position: absolute;opacity: 0", 
            F.style.cssText = "visibility: hidden;top: -9999px;position: absolute;opacity: 0", 
            L.documentElement.insertBefore(O, L.body), L.documentElement.insertBefore(R, L.body), 
            L.documentElement.insertBefore(F, L.body), {
                show: T,
                hide: N,
                bind: C,
                unbind: x,
                remove: P,
                render: k,
                menuEl: H,
                update: o,
                onclick: n,
                updateEditor: i,
                isOpened: function() {
                    return V;
                },
                isEnabled: function() {
                    return G;
                },
                disable: function() {
                    G = !1;
                },
                enable: function() {
                    G = !0;
                },
                getState: function() {
                    return z;
                },
                setGbuttonPopup: function(e) {
                    W = e;
                }
            };
        }
        var i = e("babel-runtime/helpers/defineProperty"), a = r(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("react"), c = e("react-dom"), l = e("lib/grammarly-editor"), u = e("../../dom"), d = e("../../position"), f = e("../../config"), p = e("lib/url"), m = e("../../message"), h = e("../../timers"), g = e("./view"), b = e("../../tracking"), v = e("../../sites"), _ = {
            hoverMenu: "_970ef1-hoverMenu",
            opened: "_970ef1-opened",
            btn: "_970ef1-btn",
            line: "_970ef1-line",
            panel: "_970ef1-panel",
            premium: "_970ef1-premium",
            btn_premium: "_970ef1-btn_premium",
            btn_grammarly: "_970ef1-btn_grammarly",
            anonymous: "_970ef1-anonymous",
            panelText: "_970ef1-panelText",
            critical: "_970ef1-critical",
            disabled: "_970ef1-disabled",
            referralArea: "_970ef1-referralArea",
            btn_disable: "_970ef1-btn_disable",
            initial: "_970ef1-initial",
            checking: "_970ef1-checking",
            counter: "_970ef1-counter",
            counter100: "_970ef1-counter100",
            buttonArea: "_970ef1-buttonArea",
            referralText: "_970ef1-referralText",
            feedback: "_970ef1-feedback",
            tooltip: "_970ef1-tooltip",
            tooltip_grammarly: "_970ef1-tooltip_grammarly",
            tooltip_premium: "_970ef1-tooltip_premium",
            tooltip_disable: "_970ef1-tooltip_disable",
            plus: "_970ef1-plus",
            tooltip_referral: "_970ef1-tooltip_referral",
            referral: "_970ef1-referral",
            tooltip_visible: "_970ef1-tooltip_visible",
            tooltip_hidden: "_970ef1-tooltip_hidden"
        }, y = {
            textarea_btn: "_e725ae-textarea_btn",
            status: "_e725ae-status",
            field_hovered: "_e725ae-field_hovered",
            btn_text: "_e725ae-btn_text",
            not_focused: "_e725ae-not_focused",
            errors_100: "_e725ae-errors_100",
            anonymous: "_e725ae-anonymous",
            show: "_e725ae-show",
            errors: "_e725ae-errors",
            checking: "_e725ae-checking",
            has_errors: "_e725ae-has_errors",
            disabled: "_e725ae-disabled",
            transform_wrap: "_e725ae-transform_wrap",
            offline: "_e725ae-offline",
            plus_only: "_e725ae-plus_only",
            minimized: "_e725ae-minimized",
            hovered: "_e725ae-hovered",
            minimize_transition: "_e725ae-minimize_transition"
        };
        n.createMenu = o;
    }, {
        "../../config": 211,
        "../../dom": 215,
        "../../message": 278,
        "../../position": 289,
        "../../sites": 294,
        "../../timers": 301,
        "../../tracking": 307,
        "./view": 193,
        "babel-runtime/helpers/defineProperty": 36,
        "lib/grammarly-editor": 258,
        "lib/url": 321,
        react: "react",
        "react-dom": "react-dom"
    } ],
    192: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/defineProperty"), i = r(o), a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u), f = e("babel-runtime/helpers/possibleConstructorReturn"), p = r(f), m = e("babel-runtime/helpers/inherits"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("react"), b = e("../../dom"), v = {
            hoverMenu: "_970ef1-hoverMenu",
            opened: "_970ef1-opened",
            btn: "_970ef1-btn",
            line: "_970ef1-line",
            panel: "_970ef1-panel",
            premium: "_970ef1-premium",
            btn_premium: "_970ef1-btn_premium",
            btn_grammarly: "_970ef1-btn_grammarly",
            anonymous: "_970ef1-anonymous",
            panelText: "_970ef1-panelText",
            critical: "_970ef1-critical",
            disabled: "_970ef1-disabled",
            referralArea: "_970ef1-referralArea",
            btn_disable: "_970ef1-btn_disable",
            initial: "_970ef1-initial",
            checking: "_970ef1-checking",
            counter: "_970ef1-counter",
            counter100: "_970ef1-counter100",
            buttonArea: "_970ef1-buttonArea",
            referralText: "_970ef1-referralText",
            feedback: "_970ef1-feedback",
            tooltip: "_970ef1-tooltip",
            tooltip_grammarly: "_970ef1-tooltip_grammarly",
            tooltip_premium: "_970ef1-tooltip_premium",
            tooltip_disable: "_970ef1-tooltip_disable",
            plus: "_970ef1-plus",
            tooltip_referral: "_970ef1-tooltip_referral",
            referral: "_970ef1-referral",
            tooltip_visible: "_970ef1-tooltip_visible",
            tooltip_hidden: "_970ef1-tooltip_hidden"
        }, _ = function(e) {
            function t() {
                return (0, l["default"])(this, t), (0, p["default"])(this, (t.__proto__ || (0, s["default"])(t)).apply(this, arguments));
            }
            return (0, h["default"])(t, e), (0, d["default"])(t, [ {
                key: "render",
                value: function() {
                    var e, t = this.props.data || {}, n = this.props.measure, r = b.cs((e = {}, (0, 
                    i["default"])(e, v.tooltip, !0), (0, i["default"])(e, v.tooltip_visible, t.active && !n), 
                    (0, i["default"])(e, v.tooltip_hidden, !t.active && !n), (0, i["default"])(e, v["tooltip_" + t.cls], !0), 
                    e)), o = void 0;
                    return t.active && !n && (o = {
                        right: 0
                    }), g.createElement("div", {
                        style: o,
                        className: r,
                        ref: "tooltip",
                        dangerouslySetInnerHTML: {
                            __html: t.text
                        }
                    });
                }
            } ]), t;
        }(g.Component);
        n.Tooltip = _;
    }, {
        "../../dom": 215,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        react: "react"
    } ],
    193: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/defineProperty"), i = r(o), a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u), f = e("babel-runtime/helpers/possibleConstructorReturn"), p = r(f), m = e("babel-runtime/helpers/inherits"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("react"), b = e("react-dom"), v = e("./action"), _ = e("./tooltip"), y = e("../../dom"), w = {
            hoverMenu: "_970ef1-hoverMenu",
            opened: "_970ef1-opened",
            btn: "_970ef1-btn",
            line: "_970ef1-line",
            panel: "_970ef1-panel",
            premium: "_970ef1-premium",
            btn_premium: "_970ef1-btn_premium",
            btn_grammarly: "_970ef1-btn_grammarly",
            anonymous: "_970ef1-anonymous",
            panelText: "_970ef1-panelText",
            critical: "_970ef1-critical",
            disabled: "_970ef1-disabled",
            referralArea: "_970ef1-referralArea",
            btn_disable: "_970ef1-btn_disable",
            initial: "_970ef1-initial",
            checking: "_970ef1-checking",
            counter: "_970ef1-counter",
            counter100: "_970ef1-counter100",
            buttonArea: "_970ef1-buttonArea",
            referralText: "_970ef1-referralText",
            feedback: "_970ef1-feedback",
            tooltip: "_970ef1-tooltip",
            tooltip_grammarly: "_970ef1-tooltip_grammarly",
            tooltip_premium: "_970ef1-tooltip_premium",
            tooltip_disable: "_970ef1-tooltip_disable",
            plus: "_970ef1-plus",
            tooltip_referral: "_970ef1-tooltip_referral",
            referral: "_970ef1-referral",
            tooltip_visible: "_970ef1-tooltip_visible",
            tooltip_hidden: "_970ef1-tooltip_hidden"
        }, k = function(e) {
            function t() {
                (0, l["default"])(this, t);
                var e = (0, p["default"])(this, (t.__proto__ || (0, s["default"])(t)).apply(this, arguments));
                return e.state = {
                    tooltip: {
                        active: !1,
                        text: "",
                        cls: ""
                    }
                }, e.onTooltip = function(t) {
                    var n = b.render(g.createElement(_.Tooltip, {
                        data: t,
                        measure: !0
                    }), e.props.el);
                    setTimeout(function() {
                        t.width = b.findDOMNode(n).clientWidth, e.setState({
                            tooltip: t
                        });
                    }, 10);
                }, e;
            }
            return (0, h["default"])(t, e), (0, d["default"])(t, [ {
                key: "getTooltipText",
                value: function(e) {
                    return e.enabled ? "Disable on this website" : "Enable Grammarly here";
                }
            }, {
                key: "render",
                value: function() {
                    var e, t = this, n = this.props, r = n.state, o = r.critical, a = r.plus, s = y.cs((e = {}, 
                    (0, i["default"])(e, w.hoverMenu, !0), (0, i["default"])(e, w.initial, r.initial), 
                    (0, i["default"])(e, w.premium, r.premium), (0, i["default"])(e, w.anonymous, r.anonymous), 
                    (0, i["default"])(e, w.checking, r.checking), (0, i["default"])(e, w.disabled, r.enabled === !1), 
                    (0, i["default"])(e, w.critical, !!o), (0, i["default"])(e, w.plus, !!a), (0, i["default"])(e, w.opened, n.opened), 
                    e)), c = r.anonymous ? "Log in to enable personalized<br/>checks and other features" : "Edit in Grammarly", l = r.premium ? "See advanced corrections" : "Upgrade to make advanced corrections", u = this.getTooltipText(r);
                    return g.createElement("div", {
                        className: s,
                        style: n.style
                    }, g.createElement("div", {
                        className: w.panel
                    }, g.createElement(_.Tooltip, {
                        data: this.state.tooltip
                    }), g.createElement(v.MenuBtn, {
                        data: {
                            type: "disable",
                            size: "small",
                            text: u,
                            click: n.disableClick,
                            onTooltip: this.onTooltip
                        }
                    }), g.createElement("div", {
                        className: w.line
                    }), r.enabled === !0 && r.emailFeedbackEnabled && g.createElement("span", {
                        onClick: function(e) {
                            t.props.insertGmailFeedback && (t.props.insertGmailFeedback(e.altKey, !1), t.props.hide());
                        },
                        className: w.feedback
                    }, "Ask for feedback"), a ? g.createElement(v.MenuBtn, {
                        data: {
                            type: "premium",
                            size: "small",
                            text: l,
                            count: a,
                            click: n.click,
                            onTooltip: this.onTooltip
                        }
                    }) : null, g.createElement(v.MenuBtn, {
                        data: {
                            type: "grammarly",
                            actionType: "editor",
                            size: "small",
                            text: c,
                            click: n.click,
                            count: o,
                            onTooltip: this.onTooltip
                        }
                    })));
                }
            } ]), t;
        }(g.Component);
        n.HoverMenuView = k;
    }, {
        "../../dom": 215,
        "./action": 190,
        "./tooltip": 192,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        react: "react",
        "react-dom": "react-dom"
    } ],
    194: [ function(e, t, n) {
        "use strict";
        function r(e) {
            function t(e, t) {
                return t.left >= e.left && t.top >= e.top ? "se" : t.left >= e.left && t.top <= e.top ? "ne" : t.left <= e.left && t.top <= e.top ? "nw" : t.left <= e.left && t.top >= e.top ? "sw" : void 0;
            }
            function n(e, t, n, r) {
                var o = r.left + r.width + s, i = r.left - s, a = r.top + r.height + s, c = r.top - s, l = n.left - s, u = n.left + n.width + s, d = n.top - s, f = n.top + n.height + s, p = u > o ? u : o;
                return "se" === e && t.x >= l && t.x <= p && t.y >= d && t.y <= a || ("ne" === e && t.x >= l && t.x <= p && t.y >= c && t.y <= f || ("nw" === e && t.x >= i && t.x <= u && t.y >= c && t.y <= f || "sw" === e && t.x >= i && t.x <= u && t.y >= d && t.y <= a));
            }
            function r(e) {
                var t = e.getBoundingClientRect();
                return {
                    height: t.height,
                    width: t.width,
                    top: t.top,
                    left: t.left
                };
            }
            function o(e) {
                var o = r(i), s = r(a), c = t(o, s);
                return n(c, e, o, s);
            }
            var i = e.editorEl, a = e.btnEl, s = e.padding;
            return o;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.getWithinButtonPath = r;
    }, {} ],
    195: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/assign"), i = r(o), a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u), f = e("babel-runtime/helpers/possibleConstructorReturn"), p = r(f), m = e("babel-runtime/helpers/inherits"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("react"), b = e("react-dom"), v = e("lib/dom"), _ = e("lib/elements/signin/button"), y = {
            gButtonPopup: "_9d9f60-gButtonPopup",
            emailPerception: "_9d9f60-emailPerception",
            text: "_9d9f60-text",
            title: "_9d9f60-title",
            popupFooter: "_9d9f60-popupFooter",
            onboarding: "_9d9f60-onboarding",
            emailPerceptionFlipped: "_9d9f60-emailPerceptionFlipped",
            isFliped: "_9d9f60-isFliped",
            secondary: "_9d9f60-secondary",
            firstTime: "_9d9f60-firstTime",
            disable: "_9d9f60-disable",
            link: "_9d9f60-link",
            bold: "_9d9f60-bold",
            close: "_9d9f60-close"
        }, w = function(e) {
            function t() {
                (0, l["default"])(this, t);
                var e = (0, p["default"])(this, (t.__proto__ || (0, s["default"])(t)).call(this));
                return e.cancel = function() {
                    e._node ? (e._node.style.opacity = "0", e._node.addEventListener("transitionend", function() {
                        e.props.remove();
                    }, !1)) : e.props.remove();
                }, e.state = {
                    styles: {}
                }, e;
            }
            return (0, h["default"])(t, e), (0, d["default"])(t, [ {
                key: "componentDidMount",
                value: function() {
                    var e = this, t = b.findDOMNode(this.refs.gButtonPopup);
                    this._requestAnimationFrame = requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            if (t.style.setProperty("transition", "opacity 0.18s cubic-bezier(0.255,0.89,0.25,1.135),transform 0.18s cubic-bezier(0.255,0.89,0.25,1.135)", "important"), 
                            t.style.opacity = "1", t.style.transform) {
                                var e = t.style.transform.split(" ");
                                e[2] = "scale(1)", t.style.transform = e.join(" ");
                            }
                        });
                    }), this._node = t, this.setState(function() {
                        return {
                            styles: e.props.styles
                        };
                    });
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    cancelAnimationFrame(this._requestAnimationFrame);
                }
            }, {
                key: "render",
                value: function() {
                    var e = this, t = (0, i["default"])({}, this.props.styles, {
                        transition: "none !important"
                    });
                    return g.createElement("div", {
                        ref: "gButtonPopup",
                        className: v.cs(y.gButtonPopup, y.disable),
                        style: t
                    }, g.createElement("p", {
                        className: y.text
                    }, "Disable Grammarly ", g.createElement("br", null), " on ", g.createElement("span", {
                        className: y.bold
                    }, this.props.domain), "?"), g.createElement(_.Button, {
                        onClick: function() {
                            return e.props.disableOnTab();
                        },
                        cls: "disable",
                        styles: {
                            width: 208
                        },
                        text: "Disable until next visit"
                    }), g.createElement(_.Button, {
                        onClick: function() {
                            return e.props.disableSite();
                        },
                        cls: "disable",
                        styles: {
                            width: 208
                        },
                        text: "Disable Forever"
                    }), g.createElement("button", {
                        className: y.close,
                        onClick: this.cancel
                    }), g.createElement("button", {
                        className: y.link,
                        onClick: this.cancel
                    }, "keep it working"));
                }
            } ]), t;
        }(g.Component);
        n.DisablePopup = w;
    }, {
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        "lib/elements/signin/button": 240,
        react: "react",
        "react-dom": "react-dom"
    } ],
    196: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("react"), h = e("react-dom"), g = e("lib/dom"), b = e("lib/elements/signin/button"), v = e("lib/tracking"), _ = {
            gButtonPopup: "_9d9f60-gButtonPopup",
            emailPerception: "_9d9f60-emailPerception",
            text: "_9d9f60-text",
            title: "_9d9f60-title",
            popupFooter: "_9d9f60-popupFooter",
            onboarding: "_9d9f60-onboarding",
            emailPerceptionFlipped: "_9d9f60-emailPerceptionFlipped",
            isFliped: "_9d9f60-isFliped",
            secondary: "_9d9f60-secondary",
            firstTime: "_9d9f60-firstTime",
            disable: "_9d9f60-disable",
            link: "_9d9f60-link",
            bold: "_9d9f60-bold",
            close: "_9d9f60-close"
        }, y = "https://www.grammarly.com/email-perception", w = function(e) {
            function t() {
                (0, s["default"])(this, t);
                var e = (0, d["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));
                return e.cancel = function() {
                    e.props.remove(), v.fire("email-perception-popup-cancel", e.props.isFirstShown);
                }, e.disable = function() {
                    e.props.disableEmailPerceptionPopup(), e.cancel(), v.fire("email-perception-disable-click", e.props.isFirstShown);
                }, e.learnMore = function() {
                    e.props.remove(), v.fire("email-perception-learn-more-click");
                }, e.state = {
                    styles: {}
                }, e;
            }
            return (0, p["default"])(t, e), (0, l["default"])(t, [ {
                key: "componentDidMount",
                value: function() {
                    var e = this, t = h.findDOMNode(this.refs.gButtonPopup);
                    this._requestAnimationFrame = requestAnimationFrame(function() {
                        if (t.style.opacity = "1", t.style.transform) {
                            var e = t.style.transform.split(" ");
                            e[2] = "scale(1)", t.style.transform = e.join(" ");
                        }
                    }), this.setState(function() {
                        return {
                            styles: e.props.styles
                        };
                    }), v.fire("email-perception-popup-show", this.props.isFirstShown);
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    cancelAnimationFrame(this._requestAnimationFrame);
                }
            }, {
                key: "render",
                value: function() {
                    var e = this, t = g.cs(_.gButtonPopup, _[this.props.type]), n = "emailPerception" === this.props.type ? "Don’t show this again" : "Don’t show again";
                    return m.createElement("div", {
                        ref: "gButtonPopup",
                        className: t,
                        style: this.state.styles
                    }, m.createElement("p", {
                        className: _.title
                    }, "What do your readers think?"), m.createElement("p", {
                        className: _.text
                    }, "Ask the recipients if your message is concise and easy to read."), m.createElement(b.Button, {
                        onClick: function() {
                            e.props.isFirstShown && e.props.enableEmailPerceptionPopup(), e.props.insertGmailFeedback(!1, e.props.isFirstShown);
                        },
                        cls: "onboarding",
                        styles: {
                            width: "180px"
                        },
                        text: "Ask for feedback"
                    }), this.props.isFirstShown === !0 ? m.createElement("a", {
                        className: g.cs(_.secondary, _.firstTime),
                        href: y,
                        target: "_blank",
                        onClick: this.learnMore
                    }, "Learn more") : m.createElement("button", {
                        className: g.cs(_.secondary),
                        onClick: this.disable
                    }, n), m.createElement("button", {
                        className: _.close,
                        onClick: this.cancel
                    }), m.createElement("div", {
                        className: g.cs(_.popupFooter, this.props.isFlipped && _.isFliped)
                    }, "▲"));
                }
            } ]), t;
        }(m.Component);
        n.EmailPerceptionPopup = w;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        "lib/elements/signin/button": 240,
        "lib/tracking": 307,
        react: "react",
        "react-dom": "react-dom"
    } ],
    197: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/defineProperty"), i = r(o), a = e("babel-runtime/core-js/object/assign"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var f = e("react"), p = e("react-dom"), m = e("./onboarding"), h = e("./email-perception"), g = e("./disable"), b = e("lib/position"), v = e("lib/location"), _ = e("lib/dom"), y = e("../../tracking"), w = e("lib/message"), k = {
            onboarding: {
                height: 170,
                left: 329,
                top: 162,
                topFlip: 35
            },
            emailPerception: {
                height: 292,
                left: -45,
                top: 250,
                topFlip: 0
            },
            emailPerceptionFlipped: {
                height: 170,
                left: 329,
                top: 162,
                topFlip: 35
            },
            disable: {
                height: 232,
                left: 248,
                top: 209,
                topFlip: -1
            }
        }, E = 250, C = function() {
            function e(t) {
                var n = this, r = t.doc, o = t.el, a = t.editor, c = t.user, u = t.actions, d = t.notifications;
                (0, l["default"])(this, e), this._getStyles = function(e) {
                    var t = b.getAbsRect(n.el), r = t.top, o = t.left, a = _.transformProp(n._doc), c = o - n._offsets.left, l = n._isFlipped ? r + n._offsets.topFlip : r - n._offsets.top, u = e ? "scale(.7)" : "scale(1)";
                    return (0, s["default"])({}, (0, i["default"])({}, a, "translate(" + c + "px, " + l + "px) " + u));
                }, this._windowResize = function() {
                    var e = n._getStyles();
                    n._component.setState(function() {
                        return {
                            styles: e
                        };
                    });
                }, this._doc = r, this.el = o, this.editorId = a.id, this.editor = a, this.user = c, 
                this.actions = u, null !== d && (this._notifications = d);
            }
            return (0, d["default"])(e, [ {
                key: "_openDialog",
                value: function() {
                    this.hide(), w.emitFocusedTab("show-dialog", {
                        data: {},
                        editorId: this.editorId,
                        user: this.user,
                        isOnboarding: !0
                    });
                }
            }, {
                key: "_checkContainer",
                value: function() {
                    this._container || (this._container = this._doc.createElement("gbutton-popup"), 
                    this._doc.documentElement.appendChild(this._container));
                }
            }, {
                key: "showOnboarding",
                value: function() {
                    this._show("onboarding");
                }
            }, {
                key: "showEmailPerception",
                value: function(e, t) {
                    this._show("emailPerception"), this._insertEmailFeedback = e, this._showFirstTime = t;
                }
            }, {
                key: "showDisable",
                value: function() {
                    this._show("disable");
                }
            }, {
                key: "_show",
                value: function(e) {
                    var t = this, n = this.el.getBoundingClientRect();
                    if (this.type = e, this._offsets = k[e], "emailPerception" === e) {
                        var r = window.outerWidth - this.el.getBoundingClientRect().right < E;
                        r && (this.type = "emailPerceptionFlipped", this._offsets = k[this.type]);
                    }
                    "emailPerception" !== e && (this._isFlipped = n.top < this._offsets.height), "disable" === e ? this._render() : this._showTimeout = setTimeout(function() {
                        return t._render();
                    }, 700), this.isActive = !0, _.listen(window, "resize", this._windowResize, !1);
                }
            }, {
                key: "hide",
                value: function() {
                    this.isActive = !1, this._container && p.unmountComponentAtNode(this._container), 
                    _.unlisten(window, "resize", this._windowResize, !1), clearTimeout(this._showTimeout);
                }
            }, {
                key: "_render",
                value: function() {
                    var e = this, t = void 0;
                    this._checkContainer();
                    var n = this._getStyles(!0), r = v.getDomain();
                    switch (this.type) {
                      case "onboarding":
                        t = f.createElement(m.OnboardingPopup, {
                            isFlipped: this._isFlipped,
                            styles: n,
                            openOnboardingDialog: function() {
                                return e._openDialog();
                            },
                            remove: function() {
                                return e.hide();
                            }
                        });
                        break;

                      case "disable":
                        t = f.createElement(g.DisablePopup, {
                            domain: r,
                            styles: n,
                            remove: function() {
                                return e.hide();
                            },
                            disableOnTab: function() {
                                e.actions.disableOnTab(), y.fire("disable-until-next-visit"), e.remove(), e._notifications.showDisableOnTab();
                            },
                            disableSite: function() {
                                e.actions.toggleSite(!1, r), y.fire("checking-toggled", {
                                    enabled: !1,
                                    placement: "gButton"
                                }), e.remove(), e._notifications.showDisable();
                            }
                        });
                        break;

                      case "emailPerception":
                      case "emailPerceptionFlipped":
                        t = f.createElement(h.EmailPerceptionPopup, {
                            isFlipped: this._isFlipped,
                            type: this.type,
                            styles: n,
                            remove: function() {
                                return e.hide();
                            },
                            insertGmailFeedback: function(t, n) {
                                e.remove(), e._insertEmailFeedback(t, n);
                            },
                            disableEmailPerceptionPopup: this.actions.disableEmailPerceptionPopup,
                            enableEmailPerceptionPopup: this.actions.enableEmailPerceptionPopup,
                            isFirstShown: this._showFirstTime
                        });
                        break;

                      default:
                        return void console.error("Error: unsupported type of gButton popup");
                    }
                    this._component = p.render(t, this._container);
                }
            }, {
                key: "remove",
                value: function() {
                    this.hide(), this._container && p.unmountComponentAtNode(this._container), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container);
                }
            } ]), e;
        }();
        n.Popup = C;
    }, {
        "../../tracking": 307,
        "./disable": 195,
        "./email-perception": 196,
        "./onboarding": 198,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "lib/dom": 215,
        "lib/location": 277,
        "lib/message": 278,
        "lib/position": 289,
        react: "react",
        "react-dom": "react-dom"
    } ],
    198: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("react"), h = e("react-dom"), g = e("lib/dom"), b = e("lib/elements/signin/button"), v = e("lib/tracking"), _ = {
            gButtonPopup: "_9d9f60-gButtonPopup",
            emailPerception: "_9d9f60-emailPerception",
            text: "_9d9f60-text",
            title: "_9d9f60-title",
            popupFooter: "_9d9f60-popupFooter",
            onboarding: "_9d9f60-onboarding",
            emailPerceptionFlipped: "_9d9f60-emailPerceptionFlipped",
            isFliped: "_9d9f60-isFliped",
            secondary: "_9d9f60-secondary",
            firstTime: "_9d9f60-firstTime",
            disable: "_9d9f60-disable",
            link: "_9d9f60-link",
            bold: "_9d9f60-bold",
            close: "_9d9f60-close"
        }, y = function(e) {
            function t() {
                (0, s["default"])(this, t);
                var e = (0, d["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));
                return e.cancel = function() {
                    e.props.remove(), v.fire("onboarding-popup-cancel");
                }, e.state = {
                    styles: {}
                }, e;
            }
            return (0, p["default"])(t, e), (0, l["default"])(t, [ {
                key: "componentDidMount",
                value: function() {
                    var e = this, t = h.findDOMNode(this.refs.gButtonPopup);
                    this._requestAnimationFrame = requestAnimationFrame(function() {
                        if (t.style.opacity = "1", t.style.transform) {
                            var e = t.style.transform.split(" ");
                            e[2] = "scale(1)", t.style.transform = e.join(" ");
                        }
                    }), this.setState(function() {
                        return {
                            styles: e.props.styles
                        };
                    }), v.fire("onboarding-popup-show");
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    cancelAnimationFrame(this._requestAnimationFrame);
                }
            }, {
                key: "render",
                value: function() {
                    var e = this;
                    return m.createElement("div", {
                        ref: "gButtonPopup",
                        className: g.cs(_.gButtonPopup, _.onboarding),
                        style: this.state.styles
                    }, m.createElement("p", {
                        className: _.title
                    }, "Grammarly is Now Active"), m.createElement("p", {
                        className: _.text
                    }, "Want to see how it works?"), m.createElement(b.Button, {
                        onClick: function() {
                            return e.props.openOnboardingDialog();
                        },
                        cls: "onboarding",
                        styles: {
                            width: "180px"
                        },
                        text: "take a quick tour"
                    }), m.createElement("button", {
                        className: _.link,
                        onClick: this.cancel
                    }, "No, thanks"), m.createElement("div", {
                        className: g.cs(_.popupFooter, this.props.isFlipped && _.isFliped)
                    }, "▲"));
                }
            } ]), t;
        }(m.Component);
        n.OnboardingPopup = y;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        "lib/elements/signin/button": 240,
        "lib/tracking": 307,
        react: "react",
        "react-dom": "react-dom"
    } ],
    199: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/classCallCheck"), i = r(o), a = e("babel-runtime/helpers/createClass"), s = r(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("lib/sites"), l = e("./intersect"), u = function() {
            function e() {
                (0, i["default"])(this, e), this._check = function(e, t) {
                    return t && e !== t ? t : void 0;
                };
            }
            return (0, s["default"])(e, [ {
                key: "getStateIfChanged",
                value: function(e, t, n, r, o, i) {
                    var a = e.minimize, s = e.maximize, u = 200, d = o || 0, f = t.ownerDocument, p = c.pageStyles(f).getFixesForCurrentDomain(), m = i ? "maximize" : "minimize";
                    if (a || s) {
                        var h = p.forceMinimize && p.forceMinimize(r);
                        if (h || a && !s) return this._check(m, "minimize");
                        if (!n || !a && s) return this._check(m, "maximize");
                        var g = void 0, b = l.getIntersect(t, n);
                        b && d && d > 0 && (this.textLengthWhenMinimized = d, g = "minimize");
                        var v = this.textLengthWhenMinimized && this.textLengthWhenMinimized - d > u, _ = !this.textLengthWhenMinimized || v || 0 === d;
                        return g = _ ? "maximize" : "minimize", this._check(m, g);
                    }
                }
            } ]), e;
        }();
        n.Minimizer = u;
    }, {
        "./intersect": 201,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "lib/sites": 294
    } ],
    200: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/classCallCheck"), i = r(o), a = e("babel-runtime/helpers/createClass"), s = r(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("lodash"), l = e("lib/window-events"), u = e("lib/util"), d = e("lib/dom"), f = e("./position"), p = e("./condition"), m = function() {
            function e(t, n, r) {
                var o = t.btnEl, a = t.fieldEl, s = t.sourceEl, l = t.custom, m = t.isTextarea, h = t.initCondition, g = this;
                (0, i["default"])(this, e), this._onPosUpdate = n, this._onStateChange = r, this.state = {
                    minimize: !1,
                    maximize: !0,
                    editor: null,
                    show: !1
                }, this.max = !0, this.windowEvents = {
                    paste: function() {
                        return g.debouncedUpdate();
                    },
                    resize: function() {
                        return g.update();
                    },
                    keyup: function() {
                        d.isFocused(g.fieldEl) && g.debouncedUpdate();
                    }
                }, this.checkResize = function() {
                    try {
                        if (g.position) {
                            var e = g.position.resize();
                            e && g.debouncedUpdate();
                        }
                    } catch (t) {
                        console.error(t), u.cancelInterval(g.checkResize);
                    }
                }, this.debouncedUpdate = c.debounce(function() {
                    return g.update();
                }, 50), this.update = function() {
                    if (g.state.show && g.position) {
                        g._onPosUpdate({
                            visibility: "hidden"
                        }), g._onPosUpdate(g.position.get(g.max));
                        var e = g.state.editor;
                        if (e) {
                            var t = e.ghostarea ? e.ghostarea.gh.clone.firstChild : g.fieldEl, n = e.getText().trim().length, r = g.minimizer && g.minimizer.getStateIfChanged(g.state, g.btnEl, t, g.fieldEl, n, g.max);
                            "undefined" != typeof r && (g.max = "maximize" === r, g._onStateChange(), g.update());
                        }
                    }
                }, this.remove = function() {
                    g.listeners("off"), g.minimizer = null, g.position && g.position.remove(), g.position = null;
                }, this.fieldEl = a, this.btnEl = o, this.max = h, this.state.minimize = !h, this.state.maximize = h, 
                this.position = f.createPositioner(o, s, l, m), this.minimizer = new p.Minimizer(), 
                this.listeners();
            }
            return (0, s["default"])(e, [ {
                key: "set",
                value: function(e, t) {
                    this.state[e] = t, this.update();
                }
            }, {
                key: "listeners",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "on";
                    "on" === e ? (l.on(this.windowEvents, null, !0), d.on.call(this.fieldEl, "scroll", this.debouncedUpdate), 
                    u.interval(this.checkResize, 200)) : (l.off(this.windowEvents, null, !0), d.off.call(this.fieldEl, "scroll", this.debouncedUpdate), 
                    u.cancelInterval(this.checkResize));
                }
            } ]), e;
        }();
        n.Pos = m;
    }, {
        "./condition": 199,
        "./position": 202,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "lib/dom": 215,
        "lib/util": 322,
        "lib/window-events": 323,
        lodash: "lodash"
    } ],
    201: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            var n = document.createElement("div");
            n.className = t, n.style.top = e.top + "px", n.style.left = e.left + "px", n.style.height = e.height + "px", 
            n.style.width = e.width + "px", n.style.position = "absolute", n.style.border = "1px dashed red", 
            n.style.zIndex = "1000000", n.style.pointerEvents = "none", document.body.appendChild(n);
        }
        function i(e, t) {
            return e.left + e.width > t.left && (e.bottom > t.top && e.bottom < t.bottom || e.top < t.bottom && e.top > t.top);
        }
        function a(e, t) {
            var n = document.body.scrollTop;
            return u && (0, l["default"])(document.querySelectorAll(".gr-evade")).forEach(function(e) {
                return e.parentElement && e.parentElement.removeChild(e);
            }), e.map(function(e) {
                return {
                    top: e.top + n,
                    bottom: e.bottom + n,
                    left: e.left,
                    width: e.width,
                    height: e.height
                };
            }).some(function(e) {
                return u && o(e, "gr-evade"), i(e, t);
            });
        }
        function s(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, r = e.getBoundingClientRect();
            if (!r) return !1;
            r = {
                top: r.top + document.body.scrollTop - d + n,
                bottom: r.bottom + document.body.scrollTop + d + n,
                left: r.left - d + n,
                width: r.width,
                height: r.height
            };
            var o = document.createRange();
            o.selectNodeContents(t);
            var i = t.clientWidth, s = (0, l["default"])(o.getClientRects()).filter(function(e) {
                var t = e.width;
                return t < i;
            });
            return a(s, r);
        }
        var c = e("babel-runtime/core-js/array/from"), l = r(c);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = !1, d = 2;
        n.getIntersect = s;
    }, {
        "babel-runtime/core-js/array/from": 19
    } ],
    202: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            function n() {
                var e = f.getPos(t, void 0), n = e.x !== C.x || e.y !== C.y;
                return !(x.clientWidth === t.clientWidth && x.clientHeight === t.clientHeight && !n) && (C = e, 
                !0);
            }
            function r() {
                if (!E) {
                    x = (0, u["default"])({
                        offsetHeight: t.offsetHeight,
                        clientWidth: t.clientWidth,
                        clientHeight: t.clientHeight
                    }, p.compStyle(t, "border-bottom-width", "border-right-width", "resize", "padding-top", "padding-bottom", "overflowX", "overflow", "padding-right"), f.getAbsRect(t)), 
                    x.canBeResized = [ "both", "horizontal", "vertical" ].includes(x.resize);
                    var n = f.getAbsRect(e), r = n.left, o = n.top;
                    x.left += S - r, x.top += T - o, h || "scroll" === x.overflowX || "scroll" === x.overflow || (x.height = Math.max(x.height, x.offsetHeight));
                }
            }
            function o(e) {
                if (e) return 0;
                var t = parseInt(x["padding-right"], 10);
                return t > 0 ? -t / 2 + 2 : -5;
            }
            function i(e, t) {
                var n = e ? v : _;
                return e ? t ? (n - x.height) / 2 : -8 : 0;
            }
            function s() {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], n = {
                    visibility: ""
                };
                if (m) return (0, u["default"])(n, k.btnCustomStyles ? k.btnCustomStyles(e, t) : {});
                r();
                var s = !e && x.canBeResized ? -10 : 0, l = x.clientHeight < g, d = i(e, l) + o(e), f = e || l ? 0 : -7, p = e ? v : _, h = k.btnDiff ? k.btnDiff(t) : [ 0, 0 ], b = (0, 
                c["default"])(h, 2), y = b[0], C = b[1], N = x.left + x.width - parseInt(x["border-right-width"], 10) - p + d + y, P = x.top + x.height - parseInt(x["border-bottom-width"], 10) - p + d + f + C + s;
                return N === S && P === T ? n : ((0, u["default"])(n, w ? (0, a["default"])({}, w, "translate(" + N + "px, " + P + "px)") : {}), 
                E = !0, S = N, T = P, n);
            }
            function l() {
                p.off.call(e, b, N);
            }
            var m = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], h = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], g = 25, b = p.transitionEndEventName(), v = 22, _ = 8, y = e.ownerDocument, w = p.transformProp(y), k = d.pageStyles(y).getFixesForCurrentDomain(), E = !1, C = f.getPos(t, void 0), x = void 0, S = 0, T = 0, N = function() {
                E = !1, r();
            };
            return p.on.call(e, b, N), r(), {
                get: s,
                resize: n,
                remove: l
            };
        }
        var i = e("babel-runtime/helpers/defineProperty"), a = r(i), s = e("babel-runtime/helpers/slicedToArray"), c = r(s), l = e("babel-runtime/core-js/object/assign"), u = r(l);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var d = e("lib/sites"), f = e("lib/position"), p = e("lib/dom");
        n.createPositioner = o;
    }, {
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/slicedToArray": 40,
        "lib/dom": 215,
        "lib/position": 289,
        "lib/sites": 294
    } ],
    203: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            function e(e, n) {
                var r = s.pageStyles(e.ownerDocument).getFixesForCurrentDomain(), o = r.fieldStateForDomain && r.fieldStateForDomain(e);
                if (o) return o;
                var i = n && "IFRAME" === n.tagName, a = i ? n : e, c = [ a.getAttribute("id") || "", a.getAttribute("name") || "" ].filter(Boolean);
                return c.length || c.push(t(a)), i && c.push(n.ownerDocument.location.host || ""), 
                c.join(":");
            }
            function t(e, t) {
                return e && e.id && !t ? '//*[@id="' + e.id + '"]' : n(e);
            }
            function n(e) {
                for (var t = []; e && 1 === e.nodeType; e = e.parentNode) {
                    for (var n = 0, r = e.previousSibling; r; r = r.previousSibling) r.nodeType !== Node.DOCUMENT_TYPE_NODE && r.nodeName === e.nodeName && ++n;
                    var o = e.nodeName.toLowerCase(), i = n ? "[" + (n + 1) + "]" : "";
                    t.splice(0, 0, o + i);
                }
                return t.length ? "/" + t.join("/") : null;
            }
            function r(t, n) {
                var r = e(t, n);
                return i[r];
            }
            function o(t, n, r) {
                var o = e(t, n);
                i[o] !== r && c((0, a["default"])({}, o, r));
            }
            var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, c = arguments[1];
            return {
                getSelector: e,
                isFieldDisabled: r,
                changeFieldState: o
            };
        }
        var i = e("babel-runtime/helpers/defineProperty"), a = r(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("../sites");
        n.State = o;
    }, {
        "../sites": 294,
        "babel-runtime/helpers/defineProperty": 36
    } ],
    204: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/defineProperty"), i = r(o), a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u), f = e("babel-runtime/helpers/possibleConstructorReturn"), p = r(f), m = e("babel-runtime/helpers/inherits"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("lodash"), b = e("react"), v = e("../dom"), _ = e("../util"), y = {
            textarea_btn: "_e725ae-textarea_btn",
            status: "_e725ae-status",
            field_hovered: "_e725ae-field_hovered",
            btn_text: "_e725ae-btn_text",
            not_focused: "_e725ae-not_focused",
            errors_100: "_e725ae-errors_100",
            anonymous: "_e725ae-anonymous",
            show: "_e725ae-show",
            errors: "_e725ae-errors",
            checking: "_e725ae-checking",
            has_errors: "_e725ae-has_errors",
            disabled: "_e725ae-disabled",
            transform_wrap: "_e725ae-transform_wrap",
            offline: "_e725ae-offline",
            plus_only: "_e725ae-plus_only",
            minimized: "_e725ae-minimized",
            hovered: "_e725ae-hovered",
            minimize_transition: "_e725ae-minimize_transition"
        }, w = function(e) {
            function t() {
                return (0, l["default"])(this, t), (0, p["default"])(this, (t.__proto__ || (0, s["default"])(t)).apply(this, arguments));
            }
            return (0, h["default"])(t, e), (0, d["default"])(t, [ {
                key: "render",
                value: function() {
                    var e, t = this, n = this.props.state, r = n.anonymous, o = n.premium, a = n.errors.critical, s = a > 0 && !n.checking, c = !n.enabled, l = n.offline, u = g([ y.textarea_btn ]).push(v.cs((e = {}, 
                    (0, i["default"])(e, y.show, n.show), (0, i["default"])(e, y.minimized, n.minimized), 
                    (0, i["default"])(e, y.minimize_transition, n.wasMinimized), (0, i["default"])(e, y.errors, s), 
                    (0, i["default"])(e, y.has_errors, a > 0), (0, i["default"])(e, y.errors_100, a > 99), 
                    (0, i["default"])(e, y.offline, l), (0, i["default"])(e, y.checking, n.checking && !l && !c), 
                    (0, i["default"])(e, y.disabled, c), (0, i["default"])(e, y.plus_only, o && !s && n.errors.plus > 0), 
                    (0, i["default"])(e, y.anonymous, r), (0, i["default"])(e, y.hovered, n.hovered), 
                    (0, i["default"])(e, y.field_hovered, n.isFieldHovered), (0, i["default"])(e, y.not_focused, !n.fieldWasFocused), 
                    e))).join(" "), d = v.camelizeAttrs(this.props.inlineStyle), f = s && a ? a : " ", p = "Found " + a + " " + _.declension(a, [ "error", "errors" ]) + " in text";
                    return a || (p = "Protected by Grammarly"), b.createElement("div", {
                        onClick: function(e) {
                            return t.props.onViewClick(e);
                        },
                        style: d,
                        className: u
                    }, b.createElement("div", {
                        className: y.transform_wrap
                    }, b.createElement("div", {
                        title: p,
                        className: y.status
                    }, f)));
                }
            } ]), t;
        }(b.Component);
        n.ButtonComponent = w;
    }, {
        "../dom": 215,
        "../util": 322,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        lodash: "lodash",
        react: "react"
    } ],
    205: [ function(e, t, n) {
        "use strict";
        function r() {
            return a.isFacebookSite() ? s.facebookRewriteFunction : a.isJiraSite() ? c.jiraRewriteFunction : a.isBlackboardSite() ? l.blackboardRewriteFunction : null;
        }
        function o() {
            var e = r();
            e && i(document, e, []);
        }
        function i(e, t, n) {
            var r = e.createElement("script");
            n = n || [];
            var o = t.toString(), i = n.join(",");
            return r.innerHTML = "(function(){(" + o + ")(" + i + ") })()", e.documentElement.appendChild(r), 
            r;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("lib/location"), s = e("./scripts/facebook"), c = e("./scripts/jira"), l = e("./scripts/blackboard");
        n.getClientScriptFunction = r, n.injectClientScriptIfNeeded = o, n.addScript = i;
    }, {
        "./scripts/blackboard": 207,
        "./scripts/facebook": 208,
        "./scripts/jira": 210,
        "lib/location": 277
    } ],
    206: [ function(e, t, n) {
        "use strict";
        function r(e) {
            if ("TEXTAREA" !== e.tagName) try {
                var t = e.ownerDocument, n = o.sanitize(e.getAttribute("data-gramm_id")), r = "document.querySelector(\"[data-gramm_id='" + n + "']\")";
                return i.addScript(t, a.rewriteInnerHTML, [ r ]);
            } catch (s) {
                return void console.log("error rewrite " + s);
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("dompurify"), i = e("./index"), a = e("./scripts/inner-html");
        n.rewriteInnerHTML = r;
    }, {
        "./index": 205,
        "./scripts/inner-html": 209,
        dompurify: "dompurify"
    } ],
    207: [ function(e, t, n) {
        "use strict";
        function r() {
            function e(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10;
                if (e) {
                    for (;e && e !== document.body && !t(e) && n > 0; ) e = e.parentElement, n--;
                    return e && t(e);
                }
            }
            function t(t) {
                return e(t, function(e) {
                    return e.classList && e.classList.contains("editor-element");
                });
            }
            function n(e) {
                return "function" == typeof e.matches && e.matches("grammarly-card, grammarly-card *, .gr-top-zero, .gr-top-zero *");
            }
            function r(e, t) {
                var n = t && t.getAttribute("data-action");
                "editor" !== n && "login" !== n && e.focus();
            }
            function o(e) {
                var o = e.target, s = e.relatedTarget || e.explicitOriginalTarget || document.elementFromPoint(i, a);
                s && o && t(o) && n(s) && (e.stopImmediatePropagation(), r(o, s));
            }
            var i = 0, a = 0;
            document.addEventListener("blur", o, !0), document.addEventListener("DOMContentLoaded", function() {
                document.addEventListener("mousemove", function(e) {
                    i = e.clientX, a = e.clientY;
                }, !0);
            });
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.blackboardRewriteFunction = r;
    }, {} ],
    208: [ function(e, t, n) {
        "use strict";
        function r() {
            function e(e) {
                var t = {
                    target: document.activeElement,
                    _inherits_from_prototype: !0,
                    defaultPrevented: !1,
                    preventDefault: function() {}
                };
                for (var n in e) t[n] = e[n];
                return t;
            }
            function t(e, t) {
                var r = n[e];
                r && r.forEach(function(e) {
                    e(t);
                });
            }
            var n = {};
            document.addEventListener("document-paste-activeElement-gr", function(n) {
                t("paste", e({
                    clipboardData: {
                        getData: function() {
                            return n.detail || "";
                        },
                        items: [ "text/plain" ]
                    }
                }));
            }), document.addEventListener("document-mousedown-mouseup-activeElement-gr", function() {
                t("mousedown", e({
                    type: "mousedown"
                })), t("mouseup", e({
                    type: "mouseup"
                }));
            }), document.addEventListener("document-backspace-activeElement-gr", function() {
                t("keydown", e({
                    keyCode: 8,
                    which: 8,
                    charCode: 0,
                    type: "keydown"
                }));
            });
            var r = document.addEventListener.bind(document);
            document.addEventListener = function(e, t, o) {
                var i = n[e] || [];
                i.push(t), n[e] = i, r(e, t, o);
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.facebookRewriteFunction = r;
    }, {} ],
    209: [ function(e, t, n) {
        "use strict";
        function r(e) {
            function t(e) {
                if (e.parentNode) if (e.childNodes.length > 1) {
                    for (var t = document.createDocumentFragment(); e.childNodes.length > 0; ) t.appendChild(e.childNodes[0]);
                    e.parentNode.replaceChild(t, e);
                } else e.firstChild ? e.parentNode.replaceChild(e.firstChild, e) : e.parentNode.removeChild(e);
            }
            function n(e) {
                if (e) try {
                    for (var n = e.querySelectorAll(".gr_"), r = n.length, o = 0; o < r; o++) t(n[o]);
                } catch (i) {}
            }
            function r(e) {
                try {
                    Object.defineProperty(e, "innerHTML", {
                        get: function() {
                            try {
                                var t = e.ownerDocument.createRange();
                                t.selectNodeContents(e);
                                var r = t.cloneContents(), o = document.createElement("div");
                                return o.appendChild(r), n(o), o.innerHTML;
                            } catch (i) {
                                return "";
                            }
                        },
                        set: function(t) {
                            try {
                                var n = e.ownerDocument.createRange();
                                n.selectNodeContents(e), n.deleteContents();
                                var r = n.createContextualFragment(t);
                                e.appendChild(r);
                            } catch (o) {}
                        }
                    });
                } catch (t) {}
            }
            if (e) {
                var o = e.cloneNode;
                e.cloneNode = function(t) {
                    var i = o.call(e, t);
                    if (e.classList.contains("mceContentBody")) i.innerHTML = e.innerHTML, n(i); else try {
                        r(i);
                    } catch (a) {}
                    return i;
                }, r(e);
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.rewriteInnerHTML = r;
    }, {} ],
    210: [ function(e, t, n) {
        "use strict";
        function r() {
            function e(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = document.createEvent("CustomEvent");
                n.initCustomEvent(e + "-gr", !0, !0, t), document.dispatchEvent(n);
            }
            function t(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10;
                if (e) {
                    for (;e && e !== document.body && !t(e) && n > 0; ) e = e.parentElement, n--;
                    return e && t(e);
                }
            }
            function n(e) {
                return t(e, function(e) {
                    return e.classList && (e.classList.contains("inline-edit-fields") || e.classList.contains("editable-field"));
                });
            }
            function r(e) {
                return "function" == typeof e.matches && e.matches("grammarly-card, grammarly-card *,.gr-top-zero, .gr-top-zero *,[class*=-gButtonPopup], [class*=-gButtonPopup] *,[class*=-onboardingDialog], [class*=-onboardingDialog] *");
            }
            function o(e, t) {
                var n = t && t.getAttribute("data-action");
                "editor" !== n && "login" !== n && e.focus();
            }
            function i(e) {
                var t = e.target, i = e.relatedTarget || e.explicitOriginalTarget || document.elementFromPoint(a, s);
                i && t && n(t) && r(i) && (e.stopImmediatePropagation(), o(t, i));
            }
            var a = 0, s = 0;
            document.addEventListener("blur", i, !0), document.addEventListener("DOMContentLoaded", function() {
                function t() {
                    return "jira" === document.body.id && document.body.getAttribute("data-version") || document.querySelector("input[type=hidden][title=JiraVersion]");
                }
                t() ? (e("jira-inline-support", {
                    activated: !0
                }), document.addEventListener("mousemove", function(e) {
                    a = e.clientX, s = e.clientY;
                }, !0)) : (e("jira-inline-support", {
                    activated: !1
                }), document.removeEventListener("blur", i, !0));
            });
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.jiraRewriteFunction = r;
    }, {} ],
    211: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/toConsumableArray"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("spark-md5"), s = e("config"), c = e("./newConfig");
        n.isTestsMode = c.isTestsMode, n.getVersion = c.getVersion, n.getUuid = c.getUuid, 
        n.ENV = c.ENV, n.URLS = c.URLS, n.GRAMMARLY_DOMAIN = c.GRAMMARLY_DOMAIN, n.appName = c.appName, 
        n.gnarAppName = c.gnarAppName, n.GNAR = s.getGlobal().appConfig.gnar, n.news = [ "The G logo gets out of the way when you're typing", "Switch between American and British English", "Quickly disable checking in certain types of text fields", "A fully redesigned and improved interface" ], 
        n.newsId = n.news.length && a.hash(n.news.join("\n")), n.userFields = [ "id", "email", "firstName", "anonymous", "type", "subscriptionFree", "experiments", "isTest", "premium", "settings", "registrationDate", "mimic", "groups", "extensionInstallDate", "fixed_errors", "referral" ], 
        n.userFields.push("token"), n.nextVerClass = "gr_ver_2", n.grammarlyAttrs = [ "data-gramm_editor", "data-gramm", "data-gramm_id", "gramm_editor" ], 
        n.restrictedAttrs = [].concat((0, i["default"])(n.grammarlyAttrs), [ "readonly", "disabled" ]), 
        n.customFieldsRestrictedAttrs = [ "pm-container", [ "class", "ProseMirror" ], "data-synchrony", [ "data-gramm", "false" ], [ "class", "redactor-layer" ], [ "class", "redactor-editor" ], [ "class", "redactor_box" ], [ "aria-label", "Search Facebook" ] ], 
        n.allRestrictedAttrs = [].concat((0, i["default"])(n.restrictedAttrs), (0, i["default"])(n.customFieldsRestrictedAttrs)), 
        n.restrictedParentAttrs = "[data-reactid]", n.externalEvents = [ "changed-user", "changed-plan", "changed-dialect", "cleanup", "editor-fix", "enable-email-perception" ], 
        n.development = "127.0.0.1:3117" === document.location.host;
    }, {
        "./newConfig": 279,
        "babel-runtime/helpers/toConsumableArray": 41,
        config: 169,
        "spark-md5": "spark-md5"
    } ],
    212: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var e = {
                log: f._f
            };
            m.forEach(function(t) {
                e[t] = g[t];
            }), h.console = e;
        }
        function i() {
            p.on("bg-log", function(e) {
                var t;
                (t = console)[e.method].apply(t, [ "BG LOG" ].concat((0, d["default"])(e.args)));
            });
        }
        function a() {
            i();
            var e = {};
            m.concat("log").forEach(function(t) {
                e[t] = function() {
                    for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    try {
                        b.push({
                            method: t,
                            args: n
                        }), g[t]((0, l["default"])(n));
                    } catch (o) {}
                };
            }), h.console = e;
        }
        function s() {
            var e = b.concat();
            return b.length = 0, e;
        }
        var c = e("babel-runtime/core-js/json/stringify"), l = r(c), u = e("babel-runtime/helpers/toConsumableArray"), d = r(u);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var f = e("./util"), p = e("./message"), m = [ "info", "warn", "error", "time", "timeEnd", "debug" ], h = window, g = console;
        n.disableConsoleLog = o;
        var b = [];
        n.setSeleniumCompatibility = a, n.flushLog = s;
    }, {
        "./message": 278,
        "./util": 322,
        "babel-runtime/core-js/json/stringify": 22,
        "babel-runtime/helpers/toConsumableArray": 41
    } ],
    213: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/symbol"), i = r(o), a = e("babel-runtime/core-js/object/assign"), s = r(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("./dom"), l = e("./util"), u = e("./position"), d = e("emitter"), f = e("react"), p = e("./tracking"), m = e("react-dom"), h = e("dompurify"), g = e("./window-events"), b = e("./elements/tooltip"), v = e("./inline-cards/icons"), _ = {
            container: "_c4f153-container",
            flip: "_c4f153-flip",
            flipSyn: "_c4f153-flipSyn",
            card: "_c4f153-card",
            bigTitle: "_c4f153-bigTitle",
            unknownWordTitle: "_c4f153-unknownWordTitle",
            btnDictLabelWithIcon: "_c4f153-btnDictLabelWithIcon",
            explanation: "_c4f153-explanation",
            replacement: "_c4f153-replacement",
            maxWidthReached: "_c4f153-maxWidthReached",
            item: "_c4f153-item",
            logoIcon: "_c4f153-logoIcon",
            ignoreIcon: "_c4f153-ignoreIcon",
            undoIcon: "_c4f153-undoIcon",
            dictionaryIcon: "_c4f153-dictionaryIcon",
            wikiIcon: "_c4f153-wikiIcon",
            footer: "_c4f153-footer",
            footerButton: "_c4f153-footerButton",
            btnIgnore: "_c4f153-btnIgnore",
            icon: "_c4f153-icon",
            btnLogo: "_c4f153-btnLogo",
            btnPersonalize: "_c4f153-btnPersonalize",
            personalizeMessage: "_c4f153-personalizeMessage",
            attn: "_c4f153-attn",
            cardAddedToDict: "_c4f153-cardAddedToDict",
            addedToDictTitle: "_c4f153-addedToDictTitle",
            dictionaryDescription: "_c4f153-dictionaryDescription",
            undo: "_c4f153-undo",
            dictLink: "_c4f153-dictLink",
            dictionaryAddedIcon: "_c4f153-dictionaryAddedIcon",
            synTitle: "_c4f153-synTitle",
            synList: "_c4f153-synList",
            synListSingle: "_c4f153-synListSingle",
            synListTitle: "_c4f153-synListTitle",
            synListNumber: "_c4f153-synListNumber",
            synSubitems: "_c4f153-synSubitems",
            synItem: "_c4f153-synItem",
            dict: "_c4f153-dict",
            dictContent: "_c4f153-dictContent",
            dictItemCounter: "_c4f153-dictItemCounter",
            dictItem: "_c4f153-dictItem",
            qualifier: "_c4f153-qualifier",
            dictFooterItem: "_c4f153-dictFooterItem",
            wikiLink: "_c4f153-wikiLink",
            wiki: "_c4f153-wiki",
            gr__tooltip_empty: "gr__tooltip_empty",
            gr__tooltip: "gr__tooltip",
            "gr-notfound-tooltip": "gr-notfound-tooltip",
            "gr__tooltip-content": "gr__tooltip-content",
            "gr__tooltip-logo": "gr__tooltip-logo",
            gr__flipped: "gr__flipped"
        };
        n.DictionaryCard = f.createClass({
            displayName: "DictionaryCard",
            getDefaultProps: function() {
                return {
                    pos: {
                        rect: {
                            top: 0,
                            left: 0,
                            width: 0
                        },
                        sourceRect: {
                            width: 0
                        },
                        delta: {
                            right: 0
                        },
                        className: "",
                        visible: !1
                    },
                    data: void 0,
                    visible: !1
                };
            },
            render: function() {
                var e = {}, t = this.props.pos;
                e.top = t.rect.top, e.left = t.rect.left, e.visibility = this.props.visible ? "" : "hidden";
                var n = this.props.data;
                return f.createElement("div", {
                    className: _.container,
                    style: e
                }, f.createElement("div", {
                    tabIndex: -1,
                    className: c.cs(_.card, _.dict, t.rect.flip && _.flip)
                }, f.createElement("div", {
                    className: _.dictContent
                }, n.defs.map(function(e, t) {
                    var r = e.replace(/^([:,]\s)/, "");
                    return r = r[0].toUpperCase() + r.substring(1, r.length), f.createElement("div", {
                        key: t,
                        className: c.cs(1 === n.defs.length ? _.dictSingle : _.dictItem)
                    }, n.defs.length > 1 && f.createElement("span", {
                        className: _.dictItemCounter
                    }, t + 1, ". "), f.createElement("span", {
                        dangerouslySetInnerHTML: {
                            __html: h.sanitize(r)
                        }
                    }));
                })), f.createElement("div", {
                    className: _.footer
                }, n.url && "wiki" === n.origin && f.createElement("div", {
                    className: c.cs(_.item, _.wiki)
                }, f.createElement("a", {
                    href: encodeURI(n.url),
                    target: "_blank",
                    className: _.wikiLink
                }, f.createElement(v.WikiIcon, {
                    className: c.cs(_.icon, _.wikiIcon)
                }), " More on Wikipedia")), f.createElement("div", {
                    className: c.cs(_.item, _.dictFooterItem)
                }, f.createElement(v.LogoIcon, {
                    className: c.cs(_.icon, _.logoIcon)
                }), " Definitions by Grammarly"))));
            }
        });
        var y = (0, s["default"])(function() {
            function e(e) {
                w.innerHTML = h.sanitize(e);
                var t = w.querySelector("span.qualifier");
                return t ? (t.innerHTML = t.innerHTML.replace("(", "").replace(")", ""), t.className = _.qualifier, 
                w.innerHTML) : e;
            }
            function t(e) {
                return e.replace(/&lt;(sup|sub)&gt;(.*?)&lt;(\/sup|\/sub)&gt;/, "<$1>$2<$3>").replace(/&amp;(?=\w{1,8};)/, "&");
            }
            function r(n, r) {
                var i = {
                    ownerDocument: y,
                    getBoundingClientRect: function() {
                        return r.pos;
                    },
                    getClientRects: function() {
                        return [ r.pos ];
                    }
                };
                if (S = n, S.defs && S.defs.length) {
                    var a = u.getAbsRect(i);
                    S.title = r.el.toString(), S.defs = S.defs.splice(0, 3).map(e).map(t), C = o(!1), 
                    x = m.findDOMNode(C.component), T = u.posToRect(x, a), o();
                } else E.enable(), E.show({
                    posEl: r.el,
                    text: "No definition found"
                });
                g.on(N, null, !0), p.logger.dictCardShowAction();
            }
            function o() {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                return c.renderReactWithParent(f.createElement(n.DictionaryCard, {
                    pos: T,
                    data: S,
                    visible: e
                }), y.documentElement, k, "grammarly-card");
            }
            function a() {
                C && C.remove(), g.off(N, null, !0), P.emit("hide"), E.disable(), E.hide(), C = null, 
                p.logger.dictCardHideAction();
            }
            function s(e) {
                27 === l.keyCode(e) && a();
            }
            function v(e) {
                "dictionary-card" !== document.body.className && (c.inEl(e.target, x) || a());
            }
            var y = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document, w = y.createElement("div"), k = (0, 
            i["default"])("DictionaryCard"), E = b.createTooltip({
                cls: c.cs("gr-notfound-tooltip", _.gr__tooltip_empty),
                enabled: !1,
                doc: y
            }), C = void 0, x = void 0, S = void 0, T = void 0, N = {
                click: v,
                keydown: s,
                scroll: a,
                resize: a
            }, P = d({
                show: r,
                hide: a,
                unescapeSuperscript: t
            });
            return P;
        }, {
            component: n.DictionaryCard
        });
        n.Card = y;
    }, {
        "./dom": 215,
        "./elements/tooltip": 247,
        "./inline-cards/icons": 266,
        "./position": 289,
        "./tracking": 307,
        "./util": 322,
        "./window-events": 323,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/symbol": 32,
        dompurify: "dompurify",
        emitter: "emitter",
        react: "react",
        "react-dom": "react-dom"
    } ],
    214: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            function t() {
                u && u.release(), u = null, l = null;
            }
            function n(e) {
                return d(this, void 0, void 0, a["default"].mark(function t() {
                    var n, r;
                    return a["default"].wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (n = !!e.el.startContainer && g.matchesSelector(e.el.startContainer.parentNode, ".gr-grammar-card, .gr-grammar-card *, .gr-dictionary-card, .gr-dictionary-card *"), 
                            !n || o) {
                                t.next = 3;
                                break;
                            }
                            return t.abrupt("return");

                          case 3:
                            return y = "gr-selection-anim-dict " + b.nextVerClass, i.animate(e.el, y), l = e, 
                            r = {}, t.prev = 7, t.next = 10, m.fetch(b.URLS.dictionary, {
                                data: (0, c["default"])({}, e.data)
                            });

                          case 10:
                            if (r = t.sent, l === e) {
                                t.next = 13;
                                break;
                            }
                            return t.abrupt("return");

                          case 13:
                            t.next = 18;
                            break;

                          case 15:
                            t.prev = 15, t.t0 = t["catch"](7), p.logger.fetchDefinitionsFail();

                          case 18:
                            i.complete(), s.show(r, e), n && i.remove();

                          case 21:
                          case "end":
                            return t.stop();
                        }
                    }, t, this, [ [ 7, 15 ] ]);
                }));
            }
            var r = e.doc, o = e.cardInspection, i = new _.SelectionAnimator(r), s = v.Card(r), l = void 0, u = new h.SelectionElement(r, n, i.remove), y = void 0;
            return s.on("hide", i.remove), f({
                clear: t
            });
        }
        var i = e("babel-runtime/regenerator"), a = r(i), s = e("babel-runtime/core-js/object/assign"), c = r(s), l = e("babel-runtime/core-js/promise"), u = r(l), d = function(e, t, n, r) {
            return new (n || (n = u["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var f = e("emitter"), p = e("./tracking"), m = e("./request"), h = e("./selection"), g = e("./dom"), b = e("./config"), v = e("./dictionary-card"), _ = e("./selection-animator");
        n.dictionary = o;
    }, {
        "./config": 211,
        "./dictionary-card": 213,
        "./dom": 215,
        "./request": 291,
        "./selection": 293,
        "./selection-animator": 292,
        "./tracking": 307,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/regenerator": 43,
        emitter: "emitter"
    } ],
    215: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            var n = (t || document).createElement("div");
            return n.innerHTML = fe.sanitize(e.trim()), n.firstElementChild;
        }
        function i(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "div", o = t, i = o[n] = o[n] || {};
            i.el || (i.el = o.ownerDocument.createElement(r), o.appendChild(i.el));
            var a = ce.render(e, i.el);
            return null == i.remove && (i.remove = function() {
                delete o[n], o.removeChild(i.el), ce.unmountComponentAtNode(i.el);
            }), {
                component: a,
                remove: i.remove.bind(i),
                el: i.el
            };
        }
        function a(e, t) {
            for (var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3, r = 0, o = e; o.parentNode && r < n; ) {
                if ("string" != typeof t && t === o) return !0;
                if (o.id === t || o === t) return !0;
                o = o.parentNode;
            }
            return !1;
        }
        function s(e, t) {
            return !(!e || void 0 === e.className) && e.classList.contains(t);
        }
        function c(e, t) {
            if (e && e.classList) return e.classList.remove(t);
        }
        function l(e, t) {
            if (e) {
                if (t.indexOf(" ") === -1) return e.classList.add(t);
                for (var n = t.split(" "), r = 0; r < n.length; r++) e.classList.add(n[r]);
            }
        }
        function u(e, t, n) {
            t ? l(e, n) : c(e, n);
        }
        function d(e, t) {
            for (var n = e.parentNode; null !== n; ) {
                if (m(n, t)) return n;
                n = n.parentNode;
            }
            return !1;
        }
        function f(e) {
            for (var t = e.parentNode; null !== t; ) {
                if (p(t)) return t;
                t = t.parentNode;
            }
            return !1;
        }
        function p(e) {
            return "true" === e.contentEditable || "plaintext-only" === e.contentEditable;
        }
        function m(e, t) {
            if (!e) return !1;
            var n = e.matches || e.msMatchesSelector || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector;
            return !!n && n.apply(e, [ t ]);
        }
        function h(e) {
            return document.activeElement && "IFRAME" === document.activeElement.tagName ? e === e.ownerDocument.activeElement : document.activeElement && "BODY" === document.activeElement.tagName ? e === document.activeElement : e === document.activeElement;
        }
        function g(e, t, n, r) {
            var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            if (null != e) {
                var i = e;
                if ("string" != typeof t) return le.each(t, function(e, t) {
                    g(i, t, e, r);
                });
                if (n) {
                    var a = i[pe] || [];
                    return i[pe] = a, r ? (i[pe] = a.filter(function(e) {
                        return !(e.event === t && e.cb === n);
                    }), i.removeEventListener(t, n, o)) : (a.push({
                        event: t,
                        cb: n
                    }), i.addEventListener(t, n, o)), {
                        el: i,
                        event: t,
                        cb: n,
                        bubble: o
                    };
                }
            }
        }
        function b(e, t, n, r) {
            var o = e;
            t || null == o[pe] ? g(o, t, n, !0, r) : o[pe].forEach(function(e) {
                return b(o, e.event, e.cb, e.bubble);
            });
        }
        function v(e, t, n) {
            var r = this;
            return this.addEventListener(e, t, n), {
                off: function() {
                    return _.apply(r, [ e, t, n ]);
                }
            };
        }
        function _(e, t, n) {
            this.removeEventListener(e, t, n);
        }
        function y(e, t) {
            var n = this, r = function o(r) {
                t(r), _.call(n, e, o);
            };
            v.call(this, e, r);
        }
        function w(e, t) {
            var n = document.createEvent("CustomEvent");
            n.initCustomEvent(e, !0, !0, t), this.dispatchEvent(n);
        }
        function k(e) {
            var t = getComputedStyle(e, void 0);
            return "none" !== t.getPropertyValue("display") && "hidden" !== t.getPropertyValue("visibility") && e.clientHeight > 0;
        }
        function E() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return t.reduce(function(e, t) {
                return e.concat(le.isObject(t) ? (0, se["default"])(t).filter(function(e) {
                    return t[e];
                }) : t);
            }, []).filter(function(e) {
                return Boolean(e);
            }).join(" ");
        }
        function C(e, t) {
            return "number" != typeof t || me[T(e)] ? t : t + "px";
        }
        function x(e) {
            return e.replace(/-+(.)?/g, function(e, t) {
                return t ? t.toUpperCase() : "";
            });
        }
        function S(e) {
            return le.transform(e, function(e, t, n) {
                return e[x(n)] = t;
            });
        }
        function T(e) {
            return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
        }
        function N(e, t, n) {
            if (arguments.length < 3) {
                var r = e;
                if (!r) return;
                var o = getComputedStyle(r, "");
                if ("string" == typeof t) return r.style[x(t)] || o.getPropertyValue(t);
                if (le.isArray(t)) {
                    var i = {};
                    return le.each(t, function(e, t) {
                        i[x(e)] = r.style[x(e)] || o.getPropertyValue(e);
                    }), i;
                }
            }
            var a = "";
            if (le.isString(t)) n || 0 === n ? a = T(t) + ":" + C(t, n) : e.style.removeProperty(T(t)); else {
                t = t;
                for (var s in t) t[s] || 0 === t[s] ? a += T(s) + ":" + C(s, t[s]) + ";" : e.style.removeProperty(T(s));
            }
            return e.style.cssText += ";" + a;
        }
        function P(e, t) {
            if (t && e) {
                var n = N(e, (0, se["default"])(t));
                return N(e, t), function() {
                    return N(e, n);
                };
            }
        }
        function j(e, t) {
            for (var n = e.parentNode; null !== n; ) {
                if (n.tagName === t) return n;
                n = n.parentNode;
            }
            return null;
        }
        function I(e, t, n) {
            for (var r = e.parentNode; null !== r; ) {
                if (r.dataset && r.dataset[t] && r.dataset[t] == n) return r;
                r = r.parentNode;
            }
        }
        function A(e, t) {
            return s(e, t) ? e : L(e, t);
        }
        function L(e, t) {
            for (var n = e.parentNode; null !== n; ) {
                if (s(n, t)) return n;
                n = n.parentNode;
            }
            return !1;
        }
        function M(e, t) {
            if (!e) return !1;
            for (var n = e; n.parentNode; ) {
                if (s(n, t)) return n;
                n = n.parentNode;
            }
            return !1;
        }
        function O() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            return e ? O.call(this.parentNode, --e) : this;
        }
        function R(e, t) {
            if (!e) return !1;
            for (var n = e; n.parentNode; ) {
                if (t === n.parentNode) return n;
                n = n.parentNode;
            }
            return !1;
        }
        function F(e, t) {
            var n = t.parentNode;
            if (null === n) throw new de.AssertionError("Expected non-null parent");
            n.lastChild === t ? n.appendChild(e) : n.insertBefore(e, t.nextSibling);
        }
        function D(e, t) {
            de.assertNonNull(t.parentNode, "parent node").insertBefore(e, t);
        }
        function B(e, t) {
            t = t || document;
            for (var n = e; n; ) {
                if (n === t) return !0;
                n = n.parentNode;
            }
            return !1;
        }
        function U(e) {
            var t = void 0, n = void 0, r = {
                ctrl: !1,
                meta: !1,
                shift: !1,
                alt: !1
            }, o = le.extend(r, e);
            try {
                t = o.el.ownerDocument.createEvent("KeyEvents"), n = o.el.ownerDocument.defaultView, 
                t.initKeyEvent(o.type, !0, !0, n, o.ctrl, o.alt, o.shift, o.meta, 0, 0);
            } catch (i) {
                t = o.el.ownerDocument.createEvent("UIEvents"), t.initUIEvent.bind(t)(void 0, !0, !0, window, 1), 
                t.keyCode = 0, t.which = 0, t.charCode = 0, t.ctrlKey = o.ctrl, t.altKey = o.alt, 
                t.shiftKey = o.shift, t.metaKey = o.meta;
            }
            o.el.dispatchEvent(t);
        }
        function W(e) {
            return "undefined" != typeof e.hidden ? e.hidden : "undefined" != typeof e.mozHidden ? e.mozHidden : "undefined" != typeof e.webkitHidden ? e.webkitHidden : "undefined" != typeof e.msHidden && e.msHidden;
        }
        function G(e) {
            return "undefined" != typeof e.hidden ? "visibilitychange" : "undefined" != typeof e.mozHidden ? "mozvisibilitychange" : "undefined" != typeof e.webkitHidden ? "webkitvisibilitychange" : "undefined" != typeof e.msHidden && "msvisibilitychange";
        }
        function V() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document;
            return "undefined" != typeof e.body.style.transform ? "transform" : "undefined" != typeof e.body.style.WebkitTransform ? "WebkitTransform" : "undefined" != typeof e.body.style.MozTransform ? "MozTransform" : void 0;
        }
        function z(e) {
            return e.getSelection() || {};
        }
        function H(e) {
            if (e) {
                var t = e.ownerDocument;
                if (t) {
                    var n = t.defaultView || window;
                    if (n) {
                        var r = n.getComputedStyle(e, void 0);
                        if (r) {
                            for (var o = arguments.length, i = Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
                            return 1 === i.length ? r.getPropertyValue(i[0]) : i.reduce(function(e, t) {
                                return (0, ie["default"])({}, e, (0, re["default"])({}, t, r.getPropertyValue(t)));
                            }, {});
                        }
                    }
                }
            }
        }
        function q(e) {
            return e.split(" ").map(function(e) {
                return "." !== e[0] ? "." + e : e;
            }).join("").trim();
        }
        function K(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            if (n.length > 0) {
                var o = [];
                return o.push(K(e)), n.forEach(function(e) {
                    return o.push(K(e));
                }), o.join(", ");
            }
            return e = e.split(", ").map(function(e) {
                return "." !== e[0] ? "." + e : e;
            }).join(", ").trim(), e + ", " + e + " *";
        }
        function Y() {
            var e = document.createElement("fakeelement"), t = {
                animation: "animationend",
                MozAnimation: "animationend",
                WebkitAnimation: "webkitAnimationEnd"
            };
            for (var n in t) if (void 0 !== e.style[n]) return t[n];
        }
        function J() {
            var e = document.createElement("fakeelement"), t = {
                transition: "transitionend",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
            for (var n in t) if (t.hasOwnProperty(n) && void 0 !== e.style[n]) return t[n];
        }
        function Q(e) {
            if ("undefined" != typeof window.GR_INLINE_STYLES) {
                var t = e.createElement("style");
                t.innerHTML = window.GR_INLINE_STYLES;
                try {
                    e.querySelector("head").appendChild(t);
                } catch (n) {
                    console.log("can't append style", n);
                }
            }
        }
        function X(e, t) {
            e.setAttribute("data-gramm_id", t), e.setAttribute("data-gramm", "true");
        }
        function $(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = document.createEvent("CustomEvent");
            n.initCustomEvent(e + "-gr", !0, !0, t), document.dispatchEvent(n);
        }
        function Z(e, t) {
            var n = e.getSelection();
            n.removeAllRanges(), n.addRange(t);
        }
        function ee(e, t) {
            var n = e.createRange();
            n.setStart(t.anchorNode, t.anchorOffset), n.setEnd(t.focusNode, t.focusOffset), 
            Z(e, n);
        }
        function te(e, t) {
            return null === e ? null : m(e, t) ? e : e.querySelector(t) || te(e.parentElement, t);
        }
        var ne = e("babel-runtime/helpers/defineProperty"), re = r(ne), oe = e("babel-runtime/core-js/object/assign"), ie = r(oe), ae = e("babel-runtime/core-js/object/keys"), se = r(ae);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var ce = e("react-dom"), le = e("lodash"), ue = e("./util"), de = e("stdlib"), fe = e("dompurify");
        n.createEl = o, n.renderReactWithParent = i, n.inEl = a, n.hasClass = s, n.removeClass = c, 
        n.addClass = l, n.toggleClass = u, n.getParentBySel = d, n.parentIsContentEditable = f, 
        n.isContentEditable = p, n.matchesSelector = m, n.isFocused = h;
        var pe = ue.guid();
        n.listen = g, n.unlisten = b, n.on = v, n.off = _, n.once = y, n.emit = w, n.isVisible = k, 
        n.cs = E;
        var me = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        };
        n.maybeAddPx = C, n.camelize = x, n.camelizeAttrs = S, n.dasherize = T, n.css = N, 
        n.setCustomCss = P, n.getParentByTag = j, n.getParentByData = I, n.resolveEl = A, 
        n.getParent = L, n.parentHasClass = M, n.getParentByDepth = O, n.isParent = R, n.insertAfter = F, 
        n.insertBefore = D, n.elementInDocument = B, n.runKeyEvent = U, n.docHidden = W, 
        n.visibilityEvent = G, n.transformProp = V, n.getDocSelection = z, n.compStyle = H, 
        n.classSelector = q, n.selectorAll = K, n.whichAnimationEndEvent = Y, n.transitionEndEventName = J, 
        n.addIframeCss = Q, n.setGRAttributes = X, n.emitDomEvent = $, n.addRange = Z, n.setDomRange = ee, 
        n.closestEl = te;
    }, {
        "./util": 322,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/helpers/defineProperty": 36,
        dompurify: "dompurify",
        lodash: "lodash",
        "react-dom": "react-dom",
        stdlib: 328
    } ],
    216: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            function n() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "on", t = y.visibilityEvent(_e);
                "on" === e ? (v.on("beforeunload", Z), f.on("editor-set-state", O), f.on("dialog-closed", R), 
                f.on("focus-editor", F), f.on("after-refresh-dialog", U), he.on("track", k.track), 
                he.on("fix", ie), he.on("serviceState", M), he.on("addedSynonym", I), he.on("afterReplace", s), 
                he.dom && (he.dom.on("badCursorPositionRetryFail", m.logger.cursorJump), he.dom.on("badCursorPosition", m.logger.badCursorPosition)), 
                he.on("iframe-mousemove", A), i(!0), t && y.listen(_e, t, q), y.listen(_e, "grammarly:reset", L), 
                be && y.listen(_e.documentElement, "mousemove", C), te.card && (te.card.on("show", T), 
                te.card.on("hide", N), te.card.on("toeditor", P), te.card.on("addtodict", j))) : (v.off("beforeunload", Z), 
                f.off("editor-set-state", O), f.off("dialog-closed", R), f.off("focus-editor", F), 
                f.off("after-refresh-dialog", U), he.off("track", k.track), he.off("fix", ie), he.off("serviceState", M), 
                he.off("addedSynonym", I), he.off("afterReplace", s), he.dom && (he.dom.off("badCursorPositionRetryFail", m.logger.cursorJump), 
                he.dom.off("badCursorPosition", m.logger.badCursorPosition)), he.off("iframe-mousemove", A), 
                i(!0), t && y.unlisten(_e, t, q), y.unlisten(_e, "grammarly:reset", L), be && y.unlisten(_e.documentElement, "mousemove", C), 
                te.card && (te.card.off("show", T), te.card.off("hide", N), te.card.off("toeditor", P), 
                te.card.off("addtodict", j)));
            }
            function r() {
                d.timers.start(ee + "run"), n("on"), ye(), fe = b.rewriteInnerHTML(ge), he.getText() && he.emit("sending", void 0), 
                $(oe.enabledDefs), ke && W();
            }
            function o(e) {
                var t = e.user, n = e.page, r = le;
                le = n.dialectStrong || n.dialectWeak, i(), ue = t.anonymous, $(n.enabledDefs), 
                r !== le && he.hardReset();
            }
            function i(e) {
                le || de ? de && (le || e) && he.off("finished", x) : (de = !0, he.on("finished", x));
            }
            function s(e) {
                Array.isArray(oe.afterReplaceEvents) && oe.afterReplaceEvents.forEach(function(e) {
                    return y.emit.call(ge, e);
                });
                try {
                    var t = document.createEvent("HTMLEvents");
                    t.initEvent("input", !1, !0), he.el.dispatchEvent(t);
                } catch (t) {}
                return e && e.remove();
            }
            function C(e) {
                he.emit("iframe-mousemove", e);
            }
            function x(e) {
                var t = e.dialect;
                t && "undefined" !== t && (ae(t), le = t, i());
            }
            function S(e) {
                e && he.setState(e), he.api.ws.reconnect();
            }
            function T(e) {
                var t = he.matches.byId(e);
                t && (he.emit("context", void 0), t.editorId = he.id, t.select(), te.card && te.card.setData(t, he.editorType));
            }
            function N() {
                B();
            }
            function P(e) {
                e === he.id && (he.showDialog({
                    caller: "card"
                }), d.timers.start("open_editor"));
            }
            function j(e) {
                e.match && e.match.editorId !== he.id || (ue ? (e.hide(), he.showDialog({
                    caller: "card"
                })) : e.match && e.match.addToDict());
            }
            function I(e) {
                e.editorId = he.id, te.card && te.card.showSynonyms(e);
            }
            function A() {
                te.card && te.card.setOuterIframe(ve);
            }
            function L() {
                console.log("reseting capi session..."), S();
            }
            function M(e) {
                if ("capi" === e.type) return e.available ? void (ke && V()) : W();
            }
            function O(e) {
                e.editorId === he.id && (he.setState(e), Ee && (Ee = !1, Z()));
            }
            function R(e) {
                e === he.id && (B(), he.isHtmlGhost || D());
            }
            function F(e) {
                e === he.id && D();
            }
            function D() {
                he.srcEl && he.srcEl.focus();
            }
            function B() {
                he.selectedMatch && (te.card && te.card.removeLoading(he.selectedMatch.getEl()), 
                he.selectedMatch.deselect());
            }
            function U(e) {
                e.editorId === he.id && S(e);
            }
            function W() {
                ke = !0, he.clearData(), he.api.close(), he.render();
            }
            function G() {
                return ke;
            }
            function V() {
                ke = !1, S();
            }
            function z() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.caller, n = {
                    data: he.getState(),
                    caller: t
                };
                te.dialog && te.dialog.preActivate(), he.emit("show-dialog", void 0), y.emitDomEvent("show-dialog"), 
                f.emitFocusedTab("show-dialog", n);
            }
            function H() {
                var e = ge.ownerDocument.createRange();
                e.selectNodeContents(ge);
                var t = e.cloneContents(), n = document.createElement("div");
                n.appendChild(t);
                for (var r = n.querySelectorAll("img"), o = r.length, i = 0; i < o; i++) r[i].src = r[i].src;
                return n.innerHTML;
            }
            function q() {
                return y.docHidden(_e) ? J() : void Q();
            }
            function K(e) {
                return ke ? [] : e.filter(function(e) {
                    return e.free && !e.hidden;
                });
            }
            function Y(e) {
                return !!y.matchesSelector(e, ".b-card.Synonyms .btn-close") || !y.matchesSelector(e, ".b-card.Synonyms, .b-card.Synonyms *");
            }
            function J() {}
            function Q() {}
            function X() {
                var e = he.getMatches();
                return {
                    critical: e.filter(function(e) {
                        return e.free && e.inDom;
                    }).length,
                    plus: e.filter(function(e) {
                        return !e.free;
                    }).length
                };
            }
            function $(e) {
                he.enabledSynonyms !== e && (he.enabledSynonyms = e, e ? he.synonyms.fieldEnable() : he.synonyms.disable());
            }
            function Z(e) {
                if (!we || e) {
                    we = !0;
                    var t = he.dom;
                    if (t && t.cleanHTML && t.cleanHTML(), n("off"), he.api.ws.emit("cleanup-socket-on-editor-remove"), 
                    he.exit(), console.log("exit"), ge.removeAttribute && _.restrictedAttrs.forEach(ge.removeAttribute.bind(ge)), 
                    be && _.restrictedAttrs.forEach(he.srcEl.removeAttribute.bind(he.srcEl)), fe && fe.parentNode && fe.parentNode.removeChild(fe), 
                    ge.setAttribute("spellcheck", "true"), h.isHtmlGhostSite()) {
                        var r = ge.parentElement && ge.parentElement.parentElement;
                        r && r.removeAttribute("spellcheck");
                    }
                    he.emit("exit", void 0);
                }
            }
            var ee = (e.el || e.srcEl).getAttribute("gramm_id") || p.guid(), te = e.app, ne = e.user, re = e.actions, oe = e.page, ie = re.incFixed, ae = re.changeWeakDialect, se = re.saveFeedbackData, ce = e.editorType.htmlghost, le = oe.dialectStrong || oe.dialectWeak, ue = ne.anonymous, de = void 0, fe = void 0;
            (0, c["default"])(e, {
                capiUrl: _.URLS.capi,
                createWs: t,
                docid: ee,
                textareaWrapSelector: '[gramm_id="' + ee + '"]',
                animatorContainer: e.el.ownerDocument.documentElement,
                getAnimatorElPos: g.getAbsRect,
                dialect: le,
                exposeRawMatch: !0,
                canRemoveSynonym: Y,
                filter: K,
                getContainerId: function() {
                    return f.promiseBackground("get-containerIdOrUndefined").then(function(e) {
                        return e ? e : a["default"].reject(void 0);
                    });
                }
            });
            var pe = p.getBrowser(), me = "extension_" + pe;
            (0, c["default"])(u.capi, {
                CLIENT_NAME: me,
                clientVersion: _.getVersion(),
                extDomain: oe.domain
            }), ce && (e.dom = w.HtmlGhostDom), l.MatchPositions = function() {
                return {
                    generateMatchPositions: p._f
                };
            }, e.matchPrefix = _.nextVerClass;
            var he = l.GrammarlyEditor(e), ge = he.el, be = e.posSourceEl && "IFRAME" === e.posSourceEl.tagName, ve = e.srcEl || ge, _e = ge.ownerDocument, ye = he.run, we = !1, ke = !e.connection.online, Ee = !1, Ce = new E.EmailFeedback(he, ee, se);
            (0, c["default"])(he, {
                id: ee,
                srcEl: ve,
                camouflage: p._f,
                isHtmlGhost: ce,
                run: r,
                errorData: X,
                showDialog: z,
                isOffline: G,
                offline: W,
                online: V,
                updateState: o,
                outerIframe: e.outerIframe,
                cleanupText: p._f,
                activate: p._f,
                toggleBtn: p._f,
                remove: Z,
                reset: S,
                insertGmailFeedback: Ce.insertGmailFeedback.bind(Ce),
                emailFeedbackEnabled: oe.emailFeedbackEnabled,
                editorType: e.editorType.value
            });
            var xe = he.getMatchClass;
            return he.getMatchClass = function(e, t) {
                var n = xe(e, t);
                return n += " gr_inline_cards", n += e.renderedOnce || p.isSafari() ? " gr_disable_anim_appear" : " gr_run_anim", 
                e.renderedOnce = !0, n;
            }, he.dom && (he.dom.changeSelection = p._f), he.current = he.getFiltered, he.started = !1, 
            he.el.setAttribute("data-gramm_editor", "true"), he.getHtml && (he.getHtml = H), 
            he;
        }
        var i = e("babel-runtime/core-js/promise"), a = r(i), s = e("babel-runtime/core-js/object/assign"), c = r(s);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = e("lib/grammarly-editor"), u = e("lib/grammarly-editor/capi"), d = e("../timers"), f = e("../message"), p = e("../util"), m = e("../tracking"), h = (e("../benchmark"), 
        e("lib/ghost/html-ghost-locator")), g = e("../position"), b = e("../client-script/inner-html"), v = e("../window-events"), _ = e("../config"), y = e("../dom"), w = e("../ghost/html-ghost"), k = e("./track"), E = e("./email-feedback");
        n.createEditor = o;
    }, {
        "../benchmark": 187,
        "../client-script/inner-html": 206,
        "../config": 211,
        "../dom": 215,
        "../ghost/html-ghost": 254,
        "../message": 278,
        "../position": 289,
        "../timers": 301,
        "../tracking": 307,
        "../util": 322,
        "../window-events": 323,
        "./email-feedback": 217,
        "./track": 220,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/promise": 31,
        "lib/ghost/html-ghost-locator": 253,
        "lib/grammarly-editor": 258,
        "lib/grammarly-editor/capi": 255
    } ],
    217: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/array/from"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = e("../dom"), d = e("../tracking"), f = "https://grammarly.com/email-feedback", p = "https://s3.amazonaws.com/features-team-extension/email-feedback/email-feedback-signature.png", m = "\n  letter-spacing: 0.5px;\n  color: #1FB8A1;\n  text-decoration: none;\n  font-weight: bold;\n  display: inline-block;\n  font-size: 13px;\n  width: 49.6%;\n  text-align: center;\n  padding: 13px 0 15px;", h = "\n  width: 25px;\n  height: 19px;\n  margin-right: 10px;\n  vertical-align: middle;", g = "\n  width: 335px;\n  letter-spacing: 0.2px;\n  text-align: center;\n  background: #F9FAFF;\n  border-bottom: 1px solid #E4E6F2;\n  border-radius:3px 3px 0 0;\n  font-family: HelveticaNeue-Bold;\n  font-size: 13px;\n  color: #222;\n  line-height: 16px;\n  padding: 14px 0 14px 0;\n  display: inline-block;", b = "feedback-signature", v = function() {
            function e(t, n, r) {
                (0, s["default"])(this, e), this.editor = t, this.id = n, this.saveFeedbackData = r, 
                this._generateFeedbackElement = function(e, t, n) {
                    var r = document.createElement("div"), o = document.createElement("div");
                    o.classList.add(b);
                    var i = '<span style="color: #E4E6F2; margin: 0 6px;"> | </span>', a = "color: #1255CC; text-decoration: none;", s = t + "?docId=" + encodeURIComponent(n), c = function(e, t, n) {
                        var r = t + "&canBeBetter=" + encodeURIComponent(n ? "false" : "true");
                        return '<a style="' + a + '" href="' + r + '">' + e + "</a>";
                    };
                    return o.style.display = "inline-block", o.style.background = "#F3F5F8", o.style.padding = "12px 17px", 
                    o.style.borderRadius = "5px", o.style.border = "1px solid #E2E5EB", o.innerHTML = '<span style="margin-right: 15px;">' + e + "</span> " + c("Yes", s, !0) + " " + i + " " + c("Can be better", s, !1), 
                    r.appendChild(document.createElement("div").appendChild(document.createElement("br"))), 
                    r.appendChild(o), r.appendChild(document.createElement("div").appendChild(document.createElement("br"))), 
                    r;
                }, this._generateFeedbackElementVer2 = function(e, t, n) {
                    var r = document.createElement("div"), o = document.createElement("div");
                    o.classList.add(b);
                    var i = t + "?docId=" + encodeURIComponent(n), a = function(e, t, n) {
                        var r = t + "&canBeBetter=" + encodeURIComponent(n ? "false" : "true"), o = n ? "border-right: 1px solid #E4E6F2;" + m : "" + m;
                        return '<a style="' + o + '" href="' + r + '">' + e + "</a>";
                    };
                    return o.style.display = "inline-block", o.style.borderRadius = "3px 3px 0 0", o.style.border = "1px solid #E2E5EB", 
                    o.innerHTML = '<span style="' + g + '">\n      <img style="' + h + '" src="' + p + '" alt="smp"/>' + e + "</span><br/>\n      " + a("Yes", i, !0) + a("Can be better", i, !1), 
                    r.appendChild(document.createElement("div").appendChild(document.createElement("br"))), 
                    r.appendChild(o), r.appendChild(document.createElement("div").appendChild(document.createElement("br"))), 
                    r;
                };
            }
            return (0, l["default"])(e, [ {
                key: "insertGmailFeedback",
                value: function(e, t) {
                    var n = "Was my message clear?", r = e ? this._generateFeedbackElement(n, f, this.id) : this._generateFeedbackElementVer2(n, f, this.id), o = this.editor.el, a = o.querySelector(".gmail_extra") || o.querySelector(".gmail_quote");
                    null === a ? o.appendChild(r) : o.insertBefore(r, a);
                    var s = new MutationObserver(function(e) {
                        return e.forEach(function(e) {
                            if ("childList" === e.type && e.removedNodes.length > 0) {
                                var t = (0, i["default"])(e.removedNodes).findIndex(function(e) {
                                    return e.classList && e.classList.contains(b);
                                }) > -1;
                                if (t) {
                                    var n = 0 === o.querySelectorAll("." + b).length;
                                    n && (d.call("gnar.track", "askForFeedbackSignature-removed"), s.disconnect());
                                }
                            }
                        });
                    });
                    s.observe(r, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0
                    });
                    var c = new KeyboardEvent("keydown", {
                        bubbles: !0,
                        cancelable: !0,
                        key: " ",
                        shiftKey: !0
                    });
                    o.dispatchEvent(c), this.editor.emailFeedbackEnabled = !1, focus();
                    var l = u.closestEl(o, 'input[name="subjectbox"]') || u.closestEl(o, 'input[placeholder="Subject"]'), p = null !== l ? l.value : "";
                    this.saveFeedbackData(p, this.id), d.call("gnar.track", "askForFeedback-button-click", {
                        textSize: this.editor.getText().length,
                        isFirstShown: t
                    });
                }
            } ]), e;
        }();
        n.EmailFeedback = v;
    }, {
        "../dom": 215,
        "../tracking": 307,
        "babel-runtime/core-js/array/from": 19,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35
    } ],
    218: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e.hasAttribute("contenteditable") && e.querySelector('[data-contents="true"] > [data-editor], [data-block]');
        }
        function o(e) {
            return e.classList.contains("ql-editor") || e.classList.contains("ql-container");
        }
        function i(e) {
            return e.className.indexOf("redactor") > -1;
        }
        function a(e) {
            return e.className.indexOf("scribe") > -1;
        }
        function s(e) {
            return e.className.indexOf("trix") > -1;
        }
        function c(e) {
            if ("IFRAME" !== e.tagName) return !1;
            var t = e;
            return t.id.indexOf("mce") > -1 || t.contentDocument.querySelectorAll("#tinymce, .mce-content-body").length > 0;
        }
        function l(e) {
            return e.className.indexOf("cke") > -1;
        }
        function u(e) {
            return e.hasAttribute("pm-container") || e.classList.contains("ProseMirror");
        }
        function d(e) {
            return e.className.indexOf("medium-editor") > -1;
        }
        function f(e) {
            try {
                return r(e) ? "draftJs" : o(e) ? "quill" : i(e) ? "redactor" : u(e) ? "prosemirror" : a(e) ? "scribe" : s(e) ? "trix" : d(e) ? "medium-editor" : c(e) ? "tinymce" : l(e) ? "ckeditor" : e.hasAttribute("contenteditable") ? "contenteditable" : "TEXTAREA" === e.tagName ? "textarea" : "IFRAME" === e.tagName ? "iframe" : "unknown";
            } catch (t) {
                return;
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.isDraftJsField = r, n.isQuillField = o, n.isRedactorField = i, n.isScribeField = a, 
        n.isTrixField = s, n.isTinyMCEField = c, n.isCKEditorField = l, n.isProseMirrorField = u, 
        n.isMediumEditorField = d, n.getFieldType = f;
    }, {} ],
    219: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            var t, n = e.app, r = e.type, o = e.doc, i = e.field, c = e.connection, u = e.page, d = e.user, p = e.actions, m = e.createSocket;
            return n.elements = n.elements || f.initElements({
                app: n,
                doc: o,
                user: d,
                actions: p,
                page: u
            }), "iframe" === r ? s(n, i, c, u, d, p, m) : a(n, i, (t = {}, (0, l["default"])(t, r, !0), 
            (0, l["default"])(t, "value", r), t), c, u, d, p, m);
        }
        function i(e, t) {
            if (d.setGRAttributes(e, t), e.setAttribute("spellcheck", "false"), p.isHtmlGhostSite()) {
                var n = e.parentElement && e.parentElement.parentElement;
                n && n.setAttribute("spellcheck", "false");
            }
        }
        function a(e, t, n, r, o, a, s, c) {
            function l(t, l) {
                return i(t, l), m.createEditor({
                    id: l,
                    el: t,
                    app: e,
                    connection: r,
                    page: o,
                    user: a,
                    actions: s,
                    editorType: n
                }, c);
            }
            var d = u.guid();
            return "contenteditable" === n.value ? l(t, d) : h.createGhostArea(l, t, d);
        }
        function s(e, t, n, r, o, a, s) {
            var c = u.guid(), l = t.contentDocument, f = l.body;
            return i(t, c), t.setAttribute("gramm-ifr", "true"), d.addIframeCss(l), i(f, c), 
            t.style.height = t.style.height || getComputedStyle(t).height, m.createEditor({
                el: f,
                app: e,
                connection: n,
                page: r,
                user: o,
                actions: a,
                srcEl: t,
                posSourceEl: t,
                editorType: {
                    contenteditable: !0,
                    value: "contenteditable"
                }
            }, s);
        }
        var c = e("babel-runtime/helpers/defineProperty"), l = r(c);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = e("../util"), d = e("../dom"), f = e("../elements"), p = e("lib/ghost/html-ghost-locator"), m = e("./editor"), h = e("../ghost/ghostarea");
        n.createGrammarlyEditor = o;
    }, {
        "../dom": 215,
        "../elements": 226,
        "../ghost/ghostarea": 252,
        "../util": 322,
        "./editor": 216,
        "babel-runtime/helpers/defineProperty": 36,
        "lib/ghost/html-ghost-locator": 253
    } ],
    220: [ function(e, t, n) {
        "use strict";
        function r() {}
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.track = r;
    }, {} ],
    221: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            if (e) {
                if (!e.length) return e;
                if (1 === e.length || !t) return e[0];
                var n = t.pageX || t.clientX, r = t.pageY || t.clientY, o = void 0;
                return e.forEach(function(e) {
                    var t = e.top, i = e.left, a = e.width, s = e.height;
                    r >= t && r <= t + s && n >= i && n <= i + a && (o = e);
                }), o || e[0];
            }
        }
        var i = e("babel-runtime/core-js/object/assign"), a = r(i), s = e("babel-runtime/core-js/symbol"), c = r(s), l = e("babel-runtime/core-js/object/get-prototype-of"), u = r(l), d = e("babel-runtime/helpers/classCallCheck"), f = r(d), p = e("babel-runtime/helpers/createClass"), m = r(p), h = e("babel-runtime/helpers/possibleConstructorReturn"), g = r(h), b = e("babel-runtime/helpers/inherits"), v = r(b);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var _ = e("react"), y = e("react-dom"), w = e("emitter"), k = e("../timers"), E = e("../util"), C = e("../window-events"), x = e("../tracking"), S = e("../position"), T = e("../dom"), N = e("./hint"), P = e("./tooltip"), j = e("../inline-cards"), I = {
            container: "_c4f153-container",
            flip: "_c4f153-flip",
            flipSyn: "_c4f153-flipSyn",
            card: "_c4f153-card",
            bigTitle: "_c4f153-bigTitle",
            unknownWordTitle: "_c4f153-unknownWordTitle",
            btnDictLabelWithIcon: "_c4f153-btnDictLabelWithIcon",
            explanation: "_c4f153-explanation",
            replacement: "_c4f153-replacement",
            maxWidthReached: "_c4f153-maxWidthReached",
            item: "_c4f153-item",
            logoIcon: "_c4f153-logoIcon",
            ignoreIcon: "_c4f153-ignoreIcon",
            undoIcon: "_c4f153-undoIcon",
            dictionaryIcon: "_c4f153-dictionaryIcon",
            wikiIcon: "_c4f153-wikiIcon",
            footer: "_c4f153-footer",
            footerButton: "_c4f153-footerButton",
            btnIgnore: "_c4f153-btnIgnore",
            icon: "_c4f153-icon",
            btnLogo: "_c4f153-btnLogo",
            btnPersonalize: "_c4f153-btnPersonalize",
            personalizeMessage: "_c4f153-personalizeMessage",
            attn: "_c4f153-attn",
            cardAddedToDict: "_c4f153-cardAddedToDict",
            addedToDictTitle: "_c4f153-addedToDictTitle",
            dictionaryDescription: "_c4f153-dictionaryDescription",
            undo: "_c4f153-undo",
            dictLink: "_c4f153-dictLink",
            dictionaryAddedIcon: "_c4f153-dictionaryAddedIcon",
            synTitle: "_c4f153-synTitle",
            synList: "_c4f153-synList",
            synListSingle: "_c4f153-synListSingle",
            synListTitle: "_c4f153-synListTitle",
            synListNumber: "_c4f153-synListNumber",
            synSubitems: "_c4f153-synSubitems",
            synItem: "_c4f153-synItem",
            dict: "_c4f153-dict",
            dictContent: "_c4f153-dictContent",
            dictItemCounter: "_c4f153-dictItemCounter",
            dictItem: "_c4f153-dictItem",
            qualifier: "_c4f153-qualifier",
            dictFooterItem: "_c4f153-dictFooterItem",
            wikiLink: "_c4f153-wikiLink",
            wiki: "_c4f153-wiki",
            gr__tooltip_empty: "gr__tooltip_empty",
            gr__tooltip: "gr__tooltip",
            "gr-notfound-tooltip": "gr-notfound-tooltip",
            "gr__tooltip-content": "gr__tooltip-content",
            "gr__tooltip-logo": "gr__tooltip-logo",
            gr__flipped: "gr__flipped"
        }, A = {}, L = function(e) {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = e.doc, r = void 0 === n ? document : n, o = e.domCls, i = void 0 === o ? "" : o, a = e.user;
                (0, f["default"])(this, t);
                var s = (0, g["default"])(this, (t.__proto__ || (0, u["default"])(t)).call(this));
                s._isAnonymous = !1, s.show = function(e, t) {
                    return s.emit("show", e.id), s.updatePos(e, t), k.timers.start(A.id), x.logger.cardShowAction(), 
                    s;
                }, s.hide = function() {
                    if (A.hint.visible) {
                        A.container.el.style.display = "none", s.setState({
                            animate: !1,
                            visible: !1,
                            match: {}
                        });
                        var e = A.notfound && A.notfound.isEnabled();
                        if (A.notfound.disable(), A.notfound.hide(), s.emit("hide", s.match || void 0), 
                        A.hint.currentEl && s.removeLoading(A.hint.currentEl), k.timers.stop(A.id), s.match) {
                            var t = s.match.syn;
                            t ? x.logger.synonymCardHideAction(e) : x.logger.cardHideAction();
                        }
                        return e && x.logger.synonymCardHideAction(e), s.match = null, A.container.el.style.display = "", 
                        s;
                    }
                }, s.animHide = function() {
                    return s.setState({
                        animate: !0
                    }), T.once.call(A.el, T.whichAnimationEndEvent(), s.hide), s;
                }, s.openEditor = function() {
                    A.hint.currentEl && s.removeLoading(A.hint.currentEl), s.emit("toeditor", s.match ? s.match.editorId : void 0), 
                    s.hide();
                }, s.animateReplacement = function(e, t, n) {
                    s.emit("animateReplacement", {
                        matchId: e,
                        replacement: t,
                        visibleReplacement: n
                    });
                }, s.addToDict = function() {
                    s.setState({
                        addedToDict: !0
                    }), s.emit("addtodict", {
                        match: s.match,
                        hide: s.hide,
                        animHide: s.animHide
                    });
                }, s.inTarget = function(e) {
                    var t = e.target, n = e.clientX, r = e.clientY, o = e.detail, i = A.hint.currentEl, a = (T.parentHasClass(t, A.cls) || T.hasClass(t, A.cls)) && (!i || !T.hasClass(i, "g-selection-anim")), c = s.elementsFromPoint(n, r).some(function(e) {
                        return T.hasClass(e, A.cls);
                    });
                    return !(!c || !A.hint.visible || 1 !== o) || (a ? i && i !== t ? (A.hint.fastHide(), 
                    void s.removeLoading(i)) : (s.addLoading(t), !0) : void (!A.hint.visible && i && s.removeLoading(i)));
                }, s.addLoading = function(e) {
                    return !T.hasClass(e, A.pCls) && T.addClass(e, A.pCls);
                }, s.removeLoading = function(e) {
                    T.hasClass(e, A.pCls) && T.removeClass(e, A.pCls), T.hasClass(e, "g-selection-anim") && e.parentNode && e.parentNode.removeChild(e);
                }, s.showSynonyms = function(e) {
                    return e.animEl && 0 !== e.animEl.getClientRects().length ? (A.hint.currentEl && s.hide(), 
                    A.hint.currentEl = e.animEl, e.synonyms && 0 === e.synonyms.meanings.length ? (A.notfound.enable(), 
                    A.notfound.show({
                        posEl: e.animEl,
                        text: "No synonyms found",
                        outerIframe: A.iframe
                    }), x.logger.synonymCardShowAction(!0)) : (s.setData(e), s.updatePos(e.animEl), 
                    s.setState({
                        visible: !0
                    }), x.logger.synonymCardShowAction(!1)), A.hint.setVisible(!0), k.timers.start(A.id), 
                    s) : s;
                }, s.setOuterIframe = function(e) {
                    var t = e.contentDocument;
                    !e || t && e === A.iframe || (A.iframe = e, A.hint.setDocs(A.doc, t));
                }, s._isAnonymous = a.anonymous, s._userType = a.type;
                var l = (0, c["default"])("GrammarCard"), d = "gr_", p = s.render(l, r), m = y.findDOMNode(p.component), h = new N.HintImpl({
                    doc: r,
                    hint: m,
                    hideDelay: 500,
                    inTarget: s.inTarget,
                    cls: A.cls,
                    delay: 400,
                    onshow: s.show,
                    onhide: s.hide
                }).bind();
                return A = {
                    id: l,
                    notfound: P.createTooltip({
                        cls: T.cs("gr-notfound-tooltip", I.gr__tooltip_empty),
                        enabled: !1,
                        doc: r
                    }),
                    windowEvents: {
                        keydown: s.hide,
                        scroll: s.hide,
                        resize: s.hide
                    },
                    doc: r,
                    domCls: i,
                    cls: d,
                    pCls: "gr-progress",
                    container: p,
                    el: m,
                    hint: h
                }, s.hint = h, C.on(A.windowEvents, null, !0), s;
            }
            return (0, v["default"])(t, e), (0, m["default"])(t, [ {
                key: "updateState",
                value: function(e) {
                    this._isAnonymous = e.anonymous, this._userType = e.type;
                }
            }, {
                key: "elementsFromPoint",
                value: function(e, t) {
                    return e && t ? A.doc.elementsFromPoint ? A.doc.elementsFromPoint(e, t) : [ A.doc.elementFromPoint(e, t) ] : [];
                }
            }, {
                key: "setState",
                value: function(e) {
                    A.container.component.setState(e);
                }
            }, {
                key: "setData",
                value: function(e, t) {
                    return e ? (this.setState({
                        match: e,
                        visible: !0,
                        addedToDict: !1
                    }), this.match = e, this._editorType = t, this) : this;
                }
            }, {
                key: "updatePos",
                value: function(e, t) {
                    if (null == e.parentNode) {
                        if (!e.id) return void this.hide();
                        var n = A.doc.querySelector(".gr_" + e.id);
                        if (!n) return void this.hide();
                        A.hint.currentEl = e = n;
                    }
                    var r = S.getAllAbsRects(e, A.iframe), i = (0, a["default"])(S.posToRect(A.el, o(r, t)), {
                        width: A.el.clientWidth,
                        height: A.el.clientHeight
                    });
                    i.rect.flip && (i.rect.top = i.rect.top + A.el.clientHeight), x.call("gnar.track", "cardOpened", {
                        direction: i.rect.flip ? "top" : "bottom",
                        pixelsToBottom: Math.round(i.height + i.delta.bottom),
                        cardHeight: i.height,
                        ratio: 1 + Math.round(10 * i.delta.bottom / i.height) / 10
                    }), this.setState({
                        pos: i
                    });
                }
            }, {
                key: "render",
                value: function(e, t) {
                    var n = this, r = {
                        isAnonymous: function() {
                            return n._isAnonymous;
                        },
                        getUserType: function() {
                            return n._userType;
                        },
                        getEditorType: function() {
                            return n._editorType;
                        },
                        hide: this.hide,
                        openEditor: this.openEditor,
                        animateReplacement: this.animateReplacement,
                        addToDict: this.addToDict
                    };
                    return T.renderReactWithParent(_.createElement(j.PositionedCard, r), t.documentElement, e, "grammarly-card");
                }
            }, {
                key: "remove",
                value: function() {
                    A.hint.unbind(), C.off(A.windowEvents, null, !0), A.container.remove();
                }
            } ]), t;
        }(E.createClass(w));
        n.Card = L;
    }, {
        "../dom": 215,
        "../inline-cards": 267,
        "../position": 289,
        "../timers": 301,
        "../tracking": 307,
        "../util": 322,
        "../window-events": 323,
        "./hint": 224,
        "./tooltip": 247,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/core-js/symbol": 32,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        emitter: "emitter",
        react: "react",
        "react-dom": "react-dom"
    } ],
    222: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            function t(e, t) {
                var n = W.anonymous === !1 && e.anonymous === !1 && W.premium !== e.premium, r = te !== t.dialectStrong;
                W = e, te = t.dialectStrong, Z && Z.updateUser(e), n && U.refresh(), r && U.send({
                    action: "hard-reset"
                });
            }
            function n(e) {
                var t = "off" === e;
                S.toggleClass(B.body, t, "gr-disable-scroll"), S.toggleClass(B.documentElement, t, "gr-disable-scroll");
            }
            function r() {
                $ && !W.anonymous && f();
            }
            function o(e) {
                return new y.OnboardingDialog({
                    doc: B,
                    user: e,
                    saveAnonymousProps: q
                });
            }
            function i(e, t) {
                return new _.SigninDialog({
                    doc: B,
                    user: e,
                    placement: t
                });
            }
            function a(e) {
                n("off"), ee = o(W), ee.one("hide", function() {
                    n("on"), k.emitFocusedTab("focus-editor", e);
                });
            }
            function s(e, t) {
                n("off"), Z = i(t, e), Z.one("hide", function() {
                    n("on"), k.emitFocusedTab("focus-editor", $.editorId), C.logger.signinClose(E.timers.stop(K));
                }), C.logger.signinOpen(), C.fire("login-attempt", e);
            }
            function c() {
                X = !0, J = B.querySelector(j), J || (J = b.findDOMNode(S.renderReactWithParent(g.createElement(L, null), B.documentElement, w.guid()).component)), 
                Q = J.querySelector(I("back"));
            }
            function l() {
                var e = {
                    "mail.google.com": "Gmail",
                    "facebook.com": "Facebook",
                    "twitter.com": "Twitter"
                }, t = x.getDomain();
                return "Back to " + (t && e[t] || document.title);
            }
            function u(e) {
                e.stopPropagation(), R();
            }
            function d() {
                k.emitFocusedTab("dialog-closed", $.editorId);
            }
            function f() {
                if (Y) {
                    U.el.style.background = "";
                    var e = re;
                    return re = function(t) {
                        re = e, U.refresh(), k.emitFocusedTab("after-refresh-dialog", t);
                    }, void R();
                }
                U.refresh();
            }
            function p(e) {
                k.emitBackground(T.MessageTypes.iframeMode, {
                    iframeMode: e,
                    id: $.socketId
                });
            }
            function m() {
                W.anonymous || U.activate();
            }
            function v(e) {
                var t = e.data, n = e.caller, r = e.isOnboarding, o = e.editorId;
                return E.timers.start(K), $ = t, r ? a(o) : W.anonymous ? s(n, W) : (U.activate(), 
                void N(t));
            }
            function N(e) {
                X || c(), J.style.opacity = "0", S.addClass(J, "gr-_show");
                var t = h.extend({
                    favicon: x.getFavicon(),
                    page: l()
                }, e);
                U.send(t), p(!0), setTimeout(function() {
                    return J.style.opacity = "1";
                }, 100), n("off"), S.listen(B.body, "keydown", D, !1), S.listen(Q, "click", u, !1), 
                S.listen(J, "click", u, !1), Y = !0;
            }
            function A(e) {
                var t = e.action;
                "edit" === t && re(e), "close" === t && R(), "initialized" === t && (O(e), setTimeout(function() {
                    return U.el.style.background = "transparent";
                }, 300)), "socket" === t && k.emitBackground(T.MessageTypes.client, e), "setSettings" === t && z(e.data), 
                "tracking" === t && e.method && C.call(e.method, e.param, e.props), "popup-editor-fix" === t && H(), 
                "open-url" === t && (C.fire("hook-clicked", e.placement), k.emitBackground("open-url", e.url));
            }
            function M(e, t) {
                $ && e.socketId === $.socketId && (t("ok"), e.action = "socket", U.send(e));
            }
            function O(e) {
                var t = "Premium" === e.userType ? "freemium-plus" : "freemium";
                B.documentElement.setAttribute("data-type", t);
            }
            function R() {
                Y && (Y = !1, n("on"), J.style.opacity = "0", S.removeClass(J, "gr-_show"), S.removeClass(J, P), 
                S.unlisten(B.body, "keydown", D, !1), S.unlisten(Q, "click", u, !1), S.unlisten(J, "click", u, !1), 
                U.send({
                    action: "hide"
                }), p(!1), d());
            }
            function F() {
                window === window.top && (k.off("show-dialog", v), k.off("hide-dialog", R), k.off("reset", r), 
                k.off(T.MessageTypes.serverIframe, M)), U.deactivate(), U.off("message", A);
                var e = J && J.parentNode;
                e && e.parentNode && e.parentNode.removeChild(e);
            }
            function D(e) {
                if (w.keyCode(e) === w.ESC_KEY && Y) return e.stopPropagation(), e.preventDefault(), 
                R();
            }
            var B = e.doc, U = e.iframe, W = e.user, G = e.page, V = e.actions, z = V.updateSettings, H = V.incFixed, q = V.saveAnonymousProps, K = "Dialog", Y = !1, J = void 0, Q = void 0, X = void 0, $ = void 0, Z = void 0, ee = void 0, te = G && G.dialectStrong, ne = {
                show: v,
                hide: R,
                updateState: t,
                preActivate: m,
                render: c,
                getSignin: i,
                remove: F,
                refresh: f
            };
            U && U.on("message", A), window === window.top && (k.on("show-dialog", v), k.on("hide-dialog", R), 
            k.on("reset", r), k.on(T.MessageTypes.serverIframe, M));
            var re = function(e) {
                k.emitFocusedTab("editor-set-state", e);
            };
            return ne;
        }
        var i = e("babel-runtime/core-js/object/get-prototype-of"), a = r(i), s = e("babel-runtime/helpers/classCallCheck"), c = r(s), l = e("babel-runtime/helpers/createClass"), u = r(l), d = e("babel-runtime/helpers/possibleConstructorReturn"), f = r(d), p = e("babel-runtime/helpers/inherits"), m = r(p);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var h = e("lodash"), g = e("react"), b = e("react-dom"), v = e("./iframe"), _ = e("./signin-dialog"), y = e("./onboarding-dialog"), w = e("../util"), k = e("../message"), E = e("../timers"), C = e("../tracking"), x = e("../location"), S = e("../dom"), T = e("universal/shared/socket"), N = "gr_-editor", P = "gr-iframe-first-load", j = "." + N, I = function(e) {
            return "." + N + "_" + e;
        }, A = function(e) {
            return N + "_" + e;
        }, L = function(e) {
            function t() {
                return (0, c["default"])(this, t), (0, f["default"])(this, (t.__proto__ || (0, a["default"])(t)).apply(this, arguments));
            }
            return (0, m["default"])(t, e), (0, u["default"])(t, [ {
                key: "render",
                value: function() {
                    var e = N + " " + P;
                    return g.createElement("div", {
                        className: e,
                        style: {
                            display: "none"
                        }
                    }, g.createElement("div", {
                        className: A("back")
                    }), g.createElement(v.IframeComponent, null));
                }
            } ]), t;
        }(g.Component);
        n.DialogComponent = L, n.Dialog = o;
    }, {
        "../dom": 215,
        "../location": 277,
        "../message": 278,
        "../timers": 301,
        "../tracking": 307,
        "../util": 322,
        "./iframe": 225,
        "./onboarding-dialog": 229,
        "./signin-dialog": 238,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        lodash: "lodash",
        react: "react",
        "react-dom": "react-dom",
        "universal/shared/socket": 345
    } ],
    223: [ function(e, t, n) {
        "use strict";
        function r(e) {
            function t(e) {
                i.hasClass(e.target, "fr-reload-tab") && (a.logger.tabReloadClick(), setTimeout(function() {
                    return window.location.reload(!0);
                }, 200));
            }
            var n = e.el, r = e.win, s = e.outerIframe, c = o.createTooltip({
                posEl: n,
                html: "<span class='fr-tooltip-title'>Cannot connect to Grammarly.</span> Please <span class='fr-reload-tab'>reload</span> the browser tab and check your internet connection. <span class='fr-dialog-br'></span>Don't lose your work! Copy any unsaved text before you reload the tab.",
                doc: n.ownerDocument,
                cls: "fr-btn-offline-tooltip",
                outerIframe: s,
                enabled: !1
            });
            i.listen(r, "click", t);
            var l = c.remove;
            return c.remove = function() {
                l(), i.unlisten(r, "click", t);
            }, c;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./tooltip"), i = e("../dom"), a = e("../tracking");
        n.createErrorTooltip = r;
    }, {
        "../dom": 215,
        "../tracking": 307,
        "./tooltip": 247
    } ],
    224: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/assign"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = e("../util"), d = e("../dom"), f = function() {
            function e(t) {
                var n = this;
                (0, s["default"])(this, e), this.hideDelay = 10, this.onshow = function(e, t) {}, 
                this.onhide = u._f, this.onmousemove = function(e, t) {}, this.onInnerMouseMove = function(e) {}, 
                this.inTarget = function(e) {
                    var t = e.target, r = d.parentHasClass(t, n.cls) || d.hasClass(t, n.cls);
                    if (r) return !n.currentEl || n.currentEl === t || void n.fastHide();
                }, this.bind = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : n.doc;
                    return n.doc2 && n.doc2 !== t && n.bind(e, n.doc2), d.listen(t.body, "resize", n.fastHide, e), 
                    d.listen(t, {
                        gramMouse: n.mousemove,
                        mousemove: n.mousemove,
                        scroll: n.fastHide
                    }, u._f, e), d.listen(t, "click", n.click, e, !0), d.listen(n.hint, "mousemove", n.innerMouseMove, e), 
                    n;
                }, this.setDocs = function(e, t) {
                    n.unbind(), (0, i["default"])(n, {
                        doc: e,
                        doc2: t
                    }), n.bind();
                }, this.unbind = function(e) {
                    return n.bind(!0, e);
                }, this.fastHide = function() {
                    n.onhide(), n.cancelTimeout("show"), n.cancelTimeout("hide"), n.visible = !1, n.currentEl = null;
                }, this.innerMouseMove = function(e) {
                    n.onInnerMouseMove(e), e.preventDefault(), e.stopPropagation(), n.cancelTimeout("hide");
                }, this.click = function(e) {
                    return !n.elInHint(e.target) && !n.inTarget(e) && n.fastHide();
                }, this.elInHint = function(e) {
                    return e && (d.inEl(e, n.hint) || e === n.hint);
                }, this.mousemove = function(e) {
                    var t = e.target;
                    if ("IFRAME" !== t.tagName) {
                        if (e.detail && e.detail.id) {
                            var r = document.querySelector("[data-gr-id='" + e.detail.id + "']");
                            r && (t = r, e = {
                                target: t,
                                clientX: e.detail.e.clientX,
                                clientY: e.detail.e.clientY
                            });
                        }
                        if (u.isSafari() && "mousemove" === e.type) {
                            if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) return n.mouseMoveCoordinates = e.x + "-" + e.y;
                            if (n.mouseMoveCoordinates === e.x + "-" + e.y) return;
                        }
                        if (n.elInHint(t)) return n.onmousemove(e, !0), n.cancelTimeout("show"), void n.cancelTimeout("hide");
                        if (!n.inTarget(e)) return n.onmousemove(e, !1), void (n.visible ? n.hide() : n.cancelTimeout("show"));
                        n.onmousemove(e, !0), n.visible || (n.show(e, t), n.cancelTimeout("hide"), n.currentEl = t);
                    }
                }, this.show = function(e, t) {
                    return n.showTimeout ? n : (n.cancelTimeout("hide"), n.showTimeout = setTimeout(function() {
                        n.cancelTimeout("show"), (n.elInHint(t) || n.inTarget(e)) && (n.visible = !0, n.onshow(t, {
                            pageX: e.pageX,
                            pageY: e.pageY,
                            clientX: e.clientX,
                            clientY: e.clientY
                        }));
                    }, n.delay), n);
                }, this.hide = function() {
                    return n.hideTimeout ? n : (n.hideTimeout = setTimeout(function() {
                        n.onhide(), n.visible = !1, n.currentEl = null;
                    }, n.hideDelay), n);
                }, (0, i["default"])(this, t);
            }
            return (0, l["default"])(e, [ {
                key: "cancelTimeout",
                value: function(e) {
                    "show" === e && this.showTimeout ? (clearTimeout(this.showTimeout), this.showTimeout = null) : "hide" === e && this.hideTimeout && (clearTimeout(this.hideTimeout), 
                    this.hideTimeout = null);
                }
            }, {
                key: "setVisible",
                value: function(e) {
                    this.visible = e, this.cancelTimeout("hide");
                }
            } ]), e;
        }();
        n.HintImpl = f;
    }, {
        "../dom": 215,
        "../util": 322,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35
    } ],
    225: [ function(e, t, n) {
        "use strict";
        function r(e) {
            function t(e) {
                y = e;
            }
            function r() {
                function e() {
                    (w || (w = _.querySelector(n.selector), x.el = w, w)) && (u.listen(window.top, "message", g, !1), 
                    s.isEdge() ? w.src || o(t) : w.srcdoc || f(t), u.addClass(w, "gr-freemium-ifr"), 
                    k = !0, x.activated = k);
                }
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s._f;
                k || e();
            }
            function o() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s._f;
                w.setAttribute("src", d.URLS.popupUrl), u.once.call(w, "load", e);
            }
            function f() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s._f, t = window.GR_INLINE_POPUP || "";
                w.setAttribute("srcdoc", t), u.once.call(w, "load", function() {
                    try {
                        window.ACTIVATE_GR_POPUP && window.ACTIVATE_GR_POPUP(w.contentWindow, w.contentDocument, a), 
                        e();
                    } catch (t) {
                        console.error("Cannot activate popup", t), l.logger.popupLoadError(t && t.message, t && t.name);
                    }
                });
            }
            function p() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s._f;
                w ? v() : r(e);
            }
            function m(e, t) {
                return C || t ? void h(e) : E.push(e);
            }
            function h(e) {
                e.grammarly = !0;
                try {
                    w.contentWindow.postMessage(e, "*");
                } catch (t) {
                    console.error("iframe send error", t);
                }
            }
            function g(e) {
                var t = e.data;
                if (t && t.grammarly) {
                    var n = t.action;
                    if ("user" === n) return v();
                    if (C = !0, "initialized" === n && E) {
                        c.timers.stop("open_editor");
                        E.forEach(function(e) {
                            return x.send(e);
                        });
                    }
                    c.timers.stop("open_editor");
                    "accepted" === n && (E = []), x.emit("message", t);
                }
            }
            function b() {
                u.unlisten(window.top, "message", g, !1);
            }
            function v() {
                h({
                    action: "user",
                    user: y
                });
            }
            var _ = e.doc, y = e.user, w = void 0, k = void 0, E = [], C = !1, x = i({
                activate: r,
                refresh: p,
                send: m,
                selector: n.selector,
                baseCls: n.baseCls,
                updateState: t,
                deactivate: b
            });
            return x;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("react"), i = e("emitter"), a = e("dompurify"), s = e("../util"), c = e("../timers"), l = e("../tracking"), u = e("../dom"), d = e("lib/config");
        n.baseCls = "gr_-ifr", n.selector = "." + n.baseCls, n.IframeComponent = function() {
            return o.createElement("iframe", {
                className: n.baseCls + " gr-_dialog-content"
            });
        }, n.iFrame = r;
    }, {
        "../dom": 215,
        "../timers": 301,
        "../tracking": 307,
        "../util": 322,
        dompurify: "dompurify",
        emitter: "emitter",
        "lib/config": 211,
        react: "react"
    } ],
    226: [ function(e, t, n) {
        "use strict";
        function r(e) {
            function t(e) {
                var t = e.user, n = e.page;
                r.iframe && r.iframe.updateState(t), r.dialog && r.dialog.updateState(t, n), r.card && r.card.updateState(t);
            }
            function n() {
                r.iframe && r.iframe.deactivate(), r.dialog && r.dialog.remove(), r.card && r.card.remove(), 
                r.iframe = null, r.dialog = null, r.card = null;
            }
            var r = e.app, c = e.doc, l = void 0 === c ? document : c, u = e.user, d = e.page, f = e.actions, p = r.iframe = o.iFrame({
                doc: l,
                user: u
            });
            return r.dialog = i.Dialog({
                doc: l,
                iframe: p,
                user: u,
                actions: f,
                page: d
            }), r.dialog.render(), r.card = new a.Card({
                doc: l,
                user: u
            }), r.notifications = new s.Notifications({
                doc: l,
                actions: f
            }), {
                clear: n,
                updateState: t
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./iframe"), i = e("./dialog"), a = e("./card"), s = e("./notifications");
        n.initElements = r;
    }, {
        "./card": 221,
        "./dialog": 222,
        "./iframe": 225,
        "./notifications": 228
    } ],
    227: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("react"), h = e("react-dom"), g = e("lib/dom"), b = e("lib/tracking"), v = {
            notification: "_988ad5-notification",
            title: "_988ad5-title",
            reminder: "_988ad5-reminder",
            text: "_988ad5-text",
            disableOnTab: "_988ad5-disableOnTab",
            disable: "_988ad5-disable",
            bold: "_988ad5-bold",
            action: "_988ad5-action",
            secondary: "_988ad5-secondary",
            close: "_988ad5-close"
        }, _ = 3e3, y = 500, w = {
            disable: {
                title: "Grammarly is now turned off on ",
                text: "The extension will remain disabled on this website until you enable it from the toolbar icon."
            },
            disableOnTab: {
                title: "Grammarly is temporarily disabled on ",
                text: "We will be here next time you visit this website. You can enable it from the toolbar icon."
            },
            reminder: {
                title: "Your writing is still not being checked on ",
                text: "Are you communicating at your best? Switch the extension back on and be confident about your writing."
            }
        }, k = function(e) {
            function t() {
                (0, s["default"])(this, t);
                var e = (0, d["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));
                return e.onMouseEnter = function() {
                    clearTimeout(e._hideTimeout);
                }, e.onMouseLeave = function() {
                    e._hideTimeout = setTimeout(e.cancel, y);
                }, e.cancel = function() {
                    e._node ? (e._node.style.opacity = "0", e._node.addEventListener("transitionend", function() {
                        e.props.remove();
                    }, !1)) : e.props.remove();
                }, e.state = {
                    styles: {}
                }, e;
            }
            return (0, p["default"])(t, e), (0, l["default"])(t, [ {
                key: "componentDidMount",
                value: function() {
                    var e = this, t = h.findDOMNode(this.refs.gNotification);
                    t.style.setProperty("transition", "none", "important"), this._requestAnimationFrame = requestAnimationFrame(function() {
                        t.style.setProperty("transition", "opacity 0.35s cubic-bezier(0.255,0.89,0.25,1.135),transform 0.35s cubic-bezier(0.255,0.89,0.25,1.135)", "important"), 
                        requestAnimationFrame(function() {
                            if (t.style.opacity = "1", t.style.transform) {
                                var e = t.style.transform.split("(")[1].split(")")[0].split(","), n = parseInt(e[0], 10), r = parseInt(e[1], 10);
                                t.style.transform = "translate(" + n + "px, " + (r + t.clientHeight) + "px)";
                            }
                        });
                    }), this._node = t, this.setState(function() {
                        return {
                            styles: e.props.styles
                        };
                    }), this._hideTimeout = setTimeout(this.cancel, _);
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    cancelAnimationFrame(this._requestAnimationFrame);
                }
            }, {
                key: "renderButtons",
                value: function() {
                    var e = this;
                    switch (this.props.type) {
                      case "disable":
                        return m.createElement("div", null, m.createElement("button", {
                            className: v.action,
                            onClick: this.cancel
                        }, "Got it"), m.createElement("button", {
                            className: g.cs(v.action, v.secondary),
                            onClick: this.props.enableOnDomain
                        }, "Enable now"));

                      case "disableOnTab":
                        return m.createElement("button", {
                            className: v.action,
                            onClick: this.cancel
                        }, "Got it");

                      case "reminder":
                        return m.createElement("div", null, m.createElement("button", {
                            className: v.action,
                            onClick: this.props.enableOnDomain
                        }, "Enable Grammarly"), m.createElement("button", {
                            className: g.cs(v.action, v.secondary),
                            onClick: function() {
                                b.call("gnar.track", "disableReminderDismiss"), e.cancel();
                            }
                        }, "Keep disabled"));

                      default:
                        return;
                    }
                }
            }, {
                key: "render",
                value: function() {
                    var e = w[this.props.type], t = e.text, n = e.title;
                    return m.createElement("div", {
                        ref: "gNotification",
                        className: g.cs(v.notification, v[this.props.type]),
                        style: this.state.styles,
                        onMouseEnter: this.onMouseEnter,
                        onMouseLeave: this.onMouseLeave
                    }, m.createElement("p", {
                        className: v.title
                    }, n + this.props.domain), m.createElement("p", {
                        className: v.text
                    }, t), this.renderButtons(), m.createElement("button", {
                        className: v.close,
                        onClick: this.cancel
                    }));
                }
            } ]), t;
        }(m.Component);
        n.NotificationComponent = k;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        "lib/tracking": 307,
        react: "react",
        "react-dom": "react-dom"
    } ],
    228: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/defineProperty"), i = r(o), a = e("babel-runtime/core-js/object/assign"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var f = e("react"), p = e("react-dom"), m = e("lib/location"), h = e("lib/dom"), g = e("./components"), b = e("../../tracking"), v = 160, _ = -10, y = 15, w = function() {
            function e(t) {
                var n = this, r = t.doc, o = t.actions;
                (0, l["default"])(this, e), this._getStyles = function() {
                    var e = h.transformProp(n._doc), t = _, r = y - v;
                    return (0, s["default"])({}, (0, i["default"])({}, e, "translate(" + t + "px, " + r + "px)"));
                }, this._windowResize = function() {
                    var e = n._getStyles();
                    n._component.setState(function() {
                        return {
                            styles: e
                        };
                    });
                }, this._doc = r, this.actions = o;
            }
            return (0, d["default"])(e, [ {
                key: "_checkContainer",
                value: function() {
                    this._container || (this._container = this._doc.createElement("g-notifications"), 
                    this._doc.documentElement.appendChild(this._container));
                }
            }, {
                key: "showDisable",
                value: function() {
                    this._show("disable");
                }
            }, {
                key: "showDisableOnTab",
                value: function() {
                    this._show("disableOnTab");
                }
            }, {
                key: "showReminder",
                value: function() {
                    this._show("reminder"), b.call("gnar.track", "disableReminderShown");
                }
            }, {
                key: "_show",
                value: function(e) {
                    this._render(e), this.isActive = !0, h.listen(window, "resize", this._windowResize, !1), 
                    b.logger.notificationShown(e);
                }
            }, {
                key: "hide",
                value: function(e) {
                    this.isActive = !1, this._container && p.unmountComponentAtNode(this._container), 
                    h.unlisten(window, "resize", this._windowResize, !1), void 0 !== e && b.logger.notificationHide(e);
                }
            }, {
                key: "_render",
                value: function(e) {
                    var t = this;
                    this._checkContainer();
                    var n = this._getStyles(), r = m.getDomain(), o = f.createElement(g.NotificationComponent, {
                        enableOnDomain: function() {
                            t.actions.toggleSite(!0, r), t.remove(e), b.fire("checking-toggled", {
                                enabled: !0,
                                placement: "reminder" === e ? "reminder" : "notification"
                            });
                        },
                        styles: n,
                        remove: function() {
                            return t.remove(e);
                        },
                        type: e,
                        domain: r
                    });
                    this._component = p.render(o, this._container);
                }
            }, {
                key: "remove",
                value: function(e) {
                    this.hide(e), this._container && p.unmountComponentAtNode(this._container), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container);
                }
            } ]), e;
        }();
        n.Notifications = w;
    }, {
        "../../tracking": 307,
        "./components": 227,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "lib/dom": 215,
        "lib/location": 277,
        react: "react",
        "react-dom": "react-dom"
    } ],
    229: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("react"), h = e("react-dom"), g = e("lib/util"), b = e("lib/dom"), v = e("./onboarding-dialog"), _ = e("emitter"), y = function(e) {
            function t(e) {
                var n = e.doc, r = e.container, o = e.user, a = e.saveAnonymousProps;
                (0, s["default"])(this, t);
                var c = (0, d["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));
                return c.updateUser = function(e) {
                    c.user = e, c.render();
                }, c.onKey = function(e) {
                    g.keyCode(e) === g.ESC_KEY && c.dialogComponent && c.dialogComponent.onClose();
                }, c.onClose = function() {
                    c.emit("hide"), c.remove();
                }, c.doc = n, c.user = o, c.saveAnonymousProps = a, r && (c.container = r), c.render(), 
                c;
            }
            return (0, p["default"])(t, e), (0, l["default"])(t, [ {
                key: "checkContainer",
                value: function() {
                    this.container || (this.container = this.doc.createElement("onboarding_dialog"), 
                    this.doc.documentElement.appendChild(this.container), b.listen(this.doc.defaultView, "keydown", this.onKey, !1));
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.user;
                    this.checkContainer(), this.dialogComponent = h.render(m.createElement(v.OnboardingDialogComponent, {
                        username: e && e.firstName || "",
                        isAnonymous: !e || e.anonymous,
                        saveAnonymousProps: this.saveAnonymousProps,
                        onClose: this.onClose
                    }), this.container);
                }
            }, {
                key: "remove",
                value: function() {
                    b.unlisten(this.doc.defaultView, "keydown", this.onKey, !1), this.container && h.unmountComponentAtNode(this.container), 
                    this.container.parentNode && this.container.parentNode.removeChild(this.container);
                }
            } ]), t;
        }(g.createClass(_));
        n.OnboardingDialog = y;
    }, {
        "./onboarding-dialog": 230,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        emitter: "emitter",
        "lib/dom": 215,
        "lib/util": 322,
        react: "react",
        "react-dom": "react-dom"
    } ],
    230: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/defineProperty"), i = r(o), a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u), f = e("babel-runtime/helpers/possibleConstructorReturn"), p = r(f), m = e("babel-runtime/helpers/inherits"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("react"), b = e("react-dom"), v = e("lib/util"), _ = e("lib/dom"), y = e("../onboarding"), w = e("lib/tracking"), k = {
            onboardingDialog: "_9375ba-onboardingDialog",
            viewContainer: "_9375ba-viewContainer",
            view: "_9375ba-view",
            windows: "_9375ba-windows",
            footer: "_9375ba-footer",
            hide: "_9375ba-hide",
            content: "_9375ba-content",
            btnClose: "_9375ba-btnClose"
        }, E = function(e) {
            function t() {
                (0, l["default"])(this, t);
                var e = (0, p["default"])(this, (t.__proto__ || (0, s["default"])(t)).apply(this, arguments));
                return e.state = {
                    hide: !1
                }, e.onClose = function(t) {
                    t && t.stopPropagation(), e.setState({
                        hide: !0
                    });
                    var n = b.findDOMNode(e.refs["onboarding-dialog-el"]), r = e.refs.onboarding;
                    void 0 !== r && r.state.stepIndex === r.steps.length - 1 && w.fire("onboardingTutorialLetsWrite-button-click"), 
                    n && n.addEventListener("animationend", function() {
                        return e.props.onClose();
                    });
                }, e;
            }
            return (0, h["default"])(t, e), (0, d["default"])(t, [ {
                key: "render",
                value: function() {
                    var e, t = _.cs((e = {}, (0, i["default"])(e, k.onboardingDialog, !0), (0, i["default"])(e, k.hide, this.state.hide), 
                    (0, i["default"])(e, k.windows, v.isWindows()), e));
                    return g.createElement("div", {
                        ref: "onboarding-dialog-el",
                        className: t
                    }, g.createElement("div", {
                        className: k.content
                    }, g.createElement("div", {
                        className: k.viewContainer
                    }, g.createElement(y.Onboarding, {
                        ref: "onboarding",
                        isAnonymous: this.props.isAnonymous,
                        onClose: this.onClose,
                        saveAnonymousProps: this.props.saveAnonymousProps
                    }))), g.createElement("div", {
                        className: k.btnClose,
                        onClick: this.onClose
                    }));
                }
            } ]), t;
        }(g.Component);
        n.OnboardingDialogComponent = E;
    }, {
        "../onboarding": 232,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        "lib/tracking": 307,
        "lib/util": 322,
        react: "react",
        "react-dom": "react-dom"
    } ],
    231: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("react"), o = {
            start: "_2333f7-start",
            info: "_2333f7-info",
            finish: "_2333f7-finish",
            startVideo: "_2333f7-startVideo",
            infoVideo: "_2333f7-infoVideo",
            finishVideo: "_2333f7-finishVideo",
            step: "_2333f7-step",
            content: "_2333f7-content",
            title: "_2333f7-title",
            text: "_2333f7-text",
            button: "_2333f7-button",
            inactive: "_2333f7-inactive",
            link: "_2333f7-link",
            personalize: "_2333f7-personalize",
            registration: "_2333f7-registration",
            progress: "_2333f7-progress",
            bar: "_2333f7-bar",
            progressValue: "_2333f7-progressValue",
            barValue: "_2333f7-barValue",
            grid: "_2333f7-grid",
            item: "_2333f7-item",
            name: "_2333f7-name",
            description: "_2333f7-description",
            footer: "_2333f7-footer",
            skipSettings: "_2333f7-skipSettings",
            slider: "_2333f7-slider",
            sliderItem: "_2333f7-sliderItem",
            sliderActive: "_2333f7-sliderActive",
            placeholder: "_2333f7-placeholder"
        };
        n.FinishStep = function(e) {
            var t = e.onClose;
            return r.createElement("div", {
                className: o.step
            }, r.createElement("div", {
                className: o.content
            }, r.createElement("div", {
                className: o.title
            }, "You’re fully protected!"), r.createElement("div", {
                className: o.text
            }, "Now, whenever you see the green Grammarly logo, it means that Grammarly has not found any mistakes. Happy writing!"), r.createElement("button", {
                className: o.button,
                onClick: function() {
                    return t();
                }
            }, "let's write")));
        };
    }, {
        react: "react"
    } ],
    232: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("react"), h = e("./start"), g = e("./info"), b = e("./finish"), v = e("./personalize"), _ = e("./registration"), y = e("lib/tracking"), w = e("lib/dom"), k = {
            start: "_2333f7-start",
            info: "_2333f7-info",
            finish: "_2333f7-finish",
            startVideo: "_2333f7-startVideo",
            infoVideo: "_2333f7-infoVideo",
            finishVideo: "_2333f7-finishVideo",
            step: "_2333f7-step",
            content: "_2333f7-content",
            title: "_2333f7-title",
            text: "_2333f7-text",
            button: "_2333f7-button",
            inactive: "_2333f7-inactive",
            link: "_2333f7-link",
            personalize: "_2333f7-personalize",
            registration: "_2333f7-registration",
            progress: "_2333f7-progress",
            bar: "_2333f7-bar",
            progressValue: "_2333f7-progressValue",
            barValue: "_2333f7-barValue",
            grid: "_2333f7-grid",
            item: "_2333f7-item",
            name: "_2333f7-name",
            description: "_2333f7-description",
            footer: "_2333f7-footer",
            skipSettings: "_2333f7-skipSettings",
            slider: "_2333f7-slider",
            sliderItem: "_2333f7-sliderItem",
            sliderActive: "_2333f7-sliderActive",
            placeholder: "_2333f7-placeholder"
        }, E = function(e) {
            function t() {
                (0, s["default"])(this, t);
                var e = (0, d["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));
                return e.transforms = [ "0", "18px", "36px", "36px", "54px" ], e.classes = [ "start", "info", "personolize", "registration", "finish" ], 
                e.nextStep = function() {
                    e.setState({
                        stepIndex: e.state.stepIndex + 1
                    });
                }, e.lastStep = function() {
                    e.setState({
                        stepIndex: e.steps.length - 1
                    });
                }, e.videoLoaded = function() {
                    clearTimeout(e.placeholderTimeout), y.logger.onboardingVideoLoaded();
                }, e.state = {
                    stepIndex: 0,
                    placeholder: !1
                }, e;
            }
            return (0, p["default"])(t, e), (0, l["default"])(t, [ {
                key: "componentWillMount",
                value: function() {
                    var e = this;
                    this.steps = [ m.createElement(h.StartStep, {
                        nextStep: this.nextStep
                    }), m.createElement(g.InfoStep, {
                        nextStep: this.nextStep,
                        lastStep: this.lastStep
                    }), m.createElement(v.PersonalizeStep, {
                        nextStep: this.props.isAnonymous ? this.nextStep : this.lastStep,
                        lastStep: this.lastStep,
                        saveAnonymousProps: this.props.saveAnonymousProps
                    }), m.createElement(_.RegistrationStep, {
                        nextStep: this.nextStep,
                        lastStep: this.lastStep
                    }), m.createElement(b.FinishStep, {
                        nextStep: this.nextStep,
                        onClose: this.props.onClose
                    }) ], this.placeholderTimeout = setTimeout(function() {
                        e.setState({
                            stepIndex: e.state.stepIndex,
                            placeholder: !0
                        });
                    }, 1500);
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    clearTimeout(this.placeholderTimeout);
                }
            }, {
                key: "componentDidMount",
                value: function() {
                    y.fire("onboardingTutorial-popup-show");
                }
            }, {
                key: "render",
                value: function() {
                    var e = {
                        transform: "translateX(" + this.transforms[this.state.stepIndex] + ")"
                    }, t = w.cs(k[this.classes[this.state.stepIndex]], this.state.placeholder && k.placeholder);
                    return m.createElement("div", {
                        className: t
                    }, m.createElement("video", {
                        className: k.startVideo,
                        autoPlay: !0,
                        loop: !0,
                        preload: "auto",
                        onLoadedData: this.videoLoaded
                    }, m.createElement("source", {
                        src: "https://s3.amazonaws.com/features-team-extension/onboarding/1cards.mp4",
                        type: "video/mp4"
                    })), m.createElement("video", {
                        className: k.infoVideo,
                        autoPlay: !0,
                        loop: !0,
                        preload: "auto"
                    }, m.createElement("source", {
                        src: "https://s3.amazonaws.com/features-team-extension/onboarding/2personalization.mp4",
                        type: "video/mp4"
                    })), m.createElement("video", {
                        className: k.finishVideo,
                        autoPlay: !0,
                        loop: !0,
                        preload: "auto"
                    }, m.createElement("source", {
                        src: "https://s3.amazonaws.com/features-team-extension/onboarding/3gbutton.mp4",
                        type: "video/mp4"
                    })), this.steps[this.state.stepIndex] || null, m.createElement("div", {
                        className: k.slider
                    }, m.createElement("div", {
                        className: k.sliderActive,
                        style: e
                    }), m.createElement("div", {
                        className: k.sliderItem
                    }), m.createElement("div", {
                        className: k.sliderItem
                    }), m.createElement("div", {
                        className: k.sliderItem
                    }), m.createElement("div", {
                        className: k.sliderItem
                    })));
                }
            } ]), t;
        }(m.Component);
        n.Onboarding = E;
    }, {
        "./finish": 231,
        "./info": 233,
        "./personalize": 234,
        "./registration": 235,
        "./start": 237,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        "lib/tracking": 307,
        react: "react"
    } ],
    233: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("react"), o = {
            start: "_2333f7-start",
            info: "_2333f7-info",
            finish: "_2333f7-finish",
            startVideo: "_2333f7-startVideo",
            infoVideo: "_2333f7-infoVideo",
            finishVideo: "_2333f7-finishVideo",
            step: "_2333f7-step",
            content: "_2333f7-content",
            title: "_2333f7-title",
            text: "_2333f7-text",
            button: "_2333f7-button",
            inactive: "_2333f7-inactive",
            link: "_2333f7-link",
            personalize: "_2333f7-personalize",
            registration: "_2333f7-registration",
            progress: "_2333f7-progress",
            bar: "_2333f7-bar",
            progressValue: "_2333f7-progressValue",
            barValue: "_2333f7-barValue",
            grid: "_2333f7-grid",
            item: "_2333f7-item",
            name: "_2333f7-name",
            description: "_2333f7-description",
            footer: "_2333f7-footer",
            skipSettings: "_2333f7-skipSettings",
            slider: "_2333f7-slider",
            sliderItem: "_2333f7-sliderItem",
            sliderActive: "_2333f7-sliderActive",
            placeholder: "_2333f7-placeholder"
        }, i = e("lib/tracking");
        n.InfoStep = function(e) {
            var t = e.nextStep, n = e.lastStep;
            return r.createElement("div", {
                className: o.step
            }, r.createElement("div", {
                className: o.content
            }, r.createElement("div", {
                className: o.title
            }, "Personalize Grammarly ", r.createElement("br", null), " for More Relevant Checking"), r.createElement("div", {
                className: o.text
            }, "Write more effectively by letting Grammarly", r.createElement("br", null), " know a little bit about your preferences."), r.createElement("button", {
                className: o.button,
                onClick: function() {
                    t(), i.fire("onboardingTutorialPersonalize-button-click");
                }
            }, "personalize"), r.createElement("button", {
                className: o.link,
                onClick: function() {
                    return n();
                }
            }, "skip")));
        };
    }, {
        "lib/tracking": 307,
        react: "react"
    } ],
    234: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/keys"), i = r(o), a = e("babel-runtime/helpers/defineProperty"), s = r(a), c = e("babel-runtime/core-js/object/assign"), l = r(c), u = e("babel-runtime/core-js/object/get-prototype-of"), d = r(u), f = e("babel-runtime/helpers/classCallCheck"), p = r(f), m = e("babel-runtime/helpers/createClass"), h = r(m), g = e("babel-runtime/helpers/possibleConstructorReturn"), b = r(g), v = e("babel-runtime/helpers/inherits"), _ = r(v);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var y = e("react"), w = e("./select"), k = e("lib/dom"), E = e("lib/tracking"), C = e("lib/util"), x = {
            start: "_2333f7-start",
            info: "_2333f7-info",
            finish: "_2333f7-finish",
            startVideo: "_2333f7-startVideo",
            infoVideo: "_2333f7-infoVideo",
            finishVideo: "_2333f7-finishVideo",
            step: "_2333f7-step",
            content: "_2333f7-content",
            title: "_2333f7-title",
            text: "_2333f7-text",
            button: "_2333f7-button",
            inactive: "_2333f7-inactive",
            link: "_2333f7-link",
            personalize: "_2333f7-personalize",
            registration: "_2333f7-registration",
            progress: "_2333f7-progress",
            bar: "_2333f7-bar",
            progressValue: "_2333f7-progressValue",
            barValue: "_2333f7-barValue",
            grid: "_2333f7-grid",
            item: "_2333f7-item",
            name: "_2333f7-name",
            description: "_2333f7-description",
            footer: "_2333f7-footer",
            skipSettings: "_2333f7-skipSettings",
            slider: "_2333f7-slider",
            sliderItem: "_2333f7-sliderItem",
            sliderActive: "_2333f7-sliderActive",
            placeholder: "_2333f7-placeholder"
        }, S = [ {
            val: "work",
            title: "WORK"
        }, {
            val: "school",
            title: "SCHOOL"
        }, {
            val: "otherProjects",
            title: "OTHER PROJECTS"
        } ], T = [ {
            val: "american",
            title: "AMERICAN ENGLISH"
        }, {
            val: "british",
            title: "BRITISH ENGLISH"
        } ], N = [ {
            val: "english",
            title: "ENGLISH"
        }, {
            val: "notEnglish",
            title: "NOT ENGLISH"
        } ], P = [ {
            val: "beginner",
            title: "BEGINNER"
        }, {
            val: "intermediate",
            title: "INTERMEDIATE"
        }, {
            val: "advanced",
            title: "ADVANCED"
        } ], j = function(e) {
            function t() {
                (0, p["default"])(this, t);
                var e = (0, b["default"])(this, (t.__proto__ || (0, d["default"])(t)).call(this));
                return e.change = function(t, n) {
                    e.setState({
                        isSaveActive: !0,
                        values: (0, l["default"])(e.state.values, (0, s["default"])({}, t, n))
                    });
                }, e.onSaveClick = function() {
                    var t = e.state, n = t.isSaveActive, r = t.values;
                    if (n !== !1) {
                        var o = (0, i["default"])(r).reduce(function(e, t) {
                            return r[t] !== w.DEFAULT_SELECT_VALUE && (e[t] = r[t]), e;
                        }, {});
                        e.props.saveAnonymousProps(o), e.props.nextStep(), E.fire("onboardingTutorialSave-button-click"), 
                        E.fire("login-attempt", "onboarding_personalization");
                    }
                }, e.state = {
                    values: {
                        writingType: w.DEFAULT_SELECT_VALUE,
                        dialectStrong: w.DEFAULT_SELECT_VALUE,
                        primaryLanguage: w.DEFAULT_SELECT_VALUE,
                        grammarSkills: w.DEFAULT_SELECT_VALUE
                    },
                    isSaveActive: !1
                }, e;
            }
            return (0, _["default"])(t, e), (0, h["default"])(t, [ {
                key: "componentDidMount",
                value: function() {
                    C.isEdge() === !0 && this.props.nextStep();
                }
            }, {
                key: "getProgressInPercents",
                value: function() {
                    var e = this, t = (0, i["default"])(this.state.values), n = t.filter(function(t) {
                        return e.state.values[t] !== w.DEFAULT_SELECT_VALUE;
                    }).length;
                    return Math.round(n / t.length * 100);
                }
            }, {
                key: "render",
                value: function() {
                    var e = this, t = this.getProgressInPercents(), n = {
                        transform: "scaleX(" + t / 100 + ")"
                    };
                    return y.createElement("div", {
                        className: k.cs(x.step, x.personalize)
                    }, y.createElement("div", {
                        className: x.content
                    }, y.createElement("div", {
                        className: x.title
                    }, "Personalize"), y.createElement("div", {
                        className: x.progress
                    }, "Your preferences are ", y.createElement("span", {
                        className: x.progressValue
                    }, t, "%"), " custom", y.createElement("div", {
                        className: x.bar
                    }, y.createElement("div", {
                        className: x.barValue,
                        style: n
                    }))), y.createElement("div", {
                        className: x.grid
                    }, y.createElement("div", {
                        "data-name": "writingType",
                        className: x.item
                    }, y.createElement("div", {
                        className: x.name
                    }, "Most of my writing is for"), y.createElement(w.Select, {
                        id: "writingType",
                        options: S,
                        value: this.state.values.writingType,
                        onChange: this.change
                    }), y.createElement("div", {
                        className: x.description
                    }, "Our algorithms will show corrections relevant to your writing style")), y.createElement("div", {
                        "data-name": "dialectStrong",
                        className: x.item
                    }, y.createElement("div", {
                        className: x.name
                    }, "I prefer to write in"), y.createElement(w.Select, {
                        id: "dialectStrong",
                        options: T,
                        value: this.state.values.dialectStrong,
                        onChange: this.change
                    }), y.createElement("div", {
                        className: x.description
                    }, "Select which dialectical conventions we should follow")), y.createElement("div", {
                        "data-name": "primaryLanguage",
                        className: x.item
                    }, y.createElement("div", {
                        className: x.name
                    }, "My primary language is"), y.createElement(w.Select, {
                        id: "primaryLanguage",
                        options: N,
                        value: this.state.values.primaryLanguage,
                        onChange: this.change
                    }), y.createElement("div", {
                        className: x.description
                    }, "This setting helps us understand your needs better")), y.createElement("div", {
                        "data-name": "grammarSkills",
                        className: x.item
                    }, y.createElement("div", {
                        className: x.name
                    }, "My grammar skills are"), y.createElement(w.Select, {
                        id: "grammarSkills",
                        options: P,
                        value: this.state.values.grammarSkills,
                        onChange: this.change
                    }), y.createElement("div", {
                        className: x.description
                    }, "Our algorithms will show corrections relevant to your writing level")))), y.createElement("footer", {
                        className: x.footer
                    }, y.createElement("button", {
                        className: k.cs(x.button, !this.state.isSaveActive && x.inactive),
                        onClick: function() {
                            return e.onSaveClick();
                        }
                    }, "save"), y.createElement("button", {
                        className: x.link,
                        onClick: function() {
                            return e.props.lastStep();
                        }
                    }, "later")));
                }
            } ]), t;
        }(y.Component);
        n.PersonalizeStep = j;
    }, {
        "./select": 236,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        "lib/tracking": 307,
        "lib/util": 322,
        react: "react"
    } ],
    235: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("react"), h = e("../signin/form"), g = e("lib/dom"), b = {
            start: "_2333f7-start",
            info: "_2333f7-info",
            finish: "_2333f7-finish",
            startVideo: "_2333f7-startVideo",
            infoVideo: "_2333f7-infoVideo",
            finishVideo: "_2333f7-finishVideo",
            step: "_2333f7-step",
            content: "_2333f7-content",
            title: "_2333f7-title",
            text: "_2333f7-text",
            button: "_2333f7-button",
            inactive: "_2333f7-inactive",
            link: "_2333f7-link",
            personalize: "_2333f7-personalize",
            registration: "_2333f7-registration",
            progress: "_2333f7-progress",
            bar: "_2333f7-bar",
            progressValue: "_2333f7-progressValue",
            barValue: "_2333f7-barValue",
            grid: "_2333f7-grid",
            item: "_2333f7-item",
            name: "_2333f7-name",
            description: "_2333f7-description",
            footer: "_2333f7-footer",
            skipSettings: "_2333f7-skipSettings",
            slider: "_2333f7-slider",
            sliderItem: "_2333f7-sliderItem",
            sliderActive: "_2333f7-sliderActive",
            placeholder: "_2333f7-placeholder"
        }, v = function(e) {
            function t() {
                return (0, s["default"])(this, t), (0, d["default"])(this, (t.__proto__ || (0, i["default"])(t)).apply(this, arguments));
            }
            return (0, p["default"])(t, e), (0, l["default"])(t, [ {
                key: "render",
                value: function() {
                    var e = this;
                    return m.createElement("div", {
                        className: g.cs(b.step, b.registration)
                    }, m.createElement(h.Form, {
                        ref: "login",
                        showOnboardingVersion: !0,
                        username: "",
                        placement: "onboarding_personalization",
                        onSuccess: function() {
                            return e.props.lastStep();
                        }
                    }), m.createElement("button", {
                        className: g.cs(b.link, b.skipSettings),
                        onClick: function() {
                            return e.props.lastStep();
                        }
                    }, "Don’t save my settings"));
                }
            } ]), t;
        }(m.Component);
        n.RegistrationStep = v;
    }, {
        "../signin/form": 243,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        react: "react"
    } ],
    236: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("react"), o = {
            selectWrap: "_ca9ab0-selectWrap"
        };
        n.DEFAULT_SELECT_VALUE = "", n.Select = function(e) {
            var t = e.id, i = e.value, a = e.options, s = e.onChange;
            return r.createElement("div", {
                className: o.selectWrap
            }, r.createElement("select", {
                onChange: function(e) {
                    var n = e.target;
                    return s(t, n.value);
                },
                value: i,
                style: {
                    color: i === n.DEFAULT_SELECT_VALUE ? "#9399A7" : "#00B281"
                }
            }, i === n.DEFAULT_SELECT_VALUE && r.createElement("option", {
                key: t + "_default}",
                value: n.DEFAULT_SELECT_VALUE
            }, "SELECT"), a.map(function(e) {
                var n = e.val, o = e.title;
                return r.createElement("option", {
                    key: t + "_" + n,
                    value: n
                }, o);
            })));
        };
    }, {
        react: "react"
    } ],
    237: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("react"), o = {
            start: "_2333f7-start",
            info: "_2333f7-info",
            finish: "_2333f7-finish",
            startVideo: "_2333f7-startVideo",
            infoVideo: "_2333f7-infoVideo",
            finishVideo: "_2333f7-finishVideo",
            step: "_2333f7-step",
            content: "_2333f7-content",
            title: "_2333f7-title",
            text: "_2333f7-text",
            button: "_2333f7-button",
            inactive: "_2333f7-inactive",
            link: "_2333f7-link",
            personalize: "_2333f7-personalize",
            registration: "_2333f7-registration",
            progress: "_2333f7-progress",
            bar: "_2333f7-bar",
            progressValue: "_2333f7-progressValue",
            barValue: "_2333f7-barValue",
            grid: "_2333f7-grid",
            item: "_2333f7-item",
            name: "_2333f7-name",
            description: "_2333f7-description",
            footer: "_2333f7-footer",
            skipSettings: "_2333f7-skipSettings",
            slider: "_2333f7-slider",
            sliderItem: "_2333f7-sliderItem",
            sliderActive: "_2333f7-sliderActive",
            placeholder: "_2333f7-placeholder"
        }, i = e("lib/tracking");
        n.StartStep = function(e) {
            var t = e.nextStep;
            return r.createElement("div", {
                className: o.step
            }, r.createElement("div", {
                className: o.content
            }, r.createElement("div", {
                className: o.title
            }, "Defeat Tricky Mistakes", r.createElement("br", null), " With One Click"), r.createElement("div", {
                className: o.text
            }, "Simply hover your mouse over underlined words and click once on your preferred correction."), r.createElement("button", {
                className: o.button,
                onClick: function() {
                    t(), i.fire("onboardingTutorialNext-button-click");
                }
            }, "next")));
        };
    }, {
        "lib/tracking": 307,
        react: "react"
    } ],
    238: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("react"), h = e("react-dom"), g = e("lib/util"), b = e("lib/dom"), v = e("./signin-dialog"), _ = e("emitter"), y = function(e) {
            function t(e) {
                var n = e.doc, r = e.container, o = e.user, a = e.placement;
                (0, s["default"])(this, t);
                var c = (0, d["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));
                return c.updateUser = function(e) {
                    c.user = e, c.render();
                }, c.onKey = function(e) {
                    c.dialogComponent && c.dialogComponent.refs && c.dialogComponent.refs.form.onKey(e);
                }, c.onClose = function() {
                    c.emit("hide"), c.remove();
                }, c.doc = n, c.user = o, c.placement = a, r && (c.container = r), c.render(), c;
            }
            return (0, p["default"])(t, e), (0, l["default"])(t, [ {
                key: "checkContainer",
                value: function() {
                    this.container || (this.container = this.doc.createElement("signin_dialog"), this.doc.documentElement.appendChild(this.container), 
                    b.listen(this.doc.defaultView, "keydown", this.onKey, !1));
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.user;
                    this.checkContainer(), this.dialogComponent = h.render(m.createElement(v.SigninDialogComponent, {
                        username: e && e.firstName || "",
                        onClose: this.onClose,
                        placement: this.placement
                    }), this.container);
                }
            }, {
                key: "remove",
                value: function() {
                    b.unlisten(this.doc.defaultView, "keydown", this.onKey, !1), this.container && h.unmountComponentAtNode(this.container), 
                    this.container.parentNode && this.container.parentNode.removeChild(this.container);
                }
            } ]), t;
        }(g.createClass(_));
        n.SigninDialog = y;
    }, {
        "./signin-dialog": 239,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        emitter: "emitter",
        "lib/dom": 215,
        "lib/util": 322,
        react: "react",
        "react-dom": "react-dom"
    } ],
    239: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("react"), h = e("react-dom"), g = e("lib/util"), b = e("lib/dom"), v = e("../signin/form"), _ = {
            signinDialog: "_4c65eb-signinDialog",
            viewContainer: "_4c65eb-viewContainer",
            view: "_4c65eb-view",
            windows: "_4c65eb-windows",
            footer: "_4c65eb-footer",
            content: "_4c65eb-content",
            btnClose: "_4c65eb-btnClose"
        }, y = function(e) {
            function t() {
                (0, s["default"])(this, t);
                var e = (0, d["default"])(this, (t.__proto__ || (0, i["default"])(t)).apply(this, arguments));
                return e.onClick = function(t) {
                    b.matchesSelector(t.target, "." + _.content + ", ." + _.content + " *") || e.onClose(t);
                }, e.onClose = function(t) {
                    t && t.stopPropagation();
                    var n = h.findDOMNode(e.refs["signin-dialog-el"]), r = h.findDOMNode(e.refs["signin-content"]);
                    r && n && (r.style.opacity = "0", n.style.opacity = "0"), e._closeTimeout = setTimeout(function() {
                        return e.props.onClose();
                    }, 500);
                }, e;
            }
            return (0, p["default"])(t, e), (0, l["default"])(t, [ {
                key: "componentDidMount",
                value: function() {
                    var e = h.findDOMNode(this.refs["signin-dialog-el"]), t = h.findDOMNode(this.refs["signin-content"]);
                    this._requestAnimationFrame = requestAnimationFrame(function() {
                        t.style.opacity = "0", e.style.opacity = "0", requestAnimationFrame(function() {
                            e.style.opacity = "1", t.style.opacity = "1";
                        });
                    });
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    clearTimeout(this._closeTimeout), cancelAnimationFrame(this._requestAnimationFrame);
                }
            }, {
                key: "render",
                value: function() {
                    var e = b.cs(_.signinDialog, g.isWindows() && _.windows), t = {
                        opacity: 0
                    }, n = {
                        opacity: 0
                    };
                    return m.createElement("div", {
                        ref: "signin-dialog-el",
                        onClick: this.onClick,
                        className: e,
                        style: t
                    }, m.createElement("div", {
                        ref: "signin-content",
                        className: _.content,
                        style: n
                    }, m.createElement("div", {
                        className: _.viewContainer
                    }, m.createElement(v.Form, {
                        ref: "form",
                        placement: this.props.placement,
                        username: this.props.username,
                        onClose: this.onClose
                    }))), m.createElement("div", {
                        className: _.btnClose,
                        onClick: this.onClose
                    }));
                }
            } ]), t;
        }(m.Component);
        n.SigninDialogComponent = y;
    }, {
        "../signin/form": 243,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        "lib/util": 322,
        react: "react",
        "react-dom": "react-dom"
    } ],
    240: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/defineProperty"), i = r(o), a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u), f = e("babel-runtime/helpers/possibleConstructorReturn"), p = r(f), m = e("babel-runtime/helpers/inherits"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("react"), b = e("lib/dom"), v = {
            buttonContainer: "_9a2bae-buttonContainer",
            buttonSpinner: "_9a2bae-buttonSpinner",
            button: "_9a2bae-button",
            loading: "_9a2bae-loading",
            onboarding: "_9a2bae-onboarding",
            disable: "_9a2bae-disable"
        }, _ = 290, y = function(e) {
            var t = e.className;
            return g.createElement("div", {
                className: "gr_-spinner " + t
            }, g.createElement("div", {
                className: "gr_-bounce1"
            }), g.createElement("div", {
                className: "gr_-bounce2"
            }), g.createElement("div", {
                className: "gr_-bounce3"
            }));
        }, w = function(e) {
            function t() {
                (0, l["default"])(this, t);
                var e = (0, p["default"])(this, (t.__proto__ || (0, s["default"])(t)).apply(this, arguments));
                return e.onClick = function(t) {
                    t.preventDefault(), e.props.loading || e.props.onClick(t);
                }, e;
            }
            return (0, h["default"])(t, e), (0, d["default"])(t, [ {
                key: "render",
                value: function() {
                    var e, t = this.props, n = t.loading, r = t.cls, o = n ? "" : this.props.text, a = this.props.styles || {
                        width: _
                    }, s = b.cs((e = {}, (0, i["default"])(e, v.buttonContainer, !0), (0, i["default"])(e, v[r], void 0 !== r), 
                    (0, i["default"])(e, v.loading, n), e));
                    return g.createElement("div", {
                        className: s,
                        style: a
                    }, n && g.createElement(y, {
                        className: v.buttonSpinner
                    }), g.createElement("button", {
                        type: "button",
                        style: a,
                        className: v.button,
                        onClick: this.onClick
                    }, o));
                }
            } ]), t;
        }(g.Component);
        n.Button = w;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        react: "react"
    } ],
    241: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/extends"), i = r(o), a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u), f = e("babel-runtime/helpers/possibleConstructorReturn"), p = r(f), m = e("babel-runtime/helpers/inherits"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("react"), b = e("./input"), v = {
            inputs: "_194465-inputs",
            hidden: "_194465-hidden"
        }, _ = [ {
            label: "Name",
            name: "name",
            type: "text"
        }, {
            label: "Email",
            name: "email",
            type: "text"
        }, {
            label: "Password",
            name: "password",
            type: "password"
        } ], y = function(e) {
            function t() {
                return (0, l["default"])(this, t), (0, p["default"])(this, (t.__proto__ || (0, s["default"])(t)).apply(this, arguments));
            }
            return (0, h["default"])(t, e), (0, d["default"])(t, [ {
                key: "setFocus",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props.fields[0], t = this.refs[e].refs.input;
                    if (t.focus(), t.value) {
                        var n = t.value.length;
                        t.setSelectionRange(n, n);
                    }
                }
            }, {
                key: "render",
                value: function() {
                    var e = this;
                    return g.createElement("fieldset", {
                        className: v.inputs
                    }, g.createElement("input", {
                        className: v.hidden,
                        type: "text",
                        name: "fakeusernameremembered"
                    }), g.createElement("input", {
                        className: v.hidden,
                        type: "password",
                        name: "fakepasswordremembered"
                    }), _.filter(function(t) {
                        var n = t.name;
                        return e.props.fields.indexOf(n) > -1;
                    }).map(function(t, n) {
                        return g.createElement(b.Input, (0, i["default"])({}, t, {
                            ref: t.name,
                            onSet: e.props.onSet(t.name),
                            value: e.props.formData[t.name],
                            validation: e.props.validation[t.name],
                            onValidate: e.props.onValidate(t.name),
                            forceValidation: e.props.forceValidation,
                            key: n
                        }));
                    }));
                }
            } ]), t;
        }(g.Component);
        n.Fieldset = y;
    }, {
        "./input": 244,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/extends": 37,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        react: "react"
    } ],
    242: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("react"), o = e("lib/url"), i = {
            footer: "_4ea68c-footer"
        };
        n.Footer = function() {
            return r.createElement("div", {
                className: i.footer
            }, "By signing up, you agree to our ", r.createElement("a", {
                tabIndex: -1,
                target: "__blank",
                href: o.getTermsURL()
            }, "Terms and Conditions"), " and ", r.createElement("a", {
                tabIndex: -1,
                target: "__blank",
                href: o.getPrivatePolicyURL()
            }, "Privacy Policy"), ".  You also agree to receive product-related emails from Grammarly, which you can unsubscribe from at any time.");
        };
    }, {
        "lib/url": 321,
        react: "react"
    } ],
    243: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/regenerator"), i = r(o), a = e("babel-runtime/helpers/defineProperty"), s = r(a), c = e("babel-runtime/core-js/object/get-prototype-of"), l = r(c), u = e("babel-runtime/helpers/classCallCheck"), d = r(u), f = e("babel-runtime/helpers/createClass"), p = r(f), m = e("babel-runtime/helpers/possibleConstructorReturn"), h = r(m), g = e("babel-runtime/helpers/inherits"), b = r(g), v = e("babel-runtime/core-js/object/assign"), _ = r(v), y = e("babel-runtime/core-js/object/keys"), w = r(y), k = e("babel-runtime/core-js/promise"), E = r(k), C = function(e, t, n, r) {
            return new (n || (n = E["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var x = e("react"), S = e("./button"), T = e("./footer"), N = e("../signin/fieldset"), P = e("lib/dom"), j = e("lib/tracking"), I = e("lib/util"), A = e("./welcome"), L = e("./login-success"), M = e("lib/message"), O = e("lib/url"), R = {
            form: "_2a5207-form",
            login: "_2a5207-login",
            register: "_2a5207-register",
            loginSuccess: "_2a5207-loginSuccess",
            welcome: "_2a5207-welcome",
            title: "_2a5207-title",
            subTitle: "_2a5207-subTitle",
            wrapper: "_2a5207-wrapper",
            personalizedTitle: "_2a5207-personalizedTitle",
            titleContainer: "_2a5207-titleContainer",
            personalizedTitleSub: "_2a5207-personalizedTitleSub",
            hidden: "_2a5207-hidden",
            validation: "_2a5207-validation",
            fakefield: "_2a5207-fakefield",
            navigation: "_2a5207-navigation",
            loading: "_2a5207-loading",
            navigationItem: "_2a5207-navigationItem",
            loginNav: "_2a5207-loginNav",
            toLogin: "_2a5207-toLogin",
            forgotLink: "_2a5207-forgotLink",
            onboardingVersion: "_2a5207-onboardingVersion",
            freeLabel: "_2a5207-freeLabel"
        };
        n.validationMessages = {
            fail: "Something went wrong. Please try again later.",
            invalidUser: "Invalid email address/password combination.",
            required: "Required",
            shortPassword: "Use 6 characters or more",
            incorrectEmail: "Incorrect",
            emailExists: 'Already in use. Do you need to <a data-view="login">Log in</a>?'
        }, n.validate = function(e, t) {
            var r = (0, w["default"])(e).reduce(function(r, o) {
                var i = e[o];
                return i && "" !== i ? ("password" === o && "register" === t && i.length < 6 && (r[o] = n.validationMessages.shortPassword), 
                "email" !== o || I.isValidEmail(i) || (r[o] = n.validationMessages.incorrectEmail), 
                r) : (r[o] = n.validationMessages.required, r);
            }, {});
            return r._valid = 0 === (0, w["default"])(r).length, r;
        }, n.extendWithServerValidation = function(e, t) {
            if (!t.error) return (0, _["default"])({}, e, {
                _valid: !0
            });
            var r = void 0, o = void 0, i = {};
            try {
                i = JSON.parse(t.error);
            } catch (a) {}
            return "Conflict" === t.error || "already_exists" === i.error ? o = n.validationMessages.emailExists : r = "Unauthorized" === t.error || "user_not_authorized" === i.error ? n.validationMessages.invalidUser : n.validationMessages.fail, 
            (0, _["default"])({}, e, {
                error: r,
                email: o,
                _valid: !1
            });
        }, n.getResetPassLink = function(e) {
            return O.getResetPasswordURL() + (e ? "&email=" + encodeURIComponent(e) : "");
        };
        var F = function(e) {
            function t() {
                (0, d["default"])(this, t);
                var e = (0, h["default"])(this, (t.__proto__ || (0, l["default"])(t)).call(this));
                return e.forceValidation = !1, e.onClick = function(t) {
                    "login" === t.target.dataset.view && e.changeView("login");
                }, e.changeView = function(t) {
                    var n = e.state.data;
                    "login" !== t && "register" !== t || (n.password = ""), e.setState((0, _["default"])({}, e.state, {
                        view: t,
                        data: n,
                        validation: {
                            _valid: !0
                        }
                    })), e.forceValidation = !1;
                }, e.onValidate = function(t) {
                    return function(r) {
                        var o = e.state, i = o.validation, a = o.view;
                        i[t] = n.validate((0, s["default"])({}, t, r), a)[t], delete i.error, e.setState((0, 
                        _["default"])({}, e.state, {
                            validation: i
                        }));
                    };
                }, e.onSet = function(t) {
                    return function(n) {
                        var r = e.state.data;
                        r[t] = n, e.setState((0, _["default"])({}, e.state, {
                            data: r
                        }));
                    };
                }, e.getFormData = function(t) {
                    var n = (0, _["default"])({}, e.state.data);
                    return t && n.hasOwnProperty(t) && delete n[t], n;
                }, e.onKey = function(t) {
                    if (I.keyCode(t) === I.ESC_KEY && e.props.onClose && e.props.onClose(), I.keyCode(t) === I.ENTER_KEY) {
                        var n = t.target;
                        if ("A" === n.tagName) return;
                        e.onSubmit();
                    }
                }, e.onGoPremium = function() {
                    j.fire("upgrade-after-register"), M.emitBackground("open-url", O.getUpgradeURL("upHook", "anonPopupCard"));
                }, e.onSubmit = function() {
                    if (!e.state.loading) {
                        var t = e.state.view;
                        "login" === t && e.onAuth("signin", e.getFormData("name")), "register" === t && e.onAuth("signup", e.getFormData());
                    }
                }, e.focusForm = function(t, n) {
                    "start" === t && e.setFocus("login" === n ? "email" : "name"), "end" === t && e.refs.end.focus();
                }, e.state = {
                    view: "register",
                    validation: {
                        _valid: !0
                    },
                    loading: !1,
                    data: {
                        name: "",
                        email: "",
                        password: ""
                    }
                }, e;
            }
            return (0, b["default"])(t, e), (0, p["default"])(t, [ {
                key: "componentDidMount",
                value: function() {
                    var e = this, t = "login" === this.state.view ? "email" : "name";
                    setTimeout(function() {
                        e.setFocus(t);
                    }, 350);
                }
            }, {
                key: "componentDidUpdate",
                value: function(e, t) {
                    var n = this.state.view;
                    if (("login" === n || "register" === n) && t.view !== n) {
                        var r = "login" === n ? "email" : "name";
                        this.setFocus(r);
                    }
                }
            }, {
                key: "onAuth",
                value: function(e, t) {
                    return C(this, void 0, void 0, i["default"].mark(function r() {
                        var o, a, s;
                        return i["default"].wrap(function(r) {
                            for (;;) switch (r.prev = r.next) {
                              case 0:
                                if (o = n.validate(t, this.state.view), this.forceValidation = !0, !o._valid) {
                                    r.next = 18;
                                    break;
                                }
                                return this.setState((0, _["default"])({}, this.state, {
                                    loading: !0
                                })), a = void 0, r.prev = 5, r.next = 8, M.promiseBackground(e, {
                                    form: t,
                                    placement: this.props.placement
                                });

                              case 8:
                                a = r.sent, r.next = 15;
                                break;

                              case 11:
                                r.prev = 11, r.t0 = r["catch"](5), r.t0.message && r.t0.message.includes("rejected by timeout") && j.logger.loginNoBgPageConnection(r.t0.message), 
                                a = {
                                    error: !0
                                };

                              case 15:
                                o = n.extendWithServerValidation(o, a), r.next = 20;
                                break;

                              case 18:
                                return this.setState((0, _["default"])({}, this.state, {
                                    validation: o,
                                    loading: !1
                                })), r.abrupt("return");

                              case 20:
                                if (!o._valid) {
                                    r.next = 23;
                                    break;
                                }
                                return s = "signup" === e ? "welcome" : "loginSuccess", r.abrupt("return", this.props.onSuccess ? this.props.onSuccess() : this.changeView(s));

                              case 23:
                                this.setState((0, _["default"])({}, this.state, {
                                    validation: o,
                                    loading: !1
                                }));

                              case 24:
                              case "end":
                                return r.stop();
                            }
                        }, r, this, [ [ 5, 11 ] ]);
                    }));
                }
            }, {
                key: "setFocus",
                value: function(e) {
                    this.refs.fieldset.setFocus(e);
                }
            }, {
                key: "loginView",
                value: function() {
                    var e = this, t = [ "email", "password" ];
                    return x.createElement("div", {
                        className: R.wrapper
                    }, this.state.validation.error && x.createElement("div", {
                        className: R.validation
                    }, this.state.validation.error), x.createElement("input", {
                        className: R.fakefield,
                        type: "text",
                        name: "fakeformstart",
                        onFocus: function() {
                            return e.focusForm("end");
                        }
                    }), x.createElement(N.Fieldset, {
                        forceValidation: this.forceValidation,
                        validation: this.state.validation,
                        onValidate: this.onValidate,
                        onSet: this.onSet,
                        ref: "fieldset",
                        formData: this.state.data,
                        fields: t
                    }), x.createElement("div", {
                        className: R.loginNav
                    }, x.createElement(S.Button, {
                        loading: this.state.loading,
                        onClick: this.onSubmit,
                        styles: {
                            width: 120
                        },
                        text: "Log In"
                    }), x.createElement("a", {
                        target: "__blank",
                        href: n.getResetPassLink(this.state.data.email),
                        ref: "end",
                        className: P.cs(R.navigationItem, R.forgotLink)
                    }, "Forgot password?")), x.createElement("input", {
                        className: R.fakefield,
                        type: "text",
                        name: "fakeformend",
                        onFocus: function() {
                            return e.focusForm("start", "login");
                        }
                    }));
                }
            }, {
                key: "registerView",
                value: function() {
                    var e = this, t = [ "name", "email", "password" ];
                    return x.createElement("div", {
                        className: R.wrapper
                    }, x.createElement("input", {
                        className: R.fakefield,
                        type: "text",
                        name: "fakeformstart",
                        onFocus: function() {
                            return e.focusForm("end");
                        }
                    }), x.createElement("div", {
                        className: R.navigation
                    }, "Already have an account? ", x.createElement("span", {
                        tabIndex: 0,
                        ref: "end",
                        onClick: function() {
                            return e.changeView("login");
                        },
                        className: R.navigationItem
                    }, "Log In")), x.createElement(N.Fieldset, {
                        ref: "fieldset",
                        forceValidation: this.forceValidation,
                        validation: this.state.validation,
                        onValidate: this.onValidate,
                        onSet: this.onSet,
                        formData: this.state.data,
                        fields: t
                    }), x.createElement(S.Button, {
                        loading: this.state.loading,
                        onClick: this.onSubmit,
                        text: "personalize grammarly"
                    }), x.createElement(T.Footer, null), x.createElement("input", {
                        className: R.fakefield,
                        type: "text",
                        name: "fakeformend",
                        onFocus: function() {
                            return e.focusForm("start", "register");
                        }
                    }));
                }
            }, {
                key: "render",
                value: function() {
                    var e = this, t = "login" === this.state.view, n = P.cs(R.form, this.state.loading && R.loading, R[this.state.view], this.props.showOnboardingVersion && R.onboardingVersion);
                    if ("welcome" === this.state.view) return x.createElement(A.Welcome, {
                        isShow: !0,
                        onClose: function() {
                            return e.props.onClose && e.props.onClose();
                        },
                        onGoPremium: function() {
                            return e.onGoPremium();
                        }
                    });
                    if ("loginSuccess" === this.state.view) return x.createElement(L.LoginSuccess, {
                        username: this.props.username,
                        onClose: function() {
                            return e.props.onClose && e.props.onClose();
                        }
                    });
                    var r = t ? this.props.showOnboardingVersion ? x.createElement("div", null, x.createElement("div", {
                        className: R.title
                    }, "Member Login"), x.createElement("div", {
                        className: R.subTitle
                    }, "to save your personalization settings")) : x.createElement("div", null, x.createElement("div", {
                        className: R.title
                    }, "Grammarly Member Login")) : this.props.showOnboardingVersion ? x.createElement("div", null, x.createElement("div", {
                        className: R.title
                    }, "Create an account"), x.createElement("div", {
                        className: R.subTitle
                    }, "to save your personalization settings"), x.createElement("div", {
                        className: R.freeLabel
                    }, "It’s free")) : x.createElement("div", {
                        className: R.personalizedTitle
                    }, "Personalize Grammarly", x.createElement("div", {
                        className: R.personalizedTitleSub
                    }, "to your writing needs"));
                    return x.createElement("div", {
                        className: n,
                        onClick: this.onClick
                    }, x.createElement("div", {
                        className: R.titleContainer
                    }, r), t ? this.loginView() : this.registerView(), t && x.createElement("div", {
                        className: R.toLogin
                    }, "New to Grammarly?", x.createElement("span", {
                        tabIndex: 0,
                        onClick: function() {
                            return e.changeView("register");
                        },
                        className: R.navigationItem
                    }, "Create a free account")));
                }
            } ]), t;
        }(x.Component);
        n.Form = F;
    }, {
        "../signin/fieldset": 241,
        "./button": 240,
        "./footer": 242,
        "./login-success": 245,
        "./welcome": 246,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "babel-runtime/regenerator": 43,
        "lib/dom": 215,
        "lib/message": 278,
        "lib/tracking": 307,
        "lib/url": 321,
        "lib/util": 322,
        react: "react"
    } ],
    244: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("react"), h = e("lib/util"), g = e("lib/util"), b = e("lib/dom"), v = {
            input: "_d80b1b-input",
            label: "_d80b1b-label",
            windows: "_d80b1b-windows",
            inputElement: "_d80b1b-inputElement",
            validation: "_d80b1b-validation"
        }, _ = function(e) {
            function t() {
                (0, s["default"])(this, t);
                var e = (0, d["default"])(this, (t.__proto__ || (0, i["default"])(t)).apply(this, arguments));
                return e.id = h.guid(), e.state = {
                    cancelValidation: !0,
                    dirty: !1
                }, e.onBlur = function() {
                    e.setState({
                        cancelValidation: !1
                    }), e.props.onValidate(e.value);
                }, e.onChange = function() {
                    e.setState({
                        cancelValidation: !0,
                        dirty: !0
                    }), e.props.onSet(e.value);
                }, e;
            }
            return (0, p["default"])(t, e), (0, l["default"])(t, [ {
                key: "getValidation",
                value: function() {
                    return (this.props.validation && !this.state.cancelValidation && this.state.dirty || this.props.forceValidation) && m.createElement("div", {
                        className: v.validation,
                        dangerouslySetInnerHTML: {
                            __html: this.props.validation
                        }
                    });
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props, t = e.name, n = e.type, r = e.label, o = e.value, i = {
                        name: t,
                        type: n,
                        value: o,
                        id: this.id,
                        ref: "input",
                        required: !0,
                        spellCheck: !1,
                        onBlur: this.onBlur,
                        onChange: this.onChange,
                        className: v.inputElement
                    };
                    return m.createElement("div", {
                        className: b.cs(v.input, g.isWindows() && v.windows)
                    }, this.getValidation(), m.createElement("input", i), m.createElement("label", {
                        htmlFor: this.id,
                        className: v.label
                    }, r));
                }
            }, {
                key: "value",
                get: function() {
                    return this.refs.input.value;
                }
            } ]), t;
        }(m.Component);
        n.Input = _;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/dom": 215,
        "lib/util": 322,
        react: "react"
    } ],
    245: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("react"), h = {
            loginSuccess: "_5f9912-loginSuccess",
            windows: "_5f9912-windows",
            name: "_5f9912-name",
            label: "_5f9912-label"
        }, g = function(e) {
            function t() {
                return (0, s["default"])(this, t), (0, d["default"])(this, (t.__proto__ || (0, i["default"])(t)).apply(this, arguments));
            }
            return (0, p["default"])(t, e), (0, l["default"])(t, [ {
                key: "componentDidMount",
                value: function() {
                    this.props.onClose && setTimeout(this.props.onClose, 1500);
                }
            }, {
                key: "render",
                value: function() {
                    return m.createElement("div", {
                        className: h.loginSuccess
                    }, this.props.username ? m.createElement("div", {
                        className: h.label
                    }, "Welcome back, ", m.createElement("span", {
                        className: h.name
                    }, this.props.username), "!") : m.createElement("div", {
                        className: h.label
                    }, "Welcome back!"));
                }
            } ]), t;
        }(m.Component);
        n.LoginSuccess = g;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        react: "react"
    } ],
    246: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/defineProperty"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("react"), s = {
            welcome: "_66b3a6-welcome",
            windows: "_66b3a6-windows",
            image: "_66b3a6-image",
            content: "_66b3a6-content",
            show: "_66b3a6-show",
            title: "_66b3a6-title",
            text: "_66b3a6-text",
            close: "_66b3a6-close",
            learnMore: "_66b3a6-learnMore",
            goPremium: "_66b3a6-goPremium"
        }, c = e("lib/dom"), l = e("lib/util"), u = e("./button");
        n.Welcome = function(e) {
            var t, n = e.isShow, r = e.onClose, o = e.onGoPremium, d = c.cs((t = {}, (0, i["default"])(t, s.welcome, !0), 
            (0, i["default"])(t, s.show, n), (0, i["default"])(t, s.windows, l.isWindows()), 
            t));
            return a.createElement("div", {
                className: d
            }, a.createElement("div", {
                className: s.image
            }), a.createElement("div", {
                className: s.content
            }, a.createElement("div", {
                className: s.title
            }, "Welcome to Grammarly"), a.createElement("div", {
                className: s.text
            }, "Wave good-bye to the most frequent and pesky ", a.createElement("br", null), "writing mistakes."), a.createElement("div", {
                className: s.goPremium
            }, a.createElement("span", {
                className: s.checks
            }, "Go Premium and get 150+ additional", a.createElement("br", null), " advanced checks."), " ", a.createElement("a", {
                onClick: o,
                className: s.learnMore
            }, "Learn more")), a.createElement("div", {
                className: s.close
            }, a.createElement(u.Button, {
                onClick: r,
                text: "Continue to Your Text"
            }))));
        };
    }, {
        "./button": 240,
        "babel-runtime/helpers/defineProperty": 36,
        "lib/dom": 215,
        "lib/util": 322,
        react: "react"
    } ],
    247: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var e = document.querySelector(".gr__tooltip");
            return e || (e = u.createEl('<span class="gr__tooltip"><span class="gr__tooltip-content"></span><i class="gr__tooltip-logo"></i><span class="gr__triangle"></span></span>'), 
            document.documentElement.appendChild(e)), e;
        }
        function i() {
            function e() {
                m.fastHide();
            }
            function t(e) {
                var t = e.target;
                return u.inEl(t, d.posEl);
            }
            function n() {
                d.posEl && (f && f.parentNode && f.parentNode.removeChild(f), u.unlisten(d.doc, "scroll", e), 
                d.moveListenerDoc && u.unlisten(d.moveListenerDoc, "scroll", e));
            }
            function r() {
                h && (h = !1, f && (f.style.opacity = "0", f.style.top = "-9999px", m && m.setVisible(!1), 
                f.className = f.className.replace(d.cls, "")));
            }
            function i() {
                d.cls += " gr-no-transition", a(), setTimeout(function() {
                    d.cls = d.cls.replace(" gr-no-transition", ""), u.removeClass(f, "gr-no-transition");
                }, 100);
            }
            function a() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d, t = e.posEl, n = void 0 === t ? d.posEl : t, r = e.html, o = void 0 === r ? d.html : r, i = e.text, a = void 0 === i ? d.text : i, c = e.cls, b = void 0 === c ? d.cls : c, v = e.doc, _ = void 0 === v ? d.doc : v, y = e.outerIframe, w = void 0 === y ? d.outerIframe : y;
                if ((0, s["default"])(d, {
                    posEl: n,
                    html: o,
                    text: a,
                    cls: b,
                    doc: _,
                    outerIframe: w
                }), g) {
                    h = !0, m && m.setVisible(!0), a && f.setAttribute("data-content", a), o && (p.innerHTML = o), 
                    f.className = "gr__tooltip", b && u.addClass(f, b), u.removeClass(f, "gr__flipped");
                    var k = l.getAbsRect(n, w), E = l.posToRect(f, k), C = E.rect, x = C.top, S = C.left;
                    u.css(f, {
                        top: x,
                        left: S
                    }), E && E.rect && !E.rect.flip && u.addClass(f, "gr__flipped");
                    var T = f.clientWidth, N = f.querySelector(".gr__triangle"), P = k.width / 2;
                    P > T && (P = 0), E.delta.right <= 0 && (P -= E.delta.right), P -= parseInt(getComputedStyle(f).getPropertyValue("margin-left"), 10), 
                    N && (N.style.marginLeft = P + "px"), f.style.opacity = "1";
                }
            }
            var d = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, f = o(), p = void 0, m = void 0, h = void 0, g = void 0 === d.enabled || d.enabled;
            p = f.querySelector(".gr__tooltip-content"), d.posEl && (d.moveListenerDoc = d.outerIframe ? d.outerIframe.contentDocument : d.doc, 
            m = new c.HintImpl({
                doc: d.moveListenerDoc,
                doc2: d.doc,
                hint: f,
                hideDelay: 500,
                delay: 0,
                onshow: function() {
                    return a();
                },
                onhide: r,
                inTarget: t
            }), u.listen(d.doc, "scroll", e), u.listen(d.moveListenerDoc, "scroll", e), m.bind());
            var b = {
                show: a,
                fastShow: i,
                hide: r,
                remove: n,
                el: f,
                enable: function() {
                    g = !0;
                },
                disable: function() {
                    g = !1;
                },
                isEnabled: function() {
                    return g;
                }
            };
            return b;
        }
        var a = e("babel-runtime/core-js/object/assign"), s = r(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("./hint"), l = e("../position"), u = e("../dom");
        n.createTooltip = i;
    }, {
        "../dom": 215,
        "../position": 289,
        "./hint": 224,
        "babel-runtime/core-js/object/assign": 24
    } ],
    248: [ function(e, t, n) {
        "use strict";
        function r(e) {
            var t = document.createElement("script");
            t.innerHTML = e, document.head.appendChild(t), t.parentNode && t.parentNode.removeChild(t);
        }
        function o() {
            c.initContentScript(), r("window.GR_EXTENSION_ID='" + s.getUuid() + "'"), r("\n    window.GR_EXTENSION_SEND = function(key, data) {\n      if (!key) throw new TypeError('cant be called without message')\n      var e = document.createEvent('CustomEvent')\n      e.initCustomEvent('external:' + key, true, true, data)\n      document.dispatchEvent(e)\n    }\n  "), 
            s.externalEvents.map(function(e) {
                return "external:" + e;
            }).forEach(function(e) {
                return a.on.call(document, e, function(t) {
                    var n = t.detail;
                    console.log("external event", e, n), i.emitBackground(e, n);
                });
            });
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("./message"), a = e("./dom"), s = e("./config"), c = e("./tracking");
        n.addExternalEventListeners = o;
    }, {
        "./config": 211,
        "./dom": 215,
        "./message": 278,
        "./tracking": 307
    } ],
    249: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("lib/tracking/felogPixel"), o = e("lib/tracking/telemetry"), i = {}, a = new o.Telemetry(r.sendEventPixel, function() {}, function() {}, function() {});
        n.failover = function() {
            function e() {
                setTimeout(o, c), i.index_load = !1;
            }
            function t() {
                setTimeout(s, l), i.app_load = !1;
            }
            function n(e) {
                i[e] = !0;
            }
            function r(e, t) {}
            function o() {
                r("index_load", "extension_loading"), i.index_load || a.pageLoadTimeout();
            }
            function s() {
                r("app_load", "extension_app_loading"), i.app_load || a.appLoadTimeout();
            }
            var c = 12e4, l = 12e4, u = {
                startPageLoadTimer: e,
                startAppLoadTimer: t,
                success: n,
                setPageLoadTimeout: function(e) {
                    return c = e;
                },
                setAppLoadTimeout: function(e) {
                    return l = e;
                }
            };
            return u;
        }();
    }, {
        "lib/tracking/felogPixel": 306,
        "lib/tracking/telemetry": 310
    } ],
    250: [ function(e, t, n) {
        "use strict";
        function r(e, t) {
            t.setDomSelection = function(t) {
                var n = o.getNodeByTextPos(e, t.begin), r = o.getNodeByTextPos(e, t.end);
                i.setDomRange(e.ownerDocument, {
                    anchorNode: n.node,
                    anchorOffset: t.begin - n.pos,
                    focusNode: r.node,
                    focusOffset: t.end - r.pos
                });
            }, t.setCursor = function(e) {
                t.cursor = e;
            }, t.fireDomEvent = function(e) {
                a.isFF() && i.emitDomEvent("document-mousedown-mouseup-activeElement");
                var t = " " === e || e.trim() ? "paste" : "backspace";
                i.emitDomEvent("document-" + t + "-activeElement", e);
            }, t.doReplace = function(e, n) {
                t.safeFocus(), t.setDomSelection(e), a.asyncCall(function() {
                    return t.fireDomEvent(n);
                });
            }, t.setTextareaValue = function(n) {
                t.safeFocus(), e.ownerDocument.getSelection().selectAllChildren(e), a.asyncCall(function() {
                    t.fireDomEvent(n.trimRight()), a.asyncCall(t._setCursor, 100);
                }, a.isSafari() ? 100 : 10);
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("lib/wrap"), i = e("lib/dom"), a = e("lib/util");
        n.extendDom = r;
    }, {
        "lib/dom": 215,
        "lib/util": 322,
        "lib/wrap": 324
    } ],
    251: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            function t() {
                k();
            }
            function n(e) {
                var t = P.getBoundingClientRect(), n = C(e.clientX - t.left, e.clientY - t.top, t.left, t.top);
                if (n) {
                    n.e = {
                        clientX: e.clientX,
                        clientY: e.clientY
                    }, e.stopPropagation();
                    var r = document.createEvent("CustomEvent");
                    delete n.el, delete n.match, r.initCustomEvent("gramMouse", !0, !0, n), I.dispatchEvent(r);
                }
            }
            function r(e) {
                return e ? e.toString().split(" ").map(function(e) {
                    return isNaN(parseFloat(e)) && e.indexOf("px") === -1 ? e : Math.floor(parseFloat(e)) + "px";
                }).join(" ") : e + "";
            }
            function o() {
                var e = A.getComputedStyle(P);
                if (!e) return {};
                var t = function(t) {
                    return e.getPropertyValue(t);
                }, n = function(e) {
                    var n = {};
                    return e.map(function(e) {
                        n[e] = t(e), "z-index" === e && "auto" === n[e] && P.style.zIndex && (n[e] = P.style.zIndex);
                    }), n;
                }, o = {
                    parent: n([ "border", "border-radius", "box-sizing", "height", "width", "margin", "padding", "z-index", "border-top-width", "border-right-width", "border-left-width", "border-bottom-width", "border-top-style", "border-right-style", "border-left-style", "border-bottom-style", "padding-top", "padding-left", "padding-bottom", "padding-right", "margin-top", "margin-left", "margin-bottom", "margin-right" ]),
                    child: n([ "font", "font-size", "font-family", "text-align", "line-height", "letter-spacing", "text-shadow" ]),
                    src: n([ "position", "margin-top", "line-height", "font-size", "font-family", "z-index" ])
                }, i = o.parent["z-index"];
                if (o.parent["z-index"] = i && "auto" !== i ? (parseInt(i, 10) - 1).toString() : "0", 
                o.parent.marginTop = r(o.parent.marginTop), o.src.marginTop = r(o.src.marginTop), 
                o.parent.margin = r(o.parent.margin), o.parent.padding = r(o.parent.padding), (o.parent["border-top-width"] || o.parent["border-left-width"]) && (o.parent["border-style"] = "solid"), 
                o.parent.border) {
                    var a = o.parent.border.split(" ");
                    o.parent["border-width"] = a[0], a.length > 1 && (o.parent["border-style"] = a[1]), 
                    delete o.parent.border;
                }
                if (o.parent["border-color"] = "transparent !important", "absolute" === o.src.position || "relative" === o.src.position ? o.parent = u.extend(o.parent, n([ "top", "left" ])) : o.src.position = "relative", 
                z = K.customDefaultBg && K.customDefaultBg(P) || z || t("background"), d.isFF() && !z && (z = [ "background-color", "background-image", "background-repeat", "background-attachment", "background-position" ].map(t).join(" ")), 
                o.parent.background = z, d.isFF()) {
                    var s = parseInt(t("border-right-width"), 10) - parseInt(t("border-left-width"), 10), c = P.offsetWidth - P.clientWidth - s;
                    o.child["padding-right"] = c - 1 + "px";
                }
                return "start" === t("text-align") && (o.child["text-align"] = "ltr" === t("direction") ? "left" : "right"), 
                o;
            }
            function i(e) {
                G = e, g();
            }
            function a(e) {
                var t = {
                    background: "transparent !important",
                    "z-index": e["z-index"] || 1,
                    position: e.position,
                    "line-height": e["line-height"],
                    "font-size": e["font-size"],
                    "-webkit-transition": "none",
                    transition: "none"
                };
                K.removeContainerFontSize && K.removeContainerFontSize(P) && delete t["font-size"], 
                parseInt(e["margin-top"], 10) > 0 && m.css(P.parentNode, {
                    width: "auto",
                    overflow: "hidden"
                });
                var n = A.devicePixelRatio > 1;
                if (n) {
                    var r = e["font-family"];
                    0 === r.indexOf("Consolas") && (r = r.replace("Consolas,", "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif"), 
                    O.child["font-family"] = r, t["font-family"] = r);
                }
                d.isEdge && "auto" === O.parent.top && (O.parent.top = "0px"), m.css(P, t);
            }
            function g() {
                var e = o();
                U || (a(e.src), V = !!P.previousElementSibling && "left" === m.css(P.previousElementSibling, "float"), 
                d.interval(g, 500), W || (W = !0, m.listen(P, Q)), U = !0), O.parent.marginTop = r(O.parent.marginTop), 
                e = u.merge(e, O), e.child.height = P.scrollHeight, K.fieldRestoreInlineStyles && K.fieldRestoreInlineStyles(P, e), 
                K.ghostHeight && (e.child.height = K.ghostHeight(e.child.height)), K.setContainerLineHeight && K.setContainerLineHeight(P, e.child["font-size"]), 
                K.getContainerTextAlign && (e.child.textAlign = K.getContainerTextAlign(P));
                var t = u.merge(R, {
                    "data-id": M,
                    "data-gramm_id": M,
                    "data-gramm": "gramm",
                    "data-gramm_editor": !0,
                    dir: P.getAttribute("dir")
                });
                F || (F = I.createElement("grammarly-ghost"), F.setAttribute("spellcheck", "false"), 
                m.insertBefore(F, j)), L.matchPrefix && (t.className = L.matchPrefix), K.ghostHeight && (e.parent.height = K.ghostHeight(e.parent.height));
                var n = l.render(c.createElement(b, {
                    style: e,
                    attrs: t,
                    val: G
                }), F);
                D = l.findDOMNode(n), B = D.firstElementChild, D.contentEditable = "true", Y.clone = D, 
                Y.cloneVal = B, v(), _(), y(), 0 === P.offsetHeight ? S() : T(), Y.emit("render");
            }
            function v() {
                if (V) {
                    if (P.getBoundingClientRect().left === D.getBoundingClientRect().left && P.getBoundingClientRect().top === D.getBoundingClientRect().top) return V = !1;
                    var e = P.getBoundingClientRect(), t = P.parentNode.getBoundingClientRect(), n = e.left - t.left, r = e.top - t.top, o = "translate(" + n + "px, " + r + "px)";
                    O.parent["-webkit-transform"] = o, O.parent.transform = o;
                }
            }
            function _() {
                function e(e, r, o) {
                    var i = o ? [ P, D ] : [ t, n ];
                    O.parent[r] = parseInt((parseInt(D.style[r], 10) + i[0][e] - i[1][e]).toString(), 10) + "px";
                }
                var t = p.getAbsRect(P), n = p.getAbsRect(D);
                if (n.left !== t.left && e("left", "marginLeft", !1), n.top !== t.top && e("top", "marginTop", !1), 
                D.clientWidth === P.clientWidth || d.isFF() ? n.width !== t.width && (R.width = t.width) : n.width !== t.width ? D.style.width = t.width.toString() : e("clientWidth", "width", !0), 
                d.isFF()) {
                    var r = m.css(P.parentNode, [ "margin-left", "margin-top", "position" ]);
                    r && (r.marginLeft || r.marginTop) && "static" === r.position && (P.parentNode.style.position = "relative", 
                    P.parentNode.style.overflow = "");
                }
                n.height !== t.height && (O.parent.height = t.height);
            }
            function y() {
                function e(e, t) {
                    return f.isFacebookSite() ? e.nextElementSibling && e.nextElementSibling.childNodes[0] !== t : e.nextElementSibling !== t;
                }
                var t = function(e) {
                    return I.contains && I.contains(e) || m.elementInDocument(e, I);
                };
                F && t(P) && (!e(F, P) && t(F) || m.insertBefore(F, j));
            }
            function w(e) {
                return D.querySelector(".gr_" + e);
            }
            function k() {
                var e = L.current();
                q = [];
                for (var t = D.scrollTop, n = 0; n < e.length; n++) {
                    var r = e[n], o = w(r.id);
                    if (o) {
                        E(o);
                        var i = p.getPos(o, D), a = {
                            x1: i.x,
                            x2: i.x + o.offsetWidth,
                            y1: i.y,
                            y2: i.y + o.offsetHeight + 5
                        }, s = {
                            match: r,
                            el: o,
                            id: o.id,
                            box: a
                        };
                        q.push(s);
                        var c = o.textContent, l = c && c.trim().split(" ").length > 1;
                        if (l) {
                            var d = o.getClientRects();
                            d.length < 2 || (s.rects = u.map(d, function(e) {
                                return {
                                    x1: e.left,
                                    x2: e.right,
                                    y1: e.top + t,
                                    y2: e.bottom + t
                                };
                            }));
                        }
                    }
                }
            }
            function E(e) {
                if (e) {
                    var t = e.parentNode;
                    if (t) {
                        var n = t.getAttribute("style");
                        n && e.setAttribute("style", n);
                    }
                    e.classList.contains("gr_disable_anim_appear") || e.addEventListener("animationend", function() {
                        return e.classList.add("gr_disable_anim_appear");
                    }), m.css(e, {
                        display: "",
                        padding: "",
                        margin: "",
                        width: ""
                    });
                }
            }
            function C(e, t, n, r) {
                for (var o = D.scrollTop, i = 0; i < q.length; i++) {
                    var a = q[i], s = a.box;
                    if (e >= s.x1 && e <= s.x2 && t >= s.y1 - o && t <= s.y2 - o) return a;
                    if (a.rects) for (var c = 0; c < a.rects.length; c++) {
                        var l = a.rects[c], u = e + n, d = t + r;
                        if (u >= l.x1 && u <= l.x2 && d >= l.y1 - o && d <= l.y2 - o) return a;
                    }
                }
            }
            function x() {
                clearTimeout(H), d.cancelInterval(g);
            }
            function S() {
                F.style.display = "none", d.isSafari() && (P.style.background = "", P.style.backgroundColor = ""), 
                P.style.background = z, d.cancelInterval(g), setTimeout(function() {
                    return Y.emit("render");
                }, 300), U = !1, F.parentNode && F.parentNode.removeChild(F);
            }
            function T() {
                U || (F.style.display = "", F.parentNode || m.insertBefore(F, j), g(), J());
            }
            function N() {
                x(), m.unlisten(P, Q), S();
            }
            var P = e.el, j = f.isFacebookSite() ? P.parentNode : P, I = P.ownerDocument, A = I.defaultView, L = e.editor || {
                current: function() {
                    return [];
                }
            }, M = e.id, O = {
                parent: {},
                child: {}
            }, R = {}, F = void 0, D = void 0, B = void 0, U = !1, W = void 0, G = "", V = !1, z = void 0, H = void 0, q = [], K = h.pageStyles(I).getFixesForCurrentDomain(), Y = s({
                render: g,
                getStyle: o,
                setText: i,
                generateAlertPositions: k,
                remove: N,
                hide: S,
                show: T
            }), J = function() {
                try {
                    O.child.height = P.scrollHeight, D.scrollTop = P.scrollTop, clearTimeout(H), H = setTimeout(J, 100);
                } catch (e) {
                    J = d._f;
                }
            }, Q = {
                mousemove: n,
                mouseenter: t,
                keyup: J,
                scroll: J
            };
            return Y;
        }
        var i = e("babel-runtime/helpers/extends"), a = r(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("emitter"), c = e("react"), l = e("react-dom"), u = e("lodash"), d = e("../util"), f = e("lib/location"), p = e("../position"), m = e("../dom"), h = e("../sites"), g = {
            style: {
                child: {
                    display: "inline-block",
                    "line-height": "initial",
                    color: "transparent",
                    overflow: "hidden",
                    "text-align": "left",
                    "float": "initial",
                    clear: "none",
                    "box-sizing": "border-box",
                    "vertical-align": "baseline",
                    "white-space": "pre-wrap",
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    border: 0
                },
                parent: {
                    position: "absolute",
                    color: "transparent",
                    "border-color": "transparent !important",
                    overflow: "hidden",
                    "white-space": "pre-wrap"
                },
                src: {}
            },
            attrs: {},
            val: ""
        }, b = c.createClass({
            displayName: "GhostComponent",
            getDefaultProps: function() {
                return g;
            },
            render: function() {
                var e = u.merge(g.style, this.props.style), t = this.props.attrs, n = m.camelizeAttrs(e.parent), r = m.camelizeAttrs(e.child), o = this.props.val;
                return t.gramm = !0, c.createElement("div", (0, a["default"])({
                    style: n
                }, t), c.createElement("span", {
                    style: r,
                    dangerouslySetInnerHTML: {
                        __html: o
                    }
                }), c.createElement("br", null));
            }
        });
        n.createGhost = o;
    }, {
        "../dom": 215,
        "../position": 289,
        "../sites": 294,
        "../util": 322,
        "babel-runtime/helpers/extends": 37,
        emitter: "emitter",
        "lib/location": 277,
        lodash: "lodash",
        react: "react",
        "react-dom": "react-dom"
    } ],
    252: [ function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            function r() {
                return D = e(U.el, U.id), D.on("exit", N), D.dom.insertGhost = E, L = s.createGhost({
                    id: n,
                    el: t,
                    editor: D
                }), U.gh = L, D.ghostarea = U, D._run = D.run, D.run = d, D;
            }
            function d() {
                f("on"), M = !0, F = p(), D._run(), L && L.show();
            }
            function f() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "on";
                "on" === e ? (o.listen(t, "input", h), o.listen(t, "keyup", w), o.listen(t, "keydown", k), 
                o.listen(j, "click", b, void 0, !0)) : (o.unlisten(t, "input", h), o.unlisten(t, "keyup", w), 
                o.unlisten(t, "keydown", k), o.unlisten(j, "click", b)), L && L[e]("render", _), 
                D[e]("rendered", x), D.isHtmlGhost || (D[e]("beforeReplace", g), D[e]("afterReplace", C));
            }
            function p() {
                return "TEXTAREA" === t.tagName ? t.value : t.parentNode ? u.getText(t) : "";
            }
            function m(e) {
                t.value = e;
            }
            function h() {
                M && (F = p());
            }
            function g() {
                R = t.scrollTop;
            }
            function b(e) {
                if (a.isFacebookSite() && o.matchesSelector(e.target, B)) return y();
            }
            function v() {
                var e = P.createEvent("TextEvent");
                e.initTextEvent ? D.latestCursor.s === D.latestCursor.e && (e.initTextEvent("textInput", !0, !0, null, String.fromCharCode(8203), 1, "en-US"), 
                setTimeout(function() {
                    D.saveCursor(), D.skipInputEvents(), t.dispatchEvent(e), setTimeout(function() {
                        m(p().replace(String.fromCharCode(8203), "")), D.restoreCursor(), D.skipInputEvents(!1);
                    }, 50);
                }, 50)) : (o.runKeyEvent({
                    el: t,
                    type: "keydown"
                }), o.runKeyEvent({
                    el: t,
                    type: "keyup"
                })), t.scrollTop = R, F = p();
            }
            function _() {
                if ((0 === F.length && p().length > 0 || O) && (F = p(), O = !1), M) {
                    F = F.replace(new RegExp(String.fromCharCode(8203), "g"), "");
                    var e = c.diffPos(F, p()), t = 1 !== F.indexOf("@") && p().indexOf("@") === -1;
                    e.delta >= 2 && 0 === e.s && (I || A) && !t && y();
                }
            }
            function y() {
                M && (S(), D.clearData());
            }
            function w(e) {
                D.camouflage();
            }
            function k(e) {
                A = 13 === i.keyCode(e);
            }
            function E() {
                return L.render(), {
                    clone: L.clone,
                    cloneVal: L.cloneVal
                };
            }
            function C() {
                setTimeout(v, 50);
            }
            function x() {
                L && L.generateAlertPositions();
            }
            function S() {
                M && L && L.hide();
            }
            function T() {
                M = !0, L && L.show();
            }
            function N() {
                f("off"), D && (D.off("exit", N), D.remove(), D = null), U.emit("exit"), t.removeAttribute("data-gramm"), 
                t.removeAttribute("data-txt_gramm_id"), L && (L.remove(), L = null);
            }
            var P = t.ownerDocument, j = P.defaultView, I = !1, A = !1, L = void 0, M = !1, O = void 0, R = void 0, F = p(), D = void 0;
            t.setAttribute("data-gramm", ""), t.setAttribute("data-txt_gramm_id", n);
            var B = "div[role=navigation] li[role=listitem] *", U = l({
                el: t,
                id: n,
                hideClone: S,
                showClone: T,
                insertGhost: E,
                remove: N,
                run: d
            });
            return r();
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("../dom"), i = e("../util"), a = e("lib/location"), s = e("./ghost"), c = e("@grammarly-npm/textdiff"), l = e("emitter"), u = e("lib/wrap");
        n.createGhostArea = r;
    }, {
        "../dom": 215,
        "../util": 322,
        "./ghost": 251,
        "@grammarly-npm/textdiff": 16,
        emitter: "emitter",
        "lib/location": 277,
        "lib/wrap": 324
    } ],
    253: [ function(e, t, n) {
        "use strict";
        function r() {
            return s && a.HTML_GHOST_SITES.includes(s);
        }
        function o() {
            return "[contenteditable]";
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("lib/location"), a = e("../page-config/defaults"), s = i.getDomain();
        n.isHtmlGhostSite = r, n.getHtmlGhostSelector = o;
    }, {
        "../page-config/defaults": 283,
        "lib/location": 277
    } ],
    254: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../under/html-dom"), o = e("../under/textarea-dom"), i = e("lib/wrap"), a = e("lib/util"), s = e("./facebook-ghost"), c = e("lib/location");
        n.HtmlGhostDom = function(e) {
            var t = e.editor, n = e.el, l = n.ownerDocument, u = r.createHtmlDom(e), d = o.createTextareaDom(e), f = d;
            return f.safeFocus = function() {
                var e = l.body.scrollTop;
                n.focus(), l.body.scrollTop = e;
            }, d.getCursor = function() {
                return u.getCursor();
            }, d.setCursor = function(e) {
                f.cursor = e, f._setCursor();
            }, f._setCursor = function() {
                i.invalidateNode(n), u.setCursor(f.cursor);
            }, d.getText = function() {
                return n.parentNode ? (i.invalidateNode(n), delete n.__getText, i.getText(n)) : "";
            }, d.replace = function(e, n, r) {
                t.inputListener.ignorePaste = !0, f.doReplace(e, n), e.replaced = !r, e.inDom = !r, 
                t.inputListener.ignorePaste = !1;
            }, f.doReplace = function(e, t) {
                var n = d.getText();
                n = n.substring(0, e.s) + t + n.substr(e.e), f.setTextareaValueSync(n), a.asyncCall(f._setCursor);
            }, f.setTextareaValueSync = function(e) {
                n.innerText = e, i.invalidateNode(n), f.safeFocus();
            }, d.setTextareaValue = function(e) {
                f.safeFocus(), a.asyncCall(function() {
                    n.innerText = e, i.invalidateNode(n);
                });
            }, c.isFacebookSite() && s.extendDom(n, d), d;
        };
    }, {
        "../under/html-dom": 312,
        "../under/textarea-dom": 319,
        "./facebook-ghost": 250,
        "lib/location": 277,
        "lib/util": 322,
        "lib/wrap": 324
    } ],
    255: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("emitter"), o = e("lodash"), i = e("@grammarly-npm/websocket");
        n.capi = r({
            CLIENT_NAME: "web",
            PROTOCOL_VERSION: "1.0",
            clientVersion: "",
            extDomain: "",
            token: null,
            debug: !1,
            setToken: function(e) {
                n.capi.token = e, n.capi.emit("ready", n.capi.token);
            },
            onReady: function(e) {
                return n.capi.token ? e(n.capi.token) : void n.capi.one("ready", e);
            },
            createClient: function(e) {
                function t(e) {
                    var t = u[e.error];
                    if (t) {
                        t.intervals || (t.intervals = [], t.lastErrSent = 0), t.lastErr = Date.now(), t.intervals.push(t.lastErr), 
                        t.intervals.length < t.maxCount && (m.ws.reconnect(), m.start());
                        var n = t.lastErr - t.intervals[t.intervals.length - (t.maxCount + 1)] < 6e4;
                        t.intervals.length > t.maxCount && n && t.lastErr - t.lastErrSent > 6e4 && (m.emit(t.emitMsg, {
                            msg: e,
                            count: t.intervals.length,
                            intervals: t.intervals
                        }), t.lastErrSent = t.lastErr), "not_authorized" === e.error && t.intervals.length > t.maxCount && (t.intervals = []);
                    }
                }
                function a(e, t, n) {
                    return t.rev = m.rev++, o.isFunction(n) && m.one([ "finished", t.rev.toString() ], n), 
                    s(e, t), t.rev;
                }
                function s(e, t, n) {
                    t = t || {}, t.action = e, t.id = m.messageId++;
                    var r = +new Date();
                    return m.one([ t.action.toString(), t.id.toString() ], function() {
                        o.isFunction(n) && n(t), m.emit("stats:timing", {
                            key: "performance:capi_time",
                            value: +new Date() - r,
                            tags: [ "op:" + e ]
                        });
                    }), m.ws.send(t), t.id;
                }
                var c = !e.silentLogs, l = 9e5, u = {
                    runtime_error: {
                        maxCount: 10,
                        emitMsg: "frequent_runtime_error"
                    },
                    not_authorized: {
                        maxCount: 5,
                        emitMsg: "frequent_not_authorized_error"
                    }
                }, d = !1, f = 0;
                e = o.extend({
                    connectionTimeout: 1e3,
                    sid: null,
                    useQueue: 30,
                    useStandBy: l,
                    resetQueueOnReconnect: !0
                }, e);
                var p = e.createWs || i, m = r({
                    rev: 0,
                    messageId: 0,
                    options: e,
                    genre: null,
                    ws: p(e),
                    checkText: function(e, t, n, r) {
                        return m.check(e, t, n, void 0, r);
                    },
                    submitOt: function(e, t, n, r) {
                        return m.rev = t, n = n || {}, a("submit_ot", o.extend({
                            ch: e
                        }, n), r);
                    },
                    checkNoSynonymsText: function(e, t, n, r) {
                        return m.check(e, t, n, "NOSYNONYMS", r);
                    },
                    checkGrammar: function(e, t, n, r) {
                        return m.check(e, t, n, "GRAMMAR", r);
                    },
                    checkSpell: function(e, t, n, r) {
                        return m.check(e, t, n, "SPELL", r);
                    },
                    checkStyle: function(e, t, n, r) {
                        return m.check(e, t, n, "STYLE", r);
                    },
                    checkSynonyms: function(e, t, n, r) {
                        return m.check(e, t, n, "SYNONYMS", r);
                    },
                    acknowledged: function(e) {
                        return m.feedback(e, "acknowledged");
                    },
                    ignore: function(e) {
                        return m.feedback(e, "ignore");
                    },
                    ignoreAll: function(e) {
                        return m.feedback(e, "ignore_all");
                    },
                    addToDictionary: function(e) {
                        return s("add_to_dict", {
                            word: e.value
                        });
                    },
                    feedback: function(e, t) {
                        return s("feedback", {
                            sentenceNo: e.sentence_no,
                            alertId: String(e.sid),
                            text: e.value,
                            type: t
                        });
                    },
                    check: function(e, t, n, r, o) {
                        return a("submit", {
                            text: e,
                            begin: t,
                            end: n,
                            checks: r
                        }, o);
                    },
                    start: function() {
                        var t = {
                            token: n.capi.token,
                            sid: e.sid,
                            docid: e.docid,
                            client: n.capi.CLIENT_NAME,
                            protocolVersion: n.capi.PROTOCOL_VERSION
                        };
                        return e.dialect && (t.dialect = e.dialect), n.capi.clientVersion && (t.clientVersion = n.capi.clientVersion), 
                        n.capi.extDomain && (t.extDomain = n.capi.extDomain), s("start", t);
                    },
                    plagiarism: function(e, t) {
                        return a("plagiarism", {
                            text: e
                        }, t);
                    },
                    undo: function(e, t) {
                        return s("undo", {
                            alertId: e,
                            sentenceId: t
                        });
                    },
                    drop: function(e, t) {
                        return s("drop", {
                            alertId: e,
                            sentenceId: t
                        });
                    },
                    synonyms: function(e, t) {
                        return s("synonyms", {
                            rev: m.rev - 1,
                            begin: e,
                            token: t
                        });
                    },
                    stop: function() {
                        return s("stop");
                    },
                    logout: function() {
                        return s("logout");
                    },
                    close: function() {
                        return m.ws.close();
                    },
                    wsPause: function() {
                        return m.ws.wsPause();
                    },
                    wsPlay: function() {
                        return m.ws.wsPlay();
                    },
                    sendContainerId: function(e) {
                        return s("option", {
                            name: "gnar_containerId",
                            value: e
                        });
                    }
                }), h = function() {
                    function e() {
                        clearTimeout(r), r = setTimeout(function() {
                            m.ws.isConnected() || (m.emit("serviceState", {
                                type: "capi",
                                available: !1
                            }), o = !0);
                        }, n);
                    }
                    function t() {
                        clearTimeout(r), o && m.emit("serviceState", {
                            type: "capi",
                            available: !0
                        }), o = !1;
                    }
                    var n = 6e4, r = void 0, o = !1;
                    return {
                        setAvailable: t,
                        checkOnline: e
                    };
                }();
                return m.ws.on("message", function(e) {
                    if (e.action) {
                        var n = e.action.toLowerCase();
                        if ("finished" === n && void 0 !== e.rev) return m.emit([ n, e.rev.toString() ], e), 
                        m.emit(n, e);
                        if ("cannot_find_synonym" === e.error) {
                            var r = {
                                synonyms: {
                                    meanings: []
                                },
                                action: "synonyms",
                                id: e.id,
                                type: "syn"
                            };
                            return m.emit("synonyms", r);
                        }
                        if ("error" === n) return t(e), m.emit("capiError", e);
                        if ("alert" === n && void 0 !== e.rev) return m.emit([ n, e.rev.toString() ], e), 
                        m.emit(n, e);
                        e.id && m.emit([ n, e.id ], e), m.emit(n, e);
                    }
                }), m.on("start", function(e) {
                    m.emit("socketStart"), c && console.log("Got START with sid %s", e.sid), e.sid && (m.options.sid = e.sid);
                }), m.ws.connect(), m.start(), m.ws.on("connect", function() {
                    m.emit("socketConnect"), h.setAvailable();
                }), m.ws.on("error", function(e) {
                    h.checkOnline(), "disconnected" !== e && (m.emit("socketError", e), d || (f++, m.emit("socketFailCount", f)), 
                    d = !0);
                }), m.ws.on("reconnect", function() {
                    m.start(), m.emit("socketReconnect"), h.setAvailable(), d && (m.emit("socketReconnectAfterError"), 
                    d = !1);
                }), m.ws.delegate(m, "disconnect"), m;
            }
        });
    }, {
        "@grammarly-npm/websocket": 18,
        emitter: "emitter",
        lodash: "lodash"
    } ],
    256: [ function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            if (e.length <= 4) return t;
            var r = o.textdiff(e, t);
            if (!r.from) return t;
            n = n || "b";
            var i = '<span class="' + n + '">', a = "</span>";
            return 1 === r.newFragment.length && r.from > 0 && e[r.from - 1] === r.newFragment && (r.newFragment = r.newFragment + r.newFragment, 
            r.from -= 1), 1 !== r.oldFragment.length || r.newFragment.length || t[r.from - 1] !== r.oldFragment || (r.newFragment = r.oldFragment, 
            r.from -= 1), r.newFragment.length > 3 ? t : t = e.substring(0, r.from) + i + r.newFragment + a + e.substring(r.to);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("@grammarly-npm/textdiff");
        n.differ = r;
    }, {
        "@grammarly-npm/textdiff": 16
    } ],
    257: [ function(e, t, n) {
        "use strict";
        function r() {
            var e = document.createElement("div");
            return e.setAttribute("contenteditable", "PLAINTEXT-ONLY"), "plaintext-only" === e.contentEditable;
        }
        function o(e, t) {
            t = t || "all";
            var n = [ 160, 10, 8, 32, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8203, 8287, 12288 ];
            e && (n = n.filter(function(t) {
                return e.indexOf(t) === -1;
            }));
            for (var r = [], o = 0; o < n.length; o++) r[o] = String.fromCharCode(n[o]);
            var i = "";
            switch (t) {
              case "single":
                break;

              case "all":
              default:
                i = "+";
            }
            return new RegExp("[" + r.join("") + "]" + i, "g");
        }
        function i(e) {
            return !e || (e = e.replace(n.QUOTE_RE, ""), n.SEPARATORS.indexOf(e) !== -1 || e.match(n.ALL_SPACE_RE));
        }
        function a(e, t, n) {
            var r = e.substring(t - 1, t), o = e.substring(n, n + 1);
            return i(r) && i(o) || t === n;
        }
        function s(e, t, n) {
            var r = e.substring(t, e.length), o = 0, a = "";
            if (0 === r.length) return n ? {
                inc: o,
                word: ""
            } : "";
            for (var s = ""; r.length > 0 && i(r[0]); ) s += r.substring(0, 1), r = r.substring(1, r.length), 
            o++;
            for (var c = 0; c < r.length; c++) {
                var l = r[c];
                if (i(l)) return n ? {
                    inc: o,
                    word: a,
                    sep: s
                } : a;
                a += l;
            }
            return n ? {
                inc: o,
                word: a,
                sep: s
            } : a;
        }
        function c(e, t) {
            for (var n = e.substring(0, t), r = ""; i(n[n.length - 1]) && n.length > 0; ) n = n.substring(0, n.length - 1);
            for (t = n.length - 1; t >= 0; ) {
                var o = n[t];
                if (i(o)) return r;
                r = o + r, t--;
            }
            return r;
        }
        function l(e, t) {
            var n = t, r = e.substr(n, 2), o = e.substr(n - 1, 2);
            for (o && o.match(h) && (t--, n = t, r = e.substr(n, 2)); r && !r.match(h); ) n++, 
            r = e.substr(n, 2);
            var i = n + 2;
            for (n = t, r = e.substring(n - 2, n); r && n - 2 > 0 && !r.match(h); ) n--, r = e.substring(n - 2, n);
            var a = n;
            return a - 2 <= 0 && (a = 0), {
                s: a,
                e: i
            };
        }
        function u(e, t) {
            for (var n = 0, r = t; void 0 !== e[r] && !i(e[r]); ) r++, n++;
            return n;
        }
        function d(e, t) {
            for (var n = 0, r = t; void 0 !== e[r] && !i(e[r]); ) r--, n++;
            return n;
        }
        function f(e, t) {
            if (!e || e === t) return {
                x: 0,
                y: 0
            };
            var n = {
                x: e.offsetLeft,
                y: e.offsetTop
            }, r = f(e.offsetParent, t);
            return n.x += r.x, n.y += r.y, n;
        }
        function p(e) {
            if (!e) return 0;
            var t = e.replace(/[\W\d]/gi, " ").trim().replace(/\s+/gi, " ").split(" ");
            return 1 === t.length && "" === t[0] ? 0 : t.length;
        }
        function m(e, t) {
            2 === t.length && t.push(t[1]);
            var n = 2;
            return e % 10 === 1 && e % 100 !== 11 && (n = 0), e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) && (n = 1), 
            t[n];
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n._f = function() {}, n.supportsPlaintextEditables = r, n.getSpaceConstant = o, 
        n.ALL_SPACE_RE = o(), n.SEPARATORS = ',.;:()§&$%!@#?*~+}{[]|/"`-<>…“”\n', n.QUOTE_RE = /["'”’‚‛‟„“]/g, 
        n.isSep = i, n.wordSeparated = a, n.getNextWord = s, n.getPrevWord = c;
        var h = /[!?.]\s|\n/g;
        n.getSentenceByPos = l, n.getNextSepOffset = u, n.getPrevSepOffset = d, n.getPos = f, 
        n.wordCount = p, n.declension = m;
    }, {} ],
    258: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/typeof"), i = r(o), a = e("babel-runtime/core-js/object/assign"), s = r(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("lodash"), l = e("lib/wrap"), u = e("../under"), d = e("./match-extensions"), f = e("./text-api"), p = e("./synonyms"), m = e("./track"), h = e("./editor-util"), g = e("lib/dom");
        n.GrammarlyEditor = function(e) {
            function t() {
                P.inputListener && P.inputListener.start(), P.dom && P.dom.start(), e.value && P.setText(e.value), 
                e.matches && P.addMatches(e.matches), P.api.update(P.currentText), P.check();
            }
            function n(e) {
                var t = "object" === ("undefined" == typeof e ? "undefined" : (0, i["default"])(e)) && e.id ? e.id : e, n = P.bySid(t);
                if (P._removedByServer.push(t), "object" === ("undefined" == typeof e ? "undefined" : (0, 
                i["default"])(e)) && e.id && L.rmMatchesBufferCache(e), n && (P.emit("serverRemove", n), 
                n.cancelServerRemove)) return void delete n.cancelServerRemove;
                if (n) return L.forceRemove(n);
                var r = P.matches.getRemoved()[t];
                r && (T && console.log("remove-already-removed-match"), L.forceRemove(r));
            }
            function r(e) {
                return j(e);
            }
            function o(e) {
                return e.tagName && R.indexOf(e.tagName.toLowerCase()) === -1 && "gmail_quote" !== e.className;
            }
            function a(e, t, n) {
                return "tmp_id" === n.id.toString() || (!!n.syn || t);
            }
            function b(e) {
                var t = {
                    matches: P.serializeMatches(P.matches.get(), !0),
                    editorId: P.id,
                    cursor: P.latestCursor,
                    socketId: P.api.ws.socketId,
                    api: P.api.getState(),
                    selectedMatchId: P.selectedMatch && P.selectedMatch.id
                };
                return P.getHtml && !e ? (0, s["default"])({}, t, {
                    html: P.getHtml(),
                    whiteSpace: P.el.__white_space
                }) : (0, s["default"])({}, t, {
                    text: P.getText(!0)
                });
            }
            function v(e) {
                P.clearData(), e.html && (P.el.__white_space = P.el.style.whiteSpace = e.whiteSpace || "normal"), 
                P.one("afterReplace", function() {
                    P.api.setState(e.api), P.addMatches(e.matches), e.cursor || (e.cursor = {
                        s: 0,
                        e: 0
                    }), P.isHtmlGhost || P.el.focus();
                    var t = P.getMatches().filter(function(e) {
                        return e.syn;
                    }).length > 0;
                    t && P.synonyms.registerRemove(), P.setCursor(e.cursor), P.latestCursor = e.cursor, 
                    P.render();
                }), void 0 !== e.html && P.setHtml ? P.setHtml(e.html) : P.setText(e.text);
            }
            function _() {
                N.checkPlagiarism(P.currentText);
            }
            function y(e, t) {
                N.synonyms(e, t);
            }
            function w() {
                I.plagiarismActive() && A();
            }
            function k() {
                B();
            }
            function E() {
                if (P.getText) {
                    var e = P.getText(), t = h.wordCount(e), n = t > 0 ? P.getFiltered().length / t : 0;
                    P.emit("track", {
                        type: "timing",
                        data: {
                            "performance:text_stats.error_rate": Math.round(1e3 * n) / 1e3,
                            "performance:text_stats.text_size_chars": e.length,
                            "performance:text_stats.text_size_words": t
                        }
                    });
                }
            }
            function C() {
                for (var e = P.el.querySelectorAll(".gr-alert"), t = e.length, n = 0; n < t; n++) {
                    var r = e[n], o = r.nextSibling;
                    o && 3 === o.nodeType && (r.__sentCorruptedUnderline || g.hasClass(r, "Punctuation") || o.textContent && o.textContent[0].match(/\w/) && (P.emit("corruptedUnderline", {
                        text: r.textContent,
                        id: r.id,
                        className: r.className,
                        siblingText: o.textContent.substring(0, 20)
                    }), r.__sentCorruptedUnderline = !0));
                }
                D = setTimeout(C, 5e3);
            }
            function x() {
                P.synonyms.fieldEnable();
            }
            function S() {
                P.api.close(), P.synonyms.disable(), clearTimeout(D);
            }
            var T = !e.silentLogs, N = f.createTextApi(e), P = u.createEditor((0, s["default"])({}, e, {
                api: N,
                isValidNode: o,
                isValidMatchForNode: a,
                editorType: e.editorType.value
            }));
            P.matchPrefix = e.matchPrefix;
            var j = e.filter || function(e) {
                return e;
            }, I = e.apps || {
                plagiarismActive: function() {
                    return !1;
                }
            }, A = c.throttle(_, e.plagiarismCheckDelay || 2e3), L = P.matches, M = d.createMatchExtensions({
                silentLogs: e.silentLogs,
                exposeRawMatch: e.exposeRawMatch,
                editor: P,
                matches: L
            }), O = "textarea" === e.editorType.value, R = [ "pre", "code", "blockquote" ], F = [ "gmail_quote" ];
            l.skipTag(c.union(l.skipTag() || [], R)), l.skipClass(c.union(l.skipClass() || [], F)), 
            c.extend(P, {
                checkPlagiarism: _,
                getSynonyms: y,
                filter: j,
                apps: I,
                matchFilter: r,
                synonyms: p.createSynonyms({
                    editor: P,
                    canRemove: e.canRemoveSynonym,
                    textareaWrapSelector: e.textareaWrapSelector,
                    animatorContainer: e.animatorContainer,
                    getAnimatorElPos: e.getAnimatorElPos,
                    exposeSynApi: e.exposeSynApi
                }),
                getState: b,
                setState: v,
                run: t,
                ot_alert_intersection: 0,
                isTextarea: O
            }, M), P.on("change", w), P.on("input", k), P.on("keydown", k), P.on("exit", S), 
            P.on("fieldEnable", x), P.on("startInvalidateNode", N.wsPause), P.on("endInvalidateNode", N.wsPlay), 
            N.delegate(P, "plagiarismChecked"), N.delegate(P, "capiError"), N.delegate(P, "serviceState"), 
            N.delegate(P, "socketConnect"), N.delegate(P, "socketStart"), N.delegate(P, "socketReconnect"), 
            N.delegate(P, "socketReconnectAfterError"), N.delegate(P, "socketFailCount"), N.delegate(P, "disconnect"), 
            N.delegate(P, "socketError"), N.delegate(P, "frequent_runtime_error"), N.delegate(P, "too_many_runtime_error"), 
            N.delegate(P, "frequent_not_authorized_error"), N.delegate(P, "finished"), N.on("remove", n), 
            m.track(P), l.setOnError(function(e) {
                P.emit("track", {
                    type: "increment",
                    key: "wrap_error." + e
                });
            });
            var D = void 0;
            O || C();
            var B = c.debounce(E, 5e3);
            e.autorun && t();
            var U = P.api.feedback;
            return P.api.feedback = function(e, t) {
                return U(e, t);
            }, P;
        }, n.getUpgradeUrlFromMatches = function(e) {
            function t(e) {
                var t = "";
                return c.each(e, function(e, n) {
                    "" !== t && (t += "&"), t += encodeURI(String(n)) + "=" + e;
                }), t;
            }
            function n(e) {
                var t = r(e), n = {};
                return c.each(t, function(e) {
                    var t = e.group, r = e.category.replace("_", ""), o = [ t, r ].join(":");
                    void 0 === n[o] && (n[o] = 0), n[o] += 1;
                }), n;
            }
            function r(e) {
                return c.filter(e, function(e) {
                    return e.hidden;
                });
            }
            var o = n(e.matches), i = e.returnUrl, a = e.queryParams || {}, s = {}, l = {};
            return i && (s.return_url = encodeURIComponent(i)), e.appType && (s.app_type = e.appType), 
            l = c.extend(o, s, a), e.baseUrl + "?" + t(l);
        };
    }, {
        "../under": 314,
        "./editor-util": 257,
        "./match-extensions": 259,
        "./synonyms": 262,
        "./text-api": 263,
        "./track": 264,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/helpers/typeof": 42,
        "lib/dom": 215,
        "lib/wrap": 324,
        lodash: "lodash"
    } ],
    259: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/json/stringify"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("lodash"), s = e("./editor-util"), c = e("./match-transformer");
        n.createMatchExtensions = function(e) {
            function t(e, t) {
                var n = e.syn ? " gr-syn" : " gr-alert";
                return e._e - e._s === 1 && "a" !== t.substring(e._s, e._e).toLowerCase() && (n += " gr_tiny"), 
                e.selected && (n += " sel"), n += e.gramm ? " gr_gramm" : " gr_spell", e.replaced && (n += " gr_replaced"), 
                e.notClickableTitle && "ContextualSpelling" !== e.group && (n += " gr_hide"), e.free || (n += " gr_premium"), 
                n;
            }
            function n(e, t) {
                return e.skipUpdatePos = "Plagiarism" === e.category || "syn" === e.type, c.processMatch(e, t, {
                    exposeRawMatch: P
                }), "syn" !== e.type || (N.emit("syn", e), !1);
            }
            function r(e) {
                return a.find(T.get(), {
                    sid: e.toString()
                });
            }
            function o(e, t) {
                for (var n = [], r = 0; r < e.length; r++) {
                    var o = e[r];
                    "ContextualSpelling" === o.group && n.push(s.getSentenceByPos(t, o.s));
                }
                return e.filter(function(e) {
                    if ("ContextualSpelling" === e.group || "Plagiarism" === e.group || e.syn) return !0;
                    for (var t = 0; t < n.length; t++) {
                        var r = n[t];
                        if (e.s > r.s && e.s < r.e) return !1;
                    }
                    return !0;
                });
            }
            function l(e) {
                var t = T.get();
                if ("Plagiarism" !== e.category) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        if (r.category === e.category && "Plagiarism" !== r.category) {
                            var o = T.isIntersected(e, r) && v(e, r);
                            if (o) return r;
                        }
                    }
                    return !1;
                }
            }
            function u(e) {
                function t(e, t) {
                    return e.s === t.s && e.e === t.e || (e.s === t.s || e.e === t.e) && e.value.replace(/\s+/g, "") === t.value.replace(/\s+/g, "");
                }
                var n = T.get();
                if ("Plagiarism" !== e.category) for (var r = 0; r < n.length; r++) {
                    var o = n[r];
                    if (t(e, o)) {
                        if (e.priority < o.priority) return -1;
                        if (e.priority > o.priority) return r;
                    }
                }
            }
            function d(e, t) {
                var n = T.get(), r = u(e);
                if (r === -1) return S && console.log("%c skip adding match with lower priority", "color:rgba(239, 110, 105, 0.8)", e.value, e), 
                !1;
                r && r > -1 && (S && console.log("%c remove same match with lower priority", "color:rgba(239, 110, 105, 0.8)", n[r].value, n[r]), 
                n.splice(r, 1));
                var o = l(e);
                if (o) return S && console.log("%c remove, match of same category is overlaping with", "color:rgba(239, 110, 105, 0.8)", e.value, o), 
                T.matchUpdater.extendWithoutAdding(n, e), !1;
                var i = e.v.indexOf(" ") !== -1, c = e.v.indexOf("'") !== -1 || e.v.indexOf("’") !== -1, d = ",," === e.v || ".." === e.v;
                if (!(a.isUndefined(e.rFirst) || s.wordSeparated(t, e.s, e.e) || i || s.isSep(e.v.trim()) || c || d)) return S && console.log("%c match is part of word '%s'", "color:rgba(239, 110, 105, 0.8)", e.value, e), 
                T.emit("match_is_part_of_word"), !1;
                if ("IgnoredPatterns" === e.category || "IgnoredWords" === e.category) return S && console.log("%c remove ignored", "color:rgba(239, 110, 105, 0.8)", e), 
                !1;
                var p = t.substring(e.s, e.e);
                if (e.todo.indexOf("add a comma") !== -1 && ("," === t.substring(e.e, e.e + 1) || "," === p[p.length - 1])) return e.removed = !0, 
                S && console.log("%c lost add a comma match, comma is here", "color:rgba(239, 110, 105, 0.8)", e), 
                !1;
                if (e.todo.indexOf("add an article") !== -1 && (" an" === p || " the" === p || " a" === p)) return S && console.log("%c lost add an article match", "color:rgba(239, 110, 105, 0.8)", e), 
                !1;
                var m = s.getPrevWord(t, e.s) + " " + e.value, h = m === e.rFirst || m === e.secondArticle;
                if (h) return S && console.log("%c lost add an article match, article already fixed", "color:rgba(239, 110, 105, 0.8)", e), 
                !1;
                if (f(e)) return S && console.log("skip AccidentallyConfused match see https://grammarly.atlassian.net/browse/FT-1172"), 
                !1;
                var g = T.tryToAdd(e, t);
                return !!g;
            }
            function f(e) {
                for (var t = T.get(), n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (e.s === r.s && e.e === r.e && "AccidentallyConfused" === e.category && ("CommonlyConfused" === r.category || "Misspelled" === r.category)) return !0;
                }
                return !1;
            }
            function p(e, t, n, r) {
                var o = e.value, i = !s.wordSeparated(t, n, r), a = " " === o[0] && " " === o[o.length - 1], c = o.indexOf(",") !== -1, l = o.indexOf(";") !== -1, u = j.indexOf(o) !== -1, d = e.rFirst === t.substring(n, r + 1), f = s.getPrevWord(t, n) + " " + o, p = f === e.rFirst || f === e.secondArticle, m = "ArticleUse" === e.category && e.todo.indexOf("change") !== -1 && e.next !== s.getNextWord(t, r), h = "Plagiarism" === e.category, g = "ClosingPunctuation" === e.category;
                return i && !a && !c && !u && !l && !g && !h || d || p || m;
            }
            function m(e) {
                var t = N.getText(), n = T.tryToAdd(e, t);
                n && (N.addMethodsToMatch(e), N.saveCursor(), N.render(), N.restoreCursor(), N.emit("addedSynonym", e));
            }
            function h() {
                N.saveCursor(), T.get().forEach(function(e) {
                    e.syn && N.emit("removeSyn", e);
                }), g(), N.dom && N.dom.removeBySelector(".gr-syn"), N.restoreCursor();
            }
            function g() {
                for (var e = T.get(), t = 0; t < e.length; t++) e[t].deselect(), e[t].syn && (T.remove(e[t]), 
                t--);
            }
            function b(e, t, n) {
                e.syn && (N.latestCursor.s = N.latestCursor.e = N.latestCursor.s - t + n.length);
            }
            function v(e, t) {
                return e.rFirst === t.rFirst && (0, i["default"])(e.r) === (0, i["default"])(t.r);
            }
            function _(e, t, n) {
                return !e.syn && !t.syn && (n && e.v.toLowerCase() === t.v.toLowerCase() && e.category === t.category && v(e, t));
            }
            function y(e, t) {
                e.sid = t.id.toString(), e.sentence_no = t.sentence_no, e.header = t.header, e.cls = t.cls, 
                e.details = t.details, e.explanation = t.explanation, e.todo = t.todo, e.notClickableTitle = t.notClickableTitle, 
                e.showTitle = t.showTitle, S && console.log("updated match with server id", e);
            }
            function w(e) {
                return !e.syn;
            }
            function k(e) {
                return "Plagiarism" === e.category ? {
                    next: !0
                } : {
                    remove: !1
                };
            }
            function E(e, t) {
                A(e, t), delete e.selected, e.serverRemove || T.addRemoved(e);
            }
            function C(e) {
                return Boolean(e.addedToDict || e.ignored || e.serverRemove);
            }
            function x(e, t) {
                return e = e || T.get(), e = e.filter(function(e) {
                    return !e.replaced;
                }), t || (e = e.filter(function(e) {
                    return !e.syn;
                })), e = e.map(function(e) {
                    var t = {}, n = e;
                    for (var r in e) ("r" === r || "origReplacements" === r || "rHtml" === r || "examples" === r || "references" === r || "syn" === r || "synonyms" === r || "transforms" === r || "rawMatch" === r || !a.isFunction(n[r]) && !a.isObject(n[r]) && "selected" !== r && "inDom" !== r || a.isArray(n[r]) || "header" === r) && (t[r] = n[r]);
                    return t;
                });
            }
            var S = !e.silentLogs, T = e.matches, N = e.editor, P = e.exposeRawMatch, j = a.map(",.;:", function(e) {
                return e + " ";
            }), I = {
                getMatchClass: t,
                processMatch: n,
                beforeReplace: b,
                processRemove: k,
                matchRemoved: p,
                matchesEqual: _,
                extendMatch: y,
                canAddRemovedMatch: C,
                canShiftMatchEnd: w,
                removeSyn: h,
                tryToAdd: d,
                serializeMatches: x,
                addSyn: m,
                filterBySpelling: o,
                bySid: r
            }, A = T.remove;
            return T.remove = E, I;
        };
    }, {
        "./editor-util": 257,
        "./match-transformer": 260,
        "babel-runtime/core-js/json/stringify": 22,
        lodash: "lodash"
    } ],
    260: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            var t = /^(?:(.*): ){1}(.+)$/, n = [];
            if (!e) return [];
            for (var r = T.createEl("<div>" + e + "</div>", document), o = r.querySelectorAll("p"), i = 0; i < o.length; i++) {
                for (var a = o[i].querySelectorAll("span"), s = [], c = 0; c < a.length; c++) {
                    var l = a[c], u = l.innerHTML, d = "Comment", f = l.classList[0] || "grey", p = u.match(t);
                    p && (u = p[2], d = p[1]), s.push({
                        type: d,
                        color: f,
                        example: u
                    });
                }
                s.length && n.push(s);
            }
            return n;
        }
        function i(e) {
            var t = e.split(/\n|<br\/?>/gi);
            t.splice(0, 4);
            for (var n = [], r = 0; r < t.length; r++) {
                var o = t[r], i = o.match(/<strong>(.*?)\:<\/strong>(.*?)$/i), a = void 0, s = void 0;
                i && (a = i[1], s = i[2].replace("_br", "")), n.push({
                    type: a,
                    descr: s
                });
            }
            return n;
        }
        function a(e) {
            return e.details || "";
        }
        function s(e) {
            return e.explanation && e.explanation.replace(/<\/?p[^>]*>/g, "").trim();
        }
        function c(e) {
            "Plagiarism" === e.category && (e.references = i(e.details), e.explanation = "A part of your paper is matching some text from the Web. Please make sure that this text is properly referenced.", 
            e.header = "Unoriginal text: " + P.wordCount(e.text) + " words", e.href = e.extra_properties.url || "", 
            e.href_title = (e.extra_properties.url || "").replace("https://", "").replace("http://", ""));
        }
        function l(e, t) {
            var n = "", r = !1;
            if (e && 0 !== e.length) {
                t.onlyDel = !0;
                for (var o = 0; o < e.length; o++) {
                    var i = e[o], a = e[o + 1] && e[o + 1].ins, s = e[o + 1] && e[o + 1].del;
                    if (x.isUndefined(i.sep)) {
                        var c = void 0;
                        if (i.ins) {
                            t.onlyDel = !1, r && (n += "<span class='arr'> → </span>");
                            var l = "";
                            ".,:;_".indexOf(i.ins) !== -1 && (l = "thin"), c = i.ins, r && (c = N.differ(r, i.ins), 
                            t.del = r, r = null), n += "<span class='ins " + l + "'>" + c + "</span>";
                        }
                        if (i.del) {
                            if (i.del.length > 1) {
                                c = i.del, a && (c = N.differ(a, i.del));
                                var u = "del ";
                                i.del.match(/["'”][.,;]/) && (u += "del-qdot "), i.del.match(/,,/) && (u = "red sign double-commas");
                                var d = i.del.replace(/,/g, "").split(" ").filter(Boolean) || [];
                                if (i.del.match(/^,(.*?),$/) && i.del.length > 2 && d.length > 1) {
                                    u = "red";
                                    var f = "<span class='sign " + u + "'>,</span>";
                                    n = "<span class='" + u + "'>" + (f + d.shift()) + "..." + (d.pop() + f) + "</span>", 
                                    t.onlyDel = !1;
                                    break;
                                }
                                n += "<span class='" + u + "'>" + c + "</span>";
                            } else {
                                var p = i.del.match(/[a-z]/i) ? " del del-letter" : " sign";
                                "’" === i.del && (p += " apostrophe"), n += "<span class='red" + p + "'>" + i.del + "</span>";
                            }
                            r = i.del;
                        }
                        var m = i.w;
                        if (m) {
                            var h = "word";
                            s && (h += " del-word"), a && (h += " ins-word"), m = "<span class='" + h + "'>" + m + "</span>";
                        }
                        m && (n += m);
                    } else n += "<span class='arr'> → </span>", r = null;
                }
                return n;
            }
        }
        function u(e, t) {
            if (t) {
                var n = x.template("<span class='replacement'><span class='btn-r' data-value='<%- r %>'><%= title %></span></span>"), r = "";
                return 2 === t.length && t[0].del && t[1].ins && (r = x.template("<span><span class='ins sec'><%= ins %></span></span>")({
                    ins: t[1].ins
                })), 3 === t.length && t[0].del && t[2].ins && (r = x.template("<span><span class='ins sec'><%= ins %></span></span>")({
                    ins: t[2].ins
                })), t[0].w && (r = x.template("<span><%= w %><span class='ins sec'><%= ins %></span></span>")({
                    w: t[0].w,
                    ins: t[1].ins
                })), t[0].ins && (r = x.template("<span><span class='ins sec'><%= ins %></span><%= w %></span>")({
                    ins: t[0].ins,
                    w: t[1].w
                })), n({
                    r: e,
                    title: r
                });
            }
        }
        function d(e, t) {
            var n = [], r = m(e[0]);
            r || (t.cls += " replaceWithoutSep");
            for (var o = 1; o < e.length; o++) {
                var i = f(e[o], r);
                n.push({
                    label: l(i, t) || t.origReplacements[o],
                    value: t.origReplacements[o]
                });
            }
            return n;
        }
        function f(e, t) {
            var n = [], r = !1, o = !1;
            return n = e.filter(function(e) {
                return t ? r ? e : (e.del && (o = !0), void ((e.sep || o && e.ins) && (r = !0))) : e;
            });
        }
        function p(e, t) {
            for (var n = "", r = x.template("<span class='replacement replacement-<%= index %>'><span class='btn-r' data-value='<%- r %>'><span><%= parts %></span></span></span>"), o = [], i = [], a = !1, s = !1, c = void 0, u = 0; u < e[0].length; u++) {
                var d = e[0][u];
                if (i.push(d), d.ins && (s = !0), d.sep || c && d.ins) {
                    a = !0;
                    break;
                }
                d.del && (c = !0);
            }
            var p = 0;
            n = l(i, t) || "", a || (p++, n = r({
                r: t.origReplacements[0],
                parts: l(i, t),
                index: 0
            })), a && s && p++;
            var m = e[0] && e[0][1] && e[0][1].del;
            if (m && m.match(/^,(.*?),$/) && m.length > 2) return n;
            for (var h = p; h < e.length; h++) {
                var g = f(e[h], a);
                o.push(r({
                    r: t.origReplacements[h],
                    parts: l(g, t) || t.origReplacements[h],
                    index: h
                }));
            }
            return n + o.join("");
        }
        function m(e) {
            if (!e) return !1;
            for (var t = !1, n = 0; n < e.length; n++) {
                if (e[n].sep || e[n].ins && t) return !0;
                e[n].del && (t = !0);
            }
            return !1;
        }
        function h(e, t) {
            if ((e.length > 2 || m(e[0]) || t.longTitle) && "Articles" !== t.category && !t.showTitle) return t.cls += " multiReplace", 
            m(e[0]) || (t.cls += " replaceWithoutSep"), t.multiReplace = !0, p(e, t);
            if (1 === e.length || t.showTitle) return l(e[0], t);
            if (2 === e.length || "Articles" === t.category || "Determiners" === t.category) {
                t.cls += " doubleReplace", t.doubleReplace = !0;
                var n = u(t.rFirst, e[0]);
                return (n || "") + u(t.r[0], e[1]);
            }
            return "";
        }
        function g(e) {
            for (var t = e.del, n = 0; n < e.r.length; n++) {
                var r = e.r[n];
                e.r[n] = N.differ(t, r);
            }
        }
        function b(e) {
            e = e.replace("→", "<span class='sep'></span>");
            for (var t = T.createEl("<div>" + e + "</div>"), n = [], r = 0; r < t.childNodes.length; r++) {
                var o = t.childNodes[r];
                3 !== o.nodeType ? (o.classList.contains("sep") && n.push({
                    sep: !0
                }), o.classList.contains("gr_grammar_ins") && n.push({
                    ins: o.innerHTML
                }), o.classList.contains("gr_grammar_del") && n.push({
                    del: o.innerHTML
                })) : n.push({
                    w: o.nodeValue
                });
            }
            return n;
        }
        function v(e) {
            if (e.notClickableTitle && !e.showTitle) return [];
            if (!e.transforms) return [];
            var t = e.transforms;
            return t.map(function(e) {
                return b(e);
            });
        }
        function _(e) {
            var t = e.title, n = e.transforms;
            if (n && n[0] && 2 === n[0].length) {
                var r = n[0];
                (r[0].w && r[1].ins || r[1].w && r[0].ins) && (e.cls += " only-ins"), (r[0].w && r[1].del || r[1].w && r[0].del) && (e.cls += " only-del"), 
                (r[0].ins && r[1].del || r[1].ins && r[0].del) && (e.cls += " ins-del");
            }
            if (n && n[0]) {
                var o = n[0].reduce(function(e, t) {
                    var n = t[(0, C["default"])(t).shift()].toString() || "";
                    return Math.max(e, n.length);
                }, 0);
                o > 20 && (e.notClickableTitle = !0, e.longTitle = !0, e.replacementHint = k("Click to " + e.todo), 
                n = n.map(function(e) {
                    return e.filter(function(e) {
                        return e.ins;
                    });
                }));
            }
            return t = h(n, e), n.length && (e.rHtml = d(n, e)), t || (t = e.v), e.replaceInCard && (e.replaceInCard = t), 
            e.notClickableTitle && (t = e.title), t;
        }
        function y(e) {
            delete e.text, delete e.rid, delete e.action, delete e.undone;
        }
        function w(e, t, n) {
            n && n.exposeRawMatch && (e.rawMatch = x.cloneDeep(e)), e.id = (e.id || S.guid()).toString(), 
            e.s = e.begin, e.e = e.end, e._s = e.s, e._e = e.e, "Plagiarism" === e.group && (e.highlightBegin = e.s, 
            e.highlightEnd = e.e), void 0 !== e.highlightBegin && void 0 !== e.highlightEnd && e.highlightBegin === e.highlightEnd && e.text.length > 0 && (e.highlightBegin = e.s, 
            e.highlightEnd = e.e), void 0 !== e.highlightBegin && (e._s = e.highlightBegin), 
            void 0 !== e.highlightEnd && (e._e = e.highlightEnd), e.sd = e._s - e.s, e.ed = e._e - e.e, 
            e._value = t.substring(e._s, e._e), "Spelling" === e.group && (e.group = "ContextualSpelling");
            var r = e.extra_properties && "true" === e.extra_properties.enhancement;
            e.cls = e.group, e.origReplacements = (e.replacements || []).concat(), e.rFirst = e.replacements && !r && e.replacements.splice(0, 1)[0], 
            e.rFirst = e.rFirst && e.rFirst.replace(/\s+/g, " "), e.noReplacments = e.rFirst === !1 || void 0 === e.rFirst, 
            e.showTitle = e.noReplacments || e.extra_properties && "true" === e.extra_properties.show_title, 
            e.replaceInCard = !e.noReplacments && e.extra_properties && "true" === e.extra_properties.show_title, 
            e.didYouMean = !e.noReplacments && e.extra_properties && "true" === e.extra_properties.did_you_mean, 
            e.enhancement = e.replacements && e.replacements.length && r, e.notClickableTitle = e.noReplacments || e.showTitle || e.didYouMean, 
            e.priority = parseInt(String(e.extra_properties && e.extra_properties.priority || 0), 10), 
            e.r = e.replacements || [], e.rHtml = e.rHtml || [], e.v = e.text, e.oldVal = e.v, 
            e.sid = e.id.toString(), e.originalTransforms = e.transforms || [], e.transforms = v(e), 
            e.header = _(e), e.details = a(e), e.originalTodo = e.todo || "", e.originalExamples = e.examples || "", 
            e.examples = o(e.originalExamples), e.explanation = s(e), c(e), e.l = e.e - e.s, 
            e.multi = e.r.length > 0, e.spell = "ContextualSpelling" === e.group, e.gramm = !e.spell, 
            e.showAcceptButton = "ContextualSpelling" !== e.group && e.noReplacments && (e.replacements || []).length < 1, 
            e.showReplacements = Boolean("Misspelled" === e.category && e.r.length), e.showAddToDictionary = Boolean(e.spell && "General" === e.point && ("Misspelled" === e.category || "Unknown" === e.category)), 
            e.showReplacementsInText = !0, e.multiReplace && (e.showReplacements = !0, e.showReplacementsInText = !1, 
            e.showReplacementsOnTop = !0), e.cls && e.cls.indexOf("doubleReplace") !== -1 && (e.showReplacements = !1, 
            e.showReplacementsInText = !1), (e.showTitle || e.longTitle) && (e.showReplacements = !1, 
            e.showReplacementsOnTop = !1, e.showReplacementsInText = !1), e.showReplacements && e.del && g(e), 
            e.enhancement && (e.category = "_" + e.category, e.title = P.declension(e.r.length, [ "Suggested enhancement:", "Suggested enhancements:" ])), 
            "spelling" === e.todo && (e.todo = "correct"), ("" === e.todo && !e.rFirst || "Plagiarism" === e.category || e.notClickableTitle) && (e.todo = "expand card"), 
            "" === e.todo && e.rFirst && (e.todo = "correct"), e.value = e.v, e.todo = k("Click to " + e.todo), 
            y(e);
        }
        function k(e) {
            var t = document.createElement("div");
            return t.innerHTML = e, t.textContent;
        }
        var E = e("babel-runtime/core-js/object/keys"), C = r(E);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var x = e("lodash"), S = e("../util"), T = e("../dom"), N = e("./differ"), P = e("./editor-util");
        n.examples = o, n.header = _, n.processMatch = w;
    }, {
        "../dom": 215,
        "../util": 322,
        "./differ": 256,
        "./editor-util": 257,
        "babel-runtime/core-js/object/keys": 29,
        lodash: "lodash"
    } ],
    261: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../dom");
        n.SelectionAnimator = function(e) {
            function t(t, o) {
                if (n(), 0 !== t.length) {
                    var l = t[0], u = void 0;
                    if (c = t[t.length - 1] || l, s = "g-selection-anim " + e.editor.matchPrefix, a = l.ownerDocument.createElement("div"), 
                    a.className = s, e.getAnimatorElPos) u = e.getAnimatorElPos(l); else if (o) {
                        var d = l.ownerDocument.querySelector(o);
                        if (d) {
                            var f = l.getBoundingClientRect(), p = c.getBoundingClientRect(), m = d.getBoundingClientRect();
                            u = {
                                left: f.left - m.left,
                                right: p.right - m.right,
                                top: f.top - m.top,
                                bottom: f.bottom - m.bottom,
                                width: p.right - f.left,
                                height: f.height
                            };
                        }
                    } else u = t[0].getBoundingClientRect();
                    if (u) {
                        r.css(a, {
                            top: u.top + u.height,
                            left: u.left,
                            width: 0
                        });
                        var h = Math.ceil(u.width / 8), g = u.width - h;
                        a.setAttribute("data-width", String(e.editor.matchPrefix ? Math.ceil(u.width) : u.width)), 
                        e.animatorContainer.appendChild(a), setTimeout(function() {
                            a.style.width = g + "px";
                        }, 10);
                    }
                    i.el = a;
                }
            }
            function n() {
                for (var t = e.animatorContainer ? e.animatorContainer.ownerDocument : document, n = t.querySelectorAll(".g-selection-anim"), r = n.length, o = 0; o < r; o++) {
                    var i = n[o];
                    i.parentNode && i.parentNode.removeChild(n[o]);
                }
            }
            function o() {
                if (a) return a.getAttribute("data-width") ? void r.css(a, {
                    webkitTransitionDuration: "0.2s",
                    MozTransitionDuration: "0.2s",
                    transitionDuration: "0.2s",
                    width: parseInt(a.getAttribute("data-width"), 10)
                }) : n();
            }
            var i = {
                animate: t,
                remove: n,
                complete: o,
                el: document.documentElement
            }, a = void 0, s = void 0, c = void 0;
            return i;
        };
    }, {
        "../dom": 215
    } ],
    262: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("./selection-animator"), o = e("../util"), i = e("../dom"), a = e("lib/wrap"), s = e("emitter"), c = e("lodash");
        n.createSynonyms = function(e) {
            function t() {
                i.listen(g, "dblclick", d);
            }
            function n() {
                u(), i.unlisten(g, "dblclick", d);
            }
            function l(e) {
                _.animate([ e.getEl() ], y), setTimeout(_.complete, 120);
            }
            function u() {
                _.remove();
            }
            function d(e) {
                h.selectedMatch && h.selectedMatch.deselect();
                var t = h.getSelection(), n = t.value;
                if (/^\s?[a-z']+\s?$/i.test(n) && !(n.length < 2)) {
                    if (!h.isTextarea) {
                        for (var r = h.el.ownerDocument.getSelection().anchorNode || e.target.parentNode, o = a.skipClass() || [], s = a.skipTag() || [], c = 0; c < o.length; c++) s.push("." + o[c]);
                        if (r.tagName || (r = r.parentNode), i.matchesSelector(r, s.join(","))) return;
                    }
                    h.getSynonyms(t.s, n), p(t), f();
                }
            }
            function f() {
                function t(n) {
                    n.isTrigger || 0 === n.clientX || e.canRemove(n.target) && (u(), i.unlisten(v.body, "click", t), 
                    i.unlisten(v.body, "input", t), i.unlisten(v.body, "keydown", t), c.find(h.getMatches(), {
                        syn: !0
                    }) && (h.removeSyn(), h.emit("rendered")));
                }
                i.listen(v.body, "click", t), i.listen(v.body, "input", t), i.listen(v.body, "keydown", t);
            }
            function p(e) {
                var t = e.s, n = e.e, r = e.value;
                if (r.indexOf(" ") === r.length - 1 && (n -= 1, r = e.text.substr(t, n - t)), w = e, 
                h.dom) {
                    var o = h.dom.renderRange({
                        s: t,
                        e: n
                    });
                    _.animate(o, y);
                    for (var i = o.length, s = 0; s < i; s++) a.unwrap(o[s]);
                    h.setCursor(e);
                }
            }
            function m(e) {
                _.complete();
                var t = w.s, n = w.e, r = w.value;
                return h.getSelection().value !== r ? void console.log("selection changed") : (r.indexOf(" ") === r.length - 1 && (n -= 1, 
                r = w.text.substr(t, n - t)), e.error ? console.warn("Error occured: ", e.error) : (c.extend(e, {
                    app: "synonyms",
                    addReplace: !0,
                    cls: "Synonyms",
                    syn: !0,
                    expanded: !0,
                    begin: t,
                    end: n,
                    highlightBegin: t,
                    highlightEnd: n,
                    id: o.guid(),
                    s: t,
                    e: n,
                    _s: t,
                    _e: n,
                    ed: 0,
                    sd: 0,
                    l: n - t,
                    auto: !1,
                    v: r,
                    serverRemove: !0,
                    value: r,
                    oldVal: r,
                    animEl: _.el,
                    todo: ""
                }), b && c.extend(e, {
                    removeUnderline: u
                }), h.removeSyn(), void h.addSyn(e)));
            }
            var h = e.editor, g = e.editor.el, b = e.exposeSynApi, v = g.ownerDocument, _ = r.SelectionAnimator({
                editor: e.editor,
                getAnimatorElPos: e.getAnimatorElPos,
                animatorContainer: e.animatorContainer
            });
            e.canRemove = e.canRemove || function(e) {
                return !1;
            };
            var y = e.textareaWrapSelector || "#editor .svg-wrap";
            i.listen(g, "dblclick", d);
            var w = void 0;
            h.on("syn", m);
            var k = s({
                completeAnimation: l,
                removeUnderline: u,
                registerRemove: f,
                disable: n,
                fieldEnable: t
            });
            return k;
        };
    }, {
        "../dom": 215,
        "../util": 322,
        "./selection-animator": 261,
        emitter: "emitter",
        "lib/wrap": 324,
        lodash: "lodash"
    } ],
    263: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/json/stringify"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("lodash"), s = e("@grammarly-npm/changesets"), c = e("./capi");
        n.createTextApi = function(e) {
            function t(e) {
                if (e !== E.text) {
                    var t = s.diff(E.text, e);
                    E.text = e, t.length && E.changes.push(t);
                }
            }
            function n() {
                E.changes = [], E.text = "", E.sentRev = 0, k.rev = 0;
            }
            function r() {
                var e = E.text;
                n(), t(e), b();
            }
            function o() {
                return {
                    changes: E.changes.map(function(e) {
                        return e.pack();
                    }),
                    text: E.text,
                    sentRev: E.sentRev
                };
            }
            function l(e) {
                E.text = e.text, E.changes = e.changes.map(function(e) {
                    return s.unpack(e);
                }), E.sentRev = e.sentRev, k.rev = e.sentRev;
            }
            function u(e) {
                _ && console.log("MIDDLE LOG: finished: " + (0, i["default"])(e));
                var t = e.removed || [];
                t.forEach(function(e) {
                    return E.emit("remove", e);
                }), E.emit("finish", e);
            }
            function d(e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    n.begin = n.s, n.end = n.e, n.highlightBegin = n._s, n.highlightEnd = n._e, p(n), 
                    n.s = n.begin, n.e = n.end, n._s = n.highlightBegin, n._e = n.highlightEnd;
                }
            }
            function f(e, t) {
                _ && console.log("MIDDLE LOG: received match: " + (0, i["default"])(t), e, E.changes.length), 
                p(t), t.type = e, E.emit("add", t);
            }
            function p(e) {
                for (var t = e.begin, n = e.rev + 1; n < E.changes.length; n++) m(E.changes[n], e);
                e.rev = E.changes.length - 1, e.begin !== t && _ && console.log("DIFF", e), e.begin > E.text.length && (_ && console.log("match offset error", e), 
                E.emit("match-has-wrong-revision", e));
            }
            function m(e, t) {
                e.sequencify().forEach(function(e) {
                    h(e, t, "begin", "end"), h(e, t, "highlightBegin", "highlightEnd");
                });
            }
            function h(e, t, n, r) {
                e.pos + e.len >= t[n] && e.pos + e.len < t[r] && E.emit("ot_alert_intersection"), 
                "+" === e.type ? (t[n] < 0 || e.pos <= t[n]) && (t[n] += e.len, t[r] += e.len) : "-" === e.type && e.pos < t[n] && (t[n] -= e.len, 
                t[r] -= e.len);
            }
            function g(e) {
                E.emit("sending"), k.plagiarism(e, function() {
                    return E.emit("plagiarismChecked");
                });
            }
            function b() {
                var t = E.changes.slice(E.sentRev).map(function(e) {
                    return e.pack();
                });
                if (t.length) {
                    E.emit("sending");
                    var n = {};
                    e.extendParams && e.extendParams(n), k.submitOt(t, E.changes.length - 1, n, u), 
                    E.sentRev = E.changes.length;
                }
            }
            function v() {
                w().then(function(e) {
                    k.sendContainerId(e);
                })["catch"](function(e) {
                    _ && console.error("Cannot send containerId", e);
                });
            }
            var _ = !e.silentLogs, y = e.capi || c.capi.createClient, w = e.getContainerId, k = y({
                sid: e.sid,
                docid: e.docid,
                createWs: e.createWs,
                url: e.capiUrl,
                dialect: e.dialect,
                silentLogs: e.silentLogs
            });
            k.on("alert", f.bind(null, "error")), k.on("synonyms", f.bind(null, "syn")), k.on("socketReconnect", r), 
            k.on("disconnect", n), k.on("socketStart", v);
            var E = a.extend({
                text: "",
                changes: [],
                sentRev: 0,
                send: b,
                update: t,
                updateMatchesToCurrentRevision: d,
                updateMatch: p,
                restart: r,
                reset: n,
                checkPlagiarism: g,
                getState: o,
                setState: l,
                onadd: f,
                onfinish: u
            }, k);
            return E;
        };
    }, {
        "./capi": 255,
        "@grammarly-npm/changesets": 1,
        "babel-runtime/core-js/json/stringify": 22,
        lodash: "lodash"
    } ],
    264: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/keys"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.track = function(e) {
            function t(e) {
                return e && c[e] && c[e].request ? Date.now() - c[e].request : 0;
            }
            function n(t) {
                var n = e.id + t.rev;
                l && console.log("SUBMIT_OT", n), c[n] = {
                    request: Date.now()
                };
            }
            function r(n) {
                var r = e.id + n.rev, o = r + n.id, i = t(r);
                l && console.log("GET_ALERT", i), c[o] = {
                    time: Date.now(),
                    type: "first"
                }, c[r] && (c[r].first ? (c[r].last = i, c[o].type = "last") : c[r].first = i);
            }
            function o(t) {
                var n = e.id + t.rev, r = c[n], o = 0 === t.rev ? "first." : "", i = {};
                r && r.first && (i["performance:checks." + o + "request_to_first_response"] = r.first, 
                r.last && (i["checks." + o + "request_to_last_response:performance"] = r.last), 
                e.emit("track", {
                    type: "timing",
                    data: i
                }), l && console.log("finish:", t.rev, e.id, i));
            }
            function a() {
                var t = e.getMatches().filter(function(t) {
                    return !t.tracked && t.renderTs && c[e.id + t.rev + t.id] && c[e.id + t.rev];
                }).reduce(function(t, n) {
                    var r = c[e.id + n.rev + n.id], o = r.type, i = n.renderTs - c[e.id + n.rev].request, a = 0 === n.rev ? "first." : "";
                    return n.tracked = !0, t["performance:checks." + a + "request_to_" + o + "_render"] = i, 
                    t["performance:checks." + a + "response_to_" + o + "_render"] = n.renderTs - r.time, 
                    t;
                }, {});
                (0, i["default"])(t).length && (e.emit("track", {
                    type: "timing",
                    data: t
                }), l && console.log("render times: ", t));
            }
            function s(t) {
                var n = !!t.renderTs;
                e.emit("track", {
                    type: "increment",
                    key: "performance:removed_checks.removed_alerts" + (n ? "_rendered" : "")
                }), l && console.log("match:", n, t.renderTs);
            }
            var c = {}, l = !1;
            e.id = e.id || "", e.on("rendered", function() {
                try {
                    a();
                } catch (e) {}
            }), e.api.on("submit_ot", n), e.api.on("finish", o), e.api.on("alert", r), e.api.on("ot_alert_intersection", function() {
                e.ot_alert_intersection++;
            }), e.api.on("stats:timing", function(t) {
                var n = {};
                n[t.key] = t.value, e.emit("track", {
                    type: "timing",
                    data: n
                });
            }), e.matches.on("remove", s), e.matches.on("lost_match_value_in_text", function() {
                e.emit("track", {
                    type: "increment",
                    key: "lost_match_value_in_text:old"
                });
            }), e.matches.on("match_is_part_of_word", function() {
                e.emit("track", {
                    type: "increment",
                    key: "match_is_part_of_word:old"
                });
            }), e.matches.on("remove", s);
        };
    }, {
        "babel-runtime/core-js/object/keys": 29
    } ],
    265: [ function(e, t, n) {
        "use strict";
        function r(e, t) {
            function n() {
                r(), u = setTimeout(m, s), d = setTimeout(m, 1e3 * c[0]), f = setTimeout(m, 1e3 * c[1]), 
                p = setTimeout(m, 1e3 * c[2]);
            }
            function r() {
                l = 0, u && clearTimeout(u), d && clearTimeout(d), f && clearTimeout(f), p && clearTimeout(p);
            }
            var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i, c = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [ 30, 60, 120 ], l = 0, u = null, d = null, f = null, p = null, m = function h() {
                return l < a ? (s === i && e(), u = setTimeout(h, s), void l++) : (o.logger.infinityCheckResetFail(s), 
                void console.error("Infinity check reset fails, change to the offline state."));
            };
            return {
                start: n,
                finish: r
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./tracking"), i = 2e4, a = 3;
        n.infinityChecker = r;
    }, {
        "./tracking": 307
    } ],
    266: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("react");
        n.LogoIcon = function(e) {
            var t = e.className;
            return r.createElement("svg", {
                className: t,
                width: "18",
                height: "18",
                viewBox: "0 0 18 18"
            }, r.createElement("g", {
                transform: "translate(-7 -7)",
                fill: "none",
                fillRule: "evenodd"
            }, r.createElement("circle", {
                fill: "#00AE84",
                cx: "16",
                cy: "16",
                r: "9.008"
            }), r.createElement("path", {
                d: "M17.318 17.843c.052.297.335.504.64.504h.963l.56-.074c-.895 1.297-2.438 1.897-4.13 1.638-1.38-.214-2.566-1.14-3.065-2.437-1.134-2.942 1.03-5.75 3.84-5.75 1.468 0 2.75.852 3.49 1.882.193.304.58.385.864.185.267-.185.342-.533.178-.815-1.014-1.578-2.84-2.593-4.906-2.46-2.677.193-4.854 2.37-5.003 5.04-.18 3.103 2.295 5.637 5.382 5.637 1.618 0 3.065-.703 4.056-1.837l-.12.652v.585c0 .304.21.586.508.637.395.074.738-.23.738-.608v-3.52H17.93c-.38.008-.687.35-.612.74z",
                fill: "#FFF"
            })));
        }, n.IgnoreIcon = function(e) {
            var t = e.className;
            return r.createElement("span", {
                className: t,
                dangerouslySetInnerHTML: {
                    __html: '\n            <svg width="32" height="32" viewBox="0 0 32 32">\n              <defs>\n                <path d="M21,12.5 L21,20.1308289 C21,21.7154283 19.6513555,23 17.9996703,23 L14.0003297,23 C12.3432934,23 11,21.7124939 11,20.1308289 L11,12.5 L11,12.5" id="d70af4_ignoreIconUse"></path>\n                <mask data-mask-color="d70af4_ignoreIcon" id="d70af4_ignoreIconMask" x="-1" y="0" width="9.5" height="10.5">\n                  <use data-fix="d70af4_ignoreIcon" xlink:href="#d70af4_ignoreIconUse"/>\n                </mask>\n              </defs>\n              <g stroke="#D2D4DD" fill="none" fill-rule="evenodd">\n                <path d="M9 10.6h14" stroke-width="1.2"/>\n                <g stroke-width="1.2">\n                  <path d="M14.6 14v6M17.4 14v6"/>\n                </g>\n                <use mask="url(#d70af4_ignoreIconMask)" stroke-width="2.4" xlink:href="#d70af4_ignoreIconUse"/>\n                <path d="M18.5 11V9c0-1.1045695-.8982606-2-1.9979131-2h-1.0041738C14.3944962 7 13.5 7.8877296 13.5 9v2" stroke-width="1.2"/>\n              </g>\n            </svg>\n      '
                }
            });
        }, n.DictionaryIcon = function(e) {
            var t = e.className;
            return r.createElement("span", {
                className: t,
                dangerouslySetInnerHTML: {
                    __html: '\n        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n          <defs>\n            <mask id="57da07_dictionaryIconMask" x="0" y="0" width="10" height="15" fill="#fff">\n              <path id="57da07_dictionaryIconUse" d="M11 9h10v15l-4.8857422-4L11 24z"/>\n            </mask>\n          </defs>\n          <use mask="url(#57da07_dictionaryIconMask)" xlink:href="#57da07_dictionaryIconUse" stroke-width="2.4" stroke="#D2D4DD" fill="none"/>\n        </svg>\n      '
                }
            });
        }, n.DictionaryAddedIcon = function(e) {
            var t = e.className;
            return r.createElement("svg", {
                className: t,
                width: "15",
                height: "23",
                viewBox: "0 0 15 23"
            }, r.createElement("path", {
                d: "M14.773 22.573V.39h-14v22.183l7-5.326",
                fill: "#15C49A",
                fillRule: "evenodd"
            }));
        }, n.WikiIcon = function(e) {
            var t = e.className;
            return r.createElement("svg", {
                className: t,
                width: "32",
                height: "32",
                viewBox: "0 0 32 32"
            }, r.createElement("path", {
                d: "M13.633 21l2.198-4.264L17.64 21h.633l3.756-8.643c.21-.485.62-.776 1.057-.842V11H20.05v.515c.402.09.83.24 1.02.666l-2.758 6.363c-.5-1.06-1.01-2.22-1.498-3.375.504-1.07.915-2.064 1.533-3.04.36-.576.948-.59 1.25-.618V11h-3.23v.51c.404 0 1.242.037.868.822l-.936 1.97-.993-2.19c-.155-.342.145-.57.635-.596L15.938 11h-3.633v.51c.433.015 1.043.013 1.268.38.694 1.274 1.158 2.598 1.79 3.898l-1.636 3.06-2.75-6.323c-.31-.713.425-.943.903-1.002L11.874 11H8v.51c.535.178 1.225.974 1.418 1.376 1.447 3.027 2.176 5.057 3.557 8.114h.658z",
                fill: "#D2D4DD",
                fillRule: "evenodd"
            }));
        }, n.UndoIcon = function(e) {
            var t = e.className;
            return r.createElement("svg", {
                className: t,
                width: "32",
                height: "32",
                viewBox: "0 0 32 32"
            }, r.createElement("g", {
                stroke: "#D2D4DD",
                fill: "none",
                fillRule: "evenodd",
                strokeLinecap: "round"
            }, r.createElement("path", {
                d: "M11.518 8.412l-4.26 4.224L11.5 16.88"
            }), r.createElement("path", {
                d: "M16.192 22.236h4.23c2.642 0 4.784-2.147 4.784-4.783 0-2.642-2.15-4.784-4.787-4.784H8.1"
            })));
        };
    }, {
        react: "react"
    } ],
    267: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t, r, o, i, a) {
            switch (e.kind) {
              case "common":
                return y.createElement(A, {
                    model: e,
                    onIgnore: t,
                    onAddToDictionary: r,
                    onEditor: o,
                    onLogin: i,
                    isAddedToDictionary: a
                });

              case "synonyms":
                return y.createElement(n.CardSynonyms, {
                    model: e,
                    onEditor: o,
                    onLogin: i
                });

              default:
                ;
                return null;
            }
        }
        var i = e("babel-runtime/core-js/object/get-prototype-of"), a = r(i), s = e("babel-runtime/helpers/classCallCheck"), c = r(s), l = e("babel-runtime/helpers/createClass"), u = r(l), d = e("babel-runtime/helpers/possibleConstructorReturn"), f = r(d), p = e("babel-runtime/helpers/inherits"), m = r(p), h = e("babel-runtime/helpers/extends"), g = r(h);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var b = e("lib/config"), v = e("lib/message"), _ = e("lib/inline-cards/model/grammarly_editor_alert"), y = e("react"), w = e("./utils/react"), k = e("../dom"), E = e("../tracking"), C = e("../location"), x = e("./model/card"), S = e("./replacement"), T = e("./icons"), N = {
            container: "_c4f153-container",
            flip: "_c4f153-flip",
            flipSyn: "_c4f153-flipSyn",
            card: "_c4f153-card",
            bigTitle: "_c4f153-bigTitle",
            unknownWordTitle: "_c4f153-unknownWordTitle",
            btnDictLabelWithIcon: "_c4f153-btnDictLabelWithIcon",
            explanation: "_c4f153-explanation",
            replacement: "_c4f153-replacement",
            maxWidthReached: "_c4f153-maxWidthReached",
            item: "_c4f153-item",
            logoIcon: "_c4f153-logoIcon",
            ignoreIcon: "_c4f153-ignoreIcon",
            undoIcon: "_c4f153-undoIcon",
            dictionaryIcon: "_c4f153-dictionaryIcon",
            wikiIcon: "_c4f153-wikiIcon",
            footer: "_c4f153-footer",
            footerButton: "_c4f153-footerButton",
            btnIgnore: "_c4f153-btnIgnore",
            icon: "_c4f153-icon",
            btnLogo: "_c4f153-btnLogo",
            btnPersonalize: "_c4f153-btnPersonalize",
            personalizeMessage: "_c4f153-personalizeMessage",
            attn: "_c4f153-attn",
            cardAddedToDict: "_c4f153-cardAddedToDict",
            addedToDictTitle: "_c4f153-addedToDictTitle",
            dictionaryDescription: "_c4f153-dictionaryDescription",
            undo: "_c4f153-undo",
            dictLink: "_c4f153-dictLink",
            dictionaryAddedIcon: "_c4f153-dictionaryAddedIcon",
            synTitle: "_c4f153-synTitle",
            synList: "_c4f153-synList",
            synListSingle: "_c4f153-synListSingle",
            synListTitle: "_c4f153-synListTitle",
            synListNumber: "_c4f153-synListNumber",
            synSubitems: "_c4f153-synSubitems",
            synItem: "_c4f153-synItem",
            dict: "_c4f153-dict",
            dictContent: "_c4f153-dictContent",
            dictItemCounter: "_c4f153-dictItemCounter",
            dictItem: "_c4f153-dictItem",
            qualifier: "_c4f153-qualifier",
            dictFooterItem: "_c4f153-dictFooterItem",
            wikiLink: "_c4f153-wikiLink",
            wiki: "_c4f153-wiki",
            gr__tooltip_empty: "gr__tooltip_empty",
            gr__tooltip: "gr__tooltip",
            "gr-notfound-tooltip": "gr-notfound-tooltip",
            "gr__tooltip-content": "gr__tooltip-content",
            "gr__tooltip-logo": "gr__tooltip-logo",
            gr__flipped: "gr__flipped"
        }, P = function(e) {
            var t = e.title, n = e.className;
            return y.createElement("div", (0, g["default"])({
                className: n
            }, w.setInnerHTML(t.toLowerCase(), [ "i", "b" ])));
        }, j = function(e) {
            var t = e.title, n = e.explanation;
            return y.createElement("div", null, y.createElement(P, {
                className: N.bigTitle,
                title: t
            }), y.createElement("div", (0, g["default"])({
                className: N.explanation
            }, w.setInnerHTML(n, [ "i", "b" ]))));
        };
        n.FooterButton = function(e) {
            var t = e.className, n = e.onClick, r = e.children;
            return y.createElement("div", {
                className: k.cs(N.footerButton, t),
                role: "button",
                onClick: function(e) {
                    e.stopPropagation(), n();
                }
            }, r);
        }, n.GrammarlyFooter = function(e) {
            var t = e.isUserAuthenticated, r = e.onEditor, o = e.onLogin;
            return t ? y.createElement(n.FooterButton, {
                className: k.cs(N.item, N.btnLogo),
                onClick: r
            }, y.createElement(T.LogoIcon, {
                className: k.cs(N.icon, N.logoIcon)
            }), " See more in Grammarly") : y.createElement(n.FooterButton, {
                className: k.cs(N.btnPersonalize, N.item),
                onClick: o
            }, y.createElement("div", {
                className: N.personalizeMessage
            }, y.createElement("span", {
                className: N.attn
            }, "ATTN:"), " You’re missing many ", y.createElement("br", null), " key Grammarly features."), y.createElement(T.LogoIcon, {
                className: k.cs(N.icon, N.logoIcon)
            }), " Personalize for free");
        }, n.CardCommonContent = function(e) {
            var t = e.model, r = e.onAddToDictionary, o = e.onIgnore, i = e.onEditor, a = e.onLogin, s = t.getFooterProps();
            return y.createElement("div", {
                className: k.cs(N.card)
            }, t.isTextCard ? !t.isUnknowWord && y.createElement(j, {
                title: t.title,
                explanation: t.explanation
            }) : y.createElement("div", {
                className: N.replacement
            }, y.createElement(S.Replacement, {
                itemClassName: N.item,
                replacement: t.getReplacements()
            })), y.createElement("div", {
                className: N.footer
            }, s.hasAddToDictionary && y.createElement(n.FooterButton, {
                className: k.cs(N.btnDict, N.item),
                onClick: function() {
                    return r();
                }
            }, t.isUnknowWord && y.createElement(P, {
                className: N.unknownWordTitle,
                title: t.title
            }), y.createElement("span", {
                className: k.cs(N.btnDictLabelWithIcon)
            }, y.createElement(T.DictionaryIcon, {
                className: k.cs(N.icon, N.dictionaryIcon)
            }), " Add to dictionary")), y.createElement(n.FooterButton, {
                className: k.cs(N.btnIgnore, N.item),
                onClick: function() {
                    return o();
                }
            }, y.createElement(T.IgnoreIcon, {
                className: k.cs(N.icon, N.ignoreIcon)
            }), " Ignore"), y.createElement(n.GrammarlyFooter, {
                onEditor: i,
                onLogin: a,
                isUserAuthenticated: t.isUserAuthenticated
            })));
        };
        var I = function(e) {
            var t = e.word;
            return y.createElement("div", {
                className: k.cs(N.card, N.cardAddedToDict)
            }, y.createElement("div", {
                className: N.addedToDictTitle
            }, y.createElement(T.DictionaryAddedIcon, {
                className: N.dictionaryAddedIcon
            }), " ", t), y.createElement("div", {
                className: N.dictionaryDescription
            }, "is now in your ", y.createElement("div", {
                onClick: function() {
                    v.emitBackground("open-url", b.URLS.appPersonalDictionary);
                },
                className: N.dictLink
            }, "personal dictionary")));
        }, A = function(e) {
            function t() {
                (0, c["default"])(this, t);
                var e = (0, f["default"])(this, (t.__proto__ || (0, a["default"])(t)).apply(this, arguments));
                return e.state = {
                    isAddedToDictionary: e.props.isAddedToDictionary
                }, e;
            }
            return (0, m["default"])(t, e), (0, u["default"])(t, [ {
                key: "render",
                value: function() {
                    var e = this, t = this.props.model;
                    return this.state.isAddedToDictionary ? y.createElement(I, {
                        word: t.highlightText
                    }) : y.createElement(n.CardCommonContent, {
                        onAddToDictionary: function() {
                            e.setState({
                                isAddedToDictionary: !0
                            }), e.props.onAddToDictionary();
                        },
                        onIgnore: this.props.onIgnore,
                        onEditor: this.props.onEditor,
                        onLogin: this.props.onLogin,
                        model: t
                    });
                }
            } ]), t;
        }(y.Component);
        n.CardCommon = A;
        var L = function(e) {
            var t = e.meanings;
            switch (t.length) {
              case 0:
                return y.createElement("span", null);

              case 1:
                return y.createElement("div", {
                    className: k.cs(N.synList, N.synListSingle)
                }, y.createElement("div", {
                    className: N.synSubitems
                }, y.createElement(S.Replacement, {
                    replacement: t[0].list,
                    itemClassName: N.synItem
                })));

              default:
                return y.createElement("div", {
                    className: N.synList
                }, t.map(function(e, t) {
                    return y.createElement("div", {
                        key: t,
                        className: N.synListItem
                    }, y.createElement("div", {
                        className: N.synListTitle
                    }, y.createElement("span", {
                        className: N.synListNumber
                    }, t + 1, "."), e.title), y.createElement("div", {
                        className: N.synSubitems
                    }, y.createElement(S.Replacement, {
                        replacement: e.list,
                        itemClassName: N.synItem
                    })));
                }));
            }
        };
        n.CardSynonyms = function(e) {
            var t = e.model, r = e.onEditor, o = e.onLogin;
            return y.createElement("div", {
                className: k.cs(N.card, N.synCard)
            }, y.createElement("div", {
                className: N.synTitle
            }, "Synonyms:"), y.createElement(L, {
                meanings: t.meanings
            }), y.createElement("div", {
                className: N.footer
            }, y.createElement(n.GrammarlyFooter, {
                onEditor: r,
                onLogin: o,
                isUserAuthenticated: t.isUserAuthenticated
            })));
        };
        var M = 288, O = function(e) {
            function t() {
                (0, c["default"])(this, t);
                var e = (0, f["default"])(this, (t.__proto__ || (0, a["default"])(t)).apply(this, arguments));
                return e.state = {
                    isMaxWidth: !1
                }, e;
            }
            return (0, m["default"])(t, e), (0, u["default"])(t, [ {
                key: "componentDidMount",
                value: function() {
                    this.el && this.el.firstElementChild && this.el.firstElementChild.clientWidth === M && this.setState({
                        isMaxWidth: !0
                    });
                }
            }, {
                key: "render",
                value: function() {
                    var e = this, t = this.props, n = t.model, r = t.onIgnore, i = t.onAddToDictionary, a = t.onEditor, s = t.onLogin, c = t.isAddedToDictionary;
                    return y.createElement("div", {
                        onClick: function(e) {
                            return e.stopPropagation();
                        },
                        key: n.id,
                        ref: function(t) {
                            return e.el = t;
                        },
                        className: k.cs(this.state.isMaxWidth && N.maxWidthReached)
                    }, o(n, r, i, a, s, c));
                }
            } ]), t;
        }(y.Component);
        n.Card = O;
        var R = function(e) {
            function t() {
                (0, c["default"])(this, t);
                var e = (0, f["default"])(this, (t.__proto__ || (0, a["default"])(t)).apply(this, arguments));
                return e.state = {
                    pos: {
                        rect: {
                            top: 0,
                            left: 0,
                            width: 0,
                            height: 0,
                            flip: !1
                        },
                        sourceRect: {
                            width: 0
                        },
                        delta: {
                            right: 0,
                            left: 0,
                            bottom: 0,
                            top: 0
                        },
                        className: "",
                        visible: !1
                    },
                    addedToDict: !1,
                    match: {},
                    visible: !1
                }, e._firstInteractionMap = {}, e.handlers = function(t, n, r) {
                    var o = e.state.match, i = e.props;
                    if (e.state.addedToDict) return void E.fire("show-dictionary");
                    if (t) {
                        switch (t) {
                          case "replace":
                            i.animateReplacement(String(o.id), n, r), o.replace(n, !1), i.hide(), o.syn ? E.logger.synonymReplacementAction() : E.logger.cardReplacementAction();
                            break;

                          case "ignore":
                            o.ignore(), i.hide(), E.logger.cardIgnoreAction();
                            break;

                          case "hide":
                            i.hide();
                            break;

                          case "anim-hide":
                            i.hide();
                            break;

                          case "editor":
                            i.openEditor();
                            break;

                          case "login":
                            i.openEditor();
                            break;

                          case "add":
                            i.addToDict(), E.logger.cardAddToDictAction();
                        }
                        try {
                            switch (t) {
                              case "replace":
                              case "ignore":
                              case "add":
                              case "editor":
                                void 0 === e._firstInteractionMap[o.editorId] && (E.logger.cardFirstInteraction(C.getDomain(), e.props.getUserType(), e.props.getEditorType()), 
                                e._firstInteractionMap[o.editorId] = !0);
                            }
                        } catch (a) {}
                    }
                }, e;
            }
            return (0, m["default"])(t, e), (0, u["default"])(t, [ {
                key: "createCardModel",
                value: function(e, t) {
                    var n = this;
                    switch (e.kind) {
                      case "common":
                        return new x.CommonCardModelImpl(e, function(e, t) {
                            return n.handlers("replace", e, t);
                        }, t);

                      case "synonym":
                        return new x.SynonymsCardModelImpl(e, function(e) {
                            return n.handlers("replace", e);
                        }, t);

                      default:
                        ;
                        return null;
                    }
                }
            }, {
                key: "render",
                value: function() {
                    var e = this, t = this.state, n = t.pos, r = t.match, o = t.visible, i = t.addedToDict, a = n.rect, s = a.flip, c = {
                        top: a.top,
                        left: a.left,
                        visibility: o ? "" : "hidden"
                    };
                    if (!o) return y.createElement("div", null);
                    var l = _.createAlert(r), u = this.createCardModel(l, !this.props.isAnonymous());
                    return y.createElement("div", {
                        style: c,
                        className: k.cs(N.container, s && N.flip, s && "synonyms" === u.kind && N.flipSyn)
                    }, y.createElement(O, {
                        model: u,
                        onIgnore: function() {
                            return e.handlers("ignore");
                        },
                        onAddToDictionary: function() {
                            return e.handlers("add");
                        },
                        isAddedToDictionary: i,
                        onLogin: function() {
                            return e.handlers("login");
                        },
                        onEditor: function() {
                            return e.handlers("editor");
                        }
                    }));
                }
            } ]), t;
        }(y.Component);
        n.PositionedCard = R;
    }, {
        "../dom": 215,
        "../location": 277,
        "../tracking": 307,
        "./icons": 266,
        "./model/card": 270,
        "./replacement": 273,
        "./utils/react": 275,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/extends": 37,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/config": 211,
        "lib/inline-cards/model/grammarly_editor_alert": 272,
        "lib/message": 278,
        react: "react"
    } ],
    268: [ function(e, t, n) {
        "use strict";
        function r(e) {
            var t = {
                Spelling: i.contextualSpelling,
                ContextualSpelling: i.contextualSpelling,
                Grammar: i.grammar,
                Style: i.style,
                SentenceStructure: i.sentenceStructure,
                Punctuation: i.punctuation
            };
            if (void 0 === t[e]) throw new TypeError("Unknown alert group " + e);
            return t[e];
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./alert_replacement");
        n.createReplacement = o.createReplacement, n.createSimpleReplacement = o.createSimpleReplacement;
        var i;
        !function(e) {
            e[e.contextualSpelling = 0] = "contextualSpelling", e[e.grammar = 1] = "grammar", 
            e[e.sentenceStructure = 2] = "sentenceStructure", e[e.punctuation = 3] = "punctuation", 
            e[e.style = 4] = "style", e[e.plagiarism = 5] = "plagiarism", e[e.synonym = 6] = "synonym";
        }(i = n.AlertGroup || (n.AlertGroup = {})), n.alertGroupFromString = r;
    }, {
        "./alert_replacement": 269
    } ],
    269: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            return {
                re: new RegExp("^(" + e + ")(.*)$"),
                createResult: t
            };
        }
        function i(e) {
            function t(e) {
                var t = !0, n = !1, r = void 0;
                try {
                    for (var o, i = (0, d["default"])(p); !(t = (o = i.next()).done); t = !0) {
                        var a = o.value, s = e.match(a.re);
                        if (null !== s) return [ a.createResult(s), s[s.length - 1] ];
                    }
                } catch (c) {
                    n = !0, r = c;
                } finally {
                    try {
                        !t && i["return"] && i["return"]();
                    } finally {
                        if (n) throw r;
                    }
                }
            }
            function n(t) {
                var n = [ "<span class='gr_grammar_del'>", "<span class='gr_grammar_ins'>", "→" ].map(function(e) {
                    return t.indexOf(e);
                });
                if (n.findIndex(function(e) {
                    return 0 === e;
                }) > 0) throw f.logger.couldNotParseTransform(e, !1), new Error("Couldn't parse transform: " + e);
                if (n = n.filter(function(e) {
                    return e > 0;
                }), n.length > 0) {
                    var r = Math.min.apply(Math, (0, l["default"])(n));
                    return [ {
                        type: "text",
                        text: t.substring(0, r)
                    }, t.substring(r) ];
                }
                return [ {
                    type: "text",
                    text: t
                }, "" ];
            }
            for (var r = e, o = [], i = !1; r.length > 0; ) {
                var a = t(r);
                if (void 0 === a && (i = !0), a = a || n(r), void 0 !== a) {
                    if ("insert" === a[0].type) {
                        var s = o[o.length - 1];
                        s && "delete" === s.type && o.push({
                            type: "arrow"
                        });
                    }
                    o.push(a[0]), r = a[1];
                }
                (i || void 0 === a) && f.logger.couldNotParseTransform(e, void 0 === a);
            }
            return o;
        }
        function a(e, t) {
            return {
                newText: t,
                transform: i(e)
            };
        }
        function s(e) {
            var t = [ {
                type: "insert",
                text: e
            } ];
            return {
                newText: e,
                transform: t
            };
        }
        var c = e("babel-runtime/helpers/toConsumableArray"), l = r(c), u = e("babel-runtime/core-js/get-iterator"), d = r(u);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var f = e("../../tracking"), p = [ o("(?:\\<span class='gr_grammar_del'\\>([\\S\\s]*?)\\</span\\>)", function(e) {
            return {
                type: "delete",
                text: e[2]
            };
        }), o("(?:\\<span class='gr_grammar_ins'\\>([\\S\\s]*?)\\</span\\>)", function(e) {
            return {
                type: "insert",
                text: e[2]
            };
        }), o("(→)", function(e) {
            return {
                type: "arrow"
            };
        }), o("([^<>→]+)", function(e) {
            return {
                type: "text",
                text: e[1]
            };
        }) ];
        n.parseTransformHtml = i, n.createReplacement = a, n.createSimpleReplacement = s;
    }, {
        "../../tracking": 307,
        "babel-runtime/core-js/get-iterator": 20,
        "babel-runtime/helpers/toConsumableArray": 41
    } ],
    270: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/createClass"), s = r(a), c = e("babel-runtime/helpers/possibleConstructorReturn"), l = r(c), u = e("babel-runtime/helpers/inherits"), d = r(u), f = e("babel-runtime/helpers/classCallCheck"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("./alert"), h = e("./card_replacement"), g = function _(e, t) {
            (0, p["default"])(this, _), this.isUserAuthenticated = t, this.id = e.id, this.title = e.title, 
            this.explanation = e.explanation, this.details = e.details;
        };
        n.CardModelBaseImpl = g;
        var b = function(e) {
            function t(e, n, r) {
                (0, p["default"])(this, t);
                var o = (0, l["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this, e, r));
                return o._alert = e, o._replace = n, o.isUserAuthenticated = r, o.kind = "common", 
                o.details = o._alert.details, o.todo = o._alert.todo, o.isUnknowWord = "Unknown" === o._alert.category, 
                o.highlightText = o._alert.highlightText, o.extraProperties = o._alert.extraProperties, 
                o.hasAcknowledgeButton = 0 === o._alert.replacements.length && o._alert.group !== m.AlertGroup.contextualSpelling, 
                o.hasAddToDictionary = !!o._alert.extraProperties.hasAddToDictionary, o.isTextCard = h.isNoReplacement(o._alert.replacements), 
                o.title = o._getTitle(), o;
            }
            return (0, d["default"])(t, e), (0, s["default"])(t, [ {
                key: "_getTitle",
                value: function() {
                    return this.isUnknowWord ? "Unknown word" : "Misspelled" === this._alert.category && "General" === this._alert.point ? "" : this._alert.extraProperties.isDidYouMean || this.extraProperties.isShowTitle ? "Check word usage" : this._alert.todo;
                }
            }, {
                key: "getFooterProps",
                value: function() {
                    return {
                        hasAcknowledgeButton: this.hasAcknowledgeButton,
                        hasAddToDictionary: this.hasAddToDictionary
                    };
                }
            }, {
                key: "getReplacements",
                value: function() {
                    var e = this._alert.replacements;
                    return h.isNoReplacement(e) ? new h.EmptyReplacement() : new h.CardReplacementList(this.title, e, this._replace);
                }
            } ]), t;
        }(g);
        n.CommonCardModelImpl = b;
        var v = function y(e, t, n) {
            var r = this;
            (0, p["default"])(this, y), this._alert = e, this._replace = t, this.isUserAuthenticated = n, 
            this.kind = "synonyms", this.meanings = this._alert.meanings.map(function(e) {
                return {
                    title: e.title,
                    list: new h.CardReplacementFlatList("", e.replacements, function(e) {
                        return r._replace(e);
                    })
                };
            }), this.isActive = !1, this.isAnyMeanings = Boolean(this.meanings.length), this.id = this._alert.id, 
            this.title = this._alert.title, this.explanation = "", this.details = "";
        };
        n.SynonymsCardModelImpl = v;
    }, {
        "./alert": 268,
        "./card_replacement": 271,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39
    } ],
    271: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            return !e || 0 === e.length;
        }
        function i(e) {
            return e.slice(e.findIndex(function(e) {
                return "arrow" === e.type;
            }) + 1).filter(function(e) {
                return "delete" !== e.type;
            }).map(function(e) {
                return "insert" === e.type || "text" === e.type ? e.text : "";
            }).join("");
        }
        var a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/possibleConstructorReturn"), l = r(c), u = e("babel-runtime/helpers/inherits"), d = r(u), f = e("babel-runtime/helpers/classCallCheck"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m;
        !function(e) {
            e[e.single = 0] = "single", e[e.list = 1] = "list", e[e.flatList = 2] = "flatList", 
            e[e.empty = 3] = "empty";
        }(m = n.CardReplacementTemplate || (n.CardReplacementTemplate = {})), n.isNoReplacement = o;
        var h = function _() {
            (0, p["default"])(this, _), this.template = m.empty, this.headerText = "";
        };
        n.EmptyReplacement = h;
        var g = function y(e, t, n) {
            var r = this;
            (0, p["default"])(this, y), this.headerText = e, this._replacement = t, this._onReplace = n, 
            this.transform = this._replacement.transform, this.onReplace = function() {
                return r._onReplace(r._replacement.newText);
            }, this.template = m.single;
        };
        n.CardReplacementSingle = g;
        var b = function w(e, t, n) {
            var r = this;
            (0, p["default"])(this, w), this.headerText = e, this.replacements = t, this._onReplace = n, 
            this.template = m.list, this.getOnReplace = function(e) {
                return function() {
                    r._onReplace(e.newText, i(e.transform));
                };
            };
        };
        n.CardReplacementList = b;
        var v = function(e) {
            function t(e, n, r) {
                (0, p["default"])(this, t);
                var o = (0, l["default"])(this, (t.__proto__ || (0, s["default"])(t)).call(this, e, n, r));
                return o.headerText = e, o.template = m.flatList, o;
            }
            return (0, d["default"])(t, e), t;
        }(b);
        n.CardReplacementFlatList = v;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39
    } ],
    272: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            var t = e.rawMatch;
            return d.assert("synonym" !== t.action, "Do not use `getBasicAlertFields` for synonyms."), 
            {
                id: t.id.toString(),
                hidden: t.hidden,
                category: t.category,
                isFree: t.free,
                highlightText: t.highlightText,
                range: {
                    start: t.begin,
                    end: t.end
                },
                group: f.alertGroupFromString(t.group)
            };
        }
        function i(e) {
            var t = e.rawMatch, n = Number(t.synonyms.pos), r = t.synonyms.token, o = n + r.length;
            return {
                id: String(e.id),
                hidden: !1,
                category: t.category,
                isFree: !0,
                highlightText: r,
                range: {
                    start: n,
                    end: o
                },
                group: f.AlertGroup.synonym
            };
        }
        function a(e) {
            var t = "common", n = e.rawMatch, r = n.extra_properties, i = o(e), a = {
                title: n.title,
                details: n.details,
                explanation: n.explanation
            }, s = (0, u["default"])(i, a), c = {
                kind: t,
                todo: n.todo,
                point: n.point,
                replacements: (n.transforms || []).map(function(e, t) {
                    return f.createReplacement(e, n.replacements[t]);
                }),
                extraProperties: {
                    hasAddToDictionary: !!r.add_to_dict,
                    isDidYouMean: !!r.did_you_mean,
                    isShowTitle: !!r.show_title,
                    isEnchancement: !!r.enhancement,
                    plagiarismUrl: r.url,
                    sentence: r.sentence,
                    priority: r.priority ? parseInt(r.priority, 10) : 0
                }
            };
            return (0, u["default"])(s, c);
        }
        function s(e) {
            var t = "synonym", n = e.rawMatch, r = i(e), o = {
                title: n.synonyms.token,
                details: "",
                explanation: ""
            }, a = (0, u["default"])(r, o), s = {
                kind: t,
                meanings: n.synonyms.meanings.map(function(e) {
                    return {
                        title: e.meaning,
                        replacements: e.synonyms.map(function(e) {
                            return f.createSimpleReplacement(e.derived);
                        })
                    };
                }),
                replacements: (n.replacements || []).map(f.createSimpleReplacement)
            };
            return (0, u["default"])(a, s);
        }
        function c(e) {
            var t = e.rawMatch;
            if (!t.group && "synonyms" === t.action) return s(e);
            var n = f.alertGroupFromString(e.rawMatch.group);
            switch (n) {
              default:
                return a(e);
            }
        }
        var l = e("babel-runtime/core-js/object/assign"), u = r(l);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var d = e("stdlib"), f = e("./alert");
        n.createAlert = c;
    }, {
        "./alert": 268,
        "babel-runtime/core-js/object/assign": 24,
        stdlib: 328
    } ],
    273: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            var t = e.filter(function(e) {
                return "insert" === e.type || "delete" === e.type;
            });
            return t.length > 0 ? t[t.length - 1].type + "Replacement" : "";
        }
        function i(e, t) {
            var n = e.slice(t).filter(function(e) {
                return "insert" === e.type;
            });
            return n.length > 0 ? n[0].text : "";
        }
        function a(e, t) {
            var n = e.slice(0, t).filter(function(e) {
                return "delete" === e.type;
            });
            return n.length > 0 ? n[0].text : "";
        }
        function s(e, t) {
            return !!e[t + 1] && "delete" === e[t + 1].type;
        }
        function c(e, t) {
            return !!e[t + 1] && "text" === e[t + 1].type;
        }
        function l(e, t) {
            return !!e[t + 1] && "insert" === e[t + 1].type;
        }
        function u(e) {
            return 0 === e.filter(function(e) {
                return "insert" !== e.type && "text" !== e.type;
            }).length;
        }
        function d(e) {
            return e.slice(e.findIndex(function(e) {
                return "arrow" === e.type;
            }) + 1);
        }
        function f(e, t, n, r, o) {
            return k.createElement("span", {
                className: E.cs(T.insertPart, n && T.insertWithWord, x.isSinglePunctuation(e) && T.insertPunctuation, x.isQuestion(e) && T.insertQuestion, r && T.nextIsWord),
                key: o
            }, x.highlightDiff(t, e));
        }
        function p(e, t, n) {
            return k.createElement("span", {
                className: E.cs(T.deletePart, x.isQuoteWithPunctuation(e) && T.deleteQuoteWithPunctuation, x.isPunctuation(e) && T.deletePunctuation, x.isColonOrSemicolon(e) && T.deleteColonOrSemicolon, x.isComma(e) && T.deleteComma, x.isExclamation(e) && T.deleteExclamation, x.isDash(e) && T.deleteDash, x.isQuestion(e) && T.deleteQuestion, x.isEllipsis(e) && T.deleteEllipsis, x.isQuote(e) && T.deleteQuote, x.isPeriod(e) && T.deletePeriod, x.isParenthesis(e) && T.deleteParenthesis, x.isDoubleComma(e) && T.deleteDoubleComma, x.isAphostrophe(e) && T.deleteAphostrophe, x.isLetter(e) && T.deleteLetter, x.isPunctuationAndLetter(e) && T.deletePunctuationBeforeLetter),
                key: n
            }, x.highlightDiff(t, e));
        }
        function m(e, t, n, r) {
            return k.createElement("span", {
                className: E.cs(T.wordPart, t && T.wordBeforeDelete, n && T.wordBeforeInsert),
                key: r
            }, e);
        }
        function h(e, t, n) {
            return k.createElement("span", {
                key: n,
                className: T[o(e)],
                onClick: S.stopPropagation(t)
            }, d(e).map(function(t, n) {
                switch (t.type) {
                  case "delete":
                    return p(t.text, i(e, n), n);

                  case "insert":
                    return f(t.text, a(e, n), u(e), c(e, n), n);

                  case "text":
                    return m(t.text, s(e, n), l(e, n), n);

                  default:
                    throw new Error("Part " + t + " should not exist");
                }
            }));
        }
        function g(e, t) {
            return k.createElement("div", (0, w["default"])({
                className: T.title,
                onClick: S.stopPropagation(t)
            }, S.setInnerHTML(e)));
        }
        function b(e, t) {
            return k.createElement("div", {
                className: E.cs(T.singleReplacement, t)
            }, k.createElement("div", null, h(e.transform, e.onReplace)));
        }
        function v(e, t, n) {
            return k.createElement("div", {
                className: T.listReplacement
            }, e.replacements.map(function(r, o) {
                return k.createElement("div", {
                    key: o,
                    className: E.cs(T.listItemReplacementWrapper, n, t && T.flattenListItemReplacementWrapper, 0 === o && !e.headerText && T.listItemReplacementNoHeader),
                    onClick: e.getOnReplace(r)
                }, 0 === o && e.headerText && g(e.headerText, e.getOnReplace(r)), k.createElement("span", {
                    className: T.listItemReplacement
                }, h(r.transform, e.getOnReplace(r), o)));
            }));
        }
        function _(e, t) {
            switch (e.template) {
              case C.CardReplacementTemplate.single:
                return b(e, t);

              case C.CardReplacementTemplate.list:
                return v(e, !1, t);

              case C.CardReplacementTemplate.flatList:
                return v(e, !0, t);

              default:
                throw new Error("Replacement template " + C.CardReplacementTemplate[e.template] + " is not supported");
            }
        }
        var y = e("babel-runtime/helpers/extends"), w = r(y);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var k = e("react"), E = e("../../dom"), C = e("../model/card_replacement"), x = e("./utils"), S = e("../utils/react"), T = {
            title: "_abcbcc-title",
            replacement: "_abcbcc-replacement",
            singleReplacement: "_abcbcc-singleReplacement",
            listItemReplacement: "_abcbcc-listItemReplacement",
            sideCommas: "_abcbcc-sideCommas",
            orReplacement: "_abcbcc-orReplacement",
            insertReplacement: "_abcbcc-insertReplacement",
            longReplacement: "_abcbcc-longReplacement",
            didYouMean: "_abcbcc-didYouMean",
            wordPart: "_abcbcc-wordPart",
            wordBeforeInsert: "_abcbcc-wordBeforeInsert",
            insertPart: "_abcbcc-insertPart",
            insertPunctuation: "_abcbcc-insertPunctuation",
            deleteReplacement: "_abcbcc-deleteReplacement",
            deletePart: "_abcbcc-deletePart",
            wordBeforeDelete: "_abcbcc-wordBeforeDelete",
            deletePunctuation: "_abcbcc-deletePunctuation",
            deleteColonOrSemicolon: "_abcbcc-deleteColonOrSemicolon",
            deleteParenthesis: "_abcbcc-deleteParenthesis",
            deleteQuestion: "_abcbcc-deleteQuestion",
            deleteExclamation: "_abcbcc-deleteExclamation",
            deletePeriod: "_abcbcc-deletePeriod",
            deleteQuote: "_abcbcc-deleteQuote",
            deleteDash: "_abcbcc-deleteDash",
            deleteEllipsis: "_abcbcc-deleteEllipsis",
            deleteQuoteWithPunctuation: "_abcbcc-deleteQuoteWithPunctuation",
            deleteApostrophe: "_abcbcc-deleteApostrophe",
            deletePunctuationBeforeLetter: "_abcbcc-deletePunctuationBeforeLetter",
            deleteLetter: "_abcbcc-deleteLetter",
            deleteDoubleComma: "_abcbcc-deleteDoubleComma",
            insertQuestion: "_abcbcc-insertQuestion",
            nextIsWord: "_abcbcc-nextIsWord",
            listReplacement: "_abcbcc-listReplacement",
            arrowPart: "_abcbcc-arrowPart",
            bold: "_abcbcc-bold",
            orSeparator: "_abcbcc-orSeparator",
            didYouMeanLabel: "_abcbcc-didYouMeanLabel",
            listItemReplacementNoHeader: "_abcbcc-listItemReplacementNoHeader",
            listItemReplacementWrapper: "_abcbcc-listItemReplacementWrapper",
            flattenListItemReplacementWrapper: "_abcbcc-flattenListItemReplacementWrapper"
        };
        n.Replacement = function(e) {
            return k.createElement("div", {
                className: E.cs(T.replacement)
            }, _(e.replacement, e.itemClassName));
        };
    }, {
        "../../dom": 215,
        "../model/card_replacement": 271,
        "../utils/react": 275,
        "./utils": 274,
        "babel-runtime/helpers/extends": 37,
        react: "react"
    } ],
    274: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return null !== e && e.replace(/\s/g, "").length < 3 && null !== e.match(E);
        }
        function o(e) {
            return null !== e && e.replace(/\s/g, "").length < 3 && null !== e.match(/[;:]/);
        }
        function i(e) {
            return null !== e && 1 === e.replace(/\s/g, "").length && r(e);
        }
        function a(e) {
            return null !== e && null !== e.match(/["'”][.,;]/);
        }
        function s(e) {
            return '"' === e || "”" === e || "“" === e;
        }
        function c(e) {
            return null !== e && null !== e.match(/,,/);
        }
        function l(e) {
            return null !== e && e.match(/[.,;:!?\\\/…\-—()]\s*[a-z]/i);
        }
        function u(e) {
            return "’" === e;
        }
        function d(e) {
            return "," === e;
        }
        function f(e) {
            return "!" === e;
        }
        function p(e) {
            return "-" === e || "—" === e;
        }
        function m(e) {
            return "?" === e;
        }
        function h(e) {
            return "." === e;
        }
        function g(e) {
            return "…" === e;
        }
        function b(e) {
            return ")" === e || "(" === e;
        }
        function v(e) {
            return null !== e && 1 === e.length && null !== e.match(/[a-z]/i);
        }
        function _(e, t) {
            if (e.length <= 4) return y.createElement("span", null, t);
            var n = w.textdiff(e, t), r = n.from, o = n.to, i = n.oldFragment, a = n.newFragment, s = 1 === a.length && r > 0 && e[r - 1] === a, c = 1 === i.length && 0 === a.length && t[r - 1] === i, l = r, u = a;
            return (s || c) && (l = r - 1), s && (u = a + a), c && (u = i), u.length > 3 ? y.createElement("span", null, t) : y.createElement("span", null, e.substring(0, l), y.createElement("span", {
                className: k.bold
            }, u), e.substring(o));
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var y = e("react"), w = e("@grammarly-npm/textdiff"), k = {
            title: "_abcbcc-title",
            replacement: "_abcbcc-replacement",
            singleReplacement: "_abcbcc-singleReplacement",
            listItemReplacement: "_abcbcc-listItemReplacement",
            sideCommas: "_abcbcc-sideCommas",
            orReplacement: "_abcbcc-orReplacement",
            insertReplacement: "_abcbcc-insertReplacement",
            longReplacement: "_abcbcc-longReplacement",
            didYouMean: "_abcbcc-didYouMean",
            wordPart: "_abcbcc-wordPart",
            wordBeforeInsert: "_abcbcc-wordBeforeInsert",
            insertPart: "_abcbcc-insertPart",
            insertPunctuation: "_abcbcc-insertPunctuation",
            deleteReplacement: "_abcbcc-deleteReplacement",
            deletePart: "_abcbcc-deletePart",
            wordBeforeDelete: "_abcbcc-wordBeforeDelete",
            deletePunctuation: "_abcbcc-deletePunctuation",
            deleteColonOrSemicolon: "_abcbcc-deleteColonOrSemicolon",
            deleteParenthesis: "_abcbcc-deleteParenthesis",
            deleteQuestion: "_abcbcc-deleteQuestion",
            deleteExclamation: "_abcbcc-deleteExclamation",
            deletePeriod: "_abcbcc-deletePeriod",
            deleteQuote: "_abcbcc-deleteQuote",
            deleteDash: "_abcbcc-deleteDash",
            deleteEllipsis: "_abcbcc-deleteEllipsis",
            deleteQuoteWithPunctuation: "_abcbcc-deleteQuoteWithPunctuation",
            deleteApostrophe: "_abcbcc-deleteApostrophe",
            deletePunctuationBeforeLetter: "_abcbcc-deletePunctuationBeforeLetter",
            deleteLetter: "_abcbcc-deleteLetter",
            deleteDoubleComma: "_abcbcc-deleteDoubleComma",
            insertQuestion: "_abcbcc-insertQuestion",
            nextIsWord: "_abcbcc-nextIsWord",
            listReplacement: "_abcbcc-listReplacement",
            arrowPart: "_abcbcc-arrowPart",
            bold: "_abcbcc-bold",
            orSeparator: "_abcbcc-orSeparator",
            didYouMeanLabel: "_abcbcc-didYouMeanLabel",
            listItemReplacementNoHeader: "_abcbcc-listItemReplacementNoHeader",
            listItemReplacementWrapper: "_abcbcc-listItemReplacementWrapper",
            flattenListItemReplacementWrapper: "_abcbcc-flattenListItemReplacementWrapper"
        }, E = /["'”“.,;:!?\\\/…\-—()]/;
        n.isPunctuation = r, n.isColonOrSemicolon = o, n.isSinglePunctuation = i, n.isQuoteWithPunctuation = a, 
        n.isQuote = s, n.isDoubleComma = c, n.isPunctuationAndLetter = l, n.isAphostrophe = u, 
        n.isComma = d, n.isExclamation = f, n.isDash = p, n.isQuestion = m, n.isPeriod = h, 
        n.isEllipsis = g, n.isParenthesis = b, n.isLetter = v, n.highlightDiff = _;
    }, {
        "@grammarly-npm/textdiff": 16,
        react: "react"
    } ],
    275: [ function(e, t, n) {
        "use strict";
        function r(e, t) {
            return {
                dangerouslySetInnerHTML: {
                    __html: i.sanitize(e, t)
                }
            };
        }
        function o(e) {
            return function(t) {
                t.stopPropagation(), e(t);
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("./string");
        n.setInnerHTML = r, n.stopPropagation = o;
    }, {
        "./string": 276
    } ],
    276: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e ? e[0].toUpperCase() + e.slice(1) : "";
        }
        function o(e) {
            return e ? e.replace(/(?:^|[-_])(\w)/g, function(e, t) {
                return t ? t.toUpperCase() : "";
            }) : "";
        }
        function i() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments[1];
            return e && "undefined" != typeof window ? t ? l.sanitize(e, {
                ALLOWED_TAGS: t
            }) : l.sanitize(e) : "";
        }
        function a(e, t) {
            var n = e.match(t);
            return n && n[1];
        }
        function s(e) {
            return e.split(/\s+/)[0];
        }
        function c(e, t, n) {
            return 1 === e ? t : n;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = e("dompurify");
        n.nbsp = String.fromCharCode(160), n.capitalize = r, n.camelize = o, n.sanitize = i, 
        n.getFirstMatch = a, n.getFirstWord = s, n.pluralize = c;
    }, {
        dompurify: "dompurify"
    } ],
    277: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            var t = this, n = e.tabs;
            return b.SafePromise.create(function(e) {
                return m(t, void 0, void 0, d["default"].mark(function r() {
                    var t, o;
                    return d["default"].wrap(function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return t = setTimeout(function() {
                                return n.getActiveTabUrl().then(e);
                            }, 2e3), r.next = 3, n.getActiveTabUrl();

                          case 3:
                            o = r.sent, clearTimeout(t), e(o);

                          case 6:
                          case "end":
                            return r.stop();
                        }
                    }, r, this);
                }));
            });
        }
        function i(e) {
            var t = e && e.ownerDocument || document, n = t.location || t.defaultView.location;
            return n ? v(n.hostname) : "";
        }
        function a(e) {
            return p["default"].race([ o(e).then(s), h.delay(1e4).then(function() {
                throw new Error("Request to tabs.getCurrentTabUrl rejected by timeout");
            }) ]);
        }
        function s(e) {
            if (h.isFF() && /^about:/.test(e)) return e;
            var t = document.createElement("a");
            return t.href = e, v(t.hostname);
        }
        function c(e) {
            var t = e && e.ownerDocument || document, n = t.location || t.defaultView.location;
            return n ? n.pathname + n.search : "";
        }
        function l() {
            for (var e = new RegExp("^(?:[a-z]+:)?//", "i"), t = "", n = document.getElementsByTagName("link"), r = 0; r < n.length; r++) {
                var o = n[r], i = '"' + o.getAttribute("rel") + '"', a = /(\"icon )|( icon\")|(\"icon\")|( icon )/i;
                i.search(a) !== -1 && (t = o.getAttribute("href"));
            }
            return t || (t = "favicon.ico"), e.test(t) ? t : "/" !== t[0] ? "//" + document.location.host + document.location.pathname + t : "//" + document.location.host + t;
        }
        var u = e("babel-runtime/regenerator"), d = r(u), f = e("babel-runtime/core-js/promise"), p = r(f), m = function(e, t, n, r) {
            return new (n || (n = p["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var h = e("./util"), g = e("./page-config/defaults"), b = e("stdlib"), v = function(e) {
            return e.replace("www.", "");
        };
        n.currentUrl = o, n.getDomain = i, n.promiseGetDomain = a, n.domainFromUrl = s, 
        n.isFacebookSite = function() {
            return g.FACEBOOK_SITES.includes(i());
        }, n.isJiraSite = function() {
            return /\.atlassian\.net/.test(i());
        }, n.isBlackboardSite = function() {
            return /\.blackboard\.com/.test(i());
        }, n.getUrl = c, n.getFavicon = l;
    }, {
        "./page-config/defaults": 283,
        "./util": 322,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/regenerator": 43,
        stdlib: 328
    } ],
    278: [ function(e, t, n) {
        (function(t) {
            "use strict";
            function r(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            function o(e, t) {
                function n() {
                    a(e, n);
                    for (var r = arguments.length, o = Array(r), i = 0; i < r; i++) o[i] = arguments[i];
                    t.apply(this, o);
                }
                i(e, n);
            }
            function i(e, t) {
                if ("__bgerror" === e) return void E.on("__bgerror", t);
                var r = C[e] = C[e] || [];
                if (r.push(t), 1 === r.length) try {
                    k.listen(e, function() {
                        var e = !0, t = !1, n = void 0;
                        try {
                            for (var o, i = (0, h["default"])(r); !(e = (o = i.next()).done); e = !0) {
                                var a = o.value;
                                a.apply(void 0, arguments);
                            }
                        } catch (s) {
                            t = !0, n = s;
                        } finally {
                            try {
                                !e && i["return"] && i["return"]();
                            } finally {
                                if (t) throw n;
                            }
                        }
                    });
                } catch (o) {
                    n.emitError(o);
                }
            }
            function a(e, t) {
                if ("__bgerror" === e) return void E.off("__bgerror", t);
                var n = C[e];
                if (n) {
                    var r = n.indexOf(t);
                    r !== -1 && n.splice(r, 1), 0 === n.length && delete C[e];
                }
            }
            function s(e) {
                try {
                    switch (k.kind) {
                      case "background-message-api":
                        k.broadcast(e, {});
                        break;

                      default:
                        throw new Error("emitTabs can be used only on background");
                    }
                } catch (t) {
                    n.emitError(t);
                }
            }
            function c(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = arguments[3], i = o || function() {};
                try {
                    if (!e) throw TypeError("emitTo can't be used without destination point");
                    switch (k.kind) {
                      case "background-message-api":
                        k.sendTo(e, t, r, i);
                        break;

                      default:
                        throw new Error("emitTo can be used only on background");
                    }
                } catch (a) {
                    n.emitError(a);
                }
            }
            function l(e, t) {
                try {
                    k.toFocused(e, t);
                } catch (r) {
                    n.emitError(r);
                }
            }
            function u(e, t, r) {
                try {
                    switch (k.kind) {
                      case "content-script-message-api":
                        k.broadcastBackground(e, t, r);
                        break;

                      default:
                        throw new Error("emitBackground can be used only in content script");
                    }
                } catch (o) {
                    n.emitError(o);
                }
            }
            function d(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e4, o = new p["default"](function(r, o) {
                    try {
                        switch (k.kind) {
                          case "content-script-message-api":
                            k.broadcastBackground(e, t, r, o);
                            break;

                          default:
                            throw new Error("promiseBackground can be used only on client scripts");
                        }
                    } catch (i) {
                        o(i), n.emitError(i);
                    }
                });
                return p["default"].race([ o, v.delay(r).then(function() {
                    throw new Error("Request to bg page (" + k + ") rejected by timeout");
                }) ]);
            }
            var f = e("babel-runtime/core-js/promise"), p = r(f), m = e("babel-runtime/core-js/get-iterator"), h = r(m);
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var g = e("lodash"), b = e("emitter"), v = e("./util"), _ = e("./dom"), y = e("extension-api"), w = t && t.env && t.env.SANDBOX ? {
                message: {
                    broadcastBackground: v._f,
                    listen: v._f,
                    toFocused: v._f
                }
            } : y.getGlobalExtensionApi(), k = w.message, E = b({}), C = {};
            n.emitError = g.throttle(function(e) {
                return E.emit("__bgerror", e);
            }, 1e3), v.isBg() && _.listen(document, "grammarly:offline", function() {
                return n.emitError("proxy dead");
            }, void 0), n.one = o, n.on = i, n.off = a, n.emitTabs = s, n.emitTo = c, n.emitFocusedTab = l, 
            n.emitBackground = u, n.promiseBackground = d;
        }).call(this, e("_process"));
    }, {
        "./dom": 215,
        "./util": 322,
        _process: 158,
        "babel-runtime/core-js/get-iterator": 20,
        "babel-runtime/core-js/promise": 31,
        emitter: "emitter",
        "extension-api": 177,
        lodash: "lodash"
    } ],
    279: [ function(e, t, n) {
        "use strict";
        function r() {
            return !!window.__extensionTestsMode;
        }
        function o() {
            return g.appConfig.extensionId;
        }
        function i() {
            return "firefox" === g.bundleInfo.browser;
        }
        function a() {
            return "chrome" === g.bundleInfo.browser;
        }
        function s() {
            return "safari" === g.bundleInfo.browser;
        }
        function c() {
            return "edge" === g.bundleInfo.browser;
        }
        function l() {
            return g.systemInfo.os.isWindows;
        }
        function u() {
            return "bg" === g.bundleInfo.context;
        }
        function d() {
            return "popup" === g.bundleInfo.context;
        }
        function f() {
            return u() || d();
        }
        function p() {
            return g.bundleInfo.browser;
        }
        function m() {
            return g.buildInfo.version;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var h = e("config"), g = h.getGlobal();
        n.isTestsMode = r, n.getUuid = o, n.isFF = i, n.isChrome = a, n.isSafari = s, n.isEdge = c, 
        n.isWindows = l, n.isBg = u, n.isPopup = d, n.isBgOrPopup = f, n.getBrowser = p, 
        n.getVersion = m, n.ENV = g.bundleInfo.env, n.URLS = g.appConfig.url, n.appName = g.appConfig.felog.appName, 
        n.gnarAppName = g.appConfig.gnar.appName, n.GRAMMARLY_DOMAIN = g.appConfig.url.grammarlyDomain;
    }, {
        config: 169
    } ],
    280: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/keys"), i = r(o), a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u), f = e("babel-runtime/helpers/possibleConstructorReturn"), p = r(f), m = e("babel-runtime/helpers/inherits"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("lib/util"), b = e("./defaults"), v = e("lib/location"), _ = e("./config-loader"), y = function(e) {
            function t(e) {
                (0, l["default"])(this, t);
                var n = (0, p["default"])(this, (t.__proto__ || (0, s["default"])(t)).call(this, e));
                return n.invalidate = function() {
                    return n.load();
                }, n;
            }
            return (0, h["default"])(t, e), (0, d["default"])(t, [ {
                key: "getByPage",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : v.getUrl();
                    if (e) {
                        var n = (0, i["default"])(e).find(function(e) {
                            return new RegExp(e).test(t);
                        });
                        return n ? e[n] : void 0;
                    }
                }
            }, {
                key: "get",
                value: function(e, t) {
                    var n = this.config.pageConfig[e] || this.config.subdomains.find(function(t) {
                        return new RegExp("\\." + g.escapeRegExp(t.domain) + "$").test(e);
                    }) || this.config.partials.find(function(t) {
                        return e.includes(t.domain);
                    });
                    if (n && n.enabled === !1) return n;
                    var r = this.getByPage(n && n.pages, t), o = r || n || {};
                    return o.enabled = o.enabled !== !1, o;
                }
            }, {
                key: "toReload",
                value: function(e) {
                    return 0 === e.indexOf("http") && b.SITES_TO_RELOAD.some(function(t) {
                        return e.includes(t);
                    });
                }
            } ]), t;
        }(_.ConfigLoader);
        n.Config = y;
    }, {
        "./config-loader": 281,
        "./defaults": 283,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "lib/location": 277,
        "lib/util": 322
    } ],
    281: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/regenerator"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/core-js/promise"), d = r(u), f = function(e, t, n, r) {
            return new (n || (n = d["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var p = e("./localforage"), m = e("lib/request"), h = e("lib/config"), g = e("lib/tracking"), b = e("./meta"), v = e("./utils"), _ = e("./decorator"), y = e("lib/profiler"), w = 6e4, k = "Config missed", E = "Config malformed", C = function() {
            function e(t) {
                (0, s["default"])(this, e), this._prefs = t;
            }
            return (0, l["default"])(e, [ {
                key: "init",
                value: function() {
                    return f(this, void 0, void 0, i["default"].mark(function e() {
                        var t;
                        return i["default"].wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return y.Profiler.start("pageConfig_init"), t = void 0, e.next = 4, this.isSkipConfig();

                              case 4:
                                if (!e.sent) {
                                    e.next = 8;
                                    break;
                                }
                                console.warn("Config: use default config in DEBUG mode (skipConfig=true)"), e.next = 11;
                                break;

                              case 8:
                                return e.next = 10, this.loadFromStorage();

                              case 10:
                                t = e.sent;

                              case 11:
                                return this.config = t ? t : {}, e.next = 14, new b.Meta().load();

                              case 14:
                                return this.meta = e.sent, y.Profiler.stop("pageConfig_init"), e.abrupt("return", this);

                              case 17:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                }
            }, {
                key: "isSkipConfig",
                value: function() {
                    return f(this, void 0, void 0, i["default"].mark(function e() {
                        return i["default"].wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (e.t0 = !1, !e.t0) {
                                    e.next = 5;
                                    break;
                                }
                                return e.next = 4, this._prefs.get("skipConfig");

                              case 4:
                                e.t0 = e.sent;

                              case 5:
                                return e.abrupt("return", e.t0);

                              case 6:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                }
            }, {
                key: "load",
                value: function() {
                    return f(this, void 0, void 0, i["default"].mark(function e() {
                        var t, n, r, o;
                        return i["default"].wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (t = this.meta.config, n = t.date, r = t.interval, !(n + r > Date.now())) {
                                    e.next = 5;
                                    break;
                                }
                                return o = (n + r - Date.now()) / 1e3 / 60, console.info("Config: next update in " + o.toFixed(2) + " m"), 
                                e.abrupt("return");

                              case 5:
                                return console.info("Config: going to update config from CDN..."), e.abrupt("return", this.updateFromCDN());

                              case 7:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                }
            }, {
                key: "updateFromCDN",
                value: function() {
                    return f(this, void 0, void 0, i["default"].mark(function e() {
                        var t, n;
                        return i["default"].wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return t = void 0, e.prev = 1, e.next = 4, m.fetch(h.URLS.pageConfigUrl, {
                                    timeout: w
                                });

                              case 4:
                                if (t = e.sent, v.isValid(t)) {
                                    e.next = 7;
                                    break;
                                }
                                throw new Error(E);

                              case 7:
                                this.config = t, this.save(t), e.next = 17;
                                break;

                              case 11:
                                e.prev = 11, e.t0 = e["catch"](1), g.logger.pageConfigCDNError(e.t0.message), n = "Config: can't get valid config - " + e.t0.message, 
                                console.warn(n, t), this.saveOnError(n);

                              case 17:
                              case "end":
                                return e.stop();
                            }
                        }, e, this, [ [ 1, 11 ] ]);
                    }));
                }
            }, {
                key: "loadFromStorage",
                value: function() {
                    return f(this, void 0, void 0, i["default"].mark(function e() {
                        var t;
                        return i["default"].wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.prev = 0, e.next = 3, p.localforage.getItem("config");

                              case 3:
                                if (t = e.sent) {
                                    e.next = 6;
                                    break;
                                }
                                throw new Error(k);

                              case 6:
                                if (v.isValid(t)) {
                                    e.next = 8;
                                    break;
                                }
                                throw new Error(E);

                              case 8:
                                return console.info("Config: loaded from local storage successfully"), e.abrupt("return", t);

                              case 12:
                                return e.prev = 12, e.t0 = e["catch"](0), k === e.t0.message || g.logger.pageConfigLocalStorageError(e.t0.message, e.t0.name), 
                                console.warn("Config: cannot get valid config from storage: " + e.t0), e.abrupt("return", void 0);

                              case 17:
                              case "end":
                                return e.stop();
                            }
                        }, e, this, [ [ 0, 12 ] ]);
                    }));
                }
            }, {
                key: "save",
                value: function(e) {
                    var t = e.interval, n = e.protocolVersion, r = e.version;
                    p.localforage.setItem("config", e), this.fireVersionUpdate(r, this.meta.config.version), 
                    this.meta.set({
                        date: this.getCurrentTimestamp(),
                        status: "success",
                        interval: t,
                        protocolVersion: n,
                        version: r
                    }), console.info("Config: new config saved to local storage successfully:", e.version, e);
                }
            }, {
                key: "saveOnError",
                value: function(e) {
                    var t = this.meta.config, n = t.interval, r = t.protocolVersion, o = t.version;
                    this.meta.set({
                        date: this.getCurrentTimestamp(),
                        status: "failed",
                        interval: n,
                        protocolVersion: r,
                        version: o,
                        info: e
                    });
                }
            }, {
                key: "fireVersionUpdate",
                value: function(e, t) {
                    e && t !== e && g.logger.pageConfigUpdated(t, e);
                }
            }, {
                key: "getCurrentTimestamp",
                value: function() {
                    return Date.now();
                }
            }, {
                key: "config",
                set: function(e) {
                    e = e || {}, this._config = _.decorateConfig(e);
                },
                get: function() {
                    return this._config;
                }
            } ]), e;
        }();
        n.ConfigLoader = C;
    }, {
        "./decorator": 282,
        "./localforage": 285,
        "./meta": 286,
        "./utils": 287,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/regenerator": 43,
        "lib/config": 211,
        "lib/profiler": 290,
        "lib/request": 291,
        "lib/tracking": 307
    } ],
    282: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            var t = _.merge({
                pageConfig: {}
            }, e);
            return t.pageConfig || (t.pageConfig = {}), t;
        }
        function i(e) {
            return y.decorate(e);
        }
        var a = e("babel-runtime/helpers/defineProperty"), s = r(a), c = e("babel-runtime/core-js/object/keys"), l = r(c), u = e("babel-runtime/core-js/object/assign"), d = r(u), f = e("babel-runtime/helpers/classCallCheck"), p = r(f), m = e("babel-runtime/helpers/createClass"), h = r(m);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var g = e("../config"), b = e("./defaults"), v = e("../util"), _ = e("lodash");
        n.deepCopyWithDefault = o;
        var y = function() {
            function e() {
                (0, p["default"])(this, e);
            }
            return (0, h["default"])(e, null, [ {
                key: "decorate",
                value: function(e) {
                    return e = e || {}, e = this.filterByVersion(e), e = this.withDefault(e), e = this.parseBooleans(e), 
                    e = this.parseBrowserValues(e), e = this.filterInvalidPageRegexp(e), e = this.collectSubdomains(e), 
                    e = this.collectPartials(e);
                }
            }, {
                key: "withDefault",
                value: function(e) {
                    e = o(e);
                    var t = b.PAGE_CONFIG && b.PAGE_CONFIG.pageConfig || {};
                    b.OVERRIDE_PAGE_CONFIG || {};
                    return e.pageConfig = _.merge({}, t, e.pageConfig), e;
                }
            }, {
                key: "filterByVersion",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : g.getVersion();
                    e = o(e);
                    var n = e.pageConfig;
                    return e.pageConfig = (0, l["default"])(n).filter(function(e) {
                        var r = n[e], o = r.version;
                        return !o || "*" === o || 1 !== v.versionComparator(t, o);
                    }).reduce(function(t, n) {
                        return (0, d["default"])({}, t, (0, s["default"])({}, n, e.pageConfig[n]));
                    }, {}), e;
                }
            }, {
                key: "parseBooleans",
                value: function(e) {
                    function t(e) {
                        return !(e === !1 || "false" === e);
                    }
                    function n(e) {
                        return !!e && t(e);
                    }
                    e = o(e);
                    var r = e.pageConfig;
                    return (0, l["default"])(r).forEach(function(e) {
                        r[e] || (r[e] = {});
                        var o = r[e];
                        o.enabled = t(o.enabled), o.matchInclusions = n(o.matchInclusions), o.matchSubdomains = n(o.matchSubdomains), 
                        o.pages && (0, l["default"])(o.pages).forEach(function(e) {
                            o.pages[e].enabled = t(o.pages[e].enabled);
                        });
                    }), e;
                }
            }, {
                key: "parseBrowserValues",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : v.getBrowser();
                    e = o(e);
                    var n = e.pageConfig;
                    return (0, l["default"])(n).map(function(e) {
                        var r = n[e] && n[e].disabledBrowsers;
                        r && r.includes(t) && (n[e].enabled = !1);
                    }), e;
                }
            }, {
                key: "filterInvalidPageRegexp",
                value: function(e) {
                    e = o(e);
                    var t = e.pageConfig;
                    return (0, l["default"])(t).forEach(function(e) {
                        var n = t[e];
                        n.pages && (n.pages = (0, l["default"])(n.pages).filter(function(e) {
                            try {
                                return new RegExp(e);
                            } catch (t) {
                                return !1;
                            }
                        }).reduce(function(e, t) {
                            return (0, d["default"])({}, e, (0, s["default"])({}, t, n.pages[t]));
                        }, {}));
                    }), e;
                }
            }, {
                key: "collectSubdomains",
                value: function(e) {
                    e = o(e);
                    var t = e.pageConfig;
                    e.subdomains = [];
                    try {
                        e.subdomains = (0, l["default"])(t).filter(function(e) {
                            return t[e].matchSubdomains;
                        }).map(function(e) {
                            return (0, d["default"])({
                                domain: e
                            }, t[e]);
                        });
                    } catch (n) {
                        console.warn("Cannot collect subdomains from config");
                    }
                    return e;
                }
            }, {
                key: "collectPartials",
                value: function(e) {
                    e = o(e);
                    var t = e.pageConfig;
                    e.partials = [];
                    try {
                        e.partials = (0, l["default"])(t).filter(function(e) {
                            return t[e].matchInclusions;
                        }).map(function(e) {
                            return (0, d["default"])({
                                domain: e
                            }, t[e]);
                        });
                    } catch (n) {
                        console.warn("Cannot collect partials from config");
                    }
                    return e;
                }
            } ]), e;
        }();
        n.RawConfigDecorator = y, n.decorateConfig = i;
    }, {
        "../config": 211,
        "../util": 322,
        "./defaults": 283,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/defineProperty": 36,
        lodash: "lodash"
    } ],
    283: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o, i = e("babel-runtime/helpers/defineProperty"), a = r(i), s = e("babel-runtime/helpers/toConsumableArray"), c = r(s);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = e("lodash"), u = e("lib/config");
        n.PROTOCOL_VERSION = "1.0", n.SITES_TO_RELOAD = [ "inbox.google.com", "mail.google.com", "yahoo.com", "mail.live.com", "facebook.com", "tumblr.com", "stackoverflow.com", "wordpress.com", "wordpress.org", "blogspot.com" ], 
        n.FACEBOOK_SITES = [ "facebook.com", "messenger.com", "work.fb.com", "business.facebook.com" ], 
        n.HTML_GHOST_SITES = [ "twitter.com" ].concat((0, c["default"])(n.FACEBOOK_SITES)), 
        n.CUSTOM_UNSUPPORTED_MESSAGES = {
            "drive.google.com": {
                title: "Google Drive",
                message: 'We hope to support Google Drive apps<br/> in the future, but for now please use your</br> <a class="openGrammarly" href="' + u.URLS.app + '">Grammarly Editor</a>.'
            },
            "docs.google.com": {
                title: "Google Drive",
                message: 'We hope to support Google Drive apps<br/> in the future, but for now please use your</br> <a class="openGrammarly" href="' + u.URLS.app + '">Grammarly Editor</a>.'
            },
            "chrome.google.com": {
                title: "Web Store"
            }
        };
        var d = 18e5;
        n.PAGE_CONFIG_DEFAULT_INTERVAL = d, n.PAGE_CONFIG_UPDATE_INTERVALS = [ 6e5, n.PAGE_CONFIG_DEFAULT_INTERVAL, 36e5, 108e5, 432e5, 864e5, 31536e6 ], 
        n.OVERRIDE_PAGE_CONFIG = {}, n.PAGE_CONFIG_INTERNAL = (o = {
            version: {
                enabled: !1,
                servicePage: !0
            },
            extensions: {
                enabled: !1,
                servicePage: !0
            },
            settings: {
                enabled: !1,
                servicePage: !0
            },
            "com.safari.grammarlyspellcheckergrammarchecker": {
                enabled: !1,
                matchInclusions: !0,
                servicePage: !0
            }
        }, (0, a["default"])(o, "app." + u.GRAMMARLY_DOMAIN, {
            enabled: !1,
            grammarlyEditor: !0
        }), (0, a["default"])(o, "linkedin.com", {
            pages: {
                "/messaging": {
                    afterReplaceEvents: [ "input" ]
                }
            }
        }), (0, a["default"])(o, "plus.google.com", {
            afterReplaceEvents: [ "keyup" ],
            minFieldHeight: 0,
            minFieldWidth: 0
        }), (0, a["default"])(o, "facebook.com", {
            minFieldHeight: 0,
            fields: [ {
                name: "caption_text"
            } ]
        }), (0, a["default"])(o, "mail.google.com", {
            fields: [ {
                name: "to"
            }, {
                name: "cc"
            }, {
                name: "bcc"
            }, {
                className: "vO"
            } ],
            subframes: !1
        }), (0, a["default"])(o, "drive.google.com", {
            track: !0
        }), (0, a["default"])(o, "docs.google.com", {
            track: !0
        }), (0, a["default"])(o, "app.asana.com", {
            fields: [ {
                className: "task-row-text-input"
            } ]
        }), (0, a["default"])(o, "tumblr.com", {
            fields: [ {
                attr: [ "aria-label", "Post title" ]
            }, {
                attr: [ "aria-label", "Type or paste a URL" ]
            } ]
        }), (0, a["default"])(o, "chrome.google.com", {
            dontShowDisabledBadge: !0
        }), (0, a["default"])(o, "airbnb.com", {
            fields: [ {
                attr: [ "id", "question" ]
            } ]
        }), o);
        var f = {
            "hootsuite.com": {
                enabled: !1
            },
            "chrome.google.com": {
                enabled: !1
            },
            "facebook.com": {
                enabled: !0,
                pages: {
                    ".*/notes": {
                        enabled: !1
                    }
                }
            },
            "onedrive.live.com": {
                enabled: !1
            },
            "docs.com": {
                enabled: !1
            },
            "sp.docs.com": {
                enabled: !1
            },
            "docs.google.com": {
                enabled: !1
            },
            "drive.google.com": {
                enabled: !1
            },
            "texteditor.nsspot.net": {
                enabled: !1
            },
            "jsbin.com": {
                enabled: !1
            },
            "jsfiddle.net": {
                enabled: !1
            },
            "quora.com": {
                enabled: !1
            },
            "paper.dropbox.com": {
                enabled: !1
            },
            "mail.live.com": {
                enabled: !1,
                matchInclusions: !0
            },
            "imperavi.com": {
                enabled: !1
            },
            "usecanvas.com": {
                enabled: !1
            }
        };
        n.PAGE_CONFIG = {
            pageConfig: l.merge({}, f, n.PAGE_CONFIG_INTERNAL)
        };
    }, {
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/toConsumableArray": 41,
        "lib/config": 211,
        lodash: "lodash"
    } ],
    284: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("./config-base"), o = e("universal/bg/prefs"), i = e("extension-api"), a = new o.PrefsImpl(i.getGlobalExtensionApi().preferences);
        n.pageConfig = new r.Config(a);
    }, {
        "./config-base": 280,
        "extension-api": 177,
        "universal/bg/prefs": 331
    } ],
    285: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/promise"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = "Grammarly", s = 1, c = "configuration", l = void 0;
        try {
            l = e("localforage"), l.config({
                name: a,
                version: s,
                size: 4194304,
                storeName: c
            });
        } catch (u) {
            console.error("Fallback to memory storage", u);
            var d = {};
            l = {
                getItem: function(e) {
                    return i["default"].resolve(d[e]);
                },
                setItem: function(e, t) {
                    return d[e] = t, i["default"].resolve(t);
                },
                clear: function() {
                    d = {}, i["default"].resolve(!0);
                }
            };
        }
        n.localforage = l;
    }, {
        "babel-runtime/core-js/promise": 31,
        localforage: "localforage"
    } ],
    286: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/regenerator"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/core-js/promise"), d = r(u), f = function(e, t, n, r) {
            return new (n || (n = d["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var p = e("./localforage"), m = e("./utils"), h = "lastConfigUpdate", g = function() {
            function e() {
                (0, s["default"])(this, e);
            }
            return (0, l["default"])(e, [ {
                key: "load",
                value: function() {
                    return f(this, void 0, void 0, i["default"].mark(function e() {
                        var t;
                        return i["default"].wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, p.localforage.getItem(h);

                              case 2:
                                return t = e.sent, this.set(t), e.abrupt("return", this);

                              case 5:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                }
            }, {
                key: "set",
                value: function(e) {
                    var t = e || {}, n = t.protocolVersion, r = t.version, o = t.status, i = t.info, a = t.date, s = t.interval;
                    return this._meta = {
                        date: Number(a) || 0,
                        interval: m.getInterval(Number(s)),
                        protocolVersion: n,
                        version: r,
                        status: o,
                        info: i
                    }, p.localforage.setItem(h, this._meta);
                }
            }, {
                key: "config",
                get: function() {
                    return this._meta;
                }
            } ]), e;
        }();
        n.Meta = g;
    }, {
        "./localforage": 285,
        "./utils": 287,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/regenerator": 43
    } ],
    287: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            if (e && e.pageConfig && (0, s["default"])(e).length && (0, s["default"])(e.pageConfig).length && (!e.protocolVersion || e.protocolVersion === c.PROTOCOL_VERSION)) return !0;
        }
        function i(e) {
            return c.PAGE_CONFIG_UPDATE_INTERVALS.includes(e) ? e : c.PAGE_CONFIG_DEFAULT_INTERVAL;
        }
        var a = e("babel-runtime/core-js/object/keys"), s = r(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("./defaults");
        n.isValid = o, n.getInterval = i;
    }, {
        "./defaults": 283,
        "babel-runtime/core-js/object/keys": 29
    } ],
    288: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            var t = I.isDraftJsField(e), n = j.isFacebookSite();
            return !t || n || M.draftjs || (M.draftjs = !0), !t || n;
        }
        function i(e) {
            function t() {
                he = !0, ge = new MutationObserver(r), ge.observe(de.body, {
                    childList: !0,
                    subtree: !0
                }), N.interval(c, ne);
            }
            function n(e) {
                function t(e) {
                    return o.indexOf(e) !== -1 && Boolean(r.push(e));
                }
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], o = k.flatten(k.transform(ue, function(e, t) {
                    return e.push(t);
                }, []));
                if (t(e) || !e.children) return r;
                for (var i = 0; i < e.children.length; i++) n(e.children[i], r);
                return r;
            }
            function r(e) {
                var t, r;
                (t = []).concat.apply(t, (0, _["default"])((r = []).concat.apply(r, (0, _["default"])(e.map(function(e) {
                    var t = e.removedNodes;
                    return [].concat((0, _["default"])((0, b["default"])(t))).map(function(e) {
                        return n(e);
                    });
                }))))).forEach(f);
            }
            function i() {
                he && (N.cancelInterval(c), ge.disconnect(), he = !1);
            }
            function a() {
                return [].concat((0, _["default"])(ue)).filter(function(e) {
                    return ae(e) || !e.offsetHeight;
                });
            }
            function c() {
                a().forEach(f);
                var e = Q();
                y(e) || be.emit("add", e);
            }
            function u() {
                k.each(ue, function(e) {
                    return e.forEach(D);
                }), ue = g(), be.emit("add", Q()), t();
            }
            function f(e) {
                re.has(e) && (re.get(e).off(), re["delete"](e)), [ "textareas", "contenteditables", "iframes", "htmlghosts" ].forEach(function(t) {
                    var n = ue[t].indexOf(e);
                    n !== -1 && ue[t].splice(n, 1);
                }), be.emit("remove", e);
            }
            function m() {
                return h["default"].wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.delegateYield(this.textareas, "t0", 1);

                      case 1:
                        return e.delegateYield(this.contenteditables, "t1", 2);

                      case 2:
                        return e.delegateYield(this.iframes, "t2", 3);

                      case 3:
                        return e.delegateYield(this.htmlghosts, "t3", 4);

                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, te[0], this);
            }
            function g() {
                return (0, d["default"])({
                    textareas: [],
                    contenteditables: [],
                    iframes: [],
                    htmlghosts: [],
                    usageTracking: []
                }, p["default"], m);
            }
            function v(e) {
                de = e, pe = de.location.hostname, me = new RegExp("://" + pe), fe = de.defaultView, 
                ee && (ce = k.isNumber(ee.minFieldHeight) ? ee.minFieldHeight : ce, le = k.isNumber(ee.minFieldWidth) ? ee.minFieldHeight : le);
            }
            function y(e) {
                return 0 === e.textareas.length && 0 === e.contenteditables.length && 0 === e.iframes.length && 0 === e.htmlghosts.length && 0 === e.usageTracking.length;
            }
            function j(e) {
                if (!ee) return !0;
                if (ee.enabled === !1) return !1;
                if (!ee.fields && ee.enabled === !0) return !0;
                var t = function(t) {
                    var n = (0, l["default"])(t, 2), r = n[0], o = n[1];
                    return e.getAttribute(r) === o;
                };
                return !ee.fields.some(function(n) {
                    var r = n.name, o = n.id, i = n.className, a = n.attr;
                    return r && r === e.name || o && o === e.id || i && P.hasClass(e, i) || a && Array.isArray(a) && t(a);
                });
            }
            function I() {
                return !de.location || 0 === de.location.href.indexOf("about:") || 0 === de.location.href.indexOf("chrome:") || !de.body || 0 === de.body.childNodes.length;
            }
            function M() {
                return "interactive" !== de.readyState && "complete" !== de.readyState;
            }
            function O() {
                var e = de.documentElement.getBoundingClientRect();
                return e.height < se && fe.innerHeight < se || e.width < se;
            }
            function R(e) {
                return e.clientHeight < ce || e.clientWidth < le;
            }
            function F(e, t, n) {
                var r = n.filter(function(e) {
                    return !t || "readonly" !== e;
                }).some(function(t) {
                    return Array.isArray(t) ? e.hasAttribute(t[0]) && e.getAttribute(t[0]).includes(t[1]) : e.hasAttribute(t);
                });
                return r || "rtl" === e.getAttribute("dir");
            }
            function D(e) {
                if ([].concat((0, _["default"])(C.grammarlyAttrs), [ "spellcheck" ]).forEach(function(t) {
                    return e.removeAttribute(t);
                }), S.isHtmlGhostSite()) {
                    var t = e.parentElement && e.parentElement.parentElement;
                    t && t.removeAttribute("spellcheck");
                }
            }
            function B(e) {
                return P.getParentBySel(e, C.restrictedParentAttrs);
            }
            function U(e, t) {
                var n = F(e, t, C.restrictedAttrs), r = F(e, t, C.customFieldsRestrictedAttrs), i = o(e) && !n && !r && !R(e) && (P.isVisible(e) && j(e) || P.hasClass(e, "grammDemo")), a = r && !i;
                return {
                    valid: i,
                    goodForTracking: a
                };
            }
            function W(e, t) {
                var n = [], r = [], o = [].concat((0, _["default"])((0, b["default"])(de.querySelectorAll(e))));
                return o.forEach(function(e) {
                    var o = U(e, t);
                    o.goodForTracking && n.push(e), o.valid && r.push(e);
                }), {
                    fields: r,
                    trackingFields: n
                };
            }
            function G() {
                return W("textarea", !1);
            }
            function V() {
                if (oe) return {
                    fields: [],
                    trackingFields: []
                };
                var e = W('[contenteditable]:not([contenteditable="false"]):not([data-reactid])', !0);
                return e.fields = e.fields.filter(function(e) {
                    return !B(e);
                }), e;
            }
            function z() {
                return oe ? W(S.getHtmlGhostSelector(), !1) : {
                    fields: [],
                    trackingFields: []
                };
            }
            function H(e) {
                if (A.href = e.src, (0 !== e.src.indexOf("http") || me.test(e.src)) && "about:blank" !== e.src && (!e.src || e.src.indexOf("javascript:") !== -1 || A.protocol === document.location.protocol && A.hostname === document.location.hostname && A.port === document.location.port) && !P.hasClass(e, T.baseCls)) {
                    var t = null;
                    try {
                        t = e.contentDocument;
                    } catch (n) {
                        return;
                    }
                    if ((!t || t.body) && t && !F(e, !1, C.allRestrictedAttrs) && !F(t.body, !1, C.allRestrictedAttrs) && j(e)) {
                        var r = t.querySelector("html") || {
                            hasAttribute: function(e) {
                                return !1;
                            }
                        };
                        if (("on" === t.designMode || t.body.hasAttribute("contenteditable") || "false" === t.body.getAttribute("contenteditable") || r.hasAttribute("contenteditable") || "false" === r.getAttribute("contenteditable")) && !R(e)) return N.isFF() && "on" === t.designMode && (t.designMode = "off", 
                        t.body.setAttribute("contenteditable", "true")), !0;
                    }
                }
            }
            function q() {
                return [].concat((0, _["default"])((0, b["default"])(de.querySelectorAll("iframe")))).filter(H);
            }
            function K(e) {
                ue = k.mapValues(ue, function(t, n) {
                    return [].concat(t, e[n]);
                }), ue[p["default"]] = m;
            }
            function Y(e, t) {
                return k.difference(e[t], ue[t]);
            }
            function J(e, t) {
                var n = Y(e, t);
                return ie.shouldRemove ? n.filter(function(e) {
                    return !ie.shouldRemove(e);
                }) : n;
            }
            function Q() {
                var e = X(), t = (0, d["default"])({
                    textareas: J(e, "textareas"),
                    contenteditables: J(e, "contenteditables"),
                    iframes: J(e, "iframes"),
                    htmlghosts: J(e, "htmlghosts"),
                    usageTracking: J(e, "usageTracking")
                }, p["default"], m);
                return K(t), t;
            }
            function X() {
                var e = g();
                if (I() || M() || O()) return e;
                var t = G(), n = V(), r = z(), o = q(), i = [].concat((0, _["default"])(t.trackingFields), (0, 
                _["default"])(n.trackingFields), (0, _["default"])(r.trackingFields));
                return (0, s["default"])({}, e, {
                    textareas: t.fields,
                    contenteditables: n.fields,
                    iframes: o,
                    htmlghosts: r.fields,
                    usageTracking: i
                });
            }
            var $ = e.doc, Z = void 0 === $ ? document : $, ee = e.page, te = [ m ].map(h["default"].mark), ne = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : L, re = new w["default"](), oe = S.isHtmlGhostSite(), ie = x.pageStyles(Z).getFixesForCurrentDomain(), ae = ie.shouldRemove || N._f, se = 150, ce = 35, le = 300, ue = g(), de = void 0, fe = void 0, pe = void 0, me = void 0, he = void 0, ge = void 0;
            v(Z);
            var be = E({
                get: Q,
                reset: u,
                remove: f,
                stop: i
            }), ve = be.on;
            return be.on = function(e, n) {
                return he || t(), ve(e, n), {
                    un: function() {}
                };
            }, be;
        }
        var a = e("babel-runtime/core-js/object/assign"), s = r(a), c = e("babel-runtime/helpers/slicedToArray"), l = r(c), u = e("babel-runtime/helpers/defineProperty"), d = r(u), f = e("babel-runtime/core-js/symbol/iterator"), p = r(f), m = e("babel-runtime/regenerator"), h = r(m), g = e("babel-runtime/core-js/array/from"), b = r(g), v = e("babel-runtime/helpers/toConsumableArray"), _ = r(v), y = e("babel-runtime/core-js/map"), w = r(y);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var k = e("lodash"), E = e("emitter"), C = e("./config"), x = e("./sites"), S = e("./ghost/html-ghost-locator"), T = e("./elements/iframe"), N = e("./util"), P = e("./dom"), j = e("./location"), I = e("./editor/field-type-detect"), A = document.createElement("a"), L = 1e3, M = {
            draftjs: !1
        };
        n.PageFields = i;
    }, {
        "./config": 211,
        "./dom": 215,
        "./editor/field-type-detect": 218,
        "./elements/iframe": 225,
        "./ghost/html-ghost-locator": 253,
        "./location": 277,
        "./sites": 294,
        "./util": 322,
        "babel-runtime/core-js/array/from": 19,
        "babel-runtime/core-js/map": 23,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/symbol/iterator": 33,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/slicedToArray": 40,
        "babel-runtime/helpers/toConsumableArray": 41,
        "babel-runtime/regenerator": 43,
        emitter: "emitter",
        lodash: "lodash"
    } ],
    289: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            return i(e, t)[0];
        }
        function i(e, t) {
            var n = [ {
                top: 0,
                left: 0,
                height: 0,
                width: 0
            } ];
            if (!e) return n;
            var r = e.ownerDocument, i = r.documentElement, a = e.getClientRects(), s = i.scrollTop || r.body.scrollTop, c = i.scrollLeft || r.body.scrollLeft, l = t && t.contentDocument;
            if (0 === a.length) return n;
            var u = (0, m["default"])(a).map(function(e) {
                return {
                    top: e.top + s,
                    left: e.left + c,
                    height: e.height,
                    width: e.width
                };
            });
            if (l && l.documentElement && l.documentElement === i) {
                var d = o(t);
                u = u.map(function(e) {
                    return (0, f["default"])({}, e, {
                        top: e.top + d.top - s,
                        left: e.left + d.left - c
                    });
                });
            }
            return u;
        }
        function a(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = e.ownerDocument, o = l(r), i = e.clientWidth, a = e.clientHeight, s = {
                top: 0,
                left: 0,
                flip: !1
            }, c = {
                top: t.top - r.body.scrollTop - a,
                left: t.left - i,
                bottom: r.body.scrollTop + o.height - t.top - t.height - a,
                right: r.body.scrollLeft + o.width - t.left - i
            };
            return c.bottom < 0 && c.bottom < c.top || n ? (s.top = t.top - a + 3, s.flip = !0) : (s.top = t.top + t.height - 3, 
            s.flip = !1), c.right < 0 ? s.left = o.width - i : s.left = t.left, {
                rect: s,
                delta: c,
                sourceRect: t
            };
        }
        function s(e, t) {
            function n(e, t) {
                s[e] += i[t] / 2 - a[t] / 2, o[e] > s[e] && (s[e] = o[e]), o[e] + o[t] < s[e] + a[t] && (s[e] = o[e] + o[t] - a[t]);
            }
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "top:center", o = c(), i = t.getBoundingClientRect(), a = e.getBoundingClientRect(), s = {
                top: 0,
                left: 0,
                flipY: !1,
                flipX: !1
            }, l = {
                top: i.top - o.top,
                left: i.left - o.left,
                bottom: -i.bottom + o.bottom,
                right: -i.right + o.right
            }, u = r.split(":");
            return s.top = i.top, "center" === u[0] ? n("top", "height") : "top" === u[0] ? l.top > a.height ? s.top -= a.height : (s.top += i.height, 
            s.flipY = !0) : "bottom" === u[0] && (l.bottom > a.height ? s.top += i.height : (s.top -= a.height, 
            s.flipY = !0)), s.left = i.left, "center" === u[1] ? n("left", "width") : "left" === u[1] ? (s.left += i.width - a.width, 
            l.left + i.width < a.width && (s.left = o.left)) : "right" === u[1] && l.right + i.width < a.width && (s.left += i.width + l.right - a.width), 
            s;
        }
        function c() {
            var e = document.createElement("div");
            e.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;", document.documentElement.insertBefore(e, document.documentElement.firstChild);
            var t = e.getBoundingClientRect();
            return document.documentElement.removeChild(e), t;
        }
        function l(e) {
            var t = e.documentElement.clientTop || e.body.clientTop || 0, n = e.documentElement.clientLeft || e.body.clientLeft || 0, r = e.documentElement.scrollLeft || e.body.scrollLeft, o = e.documentElement.scrollTop || e.body.scrollTop, i = e.defaultView.innerHeight, a = e.defaultView.innerWidth;
            return {
                width: a,
                height: i,
                scrollTop: o - t,
                scrollLeft: r - n,
                top: t,
                left: n
            };
        }
        function u(e, t) {
            if (!e || e === t) return {
                x: 0,
                y: 0
            };
            var n = {
                x: e.offsetLeft,
                y: e.offsetTop
            }, r = u(e.offsetParent, t);
            return n.x += r.x, n.y += r.y, n;
        }
        var d = e("babel-runtime/core-js/object/assign"), f = r(d), p = e("babel-runtime/core-js/array/from"), m = r(p);
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.getAbsRect = o, n.getAllAbsRects = i, n.posToRect = a, n.posToEl = s, n.getPos = u;
    }, {
        "babel-runtime/core-js/array/from": 19,
        "babel-runtime/core-js/object/assign": 24
    } ],
    290: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/regenerator"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c), u = e("babel-runtime/core-js/promise"), d = r(u), f = function(e, t, n, r) {
            return new (n || (n = d["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var p = e("lib/timers"), m = e("lib/tracking"), h = function() {
            function e() {
                var t = this;
                (0, s["default"])(this, e), this.timings = {}, this.track = function(e) {
                    for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
                    return f(t, void 0, void 0, i["default"].mark(function a() {
                        return i["default"].wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return t.abrupt("return", this._track.apply(this, [ !1, e ].concat(r)));

                              case 1:
                              case "end":
                                return t.stop();
                            }
                        }, a, this);
                    }));
                }, this.trackAsync = function(e) {
                    for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
                    return f(t, void 0, void 0, i["default"].mark(function a() {
                        return i["default"].wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                return t.abrupt("return", this._track.apply(this, [ !0, e ].concat(r)));

                              case 1:
                              case "end":
                                return t.stop();
                            }
                        }, a, this);
                    }));
                }, this._track = function(e, n) {
                    for (var r = arguments.length, o = Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++) o[a - 2] = arguments[a];
                    return f(t, void 0, void 0, i["default"].mark(function s() {
                        var t;
                        return i["default"].wrap(function(r) {
                            for (;;) switch (r.prev = r.next) {
                              case 0:
                                if (t = n.name + (e ? "__sync" : ""), p.timers.start(t), r.prev = 2, !e) {
                                    r.next = 8;
                                    break;
                                }
                                return r.next = 6, n.apply(void 0, o);

                              case 6:
                                r.next = 9;
                                break;

                              case 8:
                                n.apply(void 0, o);

                              case 9:
                                r.next = 14;
                                break;

                              case 11:
                                throw r.prev = 11, r.t0 = r["catch"](2), r.t0;

                              case 14:
                                return r.prev = 14, this.timings[t] = p.timers.stop(t), r.finish(14);

                              case 17:
                              case "end":
                                return r.stop();
                            }
                        }, s, this, [ [ 2, 11, 14, 17 ] ]);
                    }));
                };
            }
            return (0, l["default"])(e, [ {
                key: "start",
                value: function(e) {
                    p.timers.start(e);
                }
            }, {
                key: "stop",
                value: function(e) {
                    this.timings[e] = p.timers.stop(e);
                }
            } ], [ {
                key: "start",
                value: function(e) {
                    p.timers.start(e);
                }
            }, {
                key: "stop",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e4, n = p.timers.stop(e);
                    return n > t && (console.warn("profiler_" + e + "_time_exceeded", n), "pageConfig_init" === e && m.logger.tooLongPageConfigInit(n), 
                    "updateUser" === e && m.logger.tooLongUserUpdateTime(n)), n;
                }
            } ]), e;
        }();
        n.Profiler = h;
    }, {
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/regenerator": 43,
        "lib/timers": 301,
        "lib/tracking": 307
    } ],
    291: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            if (e.data && (e.query || "post" !== e.method) && (e.url += "?" + s(e.data)), e.data && "post" === e.method && !e.query && !e.body) {
                try {
                    e.body = (0, d["default"])(e.data);
                } catch (t) {
                    e.body = {}, console.warn(t);
                }
                e.headers = e.headers || {}, e.headers["Content-Type"] = e.headers["Content-Type"] || "application/json", 
                delete e.data;
            }
            return e.credentials = "include", e;
        }
        function i(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return t.url = e, o(t), p.isBg() || m.isTestsMode() ? a(t) : h.promiseBackground("fetch", t).then(function(e) {
                if (f.isObject(e) && e.error) throw new Error(e.error);
                return e;
            });
        }
        function a(e) {
            function t(t) {
                return t.ok ? t[e.isText ? "text" : "json"]() : t.text().then(function(e) {
                    throw {
                        name: "RequestError",
                        body: e,
                        statusCode: t.status,
                        message: t.statusText
                    };
                });
            }
            var n = e.url;
            return delete e.url, n ? l["default"].race([ window.fetch(n, e).then(t).then(function(e) {
                if ("string" != typeof e && e && e.error) throw new Error(e.error);
                return e;
            }), p.delay(e.timeout || g).then(function() {
                throw new Error("Fetch request to " + n + " rejected by timeout");
            }) ]) : l["default"].reject(new Error("Url is not defined in fetch request"));
        }
        function s(e) {
            var t = "", n = function(n) {
                if (Array.isArray(e[n])) {
                    if (e[n].length) {
                        var r = e[n].map(function(e) {
                            return n + "=" + e;
                        }).join("&");
                        t += "" + (t.length ? "&" : "") + r;
                    }
                } else t += "" + (t.length ? "&" : "") + n + "=" + encodeURIComponent(e[n]);
            };
            for (var r in e) n(r);
            return t;
        }
        var c = e("babel-runtime/core-js/promise"), l = r(c), u = e("babel-runtime/core-js/json/stringify"), d = r(u);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var f = e("lodash"), p = e("./util"), m = e("./config"), h = e("./message"), g = 1e4;
        p.isBg() && h.on("fetch", function(e, t) {
            return a(e).then(t, function(e) {
                return t({
                    error: e.message
                });
            });
        }), n.transformOptions = o, n.fetch = i, n.paramStr = s;
    }, {
        "./config": 211,
        "./message": 278,
        "./util": 322,
        "babel-runtime/core-js/json/stringify": 22,
        "babel-runtime/core-js/promise": 31,
        lodash: "lodash"
    } ],
    292: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/assign"), i = r(o), a = e("babel-runtime/core-js/symbol"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/createClass"), d = r(u);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var f = e("react"), p = e("./position"), m = e("./dom"), h = function(e) {
            var t = e.style, n = e.className;
            return f.createElement("div", {
                style: t,
                className: "g-selection-anim " + n
            });
        }, g = function() {
            function e() {
                var t = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document;
                (0, l["default"])(this, e), this._doc = n, this._id = (0, s["default"])("SelectionAnimator"), 
                this._cls = "", this._width80 = 0, this._width20 = 0, this._component = null, this.render = function() {
                    t._component = m.renderReactWithParent(f.createElement(h, {
                        style: (0, i["default"])({}, t._style),
                        className: t._cls
                    }), t._doc.documentElement, t._id);
                }, this.remove = function() {
                    t._component && (t._component.remove(), t._component = null);
                }, this.complete = function() {
                    t._style.WebkitTransitionDuration = "0.2s", t._style.MozTransitionDuration = "0.2s", 
                    t._style.transitionDuration = "0.2s", t._style.width = t._width80 + t._width20, 
                    t._component && t.render();
                };
            }
            return (0, d["default"])(e, [ {
                key: "animate",
                value: function(e) {
                    var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                    this._cls = n;
                    var r = p.getAbsRect(e);
                    this._style = {
                        top: r.top + r.height + 1,
                        left: r.left,
                        width: 0,
                        height: 2
                    }, this._width20 = Math.ceil(r.width / 8), this._width80 = r.width - this._width20, 
                    setTimeout(function() {
                        t._style.width = t._width80, t.render();
                    }, 10), setTimeout(function() {
                        t.complete();
                    }, 500), this.render();
                }
            } ]), e;
        }();
        n.SelectionAnimator = g;
    }, {
        "./dom": 215,
        "./position": 289,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/symbol": 32,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        react: "react"
    } ],
    293: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            return e.getRangeAt(0).getBoundingClientRect();
        }
        function i(e, t) {
            var n = e.anchorNode;
            if (!n) return !1;
            var r = l.restrictedAttrs.map(function(e) {
                return Array.isArray(e) ? "[" + e[0] + '="' + e[1] + '"]' : "[" + e + "]";
            }).join(","), o = t.activeElement, i = e.toString().trim(), a = "TEXTAREA" !== n.tagName && "INPUT" !== n.tagName, s = !o || "INPUT" !== o.tagName && "TEXTAREA" !== o.tagName, c = !u.isContentEditable(n), d = !u.getParentBySel(n, r) && !u.matchesSelector(n, r), f = !u.getParentBySel(n, "[contenteditable=true],[contenteditable=plaintext-only]") && !u.parentIsContentEditable(n);
            return !!(i && a && s && c && d && f);
        }
        function a(e, t, n) {
            if (!e) return null;
            for (var r = e.split(/[.;!?]/g), o = 0, i = 0, a = 0; a < r.length; a++) {
                if (i = o + r[a].length, t >= o && n <= i) return {
                    v: r[a],
                    s: t - o,
                    e: n - o
                };
                o = i + 1;
            }
            return null;
        }
        var s = e("babel-runtime/helpers/classCallCheck"), c = r(s);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = e("./config"), u = e("./dom");
        n.isValidSelection = i;
        var d = function f(e, t, n) {
            var r = this;
            (0, c["default"])(this, f), this._doc = e, this._selectHandler = t, this._deselectHandler = n, 
            this._select = !1, this.release = function() {
                return u.unlisten(r._doc, "click", r.check);
            }, this.check = function(e) {
                var t = e.detail;
                if (2 !== t) return void (r._select && (r._deselectHandler(), r._select = !1));
                r._select = !0;
                var n = r._doc.getSelection();
                if (i(n, r._doc)) {
                    var s = n.anchorNode.textContent, c = n.toString();
                    if (!c.match(/[0-9_±!@#$%^&*:"|<>?~().,:}{’=']/)) {
                        var l = {
                            v: c,
                            s: 0,
                            e: c.length
                        }, u = n.getRangeAt(0);
                        if (u.ownerDocument = r._doc, n.anchorNode === n.focusNode) {
                            var d = n.anchorOffset, f = d + c.length;
                            l = a(s, d, f);
                        }
                        null !== l && r._selectHandler({
                            data: {
                                v: l.v,
                                s: l.s,
                                e: l.e,
                                w: c
                            },
                            pos: o(n),
                            el: u
                        });
                    }
                }
            }, u.listen(e, "click", this.check);
        };
        n.SelectionElement = d;
    }, {
        "./config": 211,
        "./dom": 215,
        "babel-runtime/helpers/classCallCheck": 34
    } ],
    294: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            return e.find(function(e) {
                return i(t, e.split(":"));
            });
        }
        function i(e, t) {
            var n = (0, p["default"])(t, 2), r = n[0], o = n[1], i = e.getAttribute(r);
            return Boolean(i && (i === o || i.includes(o) && r + ":" + o));
        }
        function a(e) {
            return e.dataset && e.dataset.testid;
        }
        function s() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document, t = m.getDomain(e.documentElement), n = _[t];
            return {
                addDomainClass: function() {
                    e.documentElement.classList.add("gr__" + t.replace(/\./g, "_"));
                },
                customizeElements: function() {
                    n && g(n).each(function(t, n) {
                        return (0, d["default"])(e.querySelectorAll(n)).forEach(function(e) {
                            return g.extend(e.style || {}, t);
                        });
                    });
                },
                getFixesForCurrentDomain: function() {
                    var e = w[t];
                    if (e) return e;
                    var n = (0, l["default"])(w).filter(function(e) {
                        return e.includes("*");
                    }).find(function(e) {
                        return t.indexOf(e.replace("*", "")) > -1;
                    });
                    return n && w[n] || {};
                }
            };
        }
        var c = e("babel-runtime/core-js/object/keys"), l = r(c), u = e("babel-runtime/core-js/array/from"), d = r(u), f = e("babel-runtime/helpers/slicedToArray"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("./location"), h = e("./util"), g = e("lodash"), b = e("./client-script"), v = e("./dom"), _ = {
            "translate.google.com": {
                "#gt-clear": {
                    zIndex: "2"
                }
            },
            "linkedin.com": {
                ".mentions-highlighter": {
                    zIndex: "0"
                }
            },
            "us.nakedwines.com": {
                ".postbutton": {
                    display: "inline-block"
                }
            }
        }, y = function() {
            var e = void 0;
            return function() {
                return "undefined" == typeof e && (e = !!document.querySelector("c-wiz")), e;
            };
        }(), w = {
            "airbnb.com": {
                stopImmediatePropagationForClick: function(e) {
                    return e.classList.contains("send-message-textarea");
                }
            },
            "twitter.com": {
                btnDiff: function(e) {
                    if ("tweet-box-dm-conversation" === e.id) return [ -25, 1 ];
                    var t = e.parentElement && e.parentElement.parentElement && e.parentElement.parentElement.querySelector(".EmojiPicker");
                    return null != t && t.offsetHeight > 0 ? [ -25, 3 ] : e.clientHeight > 40 || "tweet-box-home-timeline" !== e.id ? [ 0, 0 ] : [ -30, 0 ];
                },
                fieldRestoreInlineStyles: function(e, t) {
                    "tweet-box-dm-conversation" === e.id && e.style.zIndex !== t.src["z-index"] && (e.style.zIndex = t.src["z-index"], 
                    e.style.position = t.src.position, e.style.transition = "none", e.style.background = "transparent");
                }
            },
            "linkedin.com": {
                fieldStateForDomain: function(e) {
                    if ("IFRAME" === e.tagName && e.id) return e.id.replace(/\d*\d/, "");
                    var t = [ "class:trans" ];
                    return o(t, e);
                },
                menuPosLeft: function(e, t, n) {
                    return !h.isSafari() || n.enabled ? t : t - 7;
                }
            },
            "*.slack.com": {
                forceMinimize: function(e) {
                    return e.clientHeight > 40;
                },
                btnCustomContainer: function(e) {
                    return e;
                },
                btnCustomStyles: function(e, t) {
                    var n = t.clientHeight < 40 ? 25 : 0;
                    return e ? {
                        right: 10 + n,
                        bottom: 10,
                        left: "auto",
                        top: "auto"
                    } : {
                        right: -10,
                        bottom: -2,
                        left: "auto",
                        top: "auto"
                    };
                },
                customDefaultBg: function(e) {
                    return e.parentNode && e.parentNode.parentNode && e.parentNode.parentNode.classList.contains("offline") ? "rgb(253, 241, 193)" : "rgb(255, 255, 255)";
                }
            },
            "*.zendesk.com": {
                customDefaultBg: function(e) {
                    return e.classList.contains("ember-text-area") && (e.parentNode && e.parentNode.parentNode && e.parentNode.parentNode.parentNode && !e.parentNode.parentNode.parentNode.classList.contains("is-public") ? "#fff6d9" : "#fff") || null;
                }
            },
            "facebook.com": {
                fieldStateForDomain: function(e) {
                    var t = [ "role:textbox", "testid:ufi_comment_composer", "testid:react-composer-root" ], n = function(e, t) {
                        var n = (0, p["default"])(t, 2), r = (n[0], n[1]);
                        return e.dataset && e.dataset.testid === r ? "testid:" + r : !!v.getParentByData(e, "testid", r) && "testid:" + r;
                    };
                    return t.find(function(t) {
                        var r = t.split(":"), o = (0, p["default"])(r, 2), a = o[0], s = o[1];
                        return "testid" === a ? Boolean(n(e, [ a, s ])) : i(e, [ a, s ]);
                    });
                },
                ghostHeight: function(e) {
                    var t = parseInt(e, 10);
                    return t > 0 ? t + 2 + "px" : t + "px";
                },
                setContainerLineHeight: function(e, t) {
                    var n = a(e), r = {
                        "14px": "18px",
                        "24px": "28px",
                        "30px": "1.2em"
                    };
                    if ("status-attachment-mentions-input" === n) {
                        var o = v.getParentByDepth.call(e, 0);
                        o.style.lineHeight = r[t] || parseInt(t, 10) + 4 + "px";
                    }
                },
                removeContainerFontSize: function(e) {
                    return "status-attachment-mentions-input" === a(e);
                },
                menuPosLeft: function(e, t) {
                    return e && e.el.name && "xhpc_message_text" === e.el.name ? Math.ceil(t) : t;
                },
                forceMinimize: function(e) {
                    return "ufi_reply_composer" === a(e);
                },
                getContainerTextAlign: function(e) {
                    var t = a(e);
                    if ("status-attachment-mentions-input" === t) {
                        var n = v.getParentByDepth.call(e, 4);
                        return n.style.textAlign;
                    }
                },
                btnCustomContainer: function(e) {
                    var t = a(e);
                    if ("ufi_comment_composer" === t || "ufi_reply_composer" === t) return e;
                    if ("status-attachment-mentions-input" === t) {
                        var n = v.getParentByDepth.call(e, 4);
                        return n.parentNode.style.position = "relative", n;
                    }
                    if (e.name && "xhpc_message_text" === e.name) return e;
                    var r = v.getParentByData(e, "testid", "react-composer-root");
                    if (r) {
                        var o = v.getParentByDepth.call(e, 3);
                        return o.parentNode.style.position = "relative", o;
                    }
                    return "webMessengerRecentMessages" === e.getAttribute("aria-controls") ? e : void 0;
                },
                btnCustomStyles: function(e, t) {
                    var n = "auto", r = "auto";
                    if ("webMessengerRecentMessages" === t.getAttribute("aria-controls")) return e ? {
                        right: 10,
                        bottom: 10,
                        left: n,
                        top: r
                    } : {
                        right: -5,
                        bottom: 2,
                        left: n,
                        top: r
                    };
                    var o = a(t);
                    if ("ufi_comment_composer" === o) {
                        var i = 15, s = -4, c = -14, l = v.getParentByDepth.call(t, 6).querySelector(".UFICommentAttachmentButtons"), u = e ? 0 : -(l.clientWidth + i), d = e ? s : c;
                        return {
                            right: u,
                            bottom: d,
                            left: n,
                            top: r
                        };
                    }
                    if ("ufi_reply_composer" === o || t.hasAttribute("aria-haspopup") && t.hasAttribute("aria-owns")) {
                        var f = 17, p = -4, m = -8, h = v.getParentByDepth.call(t, 6).querySelector(".UFICommentAttachmentButtons"), g = e ? 0 : -(h.clientWidth + f), b = e ? p : m;
                        return {
                            right: g,
                            bottom: b,
                            left: n,
                            top: r
                        };
                    }
                    var _ = e ? 10 : -8, y = e ? 10 : -5, w = v.getParentByData(t, "testid", "react-composer-root");
                    if (w) {
                        var k = 30, E = -12, C = 6, x = -3, S = w.querySelectorAll('[aria-label="Post a sticker"], [aria-label="Insert an emoji"]').length > 0;
                        S && (_ = e ? k : E, y = e ? C : x);
                    }
                    return t.name && "xhpc_message_text" === t.name && (y = 50), {
                        right: _,
                        bottom: y,
                        left: n,
                        top: r
                    };
                }
            },
            "mail.google.com": {
                btnCustomContainer: function(e) {
                    var t = v.getParentByTag(e, "TABLE"), n = t && v.getParentByTag(t, "TABLE"), r = n && n.querySelector('[command="Files"]');
                    return n && r ? v.getParentByTag(r, "TABLE") : null;
                },
                btnCustomStyles: function(e) {
                    return e ? {
                        right: 10,
                        top: -30,
                        left: "auto"
                    } : {
                        right: -2,
                        top: -25,
                        left: "auto"
                    };
                },
                shouldRemove: function(e) {
                    var t = v.getParentByTag(e, "TABLE");
                    if (t) {
                        var n = v.getParentByTag(t, "TABLE");
                        if (n) {
                            var r = n.querySelector('[role=toolbar][aria-label="Spell Check"]');
                            return r && r.offsetParent;
                        }
                    }
                }
            },
            "inbox.google.com": {
                btnCustomContainer: function(e) {
                    return e.parentNode;
                },
                btnCustomStyles: function(e) {
                    return e ? {
                        right: 12,
                        top: "auto",
                        left: "auto",
                        bottom: 62
                    } : {
                        right: -5,
                        top: "auto",
                        left: "auto",
                        bottom: 60
                    };
                }
            },
            "medium.com": {
                btnDiff: function(e) {
                    return v.parentHasClass(e, "postArticle--full") ? [ -75, 0, !1 ] : [ 0, 0, !1 ];
                }
            },
            "plus.google.com": {
                forceMinimize: function(e) {
                    return e.clientHeight < 30;
                },
                btnCustomContainer: function(e) {
                    var t = function(e) {
                        return /comment/i.test(e.getAttribute("aria-label") || "");
                    };
                    return y() && t(e) ? e.parentNode : e;
                },
                btnCustomStyles: function(e) {
                    var t = y() ? -12 : -18, n = y() ? -5 : -10;
                    return e ? {
                        right: 10,
                        bottom: 10,
                        left: "auto",
                        top: "auto"
                    } : {
                        right: t,
                        bottom: n,
                        left: "auto",
                        top: "auto"
                    };
                },
                fieldParentCustomStyle: function() {
                    var e = {
                        "padding-bottom": "2px",
                        "overflow-x": "hidden"
                    };
                    return y() ? e : {};
                }
            },
            "app.asana.com": {
                forceMinimize: function(e) {
                    return !!e.classList.contains("task-comments-input") && (!!(e.parentNode && e.parentNode.parentNode && e.parentNode.parentNode.parentNode) && !e.parentNode.parentNode.parentNode.classList.contains("focused"));
                }
            },
            "youtube.com": {
                btnDiff: function(e) {
                    return v.hasClass(e, "comment-simplebox-text") ? [ 15, 15 ] : [ 0, 0 ];
                }
            },
            "socialflow.com": {
                fieldParentCustomStyle: function(e) {
                    return e ? {
                        width: "",
                        overflow: "visible"
                    } : {};
                }
            }
        };
        n.pageStyles = s, function() {
            function e() {
                if (window.randomize) {
                    var e = window.randomize;
                    window.randomize = function(t) {
                        try {
                            if (t.data) {
                                var n = JSON.parse(t.data);
                                n[0] && n[0].parentWindowLocation && e(t);
                            }
                        } catch (r) {}
                    };
                }
            }
            var t = m.getDomain();
            (t.indexOf("chase.com") > -1 || t.indexOf("chaseonline.com") > -1) && b.addScript(document, [ e ]);
        }();
    }, {
        "./client-script": 205,
        "./dom": 215,
        "./location": 277,
        "./util": 322,
        "babel-runtime/core-js/array/from": 19,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/helpers/slicedToArray": 40,
        lodash: "lodash"
    } ],
    295: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return {
                type: n.UPDATE_CONNECTION,
                data: {
                    bgNotConnected: !0,
                    online: !1
                },
                reason: e,
                sync: !1
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.UPDATE_CONNECTION = "connection/UPDATE_CONNECTION", n.bgPageDown = r;
    }, {} ],
    296: [ function(e, t, n) {
        "use strict";
        function r(e) {
            var t = i.createMirrorStore(e, {
                bgPageDown: s.bgPageDown
            }, a.reducer), n = t.store, r = t.actions;
            return o.on("__bgerror", r.bgPageDown), {
                store: n,
                actions: r
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("lib/message"), i = e("lib/store-mirror"), a = e("./reducer"), s = e("./actions");
        n.createAndObserve = r;
    }, {
        "./actions": 295,
        "./reducer": 297,
        "lib/message": 278,
        "lib/store-mirror": 299
    } ],
    297: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], n = t.type, r = t.data;
            switch (n) {
              case s.UPDATE_CONNECTION:
                return (0, a["default"])({}, e, {
                    connection: (0, a["default"])({}, e.connection, r)
                });

              default:
                return e;
            }
        }
        var i = e("babel-runtime/core-js/object/assign"), a = r(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("./actions");
        n.reducer = o;
    }, {
        "./actions": 295,
        "babel-runtime/core-js/object/assign": 24
    } ],
    298: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            function n() {
                var n = e.getState();
                d.isEmpty(n) || d.isEqual(r, n) || (r = n, t(n));
            }
            var r = void 0;
            return f.asyncCall(n), e.subscribe(n);
        }
        var i = e("babel-runtime/helpers/defineProperty"), a = r(i), s = e("babel-runtime/core-js/object/assign"), c = r(s), l = e("babel-runtime/core-js/object/keys"), u = r(l);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var d = e("lodash"), f = e("lib/util");
        n.observeStore = o, n.bindActions = function(e, t) {
            return (0, u["default"])(e).filter(function(t) {
                return e[t];
            }).reduce(function(n, r) {
                return (0, c["default"])(n, (0, a["default"])({}, r, function() {
                    var n = e[r].apply(e, arguments), o = "undefined" == typeof n.sync || n.sync;
                    return t((0, c["default"])({}, n, {
                        sync: o
                    }));
                }));
            }, {});
        };
    }, {
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/helpers/defineProperty": 36,
        "lib/util": 322,
        lodash: "lodash"
    } ],
    299: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments[2], r = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : h, t = arguments[1], r = e.page || e.config || {}, o = r.domain;
                return t.sync && l.emitBackground("dispatch", (0, a["default"])({}, t, {
                    domain: o
                })), t.type === m ? (0, a["default"])({}, e, t.data) : n ? n(e, t) : e;
            }, o = c.createStore(r, {}, c.applyMiddleware(p)), i = d.bindActions((0, a["default"])({}, u.pureActions, t), o.dispatch);
            return l.on("state", function(e) {
                f.asyncCall(function() {
                    return o.dispatch({
                        type: m,
                        data: e
                    });
                }, 0);
            }), d.observeStore(o, e), {
                store: o,
                actions: i
            };
        }
        var i = e("babel-runtime/core-js/object/assign"), a = r(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("redux-logger"), c = e("redux"), l = e("lib/message"), u = e("universal/bg/store"), d = e("./helpers"), f = e("../util"), p = s({
            level: "debug",
            collapsed: function() {
                return !0;
            },
            predicate: function() {
                return !1;
            }
        }), m = "store/SYNC", h = {
            page: {},
            connection: {}
        };
        n.createMirrorStore = o;
    }, {
        "../util": 322,
        "./helpers": 298,
        "babel-runtime/core-js/object/assign": 24,
        "lib/message": 278,
        redux: "redux",
        "redux-logger": "redux-logger",
        "universal/bg/store": 341
    } ],
    300: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            function e(e) {
                l.listen(document, e, function(t) {
                    var n = t.value;
                    u.emitBackground(e, n);
                });
            }
            function t(e) {
                var t = [];
                return (0, c["default"])(e, function(e, n) {
                    if ("object" === ("undefined" == typeof n ? "undefined" : (0, a["default"])(n)) && null !== n) {
                        if (t.indexOf(n) !== -1) return;
                        t.push(n);
                    }
                    return n;
                });
            }
            function n() {
                l.emitDomEvent("console-log", t(d.flushLog()));
            }
            function r() {
                u.emitBackground("get-tracker-log", {}, function(e) {
                    return l.emitDomEvent("tracker-log", e);
                });
            }
            function o() {
                u.emitBackground("get-capi-log", {}, function(e) {
                    return l.emitDomEvent("capi-log", e);
                });
            }
            function i() {
                u.emitBackground("get-extid", {}, function(e) {
                    return l.emitDomEvent("extid", e);
                });
            }
            function s() {
                u.emitBackground("get-localforage", {}, function(e) {
                    return l.emitDomEvent("localforage", e);
                });
            }
            function f(e) {
                u.emitBackground("set-localforage", {
                    key: e.key,
                    value: e.value
                }, function(e) {
                    return l.emitDomEvent("localforage", e);
                });
            }
            function p(e) {
                var t = e.key;
                u.emitBackground("get-pref", {
                    key: t
                }, function(e) {
                    return l.emitDomEvent("pref", {
                        key: t,
                        value: e
                    });
                });
            }
            function m(e) {
                var t = e.key, n = e.value;
                u.emitBackground("set-pref", {
                    key: t,
                    value: n
                });
            }
            function h() {
                u.emitBackground("get-ff-uuid", {}, function(e) {
                    return l.emitDomEvent("ff-uuid", e);
                });
            }
            [ "bg-reload", "reset", "qa-relogin", "disable-auth", "enable-auth", "disable-defs", "enable-defs", "disable-domain", "enable-domain", "uninstall", "set-popup-url", "set-premium-user", "set-fake-capi", "run-fake-capi", "disable-send-state-to-tabs", "enable-send-state-to-tabs" ].forEach(e), 
            l.listen(document, "get-extid", i), l.listen(document, "get-ff-uuid", h), l.listen(document, "get-capi-log", o), 
            l.listen(document, "get-tracker-log", r), l.listen(document, "get-console-log", n), 
            l.listen(document, "get-localforage", s), l.listen(document, "set-localforage", f), 
            l.listen(document, "get-pref", p), l.listen(document, "set-prefs", m);
        }
        var i = e("babel-runtime/helpers/typeof"), a = r(i), s = e("babel-runtime/core-js/json/stringify"), c = r(s);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = e("./dom"), u = e("./message"), d = e("./console");
        n.api = o;
    }, {
        "./console": 212,
        "./dom": 215,
        "./message": 278,
        "babel-runtime/core-js/json/stringify": 22,
        "babel-runtime/helpers/typeof": 42
    } ],
    301: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = {};
        n.timers = {
            start: function(e) {
                r[e] = Date.now();
            },
            stop: function(e) {
                var t = this.passed(e);
                return delete r[e], t;
            },
            passed: function(e) {
                return e && r[e] ? Date.now() - r[e] : 0;
            }
        };
    }, {} ],
    302: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var e = window.fetch.bind(window), t = y.LoggingImpl.DefaultLogAppender.createRootLogger("gnar", y.Logging.LogLevel.INFO, new y.LoggingImpl.GetFelogClient(m.URLS.newFelog, m.appName, m.getVersion(), m.ENV, e)), n = y.TimeSeriesImpl.MetricsStorage.createRoot("gnar", m.URLS.newFelog, e), r = new _.BackendStorage(e, g.GNAR.url), o = new _.ChromeCookieStorage(g.GNAR.url, g.GNAR.domain), i = new _.WebExtensionsCookieStorage(g.GNAR.url, g.GNAR.domain), a = new _.ContainerIdManager(h.isChrome() ? o : h.isFF() ? i : r, [ new _.CookieStorage(g.GNAR.domain), new _.LocalStorage(), new _.MemoryStorage() ], t.getLogger("containerId"), n.getCounter("containerId"), h.isChrome() ? 1e3 : 5e3);
            return new _.GnarClientImpl(g.GNAR.url, m.gnarAppName, g.getVersion(), e, a, t, n, (!0));
        }
        function i() {
            return d(this, void 0, void 0, c["default"].mark(function e() {
                return c["default"].wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        try {
                            b.tracker().gnar = o();
                        } catch (t) {
                            v.logger.gnarClientInitFail(t && t.message);
                        }

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
        }
        function a(e) {
            function t(e, t) {
                t && e && (f(e, null), f(e, t, o));
            }
            var n = e.dapi, r = p.getDomain(), o = {
                path: "/",
                domain: r,
                expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            };
            t("__fngrprnt__", n);
        }
        var s = e("babel-runtime/regenerator"), c = r(s), l = e("babel-runtime/core-js/promise"), u = r(l), d = function(e, t, n, r) {
            return new (n || (n = u["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var f = e("cookie"), p = e("../location"), m = e("../config"), h = e("../util"), g = e("../config"), b = e("./tracker"), v = e("./logger"), _ = e("@grammarly-npm/gnarclientweb"), y = e("@grammarly-npm/telemetry.ts");
        n.init = i, n.processCookiesFromGrammarly = a, n.getContainerIdOrUndefined = function() {
            return d(void 0, void 0, void 0, c["default"].mark(function e() {
                return c["default"].wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, e.next = 3, b.tracker().gnar.getContainerId();

                      case 3:
                        return e.abrupt("return", e.sent);

                      case 6:
                        return e.prev = 6, e.t0 = e["catch"](0), e.abrupt("return", void 0);

                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 6 ] ]);
            }));
        };
    }, {
        "../config": 211,
        "../location": 277,
        "../util": 322,
        "./logger": 308,
        "./tracker": 311,
        "@grammarly-npm/gnarclientweb": 5,
        "@grammarly-npm/telemetry.ts": 8,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/regenerator": 43,
        cookie: "cookie"
    } ],
    303: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            var o = function(t) {
                console.warn("tracking call " + e + " failed, reason: ", t);
            };
            if (h.isBg()) h.asyncCall(function() {
                var t;
                try {
                    switch (a(e, n), e) {
                      case p.CALL_HANDLER_ID:
                        var r = n[0], s = n.slice(1);
                        (t = p.methods)[r].apply(t, (0, u["default"])(s));
                        break;

                      default:
                        i(e, n);
                    }
                } catch (c) {
                    o(c);
                }
            }, 20); else {
                var s = 1e4, c = void 0, l = function() {
                    return clearInterval(c);
                }, d = function(e) {
                    l(), o(e);
                };
                c = window.setTimeout(function() {
                    return d("timeout call through bg page");
                }, s), m.emitBackground("tracking-call", {
                    msg: e,
                    data: n
                }, l);
            }
        }
        function i(e, t) {
            var n = e.split("."), r = n.pop(), o = n.reduce(function(e, t) {
                return t in e ? e[t] : {};
            }, g.tracker());
            return o && r && o[r] ? void o[r].apply(o, (0, u["default"])(t)) : console.error("No method " + e + " in tracker object");
        }
        function a(e, t) {
            console.info(e, t);
        }
        function s() {
            var e = w.slice(0);
            return w.length = 0, e;
        }
        var c = e("babel-runtime/core-js/object/assign"), l = (r(c), e("babel-runtime/helpers/toConsumableArray")), u = r(l), d = e("babel-runtime/core-js/object/keys"), f = r(d);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var p, m = e("../message"), h = e("../util"), g = e("./tracker"), b = e("./felogPixel"), v = e("../config"), _ = e("./felogClient"), y = e("lib/request");
        !function(e) {
            var t, n = h.isBg() ? new _.DefaultFelogClient(v.URLS.newFelog, v.appName, v.getVersion(), v.ENV, y.fetch.bind(window)) : void 0;
            !function(e) {
                function t(e, t, r, o) {
                    if (!n) throw Error("felogClient unavailable");
                    n.sendEvent(e, t, r, o)["catch"](function(i) {
                        return b.sendEventPixel(e, t, r, o, n.getContext());
                    });
                }
                function r(e, t, r, o) {
                    if (!n) throw Error("felogClient unavailable");
                    n.sendUsageEvent(e, t, r, o)["catch"](function(n) {
                        return b.sendEventPixel(e, t, r);
                    });
                }
                function o(e) {
                    n && n.setUserId(e);
                }
                function i(e) {
                    n && n.setContainerId(e);
                }
                e.sendFelog = t, e.sendFelogUsageEvent = r, e.setUserId = o, e.setContainerId = i;
            }(t = e.methods || (e.methods = {})), e.CALL_HANDLER_ID = "tracking/RPC";
        }(p || (p = {})), n.callBgPage = (0, f["default"])(p.methods).reduce(function(e, t) {
            return e[t] = function() {
                for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                return o.apply(void 0, [ p.CALL_HANDLER_ID, t ].concat(n));
            }, e;
        }, {});
        var w = [];
        n.call = o, n.getLog = s;
    }, {
        "../config": 211,
        "../message": 278,
        "../util": 322,
        "./felogClient": 305,
        "./felogPixel": 306,
        "./tracker": 311,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/helpers/toConsumableArray": 41,
        "lib/request": 291
    } ],
    304: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t, n, r, o, i, a, l, u) {
            var d = {
                message: i,
                logger: o,
                level: c.toFelogString(a),
                application: e,
                version: t,
                userId: u && u.userId,
                containerId: u && u.containerId,
                env: n
            };
            return l && (d.extra = l), r + "/log?json=" + encodeURIComponent((0, s["default"])(d));
        }
        function i(e, t, n, r, o, i, a, l) {
            var u = {
                message: i,
                logger: o,
                level: c.toFelogString(a),
                application: e,
                version: t,
                env: n,
                extra_usage: l
            };
            return r + "/log?json=" + encodeURIComponent((0, s["default"])(u));
        }
        var a = e("babel-runtime/core-js/json/stringify"), s = r(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c;
        !function(e) {
            e[e.INFO = 0] = "INFO", e[e.WARN = 1] = "WARN", e[e.ERROR = 2] = "ERROR";
        }(c = n.LogLevel || (n.LogLevel = {})), function(e) {
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
        }(c = n.LogLevel || (n.LogLevel = {})), n.felogRequestUrl = o, n.felogUsageRequestUrl = i;
    }, {
        "babel-runtime/core-js/json/stringify": 22
    } ],
    305: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/assign"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = e("@grammarly-npm/telemetry.ts/lib/timeseries_impl"), d = e("./felog"), f = e("lib/util"), p = function() {
            function e(t, n, r, o, i) {
                (0, s["default"])(this, e), this._baseUrl = t, this._appName = n, this._appVersion = r, 
                this._env = o, this._fetch = i, this._context = {
                    userId: void 0,
                    containerId: void 0
                }, this._metrics = u.MetricsStorage.createRoot(this._env + "." + this._appName, this._baseUrl, this._fetch);
            }
            return (0, l["default"])(e, [ {
                key: "setUserId",
                value: function(e) {
                    this._context = (0, i["default"])({}, this._context, {
                        userId: e
                    });
                }
            }, {
                key: "setContainerId",
                value: function(e) {
                    this._context = (0, i["default"])({}, this._context, {
                        containerId: e
                    });
                }
            }, {
                key: "getContext",
                value: function() {
                    return this._context;
                }
            }, {
                key: "sendEvent",
                value: function(e, t, n, r) {
                    return this._fetch(d.felogRequestUrl(this._appName, this._appVersion, this._env, this._baseUrl, e, t, n, r, this._context), {
                        mode: "no-cors",
                        method: "get",
                        cache: "no-cache"
                    }).then(function(e) {})["catch"](function(e) {});
                }
            }, {
                key: "sendUsageEvent",
                value: function(e, t, n, r) {
                    var o = {
                        domain: r.domain,
                        accountType: r.accountType,
                        fieldType: r.fieldType,
                        fieldSupported: r.fieldSupported
                    };
                    if (this._context.containerId || this._context.userId) {
                        var i = (this._context.containerId || this._context.userId) + r.domain;
                        o.groupInfo = f.normalizedHashCode(i, 1e9);
                    }
                    return this._fetch(d.felogUsageRequestUrl(this._appName, this._appVersion, this._env, this._baseUrl, e, t, n, o), {
                        mode: "no-cors",
                        method: "get",
                        cache: "no-cache"
                    }).then(function(e) {})["catch"](function(e) {});
                }
            }, {
                key: "sendCounter",
                value: function(e, t) {
                    this._metrics.getCounter(e).increment(t);
                }
            }, {
                key: "sendTimer",
                value: function(e, t) {
                    this._metrics.getTimer(e).recordTime(t);
                }
            } ]), e;
        }();
        n.DefaultFelogClient = p;
    }, {
        "./felog": 304,
        "@grammarly-npm/telemetry.ts/lib/timeseries_impl": 13,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "lib/util": 322
    } ],
    306: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t, n, r, o) {
            var i = document.createElement("img");
            return i.src = c.felogRequestUrl(s.appName, s.getVersion(), s.ENV, s.URLS.newFelog, e, t, n, r, o), 
            a["default"].resolve();
        }
        var i = e("babel-runtime/core-js/promise"), a = r(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("../newConfig"), c = e("./felog");
        n.sendEventPixel = o;
    }, {
        "../newConfig": 279,
        "./felog": 304,
        "babel-runtime/core-js/promise": 31
    } ],
    307: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var t = e("./bgonly"), n = t.init, r = t.processCookiesFromGrammarly;
            n()["catch"](function(e) {
                return f.logger.bgTrackingInitFail();
            }), m = e("./on").on, u.on("tracking-fire", function(e) {
                var t = e.msg, n = e.data;
                return i.apply(void 0, [ t ].concat((0, c["default"])(n)));
            }), u.on("tracker-init", r), u.on("tracking-call", function(e) {
                var t = e.msg, n = e.data, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l._f;
                d.call.apply(d, [ t ].concat((0, c["default"])(n))), r();
            }), i("activity-ping");
        }
        function i(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            if (l.isBg()) {
                if (!m[e]) return console.error("No handler specified for message: " + e);
                l.asyncCall(function() {
                    var t;
                    return (t = m)[e].apply(t, n);
                }, 20);
            } else u.emitBackground("tracking-fire", {
                msg: e,
                data: n
            });
        }
        function a() {
            function t() {
                n++, n > i && clearInterval(o);
                var e = {
                    gnar: r("gnar_containerId"),
                    dapi: r("__fngrprnt__")
                };
                clearInterval(o), u.emitBackground("tracker-init", e);
            }
            var n = 0, r = e("cookie");
            r["default"] && (r = r["default"]);
            var o = setInterval(t, 500), i = 10;
        }
        var s = e("babel-runtime/helpers/toConsumableArray"), c = r(s);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = e("../util"), u = e("../message"), d = e("./call"), f = e("./logger");
        n.logger = f.logger;
        var p = e("./call");
        n.call = p.call, n.getLog = p.getLog;
        var m = {};
        n.initBg = o, n.fire = i, n.initContentScript = a;
    }, {
        "../message": 278,
        "../util": 322,
        "./bgonly": 302,
        "./call": 303,
        "./logger": 308,
        "./on": 309,
        "babel-runtime/helpers/toConsumableArray": 41,
        cookie: "cookie"
    } ],
    308: [ function(e, t, n) {
        "use strict";
        function r() {
            window.addEventListener("error", function(e) {
                return n.logger.unhandledBgPageException(e);
            }), window.addEventListener("unhandledrejection", function(e) {
                return n.logger.unhandledBgPageRejection(e);
            });
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./call"), i = e("./telemetry"), a = e("../newConfig");
        n.logger = new i.Telemetry(o.callBgPage.sendFelog.bind(o.callBgPage), o.callBgPage.sendFelogUsageEvent.bind(o.callBgPage), o.callBgPage.setUserId.bind(o.callBgPage), o.callBgPage.setContainerId.bind(o.callBgPage)), 
        a.isBg() && (console.info("Installing unhandled error loggers..."), r());
    }, {
        "../newConfig": 279,
        "./call": 303,
        "./telemetry": 310
    } ],
    309: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o, i = e("babel-runtime/helpers/defineProperty"), a = r(i), s = e("babel-runtime/regenerator"), c = r(s), l = e("babel-runtime/helpers/slicedToArray"), u = r(l), d = e("babel-runtime/core-js/promise"), f = r(d), p = function(e, t, n, r) {
            return new (n || (n = f["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("../util"), h = e("./call"), g = e("./logger"), b = e("universal/bg/prefs"), v = e("extension-api");
        n.on = (o = {}, (0, a["default"])(o, "activity-ping", function() {}), (0, a["default"])(o, "daily-ping", function(e, t) {
            return p(this, void 0, void 0, c["default"].mark(function n() {
                var r, o, i, a, s, l, d;
                return c["default"].wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        if (e) {
                            n.next = 2;
                            break;
                        }
                        return n.abrupt("return");

                      case 2:
                        return h.call("gnar.pingMaybe"), r = new b.PrefsImpl(v.getGlobalExtensionApi().preferences), 
                        n.next = 6, r.get("pingDate");

                      case 6:
                        if (o = n.sent, "string" != typeof o && (o = ""), i = o.split("|"), a = (0, u["default"])(i, 2), 
                        s = a[0], l = a[1], d = t ? "cookiesDisabled" : e, !(s && s > Date.now() && l === d)) {
                            n.next = 12;
                            break;
                        }
                        return n.abrupt("return");

                      case 12:
                        return g.logger.dailyPing(), n.next = 15, r.set("pingDate", [ m.getNextPingDate(), d ].join("|"));

                      case 15:
                      case "end":
                        return n.stop();
                    }
                }, n, this);
            }));
        }), (0, a["default"])(o, "app_signin_success", function(e) {
            h.call("gnar.track", "userLoginForm/accepted", {
                placement: e
            });
        }), (0, a["default"])(o, "app_signup_success", function(e) {
            h.call("gnar.track", "userAccountSignupForm/accepted", {
                placement: e
            });
        }), (0, a["default"])(o, "signin-error", function(e) {
            e.errorType = "Server-Side", h.call("gnar.track", "userLoginForm/rejected");
        }), (0, a["default"])(o, "signup-error", function(e) {
            e.errorType = "Server-Side", h.call("gnar.track", "userAccountSignupForm/rejected");
        }), (0, a["default"])(o, "upgrade-after-register", function() {
            return p(this, void 0, void 0, c["default"].mark(function e() {
                return c["default"].wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        h.call("gnar.track", "Account_Type_Selected");

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
        }), (0, a["default"])(o, "hook-clicked", function(e) {
            h.call("gnar.track", "upgradeHookClicked", {
                placement: e
            }), g.logger.userUpgradeClick(e);
        }), (0, a["default"])(o, "correct-btn-clicked", function() {
            h.call("gnar.track", "gbuttonClicked"), g.logger.gButtonClick();
        }), (0, a["default"])(o, "btn-disable-in-field", function(e) {
            h.call("gnar.track", "checkingInFieldToggled", {
                enabled: e
            }), g.logger.checkingToggledInField(e);
        }), (0, a["default"])(o, "button-change-state", function() {}), (0, a["default"])(o, "login-attempt", function(e) {
            h.call("gnar.track", "signInClicked", {
                placement: e
            });
        }), (0, a["default"])(o, "show-dictionary", function() {
            h.call("gnar.track", "showDictionary");
        }), (0, a["default"])(o, "referral-shown", function(e) {
            h.call("gnar.track", "referral/referralNotificationShown", {
                placement: e
            });
        }), (0, a["default"])(o, "referral-clicked", function(e) {
            h.call("gnar.track", "referral/referralButtonClicked", {
                placement: e
            });
        }), (0, a["default"])(o, "tab-connected", function(e, t, n, r, o) {
            var i = t.enabled, a = n.cookiesDisabled;
            this["daily-ping"](e.id, a), i || o === !0 || g.logger.disabledTabLoad(r, e.type);
        }), (0, a["default"])(o, "session-invalidate", function(e, t, n, r, o) {
            var i = e.id, a = e.anonymous, s = e.isTest;
            i !== t.id && (h.call("gnar.setUser", i, s), this["daily-ping"](i, r)), n && g.logger.sessionInvalidated(n, i !== t.id), 
            t.email && !t.anonymous && a && g.logger.unexpectedAnonymous({
                email: t.email,
                token: t.token,
                grauth: t.grauth,
                tokenEqualsGrauth: t.token === t.grauth,
                cookiesDisabled: r,
                reason: n
            });
        }), (0, a["default"])(o, "set-dapi-prop", function(e, t) {
            "dialectWeak" === e && h.call("gnar.track", "languageWeakPreference", {
                dialect: t
            }), g.logger.dapiPropInitialized(e, t);
        }), (0, a["default"])(o, "change-dialect", function(e) {
            var t = e.language, n = e.dialectWeak, r = {
                language: t
            };
            n && (r.sameAsWeak = t === n), h.call("gnar.track", "languageStrongPreference", r);
        }), (0, a["default"])(o, "change-defs", function(e) {
            h.call("gnar.track", "definitionsToggled", e), g.logger.toggleExtensionDefs(e.enabled);
        }), (0, a["default"])(o, "checking-toggled", function(e) {
            h.call("gnar.track", "checkingToggled", e), g.logger.toggleExtension(e.enabled, e.placement);
        }), (0, a["default"])(o, "disable-until-next-visit", function() {
            h.call("gnar.track", "disableUntilNextVisit"), g.logger.disableUntilNextVisit();
        }), (0, a["default"])(o, "disable-button-click", function() {
            h.call("gnar.track", "disableButtonClick"), g.logger.disableButtonClick();
        }), (0, a["default"])(o, "popup-open", function() {
            h.call("gnar.track", "browserToolbarButtonClicked");
        }), (0, a["default"])(o, "popup-open-on-unsupported", function() {
            h.call("gnar.track", "browserToolbarButtonClicked/unsupported");
        }), (0, a["default"])(o, "cookie-overflow", function(e, t) {
            g.logger.cookieOverflow(e, t);
        }), (0, a["default"])(o, "premium-popup-show", function() {
            h.call("gnar.track", "upgradeReferralPopupShown");
        }), (0, a["default"])(o, "premium-popup-upgrade-click", function() {
            h.call("gnar.track", "upgradeReferralPremiumBtnClicked");
        }), (0, a["default"])(o, "premium-popup-referral-click", function() {
            h.call("gnar.track", "upgradeReferralInviteBtnClicked");
        }), (0, a["default"])(o, "email-perception-popup-show", function(e) {
            h.call("gnar.track", "askForFeedback-popup-show", {
                isFirstShown: e
            }), g.logger.emailPerceptionPopupShow();
        }), (0, a["default"])(o, "email-perception-popup-cancel", function(e) {
            h.call("gnar.track", "askForFeedback-popup-cancel", {
                isFirstShown: e
            }), g.logger.emailPerceptionPopupCancel();
        }), (0, a["default"])(o, "email-perception-button-hover", function() {
            h.call("gnar.track", "askForFeedback-button-hover"), g.logger.emailPerceptiongButtonHover();
        }), (0, a["default"])(o, "email-perception-learn-more-click", function() {
            h.call("gnar.track", "emailPerceptionOptInLearnMore-button-click");
        }), (0, a["default"])(o, "email-perception-disable-click", function() {
            h.call("gnar.track", "dontShowEmailPerceptionAgain-button-click");
        }), (0, a["default"])(o, "onboarding-popup-show", function() {
            h.call("gnar.track", "onboarding-popup-show"), g.logger.onboardingPopupShow();
        }), (0, a["default"])(o, "onboarding-popup-cancel", function() {
            h.call("gnar.track", "onboarding-popup-cancel"), g.logger.onboardingPopupCancel();
        }), (0, a["default"])(o, "onboardingTutorial-popup-show", function() {
            h.call("gnar.track", "onboardingTutorial-popup-show"), g.logger.onboardingTutorialShow();
        }), (0, a["default"])(o, "onboardingTutorialNext-button-click", function() {
            h.call("gnar.track", "onboardingTutorialNext-button-click");
        }), (0, a["default"])(o, "onboardingTutorialPersonalize-button-click", function() {
            h.call("gnar.track", "onboardingTutorialPersonalize-button-click");
        }), (0, a["default"])(o, "onboardingTutorialSave-button-click", function() {
            h.call("gnar.track", "onboardingTutorialSave-button-click");
        }), (0, a["default"])(o, "onboardingTutorialLetsWrite-button-click", function() {
            h.call("gnar.track", "onboardingTutorialLetsWrite-button-click");
        }), o);
    }, {
        "../util": 322,
        "./call": 303,
        "./logger": 308,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/slicedToArray": 40,
        "babel-runtime/regenerator": 43,
        "extension-api": 177,
        "universal/bg/prefs": 331
    } ],
    310: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/json/stringify"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/createClass"), l = r(c);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = e("./felog"), d = .1, f = .05, p = function() {
            function e(t, n, r, o) {
                var i = this;
                (0, s["default"])(this, e), this._sendFelog = t, this._sendFelogUsage = n, this._setUserId = r, 
                this._setContainerId = o, this.pageLoadTimeout = function() {
                    i._send("cs.connection.failover.pageLoad.timeout", "content script init failed", u.LogLevel.ERROR);
                }, this.appLoadTimeout = function() {
                    i._send("cs.connection.failover.appLoad.timeout", "extension init timed out", u.LogLevel.ERROR);
                }, this.differentStateDomain = function(e) {
                    i._send("cs.state.differentDomain", "received state for different domain", u.LogLevel.INFO, {
                        stateDomain: e
                    });
                }, this.restoredBgConnection = function(e) {
                    i._send("cs.connection.bg.restored", "bg page connection restored", u.LogLevel.INFO, {
                        timeWithoutConnection: e
                    });
                }, this.initWithoutBgConnection = function() {
                    i._send("cs.connection.bg.disconnected", "no connection to bg page", u.LogLevel.INFO);
                }, this.fetchDefinitionsFail = function() {
                    i._send("cs.connection.api.definition.failed", "definitions fetch failed", u.LogLevel.WARN);
                }, this.infinityCheckResetFail = function(e) {
                    i._send("cs.connection.infiniteCheck.failed", "infinite check reset failed", u.LogLevel.ERROR, {
                        delay: e
                    });
                }, this.tooLongPageConfigInit = function(e) {
                    i._send("cs.pageConfig.init.exceeded", "page config init timeout", u.LogLevel.WARN, {
                        initTime: e
                    });
                }, this.tooLongUserUpdateTime = function(e) {
                    i._send("bg.state.user.update.exceeded", "user state update took too long", u.LogLevel.WARN, {
                        updateTime: e
                    });
                }, this.lostBgPageConnection = function() {
                    i._send("cs.gbutton.bgСonnection.lost", "gbutton connection to bg page lost", u.LogLevel.INFO);
                }, this.restoreBgPageConnection = function(e) {
                    i._send("cs.gbutton.bgСonnection.restored", "gbutton connection to bg page restored", u.LogLevel.INFO, {
                        time: e
                    });
                }, this.badCursorPosition = function() {
                    i._send("cs.editor.badCursorPosition", "incorrect cursor position in grammarly-editor", u.LogLevel.INFO);
                }, this.cursorJump = function() {
                    i._send("cs.editor.cursorJump", "cursor jump detected", u.LogLevel.WARN);
                }, this.signinOpen = function() {
                    i._send("cs.signin.open", "sign in dialog opened", u.LogLevel.INFO);
                }, this.signinClose = function(e) {
                    i._send("cs.signin.close", "sign in dialog closed", u.LogLevel.INFO, {
                        openTime: e
                    });
                }, this.tabReloadClick = function() {
                    i._send("cs.gbutton.reload.click", "gbutton reload clicked", u.LogLevel.WARN);
                }, this.popupLoadError = function(e, t) {
                    i._send("cs.popup.load.error", "could not open pop-up editor", u.LogLevel.ERROR, {
                        message: e,
                        name: t
                    });
                }, this.loginNoBgPageConnection = function(e) {
                    i._send("debug.cs.connection.signin.bg.timeout", "can not connect to bg page on login", u.LogLevel.INFO, {
                        message: e
                    });
                }, this.pageConfigCDNError = function(e) {
                    i._send("cs.pageConfig.cdn.error", "could not read page config", u.LogLevel.ERROR, {
                        message: e
                    });
                }, this.pageConfigLocalStorageError = function(e, t) {
                    i._send("cs.pageConfig.localStorage.error", "could not read page config from localStorage", u.LogLevel.INFO, {
                        message: e,
                        name: t
                    });
                }, this.pageConfigUpdated = function(e, t) {
                    i._send("cs.pageConfig.updated", "page config updated", u.LogLevel.INFO, {
                        oldVersion: e,
                        newVersion: t
                    });
                }, this.settingsPopupTimeout = function() {
                    i._send("settings.popup.init.timeout", "settings popup open timeout", u.LogLevel.WARN);
                }, this.settingsUsupportedShow = function(e) {
                    i._send("settings.popup.state.unsupported.show", "page unsupported message shown", u.LogLevel.INFO, {
                        popupType: e
                    });
                }, this.settingsPopupToggled = function(e) {
                    i._send("settings.popup.experiment.toggle", "settings popup disabled/enabled for experiment on /personalize page", u.LogLevel.INFO, {
                        isPopupDisabled: e
                    });
                }, this.socketBgError = function() {
                    i._send("bg.socket.error", "bg page socket error", u.LogLevel.WARN);
                }, this.capiNotAuthorizedLoop = function(e, t) {
                    i._send("debug.socket.notAuthorizedLoop", "could not authenticate on capi and auth", u.LogLevel.INFO, {
                        authDegradation: e,
                        cookiesDisabled: t
                    });
                }, this.socketDisabledCookie = function() {
                    i._send("debug.socket.disabledCookies", "disabled cookies after failed authentication", u.LogLevel.INFO);
                }, this.socketBgRestored = function(e) {
                    i._send("debug.bg.socket.restored", "capi session restored", u.LogLevel.INFO, {
                        tryCount: e
                    });
                }, this.socketBgReconnectFail = function(e, t) {
                    i._send("bg.socket.reconnect.fail", "could not restore ws connection", u.LogLevel.WARN, {
                        token: e,
                        tryCount: t
                    });
                }, this.socketCsError = function() {
                    i._send("cs.socket.error", "content script socket error", u.LogLevel.WARN);
                }, this.soketCsErrorMsg = function(e) {
                    i._send("cs.socket.errorMsg", "capi error", u.LogLevel.WARN, {
                        message: e
                    });
                }, this.gnarClientInitFail = function(e) {
                    i._send("gnar.bg.tracking.gnar.init.fail", "gnar init failed", u.LogLevel.WARN, {
                        message: e
                    });
                }, this.bgTrackingInitFail = function() {
                    i._send("debug.tracking.init.fail", "bg page tracking library init failed", u.LogLevel.INFO);
                }, this.dailyPing = function() {
                    i._send("debug.dailyPing", "daily ping", u.LogLevel.INFO);
                }, this.userUpgradeClick = function(e) {
                    i._send("cs.ui.action.upgradeClick", "upgrade hook clicked", u.LogLevel.INFO, {
                        placement: e
                    });
                }, this.gButtonClick = function() {
                    i._send("cs.ui.gbutton.click", "gbutton clicked", u.LogLevel.INFO);
                }, this.checkingToggledInField = function(e) {
                    i._send("cs.ui.gbutton.toggleInField", "checking toggled in field", u.LogLevel.INFO, {
                        enabled: e
                    });
                }, this.sessionInvalidated = function(e, t) {
                    i._send("bg.session.invalidated", "user session invalidated", u.LogLevel.INFO, {
                        reason: e,
                        userChanged: t
                    });
                }, this.unexpectedAnonymous = function(e) {
                    i._send("debug.bg.session.unexpectedAnonymous", "user changed to anonymous", u.LogLevel.INFO, e);
                }, this.dapiPropInitialized = function(e, t) {
                    i._send("bg.settings.dapi.prop.init", "save property to the DAPI", u.LogLevel.INFO, {
                        name: e,
                        value: t
                    });
                }, this.getDapiPropError = function(e, t) {
                    i._send("bg.connection.dapi.getProp.error", "could not get dapi property", u.LogLevel.WARN, {
                        property: e,
                        body: t
                    });
                }, this.setDapiPropError = function(e, t) {
                    i._send("bg.connection.dapi.setProp.error", "could not set dapi property", u.LogLevel.WARN, {
                        property: e,
                        body: t
                    });
                }, this.toggleExtensionDefs = function(e) {
                    i._send("bg.settings.definitions.toggle", "definitions toggled for domain", u.LogLevel.INFO, {
                        enabled: e
                    });
                }, this.toggleExtension = function(e, t) {
                    i._send("bg.settings.extension.toggle", "extension toggled for domain", u.LogLevel.INFO, {
                        enabled: e,
                        placement: t
                    });
                }, this.disableUntilNextVisit = function() {
                    i._send("cs.gbutton.disableUntilNextVisit", "extension temporary disabled on the current tab", u.LogLevel.INFO);
                }, this.disableButtonClick = function() {
                    i._send("cs.gbutton.disableButtonClick", "clicked on disable button in gButton", u.LogLevel.INFO);
                }, this.cookieOverflow = function(e, t) {
                    i._send("debug.bg.state.cookie.overflow", "cookie is too big", u.LogLevel.INFO, {
                        size: e,
                        biggestCookie: t
                    });
                }, this.externalChangePlan = function() {
                    i._send("bg.api.external.changePlan", "plan changed from editor", u.LogLevel.INFO);
                }, this.externalChangeDialect = function() {
                    i._send("bg.api.external.changeDialect", "dialect changed from editor", u.LogLevel.INFO);
                }, this.externalChangeUser = function() {
                    i._send("bg.api.external.changeUsed", "user changed from editor", u.LogLevel.INFO);
                }, this.externalLogout = function() {
                    i._send("bg.api.external.logout", "user logged out form editor", u.LogLevel.INFO);
                }, this.externalEnableEmailPerception = function() {
                    i._send("bg.api.external.enableEmailPerception", "user enabled email perception feature on the funnel", u.LogLevel.INFO);
                }, this.bgPageStartFail = function(e, t) {
                    i._send("bg.start.fail", "bg page start failed", u.LogLevel.ERROR, {
                        message: e,
                        stack: t
                    });
                }, this.bgPageInitTimeout = function(e) {
                    i._send("bg.state.start.timeout", "bg page init timeout", u.LogLevel.WARN, {
                        initTime: e
                    });
                }, this.bgPageInitFail = function(e) {
                    i._send("bg.state.init.fail", "bg page init failed", u.LogLevel.ERROR, {
                        initAttempts: e
                    });
                }, this.extensionUpdated = function(e, t) {
                    i._send("bg.state.updated", "extension updated", u.LogLevel.INFO, {
                        currentVersion: e,
                        previousVersion: t
                    });
                }, this.extensionUpdateFail = function(e) {
                    i._send("bg.state.update.fail", "extension update failed", u.LogLevel.INFO, {
                        previousVersion: e
                    });
                }, this.cannotGetInstallSource = function() {
                    i._send("bg.getSource.fail", "failed to get extension install source", u.LogLevel.WARN);
                }, this.extensionInstall = function(e) {
                    i._send("bg.state.install", "extension installed", u.LogLevel.INFO, {
                        source: e
                    });
                }, this.chromeForcedToUpdate = function(e) {
                    i._send("bg.chrome.forcedToUpdate", "chrome forced update", u.LogLevel.INFO, {
                        newVersion: e
                    });
                }, this.chromeContentScriptLoadError = function(e, t) {
                    i._send("bg.chrome.cs.load.error", "content script execution error", u.LogLevel.WARN, {
                        message: e,
                        type: t
                    });
                }, this.reloadNotificationShow = function() {
                    i._send("bg.ui.notification.tabsReload.show", "extension reload notification shown", u.LogLevel.WARN);
                }, this.reloadNotificationClick = function() {
                    i._send("bg.ui.notification.tabsReload.click", "reload notification clicked", u.LogLevel.INFO);
                }, this.fetchUserFail = function(e, t, n) {
                    i._send("bg.user.fetch.fail", "failed to update user", u.LogLevel.WARN, {
                        body: t,
                        statusCode: n,
                        reason: e
                    });
                }, this.fetchMimicFail = function(e, t) {
                    i._send("bg.user.mimic.fail", "mimic request failed", u.LogLevel.WARN, {
                        body: e,
                        statusCode: t
                    });
                }, this.fetchCookieFail = function() {
                    i._send("bg.cookie.fail", "could not get grauth from cookie", u.LogLevel.WARN);
                }, this.fetchSettingsFail = function(e, t) {
                    i._send("bg.user.settings.fail", "could not get settings from auth", u.LogLevel.WARN, {
                        body: e,
                        statusCode: t
                    });
                }, this.frequentCookieChanges = function(e) {
                    i._send("debug.cookie.onChange.error", "cookie change too frequent", u.LogLevel.INFO, {
                        canceled: e
                    });
                }, this.initializePropFromDapi = function(e) {
                    i._send("bg.state.dapi.prop.initialize", "set property from dapi", u.LogLevel.INFO, {
                        name: e
                    });
                }, this.emailPerceptionPopupShow = function() {
                    i._send("cs.emailPerception.popup.show", "show email perception popup on gmail/inbox domain", u.LogLevel.INFO);
                }, this.emailPerceptionPopupCancel = function() {
                    i._send("cs.emailPerception.popup.cancel", "user canceled email perception popup on gmail/inbox", u.LogLevel.INFO);
                }, this.emailPerceptiongButtonHover = function() {
                    i._send("cs.emailPerception.gbutton.hover", "user hovered gButton and ask for feedback btn is shown on gmail/inbox", u.LogLevel.INFO);
                }, this.onboardingPopupShow = function() {
                    i._send("cs.onboarding.popup.show", "show onboarding popup to user after first time extension install", u.LogLevel.INFO);
                }, this.onboardingPopupCancel = function() {
                    i._send("cs.onboarding.popup.cancel", "user canceled onboarding popup", u.LogLevel.INFO);
                }, this.onboardingTutorialShow = function() {
                    i._send("cs.onboarding.tutorial.show", "opened onboarding dialog after popup", u.LogLevel.INFO);
                }, this.onboardingVideoLoaded = function() {
                    i._send("cs.onboarding.tutorial.video.loaded", "load video data for onboarding tutorial", u.LogLevel.INFO);
                }, this.saveEmailFeedbackError = function(e) {
                    i._send("bg.emailfeedback.save.error", "failed to save email feedback", u.LogLevel.INFO, {
                        body: e
                    });
                }, this.incognitoInit = function() {
                    i._send("bg.incognito.init", "extension initialized in incognito mode", u.LogLevel.INFO);
                }, this.disabledCookiesInit = function() {
                    i._send("bg.cookie.disabled", "extension initialized with disabled cookies", u.LogLevel.INFO);
                }, this.proxyInit = function() {
                    i._sendWithProbability(f, "proxy.init", "proxy script initialized", u.LogLevel.INFO);
                }, this.proxyPortDisconnected = function(e, t) {
                    i._sendWithProbability(f, "proxy.disconnect", "proxy port disconnected", u.LogLevel.INFO, {
                        port: e,
                        error: t
                    });
                }, this.unhandledBgPageException = function(e) {
                    i._send("bg.unhandledException", "unhandled exception on background page", u.LogLevel.ERROR, {
                        message: e.error ? e.error.message : e.message
                    });
                }, this.unhandledBgPageRejection = function(e) {
                    i._send("bg.unhandledRejection", "unhandled promise rejection on background page", u.LogLevel.ERROR, {
                        message: null != e.reason ? "string" == typeof e.reason ? e.reason : e.reason.message : void 0
                    });
                }, this.storageMigrationSucceeded = function() {
                    i._send("bg.storageMigration.success", "storage migration succeeded", u.LogLevel.INFO, {});
                }, this.storageMigrationFailed = function(e) {
                    i._send("bg.storageMigration.failure", "storage migration failed", u.LogLevel.ERROR, {
                        message: e && e.message
                    });
                }, this.cardShowAction = function() {
                    i._sendWithProbability(d, "cs.editor.card.show", "show card action", u.LogLevel.INFO);
                }, this.cardHideAction = function() {
                    i._sendWithProbability(d, "cs.editor.card.hide", "hide card action", u.LogLevel.INFO);
                }, this.cardReplacementAction = function() {
                    i._sendWithProbability(d, "cs.editor.card.replacement", "click on the replacement in the card", u.LogLevel.INFO);
                }, this.cardAddToDictAction = function() {
                    i._sendWithProbability(d, "cs.editor.card.addToDict", "click add to dictionary button in the card", u.LogLevel.INFO);
                }, this.cardIgnoreAction = function() {
                    i._sendWithProbability(d, "cs.editor.card.ignore", "click ignore button in the card", u.LogLevel.INFO);
                }, this.synonymCardShowAction = function(e) {
                    i._sendWithProbability(d, "cs.editor.synonym.show", "show synonymous card action", u.LogLevel.INFO, {
                        notFoundCard: e
                    });
                }, this.synonymCardHideAction = function(e) {
                    i._sendWithProbability(d, "cs.editor.synonym.hide", "hide synonymous card action", u.LogLevel.INFO, {
                        notFoundCard: e
                    });
                }, this.synonymReplacementAction = function() {
                    i._sendWithProbability(d, "cs.editor.synonym.replacement", "click on the replacement in the synonym", u.LogLevel.INFO);
                }, this.dictCardShowAction = function() {
                    i._sendWithProbability(d, "cs.editor.dict.show", "show dictionary card action", u.LogLevel.INFO);
                }, this.dictCardHideAction = function() {
                    i._sendWithProbability(d, "cs.editor.dict.hide", "hide dictionary card action", u.LogLevel.INFO);
                }, this.couldNotParseTransform = function(e, t) {
                    i._send("cs.cards.transforms.parse.error", "Could not parse transform in inline cards", u.LogLevel.WARN, {
                        transformHTML: e,
                        fallbackParseSuccessful: t
                    });
                }, this.disabledTabLoad = function(e, t) {
                    i._sendUsage("usage.loadOnDisabledTab", "tab load event with disabled extension", u.LogLevel.INFO, {
                        domain: e,
                        accountType: t
                    });
                }, this.initSession = function(e, t, n, r) {
                    i._sendUsage("usage.session.init", "init in the field", u.LogLevel.INFO, {
                        domain: e,
                        accountType: t,
                        fieldType: n,
                        fieldSupported: r
                    });
                }, this.cardFirstInteraction = function(e, t, n) {
                    i._sendUsage("usage.card.interaction", "interaction with card in the field", u.LogLevel.INFO, {
                        domain: e,
                        accountType: t,
                        fieldType: n
                    });
                };
            }
            return (0, l["default"])(e, [ {
                key: "_send",
                value: function(e, t, n, r) {
                    var o = void 0;
                    try {
                        o = (0, i["default"])(r);
                    } catch (a) {
                        o = "Failed to stringify event properties: '" + a + "', '" + (a && a.message) + "'", 
                        console.warn(o, "for " + t + "@" + e);
                    }
                    try {
                        this._sendFelog(e, t, n, null != r ? {
                            json: o
                        } : void 0);
                    } catch (a) {
                        console.warn("Failed to send felog for " + t + "@" + e + ": '" + a + "', '" + (a && a.message) + "'");
                    }
                }
            }, {
                key: "_sendUsage",
                value: function(e, t, n, r) {
                    this._sendFelogUsage(e, t, n, r);
                }
            }, {
                key: "_sendWithProbability",
                value: function(e, t, n, r, o) {
                    e > Math.random() && this._send(t, n, r, o);
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
                    this._send("cs.notification.show", "show notification on the page", u.LogLevel.INFO, {
                        type: e
                    });
                }
            }, {
                key: "notificationHide",
                value: function(e) {
                    this._send("cs.notification.hide", "hide notification on the page", u.LogLevel.INFO, {
                        type: e
                    });
                }
            } ]), e;
        }();
        n.Telemetry = p;
    }, {
        "./felog": 304,
        "babel-runtime/core-js/json/stringify": 22,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35
    } ],
    311: [ function(e, t, n) {
        "use strict";
        function r() {
            return window.tracker = window.tracker || {}, window.tracker;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.tracker = r;
    }, {} ],
    312: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("emitter"), o = e("lodash"), i = e("dompurify"), a = e("lib/dom"), s = e("lib/util"), c = e("lib/wrap");
        n.createHtmlDom = function(e) {
            function t(e, t) {
                var r = o.where(F.matches.get(), {
                    inDom: !0
                }), i = o.difference(r, e);
                i.forEach(function(e) {
                    return k(e);
                });
                for (var a = !1, s = 0; s < e.length; s++) {
                    var c = e[s];
                    c.replaced && (c._s = c.s, c._e = c.e), c.inDom || (a = !0, l(c, e));
                }
                return a ? (n(function() {
                    return u(e, t);
                }), void U.invalidate()) : (U.invalidate(), U.emit("rendered"));
            }
            function n(e) {
                var t = h();
                e(), a.isFocused(D) && g(t) && b(t.pos);
            }
            function l(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    e._e - e._s > r._e - r._s && c.collision(e, r) > 0 && r.inDom && k(r);
                }
            }
            function u(t, n) {
                function r(e, t) {
                    var r = B.createElement("g"), o = F.getMatchClass(e, n || "");
                    return r.className = "gr_ gr_" + e.id + o + " " + (e.cls || ""), r.textContent = t, 
                    r.id = e.id.toString(), r.setAttribute("data-gr-id", e.id.toString()), r;
                }
                c.render({
                    node: D,
                    matches: t,
                    createElement: r,
                    isValidNode: e.isValidNode,
                    isValidMatchForNode: e.isValidMatchForNode,
                    type: "dom"
                });
                for (var o = 0; o < t.length; o++) {
                    var i = t[o];
                    i.inDom || F.matches.remove(i, !0);
                }
                U.emit("rendered");
            }
            function d(e) {
                return e && (U.emit("startInvalidateNode"), c.invalidateNode(D), U.emit("endInvalidateNode")), 
                c.getText(D).replace(s.NBSP_RE, " ");
            }
            function f(e) {
                D.innerHTML = s.br(o.escape(e));
            }
            function p(e) {
                D.innerHTML = i.sanitize(e);
            }
            function m() {
                var e = a.getDocSelection(B), t = e.anchorNode;
                if (t) {
                    var n = t.parentNode, r = e.toString();
                    if (!(r.length > 1)) {
                        if (a.hasClass(n, "gr_")) return n.parentNode && a.hasClass(n.parentNode, "gr_spell") && (n = n.parentNode), 
                        F.selectById(n.id);
                        var o = t.nextElementSibling;
                        return o && t.__node_text && a.hasClass(o, "gr_tiny") && t.__node_text.length === e.focusOffset ? F.selectById(o.id) : void (F.selectedMatch && F.selectedMatch.deselect());
                    }
                }
            }
            function h() {
                var e = a.getDocSelection(B), t = e.anchorNode || {}, n = e.focusNode || {};
                return {
                    pos: v(),
                    aNode: t,
                    aNodeText: t.textContent,
                    aNodeParent: t.parentNode,
                    fNode: n,
                    fNodeText: n.textContent,
                    fNodeParent: n.parentNode
                };
            }
            function g(e) {
                var t = a.getDocSelection(B), n = t.anchorNode || {}, r = t.focusNode || {};
                return e.aNode !== n || e.aNodeText !== n.textContent || e.aNodeParent !== n.parentNode || e.fNode !== r || e.fNodeText !== r.textContent || e.fNodeParent !== r.parentNode;
            }
            function b(e, t) {
                t = t || 10;
                var n = c.setCursorPos(D, e);
                return n === !1 && t <= 1 ? U.emit("badCursorPositionRetryFail") : n === !1 && e.s > 1 ? (U.emit("badCursorPosition"), 
                b({
                    s: e.s - 1,
                    e: e.e - 1
                }, t - 1)) : void 0;
            }
            function v() {
                return c.getCursorPos(D);
            }
            function _(e) {
                return e._s = e.s, e._e = e.e, e.id = "tmp_id", e.cls = "gr_tmp_id", u([ e ]), [].slice.call(D.querySelectorAll(".gr_tmp_id"));
            }
            function y(e) {
                return ".gr_" + e.id;
            }
            function w(e) {
                for (var t = c.getCursorPos(D), n = D.querySelectorAll(e), r = n.length, o = 0; o < r; o++) c.unwrap(n[o]);
                a.isFocused(D) && c.setCursorPos(D, t);
            }
            function k(e, t) {
                for (var n = c.getCursorPos(D), r = D.querySelectorAll(y(e)), o = r.length, i = 0; i < o; i++) if (t) {
                    var s = r[i].parentNode;
                    s && s.removeChild(r[i]);
                } else c.unwrap(r[i]);
                e.inDom = !1, a.isFocused(D) && c.setCursorPos(D, n);
            }
            function E(e) {
                var t = void 0, n = e[0], r = "contains" in n ? "contains" : "compareDocumentPosition", o = "contains" === r ? 1 : 16;
                e: for (;n.parentNode; ) {
                    for (t = e.length, n = n.parentNode; t--; ) if ((n[r](e[t]) & o) !== o) continue e;
                    return n;
                }
                return null;
            }
            function C(e) {
                var t = E(e), n = e, r = e.length;
                if (r > 1) {
                    var o = c.mergeNodes(e);
                    n = [], n.push(o), r = n.length;
                }
                for (var i = 0; i < r; i++) {
                    for (var a = n[i], s = a.parentNode, l = 0; s !== t && l < 1e3; ) {
                        var u = s;
                        s = s && s.parentNode, c.unwrap(u), l++;
                    }
                    c.unwrap(a);
                }
            }
            function x(e, t, n) {
                l(e, F.getFiltered());
                var r = _({
                    s: e.s,
                    e: e.e
                });
                r.length > 1 && C(r);
                var o = _({
                    s: e.s,
                    e: e.e
                })[0];
                o.textContent = t, o.id = e.id.toString(), e.replaced = !n, e.inDom = !n, o.className = "gr_ gr_" + e.id + F.getMatchClass(e, F.getText()) + " " + (e.cls || ""), 
                o.setAttribute("data-gr-id", e.id.toString()), n && c.unwrap(o);
            }
            function S(e) {
                for (var t = B.querySelectorAll(y(e)), n = t.length, r = 0; r < n; r++) a.addClass(t[r], "sel");
            }
            function T(e) {
                for (var t = B.querySelectorAll(y(e)), n = t.length, r = 0; r < n; r++) a.removeClass(t[r], "sel");
            }
            function N(e, t) {
                var n = e.__pos, r = n + (e.textContent || "").length;
                return n >= t._s && r <= t._e;
            }
            function P(e) {
                G && clearTimeout(G);
                var n = D.querySelectorAll("g[data-gr-id]"), r = n.length, o = [];
                c.markChildPos(D);
                for (var i = 0; i < r; i++) {
                    var s = n[i], l = F.matches.byId(s.id);
                    if (o.push(s.id), l && N(s, l)) {
                        if (!l.inDom && e && (l.inDom = !0), !l.selected && a.hasClass(s, "sel") && a.removeClass(s, "sel"), 
                        !s.className) {
                            var u = F.getMatchClass(l, F.getText());
                            s.className = "gr_ gr_" + l.id + u + " " + (l.cls || "");
                        }
                    } else {
                        var d = h();
                        c.unwrap(s), a.isFocused(D) && g(d) && b(d.pos);
                    }
                }
                for (var f = F.getFiltered(), p = !1, m = 0; m < f.length; m++) {
                    var v = f[m], _ = v.id;
                    o.indexOf(_) === -1 && (v.inDom = !1, p = !0);
                }
                p && t(f, F.getText());
            }
            function j(e) {
                for (var t = 0, n = e.childNodes.length; t < n; ++t) {
                    var r = e.childNodes[t];
                    3 !== r.nodeType && 1 !== r.nodeType && V.push(r), 3 === r.nodeType && j(r);
                }
            }
            function I() {
                setTimeout(function() {
                    j(D);
                    for (var e = 0; e < V.length; e++) {
                        var t = V[e];
                        t.parentNode && t.parentNode.removeChild(t);
                    }
                    if (V.length > 0) {
                        D.normalize();
                        var n = D.firstChild;
                        n && n.parentNode && "" === (n.textContent || "").trim() && n.parentNode.removeChild(n);
                        var r = D.lastChild;
                        r && r.parentNode && "" === (r.textContent || "").trim() && r.parentNode.removeChild(r), 
                        F.hardReset();
                    }
                    V = [], U.emit("startInvalidateNode"), c.invalidateNode(D), U.emit("endInvalidateNode");
                }, 0);
            }
            function A() {
                for (var e = D.cloneNode(!0), t = e.querySelectorAll(".gr-alert"), n = 0; n < t.length; n++) c.unwrap(t[n]);
                return e.innerHTML;
            }
            function L() {
                for (var e = D.querySelectorAll(".gr-alert"), t = 0; t < e.length; t++) c.unwrap(e[t]);
            }
            function M() {
                return D.innerHTML;
            }
            function O() {
                G = setTimeout(P, W), F.on("paste", function() {
                    U.emit("startInvalidateNode"), c.invalidateNode(D), U.emit("endInvalidateNode"), 
                    U.invalidate();
                });
            }
            function R() {
                G && clearTimeout(G);
            }
            var F = e.editor, D = e.el, B = D.ownerDocument, U = r({
                render: t,
                remove: k,
                renderRange: _,
                removeBySelector: w,
                replace: x,
                getCleanHtml: A,
                cleanHTML: L,
                getHtml: M,
                start: O,
                stop: R,
                select: S,
                deselect: T,
                getText: d,
                setText: f,
                setHtml: p,
                changeSelection: m,
                getCursor: v,
                setCursor: b,
                unwrapToCommonParent: C,
                invalidate: P
            });
            F && F.on && F.on("immediatepaste", I);
            var W = 1e3, G = void 0, V = [];
            return U;
        };
    }, {
        dompurify: "dompurify",
        emitter: "emitter",
        "lib/dom": 215,
        "lib/util": 322,
        "lib/wrap": 324,
        lodash: "lodash"
    } ],
    313: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("lib/wrap"), o = e("lib/dom"), i = e("lib/util");
        n.HtmlTypingLimiter = function(e) {
            function t() {
                var e = o.getDocSelection(d);
                e.anchorNode && r.invalidateNode(e.anchorNode);
            }
            function n() {
                t();
            }
            function a(e) {
                var t = o.getDocSelection(d);
                if (!(t.toString().length > 1)) {
                    var n = t.anchorNode;
                    r.invalidateNode(n);
                    var a = e.originalEvent, c = e.commandKeyPressed, p = e.navKey, m = n.parentNode, h = a.metaKey || a.ctrlKey;
                    if (!h && (c && (f = null), n && n.nodeType && 3 === n.nodeType && !(p || c && 13 !== i.keyCode(a) && 32 !== i.keyCode(a)))) {
                        f = null;
                        var g = n.textContent || "";
                        if (o.hasClass(m, "gr_") && (g.length === t.anchorOffset || 0 === t.anchorOffset)) {
                            if (13 === i.keyCode(a)) return s(n.parentNode);
                            var b = String.fromCharCode(i.keyCode(a));
                            a.shiftKey || (b = b.toLowerCase());
                            var v = d.createTextNode(b);
                            " " === v.textContent && (v.textContent = String.fromCharCode(160)), 0 === t.anchorOffset ? o.insertBefore(v, m) : o.insertAfter(v, m), 
                            f = r.getPosInText(u, v, 1), r.setRange({
                                node: v,
                                offset: 1
                            }), a.preventDefault(), r.invalidateNode(v), setTimeout(l.oninput, 0);
                        }
                    }
                }
            }
            function s(e) {
                setTimeout(function() {
                    e && e.parentNode && (e.firstChild && "BR" === e.firstChild.tagName && o.insertBefore(e.firstChild, e), 
                    e.lastChild && "BR" === e.lastChild.tagName && o.insertAfter(e.lastChild, e), r.invalidateNode(e));
                }, 0);
            }
            function c(e) {
                var t = e.originalEvent, n = t.metaKey || t.ctrlKey;
                if (n && 90 === i.keyCode(t) && null !== f) {
                    var o = r.getCursorPos(u), a = r.getNodeByTextPos(u, f), s = r.getNodeText(a);
                    a.node.textContent = s.substr(0, a.offset - 1) + s.substr(a.offset), r.invalidateNode(a.node), 
                    f = null, o.s--, o.e--, r.setCursorPos(u, o), t.preventDefault(), setTimeout(l.oninput, 0);
                }
            }
            var l = e.inputListener, u = e.el, d = u.ownerDocument, f = void 0;
            l.on("keypress", a), l.on("keydown", c), l.on("input", n);
        };
    }, {
        "lib/dom": 215,
        "lib/util": 322,
        "lib/wrap": 324
    } ],
    314: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/assign"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("emitter"), s = e("lodash"), c = e("./matches"), l = e("./input-listener"), u = e("./html-typing-limiter"), d = e("./html-dom"), f = e("./textarea-dom"), p = e("lib/util"), m = e("lib/dom");
        n.createEditor = function(e) {
            function t() {
                Se.start(), _e.start(), e.value && b(e.value), se.update(fe.currentText), E();
            }
            function n(e) {
                var t = e.length > le;
                xe = t ? ke : Ce, ue = t;
            }
            function r(e) {
                se.update(e), se.updateMatchesToCurrentRevision(fe.matches.get());
            }
            function o(e) {
                return _e.getText(e);
            }
            function h() {
                return fe.currentText;
            }
            function g() {
                fe.currentText = o(!0), fe.emit("afterReplace");
            }
            function b(e) {
                ge.get().forEach(function(e) {
                    e.inDom = !1;
                }), r(e), ge.update(fe.currentText, e), _e.setText(e), fe.isHtmlGhost ? setTimeout(g, 100) : g();
            }
            function v(e) {
                return _e.setCursor(e);
            }
            function _() {
                return _e.getCursor();
            }
            function y() {
                fe.latestCursor = _();
            }
            function w() {
                v(fe.latestCursor);
            }
            function k(e) {
                Se.skipInputEvents(e);
            }
            function E() {
                se.send();
            }
            function C(e) {
                pe = Date.now(), 32 === e.originalEvent.charCode && he && R();
            }
            function x() {
                ve || N(void 0, !0), E(), fe.emit("change", void 0);
            }
            function S() {
                return ve ? fe.el.value : fe.el.innerHTML;
            }
            function T() {
                if (fe._currentText !== S()) {
                    fe._currentText = S();
                    var e = o();
                    n(e);
                    var t = {
                        text: e,
                        cancel: !1
                    };
                    if (fe.emit("beforeUpdate", t), t.cancel) return T();
                    r(e), ge.update(fe.currentText, e), fe.currentText = e;
                }
            }
            function N(e, t) {
                var n = !1;
                if (!ve) {
                    var r = m.getDocSelection(ae);
                    n = r.anchorNode && m.hasClass(r.anchorNode.parentNode, "gr_");
                }
                (ve || t || n || fe.isHtmlGhost) && (I(), y(), fe.emit("input", e));
            }
            function P() {
                _e.changeSelection();
            }
            function j(e) {
                var t = fe.matches.byId(e);
                t && fe.selectedMatch && fe.selectedMatch !== t && fe.selectedMatch.deselect(), 
                t && t.select();
            }
            function I() {
                if (!de) {
                    T();
                    var e = G();
                    _e.render(e, fe.currentText), fe.emit("saveDoc", fe.currentText);
                }
            }
            function A(e) {
                fe.sid = e.sid, fe.emit("saveSid", fe.sid);
            }
            function L(e, t) {
                return e._s = e._s || e.s, e._e = e._e || e.e, e.sd = e._s - e.s, e.ed = e._e - e.e, 
                !0;
            }
            function M(e) {
                ue ? (be.push(e), me || O()) : F(e), fe.emit("tracking", {
                    event: "matchFound",
                    matches: e
                });
            }
            function O() {
                me = setTimeout(function() {
                    be.length && Date.now() - pe > ce && R(), be.length ? O() : me = void 0;
                }, 50);
            }
            function R() {
                if (Se.isUserTyping()) return clearTimeout(ye), void (ye = setTimeout(R, 200));
                if (clearTimeout(ye), be.length) {
                    var e = be.shift();
                    e ? F(e) : R();
                }
            }
            function F(e, t) {
                var n = o();
                if (fe.currentText = n, se.update(n), se.updateMatch(e), fe._removedByServer.indexOf(e.id) > -1) return console.log("skip because it is removed by server");
                if (fe.processMatch(e, n) !== !1) {
                    var r = fe.tryToAdd(e, n);
                    r && (V(e), t ? I() : xe());
                }
            }
            function D(e) {
                if (e && be.length) {
                    var t = e.match, n = e.position;
                    be[n] && be[n].id === t.id && (be[n] = !1, F(t, !0));
                }
            }
            function B(e, t) {
                return ge.tryToAdd(e, t);
            }
            function U(e) {
                if (e && 0 !== e.length) {
                    for (var t = o(), n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.v === t.substring(r.s, r.e) && (r.rendered = !1, V(r), ge.add(r));
                    }
                    _e.invalidate(!0), I();
                }
            }
            function W() {
                return ge.get();
            }
            function G() {
                return fe.matchFilter(W());
            }
            function V(e) {
                var t = p.guid(), n = Date.now();
                s.extend(e, {
                    uid: t,
                    ts: n,
                    replace: function(t, n) {
                        return z(t, n, e);
                    },
                    undo: function() {
                        return H(e);
                    },
                    addToDict: function() {
                        return q(e);
                    },
                    acknowledged: function() {
                        return Y(e);
                    },
                    ignore: function() {
                        return K(e);
                    },
                    ignoreAll: function() {
                        return J(e);
                    },
                    remove: function() {
                        return Q(e);
                    },
                    getEl: function() {
                        return $(e);
                    },
                    select: function(t) {
                        return Z(t, e);
                    },
                    deselect: function(t) {
                        return ee(t, e);
                    }
                }), fe.emit("matchExtend", e);
            }
            function z(e, t, n) {
                fe.emit("beforeReplace");
                var r = o(), i = e.length - n.oldVal.length;
                fe.latestCursor.s < n.s && (i = 0), fe.beforeReplace(n, i, e), _e.remove(n), _e.replace(n, e, t), 
                ge.replace(n, e, t, r), te(n, t ? "undoed" : "accepted"), fe.currentText = o(), 
                n.rev++, v({
                    s: n._e,
                    e: n._e
                }), ve || (ie.focus(), v({
                    s: n._e,
                    e: n._e
                })), I(), E(), fe.emit("afterReplace", n), t || (fe.emit("fix", n), fe.emit("tracking", {
                    event: "matchAcceptedCard",
                    matches: n
                }));
            }
            function H(e) {
                var t = e.v;
                e.replace(t, !0), e.undoed = !0, e.beforeReplace = t;
                var n = ge.removeIntersectedWithReplace(e);
                n && I(), fe.emit("undo"), fe.emit("tracking", {
                    event: "matchUndo",
                    matches: e
                });
            }
            function q(e) {
                ge.forceRemove(e), se.addToDictionary(e);
                var t = ge.removeSimilar(e);
                t.push(e), I(), fe.emit("fix"), fe.emit("tracking", {
                    event: "matchAddToDict",
                    matches: t
                });
            }
            function K(e) {
                ge.forceRemove(e), se.ignore(e), ge.removeByPID(e), I(), fe.emit("fix"), fe.emit("tracking", {
                    event: "matchIgnored",
                    matches: e
                });
            }
            function Y(e) {
                ge.forceRemove(e), se.acknowledged(e), ge.removeByPID(e), I(), fe.emit("fix"), fe.emit("tracking", {
                    event: "acknowledged",
                    matches: e
                });
            }
            function J(e) {
                ge.forceRemove(e), ge.removeSimilar(e), se.ignoreAll(e);
                var t = ge.removeSimilar(e);
                t.push(e), fe.emit("tracking", {
                    event: "matchIgnoredAll",
                    matches: t
                }), I();
            }
            function Q(e) {
                ge.remove(e, !0), _e.remove(e), fe.emit("rendered");
            }
            function X() {
                var e = _(), t = o();
                return {
                    value: t.substring(e.s, e.e),
                    s: e.s,
                    e: e.e,
                    text: t
                };
            }
            function $(e) {
                return ae.getElementById(String(e.id));
            }
            function Z(e, t) {
                t.selected || (t.selected = !0, e || (fe.emit("selectedMatch", t), te(t, "looked")), 
                _e.select(t), fe.selectedMatch = t);
            }
            function ee(e, t) {
                t.selected && (t.selected = !1, e || fe.emit("deselectedMatch", t), _e.deselect(t), 
                fe.selectedMatch = void 0);
            }
            function te(e, t) {
                console.log("FEEDBACK", e.value, t), se.feedback(e, t);
            }
            function ne(e) {
                e || se.reset(), re(), T(), se.start(), E(), fe.emit("rendered");
            }
            function re() {
                ge.get().forEach(function(e) {
                    return _e.remove(e);
                }), ge.clear(), fe._removedByServer = [], fe._currentText = "", I();
            }
            function oe() {
                de = !0, Se.stop(), _e.stop(), m.unlisten(ie, "click", y), fe.emit("exit");
            }
            var ie = e.el, ae = ie.ownerDocument, se = e.api, ce = 500, le = 3e3, ue = !1;
            s.isUndefined(e.useBufferForAddingMatches) || (ue = e.useBufferForAddingMatches);
            var de = !1, fe = a({
                el: ie,
                getText: function(e) {
                    return e ? o() : h();
                },
                setText: b,
                setCursor: v,
                getCursor: _,
                saveCursor: y,
                restoreCursor: w,
                addMethodsToMatch: V,
                addMatches: U,
                tryToAdd: B,
                render: I,
                check: E,
                getMatches: W,
                getFiltered: G,
                getSelection: X,
                close: close,
                clearData: re,
                hardReset: ne,
                latestCursor: {
                    s: 0,
                    e: 0
                },
                exit: oe,
                waitTime: ce,
                matchFilter: function(e) {
                    return e;
                },
                processMatch: L,
                beforeReplace: function(e, t, n) {},
                getMatchClass: function() {
                    return "";
                },
                processRemove: p._f,
                matchRemoved: p._f,
                extendMatch: p._f,
                matchesEqual: function() {
                    return !1;
                },
                canAddRemovedMatch: p._F,
                canShiftMatchEnd: p._F,
                selectById: j,
                skipInputEvents: k,
                run: t,
                api: se,
                _removedByServer: [],
                matches: {},
                currentText: "",
                _currentText: "",
                isHtmlGhost: !1
            }), pe = 0, me = void 0, he = !0, ge = c.createMatches(fe), be = ge.matchesBuffer;
            fe.matches = ge;
            var ve = "textarea" === e.editorType;
            fe.isTextarea = ve;
            var _e = void 0, ye = void 0, we = (0, i["default"])({}, e, {
                editor: fe
            });
            _e = e.dom ? e.dom(we) : "contenteditable" === e.editorType ? d.createHtmlDom(we) : ve ? f.createTextareaDom(we) : d.createHtmlDom(we), 
            fe.dom = _e, fe.currentText = o() || "";
            var ke = s.debounce(I, 1e3, {
                maxWait: 5e3
            }), Ee = s.debounce(I, 200, {
                maxWait: 1e3
            }), Ce = window.requestIdleCallback ? function() {
                return window.requestIdleCallback(I);
            } : Ee, xe = void 0;
            n(fe.currentText), ge.on("remove", Q), ge.on("hasAvailableRenderDeletedMatch", D);
            var Se = l.createInputListener({
                el: ie,
                editor: fe
            });
            return fe.inputListener = Se, "contenteditable" === e.editorType && (u.HtmlTypingLimiter({
                inputListener: Se,
                el: ie
            }), fe.setHtml = function(e) {
                _e.setHtml(e), g();
            }, fe.getHtml = _e.getHtml), Se.on("changed", x), Se.on("input", N), Se.on("keypress", C), 
            Se.on("selectionChanged", P), m.listen(ie, "click", y), Se.delegate(fe, "keydown"), 
            Se.delegate(fe, "paste"), Se.delegate(fe, "immediatepaste"), se.delegate(fe, "sending"), 
            se.delegate(fe, "finish"), se.on("add", M), se.on("start", A), _e.delegate(fe, "rendered"), 
            _e.delegate(fe, "startInvalidateNode"), _e.delegate(fe, "endInvalidateNode"), e.autorun && t(), 
            fe;
        };
    }, {
        "./html-dom": 312,
        "./html-typing-limiter": 313,
        "./input-listener": 315,
        "./matches": 317,
        "./textarea-dom": 319,
        "babel-runtime/core-js/object/assign": 24,
        emitter: "emitter",
        "lib/dom": 215,
        "lib/util": 322,
        lodash: "lodash"
    } ],
    315: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("emitter"), o = e("lib/dom"), i = e("lib/util"), a = e("./watcher");
        n.createInputListener = function(e) {
            function t() {
                return N ? S.getText(!0) : S.el.innerHTML;
            }
            function n() {
                l(), C();
            }
            function s() {
                u(), j && clearTimeout(j);
            }
            function c(e) {
                R = void 0 === e;
            }
            function l() {
                o.listen(x, "input", d), o.listen(x, "click", h), o.listen(x, "keyup", g), o.listen(x, "keypress", w), 
                o.listen(x, "keydown", y), o.listen(x, "paste", f), o.listen(T, "mousedown", k), 
                a.watch(x, f);
            }
            function u() {
                o.unlisten(x, "input", d), o.unlisten(x, "click", h), o.unlisten(x, "keyup", g), 
                o.unlisten(x, "keypress", w), o.unlisten(x, "keydown", y), o.unlisten(x, "paste", f), 
                o.unlisten(T, "mousedown", k), a.unwatch(x, f);
            }
            function d(e) {
                O.emit("typed", e), R || (L = Date.now(), O.emit("input"));
            }
            function f() {
                O.ignorePaste || (O.emit("immediatepaste"), R || setTimeout(function() {
                    p(!0), O.emit("paste"), O.emit("input");
                }, 10));
            }
            function p() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (!R) {
                    var n = t(), r = E(), o = A.trim() !== n.trim();
                    ("" !== n || o) && (o && I && (e = !0, I = !1), (o && !r || e) && (O.emit("changed"), 
                    A = n, M = A));
                }
            }
            function m() {
                O.emit("selectionChanged");
            }
            function h(e) {
                R || (window.event && !window.event.customWritted || (e.customWritted = !0, window.event = e), 
                m());
            }
            function g(e) {
                if (!R) return _(i.keyCode(e)) ? void m() : void O.emit("keyup");
            }
            function b(e) {
                return [ 37, 38, 39, 40, 17, 18, 91, 8, 16, 20, 9 ].indexOf(e) !== -1;
            }
            function v(e) {
                return [ 32, 190, 188, 186, 59, 57, 48, 191, 49, 13, 8 ].indexOf(e) !== -1;
            }
            function _(e) {
                return [ 37, 38, 39, 40 ].indexOf(e) !== -1;
            }
            function y(e) {
                R || (I = v(i.keyCode(e)), O.emit("keydown", {
                    originalEvent: e,
                    commandKeyPressed: I,
                    listener: O
                }));
            }
            function w(e) {
                if (!R) {
                    var t = b(i.keyCode(e)), n = {
                        originalEvent: e,
                        navKey: t,
                        commandKeyPressed: I,
                        listener: O
                    };
                    O.emit("keypress", n);
                }
            }
            function k() {
                R || (L = Date.now() - 1e5, p());
            }
            function E() {
                return !(Date.now() - L > P);
            }
            function C() {
                j = setTimeout(function() {
                    var e = t();
                    e !== M && (L = Date.now(), M = e, O.emit("input")), p(), C();
                }, 200);
            }
            var x = e.el, S = e.editor, T = x.ownerDocument, N = S.isTextarea, P = 4e3, j = void 0, I = void 0, A = t(), L = Date.now(), M = "", O = r({
                start: n,
                stop: s,
                oninput: d,
                isUserTyping: E,
                skipInputEvents: c,
                ignorePaste: void 0
            }), R = !1;
            return O;
        };
    }, {
        "./watcher": 320,
        emitter: "emitter",
        "lib/dom": 215,
        "lib/util": 322
    } ],
    316: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("emitter"), o = e("lodash"), i = e("@grammarly-npm/textdiff"), a = e("lib/util");
        n.createMatchUpdater = function(e) {
            function t(e, t) {
                if (t) {
                    for (var n = [], r = 0; r < t.length; r++) {
                        var o = t[r], i = void 0, a = e.substring(o.s, o.e);
                        o.skipUpdatePos && a || (i = o.value !== a, i && n.push(r));
                    }
                    n.length > 0 && m(n, t, !0);
                }
            }
            function n(t, n, r, i) {
                if (t.skipUpdatePos) return !1;
                o.isUndefined(r) && (r = t.s), o.isUndefined(i) && (i = t.e);
                var a = n.substring(r, i), s = t.value;
                return a !== s ? (console.log("%c removed '%s' '%s'", "color:rgba(239, 110, 105, 0.8)", a, s), 
                t.removed = !0, !0) : e.matchRemoved(t, n, r, i);
            }
            function s(e, t, r) {
                var o = [];
                for (var i in r) {
                    var a = r[i];
                    a.siblingValue !== e.substring(a._s - 1, a._e + 1) || n(a, e) || (delete r[i], t.push(a), 
                    o.push(a));
                }
                return o;
            }
            function c(e, t) {
                if (e.siblingValue.length < 2) return !1;
                if (e.siblingValue === t.substring(e._s - 1, e._e + 1)) return !0;
                for (var n = 10, r = -n; r < n; r++) {
                    var o = t.substring(e._s + r - 1, e._e + r + 1);
                    if (o === e.siblingValue) return e._s += r, e._e += r, e.replaced || (e.s = e._s - e.sd, 
                    e.e = e._e - e.ed), !0;
                }
                return !1;
            }
            function l(t, r, o) {
                var s = i.diffPos(a.trimRight(t), a.trimRight(r)), l = [];
                if (s.s !== -1) {
                    for (var u = s.s, d = s.delta, f = [], p = 0; p < o.length; p++) {
                        var h = o[p], g = h.s, b = h.e;
                        if ((g >= u || 0 !== d && 0 === h.s && 0 === u) && (g += d, b += d), h.value !== r.substring(g, b) || g < 0 || h._value !== r.substring(g + h.sd, b + h.ed) || h.removed || n(h, r, g, b)) {
                            var v = e.processRemove(h);
                            if (v) {
                                if (v.next) continue;
                                if (v.add && (f = f.concat(v.add)), v.remove) {
                                    l.push(p), h.removed = !0;
                                    continue;
                                }
                            }
                            if (c(h, r)) continue;
                            l.push(p), h.removed = !0;
                        } else if (h.s >= u) {
                            if (0 === d && h.value !== r.substring(g, b)) {
                                l.push(p), h.removed = !0;
                                continue;
                            }
                            h.s = g, h.e = b, h.replaced ? (h._s = h.s, h._e = h.e) : (h._s = h.s + h.sd, h._e = h.e + h.ed);
                        }
                    }
                    if (l.length > 0 && m(l, o, !0), f.length > 0) for (var _ = 0; _ < f.length; _++) o.push(f[_]);
                }
            }
            function u(e, t) {
                var n = !1;
                if (e) {
                    for (var r = 0; r < e.length; r++) {
                        var o = e[r];
                        if (d(o, t)) return o;
                    }
                    return n;
                }
            }
            function d(t, n) {
                var r = 3, o = t.s - r >= n.s && t.s + r <= n.e || t.e >= n.s && t.e <= n.e;
                return e.matchesEqual(t, n, o);
            }
            function f(t, n) {
                n = n.concat();
                for (var r = 0; r < n.length; r++) {
                    var o = n[r], i = u(t, o);
                    i ? (e.extendMatch(i, o), console.log("%c SKIP MATCH it already exists", "color:rgba(239, 110, 105, 0.8)", o, i)) : t.push(o);
                }
            }
            function p(t, n) {
                var r = u(t, n);
                r && e.extendMatch(r, n);
            }
            function m(e, t, n) {
                for (var r = [], o = 0; o < e.length; o++) {
                    var i = e[o] - o, a = t[i];
                    t.splice(i, 1), r.push(a);
                }
                for (var s = 0; s < r.length; s++) n && g.emit("remove", r[s]);
            }
            function h(e, t) {
                for (var n = 0; n < t.length; n++) t[n].id === e.id && (t.splice(n, 1), n--);
            }
            var g = r({
                remove: h,
                removeNotExisting: t,
                matchRemoved: n,
                extend: f,
                extendWithoutAdding: p,
                updatePos: l,
                locateMatch: c,
                tryToAddRemoved: s
            });
            return g;
        };
    }, {
        "@grammarly-npm/textdiff": 16,
        emitter: "emitter",
        "lib/util": 322,
        lodash: "lodash"
    } ],
    317: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("emitter"), o = e("lodash"), i = e("./match-updater");
        n.createMatches = function(e) {
            function t() {
                return S || (S = []), S;
            }
            function n(e) {
                S.push(e);
            }
            function a(e) {
                return o.find(S, {
                    id: e
                });
            }
            function s(e, t) {
                if (e.value = t.substring(e.s, e.e), e.skipUpdatePos && (e.value = t.substring(e.s, e.e), 
                e._value = t.substring(e._s, e._e), e.v = e.value), y(e)) return console.log("match exist", e), 
                !1;
                var n = t.substring(e._s, e._e), r = t.substring(e.s, e.e);
                return e.siblingValue = t.substring(e._s - 1, e._e + 1), e.skipUpdatePos || (e.removed = n !== e._value || r !== e.v, 
                e.removed && (console.log("%c match value does not correspondents to the value in a text", "color:rgba(239, 110, 105, 0.8)", "'" + e.v + "' vs '" + r + "'"), 
                I.emit("lost_match_value_in_text", e))), e.removed ? (console.log("%c lost match", "color:rgba(239, 110, 105, 0.8)", e), 
                !1) : (v(e), !0);
            }
            function c(t) {
                t.removed = !1, t.rendered = !1, e.canAddRemovedMatch(t) || (T[t.id] = t);
            }
            function l() {
                return T;
            }
            function u(e) {
                for (var t = e.pid, n = [], r = S.length; r--; ) {
                    var o = S[r];
                    o.pid === t && "" !== o.value && e.value === o.value && (p(o), n.push(o));
                }
                return n;
            }
            function d(e) {
                for (var t = e.oldVal, n = [], r = S.length; r--; ) {
                    var o = S[r];
                    o.oldVal === t && (o.addedToDict = !0, p(o), n.push(o));
                }
                return n;
            }
            function f(e) {
                for (var t = 0; t < S.length; t++) S[t].id === e.id && p(S[t]);
                m(e), delete T[e.id];
            }
            function p(e, t) {
                t || I.emit("remove", e), j.remove(e, S), m(e);
            }
            function m(e) {
                function t(t) {
                    n(t), h(e);
                }
                function n(e) {
                    for (var t = 0; t < N.length; t++) N[t] && N[t].id === e && (N[t] = !1);
                }
                if (e && e.id) {
                    var r = e.id;
                    if (o.isArray(r)) for (var i = 0; i < r.length; i++) t(r[i]); else t(r);
                }
            }
            function h(e) {
                if (N.length) for (var t = 0; t < N.length; t++) {
                    var n = N[t];
                    n && n.pid === e.pid && n.highlightBegin === e.highlightBegin && n.highlightEnd === e.highlightEnd && I.emit("hasAvailableRenderDeletedMatch", {
                        match: n,
                        position: t
                    });
                }
            }
            function g(e, t) {
                b(e, t, S), j.removeNotExisting(t, S), t && j.tryToAddRemoved(t, S, T);
            }
            function b(e, t, n) {
                j.updatePos(e, t, n), I.emit("updatePos", {
                    matches: n,
                    text: t
                });
            }
            function v(e) {
                j.extend(S, [ e ]);
            }
            function _(e, t) {
                return j.locateMatch(e, t);
            }
            function y(e) {
                for (var t = 0; t < S.length; t++) {
                    var n = S[t], r = e.s === n.s && e.e === n.e;
                    if (n.r && n.ignored && r) return !0;
                }
                return !1;
            }
            function w() {
                S = [], T = {};
            }
            function k(e, t, n, r) {
                var i = t;
                o.isUndefined(i) && (i = e.rFirst), r = r.substring(0, e.s) + i + r.substring(e.e, r.length);
                var a = i.length - e.oldVal.length;
                E(e, a, r), e.e = e.s + i.length, n ? (e._s = e.s + e.sd, e._e = e.e + e.ed) : (e._s = e.s, 
                e._e = e.e), e.undoed = !1, e.replaced = !n, e.beforeReplace = e.v, e.oldVal = i, 
                e.value = i, e._value = r.substring(e._s, e._e);
            }
            function E(t, n, r) {
                for (var o = 0; o < S.length; o++) {
                    var i = S[o];
                    t !== i && (t.e < i.s && (i.s += n, i.e += n, i._s += n, i._e += n), t.s >= i.s && t.e <= i.e && e.canShiftMatchEnd(t) ? (i.e += n, 
                    i._e += n, i.value = r.substring(i.s, i.e), i._value = r.substring(i._s, i._e), 
                    i.oldVal = i.value) : t.s >= i.s && t.e > i.e && (i.value = r.substring(i.s, i.e), 
                    i._value = r.substring(i._s, i._e), i.oldVal = i.value), i.rev++);
                }
            }
            function C(e) {
                for (var t = !1, n = 0; n < S.length; n++) {
                    var r = S[n];
                    if (!(r.value.split(" ").length > 1 || e === r)) {
                        var o = x(e, r);
                        o && (p(o), t = !0);
                    }
                }
                return t;
            }
            function x(e, t) {
                return (e.s <= t.s && e.e >= t.s || e.s >= t.s && e.e <= t.e || e.s <= t.e && e.e >= t.e) && t;
            }
            var S = [], T = {}, N = [], P = [], j = i.createMatchUpdater(e), I = r({
                matchUpdater: j,
                add: n,
                tryToAdd: s,
                isIntersected: x,
                removeIntersectedWithReplace: C,
                update: g,
                forceRemove: f,
                byId: a,
                removeSimilar: d,
                removeByPID: u,
                updatePos: b,
                shift: E,
                extend: v,
                remove: p,
                clear: w,
                locateMatch: _,
                get: t,
                matchesBuffer: N,
                matchesRmBuffer: P,
                getRemoved: l,
                addRemoved: c,
                replace: k,
                rmMatchesBufferCache: m
            });
            return j.delegate(I, "remove"), I;
        };
    }, {
        "./match-updater": 316,
        emitter: "emitter",
        lodash: "lodash"
    } ],
    318: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/assign"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("@grammarly-npm/changesets"), s = e("emitter"), c = e("lodash"), l = e("lib/dom"), u = e("lib/util");
        n.createTextSplit = function(e) {
            function t(e, t, i) {
                var s = a.diff(m, e), g = void 0, b = void 0, v = void 0, _ = void 0, y = void 0;
                d.length || (g = r(0, ""), o.appendChild(g.el), d.push(g)), s = s.sequencify(), 
                v = a.cs([]);
                for (var w = 0; w < d.length; w++) {
                    g = d[w], _ = g.text, y = g.pos;
                    for (var k = 0; k < v.length; k++) g.pos = g.transformAgainst(v[k]).pos;
                    if (v.push(n(g, s)), g.len) for (g.text !== _ && (g.textUp = !0), g.text === _ && g.pos === y || (g.posUp = !0); g.len > p; ) b = r(g.pos + f, g.text.substr(f)), 
                    g.text = g.text.substr(0, f), g.len = g.text.length, l.insertAfter(b.el, g.el), 
                    d.splice(w + 1, 0, b), w++, g = b; else d.splice(w, 1), o.removeChild(g.el), w--;
                }
                for (var E = void 0, C = void 0, x = void 0, S = [], T = 0; T < d.length; T++) {
                    g = d[T], S = [];
                    for (var N = 0; N < t.length; N++) E = t[N], x = Math.min(g.pos + g.len, E.e) - Math.max(g.pos, E.s), 
                    x < 0 || (C = c.extend({}, E), C.orig = E, C.s = Math.max(0, E.s - g.pos), C.value = C.value.substr(Math.max(0, g.pos - E.s), x), 
                    C.e = C.s + C.value.length, C._s = C.s, C._e = C.e, E.replaced || (C._s = C.s + E.sd, 
                    C._e = C.e + E.ed), C._s < 0 || C._e < 0 || S.push(C));
                    if (g.matchesUp = !0, g.matches.length || S.length) if (g.matches.length === S.length) {
                        g.matchesUp = !1;
                        for (var P = 0; P < g.matches.length; P++) {
                            var j = g.matches[P].orig === S[P].orig && g.matches[P]._s === S[P]._s && g.matches[P]._e === S[P]._e;
                            if (!j) {
                                g.matchesUp = !0;
                                break;
                            }
                        }
                    } else g.matchesUp = !0; else g.matchesUp = !1;
                    g.matchesUp && (g.matches = S);
                }
                for (var I = 0; I < d.length; I++) {
                    if (g = d[I], g.textUp || g.matchesUp) {
                        var A = g.text;
                        A = g.matches.length ? i(g.text, g.matches) : c.escape(A), g.el.innerHTML = u.br(A, I === d.length - 1), 
                        g.textUp = !1;
                    }
                    g.posUp && (g.el.setAttribute("p", [ g.pos, g.pos + g.len ].join(",")), g.posUp = !1);
                }
                h.emit("finish"), m = e;
            }
            function n(e, t) {
                for (var n = a.cs([]), r = [], o = void 0, i = void 0, s = 0; s < t.length; s++) o = t[s], 
                "=" !== o.type && o.len && (o.pos < e.pos || o.pos > e.pos + e.len || (i = o.extend({
                    tlen: e.len,
                    pos: o.pos - e.pos
                }), "+" === o.type && (n.push(o), r.forEach(function(e) {
                    return e.pos += o.len;
                })), "-" === o.type && (i.text = i.text.substr(0, e.pos + e.len - o.pos), i.len = i.text.length, 
                o.text = o.text.substr(i.len), o.len = o.text.length, n.push(i), r.push(o)), e.text = i.apply(e.text), 
                e.len = e.text.length));
                return n;
            }
            function r(e, t) {
                var n = document.createElement("gr_block");
                return n.style.display = "inline", (0, i["default"])(a.op({
                    type: "+",
                    tlen: 0,
                    pos: e,
                    text: t,
                    accessory: 0
                }), {
                    el: n,
                    textUp: !0,
                    posUp: !0,
                    matchesUp: !1,
                    matches: []
                });
            }
            var o = e.node, d = [], f = e.blockSize || 1e3, p = e.maxBlockSize || 2e3, m = "", h = s({
                update: t
            });
            return h;
        };
    }, {
        "@grammarly-npm/changesets": 1,
        "babel-runtime/core-js/object/assign": 24,
        emitter: "emitter",
        "lib/dom": 215,
        "lib/util": 322,
        lodash: "lodash"
    } ],
    319: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("emitter"), o = e("lodash"), i = e("lib/dom"), a = e("lib/util"), s = e("lib/wrap"), c = e("./html-dom"), l = e("./text-split");
        n.createTextareaDom = function(e) {
            function t() {
                var e = P.getCursor(), t = j.value;
                j.value = t + " ", j.value = t, i.isFocused(j) && P.setCursor(e);
            }
            function n() {
                var e = F(document), t = e.firstChild;
                return e.id = I, e.setAttribute("gramm_id", I), i.insertBefore(e, j), {
                    clone: e,
                    cloneVal: t
                };
            }
            function u() {
                var e = D.insertGhost();
                M = e.clone, O = e.cloneVal, L = c.createHtmlDom({
                    el: O,
                    editor: P
                }), A = l.createTextSplit({
                    node: O
                }), A.on("finish", function() {
                    D.emit("rendered");
                }), D.htmlDom = L, R = o.throttle(d, 100), D.clone = M, D.cloneVal = O, P.emit("createdGhost");
            }
            function d(e, t, n) {
                try {
                    A.update(e, t, n);
                } catch (r) {
                    console.error(r.stack || r);
                }
            }
            function f(e, t, n) {
                for (var r = 0; r < e.length; r++) {
                    var o = e[r];
                    o.replaced && (o._s = o.s, o._e = o.e);
                }
                m(e, t, n);
            }
            function p(e, t) {
                var n = e.parent || e, r = P.getMatchClass(n, t);
                return {
                    start: '<g class="gr_ gr_' + n.id + r + '" data-gr-id="' + n.id + '" id="' + n.id + '">',
                    end: "</g>"
                };
            }
            function m(e, t, n) {
                s.render({
                    node: j,
                    matches: e,
                    createTag: p,
                    type: "text",
                    text: t,
                    updateMethod: n ? d : R
                });
            }
            function h() {
                return j.value;
            }
            function g(e) {
                j.value = e;
            }
            function b(e) {
                D.setTextareaValue(e), f(P.getFiltered(), e, !0);
            }
            function v() {
                var e = i.getDocSelection(document), t = e.toString();
                t.length > 1 || B();
            }
            function _() {
                var e = j.selectionStart, t = P.getFiltered(), n = t.concat(), r = !1;
                n.sort(function(e, t) {
                    return t._e - e._e;
                });
                for (var o = [], i = 0; i < n.length; i++) {
                    var a = n[i], s = e >= a._s && e <= a._e;
                    s && o.push(a);
                }
                if (o.length > 0) {
                    o.sort(function(e, t) {
                        return e._e - e._s - (t._e - t._s);
                    }), r = !0;
                    var c = o[0];
                    return P.selectedMatch && P.selectedMatch !== c && P.selectedMatch.deselect(), P.selectById(c.id);
                }
                !r && P.selectedMatch && P.selectedMatch.deselect(), r || P.emit("deselectMatch");
            }
            function y(e) {
                j.selectionStart = e.s, j.selectionEnd = e.e;
            }
            function w() {
                return {
                    s: j.selectionStart,
                    e: j.selectionEnd
                };
            }
            function k(e) {
                return L.renderRange(e);
            }
            function E(e) {
                for (var t = j.querySelectorAll(e), n = t.length, r = 0; r < n; r++) s.unwrap(t[r]);
            }
            function C() {
                var e = P.getFiltered();
                f(e, P.currentText, !0);
            }
            function x(e, t) {
                var n = j.value;
                n = n.substring(0, e.s) + t + n.substr(e.e), P.currentText = n, b(n);
            }
            function S(e) {
                L.select(e);
            }
            function T(e) {
                L.deselect(e);
            }
            function N() {
                u();
            }
            var P = e.editor, j = P.el, I = a.guid(), A = void 0, L = void 0, M = void 0, O = void 0, R = void 0, F = function(e) {
                var t = e.createElement("div");
                t.className = "gram-ghost", t.setAttribute("gramm_editor", "true"), t.setAttribute("contenteditable", "true"), 
                t.setAttribute("tabindex", "-1");
                var n = e.createElement("span");
                return n.className = "clone-val", t.appendChild(n), t;
            }, D = r({
                el: j,
                id: I,
                render: f,
                remove: C,
                renderRange: k,
                removeBySelector: E,
                replace: x,
                start: N,
                stop: a._f,
                select: S,
                deselect: T,
                getText: h,
                setText: b,
                setTextareaValue: g,
                changeSelection: v,
                getCursor: w,
                setCursor: y,
                insertGhost: n,
                forceRedraw: t,
                invalidate: a._f
            }), B = o.debounce(_, 100);
            return setTimeout(t, 10), D;
        };
    }, {
        "./html-dom": 312,
        "./text-split": 318,
        emitter: "emitter",
        "lib/dom": 215,
        "lib/util": 322,
        "lib/wrap": 324,
        lodash: "lodash"
    } ],
    320: [ function(e, t, n) {
        "use strict";
        function r(e, t) {
            if ("undefined" != typeof MutationObserver) {
                var n = i.findLast(s, {
                    node: e,
                    cb: t
                });
                if (!n) {
                    var r = function(e) {
                        function n(e, t, n) {
                            for (var r = 0, i = t.length; r < i; r++) {
                                var a = t[r].tagName ? t[r].tagName : e.target.tagName, s = {
                                    node: e.target,
                                    tag: a.toLowerCase(),
                                    action: n
                                };
                                e.target && o.indexOf(s) === -1 && o.push(s);
                            }
                        }
                        function r(e, t) {
                            var n = [], r = !1;
                            return e.forEach(function(e) {
                                "removedNodes" === e.action && t.tags.includes(e.tag) && (r = !0);
                            }), e.forEach(function(e) {
                                var o = e.tag, i = t.tags.includes(o), a = void 0;
                                ("addedNodes" === e.action && i || "removedNodes" === e.action && r) && (a = e.node), 
                                a && n.indexOf(a) === -1 && n.push(a);
                            }), !!n.length && n;
                        }
                        var o = [], i = {
                            tags: a
                        };
                        e.forEach(function(e) {
                            0 !== e.addedNodes.length && n(e, e.addedNodes, "addedNodes"), 0 !== e.removedNodes.length && n(e, e.removedNodes, "removedNodes");
                        });
                        var s = r(o, i);
                        s && t && t(s);
                    }, o = new MutationObserver(r), c = {
                        childList: !0,
                        subtree: !0,
                        attributes: !1,
                        characterData: !1
                    };
                    o.observe(e, c), s.push({
                        node: e,
                        cb: t,
                        mo: o
                    });
                }
            }
        }
        function o(e, t) {
            var n = i.findLast(s, {
                node: e,
                cb: t
            });
            n && (n.mo.disconnect(), s = i.without(s, n));
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("lodash"), a = [ "b", "strong", "i", "em", "u", "ins", "s", "font", "span", "ul", "li", "ol", "a", "img", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6" ], s = [];
        n.watch = r, n.unwatch = o;
    }, {
        lodash: "lodash"
    } ],
    321: [ function(e, t, n) {
        "use strict";
        function r(e, t) {
            return e + "=" + encodeURIComponent(t);
        }
        function o(e, t) {
            return r("utm_medium", "internal") + "&" + r("utm_source", e) + "&" + r("utm_campaign", t);
        }
        function i(e, t) {
            return m.URLS.signup + "?" + o(e, t);
        }
        function a() {
            return m.URLS.signin + "?" + r("utm_medium", "internal");
        }
        function s() {
            return m.URLS.resetPassword + "?" + r("utm_medium", "internal");
        }
        function c() {
            return m.URLS.terms + "?" + r("utm_medium", "internal");
        }
        function l() {
            return m.URLS.policy + "?" + r("utm_medium", "internal");
        }
        function u(e, t) {
            return m.URLS.upgrade + "?" + o(e, t);
        }
        function d() {
            return m.URLS.welcomeC + "?" + r("utm_medium", "navigation");
        }
        function f() {
            var e = m.URLS.authCreatePage + "/?extension_install=true";
            return e + "&" + r("utm_medium", "navigation");
        }
        function p(e, t, n) {
            return e + "&" + o(t, n);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = e("./newConfig");
        n.getSignUpURL = i, n.getSignInURL = a, n.getResetPasswordURL = s, n.getTermsURL = c, 
        n.getPrivatePolicyURL = l, n.getUpgradeURL = u, n.getExtensionSuccessURL = d, n.getAuthCreatePageURL = f, 
        n.addParamsToUpgradeURL = p;
    }, {
        "./newConfig": 279
    } ],
    322: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            var t = [ "freeeeeeee@grammarly.com", "premiumuser@grammarly.com" ].indexOf(e) !== -1;
            return !t && /^.*@grammarly.com$/.test(e);
        }
        function i() {
            return window.chrome && window.chrome.runtime && window.chrome.runtime.lastError;
        }
        function a(e) {
            return !!(e && e.constructor && e.call && e.apply);
        }
        function s(e, t) {
            function n() {
                function n() {
                    o(), e();
                }
                function o() {
                    var o = setTimeout(n, t);
                    r[e] = o;
                }
                o();
            }
            var r = s.items = s.items || {}, o = r[e];
            if (o || t) return o && !t ? (clearTimeout(o), void delete r[e]) : void n();
        }
        function c(e) {
            s(e);
        }
        function l() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        }
        function u() {
            return l() + l() + "-" + l() + "-" + l() + "-" + l() + "-" + l() + l() + l();
        }
        function d() {}
        function f() {
            return !0;
        }
        function p() {
            window.chrome && window.chrome.runtime && window.chrome.runtime.reload ? window.chrome.runtime.reload() : window.location.reload();
        }
        function m(e) {
            if (e.location) {
                var t = "mail.google.com" == e.location.host, n = e.querySelector("iframe#js_frame") && e.querySelector("iframe#sound_frame");
                return t || n;
            }
        }
        function h(e) {
            return /^[-!#$%&\'*+\\.\/0-9=?A-Z^_`a-z{|}~]+@[-!#$%&\'*+\\/0-9=?A-Z^_`a-z{|}~]+\.[-!#$%&\'*+\\.\/0-9=?A-Z^_`a-z{|}~]+$/.test(e);
        }
        function g(e) {
            return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        function b(e, t) {
            return t[1 == e ? 0 : 1];
        }
        function v(e) {
            return Q.transform(e, function(e, t) {
                return e[t] = d;
            });
        }
        function _(e, t, n) {
            var r = {}, o = function() {
                var o = "_memoize_" + (t ? t.apply(this, arguments) : arguments[0]);
                return window.hasOwnProperty.call(r, o) ? r[o] : (n && setTimeout(function() {
                    delete r[o];
                }, n), r[o] = e.apply(this, arguments));
            };
            return o;
        }
        function y(e, t) {
            return (0, q["default"])(t).reduce(function(n, r) {
                return (0, z["default"])({}, n, (0, G["default"])({}, r, function() {
                    for (var n = arguments.length, o = Array(n), i = 0; i < n; i++) o[i] = arguments[i];
                    return e.then(function() {
                        return t[r].apply(t, o);
                    });
                }));
            }, {});
        }
        function w(e) {
            return new Y["default"](function(t) {
                return e(t);
            });
        }
        function k(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e;
        }
        function E(e) {
            return new Y["default"](function(t) {
                return setTimeout(t, e);
            });
        }
        function C(e) {
            if (e) {
                var t = new Date(e);
                if ("Invalid Date" !== t.toString()) return ee[t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear();
            }
        }
        function x(e) {
            var t = function() {};
            return t.prototype = e(), t;
        }
        function S() {
            function e(e) {
                return e.split(".").map(function(e) {
                    return Number(e) || 0;
                });
            }
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r = e(t), o = e(n), i = Array(Math.abs(r.length - o.length)).fill(0);
            if (r.length > o.length ? o.push.apply(o, (0, U["default"])(i)) : r.push.apply(r, (0, 
            U["default"])(i)), r.every(function(e, t) {
                return e === o[t];
            })) return 0;
            for (var a = 0, s = r.length; a < s; a++) {
                if (r[a] > o[a]) return 1;
                if (r[a] < o[a]) return -1;
            }
            return -1;
        }
        function T() {
            return J(this, void 0, void 0, D["default"].mark(function e() {
                return D["default"].wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if ($.isChrome() || $.isFF()) {
                            e.next = 2;
                            break;
                        }
                        return e.abrupt("return", null);

                      case 2:
                        return e.prev = 2, e.next = 5, Y["default"].race([ new Y["default"](function(e) {
                            return window.chrome.runtime.sendMessage("ping", e);
                        }), E(1e4).then(function(e) {
                            return "timeouted";
                        }) ]);

                      case 5:
                        return e.abrupt("return", e.sent);

                      case 8:
                        return e.prev = 8, e.t0 = e["catch"](2), e.abrupt("return", "orphaned");

                      case 11:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 2, 8 ] ]);
            }));
        }
        function N(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
            setTimeout(e, t);
        }
        function P() {
            function e(e) {
                if (a.length > 0) {
                    var t = a.shift();
                    t(e);
                } else o ? i.push(e) : i[0] = e;
            }
            function t() {
                return i.length ? Y["default"].resolve(i.shift()) : new Y["default"](function(e) {
                    return a.push(e);
                });
            }
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = n.buffered, o = void 0 === r || r, i = [], a = [];
            return {
                take: t,
                put: e
            };
        }
        function j(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
            if (!e) return NaN;
            var n = X.createHash("superfasthash");
            return parseInt(n.hash(e), 16) % t;
        }
        function I(e) {
            return e.which || e.charCode || e.keyCode || 0;
        }
        function A(e, t) {
            return e = e.replace(oe, "<br>" + te).replace(ne, "<br>"), t && (e = e.replace(re, te)), 
            e;
        }
        function L(e) {
            return e.replace(/^\s+/, "");
        }
        function M(e) {
            return e.replace(/\s+$/, "");
        }
        function O() {
            var e = new Date();
            return e.getHours() > 2 && e.setDate(e.getDate() + 1), e.setHours(3), e.setMinutes(Math.floor(60 * Math.random())), 
            e.getTime();
        }
        function R(e) {
            return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
        var F = e("babel-runtime/regenerator"), D = r(F), B = e("babel-runtime/helpers/toConsumableArray"), U = r(B), W = e("babel-runtime/helpers/defineProperty"), G = r(W), V = e("babel-runtime/core-js/object/assign"), z = r(V), H = e("babel-runtime/core-js/object/keys"), q = r(H), K = e("babel-runtime/core-js/promise"), Y = r(K), J = function(e, t, n, r) {
            return new (n || (n = Y["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var Q = e("lodash"), X = e("non-crypto-hash"), $ = e("./newConfig"), Z = e("./newConfig");
        n.isTestsMode = Z.isTestsMode, n.getBrowser = Z.getBrowser, n.isBg = Z.isBg, n.isBgOrPopup = Z.isBgOrPopup, 
        n.isChrome = Z.isChrome, n.isFF = Z.isFF, n.isPopup = Z.isPopup, n.isSafari = Z.isSafari, 
        n.isEdge = Z.isEdge, n.isWindows = Z.isWindows, n.isGrammarlyEmail = o, n.chromeBgError = i, 
        n.isFunction = a, n.interval = s, function(e) {
            e.items = {};
        }(s = n.interval || (n.interval = {})), n.cancelInterval = c, n.guid = u, n._f = d, 
        n._F = f, n.bgPageReload = p, n.isGmail = m, n.isValidEmail = h, n.formatNumber = g, 
        n.declension = b, n.stub = v, n.memoize = _, n.syncWait = y, n.promisify = w, n.getRandomIntInclusive = k, 
        n.delay = E;
        var ee = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        n.formatDate = C, n.createClass = x, n.versionComparator = S, n.isBgAlive = T, n.asyncCall = N, 
        n.createChannel = P, n.normalizedHashCode = j, n.keyCode = I, n.NBSP_RE = new RegExp(String.fromCharCode(160), "g");
        var te = String.fromCharCode(160), ne = /\n/g, re = /\s$/g, oe = new RegExp("\n" + String.fromCharCode(32), "g");
        n.br = A, n.trimLeft = L, n.trimRight = M, n.SECOND = 1e3, n.MINUTE = 60 * n.SECOND, 
        n.HOUR = 60 * n.MINUTE, n.DAY = 24 * n.HOUR, n.ESC_KEY = 27, n.ENTER_KEY = 13, n.pastDays = function(e) {
            return Math.round(Math.abs(+new Date() - +new Date(e)) / n.DAY);
        }, n.getNextPingDate = O, n.escapeRegExp = R;
    }, {
        "./newConfig": 279,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/toConsumableArray": 41,
        "babel-runtime/regenerator": 43,
        lodash: "lodash",
        "non-crypto-hash": "non-crypto-hash"
    } ],
    323: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t, n, r) {
            var o = r ? t + "_forced" : t, i = {
                listeners: []
            }, a = function() {
                var e = i.listeners.indexOf(n);
                e > -1 && i.listeners.splice(e, 1);
            };
            if ("on" === e || "once" === e) {
                if (m[o] = m[o] || {
                    domEventListener: function(t) {
                        p.emit(o, t), "once" === e && a();
                    },
                    listeners: []
                }, i = m[o], i.domEventListener) {
                    var s = function(e) {
                        i.domEventListener && i.domEventListener((0, u["default"])({
                            originalEvent: e,
                            preventDefault: f._f,
                            stopPropagation: f._f
                        }, e.detail));
                    };
                    i.listenerWrapper = i.listenerWrapper || s;
                }
                0 === i.listeners.length && (i.domEventListener && window.addEventListener(t, i.domEventListener, r), 
                i.listenerWrapper && window.addEventListener(t + "-gr", i.listenerWrapper, r)), 
                i.listeners.push(n);
            }
            if ("un" === e) {
                var c = m[o];
                if (!c) return;
                a(), 0 === c.listeners.length && (c.domEventListener && window.addEventListener(t, c.domEventListener, r), 
                c.listenerWrapper && window.addEventListener(t + "-gr", c.listenerWrapper, r));
            }
            p[e](o, n);
        }
        var i = e("babel-runtime/core-js/object/keys"), a = r(i), s = e("babel-runtime/helpers/typeof"), c = r(s), l = e("babel-runtime/core-js/object/assign"), u = r(l);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var d = e("emitter"), f = e("./util"), p = d({}), m = {}, h = function(e) {
            return function(t, n) {
                var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                "object" === ("undefined" == typeof t ? "undefined" : (0, c["default"])(t)) ? (0, 
                a["default"])(t).map(function(n) {
                    return o(e, n, t[n], r);
                }) : n && o(e, t, n, r);
            };
        };
        n.on = h("on"), n.off = h("un"), n.once = h("one");
    }, {
        "./util": 322,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/helpers/typeof": 42,
        emitter: "emitter"
    } ],
    324: [ function(e, t, n) {
        "use strict";
        function r() {
            var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
            if (t > 0) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
            var n = e.indexOf("Trident/");
            if (n > 0) {
                var r = e.indexOf("rv:");
                return parseInt(e.substring(r + 3, e.indexOf(".", r)), 10);
            }
            var o = e.indexOf("Edge/");
            return o > 0 && parseInt(e.substring(o + 5, e.indexOf(".", o)), 10);
        }
        function o(e) {
            return e ? void (ae = e) : ae;
        }
        function i(e) {
            return e ? void (se = e) : se;
        }
        function a(e) {
            fe = e;
        }
        function s(e) {
            for (;e.parent; ) e = e.parent;
            return e;
        }
        function c(e) {
            for (var t = e.concat(), n = 0; n < t.length; n++) {
                var r = t[n], o = [];
                void 0 === r._s && (r._s = r.s, r._e = r.e);
                for (var i = n + 1; i < t.length; i++) {
                    var a = t[i];
                    if (void 0 === a._s && (a._s = a.s, a._e = a.e), !(l(r, a) <= 0)) {
                        if (r._s > a._s && r._e - a._e > 0) {
                            o.push({
                                _s: r._s,
                                _e: a._e,
                                parent: r
                            }), o.push({
                                _s: a._e,
                                _e: r._e,
                                parent: r
                            });
                            break;
                        }
                        if (r._e < a._e && a._s - r._s > 0) {
                            o.push({
                                _s: r._s,
                                _e: a._s,
                                parent: r
                            }), o.push({
                                _s: a._s,
                                _e: r._e,
                                parent: r
                            });
                            break;
                        }
                    }
                }
                o.length && (t.splice.apply(t, [ n, 1 ].concat(o)), n = 0);
            }
            return t.sort(function(e, t) {
                return e._s - t._s || t._e - e._e;
            }), t;
        }
        function l(e, t) {
            return Math.min(e._e, t._e) - Math.max(e._s, t._s);
        }
        function u(e) {
            return null === e ? "" : ("" + e).replace(de.mark, function(e) {
                return ce[e];
            });
        }
        function d(e) {
            return null === e ? "" : ("" + e).replace(de.escape, function(e) {
                return le[e];
            });
        }
        function f(e) {
            var t = e.node, n = e.matches, r = e.createElement, o = e.isValidNode || function(e) {
                return !0;
            }, i = e.isValidMatchForNode, a = c(n).filter(function(e) {
                return !e.inDom && !s(e).inDom;
            });
            0 !== a.length && (y(t, t, 0, a, null, r, o, i), a = c(n).filter(function(e) {
                return !e.inDom && !s(e).inDom;
            }));
        }
        function p(e) {
            return e.replace(/\n/g, "<br>");
        }
        function m(e) {
            var t = e.text, n = e.node, r = e.matches, o = e.createTag, i = e.updateMethod;
            i ? i(t, r, function(e, t) {
                var n = c(t);
                return b(e, n, o);
            }) : (c(r), n.innerHTML = p(b(t, r, o)));
        }
        function h(e) {
            return "dom" === e.type ? f(e) : "text" === e.type ? m(e) : void 0;
        }
        function g(e, t) {
            var n = e.parent || e, r = "";
            return {
                start: '<g class="gr_ gr_' + n.id + r + '" id="' + n.id + '">',
                end: "</g>"
            };
        }
        function b(e, t, n) {
            var r = e;
            e = u(e);
            var o = n || g, i = [], a = void 0, s = void 0, c = void 0, l = void 0, f = void 0, p = 0, m = 0, h = 0;
            for (h = 0; h < t.length; h++) {
                for (f = t[h], f.calculatedPos = !1, s = f.parent || f, s.inDom = !0, s.orig && (s.orig.inDom = !0), 
                s = s.orig || s, a = o(s, r), s.renderTs = s.renderTs || Date.now(), c = a.start, 
                l = p + f._s, e = e.substring(0, l) + c + e.substring(l), p += c.length, m = 0; m < i.length; m++) i[m] > l && (i[m] += c.length);
                i.push(p + f._e);
            }
            for (i.sort(function(e, t) {
                return e - t;
            }), p = 0, m = 0; m < i.length; m++) l = p + i[m], e = e.substring(0, l) + a.end + e.substring(l), 
            p += a.end.length;
            return d(e);
        }
        function v(e, t) {
            var n = document.createElement("g");
            return n.getElementsByTagName("g"), n.className = "gr_ gr_" + e.id, n.textContent = t, 
            n.id = e.id.toString(), n;
        }
        function _(e, t, n, r, o) {
            var i = e.ownerDocument || e, a = i.createRange(), s = i.activeElement !== o, c = void 0, l = void 0;
            if (s) {
                var u = ee.getDocSelection(i);
                c = {
                    node: u.anchorNode,
                    activeElement: i.activeElement,
                    offset: u.anchorOffset,
                    selectionStart: i.activeElement.selectionStart
                }, l = {
                    node: u.focusNode,
                    offset: u.focusOffset,
                    selectionEnd: i.activeElement.selectionEnd
                };
            }
            try {
                a.setStart(e, t), a.setEnd(e, n), a.deleteContents(), a.insertNode(r);
            } catch (n) {
                throw fe && fe("replaceRange"), n;
            }
            s && ("INPUT" === c.activeElement.tagName || "TEXTAREA" === c.activeElement.tagName ? (c.activeElement.focus(), 
            c.activeElement.selectionStart = c.selectionStart, c.activeElement.selectionEnd = l.selectionEnd) : c.node && X(c, l));
        }
        function y(e, t, n, r, o, i, a, c) {
            var l = void 0, u = n || 0, d = 0, f = {
                _s: void 0,
                _e: void 0
            };
            i = i || v, o = o || {
                level: -1,
                validNodeForMatchLevel: 0
            }, o.text = o.text || z(e);
            var p = o.level, m = a(t);
            for (m ? o.level <= o.validNodeForMatchLevel && (o.validNodeForMatch = !0, o.validNodeForMatchLevel = o.level) : (o.validNodeForMatch = !1, 
            o.validNodeForMatchLevel = o.level), o.level++, t.__s = u, d = 0; d < t.childNodes.length; d++) if (l = t.childNodes[d], 
            l.__jump_next && (d++, delete l.__jump_next, l = t.childNodes[d]), l && (1 === l.nodeType || 3 === l.nodeType) && !W(l)) {
                var h = R(e, l);
                if (!D(h) || 3 !== l.nodeType) {
                    3 !== l.nodeType && (u = y(e, l, u, r, o, i, a, c));
                    var g = o.brAddedAtNode, b = o.prevIsBr, w = b && (g === l || j(g, l) || j(l, g));
                    h.prevIsBrWithinNode = w;
                    var k = B(h), E = k;
                    f._s = u, f._e = u + k.length, u = f._e, k && (o.prevIsBr = !1);
                    var C = F(h);
                    if (C && (o.prevIsBr = !0, u++, o.brAddedAtNode = l.parentNode), h.isPreWrap && k.indexOf("\n") !== -1 && (o.prevIsBr = !0, 
                    o.brAddedAtNode = l.parentNode), "IMG" === h.node.tagName && (o.prevIsBr = !1), 
                    3 === l.nodeType && f._s !== f._e) {
                        E !== l.textContent && (l.textContent = E);
                        for (var x = 0; x < r.length; x++) {
                            var S = r[0], N = S.parent || S;
                            if (S.__s = S.__s || S._s, S.__e = S.__e || S._e, S.__s >= f._e) break;
                            for (;"\n" === o.text[S.__s]; ) S.__s++;
                            if (l && S.__s < f._s) {
                                for (var P = l.parentNode; void 0 !== P.__s && P.__s > S.__s; ) P = P.parentNode;
                                if (S.__timesRendered = S.__timesRendered || 0, S.__timesRendered++, S.__timesRendered > 5) break;
                                y(e, P, P.__s, r, o, i, a, c);
                            }
                            if (f._e < S._e) {
                                var I = S.__s;
                                S.__s = f._e, S = {
                                    __s: I,
                                    __e: f._e,
                                    parent: S
                                };
                            } else r.shift(), x--;
                            if (o.validNodeForMatch || c(l, o.validNodeForMatch, N)) {
                                var A = 0;
                                void 0 !== S.__s && f._s < S.__s && (A = S.__s - f._s, k = k.substr(A)), S.calculatedPos = !1;
                                var L = S.__e - S.__s, M = A + L, O = s(S), G = i(O, k.substr(0, L));
                                if (O.renderTs = O.renderTs || Date.now(), N.inDom = !0, n = u + S.__s, k = k.substr(0, L), 
                                _(l, A, M, G, e), G.__node_info = null, G.previousSibling && (G.previousSibling.__node_info = null), 
                                G.nextSibling && (G.nextSibling.__node_info = null), T(l), l.parentNode === t) {
                                    d++, f._s = S.__s, f._e = S.__e, G.__s = S.__s, u = S.__e;
                                    var V = F(R(e, G));
                                    V && u++;
                                }
                                delete S.__s, delete S.__e, delete S.__timesRendered, l = G.firstChild, G.parentNode !== t && G.parentNode && y(e, G.parentNode, G.parentNode.__s, r, o, i, a, c);
                            }
                        }
                    }
                }
            }
            if (U(t) && U(t.nextElementSibling)) {
                var H = r[0];
                H && H.__s === u && H.__s++, u++;
            }
            return o.level = p, u;
        }
        function w(e) {
            if (!e || e && 0 === e.length) return !1;
            if (1 === e.length) return e[0];
            for (var t = e[0], n = e.length, r = 1; r < n; r++) t.appendChild(e[r]), N(e[r].parentNode);
            return t.innerHTML = z(t), t.normalize(), e[0].parentNode.normalize(), N(t), N(e[0].parentNode), 
            t;
        }
        function k(e) {
            return e.replace(ne, "");
        }
        function E(e) {
            return e.replace(re, "");
        }
        function C(e) {
            return e.replace(ne, "").replace(re, "");
        }
        function x(e) {
            return e.replace(ne, " ").replace(re, " ");
        }
        function S(e, t) {
            if (e) return e.__trimmed_content ? e.__trimmed_content : t ? (e.__trimmed_content = e.textContent, 
            e.__trimmed_content) : e.textContent ? (e.__trimmed_content = C(e.textContent), 
            e.__trimmed_content) : void 0;
        }
        function T(e) {
            e.__trimmed_content && delete e.__trimmed_content, e.__node_text && delete e.__node_text;
        }
        function N(e) {
            if (e && (T(e), e.parentNode && "HTML" !== e.parentNode.nodeName && e.parentNode.normalize(), 
            e.childNodes.length > 0)) for (var t = 0, n = e.childNodes.length; t < n; t++) N(e.childNodes[t]);
        }
        function P(e) {
            return e.replace(/\n+/g, " ").replace(oe, " ");
        }
        function j(e, t) {
            if (!t) return !1;
            for (var n = t.parentNode; null !== n; ) {
                if (n === e) return !0;
                n = n.parentNode;
            }
            return !1;
        }
        function I(e) {
            if (e.parentNode) {
                var t = e.ownerDocument, n = e.parentNode;
                if (e.childNodes.length > 1) {
                    for (var r = t.createDocumentFragment(); e.childNodes.length > 0; ) {
                        var o = e.childNodes[0];
                        r.appendChild(o);
                    }
                    n.replaceChild(r, e), N(n);
                } else e.firstChild ? (n.replaceChild(e.firstChild, e), n.normalize(), N(n)) : (n.removeChild(e), 
                n.normalize(), N(n));
            }
        }
        function A(e) {
            if (!e) return !1;
            if (e.__is_block) return e.__is_block;
            if (!e.ownerDocument || !e.tagName || W(e)) return e.__is_block = !1, !1;
            var t = e.tagName.toLowerCase(), n = [ "table", "div", "p", "blockquote", "body", "table", "tr", "th", "td", "ol", "ul", "li", "h1", "h2", "h3", "h4", "h5", "h6" ].indexOf(t) !== -1;
            return "block" === e.style.display && (n = !0), e.__is_block = n, n;
        }
        function L(e, t) {
            if (e.__white_space) return "pre-wrap" === e.__white_space;
            for (var n = 3 === e.nodeType ? e.parentNode : e; n !== t || e === t || e.parentNode === t; ) {
                if (n.__white_space || (n.__white_space = getComputedStyle(n).whiteSpace), "pre-wrap" === n.__white_space) return e.__white_space = n.__white_space, 
                "pre-wrap" === e.__white_space;
                if (n = n.parentNode, e === t || e.parentNode === t) return !1;
            }
            return !1;
        }
        function M() {
            return n._shouldCache || document.location.hash.indexOf("cache") > -1;
        }
        function O(e, t) {
            if ("SPAN" === e.parentNode.tagName) {
                for (var n = !0, r = e.parentNode.parentNode; r !== t; ) r.parentNode.lastChild !== r && (n = !1), 
                r = r.parentNode;
                return n;
            }
            return e.parentNode.parentNode.lastChild === e.parentNode;
        }
        function R(e, t) {
            if (t.__node_info && M()) return t.__node_info.pos = t.__node_info.offset = t.__node_info.prevIsBrWithinNode = void 0, 
            t.__node_info;
            var n = A(t), r = L(t, e), o = t.nextSibling, i = t.previousSibling, a = S(i, r), s = S(o, r);
            o && 3 === o.nodeType && !s && (o = o.nextSibling, s = S(o, r)), i && 3 === i.nodeType && !a && (i = i.previousSibling, 
            a = S(i, r));
            var c = o && o.parentNode && S(o.parentNode.lastChild, r), l = A(o), u = A(i), d = o && !!o.tagName && !A(o), f = i && !!i.tagName && !A(i), p = "BR" === t.tagName, m = "P" === t.tagName, h = o && "BR" === o.tagName, g = i && "BR" === i.tagName, b = o && o.parentNode.lastElementChild === o && !c, v = t.parentNode.firstChild === t || !S(t.parentNode.firstChild, r) && t.parentNode.firstElementChild === t, _ = t.parentNode.lastChild === t || !c && t.parentNode.lastElementChild === t, y = v && t.parentNode === e, w = !!S(t, r) || !(!n || !t.querySelector("br")) || !(!t.tagName || !t.querySelector("img")), k = i && !!a, E = o && !!s, C = !!S(t.parentNode, r), x = p && O(t, e), T = o && (3 === o.nodeType || d) && E, N = i && (3 === i.nodeType || f) && k, P = l && E, j = u && k, I = t.parentNode && t.parentNode.children && 1 === t.parentNode.children.length;
            return t.__node_info = {
                pos: void 0,
                offset: void 0,
                node: t,
                root: e,
                preWrap: r,
                next: o,
                prev: i,
                isTextNode: 3 === t.nodeType,
                nodeIsBlock: n,
                nextIsBlock: l,
                prevIsBlock: u,
                nextInline: d,
                prevInline: f,
                nodeIsBr: p,
                nodeIsP: m,
                nextIsBr: h,
                prevIsBr: g,
                prevIsBrWithinNode: void 0,
                nextIsLastChild: b,
                nodeIsFirstChild: v,
                nodeIsLastChild: _,
                nodeIsRootFirstChild: y,
                nodeWithContent: w,
                prevWithContent: k,
                nextWithContent: E,
                parentWithContent: C,
                parentIsLastChildForBr: x,
                nextIsElement: T,
                prevIsElement: N,
                nextIsBlockWithContent: P,
                prevIsBlockWithContent: j,
                onlyOneChild: I,
                isPreWrap: !1,
                isRoot: t === e
            }, t.__node_info;
        }
        function F(e) {
            var t = !1;
            return e.nodeIsBlock && e.nodeWithContent && e.nextIsElement && !e.prevIsBrWithinNode && (t = !0), 
            !e.nodeIsBlock && e.nodeWithContent && (e.nextIsBlock || e.nextIsBr) && (t = !0), 
            e.nodeIsBlock && e.nodeWithContent && e.nextIsBlock && !e.prevIsBrWithinNode && (t = !0), 
            e.nextIsBr && !e.nextIsLastChild && e.nodeWithContent && (t = !0), e.nodeIsBr && !e.parentWithContent && e.nodeIsLastChild && (t = !0, 
            ue && e.parentIsLastChildForBr && (t = !1)), e.nodeIsBr && e.nextIsBr && (t = !0), 
            e.nodeIsBr && e.nodeIsFirstChild && !e.onlyOneChild && (t = !0), e.nodeIsBr && e.nextIsElement && !e.prevWithContent && !e.prevIsBr && (t = !0), 
            e.nodeIsBr && e.nextIsBlockWithContent && e.prevIsBlockWithContent && (t = !0), 
            ue && 0 === e.node.childNodes.length && "<br>" === e.node.innerHTML && (t = !0), 
            e.isRoot && (t = !1), !(e.preWrap && e.node && e.node.textContent && "\n" === e.node.textContent[e.node.textContent.length - 1]) || e.prev && !e.prevIsBlock || e.next && !e.nextIsBlock || (t = !1), 
            e.isTextNode && D(e) && (t = !1), U(e.node) && (t = !1), t;
        }
        function D(e) {
            return e.node.parentNode && [ "table", "tbody", "thead", "tr" ].indexOf(e.node.parentNode.tagName.toLowerCase()) !== -1;
        }
        function B(e) {
            if (!e.node.nodeValue) return "";
            if (D(e)) return "";
            if (e.preWrap) return e.node.nodeValue;
            if (e.node.__node_text) return e.node.__node_text;
            var t = P(e.node.nodeValue);
            return e.next && e.prev || A(e.node.parentNode) || e.prevIsBr ? ((!e.prev || e.prevIsBlock || e.prevIsBr) && (t = k(t)), 
            e.next && !e.nextIsBlock || ue || (t = E(t)), e.node.__node_text = t, t) : (e.node.__node_text = t, 
            t);
        }
        function U(e) {
            if (e) return "TD" === e.tagName || "TH" === e.tagName;
        }
        function W(e) {
            return 1 === e.nodeType && (G(e) || V(e));
        }
        function G(e) {
            var t = e.tagName.toLowerCase();
            return se.indexOf(t) >= 0;
        }
        function V(e) {
            for (var t = 0; t < ae.length; t++) if (e.classList.contains(ae[t])) return !0;
            return !1;
        }
        function z(e, t) {
            function n(e) {
                function n(a) {
                    if ((3 === a.nodeType || 1 === a.nodeType) && !W(a)) {
                        var s = R(e, a), c = o;
                        if (!D(s) || 3 !== a.nodeType) {
                            if (s.isTextNode) {
                                var l = B(s);
                                o += l.length, l && r.push(l), s.preWrap && "\n" === l[l.length - 1] && (i = a.parentNode);
                            }
                            if (a.childNodes && !W(a)) for (var u = 0, d = a.childNodes.length; u < d; ++u) if (n(a.childNodes[u]) === !1) return !1;
                            "IMG" === a.tagName && r.push(""), U(a) && U(a.nextElementSibling) && (r.push(ie), 
                            o++);
                            var f = r[r.length - 1], p = !!f && "\n" === f[f.length - 1] && (i === a || j(i, a) || j(a, i));
                            s.prevIsBrWithinNode = p;
                            var m = F(s);
                            return m && (r.push("\n"), o++, i = a.parentNode), (!t || t(s, c) !== !1) && void 0;
                        }
                    }
                }
                var r = [], o = 0, i = void 0;
                return n(e), r.join("");
            }
            var r = !!t;
            if (t = t || Z._f, e.normalize(), !r && e.__getText && e.__getText.getText && e.__getText.innerHTML === e.innerHTML) return e.__getText.getText;
            var o = n(e);
            return r && e.__getText && delete e.__getText, r || (e.__getText = {
                getText: o,
                innerHTML: e.innerHTML
            }), o;
        }
        function H(e, t, n) {
            var r = e;
            if (n.isTextNode) {
                var o = (n.node.textContent || "").substr(0, t);
                !n.preWrap && C(o) && (o = E(o));
                var i = {
                    prev: n.prev,
                    preWrap: n.preWrap,
                    prevIsBlock: n.prevIsBlock,
                    prevIsBr: n.prevIsBr,
                    node: {
                        nodeValue: o
                    }
                }, a = B(i);
                r = t + e - (o.length - a.length);
            } else n.nodeIsBr && !n.onlyOneChild && r--;
            return r;
        }
        function q(e, t, n) {
            var r = 0;
            return t.childNodes.length && n > 0 && (t = t.childNodes[n], n = 0), z(e, function(e, o) {
                if (e.node === t) return r = H(o, n, e), !1;
            }), r;
        }
        function K(e) {
            z(e, function(e, t) {
                e.isTextNode || (e.node.__pos = t);
            });
        }
        function Y(e, t) {
            var n = void 0;
            return e.normalize(), z(e, function(e, r) {
                e.pos = r, e.offset = 0;
                var o = r + B(e).length;
                if (r === o && !ue) return !0;
                if (t >= r && t <= o) {
                    for (var i = e.node.nodeValue || "", a = 0; a <= i.length; a++) t !== H(r, a, e) || (e.offset = a);
                    return !((!e.nodeIsBr || 0 !== e.offset) && (!e.isTextNode || e.nodeWithContent || ue && "" !== x(i))) || (n = e, 
                    !1);
                }
            }), n;
        }
        function J(e) {
            var t = ee.getDocSelection(e.ownerDocument);
            if (!t.anchorNode) return {
                s: -1,
                e: -1
            };
            var n = q(e, t.anchorNode, t.anchorOffset), r = t.isCollapsed ? n : q(e, t.focusNode, t.focusOffset);
            return {
                s: n,
                e: r
            };
        }
        function Q(e, t) {
            var n = Y(e, t.s);
            if (!n) return !1;
            M() && (n = $.clone(n));
            var r = t.s === t.e ? n : Y(e, t.e);
            if (!(!n || n < 0 || r < 0)) if (ue) {
                X(n, r);
                var o = J(e);
                o.s !== t.s && n.offset > 0 && (n.offset--, r.offset--, X(n, r), n.offset++, r.offset++, 
                X(n, r));
            } else X(n, r);
        }
        function X(e, t) {
            var n = e.node.ownerDocument;
            try {
                t || (t = e);
                var r = ee.getDocSelection(n), o = n.createRange();
                o.setStart(e.node, e.offset), o.setEnd(t.node, t.offset), r.removeAllRanges(), r.addRange(o);
            } catch (i) {
                console.log(i);
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var $ = e("lodash"), Z = e("lib/util"), ee = e("lib/dom"), te = [ 10, 8, 32, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8203, 8287, 12288 ].map(function(e) {
            return String.fromCharCode(e);
        }), ne = new RegExp("^[" + te.join("") + "]+", "g"), re = new RegExp("[" + te.join("") + "]+$", "g"), oe = new RegExp("[" + te.join("") + "]+", "g"), ie = String.fromCharCode(9), ae = [], se = [ "pre", "code", "blockquote" ], ce = {
            "&": "᪥",
            "<": "Ᲊ",
            ">": "ᲆ",
            '"': "᯼",
            "'": "ᨋ",
            "/": "ᩗ"
        }, le = {
            "᪥": "&amp;",
            "Ᲊ": "&lt;",
            "ᲆ": "&gt;",
            "᯼": "&quot;",
            "ᨋ": "&#x27;",
            "ᩗ": "&#x2F;"
        };
        n._shouldCache = !1;
        var ue = !!r(), de = {
            mark: new RegExp("[" + $.keys(ce).join("") + "]", "g"),
            escape: new RegExp("[" + $.keys(le).join("") + "]", "g")
        };
        n.skipClass = o, n.skipTag = i;
        var fe = void 0;
        n.setOnError = a, n.collision = l, n.render = h, n.replaceRange = _, n.mergeNodes = w, 
        n.invalidateNode = N, n.unwrap = I, n.getNodeText = B, n.hasSkipNode = W, n.hasSkipTag = G, 
        n.hasSkipClass = V, n.getText = z, n.getPosInText = q, n.markChildPos = K, n.getNodeByTextPos = Y, 
        n.getCursorPos = J, n.setCursorPos = Q, n.setRange = X;
    }, {
        "lib/dom": 215,
        "lib/util": 322,
        lodash: "lodash"
    } ],
    325: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            var n;
            return (n = []).concat.apply(n, (0, g["default"])(t.map(e)));
        }
        function i(e, t, n) {
            for (var r = [ t ], o = t, i = 0; i < n.length; i++) o = e(o, n[i]), r.push(o);
            return r;
        }
        function a(e) {
            return e.reduce(function(e, t) {
                return t > e ? t : e;
            }, e[0]);
        }
        function s(e, t) {
            return 0 === e.length ? void 0 : e.reduce(function(e, n) {
                var r = t(n);
                return r > e[1] ? [ n, r ] : e;
            }, [ e[0], t(e[0]) ])[0];
        }
        function c(e) {
            return e.slice().reverse();
        }
        function l(e, t) {
            for (var n = [], r = [], o = 0, i = 0, a = 0; a < t.length; a++) e(t[a]) ? n[o++] = t[a] : r[i++] = t[a];
            return [ n, r ];
        }
        function u(e, t) {
            if (e < 1) throw new Error("Invalid chunk size, expected > 0");
            if (0 === t.length) return [ [] ];
            for (var n = [], r = 0; r < Math.ceil(t.length / e); r++) n.push(t.slice(r * e, (r + 1) * e));
            return n;
        }
        function d(e, t) {
            for (var n = [], r = e(t); void 0 !== r; ) n.push(r[0]), r = e(r[1]);
            return n;
        }
        function f(e, t) {
            return void 0 !== t ? (0, m["default"])(Array(t - e), function(t, n) {
                return n + e;
            }) : (0, m["default"])(Array(e), function(e, t) {
                return t;
            });
        }
        var p = e("babel-runtime/core-js/array/from"), m = r(p), h = e("babel-runtime/helpers/toConsumableArray"), g = r(h);
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.flatMap = o, n.scan = i, n.maximum = a, n.maximumBy = s, n.reverse = c, n.partition = l, 
        n.chunkBySize = u, n.unfold = d, n.range = f;
    }, {
        "babel-runtime/core-js/array/from": 19,
        "babel-runtime/helpers/toConsumableArray": 41
    } ],
    326: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            if (!e) throw new m(t);
        }
        function i(e, t) {
            if (null == e) throw new m(function() {
                return t ? "Expected " + t + " to be non-null" : "Expected non-null";
            });
            return e;
        }
        var a = e("babel-runtime/core-js/object/get-prototype-of"), s = r(a), c = e("babel-runtime/helpers/classCallCheck"), l = r(c), u = e("babel-runtime/helpers/possibleConstructorReturn"), d = r(u), f = e("babel-runtime/helpers/inherits"), p = r(f);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = function(e) {
            function t(e) {
                return (0, l["default"])(this, t), (0, d["default"])(this, (t.__proto__ || (0, s["default"])(t)).call(this, "Assertion failed: " + (e ? "string" == typeof e ? e : e() : "(unnamed)")));
            }
            return (0, p["default"])(t, e), t;
        }(Error);
        n.AssertionError = m, n.assert = o, n.assertNonNull = i;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39
    } ],
    327: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/helpers/classCallCheck"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("emitter"), s = function c() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (0, i["default"])(this, c), this.on = function(t, n) {
                return e._internalEmitter.on(t, n);
            }, this.one = function(t, n) {
                return e._internalEmitter.one(t, n);
            }, this.off = function(t, n) {
                return e._internalEmitter.off(t, n);
            }, this.emit = function(t, n) {
                return e._internalEmitter.emit(t, n);
            }, this.delegate = function(t, n, r) {
                return e._internalEmitter.delegate(t, n, r);
            }, this._internalEmitter = a(t);
        };
        n.Emitter = s;
    }, {
        "babel-runtime/helpers/classCallCheck": 34,
        emitter: "emitter"
    } ],
    328: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            return e.some(function(e) {
                return e === t;
            }) ? t : void 0;
        }
        function i(e, t, n) {
            var r = o(e, t);
            if (void 0 !== r) return r;
            throw new TypeError('Unrecognized string union value "' + t + '"' + (n ? " for " + n : ""));
        }
        function a(e) {
            throw new x(e);
        }
        function s(e) {
            var t = parseInt(e, 10);
            return isNaN(t) ? void 0 : t;
        }
        function c(e, t) {
            var n = s(e);
            if (void 0 !== n) return n;
            throw new Error("Expected a number string, got '" + e + "'" + (void 0 !== t ? " for " + t : ""));
        }
        function l(e, t) {
            try {
                return e();
            } catch (n) {
                return t(n);
            }
        }
        var u = e("babel-runtime/core-js/object/get-prototype-of"), d = r(u), f = e("babel-runtime/helpers/possibleConstructorReturn"), p = r(f), m = e("babel-runtime/helpers/inherits"), h = r(m), g = e("babel-runtime/helpers/classCallCheck"), b = r(g), v = e("babel-runtime/helpers/createClass"), _ = r(v);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var y = e("./assert");
        n.assert = y.assert, n.assertNonNull = y.assertNonNull, n.AssertionError = y.AssertionError;
        var w = e("./promise");
        n.SafePromise = w.SafePromise;
        var k = e("./array");
        n.Arr = k;
        var E = e("./object");
        n.Obj = E;
        var C = function() {
            function e(t) {
                (0, b["default"])(this, e), this._getFallbackValue = t;
            }
            return (0, _["default"])(e, [ {
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
        n.Global = C, n.optionalStringUnion = o, n.assertStringUnion = i;
        var x = function(e) {
            function t(e) {
                return (0, b["default"])(this, t), (0, p["default"])(this, (t.__proto__ || (0, d["default"])(t)).call(this, "Matching not exhaustive" + (e ? ": unexpected value " + e : "")));
            }
            return (0, h["default"])(t, e), t;
        }(Error);
        n.MatchingNotExhaustiveError = x, n.assertNever = a, n.optionalIntString = s, n.assertIntString = c, 
        n.try_ = l;
    }, {
        "./array": 325,
        "./assert": 326,
        "./object": 329,
        "./promise": 330,
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39
    } ],
    329: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e, t) {
            var n = {};
            return (0, l["default"])(t).forEach(function(r) {
                return n[r] = e(r, t[r]);
            }), n;
        }
        function i(e, t) {
            var n = {};
            return (0, l["default"])(t).forEach(function(r) {
                e(r, t[r]) && (n[r] = t[r]);
            }), n;
        }
        function a(e) {
            return (0, l["default"])(e).map(function(t) {
                return e[t];
            });
        }
        function s(e) {
            return (0, l["default"])(e).map(function(t) {
                return [ t, e[t] ];
            });
        }
        var c = e("babel-runtime/core-js/object/keys"), l = r(c);
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.map = o, n.filter = i, n.values = a, n.pairs = s;
    }, {
        "babel-runtime/core-js/object/keys": 29
    } ],
    330: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/promise"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a;
        !function(e) {
            function t(e) {
                return new i["default"](e);
            }
            function n() {
                var e = void 0, t = void 0, n = new i["default"](function(n, r) {
                    e = n, t = r;
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
            function r(e) {
                return t(function(t, n) {
                    return t(e());
                });
            }
            e.create = t, e.createCompletionSource = n, e.sync = r;
        }(a = n.SafePromise || (n.SafePromise = {}));
    }, {
        "babel-runtime/core-js/promise": 31
    } ],
    331: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/json/stringify"), i = r(o), a = e("babel-runtime/core-js/object/keys"), s = r(a), c = e("babel-runtime/helpers/typeof"), l = r(c), u = e("babel-runtime/helpers/defineProperty"), d = r(u), f = e("babel-runtime/core-js/object/assign"), p = r(f), m = e("babel-runtime/helpers/classCallCheck"), h = r(m), g = e("babel-runtime/regenerator"), b = r(g), v = e("babel-runtime/core-js/promise"), _ = r(v), y = function(e, t, n, r) {
            return new (n || (n = _["default"]))(function(o, i) {
                function a(e) {
                    try {
                        c(r.next(e));
                    } catch (t) {
                        i(t);
                    }
                }
                function s(e) {
                    try {
                        c(r["throw"](e));
                    } catch (t) {
                        i(t);
                    }
                }
                function c(e) {
                    e.done ? o(e.value) : new n(function(t) {
                        t(e.value);
                    }).then(a, s);
                }
                c((r = r.apply(e, t || [])).next());
            });
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var w = function(e, t) {
            return y(void 0, void 0, void 0, b["default"].mark(function n() {
                var r;
                return b["default"].wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return n.prev = 0, n.next = 3, t.get(e);

                      case 3:
                        if (r = n.sent, "undefined" !== r) {
                            n.next = 8;
                            break;
                        }
                        return n.abrupt("return", void 0);

                      case 8:
                        return n.abrupt("return", r && JSON.parse(r));

                      case 9:
                        n.next = 19;
                        break;

                      case 11:
                        if (n.prev = 11, n.t0 = n["catch"](0), !n.t0 || !n.t0.toString().includes("SyntaxError")) {
                            n.next = 18;
                            break;
                        }
                        throw t.remove(e), new Error("'" + e + "' has unparseable value, removing");

                      case 18:
                        throw n.t0;

                      case 19:
                      case "end":
                        return n.stop();
                    }
                }, n, this, [ [ 0, 11 ] ]);
            }));
        }, k = function E(e) {
            var t = this;
            (0, h["default"])(this, E), this._api = e, this.get = function(e) {
                return y(t, void 0, void 0, b["default"].mark(function n() {
                    var t, r, o, i = this;
                    return b["default"].wrap(function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            if (t = Array.isArray(e), r = void 0, n.prev = 2, !t) {
                                n.next = 11;
                                break;
                            }
                            return e = e, n.next = 7, _["default"].all(e.map(function(e) {
                                return w(e, i._api);
                            }));

                          case 7:
                            o = n.sent, r = e.reduce(function(e, t, n) {
                                return (0, p["default"])(e, (0, d["default"])({}, t, o[n]));
                            }, {}), n.next = 15;
                            break;

                          case 11:
                            return e = e, n.next = 14, w(e, this._api);

                          case 14:
                            r = n.sent;

                          case 15:
                            n.next = 21;
                            break;

                          case 17:
                            n.prev = 17, n.t0 = n["catch"](2), t && (r = {}), console.warn("prefs get error:", n.t0);

                          case 21:
                            return n.abrupt("return", r);

                          case 22:
                          case "end":
                            return n.stop();
                        }
                    }, n, this, [ [ 2, 17 ] ]);
                }));
            }, this.set = function(e, n) {
                return y(t, void 0, void 0, b["default"].mark(function r() {
                    var t = this;
                    return b["default"].wrap(function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (null === e || "object" !== ("undefined" == typeof e ? "undefined" : (0, l["default"])(e))) {
                                r.next = 5;
                                break;
                            }
                            return r.next = 3, _["default"].all((0, s["default"])(e).map(function(n) {
                                return t.set(n, e[n]);
                            }));

                          case 3:
                            r.next = 14;
                            break;

                          case 5:
                            return r.prev = 5, n = void 0 === n ? "undefined" : (0, i["default"])(n), r.next = 9, 
                            this._api.set(e, n);

                          case 9:
                            r.next = 14;
                            break;

                          case 11:
                            r.prev = 11, r.t0 = r["catch"](5), console.warn("prefs set error", r.t0);

                          case 14:
                          case "end":
                            return r.stop();
                        }
                    }, r, this, [ [ 5, 11 ] ]);
                }));
            }, this.all = function() {
                return y(t, void 0, void 0, b["default"].mark(function e() {
                    var t, n, r;
                    return b["default"].wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.next = 2, this._api.getAll();

                          case 2:
                            t = e.sent;
                            for (n in t) if ("undefined" === t[n]) t[n] = void 0; else try {
                                r = t[n], t[n] = r && JSON.parse(r);
                            } catch (o) {}
                            return e.abrupt("return", t);

                          case 5:
                          case "end":
                            return e.stop();
                        }
                    }, e, this);
                }));
            }, this.remove = function(e) {
                try {
                    return t._api.remove(e);
                } catch (n) {
                    return console.warn("prefs remove error", n), _["default"].resolve();
                }
            }, this.clearAll = function() {
                try {
                    return t._api.removeAll()["catch"](function(e) {
                        return console.warn("prefs clearAll error", e);
                    });
                } catch (e) {
                    return console.warn("prefs clearAll error", e), _["default"].resolve();
                }
            };
        };
        n.PrefsImpl = k;
    }, {
        "babel-runtime/core-js/json/stringify": 22,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/core-js/object/keys": 29,
        "babel-runtime/core-js/promise": 31,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/defineProperty": 36,
        "babel-runtime/helpers/typeof": 42,
        "babel-runtime/regenerator": 43
    } ],
    332: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/assign"), i = r(o);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("./user/actions"), s = e("./settings/actions"), c = e("./connection/actions");
        n.pureActions = (0, i["default"])({}, a, c, s);
    }, {
        "./connection/actions": 333,
        "./settings/actions": 335,
        "./user/actions": 339,
        "babel-runtime/core-js/object/assign": 24
    } ],
    333: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return {
                type: n.t.UPDATE_CONNECTION,
                data: e
            };
        }
        function o(e) {
            return {
                type: n.t.ONLINE_STATE,
                online: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.t = {
            UPDATE_CONNECTION: "connection/UPDATE_CONNECTION",
            ONLINE_STATE: "connection/ONLINE_STATE"
        }, n.updateConnection = r, n.onlineConnection = o;
    }, {} ],
    334: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n.defaultConnection, t = arguments[1], r = t.type, o = t.data, i = t.online;
            switch (r) {
              case s.t.ONLINE_STATE:
                return (0, a["default"])({}, e, {
                    online: i
                });

              case s.t.UPDATE_CONNECTION:
                return (0, a["default"])({}, e, o);

              default:
                return e;
            }
        }
        var i = e("babel-runtime/core-js/object/assign"), a = r(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("./actions");
        n.defaultConnection = {
            networkOffline: !window.navigator.onLine,
            cookiesDisabled: navigator.cookieEnabled === !1,
            online: !0
        }, n.connectionReducer = o;
    }, {
        "./actions": 333,
        "babel-runtime/core-js/object/assign": 24
    } ],
    335: [ function(e, t, n) {
        "use strict";
        function r(e, t) {
            return {
                type: n.t.SET_DAPI_PROP,
                propKey: e,
                data: t
            };
        }
        function o(e) {
            return {
                type: n.t.CHANGE_WEAK_DIALECT,
                data: e
            };
        }
        function i(e) {
            return {
                type: n.t.CHANGE_STRONG_DIALECT,
                data: e
            };
        }
        function a(e) {
            return {
                type: n.t.SETTINGS_INITIAL,
                data: e
            };
        }
        function s(e) {
            return {
                type: n.t.TOGGLE_DEFS,
                enabledDefs: e
            };
        }
        function c(e, t) {
            return {
                type: n.t.TOGGLE_SITE,
                domain: t,
                enabled: e
            };
        }
        function l(e, t) {
            return {
                type: n.t.TOGGLE_FIELD,
                domain: t,
                data: e
            };
        }
        function u() {
            return {
                type: n.t.SEEN_NEWS
            };
        }
        function d() {
            return {
                type: n.t.SHOW_ONBOARDING
            };
        }
        function f() {
            return {
                type: n.t.SEEN_ONBOARDING
            };
        }
        function p(e) {
            return {
                type: n.t.SHOW_NEWS,
                showNews: e
            };
        }
        function m() {
            return {
                type: n.t.SEEN_REFERRALS
            };
        }
        function h() {
            return {
                type: n.t.CLICK_REFERRALS
            };
        }
        function g(e) {
            return {
                type: n.t.TOGGLE_POPUP,
                isPopupDisabled: e
            };
        }
        function b(e) {
            return {
                type: n.t.ENABLE_EMAIL_FEEDBACK,
                domain: e
            };
        }
        function v(e) {
            return {
                type: n.t.SAVE_ANONYMOUS_PROPERTIES,
                props: e
            };
        }
        function _(e) {
            return {
                type: n.t.SEEN_EMAIL_PERCEPTION_POPUP,
                seenEmailPerceptionPopupDate: e
            };
        }
        function y() {
            return {
                type: n.t.SET_EMAIL_PERCEPTION_POPUP_STATE,
                emailPerceptionPopupEnabled: !1
            };
        }
        function w() {
            return {
                type: n.t.SET_EMAIL_PERCEPTION_POPUP_STATE,
                emailPerceptionPopupEnabled: !0
            };
        }
        function k(e, t) {
            return {
                type: n.t.SAVE_FEEDBACK_DATA,
                subject: e,
                docId: t
            };
        }
        function E() {
            return {
                type: n.t.DISABLE_ON_TAB
            };
        }
        function C(e) {
            return {
                type: n.t.SHOW_DISABLE_REMINDER,
                domain: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.t = {
            SETTINGS_INITIAL: "settings/SETTINGS_INITIAL",
            TOGGLE_DEFS: "settings/TOGGLE_DEFS",
            TOGGLE_SITE: "settings/TOGGLE_SITE",
            TOGGLE_FIELD: "settings/TOGGLE_FIELD",
            TOGGLE_POPUP: "settings/TOGGLE_POPUP",
            DISABLE_ON_TAB: "settings/DISABLE_ON_TAB",
            SHOW_DISABLE_REMINDER: "settings/SHOW_DISABLE_REMINDER",
            SHOW_NEWS: "settings/SHOW_NEWS",
            SEEN_NEWS: "settings/SEEN_NEWS",
            SEEN_REFERRALS: "settings/SEEN_REFERRALS",
            CLICK_REFERRALS: "settings/CLICK_REFERRALS",
            SHOW_ONBOARDING: "settings/SHOW_ONBOARDING",
            SEEN_ONBOARDING: "settings/SEEN_ONBOARDING",
            SET_DAPI_PROP: "settings/SET_DAPI_PROP",
            CHANGE_WEAK_DIALECT: "settings/CHANGE_WEAK_DIALECT",
            CHANGE_STRONG_DIALECT: "settings/CHANGE_STRONG_DIALECT",
            SAVE_ANONYMOUS_PROPERTIES: "settings/SAVE_ANONYMOUS_PROPERTIES",
            ENABLE_EMAIL_FEEDBACK: "settings/ENABLE_EMAIL_FEEDBACK",
            SAVE_FEEDBACK_DATA: "settings/SAVE_FEEDBACK_DATA",
            SEEN_EMAIL_PERCEPTION_POPUP: "settings/EMAIL_PERCEPTION_POPUP_SEEN",
            SET_EMAIL_PERCEPTION_POPUP_STATE: "settings/SET_EMAIL_PERCEPTION_POPUP_STATE"
        }, n.DAPI_ACTIONS = [ n.t.CHANGE_WEAK_DIALECT, n.t.CHANGE_STRONG_DIALECT ], n.CACHED_ACTIONS = [ n.t.TOGGLE_DEFS, n.t.TOGGLE_SITE, n.t.TOGGLE_FIELD, n.t.SEEN_NEWS, n.t.SEEN_REFERRALS, n.t.CLICK_REFERRALS, n.t.SHOW_ONBOARDING, n.t.SEEN_ONBOARDING, n.t.SEEN_EMAIL_PERCEPTION_POPUP, n.t.SET_EMAIL_PERCEPTION_POPUP_STATE, n.t.SHOW_DISABLE_REMINDER ], 
        n.setDapiProp = r, n.changeWeakDialect = o, n.changeStrongDialect = i, n.initialSettings = a, 
        n.toggleDefs = s, n.toggleSite = c, n.toggleField = l, n.seenNews = u, n.showOnboarding = d, 
        n.seenOnboarding = f, n.showNews = p, n.seenReferrals = m, n.clickReferrals = h, 
        n.togglePopup = g, n.enableEmailFeedback = b, n.saveAnonymousProps = v, n.seenEmailPerceptionPopup = _, 
        n.disableEmailPerceptionPopup = y, n.enableEmailPerceptionPopup = w, n.saveFeedbackData = k, 
        n.disableOnTab = E, n.showDisableReminder = C;
    }, {} ],
    336: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], n = t.type, r = t.data, o = void 0 === r ? {} : r, i = t.domain, s = t.enabledDefs, d = t.enabled, f = t.showNews, p = t.isPopupDisabled, m = t.seenEmailPerceptionPopupDate, h = t.emailPerceptionPopupEnabled, g = t.propKey, b = e[i] || {};
            switch (n) {
              case u.t.SETTINGS_INITIAL:
                return (0, c["default"])({}, e, o);

              case u.t.TOGGLE_DEFS:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, {
                        enabledDefs: s
                    })
                });

              case u.t.TOGGLE_SITE:
                return (0, c["default"])({}, e, (0, a["default"])({}, i, (0, c["default"])({}, b, {
                    enabled: d,
                    disabledDate: d === !0 ? null : Date.now()
                })));

              case u.t.TOGGLE_FIELD:
                return (0, c["default"])({}, e, (0, a["default"])({}, i, (0, c["default"])({}, e[i], {
                    disabledFields: (0, c["default"])({}, b.disabledFields, o)
                })));

              case u.t.ENABLE_EMAIL_FEEDBACK:
                return (0, c["default"])({}, e, (0, a["default"])({}, i, (0, c["default"])({}, e[i], {
                    emailFeedbackEnabled: !0
                })));

              case u.t.SHOW_NEWS:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, {
                        showNews: f
                    })
                });

              case u.t.SHOW_ONBOARDING:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, {
                        showOnboarding: !0
                    })
                });

              case u.t.SEEN_ONBOARDING:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, {
                        showOnboarding: !1
                    })
                });

              case u.t.SEEN_EMAIL_PERCEPTION_POPUP:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, {
                        seenEmailPerceptionPopupDate: m
                    })
                });

              case u.t.SET_EMAIL_PERCEPTION_POPUP_STATE:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, {
                        emailPerceptionPopupEnabled: h
                    })
                });

              case u.t.SEEN_NEWS:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, {
                        seenNewsVersion: l.newsId
                    })
                });

              case u.t.TOGGLE_POPUP:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, {
                        isPopupDisabled: p
                    })
                });

              case u.t.SEEN_REFERRALS:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, {
                        referralNewsBadge: !0
                    })
                });

              case u.t.CLICK_REFERRALS:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, {
                        referralWasClicked: !0
                    })
                });

              case u.t.SET_DAPI_PROP:
                return (0, c["default"])({}, e, {
                    common: (0, c["default"])({}, e.common, (0, a["default"])({}, g, o))
                });

              case u.t.SHOW_DISABLE_REMINDER:
                return (0, c["default"])({}, e, (0, a["default"])({}, i, (0, c["default"])({}, b, {
                    disabledDate: Date.now()
                })));

              default:
                return e;
            }
        }
        var i = e("babel-runtime/helpers/defineProperty"), a = r(i), s = e("babel-runtime/core-js/object/assign"), c = r(s);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = e("lib/config"), u = e("./actions");
        n.settingsReducer = o;
    }, {
        "./actions": 335,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/helpers/defineProperty": 36,
        "lib/config": 211
    } ],
    337: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return {
                type: n.t.SET_ACTIVE_TAB,
                data: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.t = {
            SET_ACTIVE_TAB: "tabs/SET_ACTIVE_TAB"
        }, n.setActiveTab = r;
    }, {} ],
    338: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], n = t.type, r = t.data;
            switch (n) {
              case s.t.SET_ACTIVE_TAB:
                return (0, a["default"])({}, e, {
                    active: r
                });

              default:
                return e;
            }
        }
        var i = e("babel-runtime/core-js/object/assign"), a = r(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("./actions");
        n.tabsReducer = o;
    }, {
        "./actions": 337,
        "babel-runtime/core-js/object/assign": 24
    } ],
    339: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return {
                type: n.t.SET_USER,
                data: e
            };
        }
        function o(e) {
            return {
                type: n.t.SET_SETTINGS,
                data: e
            };
        }
        function i(e) {
            return {
                type: n.t.SESSION_INVALIDATE,
                reason: e
            };
        }
        function a() {
            return {
                type: n.t.INC_FIXED
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.t = {
            SET_USER: "user/SET_USER",
            SET_SETTINGS: "user/SET_SETTINGS",
            SESSION_INVALIDATE: "user/SESSION_INVALIDATE",
            INC_FIXED: "user/INC_FIXED"
        }, n.setUser = r, n.setSettings = o, n.sessionInvalidate = i, n.incFixed = a;
    }, {} ],
    340: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n.defaultUser, t = arguments[1], r = t.type, o = t.data, i = void 0 === o ? {} : o;
            switch (r) {
              case s.t.SET_USER:
                return i;

              case s.t.SET_SETTINGS:
                return (0, a["default"])({}, e, {
                    settings: i
                });

              case s.t.INC_FIXED:
                var c = e.fixed_errors + 1;
                return (0, a["default"])({}, e, {
                    fixed_errors: c
                });

              default:
                return e;
            }
        }
        var i = e("babel-runtime/core-js/object/assign"), a = r(i);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("./actions");
        n.defaultUser = {
            anonymous: !0,
            premium: !1
        }, n.userReducer = o;
    }, {
        "./actions": 339,
        "babel-runtime/core-js/object/assign": 24
    } ],
    341: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function o(e) {
            var t = f.combineReducers({
                user: g.userReducer,
                tabs: b.tabsReducer,
                settings: h.settingsReducer,
                connection: m.connectionReducer
            }), n = d({
                level: "debug",
                colors: {
                    title: function() {
                        return "green";
                    }
                }
            });
            return f.createStore(t, {}, f.applyMiddleware(e, n));
        }
        var i = e("babel-runtime/regenerator"), a = r(i), s = e("babel-runtime/helpers/createClass"), c = r(s), l = e("babel-runtime/helpers/classCallCheck"), u = r(l);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var d = e("redux-logger"), f = e("redux"), p = e("redux-saga"), m = e("./state/connection/reducer"), h = e("./state/settings/reducer"), g = e("./state/user/reducer"), b = e("./state/tabs/reducer"), v = e("lib/config"), _ = e("./state/actions"), y = e("./state/actions");
        n.pureActions = y.pureActions;
        var w = e("redux-saga/effects"), k = e("lib/page-config"), E = function x(e, t) {
            var n = this;
            (0, u["default"])(this, x), this._store = e, this._userSagas = t, this.refreshUser = function() {
                for (var e, t = arguments.length, r = Array(t), o = 0; o < t; o++) r[o] = arguments[o];
                return (e = n._store).runSaga.apply(e, [ n._userSagas.externalUpdateUser.bind(n._userSagas) ].concat(r)).done;
            }, this.signin = function(e) {
                return n._store.runSaga(n._userSagas.authRequest.bind(n._userSagas), v.URLS.authSignin, e, "app_signin_success").done;
            }, this.signup = function(e) {
                return n._store.runSaga(n._userSagas.authRequest.bind(n._userSagas), v.URLS.authSignup, e, "app_signup_success").done;
            };
        };
        n.AuthSagaRunners = E;
        var C = function() {
            function e(t, n, r, i) {
                var a = this;
                (0, u["default"])(this, e), this._userSagas = t, this._settingsSagas = n, this._tabsSagas = r, 
                this._connectionSagas = i;
                var s = p["default"](t.start.bind(t), n.start.bind(n), i.start.bind(i));
                this.store = o(s), this.runSaga = s.run, this.initStore = function() {
                    return s.run(a._startupFlow.bind(a)).done.then(function() {
                        a.store.subscribe(function() {
                            return s.run(r.sendStateToTabs.bind(r));
                        });
                    });
                }, this.actions = f.bindActionCreators(_.pureActions, this.store.dispatch);
            }
            return (0, c["default"])(e, [ {
                key: "_startupFlow",
                value: a["default"].mark(function t() {
                    return a["default"].wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.next = 2, [ w.call([ this._settingsSagas, this._settingsSagas.setInitialSettings ]), w.call([ k.pageConfig, k.pageConfig.init ]), w.call([ this._userSagas, this._userSagas.updateUser ], {
                                failoverFromCache: !0
                            }) ];

                          case 2:
                            return e.next = 4, w.fork([ this._connectionSagas, this._connectionSagas.monitorIsIncognito ]);

                          case 4:
                            return e.next = 6, w.call([ this._tabsSagas, this._tabsSagas.start ]);

                          case 6:
                          case "end":
                            return e.stop();
                        }
                    }, t, this);
                })
            } ]), e;
        }();
        n.StoreControllerImpl = C;
    }, {
        "./state/actions": 332,
        "./state/connection/reducer": 334,
        "./state/settings/reducer": 336,
        "./state/tabs/reducer": 338,
        "./state/user/reducer": 340,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/createClass": 35,
        "babel-runtime/regenerator": 43,
        "lib/config": 211,
        "lib/page-config": 284,
        redux: "redux",
        "redux-logger": "redux-logger",
        "redux-saga": "redux-saga",
        "redux-saga/effects": 159
    } ],
    342: [ function(e, t, n) {
        "use strict";
        e("index");
    }, {
        index: 185
    } ],
    343: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/assign"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("universal/shared/socket"), l = e("lib/util"), u = e("emitter"), d = e("./socket"), f = function p(e, t) {
            var n = this;
            (0, s["default"])(this, p), this._logger = e, this._message = t, this._sockets = {}, 
            this.createSocket = function(e) {
                var t = e.socketId || l.guid(), r = {
                    socketId: t,
                    useStandBy: e.useStandBy,
                    url: e.url
                }, o = function() {};
                n._sockets[t] || (n._sockets[t] = new d.ContentScriptSocket(t, function(e, t) {
                    n._message.emitBackground(c.MessageTypes.client, (0, i["default"])({}, r, {
                        method: e,
                        arg: t
                    })), "close" === e && o();
                }));
                var a = n._sockets[t];
                return a.one("disconnect", o), a.one("cleanup-socket-on-editor-remove", function() {
                    delete n._sockets[t];
                }), a.on("error", n._onError), a;
            }, this._onError = function(e) {
                if ("disconnected" !== e) {
                    var t = {};
                    "string" == typeof e ? t.msg = e : e.error && (t.readyState = e.error.currentTarget && e.error.currentTarget.readyState, 
                    t.returnValue = e.error.returnValue), n._logger.socketCsError(), console.error("capi error", e), 
                    window.emit || u(window), window.emit("bgerror", e || "when send message to the socket");
                }
            }, this._onMessage = function(e, t) {
                var r = n._sockets[e.socketId];
                if (r) {
                    var o = e.msg || {};
                    o.action && "error" === o.action.toLowerCase() && n._logger.soketCsErrorMsg(o), 
                    t("ok"), r.emit(e.event, e.msg);
                }
            }, t.on(c.MessageTypes.server, this._onMessage);
        };
        n.ContentScriptSocketManager = f;
    }, {
        "./socket": 344,
        "babel-runtime/core-js/object/assign": 24,
        "babel-runtime/helpers/classCallCheck": 34,
        emitter: "emitter",
        "lib/util": 322,
        "universal/shared/socket": 345
    } ],
    344: [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        var o = e("babel-runtime/core-js/object/get-prototype-of"), i = r(o), a = e("babel-runtime/helpers/classCallCheck"), s = r(a), c = e("babel-runtime/helpers/possibleConstructorReturn"), l = r(c), u = e("babel-runtime/helpers/inherits"), d = r(u);
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var f = e("stdlib/emitter"), p = function(e) {
            function t(e, n) {
                (0, s["default"])(this, t);
                var r = (0, l["default"])(this, (t.__proto__ || (0, i["default"])(t)).call(this));
                return r.socketId = e, r._send = n, r.send = function(e) {
                    return r._send("send", e);
                }, r.close = function() {
                    return r._send("close");
                }, r.connect = function(e) {
                    return r._send("connect", e);
                }, r.reconnect = function(e) {
                    return r._send("reconnect", e);
                }, r.release = function() {
                    return r._send("release");
                }, r.wsPlay = function() {
                    return r._send("wsPlay");
                }, r.wsPause = function() {
                    return r._send("wsPause");
                }, r.toString = function() {
                    return "[object SocketClient]";
                }, r;
            }
            return (0, d["default"])(t, e), t;
        }(f.Emitter);
        n.ContentScriptSocket = p;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 28,
        "babel-runtime/helpers/classCallCheck": 34,
        "babel-runtime/helpers/inherits": 38,
        "babel-runtime/helpers/possibleConstructorReturn": 39,
        "stdlib/emitter": 327
    } ],
    345: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.MessageTypes = {
            server: "socket-server",
            client: "socket-client",
            serverIframe: "socket-server-iframe",
            iframeMode: "iframe-mode"
        };
    }, {} ]
}, {}, [ 165 ]);