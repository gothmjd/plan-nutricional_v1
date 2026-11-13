"use client";

import { useEffect, useState } from "react";

type PlanValue = string | number | null;

type PlanData = {
  nombre_completo: PlanValue;
  edad: PlanValue;
  peso_kg: PlanValue;
  altura_cm: PlanValue;
  presupuesto_semanal_euros: PlanValue;
  restriccion_alimentaria: PlanValue;
  indicaciones_medicas: PlanValue;
  objetivo_peso: PlanValue;
  nivel_actividad_actual: PlanValue;
  dias_ejercicio: PlanValue;
  horario_ejercicio: PlanValue;
  comentarios_adicionales: PlanValue;
};

const meals = [
  { name: "Desayuno", suggestion: "Yogur natural con fruta y nueces." },
  { name: "Almuerzo", suggestion: "Arroz integral con pollo a la plancha y ensalada." },
  { name: "Merienda", suggestion: "Tostada sin gluten con pavo o queso fresco." },
  { name: "Cena", suggestion: "Crema de calabacín con tortilla francesa." },
];

function showValue(value: PlanValue, fallback = "No especificado") {
  if (value === null || value === undefined || value === "") return fallback;
  return value;
}

function InfoCard({
  title,
  children,
  tone = "green",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "green" | "rose";
}) {
  const toneClasses =
    tone === "green"
      ? "border-emerald-100 bg-emerald-50"
      : "border-rose-100 bg-rose-50";

  return (
    <section className={`rounded-2xl border p-5 shadow-sm ${toneClasses}`}>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">{title}</h2>
      <div className="space-y-3 text-sm text-slate-700">{children}</div>
    </section>
  );
}

export default function Home() {
  const [data, setData] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadPlan() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/plan", {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        const result = (await response.json()) as
          | PlanData
          | { error?: string };

        if (!response.ok) {
          const message =
            "error" in result && result.error
              ? result.error
              : "No fue posible cargar el plan.";
          throw new Error(message);
        }

        if (active) setData(result as PlanData);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Ocurrió un error inesperado al cargar el plan.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadPlan();

    return () => {
      active = false;
      controller.abort();
    };
  }, [retry]);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-6">
        <div className="text-center" role="status" aria-live="polite">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <p className="font-medium text-slate-700">
            Cargando tu plan nutricional...
          </p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-6">
        <section className="w-full max-w-lg rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-3 text-3xl" aria-hidden="true">⚠️</div>
          <h1 className="text-xl font-bold text-slate-900">
            No se pudo cargar el plan
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {error ?? "La API no devolvió información."}
          </p>
          <button
            type="button"
            onClick={() => setRetry((value) => value + 1)}
            className="mt-6 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Intentar de nuevo
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-green-600 p-6 text-white shadow-lg sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
            Bienestar · Alimentación · Movimiento
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Plan Nutricional y de Ejercicios
          </h1>
          <p className="mt-3 text-emerald-50">
            Hola, {showValue(data.nombre_completo, "bienvenido/a")}. Este es tu
            resumen personalizado.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-white/15 px-3 py-1">
              {showValue(data.edad)} años
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1">
              Objetivo: {showValue(data.objetivo_peso)}
            </span>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title="📊 Datos actuales">
            <p><strong>Peso:</strong> {showValue(data.peso_kg)} kg</p>
            <p><strong>Altura:</strong> {showValue(data.altura_cm)} cm</p>
            <p><strong>Actividad:</strong> {showValue(data.nivel_actividad_actual)}</p>
          </InfoCard>
          <InfoCard title="🌿 Restricciones y presupuesto" tone="rose">
            <p><strong>Alimentaria:</strong> {showValue(data.restriccion_alimentaria)}</p>
            <p><strong>Indicaciones:</strong> {showValue(data.indicaciones_medicas)}</p>
            <p>
              <strong>Presupuesto:</strong>{" "}
              {showValue(data.presupuesto_semanal_euros)} €/semana
            </p>
          </InfoCard>
        </div>

        <section className="mt-8">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Tu alimentación
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              Plan de alimentación
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Propuesta orientativa de comidas sin gluten. Verifica siempre las
              etiquetas de los productos.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[minmax(105px,0.7fr)_2fr] bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
              <span>Comida</span>
              <span>Sugerencia</span>
            </div>
            {meals.map((meal) => (
              <div
                key={meal.name}
                className="grid grid-cols-[minmax(105px,0.7fr)_2fr] gap-3 border-t border-slate-100 px-4 py-4 text-sm"
              >
                <strong className="text-emerald-800">{meal.name}</strong>
                <span className="text-slate-700">{meal.suggestion}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Tu actividad
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              Rutina de ejercicios
            </h2>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm text-slate-700">
              <strong>Días disponibles:</strong> {showValue(data.dias_ejercicio)}
            </p>
            <p className="mt-1 text-sm text-slate-700">
              <strong>Horario:</strong> {showValue(data.horario_ejercicio)}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              <li><strong>Calentamiento (10 min):</strong> caminata a ritmo cómodo.</li>
              <li><strong>Fuerza:</strong> puente de glúteos y sentadilla asistida, ajustando repeticiones a tu condición.</li>
              <li><strong>Cardio:</strong> bicicleta estática o caminata suave durante 15 minutos.</li>
              <li><strong>Vuelta a la calma (5–10 min):</strong> movilidad y estiramientos suaves.</li>
            </ul>
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <strong>Comentarios:</strong>{" "}
              {showValue(data.comentarios_adicionales)}
            </div>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 py-5 text-center text-xs text-slate-500">
          Plan Nutricional · Aplicación de demostración
        </footer>
      </div>
    </main>
  );
}
