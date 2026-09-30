/* ==========================================================================
   ANVITHA SUNNY PORTFOLIO — INTERACTIVE ENGINE
   Features: Hero Canvas Graphics, Telemetry Simulators, Case Study Modals, Nav Tracking
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. STICKY NAV & SCROLL INDICATOR ---
  const siteHeader = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  function updateActiveNav() {
    let currentId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  // --- 2. MOBILE MENU TOGGLE ---
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navbar');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. HERO CANVAS BACKGROUND ANIMATION ---
  const canvas = document.getElementById('heroCanvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeCanvas() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initParticles();
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.floor(width / 35);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(163, 135, 99, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241, 232, 223, ${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();
  }

  // --- 4. SKYGUARD TELEMETRY INTERACTIVE TOGGLE ---
  const toggleSkyGuardBtn = document.getElementById('toggleSkyGuardAnomaly');
  const tempVal = document.getElementById('tempVal');
  const pressVal = document.getElementById('pressVal');
  const humVal = document.getElementById('humVal');
  const sensorStatusLabel = document.getElementById('sensorStatusLabel');

  let isAnomalyState = false;

  if (toggleSkyGuardBtn) {
    toggleSkyGuardBtn.addEventListener('click', () => {
      isAnomalyState = !isAnomalyState;
      if (isAnomalyState) {
        tempVal.textContent = "46.8 °C [SPIKE]";
        tempVal.style.color = "#e57373";
        pressVal.textContent = "994.2 hPa [DROP]";
        pressVal.style.color = "#e57373";
        humVal.textContent = "12.4 % [UNUSUAL]";
        humVal.style.color = "#e57373";
        sensorStatusLabel.textContent = "ANOMALY DETECTED";
        sensorStatusLabel.className = "m-val status-alert";
        toggleSkyGuardBtn.textContent = "Reset Nominal";
      } else {
        tempVal.textContent = "31.4 °C";
        tempVal.style.color = "var(--text-light-primary)";
        pressVal.textContent = "1012.8 hPa";
        pressVal.style.color = "var(--text-light-primary)";
        humVal.textContent = "78.2 %";
        humVal.style.color = "var(--text-light-primary)";
        sensorStatusLabel.textContent = "NOMINAL STATE";
        sensorStatusLabel.className = "m-val status-ok";
        toggleSkyGuardBtn.textContent = "Simulate Anomaly";
      }
    });
  }

  // --- 5. PROJECT CASE STUDY DATA & MODAL SYSTEM ---
  const caseStudyData = {
    skyguard: {
      category: "AI / ML · Disaster Management",
      title: "SkyGuard AI",
      subtitle: "Automatic Weather Station Intelligence & Sensor Anomaly Detection System",
      problem: "Automatic Weather Stations (AWS) continuously collect environmental telemetry, but readings frequently become unreliable due to sensor drift, frozen states, physical hardware malfunction, power fluctuations, or communication corruption. When faulty readings enter prediction models, disaster early-warning networks trigger false alarms or fail during genuine extreme weather events.",
      solution: "SkyGuard AI establishes a monitoring layer that continuously analyzes observations (Temperature, Atmospheric Pressure, and Relative Humidity). The system evaluates physical parameter correlations to distinguish genuine atmospheric phenomena from sensor anomalies, providing automated anomaly scores, root-cause hypotheses, and recommended corrective actions.",
      howItWorks: "1. Data Telemetry Stream: Ingests raw AWS sensor observations.\n2. Parameter Correlation Analysis: Evaluates physical consistency across Temperature, Pressure, and Humidity.\n3. Anomaly Scoring: Flags sudden spikes, frozen values, drift, or corrupted packets.\n4. Diagnosis & Alert: Displays confidence score, severity rating, and suggested technician actions.",
      technicalApproach: "Historical weather data establishes normal multi-parameter bounds. Machine learning algorithms flag multi-variance deviations, calculating real-time anomaly scores and estimating expected parameter ranges to maintain continuous data integrity.",
      aiData: "The pipeline processes multi-parameter weather observations. Anomaly categories include: Sudden Spike, Sudden Drop, Frozen Sensor, Sensor Drift, Corrupted Telemetry, and Environmental Anomaly.",
      keyFeatures: [
        { title: "Live Command Dashboard", desc: "Real-time monitoring across multiple weather station nodes with global status views." },
        { title: "Multi-Parameter Correlation", desc: "Cross-checks Temperature, Atmospheric Pressure, and Relative Humidity." },
        { title: "Automated Diagnosis", desc: "Provides anomaly score, severity rating, probable cause, and corrected estimate." },
        { title: "Alert & Sensor History", desc: "Tracks station maintenance logs and sensor health degradation over time." }
      ],
      currentStatus: "Prototype Stage. Running on SIMULATED AWS DATA for demonstration purposes unless connected to an live physical AWS telemetry backend.",
      learnings: "Building SkyGuard AI highlighted the importance of domain-aware feature engineering in sensor streams. Physics-constrained anomaly bounds significantly reduced false positives compared to naive statistical thresholding."
    },

    placement: {
      category: "AI / Data Science · Education",
      title: "AI Placement Predictor",
      subtitle: "Student Placement Readiness Analytics & Skill Gap Assessment Platform",
      problem: "Students preparing for campus recruitment often lack objective feedback on their readiness. Generic advice fails to pinpoint individual skill gaps, leading to misplaced effort during critical preparation periods.",
      solution: "AI Placement Predictor evaluates academic performance, technical skills, project experience, and aptitude metrics. It provides structured insight answering: Where they are → What they are missing → What they should improve next.",
      howItWorks: "1. Profile Input: Students input academic metrics, programming proficiencies, and project histories.\n2. Analytics Evaluation: Models process input parameters against placement benchmarks.\n3. Gap Identification: System flags specific technical or analytical skill gaps.\n4. Action Roadmap: Generates targeted learning priorities for career readiness.",
      technicalApproach: "Constructed using Python and Scikit-Learn data science libraries. The engine evaluates non-linear relationships between academic consistency, algorithm practice, and practical project execution to output structured readiness feedback.",
      aiData: "Uses categorical and numerical feature vectors covering academic CGPA, coding proficiencies, domain specialization, and internship experience to formulate transparent readiness insights.",
      keyFeatures: [
        { title: "Readiness Assessment", desc: "Provides clear, non-inflated evaluation of current placement readiness." },
        { title: "Skill Gap Analysis", desc: "Pinpoints exact technical areas requiring immediate student focus." },
        { title: "Priority Action Plan", desc: "Generates step-by-step learning recommendations tailored to student profiles." },
        { title: "Clean Editorial UI", desc: "Presents complex analytical breakdowns through clear visual dashboards." }
      ],
      currentStatus: "Prototype Stage. Academic project developed for educational data analysis research.",
      learnings: "Designing this platform reinforced that analytical tools must prioritize actionable guidance over arbitrary percentage scores, empowering users with clear next steps."
    },

    mediere: {
      category: "AI / Healthcare · Supply Chain",
      title: "Medière",
      subtitle: "Medicine Availability & Pharmacy Supplier Recommendation Platform",
      problem: "Local pharmacies frequently struggle with fragmented supplier visibility during urgent medicine restocking, resulting in stock-outs, delayed deliveries, and unoptimized procurement costs.",
      solution: "Medière consolidates medicine stock availability and supplier data into a unified interactive platform. Pharmacies can query medicine availability, compare unit pricing and estimated delivery times across multiple suppliers, and generate optimal restock orders.",
      howItWorks: "1. Search Medicine: Pharmacy searches required pharmaceutical items.\n2. Supplier Comparison: System displays real-time supplier availability, unit cost, and delivery timelines.\n3. Recommendation Engine: Highlights optimal supplier combinations based on speed, price, and near-expiry alerts.\n4. Restock Workflow: Calculates estimated total cost and generates restock order details.",
      technicalApproach: "Built as a high-performance interactive client application using vanilla JavaScript. Implements multi-criteria sorting and filtering algorithms to evaluate stock levels, delivery windows, and supplier reliability.",
      aiData: "Processes simulated pharmaceutical inventory catalogs, evaluating unit prices, stock thresholds, batch expiry dates, and supplier fulfillment metrics to recommend optimal restocking channels.",
      keyFeatures: [
        { title: "Centralized Medicine Search", desc: "Fast multi-supplier inventory lookup for critical medicine availability." },
        { title: "Supplier Comparison Matrix", desc: "Compares unit price, stock quantity, delivery hours, and near-expiry notices." },
        { title: "Restock Order Calculator", desc: "Estimates order totals and recommended restock quantities." },
        { title: "Near-Expiry Alerts", desc: "Flags batches approaching expiration to reduce pharmaceutical waste." }
      ],
      currentStatus: "● Deployed Interactive Prototype. Demonstrates core supply-chain workflows using DEMO DATA.",
      liveDemoUrl: "https://websiste-cdfhbxb4c-me-7382.vercel.app",
      learnings: "Developing Medière highlighted how intuitive UI architecture directly impacts operational efficiency in high-stakes domain workflows like healthcare logistics."
    }
  };

  const caseStudyModal = document.getElementById('caseStudyModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');
  const openButtons = document.querySelectorAll('.open-case-study');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      if (caseStudyData[projectKey]) {
        renderCaseStudy(caseStudyData[projectKey]);
        caseStudyModal.classList.add('active');
        caseStudyModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseStudyModal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    caseStudyModal.classList.remove('active');
    caseStudyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderCaseStudy(data) {
    let liveDemoHtml = '';
    if (data.liveDemoUrl) {
      liveDemoHtml = `
        <div class="cs-live-demo-banner">
          <span class="cs-banner-text">Experience the deployed interactive prototype live in your browser:</span>
          <a href="${data.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent">
            <span>Live Demo ↗</span>
          </a>
        </div>
      `;
    }

    modalContent.innerHTML = `
      <div class="cs-header">
        <div class="cs-eyebrow">
          <span class="cs-num">CASE STUDY</span>
          <span class="cs-cat">${data.category}</span>
        </div>
        <h2 id="modalTitle" class="cs-title serif-heading">${data.title}</h2>
        <p class="cs-subtitle">${data.subtitle}</p>
        ${liveDemoHtml}
      </div>

      <div class="cs-section-block">
        <div class="cs-sec-header">
          <span class="cs-sec-num">01</span>
          <h3 class="cs-sec-title">Problem</h3>
        </div>
        <p class="cs-p">${data.problem}</p>
      </div>

      <div class="cs-section-block">
        <div class="cs-sec-header">
          <span class="cs-sec-num">02</span>
          <h3 class="cs-sec-title">Solution</h3>
        </div>
        <p class="cs-p">${data.solution}</p>
      </div>

      <div class="cs-section-block">
        <div class="cs-sec-header">
          <span class="cs-sec-num">03</span>
          <h3 class="cs-sec-title">How It Works</h3>
        </div>
        <p class="cs-p" style="white-space: pre-line;">${data.howItWorks}</p>
      </div>

      <div class="cs-section-block">
        <div class="cs-sec-header">
          <span class="cs-sec-num">04</span>
          <h3 class="cs-sec-title">Technical Approach</h3>
        </div>
        <p class="cs-p">${data.technicalApproach}</p>
      </div>

      <div class="cs-section-block">
        <div class="cs-sec-header">
          <span class="cs-sec-num">05</span>
          <h3 class="cs-sec-title">AI / Data Architecture</h3>
        </div>
        <p class="cs-p">${data.aiData}</p>
      </div>

      <div class="cs-section-block">
        <div class="cs-sec-header">
          <span class="cs-sec-num">06</span>
          <h3 class="cs-sec-title">Key Features</h3>
        </div>
        <div class="cs-grid-features">
          ${data.keyFeatures.map(f => `
            <div class="cs-feature-card">
              <h4 class="cs-feat-title">${f.title}</h4>
              <p class="cs-feat-desc">${f.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="cs-section-block">
        <div class="cs-sec-header">
          <span class="cs-sec-num">07</span>
          <h3 class="cs-sec-title">Current Status</h3>
        </div>
        <p class="cs-p"><strong>${data.currentStatus}</strong></p>
      </div>

      <div class="cs-section-block">
        <div class="cs-sec-header">
          <span class="cs-sec-num">08</span>
          <h3 class="cs-sec-title">Learnings &amp; Takeaways</h3>
        </div>
        <p class="cs-p">${data.learnings}</p>
      </div>

      ${data.liveDemoUrl ? `
        <div style="margin-top: 3rem; text-align: center;">
          <a href="${data.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent btn-large">
            <span>Launch Live Demo ↗</span>
          </a>
        </div>
      ` : ''}
    `;
  }

});
