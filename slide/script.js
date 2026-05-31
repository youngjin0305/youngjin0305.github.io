const slides = Array.from(document.querySelectorAll('.slide'));
const counter = document.getElementById('counter');
const progress = document.getElementById('progressBar');
let index = 0;
function clamp(n){ return Math.max(0, Math.min(slides.length - 1, n)); }
function render(){
  index = clamp(index);
  slides.forEach((s,i)=>{
    s.classList.toggle('active', i === index);
    s.classList.toggle('prev', i < index);
  });
  counter.textContent = `${index + 1} / ${slides.length}`;
  progress.style.width = `${((index + 1) / slides.length) * 100}%`;
  const title = slides[index].dataset.title || slides[index].querySelector('h2,h1')?.textContent?.trim() || '';
  history.replaceState(null, '', `#${index + 1}`);
  document.title = `${index + 1}/${slides.length} · ${title}`;
}
function next(){ index = clamp(index + 1); render(); }
function prev(){ index = clamp(index - 1); render(); }
document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);
document.addEventListener('keydown', (e)=>{
  if(['ArrowRight','PageDown',' '].includes(e.key)){ e.preventDefault(); next(); }
  if(['ArrowLeft','PageUp','Backspace'].includes(e.key)){ e.preventDefault(); prev(); }
  if(e.key.toLowerCase() === 'f'){
    if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
  if(e.key.toLowerCase() === 'p') window.print();
});
window.addEventListener('hashchange', ()=>{
  const n = parseInt(location.hash.replace('#',''),10);
  if(!Number.isNaN(n)){ index = clamp(n - 1); render(); }
});
const initial = parseInt(location.hash.replace('#',''),10);
if(!Number.isNaN(initial)) index = clamp(initial - 1);
render();
