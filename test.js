asyncTest('prepends shared style to <head> and only renders once', function() {
  Ember.TEMPLATES['application'] = Ember.Handlebars.compile('{{x-foo}} {{x-foo}}');
  Ember.TEMPLATES['components/x-foo-css'] = Ember.Handlebars.compile('x-foo { color: red; }');
  var App = Ember.Application.create({
    rootElement: '#qunit-fixture'
  });
  App.XFooComponent = Ember.Component.extend({
    tagName: 'x-foo'
  });
  Ember.run.schedule('afterRender', null, function() {
    start();
    var style = $('head > *:first');
    equal(style.attr('id'), 'ic-styled-styles', 'style tag is first and has the right id');
    var css = style.html();
    var expected = [
      '\n\n',
      '/* ic-styled: x-foo-css */',
      '\n\n',
      'x-foo { color: red; }'
    ].join('');
    equal(css, expected);
    ok(true);
  });
});

