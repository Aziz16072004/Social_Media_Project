import ControleBar from "./ControleBar";
import HomeSection from "./HomeSection";
import Friends from "./friends";



export default function MainSection(){
    return(
        <main>
        <div className="container">
        <section className="row">   
            <ControleBar/>
            <HomeSection/>
            <Friends/>
        </section>
        </div>
        </main>
    )
}