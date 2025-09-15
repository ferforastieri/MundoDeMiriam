<script setup>
import { ref, onMounted } from 'vue'
import instagramService from '@/api/dashboard/InstagramService.js'

const stats = ref({
  profile: {
    followers: 0,
    following: 0,
    posts: 0,
    engagement: 0
  },
  recentPosts: [],
  insights: {
    reachGrowth: 0,
    impressionsGrowth: 0,
    topLocations: [],
    ageRanges: [],
    genderSplit: {
      female: 0,
      male: 0
    },
    bestTimeToPost: []
  }
})

const isLoading = ref(true)

onMounted(async () => {
  try {
    // Inicializa o serviço com o token mockado
    const token = await instagramService.authenticate()
    await instagramService.initialize(token)

    // Carrega os dados do perfil
    const profile = await instagramService.getProfile()
    stats.value.profile.followers = profile.followers_count
    stats.value.profile.following = profile.follows_count
    stats.value.profile.posts = profile.media_count

    // Carrega os posts recentes
    const media = await instagramService.getRecentMedia()
    stats.value.recentPosts = media.data.map(post => ({
      id: post.id,
      type: post.media_type.toLowerCase(),
      likes: post.like_count,
      comments: post.comments_count,
      views: post.media_type === 'VIDEO' ? post.views : null,
      date: new Date(post.timestamp).toISOString().split('T')[0],
      engagement: 0 // Será calculado abaixo
    }))

    // Calcula a taxa de engajamento
    stats.value.profile.engagement = await instagramService.getEngagementRate(stats.value.recentPosts)

    // Por enquanto mantendo os dados mockados para insights
    stats.value.insights = {
      reachGrowth: 12.5,
      impressionsGrowth: 8.9,
      topLocations: [
        { name: 'São Paulo, Brasil', percentage: 45 },
        { name: 'Rio de Janeiro, Brasil', percentage: 25 },
        { name: 'Belo Horizonte, Brasil', percentage: 15 }
      ],
      ageRanges: [
        { range: '18-24', percentage: 25 },
        { range: '25-34', percentage: 45 },
        { range: '35-44', percentage: 20 },
        { range: '45+', percentage: 10 }
      ],
      genderSplit: {
        female: 65,
        male: 35
      },
      bestTimeToPost: [
        { day: 'Segunda', hour: '19:00', engagement: 6.2 },
        { day: 'Quarta', hour: '20:00', engagement: 5.8 },
        { day: 'Sexta', hour: '18:00', engagement: 7.1 }
      ]
    }
  } catch (error) {
    console.error('Erro ao carregar dados do Instagram:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="instagram-stats">
    <h1>Instagram Stats</h1>
    <div class="stats-container">
      <div class="stat-card">
        <h3>Seguidores</h3>
        <p class="stat-number">{{ stats.profile.followers.toLocaleString() }}</p>
      </div>
      <div class="stat-card">
        <h3>Posts</h3>
        <p class="stat-number">{{ stats.profile.posts }}</p>
      </div>
      <div class="stat-card">
        <h3>Engajamento</h3>
        <p class="stat-number">{{ stats.profile.engagement }}%</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.instagram-stats {
  padding: 20px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-number {
  font-size: 2em;
  font-weight: bold;
  color: #2c3e50;
  margin: 10px 0;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

h3 {
  color: #666;
  margin: 0;
}
</style> 