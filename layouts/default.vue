<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      class="blue-grey darken-4"
      dark
      persistent
      fixed
      app
    >
      <v-list class="pa-0">
        <v-list-item>
          <v-list-item-action>
            <v-icon color="primary">mdi-chart-timeline-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content v-if="!miniVariant">
            <v-list-item-title>
              <h2 v-text="title"></h2>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app flat dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer app>
      <span>&copy; Trackerli {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-chart-line',
          title: 'Tracker',
          to: '/tracker',
        },
      ],
      miniVariant: false,
      title: 'Trackerli',
    }
  },
}
</script>

<style lang="scss" scoped>
.list-border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
