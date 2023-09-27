<template>
  <h6 class="pb-10">{{ title }}</h6>
  <div class="row mb-60">
    <div :class="addClassEl(name)" v-for="{ id, name } in icons" :key="id" @click="onClick(name)">
      <q-btn flat round dense :icon="name" class="icon-cust q-mr-sm" />
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useUserSelectionStore } from '@/stores/userSelection'
const props = defineProps({
  icons: Array,
  title: String
})
const store = useUserSelectionStore()

const icons = computed(() => props.icons)
const title = computed(() => props.title)

const onClick = (name) => {
  store.addSymbol(name)
}

const addClassEl = (name) => {
  return name === store.getSymbol ? 'blue' : '--q-info'
}

watch(
  () => store.getSymbol,
  (val) => {
    if (val) store.addMarkerType('icon')
  }
)
</script>

<style scoped>

.mb-60 {
  margin-bottom: 60px;
}

.blue {
  color: rgb(9 118 224 / 83%)
}

</style>