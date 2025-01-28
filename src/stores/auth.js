//*-------------------- Imports --------------------*//
import { auth } from "@/firebase";
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { admin, staff } from '@/assets/data/usersInfos';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";


export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      credentials: {},
      user: null,
      isLoading: false,
      isAuthenticated: false,
      isStaff: false,
      isAdmin: false,
      errors: {},
      message: '',
      router: null,
    }
  },
  actions: {
    init() {
      this.router = useRouter();
    },
    //*-------------------- Set data (for persistence of the store data) --------------------*//
    setData() {
      if( localStorage.getItem('user') ) this.user = JSON.parse(localStorage.getItem('user'));
      if (localStorage.getItem('isAuthenticated')) this.isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
      if (localStorage.getItem('isStaff')) this.isStaff = JSON.parse(localStorage.getItem('isStaff'));
      if (localStorage.getItem('isAdmin')) this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    },
    //*-------------------- Login router --------------------*//
    async loginRouter(credentials) {
      console.log(credentials.email, credentials.password);
      this.credentials = {
        email: credentials.email,
        password: credentials.password
      }

      // If the email is admin@oasis.com or staff@oasis.com, then login with our basic authentication
      if (credentials.email === "admin@oasis.com" || credentials.email === "staff@oasis.com") {
        this.login(credentials);
      // Otherwise use the Firebase authentication system
      } else {
       await this.loginEmailPassword();
      }
    },
    //*-------------------- Basic Login using the store --------------------*//
    login(credentials) {
      try {
        // If the email is admin@oasis.com and the password is password, then login with our VERY basic authentication
        if (credentials.email === "admin@oasis.com" && credentials.password === "password") {

          // Store the authentication with local storage
          this.storeBasicAuthentication('admin');

          // Redirect to the home page
          this.router.push({ name: "home" });

        // Else if the email is staff@oasis.com and the password is password, then login with our VERY basic authentication
        } else if (credentials.email === "staff@oasis.com" && credentials.password === "password") {

          // Store the authentication with local storage
          this.storeBasicAuthentication('staff');

          // Redirect to the home page
          this.router.push({ name: "home" });

        }

      } catch (error) {
        console.log("Échec de la connexion: ", error);
        this.errors = error;
      } finally {
        // Set loading state to false
        this.isLoading = false;
      }
      
    },
    //*-------------------- FIREBASE // Register user with email and password --------------------*//
    async registerEmailPassword(credentials) {
      try {
        // Set loading state to true
        this.isLoading = true;

        // Register the user with Firebase
        const result = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

        // Update the user's display name in Firebase
        await updateProfile(result.user, {
          displayName: credentials.displayName,
        });

        // Store the authentication with local storage
        this.storeAuthentication(result);

        // Redirect to the home page
        this.router.push({ name: "home" });
      } catch (error) {
        // Log the error
        console.log("Échec de la création de l'utilisateur: ", error);

        // Set the error message
        this.errors = error;
      } finally {
        // Set loading state to false
        this.isLoading = false;
      }
    },

    //*-------------------- FIREBASE // Login user with email and password --------------------//
    async loginEmailPassword() {
      try {
        // Set loading state to true
        this.isLoading = true;

        // Authenticate with Firebase
        const result = await signInWithEmailAndPassword(auth, this.credentials.email, this.credentials.password);
        
        console.log(result);

        // Store the authentication with local storage
        this.storeAuthentication(result);

        // Redirect to the home page
        this.router.push({ name: "home" });
      } catch (error) {
        // Log the error
        console.log("Échec de l'authentification: ", error);

        // Set the error message
        this.errors = error;
      } finally {
        // Set loading state to false
        this.isLoading = false;
      }
    },
    //*-------------------- FIREBASE // Logout user --------------------*//
    async logout() {
      try {
        // Set loading state to true
        this.isLoading = true;

        // Sign out using Firebase
        const result = await signOut(auth);

        // Remove the authentication from local storage
        this.removeAuthentication();
      } catch (error) {
        // Log the error
        console.log("Erreur lors de la deconnexion: ", error);
      } finally {
        // Set loading state to false
        this.isLoading = false;
      }
    },
    //*-------------------- Persist data with local storage --------------------*//
    storeBasicAuthentication(role) {
      if (role === 'admin') {
        this.user = admin;
        this.isStaff = true;
        this.isAdmin = true;
        this.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('isStaff', JSON.stringify(this.isStaff));
        localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
        localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated));
      } else if (role === 'staff') {
        this.user = staff;
        this.isStaff = true;
        this.isAdmin = false;
        this.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('isStaff', JSON.stringify(this.isStaff));
        localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
        localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated));
      }
    },
    //*-------------------- Persist data with local storage --------------------*//
    storeAuthentication(result) {
      this.user = result.user;
      this.isAuthenticated = true;
      // reset user and isAuthenticated in local storage
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      // store user and isAuthenticated in local storage
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated));
    },
    //*-------------------- Remove authentication state --------------------*//
    removeAuthentication() {
      this.user = null;
      this.isAuthenticated = false;
      this.isStaff = false;
      this.isAdmin = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('isStaff');
      localStorage.removeItem('isAdmin');
    },
  },
});