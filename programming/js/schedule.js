// Placeholder for when images fail to load
        const fallbackImage = "https://ui-avatars.com/api/?background=1e293b&color=38bdf8&font-size=0.4&name=";

        // Mobile Menu Toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Initialize Scroll Animation
        function initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            });

            document.querySelectorAll('.reveal').forEach((el) => {
                observer.observe(el);
            });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            initScrollAnimations();
        });

  function formatLongDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  function formatShortDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function computeStatus(event) {
    if (event.status) return event.status; // honor explicit status
    const eventDate = new Date(event.date + "T00:00:00");
    const today = new Date();
    today.setHours(0,0,0,0);
    return eventDate < today ? "Completed" : "Upcoming";
  }

  function badgeClasses(status) {
    switch (status) {
      case "Completed":
        return "bg-green-900/30 text-green-400 border border-green-500/30";
      case "Upcoming":
        return "bg-blue-900/30 text-blue-400 border border-blue-500/30";
      case "Scheduled":
        return "bg-blue-900/30 text-blue-400 border border-blue-500/30";
      case "Target Goal":
        return "bg-purple-900/30 text-purple-400 border border-purple-500/30";
      default:
        return "bg-gray-800 text-gray-300 border border-gray-700";
    }
  }

  function dotClasses(status) {
    switch (status) {
      case "Completed":
        return "border-citrix-accent shadow-[0_0_15px_rgba(56,189,248,0.5)]";
      case "Upcoming":
      case "Scheduled":
        return "border-white animate-pulse";
      case "Target Goal":
        return "border-gray-600";
      default:
        return "border-gray-600";
    }
  }

  function sideClasses(index) {
    // Alternate sides: even -> normal (date left, content right), odd -> reversed
    const isReversed = index % 2 === 1;
    return {
      wrapper: `reveal relative mb-16 md:flex ${isReversed ? "md:flex-row-reverse" : ""} md:justify-between items-center group w-full`,
      dateCol: `hidden md:block w-5/12 ${isReversed ? "text-left pl-8" : "text-right pr-8"}`,
      contentCol: `pl-12 ${isReversed ? "md:pr-8 md:pl-0 md:w-5/12 md:text-right" : "md:pl-8 md:w-5/12"}`
    };
  }

  async function loadSchedule() {
    try {
      const res = await fetch("json/schedule.json", { cache: "no-cache" });
      const events = await res.json();

      // sort ascending by date
      events.sort((a, b) => new Date(a.date) - new Date(b.date));

      const container = document.getElementById("timeline");
      container.innerHTML = "";

      events.forEach((event, i) => {
        const status = computeStatus(event);
        const { wrapper, dateCol, contentCol } = sideClasses(i);
        const longDate = formatLongDate(event.date);
        const shortDate = formatShortDate(event.date);

        const isReversed = i % 2 === 1;

        const upcomingRibbon = status === "Upcoming"
          ? `<div class="absolute -top-3 ${isReversed ? "right-4 md:right-auto md:left-4" : "right-4"} bg-citrix-accent text-citrix-dark font-bold text-xs px-2 py-1 rounded">UPCOMING</div>`
          : "";

        const cardBorderTop = status === "Upcoming" ? "border-t-4 border-t-citrix-accent shadow-2xl relative" : "hover:border-citrix-accent transition-colors shadow-lg";

        const eventHTML = `
          <div class="${wrapper}">
            <!-- Date column -->
            <div class="${dateCol}">
              <span class="text-citrix-accent font-tech text-xl font-bold">${longDate}</span>
              <p class="text-gray-500 text-sm">${event.type || "Event"}</p>
            </div>

            <!-- Timeline dot -->
            <div class="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-citrix-dark border-4 ${dotClasses(status)} z-10"></div>

            <!-- Content column -->
            <div class="${contentCol}">
              <!-- Mobile date -->
              <div class="md:hidden mb-1">
                <span class="text-citrix-accent font-tech font-bold">${shortDate}</span>
              </div>

              <div class="bg-citrix-light border border-gray-700 p-6 rounded-xl ${cardBorderTop} ${isReversed ? "md:text-left" : ""}">
                ${upcomingRibbon}
                <h3 class="text-xl font-bold text-white mb-2">${event.title}</h3>
                <p class="text-gray-400 text-sm ${status === "Completed" ? "mb-2" : ""}">${event.description || ""}</p>
                <span class="inline-block mt-3 px-2 py-1 text-xs rounded ${badgeClasses(status)}">${status}</span>
              </div>
            </div>
          </div>
        `;

        container.insertAdjacentHTML("beforeend", eventHTML);
      });

      // Re-init intersection observer for newly added elements
      initScrollAnimations();
    } catch (err) {
      console.error("Failed to load schedule:", err);
      const container = document.getElementById("timeline");
      container.innerHTML = `
        <div class="text-center text-gray-400">
          <p class="mb-2">Unable to load the schedule right now.</p>
          <p class="text-sm">Err404 -- json/schedule.json NOT FOUND.</p>
        </div>
      `;
    }
  }

  // Ensure this runs after your existing DOMContentLoaded init ok??????
  document.addEventListener("DOMContentLoaded", () => {
    loadSchedule();
  });