// Schedule Database Management
let schedules = [];
let currentFilter = 'all';

/**
 * Load schedules from JSON file
 */
async function loadSchedules() {
    try {
        const response = await fetch('./json/list.json');
        if (!response.ok) throw new Error('Failed to load schedules');
        schedules = (await response.json()).schedules;
        renderSchedules();
    } catch (error) {
        console.error('Error loading schedules:', error);
        showEmptyState();
    }
}

/**
 * Render schedules based on current filter
 */
function renderSchedules() {
    const container = document.getElementById('scheduleContainer');
    const emptyState = document.getElementById('emptyState');

    // 1. Filter schedules based on current selection
    let filteredSchedules = schedules.filter(schedule => {
        if (currentFilter === 'all') return true;
        return schedule.status === currentFilter;
    });

    // 2. Sort: Move 'current' to the top if we are viewing 'all'
    if (currentFilter === 'all') {
        filteredSchedules.sort((a, b) => {
            if (a.status === 'current' && b.status !== 'current') return -1;
            if (a.status !== 'current' && b.status === 'current') return 1;
            return 0; // Keep original order for same-status items
        });
    }

    if (filteredSchedules.length === 0) {
        container.innerHTML = '';
        showEmptyState();
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = filteredSchedules.map(schedule => createScheduleCard(schedule)).join('');

    // Add reveal animation
    document.querySelectorAll('.schedule-card').forEach(card => {
        card.classList.add('reveal');
    });
}

/**
 * Create HTML card for a schedule
 */
/**
 * Create HTML card for a schedule
 */
function createScheduleCard(schedule) {
    // Logic for Type: Season vs Offseason
    const typeDisplay = schedule.type === 'offseason' ? 'Offseason' : 'Season';

    const statusBadge = schedule.status === 'current' 
        ? '<span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 border border-green-500/50 text-green-400">CURRENT</span>'
        : '<span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-500/20 border border-gray-500/50 text-gray-400">ARCHIVE</span>';

    const formattedDate = new Date(schedule.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const downloadLink = schedule.link !== '#' 
        ? `<a href="${schedule.link}" download class="inline-flex items-center gap-2 px-4 py-2 bg-citrix-accent text-citrix-dark font-semibold rounded-lg hover:bg-citrix-hover transition-colors">
             <i class="fas fa-download"></i> Download PDF
           </a>`
        : `<button class="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-gray-300 font-semibold rounded-lg cursor-not-allowed" disabled>
             <i class="fas fa-file"></i> Not Available
           </button>`;

    return `
        <div class="schedule-card bg-gradient-to-br from-citrix-light to-citrix-dark border border-gray-700 rounded-xl p-6 hover:border-citrix-accent transition-all duration-300 shadow-lg hover:shadow-citrix-accent/20">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-2xl font-bold tech-font mb-2">${schedule.name}</h3>
                    <p class="text-gray-400 text-sm">Type: ${typeDisplay}</p>
                </div>
                ${statusBadge}
            </div>

            <p class="text-gray-300 mb-4">${schedule.description}</p>

            <div class="flex items-center gap-2 text-gray-400 text-sm mb-6">
                <i class="fas fa-calendar-alt"></i>
                <span>${formattedDate}</span>
            </div>

            <div class="flex gap-3">
                ${downloadLink}
                <button class="inline-flex items-center gap-2 px-4 py-2 border border-citrix-accent text-citrix-accent font-semibold rounded-lg hover:bg-citrix-accent/10 transition-colors schedule-view-btn" data-schedule-id="${schedule.id}">
                    <i class="fas fa-folder-open"></i> View
                </button>
            </div>
        </div>
    `;
}

/**
 * Show empty state message
 */
function showEmptyState() {
    const emptyState = document.getElementById('emptyState');
    emptyState.classList.remove('hidden');
}

/**
 * Filter schedules by category
 */
document.getElementById('filterAll')?.addEventListener('click', function() {
    currentFilter = 'all';
    updateFilterButtons(this);
    renderSchedules();
});

document.getElementById('filterCurrent')?.addEventListener('click', function() {
    currentFilter = 'current';
    updateFilterButtons(this);
    renderSchedules();
});

document.getElementById('filterArchive')?.addEventListener('click', function() {
    currentFilter = 'archive';
    updateFilterButtons(this);
    renderSchedules();
});

/**
 * Update filter button styles
 */
function updateFilterButtons(activeButton) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-citrix-accent', 'text-citrix-dark');
        btn.classList.add('border', 'border-citrix-accent', 'text-citrix-accent', 'hover:bg-citrix-accent/10');
    });
    activeButton.classList.add('active', 'bg-citrix-accent', 'text-citrix-dark');
    activeButton.classList.remove('border', 'border-citrix-accent', 'text-citrix-accent', 'hover:bg-citrix-accent/10');
}

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    loadSchedules();
});
