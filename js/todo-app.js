const STORAGE_KEY = 'orbit_secret_todos_v2';
const SETTINGS_KEY = 'orbit_secret_settings_v1';

const DEFAULT_TASKS = [];

let tasks = loadTasks();
let settings = loadSettings();
let currentView = 'board';
let labelFilter = 'all';
let searchQuery = '';
let draggedTaskId = null;
let activeDetailTaskId = null;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  bindControls();
  hydrateSettingsForm();
  updateSyncPill();
  render();
});

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [...DEFAULT_TASKS];
    return list.map((t) => ({ parentId: '', ...t }));
  } catch {
    return [...DEFAULT_TASKS];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          repo: 'Anxxity/web-por',
          branch: 'main',
          file: 'data/orbit-todos.json',
          pat: '',
          aiUrl: 'https://api.openai.com/v1/chat/completions',
          aiModel: 'gpt-4o-mini',
          aiKey: '',
          lastSha: ''
        };
  } catch {
    return { repo: 'Anxxity/web-por', branch: 'main', file: 'data/orbit-todos.json', pat: '' };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function initTheme() {
  const btn = document.getElementById('todo-theme-toggle');
  const icon = document.getElementById('todo-theme-icon');
  const apply = (theme) => {
    document.body.setAttribute('data-theme', theme);
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  };
  apply(localStorage.getItem('theme') || 'dark');
  btn?.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    apply(next);
  });
}

function bindControls() {
  document.querySelectorAll('[data-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentView = btn.dataset.view;
      document.querySelectorAll('[data-view]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      render();
    });
  });

  document.querySelectorAll('[data-label-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      labelFilter = btn.dataset.labelFilter;
      document.querySelectorAll('[data-label-filter]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      render();
    });
  });

  document.getElementById('todo-search-input')?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    render();
  });

  document.getElementById('todo-quick-add')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleEl = document.getElementById('new-task-title');
    const title = titleEl.value.trim();
    if (!title) return;

    addTask({
      title,
      parentId: document.getElementById('new-task-parent').value,
      status: document.getElementById('new-task-status').value,
      priority: document.getElementById('new-task-priority').value,
      label: document.getElementById('new-task-label').value
    });
    titleEl.value = '';
  });

  // Drag & drop columns
  document.querySelectorAll('.board-col').forEach((col) => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      col.classList.add('is-drag-over');
    });
    col.addEventListener('dragleave', () => col.classList.remove('is-drag-over'));
    col.addEventListener('drop', (e) => {
      e.preventDefault();
      col.classList.remove('is-drag-over');
      if (!draggedTaskId) return;
      const task = tasks.find((t) => t.id === draggedTaskId);
      if (task && task.status !== col.dataset.status) {
        task.status = col.dataset.status;
        saveTasks();
        render();
      }
    });
  });

  // Modals
  document.getElementById('open-git-modal')?.addEventListener('click', () => openModal('git-modal'));
  document.getElementById('open-ai-modal')?.addEventListener('click', () => openModal('ai-modal'));
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => closeModal(btn.dataset.closeModal));
  });

  document.getElementById('detail-add-subtask-btn')?.addEventListener('click', addSubtaskInModal);
  document.getElementById('detail-new-subtask')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubtaskInModal();
    }
  });
  document.getElementById('detail-save-btn')?.addEventListener('click', saveTaskDetail);

  document.getElementById('save-settings-btn')?.addEventListener('click', () => {
    settings.repo = document.getElementById('cfg-repo').value.trim();
    settings.branch = document.getElementById('cfg-branch').value.trim() || 'main';
    settings.file = document.getElementById('cfg-file').value.trim() || 'data/orbit-todos.json';
    settings.pat = document.getElementById('cfg-pat').value.trim();
    settings.aiUrl = document.getElementById('cfg-ai-url').value.trim();
    settings.aiModel = document.getElementById('cfg-ai-model').value.trim();
    settings.aiKey = document.getElementById('cfg-ai-key').value.trim();
    saveSettings();
    updateSyncPill();
    closeModal('git-modal');
    notify('Settings saved locally.', 'success');
  });

  document.getElementById('git-pull-btn')?.addEventListener('click', pullFromGit);
  document.getElementById('git-push-btn')?.addEventListener('click', pushToGit);
  document.getElementById('import-issues-btn')?.addEventListener('click', importGitHubIssues);
  document.getElementById('ai-generate-btn')?.addEventListener('click', runAiBreakdown);
  document.getElementById('ai-triage-btn')?.addEventListener('click', runAiTriage);
}

function hydrateSettingsForm() {
  document.getElementById('cfg-repo').value = settings.repo || 'Anxxity/web-por';
  document.getElementById('cfg-branch').value = settings.branch || 'main';
  document.getElementById('cfg-file').value = settings.file || 'data/orbit-todos.json';
  document.getElementById('cfg-pat').value = settings.pat || '';
  document.getElementById('cfg-ai-url').value = settings.aiUrl || 'https://api.openai.com/v1/chat/completions';
  document.getElementById('cfg-ai-model').value = settings.aiModel || 'gpt-4o-mini';
  document.getElementById('cfg-ai-key').value = settings.aiKey || '';
}

function nextId() {
  const nums = tasks
    .map((t) => parseInt(String(t.id).replace(/\D/g, ''), 10))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `ORB-${max + 1}`;
}

function addTask({ title, status = 'todo', priority = 'medium', label = 'General', parentId = '', url = '' }) {
  const newTask = {
    id: nextId(),
    title,
    status,
    priority,
    label,
    parentId,
    url,
    createdAt: Date.now()
  };
  tasks.unshift(newTask);
  saveTasks();
  render();
  return newTask;
}

function getChildren(parentId) {
  return tasks.filter((t) => t.parentId === parentId);
}

function getTaskById(id) {
  return tasks.find((t) => t.id === id);
}

function refreshParentDropdown() {
  const sel = document.getElementById('new-task-parent');
  if (!sel) return;
  const prev = sel.value;
  const mainTasks = tasks.filter((t) => !t.parentId);
  sel.innerHTML =
    '<option value="">Main task (no parent)</option>' +
    mainTasks
      .map((t) => `<option value="${escapeHtml(t.id)}">↳ Sub-task of ${escapeHtml(t.id)}: ${escapeHtml(t.title.slice(0, 32))}</option>`)
      .join('');
  if (prev && mainTasks.some((t) => t.id === prev)) {
    sel.value = prev;
  }
}

function getFilteredTasks() {
  return tasks.filter((t) => {
    const matchLabel = labelFilter === 'all' || t.label === labelFilter;
    const matchSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery) ||
      t.id.toLowerCase().includes(searchQuery) ||
      t.label.toLowerCase().includes(searchQuery);
    return matchLabel && matchSearch;
  });
}

function render() {
  refreshParentDropdown();
  const visible = getFilteredTasks();
  const board = document.getElementById('todo-board');
  const list = document.getElementById('todo-list-view');
  board.hidden = currentView !== 'board';
  list.hidden = currentView !== 'list';

  // Analytics
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'progress').length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const velocity = total ? Math.round((done / total) * 100) : 0;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-progress').textContent = inProgress;
  document.getElementById('stat-done').textContent = done;
  document.getElementById('stat-velocity').textContent = `${velocity}%`;
  document.getElementById('count-all').textContent = total;
  document.getElementById('count-open').textContent = total - done;

  // Render Kanban
  ['backlog', 'todo', 'progress', 'done'].forEach((status) => {
    const colList = document.querySelector(`[data-col-list="${status}"]`);
    const colTasks = visible.filter((t) => t.status === status);
    document.getElementById(`col-count-${status}`).textContent = colTasks.length;
    colList.innerHTML = '';
    colTasks.forEach((task) => colList.appendChild(buildTaskCard(task)));
  });

  // Render List (group sub-tasks indented under their parent!)
  list.innerHTML = '';
  const visibleIds = new Set(visible.map((t) => t.id));
  const topLevel = visible.filter((t) => !t.parentId || !visibleIds.has(t.parentId));
  topLevel.forEach((task) => {
    list.appendChild(buildListRow(task, false));
    visible
      .filter((child) => child.parentId === task.id)
      .forEach((child) => list.appendChild(buildListRow(child, true)));
  });
}

function buildTaskCard(task) {
  const card = document.createElement('article');
  card.className = 'task-card';
  card.draggable = true;
  card.dataset.id = task.id;

  card.addEventListener('dragstart', () => {
    draggedTaskId = task.id;
    card.classList.add('is-dragging');
  });
  card.addEventListener('dragend', () => {
    draggedTaskId = null;
    card.classList.remove('is-dragging');
  });

  const parent = task.parentId ? getTaskById(task.parentId) : null;
  const children = getChildren(task.id);
  const childrenDone = children.filter((c) => c.status === 'done').length;
  const subPct = children.length ? Math.round((childrenDone / children.length) * 100) : 0;

  card.innerHTML = `
    <div class="task-card-top">
      <span class="task-id">${escapeHtml(task.id)}</span>
      <span class="priority-pill prio-${escapeHtml(task.priority)}">${escapeHtml(task.priority)}</span>
    </div>
    ${parent ? `<span class="task-parent-badge">↳ ${escapeHtml(parent.id)} · ${escapeHtml(parent.title.slice(0, 26))}</span>` : ''}
    <div class="task-title">${escapeHtml(task.title)}</div>
    ${children.length ? `
      <div class="task-subtask-bar">
        <div class="subtask-track"><div class="subtask-fill" style="width:${subPct}%"></div></div>
        <span>${childrenDone}/${children.length} sub-tasks</span>
      </div>
    ` : ''}
    <div class="task-meta">
      <span class="task-label">${escapeHtml(task.label)}</span>
      <div class="task-actions">
        ${task.url ? `<a href="${escapeHtml(task.url)}" target="_blank" rel="noopener" class="task-icon-btn" title="Open on GitHub"><i class="fab fa-github"></i></a>` : ''}
        <button type="button" class="task-icon-btn" data-advance="${escapeHtml(task.id)}" title="Advance status"><i class="fas fa-arrow-right"></i></button>
        <button type="button" class="task-icon-btn" data-delete="${escapeHtml(task.id)}" title="Delete"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `;

  card.addEventListener('click', (e) => {
    if (e.target.closest('button, a')) return;
    openTaskDetail(task.id);
  });
  card.querySelector('[data-advance]')?.addEventListener('click', () => cycleStatus(task.id));
  card.querySelector('[data-delete]')?.addEventListener('click', () => deleteTask(task.id));
  return card;
}

function buildListRow(task, isSubtask) {
  const children = getChildren(task.id);
  const subText = children.length ? ` (${children.filter((c) => c.status === 'done').length}/${children.length})` : '';

  const row = document.createElement('div');
  row.className = `list-row${isSubtask ? ' is-subtask' : ''}`;
  row.style.cursor = 'pointer';
  row.innerHTML = `
    <span class="task-id">${isSubtask ? '↳ ' : ''}${escapeHtml(task.id)}</span>
    <span class="task-title">${escapeHtml(task.title)}${escapeHtml(subText)}</span>
    <span class="task-label">${escapeHtml(task.label)}</span>
    <span class="priority-pill prio-${escapeHtml(task.priority)}">${escapeHtml(task.priority)}</span>
    <span class="task-id">${escapeHtml(task.status.toUpperCase())}</span>
    <div class="task-actions">
      <button type="button" class="task-icon-btn" data-advance="${escapeHtml(task.id)}" title="Advance"><i class="fas fa-arrow-right"></i></button>
      <button type="button" class="task-icon-btn" data-delete="${escapeHtml(task.id)}" title="Delete"><i class="fas fa-trash"></i></button>
    </div>
  `;
  row.addEventListener('click', (e) => {
    if (e.target.closest('button, a')) return;
    openTaskDetail(task.id);
  });
  row.querySelector('[data-advance]')?.addEventListener('click', () => cycleStatus(task.id));
  row.querySelector('[data-delete]')?.addEventListener('click', () => deleteTask(task.id));
  return row;
}

function openTaskDetail(id) {
  const task = getTaskById(id);
  if (!task) return;
  activeDetailTaskId = id;

  document.getElementById('detail-task-id').textContent = task.id;
  document.getElementById('detail-title').value = task.title;
  document.getElementById('detail-status').value = task.status;
  document.getElementById('detail-priority').value = task.priority;
  document.getElementById('detail-label').value = task.label;

  const parentSel = document.getElementById('detail-parent');
  parentSel.innerHTML =
    '<option value="">None (Main Task)</option>' +
    tasks
      .filter((t) => t.id !== id && t.parentId !== id)
      .map((t) => `<option value="${escapeHtml(t.id)}">${escapeHtml(t.id)} — ${escapeHtml(t.title.slice(0, 36))}</option>`)
      .join('');
  parentSel.value = task.parentId || '';

  renderSubtasksInModal(task);
  openModal('task-detail-modal');
}

function renderSubtasksInModal(task) {
  const list = document.getElementById('detail-subtasks-list');
  const children = getChildren(task.id);
  list.innerHTML = '';

  if (!children.length) {
    list.innerHTML = '<p class="todo-hint">No sub-tasks yet. Add one below to break this task down.</p>';
    return;
  }

  children.forEach((child) => {
    const isDone = child.status === 'done';
    const row = document.createElement('div');
    row.className = `subtask-item${isDone ? ' is-done' : ''}`;
    row.innerHTML = `
      <label>
        <input type="checkbox" ${isDone ? 'checked' : ''}>
        <span><strong>${escapeHtml(child.id)}</strong> · ${escapeHtml(child.title)}</span>
      </label>
      <button type="button" class="task-icon-btn" data-open-child title="Open sub-task"><i class="fas fa-arrow-up-right-from-square"></i></button>
      <button type="button" class="task-icon-btn" data-unlink-child title="Unlink from parent"><i class="fas fa-unlink"></i></button>
    `;
    row.querySelector('input').addEventListener('change', (e) => {
      child.status = e.target.checked ? 'done' : 'todo';
      saveTasks();
      renderSubtasksInModal(task);
      render();
    });
    row.querySelector('[data-open-child]').addEventListener('click', () => openTaskDetail(child.id));
    row.querySelector('[data-unlink-child]').addEventListener('click', () => {
      child.parentId = '';
      saveTasks();
      renderSubtasksInModal(task);
      render();
    });
    list.appendChild(row);
  });
}

function addSubtaskInModal() {
  const parent = getTaskById(activeDetailTaskId);
  const input = document.getElementById('detail-new-subtask');
  const title = input.value.trim();
  if (!parent || !title) return;

  addTask({
    title,
    status: 'todo',
    priority: 'medium',
    label: parent.label,
    parentId: parent.id
  });
  input.value = '';
  renderSubtasksInModal(parent);
}

function saveTaskDetail() {
  const task = getTaskById(activeDetailTaskId);
  if (!task) return;
  const title = document.getElementById('detail-title').value.trim();
  if (title) task.title = title;
  task.parentId = document.getElementById('detail-parent').value;
  task.status = document.getElementById('detail-status').value;
  task.priority = document.getElementById('detail-priority').value;
  task.label = document.getElementById('detail-label').value;
  saveTasks();
  closeModal('task-detail-modal');
  render();
}

function cycleStatus(id) {
  const order = ['backlog', 'todo', 'progress', 'done'];
  const task = getTaskById(id);
  if (!task) return;
  task.status = order[(order.indexOf(task.status) + 1) % order.length];
  saveTasks();
  render();
}

function deleteTask(id) {
  // Unlink children if deleting a parent task
  tasks.forEach((t) => {
    if (t.parentId === id) t.parentId = '';
  });
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function updateSyncPill(state = null) {
  const pill = document.getElementById('git-sync-status');
  if (!pill) return;
  pill.classList.remove('is-connected', 'is-error');
  const label = pill.querySelector('span:last-child');
  if (state === 'error') {
    pill.classList.add('is-error');
    label.textContent = 'Git: Sync error';
  } else if (settings.pat && settings.repo) {
    pill.classList.add('is-connected');
    label.textContent = `Git: ${settings.repo}`;
  } else {
    label.textContent = 'Git: Local only';
  }
}

function encodeBase64Utf8(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function decodeBase64Utf8(b64) {
  return decodeURIComponent(escape(atob(b64.replace(/\n/g, ''))));
}

async function pullFromGit() {
  if (!settings.pat || !settings.repo) {
    openModal('git-modal');
    return notify('Add your GitHub repo and PAT first.', 'error');
  }
  try {
    const url = `https://api.github.com/repos/${settings.repo}/contents/${settings.file}?ref=${encodeURIComponent(settings.branch || 'main')}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${settings.pat}`, Accept: 'application/vnd.github+json' }
    });
    if (res.status === 404) {
      return notify('No remote todo file yet — click "Push to Git" to create it.', 'info');
    }
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const data = await res.json();
    settings.lastSha = data.sha;
    saveSettings();
    const parsed = JSON.parse(decodeBase64Utf8(data.content));
    if (Array.isArray(parsed.tasks)) {
      tasks = parsed.tasks.map((t) => ({ parentId: '', ...t }));
      saveTasks();
      render();
      updateSyncPill();
      notify(`Pulled ${tasks.length} tasks from ${settings.repo}.`, 'success');
    }
  } catch (err) {
    updateSyncPill('error');
    notify(`Pull failed: ${err.message}`, 'error');
  }
}

async function pushToGit() {
  if (!settings.pat || !settings.repo) {
    openModal('git-modal');
    return notify('Add your GitHub repo and PAT first.', 'error');
  }
  try {
    const apiBase = `https://api.github.com/repos/${settings.repo}/contents/${settings.file}`;
    let sha = settings.lastSha;

    const headRes = await fetch(`${apiBase}?ref=${encodeURIComponent(settings.branch || 'main')}`, {
      headers: { Authorization: `Bearer ${settings.pat}`, Accept: 'application/vnd.github+json' }
    });
    if (headRes.ok) {
      const existing = await headRes.json();
      sha = existing.sha;
    }

    const body = {
      message: `chore(orbit): sync ${tasks.length} tasks`,
      content: encodeBase64Utf8(JSON.stringify({ updatedAt: new Date().toISOString(), tasks }, null, 2)),
      branch: settings.branch || 'main'
    };
    if (sha) body.sha = sha;

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${settings.pat}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!putRes.ok) throw new Error(`GitHub ${putRes.status}`);
    const result = await putRes.json();
    settings.lastSha = result.content?.sha || '';
    saveSettings();
    updateSyncPill();
    notify(`Committed ${tasks.length} tasks to ${settings.repo}.`, 'success');
  } catch (err) {
    updateSyncPill('error');
    notify(`Push failed: ${err.message}`, 'error');
  }
}

async function importGitHubIssues() {
  if (!settings.repo) return notify('Enter a repository first.', 'error');
  try {
    const headers = { Accept: 'application/vnd.github+json' };
    if (settings.pat) headers.Authorization = `Bearer ${settings.pat}`;

    const res = await fetch(`https://api.github.com/repos/${settings.repo}/issues?state=open&per_page=15`, { headers });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const issues = await res.json();
    let added = 0;
    issues
      .filter((i) => !i.pull_request)
      .forEach((issue) => {
        if (!tasks.some((t) => t.url === issue.html_url)) {
          addTask({
            title: `#${issue.number} ${issue.title}`,
            status: 'todo',
            priority: 'medium',
            label: 'GitHub',
            url: issue.html_url
          });
          added++;
        }
      });
    closeModal('git-modal');
    notify(`Imported ${added} open issues from ${settings.repo}.`, 'success');
  } catch (err) {
    notify(`Import failed: ${err.message}`, 'error');
  }
}

async function runAiBreakdown() {
  const goal = document.getElementById('ai-goal-input').value.trim();
  const out = document.getElementById('ai-output-list');
  if (!goal) return;

  out.innerHTML = '<p class="todo-hint">Generating engineering sub-tasks…</p>';

  let items = [];
  if (settings.aiKey && settings.aiUrl) {
    try {
      const res = await fetch(settings.aiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${settings.aiKey}`
        },
        body: JSON.stringify({
          model: settings.aiModel || 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'Return ONLY a JSON array of 4 concise engineering tasks with keys: title, priority (urgent|high|medium|low), label (Robotics|FiveM|UI|General).'
            },
            { role: 'user', content: goal }
          ],
          temperature: 0.4
        })
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || '[]';
      const match = text.match(/\[[\s\S]*\]/);
      if (match) items = JSON.parse(match[0]);
    } catch {
      items = localBreakdownFallback(goal);
    }
  } else {
    items = localBreakdownFallback(goal);
  }

  renderAiSuggestions(items, goal);
}

function localBreakdownFallback(goal) {
  const isRobotics = /robot|arm|urdf|ros|arduino|pi|wheelchair|sensor|motor/i.test(goal);
  const isFiveM = /fivem|lua|nui|pvp|esx|qb|ox/i.test(goal);
  const label = isRobotics ? 'Robotics' : isFiveM ? 'FiveM' : 'UI';
  return [
    { title: `Scope architecture & requirements: ${goal.slice(0, 42)}`, priority: 'high', label },
    { title: `Implement core prototype & fix edge cases`, priority: 'urgent', label },
    { title: `Capture demo video / screenshots`, priority: 'medium', label: 'UI' },
    { title: `Document & push to Git`, priority: 'low', label }
  ];
}

function runAiTriage() {
  const out = document.getElementById('ai-output-list');
  const open = getFilteredTasks().filter((t) => t.status !== 'done');
  if (!open.length) {
    out.innerHTML = '<p class="todo-hint">All tasks are done!</p>';
    return;
  }
  const rank = { urgent: 0, high: 1, medium: 2, low: 3 };
  const top = [...open].sort((a, b) => (rank[a.priority] ?? 9) - (rank[b.priority] ?? 9)).slice(0, 3);
  out.innerHTML = top
    .map(
      (t, idx) =>
        `<div class="ai-suggestion"><span><strong>#${idx + 1} Next:</strong> [${escapeHtml(t.priority.toUpperCase())}] ${escapeHtml(t.title)}</span><span class="task-label">${escapeHtml(t.label)}</span></div>`
    )
    .join('');
}

function renderAiSuggestions(items, goalTitle) {
  const out = document.getElementById('ai-output-list');
  out.innerHTML = '';

  const createAllBtn = document.createElement('button');
  createAllBtn.type = 'button';
  createAllBtn.className = 'todo-btn todo-btn-accent';
  createAllBtn.textContent = `+ Create "${goalTitle.slice(0, 28)}" as Main Task with all ${items.length} Sub-tasks`;
  createAllBtn.addEventListener('click', () => {
    const parent = addTask({ title: goalTitle, status: 'todo', priority: 'high', label: items[0]?.label || 'General' });
    items.forEach((item) => {
      addTask({
        title: item.title,
        status: 'todo',
        priority: item.priority || 'medium',
        label: item.label || 'General',
        parentId: parent.id
      });
    });
    closeModal('ai-modal');
    notify(`Created ${parent.id} with ${items.length} linked sub-tasks.`, 'success');
  });
  out.appendChild(createAllBtn);

  items.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'ai-suggestion';
    row.innerHTML = `
      <span>${escapeHtml(item.title)}</span>
      <button type="button" class="todo-btn todo-btn-primary">+ Add</button>
    `;
    row.querySelector('button').addEventListener('click', (e) => {
      addTask({
        title: item.title,
        status: 'todo',
        priority: item.priority || 'medium',
        label: item.label || 'General'
      });
      e.target.textContent = 'Added';
      e.target.disabled = true;
    });
    out.appendChild(row);
  });
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.hidden = false;
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.hidden = true;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = String(str ?? '');
  return div.innerHTML;
}

function notify(msg, type = 'info') {
  document.querySelector('.todo-toast')?.remove();
  const el = document.createElement('div');
  el.className = 'todo-toast';
  el.textContent = msg;
  const bg = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
  el.style.cssText = `position:fixed;bottom:20px;right:20px;z-index:300;background:${bg};color:#fff;padding:0.75rem 1.1rem;border-radius:12px;font-size:0.84rem;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,0.2);`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}
