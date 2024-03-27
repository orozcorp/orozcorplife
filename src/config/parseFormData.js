export default function parseFormData(_formData) {
  const formData =
    _formData instanceof FormData ? _formData : new FormData(_formData);
  const obj = {};
  // eslint-disable-next-line
  for (const [k, v] of formData.entries()) {
    if (!k.startsWith("$")) {
      obj[k] = v;
    }
  }

  return obj;
}
