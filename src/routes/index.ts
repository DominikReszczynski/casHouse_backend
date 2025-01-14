import express from "express"; // Importuj express
const router = express.Router(); // Utwórz router
const test = require("./../method/test");
const expanse = require("./../method/expanses");
const dashboard = require("./../method/dashboard");
// Definiuj trasę API
router.get("/hello", test.test);

// ! ########################################
// ! ############ - EXPANSES - ##############
// ! ########################################

router.post("/expanse/add", expanse.addExpanse);
router.post("/expanse/getAnyExpansesByUserId", expanse.getAllExpansesByAuthor);
router.post(
  "/expanse/getAllExpansesByAuthorExcludingCurrentMonth",
  expanse.getExpansesGroupedByMonth
);
router.post(
  "/expanse/getExpansesByAuthorForCurrentMonth",
  expanse.getExpansesByAuthorForCurrentMonth
);
router.post(
    "/expanse/getExpensesGroupedByCategory",
    expanse.getExpensesGroupedByCategory
  );
router.delete("/expanse/removeExpanse", expanse.removeExpanse);

router.post("/dashboard/chat", dashboard.chatWithCohere);
module.exports = router;
