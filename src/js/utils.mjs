/**
 * Wrapper for querySelector
 * @param {string} selector
 * @param {document} parent
 * @returns DOM Element
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function renderListWithTemplate(template, data, parent, clear = true) {
  let html = data.map(template);
  if (clear) parent.innerHTML = "";
  parent.insertAdjacentHTML("afterBegin", html.join(""));
}

export function currConverter(value) {
  let currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return currency.format(value);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function formDataToParams(formData) {
  const searchStrings = [];

  for (const key in formData) {
    searchStrings.push(`${key}=${formData[key]}`);
  }

  return searchStrings.join("&");
}

export function displayAlert(message) {
  let body = qs("#alerts");
  let alert = document.createElement("p");
  alert.className = "alert";
  alert.innerHTML = message;
  body.insertAdjacentElement("afterbegin", alert);
  let alerts = document.querySelectorAll(".alert");
  alerts.forEach((p) => setTimeout(() => p.remove(), 1200));
}

export function convertToJSON(response) {
  if (response.ok) {
    return response.json();
  } else {
    displayAlert(
      "Something went wrong searching your deals, please report an issue."
    );
    throw { name: "servicesError", message: response };
  }
}

export function animateIcon(element) {
  element.classList.toggle("animate-icon");
  setTimeout(() => {
    element.classList.toggle("animate-icon");
  }, 1000);
}

export function mobileNav() {
  qs(".burger").addEventListener("click", () => {
    const icons = qs(".menu-content");
    icons.classList.toggle("m-open");
  });
}
