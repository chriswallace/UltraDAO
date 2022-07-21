<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body class="{{page.id}}">
    <div class="snap-y snap-mandatory h-screen overflow-x-hidden">
      {% include header.md %} {{ content }} {% include footer.md %}
      {% include google-analytics.md %}
    </div>
  </body>
</html>