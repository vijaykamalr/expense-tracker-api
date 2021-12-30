var express = require("express");
const db = require("../config/firebase");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

/* GET home page. */
router.post("/transaction", async function (req, res, next) {
  const body = req.body;
  let snapshotQuery = db
    .collection("users")
    .doc("etdeJSTEkNIlTdFdEkaK")
    .collection("expense");
  if (body.startDate && body.endDate)
    snapshotQuery = snapshotQuery
      .where("date", ">=", body.startDate)
      .where("date", "<=", body.endDate);
  const snapshot = await snapshotQuery.get();
  if (snapshot.size === 0) res.json([]);
  else {
    let expenseData = [];
    await snapshot.forEach((doc) => {
      expenseData.push(doc.data());
      return doc.data();
    });
    res.json(expenseData);
  }
});

router.post("/", async function (req, res, next) {
  const expenseDb = db
    .collection("users")
    .doc("etdeJSTEkNIlTdFdEkaK")
    .collection("expense");
  const addExpenseDB = expenseDb.doc(uuidv4());
  const addExpense = await addExpenseDB.set(req.body);
  res.json(addExpense);
});

module.exports = router;
