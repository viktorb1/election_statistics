<template>
    <div class="flex flex-col justify-center h-full">
        <div class="flex justify-center w-full gap-2 py-10">
            <span v-for="(d, index) in data" :key="index">
                <a :href="`#graph${index + 1}`" class="btn btn-sm">{{ index + 1 }}</a>
            </span>
        </div>
        <div class="w-full carousel">
            <div :id="`graph${index + 1}`" class="flex flex-col items-center justify-center w-full carousel-item"
                v-for="(d, index) in data" :key="index">
                <Line :data="data[index]" :options="options[index]" :width="700" :height="500" />
                <button class="mt-10"><a :href="data[index].source" class="btn" target="_blank">Source</a></button>
            </div>
        </div>



    </div>
</template>

<script setup lang="ts">
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useRoute, useRouter } from 'vue-router';
import { onUpdated } from 'vue';


Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend
)

Chart.defaults.color = '#000';
Chart.defaults.borderColor = '#ededed';
Chart.defaults.font.size = 20

const props = defineProps(['data', 'options'])
const route = useRoute()


onUpdated(() => {
    let element = document.getElementById(route.hash.slice(1));

    console.log("asdfasdf")
    if (element) {
        console.log("scrolling into view")
        element.scrollIntoView();
    }


})

</script>

