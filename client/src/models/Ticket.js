import { Account } from "./Account.js"
import { Event } from "./Event.js"

export class Ticket {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = accountId
        this.event = data.event ? new Event(data.event) : null

        /** @type {Account} */
        this.profile = data.profile
        this.createdAt = new Date(data.createdAt)

    }
}