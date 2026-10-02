(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};

  /* --- мобильное меню --- */
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }

  /* --- подстановка партнёрской ссылки во все кнопки [data-ref] --- */
  var link = (cfg.partnerLink || "").trim();
  var targets = document.querySelectorAll("[data-ref]");
  for (var i = 0; i < targets.length; i++) {
    var a = targets[i];
    if (link) {
      a.setAttribute("href", link);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "nofollow sponsored noopener");
    } else {
      a.setAttribute("href", "go.html");
    }
  }

  /* --- маркировка рекламы рядом с кнопками --- */
  var notes = document.querySelectorAll(".ad-note");
  for (var n = 0; n < notes.length; n++) {
    if (!notes[n].textContent.trim() && cfg.adLabel) notes[n].textContent = cfg.adLabel;
  }

  /* --- подстановка названия, домена и контактов --- */
  function fill(attr, value) {
    if (!value) return;
    var els = document.querySelectorAll("[" + attr + "]");
    for (var k = 0; k < els.length; k++) {
      if (els[k].tagName === "A" && attr === "data-email") {
        els[k].href = "mailto:" + value;
      }
      if (els[k].tagName === "A" && attr === "data-telegram") {
        els[k].href = value;
      }
      els[k].textContent = value;
    }
  }
  fill("data-sitename", cfg.siteName);
  fill("data-domain", cfg.domain);
  fill("data-email", cfg.email);
  if (cfg.telegram) fill("data-telegram", cfg.telegram);

  /* --- текущий год в подвале --- */
  var years = document.querySelectorAll("[data-year]");
  for (var y = 0; y < years.length; y++) {
    years[y].textContent = new Date().getFullYear();
  }

  /* --- форма обратной связи: без бэкенда просто открываем почтовый клиент --- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.querySelector("#name") || {}).value || "";
      var msg = (form.querySelector("#message") || {}).value || "";
      var mail = cfg.email || "";
      window.location.href =
        "mailto:" + mail +
        "?subject=" + encodeURIComponent("Сообщение с сайта от " + name) +
        "&body=" + encodeURIComponent(msg);
    });
  }
})();
