//import axios from 'axios';

const pg = require('pg');

const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
}
const connection = new pg.Pool(connectionData);

function insertNewExample(value, callback) {
    connection.connect().then(connection => {
        let response = {
            db_connection_error: false,
            db_insert_error: false
        }

        let sql_query = "";
        sql_query += "INSERT INTO Example VALUES ($1, $2)";
        let id = value.id;
        let name = value.name;
        let values = [id, name]

        connection.query(sql_query, values)
            .then(temp_response => {
                console.log(temp_response)
                connection.release();
                callback(response);
            }
            ).catch(err => {
                console.log("DB insert error");
                response.db_insert_error = true;
                connection.release();
                callback(response);
            })


    }

    ).catch(err => {
        console.log("DB error");
        connection.release();
        response.db_connection_error = true;
        callback(response);
    });

}

function getAllExample(value, callback) {
    console.log("Testing my get");
    connection.connect().then(connection => {
        let response = {
            db_connection_error: false,
            db_insert_error: false,
            query_result: []
        }

        let sql_query = "";
        sql_query += "SELECT * FROM Example";

        connection.query(sql_query)
            .then(temp_response => {
                console.log(temp_response)
                response.query_result = temp_response.rows;
                connection.release();
                callback(response);
            }
            ).catch(err => {
                console.log("DB get all error");
                response.db_insert_error = true;
                connection.release();
                callback(response);
            })


    }

    ).catch(err => {
        console.log("DB error");
        connection.release();
        response.db_connection_error = true;
        callback(response);
    });

}

function getStats(value, callback) {
    let response = {
        words: "",
        lines: ""
    }
    let lyrics = value.lyrics;
    console.log("testing")
    let wordCount = lyrics.match(/(\w+)/g).length;
    let linesCount = lyrics.split(/\r\n|\r|\n/).length;
    response.words = wordCount;
    response.lines = linesCount;

    callback(response);
}

function translate(value, callback) {
    let response = {
        translation: ""
    }

    const headers = {
        Authorization: "a_ItVQVpy8n2JpN7SO382k7W0vMPV3O27WE9QQ0PXkAAAPDX9HEHRS5VJmcPuOPGzZoH2U0PglLUVbv2W0"
    }

    let data = {
        "from": "en_GB",
        "to": "es_CO",
        "data": "Welcome Developers",
        "platform": "api"
    }

    axios.post('https://api-b2b.backenster.com/b1/api/v3/translate', data, { headers: headers })
        .then(res => {
            console.log(res);
            console.log(res.data);

            callback(response);
        });

}

module.exports.insertNewExample = insertNewExample;
module.exports.getAllExample = getAllExample;
module.exports.getStats = getStats;
module.exports.translate = translate;