<template>
  <div>
    <h1 class="title">{{ $t('common.latestPosts') }}</h1>
    <post-list class="mt-6"></post-list>
  </div>
</template>
<script>
import PostList from '@/components/organisms/PostList'

export default{
  name: 'Top',

  components: {
    PostList,
  },

  data(){
    return {
    }
  },

  computed: {
  },

  created() {
  }
}
</script>

