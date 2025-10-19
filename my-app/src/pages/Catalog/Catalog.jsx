import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Card from "@/components/Card/Card"
function Catalog() {
    const numbers = [1, 2, 3, 4]
    const films = numbers.map((num) => <Card id={num} key={num}
        title={`Film ${num}`} duration={num * 2} reviews={num * 3} />)
    return <>
        <Header />
        <main>
            <h1>Каталог товарів</h1>
            <form >
                <select name="" id="sort">
                    <option value="">Сортувати за...</option></select>
                <div>

                </div>
            </form>
            <ul></ul>
        </main>
        <Footer />
    </>
}
export default Catalog