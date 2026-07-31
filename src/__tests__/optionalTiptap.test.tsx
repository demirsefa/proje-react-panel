/**
 * @jest-environment jsdom
 */
import 'reflect-metadata';
import React from 'react';
import { TextDecoder, TextEncoder } from 'util';
import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input, getInputFields } from '../decorators/form/Input';
import { RichTextInput } from '../decorators/form/inputs/RichTextInput';
import { FormField } from '../components/form/FormField';

// @tiptap/* is declared optional in peerDependenciesMeta, so a panel that never uses a richtext
// field must work with the packages absent. Both are made unresolvable here; the flags record
// whether anything reached for them at all.
let reactRequested = false;
let starterKitRequested = false;

jest.mock('@tiptap/react', () => {
  reactRequested = true;
  throw new Error("Cannot find module '@tiptap/react'");
});

jest.mock('@tiptap/starter-kit', () => {
  starterKitRequested = true;
  throw new Error("Cannot find module '@tiptap/starter-kit'");
});

class PlainForm {
  @Input({ label: 'Name' })
  name: string;
}

class ArticleForm {
  @RichTextInput({ label: 'Body' })
  body: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Harness({ model }: { model: any }) {
  const form = useForm({ defaultValues: { name: '', body: '' } });
  const inputs = getInputFields(model);
  return (
    <FormProvider {...form}>
      {inputs.map(input => (
        <FormField key={input.name} input={input} register={form.register} />
      ))}
    </FormProvider>
  );
}

describe('@tiptap as an optional peer dependency', () => {
  beforeAll(() => {
    // jsdom ships neither; react-router reads them at import time. Nothing to do with tiptap.
    Object.assign(globalThis, { TextEncoder, TextDecoder });
  });

  it('imports the whole library without @tiptap installed', async () => {
    const library = await import('../index');

    expect(typeof library.FormPage).toBe('function');
    expect(typeof library.RichTextInput).toBe('function');
    expect(typeof library.ListPage).toBe('function');
    expect(reactRequested).toBe(false);
    expect(starterKitRequested).toBe(false);
  });

  it('renders the other field types without @tiptap installed', () => {
    render(<Harness model={PlainForm} />);

    expect(screen.getByText('Name:')).toBeTruthy();
    expect(reactRequested).toBe(false);
  });

  it('tells the developer what to install when a richtext field is actually used', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<Harness model={ArticleForm} />);

    const message = await screen.findByRole('alert');
    expect(message.textContent).toContain('@tiptap/react');
    expect(message.textContent).toContain('@tiptap/starter-kit');
    await waitFor(() => expect(reactRequested).toBe(true));
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
