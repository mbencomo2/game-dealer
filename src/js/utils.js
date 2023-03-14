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

export function getURLParams(searchString) {
  const URLParams = new URLSearchParams(searchString);
  let params = [];
  URLParams.forEach((value, key) => params.push(`${key}=${value}`));
  return params;
}
