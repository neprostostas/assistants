<template>
  <h6>{{ title }}</h6>
  <div>
    <div class="q-gutter-sm">
      <q-radio keep-color dark v-model="shape" size="lg" val="icon" label="Icon" color="blue" />
      <q-radio keep-color dark v-model="shape" size="lg" val="number" label="Number" color="blue" />
    </div>
  </div>
</template>
  
<script setup>
import { computed, watch } from 'vue'
import { useUserSelectionStore } from '@/stores/userSelection'
const store = useUserSelectionStore()

defineProps({
  title: String
})

const shape = computed({
  get() {
    return store.getMarkerType
  },
  set(value) {
    store.addMarkerType(value)
  }
})

watch(
  () => shape.value,
  (val) => {
    if (val === 'number') store.addSymbol(null)
  }
)
</script>