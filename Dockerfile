FROM rust:1.67-alpine3.17

WORKDIR /src
COPY . .

RUN git submodule init && git submodule update --recursive
RUN cargo build --release --manifest-path ./cairo
RUN cargo build --release --manifest-path ./server

WORKDIR /server
CMD [ "./target/release/server" ]

EXPOSE 6969

