import { reactive } from 'vue'
import { Event } from './models/Event.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {Event{}} */
  events: [],
  /** @type {Event} */
  activeEvent: null,
  /** @type {Ticket[]} */
  tickets: [],
  /** @type {Ticket []} */
  accountTickets: [],
  /** @type {Comment[]} */
  comments: []
})
