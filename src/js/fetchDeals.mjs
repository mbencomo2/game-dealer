import { FetchDeals } from "./ExternalAPI";
import { qs, currConverter, displayAlert } from "./utils";

export default class dealListing {
  constructor(params, parent) {
    this.dealService = new FetchDeals();
    this.params = params;
    this.parentElem = parent;
    this.stores = [];
  }
  async getDeals() {
    this.stores = await this.dealService.getStores();
    let deals = await this.dealService.getDeals(this.params);
    this.renderDeals(deals, this.stores);
    qs(".loading").style.display = "none";
  }
  async getDealsWithFilter(filterParams) {
    let search = qs("#search-bar").value;
    search = search != "" ? `&title=${search.replace(" ", "+")}` : "";
    let paramStr = `?${filterParams}${search}`;
    let deals = await this.dealService.getDeals(paramStr);
    this.renderDeals(deals, this.stores);
    qs(".loading").style.display = "none";
    qs(".search-message").style.display = "none";
  }
  async renderStoreOptions() {
    let option = (store) =>
      `<option value="${store.storeID}">${store.storeName}</option>`;
    let options = this.stores.map(option);
    qs("#storeID").insertAdjacentHTML("beforeend", options.join(""));
  }
  renderDeals(deals, stores) {
    let html = deals.map((deal) => listTemplate(deal, stores));
    this.parentElem.innerHTML = "";
    if (html.length > 0) {
      this.parentElem.insertAdjacentHTML("beforeend", html.join(""));
    } else {
      displayAlert("There are no games that meet your criteria.");
    }
  }
}

function listTemplate(deal, stores) {
  let storeName = stores.find(
    (store) => deal.storeID == store.storeID
  ).storeName;
  return `<li class='deal-card'>
              <img
                class="deal-card__store-icon"
                src="https://www.cheapshark.com/img/stores/icons/${
                  deal.storeID - 1
                }.png"
                alt="${storeName} Icon"
                title="${storeName}"
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
                  <p class="deal-card__retail">${currConverter(
                    deal.normalPrice
                  )}</p>
                  <p class="deal-card__list">${currConverter(
                    deal.salePrice
                  )}</p>
              </div>
              <div class="deal-card__actions" data-id="${deal.dealID}">
                <a class="deal-card__wish" href="#" title="Add to Wishlist">
                  <img src="/images/heart-svgrepo-com.svg" alt="Wishlist" />
                </a>
                <a class="deal-card__shop" href="https://www.cheapshark.com/redirect?dealID=${
                  deal.dealID
                }" title="Purchase" target="_blank">
                  <img
                    src="/images/shopping-cart-svgrepo-com.svg"
                    alt="Store Page"
                  />
                </a>
              </div>
          </li>`;
}
