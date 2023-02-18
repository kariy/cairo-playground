import type { Component } from "solid-js";

import { PlaygroundMode } from "./lib/types";
import MainButton from "./components/MainButton";

const App: Component = () => {
	const onModeChange = (mode: PlaygroundMode) =>
		console.log("current mode : ", PlaygroundMode[mode]);

	return (
		<div>
			<MainButton onModeChange={onModeChange} />
		</div>
	);
};

export default App;
