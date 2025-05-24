import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Result() {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("recommendations");
    if (stored) {
      setRecommendations(JSON.parse(stored));
    } else {
      navigate("/upload");
    }
  }, [navigate]);

  const handleLogout = () => {
    toast.success("Sesión cerrada con éxito.");
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-text p-6 flex flex-col items-center justify-start relative">
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="w-full max-w-3xl bg-card p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Materias Recomendadas
        </h2>

        {recommendations.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No se encontraron recomendaciones.
          </p>
        ) : (
          <ul className="divide-y divide-muted">
            {recommendations.map((materia, idx) => (
              <li key={materia.id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-accent">
                      {materia.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ID: {materia.id}
                    </p>
                  </div>
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                    Score: {materia.score.toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/upload")}
            className="bg-primary hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Subir otro PDF
          </button>
        </div>
      </div>
    </div>
  );
}
