#!/bin/bash
node rimraf build/index.html
node mkdirp build
node cpr index.html build/index.html

node rimraf build/js
node mkdirp build/js
node webpack

node rimraf build/css
node mkdirp build
node cpr css build/css

node rimraf build/assets
node mkdirp build
node cpr assets build/assets
