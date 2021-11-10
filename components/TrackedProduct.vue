<template>
  <v-card v-if="!!itemInfo">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="itemInfo.url_image"
      :alt="itemInfo.name"
      contain
      gradient="to bottom, rgba(255,255,255,0), rgba(0,0,0,.3)"
      ><v-card-title>{{ itemInfo.name }}</v-card-title></v-img
    >
    <v-card-subtitle>
      {{ itemInfo.short_description }}
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text>
      <ul>
        <li>
          <strong>Average Price:</strong>
          {{ itemInfo.first_day.avg_price || 0 }} €
        </li>
        <li>
          <strong>Max Price:</strong> {{ itemInfo.first_day.max_price || 0 }} €
        </li>
        <li>
          <strong>Min Price:</strong> {{ itemInfo.first_day.min_price || 0 }} €
        </li>
      </ul>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <p>
        {{ itemInfo.name }} is
        <strong
          >{{ Math.abs(itemInfo.category_variation * 100) }}%
          {{ categoryVariation }}</strong
        >
        than the average price of products in the
        {{ itemInfo.cat_3_name }} category
      </p>
    </v-card-text>
    <v-card-actions class="justify-end">
      <TrackingSubscribe />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TrackedProduct',
  data: () => ({}),
  computed: {
    ...mapState('tracking', {
      itemInfo: 'itemInfo',
    }),
    productImage() {
      return (
        (this.itemInfo && this.itemInfo.url_image) ||
        'https://www.supermercato24.it/asset/smhd/2163f/962b2/e2fe4/1610714886_img.jpg'
      )
    },
    categoryVariation() {
      return this.itemInfo.category_variation < 0 ? 'cheaper' : 'more expensive'
    },
  },
}
</script>

<style lang="scss" scoped>
.white--text {
  text-shadow: 2px 2px #000;
}
</style>
