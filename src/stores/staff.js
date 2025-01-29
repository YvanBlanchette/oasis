import { defineStore } from 'pinia'

export const useStaffStore = defineStore('staffStore', {
  state: () => {
    return {
      staff: null,
      message: '',
      errors: {}
    }
  },
  actions: {
    //*-------------------- Get staff members from the db --------------------*//
    async getStaff() {
      const response = await fetch("/api/staff", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        this.staff = data.staff;
        return this.staff;
      }
    },
    //*-------------------- Login / Register user --------------------*//
    async authenticate(apiRoute, formData) {
      const response = await fetch(`/api/${apiRoute}`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.errors) {
        this.errors = data.errors;
        console.log(data.errors);
      } else {
        this.errors = {};
        this.user = data.user;
        this.isAuthenticated = true;
        this.router.push({ name: "home" });
      }
    },
    //*-------------------- Create staff --------------------*//
    async createStaff(staffData) {
      const response = await fetch('/api/staff/', {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(staffData),
      });

      const data = await response.json();

      if (response.ok) {
        this.staff = data.staff;
        this.message = data.message;
        
      } else {
        this.errors = data.errors;
      }
    },
    //*-------------------- Update staff --------------------*//
    async updateStaff(staff_id, staffData) {
      const response = await fetch(`/api/staff/${staff_id}`, {
        method: "put",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(staffData),
      });

      const data = await response.json();

      if (response.ok) {
        this.staff = data.staff;
        this.message = data.message;
        
      } else {
        this.errors = data.errors;
      }
    },
    //*-------------------- Toggle staff status --------------------*//
    async toggleStatus(staff_id) {
      const response = await fetch(`/api/staff/${staff_id}`, {
        method: "get",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();

      if (response.ok) {
        this.staff = data.staff;
        this.message = data.message;
        
      } else {
        this.errors = data.errors;
      }
    },
    //*-------------------- Delete staff --------------------*//
    async deleteStaff(staff_id) {
      const response = await fetch(`/api/staff/${staff_id}`, {
        method: "delete",
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
  }
});