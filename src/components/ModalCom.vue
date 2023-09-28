<template>
  <q-card class="my-cards" v-show="showModal" :style="{ top: pY }">
    <q-separator />

    <q-card-section class="scroll card-section">
      <Card
          v-for="(item, id) in response"
          :key="item['FAQ-Text']"
          :item="item"
          :active-card="activeCardId"
          :id="id"
          :class="{ active: activeCardId === item.id }"
          @toggleActive="setActiveCard(item)"
      />
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="Close" color="orange" @click="closePopup" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed, toRefs, ref } from 'vue'
import Card from '@/components/CardCom.vue'
import { useResponseStore } from '@/stores/response'

const storeRes = useResponseStore()

const { response } = toRefs(storeRes)

const props = defineProps({
  showModal: Boolean,
  y: Number
})
const emit = defineEmits(['update:showModal', 'getDataModal'])
const showModal = computed({
  get() {
    return props.showModal
  },
  set(value) {
    emit('update:showModal', value)
  }
})

const pY = computed(() => props.y + 'px')
const closePopup = () => {
  showModal.value = false
  activeCardId.value = null;
}

const activeCardId = ref('');

const setActiveCard = (item) => {

  if (activeCardId.value === item.id) {
    // If the clicked card is the same as the previously active one, remove the "active" class
    activeCardId.value = null;
    item = null;
  } else {
    activeCardId.value = item.id;
  }
  emit('getDataModal', item)
};
</script>

<style scoped>
.my-cards {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 200;
}
.card-section {
  height: calc(100% - 50px);
}
.active {
  background: #f1bf3c45;
}
</style>