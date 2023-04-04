import { convertToJSON, displayAlert } from "./utils";

export class FetchDeals {
  constructor() {
    this.baseURL = "https://www.cheapshark.com/api/1.0/";
  }
  async getStores() {
    let response = await fetch(this.baseURL + "stores");
    if (response.ok) {
      return convertToJSON(response);
    }
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
  async createEmailAlerts(email, wishlist) {
    let options = {
      method: "GET",
      redirect: "follow",
    };
    wishlist.forEach(async (deal) => {
      let response = await fetch(
        this.baseURL +
          `alerts?action=set&email=${email}&gameID=${deal.id}&price=${deal.alertPrice}`,
        options
      );
      let result = await response.text();
      if (result) {
        return result;
      } else {
        displayAlert(await response.text());
        return result;
      }
    });
  }
  async createEmailAlert(email, id, price) {
    let options = {
      method: "GET",
      redirect: "follow",
    };
    let response = await fetch(
      this.baseURL +
        `alerts?action=set&email=${email}&gameID=${id}&price=${price}`,
      options
    );
    let result = await response.text();
    if (result) {
      return result;
    } else {
      displayAlert(await response.text());
      return result;
    }
  }
  async manageEmail(email) {
    let options = {
      method: "GET",
      redirect: "follow",
    };
    let response = await fetch(
      this.baseURL + `alerts?action=manage&email=${email}`,
      options
    );
    if (response.ok) {
      displayAlert("Link sent to email");
      return;
    } else {
      displayAlert(await response.text());
    }
  }
  async deleteEmailAlert(email, id) {
    let options = {
      method: "GET",
      redirect: "follow",
    };
    let response = await fetch(
      this.baseURL + `alerts?action=delete&gameID=${id}&email=${email}`,
      options
    );
    if (response.ok) {
      displayAlert("Alert Deleted");
      return;
    } else {
      displayAlert(await response.text());
    }
  }
}
