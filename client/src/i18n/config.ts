import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      common: {
        welcome: "Welcome to Serenity",
        login: "Login",
        register: "Register",
        logout: "Logout",
        submit: "Submit",
        cancel: "Cancel",
        save: "Save",
        delete: "Delete",
        edit: "Edit",
        loading: "Loading...",
        error: "An error occurred",
        success: "Success",
        offline: "You are offline. Changes will sync when you reconnect.",
      },
      auth: {
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        fullName: "Full Name",
        role: "I am a",
        patient: "Patient",
        doctor: "Doctor",
        loginTitle: "Sign in to your account",
        registerTitle: "Create an account",
        forgotPassword: "Forgot password?",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
      },
      dashboard: {
        title: "Dashboard",
        newConsultation: "New Consultation",
        myConsultations: "My Consultations",
        messages: "Messages",
        photos: "Photos",
        settings: "Settings",
      },
      consultation: {
        title: "Consultation",
        chiefComplaint: "What brings you here today?",
        symptoms: "Symptoms",
        duration: "Duration",
        severity: "Severity",
        attachPhotos: "Attach Photos",
        submit: "Submit Consultation",
        status: {
          pending: "Pending",
          "in-progress": "In Progress",
          completed: "Completed",
          cancelled: "Cancelled",
        },
      },
      notifications: {
        newMessage: "New message from your doctor",
        consultationUpdate: "Your consultation has been updated",
        appointmentConfirmation: "Appointment confirmed",
      },
    },
  },
  es: {
    translation: {
      common: {
        welcome: "Bienvenido a Serenity",
        login: "Iniciar sesión",
        register: "Registrarse",
        logout: "Cerrar sesión",
        submit: "Enviar",
        cancel: "Cancelar",
        save: "Guardar",
        delete: "Eliminar",
        edit: "Editar",
        loading: "Cargando...",
        error: "Ocurrió un error",
        success: "Éxito",
        offline:
          "Estás sin conexión. Los cambios se sincronizarán cuando te reconectes.",
      },
      auth: {
        email: "Correo electrónico",
        password: "Contraseña",
        confirmPassword: "Confirmar contraseña",
        fullName: "Nombre completo",
        role: "Soy",
        patient: "Paciente",
        doctor: "Doctor",
        loginTitle: "Inicia sesión en tu cuenta",
        registerTitle: "Crear una cuenta",
        forgotPassword: "¿Olvidaste tu contraseña?",
        noAccount: "¿No tienes una cuenta?",
        hasAccount: "¿Ya tienes una cuenta?",
      },
      dashboard: {
        title: "Panel",
        newConsultation: "Nueva Consulta",
        myConsultations: "Mis Consultas",
        messages: "Mensajes",
        photos: "Fotos",
        settings: "Configuración",
      },
      consultation: {
        title: "Consulta",
        chiefComplaint: "¿Qué te trae aquí hoy?",
        symptoms: "Síntomas",
        duration: "Duración",
        severity: "Gravedad",
        attachPhotos: "Adjuntar fotos",
        submit: "Enviar consulta",
        status: {
          pending: "Pendiente",
          "in-progress": "En progreso",
          completed: "Completado",
          cancelled: "Cancelado",
        },
      },
      notifications: {
        newMessage: "Nuevo mensaje de tu doctor",
        consultationUpdate: "Tu consulta ha sido actualizada",
        appointmentConfirmation: "Cita confirmada",
      },
    },
  },
  fr: {
    translation: {
      common: {
        welcome: "Bienvenue à Serenity",
        login: "Se connecter",
        register: "S'inscrire",
        logout: "Se déconnecter",
        submit: "Soumettre",
        cancel: "Annuler",
        save: "Enregistrer",
        delete: "Supprimer",
        edit: "Modifier",
        loading: "Chargement...",
        error: "Une erreur est survenue",
        success: "Succès",
        offline:
          "Vous êtes hors ligne. Les modifications seront synchronisées lorsque vous vous reconnecterez.",
      },
      auth: {
        email: "E-mail",
        password: "Mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        fullName: "Nom complet",
        role: "Je suis",
        patient: "Patient",
        doctor: "Médecin",
        loginTitle: "Connectez-vous à votre compte",
        registerTitle: "Créer un compte",
        forgotPassword: "Mot de passe oublié?",
        noAccount: "Vous n'avez pas de compte?",
        hasAccount: "Vous avez déjà un compte?",
      },
      dashboard: {
        title: "Tableau de bord",
        newConsultation: "Nouvelle consultation",
        myConsultations: "Mes consultations",
        messages: "Messages",
        photos: "Photos",
        settings: "Paramètres",
      },
      consultation: {
        title: "Consultation",
        chiefComplaint: "Qu'est-ce qui vous amène ici aujourd'hui?",
        symptoms: "Symptômes",
        duration: "Durée",
        severity: "Gravité",
        attachPhotos: "Joindre des photos",
        submit: "Soumettre la consultation",
        status: {
          pending: "En attente",
          "in-progress": "En cours",
          completed: "Terminé",
          cancelled: "Annulé",
        },
      },
      notifications: {
        newMessage: "Nouveau message de votre médecin",
        consultationUpdate: "Votre consultation a été mise à jour",
        appointmentConfirmation: "Rendez-vous confirmé",
      },
    },
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "es", "fr"],
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    interpolation: {
      escapeValue: false,
    },
    /*  detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    }, */
  });

export default i18n;
