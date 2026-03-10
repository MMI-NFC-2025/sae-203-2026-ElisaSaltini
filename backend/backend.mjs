// backend.mjs - Accès à la base de données PocketBase
// SAÉ 203 - Festival

import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");


// 1. Retourne la liste de tous les artistes triés par date de représentation
export async function getArtistesByDate() {
    try {
        let data = await pb.collection("Artistes").getFullList({
            sort: "Debut_representation",
            expand: "Scene_associee",
        });
        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return [];
    }
}


// 2. Retourne la liste de toutes les scènes triées par nom
export async function getScenesByName() {
    try {
        let data = await pb.collection("Scenes").getFullList({
            sort: "Nom",
        });
        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return [];
    }
}


// 3. Retourne la liste de tous les artistes triés par ordre alphabétique
export async function getArtistesByName() {
    try {
        let data = await pb.collection("Artistes").getFullList({
            sort: "Nom",
            expand: "Scene_associee",
        });
        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return [];
    }
}


// 4. Retourne les infos d'un artiste avec son id
export async function getArtiste(id) {
    try {
        const data = await pb.collection("Artistes").getOne(id, {
            expand: "Scene_associee",
        });
        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return null;
    }
}


// 5. Retourne les infos d'une scène avec son id
export async function getScene(id) {
    try {
        const data = await pb.collection("Scenes").getOne(id);
        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return null;
    }
}


// 6. Retourne tous les artistes d'une scène à partir de son id, triés par date
export async function getArtistesBySceneId(sceneId) {
    try {
        let data = await pb.collection("Artistes").getFullList({
            filter: `Scene_associee = "${sceneId}"`,
            sort: "Debut_representation",
            expand: "Scene_associee",
        });
        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return [];
    }
}


// 7. Retourne tous les artistes d'une scène à partir de son nom, triés par date
export async function getArtistesBySceneName(nomScene) {
    try {
        let scenes = await pb.collection("Scenes").getFullList({
            filter: `Nom = "${nomScene}"`,
        });

        if (scenes.length === 0) {
            return [];
        }

        let data = await pb.collection("Artistes").getFullList({
            filter: `Scene_associee = "${scenes[0].id}"`,
            sort: "Debut_representation",
            expand: "Scene_associee",
        });

        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return [];
    }
}


// 8. Permet d'ajouter ou modifier un artiste
export async function updateArtiste(id, newData) {
    try {
        const data = await pb.collection("Artistes").update(id, newData);
        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return null;
    }
}

export async function createArtiste(newData) {
    try {
        const data = await pb.collection("Artistes").create(newData);
        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return null;
    }
}


// 9. Permet d'ajouter ou modifier une scène
export async function updateScene(id, newData) {
    try {
        const data = await pb.collection("Scenes").update(id, newData);
        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return null;
    }
}

export async function createScene(newData) {
    try {
        const data = await pb.collection("Scenes").create(newData);
        return data;
    } catch (error) {
        console.log("Une erreur est survenue", error);
        return null;
    }
}


// 10. Utilitaire pour récupérer l'URL d'une image PocketBase
export function getImageUrl(record, recordImage) {
    return pb.files.getURL(record, recordImage);
}