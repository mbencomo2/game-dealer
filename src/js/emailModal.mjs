import { FetchDeals } from "./ExternalAPI.js";
import { getStorage, setStorage } from "./localStorage.mjs";
import { displayAlert, formDataToJSON, qs } from "./utils.mjs";
import Wishlist from "./wishlist.mjs";

export class emailModal {
  constructor() {
    this.api = new FetchDeals();
    this.wishlist = new Wishlist();
  }
  showEmailModal(target) {
    let gameId = target.dataset.id;
    let modal = qs(".email-modal");
    modal.classList.toggle("e-open");
    qs("#gameId").value = gameId;
    qs("#email").value = getStorage("alertEmail");
    qs("#email-button").dataset.id = gameId;
  }

  createEmailAlert() {
    let email = qs("#email").value;
    if (qs("#email").value != "") {
      setStorage("alertEmail", email);
      let formData = formDataToJSON(qs(".alert-form"));
      this.api.createEmailAlert(
        formData.email,
        formData.gameID,
        formData.price
      );
      this.wishlist.addToWishlist(formData.gameID, formData.price);
      displayAlert("Email Alert Created");
      qs(".email-modal").classList.toggle("e-open");
    } else {
      displayAlert("Invalid Email");
    }
  }
}
