//This will handle the context menu creation
// When the extension is installed or upgraded...
// This code does the following:

// Listens for the extension's installation or upgrade and then creates a context menu item with the ID summarizeText, which appears when the user selects text.
// Adds a listener for clicks on the context menu item. When the item is clicked, it sends a message to the content script (content.js) with the action summarize and the selected text.
  
chrome.runtime.onInstalled.addListener(function() {
    // Create a context menu item for text selection
    chrome.contextMenus.create({
        id: "summarizeText", // ID for the context menu item
        title: "Summarize with ChatGPT", // Title displayed in the context menu
        contexts: ["selection"] // Context where the menu item will appear (text selection)
    });
});

// Add a listener for the context menu item click
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "summarizeText") {
        // The user clicked the context menu item, send a message to the content script
        chrome.tabs.sendMessage(tab.id, { action: "summarize", text: info.selectionText });
    }
});
