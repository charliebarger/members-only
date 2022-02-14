const hiddenWrapper = document.querySelectorAll(".hidden-text-wrapper");
for (let i = 0; i < hiddenWrapper.length; i++) {
  hiddenWrapper[i].addEventListener("click", () => {
    hiddenWrapper[i].firstElementChild.classList.add("show");
  });
}

//delete function
deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirm) {
      e.preventDefault();
    }
  });
});
