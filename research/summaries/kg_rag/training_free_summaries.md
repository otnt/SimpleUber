# Training-Free Knowledge Graph powered RAG — Summaries (Part 1)

## Towards Practical GraphRAG: Efficient Knowledge Graph Construction and Hybrid Retrieval at Scale
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2507.03226  |  **PDF**: https://arxiv.org/pdf/2507.03226

**Authors**: Congmin Min, et al.

### Problem
Enterprise adoption of GraphRAG is constrained by the high cost of LLM-based knowledge graph extraction and the complexity of graph traversal, limiting deployment at scale on unstructured text corpora.

### Method & Innovation
The framework introduces two core innovations. First, a knowledge graph construction pipeline that replaces expensive LLM extraction with classical dependency parsing, recovering 94% of LLM-based extraction quality at a fraction of the compute cost. Second, a hybrid retrieval scheme that fuses vector similarity with graph traversal through Reciprocal Rank Fusion (RRF) and maintains separate embeddings for entities, chunks, and relations to enable multi-granular matching. Together these design choices make GraphRAG practical in production environments without retraining.

### Conclusion
A dependency-parsing-based KG plus hybrid (vector + graph) retrieval can match LLM-extracted GraphRAG quality at far lower cost while still beating vanilla vector RAG.

### Eval Data & Environment
Two proprietary enterprise datasets focused on legacy code migration. Evaluation uses LLM-as-Judge. The exact backbone LLM is not specified in available sources; hardware is not reported.

### Baselines
- LLM-based KG construction (compared on extraction quality)
- Vanilla vector retrieval baseline (for end-to-end RAG)

### Eval Results
Dependency-parsing KG achieves 61.87% vs. 65.83% for LLM-based extraction (94% recovery). The end-to-end hybrid retriever yields up to +15% and +4.35% improvements over vanilla vector RAG on the two enterprise datasets under LLM-as-Judge evaluation.

---

## Query-Driven Multimodal GraphRAG: Dynamic Local Knowledge Graph Construction for Online Reasoning
**Venue**: ACL 2025 Findings, 2025  |  **arXiv**: (none)  |  **PDF**: https://aclanthology.org/2025.findings-acl.1100.pdf

**Authors**: Chenyang Bu, Guojie Chang, Zihao Chen, CunYuan Dang, Zhize Wu, Yi He, Xindong Wu

### Problem
Existing RAG/GraphRAG systems rely on a fixed, pre-built knowledge base and struggle to integrate heterogeneous multimodal sources, which causes them to underperform on complex multimodal queries that require ad-hoc evidence.

### Method & Innovation
The framework dynamically builds a query-specific local KG on the fly. It (1) derives a graph pattern from query semantics to drive entity/relation extraction from text and tables, (2) executes a multi-path retrieval strategy that pinpoints core knowledge through complementary paths, and (3) opportunistically retrieves and inserts missing multimodal information (images) when needed. The KG construction is text-prompt driven and remains training-free.

### Conclusion
A query-driven, dynamically constructed local multimodal KG achieves SOTA among unsupervised multimodal RAG methods, especially when cross-modal reasoning is required.

### Eval Data & Environment
MultimodalQA and WebQA benchmarks (text + table + image QA). LLMs are used for entity/relation extraction and reasoning; the exact backbone LLM is not detailed in available sources.

### Baselines
- Naive RAG (text-only)
- Standard multimodal RAG approaches
- Other unsupervised multimodal QA systems

### Eval Results
Achieves state-of-the-art among unsupervised competitors on MultimodalQA and WebQA, with the largest gains reported on cross-modal complex queries. Exact percentage deltas vs. each baseline are not reported in available sources.

---

## MMGraphRAG: Bridging Vision and Language with Interpretable Multimodal Knowledge Graphs
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2507.20804  |  **PDF**: https://arxiv.org/pdf/2507.20804

**Authors**: Wang et al.

### Problem
GraphRAG remains text-centric because constructing fine-grained Multimodal KGs (MMKGs) and aligning visual and textual entities is difficult, limiting performance on document QA that mixes charts, figures, and text.

### Method & Innovation
MMGraphRAG combines visual scene graphs with text KGs through a novel cross-modal fusion. It introduces SpecLink, a spectral-clustering-based cross-modal entity linking algorithm, and uses path-based retrieval to guide generation. The authors release CMEL, a dataset for fine-grained multi-entity alignment, and the system is training-free, plugging into existing LLMs.

### Conclusion
By fusing scene graphs and text KGs with spectral-clustering-based linking, MMGraphRAG substantially outperforms naive and graph-based RAG on document QA, especially for multimodal queries and unanswerable detection.

### Eval Data & Environment
DocBench and MMLongBench multimodal document QA benchmarks; CMEL released for entity alignment. LLM backbone uses MLLMs (e.g., GPT-4o-class models per the repo); hardware not specified.

### Baselines
- NaiveRAG
- GraphRAG (Microsoft)
- Leading multimodal RAG methods (unspecified by name in sources)

### Eval Results
On DocBench: 76.8% overall accuracy vs. NaiveRAG 59.5% and GraphRAG 52.3% (+17.3 pts over NaiveRAG); 88.7% accuracy on multimodal sub-queries. On MMLongBench: 38.8% accuracy and 34.1% F1, new SOTA. On unanswerable-question identification, MMGraphRAG reaches 35.1% vs. 5.8% for the leading multimodal RAG (~6x improvement).

---

## EventRAG: Enhancing LLM Generation with Event Knowledge Graphs
**Venue**: ACL 2025, 2025  |  **arXiv**: (none)  |  **PDF**: https://aclanthology.org/2025.acl-long.830.pdf

**Authors**: Zairun Yang, Yilin Wang, Zhengyan Shi

### Problem
Standard RAG and entity-centric KG-RAG capture surface facts but miss temporal and logical dependencies across events, which causes weak multi-hop reasoning and inconsistent generation.

### Method & Innovation
EventRAG first constructs an Event Knowledge Graph (EKG) by extracting events from documents, merging semantically equivalent event nodes across documents, and expanding under-connected relationships. It then uses an iterative retrieval-and-inference loop that explicitly traverses temporal and logical relations among events. Unlike standard chunk-level RAG, key information is represented as inter-connected event nodes that support multi-step reasoning. The pipeline is training-free.

### Conclusion
Event-level graphs plus iterative event-aware retrieval yield large gains in multi-hop and logically dependent QA over baseline RAG systems.

### Eval Data & Environment
UltraDomain and MultiHopRAG benchmarks. Evaluated via LLM-judge across generation effectiveness, logical consistency, and multi-hop reasoning. Backbone LLM not specified in available sources.

### Baselines
- Vanilla RAG
- GraphRAG (Microsoft) and entity-KG-based RAG variants
- Multi-hop QA RAG baselines used in MultiHopRAG benchmark

### Eval Results
EventRAG wins on a head-to-head win-rate evaluation across four datasets and six evaluation dimensions, with consistent gains in generation quality, logical consistency, and multi-hop accuracy. Exact per-metric deltas vs. each baseline are not reported in available sources.

---

## Knowledge Graph-Guided Retrieval Augmented Generation (KG2RAG) — NAACL listing
**Venue**: NAACL 2025, 2025  |  **arXiv**: (none — see arXiv variant below)  |  **PDF**: https://aclanthology.org/2025.naacl-long.449/

**Authors**: NJU Web Soft Group (Xiangrong Zhu, Yuexiang Xie, Yi Liu, et al.)

### Problem
Existing RAG retrieves isolated relevant chunks via semantic similarity and ignores fact-level relationships between chunks, which limits diversity, coherence, and multi-hop QA quality.

### Method & Innovation
KG2RAG uses a KG as an auxiliary structure to organize retrieval. After standard semantic retrieval produces seed chunks, a KG-guided chunk expansion step traverses fact-level relationships to add relevant supporting chunks, and a KG-based chunk organization step reorders them into coherent paragraphs for the LLM. The framework is training-free.

### Conclusion
Explicit graph guidance over chunk relations consistently improves both retrieval precision and generation factuality compared to chunk-only RAG.

### Eval Data & Environment
HotpotQA and variants (distractor and fullwiki settings), plus additional multi-hop QA datasets (MuSiQue, TriviaQA per the GitHub README). LLM backbone not exhaustively specified; code at github.com/nju-websoft/KG2RAG.

### Baselines
- Vanilla / chunk-only RAG
- Other state-of-the-art RAG-based multi-hop QA approaches

### Eval Results
KG2RAG outperforms RAG-based baselines on both response-quality and retrieval-quality tables in the paper (Table 1 & 2), with consistent wins across HotpotQA variants and other multi-hop datasets. Exact numeric deltas vs. strongest baseline not reported in available sources.

---

## Think-on-Graph 2.0: Deep and Faithful Large Language Model Reasoning with Knowledge-guided Retrieval Augmented Generation
**Venue**: ICLR 2025, 2025  |  **arXiv**: 2407.10805  |  **PDF**: https://arxiv.org/pdf/2407.10805

**Authors**: Shengjie Ma, Chengjin Xu, Xuhui Jiang, et al.

### Problem
Standard RAG retrieves shallow context that is often insufficient for complex multi-hop reasoning, while pure KG-only methods miss the rich unstructured context needed to ground answers faithfully.

### Method & Innovation
ToG-2 is a hybrid, tightly coupled framework that alternates between graph retrieval (over a KG) and context retrieval (over passages). It uses the KG to link documents via entities for depth, while using passages as entity contexts to make graph retrieval more precise. The loop iterates until enough evidence is gathered, then the LLM generates the answer. The method is training-free and plug-and-play across LLMs.

### Conclusion
Iterative tight coupling between KG traversal and document retrieval lets ToG-2 reach SOTA on 6 out of 7 knowledge-intensive datasets with GPT-3.5, and lifts small open-source LLMs to GPT-3.5-class performance.

### Eval Data & Environment
Seven datasets including AdvHotpotQA, HotpotQA, WebQSP, QALD-10-en, Zero-Shot RE (slot filling), FEVER, Creak, plus a 2023 Chinese financial QA dataset. Backbones: GPT-3.5-turbo (main), GPT-4o, Llama3-8B, Qwen2-7B, LLAMA-2-13B.

### Baselines
- Vanilla RAG (chunk-based)
- ToG (v1)
- Chain-of-Knowledge (CoK)
- Other KG-augmented LLM reasoning baselines

### Eval Results
SOTA on 6/7 datasets with GPT-3.5. Improves over ToG by +16.6% on AdvHotpotQA, +4.93% on WebQSP, +3.85% on QALD-10-en. On FEVER reaches 63.1% (close to best CoK); on Creak 93.5% vs. ToG 93.8%. Lifts Llama-2-13B to roughly GPT-3.5-direct quality.

---

## Reasoning-Enhanced Healthcare Predictions with Knowledge Graph Community Retrieval (KARE)
**Venue**: ICLR 2025, 2025  |  **arXiv**: 2410.04585  |  **PDF**: https://arxiv.org/pdf/2410.04585

**Authors**: Pengcheng Jiang, Cao Xiao, Minhao Jiang, et al.

### Problem
LLMs hallucinate and lack fine-grained clinical knowledge, while standard RAG over medical text retrieves sparse or irrelevant chunks, which hurts clinical prediction quality and interpretability.

### Method & Innovation
KARE introduces three innovations: (1) a dense multi-source medical KG built from biomedical databases, clinical literature, and LLM-generated insights, organized via hierarchical graph community detection and summarization; (2) a dynamic community-level retrieval mechanism that enriches each patient's context with focused, multi-faceted medical insights; and (3) a reasoning-enhanced prediction module that uses the enriched context to produce accurate and interpretable predictions. The framework is training-free with respect to the LLM.

### Conclusion
KG community-level retrieval combined with explicit reasoning prompts substantially outperforms strong clinical-LLM baselines on mortality and readmission prediction.

### Eval Data & Environment
MIMIC-III and MIMIC-IV for mortality and readmission prediction. Uses LLMs (GPT-4-class) on top of biomedical knowledge graphs.

### Baselines
- Leading EHR prediction models (per the paper's main table)
- Vanilla RAG with medical corpora
- Standard medical LLM prompting

### Eval Results
KARE outperforms leading models by up to +10.8% to +15.0% on MIMIC-III and +12.6% to +12.7% on MIMIC-IV for mortality and readmission tasks.

---

## From RAG to Memory: Non-Parametric Continual Learning for Large Language Models (HippoRAG 2)
**Venue**: ICML 2025, 2025  |  **arXiv**: 2502.14802  |  **PDF**: https://arxiv.org/pdf/2502.14802

**Authors**: Bernal Jiménez Gutiérrez, Yiheng Shu, Weijian Qi, et al.

### Problem
Vector-RAG mimics only a shallow slice of long-term memory; existing graph-augmented RAG improves multi-hop / associative reasoning but typically regresses on simple factual recall, undermining its use as a continual-memory substitute.

### Method & Innovation
HippoRAG 2 extends HippoRAG's Personalized PageRank (PPR) over a passage+KG graph with deeper passage integration and more effective online LLM use during query-time graph construction. The result is a single framework that wins on factual, sense-making, and associative memory simultaneously. The system is non-parametric and training-free, supporting continual knowledge updates by simply adding nodes/edges.

### Conclusion
HippoRAG 2 is the first KG-augmented RAG that wins comprehensively over standard dense RAG on factual, sense-making, and associative tasks, pushing closer to human-like long-term memory.

### Eval Data & Environment
Factual: NaturalQuestions, PopQA. Sense-making: NarrativeQA. Associativity / multi-hop: MuSiQue, 2Wiki, HotpotQA, LV-Eval. Compared against state-of-the-art embedding models and graph RAGs.

### Baselines
- Standard dense RAG (state-of-the-art embedding retriever)
- HippoRAG (v1)
- GraphRAG (Microsoft)
- RAPTOR
- LightRAG

### Eval Results
+7% improvement on associative-memory tasks over the strongest embedding baseline, while also exceeding it on factual and sense-making memory. Per-dataset numbers in the paper show HippoRAG 2 leading on all three category averages.

---

## HyperGraphRAG: Retrieval-Augmented Generation via Hypergraph-Structured Knowledge Representation
**Venue**: NeurIPS 2025, 2025  |  **arXiv**: 2503.21322  |  **PDF**: https://arxiv.org/pdf/2503.21322

**Authors**: Haoran Luo, Haihong E, Guanting Chen, et al.

### Problem
Existing graph-based RAG can only encode binary edges, so n-ary real-world facts must be decomposed lossily into pairs, weakening retrieval and reasoning over complex relations.

### Method & Innovation
HyperGraphRAG represents n-ary facts as hyperedges. It introduces (1) an LLM-based n-ary relation extraction pipeline to turn raw text into a knowledge hypergraph, (2) a bipartite-graph storage strategy backed by vector indices over both hyperedges and entities, and (3) a hybrid retrieval that mixes hyperedge and entity retrieval and then expands via local hypergraph reasoning. The retrieved hypergraph is fed back into LLM generation. Construction is LLM-driven but the retrieval/generation pipeline is training-free.

### Conclusion
Modeling n-ary relations as hyperedges yields measurable accuracy and efficiency gains over both vanilla RAG and prior graph-based RAGs across diverse domains.

### Eval Data & Environment
Four domain corpora: Medicine (hypertension guidelines), Agriculture (UltraDomain), Computer Science, and Law. Code at github.com/LHRLAB/HyperGraphRAG.

### Baselines
- Standard chunk-based RAG (NaiveRAG)
- GraphRAG (Microsoft)
- LightRAG
- Other prior graph-based RAG systems

### Eval Results
HyperGraphRAG reports improvements of +7 F1 or more over the strongest baseline on Medicine and Law, with stable advantages in Agriculture and CS, plus better retrieval efficiency than GraphRAG (which has high construction overhead).

---

## ReMindRAG: Low-Cost LLM-Guided Knowledge Graph Traversal for Efficient RAG
**Venue**: NeurIPS 2025, 2025  |  **arXiv**: 2510.13193  |  **PDF**: https://arxiv.org/pdf/2510.13193

**Authors**: Yifan Hu, Wei Wang, Kun Wang

### Problem
LLM-guided KG traversal RAG systems balance effectiveness poorly against cost: either they spend many tokens exploring the graph or they retrieve too little, leading to high latency or low accuracy.

### Method & Innovation
ReMindRAG combines node exploration, node exploitation, and a novel "memory replay" mechanism, in which past traversal experiences are stored directly in the KG edge embeddings — analogous to how parameters memorize knowledge in an LLM, but train-free. The framework self-corrects erroneous paths via the LLM while learning to skip already-explored unhelpful edges, amortizing exploration cost across queries.

### Conclusion
Memory-replay-based traversal gives 5-10% accuracy gains over strong KG-RAG baselines while cutting query cost roughly in half, with token usage dropping by ~58.8% after multi-turn warm-up.

### Eval Data & Environment
Multiple multi-hop QA / KG-RAG benchmarks (per OpenReview). LLM backbone not exhaustively specified in available sources. Code at github.com/kilgrims/ReMindRAG.

### Baselines
- Vanilla RAG
- GraphRAG, ToG, and other LLM-guided KG traversal RAG systems
- Embedding-based KG retrieval baselines

### Eval Results
Performance gains of +5% to +10% over the strongest baselines; ~50% reduction in average per-query cost; after multi-turn memorization, ~58.8% token reduction vs. the first-trial cost on average.

---

## RAG4GFM: Bridging Knowledge Gaps in Graph Foundation Models through Graph Retrieval Augmented Generation
**Venue**: NeurIPS 2025 (Oral), 2025  |  **arXiv**: (none)  |  **PDF**: https://neurips.cc/virtual/2025/loc/san-diego/poster/115562

**Authors**: Xingliang Wang, Zemin Liu, Junxiao Han, Shuiguang Deng (per OpenReview / NeurIPS)

### Problem
Graph Foundation Models (GFMs) have impressive zero/few-shot ability across graph tasks but cannot easily incorporate new knowledge after pretraining, and they suffer from reasoning faithfulness issues on tasks requiring up-to-date or external graph evidence.

### Method & Innovation
RAG4GFM introduces a RAG paradigm tailored to GFMs. It combines (1) a hierarchical multi-level graph index supporting log-time retrieval across multiple granularities, (2) a task-aware retriever with adaptive strategies for node/edge/graph-level tasks, and (3) a graph-fusion module that fuses retrieved graph features with the query and augments the topology with sparse adjacency links that preserve structural+semantic proximity. The retrieval/fusion stack is training-free with respect to the GFM.

### Conclusion
A RAG pipeline specifically designed for GFMs significantly improves both knowledge-updating efficiency and reasoning faithfulness across diverse GFM applications.

### Eval Data & Environment
Diverse GFM benchmarks spanning node, edge, and graph-level tasks. Specific GFM backbones and datasets not fully detailed in publicly available sources; code at github.com/Matrixmax/RAG4GFM.

### Baselines
- Base Graph Foundation Models without retrieval
- Naive graph retrieval baselines
- Other GraphRAG-for-graphs prior work

### Eval Results
RAG4GFM yields significant improvements over base GFMs on knowledge-updating efficiency and reasoning faithfulness across node-, edge-, and graph-level tasks. Exact numeric deltas not reported in available sources.

---

## NeuroPath: Neurobiology-Inspired Path Tracking and Reflection for Semantically Coherent Retrieval
**Venue**: NeurIPS 2025, 2025  |  **arXiv**: 2511.14096  |  **PDF**: https://arxiv.org/pdf/2511.14096

**Authors**: Kenny Caty et al.

### Problem
Graph-based RAG often loses semantic coherence in subgraph construction and pulls in noisy irrelevant nodes during multi-hop traversal, leading to brittle multi-hop reasoning.

### Method & Innovation
Inspired by place-cell-based navigation planning, NeuroPath performs Dynamic Path Tracking — goal-directed semantic-path tracking and pruning over the constructed KG — followed by Post-retrieval Completion, a second-stage retrieval that uses intermediate reasoning together with the original query to refine the goal and fill in any missing nodes/edges along the reasoning path. The two-stage design improves noise reduction and coherence without any training.

### Conclusion
Goal-directed semantic-path tracking plus a reflection-based completion stage delivers large recall improvements over advanced graph-based RAGs on multi-hop QA.

### Eval Data & Environment
MuSiQue, 2WikiMultiHopQA, HotpotQA. Code at github.com/KennyCaty/NeuroPath.

### Baselines
- Naive (chunk-level) RAG
- Graph-based RAGs including HippoRAG 2 (current SOTA)
- Iter-based RAG baselines

### Eval Results
Average improvements of +16.3% Recall@2 and +13.5% Recall@5 over advanced graph-based RAG. Vs. iter-based baselines: +8.6% Recall@2 and +10.2% Recall@5. Beats all baselines on MuSiQue and 2Wiki; slightly trails HippoRAG 2 only on HotpotQA.

---

## Knowledge Graph-Guided Retrieval Augmented Generation (KG2RAG, arXiv variant)
**Venue**: NAACL 2025, 2025  |  **arXiv**: 2502.06864  |  **PDF**: https://arxiv.org/pdf/2502.06864

**Authors**: Xiangrong Zhu, Yuexiang Xie, Yi Liu, et al.

### Problem
Semantic-based RAG retrieves isolated chunks and ignores fact-level relations between them, hurting answer diversity and coherence in multi-hop QA.

### Method & Innovation
KG2RAG augments standard semantic retrieval with KG-guided chunk expansion (use the KG to bring in chunks linked by fact-level relations to the seed chunks) and KG-based chunk organization (re-arrange retrieved chunks into well-organized paragraphs using the KG). It is training-free and complementary to any base dense retriever. The paper's main novelty is using the KG not as the primary index but as a structural rearranger and expander of vector-retrieved chunks.

### Conclusion
Adding KG-guided expansion and organization to standard semantic retrieval consistently improves both response quality and retrieval quality on HotpotQA and its variants.

### Eval Data & Environment
HotpotQA (distractor and fullwiki settings), MuSiQue, and TriviaQA. LLM backbone per repo configurable; code at github.com/nju-websoft/KG2RAG.

### Baselines
- Vanilla chunk RAG / dense retrieval RAG
- Other multi-hop QA RAG approaches and HotpotQA-specific systems

### Eval Results
Outperforms existing RAG-based approaches on both response-quality and retrieval-quality metrics on HotpotQA and its variants; consistent improvements reported across ablations. Exact numeric deltas vs. the strongest baseline not enumerated in available sources.

---

## SimGRAG: Leveraging Similar Subgraphs for Knowledge Graphs Driven Retrieval-Augmented Generation
**Venue**: ACL Findings 2025, 2025  |  **arXiv**: 2412.15272  |  **PDF**: https://arxiv.org/pdf/2412.15272

**Authors**: Yuzheng Cai, Zhenyue Guo, YiWen Pei

### Problem
KG-driven RAG must align an unstructured natural-language query with structured KG patterns; existing methods either rely on hand-crafted patterns or use embedding similarity that ignores graph structure, limiting accuracy on large KGs.

### Method & Innovation
SimGRAG decomposes KG-RAG into two stages: (1) Query-to-Pattern, in which an LLM translates the query into a desired graph pattern; (2) Pattern-to-Subgraph, which quantifies the alignment between this pattern and candidate subgraphs via a graph semantic distance (GSD) metric. An optimized retrieval algorithm identifies the top-k subgraphs in ~1 second on a 10-million-scale KG. The whole pipeline is training-free.

### Conclusion
A two-stage pattern-then-subgraph approach with a graph-semantic-distance metric beats state-of-the-art KG-driven RAG on both QA and fact verification, while scaling to 10M-node KGs at interactive speed.

### Eval Data & Environment
KG-driven QA and fact verification benchmarks (per the ACL paper). Code at github.com/YZ-Cai/SimGRAG.

### Baselines
- Prior state-of-the-art KG-driven RAG approaches
- LLM-only prompting on KG queries

### Eval Results
Outperforms state-of-the-art KG-driven RAG methods on both question answering and fact verification, and retrieves top-k subgraphs within ~1 second on a 10-million-scale KG. Exact metric deltas not specified in available sources.

---

## Knowledge Graph Retrieval-Augmented Generation for LLM-based Recommendation (K-RagRec)
**Venue**: ACL 2025, 2025  |  **arXiv**: 2501.02226  |  **PDF**: https://arxiv.org/pdf/2501.02226

**Authors**: Shijie Wang, Wenqi Fan, Yue Feng, et al.

### Problem
LLM-based recommenders inherit hallucinations and stale knowledge from their backbones, and vanilla vector RAG adds noise while ignoring relational structure in item knowledge graphs.

### Method & Innovation
K-RagRec indexes hop-field knowledge subgraphs around each item via a GNN encoder, then applies a popularity-aware selective retrieval policy, fetches multi-hop subgraphs, and re-ranks them before passing them to the LLM. Only the small GNN(s) are learned — the LLM itself is frozen. The novel design is using GNN-encoded subgraph embeddings (rather than raw KG triples) to augment LLM recommendations.

### Conclusion
Plugging GNN-encoded KG subgraphs into a frozen LLM substantially boosts recommendation accuracy in zero-shot settings while keeping inference latency near native LLM speed.

### Eval Data & Environment
MovieLens-20M and Amazon Book recommendation datasets. LLM backbone frozen during recommendation. Code at github.com/Sjay-Wang/K-ragrec.

### Baselines
- LLM-direct recommendation baselines (no retrieval)
- Other KG-RAG and prompt-tuned recommendation systems
- Ablations without GNN encoder

### Eval Results
+21.6% over SOTA on MovieLens-20M (zero-shot); +8.7% over prompt-tuned baselines on Amazon Book (zero-shot). Removing the GNN encoder drops accuracy by 37% (MovieLens) and 45.9% (Amazon Book). Inference is only ~0.1s slower than direct LLM inference, beating other KG-RAG methods on efficiency.

---

## Medical Graph RAG: Evidence-based Medical Large Language Model via Graph Retrieval-Augmented Generation
**Venue**: ACL 2025, 2025  |  **arXiv**: 2408.04187  |  **PDF**: https://arxiv.org/pdf/2408.04187

**Authors**: Junde Wu, Jiayuan Zhu, Yunli Qi

### Problem
Medical LLMs need to be safe, evidence-traceable, and able to cite authoritative sources, but vanilla RAG over medical text loses context across chunks and lacks explicit grounding to authoritative medical knowledge.

### Method & Innovation
MedGraphRAG builds a three-tier hierarchical graph linking (top) private clinical records (e.g., MIMIC-IV), (middle) medical papers/books (MedC-K, textbooks), and (bottom) the UMLS medical dictionary. Documents are chunked with a hybrid static-semantic strategy; entities are extracted, merged across documents via semantic similarity, and connected into meta-graphs. Retrieval uses a U-retrieve method that combines top-down precise retrieval and bottom-up response refinement to balance global awareness and indexing efficiency. The result is a training-free, citation-grounded medical RAG.

### Conclusion
The three-tier hierarchical graph plus U-retrieve achieves new SOTA on 11 medical Q&A and fact-checking benchmarks, with notably stronger citation precision and recall in long-form generation.

### Eval Data & Environment
9 medical Q&A benchmarks, 2 health fact-checking datasets, and 1 long-form medical generation test set. LLM backbone: ChatGPT (per the repo). Code at github.com/SuperMedIntel/Medical-Graph-RAG.

### Baselines
- LLM-direct (no retrieval)
- A simple Graph-RAG pipeline (the paper's own baseline)
- Standard medical RAG / GraphRAG approaches

### Eval Results
~+10% average improvement over the no-retrieval baseline on fact-checking and ~+8% on medical QA; ~+8% over GraphRAG on fact-checking and ~+5% over GraphRAG on QA. Reports new SOTA on 11 datasets in total, with the largest long-form gains in citation precision and recall.

---

## FiDeLiS: Faithful Reasoning in Large Language Models for Knowledge Graph Question Answering
**Venue**: ACL Findings 2025, 2025  |  **arXiv**: 2405.13873  |  **PDF**: https://arxiv.org/pdf/2405.13873

**Authors**: Yuan Sui, Yufei He, Nian Liu, Xiaoxin He, Kun Wang, Bryan Hooi

### Problem
KG-augmented LLMs frequently hallucinate by skipping necessary reasoning steps or retrieving wrong KG paths, especially at scale where exhaustive traversal is infeasible.

### Method & Innovation
FiDeLiS unifies two ideas: (1) Path-RAG, which pre-selects a small candidate set of relations/entities for each step to shrink the search space, and (2) Deductive-Verification Beam Search (DVBS), a step-wise beam search in which the LLM verifies each new step against a deductive scoring function and terminates the search once the question is logically deducible. The framework is training-free.

### Conclusion
Combining Path-RAG candidate reduction with deductive step-verification beam search delivers consistent gains over strong KGQA baselines on multiple benchmarks while remaining interpretable.

### Eval Data & Environment
KGQA benchmarks including WebQSP and CWQ (and an additional benchmark per the paper). LLM backbone: OpenAI-class models; uses OpenAI-embedding for retrieval. Code at github.com/Y-Sui/FiDeLiS.

### Baselines
- Strong KGQA baselines including ToG, RoG, and other path-based KG-LLM reasoners
- BM25 / dense retrieval ablations

### Eval Results
Outperforms strong baselines across three datasets. Ablations show removing Path-RAG drops Hits@1 by 6.97% on WebQSP; switching from BM25 to OpenAI embeddings adds +13.04% Hits@1 on WebQSP and +14.73% on CWQ. Best beam width/depth = 4.

---

## LightRAG: Simple and Fast Retrieval-Augmented Generation
**Venue**: EMNLP Findings 2025, 2025  |  **arXiv**: 2410.05779  |  **PDF**: https://arxiv.org/pdf/2410.05779

**Authors**: Zirui Guo, Lianghao Xia, Yanhua Yu, et al.

### Problem
RAG systems built on flat chunks miss inter-chunk dependencies and produce fragmented answers, while heavy GraphRAG implementations have prohibitively high indexing cost and slow updates.

### Method & Innovation
LightRAG integrates graph structures into text indexing using LLM extraction of entities and relations, then performs a dual-level retrieval: low-level retrieval for specific entities and their relations, and high-level retrieval for broader topics/themes. Vector embeddings over the graph allow fast retrieval of related entities. An incremental update algorithm enables timely integration of new data without reindexing. The whole system is training-free.

### Conclusion
A dual-level graph + vector retrieval design substantially improves comprehensiveness, diversity, and empowerment over both naive RAG and Microsoft GraphRAG while supporting cheap incremental updates.

### Eval Data & Environment
UltraDomain benchmark with four sub-datasets: Agriculture, CS, Legal, and Mix. Backbone LLM not strictly specified in README; recommends ≥32B-parameter LLMs with ≥64K context. Code at github.com/HKUDS/LightRAG.

### Baselines
- NaiveRAG
- GraphRAG (Microsoft)
- HyDE
- RQ-RAG

### Eval Results
Consistently beats all four baselines on comprehensiveness, diversity, empowerment, and overall scores; e.g., 60.0% overall vs. NaiveRAG 40.0% on Mix; >80% retrieval accuracy on legal documents vs. ~60-70% for competitors; 52.8% overall vs. GraphRAG 47.2% on Legal.

---

## Empowering GraphRAG with Knowledge Filtering and Integration (GraphRAG-FI)
**Venue**: EMNLP 2025, 2025  |  **arXiv**: 2503.13804  |  **PDF**: https://arxiv.org/pdf/2503.13804

**Authors**: Kai Guo, Harry Shomer, Shenglai Zeng, Haoyu Han, Yu Wang, Jiliang Tang

### Problem
GraphRAG retrieves noisy or irrelevant information that can hurt performance, and over-reliance on external retrievals can suppress the LLM's own intrinsic reasoning, leading to brittle KGQA behavior.

### Method & Innovation
GraphRAG-FI has two complementary components. GraphRAG-Filtering applies a two-stage filter to discard noisy retrieved subgraphs/triples before they reach the LLM. GraphRAG-Integration applies a logits-based selection at decoding time to blend the LLM's intrinsic answer distribution with the GraphRAG-conditioned distribution, dynamically deciding when to trust external knowledge. Both modules are training-free and model-agnostic.

### Conclusion
Filtering noisy retrievals plus logits-level fusion of intrinsic and external knowledge yields significant and consistent GraphRAG gains across multiple LLM backbones and KGQA benchmarks.

### Eval Data & Environment
Knowledge-graph QA tasks across multiple backbones (the paper evaluates several LLM backbones with the same plug-in module). Specific dataset list per the ACL Anthology PDF.

### Baselines
- Plain GraphRAG (no filtering, no logits integration)
- KGQA baselines including ToG and standard RAG over KGs

### Eval Results
GraphRAG-FI significantly improves reasoning performance over plain GraphRAG across multiple backbone models on KGQA. Exact numeric per-dataset deltas were not retrievable from available sources.

---

## KG-RAG: Enhancing GUI Agent Decision-Making via Knowledge Graph-Driven Retrieval-Augmented Generation
**Venue**: EMNLP 2025, 2025  |  **arXiv**: 2509.00366  |  **PDF**: https://arxiv.org/pdf/2509.00366

**Authors**: Yuzhi Zhao, Xiaolin Lin, Hongru Liang, et al.

### Problem
LLM-powered GUI agents struggle with complex mobile workflows due to limited app-specific knowledge, and existing UI Transition Graphs (UTGs) are fragmented and hard to integrate at runtime.

### Method & Innovation
KG-RAG transforms fragmented UTGs into structured vector databases supporting efficient real-time retrieval. An intent-guided LLM search method produces actionable navigation paths given a user task. The authors also release two new benchmarks tailored to the Chinese mobile ecosystem: KG-Android-Bench and KG-Harmony-Bench. The pipeline is training-free with respect to the agent LLM.

### Conclusion
A KG-RAG layer over UTGs gives substantial gains in success rate, decision accuracy, and task-step efficiency for mobile GUI agents, with effective zero-shot transfer to web and desktop apps.

### Eval Data & Environment
KG-Android-Bench and KG-Harmony-Bench (Chinese mobile apps); transfer experiments on Weibo-web and QQ Music-desktop. LLM backbone not strictly specified in available sources.

### Baselines
- AutoDroid (LLM-powered Android task agent)
- Other GUI-agent baselines for Android and HarmonyOS apps

### Eval Results
75.8% success rate (vs. AutoDroid +8.9 pts), 84.6% decision accuracy (+8.1 pts), average task steps reduced from 4.5 to 4.1. Zero-shot transfer: +40% success rate on Weibo-web, +20% on QQ Music-desktop. Accuracy saturates around 4 hours of UTG construction per complex app.

---

## TOBUGraph: Knowledge Graph-Based Retrieval for Enhanced LLM Performance Beyond RAG
**Venue**: EMNLP Industry 2025, 2025  |  **arXiv**: 2412.05447  |  **PDF**: https://arxiv.org/pdf/2412.05447

**Authors**: Savini Kashmira, Jayanaka L. Dantanarayana, Joshua Brodsky, et al.

### Problem
Vanilla RAG relies on query-chunk text similarity, which (a) fails to capture deep semantic relationships across chunks, (b) is fragile under different chunking strategies, and (c) is prone to hallucination — all problematic for personal-memory applications that need precise recall.

### Method & Innovation
TOBUGraph builds a KG dynamically from unstructured data using LLMs to extract entities and diverse relations, replacing chunk-based retrieval entirely with graph traversal over the constructed KG. There is no fixed chunking strategy. The system is deployed in TOBU, a real-world personal-memory app, and evaluated on real user data — a relatively rare setting for academic KG-RAG work. The pipeline is training-free.

### Conclusion
A dynamically constructed KG with graph-traversal retrieval comprehensively outperforms multiple RAG implementations on a real personal-memory application, in both objective metrics and human preference.

### Eval Data & Environment
Real user data from the TOBU personal-memory application (production). LLM backbone not specified explicitly in available sources.

### Baselines
- Multiple vanilla RAG implementations (different chunking + embedding choices)

### Eval Results
TOBUGraph reaches 92.86% precision (vs. 78.58% for the best RAG baseline) and 93.33% F1 (vs. 81.48% for the best baseline). In a human study, ~+20% improvement in user satisfaction over the next-best baseline.

---

## MaGiX: A Multi-Granular Adaptive Graph Intelligence Framework for Enhancing Cross-Lingual RAG
**Venue**: EMNLP Findings 2025, 2025  |  **arXiv**: (none)  |  **PDF**: https://aclanthology.org/2025.findings-emnlp.279.pdf

**Authors**: Nguyen Manh Hieu, Vu Lam Anh, Hung Pham Van, et al.

### Problem
Existing GraphRAG systems are essentially monolingual; they do not handle cross-lingual queries where the question language differs from the knowledge base language (English ↔ Vietnamese in this work).

### Method & Innovation
MaGiX is the first Graph-RAG framework targeting English↔Vietnamese cross-lingual QA. Its KG is multi-granular: nodes carry fine-grained attribute descriptions, and cross-synonym edges bridge equivalent concepts across languages. A custom multilingual embedding model is trained with contrastive learning for semantic alignment. At retrieval time, graph-based reasoning is combined with a semantic-aware re-ranker. The retrieval pipeline itself is training-free for the LLM, though the embedding model is fine-tuned.

### Conclusion
A multi-granular KG with cross-synonym edges plus a custom multilingual embedding substantially improves cross-lingual retrieval and final QA accuracy compared to prior GRAG systems.

### Eval Data & Environment
Five cross-lingual / multilingual QA benchmarks including NQ, MuSiQue, PopQA (per the published numbers). English–Vietnamese cross-lingual setting.

### Baselines
- Prior GRAG (graph-RAG) systems
- Naive multilingual retrieval-only baselines
- Ablations: w/o granular retrieval, w/o cross-synonym edges, w/o composite scoring

### Eval Results
Granular retrieval lifts NQ from 27.71 → 77.27. Cross-synonym edges raise MuSiQue from 46.82 → 49.17. Composite scoring gives best PopQA at 51.45. The final MaGiX (with fine-tuned embeddings) reaches NQ 87.27 and the best overall MuSiQue score.

---

## Large Language Models Meet Knowledge Graphs for Question Answering: Synthesis and Opportunities
**Venue**: EMNLP 2025 (Main), 2025  |  **arXiv**: 2505.20099  |  **PDF**: https://arxiv.org/pdf/2505.20099

**Authors**: Chuangtao Ma, Yongrui Chen, Tianxing Wu, Arijit Khan, Haofen Wang

### Problem
LLM-based QA is hurt by limited reasoning, outdated parametric knowledge, and hallucinations, so a rapidly growing line of work integrates KGs with LLMs; however, the design space is fragmented and there is no unifying taxonomy.

### Method & Innovation
This is a survey, not a system. It proposes a new structured taxonomy that categorizes LLM-KG synthesis methods for QA along two axes: the type of QA task and the role the KG plays when integrated with the LLM (e.g., context source, reasoning trace, verifier). The survey systematically reviews SOTA methods, compares their strengths/limitations/KG requirements, aligns approaches with the main challenges of complex QA, and consolidates evaluation metrics and benchmark datasets. It is training-free in nature.

### Conclusion
The synthesis identifies open challenges and concrete research opportunities for LLM+KG QA, providing a unified framework that practitioners can use to position and compare new methods.

### Eval Data & Environment
Survey — no empirical experiments. It catalogs commonly used QA benchmarks (e.g., WebQSP, CWQ, MetaQA, HotpotQA) and standard metrics (Hits@1, F1, EM) used across the surveyed methods.

### Baselines
- N/A (survey paper; not a comparative experimental study)

### Eval Results
No new experimental numbers; the contribution is a taxonomy, comparative analysis, and open-problems list. Companion resource at github.com/machuangtao/LLM-KG4QA.

---
# Knowledge Graph powered RAG - Training-Free Papers (Part 2)

Structured per-paper summaries for 23 training-free Knowledge Graph powered RAG papers from 2024-2026 venues.

---

## Agentic Medical Knowledge Graphs Enhance Medical Question Answering: Bridging the Gap Between LLMs and Evolving Medical Knowledge
**Venue**: EMNLP Findings, 2025  |  **arXiv**: 2502.13010  |  **PDF**: https://aclanthology.org/2025.findings-emnlp.679.pdf

**Authors**: Mohammad Reza Rezaei, Reza Saadati Fard, Jayson Lee Parker

### Problem
LLMs in medical QA suffer from outdated knowledge because the rapid evolution of medical literature makes manually-curated domain resources unreliable. The paper addresses how to automatically construct and continuously update medical knowledge so that LLM-based medical QA remains accurate and current.

### Method & Innovation
AMG-RAG (Agentic Medical Graph-RAG) is a training-free agentic framework that automates the construction and continuous updating of Medical Knowledge Graphs (MKGs), integrates reasoning over them, and retrieves current external evidence from web sources. The system uses agentic tools such as PubMedSearch and WikiSearch to dynamically integrate the most recent literature into a structured graph. Reasoning is layered on top of the MKG so that complex medical concepts and new findings are linked at query time. The novelty lies in coupling continuous MKG construction/updating with agentic retrieval, all without fine-tuning the LLM.

### Conclusion
AMG-RAG achieves an F1 of 74.1% on MEDQA and accuracy of 66.34% on MEDMCQA with only an 8B-parameter backbone, beating models that are 10-100x larger (e.g., Meditron-70B) and improving interpretability via the explicit MKG.

### Eval Data & Environment
Evaluations were on MEDQA (USMLE-style) and MEDMCQA medical exam QA benchmarks. Base LLM is an 8B-parameter model leveraged via the agentic framework; external evidence comes from PubMed and Wikipedia via dedicated search tools.

### Baselines
- Meditron-70B (medical fine-tuned LLM)
- Other comparable open-source biomedical models
- Models 10-100x larger than the 8B backbone (including general purpose closed-source models)

### Eval Results
AMG-RAG reaches 74.1% F1 on MEDQA and 66.34% accuracy on MEDMCQA, surpassing Meditron-70B (which has roughly 9x the parameters) without requiring fine-tuning. Exact baseline-by-baseline deltas beyond the headline beat over Meditron are not enumerated in the abstract/sources, but the method consistently beats both similar-sized and 10-100x larger comparators.

---

## MedRAG: Enhancing Retrieval-augmented Generation with Knowledge Graph-Elicited Reasoning for Healthcare Copilot
**Venue**: WWW, 2025  |  **arXiv**: 2502.04413  |  **PDF**: https://arxiv.org/pdf/2502.04413

**Authors**: Xuejiao Zhao, Siyan Liu, Su-Yin Yang

### Problem
Heuristic-based RAG used in medical Q&A and EHR retrieval has insufficient diagnostic accuracy and specificity, particularly when diseases share overlapping manifestations. The paper targets safer, more specific clinical decision support for a healthcare copilot.

### Method & Innovation
MedRAG constructs a four-tier hierarchical diagnostic knowledge graph that explicitly encodes the differential-diagnostic distinctions between similar diseases. At inference time, similar EHRs are retrieved from an EHR database and then dynamically fused with the KG-encoded differential features, which an LLM reasons over to produce diagnosis and treatment recommendations. The system also proactively generates follow-up questions to refine personalized decisions. The novelty is the KG-elicited differential-reasoning step that goes beyond flat retrieval to surface critical disease distinctions.

### Conclusion
MedRAG outperforms state-of-the-art RAG baselines on both the public DDXPlus dataset and a private chronic pain dataset, demonstrating lower misdiagnosis rates and stronger generalization across LLM backbones.

### Eval Data & Environment
Public DDXPlus (49 diagnoses, 1.3M synthetic patients, ~10 symptoms / 3 antecedents each) and a private chronic pain diagnostic dataset (CPDD) from Tan Tock Seng Hospital. Backbones tested include Mixtral-8x7B, Llama-3.1-Instruct, GPT-3.5-turbo, and GPT-4o.

### Baselines
- FL-RAG
- DRAGIN
- Other heuristic/SOTA RAG models for the medical domain

### Eval Results
MedRAG outperforms the strongest prior RAG baseline (FL-RAG / DRAGIN class) on both DDXPlus and CPDD across multiple LLM backbones, achieving the best diagnostic accuracy and specificity. Exact per-LLM percentages are reported in the paper's tables; precise headline deltas beyond the "best on both datasets across all LLMs" finding are not reported in the available external sources.

---

## StructRAG: Structure-Aware RAG Framework with Scholarly Knowledge Graph for Diverse Question Answering
**Venue**: WWW, 2025  |  **arXiv**: (not assigned)  |  **PDF**: https://dl.acm.org/doi/10.1145/3701716.3717819

**Authors**: Anonymous Authors

### Problem
Existing RAG systems for scientific QA do not exploit hierarchical document structure and produce homogeneous retrieved contexts, limiting answer quality on scholarly corpora. The paper addresses both shortcomings in a unified structure-aware framework.

### Method & Innovation
StructRAG introduces (1) an automated KG construction pipeline built on a Deep Document Model (DDM) that preserves the hierarchical structure of scholarly papers, (2) a structure-aware retrieval mechanism that balances semantic relevance with source diversity, and (3) a context-enhanced generation step that injects structural metadata into the prompt. The combination of structure-preserving indexing plus diversity-aware retrieval is the central novelty for scholarly QA.

### Conclusion
StructRAG significantly outperforms vanilla RAG on a 329-paper computer science corpus, validating that exploiting document structure and source diversity matters for scholarly QA.

### Eval Data & Environment
Corpus of 329 computer science papers. Base LLMs and hardware are not detailed in available sources.

### Baselines
- Vanilla RAG baseline

### Eval Results
StructRAG significantly outperforms the vanilla RAG baseline on the 329-paper CS corpus. Specific quantitative deltas are not reported in the available abstract/sources.

---

## Personalizing Large Language Models using Retrieval Augmented Generation and Knowledge Graph
**Venue**: WWW Companion, 2025  |  **arXiv**: 2505.09945  |  **PDF**: https://arxiv.org/pdf/2505.09945

**Authors**: Deeksha Prahlad, Chanhee Lee, Dongha Kim

### Problem
LLMs hallucinate when asked to reason about personal, frequently-updated, and privacy-sensitive information such as calendar data, since this information is not in pre-training and pushing raw text to cloud APIs risks privacy leaks. The paper targets personalized response generation with up-to-date personal facts.

### Method & Innovation
The paper proposes a RAG approach that stores personal information (focus: calendar data) in a knowledge graph and retrieves structured triples to ground the LLM at inference time. The structured KG storage avoids sending raw sensitive text to cloud LLM providers while still enabling factual, personalized answers. Although applied to calendar in the paper, the framework is designed for other personal data (contacts, location). The novelty is the use of KG-RAG specifically as a privacy-preserving personalization substrate.

### Conclusion
The KG-RAG approach significantly outperforms baseline LLMs that consume personal data as raw text input, both in understanding personal information and in answer accuracy.

### Eval Data & Environment
Personal calendar data, framed as a personalization benchmark. Specific LLM backbones, dataset size, and hardware are not detailed in available sources.

### Baselines
- Baseline LLMs that receive personal data as raw text input (non-KG RAG)

### Eval Results
The KG-RAG approach works significantly better than baseline LLMs taking personal data as text inputs in both personal-information understanding and accurate response generation, with a moderate reduction in response time. No specific accuracy numbers are reported in the available sources.

---

## KET-RAG: A Cost-Efficient Multi-Granular Indexing Framework for Graph-RAG
**Venue**: KDD, 2025  |  **arXiv**: 2502.09304  |  **PDF**: https://arxiv.org/pdf/2502.09304

**Authors**: Yiqian Huang, Shiqi Zhang, Xiaokui Xiao

### Problem
Graph-RAG systems incur very high indexing costs because LLMs must extract entities and relations from every text chunk to construct the knowledge graph, which is prohibitive for large proprietary corpora in domains like biomedicine and law.

### Method & Innovation
KET-RAG uses a multi-granular index: (i) it identifies a small subset of *key* text chunks and uses an LLM to construct a knowledge-graph *skeleton* over them, then (ii) builds a lightweight text-keyword bipartite graph over all chunks as a cheap alternative to a full KG. Retrieval runs Graph-RAG-style local search over the skeleton while mimicking the same search on the bipartite graph; results are fused. The key novelty is treating LLM-extracted KGs as expensive and complementing them with a cheap keyword bipartite graph, dramatically reducing indexing token cost while preserving retrieval quality.

### Conclusion
KET-RAG matches or surpasses Microsoft's Graph-RAG in retrieval quality and generation quality while reducing indexing cost by more than an order of magnitude.

### Eval Data & Environment
13 solutions evaluated on three real-world datasets (covering multi-hop QA benchmarks, including evaluations connecting to HotpotQA / MultiHopRAG / MuSiQue style settings). Base LLMs include gpt-4o-mini for both construction and generation in the reported configuration.

### Baselines
- Microsoft Graph-RAG (full LLM-extracted KG)
- LightRAG and other state-of-the-art Graph-RAG / RAG variants (13 solutions in total)
- Vector / NaiveRAG baselines

### Eval Results
KET-RAG improves generation quality by up to 32.4% over the strongest competitor while reducing indexing costs by an order of magnitude (and ~20% lower than Graph-RAG even on the comparable axis). It outperforms all 13 competitors across indexing cost, retrieval effectiveness, and generation quality.

---

## FG-RAG: Enhancing Query-Focused Summarization with Context-Aware Fine-Grained Graph RAG
**Venue**: CIKM, 2025  |  **arXiv**: 2504.07103  |  **PDF**: https://arxiv.org/pdf/2504.07103

**Authors**: Yubin Hong, Chaofan Li, Jingyi Zhang

### Problem
Existing GraphRAG approaches to Query-Focused Summarization (QFS) summarize at a coarse granularity without query awareness, and retrieved content lacks sufficient contextual detail to answer the user's specific question well.

### Method & Innovation
FG-RAG introduces two components: (1) Context-Aware Entity Expansion in graph retrieval expands the set of retrieved entities by walking neighborhoods around query-relevant entities, providing richer context; (2) Query-Level Fine-Grained Summarization synthesizes the coarse graph summaries into highly query-specific fine-grained summaries before answer generation. The novelty is making both retrieval and summarization explicitly query-aware and fine-grained, rather than relying on pre-computed coarse community summaries as in vanilla GraphRAG.

### Conclusion
FG-RAG outperforms other RAG systems on the QFS task across comprehensiveness, diversity, and empowerment metrics on UltraDomain benchmarks.

### Eval Data & Environment
UltraDomain (TommyChien/UltraDomain) datasets including CS, Legal, Agriculture, and Mix domains. Backbones evaluated: gpt-4o-mini, qwen2.5-7B-instruct, qwen2.5-3B-instruct, qwen2.5-1.5B-instruct.

### Baselines
- GraphRAG (Microsoft / community-based)
- LightRAG
- NaiveRAG / Vector RAG baselines

### Eval Results
FG-RAG wins on comprehensiveness, diversity, and empowerment against the GraphRAG and LightRAG baselines across multiple UltraDomain subsets and across all four LLM backbones. Detailed per-domain win-rate numbers are reported in the paper tables but were not surfaced as exact figures in available external sources.

---

## PathRAG: Pruning Graph-based Retrieval Augmented Generation with Relational Paths
**Venue**: arXiv (also AAAI), 2025  |  **arXiv**: 2502.14902  |  **PDF**: https://arxiv.org/pdf/2502.14902

**Authors**: Boyu Chen, Zirui Guo, Zidan Yang

### Problem
Current graph-based RAG retrieves too much redundant information and flattens it into prompts, which dilutes signal and harms answer quality. The paper reframes the bottleneck as *redundancy*, not insufficiency.

### Method & Innovation
PathRAG extracts key *relational paths* between retrieved nodes using a flow-based pruning algorithm that scores paths by reliability, then linearizes paths as text prompts in ascending reliability order (path-based prompting). The pipeline has three stages: node retrieval, flow-based path retrieval, and path-ordered answer generation. The novelty is the explicit shift from node/subgraph retrieval to *path* retrieval, plus a principled pruning mechanism to limit prompt redundancy.

### Conclusion
PathRAG consistently outperforms state-of-the-art Graph-RAG baselines across six datasets and five evaluation dimensions, with especially large gains on large-scale domain corpora.

### Eval Data & Environment
Six datasets including UltraDomain subsets (Legal, History, Biology, Agriculture, CS, Mix). Five evaluation dimensions: comprehensiveness, diversity, logicality, relevance, and coherence.

### Baselines
- NaiveRAG (flat retrieval)
- GraphRAG (community detection)
- LightRAG (ego-network)
- HippoRAG

### Eval Results
PathRAG achieves average pairwise win rates of 60.44% vs GraphRAG and 58.46% vs LightRAG. On large datasets (Legal, History, Biology) win rates rise to ~65%. Path-based prompting beats flat prompting by ~56% in head-to-head judgments, and flow-based path selection wins 56-57% over random or hop-first path-selection ablations.

---

## NodeRAG: Structuring Graph-based RAG with Heterogeneous Nodes
**Venue**: arXiv, 2025  |  **arXiv**: 2504.11544  |  **PDF**: https://arxiv.org/pdf/2504.11544

**Authors**: Tianyang Xu, Haojie Zheng, Chengze Li

### Problem
Existing Graph-RAG methods underspecify the *graph design*, producing homogeneous graphs that don't integrate well with standard graph algorithms and yield inconsistent retrieval workflows.

### Method & Innovation
NodeRAG centers on the graph itself: it constructs a *heterogeneous* knowledge graph containing distinct node types (entities, relations, semantic units, summaries, etc.) that align with the capabilities of LLMs, allowing different graph algorithms to be applied seamlessly across the workflow. This design enables better indexing, query, and storage efficiency while supporting multi-hop reasoning. The novelty is the principled, heterogeneous graph schema that treats graph structure as a first-class design decision rather than an afterthought.

### Conclusion
NodeRAG beats GraphRAG and LightRAG on accuracy *and* efficiency (indexing time, query time, storage, retrieved tokens) across multi-hop QA benchmarks and open-ended head-to-head evaluations.

### Eval Data & Environment
HotpotQA, MuSiQue, MultiHop-RAG; RAG-QA Arena (head-to-head, across six domains including Lifestyle). Evaluation uses accuracy and average tokens.

### Baselines
- NaiveRAG
- HyDE
- LightRAG
- GraphRAG (Microsoft)

### Eval Results
On HotpotQA, NodeRAG reaches 89.5% accuracy vs GraphRAG's 89.0% with ~1.6k fewer retrieved tokens. On MuSiQue, NodeRAG reaches 46.29% accuracy vs GraphRAG 41.71% and LightRAG 36.00%. On RAG-QA Arena (Lifestyle), NodeRAG's retrieval-ratio is 94.9% vs GraphRAG 86.3% and LightRAG 81.7%, again with fewer tokens.

---

## KG-IRAG: A Knowledge Graph-Based Iterative Retrieval-Augmented Generation Framework for Temporal Reasoning
**Venue**: arXiv, 2025  |  **arXiv**: 2503.14234  |  **PDF**: https://arxiv.org/pdf/2503.14234

**Authors**: Ruiyi Yang, Hao Xue, Imran Razzak

### Problem
Single-pass GraphRAG cannot handle multi-step queries that mix retrieval with logical/temporal inference (e.g., ordering events, aligning facts to validity intervals, planning under evolving conditions).

### Method & Innovation
KG-IRAG iteratively retrieves from the KG, where each step extracts a constrained slice of data, propagates temporal constraints, and refines intermediate hypotheses until enough evidence is collected. Facts in the KG carry explicit timestamps and validity intervals; iterative operators verify temporal consistency between retrieval steps. The novelty is the integration of KG with iterative logic-based retrieval where temporal dependencies drive the next retrieval step, enabling step-by-step reasoning over dynamic data.

### Conclusion
KG-IRAG improves accuracy on complex temporal-reasoning tasks compared to standard RAG/GraphRAG, particularly when answers depend on dynamic and time-aligned data.

### Eval Data & Environment
Three new datasets curated by the authors: weatherQA-Irish, weatherQA-Sydney, and trafficQA-TFNSW. Base LLM is a GPT-class model (specific backbone such as GPT-4 used as the reasoner).

### Baselines
- Single-pass RAG / standard GraphRAG baselines
- Less-structured iterative retrieval baselines

### Eval Results
KG-IRAG improves accuracy on temporal/multi-step reasoning queries and reduces hallucination rates compared to less-structured baselines across the three temporal-QA datasets. Exact accuracy deltas are reported in the paper tables but were not extracted in available external sources.

---

## Retrieval-Augmented Generation with Graphs (GraphRAG)
**Venue**: arXiv (survey), 2025  |  **arXiv**: 2501.00309  |  **PDF**: https://arxiv.org/pdf/2501.00309

**Authors**: Haoyu Han, Yu Wang, Harry Shomer, Kai Guo, Jiayuan Ding, Yongjia Lei, Mahantesh Halappanavar, Ryan A. Rossi, Subhabrata Mukherjee, Xianfeng Tang, Qi He, Zhigang Hua, Bo Long, Tong Zhao, Neil Shah, Amin Javari, Yinglong Xia, Jiliang Tang

### Problem
Graph-structured data poses unique challenges for RAG (diverse formats, domain-specific relational patterns) that conventional embedding-only RAG cannot uniformly address, and the rapidly growing GraphRAG literature lacks a unified conceptual map.

### Method & Innovation
This is a comprehensive survey rather than a method paper. It proposes a holistic GraphRAG framework with five components — query processor, retriever, organizer, generator, and data source — and then reviews techniques tailored to different domains (biomedicine, law, finance, e-commerce, etc.). It also enumerates research challenges and cross-domain opportunities. The novelty is the unified 5-component framework that lets readers compare and locate dozens of prior GraphRAG methods consistently.

### Conclusion
The survey establishes a common framework and taxonomy for GraphRAG, highlighting that retriever/organizer/generator design choices vary heavily by domain and that more cross-domain work is needed.

### Eval Data & Environment
Survey paper; no direct experimental evaluation. Discusses many datasets and base LLMs covered by surveyed works.

### Baselines
- N/A (survey)

### Eval Results
N/A (no empirical evaluation; the work catalogs and compares methods rather than benchmarking).

---

## A Survey of Graph Retrieval-Augmented Generation for Customized Large Language Models
**Venue**: arXiv (survey), 2025  |  **arXiv**: 2501.13958  |  **PDF**: https://arxiv.org/pdf/2501.13958

**Authors**: Qinggang Zhang, Shengyuan Chen, Yuanchen Bei, Zheng Yuan, Huachi Zhou, Zijin Hong, Hao Chen, Yilin Xiao, Chuang Zhou, Junnan Dong, Yi Chang, Xiao Huang

### Problem
Flat-text RAG struggles to customize LLMs for specialized professional domains because of (i) complex query understanding, (ii) integrating distributed sources, and (iii) scaling efficiency. The survey systematizes GraphRAG as the response paradigm.

### Method & Innovation
The survey analyzes GraphRAG along three innovation axes: graph-structured knowledge representation (entities + relations + domain hierarchies), efficient graph-based retrieval supporting multi-hop reasoning, and structure-aware knowledge integration algorithms. It also outlines GraphRAG's role in domain customization (medicine, law, finance) and ongoing research challenges. The novelty is its focus on customization workflows rather than just generic GraphRAG components.

### Conclusion
GraphRAG addresses the three core limitations of flat RAG (query understanding, distributed integration, scale), and customization is the most natural application area; many open problems remain in dynamic graph updates and evaluation.

### Eval Data & Environment
Survey paper; no direct experiments. References many datasets and LLM backbones used by surveyed methods.

### Baselines
- N/A (survey)

### Eval Results
N/A (no empirical evaluation).

---

## Youtu-GraphRAG: Vertically Unified Agents for Graph Retrieval-Augmented Complex Reasoning
**Venue**: arXiv (ICLR 2026), 2025  |  **arXiv**: 2508.19855  |  **PDF**: https://arxiv.org/pdf/2508.19855

**Authors**: Junnan Dong, Xinrun Wang, Qinggang Zhang, et al.

### Problem
Prior GraphRAG work optimizes graph construction and graph retrieval in isolation, which is suboptimal especially when domains shift, and existing benchmarks suffer from LLM "knowledge leaking" (the answer is in pre-training).

### Method & Innovation
Youtu-GraphRAG is a vertically unified agentic paradigm that ties construction and retrieval together via a *seed graph schema*: an extraction agent is bound to schema entity/relation/attribute types and continuously expands the schema for new domains, producing a hierarchical knowledge tree that supports top-down filtering and bottom-up community-summary reasoning. A separate agentic retriever interprets the same schema to decompose complex queries into parallel sub-queries. To combat knowledge leaking, the paper releases an anonymized dataset (AnonyRAG) and an "Anonymity Reversion" task, where entity names are replaced with anonymous tags so models must resolve identities from retrieved context.

### Conclusion
Youtu-GraphRAG moves the Pareto frontier with up to 90.71% token-cost savings during graph construction and up to 16.62% higher accuracy than SOTA across six benchmarks.

### Eval Data & Environment
Six benchmarks: HotpotQA, 2WikiMultiHopQA, MuSiQue, GraphRAG-Bench, AnonyRAG-CHS, AnonyRAG-ENG. Base LLMs include DeepSeek-V3-0324 and Qwen3-32B.

### Baselines
- GraphRAG (Microsoft)
- LightRAG
- HippoRAG
- Other GraphRAG SOTA methods

### Eval Results
Up to 16.62% higher accuracy over SOTA and up to 90.71% reduction in graph-construction token cost. With the agent on DeepSeek-V3-0324, top-20 accuracies are 86.5% (HotpotQA), 85.5% (2Wiki), 53.6% (MuSiQue); on Qwen3-32B they are 85.9%, 85.7%, 54.6% respectively.

---

## SUBQRAG: Sub-Question Driven Dynamic Graph RAG
**Venue**: arXiv, 2025  |  **arXiv**: 2510.07718  |  **PDF**: https://arxiv.org/pdf/2510.07718

**Authors**: Jiaoyang Li, Yongchao Liu, Wenhao Jiang

### Problem
GraphRAG's broad-view retrieval is too shallow for complex multi-hop QA: evidence is incomplete and errors accumulate during unguided traversal of the graph.

### Method & Innovation
SubQRAG decomposes the input question into an ordered chain of verifiable sub-questions and answers each sub-question by retrieving triples from the KG. When the existing graph cannot answer a sub-question, the system dynamically extracts new triples from source documents on the fly and expands the KG. All triples actually used during reasoning are aggregated into a "graph memory" that forms a traceable evidence path for the final answer. The novelty is sub-question-driven retrieval combined with on-demand dynamic graph expansion plus an explicit traceable evidence structure.

### Conclusion
SubQRAG consistently improves Exact Match across three multi-hop benchmarks compared to zero-shot LLMs and other Graph-RAG methods.

### Eval Data & Environment
HotpotQA, MuSiQue, 2WikiMultiHopQA. Base LLMs are general-purpose LLMs (GPT-class); hardware details not given in available sources.

### Baselines
- Zero-shot LLMs
- Standard GraphRAG / LightRAG / other multi-hop GraphRAG methods

### Eval Results
Headline EM gains: +5.3% on MuSiQue, +22.3% on 2WikiMultiHopQA, and +7.9% on HotpotQA relative to the strongest baselines.

---

## LinearRAG: Linear Graph Retrieval Augmented Generation on Large-scale Corpora
**Venue**: ICLR, 2026  |  **arXiv**: 2510.10114  |  **PDF**: https://arxiv.org/pdf/2510.10114

**Authors**: Luyao Zhuang, Shengyuan Chen, Hong Cheng

### Problem
Existing GraphRAG methods rely on unstable and costly LLM-based relation extraction during graph construction, producing noisy graphs with inconsistent relations that degrade retrieval quality and scale poorly on large corpora.

### Method & Innovation
LinearRAG constructs a *relation-free* hierarchical graph called Tri-Graph using only lightweight entity extraction and semantic linking — no relation modeling. Graph construction scales linearly with corpus size and adds *no* extra token consumption. Retrieval is two-stage: (i) relevant-entity activation via local semantic bridging, then (ii) passage retrieval via global importance aggregation. The novelty is dropping unreliable LLM-extracted relations entirely while still benefiting from graph structure, yielding economical and stable indexing.

### Conclusion
LinearRAG surpasses GraphRAG baselines (including HippoRAG 2) in retrieval precision, generation accuracy, and scalability across multi-hop and domain-specific benchmarks.

### Eval Data & Environment
HotpotQA, 2WikiMultiHopQA, MuSiQue, and the Medical subset of GraphRAG-Bench. Following HippoRAG's protocol: 1000 questions from each validation set are evaluated. Base LLMs are general-purpose LLMs (e.g., GPT-class).

### Baselines
- HippoRAG / HippoRAG 2 (strongest baseline; e.g., 62.90% on HotpotQA, 31.00% on MuSiQue Contain-based accuracy)
- GraphRAG (Microsoft)
- LightRAG
- NaiveRAG / vector RAG baselines

### Eval Results
LinearRAG consistently surpasses HippoRAG 2 (the strongest baseline) on contain-based accuracy across HotpotQA, 2Wiki, MuSiQue, and the Medical GraphRAG-Bench subset, while scaling linearly with corpus size and using zero extra tokens during indexing. Exact LinearRAG numbers are tabulated in the paper.

---

## GraphRAG-Bench: Challenging Domain-Specific Reasoning for Evaluating Graph Retrieval-Augmented Generation
**Venue**: ICLR, 2026  |  **arXiv**: 2506.02404  |  **PDF**: https://arxiv.org/pdf/2506.02404

**Authors**: Yilin Xiao, Junnan Dong, Chuang Zhou, et al.

### Problem
Current GraphRAG evaluations rely on standard QA datasets that don't really test multi-hop, domain-specific reasoning, so they fail to comprehensively measure the reasoning gains GraphRAG offers.

### Method & Innovation
GraphRAG-Bench is a large-scale benchmark with three key properties: (i) college-level, domain-specific multi-hop questions where simple retrieval is insufficient, (ii) five question types — multiple-choice, multi-select, true/false, fill-in-blank, and open-ended — and (iii) a holistic evaluation framework that scores graph construction, knowledge retrieval, answer generation, and rationale generation. The corpus is 7 million words from 20 college CS textbooks, with 1,018 questions across 16 disciplines.

### Conclusion
Nine SOTA GraphRAG systems are evaluated; the benchmark exposes meaningful capability gaps that prior datasets hide, especially on rationale generation and open-ended questions.

### Eval Data & Environment
1,018 questions spanning 16 CS disciplines drawn from 20 textbooks (7M-word corpus). Five question types. Multiple LLM backbones used as the generator.

### Baselines (systems benchmarked)
- 9 SOTA GraphRAG systems including GraphRAG (Microsoft), LightRAG, HippoRAG, NaiveRAG, vector-RAG variants, etc.

### Eval Results
This is a benchmark paper. Headline finding: no single GraphRAG system dominates across all question types or disciplines, and rationale-generation scores are far below answer-generation scores, indicating an open gap. Per-system raw scores are tabulated in the paper but not summarized as a single SOTA-beat metric.

---

## GraphSearch: An Agentic Deep Searching Workflow for Graph Retrieval-Augmented Generation
**Venue**: arXiv, 2025  |  **arXiv**: 2509.22009  |  **PDF**: https://arxiv.org/pdf/2509.22009

**Authors**: Mingyue Cheng, Hao Zhang, Jiqian Yang, et al.

### Problem
Existing GraphRAG retrieval is too shallow to surface all critical evidence and underuses the structural information that has already been pre-built, leading to weak reasoning on complex queries.

### Method & Innovation
GraphSearch is an agentic deep-search workflow with six modules (Query Decomposition, Context Refinement, Query Grounding, Logic Drafting, Evidence Verification, Query Expansion) that interact iteratively over multi-turn searches. It uses a *dual-channel* retrieval strategy: semantic queries hit chunk-based text and relational queries hit structural graph data, leveraging both modalities. The novelty is the explicit modular agentic loop plus the dual-channel design where each channel is restricted to its aligned modality, which both improves accuracy and reduces context overhead.

### Conclusion
GraphSearch consistently outperforms single-round retrieval across six multi-hop RAG datasets in both answer accuracy and generation quality.

### Eval Data & Environment
Six multi-hop RAG datasets: HotpotQA, MuSiQue, 2WikiMultiHopQA, plus three domain-based sets (Medical, Agriculture, Legal). Backbones include modern open-source LLMs; specific hardware not specified.

### Baselines
- LightRAG
- MiniRAG
- GraphRAG single-round baselines
- Other multi-turn retrieval baselines

### Eval Results
On MuSiQue, integrating GraphSearch with LightRAG raises SubEM from 35.00 to 51.00 (+16 points), with A-Score from 6.50 to 7.72 and E-Score from 7.28 to 8.38. Across all six datasets and multiple backbone graph KBs, GraphSearch produces consistent improvements over the native single-round interaction schemes.

---

## From Local to Global: A Graph RAG Approach to Query-Focused Summarization
**Venue**: arXiv (Microsoft), 2024  |  **arXiv**: 2404.16130  |  **PDF**: https://arxiv.org/pdf/2404.16130

**Authors**: Darren Edge, Ha Trinh, Newman Cheng, et al.

### Problem
Vanilla RAG fails on "global" questions over an entire corpus (e.g., "what are the main themes?") because such questions are inherently query-focused summarization, not retrieval; classical QFS methods don't scale to RAG-sized corpora.

### Method & Innovation
GraphRAG (the original Microsoft formulation) builds a graph index in two stages: an LLM extracts an entity knowledge graph from source documents, then pregenerates community summaries for closely-related entity groups (e.g., via Leiden community detection). At query time, each community summary produces a partial response and partial responses are recursively summarized into a final answer. The novelty is the *community summaries as pregenerated context* approach, which makes whole-corpus QFS tractable.

### Conclusion
GraphRAG yields substantial improvements over conventional vector RAG on global sensemaking questions for both comprehensiveness and diversity at the 1M-token corpus scale.

### Eval Data & Environment
Two ~1M-token datasets: Podcast transcripts and News articles. LLM judge–based pairwise evaluation. GPT-4-class models for both index and generation.

### Baselines
- Conventional/vector RAG baseline
- Map-reduce text summarization
- Variants of GraphRAG using different community levels (low/intermediate/high)

### Eval Results
Pairwise win rates of global GraphRAG vs conventional RAG: 72-83% on Podcast and 72-80% on News for comprehensiveness; 75-82% and 62-71% for diversity. Intermediate-level community summaries win 57% comprehensiveness on Podcast; low-level community summaries win 64% on News (and ~57-60% on diversity).

---

## PersonaAgent with GraphRAG: Community-Aware Knowledge Graphs for Personalized LLM
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2511.17467  |  **PDF**: https://arxiv.org/pdf/2511.17467

**Authors**: Steven Au, Jiawei Zhou, Yu Wang, Nitesh V. Chawla

### Problem
Personalized AI agents need both user-specific history and broader community/global interaction patterns to maintain consistent persona-aligned behavior, but existing personalization approaches use only individual history or static profiles.

### Method & Innovation
PersonaAgent with GraphRAG constructs an LLM-derived KG over relevant user documents and runs graph-based community detection to summarize communities of related information. At inference, it generates personalized prompts that combine (1) a KG-extracted summary of the user's historical behaviors and preferences and (2) global interaction patterns surfaced via community detection. This is the first system to combine graph-based retrieval with dynamic persona prompting from both individual and community patterns.

### Conclusion
PersonaAgent with GraphRAG consistently beats baselines (non-personalized LLMs, ReAct, memory-based personalization) on three LaMP benchmark tasks, with especially large gains on subjective tasks.

### Eval Data & Environment
LaMP benchmark: LaMP-2N (news categorization), LaMP-2M (movie tagging), LaMP-3 (product rating). Backbones: standard LLM (e.g., GPT-class). Comparison includes non-personalized LLM, ReAct, and memory-based models.

### Baselines
- Non-personalized LLM
- ReAct (retrieval-augmented prompting)
- PersonaAgent (without GraphRAG)
- Memory-based personalization models

### Eval Results
On LaMP-2N news categorization: F1 improves by 11.1% over PersonaAgent baseline. On LaMP-2M movie tagging: accuracy 0.513 -> 0.653 (+27.3%) and F1 0.424 -> 0.662 (+56.1%). On LaMP-3 product rating: MAE reduced by 10.4%. Gains are largest on subjective personalization tasks.

---

## StructRAG: Boosting Knowledge Intensive Reasoning of LLMs via Inference-time Hybrid Information Structurization
**Venue**: ICLR, 2025  |  **arXiv**: 2410.08815  |  **PDF**: https://arxiv.org/pdf/2410.08815

**Authors**: Zhuoqun Li, Xuanang Chen, Haiyang Yu, Hongyu Lin, Yaojie Lu, Qiaoyu Tang, Fei Huang, Xianpei Han, Le Sun, Yongbin Li

### Problem
Useful information for knowledge-intensive reasoning is scattered across documents, so standard RAG retrieves noisy contexts that prevent LLMs from identifying key facts and performing global reasoning.

### Method & Innovation
Motivated by cognitive theories that humans structure raw information into appropriate formats before reasoning, StructRAG has three components: (1) a hybrid structure router that picks the optimal structure type for the task (e.g., table, tree, graph, text), (2) a scattered-knowledge structurizer that reconstructs raw documents into the chosen structured form at inference time, and (3) a structured-knowledge utilizer that decomposes complex questions and answers using the structured representation. The novelty is choosing the *right* structure per task and doing it entirely at inference (no fine-tuning).

### Conclusion
StructRAG achieves state-of-the-art performance on knowledge-intensive reasoning tasks, with particularly large gains on the most challenging long-context scenarios.

### Eval Data & Environment
Loong benchmark: real-world multi-document QA with 1,600 test samples across three domains (Finance, Legal, Paper), four task categories (Spotlight Locating, Comparison, Clustering, Chain of Reasoning), and four length settings. GPT-4o is the reasoning agent and the LLM judge.

### Baselines
- Long-context LLM (no RAG)
- Standard RAG
- Graph RAG
- Other inference-time structurization baselines

### Eval Results
On the Loong benchmark Set 1 (10K-50K tokens), StructRAG achieves an LLM score of 69.43 and EM 0.35, versus the Long-Context baseline's 60.11 / 0.29 and standard RAG's 46.11 / 0.23, i.e. roughly +9 LLM-score and +6 EM points over the strongest baseline.

---

## KGARevion: An AI Agent for Knowledge-Intensive Biomedical QA
**Venue**: ICLR, 2025  |  **arXiv**: 2410.04660  |  **PDF**: https://arxiv.org/pdf/2410.04660

**Authors**: Xiaorui Su, Yibo Wang, Shanghua Gao, Xiaolong Liu, Valentina Giunchiglia, Djork-Arné Clevert, Marinka Zitnik

### Problem
Biomedical reasoning requires both codified (KG-style) and tacit (LLM-style) knowledge. Existing RAG-based biomedical QA systems lack reliable verification of LLM-generated facts against trustworthy KGs.

### Method & Innovation
KGARevion is a KG-based LLM agent with four actions: Generate (produces candidate triplets relevant to the question from the LLM's latent knowledge), Review (verifies each triplet against a grounded biomedical KG), Revise (corrects any incorrect triplet), and Answer (produces the final answer from verified triplets). The novelty is the explicit *review-and-revise* loop against a grounded KG, fusing the strengths of LLM tacit knowledge with KG codified knowledge.

### Conclusion
KGARevion improves accuracy on 4 gold-standard biomedical QA benchmarks by an average of >5.2% over 15 baseline models, and by 10.4% on three newly curated medical QA datasets of varying semantic complexity.

### Eval Data & Environment
Four gold-standard medical QA datasets: MMLU-Med, MedQA-US, PubMedQA, BioASQ-Y/N. Three newly curated medical QA datasets with varying semantic complexity. KG backbone: grounded biomedical KG. Compared across 15 LLMs.

### Baselines
- 15 different LLMs (general and biomedical) with and without RAG
- Standard RAG variants without explicit verification

### Eval Results
Over 5.2% average accuracy improvement across 15 models on the four standard medical benchmarks. On the three newly curated benchmarks, KGARevion improves accuracy by 10.4% over the strongest comparators.

---

## GeAR: Graph-enhanced Agent for Retrieval-augmented Generation
**Venue**: ACL Findings, 2025  |  **arXiv**: 2412.18431  |  **PDF**: https://arxiv.org/pdf/2412.18431

**Authors**: Zhili Shen, Chenxin Diao, Pavlos Vougiouklis, Pascual Merita, Shriram Piramanayagam, Damien Graux, Dandan Tu, Zeren Jiang, Ruofei Lai, Yang Ren, Jeff Z. Pan

### Problem
Conventional sparse and dense retrievers (e.g., BM25, dense embeddings) struggle on multi-hop QA because the relevant passages aren't directly similar to the question.

### Method & Innovation
GeAR has two innovations: (1) *graph expansion (SyncGE)*, a graph-based retriever that augments any base retriever (e.g., BM25) by locating initial nodes via an LLM and diversifying beams over triples that link multi-hop passages; and (2) an *agent framework* that uses a gist memory to accumulate key information across retrieval iterations and decides when more retrieval is needed. The novelty is that the graph mechanism augments rather than replaces the base retriever, and the agent loop is lightweight.

### Conclusion
GeAR achieves SOTA on three multi-hop QA datasets with >10% improvement on MuSiQue, while using fewer tokens and fewer retrieval iterations than competing iterative-retrieval systems.

### Eval Data & Environment
HotpotQA, 2WikiMultihopQA, MuSiQue. Base retrievers include BM25 and dense embeddings; LLM backbones general-purpose.

### Baselines
- BM25 standalone
- Dense retriever baselines
- HippoRAG (with and without IRCoT)
- Other multi-step iterative retrieval systems

### Eval Results
SOTA on HotpotQA, 2WikiMultihopQA, and MuSiQue, with >10% improvement on MuSiQue (the most challenging). GeAR is more efficient than HippoRAG w/ IRCoT, using fewer iterations and fewer tokens even at single-iteration settings.

---

## Think-on-Graph 3.0: Efficient and Adaptive LLM Reasoning on Heterogeneous Graphs via Multi-Agent Dual-Evolving Context Retrieval
**Venue**: arXiv, 2025  |  **arXiv**: 2509.21710  |  **PDF**: https://arxiv.org/pdf/2509.21710

**Authors**: Shengjie Ma, Chengjin Xu, Cehao Yang, Xuhui Jiang, Kaisheng Zeng, Jiaxin Mao, Jian Guo

### Problem
KG-based RAG suffers from static knowledge, sparse coverage, and inefficient retrieval, especially when answers require deep reasoning over heterogeneous evidence.

### Method & Innovation
ToG-3 introduces the Multi-Agent Context Evolution and Retrieval (MACER) mechanism. Four agents (Constructor, Retriever, Reflector, Responser) collaboratively (a) dynamically construct and iteratively refine a Chunk-Triplets-Community heterogeneous graph index, and (b) run a Dual-Evolution process that adaptively evolves *both* the query and the retrieved sub-graph during reasoning. The novelty is the explicit dual-evolution of query *and* subgraph, enabling deep precise reasoning with lightweight LLMs.

### Conclusion
ToG-3 outperforms compared baselines on both deep and broad reasoning benchmarks while keeping indexing cost competitive with LightRAG and lower than GraphRAG.

### Eval Data & Environment
Multi-hop benchmarks: HotpotQA, 2WikiMultiHopQA, MuSiQue. Backbone LLM: Qwen2.5-32B-Instruct. Embedding: Jina-v3.

### Baselines
- GraphRAG (Microsoft)
- LightRAG
- ToG / ToG-2 (predecessors)
- KG-GPT and other KG-RAG systems

### Eval Results
ToG-3 achieves the highest average EM (0.453) and F1 (0.312) across HotpotQA, 2Wiki, and MuSiQue. Indexing time ~10.13h (similar to LightRAG's 10.06h, vs GraphRAG's 13.10h), confirming better accuracy/efficiency trade-off.

---

## OG-RAG: Ontology-Grounded Retrieval-Augmented Generation For Large Language Models
**Venue**: EMNLP, 2025  |  **arXiv**: 2412.15235  |  **PDF**: https://arxiv.org/pdf/2412.15235

**Authors**: Kartik Sharma, Peeyush Kumar, Yunqing Li

### Problem
LLMs struggle to adapt to specialized industrial/professional workflows without expensive fine-tuning, and existing RAG ignores structured domain knowledge, producing suboptimal context.

### Method & Innovation
OG-RAG constructs a *hypergraph* representation of domain documents in which each hyperedge encapsulates a cluster of factual knowledge grounded in a domain-specific ontology (defining entities and inter-relations). An optimization algorithm then selects the minimal set of hyperedges that produces a precise, conceptually grounded context for the LLM. The novelty is the ontology-grounded hypergraph plus the optimization-based minimal-context selection, which preserves complex entity relationships while keeping prompts compact.

### Conclusion
OG-RAG substantially boosts recall, response correctness, attribution speed, and fact-based reasoning over baseline RAG across four LLMs.

### Eval Data & Environment
Two domain categories: (a) Agriculture industrial workflows — proprietary expert-prepared documents on Soybean and Wheat cultivation in India (85 documents total); (b) News knowledge work — 149 long-form articles from Multi-hop RAG. Four LLM backbones (general-purpose).

### Baselines
- Vanilla RAG
- Other structured/domain RAG methods

### Eval Results
Across four LLMs: +55% recall of accurate facts, +40% response correctness, 30% faster context attribution, and +27% fact-based reasoning accuracy versus baseline RAG.

---

**Total processed: 23 papers.**
