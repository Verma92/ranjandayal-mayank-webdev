/**
 * Created by mayank on 11/30/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        first: String,
        last: String,
        email: String,
        phone: String,
        dateCreated: { type: Date, default: Date.now},
        google: {
            id: String,
            token: String,
            email: String
        },
        role: {type: String, default: "STUDENT", enum: ['ADMIN', 'STUDENT', 'FACULTY']},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}]
        // websites: [WebsiteSchema],
    }, {collection: "user"});
    return UserSchema;
};