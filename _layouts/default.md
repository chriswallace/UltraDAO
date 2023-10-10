<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body class="{{page.id}}">
    <div class="container max-w-6xl mx-auto lg:px-0">
      {% include header.md %} {{ content }} {% include footer.md %}
      {% include google-analytics.md %}
    </div>
  </body> 
</html>