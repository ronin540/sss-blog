const Base = require('./Base');

class User extends Base {
    constructor() {
        super("user"); // table name
      }
}


module.exports = User;