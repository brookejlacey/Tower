import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { EventsService } from "./EventsService.js"

class CommentsService {
    async getCommentsInEvent(eventId) {
        // NOTE js find equivalent: comments.filter(comment => comment.eventId == eventId)
        // NOTE this is what's stored inside our parameter
        // const comments = await dbContext.Comments.find({ eventId: '65a6c1b3ccad28b46f482ee2' }).populate('creator', 'name comment')
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name comment')
        return comments
    }
    async createComment(commentData) {
        const event = await EventsService.getEventById(commentData.eventId)

        // REVIEW make sure the ablum is not archived before running code below if statement
        // if(ablum.archived == true)
        if (event.canceled) {
            throw new BadRequest(`${event.name} has been archived, you can not post additional comments to it`)
        }

        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name comment')
        return comment
    }
}

export const commentsService = new CommentsService()