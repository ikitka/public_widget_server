const Datastore = require('nedb');
const db = new Datastore({ filename: './projects.db', autoload: true });

class ProjectModel {
  static insert(data) {
    return new Promise((resolve, reject) => {
      db.insert(data, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      });
    });
  }

  static find(query = {}) {
    return new Promise((resolve, reject) => {
      db.find(query, (err, docs) => {
        if (err) reject(err);
        resolve(docs);
      });
    });
  }

  static findOne(query) {
    return new Promise((resolve, reject) => {
      db.findOne(query, (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  static update(query, updateData) {
    return new Promise((resolve, reject) => {
      db.update(query, updateData, {}, (err, numReplaced) => {
        if (err) reject(err);
        resolve(numReplaced);
      });
    });
  }

  static remove(query) {
    return new Promise((resolve, reject) => {
      db.remove(query, {}, (err, numRemoved) => {
        if (err) reject(err);
        resolve(numRemoved);
      });
    });
  }
}

module.exports = ProjectModel;
