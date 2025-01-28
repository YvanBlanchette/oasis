import { defineStore } from "pinia";

export const useReservationStore = defineStore('reservationStore', {
  state: () => {
    return {
      reservations: null,
      summerReservations: null,
      winterReservations: null,
      message: '',
    }
  },
  actions: {
    //-------------------- Get Reservations --------------------/
    async getReservations(url = '/api/reservations') {
      try {
        this.reservations = null;
  
        const response = await fetch(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
        const data = await response.json();
        this.reservations = data.reservations;
        this.message = data.message;
        return this.reservations;
      } catch (error) {
        console.error(error);
      }
    },
      //-------------------- Get Previous Page Results --------------------/
      async getPreviousPageResults() {
        if (this.reservations.prev_page_url) {
          await this.getReservations(this.reservations.prev_page_url);
        }
      },
    //-------------------- Get Next Page Results --------------------/
    async getNextPageResults() {
      if (this.reservations.next_page_url) {
        await this.getReservations(this.reservations.next_page_url);
      }
    },
    //-------------------- Get Reservation by id --------------------/
    async getReservation(reservation_id) {
      try {
        this.reservation = null;
        this.message = null;

        const response = await fetch(`/api/reservations/${reservation_id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        this.message = data.message;
        this.reservation = data;
        console.log(data);
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
      }
    },
    //-------------------- Delete reservation --------------------/
    async deleteReservation(reservation_id) {
      const response = await fetch(`/api/reservations/${reservation_id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        this.message = data.message;
        console.log(this.message);
      } else {
        this.errors = data.errors;
      }
    },
    //-------------------- Delete reservation --------------------/
    async makeReservation(reservationData) {
      const response = await fetch(`/api/reservations/`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (response.ok) {
        this.message = data.message;
        console.log(this.message);
      } else {
        this.errors = data.errors;
      }
    },


  }
})