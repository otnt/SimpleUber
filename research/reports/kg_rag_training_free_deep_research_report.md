# Training-Free Knowledge-Graph-Powered RAG (2025-2026): A Deep Research Synthesis

*A cross-paper analysis of 46 training-free Knowledge-Graph RAG works from NeurIPS, ICLR, ICML, ACL, EMNLP, NAACL, WWW, SIGIR, KDD, CIKM 2025-2026 and notable arXiv preprints.*

---

## 1. Executive Summary

Between mid-2024 and late-2025, "training-free" Knowledge-Graph RAG (KG-RAG) emerged as the dominant compromise between heavy graph-foundation-model fine-tuning and naive vector RAG. The 46 papers analyzed here share two organising commitments: (i) the backbone LLM is *not* fine-tuned — graphs are constructed, indexed and consumed at inference time; and (ii) the graph is a first-class retrieval substrate, not just a re-ranker over chunks. Within these commitments, the field has fanned out into a surprisingly coherent design space.

Five themes dominate the 2025-2026 landscape. **First**, *path*- and *subgraph*-based retrieval replaced node-only retrieval as the de facto unit of evidence — *PathRAG*, *NodeRAG*, *NeuroPath*, *FiDeLiS*, *SimGRAG*, *SubgraphRAG*-style designs, *HippoRAG 2*, *LinearRAG*, *EventRAG* all retrieve relational paths or connected subgraphs and linearise them in the prompt. **Second**, *agentic / iterative* graph traversal moved from novelty to default for multi-hop QA: *Think-on-Graph 2.0/3.0*, *ReMindRAG*, *GraphSearch*, *KGARevion*, *GeAR*, *SUBQRAG*, *Youtu-GraphRAG*, *AMG-RAG* and *KG-IRAG* all wrap retrieval in a multi-round LLM controller that can reflect, decompose, expand or verify. **Third**, *multi-granular / hierarchical indexing* — entity / community / chunk / paragraph levels co-existing in one index — is now expected; *LightRAG*, *From Local to Global*, *KET-RAG*, *FG-RAG*, *MedGraphRAG*, *MaGiX*, *Youtu-GraphRAG*, *RAG4GFM* and *ToG-3* all do this. **Fourth**, indexing cost is the new bottleneck. *KET-RAG* (KDD 2025) cuts LLM-extraction cost by an order of magnitude; *LinearRAG* (ICLR 2026) removes LLM relation extraction altogether; *Youtu-GraphRAG* saves up to 90.71% of construction tokens; *Towards Practical GraphRAG* (arXiv 2507.03226) replaces LLM extraction with dependency parsing at 94% quality. **Fifth**, evaluation has matured: *GraphRAG-Bench* (ICLR 2026) and *AnonyRAG* (with *Youtu-GraphRAG*) explicitly push back against LLM "knowledge leaking" and shallow QA, while LLM-as-judge head-to-head evaluation has become the de facto standard for open-ended generation.

The headline empirical finding: training-free KG-RAG is now competitive with or superior to specialised fine-tuned QA systems across multi-hop QA (*HippoRAG 2*, *NodeRAG*, *NeuroPath*, *Youtu-GraphRAG*, *ToG-3*), long-document/global QA (*From Local to Global*, *LightRAG*, *FG-RAG*, *PathRAG*), and several domain settings (medical: *MedGraphRAG*, *KARE*, *MedRAG*, *AMG-RAG*, *KGARevion*; recommendation: *K-RagRec*; GUI agents: *KG-RAG GUI*). When trained baselines are surpassed, it is typically by a small (1-5 point) margin on factual benchmarks but by larger (10-25 point) margins on long-form, multi-hop, or domain-specific reasoning — i.e., exactly where retrieval matters most.

---

## 2. Taxonomy of Approaches

The 46 papers cluster into nine sub-categories. Many papers belong to two clusters; we list each paper under its primary contribution and call out secondary memberships in prose.

### 2.1 Path-based retrieval

Retrieves *relational paths* (sequences of (entity, relation, entity) triples) between query-relevant nodes, optionally pruning by reliability or semantic coherence.

- *PathRAG* — flow-based path pruning + path-ordered prompting; reframes the bottleneck as redundancy, not insufficiency.
- *NodeRAG* — heterogeneous nodes (entities, relations, summaries, semantic units) graph design; superior multi-hop QA with fewer retrieved tokens.
- *NeuroPath* — neurobiology-inspired Dynamic Path Tracking + Post-retrieval Completion (a reflective second-stage retrieval).
- *FiDeLiS* — Path-RAG (candidate pruning) + Deductive-Verification Beam Search for faithful KGQA.
- *EventRAG* — event-level KG with iterative temporal/logical path traversal across event nodes.
- *SimGRAG* — query→graph pattern→subgraph alignment via a Graph Semantic Distance metric (interpolates path-style and subgraph-style retrieval).

The shared technique is **path / pattern as the indivisible retrieval unit**. PathRAG argues paths beat subgraphs because they are less redundant; NeuroPath argues paths beat subgraphs because they are more semantically coherent; FiDeLiS adds deductive verification per step; EventRAG generalises the path notion from entities to events.

### 2.2 Subgraph retrieval

Retrieves connected subgraphs around seed entities, treating the entire subgraph as one evidence unit.

- *SimGRAG* — pattern-matched subgraph retrieval at 10M-scale, <1s.
- *KG2RAG* (NAACL 2025; two listings) — uses the KG to expand and re-organise chunks via fact-level relations.
- *SUBQRAG* — sub-question-driven dynamic subgraph extraction with on-the-fly KG expansion.
- *K-RagRec* — hop-field subgraphs encoded by a GNN around items, fed to a frozen LLM for recommendation.
- *KGARevion* — LLM generates candidate triples, KG verifies / revises them as a subgraph of grounded knowledge.

The shared trick is "go from a query → seed entities → bounded subgraph → linearise or summarise → prompt".

### 2.3 Agentic / iterative graph traversal

Multi-round LLM controller that traverses the KG, reflects on intermediate evidence, decomposes queries, and decides when to stop.

- *Think-on-Graph 2.0* — tight coupling of graph traversal and passage retrieval; iterative until evidence is sufficient.
- *Think-on-Graph 3.0* — four-agent MACER mechanism with Dual-Evolution of query *and* subgraph.
- *ReMindRAG* — node exploration/exploitation plus "memory replay" stored in KG edge embeddings.
- *GraphSearch* — six-module agentic loop (decompose, refine, ground, draft, verify, expand) with dual-channel retrieval.
- *KGARevion* — Generate / Review / Revise / Answer agent over a grounded biomedical KG.
- *GeAR* — graph-expansion-augmented base retriever + gist-memory agent that decides when more retrieval is needed.
- *SUBQRAG* — sub-question chain + dynamic graph expansion + traceable evidence path ("graph memory").
- *Youtu-GraphRAG* — vertically unified agentic paradigm with a seed graph schema, extraction agent, and retrieval agent.
- *AMG-RAG* — agentic Medical Graph-RAG with PubMedSearch/WikiSearch tools to keep the MKG current.
- *KG-IRAG* — iterative KG retrieval with explicit temporal-constraint propagation for time-aligned data.

The hallmark is **a controller loop** that compensates for the LLM's lack of pretrained KG-traversal skill by externalising the search policy.

### 2.4 Hierarchical / multi-granular indexing

Build an index across multiple granularities (token / chunk / entity / community / theme), then retrieve from the granularity best matching the query.

- *From Local to Global (GraphRAG)* — Microsoft's original community-summary approach (Leiden detection + pre-summarised communities).
- *LightRAG* — dual-level (low-level entities, high-level themes) retrieval with incremental updates.
- *KET-RAG* — KG skeleton over key chunks + cheap text-keyword bipartite graph over everything else.
- *FG-RAG* — context-aware entity expansion + query-level fine-grained summarisation atop coarse community summaries.
- *MedGraphRAG* — three-tier (clinical records / literature / UMLS) graph with U-retrieve traversing top-down then bottom-up.
- *MaGiX* — multi-granular cross-lingual KG with cross-synonym edges + composite scoring.
- *KARE* — hierarchical community detection over a dense medical KG for community-level retrieval.
- *RAG4GFM* — hierarchical multi-level graph index (log-time retrieval across granularities) for Graph Foundation Models.
- *Youtu-GraphRAG* — hierarchical knowledge tree for top-down filtering and bottom-up community reasoning.
- *ToG-3* — Chunk-Triplets-Community heterogeneous index that evolves with the query.

This category is essentially a generalisation of Microsoft's "community summaries" idea to many more granularity axes.

### 2.5 Hypergraph / heterogeneous structures

Move beyond binary edges into n-ary or typed edges; treat node types and edge types as first-class design choices.

- *HyperGraphRAG* — n-ary facts as hyperedges, with bipartite vector indices and local hypergraph expansion.
- *OG-RAG* — ontology-grounded hypergraph; each hyperedge is a cluster of factual knowledge; optimisation-based minimal-context selection.
- *MMGraphRAG* — fuses visual scene graphs and text KGs via SpecLink (spectral clustering for cross-modal entity linking).
- *NodeRAG* — heterogeneous node types (entities, relations, semantic units, summaries) inside a single graph schema.

### 2.6 Multimodal

KGs that span text, tables, images and structured documents.

- *Query-Driven Multimodal GraphRAG* (ACL 2025 Findings) — dynamically builds a *query-specific* local multimodal KG.
- *MMGraphRAG* — interpretable scene-graph + text-KG fusion for document QA.

### 2.7 Domain-specific

- *Medicine*: *MedGraphRAG*, *MedRAG*, *KARE*, *AMG-RAG*, *KGARevion*, *CG-RAG* (cited via *MedGraphRAG*'s landscape).
- *Recommendation*: *K-RagRec* (GNN-encoded item subgraphs into frozen LLMs).
- *GUI agents*: *KG-RAG (EMNLP 2025)* — UI Transition Graphs vectorised for mobile-task navigation.
- *Personalisation / personal data*: *Personalizing LLMs with RAG and KG* (WWW 2025 Companion), *PersonaAgent with GraphRAG*, *TOBUGraph*.
- *Scholarly QA*: *StructRAG* (WWW 2025) — Deep Document Model preserving paper hierarchy.
- *Cross-lingual*: *MaGiX* (English↔Vietnamese).
- *Temporal / dynamic*: *KG-IRAG* (weatherQA, trafficQA).
- *Industrial workflows*: *OG-RAG* (Soybean/Wheat cultivation, news).
- *Enterprise legacy code*: *Towards Practical GraphRAG* (dependency-parsing extraction).

### 2.8 Constrained / faithful reasoning

Designed primarily to keep the LLM honest with respect to the KG.

- *FiDeLiS* — deductive verification beam search.
- *GraphRAG-FI* — two-stage noise filter + logits-level fusion with intrinsic LLM knowledge.
- *KGARevion* — explicit Review/Revise loop against KG triples.
- *KG-IRAG* — temporal-consistency verification across iterations.
- *KG-RAG (GUI)* — intent-guided search producing actionable, traceable navigation paths.

### 2.9 Benchmarks and surveys

- *GraphRAG-Bench* (ICLR 2026) — 1,018 college-level multi-hop questions, 7M-word CS corpus, 16 disciplines, 5 question types, holistic construction/retrieval/answer/rationale scoring.
- *AnonyRAG* (released with *Youtu-GraphRAG*) — anonymised entity-name benchmark to defeat knowledge leakage.
- *Large Language Models Meet Knowledge Graphs for QA: Synthesis and Opportunities* (EMNLP 2025 main) — taxonomy along QA type × KG role.
- *Retrieval-Augmented Generation with Graphs* (arXiv 2501.00309) — 5-component (query / retriever / organizer / generator / data source) unified framework.
- *A Survey of GraphRAG for Customized LLMs* (arXiv 2501.13958) — focuses on professional-domain customization.

---

## 3. Architectural Patterns

### 3.1 KG construction and indexing

There are now three dominant construction philosophies.

1. **LLM entity-relation extraction** — *LightRAG*, *GraphRAG (MS)*, *KARE*, *HyperGraphRAG*, *NodeRAG*, *EventRAG*, *TOBUGraph*, *MedGraphRAG*, *FG-RAG*, *ToG-3*, *Youtu-GraphRAG*. This is the highest-quality but most expensive route, costing thousands to millions of LLM tokens per corpus.

2. **Cheap / hybrid construction** — *KET-RAG* uses a tiny LLM-extracted skeleton over key chunks plus a cheap text-keyword bipartite graph; *Towards Practical GraphRAG* (2507.03226) uses dependency parsing to recover 94% of LLM-extraction quality at a fraction of the cost; *LinearRAG* (ICLR 2026) drops LLM relation extraction entirely and uses only lightweight entity extraction + semantic linking, yielding *linear* construction cost and *zero* extra tokens.

3. **Dynamic / query-driven construction** — *Query-Driven Multimodal GraphRAG*, *SUBQRAG* (extracts new triples on-the-fly when the graph cannot answer a sub-question), *AMG-RAG* (continuous updates via web search), *KG-IRAG* (timestamped, validity-interval-aware facts).

Index granularity is multi-axial: nearly every recent paper indexes both entities *and* chunks *and* communities. *LightRAG*'s dual-level (low/high), *MedGraphRAG*'s three-tier graph, *ToG-3*'s Chunk-Triplets-Community index, and *RAG4GFM*'s hierarchical log-time index are illustrative.

A further trend is **schema-aware indexing**: *NodeRAG* (heterogeneous node types), *Youtu-GraphRAG* (seed graph schema continuously expanded), *OG-RAG* (domain ontology), *StructRAG (WWW)* (Deep Document Model preserving paper hierarchy) all argue the *graph design* deserves first-class attention rather than being an artefact of LLM extraction.

### 3.2 Retrieval strategies

The retrieval taxonomy is now well-formed:

- **Path retrieval**: *PathRAG* (flow pruning), *FiDeLiS* (Path-RAG + DVBS), *NeuroPath* (semantic path tracking), *EventRAG* (event paths), *KGARevion* (verified triple-paths).
- **Subgraph retrieval**: *SimGRAG* (graph-semantic-distance), *K-RagRec* (hop-field subgraphs), *KG2RAG* (chunk-expansion subgraphs).
- **Multi-hop iterative traversal**: *ToG-2/3*, *GraphSearch*, *SUBQRAG*, *KG-IRAG*, *GeAR*, *ReMindRAG*.
- **Community / global summary retrieval**: *GraphRAG (MS)*, *KARE*, *FG-RAG*, *PersonaAgent w/ GraphRAG*.
- **Hybrid sparse + dense + graph retrieval**: *Towards Practical GraphRAG* (vector + graph fused by RRF), *GraphSearch* (dual-channel: semantic→chunks, relational→graph), *KET-RAG* (skeleton + keyword graph fused), *GeAR* (BM25/dense base + graph expansion), *MaGiX* (graph + multilingual embedding + re-ranker).

The most common pattern in 2025-2026 is **coarse-to-fine**: a vector or BM25 prefilter picks seed entities or chunks, the graph then expands or refines, and a re-ranker (sometimes the LLM itself, sometimes a deductive verifier) emits a final ordered evidence set.

### 3.3 LLM consumption of retrieved KG

How the retrieved graph reaches the LLM has converged on three patterns:

1. **Linearised text prompts** — paths or triples joined as "head — relation — tail" sentences. *PathRAG*'s path-ordered prompting (ascending reliability), *NodeRAG*'s structured prompt over heterogeneous nodes, and *HyperGraphRAG*'s hyperedge-linearised text are canonical examples.
2. **Pre-summarised contexts** — community summaries (*GraphRAG (MS)*, *KARE*, *FG-RAG*, *PersonaAgent w/ GraphRAG*) or hyperedge clusters (*OG-RAG*) reduce token usage.
3. **Iterative refinement loops** — the LLM consumes one slice of graph evidence, reasons, then requests more (*ToG-2/3*, *ReMindRAG*, *SUBQRAG*, *GraphSearch*, *KGARevion*).

A subtler trend: **structured-prompt schemas** that include node types or rationales explicitly. *NodeRAG* makes node types visible to the LLM; *StructRAG (ICLR 2025)* lets the LLM pick the right *structure type* (table, tree, graph, text) before reasoning.

### 3.4 Indexing vs query cost trade-offs

Quantitative cost analyses are now standard:

| Paper | Indexing | Query |
| --- | --- | --- |
| *KET-RAG* | ≥10× cheaper than MS GraphRAG | ~20% lower per query than GraphRAG |
| *LinearRAG* | Linear in corpus; zero extra LLM tokens | Comparable to HippoRAG 2 |
| *Youtu-GraphRAG* | Up to 90.71% token-cost savings during construction | +16.62% accuracy over SOTA |
| *Towards Practical GraphRAG* | Dependency parsing → 94% extraction quality at fraction of LLM cost | +15% & +4.35% over vanilla vector RAG on two datasets |
| *ToG-3* | 10.13 h (≈ LightRAG 10.06 h; < GraphRAG 13.10 h) | Highest avg EM 0.453 / F1 0.312 |
| *ReMindRAG* | Same as base | ~50% per-query cost, ~58.8% token reduction after warm-up |
| *NodeRAG* | Lower than GraphRAG/LightRAG | ~1.6 k fewer tokens than GraphRAG at higher accuracy |
| *LightRAG* | Lower than GraphRAG; incremental updates | High recall (>80% legal docs) |

Indexing cost is the central economic question of the field: the most cited gains (10×, linear, 90.71%) are construction-side, not retrieval-side.

---

## 4. Evaluation Landscape

### 4.1 Common benchmarks

- **Multi-hop QA**: HotpotQA, 2WikiMultihopQA, MuSiQue (almost universal among multi-hop papers — *NeuroPath*, *NodeRAG*, *SUBQRAG*, *GeAR*, *Youtu-GraphRAG*, *ToG-3*, *LinearRAG*, *HippoRAG 2*, *GraphSearch*).
- **Adversarial multi-hop**: AdvHotpotQA (*ToG-2*: +16.6%).
- **KGQA**: WebQSP, CWQ, QALD-10-en, Zero-Shot RE, MetaQA (*ToG-2*, *FiDeLiS*).
- **Factual / open-domain**: NaturalQuestions, PopQA, TriviaQA, FEVER, Creak (*HippoRAG 2*, *MaGiX*, *KG2RAG*).
- **Multi-hop RAG**: MultiHop-RAG, MultiHopRAG (*EventRAG*, *NodeRAG*).
- **Long-doc / QFS / domain**: UltraDomain (Agriculture, CS, Legal, Mix, History, Biology) — used by *LightRAG*, *PathRAG*, *FG-RAG*, *HyperGraphRAG*; Loong benchmark (*StructRAG ICLR*).
- **Domain-specific**: MIMIC-III/IV (*KARE*), DDXPlus + CPDD (*MedRAG*), MEDQA / MEDMCQA / MMLU-Med / PubMedQA / BioASQ (*AMG-RAG*, *KGARevion*); MovieLens-20M + Amazon Book (*K-RagRec*); KG-Android-Bench / KG-Harmony-Bench (*KG-RAG GUI*); LaMP-2N/M/3 (*PersonaAgent w/ GraphRAG*); CMEL + DocBench + MMLongBench (*MMGraphRAG*); MultimodalQA + WebQA (*Query-Driven Multimodal GraphRAG*); weatherQA, trafficQA (*KG-IRAG*); enterprise legacy-code datasets (*Towards Practical GraphRAG*); 329-paper CS scholarly corpus (*StructRAG WWW*).
- **New benchmarks introduced in this cycle**: *GraphRAG-Bench* (ICLR 2026, 1,018 questions, 5 types, 16 disciplines), *AnonyRAG-CHS/ENG* (anonymised; with *Youtu-GraphRAG*), *KG-Android/Harmony-Bench* (*KG-RAG GUI*), *CMEL* (*MMGraphRAG*).

### 4.2 Common metrics

- **EM, F1** — dominant for multi-hop QA (*HippoRAG 2*, *NodeRAG*, *SUBQRAG*, *ToG-3*, *LinearRAG*).
- **Hits@1 / @5** — KGQA convention (*FiDeLiS*: removing Path-RAG drops Hits@1 by 6.97% on WebQSP).
- **Recall@k** — *NeuroPath* (+16.3% Recall@2 / +13.5% Recall@5).
- **Win-rate via LLM-as-judge** — *GraphRAG (MS)* (pairwise 72-83% wins for global QFS), *PathRAG* (60.44% vs GraphRAG), *EventRAG* (head-to-head across 6 dims), *FG-RAG*, *PersonaAgent w/ GraphRAG*, *Towards Practical GraphRAG*.
- **Comprehensiveness / Diversity / Empowerment / Logicality / Coherence** — the *LightRAG*/*PathRAG*/*FG-RAG* family of axes.
- **Faithfulness / citation precision/recall** — *MedGraphRAG*, *FiDeLiS*, *GraphRAG-FI*.
- **Latency / tokens / construction cost** — *NodeRAG* (retrieved tokens), *KET-RAG* (indexing $), *ToG-3* (hours), *Youtu-GraphRAG* (token savings), *ReMindRAG* (token reduction), *K-RagRec* (only +0.1s vs direct LLM).
- **Holistic 4-axis evaluation** — *GraphRAG-Bench*'s separate scoring of graph construction, retrieval, answer generation, and rationale generation.

### 4.3 Backbone LLMs

GPT-4 / GPT-4o / GPT-4o-mini dominates (e.g. *GraphRAG (MS)*, *FG-RAG*, *KET-RAG*, *KARE*, *StructRAG ICLR*, *KG-IRAG*). Llama-3 / Llama-3.1-Instruct (*MedRAG*), Qwen2.5-7B/32B (*FG-RAG*, *ToG-3*, *Youtu-GraphRAG*), Mixtral-8x7B (*MedRAG*), DeepSeek-V3-0324 (*Youtu-GraphRAG*) are the open-source workhorses. Several papers explicitly test backbone-portability: *MedRAG* (4 backbones), *KGARevion* (15 LLMs), *OG-RAG* (4 LLMs), *FG-RAG* (4 LLMs from 1.5B → 72B), *Youtu-GraphRAG* (DeepSeek-V3 and Qwen3-32B). The result: a well-designed training-free pipeline maintains its ranking across backbones — which is the strongest argument for training-free KG-RAG as a *paradigm*.

### 4.4 Compute environment

Hardware is rarely reported in detail. Indexing wall-clock is increasingly disclosed (e.g., *ToG-3* 10.13 h, *KG-RAG GUI* ~4 h per app, *KET-RAG* 10× faster). The growing concern about LLM-extraction cost has made token budgets the implicit currency.

---

## 5. Empirical Findings and SOTA Patterns

### 5.1 Multi-hop QA

The 2025 SOTA for multi-hop QA is contested by four families:

- *HippoRAG 2* — first KG-RAG to beat dense RAG comprehensively on *factual, sense-making and associative* memory; +7% on associative-memory tasks over the strongest embedding baseline.
- *NeuroPath* — +16.3% Recall@2, +13.5% Recall@5 over advanced graph-based RAGs (HippoRAG 2 included); best on MuSiQue and 2Wiki, slightly behind HippoRAG 2 only on HotpotQA.
- *Youtu-GraphRAG* — up to +16.62% accuracy over SOTA; top-20 accuracies 86.5% HotpotQA / 85.5% 2Wiki / 53.6% MuSiQue with DeepSeek-V3.
- *NodeRAG* — 89.5% HotpotQA (vs GraphRAG 89.0%) and 46.29% MuSiQue (vs GraphRAG 41.71%, LightRAG 36.00%), with ~1.6 k fewer retrieved tokens.
- *SUBQRAG* — +5.3% MuSiQue, +22.3% 2WikiMultiHopQA, +7.9% HotpotQA EM.
- *ToG-3* — highest *average* across the three benchmarks (EM 0.453 / F1 0.312).
- *GeAR* — >10% improvement on MuSiQue vs HippoRAG / IRCoT; the most efficient at single iteration.

No single system dominates all three benchmarks under all backbones — *GraphRAG-Bench*'s key empirical finding is that no GraphRAG system dominates across question types or disciplines, and rationale-generation scores lag answer-generation scores universally. The implication: multi-hop QA is heterogeneous, and which technique wins depends on the *kind* of hop (entity-bridging vs. logical chain vs. temporal vs. comparative).

### 5.2 Long-document / global / query-focused summarisation

*From Local to Global (GraphRAG MS)* set the baseline (pairwise wins 72-83% comprehensiveness, 75-82% diversity vs vector RAG at 1M-token scale). Since then:

- *LightRAG* beats GraphRAG on comprehensiveness, diversity, empowerment and overall (52.8% vs 47.2% on Legal; 60.0% vs 40.0% on Mix), at far lower indexing cost.
- *PathRAG* further beats LightRAG (58.46%) and GraphRAG (60.44%) on average pairwise win rates, rising to ~65% on the largest domains (Legal, History, Biology).
- *FG-RAG* wins on comprehensiveness/diversity/empowerment over both GraphRAG and LightRAG across UltraDomain.
- *KET-RAG* improves generation quality by up to 32.4% over the strongest competitor while reducing indexing cost by an order of magnitude.
- *StructRAG (ICLR 2025)* on the Loong benchmark scores 69.43 LLM-score / 0.35 EM vs 60.11 / 0.29 for long-context baseline and 46.11 / 0.23 for standard RAG.

The hierarchy on QFS is roughly *vanilla RAG ≪ GraphRAG ≪ LightRAG ≲ PathRAG/FG-RAG/KET-RAG*, with KET-RAG dominating on cost-quality Pareto.

### 5.3 Domain-specific

- **Medical**: *MedGraphRAG* +10% over no-retrieval on fact-checking, new SOTA on 11 medical datasets; *KARE* +10.8-15.0% over leading EHR models on MIMIC-III, +12.6-12.7% on MIMIC-IV; *AMG-RAG* hits 74.1% F1 on MEDQA and 66.34% on MEDMCQA with an 8B-parameter LLM, surpassing Meditron-70B; *KGARevion* +5.2% average over 15 LLMs on 4 medical benchmarks (+10.4% on three new harder ones); *MedRAG* best across 4 backbones on DDXPlus + CPDD.
- **Recommendation**: *K-RagRec* +21.6% over SOTA on MovieLens-20M (zero-shot), +8.7% on Amazon Book; only +0.1 s latency.
- **GUI agents**: *KG-RAG (EMNLP 2025)* 75.8% success vs AutoDroid +8.9 pts, +40% transfer to Weibo-web, +20% to QQ Music-desktop.
- **Personalisation**: *PersonaAgent w/ GraphRAG* LaMP-2M accuracy 0.513 → 0.653 (+27.3%), F1 0.424 → 0.662 (+56.1%); *TOBUGraph* 92.86% precision (vs 78.58% best RAG), +20% user satisfaction.
- **Cross-lingual**: *MaGiX* lifts NQ from 27.71 → 77.27 (granular retrieval) → 87.27 (with fine-tuned embeddings) in English↔Vietnamese.

### 5.4 Where training-free wins (and where it doesn't)

Training-free KG-RAG most reliably wins on:
- *Domain corpora with sparse coverage in pretraining* (medicine, legacy code, regional apps).
- *Long-form, global QFS* (vector RAG cannot do this; GraphRAG family dominates).
- *Adversarial multi-hop QA* (*ToG-2* +16.6% on AdvHotpotQA).
- *Personalisation with privacy constraints* (*Personalizing LLMs w/ RAG and KG*, *PersonaAgent w/ GraphRAG*).

It struggles relative to fine-tuned systems on:
- *Pure factual recall under heavy benchmark leakage* — addressed by *Youtu-GraphRAG*'s AnonyRAG and *GraphRAG-Bench*'s domain-specific corpora.
- *Very large-scale relation extraction quality* — partly why *LinearRAG* drops relations entirely.

### 5.5 Cost-quality Pareto

The most efficient designs as of late 2025:
- Construction: *LinearRAG* (zero extra LLM tokens) > *Towards Practical GraphRAG* (dependency parsing, 94% quality) > *KET-RAG* (10× cheaper) > *Youtu-GraphRAG* (-90.71% tokens).
- Query: *NodeRAG* (fewer tokens, higher accuracy) ≈ *K-RagRec* (+0.1 s vs direct LLM) ≈ *ReMindRAG* (~50% per-query cost).

---

## 6. Cross-Paper Insights

### 6.1 Path vs subgraph debate

PathRAG, NeuroPath and FiDeLiS argue paths are the right unit: less redundant, more interpretable, naturally ordered for prompting. SimGRAG and SUBQRAG counter that subgraphs preserve branching dependencies a single path loses. NodeRAG nominally retrieves subgraphs but emphasises *heterogeneous node types*, suggesting "the unit" is itself the wrong frame — the real lever is the *schema*. The cleanest empirical signal: PathRAG's flow-based path-ordered prompting wins 56% over flat prompting head-to-head, supporting the path side, but NeuroPath gains ~+16% Recall@2 by *adding a post-retrieval completion stage* — i.e., paths alone are not enough.

### 6.2 Coarse-to-fine retrieval is now standard

Almost every system retrieves at two or more granularities. *LightRAG* (low/high), *MedGraphRAG* (three-tier U-retrieve), *FG-RAG* (coarse community summaries + fine query-focused summaries), *PathRAG* (node → path → ordered prompt), *NeuroPath* (path tracking → completion), *ToG-3* (Chunk-Triplets-Community), *Youtu-GraphRAG* (top-down + bottom-up over hierarchical tree). The exception is the path-only / triple-only systems (*FiDeLiS*, *KGARevion*, *KG-IRAG*), and even those use a coarse pruning step (Path-RAG, Generate, constrained slice).

### 6.3 Agentic / iterative retrieval is rising

ToG-2/3, ReMindRAG, GraphSearch, KGARevion, GeAR, SUBQRAG, Youtu-GraphRAG, AMG-RAG, KG-IRAG, FiDeLiS — at least a quarter of the surveyed work is explicitly agentic. The pattern is: query decomposition + iterative graph traversal + reflection + memory-of-evidence. Two distinct flavours emerge: **tool-use agents** (AMG-RAG with PubMed/Wiki search) and **internal-loop agents** (ToG family, GraphSearch). The internal-loop flavour dominates because it scales without external tool calls.

### 6.4 Community-level summarisation is a load-bearing primitive

GraphRAG (MS), KARE, FG-RAG, PersonaAgent w/ GraphRAG, MedGraphRAG, Youtu-GraphRAG and ToG-3 all rely on Leiden- or LLM-derived community summaries. This is the single most important inheritance from the original Microsoft paper. The flip side: *FG-RAG* explicitly criticises pre-computed coarse community summaries for lacking query awareness, and proposes query-level fine-grained summaries instead.

### 6.5 Hybrid sparse + dense + graph retrieval wins

*Towards Practical GraphRAG* (RRF fusion of vector and graph), *GraphSearch* (semantic chunks + relational graph dual channels), *KET-RAG* (skeleton KG + keyword bipartite graph), *GeAR* (BM25/dense + graph expansion), *MaGiX* (graph + multilingual embedding + re-ranker), *HippoRAG 2* (PPR over passage+KG graph). The empirical signal is unambiguous: pure-graph retrieval is suboptimal; pure-vector retrieval is suboptimal; the combination wins.

### 6.6 Indexing cost is the new bottleneck

The narrative arc from GraphRAG (MS) 2024 → LightRAG 2024 → KET-RAG 2025 → LinearRAG 2026 traces a steady drop in construction cost. *Towards Practical GraphRAG*, *KET-RAG*, *LinearRAG* and *Youtu-GraphRAG* are explicitly cost-focused. The trade-off is interesting: *LinearRAG* sacrifices LLM-extracted *relations* entirely yet still matches HippoRAG 2; this calls into question whether relations were ever doing as much work as their construction cost implied.

### 6.7 LLM-as-judge dominates open-domain evaluation

Pairwise LLM-judge head-to-head evaluation is now standard for QFS / generation quality (*GraphRAG (MS)*, *LightRAG*, *PathRAG*, *FG-RAG*, *EventRAG*, *PersonaAgent w/ GraphRAG*, *Towards Practical GraphRAG*). For multi-hop QA EM/F1 still rule. The risk *Youtu-GraphRAG* and *GraphRAG-Bench* call out — LLM-judge bias and benchmark leakage — has not been fully addressed by the field.

### 6.8 Schema-aware vs schema-free graphs

*NodeRAG*'s heterogeneous node types, *Youtu-GraphRAG*'s seed graph schema, *OG-RAG*'s ontology-grounded hypergraph and *StructRAG (WWW)*'s Deep Document Model all argue that putting an explicit schema in front of the graph is worth doing. *LinearRAG* and *Towards Practical GraphRAG* argue the opposite: skip schemas, skip even relations, and let the entities + vectors do the work. The field has not chosen.

### 6.9 Faithfulness is increasingly first-class

*FiDeLiS* (deductive verification), *GraphRAG-FI* (filter + logits fusion), *KGARevion* (Review/Revise), *MedGraphRAG* (citation precision/recall), *KG-RAG GUI* (traceable navigation paths), *SUBQRAG* (graph-memory as traceable evidence) all foreground *faithfulness to retrieved graph evidence*, not just answer accuracy. This is a recent (2024 → 2025) shift driven by safety-critical domains (medicine, GUI automation).

---

## 7. Open Problems and Future Directions

### 7.1 Scalability of graph index construction

LLM-extracted KGs do not scale to billions of documents. *LinearRAG* (linear, zero extra tokens) and *Towards Practical GraphRAG* (dependency parsing) suggest the field is converging on "skip the LLM for extraction, use it only for retrieval-time reasoning". *KET-RAG*'s hybrid skeleton-plus-keyword approach is another promising compromise. But none of these systems has been demonstrated at internet scale.

### 7.2 Robustness to noisy / incomplete KGs

*GraphRAG-FI* shows that filtering noisy retrievals helps; *GraphRAG-Bench* shows that no system dominates on rationale generation; *AnonyRAG* shows that pretraining-leakage inflates apparent accuracy. The community needs systematic studies of how noisy edges, missing entities and incorrect coreference resolution propagate through path / subgraph retrieval — only a handful of papers (*NeuroPath*'s completion stage, *KGARevion*'s revise step) explicitly model this.

### 7.3 Cross-domain generalisation

Most domain-specific systems (*MedGraphRAG*, *K-RagRec*, *KG-RAG GUI*, *StructRAG WWW*) succeed by hand-crafting ontologies, schemas or tier structures for their domain. *Youtu-GraphRAG*'s seed-schema continuous expansion is a step toward automated cross-domain transfer, but the question of *zero-shot domain transfer of a KG-RAG pipeline* remains open.

### 7.4 Dynamic graphs

*KG-IRAG* (temporal QA), *AMG-RAG* (continuously updated medical KG via web search), *Personalizing LLMs with RAG and KG* (calendar data), *SUBQRAG* (on-the-fly triple extraction), *Query-Driven Multimodal GraphRAG* (query-specific local KG) all address this, but the design space (when to update, how to deprecate, how to version) is under-explored. RAG4DyG-style dynamic-graph evaluation is conspicuously absent from most benchmarks.

### 7.5 End-to-end vs modular debate

Training-free pipelines are by definition modular: extractor → indexer → retriever → generator. *Youtu-GraphRAG* explicitly argues that vertically unifying construction and retrieval (via shared schema) is the right next step. *ToG-3*'s four-agent MACER and *GraphSearch*'s six-module workflow are similar moves. The tension is between modularity (debuggability, swappable LLMs) and end-to-end optimisation (better joint performance). No clear winner yet.

### 7.6 Multimodal KG-RAG is in its infancy

Only two papers here (*Query-Driven Multimodal GraphRAG*, *MMGraphRAG*) tackle vision-language fusion in the graph, and only MMGraphRAG offers a principled cross-modal entity linker (SpecLink). Tabular, code, and audio modalities are essentially untouched.

### 7.7 Evaluation gaps

*GraphRAG-Bench* shows answer-vs-rationale accuracy diverge sharply; *Youtu-GraphRAG*'s AnonyRAG shows pretraining leakage inflates scores. The field needs:
- More anonymised / leakage-controlled benchmarks.
- Standardised cost reporting (indexing tokens, query tokens, wall-clock).
- Faithfulness metrics beyond LLM-judge (citation grounding, deductive verification scores).
- Domain-specific multi-hop benchmarks beyond Wikipedia-derived ones.

### 7.8 Theory

Almost every paper is empirical. There is essentially no theoretical analysis of why path / subgraph retrieval beats vector retrieval — when, by how much, under what graph structure. *NeuroPath*'s place-cell analogy and *HippoRAG 2*'s hippocampus analogy gesture in this direction but stop short of formal claims.

---

## 8. Paper Index

| # | Paper (italicised for cross-reference) | Venue | One-line takeaway |
| --- | --- | --- | --- |
| 1 | *Towards Practical GraphRAG* | arXiv 2025 (2507.03226) | Dependency-parsing KG recovers 94% of LLM-extraction quality at fraction of cost; RRF-fused with vector retrieval. |
| 2 | *Query-Driven Multimodal GraphRAG* | ACL Findings 2025 | Dynamically builds a query-specific local multimodal KG over text + tables + images. |
| 3 | *MMGraphRAG* | arXiv 2025 (2507.20804) | Scene-graph + text-KG fusion via SpecLink spectral clustering; 76.8% on DocBench (+17.3 over NaiveRAG). |
| 4 | *EventRAG* | ACL 2025 | Event Knowledge Graph + iterative temporal/logical traversal across event nodes. |
| 5 | *KG2RAG* (NAACL listing) | NAACL 2025 | KG-guided chunk expansion + reorganisation on top of dense retrieval. |
| 6 | *Think-on-Graph 2.0* | ICLR 2025 | Tightly coupled iterative KG + passage retrieval; SOTA on 6/7 knowledge-intensive datasets with GPT-3.5. |
| 7 | *KARE* | ICLR 2025 | Dense multi-source medical KG + hierarchical community retrieval; +10.8-15% on MIMIC. |
| 8 | *HippoRAG 2* | ICML 2025 | PPR over passage+KG; first KG-RAG to win on factual + sense-making + associative tasks. |
| 9 | *HyperGraphRAG* | NeurIPS 2025 | n-ary hyperedges instead of binary edges; bipartite vector indices + local hypergraph expansion. |
| 10 | *ReMindRAG* | NeurIPS 2025 | "Memory replay" in KG edge embeddings; +5-10% accuracy, ~50% query-cost reduction. |
| 11 | *RAG4GFM* | NeurIPS 2025 (Oral) | Hierarchical multi-level graph index for Graph Foundation Models; node/edge/graph task-aware. |
| 12 | *NeuroPath* | NeurIPS 2025 | Place-cell-inspired Dynamic Path Tracking + Post-retrieval Completion; +16.3% Recall@2. |
| 13 | *KG2RAG* (arXiv variant) | NAACL 2025 / arXiv 2502.06864 | Same idea as #5; KG as structural rearranger of dense-retrieved chunks. |
| 14 | *SimGRAG* | ACL Findings 2025 | Query→Pattern→Subgraph with Graph Semantic Distance; top-k subgraphs in ~1 s on 10M-node KG. |
| 15 | *K-RagRec* | ACL 2025 | GNN-encoded hop-field item subgraphs into frozen LLM recommender; +21.6% on MovieLens-20M. |
| 16 | *Medical Graph RAG (MedGraphRAG)* | ACL 2025 | Three-tier graph (records / literature / UMLS) + U-retrieve; new SOTA on 11 medical datasets. |
| 17 | *FiDeLiS* | ACL Findings 2025 | Path-RAG candidate reduction + Deductive-Verification Beam Search for faithful KGQA. |
| 18 | *LightRAG* | EMNLP Findings 2025 | Dual-level (low entities, high topics) graph retrieval; incremental updates; 60.0% vs NaiveRAG 40.0% on Mix. |
| 19 | *GraphRAG-FI* | EMNLP 2025 | Two-stage filter + logits-level fusion of intrinsic LLM and external graph knowledge. |
| 20 | *KG-RAG (GUI Agents)* | EMNLP 2025 | UI Transition Graphs vectorised for mobile-task navigation; 75.8% success, +40% web transfer. |
| 21 | *TOBUGraph* | EMNLP Industry 2025 | Dynamic LLM-built KG replaces chunk retrieval in a personal-memory app; 92.86% precision. |
| 22 | *MaGiX* | EMNLP Findings 2025 | First cross-lingual (En↔Vi) GraphRAG; multi-granular nodes + cross-synonym edges. |
| 23 | *LLMs Meet KGs for QA: Synthesis and Opportunities* | EMNLP 2025 (Main) | Survey: taxonomy along QA task × KG role axes. |
| 24 | *AMG-RAG (Agentic Medical Graph-RAG)* | EMNLP Findings 2025 | Agentic continuous MKG construction + PubMed/Wiki tools; 8B model beats Meditron-70B on MEDQA. |
| 25 | *MedRAG* | WWW 2025 | Four-tier differential-diagnostic KG; best across 4 LLM backbones on DDXPlus + CPDD. |
| 26 | *StructRAG (WWW)* | WWW 2025 | Deep Document Model preserves scholarly hierarchy; diversity-aware retrieval on 329-paper CS corpus. |
| 27 | *Personalizing LLMs with RAG and KG* | WWW 2025 Companion | KG-RAG over personal (calendar) data as a privacy-preserving substrate. |
| 28 | *KET-RAG* | KDD 2025 | KG skeleton over key chunks + cheap text-keyword bipartite graph; +32.4% generation, 10× cheaper indexing. |
| 29 | *FG-RAG* | CIKM 2025 | Context-aware entity expansion + query-level fine-grained summarisation for QFS. |
| 30 | *PathRAG* | arXiv 2025 / AAAI | Flow-based path pruning + path-ordered prompts; ~60% pairwise wins vs GraphRAG/LightRAG. |
| 31 | *NodeRAG* | arXiv 2025 | Heterogeneous node types as first-class design choice; 89.5% HotpotQA, fewer retrieved tokens. |
| 32 | *KG-IRAG* | arXiv 2025 | Iterative KG retrieval with temporal-constraint propagation; weatherQA, trafficQA. |
| 33 | *Retrieval-Augmented Generation with Graphs (survey)* | arXiv 2501.00309 | 5-component (query/retriever/organizer/generator/data) framework. |
| 34 | *Survey of GraphRAG for Customized LLMs* | arXiv 2501.13958 | GraphRAG specifically for professional-domain customisation. |
| 35 | *Youtu-GraphRAG* | arXiv (ICLR 2026) | Vertically unified agentic schema-bound construction + retrieval; +16.62% accuracy, -90.71% tokens. |
| 36 | *SUBQRAG* | arXiv 2025 | Sub-question chain + dynamic graph expansion + traceable evidence; +22.3% EM on 2WikiMultiHopQA. |
| 37 | *LinearRAG* | ICLR 2026 | Relation-free Tri-Graph; linear in corpus, zero extra LLM tokens; matches HippoRAG 2. |
| 38 | *GraphRAG-Bench* | ICLR 2026 | 1,018 college-level multi-hop questions, 5 question types, 4-axis holistic scoring. |
| 39 | *GraphSearch* | arXiv 2025 | Six-module agentic loop with semantic + relational dual-channel retrieval; +16 pts SubEM on MuSiQue. |
| 40 | *From Local to Global (GraphRAG MS)* | arXiv 2404.16130 | Original Leiden community-summaries QFS; 72-83% wins vs vector RAG at 1M-token scale. |
| 41 | *PersonaAgent with GraphRAG* | arXiv 2025 | KG + community detection for personalised prompts; +56.1% F1 on LaMP-2M. |
| 42 | *StructRAG (ICLR)* | ICLR 2025 | Hybrid structure router picks optimal structure type per task at inference; +9 LLM-score on Loong. |
| 43 | *KGARevion* | ICLR 2025 | Generate / Review / Revise / Answer agent verifies LLM triples against biomedical KG; +5.2-10.4%. |
| 44 | *GeAR* | ACL Findings 2025 | Graph-expansion (SyncGE) augmenting BM25/dense + gist-memory agent; >10% MuSiQue improvement. |
| 45 | *Think-on-Graph 3.0* | arXiv 2025 | Four-agent MACER with Dual-Evolution of query and subgraph; highest avg EM 0.453 / F1 0.312. |
| 46 | *OG-RAG* | EMNLP 2025 | Ontology-grounded hypergraph + optimisation-based minimal-context selection; +55% recall, +40% correctness. |

---

## 9. Concluding Remarks

The 2025-2026 training-free KG-RAG literature is no longer a collection of one-off systems but a coherent design space along four axes — **construction** (LLM-heavy vs lightweight vs dynamic), **index granularity** (single vs hierarchical vs query-specific), **retrieval unit** (path vs subgraph vs community), and **control** (single-shot vs iterative vs agentic). The clearest practical advice that emerges:

1. *Default to hybrid retrieval*: vector + graph, combined via RRF or dual-channel.
2. *Default to coarse-to-fine*: prefilter to seeds, then traverse, then re-rank.
3. *Avoid expensive LLM relation extraction* if scale matters — *LinearRAG*, *KET-RAG*, *Towards Practical GraphRAG* and *Youtu-GraphRAG* all show this is now optional.
4. *Add an iterative loop* when multi-hop or domain-specific reasoning is required — *ToG-2/3*, *GraphSearch*, *SUBQRAG*, *NeuroPath* all show single-shot retrieval is brittle.
5. *Build a domain-specific tier* if the application is medical, GUI, recommendation, or personalisation — generic GraphRAG underperforms tier-aware variants by 5-25%.

The remaining open frontier is not method invention but rather **scalable construction**, **faithful evaluation under leakage**, and **theoretical grounding** of why structure helps where it does. The next 12 months are likely to be dominated by works that fold construction and retrieval into one optimisation problem (the *Youtu-GraphRAG* / *ToG-3* line), and by benchmark efforts that move us beyond Wikipedia multi-hop QA into truly domain-specific, anonymised settings.
