'use server'

import db from "@/db/db";
import { revalidatePath } from "next/cache";


export const deleteQuote = async (quoteId) => {
  "use server";
  await db.quote.delete({
    where: {
      id: parseInt(quoteId),
    },
  });
  revalidatePath("/admin");
};
