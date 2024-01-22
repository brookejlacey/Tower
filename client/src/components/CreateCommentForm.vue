<template>
    <div>
        <h3>Add a Comment</h3>
        <div class="mb-3">
            <textarea v-model="commentText" class="form-control" id="commentText" rows="3"
                placeholder="Tell the people..."></textarea>
        </div>
        <button @click="createComment" class="btn btn-primary">Post Comment</button>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';

export default {
    props: {
        eventId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const commentText = ref('');

        const createComment = async () => {
            try {
                await commentsService.createComment({
                    eventId: props.eventId,
                    body: commentText.value,
                    isAttending: true
                });
                commentText.value = '';
                Pop.success('Comment added!');
            } catch (error) {
                Pop.error(error);
            }
        };

        return {
            commentText,
            createComment
        };
    }
};
</script>
  
<style lang="scss" scoped></style>
  