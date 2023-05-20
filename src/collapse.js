const collapsible = document.querySelector(".collapsible");

collapsible.addEventListener("click", (e) => {
  const activePanel = e.target.closest(".collapsible-panel");
  if (!activePanel) return;
  toggleCollapsible(activePanel);
});

function toggleCollapsible(panelToActivate) {
  const buttons = panelToActivate.parentElement.querySelectorAll("button");
  const contents =
    panelToActivate.parentElement.querySelectorAll(".collapsible-content");

  buttons.forEach((button) => {
    button.setAttribute("aria-expanded", false);
  });

  contents.forEach((content) => {
    content.setAttribute("aria-hidden", true);
  });

  panelToActivate.querySelector("button").setAttribute("aria-expanded", true);

  panelToActivate
    .querySelector(".collapsible-content")
    .setAttribute("aria-hidden", false);
}