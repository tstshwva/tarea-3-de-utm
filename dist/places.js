export const normalizeName = name => String(name).normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLocaleLowerCase('es');
export const isCountry = place => /^PCL/.test(place.feature_code || '');
export function exactCountry(places, name) {
  return places.find(place => isCountry(place) && [place.name, place.country].some(value => normalizeName(value) === normalizeName(name)));
}
export function placeLabel(place) {
  if (isCountry(place)) return `${place.name} · País (punto de referencia)`;
  return [...new Set([place.name, place.admin1, place.country].filter(Boolean))].join(', ');
}
