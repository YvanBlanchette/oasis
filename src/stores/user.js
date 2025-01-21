import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      users: null,
      guests: null,
      staff: null,
      admin: null,
      employes: null,
      errors: {}
    }
  },
  actions: {
  //-------------------- Get authenticated user --------------------/
  async getUsers() {
    if (localStorage.getItem("token")) {
      const response = await fetch("/api/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        this.users = data.users;
        this.guests = data.guests;
        this.staffs = data.staffs;
        this.admins = data.admins;
        this.employes = [...data.admins, ...data.staffs];
        return data.users;
      }
    }
  },
    //-------------------- Login / Register user --------------------/
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
        localStorage.setItem('token', data.token);
        this.user = data.user;
        this.isAuthenticated = true;
        this.router.push({ name: "home" });
      }
    },
    //-------------------- Logout user --------------------//
    async logout() {
      const response = await fetch("/api/logout", {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        this.user = null;
        this.isAuthenticated = false;
        this.errors = {};
        localStorage.removeItem("token");
        this.router.push({ name: "auth" });
      } else {
        this.errors = data.errors;
      }
    },
    //-------------------- Delete user --------------------/
    async deleteUser(user_id) {
      const response = await fetch(`/api/users/${user_id}`, {
        method: "delete",
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
  }
});