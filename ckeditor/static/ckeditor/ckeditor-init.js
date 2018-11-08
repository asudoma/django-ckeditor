/* global CKEDITOR */
;(function () {
  var el = document.getElementById('ckeditor-init-script');
  if (el && !window.CKEDITOR_BASEPATH) {
    window.CKEDITOR_BASEPATH = el.getAttribute('data-ckeditor-basepath');
  }

  // Polyfill from https://developer.mozilla.org/en/docs/Web/API/Element/matches
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {
        }
        return i > -1;
      };
  }

  function runInitialisers() {
    initializeCKEditor();
    initialiseCKEditorInInlinedForms();
  }

  if (document.readyState != 'loading') {
    runInitialisers();
  } else {
    document.addEventListener('DOMContentLoaded', runInitialisers);
  }

  function initializeCKEditor() {
    var textareas = Array.prototype.slice.call(document.querySelectorAll('textarea[data-type=ckeditortype]'));
    for (var i = 0; i < textareas.length; ++i) {
      var t = textareas[i];
      if (t.getAttribute('data-processed') == '0' && t.id.indexOf('__prefix__') == -1) {
        t.setAttribute('data-processed', '1');
        let config = JSON.parse(t.getAttribute('data-config'));
        const height = config['height'] || 200;
        const width = config['width'] || 1000;
        delete config['height'];
        delete config['width'];
        ClassicEditor.create(document.querySelector('#' + t.id), config)
          .then(editor => {
            editor.ui.view.editable.editableElement.style.minHeight = height + 'px';
            editor.ui.view.editable.editableElement.style.width = width + 'px';
          }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  function initialiseCKEditorInInlinedForms() {
    document.body.addEventListener('click', function (e) {
      if (e.target && (
        e.target.matches('.add-row a') ||
        e.target.matches('.grp-add-handler')
      )) {
        initializeCKEditor();
      }
    });
  }

}());
