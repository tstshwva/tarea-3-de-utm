import { requestJSON, describe, validateWeather } from './api.js';
import { exactCountry, isCountry, placeLabel } from './places.js';
const $ = id => document.getElementById(id);
let busy = false;
function status(message, error = false) { $('status').textContent = message; $('status').className = error ? 'error' : ''; }
async function run(action) {
  if (busy) return;
  busy = true; $('submit').disabled = true;
  document.querySelectorAll('#places button').forEach(b => b.disabled = true);
  $('weather').hidden = true;
  status('Consultando datos…');
  try { await action(); } catch(error) { status(error.message, true); }
  finally { busy = false; $('submit').disabled = false; document.querySelectorAll('#places button').forEach(b => b.disabled = false); }
}
$('search').addEventListener('submit', event => {
  event.preventDefault();
  const name = $('city').value.trim();
  if (name.length < 2) { status('Escribe al menos dos caracteres.', true); return; }
  run(async () => {
    $('places').replaceChildren();
    const query = new URLSearchParams({ name, count: '20', language: 'es', format: 'json' });
    const data = await requestJSON('https://geocoding-api.open-meteo.com/v1/search?' + query);
    const places = (Array.isArray(data.results) ? data.results : []).filter(p => typeof p.name === 'string' && Number.isFinite(p.latitude) && Number.isFinite(p.longitude));
    if (!places.length) throw new Error('No encontramos ese lugar. Prueba el nombre de una ciudad o país y revisa la ortografía.');
    for (const place of places) {
      const button = document.createElement('button'); button.type = 'button';
      button.textContent = placeLabel(place);
      button.addEventListener('click', () => run(() => showWeather(place)));
      $('places').append(button);
    }
    const country = exactCountry(places, name);
    if (country) await showWeather(country);
    else if (places.length === 1) await showWeather(places[0]);
    else status('Encontramos varios lugares. Selecciona el país o la ciudad correcta.');
  });
});
async function showWeather(place) {
  const query = new URLSearchParams({ latitude: place.latitude, longitude: place.longitude, current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code', daily: 'temperature_2m_max,temperature_2m_min,weather_code', forecast_days: '4', timezone: 'auto' });
  const data = validateWeather(await requestJSON('https://api.open-meteo.com/v1/forecast?' + query));
  const c = data.current, d = data.daily;
  $('location').textContent = isCountry(place) ? place.name : [...new Set([place.name, place.country].filter(Boolean))].join(', ');
  $('temperature').textContent = Math.round(c.temperature_2m) + '°C';
  $('condition').textContent = describe(c.weather_code);
  $('updated').textContent = 'Hora local de los datos: ' + c.time.replace('T',' · ');
  $('feels').textContent = Math.round(c.apparent_temperature) + ' °C';
  $('humidity').textContent = c.relative_humidity_2m + ' %';
  $('wind').textContent = c.wind_speed_10m + ' km/h';
  $('forecast').replaceChildren();
  for(let i=1;i<=3;i++) {
    const card = document.createElement('article'); card.className = 'day';
    const title = document.createElement('h3');
    // Mediodía evita que una fecha sin hora se desplace al día anterior por la zona horaria.
    title.textContent = new Date(d.time[i] + 'T12:00:00').toLocaleDateString('es-MX',{weekday:'long',day:'numeric',month:'short'});
    const temp = document.createElement('strong'); temp.textContent = `${Math.round(d.temperature_2m_max[i])}° / ${Math.round(d.temperature_2m_min[i])}°`;
    const desc = document.createElement('p'); desc.textContent = describe(d.weather_code[i]);
    const label = document.createElement('p'); label.textContent = 'Máxima / mínima · °C';
    card.append(title,temp,desc,label); $('forecast').append(card);
  }
  $('weather').hidden = false;
  status(isCountry(place)
    ? `Clima del punto de referencia de ${place.name} (${place.latitude.toFixed(2)}, ${place.longitude.toFixed(2)}). Varía dentro del país; busca una ciudad para consultar su clima local.`
    : 'Consulta completada. Puedes buscar otra ciudad o país.');
}
