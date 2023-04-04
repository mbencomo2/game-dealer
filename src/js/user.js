import { FetchDeals } from "./ExternalAPI";
import { getStorage, setStorage } from "./localStorage.mjs";
import { displayAlert, mobileNav, qs } from "./utils";
import Wishlist from "./wishlist.mjs";

const api = new FetchDeals();
const alertList = qs(".wishlist-alerts");
const wishlist = new Wishlist(alertList);
pageInit();

async function pageInit() {
  wishlist.renderAlertPrices();
  qs("#manage-email").value = getEmail();
  qs("#register-email").value = getEmail();
  mobileNav();
  createListeners();
}

function createListeners() {
  qs("#sign-up").addEventListener("click", signUp);
  qs("#manage-alerts").addEventListener("click", sendLink);
  qs("#view-alerts").addEventListener("click", () =>
    qs(".wishlist-alerts").classList.toggle("h-open")
  );
  document
    .querySelectorAll(".alert-select")
    .forEach((select) =>
      select.addEventListener("change", (e) => updateAlertPrice(e.target))
    );
  document
    .querySelectorAll(".delete-alert")
    .forEach((span) =>
      span.addEventListener("click", (e) => deleteAlert(e.target))
    );
}

function saveEmail(email) {
  setStorage("alertEmail", email);
}

function getEmail() {
  return getStorage("alertEmail") ?? "";
}

function signUp() {
  let email = qs("#register-email").value;
  if (email != "") {
    saveEmail(email);
    qs("#manage-email").value = getEmail();
    let result = api.createEmailAlerts(email, getStorage("wishlist"));
    if (result) {
      displayAlert("Alerts created successfully!");
    } else {
      displayAlert("Something went wrong, try again later.");
    }
  } else {
    displayAlert("Invalid Email")
  }
}

function sendLink() {
  let email = qs("#manage-email").value;
  if (email != "") {
    api.manageEmail(email);
  } else {
    displayAlert("Invalid Email");
  }
}

function deleteAlert(target) {
  wishlist.removeFromWishlist(target, false);
  let email = getEmail();
  if (email != "") {
    api.deleteEmailAlert(email, target.dataset.id);
  }
  target.closest("li").remove();
}

function updateAlertPrice(target) {
  wishlist.updateAlertPrice(target);
  displayAlert("Alert Price Updated")
}
