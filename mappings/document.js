const admin = require('./partial/admin');
const postalcode = require('./partial/postalcode');
const hash = require('./partial/hash');
const multiplier = require('./partial/multiplier');
const literal = require('./partial/literal');
const literal_with_doc_values = require('./partial/literal_with_doc_values');

const schema = {
  properties: {

    // data partitioning
    source: literal_with_doc_values,
    layer: literal_with_doc_values,

    // place name (ngram analysis)
    name: hash,

    // place name (phrase analysis)
    phrase: hash,

    // address data
    address_parts: {
      type: 'object',
      dynamic: true,
      properties: {
        name: {
          type: 'keyword'
        },
        unit: {
          type: 'text',
          analyzer: 'peliasUnit',
        },
        number: {
          type: 'text',
          analyzer: 'peliasHousenumber',
        },
        street: {
          type: 'text',
          analyzer: 'peliasStreet',
        },
        zip: {
          type: 'text',
          analyzer: 'peliasZip',
        }
      }
    },

    // hierarchy
    parent: {
      type: 'object',
      dynamic: true,
      properties: {
        // https://github.com/whosonfirst/whosonfirst-placetypes#continent
        continent: admin,
        continent_a: admin,
        continent_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#ocean
        ocean: admin,
        ocean_a: admin,
        ocean_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#empire
        empire: admin,
        empire_a: admin,
        empire_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#country
        country: admin,
        country_a: admin,
        country_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#dependency
        dependency: admin,
        dependency_a: admin,
        dependency_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#marinearea
        marinearea: admin,
        marinearea_a: admin,
        marinearea_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#macroregion
        macroregion: admin,
        macroregion_a: admin,
        macroregion_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#region
        region: admin,
        region_a: admin,
        region_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#macrocounty
        macrocounty: admin,
        macrocounty_a: admin,
        macrocounty_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#county
        county: admin,
        county_a: admin,
        county_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#locality
        locality: admin,
        locality_a: admin,
        locality_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#borough
        borough: admin,
        borough_a: admin,
        borough_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#localadmin
        localadmin: admin,
        localadmin_a: admin,
        localadmin_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#neighbourhood
        neighbourhood: admin,
        neighbourhood_a: admin,
        neighbourhood_id: literal,

        // https://github.com/whosonfirst/whosonfirst-placetypes#postalcode
        postalcode: postalcode,
        postalcode_a: postalcode,
        postalcode_id: literal
      }
    },

    // geography
    center_point: require('./partial/centroid'),
    shape: require('./partial/shape'),
    bounding_box: require('./partial/boundingbox'),

    // meta info
    source_id: literal,
    category: literal,
    population: multiplier,
    popularity: multiplier
  },
  dynamic_templates: [{
    nameGram: {
      path_match: 'name.*',
      match_mapping_type: 'string',
      mapping: {
        type: 'text',
        analyzer: 'peliasIndexOneEdgeGram'
      }
    },
  }, {
    phrase: {
      path_match: 'phrase.*',
      match_mapping_type: 'string',
      mapping: {
        type: 'text',
        analyzer: 'peliasPhrase'
      }
    }
  }],
  _source: {
    excludes: ['shape', 'phrase']
  },
  _all: {
    enabled: false
  },
  dynamic: true
};

module.exports = schema;
