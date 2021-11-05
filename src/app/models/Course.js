const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const ongoose_delete = require('mongoose-delete');

const Course = new Schema(
    {
        name: { type: String, maxlength: 255 },
        description: { type: String, maxlength: 600 },
        image: { type: String },
        videoID: { type: String, maxlength: 255 },
        level: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    }
);

//add Plugins
mongoose.plugin(slug);
Course.plugin(ongoose_delete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
