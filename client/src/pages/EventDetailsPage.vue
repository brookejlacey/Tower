

<template>
    <div class="container-fluid">
        <div class="row no-gutters position-relative" v-if="activeEvent">
            <div class="col-12">

                <img :src="activeEvent.coverImg" alt="Event banner" class="img-fluid">
            </div>
            <div class="col-md-6 position-absolute event-info">
                <div class="text-white bg-dark bg-opacity-50 p-3">
                    <h2 class="display-4">{{ activeEvent.name }}</h2>
                    <h5 v-if="activeEvent.isCanceled" class="text-danger">Event Cancelled</h5>

                    <h5 class="mt-0">{{ activeEvent.location }}</h5>
                    <p>{{ activeEvent.startDate.toDateString() }}</p>
                    <p class="lead">{{ activeEvent.description }}</p>


                    <span class="badge bg-info">{{ activeEvent.capacity - activeEvent.ticketCount }} spots left</span>

                    <h5 v-if="isAttending" class="text-success">You are attending this event!</h5>

                    <!-- FIXME don't show this button, or disable it if the event is sold out OR is canceled -->
                    <button v-if="account.id" :disabled="isSoldOut" class="btn btn-warning mt-3"
                        @click="createTicket()">Grab a Ticket!</button>

                    <!-- <button v-if="account.id" class="btn btn-warning mt-3" @click="createTicket()">Grab a Ticket!</button> -->

                    <button v-if="activeEvent.creatorId === account.id" class="btn btn-warning mt-3"
                        @click="cancelEvent()">Cancel Event Sad Face</button>

                </div>
            </div>
        </div>
    </div>

    <!-- <div v-if="ticketHolders.length" class="ticket-holders">
        <h3>Ticket Holders</h3>
        <div class="profile-container">
            <div v-for="ticket in ticketHolders" :key="ticket.id" class="profile">
                <img :src="ticket.profile.picture" class="profile-picture" :alt="ticket.profile.name" />
                <span>{{ ticket.profile.name }}</span>
            </div>
        </div>
    </div> -->

    <div class="container-fluid mt-5">
        <div v-if="account.id" class="mt-3">
            <CreateCommentForm :eventId="activeEvent.id" @commentAdded="getComments" />
        </div>

        <div class="comments-list mt-3">
            <div v-for="comment in comments" :key="comment.id" class="d-flex align-items-start mb-3">
                <img :src="comment.creator.picture" class="rounded-circle me-2" :alt="comment.creator.name"
                    style="width: 40px; height: 40px;">
                <div>
                    <div class="fw-bold">{{ comment.creator.name }}</div>
                    <p>{{ comment.body }}</p>
                    <button v-if="comment.creatorId === account.id" @click="deleteComment(comment.id)">
                        Delete
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { computed, watchEffect, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { eventsService } from '../services/EventsService.js'
import { ticketsService } from '../services/TicketsService.js'
import { commentsService } from '../services/CommentsService.js'
import CreateCommentForm from '../components/CreateCommentForm.vue'

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        const newCommentText = ref('')

        watchEffect(() => {
            route.params.eventId
            getEventById()
            getEventTickets()
            getComments()
        });

        async function createTicket() {
            try {
                const ticketData = { eventId: route.params.eventId }
                const response = await ticketsService.createTicket(ticketData)
                Pop.success('Ticket successfully grabbed')
                router.push({ name: 'Account' });
            } catch (error) {
                Pop.error(error)
            }
        }

        async function createComment() {
            try {
                if (!newCommentText.value.trim()) {
                    return Pop.error('Comment cannot be empty')
                }
                await commentsService.createComment({
                    eventId: route.params.eventId,
                    content: newCommentText.value
                });
                newCommentText.value = ''
                Pop.success('Comment added!')
            } catch (error) {
                Pop.error(error)
            }
        }

        async function deleteComment(commentId) {
            try {
                await commentsService.deleteComment(commentId)
                Pop.success('Comment deleted!')
                this.getComments()
            } catch (error) {
                Pop.error('Error deleting comment')
            }
        }

        async function getComments() {
            try {
                await commentsService.getEventComments(route.params.eventId);
            } catch (error) {
                Pop.error(error);
            }
        };

        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getEventTickets() {
            try {
                await ticketsService.getEventTickets(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function cancelEvent() {
            try {
                await eventsService.cancelEvent(route.params.eventId)
                Pop.success('Event successfully cancelled')
                router.push({ name: 'Home' });
            } catch (error) {
                console.error(error)
                Pop.error(error.message || 'Failed to cancel event')
            }
        }


        return {
            activeEvent: computed(() => AppState.activeEvent),
            tickets: computed(() => AppState.tickets),
            account: computed(() => AppState.account),
            comments: computed(() => AppState.comments),
            createComment,
            getComments,
            cancelEvent,
            createTicket,
            deleteComment,

            isSoldOut: computed(() => {
                const event = AppState.activeEvent
                return event && event.ticketCount >= event.capacity
            }),

            isAttending: computed(() => {
                return AppState.tickets.some(ticket => ticket.eventId === AppState.activeEvent.id && ticket.accountId === AppState.account.id)
            }),

            // this is whether logged in user is a ticketholder
            isTicketHolder: computed(() => {
                const account = AppState.tickets.find(ticket => ticket.accountId == AppState.account.id)
                return account != undefined
            }),

        }
    },
    components: { CreateCommentForm }
}     
</script>



<style scoped>
.profile-picture {
    cursor: pointer;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover
}

.event-info {
    top: 20px;
    left: 20px;
    max-width: 500px;
}

.bg-opacity-50 {
    background-color: rgba(0, 0, 0, 0.5) !important;
}
</style>
