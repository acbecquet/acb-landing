# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

> Foundation: derived from [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on LLM coding pitfalls, via https://github.com/multica-ai/andrej-karpathy-skills.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## Project: ACB Landing

An interactive TypeScript landing page for Charlie Becquet's projects, split into three divisions:

- **ACB · mods** — gameplay mods for Easy Red 2 (flagship: Living NPCs; also Coop Squad Manager, Dogfight Mode), heading toward LLM-driven NPCs and, eventually, an original UE5 game. Links: Nexus (`cbecquet`), YouTube (`@ACBMods`).
- **ACB · apps** — Rapid Reader, an RSVP speed-reading platform for agentic workflows and any text/EPUB. Repo: `acbecquet/rapid-reader`.
- **ACB · tech** — software that bridges physical media (Video Viscometer), built on an open-source / "1/10 the price" philosophy. Repo: `acbecquet/video-viscometer`.

Voice: keep Charlie's real words. The personal manifesto (the 2007 settings-menu story, "put the LLMs where they belong", "jack-of-all-trades", the anti-"domination" ethos) is anchor copy — preserve it, don't paraphrase it away.

**Note on `pretext`** (https://github.com/chenglou/pretext): it is a text *measurement/layout* library, not a web framework. It measures text via canvas without DOM reflow; rendering is on us. Use it for the typographic layer (balanced/no-orphan headlines, the RSVP hero), not as the site engine. Stack: Vite + TypeScript.

> Stack details and structure are finalized once a layout direction is chosen. `/mockups` holds throwaway exploration, not production code.
