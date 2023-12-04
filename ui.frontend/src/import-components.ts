/* eslint-disable import/no-unresolved */
import {
  EditConfig,
  MappedComponentProperties,
  MapTo,
  ResponsiveGrid,
} from 'aem-vue-3-editable-components';
import {
  BreadcrumbEditConfig,
  ButtonEditConfig,
  CoreBreadcrumb,
  CoreDownload,
  CoreEmbed,
  CoreLanguageNavigation,
  CoreList,
  CoreNavigation,
  CoreSeparator,
  CoreTeaser,
  CoreText,
  DownloadEditConfig,
  EmbedEditConfig,
  ImageEditConfig,
  LanguageNavigationEditConfig,
  ListEditConfig,
  NavigationEditConfig,
  TeaserEditConfig,
  TextEditConfig,
  TitleEditConfig,
} from 'aem-vue-3-core-wcm-components-base';
import {
  AccordionEditConfig,
  CarouselEditConfig,
  ContainerEditConfig,
  ContentFragmentEditConfig,
  CoreAccordion,
  CoreCarousel,
  CoreContentFragment,
  CoreExperienceFragment,
  CoreTabs,
  ExperienceFragmentEditConfig,
  MapToContentFragmentModel,
  TabsEditConfig,
} from 'aem-vue-3-core-wcm-components-spa';
import CompositeRoute from '@/components/CompositeRoute.vue';
import StanleyContainer from '@/components/StanleyContainer.vue';
import StanleyHeader from '@/components/StanleyHeader.vue';
import StanleyImage from '@/components/StanleyImage.vue';
import StanleyTitle from '@/components/StanleyTitle.vue';
import StanleyContactForm from '@/components/StanleyContactForm.vue';
import StanleyButton from '@/components/StanleyButton.vue';
import StanleyContentFragment from '@/components/StanleyContentFragment.vue';
import { Component } from 'vue';

interface ResponsiveGridComponentProperties extends MappedComponentProperties {
  cqItems: object;
  cqItemsOrder: string[];
}

const ResponsiveGridEditConfig: EditConfig<ResponsiveGridComponentProperties> =
  {
    isEmpty(props: { cqItems: object; cqItemsOrder: string[] }) {
      return props.cqItemsOrder && props.cqItemsOrder.length > 0;
    },
  };

MapTo('stanley/components/separator')(CoreSeparator);
MapTo('stanley/components/teaser')(CoreTeaser, TeaserEditConfig);
MapTo('stanley/components/image')(StanleyImage, ImageEditConfig);
MapTo('stanley/components/title')(StanleyTitle, TitleEditConfig);
MapTo('stanley/components/breadcrumb')(CoreBreadcrumb, BreadcrumbEditConfig);
MapTo('stanley/components/navigation')(CoreNavigation, NavigationEditConfig);
MapTo('stanley/components/languagenavigation')(
  CoreLanguageNavigation,
  LanguageNavigationEditConfig,
);
MapTo('stanley/components/accordion')(CoreAccordion, AccordionEditConfig);
MapTo('stanley/components/button')(StanleyButton, ButtonEditConfig);
MapTo('stanley/components/carousel')(CoreCarousel, CarouselEditConfig);
MapTo('stanley/components/container')(StanleyContainer, ContainerEditConfig);
MapTo('stanley/components/text')(CoreText, TextEditConfig);
MapTo('wcm/foundation/components/responsivegrid')(
  ResponsiveGrid,
  ResponsiveGridEditConfig,
);
MapTo('stanley/components/page')(CompositeRoute);
MapTo('stanley/components/experiencefragment')(
  CoreExperienceFragment,
  ExperienceFragmentEditConfig,
);
MapTo('stanley/components/header')(StanleyHeader);
MapTo('stanley/components/contact-form')(StanleyContactForm);
MapTo('stanley/components/download')(CoreDownload, DownloadEditConfig);
MapTo('stanley/components/embed')(CoreEmbed, EmbedEditConfig);
MapTo('stanley/components/list')(CoreList, ListEditConfig);
MapTo('stanley/components/tabs')(CoreTabs, TabsEditConfig);
MapTo('stanley/components/contentfragment')(
  CoreContentFragment,
  ContentFragmentEditConfig,
);

MapToContentFragmentModel('stanley/models/about')(
  StanleyContentFragment as Component,
);
