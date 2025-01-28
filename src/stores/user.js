import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      users: null,
      staff: null,
      message: '',
      errors: {}
    }
  },
  actions: {
    //-------------------- Get users from the db --------------------/
    async getUsers() {
      const response = await fetch("/api/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        this.users = data.users;
        return this.users;
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
        this.user = data.user;
        this.isAuthenticated = true;
        this.router.push({ name: "home" });
      }
    },
    //-------------------- Create user --------------------/
    async createUser(userData) {
      const response = await fetch('/api/users/', {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        this.message = data.message;
        console.log(this.message);
      } else {
        this.errors = data.errors;
      }
    },
    //-------------------- Update user --------------------/
    async updateUser(user_id, user) {
      const response = await fetch(`/api/users/${user_id}`, {
        method: "put",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        this.user = data.user;
        this.message = data.message;
        console.log(this.user);
        console.log(this.message);
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