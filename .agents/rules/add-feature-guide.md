---
description: Guide for adding new features to SilverBullet, covering frontend (Preact/TypeScript/CodeMirror) and backend (Go).
globs: client/**/*, server/**/*
---

# SilverBullet Feature Development Guide

When asked to add a new feature to the SilverBullet project, follow these guidelines to ensure consistency with the existing codebase and architecture.

## 1. Tech Stack & Architecture
- **Frontend**: TypeScript, Preact (for UI components), and CodeMirror 6 (for the editor).
- **Backend**: Go.
- **Build System**: ESBuild for frontend, `make` / `air` for development.

## 2. Frontend Guidelines (Client)
- **UI Components**: Place new Preact components in the `client/components/` directory.
- **Styling**: Use existing CSS variables for styling to support theming (e.g., `var(--top-background-color)`, `var(--ui-border-color)`).
- **Editor Features**: If the feature interacts with the text editor, implement it as a CodeMirror 6 extension or interact directly with the CodeMirror editor instance. 
- **Type Safety**: Maintain strict TypeScript typing. Avoid using `any`.

## 3. Backend Guidelines (Server)
- Write clean, idiomatic Go code.
- Follow the existing project structure within the `server/` directory.

## 4. Code Quality & LLM Policy Compliance
- **Readability**: Prioritize clean, human-readable code over clever or overly dense solutions.
- **No Hallucinations**: Do not hallucinate standard library functions, Preact hooks, or CodeMirror APIs. Verify the APIs before using them.
- **LLM Policy**: SilverBullet maintains an [LLM Use Policy](https://silverbullet.md/LLM%20Use). AI-generated code should be carefully considered, thoroughly understood, and well-integrated. Avoid generating unnecessary boilerplate or sweeping changes without a clear, targeted purpose.

## 5. Typical Workflow
1. **Understand Context**: Analyze existing files related to the feature (e.g., check `client/editor_ui.tsx` when adding UI elements).
2. **Implement**: Write the code using Preact for UI or Go for backend.
3. **Integrate**: Ensure new components are properly imported and rendered in the main application flow.
4. **Test & Verify**: Code should be tested locally. The user is likely running `air` to automatically rebuild the project on changes.
