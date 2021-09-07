const Base = require('./Base');

class Blog extends Base {
    constructor() {
        super("blog"); // table name
      }
}


module.exports = Blog;