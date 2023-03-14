import dealListing from "./fetchDeals.mjs";
import { qs } from "./utils";

const list = qs("#top-deals");
const params = "?upperPrice=30";
const listing = new dealListing(params, list);
pageInit();

async function pageInit() {
  await listing.getDeals();
  qs(".search").addEventListener("submit", () => {
    let form = qs(".search");
    form.submit();
  });
}
