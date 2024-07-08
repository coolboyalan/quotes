import db from "@/db/db";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { name: "Unauthorized", status: false },
        { status: 401 }
      );
    }

    const body = await request.json();
    let { id } = body;
    id = parseInt(id);
    const user = await db.user.findUnique({
      where: {
        id: parseInt(session.user.id),
      },
      include: {
        likedQuotes: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { name: "User not found", status: false },
        { status: 404 }
      );
    }

    if (body.add) {
      const updatedUser = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          likedQuotes: {
            connect: {
              id,
            },
          },
        },
      });
    } else {
      const updatedUser = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          likedQuotes: {
            disconnect: {
              id,
            },
          },
        },
      });
    }

    return NextResponse.json(
      { name: "Liked Quotes updated successfully", status: true },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { name: "Something went wrong", status: false },
      { status: 500 }
    );
  }
}
