/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1154068080")

  // remove field
  collection.fields.removeById("date2816207")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date1512687755",
    "max": "",
    "min": "",
    "name": "Debut_representation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date2125828043",
    "max": "",
    "min": "",
    "name": "Fin_representation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1154068080")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date2816207",
    "max": "",
    "min": "",
    "name": "Date_representation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date1512687755",
    "max": "",
    "min": "",
    "name": "Heure_debut_representation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "date2125828043",
    "max": "",
    "min": "",
    "name": "Heure_fin_representation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
