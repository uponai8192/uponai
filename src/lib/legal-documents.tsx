import { promises as fs } from 'node:fs';
import path from 'node:path';
import Link from 'next/link';

type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'subheading'; text: string };

type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  effectiveDate?: string;
  intro: string[];
  sections: LegalSection[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseInline(text: string) {
  const parts = text.split(/(https?:\/\/\S+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g);

  return parts.filter(Boolean).map((part, index) => {
    const key = `${part}-${index}`;

    if (/^https?:\/\//.test(part)) {
      return (
        <a key={key} href={part} className="text-blue-400 hover:text-blue-300">
          {part}
        </a>
      );
    }

    if (/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(part)) {
      return (
        <a key={key} href={`mailto:${part}`} className="text-blue-400 hover:text-blue-300">
          {part}
        </a>
      );
    }

    return part;
  });
}

export async function loadLegalDocument(fileName: string): Promise<LegalDocument> {
  const filePath = path.join(process.cwd(), 'uponailegal', fileName);
  const raw = await fs.readFile(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);

  let title = '';
  let effectiveDate: string | undefined;
  const intro: string[] = [];
  const sections: LegalSection[] = [];

  let currentSection: LegalSection | null = null;
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length || !currentSection) return;
    currentSection.blocks.push({ type: 'paragraph', text: paragraphBuffer.join(' ').trim() });
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length || !currentSection) return;
    currentSection.blocks.push({ type: 'list', items: [...listBuffer] });
    listBuffer = [];
  };

  const pushIntroParagraph = () => {
    if (!paragraphBuffer.length || currentSection) return;
    intro.push(paragraphBuffer.join(' ').trim());
    paragraphBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (currentSection) {
        flushParagraph();
        flushList();
      } else {
        pushIntroParagraph();
      }
      continue;
    }

    if (trimmed.startsWith('# ')) {
      title = trimmed.slice(2).trim();
      continue;
    }

    if (trimmed.startsWith('Effective Date:')) {
      effectiveDate = trimmed.replace(/^Effective Date:\s*/, '').trim();
      continue;
    }

    if (trimmed.startsWith('## ')) {
      if (currentSection) {
        flushParagraph();
        flushList();
      } else {
        pushIntroParagraph();
      }

      currentSection = {
        id: slugify(trimmed.slice(3).trim()),
        title: trimmed.slice(3).trim(),
        blocks: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph();
      flushList();

      if (currentSection) {
        currentSection.blocks.push({ type: 'subheading', text: trimmed.slice(4).trim() });
      }
      continue;
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph();
      listBuffer.push(trimmed.slice(2).trim());
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  if (currentSection) {
    flushParagraph();
    flushList();
  } else {
    pushIntroParagraph();
  }

  return { title, effectiveDate, intro, sections };
}

export function LegalDocumentPage({
  document,
  breadcrumbLabel,
  homeHref = '/',
}: {
  document: LegalDocument;
  breadcrumbLabel: string;
  homeHref?: string;
}) {
  return (
    <>
      <section className="border-b border-[var(--border)] px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <nav className="theme-soft mb-5 flex items-center gap-1 text-sm">
            <Link href={homeHref} className="theme-link-muted">
              Home
            </Link>
            <span className="theme-subtle">/</span>
            <span className="theme-heading">{breadcrumbLabel}</span>
          </nav>
          <h1 className="theme-heading mb-3 text-4xl font-bold">{document.title}</h1>
          {document.effectiveDate ? (
            <p className="theme-soft">Effective date: {document.effectiveDate} &nbsp;·&nbsp; UponAI</p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="theme-card sticky top-24 rounded-xl p-5">
            <p className="theme-heading mb-3 text-sm font-semibold">Contents</p>
            <ul className="space-y-2">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="theme-link-muted block text-xs transition-colors">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-[var(--border)] pt-4">
              <Link href="/privacy-policy" className="block text-xs text-blue-400 hover:text-blue-300">
                Privacy Policy →
              </Link>
              <Link href="/end-user-license-agreement" className="mt-2 block text-xs text-blue-400 hover:text-blue-300">
                End User License Agreement →
              </Link>
            </div>
          </div>
        </aside>

        <main className="space-y-8 lg:col-span-3">
          {document.intro.length ? (
            <div className="theme-panel rounded-xl p-5">
              {document.intro.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'theme-body text-sm leading-relaxed' : 'theme-soft mt-3 text-sm leading-relaxed'}>
                  {parseInline(paragraph)}
                </p>
              ))}
            </div>
          ) : null}

          {document.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="theme-heading mb-4 border-b border-[var(--border)] pb-3 text-xl font-bold">{section.title}</h2>
              <div className="space-y-4 text-sm leading-relaxed">
                {section.blocks.map((block, index) => {
                  if (block.type === 'subheading') {
                    return (
                      <h3 key={index} className="theme-heading pt-1 font-semibold">
                        {block.text}
                      </h3>
                    );
                  }

                  if (block.type === 'list') {
                    return (
                      <ul key={index} className="theme-body ml-2 list-inside list-disc space-y-2">
                        {block.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{parseInline(item)}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={index} className="theme-body">
                      {parseInline(block.text)}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  );
}
