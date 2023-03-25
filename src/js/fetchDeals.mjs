import { FetchDeals } from "./ExternalAPI";
import { qs, currConverter, displayAlert } from "./utils";

export default class dealListing {
  constructor(params, parent) {
    this.dealService = new FetchDeals();
    this.params = params;
    this.parentElem = parent;
    this.stores = [];
  }
  /**
   * Fetch deals without filters
   */
  async getDeals() {
    this.stores = await this.dealService.getStores();
    let deals = await this.dealService.getDeals(this.params);
    this.renderDeals(deals, this.stores);
    qs(".loading").style.display = "none";
  }
  /**
   * Fetch deals with different search parameters.
   * @param {string} filterParams
   */
  async getDealsWithFilter(paramStr) {
    qs(".loading").style.display = "block";
    let deals = await this.dealService.getDeals(paramStr);
    this.renderDeals(deals, this.stores);
    qs(".loading").style.display = "none";
  }
  /**
   * Display store options in the filter select
   */
  async renderStoreOptions() {
    let option = (store) =>
        `<option value="${store.storeID}">${store.storeName}</option>`,
      options = this.stores.map(option);
    qs("#storeID").insertAdjacentHTML("beforeend", options.join(""));
  }
  /**
   * Display the search results or display an alert
   * @param {array} deals
   * @param {array} stores
   */
  renderDeals(deals, stores) {
    let dealList = deals.result.map((deal) => listTemplate(deal, stores));
    this.parentElem.innerHTML = "";
    if (deals.result.length > 0) {
      this.parentElem.insertAdjacentHTML("beforeend", dealList.join(""));
    } else {
      displayAlert("Check your filters if you cannot find a game.");
      this.parentElem.insertAdjacentHTML(
        "beforeend",
        "<li><h2>No games on sale found.</h2></li>"
      );
    }
  }
}

function listTemplate(deal, stores) {
  return `<li class="deal-card">
              <img
              class="deal-card__store-icon"
              src="https://www.cheapshark.com/img/stores/icons/${
                deal.storeID - 1
              }.png"
              alt="${stores[deal.storeID - 1].storeName} Icon"
              title="${stores[deal.storeID - 1].storeName}"
            />
                <img
                  src="https://placeholder.pics/svg/200x300"
                  data-src="${deal.thumb}"
                  alt="${deal.title} Thumbnail"
                  class="deal-card__image"
                />

              <div class="deal-card__details">
              <h2 class="deal-card__title">${deal.title}</h2>
                <div class="deal-card__prices">
                  <p class="deal-card__retail">
                    ${currConverter(deal.normalPrice)}
                  </p>
                  <p class="deal-card__list">
                    ${currConverter(deal.salePrice)}
                  </p>
              </div>
              <div class="deal-card__actions">
                <a
                  class="deal-card__shop" 
                  href="https://www.cheapshark.com/redirect?dealID=${
                    deal.dealID
                  }" 
                  title="Purchase" 
                  target="_blank">
                  <img
                    src="/images/shopping-cart-svgrepo-com.svg"
                    alt="Store Page"
                  />
                </a>
                <img 
                  class="deal-card__wish" 
                  title="Add to Wishlist" 
                  data-action="wishlist" 
                  data-id="${deal.gameID}"
                  src="/images/heart-svgrepo-com.svg" alt="Wishlist" 
                />
              </div>
          </li>`;
}
