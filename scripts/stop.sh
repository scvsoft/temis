#!/usr/bin/env bash
cd ~/temis/server
pm2 stop "api" || true
