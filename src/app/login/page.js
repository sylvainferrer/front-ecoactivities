"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../services/auth";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      return setError("Tous les champs sont obligatoires.");
    }

    setLoading(true);

    try {
      const res = await login(form); // appel à services/auth.js
      localStorage.setItem("token", res.token); // stocker le token JWT
      router.push("/"); // redirection après connexion
    } catch (err) {
      setError(err.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">Se connecter</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="text-sm text-center">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-green-700 hover:underline">
            S'inscrire
          </a>
        </p>
      </form>
    </div>
  );
}
