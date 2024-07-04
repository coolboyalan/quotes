import sequelize from "@/db/sequelize";
import UserModel from "./User";
import QuoteModel from "./Quote";

const LikedQuote = sequelize.define("LikedQuote", {
  // Additional fields for the join table if needed
});

UserModel.belongsToMany(QuoteModel, {
  through: LikedQuote,
  as: "likedQuotes",
  foreignKey: "userId",
  otherKey: "quoteId",
});

QuoteModel.belongsToMany(UserModel, {
  through: LikedQuote,
  as: "likers",
  foreignKey: "quoteId",
  otherKey: "userId",
});

await sequelize.sync({ alter: true });

export { UserModel, QuoteModel, LikedQuote };
