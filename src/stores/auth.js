import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: null,
      isAuthenticated: false,
      errors: {},
    }
  },
  actions: {
  //-------------------- Get authenticated user --------------------/
  async getUser() {
    if (localStorage.getItem("token")) {
      const response = await fetch("/api/profile", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        this.user = data.user;
        this.isAuthenticated = true;
        return data.user;
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
    //-------------------- Logout user --------------------/
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
  }
});