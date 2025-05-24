import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UploadPDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);

  const handleLogout = () => {
    toast.success("Sesión cerrada con éxito.");
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
    }, 1500);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toast.error("Por favor sube un archivo PDF válido.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      toast.error("Debes seleccionar un archivo PDF.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const fakeResponse = [
        {
          id: "1155715",
          name: "SOLUCIONES TECNOLOGICA EN EL CONTEXTO SOCIAL",
          score: 4.7,
        },
        { id: "1155811", name: "LABORATORIO DE PROGRAMACION", score: 4.3 },
        { id: "1156703", name: "INTELIGENCIA ARTIFICIAL", score: 4.3 },
        {
          id: "1155616",
          name: "APLICACIONES PRÁCTICAS DE TEORIA DE GRAFOS",
          score: 4.2,
        },
        { id: "1156902", name: "SEGURIDAD INFORMATICA", score: 4.2 },
        { id: "1155713", name: "BASES DE DATOS AVANZADAS", score: 4.1 },
        { id: "1155716", name: "ANALITICA DE DATOS", score: 4.1 },
        {
          id: "1157007",
          name: "DESARROLLO DE APLICACIONES BASADAS EN MICROSERVICIOS",
          score: 3.95,
        },
        { id: "1157005", name: "MINERIA DE DATOS", score: 3.95 },
        {
          id: "1155712",
          name: "ECONOMIA Y FINANZAS PARA INGENIEROS",
          score: 3.9,
        },
        { id: "1155615", name: "MULTIMEDIA Y REALIDAD MIXTA", score: 3.6 },
        { id: "1156804", name: "ADMINISTRACION DE SO DE RED", score: 3.6 },
        { id: "1157004", name: "COMPUTACION EN LA NUBE", score: 3.6 },
        { id: "1157003", name: "INFORMATICA JURIDICA", score: 3.5 },
        {
          id: "1155906",
          name: "ESTRATEGIAS PARA LA EMPLEABILIDAD EN SISTEMAS",
          score: 3.1,
        },
      ];
      localStorage.setItem("recommendations", JSON.stringify(fakeResponse));
      toast.success("Recomendaciones generadas con éxito.");
      //setLoading(false);
      setTimeout(() => {
        navigate("/recommendations");
      }, 1500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="w-full max-w-lg bg-card p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Subir reporte de notas
        </h2>

        <p className="text-sm mb-4 text-accent text-center">
          Usuario: <span className="font-semibold">{user?.nombre}</span> (
          <span>{user?.correo}</span>)
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="mb-4 text-center text-muted-foreground">
              Procesando archivo y generando recomendaciones...
            </p>
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full p-3 border border-muted bg-background rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              className="w-full bg-primary hover:bg-red-600 transition-colors text-white font-semibold py-3 rounded-xl"
            >
              Enviar y obtener recomendaciones
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
