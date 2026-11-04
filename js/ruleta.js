// D3.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("ruleta-emociones");
  if (!container || typeof emocionesData === "undefined") return;

  const size = 460;
  const radius = size / 2;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", `-20 -20 ${size + 40} ${size + 40}`)
    .append("g")
    .attr("transform", `translate(${radius}, ${radius})`);

  const pie = d3.pie().value(1).sort(null);
  const arcNormal = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius - 10);

  const arcExpanded = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius + 8);
  
  let sliceActiva = null;

  svg
    .selectAll("path")
    .data(pie(emocionesData))
    .enter()
    .append("path")
    .attr("d", arcNormal)
    .attr("fill", (d) => d.data.color)
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .style("cursor", "pointer")
    .on("mouseover", function (event, d) {
      d3.select(this).transition().duration(200).attr("d", arcExpanded);

      document.getElementById("ruletaTitulo").innerHTML = `<img src="${d.data.imagen}" alt=""> ${d.data.nombre}`;
      document.getElementById("ruletaDesc").textContent = d.data.info;
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("d", arcNormal);
      sliceActiva = null;

      document.getElementById("ruletaTitulo").textContent = "Explora tus emociones";
      document.getElementById("ruletaDesc").textContent =
        "Pasa el cursor (o toca) cada sección para descubrir qué emoción representa ";
    })
    .on("touchstart", function (event, d) {
      event.preventDefault();

      if(sliceActiva && sliceActiva !== this){
        d3.select(sliceActiva).transition().duration(200).attr("d", arcNormal);
      }
      sliceActiva = this;

      d3.select(this).transition().duration(200).attr("d", arcExpanded);
      document.getElementById("ruletaTitulo").innerHTML = `<img src="${d.data.imagen}" alt=""> ${d.data.nombre}`;
      document.getElementById("ruletaDesc").textContent = d.data.info;
    });

  const datos = pie(emocionesData);

  //emoción en el centro de la rebanada
  svg
    .selectAll("image.emoji-slice")
    .data(datos)
    .enter()
    .append("image")
    .attr("class", "emoji-slice")
    .attr("href", (d) => d.data.imagen)
    .attr("width", 70)
    .attr("height", 70)
    .attr("x", -35)
    .attr("y", -35)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("pointer-events", "none")
    .attr("transform", (d) => {
      const midAngle = (d.startAngle + d.endAngle) / 2;
      const radio = (radius - 10) * 0.52;
      const x = Math.sin(midAngle) * radio;
      const y = -Math.cos(midAngle) * radio;
      const angulo = (midAngle * 180) / Math.PI;
      // Flip: si la cara quedaría boca abajo, gira 180° extra
      const flip = angulo > 90 && angulo < 270 ? 180 : 0;
      return `translate(${x},${y}) rotate(${angulo + flip})`;
    })

  //Nombre cerca del borde, girado tangencialmente
  svg
    .selectAll("text.nombre-slice")
    .data(datos)
    .enter()
    .append("text")
    .attr("class", "nombre-slice")
    .style("pointer-events", "none")
    .style("font-weight", "700")
    .style("font-size", "18px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .style("fill", (d) => d.data.colorTexto)
    .attr("transform", (d) => {
      const midAngle = (d.startAngle + d.endAngle) / 2;
      const radio = (radius - 10) * 0.8; // pegado al borde
      const x = Math.sin(midAngle) * radio;
      const y = -Math.cos(midAngle) * radio;
      const angulo = (midAngle * 180) / Math.PI;
      const flip = angulo > 90 && angulo < 270 ? 180 : 0;
      return `translate(${x},${y}) rotate(${angulo + flip})`;
    })
    .text((d) => d.data.nombre);
});
