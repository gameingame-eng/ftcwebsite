<?php
// Configuration & Data
$team_name = "TEAM CITRIX";
$team_number = "#31007";
$season_name = "FIRST Tech Challenge DECODE";
$current_page = "aboutftc.php";

// Navigation Menu Items
$nav_items = [
    "Home" => "index.php",
    "Team Members" => "teamembers.php",
    "Robot" => "robot.php",
    "Sponsors" => "sponsors.php",
    "Schedule" => "schedule.php"
];
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About FTC DECODE | <?php echo "$team_name $team_number"; ?></title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        citrix: {
                            dark: '#0f172a',
                            light: '#1e293b',
                            accent: '#38bdf8',
                            hover: '#0ea5e9'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        tech: ['Orbitron', 'sans-serif']
                    }
                }
            }
        }
    </script>
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Orbitron:wght@500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/aboutftc.css">
    <link rel="icon" type="image/png" href="img/logo.png">
</head>
<body class="bg-citrix-dark text-white overflow-x-hidden">

    <nav class="fixed w-full z-50 bg-citrix-dark/90 backdrop-blur-md border-b border-gray-800 transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <div class="flex-shrink-0 flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                        <img src="img/logo.png" alt="Team Citrix logo">
                    </div>
                    <span class="tech-font text-xl md:text-2xl font-bold tracking-wider text-glow-blue">
                        <?php echo $team_name; ?><span class="text-citrix-accent"> <?php echo $team_number; ?></span>
                    </span>
                </div>
                
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <?php foreach ($nav_items as $name => $url): ?>
                            <a href="<?php echo $url; ?>" class="nav-link-glow px-3 py-2 rounded-md hover:text-citrix-accent transition-colors text-sm font-medium">
                                <?php echo $name; ?>
                            </a>
                        <?php endforeach; ?>
                        
                        <a href="sponsors.php#contact" class="nav-link-glow px-3 py-2 rounded-md bg-citrix-accent text-citrix-dark hover:bg-citrix-hover transition-colors px-4 py-2 rounded-full text-sm font-bold">Contact Us</a>
                        
                        <div class="relative group">
                            <button class="nav-link-glow text-citrix-accent bg-citrix-light px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                More <i class="fas fa-chevron-right ml-1 transition-transform group-hover:rotate-90"></i>
                            </button>
                            <div class="absolute left-0 mt-2 w-48 bg-citrix-light rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <a href="aboutftc.php" class="block px-4 py-2 text-sm text-citrix-accent bg-citrix-dark">About FTC</a>
                                <a href="yt.php" class="block px-4 py-2 text-sm text-gray-300 hover:text-citrix-accent hover:bg-citrix-dark">YouTube Channel</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="md:hidden">
                    <button id="mobile-menu-btn" class="text-gray-300 hover:text-white p-2">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="mobile-menu" class="md:hidden hidden bg-citrix-light border-b border-gray-700 absolute w-full">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                <?php foreach ($nav_items as $name => $url): ?>
                    <a href="<?php echo $url; ?>" class="hover:text-citrix-accent transition-colors px-3 py-2 rounded-md text-sm font-medium"><?php echo $name; ?></a>
                <?php endforeach; ?>
                <a href="aboutftc.php" class="text-citrix-accent bg-citrix-light px-3 py-2 rounded-md text-sm font-medium">About FTC</a>
            </div>
        </div>
    </nav>

    <header class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div class="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
            <div class="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div class="absolute top-20 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div class="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span class="reveal inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-6"><?php echo $season_name; ?></span>
            <h1 class="reveal text-5xl md:text-7xl font-black tech-font mb-6 tracking-tight">
                GAME <br><span class="text-gradient">OVERVIEW</span>
            </h1>
            <p class="reveal mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
                Discover the exciting world of <?php echo $season_name; ?>, the 2025-2026 FIRST Tech Challenge season.
            </p>
        </div>
    </header>

    <section id="ftcrules" class="py-20 bg-citrix-light/10 border-t border-gray-800/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 reveal">
                <h2 class="section-header text-3xl md:text-4xl font-bold tech-font text-white">What is FTC DECODE?</h2>
                <p class="text-gray-400 max-w-3xl mx-auto text-lg mt-6">
                    FTC DECODE is the official game for the 2025-2026 FIRST Tech Challenge season. Teams compete to decode messages, collect samples, and score points in an exciting robotics competition.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="bg-citrix-light/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-citrix-accent/50 transition-all duration-300 card-hover reveal">
                    <div class="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                        <i class="fa-solid fa-robot text-2xl text-blue-400"></i>
                    </div>
                    <h3 class="text-xl font-bold tech-font mb-4 text-white">Auto</h3>
                    <p class="text-gray-400 leading-relaxed">The first 30 seconds of the match is the Autonomous period, where robots operate on pre-programmed instructions.</p>
                </div>

                <div class="bg-citrix-light/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-citrix-accent/50 transition-all duration-300 card-hover reveal" style="transition-delay: 100ms;">
                    <div class="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                        <i class="fa-solid fa-gamepad text-2xl text-cyan-400"></i>
                    </div>
                    <h3 class="text-xl font-bold tech-font mb-4 text-white">TeleOp</h3>
                    <p class="text-gray-400 leading-relaxed">The last 2 minutes is the TeleOp period, where drivers control their robots to score points.</p>
                </div>

                <div id="endgame-card" class="bg-citrix-light/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-citrix-accent/50 transition-all duration-300 card-hover reveal" style="transition-delay: 200ms;">
                    <div class="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                        <i class="fa-solid fa-stopwatch-20 text-2xl text-orange-400"></i>
                    </div>
                    <h3 class="text-xl font-bold tech-font mb-4 text-white">Endgame</h3>
                    <p class="text-gray-400 leading-relaxed">The final 20 seconds is Endgame, where teams race for bonus points and Ranking Points!</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 reveal">
                <h2 class="section-header text-3xl md:text-4xl font-bold tech-font text-white">Game Elements & Scoring</h2>
            </div>

            <div class="space-y-12">
                <div class="bg-citrix-light/20 p-8 rounded-2xl border border-gray-700 reveal">
                    <h3 class="text-2xl font-bold tech-font mb-6 text-citrix-accent">Field Layout</h3>
                    
                    <div class="bg-gray-800 rounded-lg p-4 text-center text-gray-500 max-w-md mx-auto mt-4">
                        <img src="img/FIRST/field.png" alt="Field for FTC DECODE game" class="w-full h-auto">
                        <p class="text-xs mt-2">Sourced from FTC competition manual</p>
                    </div>
                </div>

                <div class="bg-citrix-light/20 p-8 rounded-2xl border border-gray-700 reveal">
                    <h3 class="text-2xl font-bold tech-font mb-6 text-citrix-accent">Scoring Objectives</h3>
                    <ul class="text-gray-400 leading-relaxed space-y-2">
                        <li>• Autonomous Navigation: Points for moving to specific locations</li>
                        <li>• Sample Collection: Points for collecting and depositing game pieces</li>
                        <li>• Message Decoding: Bonus points for completing decoding challenges</li>
                        <li>• Parking: Endgame points for robot positioning</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-black py-12 border-t border-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center reveal">
                <div class="mb-6 md:mb-0 text-center md:text-left">
                    <div class="flex items-center gap-2 justify-center md:justify-start mb-2">
                         <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-xs font-bold"><img src="img/logo.png" alt="C"></div>
                         <span class="tech-font text-xl font-bold text-glow-blue"><?php echo $team_name; ?></span>
                    </div>
                    <p class="text-gray-500 text-sm">&copy; <?php echo date("Y"); ?> Team Citrix. Inspiring the next generation.</p>
                </div>
                <div class="flex space-x-6">
                    <a href="https://www.youtube.com/@TeamCitrix" target="_blank" class="text-gray-400 hover:text-red-500 transition-colors text-2xl"><i class="fab fa-youtube"></i></a>
                    <a href="mailto:teamcitrix31007@gmail.com" class="text-gray-400 hover:text-blue-400 transition-colors text-2xl"><i class="fas fa-envelope"></i></a>
                    <a href="https://www.instagram.com/teamcitrix31007/" target="_blank" class="text-gray-400 hover:text-pink-500 transition-colors text-2xl"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <script src="js/aboutftc.js"></script>
    <script src="js/glow.js" defer></script>
</body>
</html>