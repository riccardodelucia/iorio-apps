import { extent } from "d3";

export const dataExtent = (data) => {
  const dist = data.map((item) => Object.values(item.dist)).flat();
  const outliers = data
    .map((item) => item.outliers)
    .flat()
    .map((item) => item.value)
    .concat();
  return extent(outliers.concat(dist));
};
