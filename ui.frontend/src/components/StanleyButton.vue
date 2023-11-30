<script lang="ts" setup>
  import { CoreButton } from 'aem-vue-3-core-wcm-components-base';
  import { useAttrs } from 'vue';

  const attrs = useAttrs();

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <CoreButton v-bind="{ ...attrs, baseCssClass: 'stanley-button' }" />
</template>

<style>
  .stanley-button {
    --stanley-link-color: var(--color-white);
    --stanley-link-hover-color: var(--color-white);

    background-color: var(--color-light-sea-green);
    border: 1px solid rgb(0 0 0 / 0%);
    border-radius: 4px;
    color: var(--color-white);
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    margin-block-end: 0;
    padding-block: var(--stanley-size-1x) var(--stanley-size-1x);
    padding-inline: calc(var(--stanley-size-1x) + var(--stanley-size-half))
      calc(var(--stanley-size-1x) + var(--stanley-size-half));
    text-align: center;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }

  .stanley-button:hover {
    background-color: var(--color-green-crayola);
  }
</style>
