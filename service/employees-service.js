"use strict";

const PathMaker = require("../util/PathMaker");

const EmployeesService = function (metrc) {
  const _metrc = metrc;
  const pathMaker = new PathMaker("/employees/v2/");

  const endpoint = (ending) => {
    return pathMaker.endpoint(ending);
  };

  const employees = () => {
    return _metrc.get(endpoint(''));
  };

  return {
    employees: employees,
  };
};

module.exports = EmployeesService;
