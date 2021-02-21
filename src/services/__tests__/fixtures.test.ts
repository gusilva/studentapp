import * as R from "ramda";
import Fixture from "../fixture";
import Api from "../api";

test("All fixtures map to actual api", () => {
  const fixturesKeys = R.keys(Fixture).sort();
  const apiKeys = R.keys(Api.createApi()).sort();

  const intersection = R.intersection(fixturesKeys, apiKeys).sort();

  expect(R.equals(fixturesKeys, intersection)).toBe(true);
  expect(R.equals(apiKeys, intersection)).toBe(true);
});
