import db from "@/db/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { name: "Unauthorized", status: false },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        id: parseInt(session.user.id),
      },
    });
    if (!user) {
      return NextResponse.json(
        { name: "User not found", status: false },
        { status: 404 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { name: "Unauthorized", status: false },
        { status: 401 }
      );
    }

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

    body.name =
      body.name.slice(0, 1).toUpperCase() + body.name.slice(1)

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
