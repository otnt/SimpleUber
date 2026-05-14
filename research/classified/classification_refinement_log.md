# Classification Refinement Log

The following papers had their `training_type` field updated based on a careful re-reading of their abstracts:

- [kg_construction.json] HGNet: Scalable Foundation Model for Automated Knowledge Graph Generation from Scientific Literature — training_free → training_required — Trains HGNet GNN with specialized message-passing, Differentiable Hierarchy Loss, and CAF Loss - explicit training of model components
- [kg_construction.json] GLiNER2: Schema-Driven Multi-Task Learning for Structured Information Extraction — training_free → training_required — Built on a fine-tuned encoder architecture - GLiNER2 itself is a fine-tuned model
- [kg_construction.json] Nested Named Entity Recognition as Single-Pass Sequence Labeling — training_free → training_required — Casts nested NER as a token classification/sequence labeling task - requires training the labeler
- [kg_rag.json] Simple Is Effective: The Roles of Graphs and Large Language Models in Knowledge-Graph-Based Retrieval-Augmented Generation — training_free → training_required — Trains a lightweight MLP with parallel triple-scoring mechanism for subgraph retrieval
- [kg_rag.json] Graph-constrained Reasoning: Faithful Reasoning on Knowledge Graphs with Large Language Models — training_free → training_required — Uses a KG-specialized LLM trained for graph-constrained reasoning via KG-Trie
- [kg_rag.json] ReMindRAG: Low-Cost LLM-Guided Knowledge Graph Traversal for Efficient RAG — training_required → training_free — Paper explicitly states 'train-free manner' - memorizes within edge embeddings without training
- [kg_rag.json] GNN-RAG: Graph Neural Retrieval for Efficient Large Language Model Reasoning on Knowledge Graphs — training_free → training_required — GNN is trained for KGQA subgraph reasoning, plus uses a 7B tuned LLM
- [kg_rag.json] D-RAG: Differentiable Retrieval-Augmented Generation for Knowledge Graph Question Answering — training_free → training_required — Jointly trains/optimizes the retriever and the generator via differentiable RAG
- [kg_rag.json] LightPROF: A Lightweight Reasoning Framework for Large Language Model on Knowledge Graph — training_free → training_required — Paper explicitly states it requires training Knowledge Adapter (a Transformer-based component)
- [kg_rag.json] Personalizing Large Language Models using Retrieval Augmented Generation and Knowledge Graph — training_required → training_free — Uses RAG with KG for personalization - no mention of training the model
- [kg_rag.json] Retrieval Augmented Generation for Dynamic Graph Modeling (RAG4DyG) — training_free → training_required — Uses time- and context-aware contrastive learning module
- [kg_rag.json] HyperG: Hypergraph-Enhanced LLMs for Structured Knowledge — training_free → training_required — Trains a prompt-attentive hypergraph learning (PHL) network
- [kg_rag.json] G-reasoner: Foundation Models for Unified Reasoning over Graph-structured Knowledge — training_free → training_required — Trains a 34M-parameter graph foundation model that jointly captures graph topology and textual semantics
- [graph_memory.json] From Experience to Strategy: Empowering LLM Agents with Trainable Graph Memory — training_free → training_required — Uses reinforcement-based weight optimization and integrates into the LLM agent's training loop
- [graph_memory.json] Enhancing LLM Planning for Robotics Manipulation through Hierarchical Procedural Knowledge Graphs — training_required → training_free — Uses KG as external memory module for LLM planning - no mention of training; prompting-based
- [kg_agent.json] Paths-over-Graph: Knowledge Graph Empowered Large Language Model Reasoning — training_required → training_free — Uses pre-trained language model for pruning - no mention of further training, prompting-based
- [kg_agent.json] Plan-on-Graph: Self-Correcting Adaptive Planning of Large Language Model on Knowledge Graphs — training_required → training_free — Self-correcting adaptive planning paradigm with reflection - no training mentioned, prompting-based
