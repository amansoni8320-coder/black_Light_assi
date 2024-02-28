import mysql from 'mysql2';

// Function to create and return the MySQL database connection
function connectToDatabase() {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    // Log a message when the connection is established
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return;
        }
        console.log('Connected to the database successfully');
    });

    return db; // Return the database connection object
}

export default connectToDatabase;
