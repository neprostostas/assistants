<template>
  <HeaderCom title="Admin panel" />
  <main>
    <q-page-container>
      <q-page class="q-pa-md mt-40 my-container">

        <div class="row">
          <div class="col q-mb-lg">
            <h2 class="headline-line left headline-font-two" style="color: #000">Configure Our Assistant</h2>
          </div>
        </div>

        <div class="q-py-lg border-bt-blue one">

          <p class="serviceNumber one">01</p>
          <hr class="greyLine">
          <div class="coverInfo buttons">
            <q-btn class="cust-select" :label="btnLabel1">
              <img src="../assets/icons/dropDownIconLightBlue.svg" alt="arrow icon" class="servicesArrow1">
              <HiddenMenuCom :links="data1.data" :dataId="data1.id" @onLinkClick="onLink1Click" />
            </q-btn>
            <q-btn class="cust-select" :label="btnLabel2">
              <img src="../assets/icons/dropDownIconLightBlue.svg" alt="arrow icon" class="servicesArrow2">
              <HiddenMenuCom :links="data2.data" :dataId="data2.id" @onLinkClick="onLink2Click" />
            </q-btn>
          </div>

        </div>

        <div class="q-py-lg border-bt-blue">
          <p class="serviceNumber">02</p>
          <hr class="greyLine two">
          <div class="coverInfo">
            <div class="col q-mb-lg">
              <ListOfIcons :icons="icons" title="Change characters" />
              <SelectingMarkerType title="Replacing symbols with numbers" />
            </div>
            <div class="col q-mb-lg">
              <NumberOfResponses title="Number of suggested answers" />
              <MarkingResponses title="Answer marking" />
            </div>
          </div>
        </div>

        <div class="q-py-lg border-bt-blue">
          <p class="serviceNumber">03</p>
          <hr class="greyLine three">
          <div class="coverInfo">
            <div class="col q-mb-lg">
              <AddName title="Change name" />
            </div>
            <div class="col q-mb-lg">
              <SelectIntelligenceType title="Activation of AI" />
              <button class="standart" @click="onClick">Next page</button>
            </div>
          </div>
        </div>

      </q-page>
    </q-page-container>
  </main>
  <Loader :toggle="toggle" />
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeaderCom from '@/components/HeaderCom.vue'
import ListOfIcons from '@/components/ListOfIconsCom.vue'
import SelectingMarkerType from '@/components/SelectingMarkerTypeCom.vue'
import NumberOfResponses from '@/components/NumberOfResponsesCom.vue'
import MarkingResponses from '@/components/MarkingResponsesCom.vue'
import SelectIntelligenceType from '@/components/SelectIntelligenceTypeCom.vue'
import HiddenMenuCom from '@/components/HiddenMenuCom.vue'
import Loader from '../components/LoaderCom.vue'
import AddName from '@/components/AddNameCom.vue'
import fullData from '../data/menu.json'
import icons from '@/data/icons.json'
import { useUserSelectionStore } from '@/stores/userSelection'

const store = useUserSelectionStore()
const router = useRouter()

const data1 = computed(() => fullData[0])
const data2 = computed(() => fullData[1])
const btnText1 = ref(fullData[0].data[0].link)
const btnText2 = ref(fullData[1].data[0].link)
const toggle = ref(false)

const btnLabel1 = ref("Choose 1 DB");
const btnLabel2 = ref("Choose 2 DB");

const onClick = () => {
  toggle.value = true
  setTimeout(() => {
    toggle.value = false
    router.push({
      name: 'offer'
    })
  }, 1000)
}

const onLink1Click = (payload) => {
  store.addData(payload);
  // Update the btnLabel with the selected text
  btnLabel1.value = fullData[0].data[payload.subDataId].link;
};

const onLink2Click = (payload) => {
  store.addData(payload)
  // Update the btnLabel with the selected text
  btnLabel2.value = fullData[1].data[payload.subDataId].link;
}

</script>


<style scoped>

.mt-40 {
  margin-top: 30px;
}

.servicesArrow1, .servicesArrow2 {
  height: 24px;
  width: 25px;
  transition: .5s;
  transform: scaleY(-1);
}

.cust-select:hover :is(.servicesArrow1, .servicesArrow2) {
  transform: scaleY(1);
}

.coverInfo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
}

.coverInfo.buttons {
  align-items: center;
}

.coverInfo.buttons button {
  width: 270px;
  height: 40px;
}

</style>