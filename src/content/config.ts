// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';


// 2. Import loader(s)
// import { glob } from 'astro/loaders';
// We don’t need to use the glob here, as we are importing only md/mdx files, which are the default astro content


// 3. Define your collection(s)

const allTags = ['announcement', 'game design', 'community', 'release' ];

const posts = defineCollection({
    type: 'content', // It's good practice to explicitly state the type
    schema: z.object({
        postSlug: z.string(),
        isDraft: z.boolean(),
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string(),
        tags: z.array(z.enum(allTags)),
        series: z.string().optional(),
    }),
});




// 4. Export a single `collections` object to register your collection(s)
export const collections = { posts };