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

  const handleRecommendacionesAnteriores = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.codigo) {
      toast.error("No se ha iniciado sesión correctamente.");
      navigate("/");
      return;
    }

    const loadingId = toast.loading("Buscando recomendaciones anteriores...");
    setLoading(true);

    try {
      const response = await fetch(
        `/api/recommendations/student/${user.codigo}`
      );

      if (response.status === 404) {
        toast.dismiss(loadingId);
        toast.error("Estudiante no registrado.");
        return;
      }

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error al obtener recomendaciones.");
      }

      const recomendaciones = await response.json();
      localStorage.setItem("recommendations", JSON.stringify(recomendaciones));

      toast.dismiss(loadingId);
      toast.success("Recomendaciones cargadas con éxito.");
      navigate("/recommendations");
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Error al obtener recomendaciones.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      // Paso 1: Enviar PDF al backend
      const response = await fetch("/api/procesar-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error procesando el PDF.");
      }

      const data = await response.json();

      // Paso 2: Extraer el ID del estudiante
      const estudianteId = data?.informacion_estudiante?.codigo_estudiante;
      if (!estudianteId) {
        throw new Error(
          "No se pudo obtener el ID del estudiante desde el PDF."
        );
      }

      // Paso 3: Obtener recomendaciones
      const recResponse = await fetch(
        `/api/recommendations/student/${estudianteId}`
      );

      if (!recResponse.ok) {
        const err = await recResponse.json();
        throw new Error(err.error || "Error al obtener recomendaciones.");
      }

      const recomendaciones = await recResponse.json();

      // Paso 4: Guardar y redirigir
      localStorage.setItem("recommendations", JSON.stringify(recomendaciones));
      toast.success("Recomendaciones generadas con éxito.");

      setTimeout(() => {
        navigate("/recommendations");
      }, 1500);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "Algo salió mal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-6 right-6 flex flex-col gap-3 items-end">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition-all duration-200"
        >
          Cerrar sesión
        </button>
        <button
          onClick={handleRecommendacionesAnteriores}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all duration-200"
        >
          📄 Recomendaciones anteriores
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
