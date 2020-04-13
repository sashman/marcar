# marcar

## Prerequisites

Postgres:

```
docker run -d -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -p 5432:5432 postgres
```

## Usage

```
npm i
```

Run migrations:

```
prisma migrate up --experimental
```

Run seeds:

```
npm run seed
```


Bring up dev environment:

```
npm run -s dev
```
