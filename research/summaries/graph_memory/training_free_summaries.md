# Graph-based Memory for LLMs/Agents (Training-Free): Paper Summaries

This document contains structured summaries of 22 training-free papers on graph-based memory for LLMs and agents from 2025-2026 conferences.

---

## Zep: A Temporal Knowledge Graph Architecture for Agent Memory
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2501.13956  |  **PDF**: https://arxiv.org/pdf/2501.13956

**Authors**: Preston Rasmussen, Pavlo Paliychuk, Travis Beauvais, Jack Ryan, Daniel Chalef

### Problem
Existing RAG frameworks for LLM agents are limited to static document retrieval, while enterprise applications need dynamic memory that integrates ongoing conversations and structured business data with temporal awareness.

### Method & Innovation
Zep is a memory layer service built around Graphiti, a temporally-aware knowledge graph engine that incrementally ingests conversational and structured business data while maintaining historical (bi-temporal) edges. Each fact node carries both event-validity and database-validity timestamps, and the graph is queried via hybrid retrieval (semantic + BM25 + graph traversal). Novelty: in contrast to MemGPT-style flat summarized memory, Zep grounds memory in a dynamically maintained temporal KG with non-lossy historical relations, enabling cross-session synthesis and temporal reasoning without retraining.

### Conclusion
Zep beats MemGPT on the DMR benchmark and delivers large gains on the harder LongMemEval benchmark while drastically cutting latency, especially on temporal-reasoning and cross-session tasks.

### Eval Data & Environment
Evaluated on the Deep Memory Retrieval (DMR) benchmark (500-conversation MSC subset) and LongMemEval. Base LLMs: GPT-4-turbo and GPT-4o-mini.

### Baselines
- MemGPT
- Full-conversation baseline (no memory system)
- Session-summary baseline

### Eval Results
DMR: Zep 94.8% vs MemGPT 93.4% (gpt-4-turbo); 98.2% with gpt-4o-mini. On LongMemEval, Zep yields ~15.2% accuracy gain over baseline with gpt-4o-mini and up to 18.5% with gpt-4o, while reducing response latency by ~90% versus full-conversation context. Largest gains on single-session-preference, multi-session, and temporal-reasoning categories.

---

## Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory
**Venue**: arXiv preprint (also ECAI 2025), 2025  |  **arXiv**: 2504.19413  |  **PDF**: https://arxiv.org/pdf/2504.19413

**Authors**: Prateek Chhikara, Dev Khant, Saket Aryan, Taranjeet Singh, Deshraj Yadav

### Problem
LLMs' fixed context windows undermine consistency across multi-session dialogues; existing memory systems either lose salience or are too expensive at production scale.

### Method & Innovation
Mem0 is a scalable memory architecture that dynamically extracts, consolidates, and retrieves salient facts via an LLM-driven pipeline; an enhanced "Mem0g" variant adds a graph-based representation capturing entities and relations among conversational elements. The novelty is a production-oriented two-stage extract/update procedure plus an optional graph view, designed to be both accurate on LOCOMO and cost-efficient (low tokens/latency) for deployment.

### Conclusion
Mem0 (and Mem0g) outperforms full-context, RAG, MemGPT, Zep, OpenAI Memory, LangMem and A-Mem on LOCOMO while using a small fraction of tokens and dramatically lower latency.

### Eval Data & Environment
LOCOMO long-form conversation benchmark, evaluated across single-hop, multi-hop, temporal, and open-domain question categories. Base LLM: primarily GPT-4o-mini.

### Baselines
- Memory-augmented systems (MemGPT, ReadAgent, MemoryBank, A-Mem)
- RAG with multiple chunk-size / k configurations
- Full-context baseline
- LangMem (open-source memory)
- OpenAI Memory (proprietary)
- Zep (dedicated memory platform)

### Eval Results
Mem0 achieves a 26% relative improvement in LLM-as-a-Judge ("J") score over OpenAI Memory; Mem0g adds ~2% over base Mem0. Mem0 cuts p95 latency by ~91% and token cost by >90% versus full-context. LangMem and Zep score roughly 8% lower than Mem0 on the J metric. The newer "token-efficient" Mem0 reports 91.6 on LoCoMo and 93.4 on LongMemEval (April 2026 update).

---

## A-MEM: Agentic Memory for LLM Agents
**Venue**: NeurIPS 2025, 2025  |  **arXiv**: 2502.12110  |  **PDF**: https://arxiv.org/pdf/2502.12110

**Authors**: Wujiang Xu, Zujie Liang, Kai Mei, Hang Gao, Juntao Tan, Yongfeng Zhang

### Problem
Existing agent memory systems use fixed schemas and rigid operations; they lack adaptive organization and inter-memory linking, limiting cross-task usefulness.

### Method & Innovation
A-MEM organizes memory as a Zettelkasten-style dynamic note network: each new memory becomes a structured note (contextual description, keywords, tags) whose LLM-driven analysis finds and creates links to relevant historical notes, and triggers updates to those notes' attributes. The novelty is "memory evolution," in which adding new memories actively refines prior notes' representations, so the memory graph continuously self-organizes without any training.

### Conclusion
On six foundation models tested on LoCoMo, A-MEM consistently outperforms strong memory baselines, with the biggest gains on multi-hop reasoning while using roughly an order of magnitude fewer tokens.

### Eval Data & Environment
LoCoMo dataset with five categories (single-hop, multi-hop, temporal, open-domain, adversarial). Six foundation models tested (GPT-4o-mini and five non-GPT models including LLaMA/Qwen variants).

### Baselines
- LoCoMo (original method)
- ReadAgent
- MemoryBank
- MemGPT

### Eval Results
On GPT-4o-mini multi-hop questions, A-MEM achieves ROUGE-L 44.27 versus LoCoMo's 18.09 (>2x). For non-GPT models, A-MEM dominates baselines across all categories. Token usage drops to ~1,200-2,500 tokens per operation versus ~16,900 for LoCoMo (85-93% reduction).

---

## AriGraph: Learning Knowledge Graph World Models with Episodic Memory for LLM Agents
**Venue**: IJCAI 2025, 2025  |  **arXiv**: 2407.04363  |  **PDF**: https://arxiv.org/pdf/2407.04363

**Authors**: Petr Anokhin, Nikita Semenov, Artyom Sorokin, Dmitry Evseev, Andrey Kravchenko, Mikhail Burtsev, Evgeny Burnaev

### Problem
LLM agents in interactive environments rely on unstructured histories (full text, summaries, RAG) which do not support planning or multi-hop reasoning needed for long-horizon tasks.

### Method & Innovation
AriGraph builds a memory graph on the fly that fuses a semantic knowledge graph (entity-relation triplets extracted from observations) with episodic vertices/edges anchoring episodes in time. The Ariadne agent uses this graph for retrieval, planning and decision-making in text games. Novelty: integrated semantic+episodic graph world model that supports both procedural play and static multi-hop QA without retraining.

### Conclusion
Ariadne with AriGraph matches or exceeds top human players on most TextWorld tasks and decisively beats full-history, summarization, RAG, and RL baselines.

### Eval Data & Environment
Five TextWorld environments across three tasks: Treasure Hunt (standard + hard), Cleaning, Cooking (standard + hard). Also evaluated on static multi-hop QA: MuSiQue and HotpotQA. Base LLM: GPT-4 (with GPT-3.5 ablations).

### Baselines
- Full History
- Summary memory
- RAG
- RL baselines (e.g., DRRN family)
- Human players (top-3 and average)

### Eval Results
Normalized TextWorld scores (max=1.0): AriGraph achieves 1.0 on Treasure Hunt, 0.79 on Cleaning, 1.0 on Cooking, 1.0 on Treasure Hunt Hard, 1.0 on Cooking Hard. Human top-3 reach 0.85 on Cleaning. Best non-graph baseline (Summary) tops out at ~0.52 (cooking) and drops to 0.17–0.21 on hard variants. AriGraph also competitive with dedicated KG QA methods on multi-hop static benchmarks.

---

## G-Memory: Tracing Hierarchical Memory for Multi-Agent Systems
**Venue**: NeurIPS 2025 (Spotlight), 2025  |  **arXiv**: 2506.07398  |  **PDF**: https://arxiv.org/pdf/2506.07398

**Authors**: Guibin Zhang, Muxin Fu, Guancheng Wan, Miao Yu, Kun Wang, Shuicheng Yan

### Problem
Multi-agent systems (MAS) lack memory that captures inter-agent collaboration trajectories and supports cross-trial, agent-specific personalization, blocking self-evolution.

### Method & Innovation
G-Memory introduces a three-tier graph hierarchy — Insight Graph (cross-trial abstracted lessons), Query Graph (meta-information about prior queries), and Interaction Graph (fine-grained inter-agent communications). New queries trigger bi-directional traversal: locate similar queries via the query graph, then traverse upward for insights and downward for interaction subgraphs. After execution, all three tiers ingest the new trajectory. Novelty: first hierarchical, plug-and-play graph memory designed specifically for MAS collaboration trajectories, requiring no framework modification.

### Conclusion
G-Memory delivers large success-rate and accuracy gains across five benchmarks, three LLM backbones, and three MAS frameworks without modifying the underlying agent code.

### Eval Data & Environment
Five benchmarks spanning embodied action and knowledge QA; three LLM backbones; integrated into three popular MAS frameworks (e.g., AutoGen, MetaGPT-style systems).

### Baselines
- Vanilla MAS frameworks without dedicated memory
- Flat/episodic memory mechanisms used by MAS baselines

### Eval Results
Up to +20.89% absolute improvement in success rate on embodied-action tasks and +10.12% on knowledge-QA accuracy, achieved without altering the underlying MAS framework. Gains hold consistently across LLM backbones and frameworks tested.

---

## MemoTime: Memory-Augmented Temporal Knowledge Graph Enhanced Large Language Model Reasoning
**Venue**: WWW 2026 (also ICLR 2026 OpenReview), 2025  |  **arXiv**: 2510.13614  |  **PDF**: https://arxiv.org/pdf/2510.13614

**Authors**: Xingyu Tan, Xiaoyang Wang, Qing Liu, Xiwei Xu, Xin Yuan, Liming Zhu, Wenjie Zhang

### Problem
LLMs struggle with temporal questions involving multiple entities, compound operators, and evolving sequences; existing TKG-based LLM methods fail at temporal faithfulness, multi-entity synchronization, operator-specific retrieval, and reuse of prior reasoning.

### Method & Innovation
MemoTime decomposes complex temporal questions into a hierarchical "Tree of Time" that enforces monotonic timestamps and co-constrains entities. A dynamic evidence-retrieval layer selects operator-specific retrieval strategies, while a self-evolving experience memory stores verified reasoning traces, toolkit decisions, and sub-question embeddings for cross-type reuse. Novelty: combines tree-structured recursive reasoning, operator-aware retrieval, and an episodic experience memory so smaller models can match very large ones on temporal benchmarks without fine-tuning.

### Conclusion
MemoTime achieves SOTA on temporal QA benchmarks, with up to 24% gain over strong baselines and enabling Qwen3-4B to rival GPT-4-Turbo.

### Eval Data & Environment
MultiTQ and TimeQuestions temporal QA benchmarks. Backbones tested include Qwen3-4B / 8B / 32B / 80B, DeepSeek-V3, and GPT-4-Turbo.

### Baselines
- TempAgent (strongest baseline)
- Embedding-based temporal QA methods
- Pre-trained LM baselines (BERT, ALBERT)
- Direct LLM prompting

### Eval Results
On MultiTQ, MemoTime raises Qwen3-32B accuracy from as low as 1.3% to 61.4% (~46x relative gain); Qwen3-4B sees ~14.8x relative improvement. With GPT-4-Turbo, MemoTime achieves 77.9% overall Hit@1, beating TempAgent by 24.0 points. Baselines (BERT/ALBERT/embedding) stay below 30% overall.

---

## TReMu: Towards Neuro-Symbolic Temporal Reasoning for LLM-Agents with Memory in Multi-Session Dialogues
**Venue**: Findings of ACL 2025, 2025  |  **arXiv**: 2502.01630  |  **PDF**: https://arxiv.org/pdf/2502.01630

**Authors**: Yubin Ge, Salvatore Romeo, Jason Cai, Raphael Shu, Monica Sunkara, Yassine Benajiba, Yi Zhang

### Problem
Temporal reasoning in multi-session dialogues is under-studied; existing temporal QA benchmarks don't capture cross-session dependencies and relative-time reasoning.

### Method & Innovation
TReMu augments LoCoMo dialogues into a new multi-choice QA benchmark, then proposes a two-part framework: (1) time-aware memorization that summarizes each session with inferred dates to form retrievable memory, and (2) neuro-symbolic temporal reasoning where the LLM emits Python code that performs date arithmetic before selecting an answer. Novelty: combining timeline-summarized memory with code-based symbolic temporal computation eliminates LLM arithmetic errors on multi-session timelines without training.

### Conclusion
TReMu more than doubles GPT-4o's accuracy on the new multi-session temporal benchmark over standard prompting.

### Eval Data & Environment
A new temporal multi-choice QA benchmark constructed by augmenting LoCoMo dialogues, focused on relative-time and cross-session dependency. LLMs evaluated: GPT-4o, GPT-4o-mini, GPT-3.5-Turbo.

### Baselines
- Standard prompting
- Chain-of-Thought (CoT)

### Eval Results
On GPT-4o, accuracy rises from 29.83% (standard prompting) and 61.67% (CoT) to 77.67% with TReMu — a +47.8 absolute gain over standard prompting and +16 over CoT.

---

## Bridging Intuitive Associations and Deliberate Recall: Empowering LLM Personal Assistant with Graph-Structured Long-term Memory (Associa)
**Venue**: Findings of ACL 2025, 2025  |  **arXiv**: (not assigned)  |  **PDF**: https://aclanthology.org/2025.findings-acl.901.pdf

**Authors**: Yujie Zhang, Weikang Yuan, Zhuoren Jiang

### Problem
LLM personal assistants struggle to handle multi-intent queries over long histories because dense retrieval ignores entity associations critical for finding the right evidence.

### Method & Innovation
Associa is a graph-structured memory framework with an event-centric memory graph and two cognition-inspired modules: "Intuitive Association," which extracts evidence-rich subgraphs by solving a Prize-Collecting Steiner Tree (PCST) optimization over the memory graph, and "Deliberating Recall," which iteratively refines queries to gather comprehensive evidence. Novelty: explicit use of PCST graph optimization for retrieval (intuitive subgraph extraction) combined with iterative deliberate query refinement, mimicking dual-process cognition.

### Conclusion
Associa significantly outperforms existing dense/RAG and memory baselines on long-term dialogue retrieval and QA, especially when entity relationships and multi-intent queries matter.

### Eval Data & Environment
Long-term dialogue benchmarks (LoCoMo-style and related datasets used in the ACL Findings paper). Base LLMs not fully detailed in available sources beyond standard GPT-class models. Not reported in available sources for hardware.

### Baselines
- Dense retrieval / RAG baselines
- Long-term memory systems compared in the paper (e.g., summarization-based and entity-extraction memory) — specific list not fully reported in available sources.

### Eval Results
The paper reports that Associa "significantly outperforms existing methods in retrieval and QA tasks across long-term dialogue benchmarks." Exact numbers were not fully recovered from accessible sources; readers should consult the ACL Anthology PDF for precise per-task scores.

---

## MemInsight: Autonomous Memory Augmentation for LLM Agents
**Venue**: EMNLP 2025, 2025  |  **arXiv**: 2503.21760  |  **PDF**: https://arxiv.org/pdf/2503.21760

**Authors**: Rana Salama, Jason Cai, Michelle Yuan, Anna Currey, Monica Sunkara, Yi Zhang, Yassine Benajiba

### Problem
As LLM-agent memory grows, raw historical interactions lack semantic structure, hurting retrieval accuracy and contextualization.

### Method & Innovation
MemInsight is a training-free, autonomous memory-augmentation pipeline in which the LLM annotates each historical interaction with structured semantic attributes ("insights"), creating an enriched memory store used for downstream retrieval and reasoning. Novelty: rather than learning new embeddings, MemInsight autonomously generates structured attribute tags that act as a semantic index, enabling better retrieval and recommendation across diverse tasks without retraining.

### Conclusion
Across three task scenarios, MemInsight delivers double-digit gains in recall and recommendation persuasiveness over RAG and standard memory baselines.

### Eval Data & Environment
Three task scenarios: conversational recommendation (LLM-REDIAL dataset), long-term QA (LoCoMo retrieval), and event summarization. Source code released by Amazon Science.

### Baselines
- RAG (dense retrieval baseline)
- Standard memory storage / unaugmented memory baselines

### Eval Results
+14% persuasiveness on LLM-REDIAL recommendations. +34% improvement in recall on LoCoMo retrieval vs RAG baseline. Consistent gains in event summarization (exact numbers in paper).

---

## Memory-augmented Query Reconstruction for LLM-based Knowledge Graph Reasoning (MemQ)
**Venue**: Findings of ACL 2025, 2025  |  **arXiv**: 2503.05193  |  **PDF**: https://arxiv.org/pdf/2503.05193

**Authors**: Mufan Xu, Gewen Liang, Kehai Chen, Wei Wang, Xun Zhou, Muyun Yang, Tiejun Zhao, Min Zhang

### Problem
LLM-based KGQA methods conflate tool invocation with reasoning, producing low-readability outputs and hallucinated tool calls.

### Method & Innovation
MemQ decouples reasoning from tool use by building an LLM-curated query memory: descriptions of query statements (SPARQL/relation chains) are stored as natural-language entries. At inference, the LLM does natural-language reasoning over the question, then reconstructs the executable query by retrieving from this memory. Novelty: a memory-augmented reconstruction step that lets the LLM focus on reasoning while the memory module supplies the precise query syntax, eliminating tool hallucinations and improving interpretability.

### Conclusion
MemQ sets a new state-of-the-art on WebQSP and CWQ, with sizeable gains over the previous best (KG-Agent).

### Eval Data & Environment
WebQSP and CWQ KGQA benchmarks. Base LLMs: unspecified in summary; standard KGQA LLMs used.

### Baselines
- KG-Agent (prior SOTA)
- Other LLM+KG reasoning baselines (ToG, RoG class methods)

### Eval Results
WebQSP: Hits@1 0.841, F1 0.858 (new SOTA above KG-Agent). CWQ: Hits@1 0.803, F1 0.830 vs KG-Agent 0.722 / 0.692 — gains of +8.1 Hits@1 and +13.8 F1 on CWQ.

---

## Memory OS of AI Agent
**Venue**: EMNLP 2025 (Oral), 2025  |  **arXiv**: 2506.06326  |  **PDF**: https://arxiv.org/pdf/2506.06326

**Authors**: Jiazheng Kang, Mingming Ji, Zhe Zhao, Ting Bai

### Problem
Fixed LLM context windows and rudimentary memory management limit personalization and long-term coherence in AI agents.

### Method & Innovation
MemoryOS borrows OS memory-management principles to construct a four-module system (Storage, Updating, Retrieval, Generation) with three storage tiers: short-term, mid-term, and long-term personal memory. Short-to-mid updates follow a dialogue-chain FIFO scheme; mid-to-long uses a segmented page organization. Novelty: explicit OS-inspired hierarchical memory with dynamic paging for personalization, enabling efficient long-context retention without retraining.

### Conclusion
On LoCoMo, MemoryOS delivers very large F1/BLEU gains over existing memory baselines under GPT-4o-mini, indicating major coherence and personalization improvements.

### Eval Data & Environment
LoCoMo benchmark for long-form conversational QA. Base LLM: GPT-4o-mini.

### Baselines
- Existing memory systems compared in the paper (MemGPT-class, summarization, RAG-style baselines)

### Eval Results
Average improvement on LoCoMo: +49.11% F1 and +46.18% BLEU-1 over baselines using GPT-4o-mini.

---

## SGMem: Sentence Graph Memory for Long-Term Conversational Agents
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2509.21212  |  **PDF**: https://arxiv.org/pdf/2509.21212

**Authors**: Yaxiong Wu, Yongyue Zhang, Sheng Liang, Yong Liu

### Problem
Fact-extraction or summarization memory loses granularity; existing systems can't coherently retrieve information across turns, rounds, and sessions in long dialogues.

### Method & Innovation
SGMem represents dialogue as sentence-level graphs within chunked units that capture turn-, round-, and session-level associations, then performs multi-hop retrieval over the sentence graph fused with generated memory (summaries, facts, insights). Novelty: keeping the basic memory unit at sentence granularity within a hierarchical graph, then combining raw dialogue retrieval with generated semantic memory at query time to provide both faithfulness and abstraction.

### Conclusion
SGMem consistently improves accuracy and outperforms strong long-term memory baselines on both LongMemEval and LoCoMo.

### Eval Data & Environment
LongMemEval and LoCoMo long-term conversational QA benchmarks. Base LLMs: standard memory-system setups (e.g., GPT-4o-mini).

### Baselines
- Established long-term memory baselines (Mem0, MemGPT, summarization-based memory, RAG, dense retrieval) referenced in the paper

### Eval Results
SGMem reports consistent accuracy improvements over strong baselines on both LongMemEval and LoCoMo; exact per-category numbers are reported in the paper tables (specific values not fully retrieved here but the paper demonstrates outperformance versus all compared memory frameworks).

---

## HiAgent: Hierarchical Working Memory Management for Solving Long-Horizon Agent Tasks with Large Language Model
**Venue**: ACL 2025, 2025  |  **arXiv**: 2408.09559  |  **PDF**: https://arxiv.org/pdf/2408.09559

**Authors**: Mengkang Hu, Tianxing Chen, Qiguang Chen, Yao Mu, Wenqi Shao, Ping Luo

### Problem
Most LLM agents stream entire action-observation histories into the prompt, creating redundancy that degrades long-horizon task performance.

### Method & Innovation
HiAgent introduces subgoal-based hierarchical working memory: the LLM formulates a subgoal, executes actions toward it, and can proactively summarize past observations and replace earlier subgoals when shifting focus, keeping only the action-observation pairs relevant to the current subgoal. Novelty: instead of cross-trial memory, this targets in-trial (working) memory with explicit subgoal chunks acting as memory boundaries — a training-free prompting-level redesign that improves both length and quality of agent runs.

### Conclusion
HiAgent roughly doubles success rates on long-horizon agent tasks while cutting steps, context, and runtime substantially.

### Eval Data & Environment
Five long-horizon agent benchmarks (e.g., ALFWorld, ScienceWorld, TravelPlanner, WebShop, Blocksworld). Base LLM: standard LLM agent backbone (e.g., GPT-4-class).

### Baselines
- Standard ReAct-style baseline (full history)
- Summarization-based memory baselines

### Eval Results
Average ~2x increase in success rate (e.g., 42% vs 21% on the standard baseline), 87.2%/90.3% success on ALFWorld seen/unseen and 83.3% on TravelPlanner. Cuts steps required by 3.8 on average, context length by 35.02%, runtime by 19.42%, and maintains >80% executability beyond 20 steps where the standard prompt baseline drops below 10%.

---

## LongMemEval: Benchmarking Chat Assistants on Long-Term Interactive Memory
**Venue**: ICLR 2025, 2025  |  **arXiv**: 2410.10813  |  **PDF**: https://arxiv.org/pdf/2410.10813

**Authors**: Di Wu, Hongwei Wang, Wenhao Yu, Yuwei Zhang, Kai-Wei Chang, Dong Yu

### Problem
Existing benchmarks underexplore long-term memory abilities of chat assistants beyond simple recall; commercial systems and long-context LLMs may degrade severely on sustained interactions.

### Method & Innovation
The paper contributes both a benchmark and a memory framework. LongMemEval contains 500 curated questions targeting five memory abilities (information extraction, multi-session reasoning, temporal reasoning, knowledge updates, abstention) embedded in scalable user-assistant histories. The authors also propose a three-stage memory framework (indexing, retrieval, reading) with optimizations: session decomposition for value granularity, fact-augmented key expansion for indexing, and time-aware query expansion. Novelty: first comprehensive long-term memory benchmark plus an analysis-driven set of indexing/retrieval/reading optimizations.

### Conclusion
Commercial chat assistants and long-context LLMs lose ~30% accuracy moving from offline reading to sustained interactive settings; the proposed indexing/retrieval/reading optimizations recover much of this gap.

### Eval Data & Environment
LongMemEval (500 questions, scalable history). Tested against commercial systems (e.g., ChatGPT, Coze) and long-context LLMs (e.g., GPT-4o, Llama-3.1-8B Instruct), plus combinations of indexing/retrieval/reading strategies.

### Baselines
- Commercial chat assistants (e.g., ChatGPT, Coze)
- Long-context LLMs (GPT-4o, Claude-class, Llama-3.1)
- Standard indexing/retrieval/reading baselines

### Eval Results
Long-context LLMs drop 30-60% accuracy on LongMemEvalS vs oracle retrieval; ChatGPT-like systems fall to ~58% in interactive setting. Proposed optimizations (round granularity, fact-augmented keys, Chain-of-Note reading) add up to +10 points to retrieval and final answer accuracy.

---

## MIRIX: Multi-Agent Memory System for LLM-Based Agents
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2507.07957  |  **PDF**: https://arxiv.org/pdf/2507.07957

**Authors**: Yu Wang, Xi Chen

### Problem
Existing agent memory systems are flat and narrowly scoped, failing to personalize, abstract, or recall multimodal user data over time.

### Method & Innovation
MIRIX is a modular multi-agent memory system with six memory types (Core, Episodic, Semantic, Procedural, Resource Memory, Knowledge Vault) coordinated by a multi-agent framework that decides updates and retrieval per memory type. Novelty: explicit multi-typed memory partition managed by specialized agents, including support for visual/multimodal experiences (screenshots), which prior text-only memory systems do not handle.

### Conclusion
MIRIX achieves SOTA on both a new multimodal benchmark (ScreenshotVQA) and the long-form LOCOMO text benchmark, with dramatic storage reductions on the multimodal task.

### Eval Data & Environment
ScreenshotVQA (~20,000 high-resolution screenshots per sequence) and LOCOMO. Multimodal LLM backbones; details of specific model versions in the paper.

### Baselines
- RAG baseline (text + visual)
- Existing text memory systems on LOCOMO (e.g., Mem0, MemGPT, A-MEM)

### Eval Results
ScreenshotVQA: +35% accuracy over RAG baseline while reducing storage 99.9%. LOCOMO: 85.4% accuracy, claimed SOTA, surpassing existing baselines.

---

## Hierarchical Memory for High-Efficiency Long-Term Reasoning in LLM Agents (H-MEM)
**Venue**: arXiv preprint (also EACL 2026), 2025  |  **arXiv**: 2507.22925  |  **PDF**: https://arxiv.org/pdf/2507.22925

**Authors**: Haoran Sun, Shaoning Zeng

### Problem
Existing memory systems either rely on exhaustive similarity over dense vectors or on monolithic graphs, lacking structured organization and efficient retrieval at long horizons.

### Method & Innovation
H-MEM organizes memory hierarchically by degree of semantic abstraction; each memory vector carries a positional index pointing to its child sub-memories in the next layer. At inference, an index-based routing mechanism navigates layer by layer, skipping exhaustive similarity searches. Novelty: index-routed layered memory enabling sub-linear retrieval over a multi-level semantic hierarchy without training.

### Conclusion
H-MEM consistently beats five baselines on LoCoMo, with the largest gains on multi-hop and adversarial questions.

### Eval Data & Environment
LoCoMo dataset, five task categories (Single-Hop, Multi-Hop, Temporal, Open-Domain, Adversarial). Foundation models tested include Qwen, LLaMA, and DeepSeek variants.

### Baselines
- Five baseline memory methods (MemGPT, MemoryBank, ReadAgent, summary-based, dense-RAG class baselines)

### Eval Results
Average over LoCoMo categories: +14.98 F1 and +12.77 BLEU-1 over baselines. Multi-Hop questions: +21.25 F1, +17.65 BLEU-1. Adversarial: +16.71 F1, +12.03 BLEU-1.

---

## Nemori: Self-Organizing Agent Memory Inspired by Cognitive Science
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2508.03341  |  **PDF**: https://arxiv.org/pdf/2508.03341

**Authors**: Jiayan Nan, Wenquan Ma, Wenlong Wu, Yize Chen

### Problem
Existing agent memory systems use arbitrary granularity (chunks or facts) and passive rule-based extraction, limiting genuine learning and adaptation over time.

### Method & Innovation
Nemori is self-organizing with two cognition-inspired principles: (1) a Two-Step Alignment Principle drawn from Event Segmentation Theory autonomously partitions the conversational stream into semantically coherent episodes; (2) a Predict-Calibrate Principle (Free-energy Principle inspired) lets the agent learn from prediction errors, evolving its memory beyond fixed heuristics. Novelty: principled top-down event-boundary detection plus proactive prediction-driven learning, both training-free, replacing arbitrary chunking + passive extraction in prior memory systems.

### Conclusion
Nemori significantly outperforms prior SOTA on LoCoMo and LongMemEval, with advantage growing in longer contexts and beating full-context with far fewer tokens.

### Eval Data & Environment
LoCoMo and LongMemEval; tested in contexts up to ~105K tokens. Foundation LLMs include standard GPT-class backbones.

### Baselines
- Prior SOTA memory systems (Mem0, A-MEM, MemGPT, etc.)
- Full-context baseline

### Eval Results
Significantly outperforms SOTA on both benchmarks; surpasses Full Context baseline using 88% fewer tokens; demonstrates strong generalization to contexts up to 105K tokens. Exact per-category numbers in the paper tables.

---

## LiCoMemory: Lightweight and Cognitive Agentic Memory for Efficient Long-Term Reasoning
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2511.01448  |  **PDF**: https://arxiv.org/pdf/2511.01448

**Authors**: Zhibo Chu, Junjie Wang, Wenhao Hu, Lijian Wang, Xinrun Wang, Bo An

### Problem
Existing graph-based memory representations are flat and entangled (mixing semantics with topology), causing redundancy, unstructured retrieval, and high overhead.

### Method & Innovation
LiCoMemory introduces CogniGraph — a lightweight hierarchical graph that uses entities and relations purely as a semantic indexing layer (linking back to original textual sources rather than storing content inside nodes), combined with temporal- and hierarchy-aware search and integrated reranking. Novelty: decouples graph structure from content storage, treating the KG as a structural scaffold for indexing rather than a content store, enabling real-time update/retrieval with low latency.

### Conclusion
LiCoMemory outperforms strong agentic-memory baselines on LoCoMo and LongMemEval, with large gains specifically on temporal reasoning and multi-session questions, plus the lowest query latency.

### Eval Data & Environment
LoCoMo and LongMemEval long-term dialogue benchmarks. LLM backbones: Llama-3.1-70B-Instruct-Turbo and GPT-4o-mini.

### Baselines
- MemOS (second-best on LoCoMo)
- Mem0 (second-best on LongMemEval)
- Other agentic-memory baselines compared in the paper

### Eval Results
LoCoMo: surpasses MemOS across all subsets, with +19.2% accuracy on the Temporal-Reasoning subset. LongMemEval: +26.6% on Multi-Session and +15.9% on Temporal Reasoning over Mem0. Lowest/near-lowest query latency on both backbones.

---

## MemBench: Towards More Comprehensive Evaluation on the Memory of LLM-based Agents
**Venue**: Findings of ACL 2025, 2025  |  **arXiv**: 2506.21605  |  **PDF**: https://arxiv.org/pdf/2506.21605

**Authors**: Haoran Tan, Zeyu Zhang, Chen Ma, Xu Chen, Quanyu Dai, Zhenhua Dong

### Problem
Prior memory evaluations cover limited memory levels and interactive scenarios, and lack comprehensive metrics covering effectiveness/efficiency/capacity.

### Method & Innovation
MemBench is a benchmark suite that introduces two memory levels (factual memory and reflective memory) and two interactive scenarios (participation and observation), with metrics spanning accuracy (effectiveness), number of memory operations (efficiency), and performance degradation as memory grows (capacity). Novelty: first benchmark explicitly distinguishing factual vs reflective memory and combining capacity/efficiency metrics with accuracy across multiple agent interaction modes.

### Conclusion
MemBench reveals that current LLM-agent memory systems trade off effectiveness, efficiency, and capacity, providing fine-grained diagnoses across information extraction, multi-hop reasoning, knowledge updating, preference following, and temporal reasoning.

### Eval Data & Environment
MemBench dataset (released at https://github.com/import-myself/Membench). Multiple LLM-based agent memory systems tested.

### Baselines
- Existing memory frameworks for LLM-based agents (e.g., MemGPT, MemoryBank, ReadAgent class systems) evaluated on the new benchmark

### Eval Results
The paper reports per-method scores on accuracy/efficiency/capacity across factual and reflective memory; specific aggregate numbers not retrieved from accessible sources. The takeaway is that no existing system dominates on all three metric dimensions, motivating future graph-based memory work.

---

## MAGMA: A Multi-Graph based Agentic Memory Architecture for AI Agents
**Venue**: arXiv preprint, 2026  |  **arXiv**: 2601.03236  |  **PDF**: https://arxiv.org/pdf/2601.03236

**Authors**: Dongming Jiang, Yi Li, Guanpeng Li, Bingzhe Li

### Problem
Existing Memory-Augmented Generation systems rely on semantic similarity over monolithic memory, entangling temporal, causal, and entity information and producing weak interpretability and reasoning.

### Method & Innovation
MAGMA represents each memory item across four orthogonal graphs — semantic, temporal, causal, and entity — and frames retrieval as policy-guided traversal across these typed views, with query-adaptive selection and structured context construction. Novelty: explicit multi-graph (orthogonal relational views) memory plus an adaptive traversal policy that yields interpretable, transparent reasoning paths over typed relations, without training.

### Conclusion
MAGMA delivers state-of-the-art results on LoCoMo and LongMemEval, beating monolithic memory baselines with strong efficiency and transparency.

### Eval Data & Environment
LoCoMo and LongMemEval, including >100K-token contexts. Comparisons across recent agentic-memory baselines.

### Baselines
- Recent agentic-memory systems on LoCoMo / LongMemEval (Mem0, A-MEM, Zep, MemOS class baselines)
- Full-context baseline

### Eval Results
LoCoMo: overall judge score 0.7, beating baselines by 18.6% to 45.5%. LongMemEval: 61.2% average accuracy, generalizing to >100K-token contexts with 95% token reduction vs full context and 1.47s query latency (~40% faster than next-best baseline). Ablations confirm contributions of Adaptive Traversal Policy, Causal Links, Temporal Backbone, and Entity Links.

---

## Graph-Augmented Large Language Model Agents: Current Progress and Future Prospects
**Venue**: arXiv, 2025  |  **arXiv**: 2507.21407  |  **PDF**: https://arxiv.org/pdf/2507.21407

**Authors**: Yixin Liu, Yuxin Tang, Junyuan Mao, Jing Yang, Chen Gao, Yong Li, Shirui Pan

### Problem
Research on graph-augmented LLM agents (GLA) is rapidly growing and fragmented across planning, memory, tool use, and multi-agent coordination; no unified overview exists.

### Method & Innovation
This is a survey paper. It categorizes GLA methods by their function (planning, memory, tool usage) in LLM agent systems, then analyzes the role of graphs and graph-learning algorithms in each function and how GLA solutions support orchestration, efficiency, and trustworthiness for multi-agent systems. Novelty: first integrative survey explicitly framed around "graph-as-auxiliary-structure" for the full agent stack, including future research directions.

### Conclusion
The survey highlights that graph structures consistently improve continuity, structure, and coordination in LLM agent workflows and recommends future work on graph learning for memory/tool/MAS coordination.

### Eval Data & Environment
N/A — survey; no empirical evaluation.

### Baselines
- N/A — survey

### Eval Results
No empirical numbers. The paper synthesizes performance trends from surveyed GLA methods rather than running its own benchmarks.

---

## Enhancing LLM Planning for Robotics Manipulation through Hierarchical Procedural Knowledge Graphs (GraphMind / HP-KG)
**Venue**: NeurIPS, 2025  |  **arXiv**: N/A  |  **PDF**: https://openreview.net/pdf?id=8LO0vLRXpz

**Authors**: Anonymous, et al.

### Problem
LLM-driven robotic planners excel at simple pick-and-place but fail on complex manipulation tasks because procedural knowledge is implicit and inaccurate; large model scale is needed to compensate.

### Method & Innovation
GraphMind (also described as Hierarchical Procedural Knowledge Graphs, HP-KG) augments an LLM agent with an incrementally constructed knowledge graph used as graph-based memory for high-level action planning. The KG is organized hierarchically — tasks, steps, and actions — capturing procedural relationships. The agent builds the graph through environmental interactions and retrieves relevant subgraphs to plan in partially observable environments. Novelty: training-free hierarchical procedural KG plus graph-memory-based planner that enables smaller LLMs to perform complex robotic manipulation.

### Conclusion
Using a hierarchical procedural KG as external memory significantly improves planning success rate and efficiency, especially in long-horizon, partially observable environments, while reducing dependence on very large LLMs.

### Eval Data & Environment
Complex navigation/manipulation environments described as long-horizon and partially observable (TextWorld-like and/or simulated robotic settings used in NeurIPS submission). Exact benchmark names not fully reported in accessible sources.

### Baselines
- Standard LLM planners (no KG / RAG / full-history) — exact baseline list not reported in available sources.

### Eval Results
Experimental results indicate that employing the hierarchical procedural KG as external memory significantly enhances both the success rate and efficiency of LLM planning. Exact numeric improvements were not retrieved from accessible sources; see the OpenReview PDF for tables.

---

## Summary

Total papers processed: **22**.

Of these, ~17 report concrete numeric improvements that could be retrieved from accessible sources (Zep, Mem0, A-MEM, AriGraph, G-Memory, MemoTime, TReMu, MemInsight, MemQ, MemoryOS, HiAgent, LongMemEval, MIRIX, H-MEM, Nemori, LiCoMemory, MAGMA). For 4 papers (Associa, SGMem, MemBench, GraphMind) finer-grained baseline numbers were not fully recoverable due to access restrictions on arXiv/aclanthology/openreview from this environment; the qualitative results and high-level metrics are reported in their sections.
