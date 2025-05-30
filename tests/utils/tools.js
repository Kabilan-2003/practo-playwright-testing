import { writeFile } from "fs"

export class Tools {
  saveJson(data) {
    writeFile(
      "data/filteredHospitals.json",
      JSON.stringify(data, null, 2),
      err => {
        if (err) {
          console.log("Sorry can't write the file", err)
        }
      }
    )
  }
}
