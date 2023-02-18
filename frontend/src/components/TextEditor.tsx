import type { Component } from "solid-js";

interface Props {
	onChange: (text: string) => void;
}

const TextEditor: Component<Props> = function (props) {
	return <div>text editor</div>;
};

export default TextEditor;
