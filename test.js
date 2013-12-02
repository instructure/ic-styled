var App;

module('ic-styled-component', {
  setup: function() {
    // it is important to have more than one {{x-foo}}
    Ember.TEMPLATES['application'] = Ember.Handlebars.compile('{{x-foo}} {{x-foo}}');
    Ember.TEMPLATES['components/x-foo'] = Ember.Handlebars.compile('ohai');
    Ember.TEMPLATES['components/x-foo-css'] = Ember.Handlebars.compile('x-foo { font-weight: bold; }');
    App = Ember.Application.create({
      rootElement: '#qunit-fixture'
    });
    App.XFooComponent = Ember.Component.extend(ic.Styled, { tagName: 'x-foo' });
    App.setupForTesting();
    Ember.run(App, 'reset');
  },

  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('presence', function() {
  ok(ic.Styled, 'ic.Styled is defined');
});

test('prepends sister component onto <head>', function() {
  var style = $('head > *:first');
  ok(style.hasClass('ic-styled'), 'has .ic-styled class');
});

test('styled component is a <style>', function() {
  var style = $('head > *:first');
  equal(style[0].tagName, 'STYLE', 'is a <style>');
});

test('injects sister component only once', function() {
  equal($('head .ic-styled').length, 1, 'only found one');
});

//test('removes sister component when the component is destroyed', function() {
  // TODO: want to destroy the style tag dropped in the head, but only when the last
  // component is destroyed, or when the app is...
//});

