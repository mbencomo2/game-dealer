import { displayAlert } from "./utils.mjs";

/**
 * Get data from LocalStorage with an Array
 * @param {string} key
 * @returns {array} data
 */
export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Set LocaleStorage by key
 * @param {string} key
 * @param {*} data
 */
export function setStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (StorageError) {
    displayAlert(StorageError.message);
  }
}

/**
 * Add data to an existing key in LocalStorage
 * @param {string} key
 * @param {*} data
 */
export function addToStorage(key, data) {
  let storageData = getStorage(key) || [];
  let newData = [...storageData, data];
  setStorage(key, newData);
}
