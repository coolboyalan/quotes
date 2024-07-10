'use server'

import db from "@/db/db";
import { revalidatePath } from "next/cache";


export const deleteQuote = async (quoteId) => {
  "use server";
  console.log(123);
  await db.quote.delete({
    where: {
      id: parseInt(quoteId),
    },
  });
  revalidatePath("/admin");
};
