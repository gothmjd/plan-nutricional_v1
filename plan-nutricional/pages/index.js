// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/plan')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar los datos');
        return res.json();
      })
      .then((data) => {
        setDatos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando plan personalizado...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', padding: '20px', lineHeight: '1.6' }}>
      
      {/* Encabezado */}
      <header style={{ borderBottom: '2px solid #4CAF50', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#2E7D32' }}>Plan Nutricional y de Ejercicios</h1>
        <p><strong>Paciente:</strong> {datos.nombre_completo} ({datos.edad} años)</p>
        <p><strong>Objetivo:</strong> {datos.objetivo_peso}</p>
      </header>

      {/* Datos Antropométricos */}
      <section style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, background: '#f0fdf4', padding: '15px', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0, color: '#166534' }}>Datos Actuales</h3>
          <p><strong>Peso:</strong> {datos.peso_kg} kg</p>
          <p><strong>Altura:</strong> {datos.altura_cm} cm</p>
          <p><strong>Actividad:</strong> {datos.nivel_actividad_actual}</p>
        </div>
        <div style={{ flex: 1, background: '#fef2f2', padding: '15px', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0, color: '#991b1b' }}>Restricciones</h3>
          <p><strong>Alimentaria:</strong> {datos.restriccion_alimentaria}</p>
          <p><strong>Médica:</strong> {datos.indicaciones_medicas}</p>
          <p><strong>Presupuesto:</strong> {datos.presupuesto_semanal_euros} €/semana</p>
        </div>
      </section>

      {/* Plan de Dieta */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#2E7D32', borderBottom: '1px solid #ccc' }}>🍽️ Plan de Alimentación (Sin Gluten)</h2>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <p><em>Basado en cenas ligeras para evitar digestiones pesadas y presupuesto ajustado.</em></p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Comida</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Sugerencia</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '8px' }}>Desayuno</td><td style={{ padding: '8px' }}>Yogur natural + fruta + nueces</td></tr>
              <tr><td style={{ padding: '8px' }}>Almuerzo</td><td style={{ padding: '8px' }}>Arroz integral + pollo a la plancha + ensalada</td></tr>
              <tr><td style={{ padding: '8px' }}>Merienda</td><td style={{ padding: '8px' }}>Tostada sin gluten con pavo o queso fresco</td></tr>
              <tr><td style={{ padding: '8px' }}>Cena</td><td style={{ padding: '8px' }}>Crema de calabacín + tortilla francesa (ligera)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Plan de Ejercicios */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#2E7D32', borderBottom: '1px solid #ccc' }}>🏃‍♀️ Rutina de Ejercicios (Bajo Impacto)</h2>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <p><strong>Días disponibles:</strong> {datos.dias_ejercicio} ({datos.horario_ejercicio})</p>
          <p><em>Enfocado en proteger las rodillas.</em></p>
          <ul>
            <li><strong>Calentamiento (10 min):</strong> Caminata rápida.</li>
            <li><strong>Circuito (30 min):</strong> Sentadilla a la pared (3x30s), Puente de glúteos (3x15), Zancadas inversas (3x12/pierna), Bicicleta estática (15 min).</li>
            <li><strong>Estiramiento (10 min).</strong></li>
          </ul>
          <p style={{ fontSize: '0.9em', color: '#555' }}><strong>Nota adicional:</strong> {datos.comentarios_adicionales}</p>
        </div>
      </section>

    </div>
  );
}
