<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div v-for="ticket in tickets" :key="ticket.id" class="my-tickets">
      <TicketCard :ticket="ticket" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import TicketCard from '../components/TicketCard.vue';
import { ticketsService } from '../services/TicketsService.js';

export default {
  components: {
    TicketCard,
  },
  setup() {
    onMounted(async () => {
      await ticketsService.getMyEventTickets();
    });

    const tickets = computed(() => AppState.accountTickets);

    // TODO go and Get my Tickets (events I have tickets for)
    async function getMyEventTickets() {
      try {
        await ticketsService.getMyEventTickets(route.params.eventId);
      } catch (error) {
        Pop.error(error);
      }
    }
    return {
      account: computed(() => AppState.account),
      tickets
    };
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>




