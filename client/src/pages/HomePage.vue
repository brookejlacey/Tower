<template>
  <div class="container-fluid">
    <section class="row">
      <!-- TODO this is where events go -->
    </section>
  </div>
  <div class="container">
    <section class="row">
      <!-- {{ events }} -->
      <div class="col-3" v-for="event in events" :key="event.id">
        <!-- {{ event.name }} -->
        <EventCard :event="event" />
      </div>
    </section>
  </div>
  <div class="container">
    <!-- SECTION filter bar -->

    <section class="row bg-info p-3 my-2 gap-2">
      <button class="col btn btn-outline-light" :class="{ 'bg-primary': filterBy == '' }"
        @click="filterBy = ''">all</button>
      <button class="col btn btn-outline-light" :class="{ 'bg-primary': filterBy == 'cats' }"
        @click="filterBy = 'concerts'">concerts</button>
      <button class="col btn btn-outline-light" :class="{ 'bg-primary': filterBy == 'dogs' }"
        @click="filterBy = 'conventions'">conventions</button>
      <button class="col btn btn-outline-light" :class="{ 'bg-primary': filterBy == 'games' }"
        @click="filterBy = 'sports'">sports</button>
      <button class="col btn btn-outline-light" :class="{ 'bg-primary': filterBy == 'gachamon' }"
        @click="filterBy = 'digital'">digital</button>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

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
          return AppState.events.filter(e => e.category == filterBy.value)
        } else {
          return AppState.events

        }

      })
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
