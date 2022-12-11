const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema(
    {
        session_id : {
            type: String,
            trim: true
        },
        title: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        start: {
            type: Date
        },
        end: {
            type: Date
        },
        participants: {
            type: Array,
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

const Event = mongoose.model('Event', SessionSchema);

module.exports = { Event };
