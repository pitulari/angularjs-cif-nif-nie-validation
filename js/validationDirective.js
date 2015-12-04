var  nifValidation = angular.module('nifValidation');

nifValidation.directive('validateNiEs',['validationFactory', function(validationFactory){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, iAttrs, ctrl) {
            var idTypeDoc,
                result = false;

            ctrl.$parsers.unshift(checkNIEs); //Sensible to changes in DOM
            ctrl.$formatters.unshift(checkNIEs); //Sensible to changes ins Model

            function checkNIEs (value) {
                idTypeDoc = scope.docType;
                result = false;
                if (value && idTypeDoc) {
                    switch (idTypeDoc) {
                        case "1":
                            result = validationFactory.validNIF(value);
                            break;
                        case "2":
                            result = validationFactory.validNIE(value);
                            break;
                        case "3":
                            result = validationFactory.validCIF(value);
                            break;
                    }
                }
                ctrl.$setValidity('validateNiEs', result);

                return value;
            }
        }
    }
}]);
