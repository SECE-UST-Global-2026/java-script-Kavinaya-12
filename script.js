function addTask(){
  const name = document.getElementById('taskInput').value.trim();
  const due = document.getElementById('dateInput').value;
  const status = document.getElementById('statusInput').value;

  if(!name || !due) return;

  const li = document.createElement('li');

  const info = document.createElement('div');
  info.className = 'task-info';

  const title = document.createElement('div');
  title.className = 'task-name';
  title.textContent = name;

  const date = document.createElement('div');
  date.className = 'due-date';
  date.textContent = 'Due: ' + due;

  info.append(title, date);

  const badge = document.createElement('span');
  badge.className = 'status ' + status;
  badge.textContent = formatStatus(status);
  badge.onclick = () => cycleStatus(badge);

  const del = document.createElement('button');
  del.className = 'delete';
  del.textContent = '×';
  del.onclick = () => li.remove();

  const ctrl = document.createElement('div');
  ctrl.className = 'controls';
  ctrl.append(badge, del);

  li.append(info, ctrl);

  applyStress(li, due);

  document.getElementById('taskList').appendChild(li);

  taskInput.value = '';
  dateInput.value = '';
}

function applyStress(li, dueDate){
  const today = new Date();
  const due = new Date(dueDate);
  const diff = (due - today) / (1000 * 60 * 60 * 24);

  li.classList.remove('low','medium','high');

  if(diff > 3) li.classList.add('low');
  else if(diff >= 1) li.classList.add('medium');
  else li.classList.add('high');
}

function cycleStatus(badge){
  if(badge.classList.contains('pending')){
    badge.className = 'status inprogress';
    badge.textContent = 'In Progress';
  }
  else if(badge.classList.contains('inprogress')){
    badge.className = 'status completed';
    badge.textContent = 'Completed';
  }
  else{
    badge.className = 'status pending';
    badge.textContent = 'Pending';
  }
}

function formatStatus(s){
  if(s === 'inprogress') return 'In Progress';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
