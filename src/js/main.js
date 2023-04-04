import { emailModal } from "./emailModal.mjs";
import dealListing from "./dealListing.mjs";
import { lazyLoader } from "./lazyLoader.mjs";
import { animateIcon, mobileNav, qs } from "./utils";
import Wishlist from "./wishlist.mjs";

const list = qs("#top-deals");
const params = "upperPrice=30&metacritic=80";
const listing = new dealListing(params, list);
const modal = new emailModal();
const wishlist = new Wishlist();

pageInit();

async function pageInit() {
  await listing.getDeals();
  mobileNav();
  let imagesToLoad = document.querySelectorAll("[data-src]");
  lazyLoader(imagesToLoad);
  createListeners();
}

function createListeners() {
  //Handle clicks in the deal listing
  qs("#top-deals").addEventListener("click", (e) => listMan(e.target));
  //Create email alerts when form button is clicked
  qs("#email-button").addEventListener("click", () => modal.createEmailAlert());
  //Close the modal
  qs(".close-modal").addEventListener("click", (e) => {
    e.target.closest("div").classList.toggle("e-open");
  });
}

function listMan(target) {
  let action = target.dataset.action;
  if (action == "wishlist") {
    wishlist.addToWishlist(target.dataset.id);
    animateIcon(target);
  } else if (action == "email") {
    modal.showEmailModal(target);
  }
}
