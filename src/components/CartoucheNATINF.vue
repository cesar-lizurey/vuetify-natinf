<script>
import { defineComponent, toRefs, computed, ref } from 'vue';

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
    const correspondancesNatures = {
      'Contravention de 1ère classe': {
        abr: 'C1',
        couleur: 'primary',
      },
      'Contravention de 2ème classe': {
        abr: 'C2',
        couleur: 'primary',
      },
      'Contravention de 3ème classe': {
        abr: 'C3',
        couleur: 'primary',
      },
      'Contravention de 4ème classe': {
        abr: 'C4',
        couleur: 'primary',
      },
      'Contravention de 5ème classe': {
        abr: 'C5',
        couleur: 'primary',
      },
      Délit: {
        abr: 'D',
        couleur: 'warning',
      },
      Crime: {
        abr: 'Cr',
        couleur: 'error',
      },
    };
    const apiUrl =
      'https://tabular-api.data.gouv.fr/api/resources/c6fb5b37-b3bc-4904-bd26-1b29ad7391df/data/?Ministère de la Justice, Direction des affaires criminelles et__exact=';

    const detailsNATINF = await fetch(`${apiUrl}${natinf.value}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((r) => r.json())
      .then((r) => r.data[0])
      .catch(() => {
        return {
          introuvable: true,
        };
      });

    const NATINFAffiche = computed(() => {
      if (!detailsNATINF) return;
      return {
        infobulle: detailsNATINF['Unnamed: 1'] || '',
        couleur: correspondancesNatures[detailsNATINF['Unnamed: 1']].couleur || 'primary',
        abr: `[${correspondancesNatures[detailsNATINF['Unnamed: 1']].abr}]` || '',
        texte: `${natinf.value} ${detailsNATINF['Unnamed: 2']}` || 'INTROUVABLE',
        prevuPar: detailsNATINF['Unnamed: 3'],
        reprimePar: detailsNATINF['Unnamed: 4'],
      };
    });

    return {
      correspondancesNatures,
      NATINFAffiche,
      detailsNATINF,
      menu,
    };
  },
});
</script>

<template>
  <v-chip v-if="!detailsNATINF || detailsNATINF.introuvable" color="error" class="ma-2" prepend-icon="mdi-alert" size="small">
    NATINF introuvable
  </v-chip>
  <v-menu v-else v-model="menu" :close-on-content-click="false" location="end">
    <template #activator="{ props }">
      <v-btn size="x-small" :color="NATINFAffiche.couleur" v-bind="props" class="ma-2" variant="outlined">
        {{ NATINFAffiche.abr }}
        {{ NATINFAffiche.texte }}
      </v-btn>
    </template>

    <v-card>
      <v-list density="compact">
        <v-list-item variant="tonal" title="Prévue par"></v-list-item>
        <v-list-item :title="NATINFAffiche.prevuPar"></v-list-item>
        <v-list-item variant="tonal" title="Réprimée par"></v-list-item>
        <v-list-item :title="NATINFAffiche.reprimePar"></v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

