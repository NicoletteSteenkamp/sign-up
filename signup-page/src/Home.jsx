import logo from '../src/assets/Logo.png'; 

function Home() {
    return (
        <div id="root">
            <header className="header">
                <img src={logo} alt="Ruix Logo" className="logo" />
                <h1>Welcome to Ruix!</h1>
               
            </header>

            <main className="main-content">
                <br/>
                <h2>Your Go-To Platform for Everything!</h2>
                <br/>
                <p>
                    At Ruix, we provide top-notch services and solutions to help you achieve your goals. 
                    Whether you are looking for tech support, development services, or just exploring new ideas, 
                    you have come to the right place.
                </p>
                <button className="cta-button">Get Started</button>
            </main>

            <footer className="footer">
                <p>&copy; 2024 Ruix. All rights reserved.</p>
                <p>
                    Follow us on 
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a>, 
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a>, 
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>.
                </p>
            </footer>
        </div>
    );
}

export default Home;
