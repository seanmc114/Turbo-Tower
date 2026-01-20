// game.js — JC Tower Compendium
// Turbo Feedback with GLOBAL lives (5) across the entire game
// - Mid-level feedback costs 1 life and does NOT reveal full answers
// - Level-cleared feedback shows full corrections (free)
// - Perfect level earns +1 life (max 5)

import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import {
  tileCoverCss,
  getThemeTitle,
  getLevelEntries,
  maxLevelFor,
  themeProgress,
  saveProgress,
  resetProgress
} from "./themes.js";

const ACC = {"á":"a","é":"e","í":"i","ó":"o","ú":"u","ü":"u","Á":"A","É":"E","Í":"I","Ó":"O","Ú":"U","Ü":"U"};
const stripAccents = (s)=> String(s).split("").map(ch=>ACC[ch]||ch).join("");
const norm = (s)=> stripAccents(String(s||"").toLowerCase().trim())
  .replace(/[¿?¡!.,;:()\[\]{}"“”'’]/g," ")
  .replace(/\s+/g," ")
  .replace(/ñ/g,"n");

const $ = (id)=> document.getElementById(id);
const qs = new URLSearchParams(location.search);
const LANG = (qs.get("lang") || localStorage.getItem("jc_tower_lang") || "es").toLowerCase();
const THEME_ID = (qs.get("theme") || "family").toLowerCase();

const MAX_LIVES = 5;
const LIVES_KEY = "jc_feedback_lives";

function getLives(){
  const raw = localStorage.getItem(LIVES_KEY);
  const n = raw == null ? MAX_LIVES : parseInt(raw, 10);
  return Number.isFinite(n) ? Math.max(0, Math.min(MAX_LIVES, n)) : MAX_LIVES;
}
function setLives(n){
  const v = Math.max(0, Math.min(MAX_LIVES, n));
  localStorage.setItem(LIVES_KEY, String(v));
  return v;
}

function maskAnswer(ans){
  const letters = norm(String(ans || "")).replace(/ /g,"");
  const len = letters.length;
  const first = letters[0] ? letters[0].toUpperCase() : "";
  return `${first}${"•".repeat(Math.max(0, len-1))}  (len ${len})`;
}

export function startTower(){
  const titleEl = $("title");
  const bgEl = $("bg");
  const backBtn = $("back");
  const resetBtn = $("resetTheme");

  const lvlEl = $("lvl");
  const leftEl = $("left");
  const scoreEl = $("score");
  const streakEl = $("streak");
  const themeFill = $("themeFill");
  const themeTxt = $("themeTxt");
  const livesEl = $("lives");

  const promptEl = $("prompt");
  const typed = $("typed");
  const msg = $("msg");
  const list = $("list");

  const submitBtn = $("submit");
  const undoBtn = $("undo");
  const clearBtn = $("clear");
  const shuffleBtn = $("shuffle");
  const hintBtn = $("hintBtn");
  const feedbackBtn = $("feedbackBtn");

  const levelModal = $("levelModal");
  const fbTitle = $("fbTitle");
  const fbSub = $("fbSub");
  const fbStats = $("fbStats");
  const fbMissed = $("fbMissed");
  const fbMissedCount = $("fbMissedCount");
  const fbNext = $("fbNext");
  const fbBack = $("fbBack");
  const fbContinue = $("fbContinue");
  const fbRuleLine = $("fbRuleLine");

  titleEl.textContent = `${getThemeTitle(THEME_ID)} · ${LANG.toUpperCase()}`;
  bgEl.style.backgroundImage = tileCoverCss(THEME_ID);

  backBtn.addEventListener("click", ()=> location.href = "index.html");
  resetBtn.addEventListener("click", ()=>{
    if(confirm("Reset THIS theme on this device?")){
      resetProgress(LANG, THEME_ID);
      location.reload();
    }
  });
  fbBack.addEventListener("click", ()=> location.href = "index.html");

  function openFeedbackModal(){
    levelModal.classList.add("show");
    levelModal.setAttribute("aria-hidden", "false");
  }
  function closeFeedbackModal(){
    levelModal.classList.remove("show");
    levelModal.setAttribute("aria-hidden", "true");
  }
  fbContinue.addEventListener("click", closeFeedbackModal);

  const maxLevel = maxLevelFor(LANG, THEME_ID);
  const isMixLevel = (lvl)=> (lvl % 4 === 0);

  let prog = themeProgress(LANG, THEME_ID);
  let currentLevel = Math.min(Math.max(1, prog.level), maxLevel);

  let remaining = [];
  let score = 0;
  let streak = 0;
  let selectedBlocks = [];

  let levelStats = new Map(); // key=en
  let levelEntries = [];
  let feedbackUsedThisLevel = 0;
  let hintUsedThisLevel = 0;

  function updateLivesUI(){
    const lives = getLives();
    livesEl.textContent = String(lives);
    feedbackBtn.textContent = `Feedback (${lives})`;
  }
  updateLivesUI();

  function setMsg(text, kind){
    msg.style.display = "block";
    msg.className = "msg " + (kind || "");
    msg.textContent = text;
  }
  function clearMsg(){
    msg.style.display = "none";
    msg.className = "msg";
    msg.textContent = "";
  }

  function renderThemeProgress(){
    prog = themeProgress(LANG, THEME_ID);
    themeFill.style.width = prog.pct + "%";
    themeTxt.textContent = `${prog.pct}% complete (${prog.cleared}/${prog.total})`;
  }
  function renderList(){
    list.innerHTML = "";
    remaining.forEach(it=>{
      const div = document.createElement("div");
      div.className = "chip";
      div.innerHTML = `<span>${it.en}</span><small>left</small>`;
      list.appendChild(div);
    });
    leftEl.textContent = String(remaining.length);
  }
  function setPrompt(){
    if(!remaining.length){
      promptEl.textContent = "Level complete!";
      return;
    }
    const cur = remaining[0];
    promptEl.textContent = `Spell: ${cur.en}${isMixLevel(currentLevel) ? " (MIX)" : ""}`;
  }

  function scoreFor(answer){
    const base = 140 + Math.min(240, norm(answer).replace(/ /g,"").length * 18);
    const multi = 1 + Math.min(5, Math.floor(streak/3))*0.5;
    return Math.round(base * multi);
  }
  function isCorrect(raw, answers){
    const typedN = norm(raw);
    const typedNoSpace = typedN.replace(/ /g,"");
    return (answers||[]).some(a=>{
      const aN = norm(a);
      const aNoSpace = aN.replace(/ /g,"");
      return typedN === aN || typedNoSpace === aNoSpace;
    });
  }
  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }

  // ---------- FX Canvas ----------
  const fx = $("fx");
  const fxCtx = fx.getContext("2d");
  const confetti = [];
  function burst2D(px, py, amount=70){
    const dpr = window.devicePixelRatio || 1;
    const x = px * dpr, y = py * dpr;
    for(let i=0;i<amount;i++){
      confetti.push({
        x,y,
        vx:(Math.random()*2-1)*7*dpr,
        vy:(Math.random()*-1.2-0.2)*12*dpr,
        g:0.55*dpr,
        rot:Math.random()*Math.PI,
        vr:(Math.random()*2-1)*0.25,
        life:70+Math.random()*35,
        w:(6+Math.random()*8)*dpr,
        h:(6+Math.random()*12)*dpr,
        col:`hsl(${Math.floor(Math.random()*360)},92%,60%)`
      });
    }
  }
  function renderFX(){
    fxCtx.clearRect(0,0,fx.width,fx.height);
    for(let i=confetti.length-1;i>=0;i--){
      const p = confetti[i];
      p.life -= 1;
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      fxCtx.save();
      fxCtx.translate(p.x,p.y);
      fxCtx.rotate(p.rot);
      fxCtx.globalAlpha = Math.max(0, Math.min(1, p.life/95));
      fxCtx.fillStyle = p.col;
      fxCtx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      fxCtx.restore();
      if(p.life<=0) confetti.splice(i,1);
    }
  }

  // ---------- THREE.js tower ----------
  const stage = $("stage");
  const renderer = new THREE.WebGLRenderer({ canvas: stage, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x335544, 1.05));
  const dir = new THREE.DirectionalLight(0xffffff, 0.9);
  dir.position.set(16, 26, 12);
  scene.add(dir);

  const blockGroup = new THREE.Group();
  scene.add(blockGroup);

  const target = new THREE.Vector3(0, 2.4, 0);
  const isPhone = ()=> window.matchMedia && window.matchMedia("(max-width: 520px)").matches;

  let radius = isPhone() ? 28 : 25;
  let theta = Math.PI * 0.25;
  let phi   = isPhone() ? Math.PI * 0.34 : Math.PI * 0.28;

  const phiMin = Math.PI * 0.10;
  const phiMax = Math.PI * 0.78;
  const radMin = 14;
  const radMax = 48;

  function updateCamera(){
    const sinPhi = Math.sin(phi);
    camera.position.set(
      target.x + radius * sinPhi * Math.cos(theta),
      target.y + radius * Math.cos(phi),
      target.z + radius * sinPhi * Math.sin(theta)
    );
    camera.lookAt(target);
  }

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function getDims(){
    return isPhone()
      ? { GRID:6, HEIGHT:6, SIZE:1.22, GAP:0.14 }
      : { GRID:7, HEIGHT:7, SIZE:1.22, GAP:0.14 };
  }

  function makeLetterTexture(letter){
    const c = document.createElement("canvas");
    c.width = 256; c.height = 256;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "rgba(255,255,255,0.98)";
    ctx.fillRect(0,0,c.width,c.height);
    ctx.strokeStyle = "rgba(8,12,24,0.22)";
    ctx.lineWidth = 14;
    ctx.strokeRect(16,16,c.width-32,c.height-32);
    ctx.fillStyle = "rgba(8,12,24,0.92)";
    ctx.font = "900 178px system-ui, -apple-system, Segoe UI, Roboto";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, 128, 142);
    return new THREE.CanvasTexture(c);
  }

  function makeBlock(letter, pos){
    const { SIZE } = getDims();
    const geo = new THREE.BoxGeometry(SIZE, SIZE, SIZE);
    const sideCol = new THREE.Color(`hsl(${Math.random()*360},85%,62%)`);
    const side = new THREE.MeshStandardMaterial({ color: sideCol, roughness:0.55, metalness:0.06 });
    const top  = new THREE.MeshStandardMaterial({ color: 0xffffff, map: makeLetterTexture(letter), roughness:0.45, metalness:0.05 });
    const mats = [side,side,top,side,side,side];
    const mesh = new THREE.Mesh(geo, mats);
    mesh.position.copy(pos);
    mesh.userData.letter = letter;
    mesh.userData.alive = true;
    mesh.userData.selected = false;
    mesh.userData.sideHex = sideCol.getHex();
    return mesh;
  }

  function pickFromPointer(ev){
    const rect = stage.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.set(x,y);
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(blockGroup.children, false);
    return hits.length ? hits[0].object : null;
  }

  function selectBlock(b){
    if(!b || !b.userData.alive || b.userData.selected) return;
    b.userData.selected = true;
    b.material?.forEach((m,i)=>{ if(m?.color && i!==2) m.color.setHex(0xfff2a8); });
    b.scale.set(1.06,1.06,1.06);
    selectedBlocks.push(b);
    typed.value += b.userData.letter;
    typed.focus({preventScroll:true});
  }
  function unselectBlock(b){
    if(!b) return;
    b.userData.selected = false;
    if(b.userData.sideHex != null){
      b.material?.forEach((m,i)=>{ if(m?.color && i!==2) m.color.setHex(b.userData.sideHex); });
    }
    b.scale.set(1,1,1);
  }
  function clearSelection(){
    for(const b of selectedBlocks) unselectBlock(b);
    selectedBlocks = [];
  }

  function explodeAndRemove(blocks){
    if(!blocks?.length) return;
    const rect = stage.getBoundingClientRect();
    burst2D(rect.width*0.52, rect.height*0.32, 110);

    const start = performance.now();
    const dur = 720;
    const vels = blocks.map(()=> new THREE.Vector3((Math.random()*2-1)*0.10, 0.24+Math.random()*0.14, (Math.random()*2-1)*0.10));
    const spins = blocks.map(()=> new THREE.Vector3(0.14+Math.random()*0.26, 0.18+Math.random()*0.30, 0.12+Math.random()*0.26));

    blocks.forEach(b=>{
      b.userData.selected = false;
      b.userData.alive = false;
      b.material?.forEach(m=>{ if(m){ m.transparent=true; if(m.opacity==null) m.opacity=1; }});
    });

    const anim = ()=>{
      const t = (performance.now() - start) / dur;
      const k = Math.min(1, Math.max(0, t));
      const ease = 1 - Math.pow(1 - k, 3);

      for(let i=0;i<blocks.length;i++){
        const b = blocks[i];
        if(!b.parent) continue;
        b.position.addScaledVector(vels[i], 1.0);
        b.rotation.x += spins[i].x;
        b.rotation.y += spins[i].y;
        b.rotation.z += spins[i].z;
        const s = k < 0.22 ? (1 + k*1.2) : (1.30 - (k-0.22)*1.85);
        b.scale.setScalar(Math.max(0.03, s));
        b.material?.forEach(m=>{ if(m) m.opacity = Math.max(0, 1 - ease); });
      }
      if(k < 1) requestAnimationFrame(anim);
      else blocks.forEach(b=>{ if(b.parent) blockGroup.remove(b); });
    };
    anim();
  }

  function randomLetterBag(){
    const pool = [];
    for(const it of remaining){
      for(const a of it.answers){
        norm(a).split("").forEach(ch=>{
          if(/[a-z]/.test(ch)) pool.push(ch.toUpperCase());
          if(ch===" ") pool.push(" ");
        });
      }
    }
    return pool.length ? pool : "ABCDEEEFGHIJKLMNNOOPQRSTUUVWXYZ".split("");
  }

  function buildTower(){
    while(blockGroup.children.length) blockGroup.remove(blockGroup.children[0]);

    const { GRID, HEIGHT, SIZE, GAP } = getDims();
    const origin = new THREE.Vector3(-(GRID-1)*(SIZE+GAP)/2, 0, -(GRID-1)*(SIZE+GAP)/2);

    const bag = randomLetterBag();
    const pick = (arr)=> arr[Math.floor(Math.random()*arr.length)];

    for(let y=0;y<HEIGHT;y++){
      for(let x=0;x<GRID;x++){
        for(let z=0;z<GRID;z++){
          const holeChance = (y===0)?0.06:(y<3?0.12:0.22);
          if(Math.random() < holeChance) continue;
          const pos = new THREE.Vector3(origin.x + x*(SIZE+GAP), y*(SIZE+GAP), origin.z + z*(SIZE+GAP));
          blockGroup.add(makeBlock(pick(bag), pos));
        }
      }
    }

    const t = (currentLevel - 1) / Math.max(1,(maxLevel-1));
    const scale = 1.07 - t * 0.36;
    blockGroup.scale.set(scale, scale, scale);
    blockGroup.position.y = -0.10 * (1 - scale);
  }

  // rotation
  let dragging=false, lastX=0, lastY=0, moved=0;
  stage.addEventListener("pointerdown",(e)=>{
    dragging=true; moved=0;
    stage.setPointerCapture(e.pointerId);
    lastX=e.clientX; lastY=e.clientY;
  });
  stage.addEventListener("pointermove",(e)=>{
    if(!dragging) return;
    const dx=e.clientX-lastX, dy=e.clientY-lastY;
    lastX=e.clientX; lastY=e.clientY;
    moved += Math.abs(dx)+Math.abs(dy);

    theta -= dx*0.010;
    phi   -= dy*0.008;
    phi = Math.max(phiMin, Math.min(phiMax, phi));
  });
  stage.addEventListener("pointerup",(e)=>{
    dragging=false;
    try{ stage.releasePointerCapture(e.pointerId); }catch{}
  });
  stage.addEventListener("wheel",(e)=>{
    e.preventDefault();
    radius += e.deltaY*0.012;
    radius = Math.max(radMin, Math.min(radMax, radius));
  },{passive:false});
  stage.addEventListener("click",(ev)=>{
    if(moved>8) return;
    const obj = pickFromPointer(ev);
    if(!obj || !obj.userData.alive || obj.userData.selected) return;
    selectBlock(obj);
  });

  function resize(){
    const rect = stage.getBoundingClientRect();
    const w = Math.max(320, Math.floor(rect.width));
    const h = Math.max(420, Math.floor(rect.height));
    renderer.setSize(w,h,false);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();

    const dpr = window.devicePixelRatio || 1;
    fx.width = Math.floor(w*dpr);
    fx.height = Math.floor(h*dpr);
    fx.style.width = w+"px";
    fx.style.height = h+"px";

    if(isPhone()){
      radius = 28;
      phi = Math.max(phiMin, Math.min(phiMax, Math.PI*0.34));
    }
  }
  window.addEventListener("resize", ()=>{ resize(); buildTower(); });

  function animate(){
    requestAnimationFrame(animate);
    updateCamera();
    renderer.render(scene, camera);
    renderFX();
  }

  function buildLevelStats(entries){
    levelStats = new Map();
    for(const it of entries){
      levelStats.set(it.en, { en: it.en, answers: it.answers, attempts: 0, wrong: [], gotItEventually: false });
    }
  }

  function isPerfectLevel(){
    for(const s of levelStats.values()){
      if(!s.gotItEventually) return false;
      if(s.attempts !== 1) return false;
      if(s.wrong.length) return false;
    }
    if(hintUsedThisLevel > 0) return false;
    if(feedbackUsedThisLevel > 0) return false;
    return true;
  }

  function showFeedback({revealFull, fromClear}){
    const all = Array.from(levelStats.values());
    const total = all.length;
    const firstTry = all.filter(s=>s.gotItEventually && s.attempts === 1).length;
    const mistakes = all.reduce((acc,s)=> acc + s.wrong.length, 0);

    const unanswered = all.filter(s=>!s.gotItEventually);
    const struggled = all.filter(s=>s.gotItEventually && (s.wrong.length > 0 || s.attempts > 1));
    const improve = [...struggled, ...unanswered];

    fbTitle.textContent = `Feedback · Level ${currentLevel}${isMixLevel(currentLevel) ? " (MIX)" : ""}`;
    fbSub.textContent = `${getThemeTitle(THEME_ID)} · ${LANG.toUpperCase()} · Lives: ${getLives()}/${MAX_LIVES}`;

    fbStats.innerHTML = `
      <div class="stat"><div class="k">Score</div><div class="v">${score}</div></div>
      <div class="stat"><div class="k">Words</div><div class="v">${total}</div></div>
      <div class="stat"><div class="k">First-try</div><div class="v">${firstTry}</div></div>
      <div class="stat"><div class="k">Mistakes</div><div class="v">${mistakes}</div></div>
    `;

    fbMissed.innerHTML = "";
    fbMissedCount.textContent = `${improve.length} item${improve.length===1?"":"s"}`;

    fbRuleLine.textContent = revealFull
      ? "Level cleared — full Turbo corrections shown."
      : "Mid-level feedback: answers are hidden (clues only). Clear the level for full corrections.";

    if(improve.length === 0){
      fbMissed.innerHTML = `<div class="rowItem"><div><span class="pillGood">Perfect round</span></div><div class="muted">Nothing to improve.</div><div></div></div>`;
    } else {
      for(const s of improve){
        const correct = (s.answers && s.answers.length) ? s.answers[0] : "—";
        const wrongUnique = Array.from(new Set(s.wrong.map(w=>w.trim()).filter(Boolean))).slice(0,4);
        const wrongTxt = wrongUnique.length ? wrongUnique.join(", ") : "—";
        const shown = revealFull ? correct : (s.gotItEventually ? maskAnswer(correct) : "Hidden (finish level)");
        const badge = s.gotItEventually ? `<span class="pillBad">Needed tries</span>` : `<span class="pillBad">Unanswered</span>`;

        fbMissed.innerHTML += `
          <div class="rowItem">
            <div>${s.en}<div class="muted">Attempts: ${s.attempts}</div>${badge}</div>
            <div><span class="pillGood">${revealFull ? "Correct:" : "Clue:"}</span> ${shown}</div>
            <div><span class="pillBad">You typed:</span> ${wrongTxt}</div>
          </div>
        `;
      }
    }

    fbNext.style.display = (remaining.length === 0 && currentLevel < maxLevel) ? "inline-block" : "none";

    if(fromClear && isPerfectLevel()){
      const before = getLives();
      const after = setLives(before + 1);
      updateLivesUI();
      fbSub.textContent = after > before
        ? `${getThemeTitle(THEME_ID)} · ${LANG.toUpperCase()} · PERFECT! +1 life (${after}/${MAX_LIVES})`
        : `${getThemeTitle(THEME_ID)} · ${LANG.toUpperCase()} · PERFECT! Lives already max (${after}/${MAX_LIVES})`;
    }

    openFeedbackModal();
  }

  // mid-level feedback costs 1 life
  feedbackBtn.addEventListener("click", ()=>{
    if(remaining.length === 0){
      showFeedback({revealFull:true, fromClear:false});
      return;
    }
    const lives = getLives();
    if(lives <= 0){
      setMsg("No feedback lives left. Earn +1 by a PERFECT level (no wrongs, no hints, no feedback).", "bad");
      return;
    }
    setLives(lives - 1);
    feedbackUsedThisLevel += 1;
    updateLivesUI();
    showFeedback({revealFull:false, fromClear:false});
  });

  fbNext.addEventListener("click", ()=>{
    closeFeedbackModal();
    advanceLevel();
  });

  window.addEventListener("keydown",(e)=>{
    if(e.key === "Escape" && levelModal.classList.contains("show")) closeFeedbackModal();
  });

  function loadLevel(lvl){
    currentLevel = Math.max(1, Math.min(maxLevel, lvl));
    lvlEl.textContent = String(currentLevel) + (isMixLevel(currentLevel) ? " (MIX)" : "");
    clearMsg();
    typed.value = "";
    clearSelection();

    feedbackUsedThisLevel = 0;
    hintUsedThisLevel = 0;

    levelEntries = shuffle(getLevelEntries(LANG, THEME_ID, currentLevel, isMixLevel(currentLevel)));
    remaining = [...levelEntries];
    buildLevelStats(levelEntries);

    renderList();
    setPrompt();
    buildTower();
    renderThemeProgress();
  }

  function advanceLevel(){
    if(currentLevel >= maxLevel){
      setMsg("🏁 ULTIMATE CLEAR! Theme completed. Back to Hub for another tower.", "good");
      const rect = stage.getBoundingClientRect();
      burst2D(rect.width*0.5, rect.height*0.32, 180);
      return;
    }
    currentLevel += 1;
    saveProgress(LANG, THEME_ID, { level: currentLevel });
    loadLevel(currentLevel);
  }

  function submit(){
    const raw = typed.value.trim();
    if(!raw){
      setMsg("Type an answer (or click blocks) first.", "bad");
      return;
    }

    const promptTarget = remaining[0];
    if(promptTarget && levelStats.has(promptTarget.en)){
      levelStats.get(promptTarget.en).attempts += 1;
    }

    const idx = remaining.findIndex(it => isCorrect(raw, it.answers));
    if(idx >= 0){
      const matched = remaining.splice(idx, 1)[0];

      if(levelStats.has(matched.en)){
        const s = levelStats.get(matched.en);
        if(s.attempts === 0) s.attempts = 1;
        s.gotItEventually = true;
      }

      const pts = scoreFor(matched.answers[0]);
      score += pts;
      streak += 1;
      scoreEl.textContent = String(score);
      streakEl.textContent = String(streak);

      setMsg(`✅ Correct (${matched.en}) +${pts}`, "good");

      if(selectedBlocks.length) explodeAndRemove([...selectedBlocks]);
      else {
        const rect = stage.getBoundingClientRect();
        burst2D(rect.width*0.52, rect.height*0.32, 95);
      }

      typed.value = "";
      clearSelection();
      renderList();
      setPrompt();
      renderThemeProgress();

      if(remaining.length === 0){
        setTimeout(()=> showFeedback({revealFull:true, fromClear:true}), 450);
      }
      return;
    }

    if(promptTarget && levelStats.has(promptTarget.en)){
      levelStats.get(promptTarget.en).wrong.push(raw);
    }

    streak = 0;
    streakEl.textContent = "0";
    score = Math.max(0, score - 60);
    scoreEl.textContent = String(score);
    setMsg("❌ Wrong (−60). Try again, or Undo.", "bad");
  }

  function undoLast(){
    const b = selectedBlocks.pop();
    if(!b) return;
    unselectBlock(b);
    typed.value = typed.value.slice(0, -1);
    typed.focus({preventScroll:true});
  }

  function useHint(){
    const cur = remaining[0];
    if(!cur) return;
    hintUsedThisLevel += 1;

    streak = 0; streakEl.textContent = "0";
    score = Math.max(0, score - 80);
    scoreEl.textContent = String(score);

    const a0 = norm(cur.answers[0]);
    setMsg(`Hint: starts with “${(a0[0]||"").toUpperCase()}” · length ${a0.replace(/ /g,"").length} (−80)`, "");
  }

  function shuffleTower(){
    buildTower();
    clearSelection();
    typed.value = "";
    setMsg("Shuffled tower!", "");
    setTimeout(clearMsg, 900);
  }

  submitBtn.addEventListener("click", submit);
  undoBtn.addEventListener("click", undoLast);
  clearBtn.addEventListener("click", ()=>{ typed.value = ""; clearSelection(); clearMsg(); });
  hintBtn.addEventListener("click", useHint);
  shuffleBtn.addEventListener("click", shuffleTower);

  window.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){ e.preventDefault(); submit(); }
    if(e.key==="Backspace" && (document.activeElement !== typed)){ e.preventDefault(); undoLast(); }
    if(e.key==="Escape"){ typed.value=""; clearSelection(); clearMsg(); }
  });

  function bootResize(){
    const rect = stage.getBoundingClientRect();
    const w = Math.max(320, Math.floor(rect.width));
    const h = Math.max(420, Math.floor(rect.height));
    renderer.setSize(w,h,false);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();

    const dpr = window.devicePixelRatio || 1;
    fx.width = Math.floor(w*dpr);
    fx.height = Math.floor(h*dpr);
    fx.style.width = w+"px";
    fx.style.height = h+"px";
  }

  bootResize();
  updateCamera();
  animate();
  loadLevel(currentLevel);
}
