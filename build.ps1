npm run build
npm run build:plug-compile
$buildTime = (Get-Date -Format o)
go build -ldflags "-X main.buildTime=$buildTime" .
