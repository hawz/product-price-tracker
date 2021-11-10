<template>
  <v-card v-if="prices.length">
    <v-card-title>
      Price chart
      <v-spacer />
    </v-card-title>
    <v-card-text>
      <D3LineChart :config="chart_config" :datum="prices" />
      <!-- <br />
      <D3LineChart :config="chart_config_avg" :datum="prices" /> -->
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
          current: '#1f77b4',
          default: '#AAA',
          axis: '#000',
        },
        curve: 'curveLinear',
        margin: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 40,
        },
        points: {
          visibleSize: 1,
          hoverSize: 8,
        },
        tooltip: {
          labels: false,
        },
        transition: {
          duration: 350,
          ease: 'easeLinear',
        },
      },
      // chart_config_avg: {
      //   date: {
      //     key: 'date',
      //     inputFormat: '%Y-%m-%d',
      //     outputFormat: '%b-%d',
      //   },
      //   values: ['avg_price'],
      //   axis: {
      //     yTitle: 'AVG Price (€)',
      //     yFormat: '.0f',
      //     yTicks: 3,
      //     xTicks: 14,
      //   },
      //   color: {
      //     key: false,
      //     keys: false,
      //     scheme: false,
      //     current: '#1f77b4',
      //     default: '#AAA',
      //     axis: '#000',
      //   },
      //   curve: 'curveLinear',
      //   margin: {
      //     top: 20,
      //     right: 10,
      //     bottom: 20,
      //     left: 30,
      //   },
      //   points: {
      //     visibleSize: 1,
      //     hoverSize: 8,
      //   },
      //   tooltip: {
      //     labels: false,
      //   },
      //   transition: {
      //     duration: 350,
      //     ease: 'easeLinear',
      //   },
      // },
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
