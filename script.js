document.addEventListener("DOMContentLoaded", () => {

  /* ===== LAST UPDATED (only if element exists) ===== */
  const lastUpdatedEl = document.getElementById("lastUpdated");
  if (lastUpdatedEl) {
    lastUpdatedEl.textContent = new Date().toLocaleString();
  }

  /* ===== SLIDER (works on any page if .slide exists) ===== */
  const slides = document.querySelectorAll(".slide");
  let current = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 3000);
  }

  /* ===== TAB SWITCHING (MAIN TABS) ===== */
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  if (tabButtons.length && tabPanels.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabPanels.forEach(p => p.classList.remove("active"));

        btn.classList.add("active");
        const panel = document.getElementById(btn.dataset.tab);
        if (panel) panel.classList.add("active");

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  /* ===== ACCORDION FOR ACTIVITIES ===== */
  const accButtons = document.querySelectorAll(".acc-btn");
  if (accButtons.length) {
    accButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const panel = btn.nextElementSibling;
        if (!panel) return;
        panel.style.display = (panel.style.display === "block") ? "none" : "block";
      });
    });
  }

  /* ===== PERFORMANCE PAGE ONLY ===== */
  const perfList = document.getElementById("performanceList");
  const searchInput = document.getElementById("searchInput");
  const classFilter = document.getElementById("classFilter");

  if (perfList && searchInput && classFilter) {

    const performances = [
      { no: 1, className: "Junior 2", title: "", participants: "", duration: "", link: "" },
      { no: 2, className: "Junior 3", title: "", participants: "", duration: "", link: "" },
      { no: 3, className: "1 Birmingham", title: "", participants: "", duration: "", link: "" },
      { no: 4, className: "1 Brighton", title: "", participants: "", duration: "", link: "" },
      { no: 5, className: "2 Birmingham", title: "Jingle Bells", participants: "2 Bir", duration: "1:46", link: "https://youtu.be/3CWJNqyu..." }
    ];

    [...new Set(performances.map(p => p.className))].forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      classFilter.appendChild(opt);
    });

    function renderPerformances() {
      const q = searchInput.value.toLowerCase();
      const cf = classFilter.value;

      const filtered = performances.filter(p => {
        const matchesQ = p.className.toLowerCase().includes(q) || p.title.toLowerCase().includes(q);
        const matchesC = (cf === "all") || (p.className === cf);
        return matchesQ && matchesC;
      });

      perfList.innerHTML = filtered.map(p => `
        <div class="perf-card">
          <h3>${p.no}. ${p.className}</h3>
          <p><strong>Title:</strong> ${p.title || "—"}</p>
          <p><strong>Participants:</strong> ${p.participants || "—"}</p>
          <p><strong>Duration:</strong> ${p.duration || "—"}</p>
          ${p.link ? `<p><a href="${p.link}" target="_blank">YouTube Link</a></p>` : ""}
        </div>
      `).join("");
    }

    searchInput.addEventListener("input", renderPerformances);
    classFilter.addEventListener("change", renderPerformances);
    renderPerformances();
  }

  /* ===== GALLERY PAGE ONLY ===== */
  const photosEl = document.getElementById("photos");
  const videosEl = document.getElementById("videos");

  if (photosEl && videosEl) {

    const photos = [
      { src: "valuetree1.jpg", caption: "Shared Value Tree – Launch" },
      { src: "treasure1.jpg",  caption: "Treasure Hunt – Teams in action" },
      { src: "bubble1.jpg",    caption: "Speech Bubble – Primary creativity" },
      { src: "party1.jpg",     caption: "Class Party moments" },
      { src: "performance1.jpg", caption: "Christmas Performances" },
      { src: "awards1.jpg",    caption: "Award Giving" },
      { src: "santa1.jpg",     caption: "Secret Santa Reveal" }
    ];

    const videos = [
      { title: "2 Birmingham – Jingle Bells", type:"youtube", src:"https://www.youtube.com/embed/VIDEO_ID1" },
      { title: "Shared Value Tree Highlights", type:"youtube", src:"https://www.youtube.com/embed/VIDEO_ID2" }

      // Tomorrow add MP4 like:
      // { title:"Official Opening Ceremony", type:"mp4", src:"official-opening.mp4" }
    ];

    photosEl.innerHTML = photos.map(p=>`
      <div class="photo-item">
        <img src="${p.src}" alt="${p.caption}" data-caption="${p.caption}">
        <div class="caption">${p.caption}</div>
      </div>
    `).join("");

    videosEl.innerHTML = videos.map(v=>{
      if(v.type==="mp4"){
        return `
          <div class="video-item">
            <video controls>
              <source src="${v.src}" type="video/mp4">
            </video>
            <div class="caption">${v.title}</div>
          </div>
        `;
      }
      return `
        <div class="video-item">
          <iframe src="${v.src}" allowfullscreen></iframe>
          <div class="caption">${v.title}</div>
        </div>
      `;
    }).join("");

    /* ===== LIGHTBOX ===== */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("closeLightbox");

    if (lightbox && lightboxImg && lightboxCaption && closeBtn) {
      document.addEventListener("click", (e) => {
        if (e.target.matches(".photo-item img")) {
          lightboxImg.src = e.target.src;
          lightboxCaption.textContent = e.target.dataset.caption || "";
          lightbox.style.display = "flex";
        }
      });

      closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
      });

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.style.display = "none";
      });
    }

    /* ===== SUBTABS (PHOTOS / VIDEOS) ===== */
    const subBtns = document.querySelectorAll(".subtab-btn");
    const subPanels = document.querySelectorAll(".subtab-panel");

    if (subBtns.length && subPanels.length) {
      subBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          subBtns.forEach(b => b.classList.remove("active"));
          subPanels.forEach(p => p.classList.remove("active"));

          btn.classList.add("active");
          const panel = document.getElementById(btn.dataset.subtab);
          if (panel) panel.classList.add("active");
        });
      });
    }

  } // end gallery-only block

}); // end DOMContentLoaded
