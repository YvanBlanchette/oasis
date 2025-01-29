<style scoped>
.primary-button {
  @apply bg-white text-black font-bold uppercase tracking-widest text-sm;
  transition: background-color 0.3s ease;
}

.primary-button:hover {
  @apply bg-primary ;
}

.primary-button:active {
  @apply bg-primary ;
}

.primary-button.is-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.primary-button.is-loading {
  @apply opacity-50 cursor-not-allowed;
}

.primary-button.size-xs {
  @apply py-0.5 px-2;
}

.primary-button.size-sm {
  @apply py-1 px-3;
}

.primary-button.size-md {
  @apply  py-2 px-4;
}

.primary-button.size-lg {
  @apply py-4 px-6;
}

.primary-button.variant-secondary {
  @apply bg-primary hover:bg-primary-dark font-bold rounded-md;
}

.primary-button.variant-outlined {
  @apply bg-transparent text-primary font-bold border border-primary;
}

.primary-button.variant-ghost {
  @apply bg-transparent hover:text-primary font-bold;
}
</style>

<script>
export default {
  name: 'PrimaryButton',
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value),
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outlined', 'ghost'].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Envoyer',
    },
  },
  computed: {
    sizeClass() {
      return `size-${this.size}`;
    },
    variantClass() {
      return `variant-${this.variant}`;
    },
  },
};
</script>

<template>
  <button
    :class="[
      'primary-button',
      { 'is-disabled': disabled },
      { 'is-loading': loading },
      sizeClass,
      variantClass,
    ]"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot />
    <i v-if="loading" class="fas fa-spinner animate-spin" />
  </button>
</template>