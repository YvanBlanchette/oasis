import { defineStore } from "pinia";

export const useLodgingStore = defineStore('lodgingStore', {
  state: () => {
    return {
      lodgings: null,
      rooms: null,
      condos: null,
      cabins: null,
      message: '',
    }
  },
  actions: {
    //-------------------- Get Lodgings --------------------/
    async getLodgings() {
      try {
        this.lodgings = null;
        this.rooms = null;
        this.condos = null;
        this.cabins = null;

        const response = await fetch("/api/lodgings", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        this.message = data.message;
        this.lodgings = data.lodgings;
        this.rooms = data.rooms;
        this.condos = data.condos;
        this.cabins = data.cabins;
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
      }
    },
    //-------------------- Get Lodging by id --------------------/
    async getLodging(lodging_id) {
      try {
        this.lodging = null;
        this.message = null;

        const response = await fetch(`/api/lodgings/${lodging_id}`);

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        this.message = data.message;
        this.lodging = data;
        console.log(data);
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
      }
    }
  }
})