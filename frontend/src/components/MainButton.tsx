import { Component, Show } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { PlaygroundMode } from "../lib/types";

interface Props {
	onModeChange: (mode: PlaygroundMode) => void;
}

const MainButton: Component<Props> = function (props) {
	const [showOption, setShowOption] = createSignal(false);

	const [mode, setMode] = createSignal<PlaygroundMode>(
		PlaygroundMode.EXECUTE
	);

	const buttonName = () => {
		switch (mode()) {
			case PlaygroundMode.EXECUTE:
				return "Run";
			case PlaygroundMode.SIERRA_COMPILE:
				return "Show SIERRA";
			default:
				return null;
		}
	};

	const onModeOptionClick = (mode: PlaygroundMode) => {
		setShowOption(false);
		setMode(mode);
	};

	createEffect(() => props.onModeChange(mode()));

	return (
		<div class="relative flex gap-1.5 h-8 bg-red-200">
			<button class="bg-slate-400 px-6 py-[0.2em] font-semibold uppercase rounded">
				{buttonName()}
			</button>

			<div class="h-full">
				<div
					class="border border-neutral-500 h-full select-none cursor-pointer"
					onClick={() => setShowOption((prev) => !prev)}
				>
					Option
				</div>
			</div>

			{/* TODO: add bg overlay */}
			<Show
				fallback={null}
				when={showOption()}
			>
				<div class="absolute bottom-[-65px] border border-green-300 w-56 flex flex-col gap-1">
					<div
						class="cursor-pointer border"
						onClick={() =>
							onModeOptionClick(PlaygroundMode.EXECUTE)
						}
					>
						Run
					</div>
					<div
						class="cursor-pointer border"
						onClick={() =>
							onModeOptionClick(PlaygroundMode.SIERRA_COMPILE)
						}
					>
						Show SIERRA
					</div>
				</div>
			</Show>
		</div>
	);
};

export default MainButton;
