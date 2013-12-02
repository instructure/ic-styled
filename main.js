/*!
 * ic-styled
 * please see license at https://github.com/instructure/ic-styled
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['ember'], function(Ember) { return factory(Ember); });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('ember'));
  } else {
    root.ic = root.ic || {};
    root.ic.Styled = factory(Ember);
  }
}(this, function(Ember) {

  /*
   * Auto-injects a sister component containing the styles for this component.
   * Given a component `x-foo` create a template at `components/x-foo-css`,
   * treat it like a `css` file, it becomes a `<style>` tag.
   */

  Ember.Component.reopen({
    injectStyles: function() {
      var klass = this.constructor;
      var Style = lookupStyleComponent(this);
      if (!Style || Style._injected) { return; }
      Style._injected = true;
      var style = Style.create();
      style.reopen({tagName: 'style', classNames: 'ic-styled'});
      style.appendTo(document.body);
      Ember.run.scheduleOnce('afterRender', this, function() {
        style.$().prependTo('head');
      });
    }.on('willInsertElement')
  });

  function getStyleComponentName(component) {
    var camelize = Ember.String.camelize;
    var dasherize = Ember.String.dasherize;
    var name = component.toString().split('.')[1].split(':')[0];
    return dasherize(camelize(name)).replace('-component', '-css');
  }

  function lookupStyleComponent(component) {
    var noIdea = component.container.lookup('component-lookup:main');
    var name = getStyleComponentName(component);
    return noIdea.lookupFactory(name, component.container);
  }

}));

