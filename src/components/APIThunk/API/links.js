const url = new URL(window.location.href);

if (url.hostname === 'localhost') {
  url.port = '7575';
}

if (url.hostname === 'igor-chazov.github.io') {
  url.hostname = 'ra-11-1-2-backend.herokuapp.com';
  url.protocol = 'https';
}

const root = url;
root.pathname = '';

const links = {
  root: root.origin,
  api: new URL('api/services', url.href).href,
};

export default links;
