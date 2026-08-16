import { UseFormRegister } from 'react-hook-form';
import { InputConfiguration } from '../../decorators/form/Input';

//TODO: any is not a good solution, we need to find a better way to do this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldRegisterOptions = Parameters<UseFormRegister<any>>[1];

/**
 * The DOM hands every <input> value over as a string, number inputs included. Deciding what
 * lands in the form body is this module's job — not the model author's: a forgotten
 * `@Type(() => Number)` used to turn into a client-side `@IsInt()` error under the field, or a
 * backend 400, with no visible cause. Checkbox already closed the same trap through
 * `setValueAs`, see Checkbox.tsx.
 */
export function getFieldRegisterOptions(
  inputType: InputConfiguration['inputType']
): FieldRegisterOptions {
  switch (inputType) {
    case 'number':
      return { setValueAs: toNumber };
    case 'date':
      //NOTE: DELIBERATELY not converted. A date field carries the native input's 'YYYY-MM-DD'
      // string all the way to onSubmit, and an empty one carries ''. Existing consumers validate
      // it with @IsString()/@IsISO8601() and post it as-is, so handing them a Date object here
      // would break them silently. `valueAsDate` is intentionally unused.
      return undefined;
    default:
      return undefined;
  }
}

/**
 * Empty means "no number given", so it becomes `undefined` rather than react-hook-form's own
 * `valueAsNumber` result of NaN. NaN is neither null nor undefined, so `@IsOptional()` does not
 * skip it and an untouched optional number field would start failing validation; `undefined` is
 * skipped by `@IsOptional()`, dropped by JSON.stringify, and still fails a required `@IsInt()`
 * with the error visible under the field. A non-empty value that is not a number is left to
 * produce NaN on purpose — that is a real error and it must stay visible.
 */
function toNumber(value: unknown): number | undefined {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }
  // Already numeric: a value pushed in by getDetailsData or form.setValue passes through
  // untouched, so models that do declare @Type(() => Number) keep working.
  if (typeof value === 'number') {
    return value;
  }
  return Number(value);
}
