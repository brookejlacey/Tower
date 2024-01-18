import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { api } from "./AxiosService.js"

class EventsService {
    async getAllEvents() {
        const response = await api.get('api/events')
        console.log('got event', response.data)
        AppState.events = response.data.map(event => new Event(event))
    }

    async getEventById(eventId) {
        const response = await api.get(`api/events/${eventId}`)
        console.log('sup', response.data)
        AppState.activeEvent = new Event(response.data)
    }
}

export const eventsService = new EventsService()