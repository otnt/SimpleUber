#!/usr/bin/env python3
"""Regenerate training_free / training_required split files after refinement."""
import json
from pathlib import Path

CLASSIFIED = Path("/home/user/SimpleUber/research/classified")
CATEGORIES = ["kg_construction", "kg_rag", "graph_memory", "kg_agent"]

total_tf = 0
total_tr = 0
for cat in CATEGORIES:
    with open(CLASSIFIED / f"{cat}.json") as f:
        papers = json.load(f)
    tf = [p for p in papers if p.get("training_type") == "training_free"]
    tr = [p for p in papers if p.get("training_type") == "training_required"]
    with open(CLASSIFIED / f"{cat}_training_free.json", "w") as f:
        json.dump(tf, f, indent=2, ensure_ascii=False)
    with open(CLASSIFIED / f"{cat}_training_required.json", "w") as f:
        json.dump(tr, f, indent=2, ensure_ascii=False)
    print(f"{cat}: training_free={len(tf)}, training_required={len(tr)}")
    total_tf += len(tf)
    total_tr += len(tr)

print(f"\nTotal training_free: {total_tf}")
print(f"Total training_required: {total_tr}")
