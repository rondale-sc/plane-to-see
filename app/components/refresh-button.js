import Ember from 'ember';

const { get } = Ember;

export default Ember.Component.extend({
  isLoading: Ember.computed.alias('flickrSearch.isLoading'),
  flickrSearch: Ember.inject.service(),
  actions: {
    refresh() {
      get(this, 'flickrSearch').refresh();
    }
  }
});
