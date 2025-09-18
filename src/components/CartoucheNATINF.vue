<script>
import { defineComponent, toRefs, computed, ref } from 'vue';
import { correspondancesNatures } from './correspondancesNatures';
import { rechercheNATINF } from './rechercheNATINF';

export default defineComponent({
  name: 'CartoucheNATINF',
  props: {
    natinf: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  async setup(props) {
    const { natinf } = toRefs(props);
    const menu = ref(false);
    const detailsNATINF = await rechercheNATINF(natinf.value);

    const NATINFAffiche = computed(() => {
      if (!detailsNATINF) return;
      return {
        couleur: correspondancesNatures[detailsNATINF['Nature de l\'infraction']]?.couleur || 'primary',
        abr: correspondancesNatures[detailsNATINF['Nature de l\'infraction']]?.abr ? `[${correspondancesNatures[detailsNATINF['Nature de l\'infraction']].abr}]` : '',
        texte: `${natinf.value} ${detailsNATINF['Qualification de l\'infraction']}` || 'INTROUVABLE',
        prevuPar: detailsNATINF['Définie par'],
        reprimePar: detailsNATINF['Réprimée par'],
      };
    });

    return {
      NATINFAffiche,
      menu,
    };
  },
});
</script>

<template>
  <v-menu v-if="NATINFAffiche"  v-model="menu" :close-on-content-click="false" location="end">
    <template #activator="{ props }">
      <v-btn size="x-small" :color="NATINFAffiche.couleur" v-bind="props" class="ma-2" variant="outlined">
        {{ NATINFAffiche.abr }}
        {{ NATINFAffiche.texte }}
      </v-btn>
    </template>

    <v-card>
      <v-list density="compact">
        <v-list-item variant="tonal" title="Prévue par"></v-list-item>
        <v-list-item lines="three" :subtitle="NATINFAffiche.prevuPar"></v-list-item>
        <v-list-item variant="tonal" title="Réprimée par"></v-list-item>
        <v-list-item lines="three" :subtitle="NATINFAffiche.reprimePar"></v-list-item>
      </v-list>
    </v-card>
  </v-menu>
  <v-chip v-else color="error" class="ma-2" prepend-icon="mdi-alert" size="x-small">
    NATINF introuvable
  </v-chip>
</template>

<style>
.v-btn__content {
  overflow: hidden !important;
}
</style>

