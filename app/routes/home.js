import Ember from 'ember';

const { get } = Ember;

export default Ember.Route.extend({
  flickrSearch: Ember.inject.service(),
  model() {
    let service = get(this, 'flickrSearch');
    return service.search('airplane terminals', () => {
      this.onSearch();
    });
  },
  onSearch() {
    this.refresh();
  }
});
