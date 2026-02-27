// Function triggered when client clicks [Verify]
function verifyCheck() {
  alert("Verified!");
}

let checkboxWindow = document.getElementById("fvrc-checkbox-window");
let checkboxBtn = document.getElementById("fvrc-checkbox");
let checkboxBtnSpinner = document.getElementById("fvrc-spinner");

function addCheckListeners() {
  if (checkboxBtn) {
    checkboxBtn.addEventListener("click", function (event) {
      event.preventDefault();
      runClickedCheckboxEffects();
    });
  }
}
addCheckListeners();

function runClickedCheckboxEffects() {
  hideCheckCheckbox();
  setTimeout(function () {
    showCheckLoading();
  }, 500);
  setTimeout(function () {
    document.querySelector(".checkmark").classList.add("checked");
    checkboxBtnSpinner.style.visibility = "hidden";
  }, 2000);
}

function showCheckCheckbox() {
  checkboxBtn.style.width = "100%";
  checkboxBtn.style.height = "100%";
  checkboxBtn.style.borderRadius = "2px";
  checkboxBtn.style.margin = "21px 0 0 12px";
  checkboxBtn.style.opacity = "1";
}

function hideCheckCheckbox() {
  checkboxBtn.style.width = "4px";
  checkboxBtn.style.height = "4px";
  checkboxBtn.style.borderRadius = "50%";
  checkboxBtn.style.marginLeft = "25px";
  checkboxBtn.style.marginTop = "33px";
  checkboxBtn.style.opacity = "0";
}

function showCheckLoading() {
  checkboxBtnSpinner.style.visibility = "visible";
  checkboxBtnSpinner.style.opacity = "1";
}

function hideCheckLoading() {
  checkboxBtnSpinner.style.visibility = "hidden";
  checkboxBtnSpinner.style.opacity = "0";
}
