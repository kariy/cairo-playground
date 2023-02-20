import { Component, createSignal, Show } from "solid-js";

import {
	CompileTarget,
	ExecuteAndCompileResult,
	PlaygroundMode,
} from "./lib/types";
import MainButton from "./components/MainButton";
import TextEditor from "./components/TextEditor";
import Output from "./components/Output";
import { post_compile, post_execute } from "./lib/api";

const App: Component = () => {
	const [code, setCode] = createSignal("");
	const [output, setOutput] = createSignal<ExecuteAndCompileResult | null>(
		null
	);

	const onButtonClick = (mode: PlaygroundMode) => {
		// do api request here
		if (mode === PlaygroundMode.EXECUTE) {
			post_execute({
				code: code(),
			})
				.then(({ data }) => setOutput(data))
				.catch(alert);
		} else if (mode === PlaygroundMode.SIERRA_COMPILE) {
			post_compile({
				code: code(),
				target: CompileTarget.SIERRA,
			})
				.then(({ data }) => setOutput(data))
				.catch(alert);
		} else {
			alert("not implemented");
		}
	};

	const onTextChange = (text: string) => setCode(text);

	return (
		<div class="h-screen flex flex-col bg-blue-200 pt-7">
			<MainButton onClick={onButtonClick} />

			<div class="h-full bg-green-100 py-4 px-5 ">
				<div class="h-full rounded-md overflow-clip flex">
					<TextEditor onChange={onTextChange} />
					<Output output={output()} />
				</div>
			</div>
		</div>
	);
};

export default App;
