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
