import db from "@/db/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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

    const { tags } = body;

    const data = {
      quote: body.quote,
      authorId: body.author,
    };

    if (tags) {
      data.tags = {
        connect: tags.map((tag) => ({ id: parseInt(tag) })),
      };
    }

    const newQuote = await db.quote.create({
      data,
    });

    return NextResponse.json(
      { name: "Quote created successfully", status: true },
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

export async function PUT(request) {
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

    let exisingQuote = await db.quote.findUnique({
      where: {
        id: body.id,
      },
      include: {
        tags: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!exisingQuote) {
      return NextResponse.json(
        { name: "Quote not found", status: false },
        { status: 404 }
      );
    }
    const { id, authorId, tags } = body;

    const data = {
      quote: body.quote,
      authorId,
    };

    if (tags) {
      data.tags = {
        disconnect: exisingQuote.tags.map((tag) => ({ id: tag.id })),
        connect: tags.map((tag) => ({ id: parseInt(tag) })),
      };
    }

    const updatedQuote = await db.quote.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json(
      { name: "Quote updated successfully", status: true },
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
export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { name: "Unauthorized", status: false },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const id = parseInt(body.id);
    const quote = await db.quote.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      { name: "Quote deleted successfully", status: true },
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
