export function sortPhones({ data, sortBy }) {
  if (sortBy === "default") {
    return data.sort((a, b) => {
      return a.sort_order - b.sort_order;
    });
  }

  if (sortBy === "new") {
    return data.sort((a, b) => {
      return new Date(b.release_date) - new Date(a.release_date);
    });
  }

  // Not sure what "Actie" means in Dutch, I couldn't find out the logic behind it - based on what it sorts?!
  // I added promotion for test
  return data
    .filter((item) => {
      return item.has_promotion;
    })
    .sort((a, b) => {
      return a.sort_order - b.sort_order;
    });
}

function filterByManufacturer({ data, manufacturer }) {
  if (!manufacturer?.length) {
    return data;
  }

  return data.filter((item) => {
    return !!manufacturer.find((manufacturerItem) => {
      return item.manufacturer.includes(manufacturerItem);
    });
  });
}

function filterByColor({ data, color }) {
  if (!color?.length) {
    return data;
  }

  return data.filter((item) => {
    return !!color.find((colorItem) => {
      return item.colors.includes(colorItem);
    });
  });
}

function filterByOperatingSystem({ data, operatingSystem }) {
  if (!operatingSystem?.length) {
    return data;
  }

  return data.filter((item) => {
    return !!operatingSystem.find((operatingSystem) => {
      return item.operating_system === operatingSystem;
    });
  });
}

function filterByBoolean({ data, filterKeyName, filterValue }) {
  if (!filterValue?.length || filterValue?.length === 2) {
    return data;
  }

  return data.filter((item) => {
    return filterValue.includes(item[filterKeyName]);
  });
}

export function getFilteredPhones({ data, filters }) {
  const { manufacturer, color, network, operatingSystem, refurbished, esim } =
    filters;

  const filteredDataByManufacturer = filterByManufacturer({
    data,
    manufacturer,
  });
  const filteredDataByColor = filterByColor({
    data: filteredDataByManufacturer,
    color,
  });
  const filteredDataByOperatingSystem = filterByOperatingSystem({
    data: filteredDataByColor,
    operatingSystem,
  });
  const filteredDataByNetwork = filterByBoolean({
    data: filteredDataByOperatingSystem,
    filterValue: network,
    filterKeyName: "has_5g",
  });
  const filteredDataByRefurbished = filterByBoolean({
    data: filteredDataByNetwork,
    filterValue: refurbished,
    filterKeyName: "refurbished",
  });
  const filteredDataByEsim = filterByBoolean({
    data: filteredDataByRefurbished,
    filterValue: esim,
    filterKeyName: "has_esim",
  });

  return filteredDataByEsim;
}
