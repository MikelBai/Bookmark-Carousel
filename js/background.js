chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green but that's not the point of this extension.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                isBookmarked: true,
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});