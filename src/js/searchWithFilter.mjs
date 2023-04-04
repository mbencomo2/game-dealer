import { emailModal } from "./emailModal.mjs";
import dealListing from "./dealListing.mjs";
import { lazyLoader } from "./lazyLoader.mjs";
import {
  qs,
  formDataToJSON,
  formDataToParams,
  getParam
} from "./utils.mjs";
import Wishlist from "./wishlist.mjs";

export class SearchWithFilter {
  constructor(parent) {
    this.deals = new dealListing(this.filterParams(), parent);
    this.wishlist = new Wishlist();
    this.modal = new emailModal();
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

  async fetchDeals() {
    await this.deals.getDealsWithFilter(this.filterParams());
    // Lazy load images
    let imagesToLoad = document.querySelectorAll("img[data-src]");
    lazyLoader(imagesToLoad);
  }

  filterParams() {
    let param = getParam("title");
    let filters = formDataToParams(this.checkFilters());
    return `title=${param}&pageSize=30&${filters}`;
  }
}
