# Workflow Application

This is a **React + Vite** workflow application that allows users to create, edit, and manage workflows using a visual interface. It supports adding, removing, and connecting nodes dynamically.

## Features

- **Drag and Drop Interface**: Add workflow nodes easily.
- **Four Node Types**: Start,Stop, Process, and Decision nodes.
- **Connection Management**: Connect nodes with edges.
- **State Persistence**: Save and load workflows from local storage.
- **Context API Integration**: Manage state efficiently.

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running the Application

### Development Mode
To start the development server, run:
```sh
npm run dev
```
This will launch the app at `http://localhost:5173/` (default Vite port).

### Production Build
To create a production build, use:
```sh
npm run build
```
The output files will be in the `dist` folder.

### Preview Build
To serve the production build locally:
```sh
npm run preview
```

## Folder Structure
```
├── src
│   ├── assets      
│   ├── components  # Reusable UI components
│   ├── context     # Context API for state management
│   ├── App.jsx     # Main application file
│   ├── main.jsx    # Entry point
│
├── public          # Static assets
├── package.json    # Project dependencies
├── vite.config.js  # Vite configuration
└── README.md       # Project documentation
```

## Dependencies
- **React**
- **Vite**
- **React Flow** (for workflow visualization)
- **Context API** (for state management)
- **Modular CSS** (for styling)

## Future Enhancements
- REST API integration for saving workflows to a database
- Advanced workflow validation
- Customizable themes

## License
This project is licensed under the **MIT License**.

---

**Author:** Joseph K Anoj 
**GitHub:** [JosuK22](https://github.com/JosuK22)

