const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        title: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        sessions: {
            type: Array
        },
        image: {
            type: String,
            default: null
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const Course = mongoose.model('Course', CourseSchema);

module.exports = { Course };
