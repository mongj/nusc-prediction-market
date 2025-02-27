1. setup

```bash
yarn setup
```

2. run the db (make sure docker is running first!)

```bash
yarn dock:up
```

3. apply migrations

```bash
yarn migrate
```

4. seed the db

```bash
# replace <username> and <password> with whichever username and password you are using in the .env file
# e.g. bash seed.sh http://localhost:3000 admin password123
bash seed.sh http://localhost:3000 <username> <password>
```

5. run the server

```bash
yarn dev
```
