import { Component, Show } from "solid-js";
import { ExecuteAndCompileResult } from "../lib/types";

interface Props {
	output: ExecuteAndCompileResult | null;
}

const Output: Component<Props> = function (props) {
	return (
		<Show
			when={props.output !== null}
			fallback={<div>no output</div>}
		>
			<div class="h-full flex-[2] p-2 bg-purple-300 font-mono text-[0.92rem] tracking-[-0.02rem]">
				<div>stderr</div>
				<div>{props.output?.stderr}</div>
				<div>stdout</div>
				{/* <div>{props.output?.stdout}</div> */}
				<textarea
					class="h-full w-full"
					value={props.output?.stdout}
					disabled
				/>
			</div>
		</Show>
	);
};

export default Output;
