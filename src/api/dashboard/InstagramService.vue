<script>
export default {
  name: 'InstagramService',
  data() {
    return {
      accessToken: null,
      userId: null,
      apiVersion: 'v18.0',
      baseUrl: 'https://graph.instagram.com/v18.0'
    }
  },
  methods: {
    async initialize(accessToken) {
      this.accessToken = accessToken
      // Obter o user ID do Instagram
      const response = await fetch(`${this.baseUrl}/me?fields=id,username&access_token=${this.accessToken}`)
      const data = await response.json()
      this.userId = data.id
    },

    async getProfile() {
      if (!this.accessToken || !this.userId) {
        throw new Error('Instagram não está autenticado')
      }

      const fields = 'id,username,media_count,followers_count,follows_count'
      const response = await fetch(
        `${this.baseUrl}/${this.userId}?fields=${fields}&access_token=${this.accessToken}`
      )
      return await response.json()
    },

    async getRecentMedia() {
      if (!this.accessToken || !this.userId) {
        throw new Error('Instagram não está autenticado')
      }

      const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption,like_count,comments_count,timestamp'
      const response = await fetch(
        `${this.baseUrl}/${this.userId}/media?fields=${fields}&access_token=${this.accessToken}`
      )
      return await response.json()
    },

    async getEngagementRate(posts) {
      if (!posts || posts.length === 0) return 0

      const totalEngagement = posts.reduce((sum, post) => {
        return sum + (post.like_count || 0) + (post.comments_count || 0)
      }, 0)

      const averageEngagement = totalEngagement / posts.length
      const followerCount = await this.getProfile().then(profile => profile.followers_count)
      
      return (averageEngagement / followerCount) * 100
    },

    // Método para autenticar com o Instagram
    async authenticate() {
      // Aqui você implementará o fluxo de autenticação OAuth do Instagram
      // Por enquanto, retornando um token mockado
      return 'mock_access_token'
    }
  }
}
</script>

<template>
  <!-- Componente de serviço não precisa de template -->
</template> 