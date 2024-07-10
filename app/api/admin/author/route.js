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

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const createData = async () => {
//   try {
//     // Insert a User
//     const user = await prisma.user.create({
//       data: {
//         username: "example_username",
//         email: "example@example.com",
//         password: "example_password",
//         role: "regular",
//         likedQuotes: {
//           connect: [
//             { id: 1 }, // Replace with the ID of the quote you want to connect
//             { id: 2 }, // Replace with the ID of another quote you want to connect
//           ],
//         },
//       },
//     });

//     // Insert an Author
//     const author = await prisma.author.create({
//       data: {
//         name: "Example Author",
//         quotes: {
//           connect: [
//             { id: 1 }, // Replace with the ID of the quote you want to connect
//             { id: 2 }, // Replace with the ID of another quote you want to connect
//           ],
//         },
//       },
//     });

//     // Insert a Tag
//     const tag = await prisma.tag.create({
//       data: {
//         name: "Example Tag",
//         quotes: {
//           connect: [
//             { id: 1 }, // Replace with the ID of the quote you want to connect
//           ],
//         },
//       },
//     });

//     // Insert a Quote with a new Tag
//     const createdTag = await prisma.tag.create({
//       data: {
//         name: "New Tag Name",
//       },
//     });

//     const quote = await prisma.quote.create({
//       data: {
//         text: "Example quote text",
//         tags: {
//           connect: { id: createdTag.id },
//         },
//       },
//     });

//     console.log("Data created successfully");
//   } catch (error) {
//     console.error("Error creating data:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// createData();