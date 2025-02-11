// debug.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('Document loaded');
    initializeDebug();
});

function initializeDebug() {
    // Log initialization
    console.log('Initializing debug...');

    // Add event listeners for debugging
    document.getElementById('save').addEventListener('click', function () {
        console.log('Save button clicked');
    });

    document.getElementById('search').addEventListener('input', function () {
        console.log('Search input changed');
    });

    document.getElementById('export').addEventListener('click', function () {
        console.log('Export button clicked');
    });

    document.getElementById('import').addEventListener('change', function () {
        console.log('Import file selected');
    });

    // Log any errors
    window.addEventListener('error', function (event) {
        console.error('Error occurred: ', event.message);
    });

    // Log notes loading
    chrome.storage.sync.get({ notes: [] }, function (data) {
        console.log('Notes loaded: ', data.notes);
    });
}// JavaScript source code
