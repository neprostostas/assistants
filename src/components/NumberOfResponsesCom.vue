<template>
  <h6 class="pb-10">{{ title }}</h6>
  <div class="q-mb-xl number-response">
    <input placeholder="Count" v-model.number="number" type="number" autocomplete="off" class="label-font" aria-hidden="false">
  </div>
</template>
  
<script setup>
import { computed } from 'vue'
import { useUserSelectionStore } from '@/stores/userSelection'
const store = useUserSelectionStore()

defineProps({
  title: String
})

const number = computed({
  get() {
    return store.getNumberOfResponses
  },
  set(value) {
    store.addNumberOfResponses(value)
  }
})
</script>