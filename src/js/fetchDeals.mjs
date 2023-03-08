import { Covers, FetchDeals } from "./ExternalAPI";
import { currConverter } from "./utils";

export default class dealListing {
  constructor(parent) {
    this.parentElem = parent;
    this.dealService = new FetchDeals();
    this.coverService = new Covers();
  }
  async init() {
    let deals = await this.dealService.getDeals(
      "pageSize=10&upperPrice=30&onSale=0"
    );
    // let stores = await this.dealService.getStores();
    this.renderDeals(deals);
  }
  renderDeals(deals) {
    let html = deals.map(listTemplate);
    this.parentElem.insertAdjacentHTML("beforeend", html.join(""));
  }
}

function listTemplate(deal) {
  return `<li class='deal-card'>
              <img
                class="deal-card__store-icon"
                src="https://www.cheapshark.com/img/stores/icons/${
                  deal.storeID - 1
                }.png"
                alt="Store Icon"
              />
                <img
                  src="${deal.thumb}"
                  alt="${deal.title} Thumbnail"
                  class="deal-card__image"
                />
              <div class="deal-card__details">
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
