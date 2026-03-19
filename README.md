# OSDS Student Portal | Serverless University Gateway

A centralized, highly responsive digital gateway architected for the Office of Student Development Services (OSDS) at Mindanao State University - Iligan Institute of Technology.

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?logo=google-cloud&logoColor=white)
![Serverless](https://img.shields.io/badge/Architecture-Serverless-FF9900)

## 📖 Overview
The OSDS Student Portal was engineered to streamline university administrative processes by providing a clean, accessible interface for students to navigate policies, download forms, and request services. Instead of relying on a traditional, heavy relational database, this project utilizes a modern serverless approach to maximize speed and reduce hosting overhead.

*Note: This system was developed as part of an official On-the-Job Training (OJT) deployment for the MSU-IIT Office of Student Development Services.*

## 🏗️ System Architecture & Tech Stack

To ensure rapid deployment and easy hand-off to non-technical university administrators, the application decouples a modern frontend from a familiar, lightweight backend:

* **Frontend Client:** Built with **React.js** and styled with **Tailwind CSS** for a highly responsive, minimalist user interface that performs exceptionally well across mobile and desktop environments.
* **Serverless Backend (Headless CMS):** Cleverly leverages the **Google Sheets API** and **Google Drive API** as a lightweight, serverless database and file-hosting solution. This allows university staff to update portal content (like announcements or downloadable PDFs) simply by editing a Google Sheet, completely bypassing the need for a custom admin dashboard.
* **State Management & Data Fetching:** Optimized asynchronous data fetching to parse Google Sheets JSON data into dynamic UI components with minimal latency.

## 👨‍💻 My Contributions

As the Full-Stack Developer on this project, my responsibilities included:
1. **UI/UX Engineering:** Designing and implementing the front-end search interfaces and responsive layout system using React and Tailwind.
2. **API Integration:** Architecting the connection between the React client and the Google Workspace APIs, ensuring secure and efficient data retrieval.
3. **Data Structuring:** Designing the schema within Google Sheets to act as a reliable, queryable database for the frontend components.

## 🚀 Local Development Setup

To run this project locally, you will need Node.js installed and access to the necessary Google Cloud API credentials.

### 1. Installation
```bash
git clone https://github.com/skibi11/msuiit-osds.git
cd msuiit-osds
npm install
```

### 2. Environment Variables
```bash
REACT_APP_GOOGLE_API_KEY=your_api_key
REACT_APP_SPREADSHEET_ID=your_target_sheet_id
```

### 3. Start the Development Server
```bash
npm start
```
