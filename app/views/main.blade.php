@extends('layouts.master')

@section('content')
<ng:view></ng:view>
@stop

@section('scripts')
<script src="{{ asset('js/lib/require.min.js') }}" data-main="js/main"></script>
@stop