<template>
    <footer class="items-center p-4 pl-12 footer bg-neutral text-neutral-content">
        <div class="items-center grid-flow-col">
            <h1 class="flex w-full p-4 text-3xl">Demographics</h1>
        </div>
    </footer>
    <ChartsView :data="data" :options="options" />
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue";
import ChartsView from "../components/ChartsView.vue"
import axios from "axios"
import { useRoute } from "vue-router";
const route = useRoute()

const data = ref([] as any);
const options = ref([] as any);

onMounted(async () => {
    let { data: res } = await axios.post("https://a.usafacts.org/graphql/", {
        query: '{metric(id: 12818) {data {value}}}'
    })

    res = res.data.metric.data

    res = res.flatMap(d => Object.values(d));

    let labels = [];
    for (var x = 1900; x < 2022; x++) {
        labels.push(x);
    }

    for (let x = 0; x < 12; x++) {
        labels.push("")
    }


    data.value.push({
        labels: labels,
        datasets: [
            {
                label: 'Population',
                borderColor: '#002868',
                backgroundColor: '#002868',
                data: res
            }
        ],
        source: "https://usafacts.org/data/topics/people-society/population-and-demographics/population-data/population/"
    })

    options.value.push({
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                text: 'U.S. Population',
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
                    return context.dataIndex === res.length - 2;
                },
                color: 'black',
                anchor: 'end',
                offset: 10,
                align: 'end',
                formatter: function (value) {
                    return Math.round(value / 1000000) + " million";
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
                    text: "Population"
                }
            }
        }
    })

    let results = []


    for (let id of [114186, 114187, 114188, 114189, 114190, 114191]) {
        let { data: res } = await axios.post("https://a.usafacts.org/graphql/", {
            query: `{metric(id: ${id}) {data {value}}}`
        })

        res = res.data.metric.data

        res = res.flatMap(d => Object.values(d));
        results.push(res)
    }

    data.value.push({
        labels: labels,
        datasets: [
            {
                label: 'White',
                borderColor: '#002868',
                backgroundColor: '#002868',
                data: results[1]
            },
            {
                label: 'Hispanic',
                borderColor: '#bf0a30',
                backgroundColor: '#bf0a30',
                data: results[0]
            },

            {
                label: 'Black',
                borderColor: '#326050',
                backgroundColor: '#326050',
                data: results[2]
            },
            {
                label: 'Asian',
                borderColor: '#503964',
                backgroundColor: '#503964',
                data: results[3]
            },
        ],
        source: "https://usafacts.org/data/topics/people-society/population-and-demographics/population-data/population/"
    })

    options.value.push({
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                text: 'U.S. Population By Race',
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
                    return context.dataIndex === res.length - 2;
                },
                color: 'black',
                anchor: 'end',
                offset: 0,
                align: 'end',
                formatter: function (value) {
                    return Math.round(value / 1000000) + " million";
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
                min: 1975,
                title: {
                    display: true,
                    type: 'time',
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Population"
                }
            }
        }
    })

})
</script>
