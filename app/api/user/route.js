import db from "@/db/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();

    const existingUser = await db.user.findFirst({
      where: {
        username: body.username,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { name: "User already exists", status: false },
        { status: 409 }
      );
    }

    const users = await db.user.findMany();

    const data = {
      username: body.username,
      email: body.email,
    };

    if (users.length === 0) {
      data.role = "admin";
    }

    const password = await hash(body.password, 10);

    data.password = password;

    const user = await db.user.create({
      data,
    });

    return NextResponse.json(
      { name: "John Doe", status: true },
      { status: 201 }
    );
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { name: "Internal Server Error", status: false },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await db.tag.deleteMany();
    await db.quote.deleteMany();
    await db.author.deleteMany();

    return NextResponse.json(
      { name: "John Doe", status: true },
      { status: 201 }
    );

  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { name: "Internal Server Error", status: false },
      { status: 500 }
    );
  }
}
