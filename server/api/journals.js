const express = require('express');
const app = express.Router();
const { Journal } = require('../db');
const { Op } = require('sequelize');

const { isLoggedIn } = require('./middleware.js');

app.post('/', async (req, res, next) => {
  try {
    const journal = await Journal.create(req.body);
    res.send(journal.toJSON());
  } catch (ex) {
    next(ex);
  }
});

// prefix is /api/journals
app.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const journals = await Journal.findAll({
      where: {
        userId: req.user.id, // Fetch journals associated with the logged-in user
      },
    });
    res.send(journals);
  } catch (ex) {
    next(ex);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    res.send(await Journal.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const journal = await Journal.findByPk(req.params.id);
    await journal.update(req.body);
    res.send(journal);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id', async(req, res, next) => {
  try {
    const journal = await Journal.findByPk(req.params.id)
  
    await journal.destroy()
    res.sendStatus(204);
  } catch(err){
    next(err)
    }
});


module.exports = app;
