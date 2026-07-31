import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import type { Editor } from '@tiptap/react';
import { InputConfiguration } from '../../decorators/form/Input';
import {
  DEFAULT_RICH_TEXT_TOOLBAR,
  RichTextInputConfiguration,
  RichTextToolbarItem,
} from '../../decorators/form/inputs/RichTextInput';

const DEFAULT_MIN_HEIGHT = 160;

export interface RichTextFieldProps {
  input: InputConfiguration;
  fieldName: string;
}

interface Tiptap {
  react: typeof import('@tiptap/react');
  starterKit: (typeof import('@tiptap/starter-kit'))['default'];
}

//NOTE: @tiptap/* is an optional peer dependency, so it may only be reached through a dynamic
// import — a static one would put ~100kb (and a hard install requirement) on every panel,
// including the ones that never declare a richtext field. The promise is cached at module level
// so a form with several richtext fields loads the editor once.
let tiptapPromise: Promise<Tiptap> | null = null;

function loadTiptap(): Promise<Tiptap> {
  if (!tiptapPromise) {
    const pending = Promise.all([import('@tiptap/react'), import('@tiptap/starter-kit')]).then(
      ([react, starterKit]) => ({ react, starterKit: starterKit.default })
    );
    // A failed load is not cached: a chunk that failed to arrive should be retried on the next
    // mount instead of leaving the field broken for the rest of the session.
    pending.catch(() => {
      tiptapPromise = null;
    });
    tiptapPromise = pending;
  }
  return tiptapPromise;
}

interface ToolbarButton {
  label: string;
  title: string;
  isActive: (editor: Editor) => boolean;
  run: (editor: Editor) => void;
}

const TOOLBAR_BUTTONS: Record<RichTextToolbarItem, ToolbarButton> = {
  bold: {
    label: 'B',
    title: 'Bold',
    isActive: editor => editor.isActive('bold'),
    run: editor => editor.chain().focus().toggleBold().run(),
  },
  italic: {
    label: 'I',
    title: 'Italic',
    isActive: editor => editor.isActive('italic'),
    run: editor => editor.chain().focus().toggleItalic().run(),
  },
  heading: {
    label: 'H2',
    title: 'Heading',
    isActive: editor => editor.isActive('heading', { level: 2 }),
    run: editor => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  bulletList: {
    label: '••',
    title: 'Bullet list',
    isActive: editor => editor.isActive('bulletList'),
    run: editor => editor.chain().focus().toggleBulletList().run(),
  },
  orderedList: {
    label: '1.',
    title: 'Numbered list',
    isActive: editor => editor.isActive('orderedList'),
    run: editor => editor.chain().focus().toggleOrderedList().run(),
  },
  link: {
    label: '🔗',
    title: 'Link',
    isActive: editor => editor.isActive('link'),
    run: editor => {
      const current = editor.getAttributes('link').href as string | undefined;
      const url = window.prompt('Link URL', current ?? 'https://');
      //NOTE: null is "cancelled", empty string is "remove the link".
      if (url === null) return;
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    },
  },
};

export function RichTextField({ input, fieldName }: RichTextFieldProps) {
  const [tiptap, setTiptap] = useState<Tiptap | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let active = true;
    loadTiptap().then(
      modules => {
        if (active) setTiptap(modules);
      },
      (error: unknown) => {
        console.error(
          "proje-react-panel: a 'richtext' input needs @tiptap/react and @tiptap/starter-kit installed.",
          error
        );
        if (active) setLoadFailed(true);
      }
    );
    return () => {
      active = false;
    };
  }, []);

  if (loadFailed) {
    return (
      <div className="rich-text-missing" role="alert">
        Rich text editor unavailable — install @tiptap/react and @tiptap/starter-kit.
      </div>
    );
  }

  if (!tiptap) {
    return <div className="rich-text-loading">Loading editor…</div>;
  }

  return <RichTextEditor input={input} fieldName={fieldName} tiptap={tiptap} />;
}

function RichTextEditor({ input, fieldName, tiptap }: RichTextFieldProps & { tiptap: Tiptap }) {
  const richInput = input as RichTextInputConfiguration;
  // Hooks off a dynamically loaded module: safe because the module object is cached, so the
  // hook identity never changes between renders of this component.
  const { EditorContent, useEditor } = tiptap.react;
  const { control } = useFormContext();
  //NOTE: register() would bind the value to a DOM node; TipTap owns an uncontrolled
  // contenteditable of its own, so the value goes through the controller instead.
  const { field } = useController({ name: fieldName, control });
  const toolbar = richInput.toolbar ?? DEFAULT_RICH_TEXT_TOOLBAR;
  const incomingHtml = typeof field.value === 'string' ? field.value : '';

  // The HTML the editor last emitted or received. The outside -> editor sync compares against
  // this instead of the previous prop value: while the user types, react-hook-form hands our
  // own HTML straight back, and calling setContent for that would jump the caret to the start.
  const editorHtmlRef = useRef<string>(incomingHtml);

  // onUpdate is captured when the editor is created; the ref keeps it pointed at the live handler.
  const onChangeRef = useRef(field.onChange);
  onChangeRef.current = field.onChange;

  const editor = useEditor({
    extensions: [tiptap.starterKit],
    content: editorHtmlRef.current,
    //NOTE: toolbar highlighting reads editor state, so the field has to re-render with it.
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor: updatedEditor }) => {
      // An empty document still serializes to '<p></p>'; report it as empty so required
      // validators (@IsNotEmpty and friends) see what the user actually sees.
      const html = updatedEditor.isEmpty ? '' : updatedEditor.getHTML();
      editorHtmlRef.current = html;
      onChangeRef.current(html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    // getDetailsData resolves after the form mounts, so the value can arrive late — but only
    // replace the document when it really differs from what the editor already holds.
    if (incomingHtml === editorHtmlRef.current) return;
    editorHtmlRef.current = incomingHtml;
    editor.commands.setContent(incomingHtml, { emitUpdate: false });
  }, [editor, incomingHtml]);

  const buttons = useMemo(
    () => toolbar.map(item => ({ item, ...TOOLBAR_BUTTONS[item] })),
    [toolbar]
  );

  return (
    <div className="rich-text-field">
      <div className="rich-text-toolbar" role="toolbar" aria-label={`${input.label ?? fieldName}`}>
        {buttons.map(button => {
          const active = editor ? button.isActive(editor) : false;
          return (
            <button
              key={button.item}
              type="button"
              title={button.title}
              aria-label={button.title}
              aria-pressed={active}
              disabled={!editor}
              className={`rich-text-toolbar-button${active ? ' is-active' : ''}`}
              onClick={() => editor && button.run(editor)}
            >
              {button.label}
            </button>
          );
        })}
      </div>
      <EditorContent
        editor={editor}
        id={fieldName}
        data-testid={`rich-text-${fieldName}`}
        data-placeholder={input.placeholder}
        className={`rich-text-content${!editor || editor.isEmpty ? ' is-empty' : ''}`}
        style={{ minHeight: `${richInput.minHeight ?? DEFAULT_MIN_HEIGHT}px` }}
      />
    </div>
  );
}
