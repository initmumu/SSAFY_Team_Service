<template>
  <div class="w-full pt-2">
    <div v-if="loading" class="space-y-4 animate-pulse">
      <div class="flex items-center pb-4">
        <div class="w-10 h-10 pb-4 bg-gray-200 rounded-full mr-4"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>
      <div class="flex items-center pb-4">
        <div class="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          <div class="h-4 bg-gray-100 rounded w-1/3"></div>
        </div>
      </div>
      <div class="flex items-center pb-4">
        <div class="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/5"></div>
          <div class="h-4 bg-gray-100 rounded w-2/5"></div>
        </div>
      </div>
    </div>
    <div v-else class="w-full">
      <div v-if="issues.length === 0" class="text-gray-500">
        해당 조건에 맞는 스토리가 없습니다.
      </div>
      <ul v-else class="space-y-4">
        <li
          v-for="issue in issues.slice(-3)"
          :key="issue.id"
          class="flex pb-4 w-full border-b border-gray-100 last:border-b-0"
        >
          <img
            :src="issue.fields.assignee?.avatarUrls['48x48']"
            alt="assignee avatar"
            class="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <div class="flex flex-wrap items-center justify-start mb-1">
              <div
                class="inline-block bg-green-100 border border-green-500 rounded-lg text-green-500 font-semibold text-xs px-2 py-[0.15rem] mr-2"
              >
                스토리
              </div>
              <div class="flex gap-4 text-xs text-gray-500">
                <div>
                  {{ issue.key }}
                </div>
              </div>
            </div>
            <p class="text-sm">{{ issue.fields.summary }}</p>
          </div>
        </li>
      </ul>
      <div class="w-full text-center text-sm font-semibold">더 보기</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 리스트를 저장할 reactive 변수와 로딩 상태 변수
const issues = ref([]);
const loading = ref(true);

// 인증 정보를 입력 (Jira Cloud의 경우 API 토큰을 사용함)
const email = "moomu.like@gmail.com"; // 본인 Jira 계정의 이메일
const apiToken =
  "ATATT3xFfGF0Kop5Cal6nXrP9ZvmyORhtdkvF7oAS-RltOKlt5c64v9tKfnsRlGUQOgO0SS11m9GjogAiR_nrzGYwkMTOnXy1-8vlcjWvWSwR5PJw5tnWAkjsxO5ux-Ru0k1wMuVbpYu36diHm616qjDhy5vcp_L-6QqDMBWZ1uHUaKfYaTwDLA=02951321"; // 생성한 API 토큰
const authString = btoa(`${email}:${apiToken}`); // Base64 인코딩

// Jira API를 호출하여 스토리 목록을 가져오는 함수
const fetchIssues = async () => {
  try {
    // JQL 쿼리
    const jql = encodeURIComponent(
      'project=S12P31A703 AND issuetype="Story" AND assignee = "moomu.like@gmail.com" AND statusCategory = "To Do"'
    );
    const url = `/jira/rest/api/3/search?jql=${jql}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authString}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP 에러: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    issues.value = data.issues;
  } catch (error) {
    console.error("이슈 조회 중 오류 발생:", error);
  } finally {
    loading.value = false;
  }
};

// 컴포넌트가 마운트 될 때 API 호출
onMounted(() => {
  fetchIssues();
});
</script>
