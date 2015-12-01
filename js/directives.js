app = angular.module('tuDoctor.directives', [])

// elimina el evento submit default de un boton
app.directive('preventDefault', function() {
    return function(scope, element, attrs) {
        angular.element(element).bind('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
    }
});