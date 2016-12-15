/**
 * Created by mayank on 11/25/16.
 */
module.exports = function ()
{
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    var connectionString = 'mongodb://127.0.0.1:27017/webdev-mayank';
    if(process.env.MLAB_USERNAME) {
        connectionString = 'mongodb://mayank:mayank@ds033076.mlab.com:33076/webdev-mayank';
    }
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var widgetModel = require("./widget/widget.model.server")();
    var pageModel = require("./page/page.model.server")();
    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        widgetModel: widgetModel,
        pageModel: pageModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    widgetModel.setModel(model);
    pageModel.setModel(model);

    return model;
};