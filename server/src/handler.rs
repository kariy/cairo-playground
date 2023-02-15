use std::{fs::File, io::Write, process::Command};

use axum::Json;
use serde::Deserialize;
use tempfile::tempdir;

#[derive(Debug, Deserialize)]
pub struct CompileAndRunPayload {
    pub code: String,
}

pub async fn handle_compile(Json(payload): Json<CompileAndRunPayload>) -> String {
    let CompileAndRunPayload { code } = payload;

    let dir = tempdir().unwrap();

    let file_path = dir.path().join("to_compile.cairo");
    let mut file = File::create(file_path.clone()).unwrap();
    writeln!(file, "{code}").unwrap();

    let path_str = file_path.to_str().unwrap();

    let output = Command::new("./target/release/cairo-compile")
        .current_dir("../cairo")
        .args([path_str])
        .output()
        .expect("unable to run cairo-compile");

    String::from_utf8(output.stdout).unwrap()
}

pub async fn handle_run(Json(payload): Json<CompileAndRunPayload>) -> String {
    let CompileAndRunPayload { code } = payload;

    let dir = tempdir().unwrap();

    let file_path = dir.path().join("to_compile.cairo");
    let mut file = File::create(file_path.clone()).unwrap();
    writeln!(file, "{code}").unwrap();

    let path_str = file_path.to_str().unwrap();

    let output = Command::new("./target/release/cairo-run")
        .current_dir("../cairo")
        .args(["-p", path_str])
        .output()
        .expect("unable to run cairo-run");

    String::from_utf8(output.stdout).unwrap()
}
