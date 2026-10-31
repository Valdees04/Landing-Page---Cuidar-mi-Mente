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

      document.getElementById("ruletaTitulo").textContent = `${d.data.emoji} ${d.data.nombre}`;
      document.getElementById("ruletaDesc").textContent = d.data.info;
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("d", arcNormal);

      document.getElementById("ruletaTitulo").textContent = "Explora tus emociones";
      document.getElementById("ruletaDesc").textContent =
        "Pasa el cursor (o toca) cada sección para descubrir qué emoción representa ";
    })
    .on("touchstart", function (event, d) {
      event.preventDefault();
      d3.select(this).transition().duration(200).attr("d", arcExpanded);
      document.getElementById("ruletaTitulo").textContent = `${d.data.emoji} ${d.data.nombre}`;
      document.getElementById("ruletaDesc").textContent = d.data.info;
    });

  const datos = pie(emocionesData);

  //Emoji en el centro de la rebanada (sin rotar)
  svg
    .selectAll("text.emoji-slice")
    .data(datos)
    .enter()
    .append("text")
    .attr("class", "emoji-slice")
    .style("pointer-events", "none")
    .style("font-size", "34px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("transform", (d) => {
      const midAngle = (d.startAngle + d.endAngle) / 2;
      const radio = (radius - 10) * 0.52; // centro de la rebanada
      return `translate(${Math.sin(midAngle) * radio},${-Math.cos(midAngle) * radio})`;
    })
    .text((d) => d.data.emoji);

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
      return `translate(${x},${y}) rotate(${angulo})`;
    })
    .text((d) => d.data.nombre);
});
