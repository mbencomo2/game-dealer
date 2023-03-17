import dealListing from "./fetchDeals.mjs";
import { lazyLoader } from "./lazyLoader.mjs";
import { getParam, qs, formDataToJSON, formDataToParams } from "./utils";

const param = getParam("title");
const list = qs("#search-deals");
const deals = new dealListing(`?title=${param}`, list);
qs("#search-bar").value = param;
pageInit();

async function pageInit() {
  await deals.getDeals();
  let imagesToLoad = document.querySelectorAll("[data-src]");
  lazyLoader(imagesToLoad);
  deals.renderStoreOptions();
  qs(".filters").addEventListener("change", (e) => fetchDeals(e));
  qs(".search").addEventListener("submit", () => {
    let form = qs(".search");
    form.submit();
  });
  qs("#show-filters").addEventListener("click", () => {
    qs(".filters").classList.toggle("open");
  });
}

function checkFilters() {
  let data = formDataToJSON(qs("#filters"));
  for (const key in data) {
    if (data[key] == "") {
      delete data[key];
    }
  }
  return data;
}

async function fetchDeals(e) {
  e.preventDefault();
  let input = document.querySelector("#search-bar");
  let filterData = checkFilters();
  let filterParams = formDataToParams(filterData);
  await deals.getDealsWithFilter(filterParams);
  input.disabled = false;
  let imagesToLoad = document.querySelectorAll("img[data-src]");
  lazyLoader(imagesToLoad);
}
