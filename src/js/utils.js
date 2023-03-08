/**
 * Wrapper for querySelector
 * @param {string} selector
 * @param {document} parent
 * @returns DOM Element
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
