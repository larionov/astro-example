<template>
  <form
    action="/api/register-form"
    method="POST"
    class="pure-form pure-form-stacked"
    @submit.prevent="onSubmit"
  >
    <p>test@test.te - already exists</p>
    <p>test.test.te - not valid</p>
    <p>test@test.te - already exists</p>
    <fieldset>
      <input
        :disabled="submitting"
        v-model="form.email"
        class="splash-head"
        id="name"
        type="text"
        :placeholder="t('become_volunteer_input')"
      />
      <p v-if="true">error message</p>
      <button
        :disabled="submitting"
        class="pure-button pure-button-primary"
        type="submit"
      >
        {{ t('become_volunteer_btn') }}
      </button>
    </fieldset>
  </form>
</template>

<script>
import { i18n } from '../i18n.js';
import api from './register-form-api.js';
// prettier-ignore
// const locales = await getLocales(await import.meta.glob('./locales/*/index.json'));

const locales = {
  en: {
    become_volunteer_btn: 'Become a volunteer',
    become_volunteer_input: 'E-mail',
    message_email_exists: '"%s" already exists in the database',
    message_email_not_valid: '"%s" is not a valid email',
  },
  ru: {
    become_volunteer_btn: 'Стать волонтёром',
    become_volunteer_input: 'Электронная почта',
  },
  ua: {
    become_volunteer_btn: 'Стати волонтером',
    become_volunteer_input: 'Електронна пошта',
  },
};

import { ref } from 'vue';

export default {
  props: {
    // current langugage name is provided by Astro
    locale: String,
  },
  async created() {
    console.log(this.locale);
    i18n.extend(locales[this.locale]);
  },
  data() {
    return {
      form: {
        email: '',
      },
    };
  },

  methods: {
    onSubmit() {
      this.submitting = true;
      api('registerEmail', this.form)
        .then((res) => {
          const { code, message, result, type } = res;
          console.log({ res });
          if (type === 'success') {
            window.location.href = `/${this.locale}/confirm-email`;
          }
        })
        .finally(() => {
          this.submitting = false;
        });
    },
  },
  setup() {
    const t = i18n.t.bind(i18n);

    return {
      submitting: ref(false),

      t,
    };
  },
};
</script>

<style></style>
