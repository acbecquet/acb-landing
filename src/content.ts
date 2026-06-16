/* =============================================================================
   ✏️  EDIT ALL WEBSITE TEXT HERE
   -----------------------------------------------------------------------------
   • Change anything between the quotes. That's it.
   • Wrap a word in **double asterisks** to make it bold.
   • Don't remove the quotes "  ", the commas, or the { } brackets — those are
     the only "code" here. If you delete one by accident the build will fail,
     which means a broken version simply never goes live. Just fix it and save.
   • After you save (commit), the site rebuilds itself in about a minute.
   ============================================================================= */

// The story the speed-reader plays at the top (and shows under "Read it normally").
export const story =
  `I grew up loving science and video games. In 2007 I was playing an old — even at the time — copy of Battlefield 1942, and first learned the word "AI" in the settings menu. Artificial Intelligence. That made a lot of sense to me to put in a video game. Fast forward 25 years and people can't stop talking about AI. Most would agree that AI in the right hands could do really good, and in the wrong hands could do really bad. But for some reason, nobody seems to think it's possible to put what we now call "AI" — Large Language Models — into the thing we first put AI in. That's my inspiration for the living-NPC mods: to put the LLMs in a place where they belong. In my professional life I'm an engineer. I studied physics in university, and I've always lived somewhere in the middle of engineering — between pure coding and pure building. Physics mostly just taught me how the world worked. I was never very good at coding. I slowly learned MATLAB and Python over 6–7 years, but I'd be a fool to say I was anywhere near the level of a software engineer. And then the LLMs came along. A lot of people wanted to ask them personal questions; I wanted to use them to learn how to code better. Now, with agentic coding, I get to leverage that "in-between" lifestyle — letting my creativity spread across multiple fields to build fun tools for everybody.`;

const text = {
  hero: {
    kicker: "Charlie Becquet — engineer · physicist · builder",
    title: "Putting the LLMs where they belong.",
    titleAccent: "LLMs", // this exact word in the title gets the underline accent
    lede: "Mods, apps, and lab tools — built in the space between pure coding and pure building. Here's my story, read at 2× speed by the same engine that powers Rapid Reader.",
  },

  origin: {
    eyebrow: "where this comes from",
    leftHeading: "// the settings menu, 2007",
    left: [
      `I grew up loving science and video games. In 2007 I was playing an old — even at the time — copy of Battlefield 1942, and first learned the word "AI" in the settings menu. Artificial Intelligence. That made a lot of sense to me to put in a video game.`,
      `Fast forward 25 years and people can't stop talking about AI. Most would agree that AI in the right hands could do really good, and in the wrong hands could do really bad. But for some reason, nobody seems to think it's possible to put what we now call "AI" — Large Language Models — into the thing we first put AI in. That's my inspiration for the living-NPC mods: to put the LLMs in a place where they belong.`,
    ],
    rightHeading: "// jack-of-all-trades, master of none",
    right: [
      `In my professional life I'm an engineer. I studied physics in university, and I've always lived somewhere in the middle of engineering — between pure coding and pure building. Physics mostly just taught me how the world worked.`,
      `I was never very good at coding. I slowly learned MATLAB and Python over 6–7 years, but I'd be a fool to say I was anywhere near the level of a software engineer. And then the LLMs came along. A lot of people wanted to ask them personal questions; I wanted to use them to learn software development.`,
      `Now, with agentic coding, I get to leverage that "in-between" lifestyle — letting my creativity spread across multiple fields to build fun tools for everybody.`,
    ],
  },

  mods: {
    eyebrow: "ACB · mods",
    heading: "Immersive NPCs for the games I love.",
    sub: "Gameplay mods for **Easy Red 2** today — Kingdom Come: Deliverance 2, Battlefield 1942, and more next. I'm building for the coming explosion of LLM-NPC games as NVIDIA Spark lands.",
    // Add a mod = copy one { } block and edit it.
    items: [
      { name: "Living NPCs", badge: "unreleased · flagship", blurb: "A large-scale, immersive NPC experience.", meta: "easy red 2 · LLM-driven" },
      { name: "Coop Squad Manager", badge: "released", blurb: "Command and coordinate an AI squad in cooperative play.", meta: "easy red 2 · coop" },
      { name: "Dogfight Mode", badge: "released", blurb: "A focused aerial-combat mode built for fast, replayable dogfights.", meta: "easy red 2 · aerial" },
    ],
    links: [
      { label: "▸ my game mods", href: "https://www.nexusmods.com/profile/cbecquet/mods" },
      { label: "▸ ACBMods on YouTube", href: "https://www.youtube.com/@ACBMods" },
    ],
  },

  apps: {
    eyebrow: "ACB · apps",
    heading: "Rapid Reader",
    tag: "flagship application",
    sub: "A universal platform to speed up reading. Whether we like it or not, AI is becoming intertwined with our lives — we're taking on more of the burden of a reviewer than of a creator, and the amount of text we ingest daily is becoming extreme. For future developers, training this skill will amplify productivity.",
    featureHeading: "Read the firehose at 2×.",
    featureBody: [
      "In the tech industry, many developers switched to Whispr full-time to replace typing and speed up the writing side. Rapid Reader applies that exact concept to the **reading** side. RSVP has been shown to roughly 2× WPM with comprehension on par — and the ceiling climbs much higher with practice.",
      "It connects your agentic workflows to one universal page: choose a session and speed-read it.",
    ],
    chips: ["Claude Code", "Codex", "Copilot", "Cursor"],
    chipsSoon: ["Hermes · soon", "Openclaw · soon"],
    links: [
      { label: "▸ open Rapid Reader", href: "https://rapid-reader.acb-apps.com" },
      { label: "▸ rapid-reader on GitHub", href: "https://github.com/acbecquet/rapid-reader" },
    ],
    rightHeading: "// not just for developers",
    rows: [
      { key: "copy", text: "any link, document, or book (EPUB) — and the audience widens." },
      { key: "elderly", text: "and readers who simply want to read more efficiently." },
      { key: "newsgoers", text: "who don't have time to read the news. API news integration is planned." },
      { key: "engine", text: "ORP pivot letter · smart pacing on long words, numbers, and clause / sentence pauses." },
    ],
  },

  tech: {
    eyebrow: "ACB · tech",
    heading: "Software that bridges physical media.",
    sub: "Lab and instrument tools that take something absurdly expensive to make, open-source it, and build a business teaching people how to use it.",
    featureHeading: "Video Viscometer",
    featureBody: [
      "Measure fluid viscosity from ordinary video — a personal project built for use at my work. The standard instruments cost a fortune; this one is **open-source** — the same capability for anyone, with the business built on teaching people how to use it.",
    ],
    link: { label: "▸ video-viscometer on GitHub", href: "https://github.com/acbecquet/video-viscometer" },
    rightHeading: "// the philosophy",
    pull: "Take something that costs a ridiculous amount of money to make, open-source it, and make a business off teaching people how to use the new product.",
  },

  memoir: {
    eyebrow: "ACB · writing",
    heading: "A memoir.",
    badge: "coming soon",
  },

  ethos: {
    big: "I'm sick of products being so expensive for no reason other than market domination.",
    bigAccent: "market domination.", // this phrase gets the highlight
    sub: "Every tool here is built to hand something powerful back to everybody — for cheap, or for free.",
  },

  footer: {
    copyright: "© 2026 Charlie Becquet · ACB",
    links: [
      { label: "github", href: "https://github.com/acbecquet" },
      { label: "nexus", href: "https://www.nexusmods.com/profile/cbecquet/mods" },
      { label: "youtube", href: "https://www.youtube.com/@ACBMods" },
      { label: "email", href: "mailto:becquetcharlie@gmail.com" },
    ],
  },

  // The dedicated /memoir page
  memoirPage: {
    eyebrow: "ACB · writing",
    heading: "A memoir.",
    badge: "coming soon",
    back: "← back to everything else",
  },
};

/* =============================================================================
   ⚙️  MACHINERY — you don't need to touch anything below here.
   This turns the friendly text above into the little bits of HTML the page uses.
   ============================================================================= */

const bold = (s: string): string => s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const accent = (s: string, word: string, cls: string): string =>
  word ? s.replace(word, `<span class="${cls}">${word}</span>`) : s;
const paras = (arr: string[]): string => arr.map((p) => `<p>${bold(p)}</p>`).join("");
const links = (arr: { label: string; href: string }[]): string =>
  arr.map((l) => `<a href="${l.href}">${l.label}</a>`).join("");

const modCards = text.mods.items
  .map(
    (m) => `<div class="card flag">${m.badge ? `<div><span class="badge">${m.badge}</span></div>` : ""}<h4>${m.name}</h4><p>${bold(m.blurb)}</p><div class="meta">${m.meta}</div></div>`,
  )
  .join("");

const chips = (arr: string[], cls = "chip"): string =>
  arr.map((c) => `<span class="${cls}">${c}</span>`).join("");

const kvRows = text.apps.rows
  .map((r) => `<div class="row"><b>${r.key}</b><span>${bold(r.text)}</span></div>`)
  .join("");

/** Flat map of placeholder name -> ready-to-use HTML. Used by the build to fill
 *  the {{...}} slots in index.html / memoir.html. */
export const copy: Record<string, string> = {
  "hero.kicker": text.hero.kicker,
  "hero.title": accent(text.hero.title, text.hero.titleAccent, "u"),
  "hero.lede": bold(text.hero.lede),

  "origin.eyebrow": text.origin.eyebrow,
  "origin.leftHeading": text.origin.leftHeading,
  "origin.left": `<p class="pull">${bold(text.origin.left[0])}</p>` + text.origin.left.slice(1).map((p) => `<p>${bold(p)}</p>`).join(""),
  "origin.rightHeading": text.origin.rightHeading,
  "origin.right": paras(text.origin.right),

  "mods.eyebrow": text.mods.eyebrow,
  "mods.heading": text.mods.heading,
  "mods.sub": bold(text.mods.sub),
  "mods.grid": modCards,
  "mods.links": links(text.mods.links),

  "apps.eyebrow": text.apps.eyebrow,
  "apps.heading": text.apps.heading,
  "apps.tag": text.apps.tag,
  "apps.sub": bold(text.apps.sub),
  "apps.featureHeading": text.apps.featureHeading,
  "apps.featureBody": paras(text.apps.featureBody),
  "apps.chips": chips(text.apps.chips) + chips(text.apps.chipsSoon, "chip soon"),
  "apps.links": links(text.apps.links),
  "apps.rightHeading": text.apps.rightHeading,
  "apps.rows": kvRows,

  "tech.eyebrow": text.tech.eyebrow,
  "tech.heading": text.tech.heading,
  "tech.sub": bold(text.tech.sub),
  "tech.featureHeading": text.tech.featureHeading,
  "tech.featureBody": paras(text.tech.featureBody),
  "tech.link": links([text.tech.link]),
  "tech.rightHeading": text.tech.rightHeading,
  "tech.pull": bold(text.tech.pull),

  "memoir.eyebrow": text.memoir.eyebrow,
  "memoir.heading": text.memoir.heading,
  "memoir.badge": text.memoir.badge,

  "ethos.big": accent(text.ethos.big, text.ethos.bigAccent, "hl"),
  "ethos.sub": bold(text.ethos.sub),

  "footer.copyright": text.footer.copyright,
  "footer.links": links(text.footer.links),

  "memoirPage.eyebrow": text.memoirPage.eyebrow,
  "memoirPage.heading": text.memoirPage.heading,
  "memoirPage.badge": text.memoirPage.badge,
  "memoirPage.back": text.memoirPage.back,
};
