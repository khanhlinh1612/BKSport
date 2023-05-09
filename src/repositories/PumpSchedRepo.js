import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('BKSPORT.db');

const PumpSchedRepo = {
  getPumpSchedByAdminID: (val) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM sport_schedule WHERE admin_id = ?',
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

};

export default PumpSchedRepo;