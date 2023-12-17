<template>
  <div>
    <v-btn @click="fetchData">データ取得</v-btn>
    <v-btn @click="deleteData">データ初期化</v-btn>
    <table v-if="posts.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Post } from '@/model/Post'

export default defineComponent({
  setup() {
    const posts = ref<Post[]>([]);

    // データ取得
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();
        posts.value = data;
      } catch (error) {
        console.error('データの取得に失敗しました。', error);
      }
    }

    // データ初期化
    const deleteData = () => {
      posts.value = [];
    }

    return {
      posts,
      fetchData,
      deleteData
    }
  }

})

</script>
