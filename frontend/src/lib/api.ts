import axios from "axios";
import { CompileTarget, ExecuteAndCompileResult } from "./types";

axios.defaults.baseURL = "http://localhost:6969";

export interface ExecuteRequest {
	code: string;
	available_gas?: number;
}

export async function post_execute(request: ExecuteRequest) {
	return axios.post<ExecuteAndCompileResult>("/execute", request);
}

export interface CompileRequest {
	code: string;
	target: CompileTarget;
}

export async function post_compile(request: CompileRequest) {
	return axios.post<ExecuteAndCompileResult>("/compile", request);
}
