var  nifValidation = angular.module('nifValidation');

nifValidation.factory('validationFactory', function(){
    return {
        validCIF: function(cif){
            var control, sum_a, sum_b, aux_a, aux_b, sum_c, sum_d, letters,
                r_expression1 = /^[ABEH][0-9]{8}$/i,
                r_expression2 = /^[KPQS][0-9]{7}[A-J]$/i,
                r_expression3 = /^[CDFGJLMNRUVW][0-9]{7}[0-9A-J]$/i;

            cif = cif.toUpperCase();
            if(cif.match(r_expression1) || cif.match(r_expression2) || cif.match(r_expression3)) {
                control = cif[cif.length-1];
                sum_a 	= 0;
                sum_b 	= 0;

                for (var i = 1; i < 8; i++) {
                    if (i % 2 == 0) {
                        sum_a += parseInt(cif[i], 10);
                    }else{
                        aux_a = parseInt(cif[i], 10) * 2;
                        aux_b = 0;

                        if(aux_a > 9) {
                            aux_b = 1+(aux_a-10);
                        } else {
                            aux_b = aux_a;
                        }
                        sum_b += aux_b;
                    }
                }

                sum_c 	= (parseInt(sum_a + sum_b, 10)) + "";
                sum_d 	= (10 - (parseInt(sum_c[sum_c.length - 1], 10))) % 10;

                letters = "JABCDEFGHI";
                if (control >= "0" && control <= "9") {
                    return (control == sum_d);
                } else {
                    return ((control.toUpperCase()) == letters[sum_d]);
                }
            } else {
                return false;
            }
        },
        validNIF: function(nif) {
            var niePrefix,
                nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i,
                nifLetters = 'TRWAGMYFPDXBNJZSQVHLCKE',
                valid = false;

            nif = nif.toUpperCase();
            if (9 === nif.length) {
                if (nif.match(nifRegex)) {
                    valid = (nif.charAt(8) === nifLetters.charAt(parseInt(nif, 10) % 23));
                }
            }

            return valid;
        },
        validNIE: function(nie) {
            var niePrefix = null,
                nifRegex =  /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i,
                nifLetters = 'TRWAGMYFPDXBNJZSQVHLCKE',
                valid = false;

            nie = nie.toUpperCase();
            if (9 === nie.length) {
                niePrefix = nie.charAt(0);
                switch ( niePrefix ) {
                    case 'X':
                        niePrefix = 0;
                        break;
                    case 'Y':
                        niePrefix = 1;
                        break;
                    case 'Z':
                        niePrefix = 2;
                        break;
                    default:
                        niePrefix = null
                        break;
                }
                nie = niePrefix + nie.substr(1);
                if (nie.match(nifRegex)) {
                    valid = (nie.charAt(8) === nifLetters.charAt(parseInt(nie, 10) % 23));
                }
            }

            return valid;
        }
    };
});
