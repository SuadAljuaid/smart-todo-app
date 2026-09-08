// استدعاء العناصر من الـ HTML
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// جلب المهام المحفوظة من LocalStorage عند فتح الصفحة
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// تشغيل دالة العرض أول ما تفتح الصفحة
renderTasks(tasks);

// إضافة مهمة جديدة
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text !== '') {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };
    tasks.push(newTask);
    saveAndRender();
    taskInput.value = '';
  }
});

// دالة لحفظ المهام في LocalStorage وإعادة عرضها
function saveAndRender() {
  localStorage.setItem('myTasks', JSON.stringify(tasks));
  renderTasks(tasks);
}

// دالة لعرض المهام في الواجهة
function renderTasks(tasksToDisplay) {
  taskList.innerHTML = '';
  tasksToDisplay.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <span onclick="toggleTask(${task.id})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">حذف</button>
    `;
    taskList.appendChild(li);
  });
}

// تغيير حالة المهمة (مكتملة / غير مكتملة)
function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveAndRender();
}

// حذف مهمة
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveAndRender();
}

// فلترة المهام (الكل / مكتملة / غير مكتملة)
function filterTasks(type) {
  if (type === 'completed') {
    renderTasks(tasks.filter(t => t.completed));
  } else if (type === 'pending') {
    renderTasks(tasks.filter(t => !t.completed));
  } else {
    renderTasks(tasks);
  }
}