# Team Citrix #31007 Official Website

The official, responsive static website for Robotics Team Citrix #31007. This site serves as a central hub for sharing information about the team, our current robot, the season schedule, and acknowledging our valued sponsors.

## 🚀 Features

* **Modern & Responsive Design:** Built with Tailwind CSS for a mobile-first, sleek, and modern aesthetic.
* **Informative Pages:** Dedicated sections for the Home, Robot Overview, Season Schedule, Sponsors, and Team Members.
* **Smooth UI:** Implements custom JavaScript for smooth scroll animations (`.reveal` class) to enhance the user experience.
* **Dynamic Team Section:** Uses JavaScript to render team member cards dynamically on `teamembers.html`.
* **Custom Branding:** Includes a custom color palette defined in the Tailwind configuration to match team branding (a "Citrix" light blue/cyan accent).

## 🛠️ Tech Stack

* **HTML5**
* **Tailwind CSS** (via CDN with custom configuration)
* **Vanilla JavaScript**
* **Font Awesome** (for icons)
* **Google Fonts** (Inter for body, Orbitron for tech-themed headers)

## 📋 File Structure

The project is structured as a collection of static HTML pages:

. ├── index.html # The main homepage. ├── robot.html # Detailed overview and specifications of the robot. ├── schedule.html # List of upcoming and past events/competitions. ├── sponsors.html # Page acknowledging and thanking team sponsors. ├── teamembers.html # Page listing team members, roles, and descriptions. └── img/ (implied) # Directory for team logos, robot images, and member photos.


## 💻 Getting Started

This is a static website, requiring no server-side setup.

### Prerequisites

You need a modern web browser to view the site.

### Installation & Usage

1.  **Clone the repository** (if hosted on a remote server):
    ```bash
    git clone [your-repository-url]
    cd [your-project-folder]
    ```
2.  **Run Locally:**
    Simply open any of the `.html` files (e.g., `index.html`) in your web browser.

## 🎨 Customization

The site uses a custom Tailwind CSS configuration defined within each HTML file. You can easily adjust the primary team colors:

```html
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    citrix: {
                        dark: '#0f172a',
                        light: '#1e293b',
                        accent: '#38bdf8', // Light blue/cyan (Primary Team Color)
                        hover: '#0ea5e9'
                    }
                },
                // ... font configuration
            }
        }
    }
</script>
Modify the hex codes under the citrix object to change the site's color scheme across all pages.

📄 License
© 2025 Team Citrix #31007. All rights reserved. (As per the project's footer.)