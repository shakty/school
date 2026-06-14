import { existsSync, readFileSync } from "node:fs";
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
const lessonThreePath = join(
  __dirname,
  "..",
  "lessons",
  "0003-grosse-zahlen-zerlegen.html",
);
const lessonThree = existsSync(lessonThreePath)
  ? readFileSync(lessonThreePath, "utf8")
  : "";
const reference = readFileSync(
  join(__dirname, "..", "reference", "division-merkblatt.html"),
  "utf8",
);

const lessons = [lessonOne, lessonTwo, lessonThree];

const expectations = [
  {
    name: "lectures use a child-focused guided stepper",
    check: () => lessons.every((lesson) => lesson.includes('data-lesson-stepper')),
  },
  {
    name: "lectures show one active lesson panel at a time",
    check: () => lessons.every((lesson) =>
      lesson.includes('class="lesson-panel is-active') &&
      lesson.includes('data-step-panel="2" hidden') &&
      lesson.includes('data-step-panel="3" hidden'),
    ),
  },
  {
    name: "lectures force hidden lesson panels out of layout",
    check: () => lessons.every((lesson) =>
      /\.lesson-panel\[hidden\]\s*{\s*display:\s*none !important;\s*}/.test(lesson),
    ),
  },
  {
    name: "lectures provide back, next, and show-all controls",
    check: () => lessons.every((lesson) =>
      lesson.includes('data-step-prev') &&
      lesson.includes('data-step-next') &&
      lesson.includes('data-step-show-all'),
    ),
  },
  {
    name: "lectures keep next and source material collapsed by default",
    check: () => lessons.every((lesson) =>
      lesson.includes('<details class="lesson-extra"') &&
      lesson.includes('<summary>Nächstes Mal</summary>') &&
      lesson.includes('<summary>Quellen</summary>'),
    ),
  },
  {
    name: "lectures wire stepper state updates",
    check: () => lessons.every((lesson) =>
      lesson.includes("activateStep(activeStep + 1)") &&
      lesson.includes("panel.hidden = !isCurrent") &&
      lesson.includes('status.textContent = `Schritt ${activeStep + 1} von ${panels.length}`'),
    ),
  },
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
    name: "lecture 3 exists for splitting large division numbers",
    check: () => lessonThree.length > 0,
  },
  {
    name: "lecture 3 teaches the listed school examples",
    check: () => ["654 : 6", "294 : 3", "304 : 4"].every((example) => lessonThree.includes(example)),
  },
  {
    name: "lecture 3 shows chunk splitting with hundreds and remainder-friendly parts",
    check: () => ["600 : 6 = 100", "54 : 6 = 9", "100 + 9 = 109"].every((part) => lessonThree.includes(part)),
  },
  {
    name: "lecture 3 has a replayable chunk machine",
    check: () => lessonThree.includes("data-chunk-stage") && lessonThree.includes("data-chunk-start"),
  },
  {
    name: "lecture 3 chunk animation is wired",
    check: () => lessonThree.includes("chunk-stage-run"),
  },
  {
    name: "lecture 3 chunk animation starts from one visible big number block",
    check: () => lessonThree.includes('class="chunk-big-number"') && lessonThree.includes(">654<"),
  },
  {
    name: "lecture 3 chunk animation has a visible breaker machine",
    check: () => lessonThree.includes('class="chunk-breaker"') && lessonThree.includes('class="chunk-roller'),
  },
  {
    name: "lecture 3 chunk animation breaks the number into two colored output blocks",
    check: () =>
      lessonThree.includes('class="chunk-output chunk-output-large"') &&
      lessonThree.includes('class="chunk-output chunk-output-small"'),
  },
  {
    name: "lecture 3 uses compact icon labels for the new three-step trick",
    check: () => (lessonThree.match(/class="step-icon(?:\s|")/g) ?? []).length >= 3,
  },
  {
    name: "lecture 3 quiz covers clean multi-digit division answers",
    check: () => ["81", "213", "212", "105"].every((answer) => lessonThree.includes(`data-answer="${answer}"`)),
  },
  {
    name: "lecture 2 links forward to lecture 3",
    check: () => lessonTwo.includes("./0003-grosse-zahlen-zerlegen.html"),
  },
  {
    name: "reference links to lecture 3",
    check: () => reference.includes("../lessons/0003-grosse-zahlen-zerlegen.html"),
  },
  {
    name: "motion respects reduced-motion preferences",
    check: () =>
      lessonOne.includes("@media (prefers-reduced-motion: reduce)") &&
      lessonTwo.includes("@media (prefers-reduced-motion: reduce)") &&
      lessonThree.includes("@media (prefers-reduced-motion: reduce)"),
  },
  {
    name: "decorative visuals stay out of the accessibility tree",
    check: () =>
      (lessonOne.match(/aria-hidden="true"/g) ?? []).length >= 4 &&
      (lessonTwo.match(/aria-hidden="true"/g) ?? []).length >= 4 &&
      (lessonThree.match(/aria-hidden="true"/g) ?? []).length >= 4,
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
