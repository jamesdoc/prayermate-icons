import domtoimage from "dom-to-image";

const backgroundPickers = document.querySelectorAll(".js-backgroundPicker");
const backgroundPickerHex = document.querySelector(".js-backgroundPickerHex");
const iconPickerHex = document.querySelector(".js-iconPickerHex");
const colorPickers = document.querySelectorAll(".js-colorPicker");
const iconPickers = document.querySelectorAll(".js-icon");

// Preview elements
const previewContainer = document.querySelector(".preview");

// Final output elements
const iconContainer = document.querySelector(".js-iconOutput");

const btnSave = document.querySelector(".js-save");
const txtSearch = document.querySelector(".js-iconSearch");

const iconDetails = {
  icon: "fa-duotone-lemon",
  background: "transparent",
  iconColor: "#ffcd74",
};

setIcon();

// change the background color
backgroundPickers.forEach((backgroundButton) => {
  backgroundButton.addEventListener("click", function (e) {
    e.preventDefault();
    changeBackgroundColor(backgroundButton.dataset.color);
  });
});

backgroundPickerHex.addEventListener(
  "input",
  function (e) {
    changeBackgroundColor(`${e.target.value}`);
  },
  false,
);

iconPickerHex.addEventListener(
  "input",
  function (e) {
    changeIconColor(`${e.target.value}`);
  },
  false,
);

// Change the icon color
colorPickers.forEach((colorButton) => {
  colorButton.addEventListener("click", function (e) {
    e.preventDefault();
    changeIconColor(colorButton.dataset.color);
  });
});

// Change the icon (picture)
iconPickers.forEach((iconBtn) => {
  iconBtn.addEventListener("click", function (e) {
    e.preventDefault();
    changeIcon(iconBtn.dataset.icon);
  });
});

let counter = 0;
btnSave.addEventListener("click", function (e) {
  e.preventDefault();
  domtoimage.toPng(iconContainer).then(function (dataUrl) {
    var link = document.createElement("a");
    link.download = `icon-${counter}.png`;
    link.href = dataUrl;
    link.click();
  });
  counter++;
});

txtSearch.addEventListener("keyup", function (e) {
  const searchValue = e.target.value.toLowerCase();
  console.log(searchValue);

  iconPickers.forEach((iconBtn) => {
    if (!iconBtn.dataset.name.includes(searchValue)) {
      iconBtn.style.display = "none";
    } else {
      iconBtn.style.display = "block";
    }
  });
});

function changeBackgroundColor(color) {
  var text = document.querySelector(".js-bgCol");
  text.value = color.toLowerCase();
  iconDetails.background = color;
  setIcon();
}

function changeIconColor(color) {
  var text = document.querySelector(".js-iconCol");
  text.value = color.toLowerCase();
  iconDetails.iconColor = color;
  setIcon();
}

function changeIcon(icon) {
  iconDetails.icon = icon;
  setIcon();
}

function setIcon() {
  // Set the icon
  const selectedIcon = document
    .getElementById(iconDetails.icon)
    .outerHTML.replaceAll("symbol", "svg");
  iconContainer.innerHTML = selectedIcon;
  previewContainer.innerHTML = selectedIcon;

  // Set the background
  previewContainer.style.backgroundColor =
    iconDetails.background === "transparent"
      ? "var(--iconCircleDefault)"
      : iconDetails.background;
  iconContainer.style.backgroundColor = iconDetails.background;

  // Set the foreground
  const iconPreview = previewContainer.querySelector("svg");
  const iconOutput = iconContainer.querySelector("svg");

  iconPreview.style.fill = iconDetails.iconColor;
  iconOutput.style.fill = iconDetails.iconColor;
}
