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

  // Products
  'GET /api/products':    'product/ProductManageController.get',
  'GET /api/product/:id':    'product/ProductManageController.getOne',
  'GET /api/units/':    'product/ProductManageController.units',
  'GET /api/categories/':    'product/ProductManageController.categories',
  'POST /api/product/add':    'product/ProductManageController.add',
  'DELETE /api/product/delete/:id':    'product/ProductManageController.delete',

  // DiningTables
  'GET /api/diningTables':    'diningTable/DiningTable.get',

  // FoodOrders
  'GET /api/foodOrder/:idDiningTable':    'foodOrder/FoodOrder.get',
  
};
