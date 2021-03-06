/**
 * Created by mayank on 11/30/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findWebsitesForUser: findWebsitesForUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel,
        findUserByFacebookId: findUserByFacebookId
    };

    return api;

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username
        });
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        return UserModel.create(user);
    }



    function findWebsitesForUser(userId) {
        return UserModel.findById(userId).populate("websites", "name").exec();
    }

    function updateUser(user, userId) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            );
    }

    function deleteUser(userId) {
        return UserModel
            .remove({_id: userId})
            .then(function() {
                model.websiteModel
                    .deleteWebsitesForUser(userId);
            });;
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

}