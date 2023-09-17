import "./App.css";
import animals from "./data/animals.json";
import colors from "./data/colors.json";
import numbers from "./data/numbers.json";
import shapes from "./data/shapes.json";

import { useState } from "react";

type LexicalEntry = $ReadOnly<{
  orths: $ReadOnlyArray<string>,
  transliterations: $ReadOnlyArray<string>,
}>;

const DEFAULT_LANGUAGE: string = "eng";
const DEFAULT_POSITION: number = 0;

const App = (): React$Element<"div"> => {
  const [selectedLanguage, setLanguage] = useState(DEFAULT_LANGUAGE);
  const validLanguages: $ReadOnlyArray<string> = Object.keys(animals);
  const animalsInLanguage: $ReadOnlyMap<string, LexicalEntry> = new Map(
    (Object.entries(animals[selectedLanguage]): any)
  );
  const validAnimals: $ReadOnlyArray<string> = Array.from(
    animalsInLanguage.keys()
  );
  const [selectedValue, setSelectedValue]: [string, (string) => void] =
    useState(validAnimals[DEFAULT_POSITION]);
  const selectedObject = animalsInLanguage.get(selectedValue);
  return (
    <div className="App">
      <select
        value={selectedLanguage}
        onChange={(e) => setLanguage(e.target.value)}
        name="languages"
        id="languages-select"
      >
        {Array.from(validLanguages).map((identifier, i) => (
          <option value={identifier} key={"selector-" + identifier}>
            {identifier}
          </option>
        ))}
      </select>
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        name="animals"
        id="animals-select"
      >
        {Array.from(animalsInLanguage).map(([identifier, _], i) => (
          <option value={identifier} key={"selector-" + identifier}>
            {identifier}
          </option>
        ))}
      </select>
      <div>
        <span>
          The name ({selectedLanguage}) of {selectedValue} is{" "}
        </span>
        <span>"{selectedObject?.orths[0]}" </span>
        {selectedObject?.transliterations.length != null &&
        selectedObject?.transliterations.length > 0 ? (
          <span>("{selectedObject?.transliterations[0]}")</span>
        ) : null}
      </div>
    </div>
  );
};

export default App;
