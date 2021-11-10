<template>
  <v-card v-if="!!itemInfo">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="productImage"
      gradient="to bottom top, rgba(255,255,255,0), rgba(25,32,72,.7)"
      contain
      eager
    >
      <v-card-title>{{ itemInfo.name }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">
      {{ itemInfo.short_description }}
    </v-card-subtitle>
    <v-card-text> Category: {{ itemInfo.cat_3_name }} </v-card-text>
    <v-card-actions></v-card-actions>
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
  },
}
</script>
