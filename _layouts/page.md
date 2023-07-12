---
layout: default
---

<article class="pt-20 sm:pt-24 pb-16">
  <h1 class="mb-8 md:mb-4 pb-0">
    {{ page.title | escape }}
  </h1>
  <div class="{{ page.markdown }} max-w-none leading-6 py-6">
    {{ content }}
  </div>
</article>
