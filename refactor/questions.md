## Refactor

El código no refactorizado mostraba llamadas innecesarias a la base de datos, así como tambien comentarios innecesarios, ademas de otros detalles como solicitar los parámetros recibidos por el POST, adicionalmente el código no era lo suficientemente legible por la cantidad de operaciones que realizaba el método, con esta refactorización se realizan menos llamadas a la base de datos, se extraen una sola vez las variables del body de la petición, y se disminuye la sobrecarga que antes tenia el método



## Características de un código limpio:


1. Legible
2. Semantico
3. Organizado
4. Documentado
5. Simple
6. Directo
7. Fácil de cambiar y mantener
8. Intuitivo
9. Eficiente
10. Organizado


## Principio de responsabilidad unica:

Este principio  establece que cada módulo o clase debe tener responsabilidad sobre una sola parte de la funcionalidad proporcionada por el software y esta responsabilidad debe estar encapsulada en su totalidad por la clase.
