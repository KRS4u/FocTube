chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "activatePopup") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.pageAction.show(tabs[0].id);
        })
    }
});

function sendPageMessage(details) {
    if (!details)
        return;
    let url = details.url;
    if (details.url === 'https://www.youtube.com/') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "mainPage" });
        });
    }
    else if (url.startsWith('https://www.youtube.com/watch')) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "videoPage" });
        });
    }
    else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "others" });
        });
    }
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ youtube_state: 1 });
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    sendPageMessage(details);
}, { url: [{ urlMatches: 'https://www.youtube.com/*' }] });

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
    sendPageMessage(details);
}, { url: [{ urlMatches: 'https://www.youtube.com/*' }] });

function storageChanger(items, areaName) {
    const { youtube_state } = items;
    if (youtube_state && youtube_state.newValue) {
        chrome.tabs.query({ active: true, currentWindow: true, url: ['https://www.youtube.com/*'] }, function (tabs) {
            sendPageMessage(tabs[0]);
        })
    }
}
chrome.storage.onChanged.addListener(storageChanger);