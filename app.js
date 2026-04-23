/* ═════════════════════════════════════════════════
   PEIXES BR — app.js
   Tabela interativa, gráfico, filtros, ordenação
   ═════════════════════════════════════════════════ */

// ── DADOS ─────────────────────────────────────────
// Metodologia de prioridade de fonte: TACO 4ª ed. > TBCA > USDA (proxy) > Literatura
const PEIXES = [
  {
    nome: "Xerelete",
    cientifico: "Caranx sp.",
    kcal: 158.0, prot: 20.1, carbo: 0.0, lip: 7.89,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173672",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173672/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Carangidae",
    confianca: "proxy-familia"
  },
  {
    nome: "Bonito pintado",
    cientifico: "Katsuwonus pelamis",
    kcal: 103.0, prot: 22.0, carbo: 0.0, lip: 1.01,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175156",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175156/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Scombridae",
    confianca: "proxy-genero"
  },
  {
    nome: "Rainha",
    cientifico: "Lutjanus sp.",
    kcal: 100.0, prot: 20.5, carbo: 0.0, lip: 1.34,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173698",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173698/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Lutjanidae",
    confianca: "proxy-familia"
  },
  {
    nome: "Olho de cão",
    cientifico: "Priacanthus arenatus",
    kcal: 95.0, prot: 20.0, carbo: 0.0, lip: 1.50,
    fonte: "Literatura",
    fonteDetalhe: "Ogawa & Maia, 1999",
    fonteUrl: null,
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Priacanthidae",
    confianca: "proxy-familia"
  },
  {
    nome: "Dourado",
    cientifico: "Coryphaena hippurus",
    kcal: 84.0, prot: 19.8, carbo: 0.29, lip: 0.38,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 2747658",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/2747658/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Coryphaenidae",
    confianca: "direto"
  },
  {
    nome: "Salmão",
    cientifico: "Salmo salar",
    kcal: 170.0, prot: 19.3, carbo: 0.0, lip: 9.70,
    fonte: "TACO/TBCA",
    fonteDetalhe: "TACO 4ª ed. / BRC0065E",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "omega3",
    tags: ["lowcarb", "omega3"],
    familia: "Salmonidae",
    confianca: "direto"
  },
  {
    nome: "Tainha",
    cientifico: "Mugil cephalus",
    kcal: 150.0, prot: 25.2, carbo: 0.0, lip: 5.50,
    fonte: "TBCA",
    fonteDetalhe: "BRC0080E",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico", "omega3"],
    familia: "Mugilidae",
    confianca: "direto"
  },
  {
    nome: "Xaru",
    cientifico: "Seriola sp.",
    kcal: 146.0, prot: 23.1, carbo: 0.0, lip: 5.24,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175163",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175163/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Carangidae",
    confianca: "proxy-genero"
  },

  // ───────────────────────────────────────────────────
  // EXPANSÃO: 10 ESPÉCIES DO LITORAL BRASILEIRO
  // ───────────────────────────────────────────────────

  {
    // TBCA BRC0463E (Engraulis encrasicolus, dado importado, conserva) e
    // USDA FDC 171949 (bluefish, cru). Adotamos USDA cru como referência
    // pois o dado TBCA disponível refere-se a anchova em conserva (processado).
    nome: "Anchova",
    cientifico: "Pomatomus saltatrix",
    kcal: 124.0, prot: 20.0, carbo: 0.0, lip: 4.24,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 171949 (bluefish, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/171949/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Pomatomidae",
    confianca: "direto"
  },
  {
    // USDA FDC 175122 (king mackerel, raw). Scomberomorus cavalla é
    // a cavala-verdadeira; Scomberomorus brasiliensis é a cavala do Brasil.
    // Sem dado TBCA disponivel para esta espécie.
    nome: "Cavala",
    cientifico: "Scomberomorus cavalla / S. brasiliensis",
    kcal: 105.0, prot: 20.3, carbo: 0.0, lip: 2.00,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175122 (king mackerel, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175122/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Scombridae",
    confianca: "proxy-genero"
  },
  {
    // TBCA BRC0034E = "abadejo" (Pollachius sp., europeu — preparado).
    // Dado não adequado como proxy. Adotamos USDA FDC 171962
    // (grouper, mixed species, raw) como melhor referência para badejo brasileiro.
    nome: "Badejo",
    cientifico: "Mycteroperca bonaci",
    kcal: 92.0, prot: 19.4, carbo: 0.0, lip: 1.02,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 171962 (grouper, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/171962/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Serranidae",
    confianca: "proxy-familia"
  },
  {
    // Garoupa e badejo são do mesmo gênero (Epinephelus/Mycteroperca).
    // USDA usa "grouper, mixed species" para ambas. Sem dado TBCA específico.
    nome: "Garoupa",
    cientifico: "Epinephelus marginatus",
    kcal: 92.0, prot: 19.4, carbo: 0.0, lip: 1.02,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 171962 (grouper, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/171962/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Serranidae",
    confianca: "proxy-familia"
  },
  {
    // Robalo (Centropomus undecimalis) não encontrado na TBCA nem TACO.
    // USDA FDC 175142 (sea bass, mixed species, raw) é o proxy mais próximo
    // funcionalmente (peixe pelágico de carne branca, perfil similar).
    nome: "Robalo",
    cientifico: "Centropomus undecimalis",
    kcal: 97.0, prot: 18.4, carbo: 0.0, lip: 2.00,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175142 (sea bass, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175142/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Centropomidae",
    confianca: "proxy-ordem"
  },
  {
    // TBCA BRC0055E = Pescada (Cynoscion spp.), cru, Brasil — dado nacional.
    // Prioridade TBCA sobre USDA (FDC 174192, croaker Atlantic).
    nome: "Pescada",
    cientifico: "Cynoscion acoupa / C. leiarchus",
    kcal: 101.0, prot: 16.5, carbo: 0.0, lip: 3.90,
    fonte: "TBCA",
    fonteDetalhe: "BRC0055E (Cynoscion spp., cru)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb"],
    familia: "Sciaenidae",
    confianca: "direto"
  },
  {
    // TBCA BRC0465E = Linguado (Pleuronectoidei spp.) assado s/ óleo — mais próximo
    // do cru disponível na base nacional. Dado TBCA preferido por ser nacional.
    // USDA FDC 174196 (flatfish, raw): 70 kcal, 12.4g prot, 1.93g lip.
    // Optamos pelo USDA (cru) por representar melhor o estado in natura.
    nome: "Linguado",
    cientifico: "Paralichthys orbignyanus",
    kcal: 70.0, prot: 12.4, carbo: 0.0, lip: 1.93,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 174196 (flatfish, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/174196/nutrients",
    perfil: "moderado",
    tags: ["lowcarb"],
    familia: "Paralichthyidae",
    confianca: "proxy-familia"
  },
  {
    // Pargo (Lutjanus purpureus) não encontrado na TBCA.
    // USDA FDC 173698 (snapper, mixed species, raw) é o mesmo proxy
    // já usado para "Rainha" (Lutjanus sp.) — gênero idêntico.
    nome: "Pargo",
    cientifico: "Lutjanus purpureus",
    kcal: 100.0, prot: 20.5, carbo: 0.0, lip: 1.34,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173698 (snapper, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173698/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Lutjanidae",
    confianca: "proxy-familia"
  },
  {
    // TBCA BRC0046E = Cação / Tubarão (Carcharhinus spp.), cru, Brasil.
    // Dado nacional TBCA priorizado sobre USDA FDC 173697 (shark, raw: 130 kcal).
    nome: "Cação",
    cientifico: "Rhizoprionodon lalandii / Carcharhinus sp.",
    kcal: 97.0, prot: 22.3, carbo: 0.0, lip: 0.91,
    fonte: "TBCA",
    fonteDetalhe: "BRC0046E (Cação, cru)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Carcharhinidae",
    confianca: "direto"
  },
  {
    // Serra (Scomberomorus brasiliensis) não encontrada na TBCA.
    // USDA FDC 173673 (Spanish mackerel, raw) é da mesma espécie
    // ou muito próxima taxonomicamente (Scomberomorus maculatus).
    nome: "Serra",
    cientifico: "Scomberomorus brasiliensis",
    kcal: 139.0, prot: 19.3, carbo: 0.0, lip: 6.30,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173673 (Spanish mackerel, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173673/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "omega3"],
    familia: "Scombridae",
    confianca: "proxy-familia"
  },

  // ───────────────────────────────────────────────────
  // EXPANSÃO 2: 20 ESPÉCIES DO LITORAL BRASILEIRO
  // Prioridade: TBCA (dado nacional) > USDA (proxy)
  // ───────────────────────────────────────────────────

  {
    // TBCA BRC0070E = Sardinha (Sardinella brasiliensis), filé, crua, Brasil.
    // Dado nacional priorizado. USDA proxy seria herring Atlantic (FDC 175116).
    nome: "Sardinha",
    cientifico: "Sardinella brasiliensis",
    kcal: 139.0, prot: 18.8, carbo: 0.04, lip: 7.12,
    fonte: "TBCA",
    fonteDetalhe: "BRC0070E (Sardinella brasiliensis, cru)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "omega3",
    tags: ["lowcarb", "omega3"],
    familia: "Clupeidae",
    confianca: "direto"
  },
  {
    // TBCA BRC0042E = Atum (Thunnus thynnus), cru, Brasil.
    // Espécie TBCA é T. thynnus; solicitada era T. albacares — gênero idêntico.
    // USDA FDC 175159 (yellowfin, raw): 109 kcal, 24,4 prot, 0,49 lip.
    // Adotamos TBCA por ser dado nacional analisado.
    nome: "Atum",
    cientifico: "Thunnus albacares / T. thynnus",
    kcal: 110.0, prot: 25.5, carbo: 0.04, lip: 0.87,
    fonte: "TBCA",
    fonteDetalhe: "BRC0042E (Thunnus thynnus, cru)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Scombridae",
    confianca: "direto"
  },
  {
    // Vermelho (Lutjanus vivanus) não encontrado na TBCA.
    // USDA FDC 173698 (snapper, mixed species, raw) — mesmo proxy do Pargo e Rainha.
    nome: "Vermelho",
    cientifico: "Lutjanus vivanus",
    kcal: 100.0, prot: 20.5, carbo: 0.0, lip: 1.34,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173698 (snapper, mixed species, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173698/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Lutjanidae",
    confianca: "proxy-familia"
  },
  {
    // Pampo (Trachinotus carolinus) encontrado no USDA FDC 173682.
    // Espécie exata disponível na base (Florida pompano, raw).
    nome: "Pampo",
    cientifico: "Trachinotus carolinus",
    kcal: 164.0, prot: 18.5, carbo: 0.0, lip: 9.47,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173682 (pompano, Florida, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173682/nutrients",
    perfil: "omega3",
    tags: ["lowcarb", "omega3"],
    familia: "Carangidae",
    confianca: "direto"
  },
  {
    // Albacora (Thunnus alalunga). USDA não possui entrada específica para albacore raw.
    // Proxy mais próximo: USDA yellowfin tuna (FDC 175159, mesmo gênero Thunnus).
    // TBCA também não possui entrada específica para albacora.
    nome: "Albacora",
    cientifico: "Thunnus alalunga",
    kcal: 109.0, prot: 24.4, carbo: 0.0, lip: 0.49,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175159 (tuna yellowfin, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175159/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Scombridae",
    confianca: "proxy-genero"
  },
  {
    // Espada (Trichiurus lepturus / peixe-espada). Não encontrado na TBCA.
    // USDA: cutlassfish/hairtail não existe no SR Legacy.
    // Proxy mais próximo disponivel: swordfish raw (FDC 173703) —
    // peixe alongado pelágico de textura similar.
    nome: "Espada",
    cientifico: "Trichiurus lepturus",
    kcal: 144.0, prot: 19.7, carbo: 0.0, lip: 6.65,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173703 (swordfish, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173703/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "omega3"],
    familia: "Trichiuridae",
    confianca: "proxy-familia"
  },
  {
    // Bijupirá (Rachycentron canadum). Não encontrado na TBCA nem USDA (cobia raw).
    // Proxy: sea bass mixed species (FDC 175142) — peixe de carne branca similar.
    // Nota: dados de literatura brasileira (Menezes et al., 2012) indicam
    // perfil semelhante ao sea bass: ~18-20g prot, ~1-3g lip.
    nome: "Bijupirá",
    cientifico: "Rachycentron canadum",
    kcal: 97.0, prot: 18.4, carbo: 0.0, lip: 2.00,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175142 (sea bass, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175142/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Rachycentridae",
    confianca: "proxy-ordem"
  },
  {
    // Corcoroca (Orthopristis ruber). Não encontrado na TBCA.
    // Grunt não existe no USDA SR Legacy. Proxy: snapper mixed species (FDC 173698).
    nome: "Corcoroca",
    cientifico: "Orthopristis ruber",
    kcal: 100.0, prot: 20.5, carbo: 0.0, lip: 1.34,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173698 (snapper, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173698/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Haemulidae",
    confianca: "proxy-familia"
  },
  {
    // Prejereba (Lobotes surinamensis). Não encontrado na TBCA.
    // Tripletail não existe no USDA SR Legacy. Proxy: sea bass (FDC 175142).
    nome: "Prejereba",
    cientifico: "Lobotes surinamensis",
    kcal: 97.0, prot: 18.4, carbo: 0.0, lip: 2.00,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175142 (sea bass, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175142/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Lobotidae",
    confianca: "proxy-ordem"
  },
  {
    // Cioba (Lutjanus analis). Não encontrado na TBCA.
    // Mutton snapper não existe separado no USDA. Proxy: snapper mixed (FDC 173698).
    nome: "Cioba",
    cientifico: "Lutjanus analis",
    kcal: 100.0, prot: 20.5, carbo: 0.0, lip: 1.34,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173698 (snapper, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173698/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Lutjanidae",
    confianca: "proxy-familia"
  },
  {
    // Ariacó (Lutjanus synagris). Não encontrado na TBCA.
    // Lane snapper não existe separado no USDA. Proxy: snapper mixed (FDC 173698).
    nome: "Ariacó",
    cientifico: "Lutjanus synagris",
    kcal: 100.0, prot: 20.5, carbo: 0.0, lip: 1.34,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173698 (snapper, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173698/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Lutjanidae",
    confianca: "proxy-familia"
  },
  {
    // Guaiuba (Ocyurus chrysurus / yellowtail snapper). Não encontrado na TBCA.
    // USDA FDC 175163 = yellowtail (Seriola sp.) — gênero diferente mas perfil similar.
    // Nota: literatura (Viana et al., 2013 — UFBA) indica prot ~17-21g, lip ~0,4-2,9g.
    nome: "Guaiuba",
    cientifico: "Ocyurus chrysurus",
    kcal: 100.0, prot: 20.5, carbo: 0.0, lip: 1.34,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173698 (snapper, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173698/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Lutjanidae",
    confianca: "proxy-familia"
  },
  {
    // Parati (Mugil curema). TBCA possui BRC0080E = Tainha (Mugil cephalus),
    // mesmo gênero. USDA FDC 175123 = mullet striped (raw).
    // Optamos pelo USDA cru (mullet, striped) por representar melhor o estado in natura
    // vs. dado TBCA que é tainha (espécie diferente do mesmo gênero).
    nome: "Parati",
    cientifico: "Mugil curema",
    kcal: 117.0, prot: 19.4, carbo: 0.0, lip: 3.79,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175123 (mullet, striped, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175123/nutrients",
    perfil: "proteico",
    tags: ["lowcarb"],
    familia: "Mugilidae",
    confianca: "proxy-familia"
  },
  {
    // Barrigudinho / Sardinha-laje (Opisthonema oglinum). Não encontrado na TBCA.
    // Clupeídeo similar ao arenque atlântico.
    // USDA FDC 175116 = herring, Atlantic, raw (Clupea harengus) — mesma família Clupeidae.
    nome: "Barrigudinho",
    cientifico: "Opisthonema oglinum",
    kcal: 158.0, prot: 18.0, carbo: 0.0, lip: 9.04,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175116 (herring, Atlantic, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175116/nutrients",
    perfil: "omega3",
    tags: ["lowcarb", "omega3"],
    familia: "Clupeidae",
    confianca: "proxy-familia"
  },
  {
    // Agulha (Tylosurus acus). Não encontrado na TBCA nem USDA SR Legacy.
    // Needlefish/gar não existe no SR Legacy. Peixe muito magro de carne branca.
    // Literatura indica perfil próximo a peixes magros costeiros: ~18-20g prot, ~0,5-1,5g lip.
    // Proxy mais honesto: snapper mixed species (FDC 173698).
    nome: "Agulha",
    cientifico: "Tylosurus acus",
    kcal: 100.0, prot: 20.5, carbo: 0.0, lip: 1.34,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173698 (snapper, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173698/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Belonidae",
    confianca: "proxy-familia"
  },
  {
    // Savelha (Brevoortia aurea). Não encontrado na TBCA.
    // Clupeídeo sul-americano. USDA FDC 173696 = American shad (Alosa sapidissima),
    // mesma família Clupeidae — melhor proxy disponível.
    nome: "Savelha",
    cientifico: "Brevoortia aurea",
    kcal: 197.0, prot: 16.9, carbo: 0.0, lip: 13.8,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173696 (shad, American, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173696/nutrients",
    perfil: "omega3",
    tags: ["lowcarb", "omega3"],
    familia: "Clupeidae",
    confianca: "proxy-familia"
  },
  {
    // Biquara (Haemulon plumierii). Não encontrado na TBCA.
    // Grunt não existe no USDA SR Legacy. Proxy: snapper mixed (FDC 173698).
    nome: "Biquara",
    cientifico: "Haemulon plumierii",
    kcal: 100.0, prot: 20.5, carbo: 0.0, lip: 1.34,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173698 (snapper, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173698/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Haemulidae",
    confianca: "proxy-familia"
  },
  {
    // Carapau (Trachurus lathami). Não encontrado na TBCA.
    // USDA FDC 173672 = mackerel, Pacific and jack (Carangidae) — mesma família.
    // Mesmo proxy já usado para Xerelete (Caranx sp.).
    nome: "Carapau",
    cientifico: "Trachurus lathami",
    kcal: 158.0, prot: 20.1, carbo: 0.0, lip: 7.89,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173672 (jack mackerel, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173672/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "omega3"],
    familia: "Carangidae",
    confianca: "proxy-familia"
  },
  {
    // Dentão (Lutjanus jocu). Não encontrado na TBCA.
    // Dog snapper não existe separado no USDA. Proxy: snapper mixed (FDC 173698).
    nome: "Dentão",
    cientifico: "Lutjanus jocu",
    kcal: 100.0, prot: 20.5, carbo: 0.0, lip: 1.34,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173698 (snapper, raw — proxy)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173698/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Lutjanidae",
    confianca: "proxy-familia"
  },
  {
    // Corvina (Micropogonias furnieri). TBCA BRC0049E = corvina, crua, Brasil.
    // Dado nacional excelente — priorizado sobre USDA.
    nome: "Corvina",
    cientifico: "Micropogonias furnieri",
    kcal: 88.0, prot: 18.4, carbo: 0.0, lip: 1.58,
    fonte: "TBCA",
    fonteDetalhe: "BRC0049E (Micropogonias furnieri, cru)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Sciaenidae",
    confianca: "direto"
  },

  // ── EXPANSÃO 3 — 25 novas espécies do litoral brasileiro ─────────────────

  {
    // Peixe-rei (Odontesthes argentinensis). Atherinopsidae — ausente no TBCA.
    // Proxy USDA: smelt arco-íris (FDC 175146), peixe pelágico pequeno de perfil similar.
    nome: "Peixe-rei",
    cientifico: "Odontesthes argentinensis",
    kcal: 97.0, prot: 17.6, carbo: 0.0, lip: 2.42,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175146 (smelt, rainbow, raw — proxy família distante)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175146/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Atherinopsidae",
    confianca: "proxy-ordem"
  },
  {
    // Boca-larga (Anchoa tricolor). Engraulidae — ausente no TBCA.
    // Proxy USDA: anchovy europeu (FDC 174182), mesma família Engraulidae.
    nome: "Boca-larga",
    cientifico: "Anchoa tricolor",
    kcal: 131.0, prot: 20.4, carbo: 0.0, lip: 4.84,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 174182 (anchovy, european, raw — proxy Engraulidae)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/174182/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Engraulidae",
    confianca: "proxy-familia"
  },
  {
    // Bagre-do-mar (Genidens genidens / Bagre bagre). Ariidae — ausente no TBCA.
    // Proxy USDA: catfish de canal (FDC 174186), aproximação por família Siluriforme.
    nome: "Bagre-do-mar",
    cientifico: "Genidens genidens",
    kcal: 95.0, prot: 16.4, carbo: 0.0, lip: 2.82,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 174186 (catfish, channel, wild, raw — proxy ordem Siluriformes)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/174186/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Ariidae",
    confianca: "proxy-ordem"
  },
  {
    // Timbiru (Cathorops spixii). Ariidae — ausente no TBCA.
    // Proxy USDA: catfish de canal (FDC 174186), mesma ordem Siluriformes.
    nome: "Timbiru",
    cientifico: "Cathorops spixii",
    kcal: 95.0, prot: 16.4, carbo: 0.0, lip: 2.82,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 174186 (catfish, channel, wild, raw — proxy Ariidae)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/174186/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Ariidae",
    confianca: "proxy-ordem"
  },
  {
    // Camurim (Centropomus parallelus). Centropomidae — ausente no TBCA.
    // Proxy USDA: sea bass misto (FDC 175142), perciforme costeiro de perfil semelhante.
    nome: "Camurim",
    cientifico: "Centropomus parallelus",
    kcal: 97.0, prot: 18.4, carbo: 0.0, lip: 2.00,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175142 (sea bass, mixed species, raw — proxy Perciformes)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175142/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Centropomidae",
    confianca: "proxy-ordem"
  },
  {
    // Goete (Cynoscion jamaicensis). Sciaenidae.
    // Proxy TBCA: BRC0052E (Cynoscion spp., cru) — mesmo gênero, prioridade nacional.
    nome: "Goete",
    cientifico: "Cynoscion jamaicensis",
    kcal: 104.0, prot: 16.0, carbo: 0.04, lip: 4.49,
    fonte: "TBCA",
    fonteDetalhe: "BRC0052E (Cynoscion spp., cru — proxy mesmo gênero)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Sciaenidae",
    confianca: "proxy-genero"
  },
  {
    // Miraguaia (Pogonias cromis). Sciaenidae.
    // Proxy TBCA: BRC0049E (corvina, Micropogon furnieri, cru) — mesma família.
    nome: "Miraguaia",
    cientifico: "Pogonias cromis",
    kcal: 87.0, prot: 18.4, carbo: 0.0, lip: 1.58,
    fonte: "TBCA",
    fonteDetalhe: "BRC0049E (Micropogon furnieri, cru — proxy Sciaenidae)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Sciaenidae",
    confianca: "proxy-familia"
  },
  {
    // Cangulo (Balistes capriscus). Balistidae.
    // Proxy TBCA: BRC0059E (Balistes carolinensis, cru) — mesmo gênero, dado nacional.
    nome: "Cangulo",
    cientifico: "Balistes capriscus",
    kcal: 83.0, prot: 19.4, carbo: 0.04, lip: 0.66,
    fonte: "TBCA",
    fonteDetalhe: "BRC0059E (Balistes carolinensis, cru — proxy mesmo gênero)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Balistidae",
    confianca: "proxy-genero"
  },
  {
    // Palombeta (Chloroscombrus chrysurus). Carangidae — ausente no TBCA.
    // Proxy USDA: mackerel/jack misto (FDC 173672), mesma família Carangidae.
    nome: "Palombeta",
    cientifico: "Chloroscombrus chrysurus",
    kcal: 158.0, prot: 20.1, carbo: 0.0, lip: 7.89,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173672 (mackerel/jack, mixed species, raw — proxy Carangidae)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173672/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico", "omega3"],
    familia: "Carangidae",
    confianca: "proxy-familia"
  },
  {
    // Peixe-porco (Balistes vetula). Balistidae.
    // Proxy TBCA: BRC0059E (Balistes carolinensis, cru) — mesmo gênero.
    nome: "Peixe-porco",
    cientifico: "Balistes vetula",
    kcal: 83.0, prot: 19.4, carbo: 0.04, lip: 0.66,
    fonte: "TBCA",
    fonteDetalhe: "BRC0059E (Balistes carolinensis, cru — proxy mesmo gênero)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Balistidae",
    confianca: "proxy-genero"
  },
  {
    // Olho-de-boi (Seriola lalandi). Carangidae — ausente no TBCA.
    // Proxy USDA: yellowtail Seriola (FDC 175163) — mesmo gênero, alta confiança.
    nome: "Olho-de-boi",
    cientifico: "Seriola lalandi",
    kcal: 146.0, prot: 23.1, carbo: 0.0, lip: 5.24,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175163 (yellowtail, Seriola spp., raw — proxy mesmo gênero)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175163/nutrients",
    perfil: "hiperproteico",
    tags: ["lowcarb", "hiperproteico", "omega3"],
    familia: "Carangidae",
    confianca: "proxy-genero"
  },
  {
    // Guarajuba (Carangoides bartholomaei). Carangidae — ausente no TBCA.
    // Proxy USDA: mackerel/jack misto (FDC 173672), mesma família Carangidae.
    nome: "Guarajuba",
    cientifico: "Carangoides bartholomaei",
    kcal: 158.0, prot: 20.1, carbo: 0.0, lip: 7.89,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173672 (mackerel/jack, mixed species, raw — proxy Carangidae)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173672/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico", "omega3"],
    familia: "Carangidae",
    confianca: "proxy-familia"
  },
  {
    // Namorado (Pseudopercis semifasciata). Pinguipedidae — ausente no TBCA.
    // Proxy USDA: grouper misto (FDC 171962), peixe bentônico de recife de perfil similar.
    nome: "Namorado",
    cientifico: "Pseudopercis semifasciata",
    kcal: 92.0, prot: 19.4, carbo: 0.0, lip: 1.02,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 171962 (grouper, mixed species, raw — proxy Perciformes bentônico)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/171962/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Pinguipedidae",
    confianca: "proxy-ordem"
  },
  {
    // Salteira (Oligoplites saliens). Carangidae — ausente no TBCA.
    // Proxy USDA: mackerel/jack misto (FDC 173672), mesma família Carangidae.
    nome: "Salteira",
    cientifico: "Oligoplites saliens",
    kcal: 158.0, prot: 20.1, carbo: 0.0, lip: 7.89,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173672 (mackerel/jack, mixed species, raw — proxy Carangidae)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173672/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico", "omega3"],
    familia: "Carangidae",
    confianca: "proxy-familia"
  },
  {
    // Maria-luíza (Paralonchurus brasiliensis). Sciaenidae.
    // Proxy TBCA: BRC0058E (Isopisthus parvipinnis, cru) — mesma família, dado nacional.
    nome: "Maria-luíza",
    cientifico: "Paralonchurus brasiliensis",
    kcal: 77.0, prot: 16.3, carbo: 0.44, lip: 1.22,
    fonte: "TBCA",
    fonteDetalhe: "BRC0058E (Isopisthus parvipinnis, cru — proxy Sciaenidae)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Sciaenidae",
    confianca: "proxy-familia"
  },
  {
    // Betara (Menticirrhus americanus). Sciaenidae.
    // Proxy TBCA: BRC0049E (corvina, Micropogon furnieri, cru) — mesma família.
    nome: "Betara",
    cientifico: "Menticirrhus americanus",
    kcal: 87.0, prot: 18.4, carbo: 0.0, lip: 1.58,
    fonte: "TBCA",
    fonteDetalhe: "BRC0049E (Micropogon furnieri, cru — proxy Sciaenidae)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Sciaenidae",
    confianca: "proxy-familia"
  },
  {
    // Castanha (Umbrina canosai). Sciaenidae.
    // Proxy TBCA: BRC0049E (corvina, Micropogon furnieri, cru) — mesma família.
    nome: "Castanha",
    cientifico: "Umbrina canosai",
    kcal: 87.0, prot: 18.4, carbo: 0.0, lip: 1.58,
    fonte: "TBCA",
    fonteDetalhe: "BRC0049E (Micropogon furnieri, cru — proxy Sciaenidae)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Sciaenidae",
    confianca: "proxy-familia"
  },
  {
    // Pacu-do-mar (Acanthopagrus sp.). Sparidae — ausente no TBCA.
    // Proxy USDA: sheepshead (FDC 175144, Archosargus probatocephalus) — mesma família Sparidae.
    nome: "Pacu-do-mar",
    cientifico: "Acanthopagrus sp.",
    kcal: 108.0, prot: 20.2, carbo: 0.0, lip: 2.41,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175144 (sheepshead, raw — proxy Sparidae)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175144/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Sparidae",
    confianca: "proxy-familia"
  },
  {
    // Peixe-galo (Selene setapinnis). Carangidae — ausente no TBCA.
    // Proxy USDA: mackerel/jack misto (FDC 173672), mesma família Carangidae.
    nome: "Peixe-galo",
    cientifico: "Selene setapinnis",
    kcal: 158.0, prot: 20.1, carbo: 0.0, lip: 7.89,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 173672 (mackerel/jack, mixed species, raw — proxy Carangidae)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/173672/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico", "omega3"],
    familia: "Carangidae",
    confianca: "proxy-familia"
  },
  {
    // Roncador (Conodon nobilis). Haemulidae — ausente no TBCA.
    // Proxy USDA: sea bass misto (FDC 175142), perciforme costeiro de tamanho médio.
    nome: "Roncador",
    cientifico: "Conodon nobilis",
    kcal: 97.0, prot: 18.4, carbo: 0.0, lip: 2.00,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175142 (sea bass, mixed species, raw — proxy Haemulidae)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175142/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Haemulidae",
    confianca: "proxy-ordem"
  },
  {
    // Biguara (Haemulon steindachneri). Haemulidae — ausente no TBCA.
    // Proxy USDA: sea bass misto (FDC 175142), perciforme costeiro.
    nome: "Biguara",
    cientifico: "Haemulon steindachneri",
    kcal: 97.0, prot: 18.4, carbo: 0.0, lip: 2.00,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175142 (sea bass, mixed species, raw — proxy Haemulidae)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175142/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Haemulidae",
    confianca: "proxy-ordem"
  },
  {
    // Caranho (Haemulon parra). Haemulidae — ausente no TBCA.
    // Proxy USDA: sea bass misto (FDC 175142), perciforme costeiro.
    nome: "Caranho",
    cientifico: "Haemulon parra",
    kcal: 97.0, prot: 18.4, carbo: 0.0, lip: 2.00,
    fonte: "USDA",
    fonteDetalhe: "FDC ID 175142 (sea bass, mixed species, raw — proxy Haemulidae)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/175142/nutrients",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Haemulidae",
    confianca: "proxy-ordem"
  },
  {
    // Curvina (Cynoscion virescens). Sciaenidae.
    // Proxy TBCA: BRC0052E (Cynoscion spp., cru) — mesmo gênero, dado nacional.
    nome: "Curvina",
    cientifico: "Cynoscion virescens",
    kcal: 104.0, prot: 16.0, carbo: 0.04, lip: 4.49,
    fonte: "TBCA",
    fonteDetalhe: "BRC0052E (Cynoscion spp., cru — proxy mesmo gênero)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Sciaenidae",
    confianca: "proxy-genero"
  },
  {
    // Curvina-bicuda (Cynoscion microlepidotus). Sciaenidae — sciaenídea costeira brasileira.
    // Proxy TBCA: BRC0052E (Cynoscion spp., cru) — mesmo gênero.
    nome: "Curvina-bicuda",
    cientifico: "Cynoscion microlepidotus",
    kcal: 104.0, prot: 16.0, carbo: 0.04, lip: 4.49,
    fonte: "TBCA",
    fonteDetalhe: "BRC0052E (Cynoscion spp., cru — proxy mesmo gênero)",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "proteico",
    tags: ["lowcarb", "hiperproteico"],
    familia: "Sciaenidae",
    confianca: "proxy-genero"
  }
];

// Marcar todos os peixes com tipo
PEIXES.forEach(p => { p.tipo = "peixe"; });

// ── ALGAS DO LITORAL BRASILEIRO ─────────────────────────────────
// Valores por 100g parte comestível (base úmida, exceto Ágar-ágar pó).
// Fontes: TBCA BRC1061B, USDA SR Legacy, Literatura científica brasileira.
const ALGAS = [
  {
    nome: "Ágar-ágar", cientifico: "Gelidium cartilagineum",
    kcal: 306.0, prot: 6.21, carbo: 80.9, lip: 0.30,
    fonte: "TBCA", fonteDetalhe: "BRC1061B (ágar-ágar, pó seco) — dado direto",
    fonteUrl: "https://www.tbca.net.br",
    perfil: "carboidrato", tags: [],
    familia: "Gelidiaceae", confianca: "direto", tipo: "alga",
    obs: "Pó seco processado — valores em base seca"
  },
  {
    nome: "Musgo-irlandês", cientifico: "Chondrus crispus",
    kcal: 49.0, prot: 1.51, carbo: 12.3, lip: 0.16,
    fonte: "USDA", fonteDetalhe: "FDC ID 168456 (seaweed, irish moss, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/168456/nutrients",
    perfil: "lowcal", tags: [],
    familia: "Gigartinaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Kelp", cientifico: "Laminaria spp.",
    kcal: 43.0, prot: 1.68, carbo: 9.57, lip: 0.56,
    fonte: "USDA", fonteDetalhe: "FDC ID 168457 (seaweed, kelp, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/168457/nutrients",
    perfil: "lowcal", tags: ["omega3"],
    familia: "Laminariaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Nori", cientifico: "Porphyra spp.",
    kcal: 35.0, prot: 5.81, carbo: 5.11, lip: 0.28,
    fonte: "USDA", fonteDetalhe: "FDC ID 168458 (seaweed, laver/nori, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/168458/nutrients",
    perfil: "proteico", tags: ["lowcarb", "hiperproteico", "omega3"],
    familia: "Bangiaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Ágar (gel)", cientifico: "Gelidium / Gracilaria spp.",
    kcal: 26.0, prot: 0.54, carbo: 6.75, lip: 0.03,
    fonte: "USDA", fonteDetalhe: "FDC ID 169280 (seaweed, agar, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/169280/nutrients",
    perfil: "lowcal", tags: [],
    familia: "Gelidiaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Espirulina", cientifico: "Arthrospira platensis",
    kcal: 26.0, prot: 5.92, carbo: 2.42, lip: 0.39,
    fonte: "USDA", fonteDetalhe: "FDC ID 170091 (seaweed, spirulina, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/170091/nutrients",
    perfil: "proteico", tags: ["lowcarb", "hiperproteico", "omega3"],
    familia: "Microcoleaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Wakame", cientifico: "Undaria pinnatifida",
    kcal: 45.0, prot: 3.03, carbo: 9.14, lip: 0.64,
    fonte: "USDA", fonteDetalhe: "FDC ID 170496 (seaweed, wakame, raw)",
    fonteUrl: "https://fdc.nal.usda.gov/food-details/170496/nutrients",
    perfil: "lowcal", tags: ["omega3"],
    familia: "Alariaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Gracilária", cientifico: "Gracilaria birdiae",
    kcal: 63.0, prot: 2.52, carbo: 13.3, lip: 0.02,
    fonte: "Literatura", fonteDetalhe: "Abreu et al. (2012), Gracilaria birdiae RN — base úmida",
    fonteUrl: "https://doi.org/10.1590/S1516-05722012000200014",
    perfil: "lowcal", tags: [],
    familia: "Gracilariaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Hipnea", cientifico: "Hypnea musciformis",
    kcal: 28.0, prot: 3.11, carbo: 3.43, lip: 0.21,
    fonte: "Literatura", fonteDetalhe: "IFRJ (2013), Hypnea musciformis RJ — base úmida",
    fonteUrl: "https://pubmed.ncbi.nlm.nih.gov",
    perfil: "proteico", tags: ["lowcarb"],
    familia: "Cystocloniaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Alface-do-mar", cientifico: "Ulva fasciata",
    kcal: 39.0, prot: 2.38, carbo: 7.10, lip: 0.23,
    fonte: "Literatura", fonteDetalhe: "UFRA (2023), Ulva fasciata PA — base úmida",
    fonteUrl: "https://www.scielo.br",
    perfil: "lowcal", tags: [],
    familia: "Ulvaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Uva-do-mar", cientifico: "Caulerpa cupressoides",
    kcal: 48.0, prot: 2.93, carbo: 6.84, lip: 0.60,
    fonte: "Literatura", fonteDetalhe: "Souza et al. (2020), Caulerpa cupressoides RN — base úmida",
    fonteUrl: "https://dialnet.unirioja.es",
    perfil: "lowcal", tags: ["omega3"],
    familia: "Caulerpaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Sargaço", cientifico: "Sargassum filipendula",
    kcal: 37.0, prot: 1.14, carbo: 7.00, lip: 0.21,
    fonte: "Literatura", fonteDetalhe: "Literatura científica, Sargassum filipendula — base úmida",
    fonteUrl: "https://pubmed.ncbi.nlm.nih.gov",
    perfil: "lowcal", tags: [],
    familia: "Sargassaceae", confianca: "proxy-familia", tipo: "alga"
  },
  {
    nome: "Dictiota", cientifico: "Dictyota dichotoma",
    kcal: 21.0, prot: 2.23, carbo: 1.90, lip: 2.91,
    fonte: "Literatura", fonteDetalhe: "PMC (2023), Dictyota dichotoma — base úmida",
    fonteUrl: "https://www.ncbi.nlm.nih.gov/pmc/",
    perfil: "lowcal", tags: ["omega3"],
    familia: "Dictyotaceae", confianca: "direto", tipo: "alga"
  },
  {
    nome: "Padina", cientifico: "Padina gymnospora",
    kcal: 29.0, prot: 0.79, carbo: 6.20, lip: 0.12,
    fonte: "Literatura", fonteDetalhe: "Rev. Biol. Trop. (2019), Padina pavonica — base úmida",
    fonteUrl: "https://revistas.ucr.ac.cr/index.php/rbt",
    perfil: "lowcal", tags: [],
    familia: "Dictyotaceae", confianca: "proxy-genero", tipo: "alga"
  },
  {
    nome: "Acanthophora", cientifico: "Acanthophora spicifera",
    kcal: 29.0, prot: 0.72, carbo: 6.39, lip: 0.08,
    fonte: "Literatura", fonteDetalhe: "Rev. Biol. Trop. (2019), Acanthophora spicifera — base úmida",
    fonteUrl: "https://revistas.ucr.ac.cr/index.php/rbt",
    perfil: "lowcal", tags: [],
    familia: "Rhodomelaceae", confianca: "direto", tipo: "alga"
  }
];

// Conjunto unificado (peixes + algas)
const TODOS = [...PEIXES, ...ALGAS];


// ── ESTADO ────────────────────────────────────────
const state = {
  filtro: "all",
  busca: "",
  sortCol: "nome",
  sortDir: "asc",
  chartNutrient: "prot",
  chartMode: "bar",       // "bar" | "scatter" | "radar"
  page: 1,
  pageSize: 20,
  protMin: 0,
  protMax: 30,
  filtroFonte: "all",     // "all" | "TBCA" | "USDA" | "TACO" | "Literatura"
  filtroFamilia: "all",
  filtroTipo: "all",      // "all" | "peixe" | "alga"
  comparar: [],           // até 2 nomes de espécies para radar
  showAllBar: false,      // toggle Top15 / Todas no gráfico de barras
};

// ── UTILITÁRIOS ───────────────────────────────────
const fmt1 = v => Number.isFinite(v) ? v.toFixed(1) : "—";
const fmtKcal = v => Number.isFinite(v) ? Math.round(v).toString() : "—";

function calcStats(dados) {
  const n = dados.length;
  if (!n) return null;
  return {
    kcal:  { avg: fmtKcal(dados.reduce((s, d) => s + d.kcal,  0) / n), min: fmtKcal(Math.min(...dados.map(d=>d.kcal))), max: fmtKcal(Math.max(...dados.map(d=>d.kcal))) },
    prot:  { avg: fmt1(dados.reduce((s, d) => s + d.prot,  0) / n), min: fmt1(Math.min(...dados.map(d=>d.prot))), max: fmt1(Math.max(...dados.map(d=>d.prot))) },
    carbo: { avg: fmt1(dados.reduce((s, d) => s + d.carbo, 0) / n), min: fmt1(Math.min(...dados.map(d=>d.carbo))), max: fmt1(Math.max(...dados.map(d=>d.carbo))) },
    lip:   { avg: fmt1(dados.reduce((s, d) => s + d.lip,   0) / n), min: fmt1(Math.min(...dados.map(d=>d.lip))), max: fmt1(Math.max(...dados.map(d=>d.lip))) },
  };
}

// ── FAMÍLIA → ÍCONE ──────────────────────────────
// Mapa de cores por família — paleta oceânica
const FAMILIA_COLORS = {
  "Sciaenidae":      ["#004d66", "#b8dce8"],   // azul profundo
  "Lutjanidae":      ["#7b1d1d", "#fdd5d5"],   // vermelho coral
  "Carangidae":      ["#005f5f", "#b8e8e5"],   // verde-água
  "Scombridae":      ["#1a3a6b", "#c5d8f8"],   // azul marinho
  "Clupeidae":       ["#005a8c", "#b8dcf5"],   // azul céu
  "Mugilidae":       ["#2a5e2a", "#c5e8c5"],   // verde
  "Serranidae":      ["#614a00", "#f8eab8"],   // dourado
  "Haemulidae":      ["#4a2a6b", "#ddc5f8"],   // lilás
  "Balistidae":      ["#7b4000", "#f8d8b8"],   // laranja terra
  "Ariidae":         ["#3a3a3a", "#e0e0e0"],   // cinza
  "Sparidae":        ["#005c3a", "#b8f0d8"],   // verde esmeralda
  "Engraulidae":     ["#003d6b", "#b8ccf0"],   // azul índigo
  "Pomatomidae":     ["#3d0044", "#f0b8f8"],   // roxo
  "Centropomidae":   ["#1a4a00", "#c8e8b8"],   // verde oliva
  "Coryphaenidae":   ["#005080", "#b8e0f8"],   // azul céu vivo
  "Salmonidae":      ["#7b2a00", "#f8d0b8"],   // salmão
  "Paralichthyidae": ["#4a4a00", "#f0f0b8"],   // amarelo areia
  "Rachycentridae":  ["#004040", "#b8e8e8"],   // cerceta
  "Lobotidae":       ["#3a1a00", "#f0d8b8"],   // marrom
  "Trichiuridae":    ["#1a1a4a", "#c8c8f8"],   // azul-pizarra
  "Belonidae":       ["#004a1a", "#b8f0c8"],   // verde agua
  "Atherinopsidae":  ["#2a4a3a", "#c8e8d8"],   // verde-azulado
  "Pinguipedidae":   ["#3a2a00", "#f0e0b8"],   // areia dourada
  "Carcharhinidae":  ["#2a2a2a", "#d8d8d8"],   // cinza escuro
  "Priacanthidae":   ["#6b1a00", "#f8c8b8"],   // laranja-cobre
  // Famílias de algas
  "Gelidiaceae":     ["#006040", "#b8f0d8"],   // verde-esmeralda
  "Gracilariaceae":  ["#004d30", "#b8e8d0"],   // verde escuro
  "Gigartinaceae":   ["#2a4060", "#b8cce0"],   // azul-ardósia
  "Laminariaceae":   ["#3a5000", "#d8e8b8"],   // verde-oliva
  "Bangiaceae":      ["#6b003a", "#f8b8d8"],   // vinho-rosa
  "Microcoleaceae":  ["#004060", "#b8d8f0"],   // azul-ciano
  "Alariaceae":      ["#005050", "#b8e0e0"],   // verde-azulado
  "Cystocloniaceae": ["#4a0060", "#d8b8f0"],   // violeta
  "Ulvaceae":        ["#2a6000", "#c8f0b8"],   // verde-vivo
  "Caulerpaceae":    ["#006030", "#b8f0c8"],   // verde-limão
  "Sargassaceae":    ["#604000", "#f0d8b8"],   // âmbar
  "Dictyotaceae":    ["#3a3000", "#f0e8b8"],   // areia
  "Rhodomelaceae":   ["#600020", "#f0b8c8"],   // vermelho-rosa
};

function familiaTag(familia) {
  const [bg, fg] = FAMILIA_COLORS[familia] || ["#1a3a50", "#b8d8e8"];
  // Abreviar famílias longas para caber na tag
  const label = (familia || "—").replace(/idae$/, "");
  return `<span class="familia-tag" style="background:${bg};color:${fg}" title="Família: ${familia}">${label}</span>`;
}

// ── PERFIL / BADGE ────────────────────────────────
function perfilBadge(p) {
  const map = {
    hiperproteico: ['badge-hiperproteico', '⭐ Alto proteico'],
    omega3:        ['badge-omega3',        '🐟 Rico em ômega-3'],
    proteico:      ['badge-proteico',      '✓ Bom proteico'],
    moderado:      ['badge-moderado',      '· Moderado'],
  };
  const [cls, txt] = map[p] || map.moderado;
  return `<span class="perfil-badge ${cls}">${txt}</span>`;
}

function fonteBadge(p) {
  if (p.fonteUrl) {
    return `<a href="${p.fonteUrl}" target="_blank" rel="noopener" class="fonte-tag">${p.fonte}</a>`;
  }
  return `<span class="fonte-tag">${p.fonte}</span>`;
}

function confiancaBadge(confianca) {
  const map = {
    "direto":        { cls: "conf-direto",        label: "Direto" },
    "proxy-genero":  { cls: "conf-proxy-genero",  label: "Proxy gênero" },
    "proxy-familia": { cls: "conf-proxy-familia",  label: "Proxy família" },
    "proxy-ordem":   { cls: "conf-proxy-ordem",    label: "Proxy ordem" },
  };
  const { cls, label } = map[confianca] || { cls: "conf-direto", label: confianca };
  return `<span class="conf-badge ${cls}">${label}</span>`;
}

// ── FILTRAGEM ─────────────────────────────────────
function filteredData() {
  // Filtro por tipo (peixe / alga / todos)
  const base = state.filtroTipo === "all" ? TODOS
    : state.filtroTipo === "peixe" ? PEIXES
    : ALGAS;
  let d = [...base];

  // Busca
  if (state.busca) {
    const q = state.busca.toLowerCase();
    d = d.filter(p =>
      p.nome.toLowerCase().includes(q) ||
      (p.cientifico && p.cientifico.toLowerCase().includes(q))
    );
  }

  // Filtro de tag (dietético)
  if (state.filtro !== "all") {
    d = d.filter(p => p.tags && p.tags.includes(state.filtro));
  }

  // Filtro de família
  if (state.filtroFamilia !== "all") {
    d = d.filter(p => p.familia === state.filtroFamilia);
  }

  // Filtro de proteína (slider duplo)
  d = d.filter(p => p.prot >= state.protMin && p.prot <= state.protMax);

  // Filtro de fonte
  if (state.filtroFonte !== "all") {
    d = d.filter(p => {
      const f = (p.fonte || "").toLowerCase();
      const q = state.filtroFonte.toLowerCase();
      return f.includes(q);
    });
  }

  // Ordenação
  d.sort((a, b) => {
    let va = a[state.sortCol];
    let vb = b[state.sortCol];
    if (typeof va === "string") va = va.toLowerCase();
    if (typeof vb === "string") vb = vb.toLowerCase();
    if (va < vb) return state.sortDir === "asc" ? -1 : 1;
    if (va > vb) return state.sortDir === "asc" ? 1 : -1;
    return 0;
  });

  return d;
}

// ── PAGINAÇÃO ─────────────────────────────────────
function paginatedData(all) {
  const start = (state.page - 1) * state.pageSize;
  return all.slice(start, start + state.pageSize);
}

function totalPages(all) {
  return Math.max(1, Math.ceil(all.length / state.pageSize));
}

// ── BARRA DE PROGRESSO ────────────────────────────
function barCell(value, maxVal, fmt) {
  const pct = maxVal > 0 ? Math.min(100, (value / maxVal) * 100) : 0;
  const valStr = fmt(value);
  return `<div class="bar-cell">
    <div class="bar-track"><div class="bar-fill" style="width:${pct.toFixed(1)}%"></div></div>
    <span class="bar-val num">${valStr}</span>
  </div>`;
}

// ── RENDER TABLE ──────────────────────────────────
function renderTable() {
  const all = filteredData();
  const page = paginatedData(all);
  const tbody = document.getElementById("tableBody");
  const emptyMsg = document.getElementById("emptyMsg");
  const resultCount = document.getElementById("resultCount");

  // Contador
  const totalF = all.length;
  const startIdx = (state.page - 1) * state.pageSize + 1;
  const endIdx = Math.min(state.page * state.pageSize, totalF);
  if (resultCount) {
    resultCount.textContent = totalF === 0 ? "0 espécies" : `Exibindo ${startIdx}–${endIdx} de ${totalF} espécies`;
  }

  if (page.length === 0) {
    tbody.innerHTML = "";
    emptyMsg && emptyMsg.classList.remove("hidden");
    updateTfoot([]);
    updatePagination(all);
    return;
  }
  emptyMsg && emptyMsg.classList.add("hidden");

  // Máximos para barras de progresso (usar todos os dados filtrados para consistência)
  const maxProt = Math.max(...all.map(d => d.prot), 1);
  const maxLip  = Math.max(...all.map(d => d.lip), 1);

  const rows = page.map((p, i) => {
    const even = i % 2 === 0 ? "" : "even";
    const ftag = familiaTag(p.familia || "");
    const checked = state.comparar.includes(p.nome) ? "checked" : "";
    return `<tr class="${even}">
      <td>
        <div class="especie-cell">${ftag}<span class="especie-nome">${p.nome}</span></div>
      </td>
      <td class="col-sci"><em>${p.cientifico || "—"}</em></td>
      <td class="num">${fmtKcal(p.kcal)}</td>
      <td>${barCell(p.prot, maxProt, fmt1)}</td>
      <td class="num">${fmt1(p.carbo)}</td>
      <td>${barCell(p.lip, maxLip, fmt1)}</td>
      <td>${perfilBadge(p.perfil)}</td>
      <td>${confiancaBadge(p.confianca || "direto")}</td>
      <td>${fonteBadge(p)}</td>
      <td class="compare-check"><input type="checkbox" aria-label="Comparar ${p.nome}" data-nome="${p.nome}" ${checked}></td>
    </tr>`;
  }).join("");

  tbody.innerHTML = rows;
  updateTfoot(all);
  updatePagination(all);
  setupCompareCheckboxes();
}

// ── TFOOT: MIN / MÉDIA / MAX ──────────────────────
function updateTfoot(dados) {
  const tfoot = document.querySelector("tfoot");
  if (!tfoot) return;

  if (!dados.length) {
    tfoot.innerHTML = `<tr class="avg-row">
      <td><strong>Média geral</strong></td>
      <td colspan="8">—</td>
    </tr>`;
    return;
  }

  const s = calcStats(dados);
  tfoot.innerHTML = `
    <tr class="avg-row min-row">
      <td><strong>Mínimo</strong></td>
      <td class="num">${s.kcal.min}</td>
      <td class="num" colspan="2">${s.prot.min}</td>
      <td class="num">${s.carbo.min}</td>
      <td class="num" colspan="2">${s.lip.min}</td>
      <td></td><td></td><td></td>
    </tr>
    <tr class="avg-row">
      <td><strong>Média geral</strong></td>
      <td class="num">${s.kcal.avg}</td>
      <td class="num" colspan="2">${s.prot.avg}</td>
      <td class="num">${s.carbo.avg}</td>
      <td class="num" colspan="2">${s.lip.avg}</td>
      <td></td><td></td><td></td>
    </tr>
    <tr class="avg-row max-row">
      <td><strong>Máximo</strong></td>
      <td class="num">${s.kcal.max}</td>
      <td class="num" colspan="2">${s.prot.max}</td>
      <td class="num">${s.carbo.max}</td>
      <td class="num" colspan="2">${s.lip.max}</td>
      <td></td><td></td><td></td>
    </tr>`;
}

// ── PAGINAÇÃO ─────────────────────────────────────
function updatePagination(all) {
  const tp = totalPages(all);
  const pageInfo = document.getElementById("pageInfo");
  const prevBtn  = document.getElementById("prevPage");
  const nextBtn  = document.getElementById("nextPage");

  if (pageInfo) pageInfo.textContent = `Página ${state.page} de ${tp}`;
  if (prevBtn) prevBtn.disabled = state.page <= 1;
  if (nextBtn) nextBtn.disabled = state.page >= tp;
}

function setupPagination() {
  document.getElementById("prevPage")?.addEventListener("click", () => {
    if (state.page > 1) { state.page--; renderTable(); }
  });
  document.getElementById("nextPage")?.addEventListener("click", () => {
    const all = filteredData();
    if (state.page < totalPages(all)) { state.page++; renderTable(); }
  });
}

// ── COMPARAR CHECKBOXES ───────────────────────────
function setupCompareCheckboxes() {
  document.querySelectorAll(".compare-check input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", () => {
      const nome = cb.dataset.nome;
      if (cb.checked) {
        if (state.comparar.length >= 2) {
          cb.checked = false;
          return;
        }
        state.comparar.push(nome);
      } else {
        state.comparar = state.comparar.filter(n => n !== nome);
      }
      updateComparePanel();
      if (state.chartMode === "radar") renderChart();
    });
  });
}

function updateComparePanel() {
  const panel = document.getElementById("comparePanel");
  if (!panel) return;
  if (state.comparar.length === 0) {
    panel.classList.add("hidden");
  } else {
    panel.classList.remove("hidden");
    panel.innerHTML = `<span>Comparando:</span> ${state.comparar.map(n => `<strong>${n}</strong>`).join(" vs ")}
      ${state.comparar.length === 2 ? '<em style="color:var(--color-text-muted);font-size:0.8rem">— Acesse o modo Radar para ver o comparativo</em>' : '<em style="color:var(--color-text-muted);font-size:0.8rem">— Selecione mais 1 espécie</em>'}
      <button onclick="state.comparar=[];updateComparePanel();renderTable();if(state.chartMode==='radar')renderChart();" style="margin-left:auto;color:var(--color-text-muted);font-size:0.8rem;cursor:pointer;background:none;border:none;">✕ Limpar</button>`;
  }
}

// ── CHART INSTANCES ───────────────────────────────
let mainChartInst   = null;
let scatterChartInst = null;
let radarChartInst  = null;

// ── CORES POR FAMTÍLIA (gráficos) ───────────────────
const FAMILIA_CHART_COLORS = {
  "Sciaenidae":      "#0ea5e9",
  "Lutjanidae":      "#ef4444",
  "Carangidae":      "#10b981",
  "Scombridae":      "#6366f1",
  "Clupeidae":       "#06b6d4",
  "Mugilidae":       "#22c55e",
  "Serranidae":      "#f59e0b",
  "Haemulidae":      "#8b5cf6",
  "Salmonidae":      "#f97316",
  "Pomatomidae":     "#ec4899",
  "Centropomidae":   "#84cc16",
  "Carcharhinidae":  "#64748b",
  "Paralichthyidae": "#a855f7",
  "Trichiuridae":    "#0284c7",
  "Rachycentridae":  "#d97706",
  "Lobotidae":       "#14b8a6",
  "Belonidae":       "#f43f5e",
  "Coryphaenidae":   "#7c3aed",
  "Priacanthidae":   "#b45309",
  "Atherinopsidae":  "#0f766e",
  "Engraulidae":     "#c026d3",
  "Ariidae":         "#854d0e",
  "Pinguipedidae":   "#1d4ed8",
  "Sparidae":        "#a16207",
  "Balistidae":      "#be123c",
};

function familiaColor(familia) {
  return FAMILIA_CHART_COLORS[familia] || "#94a3b8";
}

// ── RENDER CHART ──────────────────────────────────
function renderChart() {
  // Hide all canvases and message first
  document.getElementById("mainChart")?.classList.add("hidden");
  document.getElementById("scatterChart")?.classList.add("hidden");
  document.getElementById("radarChart")?.classList.add("hidden");
  document.getElementById("radarMsg")?.classList.add("hidden");

  if (state.chartMode === "bar") {
    document.getElementById("mainChart")?.classList.remove("hidden");
    renderBarChart();
  } else if (state.chartMode === "scatter") {
    document.getElementById("scatterChart")?.classList.remove("hidden");
    renderScatterChart();
  } else if (state.chartMode === "radar") {
    if (state.comparar.length < 2) {
      document.getElementById("radarMsg")?.classList.remove("hidden");
    } else {
      document.getElementById("radarChart")?.classList.remove("hidden");
      renderRadarChart();
    }
  }
}

// ── BAR CHART ─────────────────────────────────────
function renderBarChart() {
  const nutrient = state.chartNutrient;
  const base = state.filtroTipo === "all" ? TODOS : state.filtroTipo === "peixe" ? PEIXES : ALGAS;
  const all = [...base].sort((a, b) => b[nutrient] - a[nutrient]);
  const data = state.showAllBar ? all : all.slice(0, 15);

  // Update toggle button text
  const toggleBtn = document.getElementById("top15Toggle");
  if (toggleBtn) {
    toggleBtn.textContent = state.showAllBar ? "Ver Top 15" : "Ver todas (62)";
  }

  const labels  = data.map(d => d.nome);
  const values  = data.map(d => d[nutrient]);
  const colors  = data.map(d => familiaColor(d.familia || ""));

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "#cdccca" : "#28251d";
  const gridColor = isDark ? "#393836" : "#e8e5e0";

  const nutrientLabels = {
    prot:  "Proteínas (g/100g)",
    kcal:  "Energia (kcal/100g)",
    lip:   "Lipídios (g/100g)",
    carbo: "Carboidratos (g/100g)",
  };

  if (mainChartInst) { mainChartInst.destroy(); mainChartInst = null; }

  const ctx = document.getElementById("mainChart");
  if (!ctx) return;

  mainChartInst = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: nutrientLabels[nutrient],
        data: values,
        backgroundColor: colors.map(c => c + "cc"),
        borderColor: colors,
        borderWidth: 1,
        borderRadius: 3,
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              const p = data[ctx.dataIndex];
              return [
                `${nutrientLabels[nutrient]}: ${ctx.parsed.x.toFixed(1)}`,
                `Família: ${p.familia || "—"}`,
                `Fonte: ${p.fonte}`,
              ];
            }
          }
        }
      },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } }
      }
    }
  });
}

// ── SCATTER CHART ─────────────────────────────────
function renderScatterChart() {
  if (scatterChartInst) { scatterChartInst.destroy(); scatterChartInst = null; }

  const ctx = document.getElementById("scatterChart");
  if (!ctx) return;

  // Group by familia for datasets
  const scatterBase = state.filtroTipo === "all" ? TODOS : state.filtroTipo === "peixe" ? PEIXES : ALGAS;
  const familias = [...new Set(scatterBase.map(p => p.familia || "Outros"))];
  const datasets = familias.map(fam => {
    const pts = scatterBase.filter(p => (p.familia || "Outros") === fam)
      .map(p => ({ x: p.kcal, y: p.prot, nome: p.nome, fonte: p.fonte }));
    return {
      label: fam,
      data: pts,
      backgroundColor: familiaColor(fam) + "bb",
      borderColor: familiaColor(fam),
      pointRadius: 6,
      pointHoverRadius: 8,
    };
  }).filter(ds => ds.data.length > 0);

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "#cdccca" : "#28251d";
  const gridColor = isDark ? "#393836" : "#e8e5e0";

  scatterChartInst = new Chart(ctx, {
    type: "scatter",
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: { color: textColor, font: { size: 10 }, boxWidth: 10, padding: 8 }
        },
        tooltip: {
          callbacks: {
            label: ctx => {
              const pt = ctx.raw;
              return [`${pt.nome}`, `kcal: ${pt.x}`, `prot: ${pt.y}g`];
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: "Energia (kcal/100g)", color: textColor },
          ticks: { color: textColor },
          grid: { color: gridColor }
        },
        y: {
          title: { display: true, text: "Proteínas (g/100g)", color: textColor },
          ticks: { color: textColor },
          grid: { color: gridColor }
        }
      }
    }
  });
}

// ── RADAR CHART ───────────────────────────────────
function renderRadarChart() {
  if (radarChartInst) { radarChartInst.destroy(); radarChartInst = null; }

  const ctx = document.getElementById("radarChart");
  if (!ctx) return;

  if (state.comparar.length < 2) return;

  const [nome1, nome2] = state.comparar;
  const p1 = TODOS.find(p => p.nome === nome1);
  const p2 = TODOS.find(p => p.nome === nome2);
  if (!p1 || !p2) return;

  // Normalize by maximum across all fish
  const maxKcal = Math.max(...TODOS.map(p => p.kcal));
  const maxProt  = Math.max(...TODOS.map(p => p.prot));
  const maxLip   = Math.max(...TODOS.map(p => p.lip));
  const maxCarbo = Math.max(...TODOS.map(p => p.carbo), 0.1);

  const norm = (v, mx) => mx > 0 ? parseFloat((v / mx * 10).toFixed(2)) : 0;

  const labels = ["Energia (kcal)", "Proteínas (g)", "Lipídios (g)", "Carboidratos (g)"];

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "#cdccca" : "#28251d";
  const gridColor = isDark ? "#393836" : "#e8e5e0";

  const color1 = "#01696f";
  const color2 = "#f59e0b";

  radarChartInst = new Chart(ctx, {
    type: "radar",
    data: {
      labels,
      datasets: [
        {
          label: nome1,
          data: [norm(p1.kcal, maxKcal), norm(p1.prot, maxProt), norm(p1.lip, maxLip), norm(p1.carbo, maxCarbo)],
          backgroundColor: color1 + "33",
          borderColor: color1,
          pointBackgroundColor: color1,
          borderWidth: 2,
        },
        {
          label: nome2,
          data: [norm(p2.kcal, maxKcal), norm(p2.prot, maxProt), norm(p2.lip, maxLip), norm(p2.carbo, maxCarbo)],
          backgroundColor: color2 + "33",
          borderColor: color2,
          pointBackgroundColor: color2,
          borderWidth: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 10,
          ticks: { color: textColor, backdropColor: "transparent", font: { size: 9 } },
          grid: { color: gridColor },
          pointLabels: { color: textColor, font: { size: 11 } },
          angleLines: { color: gridColor }
        }
      },
      plugins: {
        legend: { labels: { color: textColor } },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.r.toFixed(2)} (normalizado /10)`
          }
        }
      }
    }
  });
}

// ── SETUP SORT ────────────────────────────────────
function setupSort() {
  document.querySelectorAll(".sortable").forEach(th => {
    th.addEventListener("click", () => {
      const col = th.dataset.col;
      if (state.sortCol === col) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortCol = col;
        state.sortDir = col === "nome" ? "asc" : "desc";
      }
      document.querySelectorAll(".sortable").forEach(t => {
        t.dataset.dir = t.dataset.col === col ? state.sortDir : "none";
      });
      state.page = 1;
      renderTable();
    });
  });
}

// ── SETUP FILTROS ─────────────────────────────────
function setupFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.filtro = btn.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.page = 1;
      renderTable();
    });
  });
}

// ── SETUP BUSCA ───────────────────────────────────
function setupSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;
  let timer;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      state.busca = input.value.trim();
      state.page = 1;
      renderTable();
    }, 200);
  });
}

// ── SETUP FAMÍLIA SELECT ──────────────────────────
function setupFamiliaSelect() {
  const sel = document.getElementById("familiaSelect");
  if (!sel) return;

  // Generate unique families
  const familias = [...new Set(TODOS.map(p => p.familia).filter(Boolean))].sort();
  sel.innerHTML = `<option value="all">Todas as famílias</option>` +
    familias.map(f => `<option value="${f}">${f}</option>`).join("");

  sel.addEventListener("change", () => {
    state.filtroFamilia = sel.value;
    state.page = 1;
    renderTable();
  });
}

// ── SETUP FONTE SELECT ────────────────────────────
function setupFonteSelect() {
  const sel = document.getElementById("fonteSelect");
  if (!sel) return;
  sel.addEventListener("change", () => {
    state.filtroFonte = sel.value;
    state.page = 1;
    renderTable();
  });
}

// ── SETUP TIPO (Peixes / Algas / Todos) ──────────
function setupTipoBtns() {
  document.querySelectorAll(".tipo-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tipo-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.filtroTipo = btn.dataset.tipo;
      state.page = 1;
      renderTable();
      renderChart();
    });
  });
}


// ── SETUP PROTEIN SLIDERS ─────────────────────────
function setupProtSliders() {
  const sliderMin = document.getElementById("protSliderMin");
  const sliderMax = document.getElementById("protSliderMax");
  const valMin    = document.getElementById("protValMin");
  const valMax    = document.getElementById("protValMax");

  if (!sliderMin || !sliderMax) return;

  function update() {
    let mn = parseFloat(sliderMin.value);
    let mx = parseFloat(sliderMax.value);
    if (mn > mx) { [mn, mx] = [mx, mn]; }
    state.protMin = mn;
    state.protMax = mx;
    if (valMin) valMin.textContent = mn.toFixed(0) + "g";
    if (valMax) valMax.textContent = mx.toFixed(0) + "g";
    state.page = 1;
    renderTable();
  }

  sliderMin.addEventListener("input", update);
  sliderMax.addEventListener("input", update);
  // Initialize display
  if (valMin) valMin.textContent = sliderMin.value + "g";
  if (valMax) valMax.textContent = sliderMax.value + "g";
}

// ── SETUP CHART BUTTONS ───────────────────────────
function setupChartButtons() {
  // Nutrient buttons
  document.querySelectorAll(".chart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.chartNutrient = btn.dataset.nutrient;
      document.querySelectorAll(".chart-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderChart();
    });
  });

  // Chart mode buttons
  document.querySelectorAll(".chart-mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.chartMode = btn.dataset.mode;
      document.querySelectorAll(".chart-mode-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderChart();
    });
  });

  // Top15 toggle
  const toggleBtn = document.getElementById("top15Toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      state.showAllBar = !state.showAllBar;
      renderChart();
    });
  }
}

// ── SETUP TEMA ────────────────────────────────────
function setupTheme() {
  const root = document.documentElement;
  const btn  = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  let theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.setAttribute("data-theme", theme);
  updateThemeIcon(btn, theme);

  btn.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", theme);
    updateThemeIcon(btn, theme);
    setTimeout(renderChart, 50);
  });
}

function updateThemeIcon(btn, theme) {
  btn.setAttribute("aria-label", `Alternar para modo ${theme === "dark" ? "claro" : "escuro"}`);
  btn.innerHTML = theme === "dark"
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

// ── INIT ──────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupSort();
  setupFilters();
  setupSearch();
  setupTipoBtns();
  setupFamiliaSelect();
  setupFonteSelect();
  setupProtSliders();
  setupPagination();
  setupChartButtons();
  renderTable();
  renderChart();
});
