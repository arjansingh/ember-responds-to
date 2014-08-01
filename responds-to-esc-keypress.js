
// Calls this.send('escKeypress') on ESC keydown
// --------------------------------------
// Remember to call this._super() if you override didInsertElement or willDestroyElement.
//

var ESC_ACTION_NAME = 'escKeypress';
var onKeypress;
var ESC_CODE = 27;
var listeners = []; // Used to call listeners in LIFO order

$(window).on('keydown', this, function (e) {
  if (e.which !== ESC_CODE) return;
  if (['SELECT', 'INPUT'].indexOf(e.target.tagName) > -1) return;
  listeners.some(function (listener) {
    return listener.escKeypress();
  });
});

App.RespondsToEscKeypress = Ember.Mixin.create({

  init: function () {
    this._super();
    Ember.assert('RespondsToEscKeypress must be mixed in to a View', this instanceof Ember.View);
  },

  // @return {boolean} stopPropagation
  escKeypress: function () { },

  didInsertElement: function () {
    this._super();
    listeners.unshift(this);
  },

  willClearRender: function () {
    this._super();
    listeners = listeners.filter(function (listener) {
      return listener !== this;
    }, this);
  }
});
