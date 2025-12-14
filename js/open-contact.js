document.addEventListener('DOMContentLoaded', function () {
  var selectors = ['.header-cta', '.btn-primary', '.cta-button'];
  selectors.forEach(function (sel) {
    var nodes = document.querySelectorAll(sel);
    if (!nodes) return;
    nodes.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'contact.html';
      });
    });
  });
});
