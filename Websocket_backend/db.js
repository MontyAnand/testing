const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance and connect to the SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'example.db'  // This will create a file named example.db in the current directory
});

// Define a User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  // Other model options can go here
});

// Function to initialize the database and create tables
async function initializeDatabase() {
  try {
    // Sync all models with the database
    await sequelize.sync({ force: true });  // The 'force' option will drop the table if it already exists
    console.log('Database & tables created!');

    // Insert some initial data
    await User.create({ name: 'Alice', email: 'alice@example.com' });
    await User.create({ name: 'Bob', email: 'bob@example.com' });
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Function to query data
async function queryData() {
  try {
    const users = await User.findAll();
    console.log('All users:', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error querying data:', error);
  }
}

// Main function to run the setup
(async function() {
  await initializeDatabase();
  await queryData();

  // Close the database connection
  await sequelize.close();
})();
