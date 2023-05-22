const collapsible = document.querySelector(".collapsible");
collapsible.addEventListener("click", (e) => {
  const activePanel = e.target.closest(".collapsible-panel");
  if (!activePanel) return;
  toggleCollapsible(activePanel);
});

function toggleCollapsible(collapsiblePanel) {
  const parent = collapsiblePanel.parentElement.parentElement;
  const buttons = parent.querySelectorAll("button");
  const contents = parent.querySelectorAll(".collapsible-content");

  buttons.forEach((button) => {
    button.setAttribute("aria-expanded", false);
  });

  contents.forEach((content) => {
    content.setAttribute("aria-hidden", true);
  });

  collapsiblePanel.querySelector("button").setAttribute("aria-expanded", true);

  collapsiblePanel.querySelector(".collapsible-content").setAttribute("aria-hidden", false);
}