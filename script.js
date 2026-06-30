const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const forms = document.querySelectorAll(".quote-form");
const cookieSettingsButtons = document.querySelectorAll(".cookie-settings");
const consentKey = "jjInstalaterCookieConsent";

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
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

showCookieBanner();
