/**
 * DiningTable.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'diningTables',
  attributes: {

	  number: {
  		type: "number",
  		required: true
  	},
      name: {
  		type: "string",
  		required: true
  	},
      status: {
  		type: 'number',
  		required: true
  	},
	foodOrders: {
      collection: 'foodOrder',
      via: 'diningTable'
    },
  },

};
