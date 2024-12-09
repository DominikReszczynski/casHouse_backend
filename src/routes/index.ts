import express from "express"; // Importuj express
const router = express.Router(); // Utwórz router
const test = require("./../method/test");
const expanse = require("./../method/expanses");
// Definiuj trasę API
router.get("/hello", test.test);

// ! ########################################
// ! ############ - EXPANSES - ##############
// ! ########################################

router.post("/expanse/add", expanse.addExpanse);

module.exports = router;
