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

  getAllSportSched: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM sport_schedule',
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

  createSportSched: (name, category, date_time, start_time, uid, duration) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO sport_schedule (name, category, date_time, start_time, uid, admin_id, duration) VALUES (?, ?, ?, ?, ?, NULL, ?)',
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

  createSuggestionSportSched: (name, category, date_time, start_time, uid, admin_id, duration) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO sport_schedule (name, category, date_time, start_time, uid, admin_id, duration) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, category, date_time, start_time, uid, admin_id, duration],
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

  getSportSchedByID: (val) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM sport_schedule WHERE id = ?',
          [val],
          (_, result) => {
            resolve(result.rows._array[0]);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  updateSportSchedByID: (feedback_title, feedback_exp, feedback_date_time, feedback_comment, id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE sport_schedule SET feedback_title = ?, feedback_exp = ?, feedback_date_time = ?, feedback_comment = ? WHERE id = ?',
          [feedback_title, feedback_exp, feedback_date_time, feedback_comment, id],
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

  updateSportSchedByAdminID: (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE sport_schedule SET admin_id = NULL WHERE id = ?',
          [id],
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

  deleteSportSchedByID: (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM sport_schedule WHERE id = ?',
          [id],
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

  updateVerificationByID: (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE sport_schedule SET verification = 1 WHERE id = ?',
          [id],
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

  updateNotVerificationByID: (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE sport_schedule SET verification = 0 WHERE id = ?',
          [id],
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