<script setup>
import { reactive, watch, defineProps, toRefs } from 'vue';
import { correspondancesNatures } from './correspondancesNatures';

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
});

const { multiple } = toRefs(props);

const apiUrl = 'https://tabular-api.data.gouv.fr/api/resources/c6fb5b37-b3bc-4904-bd26-1b29ad7391df/data/?';
const selection = defineModel({ type: Object });

const recherche = reactive({
  resultats: [],
  aChercher: null,
  enCours: false,
  recherche: null,
});

watch(
  () => recherche.aChercher,
  (val) => {
    // S'il n'y a pas de valeur
    if (!val || val?.length === 0) return;

    // Si la recherche est en cours on attend
    if (recherche.enCours) return;

    clearTimeout(recherche.recherche);
    recherche.recherche = setTimeout(async () => {
      recherche.enCours = true;
      let complementURL;
      const numericValue = parseFloat(val);
      if (!isNaN(numericValue) && isFinite(numericValue)) {
        // si c'est un nombre: Ministère de la Justice, Direction des affaires criminelles et__exact
        complementURL = 'Ministère de la Justice, Direction des affaires criminelles et__exact'; // C'est un nombre
      } else {
        // si c'est un texte: Unnamed: 2__contains=moyen*electronique
        complementURL = 'Unnamed: 2__contains';
      }

      fetch(`${apiUrl}${complementURL}=${val}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => {
          recherche.resultats = [...res.data];
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          recherche.enCours = false;
        });
    }, 1500);
  }
);
</script>

<template>
  <v-autocomplete
    v-model="selection"
    v-model:search="recherche.aChercher"
    no-filter
    return-object
    :items="recherche.resultats"
    :loading="recherche.enCours"
    item-title="nom"
    label="Code NATINF ou texte"
    placeholder="Commencez à écrire..."
    prepend-icon="mdi-scale-balance"
    :multiple="multiple"
    chips
    closable-chips
    clearable
  >
    <template #chip="{ props: p, item }">
      <v-chip
        v-bind="p"
        prepend-icon="mdi-scale-balance"
        :text="`[${item.raw['Ministère de la Justice, Direction des affaires criminelles et']}] ${item.raw['Unnamed: 2']}`"
      ></v-chip>
    </template>
    <template #item="{ props: p, item }">
      <v-list-item
        v-bind="p"
        :title="`[${(correspondancesNatures[item.raw['Unnamed: 1']] || {}).abr || ''}] ${item.raw['Unnamed: 2']}`"
        :subtitle="item.raw['Ministère de la Justice, Direction des affaires criminelles et']"
      ></v-list-item>
    </template>
  </v-autocomplete>
</template>

<style scoped></style>
