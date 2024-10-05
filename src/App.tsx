import { createSignal, createEffect, For } from "solid-js";
import "./App.css";

function countSyllables(word: string) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  return word.match(/[aeiouy]{1,2}/g)?.length || 0;
}

type LineResultType = {
  line: string;
  syllables: number;
};

function App() {
  const [text, setText] = createSignal("");
  const [lineResults, setLineResults] = createSignal<LineResultType[]>([]);

  createEffect(() => {
    const lines = text()
      .split("\n")
      .filter((line) => line.trim());
    const results = lines.map((line) => {
      const words = line.trim().split(/\s+/);
      const syllables = words.reduce(
        (sum, word) => sum + countSyllables(word),
        0
      );
      return { line, syllables };
    });
    setLineResults(results);
  });

  return (
    <div class="container">
      <h1>Syllable Counter</h1>
      <textarea
        placeholder="Enter your text here..."
        onInput={(e) => setText(e.target.value)}
        value={text()}
      />
      <div class="results">
        <h2>Results:</h2>
        <For each={lineResults()}>
          {(result) => (
            <div class="line">
              <strong>Line:</strong> {result.line}
              <br />
              <strong>Syllables:</strong> {result.syllables}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default App;
