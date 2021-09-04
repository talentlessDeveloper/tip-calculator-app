console.log("Hello frontend!");
const people = document.querySelector(".people");
const error = document.querySelector(".error");
const reset = document.querySelector(".reset");

let inputBill = document.querySelector(".bill__input");
let inputCustom = document.querySelector("#custom");
let inputPerson = document.querySelector("#people");
const tipPerPersonEl = document.querySelector(".tip__amount");
const totalPerPersonEl = document.querySelector(".tip__total");

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

inputCustom.onchange = function () {
  customValue = inputCustom.value;

  tipPercentage = customValue / 100;

  totalTip = billValue * tipPercentage;

  totalPerPerson = ((+billValue + totalTip) / personValue).toFixed(2);

  tipPerPerson = (totalTip / personValue).toFixed(2);

  tipPerPersonEl.innerHTML = `$${tipPerPerson}`;

  totalPerPersonEl.innerHTML = `$${totalPerPerson}`;

  controlReset();
};

inputPerson.addEventListener("input", (e) => {
  const value = e.target.value;

  if (value <= "0") {
    people.classList.add("show");
    error.classList.remove("hide");
  } else {
    people.classList.remove("show");
    error.classList.add("hide");
  }
});

const tipBtn = document.querySelectorAll(".btn-tip");

tipBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // input error
    if (personValue == "") {
      people.classList.add("show");
      error.classList.remove("hide");

      tipPerPersonEl.innerHTML = "";

      totalPerPersonEl.innerHTML = "";
    } // calculate tip
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

reset.addEventListener("click", () => {
  inputBill.value = "150";
  inputCustom.value = "";
  inputPerson.value = "5";

  tipPerPersonEl.innerHTML = "$0.00";

  totalPerPersonEl.innerHTML = "$0.00";

  controlReset();
});

window.addEventListener("load", (event) => {
  inputBill.value = "150";
  inputCustom.value = "";
  inputPerson.value = "5";

  tipPerPersonEl.innerHTML = "$0.00";

  totalPerPersonEl.innerHTML = "$0.00";
});
