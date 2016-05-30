import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$('img').on('load', function(event) {
      if (event.target.classList.contains('main-photo-img')) {
        event.target.parentNode.classList.add('loaded');
      }
    });
  },
  willDestroy() {
    this.$().off('load');
  }
});
