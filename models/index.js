const User = require('./User');
const Journal = require('./Journal');

User.hasMany(Journal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Journal.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Journal };