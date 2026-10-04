import Link from "next/link";

type Item = { slug: string; title: string; subtitle: string; date: string; genre: string };

export function EssayList({ essays }: { essays: Item[] }) {
  return (
    <ul className="essay-list">
      {essays.map((e) => (
        <li key={e.slug}>
          <p className="meta" style={{ margin: 0 }}>
            <time dateTime={e.date}>{e.date}</time>
            {e.genre !== "essay" && <> · {e.genre}</>}
          </p>
          <Link className="title" href={`/essays/${e.slug}`}>{e.title}</Link>
          {e.subtitle && <p>{e.subtitle}</p>}
        </li>
      ))}
    </ul>
  );
}
