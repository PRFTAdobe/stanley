<script lang="ts" setup>
  import { computed, inject, onMounted, PropType, VNode } from 'vue';
  import { Model } from '@adobe/aem-spa-page-model-manager';
  import { ComponentMapping, Utils } from 'aem-vue-3-editable-components';
  import { useRouter } from 'vue-router';

  interface PageModel extends Model {
    ':type': string;
    id: string;
    ':path': string;
    ':children'?: { [key: string]: PageModel };
  }

  const props = defineProps({
    // eslint-disable-next-line vue/require-default-prop
    cqChildren: {
      type: Object as PropType<{ [key: string]: PageModel }>,
      default: () => ({}),
    },
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
  });

  const router = useRouter();
  const componentMapping = inject('componentMapping', new ComponentMapping());

  const childComponents = computed((): VNode[] =>
    Utils.getChildComponents(
      props.cqPath,
      props.cqItems,
      props.cqItemsOrder,
      true,
      () => ({}),
      true,
      componentMapping,
    ),
  );

  const childPages = computed((): VNode[] =>
    Utils.getChildPages(props.cqChildren, componentMapping),
  );

  onMounted(() => {
    router.push(window.location.pathname);
  });

  defineOptions({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'App',
    inheritAttrs: false,
  });
</script>

<template>
  <div>
    <component
      :is="childComponent"
      v-for="childComponent of childComponents"
      :key="childComponent.toString()"
    />
    <component
      :is="childPage"
      v-for="childPage of childPages"
      :key="childPage.toString()"
    />
    <router-view />
  </div>
</template>
