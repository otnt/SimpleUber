# Training-Free Knowledge Graph Construction (2025-2026): A Deep Research Synthesis

*A synthesis of 20 papers from NeurIPS, ICCV, ICML, EMNLP, ACL, WWW, COLING, EACL, WISE 2024-2026 and high-impact arXiv preprints. Source: `/home/user/SimpleUber/research/summaries/kg_construction/training_free_summaries.md`.*

---

## 1. Executive Summary

The 2025-2026 landscape of training-free Knowledge Graph Construction (KGC) is defined by a decisive shift away from supervised, schema-bound, single-pass extractors toward **prompt-driven, LLM-orchestrated, multi-stage pipelines** that absorb classical IE sub-tasks (NER, RE, schema alignment, deduplication, conflict resolution) into the LLM itself. Across the 20 papers surveyed, no method relies on task-specific fine-tuning of the extraction backbone; every system uses zero-shot or few-shot prompting of general-purpose LLMs (GPT-4o, DeepSeek-v3, Llama-3.1, Qwen2.5, GLM-4, Phi-3.5-mini, etc.) and competes on architectural innovation rather than weight updates. This produces a market where the *system* — agent topology, schema-induction strategy, fusion logic, judgement loop — is the contribution.

Four dominant themes emerge. First, **schema induction has gone autonomous**: *AutoSchemaKG*, *DIAL-KG*, and *LKD-KGC* derive schemas dynamically from the corpus itself, with *AutoSchemaKG* operating at 50M-document, 5.9-billion-edge scale and reaching 92-95% alignment with human-crafted ontologies. Second, **multi-agent pipelines are the new SOTA architecture**: *KARMA* (9 cooperating agents, NeurIPS 2025 Spotlight) and *OneKE* (WWW 2025 demo) explicitly decompose extraction into role-specialised agents that cross-verify and debate. Third, **reflection and LLM-as-judge** are pervasive: *RefKG*, *OneKE*, *Taxonomy-Driven KGC*, *ODKE+*, and *Graphusion* all use a second LLM call (or a dedicated agent) to validate, ground, or correct the first. Fourth, **temporality and streaming are first-class concerns**: *ATOM*, *DIAL-KG*, *EMERGE*, and *ODKE+* attack the under-explored TKG-update problem, with *EMERGE* showing that even GPT-5.1 still performs poorly on continuous updates.

Headline findings: *KGGen* outperforms GraphRAG by 18 points and OpenIE by 36 points on the new MINE benchmark; *KARMA* extracts 38,230 new entities at 83.1% verified correctness; *ATOM* delivers 93.8%-95.3% latency reductions over Graphiti/iText2KG; *ODKE+* runs in Apple production at 98.8% precision over 9M+ Wikipedia pages; and *AutoSchemaKG* beats SOTA on multi-hop QA by 12-18%. Yet the field still has hard limits: *EMERGE* demonstrates that no current model — including GPT-5.1 — handles the five-operation TKG update task well, and the entire field remains dominated by English/Wikipedia/scientific-domain benchmarks.

---

## 2. Taxonomy of Approaches

The 20 papers cluster into seven coherent sub-categories. The categories overlap (e.g. *ATOM* is both temporal and lightweight; *VaLiK* is both multimodal and annotation-free), so each paper is placed in its strongest cluster.

### 2.1 Autonomous / Schema-Free KGC

Methods that *induce* schema from raw text rather than consume a predefined ontology.

| Paper | Distinguishing technique |
|---|---|
| *AutoSchemaKG* | Conceptualization layer abstracts instances into hierarchical semantic categories; entities **and** events; web-scale (50M docs, 900M nodes, 5.9B edges). |
| *KGGen* | Iterative LLM-driven clustering that merges synonymous entities/edges across the whole graph after extraction; introduces the MINE benchmark. |
| *DIAL-KG* | Dual-Track Extraction (default triple track vs. event track) with a Meta-Knowledge Base that evolves the schema in a closed loop; auditable soft deprecation. |
| *LKD-KGC* | Autoregressive schema generation over a document repository using inferred knowledge dependencies (processing order matters); adaptive embedding clustering merges equivalent entity types. |
| *iText2KG* | Plug-and-play incremental schema-free pipeline with a "blueprint" mechanism that conditions LLM rewriting on a user template. |

Common technique: schema emerges from extraction; entity/relation alignment is handled by clustering or by LLM-driven adjudication rather than by ontology lookup.

### 2.2 Schema-Guided & Ontology-Grounded KGC

Methods that *consume* an existing taxonomy or ontology and use the LLM as a constrained extractor.

| Paper | Distinguishing technique |
|---|---|
| *OneKE* | Dockerized agent system; schema configuration agent + case-retrieval agent + reflection agent; Neo4j integration. |
| *Taxonomy-Driven KGC for Domain-Specific Scientific Applications* (ACL Findings 2025) | Domain taxonomy supplies entity/relation hierarchy for prompt conditioning; RAG validation step filters hallucinations. |
| *ODKE+* (Apple ML Research) | Production pipeline with five modular components; dynamic entity-type-specific *ontology-snippet generation* for prompts across 195 predicates. |
| *RelPrior* | Relation set is the *prior* — a binary correlation classifier filters entity pairs first, then a constrained matcher assigns one of the predefined relations. |

Common technique: a predefined or curated structure narrows the LLM's output space, sometimes combined with a second LLM grounding pass.

### 2.3 Multi-Agent Pipelines

Architectures where multiple specialised LLM roles cooperate, cross-verify, or debate.

| Paper | Agents / roles | Distinguishing feature |
|---|---|---|
| *KARMA* | 9 agents: Entity Discovery, Relation Extraction, Schema Alignment, Conflict Resolution, etc. | LLM-based debate adjudication of contradictions; cross-agent verification. |
| *OneKE* | Schema Configuration, Direct Extraction, Case-Retrieval Extraction, Reflection / Debugging | Case-retrieval agent learns from prior error cases; dockerised deployment. |
| *RefKG* | Query Decoupling, Evidence Subgraph Retrieval, Inference with Knowledge Reconstruction | Self-correction signal during inference; treats reflection as a first-class step. |

This sub-category is the field's most visible architectural trend — *KARMA* received a NeurIPS 2025 Spotlight specifically for the 9-agent design.

### 2.4 Multimodal KGC

Methods that build KGs from images or video, with no captioning supervision.

| Paper | Distinguishing technique |
|---|---|
| *VaLiK* (ICCV 2025) | Chain-of-Expert cascade of pre-trained VLMs aligns image features to text; cross-modal similarity verification filters noise; fully annotation-free. |
| *Synergizing Multimodal Temporal KGs & LLMs for Social Relation Recognition* (EMNLP 2025) | Per-scene spatial KGs linked along the video timeline into temporal KGs; multi-scale retrieval for LLM reasoning. |

Both eliminate manual annotation, but *VaLiK* targets images (CrisisMMD, ScienceQA) while the EMNLP paper targets video (MovieGraphs, ViSR).

### 2.5 Temporal / Event-Centric KGC

| Paper | Distinguishing technique |
|---|---|
| *ATOM* | Atomic fact decomposition + fully parallel pairwise merge; dual-time modelling (observation time vs. validity time). |
| *DIAL-KG* | Event track for complex temporal/lifecycle knowledge alongside a default triple track. |
| *EMERGE* | Benchmark only: 7 yearly Wikidata snapshots (2019-2025) aligned to 233K Wikipedia passages, 1.45M edits, with 5 update operations (EXISTS / ADD / MINT+ADD / INFER / DEPRECATE). |
| *ODKE+* | Streaming ingestion mode with an Extraction Initiator that detects missing/stale facts. |

### 2.6 Lightweight / Efficient KGC

| Paper | Distinguishing technique |
|---|---|
| *LightKGG* | SLM-based (Phi-3.5-mini-instruct); context-integrated graph extraction unifies temporal/spatial cues into nodes/edges; topology-enhanced relation inference compensates for SLM weakness. |
| *KGGen* | LLM-agnostic via LiteLLM; works with smaller open-source backends. |
| *DynamicNER / CascadeNER* | Two cascaded small LLMs (extract → classify) replace one large LLM call. |
| *ATOM* | Parallel merge eliminates the serial bottleneck of *Graphiti*/*iText2KG*. |

### 2.7 Domain-Specific KGC

| Paper | Domain | Distinguishing artefact |
|---|---|---|
| *KARMA* | Biomedical (genomics/proteomics/metabolomics) | 1,200 PubMed articles. |
| *Taxonomy-Driven KGC* | Climate science | First climate-science IR benchmark. |
| *Graphusion* | NLP education / scientific KG | TutorQA (1,200 QA pairs, 6 tasks). |
| *LKD-KGC* | Multiple technical domains | Document-dependency-aware schema. |
| *Synergizing mtKG-LLM* | Social relation in film/video | MovieGraphs, ViSR. |

### 2.8 NER / RE-Focused Components

Not full KGC systems, but KGC building blocks that are training-free:

- *DynamicNER + CascadeNER* — fine-grained, multilingual NER (8 languages, 155 fine types) using two small cascaded LLMs.
- *RelPrior* — document-level RE that reframes the task as binary correlation + constrained matching.
- *Chain of Knowledge Graph (CoKG)* — entity-relation prompting strategy for noisy multi-document summarisation, building a transient KG inside the chain-of-thought.

### 2.9 Survey

- *LLM-empowered Knowledge Graph Construction: A Survey* (Bian, 2025) — analyses the classical three-layer KGC pipeline (ontology engineering, knowledge extraction, knowledge fusion) and organises methods along the **schema-based vs. schema-free** axis. It is the natural meta-organising lens for the rest of the field.

---

## 3. Methodological Innovations

The papers can be read as a catalogue of training-free techniques. Below the most influential innovations are grouped and tied to specific systems.

### 3.1 Prompting Strategies

- **Blueprint conditioning**: *iText2KG* introduces a "Document Distiller" that rewrites raw text into a structured semantic block guided by a user-supplied blueprint — a soft schema that is enforced at the prompt level without supervision.
- **Ontology-snippet injection**: *ODKE+* generates *entity-type-specific* ontology snippets dynamically per call, enabling type-consistent extraction across 195 predicates within a single backbone.
- **Chain of Knowledge Graph**: *CoKG* (COLING 2025 NeusymBridge) treats the KG itself as the intermediate chain-of-thought structure for multi-document summarisation, gating downstream output on a KG-quality threshold — a direct departure from Chain-of-Density / Chain-of-Event prompts that aggressively filter entities.
- **Relation-as-prior reframing**: *RelPrior* converts open-vocabulary RE into a sequence of constrained judgement tasks (binary correlation, then constrained match), reducing out-of-set hallucination — a generally applicable training-free reformulation.

### 3.2 Iterative Refinement and Self-Verification

- *KGGen* runs an **iterative LLM-driven clustering algorithm** that repeatedly merges synonymous entities and collapses redundant edges. The iteration is the key to its +18-pt and +36-pt MINE gains over GraphRAG and OpenIE.
- *Graphusion* adds a global fusion step that "merges entities, resolves conflicts, and discovers new triplets" across the entire corpus — explicitly framed as moving beyond sentence-/document-level extraction.
- *RefKG* uses self-correction signals over extracted entities/relations during inference and reports 98.1% accuracy on MetaQA Hop-1.
- *DIAL-KG* uses a Meta-Knowledge Base to orchestrate three-stage cycles: Dual-Track Extraction → Governance Adjudication → Schema Evolution. The governance step achieves >98% precision on evidence-backed soft deprecations.

### 3.3 Schema Induction via Clustering / Conceptualisation

- *AutoSchemaKG*'s **conceptualization step** is the headline mechanism for autonomous schema induction: concrete instances are abstracted into hierarchical semantic categories so the schema emerges as the LLM processes documents. The 92-95% semantic alignment with human-crafted schemas validates the approach.
- *LKD-KGC* uses **adaptive embedding-based schema integration**: vector clustering plus LLM deduplication merges equivalent entity types — schema-by-clustering rather than schema-by-prompting.
- *KGGen* generalises this to the *graph* layer: clustering happens over entities and edges jointly, not just types.

### 3.4 Multi-Agent Debate / Cross-Agent Verification

- *KARMA* is the cleanest expression: nine agents with explicit cross-verification (Relation Extraction agents validate candidates *against* Schema Alignment outputs) and **debate-style adjudication** by Conflict Resolution agents. The reported 18.6% reduction in conflict edges is attributed to this mechanism.
- *OneKE*'s reflection agent debugs and corrects extraction errors using *past cases* from a configurable knowledge base — a form of cross-temporal self-verification rather than cross-agent verification.

### 3.5 Coreference Resolution & Sentence Decomposition

- *ATOM*'s **atomic fact decomposition** splits documents into minimal self-contained facts, raising extraction exhaustivity by ~31% and stability by ~17% according to the ablation. This is the cleanest training-free attack on the long-document coreference problem: by reducing every fact to a coreference-free atom, downstream merging becomes trivially parallelisable.
- *RefKG*'s Query Decoupling decomposes complex queries into atomic sub-questions for downstream evidence retrieval — the same atomicity principle applied to the question side.

### 3.6 LLM-as-Judge / Grounding

- *ODKE+* employs a **dedicated Grounder LLM** that validates facts from a separate extraction LLM, plus a Corroborator that ranks and normalises candidates.
- *Taxonomy-Driven KGC* uses **RAG-based validation** as a hallucination filter: the LLM's extracted triple is grounded in retrieved evidence before commit.
- *KARMA*'s Conflict Resolution agents adjudicate contradictions via "LLM-based debate" — the judge is itself a debate panel.
- *EMERGE* uses LLM-guided filtering to discard unsupported passages, validated by 500 manual annotations.

### 3.7 Hybrid Pattern + LLM Pipelines

*ODKE+* is the strongest exemplar of hybrid extraction: pattern rules + ontology-guided LLM prompting + LLM grounding. The result — 98.8% precision in production over 19M facts — is currently the strongest evidence that *training-free* does not have to mean *LLM-only*.

---

## 4. Evaluation Landscape

### 4.1 Benchmark Choices

The field is benchmark-fragmented, but a few centres of gravity emerge:

| Benchmark family | Used by | Note |
|---|---|---|
| **MINE** (new in *KGGen*) | *KGGen*, *LightKGG* | Specifically built to measure KG informativeness from plain text — a direct response to the "no standard benchmark" problem flagged in *KGGen*. |
| **Multi-hop QA**: MuSiQue, HotpotQA, 2WikiMultiHopQA | *AutoSchemaKG* | Used to evaluate KG quality via downstream QA. |
| **DocRE**: DocRED, Re-DocRED | *RelPrior* | Document-level RE standard. |
| **Fine-grained NER**: DynamicNER (new), CrossNER, FewNERD | *DynamicNER* | New benchmark with 8 languages and 155 fine types. |
| **KG-QA**: FactKG, WebQSP, MetaQA | *RefKG* | Reflective reasoning over KGs. |
| **Scientific**: TutorQA (new) | *Graphusion* | NLP-education-domain QA. |
| **Multimodal**: CrisisMMD, ScienceQA, MovieGraphs, ViSR | *VaLiK*, *mtKG-LLM* | Image+text and video benchmarks. |
| **Temporal**: NYT News (~2M articles), EMERGE (new) | *ATOM*, *EMERGE* | The paper-authors specifically note that DocRED and TempDocRED are *unsuitable* for full temporal extraction. |
| **Production / Web-scale**: 9M+ Wikipedia pages, 1,200 PubMed articles, 25 climate publications | *ODKE+*, *KARMA*, *Taxonomy-Driven KGC* | Domain-realistic data. |

A noteworthy trend: **five of the 20 papers introduce a new benchmark or dataset** — *KGGen*/MINE, *Graphusion*/TutorQA, *Taxonomy-Driven KGC*/ClimateIE, *DynamicNER*, *EMERGE*. This indicates that the existing IE benchmark suite (REBEL, WebNLG, DocRED, etc.) is widely judged inadequate for evaluating LLM-driven KGC, particularly for schema induction, temporal updating, and multilingual fine-grained NER.

### 4.2 Metrics

The metric landscape is correspondingly diverse:

- **F1 / precision / recall**: still dominant (*RelPrior*, *Taxonomy-Driven KGC*, *DIAL-KG*, *LKD-KGC*).
- **MINE-score**: KG informativeness via probing (*KGGen*, *LightKGG*).
- **Expert / LLM-verified correctness**: *KARMA* (83.1% LLM-verified), *Graphusion* (2.92/3 entity, 2.37/3 relation by expert).
- **Schema alignment**: *AutoSchemaKG* (92-95% with human schemas).
- **Downstream QA accuracy**: *AutoSchemaKG*, *RefKG*, *Graphusion*, *VaLiK*.
- **Latency / efficiency**: *ATOM* reports 93.8% / 95.3% latency reduction vs. Graphiti / iText2KG; *LightKGG* compares compute at matched quality.
- **Update lag**: *ODKE+* (50-day average reduction).
- **Hallucination rate / conflict edges**: *KARMA* (18.6% conflict reduction), *Taxonomy-Driven KGC* (23.3% hallucination reduction).
- **Coverage overlap with third-party KGs**: *ODKE+* (48%).

### 4.3 Backbone LLMs

The backbone landscape is consciously diverse:

- **Proprietary**: GPT-4, GPT-4o, GPT-5.1 (*EMERGE*), DeepSeek API.
- **Open-source large**: DeepSeek-v3 (37B MoE), Qwen2.5-72B, Llama-3.1-8B/7B, GLM-4 (9B), Baichuan-2, Bloom, Internlm-2.
- **Small / lightweight**: Phi-3.5-mini-instruct (*LightKGG*), MiniCPM3-4B (*OneKE*), small cascaded LLMs in *CascadeNER*.

Several papers explicitly evaluate across multiple backbones (*KARMA*: GLM-4 / GPT-4o / DeepSeek-v3; *RefKG*: Baichuan-2 / Llama-2 / Internlm-2 / Bloom) and report **backbone-agnostic** architectures — for example *RelPrior*'s authors emphasise that its design is independent of the underlying LLM.

### 4.4 Compute Environments

Compute environments range from production GPU clusters (*ODKE+* at Apple) to CPU-suitable SLM setups (*LightKGG* on Phi-3.5-mini-instruct). *AutoSchemaKG* uniquely demonstrates web-scale extraction (50M+ documents) with an open Llama-3.1-8B backbone — implicitly making the case that schema-free LLM-driven KGC at scale no longer requires proprietary models.

### 4.5 Cross-Venue Trends

- **NeurIPS 2025** (*KGGen*, *KARMA* Spotlight) elevated multi-agent and clustering-based extraction as systems contributions.
- **ICCV 2025** (*VaLiK*) brought annotation-free MMKG to the vision community.
- **WWW 2025** balanced production-oriented (*OneKE* demo) with global-fusion methods (*Graphusion* workshop).
- **ACL / EMNLP 2025** hosted the NLP-rigorous evaluations: *Taxonomy-Driven KGC*, *RefKG*, *DynamicNER*, *mtKG-LLM*.
- **arXiv** carries the streaming/temporal frontier (*ATOM*, *DIAL-KG*, *EMERGE*, *AutoSchemaKG*, *ODKE+*, *LKD-KGC*, *LightKGG*, *RelPrior*) — suggesting that *update-time* KGC is being aggressively pre-printed while still settling into venue homes.

---

## 5. Empirical Findings

### 5.1 Headline SOTA Results

| Paper | Benchmark | Result |
|---|---|---|
| *AutoSchemaKG* | MuSiQue / HotpotQA / 2WikiMultiHopQA | +12-18% over SOTA |
| *KGGen* | MINE | 66.07% vs. GraphRAG 47.80% / OpenIE 29.84% (+18.27 / +36.23) |
| *KARMA* | 1,200 PubMed | 38,230 new entities, 83.1% verified, -18.6% conflicts |
| *VaLiK* | CrisisMMD, ScienceQA | Qwen2.5-7B + VaLiK matches Qwen2.5-72B native |
| *Graphusion* | TutorQA, link prediction | +10% over supervised; +9.2% on sub-graph completion |
| *Taxonomy-Driven KGC* | Climate IE | -23.3% hallucinations, +13.9% F1 |
| *DIAL-KG* | Streaming KGC | +4.7 F1, >98% precision on deprecations, -15% relation types |
| *ATOM* | NYT News | +18% exhaustivity, +33% stability, -93.8%/-95.3% latency |
| *ODKE+* | Apple production | 98.8% precision, 19M facts, -50 day update lag |
| *LKD-KGC* | Technical domains | +10-20% precision/recall |
| *RelPrior* | DocRED | +2.06% dev / +2.38% test F1 over AutoRE_LLaMA3-8B |
| *RefKG* | MetaQA Hop-1 | 98.1% accuracy |

The improvement margins are striking: *KGGen*'s +36 absolute on MINE over OpenIE and *AutoSchemaKG*'s +12-18% on multi-hop QA both reflect the move from sentence-level pattern extraction to corpus-level LLM-driven extraction with global fusion.

### 5.2 Where Training-Free Beats Training-Required

- **Open-domain KGC**: *AutoSchemaKG* and *KGGen* outperform supervised pipelines because they extract from genuinely open vocabulary, not from a fixed predicate set.
- **Domain transfer**: *Graphusion* beats supervised link-prediction baselines by 10% on a scientific-KG benchmark; *LKD-KGC* beats SOTA by 10-20% across technical domains. The lack of training avoids the supervised models' domain-shift failures.
- **Few-shot and low-resource NER**: *CascadeNER* beats larger single-stage LLM baselines on CrossNER and FewNERD using smaller cascaded models.
- **Latency-sensitive temporal KGC**: *ATOM*'s parallel atomic merge yields up to 95.3% latency reductions while improving stability.

### 5.3 Where Training-Free Still Lags

- **DocRE** (closed schema, document-level): *RelPrior* explicitly notes that LLM-based DocRE "trails traditional supervised methods", and its 2-2.4% F1 gain is over LLM peers, not over the supervised SOTA. Closed-set, dense-relation DocRE remains a stronghold of supervised models.
- **Temporal-update reasoning**: *EMERGE* establishes that "even strong models such as GPT-5.1 perform poorly" across its five operations (EXISTS / ADD / MINT+ADD / INFER / DEPRECATE). This is the field's most candid admission of a gap.
- **Cost-quality at very high throughput**: production systems like *ODKE+* succeed by *combining* pattern rules with LLM prompting, suggesting pure LLM extraction is still too expensive for billion-scale throughput.

### 5.4 Trade-offs Observed

- **Cost vs. quality**: *LightKGG* matches LLM-driven baselines using Phi-3.5-mini at "a fraction of the compute cost"; *CascadeNER* trades one large LLM call for two small ones. The implicit constant is that quality plateaus and the engineering question becomes: can a smaller LLM with smarter scaffolding match a larger LLM with naive prompting? *LightKGG* answers yes.
- **Latency vs. accuracy**: *ATOM* delivers both — atomic decomposition improves accuracy *and* enables parallel merging. *KARMA* spends compute (9 agents) for quality (83.1% verified).
- **Generality vs. domain**: *AutoSchemaKG* is general but Wikipedia-/web-skewed; *KARMA*, *Taxonomy-Driven KGC*, *Graphusion* trade generality for domain-tailored taxonomy and outperform general methods on their domains.
- **Schema-free vs. schema-driven**: *AutoSchemaKG* / *DIAL-KG* offer flexibility (open vocabulary) but pay in noise; *ODKE+* / *RelPrior* offer precision (predefined predicates) but pay in coverage. *DIAL-KG*'s dual-track design and *LKD-KGC*'s autoregressive schema synthesis are explicit attempts to bridge this.

---

## 6. Cross-Paper Insights

### 6.1 Convergence on Multi-Agent Pipelines

*KARMA*'s NeurIPS Spotlight and *OneKE*'s WWW 2025 demo, alongside *RefKG*'s ACL 2025 Findings appearance, mark multi-agent pipelines as the field's preferred architecture for non-trivial KGC. The empirical justification — *KARMA*'s 18.6% conflict reduction, *OneKE*'s reflection-driven error correction, *RefKG*'s 98.1% on MetaQA Hop-1 — is consistent enough that single-agent extractors now feel like *baselines* rather than methods. The agent count varies (*KARMA*=9, *OneKE*=4, *RefKG*=3), but the structural pattern — role-specialised agents with a verification or reflection loop — is shared.

### 6.2 Hybrid Retrieval and Global Fusion

A second convergence is the **global fusion step**. *Graphusion*'s third module ("merge entities, resolve conflicts, discover new triplets across the corpus") and *KGGen*'s iterative clustering both address the same limitation of sentence-/document-level extraction: locally correct triples that are globally redundant or contradictory. Even *AutoSchemaKG* applies its conceptualization step across the corpus rather than per document. Local extraction is now everywhere paired with corpus-level reconciliation.

### 6.3 The Role of Conceptualization / Clustering

The line between *KGGen* (cluster the graph), *AutoSchemaKG* (cluster into hierarchical concepts), and *LKD-KGC* (cluster entity types via embeddings) is thinner than it appears. All three are training-free abstraction operations applied after extraction to produce denser, less redundant graphs. *DIAL-KG*'s 15% reduction in relation types and 1.6-2.8-point redundancy drop is the most explicit measurement of the compression value.

### 6.4 LLM-as-Judge Becoming Standard

Every system that reports high precision (e.g. *ODKE+*'s 98.8%, *DIAL-KG*'s >98%, *Taxonomy-Driven KGC*'s -23.3% hallucinations) implements **a second LLM call that judges the first**. *ODKE+* names its Grounder explicitly; *Taxonomy-Driven KGC* calls it RAG validation; *KARMA* assigns it to a Conflict Resolution agent; *RefKG* assigns it to Knowledge Reconstruction. The pattern is universal enough that "judge-then-commit" has become a default.

### 6.5 Tension Between Flexibility and Precision

The survey paper (*Bian, 2025*) frames the field along the **schema-based vs. schema-free** axis, and the empirical results confirm the trade-off. Schema-free systems (*AutoSchemaKG*, *KGGen*, *LKD-KGC*) score on coverage, novelty, and downstream QA; schema-based systems (*ODKE+*, *RelPrior*, *Taxonomy-Driven KGC*) score on precision, type consistency, and production-deployability. The interesting hybrid attempts are *DIAL-KG* (dual-track — static schema-based facts vs. event-based dynamic schema induction) and *iText2KG* (blueprint as a soft schema).

### 6.6 Temporality is the New Frontier

*ATOM* (EACL 2026 Findings), *DIAL-KG* (2026 arXiv), *EMERGE* (2025 arXiv), and *ODKE+* (Apple production) collectively redefine the problem: training-free KGC is no longer a one-shot extraction but a **continuous update process**. *EMERGE*'s five operations (EXISTS / ADD / MINT+ADD / INFER / DEPRECATE) and *DIAL-KG*'s soft-deprecation mechanism formalise update semantics that classical KGC ignored. The fact that *EMERGE* finds GPT-5.1 still struggling here signals that this frontier is wide open.

### 6.7 Small Models, Smart Scaffolds

A counter-narrative to the "bigger model" assumption: *LightKGG* (Phi-3.5-mini), *CascadeNER* (small cascaded LLMs), and *AutoSchemaKG* (Llama-3.1-8B at web scale) demonstrate that **smaller models with better pipelines often match larger models with naive prompting**. *VaLiK* even shows the cross-modality version: Qwen2.5-7B + MMKG matches native Qwen2.5-72B. The implication is that the field is currently engineering-bound, not capacity-bound.

---

## 7. Open Problems & Future Directions

### 7.1 Scalability to Web-Scale Corpora

*AutoSchemaKG* (50M+ documents, 5.9B edges) and *ODKE+* (9M+ Wikipedia pages) are the only papers that operate at web/production scale, and both pay engineering costs that smaller research teams cannot bear. The pure-LLM extraction cost remains the bottleneck: *KARMA*'s 9-agent pipeline is unlikely to scale to billions of documents without rearchitecting. The open question is whether **lightweight extractors (*LightKGG*) + heavyweight judges (*ODKE+* Grounder)** can be made to scale jointly.

### 7.2 Cost-Effectiveness and API Calls

No paper reports a transparent cost-per-fact metric. *LightKGG* and *CascadeNER* gesture at compute reduction but without dollar-cost comparisons. The next standard reporting unit will likely be *facts-per-dollar*; *ODKE+*'s production setting is the natural fit for such an analysis.

### 7.3 Cross-Lingual KGC

*DynamicNER* is the lone champion of multilingual evaluation (8 languages, 155 fine types). Every other paper in the survey is either English-only or language-agnostic in claim but English in evaluation. Cross-lingual entity alignment, schema induction across languages, and multilingual temporal updates are essentially untouched.

### 7.4 Dynamic and Temporal Updates

Even with *ATOM*, *DIAL-KG*, *EMERGE*, and *ODKE+*'s streaming mode, *EMERGE* shows that the current frontier on continuous update is poor: GPT-5.1 fails. Specific sub-problems still open:

- **MINT+ADD** (introducing a new relation type alongside its first instance) — schema induction *during* update, not just *before* it.
- **INFER** (deriving an unstated fact from observed text plus existing KG) — couples extraction with reasoning.
- **DEPRECATE** — requires evidence-of-absence semantics that current LLMs handle poorly outside the *DIAL-KG* soft-deprecation mechanism.

### 7.5 Evaluation Robustness

The introduction of MINE (*KGGen*), TutorQA (*Graphusion*), DynamicNER, ClimateIE, and EMERGE within a single 12-month window indicates that no consensus benchmark exists. The risk is benchmark-overfitting: each new method introduces a benchmark on which it can headline. A community priority should be **a unified, multi-domain, multi-temporal, multi-lingual KGC benchmark** that supports the three classical layers (extraction, fusion, update) plus the new fifth operation set from EMERGE.

### 7.6 Trustworthy KGs

Several papers report hallucination reductions or conflict resolutions (*KARMA* -18.6%, *Taxonomy-Driven KGC* -23.3%, *DIAL-KG* >98% deprecation precision), but no system reports **calibrated confidence** on individual triples. The *ODKE+* Corroborator hints at this with ranking, but consumer-grade KGs (Wikidata replacement, biomedical KGs feeding downstream pipelines) will need explicit per-triple uncertainty.

### 7.7 Multi-Modal Beyond Image+Text

*VaLiK* (image+text) and *mtKG-LLM* (video+text) are early multimodal exemplars. Audio, code, tabular, and time-series modalities remain absent from training-free KGC, despite being highly relevant for industrial deployments.

### 7.8 Coupling KG Construction to Downstream Reasoning

*AutoSchemaKG* + *HippoRAG2*, *Graphusion* + TutorQA, *RefKG* on MetaQA, *VaLiK* + LLM reasoning — the field is increasingly evaluating KGs through downstream LLM-reasoning tasks rather than intrinsic graph metrics. This is healthy (KGs are means, not ends) but creates a coupling risk: a KG that is good for HippoRAG2 may not be good for symbolic SPARQL queries. The field has not yet developed evaluation suites that disentangle these uses.

---

## 8. Paper Index

| # | Title (short) | Venue | One-line takeaway |
|---|---|---|---|
| 1 | *AutoSchemaKG* | arXiv 2025 (HKUST-KnowComp) | Schema-free, web-scale KGC via conceptualization; 5.9B edges, 92-95% schema alignment with humans. |
| 2 | *KGGen* | NeurIPS 2025 | Iterative LLM-driven clustering of entities/edges; +18 / +36 pts on the new MINE benchmark over GraphRAG / OpenIE. |
| 3 | *KARMA* | NeurIPS 2025 Spotlight | 9 cooperating LLM agents for biomedical KG enrichment; 38,230 new entities, 83.1% verified, -18.6% conflicts. |
| 4 | *OneKE* | WWW 2025 Demo | Dockerised, schema-guided, agent-based IE system with reflection and case retrieval; NER/RE/EE/triples in one platform. |
| 5 | *VaLiK* | ICCV 2025 | Annotation-free MMKG via VLM Chain-of-Expert + cross-modal similarity verification; Qwen2.5-7B + VaLiK matches Qwen2.5-72B. |
| 6 | *Graphusion* | WWW 2025 Workshop | Three-step zero-shot scientific KGC with global fusion; +10% over supervised link prediction, +9.2% sub-graph completion on TutorQA. |
| 7 | *Taxonomy-Driven KGC* | ACL 2025 Findings | Domain taxonomy + RAG validation for climate science; -23.3% hallucinations, +13.9% F1. |
| 8 | *DIAL-KG* | arXiv 2026 | Closed-loop dual-track (static + event) schema evolution with soft deprecation; +4.7 F1, >98% deprecation precision. |
| 9 | *ATOM* | EACL 2026 Findings / arXiv | Atomic fact decomposition + parallel merge for dynamic TKG; +18% exhaustivity, -93.8%/-95.3% latency vs. Graphiti / iText2KG. |
| 10 | *EMERGE* | arXiv 2025 | Benchmark of 233K passages and 1.45M KG edits across 7 Wikidata snapshots (2019-2025); even GPT-5.1 performs poorly. |
| 11 | *ODKE+* | arXiv 2025 (Apple ML Research) | Production pipeline with dynamic ontology-snippet prompting; 19M facts at 98.8% precision over 9M+ Wikipedia pages. |
| 12 | *LightKGG* | arXiv 2025 | SLM-based KGC using Phi-3.5-mini + context-integrated graph extraction + topology-based inference; matches LLM baselines at low cost. |
| 13 | *mtKG-LLM* (Synergizing MMTKG+LLM) | EMNLP 2025 | Per-scene spatial KGs linked temporally for video social-relation recognition; SOTA on MovieGraphs and ViSR. |
| 14 | *LKD-KGC* | arXiv 2025 (toward EDBT 2026) | Document-dependency-aware autoregressive schema generation + embedding-based merging; +10-20% precision/recall over SOTA. |
| 15 | *DynamicNER / CascadeNER* | EMNLP 2025 | First LLM-era NER dataset with 8 languages, 155 fine types; CascadeNER beats larger single-stage LLMs using two small cascaded LLMs. |
| 16 | *LLM-empowered KGC: A Survey* | arXiv 2025 (Bian) | Organises the field along the schema-based vs. schema-free axis across ontology engineering / extraction / fusion layers. |
| 17 | *RelPrior* | arXiv 2025 | DocRE reframed as binary correlation + constrained match; +2.06% dev / +2.38% test F1 over AutoRE_LLaMA3-8B. |
| 18 | *Chain of Knowledge Graph (CoKG)* | COLING 2025 Workshop | KG-quality-gated chain-of-thought for noisy multi-document summarisation; robust to noise vs. CoD / CoE prompts. |
| 19 | *iText2KG* | WISE 2024 | Plug-and-play zero-shot incremental KGC with blueprint-conditioned document distillation; standard baseline for 2025 work. |
| 20 | *RefKG* | ACL 2025 Findings | Reflective KG reasoning (Query Decoupling + Evidence Subgraph + Inference w/ Knowledge Reconstruction); 98.1% on MetaQA Hop-1. |

---

## 9. Closing Synthesis

The 2025-2026 training-free KGC field is converging on a recognisable architectural template: **LLM-driven extraction → corpus-level clustering / fusion → LLM-as-judge validation → optional schema induction / evolution**. Within this template, the most impactful design decisions are (a) whether to induce schema or consume it, (b) how many specialised agents to deploy and how they verify each other, (c) whether the pipeline is one-shot or streaming, and (d) whether the model is small-with-scaffolding or large-with-prompting.

The strongest single bet across the 20 papers is that **structure beats scale**: *LightKGG* with Phi-3.5-mini, *AutoSchemaKG* with Llama-3.1-8B at web scale, *VaLiK* with Qwen2.5-7B matching Qwen2.5-72B, and *CascadeNER* with cascaded small LLMs all evidence that well-designed training-free pipelines unlock capability without weight updates and without proprietary models. *EMERGE*'s GPT-5.1 result is the necessary counterpoint: even with the largest models, the *temporal-update* axis of KGC is wide open. The field's natural next chapter is **continuous, multilingual, multimodal, agentic KGC** with calibrated trust — and on every one of those axes, training-free methods now plausibly lead supervised ones.

---

*Source summaries: `/home/user/SimpleUber/research/summaries/kg_construction/training_free_summaries.md`. All paper titles, venues, and reported numbers in this synthesis are drawn from that file.*
