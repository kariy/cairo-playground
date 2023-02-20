export enum PlaygroundMode {
	SIERRA_COMPILE,
	EXECUTE,
}

export interface ExecuteAndCompileResult {
	status: number;
	stderr: string;
	stdout: string;
}

export enum CompileTarget {
	CASM = "CASM",
	SIERRA = "SIERRA",
}
