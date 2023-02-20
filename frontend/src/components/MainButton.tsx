import { Component, Show } from "solid-js";
import { createSignal } from "solid-js";
import { PlaygroundMode } from "../lib/types";

interface Props {
	onClick: (mode: PlaygroundMode) => void;
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

	const handleOnModeOptionClick = (mode: PlaygroundMode) => {
		setShowOption(false);
		setMode(mode);
	};

	const handleOnClick = () => props.onClick(mode());

	return (
		<div class="relative h-8 px-5">
			<div class="flex gap-1.5 h-full">
				<button
					class="bg-slate-400 px-6 py-[0.2em] font-semibold uppercase rounded relative z-50"
					onClick={handleOnClick}
				>
					{buttonName()}
				</button>

				<div class="h-full">
					<div
						class="border border-neutral-500 h-full select-none cursor-pointer relative z-50"
						onClick={() => setShowOption((prev) => !prev)}
					>
						Option
					</div>
				</div>
			</div>

			<Show
				fallback={null}
				when={showOption()}
			>
				<div
					class="fixed inset-0"
					onClick={() => setShowOption(false)}
				></div>

				<div class="absolute top-[130%] w-80 bg-neutral-300 rounded-md px-3 pb-4 pt-3">
					<div class="font-bold text-sm">What do you want to do?</div>
					<hr class="my-2" />
					<div class=" flex flex-col gap-4">
						<div
							class="cursor-pointer text-sm"
							onClick={() =>
								handleOnModeOptionClick(PlaygroundMode.EXECUTE)
							}
						>
							<div class="font-semibold ">Run</div>
							<div class="">
								Compile and run the code, showing the output.
							</div>
						</div>
						<div
							class="cursor-pointer text-sm"
							onClick={() =>
								handleOnModeOptionClick(
									PlaygroundMode.SIERRA_COMPILE
								)
							}
						>
							<div class="font-semibold">Show SIERRA</div>
							<div class="">
								Compile the source code into SIERRA
							</div>
						</div>
					</div>
				</div>
			</Show>
		</div>
	);
};

export default MainButton;
