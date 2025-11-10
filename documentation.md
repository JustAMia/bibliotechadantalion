# deploying an astro blog on github pages

Astro official documentation
https://docs.astro.build/en/guides/deploy/github/

Github documentation
https://github.com/withastro/action?tab=readme-ov-file

Documentation on dev (workflow file not working?)
https://dev.to/github/how-to-deploy-a-static-site-in-any-framework-of-your-choice-github-pages-neh

Be sure to update

`
site: 'https://github-user-name.github.io',
base: '/github-pages-folder',
`

in `astro.config.mjs`