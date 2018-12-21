const schema = {
  settings: require('./settings')(),
  mappings: {
    _doc: require('./mappings/document')
  }
};

module.exports = schema;
