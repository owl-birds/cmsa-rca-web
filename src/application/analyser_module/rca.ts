import { Decimal } from "decimal.js";
import {
  findColRow,
  growthRate,
  findRow2Col,
  findColDataArr,
  sumBased2Col,
  uniqueColNames,
  uniqueCols,
  findTotalExportCol,
  totalExportPerYear,
} from "./helpers";

export const total_col_export_year = (
  data: { [index: string]: any }[],
  unique_years: string[] | number[],
  col_indicator: string = "commodity",
  total_indicator: string = "total"
) => {
  //
  const total_result: {
    [col_indicator_instance: string]: { [index: string]: any };
  } = {};

  for (let row of data) {
    if (!total_result[row[col_indicator]]) {
      //
      total_result[row[col_indicator]] = {};
      for (let year of unique_years) {
        total_result[row[col_indicator]][year] = row[year];
      }
      continue;
    }
    for (let year of unique_years) {
      total_result[row[col_indicator]][year] += row[year];
    }
  }

  // finding if the total row exist in our data
  let is_total_exist: boolean = false;
  for (let row of data) {
    if (row[col_indicator] === total_indicator) {
      if (!total_result[total_indicator]) total_result[total_indicator] = {};
      for (let year of unique_years) {
        total_result[total_indicator][year] = row[year];
      }
      is_total_exist = true;
    }
  }
  if (!is_total_exist) {
    for (let row of data) {
      if (!total_result[total_indicator]) {
        total_result[total_indicator] = {};
        for (let year of unique_years) {
          total_result[total_indicator][year] = row[year];
        }
        continue;
      }
      for (let year of unique_years) {
        total_result[total_indicator][year] += row[year];
      }
    }
  }
  // finding if the total row exist in our data

  return total_result;
};

export const rca_basic = (
  country_commodity_export: number,
  world_commodity_export: number,
  total_country_export: number,
  total_world_export: number
): Decimal => {
  const upper = new Decimal(country_commodity_export).div(
    world_commodity_export
  );
  const lower = new Decimal(total_country_export).div(total_world_export);
  return upper.div(lower);
};
// console.log(rca_basic(123.7263624, 10000, 371.4100738, 558777));
