const totalCartas = 12;
let letrasCartas = ['A', 'J', 'Q', 'K'];
let cartas = [];
let cartasSelecc = [];
let valoresUsados = [];
let movimientoActual = 0;
let intentos = 0;
let paresEncontrados = 0;

let templateCarta = '<div class="carta"><div class="trasera"></div><div class="frente"></div></div>';

function activar(evento){
    if(movimientoActual < 2){
        evento.target.classList.add('activa');
    }

    if(!cartasSelecc[0] || cartasSelecc[0] !== evento.target ){
        cartasSelecc.push(evento.target);

        if(++movimientoActual === 2){
            intentos++;
            document.querySelector('.intentos').innerHTML = intentos + ' intentos';

            if(cartasSelecc[0].querySelectorAll('.frente')[0].innerHTML === cartasSelecc[1].querySelectorAll('.frente')[0].innerHTML){
                paresEncontrados++;
                //console.log(paresEncontrados);
                if(paresEncontrados === totalCartas/2){
                    setTimeout(()=>{
                        lanzaSwal("Felicitaciones!!", "Encontraste todas las parejas", "success");
                        //alert('Felicitaciones!!!');
                    },600)
                }

                cartasSelecc = [];
                movimientoActual = 0;
            }else{
                setTimeout(()=>{
                    cartasSelecc[0].classList.remove('activa');
                    cartasSelecc[1].classList.remove('activa');
                    cartasSelecc = [];
                    movimientoActual = 0;
                },600);
            }
        }
    }
}

function valorAleatorio(){
    let aleatorio = Math.floor(Math.random() * totalCartas * 0.5);
    let valores = valoresUsados.filter( valor => valor === aleatorio);

    if(valores.length < 2){
        valoresUsados.push(aleatorio);
    }else{
        valorAleatorio();
    }
}

function getValorFrente(valor){
    let rtn = valor;
    if(valor < letrasCartas.length ){
        rtn = letrasCartas[valor];
    }
    return rtn;
}

function lanzaSwal(titulo, texto, icono){
    Swal.fire({
        title: `${titulo}`,
        text: `${texto}`,
        icon: `${icono}`,
        theme: "dark"
    });
}

for(let i=0; i<totalCartas; i++){
    let div = document.createElement('div');
    div.innerHTML = templateCarta;
    cartas.push(div);
    document.querySelector('#juego').append(cartas[i]);

    valorAleatorio();
    // cartas[i].querySelectorAll('.frente')[0].innerHTML = valoresUsados[i];
    cartas[i].querySelectorAll('.frente')[0].innerHTML = getValorFrente(valoresUsados[i]);
    cartas[i].querySelectorAll('.carta')[0].addEventListener('click', activar);

}