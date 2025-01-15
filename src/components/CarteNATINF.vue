<script>
import { defineComponent, toRefs, computed } from 'vue';
import { correspondancesNatures } from './correspondancesNatures';
import { rechercheNATINF } from './rechercheNATINF';

export default defineComponent({
  name: 'CarteNATINF',
  props: {
    natinf: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  async setup(props) {
    const { natinf } = toRefs(props);
    const detailsNATINF = await rechercheNATINF(natinf.value);

    const NATINFAffiche = computed(() => {
      if (!detailsNATINF) return;
      return {
        nature: detailsNATINF['Unnamed: 1'] || '',
        couleur: correspondancesNatures[detailsNATINF['Unnamed: 1']].couleur || 'primary',
        texte: detailsNATINF['Unnamed: 2'] || 'INTROUVABLE',
        prevuPar: detailsNATINF['Unnamed: 3'],
        reprimePar: detailsNATINF['Unnamed: 4'],
      };
    });

    return {
      NATINFAffiche,
    };
  },
});
</script>

<template>
  <v-card v-if="NATINFAffiche" class="mx-auto bg-surface" max-width="400">
    <v-toolbar :color="NATINFAffiche.couleur">
      <v-toolbar-title>{{ natinf }}</v-toolbar-title>
    </v-toolbar>

    <v-list lines="three" class="mx-auto bg-surface-variant">
      <v-list-item
        :title="NATINFAffiche.nature"
        :subtitle="NATINFAffiche.texte"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
      class="mx-auto bg-surface-variant"
    >
      <v-list-subheader>Prévue par</v-list-subheader>
      <v-list-item
        lines="three"
        :subtitle="NATINFAffiche.prevuPar"
      >
      </v-list-item>
      <v-list-subheader>Réprimée par</v-list-subheader>
      <v-list-item
        lines="three"
        :subtitle="NATINFAffiche.reprimePar"
      >
      </v-list-item>
    </v-list>
  </v-card>
  <v-alert v-else type="error">
    NATINF introuvable
  </v-alert>
</template>

