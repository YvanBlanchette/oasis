import { defineStore } from "pinia";

export const useReservationStore = defineStore('reservationStore', {
  state: () => {
    return {
      reservations: null,
      reservation: null,
      message: '',
    }
  },
  actions: {
    //*-------------------- Get Reservations --------------------*//
    async getReservations(url="/api/reservations") {
        const response = await fetch(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
      const data = await response.json();
      if (response.ok) {
        this.reservations = data.reservations;
        this.message = data.message;
        return this.reservations;
      }
    },
    //*-------------------- Get Next Page Results --------------------*//
    async getNextPageResults() {
      if (this.reservations.next_page_url) {
        await this.getReservations(this.reservations.next_page_url);
      }
    },
    //*-------------------- Get Reservation by id --------------------*//
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
    //*-------------------- Delete reservation --------------------*//
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
        
      } else {
        this.errors = data.errors;
      }
    },
    //*-------------------- Make a reservation --------------------*//
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
        
      } else {
        this.errors = data.errors;
      }
    },
    //*-------------------- Edit a reservation --------------------*//
    async editReservation(reservationData, reservation_id) {
      const response = await fetch(`/api/reservations/${reservation_id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (response.ok) {
        this.message = data.message;
        
      } else {
        this.errors = data.errors;
      }
    },
    //*-------------------- Get all reservations from a user --------------------*//
    async getUserReservations(email) {
      if (!email) {
        return;
      }

      const response = await fetch(`/api/reservations/users/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify({email: email}),
      });

      const data = await response.json();

      if (response.ok) {
        this.reservations = data.reservations;
        this.message = data.message;
      } else {
        this.errors = data.errors;
      }
    },
    //*-------------------- Remove all reservations from a user --------------------*//
    async removeAllUserReservations(email) {
      const response = await fetch(`/api/reservations/users/remove-all`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify({email: email}),
      });

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        this.reservations = data.reservations;
        this.message = data.message;
        
      } else {
        this.errors = data.errors;
      }
    },
  }
})