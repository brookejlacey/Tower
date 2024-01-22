import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class TicketsService {
    async getMyEventTickets(userId) {
        const eventTickets = await dbContext.Tickets.find({ accountId: userId }).populate({
            path: 'event',
            populate: {
                path: 'ticketCount'
            }
        })
        return eventTickets
    }
    async getTicketsForEvent(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
        return tickets
    }

    async createTicket(ticketData) {
        const event = await (await eventsService.getEventById(ticketData.eventId)).populate('creator', 'name picture')

        if (event.isCanceled) {
            throw new BadRequest(`${event.name} has been cancelled, you can not get a ticket`)
        }

        // if (event.capacity == 0) {
        //     throw new BadRequest(`${event.name} is at capacity, you can not get a ticket`)
        // }

        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        // await ticket.populate('ticketCount')
        return ticket
    }

    async deleteTicket(ticketId, userId) {
        const ticket = await (await dbContext.Tickets.findById(ticketId).populate('event'))

        if (!ticket) {
            throw new BadRequest(`Invalid id: ${ticketId}`)
        }

        if (ticket.accountId != userId) {
            throw new Forbidden("something went wrong")
        }
        await ticket.deleteOne()

        // @ts-ignore
        return `no longer a ticket for ${ticket.event.name}`
    }

}

export const ticketsService = new TicketsService()