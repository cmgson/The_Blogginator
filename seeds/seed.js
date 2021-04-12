const sequelize = require("../config/connection");
const { User, Journal } = require('../models');

const userData = require('./userData.json');
const journalData = require('./journal.json');


const seedDatabase = async () => {
    await sequelize.sync ({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const journal = await Journal.bulkCreate(journalData, {
        returning: true
    });

    process.exit(0);
};

seedDatabase();