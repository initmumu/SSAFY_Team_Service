<template>
  <!-- 📄 본문: 남은 공간 차지 -->
  <header class="pb-4 pt-0">
    <h1 class="text-brand text-xl font-bold select-none">다이다이 다슥아 - A703</h1>
  </header>
  <div class="max-w-screen-md mx-auto">
    <div class="space-y-4">
      <h3 class="text-xl font-bold mb-4">칠공삼 메신저</h3>
      <Card>
        <div class="text-gray-800 font-semibold flex items-center">
          <p class="text-2xl mr-2">💌</p>
          팀원들의 편지가 도착했어요!
        </div></Card
      >
      <Card>
        <div class="text-gray-800 font-semibold flex items-center">
          <p class="text-2xl mr-2">✉️</p>
          팀원들에게 편지 보내기
        </div></Card
      >

      <h3 class="text-xl font-bold mt-8 mb-4">JIRA 스토리 미리보기</h3>
      <Card>
        <JiraToDo></JiraToDo>
      </Card>

      <h3 class="text-xl font-bold mt-8 mb-4">협업 도구 바로가기</h3>
      <div class="bg-white rounded-xl px-4 py-8 space-y-8">
        <div class="flex items-center">
          <img
            src="https://www.venturesquare.net/wp-content/uploads/2020/06/notion.png"
            class="h-6 mr-2"
          />
          <p class="text-gray-800 font-semibold">노션 바로가기</p>
        </div>
        <div class="flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968875.png" class="h-6 mr-2" />
          <p class="text-gray-800 font-semibold">JIRA 바로가기</p>
        </div>
        <div class="flex items-center">
          <img src="https://img.icons8.com/?size=512&id=34886&format=png" class="h-6 mr-2" />
          <p class="text-gray-800 font-semibold">GitLab 바로가기</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from "../components/Card.vue";
import JiraToDo from "../components/JiraToDo.vue";
</script>
