@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"
echo Starting IMS2 Study Guide...
echo Open http://localhost:8080 in your browser.
echo Press Ctrl+C to stop.
start "" http://localhost:8080
node server.mjs
