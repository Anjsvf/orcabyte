# OrcaByte Project Documentation

## Project Overview

OrcaByte is a web application that helps freelancers and agencies create accurate project budgets based on various factors including project complexity, timeline, and specific requirements. The application calculates cost estimates considering factors like design needs, server setup, and domain registration.

## Key Components

### BudgetPreview Component

The `BudgetPreview` component displays a comprehensive budget proposal for a project. It takes project details, complexity rating, and a reference for image capture as props.

**Features:**
- Displays project title, description, and type
- Shows deadline and calculates days remaining
- Presents complexity rating and hourly rate
- Calculates urgency factors based on timeline
- Computes total cost based on multiple factors
- Formats the budget in the client's preferred currency

**Implementation Details:**
- Uses a gradient background with a clean card-based layout
- Responsive design that adapts to different screen sizes
- Includes a timestamp showing when the estimate was generated

### AIAnalysis Component

This component provides AI-driven insights about the project budget, including:
- Estimated timeline based on project complexity
- Suggested budget range
- Market analysis
- Detailed breakdown of hours and rates

The component supports both English and Portuguese languages and can display amounts in USD or BRL.

## Utilities

### CurrencyUtils

A collection of utility functions for handling currency and time calculations:

- `convertCurrency`: Converts amounts between different currencies
- `formatCurrency`: Formats monetary values according to locale standards
- `calculateDaysDifference`: Calculates the number of days between dates
- `applyUrgencyFactor`: Adjusts costs based on project urgency

## Data Models

### ProjectDetails

Contains all the information about a project:
- Basic information (title, description, type)
- Timeline (deadline)
- Financial details (hourly rate, currency)
- Design requirements (hasDesign, willFreelancerDesign, externalDesignerCost)
- Infrastructure needs (hasServer, willFreelancerSetupServer, hostingCost)
- Domain information (hasDomain, domainCost)

### ProjectFactors

Defines standard factors for different project types:
- Base hours required for each project type
- Additional hours for design work
- Hours needed for server setup

## Budget Calculation Logic

The budget calculation considers:
1. Base project cost (complexity × hourly rate × base hours)
2. Design costs (either freelancer hours or external designer cost)
3. Server setup costs (for web and fullstack projects)
4. Domain registration costs (for web and fullstack projects)
5. Urgency factor (50% increase for projects due within 15 days, 20% for projects due within 30 days)

## User Interface

The application features a professional UI with:
- Color-coded sections for easy reading
- Clear typography hierarchy
- Responsive layout for all device sizes
- Visual elements like icons to enhance readability
- Gradient backgrounds and subtle shadows for depth

## Future Enhancements

Potential improvements could include:
- Saving and comparing multiple budget versions
- Exporting budgets as PDF documents
- Integration with project management tools
- More detailed breakdown of tasks and timelines
- Client approval workflow


