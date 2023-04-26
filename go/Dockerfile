FROM golang AS builder

WORKDIR /usr/src/app

COPY app .

RUN go build .

FROM scratch

COPY --from=builder /usr/src/app/rocks /go/bin/rocks

ENTRYPOINT ["/go/bin/rocks"]
