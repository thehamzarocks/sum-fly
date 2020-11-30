const summaryHeaders = "Sum-Fly Summary:\n==================\n\n";

summarizeSelection = (selection) => {
  if (!selection) {
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://5q71jg.deta.dev/summary", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        alert("Summarized!");
        console.log(summaryHeaders + JSON.parse(xhr.response).summary);
      } else {
        alert("Unable to summarize!");
      }
    }
  };
  xhr.send(JSON.stringify({ text: selection }));
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case "summarizeContextualSelection":
      summarizeSelection(request.payload);
      break;
  }
});
