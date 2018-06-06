const ID = '58d8add1-52ba-4ee9-9592-e151ee74f1c6';
const headers = {'Content-Type': 'application/x-www-form-urlencoded'};

export const APIHandler = {
  async getList(){
    try{
      let url = 'https://animalrestapi.azurewebsites.net/Animal/List';
      let response = await fetch(url + '?candidateID=' + ID, {headers: headers});
      if(response.ok){
        let animals = await response.json();
        return animals.list;
      } else throw new Error('Request Failed.');
    } 
    catch (error){
      console.log(error);
    }
  }

}