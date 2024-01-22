import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "../services/EventsService.js"

class CommentsService {
    async getCommentsForEvent(eventId) {
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
        return comments
    }
    async createComment(commentData) {
        const event = await (await eventsService.getEventById(commentData.eventId)).populate('creator', 'name picture')

        if (event.isCanceled) {
            throw new BadRequest(`${event.name} has been cancelled, you can not post additional comments to it`)
        }

        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        // .populate('eventId')

        if (!comment) {
            throw new BadRequest(`Invalid id: ${commentId}`)
        }

        if (comment.creatorId != userId) {
            throw new Forbidden("woopise that aint you")
        }

        await dbContext.Comments.findByIdAndDelete(commentId);
        return `Comment deleted successfully`

        // await comment.deleteOne()
        // return `No longer a comment on ${comment.event.name}`
    }
}

export const commentsService = new CommentsService()