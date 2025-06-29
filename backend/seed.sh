#!/bin/bash

# Check if URL parameter is provided
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: ./seed.sh <base_url> <friendly_id> <password>"
    echo "Example: ./seed.sh http://localhost:3000 admin password123"
    exit 1
fi

BASE_URL=$1
FRIENDLY_ID=$2
PASSWORD=$3

# Login and capture the cookie
COOKIE=$(curl -sS -X POST "${BASE_URL}/auth/signin" \
    -H "Content-Type: application/json" \
    -d "{
        \"friendlyId\": \"${FRIENDLY_ID}\",
        \"password\": \"${PASSWORD}\"
    }" \
    -i | grep -i "set-cookie" | cut -d' ' -f2)

if [ -z "$COOKIE" ]; then
    echo "Failed to get authentication cookie. Please check credentials."
    exit 1
fi

# Function to make authenticated requests
make_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    curl -sS -X "$method" "${BASE_URL}${endpoint}" \
        -H "Content-Type: application/json" \
        -H "Cookie: ${COOKIE}" \
        -d "$data" > /dev/null
}

# Array of common names to use as base for friendlyIds
names=("james" "mary" "john" "patricia" "robert" "jennifer" "michael" "linda" "william" "elizabeth" "david" "barbara" "richard" "susan" "joseph" "jessica" "thomas" "sarah" "charles" "karen" "christopher" "nancy" "daniel" "lisa" "matthew" "betty" "anthony" "margaret" "donald" "sandra" "mark" "ashley" "paul" "kimberly" "steven" "emily" "andrew" "donna" "kenneth" "michelle" "joshua" "carol")

# Create 200 control group participants
for i in {1..200}; do
    random_name=${names[$RANDOM % ${#names[@]}]}
    friendly_id="${random_name}$(printf "%03d" $i)"
    make_request "POST" "/participants" "{
        \"friendlyId\": \"${friendly_id}\",
        \"password\": \"password123\",
        \"inControlGroup\": true
    }"
    printf "Created control participant %d/200 [%-20s] %d%%\r" $i $(printf '#%.0s' $(seq 1 $(($i * 20 / 200)))) $(($i * 100 / 200))
done

printf "%*s\r" $(tput cols) ""

# Create 600 experiment group participants
for i in {1..600}; do
    random_name=${names[$RANDOM % ${#names[@]}]}
    friendly_id="${random_name}$(printf "%03d" $(( i + 200 )))"
    make_request "POST" "/participants" "{
        \"friendlyId\": \"${friendly_id}\",
        \"password\": \"password123\",
        \"inControlGroup\": false
    }"
    printf "Created non-control participant %d/600 [%-20s] %d%%\r" $i $(printf '#%.0s' $(seq 1 $(($i * 20 / 600)))) $(($i * 100 / 600))
done

printf "%*s\r" $(tput cols) ""

# Function to add days to a date in macOS
add_days() {
    local start_date=$1
    local days_to_add=$2
    date -j -v+"${days_to_add}"d -f "%Y-%m-%dT%H:%M:%SZ" "${start_date}" "+%Y-%m-%dT%H:%M:%SZ"
}

# Read market questions from JSON files
entertainment_data=$(cat data/entertainment-market.json | jq -r '.[] | "\(.topic)|\(.question)"')
climate_data=$(cat data/climate-market.json | jq -r '.[] | "\(.topic)|\(.question)"')

# Convert data to arrays
IFS=$'\n' read -d '' -r -a entertainment_array <<< "$entertainment_data"
IFS=$'\n' read -d '' -r -a climate_array <<< "$climate_data"

# Create 30 control (entertainment) markets
for i in {1..30}; do
    open_date=$(add_days "2025-06-01T00:00:00Z" $((i*2)))
    close_date=$(add_days "2025-06-01T00:00:00Z" $((i*2 + 2)))
    
    # Get data from entertainment array, cycling through if needed
    data_index=$(( (i-1) % ${#entertainment_array[@]} ))
    IFS='|' read -r topic question <<< "${entertainment_array[$data_index]}"
    
    make_request "POST" "/markets" "{
        \"name\": \"${topic}\",
        \"question\": \"${question}\",
        \"open_on\": \"${open_date}\",
        \"close_on\": \"${close_date}\",
        \"is_control\": true
    }"
    printf "Created control market %d/30 [%-20s] %d%%\r" $i $(printf '#%.0s' $(seq 1 $(($i * 20 / 30)))) $(($i * 100 / 30))
done

printf "%*s\r" $(tput cols) ""

# Create 30 experiment (climate) markets
for i in {1..30}; do
    open_date=$(add_days "2025-06-01T00:00:00Z" $((i*2)))
    close_date=$(add_days "2025-06-01T00:00:00Z" $((i*2 + 2)))

    # Get data from climate array, cycling through if needed
    data_index=$(( (i-1) % ${#climate_array[@]} ))
    IFS='|' read -r topic question <<< "${climate_array[$data_index]}"
    
    make_request "POST" "/markets" "{
        \"name\": \"${topic}\",
        \"question\": \"${question}\",
        \"open_on\": \"${open_date}\",
        \"close_on\": \"${close_date}\",
        \"is_control\": false
    }"
    printf "Created experiment market %d/30 [%-20s] %d%%\r" $i $(printf '#%.0s' $(seq 1 $(($i * 20 / 30)))) $(($i * 100 / 30))
done

printf "%*s\r" $(tput cols) ""

# Pre-study survey
make_request "POST" "/surveys" '{
    "name": "Pre-Study Survey",
    "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "openOn": "2024-01-20T00:00:00Z",
    "closeOn": "2026-01-20T00:00:00Z"
}'
printf "Created pre-study survey\r"

# Post-study survey
make_request "POST" "/surveys" '{
    "name": "Post-Study Survey",
    "link": "https://forms.google.com/post-study",
    "openOn": "2025-06-23T00:00:00Z",
    "closeOn": "2025-06-25T00:00:00Z"
}'

printf "%*s\r" $(tput cols) ""
printf "✅ Database seeding completed!\n"