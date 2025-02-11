chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ notes: [] }, () => {
        console.log("Note Taker extension installed and storage initialized.");
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveNote") {
        chrome.storage.sync.get("notes", (data) => {
            const notes = data.notes || [];
            notes.push({ note: message.note, tags: message.tags });
            chrome.storage.sync.set({ notes: notes }, () => {
                sendResponse({ status: "success" });
            });
        });
        return true; // Indicates that the response will be sent asynchronously
    }
});
