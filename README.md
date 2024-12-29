# **Admin and User Module Application**

This project is a web application built using **React** for the frontend and **localStorage** for data storage. It leverages **Material-UI (MUI)** for UI components and is deployed on **Netlify**.

---

## **Features**

### **Admin Module**

- **Company Management**: Add, update, and manage companies.  
- **Communication Method Management**: Define and manage methods like LinkedIn, Email, etc.  
- **Tab-based Navigation**: Simplifies access to different management sections.  

### **User Module**

- **Dashboard**: Provides an overview of user-specific data.  
- **Notifications**: Alerts users about overdue and upcoming communications.  
- **Calendar View**: Displays past and future communications in an interactive calendar.  

---

## **Data Management**

- **LocalStorage**: Stores user-specific data, including:  
  - **userCompanies**: List of companies with communication logs and schedules.  
  - **companies**: Source data for initializing `userCompanies`.  

---

## **Tech Stack**

- **Frontend**: React  
- **State Management**: React Hooks  
- **UI Components**: Material-UI (MUI)  
- **Data Storage**: LocalStorage  
- **Deployment**: Netlify  

---

## **Packages Used**

### **Core Dependencies**

- `react`: ^19.0.0  
- `react-dom`: ^19.0.0  
- `react-scripts`: 5.0.1  

### **UI and Styling**

- `@mui/material`: ^6.3.0  
- `@mui/icons-material`: ^6.3.0  
- `@emotion/react`: ^11.14.0  
- `@emotion/styled`: ^11.14.0  

### **Data Grid and Date Pickers**

- `@mui/x-data-grid`: ^7.23.4  
- `@mui/x-date-pickers`: ^7.23.3  

### **Calendar**

- `react-calendar`: ^5.1.0  

### **Form Handling**

- `react-hook-form`: ^7.54.2  

### **Routing**

- `react-router-dom`: ^7.1.1  

---

## **Deployment**

The application is deployed on **Netlify**. You can access the live version [here](#).  

---

## **Setup Instructions**

### **Prerequisites**

- **Node.js** (v14 or higher)  
- **npm** or **yarn**  

### **Installation**

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/admin-user-module-app.git
2. npm install
3. npm run start

The application will be available at http://localhost:3000.

---

## **Known Limitations**

- **Data Persistence**:  
  Uses `localStorage`, which is browser-specific and not shared across devices.  

- **Date Management**:  
  Currently relies on ISO date strings, which may cause issues with timezone differences.  

- **Scalability**:  
  Designed for small-scale data management; additional backend integration is needed for large-scale applications.  

---


