const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;
const axios = require('axios');
const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  firstName: {
    type: STRING,
   
  },
  lastName: {
    type: STRING,
    
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true,
    },
    unique: true
  },
  address: {
    type: STRING
  },
  phone: {
    type: STRING,
    validate: {
        validator: function(v) {
            return phoneValidationRegex.test(v); 
        },
    }
},
  password: {
    type: STRING,
    validate: {
      notEmpty: true
    }
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  avatar: {
    type: TEXT,
    get: function(){
      const prefix = 'data:image/png;base64,';
      const data = this.getDataValue('avatar');
      if(!data){
        return data;
      }
      if(data.startsWith(prefix)){
        return data;
      }
      return `${prefix}${data}`;
    }
  }
});

User.prototype.createOrder = async function(){
  const cart = await this.getCart();
  cart.isCart = false;
  await cart.save();
  return cart;

}

User.prototype.getCart = async function(){
  let cart = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true
    }
  });
  if(!cart){
    cart = await conn.models.order.create({
      userId: this.id
    });
  }
  cart = await conn.models.order.findByPk(
    cart.id,
    {
      include: [
        {
          model: conn.models.lineItem,
          include: [
            conn.models.product
          ]
        }
      ]
    }
  );
  return cart;
}

User.prototype.addToCart = async function({ product, quantity}){
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find( lineItem => {
    return lineItem.productId === product.id; 
  });
  if(lineItem){
    lineItem.quantity += quantity;
    await lineItem.save();
  }
  else {
    await conn.models.lineItem.create({ orderId: cart.id, productId: product.id, quantity });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function({ product, quantityToRemove}){
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find( lineItem => {
    return lineItem.productId === product.id; 
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if(lineItem.quantity > 0){
    await lineItem.save();
  }
  else {
    await lineItem.destroy();
  }
  return this.getCart();
};


User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 5);
  }
});



User.prototype.generateToken = function(){
  return {
    token: jwt.sign({ id: this.id }, process.env.JWT || 'shhh')
  }
};

User.register = async function(credentials){
  const user = await this.create(credentials);
  return user.generateToken();
};



User.findByToken = async function(token){
  try {
    const { id } = jwt.verify(token, process.env.JWT || 'shhh');

    const user = await this.findByPk(id);

    if(user){
      return user;
    }
    throw 'user not found';
  }
  catch(ex){
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
}


User.authenticateGithub = async function(code){
  let response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      code
    },
    {
      headers: {
        accept: 'application/json'
      }
    }
  );
  if(response.data.error){
    const error = Error(response.data.error);
    error.status = 401;
    throw error;
  }
  response = await axios.get(
    'https://api.github.com/user',
    {
      headers: {
        Authorization: `Bearer ${ response.data.access_token}`
      }
    }
  );

  const login = response.data.login;
  let user = await User.findOne({
    where: {
      username: login
    }
  })
  if(!user){
    user = await User.create({
      username:login
    })
  }
  return user.generateToken();
} 
User.authenticate = async function( credentials ){
  const {username, password,} = credentials;
  const user = await this.findOne({
    where: {
      username
    }
  });
  if(!user || !(await bcrypt.compare(password, user.password))){
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
  }
  return user.generateToken();
}




module.exports = User;

