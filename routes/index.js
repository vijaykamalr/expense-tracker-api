var express = require("express");
const db = require("../config/firebase");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

/* GET home page. */
router.post("/transaction", async function (req, res, next) {
  console.log(req.body)
  const snapshot = await db.collection("IncomeExpense").get();
  if (snapshot.size === 0) res.json([]);
  else {
    let expenseData = [];
    await snapshot.forEach((doc) => {
      expenseData.push(doc.data());
      return doc.data();
    });
    console.log(expenseData);
    res.json(expenseData);
  }
  //   const expenseDb = db.collection('IncomeExpense')
  //   const getExpenses = await expenseDb.get();

  // const observer = await getExpenses.forEach(snapshot => {
  //   console.log(`changes: ${JSON.stringify(snapshot.data())}`);
  //   return snapshot.data()
  //  }, err => {
  //   console.log(`Error: ${err}`);
  //  });
  //   console.log(observer);
});

router.post("/", async function (req, res, next) {
  const expenseDb = db.collection("IncomeExpense");
  console.log(req.body);
  const addExpenseDB = expenseDb.doc(uuidv4());
  const addExpense = await addExpenseDB.set(req.body);
  console.log(addExpense);
  res.json(addExpense);
});

module.exports = router;
