export function updateSearchParams(searchParams = {}) {
  const url = new URL(window.location);
  Object.entries(searchParams).forEach(([paramKey, paramValue]) => {
    url.searchParams.set(paramKey, paramValue);
  });
  window.history.pushState({ path: url.toString() }, document.title, url.toString());
}

export function removeSearchParams(params = []) {
  const url = new URL(window.location);
  params.forEach((param) => {
    url.searchParams.delete(param);
  });
  window.history.pushState({ path: url.toString() }, document.title, url.toString());
}

export function getSearchParams() {
  const url = new URL(window.location);
  return Object.fromEntries(url.searchParams.entries());
}
