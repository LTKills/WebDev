chrome.runtime.onInstalled.addListener(function() {
    load_wordList = function() {
        var rawdata = JSON.parse("./wordList.json");
        return rawdata[0];
    }

    chrome.storage.sync.set({load_wordList()}, function() {
        console.log('Storing words');
    });
});
