<template>
    <footer class="items-center p-4 pl-12 footer bg-neutral text-neutral-content">
        <div class="items-center grid-flow-col">
            <h1 class="flex w-full p-4 text-3xl">Approval Rating</h1>
        </div>
    </footer>
    <ChartsView :data="data" :options="options" />
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue";
import ChartsView from "../components/ChartsView.vue"
import axios from "axios"

const data = ref([] as any);
const options = ref([] as any);

onMounted(async () => {
    const { data: res } = await axios.get("https://projects.fivethirtyeight.com/biden-approval-rating/approval.json")
    let labels = [];
    let dataset_approve = [];
    let dataset_disapprove = [];

    for (const d of res.reverse()) {
        labels.push(d.date);
        dataset_approve.push(d.approve_estimate)
        dataset_disapprove.push(d.disapprove_estimate)
    }

    for (let i = 0; i < 25; i++) {
        labels.push(1)
    }


    data.value.push({
        labels: labels,
        datasets: [
            {
                label: 'Approval',
                borderColor: '#002868',
                backgroundColor: '#002868',
                data: dataset_approve
            },
            {
                label: 'Disapproval',
                borderColor: '#bf0a30',
                backgroundColor: '#bf0a30',
                data: dataset_disapprove
            }
        ],
        source: "https://projects.fivethirtyeight.com/biden-approval-rating/"
    })

    options.value.push({
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                text: 'Joe Biden Presidential Approval Rating',
                padding: {
                    top: 10,
                    bottom: 30
                },
                font: {
                    size: 24
                }
            },
            legend: {
                labels: {
                    useBorderRadius: true,
                    borderRadius: 8,

                },
                position: "bottom",

            },
            datalabels: {
                display: function (context) {
                    return context.dataIndex === dataset_approve.length - 1;
                },
                color: 'black',
                anchor: 'end',
                offset: 10,
                align: 'end',
                formatter: function (value) {
                    return Math.round(value) + '%';
                },

            }

        },
        elements: {
            point: {
                radius: 1
            }
        },
        ticks: {
            maxTicksLimit: 5
        },
        scales: {
            x: {
                title: {
                    display: true,
                    type: 'time',
                    time: {
                        parser: 'YYYY-MM-DD',
                        unit: 'month',
                        unitStepSize: 1,
                        displayFormats: {
                            'day': 'MM/YYYY'
                        }

                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Percent approval/disapproval"
                }
            }
        }
    })



})



</script>
