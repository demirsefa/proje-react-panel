# Open: nothing runs the tests except a person

Status: **open** — written 2026-09-11, after publishing 1.12.0.

## What is missing

This repo has 67 tests, an eslint config and a typecheck, and **none of them run by
themselves**:

- no `.husky/` — nothing runs at commit time,
- no CI workflow — nothing runs on push,
- no `prepublishOnly` / `prepack` check — nothing runs at publish time.

`yarn test`, `yarn lint` and `yarn build` are green in 1.12.0 only because they were
run by hand before publishing. A release that skips that habit ships whatever is in
`dist/` at that moment, and `npm publish` cannot be undone — a bad version can only
be buried under a newer one.

The consumer side does not cover this either. Downstream projects run their own
typecheck against the **published** `.d.ts`, so they catch a broken type surface
after it is already public, and they never run this repo's tests at all.

## The cheapest fix, in order

1. **`"prepublishOnly": "yarn lint && yarn test"`** — one line, and it guards the
   step that cannot be taken back. Note this runs the test suite, not the build:
   `dist/` is produced by `yarn build` and must already be current, so a
   `prepack: "yarn build"` is the natural companion.
2. **husky pre-commit** (lint + `tsc --noEmit` on staged files) — moves the same
   feedback from release time to commit time.
3. **CI on push** — only worth it once more than one machine pushes here.

## Related: the package manager is now pinned, on purpose

1.12.0 also moved the repo to yarn 4.17.0 (Berry, `nodeLinker: node-modules`). That
was not tidying: installing with **npm** produces a tree where
`rollup-plugin-typescript2` never transforms, and `yarn build` dies with
`Expected ',' got 'ident'` while parsing raw TypeScript — the same sources build
cleanly under yarn. `packageManager` + a committed `yarnPath` makes `corepack yarn`
the one supported path; nothing yet *stops* someone from running `npm install` and
hitting that wall, which a `preinstall` guard (`only-allow yarn`) would.
