import { formatMultiline, formatCommand } from "@/utils/formatters";

export const COMMANDS: Record<string, string> = {
  help: "Available commands: about, experience, projects, skills, education, contact, theme, clear",
  
  about: formatMultiline(`
    Senior Full-Stack Developer with 9 years of experience in Ruby on Rails, ReactJS, and scalable web applications.

    Expert in performance optimization, automation, and system scalability. Adept at leading remote teams, improving search performance, and enhancing test coverage.

    Passionate about building efficient, user-friendly applications for global clients.
  `),

  experience: formatCommand({
    "🚀 Senior Full-Stack Developer | Remote Contractor (2017 - Present)": [
      "Developed Rails & React applications for international startups",
      "Boosted test coverage from 45% to 98% with RSpec & Capybara",
      "Optimized search with ElasticSearch migration",
      "Built automated ETL systems"
    ],
    "💼 Senior Web Developer | Plan 9 Incubator (2016 - 2017)": [
      "Created MVP in Laravel, migrated to Rails & AngularJS",
      "Led product iterations and feature rollouts",
      "Thrived in fast-paced startup environment"
    ],
    "💻 Web Developer | Punch Digital Agency (2013 - 2015)": [
      "Built projects with Rails, React, Angular, Ionic",
      "Developed automated web scrapers",
      "Configured Capistrano deployments"
    ]
  }),

  projects: formatCommand({
    "🚀 Hemisphere One (2022-2023)": [
      "Custom dispatch management system",
      "Rails 6.2 & Ruby 3.1 upgrade"
    ],
    "💊 Sildenafil (2022)": [
      "Rails to React migration",
      "Automated CI/CD with GitHub"
    ],
    "📍 FindHelpPhoenix (2021-2022)": [
      "Map-based data cluster optimization",
      "ETL system implementation"
    ],
    "💪 TRX (2018-2020)": [
      "Salesforce to Inspire360 migration",
      "Search server optimization"
    ],
    "💰 Givv/Waivpay (2017-2018)": [
      "Spring to Rails (Grape API) migration",
      "Scheduled donations system"
    ]
  }),

  skills: formatCommand({
    "Frontend": [
      "🔹 ReactJS, React Native, AngularJS",
      "🔹 TailwindCSS"
    ],
    "Backend": [
      "🔹 Ruby on Rails, Grape API, GraphQL"
    ],
    "Databases & Search": [
      "🔹 PostgreSQL, ElasticSearch, Solr"
    ],
    "DevOps & Tools": [
      "🔹 AWS, Capistrano, CI/CD, Docker, Graphana"
    ],
    "Testing & Automation": [
      "🔹 Selenium, RSpec, Capybara, Playwright, Cypress"
    ]
  }),

  education: formatCommand({
    "🎓 Bachelor of Computer Science": [
      "Comsats IIT (2009 - 2013)",
      "Lahore, Pakistan"
    ],
    "🏆 Achievements": [
      "Top 3 Projects in Plan 9 Incubator (2016-2017)"
    ],
    "🗣️ Languages": [
      "English (Professional)",
      "Urdu (Native)",
      "Punjabi (Native)"
    ]
  }),

  contact: formatMultiline(`
    📧 Email: <a href="mailto:hamza.bhinder@gmail.com" class="hover:underline theme-link">hamza.bhinder@gmail.com</a>
    🌎 Location: Remote (Open to Global Opportunities)
    🔗 LinkedIn: <a href="https://linkedin.com/in/hamzabhinder" target="_blank" class="hover:underline theme-link">linkedin.com/in/hamzabhinder</a>
    💻 GitHub: <a href="https://github.com/your-handle" target="_blank" class="hover:underline theme-link">github.com/your-handle</a>
  `),

  theme: "Available themes: matrix, ubuntu, powershell, light\nUsage: theme <name>",
  clear: ""
};
