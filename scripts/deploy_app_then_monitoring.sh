#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

docker system prune -f || true

echo "[1/3] Starting app (frontend+backend)..."
docker compose up -d --build --remove-orphans

echo "[2/3] Waiting for backend health..."
for i in $(seq 1 60); do
  if curl -fsS http://localhost:8000/health >/dev/null; then
    echo "Backend is healthy"
    break
  fi
  sleep 2
done

echo "[3/3] Starting monitoring (Prometheus+Grafana)..."
docker compose -f docker-compose.monitoring.yml up -d --remove-orphans

echo "OK:"
echo "  Frontend:  http://localhost/"
echo "  Backend:   http://localhost:8000/health"
echo "  Metrics:   http://localhost:8000/metrics"
echo "  Prometheus http://localhost:9090"
echo "  Grafana:   http://localhost:3000 (admin/admin)"
