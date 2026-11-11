// pages/api/plan.js
import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    // Consultamos los datos de Carla uniendo las tablas
    const [rows] = await pool.query(`
      SELECT 
        dp.nombre_completo, dp.edad, dp.peso_kg, dp.altura_cm, dp.presupuesto_semanal_euros,
        so.restriccion_alimentaria, so.indicaciones_medicas, so.objetivo_peso, so.nivel_actividad_actual,
        rd.dias_ejercicio, rd.horario_ejercicio, rd.comentarios_adicionales
      FROM datos_personales dp
      JOIN salud_objetivos so ON dp.id = so.usuario_id
      JOIN rutina_disponibilidad rd ON dp.id = rd.usuario_id
      WHERE dp.id = 1
    `);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron datos' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al conectar con la base de datos' });
  }
}
