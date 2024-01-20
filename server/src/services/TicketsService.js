import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

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
        // FIXME what is wrong here????
        return tickets
    }

    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        return ticket
    }

    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('event')

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