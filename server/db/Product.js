
const conn = require('./conn');
const { INTEGER, VIRTUAL, STRING, BOOLEAN, ENUM, UUID, UUIDV4, TEXT } = conn.Sequelize;

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: ENUM("shirt", "mug", "healthProduct"),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: TEXT,
  },
  hasImage: {
    type: BOOLEAN,
    defaultValue: false,
  },
  size: {
    type: STRING("Small", "Medium", "Large", "NoSize"),
    defaultValue: "Medium",
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['Small', 'Medium', 'Large', 'NoSize']]
    },
  },
  description: {
    type: TEXT,
  },
  ratings: {
    type: INTEGER,
    defaultValue: 0,
  },
  numOfReviews: {
    type: INTEGER,
    default: 0,
  },
  price: {
    type: INTEGER,
  }
  
  
});

module.exports = Product;
