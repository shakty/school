import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const lessonOne = readFileSync(
  join(__dirname, "..", "lessons", "0001-teilen-wie-ein-team.html"),
  "utf8",
);
const lessonTwo = readFileSync(
  join(__dirname, "..", "lessons", "0002-division-mit-rest.html"),
  "utf8",
);

const expectations = [
  {
    name: "lecture 1 header has quiet visual cue strip",
    check: () => lessonOne.includes('class="lecture-icons"'),
  },
  {
    name: "lecture 1 football example shows grouped balls visually",
    check: () => lessonOne.includes('class="team-share-grid"'),
  },
  {
    name: "lecture 1 three-step trick uses compact icon labels",
    check: () => (lessonOne.match(/class="step-icon(?:\s|")/g) ?? []).length >= 3,
  },
  {
    name: "lecture 1 machine section has an animated distribution machine",
    check: () => lessonOne.includes('class="machine-stage"'),
  },
  {
    name: "lecture 1 machine animation shows five level lanes",
    check: () => (lessonOne.match(/class="machine-lane"/g) ?? []).length === 5,
  },
  {
    name: "lecture 1 machine animation shows thirty coins being divided",
    check: () => (lessonOne.match(/class="machine-moving-coin"/g) ?? []).length === 30,
  },
  {
    name: "lecture 1 machine starts with thirty coins in a top tray",
    check: () => lessonOne.includes('class="machine-tray"'),
  },
  {
    name: "lecture 1 machine has a replayable start button",
    check: () => lessonOne.includes('data-machine-start'),
  },
  {
    name: "lecture 1 machine button triggers the distribution animation",
    check: () => lessonOne.includes('data-machine-stage') && lessonOne.includes('machine-stage-run'),
  },
  {
    name: "lecture 1 machine animation includes the multiplication check",
    check: () => lessonOne.includes("6 x 5 = 30"),
  },
  {
    name: "lecture 2 header has quiet visual cue strip",
    check: () => lessonTwo.includes('class="lecture-icons"'),
  },
  {
    name: "lecture 2 Mario example shows grouped mushrooms visually",
    check: () => lessonTwo.includes('class="level-board"'),
  },
  {
    name: "lecture 2 first visual shows fourteen mushrooms",
    check: () => (lessonTwo.match(/class="mushroom"/g) ?? []).length === 14,
  },
  {
    name: "lecture 2 first visual separates the remainder",
    check: () => lessonTwo.includes('class="level-row rest-row"'),
  },
  {
    name: "lecture 2 rest trick uses compact icon labels",
    check: () => (lessonTwo.match(/class="step-icon(?:\s|")/g) ?? []).length >= 3,
  },
  {
    name: "lecture 2 rest lab has a replayable start button",
    check: () => lessonTwo.includes("data-rest-stage") && lessonTwo.includes("data-rest-start"),
  },
  {
    name: "lecture 2 rest lab animation is wired",
    check: () => lessonTwo.includes("lab-stage-run"),
  },
  {
    name: "lecture 2 rest lab shows three equal groups",
    check: () => (lessonTwo.match(/class="lab-group"/g) ?? []).length === 3,
  },
  {
    name: "lecture 2 rest lab shows fourteen counters",
    check: () => (lessonTwo.match(/class="dot"/g) ?? []).length === 14,
  },
  {
    name: "lecture 2 rest lab includes the remainder proof",
    check: () => lessonTwo.includes("4 x 3 + 2 = 14"),
  },
  {
    name: "lecture 2 quiz accepts remainder notation",
    check: () => ["4r1", "5r1", "5r4"].every((answer) => lessonTwo.includes(`data-answer="${answer}"`)),
  },
  {
    name: "motion respects reduced-motion preferences",
    check: () => lessonOne.includes("@media (prefers-reduced-motion: reduce)") && lessonTwo.includes("@media (prefers-reduced-motion: reduce)"),
  },
  {
    name: "decorative visuals stay out of the accessibility tree",
    check: () =>
      (lessonOne.match(/aria-hidden="true"/g) ?? []).length >= 4 &&
      (lessonTwo.match(/aria-hidden="true"/g) ?? []).length >= 4,
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
