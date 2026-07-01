const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const forms = document.querySelectorAll(".quote-form");
const cookieSettingsButtons = document.querySelectorAll(".cookie-settings");
const consentKey = "jjInstalaterCookieConsent";
const phoneHref = "tel:+420000000000";
const emailPhotoHref = "mailto:info@jjinstalater.cz?subject=Fotka%20z%C3%A1vady%20-%20JJ%20instalat%C3%A9r";
const serviceMenuItems = [
  ["Havarijní servis", "havarijni-servis.html"],
  ["Montáže a opravy", "montaze-a-opravy.html"],
  ["Drobné opravy odpadů", "cisteni-odpadu-kanalizaci.html"],
  ["Montáž sanity", "montaze-a-opravy.html#sanita"],
  ["Připojení spotřebičů", "montaze-a-opravy.html#spotrebice"],
  ["Pomocné instalační práce", "sluzby.html#pomocne-prace"],
];

function enhanceNavigation() {
  if (!nav || nav.dataset.enhanced === "true") return;
  const servicesLink = Array.from(nav.querySelectorAll("a")).find((link) => link.textContent?.trim() === "Služby");
  if (!servicesLink) return;

  const dropdown = document.createElement("div");
  dropdown.className = "nav-dropdown";
  dropdown.innerHTML = `
    <button class="nav-dropdown-toggle" type="button" aria-expanded="false">
      Služby
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="nav-dropdown-menu">
      ${serviceMenuItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
    </div>
  `;
  servicesLink.replaceWith(dropdown);

  if (!Array.from(nav.querySelectorAll("a")).some((link) => link.textContent?.trim() === "Pohotovost")) {
    const emergencyLink = document.createElement("a");
    emergencyLink.className = "nav-emergency";
    emergencyLink.href = "havarijni-servis.html";
    emergencyLink.textContent = "Pohotovost";
    dropdown.after(emergencyLink);
  }

  const toggle = dropdown.querySelector(".nav-dropdown-toggle");
  toggle?.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });

  nav.dataset.enhanced = "true";
}

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    nav.querySelector(".nav-dropdown")?.classList.remove("is-open");
    nav.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const data = new FormData(form);
    const lines = [
      `Jméno: ${data.get("name") || ""}`,
      `Telefon: ${data.get("phone") || ""}`,
      `E-mail: ${data.get("email") || ""}`,
      `Typ služby: ${data.get("service") || ""}`,
      `Město: ${data.get("city") || ""}`,
      `Urgentnost: ${data.get("urgency") || ""}`,
      "",
      `Popis: ${data.get("message") || ""}`,
    ];
    const mailto = `mailto:info@jjinstalater.cz?subject=${encodeURIComponent("Poptávka z webu JJ instalatér")}&body=${encodeURIComponent(lines.join("\n"))}`;
    form.reset();
    if (status) {
      status.innerHTML = `Děkujeme. Poptávka je připravená. <a href="${mailto}">Klikněte pro odeslání e-mailem</a>.`;
    }
  });
});

function loadAnalytics() {
  document.documentElement.dataset.analytics = "allowed";
}

function setCookieConsent(value) {
  localStorage.setItem(consentKey, value);
  document.querySelector(".cookie-banner")?.remove();
  if (value === "analytics") {
    loadAnalytics();
  }
}

function showCookieBanner(force = false) {
  if (!force && localStorage.getItem(consentKey)) {
    if (localStorage.getItem(consentKey) === "analytics") {
      loadAnalytics();
    }
    return;
  }

  document.querySelector(".cookie-banner")?.remove();
  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("aria-label", "Nastavení cookies");
  banner.innerHTML = `
    <div>
      <strong>Cookies a soukromí</strong>
      <p>Používáme nezbytné ukládání pro fungování webu. Analytiku spustíme jen po vašem souhlasu.</p>
      <a href="cookies.html">Více o cookies</a>
    </div>
    <div class="cookie-actions">
      <button type="button" data-cookie-choice="rejected">Odmítnout</button>
      <button type="button" data-cookie-choice="necessary">Pouze nezbytné</button>
      <button type="button" data-cookie-choice="analytics">Povolit analytiku</button>
    </div>
  `;
  document.body.appendChild(banner);
  banner.querySelectorAll("[data-cookie-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      setCookieConsent(button.dataset.cookieChoice);
    });
  });
}

cookieSettingsButtons.forEach((button) => {
  button.addEventListener("click", () => showCookieBanner(true));
});

function mountMobileActionBar() {
  if (document.querySelector(".mobile-action-bar")) return;
  const bar = document.createElement("nav");
  bar.className = "mobile-action-bar";
  bar.setAttribute("aria-label", "Rychlý kontakt");
  bar.innerHTML = `
    <a href="${phoneHref}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7"/></svg>
      <span>Volat</span>
    </a>
    <a href="kontakt.html">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="m4 7 8 6 8-6"/></svg>
      <span>Poptávka</span>
    </a>
    <a href="${emailPhotoHref}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/></svg>
      <span>Fotka</span>
    </a>
  `;
  document.body.appendChild(bar);
}

function mountRevealAnimations() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const revealItems = document.querySelectorAll([
    ".section-heading",
    ".service-grid article",
    ".emergency-grid a",
    ".pricing-panel",
    ".photo-quote",
    ".process-grid > div",
    ".proof-grid > *",
    ".area-panel",
    ".quote-form",
    ".faq-grid details",
    ".service-detail-grid article",
    ".service-info-grid article",
    ".work-card",
    ".review-card",
  ].join(","));

  const revealVisibleItems = () => {
    revealItems.forEach((item) => {
      if (item.classList.contains("is-visible")) return;
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        item.classList.add("is-visible");
      }
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 45}ms`;
    observer.observe(item);
  });

  revealVisibleItems();
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
  window.addEventListener("resize", revealVisibleItems);
  window.setTimeout(() => {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }, 2200);
}

enhanceNavigation();
mountMobileActionBar();
mountRevealAnimations();
showCookieBanner();
