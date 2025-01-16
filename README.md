# E-Commerce Website

This is a full-featured Angular-based e-commerce application with an **Admin Dashboard** and a **User Dashboard**. The application allows administrators to manage products, categories, users, roles, and orders, while users can browse products, manage their profiles, and make purchases.

## Features

### Admin Dashboard
- **CRUD Operations**: Manage products, users, categories, and user roles.
- **Order Tracking**: View and track user orders.
- **Cart Management**: Monitor users' carts.
- **Dynamic Pages**: Update content for the "About Us" and "Contact Us" pages dynamically.
- **Contact Messages**: View and manage user-submitted messages from the contact form.

### User Dashboard
- **Profile Management**: Users can update their profiles.
- **Order Placement**: Users can make orders and manage saved addresses.
- **Registration and Authentication**: Secure user registration and login.

### User Side Features
1. **Home Page**:
   - Display new arrivals.
   - Shopping sections for men and women.
2. **Categories Page**:
   - View products by category.
   - Advanced search and filtering:
     - Sort products alphabetically (A-Z, Z-A).
     - Sort products by price (low-to-high, high-to-low).
     - Filter by subcategories.
     - Apply minimum and maximum price filters.
3. **About Us Page**:
   - Content is dynamically updated from the admin dashboard.
4. **Contact Us Page**:
   - Content dynamically updated by the admin.
   - Users can submit messages via a form.
5. **FAQs Page**: Frequently Asked Questions.
6. **Cart**:
   - Add items to the cart.
   - Proceed to buy with options to use a saved address or add a new one.


### Prerequisites
- Install [Node.js](https://nodejs.org/) (version 16 or later recommended).
- Install Angular CLI globally:
  ```bash
  npm install -g @angular/cli
  ```

# Application

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
