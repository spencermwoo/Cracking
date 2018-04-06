!function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
    return s;
}({
    1: [ function(require, module, exports) {
        "use strict";
        function cookie(name, value, options) {
            return arguments.length < 2 ? get(name) : void set(name, value, options);
        }
        function set(name, value) {
            var options = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], str = encode(name) + "=" + encode(value);
            null == value && (options.maxage = -1), options.maxage && (options.expires = new Date(+new Date() + options.maxage)), 
            options.path && (str += "; path=" + options.path), options.domain && (str += "; domain=" + options.domain), 
            options.expires && (str += "; expires=" + options.expires.toUTCString()), options.secure && (str += "; secure"), 
            document.cookie = str;
        }
        function get(name) {
            var cookies = parse(document.cookie);
            return name ? cookies[name] : cookies;
        }
        function parse(str) {
            var obj = {}, pairs = str.split(/ *; */);
            if (!pairs[0]) return obj;
            for (var _iterator = pairs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var pair = _ref;
                pair = pair.split("="), obj[decode(pair[0])] = decode(pair[1]);
            }
            return obj;
        }
        function encode(value) {
            try {
                return encodeURIComponent(value);
            } catch (e) {
                return null;
            }
        }
        function decode(value) {
            try {
                return decodeURIComponent(value);
            } catch (e) {
                return null;
            }
        }
        exports.__esModule = !0, exports["default"] = cookie;
    }, {} ],
    2: [ function(require, module, exports) {
        "use strict";
        function success(value) {
            return {
                type: "success",
                value: value
            };
        }
        function failure(error) {
            return {
                type: "failure",
                error: error
            };
        }
        function lift(promise) {
            return promise.then(success, failure);
        }
        function retry(times, backoffMillis, f) {
            var res = f();
            return times > 0 ? res["catch"](function(_) {
                return new Promise(function(resolve, _) {
                    return setTimeout(resolve, backoffMillis);
                }).then(function(_) {
                    return retry(times - 1, backoffMillis, f);
                });
            }) : res;
        }
        var __extends = this && this.__extends || function() {
            var extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return function(d, b) {
                function __() {
                    this.constructor = d;
                }
                extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
                new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var cookie_1 = require("@grammarly-npm/cookie"), util_1 = require("./util"), storageKeyName = "gnar_containerId", storageTestKeyName = "gnar_containerId_test", containerIdLength = 12, cookieExpiration = function() {
            return new Date().setFullYear(new Date().getFullYear() + 10);
        }, testCookieExpiration = function() {
            return new Date().setMinutes(new Date().getMinutes() + 10);
        }, cookieDomainRegExp = /^\.\w+\.\w+/, ContainerIdManager = function() {
            function ContainerIdManager(primaryStorage, secondaryStorages, _logger, _metric, _cacheSuccessTimeoutMillis, _cacheFailureTimeoutMillis, _getTime) {
                void 0 === secondaryStorages && (secondaryStorages = []), void 0 === _cacheSuccessTimeoutMillis && (_cacheSuccessTimeoutMillis = 3e5), 
                void 0 === _cacheFailureTimeoutMillis && (_cacheFailureTimeoutMillis = 0), void 0 === _getTime && (_getTime = function() {
                    return Date.now();
                }), this.primaryStorage = primaryStorage, this.secondaryStorages = secondaryStorages, 
                this._logger = _logger, this._metric = _metric, this._cacheSuccessTimeoutMillis = _cacheSuccessTimeoutMillis, 
                this._cacheFailureTimeoutMillis = _cacheFailureTimeoutMillis, this._getTime = _getTime, 
                this._allStorages = [ primaryStorage ].concat(secondaryStorages);
            }
            return ContainerIdManager.prototype._expireCache = function(timeoutMillis) {
                0 === timeoutMillis ? this._cacheExpireTimestamp = 0 : timeoutMillis > 0 && (this._cacheExpireTimestamp = this._getTime() + timeoutMillis);
            }, ContainerIdManager.prototype.getContainerId = function() {
                var _this = this;
                if (void 0 !== this._cache && (void 0 === this._cacheExpireTimestamp || this._getTime() < this._cacheExpireTimestamp)) return this._cache;
                var timer = this._metric.getTimer("doGetContainerId.timer").start(), result = this._doGetContainerId();
                return this._cache = result, this._cacheExpireTimestamp = void 0, result.then(function(_) {
                    return _this._expireCache(_this._cacheSuccessTimeoutMillis);
                }, function(_) {
                    return _this._expireCache(_this._cacheFailureTimeoutMillis);
                }), result.then(function(_) {
                    timer.stop(), _this._metric.getCounter("doGetContainerId.success").increment();
                }, function(error) {
                    timer.stop(), _this._metric.getCounter("doGetContainerId.failure").increment(), 
                    _this._logger.warn("doGetContainerId.failed", error);
                }), result;
            }, ContainerIdManager._generateContainerId = function() {
                return util_1.alphanumeric(containerIdLength);
            }, ContainerIdManager.prototype._doGetContainerId = function() {
                var _this = this, lifted = Promise.all(this._allStorages.map(function(storage) {
                    return lift(storage.safeGetContainerId());
                }));
                return lifted.then(function(getResults) {
                    var primaryGetResult = getResults[0];
                    if ("failure" === primaryGetResult.type) return Promise.reject("getting containerId from primary storage " + ("'" + _this.primaryStorage.name + "' has failed: " + primaryGetResult.error));
                    var containerId, nonEmptyResult = getResults.find(function(result) {
                        return "success" === result.type && void 0 !== result.value;
                    }), recovered = "success" === primaryGetResult.type && void 0 === primaryGetResult.value && void 0 !== nonEmptyResult, generated = !1;
                    void 0 === nonEmptyResult ? (containerId = ContainerIdManager._generateContainerId(), 
                    generated = !0) : containerId = nonEmptyResult.value;
                    var setPromises = getResults.map(function(result, index) {
                        return "success" === result.type && result.value !== containerId ? lift(_this._allStorages[index].safeSetContainerId(containerId)) : Promise.resolve(success(void 0));
                    }), result = Promise.all(setPromises).then(function(setResults) {
                        if (recovered || generated) {
                            var primarySetResult = setResults[0];
                            if ("success" !== primarySetResult.type) return Promise.reject("setting containerId to primary storage has failed: " + primarySetResult.error);
                        }
                        return Promise.resolve(containerId);
                    });
                    return result.then(function(_) {
                        recovered ? _this._metric.getCounter("recovered").increment() : generated && _this._metric.getCounter("generated").increment();
                    }), result;
                });
            }, ContainerIdManager;
        }();
        exports.ContainerIdManager = ContainerIdManager;
        var BaseStorage = function() {
            function BaseStorage(name) {
                this.name = name;
            }
            return BaseStorage.prototype.safeSetContainerId = function(containerId) {
                var _this = this;
                return this.ensureAvailable().then(function() {
                    return _this.setContainerId(containerId);
                });
            }, BaseStorage.prototype.safeGetContainerId = function() {
                var _this = this;
                return this.ensureAvailable().then(function() {
                    return _this.getContainerId();
                }).then(function(cid) {
                    return "" === cid ? void 0 : cid;
                });
            }, BaseStorage;
        }();
        exports.BaseStorage = BaseStorage;
        var ChromeCookieStorage = function(_super) {
            function ChromeCookieStorage(_url, _domain) {
                var _this = _super.call(this, "chromeCookie") || this;
                if (_this._url = _url, _this._domain = _domain, !cookieDomainRegExp.test(_domain)) throw new Error('Incorrect cookie domain provided.\n        Use top-level domain, starting from "."');
                return _this;
            }
            return __extends(ChromeCookieStorage, _super), ChromeCookieStorage.prototype._hasRuntimeError = function() {
                return window.chrome && window.chrome.runtime && window.chrome.runtime.lastError;
            }, ChromeCookieStorage.prototype.ensureAvailable = function() {
                var _this = this;
                return retry(2, 1e3, function() {
                    return new Promise(function(resolve, reject) {
                        var value = util_1.alphanumeric(10);
                        try {
                            window.chrome.cookies.set({
                                name: value,
                                value: value,
                                url: _this._url,
                                domain: _this._domain,
                                expirationDate: testCookieExpiration() / 1e3
                            }, function(cookie) {
                                var error = _this._hasRuntimeError();
                                !cookie && error && reject("chrome.cookie.set failed with an error: " + error.message), 
                                cookie && cookie.value === value ? resolve() : reject(new Error("ChromeCookieStorage is unavailable.\n              Availability test failed.\n              Tried to set " + value + ", the result is " + (cookie ? cookie.value : cookie) + "."));
                            });
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            }, ChromeCookieStorage.prototype.getContainerId = function() {
                var _this = this;
                return new Promise(function(resolve, reject) {
                    try {
                        window.chrome.cookies.get({
                            url: _this._url,
                            name: storageKeyName
                        }, function(cookie) {
                            var error = _this._hasRuntimeError();
                            !cookie && error && reject("chrome.cookie.get failed with an error: " + error.message), 
                            resolve(cookie ? cookie.value : void 0);
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
            }, ChromeCookieStorage.prototype.setContainerId = function(containerId) {
                var _this = this;
                return new Promise(function(resolve, reject) {
                    try {
                        window.chrome.cookies.set({
                            name: storageKeyName,
                            value: containerId,
                            url: _this._url,
                            domain: _this._domain,
                            expirationDate: cookieExpiration() / 1e3
                        }, function(cookie) {
                            var error = _this._hasRuntimeError();
                            !cookie && error && reject("chrome.cookie.set failed with an error: " + error.message), 
                            cookie && cookie.value === containerId || reject(new Error("setContainerId failed.\n            Tried to set " + containerId + ", the result is " + (cookie ? cookie.value : cookie) + ".")), 
                            resolve();
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
            }, ChromeCookieStorage;
        }(BaseStorage);
        exports.ChromeCookieStorage = ChromeCookieStorage;
        var WebExtensionsCookieStorage = function(_super) {
            function WebExtensionsCookieStorage(_url, _domain) {
                var _this = _super.call(this, "webExtensionsCookie") || this;
                if (_this._url = _url, _this._domain = _domain, !cookieDomainRegExp.test(_domain)) throw new Error('Incorrect cookie domain provided.\n        Use top-level domain, starting from "."');
                return _this;
            }
            return __extends(WebExtensionsCookieStorage, _super), WebExtensionsCookieStorage.prototype.ensureAvailable = function() {
                var _this = this;
                return retry(2, 1e3, function() {
                    return new Promise(function(resolve, reject) {
                        var value = util_1.alphanumeric(10);
                        window.browser.cookies.set({
                            name: value,
                            value: value,
                            url: _this._url,
                            domain: _this._domain,
                            expirationDate: testCookieExpiration() / 1e3
                        }).then(function() {
                            window.browser.cookies.get({
                                url: _this._url,
                                name: value
                            }).then(function(cookie) {
                                cookie && cookie.value === value ? resolve() : reject(new Error("WebExtensionsCookieStorage is unavailable.\n              Availability test failed.\n              Tried to set " + value + ", the result is " + (cookie ? cookie.value : cookie) + "."));
                            })["catch"](function(error) {
                                reject("browser.cookies.get failed with an error: " + error.message);
                            });
                        })["catch"](function(error) {
                            reject("browser.cookies.set failed with an error: " + error.message);
                        });
                    });
                });
            }, WebExtensionsCookieStorage.prototype.getContainerId = function() {
                var _this = this;
                return new Promise(function(resolve, reject) {
                    window.browser.cookies.get({
                        url: _this._url,
                        name: storageKeyName
                    }).then(function(cookie) {
                        resolve(cookie ? cookie.value : void 0);
                    })["catch"](function(error) {
                        reject("browser.cookies.get failed with an error: " + error.message);
                    });
                });
            }, WebExtensionsCookieStorage.prototype.setContainerId = function(containerId) {
                var _this = this;
                return new Promise(function(resolve, reject) {
                    window.browser.cookies.set({
                        name: storageKeyName,
                        value: containerId,
                        url: _this._url,
                        domain: _this._domain,
                        expirationDate: cookieExpiration() / 1e3
                    }).then(function(cookie) {
                        cookie && cookie.value === containerId || reject(new Error("setContainerId failed.\n          Tried to set " + containerId + ", the result is " + (cookie ? cookie.value : cookie) + ".")), 
                        resolve();
                    })["catch"](function(error) {
                        reject("browser.cookies.set failed with an error: " + error.message);
                    });
                });
            }, WebExtensionsCookieStorage;
        }(BaseStorage);
        exports.WebExtensionsCookieStorage = WebExtensionsCookieStorage;
        var LocalStorage = function(_super) {
            function LocalStorage() {
                return _super.call(this, "localStorage") || this;
            }
            return __extends(LocalStorage, _super), LocalStorage.prototype.ensureAvailable = function() {
                var value = util_1.alphanumeric(10);
                return new Promise(function(resolve, reject) {
                    localStorage.setItem(storageTestKeyName, value), localStorage.getItem(storageTestKeyName) !== value ? reject(new Error("LocalStorage is unavailable.\n          Availability test failed.\n          Tried to set " + value + ", the result is " + localStorage.getItem(storageTestKeyName) + ".")) : resolve(), 
                    localStorage.removeItem(storageTestKeyName);
                });
            }, LocalStorage.prototype.getContainerId = function() {
                var value = localStorage.getItem(storageKeyName);
                return new Promise(function(resolve, _) {
                    return resolve(null === value ? void 0 : value);
                });
            }, LocalStorage.prototype.setContainerId = function(containerId) {
                return new Promise(function(resolve, _) {
                    localStorage.setItem(storageKeyName, containerId), resolve();
                });
            }, LocalStorage;
        }(BaseStorage);
        exports.LocalStorage = LocalStorage;
        var CookieStorage = function(_super) {
            function CookieStorage(_domain) {
                var _this = _super.call(this, "cookie") || this;
                if (_this._domain = _domain, !cookieDomainRegExp.test(_domain)) throw new Error('Incorrect cookie domain provided.\n        Use top-level domain, starting from "."');
                return _this;
            }
            return __extends(CookieStorage, _super), CookieStorage.prototype._getCookieOptions = function() {
                return {
                    path: "/",
                    domain: this._domain,
                    expires: new Date(cookieExpiration())
                };
            }, CookieStorage.prototype.ensureAvailable = function() {
                var value = util_1.alphanumeric(10);
                return new Promise(function(resolve, reject) {
                    cookie_1["default"](value, value), cookie_1["default"](value) !== value ? reject(new Error("CookieStorage is unavailable.\n          Availability test failed.\n          Tried to set " + value + ", the result is " + cookie_1["default"](value) + ".")) : resolve(), 
                    cookie_1["default"](value, null);
                });
            }, CookieStorage.prototype.getContainerId = function() {
                return new Promise(function(resolve, _) {
                    return resolve(cookie_1["default"](storageKeyName));
                });
            }, CookieStorage.prototype.setContainerId = function(containerId) {
                var _this = this;
                return new Promise(function(resolve, _) {
                    cookie_1["default"](storageKeyName, containerId, _this._getCookieOptions()), resolve();
                });
            }, CookieStorage;
        }(BaseStorage);
        exports.CookieStorage = CookieStorage;
        var BackendStorage = function(_super) {
            function BackendStorage(_fetch, _url) {
                var _this = _super.call(this, "backend") || this;
                return _this._fetch = _fetch, _this._url = _url, _this._keyName = storageKeyName, 
                _this._testKeyName = storageTestKeyName, _this._baseUrl = _url + "/cookies", _this;
            }
            return __extends(BackendStorage, _super), BackendStorage.prototype.ensureAvailable = function() {
                var _this = this, value = util_1.alphanumeric(10), maxAge = (testCookieExpiration() - Date.now()) / 1e3, getUrl = this._baseUrl + "?name=" + this._testKeyName, postUrl = getUrl + "&value=" + value + "&maxAge=" + maxAge;
                return this._doSend(postUrl, "post").then(function(response) {
                    if (!response.ok) throw new Error("BackendStorage is unavailable.\n          Availability test failed.\n          Tried to set " + value + ". Request failed.\n        ");
                }).then(function() {
                    return _this._doSend(getUrl, "get").then(function(response) {
                        if (response.ok) return response.json().then(function(obj) {
                            if (obj.value !== value) throw new Error("BackendStorage is unavailable.\n                Availability test failed.\n                Tried to get " + _this._testKeyName + " from server.\n                Got " + obj.value + " instead of " + value + ".");
                        });
                        throw new Error("BackendStorage is unavailable.\n            Availability test failed.\n            Tried to get " + _this._testKeyName + " from server. Request failed.");
                    });
                });
            }, BackendStorage.prototype._doSend = function(url, method) {
                return this._fetch(url, {
                    credentials: "include",
                    method: method
                });
            }, BackendStorage.prototype.getContainerId = function() {
                var url = this._baseUrl + "?name=" + this._keyName;
                return this._doSend(url, "get").then(function(response) {
                    return response.json();
                }).then(function(obj) {
                    return obj.value;
                });
            }, BackendStorage.prototype.setContainerId = function(containerId) {
                var maxAge = (cookieExpiration() - Date.now()) / 1e3, url = this._baseUrl + "?name=" + this._keyName + "&value=" + containerId + "&maxAge=" + maxAge;
                return this._doSend(url, "post").then(function() {});
            }, BackendStorage;
        }(BaseStorage);
        exports.BackendStorage = BackendStorage;
        var MemoryStorage = function(_super) {
            function MemoryStorage(_value) {
                void 0 === _value && (_value = void 0);
                var _this = _super.call(this, "memory") || this;
                return _this._value = _value, _this;
            }
            return __extends(MemoryStorage, _super), MemoryStorage.prototype.ensureAvailable = function() {
                return Promise.resolve();
            }, MemoryStorage.prototype.getContainerId = function() {
                return Promise.resolve(this._value);
            }, MemoryStorage.prototype.setContainerId = function(containerId) {
                return this._value = containerId, Promise.resolve();
            }, MemoryStorage;
        }(BaseStorage);
        exports.MemoryStorage = MemoryStorage;
    }, {
        "./util": 4,
        "@grammarly-npm/cookie": 1
    } ],
    3: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var util_1 = require("./util"), container_id_manager_1 = require("./container_id_manager");
        exports.ContainerIdManager = container_id_manager_1.ContainerIdManager, exports.BaseStorage = container_id_manager_1.BaseStorage, 
        exports.MemoryStorage = container_id_manager_1.MemoryStorage, exports.LocalStorage = container_id_manager_1.LocalStorage, 
        exports.CookieStorage = container_id_manager_1.CookieStorage, exports.ChromeCookieStorage = container_id_manager_1.ChromeCookieStorage, 
        exports.WebExtensionsCookieStorage = container_id_manager_1.WebExtensionsCookieStorage, 
        exports.BackendStorage = container_id_manager_1.BackendStorage;
        var reservedPropNames = [ "eventName", "client", "clientVersion", "userId", "isTest", "containerId", "instanceId", "batchId" ], localStoragePingKeyName = "gnar_nextPingTimestamp", GnarClientImpl = function() {
            function GnarClientImpl(_url, _client, _clientVersion, _fetch, _containerIdManager, _logger, _metric, _storePingTimestamp) {
                void 0 === _storePingTimestamp && (_storePingTimestamp = !1), this._client = _client, 
                this._clientVersion = _clientVersion, this._fetch = _fetch, this._containerIdManager = _containerIdManager, 
                this._logger = _logger, this._metric = _metric, this._storePingTimestamp = _storePingTimestamp, 
                this._batchId = 0, this._instanceId = util_1.alphanumeric(8), this._isReady = !1, 
                this._queue = [], this._eventsUrl = _url + "/events", this._pingMaybe();
            }
            return GnarClientImpl.prototype.track = function(eventName, props) {
                if (void 0 === props && (props = {}), 0 === eventName.indexOf(this._client + "/")) throw new Error("Event name " + eventName + " should not start with '" + this._client + "/'");
                Object.keys(props).forEach(function(key) {
                    if (reservedPropNames.indexOf(key) !== -1) throw new Error("Event data should not contain '" + key + "' prop.");
                }), this._isReady ? ("ping" !== eventName && this._pingMaybe(), this._send(eventName, props)) : this._enqueue(eventName, props);
            }, GnarClientImpl.prototype.setUser = function(id, isTest) {
                if (null === id || "" === id) throw new Error("Invalid userId: " + id);
                var shouldSendPing = this._userId && this._userId !== id && !(/^-/.test(id) && /^-/.test(this._userId));
                this._isTest = isTest, this._userId = id, shouldSendPing && this._pingMaybe(!0), 
                this._isReady || (this._execQueue(), this._isReady = !0);
            }, GnarClientImpl.prototype.getContainerId = function() {
                return this._containerIdManager.getContainerId();
            }, GnarClientImpl.prototype._setNextPingTimestamp = function() {
                var ts = util_1.getNextPingDate();
                if (this._nextPingTimestamp = ts, this._storePingTimestamp) try {
                    localStorage.setItem(localStoragePingKeyName, ts.toString());
                } catch (error) {
                    this._metric.getCounter("nextPingDate.write.failure").increment(), this._logger.warn("nextPingDate.write.failed", error);
                }
            }, GnarClientImpl.prototype._getNextPingTimestamp = function() {
                var ts = this._nextPingTimestamp;
                if (void 0 !== ts || !this._storePingTimestamp) return ts;
                try {
                    var stored = localStorage.getItem(localStoragePingKeyName);
                    ts = null === stored ? void 0 : parseInt(stored, 10);
                } catch (error) {
                    ts = void 0, this._metric.getCounter("nextPingDate.read.failure").increment(), this._logger.warn("nextPingDate.read.failed", error);
                }
                return ts;
            }, GnarClientImpl.prototype._shouldPing = function(force) {
                if (force) return !0;
                var ts = this._getNextPingTimestamp();
                return void 0 === ts || ts < Date.now();
            }, GnarClientImpl.prototype._pingMaybe = function(force) {
                if (void 0 === force && (force = !1), this._shouldPing(force)) {
                    this._setNextPingTimestamp();
                    var props = {
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
                    this.track("ping", props);
                }
            }, GnarClientImpl.prototype.pingMaybe = function() {
                this._pingMaybe();
            }, GnarClientImpl.prototype._enqueue = function(eventName, props) {
                this._queue.push([ eventName, props ]);
            }, GnarClientImpl.prototype._execQueue = function() {
                var _this = this;
                this._queue.forEach(function(_a) {
                    var eventName = _a[0], data = _a[1];
                    return _this._send(eventName, data);
                }), this._queue = [];
            }, GnarClientImpl.prototype._send = function(eventName, props) {
                var _this = this, batchId = this._batchId++;
                this.getContainerId().then(function(containerId) {
                    var event = {
                        eventName: _this._client + "/" + eventName,
                        client: _this._client,
                        clientVersion: _this._clientVersion,
                        userId: _this._userId,
                        isTest: _this._isTest,
                        containerId: containerId,
                        instanceId: _this._instanceId,
                        batchId: batchId
                    };
                    return _this._doSend(event, props);
                })["catch"](function(error) {
                    _this._metric.getCounter("send.failure").increment(), _this._logger.warn("send.failed", error);
                });
            }, GnarClientImpl.prototype._doSend = function(data, props) {
                return this._fetch(this._eventsUrl, {
                    mode: "cors",
                    credentials: "include",
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        events: [ Object.assign(data, props) ]
                    })
                });
            }, GnarClientImpl;
        }();
        exports.GnarClientImpl = GnarClientImpl;
        var MemoryGnarClient = function() {
            function MemoryGnarClient() {
                this.history = [];
            }
            return MemoryGnarClient.prototype.track = function(eventName, props) {
                void 0 === props && (props = {}), this.history.push({
                    eventName: eventName,
                    props: props
                });
            }, MemoryGnarClient.prototype.pingMaybe = function() {}, MemoryGnarClient.prototype.setUser = function(_, __) {}, 
            MemoryGnarClient.prototype.getContainerId = function() {
                return Promise.resolve("dummy_container_id");
            }, MemoryGnarClient;
        }();
        exports.MemoryGnarClient = MemoryGnarClient;
        var LocalStorageGnarClient = function() {
            function LocalStorageGnarClient() {}
            return LocalStorageGnarClient.prototype.track = function(eventName, props) {
                void 0 === props && (props = {});
                var storageKey = "trackingGnar";
                try {
                    var data = JSON.parse(localStorage.getItem(storageKey)) || [];
                    data.push({
                        eventName: eventName,
                        props: props
                    }), localStorage.setItem(storageKey, JSON.stringify(data));
                } catch (error) {}
            }, LocalStorageGnarClient.prototype.pingMaybe = function() {}, LocalStorageGnarClient.prototype.setUser = function(_, __) {}, 
            LocalStorageGnarClient.prototype.getContainerId = function() {
                return Promise.resolve("dummy_container_id");
            }, LocalStorageGnarClient;
        }();
        exports.LocalStorageGnarClient = LocalStorageGnarClient;
    }, {
        "./container_id_manager": 2,
        "./util": 4
    } ],
    4: [ function(require, module, exports) {
        "use strict";
        function alphanumeric(num, res) {
            if (void 0 === res && (res = ""), num <= 0) return res;
            var random = Math.floor(Math.random() * (allowed.length - 1));
            return alphanumeric(num - 1, res + allowed.charAt(random));
        }
        function getNextPingDate() {
            var now = new Date();
            return now.getHours() > 2 && now.setDate(now.getDate() + 1), now.setHours(3), now.setMinutes(Math.floor(60 * Math.random())), 
            now.getTime();
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        exports.alphanumeric = alphanumeric, exports.getNextPingDate = getNextPingDate;
    }, {} ],
    5: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var ring_buffer_1 = require("./ring_buffer"), CrashLogWrapper = function() {
            function CrashLogWrapper(cacheSize, trigger, _eventsSink, _crashLogger) {
                var _this = this;
                this._eventsSink = _eventsSink, this._crashLogger = _crashLogger, this._crashLogged = !1, 
                this.sink = function(event) {
                    _this._buffer.push(event), _this._eventsSink(event), _this._trigger(event) && _this._sendCrashLog(event);
                }, this._buffer = new ring_buffer_1.RingBuffer(cacheSize, (!0)), this._trigger = "function" == typeof trigger ? trigger : function(event) {
                    return event.level >= trigger;
                };
            }
            return CrashLogWrapper.prototype._sendCrashLog = function(triggeredBy) {
                if (!this._crashLogged || this._buffer.size > this._buffer.capacity / 2) {
                    var crashLog = void 0;
                    try {
                        crashLog = JSON.stringify(this._buffer, void 0, "");
                    } catch (err) {
                        crashLog = err;
                    }
                    this._crashLogger.log(triggeredBy.level, "CrashLog", {
                        events: crashLog,
                        first: !this._crashLogged
                    }), this._crashLogged = !0, this._buffer.clear();
                }
            }, CrashLogWrapper;
        }();
        exports.CrashLogWrapper = CrashLogWrapper;
    }, {
        "./ring_buffer": 9
    } ],
    6: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var Logging = require("./log4ts");
        exports.Logging = Logging;
        var LoggingImpl = require("./log4ts_impl");
        exports.LoggingImpl = LoggingImpl;
        var TimeSeries = require("./timeseries");
        exports.TimeSeries = TimeSeries;
        var TimeSeriesImpl = require("./timeseries_impl");
        exports.TimeSeriesImpl = TimeSeriesImpl;
        var utils_1 = require("./utils");
        exports.EventProps = utils_1.EventProps;
        var Monitoring;
        !function(Monitoring) {
            var Logging = function() {
                function Logging() {}
                return Object.defineProperty(Logging, "root", {
                    get: function() {
                        return LoggingImpl.LoggingConfig.getRootLogger();
                    },
                    enumerable: !0,
                    configurable: !0
                }), Logging.getLogger = function(name, level) {
                    return Logging.root.getLogger(name, level);
                }, Logging;
            }();
            Monitoring.Logging = Logging;
            var TimeSeries = function() {
                function TimeSeries() {}
                return Object.defineProperty(TimeSeries, "root", {
                    get: function() {
                        return TimeSeriesImpl.MetricsConfig.getRootMetric();
                    },
                    enumerable: !0,
                    configurable: !0
                }), TimeSeries;
            }();
            Monitoring.TimeSeries = TimeSeries;
        }(Monitoring = exports.Monitoring || (exports.Monitoring = {}));
    }, {
        "./log4ts": 7,
        "./log4ts_impl": 8,
        "./timeseries": 10,
        "./timeseries_impl": 11,
        "./utils": 12
    } ],
    7: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var LogLevel;
        !function(LogLevel) {
            LogLevel[LogLevel.TRACE = 0] = "TRACE", LogLevel[LogLevel.DEBUG = 1] = "DEBUG", 
            LogLevel[LogLevel.INFO = 2] = "INFO", LogLevel[LogLevel.WARN = 3] = "WARN", LogLevel[LogLevel.ERROR = 4] = "ERROR", 
            LogLevel[LogLevel.FATAL = 5] = "FATAL", LogLevel[LogLevel.OFF = 6] = "OFF";
        }(LogLevel = exports.LogLevel || (exports.LogLevel = {})), function(LogLevel) {
            function fromString(levelString) {
                switch (levelString) {
                  case "TRACE":
                    return LogLevel.TRACE;

                  case "DEBUG":
                    return LogLevel.DEBUG;

                  case "INFO":
                    return LogLevel.INFO;

                  case "WARN":
                    return LogLevel.WARN;

                  case "ERROR":
                    return LogLevel.ERROR;

                  case "FATAL":
                    return LogLevel.FATAL;

                  case "OFF":
                    return LogLevel.OFF;

                  default:
                    ;
                    throw new TypeError("Unrecognized log level string '" + levelString + "'");
                }
            }
            LogLevel.fromString = fromString;
        }(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
    }, {} ],
    8: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var tslib_1 = require("tslib"), utils_1 = require("./utils"), log4ts_1 = require("./log4ts"), utils_2 = require("./utils"), crash_logger_1 = require("./crash_logger"), ring_buffer_1 = require("./ring_buffer"), TreeContext = function() {
            function TreeContext(parent) {
                this.parent = parent, this.context = void 0;
            }
            return TreeContext.prototype.get = function() {
                var parentContext = this.parent && this.parent.get(), context = this.context;
                return parentContext || context ? Object.assign({}, parentContext, context) : void 0;
            }, TreeContext.prototype.add = function(ctx) {
                this.context = Object.assign({}, this.context, ctx);
            }, TreeContext.prototype.remove = function(keys) {
                var _this = this;
                this.context && keys.forEach(function(k) {
                    k in _this.context && delete _this.context[k];
                });
            }, TreeContext.prototype.clear = function() {
                this.context = void 0;
            }, TreeContext;
        }();
        exports.TreeContext = TreeContext;
        var AbstractLogger = function() {
            function AbstractLogger(name, level, context) {
                this.name = name, this.level = level, this.context = context, utils_1.validateName(name);
            }
            return AbstractLogger.prototype.isEnabled = function(level) {
                return level >= this.level;
            }, AbstractLogger.prototype.handler = function(message, extra) {
                var _this = this;
                return {
                    trace: function(error) {
                        throw _this.trace(message, error, extra), error;
                    },
                    debug: function(error) {
                        throw _this.debug(message, error, extra), error;
                    },
                    info: function(error) {
                        throw _this.info(message, error, extra), error;
                    },
                    warn: function(error) {
                        throw _this.warn(message, error, extra), error;
                    },
                    error: function(error) {
                        throw _this.error(message, error, extra), error;
                    },
                    fatal: function(error) {
                        throw _this.fatal(message, error, extra), error;
                    }
                };
            }, AbstractLogger.prototype.trace = function(message, exceptionOrExtra, extra) {
                this.log(log4ts_1.LogLevel.TRACE, message, exceptionOrExtra, extra);
            }, AbstractLogger.prototype.debug = function(message, exceptionOrExtra, extra) {
                this.log(log4ts_1.LogLevel.DEBUG, message, exceptionOrExtra, extra);
            }, AbstractLogger.prototype.info = function(message, exceptionOrExtra, extra) {
                this.log(log4ts_1.LogLevel.INFO, message, exceptionOrExtra, extra);
            }, AbstractLogger.prototype.warn = function(message, exceptionOrExtra, extra) {
                this.log(log4ts_1.LogLevel.WARN, message, exceptionOrExtra, extra);
            }, AbstractLogger.prototype.error = function(message, exceptionOrExtra, extra) {
                this.log(log4ts_1.LogLevel.ERROR, message, exceptionOrExtra, extra);
            }, AbstractLogger.prototype.fatal = function(message, exceptionOrExtra, extra) {
                this.log(log4ts_1.LogLevel.FATAL, message, exceptionOrExtra, extra);
            }, AbstractLogger.prototype.log = function(level, message, exceptionOrExtra, extra) {
                this.isEnabled(level) && (exceptionOrExtra && extra || utils_2.ErrorLike.isErrorLike(exceptionOrExtra) ? this.logImpl(level, message, exceptionOrExtra, extra) : this.logImpl(level, message, void 0, extra || exceptionOrExtra));
            }, AbstractLogger;
        }();
        exports.AbstractLogger = AbstractLogger;
        var LogEvent = function() {
            function LogEvent(level, message, logger, timestamp, exception, extra, context) {
                this.level = level, this.message = message, this.logger = logger, this.timestamp = timestamp, 
                this.exception = exception, this.extra = extra, this.context = context;
            }
            return LogEvent;
        }();
        exports.LogEvent = LogEvent;
        var SimpleLogger = function(_super) {
            function SimpleLogger(name, level, appender, context) {
                var _this = _super.call(this, name, level, context || new TreeContext()) || this;
                return _this.appender = appender, _this;
            }
            return tslib_1.__extends(SimpleLogger, _super), SimpleLogger.prototype.getLogger = function(name, level) {
                return new SimpleLogger(this.name + "." + name, level || this.level, this.appender, new TreeContext(this.context));
            }, SimpleLogger.prototype.logImpl = function(level, message, exception, extra) {
                var event = new LogEvent(level, message, this.name, Date.now(), exception, extra, this.context.get());
                try {
                    this.appender(event);
                } catch (exception) {
                    console.error("Failed processing log event", exception);
                    try {
                        ConsoleLogger.printToConsole(event);
                    } catch (e) {
                        console.error("No luck. Can't print the event", e);
                    }
                }
            }, SimpleLogger;
        }(AbstractLogger);
        exports.SimpleLogger = SimpleLogger;
        var ConsoleLogger = function(_super) {
            function ConsoleLogger(name, level, context) {
                return _super.call(this, name, level, ConsoleLogger.printToConsole, context) || this;
            }
            return tslib_1.__extends(ConsoleLogger, _super), ConsoleLogger.printToConsole = function(event) {
                var log = console.log;
                log = event.level <= log4ts_1.LogLevel.TRACE ? console.trace || console.log : event.level <= log4ts_1.LogLevel.DEBUG ? console.debug || console.log : event.level <= log4ts_1.LogLevel.INFO ? console.log : event.level <= log4ts_1.LogLevel.WARN ? console.warn : console.error, 
                log.apply(console, [ "[" + event.logger + "]: " + log4ts_1.LogLevel[event.level] + " : " + event.message, event.exception, event.extra ].filter(function(x) {
                    return !!x;
                }));
            }, ConsoleLogger;
        }(SimpleLogger);
        exports.ConsoleLogger = ConsoleLogger;
        var DefaultLogAppender = function() {
            function DefaultLogAppender() {}
            return DefaultLogAppender.createRootLogger = function(name, appendLevel, appender, crashAppender, copyToConsole) {
                void 0 === copyToConsole && (copyToConsole = !1);
                var defaultSink = function(event) {
                    event.level >= appendLevel && (copyToConsole && ConsoleLogger.printToConsole(event), 
                    appender.append(event)["catch"](DefaultLogAppender._onError));
                }, rootLoggerContext = new TreeContext(), sink = defaultSink;
                if (crashAppender) {
                    var crashLogger = new SimpleLogger(name + ".crashLogs", log4ts_1.LogLevel.TRACE, function(event) {
                        crashAppender.append(event)["catch"](DefaultLogAppender._onError);
                    }, new TreeContext(rootLoggerContext)), crashLoggerWrapper = new crash_logger_1.CrashLogWrapper(500, log4ts_1.LogLevel.ERROR, defaultSink, crashLogger);
                    sink = crashLoggerWrapper.sink;
                }
                return new SimpleLogger(name, appendLevel, sink, rootLoggerContext);
            }, DefaultLogAppender;
        }();
        DefaultLogAppender._onError = function(error) {
            return ConsoleLogger.printToConsole(new LogEvent(log4ts_1.LogLevel.WARN, "Error while logging message to the server.", "Fallback", 0, (void 0), error));
        }, exports.DefaultLogAppender = DefaultLogAppender;
        var QItem = function() {
            function QItem(event) {
                var _this = this;
                this.event = event, this.promise = new Promise(function(resolve, __reject) {
                    _this.resolve = resolve;
                }).then(function() {});
            }
            return QItem;
        }(), DEFAULT_LOG_QUEUE_SIZE = 300, DEFAULT_RETRY_INTERVAL = 1e4, LogQueue = function() {
            function LogQueue(_sink, size, _retryInterval) {
                void 0 === size && (size = DEFAULT_LOG_QUEUE_SIZE), void 0 === _retryInterval && (_retryInterval = DEFAULT_RETRY_INTERVAL), 
                this._sink = _sink, this._retryInterval = _retryInterval, this._currentItem = null, 
                this._skippedCounter = null, this._buffer = new ring_buffer_1.RingBuffer(size, (!1));
            }
            return LogQueue.prototype.append = function(event) {
                if (this._buffer.isFull) return this._incSkippedCounter(), Promise.reject(new Error("Outgoing message buffer is full"));
                var item = new QItem(event);
                return this._buffer.push(item), this._doAppend(), item.promise;
            }, LogQueue.prototype._incSkippedCounter = function() {
                this._skippedCounter || (this._skippedCounter = new LogEvent(log4ts_1.LogLevel.WARN, "Messages was skipped due to buffer overflow", "log4ts_impl.LogQueue", Date.now(), (void 0), {
                    count: 0
                })), this._skippedCounter.extra.count++;
            }, LogQueue.prototype._doAppend = function() {
                var _this = this;
                if (!this._buffer.isEmpty && !this._currentItem) {
                    var item = this._buffer.first, sinkPromise = this._sink.append(item.event);
                    this._currentItem = item, sinkPromise.then(function() {
                        item.resolve();
                        var i = _this._buffer.pop();
                        if (i !== item && i === _this._currentItem) throw new Error("Illegal state");
                        _this._currentItem = null, _this._skippedCounter && (_this.append(_this._skippedCounter), 
                        _this._skippedCounter = null), _this._doAppend();
                    })["catch"](function(__error) {
                        _this._retryAppend(item);
                    });
                }
            }, LogQueue.prototype._retryAppend = function(item) {
                var _this = this;
                setTimeout(function() {
                    var extra = item.event.extra || {};
                    extra.appendRetries || (extra = item.event.extra = Object.assign({
                        appendRetries: 1
                    }, extra)), ++extra.appendRetries, _this._currentItem = null, _this._doAppend();
                }, this._retryInterval);
            }, LogQueue;
        }();
        exports.LogQueue = LogQueue;
        var DummyFelogClient = function() {
            function DummyFelogClient() {}
            return DummyFelogClient.prototype.append = function(_1) {
                return Promise.resolve();
            }, DummyFelogClient;
        }();
        exports.DummyFelogClient = DummyFelogClient;
        var FelogClientBase = function() {
            function FelogClientBase(_appName, _appVersion, _env, _fetch) {
                this._appName = _appName, this._appVersion = _appVersion, this._env = _env, this._fetch = _fetch;
            }
            return FelogClientBase.prototype.append = function(event) {
                return this._fetch(this._prepareData(event));
            }, FelogClientBase.prototype._toObject = function(obj) {
                return void 0 === obj || null === obj || obj instanceof Object && !Array.isArray(obj) ? obj : {
                    extra: obj
                };
            }, FelogClientBase.prototype._parseException = function(ex) {
                if (ex) {
                    var _a = this._toObject(ex), _b = _a.name, name_1 = void 0 === _b ? "UnknownError" : _b, _c = _a.message, message = void 0 === _c ? "Unknown error message" : _c, stack = _a.stack, exceptionDetails = tslib_1.__rest(_a, [ "name", "message", "stack" ]);
                    return {
                        exceptionPart: {
                            exception: {
                                name: name_1,
                                message: message,
                                stack: stack
                            }
                        },
                        exceptionDetailsPart: Object.keys(exceptionDetails).length > 0 ? {
                            exceptionDetails: exceptionDetails
                        } : {}
                    };
                }
                return {
                    exceptionPart: {},
                    exceptionDetailsPart: {}
                };
            }, FelogClientBase.prototype._prepareData = function(event) {
                var contextPart = event.context ? {
                    context: event.context
                } : {}, _a = this._parseException(event.exception), exceptionPart = _a.exceptionPart, exceptionDetailsPart = _a.exceptionDetailsPart, details = JSON.stringify(Object.assign({}, exceptionDetailsPart, this._toObject(event.extra))), data = Object.assign({
                    message: event.message,
                    logger: event.logger,
                    level: log4ts_1.LogLevel[event.level],
                    application: this._appName,
                    version: this._appVersion,
                    env: this._env
                }, contextPart, exceptionPart, "{}" !== details && {
                    details: details
                });
                return JSON.stringify(data, null, "");
            }, FelogClientBase;
        }();
        exports.FelogClientBase = FelogClientBase;
        var PostFelogClient = function(_super) {
            function PostFelogClient(url, appName, appVersion, env, fetch) {
                return _super.call(this, appName, appVersion, env, function(body) {
                    return fetch(url, {
                        method: "POST",
                        cache: "no-cache",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: body
                    }).then(function() {});
                }) || this;
            }
            return tslib_1.__extends(PostFelogClient, _super), PostFelogClient;
        }(FelogClientBase);
        exports.PostFelogClient = PostFelogClient;
        var GetFelogClient = function(_super) {
            function GetFelogClient(url, appName, appVersion, env, fetch) {
                var _this = this, baseUrl = url + "/log?json=";
                return _this = _super.call(this, appName, appVersion, env, function(data) {
                    return fetch(baseUrl + encodeURIComponent(data), {
                        mode: "no-cors",
                        method: "get",
                        cache: "no-cache"
                    }).then(function() {});
                }) || this;
            }
            return tslib_1.__extends(GetFelogClient, _super), GetFelogClient;
        }(FelogClientBase);
        exports.GetFelogClient = GetFelogClient;
        var LoggingConfig = function() {
            function LoggingConfig() {}
            return LoggingConfig.getRootLogger = function() {
                return LoggingConfig._rootLogger || (LoggingConfig._rootLogger = LoggingConfig._createDefaultRootLogger(), 
                LoggingConfig._rootLogger.warn("Using DEFAULT root logger")), LoggingConfig._rootLogger;
            }, LoggingConfig.configure = function(rootLogger) {
                LoggingConfig._rootLogger = rootLogger, LoggingConfig._rootLogger.debug("ROOT logger changed", rootLogger);
            }, LoggingConfig._createDefaultRootLogger = function() {
                return new ConsoleLogger("DEFAULT", log4ts_1.LogLevel.DEBUG);
            }, LoggingConfig;
        }();
        exports.LoggingConfig = LoggingConfig;
    }, {
        "./crash_logger": 5,
        "./log4ts": 7,
        "./ring_buffer": 9,
        "./utils": 12,
        tslib: "tslib"
    } ],
    9: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var RingBuffer = function() {
            function RingBuffer(capacity, allowOverflow) {
                if (void 0 === allowOverflow && (allowOverflow = !1), this.capacity = capacity, 
                this.allowOverflow = allowOverflow, this._start = 0, this._end = 0, this._isFull = !1, 
                this.toJSON = this.toArray, capacity <= 0) throw new Error("Invalid capacity " + capacity);
                this._buffer = new Array(capacity);
            }
            return Object.defineProperty(RingBuffer.prototype, "size", {
                get: function() {
                    return this._isFull ? this._buffer.length : (this._end - this._start + this._buffer.length) % this._buffer.length;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(RingBuffer.prototype, "isEmpty", {
                get: function() {
                    return 0 === this.size;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(RingBuffer.prototype, "isFull", {
                get: function() {
                    return this._isFull;
                },
                enumerable: !0,
                configurable: !0
            }), RingBuffer.prototype.push = function(element) {
                if (this.isFull) {
                    if (!this.allowOverflow) throw new Error("Buffer is full");
                    ++this._start, this._start === this.capacity && (this._start = 0);
                }
                this._buffer[this._end++] = element, this._end === this.capacity && (this._end = 0), 
                this._start === this._end && (this._isFull = !0);
            }, RingBuffer.prototype.pop = function() {
                if (!this.isEmpty) {
                    var t = this._buffer[this._start];
                    return this._buffer[this._start] = void 0, this._start++, this._start === this.capacity && (this._start = 0), 
                    this._isFull = !1, t;
                }
            }, Object.defineProperty(RingBuffer.prototype, "first", {
                get: function() {
                    return this.isEmpty ? void 0 : this._buffer[this._start];
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(RingBuffer.prototype, "last", {
                get: function() {
                    return this.isEmpty ? void 0 : this._buffer[0 === this._end ? this.capacity - 1 : this._end - 1];
                },
                enumerable: !0,
                configurable: !0
            }), RingBuffer.prototype.clear = function() {
                this._buffer = new Array(this.capacity), this._start = this._end = 0, this._isFull = !1;
            }, RingBuffer.prototype.toArray = function() {
                var res;
                if (this.isEmpty) res = new Array(0); else if (this._start < this._end) res = this._buffer.slice(this._start, this._end); else {
                    res = new Array(this.size);
                    for (var j = 0, i = this._start; i < this.capacity; ++i, ++j) res[j] = this._buffer[i];
                    for (var i = 0; i < this._end; ++i, ++j) res[j] = this._buffer[i];
                }
                return res;
            }, RingBuffer;
        }();
        exports.RingBuffer = RingBuffer;
    }, {} ],
    10: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, {} ],
    11: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var tslib_1 = require("tslib"), utils_1 = require("./utils"), AbstractMetricsStorage = function() {
            function AbstractMetricsStorage(name, timersSink, countersSink) {
                this.name = name, this.timersSink = timersSink, this.countersSink = countersSink, 
                utils_1.validateName(name);
            }
            return AbstractMetricsStorage.prototype.getMetric = function(name) {
                return this._createChild(name);
            }, AbstractMetricsStorage.prototype.getTimer = function(name) {
                return this._createChild(name);
            }, AbstractMetricsStorage.prototype.getCounter = function(name) {
                return this._createChild(name);
            }, Object.defineProperty(AbstractMetricsStorage.prototype, "parent", {
                get: function() {
                    var dot = this.name.lastIndexOf("."), name = this.name.substring(0, dot === -1 ? 0 : dot);
                    return "" === name ? void 0 : new AbstractMetricsStorage(name, this.timersSink, this.countersSink);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(AbstractMetricsStorage.prototype, "root", {
                get: function() {
                    var dot = this.name.indexOf("."), name = this.name.substring(0, dot === -1 ? 0 : dot);
                    return "" === name ? this : new AbstractMetricsStorage(name, this.timersSink, this.countersSink);
                },
                enumerable: !0,
                configurable: !0
            }), AbstractMetricsStorage.prototype._createName = function(name) {
                return this.name + "." + name;
            }, AbstractMetricsStorage.prototype.start = function() {
                var start = Date.now(), self = this;
                return {
                    stop: function() {
                        self.recordTime(Date.now() - start);
                    }
                };
            }, AbstractMetricsStorage.prototype.recordTime = function(time) {
                this.timersSink(this.name, time);
            }, AbstractMetricsStorage.prototype.timing = function(fn) {
                var tn = this.start();
                try {
                    return fn();
                } finally {
                    try {
                        tn.stop();
                    } catch (e) {}
                }
            }, AbstractMetricsStorage.prototype.increment = function(step) {
                void 0 === step && (step = 1), this.countersSink(this.name, step);
            }, AbstractMetricsStorage.prototype.decrement = function(step) {
                void 0 === step && (step = 1), this.increment(-step);
            }, AbstractMetricsStorage.prototype._createChild = function(name) {
                return new AbstractMetricsStorage(this._createName(name), this.timersSink, this.countersSink);
            }, AbstractMetricsStorage;
        }();
        exports.AbstractMetricsStorage = AbstractMetricsStorage;
        var MetricsPrinter = function(_super) {
            function MetricsPrinter(fn) {
                return _super.call(this, "MP", function(name, value) {
                    return fn("TIMER: " + name + " = " + value);
                }, function(name, value) {
                    return fn("COUNTER: " + name + " = " + value);
                }) || this;
            }
            return tslib_1.__extends(MetricsPrinter, _super), MetricsPrinter;
        }(AbstractMetricsStorage);
        exports.MetricsPrinter = MetricsPrinter;
        var DEFAULT_SEND_TIMEOUT_MS = 7500, MAX_SEND_ATTEMPTS = 3, MetricsStorage = function(_super) {
            function MetricsStorage(name, baseUrl, _fetch, _sendTimeout) {
                void 0 === _sendTimeout && (_sendTimeout = DEFAULT_SEND_TIMEOUT_MS);
                var _this = _super.call(this, name, function(n, v) {
                    return _this._reportTimer(n, v);
                }, function(n, v) {
                    return _this._reportCounter(n, v);
                }) || this;
                return _this._fetch = _fetch, _this._sendTimeout = _sendTimeout, _this._countersBuffer = {}, 
                _this._timersBuffer = new Array(), _this._sendTimer = void 0, _this._sendData = function() {
                    var data = [ _this._timersBuffer.join("&"), Object.keys(_this._countersBuffer).map(function(key) {
                        return key + "=" + _this._countersBuffer[key];
                    }).join("&") ].filter(function(s) {
                        return s.length;
                    }).join("&"), url = _this._baseUrl + data;
                    _this._timersBuffer.length = 0, _this._countersBuffer = {}, _this._sendTimer = void 0;
                    var attempt = 0, send = function() {
                        _this._fetch(url, {
                            mode: "no-cors",
                            cache: "no-cache"
                        })["catch"](function(error) {
                            attempt++ < MAX_SEND_ATTEMPTS ? setTimeout(send, 5e3 * attempt) : console.error("Cannot send timesereies data", error, url);
                        });
                    };
                    send();
                }, _this._baseUrl = baseUrl + "/ts?", _this;
            }
            return tslib_1.__extends(MetricsStorage, _super), MetricsStorage.createRoot = function(name, baseUrl, fetch) {
                return new MetricsStorage(name, baseUrl, fetch);
            }, MetricsStorage.prototype._reportTimer = function(name, value) {
                this._timersBuffer.push("t." + name + "=" + value), this._startSending();
            }, MetricsStorage.prototype._reportCounter = function(name, value) {
                var key = "c." + name;
                this._countersBuffer[key] = (this._countersBuffer[key] || 0) + value, this._startSending();
            }, MetricsStorage.prototype._startSending = function() {
                this._sendTimer || (this._sendTimer = setTimeout(this._sendData, this._sendTimeout));
            }, MetricsStorage;
        }(AbstractMetricsStorage);
        exports.MetricsStorage = MetricsStorage;
        var MetricsConfig = function() {
            function MetricsConfig() {}
            return MetricsConfig.getRootMetric = function() {
                return MetricsConfig._metricsRoot || (console.warn("[WARNING] Using default timeseries implementation."), 
                MetricsConfig._metricsRoot = new MetricsPrinter(console.log)), MetricsConfig._metricsRoot;
            }, MetricsConfig.configure = function(root) {
                MetricsConfig._metricsRoot = root;
            }, MetricsConfig;
        }();
        exports.MetricsConfig = MetricsConfig;
    }, {
        "./utils": 12,
        tslib: "tslib"
    } ],
    12: [ function(require, module, exports) {
        "use strict";
        function validateName(name) {
            if ("" === name) throw new Error("Empty name");
            if (!nameRegexp.test(name)) throw new Error("Invalid name: " + name + ". Should be hierarchical dot separated string and may contain only word characters)");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var ErrorLike;
        !function(ErrorLike) {
            function isErrorLike(error) {
                var errorLike = error;
                return errorLike && (void 0 !== errorLike.message && void 0 !== errorLike.name || void 0 !== errorLike.stack);
            }
            ErrorLike.isErrorLike = isErrorLike;
        }(ErrorLike = exports.ErrorLike || (exports.ErrorLike = {}));
        var EventProps;
        !function(EventProps) {
            function fromAny(obj) {
                return fromAnyInternal(obj, [ obj ], ErrorLike.isErrorLike(obj));
            }
            function fromAnyInternal(obj, refs, searchNonEnumerable) {
                if (!obj) return {};
                var res = {}, getKeys = searchNonEnumerable ? Object.getOwnPropertyNames : Object.keys;
                return getKeys(obj).forEach(function(key) {
                    var v = obj[key];
                    if (null === v || void 0 === v || "number" == typeof v || "string" == typeof v || "boolean" == typeof v) res[key] = v; else if ("object" == typeof v) if (v instanceof Boolean || v instanceof Number || v instanceof String || v instanceof Date || v instanceof RegExp) res[key] = v.toString(); else if (refs.indexOf(v) === -1) {
                        refs.push(v);
                        var newObj = fromAnyInternal(v, refs, ErrorLike.isErrorLike(v));
                        Object.keys(newObj).length > 0 && (res[key] = newObj);
                    }
                }), res;
            }
            EventProps.fromAny = fromAny;
        }(EventProps = exports.EventProps || (exports.EventProps = {}));
        var nameRegexp = /^(?!\.[\w])[\w.]*\w$/;
        exports.validateName = validateName;
    }, {} ],
    13: [ function(require, module, exports) {
        function createWs(options) {
            function connect(isReconnect) {
                ws.isConnected() || (log("connect to url: " + options.url), socket = new WebSocketClass(options.url), 
                closedByMe = !1, connected = !1, socket.onopen = function() {
                    reconnectTime = initialReconnectTime, connected = !0, closeWhenConnected && (closeWhenConnected = !1, 
                    ws.close()), isReconnect && options.resetQueueOnReconnect ? messageQueue = [] : dequeue(), 
                    ws.emit("connect"), isReconnect && (ws.emit("reconnect"), reconnectInProgress = !1);
                }, socket.onmessage = function(msg) {
                    DEBUG && console.log("%c Received: %s", "color: #46af91;", msg.data), activity(msg.data), 
                    handleMessage(msg.data);
                }, socket.onclose = function(reason) {
                    connected = !1, ws.emit("disconnect", reason), closedByMe || handleError("disconnected");
                }, socket.onerror = handleError, window.app && app.one("offline", function() {
                    connected && (ws.close(), app.one("online", function() {
                        ws.connect();
                    }));
                }));
            }
            function reconnect() {
                reconnectInProgress || (reconnectInProgress = !0, ws.isConnected() ? (ws.one("disconnect", function() {
                    setTimeout(ws.connect.bind(null, !0), 0);
                }), closedByMe = !0, ws.close()) : ws.connect(!0));
            }
            function activity(msg) {
                options.useStandBy && msg && !hasPingPong(msg) && (clearTimeout(activityTimer), 
                activityTimer = setTimeout(function() {
                    ws.close(), standByStatus = !0, activityTimer = !1;
                }, options.useStandBy));
            }
            function hasPingPong(msg) {
                if (msg && "ping" == msg) return !0;
                var message, result = !1;
                try {
                    message = JSON.parse(msg);
                } catch (e) {}
                return message && ("ping" == message || message.action && "pong" == message.action) && (result = !0), 
                result;
            }
            function wakeUp(message) {
                return !hasPingPong(message) && void (standByStatus && (standByStatus = !1, connect(!0)));
            }
            function dequeue() {
                if (socket) for (;socket.readyState == WebSocketClass.OPEN && messageQueue.length; ) send(messageQueue.shift());
            }
            function send(message) {
                DEBUG && console.log("%c Sending %s", "color:rgba(10, 10, 10, 0.6); font-size: 10px", message), 
                activity(message), socket.send(message), idleTimer && clearTimeout(idleTimer), idleTimer = setTimeout(ping, options.idleTimeout);
            }
            function ping() {
                idleTimer = null, ws.send("ping");
            }
            function handleMessage(msg) {
                try {
                    msg = JSON.parse(msg);
                } catch (e) {
                    logError(e.stack || e, msg);
                }
                options.useQueue ? (emiterQueue.push(msg), emiterWorker()) : ws.emit("message", msg);
            }
            function handleError(data) {
                logError("websocket error", data), ws.emit("error", data), data && data.target && [ WebSocketClass.CLOSING, WebSocketClass.CLOSED ].indexOf(data.target.readyState) > -1 || reconnectTimer || (connected && ws.close(), 
                log("try to reconnect in " + reconnectTime / 1e3 + "s"), reconnectTimer = setTimeout(function() {
                    reconnectTime = Math.min(maxReconnectTime, 1.5 * reconnectTime), reconnectTimer = null, 
                    connect(!0);
                }, reconnectTime));
            }
            function log() {
                DEBUG && console.log.apply(console, arguments);
            }
            function logError() {
                console.error.apply(console, arguments);
            }
            function emiterWorker() {
                if (!emiterQueueId && !isPaused) return 0 === emiterQueue.length ? void (emiterQueueId = null) : void (emiterQueueId = setTimeout(function() {
                    isPaused || ws.emit("message", emiterQueue.shift()), emiterQueueId = null, emiterWorker();
                }, options.useQueue));
            }
            var socket, reconnectTimer, idleTimer, emiterQueueId, playTimerId, reconnectInProgress, DEBUG = !options.silentLogs, WebSocketClass = window.WebSocket || window.MozWebSocket, standByStatus = !1, activityTimer = null, connected = !1, closedByMe = !1, closeWhenConnected = !1, reconnectTime = 1e3, initialReconnectTime = 1e3, maxReconnectTime = 6e4, messageQueue = [], emiterQueue = [], isPaused = !1;
            options = Object.assign({}, {
                url: null,
                connectionTimeout: 1e3,
                idleTimeout: 3e5,
                useQueue: !1,
                useStandBy: !1,
                playDelay: 50,
                resetQueueOnReconnect: !1
            }, options);
            var ws = emitter({
                connect: connect,
                reconnect: reconnect,
                send: function(message) {
                    if (standByStatus) wakeUp(message); else {
                        var strMessage = JSON.stringify(message);
                        messageQueue.push(strMessage), dequeue();
                    }
                },
                close: function() {
                    if (closedByMe = !0, log("explicit close requested"), !connected) return closeWhenConnected = !0;
                    try {
                        socket && socket.close(), reconnectTimer && (clearTimeout(reconnectTimer), reconnectTimer = null);
                    } catch (e) {
                        logError("socket closing bug", e.stack || e);
                    }
                    connected = !1, activityTimer && clearTimeout(activityTimer);
                },
                isConnected: function() {
                    return connected;
                },
                release: function() {
                    clearTimeout(reconnectTimer);
                },
                toString: function() {
                    return "[object WebSocket]";
                },
                wsPlay: function() {
                    clearTimeout(playTimerId), playTimerId = setTimeout(function() {
                        isPaused = !1, emiterWorker();
                    }, options.playDelay);
                },
                wsPause: function() {
                    clearTimeout(playTimerId), isPaused = !0;
                }
            });
            return ws;
        }
        var emitter = require("emitter");
        "function" != typeof Object.assign && !function() {
            Object.assign = function(target) {
                "use strict";
                if (void 0 === target || null === target) throw new TypeError("Cannot convert undefined or null to object");
                for (var output = Object(target), index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (void 0 !== source && null !== source) for (var nextKey in source) source.hasOwnProperty(nextKey) && (output[nextKey] = source[nextKey]);
                }
                return output;
            };
        }();
        try {
            module.exports = createWs;
        } catch (e) {}
    }, {
        emitter: "emitter"
    } ],
    14: [ function(require, module, exports) {
        try {
            module.exports = require("./lib/websocket");
        } catch (e) {}
    }, {
        "./lib/websocket": 13
    } ],
    15: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/array/from"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/array/from": 38
    } ],
    16: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/get-iterator"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/get-iterator": 39
    } ],
    17: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/is-iterable"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/is-iterable": 40
    } ],
    18: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/json/stringify"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/json/stringify": 41
    } ],
    19: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/object/assign"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/assign": 42
    } ],
    20: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/object/create"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/create": 43
    } ],
    21: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/object/define-property"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/define-property": 44
    } ],
    22: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/object/get-own-property-symbols"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/get-own-property-symbols": 45
    } ],
    23: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/object/get-prototype-of"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/get-prototype-of": 46
    } ],
    24: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/object/keys"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/keys": 47
    } ],
    25: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/object/set-prototype-of"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/object/set-prototype-of": 48
    } ],
    26: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/promise"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/promise": 49
    } ],
    27: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/symbol"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/symbol": 50
    } ],
    28: [ function(require, module, exports) {
        module.exports = {
            "default": require("core-js/library/fn/symbol/iterator"),
            __esModule: !0
        };
    }, {
        "core-js/library/fn/symbol/iterator": 51
    } ],
    29: [ function(require, module, exports) {
        "use strict";
        exports.__esModule = !0, exports["default"] = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        };
    }, {} ],
    30: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        exports.__esModule = !0;
        var _defineProperty = require("../core-js/object/define-property"), _defineProperty2 = _interopRequireDefault(_defineProperty);
        exports["default"] = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }();
    }, {
        "../core-js/object/define-property": 21
    } ],
    31: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        exports.__esModule = !0;
        var _defineProperty = require("../core-js/object/define-property"), _defineProperty2 = _interopRequireDefault(_defineProperty);
        exports["default"] = function(obj, key, value) {
            return key in obj ? (0, _defineProperty2["default"])(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        };
    }, {
        "../core-js/object/define-property": 21
    } ],
    32: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        exports.__esModule = !0;
        var _setPrototypeOf = require("../core-js/object/set-prototype-of"), _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf), _create = require("../core-js/object/create"), _create2 = _interopRequireDefault(_create), _typeof2 = require("../helpers/typeof"), _typeof3 = _interopRequireDefault(_typeof2);
        exports["default"] = function(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + ("undefined" == typeof superClass ? "undefined" : (0, 
            _typeof3["default"])(superClass)));
            subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (_setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass);
        };
    }, {
        "../core-js/object/create": 20,
        "../core-js/object/set-prototype-of": 25,
        "../helpers/typeof": 36
    } ],
    33: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        exports.__esModule = !0;
        var _typeof2 = require("../helpers/typeof"), _typeof3 = _interopRequireDefault(_typeof2);
        exports["default"] = function(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== ("undefined" == typeof call ? "undefined" : (0, _typeof3["default"])(call)) && "function" != typeof call ? self : call;
        };
    }, {
        "../helpers/typeof": 36
    } ],
    34: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        exports.__esModule = !0;
        var _isIterable2 = require("../core-js/is-iterable"), _isIterable3 = _interopRequireDefault(_isIterable2), _getIterator2 = require("../core-js/get-iterator"), _getIterator3 = _interopRequireDefault(_getIterator2);
        exports["default"] = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = (0, _getIterator3["default"])(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                    !i || _arr.length !== i); _n = !0) ;
                } catch (err) {
                    _d = !0, _e = err;
                } finally {
                    try {
                        !_n && _i["return"] && _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if ((0, _isIterable3["default"])(Object(arr))) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
    }, {
        "../core-js/get-iterator": 16,
        "../core-js/is-iterable": 17
    } ],
    35: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        exports.__esModule = !0;
        var _from = require("../core-js/array/from"), _from2 = _interopRequireDefault(_from);
        exports["default"] = function(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return (0, _from2["default"])(arr);
        };
    }, {
        "../core-js/array/from": 15
    } ],
    36: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        exports.__esModule = !0;
        var _iterator = require("../core-js/symbol/iterator"), _iterator2 = _interopRequireDefault(_iterator), _symbol = require("../core-js/symbol"), _symbol2 = _interopRequireDefault(_symbol), _typeof = "function" == typeof _symbol2["default"] && "symbol" == typeof _iterator2["default"] ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof _symbol2["default"] && obj.constructor === _symbol2["default"] && obj !== _symbol2["default"].prototype ? "symbol" : typeof obj;
        };
        exports["default"] = "function" == typeof _symbol2["default"] && "symbol" === _typeof(_iterator2["default"]) ? function(obj) {
            return "undefined" == typeof obj ? "undefined" : _typeof(obj);
        } : function(obj) {
            return obj && "function" == typeof _symbol2["default"] && obj.constructor === _symbol2["default"] && obj !== _symbol2["default"].prototype ? "symbol" : "undefined" == typeof obj ? "undefined" : _typeof(obj);
        };
    }, {
        "../core-js/symbol": 27,
        "../core-js/symbol/iterator": 28
    } ],
    37: [ function(require, module, exports) {
        module.exports = require("regenerator-runtime");
    }, {
        "regenerator-runtime": 147
    } ],
    38: [ function(require, module, exports) {
        require("../../modules/es6.string.iterator"), require("../../modules/es6.array.from"), 
        module.exports = require("../../modules/_core").Array.from;
    }, {
        "../../modules/_core": 59,
        "../../modules/es6.array.from": 127,
        "../../modules/es6.string.iterator": 137
    } ],
    39: [ function(require, module, exports) {
        require("../modules/web.dom.iterable"), require("../modules/es6.string.iterator"), 
        module.exports = require("../modules/core.get-iterator");
    }, {
        "../modules/core.get-iterator": 125,
        "../modules/es6.string.iterator": 137,
        "../modules/web.dom.iterable": 141
    } ],
    40: [ function(require, module, exports) {
        require("../modules/web.dom.iterable"), require("../modules/es6.string.iterator"), 
        module.exports = require("../modules/core.is-iterable");
    }, {
        "../modules/core.is-iterable": 126,
        "../modules/es6.string.iterator": 137,
        "../modules/web.dom.iterable": 141
    } ],
    41: [ function(require, module, exports) {
        var core = require("../../modules/_core"), $JSON = core.JSON || (core.JSON = {
            stringify: JSON.stringify
        });
        module.exports = function(it) {
            return $JSON.stringify.apply($JSON, arguments);
        };
    }, {
        "../../modules/_core": 59
    } ],
    42: [ function(require, module, exports) {
        require("../../modules/es6.object.assign"), module.exports = require("../../modules/_core").Object.assign;
    }, {
        "../../modules/_core": 59,
        "../../modules/es6.object.assign": 129
    } ],
    43: [ function(require, module, exports) {
        require("../../modules/es6.object.create");
        var $Object = require("../../modules/_core").Object;
        module.exports = function(P, D) {
            return $Object.create(P, D);
        };
    }, {
        "../../modules/_core": 59,
        "../../modules/es6.object.create": 130
    } ],
    44: [ function(require, module, exports) {
        require("../../modules/es6.object.define-property");
        var $Object = require("../../modules/_core").Object;
        module.exports = function(it, key, desc) {
            return $Object.defineProperty(it, key, desc);
        };
    }, {
        "../../modules/_core": 59,
        "../../modules/es6.object.define-property": 131
    } ],
    45: [ function(require, module, exports) {
        require("../../modules/es6.symbol"), module.exports = require("../../modules/_core").Object.getOwnPropertySymbols;
    }, {
        "../../modules/_core": 59,
        "../../modules/es6.symbol": 138
    } ],
    46: [ function(require, module, exports) {
        require("../../modules/es6.object.get-prototype-of"), module.exports = require("../../modules/_core").Object.getPrototypeOf;
    }, {
        "../../modules/_core": 59,
        "../../modules/es6.object.get-prototype-of": 132
    } ],
    47: [ function(require, module, exports) {
        require("../../modules/es6.object.keys"), module.exports = require("../../modules/_core").Object.keys;
    }, {
        "../../modules/_core": 59,
        "../../modules/es6.object.keys": 133
    } ],
    48: [ function(require, module, exports) {
        require("../../modules/es6.object.set-prototype-of"), module.exports = require("../../modules/_core").Object.setPrototypeOf;
    }, {
        "../../modules/_core": 59,
        "../../modules/es6.object.set-prototype-of": 134
    } ],
    49: [ function(require, module, exports) {
        require("../modules/es6.object.to-string"), require("../modules/es6.string.iterator"), 
        require("../modules/web.dom.iterable"), require("../modules/es6.promise"), module.exports = require("../modules/_core").Promise;
    }, {
        "../modules/_core": 59,
        "../modules/es6.object.to-string": 135,
        "../modules/es6.promise": 136,
        "../modules/es6.string.iterator": 137,
        "../modules/web.dom.iterable": 141
    } ],
    50: [ function(require, module, exports) {
        require("../../modules/es6.symbol"), require("../../modules/es6.object.to-string"), 
        require("../../modules/es7.symbol.async-iterator"), require("../../modules/es7.symbol.observable"), 
        module.exports = require("../../modules/_core").Symbol;
    }, {
        "../../modules/_core": 59,
        "../../modules/es6.object.to-string": 135,
        "../../modules/es6.symbol": 138,
        "../../modules/es7.symbol.async-iterator": 139,
        "../../modules/es7.symbol.observable": 140
    } ],
    51: [ function(require, module, exports) {
        require("../../modules/es6.string.iterator"), require("../../modules/web.dom.iterable"), 
        module.exports = require("../../modules/_wks-ext").f("iterator");
    }, {
        "../../modules/_wks-ext": 122,
        "../../modules/es6.string.iterator": 137,
        "../../modules/web.dom.iterable": 141
    } ],
    52: [ function(require, module, exports) {
        module.exports = function(it) {
            if ("function" != typeof it) throw TypeError(it + " is not a function!");
            return it;
        };
    }, {} ],
    53: [ function(require, module, exports) {
        module.exports = function() {};
    }, {} ],
    54: [ function(require, module, exports) {
        module.exports = function(it, Constructor, name, forbiddenField) {
            if (!(it instanceof Constructor) || void 0 !== forbiddenField && forbiddenField in it) throw TypeError(name + ": incorrect invocation!");
            return it;
        };
    }, {} ],
    55: [ function(require, module, exports) {
        var isObject = require("./_is-object");
        module.exports = function(it) {
            if (!isObject(it)) throw TypeError(it + " is not an object!");
            return it;
        };
    }, {
        "./_is-object": 79
    } ],
    56: [ function(require, module, exports) {
        var toIObject = require("./_to-iobject"), toLength = require("./_to-length"), toIndex = require("./_to-index");
        module.exports = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
                var value, O = toIObject($this), length = toLength(O.length), index = toIndex(fromIndex, length);
                if (IS_INCLUDES && el != el) {
                    for (;length > index; ) if (value = O[index++], value != value) return !0;
                } else for (;length > index; index++) if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
                return !IS_INCLUDES && -1;
            };
        };
    }, {
        "./_to-index": 114,
        "./_to-iobject": 116,
        "./_to-length": 117
    } ],
    57: [ function(require, module, exports) {
        var cof = require("./_cof"), TAG = require("./_wks")("toStringTag"), ARG = "Arguments" == cof(function() {
            return arguments;
        }()), tryGet = function(it, key) {
            try {
                return it[key];
            } catch (e) {}
        };
        module.exports = function(it) {
            var O, T, B;
            return void 0 === it ? "Undefined" : null === it ? "Null" : "string" == typeof (T = tryGet(O = Object(it), TAG)) ? T : ARG ? cof(O) : "Object" == (B = cof(O)) && "function" == typeof O.callee ? "Arguments" : B;
        };
    }, {
        "./_cof": 58,
        "./_wks": 123
    } ],
    58: [ function(require, module, exports) {
        var toString = {}.toString;
        module.exports = function(it) {
            return toString.call(it).slice(8, -1);
        };
    }, {} ],
    59: [ function(require, module, exports) {
        var core = module.exports = {
            version: "2.4.0"
        };
        "number" == typeof __e && (__e = core);
    }, {} ],
    60: [ function(require, module, exports) {
        "use strict";
        var $defineProperty = require("./_object-dp"), createDesc = require("./_property-desc");
        module.exports = function(object, index, value) {
            index in object ? $defineProperty.f(object, index, createDesc(0, value)) : object[index] = value;
        };
    }, {
        "./_object-dp": 92,
        "./_property-desc": 103
    } ],
    61: [ function(require, module, exports) {
        var aFunction = require("./_a-function");
        module.exports = function(fn, that, length) {
            if (aFunction(fn), void 0 === that) return fn;
            switch (length) {
              case 1:
                return function(a) {
                    return fn.call(that, a);
                };

              case 2:
                return function(a, b) {
                    return fn.call(that, a, b);
                };

              case 3:
                return function(a, b, c) {
                    return fn.call(that, a, b, c);
                };
            }
            return function() {
                return fn.apply(that, arguments);
            };
        };
    }, {
        "./_a-function": 52
    } ],
    62: [ function(require, module, exports) {
        module.exports = function(it) {
            if (void 0 == it) throw TypeError("Can't call method on  " + it);
            return it;
        };
    }, {} ],
    63: [ function(require, module, exports) {
        module.exports = !require("./_fails")(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, {
        "./_fails": 68
    } ],
    64: [ function(require, module, exports) {
        var isObject = require("./_is-object"), document = require("./_global").document, is = isObject(document) && isObject(document.createElement);
        module.exports = function(it) {
            return is ? document.createElement(it) : {};
        };
    }, {
        "./_global": 70,
        "./_is-object": 79
    } ],
    65: [ function(require, module, exports) {
        module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, {} ],
    66: [ function(require, module, exports) {
        var getKeys = require("./_object-keys"), gOPS = require("./_object-gops"), pIE = require("./_object-pie");
        module.exports = function(it) {
            var result = getKeys(it), getSymbols = gOPS.f;
            if (getSymbols) for (var key, symbols = getSymbols(it), isEnum = pIE.f, i = 0; symbols.length > i; ) isEnum.call(it, key = symbols[i++]) && result.push(key);
            return result;
        };
    }, {
        "./_object-gops": 97,
        "./_object-keys": 100,
        "./_object-pie": 101
    } ],
    67: [ function(require, module, exports) {
        var global = require("./_global"), core = require("./_core"), ctx = require("./_ctx"), hide = require("./_hide"), PROTOTYPE = "prototype", $export = function(type, name, source) {
            var key, own, out, IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), expProto = exports[PROTOTYPE], target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
            IS_GLOBAL && (source = name);
            for (key in source) own = !IS_FORCED && target && void 0 !== target[key], own && key in exports || (out = own ? target[key] : source[key], 
            exports[key] = IS_GLOBAL && "function" != typeof target[key] ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
                var F = function(a, b, c) {
                    if (this instanceof C) {
                        switch (arguments.length) {
                          case 0:
                            return new C();

                          case 1:
                            return new C(a);

                          case 2:
                            return new C(a, b);
                        }
                        return new C(a, b, c);
                    }
                    return C.apply(this, arguments);
                };
                return F[PROTOTYPE] = C[PROTOTYPE], F;
            }(out) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out, IS_PROTO && ((exports.virtual || (exports.virtual = {}))[key] = out, 
            type & $export.R && expProto && !expProto[key] && hide(expProto, key, out)));
        };
        $export.F = 1, $export.G = 2, $export.S = 4, $export.P = 8, $export.B = 16, $export.W = 32, 
        $export.U = 64, $export.R = 128, module.exports = $export;
    }, {
        "./_core": 59,
        "./_ctx": 61,
        "./_global": 70,
        "./_hide": 72
    } ],
    68: [ function(require, module, exports) {
        module.exports = function(exec) {
            try {
                return !!exec();
            } catch (e) {
                return !0;
            }
        };
    }, {} ],
    69: [ function(require, module, exports) {
        var ctx = require("./_ctx"), call = require("./_iter-call"), isArrayIter = require("./_is-array-iter"), anObject = require("./_an-object"), toLength = require("./_to-length"), getIterFn = require("./core.get-iterator-method"), BREAK = {}, RETURN = {}, exports = module.exports = function(iterable, entries, fn, that, ITERATOR) {
            var length, step, iterator, result, iterFn = ITERATOR ? function() {
                return iterable;
            } : getIterFn(iterable), f = ctx(fn, that, entries ? 2 : 1), index = 0;
            if ("function" != typeof iterFn) throw TypeError(iterable + " is not iterable!");
            if (isArrayIter(iterFn)) {
                for (length = toLength(iterable.length); length > index; index++) if (result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]), 
                result === BREAK || result === RETURN) return result;
            } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) if (result = call(iterator, f, step.value, entries), 
            result === BREAK || result === RETURN) return result;
        };
        exports.BREAK = BREAK, exports.RETURN = RETURN;
    }, {
        "./_an-object": 55,
        "./_ctx": 61,
        "./_is-array-iter": 77,
        "./_iter-call": 80,
        "./_to-length": 117,
        "./core.get-iterator-method": 124
    } ],
    70: [ function(require, module, exports) {
        var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = global);
    }, {} ],
    71: [ function(require, module, exports) {
        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
        };
    }, {} ],
    72: [ function(require, module, exports) {
        var dP = require("./_object-dp"), createDesc = require("./_property-desc");
        module.exports = require("./_descriptors") ? function(object, key, value) {
            return dP.f(object, key, createDesc(1, value));
        } : function(object, key, value) {
            return object[key] = value, object;
        };
    }, {
        "./_descriptors": 63,
        "./_object-dp": 92,
        "./_property-desc": 103
    } ],
    73: [ function(require, module, exports) {
        module.exports = require("./_global").document && document.documentElement;
    }, {
        "./_global": 70
    } ],
    74: [ function(require, module, exports) {
        module.exports = !require("./_descriptors") && !require("./_fails")(function() {
            return 7 != Object.defineProperty(require("./_dom-create")("div"), "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, {
        "./_descriptors": 63,
        "./_dom-create": 64,
        "./_fails": 68
    } ],
    75: [ function(require, module, exports) {
        module.exports = function(fn, args, that) {
            var un = void 0 === that;
            switch (args.length) {
              case 0:
                return un ? fn() : fn.call(that);

              case 1:
                return un ? fn(args[0]) : fn.call(that, args[0]);

              case 2:
                return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

              case 3:
                return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

              case 4:
                return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
            }
            return fn.apply(that, args);
        };
    }, {} ],
    76: [ function(require, module, exports) {
        var cof = require("./_cof");
        module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
            return "String" == cof(it) ? it.split("") : Object(it);
        };
    }, {
        "./_cof": 58
    } ],
    77: [ function(require, module, exports) {
        var Iterators = require("./_iterators"), ITERATOR = require("./_wks")("iterator"), ArrayProto = Array.prototype;
        module.exports = function(it) {
            return void 0 !== it && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
        };
    }, {
        "./_iterators": 85,
        "./_wks": 123
    } ],
    78: [ function(require, module, exports) {
        var cof = require("./_cof");
        module.exports = Array.isArray || function(arg) {
            return "Array" == cof(arg);
        };
    }, {
        "./_cof": 58
    } ],
    79: [ function(require, module, exports) {
        module.exports = function(it) {
            return "object" == typeof it ? null !== it : "function" == typeof it;
        };
    }, {} ],
    80: [ function(require, module, exports) {
        var anObject = require("./_an-object");
        module.exports = function(iterator, fn, value, entries) {
            try {
                return entries ? fn(anObject(value)[0], value[1]) : fn(value);
            } catch (e) {
                var ret = iterator["return"];
                throw void 0 !== ret && anObject(ret.call(iterator)), e;
            }
        };
    }, {
        "./_an-object": 55
    } ],
    81: [ function(require, module, exports) {
        "use strict";
        var create = require("./_object-create"), descriptor = require("./_property-desc"), setToStringTag = require("./_set-to-string-tag"), IteratorPrototype = {};
        require("./_hide")(IteratorPrototype, require("./_wks")("iterator"), function() {
            return this;
        }), module.exports = function(Constructor, NAME, next) {
            Constructor.prototype = create(IteratorPrototype, {
                next: descriptor(1, next)
            }), setToStringTag(Constructor, NAME + " Iterator");
        };
    }, {
        "./_hide": 72,
        "./_object-create": 91,
        "./_property-desc": 103,
        "./_set-to-string-tag": 108,
        "./_wks": 123
    } ],
    82: [ function(require, module, exports) {
        "use strict";
        var LIBRARY = require("./_library"), $export = require("./_export"), redefine = require("./_redefine"), hide = require("./_hide"), has = require("./_has"), Iterators = require("./_iterators"), $iterCreate = require("./_iter-create"), setToStringTag = require("./_set-to-string-tag"), getPrototypeOf = require("./_object-gpo"), ITERATOR = require("./_wks")("iterator"), BUGGY = !([].keys && "next" in [].keys()), FF_ITERATOR = "@@iterator", KEYS = "keys", VALUES = "values", returnThis = function() {
            return this;
        };
        module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
            $iterCreate(Constructor, NAME, next);
            var methods, key, IteratorPrototype, getMethod = function(kind) {
                if (!BUGGY && kind in proto) return proto[kind];
                switch (kind) {
                  case KEYS:
                    return function() {
                        return new Constructor(this, kind);
                    };

                  case VALUES:
                    return function() {
                        return new Constructor(this, kind);
                    };
                }
                return function() {
                    return new Constructor(this, kind);
                };
            }, TAG = NAME + " Iterator", DEF_VALUES = DEFAULT == VALUES, VALUES_BUG = !1, proto = Base.prototype, $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT], $default = $native || getMethod(DEFAULT), $entries = DEFAULT ? DEF_VALUES ? getMethod("entries") : $default : void 0, $anyNative = "Array" == NAME ? proto.entries || $native : $native;
            if ($anyNative && (IteratorPrototype = getPrototypeOf($anyNative.call(new Base())), 
            IteratorPrototype !== Object.prototype && (setToStringTag(IteratorPrototype, TAG, !0), 
            LIBRARY || has(IteratorPrototype, ITERATOR) || hide(IteratorPrototype, ITERATOR, returnThis))), 
            DEF_VALUES && $native && $native.name !== VALUES && (VALUES_BUG = !0, $default = function() {
                return $native.call(this);
            }), LIBRARY && !FORCED || !BUGGY && !VALUES_BUG && proto[ITERATOR] || hide(proto, ITERATOR, $default), 
            Iterators[NAME] = $default, Iterators[TAG] = returnThis, DEFAULT) if (methods = {
                values: DEF_VALUES ? $default : getMethod(VALUES),
                keys: IS_SET ? $default : getMethod(KEYS),
                entries: $entries
            }, FORCED) for (key in methods) key in proto || redefine(proto, key, methods[key]); else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
            return methods;
        };
    }, {
        "./_export": 67,
        "./_has": 71,
        "./_hide": 72,
        "./_iter-create": 81,
        "./_iterators": 85,
        "./_library": 87,
        "./_object-gpo": 98,
        "./_redefine": 105,
        "./_set-to-string-tag": 108,
        "./_wks": 123
    } ],
    83: [ function(require, module, exports) {
        var ITERATOR = require("./_wks")("iterator"), SAFE_CLOSING = !1;
        try {
            var riter = [ 7 ][ITERATOR]();
            riter["return"] = function() {
                SAFE_CLOSING = !0;
            }, Array.from(riter, function() {
                throw 2;
            });
        } catch (e) {}
        module.exports = function(exec, skipClosing) {
            if (!skipClosing && !SAFE_CLOSING) return !1;
            var safe = !1;
            try {
                var arr = [ 7 ], iter = arr[ITERATOR]();
                iter.next = function() {
                    return {
                        done: safe = !0
                    };
                }, arr[ITERATOR] = function() {
                    return iter;
                }, exec(arr);
            } catch (e) {}
            return safe;
        };
    }, {
        "./_wks": 123
    } ],
    84: [ function(require, module, exports) {
        module.exports = function(done, value) {
            return {
                value: value,
                done: !!done
            };
        };
    }, {} ],
    85: [ function(require, module, exports) {
        module.exports = {};
    }, {} ],
    86: [ function(require, module, exports) {
        var getKeys = require("./_object-keys"), toIObject = require("./_to-iobject");
        module.exports = function(object, el) {
            for (var key, O = toIObject(object), keys = getKeys(O), length = keys.length, index = 0; length > index; ) if (O[key = keys[index++]] === el) return key;
        };
    }, {
        "./_object-keys": 100,
        "./_to-iobject": 116
    } ],
    87: [ function(require, module, exports) {
        module.exports = !0;
    }, {} ],
    88: [ function(require, module, exports) {
        var META = require("./_uid")("meta"), isObject = require("./_is-object"), has = require("./_has"), setDesc = require("./_object-dp").f, id = 0, isExtensible = Object.isExtensible || function() {
            return !0;
        }, FREEZE = !require("./_fails")(function() {
            return isExtensible(Object.preventExtensions({}));
        }), setMeta = function(it) {
            setDesc(it, META, {
                value: {
                    i: "O" + ++id,
                    w: {}
                }
            });
        }, fastKey = function(it, create) {
            if (!isObject(it)) return "symbol" == typeof it ? it : ("string" == typeof it ? "S" : "P") + it;
            if (!has(it, META)) {
                if (!isExtensible(it)) return "F";
                if (!create) return "E";
                setMeta(it);
            }
            return it[META].i;
        }, getWeak = function(it, create) {
            if (!has(it, META)) {
                if (!isExtensible(it)) return !0;
                if (!create) return !1;
                setMeta(it);
            }
            return it[META].w;
        }, onFreeze = function(it) {
            return FREEZE && meta.NEED && isExtensible(it) && !has(it, META) && setMeta(it), 
            it;
        }, meta = module.exports = {
            KEY: META,
            NEED: !1,
            fastKey: fastKey,
            getWeak: getWeak,
            onFreeze: onFreeze
        };
    }, {
        "./_fails": 68,
        "./_has": 71,
        "./_is-object": 79,
        "./_object-dp": 92,
        "./_uid": 120
    } ],
    89: [ function(require, module, exports) {
        var global = require("./_global"), macrotask = require("./_task").set, Observer = global.MutationObserver || global.WebKitMutationObserver, process = global.process, Promise = global.Promise, isNode = "process" == require("./_cof")(process);
        module.exports = function() {
            var head, last, notify, flush = function() {
                var parent, fn;
                for (isNode && (parent = process.domain) && parent.exit(); head; ) {
                    fn = head.fn, head = head.next;
                    try {
                        fn();
                    } catch (e) {
                        throw head ? notify() : last = void 0, e;
                    }
                }
                last = void 0, parent && parent.enter();
            };
            if (isNode) notify = function() {
                process.nextTick(flush);
            }; else if (Observer) {
                var toggle = !0, node = document.createTextNode("");
                new Observer(flush).observe(node, {
                    characterData: !0
                }), notify = function() {
                    node.data = toggle = !toggle;
                };
            } else if (Promise && Promise.resolve) {
                var promise = Promise.resolve();
                notify = function() {
                    promise.then(flush);
                };
            } else notify = function() {
                macrotask.call(global, flush);
            };
            return function(fn) {
                var task = {
                    fn: fn,
                    next: void 0
                };
                last && (last.next = task), head || (head = task, notify()), last = task;
            };
        };
    }, {
        "./_cof": 58,
        "./_global": 70,
        "./_task": 113
    } ],
    90: [ function(require, module, exports) {
        "use strict";
        var getKeys = require("./_object-keys"), gOPS = require("./_object-gops"), pIE = require("./_object-pie"), toObject = require("./_to-object"), IObject = require("./_iobject"), $assign = Object.assign;
        module.exports = !$assign || require("./_fails")(function() {
            var A = {}, B = {}, S = Symbol(), K = "abcdefghijklmnopqrst";
            return A[S] = 7, K.split("").forEach(function(k) {
                B[k] = k;
            }), 7 != $assign({}, A)[S] || Object.keys($assign({}, B)).join("") != K;
        }) ? function(target, source) {
            for (var T = toObject(target), aLen = arguments.length, index = 1, getSymbols = gOPS.f, isEnum = pIE.f; aLen > index; ) for (var key, S = IObject(arguments[index++]), keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S), length = keys.length, j = 0; length > j; ) isEnum.call(S, key = keys[j++]) && (T[key] = S[key]);
            return T;
        } : $assign;
    }, {
        "./_fails": 68,
        "./_iobject": 76,
        "./_object-gops": 97,
        "./_object-keys": 100,
        "./_object-pie": 101,
        "./_to-object": 118
    } ],
    91: [ function(require, module, exports) {
        var anObject = require("./_an-object"), dPs = require("./_object-dps"), enumBugKeys = require("./_enum-bug-keys"), IE_PROTO = require("./_shared-key")("IE_PROTO"), Empty = function() {}, PROTOTYPE = "prototype", createDict = function() {
            var iframeDocument, iframe = require("./_dom-create")("iframe"), i = enumBugKeys.length, lt = "<", gt = ">";
            for (iframe.style.display = "none", require("./_html").appendChild(iframe), iframe.src = "javascript:", 
            iframeDocument = iframe.contentWindow.document, iframeDocument.open(), iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt), 
            iframeDocument.close(), createDict = iframeDocument.F; i--; ) delete createDict[PROTOTYPE][enumBugKeys[i]];
            return createDict();
        };
        module.exports = Object.create || function(O, Properties) {
            var result;
            return null !== O ? (Empty[PROTOTYPE] = anObject(O), result = new Empty(), Empty[PROTOTYPE] = null, 
            result[IE_PROTO] = O) : result = createDict(), void 0 === Properties ? result : dPs(result, Properties);
        };
    }, {
        "./_an-object": 55,
        "./_dom-create": 64,
        "./_enum-bug-keys": 65,
        "./_html": 73,
        "./_object-dps": 93,
        "./_shared-key": 109
    } ],
    92: [ function(require, module, exports) {
        var anObject = require("./_an-object"), IE8_DOM_DEFINE = require("./_ie8-dom-define"), toPrimitive = require("./_to-primitive"), dP = Object.defineProperty;
        exports.f = require("./_descriptors") ? Object.defineProperty : function(O, P, Attributes) {
            if (anObject(O), P = toPrimitive(P, !0), anObject(Attributes), IE8_DOM_DEFINE) try {
                return dP(O, P, Attributes);
            } catch (e) {}
            if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
            return "value" in Attributes && (O[P] = Attributes.value), O;
        };
    }, {
        "./_an-object": 55,
        "./_descriptors": 63,
        "./_ie8-dom-define": 74,
        "./_to-primitive": 119
    } ],
    93: [ function(require, module, exports) {
        var dP = require("./_object-dp"), anObject = require("./_an-object"), getKeys = require("./_object-keys");
        module.exports = require("./_descriptors") ? Object.defineProperties : function(O, Properties) {
            anObject(O);
            for (var P, keys = getKeys(Properties), length = keys.length, i = 0; length > i; ) dP.f(O, P = keys[i++], Properties[P]);
            return O;
        };
    }, {
        "./_an-object": 55,
        "./_descriptors": 63,
        "./_object-dp": 92,
        "./_object-keys": 100
    } ],
    94: [ function(require, module, exports) {
        var pIE = require("./_object-pie"), createDesc = require("./_property-desc"), toIObject = require("./_to-iobject"), toPrimitive = require("./_to-primitive"), has = require("./_has"), IE8_DOM_DEFINE = require("./_ie8-dom-define"), gOPD = Object.getOwnPropertyDescriptor;
        exports.f = require("./_descriptors") ? gOPD : function(O, P) {
            if (O = toIObject(O), P = toPrimitive(P, !0), IE8_DOM_DEFINE) try {
                return gOPD(O, P);
            } catch (e) {}
            if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
        };
    }, {
        "./_descriptors": 63,
        "./_has": 71,
        "./_ie8-dom-define": 74,
        "./_object-pie": 101,
        "./_property-desc": 103,
        "./_to-iobject": 116,
        "./_to-primitive": 119
    } ],
    95: [ function(require, module, exports) {
        var toIObject = require("./_to-iobject"), gOPN = require("./_object-gopn").f, toString = {}.toString, windowNames = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], getWindowNames = function(it) {
            try {
                return gOPN(it);
            } catch (e) {
                return windowNames.slice();
            }
        };
        module.exports.f = function(it) {
            return windowNames && "[object Window]" == toString.call(it) ? getWindowNames(it) : gOPN(toIObject(it));
        };
    }, {
        "./_object-gopn": 96,
        "./_to-iobject": 116
    } ],
    96: [ function(require, module, exports) {
        var $keys = require("./_object-keys-internal"), hiddenKeys = require("./_enum-bug-keys").concat("length", "prototype");
        exports.f = Object.getOwnPropertyNames || function(O) {
            return $keys(O, hiddenKeys);
        };
    }, {
        "./_enum-bug-keys": 65,
        "./_object-keys-internal": 99
    } ],
    97: [ function(require, module, exports) {
        exports.f = Object.getOwnPropertySymbols;
    }, {} ],
    98: [ function(require, module, exports) {
        var has = require("./_has"), toObject = require("./_to-object"), IE_PROTO = require("./_shared-key")("IE_PROTO"), ObjectProto = Object.prototype;
        module.exports = Object.getPrototypeOf || function(O) {
            return O = toObject(O), has(O, IE_PROTO) ? O[IE_PROTO] : "function" == typeof O.constructor && O instanceof O.constructor ? O.constructor.prototype : O instanceof Object ? ObjectProto : null;
        };
    }, {
        "./_has": 71,
        "./_shared-key": 109,
        "./_to-object": 118
    } ],
    99: [ function(require, module, exports) {
        var has = require("./_has"), toIObject = require("./_to-iobject"), arrayIndexOf = require("./_array-includes")(!1), IE_PROTO = require("./_shared-key")("IE_PROTO");
        module.exports = function(object, names) {
            var key, O = toIObject(object), i = 0, result = [];
            for (key in O) key != IE_PROTO && has(O, key) && result.push(key);
            for (;names.length > i; ) has(O, key = names[i++]) && (~arrayIndexOf(result, key) || result.push(key));
            return result;
        };
    }, {
        "./_array-includes": 56,
        "./_has": 71,
        "./_shared-key": 109,
        "./_to-iobject": 116
    } ],
    100: [ function(require, module, exports) {
        var $keys = require("./_object-keys-internal"), enumBugKeys = require("./_enum-bug-keys");
        module.exports = Object.keys || function(O) {
            return $keys(O, enumBugKeys);
        };
    }, {
        "./_enum-bug-keys": 65,
        "./_object-keys-internal": 99
    } ],
    101: [ function(require, module, exports) {
        exports.f = {}.propertyIsEnumerable;
    }, {} ],
    102: [ function(require, module, exports) {
        var $export = require("./_export"), core = require("./_core"), fails = require("./_fails");
        module.exports = function(KEY, exec) {
            var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
            exp[KEY] = exec(fn), $export($export.S + $export.F * fails(function() {
                fn(1);
            }), "Object", exp);
        };
    }, {
        "./_core": 59,
        "./_export": 67,
        "./_fails": 68
    } ],
    103: [ function(require, module, exports) {
        module.exports = function(bitmap, value) {
            return {
                enumerable: !(1 & bitmap),
                configurable: !(2 & bitmap),
                writable: !(4 & bitmap),
                value: value
            };
        };
    }, {} ],
    104: [ function(require, module, exports) {
        var hide = require("./_hide");
        module.exports = function(target, src, safe) {
            for (var key in src) safe && target[key] ? target[key] = src[key] : hide(target, key, src[key]);
            return target;
        };
    }, {
        "./_hide": 72
    } ],
    105: [ function(require, module, exports) {
        module.exports = require("./_hide");
    }, {
        "./_hide": 72
    } ],
    106: [ function(require, module, exports) {
        var isObject = require("./_is-object"), anObject = require("./_an-object"), check = function(O, proto) {
            if (anObject(O), !isObject(proto) && null !== proto) throw TypeError(proto + ": can't set as prototype!");
        };
        module.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? function(test, buggy, set) {
                try {
                    set = require("./_ctx")(Function.call, require("./_object-gopd").f(Object.prototype, "__proto__").set, 2), 
                    set(test, []), buggy = !(test instanceof Array);
                } catch (e) {
                    buggy = !0;
                }
                return function(O, proto) {
                    return check(O, proto), buggy ? O.__proto__ = proto : set(O, proto), O;
                };
            }({}, !1) : void 0),
            check: check
        };
    }, {
        "./_an-object": 55,
        "./_ctx": 61,
        "./_is-object": 79,
        "./_object-gopd": 94
    } ],
    107: [ function(require, module, exports) {
        "use strict";
        var global = require("./_global"), core = require("./_core"), dP = require("./_object-dp"), DESCRIPTORS = require("./_descriptors"), SPECIES = require("./_wks")("species");
        module.exports = function(KEY) {
            var C = "function" == typeof core[KEY] ? core[KEY] : global[KEY];
            DESCRIPTORS && C && !C[SPECIES] && dP.f(C, SPECIES, {
                configurable: !0,
                get: function() {
                    return this;
                }
            });
        };
    }, {
        "./_core": 59,
        "./_descriptors": 63,
        "./_global": 70,
        "./_object-dp": 92,
        "./_wks": 123
    } ],
    108: [ function(require, module, exports) {
        var def = require("./_object-dp").f, has = require("./_has"), TAG = require("./_wks")("toStringTag");
        module.exports = function(it, tag, stat) {
            it && !has(it = stat ? it : it.prototype, TAG) && def(it, TAG, {
                configurable: !0,
                value: tag
            });
        };
    }, {
        "./_has": 71,
        "./_object-dp": 92,
        "./_wks": 123
    } ],
    109: [ function(require, module, exports) {
        var shared = require("./_shared")("keys"), uid = require("./_uid");
        module.exports = function(key) {
            return shared[key] || (shared[key] = uid(key));
        };
    }, {
        "./_shared": 110,
        "./_uid": 120
    } ],
    110: [ function(require, module, exports) {
        var global = require("./_global"), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
        module.exports = function(key) {
            return store[key] || (store[key] = {});
        };
    }, {
        "./_global": 70
    } ],
    111: [ function(require, module, exports) {
        var anObject = require("./_an-object"), aFunction = require("./_a-function"), SPECIES = require("./_wks")("species");
        module.exports = function(O, D) {
            var S, C = anObject(O).constructor;
            return void 0 === C || void 0 == (S = anObject(C)[SPECIES]) ? D : aFunction(S);
        };
    }, {
        "./_a-function": 52,
        "./_an-object": 55,
        "./_wks": 123
    } ],
    112: [ function(require, module, exports) {
        var toInteger = require("./_to-integer"), defined = require("./_defined");
        module.exports = function(TO_STRING) {
            return function(that, pos) {
                var a, b, s = String(defined(that)), i = toInteger(pos), l = s.length;
                return i < 0 || i >= l ? TO_STRING ? "" : void 0 : (a = s.charCodeAt(i), a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536);
            };
        };
    }, {
        "./_defined": 62,
        "./_to-integer": 115
    } ],
    113: [ function(require, module, exports) {
        var defer, channel, port, ctx = require("./_ctx"), invoke = require("./_invoke"), html = require("./_html"), cel = require("./_dom-create"), global = require("./_global"), process = global.process, setTask = global.setImmediate, clearTask = global.clearImmediate, MessageChannel = global.MessageChannel, counter = 0, queue = {}, ONREADYSTATECHANGE = "onreadystatechange", run = function() {
            var id = +this;
            if (queue.hasOwnProperty(id)) {
                var fn = queue[id];
                delete queue[id], fn();
            }
        }, listener = function(event) {
            run.call(event.data);
        };
        setTask && clearTask || (setTask = function(fn) {
            for (var args = [], i = 1; arguments.length > i; ) args.push(arguments[i++]);
            return queue[++counter] = function() {
                invoke("function" == typeof fn ? fn : Function(fn), args);
            }, defer(counter), counter;
        }, clearTask = function(id) {
            delete queue[id];
        }, "process" == require("./_cof")(process) ? defer = function(id) {
            process.nextTick(ctx(run, id, 1));
        } : MessageChannel ? (channel = new MessageChannel(), port = channel.port2, channel.port1.onmessage = listener, 
        defer = ctx(port.postMessage, port, 1)) : global.addEventListener && "function" == typeof postMessage && !global.importScripts ? (defer = function(id) {
            global.postMessage(id + "", "*");
        }, global.addEventListener("message", listener, !1)) : defer = ONREADYSTATECHANGE in cel("script") ? function(id) {
            html.appendChild(cel("script"))[ONREADYSTATECHANGE] = function() {
                html.removeChild(this), run.call(id);
            };
        } : function(id) {
            setTimeout(ctx(run, id, 1), 0);
        }), module.exports = {
            set: setTask,
            clear: clearTask
        };
    }, {
        "./_cof": 58,
        "./_ctx": 61,
        "./_dom-create": 64,
        "./_global": 70,
        "./_html": 73,
        "./_invoke": 75
    } ],
    114: [ function(require, module, exports) {
        var toInteger = require("./_to-integer"), max = Math.max, min = Math.min;
        module.exports = function(index, length) {
            return index = toInteger(index), index < 0 ? max(index + length, 0) : min(index, length);
        };
    }, {
        "./_to-integer": 115
    } ],
    115: [ function(require, module, exports) {
        var ceil = Math.ceil, floor = Math.floor;
        module.exports = function(it) {
            return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        };
    }, {} ],
    116: [ function(require, module, exports) {
        var IObject = require("./_iobject"), defined = require("./_defined");
        module.exports = function(it) {
            return IObject(defined(it));
        };
    }, {
        "./_defined": 62,
        "./_iobject": 76
    } ],
    117: [ function(require, module, exports) {
        var toInteger = require("./_to-integer"), min = Math.min;
        module.exports = function(it) {
            return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
        };
    }, {
        "./_to-integer": 115
    } ],
    118: [ function(require, module, exports) {
        var defined = require("./_defined");
        module.exports = function(it) {
            return Object(defined(it));
        };
    }, {
        "./_defined": 62
    } ],
    119: [ function(require, module, exports) {
        var isObject = require("./_is-object");
        module.exports = function(it, S) {
            if (!isObject(it)) return it;
            var fn, val;
            if (S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            if ("function" == typeof (fn = it.valueOf) && !isObject(val = fn.call(it))) return val;
            if (!S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            throw TypeError("Can't convert object to primitive value");
        };
    }, {
        "./_is-object": 79
    } ],
    120: [ function(require, module, exports) {
        var id = 0, px = Math.random();
        module.exports = function(key) {
            return "Symbol(".concat(void 0 === key ? "" : key, ")_", (++id + px).toString(36));
        };
    }, {} ],
    121: [ function(require, module, exports) {
        var global = require("./_global"), core = require("./_core"), LIBRARY = require("./_library"), wksExt = require("./_wks-ext"), defineProperty = require("./_object-dp").f;
        module.exports = function(name) {
            var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
            "_" == name.charAt(0) || name in $Symbol || defineProperty($Symbol, name, {
                value: wksExt.f(name)
            });
        };
    }, {
        "./_core": 59,
        "./_global": 70,
        "./_library": 87,
        "./_object-dp": 92,
        "./_wks-ext": 122
    } ],
    122: [ function(require, module, exports) {
        exports.f = require("./_wks");
    }, {
        "./_wks": 123
    } ],
    123: [ function(require, module, exports) {
        var store = require("./_shared")("wks"), uid = require("./_uid"), Symbol = require("./_global").Symbol, USE_SYMBOL = "function" == typeof Symbol, $exports = module.exports = function(name) {
            return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)("Symbol." + name));
        };
        $exports.store = store;
    }, {
        "./_global": 70,
        "./_shared": 110,
        "./_uid": 120
    } ],
    124: [ function(require, module, exports) {
        var classof = require("./_classof"), ITERATOR = require("./_wks")("iterator"), Iterators = require("./_iterators");
        module.exports = require("./_core").getIteratorMethod = function(it) {
            if (void 0 != it) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
        };
    }, {
        "./_classof": 57,
        "./_core": 59,
        "./_iterators": 85,
        "./_wks": 123
    } ],
    125: [ function(require, module, exports) {
        var anObject = require("./_an-object"), get = require("./core.get-iterator-method");
        module.exports = require("./_core").getIterator = function(it) {
            var iterFn = get(it);
            if ("function" != typeof iterFn) throw TypeError(it + " is not iterable!");
            return anObject(iterFn.call(it));
        };
    }, {
        "./_an-object": 55,
        "./_core": 59,
        "./core.get-iterator-method": 124
    } ],
    126: [ function(require, module, exports) {
        var classof = require("./_classof"), ITERATOR = require("./_wks")("iterator"), Iterators = require("./_iterators");
        module.exports = require("./_core").isIterable = function(it) {
            var O = Object(it);
            return void 0 !== O[ITERATOR] || "@@iterator" in O || Iterators.hasOwnProperty(classof(O));
        };
    }, {
        "./_classof": 57,
        "./_core": 59,
        "./_iterators": 85,
        "./_wks": 123
    } ],
    127: [ function(require, module, exports) {
        "use strict";
        var ctx = require("./_ctx"), $export = require("./_export"), toObject = require("./_to-object"), call = require("./_iter-call"), isArrayIter = require("./_is-array-iter"), toLength = require("./_to-length"), createProperty = require("./_create-property"), getIterFn = require("./core.get-iterator-method");
        $export($export.S + $export.F * !require("./_iter-detect")(function(iter) {
            Array.from(iter);
        }), "Array", {
            from: function(arrayLike) {
                var length, result, step, iterator, O = toObject(arrayLike), C = "function" == typeof this ? this : Array, aLen = arguments.length, mapfn = aLen > 1 ? arguments[1] : void 0, mapping = void 0 !== mapfn, index = 0, iterFn = getIterFn(O);
                if (mapping && (mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : void 0, 2)), void 0 == iterFn || C == Array && isArrayIter(iterFn)) for (length = toLength(O.length), 
                result = new C(length); length > index; index++) createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]); else for (iterator = iterFn.call(O), 
                result = new C(); !(step = iterator.next()).done; index++) createProperty(result, index, mapping ? call(iterator, mapfn, [ step.value, index ], !0) : step.value);
                return result.length = index, result;
            }
        });
    }, {
        "./_create-property": 60,
        "./_ctx": 61,
        "./_export": 67,
        "./_is-array-iter": 77,
        "./_iter-call": 80,
        "./_iter-detect": 83,
        "./_to-length": 117,
        "./_to-object": 118,
        "./core.get-iterator-method": 124
    } ],
    128: [ function(require, module, exports) {
        "use strict";
        var addToUnscopables = require("./_add-to-unscopables"), step = require("./_iter-step"), Iterators = require("./_iterators"), toIObject = require("./_to-iobject");
        module.exports = require("./_iter-define")(Array, "Array", function(iterated, kind) {
            this._t = toIObject(iterated), this._i = 0, this._k = kind;
        }, function() {
            var O = this._t, kind = this._k, index = this._i++;
            return !O || index >= O.length ? (this._t = void 0, step(1)) : "keys" == kind ? step(0, index) : "values" == kind ? step(0, O[index]) : step(0, [ index, O[index] ]);
        }, "values"), Iterators.Arguments = Iterators.Array, addToUnscopables("keys"), addToUnscopables("values"), 
        addToUnscopables("entries");
    }, {
        "./_add-to-unscopables": 53,
        "./_iter-define": 82,
        "./_iter-step": 84,
        "./_iterators": 85,
        "./_to-iobject": 116
    } ],
    129: [ function(require, module, exports) {
        var $export = require("./_export");
        $export($export.S + $export.F, "Object", {
            assign: require("./_object-assign")
        });
    }, {
        "./_export": 67,
        "./_object-assign": 90
    } ],
    130: [ function(require, module, exports) {
        var $export = require("./_export");
        $export($export.S, "Object", {
            create: require("./_object-create")
        });
    }, {
        "./_export": 67,
        "./_object-create": 91
    } ],
    131: [ function(require, module, exports) {
        var $export = require("./_export");
        $export($export.S + $export.F * !require("./_descriptors"), "Object", {
            defineProperty: require("./_object-dp").f
        });
    }, {
        "./_descriptors": 63,
        "./_export": 67,
        "./_object-dp": 92
    } ],
    132: [ function(require, module, exports) {
        var toObject = require("./_to-object"), $getPrototypeOf = require("./_object-gpo");
        require("./_object-sap")("getPrototypeOf", function() {
            return function(it) {
                return $getPrototypeOf(toObject(it));
            };
        });
    }, {
        "./_object-gpo": 98,
        "./_object-sap": 102,
        "./_to-object": 118
    } ],
    133: [ function(require, module, exports) {
        var toObject = require("./_to-object"), $keys = require("./_object-keys");
        require("./_object-sap")("keys", function() {
            return function(it) {
                return $keys(toObject(it));
            };
        });
    }, {
        "./_object-keys": 100,
        "./_object-sap": 102,
        "./_to-object": 118
    } ],
    134: [ function(require, module, exports) {
        var $export = require("./_export");
        $export($export.S, "Object", {
            setPrototypeOf: require("./_set-proto").set
        });
    }, {
        "./_export": 67,
        "./_set-proto": 106
    } ],
    135: [ function(require, module, exports) {}, {} ],
    136: [ function(require, module, exports) {
        "use strict";
        var Internal, GenericPromiseCapability, Wrapper, LIBRARY = require("./_library"), global = require("./_global"), ctx = require("./_ctx"), classof = require("./_classof"), $export = require("./_export"), isObject = require("./_is-object"), aFunction = require("./_a-function"), anInstance = require("./_an-instance"), forOf = require("./_for-of"), speciesConstructor = require("./_species-constructor"), task = require("./_task").set, microtask = require("./_microtask")(), PROMISE = "Promise", TypeError = global.TypeError, process = global.process, $Promise = global[PROMISE], process = global.process, isNode = "process" == classof(process), empty = function() {}, USE_NATIVE = !!function() {
            try {
                var promise = $Promise.resolve(1), FakePromise = (promise.constructor = {})[require("./_wks")("species")] = function(exec) {
                    exec(empty, empty);
                };
                return (isNode || "function" == typeof PromiseRejectionEvent) && promise.then(empty) instanceof FakePromise;
            } catch (e) {}
        }(), sameConstructor = function(a, b) {
            return a === b || a === $Promise && b === Wrapper;
        }, isThenable = function(it) {
            var then;
            return !(!isObject(it) || "function" != typeof (then = it.then)) && then;
        }, newPromiseCapability = function(C) {
            return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
        }, PromiseCapability = GenericPromiseCapability = function(C) {
            var resolve, reject;
            this.promise = new C(function($$resolve, $$reject) {
                if (void 0 !== resolve || void 0 !== reject) throw TypeError("Bad Promise constructor");
                resolve = $$resolve, reject = $$reject;
            }), this.resolve = aFunction(resolve), this.reject = aFunction(reject);
        }, perform = function(exec) {
            try {
                exec();
            } catch (e) {
                return {
                    error: e
                };
            }
        }, notify = function(promise, isReject) {
            if (!promise._n) {
                promise._n = !0;
                var chain = promise._c;
                microtask(function() {
                    for (var value = promise._v, ok = 1 == promise._s, i = 0, run = function(reaction) {
                        var result, then, handler = ok ? reaction.ok : reaction.fail, resolve = reaction.resolve, reject = reaction.reject, domain = reaction.domain;
                        try {
                            handler ? (ok || (2 == promise._h && onHandleUnhandled(promise), promise._h = 1), 
                            handler === !0 ? result = value : (domain && domain.enter(), result = handler(value), 
                            domain && domain.exit()), result === reaction.promise ? reject(TypeError("Promise-chain cycle")) : (then = isThenable(result)) ? then.call(result, resolve, reject) : resolve(result)) : reject(value);
                        } catch (e) {
                            reject(e);
                        }
                    }; chain.length > i; ) run(chain[i++]);
                    promise._c = [], promise._n = !1, isReject && !promise._h && onUnhandled(promise);
                });
            }
        }, onUnhandled = function(promise) {
            task.call(global, function() {
                var abrupt, handler, console, value = promise._v;
                if (isUnhandled(promise) && (abrupt = perform(function() {
                    isNode ? process.emit("unhandledRejection", value, promise) : (handler = global.onunhandledrejection) ? handler({
                        promise: promise,
                        reason: value
                    }) : (console = global.console) && console.error && console.error("Unhandled promise rejection", value);
                }), promise._h = isNode || isUnhandled(promise) ? 2 : 1), promise._a = void 0, abrupt) throw abrupt.error;
            });
        }, isUnhandled = function(promise) {
            if (1 == promise._h) return !1;
            for (var reaction, chain = promise._a || promise._c, i = 0; chain.length > i; ) if (reaction = chain[i++], 
            reaction.fail || !isUnhandled(reaction.promise)) return !1;
            return !0;
        }, onHandleUnhandled = function(promise) {
            task.call(global, function() {
                var handler;
                isNode ? process.emit("rejectionHandled", promise) : (handler = global.onrejectionhandled) && handler({
                    promise: promise,
                    reason: promise._v
                });
            });
        }, $reject = function(value) {
            var promise = this;
            promise._d || (promise._d = !0, promise = promise._w || promise, promise._v = value, 
            promise._s = 2, promise._a || (promise._a = promise._c.slice()), notify(promise, !0));
        }, $resolve = function(value) {
            var then, promise = this;
            if (!promise._d) {
                promise._d = !0, promise = promise._w || promise;
                try {
                    if (promise === value) throw TypeError("Promise can't be resolved itself");
                    (then = isThenable(value)) ? microtask(function() {
                        var wrapper = {
                            _w: promise,
                            _d: !1
                        };
                        try {
                            then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
                        } catch (e) {
                            $reject.call(wrapper, e);
                        }
                    }) : (promise._v = value, promise._s = 1, notify(promise, !1));
                } catch (e) {
                    $reject.call({
                        _w: promise,
                        _d: !1
                    }, e);
                }
            }
        };
        USE_NATIVE || ($Promise = function(executor) {
            anInstance(this, $Promise, PROMISE, "_h"), aFunction(executor), Internal.call(this);
            try {
                executor(ctx($resolve, this, 1), ctx($reject, this, 1));
            } catch (err) {
                $reject.call(this, err);
            }
        }, Internal = function(executor) {
            this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, 
            this._n = !1;
        }, Internal.prototype = require("./_redefine-all")($Promise.prototype, {
            then: function(onFulfilled, onRejected) {
                var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
                return reaction.ok = "function" != typeof onFulfilled || onFulfilled, reaction.fail = "function" == typeof onRejected && onRejected, 
                reaction.domain = isNode ? process.domain : void 0, this._c.push(reaction), this._a && this._a.push(reaction), 
                this._s && notify(this, !1), reaction.promise;
            },
            "catch": function(onRejected) {
                return this.then(void 0, onRejected);
            }
        }), PromiseCapability = function() {
            var promise = new Internal();
            this.promise = promise, this.resolve = ctx($resolve, promise, 1), this.reject = ctx($reject, promise, 1);
        }), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
            Promise: $Promise
        }), require("./_set-to-string-tag")($Promise, PROMISE), require("./_set-species")(PROMISE), 
        Wrapper = require("./_core")[PROMISE], $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
            reject: function(r) {
                var capability = newPromiseCapability(this), $$reject = capability.reject;
                return $$reject(r), capability.promise;
            }
        }), $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
            resolve: function(x) {
                if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
                var capability = newPromiseCapability(this), $$resolve = capability.resolve;
                return $$resolve(x), capability.promise;
            }
        }), $export($export.S + $export.F * !(USE_NATIVE && require("./_iter-detect")(function(iter) {
            $Promise.all(iter)["catch"](empty);
        })), PROMISE, {
            all: function(iterable) {
                var C = this, capability = newPromiseCapability(C), resolve = capability.resolve, reject = capability.reject, abrupt = perform(function() {
                    var values = [], index = 0, remaining = 1;
                    forOf(iterable, !1, function(promise) {
                        var $index = index++, alreadyCalled = !1;
                        values.push(void 0), remaining++, C.resolve(promise).then(function(value) {
                            alreadyCalled || (alreadyCalled = !0, values[$index] = value, --remaining || resolve(values));
                        }, reject);
                    }), --remaining || resolve(values);
                });
                return abrupt && reject(abrupt.error), capability.promise;
            },
            race: function(iterable) {
                var C = this, capability = newPromiseCapability(C), reject = capability.reject, abrupt = perform(function() {
                    forOf(iterable, !1, function(promise) {
                        C.resolve(promise).then(capability.resolve, reject);
                    });
                });
                return abrupt && reject(abrupt.error), capability.promise;
            }
        });
    }, {
        "./_a-function": 52,
        "./_an-instance": 54,
        "./_classof": 57,
        "./_core": 59,
        "./_ctx": 61,
        "./_export": 67,
        "./_for-of": 69,
        "./_global": 70,
        "./_is-object": 79,
        "./_iter-detect": 83,
        "./_library": 87,
        "./_microtask": 89,
        "./_redefine-all": 104,
        "./_set-species": 107,
        "./_set-to-string-tag": 108,
        "./_species-constructor": 111,
        "./_task": 113,
        "./_wks": 123
    } ],
    137: [ function(require, module, exports) {
        "use strict";
        var $at = require("./_string-at")(!0);
        require("./_iter-define")(String, "String", function(iterated) {
            this._t = String(iterated), this._i = 0;
        }, function() {
            var point, O = this._t, index = this._i;
            return index >= O.length ? {
                value: void 0,
                done: !0
            } : (point = $at(O, index), this._i += point.length, {
                value: point,
                done: !1
            });
        });
    }, {
        "./_iter-define": 82,
        "./_string-at": 112
    } ],
    138: [ function(require, module, exports) {
        "use strict";
        var global = require("./_global"), has = require("./_has"), DESCRIPTORS = require("./_descriptors"), $export = require("./_export"), redefine = require("./_redefine"), META = require("./_meta").KEY, $fails = require("./_fails"), shared = require("./_shared"), setToStringTag = require("./_set-to-string-tag"), uid = require("./_uid"), wks = require("./_wks"), wksExt = require("./_wks-ext"), wksDefine = require("./_wks-define"), keyOf = require("./_keyof"), enumKeys = require("./_enum-keys"), isArray = require("./_is-array"), anObject = require("./_an-object"), toIObject = require("./_to-iobject"), toPrimitive = require("./_to-primitive"), createDesc = require("./_property-desc"), _create = require("./_object-create"), gOPNExt = require("./_object-gopn-ext"), $GOPD = require("./_object-gopd"), $DP = require("./_object-dp"), $keys = require("./_object-keys"), gOPD = $GOPD.f, dP = $DP.f, gOPN = gOPNExt.f, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, PROTOTYPE = "prototype", HIDDEN = wks("_hidden"), TO_PRIMITIVE = wks("toPrimitive"), isEnum = {}.propertyIsEnumerable, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), OPSymbols = shared("op-symbols"), ObjectProto = Object[PROTOTYPE], USE_NATIVE = "function" == typeof $Symbol, QObject = global.QObject, setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild, setSymbolDesc = DESCRIPTORS && $fails(function() {
            return 7 != _create(dP({}, "a", {
                get: function() {
                    return dP(this, "a", {
                        value: 7
                    }).a;
                }
            })).a;
        }) ? function(it, key, D) {
            var protoDesc = gOPD(ObjectProto, key);
            protoDesc && delete ObjectProto[key], dP(it, key, D), protoDesc && it !== ObjectProto && dP(ObjectProto, key, protoDesc);
        } : dP, wrap = function(tag) {
            var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
            return sym._k = tag, sym;
        }, isSymbol = USE_NATIVE && "symbol" == typeof $Symbol.iterator ? function(it) {
            return "symbol" == typeof it;
        } : function(it) {
            return it instanceof $Symbol;
        }, $defineProperty = function(it, key, D) {
            return it === ObjectProto && $defineProperty(OPSymbols, key, D), anObject(it), key = toPrimitive(key, !0), 
            anObject(D), has(AllSymbols, key) ? (D.enumerable ? (has(it, HIDDEN) && it[HIDDEN][key] && (it[HIDDEN][key] = !1), 
            D = _create(D, {
                enumerable: createDesc(0, !1)
            })) : (has(it, HIDDEN) || dP(it, HIDDEN, createDesc(1, {})), it[HIDDEN][key] = !0), 
            setSymbolDesc(it, key, D)) : dP(it, key, D);
        }, $defineProperties = function(it, P) {
            anObject(it);
            for (var key, keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length; l > i; ) $defineProperty(it, key = keys[i++], P[key]);
            return it;
        }, $create = function(it, P) {
            return void 0 === P ? _create(it) : $defineProperties(_create(it), P);
        }, $propertyIsEnumerable = function(key) {
            var E = isEnum.call(this, key = toPrimitive(key, !0));
            return !(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) && (!(E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]) || E);
        }, $getOwnPropertyDescriptor = function(it, key) {
            if (it = toIObject(it), key = toPrimitive(key, !0), it !== ObjectProto || !has(AllSymbols, key) || has(OPSymbols, key)) {
                var D = gOPD(it, key);
                return !D || !has(AllSymbols, key) || has(it, HIDDEN) && it[HIDDEN][key] || (D.enumerable = !0), 
                D;
            }
        }, $getOwnPropertyNames = function(it) {
            for (var key, names = gOPN(toIObject(it)), result = [], i = 0; names.length > i; ) has(AllSymbols, key = names[i++]) || key == HIDDEN || key == META || result.push(key);
            return result;
        }, $getOwnPropertySymbols = function(it) {
            for (var key, IS_OP = it === ObjectProto, names = gOPN(IS_OP ? OPSymbols : toIObject(it)), result = [], i = 0; names.length > i; ) !has(AllSymbols, key = names[i++]) || IS_OP && !has(ObjectProto, key) || result.push(AllSymbols[key]);
            return result;
        };
        USE_NATIVE || ($Symbol = function() {
            if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
            var tag = uid(arguments.length > 0 ? arguments[0] : void 0), $set = function(value) {
                this === ObjectProto && $set.call(OPSymbols, value), has(this, HIDDEN) && has(this[HIDDEN], tag) && (this[HIDDEN][tag] = !1), 
                setSymbolDesc(this, tag, createDesc(1, value));
            };
            return DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
                configurable: !0,
                set: $set
            }), wrap(tag);
        }, redefine($Symbol[PROTOTYPE], "toString", function() {
            return this._k;
        }), $GOPD.f = $getOwnPropertyDescriptor, $DP.f = $defineProperty, require("./_object-gopn").f = gOPNExt.f = $getOwnPropertyNames, 
        require("./_object-pie").f = $propertyIsEnumerable, require("./_object-gops").f = $getOwnPropertySymbols, 
        DESCRIPTORS && !require("./_library") && redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, !0), 
        wksExt.f = function(name) {
            return wrap(wks(name));
        }), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
            Symbol: $Symbol
        });
        for (var symbols = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), i = 0; symbols.length > i; ) wks(symbols[i++]);
        for (var symbols = $keys(wks.store), i = 0; symbols.length > i; ) wksDefine(symbols[i++]);
        $export($export.S + $export.F * !USE_NATIVE, "Symbol", {
            "for": function(key) {
                return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
            },
            keyFor: function(key) {
                if (isSymbol(key)) return keyOf(SymbolRegistry, key);
                throw TypeError(key + " is not a symbol!");
            },
            useSetter: function() {
                setter = !0;
            },
            useSimple: function() {
                setter = !1;
            }
        }), $export($export.S + $export.F * !USE_NATIVE, "Object", {
            create: $create,
            defineProperty: $defineProperty,
            defineProperties: $defineProperties,
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
            getOwnPropertyNames: $getOwnPropertyNames,
            getOwnPropertySymbols: $getOwnPropertySymbols
        }), $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function() {
            var S = $Symbol();
            return "[null]" != _stringify([ S ]) || "{}" != _stringify({
                a: S
            }) || "{}" != _stringify(Object(S));
        })), "JSON", {
            stringify: function(it) {
                if (void 0 !== it && !isSymbol(it)) {
                    for (var replacer, $replacer, args = [ it ], i = 1; arguments.length > i; ) args.push(arguments[i++]);
                    return replacer = args[1], "function" == typeof replacer && ($replacer = replacer), 
                    !$replacer && isArray(replacer) || (replacer = function(key, value) {
                        if ($replacer && (value = $replacer.call(this, key, value)), !isSymbol(value)) return value;
                    }), args[1] = replacer, _stringify.apply($JSON, args);
                }
            }
        }), $Symbol[PROTOTYPE][TO_PRIMITIVE] || require("./_hide")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf), 
        setToStringTag($Symbol, "Symbol"), setToStringTag(Math, "Math", !0), setToStringTag(global.JSON, "JSON", !0);
    }, {
        "./_an-object": 55,
        "./_descriptors": 63,
        "./_enum-keys": 66,
        "./_export": 67,
        "./_fails": 68,
        "./_global": 70,
        "./_has": 71,
        "./_hide": 72,
        "./_is-array": 78,
        "./_keyof": 86,
        "./_library": 87,
        "./_meta": 88,
        "./_object-create": 91,
        "./_object-dp": 92,
        "./_object-gopd": 94,
        "./_object-gopn": 96,
        "./_object-gopn-ext": 95,
        "./_object-gops": 97,
        "./_object-keys": 100,
        "./_object-pie": 101,
        "./_property-desc": 103,
        "./_redefine": 105,
        "./_set-to-string-tag": 108,
        "./_shared": 110,
        "./_to-iobject": 116,
        "./_to-primitive": 119,
        "./_uid": 120,
        "./_wks": 123,
        "./_wks-define": 121,
        "./_wks-ext": 122
    } ],
    139: [ function(require, module, exports) {
        require("./_wks-define")("asyncIterator");
    }, {
        "./_wks-define": 121
    } ],
    140: [ function(require, module, exports) {
        require("./_wks-define")("observable");
    }, {
        "./_wks-define": 121
    } ],
    141: [ function(require, module, exports) {
        require("./es6.array.iterator");
        for (var global = require("./_global"), hide = require("./_hide"), Iterators = require("./_iterators"), TO_STRING_TAG = require("./_wks")("toStringTag"), collections = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], i = 0; i < 5; i++) {
            var NAME = collections[i], Collection = global[NAME], proto = Collection && Collection.prototype;
            proto && !proto[TO_STRING_TAG] && hide(proto, TO_STRING_TAG, NAME), Iterators[NAME] = Iterators.Array;
        }
    }, {
        "./_global": 70,
        "./_hide": 72,
        "./_iterators": 85,
        "./_wks": 123,
        "./es6.array.iterator": 128
    } ],
    142: [ function(require, module, exports) {
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
            setTimeout(fun, 0);
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
            clearTimeout(marker);
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        function cleanUpNextTick() {
            draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
            queue.length && drainQueue());
        }
        function drainQueue() {
            if (!draining) {
                var timeout = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length;
                }
                currentQueue = null, draining = !1, runClearTimeout(timeout);
            }
        }
        function Item(fun, array) {
            this.fun = fun, this.array = array;
        }
        function noop() {}
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        !function() {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }();
        var currentQueue, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
        process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, 
        process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
        process.emit = noop, process.binding = function(name) {
            throw new Error("process.binding is not supported");
        }, process.cwd = function() {
            return "/";
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        }, process.umask = function() {
            return 0;
        };
    }, {} ],
    143: [ function(require, module, exports) {
        module.exports = require("./lib/effects");
    }, {
        "./lib/effects": 144
    } ],
    144: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.select = exports.cancel = exports.join = exports.fork = exports.cps = exports.apply = exports.call = exports.race = exports.put = exports.take = void 0;
        var _io = require("./internal/io");
        exports.take = _io.take, exports.put = _io.put, exports.race = _io.race, exports.call = _io.call, 
        exports.apply = _io.apply, exports.cps = _io.cps, exports.fork = _io.fork, exports.join = _io.join, 
        exports.cancel = _io.cancel, exports.select = _io.select;
    }, {
        "./internal/io": 145
    } ],
    145: [ function(require, module, exports) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        function matcher(pattern) {
            return ("*" === pattern ? matchers.wildcard : _utils.is.array(pattern) ? matchers.array : _utils.is.func(pattern) ? matchers.predicate : matchers["default"])(pattern);
        }
        function take(pattern) {
            if (arguments.length > 0 && _utils.is.undef(pattern)) throw new Error(INVALID_PATTERN);
            return effect(TAKE, _utils.is.undef(pattern) ? "*" : pattern);
        }
        function put(action) {
            return effect(PUT, action);
        }
        function race(effects) {
            return effect(RACE, effects);
        }
        function getFnCallDesc(fn, args) {
            (0, _utils.check)(fn, _utils.is.notUndef, CALL_FUNCTION_ARG_ERROR);
            var context = null;
            if (_utils.is.array(fn)) {
                var _fn = fn, _fn2 = _slicedToArray(_fn, 2);
                context = _fn2[0], fn = _fn2[1];
            } else if (fn.fn) {
                var _fn3 = fn;
                context = _fn3.context, fn = _fn3.fn;
            }
            return (0, _utils.check)(fn, _utils.is.func, CALL_FUNCTION_ARG_ERROR), {
                context: context,
                fn: fn,
                args: args
            };
        }
        function call(fn) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
            return effect(CALL, getFnCallDesc(fn, args));
        }
        function apply(context, fn) {
            var args = arguments.length <= 2 || void 0 === arguments[2] ? [] : arguments[2];
            return effect(CALL, getFnCallDesc({
                context: context,
                fn: fn
            }, args));
        }
        function cps(fn) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
            return effect(CPS, getFnCallDesc(fn, args));
        }
        function fork(fn) {
            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
            return effect(FORK, getFnCallDesc(fn, args));
        }
        function join(taskDesc) {
            if (!isForkedTask(taskDesc)) throw new Error(JOIN_ARG_ERROR);
            return effect(JOIN, taskDesc);
        }
        function cancel(taskDesc) {
            if (!isForkedTask(taskDesc)) throw new Error(CANCEL_ARG_ERROR);
            return effect(CANCEL, taskDesc);
        }
        function select(selector) {
            for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) args[_key4 - 1] = arguments[_key4];
            return 0 === arguments.length ? selector = _utils.ident : (0, _utils.check)(selector, _utils.is.func, SELECT_ARG_ERROR), 
            effect(SELECT, {
                selector: selector,
                args: args
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.asEffect = exports.SELECT_ARG_ERROR = exports.INVALID_PATTERN = exports.CANCEL_ARG_ERROR = exports.JOIN_ARG_ERROR = exports.FORK_ARG_ERROR = exports.CALL_FUNCTION_ARG_ERROR = void 0;
        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                    !i || _arr.length !== i); _n = !0) ;
                } catch (err) {
                    _d = !0, _e = err;
                } finally {
                    try {
                        !_n && _i["return"] && _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
        exports.matcher = matcher, exports.take = take, exports.put = put, exports.race = race, 
        exports.call = call, exports.apply = apply, exports.cps = cps, exports.fork = fork, 
        exports.join = join, exports.cancel = cancel, exports.select = select;
        var _utils = require("./utils"), CALL_FUNCTION_ARG_ERROR = exports.CALL_FUNCTION_ARG_ERROR = "call/cps/fork first argument must be a function, an array [context, function] or an object {context, fn}", JOIN_ARG_ERROR = (exports.FORK_ARG_ERROR = "fork first argument must be a generator function or an iterator", 
        exports.JOIN_ARG_ERROR = "join argument must be a valid task (a result of a fork)"), CANCEL_ARG_ERROR = exports.CANCEL_ARG_ERROR = "cancel argument must be a valid task (a result of a fork)", INVALID_PATTERN = exports.INVALID_PATTERN = "Invalid pattern passed to `take` (HINT: check if you didn't mispell a constant)", SELECT_ARG_ERROR = exports.SELECT_ARG_ERROR = "select first argument must be a function", IO = (0, 
        _utils.sym)("IO"), TAKE = "TAKE", PUT = "PUT", RACE = "RACE", CALL = "CALL", CPS = "CPS", FORK = "FORK", JOIN = "JOIN", CANCEL = "CANCEL", SELECT = "SELECT", effect = function(type, payload) {
            var _ref;
            return _ref = {}, _defineProperty(_ref, IO, !0), _defineProperty(_ref, type, payload), 
            _ref;
        }, matchers = {
            wildcard: function() {
                return _utils.kTrue;
            },
            "default": function(pattern) {
                return function(input) {
                    return input.type === pattern;
                };
            },
            array: function(patterns) {
                return function(input) {
                    return patterns.some(function(p) {
                        return p === input.type;
                    });
                };
            },
            predicate: function(_predicate) {
                return function(input) {
                    return _predicate(input);
                };
            }
        }, isForkedTask = function(task) {
            return task[_utils.TASK];
        };
        exports.asEffect = {
            take: function(effect) {
                return effect && effect[IO] && effect[TAKE];
            },
            put: function(effect) {
                return effect && effect[IO] && effect[PUT];
            },
            race: function(effect) {
                return effect && effect[IO] && effect[RACE];
            },
            call: function(effect) {
                return effect && effect[IO] && effect[CALL];
            },
            cps: function(effect) {
                return effect && effect[IO] && effect[CPS];
            },
            fork: function(effect) {
                return effect && effect[IO] && effect[FORK];
            },
            join: function(effect) {
                return effect && effect[IO] && effect[JOIN];
            },
            cancel: function(effect) {
                return effect && effect[IO] && effect[CANCEL];
            },
            select: function(effect) {
                return effect && effect[IO] && effect[SELECT];
            }
        };
    }, {
        "./utils": 146
    } ],
    146: [ function(require, module, exports) {
        (function(process) {
            "use strict";
            function ident(v) {
                return v;
            }
            function check(value, predicate, error) {
                if (!predicate(value)) throw new Error(error);
            }
            function remove(array, item) {
                var index = array.indexOf(item);
                index >= 0 && array.splice(index, 1);
            }
            function deferred() {
                var props = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], def = _extends({}, props), promise = new Promise(function(resolve, reject) {
                    def.resolve = resolve, def.reject = reject;
                });
                return def.promise = promise, def;
            }
            function arrayOfDeffered(length) {
                for (var arr = [], i = 0; i < length; i++) arr.push(deferred());
                return arr;
            }
            function autoInc() {
                var seed = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return function() {
                    return ++seed;
                };
            }
            function asap(action) {
                return Promise.resolve(1).then(function() {
                    return action();
                });
            }
            function warnDeprecated(msg) {
                isDev && console.warn("DEPRECATION WARNING", msg);
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            exports.ident = ident, exports.check = check, exports.remove = remove, exports.deferred = deferred, 
            exports.arrayOfDeffered = arrayOfDeffered, exports.autoInc = autoInc, exports.asap = asap, 
            exports.warnDeprecated = warnDeprecated;
            var sym = exports.sym = function(id) {
                return "@@redux-saga/" + id;
            }, TASK = exports.TASK = sym("TASK"), isDev = (exports.kTrue = function() {
                return !0;
            }, exports.noop = function() {}, exports.isDev = "undefined" != typeof process && process.env && "development" === process.env.NODE_ENV), is = exports.is = {
                undef: function(v) {
                    return null === v || void 0 === v;
                },
                notUndef: function(v) {
                    return null !== v && void 0 !== v;
                },
                func: function(f) {
                    return "function" == typeof f;
                },
                array: Array.isArray,
                promise: function(p) {
                    return p && is.func(p.then);
                },
                iterator: function(it) {
                    return it && is.func(it.next) && is.func(it["throw"]);
                },
                task: function(it) {
                    return it && it[TASK];
                }
            };
        }).call(this, require("_process"));
    }, {
        _process: 142
    } ],
    147: [ function(require, module, exports) {
        (function(global) {
            var g = "object" == typeof global ? global : "object" == typeof window ? window : "object" == typeof self ? self : this, hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0, oldRuntime = hadRuntime && g.regeneratorRuntime;
            if (g.regeneratorRuntime = void 0, module.exports = require("./runtime"), hadRuntime) g.regeneratorRuntime = oldRuntime; else try {
                delete g.regeneratorRuntime;
            } catch (e) {
                g.regeneratorRuntime = void 0;
            }
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "./runtime": 148
    } ],
    148: [ function(require, module, exports) {
        (function(process, global) {
            !function(global) {
                "use strict";
                function wrap(innerFn, outerFn, self, tryLocsList) {
                    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
                    return generator._invoke = makeInvokeMethod(innerFn, self, context), generator;
                }
                function tryCatch(fn, obj, arg) {
                    try {
                        return {
                            type: "normal",
                            arg: fn.call(obj, arg)
                        };
                    } catch (err) {
                        return {
                            type: "throw",
                            arg: err
                        };
                    }
                }
                function Generator() {}
                function GeneratorFunction() {}
                function GeneratorFunctionPrototype() {}
                function defineIteratorMethods(prototype) {
                    [ "next", "throw", "return" ].forEach(function(method) {
                        prototype[method] = function(arg) {
                            return this._invoke(method, arg);
                        };
                    });
                }
                function AsyncIterator(generator) {
                    function invoke(method, arg, resolve, reject) {
                        var record = tryCatch(generator[method], generator, arg);
                        if ("throw" !== record.type) {
                            var result = record.arg, value = result.value;
                            return value && "object" == typeof value && hasOwn.call(value, "__await") ? Promise.resolve(value.__await).then(function(value) {
                                invoke("next", value, resolve, reject);
                            }, function(err) {
                                invoke("throw", err, resolve, reject);
                            }) : Promise.resolve(value).then(function(unwrapped) {
                                result.value = unwrapped, resolve(result);
                            }, reject);
                        }
                        reject(record.arg);
                    }
                    function enqueue(method, arg) {
                        function callInvokeWithMethodAndArg() {
                            return new Promise(function(resolve, reject) {
                                invoke(method, arg, resolve, reject);
                            });
                        }
                        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
                    }
                    "object" == typeof process && process.domain && (invoke = process.domain.bind(invoke));
                    var previousPromise;
                    this._invoke = enqueue;
                }
                function makeInvokeMethod(innerFn, self, context) {
                    var state = GenStateSuspendedStart;
                    return function(method, arg) {
                        if (state === GenStateExecuting) throw new Error("Generator is already running");
                        if (state === GenStateCompleted) {
                            if ("throw" === method) throw arg;
                            return doneResult();
                        }
                        for (context.method = method, context.arg = arg; ;) {
                            var delegate = context.delegate;
                            if (delegate) {
                                var delegateResult = maybeInvokeDelegate(delegate, context);
                                if (delegateResult) {
                                    if (delegateResult === ContinueSentinel) continue;
                                    return delegateResult;
                                }
                            }
                            if ("next" === context.method) context.sent = context._sent = context.arg; else if ("throw" === context.method) {
                                if (state === GenStateSuspendedStart) throw state = GenStateCompleted, context.arg;
                                context.dispatchException(context.arg);
                            } else "return" === context.method && context.abrupt("return", context.arg);
                            state = GenStateExecuting;
                            var record = tryCatch(innerFn, self, context);
                            if ("normal" === record.type) {
                                if (state = context.done ? GenStateCompleted : GenStateSuspendedYield, record.arg === ContinueSentinel) continue;
                                return {
                                    value: record.arg,
                                    done: context.done
                                };
                            }
                            "throw" === record.type && (state = GenStateCompleted, context.method = "throw", 
                            context.arg = record.arg);
                        }
                    };
                }
                function maybeInvokeDelegate(delegate, context) {
                    var method = delegate.iterator[context.method];
                    if (method === undefined) {
                        if (context.delegate = null, "throw" === context.method) {
                            if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, 
                            maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
                            context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
                        }
                        return ContinueSentinel;
                    }
                    var record = tryCatch(method, delegate.iterator, context.arg);
                    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, 
                    context.delegate = null, ContinueSentinel;
                    var info = record.arg;
                    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, 
                    "return" !== context.method && (context.method = "next", context.arg = undefined), 
                    context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), 
                    context.delegate = null, ContinueSentinel);
                }
                function pushTryEntry(locs) {
                    var entry = {
                        tryLoc: locs[0]
                    };
                    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], 
                    entry.afterLoc = locs[3]), this.tryEntries.push(entry);
                }
                function resetTryEntry(entry) {
                    var record = entry.completion || {};
                    record.type = "normal", delete record.arg, entry.completion = record;
                }
                function Context(tryLocsList) {
                    this.tryEntries = [ {
                        tryLoc: "root"
                    } ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
                }
                function values(iterable) {
                    if (iterable) {
                        var iteratorMethod = iterable[iteratorSymbol];
                        if (iteratorMethod) return iteratorMethod.call(iterable);
                        if ("function" == typeof iterable.next) return iterable;
                        if (!isNaN(iterable.length)) {
                            var i = -1, next = function next() {
                                for (;++i < iterable.length; ) if (hasOwn.call(iterable, i)) return next.value = iterable[i], 
                                next.done = !1, next;
                                return next.value = undefined, next.done = !0, next;
                            };
                            return next.next = next;
                        }
                    }
                    return {
                        next: doneResult
                    };
                }
                function doneResult() {
                    return {
                        value: undefined,
                        done: !0
                    };
                }
                var undefined, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag", inModule = "object" == typeof module, runtime = global.regeneratorRuntime;
                if (runtime) return void (inModule && (module.exports = runtime));
                runtime = global.regeneratorRuntime = inModule ? module.exports : {}, runtime.wrap = wrap;
                var GenStateSuspendedStart = "suspendedStart", GenStateSuspendedYield = "suspendedYield", GenStateExecuting = "executing", GenStateCompleted = "completed", ContinueSentinel = {}, IteratorPrototype = {};
                IteratorPrototype[iteratorSymbol] = function() {
                    return this;
                };
                var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
                NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
                var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
                GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype, GeneratorFunctionPrototype.constructor = GeneratorFunction, 
                GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction", 
                runtime.isGeneratorFunction = function(genFun) {
                    var ctor = "function" == typeof genFun && genFun.constructor;
                    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
                }, runtime.mark = function(genFun) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, 
                    toStringTagSymbol in genFun || (genFun[toStringTagSymbol] = "GeneratorFunction")), 
                    genFun.prototype = Object.create(Gp), genFun;
                }, runtime.awrap = function(arg) {
                    return {
                        __await: arg
                    };
                }, defineIteratorMethods(AsyncIterator.prototype), runtime.AsyncIterator = AsyncIterator, 
                runtime.async = function(innerFn, outerFn, self, tryLocsList) {
                    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
                    return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
                        return result.done ? result.value : iter.next();
                    });
                }, defineIteratorMethods(Gp), Gp[toStringTagSymbol] = "Generator", Gp.toString = function() {
                    return "[object Generator]";
                }, runtime.keys = function(object) {
                    var keys = [];
                    for (var key in object) keys.push(key);
                    return keys.reverse(), function next() {
                        for (;keys.length; ) {
                            var key = keys.pop();
                            if (key in object) return next.value = key, next.done = !1, next;
                        }
                        return next.done = !0, next;
                    };
                }, runtime.values = values, Context.prototype = {
                    constructor: Context,
                    reset: function(skipTempReset) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, 
                        this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), 
                        !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
                    },
                    stop: function() {
                        this.done = !0;
                        var rootEntry = this.tryEntries[0], rootRecord = rootEntry.completion;
                        if ("throw" === rootRecord.type) throw rootRecord.arg;
                        return this.rval;
                    },
                    dispatchException: function(exception) {
                        function handle(loc, caught) {
                            return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", 
                            context.arg = undefined), !!caught;
                        }
                        if (this.done) throw exception;
                        for (var context = this, i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i], record = entry.completion;
                            if ("root" === entry.tryLoc) return handle("end");
                            if (entry.tryLoc <= this.prev) {
                                var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                                if (hasCatch && hasFinally) {
                                    if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                                    if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                                } else if (hasCatch) {
                                    if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                                } else {
                                    if (!hasFinally) throw new Error("try statement without catch or finally");
                                    if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function(type, arg) {
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i];
                            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                                var finallyEntry = entry;
                                break;
                            }
                        }
                        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
                        var record = finallyEntry ? finallyEntry.completion : {};
                        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", 
                        this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
                    },
                    complete: function(record, afterLoc) {
                        if ("throw" === record.type) throw record.arg;
                        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, 
                        this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), 
                        ContinueSentinel;
                    },
                    finish: function(finallyLoc) {
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i];
                            if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), 
                            resetTryEntry(entry), ContinueSentinel;
                        }
                    },
                    "catch": function(tryLoc) {
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i];
                            if (entry.tryLoc === tryLoc) {
                                var record = entry.completion;
                                if ("throw" === record.type) {
                                    var thrown = record.arg;
                                    resetTryEntry(entry);
                                }
                                return thrown;
                            }
                        }
                        throw new Error("illegal catch attempt");
                    },
                    delegateYield: function(iterable, resultName, nextLoc) {
                        return this.delegate = {
                            iterator: values(iterable),
                            resultName: resultName,
                            nextLoc: nextLoc
                        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
                    }
                };
            }("object" == typeof global ? global : "object" == typeof window ? window : "object" == typeof self ? self : this);
        }).call(this, require("_process"), "undefined" != typeof window ? window : {});
    }, {
        _process: 142
    } ],
    149: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), require("extension-api/globals");
        var Config = require("config");
        Config.initGlobal("chrome", "bg");
        var chrome_1 = require("extension-api/chrome"), extension_api_1 = require("extension-api"), web_extensions_1 = require("extension-api/web-extensions");
        web_extensions_1.bgPreload(), extension_api_1.initGlobalExtensionApi(chrome_1.createApi()), 
        require("universal/bg");
    }, {
        config: 153,
        "extension-api": 161,
        "extension-api/chrome": 159,
        "extension-api/globals": 160,
        "extension-api/web-extensions": 168,
        "universal/bg": 213
    } ],
    150: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var AppConfig, stdlib_1 = require("stdlib"), url_1 = require("./url"), services_1 = require("./services");
        !function(AppConfig) {
            function create(browser, env, popupUrl) {
                var felogUrl = "prod" === env ? "https://f-log-extension.grammarly.io" : "qa" === env || "dev" === env ? "https://127.0.0.1:8000" : stdlib_1.assertNever(env), gnarDomain = "prod" === env ? grammarlyProdDomain : "qa" === env || "dev" === env ? "qagr.io" : stdlib_1.assertNever(env);
                return {
                    url: url_1.UrlConfig.create(grammarlyProdDomain, felogUrl, popupUrl),
                    gnar: services_1.GnarConfig.create(browser, gnarDomain),
                    felog: services_1.FelogConfig.create(browser),
                    extensionId: forgeExtensionId
                };
            }
            var forgeExtensionId = "87677a2c52b84ad3a151a4a72f5bd3c4", grammarlyProdDomain = "grammarly.com";
            AppConfig.create = create;
        }(AppConfig = exports.AppConfig || (exports.AppConfig = {}));
    }, {
        "./services": 155,
        "./url": 157,
        stdlib: 210
    } ],
    151: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var BuildInfo, stdlib_1 = require("stdlib");
        !function(BuildInfo) {
            function create(major, minor, patch, browser, env, branch, commit) {
                var branch_ = void 0 !== branch && void 0 !== commit ? branch : "UNVERSIONED", manifestVersion = major + "." + minor + "." + patch, versionExtension = [ "prod" !== env ? env : null, branch_ !== browser ? branch_ : null ].filter(function(x) {
                    return !!x;
                }).join(".");
                return {
                    version: manifestVersion,
                    fullVersion: manifestVersion + "-" + [ browser, versionExtension ].filter(function(x) {
                        return "" !== x;
                    }).join("/"),
                    commitHash: commit,
                    gitBranch: branch
                };
            }
            function getManifestVersion(browser, context, win) {
                try {
                    switch (browser) {
                      case "safari":
                        switch (context) {
                          case "bg":
                          case "popup":
                            return win.safari.extension.displayVersion;

                          default:
                            return;
                        }

                      case "chrome":
                        return win.chrome.runtime.getManifest().version;

                      case "firefox":
                        return win.firefox.runtime.getManifest().version;

                      case "edge":
                        return win.edge.runtime.getManifest().version;

                      default:
                        return stdlib_1.assertNever(browser);
                    }
                } catch (e) {
                    return void console.error("Could not get extension version from manifest", e);
                }
            }
            BuildInfo.create = create, BuildInfo.getManifestVersion = getManifestVersion;
        }(BuildInfo = exports.BuildInfo || (exports.BuildInfo = {}));
    }, {
        stdlib: 210
    } ],
    152: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var TargetBrowser, stdlib_1 = require("stdlib");
        !function(TargetBrowser) {
            function create(x) {
                return stdlib_1.optionalStringUnion([ "chrome", "safari", "firefox", "edge" ], x);
            }
            function detect(win) {
                return win.chrome && /google/i.test(win.navigator.vendor) ? "chrome" : win.navigator.userAgent.indexOf("Firefox") !== -1 ? "firefox" : /^((?!chrome).)*safari/i.test(win.navigator.userAgent) ? "safari" : "Netscape" === win.navigator.appName && win.navigator.appVersion.indexOf("Edge") > -1 ? "edge" : void 0;
            }
            TargetBrowser.create = create, TargetBrowser.detect = detect;
        }(TargetBrowser = exports.TargetBrowser || (exports.TargetBrowser = {}));
        var TargetEnv;
        !function(TargetEnv) {
            function create(x) {
                return stdlib_1.optionalStringUnion([ "dev", "prod", "qa" ], x);
            }
            TargetEnv.create = create;
        }(TargetEnv = exports.TargetEnv || (exports.TargetEnv = {}));
        var TargetContext;
        !function(TargetContext) {
            function create(x) {
                return stdlib_1.optionalStringUnion([ "bg", "cs", "popup" ], x);
            }
            function detect(win, browser) {
                function getIsSafariPopup() {
                    try {
                        return win.safari.extension.globalPage.contentWindow !== win;
                    } catch (_) {
                        return !1;
                    }
                }
                var isBg = !!win.IS_BG, isPopup = "safari" === browser ? getIsSafariPopup() : !!win.IS_POPUP;
                return isBg ? "bg" : isPopup ? "popup" : "cs";
            }
            TargetContext.create = create, TargetContext.detect = detect;
        }(TargetContext = exports.TargetContext || (exports.TargetContext = {}));
        var BundleInfo;
        !function(BundleInfo) {
            function create(browser, env, context) {
                return {
                    browser: browser,
                    env: env,
                    context: context
                };
            }
            BundleInfo.create = create;
        }(BundleInfo = exports.BundleInfo || (exports.BundleInfo = {}));
    }, {
        stdlib: 210
    } ],
    153: [ function(require, module, exports) {
        "use strict";
        function __export(m) {
            for (var p in m) exports.hasOwnProperty(p) || (exports[p] = m[p]);
        }
        function getGlobal() {
            return global.get();
        }
        function initGlobal(browser, context, env) {
            global.init(mainConfig_1.MainConfig.create(browser, context, env || mainConfig_1.ProcessEnv.fromBrowserify())), 
            window.GR_CFG = global.get();
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), __export(require("./app")), __export(require("./build")), __export(require("./bundle")), 
        __export(require("./services")), __export(require("./system")), __export(require("./url")), 
        __export(require("./mainConfig"));
        var mainConfig_1 = require("./mainConfig"), bundle_1 = require("./bundle"), stdlib_1 = require("stdlib"), global = new stdlib_1.Global(function() {
            console.warn("Global config not initialized -- using fall back value.");
            var browser = stdlib_1.assertNonNull(bundle_1.TargetBrowser.detect(window), "runtime-detected browser type"), cfg = mainConfig_1.MainConfig.create(browser, bundle_1.TargetContext.detect(window, browser), mainConfig_1.ProcessEnv.fromBrowserify());
            return window.GR_CFG = cfg, cfg;
        });
        exports.getGlobal = getGlobal, exports.initGlobal = initGlobal;
    }, {
        "./app": 150,
        "./build": 151,
        "./bundle": 152,
        "./mainConfig": 154,
        "./services": 155,
        "./system": 156,
        "./url": 157,
        stdlib: 210
    } ],
    154: [ function(require, module, exports) {
        (function(process) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    "default": obj
                };
            }
            var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray"), _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var ProcessEnv, app_1 = require("./app"), build_1 = require("./build"), system_1 = require("./system"), bundle_1 = require("./bundle"), stdlib_1 = require("stdlib");
            !function(ProcessEnv) {
                function create(env, major_number, build_number, release_number, git_branch, git_commit, popup_url) {
                    return {
                        env: env,
                        major_number: major_number,
                        build_number: build_number,
                        release_number: release_number,
                        git_branch: git_branch,
                        git_commit: git_commit,
                        popup_url: popup_url
                    };
                }
                function fromBrowserify() {
                    return create("prod", "14", "794", "1083", process.env.GIT_BRANCH, "9a2e211e63c063be2ea48c13d2448ef885669f14", "https://s3.amazonaws.com/grammarly_neweditor/index/1.0.87-browserplugin_2.0/popup.html");
                }
                ProcessEnv.create = create, ProcessEnv.fromBrowserify = fromBrowserify;
            }(ProcessEnv = exports.ProcessEnv || (exports.ProcessEnv = {}));
            var MainConfig;
            !function(MainConfig) {
                function create(browser, context, processEnv) {
                    var env_ = void 0;
                    if (processEnv.env) {
                        var e = bundle_1.TargetEnv.create(processEnv.env);
                        void 0 !== e ? env_ = e : (console.warn("*** process.env.ENV is invalid ('" + processEnv.env + "'), assuming 'prod' env"), 
                        env_ = "prod");
                    } else console.warn("*** process.env.ENV is not defined, assuming 'prod' env"), 
                    env_ = "prod";
                    var env = stdlib_1.assertNonNull(env_, "ENV env var OR a fallback value"), processEnvVersion = [ processEnv.major_number, processEnv.build_number, processEnv.release_number ].map(stdlib_1.optionalIntString), finalVersion = void 0;
                    if (3 === processEnvVersion.length && processEnvVersion.every(function(x) {
                        return void 0 !== x;
                    })) finalVersion = processEnvVersion; else {
                        var manifestVersion = (build_1.BuildInfo.getManifestVersion(browser, context, window) || "").split(".").map(stdlib_1.optionalIntString);
                        finalVersion = 3 === manifestVersion.length && manifestVersion.every(function(x) {
                            return void 0 !== x;
                        }) ? manifestVersion : [ 4, 0, 2 ];
                    }
                    var _finalVersion = finalVersion, _finalVersion2 = (0, _slicedToArray3["default"])(_finalVersion, 3), versionMajor = _finalVersion2[0], versionMinor = _finalVersion2[1], versionPatch = _finalVersion2[2];
                    return {
                        buildInfo: build_1.BuildInfo.create(versionMajor, versionMinor, versionPatch, browser, env, processEnv.git_branch, processEnv.git_commit),
                        bundleInfo: bundle_1.BundleInfo.create(browser, env, context),
                        appConfig: app_1.AppConfig.create(browser, env, processEnv.popup_url),
                        systemInfo: system_1.SystemInfo.create(browser, window)
                    };
                }
                MainConfig.create = create;
            }(MainConfig = exports.MainConfig || (exports.MainConfig = {}));
        }).call(this, require("_process"));
    }, {
        "./app": 150,
        "./build": 151,
        "./bundle": 152,
        "./system": 156,
        _process: 142,
        "babel-runtime/helpers/slicedToArray": 34,
        stdlib: 210
    } ],
    155: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var GnarConfig, stdlib_1 = require("stdlib");
        !function(GnarConfig) {
            function create(browserType, domain) {
                return {
                    appName: stdlib_1.assertNonNull(gnarAppName[browserType], "gnar app name"),
                    url: "https://gnar." + domain,
                    domain: "." + domain
                };
            }
            var gnarAppName = {
                chrome: "chromeExt",
                firefox: "firefoxExt",
                safari: "safariExt",
                edge: "edgeExt"
            };
            GnarConfig.create = create;
        }(GnarConfig = exports.GnarConfig || (exports.GnarConfig = {}));
        var FelogConfig;
        !function(FelogConfig) {
            function create(browser) {
                return {
                    appName: stdlib_1.assertNonNull(felogAppName[browser], "felog app name")
                };
            }
            var felogAppName = {
                chrome: "extensionChrome",
                firefox: "extensionFirefox",
                safari: "extensionSafari",
                edge: "extensionEdge"
            };
            FelogConfig.create = create;
        }(FelogConfig = exports.FelogConfig || (exports.FelogConfig = {}));
    }, {
        stdlib: 210
    } ],
    156: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var BrowserInfo, bundle_1 = require("./bundle"), stdlib_1 = require("stdlib");
        !function(BrowserInfo) {
            function create(targetBrowser, win) {
                var type = bundle_1.TargetBrowser.detect(win) || "other";
                return {
                    type: type,
                    isWE: "firefox" === targetBrowser ? stdlib_1.try_(function() {
                        return !!firefox.runtime;
                    }, function(_) {
                        return !1;
                    }) : "chrome" === targetBrowser || "edge" === targetBrowser
                };
            }
            BrowserInfo.create = create;
        }(BrowserInfo = exports.BrowserInfo || (exports.BrowserInfo = {}));
        var OsInfo;
        !function(OsInfo) {
            function create(win) {
                return {
                    isWindows: win.navigator.appVersion.indexOf("Win") !== -1
                };
            }
            OsInfo.create = create;
        }(OsInfo = exports.OsInfo || (exports.OsInfo = {}));
        var SystemInfo;
        !function(SystemInfo) {
            function create(targetBrowser, win) {
                return {
                    browser: BrowserInfo.create(targetBrowser, win),
                    os: OsInfo.create(win)
                };
            }
            SystemInfo.create = create;
        }(SystemInfo = exports.SystemInfo || (exports.SystemInfo = {}));
    }, {
        "./bundle": 152,
        stdlib: 210
    } ],
    157: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var UrlConfig;
        !function(UrlConfig) {
            function create(grammarlyDomain, felogUrl, popupUrl) {
                var funnel = "https://www." + grammarlyDomain, dapi = "https://data." + grammarlyDomain, editor = "https://app." + grammarlyDomain, auth = "https://auth." + grammarlyDomain + "/v3", emailFeedback = "https://emailfeedback." + grammarlyDomain;
                return {
                    app: editor,
                    appPersonalDictionary: editor + "/profile/dictionary",
                    capi: "wss://capi." + grammarlyDomain + "/freews",
                    dapiMimic: dapi + "/api/mimic",
                    dapiProps: dapi + "/api/props",
                    editorDictionary: editor + "/profile/dictionary",
                    dictionary: "https://capi." + grammarlyDomain + "/api/defs",
                    docs: editor + "/docs",
                    docsApi: "https://dox." + grammarlyDomain + "/documents",
                    authCreatePage: auth + "/redirect-anonymous?location=" + funnel + "/after_install_page",
                    userOrAnonymous: auth + "/user/oranonymous",
                    authSignin: auth + "/login",
                    authSignup: auth + "/signup",
                    signin: funnel + "/signin",
                    signup: funnel + "/signup",
                    resetPassword: funnel + "/resetpassword",
                    saveEmailFeedback: emailFeedback + "/api/feedback/",
                    newFelog: felogUrl,
                    referral: funnel + "/referral?page=extension",
                    welcomeC: funnel + "/extension-success",
                    upgrade: funnel + "/upgrade",
                    uninstall: funnel + "/extension-uninstall",
                    terms: funnel + "/terms",
                    policy: funnel + "/privacy-policy",
                    pageConfigUrl: "https://d3cv4a9a9wh0bt.cloudfront.net/browserplugin/config.json",
                    popupUrl: popupUrl,
                    grammarlyDomain: grammarlyDomain
                };
            }
            UrlConfig.create = create;
        }(UrlConfig = exports.UrlConfig || (exports.UrlConfig = {}));
    }, {} ],
    158: [ function(require, module, exports) {
        "use strict";
        function handleChromeError(onOk, handleErr) {
            chrome.runtime.lastError ? handleErr(chrome.runtime.lastError) : onOk();
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.handleChromeError = handleChromeError;
    }, {} ],
    159: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function createApi() {
            return new ChromeApi();
        }
        var _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2), _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _getOwnPropertySymbols = (_interopRequireDefault(_defineProperty2), 
        require("babel-runtime/core-js/object/get-own-property-symbols")), _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols), __rest = function(s, e) {
            var t = {};
            for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
            if (null != s && "function" == typeof _getOwnPropertySymbols2["default"]) for (var i = 0, p = (0, 
            _getOwnPropertySymbols2["default"])(s); i < p.length; i++) e.indexOf(p[i]) < 0 && (t[p[i]] = s[p[i]]);
            return t;
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var bg_1 = require("./message/bg"), content_1 = require("./message/content"), chrome_1 = require("./tabs/chrome"), chrome_util_1 = require("./chrome-util"), web_extensions_1 = require("./web-extensions"), util_1 = require("lib/util"), stdlib_1 = require("stdlib"), ChromeContentScriptPort = function() {
            function ChromeContentScriptPort(name) {
                (0, _classCallCheck3["default"])(this, ChromeContentScriptPort), this.port = chrome.runtime.connect({
                    name: name
                });
            }
            return (0, _createClass3["default"])(ChromeContentScriptPort, [ {
                key: "onMessage",
                value: function(cb) {
                    this.port.onMessage.addListener(cb);
                }
            }, {
                key: "onDisconnect",
                value: function(cb) {
                    this.port.onDisconnect.addListener(cb);
                }
            }, {
                key: "postMessage",
                value: function(data) {
                    this.port.postMessage(data);
                }
            } ]), ChromeContentScriptPort;
        }(), ChromeBackgroundPort = function() {
            function ChromeBackgroundPort(_port) {
                (0, _classCallCheck3["default"])(this, ChromeBackgroundPort), this._port = _port, 
                this.sender = {};
                var sender = _port.sender, name = _port.name;
                this.name = name, sender && (this.sender.url = sender.url, sender.tab && sender.tab.url && sender.tab.id && (this.sender.tab = {
                    url: sender.tab.url,
                    id: sender.tab.id,
                    active: sender.tab.active
                }));
            }
            return (0, _createClass3["default"])(ChromeBackgroundPort, [ {
                key: "onMessage",
                value: function(cb) {
                    this._port.onMessage.addListener(cb);
                }
            }, {
                key: "onDisconnect",
                value: function(cb) {
                    this._port.onDisconnect.addListener(cb);
                }
            }, {
                key: "postMessage",
                value: function(data) {
                    this._port.postMessage(data);
                }
            } ]), ChromeBackgroundPort;
        }(), ChromeApi = function ChromeApi() {
            (0, _classCallCheck3["default"])(this, ChromeApi), this.tabs = new chrome_1.ChromeTabsApiImpl(), 
            this.notification = {
                kind: "web-extension",
                create: function(options) {
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        var onClicked = options.onClicked, onButtonClicked = options.onButtonClicked, opts = __rest(options, [ "onClicked", "onButtonClicked" ]), cn = chrome.notifications, id = util_1.guid();
                        cn.create(id, (0, _assign2["default"])({
                            type: "basic"
                        }, opts), function() {
                            chrome_util_1.handleChromeError(function() {
                                void 0 !== onClicked && cn.onClicked.addListener(onClicked), void 0 !== onButtonClicked && cn.onButtonClicked.addListener(onButtonClicked), 
                                resolve(id);
                            }, reject);
                        });
                    });
                },
                clear: function(id) {
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        chrome.notifications.clear(id, function(wasCleared) {
                            chrome_util_1.handleChromeError(function() {
                                return resolve(wasCleared);
                            }, reject);
                        });
                    });
                }
            }, this.cookies = {
                kind: "web-extension",
                get: function(details) {
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        return chrome.cookies.get(details, function(cookie) {
                            return chrome_util_1.handleChromeError(function() {
                                return resolve(cookie);
                            }, reject);
                        });
                    });
                },
                remove: function(details) {
                    return new _promise2["default"](function(resolve, reject) {
                        return chrome.cookies.remove(details, function() {
                            return chrome_util_1.handleChromeError(function() {
                                return resolve(null);
                            }, reject);
                        });
                    });
                },
                getAll: function(details) {
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        return chrome.cookies.getAll(details, function(cookie) {
                            return chrome_util_1.handleChromeError(function() {
                                return resolve(cookie);
                            }, reject);
                        });
                    });
                },
                set: function(details) {
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        return chrome.cookies.set(details, function(cookie) {
                            return chrome_util_1.handleChromeError(function() {
                                return resolve(cookie);
                            }, reject);
                        });
                    });
                },
                watch: function(details, cb) {
                    chrome.cookies.onChanged.addListener(function(changeInfo) {
                        var cookie = changeInfo.cookie, cause = changeInfo.cause;
                        !cookie || !cookie.name || details.path && details.path !== cookie.path || details.name !== cookie.name || details.domain && cookie.domain.indexOf(details.domain) === -1 || ("explicit" === cause && cb(cookie), 
                        "expired_overwrite" === cause && cb());
                    });
                }
            }, this.preferences = web_extensions_1.preferencesApi.windowLocalStorage, this.button = {
                kind: "web-extension",
                setBadge: function(text) {
                    chrome.browserAction.setBadgeText({
                        text: text
                    });
                },
                setIconByName: function(name) {
                    var prefix = "./src/icon/icon", postfix = name ? "-" + name : "";
                    chrome.browserAction.setIcon({
                        path: {
                            "16": prefix + "16" + postfix + ".png",
                            "32": prefix + "32" + postfix + ".png"
                        }
                    });
                },
                setBadgeBackgroundColor: function(color) {
                    chrome.browserAction.setBadgeBackgroundColor({
                        color: color
                    });
                }
            }, this.management = {
                uninstallSelf: function() {
                    chrome.management.uninstallSelf();
                }
            }, this.message = util_1.isBg() ? new bg_1.GenericBackgroundMessageApiImpl(function(cb) {
                return chrome.runtime.onConnect.addListener(function(port) {
                    return cb(new ChromeBackgroundPort(port));
                });
            }, this.tabs.getActiveTab.bind(this.tabs), this.tabs.getAllTabs.bind(this.tabs)) : new content_1.GenericContentScriptMessageApiImpl(function(name) {
                return new ChromeContentScriptPort(name);
            });
        };
        exports.createApi = createApi;
    }, {
        "./chrome-util": 158,
        "./message/bg": 163,
        "./message/content": 164,
        "./tabs/chrome": 167,
        "./web-extensions": 168,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/object/get-own-property-symbols": 22,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/helpers/defineProperty": 31,
        "lib/util": 207,
        stdlib: 210
    } ],
    160: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), window.firefox = window.browser;
        try {
            window.firefox = browser;
        } catch (e) {}
        window.edge = window.browser, window.chrome = window.chrome, exports["default"] = void 0;
    }, {} ],
    161: [ function(require, module, exports) {
        "use strict";
        function __export(m) {
            for (var p in m) exports.hasOwnProperty(p) || (exports[p] = m[p]);
        }
        function initGlobalExtensionApi(api) {
            window.extensionApi && console.warn("Extension Api init called more than once"), 
            window.extensionApi = window.extensionApi || api;
        }
        function getGlobalExtensionApi() {
            return stdlib_1.assertNonNull(window.extensionApi, "extension api was not initialized");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var stdlib_1 = require("stdlib");
        __export(require("./interface")), exports.initGlobalExtensionApi = initGlobalExtensionApi, 
        exports.getGlobalExtensionApi = getGlobalExtensionApi;
    }, {
        "./interface": 162,
        stdlib: 210
    } ],
    162: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.ports = {
            bridge: "bridge",
            background: "message:to-priv",
            broadcast: "message:to-non-priv"
        };
    }, {} ],
    163: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function bgPreload() {
            var MAX_INIT_ATTEMPTS = 4, chromeCheck = (util_1.isChrome() || util_1.isFF()) && (!chrome.extension || !chrome.tabs || !chrome.runtime || !chrome.runtime.onConnect), edgeCheck = util_1.isEdge() && (!edge.extension || !edge.tabs || !edge.runtime || !edge.runtime.onConnect);
            if (chromeCheck || edgeCheck) {
                var timesFailed = window.localStorage.getItem("bgInitFail") || "0", bgInitFail = parseInt(timesFailed, 10);
                bgInitFail > MAX_INIT_ATTEMPTS ? console.error("too many bgInitFail", bgInitFail) : (window.localStorage.setItem("bgInitFail", (bgInitFail + 1).toString()), 
                document.location.reload());
            }
        }
        function isPopup(url) {
            if (!url) return !1;
            var browser = Config.getGlobal().bundleInfo.browser, re = "firefox" === browser ? /^moz-extension:\/\/.*\/src\/popup.html$/ : "edge" === browser ? /^ms-browser-extension:\/\/.*\/src\/popup.html$/ : "chrome" === browser ? chrome && chrome.runtime && chrome.runtime.id ? new RegExp(chrome.runtime.id + "/src/popup.html") : void 0 : stdlib_1.assertNever(browser);
            return void 0 !== re && re.test(url);
        }
        var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var helpers_1 = require("./helpers"), util_1 = require("lib/util"), Config = require("config"), stdlib_1 = require("stdlib"), interface_1 = require("../interface");
        exports.SETTINGS_TAB_ID = "popup", exports.bgPreload = bgPreload;
        var GenericBackgroundMessageApiImpl = function() {
            function GenericBackgroundMessageApiImpl(onPortConnection, _getActiveTab, _getAllTabs) {
                var _this = this;
                (0, _classCallCheck3["default"])(this, GenericBackgroundMessageApiImpl), this._getActiveTab = _getActiveTab, 
                this._getAllTabs = _getAllTabs, this.kind = "background-message-api", this._callbacks = {}, 
                this._tabPorts = {
                    popup: []
                }, this._messageHelper = new helpers_1.MessageHelperImpl(), this._sendMessageToPorts = function(id, msg) {
                    var ports = _this._tabPorts[id];
                    ports && ports.forEach(function(port) {
                        return port.postMessage(msg);
                    });
                }, this.toFocused = function(type, content) {
                    return _this._getActiveTab().then(function(_ref) {
                        var id = _ref.id, url = _ref.url;
                        if (id) return isPopup(url) ? console.warn("toFocussed not allowed for popup when it open like regular tab", type, content) : void _this._sendMessageToPorts(id.toString(), {
                            type: type,
                            content: content,
                            callid: util_1.guid()
                        });
                    });
                }, this.broadcast = function(type, content) {
                    if (content) {
                        var emitTabs = function(_ref2) {
                            var id = _ref2.id, url = _ref2.url;
                            id && url && url.indexOf("chrome-extension:") === -1 && _this._sendMessageToPorts(id.toString(), {
                                type: type,
                                callid: util_1.guid(),
                                content: content
                            });
                        };
                        _this._getAllTabs().then(function(tabs) {
                            return tabs.forEach(emitTabs);
                        }), _this._tabPorts.popup && _this._tabPorts.popup.length && _this._getActiveTab().then(function(_ref3) {
                            var url = _ref3.url, active = _ref3.active;
                            emitTabs({
                                id: exports.SETTINGS_TAB_ID,
                                url: url,
                                active: active
                            });
                        });
                    }
                }, this._initPortListener = function(port) {
                    if (port.name === interface_1.ports.bridge) port.onMessage(function(msg) {
                        "message.toFocussed" === msg.method && _this.toFocused(msg.params && msg.params.type, msg.params && msg.params.content);
                    }); else if (port.name === interface_1.ports.broadcast) port.onMessage(function(message) {
                        return _this.broadcast(message.type, message.content);
                    }); else if (port.name === interface_1.ports.background) {
                        var sender = port.sender;
                        if (sender) {
                            if (sender.tab) {
                                var _sender$tab = sender.tab, id = _sender$tab.id, _url = _sender$tab.url;
                                if (id) {
                                    var ports = _this._tabPorts[id];
                                    void 0 === ports && (ports = _this._tabPorts[id] = []), ports.push(port);
                                }
                                _url && 0 === _url.indexOf("http") && _this._messageHelper.fire("tab-connected", {
                                    tab: id,
                                    url: _url
                                }), port.onDisconnect(function() {
                                    if (id) {
                                        var ports = _this._tabPorts[id];
                                        ports && ports.splice(ports.indexOf(port), 1);
                                    }
                                });
                            }
                            var url = sender.url ? sender.url : sender.tab ? sender.tab.url : "";
                            if (url && isPopup(url)) {
                                var pid = exports.SETTINGS_TAB_ID;
                                _this._tabPorts[pid] = _this._tabPorts[pid] || [], _this._tabPorts[pid].push(port), 
                                port.onDisconnect(function() {
                                    var ports = _this._tabPorts[pid];
                                    ports.splice(ports.indexOf(port), 1);
                                });
                            }
                        }
                        port.onMessage(function(message) {
                            var processMessage = function(_ref4) {
                                var callid = _ref4.callid, content = _ref4.content, type = _ref4.type;
                                _this._callbacks[callid] && (_this._callbacks[callid](content), delete _this._callbacks[callid]);
                                var reply = function(content) {
                                    return port.postMessage({
                                        content: content,
                                        callid: callid
                                    });
                                };
                                _this._messageHelper.fire(type, content, reply, sender && sender.tab ? sender.tab.id : -1);
                            };
                            "tab-connected" === message.type ? _this._getActiveTab().then(function(_ref5) {
                                var url = _ref5.url;
                                message.content = {
                                    tab: exports.SETTINGS_TAB_ID,
                                    url: url
                                }, processMessage(message);
                            }) : processMessage(message);
                        });
                    }
                }, onPortConnection(this._initPortListener);
            }
            return (0, _createClass3["default"])(GenericBackgroundMessageApiImpl, [ {
                key: "sendTo",
                value: function(tabId, type, content, callback, error) {
                    var ports = this._tabPorts[tabId];
                    if (!ports || !ports.length) return void (error && error({
                        message: "no ports on specified tabId"
                    }));
                    var msg = {
                        type: type,
                        content: content
                    };
                    callback && "function" == typeof callback && (msg.callid = util_1.guid(), this._callbacks[msg.callid] = callback), 
                    ports.forEach(function(port) {
                        return port.postMessage(msg);
                    });
                }
            }, {
                key: "listen",
                value: function(type, callback) {
                    this._messageHelper.listen(type, callback);
                }
            } ]), GenericBackgroundMessageApiImpl;
        }();
        exports.GenericBackgroundMessageApiImpl = GenericBackgroundMessageApiImpl;
    }, {
        "../interface": 162,
        "./helpers": 165,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        config: 153,
        "lib/util": 207,
        stdlib: 210
    } ],
    164: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function hacksForCompatibility() {
            window.addEventListener("update-window-size-gr", function(e) {
                function forceRepaint() {
                    document.body.appendChild(node), setTimeout(function() {
                        node.parentNode && node.parentNode.removeChild(node);
                    }, 10);
                }
                var node = document.createElement("div");
                if (node.style.height = "1px", e.detail && e.detail.force) {
                    var interval = setInterval(forceRepaint, 100);
                    setTimeout(function() {
                        return clearInterval(interval);
                    }, 405);
                }
            }, !1), window.addEventListener("close-popup-gr", function() {
                window.navigator.userAgent.indexOf("Firefox") !== -1 && window.close();
            }, !1);
        }
        var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var stdlib_1 = require("stdlib"), helpers_1 = require("./helpers"), util_1 = require("lib/util"), interface_1 = require("../interface"), GenericContentScriptMessageApiImpl = function() {
            function GenericContentScriptMessageApiImpl(createPortConnection) {
                var _this = this;
                (0, _classCallCheck3["default"])(this, GenericContentScriptMessageApiImpl), this.kind = "content-script-message-api", 
                this._callbacks = {}, this._messageHelper = new helpers_1.MessageHelperImpl(), this._proxyPortsStorage = {}, 
                this.broadcastBackground = function() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    return _this._emit(_this.backgroundPort, "bg").apply(null, args);
                }, this.broadcast = function() {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                    return _this._emit(_this.broadcastPort, "tabs").apply(null, args);
                }, this._onPortMessage = function(msg) {
                    console.log("[Messaging] extension api", "portMessage", msg);
                }, this._checkHealth = function() {
                    function clearCheckers() {
                        document.removeEventListener("grammarly:pong", alive), timeout && (clearTimeout(timeout), 
                        timeout = null), pingInterval && (clearInterval(pingInterval), pingInterval = null);
                    }
                    var PING_INTERVAL = 500, ABORT_TIMEOUT = 5e3, pingInterval = null, timeout = null, sendPing = function() {
                        return document.dispatchEvent(new CustomEvent("grammarly:ping"));
                    }, alive = function() {
                        clearCheckers();
                    }, abortByTimeout = function() {
                        [ _this.port, _this.backgroundPort, _this.broadcastPort ].forEach(function(x) {
                            x && x.removeMessageListeners && x.removeMessageListeners();
                        }), _this.port = _this.backgroundPort = _this.broadcastPort = null, clearCheckers(), 
                        document.addEventListener("grammarly:proxyports", _this._onGrammarlyResetAfterTimeout), 
                        document.dispatchEvent(new CustomEvent("grammarly:offline"));
                    };
                    return function() {
                        clearCheckers(), document.addEventListener("grammarly:pong", alive), pingInterval = window.setInterval(sendPing, PING_INTERVAL), 
                        timeout = window.setTimeout(abortByTimeout, ABORT_TIMEOUT);
                    };
                }(), this._onGrammarlyResetAfterTimeout = function() {
                    document.removeEventListener("grammarly:proxyports", _this._onGrammarlyResetAfterTimeout), 
                    _this.port = _this._initProxyPort(interface_1.ports.bridge, _this._onPortMessage, _this._checkHealth, !0), 
                    _this.backgroundPort = _this._initProxyPort(interface_1.ports.background, _this._onBgPortMessage, _this._checkHealth), 
                    _this.broadcastPort = _this._initProxyPort(interface_1.ports.broadcast, null, _this._checkHealth);
                }, this._onBgPortMessage = function(_ref) {
                    var callid = _ref.callid, content = _ref.content, type = _ref.type;
                    _this._callbacks[callid] ? (_this._callbacks[callid](content), delete _this._callbacks[callid]) : _this._messageHelper.fire(type, content, function(content) {
                        if (!_this.backgroundPort) throw new Error("fail reply to bg page - connection lost");
                        _this.backgroundPort.postMessage({
                            content: content,
                            callid: callid
                        });
                    });
                }, this._initProxyPort = function(name, onMessage, onDisconnect) {
                    var isCheckHealth = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], port = _this._proxyPort(name);
                    return isCheckHealth && _this._checkHealth(), onMessage && port.onMessage(onMessage), 
                    onDisconnect && port.onDisconnect(onDisconnect), port;
                }, this._emit = function(port, name) {
                    return function(type, content, callback, error) {
                        var callid = util_1.guid();
                        callback && "function" == typeof callback && (_this._callbacks[callid] = callback);
                        try {
                            if (!port) throw new Error("lost connection to " + name + " port");
                            port.postMessage({
                                type: type,
                                callid: callid,
                                content: content
                            });
                        } catch (e) {
                            if (!error) throw e;
                            error(e);
                        }
                    };
                }, this._proxyPort = function(name) {
                    _this._proxyPortsStorage[name] = {};
                    var process = function(type, e) {
                        var data = e.detail;
                        if (data.name === name) {
                            var cb = _this._proxyPortsStorage[name][type];
                            cb && cb(data.msg);
                        }
                    }, successProccess = function(e) {
                        return process("success", e);
                    }, errorProccess = function(e) {
                        return process("error", e);
                    };
                    return document.addEventListener("grammarly:message", successProccess), document.addEventListener("grammarly:error", errorProccess), 
                    {
                        postMessage: function() {
                            var data = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, detail = {
                                data: data,
                                name: name
                            };
                            return document.dispatchEvent(new CustomEvent("grammarly:action", {
                                detail: detail
                            }));
                        },
                        onMessage: function(cb) {
                            _this._proxyPortsStorage[name].success = cb;
                        },
                        onDisconnect: function(cb) {
                            _this._proxyPortsStorage[name].error = cb;
                        },
                        removeMessageListeners: function() {
                            document.removeEventListener("grammarly:message", successProccess), document.removeEventListener("grammarly:error", errorProccess);
                        }
                    };
                }, this.port = createPortConnection(interface_1.ports.bridge), this.port.onMessage(this._onPortMessage), 
                this.port.onDisconnect(function() {
                    _this.port = null, _this.port = _this._initProxyPort(interface_1.ports.bridge, _this._onPortMessage, _this._checkHealth, !0);
                }), this.backgroundPort = createPortConnection(interface_1.ports.background), this.backgroundPort.onMessage(this._onBgPortMessage), 
                this.backgroundPort.onDisconnect(function() {
                    _this.backgroundPort = null, _this.backgroundPort = _this._initProxyPort(interface_1.ports.background, _this._onBgPortMessage, _this._checkHealth);
                }), this.broadcastPort = createPortConnection(interface_1.ports.broadcast), this.broadcastPort.onDisconnect(function() {
                    _this.broadcastPort = null, _this.broadcastPort = _this._initProxyPort(interface_1.ports.broadcast, null, _this._checkHealth);
                });
            }
            return (0, _createClass3["default"])(GenericContentScriptMessageApiImpl, [ {
                key: "listen",
                value: function(type, callback) {
                    this._messageHelper.listen(type, callback);
                }
            }, {
                key: "toFocused",
                value: function(type, content) {
                    var _this2 = this;
                    return stdlib_1.SafePromise.create(function(resolve) {
                        if (!_this2.port) throw new Error("lost connection to bg page");
                        _this2.port.postMessage({
                            method: "message.toFocussed",
                            params: {
                                type: type,
                                content: content
                            }
                        }), resolve();
                    });
                }
            } ]), GenericContentScriptMessageApiImpl;
        }();
        exports.GenericContentScriptMessageApiImpl = GenericContentScriptMessageApiImpl, 
        exports.hacksForCompatibility = hacksForCompatibility;
    }, {
        "../interface": 162,
        "./helpers": 165,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "lib/util": 207,
        stdlib: 210
    } ],
    165: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function getSafariActiveTab() {
            return safari.application.activeBrowserWindow && safari.application.activeBrowserWindow.activeTab;
        }
        function getSafariActiveTabUrl() {
            var activeTab = getSafariActiveTab();
            return activeTab && activeTab.url || "http://newtab";
        }
        function emitter() {
            function emit(type, data, callback) {
                var listeners = callbacks[type];
                listeners ? listeners.forEach(function(cb) {
                    return cb(data, callback);
                }) : (messageBuffer[type] || (messageBuffer[type] = []), messageBuffer[type].push({
                    data: data,
                    callback: callback
                }));
            }
            function on(type, cb) {
                callbacks[type] || (callbacks[type] = []), callbacks[type].push(cb), messageBuffer[type] && messageBuffer[type].forEach(function(msg) {
                    return cb(msg.data, msg.callback);
                });
            }
            var callbacks = {}, messageBuffer = {};
            return {
                emit: emit,
                on: on
            };
        }
        var _getIterator2 = require("babel-runtime/core-js/get-iterator"), _getIterator3 = _interopRequireDefault(_getIterator2), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var config_1 = require("lib/config"), _f = function() {}, MessageHelperImpl = function MessageHelperImpl() {
            var _this = this;
            (0, _classCallCheck3["default"])(this, MessageHelperImpl), this._listeners = {}, 
            this._queue = {}, this.fire = function(type, content) {
                var callback = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : _f, sender = arguments[3], listeners = _this._listeners[type] || [];
                listeners.length ? listeners.forEach(function(fn) {
                    return fn(content, callback, sender);
                }) : (_this._queue[type] = _this._queue[type] || [], _this._queue[type].push({
                    content: content,
                    callback: callback,
                    sender: sender
                }));
            }, this.unlisten = function(type, cb) {
                var listeners = _this._listeners[type] || [], index = listeners.indexOf(cb);
                index !== -1 && (1 === listeners.length ? delete _this._listeners[type] : listeners.splice(index, 1));
            }, this.listenOnce = function(type, callback) {
                var listener = function listener(data, reply, sender) {
                    _this.unlisten(type, listener), callback && callback(data, reply, sender);
                };
                _this.listen(type, listener);
            }, this.listen = function(type, callback) {
                _this._listeners[type] = _this._listeners[type] || [], _this._listeners[type].indexOf(callback) === -1 && _this._listeners[type].push(callback);
                var queue = _this._queue[type] || [];
                if (queue.length) {
                    var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
                    try {
                        for (var _step, _iterator = (0, _getIterator3["default"])(queue); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                            var item = _step.value;
                            try {
                                callback(item.content, item.callback, item.sender);
                            } catch (e) {
                                console.error("exception during proccesing buffered messages", e);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = !0, _iteratorError = err;
                    } finally {
                        try {
                            !_iteratorNormalCompletion && _iterator["return"] && _iterator["return"]();
                        } finally {
                            if (_didIteratorError) throw _iteratorError;
                        }
                    }
                    delete _this._queue[type];
                }
            };
        };
        exports.MessageHelperImpl = MessageHelperImpl, exports.safariBridgeId = "forge-bridge" + config_1.getUuid(), 
        exports.getSafariActiveTab = getSafariActiveTab, exports.getSafariActiveTabUrl = getSafariActiveTabUrl, 
        exports.emitter = emitter;
    }, {
        "babel-runtime/core-js/get-iterator": 16,
        "babel-runtime/helpers/classCallCheck": 29,
        "lib/config": 179
    } ],
    166: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function createMigrationAwareApi(api, preserveValue) {
            return {
                get: api.get.bind(api),
                set: api.set.bind(api),
                getAll: api.getAll.bind(api),
                remove: api.remove.bind(api),
                removeAll: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                        var all;
                        return _regenerator2["default"].wrap(function(_context) {
                            for (;;) switch (_context.prev = _context.next) {
                              case 0:
                                return _context.next = 2, api.getAll();

                              case 2:
                                return all = _context.sent, _context.next = 5, api.removeAll();

                              case 5:
                                return _context.next = 7, _promise2["default"].all((0, _keys2["default"])(all).filter(preserveValue).map(function(k) {
                                    return api.set(k, all[k]);
                                }));

                              case 7:
                              case "end":
                                return _context.stop();
                            }
                        }, _callee, this);
                    }));
                }
            };
        }
        var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2), _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var StorageMigrationResult, stdlib_1 = require("stdlib"), lodash_1 = require("lodash");
        !function(StorageMigrationResult) {
            StorageMigrationResult[StorageMigrationResult.success = 0] = "success", StorageMigrationResult[StorageMigrationResult.successWithEmpty = 1] = "successWithEmpty", 
            StorageMigrationResult[StorageMigrationResult.alreadyMigrated = 2] = "alreadyMigrated";
        }(StorageMigrationResult = exports.StorageMigrationResult || (exports.StorageMigrationResult = {}));
        var InternalStorageMigrationResult;
        !function(InternalStorageMigrationResult) {
            InternalStorageMigrationResult[InternalStorageMigrationResult.nonEmptyMigration = 0] = "nonEmptyMigration", 
            InternalStorageMigrationResult[InternalStorageMigrationResult.emptyMigration = 1] = "emptyMigration";
        }(InternalStorageMigrationResult || (InternalStorageMigrationResult = {})), exports.createMigrationAwareApi = createMigrationAwareApi;
        var StorageMigration = function() {
            function StorageMigration(_name, _source, _destination) {
                var _this = this, _destValuesToKeep = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
                (0, _classCallCheck3["default"])(this, StorageMigration), this._name = _name, this._source = _source, 
                this._destination = _destination, this._destValuesToKeep = _destValuesToKeep, this._migrationFlagSuccessfulValue = "ok", 
                this._migrationFlagUniqueKey = "104ccd8c-9919-9ae4-931f-782fb197486c", this._migrationFlagKey = "__migration-" + this._migrationFlagUniqueKey + ":(" + this._name + ")", 
                this._migrationInProgress = !1, this.migrationAwareDestination = createMigrationAwareApi(this._destination, function(k) {
                    return k === _this._migrationFlagKey;
                });
            }
            return (0, _createClass3["default"])(StorageMigration, [ {
                key: "_getMigrated",
                value: function() {
                    var _this2 = this;
                    return this._destination.get(this._migrationFlagKey).then(function(x) {
                        return x === _this2._migrationFlagSuccessfulValue;
                    });
                }
            }, {
                key: "_setMigrated",
                value: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                        var actualStatus;
                        return _regenerator2["default"].wrap(function(_context2) {
                            for (;;) switch (_context2.prev = _context2.next) {
                              case 0:
                                return _context2.next = 2, this._destination.set(this._migrationFlagKey, this._migrationFlagSuccessfulValue);

                              case 2:
                                return _context2.next = 4, this._destination.get(this._migrationFlagKey);

                              case 4:
                                if (actualStatus = _context2.sent, actualStatus === this._migrationFlagSuccessfulValue) {
                                    _context2.next = 7;
                                    break;
                                }
                                throw new Error("Could not verify status write, actual value: " + actualStatus);

                              case 7:
                              case "end":
                                return _context2.stop();
                            }
                        }, _callee2, this);
                    }));
                }
            }, {
                key: "_runMigration",
                value: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee3() {
                        var payload, sourceIsEmpty, _this3 = this;
                        return _regenerator2["default"].wrap(function(_context3) {
                            for (;;) switch (_context3.prev = _context3.next) {
                              case 0:
                                return stdlib_1.assert(!this._migrationInProgress, "migration already in progress"), 
                                this._migrationInProgress = !0, _context3.prev = 2, _context3.next = 5, this._source.getAll();

                              case 5:
                                return payload = _context3.sent, sourceIsEmpty = 0 === (0, _keys2["default"])(payload).length, 
                                _context3.next = 9, _promise2["default"].all(this._destValuesToKeep.map(function(k) {
                                    return _this3._destination.get(k).then(function(v) {
                                        null != v && (payload[k] = v);
                                    });
                                }));

                              case 9:
                                return _context3.next = 11, this._destination.removeAll();

                              case 11:
                                return _context3.next = 13, _promise2["default"].all((0, _keys2["default"])(payload).filter(function(k) {
                                    return null != payload[k];
                                }).map(function(k) {
                                    return _this3._destination.set(k, payload[k]);
                                }));

                              case 13:
                                return _context3.t0 = lodash_1, _context3.t1 = payload, _context3.next = 17, this._destination.getAll();

                              case 17:
                                if (_context3.t2 = _context3.sent, _context3.t0.isEqual.call(_context3.t0, _context3.t1, _context3.t2)) {
                                    _context3.next = 20;
                                    break;
                                }
                                throw new Error("Could not verify write");

                              case 20:
                                return this._migrationInProgress = !1, _context3.abrupt("return", sourceIsEmpty ? InternalStorageMigrationResult.emptyMigration : InternalStorageMigrationResult.nonEmptyMigration);

                              case 24:
                                throw _context3.prev = 24, _context3.t3 = _context3["catch"](2), this._migrationInProgress = !1, 
                                _context3.t3;

                              case 28:
                              case "end":
                                return _context3.stop();
                            }
                        }, _callee3, this, [ [ 2, 24 ] ]);
                    }));
                }
            }, {
                key: "ensureMigrationCompleted",
                value: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee4() {
                        var internalMigrationResult, _;
                        return _regenerator2["default"].wrap(function(_context4) {
                            for (;;) switch (_context4.prev = _context4.next) {
                              case 0:
                                return _context4.next = 2, this._getMigrated();

                              case 2:
                                if (!_context4.sent) {
                                    _context4.next = 6;
                                    break;
                                }
                                return _context4.abrupt("return", StorageMigrationResult.alreadyMigrated);

                              case 6:
                                return _context4.next = 8, this._runMigration();

                              case 8:
                                return internalMigrationResult = _context4.sent, _context4.next = 11, this._setMigrated();

                              case 11:
                                _context4.t0 = internalMigrationResult, _context4.next = _context4.t0 === InternalStorageMigrationResult.nonEmptyMigration ? 14 : _context4.t0 === InternalStorageMigrationResult.emptyMigration ? 15 : 16;
                                break;

                              case 14:
                                return _context4.abrupt("return", StorageMigrationResult.success);

                              case 15:
                                return _context4.abrupt("return", StorageMigrationResult.successWithEmpty);

                              case 16:
                                throw _ = internalMigrationResult, new Error("Match not exhaustive: " + internalMigrationResult);

                              case 18:
                              case "end":
                                return _context4.stop();
                            }
                        }, _callee4, this);
                    }));
                }
            } ]), StorageMigration;
        }();
        exports.StorageMigration = StorageMigration;
    }, {
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/regenerator": 37,
        lodash: "lodash",
        stdlib: 210
    } ],
    167: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var chrome_util_1 = require("../chrome-util"), stdlib_1 = require("stdlib"), ChromeTabsApiImpl = function() {
            function ChromeTabsApiImpl() {
                (0, _classCallCheck3["default"])(this, ChromeTabsApiImpl), this.kind = "web-extension";
            }
            return (0, _createClass3["default"])(ChromeTabsApiImpl, [ {
                key: "open",
                value: function(url, activateOnOpen) {
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        chrome.tabs.create({
                            url: url,
                            active: activateOnOpen
                        }, function(tab) {
                            chrome_util_1.handleChromeError(function() {
                                return resolve(tab);
                            }, reject);
                        });
                    });
                }
            }, {
                key: "updateCurrent",
                value: function(url) {
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        chrome.tabs.update({
                            url: url
                        }, function(tab) {
                            chrome_util_1.handleChromeError(function() {
                                return resolve(tab);
                            }, reject);
                        });
                    });
                }
            }, {
                key: "getActiveTab",
                value: function() {
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        var ct = chrome.tabs;
                        ct.query({
                            active: !0,
                            lastFocusedWindow: !0
                        }, function(tabs) {
                            chrome_util_1.handleChromeError(function() {
                                tabs && tabs.length ? resolve(tabs[0]) : ct.query({
                                    active: !0
                                }, function(tabs) {
                                    chrome_util_1.handleChromeError(function() {
                                        resolve(tabs[0]);
                                    }, reject);
                                });
                            }, reject);
                        });
                    });
                }
            }, {
                key: "getAllTabs",
                value: function() {
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        return chrome.tabs.query({}, function(tabs) {
                            return chrome_util_1.handleChromeError(function() {
                                return resolve(tabs);
                            }, reject);
                        });
                    });
                }
            }, {
                key: "getActiveTabUrl",
                value: function() {
                    var _this = this;
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        return _this.getActiveTab().then(function(tab) {
                            return chrome_util_1.handleChromeError(function() {
                                return resolve(tab && tab.url);
                            }, reject);
                        });
                    });
                }
            }, {
                key: "onActiveTabChange",
                value: function(listener, error) {
                    var _this2 = this, resolveWithCheck = function(tab) {
                        chrome_util_1.handleChromeError(function() {
                            tab && listener(tab);
                        }, error);
                    };
                    chrome.tabs.onActivated.addListener(function(activeTab) {
                        return chrome.tabs.get(activeTab.tabId, function(tab) {
                            return resolveWithCheck(tab);
                        });
                    }), chrome.tabs.onUpdated.addListener(function(tabId, reason) {
                        _this2.getActiveTab().then(function(tab) {
                            tab && tab.id === tabId && (reason.url || reason.favIconUrl || "complete" === reason.status) && chrome.tabs.get(tabId, function(active) {
                                return resolveWithCheck(active);
                            });
                        });
                    }), chrome.windows.onFocusChanged.addListener(function(windowId) {
                        return chrome.tabs.query({
                            active: !0,
                            windowId: windowId,
                            lastFocusedWindow: !0
                        }, function(tabs) {
                            return resolveWithCheck(tabs[0]);
                        });
                    }), this.getActiveTab().then(function(tab) {
                        return resolveWithCheck(tab);
                    });
                }
            }, {
                key: "reload",
                value: function(tabId) {
                    return stdlib_1.SafePromise.create(function(resolve, reject) {
                        var cb = function() {
                            return chrome_util_1.handleChromeError(function() {
                                return resolve();
                            }, reject);
                        };
                        tabId ? chrome.tabs.reload(tabId, {}, cb) : chrome.tabs.reload(cb);
                    });
                }
            } ]), ChromeTabsApiImpl;
        }();
        exports.ChromeTabsApiImpl = ChromeTabsApiImpl;
    }, {
        "../chrome-util": 158,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        stdlib: 210
    } ],
    168: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var stdlib_1 = require("stdlib"), storage_migration_1 = require("./storage-migration"), content_1 = require("./message/content");
        exports.hacksForCompatibility = content_1.hacksForCompatibility;
        var bg_1 = require("./message/bg");
        exports.bgPreload = bg_1.bgPreload;
        var preferencesApi;
        !function(preferencesApi) {
            function ensureMigrationCompleted() {
                ensureMigrationCompletedCalled = !0;
                var migrationCompletedPcs = stdlib_1.SafePromise.createCompletionSource();
                return migrationCompleted = migrationCompletedPcs.promise, migration.ensureMigrationCompleted().then(function(x) {
                    return migrationCompletedPcs.resolve(!0), _promise2["default"].resolve(x);
                }, function(err) {
                    return migrationCompletedPcs.resolve(!1), _promise2["default"].reject(err);
                });
            }
            function getMigrationAwareMethod(apiName) {
                return function() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    return stdlib_1.assert(ensureMigrationCompletedCalled === !0, "supposed to run data migration before accessing prefs with web-extensions API"), 
                    migrationCompleted.then(function(completed) {
                        var instance = completed ? migration.migrationAwareDestination : preferencesApi.windowLocalStorage;
                        return instance[apiName].apply(instance, args);
                    });
                };
            }
            preferencesApi.windowLocalStorage = {
                get: function(key) {
                    return stdlib_1.SafePromise.sync(function() {
                        return window.localStorage.getItem(key);
                    });
                },
                set: function(key, value) {
                    return stdlib_1.SafePromise.sync(function() {
                        return window.localStorage.setItem(key, value);
                    });
                },
                getAll: function() {
                    return stdlib_1.SafePromise.sync(function() {
                        var all = {};
                        return (0, _keys2["default"])(window.localStorage).forEach(function(key) {
                            all[key] = window.localStorage.getItem(key);
                        }), all;
                    });
                },
                remove: function(key) {
                    return stdlib_1.SafePromise.sync(function() {
                        return window.localStorage.removeItem(key);
                    });
                },
                removeAll: function() {
                    return stdlib_1.SafePromise.sync(function() {
                        return window.localStorage.clear();
                    });
                }
            }, preferencesApi.browserStorageLocal = {
                get: function(key) {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                        var valueObject;
                        return _regenerator2["default"].wrap(function(_context) {
                            for (;;) switch (_context.prev = _context.next) {
                              case 0:
                                return _context.next = 2, firefox.storage.local.get(key);

                              case 2:
                                return valueObject = _context.sent, _context.abrupt("return", valueObject.hasOwnProperty(key) ? valueObject[key] : null);

                              case 4:
                              case "end":
                                return _context.stop();
                            }
                        }, _callee, this);
                    }));
                },
                set: function(key, value) {
                    return firefox.storage.local.set((0, _defineProperty3["default"])({}, key, value));
                },
                getAll: function() {
                    return firefox.storage.local.get(null);
                },
                remove: function(key) {
                    return firefox.storage.local.remove(key);
                },
                removeAll: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                        return _regenerator2["default"].wrap(function(_context2) {
                            for (;;) switch (_context2.prev = _context2.next) {
                              case 0:
                                return _context2.next = 2, firefox.storage.local.clear();

                              case 2:
                              case "end":
                                return _context2.stop();
                            }
                        }, _callee2, this);
                    }));
                }
            };
            var migration = new storage_migration_1.StorageMigration("firefoxLocalStorageToExtApi", preferencesApi.windowLocalStorage, preferencesApi.browserStorageLocal, [ "version" ]), migrationCompleted = _promise2["default"].resolve(!1), ensureMigrationCompletedCalled = !1;
            preferencesApi.ensureMigrationCompleted = ensureMigrationCompleted, preferencesApi.migrationAware = {
                get: getMigrationAwareMethod("get"),
                set: getMigrationAwareMethod("set"),
                getAll: getMigrationAwareMethod("getAll"),
                remove: getMigrationAwareMethod("remove"),
                removeAll: getMigrationAwareMethod("removeAll")
            };
        }(preferencesApi = exports.preferencesApi || (exports.preferencesApi = {}));
    }, {
        "./message/bg": 163,
        "./message/content": 164,
        "./storage-migration": 166,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/defineProperty": 31,
        "babel-runtime/regenerator": 37,
        stdlib: 210
    } ],
    169: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function api(store, auth, actions, prefs, getSocketLog, fakeCapi, extensionApi) {
            var API = initAPI(store, auth, actions, prefs, getSocketLog, fakeCapi, extensionApi), messageToAPI = function(type) {
                return message.on(type, API[type]);
            };
            (0, _keys2["default"])(API).forEach(messageToAPI), offline_1.Offline(function() {
                return actions.updateConnection({
                    networkOffline: !1
                });
            }, function() {
                return actions.updateConnection({
                    networkOffline: !0
                });
            });
        }
        function initAPI(store, auth, actions, prefs, getSocketLog, fakeCapi, extensionApi) {
            var _API, _this = this, tabs = extensionApi.tabs, API = (extensionApi.management, 
            _API = {
                dispatch: store.dispatch,
                signin: function(data, cb) {
                    return auth.signin(data).then(cb);
                },
                signup: function(data, cb) {
                    return auth.signup(data).then(cb);
                }
            }, (0, _defineProperty3["default"])(_API, "open-url", function(url) {
                return tabs.open(url, !0);
            }), (0, _defineProperty3["default"])(_API, "get-containerIdOrUndefined", function(_, cb) {
                bgonly_1.getContainerIdOrUndefined().then(cb);
            }), (0, _defineProperty3["default"])(_API, "external:changed-plan", function() {
                tracking.logger.externalChangePlan(), actions.sessionInvalidate("changed-plan");
            }), (0, _defineProperty3["default"])(_API, "external:changed-dialect", function() {
                tracking.logger.externalChangeDialect(), actions.sessionInvalidate("changed-dialect");
            }), (0, _defineProperty3["default"])(_API, "external:changed-user", function() {
                tracking.logger.externalChangeUser(), actions.sessionInvalidate("changed-user");
            }), (0, _defineProperty3["default"])(_API, "external:editor-fix", function() {
                actions.incFixed();
            }), (0, _defineProperty3["default"])(_API, "external:enable-email-perception", function() {
                tracking.logger.externalEnableEmailPerception(), actions.sessionInvalidate("enable-email-perception");
            }), (0, _defineProperty3["default"])(_API, "external:cleanup", function() {
                return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                    var preserve, values;
                    return _regenerator2["default"].wrap(function(_context) {
                        for (;;) switch (_context.prev = _context.next) {
                          case 0:
                            return tracking.logger.externalLogout(), preserve = [ "extensionSettings", "extensionInstallDate", "version" ], 
                            _context.next = 4, prefs.get(preserve);

                          case 4:
                            return values = _context.sent, prefs.clearAll(), _context.next = 8, prefs.set(preserve.reduce(function(obj, key) {
                                return (0, _assign2["default"])({}, obj, (0, _defineProperty3["default"])({}, key, values[key]));
                            }, {
                                enabledDefs: !1
                            }));

                          case 8:
                            actions.sessionInvalidate("logout");

                          case 9:
                          case "end":
                            return _context.stop();
                        }
                    }, _callee, this);
                }));
            }), _API);
            return API;
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var message = (require("redux-saga/effects"), require("lib/page-config/localforage"), 
        require("../message")), tracking = require("../tracking"), offline_1 = (require("../util"), 
        require("./offline")), bgonly_1 = require("../tracking/bgonly");
        require("universal/bg/state/user/reducer"), require("lib/location");
        exports.api = api, exports.initAPI = initAPI;
    }, {
        "../message": 183,
        "../tracking": 201,
        "../tracking/bgonly": 196,
        "../util": 207,
        "./offline": 178,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/defineProperty": 31,
        "babel-runtime/regenerator": 37,
        "lib/location": 182,
        "lib/page-config/localforage": 190,
        "redux-saga/effects": 143,
        "universal/bg/state/user/reducer": 235
    } ],
    170: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function runPrefsMigrations() {
            return newConfig_1.isFF() ? (console.log("Migrating preferences data..."), web_extensions_1.preferencesApi.ensureMigrationCompleted().then(function(r) {
                console.log("Preferences data migration successful!"), r === storage_migration_1.StorageMigrationResult.success && tracking_1.logger.storageMigrationSucceeded();
            }, function(err) {
                console.error("XXX Preferences migration failed"), tracking_1.logger.storageMigrationFailed(err);
            })) : _promise2["default"].resolve();
        }
        function start() {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                var prefs, dapi, connectionSagas, socketManager, reconnectSockets, settingsSagas, tabsSagas, userSagas, storeController, authSagaRunners, fakeCapi;
                return _regenerator2["default"].wrap(function(_context) {
                    for (;;) switch (_context.prev = _context.next) {
                      case 0:
                        return prefs = new prefs_1.PrefsImpl(extensionApi.preferences), dapi = new dapi_1.DapiImpl(request_1.fetch), 
                        _context.next = 4, runPrefsMigrations();

                      case 4:
                        return connectionSagas = new sagas_1.ConnectionSagas(prefs, message_1.emitTabs, tracking_1.logger, util_2.isIncognito, util_2.getNextPingDate), 
                        socketManager = void 0, reconnectSockets = function(dialect) {
                            socketManager && socketManager.reconnectAll(dialect);
                        }, settingsSagas = new sagas_2.SettingsSagas(prefs, dapi, reconnectSockets, message_1.emitFocusedTab), 
                        tabsSagas = new sagas_4.TabsSagas(connectionSagas, message_1.emitTo, message_1.emitFocusedTab, cookiesHelper.getAllGrammarlyCookies, extensionApi, util_1.isChrome()), 
                        userSagas = new sagas_3.UserSagas(settingsSagas, prefs, tracking_1.logger, cookiesHelper, bgonly_1.getContainerIdOrUndefined, reconnectSockets), 
                        storeController = new store_1.StoreControllerImpl(userSagas, settingsSagas, tabsSagas, connectionSagas), 
                        authSagaRunners = new store_1.AuthSagaRunners(storeController, userSagas), profiler.track(tracking_1.initBg), 
                        fakeCapi = new socket_1.FakeCapi(), socketManager = new socket_1.BackgroundSocketManager(tracking_1.logger, function() {
                            return storeController.store.getState().connection;
                        }, storeController.actions.updateConnection, authSagaRunners.refreshUser, cookiesHelper.getToken, message, fakeCapi), 
                        profiler.track(function() {
                            return api_1.api(storeController.store, authSagaRunners, storeController.actions, prefs, socketManager.getLog, fakeCapi, extensionApi);
                        }), _context.next = 18, profiler.trackAsync(storeController.initStore);

                      case 18:
                        return _context.next = 20, profiler.trackAsync(checkUpdate, prefs, storeController.actions.seenNews, storeController.actions.showOnboarding);

                      case 20:
                        return profiler.track(function() {
                            return chrome_1.loadContentScripts(extensionApi, config_1.GRAMMARLY_DOMAIN);
                        }), profiler.track(function() {
                            return chrome_1.loadProxy(extensionApi);
                        }), trackBgStartTime(), _context.next = 25, checkBgInit(prefs);

                      case 25:
                      case "end":
                        return _context.stop();
                    }
                }, _callee, this);
            }));
        }
        function trackBgStartTime() {
            var time = timers_1.timers.stop(BG_START_TIMER);
            time > 3e4 && tracking_1.logger.bgPageInitTimeout(time);
        }
        function checkBgInit(prefs) {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                var bgFails;
                return _regenerator2["default"].wrap(function(_context2) {
                    for (;;) switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.next = 2, prefs.get("bgInitFail");

                      case 2:
                        if (bgFails = _context2.sent) {
                            _context2.next = 5;
                            break;
                        }
                        return _context2.abrupt("return");

                      case 5:
                        return tracking_1.logger.bgPageInitFail(bgFails), _context2.next = 8, prefs.set("bgInitFail", 0);

                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                }, _callee2, this);
            }));
        }
        function checkUpdate(prefs, seenNews, showOnboarding) {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee3() {
                var version, previousVersion, savedVersion, enabledDefs;
                return _regenerator2["default"].wrap(function(_context3) {
                    for (;;) switch (_context3.prev = _context3.next) {
                      case 0:
                        return version = config_1.getVersion(), _context3.next = 3, prefs.get("version");

                      case 3:
                        if (previousVersion = _context3.sent, version !== previousVersion) {
                            _context3.next = 6;
                            break;
                        }
                        return _context3.abrupt("return");

                      case 6:
                        return _context3.next = 8, prefs.set("version", version);

                      case 8:
                        return _context3.next = 10, prefs.get("version");

                      case 10:
                        if (savedVersion = _context3.sent, savedVersion === version) {
                            _context3.next = 13;
                            break;
                        }
                        return _context3.abrupt("return");

                      case 13:
                        if (previousVersion) {
                            _context3.next = 21;
                            break;
                        }
                        return _context3.next = 16, install(prefs, showOnboarding);

                      case 16:
                        return _context3.next = 18, prefs.set("enabledDefs", !1);

                      case 18:
                        seenNews(), _context3.next = 30;
                        break;

                      case 21:
                        return tracking_1.logger.extensionUpdated(version, previousVersion), tracking_1.call("gnar.track", "updated"), 
                        _context3.next = 25, prefs.get("enabledDefs");

                      case 25:
                        if (enabledDefs = _context3.sent, _.isBoolean(enabledDefs)) {
                            _context3.next = 29;
                            break;
                        }
                        return _context3.next = 29, prefs.set("enabledDefs", !0);

                      case 29:
                        try {
                            version.split(".")[0] !== previousVersion.split(".")[0] && notification.update(extensionApi);
                        } catch (error) {
                            tracking_1.logger.extensionUpdateFail(previousVersion);
                        }

                      case 30:
                      case "end":
                        return _context3.stop();
                    }
                }, _callee3, this);
            }));
        }
        function install(prefs, showOnboarding) {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee5() {
                var source, enableWelcomePageForQA, getSource, installTrack;
                return _regenerator2["default"].wrap(function(_context5) {
                    for (;;) switch (_context5.prev = _context5.next) {
                      case 0:
                        return installTrack = function(installSource) {
                            tracking_1.logger.extensionInstall(source), tracking_1.call("gnar.track", "installed", {
                                installSource: installSource
                            });
                        }, getSource = function() {
                            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee4() {
                                var url, domain, fromFunnel, fromBlog;
                                return _regenerator2["default"].wrap(function(_context4) {
                                    for (;;) switch (_context4.prev = _context4.next) {
                                      case 0:
                                        return _context4.next = 2, location_1.currentUrl(extensionApi);

                                      case 2:
                                        return url = _context4.sent, _context4.next = 5, location_1.promiseGetDomain(extensionApi);

                                      case 5:
                                        return domain = _context4.sent, fromFunnel = domain.includes(config_1.GRAMMARLY_DOMAIN), 
                                        fromBlog = url && url.includes(config_1.GRAMMARLY_DOMAIN + "/blog"), _context4.abrupt("return", fromBlog ? "blog" : fromFunnel ? "funnel" : "webstore");

                                      case 9:
                                      case "end":
                                        return _context4.stop();
                                    }
                                }, _callee4, this);
                            }));
                        }, chrome_1.loadContentScripts(extensionApi), source = "unknown", _context5.prev = 4, 
                        _context5.next = 7, getSource();

                      case 7:
                        source = _context5.sent, _context5.next = 13;
                        break;

                      case 10:
                        _context5.prev = 10, _context5.t0 = _context5["catch"](4), tracking_1.logger.cannotGetInstallSource();

                      case 13:
                        return installTrack(source), _context5.next = 16, prefs.get("enableWelcomePageForQA");

                      case 16:
                        return enableWelcomePageForQA = _context5.sent, _context5.next = 20, openWelcome("funnel" === source);

                      case 20:
                        showOnboarding();

                      case 21:
                      case "end":
                        return _context5.stop();
                    }
                }, _callee5, this, [ [ 4, 10 ] ]);
            }));
        }
        function openWelcome(funnel) {
            if (!util_1.isChrome() || !funnel) {
                var url = util_1.isChrome() ? url_1.getExtensionSuccessURL() : url_1.getAuthCreatePageURL(), tabs = extensionApi.tabs;
                return funnel ? tabs.updateCurrent(url) : tabs.open(url, !0);
            }
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), require("./isbg"), require("whatwg-fetch");
        var _ = require("lodash"), location_1 = require("../location"), util_1 = require("../util"), tracking_1 = require("../tracking"), bgonly_1 = require("../tracking/bgonly"), config_1 = require("../config"), api_1 = require("./api"), extension_api_1 = require("extension-api"), notification = require("./notification"), sagas_1 = require("universal/bg/state/connection/sagas"), sagas_2 = require("universal/bg/state/settings/sagas"), sagas_3 = require("universal/bg/state/user/sagas"), sagas_4 = require("universal/bg/state/tabs/sagas"), prefs_1 = require("universal/bg/prefs"), web_extensions_1 = require("extension-api/web-extensions"), storage_migration_1 = require("extension-api/storage-migration"), chrome_1 = require("./chrome"), newConfig_1 = require("lib/newConfig"), Config = require("config"), timers_1 = require("lib/timers"), message_1 = require("lib/message"), profiler_1 = require("lib/profiler"), cookie_1 = require("lib/bg/cookie"), request_1 = require("lib/request"), util_2 = require("universal/bg/util"), store_1 = require("universal/bg/store"), message = require("lib/message"), dapi_1 = require("lib/bg/dapi"), socket_1 = require("universal/bg/socket"), url_1 = require("lib/url"), BG_START_TIMER = "bg_start_timer", profiler = new profiler_1.Profiler(), extensionApi = extension_api_1.getGlobalExtensionApi(), cookiesHelper = new cookie_1.CookiesHelper(extensionApi);
        timers_1.timers.start(BG_START_TIMER), start()["catch"](function(error) {
            tracking_1.logger.bgPageStartFail(error && error.message, error && error.stack), 
            console.error("bg page start fail", error);
        }), chrome_1.setupForcedUpdate(), "prod" !== Config.getGlobal().bundleInfo.env && ((util_1.isChrome() || newConfig_1.isFF()) && require("./chromereload"), 
        "qa" === Config.getGlobal().bundleInfo.env && require("./console").startSendingBgLogsToActiveTab()), 
        exports.runPrefsMigrations = runPrefsMigrations;
    }, {
        "../config": 179,
        "../location": 182,
        "../tracking": 201,
        "../tracking/bgonly": 196,
        "../util": 207,
        "./api": 169,
        "./chrome": 171,
        "./chromereload": 172,
        "./console": 173,
        "./isbg": 176,
        "./notification": 177,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/regenerator": 37,
        config: 153,
        "extension-api": 161,
        "extension-api/storage-migration": 166,
        "extension-api/web-extensions": 168,
        "lib/bg/cookie": 174,
        "lib/bg/dapi": 175,
        "lib/message": 183,
        "lib/newConfig": 184,
        "lib/profiler": 193,
        "lib/request": 194,
        "lib/timers": 195,
        "lib/url": 206,
        lodash: "lodash",
        "universal/bg/prefs": 214,
        "universal/bg/socket": 216,
        "universal/bg/state/connection/sagas": 221,
        "universal/bg/state/settings/sagas": 226,
        "universal/bg/state/tabs/sagas": 231,
        "universal/bg/state/user/sagas": 236,
        "universal/bg/store": 238,
        "universal/bg/util": 239,
        "whatwg-fetch": "whatwg-fetch"
    } ],
    171: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function setupForcedUpdate() {
            !util_1.isChrome() && !util_1.isFF() || updateStarted || (chrome.runtime.onUpdateAvailable && chrome.runtime.onUpdateAvailable.addListener(function(details) {
                console.info("Detected the next extension version", details.version), tracking_1.logger.chromeForcedToUpdate(details.version), 
                updateStarted = !0;
                var willUpdateInMinutes = util_1.getRandomIntInclusive(1, UPDATE_TIMER);
                console.info("Going to update in minutes:", willUpdateInMinutes), setTimeout(chrome.runtime.reload, 60 * willUpdateInMinutes * 1e3);
            }), requestUpdateCheck());
        }
        function requestUpdateCheck() {
            chrome.runtime.requestUpdateCheck && chrome.runtime.requestUpdateCheck(function(status) {
                return "update_available" === status ? console.info("update pending...") : "no_update" === status ? console.info("no update found") : "throttled" === status ? console.info("Oops, I'm asking too frequently - I need to back off.") : void 0;
            }), setTimeout(requestUpdateCheck, 72e5);
        }
        function execJS(id, file) {
            var opts = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return id ? new _promise2["default"](function(resolve, reject) {
                return chrome.tabs.executeScript(id, (0, _assign2["default"])({
                    file: file
                }, opts), function() {
                    return util_1.chromeBgError() ? reject(util_1.chromeBgError()) : resolve();
                });
            }) : _promise2["default"].reject(util_1.chromeBgError());
        }
        function execCSS(id, file) {
            var opts = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return id ? new _promise2["default"](function(resolve, reject) {
                return chrome.tabs.insertCSS(id, (0, _assign2["default"])({
                    file: file
                }, opts), function() {
                    return util_1.chromeBgError() ? reject(util_1.chromeBgError()) : resolve();
                });
            }) : _promise2["default"].reject(util_1.chromeBgError());
        }
        function loadContentScripts(api, domain) {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                var manifest, cs, source, jsSource, cssSource, tabs, errorHandle;
                return _regenerator2["default"].wrap(function(_context) {
                    for (;;) switch (_context.prev = _context.next) {
                      case 0:
                        if (util_1.isChrome() || util_1.isFF()) {
                            _context.next = 2;
                            break;
                        }
                        return _context.abrupt("return");

                      case 2:
                        if (manifest = chrome.runtime.getManifest()) {
                            _context.next = 5;
                            break;
                        }
                        return _context.abrupt("return");

                      case 5:
                        if (cs = manifest.content_scripts) {
                            _context.next = 8;
                            break;
                        }
                        return _context.abrupt("return");

                      case 8:
                        if (source = cs.pop()) {
                            _context.next = 11;
                            break;
                        }
                        return _context.abrupt("return");

                      case 11:
                        if (jsSource = source.js, cssSource = source.css, jsSource && cssSource) {
                            _context.next = 14;
                            break;
                        }
                        return _context.abrupt("return");

                      case 14:
                        return _context.next = 16, filteredTabs(api, !0, domain);

                      case 16:
                        if (tabs = _context.sent, tabs.length) {
                            _context.next = 19;
                            break;
                        }
                        return _context.abrupt("return");

                      case 19:
                        return console.info("Load content scripts to", tabs), errorHandle = function(error, type) {
                            tracking_1.logger.chromeContentScriptLoadError(error && error.message, type), console.error("cs " + type + " loaded with error: " + error.message);
                        }, console.time("Content scripts load time"), _context.next = 24, _promise2["default"].all(tabs.map(function(_ref) {
                            var id = _ref.id;
                            return _promise2["default"].all([ jsSource.reduce(function(loader, js) {
                                return loader.then(function() {
                                    return execJS(id, js, {
                                        runAt: "document_idle"
                                    });
                                });
                            }, _promise2["default"].resolve()).then(function() {
                                return console.info("scripts loaded");
                            })["catch"](function(e) {
                                return errorHandle(e, "js");
                            }), cssSource.reduce(function(loader, css) {
                                return loader.then(function() {
                                    return execCSS(id, css, {
                                        runAt: "document_idle"
                                    });
                                });
                            }, _promise2["default"].resolve()).then(function() {
                                return console.info("css loaded");
                            })["catch"](function(e) {
                                return errorHandle(e, "css");
                            }) ]);
                        }));

                      case 24:
                        console.timeEnd("Content scripts load time");

                      case 25:
                      case "end":
                        return _context.stop();
                    }
                }, _callee, this);
            }));
        }
        function loadProxy(api) {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                var tabs, message;
                return _regenerator2["default"].wrap(function(_context2) {
                    for (;;) switch (_context2.prev = _context2.next) {
                      case 0:
                        if (util_1.isChrome()) {
                            _context2.next = 2;
                            break;
                        }
                        return _context2.abrupt("return");

                      case 2:
                        return _context2.prev = 2, _context2.next = 5, filteredTabs(api);

                      case 5:
                        return tabs = _context2.sent, _context2.next = 8, _promise2["default"].all(tabs.map(function(_ref2) {
                            var id = _ref2.id;
                            return execJS(id, "src/js/proxy.js");
                        }));

                      case 8:
                        console.info("proxy loaded on", tabs.map(function(tab) {
                            return tab.url;
                        })), _context2.next = 15;
                        break;

                      case 11:
                        _context2.prev = 11, _context2.t0 = _context2["catch"](2), message = _context2.t0 && _context2.t0.message || _context2.t0, 
                        console.error("proxy loaded with error: ", message);

                      case 15:
                      case "end":
                        return _context2.stop();
                    }
                }, _callee2, this, [ [ 2, 11 ] ]);
            }));
        }
        function checkTabDomain(_ref3) {
            var url = _ref3.url;
            if (url && 0 === url.indexOf("http")) return !!url.includes("grammarly") || page_config_1.pageConfig.get(location_1.domainFromUrl(url)).enabled;
        }
        function isNotCSLoaded(tab) {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee3() {
                var isLoaded;
                return _regenerator2["default"].wrap(function(_context3) {
                    for (;;) switch (_context3.prev = _context3.next) {
                      case 0:
                        return _context3.next = 2, new _promise2["default"](function(resolve) {
                            return tab.id && chrome.tabs.executeScript(tab.id, {
                                code: "document.body.dataset.grCSLoaded"
                            }, function(res) {
                                return resolve(res && res.pop());
                            });
                        });

                      case 2:
                        return isLoaded = _context3.sent, _context3.abrupt("return", !isLoaded && tab || void 0);

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                }, _callee3, this);
            }));
        }
        function filteredTabs(api, onlyOneInstance, domain) {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee4() {
                var tabs, allTabs, current, filterFn, t, processedTabs;
                return _regenerator2["default"].wrap(function(_context4) {
                    for (;;) switch (_context4.prev = _context4.next) {
                      case 0:
                        return tabs = api.tabs, _context4.next = 3, tabs.getAllTabs();

                      case 3:
                        return allTabs = _context4.sent, _context4.next = 6, tabs.getActiveTabUrl();

                      case 6:
                        return current = _context4.sent, filterFn = domain ? function(tab) {
                            return tab.url && tab.url.includes(domain);
                        } : checkTabDomain, t = allTabs.filter(filterFn), _context4.next = 11, _promise2["default"].all(t.map(onlyOneInstance ? isNotCSLoaded : function(tab) {
                            return _promise2["default"].resolve(tab);
                        }));

                      case 11:
                        return processedTabs = _context4.sent, _context4.abrupt("return", processedTabs.filter(function(tab) {
                            return !!tab;
                        }).sort(function(_ref4) {
                            var url = _ref4.url;
                            return url === current ? -1 : 1;
                        }));

                      case 13:
                      case "end":
                        return _context4.stop();
                    }
                }, _callee4, this);
            }));
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var tracking_1 = require("../tracking"), page_config_1 = require("../page-config"), location_1 = require("../location"), util_1 = require("../util"), UPDATE_TIMER = 20, chrome = window.chrome, updateStarted = !1;
        exports.setupForcedUpdate = setupForcedUpdate, exports.loadContentScripts = loadContentScripts, 
        exports.loadProxy = loadProxy, exports.filteredTabs = filteredTabs;
    }, {
        "../location": 182,
        "../page-config": 189,
        "../tracking": 201,
        "../util": 207,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/regenerator": 37
    } ],
    172: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray"), _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var websocket = require("@grammarly-npm/websocket"), util_1 = require("lib/util"), LIVERELOAD_HOST = "localhost:", LIVERELOAD_PORT = 35729, url = "ws://" + LIVERELOAD_HOST + LIVERELOAD_PORT + "/livereload", connection = websocket({
            url: url
        }), _window = window, chrome = _window.chrome;
        connection.on("message", function(e) {
            return e.command && "reload" === e.command && util_1.bgPageReload();
        }), connection.on("connect", function() {
            chrome.tabs.query({
                active: !0
            }, function(_ref) {
                var _ref2 = (0, _slicedToArray3["default"])(_ref, 1), _ref2$ = _ref2[0], url = _ref2$.url, id = _ref2$.id;
                return url && id && 0 === url.indexOf("http") && chrome.tabs.reload(id);
            });
        }), connection.connect();
    }, {
        "@grammarly-npm/websocket": 14,
        "babel-runtime/helpers/slicedToArray": 34,
        "lib/util": 207
    } ],
    173: [ function(require, module, exports) {
        "use strict";
        function startSendingBgLogsToActiveTab() {
            var newConsole = {};
            METHODS.forEach(function(method) {
                newConsole[method] = function() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    if ("toFocussed not allowed for popup when it open like regular tab" !== args[0]) try {
                        message.emitFocusedTab("bg-log", {
                            method: method,
                            args: args
                        });
                    } catch (e) {}
                    savedConsole[method].apply(savedConsole, args);
                };
            }), w.console = newConsole;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var message = require("../message"), METHODS = [ "log", "info", "warn", "error", "time", "timeEnd", "debug" ], w = window, savedConsole = console;
        exports.startSendingBgLogsToActiveTab = startSendingBgLogsToActiveTab;
    }, {
        "../message": 183
    } ],
    174: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var config_1 = require("lib/config"), CookiesHelper = function CookiesHelper(_api) {
            var _this = this;
            (0, _classCallCheck3["default"])(this, CookiesHelper), this._api = _api, this._rootPath = "/", 
            this._grammarlyUrl = "https://" + config_1.GRAMMARLY_DOMAIN + this._rootPath, this._grauthCookieName = "grauth", 
            this.getToken = function() {
                return _this._api.cookies.get({
                    name: _this._grauthCookieName,
                    url: _this._grammarlyUrl
                }).then(function(x) {
                    return x ? x.value : null;
                });
            }, this.watchToken = function(cb) {
                return _this._api.cookies.watch({
                    domain: config_1.GRAMMARLY_DOMAIN,
                    name: _this._grauthCookieName,
                    url: _this._grammarlyUrl,
                    path: _this._rootPath
                }, cb);
            }, this.getAllGrammarlyCookies = function() {
                return _this._api.cookies.getAll({
                    domain: config_1.GRAMMARLY_DOMAIN,
                    path: _this._rootPath
                });
            };
        };
        exports.CookiesHelper = CookiesHelper;
    }, {
        "babel-runtime/helpers/classCallCheck": 29,
        "lib/config": 179
    } ],
    175: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function parseDialect(val) {
            return checkPropValue(dialects, val);
        }
        function parseWritingType(val) {
            return checkPropValue(writingTypes, val);
        }
        function parsePrimaryLanguage(val) {
            return checkPropValue(primaryLanguages, val);
        }
        function parseGrammarSkills(val) {
            return checkPropValue(grammarSkills, val);
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var config_1 = require("lib/config"), tracking_1 = require("lib/tracking"), dialects = [ "british", "american" ], writingTypes = [ "work", "school", "otherProjects" ], primaryLanguages = [ "english", "notEnglish" ], grammarSkills = [ "beginner", "intermediate", "advanced" ], checkPropValue = function(arr, val) {
            return void 0 !== val && null !== val && arr.includes(val) ? val : null;
        };
        exports.parseDialect = parseDialect, exports.parseWritingType = parseWritingType, 
        exports.parsePrimaryLanguage = parsePrimaryLanguage, exports.parseGrammarSkills = parseGrammarSkills;
        var Property = function() {
            function Property(_key, _parser, _fetch) {
                (0, _classCallCheck3["default"])(this, Property), this._key = _key, this._parser = _parser, 
                this._fetch = _fetch;
            }
            return (0, _createClass3["default"])(Property, [ {
                key: "get",
                value: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                        var url, res;
                        return _regenerator2["default"].wrap(function(_context) {
                            for (;;) switch (_context.prev = _context.next) {
                              case 0:
                                return _context.prev = 0, url = config_1.URLS.dapiProps + "/" + this._key, _context.next = 4, 
                                this._fetch(url);

                              case 4:
                                return res = _context.sent, _context.abrupt("return", res.hasOwnProperty(this._key) ? this._parser(res[this._key]) : null);

                              case 8:
                                throw _context.prev = 8, _context.t0 = _context["catch"](0), console.error("Error by getting prop " + this._key + " from dapi", _context.t0), 
                                tracking_1.logger.getDapiPropError(this._key, _context.t0 && _context.t0.body), 
                                _context.t0;

                              case 13:
                              case "end":
                                return _context.stop();
                            }
                        }, _callee, this, [ [ 0, 8 ] ]);
                    }));
                }
            }, {
                key: "set",
                value: function(value) {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                        var url;
                        return _regenerator2["default"].wrap(function(_context2) {
                            for (;;) switch (_context2.prev = _context2.next) {
                              case 0:
                                return _context2.prev = 0, url = config_1.URLS.dapiProps + "/" + this._key + "/" + value, 
                                _context2.next = 4, this._fetch(url, {
                                    method: "put",
                                    isText: !0
                                });

                              case 4:
                                return _context2.abrupt("return", _context2.sent);

                              case 7:
                                throw _context2.prev = 7, _context2.t0 = _context2["catch"](0), console.error("Error by setting prop " + this._key + " to dapi", _context2.t0), 
                                tracking_1.logger.setDapiPropError(this._key, _context2.t0 && _context2.t0.body), 
                                _context2.t0;

                              case 12:
                              case "end":
                                return _context2.stop();
                            }
                        }, _callee2, this, [ [ 0, 7 ] ]);
                    }));
                }
            } ]), Property;
        }();
        exports.Property = Property;
        var CommonImpl = function CommonImpl(fetch) {
            var _this = this;
            (0, _classCallCheck3["default"])(this, CommonImpl), this.dialectStrong = function() {
                return _this._dialectStrong.get();
            }, this.dialectWeak = function() {
                return _this._dialectWeak.get();
            }, this.writingType = function() {
                return _this._writingType.get();
            }, this.primaryLanguage = function() {
                return _this._primaryLanguage.get();
            }, this.grammarSkills = function() {
                return _this._grammarSkills.get();
            }, this.setDialectWeak = function(val) {
                return _this._dialectWeak.set(val);
            }, this.setDialectStrong = function(val) {
                return _this._dialectStrong.set(val);
            }, this.setWrittingType = function(val) {
                return _this._writingType.set(val);
            }, this.setPrimaryLanguage = function(val) {
                return _this._primaryLanguage.set(val);
            }, this.setGrammarSkills = function(val) {
                return _this._grammarSkills.set(val);
            }, this._dialectStrong = new Property("dialectStrong", parseDialect, fetch), this._dialectWeak = new Property("dialectWeak", parseDialect, fetch), 
            this._writingType = new Property("writingType", parseWritingType, fetch), this._primaryLanguage = new Property("primaryLanguage", parsePrimaryLanguage, fetch), 
            this._grammarSkills = new Property("grammarSkills", parseGrammarSkills, fetch);
        }, DapiImpl = function DapiImpl(fetch) {
            (0, _classCallCheck3["default"])(this, DapiImpl), this.common = new CommonImpl(fetch);
        };
        exports.DapiImpl = DapiImpl;
    }, {
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/regenerator": 37,
        "lib/config": 179,
        "lib/tracking": 201
    } ],
    176: [ function(require, module, exports) {
        "use strict";
        window.IS_BG = !0;
    }, {} ],
    177: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function update(api) {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                var tabs;
                return _regenerator2["default"].wrap(function(_context) {
                    for (;;) switch (_context.prev = _context.next) {
                      case 0:
                        return _context.next = 2, getTabsToReload(api);

                      case 2:
                        tabs = _context.sent, tabs.length && showExtensionUpdatedNotification(api);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                }, _callee, this);
            }));
        }
        function getTabsToReload(api) {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                var tabs, allTabs;
                return _regenerator2["default"].wrap(function(_context2) {
                    for (;;) switch (_context2.prev = _context2.next) {
                      case 0:
                        return tabs = api.tabs, _context2.next = 3, tabs.getAllTabs();

                      case 3:
                        return allTabs = _context2.sent, _context2.abrupt("return", allTabs.filter(function(_ref) {
                            var id = _ref.id, url = _ref.url;
                            return url && page_config_1.pageConfig.toReload(url) && (!id || id.toString() !== bg_1.SETTINGS_TAB_ID);
                        }));

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                }, _callee2, this);
            }));
        }
        function showExtensionUpdatedNotification(api) {
            var notification = api.notification;
            switch (notification.kind) {
              case "web-extension":
                notification.create(getWebExtensionOpts(getReloadTabs(api)));
                break;

              case "fallback":
                notification.create(getFallbackOpts(getReloadTabs(api)));
                break;

              default:
                throw new Error("Unsupported notification type");
            }
            tracking_1.logger.reloadNotificationShow();
        }
        function getFallbackOpts(reloadTabs) {
            return {
                title: "Grammarly needs to be reloaded",
                message: "While you were working, we updated Grammarly. To take advantage of these improvements, please save the text you are working on, and click here.",
                onClicked: reloadTabs
            };
        }
        function getWebExtensionOpts(reloadTabs) {
            return {
                title: "Grammarly needs to be reloaded",
                message: "While you were working, we updated Grammarly. To take advantage of these improvements, please save the text you are working on, and click here.",
                iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAIAAAAErfB6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTgzMjhCMkQ1NjBGMTFFNDg0NjBEMENBNkVFNzA3RDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTgzMjhCMkU1NjBGMTFFNDg0NjBEMENBNkVFNzA3RDkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODMyOEIyQjU2MEYxMUU0ODQ2MEQwQ0E2RUU3MDdEOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxODMyOEIyQzU2MEYxMUU0ODQ2MEQwQ0E2RUU3MDdEOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg1zYWQAAA/kSURBVHja7J15dFNVHsfz0nRJ06ZN932FbtBSoK2AlM2hVhYZAetURWhZnBEQBIvjMIvjco6WEQVZBBmqIiCoqFSQw14KCHSl1G50pUuabiFJmzTdMr9DHY/CS0iT+5Yk93v4Q5P0vnd/n/fu/f3uvb97CY1Gw8EyX3GxCTBgLAwYCwPGwoCxMGAsDBgLA8aAsTBgLAwYCwPGwoCxMGAsDBgDxsKAsTBgLAwYCwPGwoCxMGAsDBgDxsKAsTBgLAwYCwPGwoCxMGAMGAsDxsKAsTBgLAwYCwPG0imeBda5d7C/uru1Ui5uUnY1q7paVFJpX4+sTykfUPUPDf76M2uulZDHd7KxF9kIfPgiX76Ln71LuNB7lIOXnZW1qVSWsJBddtp65T91VBVK6wu66up62oaMqDWXIIIFHhNdgieIgia7hXnYCTFgxlSlEJ9sKc5pK6+Qt1B0iQihz3SPyDk+sWGO3hgwTWpXy4815n3flF/X007bRYMF7gv84hb6x7vbCjFgqgSNcFbtxQuSskHNECM3YEVwZ3pGpYXMgAYcA0ap3PaKHVWnS+7eYcn9xDgHrAlLSnSPwICN1Y3OmvcrTrAH7X2YN0bMTXANxYANEcQ5meXZZ1pvsfw+Z3tFb4qcD1EWBqyvoIvNqs3Zefs0BLUmccMQOq8enZQWMh06aQz4IarplmQUHSqXN5vcnUcKfbeMfzbUwRMDJpeGoznccDWzLFs9NGCi3Yotl7cpan5q4BSCQ2DAv5NyQL255Ogp8U0z8PmTvce9E5Niz7PFgH/RHWXnS3n7oXE2m5AdGupd8ekB9q4YMKdIWr86P0va18MxL4lsBDvj0sZTOSRiAoDPS37eUHjAdDvdh3bJWycsmeU5xkIBn2wpfq348IBmkGO+4hFW78WmzvGJtTjAQDej+OCQBUxocgliS+xzVDBm74oOaJnh3R2yjOlqqCZUFqpsKYDBq4J+17xb5vsElYUqQ8XNHzBEROAzm6tXpUNQZag4VN+cASsH1BDvml9EpKeg4lB9MIJ5AtZwNJtLjprTaIYBguqDEcAUaFx0VtXtcMNVRkYirblW3nbOnnxnoTWfR3C5BLdvaEDRr+pQK8Squ6rBPprvB4wQ3xDybOCjZhUmwZO7KPcDerpegkNEOflOch011tk/xjnAhy/S8WNgXKUQF3TVFUrriqUN9CwGsuXyvkl8xfh5J7YABqs9fXkbDTOAgPOPfnGzPMd42jkZ8OeyfuXZ1tLjzQV5nbWoWlFtihT6fjV1nZHzx2wBvK/mwvsVJ6grH8w0z3fCkqCpY5z8ULn6n9bmfNuUR+mKg40Rc1eEzjR5wE3KrvmXtlBkKS5BJHuPWxeWHCBwQ144dNK7bp85eucaRe22nZV19rQMY9b6sALwywWfUbSuCvqwt2KeHk/xClbwHv5162vopKkofLZX9PaJS00Y8I3OmqXXdlPx4q4MnbV6dBJ4yPQEeAfqLkMv00eBk/jZpL8YvC6T+TiYiq7Xydp+T/yK9eFP0EN32C1/ITjx8JS1VCydNMZEDL/Bue0Vq27sQ1tmsMB93yOrdEc+v0rSK8vvqi25e6daIRGrpJ193T0DaqAl4Nm62ToCrdGOXrGiIHiBHHl2+hQo7etZk59ViHpIeW/CCsPW0DMM+Jkr29EuWAcn+ZOElSIbge6fAcjvGvNOiovLZHoFZjzCarLb6Cf9JiZ5RdtwHzI6BN7ihqIDFyRlaKO7I4++bGKA4TF/7uoOhAWOdfLPmvSig85XDcKbPdVns5sLf5sKrL9cbRyeD566NHga38pGx88GNINr8z+72IaS8cEpawzId2IS8NqCT8+2lqIqLVDgBl2gjncX2t7tVacO1V81fhYSMK+PeGKx/yO63+P063sQTv/9wWvsRxOXmQzgdrV85rm3UYWP4FV9k7jel6/VwbneWf36zS/FqrsIqxDnEvJu7J90XFTWr1yU+2GzqgvVWM2Fx/4+0txUxrzoY415qOiCT/RebKoOQ++pPrf8+l60dEHgnT11aes57csw4LGDENaWi2ZGB8wFRjOZMOn7pnxURS0PnTHdI5L0qyGNBl7cDyt/pGikSTHQuzb/073V57X9IMrJ95WIOQwajRnAVQoxqtz7IIH72rDHtdHNKD74HbonSdsQxweVJ98tO67tBxAfgw+M5FpgNDCdCQA+2VKMqnF+I3qRtrjljdKvUV3o4YNNdZe2lP+g7SZTAiYxZTpmAOe0lSMp53HvmEdcR5F+9Xld7ld3rtNZqf21F+GipF8hHN4aqekYANzWK0ey5w2XINaEJZF+VSpr/E/FD/RXLbM8+1pn9YOf13a3oboEmA4MyGrAP3VUISkn2Xsc6YKH/qHBv908Ytg4hvGObkbRQUW/6r6A+ICWN5sGAzIAGNU47ZKgRC2N86XbilamooMOteKFa7tv3W0c/t+absmKG3vR7uY0IgMysOgOybxpmKN3rCiQNG7ZU3Oew6igFU25sk1kI+ARVu1qObMGpBswtFd1PQg6pIX+8aSfQ2N4XwvJlKhb2g0GBDPquV8m3U10dXcrknQj0nzLAc3goforHHMXGBDMyNI+uFIuNr4Q8K38yRLjL0rKO/u6ORYg/c1IN+AmJYKR98luo0k//1FczLEM6W9GugEjmVqJdvYnbbgut1daCGD9zUg34BaV1PhCSNc2VynEcna4V6wyI92AjfctuQQRJHB/8PNSWSPHYqS/GekGLOtTGlmCq40jaTZHDbrhQPZLfzPSDVg+YGwrqi2nSIJ6Pp/N0t+MdAM2fojYnke+2q3LknLG9Tej+RyrQ38Wr0nIfADTvE0vBky3TOgsI3MGbHyykLZg18XGwXKw6W9GugELeXwjS2hXK0g/97UXWQ5g/c1IN2AnG3sjS+hSd5OugQ0WeFgOYP3NSDfgh6aFPVQajqaebIEE6QC1uUp/M9INWM+sTt26KSVJSAxx8DD+6TEV6W9Guld06Egw0V+lssYHV3QQHGKKW9iJliLqbh4uMctrzHjnQGsjslF23T4j61fSZka6ASNZIZzfVUv6eZJ3NHWAbbm8XfHp8AwZWc7ndbnGA9bfjHQ30eFCBEd03la03unpePDz6R5RjtZ8iu58eehM4+nSb0a6AY9y8OISCI6TId2VB16yhX7xFN15svc4toxdEASYkaWA7ayskcQzJ7Sk6CwLnkbRxivaJjnoFxhQ/2E7BoYqJ7oEG19IubyZdHmwF9/5mYDJVNx2iZQth1+OyIAMAEZ1sK62TK+Xwx53pWDYclvVKZbsYj0iAzIAeDIiV+WcpJR0xAP8rH9HL0Z+2w09HSlXth1vLmjtlSkGeu/7V9fTfqmtHL5lmwEZSF3xsBNGCH2MTzAc1Axllmfvikt/8KvHvMY+HzT1i/rLaO+8Sdn1WvFhHVHyzrg0qq0HpgMDsvoNvhfPRCIp54KkjDRdE/TXqCenuofTWal14ckzPaPYZjpmACM8IOit0mOk20NaEdztE5cicej0UWrglBdHPcZC0zEDOMzRO5hs6asBqu1u21Z5ivQrvpXNvoRV0wzaAXBkYyAhM/45diEtAZI7mM4EAIMW+MWhKiqrNudSe4W2sHt3/PL0kBkUHdZry+W9HZPyauQ81hqNMcAL/eNRraLScDQZRQfrtSRZcwkiI3LexwnLIURG7u8ceXTdIv8EeiwG5tKWNMtGwO62QoQuibxf9WLef3WkFkJD/cO0jFWjZiFZuiWyEbweteDrqet1jAmDy4126zUw10i3ueMwu+guLWQGwtLu9HSkX9ujYyxCwLN9JXzOmZl/A2/I4JEQP3uX1yLnn5u1+YXgRB0tkKRXtvLGJ2jnpw0zF5PnJk0QBcU4ByDcTrhKIV527eNPElbqiBTdbB3Xhz+xJizpcnvlmdZb1zqq9UnkCnXwfNQ9LMkrRh+3vFnVlX59L4F0oScYyrARQIYPxgJDo90QHBinXv1od3y6bm+TR1jN8IiCf/DfnWpFpULcqOxsVcmgqR9eQA9snKztffiiAIFrpNBXqPcsZKms8c95+6HM2V7RaA1l2B8yDDjRPQLtS8y5l1qZenXHm9GL5/qM1+f3rraOU2wdkVz6WGPem6XfDJ/t5aDfDvF6vr6JhgZ7zC983xgxF3mZygH1q0UHX7/5pWKgl55ayPqVG4u+2FxyhIqT24wxEfOAE1xD0bZmv+q7pvx5OZmUrtIaVnZz4dyLmRTtiwnGMfjIFQ5LUlc2Rc6nKPGkrVcOr/Liyx+eo+BwbRB4ailXtm0qPqT/5i8jOhAPzALGMeYOWXH6KMQeq0cnUXe03c+ypjX5WeArLQuZBp6w8Q9T/9Dg6daSz+tydXgP4t67pH/YqSUzg1RgFiOXKVrc4ZQQDSd7jxtu93QfrEGK50ZnzVnJLWiNH7ofCETJJ6ZvCvz9eXrHmwt0TDjeJ7M6nJJD7/GywwBiRYHjRUEQ44Y4eATYuzk/kA8CPlqzsqu+p71SLr55t6FIWj+iAxYhVNuTsMLr/1sSwMMBDYmefp+5HS87rEMNV94q/ZbBG4DYxp5nY03wlIPqngG18efUQXcAEY67rXD4BGL9O+B/jH3K3A6IHnZANhR+wcgh4KwSdCJbJzyPZAaMXQngUKV3YlKMb5dMWlB9MAKq+U3WZfjb82x3xadbThrZfYKKQ/XBCKgKZOMWDgH2rjvj0lAdN2RCgipDxQPI9lk1K8AgcG63TljCI6wshy5UFqqM/Cxr9m7CMstzzHuxqUgSmdgvqCZUlnQTbLMFzLm3gnBL7HNm/x5DBaGaCFeasjdMItV5yc8bCg/QNgBCf78LLTMV767JAAYVSetX52dJzW6zQvCZwatC3u+aHmDOvYOdX8rbX9MtMad4FyIitD6zCQPm3JvG31xy1DzGuZK9x70Tk4Iw3jUHwJx7Y5mHG65mlmWbbpcMne6mqPmpgVMoWotv2oCHBQ11RtEhGuYWkStS6Ltl/LN0jsWaJGDOvfnjrNqcnbdPj2j+jkHZWVmvHp2UFjKd5l1xTRXwsJqUXZnl2aQbsrBKs72iN0XOR3jIrKUAHtaNzpr3K06gXXuLSjHOARsj5hqzag4D/kW57RU7qk6zBzOgXROWlEh98qqlAB5WobQ+q/biBUkZ6Y60NAi62JmeUWkhMyZQOXxhuYCH1a6WH2vM+74pH+3BvboVLHBf4Be30D/egBxADNhAVSnEJ1uKc9rKkRwqT6oIoc90j8g5PrEjzb3HgFGqrVf+U0cVNOAFXXV1PW3GHHHLJYhggcdEl2BohCe7hY1ozxsMmA5B6Fzd3VopF0OU1azqalFJpX09sj6lfED12/OIrLlWQh7fycZeZCPw4Yt8+S4Q54QLvUc5eJnQASCWCNiihM8awoCxMGAsDBgLA8bCgLEwYCwMGAPGwoCxMGAsDBiLav1PgAEASePGMkSWuH0AAAAASUVORK5CYII=",
                buttons: [ {
                    title: "Reload",
                    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowZDJiMWMzMi1mODMzLTQxOTgtOGVlMy05YWY1OGVmOGUzNzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjFBODMzNzYxQkREMTFFNDk0ODFGNTFFRDg1MkEzMjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkY1RjA5NjYxQkREMTFFNDk0ODFGNTFFRDg1MkEzMjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N2FmMWVkMGUtZjZkZC00YmYwLWE2MjctNTBkMjA4MjRiZDViIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBkMmIxYzMyLWY4MzMtNDE5OC04ZWUzLTlhZjU4ZWY4ZTM3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuUD9ZcAAAM8SURBVHjatJbbS1RRFIePOjqG99LSLFMzoazMFLsHQQVFl8fee+qhP6cX3+sxiG6QFV0MNCjNjAyx1MoumpmXsRnz0m/Bd2A3TNocpw0fw5lz9v7tddlr7bSWlhYvwNgqzosMcVl0JrtAyAs2FkSeKBQ7xKT4Kqb+t/CcqBD1olpsEDdFdyqF00Q+FtpvWDSLWrEeMsUqPPBRjIifbDCwcBiROrFLrBU1Yp3zzWZxju/axCMxsJTr/yacLopwZw0WWix3i5IE3+eBbSYiXovhIK42KxvESaw0i9aIHC9FI5TguRDLToszWG1jXnwQ4yKb/7N5N01Wd8KomE1GOFc0irPioCh33r0Q98Rz3H/B2ZTF84ZojUuuZYXToEocEydEJe/MymeiQ9wVXaJJHCeT7f01jlNXsq5Ow23VxLaM/79gyXUxJD7x/y/eRcVV8RArk45xLgm0X+wkuSax0iy5EzdvTNyngpm134MmVz5VyEQLREz0inbiFz++sZlFNuitRLiBs5qJG5+KB+J9gnlRYht4pDvntoSiYeOH6BP9WJ/y4VucRSnM4tlK3TvO7EqGVbNNeNRfd9B+feEMpxj4xWImBYaZ6EVCaOOVuCR6QnFdKNXDCtBRToxHVbzixng+rtKEUlSXQ3GeG/FLqS88S62NObGxKraaMCQ7MkjUSidvYpTTqCscQ9gvBHaWt1DJwgGEw9TzWtbyWHvEN86P8QRNwJp9MbttZofWed4kKWzN44jYw1pWYnu4Gk26FtvDS15OsOM6SmhVAIttzl5uo2HW7EFjyrU4QsFop/Ef4OztE5+pyUNUtAgWuCOTZCzlCJ1ibj4x7WbtPj/GvvAivn9LI6/kCJRyIShjYhvfjMYJF/L9IQSbmOtxBepkXgytP4TnaQit9NnDYpvYCBXcKPv5LsLcHFxbg3CjcwW2u9dj1hxAI+ENJEIzT8e9BbjOIwSlxGjaubqGaKt5jpW+pdanb7FmZKmrzxy99gm7m6NdVpGd5csk1TgMENfbhGjmX2+ZUY7XGHGtJ0O308WKnROxQH8epRb3IjpI64wmc71dQHSMLjVDHhRR08NOU4kiPExMO2DJC8JvAQYA0OLb9zl5D+gAAAAASUVORK5CYII="
                } ],
                onButtonClicked: reloadTabs
            };
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var tracking_1 = require("lib/tracking"), page_config_1 = require("lib/page-config"), bg_1 = require("extension-api/message/bg");
        exports.update = update;
        var getReloadTabs = function(api) {
            return function() {
                return __awaiter(void 0, void 0, void 0, _regenerator2["default"].mark(function _callee3() {
                    var tabs, tabsToReload;
                    return _regenerator2["default"].wrap(function(_context3) {
                        for (;;) switch (_context3.prev = _context3.next) {
                          case 0:
                            tabs = api.tabs, _context3.t0 = tabs.kind, _context3.next = "web-extension" === _context3.t0 ? 4 : "safari" === _context3.t0 ? 10 : 11;
                            break;

                          case 4:
                            return tracking_1.logger.reloadNotificationClick(), _context3.next = 7, getTabsToReload(api);

                          case 7:
                            return tabsToReload = _context3.sent, tabsToReload.forEach(function(_ref2) {
                                var id = _ref2.id;
                                return tabs.reload(id);
                            }), _context3.abrupt("break", 12);

                          case 10:
                            return _context3.abrupt("break", 12);

                          case 11:
                            throw new Error("Unsupported browser tabs action");

                          case 12:
                          case "end":
                            return _context3.stop();
                        }
                    }, _callee3, this);
                }));
            };
        };
    }, {
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/regenerator": 37,
        "extension-api/message/bg": 163,
        "lib/page-config": 189,
        "lib/tracking": 201
    } ],
    178: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var dom_1 = require("../dom");
        exports.Offline = function(onlineHandler, offlineHandler) {
            var win = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window;
            return dom_1.listen(win, {
                online: onlineHandler,
                offline: offlineHandler
            }), {
                stop: function() {
                    return dom_1.unlisten(win, {
                        online: onlineHandler,
                        offline: offlineHandler
                    });
                }
            };
        };
    }, {
        "../dom": 180
    } ],
    179: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray"), _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var SparkMD5 = require("spark-md5"), Config = require("config"), newConfig_1 = require("./newConfig");
        exports.isTestsMode = newConfig_1.isTestsMode, exports.getVersion = newConfig_1.getVersion, 
        exports.getUuid = newConfig_1.getUuid, exports.ENV = newConfig_1.ENV, exports.URLS = newConfig_1.URLS, 
        exports.GRAMMARLY_DOMAIN = newConfig_1.GRAMMARLY_DOMAIN, exports.appName = newConfig_1.appName, 
        exports.gnarAppName = newConfig_1.gnarAppName, exports.GNAR = Config.getGlobal().appConfig.gnar, 
        exports.news = [ "The G logo gets out of the way when you're typing", "Switch between American and British English", "Quickly disable checking in certain types of text fields", "A fully redesigned and improved interface" ], 
        exports.newsId = exports.news.length && SparkMD5.hash(exports.news.join("\n")), 
        exports.userFields = [ "id", "email", "firstName", "anonymous", "type", "subscriptionFree", "experiments", "isTest", "premium", "settings", "registrationDate", "mimic", "groups", "extensionInstallDate", "fixed_errors", "referral" ], 
        exports.userFields.push("token"), exports.nextVerClass = "gr_ver_2", exports.grammarlyAttrs = [ "data-gramm_editor", "data-gramm", "data-gramm_id", "gramm_editor" ], 
        exports.restrictedAttrs = [].concat((0, _toConsumableArray3["default"])(exports.grammarlyAttrs), [ "readonly", "disabled" ]), 
        exports.customFieldsRestrictedAttrs = [ "pm-container", [ "class", "ProseMirror" ], "data-synchrony", [ "data-gramm", "false" ], [ "class", "redactor-layer" ], [ "class", "redactor-editor" ], [ "class", "redactor_box" ], [ "aria-label", "Search Facebook" ] ], 
        exports.allRestrictedAttrs = [].concat((0, _toConsumableArray3["default"])(exports.restrictedAttrs), (0, 
        _toConsumableArray3["default"])(exports.customFieldsRestrictedAttrs)), exports.restrictedParentAttrs = "[data-reactid]", 
        exports.externalEvents = [ "changed-user", "changed-plan", "changed-dialect", "cleanup", "editor-fix", "enable-email-perception" ], 
        exports.development = "127.0.0.1:3117" === document.location.host;
    }, {
        "./newConfig": 184,
        "babel-runtime/helpers/toConsumableArray": 35,
        config: 153,
        "spark-md5": "spark-md5"
    } ],
    180: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function createEl(html, doc) {
            var div = (doc || document).createElement("div");
            return div.innerHTML = DOMPurify.sanitize(html.trim()), div.firstElementChild;
        }
        function renderReactWithParent(reactElement, p, id) {
            var type = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "div", parent = p, react = parent[id] = parent[id] || {};
            react.el || (react.el = parent.ownerDocument.createElement(type), parent.appendChild(react.el));
            var component = ReactDOM.render(reactElement, react.el);
            return null == react.remove && (react.remove = function() {
                delete parent[id], parent.removeChild(react.el), ReactDOM.unmountComponentAtNode(react.el);
            }), {
                component: component,
                remove: react.remove.bind(react),
                el: react.el
            };
        }
        function inEl(el, target) {
            for (var deep = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3, i = 0, cur = el; cur.parentNode && i < deep; ) {
                if ("string" != typeof target && target === cur) return !0;
                if (cur.id === target || cur === target) return !0;
                cur = cur.parentNode;
            }
            return !1;
        }
        function hasClass(_el, cls) {
            return !(!_el || void 0 === _el.className) && _el.classList.contains(cls);
        }
        function removeClass(_el, cls) {
            if (_el && _el.classList) return _el.classList.remove(cls);
        }
        function addClass(_el, cls) {
            if (_el) {
                if (cls.indexOf(" ") === -1) return _el.classList.add(cls);
                for (var classes = cls.split(" "), i = 0; i < classes.length; i++) _el.classList.add(classes[i]);
            }
        }
        function toggleClass(el, flag, cls) {
            flag ? addClass(el, cls) : removeClass(el, cls);
        }
        function getParentBySel(el, sel) {
            for (var e = el.parentNode; null !== e; ) {
                if (matchesSelector(e, sel)) return e;
                e = e.parentNode;
            }
            return !1;
        }
        function parentIsContentEditable(el) {
            for (var e = el.parentNode; null !== e; ) {
                if (isContentEditable(e)) return e;
                e = e.parentNode;
            }
            return !1;
        }
        function isContentEditable(el) {
            return "true" === el.contentEditable || "plaintext-only" === el.contentEditable;
        }
        function matchesSelector(el, sel) {
            if (!el) return !1;
            var method = el.matches || el.msMatchesSelector || el.matchesSelector || el.webkitMatchesSelector || el.mozMatchesSelector;
            return !!method && method.apply(el, [ sel ]);
        }
        function isFocused(el) {
            return document.activeElement && "IFRAME" === document.activeElement.tagName ? el === el.ownerDocument.activeElement : document.activeElement && "BODY" === document.activeElement.tagName ? el === document.activeElement : el === document.activeElement;
        }
        function listen(e, event, cb, unbind) {
            var bubble = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            if (null != e) {
                var el = e;
                if ("string" != typeof event) return _.each(event, function(value, key) {
                    listen(el, key, value, unbind);
                });
                if (cb) {
                    var listeners = el[lKey] || [];
                    return el[lKey] = listeners, unbind ? (el[lKey] = listeners.filter(function(l) {
                        return !(l.event === event && l.cb === cb);
                    }), el.removeEventListener(event, cb, bubble)) : (listeners.push({
                        event: event,
                        cb: cb
                    }), el.addEventListener(event, cb, bubble)), {
                        el: el,
                        event: event,
                        cb: cb,
                        bubble: bubble
                    };
                }
            }
        }
        function unlisten(e, event, cb, bubble) {
            var el = e;
            event || null == el[lKey] ? listen(el, event, cb, !0, bubble) : el[lKey].forEach(function(l) {
                return unlisten(el, l.event, l.cb, l.bubble);
            });
        }
        function on(type, listener, useCapture) {
            var _this = this;
            return this.addEventListener(type, listener, useCapture), {
                off: function() {
                    return _off.apply(_this, [ type, listener, useCapture ]);
                }
            };
        }
        function _off(type, listener, useCapture) {
            this.removeEventListener(type, listener, useCapture);
        }
        function once(event, cb) {
            var _this2 = this, done = function done(e) {
                cb(e), _off.call(_this2, event, done);
            };
            on.call(this, event, done);
        }
        function emit(event, data) {
            var e = document.createEvent("CustomEvent");
            e.initCustomEvent(event, !0, !0, data), this.dispatchEvent(e);
        }
        function isVisible(el) {
            var style = getComputedStyle(el, void 0);
            return "none" !== style.getPropertyValue("display") && "hidden" !== style.getPropertyValue("visibility") && el.clientHeight > 0;
        }
        function cs() {
            for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) keys[_key] = arguments[_key];
            return keys.reduce(function(res, cur) {
                return res.concat(_.isObject(cur) ? (0, _keys2["default"])(cur).filter(function(cls) {
                    return cur[cls];
                }) : cur);
            }, []).filter(function(x) {
                return Boolean(x);
            }).join(" ");
        }
        function maybeAddPx(name, value) {
            return "number" != typeof value || cssNumber[dasherize(name)] ? value : value + "px";
        }
        function camelize(str) {
            return str.replace(/-+(.)?/g, function(_, chr) {
                return chr ? chr.toUpperCase() : "";
            });
        }
        function camelizeAttrs(obj) {
            return _.transform(obj, function(result, value, key) {
                return result[camelize(key)] = value;
            });
        }
        function dasherize(str) {
            return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
        }
        function css(el, arg2, arg3) {
            if (arguments.length < 3) {
                var element = el;
                if (!element) return;
                var computedStyle = getComputedStyle(element, "");
                if ("string" == typeof arg2) return element.style[camelize(arg2)] || computedStyle.getPropertyValue(arg2);
                if (_.isArray(arg2)) {
                    var props = {};
                    return _.each(arg2, function(val, _) {
                        props[camelize(val)] = element.style[camelize(val)] || computedStyle.getPropertyValue(val);
                    }), props;
                }
            }
            var result = "";
            if (_.isString(arg2)) arg3 || 0 === arg3 ? result = dasherize(arg2) + ":" + maybeAddPx(arg2, arg3) : el.style.removeProperty(dasherize(arg2)); else {
                arg2 = arg2;
                for (var key in arg2) arg2[key] || 0 === arg2[key] ? result += dasherize(key) + ":" + maybeAddPx(key, arg2[key]) + ";" : el.style.removeProperty(dasherize(key));
            }
            return el.style.cssText += ";" + result;
        }
        function setCustomCss(field, style) {
            if (style && field) {
                var originStyle = css(field, (0, _keys2["default"])(style));
                return css(field, style), function() {
                    return css(field, originStyle);
                };
            }
        }
        function getParentByTag(el, tag) {
            for (var e = el.parentNode; null !== e; ) {
                if (e.tagName === tag) return e;
                e = e.parentNode;
            }
            return null;
        }
        function getParentByData(el, key, val) {
            for (var e = el.parentNode; null !== e; ) {
                if (e.dataset && e.dataset[key] && e.dataset[key] == val) return e;
                e = e.parentNode;
            }
        }
        function resolveEl(el, cls) {
            return hasClass(el, cls) ? el : getParent(el, cls);
        }
        function getParent(el, cls) {
            for (var e = el.parentNode; null !== e; ) {
                if (hasClass(e, cls)) return e;
                e = e.parentNode;
            }
            return !1;
        }
        function parentHasClass(el, cls) {
            if (!el) return !1;
            for (var e = el; e.parentNode; ) {
                if (hasClass(e, cls)) return e;
                e = e.parentNode;
            }
            return !1;
        }
        function getParentByDepth() {
            var depth = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            return depth ? getParentByDepth.call(this.parentNode, --depth) : this;
        }
        function isParent(el, parent) {
            if (!el) return !1;
            for (var e = el; e.parentNode; ) {
                if (parent === e.parentNode) return e;
                e = e.parentNode;
            }
            return !1;
        }
        function insertAfter(newElement, targetElement) {
            var parent = targetElement.parentNode;
            if (null === parent) throw new stdlib_1.AssertionError("Expected non-null parent");
            parent.lastChild === targetElement ? parent.appendChild(newElement) : parent.insertBefore(newElement, targetElement.nextSibling);
        }
        function insertBefore(newElement, targetElement) {
            stdlib_1.assertNonNull(targetElement.parentNode, "parent node").insertBefore(newElement, targetElement);
        }
        function elementInDocument(el, doc) {
            doc = doc || document;
            for (var element = el; element; ) {
                if (element === doc) return !0;
                element = element.parentNode;
            }
            return !1;
        }
        function runKeyEvent(ee) {
            var evt = void 0, defaultView = void 0, defaultEvent = {
                ctrl: !1,
                meta: !1,
                shift: !1,
                alt: !1
            }, e = _.extend(defaultEvent, ee);
            try {
                evt = e.el.ownerDocument.createEvent("KeyEvents"), defaultView = e.el.ownerDocument.defaultView, 
                evt.initKeyEvent(e.type, !0, !0, defaultView, e.ctrl, e.alt, e.shift, e.meta, 0, 0);
            } catch (err) {
                evt = e.el.ownerDocument.createEvent("UIEvents"), evt.initUIEvent.bind(evt)(void 0, !0, !0, window, 1), 
                evt.keyCode = 0, evt.which = 0, evt.charCode = 0, evt.ctrlKey = e.ctrl, evt.altKey = e.alt, 
                evt.shiftKey = e.shift, evt.metaKey = e.meta;
            }
            e.el.dispatchEvent(evt);
        }
        function docHidden(doc) {
            return "undefined" != typeof doc.hidden ? doc.hidden : "undefined" != typeof doc.mozHidden ? doc.mozHidden : "undefined" != typeof doc.webkitHidden ? doc.webkitHidden : "undefined" != typeof doc.msHidden && doc.msHidden;
        }
        function visibilityEvent(doc) {
            return "undefined" != typeof doc.hidden ? "visibilitychange" : "undefined" != typeof doc.mozHidden ? "mozvisibilitychange" : "undefined" != typeof doc.webkitHidden ? "webkitvisibilitychange" : "undefined" != typeof doc.msHidden && "msvisibilitychange";
        }
        function transformProp() {
            var doc = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document;
            return "undefined" != typeof doc.body.style.transform ? "transform" : "undefined" != typeof doc.body.style.WebkitTransform ? "WebkitTransform" : "undefined" != typeof doc.body.style.MozTransform ? "MozTransform" : void 0;
        }
        function getDocSelection(doc) {
            return doc.getSelection() || {};
        }
        function compStyle(el) {
            if (el) {
                var doc = el.ownerDocument;
                if (doc) {
                    var win = doc.defaultView || window;
                    if (win) {
                        var s = win.getComputedStyle(el, void 0);
                        if (s) {
                            for (var _len2 = arguments.length, props = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) props[_key2 - 1] = arguments[_key2];
                            return 1 === props.length ? s.getPropertyValue(props[0]) : props.reduce(function(result, prop) {
                                return (0, _assign2["default"])({}, result, (0, _defineProperty3["default"])({}, prop, s.getPropertyValue(prop)));
                            }, {});
                        }
                    }
                }
            }
        }
        function classSelector(cls) {
            return cls.split(" ").map(function(c) {
                return "." !== c[0] ? "." + c : c;
            }).join("").trim();
        }
        function selectorAll(cls) {
            for (var _len3 = arguments.length, classes = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) classes[_key3 - 1] = arguments[_key3];
            if (classes.length > 0) {
                var result = [];
                return result.push(selectorAll(cls)), classes.forEach(function(c) {
                    return result.push(selectorAll(c));
                }), result.join(", ");
            }
            return cls = cls.split(", ").map(function(c) {
                return "." !== c[0] ? "." + c : c;
            }).join(", ").trim(), cls + ", " + cls + " *";
        }
        function whichAnimationEndEvent() {
            var el = document.createElement("fakeelement"), transitions = {
                animation: "animationend",
                MozAnimation: "animationend",
                WebkitAnimation: "webkitAnimationEnd"
            };
            for (var t in transitions) if (void 0 !== el.style[t]) return transitions[t];
        }
        function transitionEndEventName() {
            var el = document.createElement("fakeelement"), transitions = {
                transition: "transitionend",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
            for (var i in transitions) if (transitions.hasOwnProperty(i) && void 0 !== el.style[i]) return transitions[i];
        }
        function addIframeCss(frameDoc) {
            if ("undefined" != typeof window.GR_INLINE_STYLES) {
                var style = frameDoc.createElement("style");
                style.innerHTML = window.GR_INLINE_STYLES;
                try {
                    frameDoc.querySelector("head").appendChild(style);
                } catch (e) {
                    console.log("can't append style", e);
                }
            }
        }
        function setGRAttributes(el, id) {
            el.setAttribute("data-gramm_id", id), el.setAttribute("data-gramm", "true");
        }
        function emitDomEvent(key) {
            var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, e = document.createEvent("CustomEvent");
            e.initCustomEvent(key + "-gr", !0, !0, data), document.dispatchEvent(e);
        }
        function addRange(doc, range) {
            var s = doc.getSelection();
            s.removeAllRanges(), s.addRange(range);
        }
        function setDomRange(doc, data) {
            var range = doc.createRange();
            range.setStart(data.anchorNode, data.anchorOffset), range.setEnd(data.focusNode, data.focusOffset), 
            addRange(doc, range);
        }
        function closestEl(el, sel) {
            return null === el ? null : matchesSelector(el, sel) ? el : el.querySelector(sel) || closestEl(el.parentElement, sel);
        }
        var _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var ReactDOM = require("react-dom"), _ = require("lodash"), util_1 = require("./util"), stdlib_1 = require("stdlib"), DOMPurify = require("dompurify");
        exports.createEl = createEl, exports.renderReactWithParent = renderReactWithParent, 
        exports.inEl = inEl, exports.hasClass = hasClass, exports.removeClass = removeClass, 
        exports.addClass = addClass, exports.toggleClass = toggleClass, exports.getParentBySel = getParentBySel, 
        exports.parentIsContentEditable = parentIsContentEditable, exports.isContentEditable = isContentEditable, 
        exports.matchesSelector = matchesSelector, exports.isFocused = isFocused;
        var lKey = util_1.guid();
        exports.listen = listen, exports.unlisten = unlisten, exports.on = on, exports.off = _off, 
        exports.once = once, exports.emit = emit, exports.isVisible = isVisible, exports.cs = cs;
        var cssNumber = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        };
        exports.maybeAddPx = maybeAddPx, exports.camelize = camelize, exports.camelizeAttrs = camelizeAttrs, 
        exports.dasherize = dasherize, exports.css = css, exports.setCustomCss = setCustomCss, 
        exports.getParentByTag = getParentByTag, exports.getParentByData = getParentByData, 
        exports.resolveEl = resolveEl, exports.getParent = getParent, exports.parentHasClass = parentHasClass, 
        exports.getParentByDepth = getParentByDepth, exports.isParent = isParent, exports.insertAfter = insertAfter, 
        exports.insertBefore = insertBefore, exports.elementInDocument = elementInDocument, 
        exports.runKeyEvent = runKeyEvent, exports.docHidden = docHidden, exports.visibilityEvent = visibilityEvent, 
        exports.transformProp = transformProp, exports.getDocSelection = getDocSelection, 
        exports.compStyle = compStyle, exports.classSelector = classSelector, exports.selectorAll = selectorAll, 
        exports.whichAnimationEndEvent = whichAnimationEndEvent, exports.transitionEndEventName = transitionEndEventName, 
        exports.addIframeCss = addIframeCss, exports.setGRAttributes = setGRAttributes, 
        exports.emitDomEvent = emitDomEvent, exports.addRange = addRange, exports.setDomRange = setDomRange, 
        exports.closestEl = closestEl;
    }, {
        "./util": 207,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/helpers/defineProperty": 31,
        dompurify: "dompurify",
        lodash: "lodash",
        "react-dom": "react-dom",
        stdlib: 210
    } ],
    181: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var UserExperimentsImpl = function UserExperimentsImpl() {
            var groups = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            (0, _classCallCheck3["default"])(this, UserExperimentsImpl), this.emailPerception = !1, 
            this.emailPerception = groups.includes("email_perception_enabled");
        };
        exports.UserExperimentsImpl = UserExperimentsImpl;
    }, {
        "babel-runtime/helpers/classCallCheck": 29
    } ],
    182: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function currentUrl(_ref) {
            var _this = this, tabs = _ref.tabs;
            return stdlib_1.SafePromise.create(function(resolve) {
                return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                    var retry, url;
                    return _regenerator2["default"].wrap(function(_context) {
                        for (;;) switch (_context.prev = _context.next) {
                          case 0:
                            return retry = setTimeout(function() {
                                return tabs.getActiveTabUrl().then(resolve);
                            }, 2e3), _context.next = 3, tabs.getActiveTabUrl();

                          case 3:
                            url = _context.sent, clearTimeout(retry), resolve(url);

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                    }, _callee, this);
                }));
            });
        }
        function getDomain(el) {
            var doc = el && el.ownerDocument || document, location = doc.location || doc.defaultView.location;
            return location ? stripDomain(location.hostname) : "";
        }
        function promiseGetDomain(api) {
            return _promise2["default"].race([ currentUrl(api).then(domainFromUrl), util_1.delay(1e4).then(function() {
                throw new Error("Request to tabs.getCurrentTabUrl rejected by timeout");
            }) ]);
        }
        function domainFromUrl(url) {
            if (util_1.isFF() && /^about:/.test(url)) return url;
            var location = document.createElement("a");
            return location.href = url, stripDomain(location.hostname);
        }
        function getUrl(el) {
            var doc = el && el.ownerDocument || document, location = doc.location || doc.defaultView.location;
            return location ? location.pathname + location.search : "";
        }
        function getFavicon() {
            for (var isAbsolute = new RegExp("^(?:[a-z]+:)?//", "i"), favicon = "", links = document.getElementsByTagName("link"), i = 0; i < links.length; i++) {
                var link = links[i], rel = '"' + link.getAttribute("rel") + '"', regexp = /(\"icon )|( icon\")|(\"icon\")|( icon )/i;
                rel.search(regexp) !== -1 && (favicon = link.getAttribute("href"));
            }
            return favicon || (favicon = "favicon.ico"), isAbsolute.test(favicon) ? favicon : "/" !== favicon[0] ? "//" + document.location.host + document.location.pathname + favicon : "//" + document.location.host + favicon;
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var util_1 = require("./util"), defaults_1 = require("./page-config/defaults"), stdlib_1 = require("stdlib"), stripDomain = function(domain) {
            return domain.replace("www.", "");
        };
        exports.currentUrl = currentUrl, exports.getDomain = getDomain, exports.promiseGetDomain = promiseGetDomain, 
        exports.domainFromUrl = domainFromUrl, exports.isFacebookSite = function() {
            return defaults_1.FACEBOOK_SITES.includes(getDomain());
        }, exports.isJiraSite = function() {
            return /\.atlassian\.net/.test(getDomain());
        }, exports.isBlackboardSite = function() {
            return /\.blackboard\.com/.test(getDomain());
        }, exports.getUrl = getUrl, exports.getFavicon = getFavicon;
    }, {
        "./page-config/defaults": 188,
        "./util": 207,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/regenerator": 37,
        stdlib: 210
    } ],
    183: [ function(require, module, exports) {
        (function(process) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    "default": obj
                };
            }
            function one(type, cb) {
                function _cb() {
                    off(type, _cb);
                    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) data[_key] = arguments[_key];
                    cb.apply(this, data);
                }
                on(type, _cb);
            }
            function on(type, callback) {
                if ("__bgerror" === type) return void errorEmitter.on("__bgerror", callback);
                var listeners = Listeners[type] = Listeners[type] || [];
                if (listeners.push(callback), 1 === listeners.length) try {
                    message.listen(type, function() {
                        var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
                        try {
                            for (var _step, _iterator = (0, _getIterator3["default"])(listeners); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                                var l = _step.value;
                                l.apply(void 0, arguments);
                            }
                        } catch (err) {
                            _didIteratorError = !0, _iteratorError = err;
                        } finally {
                            try {
                                !_iteratorNormalCompletion && _iterator["return"] && _iterator["return"]();
                            } finally {
                                if (_didIteratorError) throw _iteratorError;
                            }
                        }
                    });
                } catch (e) {
                    exports.emitError(e);
                }
            }
            function off(type, callback) {
                if ("__bgerror" === type) return void errorEmitter.off("__bgerror", callback);
                var listeners = Listeners[type];
                if (listeners) {
                    var i = listeners.indexOf(callback);
                    i !== -1 && listeners.splice(i, 1), 0 === listeners.length && delete Listeners[type];
                }
            }
            function emitTabs(type) {
                try {
                    switch (message.kind) {
                      case "background-message-api":
                        message.broadcast(type, {});
                        break;

                      default:
                        throw new Error("emitTabs can be used only on background");
                    }
                } catch (e) {
                    exports.emitError(e);
                }
            }
            function emitTo(tabId, type) {
                var content = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, _callback = arguments[3], callback = _callback || function() {};
                try {
                    if (!tabId) throw TypeError("emitTo can't be used without destination point");
                    switch (message.kind) {
                      case "background-message-api":
                        message.sendTo(tabId, type, content, callback);
                        break;

                      default:
                        throw new Error("emitTo can be used only on background");
                    }
                } catch (e) {
                    exports.emitError(e);
                }
            }
            function emitFocusedTab(type, content) {
                try {
                    message.toFocused(type, content);
                } catch (e) {
                    exports.emitError(e);
                }
            }
            function emitBackground(type, content, callback) {
                try {
                    switch (message.kind) {
                      case "content-script-message-api":
                        message.broadcastBackground(type, content, callback);
                        break;

                      default:
                        throw new Error("emitBackground can be used only in content script");
                    }
                } catch (e) {
                    exports.emitError(e);
                }
            }
            function promiseBackground(type) {
                var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, timeout = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e4, request = new _promise2["default"](function(resolve, reject) {
                    try {
                        switch (message.kind) {
                          case "content-script-message-api":
                            message.broadcastBackground(type, data, resolve, reject);
                            break;

                          default:
                            throw new Error("promiseBackground can be used only on client scripts");
                        }
                    } catch (e) {
                        reject(e), exports.emitError(e);
                    }
                });
                return _promise2["default"].race([ request, util_1.delay(timeout).then(function() {
                    throw new Error("Request to bg page (" + message + ") rejected by timeout");
                }) ]);
            }
            var _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), _getIterator2 = require("babel-runtime/core-js/get-iterator"), _getIterator3 = _interopRequireDefault(_getIterator2);
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _ = require("lodash"), emitter = require("emitter"), util_1 = require("./util"), dom_1 = require("./dom"), extension_api_1 = require("extension-api"), _ref = process && process.env && process.env.SANDBOX ? {
                message: {
                    broadcastBackground: util_1._f,
                    listen: util_1._f,
                    toFocused: util_1._f
                }
            } : extension_api_1.getGlobalExtensionApi(), message = _ref.message, errorEmitter = emitter({}), Listeners = {};
            exports.emitError = _.throttle(function(e) {
                return errorEmitter.emit("__bgerror", e);
            }, 1e3), util_1.isBg() && dom_1.listen(document, "grammarly:offline", function() {
                return exports.emitError("proxy dead");
            }, void 0), exports.one = one, exports.on = on, exports.off = off, exports.emitTabs = emitTabs, 
            exports.emitTo = emitTo, exports.emitFocusedTab = emitFocusedTab, exports.emitBackground = emitBackground, 
            exports.promiseBackground = promiseBackground;
        }).call(this, require("_process"));
    }, {
        "./dom": 180,
        "./util": 207,
        _process: 142,
        "babel-runtime/core-js/get-iterator": 16,
        "babel-runtime/core-js/promise": 26,
        emitter: "emitter",
        "extension-api": 161,
        lodash: "lodash"
    } ],
    184: [ function(require, module, exports) {
        "use strict";
        function isTestsMode() {
            return !!window.__extensionTestsMode;
        }
        function getUuid() {
            return globalConfig.appConfig.extensionId;
        }
        function isFF() {
            return "firefox" === globalConfig.bundleInfo.browser;
        }
        function isChrome() {
            return "chrome" === globalConfig.bundleInfo.browser;
        }
        function isSafari() {
            return "safari" === globalConfig.bundleInfo.browser;
        }
        function isEdge() {
            return "edge" === globalConfig.bundleInfo.browser;
        }
        function isWindows() {
            return globalConfig.systemInfo.os.isWindows;
        }
        function isBg() {
            return "bg" === globalConfig.bundleInfo.context;
        }
        function isPopup() {
            return "popup" === globalConfig.bundleInfo.context;
        }
        function isBgOrPopup() {
            return isBg() || isPopup();
        }
        function getBrowser() {
            return globalConfig.bundleInfo.browser;
        }
        function getVersion() {
            return globalConfig.buildInfo.version;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var Config = require("config"), globalConfig = Config.getGlobal();
        exports.isTestsMode = isTestsMode, exports.getUuid = getUuid, exports.isFF = isFF, 
        exports.isChrome = isChrome, exports.isSafari = isSafari, exports.isEdge = isEdge, 
        exports.isWindows = isWindows, exports.isBg = isBg, exports.isPopup = isPopup, exports.isBgOrPopup = isBgOrPopup, 
        exports.getBrowser = getBrowser, exports.getVersion = getVersion, exports.ENV = globalConfig.bundleInfo.env, 
        exports.URLS = globalConfig.appConfig.url, exports.appName = globalConfig.appConfig.felog.appName, 
        exports.gnarAppName = globalConfig.appConfig.gnar.appName, exports.GRAMMARLY_DOMAIN = globalConfig.appConfig.url.grammarlyDomain;
    }, {
        config: 153
    } ],
    185: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys), _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of"), _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2), _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn"), _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2), _inherits2 = require("babel-runtime/helpers/inherits"), _inherits3 = _interopRequireDefault(_inherits2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var util_1 = require("lib/util"), defaults_1 = require("./defaults"), location_1 = require("lib/location"), config_loader_1 = require("./config-loader"), Config = function(_config_loader_1$Conf) {
            function Config(prefs) {
                (0, _classCallCheck3["default"])(this, Config);
                var _this = (0, _possibleConstructorReturn3["default"])(this, (Config.__proto__ || (0, 
                _getPrototypeOf2["default"])(Config)).call(this, prefs));
                return _this.invalidate = function() {
                    return _this.load();
                }, _this;
            }
            return (0, _inherits3["default"])(Config, _config_loader_1$Conf), (0, _createClass3["default"])(Config, [ {
                key: "getByPage",
                value: function(pages) {
                    var url = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location_1.getUrl();
                    if (pages) {
                        var findUrl = (0, _keys2["default"])(pages).find(function(page) {
                            return new RegExp(page).test(url);
                        });
                        return findUrl ? pages[findUrl] : void 0;
                    }
                }
            }, {
                key: "get",
                value: function(domain, url) {
                    var config = this.config.pageConfig[domain] || this.config.subdomains.find(function(conf) {
                        return new RegExp("\\." + util_1.escapeRegExp(conf.domain) + "$").test(domain);
                    }) || this.config.partials.find(function(conf) {
                        return domain.includes(conf.domain);
                    });
                    if (config && config.enabled === !1) return config;
                    var pageConfig = this.getByPage(config && config.pages, url), newConfig = pageConfig || config || {};
                    return newConfig.enabled = newConfig.enabled !== !1, newConfig;
                }
            }, {
                key: "toReload",
                value: function(url) {
                    return 0 === url.indexOf("http") && defaults_1.SITES_TO_RELOAD.some(function(domain) {
                        return url.includes(domain);
                    });
                }
            } ]), Config;
        }(config_loader_1.ConfigLoader);
        exports.Config = Config;
    }, {
        "./config-loader": 186,
        "./defaults": 188,
        "babel-runtime/core-js/object/get-prototype-of": 23,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/helpers/inherits": 32,
        "babel-runtime/helpers/possibleConstructorReturn": 33,
        "lib/location": 182,
        "lib/util": 207
    } ],
    186: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var localforage_1 = require("./localforage"), request_1 = require("lib/request"), config_1 = require("lib/config"), tracking_1 = require("lib/tracking"), meta_1 = require("./meta"), utils_1 = require("./utils"), decorator_1 = require("./decorator"), profiler_1 = require("lib/profiler"), AJAX_TIMEOUT = 6e4, CONFIG_MISSED_ERROR = "Config missed", CONFIG_MALFORMED = "Config malformed", ConfigLoader = function() {
            function ConfigLoader(_prefs) {
                (0, _classCallCheck3["default"])(this, ConfigLoader), this._prefs = _prefs;
            }
            return (0, _createClass3["default"])(ConfigLoader, [ {
                key: "init",
                value: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                        var config;
                        return _regenerator2["default"].wrap(function(_context) {
                            for (;;) switch (_context.prev = _context.next) {
                              case 0:
                                return profiler_1.Profiler.start("pageConfig_init"), config = void 0, _context.next = 4, 
                                this.isSkipConfig();

                              case 4:
                                if (!_context.sent) {
                                    _context.next = 8;
                                    break;
                                }
                                console.warn("Config: use default config in DEBUG mode (skipConfig=true)"), _context.next = 11;
                                break;

                              case 8:
                                return _context.next = 10, this.loadFromStorage();

                              case 10:
                                config = _context.sent;

                              case 11:
                                return this.config = config ? config : {}, _context.next = 14, new meta_1.Meta().load();

                              case 14:
                                return this.meta = _context.sent, profiler_1.Profiler.stop("pageConfig_init"), _context.abrupt("return", this);

                              case 17:
                              case "end":
                                return _context.stop();
                            }
                        }, _callee, this);
                    }));
                }
            }, {
                key: "isSkipConfig",
                value: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                        return _regenerator2["default"].wrap(function(_context2) {
                            for (;;) switch (_context2.prev = _context2.next) {
                              case 0:
                                if (_context2.t0 = !1, !_context2.t0) {
                                    _context2.next = 5;
                                    break;
                                }
                                return _context2.next = 4, this._prefs.get("skipConfig");

                              case 4:
                                _context2.t0 = _context2.sent;

                              case 5:
                                return _context2.abrupt("return", _context2.t0);

                              case 6:
                              case "end":
                                return _context2.stop();
                            }
                        }, _callee2, this);
                    }));
                }
            }, {
                key: "load",
                value: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee3() {
                        var _meta$config, date, interval, minutesToUpdate;
                        return _regenerator2["default"].wrap(function(_context3) {
                            for (;;) switch (_context3.prev = _context3.next) {
                              case 0:
                                if (_meta$config = this.meta.config, date = _meta$config.date, interval = _meta$config.interval, 
                                !(date + interval > Date.now())) {
                                    _context3.next = 5;
                                    break;
                                }
                                return minutesToUpdate = (date + interval - Date.now()) / 1e3 / 60, console.info("Config: next update in " + minutesToUpdate.toFixed(2) + " m"), 
                                _context3.abrupt("return");

                              case 5:
                                return console.info("Config: going to update config from CDN..."), _context3.abrupt("return", this.updateFromCDN());

                              case 7:
                              case "end":
                                return _context3.stop();
                            }
                        }, _callee3, this);
                    }));
                }
            }, {
                key: "updateFromCDN",
                value: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee4() {
                        var config, msg;
                        return _regenerator2["default"].wrap(function(_context4) {
                            for (;;) switch (_context4.prev = _context4.next) {
                              case 0:
                                return config = void 0, _context4.prev = 1, _context4.next = 4, request_1.fetch(config_1.URLS.pageConfigUrl, {
                                    timeout: AJAX_TIMEOUT
                                });

                              case 4:
                                if (config = _context4.sent, utils_1.isValid(config)) {
                                    _context4.next = 7;
                                    break;
                                }
                                throw new Error(CONFIG_MALFORMED);

                              case 7:
                                this.config = config, this.save(config), _context4.next = 17;
                                break;

                              case 11:
                                _context4.prev = 11, _context4.t0 = _context4["catch"](1), tracking_1.logger.pageConfigCDNError(_context4.t0.message), 
                                msg = "Config: can't get valid config - " + _context4.t0.message, console.warn(msg, config), 
                                this.saveOnError(msg);

                              case 17:
                              case "end":
                                return _context4.stop();
                            }
                        }, _callee4, this, [ [ 1, 11 ] ]);
                    }));
                }
            }, {
                key: "loadFromStorage",
                value: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee5() {
                        var rawConfig;
                        return _regenerator2["default"].wrap(function(_context5) {
                            for (;;) switch (_context5.prev = _context5.next) {
                              case 0:
                                return _context5.prev = 0, _context5.next = 3, localforage_1.localforage.getItem("config");

                              case 3:
                                if (rawConfig = _context5.sent) {
                                    _context5.next = 6;
                                    break;
                                }
                                throw new Error(CONFIG_MISSED_ERROR);

                              case 6:
                                if (utils_1.isValid(rawConfig)) {
                                    _context5.next = 8;
                                    break;
                                }
                                throw new Error(CONFIG_MALFORMED);

                              case 8:
                                return console.info("Config: loaded from local storage successfully"), _context5.abrupt("return", rawConfig);

                              case 12:
                                return _context5.prev = 12, _context5.t0 = _context5["catch"](0), CONFIG_MISSED_ERROR === _context5.t0.message || tracking_1.logger.pageConfigLocalStorageError(_context5.t0.message, _context5.t0.name), 
                                console.warn("Config: cannot get valid config from storage: " + _context5.t0), _context5.abrupt("return", void 0);

                              case 17:
                              case "end":
                                return _context5.stop();
                            }
                        }, _callee5, this, [ [ 0, 12 ] ]);
                    }));
                }
            }, {
                key: "save",
                value: function(config) {
                    var interval = config.interval, protocolVersion = config.protocolVersion, version = config.version;
                    localforage_1.localforage.setItem("config", config), this.fireVersionUpdate(version, this.meta.config.version), 
                    this.meta.set({
                        date: this.getCurrentTimestamp(),
                        status: "success",
                        interval: interval,
                        protocolVersion: protocolVersion,
                        version: version
                    }), console.info("Config: new config saved to local storage successfully:", config.version, config);
                }
            }, {
                key: "saveOnError",
                value: function(info) {
                    var _meta$config2 = this.meta.config, interval = _meta$config2.interval, protocolVersion = _meta$config2.protocolVersion, version = _meta$config2.version;
                    this.meta.set({
                        date: this.getCurrentTimestamp(),
                        status: "failed",
                        interval: interval,
                        protocolVersion: protocolVersion,
                        version: version,
                        info: info
                    });
                }
            }, {
                key: "fireVersionUpdate",
                value: function(newVersion, oldVersion) {
                    newVersion && oldVersion !== newVersion && tracking_1.logger.pageConfigUpdated(oldVersion, newVersion);
                }
            }, {
                key: "getCurrentTimestamp",
                value: function() {
                    return Date.now();
                }
            }, {
                key: "config",
                set: function(config) {
                    config = config || {}, this._config = decorator_1.decorateConfig(config);
                },
                get: function() {
                    return this._config;
                }
            } ]), ConfigLoader;
        }();
        exports.ConfigLoader = ConfigLoader;
    }, {
        "./decorator": 187,
        "./localforage": 190,
        "./meta": 191,
        "./utils": 192,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/regenerator": 37,
        "lib/config": 179,
        "lib/profiler": 193,
        "lib/request": 194,
        "lib/tracking": 201
    } ],
    187: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function deepCopyWithDefault(config) {
            var newConfig = lodash_1.merge({
                pageConfig: {}
            }, config);
            return newConfig.pageConfig || (newConfig.pageConfig = {}), newConfig;
        }
        function decorateConfig(config) {
            return RawConfigDecorator.decorate(config);
        }
        var _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var config_1 = require("../config"), defaults_1 = require("./defaults"), util_1 = require("../util"), lodash_1 = require("lodash");
        exports.deepCopyWithDefault = deepCopyWithDefault;
        var RawConfigDecorator = function() {
            function RawConfigDecorator() {
                (0, _classCallCheck3["default"])(this, RawConfigDecorator);
            }
            return (0, _createClass3["default"])(RawConfigDecorator, null, [ {
                key: "decorate",
                value: function(config) {
                    return config = config || {}, config = this.filterByVersion(config), config = this.withDefault(config), 
                    config = this.parseBooleans(config), config = this.parseBrowserValues(config), config = this.filterInvalidPageRegexp(config), 
                    config = this.collectSubdomains(config), config = this.collectPartials(config);
                }
            }, {
                key: "withDefault",
                value: function(config) {
                    config = deepCopyWithDefault(config);
                    var defaultConfig = defaults_1.PAGE_CONFIG && defaults_1.PAGE_CONFIG.pageConfig || {};
                    defaults_1.OVERRIDE_PAGE_CONFIG || {};
                    return config.pageConfig = lodash_1.merge({}, defaultConfig, config.pageConfig), 
                    config;
                }
            }, {
                key: "filterByVersion",
                value: function(config) {
                    var version = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : config_1.getVersion();
                    config = deepCopyWithDefault(config);
                    var pageConfig = config.pageConfig;
                    return config.pageConfig = (0, _keys2["default"])(pageConfig).filter(function(key) {
                        var value = pageConfig[key], ruleVersion = value.version;
                        return !ruleVersion || "*" === ruleVersion || 1 !== util_1.versionComparator(version, ruleVersion);
                    }).reduce(function(hsh, key) {
                        return (0, _assign2["default"])({}, hsh, (0, _defineProperty3["default"])({}, key, config.pageConfig[key]));
                    }, {}), config;
                }
            }, {
                key: "parseBooleans",
                value: function(config) {
                    function isTruly(value) {
                        return !(value === !1 || "false" === value);
                    }
                    function isExistsOrFalse(value) {
                        return !!value && isTruly(value);
                    }
                    config = deepCopyWithDefault(config);
                    var pageConfig = config.pageConfig;
                    return (0, _keys2["default"])(pageConfig).forEach(function(key) {
                        pageConfig[key] || (pageConfig[key] = {});
                        var rule = pageConfig[key];
                        rule.enabled = isTruly(rule.enabled), rule.matchInclusions = isExistsOrFalse(rule.matchInclusions), 
                        rule.matchSubdomains = isExistsOrFalse(rule.matchSubdomains), rule.pages && (0, 
                        _keys2["default"])(rule.pages).forEach(function(key) {
                            rule.pages[key].enabled = isTruly(rule.pages[key].enabled);
                        });
                    }), config;
                }
            }, {
                key: "parseBrowserValues",
                value: function(config) {
                    var browser = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : util_1.getBrowser();
                    config = deepCopyWithDefault(config);
                    var pageConfig = config.pageConfig;
                    return (0, _keys2["default"])(pageConfig).map(function(key) {
                        var disabled = pageConfig[key] && pageConfig[key].disabledBrowsers;
                        disabled && disabled.includes(browser) && (pageConfig[key].enabled = !1);
                    }), config;
                }
            }, {
                key: "filterInvalidPageRegexp",
                value: function(config) {
                    config = deepCopyWithDefault(config);
                    var pageConfig = config.pageConfig;
                    return (0, _keys2["default"])(pageConfig).forEach(function(key) {
                        var config = pageConfig[key];
                        config.pages && (config.pages = (0, _keys2["default"])(config.pages).filter(function(key) {
                            try {
                                return new RegExp(key);
                            } catch (e) {
                                return !1;
                            }
                        }).reduce(function(hsh, key) {
                            return (0, _assign2["default"])({}, hsh, (0, _defineProperty3["default"])({}, key, config.pages[key]));
                        }, {}));
                    }), config;
                }
            }, {
                key: "collectSubdomains",
                value: function(config) {
                    config = deepCopyWithDefault(config);
                    var pageConfig = config.pageConfig;
                    config.subdomains = [];
                    try {
                        config.subdomains = (0, _keys2["default"])(pageConfig).filter(function(domain) {
                            return pageConfig[domain].matchSubdomains;
                        }).map(function(domain) {
                            return (0, _assign2["default"])({
                                domain: domain
                            }, pageConfig[domain]);
                        });
                    } catch (err) {
                        console.warn("Cannot collect subdomains from config");
                    }
                    return config;
                }
            }, {
                key: "collectPartials",
                value: function(config) {
                    config = deepCopyWithDefault(config);
                    var pageConfig = config.pageConfig;
                    config.partials = [];
                    try {
                        config.partials = (0, _keys2["default"])(pageConfig).filter(function(domain) {
                            return pageConfig[domain].matchInclusions;
                        }).map(function(domain) {
                            return (0, _assign2["default"])({
                                domain: domain
                            }, pageConfig[domain]);
                        });
                    } catch (err) {
                        console.warn("Cannot collect partials from config");
                    }
                    return config;
                }
            } ]), RawConfigDecorator;
        }();
        exports.RawConfigDecorator = RawConfigDecorator, exports.decorateConfig = decorateConfig;
    }, {
        "../config": 179,
        "../util": 207,
        "./defaults": 188,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/helpers/defineProperty": 31,
        lodash: "lodash"
    } ],
    188: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _exports$PAGE_CONFIG_, _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray"), _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var lodash_1 = require("lodash"), config_1 = require("lib/config");
        exports.PROTOCOL_VERSION = "1.0", exports.SITES_TO_RELOAD = [ "inbox.google.com", "mail.google.com", "yahoo.com", "mail.live.com", "facebook.com", "tumblr.com", "stackoverflow.com", "wordpress.com", "wordpress.org", "blogspot.com" ], 
        exports.FACEBOOK_SITES = [ "facebook.com", "messenger.com", "work.fb.com", "business.facebook.com" ], 
        exports.HTML_GHOST_SITES = [ "twitter.com" ].concat((0, _toConsumableArray3["default"])(exports.FACEBOOK_SITES)), 
        exports.CUSTOM_UNSUPPORTED_MESSAGES = {
            "drive.google.com": {
                title: "Google Drive",
                message: 'We hope to support Google Drive apps<br/> in the future, but for now please use your</br> <a class="openGrammarly" href="' + config_1.URLS.app + '">Grammarly Editor</a>.'
            },
            "docs.google.com": {
                title: "Google Drive",
                message: 'We hope to support Google Drive apps<br/> in the future, but for now please use your</br> <a class="openGrammarly" href="' + config_1.URLS.app + '">Grammarly Editor</a>.'
            },
            "chrome.google.com": {
                title: "Web Store"
            }
        };
        var UPDATE_30M = 18e5;
        exports.PAGE_CONFIG_DEFAULT_INTERVAL = UPDATE_30M, exports.PAGE_CONFIG_UPDATE_INTERVALS = [ 6e5, exports.PAGE_CONFIG_DEFAULT_INTERVAL, 36e5, 108e5, 432e5, 864e5, 31536e6 ], 
        exports.OVERRIDE_PAGE_CONFIG = {}, exports.PAGE_CONFIG_INTERNAL = (_exports$PAGE_CONFIG_ = {
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
        }, (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "app." + config_1.GRAMMARLY_DOMAIN, {
            enabled: !1,
            grammarlyEditor: !0
        }), (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "linkedin.com", {
            pages: {
                "/messaging": {
                    afterReplaceEvents: [ "input" ]
                }
            }
        }), (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "plus.google.com", {
            afterReplaceEvents: [ "keyup" ],
            minFieldHeight: 0,
            minFieldWidth: 0
        }), (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "facebook.com", {
            minFieldHeight: 0,
            fields: [ {
                name: "caption_text"
            } ]
        }), (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "mail.google.com", {
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
        }), (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "drive.google.com", {
            track: !0
        }), (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "docs.google.com", {
            track: !0
        }), (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "app.asana.com", {
            fields: [ {
                className: "task-row-text-input"
            } ]
        }), (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "tumblr.com", {
            fields: [ {
                attr: [ "aria-label", "Post title" ]
            }, {
                attr: [ "aria-label", "Type or paste a URL" ]
            } ]
        }), (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "chrome.google.com", {
            dontShowDisabledBadge: !0
        }), (0, _defineProperty3["default"])(_exports$PAGE_CONFIG_, "airbnb.com", {
            fields: [ {
                attr: [ "id", "question" ]
            } ]
        }), _exports$PAGE_CONFIG_);
        var PAGE_CONFIG_DEFAULT = {
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
        exports.PAGE_CONFIG = {
            pageConfig: lodash_1.merge({}, PAGE_CONFIG_DEFAULT, exports.PAGE_CONFIG_INTERNAL)
        };
    }, {
        "babel-runtime/helpers/defineProperty": 31,
        "babel-runtime/helpers/toConsumableArray": 35,
        "lib/config": 179,
        lodash: "lodash"
    } ],
    189: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var config_base_1 = require("./config-base"), prefs_1 = require("universal/bg/prefs"), extension_api_1 = require("extension-api"), prefs = new prefs_1.PrefsImpl(extension_api_1.getGlobalExtensionApi().preferences);
        exports.pageConfig = new config_base_1.Config(prefs);
    }, {
        "./config-base": 185,
        "extension-api": 161,
        "universal/bg/prefs": 214
    } ],
    190: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var NAME = "Grammarly", VERSION = 1, STORE_NAME = "configuration", _localforage = void 0;
        try {
            _localforage = require("localforage"), _localforage.config({
                name: NAME,
                version: VERSION,
                size: 4194304,
                storeName: STORE_NAME
            });
        } catch (e) {
            console.error("Fallback to memory storage", e);
            var storage = {};
            _localforage = {
                getItem: function(key) {
                    return _promise2["default"].resolve(storage[key]);
                },
                setItem: function(key, value) {
                    return storage[key] = value, _promise2["default"].resolve(value);
                },
                clear: function() {
                    storage = {}, _promise2["default"].resolve(!0);
                }
            };
        }
        exports.localforage = _localforage;
    }, {
        "babel-runtime/core-js/promise": 26,
        localforage: "localforage"
    } ],
    191: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var localforage_1 = require("./localforage"), utils_1 = require("./utils"), META_KEY = "lastConfigUpdate", Meta = function() {
            function Meta() {
                (0, _classCallCheck3["default"])(this, Meta);
            }
            return (0, _createClass3["default"])(Meta, [ {
                key: "load",
                value: function() {
                    return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                        var meta;
                        return _regenerator2["default"].wrap(function(_context) {
                            for (;;) switch (_context.prev = _context.next) {
                              case 0:
                                return _context.next = 2, localforage_1.localforage.getItem(META_KEY);

                              case 2:
                                return meta = _context.sent, this.set(meta), _context.abrupt("return", this);

                              case 5:
                              case "end":
                                return _context.stop();
                            }
                        }, _callee, this);
                    }));
                }
            }, {
                key: "set",
                value: function(meta) {
                    var _ref = meta || {}, protocolVersion = _ref.protocolVersion, version = _ref.version, status = _ref.status, info = _ref.info, date = _ref.date, interval = _ref.interval;
                    return this._meta = {
                        date: Number(date) || 0,
                        interval: utils_1.getInterval(Number(interval)),
                        protocolVersion: protocolVersion,
                        version: version,
                        status: status,
                        info: info
                    }, localforage_1.localforage.setItem(META_KEY, this._meta);
                }
            }, {
                key: "config",
                get: function() {
                    return this._meta;
                }
            } ]), Meta;
        }();
        exports.Meta = Meta;
    }, {
        "./localforage": 190,
        "./utils": 192,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/regenerator": 37
    } ],
    192: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function isValid(config) {
            if (config && config.pageConfig && (0, _keys2["default"])(config).length && (0, 
            _keys2["default"])(config.pageConfig).length && (!config.protocolVersion || config.protocolVersion === defaults_1.PROTOCOL_VERSION)) return !0;
        }
        function getInterval(ms) {
            return defaults_1.PAGE_CONFIG_UPDATE_INTERVALS.includes(ms) ? ms : defaults_1.PAGE_CONFIG_DEFAULT_INTERVAL;
        }
        var _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var defaults_1 = require("./defaults");
        exports.isValid = isValid, exports.getInterval = getInterval;
    }, {
        "./defaults": 188,
        "babel-runtime/core-js/object/keys": 24
    } ],
    193: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var timers_1 = require("lib/timers"), tracking_1 = require("lib/tracking"), Profiler = function() {
            function Profiler() {
                var _this = this;
                (0, _classCallCheck3["default"])(this, Profiler), this.timings = {}, this.track = function(cb) {
                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
                    return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                        return _regenerator2["default"].wrap(function(_context) {
                            for (;;) switch (_context.prev = _context.next) {
                              case 0:
                                return _context.abrupt("return", this._track.apply(this, [ !1, cb ].concat(args)));

                              case 1:
                              case "end":
                                return _context.stop();
                            }
                        }, _callee, this);
                    }));
                }, this.trackAsync = function(cb) {
                    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
                    return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                        return _regenerator2["default"].wrap(function(_context2) {
                            for (;;) switch (_context2.prev = _context2.next) {
                              case 0:
                                return _context2.abrupt("return", this._track.apply(this, [ !0, cb ].concat(args)));

                              case 1:
                              case "end":
                                return _context2.stop();
                            }
                        }, _callee2, this);
                    }));
                }, this._track = function(async, cb) {
                    for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) args[_key3 - 2] = arguments[_key3];
                    return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee3() {
                        var name;
                        return _regenerator2["default"].wrap(function(_context3) {
                            for (;;) switch (_context3.prev = _context3.next) {
                              case 0:
                                if (name = cb.name + (async ? "__sync" : ""), timers_1.timers.start(name), _context3.prev = 2, 
                                !async) {
                                    _context3.next = 8;
                                    break;
                                }
                                return _context3.next = 6, cb.apply(void 0, args);

                              case 6:
                                _context3.next = 9;
                                break;

                              case 8:
                                cb.apply(void 0, args);

                              case 9:
                                _context3.next = 14;
                                break;

                              case 11:
                                throw _context3.prev = 11, _context3.t0 = _context3["catch"](2), _context3.t0;

                              case 14:
                                return _context3.prev = 14, this.timings[name] = timers_1.timers.stop(name), _context3.finish(14);

                              case 17:
                              case "end":
                                return _context3.stop();
                            }
                        }, _callee3, this, [ [ 2, 11, 14, 17 ] ]);
                    }));
                };
            }
            return (0, _createClass3["default"])(Profiler, [ {
                key: "start",
                value: function(name) {
                    timers_1.timers.start(name);
                }
            }, {
                key: "stop",
                value: function(name) {
                    this.timings[name] = timers_1.timers.stop(name);
                }
            } ], [ {
                key: "start",
                value: function(name) {
                    timers_1.timers.start(name);
                }
            }, {
                key: "stop",
                value: function(name) {
                    var max = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e4, time = timers_1.timers.stop(name);
                    return time > max && (console.warn("profiler_" + name + "_time_exceeded", time), 
                    "pageConfig_init" === name && tracking_1.logger.tooLongPageConfigInit(time), "updateUser" === name && tracking_1.logger.tooLongUserUpdateTime(time)), 
                    time;
                }
            } ]), Profiler;
        }();
        exports.Profiler = Profiler;
    }, {
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/regenerator": 37,
        "lib/timers": 195,
        "lib/tracking": 201
    } ],
    194: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function transformOptions(opts) {
            if (opts.data && (opts.query || "post" !== opts.method) && (opts.url += "?" + paramStr(opts.data)), 
            opts.data && "post" === opts.method && !opts.query && !opts.body) {
                try {
                    opts.body = (0, _stringify2["default"])(opts.data);
                } catch (e) {
                    opts.body = {}, console.warn(e);
                }
                opts.headers = opts.headers || {}, opts.headers["Content-Type"] = opts.headers["Content-Type"] || "application/json", 
                delete opts.data;
            }
            return opts.credentials = "include", opts;
        }
        function fetch(url) {
            var opts = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return opts.url = url, transformOptions(opts), util_1.isBg() || config_1.isTestsMode() ? bgFetch(opts) : message.promiseBackground("fetch", opts).then(function(data) {
                if (lodash_1.isObject(data) && data.error) throw new Error(data.error);
                return data;
            });
        }
        function bgFetch(opts) {
            function processResponse(resp) {
                return resp.ok ? resp[opts.isText ? "text" : "json"]() : resp.text().then(function(body) {
                    throw {
                        name: "RequestError",
                        body: body,
                        statusCode: resp.status,
                        message: resp.statusText
                    };
                });
            }
            var url = opts.url;
            return delete opts.url, url ? _promise2["default"].race([ window.fetch(url, opts).then(processResponse).then(function(res) {
                if ("string" != typeof res && res && res.error) throw new Error(res.error);
                return res;
            }), util_1.delay(opts.timeout || AJAX_TIMEOUT).then(function() {
                throw new Error("Fetch request to " + url + " rejected by timeout");
            }) ]) : _promise2["default"].reject(new Error("Url is not defined in fetch request"));
        }
        function paramStr(data) {
            var req = "", _loop = function(item) {
                if (Array.isArray(data[item])) {
                    if (data[item].length) {
                        var items = data[item].map(function(val) {
                            return item + "=" + val;
                        }).join("&");
                        req += "" + (req.length ? "&" : "") + items;
                    }
                } else req += "" + (req.length ? "&" : "") + item + "=" + encodeURIComponent(data[item]);
            };
            for (var item in data) _loop(item);
            return req;
        }
        var _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), _stringify = require("babel-runtime/core-js/json/stringify"), _stringify2 = _interopRequireDefault(_stringify);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var lodash_1 = require("lodash"), util_1 = require("./util"), config_1 = require("./config"), message = require("./message"), AJAX_TIMEOUT = 1e4;
        util_1.isBg() && message.on("fetch", function(data, cb) {
            return bgFetch(data).then(cb, function(error) {
                return cb({
                    error: error.message
                });
            });
        }), exports.transformOptions = transformOptions, exports.fetch = fetch, exports.paramStr = paramStr;
    }, {
        "./config": 179,
        "./message": 183,
        "./util": 207,
        "babel-runtime/core-js/json/stringify": 18,
        "babel-runtime/core-js/promise": 26,
        lodash: "lodash"
    } ],
    195: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _timers = {};
        exports.timers = {
            start: function(id) {
                _timers[id] = Date.now();
            },
            stop: function(id) {
                var passed = this.passed(id);
                return delete _timers[id], passed;
            },
            passed: function(id) {
                return id && _timers[id] ? Date.now() - _timers[id] : 0;
            }
        };
    }, {} ],
    196: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function createGnarClient() {
            var fetchFn = window.fetch.bind(window), logger = telemetry_ts_1.LoggingImpl.DefaultLogAppender.createRootLogger("gnar", telemetry_ts_1.Logging.LogLevel.INFO, new telemetry_ts_1.LoggingImpl.GetFelogClient(config.URLS.newFelog, config.appName, config.getVersion(), config.ENV, fetchFn)), metrics = telemetry_ts_1.TimeSeriesImpl.MetricsStorage.createRoot("gnar", config.URLS.newFelog, fetchFn), backendStorage = new gnarclientweb_1.BackendStorage(fetchFn, config_1.GNAR.url), chromeCookieStorage = new gnarclientweb_1.ChromeCookieStorage(config_1.GNAR.url, config_1.GNAR.domain), webExtensionsCookieStorage = new gnarclientweb_1.WebExtensionsCookieStorage(config_1.GNAR.url, config_1.GNAR.domain), cidManager = new gnarclientweb_1.ContainerIdManager(util_1.isChrome() ? chromeCookieStorage : util_1.isFF() ? webExtensionsCookieStorage : backendStorage, [ new gnarclientweb_1.CookieStorage(config_1.GNAR.domain), new gnarclientweb_1.LocalStorage(), new gnarclientweb_1.MemoryStorage() ], logger.getLogger("containerId"), metrics.getCounter("containerId"), util_1.isChrome() ? 1e3 : 5e3);
            return new gnarclientweb_1.GnarClientImpl(config_1.GNAR.url, config.gnarAppName, config_1.getVersion(), fetchFn, cidManager, logger, metrics, (!0));
        }
        function init() {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                return _regenerator2["default"].wrap(function(_context) {
                    for (;;) switch (_context.prev = _context.next) {
                      case 0:
                        try {
                            tracker_1.tracker().gnar = createGnarClient();
                        } catch (error) {
                            logger_1.logger.gnarClientInitFail(error && error.message);
                        }

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                }, _callee, this);
            }));
        }
        function processCookiesFromGrammarly(_ref) {
            function updateId(name, value) {
                value && name && (pageCookie(name, null), pageCookie(name, value, cookieOptions));
            }
            var dapi = _ref.dapi, domain = location_1.getDomain(), cookieOptions = {
                path: "/",
                domain: domain,
                expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            };
            updateId("__fngrprnt__", dapi);
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var pageCookie = require("cookie"), location_1 = require("../location"), config = require("../config"), util_1 = require("../util"), config_1 = require("../config"), tracker_1 = require("./tracker"), logger_1 = require("./logger"), gnarclientweb_1 = require("@grammarly-npm/gnarclientweb"), telemetry_ts_1 = require("@grammarly-npm/telemetry.ts");
        exports.init = init, exports.processCookiesFromGrammarly = processCookiesFromGrammarly, 
        exports.getContainerIdOrUndefined = function() {
            return __awaiter(void 0, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                return _regenerator2["default"].wrap(function(_context2) {
                    for (;;) switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.prev = 0, _context2.next = 3, tracker_1.tracker().gnar.getContainerId();

                      case 3:
                        return _context2.abrupt("return", _context2.sent);

                      case 6:
                        return _context2.prev = 6, _context2.t0 = _context2["catch"](0), _context2.abrupt("return", void 0);

                      case 9:
                      case "end":
                        return _context2.stop();
                    }
                }, _callee2, this, [ [ 0, 6 ] ]);
            }));
        };
    }, {
        "../config": 179,
        "../location": 182,
        "../util": 207,
        "./logger": 202,
        "./tracker": 205,
        "@grammarly-npm/gnarclientweb": 3,
        "@grammarly-npm/telemetry.ts": 6,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/regenerator": 37,
        cookie: "cookie"
    } ],
    197: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function call(msg) {
            for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) data[_key2 - 1] = arguments[_key2];
            var fallback = function(e) {
                console.warn("tracking call " + msg + " failed, reason: ", e);
            };
            if (util_1.isBg()) util_1.asyncCall(function() {
                var _bgPageCallImpls$meth;
                try {
                    switch (logCall(msg, data), msg) {
                      case bgPageCallImpls.CALL_HANDLER_ID:
                        var method = data[0], args = data.slice(1);
                        (_bgPageCallImpls$meth = bgPageCallImpls.methods)[method].apply(_bgPageCallImpls$meth, (0, 
                        _toConsumableArray3["default"])(args));
                        break;

                      default:
                        runMessage(msg, data);
                    }
                } catch (e) {
                    fallback(e);
                }
            }, 20); else {
                var WAIT_TIMEOUT = 1e4, timeout = void 0, preventTimeout = function() {
                    return clearInterval(timeout);
                }, errorHandle = function(e) {
                    preventTimeout(), fallback(e);
                };
                timeout = window.setTimeout(function() {
                    return errorHandle("timeout call through bg page");
                }, WAIT_TIMEOUT), message.emitBackground("tracking-call", {
                    msg: msg,
                    data: data
                }, preventTimeout);
            }
        }
        function runMessage(msg, data) {
            var args = msg.split("."), method = args.pop(), ctx = args.reduce(function(closure, part) {
                return part in closure ? closure[part] : {};
            }, tracker_1.tracker());
            return ctx && method && ctx[method] ? void ctx[method].apply(ctx, (0, _toConsumableArray3["default"])(data)) : console.error("No method " + msg + " in tracker object");
        }
        function logCall(msg, data) {
            console.info(msg, data);
        }
        function getLog() {
            var result = log.slice(0);
            return log.length = 0, result;
        }
        var _assign = require("babel-runtime/core-js/object/assign"), _toConsumableArray2 = (_interopRequireDefault(_assign), 
        require("babel-runtime/helpers/toConsumableArray")), _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2), _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var bgPageCallImpls, message = require("../message"), util_1 = require("../util"), tracker_1 = require("./tracker"), felogPixel_1 = require("./felogPixel"), config = require("../config"), felogClient_1 = require("./felogClient"), request_1 = require("lib/request");
        !function(bgPageCallImpls) {
            var methods, felogClient = util_1.isBg() ? new felogClient_1.DefaultFelogClient(config.URLS.newFelog, config.appName, config.getVersion(), config.ENV, request_1.fetch.bind(window)) : void 0;
            !function(methods) {
                function sendFelog(logger, message, level, extra) {
                    if (!felogClient) throw Error("felogClient unavailable");
                    felogClient.sendEvent(logger, message, level, extra)["catch"](function(_) {
                        return felogPixel_1.sendEventPixel(logger, message, level, extra, felogClient.getContext());
                    });
                }
                function sendFelogUsageEvent(logger, message, level, usage) {
                    if (!felogClient) throw Error("felogClient unavailable");
                    felogClient.sendUsageEvent(logger, message, level, usage)["catch"](function(_) {
                        return felogPixel_1.sendEventPixel(logger, message, level);
                    });
                }
                function setUserId(id) {
                    felogClient && felogClient.setUserId(id);
                }
                function setContainerId(containerId) {
                    felogClient && felogClient.setContainerId(containerId);
                }
                methods.sendFelog = sendFelog, methods.sendFelogUsageEvent = sendFelogUsageEvent, 
                methods.setUserId = setUserId, methods.setContainerId = setContainerId;
            }(methods = bgPageCallImpls.methods || (bgPageCallImpls.methods = {})), bgPageCallImpls.CALL_HANDLER_ID = "tracking/RPC";
        }(bgPageCallImpls || (bgPageCallImpls = {})), exports.callBgPage = (0, _keys2["default"])(bgPageCallImpls.methods).reduce(function(o, k) {
            return o[k] = function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                return call.apply(void 0, [ bgPageCallImpls.CALL_HANDLER_ID, k ].concat(args));
            }, o;
        }, {});
        var log = [];
        exports.call = call, exports.getLog = getLog;
    }, {
        "../config": 179,
        "../message": 183,
        "../util": 207,
        "./felogClient": 199,
        "./felogPixel": 200,
        "./tracker": 205,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/helpers/toConsumableArray": 35,
        "lib/request": 194
    } ],
    198: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function felogRequestUrl(appName, appVersion, env, baseUrl, loggerName, message, level, extra, context) {
            var payload = {
                message: message,
                logger: loggerName,
                level: LogLevel.toFelogString(level),
                application: appName,
                version: appVersion,
                userId: context && context.userId,
                containerId: context && context.containerId,
                env: env
            };
            return extra && (payload.extra = extra), baseUrl + "/log?json=" + encodeURIComponent((0, 
            _stringify2["default"])(payload));
        }
        function felogUsageRequestUrl(appName, appVersion, env, baseUrl, loggerName, message, level, usage) {
            var payload = {
                message: message,
                logger: loggerName,
                level: LogLevel.toFelogString(level),
                application: appName,
                version: appVersion,
                env: env,
                extra_usage: usage
            };
            return baseUrl + "/log?json=" + encodeURIComponent((0, _stringify2["default"])(payload));
        }
        var _stringify = require("babel-runtime/core-js/json/stringify"), _stringify2 = _interopRequireDefault(_stringify);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var LogLevel;
        !function(LogLevel) {
            LogLevel[LogLevel.INFO = 0] = "INFO", LogLevel[LogLevel.WARN = 1] = "WARN", LogLevel[LogLevel.ERROR = 2] = "ERROR";
        }(LogLevel = exports.LogLevel || (exports.LogLevel = {})), function(LogLevel) {
            function toFelogString(l) {
                switch (l) {
                  case LogLevel.INFO:
                    return "INFO";

                  case LogLevel.WARN:
                    return "WARN";

                  case LogLevel.ERROR:
                    return "ERROR";

                  default:
                    ;
                    throw new TypeError("Unrecognized log level " + l);
                }
            }
            LogLevel.toFelogString = toFelogString;
        }(LogLevel = exports.LogLevel || (exports.LogLevel = {})), exports.felogRequestUrl = felogRequestUrl, 
        exports.felogUsageRequestUrl = felogUsageRequestUrl;
    }, {
        "babel-runtime/core-js/json/stringify": 18
    } ],
    199: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var timeseries_impl_1 = require("@grammarly-npm/telemetry.ts/lib/timeseries_impl"), felog_1 = require("./felog"), util_1 = require("lib/util"), DefaultFelogClient = function() {
            function DefaultFelogClient(_baseUrl, _appName, _appVersion, _env, _fetch) {
                (0, _classCallCheck3["default"])(this, DefaultFelogClient), this._baseUrl = _baseUrl, 
                this._appName = _appName, this._appVersion = _appVersion, this._env = _env, this._fetch = _fetch, 
                this._context = {
                    userId: void 0,
                    containerId: void 0
                }, this._metrics = timeseries_impl_1.MetricsStorage.createRoot(this._env + "." + this._appName, this._baseUrl, this._fetch);
            }
            return (0, _createClass3["default"])(DefaultFelogClient, [ {
                key: "setUserId",
                value: function(userId) {
                    this._context = (0, _assign2["default"])({}, this._context, {
                        userId: userId
                    });
                }
            }, {
                key: "setContainerId",
                value: function(containerId) {
                    this._context = (0, _assign2["default"])({}, this._context, {
                        containerId: containerId
                    });
                }
            }, {
                key: "getContext",
                value: function() {
                    return this._context;
                }
            }, {
                key: "sendEvent",
                value: function(loggerName, message, level, extra) {
                    return this._fetch(felog_1.felogRequestUrl(this._appName, this._appVersion, this._env, this._baseUrl, loggerName, message, level, extra, this._context), {
                        mode: "no-cors",
                        method: "get",
                        cache: "no-cache"
                    }).then(function(_) {})["catch"](function(_) {});
                }
            }, {
                key: "sendUsageEvent",
                value: function(loggerName, message, level, usageData) {
                    var usage = {
                        domain: usageData.domain,
                        accountType: usageData.accountType,
                        fieldType: usageData.fieldType,
                        fieldSupported: usageData.fieldSupported
                    };
                    if (this._context.containerId || this._context.userId) {
                        var str = (this._context.containerId || this._context.userId) + usageData.domain;
                        usage.groupInfo = util_1.normalizedHashCode(str, 1e9);
                    }
                    return this._fetch(felog_1.felogUsageRequestUrl(this._appName, this._appVersion, this._env, this._baseUrl, loggerName, message, level, usage), {
                        mode: "no-cors",
                        method: "get",
                        cache: "no-cache"
                    }).then(function(_) {})["catch"](function(_) {});
                }
            }, {
                key: "sendCounter",
                value: function(name, delta) {
                    this._metrics.getCounter(name).increment(delta);
                }
            }, {
                key: "sendTimer",
                value: function(name, time) {
                    this._metrics.getTimer(name).recordTime(time);
                }
            } ]), DefaultFelogClient;
        }();
        exports.DefaultFelogClient = DefaultFelogClient;
    }, {
        "./felog": 198,
        "@grammarly-npm/telemetry.ts/lib/timeseries_impl": 11,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "lib/util": 207
    } ],
    200: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function sendEventPixel(loggerName, message, level, extra, context) {
            var img = document.createElement("img");
            return img.src = felog_1.felogRequestUrl(config.appName, config.getVersion(), config.ENV, config.URLS.newFelog, loggerName, message, level, extra, context), 
            _promise2["default"].resolve();
        }
        var _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var config = require("../newConfig"), felog_1 = require("./felog");
        exports.sendEventPixel = sendEventPixel;
    }, {
        "../newConfig": 184,
        "./felog": 198,
        "babel-runtime/core-js/promise": 26
    } ],
    201: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function initBg() {
            var _require = require("./bgonly"), init = _require.init, processCookiesFromGrammarly = _require.processCookiesFromGrammarly;
            init()["catch"](function(_) {
                return logger_1.logger.bgTrackingInitFail();
            }), on = require("./on").on, message.on("tracking-fire", function(_ref) {
                var msg = _ref.msg, data = _ref.data;
                return fire.apply(void 0, [ msg ].concat((0, _toConsumableArray3["default"])(data)));
            }), message.on("tracker-init", processCookiesFromGrammarly), message.on("tracking-call", function(_ref2) {
                var msg = _ref2.msg, data = _ref2.data, cb = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : util_1._f;
                call_1.call.apply(call_1, [ msg ].concat((0, _toConsumableArray3["default"])(data))), 
                cb();
            }), fire("activity-ping");
        }
        function fire(msg) {
            for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) data[_key - 1] = arguments[_key];
            if (util_1.isBg()) {
                if (!on[msg]) return console.error("No handler specified for message: " + msg);
                util_1.asyncCall(function() {
                    var _on;
                    return (_on = on)[msg].apply(_on, data);
                }, 20);
            } else message.emitBackground("tracking-fire", {
                msg: msg,
                data: data
            });
        }
        function initContentScript() {
            function getCookies() {
                times++, times > MAX && clearInterval(interval);
                var data = {
                    gnar: pageCookie("gnar_containerId"),
                    dapi: pageCookie("__fngrprnt__")
                };
                clearInterval(interval), message.emitBackground("tracker-init", data);
            }
            var times = 0, pageCookie = require("cookie");
            pageCookie["default"] && (pageCookie = pageCookie["default"]);
            var interval = setInterval(getCookies, 500), MAX = 10;
        }
        var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray"), _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var util_1 = require("../util"), message = require("../message"), call_1 = require("./call"), logger_1 = require("./logger");
        exports.logger = logger_1.logger;
        var call_2 = require("./call");
        exports.call = call_2.call, exports.getLog = call_2.getLog;
        var on = {};
        exports.initBg = initBg, exports.fire = fire, exports.initContentScript = initContentScript;
    }, {
        "../message": 183,
        "../util": 207,
        "./bgonly": 196,
        "./call": 197,
        "./logger": 202,
        "./on": 203,
        "babel-runtime/helpers/toConsumableArray": 35,
        cookie: "cookie"
    } ],
    202: [ function(require, module, exports) {
        "use strict";
        function logUnhandledErrors() {
            window.addEventListener("error", function(e) {
                return exports.logger.unhandledBgPageException(e);
            }), window.addEventListener("unhandledrejection", function(e) {
                return exports.logger.unhandledBgPageRejection(e);
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var call_1 = require("./call"), telemetry_1 = require("./telemetry"), newConfig_1 = require("../newConfig");
        exports.logger = new telemetry_1.Telemetry(call_1.callBgPage.sendFelog.bind(call_1.callBgPage), call_1.callBgPage.sendFelogUsageEvent.bind(call_1.callBgPage), call_1.callBgPage.setUserId.bind(call_1.callBgPage), call_1.callBgPage.setContainerId.bind(call_1.callBgPage)), 
        newConfig_1.isBg() && (console.info("Installing unhandled error loggers..."), logUnhandledErrors());
    }, {
        "../newConfig": 184,
        "./call": 197,
        "./telemetry": 204
    } ],
    203: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _exports$on, _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _slicedToArray2 = require("babel-runtime/helpers/slicedToArray"), _slicedToArray3 = _interopRequireDefault(_slicedToArray2), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var util_1 = require("../util"), call_1 = require("./call"), logger_1 = require("./logger"), prefs_1 = require("universal/bg/prefs"), extension_api_1 = require("extension-api");
        exports.on = (_exports$on = {}, (0, _defineProperty3["default"])(_exports$on, "activity-ping", function() {}), 
        (0, _defineProperty3["default"])(_exports$on, "daily-ping", function(id, cookiesDisabled) {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                var prefs, pingDate, _pingDate$split, _pingDate$split2, storageNextDate, oldId, newId;
                return _regenerator2["default"].wrap(function(_context) {
                    for (;;) switch (_context.prev = _context.next) {
                      case 0:
                        if (id) {
                            _context.next = 2;
                            break;
                        }
                        return _context.abrupt("return");

                      case 2:
                        return call_1.call("gnar.pingMaybe"), prefs = new prefs_1.PrefsImpl(extension_api_1.getGlobalExtensionApi().preferences), 
                        _context.next = 6, prefs.get("pingDate");

                      case 6:
                        if (pingDate = _context.sent, "string" != typeof pingDate && (pingDate = ""), _pingDate$split = pingDate.split("|"), 
                        _pingDate$split2 = (0, _slicedToArray3["default"])(_pingDate$split, 2), storageNextDate = _pingDate$split2[0], 
                        oldId = _pingDate$split2[1], newId = cookiesDisabled ? "cookiesDisabled" : id, !(storageNextDate && storageNextDate > Date.now() && oldId === newId)) {
                            _context.next = 12;
                            break;
                        }
                        return _context.abrupt("return");

                      case 12:
                        return logger_1.logger.dailyPing(), _context.next = 15, prefs.set("pingDate", [ util_1.getNextPingDate(), newId ].join("|"));

                      case 15:
                      case "end":
                        return _context.stop();
                    }
                }, _callee, this);
            }));
        }), (0, _defineProperty3["default"])(_exports$on, "app_signin_success", function(placement) {
            call_1.call("gnar.track", "userLoginForm/accepted", {
                placement: placement
            });
        }), (0, _defineProperty3["default"])(_exports$on, "app_signup_success", function(placement) {
            call_1.call("gnar.track", "userAccountSignupForm/accepted", {
                placement: placement
            });
        }), (0, _defineProperty3["default"])(_exports$on, "signin-error", function(error) {
            error.errorType = "Server-Side", call_1.call("gnar.track", "userLoginForm/rejected");
        }), (0, _defineProperty3["default"])(_exports$on, "signup-error", function(error) {
            error.errorType = "Server-Side", call_1.call("gnar.track", "userAccountSignupForm/rejected");
        }), (0, _defineProperty3["default"])(_exports$on, "upgrade-after-register", function() {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                return _regenerator2["default"].wrap(function(_context2) {
                    for (;;) switch (_context2.prev = _context2.next) {
                      case 0:
                        call_1.call("gnar.track", "Account_Type_Selected");

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                }, _callee2, this);
            }));
        }), (0, _defineProperty3["default"])(_exports$on, "hook-clicked", function(placement) {
            call_1.call("gnar.track", "upgradeHookClicked", {
                placement: placement
            }), logger_1.logger.userUpgradeClick(placement);
        }), (0, _defineProperty3["default"])(_exports$on, "correct-btn-clicked", function() {
            call_1.call("gnar.track", "gbuttonClicked"), logger_1.logger.gButtonClick();
        }), (0, _defineProperty3["default"])(_exports$on, "btn-disable-in-field", function(enabled) {
            call_1.call("gnar.track", "checkingInFieldToggled", {
                enabled: enabled
            }), logger_1.logger.checkingToggledInField(enabled);
        }), (0, _defineProperty3["default"])(_exports$on, "button-change-state", function() {}), 
        (0, _defineProperty3["default"])(_exports$on, "login-attempt", function(placement) {
            call_1.call("gnar.track", "signInClicked", {
                placement: placement
            });
        }), (0, _defineProperty3["default"])(_exports$on, "show-dictionary", function() {
            call_1.call("gnar.track", "showDictionary");
        }), (0, _defineProperty3["default"])(_exports$on, "referral-shown", function(placement) {
            call_1.call("gnar.track", "referral/referralNotificationShown", {
                placement: placement
            });
        }), (0, _defineProperty3["default"])(_exports$on, "referral-clicked", function(placement) {
            call_1.call("gnar.track", "referral/referralButtonClicked", {
                placement: placement
            });
        }), (0, _defineProperty3["default"])(_exports$on, "tab-connected", function(user, _ref, _ref2, domain, isGrammarlyEditorPage) {
            var enabled = _ref.enabled, cookiesDisabled = _ref2.cookiesDisabled;
            this["daily-ping"](user.id, cookiesDisabled), enabled || isGrammarlyEditorPage === !0 || logger_1.logger.disabledTabLoad(domain, user.type);
        }), (0, _defineProperty3["default"])(_exports$on, "session-invalidate", function(user, oldUser, reason, cookiesDisabled, _containerId) {
            var id = user.id, anonymous = user.anonymous, isTest = user.isTest;
            id !== oldUser.id && (call_1.call("gnar.setUser", id, isTest), this["daily-ping"](id, cookiesDisabled)), 
            reason && logger_1.logger.sessionInvalidated(reason, id !== oldUser.id), oldUser.email && !oldUser.anonymous && anonymous && logger_1.logger.unexpectedAnonymous({
                email: oldUser.email,
                token: oldUser.token,
                grauth: oldUser.grauth,
                tokenEqualsGrauth: oldUser.token === oldUser.grauth,
                cookiesDisabled: cookiesDisabled,
                reason: reason
            });
        }), (0, _defineProperty3["default"])(_exports$on, "set-dapi-prop", function(propName, value) {
            "dialectWeak" === propName && call_1.call("gnar.track", "languageWeakPreference", {
                dialect: value
            }), logger_1.logger.dapiPropInitialized(propName, value);
        }), (0, _defineProperty3["default"])(_exports$on, "change-dialect", function(_ref3) {
            var language = _ref3.language, dialectWeak = _ref3.dialectWeak, trackingData = {
                language: language
            };
            dialectWeak && (trackingData.sameAsWeak = language === dialectWeak), call_1.call("gnar.track", "languageStrongPreference", trackingData);
        }), (0, _defineProperty3["default"])(_exports$on, "change-defs", function(data) {
            call_1.call("gnar.track", "definitionsToggled", data), logger_1.logger.toggleExtensionDefs(data.enabled);
        }), (0, _defineProperty3["default"])(_exports$on, "checking-toggled", function(data) {
            call_1.call("gnar.track", "checkingToggled", data), logger_1.logger.toggleExtension(data.enabled, data.placement);
        }), (0, _defineProperty3["default"])(_exports$on, "disable-until-next-visit", function() {
            call_1.call("gnar.track", "disableUntilNextVisit"), logger_1.logger.disableUntilNextVisit();
        }), (0, _defineProperty3["default"])(_exports$on, "disable-button-click", function() {
            call_1.call("gnar.track", "disableButtonClick"), logger_1.logger.disableButtonClick();
        }), (0, _defineProperty3["default"])(_exports$on, "popup-open", function() {
            call_1.call("gnar.track", "browserToolbarButtonClicked");
        }), (0, _defineProperty3["default"])(_exports$on, "popup-open-on-unsupported", function() {
            call_1.call("gnar.track", "browserToolbarButtonClicked/unsupported");
        }), (0, _defineProperty3["default"])(_exports$on, "cookie-overflow", function(total, biggestCookie) {
            logger_1.logger.cookieOverflow(total, biggestCookie);
        }), (0, _defineProperty3["default"])(_exports$on, "premium-popup-show", function() {
            call_1.call("gnar.track", "upgradeReferralPopupShown");
        }), (0, _defineProperty3["default"])(_exports$on, "premium-popup-upgrade-click", function() {
            call_1.call("gnar.track", "upgradeReferralPremiumBtnClicked");
        }), (0, _defineProperty3["default"])(_exports$on, "premium-popup-referral-click", function() {
            call_1.call("gnar.track", "upgradeReferralInviteBtnClicked");
        }), (0, _defineProperty3["default"])(_exports$on, "email-perception-popup-show", function(isFirstShown) {
            call_1.call("gnar.track", "askForFeedback-popup-show", {
                isFirstShown: isFirstShown
            }), logger_1.logger.emailPerceptionPopupShow();
        }), (0, _defineProperty3["default"])(_exports$on, "email-perception-popup-cancel", function(isFirstShown) {
            call_1.call("gnar.track", "askForFeedback-popup-cancel", {
                isFirstShown: isFirstShown
            }), logger_1.logger.emailPerceptionPopupCancel();
        }), (0, _defineProperty3["default"])(_exports$on, "email-perception-button-hover", function() {
            call_1.call("gnar.track", "askForFeedback-button-hover"), logger_1.logger.emailPerceptiongButtonHover();
        }), (0, _defineProperty3["default"])(_exports$on, "email-perception-learn-more-click", function() {
            call_1.call("gnar.track", "emailPerceptionOptInLearnMore-button-click");
        }), (0, _defineProperty3["default"])(_exports$on, "email-perception-disable-click", function() {
            call_1.call("gnar.track", "dontShowEmailPerceptionAgain-button-click");
        }), (0, _defineProperty3["default"])(_exports$on, "onboarding-popup-show", function() {
            call_1.call("gnar.track", "onboarding-popup-show"), logger_1.logger.onboardingPopupShow();
        }), (0, _defineProperty3["default"])(_exports$on, "onboarding-popup-cancel", function() {
            call_1.call("gnar.track", "onboarding-popup-cancel"), logger_1.logger.onboardingPopupCancel();
        }), (0, _defineProperty3["default"])(_exports$on, "onboardingTutorial-popup-show", function() {
            call_1.call("gnar.track", "onboardingTutorial-popup-show"), logger_1.logger.onboardingTutorialShow();
        }), (0, _defineProperty3["default"])(_exports$on, "onboardingTutorialNext-button-click", function() {
            call_1.call("gnar.track", "onboardingTutorialNext-button-click");
        }), (0, _defineProperty3["default"])(_exports$on, "onboardingTutorialPersonalize-button-click", function() {
            call_1.call("gnar.track", "onboardingTutorialPersonalize-button-click");
        }), (0, _defineProperty3["default"])(_exports$on, "onboardingTutorialSave-button-click", function() {
            call_1.call("gnar.track", "onboardingTutorialSave-button-click");
        }), (0, _defineProperty3["default"])(_exports$on, "onboardingTutorialLetsWrite-button-click", function() {
            call_1.call("gnar.track", "onboardingTutorialLetsWrite-button-click");
        }), _exports$on);
    }, {
        "../util": 207,
        "./call": 197,
        "./logger": 202,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/defineProperty": 31,
        "babel-runtime/helpers/slicedToArray": 34,
        "babel-runtime/regenerator": 37,
        "extension-api": 161,
        "universal/bg/prefs": 214
    } ],
    204: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _stringify = require("babel-runtime/core-js/json/stringify"), _stringify2 = _interopRequireDefault(_stringify), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var felog_1 = require("./felog"), CARD_EVENTS_PROBABILITY = .1, PROXY_EVENTS_PROBABILITY = .05, Telemetry = function() {
            function Telemetry(_sendFelog, _sendFelogUsage, _setUserId, _setContainerId) {
                var _this = this;
                (0, _classCallCheck3["default"])(this, Telemetry), this._sendFelog = _sendFelog, 
                this._sendFelogUsage = _sendFelogUsage, this._setUserId = _setUserId, this._setContainerId = _setContainerId, 
                this.pageLoadTimeout = function() {
                    _this._send("cs.connection.failover.pageLoad.timeout", "content script init failed", felog_1.LogLevel.ERROR);
                }, this.appLoadTimeout = function() {
                    _this._send("cs.connection.failover.appLoad.timeout", "extension init timed out", felog_1.LogLevel.ERROR);
                }, this.differentStateDomain = function(stateDomain) {
                    _this._send("cs.state.differentDomain", "received state for different domain", felog_1.LogLevel.INFO, {
                        stateDomain: stateDomain
                    });
                }, this.restoredBgConnection = function(timeWithoutConnection) {
                    _this._send("cs.connection.bg.restored", "bg page connection restored", felog_1.LogLevel.INFO, {
                        timeWithoutConnection: timeWithoutConnection
                    });
                }, this.initWithoutBgConnection = function() {
                    _this._send("cs.connection.bg.disconnected", "no connection to bg page", felog_1.LogLevel.INFO);
                }, this.fetchDefinitionsFail = function() {
                    _this._send("cs.connection.api.definition.failed", "definitions fetch failed", felog_1.LogLevel.WARN);
                }, this.infinityCheckResetFail = function(delay) {
                    _this._send("cs.connection.infiniteCheck.failed", "infinite check reset failed", felog_1.LogLevel.ERROR, {
                        delay: delay
                    });
                }, this.tooLongPageConfigInit = function(initTime) {
                    _this._send("cs.pageConfig.init.exceeded", "page config init timeout", felog_1.LogLevel.WARN, {
                        initTime: initTime
                    });
                }, this.tooLongUserUpdateTime = function(updateTime) {
                    _this._send("bg.state.user.update.exceeded", "user state update took too long", felog_1.LogLevel.WARN, {
                        updateTime: updateTime
                    });
                }, this.lostBgPageConnection = function() {
                    _this._send("cs.gbutton.bgСonnection.lost", "gbutton connection to bg page lost", felog_1.LogLevel.INFO);
                }, this.restoreBgPageConnection = function(time) {
                    _this._send("cs.gbutton.bgСonnection.restored", "gbutton connection to bg page restored", felog_1.LogLevel.INFO, {
                        time: time
                    });
                }, this.badCursorPosition = function() {
                    _this._send("cs.editor.badCursorPosition", "incorrect cursor position in grammarly-editor", felog_1.LogLevel.INFO);
                }, this.cursorJump = function() {
                    _this._send("cs.editor.cursorJump", "cursor jump detected", felog_1.LogLevel.WARN);
                }, this.signinOpen = function() {
                    _this._send("cs.signin.open", "sign in dialog opened", felog_1.LogLevel.INFO);
                }, this.signinClose = function(openTime) {
                    _this._send("cs.signin.close", "sign in dialog closed", felog_1.LogLevel.INFO, {
                        openTime: openTime
                    });
                }, this.tabReloadClick = function() {
                    _this._send("cs.gbutton.reload.click", "gbutton reload clicked", felog_1.LogLevel.WARN);
                }, this.popupLoadError = function(message, name) {
                    _this._send("cs.popup.load.error", "could not open pop-up editor", felog_1.LogLevel.ERROR, {
                        message: message,
                        name: name
                    });
                }, this.loginNoBgPageConnection = function(message) {
                    _this._send("debug.cs.connection.signin.bg.timeout", "can not connect to bg page on login", felog_1.LogLevel.INFO, {
                        message: message
                    });
                }, this.pageConfigCDNError = function(message) {
                    _this._send("cs.pageConfig.cdn.error", "could not read page config", felog_1.LogLevel.ERROR, {
                        message: message
                    });
                }, this.pageConfigLocalStorageError = function(message, name) {
                    _this._send("cs.pageConfig.localStorage.error", "could not read page config from localStorage", felog_1.LogLevel.INFO, {
                        message: message,
                        name: name
                    });
                }, this.pageConfigUpdated = function(oldVersion, newVersion) {
                    _this._send("cs.pageConfig.updated", "page config updated", felog_1.LogLevel.INFO, {
                        oldVersion: oldVersion,
                        newVersion: newVersion
                    });
                }, this.settingsPopupTimeout = function() {
                    _this._send("settings.popup.init.timeout", "settings popup open timeout", felog_1.LogLevel.WARN);
                }, this.settingsUsupportedShow = function(popupType) {
                    _this._send("settings.popup.state.unsupported.show", "page unsupported message shown", felog_1.LogLevel.INFO, {
                        popupType: popupType
                    });
                }, this.settingsPopupToggled = function(isPopupDisabled) {
                    _this._send("settings.popup.experiment.toggle", "settings popup disabled/enabled for experiment on /personalize page", felog_1.LogLevel.INFO, {
                        isPopupDisabled: isPopupDisabled
                    });
                }, this.socketBgError = function() {
                    _this._send("bg.socket.error", "bg page socket error", felog_1.LogLevel.WARN);
                }, this.capiNotAuthorizedLoop = function(authDegradation, cookiesDisabled) {
                    _this._send("debug.socket.notAuthorizedLoop", "could not authenticate on capi and auth", felog_1.LogLevel.INFO, {
                        authDegradation: authDegradation,
                        cookiesDisabled: cookiesDisabled
                    });
                }, this.socketDisabledCookie = function() {
                    _this._send("debug.socket.disabledCookies", "disabled cookies after failed authentication", felog_1.LogLevel.INFO);
                }, this.socketBgRestored = function(tryCount) {
                    _this._send("debug.bg.socket.restored", "capi session restored", felog_1.LogLevel.INFO, {
                        tryCount: tryCount
                    });
                }, this.socketBgReconnectFail = function(token, tryCount) {
                    _this._send("bg.socket.reconnect.fail", "could not restore ws connection", felog_1.LogLevel.WARN, {
                        token: token,
                        tryCount: tryCount
                    });
                }, this.socketCsError = function() {
                    _this._send("cs.socket.error", "content script socket error", felog_1.LogLevel.WARN);
                }, this.soketCsErrorMsg = function(message) {
                    _this._send("cs.socket.errorMsg", "capi error", felog_1.LogLevel.WARN, {
                        message: message
                    });
                }, this.gnarClientInitFail = function(message) {
                    _this._send("gnar.bg.tracking.gnar.init.fail", "gnar init failed", felog_1.LogLevel.WARN, {
                        message: message
                    });
                }, this.bgTrackingInitFail = function() {
                    _this._send("debug.tracking.init.fail", "bg page tracking library init failed", felog_1.LogLevel.INFO);
                }, this.dailyPing = function() {
                    _this._send("debug.dailyPing", "daily ping", felog_1.LogLevel.INFO);
                }, this.userUpgradeClick = function(placement) {
                    _this._send("cs.ui.action.upgradeClick", "upgrade hook clicked", felog_1.LogLevel.INFO, {
                        placement: placement
                    });
                }, this.gButtonClick = function() {
                    _this._send("cs.ui.gbutton.click", "gbutton clicked", felog_1.LogLevel.INFO);
                }, this.checkingToggledInField = function(enabled) {
                    _this._send("cs.ui.gbutton.toggleInField", "checking toggled in field", felog_1.LogLevel.INFO, {
                        enabled: enabled
                    });
                }, this.sessionInvalidated = function(reason, userChanged) {
                    _this._send("bg.session.invalidated", "user session invalidated", felog_1.LogLevel.INFO, {
                        reason: reason,
                        userChanged: userChanged
                    });
                }, this.unexpectedAnonymous = function(data) {
                    _this._send("debug.bg.session.unexpectedAnonymous", "user changed to anonymous", felog_1.LogLevel.INFO, data);
                }, this.dapiPropInitialized = function(name, value) {
                    _this._send("bg.settings.dapi.prop.init", "save property to the DAPI", felog_1.LogLevel.INFO, {
                        name: name,
                        value: value
                    });
                }, this.getDapiPropError = function(property, body) {
                    _this._send("bg.connection.dapi.getProp.error", "could not get dapi property", felog_1.LogLevel.WARN, {
                        property: property,
                        body: body
                    });
                }, this.setDapiPropError = function(property, body) {
                    _this._send("bg.connection.dapi.setProp.error", "could not set dapi property", felog_1.LogLevel.WARN, {
                        property: property,
                        body: body
                    });
                }, this.toggleExtensionDefs = function(enabled) {
                    _this._send("bg.settings.definitions.toggle", "definitions toggled for domain", felog_1.LogLevel.INFO, {
                        enabled: enabled
                    });
                }, this.toggleExtension = function(enabled, placement) {
                    _this._send("bg.settings.extension.toggle", "extension toggled for domain", felog_1.LogLevel.INFO, {
                        enabled: enabled,
                        placement: placement
                    });
                }, this.disableUntilNextVisit = function() {
                    _this._send("cs.gbutton.disableUntilNextVisit", "extension temporary disabled on the current tab", felog_1.LogLevel.INFO);
                }, this.disableButtonClick = function() {
                    _this._send("cs.gbutton.disableButtonClick", "clicked on disable button in gButton", felog_1.LogLevel.INFO);
                }, this.cookieOverflow = function(size, biggestCookie) {
                    _this._send("debug.bg.state.cookie.overflow", "cookie is too big", felog_1.LogLevel.INFO, {
                        size: size,
                        biggestCookie: biggestCookie
                    });
                }, this.externalChangePlan = function() {
                    _this._send("bg.api.external.changePlan", "plan changed from editor", felog_1.LogLevel.INFO);
                }, this.externalChangeDialect = function() {
                    _this._send("bg.api.external.changeDialect", "dialect changed from editor", felog_1.LogLevel.INFO);
                }, this.externalChangeUser = function() {
                    _this._send("bg.api.external.changeUsed", "user changed from editor", felog_1.LogLevel.INFO);
                }, this.externalLogout = function() {
                    _this._send("bg.api.external.logout", "user logged out form editor", felog_1.LogLevel.INFO);
                }, this.externalEnableEmailPerception = function() {
                    _this._send("bg.api.external.enableEmailPerception", "user enabled email perception feature on the funnel", felog_1.LogLevel.INFO);
                }, this.bgPageStartFail = function(message, stack) {
                    _this._send("bg.start.fail", "bg page start failed", felog_1.LogLevel.ERROR, {
                        message: message,
                        stack: stack
                    });
                }, this.bgPageInitTimeout = function(initTime) {
                    _this._send("bg.state.start.timeout", "bg page init timeout", felog_1.LogLevel.WARN, {
                        initTime: initTime
                    });
                }, this.bgPageInitFail = function(initAttempts) {
                    _this._send("bg.state.init.fail", "bg page init failed", felog_1.LogLevel.ERROR, {
                        initAttempts: initAttempts
                    });
                }, this.extensionUpdated = function(currentVersion, previousVersion) {
                    _this._send("bg.state.updated", "extension updated", felog_1.LogLevel.INFO, {
                        currentVersion: currentVersion,
                        previousVersion: previousVersion
                    });
                }, this.extensionUpdateFail = function(previousVersion) {
                    _this._send("bg.state.update.fail", "extension update failed", felog_1.LogLevel.INFO, {
                        previousVersion: previousVersion
                    });
                }, this.cannotGetInstallSource = function() {
                    _this._send("bg.getSource.fail", "failed to get extension install source", felog_1.LogLevel.WARN);
                }, this.extensionInstall = function(source) {
                    _this._send("bg.state.install", "extension installed", felog_1.LogLevel.INFO, {
                        source: source
                    });
                }, this.chromeForcedToUpdate = function(newVersion) {
                    _this._send("bg.chrome.forcedToUpdate", "chrome forced update", felog_1.LogLevel.INFO, {
                        newVersion: newVersion
                    });
                }, this.chromeContentScriptLoadError = function(message, type) {
                    _this._send("bg.chrome.cs.load.error", "content script execution error", felog_1.LogLevel.WARN, {
                        message: message,
                        type: type
                    });
                }, this.reloadNotificationShow = function() {
                    _this._send("bg.ui.notification.tabsReload.show", "extension reload notification shown", felog_1.LogLevel.WARN);
                }, this.reloadNotificationClick = function() {
                    _this._send("bg.ui.notification.tabsReload.click", "reload notification clicked", felog_1.LogLevel.INFO);
                }, this.fetchUserFail = function(reason, body, statusCode) {
                    _this._send("bg.user.fetch.fail", "failed to update user", felog_1.LogLevel.WARN, {
                        body: body,
                        statusCode: statusCode,
                        reason: reason
                    });
                }, this.fetchMimicFail = function(body, statusCode) {
                    _this._send("bg.user.mimic.fail", "mimic request failed", felog_1.LogLevel.WARN, {
                        body: body,
                        statusCode: statusCode
                    });
                }, this.fetchCookieFail = function() {
                    _this._send("bg.cookie.fail", "could not get grauth from cookie", felog_1.LogLevel.WARN);
                }, this.fetchSettingsFail = function(body, statusCode) {
                    _this._send("bg.user.settings.fail", "could not get settings from auth", felog_1.LogLevel.WARN, {
                        body: body,
                        statusCode: statusCode
                    });
                }, this.frequentCookieChanges = function(canceled) {
                    _this._send("debug.cookie.onChange.error", "cookie change too frequent", felog_1.LogLevel.INFO, {
                        canceled: canceled
                    });
                }, this.initializePropFromDapi = function(name) {
                    _this._send("bg.state.dapi.prop.initialize", "set property from dapi", felog_1.LogLevel.INFO, {
                        name: name
                    });
                }, this.emailPerceptionPopupShow = function() {
                    _this._send("cs.emailPerception.popup.show", "show email perception popup on gmail/inbox domain", felog_1.LogLevel.INFO);
                }, this.emailPerceptionPopupCancel = function() {
                    _this._send("cs.emailPerception.popup.cancel", "user canceled email perception popup on gmail/inbox", felog_1.LogLevel.INFO);
                }, this.emailPerceptiongButtonHover = function() {
                    _this._send("cs.emailPerception.gbutton.hover", "user hovered gButton and ask for feedback btn is shown on gmail/inbox", felog_1.LogLevel.INFO);
                }, this.onboardingPopupShow = function() {
                    _this._send("cs.onboarding.popup.show", "show onboarding popup to user after first time extension install", felog_1.LogLevel.INFO);
                }, this.onboardingPopupCancel = function() {
                    _this._send("cs.onboarding.popup.cancel", "user canceled onboarding popup", felog_1.LogLevel.INFO);
                }, this.onboardingTutorialShow = function() {
                    _this._send("cs.onboarding.tutorial.show", "opened onboarding dialog after popup", felog_1.LogLevel.INFO);
                }, this.onboardingVideoLoaded = function() {
                    _this._send("cs.onboarding.tutorial.video.loaded", "load video data for onboarding tutorial", felog_1.LogLevel.INFO);
                }, this.saveEmailFeedbackError = function(body) {
                    _this._send("bg.emailfeedback.save.error", "failed to save email feedback", felog_1.LogLevel.INFO, {
                        body: body
                    });
                }, this.incognitoInit = function() {
                    _this._send("bg.incognito.init", "extension initialized in incognito mode", felog_1.LogLevel.INFO);
                }, this.disabledCookiesInit = function() {
                    _this._send("bg.cookie.disabled", "extension initialized with disabled cookies", felog_1.LogLevel.INFO);
                }, this.proxyInit = function() {
                    _this._sendWithProbability(PROXY_EVENTS_PROBABILITY, "proxy.init", "proxy script initialized", felog_1.LogLevel.INFO);
                }, this.proxyPortDisconnected = function(portName, errorMessage) {
                    _this._sendWithProbability(PROXY_EVENTS_PROBABILITY, "proxy.disconnect", "proxy port disconnected", felog_1.LogLevel.INFO, {
                        port: portName,
                        error: errorMessage
                    });
                }, this.unhandledBgPageException = function(e) {
                    _this._send("bg.unhandledException", "unhandled exception on background page", felog_1.LogLevel.ERROR, {
                        message: e.error ? e.error.message : e.message
                    });
                }, this.unhandledBgPageRejection = function(e) {
                    _this._send("bg.unhandledRejection", "unhandled promise rejection on background page", felog_1.LogLevel.ERROR, {
                        message: null != e.reason ? "string" == typeof e.reason ? e.reason : e.reason.message : void 0
                    });
                }, this.storageMigrationSucceeded = function() {
                    _this._send("bg.storageMigration.success", "storage migration succeeded", felog_1.LogLevel.INFO, {});
                }, this.storageMigrationFailed = function(e) {
                    _this._send("bg.storageMigration.failure", "storage migration failed", felog_1.LogLevel.ERROR, {
                        message: e && e.message
                    });
                }, this.cardShowAction = function() {
                    _this._sendWithProbability(CARD_EVENTS_PROBABILITY, "cs.editor.card.show", "show card action", felog_1.LogLevel.INFO);
                }, this.cardHideAction = function() {
                    _this._sendWithProbability(CARD_EVENTS_PROBABILITY, "cs.editor.card.hide", "hide card action", felog_1.LogLevel.INFO);
                }, this.cardReplacementAction = function() {
                    _this._sendWithProbability(CARD_EVENTS_PROBABILITY, "cs.editor.card.replacement", "click on the replacement in the card", felog_1.LogLevel.INFO);
                }, this.cardAddToDictAction = function() {
                    _this._sendWithProbability(CARD_EVENTS_PROBABILITY, "cs.editor.card.addToDict", "click add to dictionary button in the card", felog_1.LogLevel.INFO);
                }, this.cardIgnoreAction = function() {
                    _this._sendWithProbability(CARD_EVENTS_PROBABILITY, "cs.editor.card.ignore", "click ignore button in the card", felog_1.LogLevel.INFO);
                }, this.synonymCardShowAction = function(notFoundCard) {
                    _this._sendWithProbability(CARD_EVENTS_PROBABILITY, "cs.editor.synonym.show", "show synonymous card action", felog_1.LogLevel.INFO, {
                        notFoundCard: notFoundCard
                    });
                }, this.synonymCardHideAction = function(notFoundCard) {
                    _this._sendWithProbability(CARD_EVENTS_PROBABILITY, "cs.editor.synonym.hide", "hide synonymous card action", felog_1.LogLevel.INFO, {
                        notFoundCard: notFoundCard
                    });
                }, this.synonymReplacementAction = function() {
                    _this._sendWithProbability(CARD_EVENTS_PROBABILITY, "cs.editor.synonym.replacement", "click on the replacement in the synonym", felog_1.LogLevel.INFO);
                }, this.dictCardShowAction = function() {
                    _this._sendWithProbability(CARD_EVENTS_PROBABILITY, "cs.editor.dict.show", "show dictionary card action", felog_1.LogLevel.INFO);
                }, this.dictCardHideAction = function() {
                    _this._sendWithProbability(CARD_EVENTS_PROBABILITY, "cs.editor.dict.hide", "hide dictionary card action", felog_1.LogLevel.INFO);
                }, this.couldNotParseTransform = function(transformHTML, fallbackParseSuccessful) {
                    _this._send("cs.cards.transforms.parse.error", "Could not parse transform in inline cards", felog_1.LogLevel.WARN, {
                        transformHTML: transformHTML,
                        fallbackParseSuccessful: fallbackParseSuccessful
                    });
                }, this.disabledTabLoad = function(domain, accountType) {
                    _this._sendUsage("usage.loadOnDisabledTab", "tab load event with disabled extension", felog_1.LogLevel.INFO, {
                        domain: domain,
                        accountType: accountType
                    });
                }, this.initSession = function(domain, accountType, fieldType, fieldSupported) {
                    _this._sendUsage("usage.session.init", "init in the field", felog_1.LogLevel.INFO, {
                        domain: domain,
                        accountType: accountType,
                        fieldType: fieldType,
                        fieldSupported: fieldSupported
                    });
                }, this.cardFirstInteraction = function(domain, accountType, fieldType) {
                    _this._sendUsage("usage.card.interaction", "interaction with card in the field", felog_1.LogLevel.INFO, {
                        domain: domain,
                        accountType: accountType,
                        fieldType: fieldType
                    });
                };
            }
            return (0, _createClass3["default"])(Telemetry, [ {
                key: "_send",
                value: function(logger, message, level, extra) {
                    var dataString = void 0;
                    try {
                        dataString = (0, _stringify2["default"])(extra);
                    } catch (err) {
                        dataString = "Failed to stringify event properties: '" + err + "', '" + (err && err.message) + "'", 
                        console.warn(dataString, "for " + message + "@" + logger);
                    }
                    try {
                        this._sendFelog(logger, message, level, null != extra ? {
                            json: dataString
                        } : void 0);
                    } catch (err) {
                        console.warn("Failed to send felog for " + message + "@" + logger + ": '" + err + "', '" + (err && err.message) + "'");
                    }
                }
            }, {
                key: "_sendUsage",
                value: function(logger, message, level, usage) {
                    this._sendFelogUsage(logger, message, level, usage);
                }
            }, {
                key: "_sendWithProbability",
                value: function(probability, logger, message, level, extra) {
                    probability > Math.random() && this._send(logger, message, level, extra);
                }
            }, {
                key: "setUserId",
                value: function(id) {
                    this._setUserId(id);
                }
            }, {
                key: "setContainerId",
                value: function(id) {
                    this._setContainerId(id);
                }
            }, {
                key: "notificationShown",
                value: function(type) {
                    this._send("cs.notification.show", "show notification on the page", felog_1.LogLevel.INFO, {
                        type: type
                    });
                }
            }, {
                key: "notificationHide",
                value: function(type) {
                    this._send("cs.notification.hide", "hide notification on the page", felog_1.LogLevel.INFO, {
                        type: type
                    });
                }
            } ]), Telemetry;
        }();
        exports.Telemetry = Telemetry;
    }, {
        "./felog": 198,
        "babel-runtime/core-js/json/stringify": 18,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30
    } ],
    205: [ function(require, module, exports) {
        "use strict";
        function tracker() {
            return window.tracker = window.tracker || {}, window.tracker;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.tracker = tracker;
    }, {} ],
    206: [ function(require, module, exports) {
        "use strict";
        function getUTMQueryParam(name, value) {
            return name + "=" + encodeURIComponent(value);
        }
        function getUTMQuery(type, place) {
            return getUTMQueryParam("utm_medium", "internal") + "&" + getUTMQueryParam("utm_source", type) + "&" + getUTMQueryParam("utm_campaign", place);
        }
        function getSignUpURL(type, place) {
            return newConfig_1.URLS.signup + "?" + getUTMQuery(type, place);
        }
        function getSignInURL() {
            return newConfig_1.URLS.signin + "?" + getUTMQueryParam("utm_medium", "internal");
        }
        function getResetPasswordURL() {
            return newConfig_1.URLS.resetPassword + "?" + getUTMQueryParam("utm_medium", "internal");
        }
        function getTermsURL() {
            return newConfig_1.URLS.terms + "?" + getUTMQueryParam("utm_medium", "internal");
        }
        function getPrivatePolicyURL() {
            return newConfig_1.URLS.policy + "?" + getUTMQueryParam("utm_medium", "internal");
        }
        function getUpgradeURL(type, place) {
            return newConfig_1.URLS.upgrade + "?" + getUTMQuery(type, place);
        }
        function getExtensionSuccessURL() {
            return newConfig_1.URLS.welcomeC + "?" + getUTMQueryParam("utm_medium", "navigation");
        }
        function getAuthCreatePageURL() {
            var url = newConfig_1.URLS.authCreatePage + "/?extension_install=true";
            return url + "&" + getUTMQueryParam("utm_medium", "navigation");
        }
        function addParamsToUpgradeURL(url, type, place) {
            return url + "&" + getUTMQuery(type, place);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var newConfig_1 = require("./newConfig");
        exports.getSignUpURL = getSignUpURL, exports.getSignInURL = getSignInURL, exports.getResetPasswordURL = getResetPasswordURL, 
        exports.getTermsURL = getTermsURL, exports.getPrivatePolicyURL = getPrivatePolicyURL, 
        exports.getUpgradeURL = getUpgradeURL, exports.getExtensionSuccessURL = getExtensionSuccessURL, 
        exports.getAuthCreatePageURL = getAuthCreatePageURL, exports.addParamsToUpgradeURL = addParamsToUpgradeURL;
    }, {
        "./newConfig": 184
    } ],
    207: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function isGrammarlyEmail(email) {
            var isEmailForTests = [ "freeeeeeee@grammarly.com", "premiumuser@grammarly.com" ].indexOf(email) !== -1;
            return !isEmailForTests && /^.*@grammarly.com$/.test(email);
        }
        function chromeBgError() {
            return window.chrome && window.chrome.runtime && window.chrome.runtime.lastError;
        }
        function isFunction(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        }
        function interval(cb, time) {
            function run() {
                function _cb() {
                    timeout(), cb();
                }
                function timeout() {
                    var tid = setTimeout(_cb, time);
                    items[cb] = tid;
                }
                timeout();
            }
            var items = interval.items = interval.items || {}, item = items[cb];
            if (item || time) return item && !time ? (clearTimeout(item), void delete items[cb]) : void run();
        }
        function cancelInterval(cb) {
            interval(cb);
        }
        function s4() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        }
        function guid() {
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        }
        function _f() {}
        function _F() {
            return !0;
        }
        function bgPageReload() {
            window.chrome && window.chrome.runtime && window.chrome.runtime.reload ? window.chrome.runtime.reload() : window.location.reload();
        }
        function isGmail(doc) {
            if (doc.location) {
                var host = "mail.google.com" == doc.location.host, frames = doc.querySelector("iframe#js_frame") && doc.querySelector("iframe#sound_frame");
                return host || frames;
            }
        }
        function isValidEmail(value) {
            return /^[-!#$%&\'*+\\.\/0-9=?A-Z^_`a-z{|}~]+@[-!#$%&\'*+\\/0-9=?A-Z^_`a-z{|}~]+\.[-!#$%&\'*+\\.\/0-9=?A-Z^_`a-z{|}~]+$/.test(value);
        }
        function formatNumber(i) {
            return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        function declension(value, arr) {
            return arr[1 == value ? 0 : 1];
        }
        function stub(methods) {
            return _.transform(methods, function(result, m) {
                return result[m] = _f;
            });
        }
        function memoize(func, resolver, ttl) {
            var cache = {}, memoized = function() {
                var key = "_memoize_" + (resolver ? resolver.apply(this, arguments) : arguments[0]);
                return window.hasOwnProperty.call(cache, key) ? cache[key] : (ttl && setTimeout(function() {
                    delete cache[key];
                }, ttl), cache[key] = func.apply(this, arguments));
            };
            return memoized;
        }
        function syncWait(promise, methods) {
            return (0, _keys2["default"])(methods).reduce(function(obj, method) {
                return (0, _assign2["default"])({}, obj, (0, _defineProperty3["default"])({}, method, function() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    return promise.then(function() {
                        return methods[method].apply(methods, args);
                    });
                }));
            }, {});
        }
        function promisify(method) {
            return new _promise2["default"](function(resolve) {
                return method(resolve);
            });
        }
        function getRandomIntInclusive(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        function delay(ms) {
            return new _promise2["default"](function(resolve) {
                return setTimeout(resolve, ms);
            });
        }
        function formatDate(dateStr) {
            if (dateStr) {
                var date = new Date(dateStr);
                if ("Invalid Date" !== date.toString()) return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
            }
        }
        function createClass(getPrototype) {
            var _class = function() {};
            return _class.prototype = getPrototype(), _class;
        }
        function versionComparator() {
            function splitToArray(str) {
                return str.split(".").map(function(el) {
                    return Number(el) || 0;
                });
            }
            var v1 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", v2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", v1arr = splitToArray(v1), v2arr = splitToArray(v2), postfix = Array(Math.abs(v1arr.length - v2arr.length)).fill(0);
            if (v1arr.length > v2arr.length ? v2arr.push.apply(v2arr, (0, _toConsumableArray3["default"])(postfix)) : v1arr.push.apply(v1arr, (0, 
            _toConsumableArray3["default"])(postfix)), v1arr.every(function(v, i) {
                return v === v2arr[i];
            })) return 0;
            for (var i = 0, len = v1arr.length; i < len; i++) {
                if (v1arr[i] > v2arr[i]) return 1;
                if (v1arr[i] < v2arr[i]) return -1;
            }
            return -1;
        }
        function isBgAlive() {
            return __awaiter(this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                return _regenerator2["default"].wrap(function(_context) {
                    for (;;) switch (_context.prev = _context.next) {
                      case 0:
                        if (newConfig_1.isChrome() || newConfig_1.isFF()) {
                            _context.next = 2;
                            break;
                        }
                        return _context.abrupt("return", null);

                      case 2:
                        return _context.prev = 2, _context.next = 5, _promise2["default"].race([ new _promise2["default"](function(resolve) {
                            return window.chrome.runtime.sendMessage("ping", resolve);
                        }), delay(1e4).then(function(_) {
                            return "timeouted";
                        }) ]);

                      case 5:
                        return _context.abrupt("return", _context.sent);

                      case 8:
                        return _context.prev = 8, _context.t0 = _context["catch"](2), _context.abrupt("return", "orphaned");

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                }, _callee, this, [ [ 2, 8 ] ]);
            }));
        }
        function asyncCall(cb) {
            var time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
            setTimeout(cb, time);
        }
        function createChannel() {
            function put(msg) {
                if (resolveQueue.length > 0) {
                    var nextResolve = resolveQueue.shift();
                    nextResolve(msg);
                } else buffered ? messageQueue.push(msg) : messageQueue[0] = msg;
            }
            function take() {
                return messageQueue.length ? _promise2["default"].resolve(messageQueue.shift()) : new _promise2["default"](function(resolve) {
                    return resolveQueue.push(resolve);
                });
            }
            var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$buffered = _ref.buffered, buffered = void 0 === _ref$buffered || _ref$buffered, messageQueue = [], resolveQueue = [];
            return {
                take: take,
                put: put
            };
        }
        function normalizedHashCode(str) {
            var base = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
            if (!str) return NaN;
            var algo = nch.createHash("superfasthash");
            return parseInt(algo.hash(str), 16) % base;
        }
        function keyCode(event) {
            return event.which || event.charCode || event.keyCode || 0;
        }
        function br(val, last) {
            return val = val.replace(reBrSpace, "<br>" + nbsp).replace(reBr, "<br>"), last && (val = val.replace(reLastSpace, nbsp)), 
            val;
        }
        function trimLeft(s) {
            return s.replace(/^\s+/, "");
        }
        function trimRight(s) {
            return s.replace(/\s+$/, "");
        }
        function getNextPingDate() {
            var now = new Date();
            return now.getHours() > 2 && now.setDate(now.getDate() + 1), now.setHours(3), now.setMinutes(Math.floor(60 * Math.random())), 
            now.getTime();
        }
        function escapeRegExp(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray"), _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2), _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _ = require("lodash"), nch = require("non-crypto-hash"), newConfig_1 = require("./newConfig"), newConfig_2 = require("./newConfig");
        exports.isTestsMode = newConfig_2.isTestsMode, exports.getBrowser = newConfig_2.getBrowser, 
        exports.isBg = newConfig_2.isBg, exports.isBgOrPopup = newConfig_2.isBgOrPopup, 
        exports.isChrome = newConfig_2.isChrome, exports.isFF = newConfig_2.isFF, exports.isPopup = newConfig_2.isPopup, 
        exports.isSafari = newConfig_2.isSafari, exports.isEdge = newConfig_2.isEdge, exports.isWindows = newConfig_2.isWindows, 
        exports.isGrammarlyEmail = isGrammarlyEmail, exports.chromeBgError = chromeBgError, 
        exports.isFunction = isFunction, exports.interval = interval, function(interval) {
            interval.items = {};
        }(interval = exports.interval || (exports.interval = {})), exports.cancelInterval = cancelInterval, 
        exports.guid = guid, exports._f = _f, exports._F = _F, exports.bgPageReload = bgPageReload, 
        exports.isGmail = isGmail, exports.isValidEmail = isValidEmail, exports.formatNumber = formatNumber, 
        exports.declension = declension, exports.stub = stub, exports.memoize = memoize, 
        exports.syncWait = syncWait, exports.promisify = promisify, exports.getRandomIntInclusive = getRandomIntInclusive, 
        exports.delay = delay;
        var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        exports.formatDate = formatDate, exports.createClass = createClass, exports.versionComparator = versionComparator, 
        exports.isBgAlive = isBgAlive, exports.asyncCall = asyncCall, exports.createChannel = createChannel, 
        exports.normalizedHashCode = normalizedHashCode, exports.keyCode = keyCode, exports.NBSP_RE = new RegExp(String.fromCharCode(160), "g");
        var nbsp = String.fromCharCode(160), reBr = /\n/g, reLastSpace = /\s$/g, reBrSpace = new RegExp("\n" + String.fromCharCode(32), "g");
        exports.br = br, exports.trimLeft = trimLeft, exports.trimRight = trimRight, exports.SECOND = 1e3, 
        exports.MINUTE = 60 * exports.SECOND, exports.HOUR = 60 * exports.MINUTE, exports.DAY = 24 * exports.HOUR, 
        exports.ESC_KEY = 27, exports.ENTER_KEY = 13, exports.pastDays = function(date) {
            return Math.round(Math.abs(+new Date() - +new Date(date)) / exports.DAY);
        }, exports.getNextPingDate = getNextPingDate, exports.escapeRegExp = escapeRegExp;
    }, {
        "./newConfig": 184,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/defineProperty": 31,
        "babel-runtime/helpers/toConsumableArray": 35,
        "babel-runtime/regenerator": 37,
        lodash: "lodash",
        "non-crypto-hash": "non-crypto-hash"
    } ],
    208: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function flatMap(f, xs) {
            var _ref;
            return (_ref = []).concat.apply(_ref, (0, _toConsumableArray3["default"])(xs.map(f)));
        }
        function scan(f, seed, xs) {
            for (var r = [ seed ], acc = seed, i = 0; i < xs.length; i++) acc = f(acc, xs[i]), 
            r.push(acc);
            return r;
        }
        function maximum(xs) {
            return xs.reduce(function(max, x) {
                return x > max ? x : max;
            }, xs[0]);
        }
        function maximumBy(xs, f) {
            return 0 === xs.length ? void 0 : xs.reduce(function(acc, x) {
                var y = f(x);
                return y > acc[1] ? [ x, y ] : acc;
            }, [ xs[0], f(xs[0]) ])[0];
        }
        function reverse(xs) {
            return xs.slice().reverse();
        }
        function partition(f, xs) {
            for (var ys = [], zs = [], j = 0, k = 0, i = 0; i < xs.length; i++) f(xs[i]) ? ys[j++] = xs[i] : zs[k++] = xs[i];
            return [ ys, zs ];
        }
        function chunkBySize(size, xs) {
            if (size < 1) throw new Error("Invalid chunk size, expected > 0");
            if (0 === xs.length) return [ [] ];
            for (var result = [], x = 0; x < Math.ceil(xs.length / size); x++) result.push(xs.slice(x * size, (x + 1) * size));
            return result;
        }
        function unfold(f, seed) {
            for (var r = [], res = f(seed); void 0 !== res; ) r.push(res[0]), res = f(res[1]);
            return r;
        }
        function range(arg1, arg2) {
            return void 0 !== arg2 ? (0, _from2["default"])(Array(arg2 - arg1), function(_, i) {
                return i + arg1;
            }) : (0, _from2["default"])(Array(arg1), function(_, i) {
                return i;
            });
        }
        var _from = require("babel-runtime/core-js/array/from"), _from2 = _interopRequireDefault(_from), _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray"), _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.flatMap = flatMap, exports.scan = scan, exports.maximum = maximum, exports.maximumBy = maximumBy, 
        exports.reverse = reverse, exports.partition = partition, exports.chunkBySize = chunkBySize, 
        exports.unfold = unfold, exports.range = range;
    }, {
        "babel-runtime/core-js/array/from": 15,
        "babel-runtime/helpers/toConsumableArray": 35
    } ],
    209: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function assert(cond, msg) {
            if (!cond) throw new AssertionError(msg);
        }
        function assertNonNull(value, name) {
            if (null == value) throw new AssertionError(function() {
                return name ? "Expected " + name + " to be non-null" : "Expected non-null";
            });
            return value;
        }
        var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of"), _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn"), _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2), _inherits2 = require("babel-runtime/helpers/inherits"), _inherits3 = _interopRequireDefault(_inherits2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var AssertionError = function(_Error) {
            function AssertionError(msg) {
                return (0, _classCallCheck3["default"])(this, AssertionError), (0, _possibleConstructorReturn3["default"])(this, (AssertionError.__proto__ || (0, 
                _getPrototypeOf2["default"])(AssertionError)).call(this, "Assertion failed: " + (msg ? "string" == typeof msg ? msg : msg() : "(unnamed)")));
            }
            return (0, _inherits3["default"])(AssertionError, _Error), AssertionError;
        }(Error);
        exports.AssertionError = AssertionError, exports.assert = assert, exports.assertNonNull = assertNonNull;
    }, {
        "babel-runtime/core-js/object/get-prototype-of": 23,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/inherits": 32,
        "babel-runtime/helpers/possibleConstructorReturn": 33
    } ],
    210: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function optionalStringUnion(allowedValues, value) {
            return allowedValues.some(function(x) {
                return x === value;
            }) ? value : void 0;
        }
        function assertStringUnion(allowedValues, value, name) {
            var validated = optionalStringUnion(allowedValues, value);
            if (void 0 !== validated) return validated;
            throw new TypeError('Unrecognized string union value "' + value + '"' + (name ? " for " + name : ""));
        }
        function assertNever(x) {
            throw new MatchingNotExhaustiveError(x);
        }
        function optionalIntString(val) {
            var parsed = parseInt(val, 10);
            return isNaN(parsed) ? void 0 : parsed;
        }
        function assertIntString(val, name) {
            var opt = optionalIntString(val);
            if (void 0 !== opt) return opt;
            throw new Error("Expected a number string, got '" + val + "'" + (void 0 !== name ? " for " + name : ""));
        }
        function try_(run, handle) {
            try {
                return run();
            } catch (err) {
                return handle(err);
            }
        }
        var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of"), _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf), _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn"), _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2), _inherits2 = require("babel-runtime/helpers/inherits"), _inherits3 = _interopRequireDefault(_inherits2), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var assert_1 = require("./assert");
        exports.assert = assert_1.assert, exports.assertNonNull = assert_1.assertNonNull, 
        exports.AssertionError = assert_1.AssertionError;
        var promise_1 = require("./promise");
        exports.SafePromise = promise_1.SafePromise;
        var Arr = require("./array");
        exports.Arr = Arr;
        var Obj = require("./object");
        exports.Obj = Obj;
        var Global = function() {
            function Global(_getFallbackValue) {
                (0, _classCallCheck3["default"])(this, Global), this._getFallbackValue = _getFallbackValue;
            }
            return (0, _createClass3["default"])(Global, [ {
                key: "init",
                value: function(v) {
                    if (void 0 !== this._value) throw new Error("Global value already initialized.");
                    this._value = v;
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
            } ]), Global;
        }();
        exports.Global = Global, exports.optionalStringUnion = optionalStringUnion, exports.assertStringUnion = assertStringUnion;
        var MatchingNotExhaustiveError = function(_Error) {
            function MatchingNotExhaustiveError(actualValue) {
                return (0, _classCallCheck3["default"])(this, MatchingNotExhaustiveError), (0, _possibleConstructorReturn3["default"])(this, (MatchingNotExhaustiveError.__proto__ || (0, 
                _getPrototypeOf2["default"])(MatchingNotExhaustiveError)).call(this, "Matching not exhaustive" + (actualValue ? ": unexpected value " + actualValue : "")));
            }
            return (0, _inherits3["default"])(MatchingNotExhaustiveError, _Error), MatchingNotExhaustiveError;
        }(Error);
        exports.MatchingNotExhaustiveError = MatchingNotExhaustiveError, exports.assertNever = assertNever, 
        exports.optionalIntString = optionalIntString, exports.assertIntString = assertIntString, 
        exports.try_ = try_;
    }, {
        "./array": 208,
        "./assert": 209,
        "./object": 211,
        "./promise": 212,
        "babel-runtime/core-js/object/get-prototype-of": 23,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/helpers/inherits": 32,
        "babel-runtime/helpers/possibleConstructorReturn": 33
    } ],
    211: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function map(f, o) {
            var r = {};
            return (0, _keys2["default"])(o).forEach(function(k) {
                return r[k] = f(k, o[k]);
            }), r;
        }
        function filter(f, o) {
            var r = {};
            return (0, _keys2["default"])(o).forEach(function(k) {
                f(k, o[k]) && (r[k] = o[k]);
            }), r;
        }
        function values(o) {
            return (0, _keys2["default"])(o).map(function(k) {
                return o[k];
            });
        }
        function pairs(o) {
            return (0, _keys2["default"])(o).map(function(k) {
                return [ k, o[k] ];
            });
        }
        var _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.map = map, exports.filter = filter, exports.values = values, exports.pairs = pairs;
    }, {
        "babel-runtime/core-js/object/keys": 24
    } ],
    212: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var SafePromise;
        !function(SafePromise) {
            function create(run) {
                return new _promise2["default"](run);
            }
            function createCompletionSource() {
                var res = void 0, rej = void 0, p = new _promise2["default"](function(res_, rej_) {
                    res = res_, rej = rej_;
                });
                return {
                    promise: p,
                    resolve: function(v) {
                        res(v);
                    },
                    reject: function(err) {
                        rej(err);
                    }
                };
            }
            function sync(run) {
                return create(function(r, _) {
                    return r(run());
                });
            }
            SafePromise.create = create, SafePromise.createCompletionSource = createCompletionSource, 
            SafePromise.sync = sync;
        }(SafePromise = exports.SafePromise || (exports.SafePromise = {}));
    }, {
        "babel-runtime/core-js/promise": 26
    } ],
    213: [ function(require, module, exports) {
        "use strict";
        require("lib/bg/bg");
    }, {
        "lib/bg/bg": 170
    } ],
    214: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _stringify = require("babel-runtime/core-js/json/stringify"), _stringify2 = _interopRequireDefault(_stringify), _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys), _typeof2 = require("babel-runtime/helpers/typeof"), _typeof3 = _interopRequireDefault(_typeof2), _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var pget = function(prop, preferences) {
            return __awaiter(void 0, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                var value;
                return _regenerator2["default"].wrap(function(_context) {
                    for (;;) switch (_context.prev = _context.next) {
                      case 0:
                        return _context.prev = 0, _context.next = 3, preferences.get(prop);

                      case 3:
                        if (value = _context.sent, "undefined" !== value) {
                            _context.next = 8;
                            break;
                        }
                        return _context.abrupt("return", void 0);

                      case 8:
                        return _context.abrupt("return", value && JSON.parse(value));

                      case 9:
                        _context.next = 19;
                        break;

                      case 11:
                        if (_context.prev = 11, _context.t0 = _context["catch"](0), !_context.t0 || !_context.t0.toString().includes("SyntaxError")) {
                            _context.next = 18;
                            break;
                        }
                        throw preferences.remove(prop), new Error("'" + prop + "' has unparseable value, removing");

                      case 18:
                        throw _context.t0;

                      case 19:
                      case "end":
                        return _context.stop();
                    }
                }, _callee, this, [ [ 0, 11 ] ]);
            }));
        }, PrefsImpl = function PrefsImpl(_api) {
            var _this = this;
            (0, _classCallCheck3["default"])(this, PrefsImpl), this._api = _api, this.get = function(props) {
                return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                    var isArray, result, values, _this2 = this;
                    return _regenerator2["default"].wrap(function(_context2) {
                        for (;;) switch (_context2.prev = _context2.next) {
                          case 0:
                            if (isArray = Array.isArray(props), result = void 0, _context2.prev = 2, !isArray) {
                                _context2.next = 11;
                                break;
                            }
                            return props = props, _context2.next = 7, _promise2["default"].all(props.map(function(prop) {
                                return pget(prop, _this2._api);
                            }));

                          case 7:
                            values = _context2.sent, result = props.reduce(function(obj, prop, i) {
                                return (0, _assign2["default"])(obj, (0, _defineProperty3["default"])({}, prop, values[i]));
                            }, {}), _context2.next = 15;
                            break;

                          case 11:
                            return props = props, _context2.next = 14, pget(props, this._api);

                          case 14:
                            result = _context2.sent;

                          case 15:
                            _context2.next = 21;
                            break;

                          case 17:
                            _context2.prev = 17, _context2.t0 = _context2["catch"](2), isArray && (result = {}), 
                            console.warn("prefs get error:", _context2.t0);

                          case 21:
                            return _context2.abrupt("return", result);

                          case 22:
                          case "end":
                            return _context2.stop();
                        }
                    }, _callee2, this, [ [ 2, 17 ] ]);
                }));
            }, this.set = function(name, value) {
                return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee3() {
                    var _this3 = this;
                    return _regenerator2["default"].wrap(function(_context3) {
                        for (;;) switch (_context3.prev = _context3.next) {
                          case 0:
                            if (null === name || "object" !== ("undefined" == typeof name ? "undefined" : (0, 
                            _typeof3["default"])(name))) {
                                _context3.next = 5;
                                break;
                            }
                            return _context3.next = 3, _promise2["default"].all((0, _keys2["default"])(name).map(function(key) {
                                return _this3.set(key, name[key]);
                            }));

                          case 3:
                            _context3.next = 14;
                            break;

                          case 5:
                            return _context3.prev = 5, value = void 0 === value ? "undefined" : (0, _stringify2["default"])(value), 
                            _context3.next = 9, this._api.set(name, value);

                          case 9:
                            _context3.next = 14;
                            break;

                          case 11:
                            _context3.prev = 11, _context3.t0 = _context3["catch"](5), console.warn("prefs set error", _context3.t0);

                          case 14:
                          case "end":
                            return _context3.stop();
                        }
                    }, _callee3, this, [ [ 5, 11 ] ]);
                }));
            }, this.all = function() {
                return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee4() {
                    var prefs, key, v;
                    return _regenerator2["default"].wrap(function(_context4) {
                        for (;;) switch (_context4.prev = _context4.next) {
                          case 0:
                            return _context4.next = 2, this._api.getAll();

                          case 2:
                            prefs = _context4.sent;
                            for (key in prefs) if ("undefined" === prefs[key]) prefs[key] = void 0; else try {
                                v = prefs[key], prefs[key] = v && JSON.parse(v);
                            } catch (e) {}
                            return _context4.abrupt("return", prefs);

                          case 5:
                          case "end":
                            return _context4.stop();
                        }
                    }, _callee4, this);
                }));
            }, this.remove = function(key) {
                try {
                    return _this._api.remove(key);
                } catch (e) {
                    return console.warn("prefs remove error", e), _promise2["default"].resolve();
                }
            }, this.clearAll = function() {
                try {
                    return _this._api.removeAll()["catch"](function(e) {
                        return console.warn("prefs clearAll error", e);
                    });
                } catch (e) {
                    return console.warn("prefs clearAll error", e), _promise2["default"].resolve();
                }
            };
        };
        exports.PrefsImpl = PrefsImpl;
    }, {
        "babel-runtime/core-js/json/stringify": 18,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/defineProperty": 31,
        "babel-runtime/helpers/typeof": 36,
        "babel-runtime/regenerator": 37
    } ],
    215: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var emitter = require("emitter"), util_1 = require("lib/util"), lodash_1 = require("lodash"), FakeCapi = function FakeCapi() {
            var _this = this;
            (0, _classCallCheck3["default"])(this, FakeCapi), this._fakeWebsocketData = [], 
            this._isAutorun = !1, this._latestRevision = 0, this.isOn = function() {
                return _this._fakeWebsocketData && _this._fakeWebsocketData.length > 0;
            }, this.getSocket = function() {
                return _this._socket;
            }, this.run = function() {
                if (_this._fakeWebsocketData.length > 0) {
                    var obj = _this._fakeWebsocketData.shift();
                    obj.rev = _this._latestRevision, "synonyms" === obj.action ? _this._socket.emit("message", obj) : _this._socket.emit(obj.event, obj), 
                    setTimeout(_this.run, 0);
                } else _this._latestRevision = 0, _this._isAutorun = !1;
            }, this.setData = function(data) {
                _this._fakeWebsocketData = data.value, _this._isAutorun = data.autorun, _this._debouncedRunFakeCapi.cancel();
            }, this._fakeWebsocket = function() {
                var ws = (0, _assign2["default"])({}, emitter({}), {
                    send: function(message) {
                        "start" === message.action && ws.emit("start", {
                            event: "message",
                            action: "start"
                        }), "submit_ot" === message.action && (_this._latestRevision = message.rev, _this._isAutorun && _this._debouncedRunFakeCapi());
                    },
                    close: util_1._f,
                    connect: function() {
                        ws.emit("connect", {
                            event: "connect"
                        });
                    },
                    reconnect: function() {
                        return ws.connect();
                    },
                    isConnected: util_1._F,
                    release: util_1._f,
                    toString: function() {
                        return "Fake socket";
                    },
                    wsPlay: util_1._f,
                    wsPause: util_1._f
                });
                return ws;
            }, this._socket = this._fakeWebsocket(), this._debouncedRunFakeCapi = lodash_1.debounce(this.run, 3e3);
        };
        exports.FakeCapi = FakeCapi;
    }, {
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/helpers/classCallCheck": 29,
        emitter: "emitter",
        "lib/util": 207,
        lodash: "lodash"
    } ],
    216: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var stdlib_1 = require("stdlib"), websocket = require("@grammarly-npm/websocket"), util_1 = require("lib/util"), config_1 = require("lib/config"), socket_1 = require("universal/shared/socket"), fake_1 = require("./fake");
        exports.FakeCapi = fake_1.FakeCapi;
        var socket_2 = require("./socket"), BackgroundSocketManager = function BackgroundSocketManager(_logger, _getConnectionState, _updateConnectionState, _refreshUser, _getTokenCookie, _message, _fakeCapi) {
            var _this = this;
            (0, _classCallCheck3["default"])(this, BackgroundSocketManager), this._logger = _logger, 
            this._getConnectionState = _getConnectionState, this._updateConnectionState = _updateConnectionState, 
            this._refreshUser = _refreshUser, this._getTokenCookie = _getTokenCookie, this._message = _message, 
            this._fakeCapi = _fakeCapi, this._sockets = {}, this._releaseTimeout = 5e3, this._maxReconnectTime = 12e4, 
            this._log = [], this.reconnectAll = function(dialect) {
                _this._dialect = dialect, (0, _keys2["default"])(_this._sockets).forEach(function(id) {
                    return _this._sockets[id].reconnect();
                });
            }, this.getLog = function() {
                var result = _this._log.slice(0);
                return _this._log = [], result;
            }, this._setMessageType = function(_ref) {
                var id = _ref.id, iframeMode = _ref.iframeMode;
                console.log("IFRAME MODE", id, _this._sockets);
                var socket = _this._sockets[id];
                socket && socket.setMessageType(iframeMode ? socket_1.MessageTypes.serverIframe : socket_1.MessageTypes.server);
            }, this._onBackgroundSocketEmit = function(message, messageType, sender) {
                var event = message.event, socketId = message.socketId, msg = message.msg;
                if (console.log("from ws", event, socketId, msg, messageType), msg && msg.error && "not_authorized" === msg.error) return _this._tryToFixSession();
                var releaseTimer = setTimeout(function() {
                    var socket = _this._sockets[socketId];
                    socket && (socket.release(), socket.overrideEmitToNoOp(), delete _this._sockets[socketId]);
                }, _this._releaseTimeout);
                _this._message.emitTo(sender, messageType, (0, _assign2["default"])({}, message, {
                    id: util_1.guid()
                }), function(msg) {
                    return msg && clearTimeout(releaseTimer);
                });
            }, this._onContentScriptSocketMessage = function(data, _, sender) {
                if (data && !_this._getConnectionState().authToCapiDegradation) {
                    var socketId = data.socketId, method = data.method, isClose = "close" === method, socket = _this._sockets[socketId];
                    if (socket || !isClose) {
                        socket || (socket = new socket_2.BackgroundSocket(data, sender, _this._onBackgroundSocketEmit, _this._fakeCapi), 
                        _this._sockets[socketId] = socket);
                        var isStart = data.arg && "start" === data.arg.action;
                        switch (isStart && _this._dialect && (data.arg.dialect = _this._dialect), method) {
                          case "connect":
                            _this._refreshUser(!0, "onSessionStart").then(function() {
                                return socket.connect(data.arg);
                            });
                            break;

                          case "send":
                            socket.send(data.arg);
                            break;

                          case "reconnect":
                            socket.reconnect();
                            break;

                          case "release":
                            socket.release();
                            break;

                          case "close":
                            socket.close();
                            break;

                          case "wsPlay":
                            socket.wsPlay();
                            break;

                          case "wsPause":
                            socket.wsPause();
                            break;

                          default:
                            console.error("Unknown method", method);
                        }
                        isClose && (socket.close(), socket.overrideEmitToNoOp(), delete _this._sockets[socketId]);
                    }
                }
            }, this._tryToFixSession = function() {
                var _getConnectionState2 = _this._getConnectionState(), authToCapiDegradation = _getConnectionState2.authToCapiDegradation, authDegradation = _getConnectionState2.authDegradation, cookiesDisabled = _getConnectionState2.cookiesDisabled;
                return authToCapiDegradation ? (_this._logger.capiNotAuthorizedLoop(!!authDegradation, !!cookiesDisabled), 
                void console.error("User not authorized... Recovery fail =(")) : (cookiesDisabled && (_this._logger.socketDisabledCookie(), 
                console.error("User disabled cookies... =(")), console.warn("User not authorized... Try to recover"), 
                _this._updateConnectionState({
                    authToCapiDegradation: !0
                }), void _this._connectionFixer());
            }, this._connectionFixer = function() {
                return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                    var count, _this2 = this;
                    return _regenerator2["default"].wrap(function(_context) {
                        for (;;) switch (_context.prev = _context.next) {
                          case 0:
                            return (0, _keys2["default"])(this._sockets).forEach(function(id) {
                                return _this2._sockets[id].release();
                            }), _context.next = 3, new _promise2["default"](function(resolve) {
                                return _this2._tryToConnect(resolve);
                            });

                          case 3:
                            count = _context.sent, this._updateConnectionState({
                                authToCapiDegradation: !1
                            }), (0, _keys2["default"])(this._sockets).forEach(function(id) {
                                return _this2._sockets[id].reconnect();
                            }), this._logger.socketBgRestored(count);

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                    }, _callee, this);
                }));
            }, this._tryToConnect = function(resolve) {
                var timeToReconnect = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e4, count = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee2() {
                    var ws, browser, clientName, start, close, _this3 = this;
                    return _regenerator2["default"].wrap(function(_context2) {
                        for (;;) switch (_context2.prev = _context2.next) {
                          case 0:
                            return console.warn("Fixer inited, will try to connect in ", timeToReconnect / 1e3, "s., count:", count), 
                            _context2.next = 3, util_1.delay(timeToReconnect);

                          case 3:
                            return _context2.next = 5, this._refreshUser(!1, "recover_after_capi_error");

                          case 5:
                            ws = websocket({
                                url: config_1.URLS.capi
                            }), browser = util_1.getBrowser(), clientName = "chrome" === browser ? "extension_chrome" : "firefox" === browser ? "extension_firefox" : "safari" === browser ? "extension_safari" : "edge" === browser ? "extension_edge" : stdlib_1.try_(function() {
                                return stdlib_1.assertNever(browser);
                            }, function(_) {
                                return "extension";
                            }), start = {
                                docid: util_1.guid(),
                                client: clientName,
                                protocolVersion: "1.0",
                                action: "start",
                                id: 0
                            }, close = function() {
                                ws && (ws.close(), ws.release(), ws.emit = util_1._f), ws = null;
                            }, ws && (ws.emit = function(event) {
                                var msg = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                return "connect" === event ? ws && ws.send(start) : msg.action && "start" === msg.action ? (close(), 
                                console.warn("yay, we fixed capi connection!"), resolve(count)) : void ((msg.error || "error" === event) && (close(), 
                                count % 10 === 0 && _this3._logFailedReconnect({
                                    count: count,
                                    error: msg.error
                                }), console.warn("still on error(", event, msg), _this3._tryToConnect(resolve, Math.min(_this3._maxReconnectTime, 2 * timeToReconnect), count + 1)));
                            }), ws && ws.connect();

                          case 12:
                          case "end":
                            return _context2.stop();
                        }
                    }, _callee2, this);
                }));
            }, this._logFailedReconnect = function(_ref2) {
                var count = _ref2.count, error = _ref2.error;
                return __awaiter(_this, void 0, void 0, _regenerator2["default"].mark(function _callee3() {
                    var token;
                    return _regenerator2["default"].wrap(function(_context3) {
                        for (;;) switch (_context3.prev = _context3.next) {
                          case 0:
                            return token = "exception", _context3.prev = 1, _context3.next = 4, this._getTokenCookie();

                          case 4:
                            token = _context3.sent, _context3.next = 9;
                            break;

                          case 7:
                            _context3.prev = 7, _context3.t0 = _context3["catch"](1);

                          case 9:
                            console.warn("log failed reconnect", count, error), this._logger.socketBgReconnectFail(token || "", count);

                          case 11:
                          case "end":
                            return _context3.stop();
                        }
                    }, _callee3, this, [ [ 1, 7 ] ]);
                }));
            }, _message.on(socket_1.MessageTypes.iframeMode, this._setMessageType), _message.on(socket_1.MessageTypes.client, this._onContentScriptSocketMessage);
        };
        exports.BackgroundSocketManager = BackgroundSocketManager;
    }, {
        "./fake": 215,
        "./socket": 217,
        "@grammarly-npm/websocket": 14,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/regenerator": 37,
        "lib/config": 179,
        "lib/util": 207,
        stdlib: 210,
        "universal/shared/socket": 240
    } ],
    217: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var websocket = require("@grammarly-npm/websocket"), BackgroundSocket = function BackgroundSocket(config, _sender, _onInternalSocketEmit, _fakeCapi) {
            var _this = this;
            (0, _classCallCheck3["default"])(this, BackgroundSocket), this._sender = _sender, 
            this._onInternalSocketEmit = _onInternalSocketEmit, this._fakeCapi = _fakeCapi, 
            this._messageType = "socket-server", this._closedByMe = !1, this.connect = function(force) {
                return _this._internalSocket.connect(force);
            }, this.send = function(data) {
                return _this._internalSocket.send(data);
            }, this.close = function() {
                return _this._internalSocket.close();
            }, this.wsPlay = function() {
                return _this._internalSocket.wsPlay();
            }, this.wsPause = function() {
                return _this._internalSocket.wsPause();
            }, this.reconnect = function() {
                _this._reconnectInProgress || (_this._reconnectInProgress = !0, _this._reconnectFn().then(function() {
                    return _this._reconnectInProgress = !1;
                }));
            }, this.release = function() {
                console.log("CLOSE SOCKET"), _this._internalSocket.close(), _this._internalSocket.release();
            }, this.overrideEmitToNoOp = function() {
                return _this._internalSocket.emit = function() {};
            }, this.setMessageType = function(type) {
                console.log("USE EXT SOCKET", type), _this._messageType = type;
            }, this._getEnhancedSocket = function(config) {
                var socket = _this._fakeCapi.isOn() ? _this._fakeCapi.getSocket() : websocket(config), originalEmit = socket.emit;
                return (0, _assign2["default"])(socket, {
                    emit: function(event, msg) {
                        originalEmit(event, msg), _this._emit(event, msg);
                    },
                    reconnect: _this.reconnect,
                    toString: function() {
                        return "[object BackgroundSocket]";
                    }
                });
            }, this._emit = function(event, msg) {
                return "disconnect" === event && _this._closedByMe ? void (_this._closedByMe = !1) : void _this._onInternalSocketEmit({
                    event: event,
                    socketId: _this._socketId,
                    msg: msg
                }, _this._messageType, _this._sender);
            }, this._reconnectFn = function() {
                var finish = function() {}, promise = new _promise2["default"](function(resolve) {
                    return finish = resolve;
                });
                return _this._internalSocket.one("connect", finish), _this._internalSocket.isConnected() ? (_this._internalSocket.one("disconnect", function() {
                    return setTimeout(function() {
                        return _this._internalSocket.connect(!0);
                    }, 0);
                }), _this._closedByMe = !0, _this._internalSocket.close()) : _this._internalSocket.connect(!0), 
                promise;
            }, this._internalSocket = this._getEnhancedSocket(config), this._socketId = config.socketId;
        };
        exports.BackgroundSocket = BackgroundSocket;
    }, {
        "@grammarly-npm/websocket": 14,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/helpers/classCallCheck": 29
    } ],
    218: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var userActions = require("./user/actions"), settingsActions = require("./settings/actions"), connectionActions = require("./connection/actions");
        exports.pureActions = (0, _assign2["default"])({}, userActions, connectionActions, settingsActions);
    }, {
        "./connection/actions": 219,
        "./settings/actions": 223,
        "./user/actions": 233,
        "babel-runtime/core-js/object/assign": 19
    } ],
    219: [ function(require, module, exports) {
        "use strict";
        function updateConnection(data) {
            return {
                type: exports.t.UPDATE_CONNECTION,
                data: data
            };
        }
        function onlineConnection(online) {
            return {
                type: exports.t.ONLINE_STATE,
                online: online
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.t = {
            UPDATE_CONNECTION: "connection/UPDATE_CONNECTION",
            ONLINE_STATE: "connection/ONLINE_STATE"
        }, exports.updateConnection = updateConnection, exports.onlineConnection = onlineConnection;
    }, {} ],
    220: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function connectionReducer() {
            var state = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : exports.defaultConnection, _ref = arguments[1], type = _ref.type, data = _ref.data, online = _ref.online;
            switch (type) {
              case actions_1.t.ONLINE_STATE:
                return (0, _assign2["default"])({}, state, {
                    online: online
                });

              case actions_1.t.UPDATE_CONNECTION:
                return (0, _assign2["default"])({}, state, data);

              default:
                return state;
            }
        }
        var _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var actions_1 = require("./actions");
        exports.defaultConnection = {
            networkOffline: !window.navigator.onLine,
            cookiesDisabled: navigator.cookieEnabled === !1,
            online: !0
        }, exports.connectionReducer = connectionReducer;
    }, {
        "./actions": 219,
        "babel-runtime/core-js/object/assign": 19
    } ],
    221: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys), _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var redux_saga_1 = require("redux-saga"), lodash_1 = require("lodash"), effects_1 = require("redux-saga/effects"), actions_1 = require("./actions"), selectors = require("./selectors"), ConnectionSagas = function() {
            function ConnectionSagas(_prefs, _emitTabs, _logger, _isIncognito, _getNextPingDate) {
                (0, _classCallCheck3["default"])(this, ConnectionSagas), this._prefs = _prefs, this._emitTabs = _emitTabs, 
                this._logger = _logger, this._isIncognito = _isIncognito, this._getNextPingDate = _getNextPingDate;
            }
            return (0, _createClass3["default"])(ConnectionSagas, [ {
                key: "start",
                value: _regenerator2["default"].mark(function start() {
                    return _regenerator2["default"].wrap(function(_context) {
                        for (;;) switch (_context.prev = _context.next) {
                          case 0:
                            return _context.delegateYield(redux_saga_1.takeLatest(actions_1.t.UPDATE_CONNECTION, this.checkOnline.bind(this)), "t0", 1);

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                    }, start, this);
                })
            }, {
                key: "checkOnline",
                value: _regenerator2["default"].mark(function checkOnline() {
                    var currentConnection, currentOnline, connectionErrors, newOnline;
                    return _regenerator2["default"].wrap(function(_context2) {
                        for (;;) switch (_context2.prev = _context2.next) {
                          case 0:
                            return _context2.prev = 0, _context2.next = 3, effects_1.select(selectors.current);

                          case 3:
                            if (currentConnection = _context2.sent, currentOnline = currentConnection.online, 
                            connectionErrors = lodash_1.omit(currentConnection, "online", "authDegradation", "cookiesDisabled"), 
                            !currentConnection.cookiesDisabled) {
                                _context2.next = 9;
                                break;
                            }
                            return _context2.next = 9, effects_1.fork([ this, this.monitorCookiesDisable ]);

                          case 9:
                            if (newOnline = (0, _keys2["default"])(connectionErrors).map(function(key) {
                                return connectionErrors[key];
                            }).every(function(on) {
                                return !on;
                            }), currentOnline !== newOnline) {
                                _context2.next = 12;
                                break;
                            }
                            return _context2.abrupt("return");

                          case 12:
                            return _context2.next = 14, effects_1.put(actions_1.onlineConnection(newOnline));

                          case 14:
                            if (!newOnline) {
                                _context2.next = 18;
                                break;
                            }
                            return console.log("ONLINE SERVICE| reseting capi connections after offline"), _context2.next = 18, 
                            effects_1.call(this._emitTabs, "reset");

                          case 18:
                            _context2.next = 24;
                            break;

                          case 20:
                            if (_context2.prev = 20, _context2.t0 = _context2["catch"](0), !redux_saga_1.isCancelError(_context2.t0)) {
                                _context2.next = 24;
                                break;
                            }
                            return _context2.abrupt("return");

                          case 24:
                          case "end":
                            return _context2.stop();
                        }
                    }, checkOnline, this, [ [ 0, 20 ] ]);
                })
            }, {
                key: "monitorIsIncognito",
                value: _regenerator2["default"].mark(function monitorIsIncognito() {
                    var incognitoAllowed;
                    return _regenerator2["default"].wrap(function(_context3) {
                        for (;;) switch (_context3.prev = _context3.next) {
                          case 0:
                            return _context3.next = 2, effects_1.call(this._isIncognito);

                          case 2:
                            if (incognitoAllowed = _context3.sent, !incognitoAllowed) {
                                _context3.next = 6;
                                break;
                            }
                            return _context3.next = 6, effects_1.call([ this, this.callDaily ], this._logger.incognitoInit);

                          case 6:
                          case "end":
                            return _context3.stop();
                        }
                    }, monitorIsIncognito, this);
                })
            }, {
                key: "monitorCookiesDisable",
                value: _regenerator2["default"].mark(function monitorCookiesDisable() {
                    return _regenerator2["default"].wrap(function(_context4) {
                        for (;;) switch (_context4.prev = _context4.next) {
                          case 0:
                            return _context4.next = 2, effects_1.call([ this, this.callDaily ], this._logger.disabledCookiesInit);

                          case 2:
                          case "end":
                            return _context4.stop();
                        }
                    }, monitorCookiesDisable, this);
                })
            }, {
                key: "callDaily",
                value: _regenerator2["default"].mark(function callDaily(fn, type, name) {
                    var pingDate, nextDate;
                    return _regenerator2["default"].wrap(function(_context5) {
                        for (;;) switch (_context5.prev = _context5.next) {
                          case 0:
                            return _context5.next = 2, effects_1.call(this._prefs.get, name);

                          case 2:
                            if (pingDate = _context5.sent, pingDate && !(pingDate < Date.now())) {
                                _context5.next = 11;
                                break;
                            }
                            return _context5.next = 6, effects_1.call(fn, type, name);

                          case 6:
                            return _context5.next = 8, effects_1.call(this._getNextPingDate);

                          case 8:
                            return nextDate = _context5.sent, _context5.next = 11, effects_1.call(this._prefs.set, name, nextDate);

                          case 11:
                          case "end":
                            return _context5.stop();
                        }
                    }, callDaily, this);
                })
            } ]), ConnectionSagas;
        }();
        exports.ConnectionSagas = ConnectionSagas;
    }, {
        "./actions": 219,
        "./selectors": 222,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/regenerator": 37,
        lodash: "lodash",
        "redux-saga": "redux-saga",
        "redux-saga/effects": 143
    } ],
    222: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.current = function(state) {
            return state.connection;
        };
    }, {} ],
    223: [ function(require, module, exports) {
        "use strict";
        function setDapiProp(propKey, data) {
            return {
                type: exports.t.SET_DAPI_PROP,
                propKey: propKey,
                data: data
            };
        }
        function changeWeakDialect(data) {
            return {
                type: exports.t.CHANGE_WEAK_DIALECT,
                data: data
            };
        }
        function changeStrongDialect(data) {
            return {
                type: exports.t.CHANGE_STRONG_DIALECT,
                data: data
            };
        }
        function initialSettings(data) {
            return {
                type: exports.t.SETTINGS_INITIAL,
                data: data
            };
        }
        function toggleDefs(enabledDefs) {
            return {
                type: exports.t.TOGGLE_DEFS,
                enabledDefs: enabledDefs
            };
        }
        function toggleSite(enabled, domain) {
            return {
                type: exports.t.TOGGLE_SITE,
                domain: domain,
                enabled: enabled
            };
        }
        function toggleField(data, domain) {
            return {
                type: exports.t.TOGGLE_FIELD,
                domain: domain,
                data: data
            };
        }
        function seenNews() {
            return {
                type: exports.t.SEEN_NEWS
            };
        }
        function showOnboarding() {
            return {
                type: exports.t.SHOW_ONBOARDING
            };
        }
        function seenOnboarding() {
            return {
                type: exports.t.SEEN_ONBOARDING
            };
        }
        function showNews(showNews) {
            return {
                type: exports.t.SHOW_NEWS,
                showNews: showNews
            };
        }
        function seenReferrals() {
            return {
                type: exports.t.SEEN_REFERRALS
            };
        }
        function clickReferrals() {
            return {
                type: exports.t.CLICK_REFERRALS
            };
        }
        function togglePopup(isPopupDisabled) {
            return {
                type: exports.t.TOGGLE_POPUP,
                isPopupDisabled: isPopupDisabled
            };
        }
        function enableEmailFeedback(domain) {
            return {
                type: exports.t.ENABLE_EMAIL_FEEDBACK,
                domain: domain
            };
        }
        function saveAnonymousProps(props) {
            return {
                type: exports.t.SAVE_ANONYMOUS_PROPERTIES,
                props: props
            };
        }
        function seenEmailPerceptionPopup(seenEmailPerceptionPopupDate) {
            return {
                type: exports.t.SEEN_EMAIL_PERCEPTION_POPUP,
                seenEmailPerceptionPopupDate: seenEmailPerceptionPopupDate
            };
        }
        function disableEmailPerceptionPopup() {
            return {
                type: exports.t.SET_EMAIL_PERCEPTION_POPUP_STATE,
                emailPerceptionPopupEnabled: !1
            };
        }
        function enableEmailPerceptionPopup() {
            return {
                type: exports.t.SET_EMAIL_PERCEPTION_POPUP_STATE,
                emailPerceptionPopupEnabled: !0
            };
        }
        function saveFeedbackData(subject, docId) {
            return {
                type: exports.t.SAVE_FEEDBACK_DATA,
                subject: subject,
                docId: docId
            };
        }
        function disableOnTab() {
            return {
                type: exports.t.DISABLE_ON_TAB
            };
        }
        function showDisableReminder(domain) {
            return {
                type: exports.t.SHOW_DISABLE_REMINDER,
                domain: domain
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.t = {
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
        }, exports.DAPI_ACTIONS = [ exports.t.CHANGE_WEAK_DIALECT, exports.t.CHANGE_STRONG_DIALECT ], 
        exports.CACHED_ACTIONS = [ exports.t.TOGGLE_DEFS, exports.t.TOGGLE_SITE, exports.t.TOGGLE_FIELD, exports.t.SEEN_NEWS, exports.t.SEEN_REFERRALS, exports.t.CLICK_REFERRALS, exports.t.SHOW_ONBOARDING, exports.t.SEEN_ONBOARDING, exports.t.SEEN_EMAIL_PERCEPTION_POPUP, exports.t.SET_EMAIL_PERCEPTION_POPUP_STATE, exports.t.SHOW_DISABLE_REMINDER ], 
        exports.setDapiProp = setDapiProp, exports.changeWeakDialect = changeWeakDialect, 
        exports.changeStrongDialect = changeStrongDialect, exports.initialSettings = initialSettings, 
        exports.toggleDefs = toggleDefs, exports.toggleSite = toggleSite, exports.toggleField = toggleField, 
        exports.seenNews = seenNews, exports.showOnboarding = showOnboarding, exports.seenOnboarding = seenOnboarding, 
        exports.showNews = showNews, exports.seenReferrals = seenReferrals, exports.clickReferrals = clickReferrals, 
        exports.togglePopup = togglePopup, exports.enableEmailFeedback = enableEmailFeedback, 
        exports.saveAnonymousProps = saveAnonymousProps, exports.seenEmailPerceptionPopup = seenEmailPerceptionPopup, 
        exports.disableEmailPerceptionPopup = disableEmailPerceptionPopup, exports.enableEmailPerceptionPopup = enableEmailPerceptionPopup, 
        exports.saveFeedbackData = saveFeedbackData, exports.disableOnTab = disableOnTab, 
        exports.showDisableReminder = showDisableReminder;
    }, {} ],
    224: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function saveEmailFeedbackFetch(data) {
            var options = {
                method: "post",
                data: data
            };
            return request_1.fetch(config_1.URLS.saveEmailFeedback, options)["catch"](function(e) {
                tracking_1.logger.saveEmailFeedbackError(e && e.body);
            });
        }
        function migrateSettings(_ref) {
            var enabled_db = _ref.enabled_db, enabledDefs = _ref.enabledDefs, disabledFields = _ref.disabledFields, seenNewsVersion = _ref.seenNewsVersion, referralNewsBadge = _ref.referralNewsBadge, previousSettings = {};
            try {
                var parsedPrevSettings = JSON.parse(enabled_db);
                parsedPrevSettings && (delete parsedPrevSettings.lastChange, previousSettings = parsedPrevSettings);
            } catch (e) {
                console.error("error in parse enabled_db", e);
            }
            if (previousSettings.common = {
                enabledDefs: Boolean(enabledDefs),
                referralNewsBadge: Boolean(referralNewsBadge),
                seenNewsVersion: seenNewsVersion || config_1.newsId
            }, !disabledFields) return previousSettings;
            var fields = (0, _keys2["default"])(disabledFields);
            return fields.length ? fields.filter(function(parts) {
                return disabledFields[parts];
            }).reduce(function(result, parts) {
                var sepPos = parts.indexOf(":"), domain = parts.substr(0, sepPos), field = parts.substr(sepPos + 1), domainData = result[domain] || {
                    enabled: !0
                };
                return domainData.disabledFields = (0, _assign2["default"])({}, domainData.disabledFields || {}, (0, 
                _defineProperty3["default"])({}, field, !0)), result[domain] = domainData, result;
            }, previousSettings) : previousSettings;
        }
        var _exports$dapiPropsMap, _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _keys = require("babel-runtime/core-js/object/keys"), _keys2 = _interopRequireDefault(_keys), _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var config_1 = require("lib/config"), request_1 = require("lib/request"), actions_1 = require("./actions"), tracking_1 = require("lib/tracking");
        exports.anonymousDapiPropsKey = "anonymousDapiProps", exports.oldSettingsFields = [ "enabled_db", "enabledDefs", "disabledFields", "seenNewsVersion", "referralNewsBadge" ], 
        exports.dapiPropsMap = (_exports$dapiPropsMap = {}, (0, _defineProperty3["default"])(_exports$dapiPropsMap, actions_1.t.CHANGE_WEAK_DIALECT, "dialectWeak"), 
        (0, _defineProperty3["default"])(_exports$dapiPropsMap, actions_1.t.CHANGE_STRONG_DIALECT, "dialectStrong"), 
        _exports$dapiPropsMap), exports.dapiPropsSetter = {
            dialectWeak: function(dapi, dialect) {
                return dapi.common.setDialectWeak.call(dapi, dialect);
            },
            dialectStrong: function(dapi, dialect) {
                return dapi.common.setDialectStrong.call(dapi, dialect);
            },
            writingType: function(dapi, _writingType) {
                return dapi.common.setWrittingType.call(dapi, _writingType);
            },
            primaryLanguage: function(dapi, _primaryLanguage) {
                return dapi.common.setPrimaryLanguage.call(dapi, _primaryLanguage);
            },
            grammarSkills: function(dapi, _grammarSkills) {
                return dapi.common.setGrammarSkills.call(dapi, _grammarSkills);
            }
        }, exports.saveEmailFeedbackFetch = saveEmailFeedbackFetch, exports.migrateSettings = migrateSettings;
    }, {
        "./actions": 223,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/core-js/object/keys": 24,
        "babel-runtime/helpers/defineProperty": 31,
        "lib/config": 179,
        "lib/request": 194,
        "lib/tracking": 201
    } ],
    225: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function settingsReducer() {
            var settings = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref = arguments[1], type = _ref.type, _ref$data = _ref.data, data = void 0 === _ref$data ? {} : _ref$data, domain = _ref.domain, enabledDefs = _ref.enabledDefs, enabled = _ref.enabled, showNews = _ref.showNews, isPopupDisabled = _ref.isPopupDisabled, seenEmailPerceptionPopupDate = _ref.seenEmailPerceptionPopupDate, emailPerceptionPopupEnabled = _ref.emailPerceptionPopupEnabled, propKey = _ref.propKey, domainSetting = settings[domain] || {};
            switch (type) {
              case actions_1.t.SETTINGS_INITIAL:
                return (0, _assign2["default"])({}, settings, data);

              case actions_1.t.TOGGLE_DEFS:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, {
                        enabledDefs: enabledDefs
                    })
                });

              case actions_1.t.TOGGLE_SITE:
                return (0, _assign2["default"])({}, settings, (0, _defineProperty3["default"])({}, domain, (0, 
                _assign2["default"])({}, domainSetting, {
                    enabled: enabled,
                    disabledDate: enabled === !0 ? null : Date.now()
                })));

              case actions_1.t.TOGGLE_FIELD:
                return (0, _assign2["default"])({}, settings, (0, _defineProperty3["default"])({}, domain, (0, 
                _assign2["default"])({}, settings[domain], {
                    disabledFields: (0, _assign2["default"])({}, domainSetting.disabledFields, data)
                })));

              case actions_1.t.ENABLE_EMAIL_FEEDBACK:
                return (0, _assign2["default"])({}, settings, (0, _defineProperty3["default"])({}, domain, (0, 
                _assign2["default"])({}, settings[domain], {
                    emailFeedbackEnabled: !0
                })));

              case actions_1.t.SHOW_NEWS:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, {
                        showNews: showNews
                    })
                });

              case actions_1.t.SHOW_ONBOARDING:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, {
                        showOnboarding: !0
                    })
                });

              case actions_1.t.SEEN_ONBOARDING:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, {
                        showOnboarding: !1
                    })
                });

              case actions_1.t.SEEN_EMAIL_PERCEPTION_POPUP:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, {
                        seenEmailPerceptionPopupDate: seenEmailPerceptionPopupDate
                    })
                });

              case actions_1.t.SET_EMAIL_PERCEPTION_POPUP_STATE:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, {
                        emailPerceptionPopupEnabled: emailPerceptionPopupEnabled
                    })
                });

              case actions_1.t.SEEN_NEWS:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, {
                        seenNewsVersion: config_1.newsId
                    })
                });

              case actions_1.t.TOGGLE_POPUP:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, {
                        isPopupDisabled: isPopupDisabled
                    })
                });

              case actions_1.t.SEEN_REFERRALS:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, {
                        referralNewsBadge: !0
                    })
                });

              case actions_1.t.CLICK_REFERRALS:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, {
                        referralWasClicked: !0
                    })
                });

              case actions_1.t.SET_DAPI_PROP:
                return (0, _assign2["default"])({}, settings, {
                    common: (0, _assign2["default"])({}, settings.common, (0, _defineProperty3["default"])({}, propKey, data))
                });

              case actions_1.t.SHOW_DISABLE_REMINDER:
                return (0, _assign2["default"])({}, settings, (0, _defineProperty3["default"])({}, domain, (0, 
                _assign2["default"])({}, domainSetting, {
                    disabledDate: Date.now()
                })));

              default:
                return settings;
            }
        }
        var _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var config_1 = require("lib/config"), actions_1 = require("./actions");
        exports.settingsReducer = settingsReducer;
    }, {
        "./actions": 223,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/helpers/defineProperty": 31,
        "lib/config": 179
    } ],
    226: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign), _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var redux_saga_1 = require("redux-saga"), effects_1 = require("redux-saga/effects"), tracking = require("lib/tracking"), config_1 = require("lib/config"), helpers_1 = require("./helpers"), actions = require("./actions"), selectors = require("./selectors"), SettingsSagas = function() {
            function SettingsSagas(_prefs, _dapi, _reconnectAllSockets, _emitFocusedTab) {
                (0, _classCallCheck3["default"])(this, SettingsSagas), this._prefs = _prefs, this._dapi = _dapi, 
                this._reconnectAllSockets = _reconnectAllSockets, this._emitFocusedTab = _emitFocusedTab;
            }
            return (0, _createClass3["default"])(SettingsSagas, [ {
                key: "start",
                value: _regenerator2["default"].mark(function start() {
                    return _regenerator2["default"].wrap(function(_context) {
                        for (;;) switch (_context.prev = _context.next) {
                          case 0:
                            return _context.next = 2, [ redux_saga_1.takeEvery(actions.DAPI_ACTIONS, this.saveToDapi.bind(this)), redux_saga_1.takeEvery(actions.CACHED_ACTIONS, this.cacheSettings.bind(this)), redux_saga_1.takeLatest(actions.t.TOGGLE_POPUP, this.togglePopup.bind(this)), redux_saga_1.takeLatest(actions.t.SAVE_FEEDBACK_DATA, this.saveFeedbackData.bind(this)), redux_saga_1.takeLatest(actions.t.SAVE_ANONYMOUS_PROPERTIES, this.saveAnonymousDapiProps.bind(this)), redux_saga_1.takeLatest(actions.t.DISABLE_ON_TAB, this.disableOnTab.bind(this)), redux_saga_1.takeLatest(actions.t.SAVE_ANONYMOUS_PROPERTIES, this.saveAnonymousDapiProps.bind(this)) ];

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                    }, start, this);
                })
            }, {
                key: "initializeDapiProps",
                value: _regenerator2["default"].mark(function initializeDapiProps() {
                    var prop;
                    return _regenerator2["default"].wrap(function(_context2) {
                        for (;;) switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.t0 = _regenerator2["default"].keys(helpers_1.dapiPropsMap);

                          case 1:
                            if ((_context2.t1 = _context2.t0()).done) {
                                _context2.next = 7;
                                break;
                            }
                            return prop = _context2.t1.value, _context2.next = 5, effects_1.call([ this, this.initializeDapiProp ], helpers_1.dapiPropsMap[prop]);

                          case 5:
                            _context2.next = 1;
                            break;

                          case 7:
                          case "end":
                            return _context2.stop();
                        }
                    }, initializeDapiProps, this);
                })
            }, {
                key: "initializeDapiProp",
                value: _regenerator2["default"].mark(function initializeDapiProp(prop) {
                    var key, cache, value, newCache, cacheReset = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    return _regenerator2["default"].wrap(function(_context3) {
                        for (;;) switch (_context3.prev = _context3.next) {
                          case 0:
                            if (void 0 !== prop) {
                                _context3.next = 2;
                                break;
                            }
                            throw new Error("Incorrect DAPI property name");

                          case 2:
                            return _context3.next = 4, effects_1.call([ this, this.getDapiPropsPrefsKey ]);

                          case 4:
                            return key = _context3.sent, _context3.next = 7, effects_1.call(this._prefs.get, key);

                          case 7:
                            if (cache = _context3.sent, !cache || !cache[prop] || cacheReset) {
                                _context3.next = 13;
                                break;
                            }
                            return _context3.next = 11, effects_1.put(actions.setDapiProp(prop, cache[prop]));

                          case 11:
                            _context3.next = 29;
                            break;

                          case 13:
                            return _context3.prev = 13, _context3.next = 16, effects_1.call(tracking.logger.initializePropFromDapi, prop);

                          case 16:
                            return _context3.next = 18, effects_1.call(this._dapi.common[prop]);

                          case 18:
                            if (value = _context3.sent, null === value) {
                                _context3.next = 25;
                                break;
                            }
                            return _context3.next = 22, effects_1.put(actions.setDapiProp(prop, value));

                          case 22:
                            return newCache = (0, _assign2["default"])({}, cache, (0, _defineProperty3["default"])({}, prop, value)), 
                            _context3.next = 25, effects_1.call(this._prefs.set, (0, _defineProperty3["default"])({}, key, newCache));

                          case 25:
                            _context3.next = 29;
                            break;

                          case 27:
                            _context3.prev = 27, _context3.t0 = _context3["catch"](13);

                          case 29:
                          case "end":
                            return _context3.stop();
                        }
                    }, initializeDapiProp, this, [ [ 13, 27 ] ]);
                })
            }, {
                key: "resetStrongDialectFromDapi",
                value: _regenerator2["default"].mark(function resetStrongDialectFromDapi() {
                    var strongDialect;
                    return _regenerator2["default"].wrap(function(_context4) {
                        for (;;) switch (_context4.prev = _context4.next) {
                          case 0:
                            return strongDialect = helpers_1.dapiPropsMap[actions.t.CHANGE_STRONG_DIALECT], 
                            _context4.next = 3, effects_1.call([ this, this.initializeDapiProp ], strongDialect, !0);

                          case 3:
                          case "end":
                            return _context4.stop();
                        }
                    }, resetStrongDialectFromDapi, this);
                })
            }, {
                key: "saveToDapi",
                value: _regenerator2["default"].mark(function saveToDapi(_ref) {
                    var currentProp, propName, dapiPropsKey, cache, newCache, strongDialect, type = _ref.type, data = _ref.data;
                    return _regenerator2["default"].wrap(function(_context5) {
                        for (;;) switch (_context5.prev = _context5.next) {
                          case 0:
                            return _context5.next = 2, effects_1.select(selectors.getDapiProp, type);

                          case 2:
                            if (currentProp = _context5.sent, currentProp !== data) {
                                _context5.next = 5;
                                break;
                            }
                            return _context5.abrupt("return");

                          case 5:
                            return propName = helpers_1.dapiPropsMap[type], _context5.next = 8, effects_1.call([ this, this.getDapiPropsPrefsKey ]);

                          case 8:
                            return dapiPropsKey = _context5.sent, _context5.prev = 9, _context5.next = 12, effects_1.call(helpers_1.dapiPropsSetter[propName], this._dapi, data);

                          case 12:
                            _context5.next = 16;
                            break;

                          case 14:
                            _context5.prev = 14, _context5.t0 = _context5["catch"](9);

                          case 16:
                            return _context5.next = 18, effects_1.call(this._prefs.get, dapiPropsKey);

                          case 18:
                            return cache = _context5.sent, newCache = (0, _assign2["default"])({}, cache, (0, 
                            _defineProperty3["default"])({}, propName, data)), _context5.next = 22, effects_1.call(this._prefs.set, (0, 
                            _defineProperty3["default"])({}, dapiPropsKey, newCache));

                          case 22:
                            return _context5.next = 24, effects_1.put(actions.setDapiProp(propName, data));

                          case 24:
                            return _context5.next = 26, effects_1.call(tracking.fire, "set-dapi-prop", propName, data);

                          case 26:
                            if (strongDialect = helpers_1.dapiPropsMap[actions.t.CHANGE_STRONG_DIALECT], propName !== strongDialect) {
                                _context5.next = 30;
                                break;
                            }
                            return _context5.next = 30, effects_1.call(this._reconnectAllSockets, data);

                          case 30:
                          case "end":
                            return _context5.stop();
                        }
                    }, saveToDapi, this, [ [ 9, 14 ] ]);
                })
            }, {
                key: "setInitialSettings",
                value: _regenerator2["default"].mark(function setInitialSettings() {
                    var data;
                    return _regenerator2["default"].wrap(function(_context6) {
                        for (;;) switch (_context6.prev = _context6.next) {
                          case 0:
                            return _context6.next = 2, effects_1.call([ this, this.getSettings ]);

                          case 2:
                            return data = _context6.sent, _context6.next = 5, effects_1.put(actions.initialSettings(data));

                          case 5:
                            return _context6.next = 7, effects_1.call([ this, this.setShowNews ]);

                          case 7:
                          case "end":
                            return _context6.stop();
                        }
                    }, setInitialSettings, this);
                })
            }, {
                key: "cacheSettings",
                value: _regenerator2["default"].mark(function cacheSettings() {
                    var extensionSettings;
                    return _regenerator2["default"].wrap(function(_context7) {
                        for (;;) switch (_context7.prev = _context7.next) {
                          case 0:
                            return _context7.next = 2, effects_1.select(selectors.current);

                          case 2:
                            return extensionSettings = _context7.sent, _context7.next = 5, effects_1.call(this._prefs.set, {
                                extensionSettings: extensionSettings
                            });

                          case 5:
                          case "end":
                            return _context7.stop();
                        }
                    }, cacheSettings, this);
                })
            }, {
                key: "getDapiPropsPrefsKey",
                value: _regenerator2["default"].mark(function getDapiPropsPrefsKey() {
                    var userId;
                    return _regenerator2["default"].wrap(function(_context8) {
                        for (;;) switch (_context8.prev = _context8.next) {
                          case 0:
                            return _context8.next = 2, effects_1.select(selectors.getUserId);

                          case 2:
                            return userId = _context8.sent, _context8.abrupt("return", "dapiProps_" + userId);

                          case 4:
                          case "end":
                            return _context8.stop();
                        }
                    }, getDapiPropsPrefsKey, this);
                })
            }, {
                key: "setShowNews",
                value: _regenerator2["default"].mark(function setShowNews() {
                    var _ref2, common, showNews;
                    return _regenerator2["default"].wrap(function(_context9) {
                        for (;;) switch (_context9.prev = _context9.next) {
                          case 0:
                            return _context9.next = 2, effects_1.select(selectors.current);

                          case 2:
                            return _ref2 = _context9.sent, common = _ref2.common, showNews = config_1.newsId && common && config_1.newsId !== common.seenNewsVersion, 
                            _context9.next = 7, effects_1.put(actions.showNews(showNews));

                          case 7:
                          case "end":
                            return _context9.stop();
                        }
                    }, setShowNews, this);
                })
            }, {
                key: "getSettings",
                value: _regenerator2["default"].mark(function getSettings() {
                    var settings, old, extensionSettings;
                    return _regenerator2["default"].wrap(function(_context10) {
                        for (;;) switch (_context10.prev = _context10.next) {
                          case 0:
                            return _context10.next = 2, effects_1.call(this._prefs.get, "extensionSettings");

                          case 2:
                            if (settings = _context10.sent, !settings) {
                                _context10.next = 5;
                                break;
                            }
                            return _context10.abrupt("return", settings);

                          case 5:
                            return _context10.next = 7, effects_1.call(this._prefs.get, helpers_1.oldSettingsFields);

                          case 7:
                            return old = _context10.sent, _context10.next = 10, effects_1.call(helpers_1.migrateSettings, old);

                          case 10:
                            return extensionSettings = _context10.sent, _context10.next = 13, effects_1.call(this._prefs.set, {
                                extensionSettings: extensionSettings
                            });

                          case 13:
                            return _context10.abrupt("return", extensionSettings);

                          case 14:
                          case "end":
                            return _context10.stop();
                        }
                    }, getSettings, this);
                })
            }, {
                key: "togglePopup",
                value: _regenerator2["default"].mark(function togglePopup(_ref3) {
                    var popup, isPopupDisabled = _ref3.isPopupDisabled;
                    return _regenerator2["default"].wrap(function(_context11) {
                        for (;;) switch (_context11.prev = _context11.next) {
                          case 0:
                            return popup = isPopupDisabled ? "" : "src/popup.html", chrome.browserAction.setPopup({
                                popup: popup
                            }), _context11.next = 4, effects_1.call(tracking.logger.settingsPopupToggled, isPopupDisabled);

                          case 4:
                          case "end":
                            return _context11.stop();
                        }
                    }, togglePopup, this);
                })
            }, {
                key: "saveAnonymousDapiProps",
                value: _regenerator2["default"].mark(function saveAnonymousDapiProps(_ref4) {
                    var isAnonymous, props = _ref4.props;
                    return _regenerator2["default"].wrap(function(_context12) {
                        for (;;) switch (_context12.prev = _context12.next) {
                          case 0:
                            return _context12.next = 2, effects_1.call(this._prefs.set, helpers_1.anonymousDapiPropsKey, props);

                          case 2:
                            return _context12.next = 4, effects_1.select(selectors.getUserAnonymous);

                          case 4:
                            if (isAnonymous = _context12.sent, isAnonymous !== !1) {
                                _context12.next = 8;
                                break;
                            }
                            return _context12.next = 8, effects_1.call([ this, this.setAnonymousPropsToDapi ]);

                          case 8:
                          case "end":
                            return _context12.stop();
                        }
                    }, saveAnonymousDapiProps, this);
                })
            }, {
                key: "setAnonymousPropsToDapi",
                value: _regenerator2["default"].mark(function setAnonymousPropsToDapi() {
                    var props, key;
                    return _regenerator2["default"].wrap(function(_context13) {
                        for (;;) switch (_context13.prev = _context13.next) {
                          case 0:
                            return _context13.next = 2, effects_1.call(this._prefs.get, helpers_1.anonymousDapiPropsKey);

                          case 2:
                            if (props = _context13.sent, null === props || void 0 === props) {
                                _context13.next = 20;
                                break;
                            }
                            _context13.t0 = _regenerator2["default"].keys(props);

                          case 5:
                            if ((_context13.t1 = _context13.t0()).done) {
                                _context13.next = 16;
                                break;
                            }
                            return key = _context13.t1.value, _context13.prev = 7, _context13.next = 10, effects_1.call(helpers_1.dapiPropsSetter[key], this._dapi, props[key]);

                          case 10:
                            _context13.next = 14;
                            break;

                          case 12:
                            _context13.prev = 12, _context13.t2 = _context13["catch"](7);

                          case 14:
                            _context13.next = 5;
                            break;

                          case 16:
                            return _context13.next = 18, effects_1.call(this._prefs.remove, helpers_1.anonymousDapiPropsKey);

                          case 18:
                            return _context13.next = 20, effects_1.call([ this, this.resetStrongDialectFromDapi ]);

                          case 20:
                          case "end":
                            return _context13.stop();
                        }
                    }, setAnonymousPropsToDapi, this, [ [ 7, 12 ] ]);
                })
            }, {
                key: "saveFeedbackData",
                value: _regenerator2["default"].mark(function saveFeedbackData(_ref5) {
                    var userId, data, docId = _ref5.docId, subject = _ref5.subject;
                    return _regenerator2["default"].wrap(function(_context14) {
                        for (;;) switch (_context14.prev = _context14.next) {
                          case 0:
                            return _context14.next = 2, effects_1.select(selectors.getUserId);

                          case 2:
                            return userId = _context14.sent, data = {
                                userId: userId,
                                docId: docId,
                                subject: subject
                            }, _context14.next = 6, effects_1.call(helpers_1.saveEmailFeedbackFetch, data);

                          case 6:
                          case "end":
                            return _context14.stop();
                        }
                    }, saveFeedbackData, this);
                })
            }, {
                key: "disableOnTab",
                value: _regenerator2["default"].mark(function disableOnTab() {
                    return _regenerator2["default"].wrap(function(_context15) {
                        for (;;) switch (_context15.prev = _context15.next) {
                          case 0:
                            return _context15.next = 2, effects_1.call(this._emitFocusedTab, "disable-on-tab");

                          case 2:
                          case "end":
                            return _context15.stop();
                        }
                    }, disableOnTab, this);
                })
            } ]), SettingsSagas;
        }();
        exports.SettingsSagas = SettingsSagas;
    }, {
        "./actions": 223,
        "./helpers": 224,
        "./selectors": 227,
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/helpers/defineProperty": 31,
        "babel-runtime/regenerator": 37,
        "lib/config": 179,
        "lib/tracking": 201,
        "redux-saga": "redux-saga",
        "redux-saga/effects": 143
    } ],
    227: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.current = function(state) {
            return state.settings;
        }, exports.getUserId = function(state) {
            return state.user.id;
        }, exports.getUserAnonymous = function(state) {
            return state.user.anonymous;
        }, exports.getDapiProp = function(state, type) {
            return state.settings.common[type];
        }, exports.getIsPopupDisabled = function(state) {
            return state.settings.common.isPopupDisabled;
        };
    }, {} ],
    228: [ function(require, module, exports) {
        "use strict";
        function setActiveTab(data) {
            return {
                type: exports.t.SET_ACTIVE_TAB,
                data: data
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.t = {
            SET_ACTIVE_TAB: "tabs/SET_ACTIVE_TAB"
        }, exports.setActiveTab = setActiveTab;
    }, {} ],
    229: [ function(require, module, exports) {
        "use strict";
        function createNewTabsChannel() {
            var channel = util_1.createChannel();
            return message.on("tab-connected", function(_ref) {
                var tab = _ref.tab, url = _ref.url;
                return channel.put({
                    tab: tab,
                    url: url
                });
            }), channel;
        }
        function createActiveTabsChannel(api) {
            var channel = util_1.createChannel({
                buffered: !1
            });
            return api.tabs.onActiveTabChange(function(_ref2) {
                var url = _ref2.url, favIconUrl = _ref2.favIconUrl, windowId = _ref2.windowId, id = _ref2.id;
                return channel.put({
                    url: url,
                    favIconUrl: favIconUrl,
                    windowId: windowId,
                    id: id
                });
            }, function(err) {
                return console.error("runtime error by changing active tab", err);
            }), channel;
        }
        function setBadgeIcon(api, name) {
            util_1.isSafari() || api.button.setBadge(""), api.button.setIconByName(name);
        }
        function setBadgeText(_ref3, text) {
            var button = _ref3.button;
            switch (button.kind) {
              case "web-extension":
                button.setBadgeBackgroundColor(exports.DEFAULT_BADGE_COLOR), button.setIconByName("");
                break;

              case "fallback":
                break;

              default:
                throw new Error("Unsupported browser button action");
            }
            button.setBadge(text);
        }
        function getBadgeText(_ref4) {
            var referral = _ref4.user.referral, _ref4$settings = _ref4.settings, seenNewsVersion = _ref4$settings.seenNewsVersion, referralNewsBadge = _ref4$settings.referralNewsBadge, enabled = _ref4$settings.enabled;
            return seenNewsVersion !== config_1.newsId || referral && !referralNewsBadge ? "NEW" : enabled ? "" : "off";
        }
        function setUninstallURL(domain) {
            if (util_1.isChrome() || util_1.isFF()) {
                var url = domain ? config_1.URLS.uninstall + "?domain=" + encodeURI(domain) : config_1.URLS.uninstall;
                window.chrome.runtime.setUninstallURL && window.chrome.runtime.setUninstallURL(url);
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var config_1 = require("lib/config"), message = require("lib/message"), page_config_1 = require("lib/page-config"), util_1 = require("lib/util");
        exports.createNewTabsChannel = createNewTabsChannel, exports.createActiveTabsChannel = createActiveTabsChannel, 
        exports.invalidatePageConfig = util_1.memoize(page_config_1.pageConfig.invalidate, void 0, 1e4), 
        exports.DEFAULT_BADGE_COLOR = "#e75146", exports.setBadgeIcon = setBadgeIcon, exports.setBadgeText = setBadgeText, 
        exports.getBadgeText = getBadgeText, exports.setUninstallURL = setUninstallURL;
    }, {
        "lib/config": 179,
        "lib/message": 183,
        "lib/page-config": 189,
        "lib/util": 207
    } ],
    230: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function tabsReducer() {
            var state = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref = arguments[1], type = _ref.type, data = _ref.data;
            switch (type) {
              case actions_1.t.SET_ACTIVE_TAB:
                return (0, _assign2["default"])({}, state, {
                    active: data
                });

              default:
                return state;
            }
        }
        var _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var actions_1 = require("./actions");
        exports.tabsReducer = tabsReducer;
    }, {
        "./actions": 228,
        "babel-runtime/core-js/object/assign": 19
    } ],
    231: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var effects_1 = require("redux-saga/effects"), helpers_1 = require("./helpers"), location_1 = require("lib/location"), tracking_1 = require("lib/tracking"), actions = require("./actions"), settingsActions = require("../settings/actions"), settingsSelectors = require("../settings/selectors"), selectors_1 = require("./selectors");
        exports.GMAIL_DOMAINS = [ "mail.google.com", "inbox.google.com" ], exports.EMAIL_FEEDBACK_GROUP = "email_perception", 
        exports.POPUP_EXPERIMENT_URL = "grammarly.com/i/personalize", exports.POPUP_EXPERIMENT_COOKIE_NAME = "AT4802", 
        exports.POPUP_EXPERIMENT_COOKIE_VAL = "2";
        var TabsSagas = function() {
            function TabsSagas(_connectionSagas, _emitTo, _emitFocusedTab, _getAllGrammarlyCookies, _api, _isChrome) {
                (0, _classCallCheck3["default"])(this, TabsSagas), this._connectionSagas = _connectionSagas, 
                this._emitTo = _emitTo, this._emitFocusedTab = _emitFocusedTab, this._getAllGrammarlyCookies = _getAllGrammarlyCookies, 
                this._api = _api, this._isChrome = _isChrome;
            }
            return (0, _createClass3["default"])(TabsSagas, [ {
                key: "start",
                value: _regenerator2["default"].mark(function start() {
                    var activeTab;
                    return _regenerator2["default"].wrap(function(_context) {
                        for (;;) switch (_context.prev = _context.next) {
                          case 0:
                            return _context.next = 2, effects_1.fork([ this, this.listenActiveTabChange ]);

                          case 2:
                            if (!this._isChrome) {
                                _context.next = 5;
                                break;
                            }
                            return _context.next = 5, effects_1.fork([ this, this.listenUrlChange ]);

                          case 5:
                            return _context.next = 7, effects_1.select(selectors_1.getActiveTab);

                          case 7:
                            if (activeTab = _context.sent) {
                                _context.next = 11;
                                break;
                            }
                            return _context.next = 11, effects_1.take(actions.t.SET_ACTIVE_TAB);

                          case 11:
                            return _context.next = 13, effects_1.fork([ this, this.listenNewTabsConnections ]);

                          case 13:
                          case "end":
                            return _context.stop();
                        }
                    }, start, this);
                })
            }, {
                key: "listenNewTabsConnections",
                value: _regenerator2["default"].mark(function listenNewTabsConnections() {
                    var channel, _ref, tab, url, state, pageState;
                    return _regenerator2["default"].wrap(function(_context2) {
                        for (;;) switch (_context2.prev = _context2.next) {
                          case 0:
                            return _context2.next = 2, effects_1.call(helpers_1.createNewTabsChannel);

                          case 2:
                            channel = _context2.sent;

                          case 3:
                            return _context2.next = 6, effects_1.call(channel.take);

                          case 6:
                            return _ref = _context2.sent, tab = _ref.tab, url = _ref.url, _context2.next = 11, 
                            effects_1.call(helpers_1.invalidatePageConfig);

                          case 11:
                            return _context2.next = 13, effects_1.select(selectors_1.stateByUrl, url);

                          case 13:
                            if (state = _context2.sent, !state.connection.cookiesDisabled && navigator.cookieEnabled !== !1) {
                                _context2.next = 17;
                                break;
                            }
                            return _context2.next = 17, effects_1.fork([ this._connectionSagas, this._connectionSagas.monitorCookiesDisable ]);

                          case 17:
                            return _context2.next = 19, effects_1.call(this.checkForEmailFeedback, url);

                          case 19:
                            if ("popup" !== tab) {
                                _context2.next = 24;
                                break;
                            }
                            return _context2.next = 22, effects_1.call(this._emitTo, "popup", "state", state);

                          case 22:
                            _context2.next = 29;
                            break;

                          case 24:
                            return pageState = selectors_1.stateForTab(state), _context2.next = 27, effects_1.call(tracking_1.fire, "tab-connected", state.user, state.config, state.connection, pageState.page.domain, pageState.page.grammarlyEditor);

                          case 27:
                            return _context2.next = 29, effects_1.call(this._emitTo, tab, "state", pageState);

                          case 29:
                            _context2.next = 3;
                            break;

                          case 31:
                          case "end":
                            return _context2.stop();
                        }
                    }, listenNewTabsConnections, this);
                })
            }, {
                key: "sendStateToTabs",
                value: _regenerator2["default"].mark(function sendStateToTabs() {
                    var state, activeTab, tabState;
                    return _regenerator2["default"].wrap(function(_context3) {
                        for (;;) switch (_context3.prev = _context3.next) {
                          case 0:
                            return _context3.next = 2, effects_1.select(selectors_1.stateByActiveTab);

                          case 2:
                            return state = _context3.sent, _context3.next = 5, effects_1.select(selectors_1.getActiveTab);

                          case 5:
                            if (activeTab = _context3.sent, !window.__disableSendStateToTabs) {
                                _context3.next = 8;
                                break;
                            }
                            return _context3.abrupt("return");

                          case 8:
                            return _context3.next = 10, effects_1.call([ this, this.renderBadge ], state);

                          case 10:
                            return _context3.next = 12, effects_1.call(this._emitTo, "popup", "state", state);

                          case 12:
                            return window.__popupState = state, tabState = selectors_1.stateForTab(state), _context3.next = 16, 
                            effects_1.call(this._emitTo, activeTab.id, "state", tabState);

                          case 16:
                            return _context3.next = 18, effects_1.call(this._emitFocusedTab, "state", tabState);

                          case 18:
                          case "end":
                            return _context3.stop();
                        }
                    }, sendStateToTabs, this);
                })
            }, {
                key: "listenActiveTabChange",
                value: _regenerator2["default"].mark(function listenActiveTabChange() {
                    var channel, tab, oldTab, domain;
                    return _regenerator2["default"].wrap(function(_context4) {
                        for (;;) switch (_context4.prev = _context4.next) {
                          case 0:
                            return _context4.next = 2, effects_1.call(helpers_1.createActiveTabsChannel, this._api);

                          case 2:
                            channel = _context4.sent;

                          case 3:
                            return _context4.next = 6, effects_1.call(channel.take);

                          case 6:
                            return tab = _context4.sent, _context4.next = 9, effects_1.select(selectors_1.getActiveTab);

                          case 9:
                            if (oldTab = _context4.sent, domain = location_1.domainFromUrl(tab.url), oldTab && oldTab.id === tab.id && oldTab.url === tab.url) {
                                _context4.next = 16;
                                break;
                            }
                            return _context4.next = 14, effects_1.put(actions.setActiveTab(tab));

                          case 14:
                            return _context4.next = 16, effects_1.call(helpers_1.setUninstallURL, domain);

                          case 16:
                            _context4.next = 3;
                            break;

                          case 18:
                          case "end":
                            return _context4.stop();
                        }
                    }, listenActiveTabChange, this);
                })
            }, {
                key: "listenUrlChange",
                value: _regenerator2["default"].mark(function listenUrlChange() {
                    var channel, tab, cookies, isPopupDisabled, isPopupExperiment, isPersonalizePage;
                    return _regenerator2["default"].wrap(function(_context5) {
                        for (;;) switch (_context5.prev = _context5.next) {
                          case 0:
                            return _context5.next = 2, effects_1.call(helpers_1.createActiveTabsChannel, this._api);

                          case 2:
                            channel = _context5.sent;

                          case 3:
                            return _context5.next = 6, effects_1.call(channel.take);

                          case 6:
                            return tab = _context5.sent, _context5.next = 9, effects_1.call(this._getAllGrammarlyCookies);

                          case 9:
                            return cookies = _context5.sent, _context5.next = 12, effects_1.select(settingsSelectors.getIsPopupDisabled);

                          case 12:
                            if (isPopupDisabled = _context5.sent, isPopupExperiment = cookies.find(function(x) {
                                return x.name === exports.POPUP_EXPERIMENT_COOKIE_NAME && x.value === exports.POPUP_EXPERIMENT_COOKIE_VAL;
                            }), isPopupExperiment || isPopupDisabled) {
                                _context5.next = 16;
                                break;
                            }
                            return _context5.abrupt("return");

                          case 16:
                            if (isPersonalizePage = tab && tab.url && tab.url.indexOf(exports.POPUP_EXPERIMENT_URL) > -1, 
                            !isPersonalizePage) {
                                _context5.next = 22;
                                break;
                            }
                            return _context5.next = 20, effects_1.put(settingsActions.togglePopup(!0));

                          case 20:
                            _context5.next = 25;
                            break;

                          case 22:
                            if (!isPopupDisabled) {
                                _context5.next = 25;
                                break;
                            }
                            return _context5.next = 25, effects_1.put(settingsActions.togglePopup(!1));

                          case 25:
                            _context5.next = 3;
                            break;

                          case 27:
                          case "end":
                            return _context5.stop();
                        }
                    }, listenUrlChange, this);
                })
            }, {
                key: "renderBadge",
                value: _regenerator2["default"].mark(function renderBadge(_ref2) {
                    var text, user = _ref2.user, config = _ref2.config, settings = _ref2.settings;
                    return _regenerator2["default"].wrap(function(_context6) {
                        for (;;) switch (_context6.prev = _context6.next) {
                          case 0:
                            if (!(user.anonymous || config.grammarlyEditor || config.dontShowDisabledBadge)) {
                                _context6.next = 5;
                                break;
                            }
                            return _context6.next = 3, effects_1.call(helpers_1.setBadgeText, this._api, "");

                          case 3:
                            _context6.next = 15;
                            break;

                          case 5:
                            if (config.enabled || config.servicePage) {
                                _context6.next = 10;
                                break;
                            }
                            return _context6.next = 8, effects_1.call(helpers_1.setBadgeIcon, this._api, "bang");

                          case 8:
                            _context6.next = 15;
                            break;

                          case 10:
                            return _context6.next = 12, effects_1.call(helpers_1.getBadgeText, {
                                user: user,
                                settings: settings
                            });

                          case 12:
                            return text = _context6.sent, _context6.next = 15, effects_1.call(helpers_1.setBadgeText, this._api, text);

                          case 15:
                          case "end":
                            return _context6.stop();
                        }
                    }, renderBadge, this);
                })
            }, {
                key: "checkForEmailFeedback",
                value: _regenerator2["default"].mark(function checkForEmailFeedback(url) {
                    var domain, groups, experiments, isEmailPerceptionExperiment, hasOptInGroup;
                    return _regenerator2["default"].wrap(function(_context7) {
                        for (;;) switch (_context7.prev = _context7.next) {
                          case 0:
                            return _context7.next = 2, effects_1.call(location_1.domainFromUrl, url);

                          case 2:
                            if (domain = _context7.sent, exports.GMAIL_DOMAINS.includes(domain) === !0) {
                                _context7.next = 5;
                                break;
                            }
                            return _context7.abrupt("return");

                          case 5:
                            return _context7.next = 7, effects_1.select(selectors_1.getUserGroups);

                          case 7:
                            return groups = _context7.sent, _context7.next = 10, effects_1.select(selectors_1.getExperiments);

                          case 10:
                            if (experiments = _context7.sent, isEmailPerceptionExperiment = experiments && experiments.emailPerception === !0, 
                            hasOptInGroup = groups.includes(exports.EMAIL_FEEDBACK_GROUP) === !0, !hasOptInGroup && !isEmailPerceptionExperiment) {
                                _context7.next = 16;
                                break;
                            }
                            return _context7.next = 16, effects_1.put(settingsActions.enableEmailFeedback(domain));

                          case 16:
                          case "end":
                            return _context7.stop();
                        }
                    }, checkForEmailFeedback, this);
                })
            } ]), TabsSagas;
        }();
        exports.TabsSagas = TabsSagas;
    }, {
        "../settings/actions": 223,
        "../settings/selectors": 227,
        "./actions": 228,
        "./helpers": 229,
        "./selectors": 232,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/regenerator": 37,
        "lib/location": 182,
        "lib/tracking": 201,
        "redux-saga/effects": 143
    } ],
    232: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function stateByUrl(state, url) {
            var domain = location_1.domainFromUrl(url), page = page_config_1.pageConfig.get(domain, url), settings = getDomainSettings(state.settings, domain);
            return (0, _assign2["default"])({}, state, {
                config: (0, _assign2["default"])({}, page, {
                    domain: domain
                })
            }, {
                settings: settings,
                activeTab: state.tabs && state.tabs.active
            });
        }
        function stateByActiveTab(state) {
            return stateByUrl(state, state.tabs.active.url);
        }
        function getDomainSettings(settings, domain) {
            var enabled = !settings[domain] || void 0 === settings[domain].enabled || settings[domain].enabled, domainSettings = settings[domain];
            return (0, _assign2["default"])({}, settings.common, domainSettings, {
                enabled: enabled
            });
        }
        var _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var page_config_1 = require("lib/page-config"), location_1 = require("lib/location");
        exports.stateByUrl = stateByUrl, exports.stateByActiveTab = stateByActiveTab, exports.getDomainSettings = getDomainSettings, 
        exports.stateForTab = function(_ref) {
            var user = _ref.user, connection = _ref.connection, config = _ref.config, settings = _ref.settings;
            return {
                user: user,
                connection: connection,
                page: (0, _assign2["default"])({}, settings, config, {
                    enabled: settings.enabled && config.enabled
                })
            };
        }, exports.getActiveTab = function(_ref2) {
            var tabs = _ref2.tabs;
            return tabs.active;
        }, exports.getAll = function(state) {
            return state;
        }, exports.getUserGroups = function(state) {
            return state.user.groups;
        }, exports.getExperiments = function(state) {
            return state.user.experiments;
        };
    }, {
        "babel-runtime/core-js/object/assign": 19,
        "lib/location": 182,
        "lib/page-config": 189
    } ],
    233: [ function(require, module, exports) {
        "use strict";
        function setUser(data) {
            return {
                type: exports.t.SET_USER,
                data: data
            };
        }
        function setSettings(data) {
            return {
                type: exports.t.SET_SETTINGS,
                data: data
            };
        }
        function sessionInvalidate(reason) {
            return {
                type: exports.t.SESSION_INVALIDATE,
                reason: reason
            };
        }
        function incFixed() {
            return {
                type: exports.t.INC_FIXED
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.t = {
            SET_USER: "user/SET_USER",
            SET_SETTINGS: "user/SET_SETTINGS",
            SESSION_INVALIDATE: "user/SESSION_INVALIDATE",
            INC_FIXED: "user/INC_FIXED"
        }, exports.setUser = setUser, exports.setSettings = setSettings, exports.sessionInvalidate = sessionInvalidate, 
        exports.incFixed = incFixed;
    }, {} ],
    234: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function fetchUser(containerId) {
            var options = {
                method: "post",
                query: !0,
                data: (0, _assign2["default"])({
                    field: [ "stat_feedback_ACCEPT" ],
                    app: util_1.getBrowser() + "Ext"
                }, containerId ? {
                    containerId: containerId
                } : {})
            };
            return request_1.fetch(config_1.URLS.userOrAnonymous, options);
        }
        function isItTimeToRefresh(loginDate) {
            return !loginDate || Date.now() - new Date(loginDate).getTime() > USE_SESSION_LIFE_TIME;
        }
        function fetchMimic(containerId) {
            var options = {
                data: containerId ? {
                    containerId: containerId
                } : {}
            };
            return request_1.fetch(config_1.URLS.dapiMimic, options);
        }
        function prepareUser() {
            var data = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, dapiData = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, grauth = arguments[2];
            grauth = grauth || "empty";
            var mimic = dapiData.groups || [], settings = dapiData.settings || {};
            data.token = data.grauth, data.premium = "Premium" === data.type, data.referral = isReferral(data), 
            data.experiments = new experiment_1.UserExperimentsImpl(mimic);
            var fixedErrors = data.customFields ? parseInt(data.customFields.stat_feedback_ACCEPT, 10) : 0;
            return data.fixed_errors = isNaN(fixedErrors) ? 0 : fixedErrors, config_1.userFields.reduce(function(result, field) {
                var value = data[field];
                return "undefined" != typeof value && (0, _assign2["default"])(result, (0, _defineProperty3["default"])({}, field, value)), 
                result;
            }, {
                mimic: mimic,
                settings: settings,
                grauth: grauth
            });
        }
        function isReferral(_ref) {
            var premium = _ref.premium, anonymous = _ref.anonymous, subscriptionFree = _ref.subscriptionFree, registrationDate = _ref.registrationDate, isFree = !premium && !anonymous || subscriptionFree, useForWeek = util_1.pastDays(registrationDate) > 7;
            return Boolean(isFree && useForWeek);
        }
        function authRequestHelper(url, data) {
            return request_1.fetch(url, {
                body: request_1.paramStr(data),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "post"
            });
        }
        function createCookieChannel(watchToken) {
            var channel = util_1.createChannel();
            return watchToken(channel.put), channel;
        }
        var _defineProperty2 = require("babel-runtime/helpers/defineProperty"), _defineProperty3 = _interopRequireDefault(_defineProperty2), _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var request_1 = require("lib/request"), experiment_1 = require("lib/experiment"), config_1 = require("lib/config"), util_1 = require("lib/util"), USE_SESSION_LIFE_TIME = 30 * util_1.MINUTE;
        exports.LOGIN_BY_COOKIE_CHANGE_TIMEOUT = 20 * util_1.SECOND, exports.MAX_COOKIE_HEADER_LENGTH = 7168, 
        exports.fetchUser = fetchUser, exports.isItTimeToRefresh = isItTimeToRefresh, exports.fetchMimic = fetchMimic, 
        exports.prepareUser = prepareUser, exports.isReferral = isReferral, exports.authRequestHelper = authRequestHelper, 
        exports.createCookieChannel = createCookieChannel;
    }, {
        "babel-runtime/core-js/object/assign": 19,
        "babel-runtime/helpers/defineProperty": 31,
        "lib/config": 179,
        "lib/experiment": 181,
        "lib/request": 194,
        "lib/util": 207
    } ],
    235: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function userReducer() {
            var state = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : exports.defaultUser, _ref = arguments[1], type = _ref.type, _ref$data = _ref.data, data = void 0 === _ref$data ? {} : _ref$data;
            switch (type) {
              case actions_1.t.SET_USER:
                return data;

              case actions_1.t.SET_SETTINGS:
                return (0, _assign2["default"])({}, state, {
                    settings: data
                });

              case actions_1.t.INC_FIXED:
                var fixed_errors = state.fixed_errors + 1;
                return (0, _assign2["default"])({}, state, {
                    fixed_errors: fixed_errors
                });

              default:
                return state;
            }
        }
        var _assign = require("babel-runtime/core-js/object/assign"), _assign2 = _interopRequireDefault(_assign);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var actions_1 = require("./actions");
        exports.defaultUser = {
            anonymous: !0,
            premium: !1
        }, exports.userReducer = userReducer;
    }, {
        "./actions": 233,
        "babel-runtime/core-js/object/assign": 19
    } ],
    236: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray"), _slicedToArray3 = _interopRequireDefault(_slicedToArray2), _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var effects_1 = require("redux-saga/effects"), redux_saga_1 = require("redux-saga"), actions_1 = require("../connection/actions"), connectionSelectors = require("../connection/selectors"), settingsSelectors = require("../settings/selectors"), settingsActions = require("../settings/actions"), actions = require("./actions"), reducer_1 = require("./reducer"), selectors = require("./selectors"), helpers_1 = require("./helpers"), util_1 = require("lib/util"), profiler_1 = require("lib/profiler"), tracking_1 = require("lib/tracking"), UserSagas = function() {
            function UserSagas(_settingsSagas, _prefs, _logger, _cookiesHelper, _getContainerIdOrUndefined, _reconnectAllSockets) {
                (0, _classCallCheck3["default"])(this, UserSagas), this._settingsSagas = _settingsSagas, 
                this._prefs = _prefs, this._logger = _logger, this._cookiesHelper = _cookiesHelper, 
                this._getContainerIdOrUndefined = _getContainerIdOrUndefined, this._reconnectAllSockets = _reconnectAllSockets;
            }
            return (0, _createClass3["default"])(UserSagas, [ {
                key: "start",
                value: _regenerator2["default"].mark(function start() {
                    return _regenerator2["default"].wrap(function(_context) {
                        for (;;) switch (_context.prev = _context.next) {
                          case 0:
                            if (util_1.isEdge()) {
                                _context.next = 5;
                                break;
                            }
                            return _context.next = 3, [ effects_1.fork([ this, this.listenCookieChanges ]), redux_saga_1.takeLatest(actions.t.SESSION_INVALIDATE, this.updateUser.bind(this)) ];

                          case 3:
                            _context.next = 7;
                            break;

                          case 5:
                            return _context.next = 7, [ redux_saga_1.takeLatest(actions.t.SESSION_INVALIDATE, this.updateUser.bind(this)) ];

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                    }, start, this);
                })
            }, {
                key: "updateUser",
                value: _regenerator2["default"].mark(function updateUser() {
                    var isSkipUpdatingUserFromAuth, cachedUser, loginDate, containerId, authData, dapiData, grauth, user, oldUser, dialectStrong, userLoggedIn, newDialectStrong, dialectWeak, dialect, _ref2, authDegradation, cookiesDisabled, _cachedUser, _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, lazy = _ref.lazy, failoverFromCache = _ref.failoverFromCache, reason = _ref.reason;
                    return _regenerator2["default"].wrap(function(_context2) {
                        for (;;) switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 11;
                            break;

                          case 3:
                            if (isSkipUpdatingUserFromAuth = _context2.sent, !isSkipUpdatingUserFromAuth) {
                                _context2.next = 11;
                                break;
                            }
                            return _context2.next = 7, effects_1.call(this._prefs.get, "user");

                          case 7:
                            return cachedUser = _context2.sent, _context2.next = 10, effects_1.put(actions.setUser(cachedUser));

                          case 10:
                            return _context2.abrupt("return", console.info("updateUser: SKIP AUTH"));

                          case 11:
                            if (profiler_1.Profiler.start("updateUser"), _context2.prev = 12, !lazy) {
                                _context2.next = 21;
                                break;
                            }
                            return _context2.next = 16, effects_1.call(this._prefs.get, "loginDate");

                          case 16:
                            if (loginDate = _context2.sent, helpers_1.isItTimeToRefresh(loginDate)) {
                                _context2.next = 21;
                                break;
                            }
                            return console.info("AUTH SERVICE| user session still fresh"), profiler_1.Profiler.stop("updateUser"), 
                            _context2.abrupt("return");

                          case 21:
                            return _context2.next = 23, effects_1.fork([ this, this.trackCookieHeaderSize ]);

                          case 23:
                            return _context2.next = 25, effects_1.call(this._getContainerIdOrUndefined);

                          case 25:
                            return containerId = _context2.sent, _context2.next = 28, effects_1.call(helpers_1.fetchUser, containerId);

                          case 28:
                            return authData = _context2.sent, _context2.next = 31, effects_1.call([ this, this.getMimic ], containerId);

                          case 31:
                            return dapiData = _context2.sent, _context2.next = 34, effects_1.call([ this, this.getGrauthFromCookie ]);

                          case 34:
                            return grauth = _context2.sent, _context2.next = 37, effects_1.call(helpers_1.prepareUser, authData, dapiData, grauth);

                          case 37:
                            return user = _context2.sent, _context2.next = 40, effects_1.select(selectors.current);

                          case 40:
                            return oldUser = _context2.sent, _context2.next = 43, effects_1.select(settingsSelectors.getDapiProp, "dialectStrong");

                          case 43:
                            return dialectStrong = _context2.sent, userLoggedIn = user.anonymous === !1 && oldUser.anonymous === !0 && void 0 !== oldUser.grauth && void 0 !== oldUser.email, 
                            _context2.next = 47, effects_1.put(actions.setUser(user));

                          case 47:
                            if (userLoggedIn !== !0) {
                                _context2.next = 50;
                                break;
                            }
                            return _context2.next = 50, effects_1.call([ this._settingsSagas, this._settingsSagas.setAnonymousPropsToDapi ]);

                          case 50:
                            if (user.id === oldUser.id) {
                                _context2.next = 55;
                                break;
                            }
                            return _context2.next = 53, effects_1.call([ this._settingsSagas, this._settingsSagas.initializeDapiProps ]);

                          case 53:
                            _context2.next = 57;
                            break;

                          case 55:
                            return _context2.next = 57, effects_1.call([ this._settingsSagas, this._settingsSagas.resetStrongDialectFromDapi ]);

                          case 57:
                            return _context2.next = 59, effects_1.select(settingsSelectors.getDapiProp, "dialectStrong");

                          case 59:
                            if (newDialectStrong = _context2.sent, !user.settings.dialectStrong || newDialectStrong) {
                                _context2.next = 64;
                                break;
                            }
                            return _context2.next = 63, effects_1.put(settingsActions.setDapiProp("dialectStrong", user.settings.dialectStrong));

                          case 63:
                            newDialectStrong = user.settings.dialectStrong;

                          case 64:
                            if (!oldUser.id || user.id === oldUser.id && user.type === oldUser.type && newDialectStrong === dialectStrong) {
                                _context2.next = 72;
                                break;
                            }
                            return _context2.next = 67, effects_1.select(settingsSelectors.getDapiProp, "dialectWeak");

                          case 67:
                            return dialectWeak = _context2.sent, dialect = newDialectStrong || dialectStrong || dialectWeak, 
                            _context2.next = 71, effects_1.call(this._reconnectAllSockets, dialect);

                          case 71:
                            console.warn("AUTH SERVICE| user changed, reseting capi session witha a dialect: ", dialect);

                          case 72:
                            return _context2.next = 74, effects_1.call(this._prefs.set, {
                                user: user,
                                loginDate: new Date()
                            });

                          case 74:
                            return _context2.next = 76, effects_1.select(connectionSelectors.current);

                          case 76:
                            return _ref2 = _context2.sent, authDegradation = _ref2.authDegradation, cookiesDisabled = _ref2.cookiesDisabled, 
                            _context2.next = 81, effects_1.call(tracking_1.fire, "session-invalidate", user, oldUser, reason, cookiesDisabled, containerId);

                          case 81:
                            if (!authDegradation) {
                                _context2.next = 84;
                                break;
                            }
                            return _context2.next = 84, effects_1.put(actions_1.updateConnection({
                                authDegradation: !1
                            }));

                          case 84:
                            if (void 0 === containerId) {
                                _context2.next = 87;
                                break;
                            }
                            return _context2.next = 87, effects_1.call([ this._logger, this._logger.setContainerId ], containerId);

                          case 87:
                            if (user.id === oldUser.id) {
                                _context2.next = 90;
                                break;
                            }
                            return _context2.next = 90, effects_1.call([ this._logger, this._logger.setUserId ], user.id);

                          case 90:
                            _context2.next = 110;
                            break;

                          case 92:
                            if (_context2.prev = 92, _context2.t0 = _context2["catch"](12), !redux_saga_1.isCancelError(_context2.t0)) {
                                _context2.next = 97;
                                break;
                            }
                            return profiler_1.Profiler.stop("updateUser"), _context2.abrupt("return");

                          case 97:
                            return _context2.next = 99, effects_1.call(this._prefs.set, {
                                loginDate: 0
                            });

                          case 99:
                            return _context2.next = 101, effects_1.put(actions_1.updateConnection({
                                authDegradation: !0
                            }));

                          case 101:
                            return _context2.next = 103, effects_1.call(this._logger.fetchUserFail, reason, _context2.t0.body, _context2.t0.statusCode);

                          case 103:
                            if (console.warn("AUTH SERVICE| auth request fail. Message: ", _context2.t0), !failoverFromCache) {
                                _context2.next = 110;
                                break;
                            }
                            return _context2.next = 107, effects_1.call(this._prefs.get, "user");

                          case 107:
                            return _cachedUser = _context2.sent, _context2.next = 110, effects_1.put(actions.setUser(_cachedUser || reducer_1.defaultUser));

                          case 110:
                            profiler_1.Profiler.stop("updateUser");

                          case 111:
                          case "end":
                            return _context2.stop();
                        }
                    }, updateUser, this, [ [ 12, 92 ] ]);
                })
            }, {
                key: "getMimic",
                value: _regenerator2["default"].mark(function getMimic(containerId) {
                    return _regenerator2["default"].wrap(function(_context3) {
                        for (;;) switch (_context3.prev = _context3.next) {
                          case 0:
                            return _context3.prev = 0, _context3.next = 3, effects_1.call(helpers_1.fetchMimic, containerId);

                          case 3:
                            return _context3.abrupt("return", _context3.sent);

                          case 6:
                            return _context3.prev = 6, _context3.t0 = _context3["catch"](0), console.warn("AUTH SERVICE| fetch mimic fail. Message: ", _context3.t0.message), 
                            _context3.next = 11, effects_1.call(this._logger.fetchMimicFail, _context3.t0.body, _context3.t0.statusCode);

                          case 11:
                            return _context3.abrupt("return", {});

                          case 12:
                          case "end":
                            return _context3.stop();
                        }
                    }, getMimic, this, [ [ 0, 6 ] ]);
                })
            }, {
                key: "getGrauthFromCookie",
                value: _regenerator2["default"].mark(function getGrauthFromCookie() {
                    return _regenerator2["default"].wrap(function(_context4) {
                        for (;;) switch (_context4.prev = _context4.next) {
                          case 0:
                            return _context4.prev = 0, _context4.next = 3, effects_1.call(this._cookiesHelper.getToken);

                          case 3:
                            return _context4.abrupt("return", _context4.sent);

                          case 6:
                            return _context4.prev = 6, _context4.t0 = _context4["catch"](0), console.warn("AUTH SERVICE| fetch cookie fail. Message: ", _context4.t0.message), 
                            _context4.next = 11, effects_1.call(this._logger.fetchCookieFail);

                          case 11:
                            return _context4.abrupt("return", "bad_cookie");

                          case 12:
                          case "end":
                            return _context4.stop();
                        }
                    }, getGrauthFromCookie, this, [ [ 0, 6 ] ]);
                })
            }, {
                key: "trackCookieHeaderSize",
                value: _regenerator2["default"].mark(function trackCookieHeaderSize() {
                    var cookies, total, _cookies$reduce, name, length;
                    return _regenerator2["default"].wrap(function(_context5) {
                        for (;;) switch (_context5.prev = _context5.next) {
                          case 0:
                            return _context5.prev = 0, _context5.next = 3, effects_1.call(this._cookiesHelper.getAllGrammarlyCookies);

                          case 3:
                            if (cookies = _context5.sent, total = cookies.reduce(function(total, _ref3) {
                                var value = _ref3.value;
                                return total + value.length;
                            }, 0), !(total > helpers_1.MAX_COOKIE_HEADER_LENGTH)) {
                                _context5.next = 9;
                                break;
                            }
                            return _cookies$reduce = cookies.reduce(function(prev, next) {
                                return prev.value.length > next.value.length ? prev : next;
                            }, {
                                name: "",
                                value: ""
                            }), name = _cookies$reduce.name, length = _cookies$reduce.value.length, _context5.next = 9, 
                            effects_1.call(tracking_1.fire, "cookie-overflow", total, {
                                name: name,
                                length: length
                            });

                          case 9:
                            _context5.next = 14;
                            break;

                          case 11:
                            _context5.prev = 11, _context5.t0 = _context5["catch"](0), console.warn("AUTH SERVICE| fetch grammarly cookies fail. Message: ", _context5.t0.message);

                          case 14:
                          case "end":
                            return _context5.stop();
                        }
                    }, trackCookieHeaderSize, this, [ [ 0, 11 ] ]);
                })
            }, {
                key: "externalUpdateUser",
                value: _regenerator2["default"].mark(function externalUpdateUser(_, lazy, reason) {
                    return _regenerator2["default"].wrap(function(_context6) {
                        for (;;) switch (_context6.prev = _context6.next) {
                          case 0:
                            return _context6.next = 2, effects_1.call([ this, this.updateUser ], {
                                lazy: lazy,
                                reason: reason
                            });

                          case 2:
                          case "end":
                            return _context6.stop();
                        }
                    }, externalUpdateUser, this);
                })
            }, {
                key: "authRequest",
                value: _regenerator2["default"].mark(function authRequest(_, url, data, successMetric) {
                    var formData, response, _successMetric$split, _successMetric$split2, reason;
                    return _regenerator2["default"].wrap(function(_context7) {
                        for (;;) switch (_context7.prev = _context7.next) {
                          case 0:
                            return _context7.prev = 0, formData = data.form, _context7.next = 4, effects_1.call(helpers_1.authRequestHelper, url, formData);

                          case 4:
                            return response = _context7.sent, _successMetric$split = successMetric.split("_"), 
                            _successMetric$split2 = (0, _slicedToArray3["default"])(_successMetric$split, 2), 
                            reason = _successMetric$split2[1], _context7.next = 8, effects_1.call([ this, this.updateUser ], {
                                reason: reason
                            });

                          case 8:
                            return _context7.next = 10, effects_1.call(tracking_1.fire, successMetric, data.placement);

                          case 10:
                            return _context7.abrupt("return", response);

                          case 13:
                            return _context7.prev = 13, _context7.t0 = _context7["catch"](0), console.warn("auth error", _context7.t0), 
                            _context7.abrupt("return", {
                                error: _context7.t0.message || _context7.t0.body
                            });

                          case 17:
                          case "end":
                            return _context7.stop();
                        }
                    }, authRequest, this, [ [ 0, 13 ] ]);
                })
            }, {
                key: "listenCookieChanges",
                value: _regenerator2["default"].mark(function listenCookieChanges() {
                    var channel, task;
                    return _regenerator2["default"].wrap(function(_context8) {
                        for (;;) switch (_context8.prev = _context8.next) {
                          case 0:
                            return _context8.next = 2, effects_1.call(helpers_1.createCookieChannel, this._cookiesHelper.watchToken);

                          case 2:
                            channel = _context8.sent, task = void 0;

                          case 4:
                            return _context8.next = 7, effects_1.call(channel.take);

                          case 7:
                            if (!task) {
                                _context8.next = 10;
                                break;
                            }
                            return _context8.next = 10, effects_1.cancel(task);

                          case 10:
                            return _context8.next = 12, effects_1.fork([ this, this.cookieChange ]);

                          case 12:
                            task = _context8.sent, _context8.next = 4;
                            break;

                          case 15:
                          case "end":
                            return _context8.stop();
                        }
                    }, listenCookieChanges, this);
                })
            }, {
                key: "cookieChange",
                value: _regenerator2["default"].mark(function cookieChange() {
                    var newGrauth, _ref4, grauth;
                    return _regenerator2["default"].wrap(function(_context9) {
                        for (;;) switch (_context9.prev = _context9.next) {
                          case 0:
                            return _context9.prev = 0, _context9.next = 3, effects_1.call(util_1.delay, helpers_1.LOGIN_BY_COOKIE_CHANGE_TIMEOUT);

                          case 3:
                            return _context9.next = 5, effects_1.call([ this, this.getGrauthFromCookie ]);

                          case 5:
                            return newGrauth = _context9.sent, _context9.next = 8, effects_1.select(selectors.current);

                          case 8:
                            if (_ref4 = _context9.sent, grauth = _ref4.grauth, newGrauth === grauth) {
                                _context9.next = 13;
                                break;
                            }
                            return _context9.next = 13, effects_1.put(actions.sessionInvalidate("cookieChange"));

                          case 13:
                            _context9.next = 19;
                            break;

                          case 15:
                            return _context9.prev = 15, _context9.t0 = _context9["catch"](0), _context9.next = 19, 
                            effects_1.call(this._logger.frequentCookieChanges, redux_saga_1.isCancelError(_context9.t0));

                          case 19:
                          case "end":
                            return _context9.stop();
                        }
                    }, cookieChange, this, [ [ 0, 15 ] ]);
                })
            } ]), UserSagas;
        }();
        exports.UserSagas = UserSagas;
    }, {
        "../connection/actions": 219,
        "../connection/selectors": 222,
        "../settings/actions": 223,
        "../settings/selectors": 227,
        "./actions": 233,
        "./helpers": 234,
        "./reducer": 235,
        "./selectors": 237,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/helpers/slicedToArray": 34,
        "babel-runtime/regenerator": 37,
        "lib/profiler": 193,
        "lib/tracking": 201,
        "lib/util": 207,
        "redux-saga": "redux-saga",
        "redux-saga/effects": 143
    } ],
    237: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.current = function(state) {
            return state.user;
        };
    }, {} ],
    238: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function configureStore(sagaMiddleware) {
            var reducer = redux_1.combineReducers({
                user: reducer_3.userReducer,
                tabs: reducer_4.tabsReducer,
                settings: reducer_2.settingsReducer,
                connection: reducer_1.connectionReducer
            }), logger = createLogger({
                level: "debug",
                colors: {
                    title: function() {
                        return "green";
                    }
                }
            });
            return redux_1.createStore(reducer, {}, redux_1.applyMiddleware(sagaMiddleware, logger));
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _createClass2 = require("babel-runtime/helpers/createClass"), _createClass3 = _interopRequireDefault(_createClass2), _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"), _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var createLogger = require("redux-logger"), redux_1 = require("redux"), redux_saga_1 = require("redux-saga"), reducer_1 = require("./state/connection/reducer"), reducer_2 = require("./state/settings/reducer"), reducer_3 = require("./state/user/reducer"), reducer_4 = require("./state/tabs/reducer"), config_1 = require("lib/config"), actions_1 = require("./state/actions"), actions_2 = require("./state/actions");
        exports.pureActions = actions_2.pureActions;
        var effects_1 = require("redux-saga/effects"), page_config_1 = require("lib/page-config"), AuthSagaRunners = function AuthSagaRunners(_store, _userSagas) {
            var _this = this;
            (0, _classCallCheck3["default"])(this, AuthSagaRunners), this._store = _store, this._userSagas = _userSagas, 
            this.refreshUser = function() {
                for (var _store2, _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                return (_store2 = _this._store).runSaga.apply(_store2, [ _this._userSagas.externalUpdateUser.bind(_this._userSagas) ].concat(args)).done;
            }, this.signin = function(data) {
                return _this._store.runSaga(_this._userSagas.authRequest.bind(_this._userSagas), config_1.URLS.authSignin, data, "app_signin_success").done;
            }, this.signup = function(data) {
                return _this._store.runSaga(_this._userSagas.authRequest.bind(_this._userSagas), config_1.URLS.authSignup, data, "app_signup_success").done;
            };
        };
        exports.AuthSagaRunners = AuthSagaRunners;
        var StoreControllerImpl = function() {
            function StoreControllerImpl(_userSagas, _settingsSagas, _tabsSagas, _connectionSagas) {
                var _this2 = this;
                (0, _classCallCheck3["default"])(this, StoreControllerImpl), this._userSagas = _userSagas, 
                this._settingsSagas = _settingsSagas, this._tabsSagas = _tabsSagas, this._connectionSagas = _connectionSagas;
                var sagaMiddleware = redux_saga_1["default"](_userSagas.start.bind(_userSagas), _settingsSagas.start.bind(_settingsSagas), _connectionSagas.start.bind(_connectionSagas));
                this.store = configureStore(sagaMiddleware), this.runSaga = sagaMiddleware.run, 
                this.initStore = function() {
                    return sagaMiddleware.run(_this2._startupFlow.bind(_this2)).done.then(function() {
                        _this2.store.subscribe(function() {
                            return sagaMiddleware.run(_tabsSagas.sendStateToTabs.bind(_tabsSagas));
                        });
                    });
                }, this.actions = redux_1.bindActionCreators(actions_1.pureActions, this.store.dispatch);
            }
            return (0, _createClass3["default"])(StoreControllerImpl, [ {
                key: "_startupFlow",
                value: _regenerator2["default"].mark(function _startupFlow() {
                    return _regenerator2["default"].wrap(function(_context) {
                        for (;;) switch (_context.prev = _context.next) {
                          case 0:
                            return _context.next = 2, [ effects_1.call([ this._settingsSagas, this._settingsSagas.setInitialSettings ]), effects_1.call([ page_config_1.pageConfig, page_config_1.pageConfig.init ]), effects_1.call([ this._userSagas, this._userSagas.updateUser ], {
                                failoverFromCache: !0
                            }) ];

                          case 2:
                            return _context.next = 4, effects_1.fork([ this._connectionSagas, this._connectionSagas.monitorIsIncognito ]);

                          case 4:
                            return _context.next = 6, effects_1.call([ this._tabsSagas, this._tabsSagas.start ]);

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                    }, _startupFlow, this);
                })
            } ]), StoreControllerImpl;
        }();
        exports.StoreControllerImpl = StoreControllerImpl;
    }, {
        "./state/actions": 218,
        "./state/connection/reducer": 220,
        "./state/settings/reducer": 225,
        "./state/tabs/reducer": 230,
        "./state/user/reducer": 235,
        "babel-runtime/helpers/classCallCheck": 29,
        "babel-runtime/helpers/createClass": 30,
        "babel-runtime/regenerator": 37,
        "lib/config": 179,
        "lib/page-config": 189,
        redux: "redux",
        "redux-logger": "redux-logger",
        "redux-saga": "redux-saga",
        "redux-saga/effects": 143
    } ],
    239: [ function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function getNextPingDate() {
            var now = new Date();
            return now.getHours() > 2 && now.setDate(now.getDate() + 1), now.setHours(3), now.setMinutes(Math.floor(60 * Math.random())), 
            now.getTime();
        }
        var _regenerator = require("babel-runtime/regenerator"), _regenerator2 = _interopRequireDefault(_regenerator), _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = _promise2["default"]))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var stdlib_1 = require("stdlib"), util_1 = require("lib/util");
        exports.isIncognito = function() {
            return __awaiter(void 0, void 0, void 0, _regenerator2["default"].mark(function _callee() {
                return _regenerator2["default"].wrap(function(_context) {
                    for (;;) switch (_context.prev = _context.next) {
                      case 0:
                        if (_context.t0 = util_1.isChrome() || util_1.isFF(), !_context.t0) {
                            _context.next = 5;
                            break;
                        }
                        return _context.next = 4, stdlib_1.SafePromise.create(function(res) {
                            chrome && chrome.extension ? chrome.extension.isAllowedIncognitoAccess(res) : res(!1);
                        });

                      case 4:
                        _context.t0 = _context.sent;

                      case 5:
                        return _context.abrupt("return", _context.t0);

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                }, _callee, this);
            }));
        }, exports.getNextPingDate = getNextPingDate;
    }, {
        "babel-runtime/core-js/promise": 26,
        "babel-runtime/regenerator": 37,
        "lib/util": 207,
        stdlib: 210
    } ],
    240: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.MessageTypes = {
            server: "socket-server",
            client: "socket-client",
            serverIframe: "socket-server-iframe",
            iframeMode: "iframe-mode"
        };
    }, {} ]
}, {}, [ 149 ]);