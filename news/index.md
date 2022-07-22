---
title: News
layout: page
permalink: /news.html
image: /assets/images/ultradao-cover.png
---

<section class="text-2xl">
{% for post in site.posts %}
  {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% if year or false %}
        </div>
    {% endif %}
    {% assign year = y %}
    <div class="mb-12">
    <h3 class="mb-3 text-base font-black">{{ y }}</h3>
  {% endif %}
    <article class="sm:flex justify-between mb-3">
        <a href="{{ site.github.url }}{{ post.url }}" title="{{ post.title }}" class="font-normal no-underline hover:underline max-w-80">{{ post.title }}</a>
        <div class="mt-1 mb-6 sm:m-0">
            <time datetime="{{ post.date | date:"%Y-%m-%d" }}" class="text-gray-600 text-sm font-medium tabular-nums">{{ post.date | date:"%Y-%m-%d" }}</time>
        </div>
    </article>
{% endfor %}
</div>
</section>