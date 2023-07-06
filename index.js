const express = require("express");
const mariadb = require("mariadb");
const app = express();

app.listen("18000", () => console.log("Listening at 18000"));
app.use(express.static("Public"));
app.use(express.json({ limit: "1mb" }));

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user:'root',
    password: 'Qweweqwe123',
    connectionLimit: 5,
    database: 'test_database',
});

function database_insert(query) {
    pool.getConnection().then(connection => {
        connection.query(query);
        connection.end();
        console.log("Insert to DB");
    }).catch(err => { 
        res.send(err);
    });
}

function database_find(query, response) {
    pool.getConnection().then(connection => {
        connection.query(query).then(data => {
            connection.end();
            response.send(JSON.stringify(data));
            console.log("Fetch from DB");
        })
    }).catch(err => { 
        res.send(err);
    });
}

app.post("/api/user-data", (request, response) => {
    const data = request.body;
    database_insert(`INSERT INTO users VALUES ('${data.name}', ${data.mobile}, '${data.email}');`);
    response.json({
        status: "Success",
        name: data.name,
        mobile: data.mobile,
        email: data.email
    });
    response.end();
});

app.get("/api/user-data", (request, response) => {
    database_find("SELECT * FROM users;", response);
});