<template>
  <v-app>
    <v-main class="pa-6">
      <div id="logo">
        <img src="/logo_recherche_natinf_transparent.png" alt="Logo recherche NATINF">
      </div>
      <v-card>
        <v-card-title>
          Recherche de NATINF
        </v-card-title>
        <v-card-text>
          <recherche-NATINF v-model="infractions" multiple></recherche-NATINF>
          <Suspense>
            <template #default>
              <v-card v-if="infractions.length">
                <v-card-title class="d-flex flex-column align-center">
                  <span>
                    Liste des NATINF
                  </span>
                  <v-select
                  max-width="200"
                    density="compact"
                    label="Affichage"
                    v-model="formatAffichage"
                    :items="['carte', 'cartouche', 'bouton']"
                    class="ml-2"
                  ></v-select>
                </v-card-title>
                <v-card-text class="d-flex flex-wrap" v-if="formatAffichage === 'carte'">
                  <carte-NATINF v-for="natinf in infractions.map((n) => n['Ministère de la Justice, Direction des affaires criminelles et'])" :key="`NATINF-${natinf}`" :natinf="+natinf" class="my-2" />
                </v-card-text>
                <v-card-text class="d-flex flex-wrap" v-else-if="formatAffichage === 'cartouche'">
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
import CarteNATINF from '../../src/components/CarteNATINF.vue';

export default defineComponent({
  components: { RechercheNATINF, CartoucheNATINF, CarteNATINF },
  setup() {
    const infractions = ref([]);
    const formatAffichage = ref('carte');
    return { infractions, formatAffichage };
  }
});
</script>

<style scoped>
#logo {
  width: 100%;
  display: flex;
  justify-content: center;
}

#logo img {
  width: 20vw;
  max-width: 200px;
  margin: min(5%, 20px);
}
</style>