import { FetchDeals } from "./ExternalAPI";
import { currConverter, qs } from "./utils";
import { getStorage, addToStorage, setStorage } from "./localStorage.mjs";

export default class Wishlist {
  /**
   * Wishlist creates LocalStorage data and uses it to
   * keep track of the user's saved games
   * @param {Element} listElem
   */
  constructor(listElem) {
    this.key = "wishlist";
    this.parent = listElem;
    this.dealService = new FetchDeals();
  }
  /**
   * Add a deal to localStorage
   * @param {string} gameId
   * @returns void
   */
  async addToWishlist(gameId) {
    //If storage is empty create an empty array
    let wishlist = getStorage(this.key) ?? [];
    let inList = wishlist.find((item) => item.id == gameId);
    //If the item already exists in the wishlist return
    if (inList) {
      return;
    } else {
      let deal = await this.dealService.getDealbyID(gameId);
      let currentDate = new Date();
      let addToList = {
        ...deal.info,
        id: gameId,
        topDeal: deal.deals[0],
        dateAdded: currentDate,
      };
      addToStorage(this.key, addToList);
    }
  }
  /**
   * Remove a deal from localstorage
   * @param {string} gameId
   */
  removeFromWishlist(target) {
    let action = target.dataset.action;
    if (action == "delete") {
      let wishlist = getStorage(this.key);
      //Find the deal in the wishlist
      let deal = wishlist.find((item) => item.id == target.dataset.id);
      wishlist.splice(wishlist.indexOf(deal), 1);
      setStorage(this.key, wishlist);
      this.renderWishlist();
    }
  }
  /**
   * Updates each wishlist item's top deal
   */
  async updatePrices() {
    let wishlist = getStorage(this.key) ?? [];
    if (wishlist.length > 0) {
      wishlist.forEach(async (deal) => {
        let newDeal = await this.dealService.getDealbyID(deal.id);
        deal.topDeal = newDeal.deals[0];
      });
    }
  }
  /**
   * Display the wishlist
   */
  async renderWishlist() {
    this.parent.innerHTML = "";
    let wishlist = getStorage(this.key) ?? [];
    //If the wishlist is display a message
    if (wishlist.length > 0) {
      let stores = await this.dealService.getStores();
      wishlist.forEach(async (deal) => {
        let li = document.createElement("li");
        li.innerHTML = listTemplate(deal, stores);
        li.classList = "deal-card";
        li.addEventListener("click", (e) => this.removeFromWishlist(e.target));
        this.parent.insertAdjacentElement("beforeEnd", li);
      });
    } else {
      qs("main").insertAdjacentHTML(
        "beforeend",
        "<h2>You have no games in your wishlist.</h2><a id='search-text' href='/dealListing/?title='>Search your favorite games<img src='/images/search-svgrepo-com.svg' alt='Search'></a>"
      );
    }
    //Remove the loading icon
    qs(".loading").style.display = "none";
  }
}

/**
 * Generate HTML for a wishlist item
 * @param {*} deal deal details
 * @param {array} stores stores supported
 * @returns {string} HTML formatted list item
 */
function listTemplate(deal, stores) {
  let date = new Date(deal.dateAdded);
  let topDeal = deal.topDeal;
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return `<img
    class="deal-card__store-icon"
    src="https://www.cheapshark.com/img/stores/icons/${topDeal.storeID - 1}.png"
    alt="${stores[topDeal.storeID - 1].storeName} Icon"
    title="${stores[topDeal.storeID - 1].storeName}"
  />
  <img
    class="deal-card__image"
    src="${deal.thumb}"
    alt="${deal.title} Thumbnail"
  />
  <div class="deal-card__details">
  <h2 class="deal-card__title">${deal.title}</h2>
    <div class="deal-card__prices">
      <p class="deal-card__retail">
        ${currConverter(topDeal.retailPrice)}
      </p>
      <p class="deal-card__list">
        ${currConverter(topDeal.price)}
      </p>
    </div>
    <p class="deal-card__date">
      Added:
      ${date.toLocaleDateString(undefined, options)}
    </p>
    <div class="deal-card__actions">
      <a
        class="deal-card__shop" 
        href="https://www.cheapshark.com/redirect?dealID=${topDeal.dealID}" 
        title="Purchase" 
        target="_blank">
        <img
          src="/images/shopping-cart-svgrepo-com.svg"
          alt="Store Page"
        />
      </a>
      <img 
        class="deal-card__wish" 
        title="Remove from Wishlist" 
        data-action="delete" 
        data-id="${deal.id}"
        src="/images/close-svgrepo-com.svg" 
        alt="Remove" />
    </div>
  </div>`;
}
