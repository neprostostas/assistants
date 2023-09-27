<template>
  <q-header class="header-admin">
    <div class="my-container q-pb-md q-pt-md">
      <router-link to="/">
        <h4 class="title-h4">{{ title }}</h4>
      </router-link>
    </div>
  </q-header>
</template>
<script setup>
defineProps({
  title: String
})
</script>

<style scoped>

.title-h4:hover {
  background: #f4f4f4;
  border-radius: 4px;
  transition: .3s;
}

.header-admin {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: #fff;
}

.header-admin:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  transform: scaleX(2);
  width: 100vw;
  background: #FFFFFF;
  z-index: -1;
  box-shadow: 0 8px 16px #eaebef80;
}

.title-h4 {
  display: inline-block;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  text-transform: uppercase;
  color: #0c2935;
  padding: 9px 12px;
}

</style>