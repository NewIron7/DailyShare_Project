import sqlite from "sqlite3";

sqlite.verbose();

export const db = new sqlite.Database('dailyShare', (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }
    console.log("DB is working and is connected !")
    // db.all(`SELECT (username) FROM user`, (err, data) => {
    //     if (err) console.log(err);
    //     else console.log(data);
    // }); //affichage de tout les utilisateurs
});

