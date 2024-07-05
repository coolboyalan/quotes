import sequelize from "@/db/sequelize";
import UserModel from "./User";
import QuoteModel from "./Quote";

const likedQuote = sequelize.define("likedQuote", {
  // Additional fields for the join table if needed
});

UserModel.belongsToMany(QuoteModel, {
  through: likedQuote,
  as: "likedQuotes",
  foreignKey: "userId",
  otherKey: "quoteId",
});

QuoteModel.belongsToMany(UserModel, {
  through: likedQuote,
  as: "likers",
  foreignKey: "quoteId",
  otherKey: "userId",
});

await sequelize.sync({});

export { UserModel, QuoteModel, likedQuote };
