import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { accountService } from "./AccountService.js"
import { api } from "./AxiosService.js"

class TicketsService {
    async createTicket(ticketData) {
        const response = await api.post('api/tickets', ticketData)
        logger.log('made ticket', response.data)
        const newTicket = new Ticket(response.data)
        AppState.tickets.push(newTicket)
        // AppState.accountTickets.push(newTicket)
    }

    async deleteTicket(ticketId) {
        const response = await api.delete(`api/tickets/${ticketId}`);
        logger.log('Ticket cancelled', response.data);
        const indexInTickets = AppState.tickets.findIndex(ticket => ticket.id === ticketId);
        if (indexInTickets > -1) {
            AppState.tickets.splice(indexInTickets, 1);
        }
        const indexInAccountTickets = AppState.accountTickets.findIndex(ticket => ticket.id === ticketId);
        if (indexInAccountTickets > -1) {
            AppState.accountTickets.splice(indexInAccountTickets, 1);
        }
    }

    // async getEventTickets(eventId) {
    //     const response = await api.get(`api/events/${eventId}/tickets`)
    //     logger.log('handshake event tickets', response.data)
    //     let tickets = response.data.map(ticket => new Ticket(ticket))
    //     AppState.tickets = tickets
    // }
}

export const ticketsService = new TicketsService()