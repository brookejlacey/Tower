<template>
    <div class="container-fluid">
        <section class="row">
            <!-- event details go here -->
            <div class="col-3" v-if="activeEvent">
                <section class="d-flex">
                    <img :src="activeEvent.coverImg" alt="cover image of event" class="img-fluid w-100">
                </section>
                <div class="h-70 w-70">
                    <div class="bg-primary rounded">
                        <h4>{{ activeEvent.name }}</h4>
                        <!-- <h5></h5> -->
                    </div>

                </div>
            </div>
            <div class="col-3 d-flex">
                <img src="" alt="">
                <h4>{{ activeEvent }}</h4>
            </div>
        </section>
    </div>
</template>


<script>
import { computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';

export default {
    setup() {
        const route = useRoute()

        watchEffect(() => {
            route.params.eventId
            getEventById()

        })


        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            activeEvent: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account)
        }
    }
}
</script>


<style lang="scss" scoped></style>