function convertToJSON(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw { name: "servicesError", message: response };
  }
}

export class FetchDeals {
  constructor() {
    this.baseURL = "https://www.cheapshark.com/api/1.0/";
  }
  async getStores() {
    return await fetch(this.baseURL + "stores").then(convertToJSON);
  }
  async getDeals(params) {
    return await fetch(this.baseURL + `deals?${params}`).then(convertToJSON);
  }
  async getDealbyID(id) {
    return await fetch(this.baseURL + `deals?id=${id}`).then(convertToJSON);
  }
  async getGames(title, limit = 60, exact = 0) {
    let fetchURL = encodeURI(
      this.baseURL + `games?title=${title}&limit=${limit}&exact=${exact}`
    );
    return await fetch(fetchURL).then(convertToJSON);
  }
  async getGamebyID(id) {
    let fetchURL = encodeURI(this.baseURL + `games?id=${id}`);
    return await fetch(fetchURL).then(convertToJSON);
  }
}

export class Covers {
  constructor() {
    this.baseURL = "https://www.steamgriddb.com/api/v2/";
    this.key = "7a7c4b4fdffa204184deddecc9136ae4";
  }
  async getGrid(appID) {
    let params = encodeURI(`grids/game/${appID}`);
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.key}`,
      },
    };
    return await fetch(this.baseURL + params, options)
      .then(convertToJSON)
      .then((data) => data.data);
  }
}
