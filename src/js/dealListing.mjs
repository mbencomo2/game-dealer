import { FetchDeals } from "./ExternalAPI";
import { qs, currConverter } from "./utils.mjs";

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
    this.parentElem.innerHTML = "";
    document
      .querySelectorAll(".page-select")
      .forEach((div) => (div.innerHTML = ""));
    this.stores = await this.dealService.getStores();
    let deals = await this.dealService.getDeals(this.params);
    // deals = removeDuplicates(deals.result);
    this.renderDeals(deals, this.stores);
    qs(".loading").style.display = "none";
  }
  /**
   * Fetch deals with different search parameters.
   * @param {string} filterParams
   */
  async getDealsWithFilter(paramStr) {
    qs(".loading").style.display = "block";
    document
      .querySelectorAll(".page-select")
      .forEach((div) => (div.innerHTML = ""));
    this.parentElem.innerHTML = "";
    let deals = await this.dealService.getDeals(paramStr);
    this.renderDeals(deals, this.stores);
    this.renderPageSelect(deals.pages);
    qs("#pageNum").max = deals.pages;
    qs(".loading").style.display = "none";
  }
  /**
   * Display store options in the filter select
   */
  async renderStoreOptions() {
    this.stores = await this.dealService.getStores();
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
    if (deals.result.length > 0) {
      this.parentElem.insertAdjacentHTML("beforeend", dealList.join(""));
    } else {
      this.parentElem.insertAdjacentHTML(
        "beforeend",
        "<li><h2 class='deal-card__title'>No games on sale found.</h2></li>"
      );
    }
    window.scrollTo(0, 0);
  }
  renderPageSelect(numOfPages) {
    let currPage = qs("#pageNum").value;
    document.querySelectorAll(".page-select").forEach((div) => {
      let select = `<select name="pageSelect" data-action="change" title="Select a Page"><option hidden disabled selected>1</option>`;
      for (let i = 0; i < numOfPages; i++) {
        currPage == i
          ? (select += `<option value="${i}" selected>${i + 1}</option>`)
          : (select += `<option value="${i}">${i + 1}</option>`);
      }
      select += "</select>";
      div.innerHTML = `<img 
        src="/images/chevron-left-svgrepo-com.svg" 
        alt="Previous Page" 
        data-action="prev"
        title="Previous Page"
      >
      ${select}
      <img 
        src="/images/chevron-right-svgrepo-com.svg" 
        alt="Next Page" 
        data-action="next"
        title="Next Page"
      >`;
    });
  }
}

function listTemplate(deal, stores) {
  return `<li class="deal-card">
<span class="deal-card__store">
  <img
    src="https://www.cheapshark.com/img/stores/icons/${deal.storeID - 1}.png"
    alt="${stores[deal.storeID - 1].storeName} Icon"
    title="${stores[deal.storeID - 1].storeName}"
  />
</span>
<img
  src="https://placeholder.pics/svg/200x200"
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
    href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" 
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
    <img 
    class="deal-card__email" 
    title="Create Email Alert" 
    data-action="email"
    data-id="${deal.gameID}"
    src="/images/mail-svgrepo-com.svg" alt="Wishlist" 
  />
</div>
</li>`;
}
