const vocabulary = Array.isArray(window.ieltsVocabulary) ? window.ieltsVocabulary : [];
const STORAGE_KEY = 'word-quest-progress-v2';
const LEGACY_STORAGE_KEY = 'word-quest-progress-v1';
const storyMeta = {
  '自然地理': { label: 'NATURAL WORLD', title: '她以为只是一次天气预警。', subtitle: '但地球把真正的答案藏在地层下面。', desc: '一份气象报告在凌晨被改写。她必须沿着风、海岸和岩层留下的线索，找到灾难真正开始的地方。', turn: '预警并不是结局，而是地球发来的第一封密信。', hook: '把每个自然现象想成现场留下的物证。' },
  '植物研究': { label: 'THE GREENHOUSE', title: '温室里长出的不是花。', subtitle: '每一片叶子都指向同一个名字。', desc: '研究员林夏收到一枚没有编号的种子。它只在夜里发芽，叶脉里藏着一张改变实验结论的地图。', turn: '真正被培育的，从来不是植物，而是一条不能公开的证据链。', hook: '把词义想成一粒种子，先埋进故事，最后才破土。' },
  '动物保护': { label: 'WILD SIGNAL', title: '被救回的鲸鱼带着一个坐标。', subtitle: '它要她去找消失的保护区。', desc: '海岸救援站接收了一只受伤的鲸鱼。追踪器发出的信号，指向一片地图上从未存在过的海域。', turn: '它不是迷路了，它在带她回到被人藏起来的现场。', hook: '把每个动物词想成一枚会移动的追踪信号。' },
  '太空探索': { label: 'DEEP SPACE', title: '失联探测器突然发来人声。', subtitle: '而那是她十年前的声音。', desc: '环绕轨道上的探测器沉默了 72 小时，重启后只传回一段坐标。她负责解码，却听见了自己的名字。', turn: '宇宙最远的回声，竟然来自她还没有走过的未来。', hook: '把词义想成舷窗外的一颗星，点击就是重新接通信号。' },
  '学校教育': { label: 'THE LAST EXAM', title: '她的成绩单被提前改写。', subtitle: '答题的人却还没走进考场。', desc: '毕业答辩前夜，林夏发现自己的成绩单多了一门不存在的课程。每一个答案，都在指向校长办公室的旧档案。', turn: '真正的考试不是拿分，而是她敢不敢改写规则。', hook: '把每个教育词想成考场里突然亮起的提示灯。' },
  '科技发明': { label: 'THE OFFLINE DEVICE', title: '那部关机的手机还在发消息。', subtitle: '每一条都比上一条更像她。', desc: '维修台上的旧手机没有电，却在凌晨 1:17 发出一条陌生通知。她顺着代码追查，发现发信人来自一次未完成的实验。', turn: '技术没有失控，失控的是那个以为自己能控制技术的人。', hook: '把词义想成装置里的隐藏按钮，按下去，剧情就会启动。' },
  '文化历史': { label: 'THE MISSING RELIC', title: '博物馆失踪的文物在她包里。', subtitle: '可她从没走进那间展厅。', desc: '闭馆后的监控只留下十七秒空白。第二天，一件消失百年的文物出现在她的书包夹层。', turn: '历史不是过去式，它会在最不该出现的地方向你索要证词。', hook: '把词义当成一件会穿越时间的展品，先看轮廓，再看细节。' },
  '语言演化': { label: 'THE NEW WORD', title: '那封古老信件每晚多出一个词。', subtitle: '最后一个词写的是她的名字。', desc: '语言研究所保存着一封无法确定年代的信。每到午夜，纸上的句子就会自动变化，像有人正在隔着历史对话。', turn: '她终于明白，语言会变，不是因为旧词消失，而是因为有人需要新的出口。', hook: '把词义想成一枚会变形的密码，放进上下文里才知道它的方向。' },
  '娱乐运动': { label: 'FINAL SECOND', title: '终场前十秒，数据指出胜者不是她。', subtitle: '但观众席里有人提前欢呼。', desc: '决赛的实时数据突然反转。她必须在最后一次冲刺前看懂那些看似无关的统计、规则和动作。', turn: '比分不会替她奔跑，真正的翻盘发生在最后一个决定里。', hook: '把词义想成赛场上的动作指令，看到它，就知道下一步怎么做。' },
  '物品材料': { label: 'THE OLD MATERIAL', title: '鉴定台上的戒指比历史更旧。', subtitle: '它的材质却来自一座不存在的矿。', desc: '一枚没有主人信息的戒指送进实验室。材料报告一次次改变，直到她发现戒圈内侧刻着一串地址。', turn: '物品不会说谎，真正会改口的是解释它的人。', hook: '把每个词想成材料样本，摸到质地，才不会只记住表面。' },
  '时尚潮流': { label: 'THE LAST LOOK', title: '秀场主灯熄灭后，所有人穿同一件衣服。', subtitle: '只有她的袖口藏着不同的答案。', desc: '新品发布会在最高潮时断电。灯光重启，台上台下的人都换了造型，只有她保留着那道不该出现的暗纹。', turn: '潮流会改变人的外表，但真正的身份藏在不被看见的细节里。', hook: '把词义当成穿搭里的暗纹，先看风格，再抓住那个反常点。' },
  '饮食健康': { label: 'THE SECRET MENU', title: '评委消失前只留下一张菜单。', subtitle: '每一道菜都像一条身体报告。', desc: '健康实验室的晚餐测试出了异常结果。评委离席后，一张手写菜单把饮食、营养和风险全部串成一条线。', turn: '真正危险的不是一口食物，而是没人愿意承认的习惯。', hook: '把词义想成菜单上的成分，放进身体这条主线里就不容易忘。' },
  '建筑场所': { label: 'FLOOR 17', title: '电梯停在不存在的楼层。', subtitle: '门外的建筑正在重新排列。', desc: '城市地标的平面图一夜之间多出一层。她从电梯走出，发现每一扇门都通向一段被删掉的城市记忆。', turn: '建筑记住了所有来过的人，哪怕地图决定把他们删掉。', hook: '把词义想成一扇门，位置、结构和功能会一起帮你记住它。' },
  '交通旅行': { label: 'THE WRONG TICKET', title: '机场登机牌写着昨天的日期。', subtitle: '却能带她去一座不存在的城市。', desc: '安检口没有拦她，广播也叫出了她的名字。唯一不对的是登机牌：它属于昨天那班已经失踪的航班。', turn: '旅行最危险的时刻，不是出发，而是你发现自己已经到过这里。', hook: '把词义想成旅行中的路标，顺序、方向和目的地会组成记忆路线。' },
  '国家政府': { label: 'THE RED NOTICE', title: '城市的红色通知只发给她。', subtitle: '每一条都像一份提前写好的命令。', desc: '全城手机同时收到一条公告，只有她看见了隐藏的第二层。她必须在官方声明落地前，找到谁改动了原文。', turn: '权力最安静的时候，往往是它已经替所有人写好答案的时候。', hook: '把词义想成公告里的关键词，谁发布、谁执行、谁承担会让它变清楚。' },
  '社会经济': { label: 'THE SMALL RECEIPT', title: '一张小票让整个市场停摆。', subtitle: '数字背后藏着一个人的名字。', desc: '普通便利店的收据突然成为热搜。她追查价格、交易和利益链，发现每一次微小变化都有人从中获利。', turn: '经济不是冷冰冰的数字，数字的另一端永远站着一个做决定的人。', hook: '把词义想成交易现场的筹码，谁得到、谁失去会让它牢牢落地。' },
  '法律法规': { label: 'THE MISSING CLAUSE', title: '法院门口的证词被提前说出。', subtitle: '而原告还没有开口。', desc: '审判开始前，匿名账号公开了完整证词。她在法条和证据之间寻找漏洞，发现真正缺失的不是证人，而是一句话。', turn: '法律的反转不在声音最大的人，而在那一条被所有人忽略的条款里。', hook: '把词义想成法庭上的证据卡，先判断角色，再判断动作和结果。' },
  '沙场争锋': { label: 'THE SECOND COMMAND', title: '无人战场里，指挥台亮起第二个名字。', subtitle: '所有命令都来自两支军队。', desc: '演习地图上的部队全部静止，只有一座废弃指挥台重新亮起。她需要读懂策略、装备和行动，找出真正的指挥者。', turn: '最危险的命令不是冲锋，而是让所有人以为命令来自自己。', hook: '把词义想成战场指令，角色、动作和目标会一起组成画面。' },
  '社会角色': { label: 'THE FALSE BADGE', title: '她收到一张写着“真正身份”的工牌。', subtitle: '公司里却没有这个职位。', desc: '新员工入职日，一张陌生工牌放在她的桌上。所有人都知道她是谁，只有她不知道自己被安排成了谁。', turn: '身份不是别人递给你的标签，而是你在关键时刻选择站在哪里。', hook: '把词义想成一张工牌，人物关系和责任会替它加上重量。' },
  '行为动作': { label: 'THE MOVING ROOM', title: '房间里所有物品都在自行移动。', subtitle: '只有她的脚步没有留下声音。', desc: '监控显示房间从未有人进入，桌上的物品却按照某种顺序改变位置。她开始复原每一个动作，直到门自己打开。', turn: '行为会留下轨迹，哪怕最小的动作也能把真相推向出口。', hook: '把词义想成一帧动作画面，谁在做、怎么做、结果如何一眼就能记住。' },
  '身心健康': { label: 'THE SECOND REPORT', title: '心理评估结果有第二个签名。', subtitle: '医生说她从未见过那个人。', desc: '一份健康报告在提交后多出一段评语。她沿着焦虑、习惯和情绪的线索追查，发现报告正在描述另一个自己。', turn: '真正的恢复不是删掉所有不安，而是终于听懂它在提醒什么。', hook: '把词义想成身体或情绪发来的通知，先听见，再判断。' },
  '时间日期': { label: 'THE TOMORROW MAIL', title: '她收到一封来自明天的复盘邮件。', subtitle: '邮件要求她今晚完成所有答案。', desc: '收件箱里出现一封时间戳异常的邮件。每读完一个词，日期就向前跳一天，像有人在催她赶上自己的未来。', turn: '时间不会替你记住答案，但会把没有完成的事情一遍遍送回来。', hook: '把词义放进时间线，先后、持续和转折会自然留下顺序。' }
};

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
const toast = document.querySelector('#toast');
const libraryGrid = document.querySelector('#libraryGrid');
const librarySearch = document.querySelector('#librarySearch');
const libraryTopic = document.querySelector('#libraryTopic');
const librarySort = document.querySelector('#librarySort');
const libraryEmpty = document.querySelector('#libraryEmpty');
const libraryResultCount = document.querySelector('#libraryResultCount');
const episodeDialog = document.querySelector('#episodeDialog');
const episodeStory = document.querySelector('#episodeStory');
const episodeScenes = document.querySelector('#episodeScenes');
const episodeInsight = document.querySelector('#episodeInsight');
const episodeInsightContent = document.querySelector('#episodeInsightContent');
const episodeInsightPlaceholder = document.querySelector('#episodeInsightPlaceholder');
const episodeMasterButton = document.querySelector('#episodeMasterButton');
const episodePrev = document.querySelector('#episodePrev');
const episodeNext = document.querySelector('#episodeNext');
let activeEpisode = null;
let activeScene = 0;
let activeEntryId = null;
let currentQuiz = 0;
let quizAnswered = false;

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function chunk(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) result.push(items.slice(index, index + size));
  return result;
}

function buildEpisodes() {
  const topics = [...new Map(vocabulary.map((entry) => [entry.sort, entry.topic])).entries()].sort((a, b) => a[0] - b[0]);
  const colors = ['card-sun', 'card-violet', 'card-blue', 'card-dark'];
  return topics.map(([sort, topic], index) => {
    const meta = storyMeta[topic] || {
      label: `CASE FILE ${String(index + 1).padStart(2, '0')}`,
      title: `${topic}的答案藏在下一幕。`,
      subtitle: '她必须先看懂线索，再决定下一步。',
      desc: `一份来自${topic}的档案在深夜被重新打开，所有线索都指向同一个未完成的答案。`,
      turn: '线索从来不会自己消失，只会等着下一个读懂它的人。',
      hook: '把词义想成剧情里的证据，放进现场就不会孤零零地飘着。'
    };
    const entries = vocabulary.filter((entry) => entry.sort === sort);
    return { id: `episode-${sort}`, sort, topic, entries, scenes: chunk(entries, 12), className: colors[index % colors.length], ...meta };
  });
}

const episodes = buildEpisodes();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateProgress();
}

function updateProgress() {
  const total = vocabulary.length || 1;
  const done = state.mastered.length;
  document.querySelector('#progressText').textContent = `${done.toLocaleString('en-US')} / ${total.toLocaleString('en-US')}`;
  document.querySelector('#progressBar').style.width = `${Math.min(100, (done / total) * 100)}%`;
  document.querySelector('#streakCount').textContent = state.streak;
  document.querySelector('#vocabTotal').textContent = total.toLocaleString('en-US');
  document.querySelector('#libraryMasteredCount').textContent = done.toLocaleString('en-US');
  const badgeTitle = document.querySelector('#badgeTitle');
  const badgeSub = document.querySelector('#badgeSub');
  if (state.quizBest >= 3) { badgeTitle.textContent = '剧情记忆官'; badgeSub.textContent = '今日复盘已满分'; }
  else if (done >= 12) { badgeTitle.textContent = '第一篇章点亮'; badgeSub.textContent = `${done.toLocaleString('en-US')} 个词已进入你的词场`; }
  else { badgeTitle.textContent = '未点亮'; badgeSub.textContent = '点击剧情里的线索开始'; }
  if (activeEpisode) updateEpisodeProgress();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function setMastered(id, mastered = true) {
  const index = state.mastered.indexOf(Number(id));
  if (mastered && index < 0) state.mastered.push(Number(id));
  if (!mastered && index >= 0) state.mastered.splice(index, 1);
  saveState();
}

function setupLibraryTopics() {
  libraryTopic.innerHTML = '<option value="all">全部篇章</option>' + episodes.map((episode, index) => `<option value="${episode.sort}">CASE ${String(index + 1).padStart(2, '0')} · ${escapeHTML(episode.topic)}</option>`).join('');
}

function getFilteredEpisodes() {
  const query = librarySearch.value.trim().toLowerCase();
  const topic = libraryTopic.value;
  const sort = librarySort.value;
  const result = episodes.filter((episode) => {
    const topicMatch = topic === 'all' || String(episode.sort) === topic;
    const searchable = `${episode.topic} ${episode.title} ${episode.subtitle} ${episode.desc} ${episode.entries.map((entry) => `${entry.word} ${entry.meaning}`).join(' ')}`.toLowerCase();
    return topicMatch && (!query || searchable.includes(query));
  });
  if (sort === 'volume') result.sort((a, b) => b.entries.length - a.entries.length || a.sort - b.sort);
  if (sort === 'unmastered') result.sort((a, b) => {
    const aDone = a.entries.filter((entry) => state.mastered.includes(entry.id)).length;
    const bDone = b.entries.filter((entry) => state.mastered.includes(entry.id)).length;
    return (aDone / a.entries.length) - (bDone / b.entries.length) || a.sort - b.sort;
  });
  return result;
}

function renderLibrary() {
  const filtered = getFilteredEpisodes();
  const totalWords = filtered.reduce((sum, episode) => sum + episode.entries.length, 0);
  libraryResultCount.textContent = `${filtered.length} 个剧情篇章 · ${totalWords.toLocaleString('en-US')} 个词`;
  libraryEmpty.hidden = filtered.length > 0;
  libraryGrid.innerHTML = filtered.map((episode, index) => {
    const done = episode.entries.filter((entry) => state.mastered.includes(entry.id)).length;
    const percent = episode.entries.length ? (done / episode.entries.length) * 100 : 0;
    return `<button class="episode-card ${episode.className}" data-episode-sort="${episode.sort}" type="button">
      <span class="episode-card-top"><span>CASE ${String(index + 1).padStart(2, '0')}</span><span>${escapeHTML(episode.label)}</span></span>
      <span class="episode-card-title">${escapeHTML(episode.title)}<small>${escapeHTML(episode.subtitle)}</small></span>
      <span class="episode-card-desc">${escapeHTML(episode.desc)}</span>
      <span class="episode-card-bottom"><span>${episode.entries.length} WORDS · ${episode.scenes.length} SCENES</span><span>${done}/${episode.entries.length} 已点亮 ↗</span></span>
      <span class="episode-mini-track"><i style="width:${percent}%"></i></span>
    </button>`;
  }).join('');
  libraryGrid.querySelectorAll('.episode-card').forEach((card) => card.addEventListener('click', () => {
    const episode = episodes.find((item) => String(item.sort) === card.dataset.episodeSort);
    if (episode) openEpisode(episode);
  }));
}

function setupLibrary() {
  setupLibraryTopics();
  [librarySearch, libraryTopic, librarySort].forEach((control) => {
    control.addEventListener('input', renderLibrary);
    control.addEventListener('change', renderLibrary);
  });
}

function makeStoryParagraph(entry, index, sceneIndex) {
  const leads = ['她在第一张报告上圈出', '门后的录音反复念着', '她把证物袋翻到最后，终于看见', '墙上的投影突然亮起，显示着', '她以为已经结束，却在出口处遇到'];
  const tails = ['，旁边的解释像一把没有露刃的钥匙。', '，这正是下一条线索开始移动的时刻。', '，而那一刻她知道，答案不会只停在字面上。', '，所有人都以为这是结论，只有她知道这是开场。', '，这枚词义把前面的细节全部重新照亮。'];
  const lead = leads[(index + sceneIndex) % leads.length];
  const tail = tails[(index * 2 + sceneIndex) % tails.length];
  return `<p class="story-paragraph"><span class="story-index">${String(index + 1).padStart(2, '0')}</span>${lead} <button class="story-word" data-entry-id="${entry.id}" type="button">${escapeHTML(entry.word)}</button>${tail}</p>`;
}

function openEpisode(episode) {
  activeEpisode = episode;
  activeScene = 0;
  activeEntryId = null;
  document.querySelector('#episodeKicker').textContent = `CASE ${String(episode.sort).padStart(2, '0')} · ${episode.label}`;
  document.querySelector('#episodeTitle').textContent = episode.title;
  document.querySelector('#episodeDesc').textContent = episode.desc;
  renderEpisodeScenes();
  renderEpisodeScene();
  resetEpisodeInsight();
  episodeDialog.showModal();
}

function renderEpisodeScenes() {
  episodeScenes.innerHTML = activeEpisode.scenes.map((_, index) => `<button class="scene-tab ${index === activeScene ? 'active' : ''}" data-scene-index="${index}" type="button">SCENE ${String(index + 1).padStart(2, '0')}</button>`).join('');
  episodeScenes.querySelectorAll('.scene-tab').forEach((tab) => tab.addEventListener('click', () => {
    activeScene = Number(tab.dataset.sceneIndex);
    activeEntryId = null;
    renderEpisodeScenes();
    renderEpisodeScene();
    resetEpisodeInsight();
  }));
}

function renderEpisodeScene() {
  const entries = activeEpisode.scenes[activeScene] || [];
  const firstLine = activeScene === 0 ? activeEpisode.desc : `她沿着上一幕留下的痕迹继续往前。${activeEpisode.hook}`;
  document.querySelector('#episodeSceneLabel').textContent = `SCENE ${String(activeScene + 1).padStart(2, '0')} / ${String(activeEpisode.scenes.length).padStart(2, '0')}`;
  document.querySelector('#episodeSceneKicker').textContent = `${activeEpisode.label} · SCENE ${String(activeScene + 1).padStart(2, '0')}`;
  episodeStory.innerHTML = `<p class="scene-opening">${escapeHTML(firstLine)}</p>${entries.map((entry, index) => makeStoryParagraph(entry, index, activeScene)).join('')}<p class="scene-turn"><b>这一幕的反转：</b>${escapeHTML(activeScene === activeEpisode.scenes.length - 1 ? activeEpisode.turn : '她还没有得到答案，但下一张线索卡已经翻到正面。')}</p>`;
  episodeStory.querySelectorAll('.story-word').forEach((word) => word.addEventListener('click', () => focusEpisodeWord(Number(word.dataset.entryId))));
  episodePrev.disabled = activeScene === 0;
  episodeNext.disabled = activeScene === activeEpisode.scenes.length - 1;
  updateEpisodeProgress();
}

function updateEpisodeProgress() {
  if (!activeEpisode) return;
  const done = activeEpisode.entries.filter((entry) => state.mastered.includes(entry.id)).length;
  document.querySelector('#episodeProgress').textContent = `${done} / ${activeEpisode.entries.length} 个词已点亮`;
  document.querySelector('#episodeFooterLabel').textContent = done === activeEpisode.entries.length ? '这一篇章已完整点亮 ✦' : '追完这一幕，再去复盘';
  if (libraryGrid) renderLibrary();
}

function resetEpisodeInsight() {
  episodeInsight.classList.remove('has-word');
  episodeInsightContent.hidden = true;
  episodeInsightPlaceholder.hidden = false;
  episodeMasterButton.disabled = true;
}

function focusEpisodeWord(id) {
  const entry = vocabulary.find((item) => item.id === id);
  if (!entry || !activeEpisode) return;
  activeEntryId = id;
  if (!state.mastered.includes(id)) {
    setMastered(id, true);
    showToast(`已点亮：${entry.word} · ${entry.meaning}`);
  }
  episodeStory.querySelectorAll('.story-word').forEach((word) => word.classList.toggle('selected', Number(word.dataset.entryId) === id));
  document.querySelector('#episodeInsightTopic').textContent = entry.topic;
  document.querySelector('#episodeInsightWord').textContent = entry.word;
  document.querySelector('#episodeInsightPhonetic').textContent = entry.phonetic || '音标待补';
  document.querySelector('#episodeInsightMeaning').textContent = entry.meaning;
  document.querySelector('#episodeInsightHook').textContent = `${activeEpisode.hook} 在这场「${activeEpisode.topic}」任务里，${entry.word} 就是让剧情翻面的那枚证据。`;
  document.querySelector('#episodeInsightExample').textContent = `The case file kept “${entry.word}” as its key clue.`;
  episodeInsightContent.hidden = false;
  episodeInsightPlaceholder.hidden = true;
  episodeInsight.classList.add('has-word');
  episodeMasterButton.disabled = false;
  episodeMasterButton.textContent = state.mastered.includes(id) ? '已点亮 · 再看一眼' : '点亮这条线索 ✦';
  updateEpisodeProgress();
}

function buildQuizData() {
  const pool = [...vocabulary].sort((a, b) => Number(state.mastered.includes(a.id)) - Number(state.mastered.includes(b.id)) || a.id - b.id).slice(0, 3);
  return pool.map((entry) => {
    const distractors = vocabulary.filter((item) => item.id !== entry.id && item.meaning !== entry.meaning).slice(0, 8);
    const options = [entry.meaning, ...distractors.slice(0, 3).map((item) => item.meaning)];
    return {
      id: entry.id,
      question: `她在「${entry.topic}」剧情里圈出 “${entry.word}”，最接近的意思是：`,
      options,
      answer: entry.meaning,
      tip: `${entry.word} = ${entry.meaning}。把它放回刚才的剧情现场再读一遍。`
    };
  });
}

let quizData = buildQuizData();

function renderQuiz() {
  if (!quizData.length) return;
  const item = quizData[currentQuiz];
  quizAnswered = false;
  document.querySelector('#quizCount').textContent = `${String(currentQuiz + 1).padStart(2, '0')} / ${String(quizData.length).padStart(2, '0')}`;
  document.querySelector('#quizQuestion').textContent = item.question;
  document.querySelector('#quizFeedback').textContent = '';
  const next = document.querySelector('#nextQuiz');
  next.disabled = true;
  next.textContent = '选择一个答案';
  document.querySelector('#quizOptions').innerHTML = item.options.map((option) => `<button class="quiz-option" type="button" data-answer="${escapeHTML(option)}">${escapeHTML(option)}</button>`).join('');
  document.querySelectorAll('.quiz-option').forEach((option) => option.addEventListener('click', () => answerQuiz(option, item)));
}

function answerQuiz(option, item) {
  if (quizAnswered) return;
  quizAnswered = true;
  const correct = option.dataset.answer === item.answer;
  option.classList.add(correct ? 'correct' : 'wrong');
  if (!correct) [...document.querySelectorAll('.quiz-option')].find((button) => button.dataset.answer === item.answer)?.classList.add('correct');
  document.querySelector('#quizFeedback').textContent = correct ? `答对了！${item.tip}` : `再看一眼：${item.tip}`;
  const next = document.querySelector('#nextQuiz');
  next.disabled = false;
  next.textContent = currentQuiz === quizData.length - 1 ? '完成今日复盘 ✦' : '下一题 →';
  if (correct) {
    state.quizBest = Math.max(state.quizBest, currentQuiz + 1);
    setMastered(item.id, true);
  } else saveState();
}

document.querySelector('#nextQuiz').addEventListener('click', () => {
  if (!quizAnswered) return;
  if (currentQuiz === quizData.length - 1) {
    showToast('复盘完成，今天的词已经锁进记忆里 ✦');
    currentQuiz = 0;
    quizData = buildQuizData();
    renderQuiz();
    return;
  }
  currentQuiz += 1;
  renderQuiz();
});
document.querySelector('#quickQuiz').addEventListener('click', () => { document.querySelector('#review').scrollIntoView({ behavior: 'smooth' }); });
document.querySelector('#closeEpisodeDialog').addEventListener('click', () => episodeDialog.close());
episodeDialog.addEventListener('click', (event) => { if (event.target === episodeDialog) episodeDialog.close(); });
episodePrev.addEventListener('click', () => { if (activeScene > 0) { activeScene -= 1; activeEntryId = null; renderEpisodeScenes(); renderEpisodeScene(); resetEpisodeInsight(); } });
episodeNext.addEventListener('click', () => { if (activeEpisode && activeScene < activeEpisode.scenes.length - 1) { activeScene += 1; activeEntryId = null; renderEpisodeScenes(); renderEpisodeScene(); resetEpisodeInsight(); } });
episodeMasterButton.addEventListener('click', () => {
  if (activeEntryId == null) return;
  const entry = vocabulary.find((item) => item.id === activeEntryId);
  const next = !state.mastered.includes(activeEntryId);
  setMastered(activeEntryId, next);
  episodeMasterButton.textContent = next ? '已点亮 · 再看一眼' : '点亮这条线索 ✦';
  if (entry) showToast(next ? `已点亮：${entry.word}` : `已取消点亮：${entry.word}`);
  updateEpisodeProgress();
});
document.querySelector('#resetProgress').addEventListener('click', () => {
  if (!confirm('确定要清空本地学习进度吗？')) return;
  state.lit = [];
  state.mastered = [];
  state.streak = 1;
  state.quizBest = 0;
  saveState();
  renderLibrary();
  if (activeEpisode) { renderEpisodeScene(); resetEpisodeInsight(); }
  showToast('进度已清空，可以重新开始。');
});

renderQuiz();
setupLibrary();
renderLibrary();
updateProgress();
