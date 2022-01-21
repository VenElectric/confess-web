import { ref, computed, onMounted, onUnmounted } from "vue";
import axios from "axios";

export const signup = (username, password) => {

    axios.post()
}

export const logmein = (username, password) => {

}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const AuthState = () => {
  const user = ref(null);
  const error = ref(null);

  let unsubscribe;
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      (user_value) => (user.value = user_value),
      (error_value) => (error.value = error_value)
    );
  });
  onUnmounted(() => unsubscribe());

  const isAuthenticated = computed(() => user.value != null);

  return { user, error, isAuthenticated };
};
