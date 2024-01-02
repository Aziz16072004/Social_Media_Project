import searcheImg  from "../imgs/search-interface-symbol.png"


export default function Header(){
    return(
        <div class="container">
        <header class="row d-sm-flex justify-content-between">
            <div class="logo col-8 col-md-4 text-center ">
                <h2>Social Media</h2>
            </div>
            <div class="searche  d-none col-md-5 d-md-flex col-6 text-center">
                <img src={searcheImg} alt=""/>
                <input type="text" placeholder="searche for creator , inspiration and projects"/>
            </div>
            <div class="header-rigth col-4 col-sm-3  text-center">
                <a href="#create" class="button">Create</a>
            </div>
        </header>
        </div>
    )
}