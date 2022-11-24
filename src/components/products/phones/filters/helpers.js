import groupBy from "lodash/groupBy";

function getNoneRefurbishedPhones({ data }) {
  return data.filter((item) => {
    return !item.refurbished;
  });
}

export function getManufacturerOptions({ data }) {
  const filteredData = getNoneRefurbishedPhones({ data });
  return Object.entries(groupBy(filteredData, "manufacturer")).map(
    ([key, value]) => {
      return {
        label: `${key} (${value.length})`,
        value: key,
        length: value.length,
      };
    }
  );
}

export function getPhonesByColors({ data }) {
  return data.reduce((acc, item) => {
    item.colors.forEach((color) => {
      if (!acc[color]) {
        acc[color] = [];
      }

      acc[color].push(item);
    });

    return acc;
  }, {});
}

export function getColorOptions({ data }) {
  const filteredData = getNoneRefurbishedPhones({ data });
  const uniqColorsWithItems = getPhonesByColors({ data: filteredData });
  const colorOptions = Object.entries(uniqColorsWithItems)
    .map(([key, value]) => {
      const attributesWhichHasTheColor = value
        .sort((a, b) => {
          return a.sort_order - b.sort_order;
        })
        .map((item) => item.variants)
        .sort((a, b) => {
          return a.ui_suggested_sort_order - b.ui_suggested_sort_order;
        })
        .flat()
        .find((item) => {
          return item.attributes.color === key;
        });

      return {
        label: `${key} (${value.length})`,
        // I could use color name directly but some how the colors are different
        // value: attributesWhichHasTheColor.attributes.color_code,
        value: key,
        color: attributesWhichHasTheColor.attributes.color_code,
        length: value.length,
      };
    })
    .sort((a, b) => {
      return b.length - a.length;
    });

  return colorOptions;
}

export function getBooleanOptions({ data, groupByKey }) {
  const filteredData = getNoneRefurbishedPhones({ data });

  return Object.entries(groupBy(filteredData, groupByKey)).map(
    ([key, value]) => {
      const label = key === "true" ? "Yes" : "No";

      return {
        label: `${label} (${value.length})`,
        value: key === "true" ? true : false,
      };
    }
  );
}

export function getNetworkOptions({ data }) {
  return getBooleanOptions({ data, groupByKey: "has_5g" });
}

export function getOperatingSystemOptions({ data }) {
  const filteredData = getNoneRefurbishedPhones({ data });

  return Object.entries(groupBy(filteredData, "operating_system")).map(
    ([key, value]) => {
      return {
        label: `${key} (${value.length})`,
        value: key,
      };
    }
  );
}

export function getEsimOptions({ data }) {
  return getBooleanOptions({ data, groupByKey: "has_esim" });
}

export function getRefurbishedOptions({ data }) {
  return getBooleanOptions({ data, groupByKey: "refurbished" });
}
