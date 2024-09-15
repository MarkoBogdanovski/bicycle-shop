#!/bin/sh

echo "[=========== Migrate ===========]"
npx sequelize-cli db:migrate
echo "[=========== Check Migration Status ===========]"
npx sequelize-cli db:migrate:status
# echo "#[=========== Seed users table ===========]"
# node seeders/userSeeder.js
# echo "[=========== Seed category table ===========]"
# node seeders/categorySeeder.js
# echo "[=========== Seed parts table ===========]"
# node seeders/partSeeder.js
npm start
break
