import { setFavoriteArtiste } from "../../../../backend/backend.mjs";

function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST({ request }) {
    try {
        const body = await request.json();
        const id = body?.id?.toString().trim();
        const favori = body?.favori;

        if (!id || typeof favori !== "boolean") {
            return jsonResponse(
                {
                    error: "Parametres invalides pour la mise a jour du favori.",
                },
                400,
            );
        }

        const updated = await setFavoriteArtiste(id, favori);

        if (!updated?.id) {
            return jsonResponse(
                {
                    error: "Echec de mise a jour du favori dans PocketBase.",
                },
                500,
            );
        }

        return jsonResponse({
            id: updated.id,
            favori: updated.Favori === true,
        });
    } catch (error) {
        console.log("Erreur API favori", error);
        return jsonResponse(
            {
                error:
                    error?.message ||
                    "Impossible de mettre a jour le favori.",
            },
            500,
        );
    }
}
