// =====================================================================
// sendPhoto — принимает фото от гостя и сохраняет его в хранилище
// (Netlify Blobs) со статусом "pending" ("на проверке").
// Организатор проверяет и одобряет/отклоняет фото на странице admin.html
// (см. netlify/functions/photos.mjs и photoAction.mjs).
// =====================================================================

import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const formData = await req.formData();
    const photo = formData.get("photo");
    const taskId = (formData.get("taskId") || "").toString();
    const filmTitle = (formData.get("filmTitle") || "Сцена").toString();
    const teamName = (formData.get("teamName") || "Без названия").toString().trim().slice(0, 60);

    if (!photo || typeof photo === "string") {
      return new Response(JSON.stringify({ error: "no photo" }), { status: 400 });
    }

    const arrayBuffer = await photo.arrayBuffer();
    const dataBase64 = Buffer.from(arrayBuffer).toString("base64");
    const mime = photo.type || "image/jpeg";

    const id = crypto.randomUUID();
    const record = {
      id,
      teamName: teamName || "Без названия",
      taskId,
      filmTitle,
      mime,
      dataBase64,
      status: "pending", // pending | approved | rejected
      favorite: false,
      createdAt: new Date().toISOString(),
    };

    const store = getStore("quest-photos");
    await store.setJSON(id, record);

    return new Response(JSON.stringify({ ok: true, id }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("sendPhoto error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};

export const config = { path: "/.netlify/functions/sendPhoto" };
