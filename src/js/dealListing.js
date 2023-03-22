import dealListing from "./fetchDeals.mjs";
import { lazyLoader } from "./lazyLoader.mjs";
import {
  getParam,
  qs,
  formDataToJSON,
  formDataToParams,
  animateIcon,
} from "./utils";
import Wishlist from "./wishlist.mjs";

const param = getParam("title");
const list = qs("#search-deals");
const filterParams = formDataToParams(checkFilters());
const deals = new dealListing(`title=${param}&${filterParams}`, list);
const wishlist = new Wishlist(list);
qs("#search-bar").value = param;
pageInit();

async function pageInit() {
  await deals.getDeals();
  qs(".search-message").style.display = "none";
  let imagesToLoad = document.querySelectorAll("[data-src]");
  lazyLoader(imagesToLoad);
  deals.renderStoreOptions();
  qs(".filters").addEventListener("change", (e) => fetchDeals(e));
  qs(".search").addEventListener("submit", submitForm);
  qs("#show-filters").addEventListener("click", toggleFiltersOpen);
  qs("#search-deals").addEventListener("click", (e) => addToWishlist(e));
}

function submitForm() {
  let form = qs(".search");
  form.submit();
}

function toggleFiltersOpen() {
  qs(".filters").classList.toggle("open");
}

function checkFilters() {
  let data = formDataToJSON(qs("#filters"));
  for (const key in data) {
    if (data[key] == "") {
      delete data[key];
    }
  }
  return data;
}

async function fetchDeals(e) {
  e.preventDefault();
  let filters = formDataToParams(checkFilters());
  await deals.getDealsWithFilter(`title=${param}&${filters}`);
  // Lazy load images
  let imagesToLoad = document.querySelectorAll("img[data-src]");
  lazyLoader(imagesToLoad);
}

function addToWishlist(e) {
  const target = e.target;
  let action = target.dataset.action;
  if (action == "wishlist") {
    wishlist.addToWishlist(target.dataset.id);
    animateIcon("#wishlist-icon");
  }
}
