'use strict'

const express = require('express')
const router = express.Router()

// Load helper Class
const productHelper = require('../helpers/product-route-helper')
// Load Function
const func = require('../utils/utility-functions')

// get product list
const getProductDetail = (req, res) => {
  func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_ENTER_INTO_FUNC + ' ProductRoute.getProductDetail() ')
  productHelper.getProductDetail(function (error, response) {
    if (error) {
      func.printLog(func.logCons.LOG_LEVEL_ERROR, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRoute.getProductDetail() ')
      res.status((error[func.msgCons.RESPONSE_STATUS_CODE]) ? parseInt(error[func.msgCons.RESPONSE_STATUS_CODE].replace(/[^0-9]/g, '')) : func.httpStatusCode.INTERNAL_SERVER_ERROR);
      res.send(error);
    } else {
      func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRoute.getProductDetail() ')
      res.send(response);
    }
  });
}

// save product detail
const saveProductDetail = (req, res) => {
  func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_ENTER_INTO_FUNC + ' ProductRoute.saveProductDetail() ')
  productHelper.saveProductDetail(req.body, function (error, response) {
    if (error) {
      func.printLog(func.logCons.LOG_LEVEL_ERROR, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRoute.saveProductDetail() ')
      res.status((error[func.msgCons.RESPONSE_STATUS_CODE]) ? parseInt(error[func.msgCons.RESPONSE_STATUS_CODE].replace(/[^0-9]/g, '')) : func.httpStatusCode.INTERNAL_SERVER_ERROR);
      res.send(error);
    } else {
      func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRoute.saveProductDetail() ')
      res.send(response);
    }
  });
}

// update product detail
const updateProductDetail = (req, res) => {
  func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_ENTER_INTO_FUNC + ' ProductRoute.updateProductDetail() ')
  productHelper.updateProductDetail(req.params.id, req.body, function (error, response) {
    if (error) {
      func.printLog(func.logCons.LOG_LEVEL_ERROR, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRoute.updateProductDetail() ')
      res.status((error[func.msgCons.RESPONSE_STATUS_CODE]) ? parseInt(error[func.msgCons.RESPONSE_STATUS_CODE].replace(/[^0-9]/g, '')) : func.httpStatusCode.INTERNAL_SERVER_ERROR);
      res.send(error);
    } else {
      func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRoute.updateProductDetail() ')
      res.send(response);
    }
  });
}

// delete product detail
const deleteProductDetail = (req, res) => {
  func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_ENTER_INTO_FUNC + ' ProductRoute.updateProductDetail() ')
  productHelper.deleteProductDetail(req.params.id, function (error, response) {
    if (error) {
      func.printLog(func.logCons.LOG_LEVEL_ERROR, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRoute.deleteProductDetail() ')
      res.status((error[func.msgCons.RESPONSE_STATUS_CODE]) ? parseInt(error[func.msgCons.RESPONSE_STATUS_CODE].replace(/[^0-9]/g, '')) : func.httpStatusCode.INTERNAL_SERVER_ERROR);
      res.send(error);
    } else {
      func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRoute.deleteProductDetail() ')
      res.send(response);
    }
  });
}

router.get('/', getProductDetail)
router.post('/', saveProductDetail)
router.put('/:id', updateProductDetail)
router.delete('/:id', deleteProductDetail)

module.exports = router