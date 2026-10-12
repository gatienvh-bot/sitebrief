const form = document.querySelector("#brief-form");
const emptyState = document.querySelector("#empty-state");
const result = document.querySelector("#result");
const briefContent = document.querySelector("#brief-content");
const feedback = document.querySelector("#feedback");
let latestBrief = "";

function clean(value) {
  return value.trim() || "Not specified yet.";
}

function section(title, value) {
  const heading = document.createElement("h3");
  heading.textContent = title;
  const paragraph = document.createElement("p");
  paragraph.textContent = value;
  briefContent.append(heading, paragraph);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = clean(data.get("project-name"));
  const type = clean(data.get("project-type"));
  const audience = clean(data.get("audience"));
  const problem = clean(data.get("problem"));
  const style = clean(data.get("style"));
  const features = clean(data.get("features"));

  latestBrief = [
    `PROJECT BRIEF: ${name}`,
    "",
    `Project type: ${type}`,
    `Target audience: ${audience}`,
    `Main goal: ${problem}`,
    `Visual direction: ${style}`,
    `Important features: ${features}`,
    "",
    "SUGGESTED NEXT STEPS",
    "1. Confirm the project's main goal and priorities.",
    "2. Sketch the main pages or screens before coding.",
    "3. Check accessibility, mobile layout, privacy, and performance.",
    "4. Test the result with people from the target audience."
  ].join("\n");

  briefContent.replaceChildren();
  section("Project", name);
  section("Project type", type);
  section("Target audience", audience);
  section("Main goal", problem);
  section("Visual direction", style);
  section("Important features", features);
  section("Suggested next steps", "1. Confirm the main goal and priorities.\n2. Sketch the main pages or screens before coding.\n3. Check accessibility, mobile layout, privacy, and performance.\n4. Test the result with people from the target audience.");

  emptyState.classList.add("hidden");
  result.classList.remove("hidden");
  feedback.textContent = "";
  document.querySelector(".output-panel h2").textContent = "Your brief is ready";
});

document.querySelector("#copy-btn").addEventListener("click", async () => {
  if (!latestBrief) return;
  try {
    await navigator.clipboard.writeText(latestBrief);
    feedback.textContent = "Copied! Your brief is ready to paste.";
  } catch {
    feedback.textContent = "Copy was blocked by your browser. Use Download .txt instead.";
  }
});

document.querySelector("#download-btn").addEventListener("click", () => {
  if (!latestBrief) return;
  const blob = new Blob([latestBrief], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sitebrief-project-brief.txt";
  link.click();
  URL.revokeObjectURL(url);
  feedback.textContent = "Your brief has been downloaded.";
});