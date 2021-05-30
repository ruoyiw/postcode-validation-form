// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from "react";
import "@testing-library/jest-dom";
import {
  render as rtlRender,
  queries,
  queryHelpers,
  buildQueries,
  within as rtlWithin,
  cleanup,
} from "@testing-library/react";

// https://testing-library.com/docs/react-testing-library/setup#add-custom-queries
const queryAllByDataCy = (...args) =>
  queryHelpers.queryAllByAttribute("data-cy", ...args);
const getMultipleError = (c, dataCyValue) =>
  `Found multiple elements with the data-cy attribute of: ${dataCyValue}`;
const getMissingError = (c, dataCyValue) =>
  `Unable to find an element with the data-cy attribute of: ${dataCyValue}`;
const [
  queryByDataCy,
  getAllByDataCy,
  getByDataCy,
  findAllByDataCy,
  findByDataCy,
] = buildQueries(queryAllByDataCy, getMultipleError, getMissingError);

export const render = (ui) => ({
  ...rtlRender(<>{ui}</>, {
    queries: {
      ...queries,
      queryByDataCy,
      queryAllByDataCy,
      getAllByDataCy,
      getByDataCy,
      findAllByDataCy,
      findByDataCy,
    },
  }),
  cleanup,
});

export const within = (element) =>
  rtlWithin(element, {
    ...queries,
    queryByDataCy,
    queryAllByDataCy,
    getAllByDataCy,
    getByDataCy,
    findAllByDataCy,
    findByDataCy,
  });

export const getLocalitiesAPI = (suburb, state) =>
  `http://localhost:8100/getLocalities?suburb=${suburb}&state=${state}`;
