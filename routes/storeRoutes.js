const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const requireLogin = require ('../middlewares/requireLogin');

const Item = mongoose.model('items');

module.exports = app => {
    app.post('/store/addItem', requireLogin, (req, res) => {
        const { title, description, quantity, price } = req.body;

        const newItem = new Item({
            title,
            description,
            quantity,
            price,
            _merchant: req.user.id, 
        })
            newItem.save((err, savedItem) => {
                if (err) return res.json(err)
                res.json(savedItem)
        })
    })
    app.get('/merchant/inventory', requireLogin, async (req, res) => {
        const items = await Item.find({ _merchant: req.user.id }).select({
        });
        res.send(items);
      });
    app.get('/client/store', requireLogin, async (req, res) => {
        const items = await Item.find().select({
        });
        res.send(items);
    });  
    app.post('/api/cart', (req, res) => {
        var cart = req.body;
        req.session.cart = cart;
        req.session.save(function(err){
          if(err){
            throw err;
          }
        })
        res.send(req.session.cart);
      });
      // GET SESSION CART API
      app.get('/api/cart', (req, res) => {
        if(typeof req.session.cart !== 'undefined'){
          res.send(req.session.cart);
        }
      });
}    

    