import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('BKSPORT.db');

const PumpSchedRepo = {
  getAllPumpSched: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM pump_schedule',
          [],
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

  createPumpSched: (name, start_time, duration, admin_id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO pump_schedule (name, start_time, duration, admin_id) VALUES (?, ?, ?, ?)',
          [name, start_time, duration, admin_id],
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

export default PumpSchedRepo;