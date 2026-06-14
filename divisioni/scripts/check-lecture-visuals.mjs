import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const lesson = readFileSync(
  join(__dirname, "..", "lessons", "0001-teilen-wie-ein-team.html"),
  "utf8",
);

const expectations = [
  {
    name: "header has quiet visual cue strip",
    check: () => lesson.includes('class="lecture-icons"'),
  },
  {
    name: "football example shows grouped balls visually",
    check: () => lesson.includes('class="team-share-grid"'),
  },
  {
    name: "three-step trick uses compact icon labels",
    check: () => (lesson.match(/class="step-icon(?:\s|")/g) ?? []).length >= 3,
  },
  {
    name: "machine section has an animated distribution machine",
    check: () => lesson.includes('class="machine-stage"'),
  },
  {
    name: "machine animation shows five level lanes",
    check: () => (lesson.match(/class="machine-lane"/g) ?? []).length === 5,
  },
  {
    name: "machine animation shows thirty coins being divided",
    check: () => (lesson.match(/class="machine-moving-coin"/g) ?? []).length === 30,
  },
  {
    name: "machine starts with thirty coins in a top tray",
    check: () => lesson.includes('class="machine-tray"'),
  },
  {
    name: "machine has a replayable start button",
    check: () => lesson.includes('data-machine-start'),
  },
  {
    name: "machine button triggers the distribution animation",
    check: () => lesson.includes('data-machine-stage') && lesson.includes('machine-stage-run'),
  },
  {
    name: "machine animation includes the multiplication check",
    check: () => lesson.includes("6 x 5 = 30"),
  },
  {
    name: "motion respects reduced-motion preferences",
    check: () => lesson.includes("@media (prefers-reduced-motion: reduce)"),
  },
  {
    name: "decorative visuals stay out of the accessibility tree",
    check: () => (lesson.match(/aria-hidden="true"/g) ?? []).length >= 4,
  },
];

const failures = expectations.filter((expectation) => !expectation.check());

if (failures.length > 0) {
  console.error("Lecture visual checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure.name}`);
  }
  process.exit(1);
}

console.log("Lecture visual checks passed.");
