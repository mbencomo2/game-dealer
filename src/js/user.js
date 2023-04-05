import { User } from "./user.mjs";
import { displayAlert, mobileNav, qs } from "./utils.mjs";

const list = qs(".wishlist-alerts");
const user = new User(list);
pageInit();

function pageInit() {
  user.wishlist.renderAlertPrices();
  qs("#manage-email").value = user.getEmail();
  qs("#register-email").value = user.getEmail();
  mobileNav();
  createListeners();
}

function createListeners() {
  qs("main").addEventListener("click", (e) => user.userMan(e.target));
  qs("#view-alerts").addEventListener("click", () =>
    qs(".wishlist-alerts").classList.toggle("h-open")
  );
  qs(".wishlist-alerts").addEventListener("change", (e) =>
    updateAlert(e.target)
  );
}

function updateAlert(target) {
  if (target.className == "alert-select") {
    let id = target.dataset.id;
    let price = target.value;
    user.wishlist.updateAlertPrice(id, price);
    displayAlert("Alert Price Updated");
  }
}
