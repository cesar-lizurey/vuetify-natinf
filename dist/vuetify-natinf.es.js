import { defineComponent as I, toRefs as F, computed as C, resolveComponent as n, openBlock as h, createBlock as b, withCtx as l, createVNode as r, createTextVNode as N, toDisplayString as v, ref as g, mergeProps as A, mergeModels as w, useModel as V, reactive as P, watch as R, unref as k } from "vue";
const T = {
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
};
async function y(e) {
  try {
    return (await (await fetch(`https://tabular-api.data.gouv.fr/api/resources/c6fb5b37-b3bc-4904-bd26-1b29ad7391df/data/?Ministère de la Justice, Direction des affaires criminelles et__exact=${e}`, {
      method: "GET",
      credentials: "include"
    })).json()).data[0] || !1;
  } catch {
    return console.error("NATINF introuvable"), !1;
  }
}
const U = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [i, o] of t)
    a[i] = o;
  return a;
}, x = I({
  name: "CarteNATINF",
  props: {
    natinf: {
      type: Number,
      required: !0,
      default: 0
    }
  },
  async setup(e) {
    const { natinf: t } = F(e), a = await y(t.value);
    return {
      NATINFAffiche: C(() => {
        if (a)
          return {
            nature: a["Unnamed: 1"] || "",
            couleur: T[a["Unnamed: 1"]].couleur || "primary",
            texte: a["Unnamed: 2"] || "INTROUVABLE",
            prevuPar: a["Unnamed: 3"],
            reprimePar: a["Unnamed: 4"]
          };
      })
    };
  }
});
function D(e, t, a, i, o, p) {
  const c = n("v-toolbar-title"), u = n("v-toolbar"), s = n("v-list-item"), f = n("v-list"), m = n("v-divider"), d = n("v-list-subheader"), _ = n("v-card"), $ = n("v-alert");
  return e.NATINFAffiche ? (h(), b(_, {
    key: 0,
    class: "mx-auto bg-surface",
    "max-width": "400"
  }, {
    default: l(() => [
      r(u, {
        color: e.NATINFAffiche.couleur
      }, {
        default: l(() => [
          r(c, null, {
            default: l(() => [
              N(v(e.natinf), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["color"]),
      r(f, {
        lines: "three",
        class: "mx-auto bg-surface-variant"
      }, {
        default: l(() => [
          r(s, {
            title: e.NATINFAffiche.nature,
            subtitle: e.NATINFAffiche.texte
          }, null, 8, ["title", "subtitle"])
        ]),
        _: 1
      }),
      r(m),
      r(f, { class: "mx-auto bg-surface-variant" }, {
        default: l(() => [
          r(d, null, {
            default: l(() => t[0] || (t[0] = [
              N("Prévue par")
            ])),
            _: 1
          }),
          r(s, {
            lines: "three",
            subtitle: e.NATINFAffiche.prevuPar
          }, null, 8, ["subtitle"]),
          r(d, null, {
            default: l(() => t[1] || (t[1] = [
              N("Réprimée par")
            ])),
            _: 1
          }),
          r(s, {
            lines: "three",
            subtitle: e.NATINFAffiche.reprimePar
          }, null, 8, ["subtitle"])
        ]),
        _: 1
      })
    ]),
    _: 1
  })) : (h(), b($, {
    key: 1,
    type: "error"
  }, {
    default: l(() => t[2] || (t[2] = [
      N(" NATINF introuvable ")
    ])),
    _: 1
  }));
}
const M = /* @__PURE__ */ U(x, [["render", D]]), B = I({
  name: "CartoucheNATINF",
  props: {
    natinf: {
      type: Number,
      required: !0,
      default: 0
    }
  },
  async setup(e) {
    const { natinf: t } = F(e), a = g(!1), i = await y(t.value);
    return {
      NATINFAffiche: C(() => {
        if (i)
          return {
            couleur: T[i["Unnamed: 1"]].couleur || "primary",
            abr: `[${T[i["Unnamed: 1"]].abr}]` || "",
            texte: `${t.value} ${i["Unnamed: 2"]}` || "INTROUVABLE",
            prevuPar: i["Unnamed: 3"],
            reprimePar: i["Unnamed: 4"]
          };
      }),
      menu: a
    };
  }
});
function j(e, t, a, i, o, p) {
  const c = n("v-btn"), u = n("v-list-item"), s = n("v-list"), f = n("v-card"), m = n("v-menu"), d = n("v-chip");
  return e.NATINFAffiche ? (h(), b(m, {
    key: 0,
    modelValue: e.menu,
    "onUpdate:modelValue": t[0] || (t[0] = (_) => e.menu = _),
    "close-on-content-click": !1,
    location: "end"
  }, {
    activator: l(({ props: _ }) => [
      r(c, A({
        size: "x-small",
        color: e.NATINFAffiche.couleur
      }, _, {
        class: "ma-2",
        variant: "outlined"
      }), {
        default: l(() => [
          N(v(e.NATINFAffiche.abr) + " " + v(e.NATINFAffiche.texte), 1)
        ]),
        _: 2
      }, 1040, ["color"])
    ]),
    default: l(() => [
      r(f, null, {
        default: l(() => [
          r(s, { density: "compact" }, {
            default: l(() => [
              r(u, {
                variant: "tonal",
                title: "Prévue par"
              }),
              r(u, {
                lines: "three",
                subtitle: e.NATINFAffiche.prevuPar
              }, null, 8, ["subtitle"]),
              r(u, {
                variant: "tonal",
                title: "Réprimée par"
              }),
              r(u, {
                lines: "three",
                subtitle: e.NATINFAffiche.reprimePar
              }, null, 8, ["subtitle"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"])) : (h(), b(d, {
    key: 1,
    color: "error",
    class: "ma-2",
    "prepend-icon": "mdi-alert",
    size: "x-small"
  }, {
    default: l(() => t[1] || (t[1] = [
      N(" NATINF introuvable ")
    ])),
    _: 1
  }));
}
const E = /* @__PURE__ */ U(B, [["render", j]]), J = "https://tabular-api.data.gouv.fr/api/resources/c6fb5b37-b3bc-4904-bd26-1b29ad7391df/data/?", O = {
  __name: "RechercheNATINF",
  props: /* @__PURE__ */ w({
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
    const t = e, { multiple: a } = F(t), i = V(e, "modelValue"), o = P({
      resultats: [],
      aChercher: null,
      enCours: !1,
      recherche: null
    });
    return R(
      () => o.aChercher,
      (p) => {
        !p || (p == null ? void 0 : p.length) === 0 || o.enCours || (clearTimeout(o.recherche), o.recherche = setTimeout(async () => {
          o.enCours = !0;
          let c;
          const u = parseFloat(p);
          !isNaN(u) && isFinite(u) ? c = "Ministère de la Justice, Direction des affaires criminelles et__exact" : c = "Unnamed: 2__contains", fetch(`${J}${c}=${p}`, {
            method: "GET",
            credentials: "include"
          }).then((s) => s.json()).then((s) => {
            o.resultats = [...s.data];
          }).catch((s) => {
            console.log(s);
          }).finally(() => {
            o.enCours = !1;
          });
        }, 1500));
      }
    ), (p, c) => {
      const u = n("v-chip"), s = n("v-list-item"), f = n("v-autocomplete");
      return h(), b(f, {
        modelValue: i.value,
        "onUpdate:modelValue": c[0] || (c[0] = (m) => i.value = m),
        search: o.aChercher,
        "onUpdate:search": c[1] || (c[1] = (m) => o.aChercher = m),
        "no-filter": "",
        "return-object": "",
        items: o.resultats,
        loading: o.enCours,
        "item-title": "nom",
        label: "Code NATINF ou texte",
        placeholder: "Commencez à écrire...",
        "prepend-icon": "mdi-scale-balance",
        multiple: k(a),
        chips: "",
        "closable-chips": "",
        clearable: ""
      }, {
        chip: l(({ props: m, item: d }) => [
          r(u, A(m, {
            "prepend-icon": "mdi-scale-balance",
            text: `[${d.raw["Ministère de la Justice, Direction des affaires criminelles et"]}] ${d.raw["Unnamed: 2"]}`
          }), null, 16, ["text"])
        ]),
        item: l(({ props: m, item: d }) => [
          r(s, A(m, {
            "prepend-icon": "mdi-scale-balance",
            title: d.raw["Unnamed: 2"],
            subtitle: d.raw["Ministère de la Justice, Direction des affaires criminelles et"]
          }), null, 16, ["title", "subtitle"])
        ]),
        _: 1
      }, 8, ["modelValue", "search", "items", "loading", "multiple"]);
    };
  }
}, L = {
  install(e) {
    e.component("CarteNATINF", M), e.component("CartoucheNATINF", E), e.component("RechercheNATINF", O);
  }
};
export {
  M as CarteNATINF,
  E as CartoucheNATINF,
  O as RechercheNATINF,
  L as default
};
