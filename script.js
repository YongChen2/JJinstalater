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
    form.reset();
    if (status) {
      status.value = "Děkujeme. Ozveme se vám co nejdříve.";
    }
  });
});
