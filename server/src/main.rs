mod handler;

use axum::{routing::post, Router};
use handler::{handle_compile, handle_run};

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app = Router::new()
        .route("/compile", post(handle_compile))
        .route("/run", post(handle_run));

    // run it with hyper on localhost:6969
    axum::Server::bind(&"0.0.0.0:6969".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
