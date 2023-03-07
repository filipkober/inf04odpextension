browser.storage.sync.get("clickButtons").then((res) => {
  document.getElementById("clickButtons").checked = res.clickButtons;
});
browser.storage.sync.get("highlightColor").then((res) => {
  if(!res.highlightColor) res.highlightColor = "#008000";
  document.getElementById("highlightColor").value = res.highlightColor;
});
browser.storage.sync.get("delay").then((res) => {
  if(!res.delay) res.delay = 1000;
  document.getElementById("delay").value = res.delay;
});
document.getElementById("clickButtons").addEventListener("change", function () {
   browser.storage.sync.set({ clickButtons: this.checked })
});
document.getElementById("highlightColor").addEventListener("change", function () {
    browser.storage.sync.set({ highlightColor: this.value })
});
document.getElementById("delay").addEventListener("change", function () {
    browser.storage.sync.set({ delay: this.value })
});