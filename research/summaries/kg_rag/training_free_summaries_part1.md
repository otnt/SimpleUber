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
