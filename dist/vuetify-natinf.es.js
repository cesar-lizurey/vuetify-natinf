import { defineComponent as C, toRefs as I, computed as y, resolveComponent as o, createBlock as A, openBlock as b, withCtx as n, createVNode as r, createTextVNode as N, toDisplayString as T, ref as V, mergeProps as F, mergeModels as P, useModel as R, reactive as x, watch as U, unref as v } from "vue";
const m = {
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
const w = (e, t) => {
  const l = e.__vccOpts || e;
  for (const [i, a] of t)
    l[i] = a;
  return l;
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
    const { natinf: t } = I(e), l = await $(t.value);
    return {
      NATINFAffiche: y(() => {
        var a;
        if (l)
          return {
            nature: l["Nature de l'infraction"] || "",
            couleur: ((a = m[l["Nature de l'infraction"]]) == null ? void 0 : a.couleur) || "primary",
            texte: l["Qualification de l'infraction"] || "INTROUVABLE",
            prevuPar: l["Définie par"],
            reprimePar: l["Réprimée par"]
          };
      })
    };
  }
});
function Q(e, t, l, i, a, p) {
  const c = o("v-toolbar-title"), f = o("v-toolbar"), u = o("v-list-item"), _ = o("v-list"), d = o("v-divider"), s = o("v-list-subheader"), h = o("v-card"), g = o("v-alert");
  return e.NATINFAffiche ? (b(), A(h, {
    key: 0,
    class: "mx-auto bg-surface",
    "max-width": "400"
  }, {
    default: n(() => [
      r(f, {
        color: e.NATINFAffiche.couleur
      }, {
        default: n(() => [
          r(c, null, {
            default: n(() => [
              N(T(e.natinf), 1)
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
          r(u, {
            title: e.NATINFAffiche.nature,
            subtitle: e.NATINFAffiche.texte
          }, null, 8, ["title", "subtitle"])
        ]),
        _: 1
      }),
      r(d),
      r(_, { class: "mx-auto bg-surface-variant" }, {
        default: n(() => [
          r(s, null, {
            default: n(() => t[0] || (t[0] = [
              N("Prévue par")
            ])),
            _: 1
          }),
          r(u, {
            lines: "three",
            subtitle: e.NATINFAffiche.prevuPar
          }, null, 8, ["subtitle"]),
          r(s, null, {
            default: n(() => t[1] || (t[1] = [
              N("Réprimée par")
            ])),
            _: 1
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
  })) : (b(), A(g, {
    key: 1,
    type: "error"
  }, {
    default: n(() => t[2] || (t[2] = [
      N(" NATINF introuvable ")
    ])),
    _: 1
  }));
}
const B = /* @__PURE__ */ w(k, [["render", Q]]), D = C({
  name: "CartoucheNATINF",
  props: {
    natinf: {
      type: Number,
      required: !0,
      default: 0
    }
  },
  async setup(e) {
    const { natinf: t } = I(e), l = V(!1), i = await $(t.value);
    return {
      NATINFAffiche: y(() => {
        var p, c;
        if (i)
          return {
            couleur: ((p = m[i["Nature de l'infraction"]]) == null ? void 0 : p.couleur) || "primary",
            abr: (c = m[i["Nature de l'infraction"]]) != null && c.abr ? `[${m[i["Nature de l'infraction"]].abr}]` : "",
            texte: `${t.value} ${i["Qualification de l'infraction"]}` || "INTROUVABLE",
            prevuPar: i["Définie par"],
            reprimePar: i["Réprimée par"]
          };
      }),
      menu: l
    };
  }
});
function j(e, t, l, i, a, p) {
  const c = o("v-btn"), f = o("v-list-item"), u = o("v-list"), _ = o("v-card"), d = o("v-menu"), s = o("v-chip");
  return e.NATINFAffiche ? (b(), A(d, {
    key: 0,
    modelValue: e.menu,
    "onUpdate:modelValue": t[0] || (t[0] = (h) => e.menu = h),
    "close-on-content-click": !1,
    location: "end"
  }, {
    activator: n(({ props: h }) => [
      r(c, F({
        size: "x-small",
        color: e.NATINFAffiche.couleur
      }, h, {
        class: "ma-2",
        variant: "outlined"
      }), {
        default: n(() => [
          N(T(e.NATINFAffiche.abr) + " " + T(e.NATINFAffiche.texte), 1)
        ]),
        _: 2
      }, 1040, ["color"])
    ]),
    default: n(() => [
      r(_, null, {
        default: n(() => [
          r(u, { density: "compact" }, {
            default: n(() => [
              r(f, {
                variant: "tonal",
                title: "Prévue par"
              }),
              r(f, {
                lines: "three",
                subtitle: e.NATINFAffiche.prevuPar
              }, null, 8, ["subtitle"]),
              r(f, {
                variant: "tonal",
                title: "Réprimée par"
              }),
              r(f, {
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
  }, 8, ["modelValue"])) : (b(), A(s, {
    key: 1,
    color: "error",
    class: "ma-2",
    "prepend-icon": "mdi-alert",
    size: "x-small"
  }, {
    default: n(() => t[1] || (t[1] = [
      N(" NATINF introuvable ")
    ])),
    _: 1
  }));
}
const z = /* @__PURE__ */ w(D, [["render", j]]), E = "https://tabular-api.data.gouv.fr/api/resources/3899108b-262c-46d4-8283-1c70f1cf4326/data/?", O = {
  __name: "RechercheNATINF",
  props: /* @__PURE__ */ P({
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
    const t = e, { multiple: l } = I(t), i = R(e, "modelValue"), a = x({
      resultats: [],
      aChercher: null,
      enCours: !1,
      recherche: null
    });
    return U(
      () => a.aChercher,
      (p) => {
        !p || (p == null ? void 0 : p.length) === 0 || a.enCours || (clearTimeout(a.recherche), a.recherche = setTimeout(async () => {
          a.enCours = !0;
          let c;
          const f = parseFloat(p);
          !isNaN(f) && isFinite(f) ? c = "Numéro NATINF__exact" : c = "Qualification de l'infraction__contains", fetch(`${E}${c}=${p}`, {
            method: "GET",
            credentials: "include"
          }).then((u) => u.json()).then((u) => {
            a.resultats = [...u.data];
          }).catch((u) => {
            console.log(u);
          }).finally(() => {
            a.enCours = !1;
          });
        }, 1500));
      }
    ), (p, c) => {
      const f = o("v-chip"), u = o("v-list-item"), _ = o("v-autocomplete");
      return b(), A(_, {
        modelValue: i.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => i.value = d),
        search: a.aChercher,
        "onUpdate:search": c[1] || (c[1] = (d) => a.aChercher = d),
        "no-filter": "",
        "return-object": "",
        items: a.resultats,
        loading: a.enCours,
        "item-title": "Qualification de l'infraction",
        label: "Code NATINF ou texte",
        placeholder: "Commencez à écrire...",
        "prepend-icon": "mdi-scale-balance",
        multiple: v(l),
        chips: "",
        "closable-chips": "",
        clearable: ""
      }, {
        chip: n(({ props: d, item: s }) => [
          r(f, F(d, {
            color: (v(m)[s.raw["Nature de l'infraction"]] || {}).couleur || "primary",
            text: `[${(v(m)[s.raw["Nature de l'infraction"]] || {}).abr || ""}] ${s.raw["Numéro NATINF"]} - ${s.raw["Qualification de l'infraction"]}`
          }), null, 16, ["color", "text"])
        ]),
        item: n(({ props: d, item: s }) => [
          r(u, F(d, {
            title: s.raw["Qualification de l'infraction"],
            subtitle: s.raw["Numéro NATINF"]
          }), {
            prepend: n(() => [
              r(f, {
                size: "x-small",
                color: (v(m)[s.raw["Nature de l'infraction"]] || {}).couleur || "primary",
                class: "mr-2",
                label: ""
              }, {
                default: n(() => [
                  N(T((v(m)[s.raw["Nature de l'infraction"]] || {}).abr || ""), 1)
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
    e.component("CarteNATINF", B), e.component("CartoucheNATINF", z), e.component("RechercheNATINF", O);
  }
};
export {
  B as CarteNATINF,
  z as CartoucheNATINF,
  O as RechercheNATINF,
  M as default
};
