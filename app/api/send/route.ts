import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(4).max(200),
  message: z.string().trim().min(20).max(5000),
});

export async function POST(request: Request) {
  try {
    const recipientEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!process.env.RESEND_API_KEY || !recipientEmail || !fromEmail) {
      return Response.json(
        {
          error:
            'Email service is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.',
        },
        { status: 500 },
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          error: 'Invalid contact form submission.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = parsed.data;
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: email,
      subject: `Portfolio inquiry: ${subject}`,
      react: EmailTemplate({ name, email, subject, message }),
    });

    if (error) {
      return Response.json(
        { error: error.message ?? 'Failed to send email.' },
        { status: error.statusCode ?? 500 },
      );
    }

    return Response.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected server error.';
    return Response.json({ error: message }, { status: 500 });
  }
}
