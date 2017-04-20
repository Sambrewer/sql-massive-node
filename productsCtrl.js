const app = require('./index.js')
    , db = app.get('db')
module.exports = {
  getAllProducts: (req, res) => {
    db.read_products((err, products) => {
      if (!err) {
        res.send(products)
      }
    })
  },
  getProdById: (req, res) => {
    let srch = parseInt(req.params.id)
    db.read_product([srch], (err, product) => {
      if (!err) {
        res.send(product)
      }
      console.log(srch)
    })
  },
  updateProd: (req, res) => {
    let data = [req.body.name, req.body.description, parseInt(req.body.price), req.body.imageurl]
    db.create_product(data, (err, prodnew) => {
      if (!err) {
        res.send('Product saved!')
      }
    })
  }
}
