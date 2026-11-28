/* Shared engine for every HCM 4030 module page.
   A module page sets <body data-module="N" data-steps="Name|Name|...">, marks each step with
   <section class="step" data-step="k">, and marks answer fields with:
     data-save="key"            saved in this browser
     data-req                   required before Next works (data-min = characters, data-minwords = words)
     data-doc="Section title"   included in the Word submission under that section
     data-label="Question"      label used in the Word submission
     data-row / data-col        (optional) put the field in a table in the Word submission
     data-coach                 included when the student copies a draft for the AI coach
   Quick checks: <div class="qc" data-id="..." data-h="(hash)" data-req> with .choice buttons and a .fb box. */
(function(){
  const $ = (s,r=document)=>r.querySelector(s), $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
  const esc = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const words = s => (String(s).trim().match(/\S+/g)||[]).length;
  const MOD = document.body.dataset.module;
  const N = isNaN(Number(MOD)) ? MOD : Number(MOD);
  const LABEL = isNaN(Number(MOD)) ? MOD.charAt(0).toUpperCase()+MOD.slice(1) : "Module "+N;
  const REDO = document.body.dataset.redo !== "no";
  const P = "m"+N+".";
  const STEP_NAMES = (document.body.dataset.steps||"").split("|");
  const TOTAL = STEP_NAMES.length;
  const TITLE = document.body.dataset.title || (LABEL);
  const C = window.COURSE || {};

  /* ---------- config-driven links (Canvas integration) ---------- */
  if(C.videoUrl && C.videoUrl[N] && $("#videoBox")) $("#videoBox").innerHTML = videoHtml(C.videoUrl[N], LABEL+" video");
  $$("[data-video]").forEach(box=>{ const k = box.dataset.video; if(C.extraVideos && C.extraVideos[k]) box.innerHTML = videoHtml(C.extraVideos[k], k); });
  if(C.submitUrl && C.submitUrl[N]) $$(".submitLink").forEach(a=>{ a.href = C.submitUrl[N]; a.style.display = "inline-block"; });

  /* ---------- save / restore ---------- */
  const key = el => P+"f."+el.dataset.save;
  $$("[data-save]").forEach(el=>{
    const v = store.get(key(el), null);
    if(v!==null){ if(el.type==="checkbox") el.checked = !!v; else el.value = v; }
    const ev = (el.type==="checkbox"||el.tagName==="SELECT")?"change":"input";
    el.addEventListener(ev, ()=>{ store.set(key(el), el.type==="checkbox"?el.checked:el.value); onChange(el); });
  });
  $$("input[type=checkbox]").forEach(cb=>{ const row=cb.closest(".check"); if(row){ const f=()=>row.classList.toggle("done",cb.checked); cb.addEventListener("change",f); f(); }});

  /* ---------- quick checks ---------- */
  $$(".qc").forEach(q=>{
    const id = q.dataset.id, fb = $(".fb",q), right = KestrelQC.right(q,N);
    const btns = $$(".choice",q);
    const markRight = ()=>{ btns.forEach(b=>b.classList.remove("wrong")); if(btns[right]) btns[right].classList.add("right"); fb.className="fb show ok"; fb.textContent=fb.dataset.ok; q.dataset.solved="1"; };
    if(store.get(P+"qc."+id,false)) markRight();
    btns.forEach((b,i)=>b.addEventListener("click",()=>{
      if(i===right){ store.set(P+"qc."+id,true); markRight(); onChange(q); }
      else { b.classList.add("wrong"); fb.className="fb show no"; fb.textContent=fb.dataset.no; }
    }));
  });

  /* ---------- gating ---------- */
  function unmet(stepEl){
    const out = [];
    $$("[data-req]",stepEl).forEach(el=>{
      let ok = true;
      if(el.classList.contains("qc")) ok = el.dataset.solved==="1";
      else if(el.type==="checkbox") ok = el.checked;
      else if(el.tagName==="SELECT") ok = el.value!=="";
      else {
        const v = el.value.trim();
        ok = v.length >= Number(el.dataset.min||1);
        if(ok && el.dataset.minwords) ok = words(v) >= Number(el.dataset.minwords);
      }
      if(!ok) out.push(el);
    });
    return out;
  }

  /* ---------- navigation ---------- */
  let cur = store.get(P+"step",1), maxReached = store.get(P+"max",1);
  if(cur>TOTAL) cur = TOTAL;
  const steps = $$(".step"), dots = $("#dots");
  dots.innerHTML = STEP_NAMES.map((n,i)=>`<button class="dot" data-d="${i+1}" type="button"><span class="c">${i+1}</span><span class="l">${esc(n)}</span></button>`).join("");
  function render(){
    steps.forEach(s=>s.classList.toggle("active", Number(s.dataset.step)===cur));
    $$(".dot").forEach(d=>{ const i=Number(d.dataset.d); d.classList.toggle("now",i===cur); d.classList.toggle("done",i<cur||store.get(P+"done",false)); d.disabled = i>maxReached; d.setAttribute("aria-current", i===cur?"step":"false"); });
    const pct = store.get(P+"done",false) ? 100 : Math.max(3,Math.min(97,((cur-1)/TOTAL)*100+3));
    $("#fill").style.width = pct+"%"; const mk = $("#marker"); if(mk) mk.style.left = pct+"%";
    $("#prev").style.visibility = cur===1?"hidden":"visible";
    const nx = $("#next"); nx.textContent = cur===TOTAL?("Finish "+LABEL):"Next";
    nx.style.display = (cur===TOTAL && store.get(P+"done",false)) ? "none" : "inline-block";
    updateGate();
    store.set(P+"step",cur); store.set(P+"max",maxReached);
  }
  function updateGate(){
    const g = $("#gate"), left = unmet(steps[cur-1]).length;
    if(cur===TOTAL && store.get(P+"done",false)){ g.style.display="none"; return; }
    g.style.display = "block";
    if(left===0){ g.className="gate ok"; g.textContent = cur===TOTAL?"All set. Finish when you are ready.":"Nice work. You can continue."; }
    else { g.className="gate"; g.textContent = left+(left===1?" item":" items")+" left on this step."; }
  }
  function onChange(el){
    $$("[data-wc]").forEach(w=>{ const t = $("#"+w.dataset.wc); if(t) w.textContent = words(t.value)+" words"+(w.dataset.aim?" (aim for "+w.dataset.aim+")":""); });
    updateGate();
  }
  function go(n){ cur = n; if(n>maxReached) maxReached = n; render(); window.scrollTo({top:0,behavior:"smooth"}); }
  $("#next").addEventListener("click",()=>{
    const left = unmet(steps[cur-1]);
    if(left.length){
      const el = left[0]; (el.closest(".card,.turn,.check,tr")||el).scrollIntoView({behavior:"smooth",block:"center"});
      if(el.focus && !el.classList.contains("qc")) el.focus({preventScroll:true});
      $("#gate").textContent = "Finish this first, then you can continue."; return;
    }
    if(cur===TOTAL) return finish();
    go(cur+1);
  });
  $("#prev").addEventListener("click",()=>go(cur-1));
  dots.addEventListener("click",e=>{ const b=e.target.closest(".dot"); if(b && !b.disabled) go(Number(b.dataset.d)); });
  $$("[data-goto]").forEach(b=>b.addEventListener("click",()=>go(Number(b.dataset.goto))));

  /* ---------- building the submission ---------- */
  function sections(onlyCoach){
    const out = [], by = {};
    $$("[data-doc]").forEach(el=>{
      if(onlyCoach && !el.hasAttribute("data-coach")) return;
      if(onlyCoach && el.type!=="checkbox" && !el.value.trim()) return; // leave blank answers out of the coach copy
      const s = el.dataset.doc;
      if(!by[s]){ by[s] = {title:s, items:[], rows:{}, cols:[], rowOrder:[]}; out.push(by[s]); }
      const v = el.type==="checkbox" ? (el.checked?"Yes":"No") : el.value.trim();
      if(el.dataset.row){
        const r = el.dataset.row, c = el.dataset.col||"";
        if(!by[s].rows[r]){ by[s].rows[r] = {}; by[s].rowOrder.push(r); }
        if(!by[s].cols.includes(c)) by[s].cols.push(c);
        by[s].rows[r][c] = v;
      } else by[s].items.push({label: el.dataset.label||"", v});
    });
    return out;
  }
  function asText(onlyCoach){
    return sections(onlyCoach).map(s=>{
      let t = s.title+"\n";
      if(s.rowOrder.length) t += s.rowOrder.map(r=>r+": "+s.cols.map(c=>c+": "+(s.rows[r][c]||"")).join(" | ")).join("\n")+"\n";
      t += s.items.map(i=>(i.label?i.label+"\n":"")+i.v).join("\n\n");
      return t;
    }).join("\n\n");
  }
  function asDoc(){
    const p = t => "<p>"+esc(t).replace(/\n/g,"<br>")+"</p>";
    const body = sections(false).map(s=>{
      let h = `<h2>${esc(s.title)}</h2>`;
      if(s.rowOrder.length){
        h += `<table><tr><th></th>${s.cols.map(c=>`<th>${esc(c)}</th>`).join("")}</tr>`+
             s.rowOrder.map(r=>`<tr><td><b>${esc(r)}</b></td>${s.cols.map(c=>`<td>${esc(s.rows[r][c]||"").replace(/\n/g,"<br>")}</td>`).join("")}</tr>`).join("")+`</table>`;
      }
      h += s.items.map(i=>(i.label?`<p><b>${esc(i.label)}</b></p>`:"")+p(i.v)).join("");
      return h;
    }).join("\n");
    const name = (($("#stuName")||{}).value||"").trim();
    const attempt = (($("#attempt")||{}).value||"First submission");
    return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${LABEL} Submission</title>
<style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt}h1{color:#C8102E}h2{color:#C8102E;border-bottom:2px solid #F1BE48}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:4px;vertical-align:top}th{background:#F3E3E6}</style></head><body>
<h1>HCM 4030 ${LABEL}: ${esc(TITLE)}</h1>
<p><b>Student:</b> ${esc(name)} &nbsp; <b>Attempt:</b> ${esc(attempt)} &nbsp; <b>Date:</b> ${new Date().toLocaleDateString()}</p>
${body}
</body></html>`;
  }
  function download(){
    const name = (($("#stuName")||{}).value||"").trim();
    const blob = new Blob(["﻿"+asDoc()],{type:"application/msword"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "HCM4030_"+LABEL.replace(/ /g,"")+"_"+(name.replace(/[^A-Za-z0-9]+/g,"_")||"student")+".doc";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),2000);
    toast("Downloaded. Upload it to Canvas.");
  }
  $$("[data-copy]").forEach(b=>b.addEventListener("click",()=>{ copyText($(b.dataset.copy).textContent.trim()).then(ok=>{ if(!ok) return; const o=b.dataset.label||b.textContent; b.dataset.label=o; b.textContent="Copied!"; setTimeout(()=>b.textContent=o,1500); }); }));
  $$("[data-copy-draft]").forEach(b=>b.addEventListener("click",()=>copyText(asText(true))));
  $$("[data-download]").forEach(b=>b.addEventListener("click",()=>{
    const need = $$(".step").filter(s=>Number(s.dataset.step)<=Number(b.dataset.download||TOTAL)).flatMap(unmet);
    if(need.length){ toast("Finish the earlier steps first"); return; }
    download();
  }));

  /* ---------- finish ---------- */
  function finishCard(){
    $("#finishBox").innerHTML = `<div class="card done-card"><h2>${LABEL} complete!</h2>
      <p>Download your submission, then upload it to Canvas.</p>
      <p><button class="btn btn-red" id="dl2" type="button">Download my submission (.doc)</button></p>
      ${REDO?`<p class="hint">You may redo this assignment up to 3 times, within 14 days after its grade posts (all redos by May 13). Your highest attempt counts.</p>`:`<p class="hint">The final has one attempt, so check every file before you submit.</p>`}
      <p><button class="btn btn-ghost btn-sm" id="reset" type="button">Clear my saved answers on this device</button></p></div>`;
    $("#dl2").addEventListener("click",download);
    $("#reset").addEventListener("click",()=>{ if(confirm("This erases everything you typed in "+LABEL+" on this device. Continue?")){ Object.keys(localStorage).filter(k=>k.startsWith("hcm4030."+P)).forEach(k=>localStorage.removeItem(k)); location.reload(); }});
  }
  function finish(){ store.set(P+"done",true); finishCard(); if(window.confetti) confetti(); render(); window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}); }
  if(store.get(P+"done",false)) finishCard();

  onChange(null);
  render();
})();
