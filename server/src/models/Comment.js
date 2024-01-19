import { Schema } from "mongoose";

export const CommentSchema = new Schema(
    {
        commentBody: { type: String, required: true, maxlength: 750 },
        eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        isAttending: { type: Boolean, required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})