<!-- src/components/Description.vue -->
<template>
  <div class="description">
    <h2>使い方</h2>
    <ol>
      <li>候補者を選択</li>
      <li>
        <b>Start!!</b>ボタンを押す
      </li>
      <li>
        <b>Stop</b>ボタンを押す
      </li>
    </ol>
    <h2>機能</h2>
    <ul>
      <li>メンバーごとに当選しやすさの重みを変更できます．</li>
      <li>当選人数を変更できます．</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["title"]
});
</script>

<style>
.description {
  font-weight: bold;
}
</style>
