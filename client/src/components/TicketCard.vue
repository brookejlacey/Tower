<template>
    <div class="ticket-card">
        <div class="card">
            <div class="card-header">
                Ticket for {{ ticket.event.name }}
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ ticket.event.name }}</h5>
                <p class="card-text">{{ ticket.event.description }}</p>
                <p class="card-text">Date: {{ new Date(ticket.event.startDate).toLocaleDateString() }}</p>
                <p class="card-text">Location: {{ ticket.event.location }}</p>
            </div>
            <button @click="deleteTicket(ticket.id)" class="btn btn-warning position-absolute top-0">Cancel Attendance<i
                    class="mdi mdi-heart-broken"></i></button>
        </div>
    </div>
</template>
  
<script>
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js'

export default {
    props: {
        ticket: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async deleteTicket(ticketId) {
            try {
                await ticketsService.deleteTicket(ticketId);
                Pop.success('Ticket successfully cancelled');
            } catch (error) {
                Pop.error(error.message || 'Failed to cancel ticket');
            }
        }
    }
};
</script>
  
<style scoped>
.ticket-card {
    border-radius: 15px;
    overflow: hidden;
}
</style>
  