import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getTicketsForEvent)
            .get('/:eventId/comments', this.getCommentsForEvent)

            .use(Auth0Provider.getAuthorizedUserInfo)

            .post('', this.createEvent)
            // .put('/:eventId', this.editEvent)
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

    async getCommentsForEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentsService.getCommentsForEvent(eventId)
            response.send(comments)
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
    // async editEvent(request, response, next) {
    //     try {
    //         const userId = request.userInfo.id;
    //         // console.log('userId', )
    //         const eventId = request.params.eventId;
    //         const updateData = request.body;
    //         // FIXME we can only pull the userInfo from a request if this request is BELOW our middleware(.use)
    //         const event = await eventsService.editEvent(eventId, userId, updateData);
    //         response.send(event);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

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