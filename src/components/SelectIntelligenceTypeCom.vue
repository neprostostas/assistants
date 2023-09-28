<template>
  <h6>{{ title }}</h6>
  <div class="q-pa-sm">
    <div class="q-gutter-sm one">
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
    return store.getPieceIntelligence
  },
  set(value) {
    store.addPieceIntelligence(value)
  }
})
</script>

<style scoped>


</style>