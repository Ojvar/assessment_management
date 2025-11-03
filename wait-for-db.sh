#!/bin/sh
echo "Waiting for database..."

while ! nc -z db 5432; do
  sleep 0.5
done

echo "Database is up!"
exec "$@"
