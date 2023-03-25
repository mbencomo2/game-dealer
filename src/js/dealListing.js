import dealListing from "./fetchDeals.mjs";
import { lazyLoader } from "./lazyLoader.mjs";
import {
  qs,
  formDataToJSON,
  formDataToParams,
  animateIcon,
  mobileNav,
  getParam,
} from "./utils";
import Wishlist from "./wishlist.mjs";

const title = getParam("title");
qs("#search-bar").value = title;
const list = qs("#search-deals");
const deals = new dealListing(filterParams(), list);
const wishlist = new Wishlist(list);
pageInit();

async function pageInit() {
  await deals.getDeals();
  mobileNav();
  qs(".search-message").style.display = "none";
  let imagesToLoad = document.querySelectorAll("[data-src]");
  lazyLoader(imagesToLoad);
  deals.renderStoreOptions();
  createListeners();
}

function createListeners() {
  qs(".filters").addEventListener("change", (e) => fetchDeals(e));
  qs("#show-filters").addEventListener("click", toggleFiltersOpen);
  qs(".search").addEventListener("submit", submitForm);
  qs("#search-deals").addEventListener("click", (e) => addToWishlist(e.target));
}
function toggleFiltersOpen() {
  qs(".filters").classList.toggle("f-open");
}

function submitForm() {
  let form = qs("form");
  form.submit();
}

function checkFilters() {
  let data = formDataToJSON(qs(".filters"));
  for (const key in data) {
    if (data[key] == "") {
      delete data[key];
    }
  }
  return data;
}

async function fetchDeals(e) {
  e.preventDefault();
  await deals.getDealsWithFilter(filterParams());
  // Lazy load images
  let imagesToLoad = document.querySelectorAll("img[data-src]");
  lazyLoader(imagesToLoad);
}

function addToWishlist(target) {
  let action = target.dataset.action;
  if (action == "wishlist") {
    wishlist.addToWishlist(target.dataset.id);
    animateIcon(target);
  }
}

function filterParams() {
  let param = getParam("title");
  let filters = formDataToParams(checkFilters());
  return `title=${param}&${filters}`;
}
