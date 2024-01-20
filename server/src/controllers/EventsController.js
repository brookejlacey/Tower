import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get(':eventId/tickets', this.getTicketsForEvent)
            // TODO write method to Get Event Tickets (people who have tickets for the event)

            .use(Auth0Provider.getAuthorizedUserInfo)

            .put('/:eventId', this.cancelEvent)
            .put('/:eventId', this.editEvent)
            .post('', this.createEvent)
            .delete('/:eventId', this.cancelEvent)
    }
    async getAllEvents(request, response, next) {
        try {
            const events = await eventsService.getAllEvents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await eventsService.getEventById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsForEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketsService.getTicketsForEvent(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(request, response, next) {
        try {
            const eventData = request.body
            const userId = request.userInfo.id
            eventData.creatorId = userId
            const event = await eventsService.createEvent(eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(request, response, next) {
        try {
            const userId = request.userInfo.id;
            // console.log('userId', )
            const eventId = request.params.eventId;
            const updateData = request.body;
            // FIXME we can only pull the userInfo from a request if this request is BELOW our middleware(.use)
            const event = await eventsService.editEvent(eventId, userId, updateData);
            response.send(event);
        } catch (error) {
            next(error);
        }
    }

    async cancelEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const event = await eventsService.cancelEvent(eventId, userId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }
}