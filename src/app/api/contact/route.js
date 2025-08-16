import { NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1401897149712568422/fnMZb-OHZJcZP4tKcmMPj21bwlJu9cWmvfyg9k1B05hUGE8QpGHKQ2R-sNiJcZYbkxi4";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, organization, services, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Kirim data ke Discord webhook
    const discordPayload = {
      embeds: [
        {
          title: "New Contact Submission",
          color: 5814783,
          fields: [
            { name: "Name", value: name, inline: false },
            { name: "Email", value: email, inline: false },
            { name: "Organization", value: organization || "-", inline: false },
            { name: "Services", value: services || "-", inline: false },
            { name: "Message", value: message, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    return NextResponse.json(
      { message: "Message sent and saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
