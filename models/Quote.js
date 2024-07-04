import { DataTypes } from "sequelize";
import sequelize from "@/db/sequelize"; // Import your Sequelize instance

const QuoteModel = sequelize.define("Quote", {
  quote: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: true,
    defaultValue: [], 
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue:0
  }
});

export default QuoteModel;
