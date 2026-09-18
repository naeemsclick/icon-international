import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      source = 'PROJECT_APPLY',
      leadType = 'INVESTMENT',
      name,
      country,
      phone,
      whatsapp,
      email,
      interestedProjectId,
      proposedAmount,
      currency = 'SAR',
      paymentPreference,
      preferredMeetingTime,
      message,
    } = body;

    // Validate required fields
    if (!name || !country || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields (Name, Country, Phone, Email are required).' },
        { status: 400 }
      );
    }

    // Create CRM Lead record in PostgreSQL/Prisma
    const lead = await db.lead.create({
      data: {
        source,
        leadType,
        name: String(name).trim(),
        country: String(country).trim(),
        phone: String(phone).trim(),
        whatsapp: whatsapp ? String(whatsapp).trim() : null,
        email: String(email).toLowerCase().trim(),
        interestedProjectId: interestedProjectId || null,
        proposedAmount: proposedAmount ? parseFloat(proposedAmount) : null,
        currency,
        paymentPreference: paymentPreference || null,
        preferredMeetingTime: preferredMeetingTime || null,
        message: message ? String(message).trim() : null,
        status: 'NEW',
      },
    });

    // Create system notification for Admin/CRM Manager
    await db.notification.create({
      data: {
        type: 'INQUIRY',
        title: `New ${leadType} Inquiry: ${name}`,
        message: `New inquiry received from ${country} (${email}) for project/service. Reference #${lead.id.slice(0, 8)}`,
        link: `/en/admin/leads?id=${lead.id}`,
      },
    });

    // CRM Webhook integration trigger (non-blocking)
    if (process.env.CRM_WEBHOOK_URL) {
      fetch(process.env.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CRM-Key': process.env.CRM_API_KEY || '',
        },
        body: JSON.stringify(lead),
      }).catch((err) => console.error('CRM Webhook delivery failed:', err));
    }

    return NextResponse.json(
      {
        success: true,
        referenceId: lead.id,
        message: 'Your inquiry has been registered successfully. Our representative will contact you shortly.',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your inquiry.' },
      { status: 500 }
    );
  }
}
