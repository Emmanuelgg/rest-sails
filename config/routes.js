/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /api/products':    'product/ProductManageController.get',
  'GET /api/diningTables':    'diningTable/DiningTable.get',
  'GET /api/foodOrder/:idDiningTable':    'foodOrder/FoodOrder.get',
};
