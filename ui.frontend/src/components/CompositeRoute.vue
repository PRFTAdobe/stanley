<script lang="ts" setup>
  import { onMounted, useAttrs } from 'vue';
  import { useRouter } from 'vue-router';
  import { Page } from 'aem-vue-3-editable-components';

  const props = defineProps({
    cqPath: {
      type: String,
      default: '',
    },
  });

  const attrs = useAttrs();
  const router = useRouter();

  onMounted(() => {
    if (props.cqPath && props.cqPath.length) {
      const routeRecord = {
        path: `${props.cqPath}.html`,
        name: props.cqPath,
        component: Page,
        props: { cqPath: props.cqPath, ...attrs, aemNoDecoration: true },
      };
      router.addRoute(routeRecord);
    }
  });

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <Page v-if="props.cqPath?.length === 0" v-bind="{ ...attrs }" />
</template>
