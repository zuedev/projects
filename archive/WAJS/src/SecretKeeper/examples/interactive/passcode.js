$(document).ready(() => {
  console.log("WAJS_SecretKeeper Initialising...");

  const target = {
    tag: "h2",
    text: "Purpose",
    unlockCode: "12345"
  };

  (() => {
    let y = getTargetNode(target);

    localStorage.setItem("secret1", btoa(y.innerHTML));

    y.innerHTML = "";

    let input = document.createElement("input"),
      button = document.createElement("button"),
      error = document.createElement("span");

    button.innerHTML = "UNLOCK";
    button.addEventListener("click", () => {
      if (input.value === target.unlockCode) {
        y.innerHTML = atob(localStorage.getItem("secret1"));
      } else {
        error.innerHTML = "WRONG!";
      }
    });

    y.appendChild(input);
    y.appendChild(button);
    y.appendChild(error);
  })();

  function getTargetNode(params) {
    let allTagsArr = document.getElementsByTagName(params.tag),
      x;

    for (let index = 0; index < allTagsArr.length; index++) {
      const element = allTagsArr[index];

      if (element.textContent == params.text) {
        x = element;
      }
    }

    return x.nextElementSibling;
  }

  console.log("WAJS_SecretKeeper Done!");
});
