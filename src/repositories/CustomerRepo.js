import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('BKSPORT.db');

const CustomerRepo = {
  getAllCustomer: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM customer',
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

  createCustomer: (name, phone_number, password, email) => {
    return new Promise((resolve, reject) => {
      var avatar = "https://images.pexels.com/photos/15086545/pexels-photo-15086545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO customer (name, phone_number, password, email, avatar) VALUES (?, ?, ?, ?, ?)',
          [name, phone_number, password, email, avatar],
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

  getCustomerByID: (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM customer WHERE id=?',
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

  updateCustomer: (name, phone_number, password, email, id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE customer SET name = ?, phone_number = ?, password = ?, email = ? WHERE id = ?',
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

export default CustomerRepo;