// =====================================================================
// photos — отдаёт список всех присланных фото (для панели организатора).
// Защищено паролем (тем же, что и вход в admin.html).
// =====================================================================

import { getStore } from "@netlify/blobs";

const ADMIN_PASSWORD = "2026";

export default async (req) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const password = url.searchParams.get("password") || req.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }

  try {
    const store = getStore("quest-photos");
    const { blobs } = await store.list();

    const items = await Promise.all(
      blobs.map((b) => store.get(b.key, { type: "json" }))
    );

    const cleaned = items.filter(Boolean).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return new Response(JSON.stringify({ ok: true, items: cleaned }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("photos error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};

export const config = { path: "/.netlify/functions/photos" };
