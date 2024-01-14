const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;



const Journal = conn.define('journal', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    userId: {
          type: UUID,
          allowNull: false
    },
    title: {
          type: STRING,
          allowNull: false,
          defaultValue: 'My Journal'
    },
    description: {
      type: TEXT,
      required: true,
    },
    imageUrl: {
      type: TEXT,
      allowNull: true,
  }
    
});

module.exports = Journal;