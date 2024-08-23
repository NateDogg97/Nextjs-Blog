import { NextRequest, NextResponse } from 'next/server';
import { client } from "@/sanity/client";

interface WebhookPayload {
  ids: { created: string[]; updated: string[] };
}

export async function POST(req: NextRequest) {
  console.log('Webhook received!');   // Debugging

  try {
    const body = await req.json();
    const { ids }: WebhookPayload = body;

    // Combine created and updated IDs for processing
    const allIds = [...ids.created, ...ids.updated];

    const now = new Date().toISOString();

    // Update the 'updatedAt' field for each affected document
    const promises = allIds.map((id) =>
      client
        .patch(id)
        .set({ updatedAt: now })
        .commit()
    );

    await Promise.all(promises);

    return NextResponse.json({ message: 'Last edited date updated' });
  } catch (error) {
    console.error('Error updating last edited date:', error);
    return NextResponse.json({ error: 'Failed to update last edited date' }, { status: 500 });
  }
}
