#!/bin/bash

# Seed Firestore Emulator with test data via REST API
EMULATOR_HOST="http://localhost:8080"
PROJECT_ID="demo-grail"

echo "🌱 Seeding Firestore Emulator..."

# Create shop document
curl -X PATCH "${EMULATOR_HOST}/v1/projects/${PROJECT_ID}/databases/(default)/documents/shops/blind-tiger" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "name": {"stringValue": "Blind Tiger Barbershop"},
      "slug": {"stringValue": "blind-tiger"},
      "timezone": {"stringValue": "America/New_York"},
      "address": {"stringValue": "123 Main St, New York, NY 10001"},
      "phone": {"stringValue": "+1234567890"},
      "pricingMode": {"stringValue": "barber_specific"},
      "brandingMode": {"stringValue": "co_branded"},
      "createdAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
      "updatedAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
    }
  }' > /dev/null 2>&1

echo "✅ Created shop: blind-tiger"

# Create services
curl -X PATCH "${EMULATOR_HOST}/v1/projects/${PROJECT_ID}/databases/(default)/documents/services/haircut" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "shop_id": {"stringValue": "blind-tiger"},
      "name": {"stringValue": "Haircut"},
      "description": {"stringValue": "Classic barbershop haircut"},
      "durationMin": {"integerValue": "30"},
      "basePrice": {"integerValue": "45"},
      "defaultBufferMin": {"integerValue": "10"},
      "active": {"booleanValue": true},
      "createdAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
      "updatedAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
    }
  }' > /dev/null 2>&1

curl -X PATCH "${EMULATOR_HOST}/v1/projects/${PROJECT_ID}/databases/(default)/documents/services/shave" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "shop_id": {"stringValue": "blind-tiger"},
      "name": {"stringValue": "Hot Towel Shave"},
      "description": {"stringValue": "Traditional straight razor shave"},
      "durationMin": {"integerValue": "45"},
      "basePrice": {"integerValue": "55"},
      "defaultBufferMin": {"integerValue": "15"},
      "active": {"booleanValue": true},
      "createdAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
      "updatedAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
    }
  }' > /dev/null 2>&1

curl -X PATCH "${EMULATOR_HOST}/v1/projects/${PROJECT_ID}/databases/(default)/documents/services/beard-trim" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "shop_id": {"stringValue": "blind-tiger"},
      "name": {"stringValue": "Beard Trim"},
      "description": {"stringValue": "Beard shaping and trimming"},
      "durationMin": {"integerValue": "20"},
      "basePrice": {"integerValue": "25"},
      "defaultBufferMin": {"integerValue": "5"},
      "active": {"booleanValue": true},
      "createdAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
      "updatedAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
    }
  }' > /dev/null 2>&1

echo "✅ Created 3 services"

# Create barbers
curl -X PATCH "${EMULATOR_HOST}/v1/projects/${PROJECT_ID}/databases/(default)/documents/barbers/barber-mike" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "shop_id": {"stringValue": "blind-tiger"},
      "user_id": {"stringValue": "user-mike"},
      "displayName": {"stringValue": "Mike Johnson"},
      "bio": {"stringValue": "Master barber with 15 years experience"},
      "active": {"booleanValue": true},
      "buffersDefaultMin": {"integerValue": "10"},
      "createdAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
      "updatedAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
    }
  }' > /dev/null 2>&1

curl -X PATCH "${EMULATOR_HOST}/v1/projects/${PROJECT_ID}/databases/(default)/documents/barbers/barber-tony" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "shop_id": {"stringValue": "blind-tiger"},
      "user_id": {"stringValue": "user-tony"},
      "displayName": {"stringValue": "Tony Martinez"},
      "bio": {"stringValue": "Specializing in modern cuts"},
      "active": {"booleanValue": true},
      "buffersDefaultMin": {"integerValue": "10"},
      "createdAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
      "updatedAt": {"stringValue": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
    }
  }' > /dev/null 2>&1

echo "✅ Created 2 barbers"

echo "🎉 Seed complete!"
