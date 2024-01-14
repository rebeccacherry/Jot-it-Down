
const conn = require('./conn');
const {  STRING,  UUID, UUIDV4,  } = conn.Sequelize;

const Prompt = conn.define('prompt', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
 
  
  
});

module.exports = Prompt;
