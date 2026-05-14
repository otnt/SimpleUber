# Training-Free Knowledge Graph Agents: A 2025-2026 Deep Research Report

## 1. Executive Summary

The 2024-2026 wave of top-conference research on knowledge-graph (KG) agents has produced a strikingly coherent paradigm shift: instead of fine-tuning LLMs to consume graph data, researchers are increasingly treating the LLM as a frozen *agent* that plans, traverses, observes, and self-corrects over a KG. Across nine representative papers from ICLR 2025, WWW 2025, ACL Findings 2024/2025, NeurIPS 2024, CIKM 2025, and recent arXiv preprints, every system is training-free with respect to the backbone LLM. What unifies them is the framing of KG reasoning as a sequential decision problem in which graph operations - expansion, pruning, retrieval, super-relation abstraction, sub-agent traversal - are agent actions and the LLM serves as both controller and semantic evaluator.

Five dominant themes emerge. First, **graph traversal is now treated as an agent's action space** (*ReKnoS*, *Paths-over-Graph*, *Plan-on-Graph*, *ReKG-MCTS*). Second, **classical search algorithms - MCTS in particular - have re-entered the LLM agent stack** (*ReKG-MCTS*, *RuAG*). Third, **self-correction and reflection loops** are becoming standard, replacing fixed-breadth or one-shot exploration (*Plan-on-Graph*, *ODA*). Fourth, **multi-agent specialization around a shared KG** is emerging as a credible interaction substrate for end users (*AGENTiGraph*). Finally, **the KG-as-tool-index pattern** is colonizing adjacent problems: tool/agent retrieval and emerging-entity KG completion now use the same training-free graph-traversal recipe (*Agent-as-a-Graph*, *AgREE*).

Headline empirical findings: *Paths-over-Graph* beats *Think-on-Graph* (ToG) by an average of 18.9% across five KGQA benchmarks, and PoG with GPT-3.5 surpasses ToG with GPT-4 by up to 23.9%. *Plan-on-Graph* matches or exceeds fine-tuned KG-augmented baselines while making >=40.8% fewer LLM calls than ToG and achieving a >4x speedup on CWQ/GrailQA. *ReKnoS* delivers an average 2.92% Hits@1 lift through super-relation abstraction. *ODA* obtains a 65.50% improvement on Zero-Shot RE over prior prompt-based baselines. *AgREE* posts up to 45.3% gains on emerging entities. Together these results suggest that, for KGQA and KG-grounded reasoning, **agentic structure now matters more than model scale**.

## 2. Taxonomy of Approaches

The nine papers cluster cleanly into five sub-categories that capture distinct interaction regimes between an LLM agent and a KG.

### 2.1 Graph Traversal as Agent Actions (KGQA path search)

Four papers cast each step of multi-hop KGQA as an action over relational paths.

- *Reasoning of Large Language Models over Knowledge Graphs with Super-Relations* (ReKnoS, ICLR 2025) abstracts groups of edges into **super-relations** that enable both forward and backward search in a single LLM step.
- *Paths-over-Graph* (WWW 2025) performs **dynamic multi-hop, multi-entity path detection** and prunes via graph structure + LLM + SBERT.
- *Plan-on-Graph* (NeurIPS 2024) introduces **adaptive breadth planning with self-correction** through Guidance/Memory/Reflection.
- *ReKG-MCTS* (ACL Findings 2025) imposes **UCB-based Monte Carlo Tree Search** on KG path exploration with LLM-as-evaluator.

Shared technique: the LLM never commits to a single greedy edge. It either bundles edges (ReKnoS), enumerates paths (PoG), plans adaptively (Plan-on-Graph), or expands a tree (ReKG-MCTS) - and a pruning/scoring sub-step keeps the prompt budget bounded.

### 2.2 Multi-Agent KG Construction / QA Frameworks

Two papers move from "one agent over a KG" to "many agents coordinated by a KG."

- *AGENTiGraph* (CIKM 2025) is a training-free multi-agent system with specialized agents for intent classification, task planning, KG operations, and incremental knowledge integration, all sharing a single KG state.
- *AgREE* (arXiv 2025) is a single-agent system but exhibits multi-tool orchestration: a reasoning LLM iteratively switches between Wikipedia API and Google Search retrievers, composing snippets into triples.

Shared technique: agentic roles are spread across the pipeline, the KG is the persistent memory, and natural language replaces SPARQL/Cypher as the user interface.

### 2.3 Tool / Agent Retrieval via KG

- *Agent-as-a-Graph* (arXiv 2025) jointly embeds tools and agents as KG nodes connected by metadata edges, and introduces **type-specific weighted Reciprocal Rank Fusion (wRRF)** to rerank tools and agents differently before traversing parent-agent edges.

Shared technique: KG structure used not for QA but for **retrieval in multi-agent LLM systems**, transferring the KGQA traversal mindset into the MCP/tool-routing domain.

### 2.4 Rule-Induction-Based Agents

- *RuAG* (ICLR 2025) replaces "retrieve KG facts" with "induce KG rules": **MCTS-based first-order logic rule search** is run offline, and rules are translated into natural language and injected at inference.

Shared technique: KG-style knowledge is *compressed* into compact logical rules so the LLM can use it within its context window, side-stepping the RAG context-length bottleneck.

### 2.5 Observation-Driven KG-LLM Integration

- *ODA* (ACL Findings 2024) introduces an **Observation -> Action -> Reflection** loop with a recursive observation mechanism to bound subgraph size. The KG actively shapes agent behavior rather than serving only as a query target.

Shared technique with category 2.1, but explicitly elevating *observation* of KG context to a first-class agent step alongside acting and reflecting.

## 3. Architectural Patterns

### 3.1 Agent-KG Interaction Modes

A useful axis is how the agent touches the KG:

| Pattern | Papers | Description |
|---|---|---|
| Forward greedy expansion | (baseline: ToG) | Pick a single relation per step |
| Bundled/abstracted edges | *ReKnoS* | Pick a super-relation covering many paths |
| Multi-entity path enumeration | *Paths-over-Graph* | Materialize chains across all topic entities, then prune |
| Adaptive planning with rollback | *Plan-on-Graph* | Decompose sub-objectives; widen/narrow; reflect & undo |
| Tree search | *ReKG-MCTS* | UCB selection; LLM rollouts; backpropagate values |
| Observe-act-reflect | *ODA* | Globally observe subgraph; act; reflect on path |
| Iterative retrieval | *AgREE* | Decide whether to query Wikipedia or Google next |
| Sub-agent traversal | *Agent-as-a-Graph* | Retrieve tools, then walk agent edges |
| Offline rule mining | *RuAG* | Use MCTS over data to extract FOL rules |
| Multi-agent dispatch | *AGENTiGraph* | Route requests through role-specialized agents |

The clear trend is *away* from one-shot greedy retrieval. Every system surveyed introduces at least one of: (a) edge bundling, (b) explicit planning, (c) reflection, or (d) tree-style search.

### 3.2 Planning Loops

The planning architectures cluster into three families.

**MCTS-style search.** *ReKG-MCTS* is the canonical example: UCB-based node selection over KG paths, structure-constrained expansion, LLM-guided rollouts for value estimation, and backpropagation. *RuAG* deploys MCTS earlier in the pipeline - over predicate combinations - to mine rules offline; both demonstrate that classical search remains a powerful complement to LLMs.

**Adaptive planning with self-correction.** *Plan-on-Graph* is the most architecturally explicit: Guidance decomposes the question, Memory tracks explored facts, and Reflection detects errors and triggers rollback. This is the first training-free KG-LLM framework with true self-correction, and it directly produces both accuracy and efficiency wins (40.8% fewer LLM calls, >4x speedup vs. ToG).

**Observation-action-reflection.** *ODA* is similar in spirit but emphasizes that KG facts must be *observed globally* before acting. Its recursive observation mechanism is a pragmatic solution to subgraph explosion - the agent narrows its observational field iteratively rather than enumerating all neighbors.

### 3.3 Multi-Agent Coordination

*AGENTiGraph* is the most elaborate coordination scheme: a user query enters an intent classifier, is routed to a task planner that decides whether KG querying, updating, integration, or visualization is needed, and the corresponding executor agent operates on the shared KG. Crucially the KG also serves as a *visual artifact* the user can manipulate, which is a UX advance not present in earlier multi-agent KGQA work.

*AgREE* is mono-agent but multi-tool: LangGraph orchestrates DeepSeek-V3 with two retrievers (Wikipedia, Google), and the LLM itself decides query timing and content - effectively an internal coordinator.

### 3.4 Tool Retrieval via Embedding KGs

*Agent-as-a-Graph* is structurally novel: it does not perform KGQA, yet it imports the entire training-free KG-agent toolkit (graph topology, traversal, rank fusion) into MCP tool/agent retrieval. Tools and parent agents are co-equal nodes; edges encode the "agent exposes tool" relation; retrieval is a vector search followed by type-aware wRRF reranking and then graph traversal to assemble the agent set. This transposition is significant: it proves that the *KG-as-action-substrate* idea generalizes beyond QA to systems engineering of agent platforms.

### 3.5 Rule Induction for Agentic Generation

*RuAG* inverts the KG-agent loop: rather than the agent traversing a KG at inference, MCTS runs offline over predicate combinations to produce compact first-order logic rules, which are then translated into natural language and prepended to the prompt. The KG is "agentic" only in the data-mining phase. This is an effective response to the RAG context-window bottleneck, and it generalizes beyond QA to time-series anomaly detection and cooperative multi-agent games.

## 4. Evaluation Landscape

### 4.1 Benchmarks

The benchmark set spans KGQA, KG completion, agentic retrieval, and embodied/cooperative settings.

| Benchmark | Domain | Used by |
|---|---|---|
| WebQSP | KGQA (Freebase) | *PoG*, *ReKG-MCTS*, *Plan-on-Graph* |
| CWQ (ComplexWebQuestions) | Multi-hop KGQA | *PoG*, *ReKG-MCTS*, *Plan-on-Graph* |
| GrailQA | Compositional KGQA | *ReKnoS*, *PoG*, *Plan-on-Graph* |
| WebQuestions / SimpleQuestions | KGQA | *PoG* |
| QALD10-en | KBQA (Wikidata) | *ODA* |
| T-REx, Zero-Shot RE | Relation extraction | *ODA* |
| Creak | Commonsense KBQA | *ODA* |
| TutorQA-derived 3,500-query set | Educational chatbot | *AGENTiGraph* |
| Wikidata5M + Emerging-Entities | KG completion | *AgREE* |
| DWIE | Doc-level RE | *RuAG* |
| HDFS | Log anomaly detection | *RuAG* |
| Alice & Bob 13x9 cooperative game | Decision making | *RuAG* |
| LiveMCPBench | Tool/agent retrieval | *Agent-as-a-Graph* |

Freebase-backed KGQA (WebQSP, CWQ, GrailQA) remains the de-facto benchmark for KG-LLM reasoning; four of the nine papers use at least two of them.

### 4.2 Metrics

The KGQA papers converge on **Hits@1** as primary metric (*ReKnoS*, *ReKG-MCTS*, *Plan-on-Graph*), often complemented by accuracy. KGC uses **Hits@N** (*AgREE*). Tool retrieval uses **Recall@5 and nDCG@5** (*Agent-as-a-Graph*). Cooperative-game and anomaly tasks use **win-rate** and **F1** respectively (*RuAG*). Multi-agent chatbots (*AGENTiGraph*) report **task classification accuracy** and **execution success**.

### 4.3 Backbone LLMs

Backbones reflect the cost/availability spectrum:

- **GPT-3.5-Turbo and GPT-4 / 4o-mini**: *ReKnoS*, *PoG*, *Plan-on-Graph*, *ReKG-MCTS*, *ODA*, *AGENTiGraph*, *RuAG* - the most common configuration.
- **Llama-3-8B**: *ReKG-MCTS* uses Llama-3 for rollouts and final answers, showing that MCTS allows weaker models to perform competitively.
- **DeepSeek-V3 (MoE)**: *AgREE*'s backbone.
- **Eight embedding models** (Vertex text-embedding-005, Gemini-embedding-001, Amazon Titan v1/v2, OpenAI ada-002/3-small/3-large, All-MiniLM-L6-v2): *Agent-as-a-Graph* evaluates retrieval robustness across all of them.

### 4.4 Cost and Efficiency

Efficiency has become a first-class evaluation axis. *Plan-on-Graph* reports the most precise numbers: at least **40.8% fewer LLM calls** than ToG, **~4.6% fewer input tokens** and **76.2% fewer output tokens** on CWQ, and a **>4x speedup** on CWQ and GrailQA. *Paths-over-Graph*'s three-step pruning pipeline (structural + LLM + SBERT) is explicitly designed to cut path candidates before LLM scoring - the 18.9% accuracy gain is therefore obtained alongside (not in spite of) computational discipline. *ReKnoS*'s super-relations expand search coverage *without* increasing per-step LLM queries, which is a different efficiency lever.

## 5. Empirical Findings

### 5.1 Which Approach Wins on KGQA?

Within training-free KGQA, four systems are state-of-the-art on overlapping benchmarks:

- *Paths-over-Graph*: average +18.9% accuracy over ToG across five KGQA benchmarks; PoG-GPT-3.5 beats ToG-GPT-4 by up to 23.9% on some datasets.
- *Plan-on-Graph*: beats ToG on CWQ, WebQSP, GrailQA; with GPT-4 it even beats fine-tuned KG-augmented baselines on GrailQA.
- *ReKG-MCTS*: best Hits@1 among training-free methods on WebQSP and CWQ; closes most of the gap to supervised systems.
- *ODA*: +65.50% on Zero-Shot RE, +23.77% on QALD10-en, +12.87% / +8.9% on other KBQA datasets vs. prior prompt-based baselines; outperforms even fine-tuned baselines by +21.27% on QALD10-en and +50.56% on Zero-Shot RE.
- *ReKnoS*: average Hits@1 lift of 2.92% over the strongest training-free baselines (ToG, KG-Agent, StructGPT) across nine datasets; on GrailQA, 71.9% Hits@1 with GPT-3.5 (vs. 68.9% for KG-Agent) and 80.5% with GPT-4o-mini (vs. 77.5% for KG-Agent).

These systems are not directly comparable on the same dataset/backbone/protocol combination, but a rough ranking emerges: **PoG and Plan-on-Graph appear strongest on multi-hop Freebase KGQA, ODA on Wikidata KBQA, and ReKG-MCTS provides the best training-free Hits@1 with weaker backbones thanks to MCTS**.

### 5.2 Training-Free vs. Training-Required KG-Agents

A recurring claim is that training-free agents now match or beat training-required baselines. *Plan-on-Graph* with GPT-4 surpasses fine-tuned baselines (RoG, KG-Agent) on GrailQA. *ODA* outperforms fine-tuned baselines by double-digit margins on QALD10-en and Zero-Shot RE. *AgREE* achieves up to **+45.3% Hits@N** on emerging entities with *zero* training. *ReKG-MCTS* is "competitive with fine-tuned baselines" on WebQSP/CWQ. The picture is consistent: as long as the agent is given a strong backbone (GPT-4 / DeepSeek-V3) and a well-designed planning/search loop, fine-tuning the LLM is no longer necessary for SOTA on KGQA and KGC.

The flip side is that training-free systems still draw on training-required components (SBERT in *PoG*, retrievers in *AgREE*, embedding models in *Agent-as-a-Graph*). "Training-free" thus specifically denotes that the *backbone LLM is frozen*, not the entire pipeline.

### 5.3 Efficiency Gains

*Plan-on-Graph* is the standout: 40.8% fewer LLM calls, 76.2% fewer output tokens, >4x speedup. *Paths-over-Graph* achieves SOTA with GPT-3.5 surpassing ToG with GPT-4 - a *model-replacement* form of efficiency that saves API cost. *Agent-as-a-Graph* shows that even retrieval can be made cheaper by exploiting graph structure (wRRF adds ~2.4% over non-reranked retrieval at negligible inference cost). *RuAG* moves the heaviest computation (MCTS rule mining) offline, keeping inference token budget tight.

## 6. Cross-Paper Insights

### 6.1 Tree Search and Self-Correction as Recurring Patterns

MCTS has become a default tool in this literature, appearing in *ReKG-MCTS* (over KG paths at inference) and *RuAG* (over predicate combinations offline). Both pair MCTS with LLM-as-evaluator. Independently, self-correction loops appear in *Plan-on-Graph* (Reflection module) and *ODA* (Reflection step in Observation->Action->Reflection). Across both lines of work, the insight is the same: greedy single-pass KG traversal is brittle, and *some* form of backtracking - tree-based or reflection-based - is essential for multi-hop accuracy.

### 6.2 Agentic Planning vs. Single-Shot Retrieval

Several papers explicitly justify themselves by contrasting iterative agentic retrieval with single-shot RAG. *AgREE* attributes its +45.3% emerging-entity gain to iterative retrieval; *Plan-on-Graph* attributes its efficiency gain to adaptive (rather than fixed-breadth) exploration; *ODA* attributes its accuracy gain to KG observation actively shaping agent actions. The collective message is that **the iteration loop is the source of the wins**, not any single prompting trick.

### 6.3 Importance of Super-Relations / Aggregated Edges

*ReKnoS* introduces the *super-relation* abstraction - a meta-edge bundling many concrete relations - that enables forward *and* backward reasoning in a single LLM step. This idea has obvious extensions: bundling could also reduce branching factor in *Plan-on-Graph*'s adaptive exploration, or reduce the action space in *ReKG-MCTS*. Aggregation is a general lever for taming combinatorial blow-up on large KGs.

### 6.4 Multi-Agent KG Construction Emerging

*AGENTiGraph* is a leading indicator that KGs are not just *retrieved from* but *grown by* LLM agents. Its 95.12% intent classification accuracy and 90.45% execution success on a 3,500-query benchmark show that multi-agent specialization (intent classifier + planner + executor + integrator) scales gracefully across heterogeneous task types - a result with implications for live KG-grounded chatbots in education, enterprise search, and domain-specific assistants.

### 6.5 Tool Retrieval as Graph Traversal

*Agent-as-a-Graph* completes the loop: the KG abstraction is now powerful enough that the *meta-system* of LLM agents and their tools is best represented as a KG. Recall@5 goes from 0.74 (ScaleMCP) to 0.85 with type-specific wRRF + agent-edge traversal - a +14.9 to +20.8% jump consistent across eight embedding models. This pattern (heterogeneous-typed nodes + edge-based traversal at retrieval time + type-aware reranking) is likely to spread to other large-catalog retrieval problems in agentic systems.

### 6.6 Cost-Efficiency Now First-Class

Older KG-LLM work reported accuracy alone. The 2024-2026 papers report accuracy *and* token / call counts. *Plan-on-Graph*'s explicit measurement of LLM calls, input tokens, and output tokens; *Paths-over-Graph*'s pruning pipeline; *ReKnoS*'s "no extra per-step queries" claim; and *Agent-as-a-Graph*'s evaluation across embedding model price points all reflect a more mature engineering culture. Cost is now part of the comparison.

## 7. Open Problems and Future Directions

### 7.1 Scaling to Large KGs

Freebase and Wikidata are still the proving grounds, but billion-edge KGs (proprietary enterprise graphs, scholarly graphs, code KGs) remain largely unexplored. Subgraph extraction (cf. *ODA*'s recursive observation), super-relation abstraction (*ReKnoS*), and adaptive breadth control (*Plan-on-Graph*) are all candidate primitives, but none has been stress-tested at >10^8 edges.

### 7.2 Cost of LLM Calls During Planning

Even with *Plan-on-Graph*'s 40.8% reduction, KG-agent inference remains costly. MCTS rollouts (*ReKG-MCTS*) multiply LLM calls per query. Future work will likely:
- Distill the agent's planner into a small model while leaving the answer-generation LLM frozen.
- Cache super-relation expansions across questions.
- Hybridize tree search with deterministic graph algorithms (e.g., bidirectional BFS) to reduce LLM rollouts.

### 7.3 Robustness to Noisy / Incomplete KGs

*AgREE* explicitly targets emerging entities, but most KGQA work assumes a complete and clean Freebase/Wikidata snapshot. Real KGs are noisy, sparse, and stale. Iterative retrieval (a la *AgREE*) and self-correction (a la *Plan-on-Graph*) are partial answers, but no paper systematically benchmarks robustness to KG corruption.

### 7.4 Multi-Hop Accuracy

Multi-entity, multi-hop questions remain the bottleneck. *Paths-over-Graph* makes the largest gains exactly on CWQ and GrailQA, suggesting that explicit path enumeration + pruning may continue to dominate. But branching factor is still the enemy; future work will likely combine super-relation bundling with path-based reasoning.

### 7.5 Generalization Across KGs

Most systems are evaluated on a single KG family (Freebase or Wikidata). Cross-KG transfer - reasoning on Freebase, then deploying on a Wikidata-style KG without re-prompting - is rarely measured. *RuAG*'s offline rule extraction may need to be repeated per KG; *Agent-as-a-Graph* shows graph traversal generalizes to MCP tool indexes, but generalization across QA-style KGs remains open.

### 7.6 Agentic Memory + KG Integration

*Plan-on-Graph*'s Memory module and *AGENTiGraph*'s shared KG state are early steps. A persistent question: should the agent's long-term memory *be* the KG, or sit alongside it? *AgREE*'s LangGraph state and *RuAG*'s injected rules represent alternative memory designs. A unified architecture that combines durable KG memory, episodic working memory, and rule-induction caches is yet to be proposed.

### 7.7 Standardized Evaluation of Training-Free Agents

The literature would benefit from a unified benchmark suite that reports accuracy, Hits@1/@N, LLM calls, tokens, latency, and robustness to KG corruption - across at least Freebase, Wikidata, and one proprietary KG, with at least three backbone LLMs. Without this, claims like "+18.9% over ToG" or "+45.3% on emerging entities" remain hard to triangulate.

## 8. Paper Index

| # | Title | Venue | One-line Takeaway |
|---|---|---|---|
| 1 | *Reasoning of Large Language Models over Knowledge Graphs with Super-Relations* (ReKnoS) | ICLR 2025 | Super-relations bundle equivalent KG paths and enable forward+backward search, lifting Hits@1 by ~2.92% across 9 datasets without extra LLM calls. |
| 2 | *RuAG: Learned-rule-augmented Generation for Large Language Models* | ICLR 2025 | Offline MCTS mines first-order logic rules from data; the rules are translated to NL and injected, sidestepping the RAG context-window bottleneck. |
| 3 | *Paths-over-Graph: Knowledge Graph Empowered Large Language Model Reasoning* | WWW 2025 | Multi-entity dynamic path enumeration with three-step (structure+LLM+SBERT) pruning beats ToG by 18.9% average; PoG-GPT-3.5 even beats ToG-GPT-4. |
| 4 | *ReKG-MCTS: Reinforcing LLM Reasoning on Knowledge Graphs via Training-Free Monte Carlo Tree Search* | ACL Findings 2025 | UCB-based MCTS over KG paths with LLM-guided rollouts achieves training-free SOTA on WebQSP and CWQ, competitive with fine-tuned baselines. |
| 5 | *AGENTiGraph: A Multi-Agent Knowledge Graph Framework for Interactive, Domain-Specific LLM Chatbots* | CIKM 2025 | Specialized agents (intent, planner, executor, integrator) collaborate around a shared KG; 95.12% intent accuracy and 90.45% execution success on a 3,500-query TutorQA-derived benchmark. |
| 6 | *AgREE: Agentic Reasoning for Knowledge Graph Completion on Emerging Entities* | arXiv 2025 | Iterative agentic retrieval (Wikipedia + Google + DeepSeek-V3 via LangGraph) yields up to +45.3% Hits@N on emerging entities with zero training. |
| 7 | *Agent-as-a-Graph: Knowledge Graph-Based Tool and Agent Retrieval for LLM Multi-Agent Systems* | arXiv 2025 | Joint tool/agent KG with type-specific wRRF reranking lifts Recall@5 from 0.74 to 0.85 on LiveMCPBench, robust across eight embedding models. |
| 8 | *ODA: Observation-Driven Agent for integrating LLMs and Knowledge Graphs* | ACL Findings 2024 | Observation->Action->Reflection loop with recursive observation curbs subgraph blowup; +65.50% on Zero-Shot RE and +23.77% on QALD10-en over prompt baselines. |
| 9 | *Plan-on-Graph: Self-Correcting Adaptive Planning of Large Language Model on Knowledge Graphs* | NeurIPS 2024 | First training-free KG-LLM agent with self-correction via Guidance/Memory/Reflection; beats fine-tuned baselines on GrailQA while using >=40.8% fewer LLM calls and >4x faster. |

---

## Closing Synthesis

The training-free KG-agent literature of 2024-2026 is converging on a small set of architectural primitives - adaptive planning, tree search, self-correction, edge bundling, multi-agent dispatch, and graph traversal as retrieval - and these primitives now beat fine-tuned baselines on the canonical KGQA benchmarks. The frontier has shifted accordingly: from "can frozen LLMs reason over KGs at all?" to "what is the most efficient planning loop, what KG abstraction reduces branching factor, and how do we generalize across KGs and tasks?" Tool retrieval (*Agent-as-a-Graph*), emerging-entity completion (*AgREE*), interactive KG growth (*AGENTiGraph*), and offline rule induction (*RuAG*) demonstrate that the KG-agent paradigm is escaping pure KGQA - the next two years are likely to produce KG-grounded agents in domains as varied as enterprise search, scientific discovery, code understanding, and embodied control.
