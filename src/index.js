import CartoucheNATINF from './components/CartoucheNATINF.vue';
import RechercheNATINF from './components/RechercheNATINF.vue';

export default {
  install(Vue) {
    Vue.component('CartoucheNATINF', CartoucheNATINF);
    Vue.component('RechercheNATINF', RechercheNATINF);
  }
};

export { CartoucheNATINF, RechercheNATINF };