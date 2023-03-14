import dealListing from "./fetchDeals.mjs";
import { getURLParams, qs } from "./utils";

const list = qs("#top-deals");
const params = getURLParams("upperPrice=30");
const listing = new dealListing(params, list);
pageInit();

async function pageInit() {
  await listing.getDeals();
  qs(".search").addEventListener("submit", () => {
    let input = document.querySelector("#search-bar");
    if (input.value == "") {
      return;
    } else {
      let form = qs(".search");
      form.submit();
    }
  });
}
