// Load and render navigation from JSON
async function loadNavigation() {
  try {
    const response = await fetch('json/head.json');
    const navData = await response.json();
    
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Build desktop menu HTML
    let desktopMenuHTML = '<div class="ml-10 flex items-baseline space-x-8">';
    
    navData.navItems.forEach(item => {
      const isDropdown = item.type === 'dropdown';
      
      // For dropdowns, check if any child is the current page
      let isCurrentPage = false;
      if (isDropdown) {
        isCurrentPage = item.children.some(child => currentPage.includes(child.href.split('/').pop()));
      } else {
        isCurrentPage = item.href && currentPage.includes(item.href.split('/').pop());
      }
      
      if (isDropdown) {
        desktopMenuHTML += buildDropdownMenu(item, isCurrentPage);
      } else {
        const activeClass = isCurrentPage ? 'text-citrix-accent bg-citrix-light' : 'hover:text-citrix-accent';
        desktopMenuHTML += `
          <a href="${item.href}" class="nav-link-glow px-3 py-2 rounded-md ${activeClass} transition-colors px-3 py-2 rounded-md text-sm font-medium">${item.label}</a>
        `;
      }
    });
    
    // Add Contact Us button
    desktopMenuHTML += `
      <a href="${navData.ctaButton.href}" class="nav-link-glow px-3 py-2 rounded-md bg-citrix-accent text-citrix-dark hover:bg-citrix-hover transition-colors px-4 py-2 rounded-full text-sm font-bold">${navData.ctaButton.label}</a>
    `;
    
    desktopMenuHTML += '</div>';
    
    // Build mobile menu HTML
    let mobileMenuHTML = '<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">';
    
    navData.navItems.forEach(item => {
      const isDropdown = item.type === 'dropdown';
      
      // For dropdowns, check if any child is the current page
      let isCurrentPage = false;
      if (isDropdown) {
        isCurrentPage = item.children.some(child => currentPage.includes(child.href.split('/').pop()));
      } else {
        isCurrentPage = item.href && currentPage.includes(item.href.split('/').pop());
      }
      
      if (isDropdown) {
        mobileMenuHTML += buildMobileDropdownMenu(item, isCurrentPage);
      } else {
        const activeClass = isCurrentPage ? 'text-citrix-accent bg-citrix-light' : 'hover:text-citrix-accent';
        mobileMenuHTML += `
          <a href="${item.href}" class="${activeClass} transition-colors px-3 py-2 rounded-md text-sm font-medium">${item.label}</a>
        `;
      }
    });
    
    // Add Contact Us button
    mobileMenuHTML += `
      <a href="${navData.ctaButton.href}" class="bg-citrix-accent text-citrix-dark hover:bg-citrix-hover transition-colors px-4 py-2 rounded-full text-sm font-bold">${navData.ctaButton.label}</a>
    `;
    
    mobileMenuHTML += '</div>';
    
    // Insert into page
    const desktopMenuElement = document.querySelector('.desktop-menu-placeholder');
    const mobileMenuElement = document.querySelector('.mobile-menu-placeholder');
    
    if (desktopMenuElement) desktopMenuElement.innerHTML = desktopMenuHTML;
    if (mobileMenuElement) mobileMenuElement.innerHTML = mobileMenuHTML;
    
  } catch (error) {
    console.error("Error loading navigation:", error);
  }
}

// Helper function to build dropdown menu for desktop
function buildDropdownMenu(item, isActive) {
  let html = `
    <div class="relative group">
      <button class="nav-link-glow px-3 py-2 rounded-md ${isActive ? 'text-citrix-accent bg-citrix-light' : 'hover:text-citrix-accent'} transition-colors text-sm font-medium flex items-center">
        ${item.label} <i class="fas fa-chevron-down ml-1 transition-transform group-hover:rotate-180"></i>
      </button>
      <div class="absolute left-0 mt-2 w-48 bg-citrix-light rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
  `;
  
  item.children.forEach(child => {
    const isChildActive = window.location.pathname.includes(child.href.split('/').pop());
    const childActiveClass = isChildActive ? 'text-citrix-accent bg-citrix-dark' : 'text-gray-300 hover:text-citrix-accent hover:bg-citrix-dark';
    html += `
      <a href="${child.href}" class="block px-4 py-2 text-sm ${childActiveClass}">${child.label}</a>
    `;
  });
  
  html += `
      </div>
    </div>
  `;
  
  return html;
}

// Helper function to build dropdown items for mobile
function buildMobileDropdownMenu(item, isActive) {
  let html = '';
  
  // In mobile, we show dropdown items as individual links
  item.children.forEach(child => {
    const isChildActive = window.location.pathname.includes(child.href.split('/').pop());
    const childActiveClass = isChildActive ? 'text-citrix-accent bg-citrix-light' : 'hover:text-citrix-accent';
    html += `
      <a href="${child.href}" class="${childActiveClass} transition-colors px-3 py-2 rounded-md text-sm font-medium">${child.label}</a>
    `;
  });
  
  return html;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', loadNavigation);
