import { SearchWithFilter } from "./searchWithFilter.mjs";
import { animateIcon, getParam, mobileNav, qs } from "./utils.mjs";

const title = getParam("title");
qs("#search-bar").value = title;
const list = qs("#search-deals");
const form = new SearchWithFilter(list);
pageInit();


async function pageInit() {
  mobileNav();
  await form.deals.renderStoreOptions();
  await form.fetchDeals();
  createListeners();
}

function createListeners() {
  //Handle clicks in the search
  qs("main").addEventListener("click", (e) => listMan(e.target));
  //Listen for changes to the page selection
  qs("main").addEventListener("change", (e) => updatePage(e.target));
  //Toggle filters visibility
  qs("#show-filters").addEventListener("click", toggleFiltersOpen);
  //Perform a new fetch when the filters change
  qs(".filters").addEventListener("change", () => form.fetchDeals());
  //Create email alerts when form button is clicked
  qs("#email-button").addEventListener("click", () => form.modal.createEmailAlert());
  //Close the modal
  qs(".close-modal").addEventListener("click", (e) => {
    e.target.closest("div").classList.toggle("e-open");
  });
}

function listMan(target) {
  let action = target.dataset.action;
  if (action == "wishlist") {
    form.wishlist.addToWishlist(target.dataset.id);
    animateIcon(target);
  } else if (action == "email") {
    form.modal.showEmailModal(target);
  } else if (action == "prev") {
    prevPage();
  } else if (action == "next") {
    nextPage();
  }
}

function updatePage(target) {
  if (target.dataset.action == "change") {
    qs("#pageNum").value = target.value;
    form.fetchDeals();
  }
}

function toggleFiltersOpen() {
  qs(".filters").classList.toggle("f-open");
}

function prevPage() {
  let page = qs("#pageNum").value;
  if (page > 0) {
    qs("#pageNum").value = +page - 1;
    form.fetchDeals();
  }
}

function nextPage() {
  let page = qs("#pageNum").value;
  let max = qs("#pageNum").max;
  if (+page + 1 < +max) {
    qs("#pageNum").value = +page + 1;
    form.fetchDeals();
  }
}
