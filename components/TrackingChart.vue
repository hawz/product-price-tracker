<template>
  <v-card v-if="prices.length">
    <v-card-title>
      Price chart
      <v-spacer />
    </v-card-title>
    <v-card-text>
      <D3LineChart :config="chart_config" :datum="prices"></D3LineChart>
    </v-card-text>
  </v-card>
</template>

<script>
import { D3LineChart } from 'vue-d3-charts'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TrackingChart',
  components: {
    D3LineChart,
  },
  data() {
    return {
      chart_config: {
        date: {
          key: 'date',
          inputFormat: '%Y-%m-%d',
          outputFormat: '%b-%d',
        },
        values: ['price'],
        axis: {
          yTitle: 'Price (€)',
          yFormat: '.0f',
          yTicks: 3,
          xTicks: 14,
        },
        color: {
          key: false,
          keys: false,
          scheme: false,
          current: '#64C828',
          default: '#AAA',
          axis: '#000',
        },
        curve: 'curveStepAfter',
        margin: {
          top: 20,
          right: 10,
          bottom: 20,
          left: 30,
        },
        points: {
          visibleSize: 1,
          hoverSize: 6,
        },
        tooltip: {
          labels: ['price'],
        },
        transition: {
          duration: 350,
          ease: 'easeLinear',
        },
      },
    }
  },
  computed: {
    ...mapState('tracking', {
      prices: 'prices',
    }),
    pricesLength() {
      return (this.prices && this.prices.length) || 1
    },
  },
  mounted() {
    this.setPrices([])
  },
  methods: {
    ...mapActions('tracking', {
      setPrices: 'setPrices',
    }),
  },
}
</script>

<style></style>
