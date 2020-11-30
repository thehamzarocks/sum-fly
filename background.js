chrome.contextMenus.create({
  id: "sumfly-summarize",
  title: "Summarize",
  contexts: ["selection"],
});
chrome.contextMenus.onClicked.addListener((selection) => {
  chrome.windows.getCurrent((w) => {
    chrome.tabs.query({ active: true, windowId: w.id }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "summarizeContextualSelection", payload: selection.selectionText },
        function (response) {
          console.log(response);
        }
      );
    });
  });
});
