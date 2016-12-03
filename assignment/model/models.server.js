/**
 * Created by mayank on 11/25/16.
 */
module.exports = function ()
{
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wam-fall-2016');

    var userModel = require("./user/user.model.server")();
/*
    var websiteModel = require("./website/website.model.server")();
    var widgetModel = require("./widget/widget.model.server")();
    var pageModel = require("./page/page.model.server")();
*/
    var model = {
        userModel: userModel
      /*  websiteModel: websiteModel,
        widgetModel: widgetModel,
        pageModel: pageModel*/
    };

    userModel.setModel(model);
    /*websiteModel.setModel(model);
    widgetModel.setModel(model);
    pageModel.setModel(model);*/

    return model;
};