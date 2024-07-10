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

    const existingTag = await db.tag.findFirst({
      where: {
        name: body.name,
      },
    });

    if (existingTag) {
      return NextResponse.json(
        { name: "Tag already exists", status: false },
        { status: 409 }
      );
    }

    const tag = await db.tag.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(
      { name: "Tag created successfully", status: true },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { name: "Something went wrong", status: false },
      { status: 500 }
    );
  }
}
