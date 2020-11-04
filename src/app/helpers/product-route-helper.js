'use strict'

// Load Products Model
const Products = require('../models/Products')
// Load Function
const func = require('../utils/utility-functions')

module.exports = {
    getProductDetail: function (callback) {
        func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_ENTER_INTO_FUNC + ' ProductRouteHelper.getProductDetail() ')
        try {
            Products.find().exec(function (error, productData) {
                if (error) {
                    func.printLog(func.logCons.LOG_LEVEL_ERROR, ` ProductRouteHelper.getProductDetail(): ${error}`)
                    func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.getProductDetail()')
                    return callback(true, func.errorsObjectGenrator(func.msgCons.CODE_GET_PRODUCT_DETAIL_500, func.msgCons.MSG_ERROR));
                } else {
                    if (productData.length === 0) {
                        func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.getProductDetail() with No data found')
                        return callback(null, func.responseGenerator(func.msgCons.CODE_NO_DATA_FOUND_200, func.msgCons.MSG_NO_DATA_FOUND, productData));
                    } else {
                        func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.getProductDetail()')
                        return callback(null, func.responseGenerator(func.msgCons.CODE_GET_PRODUCT_DETAIL_200, func.msgCons.MSG_SUCCESS, productData));
                    }
                }
            });
        } catch (err) {
            func.printLog(func.logCons.LOG_LEVEL_ERROR, ` ProductRouteHelper.getProductDetail(): ${err}`)
            func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.getProductDetail()')
            return callback(func.errorsObjectGenrator(func.msgCons.CODE_GET_PRODUCT_DETAIL_500, func.msgCons.MSG_ERROR));
        }
    },

    saveProductDetail: function (requestBody, callback) {
        func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_ENTER_INTO_FUNC + ' ProductRouteHelper.saveProductDetail() ')
        try {
            func.validateProductRequest(requestBody).then((result) => {
                Products.create(requestBody, function (error, savedData) {
                    if (error) {
                        func.printLog(func.logCons.LOG_LEVEL_ERROR, ` ProductRouteHelper.saveProductDetail(): ${error}`)
                        func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.saveProductDetail()')
                        return callback(true, func.errorsObjectGenrator(func.msgCons.CODE_SAVE_PRODUCT_DETAIL_500, func.msgCons.MSG_ERROR));
                    } else {
                        func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.saveProductDetail()')
                        return callback(null, func.responseGenerator(func.msgCons.CODE_SAVE_PRODUCT_DETAIL_200, func.msgCons.MSG_SUCCESS, savedData));
                    }
                });
            }).catch((err) => {
                func.printLog(func.logCons.LOG_LEVEL_ERROR, ` ProductRouteHelper.saveProductDetail() with validation error`)
                return callback(func.errorsObjectGenrator(func.msgCons.CODE_BAD_REQUEST, func.msgCons.MSG_BAD_REQUEST, err));
            });
        } catch (err) {
            func.printLog(func.logCons.LOG_LEVEL_ERROR, ` ProductRouteHelper.saveProductDetail(): ${err}`)
            func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.saveProductDetail()')
            return callback(func.errorsObjectGenrator(func.msgCons.CODE_SAVE_PRODUCT_DETAIL_500, func.msgCons.MSG_ERROR));
        }
    },

    updateProductDetail: function (id, requestBody, callback) {
        func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_ENTER_INTO_FUNC + ' ProductRouteHelper.updateProductDetail() ')
        try {
            func.validateProductRequest(requestBody).then((result) => {
                Products.findOneAndUpdate({
                    _id: id
                }, requestBody).exec(function (error, savedData) {
                    if (error) {
                        func.printLog(func.logCons.LOG_LEVEL_ERROR, ` ProductRouteHelper.updateProductDetail(): ${error}`)
                        func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.updateProductDetail()')
                        return callback(true, func.errorsObjectGenrator(func.msgCons.CODE_UPDATE_PRODUCT_DETAIL_500, func.msgCons.MSG_ERROR));
                    } else {
                        func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.updateProductDetail()')
                        return callback(null, func.responseGenerator(func.msgCons.CODE_UPDATE_PRODUCT_DETAIL_200, func.msgCons.MSG_SUCCESS));
                    }
                });
            }).catch((err) => {
                func.printLog(func.logCons.LOG_LEVEL_ERROR, ` ProductRouteHelper.saveProductDetail() with validation error`)
                callback(func.errorsObjectGenrator(func.msgCons.CODE_BAD_REQUEST, func.msgCons.MSG_BAD_REQUEST, err));
            });
        } catch (err) {
            func.printLog(func.logCons.LOG_LEVEL_ERROR, ` ProductRouteHelper.updateProductDetail(): ${err}`)
            func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.updateProductDetail()')
            return callback(func.errorsObjectGenrator(func.msgCons.CODE_UPDATE_PRODUCT_DETAIL_500, func.msgCons.MSG_ERROR));
        }
    },

    deleteProductDetail: function (id, callback) {
        func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_ENTER_INTO_FUNC + ' ProductRouteHelper.deleteProductDetail() ')
        try {
            Products.remove({
                _id: id
            }).exec(function (error, response) {
                if (error) {
                    func.printLog(func.logCons.LOG_LEVEL_ERROR, ` ProductRouteHelper.deleteProductDetail(): ${error}`)
                    func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.deleteProductDetail()')
                    return callback(true, func.errorsObjectGenrator(func.msgCons.CODE_DELETE_PRODUCT_DETAIL_500, func.msgCons.MSG_ERROR));
                } else {
                    func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.deleteProductDetail()')
                    return callback(null, func.responseGenerator(func.msgCons.CODE_DELETE_PRODUCT_DETAIL_200, func.msgCons.MSG_SUCCESS));
                }
            });
        } catch (err) {
            func.printLog(func.logCons.LOG_LEVEL_ERROR, ` ProductRouteHelper.deleteProductDetail(): ${err}`)
            func.printLog(func.logCons.LOG_LEVEL_INFO, func.logCons.LOG_EXIT_FROM_FUNC + ' ProductRouteHelper.deleteProductDetail()')
            return callback(func.errorsObjectGenrator(func.msgCons.CODE_DELETE_PRODUCT_DETAIL_500, func.msgCons.MSG_ERROR));
        }
    }
}