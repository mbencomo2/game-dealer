import dealListing from "./fetchDeals.mjs";
import { qs } from "./utils";

const list = qs("#top-deals");
const listing = new dealListing(list);

pageInit();

async function pageInit() {
  listing.init();
}
