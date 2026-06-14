import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const contactRecipient = process.env.CONTACT_TO_EMAIL;
const contactFrom = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const {
      name,
      email,
      phoneNumber,
      selectedGoal,
      selectedAgeGroup,
      source,
    } = request.body ?? {};

    if (!name || !email || !phoneNumber) {
      response.status(400).json({ error: "Alle felt må fylles ut." });
      return;
    }

    if (!resend || !contactRecipient) {
      response.status(500).json({ error: "E-postserver er ikke konfigurert." });
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
      response.status(500).json({ error: "Kunne ikke sende e-post." });
      return;
    }

    response.status(200).json({ ok: true });
  } catch {
    response.status(400).json({ error: "Ugyldig forespørsel." });
  }
}
