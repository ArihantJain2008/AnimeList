import DOMPurify from "dompurify";

const DESCRIPTION_SANITIZE_OPTIONS = {
  ALLOWED_TAGS: [
    "br",
    "p",
    "i",
    "em",
    "b",
    "strong",
    "ul",
    "ol",
    "li",
  ],
  ALLOWED_ATTR: [],
};

function decodeHtmlEntities(value) {
  const parser = new DOMParser();
  const parsedDocument =
    parser.parseFromString(
      value,
      "text/html"
    );

  return (
    parsedDocument.documentElement
      .textContent || ""
  );
}

export function sanitizeDescriptionToText(
  description,
  fallback = "No description available."
) {
  if (
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return fallback;
  }

  const sanitizedHtml = DOMPurify.sanitize(
    description,
    DESCRIPTION_SANITIZE_OPTIONS
  );

  const withLineBreaks = sanitizedHtml
    .replace(
      /<\s*br\s*\/?>/gi,
      "\n"
    )
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<li>/gi, "- ")
    .replace(/<\/li>/gi, "\n");

  const withoutTags = withLineBreaks.replace(
    /<\/?[^>]+(>|$)/g,
    ""
  );

  const decodedText = decodeHtmlEntities(
    withoutTags
  );

  const cleanedText = decodedText
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();

  return cleanedText || fallback;
}
