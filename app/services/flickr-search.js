import Ember from 'ember';
import { search } from 'sw-planes/utils/flickr-search';

const { set, get } = Ember;

export default Ember.Service.extend({
  isLoading: null,
  onSearch: null,
  refresh() {
    if (get(this, 'onSearch')) {
      get(this, 'onSearch')();
    }
  },
  search(text, onSearch) {
    set(this, 'isLoading', true);
    set(this, 'onSearch', onSearch);

    return search(text).then((response) => {
      return response;
    }).finally(() => {
      set(this, 'isLoading', false);
    });
  }
});
