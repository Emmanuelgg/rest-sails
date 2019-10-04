/**
 * FoodOrderDescription.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'foodOrderDescriptions',
  attributes: {

    // id_product: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    // },
    quantity: {
      type: 'number',
      required: true
    },
    product_name: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      required: true
    },
    total: {
      type: 'number',
      required: true
    },
    status: {
      type: 'number',
      required: true
    },
    idFoodOrder: {
      model: 'foodOrder'
    },
    idProduct: {
      model: 'product'
    },

  },

};
