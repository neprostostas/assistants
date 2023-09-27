<template>
  <q-menu class="hidden-menu">
    <q-list dense style="min-width: 100px">
      <q-item clickable v-close-popup v-for="{ link, id } in links" :key="id" @click="onClick(id)">
        <q-item-section>{{ link }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  links: Array,
  dataId: Number,
  id: String
})
const emit = defineEmits(['onLinkClick'])

const links = computed(() => props.links)

const onClick = (subDataId) => emit('onLinkClick', { subDataId, id: props.dataId })

</script>

<style>

.hidden-menu .q-item {
  font-style: normal;
  font-weight: 500;
  font-size: 15px!important;
  line-height: 140%;
  text-transform: uppercase;
  color: #0c2935;
  padding: 9px 12px;
}

</style>