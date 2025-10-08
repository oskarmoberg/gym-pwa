// Markera aktiv flik i bottenmenyn
(function(){
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const map = {
    '': 'pass',
    'index.html': 'pass',
    'exercises.html': 'exercises',
    'export.html': 'export',
    'dashboard.html': 'dashboard'
  };
  const active = map[file] || 'pass';
  document.querySelectorAll('.tabbar a').forEach(a=>{
    if(a.dataset.tab === active) a.classList.add('active');
  });
})();
