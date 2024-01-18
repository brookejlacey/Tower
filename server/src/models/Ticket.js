import { Schema } from "mongoose";

export const TicketSchema = new Schema(
    {
        eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
        accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    },
)
TicketSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'Event',
    justOne: true
})

