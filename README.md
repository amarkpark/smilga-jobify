Project is part of ongoing learning in [udemy.com/course/nextjs-open-ai/](udemy.com/course/nextjs-open-ai/)

This is the third project in the course: "Jobify"

### *ToDo:* (my own additions)

- FIX pagination active page among others
- FIX the `Warning: XAxis: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.` error from recharts in ChartsContainer update
- FIX the nav-menu-stays-open error
- ADD clickability to stats cards to initiate filters for analytics page
- OK, holy crap the hoops you have to jump through to set one icon to OPEN the shadcn dropdown menu and a second icon to CLOSE the dropdown menu - involving monkey-patching the radix-ui primitives - is ridiculous. Linking this [solution for accordion](https://github.com/shadcn-ui/ui/issues/1133) in order to revisit this later. :alembic:
- Update all assets and theme color - maybe a turquoise?
- Address punycode deprecation
  ```sh
  (node:48480) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
  (Use `node --trace-deprecation ...` to show where the warning was created)
  ```
- Level up this code with (JSDoc)[https://github.com/jsdoc/jsdoc] and https://jsdoc.app/ 
- Add date-applied
- Add platform applied
- Add URL for job post
- Add ability to edit dates retrieved for Analytics
- Update date.js to datefns? Maybe as needed.
- Add ability to track the furthest status achieved in any one application - want to see if candidate got to interview stage before being discounted.

### Completed resolved or deprioritized *ToDo's*
- FIX the search so that it will actually limit data by the selected job status - I think this has to do with transitioning into and out of the `JobStatus[statusKey]` or in here somewhere `components/SearchForm.tsx`
- ~~Add [eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript) ?~~ importer error seems to have resolved itself... Leaving this here as reminder.

### Seed Data

- edit prisma/seed.js to include your own clerkId
- run `node prisma/seed.js` in a terminal window

The rest of what is below is original canned readme which may or may not change over time.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
