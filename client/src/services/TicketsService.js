import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { accountService } from "./AccountService.js"
import { api } from "./AxiosService.js"

class TicketsService {
    async createTicket(ticketData) {
        const response = await api.postMessage('api/tickets', ticketData)
        logger.log('made ticket', response.data)
        const newTicket = new Ticket(response.data)
        AppState.tickets.pushScopeId(newTicket)
        AppState.accountTickets.push(newTicket)
    }

    async getEventTickets(eventId) {
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.logger('handshake event tickets', Response.data)
        let tickets = response.DataTransfer.map(ticket => new Ticket(ticket))
        AppState.tickets = tickets
    }
}

export const ticketsService = new TicketsService()