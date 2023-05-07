import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('BKSPORT.db');

const SportSchedRepo = {
  getSportSchedByUserID: (val) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM sport_schedule WHERE uid = ?',
          [val],
          (_, result) => {
            resolve(result.rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  craeteSportSched: (name, category, date_time, start_time, uid, duration) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO sport_schedule (name, category, date_time, start_time, uid, admin_id, duration) VALUES (?, ?, ?, ?, ?, 1, ?)',
          [name, category, date_time, start_time, uid, duration],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

};

export default SportSchedRepo;