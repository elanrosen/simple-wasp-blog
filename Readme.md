
## Blog App with Wasp Framework

### Overview

This project is a full-stack blog application built using the Wasp framework, integrating technologies like React, Node.js, and Prisma. It showcases the ease of developing and deploying web applications with Wasp. The app features functionalities such as creating, viewing, editing posts, and adding comments.

### Tech Stack

- **Wasp Framework**: A full-stack, Rails-like framework combining modern technologies.
- **React**: For building the user interface.
- **Node.js**: As the runtime environment for the backend.
- **Prisma**: An open-source database toolkit for handling database operations.
- **Tailwind**: Styling

### Key Components

#### Frontend

1. **`Layout.jsx`**: Manages the application layout, including header, main content, footer, and user authentication.

2. **`Home.jsx`**: Displays the list of blog posts with titles and authors.

3. **`NewPost.jsx`**: Interface for creating new blog posts, with form validation and submission handling.

4. **`ViewPost.jsx`**: Shows details of individual blog posts, including comments.

5. **`EditPostPage.jsx`**: Allows editing of existing blog posts, pre-filling current data.

#### Backend

1. **`actions.js`**: Contains functions like `createPost`, `updatePost`, and `createComment`, handling backend logic.

2. **`queries.js`**: Includes queries like `getPost`, `getComments`, for fetching data from the database.

3. **`main.wasp`**: Defines the application configuration, routes, pages, and database entities.

### Running the Wasp Blog App Locally

To run the app locally, follow these steps:

1. **Install Wasp CLI**: Required for Wasp framework operations.
   ```bash
   curl -sSL https://get.wasp-lang.dev/installer.sh | sh
   ```

2. **Download the App**: Unzip the provided app files to your preferred directory.

3. **Navigate to App Directory**: Use the terminal to move into your app's directory.

4. **Database Migration**: Execute the database migration to set up tables.
   ```bash
   wasp db migrate-dev
   ```

5. **Start the App**: Launch the application with `wasp start`.

6. **Access the App**: Visit `http://localhost:3000` to see the blog app.

