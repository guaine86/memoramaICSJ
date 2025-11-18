const totalCartas = 12;
let letrasCartas = ['A', 'J', 'Q', 'K'];
let cartas = [];
let cartasSelecc = [];
let valoresUsados = [];
let movimientoActual = 0;
let intentos = 0;
let paresEncontrados = 0;
let contador=0;
let banderaJuego = false;
let tiempoJuego = 0;

const regresiva = document.querySelector('.regresiva');
const btnNuevo = document.querySelector('#btnInicio');
let templateCarta = '<div class="carta"><div class="trasera"></div><div class="frente"></div></div>';

function activar(evento){
    if(contador===0){
        reloj();
        contador++;
    }
    
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
                    banderaJuego = true;
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

function reloj( tiempo=30 ){
    let i = tiempo;
    let cuentaRegresiva =  setInterval(() => {
        regresiva.innerHTML = `<p class="reloj">00:${(i>10) ? --i : "0"+--i}</p>`;
        tiempoJuego = tiempo - i;

        if(i===0 || contador>=2 || banderaJuego){
            if(contador<2 && !banderaJuego){
                setTimeout(()=>{
                    lanzaSwal("Perdiste!!","Mejor suerte la proxima", "error");
                },600);
            }
            document.querySelectorAll('.carta').forEach(carta =>{
                carta.classList.add('no-interactiva');
            })
            contador=1;
            clearInterval(cuentaRegresiva);
        }
    }, 1000);
}

const juegoNuevo = ()=>{
    document.querySelector('.intentos').innerHTML = intentos + ' intentos';
    document.querySelector('#juego').innerHTML = '';
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
}

btnNuevo.addEventListener('click', ()=>{
    contador++;
    intentos = 0;
    paresEncontrados = 0;
    banderaJuego = false;
    cartas = [];
    valoresUsados = [];
    juegoNuevo();
    
    reloj();
})

document.addEventListener('DOMContentLoaded', juegoNuevo);