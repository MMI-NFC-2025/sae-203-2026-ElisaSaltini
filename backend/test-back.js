import {
    getArtistesByDate,
    getScenesByName,
    getArtistesByName,
    getArtiste,
    getScene,
    getArtistesBySceneId,
    getArtistesBySceneName,
    updateArtiste,
    createArtiste,
    updateScene,
    createScene,
    getImageUrl,
} from "./backend.mjs";

const ARTISTE_ID = "djk9u5h6nz3qcku"; // Louis Sclavis
const SCENE_1_ID = "990kyc4xixgoced"; // Scène 1
const SCENE_2_ID = "vymm3fzahl1snlg"; // Scène 2
const SCENE_3_ID = "oi2drgzc0cidqno"; // Scène 3
const SCENE_1_NAME = "Scène 1";


// --- Test 1 : Artistes triés par date ---
console.log("\n=== 1. Artistes triés par date ===");
try {
    const artistes = await getArtistesByDate();

    console.table(
        artistes.map((artiste) => ({
            id: artiste.id,
            nom: artiste.Nom,
            debut: artiste.Debut_representation,
            fin: artiste.Fin_representation,
            scene: artiste.expand?.Scene_associee?.Nom,
        }))
    );
} catch (e) {
    console.error(e);
}


// --- Test 2 : Scènes triées par nom ---
console.log("\n=== 2. Scènes triées par nom ===");
try {
    const scenes = await getScenesByName();

    console.table(
        scenes.map((scene) => ({
            id: scene.id,
            nom: scene.Nom,
            localisation: scene.Localisation,
        }))
    );
} catch (e) {
    console.error(e);
}


// --- Test 3 : Artistes triés par ordre alphabétique ---
console.log("\n=== 3. Artistes par ordre alphabétique ===");
try {
    const artistes = await getArtistesByName();

    console.table(
        artistes.map((artiste) => ({
            id: artiste.id,
            nom: artiste.Nom,
            genre: artiste.Genre_musical,
            scene: artiste.expand?.Scene_associee?.Nom,
        }))
    );
} catch (e) {
    console.error(e);
}


// --- Test 4 : Infos d'un artiste par id ---
console.log("\n=== 4. Infos artiste par id ===");
try {
    const artiste = await getArtiste(ARTISTE_ID);

    console.log("Id :", artiste.id);
    console.log("Nom :", artiste.Nom);
    console.log("Genre :", artiste.Genre_musical);
    console.log("Début :", artiste.Debut_representation);
    console.log("Fin :", artiste.Fin_representation);
    console.log("Scène :", artiste.expand?.Scene_associee?.Nom);
} catch (e) {
    console.error(e);
}


// --- Test 5 : Infos d'une scène par id ---
console.log("\n=== 5. Infos scène par id ===");
try {
    const scene = await getScene(SCENE_1_ID);

    console.log("Id :", scene.id);
    console.log("Nom :", scene.Nom);
    console.log("Localisation :", scene.Localisation);
    console.log("Description :", scene.Description_scene);
} catch (e) {
    console.error(e);
}


// --- Test 6 : Artistes d'une scène par id ---
console.log("\n=== 6. Artistes par scène (id) ===");
try {
    const artistes = await getArtistesBySceneId(SCENE_1_ID);

    console.log("Scène :", SCENE_1_NAME);

    console.table(
        artistes.map((artiste) => ({
            id: artiste.id,
            nom: artiste.Nom,
            debut: artiste.Debut_representation,
            fin: artiste.Fin_representation,
        }))
    );
} catch (e) {
    console.error(e);
}


// --- Test 7 : Artistes d'une scène par nom ---
console.log("\n=== 7. Artistes par scène (nom) ===");
try {
    const artistes = await getArtistesBySceneName(SCENE_1_NAME);

    console.log("Scène :", SCENE_1_NAME);

    console.table(
        artistes.map((artiste) => ({
            id: artiste.id,
            nom: artiste.Nom,
            debut: artiste.Debut_representation,
            fin: artiste.Fin_representation,
        }))
    );
} catch (e) {
    console.error(e);
}


// --- Test 8 : Modifier un artiste (toggle favori) ---
console.log("\n=== 8. Modifier un artiste (favori) ===");
try {
    const artiste = await getArtiste(ARTISTE_ID);
    const avant = artiste.Favori;

    const updated = await updateArtiste(ARTISTE_ID, {
        Favori: !avant,
    });

    console.log("Artiste :", updated.Nom);
    console.log("Favori avant :", avant, "-> après :", updated.Favori);

    await updateArtiste(ARTISTE_ID, {
        Favori: avant,
    });

    console.log("(remis à la valeur initiale)");
} catch (e) {
    console.error(e);
}


// --- Test 9 : Modifier une scène ---
console.log("\n=== 9. Modifier une scène ===");
try {
    const scene = await getScene(SCENE_1_ID);
    const avant = scene.Description_scene;

    const updated = await updateScene(SCENE_1_ID, {
        Description_scene: "Description modifiée pour le test",
    });

    console.log("Scène :", updated.Nom);
    console.log("Description après modification :", updated.Description_scene);

    await updateScene(SCENE_1_ID, {
        Description_scene: avant,
    });

    console.log("(remis à la valeur initiale)");
} catch (e) {
    console.error(e);
}


// --- Test 10 : Créer un artiste de test ---
console.log("\n=== 10. Créer un artiste de test ===");
try {
    const newArtiste = await createArtiste({
        Nom: "Artiste Test",
        Debut_representation: "2026-06-29 20:00:00.000Z",
        Fin_representation: "2026-06-29 21:00:00.000Z",
        Image_artiste: null,
        Favori: false,
        Scene_associee: SCENE_1_ID,
        Description: "Ceci est un artiste de test",
        Genre_musical: "Test",
    });

    if (newArtiste) {
        console.log("Artiste créé :", newArtiste.Nom);
        console.log("Id :", newArtiste.id);
    }
} catch (e) {
    console.error(e);
}


// --- Test 11 : Créer une scène de test ---
console.log("\n=== 11. Créer une scène de test ===");
try {
    const newScene = await createScene({
        Nom: "Scène Test",
        Localisation: "Lieu de test",
        Description_scene: "Ceci est une scène de test",
    });

    if (newScene) {
        console.log("Scène créée :", newScene.Nom);
        console.log("Id :", newScene.id);
    }
} catch (e) {
    console.error(e);
}


// --- Test 12 : URL image artiste ---
console.log("\n=== 12. Test URL image ===");
try {
    const artiste = await getArtiste(ARTISTE_ID);

    if (artiste.Image_artiste) {
        const url = getImageUrl(artiste, artiste.Image_artiste);
        console.log("URL image :", url);
    } else {
        console.log("Pas d'image principale pour cet artiste.");
    }
} catch (e) {
    console.error(e);
}