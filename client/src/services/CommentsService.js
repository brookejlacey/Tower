
import { AppState } from '../AppState.js'
import { Comment } from '../models/Comment.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class CommentsService {
    async createComment(commentData) {
        const response = await api.post('api/comments', commentData)
        console.log('📡💩', response.data)
        const newComment = new Comment(response.data)
        AppState.comments.push(newComment)

    }

    async getEventComments(eventId) {
        AppState.comments = []
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('📡🏠', response.data)
        let comments = response.data.map(comment => new Comment(comment))
        AppState.comments = comments
    }

    async deleteComment(commentId) {
        await api.delete(`api/comments/${commentId}`)
    }
}

export const commentsService = new CommentsService()