import express from "express"; // Importuj express
const router = express.Router(); // Utwórz router
const test = require("./../method/test");
// Definiuj trasę API
router.get("/api/hello", test.test);

// Eksportuj router
module.exports = router; // Upewnij się, że eksportujesz router
