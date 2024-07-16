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

    const newtags = [...new Set(body.flatMap((ele) => ele[2]?.split(",")))];
    const existingTags = await db.tag.findMany();
    const existingTagsArray = existingTags.map((tag) => tag.name);

    const allTags = newtags.filter((tag) => {
      if (!tag) return false;
      return !existingTagsArray.includes(tag);
    });
    try {
      if (allTags.length > 0) {
        await db.tag.createMany({
          data: allTags.map((tag) => ({ name: tag })),
        });
      }
    } catch (err) {
      await db.tag.delteMany({
        where: {
          name: {
            in: allTags,
          },
        },
      });
      return NextResponse.json(
        {
          name: "Something went wrong",
          status: false,
        },
        400
      );
    }

    const newAuthor = [...new Set(body.map((ele) => ele[1]))];
    const existingAuthors = await db.author.findMany();
    const existingAuthorsArray = existingAuthors.map((author) => author.name);

    const allAuthors = newAuthor.filter((author) => {
      if (!author) return false;
      return !existingAuthorsArray.includes(author);
    });

    try {
      if (allAuthors.length > 0) {
        await db.author.createMany({
          data: allAuthors.map((author) => ({ name: author })),
        });
      }
    } catch (err) {
      await db.author.delteMany({
        where: {
          name: {
            in: allAuthors,
          },
        },
      });
      return NextResponse.json(
        {
          name: "Something went wrong",
          status: false,
        },
        400
      );
    }

    const tagMap = existingTags.reduce((acc, tag) => {
      acc[tag.name] = tag.id;
      return acc;
    }, {});

    const authorMap = existingAuthors.reduce((acc, author) => {
      acc[author.name] = author.id;
      return acc;
    }, {});

    const quotesWithTags = [];

    let quotes = body.map((ele, index) => {
      if (!ele[2] || !ele[1]) return;

      let tags = new Set(ele[2]?.split(","));
      tags = [...tags].map((tag) => tag.trim());

      const temp = {
        quote: ele[0],
        authorId: authorMap[ele[1]],
        tags: {
          connect: tags.map((tag) => ({ id: tagMap[tag] })),
        },
      };

      quotesWithTags.push(temp);

      const quote = {
        quote: ele[0],
        authorId: authorMap[ele[1]],
      };

      return quote;
    });

    quotes = quotes.filter((ele) => ele);

    for (let i = 0; i < quotes.length; i++) {
      const quote = quotes[i];

      const output = await db.quote.create({
        data: quote,
      });

      await db.quote.update({
        where: {
          id: output.id,
        },
        data: {
          tags: quotesWithTags[i].tags,
        },
      });
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
