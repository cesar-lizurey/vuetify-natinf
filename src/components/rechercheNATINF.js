/**
 * Récupère les détails d'un NATINF depuis l'API.
 *
 * Cette fonction envoie une requête GET à l'API pour récupérer les données associées
 * au NATINF spécifié. Si la requête échoue ou si le NATINF est introuvable, elle retourne `false`.
 *
 * @param {string} natinf - Le code NATINF à rechercher.
 * @returns {Promise<Object|boolean>} Les données du NATINF sous forme d'objet ou `false` si introuvable.
 *
 * @example
 * const details = await fetchNATINF('12345');
 * if (details) {
 *   console.log('Détails du NATINF:', details);
 * } else {
 *   console.error('NATINF introuvable.');
 * }
*/
export async function rechercheNATINF(natinf) {
  try {
    const apiUrl = 'https://tabular-api.data.gouv.fr/api/resources/c6fb5b37-b3bc-4904-bd26-1b29ad7391df/data/?Ministère de la Justice, Direction des affaires criminelles et__exact=';
    const response = await fetch(`${apiUrl}${natinf}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    return data.data[0] || false;
  } catch (error) {
    console.error("NATINF introuvable");
    return false;
  }
}