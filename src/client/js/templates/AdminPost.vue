<template>
<div v-if="post">

  <b-message
    v-if="isPublished === false"
    type="is-warning"
  >{{ $t('msg.thisIsNotPublished', {name: $t('common.post')}) }}</b-message>

  <div class="block">
    <router-link :to="`/admin/posts/${serviceId}`">
      <i class="fas fa-chevron-left"></i>
      <span>{{ $t('common.posts') }}</span>
    </router-link>
  </div>

  <h1 class="title">
    <span
      v-if="isPublishItem === false"
      class="tag is-dark"
    >{{ $t('common.unpublished') }}</span>

    {{ post.title }}
  </h1>

  <div class="is-pulled-right">
    <eb-dropdown
      position="is-bottom-left"
    >
      <span
        slot="label"
        class="icon"
      >
        <i class="fas fa-edit"></i>
      </span>
      <div class="dropdown-content">
        <router-link
          :to="`/admin/posts/${serviceId}/${post.slug}/edit`"
          class="dropdown-item"
        >
          <span class="icon">
            <i class="fas fa-pen"></i>
          </span>
          <span>{{ $t('common.edit') }}</span>
        </router-link>

        <a
          v-if="isPublishItem"
          @click="updateStatus(false)"
          class="dropdown-item is-clickable"
        >
          <span class="icon">
            <i class="fas fa-lock"></i>
          </span>
          <span>{{ $t('common.unpublish') }}</span>
        </a>

        <a
          v-else
          @click="confirmPublish()"
          class="dropdown-item is-clickable"
        >
          <span class="icon">
            <i class="fas fa-globe"></i>
          </span>
          <span>{{ $t('common.publish') }}</span>
        </a>

      </div>
    </eb-dropdown>
  </div>

  <div>
    {{ post.body }}
  </div>

  <ul class="mt-5">
    <li>
      <label>{{ $t('common.category') }}</label>
      <span>{{ post.category.label }}</span>
    </li>
    <li>
      <label>{{ $t('common.publishAt') }}</label>
      <inline-time :datetime="post.publishAt"></inline-time>
    </li>
    <li>
      <label>{{ $t('common.lastUpdatedAt') }}</label>
      <inline-time :datetime="post.updatedAt"></inline-time>
    </li>
  </ul>

</div>
</template>
<script>
import moment from '@/moment'
import { Admin } from '@/api'
import InlineTime from '@/components/molecules/atoms/InlineTime'
import EbDropdown from '@/components/molecules/EbDropdown'

export default{
  name: 'AdminPost',

  components: {
    InlineTime,
    EbDropdown,
  },

  data(){
    return {
      post: null,
    }
  },

  computed: {
    serviceId() {
      return this.$route.params.serviceId
    },

    slug() {
      return this.$route.params.slug
    },

    isPublished() {
      if (!this.post) return false
      return this.checkPostPublished(this.post.postStatus, this.post.publishAt)
    },

    isPublishItem() {
      if (!this.post) return false
      return this.post.postStatus === 'publish'
    },
  },

  async created() {
    await this.getPost()
  },

  methods: {
    async getPost() {
      this.post = await Admin.getPosts(this.serviceId, this.slug, null, this.adminUserToken)
    },

    confirmPublish() {
      this.$buefy.dialog.confirm({
        message: this.$t('msg.cofirmToPublish'),
        onConfirm: async () => await this.updateStatus(true)
      })
    },

    async getPost() {
      this.post = await Admin.getPosts(this.serviceId, this.slug, null, this.adminUserToken)
    },

    async updateStatus(isPublish = false) {
      try {
        this.$store.dispatch('setLoading', true)
        const postStatus = isPublish ? 'publish' : 'unpublish'
        const res = await Admin.updatePostStatus(this.serviceId, this.slug, postStatus, this.adminUserToken)
        this.$store.dispatch('setLoading', false)
        this.post = res
        this.$emit('posted', res)
      } catch (err) {
        console.log(err);//!!!!!!
        this.$store.dispatch('setLoading', false)
        if (this.checkResponseHasErrorMessage(err, true)) {
          this.setErrors(err.response.data.errors)
        }
        this.handleApiError(err, this.$t(`msg["Edit failed"]`))
      }
    },
  },
}
</script>
