import { defineStore } from "pinia";

export const useActivityStore = defineStore('activityStore', {
  state: () => {
    return {
      activities: null,
      activity: null,
      message: '',
      errors: {}
    }
  },
  actions: {
    //*-------------------- Get Activities --------------------*//
    async getActivities() {
      try {
        const response = await fetch("/api/activities");

        const data = await response.json();
        this.activities = data.activities;
        this.message = data.message;
      } catch (error) {
        console.error(error);
        this.errors = error;
      }
    },
    //*-------------------- Get Activity<--------------------*//
    async getActivity(activity_id) {
      try {
        const response = await fetch(`/api/activities/${activity_id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        this.activity = data.activity;
        this.message = data.message;
      } catch (error) {
        console.error(error);
        this.errors = error;
      }
    },
    //*-------------------- Toggle Activity status --------------------*//
    async toggleStatus(activity_id) {
      try {
        const response = await fetch(`/api/activities/${activity_id}/toggle-status`, {
          method: "PATCH",
        })

        const data = await response.json();
        this.message = data.message;
        this.activity = data;
        console.log(data);
      } catch (error) {
        console.log(error);
        this.errors = error;
      }
    },
    //*-------------------- Create new Activity --------------------*//
    async createActivity(ActivityData) {
      const response = await fetch(`/api/activities/`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ActivityData),
      })

      const data = await response.json();

      if (response.ok) {
        this.activity = data.activity;
        this.message = data.message;
        
      } else {
        console.log(error);
        this.errors = data.errors;
      }
    },
    //*-------------------- Update Activity --------------------*//
    async updateActivity(activity_id, ActivityData) {
      const response = await fetch(`/api/activities/${activity_id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ActivityData),
      })

      const data = await response.json();

      if (response.ok) {
        this.activity = data.activity;
        this.message = data.message;
        
      } else {
        console.log(error);
        this.errors = data.errors;
      }
      return data;
    },
    //*-------------------- Delete activity --------------------*//
    async deleteActivity(activity_id) {
      const response = await fetch(`/api/activities/${activity_id}`, {
        method: "delete",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        this.message = data.message;
      } else {
        console.log(error);
        this.errors = data.errors;
      }
    },
  }
  });