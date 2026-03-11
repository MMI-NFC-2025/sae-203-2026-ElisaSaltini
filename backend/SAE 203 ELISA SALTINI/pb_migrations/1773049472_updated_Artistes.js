/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1154068080")

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "date63607400",
    "max": "",
    "min": "",
    "name": "Date_naissance",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1154068080")

  // remove field
  collection.fields.removeById("date63607400")

  return app.save(collection)
})
