@echo off
call npm run build
call npm run build:plug-compile
go build -ldflags "-X main.buildTime=now" .
