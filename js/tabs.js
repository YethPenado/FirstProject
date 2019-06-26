(function(d){
  let tabs = Array.prototype.slice.apply(d.querySelectorAll('.tab__item'));
  let panels = Array.prototype.slice.apply(d.querySelectorAll('.panels__item'));
  d.getElementById('tabs').addEventListener('click', e => {
    if (e.target.classList.contains('tab__item')) {
      let i = tabs.indexOf(e.target);
      panels.map(panel => panel.classList.remove('active'));
      panels[i].classList.add('active');
    }
  });
})(document);
