import { displayAlert } from "./utils";

/**
 * Get data from sessionStorage with an Array
 * @param {string} key
 * @returns {array} data
 */
export function getStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

/**
 * Set LocaleStorage by key
 * @param {string} key
 * @param {*} data
 */
export function setStorage(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (StorageError) {
    displayAlert(StorageError.message);
  }
}

/**
 * Add data to an existing key in sessionStorage
 * @param {string} key
 * @param {*} data
 */
export function addToStorage(key, data) {
  let storageData = getStorage(key) || [];
  let newData = [...storageData, data];
  setStorage(key, newData);
}
