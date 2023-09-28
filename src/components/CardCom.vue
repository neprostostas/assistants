<template>

  <q-list bordered separator>
    <q-item clickable @click="toggleActive" class="item-ai">
      <q-item-section>
        <div class="row items-center">
          <q-item-label overline>{{ item.id }}:</q-item-label>
          <q-btn flat round dense v-if="symbol" :icon="symbol" size="xs" />
          <q-item-label v-else overline style="margin-top: 0; padding-left: 5px">{{ item.chance }}</q-item-label>
        </div>
        <q-item-label style="margin-top: 4px;">{{ item['FAQ-Title'] }}</q-item-label>
        <q-item-label caption>{{ item['FAQ-Text'] }} | {{ item['FAQ-Solution'] }}</q-item-label>
      </q-item-section>
      <q-item-section @click.stop style="margin: 0!important;">
        <q-btn @click="toggleTextColor"
               :class="buttonClass"
               class="mark-custom" unelevated color="orange" text-color="white" size="xs" icon="flag" v-if="mark" />
      </q-item-section>
    </q-item>
  </q-list>

</template>

<script>
import {computed, ref, watch} from 'vue'
import { useUserSelectionStore } from '@/stores/userSelection'
export default {
  props: {
    item: Object,
    id: Number,
    isActive: Boolean,
    activeCard: String,
  },
  emits: ['toggleActive'],
  setup(props, {emit}) {

    const store = useUserSelectionStore()

    const symbol = computed(() => store.getSymbol)
    const mark = computed(() => store.getMarkTheAnswer === 'yes')
    let flag = computed(() => store.getFlagTheAnswer === 'no')

    const toggleActive = () => {
      emit('toggleActive', props.item)
    }

    const textColorChanged = ref(false);
    const activeCardId = ref(null);

    const toggleTextColor = () => {

      if (props.item.id === props.activeCard) {
        // Toggle the textColorChanged ref to change text color
        textColorChanged.value = !textColorChanged.value;
        flag = store.addFlagTheAnswer('yes');
      } else {
        // Reset text color for the previously active card
        textColorChanged.value = false;
        activeCardId.value = props.item.id;
        flag = store.addFlagTheAnswer('no');
      }

    };

    // Watch for changes in the active card prop and reset text color accordingly
    watch(() => props.activeCard, (newActiveCard) => {
      if (newActiveCard !== props.item.id) {
        textColorChanged.value = false;
        flag = store.addFlagTheAnswer('no');
      }
    });

    const buttonClass = computed(() => ({
      'text-black': textColorChanged.value,
    }));

    return {
      toggleTextColor,
      buttonClass,
      store,
      symbol,
      mark,
      toggleActive
    }
  }
}
</script>

<style scoped>
.mark-custom {
  display: inline-block;
}
.item-ai {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
}
.text-black {
  color: black;
}
</style>