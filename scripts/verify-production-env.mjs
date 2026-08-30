import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const required = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "NEXT_PUBLIC_SITE_URL",
];

const missing = required.filter(
  (key) => !process.env[key]?.trim()
);

const errors = [];

if (missing.length) {
  errors.push(
    `Missing required variables: ${missing.join(", ")}`
  );
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

if (siteUrl) {
  try {
    const parsed = new URL(siteUrl);

    if (parsed.protocol !== "https:") {
      errors.push(
        "NEXT_PUBLIC_SITE_URL must use HTTPS in production."
      );
    }

    if (
      /example|localhost|127\.0\.0\.1/i.test(
        parsed.hostname
      )
    ) {
      errors.push(
        "NEXT_PUBLIC_SITE_URL still points to a placeholder/local hostname."
      );
    }

    if (parsed.pathname !== "/") {
      errors.push(
        "NEXT_PUBLIC_SITE_URL should be the origin only, with no path."
      );
    }
  } catch {
    errors.push(
      "NEXT_PUBLIC_SITE_URL is not a valid absolute URL."
    );
  }
}

if (errors.length) {
  console.error(
    "\nProduction environment verification failed:\n"
  );

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(
  "Production environment verification passed."
);

console.log(
  `Site: ${siteUrl}`
);

console.log(
  `Firebase project: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`
);

console.log(
  `App Check: ${
    process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY
      ? "configured"
      : "not configured (optional until enforcement)"
  }`
);

console.log(
  `Analytics: ${
    process.env.NEXT_PUBLIC_GA_ID
      ? "configured"
      : "disabled"
  }`
);