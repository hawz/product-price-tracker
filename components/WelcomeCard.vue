<template>
  <v-toolbar dense color="primary" dark extended extension-height="250" flat>
    <v-toolbar-title slot="extension" class="mx-auto">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-img class="float-left" contain width="50" height="50" src="./avatar_white.png" />
          <div class="text-h2 pa-12">
            Discover Trackerli
            <v-spacer></v-spacer>
            <div class="float-right">
              <p style="font-size: 14px">by Everli</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'WelcomeCard',
}
</script>
