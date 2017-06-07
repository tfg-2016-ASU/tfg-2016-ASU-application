'use strict';

var url = require('url');

var Default = require('./DefaultService');

module.exports.addFeedback = function addFeedback (req, res, next) {
  Default.addFeedback(req.swagger.params, res, next);
};

module.exports.addFeedbackResult = function addFeedbackResult (req, res, next) {
  Default.addFeedbackResult(req.swagger.params, res, next);
};

module.exports.deleteFeedback = function deleteFeedback (req, res, next) {
  Default.deleteFeedback(req.swagger.params, res, next);
};

module.exports.findFeedbackById = function findFeedbackById (req, res, next) {
  Default.findFeedbackById(req.swagger.params, res, next);
};

module.exports.findFeedbackByIdFeedbackAndStudent = function findFeedbackByIdFeedbackAndStudent (req, res, next) {
  Default.findFeedbackByIdFeedbackAndStudent(req.swagger.params, res, next);
};

module.exports.findFeedbackResultByIdFeedback = function findFeedbackResultByIdFeedback (req, res, next) {
  Default.findFeedbackResultByIdFeedback(req.swagger.params, res, next);
};

module.exports.findFeedbacks = function findFeedbacks (req, res, next) {
  Default.findFeedbacks(req.swagger.params, res, next);
};

module.exports.findFeedbacksResults = function findFeedbacksResults (req, res, next) {
  Default.findFeedbacksResults(req.swagger.params, res, next);
};

module.exports.updateFeedbackByIdFeedbackAndStudent = function updateFeedbackByIdFeedbackAndStudent (req, res, next) {
  Default.updateFeedbackByIdFeedbackAndStudent(req.swagger.params, res, next);
};

module.exports.findStudentsPrepared = function findStudentsPrepared (req, res, next) {
  Default.findStudentsPrepared(req.swagger.params, res, next);
};

module.exports.findReviewersPreparedSameShift = function findReviewersPreparedSameShift (req, res, next) {
  Default.findReviewersPreparedSameShift(req.swagger.params, res, next);
};

module.exports.findReviewedsPreparedSameShift = function findReviewedsPreparedSameShift (req, res, next) {
  Default.findReviewedsPreparedSameShift(req.swagger.params, res, next);
};

module.exports.findDistinctIdFeedbacks = function findDistinctIdFeedbacks (req, res, next) {
  Default.findDistinctIdFeedbacks(req.swagger.params, res, next);
};


