# Training-Free Graph-Based Memory for LLMs and Agents (2025-2026): A Deep Research Report

*Synthesis of 22 papers from NeurIPS, ICLR, ICML, ACL, EMNLP, IJCAI, EACL, ECAI, WWW 2025/2026 and high-impact arXiv preprints*

---

## 1. Executive Summary

The 2025-2026 publication cycle marks a clear inflection point for LLM-agent memory research: **training-free, graph-structured memory systems have effectively displaced flat vector stores and summarization buffers as the default architecture for long-term agent memory.** Across 22 papers surveyed from top venues (NeurIPS, ICLR, ICML, ACL, EMNLP, IJCAI, EACL, ECAI, WWW) and influential preprints, three structural trends dominate: (i) **temporal knowledge graphs** that preserve bi-temporal validity and operator-specific reasoning (*Zep*, *MemoTime*, *TReMu*); (ii) **hierarchical / multi-tier memory** systems that mirror operating-system or cognitive-science memory layering (*MemoryOS*, *H-MEM*, *G-Memory*, *HiAgent*, *MIRIX*, *Nemori*); and (iii) **production-grade memory pipelines** that explicitly trade graph richness for retrieval cost (*Mem0/Mem0g*, *LiCoMemory*, *MAGMA*).

The headline empirical finding is that graph-structured memory consistently outperforms RAG and flat vector memory on **multi-hop and temporal questions**, often by very large margins — for example, *A-MEM* reaches ROUGE-L 44.27 on LoCoMo multi-hop vs 18.09 for the original LoCoMo method (>2x); *MemoTime* raises Qwen3-32B from 1.3% to 61.4% on MultiTQ; *MAGMA* reports 18.6-45.5% relative gains on LoCoMo over recent baselines; *MemoryOS* delivers +49% F1 over LoCoMo memory baselines; and *Mem0* cuts p95 latency by ~91% while exceeding OpenAI Memory by 26% on LoCoMo's LLM-as-Judge score. LongMemEval and LoCoMo have crystallized as the de facto evaluation benchmarks, while *MIRIX* and *G-Memory* extend the frontier to multimodal and multi-agent settings respectively. Critically, **none of these systems require additional training** — they rely on LLM-driven extraction, graph construction, and retrieval orchestrated at inference time.

A second cross-cutting theme is the migration from monolithic representations toward **typed, decoupled graphs.** *MAGMA* maintains four orthogonal graphs (semantic, temporal, causal, entity); *LiCoMemory's* CogniGraph uses entities/relations purely as a *semantic indexing layer* linking back to original text; *MIRIX* shards memory into six cognitively-motivated types (Core, Episodic, Semantic, Procedural, Resource, Knowledge Vault). The field appears to be converging on a design ethos: keep graph nodes lightweight and structural, push content to external stores, and make retrieval policy-driven and operator-aware. This contrasts sharply with 2023-2024 systems (MemGPT, MemoryBank, ReadAgent) which are now the standard baselines that virtually every 2025 paper beats by double-digit margins.

---

## 2. Taxonomy of Approaches

The 22 surveyed papers cluster naturally into eight sub-categories. Several papers belong to multiple categories — for example *Zep* is both temporal-KG and production-grade — and we note such overlaps below.

### 2.1 Temporal Knowledge Graph Memory

These systems make time a first-class citizen, either through bi-temporal edges, timeline summarization, or operator-aware retrieval.

- ***Zep*** (arXiv 2501.13956): Bi-temporal KG (event-validity + database-validity timestamps) via the Graphiti engine; hybrid retrieval (semantic + BM25 + traversal).
- ***MemoTime*** (WWW 2026 / ICLR 2026): "Tree of Time" hierarchical question decomposition with monotonic timestamp enforcement, plus operator-specific retrieval strategies and a self-evolving experience memory of verified reasoning traces.
- ***TReMu*** (Findings of ACL 2025): Time-aware session summarization paired with neuro-symbolic temporal reasoning — the LLM emits Python code that performs date arithmetic, removing a major LLM failure mode.

**Shared technique**: explicit temporal anchoring of memory items (timestamps, intervals, or inferred dates) plus retrieval/reasoning machinery that respects ordering and arithmetic.

### 2.2 Hierarchical / Multi-Level Memory

The largest cluster. Each system divides memory into 2-6 levels that mirror either cognitive-science distinctions or OS-style memory hierarchies.

- ***HiAgent*** (ACL 2025): Two-level working memory — subgoal chunks above raw action-observation pairs.
- ***H-MEM*** (arXiv / EACL 2026): Memory vectors carry positional indices into child sub-memories, enabling sub-linear index-routed retrieval.
- ***MemoryOS*** (EMNLP 2025 Oral): Four-module, three-tier system (short / mid / long-term) with FIFO dialog-chain updates and segmented "paging" between tiers.
- ***G-Memory*** (NeurIPS 2025 Spotlight): Three-tier graph hierarchy for multi-agent systems — Insight Graph (cross-trial), Query Graph (meta), Interaction Graph (fine-grained).
- ***MIRIX*** (arXiv 2507.07957): Six memory types coordinated by specialized agents; supports multimodal (screenshot) memory.
- ***GraphMind / HP-KG*** (NeurIPS 2025): Hierarchical procedural KG (task / step / action) for robotic manipulation planning.

**Shared technique**: explicit layering so retrieval can short-circuit by routing through coarse levels first.

### 2.3 Episodic + Semantic Memory Fusion

These papers explicitly combine entity-relation semantic graphs with episode-level temporal anchors, reflecting the cognitive-science distinction.

- ***AriGraph*** (IJCAI 2025): Fused semantic KG (entity-relation triplets) and episodic vertices anchoring episodes in time; used as a world model for text-game agents.
- ***A-MEM*** (NeurIPS 2025): Zettelkasten-style note network where each new memory triggers LLM-driven analysis to link/update related historical notes ("memory evolution").
- ***Nemori*** (arXiv 2508.03341): Event Segmentation Theory + Free-Energy Principle — autonomous boundary detection between episodes, prediction-error-driven memory updates.
- ***MemInsight*** (EMNLP 2025): LLM-generated structured "insight" attributes annotate each interaction, forming a semantic index over episodic history.

**Shared technique**: pair semantic structure (entities, relations, attributes) with episode/event boundaries, and let the LLM perform organization rather than fixed rules.

### 2.4 Production-Grade Scalable Memory

These systems optimize aggressively for token cost, latency, and operational deployability.

- ***Mem0 / Mem0g*** (arXiv 2504.19413 / ECAI 2025): Two-stage extract/update pipeline; optional graph view; 91% p95 latency reduction and >90% token reduction vs full-context.
- ***Zep***: Hybrid retrieval and incremental ingestion designed for enterprise; ~90% latency cut vs full conversation.
- ***LiCoMemory*** (arXiv 2511.01448): CogniGraph as a lightweight indexing scaffold (entities/relations link back to text rather than storing content), temporal/hierarchy-aware search, integrated reranking; lowest query latency among compared agentic-memory baselines.

**Shared technique**: minimize the LLM's role in the hot retrieval path; push semantic work into asynchronous write-time updates; treat the graph as a sparse index rather than a content store.

### 2.5 Sentence / Event Graph Memory

A narrower cluster focused on preserving granularity *below* the entity-relation level while still imposing graph structure.

- ***SGMem*** (arXiv 2509.21212): Sentence-level graphs within chunked units capturing turn-, round-, and session-level associations; multi-hop retrieval over the sentence graph fused with generated semantic memory.
- ***MemoTime*** (also in §2.1): Tree-of-Time decomposition is effectively an event-level graph at the question side.

**Shared technique**: keep the basic memory unit at sentence or event granularity, then layer associations on top.

### 2.6 Cognitive-Science-Inspired Memory

A theoretical lens running through several systems.

- ***Nemori***: Event Segmentation Theory (Zacks et al.) drives episode boundaries; Free-Energy Principle drives prediction-calibrate learning.
- ***MemoryOS***: Borrows OS memory-management principles (analogous to working/long-term distinction).
- ***Associa*** (Findings of ACL 2025): Dual-process cognition — "Intuitive Association" (Prize-Collecting Steiner Tree subgraph extraction) for fast retrieval + "Deliberating Recall" (iterative query refinement) for slow deliberation.
- ***MIRIX***: Six-type memory taxonomy directly maps to cognitive psychology categories.

**Shared technique**: take a named cognitive theory as a design principle rather than relying on engineering heuristics.

### 2.7 Memory for KG Reasoning (Inverted Direction)

One paper inverts the typical relationship: instead of using a graph as memory, it uses a memory of *queries* to enable KG reasoning.

- ***MemQ*** (Findings of ACL 2025): Decouples reasoning from tool use by storing natural-language descriptions of SPARQL/relation chains; the LLM reasons in natural language and reconstructs executable queries via memory retrieval, eliminating tool-call hallucination.

### 2.8 Benchmarks and Surveys

Foundational works that shape evaluation and provide field overviews.

- ***LongMemEval*** (ICLR 2025): 500 questions × 5 abilities (info extraction, multi-session reasoning, temporal, knowledge updates, abstention); also proposes a three-stage memory framework (indexing/retrieval/reading) with concrete optimizations.
- ***MemBench*** (Findings of ACL 2025): First benchmark to distinguish factual vs reflective memory and combine accuracy + efficiency + capacity metrics across participation/observation scenarios.
- ***Graph-Augmented LLM Agents: Current Progress and Future Prospects*** (arXiv 2507.21407): First integrative survey of GLA methods across planning, memory, and tool use.

### 2.9 Multi-Agent and Embodied Memory

Two papers extend graph memory beyond single-agent text settings.

- ***G-Memory***: Hierarchical memory for multi-agent collaboration trajectories; plug-and-play with AutoGen, MetaGPT, etc.
- ***GraphMind / HP-KG***: Hierarchical procedural KG for robotic manipulation in partially observable environments.

---

## 3. Architectural Patterns

### 3.1 Graph Representations

| Representation | Papers | Defining Property |
|---|---|---|
| Entity-relation KG | *AriGraph*, *Zep*, *Mem0g*, *MemQ*, *LiCoMemory* | Triplets over named entities |
| Temporal / bi-temporal KG | *Zep*, *MemoTime*, *TReMu* | Edges carry timestamps or validity intervals |
| Note network (Zettelkasten) | *A-MEM* | Free-form notes with LLM-generated tags and links |
| Sentence / chunk graph | *SGMem* | Sub-entity granularity preserved |
| Episode / event graph | *AriGraph*, *Nemori*, *MemoTime* | Vertices anchor episodes in time |
| Hierarchical / tiered graph | *G-Memory*, *MemoryOS*, *H-MEM*, *HiAgent*, *MIRIX*, *GraphMind* | Explicit parent-child indexing |
| Multi-graph (orthogonal views) | *MAGMA* | Four typed graphs queried independently |
| Insight / attribute graph | *MemInsight* | LLM-generated structured attributes |
| Procedural KG | *GraphMind* | Task / step / action hierarchy |

The trend toward typed and tiered structures is unmistakable: of the 22 papers, **at least 12 employ some form of hierarchy or typing**, compared to a small minority in pre-2025 work.

### 3.2 Memory Write Strategies

Three patterns dominate:

1. **Incremental online updates.** *Zep*, *Mem0*, *LiCoMemory*, *AriGraph*, *G-Memory*, *MIRIX* all ingest new observations on the fly and update the graph without batch reprocessing.
2. **Consolidation / reflection.** *A-MEM*'s "memory evolution" actively rewrites historical notes when new ones are linked; *Nemori*'s Predict-Calibrate Principle uses prediction errors to refine memory; *MemoryOS* migrates short-term memories upward when they survive FIFO eviction.
3. **Boundary detection and chunking.** *Nemori*'s Two-Step Alignment finds semantically coherent episode boundaries; *HiAgent* uses subgoal completion as a natural boundary; *SGMem* uses turn/round/session chunking. This is a step beyond uniform fixed-size chunking.

A subtle insight from *LiCoMemory* and *MAGMA*: **content storage is increasingly decoupled from graph storage.** Graphs become structural scaffolds; full text and rich attributes live elsewhere. This minimizes the LLM tokens needed to traverse the graph at retrieval time.

### 3.3 Memory Retrieval

Retrieval has diversified well beyond cosine similarity:

- **Similarity-based / hybrid**: *Zep* (semantic + BM25 + traversal), *Mem0*, *SGMem*.
- **Graph traversal**: *AriGraph*, *G-Memory* (bi-directional), *MAGMA* (policy-guided across four graphs).
- **Path-based / multi-hop**: *A-MEM*, *H-MEM* (index-routed), *MemoTime* (Tree of Time recursive walking).
- **Subgraph optimization**: *Associa* solves a Prize-Collecting Steiner Tree problem over the memory graph to extract minimally-redundant evidence subgraphs — a genuinely novel retrieval primitive.
- **Time-aware retrieval**: *Zep*, *MemoTime*, *TReMu*, *LiCoMemory* all condition retrieval on query time and entity validity intervals.
- **Operator-aware retrieval**: *MemoTime* selects retrieval strategies based on the temporal operator (BEFORE, AFTER, BETWEEN, etc.) detected in the question.
- **Tree-of-questions decomposition**: *MemoTime*'s recursive sub-question generation with monotonic time constraints.

### 3.4 Memory Forgetting / Pruning

This dimension is *under-developed* across the cohort:

- *MemoryOS* implements FIFO eviction between short and mid tiers and segmented paging between mid and long.
- *Mem0*'s extract/update pipeline implicitly discards low-salience facts.
- *HiAgent* drops out-of-scope observations when subgoals change.
- *Nemori* allows memory revision but does not delete.

No surveyed paper proposes principled unlearning, privacy-aware forgetting, or capacity-bounded pruning. *MemBench* highlights this gap by including a capacity metric that few systems perform well on.

### 3.5 Integration with LLM Agents

Three integration modes appear:

1. **In-context memory injection** (the most common): retrieve and concatenate. Examples: *Zep*, *Mem0*, *A-MEM*, *SGMem*, *LiCoMemory*, *MAGMA*.
2. **Tool-call abstraction**: memory exposed as callable tools. Examples: *MemQ* (query reconstruction is itself a tool), *MIRIX* (specialized agents per memory type).
3. **Planner-level integration**: memory feeds a planner module rather than being injected into the response prompt. Examples: *HiAgent* (subgoal selection), *G-Memory* (Insight Graph informs MAS planning), *GraphMind* (HP-KG drives robotic action planning), *AriGraph* (graph queried during action selection).

---

## 4. Evaluation Landscape

### 4.1 Benchmarks

The de facto standard pair is **LoCoMo + LongMemEval**:

- **LoCoMo** (long-form conversational QA, five categories: single-hop, multi-hop, temporal, open-domain, adversarial) is used by *Mem0*, *A-MEM*, *MemoryOS*, *SGMem*, *H-MEM*, *Nemori*, *LiCoMemory*, *MIRIX*, *MAGMA*, *Associa*, *MemInsight* — eleven of the 22 papers.
- **LongMemEval** (500 questions targeting five memory abilities) is used by *Zep*, *SGMem*, *Nemori*, *LiCoMemory*, *MAGMA*, and the eponymous *LongMemEval* paper — six of the 22.

Other notable benchmarks:

- **DMR (Deep Memory Retrieval)** — 500-conversation MSC subset; primarily used by *Zep*.
- **MultiTQ, TimeQuestions** — temporal QA; used by *MemoTime*.
- **WebQSP, CWQ** — KGQA; used by *MemQ*.
- **MuSiQue, HotpotQA** — multi-hop QA; used by *AriGraph*.
- **TextWorld** (Treasure Hunt, Cleaning, Cooking) — embodied text games; *AriGraph*.
- **ALFWorld, ScienceWorld, TravelPlanner, WebShop, Blocksworld** — long-horizon agent tasks; *HiAgent*.
- **LLM-REDIAL** — conversational recommendation; *MemInsight*.
- **ScreenshotVQA** — multimodal screenshot QA introduced by *MIRIX*.
- **MemBench** — newly introduced multi-axis benchmark.

### 4.2 Metrics

The metric landscape is fragmenting in instructive ways:

- **Accuracy / Hit@1**: standard for QA benchmarks.
- **LLM-as-Judge ("J score")**: *Mem0* popularized this; *MAGMA* and others adopted it.
- **ROUGE-L, BLEU-1, F1**: standard for generative answers (*A-MEM*, *MemoryOS*, *H-MEM* report ROUGE-L / BLEU-1 / F1).
- **Success rate, steps required**: agent tasks (*HiAgent*, *G-Memory*, *AriGraph*, *GraphMind*).
- **Latency (p50/p95) and token cost**: increasingly reported as first-class metrics (*Mem0*, *Zep*, *MAGMA*, *LiCoMemory*, *Nemori*).
- **Capacity / efficiency / effectiveness**: *MemBench's* trinity.
- **Storage footprint**: *MIRIX* reports 99.9% storage reduction on ScreenshotVQA.

The shift toward latency/cost as primary metrics — not afterthoughts — distinguishes 2025-2026 work from earlier RAG-style memory papers.

### 4.3 Backbone LLMs

GPT-4o-mini is the most popular default, appearing in *Mem0*, *Zep*, *MemoryOS*, *SGMem*, *TReMu*, *LiCoMemory*, and others — it strikes a cost/capability balance that is appealing for memory research. Higher-end backbones (GPT-4-Turbo, GPT-4o) appear in *Zep*, *MemoTime*, *TReMu*, *AriGraph*. Open-weight models (Qwen3 4B/8B/32B/80B, LLaMA-3.1, DeepSeek-V3) appear in *MemoTime*, *A-MEM*, *H-MEM*, *LiCoMemory*. Notably, *MemoTime* explicitly demonstrates that with the right memory, **Qwen3-4B rivals GPT-4-Turbo** on temporal QA — a strong argument for memory as a *scale-equalizer*.

### 4.4 Memory-Specific Metrics

New metrics tracked include:

- **Multi-session consistency** — explicit in *LongMemEval* (multi-session reasoning category).
- **Temporal reasoning accuracy** — broken out as a separate dimension by *Zep*, *MemoTime*, *TReMu*, *LiCoMemory*, *MAGMA*.
- **Knowledge update / abstention** — *LongMemEval* and *MemBench* categories.
- **Cross-trial transfer** — *G-Memory* measures whether insights from prior trials improve new ones.

---

## 5. Empirical Findings and State-of-the-Art Patterns

### 5.1 Long-Term Memory Benchmarks (LoCoMo / LongMemEval)

A clear "best-of-2025-2026" leaderboard emerges:

| System | LoCoMo headline | LongMemEval headline |
|---|---|---|
| *MAGMA* | Judge score 0.7, +18.6-45.5% over baselines | 61.2% avg accuracy, 95% token reduction |
| *Mem0* (token-efficient update) | 91.6 J score | 93.4 |
| *MIRIX* | 85.4% accuracy (claimed SOTA) | — |
| *Nemori* | Significantly outperforms prior SOTA | Significantly outperforms prior SOTA; 88% fewer tokens than full context |
| *LiCoMemory* | Beats MemOS on all subsets, +19.2% on Temporal | +26.6% Multi-Session, +15.9% Temporal vs Mem0 |
| *A-MEM* | ROUGE-L 44.27 on multi-hop (vs LoCoMo 18.09) | — |
| *MemoryOS* | +49.11% F1, +46.18% BLEU-1 vs baselines | — |
| *H-MEM* | +14.98 F1 avg, +21.25 F1 multi-hop | — |
| *Zep* | — | +15.2-18.5% accuracy vs baseline |

**Caveat**: Different papers compare against different baseline sets and use different judge LLMs, so head-to-head comparisons should be interpreted cautiously. Nonetheless, *MAGMA*, *Mem0* (latest), and *Nemori* appear strongest on LongMemEval; *MIRIX* and *MemoryOS* report the highest absolute LoCoMo numbers among 2025 publications.

### 5.2 Temporal Reasoning

For pure temporal-QA tasks the leader is unambiguous: ***MemoTime***. On MultiTQ it raises Qwen3-32B accuracy from 1.3% to 61.4% (~46x relative gain) and reaches 77.9% Hit@1 overall on GPT-4-Turbo, beating TempAgent by 24.0 points. ***TReMu*** is the strongest dedicated multi-session temporal system, taking GPT-4o from 29.83% (standard prompting) to 77.67% — a +47.8 absolute improvement — through code-based date arithmetic. ***Zep*** and ***LiCoMemory*** lead on temporal sub-categories of LongMemEval (***LiCoMemory***: +15.9% on Temporal over *Mem0*).

### 5.3 Multi-Agent Memory

***G-Memory*** (NeurIPS 2025 Spotlight) is currently the only purpose-built multi-agent graph memory system in the cohort. It achieves up to +20.89% absolute improvement in embodied-action success and +10.12% on knowledge-QA accuracy, **without modifying the underlying MAS framework**. ***MIRIX*** also operates as a multi-agent memory orchestrator (each memory type has its own agent), but its focus is multimodal personal memory rather than collaboration trajectories.

### 5.4 Multimodal Memory

***MIRIX*** is the only system in the cohort that explicitly handles multimodal (visual) memory. On its own ScreenshotVQA benchmark it achieves +35% accuracy over a RAG baseline while reducing storage 99.9%. The dearth of multimodal memory papers is striking and represents a major open frontier.

### 5.5 Long-Horizon Agent Tasks

***HiAgent*** roughly doubles success rates on long-horizon agent tasks (42% vs 21% on standard ReAct), reaches 87.2/90.3% on ALFWorld seen/unseen and 83.3% on TravelPlanner, while cutting context by 35% and runtime by 19%. ***AriGraph*** matches or exceeds top human players on most TextWorld tasks, reaching normalized score 1.0 on Treasure Hunt, Cooking, Treasure Hunt Hard, and Cooking Hard — while the best non-graph baseline tops out at 0.52 and falls below 0.21 on hard variants. ***GraphMind / HP-KG*** demonstrates that hierarchical procedural KGs let smaller LLMs handle complex robotic manipulation.

### 5.6 Cost and Latency

A previously under-reported axis is now front and center:

- ***Mem0***: 91% p95 latency reduction, >90% token cost reduction vs full-context.
- ***Zep***: ~90% latency cut vs full-conversation context.
- ***Nemori***: 88% fewer tokens than full-context baseline while exceeding it on accuracy.
- ***A-MEM***: 1,200-2,500 tokens per operation vs ~16,900 for LoCoMo's baseline (85-93% reduction).
- ***MAGMA***: 1.47s query latency, ~40% faster than next-best baseline; 95% token reduction.
- ***LiCoMemory***: lowest or near-lowest query latency among compared agentic-memory baselines.
- ***MIRIX***: 99.9% storage reduction on multimodal data.

The convergence on >85% reductions in tokens/latency across independent systems suggests these are not cherry-picked headlines but structural consequences of replacing full-context concatenation with retrieved subgraphs.

### 5.7 Benchmark Saturation

*LongMemEval*'s own framing observation — that **commercial chat assistants and long-context LLMs lose 30-60% accuracy** moving from offline reading to interactive memory settings — has now been substantially mitigated. With *Mem0*'s reported 93.4 on LongMemEval (April 2026 update) and *MAGMA*'s 61.2% with 95% token reduction, the benchmark may be approaching saturation, motivating *MemBench*'s effort to introduce capacity and efficiency dimensions where no system dominates.

---

## 6. Cross-Paper Insights

### 6.1 KG-Based Memory Consistently Wins on Multi-Hop and Temporal Queries

Across at least seven independent comparisons (*Zep* vs MemGPT; *A-MEM* vs LoCoMo; *Mem0g* vs *Mem0*; *AriGraph* vs Summary/RAG; *MAGMA* vs Mem0/A-MEM/MemOS; *LiCoMemory* vs MemOS/Mem0; *H-MEM* vs MemGPT/MemoryBank/ReadAgent), graph-structured memory yields its largest gains specifically on **multi-hop and temporal** sub-categories — exactly the cases where flat vector retrieval struggles to chain evidence. The most striking example is *A-MEM*'s >2x ROUGE-L gain on multi-hop relative to the baseline. *LongMemEval's* own framework recovers up to +10 points on retrieval/answer accuracy with structural optimizations (round granularity, fact-augmented keys).

### 6.2 Hierarchical Memory Is Becoming Standard

12 of 22 papers employ explicit hierarchy or typing: *MemoryOS*, *H-MEM*, *G-Memory*, *HiAgent*, *MIRIX*, *MAGMA*, *LiCoMemory*, *GraphMind*, *AriGraph* (semantic/episodic split), *MemoTime* (Tree of Time), *Nemori* (event boundaries imply chunking), *SGMem* (turn/round/session). The 2024 paradigm of one big graph or one big vector store appears effectively obsolete.

### 6.3 Cognitive-Science Inspiration

A surprising number of papers explicitly invoke cognitive theory:

- *Nemori*: Event Segmentation Theory (Zacks et al.) + Free-Energy Principle (Friston).
- *Associa*: Dual-process cognition (Kahneman's System 1 / System 2).
- *MIRIX*: Six memory types from cognitive psychology (episodic, semantic, procedural).
- *MemoryOS*: OS memory hierarchy, which itself echoes working/long-term distinction.
- *H-MEM*, *HiAgent*: Hierarchical / working memory.

This bridges what was historically a quite engineering-driven field with theory-grounded design.

### 6.4 Reflection, Self-Update, and Re-Organization

Several systems include explicit mechanisms by which the memory revises *itself*:

- *A-MEM* triggers updates to existing notes when new ones are added.
- *Nemori* uses prediction errors to revise memory.
- *MemoTime* maintains a self-evolving experience memory of verified reasoning traces.
- *Mem0*'s two-stage extract/update pipeline includes consolidation.
- *Associa*'s Deliberating Recall iteratively refines its own query.

The pattern: memory is no longer write-once; it co-evolves with new evidence.

### 6.5 Trade-Off: Graph Richness vs Retrieval Cost

A core tension emerges. Richer graphs (*Mem0g*, *AriGraph*, *MAGMA*'s four-graph design) provide better reasoning but at higher write-time cost. Lightweight scaffolds (*LiCoMemory*'s CogniGraph, *Mem0* without the graph view) optimize retrieval latency. *Mem0g* adds only ~2% over *Mem0* on LoCoMo's J metric — a small absolute gain that may not justify the graph-construction cost in some production settings. *MAGMA* and *LiCoMemory* attempt to resolve this by separating *structural* graphs (sparse, fast) from *content* stores.

### 6.6 Commercial Viability

*Mem0* (now also adopted as an open-source platform), *Zep* (a commercial memory service), and increasingly *LiCoMemory* and *MIRIX* signal that training-free graph memory has crossed into production. The presence of OpenAI Memory and LangMem as baselines in *Mem0*'s evaluation further confirms a competitive commercial landscape.

### 6.7 Convergent Token / Latency Reductions

The independent observation across many systems that good memory systems achieve >85% reductions in tokens versus full-context — without sacrificing accuracy — implies a *structural* result: most of what full-context LLMs are reading on long histories is redundant from a reasoning standpoint.

### 6.8 Operator and Time as First-Class Citizens

*MemoTime*'s operator-aware retrieval is novel and seems likely to be widely adopted. The recognition that "When did X happen?" and "What happened between X and Y?" require fundamentally different retrieval policies — not merely different prompts — is a substantive insight.

---

## 7. Open Problems and Future Directions

### 7.1 Memory Consolidation at Scale

Most papers evaluate on conversations of 10-50 sessions (*LoCoMo*) or up to ~100K-token contexts (*Nemori*, *MAGMA*). Behavior at millions of memories — true lifelong settings — is largely untested. *Mem0*'s production-scale stories are anecdotal at this point; rigorous benchmarks at 10^6+ memory items would be valuable.

### 7.2 Forgetting and Unlearning

The asymmetry is stark: all systems can write, only a few can *delete*. Selective unlearning for privacy compliance, contradictory-fact updating, and obsolescence-driven pruning are essentially unaddressed. *MemoryOS*'s FIFO is the most explicit deletion mechanism in the cohort, yet it does not consider semantic salience.

### 7.3 Cross-Session Privacy

Multi-user memory (e.g., a personal assistant serving one user but sharing infrastructure) raises questions about data leakage between memory partitions. None of the 22 papers address differential privacy, membership inference, or memory isolation in adversarial settings.

### 7.4 Multimodal Memory

*MIRIX* is alone in handling images. There is no surveyed system that integrates audio, video, structured tables, or sensor streams. Given the rise of multimodal agents, this is one of the largest gaps.

### 7.5 Evaluation Gaps

*MemBench* documents that **no existing system dominates on all three of effectiveness, efficiency, and capacity** simultaneously. Beyond this, current benchmarks are biased toward English text, single-user single-session-stitched dialogues, and reasoning-heavy QA. Embodied + long-term hybrid benchmarks (combining *HiAgent*-style action tasks with *LongMemEval*-style memory questions) do not yet exist.

### 7.6 Training-Free vs RL-Trained Memory Managers

This survey is restricted to training-free systems. A parallel line of work (Memory-R1, Mem-α) trains the memory manager itself via RL. Headline question: **how do training-free vs trained memory managers compare at equivalent inference cost?** Current evidence suggests training-free systems are competitive on LongMemEval/LoCoMo, but rigorous head-to-head comparisons are scarce.

### 7.7 Standardization of Graph Schemas

The 22 papers use 22 different graph schemas. Even within sub-categories (e.g., temporal KGs), *Zep*'s bi-temporal edges, *MemoTime*'s Tree of Time, and *TReMu*'s timeline summaries differ substantially. A standard schema or interchange format would aid reproducibility and modular comparison.

### 7.8 Integration with Tool Use and Planning

While many systems integrate memory with planning (*HiAgent*, *AriGraph*, *G-Memory*, *GraphMind*), the interaction between memory and tool use remains under-explored. *MemQ* is one of the few works directly addressing this: by storing tool-call templates as memory, it eliminates tool-call hallucinations. Generalizing this principle to broader tool-using agents is a clear next step.

### 7.9 Causal Memory

*MAGMA*'s causal graph is the only explicit causal-relation memory in the cohort. Given the importance of causal reasoning for planning and counterfactual QA, this is likely to be a growth area.

### 7.10 Re-Examining "Training-Free"

The cohort's strict definition of training-free covers retrieval, indexing, and graph construction without parameter updates — but most systems still rely heavily on LLM-driven extraction and reflection at inference time, which is its own kind of computational cost. *Nemori* and *Mem0* both push toward reducing the LLM's role in the write path; *LiCoMemory* pushes toward reducing it in the read path. Quantifying the *total* LLM call cost across the system lifecycle — not just at retrieval — would be a more honest comparison.

---

## 8. Paper Index

| # | Title | Venue (Year) | One-Line Takeaway |
|---|---|---|---|
| 1 | *Zep: A Temporal Knowledge Graph Architecture for Agent Memory* | arXiv 2025 | Bi-temporal KG via Graphiti beats MemGPT on DMR and yields +15-18% on LongMemEval at ~90% lower latency. |
| 2 | *Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory* | arXiv / ECAI 2025 | Production extract/update pipeline (optionally with graph view) achieves 26% J-score gain over OpenAI Memory and 91% p95 latency cut. |
| 3 | *A-MEM: Agentic Memory for LLM Agents* | NeurIPS 2025 | Zettelkasten note network with "memory evolution"; >2x ROUGE-L on LoCoMo multi-hop with 85-93% fewer tokens. |
| 4 | *AriGraph: Learning Knowledge Graph World Models with Episodic Memory for LLM Agents* | IJCAI 2025 | Fused semantic + episodic graph world model matches top human players on TextWorld. |
| 5 | *G-Memory: Tracing Hierarchical Memory for Multi-Agent Systems* | NeurIPS 2025 (Spotlight) | Three-tier (Insight / Query / Interaction) graph hierarchy boosts MAS success by up to +20.89% without framework changes. |
| 6 | *MemoTime: Memory-Augmented Temporal Knowledge Graph Enhanced LLM Reasoning* | WWW 2026 / ICLR 2026 | Tree of Time + operator-aware retrieval + experience memory; raises Qwen3-32B from 1.3% to 61.4% on MultiTQ. |
| 7 | *TReMu: Neuro-Symbolic Temporal Reasoning for LLM Agents with Memory in Multi-Session Dialogues* | Findings of ACL 2025 | Time-aware summarization + Python date arithmetic doubles GPT-4o accuracy on a new multi-session temporal benchmark. |
| 8 | *Associa: Bridging Intuitive Associations and Deliberate Recall* | Findings of ACL 2025 | Prize-Collecting Steiner Tree subgraph extraction + deliberate query refinement; dual-process cognition for long-term dialogue memory. |
| 9 | *MemInsight: Autonomous Memory Augmentation for LLM Agents* | EMNLP 2025 | LLM-generated structured "insight" attributes give +34% recall on LoCoMo, +14% recommendation persuasiveness. |
| 10 | *MemQ: Memory-augmented Query Reconstruction for LLM-based KG Reasoning* | Findings of ACL 2025 | Stores natural-language descriptions of SPARQL queries to decouple reasoning from tool use; new SOTA on WebQSP/CWQ. |
| 11 | *Memory OS of AI Agent* | EMNLP 2025 (Oral) | Four-module, three-tier OS-style memory with FIFO + paging; +49.11% F1 over baselines on LoCoMo. |
| 12 | *SGMem: Sentence Graph Memory for Long-Term Conversational Agents* | arXiv 2025 | Sentence-level graphs within chunks at turn/round/session scope; consistently beats strong baselines on LongMemEval and LoCoMo. |
| 13 | *HiAgent: Hierarchical Working Memory Management for Long-Horizon Agent Tasks* | ACL 2025 | Subgoal-chunked working memory roughly doubles long-horizon success rates and cuts steps/context/runtime. |
| 14 | *LongMemEval: Benchmarking Chat Assistants on Long-Term Interactive Memory* | ICLR 2025 | 500-question benchmark across 5 memory abilities + a three-stage indexing/retrieval/reading framework. |
| 15 | *MIRIX: Multi-Agent Memory System for LLM-Based Agents* | arXiv 2025 | Six memory types managed by specialized agents; handles multimodal screenshots; 85.4% on LoCoMo and +35% over RAG on ScreenshotVQA with 99.9% storage savings. |
| 16 | *H-MEM: Hierarchical Memory for High-Efficiency Long-Term Reasoning* | arXiv / EACL 2026 | Index-routed layered memory enables sub-linear retrieval; +14.98 F1 average on LoCoMo. |
| 17 | *Nemori: Self-Organizing Agent Memory Inspired by Cognitive Science* | arXiv 2025 | Event Segmentation + Free-Energy principles for autonomous episode boundaries and prediction-error updates; beats full-context with 88% fewer tokens. |
| 18 | *LiCoMemory: Lightweight and Cognitive Agentic Memory for Efficient Long-Term Reasoning* | arXiv 2025 | CogniGraph as lightweight semantic scaffold (graph indexes back to text); +19.2% Temporal on LoCoMo, lowest latency. |
| 19 | *MemBench: Towards More Comprehensive Evaluation on the Memory of LLM-based Agents* | Findings of ACL 2025 | First benchmark to combine factual + reflective memory levels with effectiveness/efficiency/capacity metrics; no system dominates all axes. |
| 20 | *MAGMA: A Multi-Graph based Agentic Memory Architecture for AI Agents* | arXiv 2026 | Four orthogonal graphs (semantic, temporal, causal, entity) with policy-guided traversal; SOTA on LoCoMo and LongMemEval with 95% token reduction. |
| 21 | *Graph-Augmented Large Language Model Agents: Current Progress and Future Prospects* | arXiv 2025 | Survey of graph-augmented LLM agents across planning, memory, and tool use; first integrative GLA overview. |
| 22 | *GraphMind / HP-KG: Enhancing LLM Planning for Robotics Manipulation through Hierarchical Procedural KGs* | NeurIPS 2025 | Incrementally built procedural KG (task / step / action) enables smaller LLMs to handle complex robotic manipulation in partially observable settings. |

---

## 9. Concluding Synthesis

The 2025-2026 graph-memory landscape resolves into a clear narrative: **training-free graph memory is mature, plural, and competitive with — sometimes vastly superior to — both flat vector RAG and long-context LLMs**, while costing 85-95% fewer tokens at p95 latencies cut by similar margins. The center of gravity has moved from "does the graph help?" (answered yes by *AriGraph*, *Zep*, *A-MEM*) to "what *kind* of graph structure best matches the agent's task profile?" Temporal-heavy tasks favor bi-temporal KGs (*Zep*) or operator-aware tree decompositions (*MemoTime*); multi-hop reasoning favors note networks (*A-MEM*) or multi-graph designs (*MAGMA*); long-horizon embodied agents favor subgoal hierarchies (*HiAgent*) or procedural KGs (*GraphMind*); multi-agent systems favor tiered collaboration memory (*G-Memory*); production deployments favor lightweight indexing scaffolds (*LiCoMemory*, *Mem0*).

The most exciting research frontiers are: (i) **multimodal memory** beyond *MIRIX*'s screenshots; (ii) **principled forgetting and unlearning**; (iii) **lifelong scale** beyond the 10^4-item range; (iv) **causal memory** beyond *MAGMA*'s causal graph; (v) **rigorous head-to-head comparison with RL-trained memory managers**; and (vi) **standardized schemas** that would let the field finally do apples-to-apples comparisons. With *LongMemEval* and *MemBench* now widely adopted and *LoCoMo* a fixture, the evaluation infrastructure is largely in place — what remains is a more systematic methodological maturation of the field.

---
