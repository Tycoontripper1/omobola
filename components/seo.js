import Head from "next/head";

export function SEO({
  title = "Omobola School | Building Future Leaders",
  description = "Excellence in education, character development, and community engagement at Omobola School.",
  keywords = "school in Nigeria, quality education, omobolaschool",
  url = "https://omobolaschool.com.ng",
  logo = "/logo.png", // in /public folder
  schema = true, // enable schema by default
}) {
  return (
    <Head>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Social Sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${url}${logo}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${logo}`} />

      {/* Schema Markup */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "School",
              name: "Omobola Group Of Schools",
              url: url,
              logo: `${url}${logo}`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Main Street",
                addressLocality: "Lagos",
                addressCountry: "NG",
              },
              sameAs: [
                "https://facebook.com/omobolaschool",
                "https://instagram.com/omobolaschool",
              ],
              description: description,
            }),
          }}
        />
      )}
    </Head>
  );
}
