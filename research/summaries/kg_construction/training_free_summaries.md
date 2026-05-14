# Training-Free Knowledge Graph Construction Papers (2025-2026) — Structured Summaries

This document contains structured summaries of 20 training-free papers on Knowledge Graph Construction from 2025-2026 conferences.

---

## AutoSchemaKG: Autonomous Knowledge Graph Construction through Dynamic Schema Induction from Web-Scale Corpora
**Venue**: arXiv preprint (HKUST-KnowComp), 2025  |  **arXiv**: 2505.23628  |  **PDF**: https://arxiv.org/pdf/2505.23628

**Authors**: Jiaxin Bai, Wei Fan, Qi Hu

### Problem
Existing KG construction frameworks depend on predefined schemas, which limits scalability and adaptability to open-domain web-scale corpora. Manually crafting schemas is labor-intensive and constrains coverage.

### Method & Innovation
AutoSchemaKG is a fully autonomous KG construction framework that simultaneously extracts triples and induces a schema directly from raw text using LLMs, with no predefined ontology. It models both entities and events and applies a conceptualization step that abstracts concrete instances into hierarchical semantic categories. The schema emerges dynamically as the LLM processes 50M+ documents. The resulting ATLAS (Automated Triple Linking And Schema induction) family of graphs contains 900M+ nodes and 5.9B edges. The conceptualization step is the key novelty enabling schema-free, web-scale operation.

### Conclusion
AutoSchemaKG outperforms SOTA baselines by 12-18% on multi-hop QA, improves LLM factuality by up to 9%, and the automatically induced schema reaches 92-95% semantic alignment with human-crafted schemas, requiring zero manual intervention.

### Eval Data & Environment
Datasets: MuSiQue, HotpotQA, 2WikiMultiHopQA (multi-hop QA); FELM (factual consistency); MMLU (general reasoning, including Global Facts, History, Law, Religion, Philosophy/Ethics, Medicine, Social Sciences). Base LLMs: Llama-3.1-8B-Instruct and Llama-3.1 7B; processed 50M+ documents to build ATLAS KGs.

### Baselines
- HippoRAG / HippoRAG2
- Text-based RAG
- No-retrieval LLM baselines
- Prior SOTA multi-hop QA systems

### Eval Results
AutoSchemaKG/ATLAS outperforms SOTA baselines by 12-18% on multi-hop QA across MuSiQue, HotpotQA, and 2WikiMultiHopQA. Integrating ATLAS with HippoRAG2 improves LLaMA-3.1-8B-Instruct factuality (balanced accuracy and F1 for error detection) by up to 9% over no-retrieval and text-RAG baselines. Schema induction achieves 92-95% semantic alignment with human-crafted schemas with zero manual intervention.

---

## KGGen: Extracting Knowledge Graphs from Plain Text with Language Models
**Venue**: NeurIPS 2025, 2025  |  **arXiv**: 2502.09956  |  **PDF**: https://arxiv.org/pdf/2502.09956

**Authors**: Belinda Mo, Kyssen Yu, Joshua Kazdan

### Problem
Foundation models for KGs are bottlenecked by data scarcity: human-labeled KGs are limited and auto-extracted KGs are often noisy, sparse, and full of synonym duplicates. There is also no standard benchmark for measuring the informativeness of an extracted KG.

### Method & Innovation
KGGen is a Python package (pip install kg-gen) that uses an LM-based extractor to read unstructured text and predict subject-predicate-object triples, then applies a novel iterative LLM-driven clustering algorithm to merge synonymous entities and collapse redundant edges, producing denser, less sparse graphs. Alongside KGGen the authors release MINE (Measure of Information in Nodes and Edges), the first benchmark testing an extractor's ability to produce useful KGs from plain text. KGGen supports multiple LLM backends via LiteLLM (OpenAI, Anthropic, Gemini, DeepSeek, Ollama).

### Conclusion
KGGen substantially outperforms prior extractors on the MINE benchmark, achieving an 18-point absolute gain over GraphRAG and a 36-point gain over OpenIE, indicating that LLM-driven entity/edge clustering produces much more informative graphs.

### Eval Data & Environment
Dataset: MINE benchmark (introduced in this paper). LLM backends supported through LiteLLM (OpenAI, Anthropic, Gemini, DeepSeek, Ollama). Hardware not specified.

### Baselines
- GraphRAG
- OpenIE

### Eval Results
On MINE, KGGen scores 66.07% on average, vs. GraphRAG at 47.80% and OpenIE at 29.84% (absolute gains of +18.27 and +36.23 points respectively). KGGen graphs are denser (fewer singleton nodes), have reduced semantic redundancy, and support more robust fact inference.

---

## KARMA: Leveraging Multi-Agent LLMs for Automated Knowledge Graph Enrichment
**Venue**: NeurIPS 2025 (Spotlight), 2025  |  **arXiv**: 2502.06472  |  **PDF**: https://arxiv.org/pdf/2502.06472

**Authors**: Yuxing Lu, Jinzhuo Wang

### Problem
KG enrichment from unstructured scientific text is bottlenecked by the need for entity/relation extraction, schema alignment, and conflict resolution — tasks single-agent LLMs handle poorly when domain schemas are large.

### Method & Innovation
KARMA decomposes KG enrichment into nine specialized cooperative LLM agents covering entity discovery, relation extraction, schema alignment, and conflict resolution. Agents iteratively parse documents, cross-verify each other's outputs (e.g., Relation Extraction agents validate candidates against Schema Alignment outputs), and resolve contradictions via LLM-based debate (Conflict Resolution agents). The multi-agent design with explicit cross-verification and debate-style adjudication is the novelty.

### Conclusion
Across 1,200 PubMed articles spanning genomics, proteomics, and metabolomics, KARMA identifies up to 38,230 new entities at 83.1% LLM-verified correctness and reduces conflict edges by 18.6% — demonstrating that multi-agent collaboration overcomes single-agent limitations on complex biomedical schemas.

### Eval Data & Environment
Dataset: 1,200 PubMed articles across genomics, proteomics, metabolomics. Base LLMs evaluated: GLM-4 (9B open-source), GPT-4o (proprietary), DeepSeek-v3 (37B-activated MoE).

### Baselines
- Single-agent LLM extractors (GLM-4, GPT-4o, DeepSeek-v3 as standalone backbones)
- Ablations with subsets of the nine agents
- Prior biomedical KG enrichment approaches

### Eval Results
KARMA identifies up to 38,230 new entities, achieves 83.1% LLM-verified correctness, and reduces conflict edges by 18.6% via multi-layer assessments compared with single-agent baselines. The improvements are consistent across the three biomedical domains.

---

## OneKE: A Dockerized Schema-Guided LLM Agent-based Knowledge Extraction System
**Venue**: WWW 2025 (Demo), 2025  |  **arXiv**: 2412.20005  |  **PDF**: https://arxiv.org/pdf/2412.20005

**Authors**: Yujie Luo, Xiangyuan Ru, Kangwei Liu

### Problem
Real-world knowledge extraction pipelines must support multiple sources (Web, PDFs), domains, and IE tasks (NER/RE/EE/triples), but existing tools rarely combine all of these in a deployable system.

### Method & Innovation
OneKE is a dockerized, schema-guided LLM-agent knowledge extraction system. Multiple agents play distinct roles (schema configuration, direct extraction, case-retrieval-based extraction, reflection-based debugging) and operate against a configurable knowledge base of schemas and prior cases. The reflection agent debugs and corrects extraction errors using past cases, and the configurable KB allows schema updates and error-case learning. OneKE is end-to-end deployable via Docker, with Neo4j integration for KG storage and both Web UI and CLI interfaces — its novelty is system-level: a unified, agentic, schema-guided IE platform.

### Conclusion
Empirical evaluations on benchmark datasets demonstrate OneKE's efficacy across NER, RE, EE, triple extraction, and open-domain IE, and case studies show adaptability to diverse domains (science, news, books).

### Eval Data & Environment
Datasets: standard NER/RE/EE benchmarks plus open-domain web/PDF case studies. Supported LLMs: OpenAI GPT-4, DeepSeek API; locally LLaMA3, Qwen2.5, ChatGLM4-9B, MiniCPM3-4B, DeepSeek-R1 series. Source formats: text, HTML, PDF, Word, JSON.

### Baselines
- Direct extraction (no agents/reflection)
- Single-agent variants
- Ablations of schema configuration and case retrieval

### Eval Results
Specific numerical results are not reported in available sources beyond the qualitative claim that empirical evaluations demonstrate OneKE's efficacy and adaptability across diverse extraction tasks. The system has been open-sourced at https://github.com/zjunlp/OneKE.

---

## Aligning Vision to Language: Annotation-Free Multimodal Knowledge Graph Construction for Enhanced LLMs Reasoning (VaLiK)
**Venue**: ICCV 2025, 2025  |  **arXiv**: 2503.12972  |  **PDF**: https://arxiv.org/pdf/2503.12972

**Authors**: Junming Liu, Siyuan Meng, Yanting Gao

### Problem
Multimodal KG (MMKG) construction normally requires manually annotated image captions, which is expensive and limits scalability for downstream LLM multimodal reasoning.

### Method & Innovation
VaLiK (Vision-align-to-Language integrated Knowledge Graph) cascades pre-trained Vision-Language Models in a Chain-of-Expert (CoE) pipeline to align image features with text and produce image-specific descriptions, then applies cross-modal similarity verification to filter noise introduced during alignment. The refined descriptions alone are sufficient to construct an MMKG; the framework eliminates manually annotated captions in both extraction and construction. Entity-to-image linkage is preserved, and the MMKG is compact relative to caption-based approaches. Novelty: fully annotation-free MMKG construction with explicit cross-modal similarity verification.

### Conclusion
On CrisisMMD and ScienceQA, LLMs augmented with VaLiK MMKGs achieve SOTA multimodal reasoning, e.g., Qwen2.5-7B + VaLiK matches the native Qwen2.5-72B model, while requiring substantially less storage than conventional MMKG approaches.

### Eval Data & Environment
Datasets: CrisisMMD (~35K social-media image-text pairs across 7 disaster categories and 4 severity levels) for multimodal classification; ScienceQA for multimodal QA. Base LLMs: Qwen2.5-7B and Qwen2.5-72B. Knowledge sources compared: MMKG, Visual Genome, text-only LightRAG, VaLiK.

### Baselines
- Generic MMKG (Mmkg)
- Visual Genome
- Text-only LightRAG
- Native Qwen2.5-72B (no MMKG)

### Eval Results
VaLiK achieves SOTA classification accuracy on CrisisMMD across most tasks when added to multiple LLM backbones. Qwen2.5-7B + VaLiK matches the much-larger native Qwen2.5-72B on multimodal reasoning. Storage of the VaLiK MMKG is substantially smaller than conventional MMKGs. Exact per-task numbers not reported in available secondary sources.

---

## Graphusion: A RAG Framework for Scientific Knowledge Graph Construction with a Global Perspective
**Venue**: WWW 2025 (NLP4KGC Workshop, Companion Proceedings), 2025  |  **arXiv**: 2410.17600  |  **PDF**: https://arxiv.org/pdf/2410.17600

**Authors**: Rui Yang, Boming Yang, Xinjie Zhao

### Problem
Most LLM-based KG construction methods operate at the sentence/document level and miss a global fusion step that merges entities, resolves conflicts, and discovers novel triplets across the corpus.

### Method & Innovation
Graphusion is a three-step zero-shot KGC framework: (1) seed entity extraction via topic modeling to focus the KG on the most relevant entities; (2) LLM-driven candidate triplet extraction; (3) a novel fusion module that gives a global view by merging entities, resolving conflicts, and discovering new triplets. The global fusion step is the central novelty. The authors also release TutorQA, an expert-verified KG QA benchmark with 1,200 QA pairs across six tasks.

### Conclusion
Graphusion outperforms supervised baselines by up to 10% on link prediction and yields 9.2% accuracy improvement on sub-graph completion when used as the underlying KG, while reaching human-near scores of 2.92/3 and 2.37/3 for entity extraction and relation recognition respectively.

### Eval Data & Environment
Datasets: TutorQA (new, 1,200 QA pairs, 6 tasks); KG quality scored by experts on extracted entities/relations. Domain: NLP education and scientific KG. Base LLM not narrowly specified in abstract; uses LLM-driven prompting in a zero-shot RAG framework.

### Baselines
- Supervised link-prediction baselines
- Sentence/document-level LLM extractors without global fusion
- Local-perspective KGC baselines

### Eval Results
Graphusion scores 2.92/3 for entity extraction and 2.37/3 for relation recognition (expert evaluation). It surpasses supervised baselines by up to 10% in accuracy on link prediction. Using a Graphusion-constructed KG yields a 9.2% accuracy improvement on sub-graph completion in TutorQA.

---

## Taxonomy-Driven Knowledge Graph Construction for Domain-Specific Scientific Applications
**Venue**: ACL 2025 Findings, 2025  |  **arXiv**: (none)  |  **PDF**: https://aclanthology.org/2025.findings-acl.223.pdf

**Authors**: Huitong Pan, Qi Zhang, Mustapha Adamu, Eduard Dragut, Longin Jan Latecki

### Problem
LLMs struggle to extract KGs in specialized scientific domains; existing approaches neglect curated taxonomies of verified entities/relationships, leading to hallucinations and missed relationships.

### Method & Innovation
The framework integrates a domain taxonomy with LLM prompting and a RAG-based validation step to ground extracted triples in retrieved evidence. The taxonomy supplies the entity/relation hierarchy used for prompt conditioning, while RAG validation acts as a hallucination filter. The paper contributes (i) a generalizable taxonomy-aligned KGC methodology, (ii) a reproducible annotation pipeline, (iii) the first climate-science information-retrieval benchmark, and (iv) empirical insights into combining taxonomies with LLMs.

### Conclusion
On a climate science case study (25 publications, 1,705 entity-publication links, 3,618 expert-validated relationships), taxonomy-guided LLM prompting plus RAG validation reduces hallucinations by 23.3% and improves F1 by 13.9% over baselines without these techniques.

### Eval Data & Environment
Dataset: annotated climate-science benchmark of 25 publications, 1,705 entity-publication links, 3,618 expert-validated relationships. Resources released at https://github.com/Jo-Pan/ClimateIE and https://github.com/Jo-Pan/TaxoDrivenKG. Specific LLMs not named in available sources.

### Baselines
- LLM prompting without taxonomy guidance
- LLM prompting without RAG-based validation
- Combined no-taxonomy + no-RAG baseline

### Eval Results
Compared to baselines without the proposed techniques, the framework reduces hallucinations by 23.3% and improves F1 by 13.9% on the climate-science benchmark.

---

## DIAL-KG: Schema-Free Incremental Knowledge Graph Construction via Dynamic Schema Induction and Evolution-Intent Assessment
**Venue**: arXiv preprint, 2026  |  **arXiv**: 2603.20059  |  **PDF**: https://arxiv.org/pdf/2603.20059

**Authors**: Authors per arXiv listing

### Problem
Schema-bound and one-shot KG construction pipelines cannot keep pace with streaming knowledge: they require full reconstruction for new information and conflate simple attribute updates with complex structural changes.

### Method & Innovation
DIAL-KG is a closed-loop framework orchestrated by a Meta-Knowledge Base, operating in a three-stage cycle: (1) Dual-Track Extraction (default triple track for simple facts, event track for complex temporal/lifecycle knowledge); (2) Governance Adjudication for hallucination filtering and currency control; (3) Schema Evolution where new schemas are induced from validated knowledge to guide future cycles. The dual-track routing (Static Track vs. Event Track) and the auditable transactional update mechanism for evidence-backed soft deprecations are the novel contributions, enabling sparsity-preserving schema-free evolution.

### Conclusion
DIAL-KG improves F1 by up to 4.7 points over strong schema-free LLM baselines, achieves over 98% precision on evidence-backed soft deprecations in streaming updates, and produces more compact schemas (up to 15% fewer relation types) with a 1.6-2.8 point reduction in redundancy.

### Eval Data & Environment
Streaming KG construction setting; specific datasets and base LLMs not detailed in available sources beyond the abstract.

### Baselines
- Strong schema-free LLM extractors (not explicitly named in available sources)
- One-shot schema-based KGC baselines

### Eval Results
F1 improves by up to 4.7 points vs. schema-free LLM baselines. Precision exceeds 98% on evidence-backed soft deprecations in streaming. Schemas are up to 15% more compact (fewer relation types) with a 1.6-2.8 point reduction in redundancy.

---

## ATOM: AdapTive and OptiMized Dynamic Temporal Knowledge Graph Construction using LLMs
**Venue**: Findings of EACL 2026 / arXiv preprint, 2025  |  **arXiv**: 2510.22590  |  **PDF**: https://arxiv.org/pdf/2510.22590

**Authors**: Yassir Lairgi, Ludovic Moncla, Khalid Benabdeslem

### Problem
Static KGC ignores time, and recent zero/few-shot LLM TKG builders suffer from instability across runs, incomplete fact coverage, and high latency due to serial merge bottlenecks.

### Method & Innovation
ATOM is a few-shot, scalable TKG construction framework with two innovations: (1) atomic fact decomposition that splits documents into minimal self-contained facts, improving extraction exhaustivity and stability; (2) a fully parallel atomic merge architecture using an efficient pairwise merge algorithm. It also adopts dual-time modeling, distinguishing when a fact was observed from when it is valid. The combination of atomic decomposition with parallel merging removes the serial scalability bottleneck of prior systems.

### Conclusion
ATOM achieves ~18% higher exhaustivity, ~33% better stability, and >90% latency reduction relative to prior systems — concretely 93.8% lower latency than Graphiti and 95.3% lower than iText2KG — establishing it as a scalable framework for dynamic TKG construction.

### Eval Data & Environment
Dataset: NYT News (lead paragraphs from ~2M news articles since 2000, dynamic and temporal). Notes that DocRED is unsuitable for temporal extraction, TempDocRED only covers event start dates, and CS-GS / Music-GS lack temporal data. Few-shot LLM setting.

### Baselines
- Graphiti
- iText2KG

### Eval Results
~18% higher exhaustivity, ~33% better stability vs baselines. Atomic-fact-level processing improves exhaustivity by ~31%, temporal coverage by ~18%, and stability by ~17%. Latency reduction: 93.8% vs. Graphiti, 95.3% vs. iText2KG.

---

## EMERGE: A Benchmark for Updating Knowledge Graphs with Emerging Textual Knowledge
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2507.03617  |  **PDF**: https://arxiv.org/pdf/2507.03617

**Authors**: Authors per arXiv listing

### Problem
Existing KG construction benchmarks ignore temporal KG updates (TKGU): identifying what to add, retract, infer, or mint as new relation types as the world changes.

### Method & Innovation
EMERGE is a large-scale benchmark for TKGU. The authors align seven yearly Wikidata snapshots (2019-2025) with corresponding Wikipedia passages, using a multi-stage pipeline that identifies concrete KG changes and candidate evidence passages, then applies an LLM-guided filtering step to discard unsupported passages (validated by manual annotation of 500 triple-text pairs). The dataset comprises 233K passages and 1.45M KG edits, with both KG size and schema evolving (2019: 5.96M entities / 25.73M relations / 5,646 relation types → 2025: 6.93M entities / 37.54M relations / 12,304 relation types). The novelty is operationalizing five distinct update operations: EXISTS, ADD, MINT+ADD, INFER, DEPRECATE.

### Conclusion
Even strong models such as GPT-5.1 perform poorly across the five TKGU operations, demonstrating a substantial research gap in continuous KG updating from emerging text.

### Eval Data & Environment
EMERGE benchmark: 233K Wikipedia passages aligned with 1.45M KG edits over seven yearly Wikidata snapshots (2019-2025). Evaluated models include GPT-5.1 and other strong IE / LLM baselines.

### Baselines
- GPT-5.1
- Other state-of-the-art LLM and IE methods (not individually enumerated in available sources)

### Eval Results
All models, including GPT-5.1, achieve low performance across the five operation classes (EXISTS, ADD, MINT+ADD, INFER, DEPRECATE). Exact per-operation accuracy is not summarized in available secondary sources; the paper's headline finding is that the gap to perfect TKGU performance remains substantial.

---

## ODKE+: Ontology-Guided Open-Domain Knowledge Extraction with LLMs
**Venue**: arXiv preprint (Apple ML Research), 2025  |  **arXiv**: 2509.04696  |  **PDF**: https://arxiv.org/pdf/2509.04696

**Authors**: Samira Khorshidi, Nima Nikfarjam, et al.

### Problem
Maintaining large-scale, fresh KGs at production scale is costly: existing methods cannot achieve both high precision and broad coverage across hundreds of predicates while supporting both batch and streaming ingestion.

### Method & Innovation
ODKE+ is a production-grade pipeline with five modular components: (1) an Extraction Initiator detecting missing/stale facts; (2) an Evidence Retriever; (3) hybrid Knowledge Extractors combining pattern rules with ontology-guided LLM prompting; (4) a Grounder using a second LLM to validate facts; (5) a Corroborator that ranks and normalizes candidates. The key novelty is dynamic, entity-type-specific ontology-snippet generation for the LLM prompt, enabling type-consistent extraction across 195 predicates while supporting both batch and streaming modes.

### Conclusion
Deployed in Apple production since May 2025, ODKE+ has processed 9M+ Wikipedia pages and ingested 19M high-confidence facts at 98.8% precision, achieving up to 48% overlap with third-party KGs and cutting update lag by an average of 50 days.

### Eval Data & Environment
Source: 9M+ Wikipedia pages, 195 predicates. Output: 19M ingested high-confidence facts. Production deployment at Apple from May 2025. Specific base LLMs not publicly named.

### Baselines
- Third-party KGs (Wikidata-type) used as overlap reference
- Internal pattern-only and LLM-only extractors (implied by ablations)

### Eval Results
98.8% precision on ingested facts; up to 48% coverage overlap with third-party KGs; average update lag reduced by 50 days versus prior pipeline; 19M facts ingested from 9M+ Wikipedia pages.

---

## LightKGG: Simple and Efficient Knowledge Graph Generation from Textual Data
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2510.23341  |  **PDF**: https://arxiv.org/pdf/2510.23341

**Authors**: Teng Lin, et al.

### Problem
LLM-driven KG extractors are computationally expensive and inaccessible for low-resource environments; pattern-based extractors are error-prone. Small language models (SLMs) have not been viable for high-quality KG extraction.

### Method & Innovation
LightKGG enables SLM-based KG extraction via two innovations: (1) Context-integrated Graph extraction unifies contextual metadata (temporal/spatial cues, entity attributions) with nodes and edges, reducing reliance on heavy semantic processing; (2) Topology-enhanced relationship inference uses the topology of the extracted graph to infer missing relationships, avoiding deep semantic analysis. The pipeline has three modules: Extractor (SLM-driven triple extraction with context preservation), Aggregator, and Discoverer (topology-based inference). Key insight: graph-topology reasoning compensates for SLM weaknesses in semantic depth.

### Conclusion
LightKGG matches LLM-driven baselines (KGGen, OpenIE, GraphRAG) on KG extraction quality at a fraction of the compute cost using a small Phi-3.5-mini-instruct model.

### Eval Data & Environment
Datasets: 100-sentence subset of SciERC (F1 for entity/relation extraction) and MINE benchmark (MINE-score for KG informativeness). Base SLM: Phi-3.5-mini-instruct.

### Baselines
- KGGen
- OpenIE
- GraphRAG

### Eval Results
On SciERC and MINE, LightKGG with Phi-3.5-mini-instruct achieves performance comparable to LLM-driven baselines (KGGen, OpenIE, GraphRAG) at substantially reduced computational cost. Exact per-dataset F1 / MINE-score numbers not reported in available secondary sources.

---

## Synergizing Multimodal Temporal Knowledge Graphs and Large Language Models for Social Relation Recognition
**Venue**: EMNLP 2025, 2025  |  **arXiv**: (none)  |  **PDF**: https://aclanthology.org/2025.emnlp-main.224.pdf

**Authors**: Haorui Wang, Zheng Wang, Yuxuan Zhang, Bo Wang, Bin Wu

### Problem
LLMs alone struggle with social relation recognition from video because they rely on sequential training data and cannot natively reason over visual/temporal social context.

### Method & Innovation
The proposed mtKG-LLM framework extracts multimodal information from videos and models social networks per scene as spatial KGs, then constructs Temporal KGs by linking spatial KGs along the timeline for long-term reasoning. Multi-scale information is retrieved from the temporal KG and given to the LLM to recognize the social relation. The novelty is the explicit spatial-to-temporal multimodal KG construction pipeline that bridges video understanding and LLM reasoning at multiple temporal scales.

### Conclusion
The method achieves state-of-the-art performance on video-based social relation recognition, demonstrating that explicit multimodal temporal KGs are an effective bridge between video content and LLM reasoning.

### Eval Data & Environment
Datasets: MovieGraphs and ViSR (standard video social-relation recognition benchmarks). Multimodal video inputs; LLM used for reasoning (specific LLM not named in available sources).

### Baselines
- Prior video social-relation recognition systems (CAGNet-style graph baselines, multimodal video relation extractors)
- LLM-only baselines without KG augmentation

### Eval Results
Reported as achieving SOTA on both MovieGraphs and ViSR for social relation recognition. Concrete F1/accuracy numbers are not reported in available secondary sources.

---

## LKD-KGC: Domain-Specific KG Construction via LLM-driven Knowledge Dependency Parsing
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2505.24163  |  **PDF**: https://arxiv.org/pdf/2505.24163

**Authors**: Sun et al.

### Problem
Domain-specific KGC requires predefined schemas or external knowledge, and existing methods do not exploit the natural dependencies between documents in a repository that should guide processing order.

### Method & Innovation
LKD-KGC autonomously analyzes a document repository to infer knowledge dependencies, then uses LLM-driven prioritization to determine an optimal processing sequence. It autoregressively generates an entity schema by integrating hierarchical inter-document context, then uses this schema to guide unsupervised extraction of entities and relationships. Adaptive embedding-based schema integration automatically merges equivalent entity types via vector clustering and LLM-based deduplication, letting schema alignment emerge from the data without predefined ontologies.

### Conclusion
LKD-KGC outperforms SOTA baselines by 10-20% in both precision and recall across technical domains, demonstrating the value of dependency-aware autoregressive schema induction.

### Eval Data & Environment
Multiple technical domain document repositories (specific corpora not enumerated in available secondary sources). Submitted toward EDBT 2026. Specific base LLMs not detailed.

### Baselines
- State-of-the-art LLM-based KGC baselines (e.g., iText2KG, similar incremental extractors)
- Schema-based KGC baselines

### Eval Results
LKD-KGC achieves 10-20% improvements over SOTA baselines in both precision and recall across technical domain KG construction tasks.

---

## DynamicNER: A Dynamic, Multilingual, and Fine-Grained Dataset for LLM-based Named Entity Recognition
**Venue**: EMNLP 2025, 2025  |  **arXiv**: 2409.11022  |  **PDF**: https://aclanthology.org/2025.emnlp-main.835/

**Authors**: Hanjun Luo, et al.

### Problem
Existing NER datasets use fixed, coarse-grained entity categories designed for traditional ML methods and fail to evaluate LLMs' generalization and contextual understanding on fine-grained, multilingual scenarios.

### Method & Innovation
DynamicNER is the first NER dataset designed for LLM-based methods with dynamic categorization, supporting 8 languages (English, Chinese, Spanish, French, German, Japanese, Korean, Russian), 3 levels of granularity (8 coarse / 31 medium / 155 fine-grained types), and varying type lists per instance. Alongside the dataset the authors introduce CascadeNER, a two-stage NER method using two cascaded small-parameter LLMs (one to extract, one to classify), which trades a single large LLM call for two lightweight ones to achieve fine-grained accuracy with low compute.

### Conclusion
CascadeNER outperforms existing LLM-based NER methods on fine-grained and low-resource scenarios while using smaller models, and DynamicNER itself is established as the standard benchmark for evaluating LLM-based NER under dynamic categorization.

### Eval Data & Environment
Datasets: DynamicNER (new, 8 languages, 155 fine-grained types), CrossNER, FewNERD. Evaluated with various lightweight and large LLMs. Code/data: https://github.com/Astarojth/DynamicNER.

### Baselines
- Existing LLM-based NER methods (GPT-class single-stage extractors)
- Traditional supervised NER models

### Eval Results
CascadeNER achieves SOTA on low-resource and fine-grained scenarios (including CrossNER and FewNERD), outperforming larger LLM-based baselines while using smaller models. Concrete per-dataset F1 numbers are not summarized in available secondary sources.

---

## LLM-empowered Knowledge Graph Construction: A Survey
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2510.20345  |  **PDF**: https://arxiv.org/pdf/2510.20345

**Authors**: Haonan Bian

### Problem
LLM-driven KG construction has rapidly evolved from rule-based and statistical pipelines to language-driven generative frameworks, but the literature is fragmented and lacks a unifying analysis.

### Method & Innovation
This is a comprehensive survey that systematically analyzes how LLMs reshape the classical three-layer KGC pipeline: ontology engineering, knowledge extraction, and knowledge fusion. The survey organizes methods along two complementary axes: schema-based paradigms (emphasizing structure, normalization, consistency) and schema-free paradigms (emphasizing flexibility, adaptability, open discovery). It also outlines future directions including KG-based reasoning for LLMs, dynamic knowledge memory for agentic systems, and multimodal KG construction.

### Conclusion
The survey provides a structured taxonomy and identifies trends and open problems for the field; it does not introduce a new method and does not report experimental numbers.

### Eval Data & Environment
Survey paper — no experimental evaluation. Reviews existing benchmarks, methods, and trends across the LLM-KGC literature.

### Baselines
- N/A (survey)

### Eval Results
No experimental results — this paper is a survey. Its contribution is the schema-based vs. schema-free taxonomy and the analysis of open research directions.

---

## Relation as a Prior: A Novel Paradigm for LLM-based Document-level Relation Extraction (RelPrior)
**Venue**: arXiv preprint, 2025  |  **arXiv**: 2511.08143  |  **PDF**: https://arxiv.org/pdf/2511.08143

**Authors**: Authors per arXiv listing

### Problem
LLM-based document-level relation extraction (DocRE) trails traditional supervised methods because (1) numerous unrelated entity pairs introduce noise, and (2) LLMs may produce relation labels outside the predefined relation set, which are then judged as errors.

### Method & Innovation
RelPrior reframes DocRE: instead of "extract entities then predict relations," it uses relations as a prior. A binary-classification LLM module first determines whether two entities are correlated (filtering unrelated pairs and reducing noise), and a second module matches entities to predefined relations for triple extraction (avoiding open-set generation errors). This transforms DocRE into a pair of constrained judgement tasks, which dramatically lowers LLM hallucination on out-of-set relations.

### Conclusion
RelPrior achieves SOTA among LLM-based DocRE methods, with RelPrior_LLaMA3-8B improving F1 by 2.06% on DocRED dev and 2.38% on DocRED test over AutoRE_LLaMA3-8B.

### Eval Data & Environment
Datasets: DocRED (dev / test) and Re-DocRED. Base LLM: LLaMA3-8B (RelPrior_LLaMA3-8B), with the architecture explicitly designed to be backbone-agnostic.

### Baselines
- AutoRE_LLaMA3-8B
- Other LLM-based DocRE methods
- Traditional supervised DocRE baselines (for context)

### Eval Results
On DocRED, RelPrior_LLaMA3-8B improves F1 by 2.06% on dev and 2.38% on test over AutoRE_LLaMA3-8B. On Re-DocRED, RelPrior_LLaMA3-8B achieves the best performance among LLM-only DocRE methods.

---

## Chain of Knowledge Graph: Information-Preserving Multi-Document Summarization for Noisy Documents
**Venue**: COLING 2025 (NeusymBridge Workshop), 2025  |  **arXiv**: (none)  |  **PDF**: https://aclanthology.org/2025.neusymbridge-1.1/

**Authors**: Kangil Lee, Jinwoo Jang, Youngjin Lim, Minsu Shin

### Problem
Multi-document summarization over noisy inputs loses important information because prior entity-centric prompts (Chain-of-Density, Chain-of-Event) aggressively filter entities deemed less critical that may actually carry key information.

### Method & Innovation
Chain of Knowledge Graph (CoKG) is a novel instruction prompt: the LLM first extracts entities and constructs entity-entity relations to form a KG, then enriches relations to surface potentially important entities and assess each relation's strength. Only when the KG meets a predefined quality threshold is it used to summarize the documents. The key novelty is using KG quality as a gating signal in the chain-of-thought, treating relation strength as the information-preservation criterion rather than entity importance alone.

### Conclusion
CoKG effectively preserves key entities under noisy multi-document inputs and is robust to noise compared with Chain-of-Density and Chain-of-Event prompts.

### Eval Data & Environment
Multi-document summarization setting; specific datasets and base LLMs are not enumerated in available secondary sources beyond the description of noisy multi-document inputs.

### Baselines
- Chain-of-Density (CoD)
- Chain-of-Event (CoE)
- Vanilla LLM summarization prompts

### Eval Results
The prompt effectively preserves key entities and is more robust to noisy documents than CoD/CoE baselines. Specific ROUGE / numerical scores are not reported in available secondary sources.

---

## iText2KG: Incremental Knowledge Graphs Construction Using Large Language Models
**Venue**: WISE 2024 (frequently cited baseline for 2025 KGC work), 2024  |  **arXiv**: 2409.03284  |  **PDF**: https://arxiv.org/pdf/2409.03284

**Authors**: Yassir Lairgi, Ludovic Moncla, et al.

### Problem
Traditional KGC pipelines depend on predefined ontologies and supervised training, are tied to specific document types, and require heavy post-processing.

### Method & Innovation
iText2KG is a plug-and-play, zero-shot, topic-independent incremental KGC pipeline composed of four modules: (1) Document Distiller (LLM rewrites raw text into structured semantic blocks guided by a user-defined blueprint); (2) Incremental Entity Extractor; (3) Incremental Relation Extractor; (4) Graph Integrator and Visualization. The blueprint mechanism enables document-type independence without retraining, and the incremental design avoids post-processing entity merging by handling resolution during extraction.

### Conclusion
iText2KG demonstrates superior precision and consistency over baseline methods across three scenarios: scientific papers, websites, and CVs — without retraining or post-processing.

### Eval Data & Environment
Three scenarios: scientific papers, websites, CVs. Implementation available at https://github.com/AuvaLab/itext2kg and as pip package itext2kg. Base LLM(s) not narrowly specified.

### Baselines
- Standard LLM-based KGC pipelines without distillation/blueprint
- Topic-dependent KGC baselines

### Eval Results
iText2KG achieves higher precision and consistency than baselines across scientific papers, websites, and CVs. Exact per-scenario precision/consistency numbers are not reported in available secondary sources.

---

## Reflection on Knowledge Graph for Large Language Models Reasoning (RefKG)
**Venue**: ACL 2025 Findings, 2025  |  **arXiv**: (none)  |  **PDF**: https://aclanthology.org/2025.findings-acl.1221.pdf

**Authors**: Authors per ACL listing

### Problem
KG-augmented LLM reasoning is brittle when extracted triples are noisy: single-pass extraction propagates errors to the downstream answer, producing hallucinations.

### Method & Innovation
RefKG is a reflective KG reasoning framework with three modules: (1) Query Decoupling, which decomposes a complex query into atomic sub-questions; (2) Evidence Subgraph Retrieval, which starts from related entities and selects the most probable relations to build an inference path in triplet form; (3) Inference with Knowledge Reconstruction, which uses self-correction signals over extracted entities/relations. The framework also includes Knowledge-Driven Multi-Task Tuning to enhance the model's ability to navigate KGs. The novelty is treating reflection as an explicit signal across joint construction-and-refinement during inference, rather than a one-shot KG augmentation.

### Conclusion
Reflective KG construction yields cleaner KGs and higher downstream reasoning accuracy across multiple benchmarks, e.g., RefKG reaches 98.1% accuracy on MetaQA Hop-1.

### Eval Data & Environment
Datasets: FactKG, WebQSP, MetaQA. Base LLMs: Baichuan-2, Llama-2, Internlm-2, Bloom (four open-source models). Five question types tested: One-hop, Conjunction, Existence, Multi-hop, Negation.

### Baselines
- GEAR
- Single-pass KG extraction + LLM answering
- Standard KG-RAG baselines

### Eval Results
RefKG outperforms GEAR and other baselines across FactKG (Table 1), WebQSP (Table 2), and MetaQA, achieving 98.1% accuracy on MetaQA Hop-1. Detailed per-question-type numbers reported in the paper but not enumerated in available secondary sources.

---

## Summary
**Total papers processed: 20 / 20.**

Papers with the most complete evaluation details (precise numbers reported): AutoSchemaKG, KGGen, KARMA, VaLiK, Graphusion, Taxonomy-Driven KGC, DIAL-KG, ATOM, ODKE+, RelPrior, RefKG, DynamicNER.

Papers with limited evaluation specifics in available sources (general claims only, no concrete per-task numbers): OneKE (demo paper), Synergizing Multimodal Temporal KG + LLMs, LKD-KGC, Chain of Knowledge Graph (CoKG), iText2KG, LightKGG, EMERGE.

One paper (LLM-empowered KGC: A Survey) is a survey with no experimental evaluation by design.
