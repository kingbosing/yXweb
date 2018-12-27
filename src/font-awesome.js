import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faStar } from '@fortawesome/free-regular-svg-icons/faStar'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons/faAddressCard'
import { faHdd } from '@fortawesome/free-regular-svg-icons/faHdd'

import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'

import { faThumbtack } from '@fortawesome/free-solid-svg-icons/faThumbtack'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar, faEnvelope, faAddressCard, faHdd)
library.add(faThumbtack, faUser)
Vue.component('font-awesome-icon', FontAwesomeIcon)

