import Link from 'next/link';
import type { PortableTextBlock, PortableTextSpan } from '@/lib/cms/legal';

// Minimal Portable Text renderer for the narrow block subset the legal page
// schema allows: paragraphs, bullet and numbered lists, bold, italic and
// links. Written rather than pulled in as a dependency because the schema
// deliberately permits nothing else; if richer content types are ever added,
// swap this for @portabletext/react instead of growing it.

function Spans({
  spans,
  markDefs,
}: {
  spans: PortableTextSpan[];
  markDefs: PortableTextBlock['markDefs'];
}) {
  return (
    <>
      {spans.map((span, index) => {
        const key = span._key ?? String(index);
        let node: React.ReactNode = span.text;

        for (const mark of span.marks ?? []) {
          if (mark === 'strong') {
            node = <strong className="font-semibold text-[var(--text-strong)]">{node}</strong>;
            continue;
          }
          if (mark === 'em') {
            node = <em>{node}</em>;
            continue;
          }
          // Anything else is an annotation key pointing into markDefs.
          const def = markDefs?.find((entry) => entry._key === mark);
          if (def?.href) {
            node = def.href.startsWith('/') ? (
              <Link href={def.href} className="theme-link-muted underline">
                {node}
              </Link>
            ) : (
              <a
                href={def.href}
                className="theme-link-muted underline"
                {...(def.href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noreferrer' })}
              >
                {node}
              </a>
            );
          }
        }

        return <span key={key}>{node}</span>;
      })}
    </>
  );
}

export default function PortableText({ blocks }: { blocks: PortableTextBlock[] }) {
  const rendered: React.ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];

    if (block.listItem) {
      // Consecutive list items of the same kind form one list element.
      const kind = block.listItem;
      const items: PortableTextBlock[] = [];
      while (index < blocks.length && blocks[index].listItem === kind) {
        items.push(blocks[index]);
        index += 1;
      }
      const ListTag = kind === 'number' ? 'ol' : 'ul';
      rendered.push(
        <ListTag
          key={items[0]._key ?? `list-${index}`}
          className={`ml-5 space-y-2 ${kind === 'number' ? 'list-decimal' : 'list-disc'}`}
        >
          {items.map((item, itemIndex) => (
            <li key={item._key ?? itemIndex}>
              <Spans spans={item.children ?? []} markDefs={item.markDefs} />
            </li>
          ))}
        </ListTag>
      );
      continue;
    }

    rendered.push(
      <p key={block._key ?? `block-${index}`}>
        <Spans spans={block.children ?? []} markDefs={block.markDefs} />
      </p>
    );
    index += 1;
  }

  return <>{rendered}</>;
}
