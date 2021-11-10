<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card flat class="card--flex-toolbar" color="transparent">
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex v-for="item in links" :key="item.id" xs12 sm6 md6 lg4>
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                  >
                    <v-row justify="center" align="center">
                      <v-btn
                        outlined
                        x-large
                        icon
                        :color="item.color"
                        class="outline-2"
                      >
                        <v-icon large>{{ item.icon }}</v-icon>
                      </v-btn>
                    </v-row>

                    <v-card-title primary-title>
                      <h3 class="headline mb-0">{{ item.title }}</h3>
                    </v-card-title>
                    <v-card-text>
                      {{ item.description }}
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" nuxt to="tracker"
                        >Get started</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FeatureCards',
  data: () => ({
    links: [
      {
        id: '1',
        title: 'Select products',
        description:
          'Paste the product URL from Everli and check how the price changed in the last months.',
        color: 'orange',
        icon: 'mdi-baguette',
      },
      {
        id: '2',
        title: 'Follow',
        description:
          'Let Trackerli do its magic, showing you how the price evolution and some stats.',
        color: 'teal',
        icon: 'mdi-chart-timeline-variant-shimmer',
      },
      {
        id: '3',
        title: 'Alerts',
        description:
          'Subscribe to price and promo alerts and get notified when the price drops!',
        color: 'blue',
        icon: 'mdi-cart',
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.outline-2 {
  border: 2px solid white;
}

.card--flex-toolbar {
  margin-top: -30px;
}

.learn-more-btn {
  text-transform: initial;
  text-decoration: underline;
}
</style>
