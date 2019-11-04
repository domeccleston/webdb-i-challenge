const express = require("express");
const db = require("./data/dbConfig");
const server = require("./server");
const accountsRouter = express.Router();

accountsRouter.get("/", (req, res) => {
    db('accounts')
     .then(accounts => {
         res.status(200).json(accounts);
     })
     .catch(err => {
         res.status(500).json(err);
     })
});

accountsRouter.get("/:id", async (req, res) => {
    try {
        const response = await db('accounts').where({ id: req.params.id });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

accountsRouter.post("/", async (req, res) => {
    try {
        const newAccount = await db('accounts').insert({ name: req.body.name, budget: req.body.budget });
        res.status(200).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: "Error processing request: " + error})
    }
})

accountsRouter.put("/:id", async (req, res) => {
    try {
        const updatedAccount = await db('accounts').where({ id: req.params.id }).update(req.body);
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({ message: "Error processing request: " + error});
    }
})

accountsRouter.delete("/:id", async (req, res) => {
    try {
        const deleted = await db('accounts').where({ id: req.params.id }).del();
        res.status(200).json({ message: "Deleted " + deleted + " accounts." })
    } catch (error) {
        res.status(500).json({ message: "Error processing request: " + error})
    }
})

module.exports = accountsRouter;
