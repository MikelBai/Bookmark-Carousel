chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green but that's not the point of this extension.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
        chrome.declarativeContent.onPageChanged.addRules([onBookmarkedRule, defaultRule]);
    });
});
var onBookmarkedRule = {
    conditions: [new chrome.declarativeContent.PageStateMatcher({
        isBookmarked: true,
    })],
    
    actions: [chrome.browserAction.setPopup({popup: "on_bookmarked.html"})]}
var defaultRule = {
    conditions: [new chrome.declarativeContent.PageStateMatcher({
        isBookmarked: false,
    })],
    
    actions: [chrome.browserAction.setPopup({popup: "default_popup.html"})]
}