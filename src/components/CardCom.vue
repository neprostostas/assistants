<template>
  <q-card class="my-card clickable" @click="toggleActive">
    <q-card-section>
      <div class="row items-center">
        <span class="q-pr-sm">{{ item.id }}:</span>
        <q-btn flat round dense v-if="symbol" :icon="symbol" class="q-mr-sm" />
        <p v-else class="text">{{ item.chance }}</p>
      </div>
      <h6 class="q-mb-sm">{{ item['FAQ-Title'] }}</h6>
      <p class="q-mb-sm">{{ item['FAQ-Text'] }}</p>
      <p>{{ item['FAQ-Solution'] }}</p>
      <div class="row q-mt-md my-list">
<!--        <q-btn unelevated color="primary" label="text" />-->
        <q-btn unelevated color="primary" icon="flag" v-if="mark" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed } from 'vue'
import { useUserSelectionStore } from '@/stores/userSelection'
export default {
  props: {
    item: Object,
    id: Number,
    isActive: Boolean,
  },
  emits: ['toggleActive'],
  setup(props, {emit}) {

    const store = useUserSelectionStore()

    const symbol = computed(() => store.getSymbol)
    const mark = computed(() => store.getMarkTheAnswer === 'yes')

    const toggleActive = () => {
      emit('toggleActive', props.item)
    }

    return {
      store,
      symbol,
      mark,
      toggleActive
    }
  }
}
</script>


<style scoped>
.my-card + .my-card {
  margin-top: 15px;
}
.my-list {
  gap: 15px;
  justify-content: flex-end;
}
.text {
  margin: 0;
}
.clickable {
  cursor: pointer;
}
</style>