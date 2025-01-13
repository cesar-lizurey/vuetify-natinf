<template>
  <v-app>
    <v-main class="pa-6">
      <v-card>
        <v-card-title>
          Recherche de NATINF
        </v-card-title>
        <v-card-text>
          <recherche-NATINF v-model="infractions" multiple></recherche-NATINF>
          <Suspense>
            <template #default>
              <v-card v-if="infractions.length">
                <v-card-title>
                  Liste des NATINF
                </v-card-title>
                <v-card-text>
                  <cartouche-NATINF v-for="natinf in infractions.map((n) => n['Ministère de la Justice, Direction des affaires criminelles et'])" :key="`NATINF-${natinf}`" :natinf="+natinf" class="my-2" />
                </v-card-text>
              </v-card>
              <v-alert v-else type="warning">
                Veuillez sélectionner au moins un NATINF pour voir la liste s'afficher ici.
              </v-alert>
            </template>
            <template #fallback>
              <div>Chargement...</div>
            </template>
          </Suspense>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue';
import RechercheNATINF from '../../src/components/RechercheNATINF.vue';
import CartoucheNATINF from '../../src/components/CartoucheNATINF.vue';

export default defineComponent({
  components: { RechercheNATINF, CartoucheNATINF },
  setup() {
    const infractions = ref([]);
    return { infractions };
  }
});
</script>