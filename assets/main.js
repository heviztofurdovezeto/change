"use strict";

// Registering Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}

const sumTotal = document.querySelector(".sumTotal");
const incomeBtn = document.querySelector(".income");
const outgoBtn = document.querySelector(".outgo");
const tresauryBtn = document.querySelector(".tresaury");

const multiplier = {
  f1h: 100,
  f2h: 200,
  f5h: 500,
  f1t: 1000,
  f2t: 2000,
  f5t: 5000,
};

let moneyInSafe = {
  f1h: 0,
  f2h: 0,
  f5h: 0,
  f1t: 0,
  f2t: 0,
  f5t: 0,
  get sumTotal() {
    return (
      this.f1h * multiplier.f1h +
      this.f2h * multiplier.f2h +
      this.f5h * multiplier.f5h +
      this.f1t * multiplier.f1t +
      this.f2t * multiplier.f2t +
      this.f5t * multiplier.f5t
    ).toLocaleString("hu-HU", {
      style: "currency",
      currency: "HUF",
    });
  },
};

// read one field from LocalStorage
const readLocalStorge = (field) => {
  if (localStorage.getItem(field)) {
    moneyInSafe[field] = JSON.parse(localStorage.getItem(field));
  }
};

// read LocalStorage loop
for (let key in moneyInSafe) {
  if (Object.hasOwn(moneyInSafe, key)) {
    if (key.includes("f")) {
      let field = key;
      readLocalStorge(field);
    }
  }
}

// addPlaceholder arrow function
const addPlaceholder = (field, value, multiplier) => {
  let localisedMultipliedValue = (value * multiplier).toLocaleString("hu-HU", {
    style: "currency",
    currency: "HUF",
  });
  field.setAttribute(
    "placeholder",
    `${value} db, azaz ${localisedMultipliedValue}`
  );
};

// addPlaceholders loop w/ arrow function
const addPlaceholdersLoopFunction = () => {
  for (let key in moneyInSafe) {
    if (Object.hasOwn(moneyInSafe, key)) {
      if (key.includes("f")) {
        let field = document.getElementById(key);
        addPlaceholder(field, moneyInSafe[key], multiplier[key]);
      }
    }
  }
};

addPlaceholdersLoopFunction();

sumTotal.textContent = `${moneyInSafe.sumTotal}`;

// inOrOut function to handle incoming and outgoing actions, and localStorage.setItem
const inOrOut = (safe, ftresaury, inout) => {
  for (let key in safe) {
    if (Object.hasOwn(safe, key)) {
      if (key.includes("f")) {
        const fieldValue = document.querySelector(`.${key}`).value;
        ftresaury
          ? (safe[key] = +fieldValue)
          : inout
          ? (safe[key] = safe[key] + +fieldValue)
          : (safe[key] = safe[key] - +fieldValue);
        localStorage.setItem(key, JSON.stringify(safe[key]));
      }
    }
  }
  return;
};

const tresaury = () => {
  inOrOut(moneyInSafe, false, true);
  history.go();
};

const cashiers = () => {
  inOrOut(moneyInSafe, false, false);
  history.go();
};

const fullTresaury = () => {
  inOrOut(moneyInSafe, true);
  history.go();
};

incomeBtn.addEventListener("click", tresaury);
outgoBtn.addEventListener("click", cashiers);
tresauryBtn.addEventListener("click", fullTresaury);
