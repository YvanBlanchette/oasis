import { defineStore } from 'pinia'
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useRouter } from 'vue-router';


export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      errors: {},
      router: null,
    }
  },
  actions: {
    init() {
      this.router = useRouter();
    },
    //-------------------- Register user with email and password --------------------/
    async registerEmailPassword(credentials) {
      try {
        this.isLoading = true;
        const result = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        this.user = result.user;
        await updateProfile(this.user, {
          displayName: credentials.name,
          });
        this.isAuthenticated = true;
        this.router.push({ name: "home" });
      } catch (error) {
        console.error("Échec de la création de l'utilisateur: ", error);
      } finally {
        this.isLoading = false;
      }
    },
    //-------------------- Login user with email and password --------------------/
    async loginEmailPassword(credentials) {
      try {
        this.isLoading = true;
        const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        this.user = result.user;
        console.log(this.user);
        this.isAuthenticated = true;
        this.router.push({ name: "home" });
      } catch (error) {
        console.error("Échec de l'authentification: ", error);
        this.errors = error;
        console.log(this.errors);
      } finally {
        this.isLoading = false;
      }
    },
    //-------------------- Logout user --------------------/
    async logout() {
      try {
        this.isLoading = true;
        const result = await signOut(auth);
        console.log(result);
        this.user = null;
        this.isAuthenticated = false;
        this.router.push({ name: "auth" });
      } catch (error) {
        console.error("Erreur lors de la deconnexion: ", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});