<script lang="ts" setup>
  import {
    componentClassNames,
    componentProperties,
  } from 'aem-vue-3-editable-components';
  import { computed, inject } from 'vue';
  import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager';
  import { ErrorMessage, Field, Form } from 'vee-validate';
  import * as yup from 'yup';
  import StanleyButton from '@/components/StanleyButton.vue';

  const props = defineProps({
    commentsPlaceholder: {
      type: String,
      default: 'Comments',
    },
    emailPlaceholder: {
      type: String,
      default: 'Email',
    },
    namePlaceholder: {
      type: String,
      default: 'Name',
    },
    submitButtonText: {
      type: String,
      default: 'Submit',
    },
    ...componentProperties('stanley-contact-form'),
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

  const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
  });

  const onSubmit = (values: {
    name: string;
    email: string;
    comments: string;
  }) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));
  };

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <div :id="props.id" :class="className">
    <Form
      v-slot="{ errors }"
      :validation-schema="schema"
      class="stanley-form"
      @submit="onSubmit"
    >
      <div class="stanley-form__field">
        <Field
          :class="[
            'stanley-form__control',
            { 'stanley-form__control--invalid': errors.name },
          ]"
          :placeholder="props.namePlaceholder"
          name="name"
        />
        <ErrorMessage class="stanley-form__feedback" name="name" />
      </div>

      <div class="stanley-form__field">
        <Field
          :class="[
            'stanley-form__control',
            { 'stanley-form__control--invalid': errors.email },
          ]"
          :placeholder="props.emailPlaceholder"
          name="email"
          type="email"
        />
        <ErrorMessage class="stanley-form__feedback" name="email" />
      </div>
      <Field
        :placeholder="props.commentsPlaceholder"
        as="textarea"
        class="stanley-form__control"
        cols="20"
        name="comments"
        rows="10"
      />
      <StanleyButton :text="props.submitButtonText" type="submit" />
    </Form>
  </div>
</template>

<style>
  .stanley-form {
    align-items: flex-start;
    display: flex;
    flex-flow: column;
    gap: var(--stanley-size-4x);
    inline-size: 100%;
    justify-content: stretch;
  }

  .stanley-form__field {
    inline-size: 100%;
  }

  .stanley-form__control {
    background-color: var(--color-white);
    background-image: none;
    border: 1px solid var(--color-chinese-silver);
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    box-sizing: border-box;
    color: var(--color-davys-grey);
    display: block;
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    inline-size: 100%;
    padding-block: var(--stanley-size-1x) var(--stanley-size-1x);
    padding-inline: calc(var(--stanley-size-1x) + var(--stanley-size-half))
      calc(var(--stanley-size-1x) + var(--stanley-size-half));
  }

  .stanley-form__control--invalid {
    border-color: var(--color-rusty-red);
  }

  .stanley-form__feedback {
    color: var(--color-rusty-red);
    font-size: 80%;
    margin-block-start: var(--stanley-size-half);
  }
</style>
