// FiveM Projects Data
const fivemProjects = [
    {
        id: 1,
        title: "Advanced Banking System",
        description: "Complete banking solution with ATMs, loans, credit cards, and transaction history. Features real-time notifications, multi-currency support, and admin management panel.",
        image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Banking+System",
        technologies: ["Lua", "MySQL", "ESX", "HTML/CSS"],
        features: [
            "ATM Network Integration",
            "Loan Management System", 
            "Credit Card Processing",
            "Transaction History",
            "Multi-Currency Support",
            "Admin Dashboard"
        ],
        github: "#",
        demo: "#",
        category: "economy"
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
    }
];

// Other Projects Data
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

// Skills data
const skills = [
    { name: "Lua", icon: "fab fa-js-square", level: 95 },
    { name: "Database Design", icon: "fas fa-database", level: 90 },
    { name: "Server Management", icon: "fas fa-server", level: 85 },
    { name: "Web Development", icon: "fab fa-html5", level: 92 },
    { name: "Game Development", icon: "fas fa-gamepad", level: 88 }
];

// Statistics data
const stats = [
    { number: "10+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
];

// Contact information
const contactInfo = {
    email: "your.email@example.com",
    discord: "_remin_",
    github: "github.com/anxxity",
    socialLinks: {
        github: "https://github.com/anxxity",
        discord: "https://discord.gg/",
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/in/"
    }
};

// Personal information
const personalInfo = {
    name: "Remin Mohammed",
    title: "Robotics Engineer",
    bio: [
        "I'm a dedicated developer with a passion for creating engaging digital experiences. My journey began with FiveM development, where I've built custom resources, server frameworks, and immersive roleplay systems.",
        "Beyond gaming, I work on various software projects including web applications, automation tools, and innovative solutions that solve real-world problems."
    ]
};

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fivemProjects,
        otherProjects,
        skills,
        stats,
        contactInfo,
        personalInfo
    };
}
