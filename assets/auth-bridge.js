(function () {
  "use strict";
  var config = window.WORSHIP_CONFIG || {};
  var webAppUrl = String(config.googleAppsScriptWebAppUrl || "").trim();
  function setupUrl() { var depth = Math.max(0, window.location.pathname.split("/").filter(Boolean).length - 1); return "../".repeat(depth) + "account-setup.html"; }
  function goToAccount() {
    if (/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec(?:[?#].*)?$/.test(webAppUrl)) {
      window.location.assign(webAppUrl);
    } else {
      window.location.assign(setupUrl());
    }
  }
  document.addEventListener("click", function (event) {
    var node = event.target;
    var control = node && node.closest ? node.closest("a,button") : null;
    if (!control) return;
    var label = (control.innerText || control.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().toLowerCase();
    var href = control.getAttribute("href") || "";
    var isSignIn = /team sign in|admin sign in|team login|admin login/.test(label) || /(^|\/)login(?:\.html)?(?:[?#]|$)/i.test(href);
    if (!isSignIn) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    goToAccount();
  }, true);
  if (/\/login(?:\.html)?\/?$/.test(window.location.pathname)) goToAccount();
})();
