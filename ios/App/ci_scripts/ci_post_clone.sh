#!/bin/sh
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"
set -e
cd "$CI_PRIMARY_REPOSITORY_PATH"
npm install
cd ios/App
pod install