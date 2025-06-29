1. setup

```bash
yarn setup
```

for windows, do

```bash
copy .env.template .env
```

then, run

```bash
yarn install
```

2. run the db (make sure docker is running first!)

```bash
yarn dock:up
```

for windows use

```bash
docker compose up -d
```

3. apply migrations

```bash
yarn migrate
```

4. run the server

run this in bash as well!

```bash
yarn dev
```

5. seed the db

make sure to do this in bash terminal! and server is running before seeding

```bash
# replace <username> and <password> with whichever username and password you are using in the .env file
# e.g. bash seed.sh http://localhost:3000 admin password123
bash seed.sh http://localhost:3000 <username> <password>
```

6. viewing the db via cli

```bash
docker exec -it eco-market-db psql -U postgres -d eco-market
```

to see all tables use \dt
