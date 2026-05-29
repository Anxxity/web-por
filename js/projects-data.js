const featuredProjectIds = [1, 2, 4];

const fivemProjects = [
  {
      id: 1,
      title: "RM Pause Menu",
      description: "Custom pause menu UI for ESX, QBCore, and QBOX with player stats, settings, and smooth NUI transitions.",
      image: "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/pausemenu.png",
      technologies: ["Lua", "NUI", "JavaScript"],
      frameworks: ["ESX", "QBCore", "QBOX"],
      version: "2.1.0",
      features: [
          "Minimal pause menu with job, cash, and bank",
          "Smooth open/close animations",
          "Fully themeable via config",
          "Low idle resmon footprint"
      ],
      github: "",
      demo: "https://youtu.be/Sp3mmYRLH04",
      category: "ui",
      featured: true,
      problem: "Default pause menu looked outdated and broke immersion on roleplay servers.",
      solution: "Built a fully custom NUI pause menu with animated panels and framework-aware player data.",
      result: "Servers report stronger brand identity and faster player navigation to settings.",
      challenges: "Keeping NUI responsive while syncing live economy data from three frameworks.",
      performance: "Sub-0.02ms idle; UI assets loaded once on resource start.",
      gallery: [
          "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/pausemenu.png"
      ]
  },

  {
      id: 2,
      title: "rm_multicharacter",
      description: "Redesigned multicharacter flow with camera transitions, character previews, and Qbox-ready configuration.",
      image: "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/ChatGPTImageApr15202602_35_55PM.png",
      technologies: ["Lua", "NUI", "JavaScript"],
      frameworks: ["QBOX", "QBCore"],
      version: "1.4.0",
      features: [
          "Animated character carousel",
          "Per-slot camera and lighting",
          "Configurable layout JSON",
          "Hover-driven character details"
      ],
      github: "",
      demo: "https://youtu.be/oZZ0dTBhb2E",
      category: "ui",
      featured: true,
      problem: "Stock multicharacter UI felt flat and slowed down new player onboarding.",
      solution: "Rebuilt selection as a cinematic NUI with staged cameras and instant slot switching.",
      result: "Cleaner first-login flow and higher perceived server quality.",
      challenges: "Synchronizing ped previews with async character data without frame drops.",
      performance: "Camera blends cached; NUI updates debounced to 60fps cap.",
      gallery: [
          "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/ChatGPTImageApr15202602_35_55PM.png"
      ]
  },

  {
      id: 3,
      title: "rm_radiolist",
      description: "Movable radio list UI with channel labels, talking indicators, and RP name display.",
      image: "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/ChatGPTImageApr15202602_22_51PM.png",
      technologies: ["Lua", "NUI", "JavaScript"],
      frameworks: ["Standalone"],
      version: "1.0.2",
      features: [
          "Drag-and-drop radio panel",
          "Per-player talk highlights",
          "Custom channel naming",
          "RP name from config"
      ],
      github: "https://github.com/Anxxity/rm_radiolist",
      demo: "https://youtu.be/DnbDkBv0urY",
      category: "experimental",
      problem: "Legacy radio list was static and hard to read during busy comms.",
      solution: "Refreshed UI with movable window and color-coded active speakers.",
      result: "Faster callouts for staff and gang radio channels.",
      challenges: "Matching voice activity events to the correct UI row in real time.",
      performance: "DOM diffing on talk events only; no full re-render per frame.",
      gallery: [
          "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/ChatGPTImageApr15202602_22_51PM.png"
      ]
  },

  {
      id: 4,
      title: "PvP System",
      description: "End-to-end PvP lobby: create rooms, pick maps, choose loadouts, and jump into matches.",
      image: "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/ChatGPTImageApr16202612_54_47PM.png",
      technologies: ["Lua", "oxmysql", "NUI"],
      frameworks: ["ESX", "Standalone"],
      version: "3.0.0",
      features: [
          "Lobby browser with live slots",
          "Map and weapon selection",
          "Match state sync",
          "Admin kick and lock tools"
      ],
      github: "",
      demo: "https://youtu.be/ksKkO0hUC3c",
      category: "pvp",
      featured: true,
      problem: "Ad-hoc PvP events required manual teleporting and weapon giving.",
      solution: "Shipped a self-serve lobby NUI wired to oxmysql match records.",
      result: "Staff run PvP nights with under 2 minutes setup per event.",
      challenges: "Race conditions when multiple players join the last lobby slot.",
      performance: "DB writes batched; UI polls every 2s instead of per-frame.",
      gallery: [
          "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/ChatGPTImageApr16202612_54_47PM.png"
      ]
  },

  {
      id: 5,
      title: "PvP Leaderboard",
      description: "Live K/D leaderboard with top 10 board, match history, and oxmysql persistence.",
      image: "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/leaderboard_v2.png",
      technologies: ["Lua", "oxmysql", "Qbox", "NUI"],
      featured: false,
      frameworks: ["QBOX", "oxmysql"],
      version: "2.2.0",
      features: [
          "Real-time K/D tracking",
          "Top 10 leaderboard panel",
          "Per-player match history",
          "Export-friendly stats API"
      ],
      github: "",
      demo: "https://www.youtube.com/watch?v=zPHSEM_edBI",
      category: "pvp",
      problem: "No single view of seasonal PvP performance for players.",
      solution: "Responsive leaderboard NUI backed by indexed oxmysql tables.",
      result: "Players revisit stats after matches; staff use it for rewards.",
      challenges: "Indexing queries for 500+ active fighters without server hitch.",
      performance: "Leaderboard cache refreshes every 5s; writes async.",
      gallery: [
          "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/leaderboard_v2.png"
      ]
  },

  {
      id: 6,
      title: "PvP Profile System",
      description: "Per-player PvP profile with weapon stats, K/D breakdown, and top-player ped showcase.",
      image: "https://github.com/Anxxity/web-por/blob/main/asses/pvpprfile.png?raw=true",
      technologies: ["Lua", "MySQL", "NUI", "ESX"],
      featured: false,
      frameworks: ["ESX"],
      version: "1.1.0",
      features: [
          "Weapon-specific stats",
          "Profile NUI with ped preview",
          "Seasonal rank badges",
          "Integration hooks for PvP System"
      ],
      github: "",
      demo: "",
      category: "pvp",
      problem: "Players could not inspect detailed combat history in-game.",
      solution: "Profile NUI with aggregated weapon and match data from MySQL.",
      result: "Deeper engagement loop tied to the PvP leaderboard.",
      challenges: "Rendering top-player peds without blocking the main thread.",
      performance: "Ped spawn deferred; stats fetched in one query.",
      gallery: [
          "https://github.com/Anxxity/web-por/blob/main/asses/pvpprfile.png?raw=true"
      ]
  },

  {
      id: 7,
      title: "Safezone Creator",
      description: "In-game safezone editor with PolyZone, job rules, weapon whitelist, and JSON/SQL export.",
      image: "https://github.com/Anxxity/web-por/blob/main/asses/safezonecreator.png?raw=true",
      technologies: ["Lua", "PolyZone", "ox_lib", "NUI"],
      featured: false,
      frameworks: ["ESX", "QBCore"],
      version: "1.3.0",
      features: [
          "Draw zones in-world",
          "Job and weapon restrictions",
          "Enter/exit script events",
          "JSON or SQL persistence"
      ],
      github: "",
      demo: "",
      category: "framework",
      problem: "Safezones were hard-coded and required dev restarts to tweak.",
      solution: "Live creator UI with PolyZone export and framework-aware rules.",
      result: "Admins publish new zones in minutes without downtime.",
      challenges: "Validating overlapping zones and edge collisions.",
      performance: "Zones loaded once; point-in-poly checks optimized.",
      gallery: [
          "https://github.com/Anxxity/web-por/blob/main/asses/safezonecreator.png?raw=true"
      ]
  }

];



const otherProjects = [
      {
        id: 1,
        title: "cheap deck",
        description: "A cheap alternative for stream deck . Cheap deck",
        image: "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/ChatGPTImageApr16202603_38_37PM.png",
        technologies: [ "Arduino Uno", "tft touch screen"],
        featured: true,
        features: [
           "Touchscreen Interface",
           "Keyboard Shortcuts",
           "Fully Customizable"
        ],
        github: "https://github.com/Anxxity/cheap-deck",
        demo: "https://youtube.com/shorts/voRVJhqc4ek",
        category: "Raspberry"
     },
     {
        id: 2,
        title: "Eye Tracking Wheelchair",
        description: "Automated wheelchair controlled via eye-tracking using Raspberry Pi and Arduino.",
        image: "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/wc.png",
        technologies: ["Python", "Raspberry Pi", "Arduino", "GazeTracking Library", "MY1016Z2 Motor", "BTS7960 Driver"],
        featured: true,
        features: [
            "Real-time eye tracking",
            "USB communication between Pi and Arduino",
            "Motor control for mobility"
        ],
        github: "#",
        demo: "#",
        category: "Robotics"
    },
    {
        id: 3,
        title: "Aimee - reception Assistant Robot",
        description: "AI-powered reception assistant running on Raspberry Pi with voice and display support.",
        image: "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/aimee.png",
        technologies: ["Python", "Raspberry Pi", "Google Generative AI"],
        featured: true,
        features: [
            "Voice interaction",
            "reception",
            "Step-by-step guidance"
        ],
        github: "#",
        demo: "#",
        category: "Robotics"
    },
    {
        id: 4,
        title: "Fire Extinguisher Bot",
        description: "Arduino-based robot that detects and extinguishes fire using sensors and 3D printed components.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Fire+Extinguisher+Bot",
        technologies: ["Arduino Uno", "ESP", "Temperature & Smoke Sensors", "3D Printing"],
        featured: false,
        features: [
            "Real-time fire detection",
            "Automatic extinguishing",
            "Remote monitoring"
        ],
        github: "#",
        demo: "#",
        category: "Arduino"
    },
    {
        id: 5,
        title: "TRobot",
        description: "Weather-sensing robot using ESP32 for temperature, humidity, and thunderstorm detection.",
        image: "https://r2.fivemanage.com/yo0lOUTJkIrY6yOaar2IT/student-innovations2.png",
        technologies: ["ESP32", "Sensors", "Arduino", "IoT"],
        featured: false,
        features: [
            "Detects temperature, humidity, storms",
            "Sends real-time alerts",
            "Weather logging"
        ],
        github: "#",
        demo: "#",
        category: "Arduino"
    },
    
    {
        id: 6,
        title: "Home Automation System",
        description: "Arduino-based home automation using relays for controlling appliances.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Home+Automation",
        technologies: ["Arduino Uno", "Relays", "IoT"],
        featured: false,
        features: [
            "Control home appliances remotely",
            "Automation scheduling",
            "Integration with sensors"
        ],
        github: "#",
        demo: "#",
        category: "Arduino"
    },
    {
        id: 7,
        title: "Beach Cleaning Robot",
        description: "Autonomous beach cleaning robot with Pixhawk flight controller and Raspberry Pi mission planning.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Beach+Cleaning+Robot",
        technologies: ["Raspberry Pi", "Pixhawk", "ArduPilot", "Sensors", "Motors"],
        featured: false,
        features: [
            "Mission planning with Pixhawk",
            "Autonomous navigation",
            "Debris collection system"
        ],
        github: "#",
        demo: "#",
        category: "Raspberry"
    },
    {
        id: 8,
        title: "Track Rover",
        description: "Tracked rover controlled via Raspberry Pi and Arduino for mission-based tasks.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Track+Rover",
        technologies: ["Raspberry Pi", "Arduino Uno", "Motors", "SpeedyBee F405", "Mission Planner"],
        featured: false,
        features: [
            "Track-based locomotion",
            "Remote mission control",
            "Sensor integration"
        ],
        github: "#",
        demo: "#",
        category: "Raspberry"
    }     
];

const skills = [
    { name: "Robotics & Automation", icon: "fas fa-robot", level: 96 },
    { name: "Lua", icon: "fab fa-js-square", level: 95 },
    { name: "Web Development", icon: "fab fa-html5", level: 90 },
    { name: "Game Development", icon: "fas fa-gamepad", level: 90 },
    { name: "Python", icon: "fab fa-python", level: 85 },
    { name: "Server Management", icon: "fas fa-server", level: 85 },
    { name: "Database Design", icon: "fas fa-database", level: 80 },
];


const stats = [
    { number: "15+", label: "Projects" },
    { number: "3+", label: "Years Building" },
    { number: "100+", label: "UI Screens" }
];


const contactInfo = {
    email: "reminmohammed123@gmail.com",
    discord: "_remin_",
    github: "github.com/anxxity",
    socialLinks: {
        github: "https://github.com/anxxity",
        discord: "https://discord.gg/t4dZJ8bQFM",
        twitter: "https://twitter.com/",
        linkedin: "https://www.linkedin.com/in/remin-mohammed-062426197/"
    }
};


const personalInfo = {
    name: "Remin Mohammed",
    title: "FiveM Systems • UI • Robotics",
    bio: [
        "I build immersive FiveM systems, custom game interfaces, and robotics projects.",
        "Focused on performance, clean UI, and scalable architecture."
    ]
};

const tutorials = [
        {
          "id": 1,
          "title": "Complete FiveM Server Setup Guide for Windows",
          "description": "Comprehensive step-by-step guide to setting up a FiveM server on Windows 10/11 or Windows Server. Includes FXServer installation, port forwarding, txAdmin setup, and optimization tips.",
          "image": "https://imgs.search.brave.com/7q8Ob4JesIX3zmwAGhfbl03HcitHgi1yJh0nu--8hw8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQwLzIvZml2ZW0t/Z3RhLXYtbG9nby1w/bmdfc2Vla2xvZ28t/NDA0NTcyLnBuZw",
          "category": "fivem",
          "difficulty": "Beginner",
          "duration": "1-2 hours",
          "content": [
            {
              "heading": "System Requirements",
              "text": "Minimum requirements for Windows FiveM server:\n- Windows 10 (64-bit) or Windows Server 2016 or newer\n- 4GB RAM minimum (8GB+ recommended for 32+ players)\n- 10GB free disk space (more for resources and database)\n- Stable internet connection with 10Mbps+ upload speed\n- Administrator access to your PC\n- Visual C++ Redistributable 2019 or newer"
            },
            {
              "heading": "Step 1: Create Server Directory",
              "text": "Create a dedicated folder for your FiveM server:\n\n1. Open File Explorer and navigate to your C: drive\n2. Create a new folder called 'FXServer' (C:\\FXServer)\n3. This will be your main server directory where all files will be stored\n\nAvoid using folders with spaces or special characters in the path as this can cause issues with some resources."
            },
            {
              "heading": "Step 2: Download FXServer",
              "text": "Download the latest FiveM server files:\n\n1. Visit https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/\n2. Download the latest recommended build (look for green checkmark)\n3. Extract the downloaded ZIP file contents directly into C:\\FXServer\n4. You should now see FXServer.exe and other files in this folder\n\nDo not create a subfolder during extraction - files should be directly in C:\\FXServer."
            },
            {
              "heading": "Step 3: Generate License Key",
              "text": "Every FiveM server requires a unique license key:\n\n1. Go to https://keymaster.fivem.net\n2. Log in with your Cfx.re account (create one if needed)\n3. Click 'New Server' and enter your server's public IP address\n4. If hosting locally, you can use your local IP temporarily\n5. Copy the generated license key - you'll need this in the next step\n\nKeep your license key private and never share it publicly. Each key is linked to your IP address."
            },
            {
              "heading": "Step 4: Set Up Server Data Folder",
              "text": "Create the server data structure:\n\n1. Inside C:\\FXServer, create a new folder called 'server-data'\n2. Inside server-data, create a folder called 'resources'\n3. Download the default cfx-server-data from https://github.com/citizenfx/cfx-server-data\n4. Extract the resources from cfx-server-data into your resources folder\n\nYour structure should look like:\nC:\\FXServer\\\n  ├── FXServer.exe\n  ├── server-data\\\n      ├── resources\\\n      └── server.cfg (we'll create this next)"
            },
            {
              "heading": "Step 5: Create server.cfg Configuration",
              "text": "Create your server configuration file:\n\n1. Open Notepad or any text editor\n2. Create a new file and save it as 'server.cfg' in C:\\FXServer\\server-data\n3. Add the following basic configuration:\n\n```cfg\n# Server Identity\nsv_hostname \"My FiveM Server\"\nsv_maxclients 32\nsv_licenseKey \"YOUR_LICENSE_KEY_HERE\"\n\n# Steam Web API Key (optional but recommended)\nsteam_webApiKey \"none\"\n\n# Server Endpoints\nendpoint_add_tcp \"0.0.0.0:30120\"\nendpoint_add_udp \"0.0.0.0:30120\"\n\n# Default Resources\nensure mapmanager\nensure chat\nensure spawnmanager\nensure sessionmanager\nensure basic-gamemode\nensure hardcap\nensure rconlog\n\n# Admin Settings\nadd_ace group.admin command allow\nadd_ace group.admin command.quit deny\nadd_principal identifier.steam:YOUR_STEAM_HEX group.admin\n```\n\nReplace YOUR_LICENSE_KEY_HERE with your actual license key from Step 3."
            },
            {
              "heading": "Step 6: Configure Windows Firewall",
              "text": "Open the required ports in Windows Firewall:\n\n1. Open Windows Defender Firewall with Advanced Security\n2. Click 'Inbound Rules' → 'New Rule'\n3. Select 'Port' → Next\n4. Select 'TCP' and enter port '30120' → Next\n5. Select 'Allow the connection' → Next\n6. Check all profiles (Domain, Private, Public) → Next\n7. Name it 'FiveM Server TCP' → Finish\n8. Repeat steps 2-7 but select 'UDP' for protocol\n9. Also open port 40120 TCP for txAdmin (optional but recommended)\n\nIf you're behind a router, you'll also need to forward these ports in your router settings."
            },
            {
              "heading": "Step 7: Router Port Forwarding",
              "text": "Forward ports on your router (required for public servers):\n\n1. Find your router's IP address (usually 192.168.1.1 or 192.168.0.1)\n2. Log into your router admin panel via web browser\n3. Look for 'Port Forwarding' or 'Virtual Server' section\n4. Create new port forwarding rules:\n   - Port 30120 TCP → Your PC's local IP\n   - Port 30120 UDP → Your PC's local IP\n   - Port 40120 TCP → Your PC's local IP (for txAdmin)\n5. Save and apply the changes\n\nTo find your local IP: Open Command Prompt and type 'ipconfig', look for IPv4 Address."
            },
            {
              "heading": "Step 8: Start Your Server",
              "text": "Launch your FiveM server for the first time:\n\n1. Open Command Prompt as Administrator\n2. Navigate to your server directory:\n   cd C:\\FXServer\n3. Run the server with:\n   FXServer.exe +exec server-data/server.cfg\n4. Wait for all resources to load (this may take 1-2 minutes)\n5. Look for messages indicating successful startup\n\nIf everything is configured correctly, you should see:\n'Server started. Players can now join.' in the console.\n\nThe server console will remain open - do not close it while the server is running."
            },
            {
              "heading": "Step 9: Test Your Server Connection",
              "text": "Verify your server is accessible:\n\n1. Open FiveM client on your PC\n2. Press F8 to open console\n3. Type: connect localhost:30120\n4. If successful, you'll join your server\n5. To test external access, have a friend try connecting using your public IP\n\nYou can find your public IP by visiting https://whatismyipaddress.com\n\nFriends should connect using: connect YOUR_PUBLIC_IP:30120"
            },
            {
              "heading": "Step 10: Install txAdmin (Recommended)",
              "text": "txAdmin provides a web-based management panel:\n\n1. Stop your server if it's running\n2. Open Command Prompt as Administrator\n3. Navigate to C:\\FXServer\n4. Run: FXServer.exe +set serverProfile default +set txAdminPort 40120\n5. Follow the setup wizard in your browser at http://localhost:40120\n6. Create admin account and complete the setup\n7. Use txAdmin to manage your server going forward\n\ntxAdmin makes it much easier to manage resources, view logs, and restart your server."
            },
            {
              "heading": "Optional: Create a Startup Script",
              "text": "Create a batch file for easy server starting:\n\n1. Open Notepad\n2. Add the following:\n```batch\n@echo off\ncd C:\\FXServer\nFXServer.exe +exec server-data/server.cfg\npause\n```\n3. Save as 'start-server.bat' in C:\\FXServer\n4. Double-click this file to start your server anytime\n\nYou can also create a scheduled task to auto-start the server on Windows boot."
            },
            {
              "heading": "Performance Optimization Tips",
              "text": "Optimize your Windows FiveM server:\n\n- Set FXServer.exe to 'High Priority' in Task Manager\n- Disable Windows automatic updates during peak hours\n- Use an SSD for the server directory if possible\n- Keep Windows and drivers updated\n- Limit the number of running background applications\n- Monitor RAM usage and upgrade if consistently over 80%\n- Use a wired ethernet connection instead of WiFi\n- Consider using Windows Server OS for better stability\n- Regularly backup your server-data folder\n- Keep your server artifacts updated monthly"
            },
            {
              "heading": "Common Windows Issues and Fixes",
              "text": "Troubleshooting common problems:\n\n**Server won't start:**\n- Verify license key is correct\n- Check if ports 30120 are already in use\n- Run Command Prompt as Administrator\n- Install Visual C++ Redistributable\n\n**Players can't connect:**\n- Verify firewall rules are correctly configured\n- Check router port forwarding settings\n- Ensure ports are open using https://www.yougetsignal.com/tools/open-ports/\n- Confirm your public IP hasn't changed\n\n**Server crashes frequently:**\n- Check for conflicting resources\n- Review server console for error messages\n- Increase RAM allocation if needed\n- Update to latest server artifacts\n\n**High CPU/RAM usage:**\n- Remove unnecessary resources\n- Optimize poorly coded scripts\n- Consider upgrading hardware"
            },
            {
              "heading": "Security Best Practices",
              "text": "Keep your Windows server secure:\n\n- Never share your license key publicly\n- Use strong passwords for txAdmin and database\n- Keep Windows updated with latest security patches\n- Don't run the server with admin privileges unless necessary\n- Regularly backup your server and database\n- Use antivirus software and keep it updated\n- Only download resources from trusted sources\n- Review resource code before installing\n- Enable Windows Firewall\n- Use Steam Web API key for better player authentication\n- Implement anti-cheat resources\n- Monitor server logs regularly for suspicious activity"
            }
          ],
          "tags": ["FiveM", "Windows", "Server Setup", "FXServer", "txAdmin", "Port Forwarding", "Windows Server"]
        },
        {
          "id": 2,
          "title": "Complete FiveM Server Setup Guide for Linux (Ubuntu)",
          "description": "Professional guide for setting up a FiveM server on Linux Ubuntu 20.04/22.04. Covers installation, systemd service configuration, security hardening, and performance optimization.",
          "image": "https://imgs.search.brave.com/7q8Ob4JesIX3zmwAGhfbl03HcitHgi1yJh0nu--8hw8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQwLzIvZml2ZW0t/Z3RhLXYtbG9nby1w/bmdfc2Vla2xvZ28t/NDA0NTcyLnBuZw",
          "category": "fivem",
          "difficulty": "Intermediate",
          "duration": "2-3 hours",
          "content": [
            {
              "heading": "System Requirements and Prerequisites",
              "text": "Requirements for Linux FiveM server:\n- Ubuntu 20.04 LTS or 22.04 LTS (recommended)\n- Debian 10/11 also supported\n- 4GB RAM minimum (8GB+ recommended)\n- 20GB free disk space\n- Root or sudo access\n- Basic knowledge of Linux terminal commands\n- Stable internet with 10Mbps+ upload\n\nLinux offers better performance, stability, and resource efficiency compared to Windows servers."
            },
            {
              "heading": "Step 1: Update System and Install Dependencies",
              "text": "First, update your system and install required packages:\n\n```bash\n# Update package lists\nsudo apt update && sudo apt upgrade -y\n\n# Install required dependencies\nsudo apt install -y git curl wget xz-utils screen\n\n# Install additional useful tools\nsudo apt install -y htop nano ufw\n```\n\nThese tools will help with server management, file editing, and monitoring."
            },
            {
              "heading": "Step 2: Create Dedicated Server User",
              "text": "It's best practice to run the server under a dedicated user account:\n\n```bash\n# Create fivem user without home login\nsudo adduser --disabled-login --gecos \"\" fivem\n\n# Switch to fivem user\nsudo su - fivem\n\n# Create server directory\nmkdir -p /home/fivem/server\ncd /home/fivem/server\n```\n\nRunning the server as a non-root user improves security by limiting potential damage from exploits."
            },
            {
              "heading": "Step 3: Download and Extract FXServer",
              "text": "Download the latest Linux server artifacts:\n\n```bash\n# Download latest recommended build\nwget https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/$(curl -s https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/ | grep -oP '\\d{4,}-[a-f0-9]+' | head -1)/fx.tar.xz\n\n# Extract the archive\ntar xf fx.tar.xz\n\n# Remove the archive to save space\nrm fx.tar.xz\n\n# Verify extraction\nls -la\n```\n\nYou should see the 'run.sh' file and 'alpine' directory in your server folder."
            },
            {
              "heading": "Step 4: Generate License Key",
              "text": "Generate your FiveM license key:\n\n1. Visit https://keymaster.fivem.net in your browser\n2. Log in with your Cfx.re account\n3. Click 'New Server'\n4. Enter your server's public IP address\n   - Find it with: `curl ifconfig.me`\n5. Copy the generated license key\n\nSave this key securely - you'll need it in the configuration step."
            },
            {
              "heading": "Step 5: Set Up Server Data Structure",
              "text": "Create the necessary directory structure:\n\n```bash\n# Create server-data directory\nmkdir -p /home/fivem/server-data/resources\ncd /home/fivem/server-data\n\n# Download default cfx-server-data\ngit clone https://github.com/citizenfx/cfx-server-data.git temp-resources\n\n# Move resources to correct location\nmv temp-resources/resources/* resources/\nrm -rf temp-resources\n\n# Verify structure\nls -la resources/\n```\n\nYour directory structure should now include chat, mapmanager, spawnmanager, and other default resources."
            },
            {
              "heading": "Step 6: Create server.cfg Configuration",
              "text": "Create and configure your server.cfg file:\n\n```bash\n# Create server.cfg\nnano /home/fivem/server-data/server.cfg\n```\n\nAdd the following configuration:\n\n```cfg\n# Server Identity\nsv_hostname \"My Linux FiveM Server\"\nsv_maxclients 32\nsv_licenseKey \"YOUR_LICENSE_KEY_HERE\"\n\n# Binding\nendpoint_add_tcp \"0.0.0.0:30120\"\nendpoint_add_udp \"0.0.0.0:30120\"\n\n# Steam Web API (recommended)\nsteam_webApiKey \"none\"\n\n# Server Icon (optional)\n#load_server_icon myIcon.png\n\n# Default Resources\nensure mapmanager\nensure chat\nensure spawnmanager\nensure sessionmanager\nensure basic-gamemode\nensure hardcap\nensure rconlog\n\n# Admin Permissions\nadd_ace group.admin command allow\nadd_ace group.admin command.quit deny\nadd_principal identifier.steam:YOUR_STEAM_HEX group.admin\n\n# Server Variables\nsv_scriptHookAllowed 0\nsv_endpointprivacy true\nsv_enforceGameBuild 3258\n\n# OneSync Settings (optional)\n#onesync on\n```\n\nSave and exit: Press `CTRL+X`, then `Y`, then `Enter`\n\nReplace YOUR_LICENSE_KEY_HERE with your actual license key."
            },
            {
              "heading": "Step 7: Configure UFW Firewall",
              "text": "Set up firewall rules using UFW:\n\n```bash\n# Exit to your main user (not fivem user)\nexit\n\n# Enable UFW\nsudo ufw enable\n\n# Allow SSH (important - don't lock yourself out!)\nsudo ufw allow 22/tcp\n\n# Allow FiveM server ports\nsudo ufw allow 30120/tcp\nsudo ufw allow 30120/udp\n\n# Allow txAdmin (optional)\nsudo ufw allow 40120/tcp\n\n# Allow MySQL if needed\n# sudo ufw allow 3306/tcp\n\n# Check firewall status\nsudo ufw status verbose\n```\n\nIf you're using a cloud provider (AWS, DigitalOcean, etc.), you may also need to configure security groups or firewall rules in their control panel."
            },
            {
              "heading": "Step 8: Test Server Manually",
              "text": "Test your server before creating a service:\n\n```bash\n# Switch to fivem user\nsudo su - fivem\n\n# Navigate to server directory\ncd /home/fivem/server\n\n# Start the server\nbash run.sh +exec /home/fivem/server-data/server.cfg\n```\n\nWatch the console output for errors. If successful, you should see:\n- Resources loading\n- 'Server started. Players can now join.'\n\nPress `CTRL+C` to stop the server once you've verified it works.\n\nTest connection from FiveM client: `connect YOUR_SERVER_IP:30120`"
            },
            {
              "heading": "Step 9: Create Systemd Service",
              "text": "Create a systemd service for automatic startup and management:\n\n```bash\n# Exit to your main user\nexit\n\n# Create service file\nsudo nano /etc/systemd/system/fivem.service\n```\n\nAdd the following configuration:\n\n```ini\n[Unit]\nDescription=FiveM Server\nAfter=network.target\n\n[Service]\nType=simple\nUser=fivem\nWorkingDirectory=/home/fivem/server\nExecStart=/bin/bash /home/fivem/server/run.sh +exec /home/fivem/server-data/server.cfg\nRestart=on-failure\nRestartSec=10\nStandardOutput=append:/home/fivem/server/console.log\nStandardError=append:/home/fivem/server/error.log\n\n[Install]\nWantedBy=multi-user.target\n```\n\nSave and enable the service:\n\n```bash\n# Reload systemd\nsudo systemctl daemon-reload\n\n# Enable service to start on boot\nsudo systemctl enable fivem\n\n# Start the service\nsudo systemctl start fivem\n\n# Check status\nsudo systemctl status fivem\n```"
            },
            {
              "heading": "Step 10: Service Management Commands",
              "text": "Useful commands to manage your FiveM server:\n\n```bash\n# Start server\nsudo systemctl start fivem\n\n# Stop server\nsudo systemctl stop fivem\n\n# Restart server\nsudo systemctl restart fivem\n\n# Check server status\nsudo systemctl status fivem\n\n# View live console output\nsudo tail -f /home/fivem/server/console.log\n\n# View error logs\nsudo tail -f /home/fivem/server/error.log\n\n# Disable autostart\nsudo systemctl disable fivem\n\n# Enable autostart\nsudo systemctl enable fivem\n```\n\nThe server will now automatically start on system boot and restart on crashes."
            },
            {
              "heading": "Optional: Install and Configure txAdmin",
              "text": "Set up txAdmin for web-based management:\n\n```bash\n# Stop the current service\nsudo systemctl stop fivem\n\n# Switch to fivem user\nsudo su - fivem\ncd /home/fivem/server\n\n# Start server with txAdmin\nbash run.sh +set serverProfile default +set txAdminPort 40120\n```\n\nAccess txAdmin at: `http://YOUR_SERVER_IP:40120`\n\nFollow the web setup wizard:\n1. Create admin account\n2. Configure server settings\n3. Link your server\n4. Use txAdmin to manage the server going forward\n\nTo use txAdmin with systemd, modify the service file's ExecStart line:\n```ini\nExecStart=/bin/bash /home/fivem/server/run.sh +set serverProfile default +set txAdminPort 40120\n```"
            },
            {
              "heading": "Optional: Install Screen for Manual Management",
              "text": "Use screen to run server sessions that persist after logout:\n\n```bash\n# Start a new screen session\nsudo su - fivem\nscreen -S fivem\n\n# Inside screen, start server\ncd /home/fivem/server\nbash run.sh +exec /home/fivem/server-data/server.cfg\n\n# Detach from screen: CTRL+A then D\n\n# Reattach to screen session\nscreen -r fivem\n\n# List all screen sessions\nscreen -ls\n\n# Kill a screen session\nscreen -X -S fivem quit\n```\n\nScreen is useful for development and testing but systemd is better for production."
            },
            {
              "heading": "Performance Optimization for Linux",
              "text": "Optimize your Linux server for better performance:\n\n```bash\n# Increase file descriptor limits\nsudo nano /etc/security/limits.conf\n```\n\nAdd these lines:\n```\nfivem soft nofile 4096\nfivem hard nofile 8192\n```\n\n```bash\n# Optimize network settings\nsudo nano /etc/sysctl.conf\n```\n\nAdd:\n```\nnet.core.rmem_max = 134217728\nnet.core.wmem_max = 134217728\nnet.ipv4.tcp_rmem = 4096 87380 67108864\nnet.ipv4.tcp_wmem = 4096 65536 67108864\n```\n\nApply changes:\n```bash\nsudo sysctl -p\n```\n\nAdditional tips:\n- Use SSD storage for server files\n- Keep system updated regularly\n- Monitor with htop: `htop`\n- Set CPU governor to performance mode\n- Disable unnecessary services\n- Use a dedicated server IP if possible"
            },
            {
              "heading": "Security Hardening Best Practices",
              "text": "Secure your Linux FiveM server:\n\n**SSH Security:**\n```bash\n# Disable root login\nsudo nano /etc/ssh/sshd_config\n# Set: PermitRootLogin no\n\n# Use SSH keys instead of passwords\n# Change default SSH port (optional)\n\nsudo systemctl restart sshd\n```\n\n**Keep System Updated:**\n```bash\n# Set up automatic security updates\nsudo apt install unattended-upgrades\nsudo dpkg-reconfigure -plow unattended-upgrades\n```\n\n**Additional Security:**\n- Use fail2ban to prevent brute force attacks\n- Never share your license key\n- Use strong passwords for all services\n- Regularly backup server data\n- Monitor logs for suspicious activity\n- Only install trusted resources\n- Review resource code before installation\n- Keep FXServer artifacts updated\n- Use private repositories for custom resources\n- Implement rate limiting on your server"
            },
            {
              "heading": "Backup and Restore Procedures",
              "text": "Set up automated backups:\n\n```bash\n# Create backup script\nsudo nano /home/fivem/backup.sh\n```\n\nAdd:\n```bash\n#!/bin/bash\nBACKUP_DIR=\"/home/fivem/backups\"\nDATE=$(date +%Y%m%d_%H%M%S)\n\nmkdir -p $BACKUP_DIR\ntar -czf $BACKUP_DIR/server-backup-$DATE.tar.gz /home/fivem/server-data\n\n# Keep only last 7 backups\nfind $BACKUP_DIR -name \"server-backup-*.tar.gz\" -mtime +7 -delete\n```\n\nMake executable and schedule:\n```bash\nchmod +x /home/fivem/backup.sh\n\n# Add to crontab for daily backups at 3 AM\nsudo crontab -e -u fivem\n# Add: 0 3 * * * /home/fivem/backup.sh\n```\n\n**Restore from backup:**\n```bash\nsudo systemctl stop fivem\ntar -xzf /home/fivem/backups/server-backup-YYYYMMDD_HHMMSS.tar.gz -C /\nsudo systemctl start fivem\n```"
            },
            {
              "heading": "Monitoring and Troubleshooting",
              "text": "Monitor and debug your Linux server:\n\n**Check Resource Usage:**\n```bash\n# Real-time monitoring\nhtop\n\n# Disk usage\ndf -h\n\n# Check specific process\ntop -p $(pgrep -f FXServer)\n```\n\n**View Logs:**\n```bash\n# Server console logs\nsudo tail -f /home/fivem/server/console.log\n\n# Error logs\nsudo tail -f /home/fivem/server/error.log\n\n# System logs\nsudo journalctl -u fivem -f\n\n# Last 100 lines\nsudo journalctl -u fivem -n 100\n```\n\n**Common Issues:**\n\n*Server won't start:*\n- Check license key validity\n- Verify file permissions: `ls -la /home/fivem/server`\n- Check if port is already in use: `sudo netstat -tulpn | grep 30120`\n\n*Poor performance:*\n- Check RAM usage: `free -h`\n- Monitor CPU: `top`\n- Review resource scripts for inefficiencies\n- Consider upgrading server specs\n\n*Connection issues:*\n- Verify firewall rules: `sudo ufw status`\n- Check if service is running: `sudo systemctl status fivem`\n- Test port accessibility: `telnet YOUR_IP 30120`"
            },
            {
              "heading": "Updating FXServer Artifacts",
              "text": "Keep your server updated with the latest FXServer build:\n\n```bash\n# Stop the server\nsudo systemctl stop fivem\n\n# Switch to fivem user\nsudo su - fivem\ncd /home/fivem/server\n\n# Backup current installation\ncp -r /home/fivem/server /home/fivem/server-backup-$(date +%Y%m%d)\n\n# Download latest build\nwget https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/$(curl -s https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/ | grep -oP '\\d{4,}-[a-f0-9]+' | head -1)/fx.tar.xz\n\n# Extract (overwrites old files)\ntar xf fx.tar.xz\nrm fx.tar.xz\n\n# Exit and restart service\nexit\nsudo systemctl start fivem\n\n# Verify update\nsudo systemctl status fivem\n```\n\nCheck for updates monthly or when important security patches are released."
            }
          ],
          "tags": ["FiveM", "Linux", "Ubuntu", "Server Setup", "FXServer", "Systemd", "Security", "VPS", "Dedicated Server"]
        },
        {
          "id": 3,
          "title": "ROS 2 (Humble) Python Node – Quickstart Guide",
          "description": "Beginner-friendly guide to setting up a ROS 2 Humble workspace and creating a basic Python node using rclpy. Covers workspace creation, package setup, node structure, entry points, and automatic environment sourcing.",
          "image": "https://raw.githubusercontent.com/ros-infrastructure/artwork/master/distributions/humble/HumbleHawksbill.png",
          "category": "ros",
          "difficulty": "Beginner",
          "duration": "45-60 minutes",
          "content": [
            {
              "heading": "Overview",
              "text": "This guide walks you through creating a ROS 2 (Humble) workspace and building a simple Python node using rclpy. It is intended for beginners who want to understand the basic ROS 2 Python node lifecycle."
            },
            {
              "heading": "Workspace Setup",
              "text": "Set up a ROS 2 Python workspace:\n\n```bash\n# Source ROS 2 Humble\nsource /opt/ros/humble/setup.bash\n\n# Create workspace and src directory\nmkdir -p ~/ros2_ws/src\ncd ~/ros2_ws/src\n\n# Create a Python package\nros2 pkg create --build-type ament_python <pkg_name> --dependencies rclpy std_msgs\n\n# Build the workspace\ncd ~/ros2_ws\ncolcon build\n\n# Source the workspace\nsource install/setup.bash\n```"
            },
            {
              "heading": "Custom ROS 2 Node Creation (Python)",
              "text": "Navigate into your package and create a Python node file:\n\n```bash\ncd <pkg_name>\ntouch <pkg_name>.py\nchmod +x <pkg_name>.py\n```"
            },
            {
              "heading": "Import ROS 2 Libraries",
              "text": "Start your node by importing required libraries:\n\n```python\n#!/usr/bin/env python3\n\nimport rclpy\nfrom rclpy.node import Node\n```"
            },
            {
              "heading": "Create a Custom Node Class",
              "text": "Define your node class by inheriting from Node:\n\n```python\nclass SimpleNode(Node):\n    def __init__(self):\n        super().__init__('simple_node')\n        self.get_logger().info('SimpleNode has been started')\n```"
            },
            {
              "heading": "Initialize and Spin the Node",
              "text": "Initialize ROS 2, create the node, and keep it running:\n\n```python\ndef main(args=None):\n    rclpy.init(args=args)\n    node = SimpleNode()\n    rclpy.spin(node)\n```"
            },
            {
              "heading": "Shutdown Cleanly",
              "text": "Properly destroy the node and shut down ROS 2:\n\n```python\n    node.destroy_node()\n    rclpy.shutdown()\n```"
            },
            {
              "heading": "Full Example Code",
              "text": "Complete minimal Python node example:\n\n```python\n#!/usr/bin/env python3\nimport rclpy\nfrom rclpy.node import Node\n\nclass hello_world(Node):\n    def __init__(self):\n        super().__init__('hello_world')\n        self.get_logger().info('Hello, World!')\n\ndef main(args=None):\n    rclpy.init(args=args)\n    node = hello_world()\n    rclpy.spin(node)\n    node.destroy_node()\n    rclpy.shutdown()\n\nif __name__ == \"__main__\":\n    main()\n```"
            },
            {
              "heading": "Configure setup.py Entry Points",
              "text": "Edit setup.py to register your node as a console script:\n\n```python\nentry_points={\n    'console_scripts': [\n        '<node_name> = <package_name>.<script_name>:main'\n    ],\n},\n```\n\nExample:\n\n```python\n'console_scripts': [\n    'hello_world = hello_world.hello_world:main',\n    'bye_world = hello_world.bye_world:main',\n    'bye_worldrecive = hello_world.bye_worldrecive:main',\n],\n```"
            },
            {
              "heading": "Automatically Source ROS 2 on Terminal Startup",
              "text": "To avoid sourcing ROS 2 manually every time:\n\n```bash\nnano ~/.bashrc\n```\n\nAdd at the bottom:\n\n```bash\nsource /opt/ros/humble/setup.bash\nsource ~/ros2_ws/install/setup.bash\n```\n\nSave and reload:\n\n```bash\nsource ~/.bashrc\n```"
            }
          ],
          "tags": ["ROS 2", "Humble", "Python", "rclpy", "Robotics", "Linux", "Ubuntu"]
        },
        {
  "id": 4,
  "title": "ROS 2 Custom Message Using Two Packages",
  "description": "Step-by-step guide to creating and using a custom ROS 2 message by defining it in a dedicated interface package and consuming it in a separate Python node package with publisher and subscriber examples.",
  "image": "https://raw.githubusercontent.com/ros-infrastructure/artwork/master/distributions/humble/HumbleHawksbill.png",
  "category": "ros",
  "difficulty": "Intermediate",
  "duration": "60-90 minutes",
  "content": [
    {
      "heading": "Overview",
      "text": "This guide demonstrates how to create a custom ROS 2 message in one package and use it in another package containing publisher and subscriber nodes. This modular approach follows ROS 2 best practices and improves reusability."
    },
    {
      "heading": "Package Overview",
      "text": "**Message Package**\n- Name: custom_interfaces\n- Build Type: ament_cmake\n- Purpose: Define custom .msg files\n\n**Node Package**\n- Name: student_nodes\n- Build Type: ament_python\n- Purpose: Implement publisher and subscriber nodes using the custom message"
    },
    {
      "heading": "Workspace Structure",
      "text": "Expected workspace layout:\n\n```text\nros2_ws/\n└── src/\n    ├── custom_interfaces/\n    │   └── msg/\n    │       └── Student.msg\n    └── student_nodes/\n        └── student_nodes/\n            ├── publisher.py\n            └── subscriber.py\n```"
    },
    {
      "heading": "Create Message Package",
      "text": "Create a message-only package:\n\n```bash\ncd ~/ros2_ws/src\nros2 pkg create custom_interfaces --build-type ament_cmake\n```\n\nCreate the message definition:\n\n```bash\ncd custom_interfaces\nmkdir msg\nnano msg/Student.msg\n```\n\n```msg\nint32 id\nstring name\nfloat32 marks\n```"
    },
    {
      "heading": "Configure Message Package",
      "text": "Update **CMakeLists.txt**:\n\n```cmake\nfind_package(rosidl_default_generators REQUIRED)\n\nrosidl_generate_interfaces(${PROJECT_NAME}\n  \"msg/Student.msg\"\n)\n\nament_export_dependencies(rosidl_default_runtime)\n```\n\nUpdate **package.xml**:\n\n```xml\n<build_depend>rosidl_default_generators</build_depend>\n<exec_depend>rosidl_default_runtime</exec_depend>\n```"
    },
    {
      "heading": "Build Message Package",
      "text": "Build and source the workspace so the message is generated:\n\n```bash\ncd ~/ros2_ws\ncolcon build\nsource install/setup.bash\n```"
    },
    {
      "heading": "Create Node Package",
      "text": "Create a Python node package that depends on the custom interface:\n\n```bash\ncd ~/ros2_ws/src\nros2 pkg create student_nodes --build-type ament_python --dependencies rclpy custom_interfaces\n```"
    },
    {
      "heading": "Publisher Node",
      "text": "Create a publisher that sends Student messages:\n\n```python\nimport rclpy\nfrom rclpy.node import Node\nfrom custom_interfaces.msg import Student\n\nclass StudentPublisher(Node):\n    def __init__(self):\n        super().__init__('student_publisher')\n        self.publisher_ = self.create_publisher(Student, 'student_info', 10)\n        self.timer = self.create_timer(1.0, self.publish_data)\n\n    def publish_data(self):\n        msg = Student()\n        msg.id = 1\n        msg.name = \"Anu\"\n        msg.marks = 89.5\n        self.publisher_.publish(msg)\n        self.get_logger().info(f\"Published: {msg.name}\")\n\ndef main():\n    rclpy.init()\n    node = StudentPublisher()\n    rclpy.spin(node)\n    rclpy.shutdown()\n\nif __name__ == '__main__':\n    main()\n```"
    },
    {
      "heading": "Subscriber Node",
      "text": "Create a subscriber to receive Student messages:\n\n```python\nimport rclpy\nfrom rclpy.node import Node\nfrom custom_interfaces.msg import Student\n\nclass StudentSubscriber(Node):\n    def __init__(self):\n        super().__init__('student_subscriber')\n        self.subscription = self.create_subscription(\n            Student,\n            'student_info',\n            self.callback,\n            10\n        )\n\n    def callback(self, msg):\n        self.get_logger().info(\n            f\"ID: {msg.id}, Name: {msg.name}, Marks: {msg.marks}\"\n        )\n\ndef main():\n    rclpy.init()\n    node = StudentSubscriber()\n    rclpy.spin(node)\n    rclpy.shutdown()\n\nif __name__ == '__main__':\n    main()\n```"
    },
    {
      "heading": "Configure setup.py Entry Points",
      "text": "Register the nodes as console scripts in **setup.py**:\n\n```python\nentry_points={\n    'console_scripts': [\n        'student_pub = student_nodes.publisher:main',\n        'student_sub = student_nodes.subscriber:main',\n    ],\n},\n```"
    },
    {
      "heading": "Build and Run",
      "text": "Build the workspace and run the nodes:\n\n```bash\ncd ~/ros2_ws\ncolcon build\nsource install/setup.bash\n```\n\nRun publisher:\n```bash\nros2 run student_nodes student_pub\n```\n\nRun subscriber:\n```bash\nros2 run student_nodes student_sub\n```"
    }
  ],
  "tags": ["ROS 2", "Custom Message", "Interfaces", "Python", "rclpy", "Humble", "Robotics"]
},
{
  "id": 5,
  "title": "FiveM Custom Script Development with Natives & NUI",
  "description": "A complete step-by-step guide to creating a custom FiveM script from scratch, covering resource structure, FiveM natives, client-server communication, and full NUI (HTML/CSS/JS) integration with callbacks.",
  "image": "https://docs.fivem.net/images/logo.png",
  "category": "fivem",
  "difficulty": "Beginner to Intermediate",
  "duration": "90–120 minutes",
  "content": [
    {
      "heading": "Overview",
      "text": "This tutorial teaches how to build a fully functional custom FiveM resource. You will learn how FiveM scripts work, how to use GTA V natives, how to communicate between client and server, and how to build interactive NUI interfaces using HTML, CSS, and JavaScript."
    },
    {
      "heading": "What Is a FiveM Script?",
      "text": "A FiveM script (resource) is a modular package that runs on a FiveM server. It can control gameplay logic using Lua, interact with GTA V through natives, communicate with the server, and display UI using NUI."
    },
    {
      "heading": "Basic Resource Structure",
      "text": "Typical resource layout:\n\n```text\nmy_script/\n├── fxmanifest.lua\n├── client.lua\n├── server.lua\n└── html/\n    ├── index.html\n    ├── style.css\n    └── script.js\n```"
    },
    {
      "heading": "fxmanifest.lua",
      "text": "The fxmanifest.lua file tells FiveM how to load your resource:\n\n```lua\nfx_version 'cerulean'\ngame 'gta5'\n\nauthor 'Your Name'\ndescription 'My Custom FiveM Script'\nversion '1.0.0'\n\nclient_scripts { 'client.lua' }\nserver_scripts { 'server.lua' }\n\nui_page 'html/index.html'\n\nfiles {\n  'html/index.html',\n  'html/style.css',\n  'html/script.js'\n}\n```"
    },
    {
      "heading": "Using FiveM Natives",
      "text": "FiveM natives are GTA V functions exposed to scripts. Example:\n\n```lua\nRegisterCommand('tpme', function()\n  local ped = PlayerPedId()\n  SetEntityCoords(ped, 200.0, -900.0, 30.0)\nend)\n```\n\nNatives allow you to move players, spawn vehicles, give weapons, and control the game world."
    },
    {
      "heading": "Client ↔ Server Communication",
      "text": "Client to Server:\n\n```lua\n-- client.lua\nTriggerServerEvent('myScript:saveData', 100)\n```\n\n```lua\n-- server.lua\nRegisterNetEvent('myScript:saveData', function(value)\n  print('Received:', value)\nend)\n```"
    },
    {
      "heading": "Server ↔ Client Communication",
      "text": "Server to Client:\n\n```lua\n-- server.lua\nTriggerClientEvent('myScript:notify', source, 'Hello Player')\n```\n\n```lua\n-- client.lua\nRegisterNetEvent('myScript:notify', function(msg)\n  print(msg)\nend)\n```"
    },
    {
      "heading": "Introduction to NUI",
      "text": "NUI (Native UI) allows you to create in-game interfaces using HTML, CSS, and JavaScript. It is commonly used for HUDs, menus, inventories, phones, and leaderboards."
    },
    {
      "heading": "Creating the NUI Interface",
      "text": "index.html:\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <div id=\"box\">Hello FiveM</div>\n  <button onclick=\"sendData()\">Send</button>\n  <script src=\"script.js\"></script>\n</body>\n</html>\n```"
    },
    {
      "heading": "Sending Data from Lua to NUI",
      "text": "```lua\n-- client.lua\nRegisterCommand('openui', function()\n  SetNuiFocus(true, true)\n  SendNUIMessage({ action = 'show', text = 'Hello from Lua' })\nend)\n```"
    },
    {
      "heading": "Receiving Data in JavaScript",
      "text": "```js\nwindow.addEventListener('message', function(event) {\n  if (event.data.action === 'show') {\n    document.getElementById('box').innerText = event.data.text;\n  }\n});\n```"
    },
    {
      "heading": "Sending Data from NUI to Lua (Callback)",
      "text": "```js\nfunction sendData() {\n  fetch(`https://${GetParentResourceName()}/submit`, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ value: 42 })\n  });\n}\n```\n\n```lua\nRegisterNUICallback('submit', function(data, cb)\n  print('From UI:', data.value)\n  SetNuiFocus(false, false)\n  cb('ok')\nend)\n```"
    },
    {
      "heading": "Closing the UI",
      "text": "```js\ndocument.addEventListener('keydown', function(e) {\n  if (e.key === 'Escape') {\n    fetch(`https://${GetParentResourceName()}/close`, { method: 'POST' });\n  }\n});\n```\n\n```lua\nRegisterNUICallback('close', function(_, cb)\n  SetNuiFocus(false, false)\n  cb('ok')\nend)\n```"
    },
    {
      "heading": "Build, Test, and Debug",
      "text": "Place the resource in the server resources folder, then run:\n\n```text\nrefresh\nensure my_script\n```\n\nUse F8 console, print() in Lua, and console.log() in JavaScript for debugging."
    }
  ],
  "tags": ["FiveM", "Lua", "NUI", "HTML", "CSS", "JavaScript", "GTA V", "Game Scripting"]
},
{
  "id": 6,
  "title": "Complete ROS2 Development Cheat Sheet — Beginner to Advanced Robotics Engineering",
  "description": "A comprehensive ROS2 developer cheat sheet that teaches the complete ROS2 workflow from beginner to production robotics. Covers architecture, nodes, communication, simulation, navigation, robot modeling, debugging, optimization, deployment, and real robot integration.",

  "image": "https://docs.ros.org/en/humble/_static/ros_logo.svg",

  "category": "robotics",

  "difficulty": "Beginner → Advanced",

  "duration": "8–12 Hours",

  "content": [

    {
      "heading": "Overview",

      "text": "ROS2 (Robot Operating System 2) is a robotics middleware platform used to build autonomous robots, mobile robots, robotic arms, industrial automation systems, and AI-powered robotics.\n\nUnlike traditional applications, ROS2 applications are distributed systems where multiple programs communicate together using Topics, Services, Actions, and DDS middleware.\n\nROS2 improves over ROS1 by introducing:\n\n• DDS communication\n• Multi-machine support\n• Real-time capability\n• Better security\n• Lifecycle management\n• Better Windows support\n• Embedded support through MicroROS"
    },

    {
      "heading": "Understanding ROS2 Architecture",

      "text": "Before writing code, understand the full ROS2 architecture.\n\n```text\nRobot Application\n│\n├── Node\n│     ├── Publisher\n│     ├── Subscriber\n│     ├── Service\n│     ├── Action\n│     └── Parameters\n│\n├── Topics\n├── TF2\n├── DDS\n├── Launch System\n└── Visualization\n```\n\nExplanation:\n\nNode → Individual process.\n\nTopic → Continuous data stream.\n\nService → Instant request/response.\n\nAction → Long-running operations.\n\nDDS → Middleware handling communication.\n\nTF → Coordinate transformations."
    },

    {
      "heading": "Installing ROS2",

      "text": "Install ROS2 Humble:\n\n```bash\nsudo apt update\nsudo apt install ros-humble-desktop\n```\n\nLoad environment:\n\n```bash\nsource /opt/ros/humble/setup.bash\n```\n\nMake permanent:\n\n```bash\necho 'source /opt/ros/humble/setup.bash' >> ~/.bashrc\nsource ~/.bashrc\n```\n\nVerify installation:\n\n```bash\nprintenv | grep ROS\n```\n\nExpected variables:\n\n```text\nROS_VERSION\nROS_DISTRO\nROS_PYTHON_VERSION\n```"
    },

    {
      "heading": "Creating Your First Workspace",

      "text": "ROS2 development happens inside workspaces.\n\nCreate workspace:\n\n```bash\nmkdir -p ~/ros2_ws/src\ncd ~/ros2_ws\n```\n\nBuild:\n\n```bash\ncolcon build\n```\n\nSource:\n\n```bash\nsource install/setup.bash\n```\n\nWorkspace structure:\n\n```text\nros2_ws/\n├── src/\n├── build/\n├── install/\n└── log/\n```\n\nDevelopment cycle:\n\nEdit → Build → Source → Run"
    },

    {
      "heading": "Creating Packages",

      "text": "ROS2 code is organized into packages.\n\nPython package:\n\n```bash\nros2 pkg create robot_pkg --build-type ament_python\n```\n\nC++ package:\n\n```bash\nros2 pkg create robot_cpp --build-type ament_cmake\n```\n\nWith dependencies:\n\n```bash\nros2 pkg create robot_pkg \\\n--build-type ament_python \\\n--dependencies rclpy std_msgs geometry_msgs\n```\n\nGenerated structure:\n\n```text\nrobot_pkg/\n├── package.xml\n├── setup.py\n├── launch/\n├── config/\n└── robot_pkg/\n```"
    },

    {
      "heading": "Creating Your First Node",

      "text": "Nodes are executable units in ROS2.\n\nPython Node:\n\n```python\nimport rclpy\nfrom rclpy.node import Node\n\nclass Robot(Node):\n\n    def __init__(self):\n        super().__init__('robot_node')\n\n        self.get_logger().info(\n            'Robot Started'\n        )\n\n\ndef main():\n\n    rclpy.init()\n\n    node=Robot()\n\n    rclpy.spin(node)\n\n    node.destroy_node()\n\n    rclpy.shutdown()\n\nmain()\n```\n\nRun:\n\n```bash\nros2 run robot_pkg robot\n```"
    },

    {
      "heading": "Topics (Publisher ↔ Subscriber)",

      "text": "Topics provide asynchronous communication.\n\nPublisher:\n\n```python\nself.publisher=self.create_publisher(\nString,\n'/chat',\n10\n)\n```\n\nPublish:\n\n```python\nmsg.data='hello'\nself.publisher.publish(msg)\n```\n\nSubscriber:\n\n```python\nself.create_subscription(\nString,\n'/chat',\nself.callback,\n10\n)\n```\n\nFlow:\n\n```text\nPublisher\n↓\nTopic\n↓\nSubscriber\n```\n\nDebug:\n\n```bash\nros2 topic list\nros2 topic echo\nros2 topic hz\n```"
    },

    {
      "heading": "Services vs Actions",

      "text": "Services:\n\n```text\nClient\n↓\nRequest\n↓\nServer\n↓\nResponse\n```\n\nExample:\n\n```text\nGet battery percentage\n```\n\nActions:\n\n```text\nGoal\n↓\nFeedback\n↓\nResult\n```\n\nExample:\n\n```text\nMove robot to destination\n```"
    },

    {
      "heading": "Robot Visualization (RViz2)",

      "text": "RViz2 helps visualize robot data.\n\nStart:\n\n```bash\nrviz2\n```\n\nUseful Displays:\n\n```text\nTF\nRobotModel\nLaserScan\nPointCloud\nImage\nMap\nMarker\n```\n\nTypical flow:\n\n```text\nRobot\n↓\nTopics\n↓\nRViz2\n```"
    },

    {
      "heading": "TF2 Coordinate System",

      "text": "TF2 manages coordinate transforms.\n\nExample:\n\n```text\nmap\n↓\nodom\n↓\nbase_link\n↓\ncamera\n```\n\nCommands:\n\n```bash\nros2 run tf2_tools view_frames\nros2 run tf2_ros tf2_echo\n```"
    },

    {
      "heading": "Simulation with Gazebo",

      "text": "Launch simulation:\n\n```bash\nros2 launch gazebo_ros gazebo.launch.py\n```\n\nSpawn robot:\n\n```bash\nspawn_entity.py\n```\n\nSimulation stack:\n\n```text\nURDF\n↓\nGazebo\n↓\nROS2\n↓\nRViz\n```"
    },

    {
      "heading": "Navigation Stack (Nav2)",

      "text": "Nav2 allows autonomous navigation.\n\nPipeline:\n\n```text\nMap\n↓\nLocalization\n↓\nGlobal Planner\n↓\nController\n↓\nMotor\n```\n\nLaunch:\n\n```bash\nros2 launch nav2_bringup navigation_launch.py\n```\n\nFeatures:\n\n• Path planning\n• Obstacle avoidance\n• Recovery behaviors\n• Goal navigation"
    },

    {
      "heading": "Real Robot Deployment",

      "text": "Production robot architecture:\n\n```text\nESP32\n↓\nMicroROS\n↓\nROS2\n↓\nNavigation\n↓\nMotor Driver\n```\n\nUseful packages:\n\n```text\nmicro_ros\nrobot_localization\nslam_toolbox\nmoveit2\nnav2\n```"
    },

    {
      "heading": "Advanced ROS2",

      "text": "Senior-level concepts:\n\n```text\nExecutors\nLifecycle Nodes\nComposition\nRealtime Linux\nDDS Tuning\nZero Copy\nShared Memory\nMulti Robot\nBehavior Trees\nCUDA Integration\n```\n\nProduction debugging:\n\n```bash\nros2 trace\nhtop\nrqt_graph\n```"
    }

  ],

  "tags": [
    "ROS2",
    "Robotics",
    "Gazebo",
    "RViz",
    "Navigation",
    "MoveIt2",
    "DDS",
    "Python",
    "C++",
    "MicroROS"
  ]
}


];


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        featuredProjectIds,
        fivemProjects,
        otherProjects,
        skills,
        stats,
        contactInfo,
        personalInfo,
        tutorials
    };
}
