import { defineComponent as C, toRefs as I, computed as y, resolveComponent as a, createBlock as A, openBlock as b, withCtx as n, createVNode as r, createTextVNode as f, toDisplayString as T, ref as g, mergeProps as F, mergeModels as V, useModel as P, reactive as x, watch as R, unref as v } from "vue";
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
async function $(e) {
  try {
    return (await (await fetch(`https://tabular-api.data.gouv.fr/api/resources/3899108b-262c-46d4-8283-1c70f1cf4326/data/?Numéro NATINF__exact=${e}`, {
      method: "GET",
      credentials: "include"
    })).json()).data[0] || !1;
  } catch {
    return console.error("NATINF introuvable"), !1;
  }
}
const U = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, l] of t)
    o[i] = l;
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
    const { natinf: t } = I(e), o = await $(t.value);
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
function B(e, t, o, i, l, d) {
  const u = a("v-toolbar-title"), p = a("v-toolbar"), s = a("v-list-item"), _ = a("v-list"), m = a("v-divider"), c = a("v-list-subheader"), h = a("v-card"), w = a("v-alert");
  return e.NATINFAffiche ? (b(), A(h, {
    key: 0,
    class: "mx-auto bg-surface",
    "max-width": "400"
  }, {
    default: n(() => [
      r(p, {
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
          r(s, {
            title: e.NATINFAffiche.nature,
            subtitle: e.NATINFAffiche.texte
          }, null, 8, ["title", "subtitle"])
        ]),
        _: 1
      }),
      r(m),
      r(_, { class: "mx-auto bg-surface-variant" }, {
        default: n(() => [
          r(c, null, {
            default: n(() => t[0] || (t[0] = [
              f("Prévue par")
            ])),
            _: 1
          }),
          r(s, {
            lines: "three",
            subtitle: e.NATINFAffiche.prevuPar
          }, null, 8, ["subtitle"]),
          r(c, null, {
            default: n(() => t[1] || (t[1] = [
              f("Réprimée par")
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
  })) : (b(), A(w, {
    key: 1,
    type: "error"
  }, {
    default: n(() => t[2] || (t[2] = [
      f(" NATINF introuvable ")
    ])),
    _: 1
  }));
}
const j = /* @__PURE__ */ U(k, [["render", B]]), z = C({
  name: "CartoucheNATINF",
  props: {
    natinf: {
      type: Number,
      required: !0,
      default: 0
    }
  },
  async setup(e) {
    const { natinf: t } = I(e), o = g(!1), i = await $(t.value);
    return {
      NATINFAffiche: y(() => {
        if (i)
          return {
            couleur: N[i["Unnamed: 1"]].couleur || "primary",
            abr: `[${N[i["Unnamed: 1"]].abr}]` || "",
            texte: `${t.value} ${i["Unnamed: 2"]}` || "INTROUVABLE",
            prevuPar: i["Unnamed: 3"],
            reprimePar: i["Unnamed: 4"]
          };
      }),
      menu: o
    };
  }
});
function E(e, t, o, i, l, d) {
  const u = a("v-btn"), p = a("v-list-item"), s = a("v-list"), _ = a("v-card"), m = a("v-menu"), c = a("v-chip");
  return e.NATINFAffiche ? (b(), A(m, {
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
          r(s, { density: "compact" }, {
            default: n(() => [
              r(p, {
                variant: "tonal",
                title: "Prévue par"
              }),
              r(p, {
                lines: "three",
                subtitle: e.NATINFAffiche.prevuPar
              }, null, 8, ["subtitle"]),
              r(p, {
                variant: "tonal",
                title: "Réprimée par"
              }),
              r(p, {
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
  }, 8, ["modelValue"])) : (b(), A(c, {
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
const O = /* @__PURE__ */ U(z, [["render", E]]), Q = "https://tabular-api.data.gouv.fr/api/resources/3899108b-262c-46d4-8283-1c70f1cf4326/data/?", D = {
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
    const t = e, { multiple: o } = I(t), i = P(e, "modelValue"), l = x({
      resultats: [],
      aChercher: null,
      enCours: !1,
      recherche: null
    });
    return R(
      () => l.aChercher,
      (d) => {
        !d || (d == null ? void 0 : d.length) === 0 || l.enCours || (clearTimeout(l.recherche), l.recherche = setTimeout(async () => {
          l.enCours = !0;
          let u;
          const p = parseFloat(d);
          !isNaN(p) && isFinite(p) ? u = "Numéro NATINF__exact" : u = "Qualification de l'infraction__contains", fetch(`${Q}${u}=${d}`, {
            method: "GET",
            credentials: "include"
          }).then((s) => s.json()).then((s) => {
            l.resultats = [...s.data];
          }).catch((s) => {
            console.log(s);
          }).finally(() => {
            l.enCours = !1;
          });
        }, 1500));
      }
    ), (d, u) => {
      const p = a("v-chip"), s = a("v-list-item"), _ = a("v-autocomplete");
      return b(), A(_, {
        modelValue: i.value,
        "onUpdate:modelValue": u[0] || (u[0] = (m) => i.value = m),
        search: l.aChercher,
        "onUpdate:search": u[1] || (u[1] = (m) => l.aChercher = m),
        "no-filter": "",
        "return-object": "",
        items: l.resultats,
        loading: l.enCours,
        "item-title": "Qualification de l'infraction",
        label: "Code NATINF ou texte",
        placeholder: "Commencez à écrire...",
        "prepend-icon": "mdi-scale-balance",
        multiple: v(o),
        chips: "",
        "closable-chips": "",
        clearable: ""
      }, {
        chip: n(({ props: m, item: c }) => [
          r(p, F(m, {
            color: (v(N)[c.raw["Nature de l'infraction"]] || {}).couleur || "primary",
            text: `[${(v(N)[c.raw["Nature de l'infraction"]] || {}).abr || ""}] ${c.raw["Numéro NATINF"]} - ${c.raw["Qualification de l'infraction"]}`
          }), null, 16, ["color", "text"])
        ]),
        item: n(({ props: m, item: c }) => [
          r(s, F(m, {
            title: c.raw["Qualification de l'infraction"],
            subtitle: c.raw["Numéro NATINF"]
          }), {
            prepend: n(() => [
              r(p, {
                size: "x-small",
                color: (v(N)[c.raw["Nature de l'infraction"]] || {}).couleur || "primary",
                class: "mr-2",
                label: ""
              }, {
                default: n(() => [
                  f(T((v(N)[c.raw["Nature de l'infraction"]] || {}).abr || ""), 1)
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
}, M = {
  install(e) {
    e.component("CarteNATINF", j), e.component("CartoucheNATINF", O), e.component("RechercheNATINF", D);
  }
};
export {
  j as CarteNATINF,
  O as CartoucheNATINF,
  D as RechercheNATINF,
  M as default
};
