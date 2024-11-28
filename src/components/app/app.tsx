import MainPage from "../../pages/main-page/main-page";

let offersCount = 5;

type AppProps = {
    offersCount : Number;
    offers: Offers;
}

function App(offers) : JSX.Element {
    return (
        <MainPage offersCount={offersCount} />
    )
}

export default App;