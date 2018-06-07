const ID = "58d8add1-52ba-4ee9-9592-e151ee74f1c6";
const headers = { "Content-Type": "application/x-www-form-urlencoded" };
const frontURL = "https://animalrestapi.azurewebsites.net";
const backURL = `?candidateID=${ID}`;

export const APIHandler = {
  async getList() {
    try {
      let response = await fetch(`${frontURL}/Animal/List${backURL}`, {
        headers: headers
      });
      if (response.ok) {
        let animals = await response.json();
        return animals.list;
      } else throw new Error("Request Failed.");
    } catch (error) {
      console.log(error);
    }
  },
  async getAnimalDetails(id) {
    try {
      let response = await fetch(`${frontURL}/Animal/Id/${id}${backURL}`, {
        headers: headers
      });
      if (response.ok) {
        let res = await response.json();
        return res.animal;
      } else throw new Error("Request Failed.");
    } catch (error) {
      console.log(error);
    }
  },
  async addAnimal(animal) {
    try {
      let response = await fetch(
        `${frontURL}/Animal/Create${backURL}&commonName=${
          animal.commonName
        }&scientificName=${animal.scientificName}&family=${
          animal.family
        }&imageURL=${animal.imageURL}`,
        {
          headers: headers,
          method: "POST"
        }
      );
      if (response.ok) {
        let res = await response.json();
        return res;
      } else throw new Error("Request Failed.");
    } catch (error) {
      console.log(error);
    }
  },
  async deleteAnimal(id) {
    try {
      let response = await fetch(
        `${frontURL}/Animal/Delete${backURL}&id=${id}`,
        {
          headers: headers,
          method: "POST"
        }
      );
      if (response.ok) {
        let res = await response.json();
        return res;
      } else throw new Error("Request Failed.");
    } catch (error) {
      console.log(error);
    }
  }
};
