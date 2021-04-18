export function filtersStringToEntriesArray(filters) {
  if (!filters) return [];
  return decodeURIComponent(filters).split('|').map((filter) => filter.split(':'));
}

export function entriesArrayToFiltersString(entriesArray) {
  return entriesArray.map(([filterName, filterValue]) => `${filterName}:${filterValue}`).join('|');
}

export function getShareableFilters(filters, nonShareableFilters = []) {
  const entriesArray = filtersStringToEntriesArray(filters);
  const nonShareableEntriesArray = entriesArray
    .filter(([filterName]) => !nonShareableFilters.includes(filterName));
  return entriesArrayToFiltersString(nonShareableEntriesArray);
}

export function filtersStringToIndexFilter(filters) {
  return filtersStringToEntriesArray(filters)
    .reduce((index, [key, value]) => ({
      ...index,
      [key]: value
    }), {});
}

export function indexFilterToFiltersString(index) {
  return entriesArrayToFiltersString(Object.entries(index));
}

export function mergeFilters(baseFilters, newFilters) {
  const baseIndexFilters = filtersStringToIndexFilter(baseFilters);
  const newIndexFilters = filtersStringToIndexFilter(newFilters);
  const mergedIndexFilters = {
    ...baseIndexFilters,
    ...newIndexFilters
  };
  return indexFilterToFiltersString(mergedIndexFilters);
}
