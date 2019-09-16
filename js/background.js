// Showing page action if it's a bookmark
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

// Giving that random bookmark
chrome.commands.onCommand.addListener(function(){
    chrome.bookmarks.getTree(function(bookmarks) {
        var carousel = [];
        bookmarks.forEach(function(treenode) {
            carousel = carousel.concat(processNode(treenode));
        });
        var rand_bm = carousel[Math.floor(Math.random() * carousel.length)];
        chrome.tabs.create({
            url: rand_bm
        });
    });
});

function processNode(node) {
    // base case: has a url (aka not a folder)
    if (node.url) {
        return [node.url];
    }
    // recursive step: has children
    var urls = [];
    if (node.children) {
        node.children.forEach(function(childNode) {
            urls = urls.concat(processNode(childNode));
        });
        return urls;
    }
}
