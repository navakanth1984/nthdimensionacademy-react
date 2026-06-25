# Agents.md — Knowledge Base Operating Instructions

## Operating Brief

Whenever you run a session in this folder, you must maintain this self-improving knowledge base.

### Folder Structure
- `sources/` — Raw original files (unedited).
  - `sources/creative/`
  - `sources/technical/`
  - `sources/academic/`
- `wiki/` — Synthesized markdown wiki pages.
  - `wiki/index.md` — Table of contents/Index.
  - `wiki/log.md` — Simple entry activity log.
- `Agents.md` — This operating brief.

### Continuous Loop
1. **INGEST:** When new files are added to `sources/`, read them, update or create the corresponding `wiki/` pages, link related pages, and add a log entry to `wiki/log.md`.
2. **ANSWER:** Answer user questions from the `wiki/` pages first and cite the source files.
3. **TIDY:** Audit the wiki for contradictions, orphan pages, or missing summaries when requested, and present a punch list.
