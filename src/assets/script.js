import domtoimage from "dom-to-image";

const backgroundPickers = document.querySelectorAll(".js-backgroundPicker");
const backgroundPickerHex = document.querySelector(".js-backgroundPickerHex");
const iconPickerHex = document.querySelector(".js-iconPickerHex");
const colorPickers = document.querySelectorAll(".js-colorPicker");
const iconPickers = document.querySelectorAll(".js-icon");
const preview = document.querySelector(".preview");
const btnSave = document.querySelector(".js-save");
const txtSearch = document.querySelector(".js-iconSearch");
let counter = 0;
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

btnSave.addEventListener("click", function (e) {
  e.preventDefault();

  domtoimage.toPng(preview).then(function (dataUrl) {
    var link = document.createElement("a");
    link.download = `icon-${counter}.png`;
    link.href = dataUrl;
    link.click();
  });

  counter++;
});

txtSearch.addEventListener("keyup", function (e) {
  const searchValue = e.target.value;
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
  iconDetails.background = color;
  setIcon();
}

function changeIconColor(color) {
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
  preview.innerHTML = selectedIcon;

  // Set the background
  preview.style.backgroundColor = iconDetails.background;

  // Set the foreground
  const previewSvg = document.querySelector(".preview svg");
  previewSvg.style.fill = iconDetails.iconColor;
}
