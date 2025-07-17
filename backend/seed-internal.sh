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

# Date constants (adjust these as needed)
MARKET_OPEN_DATE="2025-07-01T00:00:00Z"
MARKET_CLOSE_DATE="2025-07-01T00:00:00Z"
PRE_SURVEY_OPEN_DATE="2025-06-01T00:00:00Z"
PRE_SURVEY_CLOSE_DATE="2025-07-01T00:00:00Z"
POST_SURVEY_OPEN_DATE="2025-08-01T00:00:00Z"
POST_SURVEY_CLOSE_DATE="2025-08-30T00:00:00Z"

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

SLEEP_TIME=0.5  # half second between requests

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

# Function to add days to a date in linux/wsl
add_days() {
    local start_date=$1
    local days_to_add=$2
    date -d "${start_date} + ${days_to_add} days" "+%Y-%m-%dT%H:%M:%SZ"
}

# Read market questions from JSON files
entertainment_data=$(cat data/entertainment-market-internal.json | jq -r '.[] | "\(.topic)|\(.question)"')
climate_data=$(cat data/climate-market-internal.json | jq -r '.[] | "\(.topic)|\(.question)"')

# Convert data to arrays
IFS=$'\n' read -d '' -r -a entertainment_array <<< "$entertainment_data"
IFS=$'\n' read -d '' -r -a climate_array <<< "$climate_data"

# Create 7 control group participants
for i in {1..7}; do
    friendly_id="P-$(printf "%03d" $i)"
    make_request "POST" "/participants" "{
        \"friendlyId\": \"${friendly_id}\",
        \"password\": \"password123\",
        \"inControlGroup\": true
    }"
    printf "Created control participant %d/200 [%-20s] %d%%\r" $i $(printf '#%.0s' $(seq 1 $(($i * 20 / 200)))) $(($i * 100 / 200))
done

printf "%*s\r" $(tput cols) ""

# Create 7 experiment group participants
for i in {1..7}; do
    friendly_id="P-$(printf "%03d" $((i + 200)))"
    make_request "POST" "/participants" "{
        \"friendlyId\": \"${friendly_id}\",
        \"password\": \"password123\",
        \"inControlGroup\": false
    }"
    printf "Created non-control participant %d/600 [%-20s] %d%%\r" $i $(printf '#%.0s' $(seq 1 $(($i * 20 / 600)))) $(($i * 100 / 600))
done

printf "%*s\r" $(tput cols) ""

# Create 30 control (entertainment) markets
for i in {1..30}; do
    open_date=$(add_days "$MARKET_OPEN_DATE" $((i*2)))
    close_date=$(add_days "$MARKET_OPEN_DATE" $((i*2 + 2)))
    
    # Get data from entertainment array, cycling through if needed
    data_index=$(( (i-1) % ${#entertainment_array[@]} ))
    IFS='|' read -r topic question <<< "${entertainment_array[$data_index]}"
    
    # Use jq to create properly escaped JSON
    json_payload=$(jq -n \
        --arg name "$topic" \
        --arg question "$question" \
        --arg open_on "$open_date" \
        --arg close_on "$close_date" \
        '{name: $name, question: $question, open_on: $open_on, close_on: $close_on, is_control: true}')
    
    echo "Creating control market $i: $topic"
    make_request "POST" "/markets" "$json_payload"
done

printf "%*s\r" $(tput cols) ""

# Create 30 experiment (climate) markets
for i in {1..30}; do
    open_date=$(add_days "$MARKET_OPEN_DATE" $((i*2)))
    close_date=$(add_days "$MARKET_OPEN_DATE" $((i*2 + 2)))

    # Get data from climate array, cycling through if needed
    data_index=$(( (i-1) % ${#climate_array[@]} ))
    IFS='|' read -r topic question <<< "${climate_array[$data_index]}"
    
    # Use jq to create properly escaped JSON
    json_payload=$(jq -n \
        --arg name "$topic" \
        --arg question "$question" \
        --arg open_on "$open_date" \
        --arg close_on "$close_date" \
        '{name: $name, question: $question, open_on: $open_on, close_on: $close_on, is_control: false}')
    
    echo "Creating experiment market $i: $topic"
    make_request "POST" "/markets" "$json_payload"
done

printf "%*s\r" $(tput cols) ""

# Pre-study survey
make_request "POST" "/surveys" "$(jq -n \
    --arg name "Pre-Study Survey" \
    --arg link "https://nus.syd1.qualtrics.com/jfe/form/SV_4H0mhef6WQA7GQK" \
    --arg open_on "$PRE_SURVEY_OPEN_DATE" \
    --arg close_on "$PRE_SURVEY_CLOSE_DATE" \
    '{name: $name, link: $link, open_on: $open_on, close_on: $close_on}')"
printf "Created pre-study survey\r"

# Post-study survey
make_request "POST" "/surveys" "$(jq -n \
    --arg name "Post-Study Survey" \
    --arg link "https://nus.syd1.qualtrics.com/jfe/form/SV_3L6dF8n7FiPj0dU" \
    --arg open_on "$POST_SURVEY_OPEN_DATE" \
    --arg close_on "$POST_SURVEY_CLOSE_DATE" \
    '{name: $name, link: $link, open_on: $open_on, close_on: $close_on}')"
printf "Created post-study survey\r"

printf "%*s\r" $(tput cols) ""
printf "✅ Database seeding completed!\n"