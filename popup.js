const saveButton = document.getElementById('save');
const noteElement = document.getElementById('note');
const tagsElement = document.getElementById('tags');

if (noteElement && tagsElement) {
    const note = noteElement.value;
    const tags = tagsElement.value.split(',').map(tag => tag.trim());

    if (note && tags.length > 0) {
        if (chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get({ notes: [] }, function (data) {
                const notes = data.notes;
                notes.push({ note, tags });
                chrome.storage.sync.set({ notes }, function () {
                    displayNotes();
                    document.getElementById('note').value = '';
                    document.getElementById('tags').value = '';
                });
            });
        } else {
            console.error('Chrome storage API is not available.');
        }
    } else {
        console.error('Note or tags input not found.');
    }
}

function displayNotes() {
    if (chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.get({ notes: [] }, function (data) {
            const notesDiv = document.getElementById('notes');
            notesDiv.innerHTML = '';
            data.notes.forEach((noteObj) => {
                const noteDiv = document.createElement('div');
                noteDiv.textContent = `${noteObj.note} (Tags: ${noteObj.tags.join(', ')})`;
                notesDiv.appendChild(noteDiv);
            });
        });
    } else {
        console.error('Chrome storage API is not available.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (chrome.storage && chrome.storage.sync) {
        displayNotes();
    } else {
        console.error('Chrome storage API is not available.');
    }
});
export function saveNoteToStorage(note, tags, priority) {
    if (note && tags) {
        if (chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get({ notes: [] }, function (data) {
                const notes = data.notes;
                notes.push({ note, tags, priority });
                chrome.storage.sync.set({ notes }, function () {
                    displayNotes();
                    document.getElementById('note').value = '';
                    document.getElementById('tags').value = '';
                    document.getElementById('priority').value = '';
                });
            });
        } else {
            console.error('Chrome storage API is not available.');
        }
    } else {
        console.error('Note or tags input not found.');
    }
}

export function getNotesFromStorage() {
    return new Promise((resolve, reject) => {
        if (chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get({ notes: [] }, function (data) {
                resolve(data.notes);
            });
        } else {
            console.error('Chrome storage API is not available.');
            reject('Chrome storage API is not available.');
        }
    });
}

export function displayNotes(notes) {
    const notesDiv = document.getElementById('notes');
    notesDiv.innerHTML = '';
    notes.forEach((noteObj) => {
        const noteDiv = document.createElement('div');
        noteDiv.textContent = `${noteObj.note} (Tags: ${noteObj.tags.join(', ')}, Priority: ${noteObj.priority})`;
        notesDiv.appendChild(noteDiv);
    });
}