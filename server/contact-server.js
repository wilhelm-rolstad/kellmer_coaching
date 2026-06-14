import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { Resend } from "resend";

function loadDotEnv() {
  const envPath = resolve(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return;
  }

  const fileContents = readFileSync(envPath, "utf8");

  for (const line of fileContents.split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

const port = Number(process.env.PORT ?? 3001);
const resendApiKey = process.env.RESEND_API_KEY;
const contactRecipient = process.env.CONTACT_TO_EMAIL;
const contactFrom = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

if (!resendApiKey) {
  console.warn("Missing RESEND_API_KEY. Contact emails will fail until it is set.");
}

if (!contactRecipient) {
  console.warn("Missing CONTACT_TO_EMAIL. Contact emails will fail until it is set.");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(body));
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const server = createServer(async (request, response) => {
  if (request.method !== "POST" || request.url !== "/api/contact") {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  let rawBody = "";

  request.on("data", (chunk) => {
    rawBody += chunk;
  });

  request.on("end", async () => {
    try {
      const {
        name,
        email,
        phoneNumber,
        selectedGoal,
        selectedAgeGroup,
        source,
      } = JSON.parse(rawBody);

      if (!name || !email || !phoneNumber) {
        sendJson(response, 400, { error: "Alle felt må fylles ut." });
        return;
      }

      if (!resend || !contactRecipient) {
        sendJson(response, 500, { error: "E-postserver er ikke konfigurert." });
        return;
      }

      const safeName = escapeHtml(String(name));
      const safeEmail = escapeHtml(String(email));
      const safePhoneNumber = escapeHtml(String(phoneNumber));
      const safeGoal = selectedGoal ? escapeHtml(String(selectedGoal)) : null;
      const safeAgeGroup = selectedAgeGroup ? escapeHtml(String(selectedAgeGroup)) : null;
      const safeSource = source ? escapeHtml(String(source)) : "kontaktform";

      const { error } = await resend.emails.send({
        from: `JK Coaching <${contactFrom}>`,
        to: [contactRecipient],
        replyTo: email,
        subject: "Ny kontaktforesporsel fra nettsiden",
        html: `
          <h1>Ny kontaktforesporsel</h1>
          <p><strong>Kilde:</strong> ${safeSource}</p>
          <p><strong>Navn:</strong> ${safeName}</p>
          <p><strong>E-post:</strong> ${safeEmail}</p>
          <p><strong>Telefon:</strong> ${safePhoneNumber}</p>
          ${safeGoal ? `<p><strong>Mål:</strong> ${safeGoal}</p>` : ""}
          ${safeAgeGroup ? `<p><strong>Aldersgruppe:</strong> ${safeAgeGroup}</p>` : ""}
        `,
      });

      if (error) {
        sendJson(response, 500, { error: "Kunne ikke sende e-post." });
        return;
      }

      sendJson(response, 200, { ok: true });
    } catch {
      sendJson(response, 400, { error: "Ugyldig forespørsel." });
    }
  });
});

server.listen(port, () => {
  console.log(`Contact server listening on http://localhost:${port}`);
});
