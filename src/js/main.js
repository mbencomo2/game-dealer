import dealListing from "./fetchDeals.mjs";
import { lazyLoader } from "./lazyLoader.mjs";
import { animateIcon, qs } from "./utils";
import Wishlist from "./wishlist.mjs";

const list = qs("#top-deals");
const params = "?upperPrice=30";
const listing = new dealListing(params, list);
const wishlist = new Wishlist(list);
pageInit();

async function pageInit() {
  await listing.getDeals();
  let imagesToLoad = document.querySelectorAll("[data-src]");
  lazyLoader(imagesToLoad);
  qs(".search").addEventListener("submit", () => {
    let form = qs(".search");
    form.submit();
  });
  qs("#main-deals").addEventListener("click", (e) => addToWishlist(e));
}

function addToWishlist(e) {
  const target = e.target;
  let action = target.dataset.action;
  if (action == "wishlist") {
    wishlist.addToWishlist(target.dataset.id);
    animateIcon("#wishlist-icon");
  }
}
