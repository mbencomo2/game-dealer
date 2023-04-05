import { FetchDeals } from "./ExternalAPI";
import { getStorage, setStorage } from "./localStorage.mjs";
import { displayAlert, qs } from "./utils";
import Wishlist from "./wishlist.mjs";

export class User {
  constructor(parent) {
    this.api = new FetchDeals();
    this.wishlist = new Wishlist(parent);
  }

  saveEmail(email) {
    setStorage("alertEmail", email);
  }

  getEmail() {
    return getStorage("alertEmail") ?? "";
  }

  userMan(target) {
    let action = target.dataset.action;
    if (action == "delete") {
      this.deleteAlert(target);
    } else if (action == "signUp") {
      this.signUp();
    } else if (action == "manage") {
      this.manageEmail();
    }
  }

  manageEmail() {
    let email = qs("#manage-email").value;
    if (email != "") {
      this.api.manageEmail(email);
    } else {
      displayAlert("Invalid Email");
    }
  }

  deleteAlert(target) {
    this.wishlist.removeFromWishlist(target, false);
    target.closest("li").remove();
  }

  signUp() {
    let email = qs("#register-email").value;
    if (email != "") {
      this.saveEmail(email);
      qs("#manage-email").value = this.getEmail();
      let result = this.api.createEmailAlerts(email, getStorage("wishlist"));
      if (result) {
        displayAlert("Alerts created successfully!");
      } else {
        displayAlert("Something went wrong, try again later.");
      }
    } else {
      displayAlert("Invalid Email");
    }
  }
}
