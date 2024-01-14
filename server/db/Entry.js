const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, DATE, DATEONLY, INTEGER  } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;
const dayjs = require('dayjs');


const Entry = conn.define('entry', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
   
    subject: {
          type: STRING,
    },
    description: {
      type: TEXT,
      required: true,
    },
    imageUrl: {
      type: TEXT,
      allowNull: true,
  },
  createdAt: {
    type: DATE,
    defaultValue: conn.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  date: {
    type: DATEONLY, 
    allowNull: false,
    defaultValue: conn.Sequelize.literal('CURRENT_DATE'),
  },
  
  time: {
    type: STRING, 
    allowNull: false,
    defaultValue: conn.Sequelize.literal('CURRENT_TIME'),
  },
 
});



module.exports = Entry;