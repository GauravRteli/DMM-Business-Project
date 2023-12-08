export const filterItems = (filterType, targetValue, items) => {
  var filteredItems = null;
  if (filterType === "brand") {
    filteredItems = items.filter((item) => item.brand === targetValue);
  } else {
    filteredItems = items.filter((item) => item.type === targetValue);
  }
  return filteredItems;
};
