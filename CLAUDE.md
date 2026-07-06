# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A small Express API backing a personal blog's feedback feature, deployed to Vercel as a serverless function. It has a single resource (`feedback`) backed by DynamoDB.

## Commands

- Install: `npm install`
- Run locally: `node index.js` (entry point loads `.env` via `dotenv`, then starts `server.js` on port 3001)
- There is no lint or test setup — `npm test` is a stub that exits with an error, and no test files exist.

Local development requires a `.env` file with DynamoDB credentials (see `src/helpers/database.js`): `accessKeyId`, `secretAccessKey`, `region`, `endpoint`.

## Architecture

**Entry points**: `index.js` (local/dev, loads dotenv then calls `server.createServer()`) vs `app.js` (the Vercel serverless handler — `vercel.json` routes all requests to it via `@vercel/node`). Both wire up the same Express app; keep changes to routing/middleware in sync between how each is invoked, since Vercel doesn't go through `index.js`/`server.js`'s `app.listen`.

**Request flow**: `server.js` sets up Express (cors, body-parser, static `public/`, then routes), serves `public/templates/index.html` at `/`, and falls back to `public/templates/error.html` (404) for any unmatched route.

**Layering** (`src/modules/feedbacks/`): each feature module follows `controller -> service -> repository`:
- `controller/controller.js` — Express handlers, sets cache headers, calls the service, returns JSON. No business logic.
- `service/service.js` — thin pass-through today, shapes data between controller and repository.
- `repository/repository.js` — the only layer that talks to DynamoDB (via `src/helpers/database.js`'s `AWS.DynamoDB.DocumentClient`). `findAll` uses a recursive `scan` helper (`dbRead`) to page through `LastEvaluatedKey`. IDs are generated with `uuid` (v4) in `create`.

New resources should follow this same three-layer pattern under `src/modules/<name>/`, registered in `src/routes/api.js`.

**Routes** (`src/routes/api.js`): all under `/api/v1/feedback` — GET (list/by id), POST, PATCH, DELETE.

Note: `body-parser` and `uuid` are used directly in code but are not top-level entries in `package.json` (they're transitive deps of `express`/`aws-sdk`). Be aware of this if dependency updates ever remove them from `node_modules`.
