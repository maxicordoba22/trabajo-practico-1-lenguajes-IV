// Referencias a los elementos del DOM
const formulario = document.getElementById("form-ubicacion");
const inputNombre = document.getElementById("nombre");
const inputLatitud = document.getElementById("latitud");
const inputLongitud = document.getElementById("longitud");
const mensajeError = document.getElementById("mensaje-error");
const resultado = document.getElementById("resultado");
const textoReflejo = document.getElementById("texto-reflejo");
const iframeMapa = document.getElementById("mapa");
const enlaceMaps = document.getElementById("enlace-maps");

// Convierte "28,3537921" o "28.3537921" en un número JavaScript válido
function convertirANumero(valor) {
  const limpio = valor.trim().replace(",", ".");
  return parseFloat(limpio);
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue
  mensajeError.textContent = "";

  const nombre = inputNombre.value.trim() || "Ubicación sin nombre";
  const latitud = convertirANumero(inputLatitud.value);
  const longitud = convertirANumero(inputLongitud.value);

  // Validación: que sean números
  if (isNaN(latitud) || isNaN(longitud)) {
    mensajeError.textContent = "Ingresá una latitud y longitud válidas.";
    resultado.classList.add("oculto");
    return;
  }

  // Validación: rangos geográficos reales
  if (latitud < -90 || latitud > 90) {
    mensajeError.textContent = "La latitud debe estar entre -90 y 90.";
    resultado.classList.add("oculto");
    return;
  }

  if (longitud < -180 || longitud > 180) {
    mensajeError.textContent = "La longitud debe estar entre -180 y 180.";
    resultado.classList.add("oculto");
    return;
  }

  // 1) Reflejar la ubicación ingresada como texto
  textoReflejo.textContent = `${nombre} — Lat: ${latitud}, Long: ${longitud}`;

  // 2) Visualizar las coordenadas en un mapa de Google Maps embebido

  iframeMapa.src = `https://www.google.com/maps?q=${latitud},${longitud}&z=15&output=embed`;

  // 3) Enlace opcional para abrir la misma ubicación en una pestaña nueva
  enlaceMaps.href = `https://www.google.com/maps?q=${latitud},${longitud}`;

  resultado.classList.remove("oculto");
  resultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
