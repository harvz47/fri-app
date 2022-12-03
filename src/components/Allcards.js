import Card from './Card';
import one from '../assets/img/shoes.jpg'
import two from '../assets/img/mens.jpg'

function Allcards(){
    return(
        <div className="d-flex justify-content-center mt-5" style={{display:"inline-flex"}}>
            <Card img={one}/>
            <Card img={two}/>
            <Card img={one}/>
            <Card img={two}/>
        </div>




    )



}
export default Allcards;