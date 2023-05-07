import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('BKSPORT.db');

const AdminRepo = {
  getAllAdmin: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM admin',
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

  getAdminByID: (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM admin WHERE id=?',
          [id],
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

  updateAdmin: (name, phone_number, password, email, id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE admin SET name = ?, phone_number = ?, password = ?, email = ? WHERE id = ?',
          [name, phone_number, password, email, id],
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

export default AdminRepo;