const Database = require('better-sqlite3');

// ใช้ไฟล์ชื่อ database.db
const db = new Database('./db/database.db');

// สร้างตารางถ้ายังไม่มี
db.exec(`
CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic TEXT,
    value REAL,
    time TEXT
)
`);

function insertData(topic, value, time) {
    const stmt = db.prepare('INSERT INTO sensor_data (topic, value, time) VALUES (?, ?, ?)');
    stmt.run(topic, value, time);
}

function getHistory(limit = 100) {
    const stmt = db.prepare('SELECT topic, value, time FROM sensor_data ORDER BY id DESC LIMIT ?');
    return stmt.all(limit).reverse();
}

module.exports = {
    insertData,
    getHistory
};
