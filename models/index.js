const User = require('./User');
const Journal = require('./Journal');
const Comments = require('./Comments')

User.hasMany(Journal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comments, {
  foreignKey: 'user_id'
});

Journal.belongsTo(User, {
  foreignKey: 'user_id'
});

Journal.

module.exports = { User, Journal };