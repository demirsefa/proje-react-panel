# Changelog

This file starts at 1.11.0; earlier releases are only in the git history.

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
