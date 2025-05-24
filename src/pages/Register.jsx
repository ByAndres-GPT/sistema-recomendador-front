import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../utils/categories";
import toast from "react-hot-toast";

export default function Register() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [intereses, setIntereses] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      codigo &&
      nombre &&
      apellido &&
      correo &&
      contrasena &&
      intereses.length > 0
    ) {
      const userData = {
        codigo,
        nombre,
        apellido,
        correo,
        contrasena,
        intereses,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Registro exitoso.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      toast.error("Por favor rellena todos los campos.");
    }
  };

  const handleSelectChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    const merged = [...new Set([...intereses, ...selected])];
    setIntereses(merged);
  };

  const removeInterest = (interest) => {
    setIntereses(intereses.filter((item) => item !== interest));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-text font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Registro
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="px-4 py-2 rounded-xl bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="px-4 py-2 rounded-xl bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="px-4 py-2 rounded-xl bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="px-4 py-2 rounded-xl bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="px-4 py-2 rounded-xl bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <div>
            <label className="block mb-2 font-medium text-text">
              Selecciona tus intereses:
            </label>

            <div className="flex flex-wrap gap-2 mb-3">
              {intereses.map((interest, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-1 text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <select
              multiple
              value={[]}
              onChange={handleSelectChange}
              className="w-full p-2 rounded-xl bg-background border border-muted h-40 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-primary hover:bg-red-600 transition-colors text-white py-2 rounded-xl font-semibold"
          >
            Registrarse
          </button>

          <p
            className="text-sm mt-4 text-center text-accent hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </p>
        </div>
      </form>
    </div>
  );
}
