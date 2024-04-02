import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import './index.css';

function Rifa() {
  const [numeroGanador, setNumeroGanador] = useState(null);
  const [numerosSeleccionados, setNumerosSeleccionados] = useState([]);
  const [numeroAleatorio, setNumeroAleatorio] = useState(null);
  const [mostrarConfeti, setMostrarConfeti] = useState(false);
  const { width, height } = useWindowSize();

  

  const generarNumeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const numeroDelista = () => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    setNumeroAleatorio(randomNum);
  };

  const seleccionarGanador = () => {
    let nuevoNumeroGanador;
    do {
      nuevoNumeroGanador = generarNumeroAleatorio(1, 235);
    } while (numerosSeleccionados.includes(nuevoNumeroGanador));

    setNumerosSeleccionados([...numerosSeleccionados, nuevoNumeroGanador]);
    setNumeroGanador(nuevoNumeroGanador);
    setMostrarConfeti(true); // Mostrar confeti al seleccionar un ganador
  };

  useEffect(() => {
    // Después de 3 segundos, detener el confeti
    const timeout = setTimeout(() => {
      setMostrarConfeti(false);
    }, 5000);

    // Limpiar el timeout cuando el componente se desmonta o cuando se selecciona un nuevo ganador
    return () => clearTimeout(timeout);
  }, [numeroGanador]);

  return (
    <div>
      <h1 className='Titulo'>Gran Rifa</h1>
      <div className='botones'>
        <button className='botonGanador' onClick={seleccionarGanador}>Rifa Ganadora</button>
        <button className='botonNumero' onClick={numeroDelista}>Numero Ganador</button>
        {numeroAleatorio && <p>El número ganador de la lista es: <span className='text-3xl'> {numeroAleatorio}</span></p>}
      </div>
      {numeroGanador && (
        <main className='tabla'>
          {mostrarConfeti && (
            <Confetti width={width} height={height} />
          )}
          <h2 className='tituloTabla flex gap-5 items-center'>El número ganador de rifa es:
            <p className='p-numero-ganador'>{numeroGanador}</p>
          </h2>
          <div className='contenidoTabla'>
            <table className="table-fixed border-collapse border border-slate-500">
              <thead>
                <tr className='border-collapse border border-slate-500'>
                  <th className='border-collapse border border-slate-500'>N°</th>
                  <th>Número</th>
                </tr>
              </thead>
              <tbody className='border-collapse border border-slate-500'>
                {numerosSeleccionados.map((numero, index) => 
                  <tr className="border-collapse border border-slate-500" key={index}>
                    <td className='border-collapse border border-slate-500 text-center'>{index + 1}</td>
                    <td className='text-center'>{numero}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </div>
  );
}

export default Rifa;
