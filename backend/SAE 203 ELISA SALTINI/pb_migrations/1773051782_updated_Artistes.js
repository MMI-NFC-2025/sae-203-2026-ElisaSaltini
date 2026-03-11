/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1154068080")

  // remove field
  collection.fields.removeById("text775329374")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "select775329374",
    "maxSelect": 1,
    "name": "Genre_musical",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Jazz",
      "Fanfare",
      "Musique du Monde"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1154068080")

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text775329374",
    "max": 0,
    "min": 0,
    "name": "Genre_musical",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select775329374")

  return app.save(collection)
})
