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
                @click="getEmailId(email.ID[0])"
                :class="{ active: emailId === email.ID[0] }"
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
            <ModalCom v-model:showModal="showModal" :y="y" />
            <q-list bordered separator>
              <q-item clickable v-ripple v-for="[id, data] in faqData" :key="id">
                <q-item-section>
                  <q-item-label overline>{{ data['FAQ-Title'] }}</q-item-label>
                  <q-item-label>{{ data['FAQ-Text'] }}</q-item-label>
                  <q-item-label caption>{{ data['FAQ-Solution'] }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div class="q-mb-lg q-pl-lg">
        <button class="standart"
                @click="onClick"
                :disabled="disabled"
                v-if="showBtn">Button KL
        </button>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
import ModalCom from '@/components/ModalCom.vue'
import emails from '@/data/mails.json'
import faqIds from '@/data/faq_ids.json'
import { useUserSelectionStore } from '@/stores/userSelection'
import HeaderCom from "@/components/HeaderCom.vue";

const store = useUserSelectionStore()

const { name, getPieceIntelligence } = toRefs(store)

const faqData = computed(() => Object.entries(faqIds))
const disabled = computed(() => !emailId.value)
const showBtn = computed(() => getPieceIntelligence.value === 'yes')

const showModal = ref(false)
const title = computed(() => (showModal.value ? name.value : 'FAQ'))
const emailId = ref(null)
const el = ref(null)
const y = ref(0)

const getEmailId = (id) => {
  emailId.value = id
}

const onClick = () => {
  showModal.value = true
}

const onScroll = () => {
  y.value = el.value.scrollTop
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
  background: #daddf1;
}
</style>
