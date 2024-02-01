import ControleBar from "./ControleBar";
import HomeSection from "./HomeSection";
import Friends from "./friends";



export default function MainSection({socket}){
    
    return(
        <main>
        <div className="container">
        <section className="row">   
            <ControleBar/>
            <HomeSection />
            <Friends socket={socket}/>
        </section>
        </div>
        </main>
    )
}