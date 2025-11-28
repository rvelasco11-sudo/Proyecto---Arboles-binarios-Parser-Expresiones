class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izq = null;
        this.der = null;
    }
}

function esOperador(c) {
    return c === '+' || c === '-' || c === '*' || c === '/';
}

function precedencia(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
}

function operar(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') return a / b;
    return 0;
}

// Profe, esta es la función nueva que recorre el árbol nodo por nodo.
// Ya no calculo en el array, sino que el árbol se resuelve recursivamente.
function resolverArbol(nodo) {
    if (!esOperador(nodo.valor)) {
        return parseFloat(nodo.valor);
    }

    let resultadoIzq = resolverArbol(nodo.izq);
    let resultadoDer = resolverArbol(nodo.der);

    return operar(nodo.valor, resultadoIzq, resultadoDer);
}

// --- TAREA 1 ---

function convertirInfijoAPostfijo(expresion) {
    let salida = "";
    let pila = [];
    for (let i = 0; i < expresion.length; i++) {
        let c = expresion[i];
        if (!esOperador(c)) {
            salida += c;
        } else {
            while (pila.length > 0 && precedencia(pila[pila.length - 1]) >= precedencia(c)) {
                salida += pila.pop();
            }
            pila.push(c);
        }
    }
    while (pila.length > 0) salida += pila.pop();
    return salida;
}

function construirArbolDesdePostfijo(postfijo) {
    let pila = [];
    for (let i = 0; i < postfijo.length; i++) {
        let c = postfijo[i];
        if (!esOperador(c)) {
            pila.push(new Nodo(c));
        } else {
            let nodo = new Nodo(c);
            nodo.der = pila.pop();
            nodo.izq = pila.pop();
            pila.push(nodo);
        }
    }
    return pila.pop();
}

function recorridoPreorder(nodo) {
    if (nodo === null) return "";
    return nodo.valor + " " + recorridoPreorder(nodo.izq) + recorridoPreorder(nodo.der);
}

function recorridoPostorder(nodo) {
    if (nodo === null) return "";
    return recorridoPostorder(nodo.izq) + recorridoPostorder(nodo.der) + nodo.valor + " ";
}

function procesarExpresion() {
    let input = document.getElementById("inputInfix").value;
    let postfijo = convertirInfijoAPostfijo(input);
    
    // Aquí se genera el Árbol Binario
    let arbol = construirArbolDesdePostfijo(postfijo);

    let pre = recorridoPreorder(arbol);
    let post = recorridoPostorder(arbol);

    document.getElementById("outPreorder").innerText = "Preorder: " + pre;
    document.getElementById("outPostorder").innerText = "Postorder: " + post;
}

// --- TAREA 2 ---

function resolverPre() {
    let input = document.getElementById("inputPre").value;
    let tokens = input.split(" ").filter(x => x !== "");
    let pilaNodos = [];

    // Primero reconstruyo el árbol en memoria como pidió
    for (let i = tokens.length - 1; i >= 0; i--) {
        let t = tokens[i];
        if (!esOperador(t)) {
            pilaNodos.push(new Nodo(t));
        } else {
            let nodo = new Nodo(t);
            nodo.izq = pilaNodos.pop(); 
            nodo.der = pilaNodos.pop();
            pilaNodos.push(nodo);
        }
    }

    let arbol = pilaNodos.pop(); 
    
    // Ahora mando llamar al resolverArbol para que calcule usando la estructura
    let resultado = resolverArbol(arbol);
    document.getElementById("resPre").innerText = "Resultado: " + resultado;
}

// --- TAREA 3 ---

function resolverPost() {
    let input = document.getElementById("inputPost").value;
    let tokens = input.split(" ").filter(x => x !== "");
    let pilaNodos = [];

    // Igual aquí, armo el árbol primero
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i];
        if (!esOperador(t)) {
            pilaNodos.push(new Nodo(t));
        } else {
            let nodo = new Nodo(t);
            nodo.der = pilaNodos.pop();
            nodo.izq = pilaNodos.pop();
            pilaNodos.push(nodo);
        }
    }

    let arbol = pilaNodos.pop();

    // Y resuelvo usando el recorrido del árbol
    let resultado = resolverArbol(arbol);
    document.getElementById("resPost").innerText = "Resultado: " + resultado;
}