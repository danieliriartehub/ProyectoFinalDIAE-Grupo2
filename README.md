MILETL (Man I Love ETL) - Enterprise Data Intelligence Platform

(Placeholder for project screenshot - Replace with actual image)

🚀 Overview

MILETL is a comprehensive SaaS platform designed to transform raw business data into actionable strategic intelligence. Targeting enterprise clients, it facilitates the migration from manual spreadsheet management to a governed, automated, and scalable data ecosystem.

This project implements a modular Single Page Application (SPA-like) architecture using Vanilla JavaScript (ES6+), HTML5, and CSS3, focusing on performance, maintainability, and clean code principles (OOP).

🌟 Key Features

Authentication Module: Secure login simulation with role-based access control (mock).

Executive Dashboard: Real-time KPI visualization (Cash Flow, Inventory, Orders) and critical alerts.

Financial Analytics: Detailed Cash Flow reports with filtering capabilities and data visualization.

Inventory Management (WMS Lite): CRUD operations for product stock, status filtering (Critical, Low, Sufficient), and search.

Accounts Receivable/Payable: Debt tracking, invoice management, and payment status monitoring.

User Settings: Profile management and system preferences configuration.

Responsive Design: Fully adaptive interface for Desktop, Tablet, and Mobile devices with an Off-Canvas sidebar.

🏗 Architecture

The project follows a Component-Based Architecture without external frameworks, emphasizing standard Web APIs and Separation of Concerns:

View Layer (HTML): Semantic HTML5 structures for each module (dashboard.html, inventory.html, etc.).

Presentation Layer (CSS): Modular CSS with BEM-ish naming convention, CSS Variables for theming, and Flexbox/Grid layouts.

Logic Layer (JS): Object-Oriented JavaScript Controllers for each view, managing DOM interactions, state, and mock data.

Project Structure

PROYECTO_FINAL_MILETL/
│
├── index.html            # Public Landing Page (Marketing)
├── login.html            # Authentication Portal
├── dashboard.html        # Main Application Hub
├── inventory.html        # Inventory Module
├── finance.html          # Finance Module
├── cashflow.html         # Reporting Module
├── settings.html         # User Configuration
│
├── styles/               # Stylesheets
│   ├── style.css         # Global & Landing styles
│   ├── auth.css          # Auth specific styles
│   ├── dashboard.css     # Dashboard layout
│   ├── inventory.css     # Inventory module styles
│   ├── finance.css       # Finance module styles
│   ├── cashflow.css      # Reporting styles
│   └── settings.css      # Settings styles
│
└── js/                   # JavaScript Controllers
    ├── app.js            # Landing page logic
    ├── auth.js           # Auth logic (Mock DB)
    ├── dashboard.js      # Dashboard controller
    ├── inventory.js      # Inventory CRUD logic
    ├── finance.js        # Finance logic
    ├── cashflow.js       # Reporting logic
    └── settings.js       # Settings controller


🛠 Tech Stack

Frontend: HTML5, CSS3, JavaScript (ES6+).

Icons: FontAwesome 6.4.0.

Fonts: Inter (Google Fonts).

State Management: LocalStorage (Simulated Session).

Version Control: Git & GitHub.

🚀 Getting Started

To run this project locally, no build tools or package managers (npm/yarn) are required.

Clone the repository:

git clone [https://github.com/your-username/miletl-project.git](https://github.com/your-username/miletl-project.git)


Navigate to the project directory:

cd miletl-project


Launch the application:
Open index.html in your preferred modern web browser (Chrome, Firefox, Edge).

Recommended: Use a local server extension like "Live Server" in VS Code for the best experience.

🔐 Credentials (Mock Data)

You can log in using any of the following pre-configured test accounts (Password for all: 123456789):

danieliriarte0305@gmail.com (Daniel - System Architect)

matiasgastelu1@gmail.com (Matias - Product Owner)

ar86344@gmail.com (Alex - Lead Developer)

ejuniorfloress@gmail.com (Edwin - SAP Consultant)

🤝 Contributing

Fork the repository.

Create a feature branch (git checkout -b feature/amazing-feature).

Commit your changes (git commit -m 'feat: Add amazing feature').

Push to the branch (git push origin feature/amazing-feature).

Open a Pull Request.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

Developed by: Edwin, Daniel, Alex, Matias for the "Desarrollo e Implementación de Ambientes Emergentes" course.
