const chapters = [
  {
    id: 'case-01', mark: '01', className: 'card-sun', label: 'THE LAST EMAIL', title: '她删掉了老板的邮件。', subtitle: '结果，邮件自己回来了。', count: 12,
    desc: '周一 8:59，实习生林夏发现一封不该出现的邮件。她按下删除键，却在垃圾箱里看见了自己的名字。',
    words: [
      ['evidence', '证据', '能把人钉在原地的东西'], ['delete', '删除', '手指一滑，麻烦还在'], ['urgent', '紧急的', '老板最爱用的三个字'], ['reveal', '揭示', '真相掀开一角'], ['suspect', '怀疑', '所有人突然都可疑'], ['deadline', '截止时间', '反派的倒计时'], ['forward', '转发', '秘密开始扩散'], ['accuse', '指责', '先开口的人未必赢'], ['reply', '回复', '已读不代表结束'], ['expose', '揭露', '把藏好的牌翻出来'], ['witness', '目击者', '她看见了不该看见的'], ['backup', '备份', '删除只是表面功夫']
    ]
  },
  {
    id: 'case-02', mark: '02', className: 'card-violet', label: 'THE FAKE DATE', title: '她答应了一个假约会。', subtitle: '对方却带来了真情报。', count: 12,
    desc: '为了拿到那份名单，周棠接受了一个陌生人的邀约。餐厅灯灭的那一刻，她发现对方比照片年轻十岁。',
    words: [
      ['pretend', '假装', '演得像，才有下一幕'], ['clue', '线索', '藏在菜单背面的字'], ['betray', '背叛', '最熟的人递来刀'], ['negotiate', '谈判', '先报出你的底牌'], ['secret', '秘密', '不能说出口的部分'], ['escape', '逃脱', '门一关，剧情加速'], ['trust', '信任', '暂时借给对方的东西'], ['signal', '信号', '红灯闪了三次'], ['scheme', '计谋', '谁在布局谁在入局'], ['risk', '风险', '心动也可能是陷阱'], ['confess', '坦白', '真话往往来得太晚'], ['disappear', '消失', '他只留下一张票']
    ]
  },
  {
    id: 'case-03', mark: '03', className: 'card-blue', label: 'THE NIGHT SHIFT', title: '凌晨三点，电梯停了。', subtitle: '她听见了自己的声音。', count: 12,
    desc: '整栋大楼只剩一盏灯。电梯停在 17 层，门外没有人，但监控里，另一个她正在走近。',
    words: [
      ['monitor', '监控', '它记录，却不会解释'], ['shadow', '影子', '比本人先到的访客'], ['observe', '观察', '先看清，再决定'], ['signal', '信号', '黑暗里的唯一回应'], ['panic', '恐慌', '心跳先替你做决定'], ['silent', '沉默的', '最响的一种回答'], ['corridor', '走廊', '尽头不一定有出口'], ['locate', '定位', '找到它，也暴露自己'], ['vanish', '消失', '一眨眼就不见了'], ['alarm', '警报', '它终于响了'], ['survive', '幸存', '撑过这一幕再说'], ['doubt', '怀疑', '镜子里的人是真的吗']
    ]
  },
  {
    id: 'case-04', mark: '04', className: 'card-dark', label: 'THE FINAL PITCH', title: '她只用十句话翻盘。', subtitle: '会议室里，安静了。', count: 12,
    desc: '所有人都等着看她出丑。她打开投影，删掉 39 页废话，只留下十个能改变结果的词。',
    words: [
      ['strategy', '策略', '赢之前先换规则'], ['convince', '说服', '让对方觉得是他的想法'], ['impact', '影响', '一句话的后坐力'], ['profit', '利润', '数字会替你发言'], ['challenge', '挑战', '把质疑变成台阶'], ['insist', '坚持', '再说一遍也算力量'], ['clarify', '澄清', '把雾拨开'], ['propose', '提议', '主动递出新方案'], ['approve', '批准', '最后一个点头'], ['deserve', '值得', '她一直知道答案'], ['achieve', '实现', '结局不是运气'], ['upgrade', '升级', '下一幕从这里开始']
    ]
  }
];

const quizData = [
  { question: '“The evidence was too ______ to ignore.”', options: ['urgent', 'convincing', 'silent', 'fake'], answer: 'convincing', tip: 'convincing = 有说服力的，证据已经强到无法忽视。' },
  { question: '“She had to ______ the truth before the meeting.”', options: ['reveal', 'vanish', 'pretend', 'profit'], answer: 'reveal', tip: 'reveal = 揭示 / 揭露，把藏着的真相翻出来。' },
  { question: '“A good ______ makes a hard thing easier to remember.”', options: ['deadline', 'story', 'alarm', 'risk'], answer: 'story', tip: 'story = 故事。好的上下文，就是记忆的挂钩。' }
];

const vocabulary = Array.isArray(window.ieltsVocabulary) ? window.ieltsVocabulary : [];
const STORAGE_KEY = 'word-quest-progress-v2';
const LEGACY_STORAGE_KEY = 'word-quest-progress-v1';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    const saved = raw ? JSON.parse(raw) : {};
    return {
      lit: Array.isArray(saved.lit) ? [...new Set(saved.lit)] : [],
      mastered: Array.isArray(saved.mastered) ? [...new Set(saved.mastered.map(Number).filter(Number.isFinite))] : [],
      streak: Number(saved.streak) || 1,
      quizBest: Number(saved.quizBest) || 0
    };
  } catch {
    return { lit: [], mastered: [], streak: 1, quizBest: 0 };
  }
}

const state = loadState();
const chapterGrid = document.querySelector('#chapterGrid');
const dialog = document.querySelector('#chapterDialog');
const wordDeck = document.querySelector('#wordDeck');
const toast = document.querySelector('#toast');
const libraryGrid = document.querySelector('#libraryGrid');
const librarySearch = document.querySelector('#librarySearch');
const libraryTopic = document.querySelector('#libraryTopic');
const librarySort = document.querySelector('#librarySort');
const libraryEmpty = document.querySelector('#libraryEmpty');
const libraryResultCount = document.querySelector('#libraryResultCount');
const libraryPageLabel = document.querySelector('#libraryPage');
const libraryPrev = document.querySelector('#libraryPrev');
const libraryNext = document.querySelector('#libraryNext');
const PAGE_SIZE = 24;
let libraryPage = 1;
let activeChapter = chapters[0];
let currentQuiz = 0;
let quizAnswered = false;

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateProgress();
}

function updateProgress() {
  const total = chapters.reduce((sum, chapter) => sum + chapter.words.length, 0);
  const done = state.lit.length;
  document.querySelector('#progressText').textContent = `${done} / ${total}`;
  document.querySelector('#progressBar').style.width = `${Math.min(100, (done / total) * 100)}%`;
  document.querySelector('#streakCount').textContent = state.streak;
  document.querySelector('#vocabTotal').textContent = vocabulary.length.toLocaleString('en-US');
  document.querySelector('#libraryMasteredCount').textContent = state.mastered.length.toLocaleString('en-US');
  const badgeTitle = document.querySelector('#badgeTitle');
  const badgeSub = document.querySelector('#badgeSub');
  if (state.quizBest >= 3) { badgeTitle.textContent = '剧情记忆官'; badgeSub.textContent = '今日复盘已满分'; }
  else if (done >= 12) { badgeTitle.textContent = '第一幕点亮'; badgeSub.textContent = `${done} 个词已进入你的词场`; }
  else { badgeTitle.textContent = '未点亮'; badgeSub.textContent = '完成一幕后解锁'; }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function setupLibraryTopics() {
  const topics = [...new Map(vocabulary.map((entry) => [entry.sort, entry.topic])).entries()]
    .sort((a, b) => a[0] - b[0]);
  libraryTopic.innerHTML = '<option value="all">全部主题</option>' + topics.map(([sort, topic]) => `<option value="${sort}">${escapeHTML(topic)}</option>`).join('');
}

function getFilteredVocabulary() {
  const query = librarySearch.value.trim().toLowerCase();
  const topic = libraryTopic.value;
  const sort = librarySort.value;
  const result = vocabulary.filter((entry) => {
    const topicMatch = topic === 'all' || String(entry.sort) === topic;
    const searchText = `${entry.word} ${entry.meaning} ${entry.topic}`.toLowerCase();
    return topicMatch && (!query || searchText.includes(query));
  });
  if (sort === 'az') result.sort((a, b) => a.word.localeCompare(b.word));
  if (sort === 'unmastered') result.sort((a, b) => Number(state.mastered.includes(a.id)) - Number(state.mastered.includes(b.id)) || a.id - b.id);
  return result;
}

function renderLibrary() {
  const filtered = getFilteredVocabulary();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  libraryPage = Math.min(libraryPage, totalPages);
  const pageItems = filtered.slice((libraryPage - 1) * PAGE_SIZE, libraryPage * PAGE_SIZE);
  libraryResultCount.textContent = `${filtered.length.toLocaleString('en-US')} 个词条`;
  libraryPageLabel.textContent = filtered.length ? `第 ${libraryPage} / ${totalPages} 页` : '暂无结果';
  libraryPrev.disabled = libraryPage <= 1;
  libraryNext.disabled = libraryPage >= totalPages;
  libraryEmpty.hidden = filtered.length > 0;
  libraryGrid.innerHTML = pageItems.map((entry) => {
    const mastered = state.mastered.includes(entry.id);
    return `<button class="vocab-card ${mastered ? 'mastered' : ''}" data-vocab-id="${entry.id}" type="button">
      <span class="vocab-card-top"><span>#${String(entry.id).padStart(4, '0')}</span><span>${escapeHTML(entry.topic)}</span></span>
      <strong>${escapeHTML(entry.word)}</strong>
      <small>${escapeHTML(entry.phonetic || '音标待补')}</small>
      <p>${escapeHTML(entry.meaning)}</p>
      <span class="vocab-card-foot"><span>${mastered ? '已点亮 · 再看一眼' : '点亮这个词'}</span><span>${mastered ? '✦' : '＋'}</span></span>
    </button>`;
  }).join('');
  libraryGrid.querySelectorAll('.vocab-card').forEach((card) => card.addEventListener('click', () => {
    const id = Number(card.dataset.vocabId);
    const index = state.mastered.indexOf(id);
    if (index >= 0) {
      state.mastered.splice(index, 1);
      showToast('已取消点亮，可以稍后再复习。');
    } else {
      state.mastered.push(id);
      showToast(`已点亮：${card.querySelector('strong').textContent}`);
    }
    saveState();
    renderLibrary();
  }));
}

function setupLibrary() {
  setupLibraryTopics();
  [librarySearch, libraryTopic, librarySort].forEach((control) => control.addEventListener('input', () => {
    libraryPage = 1;
    renderLibrary();
  }));
  libraryPrev.addEventListener('click', () => { if (libraryPage > 1) { libraryPage -= 1; renderLibrary(); } });
  libraryNext.addEventListener('click', () => {
    const totalPages = Math.max(1, Math.ceil(getFilteredVocabulary().length / PAGE_SIZE));
    if (libraryPage < totalPages) { libraryPage += 1; renderLibrary(); }
  });
}

function renderChapters() {
  chapterGrid.innerHTML = chapters.map((chapter, index) => `
    <article class="chapter-card ${chapter.className}" data-mark="${chapter.mark}" data-index="${index}" style="--card-color:${index === 0 ? '#ffcc47' : index === 1 ? '#aa9cff' : index === 2 ? '#6fd3c9' : '#e3a1c4'}">
      <div class="chapter-top"><span>CASE ${chapter.mark}</span><span>${index === 0 ? 'TODAY' : 'LOCKED?'}</span></div>
      <div class="chapter-title">${chapter.title}<small>${chapter.subtitle}</small></div>
      <div class="chapter-bottom"><span class="chapter-count">${chapter.count} WORDS</span><span class="chapter-arrow">↗</span></div>
    </article>`).join('');
  chapterGrid.querySelectorAll('.chapter-card').forEach(card => card.addEventListener('click', () => openChapter(chapters[Number(card.dataset.index)])));
}

function openChapter(chapter) {
  activeChapter = chapter;
  document.querySelector('#dialogKicker').textContent = `CASE ${chapter.mark} · ${chapter.label}`;
  document.querySelector('#dialogTitle').textContent = chapter.title;
  document.querySelector('#dialogDesc').textContent = chapter.desc;
  renderWords();
  dialog.showModal();
}

function renderWords() {
  wordDeck.innerHTML = activeChapter.words.map((word, index) => {
    const key = `${activeChapter.id}-${index}`;
    const lit = state.lit.includes(key);
    return `<button class="word-card ${lit ? 'lit' : ''}" data-key="${key}" type="button"><b>${word[0]}</b><small>${word[1]}</small><p>${lit ? word[2] : '点击查看记忆钩子'}</p><span class="word-hook">${lit ? '已点亮 · 再看一眼' : '点亮线索 →'}</span></button>`;
  }).join('');
  wordDeck.querySelectorAll('.word-card').forEach((card, index) => card.addEventListener('click', () => {
    const key = card.dataset.key;
    if (!state.lit.includes(key)) {
      state.lit.push(key);
      saveState();
      showToast(`已点亮：${activeChapter.words[index][0]} · ${activeChapter.words[index][1]}`);
    }
    card.classList.add('lit');
    card.querySelector('p').textContent = activeChapter.words[index][2];
    card.querySelector('.word-hook').textContent = '已点亮 · 再看一眼';
    document.querySelector('#dialogProgress').textContent = `${activeChapter.words.filter((_, i) => state.lit.includes(`${activeChapter.id}-${i}`)).length} / ${activeChapter.count} 已点亮`;
  }));
  document.querySelector('#dialogProgress').textContent = `${activeChapter.words.filter((_, i) => state.lit.includes(`${activeChapter.id}-${i}`)).length} / ${activeChapter.count} 已点亮`;
}

function renderQuiz() {
  const item = quizData[currentQuiz];
  quizAnswered = false;
  document.querySelector('#quizCount').textContent = `${String(currentQuiz + 1).padStart(2, '0')} / 03`;
  document.querySelector('#quizQuestion').textContent = item.question;
  document.querySelector('#quizFeedback').textContent = '';
  const next = document.querySelector('#nextQuiz');
  next.disabled = true;
  next.textContent = '选择一个答案';
  document.querySelector('#quizOptions').innerHTML = item.options.map(option => `<button class="quiz-option" type="button" data-answer="${option}">${option}</button>`).join('');
  document.querySelectorAll('.quiz-option').forEach(option => option.addEventListener('click', () => answerQuiz(option, item)));
}

function answerQuiz(option, item) {
  if (quizAnswered) return;
  quizAnswered = true;
  const correct = option.dataset.answer === item.answer;
  option.classList.add(correct ? 'correct' : 'wrong');
  if (!correct) document.querySelector(`[data-answer="${item.answer}"]`).classList.add('correct');
  document.querySelector('#quizFeedback').textContent = correct ? `答对了！${item.tip}` : `再看一眼：${item.tip}`;
  const next = document.querySelector('#nextQuiz');
  next.disabled = false;
  next.textContent = currentQuiz === quizData.length - 1 ? '完成今日复盘 ✦' : '下一题 →';
  if (correct) state.quizBest = Math.max(state.quizBest, currentQuiz + 1);
  saveState();
}

document.querySelector('#nextQuiz').addEventListener('click', () => {
  if (!quizAnswered) return;
  if (currentQuiz === quizData.length - 1) {
    showToast('复盘完成，今天的词已经锁进记忆里 ✦');
    currentQuiz = 0;
    renderQuiz();
    return;
  }
  currentQuiz += 1;
  renderQuiz();
});
document.querySelector('#quickQuiz').addEventListener('click', () => { document.querySelector('#review').scrollIntoView({ behavior: 'smooth' }); });
document.querySelector('#dialogQuiz').addEventListener('click', () => { dialog.close(); document.querySelector('#review').scrollIntoView({ behavior: 'smooth' }); });
document.querySelector('#closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('#resetProgress').addEventListener('click', () => {
  if (!confirm('确定要清空本地学习进度吗？')) return;
  state.lit = []; state.streak = 1; state.quizBest = 0; saveState(); renderWords(); showToast('进度已清空，可以重新开始。');
});

renderChapters();
renderQuiz();
setupLibrary();
renderLibrary();
updateProgress();
