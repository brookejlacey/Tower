import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
    async getAllEvents() {
        const events = await dbContext.Events.find().populate('creator', 'name coverImg').populate('ticketCount')
        return events
    }
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator', 'name coverImg').populate('ticketCount')

        if (!event) {
            throw new BadRequest(`Invalid id: ${eventId}`)
        }
        return event
    }
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name coverImg')
        await event.populate('ticketCount')
        return event
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


    async editEvent(eventId, userId, updateData) {
        const event = await dbContext.Events.findById(eventId);

        if (!event) {
            throw new BadRequest(`Invalid id: ${eventId}`);
        }
        if (event.creatorId != userId) {
            throw new Forbidden("You cannot edit an event that you did not create");
        }
        event.name = updateData.name || event.name
        event.description = updateData.description || event.description
        event.coverImg = updateData.coverImg || event.coverImg
        event.location = updateData.location || event.location
        event.capacity = updateData.capacity || event.capacity
        event.startDate = updateData.startDate || event.startDate
        event.type = updateData.type || event.type


        await event.save();
        await event.populate('creator', 'name picture');
        return event;
    }

}



export const eventsService = new EventsService()