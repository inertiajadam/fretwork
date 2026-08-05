/* Renders a JSON-LD structured-data block. Safe: we control the input   */
/* (built from our own registries), and JSON.stringify escapes it.        */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
