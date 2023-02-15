mod handler;

use axum::{routing::post, Router};
use handler::{handle_compile, handle_execute};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/compile", post(handle_compile))
        .route("/execute", post(handle_execute));

    axum::Server::bind(&"0.0.0.0:6969".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
