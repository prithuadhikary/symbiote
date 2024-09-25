import { wait } from "@testing-library/user-event/dist/utils";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  'en-US': {
    translation: {
      // The default messages are in english.
    }
  },
  'fr-FR': {
    translation: {
      // Login Screen
      "Login": "Se connecter",
      "Email Address (Username)": "Adresse e-mail (nom d'utilisateur)",
      "Password": "Mot de passe",
      "Username is required": "Le nom d'utilisateur est requis",
      "Invalid email format": "Format d'e-mail invalide",
      "Password is required": "Le mot de passe est requis",
      "Remember me": "Souviens-toi de moi",
      "Forgot your password?": "Vous avez oublié votre mot de passe ?",
      "Don't have an account?": "Vous n'avez pas de compte ?",
      "Sign up": "S'inscrire",

      //Signup Screen
      "First Name": "Prénom",
      "Username is already taken.": "Le nom d'utilisateur est déjà pris.",
      "First name is required": "Le prénom est obligatoire",
      "Last Name": "Nom de famille",
      "Last name is required": "Le nom de famille est obligatoire",
      "Password must be at least 8 characters long": "Le mot de passe doit comporter au moins 8 caractères",
      "Confirm Password": "Confirmez le mot de passe",
      "Please confirm your password": "Veuillez confirmer votre mot de passe.",
      "Passwords do not match.": "Les mots de passe ne correspondent pas.",
      "You must accept the terms.": "Vous devez accepter les termes.",
      "I accept the Terms and Conditions.": "J'accepte les termes et conditions",
      "Already have an account?": "Vous avez déjà un compte ?"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      wait: true,
      useSuspense: false
    }
  });

export default i18n;