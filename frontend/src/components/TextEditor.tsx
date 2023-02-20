import type { Component } from "solid-js";

interface Props {
	onChange: (text: string) => void;
}

const TextEditor: Component<Props> = function (props) {
	return (
		<textarea
			class="h-full flex-[3] resize-none outline-none p-2 font-mono text-[0.92rem] tracking-[-0.02rem]"
			onInput={(e) => {
				props.onChange(e.currentTarget.value);
			}}
		>
			text editor
		</textarea>
	);
};

export default TextEditor;
