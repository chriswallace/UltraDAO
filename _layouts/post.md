---
layout: default
---

<article class="w-full max-w-none py-8 pt-16">
  <head>
    <h1 class="max-w-[66%]">
      {{ page.title | escape }}
    </h1>
    <time class="text-white text-sm">
      Posted on {{page.date | date: '%b %d, %Y'}}
    </time>
  </head>
  <div class="prose max-w-prose mt-4 max-w-none leading-6">
    {% if page.image %}
    <img
      class="object-cover w-full h-80 rounded"
      src="{{site.baseurl}}{{page.image}}"
    />

    {% endif %}
    <div class="mt-4">{{ content }}</div>

  </div>
</article>
