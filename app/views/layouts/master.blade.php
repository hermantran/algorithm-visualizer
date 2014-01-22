<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Visualizr</title>
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
  </head>
  <body>
    <div class="container">
      @yield('content')
    </div>
    
    <script>var paths = { base: '{{ URL::to('/'); }}' };</script>
    @yield('scripts')
  </body>
</html>