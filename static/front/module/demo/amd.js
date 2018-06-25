(function(root) {
    var CONFIG = {
        baseUrl: '',
        charset: '',
        paths: {},
        shim: {}
    };
    var MODULES = {};
    // url to SHIM name
    var SHIMMAP = {};
    var cache = {
        modules: MODULES,
        config: CONFIG
    };
    var noop = function() {};
    var document = root.document;
    var head = document.head;
    var baseElement = document.getElementsByTagName('base')[0];
    var currentlyAddingScript, interactiveScript, anonymousMeta;

    // utils
    function isType(type) {
        return function(obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    }

    var isFunction = isType('Function');
    var isString = isType('String');
    var isArray = isType('Array');


    function hasProp(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    function each(arr, callback) {
        if (!isArray(arr)) return;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (callback(arr[i], i, arr)) break;
        }
    }

    /**
     * reverse each
     */
    function eachReverse(arr, callback) {
        if (!isArray(arr)) return;
        for (var i = arr.length - 1; i >= 0; i--) {
            if (callback(arr[i], i, arr)) break;
        }
    }

    function eachProp(obj, callback) {
        for (var prop in obj) {
            if (hasProp(obj, prop)) {
                if (callback(obj[prop], prop)) break;
            }
        }
    }

    function isPlainObject(obj) {
        var isPlain = true;
        eachProp(obj, function() {
            isPlain = false;
            return true;
        });
        return isPlain;
    }

    /**
     * get property of global recurively
     * @param  {String} path path, like 'name.length'
     * @return {Any}         value of the path
     */
    function getGlobal(path) {
        if (!path) return path;

        var g = root;
        each(path.split('.'), function(part) {
            g = (g != null) && g[part];
        });
        return g;
    }

    /**
     * mixin source object to target
     */
    function mixin(target, source) {
        if (source) {
            eachProp(source, function(value, prop) {
                target[prop] = value;
            });
        }
        return target;
    }

    var dotReg = /\/\.\//g;
    var doubleDotReg = /\/[^/]+\/\.\.\//;
    var multiSlashReg = /([^:/])\/+\//g;
    var ignorePartReg = /[?#].*$/;
    var suffixReg = /\.js$/;
    var dirnameReg = /[^?#]*\//;

    function fixPath(path) {
        // /a/b/./c/./d --> /a/b/c/d
        path = path.replace(dotReg, "/");

        // a//b/c --> a/b/c
        // a///b////c --> a/b/c
        path = path.replace(multiSlashReg, "$1/");

        // a/b/c/../../d --> a/b/../d --> a/d
        while (path.match(doubleDotReg)) {
            path = path.replace(doubleDotReg, "/");
        }

        // main/test?foo#bar  -->  main/test
        path = path.replace(ignorePartReg, '');

        if (!suffixReg.test(path)) {
            path += '.js';
        }

        return path;
    }

    function dirname(path) {
        var m = path.match(dirnameReg);
        return m ? m[0] : "./";
    }

    function id2Url(url, baseUrl) {
        url = fixPath(url);
        if (baseUrl) {
            url = fixPath(dirname(baseUrl) + url);
        }
        if (CONFIG.urlArgs) {
            url += CONFIG.urlArgs;
        }
        return url;
    }

    /**
     * load script
     * @param  {String}   url      script path
     * @param  {Function} callback function called after loaded
     */
    function loadScript(url, callback) {
        console.log(url)
        var node = document.createElement('script');
        var supportOnload = 'onload' in node;

        node.charset = CONFIG.charset || 'utf-8';
        node.setAttribute('data-module', url);

        // bind events
        if (supportOnload) {
            node.onload = function() {
                onload();
            };
            node.onerror = function() {
                onload(true);
            };
        } else {
            // https://github.com/requirejs/requirejs/blob/master/require.js#L1925-L1935
            node.onreadystatechange = function() {
                if (/loaded|complete/.test(node.readyState)) {
                    onload();
                }
            }
        }

        node.async = true;
        node.src = url;

        // For some cache cases in IE 6-8, the script executes before the end
        // of the appendChild execution, so to tie an anonymous define
        // call to the module name (which is stored on the node), hold on
        // to a reference to this node, but clear after the DOM insertion.
        currentlyAddingScript = node;

        // ref: #185 & http://dev.jquery.com/ticket/2709
        baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node);

        currentlyAddingScript = null;

        function onload(error) {
            // ensure only execute once
            node.onload = node.onerror = node.onreadystatechange = null;
            // remove node
            head.removeChild(node);
            node = null;
            callback(error);
        }
    }

    function getScripts() {
        return document.getElementsByTagName('script');
    }

    /**
     * get the current running script
     */
    function getCurrentScript() {
        if (currentlyAddingScript) {
            return currentlyAddingScript;
        }

        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        if (document.currentScript) {
            return (interactiveScript = document.currentScript);
        }

        eachReverse(getScripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    /// check deps and make it valid
    /// Where do we need to check:
    /// 1. Constructor
    /// 2. Instance.save(deps)
    var rUrl = /\//; // /^\.{0,2}\//;
    var rAbsoluteUrl = /^\/|^https?:\/\//;
    function getValidDeps(deps, baseUrl) {
        var validDeps = [];
        each(deps, function(d) {
            validDeps.push(genValidUrl(d, dirname(baseUrl)));
        });
        return validDeps;
    }
    function genValidUrl(url, baseUrl) {
        var shim = CONFIG.shim[url], inPaths;
        if (CONFIG.paths[url]) {
            url = CONFIG.paths[url];
            inPaths = true;
        }
        if (rAbsoluteUrl.test(url)) {
            url = id2Url(url); // prevent use baseUrl
        } else if (rUrl.test(url)) {
            url = id2Url(url, inPaths ? CONFIG.baseUrl : baseUrl);
        }
        if (shim && !SHIMMAP[url]) {
            SHIMMAP[url] = shim;
        }
        return url;
    }

    function Module(url, deps) {
        this.url = url;
        this.dependencies = [];                    // dependencies instance list
        this.refs = [];                            // ref/dependents list, when the module loaded, notify them
        this.deps = getValidDeps(deps || [], url); // dependencies (ids) list

        this.exports = {};
        this.status = Module.STATUS.INITIAL;
    }

    // status of module
    var STATUS = Module.STATUS = {
        // init, moudle created
        INITIAL: 0,
        // fetch, when fetch source code
        FETCH: 1,
        // save, save dependencies info
        SAVE: 2,
        // load, parse dependencies info, resolve dependencies
        LOAD: 3,
        // executing moudle, exports still unusable
        EXECUTING: 4,
        // executed, exports is ready to use
        EXECUTED: 5,
        // error, module is invalid
        ERROR: 6
    };

    Module.prototype = {
        constructor: Module,

        load: function() {
            var mod = this;
            var args = [];

            if (mod.status >= STATUS.LOAD) return mod;

            mod.status = STATUS.LOAD;
            // instantiate module's dependencies
            mod.resolve();
            // set every dependency's ref, so dependency can notify the module when dependency loaded
            mod.setDependents();
            // try to resolve circular dependency
            mod.checkCircular();

            // about to execute/load dependencies
            each(mod.dependencies, function(dep) {
                if (dep.status < STATUS.FETCH) {
                    dep.fetch();
                } else if (dep.status === STATUS.SAVE) {
                    dep.load();
                } else if (dep.status >= STATUS.EXECUTED) {
                    args.push(dep.exports);
                }
            });

            mod.status = STATUS.EXECUTING;

            // means load all dependencies
            if (args.length === mod.dependencies.length) {
                args.push(mod.exports);

                mod.makeExports(args);
                mod.status = STATUS.EXECUTED;
                // the current module is ready, notify its dependents (other module depend on the module)
                mod.notifyDependents();
            }
        },

        /**
         * init/instantiate module's dependencies
         */
        resolve: function() {
            var mod = this;
            // we must check deps here.
            each(mod.deps, function(url) {
                var m = Module.get(url);
                mod.dependencies.push(m);
            });
        },

        /**
         * set the module itself as every dependency's dependent
         *
         * push the module self to every dependency's ref list
         */
        setDependents: function() {
            var mod = this;
            each(mod.dependencies, function(dep) {
                var exist = false;
                each(dep.refs, function(ref) {
                    if (ref === mod.url) return (exist = true);
                });
                // if dependency's ref doesn't include the module, include it.
                if (!exist) dep.refs.push(mod.url);
            });
        },

        /**
         * try to resolve circular dependency
         */
        checkCircular: function() {
            var mod = this;
            var isCircular = false, args = [];
            each(mod.dependencies, function(dep) {
                if (dep.status !== STATUS.EXECUTING) return;

                // check circular dependency
                isCircular = false;
                each(dep.dependencies, function(m) {
                    // exist circular dependency
                    if (m.url === mod.url) return (isCircular = true);
                });
                if (!isCircular) return;
                // try to resolve circular dependency
                each(dep.dependencies, function(m) {
                    if (m.url !== mod.url && m.status >= STATUS.EXECUTED) {
                        args.push(m.exports);
                    } else if (m.url === mod.url) {
                        args.push(undefined);
                    }
                });
                if (args.length !== dep.dependencies.length) return;
                // pass exports as the last argument
                args.push(dep.exports);
                try {
                    // in fact, sometimes we just can run factory without certain dependency's exports
                    // so we just make it undefined.
                    dep.exports = isFunction(dep.factory) ? dep.factory.apply(root, args) : dep.factory;
                    dep.status = STATUS.EXECUTED;
                } catch (e) {
                    dep.exports = undefined;
                    dep.status = STATUS.ERROR;
                    makeError("Can't fix circular dependency", mod.url + " --> " + dep.url);
                }
            });
        },

        /**
         * generate exports for the module
         *
         * @param  {Array} args arguments for module's factory (dependencies' exports and the module's own exports)
         */
        makeExports: function(args) {
            var mod = this;
            var result = isFunction(mod.factory) ? mod.factory.apply(root, args) : mod.factory;
            // as we know, the default `mod.exports` is `{}`
            mod.exports = isPlainObject(mod.exports) ? result : mod.exports;

            console.log(mod.exports)
            return
        },

        /**
         * notify the module's dependents after the module is executed
         */
        notifyDependents: function() {
            var mod = this;

            each(mod.refs, function(ref) {
                var args = [];
                ref = Module.get(ref);
                each(ref.dependencies, function(m) {
                    if (m.status >= STATUS.EXECUTED) args.push(m.exports);
                });

                if (args.length === ref.dependencies.length) {
                    args.push(ref.exports);
                    ref.makeExports(args);
                    ref.status = STATUS.EXECUTED;
                    ref.notifyDependents();
                } else {
                    ref.load();
                }
            });
        },

        /**
         * request the module's source code (<script>)
         */
        fetch: function() {
            var mod = this;

            if (mod.status >= STATUS.FETCH) return mod;
            mod.status = STATUS.FETCH;

            loadScript(mod.url, function(error) {
                mod.onload(error);
            });
        },

        /**
         * callback for source code loaded
         * @param  {Boolean} error whether failed when load module
         */
        onload: function(error) {
            var mod = this;
            var shim, shimDeps;

            if (error) {
                mod.exports = undefined;
                mod.status = STATUS.ERROR;
                mod.notifyDependents();
                return mod;
            }

            // not standard amd module
            shim = SHIMMAP[mod.url];
            if (shim) {
                shimDeps = shim.deps || [];
                ///
                ///
                /// should verify shimDeps
                ///
                ///
                mod.save(shimDeps);
                mod.factory = function() {
                    return getGlobal(shim.exports);
                };
                // infact the module source is loaded, next is resolve dependencies and more
                mod.load();
            }

            // anonymous module
            if (anonymousMeta) {
                mod.factory = anonymousMeta.factory;
                mod.save(anonymousMeta.deps);
                mod.load();
                anonymousMeta = null;
            }
        },

        /**
         * save/update deps
         * @param  {Array} deps the dependencies for the module
         */
        save: function(deps) {
            var mod = this;
            if (mod.status >= STATUS.SAVE) return mod;

            mod.status = STATUS.SAVE;
            deps = getValidDeps(deps, this.url);
            each(deps, function(d) {
                var exist = false;
                each(mod.dependencies, function(d2) {
                    if (d === d2.url) return (exist = true);
                });

                if (!exist) {
                    mod.deps.push(d);
                }
            });
        }
    };

    /**
     * retrive module of url, create it if not exists
     *
     * @param  {String} url  url of the module
     * @param  {Array}  deps dependencies list
     * @return {Object}      the created module
     */
    Module.get = function(url, deps) {
        return MODULES[url] || (MODULES[url] = new Module(url, deps));
    };
    // Module.get = function(id, deps) {
    //     return MODULES[id] || (MODULES[id] = new Module(id, deps));
    // };

    /**
     * generate unique id
     */
    Module.guid = function() {
        return 'uid_' + (+new Date()) + (Math.random() + '').slice(-4);
    };

    /**
     * load module
     *
     * @param {Array}    ids      dependencies list
     * @param {Function} callback callback after load all dependencies
     * @param {String}   id       id for the module
     */
    Module.use = function(ids, callback, id) {
        var url = id2Url(id, CONFIG.baseUrl);
        var mod = Module.get(url, isString(ids) ? [ids] : ids);
        mod.id = id;
        mod.factory = callback;
        // after prepare, really load the script/module
        mod.load();
    };

    /**
     * initial amd loader
     *
     * 1. get <script> element of currently executing script, aka script of this file
     * 2. retrive src, data-main attrs
     * 3. init main module
     */
    Module.init = function() {
        var script, scripts, initMod, url;

        if (document.currentScript) {
            script = document.currentScript;
        } else {
            // in normal case, current script should be the last script element of all scripts
            scripts = getScripts();
            script = scripts[scripts.length - 1];
        }

        initMod = script.getAttribute('data-main');
        // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
        url = script.hasAttribute ? script.src : script.getAttribute('src', 4);
        CONFIG.baseUrl = dirname(initMod || url);
        // load Main Module
        if (initMod) {
            // When main module exists, we retrive basedir from it (and set CONFIG.baseUrl), and then
            // `id2Url` will duplicate the basedir. Just fix by pre-remove it.
            Module.use(initMod.replace(new RegExp(CONFIG.baseUrl), '').split(','), noop, Module.guid());
        }
        scripts = script = null;
    };

    /**
     * define an amd module
     * @param  {String}   id      id
     * @param  {Array}    deps    dependencies
     * @param  {Function} factory factory function
     */
    var define = function(id, deps, factory) {
        var currentScript, mod, url;
        // define(factory)
        if (isFunction(id)) {
            factory = id;
            deps = [];
            id = undefined;
        }
        // define(deps, factory)
        else if (isArray(id)) {
            factory = deps;
            deps = id;
            id = undefined;
        }

        if ((currentScript = getCurrentScript())) {
            url = currentScript.getAttribute('data-module');
        }

        if (url) {
            mod = Module.get(url);
            if (!mod.id) {
                mod.id = id || url;
            }
            mod.factory = factory;
            mod.save(deps);
            mod.load();
        } else {
            // anonymouse module, set anonymousMeta for MoudleInstance.onload execute
            anonymousMeta = {
                deps: deps,
                factory: factory
            };
        }
    };

    // amd flag
    define.amd = {};

    /**
     * require
     * implictly create a module
     *
     * @param  {Array}    ids      dependencies
     * @param  {Function} callback callback
     */
    var require = function(ids, callback) {
        console.log(ids, callback)
        if (isString(ids)) {
            makeError('Invalid', 'ids can\'t be string');
        }

        if (isFunction(ids)) {
            callback = ids;
            ids = [];
        }

        Module.use(ids, callback, Module.guid());
    };

    require.config = function(config) {
        if (!config) return;
        // ensure baseUrl end with slash
        if (config.baseUrl) {
            if (config.baseUrl.charAt(config.baseUrl.length - 1) !== '/') config.baseUrl += '/';
        }
        mixin(CONFIG, config);
    };

    // export to root
    root.define = define;
    root.require = require;

    // start amd loader
    Module.init();
})(this);
