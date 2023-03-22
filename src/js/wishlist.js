import { qs } from "./utils";
import Wishlist from "./wishlist.mjs";

const list = qs("#wishlist");
const wishlist = new Wishlist(list);

pageInit();

async function pageInit() {
  await wishlist.updatePrices();
  wishlist.renderWishlist();
}
