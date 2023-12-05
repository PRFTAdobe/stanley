<script lang="ts" setup>
  import {
    componentClassNames,
    componentProperties,
  } from 'aem-vue-3-editable-components';
  import { computed, inject, PropType } from 'vue';
  import { AuthoringUtils, Model } from '@adobe/aem-spa-page-model-manager';

  interface ContentFragmentElement {
    dataType: string;
    value: string;
    title: string;
    ':type': string;
    multiValue: boolean;
  }

  const props = defineProps({
    cqItems: {
      type: Object as PropType<{
        [key: string]: Model;
      }>,
      default: () => ({}),
    },
    cqItemsOrder: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    cqPath: {
      type: String,
      default: '',
    },
    // eslint-disable-next-line vue/require-default-prop
    description: {
      type: String,
    },
    // eslint-disable-next-line vue/require-default-prop
    elements: {
      type: Object as PropType<{ [key: string]: ContentFragmentElement }>,
      default: () => ({}),
    },
    // eslint-disable-next-line vue/require-default-prop
    elementsOrder: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    isInEditor: {
      type: Boolean,
      default: undefined,
    },
    // eslint-disable-next-line vue/require-default-prop
    model: {
      type: String,
    },
    // eslint-disable-next-line vue/require-default-prop
    title: {
      type: String,
    },
    ...componentProperties('stanley-content-fragment'),
  });

  const computedIsInEditor =
    typeof props.isInEditor !== 'undefined'
      ? props.isInEditor
      : inject('isInEditor', AuthoringUtils.isInEditor());

  const className = computed(() =>
    componentClassNames(
      props.baseCssClass,
      props.appliedCssClassNames,
      props.cssClassNames,
      props.containerProps,
      computedIsInEditor,
      props.aemNoDecoration,
    ),
  );

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <div :id="props.id" :class="className">
    <template v-for="element in props.elementsOrder" :key="element">
      <div v-if="element === 'image'" :class="`${props.baseCssClass}__image`">
        <img :src="props.elements['image'].value" alt="Stanley" />
      </div>
      <h1
        v-else-if="element === 'heading'"
        :class="`${props.baseCssClass}__heading`"
      >
        {{ props.elements['heading'].value }}
      </h1>
      <div
        v-else-if="element === 'copy'"
        :class="`${props.baseCssClass}__copy`"
        v-html="props.elements['copy'].value"
      />
      <div
        v-else-if="element === 'quote'"
        :class="`${props.baseCssClass}__quote`"
        v-html="props.elements['quote'].value"
      />
    </template>
  </div>
</template>

<style>
  .cmp-contentfragment__image {
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    margin-block-end: var(--stanley-size-1x);
  }

  .cmp-contentfragment__heading,
  .cmp-contentfragment__copy,
  .cmp-contentfragment__quote {
    text-align: center;
  }
</style>
