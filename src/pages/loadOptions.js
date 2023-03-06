browser.storage.sync.get("clickButtons").then((res) => {
  document.getElementById("clickButtons").checked = res.clickButtons;
});
document.getElementById("clickButtons").addEventListener("change", function () {
   browser.storage.sync.set({ clickButtons: this.checked })
});
