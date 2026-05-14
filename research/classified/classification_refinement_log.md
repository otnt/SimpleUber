# Classification Refinement Log

The following papers had their `training_type` corrected after careful re-reading of their abstracts against the refined criteria:

- [kg_construction.json] Automated Knowledge Graph Construction using Large Language Models and Sentence Complexity Modelling — training_free → training_required — Contributed training corpus of 7248 rows for sentence complexity, implying a trained complexity model component in the pipeline.
- [kg_rag.json] GRAG: Graph Retrieval-Augmented Generation — training_free → training_required — GRAG incorporates a graph view that uses a trained GNN encoder over retrieved textual subgraphs to feed structural signals into the LLM.
- [kg_rag.json] CG-RAG: Research Question Answering by Citation Graph Retrieval-Augmented LLMs — training_free → training_required — CG-RAG's LeSeGR integrates dense retrieval signals with graph encoding, training a contextualized graph encoder over citation graphs.
- [kg_agent.json] KnowAgent: Knowledge-Augmented Planning for LLM-Based Agents — training_free → training_required — KnowAgent's 'knowledgeable self-learning strategy' fine-tunes the LLM on filtered trajectories to internalise action-knowledge constraints.

## Final Counts

- **kg_construction.json**: training_free=20, training_required=9 (total=29)
- **kg_rag.json**: training_free=46, training_required=16 (total=62)
- **graph_memory.json**: training_free=22, training_required=5 (total=27)
- **kg_agent.json**: training_free=9, training_required=2 (total=11)

**Overall total**: training_free=97, training_required=32, sum=129
