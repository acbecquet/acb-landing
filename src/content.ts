// Single source of truth for the growable lists on the page.
// Add a mod here and it shows up in the ACB · mods grid automatically.

export const STORY =
  `I grew up loving science and video games. In 2007 I was playing an old — even at the time — copy of Battlefield 1942, and first learned the word "AI" in the settings menu. Artificial Intelligence. That made a lot of sense to me to put in a video game. Fast forward 25 years and people can't stop talking about AI. Most would agree that AI in the right hands could do really good, and in the wrong hands could do really bad. But for some reason, nobody seems to think it's possible to put what we now call "AI" — Large Language Models — into the thing we first put AI in. That's my inspiration for the living-NPC mods: to put the LLMs in a place where they belong. In my professional life I'm an engineer. I studied physics in university, and I've always lived somewhere in the middle of engineering — between pure coding and pure building. Physics mostly just taught me how the world worked. I was never very good at coding. I slowly learned MATLAB and Python over 6–7 years, but I'd be a fool to say I was anywhere near the level of a software engineer. And then the LLMs came along. A lot of people wanted to ask them personal questions; I wanted to use them to learn how to code better. Now, with agentic coding, I get to leverage that "in-between" lifestyle — letting my creativity spread across multiple fields to build fun tools for everybody.`;

export interface Mod {
  name: string;
  blurb: string;
  meta: string;
  badge?: string;
  flag?: boolean;
}

export const mods: Mod[] = [
  {
    name: "Living NPCs",
    badge: "unreleased · flagship",
    flag: true,
    blurb: "A large-scale, immersive NPC experience — the mod I hope puts me on the map, at least a little bit.",
    meta: "easy red 2 · LLM-driven",
  },
  {
    name: "Coop Squad Manager",
    badge: "unreleased",
    flag: true,
    blurb: "Command and coordinate an AI squad in cooperative play.",
    meta: "easy red 2 · coop",
  },
  {
    name: "Dogfight Mode",
    badge: "unreleased",
    flag: true,
    blurb: "A focused aerial-combat mode built for fast, replayable dogfights.",
    meta: "easy red 2 · aerial",
  },
];
