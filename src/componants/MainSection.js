import ControleBar from "./ControleBar";
import HomeSection from "./HomeSection";
import Friends from "./friends";



export default function MainSection({socket , users}){
    
    return(
        <main>
        <div className="container">
        
        <section className="row">   
            <ControleBar socket={socket}/>
            <HomeSection />
            <Friends socket={socket} users={users}/>
        </section>
        </div>
        </main>
    )
}