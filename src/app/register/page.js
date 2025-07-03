"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //  Appel  au backend Symfony
  const register = async (data) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de l’inscription.");
    }

    return await response.json();
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Validation simple
    if (!form.prenom.trim() || !form.nom.trim() || !form.email.trim() || !form.password.trim()) {
      return setError("Tous les champs sont obligatoires.");
    }
    if (!validateEmail(form.email)) {
      return setError("Email invalide.");
    }
    if (form.password.length < 6) {
      return setError("Le mot de passe doit contenir au moins 6 caractères.");
    }

    setLoading(true);

    try {
      await register(form);
      router.push("/login"); // ✅ Redirection après succès
    } catch (err) {
      setError(err.message || "Erreur lors de l’inscription.");
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
        <h2 className="text-2xl font-bold text-center text-green-700">Créer un compte</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={form.prenom}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
        />

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
        />

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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>

        <p className="text-sm text-center">
          Déjà un compte ?{" "}
          <a href="/login" className="text-green-700 hover:underline">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
}
