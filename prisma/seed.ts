// prisma/seed.ts
import { PrismaClient, BlogStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️ Cleared existing data");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        bio: "Full-stack developer passionate about Next.js and React. Love sharing knowledge through writing.",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      },
    }),
    prisma.user.create({
      data: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        password: hashedPassword,
        bio: "UI/UX designer turned developer. Focused on creating beautiful and accessible web experiences.",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
      },
    }),
    prisma.user.create({
      data: {
        name: "Mike Chen",
        email: "mike@example.com",
        password: hashedPassword,
        bio: "Backend engineer with expertise in databases and API design. GraphQL enthusiast.",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
      },
    }),
    prisma.user.create({
      data: {
        name: "Emma Wilson",
        email: "emma@example.com",
        password: hashedPassword,
        bio: "DevOps engineer with a passion for cloud infrastructure and automation.",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
      },
    }),
    prisma.user.create({
      data: {
        name: "Alex Rodriguez",
        email: "alex@example.com",
        password: hashedPassword,
        bio: "Mobile app developer specializing in React Native and Flutter.",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    }),
  ]);

  console.log(`👥 Created ${users.length} users`);

  // Create sample blogs with real working cover images
  const blogData = [
    {
      title: "Getting Started with Next.js 14",
      slug: "getting-started-with-nextjs-14",
      excerpt:
        "Learn the fundamentals of Next.js 14 including the new App Router, Server Components, and more.",
      content: `Next.js 14 brings exciting new features that make building React applications faster and more efficient than ever before.

## Key Features

### App Router
The new App Router provides a more intuitive way to organize your application structure. With file-system based routing, creating new pages and layouts becomes incredibly simple.

### Server Components
Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client and improving performance.

### Improved Performance
Next.js 14 includes significant performance improvements, including faster cold starts and optimized bundling.

## Getting Started

To create a new Next.js 14 project:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --app
\`\`\`

This command sets up a new project with TypeScript and Tailwind CSS, using the new App Router.

## Conclusion

Next.js 14 is a powerful framework that continues to push the boundaries of what's possible with React applications.`,
      coverImageUrl: "https://picsum.photos/800/400?random=1",
      status: BlogStatus.PUBLISHED,
      authorId: users[0].id,
    },
    {
      title: "Building Beautiful UIs with shadcn/ui",
      slug: "building-beautiful-uis-with-shadcn-ui",
      excerpt:
        "Discover how shadcn/ui components can help you build stunning, accessible user interfaces quickly.",
      content: `shadcn/ui has revolutionized the way we build React components. It provides beautifully designed, accessible components that you can copy and paste into your projects.

## Why shadcn/ui?

### Copy, Don't Install
Unlike traditional component libraries, shadcn/ui lets you copy components directly into your project. This gives you full control over the code.

### Built on Radix UI
All components are built on top of Radix UI primitives, ensuring excellent accessibility out of the box.

### Customizable
Components are designed to be easily customizable using Tailwind CSS classes.

## Getting Started

Install shadcn/ui in your project:

\`\`\`bash
npx shadcn-ui@latest init
\`\`\`

Then add components as needed:

\`\`\`bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
\`\`\`

## Example Usage

\`\`\`tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  )
}
\`\`\`

The result is beautiful, accessible components that integrate seamlessly with your design system.`,
      coverImageUrl: "https://picsum.photos/800/400?random=2",
      status: BlogStatus.PUBLISHED,
      authorId: users[1].id,
    },
    {
      title: "GraphQL vs REST: Which Should You Choose?",
      slug: "graphql-vs-rest-which-should-you-choose",
      excerpt:
        "A comprehensive comparison of GraphQL and REST APIs to help you make the right choice for your next project.",
      content: `The debate between GraphQL and REST has been ongoing for years. Both have their strengths and use cases.

## GraphQL Advantages

### Single Endpoint
GraphQL uses a single endpoint for all operations, simplifying API management.

### Flexible Queries
Clients can request exactly the data they need, reducing over-fetching and under-fetching.

### Strong Type System
GraphQL provides a robust type system that enables excellent tooling and developer experience.

## REST Advantages

### Simplicity
REST is straightforward and well-understood by most developers.

### Caching
HTTP caching works naturally with REST endpoints.

### Tooling
Extensive tooling ecosystem with mature debugging and monitoring solutions.

## When to Use Each

### Choose GraphQL When:
- You need flexible data fetching
- You're building a complex frontend application
- You want strong typing and excellent developer tools

### Choose REST When:
- You need simple, cacheable operations
- You're working with file uploads/downloads
- Your team is more familiar with REST patterns

## Conclusion

Both GraphQL and REST are excellent choices. The decision should be based on your specific project requirements and team expertise.`,
      coverImageUrl: "https://picsum.photos/800/400?random=3",
      status: BlogStatus.PUBLISHED,
      authorId: users[2].id,
    },
    {
      title: "Advanced TypeScript Patterns for React",
      slug: "advanced-typescript-patterns-for-react",
      excerpt:
        "Master advanced TypeScript patterns to write more robust and maintainable React applications.",
      content: `TypeScript and React make a powerful combination. Here are some advanced patterns that will level up your development.

## Generic Components

Create reusable components with generics:

\`\`\`tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
\`\`\`

## Discriminated Unions

Handle different states elegantly:

\`\`\`tsx
type LoadingState = { status: 'loading' }
type SuccessState = { status: 'success'; data: any[] }
type ErrorState = { status: 'error'; error: string }

type State = LoadingState | SuccessState | ErrorState

function handleState(state: State) {
  switch (state.status) {
    case 'loading':
      return <div>Loading...</div>
    case 'success':
      return <div>Data: {state.data.length} items</div>
    case 'error':
      return <div>Error: {state.error}</div>
  }
}
\`\`\`

These patterns help create more robust and maintainable applications.`,
      coverImageUrl: "https://picsum.photos/800/400?random=4",
      status: BlogStatus.DRAFT,
      authorId: users[0].id,
    },
    {
      title: "Database Design Best Practices",
      slug: "database-design-best-practices",
      excerpt:
        "Learn essential database design principles to build scalable and maintainable data models.",
      content: `Good database design is crucial for building scalable applications. Here are key principles to follow.

## Normalization

Normalize your data to reduce redundancy:

### First Normal Form (1NF)
- Each column contains atomic values
- No repeating groups

### Second Normal Form (2NF)
- Must be in 1NF
- All non-key attributes depend on the entire primary key

### Third Normal Form (3NF)
- Must be in 2NF
- No transitive dependencies

## Indexing Strategy

### Primary Keys
Always use meaningful primary keys when possible.

### Foreign Keys
Ensure referential integrity with proper foreign key constraints.

### Performance Indexes
Add indexes on columns used in WHERE clauses and JOINs.

## Data Types

Choose appropriate data types:
- Use specific numeric types (INT, BIGINT)
- VARCHAR for variable-length strings
- TEXT for large text content
- TIMESTAMP for date/time data

These principles will help you build robust, scalable databases.`,
      coverImageUrl: "https://picsum.photos/800/400?random=5",
      status: BlogStatus.PUBLISHED,
      authorId: users[2].id,
    },
    {
      title: "Mastering CSS Grid and Flexbox",
      slug: "mastering-css-grid-and-flexbox",
      excerpt:
        "Learn when and how to use CSS Grid and Flexbox to create responsive layouts efficiently.",
      content: `CSS Grid and Flexbox are powerful layout systems that complement each other. Understanding when to use each is key to efficient web development.

## CSS Grid: For 2D Layouts

Grid excels at creating complex, two-dimensional layouts:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

### When to Use Grid:
- Complex page layouts
- Card-based designs
- Magazine-style layouts
- When you need precise control over rows and columns

## Flexbox: For 1D Layouts

Flexbox is perfect for one-dimensional layouts:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
\`\`\`

### When to Use Flexbox:
- Navigation bars
- Centering content
- Distributing space between items
- Simple responsive designs

## Combining Both

The real power comes from combining Grid and Flexbox:

\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

Master both tools and choose the right one for each situation.`,
      coverImageUrl: "https://picsum.photos/800/400?random=6",
      status: BlogStatus.PUBLISHED,
      authorId: users[1].id,
    },
    {
      title: "Building Scalable React Applications",
      slug: "building-scalable-react-applications",
      excerpt:
        "Discover architectural patterns and best practices for building large-scale React applications.",
      content: `Building scalable React applications requires careful planning and adherence to proven patterns and principles.

## Project Structure

Organize your code for scalability:

\`\`\`
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── features/     # Feature-specific components
│   └── layouts/      # Layout components
├── hooks/            # Custom hooks
├── services/         # API and external services
├── utils/           # Utility functions
└── types/           # TypeScript definitions
\`\`\`

## Component Design Principles

### Single Responsibility
Each component should have one clear purpose:

\`\`\`tsx
// ❌ Too many responsibilities
function UserDashboard() {
  // Handles user data, notifications, settings, analytics...
}

// ✅ Single responsibility
function UserProfile() {
  // Only handles user profile display
}
\`\`\`

### Composition over Inheritance
Use composition to build complex UIs:

\`\`\`tsx
function Card({ children, header, footer }) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
\`\`\`

## State Management

Choose the right tool for your needs:
- **Local state**: useState, useReducer
- **Server state**: React Query, SWR
- **Global state**: Zustand, Redux Toolkit

## Performance Optimization

- Use React.memo for expensive components
- Implement proper key props
- Lazy load components and routes
- Optimize bundle size

Following these patterns will help you build maintainable, scalable React applications.`,
      coverImageUrl: "https://picsum.photos/800/400?random=7",
      status: BlogStatus.PUBLISHED,
      authorId: users[3].id,
    },
    {
      title: "Modern Authentication Patterns",
      slug: "modern-authentication-patterns",
      excerpt:
        "Explore modern authentication methods including JWT, OAuth, and passwordless authentication.",
      content: `Authentication has evolved significantly. Modern applications require robust, secure, and user-friendly authentication systems.

## JWT (JSON Web Tokens)

JWTs provide a stateless authentication mechanism:

\`\`\`typescript
interface JWTPayload {
  sub: string    // User ID
  exp: number    // Expiration time
  iat: number    // Issued at
  email: string  // User email
}
\`\`\`

### JWT Best Practices:
- Use short expiration times
- Implement token refresh mechanisms
- Store tokens securely (httpOnly cookies)
- Include minimal necessary data

## OAuth 2.0 / OpenID Connect

OAuth provides secure third-party authentication:

### Benefits:
- Users don't need to create new accounts
- Reduced password management
- Leverages existing trusted providers

### Implementation:
\`\`\`typescript
// Using NextAuth.js
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
}
\`\`\`

## Passwordless Authentication

Modern alternative using magic links or codes:

### Advantages:
- Better user experience
- Eliminates password-related vulnerabilities
- Reduces support burden

### Implementation Flow:
1. User enters email
2. Send magic link/code
3. User clicks link or enters code
4. Create authenticated session

## Security Considerations

- Always use HTTPS
- Implement rate limiting
- Use CSRF protection
- Validate all inputs
- Keep dependencies updated

Choose authentication methods that balance security with user experience.`,
      coverImageUrl: "https://picsum.photos/800/400?random=8",
      status: BlogStatus.DRAFT,
      authorId: users[4].id,
    },
  ];

  const blogs = await Promise.all(
    blogData.map((blog) => prisma.blog.create({ data: blog }))
  );

  console.log(`📝 Created ${blogs.length} blogs`);

  // Log summary
  console.log("\n✅ Seed completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   Users: ${users.length}`);
  console.log(`   Blogs: ${blogs.length}`);
  console.log(
    `   Published: ${blogs.filter((b) => b.status === "PUBLISHED").length}`
  );
  console.log(`   Drafts: ${blogs.filter((b) => b.status === "DRAFT").length}`);

  // Log sample users for testing
  console.log("\n👥 Sample Users (password: password123):");
  users.forEach((user) => {
    console.log(`   ${user.name} (${user.email})`);
  });
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
