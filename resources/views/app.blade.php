<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0a0a14" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta
      name="description"
      content="Oluseed Technologies: ignition, development and advancement. We design and engineer websites, apps and digital products with professionalism."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <title>{{ config('app.name', 'Oluseed Technologies') }}</title>
    <style>
      html { background: #0a0a14; }
    </style>
    @viteReactRefresh
    @vite(['resources/js/main.tsx'])
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
