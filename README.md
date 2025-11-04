# Free Fire Max Points Calculator

A web application for calculating tournament points for Free Fire Max teams. Track team positions, finishes, and calculate total points with an intuitive interface.

## Features

- **Team Management**: Add and manage multiple teams for tournaments
- **Position Tracking**: Assign positions (1-12) to each team
- **Finish Tracking**: Input finish counts using text input or +/- buttons
- **Automatic Calculations**: Calculate position points and total points automatically
- **Export Data**: 
  - Download results as CSV files
  - Save tournament data as JSON files
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark UI with orange accents

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rsamudrala4/pointscalculator.git
cd pointscalculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Usage

1. **Enter Team Names**: Input the names of all teams participating in the tournament
2. **Set Tournament Details**: Enter tournament name and match details
3. **Assign Positions**: Select the position (1-12) for each team
4. **Track Finishes**: Use the input field or +/- buttons to set finish counts
5. **View Results**: See position points and total points calculated automatically
6. **Export Data**: Download CSV or save JSON file for record keeping

## Project Structure

```
src/
├── components/
│   ├── PointsCalculator.tsx  # Main calculator component
│   ├── TeamInput.tsx          # Team name input form
│   └── TeamRow.tsx            # Individual team row component
├── utils/
│   ├── pointsCalculator.ts    # Points calculation logic
│   └── csvExport.ts           # CSV export functionality
├── types.ts                   # TypeScript type definitions
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

## License

This project is private and proprietary.

## Contributing

This is a private project. For issues or questions, please contact the repository owner.

