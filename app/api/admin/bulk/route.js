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
      if (!body || !Array.isArray(body)) {
        return NextResponse.json(
          { name: "Body is required", status: false },
          { status: 400 }
        );
      }
    } catch (err) {
      return NextResponse.json(
        { name: "Body is required", status: false },
        { status: 400 }
      );
    }

    body = body.map((data) => {
      data[0] = data[0]?.trim();
      data[1] = data[1]?.trim();
      data[2] = data[2]?.trim();
      data[1] = data[1]?.slice(0, 1).toUpperCase() + data[1]?.slice(1);
      return data;
    });

    let newTags = body.map((data) => {
      return data[2]?.split(",");
    });

    newTags = newTags.flat();

    newTags = newTags.map((tag) => {
      let output = tag?.trim();
      if (output) {
        output = output.slice(0, 1).toUpperCase() + output.slice(1);
      }
      return output;
    });

    newTags = newTags.filter((tag) => {
      return tag;
    });

    let newAuthors = body.map((data) => {
      return data[1];
    });
    
    newAuthors = newAuthors.map((author) => {
      if(typeof author !== 'string') return 
      let output = author?.trim();
      if (output) {
        output = output.slice(0, 1).toUpperCase() + output.slice(1);
      }
      return output;
    });

    newAuthors = newAuthors.filter((author) => {
      return author;
    });

    const existingTags = await db.tag.findMany({});
    const existingAuthors = await db.author.findMany({});

    newTags = newTags.filter((tag) => {
      return !existingTags?.some((t) => t?.name === tag);
    });

    newAuthors = newAuthors.filter((author) => {
      return !existingAuthors?.some((a) => a?.name === author);
    });

    newTags = Array.from(new Set(newTags));
    newAuthors = Array.from(new Set(newAuthors));

    if (newTags.length) {
      const createdTags = await db.tag.createMany({
        data: newTags.map((tag) => {
          return {
            name: tag,
          };
        }),
      });
    }

    if (newAuthors.length) {
      const createdAuthors = await db.author.createMany({
        data: newAuthors.map((author) => {
          return {
            name: author,
          };
        }),
      });
    }

    const latestTags = await db.tag.findMany({});
    const latestAuthors = await db.author.findMany({});

    const quoteData = [];
    const tagData = {};

    body.forEach((data, index) => {
      if (!data[0] || !data[1]) {
        return;
      }

      quoteData.push({
        quote: data[0],
        authorId: latestAuthors.find((author) => author.name === data[1])?.id,
      });

      if (!data[2]) return;

      let tags = data[2].split(",");
      tags = tags.map((tag) => {
        let output = tag?.trim();
        if (output) {
          output = output.slice(0, 1).toUpperCase() + output.slice(1);
        }
        return output;
      });

      tagData[index] = latestTags.filter((tag) => {
        return tags.includes(tag?.name);
      });
    });

    for (let i = 0; i < quoteData.length; i++) {
      const createdQuote = await db.quote.create({
        data: quoteData[i],
      });

      if (tagData[i]) {
        await db.quote.update({
          where: {
            id: createdQuote.id,
          },
          data: {
            tags: {
              connect: tagData[i].map((tag) => ({ id: tag.id })),
            },
          },
        });
      }
    }

    return NextResponse.json(
      { name: "Bulk created successfully", status: true },
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
