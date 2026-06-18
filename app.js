const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const startButton = document.getElementById('startButton');
const moduleOverlay = document.getElementById('moduleOverlay');
const moduleContent = document.getElementById('moduleContent');

let navigationGameState = null;
let softwareEngineeringCourse = [
  {
    title: 'Introduction to Robotics Programming',
    description: 'Start with Python basics, variables, and robot control flow.',
    src: 'videos/Introduction to robot programming MachineLogic Tutorials - Vention (1080p).mp4'
  },
  {
    title: 'Control Structures and Logic',
    description: 'Use loops and conditionals to control robot decision-making.',
    src: 'videos/Control Structures and Logic.mp4'
  },
  {
    title: 'Working with Sensors',
    description: 'Learn how sensor data is read and processed in robotics code.',
    src: 'videos/What is a Sensor Different Types of Sensors, Applications - RealPars (1080p).mp4'
  },
  {
    title: 'Algorithms for Movement',
    description: 'Build simple navigation and path-planning algorithms.',
    src: 'videos/Algorithms for Movement.mp4'
  },
  {
    title: 'Project: Robotics Mini-App',
    description: 'Apply your skills in a project that combines code, control, and sensors.',
    src: 'videos/Project Robotics Mini-App.mp4'
  }
];
let activeSoftwareLesson = 0;

const sampleReplies = [
  {
    triggers: ['what is pnt', 'pnt'],
    response: 'PNT stands for Positioning, Navigation, and Timing. It helps robots know where they are, how to move, and when to act.'
  },
  {
    triggers: ['gps', 'inertial', 'navigation'],
    response: 'Robots use GPS and inertial sensors together to stay accurate. GPS gives location, while inertial sensors track movement even when GPS is weak.'
  },
  {
    triggers: ['game', 'challenge'],
    response: 'Try the Navigation Challenge module to steer a robot through a simulated course while learning PNT basics.'
  },
  {
    triggers: ['video', 'lesson'],
    response: 'Example demos show step-by-step robotics concepts. Start with the Positioning & Timing lesson for the best foundation.'
  },
  {
    triggers: ['help', 'question'],
    response: 'Ask about a robotics concept, a video lesson, or how PNT systems support safe navigation for kids learning robotics.'
  }
];

function addChatBubble(text, type = 'ai') {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function askAi(question) {
  const normalized = question.toLowerCase();
  const match = sampleReplies.find(item => item.triggers.some(trigger => normalized.includes(trigger)));
  return match ? match.response : 'Great question! I can help with PNT basics, robotics lessons, or interactive practice ideas. Try asking the system about a specific topic.';
}

chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;
  addChatBubble(question, 'user');
  chatInput.value = '';
  setTimeout(() => {
    addChatBubble(askAi(question), 'ai');
  }, 300);
});

startButton.addEventListener('click', () => {
  document.querySelector('#modules')?.scrollIntoView({ behavior: 'smooth' });
});

function openModule(moduleId) {
  let html = '';
  if (moduleId === 'softwareEng') {
    const lessonList = softwareEngineeringCourse.map((lesson, index) => `
      <li class="lesson-item${index === 0 ? ' active' : ''}" onclick="selectSoftwareLesson(${index})">
        <span class="lesson-number">${index + 1}</span>
        <span>${lesson.title}</span>
      </li>
    `).join('');

    html = `
      <div class="software-course-shell">
        <div class="software-course-header">
          <div>
            <span class="course-tag">Software Engineering</span>
            <h2>Robotics Programming Course</h2>
            <p>Learn Python, C++, and robotics algorithms through project-based lessons and embedded course videos.</p>
          </div>
          <div class="course-meta">
            <div><strong>5 lessons</strong></div>
            <div><strong>3h 20m</strong> of learning</div>
          </div>
        </div>
        <div class="software-course-grid">
          <aside class="course-sidebar">
            <div class="course-sidebar-title">Course lessons</div>
            <ul class="lesson-list">
              ${lessonList}
            </ul>
          </aside>
          <section class="course-main">
            <div class="course-video-player">
              <video id="softwareVideoPlayer" controls>
                <source src="${softwareEngineeringCourse[0].src}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="course-lesson-detail">
              <h3 id="softwareLessonTitle">${softwareEngineeringCourse[0].title}</h3>
              <p id="softwareLessonDesc">${softwareEngineeringCourse[0].description}</p>
              <button class="button button-secondary" style="margin-top: 1.2rem;" onclick="closeOverlay()">Exit course</button>
            </div>
          </section>
        </div>
      </div>
    `;
  } else if (moduleId === 'hardwareInt') {
    html = `
      <h2>Hardware Integration</h2>
      <p>Work with microcontrollers, sensors, and actuators to build responsive systems.</p>
      <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 20px 0; border-radius: 8px;">
        <video style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000;" controls>
          <source src="videos/YTDown_YouTube_PNT-Academy-Business-Proposal-for-STEM_Media_dIjfULNfuxA_001_1080p.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <p style="margin-top: 20px;"><strong>Course Overview:</strong> Connect microcontrollers and sensors to create responsive robotic systems with real-time feedback.</p>
      <button class="button button-secondary" style="margin-top: 1.2rem;" onclick="closeOverlay()">Exit course</button>
    `;
  } else if (moduleId === 'autonomousNav') {
    html = `
      <h2>Autonomous Navigation</h2>
      <p>Implement SLAM, path planning, and computer vision for self-driving mechanisms.</p>
      <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 20px 0; border-radius: 8px;">
        <video style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000;" controls>
          <source src="videos/YTDown_YouTube_PNT-Academy-Business-Proposal-for-STEM_Media_dIjfULNfuxA_001_1080p.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <p style="margin-top: 20px;"><strong>Course Overview:</strong> Build autonomous systems using SLAM algorithms, path planning, and computer vision technologies.</p>
      <button class="button button-secondary" style="margin-top: 1.2rem;" onclick="closeOverlay()">Exit course</button>
    `;
  } else if (moduleId === 'positioning') {
    html = `
      <h2>Positioning & Timing</h2>
      <p>This module explains how robots use positioning and timing systems to navigate the world.</p>
      <ul>
        <li>Learn the difference between location and motion.</li>
        <li>See how timing helps robotics make safe decisions.</li>
        <li>Explore examples with PNT-based navigation.</li>
      </ul>
    `;
  } else if (moduleId === 'gameChallenge') {
    navigationGameState = {
      step: 0,
      score: 0,
      scanned: false,
      finished: false,
      maxSteps: 6,
      status: 'Guide the robot through the course. Scan ahead before moving when possible.'
    };

    html = `
      <h2>Navigation Challenge</h2>
      <p>Play a simple mini-game where you guide a robot through a course, avoid obstacles, and collect points.</p>
      <div id="gameStatus" class="game-status"></div>
      <div id="navigationInfo" class="navigation-info"></div>
      <div class="module-action-grid">
        <button class="button button-secondary" onclick="handleNavigationAction('forward')">Move forward</button>
        <button class="button button-secondary" onclick="handleNavigationAction('left')">Turn left</button>
        <button class="button button-secondary" onclick="handleNavigationAction('right')">Turn right</button>
        <button class="button button-secondary" onclick="handleNavigationAction('scan')">Scan ahead</button>
      </div>
      <p class="game-tip">Mini-game tip: scanning before moving helps avoid obstacles and earns bonus points.</p>
    `;
  }

  moduleContent.innerHTML = html;
  moduleOverlay.classList.remove('hidden');
  if (moduleId === 'softwareEng') {
    renderSoftwareEngineeringCourse();
  }
  if (moduleId === 'gameChallenge') {
    renderNavigationGame();
  }
}

function selectSoftwareLesson(index) {
  activeSoftwareLesson = index;
  const lesson = softwareEngineeringCourse[index];
  const video = document.getElementById('softwareVideoPlayer');
  const title = document.getElementById('softwareLessonTitle');
  const desc = document.getElementById('softwareLessonDesc');
  if (video) {
    video.src = lesson.src;
    video.load();
    video.play().catch(() => {});
  }
  if (title) title.textContent = lesson.title;
  if (desc) desc.textContent = lesson.description;
  document.querySelectorAll('.lesson-item').forEach((item, itemIndex) => {
    item.classList.toggle('active', itemIndex === index);
  });
}

function renderSoftwareEngineeringCourse() {
  activeSoftwareLesson = activeSoftwareLesson || 0;
  const lesson = softwareEngineeringCourse[activeSoftwareLesson];
  const video = document.getElementById('softwareVideoPlayer');
  const title = document.getElementById('softwareLessonTitle');
  const desc = document.getElementById('softwareLessonDesc');
  if (video) {
    video.src = lesson.src;
    video.load();
  }
  if (title) title.textContent = lesson.title;
  if (desc) desc.textContent = lesson.description;
}

function renderNavigationGame() {
  if (!navigationGameState) return;
  const statusEl = document.getElementById('gameStatus');
  const infoEl = document.getElementById('navigationInfo');
  if (!statusEl || !infoEl) return;

  const obstacleSteps = [2, 4];
  const nextObstacle = obstacleSteps.find(step => step > navigationGameState.step);
  const obstacleHint = nextObstacle
    ? `Next obstacle in ${nextObstacle - navigationGameState.step} step(s).`
    : 'No more obstacles ahead.';

  statusEl.textContent = navigationGameState.status;
  infoEl.innerHTML = `
    <p><strong>Step:</strong> ${navigationGameState.step} / ${navigationGameState.maxSteps}</p>
    <p><strong>Score:</strong> ${navigationGameState.score}</p>
    <p>${obstacleHint}</p>
  `;
}

function handleNavigationAction(action) {
  if (!navigationGameState || navigationGameState.finished) return;

  const obstacleSteps = [2, 4];
  let message = '';
  let delta = 0;

  if (action === 'scan') {
    navigationGameState.scanned = true;
    message = 'Scan complete. The path ahead is clearer now.';
    delta = 2;
  } else {
    navigationGameState.step += 1;
    if (obstacleSteps.includes(navigationGameState.step)) {
      if (navigationGameState.scanned) {
        message = 'Nice work! You moved past the obstacle safely.';
        delta = 5;
      } else {
        message = 'Uh-oh! You hit an obstacle. Scan next time to avoid it.';
        delta = -3;
      }
      navigationGameState.scanned = false;
    } else {
      const actionVerb = action === 'forward' ? 'advanced' : `turned ${action}`;
      message = `The robot ${actionVerb} smoothly along the course.`;
      delta = navigationGameState.scanned ? 4 : 2;
      navigationGameState.scanned = false;
    }
  }

  navigationGameState.score += delta;

  if (navigationGameState.step >= navigationGameState.maxSteps) {
    navigationGameState.finished = true;
    const win = navigationGameState.score >= 8;
    navigationGameState.status = win
      ? 'Goal reached! Great navigation skills.'
      : 'Course complete. Try again to improve your score.';
  } else {
    navigationGameState.status = message;
  }

  renderNavigationGame();
}

function closeOverlay() {
  moduleOverlay.classList.add('hidden');
}

function showQuiz() {
  moduleContent.innerHTML = `
    <h2>Quick Quiz</h2>
    <ol>
      <li>What does PNT stand for?</li>
      <li>Which system tells a robot its current position?</li>
      <li>Why is timing important for robotic movement?</li>
    </ol>
    <p>Use the AI Tutor Studio to review answers and learn more.</p>
  `;
  moduleOverlay.classList.remove('hidden');
}

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeOverlay();
  }
});

addChatBubble('Hi there! I am your AI tutor. Ask me anything about PNT robotics or learning modules.', 'ai');
