<template>
  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-event-modal">create event <i
      class="mdi mdi-plus-circle"></i></button>
  <CreateEventForm />

  <!-- FIXME where are my containers?? -->

  <section class="row bg-info p-3 my-2 gap-2">

    <button class="col btn btn-outline-light" :class="{ 'bg-primary': filterBy == '' }"
      @click="filterBy = ''">all</button>

    <button class="col btn btn-outline-light" :class="{ 'bg-primary': filterBy == 'concert' }"
      @click="filterBy = 'concert'">concerts</button>

    <button class="col btn btn-outline-light" :class="{ 'bg-primary': filterBy == 'convention' }"
      @click="filterBy = 'convention'">conventions</button>

    <button class="col btn btn-outline-light" :class="{ 'bg-primary': filterBy == 'sport' }"
      @click="filterBy = 'sport'">sports</button>

    <button class="col btn btn-outline-light" :class="{ 'bg-primary': filterBy == 'digital' }"
      @click="filterBy = 'digital'">digital</button>
  </section>

  <section class="row">
    <div class="col-6 col-md-3" v-for="event in events" :key="event.id" v-if="events.length">
      <EventCard :event="event" />
    </div>
    <div v-else>No events here 🤷</div>
  </section>
</template>

<script>
import { computed, onMounted, popScopeId, ref } from 'vue';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';

export default {
  setup() {
    onMounted(() => {
      getAllEvents()
    })
    const filterBy = ref('')
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      filterBy,
      events: computed(() => {
        if (filterBy.value) {
          return AppState.events.filter(e => e.type == filterBy.value)
        } else {
          return AppState.events

        }

      }),
      accountTickets: computed(() => AppState.accountTickets),
      async deleteTicket(ticketId) {
        try {
          await ticketsService.deleteTicket(ticketId)
          Pop.success('no mas ticketes')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
