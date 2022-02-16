//show secret member password on click (LOL)
const hiddenWrapper = document.querySelectorAll(".hidden-text-wrapper");
for (let i = 0; i < hiddenWrapper.length; i++) {
  hiddenWrapper[i].addEventListener("click", () => {
    hiddenWrapper[i].firstElementChild.classList.add("show");
  });
}

//show pop up box when delete button is clicked
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

//remove reveal class and add show to avatars after animation ends. This prevents reanimation on display type change

function removeAnimationClass(imgNodeList) {
  imgNodeList.forEach((imgNode) => {
    imgNode.addEventListener("animationend", () => {
      imgNode.classList.replace("reveal", "show");
    });
  });
}

bigAvatarImgs = document.querySelectorAll(".avatar.big");
smallAvatarImgs = document.querySelectorAll(".avatar.small");
removeAnimationClass(bigAvatarImgs);
removeAnimationClass(smallAvatarImgs);
