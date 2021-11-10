<template>
  <v-form ref="trackingForm" v-model="valid">
    <v-card :loading="loading">
      <v-card-title>
        What product do you want to follow?
        <v-spacer />
        <TrackingSubscribe v-if="prices.length" />
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="productURL"
          :rules="productRules"
          label="Product URL"
          required
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="accent"
          :disabled="!prices.length || loading"
          @click="resetForm"
        >
          Reset form
        </v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="!valid || loading"
          @click="getPrices(productURL)"
        >
          Show me the price!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const validURLregex =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
export default {
  name: 'TrackingForm',
  data: () => ({
    valid: true,
    productURL: '',
    productRules: [
      (v) => !!v || 'Product URL is required',
      (v) => validURLregex.test(v) || 'Must be a valid URL',
    ],
  }),
  computed: {
    ...mapState('tracking', {
      prices: 'prices',
      loading: 'loading',
    }),
  },
  methods: {
    ...mapActions('tracking', {
      getPrices: 'getPrices',
      setPrices: 'setPrices',
      setItemStoreID: 'setItemStoreID',
      setItemInfo: 'setItemInfo',
    }),
    resetForm() {
      this.setItemStoreID('')
      this.setPrices([])
      this.setItemInfo(null)
      this.$refs.trackingForm.reset()
    },
  },
}
</script>

<style></style>
