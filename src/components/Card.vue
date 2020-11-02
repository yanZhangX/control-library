<template>
  <div class="card" card>
    <div class="title" :class="{ 'show-border': border }">
      <span class="tag"></span>
      <p class="title-text">{{ title }}</p>
    </div>
    <slot name="container"></slot>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    border: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  background-color: #fff;
  .show-border {
    border-bottom: 1px solid #f2f2f2;
  }
  .title {
    display: flex;
    align-items: center;
    padding: 20px;
    .tag {
      display: block;
      width: 4px;
      height: 14px;
      background-color: #4c84ff;
      border-radius: 2px;
      margin-right: 8px;
    }
    .title-text {
      font-size: 16px;
      margin: 0;
    }
  }
  .card-container {
  }
}
.card > * {
  padding: 20px;
}
</style>
