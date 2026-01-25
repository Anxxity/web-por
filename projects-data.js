
const fivemProjects = [
    {
        id: 1,
        title: "Safezone Creator",
        description: "Create and manage safezones in-game with a live config UI. Supports multiple zone shapes, job/weapon whitelists, admin bypass, custom player-facing text, and enter/exit events for easy integration.",
        image: "https://github.com/Anxxity/web-por/blob/main/asses/safezonecreator.png?raw=true",
        technologies: ["Lua", "PolyZone", "ox_lib", "ESX/QBCore", "HTML/CSS"],
        features: [
            "In-game safezone creation & editing (PolyZone)",
            "Whitelisted weapons & job-based weapon rules",
            "Custom on-screen text / notifications",
            "Enter/exit events for scripts (e.g., disable PvP, heal, etc.)",
            "Persist zones to JSON/SQL"
        ],
        github: "#",
        demo: "#",
        category: "util"
    },
    {
        id: 2,
        title: "PvP Profile System",
        description: "Track every player’s performance in real time with this sleek and responsive PvP Leaderboard.Designed with a dark, modern interface, it automatically updates kills, deaths, headshots, and K/D ratio during combat.",
        image: "https://github.com/Anxxity/web-por/blob/main/asses/pvpprfile.png?raw=true",
        technologies: ["Lua", "JavaScript", "ESX", "MySQL","HTML/CSS",],
        features: [
            "Real-time K/D tracking",
            "Weapon statistics",
            "Top players displayed as peds",
            "Interactive UI integration"
        ],
        github: "#",
        demo: "#",
        category: "PvP"
    },
    {
        id: 3,
        title: "PvP Leaderboard",
        description: "Track every player’s performance in real time with this sleek and responsive PvP Leaderboard.Designed with a dark, modern interface, it automatically updates kills, deaths, headshots, and K/D ratio during combat.",
        image: "https://github.com/Anxxity/web-por/blob/main/asses/leaderboardlast.png?raw=true",
          technologies: ["Lua", "oxmysql", "Qbox", "HTML/CSS", "JavaScript"],
        features: [
           "Real-time K/D tracking",
           "Top 10 players displayed in ui",
           "Match history of player",
            "Easy intergation to other resources",
            "Simple Ui"
        ],
        github: "#",
        demo: "#",
        category: "PvP"
    },
    {
        id: 4,
        title: "PvP Lobby UI",
        description: "Custom PvP server lobby interface with lobby list, location selection, and weapon selection.",
        image: "https://github.com/Anxxity/web-por/blob/main/asses/leaderboardlast.png?raw=true",
        technologies: ["Lua", "ESX", "HTML/CSS", "JavaScript"],
        features: [
            "Lobby creation & joining",
            "Location selection",
            "Weapon loadout selection",
            "Interactive and immersive UI"
        ],
        github: "#",
        demo: "#",
        category: "PvP"
    },
    {
        id: 5,
        title: "rm_radiolist",
        description: "based on the original script X-RADIOLIST. I updated the visual style and added a movable radio list.",
        image: "https://github.com/user-attachments/assets/09803e71-e50a-417a-932a-674689bc9447",
        technologies: ["Lua", "HTML/CSS", "JavaScript"],
        features: [
            "Config to show players’ RP name",
            "color of each player when they talk on radio",
            "name radio channels in config",
            "Interactive and immersive UI"
        ],
        github: "https://github.com/Anxxity/rm_radiolist",
        demo: "https://github.com/user-attachments/assets/d7ead535-2691-498a-a966-658871a72f10",
        category: "util"
    }
];



const otherProjects = [
     {
        id: 1,
        title: "Eye Tracking Wheelchair",
        description: "Automated wheelchair controlled via eye-tracking using Raspberry Pi and Arduino.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Eye+Tracking+Wheelchair",
        technologies: ["Python", "Raspberry Pi", "Arduino", "GazeTracking Library", "MY1016Z2 Motor", "BTS7960 Driver"],
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
        id: 2,
        title: "Fire Extinguisher Bot",
        description: "Arduino-based robot that detects and extinguishes fire using sensors and 3D printed components.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Fire+Extinguisher+Bot",
        technologies: ["Arduino Uno", "ESP", "Temperature & Smoke Sensors", "3D Printing"],
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
        id: 3,
        title: "TRobot",
        description: "Weather-sensing robot using ESP32 for temperature, humidity, and thunderstorm detection.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=TRobot",
        technologies: ["ESP32", "Sensors", "Arduino", "IoT"],
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
        id: 4,
        title: "Aimee - Recipe Assistant Robot",
        description: "AI-powered recipe assistant running on Raspberry Pi with voice and display support.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Aimee",
        technologies: ["Python", "Raspberry Pi", "Google Generative AI"],
        features: [
            "Voice interaction",
            "Recipe suggestions",
            "Step-by-step guidance"
        ],
        github: "#",
        demo: "#",
        category: "Robotics"
    },
    {
        id: 5,
        title: "Home Automation System",
        description: "Arduino-based home automation using relays for controlling appliances.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Home+Automation",
        technologies: ["Arduino Uno", "Relays", "IoT"],
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
        id: 6,
        title: "Beach Cleaning Robot",
        description: "Autonomous beach cleaning robot with Pixhawk flight controller and Raspberry Pi mission planning.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Beach+Cleaning+Robot",
        technologies: ["Raspberry Pi", "Pixhawk", "ArduPilot", "Sensors", "Motors"],
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
        id: 7,
        title: "Track Rover",
        description: "Tracked rover controlled via Raspberry Pi and Arduino for mission-based tasks.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Track+Rover",
        technologies: ["Raspberry Pi", "Arduino Uno", "Motors", "SpeedyBee F405", "Mission Planner"],
        features: [
            "Track-based locomotion",
            "Remote mission control",
            "Sensor integration"
        ],
        github: "#",
        demo: "#",
        category: "Raspberry"
    },
       {
        id: 8,
        title: "cheap deck",
        description: "A cheap alternative for stream deck . Cheap deck",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Track+Rover",
        technologies: [ "Arduino Uno", "tft touch screen"],
        features: [
           "Touchscreen Interface",
           "Keyboard Shortcuts",
           "Fully Customizable"
        ],
        github: "https://github.com/Anxxity/cheap-deck",
        demo: "https://github.com/Anxxity/cheap-deck",
        category: "Raspberry"
    }
];

const skills = [
    { name: "Lua", icon: "fab fa-js-square", level: 95 },
    { name: "Database Design", icon: "fas fa-database", level: 90 },
    { name: "Server Management", icon: "fas fa-server", level: 85 },
    { name: "Web Development", icon: "fab fa-html5", level: 92 },
    { name: "Game Development", icon: "fas fa-gamepad", level: 88 },
    { name: "Robotics & Automation", icon: "fas fa-robot", level: 90 },
    { name: "Python", icon: "fab fa-python", level: 85 }
];


const stats = [
    { number: "10+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
];


const contactInfo = {
    email: "reminmohammed123@gmail.com",
    discord: "_remin_",
    github: "github.com/anxxity",
    socialLinks: {
        github: "https://github.com/anxxity",
        discord: "https://discord.gg/",
        twitter: "https://twitter.com/",
        linkedin: "https://www.linkedin.com/in/remin-mohammed-062426197/"
    }
};


const personalInfo = {
    name: "Remin Mohammed",
    title: "Robotics Engineer",
    bio: [
        "I'm a dedicated developer with a passion for creating engaging digital experiences. My journey began with FiveM development, where I've built custom resources, server frameworks, and immersive roleplay systems.",
        "Beyond gaming, I work on various software projects including web applications, automation tools, and innovative solutions that solve real-world problems."
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
];


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fivemProjects,
        roboticsProjects,
        otherProjects,
        skills,
        stats,
        contactInfo,
        personalInfo,
        tutorials
    };
}
