import { defineComponent as T, toRefs as A, ref as F, computed as I, resolveComponent as u, openBlock as b, createBlock as N, withCtx as m, createTextVNode as v, createVNode as s, mergeProps as _, toDisplayString as C, mergeModels as y, useModel as U, reactive as $, watch as V, unref as g } from "vue";
const w = (e, o) => {
  const d = e.__vccOpts || e;
  for (const [i, r] of o)
    d[i] = r;
  return d;
}, D = T({
  name: "CartoucheNATINF",
  props: {
    natinf: {
      type: Number,
      required: !0,
      default: 0
    }
  },
  async setup(e) {
    const { natinf: o } = A(e), d = F(!1), i = {
      "Contravention de 1ère classe": {
        abr: "C1",
        couleur: "primary"
      },
      "Contravention de 2ème classe": {
        abr: "C2",
        couleur: "primary"
      },
      "Contravention de 3ème classe": {
        abr: "C3",
        couleur: "primary"
      },
      "Contravention de 4ème classe": {
        abr: "C4",
        couleur: "primary"
      },
      "Contravention de 5ème classe": {
        abr: "C5",
        couleur: "primary"
      },
      Délit: {
        abr: "D",
        couleur: "warning"
      },
      Crime: {
        abr: "Cr",
        couleur: "error"
      }
    }, t = await fetch(`https://tabular-api.data.gouv.fr/api/resources/c6fb5b37-b3bc-4904-bd26-1b29ad7391df/data/?Ministère de la Justice, Direction des affaires criminelles et__exact=${o.value}`, {
      method: "GET",
      credentials: "include"
    }).then((l) => l.json()).then((l) => l.data[0]).catch(() => ({
      introuvable: !0
    })), n = I(() => {
      if (t)
        return {
          infobulle: t["Unnamed: 1"] || "",
          couleur: i[t["Unnamed: 1"]].couleur || "primary",
          abr: `[${i[t["Unnamed: 1"]].abr}]` || "",
          texte: `${o.value} ${t["Unnamed: 2"]}` || "INTROUVABLE",
          prevuPar: t["Unnamed: 3"],
          reprimePar: t["Unnamed: 4"]
        };
    });
    return {
      correspondancesNatures: i,
      NATINFAffiche: n,
      detailsNATINF: t,
      menu: d
    };
  }
});
function M(e, o, d, i, r, t) {
  const n = u("v-chip"), l = u("v-btn"), a = u("v-list-item"), f = u("v-list"), c = u("v-card"), p = u("v-menu");
  return !e.detailsNATINF || e.detailsNATINF.introuvable ? (b(), N(n, {
    key: 0,
    color: "error",
    class: "ma-2",
    "prepend-icon": "mdi-alert",
    size: "small"
  }, {
    default: m(() => o[1] || (o[1] = [
      v(" NATINF introuvable ")
    ])),
    _: 1
  })) : (b(), N(p, {
    key: 1,
    modelValue: e.menu,
    "onUpdate:modelValue": o[0] || (o[0] = (h) => e.menu = h),
    "close-on-content-click": !1,
    location: "end"
  }, {
    activator: m(({ props: h }) => [
      s(l, _({
        size: "x-small",
        color: e.NATINFAffiche.couleur
      }, h, {
        class: "ma-2",
        variant: "outlined"
      }), {
        default: m(() => [
          v(C(e.NATINFAffiche.abr) + " " + C(e.NATINFAffiche.texte), 1)
        ]),
        _: 2
      }, 1040, ["color"])
    ]),
    default: m(() => [
      s(c, null, {
        default: m(() => [
          s(f, { density: "compact" }, {
            default: m(() => [
              s(a, {
                variant: "tonal",
                title: "Prévue par"
              }),
              s(a, {
                title: e.NATINFAffiche.prevuPar
              }, null, 8, ["title"]),
              s(a, {
                variant: "tonal",
                title: "Réprimée par"
              }),
              s(a, {
                title: e.NATINFAffiche.reprimePar
              }, null, 8, ["title"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"]));
}
const R = /* @__PURE__ */ w(D, [["render", M]]), k = "https://tabular-api.data.gouv.fr/api/resources/c6fb5b37-b3bc-4904-bd26-1b29ad7391df/data/?", x = {
  __name: "RechercheNATINF",
  props: /* @__PURE__ */ y({
    multiple: {
      type: Boolean,
      default: !1
    }
  }, {
    modelValue: { type: Object },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const o = e, { multiple: d } = A(o), i = U(e, "modelValue"), r = $({
      resultats: [],
      aChercher: null,
      enCours: !1,
      recherche: null
    });
    return V(
      () => r.aChercher,
      (t) => {
        !t || (t == null ? void 0 : t.length) === 0 || r.enCours || (clearTimeout(r.recherche), r.recherche = setTimeout(async () => {
          r.enCours = !0;
          let n;
          const l = parseFloat(t);
          !isNaN(l) && isFinite(l) ? n = "Ministère de la Justice, Direction des affaires criminelles et__exact" : n = "Unnamed: 2__contains", fetch(`${k}${n}=${t}`, {
            method: "GET",
            credentials: "include"
          }).then((a) => a.json()).then((a) => {
            r.resultats = [...a.data];
          }).catch((a) => {
            console.log(a);
          }).finally(() => {
            r.enCours = !1;
          });
        }, 1500));
      }
    ), (t, n) => {
      const l = u("v-chip"), a = u("v-list-item"), f = u("v-autocomplete");
      return b(), N(f, {
        modelValue: i.value,
        "onUpdate:modelValue": n[0] || (n[0] = (c) => i.value = c),
        search: r.aChercher,
        "onUpdate:search": n[1] || (n[1] = (c) => r.aChercher = c),
        "no-filter": "",
        "return-object": "",
        items: r.resultats,
        loading: r.enCours,
        "item-title": "nom",
        label: "Code NATINF ou texte",
        placeholder: "Commencez à écrire...",
        "prepend-icon": "mdi-scale-balance",
        multiple: g(d),
        chips: "",
        "closable-chips": "",
        clearable: ""
      }, {
        chip: m(({ props: c, item: p }) => [
          s(l, _(c, {
            "prepend-icon": "mdi-scale-balance",
            text: `[${p.raw["Ministère de la Justice, Direction des affaires criminelles et"]}] ${p.raw["Unnamed: 2"]}`
          }), null, 16, ["text"])
        ]),
        item: m(({ props: c, item: p }) => [
          s(a, _(c, {
            "prepend-icon": "mdi-scale-balance",
            title: p.raw["Unnamed: 2"],
            subtitle: p.raw["Ministère de la Justice, Direction des affaires criminelles et"]
          }), null, 16, ["title", "subtitle"])
        ]),
        _: 1
      }, 8, ["modelValue", "search", "items", "loading", "multiple"]);
    };
  }
}, j = {
  install(e) {
    e.component("CartoucheNATINF", R), e.component("RechercheNATINF", x);
  }
};
export {
  R as CartoucheNATINF,
  x as RechercheNATINF,
  j as default
};
