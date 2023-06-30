<template>
  <div class="flex">

    <div class="flex">
      <div class="h-screen windowpane" :class="{ closed: !showPanel }">
        <div class="flex flex-col items-center justify-center h-full bg-base-200 panel w-96 ">
          <h1
            class="p-4 mb-10 text-5xl font-extrabold text-center text-black border-4 border-black bg-base-200 w-80 rounded-xl">
            Election Statistics
          </h1>
          <nav>
            <ul class="border-4 border-black bg-base-200 w-80 menu rounded-box">
              <li><router-link to="/approval" class="mb-2 text-lg" active-class="active">Approval Rating</router-link>
              </li>
              <li><router-link to="/demographics" class="mb-2 text-lg" active-class="active">Demographics</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="relative w-0">
        <button class="py-2 mt-2 border-t-2 border-b-2 border-r-2 rounded-r-lg border-base-900 bg-base-200 w-15 h-fit">
          <font-awesome-icon icon="fa-solid fa-bars" class="w-10 text-2xl " @click="togglePanel" />
        </button>
      </div>
    </div>

    <div class="flex flex-col items-center justify-between w-full min-h-screen overflow-hidden">
      <RouterView />
      <footer class="items-center p-4 footer bg-neutral text-neutral-content">
        <div class="items-center grid-flow-col">
          <p>Copyright © 2023</p>
        </div>
      </footer>
    </div>


  </div>
</template>


<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue"
import { useRouter, useRoute } from 'vue-router'


const showPanel = ref(true)
const route = useRoute()
console.log(route.path)
const togglePanel = () => {
  showPanel.value = !showPanel.value;
}

const checkScreenSize = () => {
  if (window.innerWidth < 1100) {
    showPanel.value = false;
  } else {
    showPanel.value = true;
  }
}

const categories = reactive([
  { name: 'Economy', path: '/economy' },
  { name: 'Healthcare', path: '/healthcare' },
  { name: 'Education', path: '/education' },
  { name: 'Commodities', path: '/commodities' },
  { name: 'Environment', path: '/environment' },
  { name: 'Housing', path: '/housing' },
  { name: 'Food', path: '/food' }
])

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
})



</script>





<style scoped>
.windowpane {
  transition: all .5s;
  transform: translateX(0);
  @apply w-96
}

.windowpane.closed {
  @apply -translate-x-96;
  width: 0;
}

.panel {
  background-size: cover;
  background-image: linear-gradient(135deg, #bf0a30 16.67%, #ffffff 16.67%, #ffffff 33.33%, #002868 33.33%, #002868 50%, #bf0a30 50%, #bf0a30 66.67%, #ffffff 66.67%, #ffffff 83.33%, #002868 83.33%, #002868 100%);
  background-size: 339.41px 339.41px;
}
</style>
