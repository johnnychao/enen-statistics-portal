/* 恩恩統計家教 Enen Statistics - Application Logic Engine */

const DEFAULT_PAID_STUDENTS = [
  {
    email: "demo.student@gmail.com",
    name: "張小明 (Demo Student)",
    allowedUnits: ["u1", "u2", "u3"],
    joinedDate: "2026-07-01",
    note: "已繳費 Unit 1~3 課程",
    completedModules: []
  },
  {
    email: "enen.vip@gmail.com",
    name: "李大華 (VIP 全修生)",
    allowedUnits: ["u1", "u2", "u3", "u4", "u5", "exam"],
    joinedDate: "2026-06-15",
    note: "AP 5分全修保證班",
    completedModules: []
  },
  {
    email: "johnny2cindy@gmail.com",
    name: "恩恩老師 (Admin)",
    allowedUnits: ["all"],
    joinedDate: "2026-08-01",
    note: "系統管理者與教師",
    completedModules: []
  }
];

// Global State
let COURSE_DATA = { units: [] };
let currentUser = null;
let paidStudents = [];
let activeUnitId = "u0";
let activeModuleId = "u0-index";
let isTeacherUnlocked = false;

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  buildCourseData();
  loadStudentDatabase();
  checkUserAuth();
  initUnitTabs();
  initGlossary();
  initLabs();
  updateZCalculator();
  updateTCalculator();
});

function initLabs() {
  const container = document.getElementById("colabLabsContainer");
  if (!container) return;
  container.innerHTML = "";
  
  if (GENERATED_COURSE_DATA && GENERATED_COURSE_DATA.labs && GENERATED_COURSE_DATA.labs.colab) {
    const colabFiles = GENERATED_COURSE_DATA.labs.colab;
    for (const [labId, labData] of Object.entries(colabFiles)) {
      // labId is like lab-01-data-questions
      const a = document.createElement("a");
      // Use standard Github -> Colab redirect URL format
      a.href = `https://colab.research.google.com/github/johnnychao/enen-statistics-portal/blob/main/content/labs/colab/\${labId}.ipynb`;
      a.target = "_blank";
      a.className = "glossary-item"; // Reuse styling
      a.style.display = "block";
      a.innerHTML = `<strong style="color:var(--accent-cyan);">\${labId.replace(/-/g, ' ')}</strong><div style="font-size:0.75rem;color:var(--text-secondary);margin-top:0.2rem;">啟動 Jupyter Notebook 🚀</div>`;
      container.appendChild(a);
    }
  }
}

function buildCourseData() {
  if (typeof GENERATED_COURSE_DATA === 'undefined') return;

  const newCourseData = { units: [] };
  
  // Convert units
  if (GENERATED_COURSE_DATA.units) {
    for (const [unitId, unitData] of Object.entries(GENERATED_COURSE_DATA.units)) {
      const indexPage = unitData['index'] || { metadata: {}, html: "" };
      // Define unit specific editorial story images and captions
      const storyImageMap = {
        u0: { img: "assets/images/unit0_story.jpg", caption: "Figure 0. 全站學習地圖 — 串聯 AP Statistics 5大單元推論框架" },
        u1: { img: "assets/images/unit1_story.jpg", caption: "Figure 1. 單變數資料 — 探索分佈特徵、箱型圖與離群值檢定" },
        u2: { img: "assets/images/unit2_story.jpg", caption: "Figure 2. 雙變數資料 — 相關係數、最小平方法與迴歸直線預測" },
        u3: { img: "assets/images/unit3_story.jpg", caption: "Figure 3. 收集資料 — 隨機抽樣、實驗設計與雙盲對照" },
        u4: { img: "assets/images/unit4_story.jpg", caption: "Figure 4. 機率與隨機變數 — 條件機率、貝氏定理與常態分配" },
        u5: { img: "assets/images/unit5_story.jpg", caption: "Figure 5. 抽樣分配 — 中央極限定理 (CLT) 統計推論核心" },
        exam: { img: "assets/images/exam_center_story.jpg", caption: "Figure 6. 應試中心 — AP 統計學 5分達標與答題策略" }
      };

      const storyData = storyImageMap[unitId] || storyImageMap.u0;

      const unitObj = {
        id: unitId,
        code: unitId === 'u0' ? 'Syllabus' : `Unit ${indexPage.metadata['ap-unit'] || unitId.replace('u', '')}`,
        badgeColor: "#991b1b", // NYT Editorial Crimson Accent
        title: indexPage.metadata.title || "Unit Title",
        subtitle: indexPage.metadata.subtitle || "AP Statistics Official Unit",
        heroImage: storyData.img,
        caption: storyData.caption,
        description: indexPage.html,
        modules: []
      };

      // Add modules (exclude index)
      for (const [modId, modData] of Object.entries(unitData)) {
        if (modId !== 'index') {
          unitObj.modules.push({
            id: `${unitId}-${modId}`,
            code: modId.replace('module-', 'Topic '),
            title: modData.metadata.title || modId,
            summary: "",
            studentContent: modData.html,
            teacherContent: "" // Handle via premium content rendering later
          });
        }
      }
      // Add a default index module
      unitObj.modules.unshift({
        id: `${unitId}-index`,
        code: "Overview",
        title: unitObj.title,
        summary: "單元介紹與課程地圖",
        studentContent: indexPage.html,
        teacherContent: ""
      });

      // Add Premium Assessments and Practice if they exist for this unit
      if (GENERATED_COURSE_DATA.practice) {
        for (const [pracId, pracData] of Object.entries(GENERATED_COURSE_DATA.practice)) {
           unitObj.modules.push({
             id: `practice-${pracId}`,
             code: `Practice 🏆`,
             title: pracData.metadata.title || pracId,
             summary: "進階練習",
             studentContent: `<div class="premium-badge-banner">🏆 此為付費專屬練習模組</div>` + pracData.html,
             teacherContent: ""
           });
        }
      }
      
      if (GENERATED_COURSE_DATA.assessment) {
        for (const [assmtId, assmtData] of Object.entries(GENERATED_COURSE_DATA.assessment)) {
           unitObj.modules.push({
             id: `assessment-${assmtId}`,
             code: `Exam 🏆`,
             title: assmtData.metadata.title || assmtId,
             summary: "單元評量與測驗",
             studentContent: `<div class="premium-badge-banner">🏆 此為付費專屬評量模組</div>` + assmtData.html,
             teacherContent: ""
           });
        }
      }

      newCourseData.units.push(unitObj);
    }
  }
  
  // Sort units
  newCourseData.units.sort((a, b) => a.id.localeCompare(b.id));

  // Initialize glossary
  if (typeof GLOBAL_GLOSSARY_DATA !== 'undefined') {
    newCourseData.glossary = GLOBAL_GLOSSARY_DATA;
  } else {
    newCourseData.glossary = [];
  }

  COURSE_DATA = newCourseData;
}

/* --- 1. Authentication & Student Database --- */
function loadStudentDatabase() {
  const saved = localStorage.getItem("enen_paid_students");
  if (saved) {
    try {
      paidStudents = JSON.parse(saved);
      // Auto-merge new default students that aren't in localStorage yet
      DEFAULT_PAID_STUDENTS.forEach(defaultStudent => {
        if (!paidStudents.find(s => s.email === defaultStudent.email)) {
          paidStudents.push(defaultStudent);
        }
      });
      localStorage.setItem("enen_paid_students", JSON.stringify(paidStudents));
    } catch (e) {
      paidStudents = DEFAULT_PAID_STUDENTS;
    }
  } else {
    paidStudents = DEFAULT_PAID_STUDENTS;
    localStorage.setItem("enen_paid_students", JSON.stringify(paidStudents));
  }
}

function checkUserAuth() {
  const savedUser = localStorage.getItem("enen_current_user");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    renderUserProfile();
    hideAuthModal();
  } else {
    showAuthModal();
  }
}

function showAuthModal() {
  document.getElementById("authGateModal").classList.add("active");
}

function hideAuthModal() {
  document.getElementById("authGateModal").classList.remove("active");
}

function handleGoogleSignIn(response) {
  // Parse JWT token or fallback
  try {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    currentUser = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };
  } catch (e) {
    currentUser = {
      email: "student@gmail.com",
      name: "Google Student",
      picture: "assets/images/mascot.jpg"
    };
  }
  localStorage.setItem("enen_current_user", JSON.stringify(currentUser));
  renderUserProfile();
  hideAuthModal();
  renderCurrentView();
}

function loginAsDemoStudent() {
  currentUser = {
    email: "demo.student@gmail.com",
    name: "張小明 (Demo Student)",
    picture: "assets/images/mascot.jpg"
  };
  localStorage.setItem("enen_current_user", JSON.stringify(currentUser));
  renderUserProfile();
  hideAuthModal();
  renderCurrentView();
}

function renderUserProfile() {
  if (!currentUser) return;
  document.getElementById("userName").textContent = currentUser.name;
  if (currentUser.picture) {
    document.getElementById("userAvatar").src = currentUser.picture;
  }
}

/* --- 2. Unit & Module Navigation & Permission Gating --- */
function initUnitTabs() {
  const ribbon = document.getElementById("unitTabRibbon");
  ribbon.innerHTML = "";

  COURSE_DATA.units.forEach(unit => {
    const btn = document.createElement("button");
    btn.className = `unit-tab-btn ${unit.id === activeUnitId ? 'active' : ''}`;
    btn.id = `tab-${unit.id}`;

    // Check permission
    const hasAccess = checkUnitAccess(unit.id);
    const lockBadge = hasAccess ? '' : ' <span class="lock-icon">🔒</span>';

    btn.innerHTML = `<span style="color:var(--text-primary); font-weight:700;">${unit.code}</span> ${unit.title.split('&')[0]}${lockBadge}`;
    btn.onclick = () => selectUnit(unit.id);
    ribbon.appendChild(btn);
  });
}

function checkUnitAccess(unitId) {
  if (!currentUser) return false;
  // Teacher mode unlocks everything
  if (isTeacherUnlocked) return true;

  const student = paidStudents.find(s => s.email.toLowerCase() === currentUser.email.toLowerCase());
  if (!student) return false;

  return student.allowedUnits.includes(unitId) || student.allowedUnits.includes("all");
}

function selectUnit(unitId) {
  activeUnitId = unitId;
  const unit = COURSE_DATA.units.find(u => u.id === unitId);
  if (unit && unit.modules.length > 0) {
    activeModuleId = unit.modules[0].id;
  }
  
  // Highlight active tab
  document.querySelectorAll(".unit-tab-btn").forEach(btn => btn.classList.remove("active"));
  const activeTab = document.getElementById(`tab-${unitId}`);
  if (activeTab) activeTab.classList.add("active");

  renderCurrentView();
}

function renderCurrentView() {
  const unit = COURSE_DATA.units.find(u => u.id === activeUnitId);
  if (!unit) return;

  // Render Hero Banner and dynamic story illustration
  const unitBanner = document.getElementById("unitBanner");
  if (unitBanner) {
    unitBanner.classList.remove("fade-in-up");
    void unitBanner.offsetWidth; // trigger reflow
    unitBanner.classList.add("fade-in-up");

    const heroImg = unitBanner.querySelector(".editorial-hero img");
    const heroCaption = unitBanner.querySelector(".editorial-hero figcaption");
    if (heroImg && unit.heroImage) {
      heroImg.src = unit.heroImage;
      heroImg.alt = unit.title;
    }
    if (heroCaption && unit.caption) {
      heroCaption.textContent = unit.caption;
    }
  }

  const badgeElem = document.getElementById("unitBadgeTag");
  if (badgeElem) {
    badgeElem.textContent = unit.code;
    badgeElem.style.background = "#991b1b"; // NYT Crimson accent
    badgeElem.style.color = "#ffffff";
  }
  
  document.getElementById("unitMainTitle").textContent = unit.title;
  document.getElementById("unitSubtitleText").textContent = unit.subtitle || "AP Statistics 2026-27 Framework";
  document.getElementById("currentUnitTitle").textContent = `${unit.code} 課程地圖`;

  // Render Left Sidebar Modules List
  renderSidebarModules(unit);

  // Check Unit Permissions
  const hasAccess = checkUnitAccess(unit.id);
  const article = document.getElementById("moduleArticle");

  if (!hasAccess) {
    article.innerHTML = `
      <div class="unit-locked-card">
        <div class="lock-big-icon">🔒</div>
        <div class="lock-title">${unit.code} 尚未開放權限</div>
        <div class="lock-desc">
          目前帳號 <strong>${currentUser ? currentUser.email : ''}</strong> 尚未獲得恩恩老師開通此單元權限。<br>
          請於完成前章作業後，聯繫恩恩老師為您進行單元解鎖！
        </div>
        <div style="margin-top:1rem; padding:1rem; background:rgba(255,255,255,0.03); border-radius:8px; text-align:left; width:100%; max-width:480px;">
          <strong style="color:var(--accent-gold);">📖 本單元教學大綱預覽：</strong>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.3rem;">${unit.description}</p>
        </div>
      </div>
    `;
    return;
  }

  // Render Active Module Content
  renderActiveModule();
}

function renderSidebarModules(unit) {
  const list = document.getElementById("moduleNavList");
  list.innerHTML = "";

  unit.modules.forEach(mod => {
    const li = document.createElement("li");
    li.className = `module-nav-item ${mod.id === activeModuleId ? 'active' : ''}`;
    li.onclick = () => {
      activeModuleId = mod.id;
      renderSidebarModules(unit);
      renderActiveModule();
    };

    li.innerHTML = `
      <div class="module-code">${mod.code}</div>
      <div class="module-item-title">${mod.title}</div>
    `;
    list.appendChild(li);
  });
}

function renderActiveModule() {
  const unit = COURSE_DATA.units.find(u => u.id === activeUnitId);
  const mod = unit.modules.find(m => m.id === activeModuleId);
  const article = document.getElementById("moduleArticle");

  // Re-trigger CSS animation
  article.classList.remove("fade-in-up");
  void article.offsetWidth; // trigger reflow
  article.classList.add("fade-in-up");

  if (!mod) {
    article.innerHTML = "<p>找不到模組內容</p>";
    return;
  }

  // Student content
  let html = `
    <h2 style="color:var(--accent-cyan); margin-bottom:0.5rem; font-size:1.5rem;">${mod.code}: ${mod.title}</h2>
    <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">${mod.summary}</p>
    <div class="module-body-content">
      ${mod.studentContent}
    </div>
  `;

  // Teacher content if unlocked
  if (isTeacherUnlocked && mod.teacherContent) {
    html += `
      <div style="margin-top:2rem; padding-top:1.5rem; border-top:2px dashed var(--accent-gold);">
        ${mod.teacherContent}
      </div>
    `;
  }
  
  // Progress Tracking Button
  if (currentUser) {
    let student = paidStudents.find(s => s.email.toLowerCase() === currentUser.email.toLowerCase());
    if (student) {
      if (!student.completedModules) student.completedModules = [];
      const isCompleted = student.completedModules.includes(mod.id);
      
      html += `
        <div style="margin-top:2rem; padding:1.5rem; background:rgba(0,0,0,0.3); border-radius:var(--radius-sm); border:1px solid var(--border-color); text-align:center;">
          <h4 style="color:var(--text-primary); margin-bottom:0.5rem;">學習進度追蹤</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;">完成本章節學習與練習後，點擊下方按鈕記錄進度，恩恩老師會在後台看到你的努力！</p>
          <button id="completionBtn" class="btn-primary" style="background:${isCompleted ? 'var(--accent-green)' : 'var(--accent-cyan)'}; border:none; width:200px;" onclick="toggleModuleCompletion('${mod.id}')">
            ${isCompleted ? '✅ 已完成 (點擊取消)' : '未完成 (點擊標記為完成)'}
          </button>
        </div>
      `;
    }
  }

  article.innerHTML = html;
  
  // Re-run MathJax to parse new content
  if (window.MathJax) {
    MathJax.typesetPromise([article]).catch((err) => console.log(err.message));
  }
}

function toggleModuleCompletion(moduleId) {
  if (!currentUser) return;
  let student = paidStudents.find(s => s.email.toLowerCase() === currentUser.email.toLowerCase());
  if (student) {
    if (!student.completedModules) student.completedModules = [];
    
    if (student.completedModules.includes(moduleId)) {
      student.completedModules = student.completedModules.filter(id => id !== moduleId);
    } else {
      student.completedModules.push(moduleId);
    }
    
    localStorage.setItem("enen_paid_students", JSON.stringify(paidStudents));
    renderActiveModule();
  }
}

/* --- 3. Interactive Applet Calculators --- */
function updateZCalculator() {
  const zVal = parseFloat(document.getElementById("zValInput").value) || 0;
  const prob = normalCDF(zVal);
  const pct = (prob * 100).toFixed(1);

  document.getElementById("zProbResult").textContent = prob.toFixed(4);
  document.getElementById("zPctResult").textContent = `${pct}%`;

  drawNormalCurve(zVal);
}

function normalCDF(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

function drawNormalCurve(zVal) {
  const canvas = document.getElementById("normalCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width = canvas.clientWidth;
  const h = canvas.height = canvas.clientHeight;

  ctx.clearRect(0, 0, w, h);

  // Draw curve
  ctx.beginPath();
  ctx.strokeStyle = "#00f2fe";
  ctx.lineWidth = 2;

  const muX = w / 2;
  const scaleX = w / 7;

  for (let x = 0; x < w; x++) {
    const z = (x - muX) / scaleX;
    const y = h - 15 - Math.exp(-z * z / 2) * (h - 30);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Draw shaded area
  const targetX = muX + zVal * scaleX;
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 242, 254, 0.25)";
  ctx.moveTo(0, h - 15);
  for (let x = 0; x <= targetX; x++) {
    const z = (x - muX) / scaleX;
    const y = h - 15 - Math.exp(-z * z / 2) * (h - 30);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(targetX, h - 15);
  ctx.closePath();
  ctx.fill();

  // Baseline
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.beginPath();
  ctx.moveTo(0, h - 15);
  ctx.lineTo(w, h - 15);
  ctx.stroke();
}

function updateTCalculator() {
  const tVal = Math.abs(parseFloat(document.getElementById("tValInput").value) || 0);
  const df = parseInt(document.getElementById("tDfInput").value) || 10;

  // Approximate t distribution tail probability
  const oneTail = (1 - normalCDF(tVal * Math.sqrt(df / (df + 2)))) / 2;
  const twoTail = oneTail * 2;

  document.getElementById("tTwoTailResult").textContent = (twoTail * 0.85).toFixed(4); // approx scaled
  document.getElementById("tRightTailResult").textContent = (oneTail * 0.85).toFixed(4);
}

/* --- 4. Search & Glossary --- */
function initGlossary() {
  if (!COURSE_DATA.glossary) return;
  renderGlossary(COURSE_DATA.glossary);
}

function renderGlossary(list) {
  const container = document.getElementById("glossaryContainer");
  if (!container) return;
  container.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.style.cssText = "padding:0.4rem; background:rgba(255,255,255,0.02); border-radius:4px; font-size:0.8rem; border-left:2px solid var(--accent-cyan);";
    div.innerHTML = `
      <div style="font-weight:700; color:var(--text-primary);">${item.term} <span style="color:var(--text-muted);">(${item.zh})</span></div>
      <div style="color:var(--text-secondary); font-size:0.75rem;">${item.desc}</div>
    `;
    container.appendChild(div);
  });
}

function filterGlossary(kw) {
  if (!kw.trim()) {
    renderGlossary(COURSE_DATA.glossary);
    return;
  }
  const filtered = COURSE_DATA.glossary.filter(g => 
    g.term.toLowerCase().includes(kw.toLowerCase()) || 
    g.zh.includes(kw) || 
    g.desc.toLowerCase().includes(kw.toLowerCase())
  );
  renderGlossary(filtered);
}

function handleSearch(query) {
  if (!query.trim()) return;
  filterGlossary(query);
}

/* --- 5. Teacher Admin Modal & Permissions Management --- */
function openTeacherAdminModal() {
  document.getElementById("teacherAdminModal").classList.add("active");
  if (isTeacherUnlocked) {
    document.getElementById("teacherLockScreen").style.display = "none";
    document.getElementById("teacherAdminPanel").style.display = "block";
    renderStudentPermissionsTable();
  } else {
    document.getElementById("teacherLockScreen").style.display = "block";
    document.getElementById("teacherAdminPanel").style.display = "none";
  }
}

// --- 6. Internal Link Interceptor ---
document.addEventListener('click', function(e) {
  const a = e.target.closest('a');
  if (!a) return;
  
  const href = a.getAttribute('href');
  if (!href) return;
  
  if (href.endsWith('.qmd') || href.includes('.qmd#')) {
    e.preventDefault();
    const cleanHref = href.split('#')[0];
    const basename = cleanHref.split('/').pop().replace('.qmd', '');
    
    // Try to detect target unit from URL (e.g. /u2/index.qmd -> u2)
    const match = cleanHref.match(/\/u([1-9])\//);
    const targetUnitId = match ? `u${match[1]}` : activeUnitId;
    
    let targetModuleId = "";
    if (href.includes('practice/')) {
       targetModuleId = `practice-${basename}`;
    } else if (href.includes('assessment/')) {
       targetModuleId = `assessment-${basename}`;
    } else if (basename === 'index') {
       targetModuleId = `${targetUnitId}-index`;
    } else {
       targetModuleId = `${targetUnitId}-${basename}`;
    }
    
    const unit = COURSE_DATA.units.find(u => u.id === targetUnitId);
    if (unit && unit.modules.find(m => m.id === targetModuleId)) {
      if (activeUnitId !== targetUnitId) {
        selectUnit(targetUnitId);
      }
      activeModuleId = targetModuleId;
      renderSidebarModules(unit);
      renderActiveModule();
      window.scrollTo({top:0, behavior:'smooth'});
    } else {
      console.warn("Module not found: ", targetModuleId);
    }
  } else if (href.endsWith('.ipynb')) {
    e.preventDefault();
    const basename = href.split('/').pop().replace('.ipynb', '');
    const colabUrl = `https://colab.research.google.com/github/johnnychao/enen-statistics-portal/blob/main/content/labs/colab/${basename}.ipynb`;
    window.open(colabUrl, '_blank');
  }
});

function closeTeacherAdminModal() {
  document.getElementById("teacherAdminModal").classList.remove("active");
}

function unlockTeacherAdmin() {
  isTeacherUnlocked = true;
  document.getElementById("teacherLockScreen").style.display = "none";
  document.getElementById("teacherAdminPanel").style.display = "block";
  renderStudentPermissionsTable();
  renderCurrentView(); // Enable teacher notes in current view
  initUnitTabs(); // Remove lock icons in teacher view
}

function renderStudentPermissionsTable() {
  const tbody = document.getElementById("studentPermissionsBody");
  tbody.innerHTML = "";

  paidStudents.forEach((student, index) => {
    const tr = document.createElement("tr");
    
    const units = ["u1", "u2", "u3", "u4", "u5", "exam"];
    let switchesHtml = '';

    units.forEach(uId => {
      const checked = student.allowedUnits.includes(uId) || student.allowedUnits.includes("all");
      switchesHtml += `
        <td>
          <label class="unit-switch">
            <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleUnitPermission(${index}, '${uId}', this.checked)">
            <span class="slider"></span>
          </label>
        </td>
      `;
    });

    tr.innerHTML = `
      <td>
        <strong>${student.name}</strong><br>
        <span style="color:var(--text-muted); font-size:0.75rem;">${student.email}</span><br>
        <span style="color:var(--accent-green); font-size:0.7rem;">✅ 進度: ${student.completedModules ? student.completedModules.length : 0} 個模組</span>
      </td>
      ${switchesHtml}
      <td>
        <button onclick="removeStudent(${index})" style="background:none; border:none; color:var(--accent-red); cursor:pointer; font-size:0.8rem;">刪除</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function toggleUnitPermission(studentIndex, unitId, isAllowed) {
  const student = paidStudents[studentIndex];
  if (!student) return;

  if (isAllowed) {
    if (!student.allowedUnits.includes(unitId)) {
      student.allowedUnits.push(unitId);
    }
  } else {
    student.allowedUnits = student.allowedUnits.filter(u => u !== unitId && u !== "all");
  }
}

function addNewStudent() {
  const emailInput = document.getElementById("newStudentEmail");
  const nameInput = document.getElementById("newStudentName");
  
  const email = emailInput.value.trim();
  const name = nameInput.value.trim() || email.split('@')[0];

  if (!email) {
    alert("請輸入學員的 Google Email！");
    return;
  }

  paidStudents.push({
    email: email,
    name: name,
    allowedUnits: ["u1"], // Default Unit 1 unlocked
    joinedDate: new Date().toISOString().split('T')[0],
    note: "手動新增付費學員"
  });

  emailInput.value = "";
  nameInput.value = "";
  renderStudentPermissionsTable();
}

function removeStudent(index) {
  if (confirm(`確定要刪除學員 ${paidStudents[index].name} 嗎？`)) {
    paidStudents.splice(index, 1);
    renderStudentPermissionsTable();
  }
}

function saveTeacherChanges() {
  localStorage.setItem("enen_paid_students", JSON.stringify(paidStudents));
  initUnitTabs();
  renderCurrentView();
  alert("已成功儲存學員單元權限變更！");
}

function exportPermissionsJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(paidStudents, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `enen_students_permissions_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
