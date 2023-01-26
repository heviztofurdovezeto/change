if (!self.define) {
    let e, s = {};
    const i = (i, n) => (i = new URL(i + ".js", n).href, s[i] || new Promise((s => {
        if ("document" in self) {
            const e = document.createElement("script");
            e.src = i, e.onload = s, document.head.appendChild(e)
        } else e = i, importScripts(i), s()
    })).then((() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e
    })));
    self.define = (n, c) => {
        const l = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (s[l]) return;
        let t = {};
        const a = e => i(e, l),
            r = {
                module: {
                    uri: l
                },
                exports: t,
                require: a
            };
        s[l] = Promise.all(n.map((e => r[e] || a(e)))).then((e => (c(...e), t)))
    }
}
define(["./workbox-ed4be2ce"], (function (e) {
    "use strict";
    self.skipWaiting(), e.clientsClaim(), e.precacheAndRoute([{
        url: "/offline",
        revision: "8.4.8-2e553a5"
    }, {
        url: "/static/153.35cdf9091ce82b114cf3.css",
        revision: null
    }, {
        url: "/static/221cc02b8b5ba9fa17dc.wasm",
        revision: null
    }, {
        url: "/static/653.6e679a10c3aae1d7e364.css",
        revision: null
    }, {
        url: "/static/961.3f4e47b936fafeb707f0.css",
        revision: null
    }, {
        url: "/static/assets/manifest.webmanifest",
        revision: "8a2871d5568c5a6ddbf423180f6c7834"
    }, {
        url: "/static/bundle.12c3e6eae849d8929ee2.js",
        revision: null
    }, {
        url: "/static/bundle.5050a89411bde707373d.css",
        revision: null
    }, {
        url: "/static/codeSample.71a346149bcd3cc2b586.chunk.js",
        revision: null
    }, {
        url: "/static/quickref.076490f90739ed2b167a.chunk.js",
        revision: null
    }, {
        url: "/static/regexDebugger.8919a1c8209ed1894004.chunk.js",
        revision: null
    }, {
        url: "/static/vendors-bundle.a5ed8a01e4f887acaeb7.js",
        revision: null
    }, {
        url: "/static/vendors-codeSample.67fca36bc676c58ef8e5.chunk.js",
        revision: null
    }, {
        url: "/static/vendors-quickref.d9c9f6ab1098dcb7569d.chunk.js",
        revision: null
    }], {}), e.cleanupOutdatedCaches(), e.registerRoute((({
        url: e
    }) => /buysellads\.(?:com|net)|sentry\.io|analytics\.regex101\.com\/api|doubleclick\.net/.test(e)), new e.NetworkOnly, "GET"), e.registerRoute((({
        url: e
    }) => /fonts\.(?:googleapis|gstatic)\.com|plausible\.js/.test(e)), new e.StaleWhileRevalidate({
        cacheName: "staleRevalidate",
        plugins: []
    }), "GET"), e.registerRoute(/\.(?:png|jpg|jpeg|svg|ico)$/, new e.CacheFirst({
        cacheName: "images",
        plugins: [new e.ExpirationPlugin({
            maxAgeSeconds: 2592e3
        })]
    }), "GET"), e.registerRoute(/\.json$/, new e.CacheFirst({
        cacheName: "jsonFiles",
        plugins: []
    }), "GET"), e.registerRoute(/\.(?:js|dll|wasm|css)$/, new e.CacheFirst({
        cacheName: "misc",
        plugins: []
    }), "GET"), e.registerRoute((({
        url: e,
        request: s
    }) => "navigate" === s.mode && /(?:regex101\.com|localhost(?::\d+)?)\/(?:library|quiz|settings|account|r\/|$)/.test(e)), new e.NetworkOnly({
        plugins: [new e.PrecacheFallbackPlugin({
            fallbackURL: "/offline"
        })]
    }), "GET"), e.registerRoute(/.*/, new e.NetworkOnly, "GET")
}));
