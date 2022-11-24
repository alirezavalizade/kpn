export async function http(args) {
  // eslint-disable-next-line no-undef
  const baseURL = process.env.BASE_URL || window.location.origin;
  const url = new URL(baseURL);

  url.pathname = args.url;

  if (args.params) {
    url.search = new URLSearchParams(args.params).toString();
  }

  try {
    const response = await fetch(url);

    if (response.ok) {
      return response.json();
    }

    throw new Error(response.statusText);
  } catch (e) {
    return e;
  }
}
