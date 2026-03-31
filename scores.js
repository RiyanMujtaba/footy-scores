// ── Match Data (Matchday 29 — 2025/26 Season) ─────────────────────────────
// Status: FT = Full Time | LIVE = In Progress (min) | HT = Half Time | NS = Not Started

const leagues = {
  pl: {
    name: "PREMIER LEAGUE",
    country: "ENG",
    matches: [
      { home: "MAN CITY",    away: "ARSENAL",      score: "2 - 2", status: "FT"    },
      { home: "LIVERPOOL",   away: "CHELSEA",       score: "3 - 1", status: "FT"    },
      { home: "MAN UTD",     away: "TOTTENHAM",     score: "1 - 2", status: "FT"    },
      { home: "NEWCASTLE",   away: "ASTON VILLA",   score: "0 - 0", status: "67'"   },
      { home: "BRIGHTON",    away: "WEST HAM",      score: "2 - 0", status: "HT"    },
      { home: "BRENTFORD",   away: "WOLVES",        score: "- - -", status: "18:00" },
      { home: "EVERTON",     away: "FULHAM",        score: "- - -", status: "20:45" },
    ]
  },
  ll: {
    name: "LA LIGA",
    country: "ESP",
    matches: [
      { home: "REAL MADRID",  away: "BARCELONA",   score: "1 - 1", status: "FT"    },
      { home: "ATLETICO",     away: "SEVILLA",      score: "2 - 0", status: "FT"    },
      { home: "VILLARREAL",   away: "BILBAO",       score: "1 - 1", status: "FT"    },
      { home: "SOCIEDAD",     away: "VALENCIA",     score: "3 - 0", status: "79'"   },
      { home: "BETIS",        away: "CELTA VIGO",   score: "0 - 1", status: "45+2'" },
      { home: "GIRONA",       away: "LAS PALMAS",   score: "- - -", status: "19:00" },
      { home: "OSASUNA",      away: "GETAFE",       score: "- - -", status: "21:00" },
    ]
  },
  bl: {
    name: "BUNDESLIGA",
    country: "GER",
    matches: [
      { home: "BAYERN",       away: "DORTMUND",     score: "4 - 0", status: "FT"    },
      { home: "LEVERKUSEN",   away: "LEIPZIG",      score: "2 - 1", status: "FT"    },
      { home: "FRANKFURT",    away: "STUTTGART",    score: "1 - 1", status: "FT"    },
      { home: "WOLFSBURG",    away: "FREIBURG",     score: "0 - 2", status: "FT"    },
      { home: "UNION BERLIN", away: "MAINZ",        score: "1 - 0", status: "58'"   },
      { home: "HOFFENHEIM",   away: "AUGSBURG",     score: "- - -", status: "18:30" },
      { home: "BOCHUM",       away: "KOLN",         score: "- - -", status: "20:30" },
    ]
  },
  sa: {
    name: "SERIE A",
    country: "ITA",
    matches: [
      { home: "INTER",        away: "MILAN",        score: "2 - 1", status: "FT"    },
      { home: "JUVENTUS",     away: "NAPOLI",       score: "0 - 0", status: "FT"    },
      { home: "ROMA",         away: "LAZIO",        score: "1 - 3", status: "FT"    },
      { home: "FIORENTINA",   away: "TORINO",       score: "2 - 0", status: "71'"   },
      { home: "BOLOGNA",      away: "ATALANTA",     score: "1 - 1", status: "HT"    },
      { home: "UDINESE",      away: "CAGLIARI",     score: "- - -", status: "19:45" },
      { home: "SASSUOLO",     away: "GENOA",        score: "- - -", status: "19:45" },
    ]
  },
  l1: {
    name: "LIGUE 1",
    country: "FRA",
    matches: [
      { home: "PSG",          away: "MARSEILLE",    score: "3 - 2", status: "FT"    },
      { home: "MONACO",       away: "LENS",         score: "1 - 0", status: "FT"    },
      { home: "LYON",         away: "NICE",         score: "2 - 2", status: "FT"    },
      { home: "LILLE",        away: "RENNES",       score: "1 - 0", status: "82'"   },
      { home: "NANTES",       away: "STRASBOURG",   score: "0 - 0", status: "45'"   },
      { home: "REIMS",        away: "BREST",        score: "- - -", status: "20:00" },
      { home: "TOULOUSE",     away: "MONTPELLIER",  score: "- - -", status: "20:00" },
    ]
  }
};

// ── Status helpers ──────────────────────────────────────────────────────────
function statusClass(s) {
  if (s === "FT")  return "status-ft";
  if (s === "HT")  return "status-ht";
  if (/^\d/.test(s)) return "status-live";
  return "status-ns";
}

function statusLabel(s) {
  if (s === "FT")  return "FULL TIME";
  if (s === "HT")  return "HALF TIME";
  if (/^\d/.test(s)) return `● LIVE ${s}`;
  return s;
}

// ── Render ──────────────────────────────────────────────────────────────────
function render(leagueKey) {
  const panel = document.getElementById("scores-panel");
  const data  = leagues[leagueKey];

  let liveCount = data.matches.filter(m => /^\d/.test(m.status) || m.status === "HT").length;

  let html = `
    <div class="league-header">
      <span>${data.name} &nbsp;// ${data.country}</span>
      <span>${liveCount > 0 ? `${liveCount} LIVE` : "NO LIVE MATCHES"}</span>
    </div>
  `;

  data.matches.forEach(m => {
    const sc = statusClass(m.status);
    const sl = statusLabel(m.status);
    html += `
      <div class="match">
        <div class="team home">${m.home}</div>
        <div class="score-block">
          <div class="score">${m.score}</div>
          <div class="match-status ${sc}">${sl}</div>
        </div>
        <div class="team away">${m.away}</div>
      </div>
    `;
  });

  panel.innerHTML = html;
}

// ── Tab switching ───────────────────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.league);
  });
});

// ── Clock ───────────────────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("clock").textContent = `${h}:${m}:${s}`;

  const days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  document.getElementById("match-date").textContent =
    `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

setInterval(updateClock, 1000);
updateClock();

// ── Initial render ──────────────────────────────────────────────────────────
render("pl");
