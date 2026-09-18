import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      agencyName,
      country,
      licenseNumber,
      contactPerson,
      phone,
      whatsapp,
      email,
      passengerVolume = 0,
      requiredVisaQty = 0,
      ticketingReq = false,
      hotelReq = false,
      transportReq = false,
      message,
    } = body;

    if (!agencyName || !country || !licenseNumber || !contactPerson || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required agency registration fields.' },
        { status: 400 }
      );
    }

    const application = await db.b2BAgencyApplication.create({
      data: {
        agencyName: String(agencyName).trim(),
        country: String(country).trim(),
        licenseNumber: String(licenseNumber).trim(),
        contactPerson: String(contactPerson).trim(),
        phone: String(phone).trim(),
        whatsapp: whatsapp ? String(whatsapp).trim() : null,
        email: String(email).toLowerCase().trim(),
        passengerVolume: parseInt(String(passengerVolume)) || 0,
        requiredVisaQty: parseInt(String(requiredVisaQty)) || 0,
        ticketingReq: Boolean(ticketingReq),
        hotelReq: Boolean(hotelReq),
        transportReq: Boolean(transportReq),
        message: message ? String(message).trim() : null,
        status: 'NEW',
      },
    });

    // Create system notification for Umrah Manager
    await db.notification.create({
      data: {
        type: 'INQUIRY',
        title: `New B2B Agency Application: ${agencyName}`,
        message: `B2B Application from ${contactPerson} (${country}). Ref #${application.id.slice(0, 8)}`,
        link: `/en/admin/b2b-applications?id=${application.id}`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        referenceId: application.id,
        message: 'Your B2B agency application has been submitted successfully for verification.',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('B2B submission error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
