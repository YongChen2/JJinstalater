const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const forms = document.querySelectorAll(".quote-form");

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
