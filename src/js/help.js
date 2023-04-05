import { mobileNav } from "./utils";
import { displayAlert, qs } from "./utils.mjs";

pageInit();

function pageInit() {
  mobileNav();
  qs("form").addEventListener("submit", sendMessage);
}

function sendMessage() {
  displayAlert("Message Sent");
  setTimeout(() => (window.location.href = "/"), 1200);
}
