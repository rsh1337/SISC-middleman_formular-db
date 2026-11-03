import { Sequelize, DataTypes } from "sequelize";

export const db = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    logging: false,
});

export const Inscriere = db.define("inscriere", {
    nume: { type: DataTypes.STRING, allowNull: false },
    telefon: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    numeEchipa: { type: DataTypes.STRING, allowNull: false },
    nrParticipanti: { type: DataTypes.INTEGER, allowNull: false },
    membri: { type: DataTypes.STRING },
    interval: { type: DataTypes.STRING, allowNull: false },
    legatOchi: { type: DataTypes.BOOLEAN, allowNull: false },
    sacrificiu: { type: DataTypes.STRING },
}, {
    freezeTableName: true,
});
