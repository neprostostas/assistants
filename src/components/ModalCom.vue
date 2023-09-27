<template>
  <q-card class="my-cards" v-show="showModal" :style="{ top: pY }">
    <q-separator />

    <q-card-section class="scroll card-section">
      <Card v-for="item in response" :key="item['FAQ-Text']" :item="item" />
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="Close" color="primary" @click="closePopup" />
    </q-card-actions>
  </q-card>
</template>
  
<script setup>
import { computed, toRefs } from 'vue'
import Card from '@/components/CardCom.vue'
import { useResponseStore } from '@/stores/response'

const storeRes = useResponseStore()

const { response } = toRefs(storeRes)

const props = defineProps({
  showModal: Boolean,
  y: Number
})
const emit = defineEmits(['update:showModal'])
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
}
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
</style>