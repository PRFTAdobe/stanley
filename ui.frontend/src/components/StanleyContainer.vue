<script lang="ts" setup>
  import { CoreContainer } from 'aem-vue-3-core-wcm-components-spa';
  import { computed, useAttrs } from 'vue';
  import lightOrDark from '@/utils/lightOrDark';

  const props = defineProps({
    aemNoDecoration: {
      type: Boolean,
      default: false,
    },
    addGapBetweenComponents: {
      type: Boolean,
      default: undefined,
    },
    // eslint-disable-next-line vue/require-default-prop
    backgroundColor: {
      type: String,
    },
    // eslint-disable-next-line vue/require-default-prop
    backgroundStyle: {
      type: String,
    },
    blockPadding: {
      type: String,
      default: '0x',
    },
  });

  const attrs = useAttrs();

  const computedAemNoDecoration = computed(
    () => props.addGapBetweenComponents !== true,
  );

  const backgroundStyleProperty = computed(() => {
    const backgroundStyle = [];
    if (props.backgroundColor) {
      backgroundStyle.push(
        `--container-background-color: ${props.backgroundColor}`,
      );
      if (props.backgroundColor === '#1abc9c') {
        backgroundStyle.push('--container-border-color: #16a085');
      }
    }
    if (props.blockPadding) {
      backgroundStyle.push(
        `--container-block-padding: var(--stanley-size-${props.blockPadding})`,
      );
    }
    return backgroundStyle.join('; ');
  });

  const baseCssClass = computed((): string => {
    const baseCssClassAsArray = ['stanley-container'];
    if (props.addGapBetweenComponents === true) {
      baseCssClassAsArray.push('stanley-container--with-gap');
    }
    if (props.backgroundColor) {
      baseCssClassAsArray.push(
        `stanley-scrim-${lightOrDark(props.backgroundColor)}`,
      );
    }
    return baseCssClassAsArray.join(' ');
  });

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <CoreContainer
    :aem-no-decoration="computedAemNoDecoration"
    :background-style="backgroundStyleProperty"
    :base-css-class="baseCssClass"
    v-bind="attrs"
  />
</template>

<style>
  :root {
    --container-background-color: transparent;
    --container-border-color: transparent;
    --container-block-padding: 0;
  }

  .stanley-container {
    clear: both;
    padding-block: var(--container-block-padding);
    position: relative;
  }

  .stanley-container::before {
    background-color: var(--container-background-color);
    border-block-end: 1px solid var(--container-border-color);
    content: '';
    inline-size: 100vw;
    inset-block: 0;
    inset-inline: 50%;
    margin-inline: -50vw;
    position: absolute;
    z-index: -1;
  }

  .stanley-container:not(.stanley-container--with-gap) > .aem-Grid {
    inline-size: 100%;
    margin-inline: 0;
  }

  .stanley-container.stanley-container--with-gap > .aem-Grid {
    inline-size: calc(100% + var(--stanley-size-4x));
    margin-inline: calc(-1 * var(--stanley-size-2x));
  }

  .stanley-container--with-gap > .aem-Grid > .aem-GridColumn {
    padding-inline: var(--stanley-size-2x);
  }

  .stanley-container:not(.stanley-container--with-gap)
    > .aem-Grid
    > .aem-GridColumn {
    padding-inline: 0;
  }
</style>
