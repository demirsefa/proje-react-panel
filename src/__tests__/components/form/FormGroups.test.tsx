/**
 * @jest-environment jsdom
 */
import { TextDecoder, TextEncoder } from 'util';
// react-router reads TextEncoder at import time and jsdom has none — set it up before the
// imports below pull the router in.
Object.assign(globalThis, { TextEncoder, TextDecoder });

import 'reflect-metadata';
import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Input, getInputFields } from '../../../decorators/form/Input';
import { Form, getFormConfiguration } from '../../../decorators/form/Form';
import { InnerForm } from '../../../components/form/InnerForm';
import { AnyClass } from '../../../types/AnyClass';

const onSubmit = async () => ({});

@Form({ onSubmit })
class UngroupedForm {
  @Input({ label: 'Name' })
  name: string;

  @Input({ label: 'Slug' })
  slug: string;

  @Input({ type: 'textarea', label: 'Summary', rows: 6 })
  summary: string;

  @Input({ type: 'hidden' })
  id: string;
}

@Form({
  onSubmit,
  groups: [
    { key: 'content', label: 'Content' },
    { key: 'seo', label: 'SEO', collapsible: true },
    { key: 'advanced', label: 'Advanced', collapsible: true, defaultCollapsed: true },
    // Declared but never used by a field — it must not produce an empty fieldset.
    { key: 'unused', label: 'Unused' },
  ],
})
class GroupedForm {
  @Input({ label: 'Title', group: 'content' })
  title: string;

  @Input({ label: 'Meta title', group: 'seo' })
  metaTitle: string;

  @Input({ label: 'Body', group: 'content' })
  body: string;

  @Input({ label: 'Cache key', group: 'advanced' })
  cacheKey: string;

  // No group at all: stays outside every fieldset.
  @Input({ label: 'Name' })
  name: string;

  // Hidden fields never belong to a section, even when they ask for one.
  @Input({ type: 'hidden', group: 'content' })
  id: string;
}

@Form({
  onSubmit,
  groups: [{ key: 'content', label: 'Content' }],
})
class UndeclaredGroupForm {
  @Input({ label: 'Notes', group: 'internal' })
  notes: string;

  @Input({ label: 'Title', group: 'content' })
  title: string;
}

function renderForm<T extends AnyClass>(model: new () => T) {
  const inputs = getInputFields(model as never);
  const formClass = getFormConfiguration(model as never);

  function Harness() {
    const form = useForm();
    return (
      <MemoryRouter>
        <FormProvider {...form}>
          <InnerForm inputs={inputs} formClass={formClass} />
        </FormProvider>
      </MemoryRouter>
    );
  }

  return render(<Harness />);
}

const labelsOf = (root: ParentNode) =>
  Array.from(root.querySelectorAll('.form-field .label span')).map(node => node.textContent);

describe('form field groups', () => {
  it('leaves a form without groups exactly as it was', () => {
    const { container } = renderForm(UngroupedForm);

    expect(container.querySelectorAll('fieldset').length).toBe(0);
    expect(container.querySelectorAll('details').length).toBe(0);
    expect(labelsOf(container)).toEqual(['Name:', 'Slug:', 'Summary:']);

    // Every field is still a direct child of the form's single wrapper div, in source order.
    const fields = Array.from(container.querySelectorAll('.form-field'));
    const wrapper = container.querySelector('form > div');
    expect(fields.length).toBe(4);
    fields.forEach(field => expect(field.parentElement).toBe(wrapper));
    expect(fields[3].querySelector('input')?.getAttribute('type')).toBe('hidden');
  });

  it('honours rows on a textarea', () => {
    const { container } = renderForm(UngroupedForm);

    expect(container.querySelector('textarea')?.getAttribute('rows')).toBe('6');
  });

  it('puts each field in the fieldset its group names', () => {
    const { container } = renderForm(GroupedForm);

    expect(labelsOf(container.querySelector('fieldset[data-group="content"]')!)).toEqual([
      'Title:',
      'Body:',
    ]);
    expect(labelsOf(container.querySelector('fieldset[data-group="seo"]')!)).toEqual([
      'Meta title:',
    ]);
    expect(labelsOf(container.querySelector('fieldset[data-group="advanced"]')!)).toEqual([
      'Cache key:',
    ]);
  });

  it('orders the fieldsets like @Form({ groups }) does and skips the empty ones', () => {
    const { container } = renderForm(GroupedForm);

    const groups = Array.from(container.querySelectorAll('fieldset')).map(fieldset =>
      fieldset.getAttribute('data-group')
    );
    expect(groups).toEqual(['content', 'seo', 'advanced']);
  });

  it('labels a non-collapsible group with a legend', () => {
    const { container } = renderForm(GroupedForm);

    const content = container.querySelector('fieldset[data-group="content"]')!;
    expect(content.querySelector('legend')?.textContent).toBe('Content');
    expect(content.querySelector('details')).toBeNull();
  });

  it('renders collapsible groups as details/summary and honours defaultCollapsed', () => {
    const { container } = renderForm(GroupedForm);

    const seo = container.querySelector('fieldset[data-group="seo"] details') as HTMLDetailsElement;
    const advanced = container.querySelector(
      'fieldset[data-group="advanced"] details'
    ) as HTMLDetailsElement;

    expect(seo.querySelector('summary')?.textContent).toBe('SEO');
    expect(seo.open).toBe(true);
    expect(advanced.open).toBe(false);
  });

  it('keeps ungrouped and hidden fields outside every fieldset', () => {
    const { container } = renderForm(GroupedForm);

    const wrapper = container.querySelector('form > div')!;
    const directFields = Array.from(wrapper.children).filter(child =>
      child.classList.contains('form-field')
    );

    expect(directFields.length).toBe(2);
    expect(directFields[0].querySelector('.label span')?.textContent).toBe('Name:');
    expect(directFields[1].querySelector('input')?.getAttribute('type')).toBe('hidden');
    expect(container.querySelector('fieldset input[type="hidden"]')).toBeNull();
  });

  it('appends a group nobody declared at the end, labelled with its key', () => {
    const { container } = renderForm(UndeclaredGroupForm);

    const groups = Array.from(container.querySelectorAll('fieldset')).map(fieldset =>
      fieldset.getAttribute('data-group')
    );
    expect(groups).toEqual(['content', 'internal']);
    expect(container.querySelector('fieldset[data-group="internal"] legend')?.textContent).toBe(
      'internal'
    );
  });
});
