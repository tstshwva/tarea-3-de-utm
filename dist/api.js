// La función recibe fetch como argumento opcional para poder probar errores sin llamar a la API.
export async function requestJSON(url, fetcher = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetcher(url, { signal: controller.signal });
    if (response.status === 429) throw new Error('Límite de peticiones alcanzado. Espera un momento e inténtalo de nuevo.');
    if (!response.ok) throw new Error('El servicio no está disponible. Inténtalo más tarde.');
    const data = await response.json();
    if (!data || data.error) throw new Error('El servicio devolvió una respuesta vacía o inválida.');
    return data;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('La consulta tardó demasiado. Vuelve a intentarlo.');
    if (error instanceof TypeError) throw new Error('No se pudo conectar. Revisa tu conexión e inténtalo de nuevo.');
    if (error instanceof SyntaxError) throw new Error('El servicio devolvió una respuesta inválida.');
    throw error;
  } finally { clearTimeout(timer); }
}
export function describe(code) {
  if (code === 0) return 'Cielo despejado';
  if ([1,2,3].includes(code)) return 'Parcialmente nublado o cubierto';
  if ([45,48].includes(code)) return 'Niebla';
  if ([51,53,55,56,57].includes(code)) return 'Llovizna';
  if ([61,63,65,66,67,80,81,82].includes(code)) return 'Lluvia';
  if ([71,73,75,77,85,86].includes(code)) return 'Nieve';
  if ([95,96,97,99].includes(code)) return 'Tormenta';
  return 'Condición no disponible';
}
export function validateWeather(data) {
  const c = data.current, d = data.daily;
  if (!c || !['temperature_2m','apparent_temperature','relative_humidity_2m','wind_speed_10m','weather_code'].every(k => Number.isFinite(c[k])) || !c.time || !d || !['time','temperature_2m_max','temperature_2m_min','weather_code'].every(k => Array.isArray(d[k]) && d[k].length >= 4) || ![1,2,3].every(i => typeof d.time[i] === 'string' && ['temperature_2m_max','temperature_2m_min','weather_code'].every(k => Number.isFinite(d[k][i])))) throw new Error('No hay datos meteorológicos completos para esta ciudad.');
  return data;
}
