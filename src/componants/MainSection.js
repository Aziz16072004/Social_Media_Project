import ControleBar from "./ControleBar";
import HomeSection from "./HomeSection";
import Friends from "./friends";



export default function MainSection({socket , users , updateSetShowTheme , theme }){
    
    return(
        <main>
        <div className="container">
        
        <section className="row">   
            <ControleBar socket={socket} updateSetShowTheme={updateSetShowTheme}/>
            <HomeSection  theme={theme}/>
            <Friends socket={socket} users={users}/>
        </section>
        </div>
        </main>
    )
}