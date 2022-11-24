import { ref, onMounted, onUnmounted } from "vue";

import debounce from "lodash/debounce";

export function useToggle(initial) {
  const value = ref(initial);

  function toggle() {
    value.value = !value.value;
  }

  return [value, toggle];
}

export function useKeyboard(keys, fn, type = "keydown") {
  const handleKeyboard = (event) => {
    if (keys.length === 0) {
      fn(event);
      return;
    }

    if (keys.includes(event.key)) {
      fn(event);
    }
  };

  onMounted(() => {
    window.addEventListener(type, handleKeyboard);
  });

  onUnmounted(() => {
    window.removeEventListener(type, handleKeyboard);
  });

  return null;
}

export function useWindowSize() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const onResize = debounce(() => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }, 300);

  onMounted(() => {
    window.addEventListener("resize", onResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });

  return { width, height };
}
