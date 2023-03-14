import { Covers, FetchDeals } from "./ExternalAPI";
import { qs, currConverter } from "./utils";

export default class dealListing {
  constructor(params, parent) {
    this.params = params;
    this.parentElem = parent;
    this.stores = [];
    this.dealService = new FetchDeals();
    this.coverService = new Covers();
  }
  async getDeals() {
    let paramStr = buildParamStr(this.params);
    let deals = await this.dealService.getDeals(paramStr);
    this.stores = await this.dealService.getStores();
    this.renderDeals(deals, this.stores);
    qs(".loading").style.display = "none";
  }
  renderDeals(deals, stores) {
    let html = deals.map((deal) => listTemplate(deal, stores));
    this.parentElem.insertAdjacentHTML("beforeend", html.join(""));
  }
}

function buildParamStr(params) {
  return `?${params.join("&")}`;
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
                  src="${deal.thumb}"
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
                  <img src="images/heart-svgrepo-com.svg" alt="Wishlist" />
                </a>
                <a class="deal-card__shop" href="https://www.cheapshark.com/redirect?dealID=${
                  deal.dealID
                }" title="Purchase">
                  <img
                    src="images/shopping-cart-svgrepo-com.svg"
                    alt="Store Page"
                  />
                </a>
              </div>
          </li>`;
}
