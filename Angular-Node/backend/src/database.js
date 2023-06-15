import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'sujeet',
    password: 'sujeet123!',
    database: 'buy-and-sell',
});

export const db = {
    connect: () => connection.connect(),
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({ results, fields });
            })
        }),
    end: () => connection.end(),
}