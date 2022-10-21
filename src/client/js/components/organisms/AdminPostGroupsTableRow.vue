<template>
  <tr>
    <td class="is-size-6">{{ group.slug }}</td>
    <td class="is-size-6">{{ group.label }}</td>
    <td>
      <router-link
        :to="`/admin/posts/${serviceId}/groups/${slug}/edit`"
        class="button is-small"
      >
        <span class="icon is-small">
          <i class="fas fa-pen"></i>
        </span>
      </router-link>
    </td>
    <td>
      <button
        @click="confirmDelete()"
        class="button is-small"
      >
        <span class="icon is-small">
          <i class="fas fa-trash"></i>
        </span>
      </button>
    </td>
  </tr>
</template>
<script>
import { Admin } from '@/api'

export default{
  name: 'AdminPostGroupsTableRow',

  components: {
  },

  props: {
    group: {
      type: Object,
      default: null,
    },
  },

  data(){
    return {
    }
  },

  computed: {
    slug() {
      return this.group.slug
    }
  },

  watch: {
  },

  created() {
  },

  methods: {
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

