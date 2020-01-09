/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

// Simulate delay on requests
server.use(function(req, res, next) {
  setTimeout(next, 1000);
});

// Add createdAt to all POST Requests
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.post("/subjects/", function(req, res, next) {
  const error = validateSubject(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.subjectName); // Generate a slug for new Subject.
    next();
  }
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function validateSubject(subject) {
  if (!subject.subjectName) return "Subject is required.";
  return "";
}
