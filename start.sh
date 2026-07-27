#!/bin/bash
# Lance le projet en local, à chaque fois, sans prise de tête.
# Usage : bash start.sh

set -e

cd "$(dirname "$0")"

echo "Récupération des derniers changements..."
git pull origin claude/ouverture-projet-local-oizv3y

echo "Installation des dépendances..."
npm install

echo "Libération du port 3008 si occupé..."
lsof -ti:3008 | xargs kill -9 2>/dev/null || true

echo "Lancement du serveur sur http://localhost:3008 ..."
npm run dev -- --port 3008
