import { emailModal } from "./emailModal.mjs";
import { mobileNav, qs } from "./utils";
import Wishlist from "./wishlist.mjs";

const list = qs("#wishlist");
const wishlist = new Wishlist(list);
const modal = new emailModal();

pageInit();

async function pageInit() {
  await wishlist.updatePrices();
  wishlist.renderWishlist();
  mobileNav();
  createListeners();
}

function createListeners() {
  //Handle clicks in the deal listing
  qs("#wishlist").addEventListener("click", (e) => listMan(e.target));
  //Create email alerts when form button is clicked
  qs("#email-button").addEventListener("click", () => modal.createEmailAlert());
  //Close the modal
  qs(".close-modal").addEventListener("click", (e) => {
    e.target.closest("div").classList.toggle("e-open");
  });
}

function listMan(target) {
  let action = target.dataset.action;
  if (action == "email") {
    modal.showEmailModal(target);
  }
}
