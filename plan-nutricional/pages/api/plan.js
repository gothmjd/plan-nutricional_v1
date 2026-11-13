import pool from "../../lib/db";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método no permitido. Usa GET." });
  }

  try {
    const [rows] = await pool.execute(`
      SELECT
        dp.nombre_completo,
        dp.edad,
        dp.peso_kg,
        dp.altura_cm,
        dp.presupuesto_semanal_euros,
        so.restriccion_alimentaria,
        so.indicaciones_medicas,
        so.objetivo_peso,
        so.nivel_actividad_actual,
        rd.dias_ejercicio,
        rd.horario_ejercicio,
        rd.comentarios_adicionales
      FROM datos_personales AS dp
      INNER JOIN salud_objetivos AS so ON dp.id = so.usuario_id
      INNER JOIN rutina_disponibilidad AS rd ON dp.id = rd.usuario_id
      WHERE dp.id = ?
      LIMIT 1
    `, [1]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        error: "No se encontraron datos para el plan solicitado.",
      });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(
      "Error al consultar el plan nutricional:",
      error instanceof Error ? error.message : "Error desconocido",
    );

    return res.status(500).json({
      error: "No fue posible consultar la base de datos. Revisa la configuración.",
    });
  }
}
