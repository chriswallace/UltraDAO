<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body class="{{page.id}} gradient-filter-bg">
    <div class="container max-w-6xl mx-auto lg:px-0">
      {% include header.md %} {{ content }} {% include footer.md %}
      {% include google-analytics.md %}
    </div>
    <div class="twelve-days-animation">
        <div class="overlay-filter"></div>
        <video autoplay loop muted playsinline width="100%" height="100%">
            <source src="./assets/videos/animation.mp4" type="video/mp4">
        </video>
    </div>
  </body>
</html>