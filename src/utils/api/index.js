import DirectusSDK from '@directus/sdk-js';
import config from '../../config';
import { PRECIOUS } from '../constant';

const api = new DirectusSDK({
  url: config.apiUrl,
  project: config.apiProjectName,
  storage: window.localStorage,
});

export async function getAboutDataApi() {
  return await api.getItems('about_us', {
    fields: [
      'id',
      'post_title_fr',
      'post_title_en',
      'post_content_en',
      'post_content_fr',
      'post_image.data',
    ],
  });
}

export async function getEventsDataApi() {
  return await api.getItems('events', {
    fields: [
      'id',
      'event_title_fr',
      'event_title_en',
      'event_content_en',
      'event_content_fr',
      'event_description_en',
      'event_description_fr',
      'event_image.data',
    ],
  });
}

export async function getPostDataApi(postId) {
  return await api.getItems('gem_post_precious?fields=*.*', {
    filter: {
      'gem_variety.id': {
        eq: postId,
      },
    },
  });
}

export async function getPreciousPostsByLotNumber(lotnumber) {
  return await api.getItems(
    'gem_post_precious?fields=*,certificate.data.full_url, gem_pic.data.full_url,gem_shape.shape_name_en,gem_shape.shape_name_fr,gem_variety.category_name_en, gem_variety.category_name_fr, gem_color.gem_color_en, gem_color.gem_color_fr',
    {
      filter: {
        lot_number: lotnumber,
      },
    }
  );
}

export async function getSemiPreciousPostsByLotNumber(lotnumber) {
  return await api.getItems(
    'gem_post_semi_precious?fields=*,certificate.data.full_url, gem_pic.data.full_url,gem_shape.shape_name_en,gem_shape.shape_name_fr,gem_variety.category_name_en, gem_variety.category_name_fr, gem_color.gem_color_en, gem_color.gem_color_fr', 
    {
      filter: {
        lot_number: lotnumber,
      },
    }
  );
}

export async function getFilteredGemPostDataApi(
  filterOptions = {},
  sortOptions = {},
  gemType,
  page
) {
  if (gemType === PRECIOUS) {
    return await api.getItems(
      'gem_post_precious?fields=*.*',
      // ,certificate.data, gem_pic.data,gem_shape.shape_name_en,gem_shape.shape_name_fr, gem_variety.category_name_fr',
      {
        ...sortOptions,
        // sort:'price_per_carat',
        filter: filterOptions,
        limit: 20,
        page,
        meta: '*',
      }
    );
  } else {
    return await api.getItems(
      'gem_post_semi_precious?fields=*.*',
      // certificate.data.full_url, gem_pic.data.full_url,gem_shape.shape_name_en,gem_shape.shape_name_fr',
      {
        ...sortOptions,
        filter: filterOptions,
        limit: 20,
        page,
        meta: '*',
      }
    );
  }
}

export async function getFIlteredSemiPreciousPostDataApi(
  filterOptions = {},
  sortOptions = {},
  page
) {
  return await api.getItems(
    'gem_post_semi_precious?fields=*,certificate.data.full_url, gem_pic.data.full_url,gem_shape.shape_name_en,gem_shape.shape_name_fr,gem_variety.category_name_en, gem_variety.category_name_fr, gem_color.gem_color_en, gem_color.gem_color_fr',
    {
      ...sortOptions,
      filter: filterOptions,
      limit: 20,
      page,
      meta: '*',
    }
  );
}

export async function getCategoryDataApi() {
  return await api.getItems('gem_category', {
    fields: [
      'id',
      'category_name_fr',
      'category_name_en',
      'category_image.data',
      'order_number',
    ],
  });
}

export async function getSemiPreciousCategoryDataApi() {
  return await api.getItems(
    'semi_precious?fields=*,id,semi_precious_type_fr,semi_precious_type_en,semi_precious_image.data'
  );
}
export async function getSemiPreciousListCategoryDataApi(semiPreciousId) {
  return await api.getItems(
    'gem_category_semi_precious?fields=id,category_name_en,category_name_fr,semi_precious_type.id, semi_precious_type.semi_precious_type_en, semi_precious_type.semi_precious_type_fr',
    {
      filter: {
        'semi_precious_type.id': semiPreciousId,
      },
    }
  );
}

export async function getGemShapeDataApi() {
  return await api.getItems('gem_shape', {
    fields: ['id', 'shape_name_fr', 'shape_name_en', 'image.data'],
  });
}

export async function getColoursDataApi() {
  return await api.getItems('gem_color', {
    fields: ['id', 'gem_color_fr', 'gem_color_en', 'gem_image.data'],
  });
}
