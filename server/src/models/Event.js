import { Schema } from "mongoose";

export const EventSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 30 },
        description: { type: String, required: true, maxlength: 4000 },
        coverImg: { type: String, required: true, maxlength: 500 },
        location: { type: String, required: true, maxlength: 200 },
        capacity: { type: Number, required: true, max: 500 },
        startDate: { type: Date, required: true },
        type: { type: String, enum: ['digital', 'convention', 'sport', 'concert'], required: true, default: 'digital' },
        isCanceled: { type: Boolean, required: true, default: false },

        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    },

    {
        timestamps: true,
        toJSON: { virtuals: true }
    },
)
EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})