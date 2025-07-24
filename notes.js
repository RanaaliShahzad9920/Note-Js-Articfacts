const fs = require('fs');

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('notes.json'));
  } catch {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
};

exports.addNote = (title, body) => {
  const notes = loadNotes();
  if (!notes.find(note => note.title === title)) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log('Note added');
  } else {
    console.log('Note title taken!');
  }
};

exports.removeNote = (title) => {
  const notes = loadNotes();
  const updatedNotes = notes.filter(note => note.title !== title);
  if (notes.length > updatedNotes.length) {
    saveNotes(updatedNotes);
    console.log('Note removed');
  } else {
    console.log('No note found');
  }
};

exports.listNotes = () => {
  const notes = loadNotes();
  console.log('Your Notes:');
  notes.forEach(note => console.log(`- ${note.title}`));
};

exports.readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(`Title: ${note.title}\nBody: ${note.body}`);
  } else {
    console.log('Note not found');
  }
};
