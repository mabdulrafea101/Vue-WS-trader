<template>
    <canvas ref="chartRef" class="w-full"></canvas>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Chart from 'chart.js/auto'
  
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
  })
  
  const chartRef = ref<HTMLCanvasElement | null>(null)
  
  onMounted(() => {
    if (chartRef.value) {
      new Chart(chartRef.value, {
        type: 'bar',
        data: {
          labels: props.data.labels,
          datasets: props.data.datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    }
  })
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>