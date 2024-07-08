import db from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request?.json();
    } catch (err) {
      return NextResponse.json(
        { name: "Body is required", status: false },
        { status: 400 }
      );
    }

    if (!body?.name) {
      return NextResponse.json(
        { name: "Name is required", status: false },
        { status: 400 }
      );
    }

    if (body?.name?.length < 3) {
      return NextResponse.json(
        { name: "Name must be at least 3 characters", status: false },
        { status: 400 }
      );
    }

    const existingAuthor = await db.author.findFirst({
      where: {
        name: body.name,
      },
    });

    if (existingAuthor) {
      return NextResponse.json(
        { name: "Author already exists", status: false },
        { status: 409 }
      );
    }

    const newAuthor = await db.author.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(
      { name: "Author created successfully", status: true },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { name: "Internal server error", status: false },
      { status: 500 }
    );
  }
}
