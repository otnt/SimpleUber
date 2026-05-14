# Training-Free Knowledge Graph Agent Papers — Per-Paper Summaries

This document contains structured summaries for 9 training-free KG-agent papers from 2024–2025 conferences.

---

## Reasoning of Large Language Models over Knowledge Graphs with Super-Relations
**Venue**: ICLR, 2025  |  **arXiv**: 2503.22166  |  **PDF**: https://arxiv.org/pdf/2503.22166

**Authors**: Song Wang, Junhong Lin, Xiaojie Guo, Julian Shun, Jundong Li, Yada Zhu

### Problem
Existing LLM-based KG reasoning methods rely on greedy forward search, which leads to a high non-retrieval rate (failure to retrieve relevant facts) and limits answer accuracy on KGQA tasks.

### Method & Innovation
The paper proposes **ReKnoS**, which introduces the concept of **super-relations**: meta-level abstractions that summarize and connect multiple relational paths in the KG. Instead of selecting a single edge greedily, the LLM selects a super-relation that covers a bundle of equivalent or related paths, enabling **both forward and backward reasoning**. This expands the effective search space without increasing per-step LLM queries, lowers the non-retrieval rate, and improves retrieval efficiency. The framework is training-free and works as a wrapper around an LLM that interacts with the KG via super-relation prompting.

### Conclusion
ReKnoS consistently outperforms state-of-the-art training-free KG reasoning baselines (ToG, KG-Agent, StructGPT) across nine real-world KGQA datasets, with an average Hits@1 accuracy gain of about 2.92%.

### Eval Data & Environment
Nine real-world KGQA datasets, including GrailQA and other benchmarks over Freebase and Wikidata. Base LLMs include GPT-3.5-Turbo and GPT-4o-mini.

### Baselines
- ToG (Think-on-Graph)
- KG-Agent
- StructGPT
- Standard LLM prompting (Chain-of-Thought) variants

### Eval Results
Average accuracy gain of 2.92% over the strongest baselines across the 9 datasets. On GrailQA, ReKnoS reaches 71.9% Hits@1 with GPT-3.5 (vs. 68.9% for KG-Agent) and 80.5% with GPT-4o-mini (vs. 77.5% for KG-Agent). Improvements come from a reduced non-retrieval rate and additional answers recovered via backward reasoning.

---

## RuAG: Learned-rule-augmented Generation for Large Language Models
**Venue**: ICLR, 2025  |  **arXiv**: 2411.03349  |  **PDF**: https://arxiv.org/pdf/2411.03349

**Authors**: Yudi Zhang, Pei Xiao, Lu Wang, Chaoyun Zhang, Meng Fang, Yali Du, Yevgeniy Puzyrev, Randolph Yao, Si Qin, Qingwei Lin, Mykola Pechenizkiy, Dongmei Zhang, Saravan Rajmohan, Qi Zhang

### Problem
In-context learning and RAG are limited by context-window size, so large offline knowledge cannot be fully injected into LLM prompts; the authors aim to compress this knowledge into compact, interpretable first-order logic rules and inject those instead.

### Method & Innovation
**RuAG** is a three-phase training-free framework: (1) **LLM-based logic rule search formulation**, where the LLM uses commonsense to define head and body predicates; (2) **MCTS-based logic rule search**, which scales to large combinatorial spaces and mines first-order logic rules from offline data; (3) **Learned-rule-augmented generation**, where the mined rules are translated into natural language and added to the LLM prompt for downstream reasoning. The novelty is combining LLM commonsense with MCTS rule mining and using natural-language rule injection as a knowledge-graph-style augmentation that is interpretable, compact, and training-free for the target LLM.

### Conclusion
Injecting learned first-order logic rules consistently improves LLM performance across NLP, time-series, decision-making, and industrial tasks, outperforming standard ICL/RAG baselines that suffer from limited context windows.

### Eval Data & Environment
Public and private/industrial tasks: document-level relation extraction on DWIE, log-based anomaly detection on HDFS, the cooperative multi-agent Alice & Bob game (13x9 grid puzzle), and other industrial scenarios. Base LLM: GPT-4 (and other LLMs); MCTS is used over offline data prior to inference.

### Baselines
- Vanilla LLM prompting / Chain-of-Thought
- Standard in-context learning (ICL)
- Retrieval-Augmented Generation (RAG)
- BERT and other supervised baselines (for DWIE)
- LLM-only baselines (for log anomaly detection and the cooperative game)

### Eval Results
On DWIE document-level relation extraction, RuAG reaches an F1 of 60.42% with GPT-4, outperforming BERT and LLM-only baselines. On HDFS log anomaly detection, RuAG achieves F1 of 92.59%, beating all baselines. On the Alice & Bob cooperative game, RuAG improves win rate over LLM-only agents (reported win rate around 0.7). Improvements are consistent across NLP, time-series, decision-making, and industrial benchmarks; exact gains vary by task.

---

## Paths-over-Graph: Knowledge Graph Empowered Large Language Model Reasoning
**Venue**: WWW, 2025  |  **arXiv**: 2410.14211  |  **PDF**: https://arxiv.org/pdf/2410.14211

**Authors**: Xingyu Tan, Xiaoyang Wang, Qing Liu, Xiwei Xu, Xin Yuan, Wenjie Zhang

### Problem
Existing KG-augmented LLM reasoning struggles with multi-hop and multi-entity questions, often producing hallucinations and failing to use graph structure efficiently; this hurts accuracy and interpretability on complex KGQA.

### Method & Innovation
**Paths-over-Graph (PoG)** is a three-phase dynamic multi-hop path exploration method that retrieves chains of relational paths covering all topic entities and feeds them to the LLM as retrieval-augmented context. Its novelty is (i) being the first to perform multi-entity deep path detection on KGs for LLM reasoning, and (ii) introducing a three-step pruning pipeline that combines KG graph structure, LLM prompt-based filtering, and a pretrained semantic encoder (SBERT) to aggressively cut irrelevant paths before LLM scoring. This makes long-horizon, multi-entity reasoning both more accurate and more efficient than baselines that explore the graph greedily.

### Conclusion
On five KGQA benchmarks, PoG outperforms the previous SOTA (ToG) by an average of 18.9% accuracy, and PoG with GPT-3.5 even surpasses ToG with GPT-4 by up to 23.9%.

### Eval Data & Environment
Five KGQA benchmarks: WebQSP, CWQ (ComplexWebQuestions), GrailQA, WebQuestions, and SimpleQuestions (single-hop). Base LLMs: GPT-3.5-Turbo and GPT-4. Knowledge graph: Freebase.

### Baselines
- ToG (Think-on-Graph) with GPT-3.5 and GPT-4
- KD-CoT
- Chain-of-Thought / standard LLM prompting
- Other prompting and KG-augmented LLM baselines (e.g., StructGPT, KB-BINDER)

### Eval Results
Average accuracy improvement of 18.9% over ToG across the five datasets when using GPT-3.5-Turbo and GPT-4. Notably, PoG + GPT-3.5-Turbo outperforms ToG + GPT-4 by up to 23.9% on some datasets, demonstrating that the path-based retrieval + pruning yields gains larger than upgrading the LLM. Gains are largest on multi-entity / multi-hop datasets (CWQ, GrailQA).

---

## ReKG-MCTS: Reinforcing LLM Reasoning on Knowledge Graphs via Training-Free Monte Carlo Tree Search
**Venue**: ACL Findings, 2025  |  **arXiv**: 2506.13241  |  **PDF**: https://aclanthology.org/2025.findings-acl.484.pdf

**Authors**: Xiaozhuang Song, Shufei Zhang, Tianshu Yu

### Problem
Existing LLM KG reasoning methods rely on supervised pipelines or simple iterative CoT prompting, which generalize poorly to new KGs and under-utilize the rich semantic and structural information available in KGs.

### Method & Innovation
**ReKG-MCTS** frames KG reasoning as a decision-making problem and applies Monte Carlo Tree Search in a training-free way. The framework has four phases: (1) **UCB-based node selection** for balancing exploration and exploitation over KG paths, (2) **path expansion** constrained by KG structure (only valid edges are considered), (3) **LLM-guided MC rollouts** where the LLM provides semantic value estimates for partial reasoning paths, and (4) **value backpropagation** to update node statistics. The novelty is the synergy between structured MCTS search on the KG and an LLM acting as a semantic evaluator/rollout policy, requiring no fine-tuning.

### Conclusion
On WebQSP and CWQ, ReKG-MCTS outperforms existing training-free KG reasoning methods and reaches competitive Hits@1 versus fine-tuned baselines without any task-specific training.

### Eval Data & Environment
WebQSP and CWQ (Freebase-backed KGQA). Base LLMs include both proprietary (e.g., GPT-4) and open-source models such as Llama3-8B used for rollouts and final-answer generation.

### Baselines
- Training-free LLM+KG methods: ToG, StructGPT, KD-CoT
- Fine-tuned KG-augmented LLM methods (e.g., RoG, KG-Agent) used as reference upper bounds
- Plain LLM Chain-of-Thought

### Eval Results
On WebQSP and CWQ, ReKG-MCTS posts the best Hits@1 among training-free baselines and is competitive with fine-tuned methods. The paper reports consistent gains over ToG across LLM backbones (GPT-class and Llama3-8B). Exact per-dataset numbers from the results table are not in the available excerpts, but the headline is that training-free MCTS reasoning closes most of the gap to supervised systems on both benchmarks.

---

## AGENTiGraph: A Multi-Agent Knowledge Graph Framework for Interactive, Domain-Specific LLM Chatbots
**Venue**: CIKM, 2025  |  **arXiv**: 2508.02999  |  **PDF**: https://arxiv.org/pdf/2508.02999

**Authors**: Xinjie Zhao, Rayan Sayyad Yousefi, Hugo Almeida, Yutaka Matsuo, Chanjun Park, Irene Li

### Problem
Domain-specific LLM chatbots struggle to interact with structured knowledge bases because users without expertise cannot write SPARQL/Cypher, and existing KG-LLM pipelines are not designed for incremental, multi-turn user interactions or visual editing.

### Method & Innovation
**AGENTiGraph** (Adaptive Generative ENgine for Task-based Interaction and Graphical Representation) is a training-free multi-agent system organized around a shared knowledge graph. Agents are dedicated to intent classification, task planning, KG operations (query, update), and automatic knowledge integration, and they collaborate to answer user questions and incrementally extend the KG via natural language only. The novelty is the visual, end-user-oriented design — non-technical users can grow a KG conversationally without writing queries — combined with modular agent specialization that allows the system to handle a heterogeneous mix of QA, update, and visualization tasks in a single dialogue.

### Conclusion
On a 3,500-query educational benchmark, AGENTiGraph reaches 95.12% task classification accuracy and 90.45% execution success, substantially beating strong zero-shot baselines and demonstrating that multi-agent orchestration over a KG generalizes across diverse user intents.

### Eval Data & Environment
Custom 3,500-query benchmark derived from the TutorQA educational scenario, covering six predefined task types plus 500 free-form queries. Queries were generated by LLMs and verified by NLP experts and educators. Base LLM: GPT-class models used as the backbone for agents.

### Baselines
- Strong zero-shot LLM prompting baselines (single-LLM)
- Standard KG-QA baselines and task-routing baselines without multi-agent specialization
- (Specific named systems not enumerated in available excerpts)

### Eval Results
95.12% intent classification accuracy and 90.45% execution success on the 3,500-query TutorQA-derived benchmark, outperforming strong zero-shot baselines (specific baseline numbers not reported in available sources). The system also demonstrates qualitative gains in multi-turn dialogue and incremental KG building.

---

## AgREE: Agentic Reasoning for Knowledge Graph Completion on Emerging Entities
**Venue**: arXiv, 2025  |  **arXiv**: 2508.04118  |  **PDF**: https://arxiv.org/pdf/2508.04118

**Authors**: Ruochen Zhao, Simone Conia, Eric Peng, Min Li, Saloni Potdar

### Problem
Open-domain KG completion fails for emerging and unpopular entities because parametric LLM knowledge is stale, pre-constructed queries are brittle, and single-step retrieval cannot gather enough up-to-date evidence.

### Method & Innovation
**AgREE** is a training-free agentic framework that iteratively interleaves retrieval actions and multi-step reasoning to dynamically construct rich KG triplets for new entities. It uses two retrievers — a Wikipedia API basic retriever and a Google Search API advanced retriever — and a reasoning LLM that decides when to query, what to query, and how to compose retrieved snippets into triple predictions. The agent is implemented in LangGraph with DeepSeek-V3 as the backbone. The novelty is iterative agentic retrieval (instead of single-shot RAG), zero training requirement for emerging entities, and a new evaluation methodology + emerging-entity benchmark that address pitfalls in standard KGC evaluation.

### Conclusion
With zero training, AgREE significantly outperforms existing KGC methods, particularly on emerging entities — by up to 13.7% Hits@N on standard KGC datasets and up to 45.3% on the new emerging-entities benchmark.

### Eval Data & Environment
Two standard KGC datasets (over Wikidata, including Wikidata5M-style data) plus a newly constructed Emerging-Entities benchmark targeting entities not seen during LLM pretraining. Backbone LLM: DeepSeek-V3 (MoE). Tooling: LangGraph; retrievers via Wikipedia and Google Search APIs.

### Baselines
- Fully-trained KGC models (parametric LLM-based and supervised baselines)
- Single-step retrieval / RAG KGC pipelines
- Pretrained LM-based KGC baselines

### Eval Results
Up to 13.7% improvement in Hits@N over previous methods on standard KGC datasets, despite using zero training data. On the new emerging-entities benchmark, AgREE outperforms baselines by up to 45.3% Hits@N, validating that iterative retrieval + multi-step reasoning is essential for unseen entities.

---

## Agent-as-a-Graph: Knowledge Graph-Based Tool and Agent Retrieval for LLM Multi-Agent Systems
**Venue**: arXiv, 2025  |  **arXiv**: 2511.18194  |  **PDF**: https://arxiv.org/pdf/2511.18194

**Authors**: Bowen Wei, Sheng Zhang, Yifan Yu, Yawen Wu, Hao Cheng, Bryan Catanzaro, Mohit Iyyer, Hoifung Poon

### Problem
LLM multi-agent systems with hundreds of sub-agents and thousands of tools must, given a query, retrieve both the right sub-agent and the right tool — but existing retrievers treat tools in isolation and ignore the agent-tool dependency structure, hurting retrieval quality.

### Method & Innovation
**Agent-as-a-Graph** represents tools and their parent agents jointly as a knowledge graph: tools and agents become nodes, and metadata edges express which agent exposes which tools. Retrieval is two-stage: (1) vector search retrieves candidate tool and agent nodes; (2) a **type-specific weighted Reciprocal Rank Fusion (wRRF)** reranks tools and agents separately, after which parent agents are traversed in the KG to assemble the final agent set. The novelty is treating agents and tools as co-equal graph nodes with explicit metadata edges, plus the type-aware wRRF reranking that exploits this structure — all training-free.

### Conclusion
On LiveMCPBench, Agent-as-a-Graph beats prior state-of-the-art tool/agent retrievers by up to +20.8% Recall@5 and +18.0% nDCG@5; the wRRF reranking adds an extra ~2.4% on top of non-reranked retrieval.

### Eval Data & Environment
LiveMCPBench (Model Context Protocol tool/agent retrieval benchmark). Evaluation across eight embedding models: Vertex AI text-embedding-005, Gemini-embedding-001, Amazon Titan v1 and v2, OpenAI ada-002, 3-small, 3-large, and All-MiniLM-L6-v2.

### Baselines
- BM25 (lexical baseline)
- Standard RRF (rank fusion baseline)
- MCPZero (SOTA agent retriever)
- ScaleMCP (SOTA agent retriever)

### Eval Results
Agent-as-a-Graph achieves Recall@5 = 0.85 and nDCG@5 = 0.48 with optimal type-specific wRRF weighting, improving Recall@5 from 0.74 (ScaleMCP) to 0.85 (+14.9–20.8% depending on embedding) and nDCG@5 from 0.40 to 0.47–0.48 (+14.6–18.0%). The wRRF reranking alone contributes a ~2.4% lift over non-reranked retrieval. Gains are consistent across all eight embedding models.

---

## ODA: Observation-Driven Agent for integrating LLMs and Knowledge Graphs
**Venue**: ACL Findings, 2024  |  **arXiv**: 2404.07677  |  **PDF**: https://arxiv.org/pdf/2404.07677

**Authors**: Lei Sun, Zhengwei Tao, Youdi Li, Hiroshi Arakawa

### Problem
Most LLM+KG integrations drive task-solving purely from the LLM's analysis of the question, ignoring the rich knowledge already encoded in the KG; this under-uses graph context and limits reasoning quality on KGQA.

### Method & Innovation
**ODA** is a training-free agent that cycles through **Observation → Action → Reflection**: at each step, the agent globally observes relevant KG subgraphs, takes an action (e.g., expand a neighbor or commit an answer), and reflects on whether the chosen path was correct. To control the exponential explosion of subgraph size during observation, ODA introduces a **recursive observation mechanism** that progressively narrows down what the agent looks at. Observed KG facts are passed into both the action and reflection modules, so the KG content actively shapes agent behavior rather than just being queried for facts at the end.

### Conclusion
ODA achieves state-of-the-art accuracy on multiple KBQA datasets, with notable improvements of 12.87% and 8.9% over the strongest prior prompt-based baselines on certain datasets.

### Eval Data & Environment
Four KBQA datasets: QALD10-en, Creak, T-REx, and Zero-Shot RE (over Wikidata-style KGs). Base LLM: GPT-class (GPT-3.5 / GPT-4); training-free.

### Baselines
- Prompt-based LLM+KG baselines (e.g., StructGPT, KD-CoT, ToG-style approaches)
- Plain LLM prompting / CoT
- Fine-tuned KG-augmented LLM baselines for reference

### Eval Results
ODA improves over the strongest prompt-based baselines by 65.50% on Zero-Shot RE and 23.77% on QALD10-en, and by 12.87% / 8.9% on other datasets reported in the abstract. Versus fine-tuned baselines, ODA reports gains of 21.27% on QALD10-en, 6.99% on Creak, and 50.56% on Zero-Shot RE.

---

## Plan-on-Graph: Self-Correcting Adaptive Planning of Large Language Model on Knowledge Graphs
**Venue**: NeurIPS, 2024  |  **arXiv**: 2410.23875  |  **PDF**: https://arxiv.org/pdf/2410.23875

**Authors**: Liyi Chen, Panrong Tong, Zhongming Jin, Ying Sun, Jieping Ye, Hui Xiong

### Problem
Existing KG-augmented LLM methods pre-define the exploration breadth and assume flawless navigation; they cannot adaptively widen the search based on question semantics or self-correct erroneous reasoning paths, capping both efficiency and accuracy.

### Method & Innovation
**Plan-on-Graph (PoG)** is the first training-free KG-augmented LLM paradigm with **self-correcting adaptive planning**. It decomposes a question into sub-objectives, then loops over: adaptively explore reasoning paths in the KG, update a working memory, and reflect on whether to self-correct erroneous paths. Three mechanisms — **Guidance** (sub-objective decomposition), **Memory** (running state of explored facts), and **Reflection** (error detection and rollback) — work together to set the search breadth adaptively. The novelty is the integration of reflection-based self-correction with adaptive KG exploration in a fully training-free LLM agent.

### Conclusion
PoG significantly outperforms training-free baselines like ToG on CWQ, WebQSP, and GrailQA, while being much more efficient; with GPT-4 it even beats fine-tuned KG-augmented baselines.

### Eval Data & Environment
Three multi-hop KGQA datasets: CWQ (ComplexWebQuestions), WebQSP, and GrailQA. Base LLMs: GPT-3.5-Turbo and GPT-4. Knowledge graph: Freebase.

### Baselines
- ToG (Think-on-Graph) — primary training-free SOTA
- StructGPT, KD-CoT, and other prompt-based KG-LLM baselines
- Fine-tuned KG-augmented LLM methods (RoG, KG-Agent) as reference upper bounds
- Standard CoT prompting

### Eval Results
PoG outperforms ToG on all three benchmarks (CWQ, WebQSP, GrailQA), with PoG + GPT-4 surpassing fine-tuned KG-augmented baselines on GrailQA and PoG + GPT-3.5 surpassing fine-tuned baselines on GrailQA. Efficiency: PoG uses at least 40.8% fewer LLM calls than ToG, ~4.6% fewer input tokens and 76.2% fewer output tokens on CWQ, and achieves a >4× speedup on CWQ and GrailQA. Exact per-dataset Hits@1 numbers from the results tables are not in the available excerpts.

---
