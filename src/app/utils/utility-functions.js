'use strict'

const winston = require('winston')
const Joi = require('joi')

const myFormat = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

const logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      json: false,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        myFormat
      )
    })]
})

module.exports = {
  logCons: require('./constants/log-constants'),
  urlCons: require('./constants/url-constants'),
  msgCons: require('./constants/msg-constants'),
  httpStatusCode: require('http-status-codes'),
  
  printLog: (level, msg) => {
    logger.log(level, msg)
  },

  /**
    * response json payload
    *
    * @param {Json} responseData response json data
    * @param {String} responseStatusCode response status code
    * @param {String} responseStatusMsg response status msg
    * @param {JsonArray} responseErrors array of errors
    *
    */
   responseGenerator: function (responseStatusCode, responseStatusMsg, responseData, responseErrors) {
    let responseJson = {}
    // errors
    if (responseErrors === undefined) {
      responseJson[this.msgCons.RESPONSE_ERROR_STATUS] = false
    } else {
      responseJson[this.msgCons.RESPONSE_ERROR_STATUS] = true
    }
    responseJson[this.msgCons.RESPONSE_STATUS_CODE] = responseStatusCode
    responseJson[this.msgCons.RESPONSE_STATUS_MSG] = responseStatusMsg
    responseJson[this.msgCons.RESPONSE_DATA] = responseData
    return responseJson
  },
  /**
   * response json payload for error
   *
   * @param {String} code error code
   * @param {String} msg error msg
   *
   */
  errorsObjectGenrator: function (code, msg, data) {
    let responseJson = {}
    // error_status
    responseJson[this.msgCons.RESPONSE_ERROR_STATUS] = true
    // code
    if (typeof code === 'undefined') {
      responseJson[this.msgCons.RESPONSE_STATUS_CODE] = this.msgCons.CODE_INTERNAL_SERVER
    } else {
      responseJson[this.msgCons.RESPONSE_STATUS_CODE] = code
    }
    // message
    if (typeof msg === 'undefined') {
      responseJson[this.msgCons.RESPONSE_STATUS_MSG] = this.msgCons.MSG_INTERNAL_SERVER_ERROR
    } else {
      responseJson[this.msgCons.RESPONSE_STATUS_MSG] = msg
    }
    responseJson[this.msgCons.RESPONSE_DATA] = responseData
    return responseJson
  },
  /**
   * validate request
   *
   * @param {JSON} request reqbody
   *
   */
  validateProductRequest: async (request) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      type: Joi.string().required(),
      manufacture_date: Joi.string().required(),
      price: Joi.number().required(),
      image: Joi.string().required(),
      description: Joi.string().required()
    })
    // validate the request data against the schema
    let validation = await schema.validateAsync(request);
    return validation;
  }
}
