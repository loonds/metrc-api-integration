const _ = require("lodash");

const convertToJson = function (results) {
  if (typeof results === "object") {
    return results;
  }
  if (typeof results === "string") {
    return JSON.parse(results);
  }
};

exports.render = function (results) {
  let objects = convertToJson(results);

  if (_.isArray(objects)) {
    const sorted = _.sortBy(objects, ["Label"]);
    return sorted;
  }

  return objects;
};
