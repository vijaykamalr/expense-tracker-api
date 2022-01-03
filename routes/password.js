var express = require("express");
const db = require("../config/firebase");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

/* GET home page. */
router.post("/list", async function (req, res, next) {
  const body = req.body;
  let snapshotQuery = db
    .collection("users")
    .doc("etdeJSTEkNIlTdFdEkaK")
    .collection("password");
  // if (body.startDate && body.endDate)
  //   snapshotQuery = snapshotQuery
  //     .where("date", ">=", body.startDate)
  //     .where("date", "<=", body.endDate);
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

router.post("/store", async function (req, res, next) {
  const passwordDb = db
    .collection("users")
    .doc("etdeJSTEkNIlTdFdEkaK")
    .collection("password");
  const addPasswordDb = passwordDb.doc(uuidv4());
  const passwordRes = await addPasswordDb.set(req.body);
  res.json(passwordRes);
});

module.exports = router;
