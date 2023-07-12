<footer class="p-8">
  <div class="container max-w-2xl mx-auto">
    <div class="mb-4">
      <ul class="flex flex-wrap leading-loose text-sm justify-center">
      {% for item in site.data.footer %}
        <li class="mr-4">
          <a
            href="{{item.url}}"
            class="hover:underline text-gray-300 no-underline hover:text-gray-400"
            >{{item.name}}</a
          >
        </li>
        {% endfor %}
      </ul>
    </div>
    <p class="leading-snug text-gray-500 text-xs text-center">
      Copyright © 2022 - 2023 UltraDAO Studios, LLC. All rights reserved.
    </p>
  </div>
</footer>
