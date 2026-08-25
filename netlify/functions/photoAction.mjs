// =====================================================================
// photoAction — одобрить / отклонить / отметить «понравилось» фото.
// Защищено паролем (тем же, что и вход в admin.html).
// =====================================================================

import { getStore } from "@netlify/blobs";

const ADMIN_PASSWORD = "2026";
const VALID_ACTIONS = ["approve", "reject", "favorite", "unfavorite", "delete"];

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { id, action, password } = body;

    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }
    if (!id || !VALID_ACTIONS.includes(action)) {
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
    }

    const store = getStore("quest-photos");
    const record = await store.get(id, { type: "json" });
    if (!record) {
      return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
    }

    if (action === "delete") {
      await store.delete(id);
      return new Response(JSON.stringify({ ok: true, deleted: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (action === "approve") record.status = "approved";
    if (action === "reject") record.status = "rejected";
    if (action === "favorite") record.favorite = true;
    if (action === "unfavorite") record.favorite = false;

    await store.setJSON(id, record);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("photoAction error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};

export const config = { path: "/.netlify/functions/photoAction" };
