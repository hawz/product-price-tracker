<template>
  <v-dialog max-width="800">
    <template #activator="{ on, attrs }">
      <v-btn color="orange" v-bind="attrs" text v-on="on">
        Send me updates
      </v-btn>
    </template>
    <template #default="dialog">
      <v-card>
        <v-card-title>
          Subscribe to updates
          <v-spacer />
          <v-btn icon @click="dialog.value = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form ref="emailForm" v-model="valid">
          <v-card-text>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            />
            <v-row no-gutters>
              <v-col cols="6">
                <v-checkbox
                  v-model="priceFlag"
                  label="I want updates about prices"
                  :rules="flagRules"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="promoFlag"
                  label="I want updates about promos"
                  :rules="flagRules"
                  required
                />
              </v-col>
            </v-row>
            <v-text-field
              v-if="priceFlag"
              v-model="price"
              :rules="priceRules"
              label="Price"
              type="number"
              required
            />
            <v-alert v-if="subscriptionSuccess" type="success" shaped dense>
              Successfully subscribed!
            </v-alert>
            <v-alert v-if="error" type="error" shaped dense>
              {{ errorMsg }}
            </v-alert>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="accent" :disabled="!valid" @click="resetForm">
              Reset form
            </v-btn>
            <v-btn color="primary" :disabled="!valid" @click="subscribe">
              Subscribe
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TrackingSubscribe',
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      priceRules: [(v) => !!v || 'Price is required'],
      flagRules: [
        (v) => {
          if (!this.priceFlag && !this.promoFlag) {
            return 'You should check at least one option'
          }
          return true
        },
      ],
      priceFlag: false,
      promoFlag: false,
      price: null,
      subscriptionSuccess: false,
      error: false,
      errorMsg: '',
    }
  },
  computed: {
    ...mapState('tracking', {
      loading: 'loading',
      itemStoreID: 'itemStoreID',
    }),
  },
  watch: {
    email(newVal, oldVal) {
      this.$refs.emailForm.validate()
    },
    priceFlag(newVal, oldVal) {
      this.$refs.emailForm.validate()
    },
    promoFlag(newVal, oldVal) {
      this.$refs.emailForm.validate()
    },
  },
  mounted() {
    this.retry()
  },
  methods: {
    ...mapActions('tracking', {
      subscribeAlert: 'subscribeAlert',
    }),
    subscribe() {
      this.retry()
      const payload = {
        item_store_id: this.itemStoreID,
        track_price: this.priceFlag,
        track_promo: this.promoFlag,
        email: this.email,
        price_threshold: this.price ? parseFloat(this.price) : null,
      }
      this.subscribeAlert(payload)
        .then((res) => {
          this.subscriptionSuccess = true
          this.$refs.emailForm.reset()
          setTimeout(() => {
            this.retry()
          }, 5000)
        })
        .catch((error) => {
          this.error = true
          this.errorMsg = error
          setTimeout(() => {
            this.retry()
          }, 5000)
        })
    },
    resetForm() {
      this.retry()
      this.$refs.emailForm.reset()
    },
    retry() {
      this.error = false
      this.errorMsg = ''
      this.subscriptionSuccess = false
    },
  },
}
</script>

<style></style>
