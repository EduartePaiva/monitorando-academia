import Footer from "./Footer";
import Header from "./Header";

export default function LayoutLogado(
    { children }:
        { children: React.ReactNode }
) {
    return (
        <>
            <Header />
            <main className="flex justify-center items-start mt-16">
                {children}

            </main>
            <Footer />
        </>
    )
}