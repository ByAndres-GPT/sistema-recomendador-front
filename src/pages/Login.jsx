import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [contrasena, setContrasena] = useState("");
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);
      if (userData.codigo === codigo && userData.contrasena === contrasena) {
        toast.success("Sesión iniciada con éxito.");
        setTimeout(() => {
          setLoading(true);
          setTimeout(() => {
            navigate("/upload");
          }, 2000);
        }, 1500);
      } else {
        toast.error("Código o contraseña incorrectos.");
      }
    } else {
      toast.error("No Registrado.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-text">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-dashed rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold">Iniciando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-text font-sans">
      <form
        onSubmit={handleLogin}
        className="bg-card p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Iniciar sesión
        </h2>

        <label className="block mb-2 text-sm font-medium text-text">
          Código
        </label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-xl bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <label className="block mb-2 text-sm font-medium text-text">
          Contraseña
        </label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-xl bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <button
          type="submit"
          className="w-full bg-primary hover:bg-red-600 transition-colors text-white py-2 rounded-xl font-semibold"
        >
          Ingresar
        </button>

        <p
          className="text-sm mt-6 text-center text-accent hover:underline cursor-pointer"
          onClick={() => navigate("/register")}
        >
          ¿No tienes cuenta? Regístrate
        </p>
      </form>
    </div>
  );
}
