<template>
  <h6>{{ title }}</h6>
  <div>
    <div class="q-gutter-sm">
      <q-radio keep-color dark v-model="shape" size="lg" val="yes" label="Yes" color="blue" />
      <q-radio keep-color dark v-model="shape" size="lg" val="no" label="No" color="blue" />
    </div>
  </div>
</template>
    
<script setup>
import { computed } from 'vue'
import { useUserSelectionStore } from '@/stores/userSelection'
const store = useUserSelectionStore()

defineProps({
  title: String
})

const shape = computed({
  get() {
    return store.getMarkTheAnswer
  },
  set(value) {
    store.addMarkTheAnswer(value)
  }
})
</script>