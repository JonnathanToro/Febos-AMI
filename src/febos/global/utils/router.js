export function updateSearchParams(searchParams = {}) {
  const newUrl = new URL(window.location);
  Object.entries(searchParams).forEach(([paramKey, paramValue]) => {
    newUrl.searchParams.set(paramKey, paramValue);
  });
  window.history.pushState({ path: newUrl.toString() }, document.title, newUrl.toString());
}

export function removeSearchParams(params = []) {
  const newUrl = new URL(window.location);
  params.forEach((param) => {
    newUrl.searchParams.delete(param);
  });
  window.history.pushState({ path: newUrl.toString() }, document.title, newUrl.toString());
}
