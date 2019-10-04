/**
 * DiningTableController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    get: (req, res) => {
        DiningTable.find()
          .then((diningTable) => {
            if (!diningTable || diningTable.length == 0) {
                return res.send({
                    'success': false,
                    'message': 'No se encontro ningun registro'
                })
            } else {
                return res.send({
                    'success': true,
                    'message': 'Registros obtenidos correctamente',
                    'data': diningTable
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

};

