

<template>
    <div class="container-fluid p-0">
        <div class="row no-gutters position-relative" v-if="activeEvent">
            <img :src="activeEvent.coverImg" alt="Event banner" class="img-fluid">
            <div class="col-md-6 position-absolute event-info">
                <div class="text-white bg-dark bg-opacity-50 p-3">
                    <h2 class="display-4">{{ activeEvent.name }}</h2>
                    <h5 class="mt-0">{{ activeEvent.location }}</h5>
                    <p>{{ activeEvent.startDate.toDateString() }}</p>
                    <p class="lead">{{ activeEvent.description }}</p>
                    <!-- <span class="badge bg-info">{{ activeEvent.capacity - activeEvent.ticketCount }} spots left</span> -->
                    <button v-if="account.id" class="btn btn-warning mt-3" @click="createTicket()">Grab a Ticket!</button>

                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();

        watchEffect(() => {
            getEventById();
            // getEventTickets(); // Uncomment this if needed
        });

        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId);
            } catch (error) {
                Pop.error(error);
            }
        }

        // Uncomment and use this if needed
        // async function getEventTickets() {
        //     try {
        //         await ticketsService.getEventTickets(route.params.eventId);
        //     } catch (error) {
        //         Pop.error(error);
        //     }
        // }

        async function createTicket() {
            try {
                console.log(ticketsService); // Check what methods are available
                const ticketData = { eventId: route.params.eventId };
                // Ensure that the createTicket method on your service uses an HTTP client's post method.
                const response = await ticketsService.createTicket(ticketData);
                console.log(response); // Log the response to see what you get back
                Pop.success('Ticket successfully grabbed');
                router.push({ name: 'Account' });
            } catch (error) {
                console.error(error); // Log the full error for more detail
                Pop.error(error.message || 'Failed to create a ticket');
            }
        }


        return {
            activeEvent: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            isTicketHolder: computed(() => AppState.tickets.some(ticket => ticket.accountId === AppState.account.id)),
            createTicket, // Make sure createTicket is included in the return statement
        };
    }
}
</script>



<style scoped>
.event-info {
    top: 20px;
    left: 20px;
    max-width: 500px;
}

.bg-opacity-50 {
    background-color: rgba(0, 0, 0, 0.5) !important;
}
</style>
