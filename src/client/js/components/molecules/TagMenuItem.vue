<template>
<li>
  <router-link
    :class="{ 'is-active': activeLabel == tag.label }"
    :to="`/posts/tags/${tag.label}`"
  >{{ tag.label }}</router-link>
</li>
</template>

<script>
export default {
  name: 'TagMenuItem',

  props: {
    tag: {
      type: Object,
      default: null,
    },

    activeLabel: {
      type: String,
      default: '',
    },
  },
}
</script>

