/**
 * @jest-environment jsdom
 */
import 'reflect-metadata';
import React from 'react';
import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { act, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { getInputFields } from '../../../decorators/form/Input';
import { RichTextInput } from '../../../decorators/form/inputs/RichTextInput';
import { FormField } from '../../../components/form/FormField';

// The real editor is kept — only its instance is captured, so the assertions below run against
// actual ProseMirror state (document, selection) instead of a stand-in.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let capturedEditor: any = null;

jest.mock('@tiptap/react', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = jest.requireActual('@tiptap/react') as any;
  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useEditor: (...args: any[]) => {
      const editor = actual.useEditor(...args);
      capturedEditor = editor;
      return editor;
    },
  };
});

class ArticleForm {
  @RichTextInput({ label: 'Body', placeholder: 'Write something…' })
  body: string;
}

class ToolbarForm {
  @RichTextInput({ label: 'Body', toolbar: ['bold', 'italic'] })
  body: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let form: UseFormReturn<any>;

function Harness({
  model = ArticleForm,
  defaultValue = '',
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model?: any;
  defaultValue?: string;
}) {
  form = useForm({ defaultValues: { body: defaultValue } });
  const inputs = getInputFields(model);
  return (
    <FormProvider {...form}>
      {inputs.map(input => (
        <FormField key={input.name} input={input} register={form.register} />
      ))}
    </FormProvider>
  );
}

async function renderEditor(props: Parameters<typeof Harness>[0] = {}) {
  const utils = render(<Harness {...props} />);
  // The editor is behind a lazy import (optional peer dependency), so it lands a tick later.
  await screen.findByTestId('rich-text-body');
  await waitFor(() => expect(capturedEditor).not.toBeNull());
  return utils;
}

function typeIntoEditor(text: string) {
  act(() => {
    capturedEditor.commands.insertContent(text);
  });
}

describe('RichTextInput', () => {
  beforeEach(() => {
    capturedEditor = null;
  });

  it('marks the field as richtext in the metadata', () => {
    const body = getInputFields(ArticleForm).find(input => input.name === 'body');

    expect(body?.type).toBe('richtext');
  });

  it('mounts with the HTML it is given as a value', async () => {
    await renderEditor({ defaultValue: '<p>kayıtlı içerik</p>' });

    expect(capturedEditor.getHTML()).toBe('<p>kayıtlı içerik</p>');
    expect(screen.getByTestId('rich-text-body').textContent).toContain('kayıtlı içerik');
  });

  it('shows the placeholder while the document is empty', async () => {
    await renderEditor();

    const content = screen.getByTestId('rich-text-body');
    expect(content.className).toContain('is-empty');
    expect(content.getAttribute('data-placeholder')).toBe('Write something…');
  });

  it('writes the edited HTML into the form value', async () => {
    await renderEditor();

    typeIntoEditor('merhaba');

    await waitFor(() => expect(form.getValues('body')).toBe('<p>merhaba</p>'));
    expect(screen.getByTestId('rich-text-body').className).not.toContain('is-empty');
  });

  it('reports an emptied editor as an empty value, not as <p></p>', async () => {
    await renderEditor({ defaultValue: '<p>silinecek</p>' });

    act(() => {
      capturedEditor.commands.clearContent(true);
    });

    await waitFor(() => expect(form.getValues('body')).toBe(''));
  });

  it('syncs content that arrives after mount (getDetailsData)', async () => {
    await renderEditor();

    act(() => {
      form.setValue('body', '<p>sunucudan gelen</p>');
    });

    await waitFor(() => expect(capturedEditor.getHTML()).toBe('<p>sunucudan gelen</p>'));
    expect(screen.getByTestId('rich-text-body').textContent).toContain('sunucudan gelen');
  });

  it('leaves the caret alone while typing in the middle of the text', async () => {
    await renderEditor({ defaultValue: '<p>AB</p>' });

    // Typing at the very end would hide a caret reset, since a reset lands there too.
    act(() => {
      capturedEditor.commands.setTextSelection(2);
    });
    typeIntoEditor('X');
    const afterFirstKey = capturedEditor.state.selection.from;
    typeIntoEditor('Y');

    // Re-feeding the value into the editor on every keystroke would push the caret to the end
    // of the document, so the second character would land after the B instead of before it.
    expect(afterFirstKey).toBe(3);
    expect(capturedEditor.state.selection.from).toBe(4);
    expect(capturedEditor.getText()).toBe('AXYB');
  });

  it('renders only the toolbar buttons the decorator asks for', async () => {
    await renderEditor({ model: ToolbarForm });

    const buttons = document.querySelectorAll('.rich-text-toolbar-button');
    expect(Array.from(buttons).map(button => button.getAttribute('title'))).toEqual([
      'Bold',
      'Italic',
    ]);
  });

  it('defaults to the full toolbar', async () => {
    await renderEditor();

    expect(document.querySelectorAll('.rich-text-toolbar-button').length).toBe(6);
  });

  it('applies formatting from the toolbar to the form value', async () => {
    await renderEditor();

    typeIntoEditor('kalın');
    act(() => {
      capturedEditor.commands.selectAll();
    });
    act(() => {
      (screen.getByTitle('Bold') as HTMLButtonElement).click();
    });

    await waitFor(() => expect(form.getValues('body')).toBe('<p><strong>kalın</strong></p>'));
  });
});
