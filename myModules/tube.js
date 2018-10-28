const reqOn = require ("./reqOn");
module.exports.reqOn = reqOn;

const fileReader = require ("./fileReader");
module.exports.fileReader = fileReader;

const mimetype = require ("./mimetype");
module.exports.mimetype = mimetype;

const sendResponse = require ("./sendResponse");
module.exports.sendResponse = sendResponse;

const sendError = require ("./sendError");
module.exports.sendError = sendError;

const postMethod = require ("./postMethod");
module.exports.postMethod = postMethod;

const getMethod = require ("./getMethod");
module.exports.getMethod = getMethod;

const watchFs = require('./watchFs.js');
module.exports.watchFs = watchFs;