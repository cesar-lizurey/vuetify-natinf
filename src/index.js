import CarteNATINF from './components/CarteNATINF.vue';
import CartoucheNATINF from './components/CartoucheNATINF.vue';
import RechercheNATINF from './components/RechercheNATINF.vue';

export default {
  install(Vue) {
    Vue.component('CarteNATINF', CarteNATINF);
    Vue.component('CartoucheNATINF', CartoucheNATINF);
    Vue.component('RechercheNATINF', RechercheNATINF);
  }
};

export { CarteNATINF, CartoucheNATINF, RechercheNATINF };