const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive');

const conn = massive.connectSync({
  connectionString: "postgres://postgres:@localhost/afternoonProj"
})
const port = 3000
    , app = module.exports = express();
app.use(bodyParser.json());
app.set('db', conn)
const db = app.get('db')

const productsCtrl = require('./productsCtrl')
app.get('/products/all', productsCtrl.getAllProducts)

app.get('/products/:id', productsCtrl.getProdById)

app.post('/products/all', productsCtrl.updateProd)

app.put('/products/:id', (req, res) => {
  let srch = parseInt(req.params.id)
  db.update_product([req.body.value, srch], (err, prodUp) => {
    if (!err) {
      res.send('Product updated!')
    }
  })
})
app.delete('/products/:id', (req, res) => {
  let srch = parseInt(req.params.id)
  db.delete_product([srch], (err, remProd) => {
    if (!err) {
      res.send('Product removed!')
    }
  })
})
app.listen(port, console.log(`Listening on ${port}`))
