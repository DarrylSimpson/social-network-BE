const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'Your reaction is required',
        max: 280
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: createdVal => dateFormat(createdVal)
    }
}
    // {
    //     toJSON: {
    //         getters: true
    //     }
    // }
)

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Text is required!',
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdVal => dateFormat(createdVal)
    },
    username: {
        type: String,
        required: 'Username is required!'
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;