"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat(
    (4 - (base64String.length % 4)) % 4
  );

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map((char) => char.charCodeAt(0))
  );
}

export default function NotificationButton() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function activerNotifications() {
    setLoading(true);
    setMessage("");

    try {
      // ==========================================
      // VÉRIFICATION DES NOTIFICATIONS
      // ==========================================

      if (!("Notification" in window)) {
        setMessage(
          "Les notifications ne sont pas disponibles sur cet appareil."
        );
        return;
      }

      // ==========================================
      // VÉRIFICATION DU SERVICE WORKER
      // ==========================================

      if (!("serviceWorker" in navigator)) {
        setMessage(
          "Les notifications ne sont pas disponibles ici."
        );
        return;
      }

      // ==========================================
      // RÉCUPÉRATION DE LA CLÉ VAPID PUBLIQUE
      // ==========================================

      const vapidPublicKey =
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!vapidPublicKey) {
        setMessage(
          "La clé VAPID publique est introuvable."
        );
        return;
      }

      // ==========================================
      // DEMANDE D'AUTORISATION
      // ==========================================

      const permission =
        await Notification.requestPermission();

      if (permission !== "granted") {
        setMessage(
          "Les notifications n'ont pas été activées."
        );
        return;
      }

      // ==========================================
      // ENREGISTREMENT DU SERVICE WORKER
      // ==========================================

      await navigator.serviceWorker.register("/sw.js");

      // ==========================================
      // ATTENDRE QUE LE SERVICE WORKER SOIT ACTIF
      // ==========================================

      const registration =
        await navigator.serviceWorker.ready;

      if (!registration.active) {
        setMessage(
          "Le Service Worker n'est pas encore actif."
        );
        return;
      }

      // ==========================================
      // CONVERSION DE LA CLÉ VAPID
      // ==========================================

      const applicationServerKey =
        urlBase64ToUint8Array(vapidPublicKey);

      // ==========================================
      // CRÉATION DE L'ABONNEMENT PUSH
      // ==========================================

      const subscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });

      // ==========================================
      // RÉCUPÉRATION DES DONNÉES
      // ==========================================

      const json = subscription.toJSON();

      if (
        !json.endpoint ||
        !json.keys?.p256dh ||
        !json.keys?.auth
      ) {
        setMessage(
          "Impossible d'enregistrer cet appareil."
        );
        return;
      }

      // ==========================================
      // ENREGISTREMENT DANS SUPABASE
      // ==========================================

     const { error } = await supabase
  .from("push_subscriptions")
  .upsert(
    {
      endpoint: json.endpoint,
      p256dh: json.keys.p256dh,
      auth: json.keys.auth,
    },
    {
      onConflict: "endpoint",
    }
  );

      // ==========================================
      // ERREUR SUPABASE
      // ==========================================

      if (error) {
        console.error("Erreur Supabase :", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });

        setMessage(
          `Erreur Supabase : ${error.message}`
        );

        return;
      }

      // ==========================================
      // SUCCÈS
      // ==========================================

      setMessage(
        "Les notifications sont activées 🌿"
      );

    } catch (error) {
      // ==========================================
      // AUTRE ERREUR
      // ==========================================

      console.error(
        "Erreur notifications :",
        error
      );

      if (error instanceof Error) {
        setMessage(
          `Erreur : ${error.message}`
        );
      } else {
        setMessage(
          "Une erreur est survenue."
        );
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        textAlign: "center",
        margin: "30px 0",
      }}
    >
      <button
        type="button"
        onClick={activerNotifications}
        disabled={loading}
        style={{
          background: "transparent",
          border:
            "1px solid rgba(217, 182, 109, 0.45)",
          color: "inherit",
          padding: "12px 20px",
          borderRadius: "999px",
          cursor: loading
            ? "default"
            : "pointer",
          fontFamily: "inherit",
        }}
      >
        {loading
          ? "Activation..."
          : "🔔 Activer les notifications"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "12px",
            fontSize: "0.85rem",
            opacity: 0.7,
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}