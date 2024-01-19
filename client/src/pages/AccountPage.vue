<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div v-for="ticket in tickets" :key="ticket.id" class="my-tickets">
    <TicketCard :ticket="ticket" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import TicketCard from '../components/TicketCard.vue';

export default {
  components: {
    TicketCard,
  },
  setup() {
    const tickets = computed(() => AppState.tickets);

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






<!-- <template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div v-for="ticket in tickets" :key="ticket.id" class="my-tickets">
      <TicketCard :ticket="ticket" />
    </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import TicketCard from './TicketCard.vue';

export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style> -->
