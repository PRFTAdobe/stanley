<script lang="ts" setup>
  import {
    componentClassNames,
    componentProperties,
  } from 'aem-vue-3-editable-components';
  import { computed, inject, onMounted, onUnmounted, PropType, ref } from 'vue';
  import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager';
  import { CoreLink, CoreNavigation } from 'aem-vue-3-core-wcm-components-base';

  interface LinkInterface {
    valid: boolean;
    url: string;
  }

  interface CoreNavigationItemInterface {
    level: number;
    active: boolean;
    title: string;
    link: LinkInterface;
    lastModified: number;
    navigable?: boolean;
    path: string;
    children?: CoreNavigationItemInterface[];
  }

  const props = defineProps({
    accessibilityLabel: {
      type: String,
      default: '',
    },
    applicationName: {
      type: String,
      default: 'Stanley',
    },
    homePage: {
      type: String,
      default: '/content/stanley/us/en/home.html',
    },
    navigationItems: {
      type: Array as PropType<Array<CoreNavigationItemInterface>>,
      default: () => [],
    },
    ...componentProperties('stanley-header'),
  });

  const isInEditor = inject('isInEditor', AuthoringUtils.isInEditor());

  const className = computed(() =>
    componentClassNames(
      props.baseCssClass,
      props.appliedCssClassNames,
      props.cssClassNames,
      props.containerProps,
      isInEditor,
      props.aemNoDecoration,
    ),
  );

  const navigation = ref(null);

  const setMenuHeight = () => {
    const navigationElement = (navigation.value! as { $el: HTMLElement }).$el;
    const navigationGroup = navigationElement.querySelector(
      '.stanley-navigation__group',
    );
    if (navigationGroup) {
      (navigationGroup as HTMLUListElement).style.height = 'auto';
      (navigationGroup as HTMLUListElement).style.setProperty(
        '--stanley-header-menu-block-size',
        `${(navigationGroup as HTMLUListElement).clientHeight}px`,
      );
      (navigationGroup as HTMLUListElement).style.removeProperty('height');
    }

    const stanleyHeader = navigationElement.closest('.stanley-header');
    if (window.innerWidth >= 768 && stanleyHeader) {
      stanleyHeader.classList.remove('stanley-header--expanded');
    }
  };

  const menuToggleClickHandler = (event: Event) => {
    const stanleyHeader = (event.target as HTMLDivElement).closest(
      '.stanley-header',
    );
    if (stanleyHeader) {
      if (stanleyHeader.classList.contains('stanley-header--expanded')) {
        stanleyHeader.classList.remove('stanley-header--expanded');
      } else {
        stanleyHeader.classList.add('stanley-header--expanded');
      }
    }
  };

  onMounted(() => {
    window.addEventListener('resize', setMenuHeight);
    setMenuHeight();
  });
  onUnmounted(() => {
    window.removeEventListener('resize', setMenuHeight);
  });

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <div :class="className">
    <div :class="`${props.baseCssClass}__logo-container`">
      <CoreLink :class="`${props.baseCssClass}__logo`" :href="props.homePage"
        >{{ props.applicationName }}
      </CoreLink>
      <button
        :class="`${props.baseCssClass}__menu-toggle`"
        aria-label="Menu toggle"
        type="button"
        @click="menuToggleClickHandler"
      >
        <span :class="`${props.baseCssClass}__toggle-bar`"></span>
        <span :class="`${props.baseCssClass}__toggle-bar`"></span>
        <span :class="`${props.baseCssClass}__toggle-bar`"></span>
      </button>
    </div>
    <CoreNavigation
      ref="navigation"
      :accessibility-label="props.accessibilityLabel"
      :items="props.navigationItems"
      base-css-class="stanley-navigation"
    />
  </div>
</template>

<style>
  :root {
    --stanley-header-menu-block-size: auto;
    --stanley-header-menu-border-color: var(--color-light-sea-green);
  }

  .stanley-header {
    align-items: flex-start;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding-block: var(--stanley-size-9x) var(--stanley-size-9x);
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .stanley-header {
      align-items: center;
      flex-flow: row nowrap;
    }
  }

  .stanley-header__logo-container {
    align-items: center;
    display: flex;
    inline-size: 100%;
    justify-content: space-between;
  }

  .stanley-header__logo {
    --stanley-link-color: var(--color-white);
    --stanley-link-active-color: var(--color-white);
    --stanley-link-hover-color: var(--color-white);

    color: var(--color-white);
    display: block;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2px;
    padding-block: var(--stanley-size-2x);
  }

  .stanley-header__menu-toggle {
    background-color: transparent;
    border-color: transparent;
    border-radius: 4px;
    display: grid;
    gap: 4px;
    grid-template-rows: repeat(3, 1fr);
    padding-block: var(--stanley-size-1x);
    padding-inline: var(--stanley-size-1x);
  }

  .stanley-header--expanded .stanley-header__menu-toggle {
    background-color: #333;
  }

  @media (max-width: 768px) {
    .stanley-header__menu-toggle {
      display: none;
    }
  }

  .stanley-header__toggle-bar {
    background-color: var(--color-white);
    block-size: 2px;
    border-radius: 1px;
    display: block;
    inline-size: var(--stanley-size-3x);
  }

  .stanley-navigation {
    inline-size: 100%;
  }

  @media (max-width: 768px) {
    .stanley-navigation {
      inline-size: auto;
    }
  }

  .stanley-navigation__group {
    --stanley-link-color: var(--color-white);
    --stanley-link-active-color: var(--color-raisin-black);
    --stanley-link-hover-color: var(--color-raisin-black);

    block-size: 0;
    display: flex;
    flex-flow: column nowrap;
    gap: var(--stanley-size-4x);
    list-style: none;
    margin-block: 0;
    margin-inline: calc(-1 * var(--stanley-size-3x));
    overflow: hidden;
    padding-block: var(--stanley-size-4x) 0;
    padding-inline: var(--stanley-size-3x);
    position: relative;
    transition: block-size 300ms ease-in-out;
  }

  .stanley-header--expanded .stanley-navigation__group {
    --stanley-header-menu-border-color: var(--color-chinese-black);

    block-size: var(--stanley-header-menu-block-size);
  }

  .stanley-navigation__group::before {
    background-color: var(--stanley-header-menu-border-color);
    block-size: 1px;
    content: '';
    inline-size: 100vw;
    inset-block: 0;
    inset-inline: 50%;
    margin-inline: -50vw;
    position: absolute;
  }

  @media (max-width: 768px) {
    .stanley-navigation__group {
      block-size: auto;
      overflow: visible;
    }

    .stanley-navigation__group::before {
      content: none;
    }
  }

  @media (max-width: 768px) {
    .stanley-navigation__group {
      border: 0;
      flex-flow: row nowrap;
      inline-size: auto;
      margin-block: 0;
      margin-inline: 0;
      padding-block: 0;
      padding-inline: 0;
    }
  }
</style>
