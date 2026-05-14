#!/usr/bin/env python3
"""Consolidate, deduplicate, and classify papers from 4 raw lists."""
import json
import re
from pathlib import Path
from collections import defaultdict

RESEARCH_DIR = Path("/home/user/SimpleUber/research")
RAW = RESEARCH_DIR / "raw_lists"

CATEGORIES = ["kg_construction", "kg_rag", "graph_memory", "kg_agent"]


def normalize_title(t):
    t = t.lower()
    t = re.sub(r"[^a-z0-9 ]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def load_all():
    """Load papers and track which source lists each appeared in."""
    by_key = {}
    for cat in CATEGORIES:
        path = RAW / f"{cat}.json"
        with open(path) as f:
            papers = json.load(f)
        for p in papers:
            title_key = normalize_title(p.get("title", ""))
            arxiv = p.get("arxiv_id", "").strip()
            key = arxiv if arxiv else title_key
            if not key:
                continue
            if key in by_key:
                # merge - keep the longer abstract
                existing = by_key[key]
                if len(p.get("abstract", "")) > len(existing.get("abstract", "")):
                    existing["abstract"] = p["abstract"]
                existing.setdefault("source_lists", set()).add(cat)
            else:
                p = dict(p)
                p["source_lists"] = {cat}
                by_key[key] = p
    return list(by_key.values())


# Keyword sets for classification (based on title + abstract)
KW = {
    "kg_construction": [
        "knowledge graph construction", "kg construction", "construct knowledge graph",
        "build knowledge graph", "extract knowledge graph", "extract triples",
        "knowledge graph extraction", "schema induction", "kg extractor",
        "knowledge extraction", "triple extraction", "relation extraction",
        "open information extraction", "kg enrichment", "kg completion construction",
        "named entity recognition", "auto knowledge graph", "kg autoschemakg",
        "kg generation", "automatic knowledge graph",
    ],
    "kg_rag": [
        "graphrag", "graph rag", "graph-rag", "kg-rag", "kg rag",
        "knowledge graph rag", "retrieval augmented generation", "rag",
        "subgraph retrieval", "kg-enhanced retrieval", "kg retrieval",
        "graph-augmented retrieval", "retrieval-augmented", "lightrag",
        "hipporag", "pathrag", "noderag", "medgraphrag", "subgraphrag",
        "hypergraphrag", "graphsearch", "indexed graph", "graph-based retrieval",
        "kg powered rag", "kg-powered rag", "graph index",
    ],
    "graph_memory": [
        "graph memory", "graph-based memory", "memory graph",
        "long-term memory", "long term memory", "episodic memory",
        "memory consolidation", "agent memory", "memory system",
        "memory module", "memory retrieval", "memory bank",
        "zep ", "mem0", "memgpt", "a-mem", "memorag",
        "lifelong memory", "memory store", "memory representation",
        "persistent memory", "memory layer", "memory architecture",
    ],
    "kg_agent": [
        "knowledge graph agent", "kg agent", "kg-agent",
        "agent reasoning", "graph reasoning agent", "kg-augmented agent",
        "agent on graph", "agent over graph", "agentic kg",
        "agentic knowledge graph", "agent framework", "tool agent graph",
        "llm agent knowledge graph", "multi-agent kg", "planning on graph",
        "think on graph", "tog ", "paths over graph",
    ],
}


# Strong category indicators with weights for tie-breaking
def classify_category(paper):
    """Return primary category. Each paper goes to exactly one category."""
    title = paper.get("title", "").lower()
    abstract = paper.get("abstract", "").lower()
    text = title + " " + abstract
    sources = paper.get("source_lists", set())

    scores = defaultdict(int)
    for cat, kws in KW.items():
        for kw in kws:
            if kw in text:
                # title hits weighted more
                weight = 3 if kw in title else 1
                scores[cat] += weight

    # Boost based on which source lists found the paper
    for src in sources:
        scores[src] += 2

    # Special override rules
    if any(k in text for k in ["memory", " mem ", "long-term memory", "episodic"]):
        if any(k in text for k in ["agent memory", "agent's memory", "memory for agents", "graph memory", "long-term memory"]):
            scores["graph_memory"] += 4

    if "rag" in text and ("graph" in text or "kg" in text):
        scores["kg_rag"] += 1

    if "construct" in title or "extraction" in title or "extract" in title:
        scores["kg_construction"] += 3

    # If only one source list, default to it on tie
    if not scores:
        if sources:
            return list(sources)[0]
        return "kg_construction"

    # Get max
    max_score = max(scores.values())
    top = [c for c, s in scores.items() if s == max_score]
    if len(top) == 1:
        return top[0]
    # tie-break: prefer source list
    for c in top:
        if c in sources:
            return c
    return top[0]


# Training-free heuristics
TRAINING_KEYWORDS = [
    "fine-tune", "fine tune", "finetune", "finetun", "fine-tuning", "fine tuning",
    "train ", "training ", "trained ", "trainable",
    "supervised fine", "sft", "instruction tuning",
    "rlhf", "reinforcement learning from", "ppo training",
    "pre-train", "pretrain", "pretraining",
    "lora", "qlora", "peft", "adapter training",
    "we train", "we fine-tune", "we finetune",
    "model trained", "loss function", "training objective",
    "training data", "training dataset", "training corpus",
    "training procedure", "training step", "epoch",
    "gradient", "backprop", "optimize the model",
    "reward model", "dpo", "grpo", "rl-based training",
    "trains a ", "trains the ", "train a ", "train the ",
    "tuned llm", "fine-tuned llm", "fine-tuned model",
]

TRAINING_FREE_INDICATORS = [
    "training-free", "training free", "without training",
    "no training", "no fine-tuning", "no finetuning",
    "without fine-tuning", "zero-shot", "in-context",
    "off-the-shelf", "prompt-only", "prompting",
    "no parameter update", "frozen llm", "frozen model",
    "plug-and-play", "tuning-free", "tuning free",
]


def classify_training(paper):
    """Return 'training_free' or 'training_required'."""
    title = paper.get("title", "").lower()
    abstract = paper.get("abstract", "").lower()
    text = title + " " + abstract

    # Strong title-based overrides
    if "training-free" in title or "training free" in title or "tuning-free" in title:
        return "training_free"

    # "R1" suffix (DeepSeek-R1 style RL post-training) -> training required
    if re.search(r"\b[a-z]+-r1\b", title) or "-r1:" in title or "-r1 " in title:
        return "training_required"

    if "reinforcement learning" in title or " rl " in title:
        return "training_required"

    if "end-to-end" in title and ("learning" in title or "training" in title):
        return "training_required"

    free_hits = sum(1 for kw in TRAINING_FREE_INDICATORS if kw in text)

    # Stronger training signals (must appear in the system's design, not just background)
    strong_train_phrases = [
        "we train", "we fine-tune", "we finetune", "we pre-train", "we pretrain",
        "fine-tune the", "fine-tune a", "fine-tune our", "fine-tuned the",
        "fine-tuned model", "fine-tuned llm", "fine-tuned a",
        "trained the model", "trained on", "is trained on", "are trained on",
        "supervised fine-tuning", "instruction tuning", "instruction-tuning",
        "rlhf", "dpo training", "grpo", "ppo training", "reward model",
        "lora", "qlora", "peft", "adapter training",
        "reinforcement learning", "reward signal", "policy gradient",
        "loss function", "training objective", "training loss",
        "model fine-tuning", "model finetuning", "joint training",
        "trained graph neural", "train a gnn", "trained gnn",
        "training stage", "training phase", "two-stage training",
        "train an llm", "train the llm", "trains a model",
    ]
    strong_train = any(kw in text for kw in strong_train_phrases)

    if free_hits >= 1 and not strong_train:
        return "training_free"
    if strong_train:
        return "training_required"
    if free_hits >= 1:
        return "training_free"

    # Default: training-free (most KG-RAG/agent work is prompt-based)
    return "training_free"


def main():
    papers = load_all()
    print(f"Total unique papers: {len(papers)}")

    by_cat = defaultdict(list)
    for p in papers:
        cat = classify_category(p)
        tr = classify_training(p)
        p["category"] = cat
        p["training_type"] = tr
        p["source_lists"] = sorted(p["source_lists"])
        by_cat[cat].append(p)

    for cat, plist in by_cat.items():
        tf = [p for p in plist if p["training_type"] == "training_free"]
        tr = [p for p in plist if p["training_type"] == "training_required"]
        print(f"\n=== {cat} (total: {len(plist)}) ===")
        print(f"  training_free: {len(tf)}")
        print(f"  training_required: {len(tr)}")

    # Save classified files
    classified_dir = RESEARCH_DIR / "classified"
    classified_dir.mkdir(exist_ok=True)
    for cat in CATEGORIES:
        with open(classified_dir / f"{cat}.json", "w") as f:
            json.dump(by_cat[cat], f, indent=2, ensure_ascii=False)
        tf = [p for p in by_cat[cat] if p["training_type"] == "training_free"]
        tr = [p for p in by_cat[cat] if p["training_type"] == "training_required"]
        with open(classified_dir / f"{cat}_training_free.json", "w") as f:
            json.dump(tf, f, indent=2, ensure_ascii=False)
        with open(classified_dir / f"{cat}_training_required.json", "w") as f:
            json.dump(tr, f, indent=2, ensure_ascii=False)

    # Master index
    with open(classified_dir / "ALL_papers.json", "w") as f:
        json.dump(papers, f, indent=2, ensure_ascii=False)

    print(f"\nSaved to {classified_dir}")


if __name__ == "__main__":
    main()
