
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
        category: "utilities"
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
        category: "robotics"
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
        category: "robotics"
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
        category: "robotics"
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
        category: "robotics"
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
        category: "automation"
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
        category: "robotics"
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
        category: "robotics"
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


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fivemProjects,
        roboticsProjects,
        otherProjects,
        skills,
        stats,
        contactInfo,
        personalInfo
    };
}
