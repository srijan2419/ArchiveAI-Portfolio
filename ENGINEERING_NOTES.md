# ArchiveAI — Engineering Deep Dive

This document connects representative code excerpts to ArchiveAI's document-search and retrieval-augmented assistant workflows. **The underlying engine is based on RAGFlow**, originally from the InfiniFlow authors, and much of the larger engine is not reproduced here.

## 1. From files to a searchable knowledge base

The [knowledge-base query and mutation hooks](src/frontend/hooks/knowledge-hooks.ts) coordinate listing, search, pagination, creating and deleting knowledge bases, changing knowledge configuration, and retrieval testing. They use TanStack Query caching and mutation invalidation to keep the interface consistent.

A deployment-specific `HARDCODED_KNOWLEDGE_CONFIG` sets default embedding, language, parser, and document-processing options. The checked source explicitly sets **`use_graphrag: false`**. ArchiveAI should **not** be advertised as actively enabling GraphRAG by default just because upstream options exist.

The [knowledge configuration UI](src/frontend/pages/add-knowledge/components/knowledge-setting/configuration.tsx) pares down the operator-facing options. These decisions favor an opinionated deployment over exposing every upstream setting.

## 2. Processing status is part of the product

The [parsing-status component](src/frontend/pages/add-knowledge/components/knowledge-file/parsing-status-cell/index.tsx) reports progress, logs/errors, and elapsed time. It includes a React effect that initiates processing when a document's token count is zero, guarded by a ref to avoid repeatedly triggering the same operation within the component lifecycle.

The [document-action component](src/frontend/pages/add-knowledge/components/knowledge-file/parsing-action-cell/index.tsx) coordinates renaming, deletion, and downloading while disabling some actions during an active parse.

Those source excerpts demonstrate the **frontend job lifecycle**, not proof of fully tested retry/idempotency guarantees on the backend.

## 3. Configurable retrieval-backed chat

[Chat hooks](src/frontend/hooks/chat-hooks.ts) define an assistant preset with **`gpt-4o-mini`**, `top_n: 8`, `similarity_threshold: 0.2`, and a knowledge-grounded prompt with an explicit missing-evidence fallback. These are **source configuration values, not evaluation results**. The hooks manage assistant mutation, conversation state, cache refreshes, and shared chat access.

[LLM integration hooks](src/frontend/hooks/llm-hooks.tsx) expose how models are discovered, grouped by capability, selected, and saved for a tenant. The **actual API credentials are not included** here.

The [chat workspace](src/frontend/pages/chat/index.tsx), [chat container](src/frontend/pages/chat/chat-container/index.tsx), and [settings modal](src/frontend/pages/chat/chat-configuration-modal/index.tsx) show the application-level orchestration around the underlying RAG services.

## 4. Answer traceability

The [PDF previewer](src/frontend/components/pdf-previewer/index.tsx) uses a PDF highlighter and selected chunk coordinates to navigate to supporting passages. Source-backed UI is a practical safeguard against treating every generated answer as equally trustworthy; the code is **not** a guarantee that every answer is factually correct.

## 5. What belongs to the upstream project

The original ArchiveAI codebase includes many components and copyright notices from **RAGFlow / the InfiniFlow authors**, which is Apache-2.0 licensed. This portfolio describes **our use and customization of that foundation**, not a ground-up invention of the RAG engine, document OCR, vector retrieval algorithms, or upstream APIs.

Representative files here are not necessarily exclusively authored by one contributor. The appropriate engineering discussion is about **integration choices, configuration changes, product delivery, and how the system was adapted**.

## 6. Scope and limitations

- This is a **partial code showcase**, not a deployable standalone distribution. Internal dependencies and services are intentionally absent.
- No customer data, secret keys, private infrastructure, uploaded documents, or production config is included.
- No benchmark, citation-accuracy measurement, independently verified deployment count, or commercial revenue figure is claimed.
- Selected code reflects the implementation at the referenced source revision; it has not been re-run as a full system from this portfolio.
- Before adding any future images/videos, check ownership, permissions, visible document content, and identifying information.

For copyright terms see [LICENSE](LICENSE); for a recruiter-friendly overview return to [README.md](README.md).
