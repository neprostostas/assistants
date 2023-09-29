<template>
  <HeaderCom title="Admin panel" />
  <q-page-container>
    <q-page class="q-pa-md my-container">
      <div class="row">
        <div class="col">
          <h4 class="q-mb-sm">Email</h4>
          <div class="q-pa-md my-col">
            <q-list bordered separator>
              <q-item
                  clickable
                  v-ripple
                  v-for="email in emails"
                  :key="email.ID['0']"
                  @click="handleEmailClick(email.ID[0])"
                  :class="{ active: isSelectedEmail(email.ID[0]), unclickable: isSelectedEmailInArray(email.ID[0]) }"
              >
                <q-item-section>
                  <q-item-label overline>{{ email['Titel']['0'] }}</q-item-label>
                  <q-item-label>{{ email['Mail-Adresse']['0'] }}</q-item-label>
                  <q-item-label caption>{{ email['Text']['0'] }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="col">
          <h4 class="q-mb-sm">{{ title }}</h4>
          <div
              class="q-pa-md my-col"
              ref="el"
              :class="{ 'no-scroll': showModal }"
              @scroll="onScroll"
          >
            <ModalCom v-model:showModal="showModal" :y="y" @getDataModal="handleDataFromModal" />
            <q-list bordered separator>
              <template v-for="[id, data] in faqData" :key="id">
                <q-item class="item-manual" @click="handleFaqClick(id, data)" clickable v-ripple :class="{ active: isSelectedFaq(id) }">
                  <q-item-section>
                    <q-item-label overline>{{ data['FAQ-Title'] }}</q-item-label>
                    <q-item-label>{{ data['FAQ-Text'] }}</q-item-label>
                    <q-item-label caption>{{ data['FAQ-Solution'] }}</q-item-label>
                  </q-item-section>
                  <q-item-section @click.stop style="margin: 0!important;">
                    <q-btn
                        @click="toggleTextColor(id)"
                        :class="{'mark-custom': mark, 'text-black': isSelectedFaq(id) && isSelectedButton(id)}"
                        unelevated
                        color="orange"
                        text-color="white"
                        size="xs"
                        icon="flag"
                        v-if="mark"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </div>
        </div>
      </div>
      <div class="q-mb-lg q-pl-lg q-gutter-lg">
        <button class="standart"
                @click="onClick"
                :disabled="disabled"
                v-if="showBtn">Button KL
        </button>
        <button class="standart"
                @click="sendData"
                :disabled="disabledSendData">Send Data
        </button>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import {computed, onMounted, ref, toRefs, watch, watchEffect} from 'vue'
import ModalCom from '@/components/ModalCom.vue'
import emails from '@/data/mails.json'
import faqIds from '@/data/faq_ids.json'
import { useUserSelectionStore } from '@/stores/userSelection'
import HeaderCom from "@/components/HeaderCom.vue";
import axios from "axios";

const store = useUserSelectionStore()


const mark = computed(() => store.getMarkTheAnswer === 'yes')
let flag = computed(() => store.getFlagTheAnswer === 'no')


const selectedButtonId = ref(null); // To store the ID of the selected button

const toggleTextColor = (id) => {
  // Check if the parent q-item with the given ID is already selected
  if (isSelectedFaq(id)) {
    // Toggle the selected state of the button
    selectedButtonId.value = isSelectedButton(id) ? null : id;
    flag = store.addFlagTheAnswer('yes');
  } else {
    // Select the new parent q-item and reset the selected button
    selectedFaqId.value = id;
    selectedButtonId.value = null;
    flag = store.addFlagTheAnswer('no');
  }
};

const isSelectedButton = (id) => {
  // Check if the button with the given ID is selected
  return selectedButtonId.value === id;
};

onMounted(() => {
  // Initialize the flag when the component is mounted
  store.addFlagTheAnswer('no');

  // Watch for changes in the selectedFaqId and set flag accordingly
  watch(selectedFaqId, (newFaqId) => {
    if (newFaqId) {
      store.addFlagTheAnswer('no');
    }
  });
});

const { name, getPieceIntelligence } = toRefs(store)

const faqData = computed(() => Object.entries(faqIds))

const disabledSendData = computed(() => (!emailId.value || !faqID.value) && (!emailId.value || !modalAIData.value) )

const disabled = computed(() => !emailId.value)
const showBtn = computed(() => getPieceIntelligence.value === 'yes')

const showModal = ref(false)
const title = computed(() => (showModal.value ? name.value : 'FAQ'))

const emailId = ref(null)
const selectedEmailId = ref(null)

const faqID = ref(null)
const selectedFaqId = ref(null)

const modalAIData = ref(null)

const faqTitle = ref(null)
const faqText = ref(null)
const faqSolution = ref(null)

const el = ref(null)
const y = ref(0)

const getEmailId = (id) => {
  emailId.value = id
  selectedEmailId.value = id
}

const handleEmailClick = (id) => {
  if (isSelectedEmail(id)) {
    selectedEmailId.value = null
    emailId.value = null
  } else {
    getEmailId(id)
  }

}

const isSelectedEmail = (id) => {
  return selectedEmailId.value === id
}

const getFaqInfo = (id, data) => {
  faqID.value = id
  faqTitle.value = data['FAQ-Title']
  faqText.value = data['FAQ-Text']
  faqSolution.value = data['FAQ-Solution']
}

const handleFaqClick = (id, data) => {
  if (isSelectedFaq(id)) {
    selectedFaqId.value = null
    resetFaqInfo()
  } else {
    selectFaq(id, data)
  }
}

const isSelectedFaq = (id) => {
  return selectedFaqId.value === id
}

const selectFaq = (id, data) => {
  selectedFaqId.value = id
  getFaqInfo(id, data)
}

const resetFaqInfo = () => {
  faqID.value = null
  faqTitle.value = null
  faqText.value = null
  faqSolution.value = null
}

const onClick = () => {
  showModal.value = true
}

const onScroll = () => {
  y.value = el.value.scrollTop
}

watchEffect(() => {
  if (showModal.value) {
    resetFaqInfo()
    selectedFaqId.value = null
  }
})

const handleDataFromModal = (item) => {
  modalAIData.value = item
}

const isSelectedEmailInArray = (emailId) => {
  // Check if the email ID is present in the selectedEmailIdBeforeSendData array
  return selectedEmailIdBeforeSendData.value.includes(emailId);
}
const selectedEmailIdBeforeSendData = ref([])

const sendData = async () => {

  // Add the selected email ID to the array
  selectedEmailIdBeforeSendData.value.push(selectedEmailId.value);
  selectedEmailId.value = null;

  let payload = {}

  const store = useUserSelectionStore()
  const flag = computed(() => store.getFlagTheAnswer)

  // Create an object with the values of ref objects
  if (!modalAIData.value) {
    payload = {
      ai: false,
      flag: flag.value,
      emailId: emailId.value,
      faqID: faqID.value,
      faqTitle: faqTitle.value,
      faqText: faqText.value,
      faqSolution: faqSolution.value,
    };
  } else {
    payload = {
      ai: true,
      flag: flag.value,
      chance: modalAIData.value.chance,
      emailId: emailId.value,
      faqID: modalAIData.value.id,
      faqTitle: modalAIData.value['FAQ-Title'],
      faqText: modalAIData.value['FAQ-Text'],
      faqSolution: modalAIData.value['FAQ-Solution'],

    };
  }

  console.log("data: ", payload);

  try {
    // Try making the Axios request
    const response = await axios.post('YOUR_API_ENDPOINT', payload);
    console.log("Response from server:", response.data);
  } catch (error) {
    // Handle network errors generically and suppress the warning
    if (!error.response || error.response.status !== 404) {
      console.error("Error sending data:", error);
    }
  }

  showModal.value = false

}

</script>
<style scoped>
.col {
  margin: 24px;
}
.my-col {
  border: 1px solid #ccc;
  min-height: 200px;
  max-height: calc(100vh - 287px);
  overflow-y: auto;
  position: relative;
}
.active {
  background: #f1bf3c45;
}
.item-manual {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
}
.unclickable {
  pointer-events: none;
  background-color: #a7a6aa;
}
</style>