<template>
  <div>
    <v-btn @click="fetchData">データ取得</v-btn>
    <v-btn @click="deleteData">データ初期化</v-btn>
    <v-data-table
      v-if="posts.length > 0"
      :headers="headers"
      :items="posts"
      class="elevation-1"
      item-key="id"
    >
      <template #item.action="{ item }">
        <v-btn color="primary" @click="showDialog(item)">表示</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card v-if="selectedPost">
        <v-card-title>
          {{ selectedPost.title }}
        </v-card-title>
        <v-card-text>
          {{ selectedPost.body }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Post } from '@/model/Post'

const posts = ref<Post[]>([])
const headers = ref([
  { text: 'ID', align: 'start', value: 'id' },
  { text: 'Title', value: 'title' },
  { text: 'Body', value: 'body' },
  { text: 'Actions', value: 'action' },
])
const dialog = ref(false)
const selectedPost = ref<Post | null>(null)

// データ取得
const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data: Post[] = await response.json()
    posts.value = data
  } catch (error) {
    console.error('データの取得に失敗しました。', error)
  }
}

// データ初期化
const deleteData = () => {
  posts.value = []
}

// ダイアログ表示
const showDialog = (item: Post) => {
  selectedPost.value = item
  dialog.value = true
}
</script>
