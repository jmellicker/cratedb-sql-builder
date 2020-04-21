import sqlBuilder from './sql/sql.builder';

module.exports = {
  buildSQL (request) {
    return `${sqlBuilder[request.method](request).replace(/\s\s+/g, ' ').trim()};`;
  },
};
