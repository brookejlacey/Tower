import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
    async getAllEvents() {
        const events = await dbContext.Events.find().populate('creator', 'name coverImg').populate('ticketCount')
        return events
    }
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator', 'name coverImg')

        if (!event) {
            throw new BadRequest(`Invalid id: ${eventId}`)
        }
        return event
    }
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        return event
    }
    async editEvent(eventId, userId, updateData) {
        const event = await dbContext.Events.findById(eventId);

        // if (!event) {
        //     throw new BadRequest(`Invalid id: ${eventId}`);
        // }
        // if (event.creatorId.toString() !== userId) {
        //     throw new Forbidden("You cannot edit an event that you did not create");
        // }

        event.name = updateData.name || event.name;
        event.description = updateData.description || event.description;
        if (typeof updateData.isCanceled !== 'undefined') {
            event.isCanceled = updateData.isCanceled;
        }
        await event.save();
        await event.populate('creator', 'name picture');
        return event;
    }

    async cancelEvent(eventId, userId) {
        const eventToCancel = await this.getEventById(eventId)

        if (eventToCancel.creatorId != userId) {
            throw new Forbidden("NOT CANCELABLE")
        }

        eventToCancel.isCanceled = !eventToCancel.isCanceled

        await eventToCancel.save()

        return eventToCancel
    }
}



export const eventsService = new EventsService()