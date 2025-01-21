import { defineStore } from "pinia";

export const useActivityStore = defineStore('activityStore', {
  state: () => {
    return {
      activities: null,
      summerActivities: null,
      winterActivities: null,
      message: '',
    }
  },
  actions: {
    //-------------------- Get Activities --------------------/
    async getActivities() {
      try {
        this.activities = null;
        this.summerActivities = null;
        this.winterActivities = null;

        const response = await fetch("/api/activities");

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        this.message = data.message;
        this.activities = data.activities;
        this.summerActivities = data.summerActivities;
        this.winterActivities = data.winterActivities;
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
      }
    },
    //-------------------- Get Activity by id --------------------/
    async getActivity(activity_id) {
      try {
        this.activity = null;
        this.message = null;

        const response = await fetch(`/api/activities/${activity_id}`);

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        this.message = data.message;
        this.activity = data;
        console.log(data);
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
      }
    }
  }
})