const hiddenWrapper = document.querySelectorAll(".hidden-text-wrapper");
for (let i = 0; i < hiddenWrapper.length; i++) {
  hiddenWrapper[i].addEventListener("click", () => {
    hiddenWrapper[i].firstElementChild.classList.add("show");
  });
}
