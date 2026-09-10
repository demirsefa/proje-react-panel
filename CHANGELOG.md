# Changelog

This file starts at 1.11.0; earlier releases are only in the git history.

## 1.12.0

### Added

- **Lists size their own pages.** `ListPage` now asks for as many rows as the datagrid can show
  instead of leaving the page size to the server, which on a tall screen meant ten rows and a large
  empty area below them. The grid element is measured — not assumed — because a consumer styling its
  own shell has no fixed `100vh - chrome` height, and any constant here would be silently wrong for
  them. The row height is the other half of the sum and is *declared* rather than measured:
  measuring a row would require rendering one first, so the correct page size would always cost a
  second request. `@List({ rowHeight })` overrides it for taller rows, `@List({ autoCalculate: false })`
  restores the previous behaviour, and the computed value travels as the existing `limit` query
  parameter, so no backend change is needed.
- The declared `rowHeight` is applied to the row inline, and image cells are capped to it. A
  declaration the library does not enforce is a guess: an `image` cell alone used to make its row
  roughly three times taller than the rest, which is exactly the case that would break the
  calculation. A development-only warning names any list that carries an image cell without
  declaring a row height.

### Fixed

- **The last page of a list is reachable again.** Page count used `Math.floor(total / limit)`, so a
  final partial page was never drawn: 2151 records at 10 per page offered 215 pages and the last
  record could not be opened from anywhere. Worse, any list with fewer than two full pages
  (`total < 2 * limit`) computed a single page and hid the pagination entirely, stranding every
  record after the first page. It also renders nothing while `limit` is still 0 rather than drawing
  `NaN` pages.
- The loading state now fills the datagrid instead of replacing the whole page, so the list header
  and footer no longer disappear on every page change.

## 1.11.1

### Fixed

- **Icons keep their `viewBox`, so consumer CSS can resize them.** SVGR was running SVGO with its
  default configuration, whose `removeViewBox` plugin drops a `viewBox` that is redundant with
  `width`/`height`. Only `check.svg` and `cross.svg` matched that condition (`0 0 24 24` with
  `width=24`); every other icon carries `width=800` and was unaffected. Without a `viewBox` an SVG
  cannot scale: a consumer sizing `.icon-true` to 16px got the top-left 16 units of a 24-unit
  drawing — the tick in a boolean cell was cropped away rather than shrunk. `removeViewBox` is now
  explicitly disabled in `rollup.config.mjs`. Consumers carrying a dist patch that injects the
  attribute can remove it.
- `prefixIds` is passed explicitly alongside it, because supplying `svgoConfig` replaces SVGR's
  default plugin list wholesale — losing it would let ids and class names collide between icons
  inlined into the same bundle.

## 1.11.0

### Fixed

- **`@LinkCell({ path: '/users/:id' })` now fills its path parameters from the row.** The path was
  handed to `<Link to>` verbatim, so every open/edit cell rendered the literal `/users/:id` and
  404'd on click — a link that looks right until it is used. Every `:param` in `path` is now
  replaced with the row's value of that name. A parameter the row has no value for is left in
  place rather than dropped, so a missing field stays visible instead of quietly producing
  `/users/undefined`. Consumers carrying a local patch for this can remove it.

### Added

- `src/__tests__/components/list/LinkCell.test.tsx` pins the substitution: one parameter, several
  parameters, an unmatched parameter, and a path with none.

### Changed

- **The `react-router` peer range is now `^7.3.0`** instead of the exact `7.3.0` pin. Any 7.x from
  7.3.0 up satisfies it, so a consumer upgrading the router for its own reasons (e.g. a security
  advisory) no longer gets a permanent peer warning.

## 1.11.0-beta.0

### Changed — please read before upgrading

- **`inputType: 'number'` fields now reach `onSubmit` as numbers.** `FormField` registers them
  with a `setValueAs` conversion, the same way `type: 'checkbox'` has always been registered as a
  boolean. `@Type(() => Number)` on the model is no longer needed — and keeps working where it is
  already written, since a value that is already a number passes through untouched.
- **An empty number field is now `undefined`, where it used to be `''`.** This is a deliberate
  behaviour change, and the reason to try this release on a branch first:
  - Before: `''` reached the body, and `@Type(() => Number)` turned it into `0`. A user who left
    an optional number field empty silently saved a `0`.
  - Now: the key is `undefined`, so `JSON.stringify` drops it from the request. `@IsOptional()`
    fields stay unset, and a required `@IsInt()` fails client-side with the message shown under
    the field.
  - Why not react-hook-form's `valueAsNumber`: it produces `NaN` for an empty input. `NaN` is
    neither `null` nor `undefined`, so `@IsOptional()` does not skip it and every untouched
    optional number field would start failing validation — and `NaN` becomes `null` in JSON.
  - If your backend distinguishes "field absent" from "field null", check those endpoints.
- **`type: 'hidden'` fields go through the same conversion.** A hidden id declared with
  `inputType: 'number'` reaches the body as a number instead of a string.
- **`inputType: 'date'` is deliberately left as a string** — the native input's `'YYYY-MM-DD'`,
  and `''` when empty. Existing consumers validate it with `@IsString()` / `@IsISO8601()` and post
  it as-is, so it is never converted to a `Date`. Documented in the README rather than left to be
  discovered.
- Multipart forms (`@Form({ type: 'formData' })`) no longer append `undefined`/`null` values on
  top of what the DOM already put into the `FormData`; an empty number field used to be able to
  post the literal string `undefined`.

### Added

- `src/__tests__/components/form/NumberField.test.tsx` pins all of the above: filled, empty,
  hidden, `defaultValue`, programmatic `setValue`, text and date fields, plus a model that still
  declares `@Type(() => Number)`.
