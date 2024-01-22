import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
    }

    async createComment(request, response, next) {
        try {
            const commentData = request.body
            commentData.creatorId = request.userInfo.id
            const comment = await commentsService.createComment(commentData)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(request, response, next) {
        try {
            const commentId = request.params.commentId
            const userId = request.userInfo.id
            const message = await commentsService.deleteComment(commentId, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
}