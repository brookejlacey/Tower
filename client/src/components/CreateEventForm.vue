<template>
    <div class="modal fade" id="create-event-modal" tabindex="-1" role="dialog" aria-labelledby="modalNameId"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body container-fluid">
                    <h4 class="text-primary p-2">Create An Event</h4>

                    <form class="row" @submit.prevent="createEvent()">
                        <div class="mb-3 col-6">
                            <label for="event-name">Name</label>
                            <input v-model="eventData.name" class="form-control" type="text" name="event-name"
                                id="create-event-name" required minlength="3" maxlength="30">
                        </div>
                        <div class="mb-3 col-6">
                            <label for="event-cover-image">Cover Image Link</label>
                            <input v-model="eventData.coverImg" class="form-control" type="url" name="event-cover-image"
                                id="create-event-cover-image" maxlength="500">
                        </div>

                        <div class="mb-3 col-6">
                            <label for="event-name">Type</label>
                            <select v-model="eventData.type" class="form-control" name="event-name" id="create-event-name">
                                <option selected disabled value="">select a type</option>
                                <option v-for="option in typeOptions" :value="option">{{ option }}</option>
                            </select>
                        </div>

                        <div class="mb-3 col-6">
                            <label for="event-location">Location</label>
                            <input v-model="eventData.location" class="form-control" type="text" name="event-location"
                                id="event-location" required>
                        </div>
                        <div class="mb-3 col-6">
                            <label for="event-start-date">Start Date</label>
                            <input v-model="eventData.startDate" class="form-control" type="date" name="event-start-date"
                                id="event-start-date" required>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="event-description">Description</label>
                            <textarea v-model="eventData.description" class="form-control" name="event-description"
                                id="event-description" required></textarea>
                        </div>
                        <div class="mb-3 col-6">
                            <label for="event-capacity">Capacity</label>
                            <input v-model="eventData.capacity" class="form-control" type="number" name="event-capacity"
                                id="event-capacity">
                        </div>

                        <div class="mb-3 col-6 d-flex align-items-end justify-content-end">
                            <button class="btn btn-primary">Create <i class="mdi mdi-plus"></i></button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    </div>
</template>
  
  
<script>
import { useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { ref } from 'vue'
import { Modal } from 'bootstrap';

export default {
    setup() {
        const eventData = ref({
            name: '',
            coverImg: '',
            location: '',
            startDate: '',
            description: '',
            capacity: 0,
            type: '',
            isCanceled: false
        });
        const router = useRouter()
        return {
            eventData,
            typeOptions: ['digital', 'convention', 'sport', 'concert'],
            async createEvent() {
                try {
                    const event = await eventsService.createEvent(eventData.value)
                    Pop.success('event created')
                    eventData.value = ref({})
                    Modal.getOrCreateInstance('#create-event-modal').hide()
                    router.push({ name: 'Event Details', params: { eventId: event.id } })
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>
  
  
<style lang="scss" scoped></style>