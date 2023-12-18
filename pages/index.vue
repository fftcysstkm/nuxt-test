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
    <template #item.action="{item}">
      <v-btn color="primary" @click="showDialog(item)">表示</v-btn>
    </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Post } from '@/model/Post'

export default defineComponent({
  setup() {
    const posts = ref<Post[]>([]);
    const headers  = ref([
      {text: 'ID', align: 'start', value:'id'},
      {text: 'Title', value: 'title'},
      {text: 'Body', value: 'body'},
      {text: 'Actions',value: 'action'}
    ]);

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

    //
    const showDialog = (item: Post) => {
      // ここにダイアログ表示ロジックを実装
      console.log('Dialog shown for:', item);
    };

    return {
      posts,
      headers,
      fetchData,
      deleteData,
      showDialog
    }
  }

})

</script>
