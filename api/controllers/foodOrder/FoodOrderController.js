/**
 * FoodOrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    get: (req, res) => {
        let data = req.params
        if (data.idDiningTable) {
            FoodOrder.findOrCreate({ 'diningTable': data.idDiningTable, 'status': 1 }, 
                { 
                    'foodOrderType': 1,
                    'diningTable': data.idDiningTable,
                    'total': 0.00,
                    'status': 1,
                }
            )
            .exec(async(err, foodOrder, wasCreated) => {
                if (err) { return res.serverError(err); }

                if(wasCreated) {
                    return res.send({
                        'success': true,
                        'message': `Se a creado una nueva orden con el numero ${foodOrder.id}`,
                        'data': foodOrder
                    })
                }
                else {
                    
                    FoodOrderDescription.find({'foodOrder': foodOrder.id}).populate('product').then((foodOrderDescriptions) => {
                        foodOrder.foodOrderDescription = foodOrderDescriptions
                        return res.send({
                            'success': true,
                            'message': `Se han obtenido los registros correctamente`,
                            'data': foodOrder
                        })
                    }).catch((err) => {
                        return res.send({
                            'success': false,
                            'message': 'No se pudo realizar la petición'
                        })
                    })
                }
            })
        } else {
            FoodOrder.find({'id': data.id})
            .then((foodOrder) => {
                if (!foodOrder || foodOrder.length == 0) {
                    return res.send({
                        'success': false,
                        'message': 'No se encontro ningun registro'
                    })
                } else {
                    return res.send({
                        'success': true,
                        'message': 'Registros obtenidos correctamente',
                        'data': foodOrder
                    })
                }
              })
              .catch((err) => {
                  return res.send({
                      'success': false,
                      'message': 'No se pudo realizar la petición'
                  })
              })
        }
          
      },

};

