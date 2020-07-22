const express = require("express");
const Document = require("../models/Document");

const router = express.Router();

router.get("/documents", (req, res, next) => {
  res.send("Welcome to REST API with Node.js ");
});

router.get("/documents/:id", (req, res, next) => {
  const document = Document.find((c) => c.id === parseInt(req.params.id));

  if (!book)
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
      );
  res.send(book);
});
router.post("/documents", (req, res, next) => {
  const newDocument = new Document(
    req.body.title,
    req.body.username,
    req.body.body
  );
  req.app.locals.db.collection("documents").insertOne(
    {
      newDocument,
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
    }
  );
});

router.delete("/documents/:id", (req, res, next) => {
  req.app.locals.db.collection("documents").deleteOne(
    {
      _id: req.params.id,
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }

      res.status(200).send(result);
    }
  );
});

router.put("/documents/:id", (req, res, next) => {
  req.app.locals.db.collection("documents").updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        title: req.body.title,
        username: req.body.username,
        body: req.body.body,
      },
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      res.status(200).send(result);
    }
  );
});

module.exports = router;
