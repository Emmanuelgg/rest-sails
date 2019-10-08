/**
 * ManageProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  get: (req, res) => {
    Product.find({'status': 1}).populate('category').populate('unit')
      .then((products) => {
        if (!products || products.length == 0) {
            return res.send({
                'success': false,
                'message': 'No se encontro ningun registro'
            })
        } else {
            return res.send({
                'success': true,
                'message': 'Registros obtenidos correctamente',
                'data': products
            })
        }
      })
      .catch((err) => {
          sails.log.debug(err)
          return res.send({
              'success': false,
              'message': 'No se pudo realizar la petición'
          })
      })
  },

  getOne: (req, res) => {
    Product.findOne({'id': req.params.id}).populate('category').populate('unit')
      .then((product) => {
        if (!product || product.length == 0) {
            return res.send({
                'success': false,
                'message': 'No se encontro ningun registro'
            })
        } else {
            return res.send({
                'success': true,
                'message': 'Registros obtenidos correctamente',
                'data': product
            })
        }
      })
      .catch((err) => {
          sails.log.debug(err)
          return res.send({
              'success': false,
              'message': 'No se pudo realizar la petición'
          })
      })
  },

  add: (req, res) => {
    let data = req.body
    let id = data.id
    delete data.id
    Product.findOrCreate({'id': id != "" ? id : 0},
        data
    ).exec(async(err, product, wasCreated) => {
        sails.log(err)
        if (err) { 
            return res.send({
                'success': false,
                'message': 'No se pudo realizar la operación'
            })
        }
        if(wasCreated) {
            return res.send({
                'success': true,
                'message': `Se a agregado un nuevo producto: ${product.name}`,
                'data': product
            })
        }  else {
            product = data
            delete product.foodOrderDescriptions
            delete product.updatedAt
            delete product.createdAt
            delete product.id
            await Product.updateOne({'id': id}).set(product)
            return res.send({
                'success': true,
                'message': `Se a actualizado un el producto: ${product.name}`,
                'data': product
            })
        }
      })
  },

  delete: async (req, res) => {
    let id = req.params.id
    let deleted = await Product.updateOne({'id': id}).set({'status': -1})
    if (deleted) 
        return res.send({
            'success': true,
            'message': `Se a eliminado el producto`
        })
    else 
        return res.send({
            'success': false,
            'message': 'No se pudo realizar la operación'
        })
  },
  
  units:(req, res) => {
    Unit.find()
    .then((units) => {
      if (!units || units.length == 0) {
          return res.send({
              'success': false,
              'message': 'No se encontro ningun registro'
          })
      } else {
          return res.send({
              'success': true,
              'message': 'Registros obtenidos correctamente',
              'data': units
          })
      }
    })
    .catch((err) => {
        sails.log.debug(err)
        return res.send({
            'success': false,
            'message': 'No se pudo realizar la operación'
        })
    })
  },

  categories:(req, res) => {
    Category.find()
    .then((categories) => {
      if (!categories || categories.length == 0) {
          return res.send({
              'success': false,
              'message': 'No se encontro ningun registro'
          })
      } else {
          return res.send({
              'success': true,
              'message': 'Registros obtenidos correctamente',
              'data': categories
          })
      }
    })
    .catch((err) => {
        sails.log.debug(err)
        return res.send({
            'success': false,
            'message': 'No se pudo realizar la petición'
        })
    })
  }

};
