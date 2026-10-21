import {Container} from 'react-bootstrap'
function Portada (){
    return (
        <header id = 'Inicio' className='portada py-5 mb-4'>
            <Container>
                <h1 className='display-5 fw-bold'>Endulzamos tus momentos especiales</h1>
                <p className='lead mb-0'>
                    Pasteleria Mil Sabores - Desde 1950
                </p>
            </Container>
        </header>
    )
}

export default Portada