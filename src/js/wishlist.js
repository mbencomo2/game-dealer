import { emailModal } from "./emailModal.mjs";
import { mobileNav, qs } from "./utils";
import Wishlist from "./wishlist.mjs";

const list = qs("#wishlist");
const wishlist = new Wishlist(list);
const modal = new emailModal();

pageInit();

async function pageInit() {
  await wishlist.updatePrices();
  await wishlist.renderWishlist();
  mobileNav();
  createListeners();
}

function createListeners() {
  //Handle clicks in the deal listing
  qs("#wishlist").addEventListener("click", (e) => listMan(e.target));
  qs(".close-modal").addEventListener("click", (e) => {
    e.target.closest("div").classList.toggle("e-open");
  });
}

function listMan(target) {
  let action = target.dataset.action;
  if (action == "delete") {
    wishlist.removeFromWishlist(target);
  } else if (action == "email") {
    modal.showEmailModal(target);
  }
}
