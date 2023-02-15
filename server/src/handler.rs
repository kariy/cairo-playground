use std::io::Write;
use std::process::Output;
use std::{fs::File, process::Command};

#[allow(unused_imports)]
use axum::{http::StatusCode, Json};
use serde::{Deserialize, Serialize};
use tempfile::tempdir;
use thiserror::Error;

#[derive(Debug, Serialize)]
pub struct GenericCommandResponse {
    status: String,
    stdout: Option<String>,
    stderr: Option<String>,
}

#[allow(unused)]
#[derive(Debug, Error)]
pub enum ExecuteAndCompileError {
    #[error("unknown error")]
    UnknownError,
}

#[derive(Debug, Deserialize)]
pub enum CompileTarget {
    CASM,
    SIERRA,
}

#[derive(Debug, Deserialize)]
pub struct CompileRequest {
    code: String,
    #[allow(unused)]
    target: CompileTarget,
}

pub async fn handle_compile(Json(body): Json<CompileRequest>) -> Json<GenericCommandResponse> {
    let CompileRequest { code, .. } = body;

    let dir = tempdir().unwrap();
    let cairo_path = dir.path().join("source_code.cairo");

    let mut cairo_file = File::create(cairo_path.clone()).unwrap();
    writeln!(cairo_file, "{}", code).unwrap();

    let Output {
        status,
        stderr,
        stdout,
    } = Command::new("./target/release/cairo-compile")
        .current_dir("../cairo")
        .args([cairo_path.to_str().unwrap()])
        .output()
        .expect("unable to run cairo-compile");

    if status.success() {
        Json(GenericCommandResponse {
            stderr: None,
            status: status.to_string(),
            stdout: std::string::String::from_utf8(stdout).ok(),
        })
    } else {
        Json(GenericCommandResponse {
            stdout: None,
            status: status.to_string(),
            stderr: std::string::String::from_utf8(stderr).ok(),
        })
    }
}

#[derive(Debug, Deserialize)]
pub struct ExecuteRequest {
    code: String,
    available_gas: Option<String>,
}

pub async fn handle_execute(Json(body): Json<ExecuteRequest>) -> Json<GenericCommandResponse> {
    let ExecuteRequest {
        code,
        available_gas,
    } = body;

    // create temp file to store the source code
    let dir = tempdir().unwrap();
    let cairo_path = dir.path().join("source_code.cairo");

    let mut cairo_file = File::create(cairo_path.clone()).unwrap();
    writeln!(cairo_file, "{}", code).unwrap();

    let mut compile = Command::new("./target/release/cairo-run");

    let output = if let Some(gas) = available_gas {
        compile
            .current_dir("../cairo")
            .args(["-p", cairo_path.to_str().unwrap(), "--available-gas", &gas])
            .output()
            .expect("unable to run cairo-run")
    } else {
        compile
            .current_dir("../cairo")
            .args(["-p", cairo_path.to_str().unwrap()])
            .output()
            .expect("unable to run cairo-run")
    };

    if output.status.success() {
        Json(GenericCommandResponse {
            stderr: None,
            status: output.status.to_string(),
            stdout: std::string::String::from_utf8(output.stdout).ok(),
        })
    } else {
        Json(GenericCommandResponse {
            stdout: None,
            status: output.status.to_string(),
            stderr: std::string::String::from_utf8(output.stderr).ok(),
        })
    }
}
