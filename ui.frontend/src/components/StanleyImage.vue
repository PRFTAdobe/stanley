<script lang="ts" setup>
  import { CoreImage } from 'aem-vue-3-core-wcm-components-base';
  import { onMounted, ref, useAttrs } from 'vue';

  const attrs = useAttrs() as {
    alt: string;
    displayPopupTitle?: boolean;
    id: string;
    imageLink: {
      valid: boolean;
      url: string;
      attributes?: object;
    };
    src: string;
    smartCropRendition?: string;
    title?: string;
    width: string;
  };

  const image = ref(null);

  onMounted(() => {
    const imageElement = image.value?.$el as HTMLDivElement;
    const imageLink = imageElement.querySelector('.stanley-image__link');
    const imageCaption = imageElement.querySelector(
      'figcaption.stanley-image__title',
    );
    if (imageLink) {
      const imageOverlay = document.createElement('div');
      imageOverlay.classList.add('stanley-image__overlay');

      const xmlns = 'http://www.w3.org/2000/svg';
      const magnifyingGlass = document.createElementNS(xmlns, 'svg');
      magnifyingGlass.setAttributeNS(null, 'viewBox', '0 0 64 64');

      const magnifyingGlassPath = document.createElementNS(xmlns, 'path');
      magnifyingGlassPath.setAttributeNS(
        null,
        'd',
        'M33.4 64h-1.7c-.9 0-1.8 0-2.7-.1-2.3-.2-4.5-.6-6.7-1.3-1.9-.6-3.7-1.4-5.4-2.3-1.5-.8-2.8-1.7-4.2-2.7-.8-.6-1.5-1.3-2.2-1.9-.6-.5-1.1-1-1.6-1.6L6 50.6c-1.1-1.6-2.1-3.3-2.9-5-.9-1.9-1.6-3.9-2.1-6-.3-1.2-.5-2.5-.6-3.7l-.2-2.7c0-.3-.1-.6-.1-1-.1-1-.1-2.2 0-3.2.2-2 .5-4 1.1-5.9.6-2.1 1.4-4.2 2.5-6.2.8-1.5 1.8-3 2.9-4.4S8.8 9.9 10 8.7l3.4-2.8c1.5-1.1 3.1-2 4.7-2.8 2-1 4.1-1.7 6.2-2.2 1.2-.3 2.4-.5 3.6-.6l3-.2c.6-.1 1-.1 1.4-.1l2.7.1c2.3.2 4.5.6 6.7 1.3 1.9.6 3.7 1.4 5.4 2.3 1.5.8 2.8 1.7 4.2 2.7.8.6 1.5 1.3 2.2 1.9.6.5 1.1 1 1.7 1.6l2.9 3.5c1.1 1.6 2.1 3.3 2.9 5 .9 1.9 1.6 3.9 2.1 6 .3 1.2.5 2.5.6 3.7l.2 2.7c0 .4.1.8.1 1.3l-.1 2.2c-.2 2.3-.5 4.5-1.2 6.7-.6 2.1-1.4 4.2-2.5 6.2-.8 1.5-1.8 3-2.9 4.4s-2.2 2.6-3.4 3.8l-3.4 2.8c-1.5 1.1-3.1 2-4.7 2.8-2 1-4.1 1.7-6.2 2.2-1.2.3-2.4.4-3.6.6l-2.6.2zm26.4-31.9c0-.3-.1-.6-.1-.9l-.2-2.4c-.1-.9-.2-1.8-.5-2.7-.5-2.2-1.2-4.3-2.3-6.3-.6-1.2-1.3-2.3-2-3.4-.9-1.4-2-2.7-3.2-3.9-.5-.6-1.1-1.1-1.7-1.6l-2.4-1.8c-1.2-.8-2.5-1.4-3.7-2.1L41 5.9c-1.3-.5-2.7-.9-4.1-1.1-1.1-.2-2.1-.3-3.2-.4-.8-.1-1.6 0-2.3 0-.6 0-1.3 0-1.9.1-1.1.1-2.2.3-3.2.5-2.2.5-4.3 1.2-6.3 2.2-1.2.6-2.3 1.3-3.4 2-1.7 1.1-3.2 2.3-4.5 3.8-.6.6-1.2 1.3-1.7 2C9 16.6 7.9 18.3 7 20.2c-.6 1.3-1.2 2.7-1.6 4.1-.4 1.5-.8 3-.9 4.6l-.2 2.9c0 1 .1 2 .2 2.9.1 1.1.3 2.2.5 3.3.5 2.2 1.2 4.3 2.2 6.3.6 1.2 1.3 2.3 2 3.5.9 1.4 2 2.7 3.2 3.9.6.6 1.1 1.1 1.8 1.6l2.4 1.8 3.7 2.1c.9.5 1.9.8 2.8 1.2 1.9.7 3.8 1.1 5.7 1.3l3.3.2c.8 0 1.7-.1 2.5-.2 1.1-.1 2.2-.3 3.3-.5 2.2-.5 4.3-1.2 6.3-2.2 1.2-.6 2.3-1.3 3.5-2 1.4-.9 2.7-2 3.9-3.2.5-.5 1-1.1 1.5-1.7l1.8-2.4L57 44c.5-.9.8-1.9 1.2-2.8.7-1.9 1.1-3.8 1.3-5.7l.3-3.4zm-17.4 4.5 3.9 3.9 1.2 1.2c.4.5.6 1 .6 1.6v2.2c0 .1 0 .3-.1.4-.4.9-1 1.5-1.9 1.9-.2.1-.5.2-.7.2h-2c-.5 0-.9-.1-1.2-.4-.3-.2-.5-.4-.8-.6l-4.6-4.7c-3.7 1.8-7.5 2.2-11.3.8-3.2-1.1-5.7-3.1-7.4-6-3.5-5.7-2.4-13.1 2.6-17.7 4.8-4.4 12.4-5 17.8-1 5.1 4 7.5 11.5 3.9 18.2zM30 40.1c5.8 0 10-4.4 10.1-9.8.1-5.6-4.3-10.2-9.7-10.3C24 19.9 20 24.9 20 30.1c-.1 5.5 4.4 10 10 10z',
      );
      magnifyingGlassPath.setAttributeNS(null, 'fill', 'var(--color-white)');
      magnifyingGlass.append(magnifyingGlassPath);
      imageOverlay.append(magnifyingGlass);

      if (imageCaption) {
        imageLink.insertBefore(imageOverlay, imageCaption);
      } else {
        imageLink.append(imageOverlay);
      }
    }
  });

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <CoreImage ref="image" base-css-class="stanley-image" v-bind="{ ...attrs }" />
</template>

<style>
  :root {
    --asset-max-inline-size: none;
  }

  .stanley-image .stanley-image__image {
    inline-size: auto;
    margin-inline: auto;
  }

  .stanley-image .cmp-asset {
    block-size: auto;
    display: block;
    inline-size: 100%;
    max-inline-size: var(--asset-max-inline-size);
    object-fit: cover;
  }

  .stanley-image__link {
    display: grid;
    justify-content: center;
    padding-block: var(--stanley-size-2x);
  }

  .stanley-image__link .stanley-image__image,
  .stanley-image__overlay {
    grid-area: 1 / 1 / 2 / 2;
  }

  .stanley-image__link figcaption.stanley-image__title {
    font-size: 16px;
    grid-area: 2 / 1 / 3 / 2;
    line-height: 1.75;
    margin-block: 0 var(--stanley-size-3x);
    text-align: center;
    text-transform: uppercase;
  }

  .stanley-image__overlay {
    align-items: center;
    background-color: var(--color-light-sea-green);
    block-size: 100%;
    display: flex;
    flex-flow: column nowrap;
    inline-size: 100%;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .stanley-image__overlay svg {
    block-size: var(--stanley-size-8x);
    inline-size: var(--stanley-size-8x);
  }

  .stanley-image__link:hover .stanley-image__overlay {
    opacity: 0.9;
  }
</style>
