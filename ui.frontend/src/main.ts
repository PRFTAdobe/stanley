import '@/import-components';
import LocalDevModelClient from '@/config/LocalDevModelClient';
import {
  Constants,
  ModelManager,
  PathUtils,
} from '@adobe/aem-spa-page-model-manager';
import { createRouter, createWebHistory } from 'vue-router';
import { Component, createApp, h } from 'vue';
import { withContext } from 'aem-vue-3-editable-components';
import App from '@/App.vue';

import 'aem-vue-3-core-wcm-components-spa/dist/aem-vue-3-core-wcm-components-spa.css';
import 'aem-vue-3-core-wcm-components-base/dist/aem-vue-3-core-wcm-components-base.css';
import './index.css';

declare global {
  interface Window {
    environment: string;
  }
}

const modelManagerOptions: {
  modelClient?: LocalDevModelClient;
  errorPageRoot?: string;
} = {};

if (typeof window.environment !== 'undefined') {
  modelManagerOptions.modelClient = new LocalDevModelClient(
    'http://localhost:4502',
    'Basic YWRtaW46YWRtaW4:',
  );
}

document.addEventListener('DOMContentLoaded', () => {
  if (PathUtils.isBrowser()) {
    // Parent path for 404 pages
    let errPageRoot = PathUtils.getMetaPropertyValue('cq:errorpages');
    if (errPageRoot) {
      if (!errPageRoot.endsWith('/')) {
        errPageRoot += '/';
      }
      modelManagerOptions.errorPageRoot = errPageRoot;
    }
  }
  ModelManager.initialize(modelManagerOptions).then((pageModel) => {
    const router = createRouter({
      history: createWebHistory(),
      scrollBehavior() {
        // always scroll to top
        return { top: 0 };
      },
      routes: [],
    });

    const spaRoot = h(App as Component, {
      cqChildren: pageModel[Constants.CHILDREN_PROP],
      cqItems: pageModel[Constants.ITEMS_PROP],
      cqItemsOrder: pageModel[Constants.ITEMS_ORDER_PROP],
      cqPath: pageModel[Constants.PATH_PROP],
    });

    const app = createApp(withContext(spaRoot));

    app.use(router);
    app.mount('#spa-root');
  });
});
