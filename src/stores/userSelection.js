import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserSelectionStore = defineStore('userSelection', () => {
  const symbol = ref(null)
  const getSymbol = computed(() => symbol.value)
  function addSymbol(value) {
    symbol.value = value
  }
  /*------*/
  const markerType = ref('number')
  const getMarkerType = computed(() => markerType.value)
  function addMarkerType(value) {
    markerType.value = value
  }
  /*------*/
  const name = ref('Poly')
  const getName = computed(() => name.value)
  function addName(value) {
    name.value = value
  }
  /*------*/
  const pieceIntelligence = ref('yes')
  const getPieceIntelligence = computed(() => pieceIntelligence.value.toLowerCase())
  function addPieceIntelligence(value) {
    pieceIntelligence.value = value
  }
  /*------*/
  const numberOfResponses = ref(3)
  const getNumberOfResponses = computed(() => numberOfResponses.value)
  function addNumberOfResponses(value) {
    numberOfResponses.value = value
  }
  /*------*/
  const markTheAnswer = ref('yes')
  const getMarkTheAnswer = computed(() => markTheAnswer.value)
  function addMarkTheAnswer(value) {
    markTheAnswer.value = value
  }
  /*------*/
  const data = ref({
    0: {
      subDataId: ''
    },
    1: {
      subDataId: ''
    }
  })
  const getData = computed(() => data.value)
  function addData({ id, subDataId }) {
    data.value[id].subDataId = subDataId
  }
  return {
    symbol,
    getSymbol,
    addSymbol,
    markerType,
    getMarkerType,
    addMarkerType,
    name,
    getName,
    addName,
    pieceIntelligence,
    getPieceIntelligence,
    addPieceIntelligence,
    numberOfResponses,
    getNumberOfResponses,
    addNumberOfResponses,
    markTheAnswer,
    getMarkTheAnswer,
    addMarkTheAnswer,
    data,
    getData,
    addData
  }
})
