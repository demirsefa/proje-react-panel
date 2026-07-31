import { ExtendedInput, ExtendedInputOptions, InputConfiguration, InputOptions } from '../Input';

export type RichTextToolbarItem =
  | 'bold'
  | 'italic'
  | 'heading'
  | 'bulletList'
  | 'orderedList'
  | 'link';

export const DEFAULT_RICH_TEXT_TOOLBAR: RichTextToolbarItem[] = [
  'bold',
  'italic',
  'heading',
  'bulletList',
  'orderedList',
  'link',
];

export interface RichTextInputOptions extends InputOptions {
  toolbar?: RichTextToolbarItem[];
  minHeight?: number;
}

export interface RichTextInputConfiguration extends InputConfiguration {
  type: 'richtext';
  toolbar?: RichTextToolbarItem[];
  minHeight?: number;
}

//NOTE: the editor itself lives behind a lazy import in FormField, because @tiptap/* is an
// optional peer dependency — this decorator is safe to import without it installed.
export function RichTextInput(options?: RichTextInputOptions): PropertyDecorator {
  return ExtendedInput({
    ...options,
    type: 'richtext',
  } as ExtendedInputOptions);
}
