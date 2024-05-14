<script lang="ts" setup>
  import { CoreTitle } from 'aem-vue-3-core-wcm-components-base';
  import { useAttrs } from 'vue';

  const attrs = useAttrs();

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <CoreTitle base-css-class="stanley-title" v-bind="{ ...attrs }" />
</template>

<style>
  .stanley-title {
    border-block-end: 1px solid var(--color-chinese-silver);
    margin-block-end: var(--stanley-size-2x);
    padding-block-start: var(--stanley-size-2x);
    text-align: center;
  }

  @media (max-width: 768px) {
    .stanley-title {
      inline-size: 50%;
      margin-inline: auto;
      min-inline-size: 400px;
    }
  }
</style>
