document.getElementById("button").onclick = () => {
  console.log("起動リクエスト");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "UP" }, response);
  });
};

response = (item) => {
  console.log(item);
};
