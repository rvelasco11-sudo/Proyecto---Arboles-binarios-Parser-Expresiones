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

    while (pila.length > 0) {
        salida += pila.pop();
    }
    return salida;
}

function construirArbol(postfijo) {
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
    let arbol = construirArbol(postfijo);

    let pre = recorridoPreorder(arbol);
    let post = recorridoPostorder(arbol);

    document.getElementById("outPreorder").innerText = "Preorder: " + pre;
    document.getElementById("outPostorder").innerText = "Postorder: " + post;
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

function resolverPre() {
    let input = document.getElementById("inputPre").value;
    let tokens = input.split(" ").filter(x => x !== "");
    let pila = [];

    for (let i = tokens.length - 1; i >= 0; i--) {
        let c = tokens[i];

        if (!esOperador(c)) {
            pila.push(c);
        } else {
            let op1 = pila.pop();
            let op2 = pila.pop();
            let res = operar(c, op1, op2);
            pila.push(res);
        }
    }
    document.getElementById("resPre").innerText = "Resultado: " + pila[0];
}

function resolverPost() {
    let input = document.getElementById("inputPost").value;
    let tokens = input.split(" ").filter(x => x !== "");
    let pila = [];

    for (let i = 0; i < tokens.length; i++) {
        let c = tokens[i];

        if (!esOperador(c)) {
            pila.push(c);
        } else {
            let op2 = pila.pop();
            let op1 = pila.pop();
            let res = operar(c, op1, op2);
            pila.push(res);
        }
    }
    document.getElementById("resPost").innerText = "Resultado: " + pila[0];
}