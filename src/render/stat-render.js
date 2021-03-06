import { cls } from './sprint-scr';

const statContent = `
<div class="stat-wrapper">
<header class="sprint-header">
<img src="assets/images/svg/burger-sprint.svg" alt="menu" title="menu" class="sprint-menu-on" />
<div class="sprint-user">
  <span class="sprin-header-span">User: ${getUser()}</span>
</div>
</header>
<div class="stat-cards">
<div class="stat sprint-stat">
<h2 class="stat-title">Sprint stats</h2>
<ul class="sprint-stat-list">
  <li class="stat-list-item">Number of rounds played <span class="sprint-nrp">0</span></li>
  <li class="stat-list-item">Number of correct answers <span class="sprint-nca">0</span></li>
  <li class="stat-list-item">Max number of correct answers in a row <span class="sprint-ncar">0</span></li>
  <li class="stat-list-item">Number of words added to learned <span class="sprint-nwal">0</span></li>
</ul>
</div>
<div class="stat audio-stat">
<h2 class="stat-title">Audiochallenge stats</h2>
<ul class="audio-stat-list">
  <li class="stat-list-item">Number of rounds played <span class="audio-nrp">0</span></li>
  <li class="stat-list-item">Number of correct answers <span class="audio-nca">0</span></li>
  <li class="stat-list-item">Number of words added to learned <span class="audio-nwal">0</span></li>
</ul>
</div>
<div class="stat ebook-stat">
<h2 class="stat-title">E-book stats</h2>
<ul>
  <li class="stat-list-item">Number of words added to learned <span class="ebook-nwal">0</span></li>
  <li class="stat-list-item">Number of words added to difficult <span class="ebook-nwadf">0</span></li>
</ul>
</div>
</div>
</div>
`;

const stat = () => {
  cls();
  const statElement = document.createElement('div');
  statElement.classList.add('stat-wrapper');
  statElement.innerHTML = statContent;
  return statElement.innerHTML;
};

const renderStat = {
  render: stat(),
};
export default renderStat;

export function getUser() {
  const name = localStorage.getItem('userName');
  return name || 'unregistered';
}
