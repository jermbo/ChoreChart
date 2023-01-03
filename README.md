# Chore Tracker

A simple app to track weekly chores and pay out.

## Features

- Work offline. ( After initial load )
- Weekly chores tacked
- Dashboard overview
- Customizable

## Tech Goals

- Use modern CSS techniques to build the interface.
  - CSS Grid
  - Container Queries
  - :has() selector
- Lightweight SPA implementation
- Accessibility

## Design Inspiration

![Chore Chart](docs/images/chorechart.png)

![Chore Chart Customizable](docs/images/chore-chart-customizable-long.jpg)

![Chore Chart Printable](docs/images/Free-Kids-Chore-Chart-Printable.png)

## Tech Details

Local Storage

- week stamp

if week stamp does not exist, create one in local storage,
if week stamp exists, read data and pull it back

WeekInfo

- weekday: Monday...
- month: January...
- day: number
- year: number
- chores: Chore

Chore

- name: string
- amount: number
- completed: boolean
