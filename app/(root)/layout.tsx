import Footer from "./Footer";
import Header from "./Header";

export default function LayoutLogado(
    { children }:
        { children: React.ReactNode }
) {
    return (
        <>
            <Header />
            <main>
                {children}

            </main>
            <Footer />
        </>
    )
}