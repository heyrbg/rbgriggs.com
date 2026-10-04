import { site } from "./site";

export const personId = `${site.url}/#person`;

export function personSchema(bio: string, interests: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: site.url,
    description: bio,
    knowsAbout: interests,
    sameAs: site.sameAs,
    email: `mailto:${site.email}`,
    jobTitle: "Writer and philosopher of technology",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    author: { "@id": personId },
    license: site.license.url,
  };
}
