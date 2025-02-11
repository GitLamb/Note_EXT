// launch.js

// Import functions from popup.js
import { saveNoteToStorage, getNotesFromStorage, displayNotes } from './popup.js';

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the popup
    initializePopup();
});

function initializePopup() {
    // Add event listener to the save button
    document.getElementById('save').addEventListener('click', saveNote);

    // Load existing notes
    loadNotes();
}

export function loadNotes() {
    getNotesFromStorage().then(notes => {
        displayNotes(notes);
    }).catch(error => {
        console.error(error);
    });
}

function saveNote() {
    // Get the note and tags from the input fields
    const note = document.getElementById('note').value;
    const tags = document.getElementById('tags').value;
    const priority = document.getElementById('priority').value;

    // Save the note (this function should be defined in popup.js)
    saveNoteToStorage(note, tags, priority);

    // Clear the input fields
    document.getElementById('note').value = '';
    document.getElementById('tags').value = '';
    document.getElementById('priority').value = '';

    // Reload the notes
    loadNotes();
}