const express = require('express');
const app = express.Router();
const { Entry } = require('../db');
const { Op } = require('sequelize');

const { isLoggedIn } = require('./middleware.js');

app.post('/', async (req, res, next)=> {
  try {
    res.send(await Entry.create(req.body))
  }
  catch(ex) {
    next(ex)
  }
});



app.get('/', isLoggedIn, async(req, res, next)=> {
    try{
        res.send(await Entry.findAll())
    }
    catch(ex){
        next(ex)
    }
});




app.get('/:journalId', isLoggedIn, async (req, res, next) => {
    try {
      const entries = await Entry.findAll({
        where: {
          
          journalId: req.params.journalId // Fetch the entries associated with the specific journal
        },
      });
      res.send(entries);
    } catch (ex) {
      next(ex);
    }
  });

app.get('/:id', async (req, res, next) => {
  try {
    res.send(await Entry.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});



app.put('/:journalId', async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.journalId);

    if (!entry) {
      // Entry not found
      return res.status(404).send('Entry not found');
    }

    await entry.update(req.body);
    res.send(entry);
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.id);
    await entry.update(req.body);
    res.send(entry);
  } catch (ex) {
    next(ex);
  }
});
app.delete('/:id', async(req, res, next) => {
    try {
      const entry = await Entry.findByPk(req.params.id)
    
      await entry.destroy()
      res.sendStatus(204);
    } catch(err){
      next(err)
      }
  });

module.exports = app;
