let _allowQueryString, _allowExternalLinks, _useWhitelist, _lastTouchTimestamp, _mouseoverTimer, _chromiumMajorVersionInUserAgent = null, _delayOnHover = 65, _preloadedList = new Set;
const DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION = 1111;
function init() {
    if (!document.createElement("link").relList.supports("prefetch"))
        return;
    const e = "instantVaryAccept"in document.body.dataset || "Shopify"in window
      , t = navigator.userAgent.indexOf("Chrome/");
    if (t > -1 && (_chromiumMajorVersionInUserAgent = parseInt(navigator.userAgent.substring(t + 7))),
    e && _chromiumMajorVersionInUserAgent && _chromiumMajorVersionInUserAgent < 110)
        return;
    const n = "instantMousedownShortcut"in document.body.dataset;
    _allowQueryString = "instantAllowQueryString"in document.body.dataset,
    _allowExternalLinks = "instantAllowExternalLinks"in document.body.dataset,
    _useWhitelist = "instantWhitelist"in document.body.dataset;
    const o = {
        capture: !0,
        passive: !0
    };
    let i = !1
      , r = !1
      , s = !1;
    if ("instantIntensity"in document.body.dataset) {
        const e = document.body.dataset.instantIntensity;
        if (e.startsWith("mousedown"))
            i = !0,
            "mousedown-only" === e && (r = !0);
        else if (e.startsWith("viewport")) {
            const t = navigator.connection && navigator.connection.saveData
              , n = navigator.connection && navigator.connection.effectiveType && navigator.connection.effectiveType.includes("2g");
            t || n || ("viewport" === e ? document.documentElement.clientWidth * document.documentElement.clientHeight < 45e4 && (s = !0) : "viewport-all" === e && (s = !0))
        } else {
            const t = parseInt(e);
            isNaN(t) || (_delayOnHover = t)
        }
    }
    if (r || document.addEventListener("touchstart", touchstartListener, o),
    i ? n || document.addEventListener("mousedown", mousedownListener, o) : document.addEventListener("mouseover", mouseoverListener, o),
    n && document.addEventListener("mousedown", mousedownShortcutListener, o),
    s) {
        let e = window.requestIdleCallback;
        e || (e = e => {
            e()
        }
        ),
        e((function() {
            const e = new IntersectionObserver((t => {
                t.forEach((t => {
                    if (t.isIntersecting) {
                        const n = t.target;
                        e.unobserve(n),
                        preload(n.href)
                    }
                }
                ))
            }
            ));
            document.querySelectorAll("a").forEach((t => {
                isPreloadable(t) && e.observe(t)
            }
            ))
        }
        ), {
            timeout: 1500
        })
    }
}
function touchstartListener(e) {
    _lastTouchTimestamp = performance.now();
    const t = e.target.closest("a");
    isPreloadable(t) && preload(t.href, "high")
}
function mouseoverListener(e) {
    if (performance.now() - _lastTouchTimestamp < DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION)
        return;
    if (!("closest"in e.target))
        return;
    const t = e.target.closest("a");
    isPreloadable(t) && (t.addEventListener("mouseout", mouseoutListener, {
        passive: !0
    }),
    _mouseoverTimer = setTimeout(( () => {
        preload(t.href, "high"),
        _mouseoverTimer = void 0
    }
    ), _delayOnHover))
}
function mousedownListener(e) {
    const t = e.target.closest("a");
    isPreloadable(t) && preload(t.href, "high")
}
function mouseoutListener(e) {
    e.relatedTarget && e.target.closest("a") === e.relatedTarget.closest("a") || _mouseoverTimer && (clearTimeout(_mouseoverTimer),
    _mouseoverTimer = void 0)
}
function mousedownShortcutListener(e) {
    if (performance.now() - _lastTouchTimestamp < DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION)
        return;
    const t = e.target.closest("a");
    if (e.which > 1 || e.metaKey || e.ctrlKey)
        return;
    if (!t)
        return;
    t.addEventListener("click", (function(e) {
        1337 !== e.detail && e.preventDefault()
    }
    ), {
        capture: !0,
        passive: !1,
        once: !0
    });
    const n = new MouseEvent("click",{
        view: window,
        bubbles: !0,
        cancelable: !1,
        detail: 1337
    });
    t.dispatchEvent(n)
}
function isPreloadable(e) {
    if (e && e.href && (!_useWhitelist || "instant"in e.dataset)) {
        if (e.origin !== location.origin) {
            if (!(_allowExternalLinks || "instant"in e.dataset || e.host.endsWith("solo.to")) || !_chromiumMajorVersionInUserAgent)
                return
        }
        if (["http:", "https:"].includes(e.protocol) && ("http:" !== e.protocol || "https:" !== location.protocol) && (_allowQueryString || !e.search || "instant"in e.dataset) && (!e.hash && !e.href.endsWith("#") || e.pathname + e.search !== location.pathname + location.search) && !("noInstant"in e.dataset))
            return !0
    }
}
function preload(e, t="auto") {
    if (_preloadedList.has(e))
        return;
    const n = document.createElement("link");
    n.rel = "prefetch",
    n.href = e,
    n.fetchPriority = t,
    n.as = "document",
    document.head.appendChild(n),
    _preloadedList.add(e)
}
init();
