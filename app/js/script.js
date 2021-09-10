const people = document.querySelector(".people");
const error = document.querySelector(".error");
const reset = document.querySelector(".reset");

let inputBill = document.querySelector(".bill__input");
let inputCustom = document.querySelector("#custom");
let inputPerson = document.querySelector("#people");
const tipPerPersonEl = document.querySelector(".tip__amount");
const totalPerPersonEl = document.querySelector(".tip__total");
const tipBtn = document.querySelectorAll(".btn-tip");

let billValue = inputBill.value;
let customValue = inputCustom.value;
let personValue = inputPerson.value;

let tipPercentage;
let totalTip;
let totalPerPerson;
let tipPerPerson;

inputBill.onchange = function () {
  billValue = inputBill.value;
};

inputPerson.onchange = function () {
  personValue = inputPerson.value;
};

//Custom Percentage
inputCustom.addEventListener("input", () => {
  if (personValue == "" || personValue == "0") {
    inputError();
  } else {
    customValue = inputCustom.value;

    tipPercentage = customValue / 100;

    totalTip = billValue * tipPercentage;

    totalPerPerson = ((+billValue + totalTip) / personValue).toFixed(2);

    tipPerPerson = (totalTip / personValue).toFixed(2);

    tipPerPersonEl.innerHTML = `$${tipPerPerson}`;

    totalPerPersonEl.innerHTML = `$${totalPerPerson}`;

    controlReset();
  }
});

//Error Notification
inputPerson.addEventListener("input", (e) => {
  const value = e.target.value;

  if (value == "0") {
    people.classList.add("show");
    error.classList.remove("hide");
  } else {
    people.classList.remove("show");
    error.classList.add("hide");
  }
});

tipBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // input error
    if (personValue == "0" || personValue == "") {
      inputError();
    }
    // calculate tip
    else {
      tipPercentage = e.currentTarget.getAttribute("data-tip") / 100;
      totalTip = tipPercentage * billValue;

      totalPerPerson = ((+billValue + totalTip) / personValue).toFixed(2);

      tipPerPerson = (totalTip / personValue).toFixed(2);

      tipPerPersonEl.innerHTML = `$${tipPerPerson}`;

      totalPerPersonEl.innerHTML = `$${totalPerPerson}`;

      controlReset();
    }
  });
});

//Input error
function inputError() {
  people.classList.add("show");
  error.classList.remove("hide");

  tipPerPersonEl.innerHTML = "";

  totalPerPersonEl.innerHTML = "";

  console.log("error");
}

//Control reset
function controlReset() {
  let tipPerPersonValue = tipPerPersonEl.textContent.split("");

  tipPerPersonValue.splice(0, 1);

  tipPerPersonValue = tipPerPersonValue.join("");
  if (tipPerPersonValue <= 0) {
    return (reset.disabled = true);
  } else {
    return (reset.disabled = false);
  }
}

controlReset();

//Set reset
reset.addEventListener("click", () => {
  inputBill.value = "";
  inputCustom.value = "";
  inputPerson.value = "";

  tipPerPersonEl.innerHTML = "$0.00";

  totalPerPersonEl.innerHTML = "$0.00";

  controlReset();
});

//Reset on reload
window.addEventListener("load", (event) => {
  inputBill.value = "";
  inputCustom.value = "";
  inputPerson.value = "";

  tipPerPersonEl.innerHTML = "$0.00";

  totalPerPersonEl.innerHTML = "$0.00";
});
