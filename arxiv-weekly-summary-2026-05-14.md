# arXiv cs.DB 周报 · 2026-05-11 至 2026-05-14

> 抓取范围：arXiv 数据库（cs.DB）类目本周（2026 年 5 月 11 日至 5 月 14 日）出现在 cs.DB/recent 列表中的论文。
>
> 报告日期：2026-05-14
>
> 数据获取说明：因 arXiv 站点对外抓取受限（HTTP 403），本周报通过多轮搜索引擎查询交叉验证完成；arXiv 编号以 `2605.xxxxx` 为本月新提交，部分以 `2603/2604.xxxxx` 编号的论文为前几个月提交、本周仍在 cs.DB 推荐列表中传播的工作，亦一并整理。

---

## 一、概览

本周 cs.DB 出现了大约 **27 篇**值得关注的论文（其中约 12 篇为本周新增 `2605.xxxxx` 编号），整体呈现出几个清晰的研究趋势：

- **LLM × 数据库** 仍是绝对主线：Text-to-SQL / Text-to-Cypher / 图查询生成、Agent 化数据访问、合成表辅助联邦学习等方向占近一半篇幅；
- **向量数据库与近邻检索（ANNS）** 在系统层（多核 / GPU / 多属性过滤）持续深耕；
- **本体、知识图谱与规则推理** 出现一批理论与系统并重的工作（Lean 中的 Chase 形式化、ASP(Q) 一致性修复、稳定匹配本体对齐）；
- **去中心化数据与隐私**（SOLID/ESPRESSO）、**RAG 数据层** 等"系统工程"性质论文也在持续输出；
- 多篇 ESWC 2026（5 月 10–14 日 Dubrovnik）与 KR 2026 录用论文集中在本周登 arXiv。

---

## 二、主题分类

### A. 向量检索 / 近邻搜索（ANNS）系统
| 编号 | 标题 | 角度 |
|---|---|---|
| 2605.10090 | CCD-Level and Load-Aware Thread Orchestration for In-Memory Vector ANNS | 多核 CPU + chiplet 拓扑感知 |
| 2604.20121 | Garfield: GPU 加速的多属性范围过滤 ANNS | GPU + 混合标量过滤 |
| 2604.19116 | LIVE: Learnable Monotonic Vertex Embedding | 精确子图匹配（边界相关） |
| —（标题已知） | MCI: A Maximal Clique Index for Arbitrary-Filtered ANNS | 极大团索引 + 任意属性过滤 |

### B. Text-to-SQL / Text-to-Cypher / 自然语言查询
| 编号 | 标题 | 角度 |
|---|---|---|
| 2605.10318 | Text2Cypher with Grammar &amp; Schema Aware Filtering | Neo4j / 置信度 + 语法+模式过滤 |
| 2605.13236 | IfcLLM: NL Querying of IFC Models, Relational + Graph | BIM/IFC + 关系&图双表示 |
| 2605.08057 | CA-SQL: Complexity-Aware Inference Time Reasoning | 难度自适应的探索宽度 |
| 2605.05525 | Anatomy of a Query: W5H + FAR | 评测维度的精细化 |
| 2605.04719 | FineStep: Step-Level Credit for Tool-Integrated Text-to-SQL | 工具增强 Agent 的步级信用分配 |
| 2605.03465 | FINER-SQL: Boosting Small LMs for Text-to-SQL | 小模型 Text-to-SQL |
| 2605.00628 | EGRefine: Execution-Grounded Schema Refinement | 通过视图重写做执行优化 |
| 2604.21214 | SQLyzr: 综合评测平台 | 细粒度评测、负载放缩、错误分析 |
| 2605.00845 | UniQGen: 跨 SPARQL/Cypher 的约束式生成 | LLM Agent + Chase/Backchase |

### C. 知识图谱 / 本体 / 规则推理
| 编号 | 标题 | 角度 |
|---|---|---|
| 2605.09184 | Open Ontologies: 工具增强的本体工程 | Rust MCP + OWL2-DL/SHACL/SPARQL + 稳定匹配对齐 |
| 2604.22531 | The Chase in Lean | Lean 4 中对存在量化规则与 Chase 的形式化 |
| 2604.21603 | Using ASP(Q) to Handle Inconsistent Prioritized Data | 三类修复语义的首个实现 |
| —（标题已知） | How Hard is it to Decide if a Fact is Relevant to a Query? | KR 2026 长版本，事实相关性的复杂度刻画 |
| —（ESWC 2026） | It's Time to Standardize RDF Messages | RDF 消息序列化标准化 |

### D. 数据系统 / 查询优化 / 性能预测
| 编号 | 标题 | 角度 |
|---|---|---|
| 2603.02253 | Cross-Layer Decision Timing Orchestration | 编译期→运行期的延迟绑定，PostgreSQL 上 P99 提升至 20× |
| 2605.05044 | Efficient Cost-Based Rewrite in a Bottom-Up Optimizer | 等价条件的规范化处理，避免枚举爆炸 |
| 2604.20145 | Pre-Execution Slot-Time Prediction (BigQuery) | 特征工程 + HistGradientBoosting |
| 2604.19982 | 3DPipe: Pipelined GPU Generalized Spatial Join | 体素+面片多级剪枝 + CPU/GPU/IO 流水 |
| 2605.06817 | Analyzing DBMS Adoption in Java OSS | 实证研究，跨 362 个项目 |

### E. RAG / 数据层 / Agent 化数据访问
| 编号 | 标题 | 角度 |
|---|---|---|
| 2605.03275 | Beyond Similarity Search: 统一数据层 for Production RAG | PostgreSQL + pgvector + HNSW，多租户/时效一体化 |
| 2604.21413 | RUBICON: Data-Centric Agentic AI Architecture | AQL 查询代数 + 源内执行（in situ） |
| 2605.04278 | Material Database Agent | 多模态多智能体从论文 PDF 抽取结构化数据库 |

### F. 联邦学习 / 隐私 / 去中心化数据
| 编号 | 标题 | 角度 |
|---|---|---|
| 2605.09855 | Concordia: Self-Improving Synthetic Tables for Federated LLMs | 三层优化 + LoRA，跨客户端 non-IID |
| 2604.22100 | ESPRESSO: SOLID 上的可扩展关键字搜索 | WebID 范围索引、可视性约束、威胁建模 |

### G. 图数据库 / 属性图
| 编号 | 标题 | 角度 |
|---|---|---|
| 2603.06703 | The Fifth Graph Normal Form (5GNF) | 基于 Trait 的属性图元数据规范化，Neo4j 实现 |

### H. 日志分析 / 可观测性 / LLM 辅助分析
| 编号 | 标题 | 角度 |
|---|---|---|
| 2605.09222 | Krone: Hierarchical Log Anomaly Analytics + LLM | 实体/动作/状态多层抽象 + 可视化平台 |

---

## 三、逐篇摘要

### A. 向量检索 / ANNS

**2605.10090 — CCD-Level and Load-Aware Thread Orchestration for In-Memory Vector ANNS on Multi-Core CPUs**
作者：Yuchen Huang, Baiteng Ma, Yiping Sun 等
针对多 chiplet（CCD）CPU 上 ANNS 的访存延迟、低 cache 利用率与忽略片上拓扑问题，提出工作负载与硬件感知的线程调度框架：统一的任务提交接口同时支持 HNSW 与 IVF；引入 cache 友好的任务→chiplet 派发器与 CCD 感知的工作窃取策略。生产负载下吞吐提升至 3.7×，P50/P999 延迟下降 30%–90%。

**2604.20121 — Garfield: GPU-Accelerated Multi-Attribute Range-Filtered ANNS**
提出 GMG 索引：将数据切分为 cell、在 cell 内建局部图、cell 间引入常数级跨 cell 边，从而实现线性的存储与构建开销。索引体积减小 4.4×，相对 SOTA 吞吐提升 119.8×。

**2604.19116 — LIVE: Learnable Monotonic Vertex Embedding for Exact Subgraph Matching**
通过设计层面保证顶点嵌入的单调性，使 dominance 成为结构性正确性；iLabel 索引把多维嵌入映射到一维键空间并保持 dominance，可直接用 B+-tree 范围查询代替复杂索引。

**MCI: A Maximal Clique Index for Arbitrary-Filtered ANNS**（Xiaowei Ye 等）
利用极大团结构作为过滤式 ANNS 的索引基底，支持任意属性谓词；本周登上 cs.DB recent，但 arXiv ID 暂未通过搜索定位。

### B. Text-to-SQL / Text-to-Cypher

**2605.10318 — Extending Confidence-Based Text2Cypher with Grammar and Schema Aware Filtering**（Makbule Gulcin Ozsoy, Neo4j）
在置信度推理流水线后接入"语法校验 → 模式约束校验 → 聚合"的过滤序列。语法过滤显著改善句法合法率，模式过滤进一步提升执行正确率；代价是空预测增多、覆盖率下降。

**2605.13236 — IfcLLM: Hybrid NL Querying of IFC BIM Models**
把 IFC 同时转换为关系存储（属性与几何）与图存储（拓扑关系），通过迭代重试-精炼的 LLM 推理融合两端。基础模型为开放权重 GPT-OSS 120B，强调可复现的部署形态。

**2605.08057 — CA-SQL（James Petullo, Nianwen Xue）**
按任务难度自适应地分配推理预算，结合进化式 prompt 播种与新颖投票机制，在 BIRD-Bench 上验证。

**2605.05525 — Anatomy of a Query: W5H + FAR**
为 Text-to-SQL 评测提出结构不变量 FAR 与"谁/什么/哪里/何时/为什么/如何"的 W5H 维度分解，支持细粒度错误分析。

**2605.04719 — FineStep: Step-Level Credit Assignment**
为工具增强的 Text-to-SQL Agent 引入步级信用分配，避免传统强化训练只看末端正确性的稀疏奖励问题。

**2605.03465 — FINER-SQL**
针对小语言模型在 Text-to-SQL 上"推理弱、指令跟随差"的两个核心瓶颈做改进，目标是私有/低成本部署。

**2605.00628 — EGRefine**
将模式精化视为受约束的优化问题：最大化 Text-to-SQL 执行正确率，同时通过数据库视图保持查询等价。

**2604.21214 — SQLyzr**
完整的 Text-to-SQL 评测平台：多维指标、负载与现实 SQL 对齐、数据库规模化、细粒度分类与错误分析、负载增强；带 GUI。

**2605.00845 — UniQGen**
基于约束的 LLM 多智能体框架，跨 SPARQL（RDF）与 Cypher（属性图）抽取与精化查询子句；使用 Chase-and-Backchase 变体，在部署到 Amazon Neptune 上的 Freebase Cypher 版本上评测 GraphQ / GrailQA / WebQSP。

### C. 知识图谱 / 本体 / 规则推理

**2605.09184 — Open Ontologies**（Fabio Rovai）
Rust 实现的本体引擎，作为 MCP server 暴露给 LLM；内存 Oxigraph 三元组、原生 OWL2-DL tableaux 推理、SHACL 校验、SPARQL、版本化。对齐部分将七个加权信号（标签、属性/父类/实例/约束/邻域重叠 + 嵌入）结合稳定 1-对-1 匹配，并在无结构证据时对纯标签匹配施加惩罚。无 JVM 依赖、单二进制分发。

**2604.22531 — The Chase in Lean**（Lukas Gerlach, KR 2026）
在 Lean 4 中形式化存在量化规则与多种 Chase 定义；证明通用模型（universal model）结论；勾勒在"无另一匹配"前提下证明结果为 core 的路径；以 Model-Faithful Acyclicity 的思路统一 Chase 终止条件，并支持规则中带常量。

**2604.21603 — Using ASP(Q) for Inconsistent Prioritized Data**（Bienvenu 等，KR 2026 长版本）
用带量词的 ASP(Q) 做一致性容忍查询，覆盖 Pareto-/全局-/补全-最优三种修复语义；首次实现全局最优语义与对其的 grounded（可处理近似）语义。

**How Hard is it to Decide if a Fact is Relevant to a Query?**（Bienvenu, Figueira, Lafourcade）
KR 2026 录用工作的 arXiv 长版本，对"事实相关性"判定的复杂度做系统刻画。

**It's Time to Standardize RDF Messages**（ESWC 2026，Colpaert &amp; Sowinski）
推动 RDF 在消息序列化场景下的标准化讨论。

### D. 数据系统 / 查询优化 / 性能预测

**2603.02253 — Cross-Layer Decision Timing Orchestration**
把"最终决策权"从编译期 optimizer 部分地下放到运行期 executor，做算子级选择的选择性延迟绑定。定义统一的风险信号（融合 optimizer 不确定性 + 运行时观测 + 加速器代价信号）。PostgreSQL 原型在严重基数估计漂移下，P99 延迟最高下降 20×，且不牺牲中位延迟。

**2605.05044 — Efficient Cost-Based Rewrite in a Bottom-Up Optimizer**
自底向上重写时反复比较语义等价的条件会出现指数爆炸；论文用基于成员集的规范表示替代排列枚举，显著降低开销。

**2604.20145 — Pre-Execution Slot-Time Prediction in BigQuery**
执行前预测 slot-time：结构性复杂度评分 + 数据量特征 + TF-IDF 文本特征 → HistGradientBoosting。在两个未见环境的 746 个查询上 MAE 1.17 slot-minute，解释方差 74%；在高成本查询上 MAE 较朴素基线降低 30%–37%。

**2604.19982 — 3DPipe**
面向多面体对象的广义 3D 空间连接：体素对过滤 + 面片级精化的多级剪枝；分块流式处理避免内存爆炸；CPU/GPU/PCIe 流水。相对 GPU SOTA（TDBase）加速最高 9.0×。

**2605.06817 — DBMS Adoption Across Java OSS History**
对 362 个流行 Java 开源项目的 DBMS 采纳史做实证分析：MySQL/PostgreSQL 主导关系数据库；Redis/MongoDB 主导非关系且采纳后稳定；polyglot persistence 普遍出现。

### E. RAG / 数据层 / Agent 化数据访问

**2605.03275 — Beyond Similarity Search**
将生产 RAG 不稳定的三个根因（数据陈旧、租户数据泄漏、查询组合爆炸）归结于"分裂的数据层"，提出 PostgreSQL + pgvector + HNSW 一体化方案。5 万文档基准：日期过滤查询延迟降 92%，租户过滤降 74%，跨租户泄漏完全消除。

**2604.21413 — RUBICON**
"以数据为中心"的 Agentic AI 架构，提出 AQL（Find/From/Where 的小代数）经源专属适配器执行；主张企业 AI 的瓶颈是数据集成而非推理；将检索视为虚拟数据集成、源数据保留在原处（in situ）。

**2605.04278 — Material Database Agent**
模块化多智能体系统，把材料科学论文 PDF 并行解析为 markdown + 图片，再由若干子 Agent 合成单篇结构化子数据库。

### F. 联邦 / 隐私 / 去中心化

**2605.09855 — Concordia**
联邦场景下用合成表替代原始表对 LLM 做表格任务适配；三层优化对齐合成数据生成与联邦验证效用，处理严格隔离与 non-IID 客户端分布；LoRA 参数高效微调。

**2604.22100 — ESPRESSO**（Ragab 等）
针对 SOLID pods 的去中心化关键字搜索：基于 WebID 的 pod 内索引 + 隐私感知元数据用于源选择与排序；给出形式化威胁模型，覆盖索引/元数据生成与聚合中的元数据泄漏与对抗推断风险。

### G. 图数据库

**2603.06703 — 5GNF**
为属性图提出基于 Trait 的第五范式：把重复出现的元数据抽离为规范化的 Trait 节点，经 HAS_TRAIT 关联；形式化 trait 函数依赖（tFDs），并给出 TraitExtraction5GNF 识别可复用 trait。Neo4j 实现，Northwind 数据集评测。

### H. 日志分析 / LLM 辅助可观测性

**2605.09222 — Krone**（WPI 团队）
分层编排框架：把平铺的日志序列重组为实体/动作/状态三个语义层；把异常检测分解为可在不同抽象层执行的模块化任务，对 LLM 推理做选择性调用，支持检测 + 定位 + 解释；附 Krone-viz 交互可视化平台，在真实 HDFS 日志上演示。

---

## 四、关键趋势与观察

1. **Text-to-SQL 走向"小、细、稳"**：本周至少 7 篇围绕 Text-to-SQL/Cypher，主旋律已从"打榜大模型"转向小模型适配（FINER-SQL）、步级信用分配（FineStep）、模式/语法过滤（Text2Cypher）、模式精化（EGRefine）、复杂度自适应（CA-SQL），以及更细粒度评测（SQLyzr、W5H/FAR）。这预示着 NL2Query 进入"工程化落地 + 评测精细化"的阶段。
2. **向量数据库的瓶颈下沉到硬件**：从 HNSW/IVF 的算法层，本周明显下沉到 chiplet 拓扑、GPU 流水、过滤式 ANNS 的索引设计。CCD-Level ANNS 与 Garfield 是典型案例。
3. **LLM 与数据库的"接口范式"重新被审视**：RUBICON 提出小代数 AQL、Open Ontologies 用 MCP server 暴露 OWL 工具、IfcLLM 用关系+图双表示，这些工作都在尝试找出"LLM × DB"更稳健的接口面，而不是单纯依赖 prompt 工程。
4. **去中心化与隐私在 SOLID 生态走向系统化**：ESPRESSO 把可视性策略、可扩展性与威胁模型一并讨论，这是 SOLID 数据栈成熟的标志之一。
5. **理论层面与 KR/ESWC 联动密集**：Lean 中的 Chase 形式化、ASP(Q) 优先级修复、事实相关性复杂度等 KR 2026 录用工作在本周集中登 arXiv，长版本提供了实现细节与可执行原型。

---

## 五、本周报方法学说明

- 由于 arXiv 站点对外抓取受限（HTTP 403 across `arxiv.org / export.arxiv.org / ar5iv / papers.cool` 等镜像与 `curl` 出口），无法直接拉取 `cs.DB/2026-05` 列表；
- 改为使用搜索引擎多轮交叉验证：按主题、按 arXiv 编号区段、按已知论文标题反查 ID 与摘要；
- arXiv 编号规则：`YYMM.NNNNN`，故本周新提交均以 `2605.` 起头；编号 `2605.09xxx-2605.13xxx` 大致对应 5 月 11–14 日提交窗口；
- 部分仍在 cs.DB recent 页面流转的论文 ID 为 `2603/2604.xxxxx`，属本月之前提交但本周被持续曝光的工作，本报告以"前期工作"一并整理；
- 因此本报告对"本周窗口内首次提交"严格命中的论文约 12 篇（标记为 `2605.xxxxx` 且日期在 11–14 日附近），其余约 15 篇作为补充语境收录；实际 arXiv 当周 cs.DB 新提交数估计在 25–45 篇区间，本报告覆盖率约 60–80%。

---

## 六、引用与来源

- arXiv:2605.09222 — Detect, Localize, and Explain (Krone)
- arXiv:2605.09184 — Open Ontologies
- arXiv:2605.09855 — Concordia
- arXiv:2605.10090 — CCD-Level ANNS
- arXiv:2605.10318 — Text2Cypher with Grammar/Schema Filtering
- arXiv:2605.13236 — IfcLLM
- arXiv:2605.06817 — DBMS Adoption Study
- arXiv:2605.05525 — Anatomy of a Query (W5H/FAR)
- arXiv:2605.05044 — Cost-Based Rewrite
- arXiv:2605.04719 — FineStep
- arXiv:2605.04278 — Material Database Agent
- arXiv:2605.03465 — FINER-SQL
- arXiv:2605.03275 — Beyond Similarity Search (Unified RAG Data Layer)
- arXiv:2605.00845 — UniQGen
- arXiv:2605.00628 — EGRefine
- arXiv:2605.08057 — CA-SQL
- arXiv:2604.22100 — ESPRESSO (SOLID Keyword Search)
- arXiv:2604.22531 — Chase in Lean
- arXiv:2604.21603 — ASP(Q) Inconsistent Prioritized Data
- arXiv:2604.21413 — RUBICON
- arXiv:2604.21214 — SQLyzr
- arXiv:2604.20145 — Slot-Time Prediction
- arXiv:2604.20121 — Garfield GPU RFANNS
- arXiv:2604.19982 — 3DPipe
- arXiv:2604.19116 — LIVE
- arXiv:2603.06703 — 5GNF
- arXiv:2603.02253 — Cross-Layer Decision Timing
- KR 2026 / ESWC 2026 / ICDE 2026 / SIGMOD 2026 会议页（作为论文交叉验证来源）
