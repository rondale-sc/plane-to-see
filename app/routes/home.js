import Ember from 'ember';
import { search } from 'sw-planes/utils/flickr-search';

export default Ember.Route.extend({
  model() {
    return search('airplane terminals');
  }
});
