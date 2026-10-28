# ArchiveAI — Enterprise Knowledge Search & RAG Assistant

**Delivered product customization • Document intelligence • Knowledge-grounded chat**

ArchiveAI is a document-oriented AI assistant and knowledge-management application developed through SrijanAI Innovations. It brings together searchable knowledge bases, configurable retrieval, document parsing, chat sessions, and source-linked responses in one operator-facing experience.

> **Real implementation, thoughtfully scoped.** This portfolio contains **curated source excerpts from our ArchiveAI implementation**. ArchiveAI was customized on top of **RAGFlow**, an Apache-2.0-licensed open-source project by the InfiniFlow authors. It would be inaccurate to claim authorship of the entire upstream RAG engine. The focus here is the integration, product configuration, and application changes made for this implementation.

## 30-second overview

| | |
| --- | --- |
| **Problem** | Teams need to ask questions over their own documents without manually searching large collections of PDFs and files. |
| **Product approach** | Ingest documents into knowledge bases, parse/index content, configure a retrieval-backed assistant, and view source-linked answers. |
| **Engineering focus** | Productizing an existing RAG stack through customized chat defaults, model integration, knowledge-base workflows, parsing lifecycle, and focused frontend UX. |
| **Technologies represented** | **React, TypeScript, TanStack Query, Ant Design, Umi, Python/Flask, RAGFlow-based RAG services, document parsing, and LLM/embedding integrations.** |
| **Source scope** | Selected authentic frontend integration and workflow modules; underlying RAG backend and all private deployment configuration remain excluded. |

## Start with the real engineering

| Area | Explore the source | What it demonstrates |
| --- | --- | --- |
| Retrieval-backed assistant setup | [Chat hooks and assistant presets](src/frontend/hooks/chat-hooks.ts) | Defined model/prompt defaults, retrieval thresholds, top-k selection, and chat/session lifecycle |
| Knowledge-base configuration | [Knowledge hooks](src/frontend/hooks/knowledge-hooks.ts) | Knowledge-base CRUD, search/pagination, parser configuration defaults, retrieval-test hooks |
| Model integration surface | [LLM hooks](src/frontend/hooks/llm-hooks.tsx) | Provider/model selection, tenant model settings, API-key configuration UI mutations (no keys included) |
| Chat experience | [Conversation workspace](src/frontend/pages/chat/index.tsx) · [Chat container](src/frontend/pages/chat/chat-container/index.tsx) | Assistants, conversation selection, cancellation handling, and session actions |
| Assistant UX | [Settings modal](src/frontend/pages/chat/chat-configuration-modal/index.tsx) · [Assistant settings](src/frontend/pages/chat/chat-configuration-modal/assistant-setting.tsx) | Controlled configuration surface and knowledge-base binding |
| Document lifecycle | [Parsing status](src/frontend/pages/add-knowledge/components/knowledge-file/parsing-status-cell/index.tsx) · [Document actions](src/frontend/pages/add-knowledge/components/knowledge-file/parsing-action-cell/index.tsx) | Job progress, processing state, lifecycle actions, and UI constraints |
| Source references | [PDF preview/highlighting](src/frontend/components/pdf-previewer/index.tsx) | Highlighting supporting document excerpts and navigating to cited passages |
| Knowledge configuration UI | [Configuration form](src/frontend/pages/add-knowledge/components/knowledge-setting/configuration.tsx) | Simplified user-facing parser and knowledge settings |
| Administration | [Tenant/user hooks](src/frontend/hooks/user-setting-hooks.tsx) · [File upload](src/frontend/components/file-upload-dialog/index.tsx) | Application settings and document intake UX |

[**Engineering deep dive and implementation trade-offs →**](ENGINEERING_NOTES.md)

## Architecture at a glance

~~~mermaid
flowchart TD
    U["Knowledge worker"] --> UI["React / TypeScript application"]
    UI --> UP["Document upload + knowledge-base management"]
    UI --> CHAT["Assistant / conversation workspace"]
    UP --> API["RAGFlow-based API and application services"]
    CHAT --> API
    API --> PARSE["Document parsing + chunking"]
    PARSE --> INDEX["Retrieval index / storage"]
    CHAT --> RET["Retrieval-backed answer generation"]
    RET --> API
    INDEX --> RET
    RET --> REF["Relevant document passages + references"]
    REF --> UI
~~~

*Diagram illustrates the product's conceptual data flow; it is not a claim that every depicted backend module is included here.*

## What I can explain in a technical discussion

1. **Productizing RAG:** How we configured model, embedding, parser, and retrieval defaults for a controlled operator experience.
2. **Document lifecycle:** Why parsing progress, failure feedback, and automatic kickoff matter in real document workflows.
3. **Answer traceability:** Navigating from a response to highlighted supporting PDF passages.
4. **Chat state:** Managing assistant configuration, conversation history, cache invalidation, and interrupted requests.
5. **Open-source integration:** Separating upstream RAGFlow capabilities from the customizations and implementation work delivered through SrijanAI.

## Scope, attribution, and use

This is a **curated portfolio edition**, with a clean Git history, not a complete runnable application. Imports intentionally refer to modules that are not redistributed. There are no live documents, user records, deployment files, credentials, or production data. No claims about proprietary invention of RAGFlow's parsing/retrieval algorithms or independently validated performance benchmarks are made.

**ArchiveAI implementation:** SrijanAI Innovations / Srijan Choudhary.  
**Upstream foundation:** RAGFlow — © The InfiniFlow Authors, licensed under Apache License 2.0. See [LICENSE](LICENSE).  
**Rights:** Original upstream licensing and attribution are preserved. Any separately created confidential or proprietary implementation elements not covered by Apache 2.0 are not licensed for reuse by this portfolio.
