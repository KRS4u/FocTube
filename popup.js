function getCurrentState(state) {
    switch (state) {
        case 1: return "Normal";
        case 2: return "Focused";
        case 3: return "Super Focused";
    }
}
document.getElementById("superFocus").onclick = function (event) {
    document.getElementById("currentMode").innerHTML = getCurrentState(3);
    chrome.storage.local.set({ youtube_state: 3 });
}
document.getElementById("focused").onclick = function (event) {
    document.getElementById("currentMode").innerHTML = getCurrentState(3);
    chrome.storage.local.set({ youtube_state: 2 });
}
document.getElementById("normal").onclick = function (event) {
    document.getElementById("currentMode").innerHTML = getCurrentState(3);
    chrome.storage.local.set({ youtube_state: 1 });
}

chrome.storage.local.get(['youtube_state'], function (result) {
    const state = result.youtube_state;
    const currentMode = document.getElementById("currentMode");
    currentMode.innerHTML = getCurrentState(state);
    currentMode.style.color = "red";
});