import { emailModal } from "./emailModal.mjs";
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

class SearchWithFilter {
  constructor(parent) {
    this.deals = new dealListing(this.filterParams(), parent);
    this.wishlist = new Wishlist(list);
    this.modal = new emailModal();
  }

  init() {
    this.renderSearch();
    mobileNav();
    this.deals.renderStoreOptions();
    this.createListeners();
  }

  async renderSearch() {
    await this.deals.getDeals();
    qs(".search-message").style.display = "none";
    let imagesToLoad = document.querySelectorAll("[data-src]");
    lazyLoader(imagesToLoad);
  }

  toggleFiltersOpen() {
    qs(".filters").classList.toggle("f-open");
  }

  checkFilters() {
    let data = formDataToJSON(qs(".filters"));
    for (const key in data) {
      if (data[key] == "") {
        delete data[key];
      }
    }
    return data;
  }

  async fetchDeals(e) {
    e.preventDefault();
    await this.deals.getDealsWithFilter(this.filterParams());
    // Lazy load images
    let imagesToLoad = document.querySelectorAll("img[data-src]");
    lazyLoader(imagesToLoad);
  }

  filterParams() {
    let param = getParam("title");
    let filters = formDataToParams(this.checkFilters());
    return `title=${param}&${filters}`;
  }

  createListeners() {
    //Handle clicks in the search
    qs("#search-deals").addEventListener("click", (e) => this.listMan(e.target));
    //Show the filter form
    qs("#show-filters").addEventListener("click", this.toggleFiltersOpen);
    //Perform a new fetch when the filters change
    qs(".filters").addEventListener("change", (e) => this.fetchDeals(e));
    //Close the modal
    qs(".close-modal").addEventListener("click", (e) => {
      e.target.closest("div").classList.toggle("e-open");
    });
  }

  listMan(target) {
    let action = target.dataset.action;
    if (action == "wishlist") {
      this.wishlist.addToWishlist(target.dataset.id);
      animateIcon(target);
    } else if (action == "email") {
      this.modal.showEmailModal(target);
    }
  }
}

const title = getParam("title");
qs("#search-bar").value = title;
const list = qs("#search-deals");
const form = new SearchWithFilter(list);
form.init()
