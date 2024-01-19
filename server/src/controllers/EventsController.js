import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .put('/:eventId', this.editEvent)
            // .put('/:eventId/cancel', this.cancelEvent)

            .use(Auth0Provider.getAuthorizedUserInfo)

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
            const eventId = request.params.eventId;
            const updateData = request.body;
            const userId = request.userInfo.id;
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