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

    const password = await hash(body.password, 10);

    const user = await db.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: password,
      },
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
    await db.user.deleteMany();
    await db.quote.deleteMany();
    await db.tag.deleteMany();
    await db.author.deleteMany();
    const users = await db.user.findMany();
    const quotes = await db.quote.findMany();
    const tags = await db.tag.findMany();
    const authors = await db.author.findMany();

    const response = {
      users,
      quotes,
      tags,
      authors,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { name: "Internal Server Error", status: false },
      { status: 500 }
    );
  }
}
