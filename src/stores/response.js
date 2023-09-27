import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserSelectionStore } from '@/stores/userSelection'

import prob from '@/data/prob.json'
import faqIds from '@/data/faq_ids.json'

const store = useUserSelectionStore()

export const useResponseStore = defineStore('userResponse', () => {
  const chance = computed(() =>
    Object.entries(prob)
      .sort((a, b) => b[1] - a[1])
      .slice(0, store.getNumberOfResponses)
  )

  const idOfSelectedAnswers = computed(() => chance.value.map(([id]) => id))

  const response = computed(() =>
    idOfSelectedAnswers.value.map((id) => {
      const chance = getChance(id)
      return { ...faqIds[id], id, chance }
    })
  )

  function getChance(id) {
    return chance.value.find(([_id]) => _id === id)[1].toFixed(2)
  }

  return { chance, idOfSelectedAnswers, response }
})
