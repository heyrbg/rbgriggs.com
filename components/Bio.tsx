import { Fragment } from "react";
import { site } from "@/lib/site";

const LINKS: Record<string, string> = {
  "Tech for Life": site.publication.url,
  "Praxica Labs": site.org.url,
};
const pattern = new RegExp(`(${Object.keys(LINKS).join("|")})`, "g");

/** The plain-text bio with its publication and organization names linked. */
export function Bio({ text }: { text: string }) {
  return (
    <>
      {text.split(pattern).map((part, i) =>
        LINKS[part] ? <a key={i} href={LINKS[part]}>{part}</a> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
