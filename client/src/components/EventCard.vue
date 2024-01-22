<template>
    <router-link :to="{ path: `/eventDetails/${event.id}` }">
        <div class="event-card card mb-3 bg-primary selectable">
            <img :src="event.coverImg" class="img-fluid" :alt="`cover image for ${event.name}`" />

            <div class="bg-primary">
                <h5 class="text-center">{{ event.name }}</h5>

                <div class="text-center">
                    <b>{{ event.ticketCount }}</b>
                </div>

            </div>

        </div>
    </router-link>
</template>


<script>
import { Event } from '../models/Event.js'

export default {
    props: { event: { type: Event, required: true } },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
.event-card {
    border-radius: 15px;
    overflow: hidden;

    img {
        height: 15vh;
        object-fit: cover;
        object-position: center;
        border-top-right-radius: 16px;
        border-top-left-radius: 16px;
    }
}
</style>