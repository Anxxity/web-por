
const fivemProjects = [
    {
        id: 1,
        title: "Safezone Creator",
        description: "Create and manage safezones in-game with a live config UI. Supports multiple zone shapes, per-zone vehicle speed limits, job/weapon whitelists, admin bypass, custom player-facing text, and enter/exit events for easy integration.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Safezone+Creator",
        technologies: ["Lua", "PolyZone", "ox_lib", "ESX/QBCore", "HTML/CSS"],
        features: [
            "In-game safezone creation & editing (PolyZone)",
            "Whitelisted weapons & job-based weapon rules",
            "Per-zone vehicle speed limit",
            "Custom on-screen text / notifications",
            "Enter/exit events for scripts (e.g., disable PvP, heal, etc.)",
            "Persist zones to JSON/SQL",
            "Low-overhead, client-side optimization"
        ],
        github: "#",
        demo: "#",
        category: "utilities"
    },
    {
        id: 2,
        title: "Custom Vehicle System",
        description: "Dynamic vehicle spawning and customization system with persistent storage. Includes vehicle ownership, modifications, and rental system.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Vehicle+System",
        technologies: ["Lua", "JavaScript", "QBCore", "MySQL"],
        features: [
            "Vehicle Ownership System",
            "Custom Modifications",
            "Rental System",
            "Garage Management",
            "Vehicle Insurance",
            "Performance Tuning"
        ],
        github: "#",
        demo: "#",
        category: "vehicles"
    },
    {
        id: 3,
        title: "Roleplay Framework",
        description: "Complete framework for immersive roleplay servers with job systems, character management, and economy integration.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=RP+Framework",
        technologies: ["Lua", "HTML/CSS", "JavaScript", "Framework"],
        features: [
            "Character Management",
            "Job System Integration",
            "Economy Framework",
            "Inventory System",
            "Housing System",
            "Admin Tools"
        ],
        github: "#",
        demo: "#",
        category: "framework"
    },
    {
        id: 4,
        title: "Police MDT System",
        description: "Mobile Data Terminal for law enforcement with criminal records, vehicle lookups, and incident reporting.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Police+MDT",
        technologies: ["Lua", "React", "MySQL", "ESX"],
        features: [
            "Criminal Database",
            "Vehicle Registration",
            "Incident Reports",
            "BOLO System",
            "Officer Management",
            "Evidence Tracking"
        ],
        github: "#",
        demo: "#",
        category: "emergency"
    },
    {
        id: 5,
        title: "Hospital Management",
        description: "Comprehensive medical system with patient records, medical procedures, and ambulance dispatch.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Hospital+System",
        technologies: ["Lua", "Vue.js", "MySQL", "QBCore"],
        features: [
            "Patient Records",
            "Medical Procedures",
            "Ambulance Dispatch",
            "Pharmacy System",
            "Medical Billing",
            "Staff Management"
        ],
        github: "#",
        demo: "#",
        category: "emergency"
    },
    {
        id: 6,
        title: "Real Estate System",
        description: "Property management system with buying, selling, and rental features. Includes property viewing and contract management.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Real+Estate",
        technologies: ["Lua", "JavaScript", "MySQL", "ESX"],
        features: [
            "Property Listings",
            "Virtual Tours",
            "Contract Management",
            "Rental System",
            "Property Valuation",
            "Agent Dashboard"
        ],
        github: "#",
        demo: "#",
        category: "economy"
    },
    {
        id: 7,
        title: "Leaderboard System",
        description: "Tracks player kills, deaths, and weapon stats in real-time with a visual leaderboard.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Leaderboard",
        technologies: ["Lua", "oxmysql", "ESX", "HTML/CSS", "JavaScript"],
        features: [
            "Real-time K/D tracking",
            "Weapon statistics",
            "Top players displayed as peds",
            "Interactive UI integration"
        ],
        github: "#",
        demo: "#",
        category: "utilities"
    },
    {
        id: 8,
        title: "Chalkboard System",
        description: "Interactive chalkboard script for roleplay servers allowing dynamic content updates.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Chalkboard+System",
        technologies: ["Lua", "ESX", "HTML/CSS", "JavaScript"],
        features: [
            "Dynamic chalkboard updates",
            "Teacher/admin content control",
            "Supports multiple chalkboards"
        ],
        github: "#",
        demo: "#",
        category: "utilities"
    },
    {
        id: 9,
        title: "PvP Lobby UI",
        description: "Custom PvP server lobby interface with lobby list, location selection, and weapon selection.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=PvP+Lobby+UI",
        technologies: ["Lua", "ESX", "HTML/CSS", "JavaScript"],
        features: [
            "Lobby creation & joining",
            "Location selection",
            "Weapon loadout selection",
            "Interactive and immersive UI"
        ],
        github: "#",
        demo: "#",
        category: "utilities"
    }
];


const roboticsProjects = [
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


const otherProjects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
        image: "https://via.placeholder.com/400x250/2563eb/ffffff?text=E-Commerce",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "#",
        demo: "#",
        category: "web"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates, team collaboration, and project tracking.",
        image: "https://via.placeholder.com/400x250/2563eb/ffffff?text=Task+Manager",
        technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
        github: "#",
        demo: "#",
        category: "web"
    },
    {
        id: 3,
        title: "Automation Suite",
        description: "Collection of automation tools for development workflows, including CI/CD pipelines and testing frameworks.",
        image: "https://via.placeholder.com/400x250/059669/ffffff?text=Automation+Tools",
        technologies: ["Python", "Selenium", "Docker", "Jenkins"],
        github: "#",
        demo: "#",
        category: "tools"
    },
    {
        id: 4,
        title: "Mobile Weather App",
        description: "Cross-platform weather application with location-based forecasts, weather alerts, and interactive maps.",
        image: "https://via.placeholder.com/400x250/7c3aed/ffffff?text=Weather+App",
        technologies: ["React Native", "TypeScript", "Weather API", "Maps"],
        github: "#",
        demo: "#",
        category: "mobile"
    },
    {
        id: 5,
        title: "Data Analytics Dashboard",
        description: "Interactive dashboard for data visualization and analytics with real-time charts and reporting features.",
        image: "https://via.placeholder.com/400x250/dc2626/ffffff?text=Analytics+Dashboard",
        technologies: ["D3.js", "Python", "Flask", "PostgreSQL"],
        github: "#",
        demo: "#",
        category: "web"
    },
    {
        id: 6,
        title: "API Gateway",
        description: "Microservices API gateway with authentication, rate limiting, and request routing capabilities.",
        image: "https://via.placeholder.com/400x250/059669/ffffff?text=API+Gateway",
        technologies: ["Go", "Redis", "Docker", "Kubernetes"],
        github: "#",
        demo: "#",
        category: "tools"
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
