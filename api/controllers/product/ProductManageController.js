/**
 * ManageProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  get: (req, res) => {
    Product.find()
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
  
  add:(req, res) => {
      sails.log.debug(req);
  }

};
