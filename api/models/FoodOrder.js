/**
 * FoodOrder.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'foodOrders',
  attributes: {

    total: {
      type: 'number',
      required: true
    },
    status: {
      type: 'number',
      required: true
    },
    foodOrderDescriptions: {
      collection: 'foodOrderDescription',
      via: 'foodOrder'
    },
	foodOrderType: {
      model: 'foodOrderType'
    },
	diningTable: {
      model: 'diningTable'
    },


  },

};
