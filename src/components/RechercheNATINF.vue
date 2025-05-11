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
      /*

      exemple:
      https://tabular-api.data.gouv.fr/api/resources/c6fb5b37-b3bc-4904-bd26-1b29ad7391df/data/?Unnamed:%202__contains=moyen*electronique

      Selon que l'utilisateur entre du texte ou un nombre, on va rechercher l'ensemble des infractions qui contiennent le texte
      ou l'infraction qui a exactement le code NATINF.

      À ce jour la donnée qui figure sur le site data.gouv.fr est mal formatée, ce qui donne ce code difficilement compréhensible.

      */
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
        :color="(correspondancesNatures[item.raw['Unnamed: 1']] || {}).couleur || 'primary'"
        :text="`[${
          (correspondancesNatures[item.raw['Unnamed: 1']] || {}).abr || ''
        }] ${
          item.raw[
            'Ministère de la Justice, Direction des affaires criminelles et'
          ]
        } - ${item.raw['Unnamed: 2']}`"
      ></v-chip>
    </template>
    <template #item="{ props: p, item }">
      <v-list-item
        v-bind="p"
        :title="item.raw['Unnamed: 2']"
        :subtitle="item.raw['Ministère de la Justice, Direction des affaires criminelles et']"
      >
        <template #prepend>
          <v-chip
            size="x-small"
            :color="(correspondancesNatures[item.raw['Unnamed: 1']] || {}).couleur || 'primary'"
            class="mr-2"
            label
          >
            {{ (correspondancesNatures[item.raw['Unnamed: 1']] || {}).abr || '' }}
          </v-chip>
        </template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<style scoped></style>
