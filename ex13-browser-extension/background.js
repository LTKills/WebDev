chrome.runtime.onInstalled.addListener(function() {
    build_wordList = function() {
        let fs = require("fs");
        let text = fs.readFileSync("./wordList.txt");
        return text.split("\n");
    }

    chrome.storage.sync.set({"wordList": build_wordList()}, function() {
        console.log('Storing words');
    });
});
