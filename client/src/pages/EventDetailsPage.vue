<template>
    <div class="container-fluid">
        <section class="row">
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