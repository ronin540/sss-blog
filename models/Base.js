const query = require("../db/index");

module.exports = class Base {
  constructor(table) {
    this.table = table;
  }
  async create(attributes) {
    const data = await query(`INSERT INTO ?? SET ?`, [this.table, attributes]);
    return data;
  }

  async getOneBy(filters) {
    const parameters = [this.table, filters];
    const sqlQuery = `SELECT * FROM ?? WHERE ?`;
    const data = await query(sqlQuery, parameters);
    return data;
  }

  async update(updateData, filters) {
    const parameters = [this.table, updateData, filters];
    const sqlQuery = `UPDATE ?? SET ? WHERE ?`;
    const update = await query(sqlQuery, parameters);
    return update;
  }

  async getAll() {
    const parameters = this.table;
    const sqlQuery = `SELECT * FROM ??`;
    const allData = await query(sqlQuery, parameters);
    return allData;
  }
};
