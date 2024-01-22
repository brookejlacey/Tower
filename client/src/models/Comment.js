import { Account } from "./Account.js"

export class Comment {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.isAttending = data.isAttending
        this.creator = data.creator ? new Account(data.creator) : null;
    }
}

// creator:
//     "_id": "65aa1b150bd492577f788478",
//     "subs": [
//       "auth0|65aa1b133d944427580af45f"],
//     "email": "nana@gmail.com",
//     "name": "nana",
//     "picture": "https://s.gravatar.com/avatar/3a6b04c90e553bc5a99cfe3c6dee2255?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fna.png",
//     "createdAt": "2024-01-19T06:47:59.907Z",
//     "updatedAt": "2024-01-19T06:47:59.907Z",
//     "__v": 0,
//     "id": "65aa1b150bd492577f788478"
