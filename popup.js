document.getElementById('black').onclick = function () {
    async () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { text: "msg" }, function (response) {
                console.log(response);
            });
        });
    }
}
