<template>
  <h6>{{ title }}</h6>
  <div class="q-pt-md">
    <input placeholder="Name" v-model.trim="name" type="text" autocomplete="off" class="label-font" aria-hidden="false">
  </div>
</template>
    
<script setup>
import { computed } from 'vue'
import { useUserSelectionStore } from '@/stores/userSelection'
const store = useUserSelectionStore()

defineProps({
  title: String
})

const name = computed({
  get() {
    return store.getName
  },
  set(value) {
    store.addName(value)
  }
})
</script>