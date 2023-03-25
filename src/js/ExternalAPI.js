import { convertToJSON } from "./utils";

export class FetchDeals {
  constructor() {
    this.baseURL = "https://www.cheapshark.com/api/1.0/";
  }
  async getStores() {
    return await fetch(this.baseURL + "stores").then(convertToJSON);
  }
  async getDeals(params) {
    let options = {
      method: "GET",
      redirect: "follow",
    };
    let response = await fetch(this.baseURL + `deals?${params}`, options);
    if (response.ok) {
      let data = await convertToJSON(response),
        pages = response.headers.get("x-total-page-count"),
        search = { result: data, pages: pages };
      return search;
    }
  }
  async getDealbyID(id) {
    let response = await fetch(this.baseURL + `games?id=${id}`);
    if (response.ok) return await convertToJSON(response);
  }
}
