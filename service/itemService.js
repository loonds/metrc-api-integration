'use strict';

// const bulkHandler = require("./helpers/bulkHandler");
const PathMaker = require("../util/PathMaker");

const ItemService = function (metrc) {
  const _metrc = metrc;
  const pathMaker = new PathMaker("/items/v1/");

  const endpoint = (ending) => {
    return pathMaker.endpoint(ending);
  };

  const active = () => {
    return _metrc.get(endpoint("active"));
  };

  const categories = () => {
    return _metrc.get(endpoint("categories"));
  };

  return {
    active: active,
    categories: categories,
  };
};

module.exports = ItemService;
