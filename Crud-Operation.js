const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// In-memory "database"
let notes = [
  { id: 1, title: "Shopping List", content: "Milk, Eggs, Bread, Butter", createdAt: "2025-09-01T10:15:00Z", updatedAt: "2025-09-01T10:15:00Z" },
  { id: 2, title: "Meeting Notes", content: "Discuss project deadlines and assign tasks", createdAt: "2025-09-02T08:30:00Z", updatedAt: "2025-09-02T08:30:00Z" },
  { id: 3, title: "Ideas", content: "Start a blog about backend development", createdAt: "2025-09-03T14:45:00Z", updatedAt: "2025-09-04T09:10:00Z" },
  { id: 4, title: "Workout Plan", content: "Monday: Chest, Tuesday: Back, Wednesday: Legs", createdAt: "2025-09-05T07:20:00Z", updatedAt: "2025-09-05T07:20:00Z" },
  { id: 5, title: "Books to Read", content: "Clean Code, Pragmatic Programmer, Design Patterns", createdAt: "2025-09-06T11:00:00Z", updatedAt: "2025-09-06T11:00:00Z" },
  { id: 6, title: "Travel Packing List", content: "Passport, Tickets, Clothes, Charger, Camera", createdAt: "2025-09-06T12:30:00Z", updatedAt: "2025-09-06T12:30:00Z" },
  { id: 7, title: "Recipes", content: "Pasta with tomato sauce, Grilled chicken, Pancakes", createdAt: "2025-09-07T09:15:00Z", updatedAt: "2025-09-07T09:15:00Z" },
  { id: 8, title: "Birthday Gift Ideas", content: "Watch, Headphones, Backpack", createdAt: "2025-09-07T10:40:00Z", updatedAt: "2025-09-07T10:40:00Z" },
  { id: 9, title: "Project Tasks", content: "Set up backend API, Connect frontend, Write tests", createdAt: "2025-09-07T11:50:00Z", updatedAt: "2025-09-07T11:50:00Z" },
  { id: 10, title: "Learning Goals", content: "Master Node.js, Learn Docker, Explore GraphQL", createdAt: "2025-09-07T12:10:00Z", updatedAt: "2025-09-07T12:10:00Z" }
];

// ✅ CREATE - Add a new note
app.post("/data", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Both 'title' and 'content' are required." });

  const newNote = {
    id: notes.length + 1,
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// ✅ READ - Get all notes
app.get("/data", (req, res) => {
  res.json(notes);
});

// ✅ READ by ID
app.get("/data/:id", (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

// ✅ UPDATE - Update a note by ID
app.put("/data/:id", (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  note.updatedAt = new Date().toISOString();

  res.json(note);
});

// ✅ DELETE - Delete a note by ID
app.delete("/data/:id", (req, res) => {
  const noteIndex = notes.findIndex(n => n.id == req.params.id);
  if (noteIndex === -1) return res.status(404).json({ error: "Note not found" });

  notes.splice(noteIndex, 1);
  res.json({ message: "Note deleted" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
