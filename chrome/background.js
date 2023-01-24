var message = function(tabId) {
        chrome.tabs.sendMessage( tabId, {
            message: 'url-change'
        })
    };

chrome.history.onVisited.addListener(
    function (historyItem) {
        console.log("historyItem", historyItem)
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            message(tabs[0].id)
        });
    }
)