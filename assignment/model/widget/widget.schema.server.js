/**
 * Created by mayank on 11/30/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        _page: {
            type: mongoose.Schema.ObjectId,
            ref: 'PageModel'
        },
        type: { type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'] },
        name: String,
        text: String,
        placeholder: String,
        description: String,
        width: String,
        height: String,
        url: String,
        rows: Number,
        size: Number,
        deletable: Boolean,
        formatted: Boolean,
        position: Number,
        class: String,
        icon: String,
        dateCreated: { type: Date, default: Date.now}
    }, {collection: "widget"});

    return WidgetSchema;
}