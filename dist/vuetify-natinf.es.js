import { defineComponent as C, toRefs as I, computed as y, resolveComponent as a, createBlock as v, openBlock as A, withCtx as n, createVNode as r, createTextVNode as f, toDisplayString as T, ref as g, mergeProps as F, mergeModels as V, useModel as P, reactive as x, watch as R, unref as b } from "vue";
const N = {
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
async function U(e) {
  try {
    return (await (await fetch(`https://tabular-api.data.gouv.fr/api/resources/c6fb5b37-b3bc-4904-bd26-1b29ad7391df/data/?Ministère de la Justice, Direction des affaires criminelles et__exact=${e}`, {
      method: "GET",
      credentials: "include"
    })).json()).data[0] || !1;
  } catch {
    return console.error("NATINF introuvable"), !1;
  }
}
const $ = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, l] of t)
    o[s] = l;
  return o;
}, k = C({
  name: "CarteNATINF",
  props: {
    natinf: {
      type: Number,
      required: !0,
      default: 0
    }
  },
  async setup(e) {
    const { natinf: t } = I(e), o = await U(t.value);
    return {
      NATINFAffiche: y(() => {
        if (o)
          return {
            nature: o["Unnamed: 1"] || "",
            couleur: N[o["Unnamed: 1"]].couleur || "primary",
            texte: o["Unnamed: 2"] || "INTROUVABLE",
            prevuPar: o["Unnamed: 3"],
            reprimePar: o["Unnamed: 4"]
          };
      })
    };
  }
});
function D(e, t, o, s, l, p) {
  const u = a("v-toolbar-title"), m = a("v-toolbar"), c = a("v-list-item"), _ = a("v-list"), d = a("v-divider"), i = a("v-list-subheader"), h = a("v-card"), w = a("v-alert");
  return e.NATINFAffiche ? (A(), v(h, {
    key: 0,
    class: "mx-auto bg-surface",
    "max-width": "400"
  }, {
    default: n(() => [
      r(m, {
        color: e.NATINFAffiche.couleur
      }, {
        default: n(() => [
          r(u, null, {
            default: n(() => [
              f(T(e.natinf), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["color"]),
      r(_, {
        lines: "three",
        class: "mx-auto bg-surface-variant"
      }, {
        default: n(() => [
          r(c, {
            title: e.NATINFAffiche.nature,
            subtitle: e.NATINFAffiche.texte
          }, null, 8, ["title", "subtitle"])
        ]),
        _: 1
      }),
      r(d),
      r(_, { class: "mx-auto bg-surface-variant" }, {
        default: n(() => [
          r(i, null, {
            default: n(() => t[0] || (t[0] = [
              f("Prévue par")
            ])),
            _: 1
          }),
          r(c, {
            lines: "three",
            subtitle: e.NATINFAffiche.prevuPar
          }, null, 8, ["subtitle"]),
          r(i, null, {
            default: n(() => t[1] || (t[1] = [
              f("Réprimée par")
            ])),
            _: 1
          }),
          r(c, {
            lines: "three",
            subtitle: e.NATINFAffiche.reprimePar
          }, null, 8, ["subtitle"])
        ]),
        _: 1
      })
    ]),
    _: 1
  })) : (A(), v(w, {
    key: 1,
    type: "error"
  }, {
    default: n(() => t[2] || (t[2] = [
      f(" NATINF introuvable ")
    ])),
    _: 1
  }));
}
const M = /* @__PURE__ */ $(k, [["render", D]]), B = C({
  name: "CartoucheNATINF",
  props: {
    natinf: {
      type: Number,
      required: !0,
      default: 0
    }
  },
  async setup(e) {
    const { natinf: t } = I(e), o = g(!1), s = await U(t.value);
    return {
      NATINFAffiche: y(() => {
        if (s)
          return {
            couleur: N[s["Unnamed: 1"]].couleur || "primary",
            abr: `[${N[s["Unnamed: 1"]].abr}]` || "",
            texte: `${t.value} ${s["Unnamed: 2"]}` || "INTROUVABLE",
            prevuPar: s["Unnamed: 3"],
            reprimePar: s["Unnamed: 4"]
          };
      }),
      menu: o
    };
  }
});
function j(e, t, o, s, l, p) {
  const u = a("v-btn"), m = a("v-list-item"), c = a("v-list"), _ = a("v-card"), d = a("v-menu"), i = a("v-chip");
  return e.NATINFAffiche ? (A(), v(d, {
    key: 0,
    modelValue: e.menu,
    "onUpdate:modelValue": t[0] || (t[0] = (h) => e.menu = h),
    "close-on-content-click": !1,
    location: "end"
  }, {
    activator: n(({ props: h }) => [
      r(u, F({
        size: "x-small",
        color: e.NATINFAffiche.couleur
      }, h, {
        class: "ma-2",
        variant: "outlined"
      }), {
        default: n(() => [
          f(T(e.NATINFAffiche.abr) + " " + T(e.NATINFAffiche.texte), 1)
        ]),
        _: 2
      }, 1040, ["color"])
    ]),
    default: n(() => [
      r(_, null, {
        default: n(() => [
          r(c, { density: "compact" }, {
            default: n(() => [
              r(m, {
                variant: "tonal",
                title: "Prévue par"
              }),
              r(m, {
                lines: "three",
                subtitle: e.NATINFAffiche.prevuPar
              }, null, 8, ["subtitle"]),
              r(m, {
                variant: "tonal",
                title: "Réprimée par"
              }),
              r(m, {
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
  }, 8, ["modelValue"])) : (A(), v(i, {
    key: 1,
    color: "error",
    class: "ma-2",
    "prepend-icon": "mdi-alert",
    size: "x-small"
  }, {
    default: n(() => t[1] || (t[1] = [
      f(" NATINF introuvable ")
    ])),
    _: 1
  }));
}
const z = /* @__PURE__ */ $(B, [["render", j]]), E = "https://tabular-api.data.gouv.fr/api/resources/c6fb5b37-b3bc-4904-bd26-1b29ad7391df/data/?", J = {
  __name: "RechercheNATINF",
  props: /* @__PURE__ */ V({
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
    const t = e, { multiple: o } = I(t), s = P(e, "modelValue"), l = x({
      resultats: [],
      aChercher: null,
      enCours: !1,
      recherche: null
    });
    return R(
      () => l.aChercher,
      (p) => {
        !p || (p == null ? void 0 : p.length) === 0 || l.enCours || (clearTimeout(l.recherche), l.recherche = setTimeout(async () => {
          l.enCours = !0;
          let u;
          const m = parseFloat(p);
          !isNaN(m) && isFinite(m) ? u = "Ministère de la Justice, Direction des affaires criminelles et__exact" : u = "Unnamed: 2__contains", fetch(`${E}${u}=${p}`, {
            method: "GET",
            credentials: "include"
          }).then((c) => c.json()).then((c) => {
            l.resultats = [...c.data];
          }).catch((c) => {
            console.log(c);
          }).finally(() => {
            l.enCours = !1;
          });
        }, 1500));
      }
    ), (p, u) => {
      const m = a("v-chip"), c = a("v-list-item"), _ = a("v-autocomplete");
      return A(), v(_, {
        modelValue: s.value,
        "onUpdate:modelValue": u[0] || (u[0] = (d) => s.value = d),
        search: l.aChercher,
        "onUpdate:search": u[1] || (u[1] = (d) => l.aChercher = d),
        "no-filter": "",
        "return-object": "",
        items: l.resultats,
        loading: l.enCours,
        "item-title": "nom",
        label: "Code NATINF ou texte",
        placeholder: "Commencez à écrire...",
        "prepend-icon": "mdi-scale-balance",
        multiple: b(o),
        chips: "",
        "closable-chips": "",
        clearable: ""
      }, {
        chip: n(({ props: d, item: i }) => [
          r(m, F(d, {
            color: (b(N)[i.raw["Unnamed: 1"]] || {}).couleur || "primary",
            text: `[${(b(N)[i.raw["Unnamed: 1"]] || {}).abr || ""}] ${i.raw["Ministère de la Justice, Direction des affaires criminelles et"]} - ${i.raw["Unnamed: 2"]}`
          }), null, 16, ["color", "text"])
        ]),
        item: n(({ props: d, item: i }) => [
          r(c, F(d, {
            title: i.raw["Unnamed: 2"],
            subtitle: i.raw["Ministère de la Justice, Direction des affaires criminelles et"]
          }), {
            prepend: n(() => [
              r(m, {
                size: "x-small",
                color: (b(N)[i.raw["Unnamed: 1"]] || {}).couleur || "primary",
                class: "mr-2",
                label: ""
              }, {
                default: n(() => [
                  f(T((b(N)[i.raw["Unnamed: 1"]] || {}).abr || ""), 1)
                ]),
                _: 2
              }, 1032, ["color"])
            ]),
            _: 2
          }, 1040, ["title", "subtitle"])
        ]),
        _: 1
      }, 8, ["modelValue", "search", "items", "loading", "multiple"]);
    };
  }
}, L = {
  install(e) {
    e.component("CarteNATINF", M), e.component("CartoucheNATINF", z), e.component("RechercheNATINF", J);
  }
};
export {
  M as CarteNATINF,
  z as CartoucheNATINF,
  J as RechercheNATINF,
  L as default
};
