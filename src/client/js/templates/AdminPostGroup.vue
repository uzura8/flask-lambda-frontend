<template>
<div>
  <div class="block">
    <router-link :to="`/admin/posts/${serviceId}/groups`">
      <i class="fas fa-chevron-left"></i>
      <span>{{ $t('page.AdminPostGroupManagement') }}</span>
    </router-link>
  </div>

  <div v-if="postGroupLabel">
    <h1 class="title">{{ $t('term.postGroup') }}</h1>
    <p class="subtitle is-5">{{ postGroupLabel }}</p>
  </div>

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
          :to="`/admin/posts/${serviceId}/groups/${slug}/edit`"
          class="dropdown-item"
        >
          <span class="icon">
            <i class="fas fa-pen"></i>
          </span>
          <span>{{ $t('common.edit') }}</span>
        </router-link>

        <a
          @click="confirmDelete()"
          class="dropdown-item is-clickable"
        >
          <span class="icon">
            <i class="fas fa-trash"></i>
          </span>
          <span>{{ $t('common.delete') }}</span>
        </a>

      </div>
    </eb-dropdown>
  </div>
  <div class="mt-6">
    <span>
      <button
        class="button"
        @click="isPostModalActive = true"
      >
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>{{ $t('common.addFor', { target:$t('common.post') }) }}</span>
      </button>
    </span>
    <b-modal
      v-model="isPostModalActive"
      :destroy-on-hide="false"
      aria-role="dialog"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default="props">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">
              {{ $t('common.selectFor', { target: $t('common.post') }) }}
            </p>
            <button
              type="button"
              class="delete"
              @click="isPostModalActive = false"
            ></button>
          </header>
          <section class="modal-card-body">
            <post-list
              list-type="simpleSelect"
              @select="addGroupItem"
            ></post-list>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button"
              type="button"
              @click="isPostModalActive = false"
            >{{ $t('common.close') }}</button>
          </footer>
        </div>
      </template>
    </b-modal>
  </div>
  <ul class="mt-5" v-if="groupItems">
    <li
      v-for="post in groupItems"
      :key="post.id"
    >
      {{ post.title }}
    </li>
  </ul>
</div>
</template>
<script>
import { Admin } from '@/api'
import EbDropdown from '@/components/molecules/EbDropdown'
import PostList from '@/components/organisms/PostList'

export default{
  name: 'AdminPostGroup',

  components: {
    EbDropdown,
    PostList,
  },

  data(){
    return {
      postGroupLabel: '',
      groupItems: [],
      posts: [],
      isPostModalActive: false,
    }
  },

  computed: {
    slug() {
      return this.$route.params.slug
    },
  },

  async created() {
    await this.setPostGroup()
  },

  methods: {
    async setPostGroup() {
      const postGroup = await Admin.getPostGroups(this.serviceId, this.slug, null, this.adminUserToken)
      this.postGroupLabel = postGroup.label
      this.postIds = postGroup.postIds
    },

    addGroupItem(post) {
      this.groupItems.push(post)
      this.isPostModalActive = false
    },

    confirmDelete() {
      this.$buefy.dialog.confirm({
        message: this.$t('msg.cofirmToDelete'),
        onConfirm: async () => await this.deletePostGroup()
      })
    },

    async deletePostGroup() {
      try {
        this.$store.dispatch('setLoading', true)
        await Admin.deletePostGroup(this.serviceId, this.slug, this.adminUserToken)
        this.$emit('deleted', this.slug)
        this.$store.dispatch('setLoading', false)
        this.$router.push(`/admin/posts/${this.serviceId}/groups`)
      } catch (err) {
        console.log(err);//!!!!!!
        this.$store.dispatch('setLoading', false)
        if (this.checkResponseHasErrorMessage(err, true)) {
          this.setErrors(err.response.data.errors)
        }
        this.handleApiError(err, this.$t(`msg["Delete failed"]`))
      }
    },
  },
}
</script>

